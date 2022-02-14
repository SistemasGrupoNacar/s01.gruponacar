<template>
  <div class="container">
    <p class="_title">Nuevo Gasto de Insumos</p>
    <p class="_subtitle text-muted">
      Formulario de registro para el gasto de insumos en cierta
      producci&oacute;n.
    </p>
    <el-main v-loading="cargando">
      <div class="row">
        <div class="col-12 col-md-6 my-2">
          <span class="text-muted">Producci&oacute;n</span>
          <el-input
            v-model="nuevoGastoInsumo.production"
            disabled
            placeholder="Seleccione la producci&oacute;n"
          />
        </div>
        <div class="col-12 col-md-6 my-2">
          <span class="text-muted">Insumo</span>
          <el-select
            v-model="nuevoGastoInsumo.inventory_product"
            placeholder="Seleccione insumo"
            class="w-100"
            filterable
          >
            <el-option
              v-for="item in listadoInsumos"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="col-12 col-md-6 my-2">
          <span class="text-muted">Observaciones</span>
          <el-input
            v-model="nuevoGastoInsumo.description"
            placeholder="Ingrese las observaciones"
            clearable
          />
        </div>
        <div class="col-6 col-md-3 my-2">
          <span class="text-muted">Cantidad</span>
          <el-input-number
            v-model="nuevoGastoInsumo.quantity"
            :min="1"
            :max="999999"
            :step="1"
            class="w-100"
          >
          </el-input-number>
        </div>
        <div class="col-6 col-md-3 my-2">
          <span class="text-muted">Fecha</span>
          <el-date-picker
            v-model="nuevoGastoInsumo.date"
            type="datetime"
            placeholder="Escoge una fecha"
            class="w-100"
            clearable
          >
          </el-date-picker>
        </div>
        <el-button
          class="d-block mx-auto my-2 w-50"
          v-on:click.prevent="agregarGastoInsumo(nuevoGastoInsumo)"
        >
          Agregar Gasto</el-button
        >
      </div>
    </el-main>
  </div>
</template>
<script>
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
import { verificarSesion } from "@/scripts/Sesion.js";
export default {
  data() {
    return {
      listadoInsumos: [],
      cargando: false,
      nuevoGastoInsumo: {
        production: null,
        inventory_product: null,
        description: null,
        date: null,
        quantity: 1,
      },
    };
  },
  mounted() {
    this.nuevoGastoInsumo.production = this.$route.params.id;
    this.obtenerInsumos();
  },
  methods: {
    async obtenerInsumos() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerInsumos();
        this.listadoInsumos = respuesta.data;
      } catch (error) {
        if (error.response) {
          verificarSesion(error);
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener los insumos");
        }
      }
      this.cargando = false;
    },
    validarDatos(datos) {
      if (
        datos.inventory_product === null ||
        datos.date === null ||
        datos.quantity <= 0 ||
        datos.production === null
      ) {
        return false;
      }
      return true;
    },
    async agregarGastoInsumo(datos) {
      if (this.validarDatos(datos)) {
        try {
          await api.crearCostoProduccion(datos);
          ElMessage.success({
            message: "Gasto de insumo agregado correctamente",
          });
          this.$router.push("/producciones");
        } catch (error) {
          if (error.response) {
            verificarSesion(error);
            ElMessage.error(error.response.data.message);
          } else {
            ElMessage.error("Error al agregar el gasto de insumo");
          }
        }
      } else {
        ElMessage.warning({
          message: "Debe completar todos los campos",
        });
      }
    },
  },
};
</script>
<style lang="scss"></style>
