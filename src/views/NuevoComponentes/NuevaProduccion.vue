<template>
  <el-page-header
    class="my-3"
    content="Nueva producci&oacute;n"
    @back="irProducciones()"
  />
  <hr />
  <el-main v-loading.fullscreen.lock="cargando">
    <div class="row">
      <div class="col-12 col-md-6 my-2">
        <span class="text-muted">Producto</span>
        <el-select
          v-model="nuevaProduccion.product"
          placeholder="Seleccione producto"
          class="w-100"
          filterable
        >
          <el-option
            v-for="item in listadoProductos"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="col-12 col-md-6 my-2">
        <span class="text-muted">Fecha</span>
        <el-date-picker
          v-model="nuevaProduccion.start_date"
          type="datetime"
          placeholder="Escoge una fecha"
          class="w-100"
          clearable
        >
        </el-date-picker>
      </div>
      <div class="col-12 col-md-3 my-2">
        <span class="text-muted">Lugar</span>
        <el-select
          v-model="nuevaProduccion.place"
          placeholder="Seleccione lugar de producci&oacute;n"
          class="w-100"
          filterable
        >
          <el-option
            v-for="item in listadoLugares"
            :key="item._id"
            :label="item.description"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="col-12 col-md-9 my-2">
        <span class="text-muted">Descripci&oacute;n</span>
        <el-input
          v-model="nuevaProduccion.description"
          placeholder="Ingrese descripción"
        >
        </el-input>
      </div>
      <el-button
        class="d-block mx-auto my-2 w-50"
        v-on:click="crearProduccion(nuevaProduccion)"
        >Crear Producci&oacute;n</el-button
      >
    </div>
  </el-main>
</template>
<script>
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
import { verificarSesion } from "@/scripts/Sesion.js";
export default {
  data() {
    return {
      nuevaProduccion: {
        product: null,
        start_date: null,
        description: null,
        place: null,
      },
      listadoProductos: [],
      listadoLugares: [],
      cargando: false,
    };
  },
  mounted() {
    this.obtenerProductos();
    this.obtenerLugares();
  },
  methods: {
    async obtenerProductos() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerProductos();
        this.listadoProductos = respuesta.data;
      } catch (error) {
        if (error.response) {
          verificarSesion(error);
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
    async obtenerLugares() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerLugares();
        this.listadoLugares = respuesta.data;
      } catch (error) {
        if (error.response) {
          verificarSesion(error);
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
    async crearProduccion(produccion) {
      this.cargando = true;
      try {
        if (!this.verificarDatos(produccion)) {
          ElMessage.error({
            message: "Debe ingresar todos los datos.",
          });
          this.cargando = false;
          return;
        }
        const respuesta = await api.crearProduccion(produccion);
        ElMessage.success({
          message: `Producción creada con éxito (id: ${respuesta.data._id})`,
        });
        this.$router.push("/producciones");
      } catch (error) {
        if (error.response) {
          verificarSesion(error);
          if (error.response.status == 422) {
            error.response.data.forEach((element) => {
              ElMessage.error({
                message: element.message,
              });
            });
          } else {
            ElMessage.error({
              message: error.response.data.message,
            });
          }
        } else {
          ElMessage.error({
            message: error.message,
          });
        }
      }
      this.cargando = false;
    },
    verificarDatos(produccion) {
      if (produccion.product == null) {
        return false;
      }
      if (produccion.start_date == null) {
        return false;
      }
      if (produccion.place == null) {
        return false;
      }
      if (produccion.description == null) {
        return false;
      }
      return true;
    },
    irProducciones() {
      this.$router.push("/producciones");
    },
  },
};
</script>
<style lang="scss"></style>
