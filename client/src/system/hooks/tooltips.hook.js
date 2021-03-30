import { useCallback } from "react";

export const useTooltip = () => {
  return useCallback((...refs) => {
    if (window.M) {
      refs.forEach((item) => {
        window.M.Tooltip.init(item, {
          outDuration: 100,
        });
      });
    }
  }, []);
};
