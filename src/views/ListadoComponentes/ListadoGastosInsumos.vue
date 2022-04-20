<template>
  <el-page-header
    class="my-3"
    content="Listado de Gastos de Insumos"
    @back="irInsumos()"
  />
  <hr />
  <div>
    <div class="d-flex flex-wrap justify-content-center align-items-center">
      <div class="my-2 mx-1 mx-md-3">
        <label for="" class="_light">Por nombre</label>
        <el-input
          autocomplete="false"
          v-model="filtro.name"
          placeholder="Fertilizante ACV"
          clearable
          @input="filtroGastos(filtro, 'name')"
        ></el-input>
      </div>
      <div class="my-2 mx-1 mx-md-3">
        <label for="">Por d&iacute;a</label>
        <el-date-picker
          v-model="filtro.date"
          type="date"
          placeholder="Escoge una fecha"
          class="w-100"
          clearable
          @change="filtroGastos(filtro, 'date')"
        >
        </el-date-picker>
      </div>
    </div>
    <el-main v-loading="cargando">
      <el-table
        :data="listadoMostrarGastosInsumos"
        style="width: 100%"
        max-height="450"
      >
        <el-table-column
          prop="inventory_product.name"
          label="Nombre"
          min-width="220"
        />
        <el-table-column
          prop="quantity"
          label="Cantidad"
          width="100"
        /><el-table-column
          prop="inventory_product.unit_of_measurement"
          label="Medida"
          width="120"
        />
        <el-table-column prop="date_format" label="Fecha" width="200" />
        <el-table-column prop="_id" label="ID" width="220" />

        <el-table-column
          prop="description"
          label="Descripción"
          min-width="220"
        />
        <el-table-column fixed="right" label="Operaciones" width="150">
          <template #default="scope">
            <el-popconfirm
              confirm-button-text="Si"
              cancel-button-text="No"
              :icon="InfoFilled"
              icon-color="#114B5F"
              title="¿Está seguro de eliminar esta gasto?"
              @confirm="eliminarGastoInsumo(scope.row._id)"
              @cancel="cancelEvent"
            >
              <template #reference>
                <el-button type="primary"
                  ><el-icon><Delete /> </el-icon>
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>
<script>
import { Delete } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import api from "@/api/index.js";
import moment from "moment";
export default {
  components: {
    Delete,
  },
  data() {
    return {
      cargando: false,
      listadoGastosInsumos: [],
      listadoMostrarGastosInsumos: [],
      filtro: {
        name: "",
        date: null,
      },
    };
  },
  mounted() {
    this.obtenerListadoGastosInsumos();
  },
  methods: {
    irInsumos() {
      this.$router.push("/inventario/insumos");
    },
    async obtenerListadoGastosInsumos() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerCostosProduccion();
        this.listadoGastosInsumos = respuesta.data;
        this.listadoMostrarGastosInsumos = this.listadoGastosInsumos;
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener los gastos de insumos");
        }
      }
      this.cargando = false;
    },
    async eliminarGastoInsumo(id) {
      this.cargando = true;
      try {
        await api.eliminarCostoProduccion(id);
        this.obtenerListadoGastosInsumos();
        ElMessage.success("Gasto de insumo eliminado");
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al eliminar el gasto de insumo");
        }
      }
      this.cargando = false;
    },
    filtroGastos(dato, filtro) {
      let DATE_END, DATE_START;
      if (filtro == "date" && dato.date != null) {
        DATE_START = dato.date.toISOString();
        DATE_END = moment(dato.date).add(1, "days").toISOString();
      }
      switch (filtro) {
        case "name":
          // Seteando el valor da la fecha a nulo
          this.filtro.date = null;
          // Filtrando por nombre
          this.listadoMostrarGastosInsumos = this.listadoGastosInsumos.filter(
            (gasto) =>
              gasto.inventory_product.name
                .toLowerCase()
                .includes(dato.name.toLowerCase())
          );

          break;
        case "date":
          // Seteando el valor de name a vacio
          this.filtro.name = "";
          if (dato.date == null) {
            this.listadoMostrarGastosInsumos = this.listadoGastosInsumos;
            return;
          }
          // Filtrando por fecha
          this.listadoMostrarGastosInsumos = this.listadoGastosInsumos.filter(
            (gasto) => {
              return moment(gasto.date).isBetween(
                moment(DATE_START),
                moment(DATE_END),
                null,
                "[]"
              );
            }
          );
          break;
      }
    },
  },
};
</script>
<style lang=""></style>
