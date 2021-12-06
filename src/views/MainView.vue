<template>
  <div>
    <Nav />
    <router-view class="content" />
    <Footer />
  </div>
</template>
<script>
import Nav from "@/components/NavBarComponent.vue";
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
  margin-top: 10vh;
  padding: 1rem 2rem;
}

@media only screen and (min-width: 768px){

}
</style>
