<template>
  <div class="alert-component" v-if="response.display == true">
    <div
      v-if="response.content.status >= 200 && response.content.status <= 422"
      class="_bg-success"
    >
      <span class="_title-alert">Grupo NACAR</span>
      <div v-if="response.content.status == 422">
        <ul class="">
          <li v-for="error in response.content.data.errors" :key="error">
            <span class="._text-small">{{ error.msg }}</span>
          </li>
        </ul>
      </div>
      <div class="_text-info-alert" v-else>
        {{ response.content.data.message }}
      </div>
    </div>
    <div v-else class="_bg-error">
      <span class="_title-alert">{{ response.content.data.name }}</span>
      <div class="_text-info-alert _text-black-75">
        {{ response.content.data.message }}
      </div>
      
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "AlertComponent",
  computed: {
    ...mapState("response", ["response"]),
  },
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
  background: var(--main-bg);
  color: var(--text-black);
  border-radius: 5px;
  padding: 0.75rem 2rem;
}

._bg-error {
  color: var(--text-black);
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
