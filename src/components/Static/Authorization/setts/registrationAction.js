import validation from "./validation";
import {
  db,
  logoutWrapper,
  createUserDataCollation,
  usersCollection,
} from "../../../../system/Setts/firebase";

export const signInHandler = async (props) => {
  const {
    setLabelState,
    createUser,
    history,
    data,

    setError,
    errorHandler,
  } = props;
  const { checker, result } = validation(data);
  setLabelState(result);

  if (checker !== true) {
    const { email, password } = data;

    const newUser = await createUser(email, password, errorHandler, setError);

    if (newUser.user.email) {
      await createUserDataCollation(newUser.user, usersCollection);

      setLabelState({
        email: "",
        password: "",
        confirmPassword: "",
        error: false,
        errorText: "",
      });
      setError({ signIn: false, errorText: "", login: false });

      history.push("/auth/logIn");
    }
  }
};

export const createUser = async (email, pass, errorFn, setErrorState) => {
  try {
    const res = await db.auth().createUserWithEmailAndPassword(email, pass);
    res.user.updateProfile({
      registratinoTime: new Date().toString(),
    });

    return res;
  } catch (e) {
    console.log("error console: ", e.message);
    errorFn(e, setErrorState, "signIn");
    return {
      user: {
        email: undefined,
      },
    };
  }
};

export const loginRequest = async (
  email,
  pass,
  dispatch,
  history,
  errorFn,
  setErrorState,

  logoutHandler
) => {
  if (email === undefined || pass === undefined) {
    console.log("Data is undefined");
    return;
  }
  try {
    const res = await db.auth().signInWithEmailAndPassword(email, pass);

    if (res) {
      const {
        user: { uid },
      } = res;

      const doc = await usersCollection.doc(uid).get();

      const userData = doc.data();

      const rawLiked = await usersCollection
        .doc(uid)
        .collection("movies")
        .doc("liked")
        .get();

      const rawFav = await usersCollection
        .doc(uid)
        .collection("movies")
        .doc("favorites")
        .get();

      const liked = rawLiked.data().data;
      const favorites = rawFav.data().data;

      const collaction = {
        liked,
        favorites,
      };

      const logout = logoutHandler(logoutWrapper);

      db.auth().onAuthStateChanged((curUser) => {
        if (curUser) {
          dispatch({
            type: "LOGIN",
            userData: userData,
          });

          dispatch({
            type: "GET_USER_MOVIES",
            userData: collaction,
          });

          localStorage.setItem("isLogged", true);

          const cashedId = localStorage.getItem("filmId");
          localStorage.setItem("filmId", -1);

          if (cashedId === null || cashedId === "-1") {
            // history.push("/");
            history.push("/account");
          } else {
            history.push(`/movies/${cashedId}`);
          }
        } else {
          console.log("log out");
          logout();
        }
      });
    }
  } catch (e) {
    console.log("error: ", e.message);
    errorFn(e, setErrorState, "logIn");
    return;
  }
};
