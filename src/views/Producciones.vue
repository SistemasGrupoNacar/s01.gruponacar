<template>
  <el-button
    class="nueva-produccion"
    type="primary"
    v-on:click="nuevaProduccion()"
    ><el-icon><Plus /> </el-icon>
    <span class="_not-mobile"> Nueva Producci&oacute;n</span>
  </el-button>
  <div class="container py-2 px-1 px-lg-4">
    <p class="_title text-start">Producci&oacute;n</p>
    <p class="_subtitle text-muted text-start">
      Control de eventos y acciones en producciones.
    </p>
    <el-main v-loading="cargando">
      <div class="row">
        <div class="col-12 my-2">Informaci&oacute;n de las producciones</div>
        <div class="col-12 my-2">
          <p class="_text-big">Acciones con producciones</p>
          <div class="row">
            <div class="col-12 col-md-5 _listado">
              <p>Listado</p>
              <ul class="_ul" v-if="producciones.length > 0">
                <li
                  v-for="(item, index) in producciones"
                  :key="index"
                  class="_li"
                  v-on:click.prevent="seleccionarProduccion(item)"
                >
                  {{ item._id }}
                </li>
              </ul>
            </div>
            <div class="col-12 col-md-7" v-if="seleccion._id">
              <div class="w-100 d-flex flex-wrap justify-content-between p-0">
                <span class="_title">
                  {{ seleccion._id }}
                </span>
                <el-tag v-if="seleccion.in_progress" type="info"
                  >En Progreso</el-tag
                >
              </div>
              <p>
                <span class="_subtitle">{{ seleccion.start_date }}</span> /
                <span class="_subtitle"> {{ seleccion.start_date }}</span>
              </p>

              <hr />
              <p class="_bold">Detalle de producci&oacute;n</p>
              <p class="my-0" v-if="seleccion.product != null">
                Producto: <span>{{ seleccion.product.name }}</span>
              </p>
              <p class="m-0">Descripci&oacute;n: {{ seleccion.description }}</p>
              <p class="m-0 " v-if="seleccion.place != null">
                Lugar de siembra: {{ seleccion.place.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </div>
</template>
<script>
import api from "@/api/index.js";
import { Plus } from "@element-plus/icons-vue";
export default {
  components: {
    Plus,
  },
  data() {
    return {
      cargando: false,
      producciones: [],
      seleccion: {},
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
      } catch (error) {
        console.log(error);
      }
      this.cargando = false;
    },
    seleccionarProduccion(item) {
      this.seleccion = item;
    },
  },
};
</script>
<style lang="scss">
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
</style>
