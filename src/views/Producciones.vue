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
        <el-select
          v-model="valor"
          placeholder="Seleccione producci&oacute;n"
          size="large"
          class="_w-50"
          filterable
          no-data-text="No hay producciones, intente recargar la p&aacute;gina"
        >
          <el-option-group
            v-for="group in produccionesParaSelect"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item._id"
              :label="item._id + ' - ' + item.start_date_format"
              :value="item._id"
            >
            </el-option>
          </el-option-group>
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
            <p class="_text-big _semi-bold">Datos econ&oacute;micos</p>
            <div class="d-flex flex-wrap justify-content-around">
              <el-badge
                is-dot
                class="item"
                v-if="produccionSeleccionada.in_progress"
              >
                <p class="_text-big mx-2">
                  Ventas =
                  <span class="_bold">{{
                    calcularVentas(produccionSeleccionada.detail_sales)
                  }}</span>
                </p></el-badge
              >
              <p class="_text-big mx-2" v-else>
                Ventas =
                <span class="_bold">{{
                  produccionSeleccionada.total_ingress_format
                }}</span>
              </p>
              <el-badge
                is-dot
                class="item"
                v-if="produccionSeleccionada.in_progress"
                ><p class="_text-big mx-2">
                  Costos =
                  <span class="_bold">{{
                    calcularCostoProduccion(
                      produccionSeleccionada.production_costs
                    )
                  }}</span>
                </p></el-badge
              >
              <p class="_text-big mx-2" v-else>
                Costos de producci&oacute;n =
                <span class="_bold">{{
                  produccionSeleccionada.total_egress_format
                }}</span>
              </p>
            </div>
            <hr />

            <p
              class="_text-big _semi-bold"
              v-if="!produccionSeleccionada.in_progress"
            >
              Detalle de costos de producci&oacute;n
            </p>
            <div class="container" v-if="!produccionSeleccionada.in_progress">
              <ul>
                <li
                  v-for="(
                    item, index
                  ) in produccionSeleccionada.production_costs"
                  :key="index"
                >
                  <p>
                    <span class="_bold">{{
                      item.total.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                    }}</span
                    ><span class="mx-2">{{
                      item.description || "Sin descripción "
                    }}</span>
                  </p>
                </li>
              </ul>
            </div>
            <hr v-if="!produccionSeleccionada.in_progress" />

            <p
              class="_text-big _semi-bold"
              v-if="!produccionSeleccionada.in_progress"
            >
              Detalle de ventas de producci&oacute;n
            </p>
            <div class="container" v-if="!produccionSeleccionada.in_progress">
              <ul>
                <li
                  v-for="(item, index) in produccionSeleccionada.detail_sales"
                  :key="index"
                >
                  <p>
                    <span class="mx-2 _bold">{{
                      item.total.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                    }}</span
                    ><span>{{ item._id }}</span>
                  </p>
                </li>
              </ul>
            </div>
            <hr v-if="!produccionSeleccionada.in_progress" />
            {{ produccionSeleccionada }}
          </div>
          <div class="_botones _w-25 text-end">
            <el-button
              v-if="produccionSeleccionada.in_progress"
              v-on:click.prevent="
                agregarGastoInsumo(produccionSeleccionada._id)
              "
              class="my-1"
              >Agregar gasto de insumo</el-button
            >
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
import { fechaActual } from "@/scripts/Fechas.js";
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
      produccionesParaSelect: [],
      valor: null,
      produccionSeleccionada: null,
    };
  },
  mounted() {
    this.obtenerProducciones();
  },
  methods: {
    async obtenerProducciones() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerTodasProducciones();
        this.producciones = respuesta.data;
        // Formatear para el select de grupos
        let in_progress = {
          label: "En progreso",
          options: [],
        };
        let finished = {
          label: "Finalizadas",
          options: [],
        };
        this.producciones.map((item) => {
          item.in_progress
            ? in_progress.options.push(item)
            : finished.options.push(item);
        });
        this.produccionesParaSelect = [in_progress, finished];
      } catch (error) {
        console.log(error);
      }
      this.cargando = false;
    },
    async finalizarProduccion(id) {
      this.cargando = true;
      try {
        const respuesta = await api.finalizarProduccion(id, fechaActual);
        ElMessage({
          message: `La producción '${respuesta.data._id}' ha sido finalizada`,
          type: "success",
        });
        this.valor = null;
        this.obtenerProducciones();
      } catch (error) {
        console.log(error);
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
        console.log(error);
      }
      this.cargando = false;
    },
    agregarGastoInsumo(id) {
      this.$router.push("/producciones/nuevo-gasto-insumo/" + id);
    },
    calcularCostoProduccion(productionCosts) {
      let costo = 0;
      productionCosts.map((item) => {
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
