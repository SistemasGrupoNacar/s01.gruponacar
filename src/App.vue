<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  head: {
    link: [
      {
        rel: "icon",
        href: require("@/assets/logo.png"),
      },
    ],
  },
};
</script>
<style lang="scss">
#app {
  font-family: "Quicksand", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

._hr-primary {
  background: var(--primary);
}
</style>
