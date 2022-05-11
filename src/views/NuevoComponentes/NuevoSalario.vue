<template>
  <el-page-header class="my-3" content="Agregar salario" @back="irSalarios()" />
  <hr />
  <el-main class="container" v-loading.fullscreen.lock="cargando">
    <div class="row">
      <div class="col-12 col-md-6 my-2">
        <span class="text-muted">Empleado</span>
        <el-select
          v-model="salario.employee"
          placeholder="Seleccione el empleado"
          class="w-100 my-2"
          filterable
        >
          <el-option
            v-for="item in listadoEmpleados"
            :key="item._id"
            :label="item.first_name + ' ' + item.last_name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="col-12 col-md-6 my-2">
        <span class="text-muted">Fecha</span>
        <el-date-picker
          v-model="salario.date"
          type="datetime"
          placeholder="Escoge una fecha"
          class="w-100 my-2"
          clearable
        >
        </el-date-picker>
      </div>
      <div class="col-12 col-md-4 my-2">
        <span class="text-muted">Cantidad</span>
        <el-input-number
          v-model="salario.amount"
          :min="0.01"
          :max="999999"
          :step="0.01"
          class="w-100 my-2"
        >
        </el-input-number>
      </div>
     
      <div class="col-12 col-md-8 my-2">
        <span class="text-muted">Observaciones</span>
        <el-input
          v-model="salario.description"
          placeholder="Ingrese las observaciones"
          clearable
          class="w-100 my-2"
        />
      </div>
      <div class="col-12">
        <el-button
          class="_w-50 d-block mx-auto"
          v-on:click.prevent="crearSalario(salario)"
        >
          Agregar Salario
        </el-button>
      </div>
    </div>
  </el-main>
</template>
<script>
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      salario: {
        employee: "",
        date: "",
        amount: 0,
        description: "",
      },
      cargando: false,
      listadoEmpleados: [],
    };
  },
  mounted() {
    this.obtenerListadoEmpleados();
  },
  methods: {
    irSalarios() {
      this.$router.replace("/salarios");
    },
    async obtenerListadoEmpleados() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerEmpleados();
        this.listadoEmpleados = respuesta.data;
      } catch (error) {
        if (error.response) {
          ElMessage.error({
            message: error.response.data.message,
          });
        } else {
          ElMessage.error({
            message: "Error al obtener listado de empleados",
          });
        }
      }
      this.cargando = false;
    },
  
    async crearSalario(salario) {
      this.cargando = true;
      try {
        await api.crearSalario(salario);
        ElMessage.success({
          message: "Salario agregado correctamente",
        });
        this.salario = {
          employee: "",
          date: "",
          amount: 0,
          description: "",
        };
      } catch (error) {
        if (error.response) {
          if (error.response.status == 422) {
            ElMessage.error({
              message: "Verifique que los campos esten correctos",
            });
            ElMessage.error({
              message: error.response.data.message,
            });
          } else {
            ElMessage.error({
              message: "Error al crear el salario",
            });
          }
        }
      }
      this.cargando = false;
    },
    verificarDatos(salario) {
      if (salario.employee == null) {
        ElMessage.error({
          message: "Seleccione un empleado",
        });
        return false;
      }
      if (salario.date == null) {
        ElMessage.error({
          message: "Seleccione una fecha",
        });
        return false;
      }
      if (salario.amount == null || salario.amount <= 0) {
        ElMessage.error({
          message: "Ingrese una cantidad",
        });
        return false;
      }
      return true;
    },
  },
};
</script>
<style lang=""></style>
