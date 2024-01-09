import { useState } from "react";
import LoginForm1 from "./LoginForm1.jsx";
import LoginForm2 from "./LoginForm2.jsx";
import LoginForm3 from "./LoginForm3.jsx";
import LoginForm4 from "./LoginForm4.jsx";
import LoginForm5 from "./LoginForm5.jsx";
import LoginForm6 from "./LoginForm6.jsx";
import LoginForm7 from "./LoginForm7.jsx";

import ToastsProvider from "./ToastsProvider.jsx";

const demos = [
  { Component: LoginForm1, title: "Plain HTML form" },
  { Component: LoginForm2, title: "Adding a submit handler" },
  { Component: LoginForm3, title: "Refactoring to a controlled input" },
  { Component: LoginForm4, title: "Controlling other inputs for consistency" },
  {
    Component: LoginForm5,
    title: "Custom validation on submit (typical LP form)",
  },
  { Component: LoginForm6, title: "Improving custom validation UX" },
  { Component: LoginForm7, title: "Improving DX with React Hook Form" },
  // { Component: LoginForm8, title: "Doing better with a new library" },
];

export default function App() {
  const [demoNum, setDemoNum] = useState(0);
  const { Component } = demos[demoNum];

  return (
    <>
      <nav className="fixed left-4 top-4">
        <select
          className="select select-bordered"
          value={demoNum}
          onChange={(e) => setDemoNum(e.target.value)}
        >
          {demos.map(({ title }, i) => (
            <option key={i} value={i}>
              {title}
            </option>
          ))}
        </select>
      </nav>
      <ToastsProvider>
        <Component />
      </ToastsProvider>
    </>
  );
}
