import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";
import axios from "axios";
import router from "../router";

Vue.use(Vuex);

export const store = new Vuex.Store({
  //##############//
  //STATE
  state: {
    user: null, //logged in user info
    isLoading: false, //Loading for async actions
    error: null, // Error code for Snakbar
    myHouseId: null, // If user has an house, user's house ID
    loadedHouse: {
      title: "",
      owner: "",
      buildDate: "",
      location: "",
      imageUrl: [""],
    }, // Before rendering an house page, get data from firebase
  },
  //##############//
  //MUTATIONS
  mutations: {
    setLoadedHouse(state, payload) {
      state.loadedHouse = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    createHouse(state, payload) {
      state.setLoadedHouse = payload;
    },

    setMyHouse(state, payload) {
      state.myHouseId = payload;
    },
  },
  //##############//
  //ACTIONS
  actions: {
    //Firebase sign up action
    signUserUp({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = {
            id: user.user.uid,
          };

          //Create user with email and password then commit new user, finish loading
          commit("setUser", newUser);
          commit("setLoading", false);
        })
        .catch((error) => {
          //Catch error then print error, finish loading
          commit("setLoading", false);
          if (error.code === "auth/email-already-in-use") {
            commit("setError", "E-mail already in use");
          } else if (error.code === "auth/invalid-email") {
            commit("setError", "Invalid e-mail");
          } else if (error.code === "auth/operation-not-allowed") {
            commit("setError", "Operation not allowed");
          } else if (error.code === "auth/weak-password") {
            commit("setError", "Password must contain 6 digits");
          }
        });
    },
    //EOF Sing up action
    //##############//
    //Firebase sign in action
    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = {
            id: user.user.uid,
          };
          //Login user with email and password then commit new user, finish loading
          commit("setUser", newUser);
          this.dispatch.myHouse(newUser.id);
          commit("setLoading", false);
        })
        //Catch error then print error, finish loading
        .catch((error) => {
          commit("setLoading", false);
          if (error.code === "auth/wrong-password") {
            commit("setError", "Wrong password");
          } else if (error.code === "auth/user-not-found") {
            commit("setError", "E-mail not found");
          } else if (error.code === "auth/too-many-requests") {
            commit("setError", "Too many requests");
          } else if (error.code === "auth/argument-error") {
            commit("setError", "Invalid type e-mail");
          }
        });
    },
    //EOF Sing in action
    //##############//
    //Creating house action
    async createHouse(context, payload) {
      context.commit("setLoading", true);
      context.commit("clearError");

      try {
        const house = {
          title: payload.title,
          buildDate: payload.buildDate,
          location: payload.location,
          owner: context.getters.user.id,
        };

        //house id
        let id;
        //Add house to firebase

        const fbResponse = await firebase
          .firestore()
          .collection("houses")
          .add(house)
          .then((data) => {
            id = data.id;
            return id;
          });

        //house id
        house.id = id;

        const imageUrls = [];

        //check if user add an image
        if (payload.image.length > 0) {
          for (
            var imageCounter = 0;
            imageCounter < payload.image.length;
            imageCounter++
          ) {
            const filename = payload.image[imageCounter].name;
            const ext = filename.slice(filename.lastIndexOf("."));

            const imgInfo = await firebase
              .storage()
              //storage location
              .ref(`houses/${id}/${imageCounter}${ext}`)
              //put image request to location
              .put(payload.image[imageCounter]);

            const imagePath = imgInfo.metadata.fullPath;

            const imageUrl = await firebase
              .storage()
              .ref("houses/" + id + "/" + imageCounter + ext)
              .getDownloadURL();

            imageUrls.push(imageUrl);

            //Add imageUrl to house
          }

          //update house with image

          const fbUpdateResponse = await firebase
            .firestore()
            .collection("houses")
            .doc(id)
            .update({ imageUrl: imageUrls });
        } //EOF if image exists
        //if image not uploaded, use stock image
        else {
          imageUrls.push(
            "https://firebasestorage.googleapis.com/v0/b/takikolay-451c1.appspot.com/o/houses%2Fstock%2Fbalonlar.jpg?alt=media&token=b738d62d-32dd-411d-ad0f-8765fc9be449"
          );
          const fbUpdateResponse = await firebase
            .firestore()
            .collection("houses")
            .doc(id)
            .update({ imageUrl: imageUrls });
        }

        //Add created house to state
        context.commit("setLoading", false);
        context.commit("createHouse", house);
        context.commit("setMyHouse", id);

        //After creating house redirect to house page
        router.push("/house/" + id);

        //EOF try catch errors
      } catch (error) {
        context.commit("setLoading", false);
        context.commit("setError", error.message);
      }
    },
    //EOF Create house action

    //##############//
    //Auto sign in action
    async autoSignIn({ dispatch, commit }, payload) {
      await dispatch("myHouse", payload.uid);
      commit("setUser", { id: payload.uid });
    },
    //EOF auto sig in action
    //##############//
    //Logout action
    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    },
    //EOF logut action
    //##############//
    //Clear error action
    clearError({ commit }) {
      commit("clearError");
    },
    //EOF clear error action
    //##############//
    //Find House by id
    async findHouse({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      try {
        const house = {
          title: null,
          owner: null,
          buildDate: null,
          location: null,
          imageUrl: [],
        };

        const ref = await firebase
          .firestore()
          .collection("houses")
          .doc(payload.urlId);
        ref.get().then((doc) => {
          //if house exist
          if (doc.exists) {
            this.key = doc.id;
            commit("setLoadedHouse", doc.data());
            commit("setLoading", false);
            return doc.data();
          } else {
            commit("setLoading", false);
            commit("setError", "House not found");
          }
        });
      } catch (error) {
        commit("setLoading", false);
        commit("setError", "House not found");
      }
    },
    //EOF find house by id
    //##############//
    //Find house by owner
    async myHouse({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      try {
        // Create a reference to the houses
        const ref = firebase.firestore().collection("houses");

        // Find houses id where owner equals to the payload owner id
        const myHouseId = await ref.where("owner", "==", payload).get();

        //if user has non house
        if (myHouseId === null || myHouseId === undefined) {
          commit("setLoading", false);
          return null;
        } else {
          commit("setMyHouse", myHouseId.docs[0].id);
          commit("setLoading", false);
          return mymy.docs[0].id;
        }
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        return null;
      }
    },
    //EOF Find house by owner
    //##############//
    //Send gift to house
    async sendGold({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");

      try {
        const ref = await firebase
          .firestore()
          .collection("houses")
          .doc(payload.id);

        // Atomically add a new region to the "regions" array field.
        ref
          .update({
            gifts: firebase.firestore.FieldValue.arrayUnion({
              sender: payload.senderFullName,
              goldType: payload.goldType,
              note: payload.note,
            }),
          })
          .then(() => {
            commit("setLoading", true);
            return true;
          });
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        return null;
      }
    },
  },
  //##############//
  //GETTERS
  getters: {
    user(state) {
      return state.user;
    },
    isLoading(state) {
      return state.isLoading;
    },
    error(state) {
      return state.error;
    },
    loadedHouse(state) {
      return state.loadedHouse;
    },
    myHouseId(state) {
      return state.myHouseId;
    },
  },
});
