const { REACT_APP_SERVER_LINK } = process.env;

export const serverLogin = (userIdToken, csrfToken) => {
  console.log("csrfToken: ", csrfToken);
  console.log("userIdToken: ", userIdToken);
  return fetch(`${REACT_APP_SERVER_LINK}/login`, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "CSRF-Token": csrfToken,
    },
    body: JSON.stringify({ userIdToken }),
  });
};
