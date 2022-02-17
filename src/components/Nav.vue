<template>
  <nav class="_nav">
    <div>a</div>
    <div class="_w-25">
      <el-input class="w-100" v-model="busqueda">
        <template #prefix>
          <el-icon class="el-input__icon"><search /></el-icon>
        </template>
      </el-input>
    </div>
    <div>C</div>
  </nav>
</template>
<script>
import { Search } from "@element-plus/icons-vue";
export default {
  components: {
    Search,
  },
  data() {
    return {
      busqueda: "",
    };
  },
};
</script>
<style lang="scss">
._nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 10vh;
  padding: 0 2rem;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
}

@media (min-width: 768px) {
  ._nav {
  }
}
</style>
