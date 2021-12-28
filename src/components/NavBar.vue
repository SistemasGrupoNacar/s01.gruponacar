<template>
  <nav class="nav">
    <img
      :src="require('@/assets/icons/menus.png')"
      alt="burger-menu-icon"
      class="nav-burger"
      ref="burger"
      v-on:click="cambiarEstadoElementosMenu"
    />
    <div class="user-info" v-show="mostrarElementosMenu">
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
          direccion: "/movimientos",
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
          ],
        },
        {
          direccion: "/perfil",
          nombre: "Perfil",
          poseeDerivaciones: false,
        },
      ],
    };
  },
  methods: {
    obtenerUsuario() {
      return "Javier Morales";
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
  },
  watch: {
    $route() {
      const urlCortada = this.$route.path.split("/");
      if (urlCortada.length >= 2) {
        this.rutaActual = urlCortada[0] + "/" + urlCortada[1];
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
}

.nav-burger {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.user-info {
  margin: 0 auto;
  cursor: pointer;
}

.elements {
  width: 100%;
}

.active {
  text-decoration-line: underline;
  text-decoration-style: wavy;
  text-underline-position: under;
  text-decoration-color: var(--color-primary);
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
}

.link {
  display: block;
  font-size: 0.9rem;

  &:hover div {
    display: block;
  }
}

.link-dropdown {
  display: block;
  font-weight: 500;
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
  }
  .user-info {
    display: block;
    margin: 0;
  }
  .elements {
    width: auto;
  }
  .link {
    display: inline-block;
    margin: 0 5px;
  }
  .link-dropdown {
    margin: 5px 0;
  }
}

/* Large devices (desktops, 992px and up)*/
@media (min-width: 992px) {
}

/* Extra large devices (large desktops, 1200px and up)*/
@media (min-width: 1200px) {
}
</style>
