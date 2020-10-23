<template>
  <md-toolbar
    id="toolbar"
    md-elevation="0"
    class="md-transparent md-absolute"
    :class="extraNavClasses"
    :color-on-scroll="colorOnScroll"
  >
    <div class="md-toolbar-row md-collapse-lateral">
      <div class="md-toolbar-section-start">
        <router-link to="/" tag="span" style="cursor: pointer">
          <i class="fas fa-home"></i>
        </router-link>
      </div>
      <div class="md-toolbar-section-end ">
        <md-list>
          <li class="md-list-item ">
            <a
              class="md-list-item-router md-list-item-container md-button-clean dropdown "
            >
              <div class="md-list-item-content ">
                <drop-down direction="down">
                  <md-button
                    slot="title"
                    class="md-button md-button-link md-white md-simple dropdown-toggle "
                    data-toggle="dropdown"
                  >
                    <p>NAVIGATION</p>
                  </md-button>
                  <ul class="dropdown-menu dropdown-with-icons ">
                    <li v-for="item in menuItems" :key="item.title">
                      <router-link :to="item.link" class="warning">
                        <i class="material-icons ">{{ item.icon }}</i>
                        <p>{{ item.title }}</p>
                      </router-link>
                    </li>
                  </ul>
                </drop-down>
                <md-button
                  slot="title"
                  class="md-button md-button-link md-white md-simple"
                  v-if="userIsAuthenticated"
                  @click="onLogout"
                >
                  <i class="material-icons">logout</i>
                  <p>Logout</p>
                </md-button>
              </div>
            </a>
          </li>
        </md-list>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
let resizeTimeout;
function resizeThrottler(actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66);
  }
}

export default {
  components: {},
  props: {
    type: {
      type: String,
      default: "white",
      validator(value) {
        return [
          "white",
          "default",
          "primary",
          "danger",
          "success",
          "warning",
          "info",
        ].includes(value);
      },
    },
    colorOnScroll: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      extraNavClasses: "",
      toggledClass: false,
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "lock_open", title: "Login", link: "/login" },
        { icon: "person_add", title: "Register", link: "/register" },
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: "content_paste",
            title: "Create listing",
            link: "/create",
          },
          {
            icon: "home",
            title: "My House",
            link: "/houses",
          },
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
  },
  methods: {
    bodyClick() {
      let bodyClick = document.getElementById("bodyClick");

      if (bodyClick === null) {
        let body = document.querySelector("body");
        let elem = document.createElement("div");
        elem.setAttribute("id", "bodyClick");
        body.appendChild(elem);

        let bodyClick = document.getElementById("bodyClick");
        bodyClick.addEventListener("click", this.toggleNavbarMobile);
      } else {
        bodyClick.remove();
      }
    },
    toggleNavbarMobile() {
      this.NavbarStore.showNavbar = !this.NavbarStore.showNavbar;
      this.toggledClass = !this.toggledClass;
      this.bodyClick();
    },
    handleScroll() {
      let scrollValue =
        document.body.scrollTop || document.documentElement.scrollTop;
      let navbarColor = document.getElementById("toolbar");
      this.currentScrollValue = scrollValue;
      if (this.colorOnScroll > 0 && scrollValue > this.colorOnScroll) {
        this.extraNavClasses = `md-${this.type}`;
        navbarColor.classList.remove("md-transparent");
      } else {
        if (this.extraNavClasses) {
          this.extraNavClasses = "";
          navbarColor.classList.add("md-transparent");
        }
      }
    },
    scrollListener() {
      resizeThrottler(this.handleScroll);
    },
    scrollToElement() {
      let element_id = document.getElementById("downloadSection");
      if (element_id) {
        element_id.scrollIntoView({ block: "end", behavior: "smooth" });
      }
    },
    onLogout() {
      this.$store.dispatch("logout");
    },
  },
  mounted() {
    document.addEventListener("scroll", this.scrollListener);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollListener);
  },
};
</script>
