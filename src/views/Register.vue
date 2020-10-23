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
            <form @submit.prevent="onSignup">
              <modal v-if="classicModal" @close="classicModalHide">
                <template slot="header">
                  <h4 class="modal-title">Modal Title</h4>
                  <md-button
                    class="md-simple md-just-icon md-round modal-default-button"
                    @click="classicModalHide"
                  >
                    <md-icon>clear</md-icon>
                  </md-button>
                </template>

                <template slot="body">
                  <md-content class="md-scrollbar">
                    <p style="color: black">
                      <b>
                        User agreement and legal notice
                      </b>
                      <br />
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Qui, dolores alias. Provident tempora, non neque quibusdam
                      culpa iste maiores officiis voluptatum soluta minus saepe
                      alias error nisi, at ratione praesentium!
                    </p>
                  </md-content>
                </template>

                <template slot="footer">
                  <md-button class="md-warning" type="submit">Agree</md-button>
                  <md-button class="md-simple" @click="classicModalHide"
                    >Cancel</md-button
                  >
                </template>
              </modal>
              <login-card header-color="orange">
                <h4 slot="title" class="card-title">Register</h4>

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
                  @click="classicModalHide"
                  v-show="!isLoading"
                  >Register
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
import { required, minLength } from "vuelidate/lib/validators";
import { Modal } from "@/components";

export default {
  components: {
    LoginCard,
    Modal,
  },
  bodyClass: "login-page",
  data() {
    return {
      classicModal: false,
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
      default: require("@/assets/img/img/header3.jpeg"),
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
      return this.$store.getters.isLoading;
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
    onSignup() {
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password,
      });
    },
    classicModalHide() {
      this.classicModal = !this.classicModal;
    },
  },
};
</script>

<style lang="scss" scoped>
.md-progress-spinner {
  margin: 24px;
}

.md-content {
  max-width: 400px;
  max-height: 200px;
  overflow: auto;
}
</style>
