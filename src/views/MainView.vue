<template>
  <div>
    <Nav />
    <router-view class="content" />
    <Footer />
  </div>
</template>
<script>
import Nav from "@/components/NavComponent.vue";
import Footer from "@/components/FooterComponent.vue";
export default {
  name: "MainView",
  components: {
    Nav,
    Footer,
  },
};
</script>
<style lang="scss">
.content {
  padding: 1rem 2rem;
}
</style>
