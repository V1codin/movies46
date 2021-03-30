import Cookies from "js-cookie";
import fetch from "cross-fetch";

export default function setOpts(url, body = null, cb = null) {
  const resBody = body ?? { page: 1 };

  const token = Cookies.get("XSRF-TOKEN");

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "CSRF-Token": token,
    "X-Powered-By": "Custom Server",
  };
  return {
    url: url,
    headers,
    reqBody: resBody,
    callback: cb,
  };
}

export const loginWith = async (dispatch) => {
  const { url, headers } = setOpts("/auth/loginwith");

  try {
    const login = await fetch(url, {
      method: "POST",
      headers,
      credentials: "same-origin",
    });

    if (login.status !== 200) {
      throw Error("");
    }

    const res = await login.json();

    dispatch({
      type: "LOGIN",
      userData: res.userData,
    });
  } catch (e) {
    return dispatch({
      type: "LOGOUT",
    });
  }
};
