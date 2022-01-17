<template>
  <line-chart
    empty="No hay datos"
    prefix="$"
    :data="datos"
    class="w-100"
    :colors="['#409EFF', '#666']"
  ></line-chart>
</template>
<script>
export default {
  props: ["datos"],
};
</script>
<style lang=""></style>
