import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import MaterialKit from "./plugins/material-kit";
import Vuelidate from "vuelidate";
import * as firebase from "firebase";
import { store } from "./store";
import db from "@/fb";
import { firestorePlugin } from "vuefire";
import VueParticles from "vue-particles";

Vue.use(VueParticles);
Vue.use(firestorePlugin);
Vue.config.productionTip = false;
Vue.use(MaterialKit);
Vue.use(Vuelidate);

const NavbarStore = {
  showNavbar: false,
};

Vue.mixin({
  data() {
    return {
      NavbarStore,
    };
  },
});

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
      }
    });
  },
});
