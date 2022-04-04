<template>
  <el-page-header class="my-3" content="Agregar jornada" @back="irJornadas()" />
  <hr />
  <el-main
    class="_w-35 mx-auto d-flex justify-content-around flex-column"
    v-loading.fullscreen.lock="cargando"
  >
    <div class="d-inline-block w-100 my-2">
      <span class="my-1"> Usuario de empleado: </span>
      <el-input
        v-model="credenciales.username"
        class="d-block my-1"
        size="large"
        placeholder="Ingrese el usuario de empleado"
        clearable
        autocomplete="off"
      />
    </div>
    <div class="d-inline-block my-2">
      <span class="my-1">Fecha de jornada</span>
      <el-date-picker
        v-model="credenciales.check_in"
        clearable
        class="d-block my-1 w-100"
        type="datetime"
        placeholder="Seleccione la fecha"
      />
    </div>

    <el-button class="w-100" v-on:click.prevent="agregarJornada(credenciales)"
      >Crear jornada</el-button
    >
  </el-main>
</template>
<script>
import { ElMessage } from "element-plus";
import api from "@/api/index.js";
export default {
  data() {
    return {
      cargando: false,
      credenciales: {
        action: null,
        username: null,
        check_in: null,
        coordinates: {
          lat: null,
          lng: null,
        },
      },
    };
  },
  methods: {
    irJornadas() {
      this.$router.push("/jornadas");
    },
    async agregarJornada(credenciales) {
      this.cargando = true;
      try {
        await api.crearJornada(credenciales);
        ElMessage.success({
          message: "Jornada creada con éxito",
        });
        this.$router.push("/jornadas");
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          if (error.response.status == 422) {
            ElMessage.error({
              message: "Verificar los datos ingresados",
            });
          }
          ElMessage.error({
            message: error.response.data.message,
          });
        }
        ElMessage.error({
          message: error.message,
        });
      }
      this.cargando = false;
    },
  },
  created() {
    this.$getLocation({
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    })
      .then((coordinates) => {
        this.credenciales.coordinates.lat = coordinates.lat;
        this.credenciales.coordinates.lng = coordinates.lng;
      })
      .catch(() => {
        ElMessage.error({
          message: "Error al obtener las coordenadas",
        });
      });
  },
};
</script>
<style lang=""></style>
