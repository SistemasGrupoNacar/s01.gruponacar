<template>
  <div class="container-fluid _login-container _h-100 p-0">
    <div class="row p-0 m-0">
      <div
        class="col-12 col-md-6 _hv-100 _bg-white d-flex align-items-center justify-content-center flex-column"
      >
        <p class="_title _letter-spacing-2">Inicio de Sesion</p>
        <p class="_subtitle">Sistema de Control e Inventario</p>
        <p class="my-2 _subtitle">gruponacar.com</p>
        <img :src="require('@/assets/illustrations/Finances.png')" alt="Logo" class="w-50" />
      </div>
      <div
        class="col-12 col-md-6 _hv-100 _bg-white d-flex justify-content-center flex-column px-5"
      >
        <span class="text-muted mx-auto _letter-spacing-1 my-1"
          >Nombre de usuario</span
        >
        <el-input
          v-model="credenciales.user"
          placeholder="Ingrese su nombre de usuario"
          clearable
          autocomplete="off"
          class="_w-50 mx-auto"
        />

        <span class="text-muted mx-auto _letter-spacing-1 my-1"
          >Contrase&ntilde;a</span
        >
        <el-input
          v-model="credenciales.password"
          placeholder="Ingrese su contraseña"
          class="_w-50 mx-auto"
          type="password"
          autocomplete="off"
          show-password
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
      ElMessage.loading({
        duration: 0,
        content: "Iniciando sesión...",
      });
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
