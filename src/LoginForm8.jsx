/* eslint-disable no-undef */

import clsx from "clsx";
import * as z from "zod";
import useToast from "./useToast";
import { useId } from "react";

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
  const addToast = useToast();
  const form = useForm({ schema, id: "login-form" });

  return (
    <form.Provider>
      <form
        id="login-form"
        className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-box bg-base-100 p-8 shadow-lg"
        onSubmit={(e) => {
          // prevent default behavior, grab form data, show a toast
          e.preventDefault();
          const data = form.data;
          console.log(data);

          addToast("You are now logged in. Thanks for visiting!");
        }}
      >
        <h1 className="text-2xl">Log in</h1>
        <EmailField />
        <PasswordField />
        <div className="mt-4 flex justify-end gap-4">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </form.Provider>
  );
}

function EmailField() {
  const emailField = useField("email");
  const id = useId();

  const errors = emailField.errors;

  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">Email</span>
      </div>
      <input
        name={emailField.name}
        type="email"
        placeholder="you@example.com"
        className={clsx("input input-bordered w-full", errors && "input-error")}
        autoFocus
        aria-describedby={id}
      />
      {errors && <Errors id={id}>{errors.join("; ")}</Errors>}
    </label>
  );
}

function PasswordField() {
  const emailField = useField("email");
  const passwordField = useField("password");
  const id = useId();

  const hasEmail = Boolean(emailField.value);
  const errors = passwordField.errors;

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
        name={passwordField.name}
        type="password"
        className={clsx("input input-bordered w-full", errors && "input-error")}
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
