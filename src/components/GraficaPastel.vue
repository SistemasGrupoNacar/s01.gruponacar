<template>
  <pie-chart
    empty="No hay datos"
    loading="Cargando datos"
    :data="datos"
    class="w-100"
    :colors="[
      '#114B5F',
      '#2d2d2d',
      '#D34B2E',
      '#3CAD8D',
      '#7D8783',
      '#56A5B1',
      '#686FCB',
      '#BF679E',
    ]"
  ></pie-chart>
</template>
<script>
export default {
  props: ["datos"],
};
</script>
<style lang=""></style>
