<template>
  <div
    class="container _login-container _h-100 p-0 d-flex align-items-center justify-content-center"
    
  >
    <div
      class="row p-0 m-0 w-100 d-flex align-items-center justify-content-center"
    >
      <div
        class="col-12 col-md-6 _bg-white my-2 my-lg-0 d-flex align-items-center justify-content-center flex-column"
      >
        <div class="my-3">
          <p class="_title _letter-spacing-2">Inicio de Sesion</p>
          <p class="_subtitle">Sistema de Control e Inventario</p>
        </div>
        <!--img
          :src="require('@/assets/illustrations/escena-1.svg')"
          alt="Muchacho con laptop en mano"
          class="image-0"
        /-->
      </div>
      <div
        class="col-12 col-md-6 _bg-white my-2 my-lg-0 d-flex justify-content-center flex-column px-5"
      >
        <span class="text-muted _bold _text-small _letter-spacing-1 my-1"
          >Nombre de usuario</span
        >
        <el-input
          v-model="credenciales.user"
          placeholder="@morales"
          clearable
          autocomplete="off"
          class="mx-auto"
          v-on:keyup.enter.prevent="iniciarSesion(credenciales)"
        />

        <span class="text-muted _bold _text-small _letter-spacing-1 my-1"
          >Contrase&ntilde;a</span
        >
        <el-input
          v-model="credenciales.password"
          placeholder="********"
          class="mx-auto"
          type="password"
          autocomplete="off"
          show-password
          v-on:keyup.enter.prevent="iniciarSesion(credenciales)"
        />
        <el-button class="_w-50 mx-auto my-4 _button-animation">
          Ingresar<el-icon class="el-icon--right _icon"><Right /></el-icon>
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { ElMessage } from "element-plus";
import { Right } from "@element-plus/icons-vue";
export default {
  components: {
    Right,
  },
  data() {
    return {
      credenciales: {
        user: "",
        password: "",
      },
    };
  },
  methods: {
    async iniciarSesion(datos) {
      if (!this.verificarCredenciales(datos)) {
        ElMessage.warning("Por favor ingrese un usuario y contraseña válidos");
        return;
      }
      localStorage.setItem("jwt", "JWT");
      this.$router.push("/home");
    },
    verificarCredenciales(datos) {
      if (datos.user == "") {
        return false;
      }
      if (datos.password == "") {
        return false;
      }
      return true;
    },
  },
};
</script>
<style lang="scss">
._button-animation {
  ._icon {
    transition: all 0.5s ease-in-out;
  }
  &:hover {
    ._icon {
      transform: rotateY(360deg);
    }
  }
}
.image-0 {
  height: 250px;
}
/* Medium devices (tablets, 768px and up)*/
@media (min-width: 768px) {
}

/* Large devices (desktops, 992px and up)*/
@media (min-width: 992px) {
}

/* Extra large devices (large desktops, 1200px and up)*/
@media (min-width: 1200px) {
}
</style>
