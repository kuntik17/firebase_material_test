<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <nav>
        <ul>
          <li>
            <md-button class="md-warning md-simple" router :to="'legal'"
              >Legal Notice</md-button
            >
          </li>
        </ul>
      </nav>

      <nav>
        <ul>
          <li>
            <a href="https://twitter.com/"> <i class="fab fa-twitter"></i></a>
          </li>
          <li>
            <a href="https://facebook.com/">
              <i class="fab fa-facebook-square"></i>
            </a>
          </li>
          <li>
            <a href="https://instagram.com/">
              <i class="fab fa-instagram"></i
            ></a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String,
  },
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style></style>
