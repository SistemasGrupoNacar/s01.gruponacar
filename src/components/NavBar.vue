<template>
  <nav class="_nav">
    <div class="_nav-brand">
      <el-avatar :size="64" class="_avatar" :src="usuario.avatar"></el-avatar>
      <div class="d-flex flex-column mx-3">
        <span class="_bold _text-small">{{ usuario.username }}</span>
        <span>GrupoNacar</span>
      </div>
    </div>
    <div class="_nav-search">
      <el-select
        v-model="rutaSeleccionada"
        class="w-50 d-block mx-auto"
        filterable
        remote
        placeholder="Escriba apartado a buscar"
        :remote-method="buscarRuta"
        :loading="cargando"
      >
        <el-option
          v-for="item in rutasCoincidentes"
          :key="item.url"
          :label="item.nombre"
          :value="item.url"
        >
        </el-option>
      </el-select>
    </div>
    <div
      class="_nav-options-activator"
      ref="navOptionsActivator"
      v-on:click.prevent="navOptionsSwitcher()"
    >
      <img
        :src="images.imgOptionsVertical"
        ref="navOptionsActivatorIcon"
        alt="icono de opciones"
        class="_icon"
      />
    </div>
    <div class="_nav-options" ref="navOptions">
      <el-menu @open="handleOpen" @close="handleClose">
        <el-sub-menu
          v-for="(item, index) in rutasAgrupadas"
          :key="index"
          :index="index.toString()"
        >
          <template #title>
            <span class="_semi-bold">{{ item.nombre }}</span>
          </template>
          <el-menu-item
            v-for="(itemA, indexA) in item.rutas"
            :key="indexA"
            class="p-0"
          >
            <router-link
              :to="itemA.url"
              class="px-4 w-100 text-start _link"
              v-on:click.prevent="cerrarMenu()"
              >{{ itemA.nombre }}</router-link
            >
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </nav>
</template>
<script>
import imgMenu from "@/assets/illustrations/Menu.svg";
import imgPlus from "@/assets/illustrations/Plus.svg";
import imgOptionsVertical from "@/assets/illustrations/options-vertical.svg";
import imgClose from "@/assets/illustrations/close.svg";
import sesion from "@/scripts/Sesion.js";

