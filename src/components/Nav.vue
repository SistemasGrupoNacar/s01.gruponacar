<template>
  <nav class="_nav">
    <div class=""><span class="_bold">Grupo NACAR</span></div>
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
          reserve-keyword
          placeholder="Escriba ruta a buscar"
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
      <div class="my-3 my-md-0 p-0 d-flex align-items-center position-relative">
        <img
          v-if="!isMobile"
          :src="require('@/assets/illustrations/options-vertical.svg')"
          alt="Opciones"
        />
        <ul class="" v-show="isMobile" >
          <li>Primer</li>
          <li>Segundo</li>
          <li>Tercero</li>
          <li>Cuarto</li>
          <li>Quinto</li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
//import { Search } from "@element-plus/icons-vue";
export default {
  components: {
    //Search,
  },
  data() {
    return {
      cargando: false,
      imagen: require("@/assets/illustrations/flecha-abajo.svg"),
      isMobile: true,
      rutaSeleccionada: "",
      mostrarMenu: false,
      rutas: [
        {
          nombre: "Panel de control",
          url: "/",
          grupo: "",
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
          url: "/movimientos/extras",
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
          nombre: "Perfil",
          url: "/perfil",
          grupo: "Usuario",
          palabras: ["perfil", "perfiles", "cuenta", "cuentas", "yo"],
        },
        {
          nombre: "Cambiar contraseña",
          url: "/perfil/cambiar-contrasena",
          grupo: "Usuario",
          palabras: [
            "contraseña",
            "contraseñas",
            "cambiar",
            "cambiar contraseña",
          ],
        },
      ],
      rutasCoincidentes: [],
    };
  },
  created() {
    // Verificar si se mira desde telefono
    if (window.innerWidth >= 768) {
      this.mostrarMenu = true;
      this.isMobile = false;
    }
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
  height: 10vh;
  padding: 0 2rem;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  position: relative;
}

._nav-actions {
  display: flex;
  position: absolute;
  top: 10vh;
  right: 0;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--white);
  padding: 1rem;
  z-index: 99;
  height: auto;
}

._nav-actions-search {
  width: 100%;
  margin: 0 auto;
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

  ._nav-actions {
    display: flex;
    position: unset;
    background-color: transparent;
    flex-direction: row;
    min-width: 65%;
    height: 100%;
  }
  ._nav-actions::after {
    display: none;
  }
  ._nav-actions-search {
    width: 60%;
    margin: 0 auto;
  }

  ._nav-burger {
    display: none !important;
  }
}
</style>
