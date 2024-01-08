import { useState, useCallback } from "react";
import { ToastContext } from "./useToast.jsx";

function ToastsProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((message) => {
    setToasts((t) => [...t, message]);
    setTimeout(() => {
      setToasts((t) => {
        const index = t.findIndex((m) => m === message);
        const newToasts = t.slice();
        newToasts.splice(index, 1);
        return newToasts;
      });
    }, 3000);
  }, []);

  return (
    <>
      <ToastContext.Provider value={addToast}>{children}</ToastContext.Provider>
      <div className="toast toast-center toast-bottom">
        {toasts.map((message, i) => (
          <div
            key={`${message}-${i}`}
            role="alert"
            className="alert alert-success"
          >
            {message}
          </div>
        ))}
      </div>
    </>
  );
}

export default ToastsProvider;
