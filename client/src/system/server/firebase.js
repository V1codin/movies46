import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const {
  REACT_APP_API__KEY_FIREBASE_AUTH,
  REACT_APP_AUTH__DOMAIN_FIREBASE_AUTH,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_API__KEY_FIREBASE_AUTH,
  authDomain: REACT_APP_AUTH__DOMAIN_FIREBASE_AUTH,
};

firebase.initializeApp(firebaseConfig);

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

export const createUser = async (props) => {
  const { email, password } = props;

  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);

    await firebase.auth().signOut();

    return { email, password };
  } catch (e) {
    console.error("create user error");
    throw Error(e.message);
  }
};

export const getToken = async (props) => {
  const { email, password } = props;
  try {
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    const { user } = res;

    const token = await user.getIdToken();

    await firebase.auth().signOut();

    return token;
  } catch (e) {
    console.error("user token error");
    throw Error(e.message);
  }
};
