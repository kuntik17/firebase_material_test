<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">OPEN HOUSE APP</h1>
            <h4>
              Open your house to the world
            </h4>
            <br />
            <md-button class="md-warning" to="/login"
              ><i class="fas fa-home"></i> Let's open your house</md-button
            >
          </div>
        </div>
      </div>
    </parallax>

    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <div class="md-layout">
            <div
              class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center"
            >
              <h2 class="title text-center">What is Open House App?</h2>
              <h5 class="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                eos cupiditate aliquid doloremque temporibus quam beatae nulla
                at! Adipisci repellendus possimus vero nesciunt quidem quia sit
                at ratione error in.
              </h5>
            </div>
          </div>
          <div class="text-center">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="warning">
                  <div class="icon icon-warning">
                    <md-icon>calendar_today</md-icon>
                  </div>
                  <h4 class="warning-title">Create</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aut, minus maiores omnis voluptas perferendis recusandae,
                    aliquid quibusdam autem vero facere ipsum. Ex nostrum iste,
                    quaerat incidunt excepturi praesentium est corrupti?
                  </p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="warning">
                  <div class="icon icon-success">
                    <md-icon>mobile_screen_share</md-icon>
                  </div>
                  <h4 class="warning-title">Share</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Exercitationem, nobis eius harum assumenda sequi unde
                    expedita magnam pariatur eum molestiae reprehenderit
                    similique id non labore vel deleniti odio, distinctio
                    aperiam?
                  </p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="warning">
                  <div class="icon icon-danger">
                    <md-icon>credit_card</md-icon>
                  </div>
                  <h4 class="warning-title">Sell/Rent</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Corrupti, libero. Tempora voluptatem in nemo laborum omnis
                    consequuntur harum, ipsa illo eum ipsum, quia corporis
                    molestias vitae, officiis cumque facilis dolor!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section text-center">
        <div class="container">
          <h2 class="title">Listings</h2>
          <div class="team">
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/takikolay-451c1.appspot.com/o/houses%2FeqQkrUpu2vfWsdPwY2ea%2F0.jpeg?alt=media&token=753171a9-6264-4e7f-8c70-3b5cb102f6c0"
                        alt="Thumbnail Image"
                        class="img-raised rounded-circle img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      <br />
                      <small class="card-description text-muted">
                        Luxury House ♥</small
                      >
                    </h4>

                    <md-card-content>
                      <p class="card-description"></p>
                    </md-card-content>
                    <md-button
                      class="md-warning md-just-icon md-round"
                      to="/house/eqQkrUpu2vfWsdPwY2ea"
                      ><md-icon>house</md-icon></md-button
                    >
                  </md-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section section-contacts">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
              <h2 class="text-center title">Contact</h2>
              <h4 class="text-center description">
                <md-icon>phone</md-icon> +90 500 000 00 00 <br /><br />
                <md-divider></md-divider><br />
                <md-icon>email</md-icon> lorem@loremipsum.com <br /><br />
                <md-divider></md-divider><br />
                <md-icon>location_on</md-icon>
                Lorem Ipsum 001, Istanbul <br />
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  bodyClass: "landing-page",
  props: {
    header: {
      type: String,
      default: require("@/assets/img/img/header1.jpeg"),
    },
  },
  data() {
    return {};
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
  },
};
//5D9980
</script>

<style lang="scss" scoped>
.md-card-actions.text-center {
  display: flex;
  justify-content: center !important;
}
.contact-form {
  margin-top: 30px;
}

.md-has-textarea + .md-layout {
  margin-top: 15px;
}
</style>
