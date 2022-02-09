<template>
  <div>
    <el-button v-on:click.prevent="cerrarSesion()">Cerrar Sesion</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    cerrarSesion() {
      localStorage.removeItem("jwt");
      this.$router.go("/login");
    },
  },
};
</script>
<style lang=""></style>
