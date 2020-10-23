import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Legal from "./views/Legal.vue";
import Register from "./views/Register.vue";
import Create from "./views/Create.vue";
import Houses from "./views/Houses.vue";
import Profile from "./views/Profile.vue";
import MainNavbar from "./layout/MainNavbar.vue";
import MainFooter from "./layout/MainFooter.vue";
import { store } from "./store";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/create",
      name: "create",
      components: { default: Create, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
      beforeEnter: (to, from, next) => {
        if (store.getters.user) {
          next();
        } else {
          next("/login");
        }
      },
    },
    {
      path: "/house/:id",
      name: "house-id",
      components: { default: Profile, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
      beforeEnter(to, from, next) {
        store.dispatch("findHouse", { urlId: to.params.id }).then(() => {
          next();
        });
      },
    },
    {
      path: "/houses",
      name: "houses",
      components: {
        default: Houses,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
      beforeEnter: (to, from, next) => {
        if (store.getters.user) {
          if (store.getters.myHouseId === null) {
            next();
          } else {
            store
              .dispatch("findHouse", {
                urlId: store.getters.myHouseId,
              })
              .then(() => {
                next();
              });
          } //EOF inside else
        } else {
          //if user not logged in
          next("/login");
        }
      },
    },
    {
      path: "/test",
      name: "index",
      components: { default: Index, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/",
      name: "landing",
      components: { default: Landing, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/login",
      name: "login",
      components: { default: Login, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
      },
    },
    {
      path: "/register",
      name: "register",
      components: { default: Register, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
      },
    },
    {
      path: "/legal",
      name: "legal",
      components: { default: Legal, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
      },
    },
  ],
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});
