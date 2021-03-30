import { useCallback } from "react";

export const useDropDown = () => {
  return useCallback((elem) => {
    if (elem && window.M) {
      window.M.Dropdown.init(elem, {
        coverTrigger: false,
        constrainWidth: false,
      });
    }
  }, []);
};
