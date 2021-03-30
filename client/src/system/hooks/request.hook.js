import { useState, useCallback } from "react";
import { IMAGE_URL } from "../helpers/consts";
// import { HIGH_RES_URL } from "../helpers/consts.js";

export const useRequest = () => {
  const [error, setError] = useState(null);

  const req = useCallback(
    async ({
      url,
      headers = {},
      reqBody = null,
      method = "POST",
      callback = null,
    }) => {
      try {
        const body = reqBody && JSON.stringify(reqBody);

        const res = await fetch(url, {
          method,
          headers,
          body,
          credentials: "same-origin",
        });

        const data = await res.json();

        if (!res.ok) {
          throw Error(data.message || "Server error");
        }

        if (Array.isArray(data.results)) {
          data.results.forEach((item) => {
            item.poster_path =
              item.poster_path === null
                ? null
                : `${IMAGE_URL}${item.poster_path}`;
          });
        }

        if (callback) {
          callback(data);
        }
        return data;
      } catch (e) {
        setError(e.message);
        return { error: true, message: e.message };
      }
    },
    []
  );
  const clearError = () => setError(null);

  return { error, req, clearError };
};
