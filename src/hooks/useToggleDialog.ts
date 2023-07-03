import { useCallback, useState } from "react";

const useToggleDialog = () => {
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);

  const toggle = useCallback(() => {
    setOpen((prev) => {
      return !prev;
    });
    setTimeout(() => {
      setClose((prev) => !prev);
    }, 500);
  }, []);

  const shouldRender = open || close;

  const setStateDialog = useCallback((status: boolean) => {
    setOpen(status);
    setTimeout(() => {
      setClose(status);
    }, 500);
  }, []);

  return { open, toggle, shouldRender, setStateDialog };
};

export default useToggleDialog;
