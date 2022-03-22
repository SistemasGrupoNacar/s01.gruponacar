<template>
  <div class="container">
    <p class="_title">Nuevo insumo</p>
    <p class="_subtitle">Creaci&oacute;n de nuevo insumo</p>
    <div class="row">
      <div class="col-12 col-md-6">
        <form class="_w-100 my-2">
          <span class="text-muted">Nombre</span>
          <el-input
            v-model="insumo.name"
            class="w-100 my-2"
            placeholder="Ingrese nombre del insumo"
          />
          <span class="text-muted">Descripci&oacute;n</span>
          <el-input
            v-model="insumo.description"
            :rows="3"
            type="textarea"
            class="w-100 my-2"
            :autosize="{ minRows: 3, maxRows: 4 }"
            placeholder="Ingrese descripcion del insumo"
          />
          <div class="row">
            <div class="col-6">
              <span class="text-muted">Precio</span>
              <el-input-number
                v-model="insumo.cost"
                :min="0.0"
                :step="0.01"
                class="w-100 my-2"
              ></el-input-number>
            </div>
            <div class="col-6">
              <span class="text-muted">Stock m&iacute;nimo</span>
              <el-input-number
                v-model="insumo.min_stock"
                :min="0"
                :step="1"
                class="w-100 my-2"
              ></el-input-number>
            </div>
          </div>
          <span class="text-muted">Disponibilidad</span>
          <el-select
            v-model="insumo.availability"
            placeholder="Seleccione la disponibilidad"
            class="w-100 my-2"
            filterable
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </form>
      </div>
      <div class="col-12 col-md-6 _only-tablet p-5">
        <p class="_title" v-show="insumo.name != ''">
          {{ insumo.name }}
        </p>
        <p class="_subtitle" v-show="insumo.description != ''">
          {{ insumo.description }}
        </p>
        <p class="_subtitle" v-show="insumo.cost != 0">
          Precio: {{ insumo.cost }}
        </p>
        <p class="_subtitle" v-show="insumo.min_stock != 0">
          Stock M&iacute;nimo: {{ insumo.min_stock }}
        </p>

        <p class="_subtitle" v-show="insumo.availability != null">
          Disponibilidad:
          <span v-if="insumo.availability">Si</span> <span v-else>No</span>
        </p>
      </div>
      <el-button
        class="d-block mx-auto my-1 w-50"
        v-on:click="crearInsumo(insumo)"
        >Agregar Insumo</el-button
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
      insumo: {
        name: "",
        description: "",
        cost: 0,
        min_stock: 0,
        availability: null,
      },
      options: [
        { value: true, label: "Disponible" },
        { value: false, label: "No disponible" },
      ],
    };
  },
  methods: {
    async crearInsumo(data) {
      if (!this.verificarDatos(data)) {
        alert("Datos incompletos");
        return;
      }
      try {
        const respuesta = await api.crearInsumo(data);
        alert("Insumo creado: " + respuesta.data.name);
        this.$router.push({ name: "Insumos" });
      } catch (error) {
        if (error.response) {
          
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al crear insumo");
        }
      }
    },
    verificarDatos(data) {
      if (data.name == "") {
        return false;
      }
      if (data.cost <= 0 || data.cost == null) {
        return false;
      }
      if (data.min_stock <= 0 || data.min_stock == null) {
        return false;
      }
      if (data.availability == null) {
        return false;
      }
      return true;
    },
  },
};
</script>
<style lang=""></style>
