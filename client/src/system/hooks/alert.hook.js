import { useCallback } from "react";

export const useAlert = () => {
  return useCallback((msg, isFailed = true) => {
    if (msg && window.M) {
      const classes = isFailed ? "alert-fail" : "alert-success";
      window.M.toast({ html: msg, classes, inDuration: 1000 });
    }
  }, []);
};
