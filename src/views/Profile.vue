<template>
  <div class="wrapper" :v-if="!isLoading">
    <md-snackbar
      :md-position="position"
      :md-duration="isInfinity ? Infinity : duration"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{ this.error }}</span>
      <md-button class="md-warning" @click="showSnackbar = false"
        >Tekrar dene</md-button
      >
    </md-snackbar>
    <parallax
      class="section page-header header-filter"
      :style="headerStyle"
    ></parallax>

    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-50 mx-auto">
              <div class="profile">
                <img
                  :src="loadHouse.imageUrl[0]"
                  alt="Raised Image"
                  class="img-raised rounded"
                  style="max-width: 300px;"
                />
                <div class="name">
                  <h3 class="title"></h3>
                  <h4>{{ loadHouse.title }} ♥</h4>
                  <h4>{{ loadHouse.buildDate }}</h4>
                  <md-button class="md-warning md-simple">
                    {{ loadHouse.location }}
                  </md-button>
                </div>
              </div>
            </div>
          </div>
          <div class="description text-center">
            <qrcode-vue :value="QRlink"></qrcode-vue>
            <md-button
              :href="this.facebookShare"
              target="_blank"
              class="md-just-icon md-simple md-dribbble"
              ><i class="fab fa-facebook"></i
            ></md-button>
            <md-button
              :href="this.twitterShare"
              target="_blank"
              class="md-just-icon md-simple md-twitter"
              ><i class="fab fa-twitter"></i
            ></md-button>
            <md-button
              :href="this.whatsappShare"
              data-action="share/whatsapp/share"
              class="md-just-icon md-simple md-pinterest"
              ><i class="fab fa-whatsapp"></i
            ></md-button>
          </div>
          <div class="profile-tabs">
            <tabs
              :tab-name="['Images', 'Comments']"
              :tab-icon="['camera', 'favorite']"
              plain
              nav-pills-icons
              color-button="warning"
            >
              <!-- here you can add your content for tab-content -->
              <template slot="tab-pane-1">
                <div class="md-layout">
                  <div
                    class="md-layout-item md-size-66 mx-auto md-small-size-100"
                  >
                    <md-card>
                      <carousel
                        :per-page="1"
                        loop
                        :speed="700"
                        autoplay
                        :autoplay-timeout="2000"
                        :mouse-drag="false"
                        navigationEnabled
                        navigationNextLabel="<i class='material-icons'>keyboard_arrow_right</i>"
                        navigationPrevLabel="<i class='material-icons'>keyboard_arrow_left</i>"
                      >
                        <slide
                          v-for="image in loadHouse.imageUrl"
                          :key="image.name"
                        >
                          <img
                            style="{ width:100%; 
                            height:100%; object-fit: cover;}"
                            v-show="image"
                            :src="image"
                            alt="house images"
                            contain
                          />
                        </slide>
                      </carousel>
                    </md-card>
                  </div>
                </div>
              </template>

              <template slot="tab-pane-2">
                <div class="md-layout">
                  <md-field
                    class="md-form-group has-warning mb-lg"
                    slot="inputs"
                  >
                    <label>Write your comment...</label>
                    <md-input v-model="comment" type="text" required></md-input>
                    <md-button
                      class="md-simple md-warning"
                      @click="sendComment"
                    >
                      Send comment
                    </md-button>
                  </md-field>

                  <div
                    class="md-layout-item md-size-66 mx-auto md-small-size-100"
                  >
                    <div
                      class="md-scrollbar"
                      v-for="comment in loadHouse.comments"
                      :key="comment"
                    >
                      <p>
                        {{ comment }}
                        <md-divider></md-divider>
                      </p>
                    </div>
                  </div>
                </div>
              </template>
            </tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Tabs } from "@/components";
import QrcodeVue from "qrcode.vue";
import axios from "axios";
import * as firebase from "firebase";

export default {
  components: {
    Tabs,
    QrcodeVue,
  },
  bodyClass: "profile-page",
  data() {
    return {
      step: 1,
      comment: null,
      QRlink: null,
      HouseId: null,
      whatsappShare: null,
      facebookShare: null,
      twitterShare: null,
      position: "center",
      duration: 4000,
      isInfinity: false,
      showSnackbar: false,
      error: null,
    };
  },

  props: {
    header: {
      type: String,
      default: require("@/assets/img/img/sky.jpeg"),
    },
  },

  created: function() {
    this.houseId = this.$route.params.id;
    this.QRlink = "https://takikolay.com/davetiye/" + this.houseId;
    this.whatsappShare = "whatsapp://send?text=" + this.QRlink;
    this.facebookShare =
      "https://www.facebook.com/sharer/sharer.php?u=" + this.QRlink;
    this.twitterShare = "https://twitter.com/share?url=" + this.QRlink;
  },
  methods: {
    sendComment() {
      if (this.comment) {
        let payload = {
          comment: this.comment,
          id: this.houseId,
        };
        this.$store.dispatch("sendComment", payload).then(() => {
          this.$store.getters.loadedHouse;
        });
        this.comment = "";
      }
    },
  },

  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
    loadHouse() {
      return this.$store.getters.loadedHouse;
    },

    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}

.profile-tabs::v-deep {
  .md-card-tabs .md-list {
    justify-content: center;
  }

  [class*="tab-pane-"] {
    margin-top: 3.213rem;
    padding-bottom: 50px;

    img {
      margin-bottom: 2.142rem;
    }
  }
}
.md-content {
  max-height: 200px;
  overflow: auto;
}
</style>
