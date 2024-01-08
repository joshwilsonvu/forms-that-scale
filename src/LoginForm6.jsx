import { useState } from "react";
import clsx from "clsx";
import * as z from "zod";
import useToast from "./useToast";
import { flushSync } from "react-dom";
import { useId } from "react";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({}); // Record<string, true>
  const [submitted, setSubmitted] = useState(false);
  const [shouldValidateImmediately, setShouldValidateImmediately] =
    useState(false);
  const addToast = useToast();

  const validate = ({ touched, submitted }) => {
    const data = {
      email,
      password,
    };
    const partialSchema =
      touched && !submitted
        ? schema.pick(touched).passthrough()
        : schema.refine((data) => data.email !== data.password, {
            message: "Email and password cannot match",
            path: ["password"],
          });
    const { success, data: parsedData, error } = partialSchema.safeParse(data);
    if (success) {
      setErrors({});
      return parsedData;
    }
    setErrors(error.format());
    return null;
  };

  if (shouldValidateImmediately) {
    validate({ touched, submitted });
    setShouldValidateImmediately(false); // fine to set state during render sometimes, to get state up to date
  }

  return (
    <form
      noValidate
      className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-box bg-base-100 p-8 shadow-lg"
      onChange={(e) => {
        if (e.target.name && errors[e.target.name]) {
          setShouldValidateImmediately(true); // reward early
        }
      }}
      onBlur={(e) => {
        if (e.target.name && e.target.value !== "") {
          const newTouched = { ...touched, [e.target.name]: true };
          setTouched(newTouched);
          validate({ touched: newTouched, submitted }); // punish late
        }
      }}
      onSubmit={(e) => {
        // prevent default behavior, validate, show a toast
        e.preventDefault();

        // synchronously update DOM so we can focus first invalid input afterwards
        let data;
        flushSync(() => {
          setSubmitted(true);
          data = validate({ touched, submitted: true });
          if (data) {
            console.log(data);

            addToast("You are now logged in. Thanks for visiting!");
          }
        });

        if (!data) {
          // first invalid input in DOM tree order
          Array.from(e.target.elements)
            .find((el) => el.name && Object.keys(errors).includes(el.name))
            ?.focus();
        }
      }}
    >
      <h1 className="text-2xl">Log in</h1>
      <EmailField
        email={email}
        setEmail={setEmail}
        errors={errors.email?._errors}
      />
      <PasswordField
        hasEmail={Boolean(email)}
        password={password}
        setPassword={setPassword}
        errors={errors.password?._errors}
      />
      <div className="mt-4 flex justify-end gap-4">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}

function EmailField({ email, setEmail, errors }) {
  const id = useId();

  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">Email</span>
      </div>
      <input
        name="email"
        type="email"
        placeholder="you@example.com"
        className={clsx("input input-bordered w-full", errors && "input-error")}
        required
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-invalid={Boolean(errors)}
        aria-describedby={id}
      />
      {errors && <Errors id={id}>{errors.join("; ")}</Errors>}
    </label>
  );
}

function PasswordField({ hasEmail, password, setPassword, errors }) {
  const id = useId();

  return (
    <label
      className={clsx(
        "form-control w-full transition-all",
        hasEmail ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <div className="label">
        <span className="label-text">Password</span>
      </div>
      <input
        name="password"
        type="password"
        className={clsx("input input-bordered w-full", errors && "input-error")}
        required
        minLength={8}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        aria-invalid={Boolean(errors)}
        aria-describedby={id}
      />
      {errors && <Errors id={id}>{errors.join("; ")}</Errors>}
    </label>
  );
}

function Errors({ children, id }) {
  return (
    <div className="label" id={id}>
      <span
        className="label-text-alt max-w-full text-wrap text-error-content"
        aria-live="polite"
      >
        {children}
      </span>
    </div>
  );
}

export default LoginForm;
