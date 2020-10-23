<template>
  <div class="wrapper" :v-if="!isLoading">
    <div class="section page-header " :style="headerStyle">
      <div class="container">
        <div class="md-card">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <md-empty-state
              v-if="!loadHouse"
              md-icon="house"
              md-label="Create house"
              md-description="You don't have any house"
            >
              <md-button
                v-if="!loadHouse"
                class="md-warning md-raised"
                to="/house"
                >Davetiye oluştur</md-button
              >
            </md-empty-state>
            <md-empty-state
              v-if="loadHouse"
              md-icon="house"
              :md-label="loadHouse.title"
              :md-description="loadHouse.buildDate"
            >
              <md-button
                v-if="loadHouse"
                class="md-warning md-raised"
                :to="'/house/' + myHouseId"
                >Show</md-button
              >
            </md-empty-state>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { houses: false };
  },
  name: "EmptyStateBasic",

  props: {
    header: {
      type: String,
      default: require("@/assets/img/img/header4.jpeg"),
    },
  },
  methods: {},
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
    myHouseId() {
      return this.$store.getters.myHouseId;
    },
  },
};
</script>
