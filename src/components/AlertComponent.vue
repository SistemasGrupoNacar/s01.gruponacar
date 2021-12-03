<template>
  <div class="alert-component" v-if="response.display == true">
    <div
      v-if="
        response.response.status == 200 ||
          response.response.status == 201 ||
          response.response.status == 202
      "
      class="_bg-success"
    >
      <span class="text-muted  _title-alert">ACASAPUFE</span>
      <div class="_text-info-alert">{{ response.msg }}</div>
    </div>
    <div v-else class="_bg-error">
      <span class="text-muted  _title-alert">ACASAPUFE - ERROR</span>
      <div class="_text-info-alert">{{ response.msg }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AlertComponent",
  props: ["response"],
};
</script>
<style lang="scss">
.alert-component {
  display: block;
  position: fixed;
  top: 1rem;
  left: 1rem;
  width: 50vw;
  height: auto;
  padding: 0;
}

._bg-success {
  background: var(--primary);
  color: var(--black);
  border-radius: 5px;
  padding: 0.75rem 2rem;
}

._bg-error {
  background: var(--black);
  color: var(--white);
  border-radius: 5px;
  padding: 0.75rem 2rem;
}

._title-alert {
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 1px;
  color: var(--gray-alert);
}
._text-info-alert {
  font-size: 1rem;
  color: var(--white);
}

@media only screen and (min-width: 600px) {
  .alert-component {
    width: 25vw;
  }
  ._title-alert {
    font-size: 0.8rem;
  }
}
</style>
