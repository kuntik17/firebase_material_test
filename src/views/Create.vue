<template>
  <div class="wrapper">
    <md-snackbar
      :md-position="position"
      :md-duration="isInfinity ? Infinity : duration"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{ this.error }} </span>
      <md-button class="md-warning" @click="showSnackbar = false"
        >Try again</md-button
      >
    </md-snackbar>
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div v-show="step === 0">
          <div class="md-layout">
            <div
              class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
            >
              <login-card header-color="orange">
                <h4 slot="title" class="card-title">Create listing</h4>

                <p slot="description" class="description" style="color: black">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Magni illum aspernatur sit voluptatem nobis, architecto,
                  commodi reprehenderit hic dolorem illo officia maiores quidem,
                  cupiditate nulla. Exercitationem repudiandae accusantium nihil
                  optio.
                </p>

                <md-button
                  slot="footer"
                  class="md-simple md-warning md-lg"
                  @click.prevent="next()"
                >
                  Next
                </md-button>
              </login-card>
            </div>
          </div>
        </div>

        <div v-show="step === 1">
          <div class="md-layout">
            <div
              class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
            >
              <login-card header-color="orange">
                <h4 slot="title" class="card-title">About house</h4>

                <p slot="description" class="description"></p>
                <md-field class="md-form-group has-warning" slot="inputs">
                  <md-icon>title</md-icon>
                  <label>Listing title...</label>
                  <md-input v-model="title" type="text" required></md-input>
                </md-field>
                <md-field class="md-form-group has-warning" slot="inputs">
                  <md-tooltip md-direction="top">Was built</md-tooltip>
                  <md-icon>event_note</md-icon>
                  <label></label>
                  <md-input
                    type="date"
                    v-model="buildDate"
                    min="1920-01-01"
                    max="2002-12-01"
                    required
                  ></md-input>
                </md-field>
                <md-field class="md-form-group has-warning" slot="inputs">
                  <md-icon>location_on</md-icon>
                  <label>Location...</label>
                  <md-input
                    v-model="location"
                    maxlength="11"
                    md-counter="11"
                    required
                  ></md-input>
                </md-field>

                <md-button
                  slot="footer"
                  class="md-simple md-warning md-lg"
                  @click.prevent="next()"
                >
                  Next
                </md-button>
              </login-card>
            </div>
          </div>
        </div>

        <div v-show="step === 2">
          <div class="md-layout">
            <div
              class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
            >
              <login-card header-color="orange">
                <h4 slot="title" class="card-title">Images</h4>

                <p slot="description" class="description"></p>

                <md-field
                  class="md-form-group has-warning justify-center"
                  slot="inputs"
                >
                  <md-icon>cloud_upload</md-icon>
                  <label>Images (max 5)</label>
                  <md-input @click="onPickFile" />

                  <input
                    type="file"
                    style="display: none"
                    multiple
                    ref="fileInput"
                    accept="image/*"
                    @change="onFilePicked"
                  />
                </md-field>

                <md-field class="md-form-group has-warning" slot="inputs">
                  <div
                    class="md-layout-item md-size-100 md-small-size-100 md-xsmall-size-100 md-medium-size-100 mx-auto"
                  >
                    <img :src="imageUrl" height="150" />
                  </div>
                </md-field>
                <md-button
                  slot="footer"
                  class="md-simple md-warning md-lg"
                  @click.prevent="back()"
                  v-show="!isLoading"
                >
                  Back
                </md-button>
                <md-button
                  slot="footer"
                  class="md-simple md-warning md-lg"
                  @click.prevent="onCreateHouse()"
                  v-show="!isLoading"
                >
                  Create
                </md-button>

                <md-progress-spinner
                  class="md-simple md-lg "
                  slot="footer"
                  :md-diameter="30"
                  :md-stroke="5"
                  md-mode="indeterminate"
                  v-show="isLoading"
                ></md-progress-spinner>
              </login-card>
            </div>
          </div>
        </div>

        <div id="progress-pagination">
          <div class="md-layout">
            <div
              class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
            >
              <div class="title">
                <md-progress-bar
                  class="md-warning"
                  :md-value="amount"
                  v-show="!isLoading"
                ></md-progress-bar>
                <md-progress-bar
                  md-mode="indeterminate"
                  v-show="isLoading"
                ></md-progress-bar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from "@/components";

export default {
  name: "Upload",
  components: {
    LoginCard,
  },
  bodyClass: "login-page",
  data() {
    return {
      position: "center",
      duration: 4000,
      isInfinity: false,
      showSnackbar: false,
      image: [],
      imageUrl: "",
      error: null,
      step: 0,
      title: "",
      buildDate: null,
      location: null,
      amount: 0,
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/img/header1.jpeg"),
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
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  methods: {
    next() {
      //opening lorem
      if (this.step === 0) {
        this.step++;
        this.amount += 33;
      }
      //first form
      else if (this.step === 1) {
        var date = new Date(this.buildDate).getFullYear();
        var today = new Date().getFullYear();
        //Build day must be before today
        if (date > today) {
          this.showSnackbar = true;
          this.error = "Invalid date";
          return false;
        }
        this.step++;
        this.amount += 33;
      } else if (this.step === 2) {
        this.step++;
        this.amount += 33;
      }
    },
    back() {
      this.step--;
      this.amount -= 33;
    },
    onCreateHouse() {
      if (this.step === 2) {
        const houseData = {
          title: this.title,
          buildDate: this.buildDate,
          location: this.location,
          owner: this.user.id,
          image: this.image,
        };
        this.$store.dispatch("createHouse", houseData);
      }
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;

      if (files.length < 6) {
        for (var i = 0; i < files.length; i++) {
          let filename = files[i].name;

          if (filename.lastIndexOf(".") <= 0) {
            this.showSnackbar = true;
            this.error = "Invalid file";
            return false;
          }

          const fileReader = new FileReader();
          fileReader.addEventListener("load", () => {
            this.imageUrl = fileReader.result;
          });
          fileReader.readAsDataURL(files[i]);
          this.image.push(files[i]);
        }
      } else {
        this.showSnackbar = true;
        this.error = "Maximum 5 images can be selected";
      }
    },
  },
};
</script>

<style lang="css" scoped>
#my-strictly-unique-vue-upload-multiple-image {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
