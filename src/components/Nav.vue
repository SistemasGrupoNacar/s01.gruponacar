<template>
  <nav class="_nav">
    <div class="_nav-brand">
      <span class="_bold">Grupo NACAR</span>
    </div>
    <img
      :src="imagen"
      alt="burger-menu-icon"
      class="_nav-burger"
      ref="burger"
      v-on:click="cambiarEstadoMostrarMenu"
    />
    <div class="_nav-actions" v-show="mostrarMenu">
      <div class="_nav-actions-search">
        <el-select
          v-model="rutaSeleccionada"
          class="w-100"
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
        class="_nav-actions-links my-3 my-md-0 p-0 d-flex flex-row flex-md-column align-items-end justify-content-md-start"
      >
        <img
          v-if="!isMobile"
          :src="imagenSubMenu"
          alt="Opciones"
          class="_nav-actions-links-option"
          v-on:click.prevent="cambiarEstadoMostrarSubMenu()"
        />
        <div
          class="_nav-actions-links-items px-0 px-lg-3"
          v-show="mostrarSubMenu || isMobile"
        >
          <ul class="px-0 px-md-4">
            <li v-for="(item, index) in rutasGrupos" :key="index">
              <p class="my-0 _bold _text-small">{{ index }}</p>
              <div class="px-1" v-for="(item2, index2) in item" :key="index2">
                <router-link
                  class="_link"
                  :to="item2.url"
                  v-on:click.prevent="cambiarRuta()"
                  >{{ item2.nombre }}</router-link
                >
              </div>
            </li>
            <hr />
            <li>
              <p class="_bold _link" v-on:click.prevent="cerrarSesion()">
                Cerrar Sesi&oacute;n
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
//import { Search } from "@element-plus/icons-vue";
import { removeToken } from "@/scripts/Token";
export default {
  components: {
    //Search,
  },
  data() {
    return {
      cargando: false,
      imagen: require("@/assets/illustrations/flecha-abajo.svg"),
      imagenSubMenu: require("@/assets/illustrations/flecha-abajo.svg"),
      isMobile: true,
      rutaSeleccionada: "",
      mostrarMenu: false,
      mostrarSubMenu: false,
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
          palabras: ["lugares", "lugar", "casa", "casa de campo", "malla", "terreno", "campo"],
        },
        {
          nombre: "Perfil",
          url: "/perfil",
          grupo: "Usuario",
          palabras: ["perfil", "perfiles", "cuenta", "cuentas", "yo"],
        },
      ],
      rutasCoincidentes: [],
      rutasGrupos: [],
    };
  },
  created() {
    // Verificar si se mira desde telefono
    if (window.innerWidth >= 768) {
      this.mostrarMenu = true;
      this.isMobile = false;
    }

    //Agrupar las rutas
    this.rutasGrupos = this.rutas.reduce((group, ruta) => {
      const { grupo } = ruta;
      group[grupo] = group[grupo] ?? [];
      group[grupo].push(ruta);
      return group;
    }, {});
  },
  methods: {
    cambiarEstadoMostrarMenu() {
      this.mostrarMenu = !this.mostrarMenu;
      if (this.mostrarMenu && this.isMobile) {
        this.imagen = require("@/assets/illustrations/flecha-arriba.svg");
      } else if (!this.mostrarMenu && this.isMobile) {
        this.imagen = require("@/assets/illustrations/flecha-abajo.svg");
      }
    },
    cambiarEstadoMostrarSubMenu() {
      this.mostrarSubMenu = !this.mostrarSubMenu;
      if (this.mostrarSubMenu) {
        this.imagenSubMenu = require("@/assets/illustrations/flecha-arriba.svg");
      } else if (!this.mostrarSubMenu) {
        this.imagenSubMenu = require("@/assets/illustrations/flecha-abajo.svg");
      }
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
    cambiarRuta() {
      if (!this.isMobile) {
        this.mostrarSubMenu = !this.mostrarSubMenu;
      } else {
        this.mostrarMenu = !this.mostrarMenu;
      }
    },
    async cerrarSesion() {
      await removeToken();
      this.$router.push("/login");
    },
  },
  watch: {
    rutaSeleccionada(nuevaRuta) {
      if (nuevaRuta != "") {
        this.$router.push(nuevaRuta);
        if (this.isMobile) {
          this.cambiarEstadoMostrarMenu();
        }
      }
    },
  },
};
</script>
<style lang="scss">
._nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
  min-height: 70px;
  padding: 0 2rem;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  position: relative;
}

._nav-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  width: 75%;
}

._nav-actions {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--white);
  padding: 1rem;
  z-index: 199;
  height: auto;
}

._nav-actions-search {
  width: 100%;
  margin: 0 auto;
}

._nav-actions-links {
  width: 100%;
  ._nav-actions-links-items {
    border-radius: 0;
    width: 100%;
    font-size: 1rem;
    letter-spacing: 0.2px;
    line-height: 25px;
    list-style: none;
    margin: 0;
    padding: 0 1rem;
    background: var(--white);
    // box shadow only bottom
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
    text-align: start;
    ul {
      li {
        list-style: none;
        margin: 5px 0;
        &:hover {
          color: var(--primary);
        }
        ._link {
          color: var(--black);
          cursor: pointer;
          font-size: 1.1rem;
          letter-spacing: -0.5px;
          &:hover {
            letter-spacing: 0px;
          }
        }
      }
    }
  }
}
._nav-burger {
  display: block;
  width: 32px;
  height: 32px;
  padding: 0;
}
/*
._nav img:hover ~ ._nav-actions {
  display: flex;
}*/

@media (min-width: 768px) {
  ._nav {
  }

  ._nav-brand {
    display: block;
    width: 33.33% !important;
    height: auto;
  }

  ._nav-actions {
    display: flex;
    background-color: transparent;
    flex-direction: row;
    max-width: 65%;
    height: 100%;
  }
  ._nav-actions::after {
    display: none;
  }
  ._nav-actions-search {
    width: 33.33%;
    margin: 0 auto;
  }

  ._nav-actions-links {
    width: 33.33%;
  }
  ._nav-burger {
    display: none !important;
  }
  ._link {
    font-size: 1rem;
  }
  ._nav-actions-links-items {
    position: absolute;
    top: 50px;
    right: 3rem;
    padding: 0 15px;
    text-align: start;
    max-width: 250px;
    border-radius: 5px !important;
  }
}
</style>
