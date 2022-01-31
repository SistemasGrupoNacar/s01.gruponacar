<template>
  <nav class="nav">
    <img
      :src="require('@/assets/icons/menus.png')"
      alt="burger-menu-icon"
      class="nav-burger"
      ref="burger"
      v-on:click="cambiarEstadoElementosMenu"
    />
    <div class="user-info">
      <span class="_semi-bold" v-if="obtenerUsuario() != null">
        {{ obtenerUsuario() }}
      </span>
      <p class="text-muted" v-else>G-NACAR</p>
    </div>
    <div class="elements" v-show="mostrarElementosMenu">
      <router-link
        v-for="(item, index) in rutas"
        :key="index"
        class="link _semi-bold _link"
        :to="item.direccion"
        :class="{ active: item.direccion == rutaActual }"
        v-on:click="cambiarEstadoElementosMenu()"
        >{{ item.nombre }}
        <div class="_dropdown" v-if="item.poseeDerivaciones">
          <router-link
            v-for="(itemDerivacion, index) in item.derivaciones"
            :key="index"
            :to="itemDerivacion.direccion"
            class="link-dropdown _link"
            >{{ itemDerivacion.nombre }}</router-link
          >
        </div>
      </router-link>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      mostrarElementosMenu: false,
      rutaActual: "",
      rutas: [
        {
          direccion: "/",
          nombre: "Inicio",
          poseeDerivaciones: false,
        },
        {
          direccion: "/inventario",
          nombre: "Inventario",
          poseeDerivaciones: true,
          derivaciones: [
            {
              direccion: "/inventario/productos",
              nombre: "Productos",
            },
            {
              direccion: "/inventario/insumos",
              nombre: "Insumos",
            },
          ],
        },
        {
          direccion: "",
          nombre: "Movimientos",
          poseeDerivaciones: true,
          derivaciones: [
            {
              direccion: "/movimientos/ingresos",
              nombre: "Ingresos",
            },
            {
              direccion: "/movimientos/egresos",
              nombre: "Egresos",
            },
            {
              direccion: "/movimientos/ventas",
              nombre: "Ventas",
            },
            {
              direccion: "/movimientos/extra",
              nombre: "Extras",
            },
          ],
        },
        {
          direccion: "/producciones",
          nombre: "Producciones",
          poseeDerivaciones: true,
          derivaciones: [
            {
              direccion: "/producciones/detalle",
              nombre: "Detalle",
            },
          ],
        },
      ],
    };
  },
  methods: {
    obtenerUsuario() {
      return "Grupo NACAR";
    },
    cambiarEstadoElementosMenu() {
      if (window.innerWidth < 768) {
        this.mostrarElementosMenu = !this.mostrarElementosMenu;
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      // verificar si se mira desde telefono o computadora
      if (window.innerWidth >= 768) {
        this.mostrarElementosMenu = true;
      }
    });
    // Modificar $route
    this.rutaActual = this.$route.path;
  },
  watch: {
    $route() {
      const urlCortada = this.$route.path.split("/");
      if (urlCortada.length >= 2) {
        this.rutaActual = urlCortada[0] + "/" + urlCortada[1];
      } else if (this.$router.path == "") {
        this.rutaActual = "/";
      } else {
        this.rutaActual = this.$route.path;
      }
    },

    // Watcher de ruta actual
    rutaActual() {
      const urlCortada = this.$route.path.split("/");
      if (urlCortada.length >= 2) {
        this.rutaActual = urlCortada[0] + "/" + urlCortada[1];
      } else if (this.$router.path == "") {
        this.rutaActual = "/";
      } else {
        this.rutaActual = this.$route.path;
      }
    },
  },
};
</script>
<style lang="scss">
.nav {
  padding: 15px 5%;
  // can not select text
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  // Agregar sombra al final
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.nav-burger {
  display: block;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.user-info {
  margin: 0 auto;
  cursor: pointer;
  font-size: 1.3rem;
}

.elements {
  width: 100%;
}

.active {
  color: var(--color-primary) !important;
}

._dropdown {
  display: block;
  position: relative;
  margin: 0;
  margin-left: 1rem;
  width: auto;
  background: var(--white);
  border-radius: 5px;
  padding: 0;
  z-index: 99;
}

.link {
  display: block;
  font-size: 1.1rem;
  margin: 10px 0;

  &:hover div {
    display: block;
  }
}

.link-dropdown {
  display: block;
  font-weight: 500;
  margin: 10px 0;
  text-decoration: transparent !important;
}

.link-dropdown:hover {
  letter-spacing: 0.3px;
}
/* Medium devices (tablets, 768px and up)*/
@media (min-width: 768px) {
  .nav-burger {
    display: none;
  }
  ._dropdown {
    display: none;
    position: absolute;
    width: 200px;
    text-align: center;
    margin: 0;
    background: var(--dark-white);
  }
  .nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 15px 10%;
    height: 75px;
    align-items: center;
  }
  .user-info {
    display: block;
    margin: 0;
    font-size: 1.2rem;
  }
  .elements {
    width: auto;
  }
  .link {
    display: inline-block;
    margin: 8px;
    font-size: 0.9rem;
  }
  .link-dropdown {
    margin: 12px 0px;
  }
  .active {
    text-decoration-color: var(--color-primary);
  }
}

/* Large devices (desktops, 992px and up)*/
@media (min-width: 992px) {
}

/* Extra large devices (large desktops, 1200px and up)*/
@media (min-width: 1200px) {
}
</style>
