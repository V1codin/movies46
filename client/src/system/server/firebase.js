import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
require("dotenv").config();

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

/*
export const firestore = db.firestore();
export const usersCollection = firestore.collection("users");

export const getUserDoc = (userId, docName) => {
  return firestore
    .collection("users")
    .doc(userId)
    .collection("movies")
    .doc(docName);
};

export const logoutWrapper = (dispatchLogout) => {
  return async () => {
    const auth = db.auth();
    try {
      await auth.signOut();
      dispatchLogout();
      window.location.reload();

      localStorage.setItem("isLogged", false);
      console.log("signed out");
    } catch (e) {
      console.log("sign out error", e);
    }
  };
};

export const createUserDataCollation = async (userData, rootCollection) => {
  const { uid, email } = userData;
  const userDoc = rootCollection.doc(uid);
  try {
    await userDoc.set({
      email: email,
      photoURL: "",
      displayName: "",
    });

    await userDoc.collection("movies").doc("favorites").set({
      data: [],
    });
    await userDoc.collection("movies").doc("liked").set({
      data: [],
    });
  } catch (e) {
    console.error("create collation error: ", e);
  }
};

const updateFireBaseMovies = async (
  userId,
  collectionName,
  movie,
  reduxUpdateCallback
) => {
  try {
    const collection = await getUserDoc(userId, collectionName).get();

    const { data } = collection.data();
    if (data.every((item) => item.id !== movie.id) || data.length === 0) {
      await getUserDoc(userId, collectionName).update({
        data: firebase.firestore.FieldValue.arrayUnion(movie),
      });
      reduxUpdateCallback(movie);
    } else {
      console.log(`The movie is already in ${collectionName}`);
    }
  } catch (e) {
    console.log(`add to ${collectionName} list error`, e);
  }
};

export const addToLikedList = (
  movie,
  reduxUpdateCallback,
  collection = "liked"
) => {
  const userId = db.auth().currentUser.uid;
  updateFireBaseMovies(userId, collection, movie, reduxUpdateCallback);
};

export const addToFavoritesList = (
  movie,
  reduxUpdateCallback,
  collection = "favorites"
) => {
  const userId = db.auth().currentUser.uid;
  updateFireBaseMovies(userId, collection, movie, reduxUpdateCallback);
};

export const removeMovieFromList = async (
  id,
  collectionName,
  reduxUpdateCallback
) => {
  const userId = db.auth().currentUser.uid;

  try {
    const collection = await getUserDoc(userId, collectionName).get();

    const { data } = collection.data();

    if (data.length !== 0) {
      const element = data.find((item) => item.id === id);

      await getUserDoc(userId, collectionName).update({
        data: firebase.firestore.FieldValue.arrayRemove(element),
      });

      const name = collectionName.toUpperCase();
      const type = `DELETE_${name}_MOVIE`;

      reduxUpdateCallback(id, type);
    } else {
      throw Error("The collection is empty");
    }
  } catch (e) {
    console.log(`remove from ${collectionName} list error`, e);
  }
};
*/
