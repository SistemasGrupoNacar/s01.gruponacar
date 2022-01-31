<template>
  <el-popover
    placement="left-start"
    title="Movimiento Extra"
    :width="220"
    trigger="hover"
    content="Agrega un nuevo movimiento extra."
  >
    <template #reference>
      <el-button
        class="nuevo-extra"
        type="primary"
        v-on:click="nuevoMovimientoExtra()"
        ><el-icon><Plus /> </el-icon>
      </el-button>
    </template>
  </el-popover>
  <div></div>
</template>
<script>
import { Plus } from "@element-plus/icons-vue";
export default {
  components: {
    Plus,
  },
};
</script>
<style lang="scss">
.nuevo-extra {
  display: block;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}
</style>