export default {
  data() {
    return {
      images: {
        imgMenu,
        imgPlus,
        imgOptionsVertical,
        imgClose,
      },
      rutasCoincidentes: [],
      rutaSeleccionada: "",
      rutasAgrupadas: [],
      usuario: {
        avatar: null,
        username: null,
      },
      rutas: [
        {
          nombre: "Panel de control",
          url: "/",
          grupo: "General",
          palabras: [
            "panel",
            "control",
            "panel de control",
            "inicio",
            "dashboard",
            "home",
          ],
        },
        {
          nombre: "Insumos",
          url: "/inventario/insumos",
          grupo: "Inventario",
          palabras: ["insumos", "insumo"],
        },
        {
          nombre: "Productos",
          url: "/inventario/productos",
          grupo: "Inventario",
          palabras: ["productos", "producto"],
        },
        {
          nombre: "Ingresos",
          url: "/movimientos/ingresos",
          grupo: "Movimientos",
          palabras: ["ingresos", "ingreso"],
        },
        {
          nombre: "Egresos",
          url: "/movimientos/egresos",
          grupo: "Movimientos",
          palabras: ["egresos", "egreso"],
        },
        {
          nombre: "Ventas",
          url: "/movimientos/ventas",
          grupo: "Movimientos",
          palabras: ["ventas", "venta"],
        },
        {
          nombre: "Extras",
          url: "/movimientos/extra",
          grupo: "Movimientos",
          palabras: ["extras", "extra"],
        },
        {
          nombre: "Producciones",
          url: "/producciones",
          grupo: "Control",
          palabras: ["producciones", "produccion", "producción"],
        },
        {
          nombre: "Lugares",
          url: "/lugares",
          grupo: "Control",
          palabras: [
            "lugares",
            "lugar",
            "casa",
            "casa de campo",
            "malla",
            "terreno",
            "campo",
          ],
        },
        {
          nombre: "Empleados",
          url: "/empleados",
          grupo: "Control",
          palabras: ["empleados", "empleado", "trabajador"],
        },
        {
          nombre: "Jornadas",
          url: "/jornadas",
          grupo: "Control",
          palabras: [
            "jornadas",
            "jornada",
            "laboral",
            "trabajo",
            "dias",
            "días",
          ],
        },
        {
          nombre: "Perfil",
          url: "/perfil",
          grupo: "General",
          palabras: ["perfil", "perfiles", "cuenta", "cuentas", "yo"],
        },
        {
          nombre: "Usuarios",
          url: "/usuarios",
          grupo: "General",
          palabras: [
            "usuarios",
            "usuario",
            "persona",
            "token",
            "empleado",
            "yo",
          ],
        },
        {
          nombre: "Salarios",
          url: "/salarios",
          grupo: "Control",
          palabras: ["salarios", "salario", "salario mínimo", "dinero"],
        },
      ],
    };
  },
  mounted() {
    this.rutasAgrupadas = this.agruparRutas(this.rutas);
    this.obtenerDatosUsuario();
  },
  watch: {
    rutaSeleccionada(nuevaRuta) {
      if (nuevaRuta != "") {
        this.$router.replace(nuevaRuta);
      }
    },
  },
  methods: {
    async obtenerDatosUsuario() {
      const respuesta = await sesion.obtenerDatosDeUsuario();
      this.usuario.avatar = respuesta.avatar;
      this.usuario.username = respuesta.username;
    },
    navOptionsSwitcher() {
      this.$refs.navOptions.classList.toggle("_nav-options-active");
      this.$refs.navOptionsActivator.classList.toggle(
        "_nav-options-activator-active"
      );

      // Cambiar el icono del activador
      this.$refs.navOptionsActivatorIcon.src =
        this.$refs.navOptions.classList.contains("_nav-options-active")
          ? this.images.imgClose
          : this.images.imgOptionsVertical;
    },
    buscarRuta(palabraBusqueda) {
      this.cargando = true;
      if (palabraBusqueda != "") {
        this.rutasCoincidentes = this.rutas.filter((ruta) => {
          return ruta.palabras.some((palabra) => {
            return palabra.includes(palabraBusqueda.toLowerCase());
          });
        });
      } else {
        this.rutasCoincidentes = [];
      }
      this.cargando = false;
    },
    agruparRutas(rutas) {
      let routes = [];
      rutas.forEach((ruta) => {
        let grupoNombre = ruta.grupo;
        let grupoExistente = routes.find(
          (grupo) => grupo.nombre == grupoNombre
        );
        if (grupoExistente) {
          grupoExistente.rutas.push(ruta);
        } else {
          routes.push({
            nombre: grupoNombre,
            rutas: [ruta],
          });
        }
      });
      return routes;
    },
    cerrarMenu() {
      this.$refs.navOptions.classList.remove("_nav-options-active");
      this.$refs.navOptionsActivator.classList.remove(
        "_nav-options-activator-active"
      );
      this.$refs.navOptionsActivatorIcon.src = this.images.imgOptionsVertical;
    },
  },
};
</script>
<style lang="scss">
._nav {
  min-height: 60px !important;
  background-color: var(--white);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 10px 15px;
}

._nav-brand {
  display: flex;
  align-items: center;
  height: calc(60px - 10px);
  ._avatar {
    display: none;
  }
}

._nav-burger {
  display: block;
}

._nav-search {
  display: none;
  flex: 1;
  padding: 10px 20px;
}

//Icono
._icon {
  width: 28px;
  height: 28px;
}

._nav-options {
  position: relative;
  display: none;
  width: 100%;
  margin-top: 20px;
  transition: all 0.3s ease-in-out;
}

._nav-options-active {
  display: block;
}

@media screen and (min-width: 768px) {
  ._nav {
    flex-wrap: nowrap;
  }

  ._nav-burger {
    display: none;
  }

  // Brand
  ._nav-brand {
    min-width: 250px;
    ._avatar {
      display: block;
    }
  }

  // Barra de busqueda
  ._nav-search {
    display: block;
  }

  // Menu de opciones
  ._nav-options {
    position: absolute;
    background: var(--white);
    top: 60px;
    right: 0px;
    padding: 10px 20px;
    transform: translateX(250px);
    visibility: hidden;
    border-radius: 5px;
    width: 250px;
    z-index: -2;
    z-index: 1000;
    box-shadow: -10px 10px 20px rgba(0, 0, 0, 0.1);
  }
  ._nav-options-active {
    transform: translateX(0px) !important;
    visibility: visible;
  }
  // Activador del menu de opciones
  ._nav-options-activator {
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    background: transparent;
    border-radius: 50%;
    padding: 5px;
  }
  ._nav-options-activator:hover {
    background: var(--dark-white);
  }
  ._nav-options-activator-active {
    transform: rotate(90deg);
  }
}
</style>
