<template>
  <el-page-header
    class="my-3"
    content="Creaci&oacute;n de empleado"
    @back="irEmpleados()"
  />
  <hr />
  <div class="container">
    
    <div class="row">
      <div class="col-12 col-md-6 my-2">
        <span class="text-muted">Nombres</span>
        <el-input
          v-model="empleado.firstName"
          class="w-100 my-2"
          placeholder="Ingrese nombres del empleado"
        />
      </div>
      <div class="col-12 col-md-6 my-2">
        <span class="text-muted">Apellidos</span>
        <el-input
          v-model="empleado.lastName"
          class="w-100 my-2"
          placeholder="Ingrese apellidos del empleado"
        />
      </div>
      <div class="col-12 col-md-3 my-2">
        <span class="text-muted">Cargo</span>
        <el-select
          v-model="empleado.position"
          placeholder="Seleccione el cargo"
          class="w-100 my-2"
          filterable
        >
          <el-option
            v-for="item in listPositions"
            :key="item._id"
            :label="item.description"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="col-12 col-md-3 my-2">
        <span class="text-muted">Correo Electr&oacute;nico</span>
        <el-input
          v-model="empleado.email"
          class="w-100 my-2"
          placeholder="xxxxx@gmail.com"
        />
      </div>
      <div class="col-6 col-md-3 my-2">
        <span class="text-muted">DUI</span>
        <el-input
          v-model="empleado.dui"
          class="w-100 my-2"
          maxlength="10"
          minlength="10"
          @input="validarDui"
          placeholder="xxxxxxxx-x"
        />
      </div>

      <div class="col-6 col-md-3 my-2">
        <span class="text-muted">Tel&eacute;fono</span>
        <el-input
          v-model="empleado.phone"
          class="w-100 my-2"
          placeholder="xxxx-xxxx"
          @input="validarTelefono"
        />
      </div>

      <el-button
        class="d-block mx-auto my-1 w-50"
        v-on:click="crearEmpleado(empleado)"
        >Crear empleado</el-button
      >
    </div>
  </div>
</template>
<script>
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      cargando: false,
      listPositions: [],
      empleado: {
        dui: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        position: "",
      },
    };
  },
  mounted() {
    this.obtenerListadoPosiciones();
  },
  methods: {
    validarDui() {
      let x = this.empleado.dui.replace(/\D/g, "").match(/(\d{0,8})(\d{0,1})/);
      this.empleado.dui = !x[2] ? x[1] : x[1] + (x[2] ? "-" + x[2] : "");
    },
    validarTelefono() {
      let x = this.empleado.phone
        .replace(/\D/g, "")
        .match(/(\d{0,4})(\d{0,4})/);
      this.empleado.phone = !x[2] ? x[1] : x[1] + (x[2] ? "-" + x[2] : "");
    },
    async obtenerListadoPosiciones() {
      this.cargando = true;
      try {
        const response = await api.obtenerPosiciones();
        this.listPositions = response.data;
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error de conexión");
        }
      }
      this.cargando = false;
    },
    async crearEmpleado(dato) {
      this.cargando = true;
      try {
        const respuesta = await api.crearEmpleado(dato);
        ElMessage.success("Empleado creado con éxito");
        this.$router.push({
          name: "DetalleNuevoEmpleado",
          params: {
            username: respuesta.data.username,
            _id: respuesta.data._id,
          },
        });
      } catch (error) {
        if (error.response) {
          if (error.response.status == 422) {
            ElMessage.error({
              message: "Error en los datos, verifique que todo este correcto.",
            });
          } else {
            ElMessage.error({
              message: error.response.data.message,
            });
          }
        } else {
          ElMessage.error({
            message:
              "Error de conexi&oacute;n, por favor intente m&aacute;s tarde.",
          });
        }
      }
    },
    validarDatos(datos) {
      if (
        datos.firstName == "" ||
        datos.lastName == "" ||
        datos.position == ""
      ) {
        return false;
      }
      return true;
    },
    irEmpleados() {
      this.$router.replace("/empleados");
    },
  },
};
</script>
<style lang=""></style>
