<template>
  <div class="container">
    <p class="_title">Historial Insumos</p>
    <p class="_subtitle text-muted">
      Listado de ingresos de insumos al sistema.
    </p>
    <el-main v-loading="cargando">
      <div class="min-h-50">
        <el-table
          :data="listadoHistorialEntradaInsumos"
          style="width: 100%"
          max-height="400"
        >
          <el-table-column  prop="_id" label="ID" width="200" />
          <el-table-column
            prop="inventory_product.name"
            label="Producto"
            width="200"
          />

          <el-table-column prop="quantity" label="Cantidad" width="90" />
          
          <el-table-column prop="unit_price" label="Precio Unitario" width="120" />
          <el-table-column prop="total" label="Total" width="120" />
          <el-table-column prop="date" label="Fecha" />
          
          <el-table-column fixed="right" label="Operacion" width="100">
            <template #default="scope">
              <el-button
                type="primary"
                v-on:click="eliminarEntradaInsumo(scope.row)"
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
import { Delete } from "@element-plus/icons-vue";
import api from "@/api/index.js";

export default {
  data() {
    return {
      cargando: true,
      listadoHistorialEntradaInsumos: [],
    };
  },
  components: {
    Delete,
  },
  mounted() {
    this.obtenerHistorialEntradaInsumos();
  },
  methods: {
    async obtenerHistorialEntradaInsumos() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerTodosHistorialEntradaInsumos();
        this.listadoHistorialEntradaInsumos = respuesta.data;
        this.listadoHistorialEntradaInsumos.map((item) => {
          item.date = item.date.split("T")[0];
        });
      } catch (error) {
        console.log(error);
      }
      this.cargando = false;
    },
    async eliminarEntradaInsumo(item) {
      try {
        await api.eliminarEntradaInsumo(item._id);
        this.obtenerHistorialEntradaInsumos();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang="scss"></style>
