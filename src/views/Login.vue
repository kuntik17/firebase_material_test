<template>
  <div class="wrapper">
    <md-snackbar
      :md-position="position"
      :md-duration="isInfinity ? Infinity : duration"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{ error }}</span>
      <md-button class="md-warning" @click="showSnackbar = false"
        >Try again</md-button
      >
    </md-snackbar>
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <form @submit.prevent="onSignin">
              <login-card header-color="orange">
                <h4 slot="title" class="card-title">Login</h4>

                <p slot="description" class="description"></p>
                <md-field class="md-form-group has-warning" slot="inputs">
                  <md-icon>email</md-icon>
                  <label>E-mail...</label>
                  <md-input v-model="email" type="email" required></md-input>
                </md-field>
                <md-field class="md-form-group has-warning" slot="inputs">
                  <md-icon>lock_outline</md-icon>
                  <label>Password...</label>
                  <md-input
                    v-model="password"
                    type="password"
                    required
                  ></md-input>
                </md-field>
                <md-progress-spinner
                  class="md-simple md-lg "
                  slot="footer"
                  :md-diameter="30"
                  :md-stroke="5"
                  md-mode="indeterminate"
                  v-show="isLoading"
                ></md-progress-spinner>
                <md-button
                  slot="footer"
                  class="md-simple md-warning md-lg"
                  type="submit"
                  v-show="!isLoading"
                >
                  Login
                </md-button>
              </login-card>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from "@/components";

export default {
  components: {
    LoginCard,
  },
  bodyClass: "login-page",
  data() {
    return {
      email: null,
      password: null,
      position: "center",
      duration: 4000,
      isInfinity: false,
      showSnackbar: false,
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/img/header2.jpeg"),
    },
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    isLoading() {
      return this.$store.getters.loading;
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    },
    error(value) {
      if (value !== null && value !== undefined) {
        this.showSnackbar = true;
      }
    },
  },
  methods: {
    onSignin() {
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>
