<template>
  <el-main
    class="_h-100 container py-2 px-1 px-lg-4 my-1"
    v-loading.fullscreen.lock="cargando"
  >
    >
    <p class="_title text-start">Administraci&oacute;n de empleado</p>
    <p class="_subtitle text-muted text-start">
      Administraci&oacute;n de usuario del empleado
    </p>
    <div class="row px-1 my-2">
      <div class="col-12 col-md-4 my-2">
        <p class="_text-bigger text-center">
          Selecci&oacute;n de &aacute;vatar
        </p>
        <div class="container text-center">
          <span
            v-for="(item, index) in images"
            :key="index"
            v-on:click.prevent="seleccionarAvatar(item)"
          >
            <el-avatar :size="64" :src="item"></el-avatar>
          </span>
        </div>
      </div>
      <div class="col-12 col-md-4 my-2">
        <p class="_text-bigger text-center">Cambio de contrase&ntilde;a</p>
        <div class="row">
          <div class="col-12">
            <span class="text-muted">Contrase&ntilde;a actual</span>
            <el-input
              v-model="password.current"
              class="w-100 my-2"
              type="password"
              placeholder="Ingrese su contrase&ntilde;a actual"
            />
          </div>
          <div class="col-12">
            <span class="text-muted">Nueva contrase&ntilde;a</span>
            <el-input
              v-model="password.new"
              class="w-100 my-2"
              type="password"
              placeholder="Ingrese su nueva contrase&ntilde;a"
            />
          </div>
          <div class="col-12">
            <span class="text-muted">Confirmar contrase&ntilde;a</span>
            <el-input
              v-model="password.confirm"
              class="w-100 my-2"
              type="password"
              placeholder="Confirme su nueva contrase&ntilde;a"
            />
            <el-button
              v-on:click.prevent="cambiarContrasena(password)"
              class="w-100 my-2"
            >
              Cambiar contrase&ntilde;a
            </el-button>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4 my-2 text-center">
        <p class="_text-bigger text-center">Detalles de usuario</p>
        <el-avatar :size="128" :src="avatar"></el-avatar>
        <p class="_subtitle">{{ username }}</p>

        <el-button
          v-on:click.prevent="cambiarAvatar(avatar)"
          class="w-100 my-2"
        >
          Cambiar &aacute;vatar
        </el-button>
      </div>
    </div>

    <router-link to="/empleados">Volver a listado de empleados</router-link>
  </el-main>
</template>
<script>
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
const URL =
  "https://firebasestorage.googleapis.com/v0/b/s01-gruponacar.appspot.com/o/";
