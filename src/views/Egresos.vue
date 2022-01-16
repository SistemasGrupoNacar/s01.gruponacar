<template>
  <div class="container py-2 px-1 px-lg-4 text-center">
    <p class="_title">Movimientos (Egresos)</p>
    <hr />
    <el-main v-loading="cargando" class="m-0">
      <div class="d-inline-flex align-items-center mx-2 my-2 my-lg-0">
        <span>Fecha: </span>
        <el-date-picker
          class="mx-2 w-100"
          v-model="filtro.date"
          type="daterange"
          start-placeholder="Fecha de inicio"
          end-placeholder="Fecha de finalizacion"
        ></el-date-picker>
      </div>
      <el-button type="primary" v-on:click="verificarFiltros()"
        >Filtrar
      </el-button>
      <div class="row">
        <div class="col-12 col-md-7 my-2">
          <p class="_semi-bold my-1">Gr&aacute;fico de Costos/Fechas</p>
          <line-chart
            empty="No hay datos"
            prefix="$"
            :data="egresos.graphic"
            class="w-100"
            :colors="['#409EFF', '#666']"
          ></line-chart>
        </div>
        <div class="col-12 col-lg-5 my-2">
          <p class="_semi-bold my-1">
            Detalle de Egresos
            <el-tag class="mx-3" type="info">Filtrado</el-tag>
          </p>
          <div class="container my-3 text-start">
            <p>Fecha: 2022-01-01 - 2022-02-02</p>
            <p>Cantidad de transacciones: 10</p>
            <p>Total por Insumos: $1,023.78</p>
            <p>Total por Salarios: $4,000.00</p>
            <p>Total por Extras: $205.33</p>
            <p>Total: $0</p>
            <p>Mes de mayor gasto: Febrero 2022</p>
            <p>Mes de menor gasto: Enero 2022</p>
          </div>
        </div>}
      </div>
    </el-main>
  </div>
</template>
<script>
import api from "@/api/index.js";
export default {
  data() {
    return {
      egresos: {},
      cargando: false,
      filtro: {},
    };
  },
  mounted() {
    this.obtenerEgresos();
  },
  methods: {
    async obtenerEgresos() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerEgresos();
        this.egresos = respuesta.data;
      } catch (error) {
        console.log(error);
      }
      this.cargando = false;
    },
  },
};
</script>
<style lang=""></style>
