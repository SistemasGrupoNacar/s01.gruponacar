<template>
  <nav-bar />
  <router-view class="pt-3" />
</template>
<script>
import NavBar from "../components/NavBar.vue";
export default {
  components: {
    NavBar,
  },
};

NavBar;
</script>
<style lang=""></style>
