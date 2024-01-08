import { createContext, useContext } from "react";

export const ToastContext = createContext(() => {});

// eslint-disable-next-line react-refresh/only-export-components
export default function useToast() {
  const addToast = useContext(ToastContext);
  return addToast;
}
