import { getToken, createUser } from "../../../../system/server/firebase";
import setOptions from "../../../../system/helpers/setDefaultRequestOptions";
import validation from "./validation";

export const signinRequest = async (props) => {
  const { req, setLabelState, history, data, _alert } = props;
  const { checker, result } = validation(data);
  setLabelState(result);

  if (checker !== true) {
    try {
      const user = await createUser({
        ...data,
      });

      const opts = setOptions("/auth/signin", user);
      const res = await req(opts);

      if (res.error) {
        throw Error("Request to the server is failed");
      } else {
        _alert(res.message, false);
      }

      history.push("/auth/login");
    } catch (e) {
      console.log("sign in error");
      _alert(e.message);
    }
  } else {
    _alert("Incorrect input");
  }
  setLabelState({
    email: null,
    pass: null,
    confirmPass: null,
    isSpinner: false,
  });
  return;
};

export const loginRequest = async (props) => {
  const {
    req,
    history,
    _alert,
    data: { email, password },
    loginAction,
    setLabelState,
  } = props;
  if (email === undefined || password === undefined) {
    _alert("Incorrect input");
    return;
  }

  try {
    const idToken = await getToken({
      email,
      password,
    });

    const likedId = +localStorage.getItem("liked");
    const favId = +localStorage.getItem("favorites");

    localStorage.setItem("liked", -1);
    localStorage.setItem("favorites", -1);

    const body = {
      email,
      password,
      idToken,
      moviesToAdd: [
        {
          collection: "liked",
          id: likedId,
        },
        {
          collection: "favorites",
          id: favId,
        },
      ],
    };

    const opts = setOptions("/auth/login", body);

    const res = await req(opts);
    const { message, userData, error } = res;

    if (error) {
      throw Error("Request to the server is failed");
    }

    loginAction(userData);

    history.push("/profile");

    _alert(message, false);
  } catch (e) {
    console.log("error: ", e.message);
    setLabelState({
      isSpinner: false,
    });
    _alert(e.message);
  }

  return;
};
