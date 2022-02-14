<template>
  <nav class="_nav">
    <div class="_nav-brand h-100 _w-25">
      <img :src="require('@/assets/illustrations/options.svg')" alt="Logo" />
      <span>Texto extra</span>
    </div>
    <div
      class="_nav-options"
      :class="{
        '_nav-options-show': mostrarElementosMenu,
      }"
    >
      <ul>
        <router-link
          class="_nav-item"
          v-for="(item, index) in rutas"
          :key="index"
          :to="item.direccion"
        >
          {{ item.nombre }}
          <ul class="position-absolute d-none">
            <li class="position-absolute top-0 right0">asdasdasd</li>
          </ul>
        </router-link>
      </ul>
    </div>
    <div class="_nav-burger">
      <img
        :src="require('@/assets/icons/menus.png')"
        alt="burger-menu-icon"
        class="nav-burger"
        ref="burger"
        v-on:click="cambiarEstadoElementosMenu"
      />
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      mostrarElementosMenu: true,
      rutas: [
        {
          direccion: "/",
          nombre: "Inicio",
          poseeDerivaciones: false,
        },
        {
          direccion: "",
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
          poseeDerivaciones: false,
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
    cambiarEstadoElementosMenu() {
      this.mostrarElementosMenu = !this.mostrarElementosMenu;
    },
  },
};
</script>
<style lang="scss">
._nav {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 7vh;
}
._nav-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  font-size: 1.2rem;
  font-weight: bold;
  color: #000;
  height: 100%;
  margin: 12px 0px;
  background: rebeccapurple;
}
._nav-options {
  display: none;
  text-align: start;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  ul {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0;
    margin: 0;
    ._nav-item {
      display: block;
      text-align: start;
      list-style: none;
      padding: 0.5rem 0;
      font-size: 1rem;
      transition: 0.5s ease;
      text-decoration: none;
      color: var(--gray);
      &:hover {
        color: var(--color-primary) !important;
      }
    }
  }
}
._nav-options-show {
  display: flex;
}
.nav-burger {
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 10px;
  visibility: visible;
}
@media (min-width: 768px) {
  ._nav {
    flex-direction: row;
    min-height: 10vh;
  }
  .nav-burger {
    visibility: hidden !important;
  }
  ._nav-options {
    visibility: visible;
    min-width: 50%;
    ul {
      flex-direction: row;
      justify-content: center;
      align-items: center;
      ._nav-item {
        margin: 0;
        padding: 5px 8px !important;
        font-size: 1rem;
      }
    }
  }
}
</style>
