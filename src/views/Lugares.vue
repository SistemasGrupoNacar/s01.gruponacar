<template>
  <div class="container py-2 px-1 px-lg-4">
    <p class="_title text-start">Lugares de Siembra</p>
    <p class="_subtitle text-muted text-start">
      Administraci&oacute;n de lugares y espacios f&iacute;sicos para la
      siembra.
    </p>

    <el-main v-loading="cargando">
      <div class="row">
        <div class="col-12 col-md-8 px-3">
          <p class="_bold">Listado de lugares</p>
          <el-table :data="listadoLugares" max-height="380"
            ><el-table-column
              prop="description"
              label="Descripción"
              min-width="150"
            >
            </el-table-column>
            <el-table-column prop="_id" label="ID" width="200">
            </el-table-column>
            <el-table-column
              prop="availability_format"
              label="Disponibilidad"
              width="120"
            >
            </el-table-column>

            <el-table-column fixed="right" label="Operaciones" width="150">
              <template #default="scope">
                <el-button
                  type=""
                  v-on:click="cambiarDisponibilidadLugar(scope.row)"
                  v-if="scope.row.availability"
                  ><el-icon><Remove /> </el-icon> </el-button
                ><el-button
                  type=""
                  v-on:click="cambiarDisponibilidadLugar(scope.row)"
                  v-else
                  ><el-icon><Check /> </el-icon>
                </el-button>
                <el-button type="primary" v-on:click="eliminarLugar(scope.row)"
                  ><el-icon><Delete /> </el-icon>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="col-12 col-md-4 px-3">
          <p class="_bold">A&ntilde;adir lugar de siembra</p>

          <span class="text-muted">Descripci&oacute;n</span>
          <el-input
            v-model="lugar.description"
            class="w-100 my-2"
            placeholder="Ingrese descripción del lugar de siembra"
          />
          <span class="text-muted">Disponible </span>
          <el-switch class="my-2 mx-4" v-model="lugar.availability" />
          <el-button
            class="d-block mx-auto my-2 w-50"
            v-on:click="crearLugar(lugar)"
            >Agregar lugar</el-button
          >
        </div>
      </div>
    </el-main>
  </div>
</template>
<script>
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
import { Remove, Delete, Check } from "@element-plus/icons-vue";
export default {
  components: {
    Remove,
    Delete,
    Check,
  },
  data() {
    return {
      cargando: false,
      listadoLugares: [],
      lugar: {
        description: "",
        availability: false,
      },
    };
  },
  mounted() {
    this.obtenerLugares();
  },
  methods: {
    async obtenerLugares() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerLugaresTodos();
        this.listadoLugares = respuesta.data;
        this.listadoLugares.forEach((element) => {
          element.availability_format = element.availability
            ? "Disponible"
            : "No disponible";
        });
      } catch (error) {
        if (error.response) {
          
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener los datos");
        }
      }
      this.cargando = false;
    },
    async cambiarDisponibilidadLugar(dato) {
      this.cargando = true;
      try {
        await api.cambiarDisponibilidadLugar(dato._id, !dato.availability);
        ElMessage.success("Cambio de disponibilidad realizado");
        this.obtenerLugares();
      } catch (error) {
        if (error.response) {
          
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener los datos");
        }
      }
      this.cargando = false;
    },
    async eliminarLugar(dato) {
      this.cargando = true;
      try {
        await api.eliminarLugar(dato._id);
        ElMessage.success("Lugar eliminado");
        this.obtenerLugares();
      } catch (error) {
        if (error.response) {
          
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener los datos");
        }
      }
      this.cargando = false;
    },
    async crearLugar(dato) {
      this.cargando = true;
      try {
        await api.crearLugar(dato);
        ElMessage.success("Lugar creado");
        this.lugar = {
          description: "",
          availability: false,
        };
        this.obtenerLugares();
      } catch (error) {
        if (error.response) {
          
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener los datos");
        }
      }
      this.cargando = false;
    },
  },
};
</script>
<style lang=""></style>
