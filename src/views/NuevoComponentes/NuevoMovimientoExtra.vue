<template>
  <div class="container">
    <p class="_title">Nuevo movimiento extra</p>
    <p class="_subtitle">Creaci&oacute;n de nuevo ingreso o egreso</p>
    <el-main v-loading.fullscreen.lock="cargando" class="my-2">
      <div class="row">
        <div class="col-12 col-md-4">
          <div class="my-1">
            <span class="text-muted">Tipo de movimiento</span>
            <el-select
              v-model="nuevoMovimientoExtra.type_move"
              placeholder="Seleccione tipo de movimiento"
              class="w-100"
              filterable
            >
              <el-option
                v-for="item in listadoTiposMovimiento"
                :key="item._id"
                :label="item.title_es"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </div>

          <div class="my-1">
            <span class="text-muted">Fecha</span>
            <el-date-picker
              v-model="nuevoMovimientoExtra.date"
              type="datetime"
              placeholder="Escoge una fecha"
              class="w-100"
              clearable
            >
            </el-date-picker>
          </div>
          <div class="my-1">
            <span class="text-muted">Total</span>
            <el-input-number
              v-model="nuevoMovimientoExtra.total"
              :min="0.01"
              :step="0.01"
              class="w-100"
            />
          </div>
        </div>
        <div class="col-12 col-md-8">
          <span class="text-muted">Descripci&oacute;n</span>
          <el-input
            v-model="nuevoMovimientoExtra.description"
            :autosize="{ minRows: 8, maxRows: 10 }"
            type="textarea"
            placeholder="Ingrese descripción del movimiento extra"
          >
          </el-input>
        </div>
      </div>
      <el-button
        class="d-block mx-auto mt-3 my-1 w-50"
        v-on:click="crearMovimientoExtra(nuevoMovimientoExtra)"
        >Agregar Movimiento</el-button
      >
    </el-main>
  </div>
</template>
<script>
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      cargando: false,
      nuevoMovimientoExtra: {
        type_move: "",
        description: "",
        date: "",
        total: 0,
      },
      listadoTiposMovimiento: [],
    };
  },
  mounted() {
    this.obtenerTiposMovimientos();
  },
  methods: {
    async obtenerTiposMovimientos() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerTiposMovimientos();
        this.listadoTiposMovimiento = respuesta.data;
        // Traducir a español
        this.listadoTiposMovimiento.forEach((tipo) => {
          tipo.title == "ingress"
            ? (tipo.title_es = "Ingreso")
            : (tipo.title_es = "Egreso");
        });
      } catch (error) {
        if (error.response) {
          
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener tipos de movimientos");
        }
      }
      this.cargando = false;
    },
    async crearMovimientoExtra(nuevoMovimientoExtra) {
      if (this.validarDatos(nuevoMovimientoExtra)) {
        this.cargando = true;
        try {
          await api.crearMovimientoExtra(nuevoMovimientoExtra);
          this.$router.push("/movimientos/extra");
        } catch (error) {
          if (error.response) {
            
            ElMessage.error(error.response.data.message);
          } else {
            ElMessage.error("Error al crear movimiento extra");
          }
        }
        this.cargando = false;
      } else {
        ElMessage({
          message: "Por favor, ingrese todos los datos",
          type: "error",
        });
      }
    },
    validarDatos(datos) {
      if (datos.type_move == "") {
        return false;
      }
      if (datos.description == "" || datos.description.length < 10) {
        return false;
      }
      if (datos.date == "") {
        return false;
      }
      if (datos.total == 0) {
        return false;
      }
      return true;
    },
  },
};
</script>
<style lang=""></style>
