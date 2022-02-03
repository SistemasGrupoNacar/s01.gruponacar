<template>
  <div class="container">
    <p class="_title">Listado de Productos</p>
    <p class="_subtitle text-muted">
      Listado de productos para la venta en el sistema.
    </p>
    <el-main v-loading="cargando">
      <div class="min-h-50">
        <el-table :data="listadoProductos" style="width: 100%" max-height="400">
          <el-table-column prop="name" label="Nombre" width="100" />
          <el-table-column prop="_id" label="ID" />
          <el-table-column prop="description" label="Descripción" />
          <el-table-column prop="availability_text" label="Disponibilidad" />
          <el-table-column fixed="right" label="Operaciones" width="150">
            <template #default="scope">
              <el-button
                type=""
                v-on:click="cambiarDisponibilidadProducto(scope.row)"
                v-if="scope.row.availability"
                ><el-icon><Remove /> </el-icon> </el-button
              ><el-button
                type=""
                v-on:click="cambiarDisponibilidadProducto(scope.row)"
                v-else
                ><el-icon><Check /> </el-icon>
              </el-button>
              <el-button type="primary" v-on:click="eliminarProducto(scope.row)"
                ><el-icon><Delete /> </el-icon>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
  </div>
</template>
<script>
import { Remove, Delete, Check } from "@element-plus/icons-vue";
import api from "@/api/index.js";
export default {
  components: {
    Remove,
    Delete,
    Check,
  },
  data() {
    return {
      cargando: false,
      listadoProductos: [],
    };
  },
  mounted() {
    this.obtenerProductos();
  },
  methods: {
    async obtenerProductos() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerTodosProductos();
        this.listadoProductos = respuesta.data;
      } catch (error) {
        console.log(error);
      }
      this.cargando = false;
    },
    async cambiarDisponibilidadProducto(data) {
      try {
        const respuesta = await api.cambiarDisponibilidadProducto(
          data._id,
          !data.availability
        );
        if (respuesta.status === 200) {
          this.obtenerProductos();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async eliminarProducto(data) {
      try {
        await api.eliminarProducto(data._id);

        this.obtenerProductos();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang=""></style>
