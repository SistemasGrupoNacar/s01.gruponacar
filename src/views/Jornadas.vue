<template>
  <div class="row w-100 px-3 py-2">
    <h4>Jornadas de trabajo</h4>
    <div class="col-12 col-md-6">
      <p>Inicio</p>
      <p>
        <span class="_bold">Latitud: {{ coordenadas.lat }}</span> -----
        <span class="_bold">Longuitud: {{ coordenadas.lng }}</span>
      </p>
      <GoogleMap
        api-key="AIzaSyDLxDg0yfvpZr6U3QNNnfOgqxDmJw3Rui4"
        style="width: 100%; height: 250px"
        :center="coordenadas"
        :zoom="15"
      >
        <Marker :options="{ position: coordenadas }" />
      </GoogleMap>
    </div>
    <div class="col-12 col-md-6">
      <p>Final</p>
      <p>
        <span class="_bold">Latitud: {{ coordenadas.lat }}</span> -----
        <span class="_bold">Longuitud: {{ coordenadas.lng }}</span>
      </p>
      <GoogleMap
        api-key="AIzaSyDLxDg0yfvpZr6U3QNNnfOgqxDmJw3Rui4"
        style="width: 100%; height: 250px"
        :center="coordenadas"
        :zoom="15"
      >
        <Marker :options="{ position: coordenadas }" />
      </GoogleMap>
    </div>
  </div>
</template>
<script>
import { GoogleMap, Marker } from "vue3-google-map";
export default {
  components: {
    GoogleMap,
    Marker,
  },
  data() {
    return {
      coordenadas: {
        lat: 0,
        lng: 0,
      },
    };
  },
  created() {
    this.$getLocation()
      .then((response) => {
        this.coordenadas = response;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style lang=""></style>
