<template>
  <el-page-header
    class="my-3"
    content="Listado de Productos"
    @back="irProductos()"
  />
  <hr />
  <div class="">
    <el-main v-loading.fullscreen.lock="cargando">
      <div class="min-h-50">
        <el-table :data="listadoProductos" style="width: 100%" max-height="500">
          <el-table-column prop="name" label="Nombre" min-width="250" />
          <el-table-column prop="_id" label="ID" width="220" />
          <el-table-column prop="stock" label="Stock" width="120" />
          <el-table-column
            prop="unit_of_measurement"
            label="Medida"
            width="120"
          />
          <el-table-column
            prop="availability_text"
            label="Disponibilidad"
            width="150"
          />
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
import { ElMessage } from "element-plus";
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
        if (error.response) {
          
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener los productos.");
        }
      }
      this.cargando = false;
    },
    async cambiarDisponibilidadProducto(data) {
      this.cargando = true;
      try {
        const respuesta = await api.cambiarDisponibilidadProducto(
          data._id,
          !data.availability
        );
        if (respuesta.status === 200) {
          this.obtenerProductos();
        }
      } catch (error) {
        if (error.response) {
          
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al cambiar la disponibilidad del producto.");
        }
      }
      this.cargando = false;
    },
    async eliminarProducto(data) {
      this.cargando = true;
      try {
        await api.eliminarProducto(data._id);
        this.obtenerProductos();
      } catch (error) {
        if (error.response) {
          
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al eliminar el producto.");
        }
      }
      this.cargando = false;
    },
    irProductos() {
      this.$router.push("/inventario/productos");
    },
  },
};
</script>
<style lang=""></style>
