<template>
  <div>
    <button v-on:click="logout">Cerrar sesion</button>
  </div>
</template>
<script>
import { removeToken } from "@/scripts/token.actions.js";
export default {
  methods: {
    async logout() {
      removeToken().then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>
<style lang=""></style>
