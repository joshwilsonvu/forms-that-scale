import { useState, useId } from "react";
import clsx from "clsx";
import * as z from "zod";
import useToast from "./useToast";

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .refine((data) => data.email !== data.password, {
    message: "Email and password cannot match",
    path: ["password"],
  });

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const addToast = useToast();

  const validate = () => {
    const data = {
      email,
      password,
    };
    const { success, data: parsedData, error } = schema.safeParse(data);
    if (success) {
      setErrors({});
      return parsedData;
    }
    setErrors(error.format());
    return null;
  };

  return (
    <form className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-box bg-base-100 p-8 shadow-lg">
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
        <button
          type="button" // no longer type="submit"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();

            // validate manually, toast on success
            const data = validate();
            if (data) {
              console.log(data);
              addToast("You are now logged in. Thanks for visiting!");
            }
          }}
        >
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
      <span className="label-text-alt max-w-full text-wrap text-error-content">
        {children}
      </span>
    </div>
  );
}

export default LoginForm;
