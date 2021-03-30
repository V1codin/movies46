const fetch = require("cross-fetch");
const admin = require("firebase-admin");
const serviceAccount = require("../../config/serviceAccountSetts.json");

require("dotenv").config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();

const Auth = admin.auth();
const FieldValue = admin.firestore.FieldValue;

const usersCollection = firestore.collection("users");

const {
  API__KEY_MOVIESEARCHER,
  API__KEY_MOVIESEARCHER_REQUEST_TOKEN,
  IMAGE_URL,
  HIGH_RES_URL,
  LIST_URL,
  SEARCH_URL,
  SINGLE_MOVIE_URL,
} = process.env;

const setCookie = async (idToken, min) => {
  const expiresIn = 60 * min * 1000;

  const sessionCookie = await Auth.createSessionCookie(idToken, { expiresIn });

  const cookieOpts = {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
  };
  return {
    sessionCookie,
    cookieOpts,
  };
};

const mb = {
  getSingleMovie: async (id) => {
    try {
      const singleMovie = await (
        await fetch(
          `${SINGLE_MOVIE_URL}/movie/${id}?api_key=${API__KEY_MOVIESEARCHER}&language=en-US`
        )
      ).json();

      singleMovie.backdrop_path = singleMovie.backdrop_path
        ? `${HIGH_RES_URL}${singleMovie.backdrop_path}`
        : "";

      const castAndCrew = await (await mb.getCastAndCrew(id)).json();

      const { cast, crew } = castAndCrew;

      const resCast = {
        cast: [
          ...cast
            .filter((_, ind) => ind <= 20)
            .map((item) => {
              item.profile_path = item.profile_path
                ? `${IMAGE_URL}${item.profile_path}`
                : "";
              return item;
            }),
        ],
        crew: [crew.filter((_, ind) => ind <= 20)],
      };

      const images = await (await mb.getImages(id)).json();

      return { singleMovie, cast: resCast, images };
    } catch (e) {
      console.error("get single movie error", e);
      throw Error("MOVIES DATABASE ERROR");
    }
  },

  getCastAndCrew: (id) =>
    fetch(
      `${SINGLE_MOVIE_URL}/movie/${id}/credits?api_key=${API__KEY_MOVIESEARCHER}&language=en-US`
    ),

  getImages: (id) =>
    fetch(
      `${SINGLE_MOVIE_URL}/movie/${id}/images?api_key=${API__KEY_MOVIESEARCHER}&language=en-US`
    ),

  getListByPopularity: (page) =>
    fetch(
      `${LIST_URL}/discover/movie?sort_by=popularity.desc&page=${page}&language=en`,
      {
        headers: {
          Authorization: `Bearer ${API__KEY_MOVIESEARCHER_REQUEST_TOKEN}`,
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    ),
  getListByRating: (page) =>
    fetch(
      `${LIST_URL}/discover/movie?&vote_average.gte=8&page=${page}&language=en`,
      {
        headers: {
          Authorization: `Bearer ${API__KEY_MOVIESEARCHER_REQUEST_TOKEN}`,
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    ),
  getListFromSearch: (value, page = 1) =>
    fetch(
      `${SEARCH_URL}${API__KEY_MOVIESEARCHER}&page=${page}&language=en&query=${value}`
    ),
};

const fb = {
  loginViaCookie: async (cookie) => {
    try {
      const res = await Auth.verifySessionCookie(cookie, true);

      const { uid } = res;
      if (uid) {
        const userInfo = await fb.getUsersInfo(uid);

        const expiresIn = 60 * 6 * 1000;

        const cookieOpts = {
          maxAge: expiresIn,
          httpOnly: true,
          secure: true,
        };

        const result = {
          data: {
            message: "You have logged in",
            userData: {
              ...userInfo,
            },
          },
          cookie: {
            sessionCookie: cookie,
            cookieOpts,
          },
        };

        return result;
      }
    } catch (e) {
      console.error("login via cookie error", e);
      throw Error("UNAUTHORIZED REQUEST");
    }
  },

  updateUser: async (body) => {
    const { email } = body;

    try {
      const { uid } = await Auth.getUserByEmail(email);
      const updated = await usersCollection.doc(uid).update({
        ...body,
      });

      const user = await fb.getUsersInfo(uid);

      return user;
    } catch (e) {
      console.error("update user error", e);
      throw Error(e.message);
    }
  },

  createUser: async (email) => {
    try {
      const res = await Auth.getUserByEmail(email);

      const { uid } = res;

      const userDoc = usersCollection.doc(uid);
      await userDoc.set({
        email: email,
        photoURL: "",
        photoFile: "",
        displayName: "",
      });

      await userDoc.collection("movies").doc("favorites").set({
        data: [],
      });
      await userDoc.collection("movies").doc("liked").set({
        data: [],
      });

      return { message: "User has been registered" };
    } catch (e) {
      console.error("create collation error: ", e);
      throw Error(e.message);
    }
  },

  getUsersInfo: async (uid) => {
    try {
      const user = await usersCollection.doc(uid).get();

      const res = {
        name: user.data().displayName || "",
        userMovies: {},
        userData: user.data(),
      };

      const collection = await firestore
        .collection("users")
        .doc(uid)
        .collection("movies")
        .get();

      collection.forEach((item) => {
        const raw = item.data();

        res.userMovies[item.id] = raw.data;
      });

      return res;
    } catch (e) {
      console.error("get user by email error", e);
      throw Error(e.message);
    }
  },

  getUserDocument: (userId, docName) => {
    try {
      return firestore
        .collection("users")
        .doc(userId)
        .collection("movies")
        .doc(docName);
    } catch (e) {
      console.error("get document error", e);
      throw Error(e.message);
    }
  },

  addToCollections: async (movieToAdd, userId) => {
    try {
      if (movieToAdd.id !== -1) {
        const { singleMovie } = await mb.getSingleMovie(movieToAdd.id);

        const collectionRef = fb.getUserDocument(userId, movieToAdd.collection);

        const { data } = (await collectionRef.get()).data();

        if (
          data.every((_item) => _item.id !== movieToAdd.id) ||
          data.length === 0
        ) {
          return await firestore.runTransaction(
            async (transaction) => {
              transaction.update(collectionRef, {
                data: FieldValue.arrayUnion(singleMovie),
              });
            },
            {
              maxAttempts: 2,
            }
          );
        } else {
          throw Error(
            `The movie is already in ${movieToAdd.collection} collection`
          );
        }
      }

      return new Promise((res) => {
        res("default");
      });
    } catch (e) {
      console.error("add to collections error", e);
      throw Error(e.message);
    }
  },

  login: async (body) => {
    const {
      idToken,
      moviesToAdd: [liked, favs],
    } = body;

    try {
      const { uid } = await Auth.verifyIdToken(idToken);

      if (uid) {
        await fb.addToCollections(liked, uid);
        await fb.addToCollections(favs, uid);

        const userInfo = await fb.getUsersInfo(uid);

        const newCookie = await setCookie(idToken, 6);

        const result = {
          data: {
            message: "You have logged in",
            userData: {
              ...userInfo,
            },
          },
          cookie: {
            ...newCookie,
          },
        };
        return result;
      }
      throw Error("UNAUTHORIZED REQUEST");
    } catch (e) {
      console.error("login by id token error: ", e);
      throw Error(e.message);
    }
  },

  logout: async (cookie) => {
    try {
      if (cookie) {
        const claims = await Auth.verifySessionCookie(cookie);
        await Auth.revokeRefreshTokens(claims.sub);
      }

      return { message: "You have logged out" };
    } catch (e) {
      console.error("logout error", e);
      throw Error(e.message);
    }
  },
};

module.exports = {
  fb,
  mb,
};