export default {
  props: ["username", "_id"],
  data() {
    return {
      cargando: false,
      password: {
        current: "12345678",
        new: "",
        confirm: "",
      },
      avatar: "",
      images: [
        URL +
          "memoji%20%20male%2001.svg?alt=media&token=689cb588-5d37-4694-8ca9-7582f8331875",
        URL +
          "memoji%20%20male%2002.svg?alt=media&token=f28c474c-953f-47ab-81f5-2785abcab3d7",
        URL +
          "memoji%20%20male%2003.svg?alt=media&token=5da566dd-e9d6-4213-9266-45f80af4e78b",
        URL +
          "memoji%20%20male%2004.svg?alt=media&token=605033aa-8059-45d1-b733-5cd65d85defb",
        URL +
          "memoji%20%20male%2005.svg?alt=media&token=3a9bdd6a-7ae4-4697-82cd-34542140f49f",
        URL +
          "memoji%20%20male%2007.svg?alt=media&token=53e6ddbc-ef5a-478a-973d-bef2bb7f53d2",
        URL +
          "memoji%20%20male%2008.svg?alt=media&token=a28bf544-c211-49e4-be05-8c36b9d1fd73",
        URL +
          "memoji%20%20male%2010.svg?alt=media&token=681aae84-bcec-4fb3-b4bd-23f5cd0ddef0",
        URL +
          "memoji%20%20male%2011.svg?alt=media&token=beb435e8-c8ce-4be4-be51-fc7744a160b8",
        URL +
          "memoji%20%20male%2012.svg?alt=media&token=dca370cc-3d8d-4089-b130-32d9cdf8dc39",
        URL +
          "memoji%20%20male%2014.svg?alt=media&token=171868f8-253a-4911-b297-317c61605b43",
        URL +
          "memoji%20female%2014.svg?alt=media&token=105034cf-733a-4bc3-9ee1-0e44a578a16b",
        URL +
          "memoji%20female%2013.svg?alt=media&token=41b26b29-8612-465b-82ef-6cb0504587f5",
        URL +
          "memoji%20female%2012.svg?alt=media&token=9efd7fdb-2793-44b2-b002-388380c9aae9",
        URL +
          "memoji%20female%2010.svg?alt=media&token=10d5156d-6f97-4107-8509-64721357e97c",
        URL +
          "memoji%20female%2009.svg?alt=media&token=1fba1326-39bd-4c18-9343-5ecd319e65dc",
        URL +
          "memoji%20female%2008.svg?alt=media&token=852f4847-c7fb-4be0-a39e-7872b114e0d8",
        URL +
          "memoji%20female%2007.svg?alt=media&token=945a0181-c6ba-4607-b36d-c92dbee92f86",
        URL +
          "memoji%20female%2006.svg?alt=media&token=40ceee2f-c71f-4847-9137-c0bf64647195",
        URL +
          "memoji%20female%2005.svg?alt=media&token=53bf74fe-a6c0-4e62-8028-04951ab9e538",
        URL +
          "memoji%20female%2004.svg?alt=media&token=9cb58574-d9ae-4fd3-b727-db6f0a281486",
        URL +
          "memoji%20female%2003.svg?alt=media&token=b03f1fd4-abbf-475d-8d54-852dc83d6a31",
        URL +
          "memoji%20female%2002.svg?alt=media&token=6333e5a8-2a66-4d33-af3e-8ba3f24a8c67",
        URL +
          "memoji%20female%2001.svg?alt=media&token=84e5f498-4f08-40b5-bd19-7049af3e4778",
      ],
    };
  },
  methods: {
    async cambiarContrasena(datos) {
      this.cargando = true;
      if (!this.verificarContrasena(datos)) {
        ElMessage.error(
          "Verifique que las contraseñas coincidan y no estén vacías"
        );
        this.cargando = false;
        return;
      }
      try {
        await api.cambiarContrasenaEmpleado(this.username, {
          password: datos.current,
          newPassword: datos.new,
        });
        ElMessage.success({
          message: "Contraseña cambiada con éxito",
        });
      } catch (error) {
        if (error.response) {
          if (error.response.status == 422) {
            ElMessage.error(
              "Verifique que se envian todos los datos correctamente"
            );
          }
          ElMessage.error({
            message: error.response.data.message,
          });
        } else {
          ElMessage.error({
            message: error.message,
          });
        }
      }
      this.cargando = false;
    },
    verificarContrasena() {
      if (
        this.password.new !== this.password.confirm ||
        this.password.new === "" ||
        this.password.confirm === "" ||
        this.password.current === ""
      ) {
        return false;
      }
      return true;
    },
    seleccionarAvatar(avatar) {
      this.avatar = avatar;
    },
    async cambiarAvatar(avatar) {
      this.cargando = true;
      try {
        await api.cambiarAvatarEmpleado(this.username, {
          avatar,
        });
        ElMessage.success({
          message: "Avatar cambiado con éxito",
        });
      } catch (error) {
        if (error.response) {
          if (error.response.status == 422) {
            ElMessage.error(
              "Verifique que se envian todos los datos correctamente"
            );
          }
          ElMessage.error({
            message: error.response.data.message,
          });
        } else {
          ElMessage.error({
            message: "Error al cambiar el avatar",
          });
        }
      }
      this.cargando = false;
    },
  },
};
</script>
<style lang=""></style>
