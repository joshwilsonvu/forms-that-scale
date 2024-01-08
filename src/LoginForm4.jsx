import { useState } from "react";
import clsx from "clsx";
import useToast from "./useToast";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const addToast = useToast();

  return (
    <form
      className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-box bg-base-100 p-8 shadow-lg"
      onSubmit={(e) => {
        // prevent default behavior, grab form data, show a toast
        e.preventDefault();
        const data = {
          email,
          password,
        };
        console.log(data);

        addToast("You are now logged in. Thanks for visiting!");
      }}
    >
      <h1 className="text-2xl">Log in</h1>
      <EmailField email={email} setEmail={setEmail} />
      <PasswordField
        hasEmail={Boolean(email)}
        password={password}
        setPassword={setPassword}
      />
      <div className="mt-4 flex justify-end gap-4">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}

function EmailField({ email, setEmail }) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">Email</span>
      </div>
      <input
        // no more name attribute
        type="email"
        placeholder="you@example.com"
        className="input input-bordered w-full"
        required
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </label>
  );
}

function PasswordField({ hasEmail, password, setPassword }) {
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
        // no more name attribute
        type="password"
        className="input input-bordered w-full"
        required
        minLength={8}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </label>
  );
}

export default LoginForm;
