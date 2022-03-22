<template>
  <el-main class="container">
    <div class="_big-container _noreverse">
      <div class="_w-50 px-2 px-lg-5 py-2">
        <p class="_bold _text-justify _text-big">
          Detalle de Costo / Beneficio
        </p>
        <p class="_text-justify">
          Gr&aacute;fica de relaci&oacute;n de los &uacute;ltimos 12 meses entre
          los costos de producci&oacute;n y mantenimiento de la empresa
          enfrentado con los ingresos por ventas y otro tipo de movimientos.
        </p>
        <div class="text-center">
          <el-button v-on:click.prevent="irIngresos()">Ir a ingresos</el-button>
          <el-button v-on:click.prevent="irEgresos()">Ir a egresos</el-button>
        </div>
      </div>
      <el-main class="_w-75" v-loading="cargando">
        <grafica :datos="datos.graphic" />
      </el-main>
    </div>
    <div class="_big-container _reverse">
      <div class="_w-40">
        <img
          :src="require('@/assets/illustrations/person-comments.svg')"
          alt="Se espera una imagen de una persona realizando un comentario"
          class="_img-svg"
        />
      </div>
      <div class="_w-75 px-2 px-lg-5 py-2">
        <p class="_bold _text-justify _text-big">
          Notificaciones de insumos escasos
        </p>
        <p class="_text-justify">
          Apartado para alertar al usuario de los insumos que necesitan
          suministro.
        </p>
        <el-container v-loading="cargando" style="min-height: 100px">
          <ul class="_list">
            <li
              v-for="(item, index) in datos.productsWithLessStock"
              :key="index"
            >
              {{
                item.name +
                " - Actual: " +
                item.stock +
                " - M&iacute;nimo: " +
                item.min_stock
              }}
              (unidades)
            </li>
          </ul>
        </el-container>

        <div class="text-center">
          <el-button v-on:click.prevent="irInsumos()">Ir a insumos</el-button>
        </div>
      </div>
    </div>
    <div class="_big-container _noreverse">
      <div class="_w-75">
        <p class="_bold _text-justify _text-big">
          Control de ventas en proceso
        </p>
        <p class="_text-justify">
          Espacio para controlar las ventas que no han sido finalizadas y
          requieren de atenci&oacute;n.
        </p>

        <el-container v-loading="cargando" style="min-height: 100px">
          <ul class="_list">
            <li v-for="(item, index) in datos.salesPending" :key="index">
              {{ item._id + " - " + item.date_format }}
            </li>
          </ul></el-container
        >

        <div class="text-center">
          <el-button v-on:click.prevent="irVentas()">Ir a ventas</el-button>
        </div>
      </div>
      <div class="_w-40">
        <img
          :src="require('@/assets/illustrations/person-detail.svg')"
          alt="Se espera una imagen de una persona escribiendo ciertos detalles"
          class="_img-svg"
        />
      </div>
    </div>
  </el-main>
</template>

<script>
import Grafica from "@/components/Grafica.vue";
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
export default {
  name: "Inicio",
  components: {
    Grafica,
  },
  data() {
    return {
      cargando: false,
      datos: {
        graphic: null,
        productsWithLessStock: null,
        salesPending: null,
      },
    };
  },
  mounted() {
    this.obtenerDatosPanel();
    // Obtener la ubicacion actual
    /*navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
    });*/
  },
  methods: {
    async obtenerDatosPanel() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerDatosPanel();
        this.datos = respuesta.data;
      } catch (error) {
        if (error.response) {
          
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al realizar la petición, intente nuevamente.");
        }
      }
      this.cargando = false;
    },
    irEgresos() {
      this.$router.push("/movimientos/egresos");
    },
    irIngresos() {
      this.$router.push("/movimientos/ingresos");
    },
    irInsumos() {
      this.$router.push("/inventario/insumos");
    },
    irVentas() {
      this.$router.push("/movimientos/ventas");
    },
  },
};
</script>

<style lang="scss"></style>
