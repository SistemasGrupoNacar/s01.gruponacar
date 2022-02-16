<template>
  <line-chart
    empty="No hay datos"
    loading="Cargando datos"
    prefix="$"
    :data="datos"
    class="w-100"
    :colors="['#114B5F', '#2d2d2d']"
  ></line-chart>
</template>
<script>
export default {
  props: ["datos"],
};
</script>
<style lang=""></style>
