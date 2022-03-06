<template>
  <nav-b />
  <router-view class="pt-3" />
</template>
<script>
import NavB from "../components/NavBar.vue";
export default {
  components: {
    NavB,
  },
};
</script>
<style lang="scss">

</style>
