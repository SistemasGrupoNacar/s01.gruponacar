<template>
  <el-page-header
    class="my-3"
    content="Listado de Salarios"
    @back="irSalarios()"
  />
  <hr />
  <div class="my-0">
    <el-main v-loading="cargando" class="my-0 py-0">
      <div class="container px-1 px-lg-4 my-2 my-md-0 text-center">
        <p class="_semi-bold m-0">Filtros</p>

        <div class="d-inline-flex align-items-center mx-2 my-2 my-lg-0 py-2">
          <div class="mx-md-4 mx-0">
            <span>Por semana:</span>
            <el-date-picker
              v-model="filtro.semana"
              :disabled="filtro.nombre != ''"
              type="week"
              class="mx-2 w-100"
              format="[Semana] ww"
              placeholder="Seleccione una semana"
            />
          </div>
          <div class="mx-md-4 mx-0">
            <span class="">Por nombre: </span>
            <el-input
              v-model="filtro.nombre"
              :disabled="filtro.semana != null"
              class="mx-2 w-100"
              placeholder="Ingrese un nombre"
              clearable
            />
          </div>
        </div>
        <hr />
        <div
          class="
            d-flex
            align-items-center
            justify-content-end
            _text-normal
            my-2
          "
        >
          <p class="mx-3 my-0">Total: {{ total.format }}</p>
          <p class="mx-3 my-0">Pago(s): {{ total.elementos }}</p>
        </div>
      </div>
      <el-table
        :data="listadoSalariosFiltrada"
        style="width: 100%"
        max-height="400"
      >
        <el-table-column label="Empleado">
          <el-table-column
            prop="employee.first_name"
            label="Nombres"
            width="150"
          />
          <el-table-column
            prop="employee.last_name"
            label="Apellidos"
            width="150"
          />
        </el-table-column>
        <el-table-column prop="total_format" label="Monto" width="100" />
        <el-table-column prop="_id" label="ID" width="220" />
        <el-table-column
          prop="description"
          label="Descripci&oacute;n"
          min-width="100"
        />
        <el-table-column prop="date_format" label="Fecha" width="200" />
        <el-table-column
          prop="production._id"
          label="Producci&oacute;n"
          width="220"
        />
        <el-table-column fixed="right" label="Operaciones" width="120">
          <template #default="scope">
            <el-popconfirm
              confirm-button-text="Si"
              cancel-button-text="No"
              :icon="InfoFilled"
              icon-color="#114B5F"
              title="¿Está seguro de eliminar este salario?"
              @confirm="eliminarSalario(scope.row._id)"
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
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
export default {
  components: {
    Delete,
  },
  data() {
    return {
      listadoSalarios: [],
      listadoSalariosFiltrada: [],
      cargando: false,
      total: {
        valor: 0,
        format: "",
        elementos: 0,
      },
      filtro: {
        semana: null,
        nombre: "",
      },
    };
  },
  watch: {
    filtro: {
      handler(data) {
        if (data.semana != null) {
          //Calcular fecha inicio y fin de la semana
          let fecha = new Date(data.semana);
          // Se asigna la fecha de inicio
          const fechaInicio = fecha.toISOString();
          // Agregar 6 dias a la fecha
          fecha.setDate(fecha.getDate() + 6);
          fecha.setHours(23, 59, 59, 59);
          const fechaFinal = new Date(fecha).toISOString();

          // Filtrar cada salario comparando que la fecha este en el rango de fechas
          this.listadoSalariosFiltrada = this.listadoSalarios.filter(
            (salario) => {
              let fechaSalario = new Date(salario.date);
              fechaSalario = fechaSalario.toISOString();
              return fechaSalario >= fechaInicio && fechaSalario <= fechaFinal;
            }
          );
          this.calcularTotal();
        } else if (data.nombre != "") {
          this.listadoSalariosFiltrada = this.listadoSalarios.filter(
            (salario) => {
              return salario.employee.first_name
                .toLowerCase()
                .includes(data.nombre.toLowerCase());
            }
          );
          this.calcularTotal();
        } else {
          this.listadoSalariosFiltrada = this.listadoSalarios;
          this.calcularTotal();
        }
      },
      deep: true,
    },
  },
  methods: {
    irSalarios() {
      this.$router.push("/salarios");
    },
    calcularTotal() {
      this.total.valor = 0;
      this.listadoSalariosFiltrada.forEach((salario) => {
        this.total.valor += salario.total;
      });
      this.total.format = this.total.valor.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
      this.total.elementos = this.listadoSalariosFiltrada.length;
    },
    async obtenerSalarios() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerSalarios();
        this.listadoSalarios = respuesta.data;
        this.listadoSalariosFiltrada = this.listadoSalarios;
        this.calcularTotal();
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener los salarios");
        }
      }
      this.cargando = false;
    },
    async eliminarSalario(id) {
      this.cargando = true;
      try {
        await api.eliminarSalario(id);
        this.obtenerSalarios();
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al eliminar el salario");
        }
      }
      this.cargando = false;
    },
  },
  mounted() {
    this.obtenerSalarios();
  },
};
</script>
<style lang=""></style>
