<template>
  <el-tooltip
    class="box-item"
    effect="light"
    content="Agrega un nuevo usuario"
    placement="top"
  >
    <el-button class="_nuevo" type="primary" v-on:click="nuevoUsuario()"
      ><el-icon><Plus /> </el-icon>
    </el-button>
  </el-tooltip>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-8 my-3">
        <p class="_text-bigger text-center">Listado de usuarios</p>
        <el-table
          v-loading="cargando"
          :data="listadoUltimosUsuarios"
          class="w-100"
          max-height="400"
          ><el-table-column label="Avatar" width="120">
            <template #default="scope">
              <el-avatar :size="64" :src="scope.row.avatar"></el-avatar>
            </template> </el-table-column
          ><el-table-column prop="username" label="Usuario" min-width="180">
          </el-table-column>
          <el-table-column prop="role.title_format" label="Rol" width="150">
          </el-table-column>
          <el-table-column fixed="right" label="Accion" width="100">
            <template #default="scope">
              <el-popconfirm
                confirm-button-text="Si"
                cancel-button-text="No"
                :icon="InfoFilled"
                icon-color="#114B5F"
                title="¿Está seguro de eliminar este usuario?"
                @confirm="eliminarUsuario(scope.row._id)"
                @cancel="cancelEvent"
              >
                <template #reference>
                  <el-button type="text" class="" size="small"
                    >Eliminar
                  </el-button>
                </template>
              </el-popconfirm>

              <el-button
                type="text"
                class=""
                size="small"
                v-on:click.prevent="irEditarUsuario(scope.row._id)"
                >Editar
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="col-12 col-md-4 my-3">
        <p class="_bold _text-big">Aspecto importante</p>
        <p class="_text-justify">
          La asignaci&oacute;n de usuarios se realiza automaticamente a los
          empleados, si por alguna raz&oacute;n se elimina el usuario de un
          empleado espec&iacute;fico, se deber&aacute; asignar un nuevo usuario
          relacionado al perfil del empleado.
        </p>
        <img
          :src="require('@/assets/illustrations/chica-foco.svg')"
          alt="Se espera una imagen de una persona sosteniendo un foco"
          class="_img-svg"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { Plus } from "@element-plus/icons-vue";
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
export default {
  components: {
    Plus,
  },
  data() {
    return {
      cargando: false,
      listadoUltimosUsuarios: [],
    };
  },
  mounted() {
    this.obtenerUltimosUsuarios();
  },
  methods: {
    async eliminarUsuario(usuario) {
      this.cargando = true;
      try {
        await api.eliminarUsuario(usuario);
        ElMessage.success("Usuario eliminado");
        this.obtenerUltimosUsuarios();
      } catch (error) {
        console.log(error);
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al eliminar usuario");
        }
      }
      this.cargando = false;
    },
    async obtenerUltimosUsuarios() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerUltimosUsuarios();
        this.listadoUltimosUsuarios = respuesta.data;
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener los usuarios");
        }
      }
      this.cargando = false;
    },
    irEditarUsuario(id) {
      this.$router.push({
        path: "/usuarios/editar/" + id,
        params: {
          id: id,
        },
      });
    },
    nuevoUsuario() {
      this.$router.push("/usuarios/nuevo");
    },
  },
};
</script>
<style lang=""></style>
