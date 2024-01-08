import useToast from "./useToast";

function LoginForm() {
  const addToast = useToast();

  return (
    <form
      className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-box bg-base-100 p-8 shadow-lg"
      onSubmit={(e) => {
        // prevent default behavior, grab form data, show a toast
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
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
  );
}

function EmailField() {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">Email</span>
      </div>
      <input
        name="email"
        type="email"
        placeholder="you@example.com"
        className="input input-bordered w-full"
        required
        autoFocus
      />
    </label>
  );
}

function PasswordField() {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">Password</span>
      </div>
      <input
        name="password"
        type="password"
        className="input input-bordered w-full"
        required
        minLength={8}
      />
    </label>
  );
}

export default LoginForm;
