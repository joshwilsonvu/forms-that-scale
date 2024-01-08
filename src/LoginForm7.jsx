import clsx from "clsx";
import * as z from "zod";
import useToast from "./useToast";
import { useId } from "react";

import { useForm, FormProvider, useFormState, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const formMethods = useForm({
    resolver: zodResolver(schema),
    criteriaMode: "all",
    mode: "onBlur",
  });
  const { register, handleSubmit } = formMethods;
  const addToast = useToast();

  return (
    <FormProvider {...formMethods}>
      <form
        className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-box bg-base-100 p-8 shadow-lg"
        onSubmit={handleSubmit((data) => {
          console.log(data);

          addToast("You are now logged in. Thanks for visiting!");
        })}
        noValidate
      >
        <h1 className="text-2xl">Log in</h1>
        <EmailField register={register} />
        <PasswordField register={register} />
        <div className="mt-4 flex justify-end gap-4">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

function EmailField({ register }) {
  const id = useId();
  const errors = useFormState().errors.email;

  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">Email</span>
      </div>
      <input
        {...register("email", { required: true })}
        type="email"
        placeholder="you@example.com"
        className={clsx("input input-bordered w-full", errors && "input-error")}
        autoFocus
        aria-invalid={Boolean(errors)}
        aria-describedby={id}
      />
      {errors && (
        <Errors id={id}>{Object.values(errors.types).join("; ")}</Errors>
      )}
    </label>
  );
}

function PasswordField({ register }) {
  const id = useId();
  const hasEmail = Boolean(useWatch({ name: "email" }));
  const errors = useFormState().errors.password;

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
        {...register("password", { required: true, minLength: 8 })}
        type="password"
        className={clsx("input input-bordered w-full", errors && "input-error")}
        aria-invalid={Boolean(errors)}
        aria-describedby={id}
      />
      {errors && (
        <Errors id={id}>{Object.values(errors.types).join("; ")}</Errors>
      )}
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
