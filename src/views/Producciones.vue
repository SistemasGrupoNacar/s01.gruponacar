<template>
  <el-backtop :bottom="75" />
  <el-button
    class="nueva-produccion"
    type="primary"
    v-on:click="crearNuevaProduccion()"
    ><el-icon><Plus /> </el-icon>
    <span class="_not-mobile"> Nueva Producci&oacute;n</span>
  </el-button>
  <div class="container py-2 px-1 px-lg-4">
    <p class="_title text-start">Producci&oacute;n</p>
    <p class="_subtitle text-muted text-start">
      Control de eventos y acciones en producciones.
    </p>
    <el-main v-loading="cargando">
      <div class="w-100">
        <div class="d-inline-flex align-items-center mx-2 my-2 my-lg-0">
          Mostrar todas: <el-switch class="mx-2" v-model="filtro" />
        </div>
        <el-select
          v-model="valor"
          placeholder="Seleccione producci&oacute;n"
          size="large"
          class="_w-50"
          filterable
          no-data-text="No hay producciones, intente recargar la p&aacute;gina"
        >
          <el-option
            v-for="item in producciones"
            :key="item._id"
            :label="item.label"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="w-100 my-2">
        <div
          v-if="produccionSeleccionada == null"
          class="d-flex flex-wrap flex-row justify-content-center align-items-lg-center align-items-start _min"
        >
          <p class="text-muted">
            <el-icon><WarningFilled /> </el-icon>
            Ninguna producci&oacute;n ha sido seleccionada
          </p>
        </div>
        <div
          class="d-flex flex-row flex-wrap flex-lg-nowrap justify-content-between align-items-start px-3 py-3 py-lg-1"
          v-else
        >
          <div class="_w-75">
            <p class="_text-big _semi-bold my-2">Informaci&oacute;n General</p>
            <p class="text-muted _light my-0">
              {{ produccionSeleccionada._id }} -
              {{ produccionSeleccionada.description
              }}<el-tag
                v-if="produccionSeleccionada.in_progress"
                class="mx-2"
                type="info"
                effect="plain"
                >En Progreso</el-tag
              >

              <el-tag v-else class="mx-2" type="info">Terminada</el-tag>
            </p>
            <div class="_w-50 px-2 py-1">
              <div
                class="d-flex flex-wrap justify-content-between align-items-center"
                v-if="produccionSeleccionada.product != null"
              >
                <p class="">Producto</p>
                <p class="_semi-bold">
                  {{ produccionSeleccionada.product.name }}
                </p>
              </div>
              <div
                class="d-flex flex-wrap justify-content-between align-items-center"
              >
                <p class="">Inicio</p>
                <p class="_semi-bold">
                  {{ produccionSeleccionada.start_date_format }}
                </p>
              </div>
              <div
                class="d-flex flex-wrap justify-content-between align-items-center"
                v-if="!produccionSeleccionada.in_progress"
              >
                <p class="my-0">Fin</p>
                <p class="_semi-bold">
                  {{ produccionSeleccionada.end_date_format }}
                </p>
              </div>
              <div
                class="d-flex flex-wrap justify-content-between align-items-center"
                v-if="produccionSeleccionada.place != null"
              >
                <p class="my-0">Lugar</p>
                <p class="_semi-bold">
                  {{ produccionSeleccionada.place.description }}
                </p>
              </div>
            </div>
            <hr />
          </div>
          <div class="_botones _w-25 text-end">
            <el-button
              v-if="produccionSeleccionada.in_progress"
              plain
              type="danger"
              class="my-1"
              v-on:click.prevent="
                finalizarProduccion(produccionSeleccionada._id)
              "
              >Terminar producci&oacute;n</el-button
            ><el-button
              v-else
              plain
              type="warning"
              class="my-1"
              v-on:click.prevent="
                reanudarProduccion(produccionSeleccionada._id)
              "
              >Reanudar producci&oacute;n</el-button
            >
          </div>
        </div>
      </div>
    </el-main>
  </div>
</template>
<script>
import api from "@/api/index.js";
import { Plus, WarningFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
export default {
  components: {
    Plus,
    WarningFilled,
  },
  data() {
    return {
      cargando: false,
      producciones: [],
      valor: null,
      produccionSeleccionada: null,
      filtro: false,
      is_mobile: true,
    };
  },
  mounted() {
    //Verificar si es celular
    if (window.innerWidth > 768) {
      this.is_mobile = false;
    }
    this.obtenerProducciones();
  },
  methods: {
    async obtenerProducciones() {
      this.cargando = true;
      try {
        let respuesta;
        if (this.filtro == true) {
          respuesta = await api.obtenerTodasProducciones();
        } else {
          respuesta = await api.obtenerProduccionesEnProgreso();
        }

        this.producciones = respuesta.data;
        this.producciones.map((item) => {
          item.label = `${item.description} - ${item.start_date_format}`;
          if (!this.is_mobile) {
            item.label += item.in_progress ? " - En progreso" : " - Finalizada";
          }
        });
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener las producciones");
        }
      }
      this.cargando = false;
    },
    async finalizarProduccion(id) {
      this.cargando = true;
      const fechaActual = new Date().toISOString();
      try {
        const respuesta = await api.finalizarProduccion(id, fechaActual);
        ElMessage({
          message: `La producción '${respuesta.data._id}' ha sido finalizada`,
          type: "success",
        });
        this.valor = null;
        this.obtenerProducciones();
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al finalizar la producción");
        }
      }
      this.cargando = false;
    },
    async reanudarProduccion(id) {
      this.cargando = true;
      try {
        const respuesta = await api.reanudarProduccion(id);
        ElMessage({
          message: `La producción '${respuesta.data._id}' ha sido reanudada`,
          type: "success",
        });
        this.valor = null;
        this.obtenerProducciones();
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al reanudar la producción");
        }
      }
      this.cargando = false;
    },
    calcularCostoProduccion(productionCosts, salaries) {
      let costo = 0;
      productionCosts.map((item) => {
        costo += item.total;
      });
      salaries.map((item) => {
        costo += item.total;
      });
      return costo.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
    calcularVentas(sales) {
      let ventas = 0;
      sales.map((item) => {
        ventas += item.total;
      });
      return ventas.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
    crearNuevaProduccion() {
      this.$router.push("/producciones/nueva");
    },
  },
  watch: {
    valor() {
      this.produccionSeleccionada = this.producciones.find(
        (item) => item._id === this.valor
      );
    },
    filtro() {
      this.obtenerProducciones();
    },
  },
};
</script>
<style lang="scss">
.item {
  margin-top: 10px;
  margin-right: 40px;
}
._min {
  min-height: 50vh !important;
}
._li {
  list-style: square;
  // Animacion de hover
  transition: opacity 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    // Cambiar el fondo de texto a gris
    color: rgb(100, 100, 100);
  }
}

._max-list {
  max-height: 300px;
  overflow-y: auto;
}

._listado {
  max-height: 400px;
  overflow-y: auto;
}
.nueva-produccion {
  display: block;
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 10;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
