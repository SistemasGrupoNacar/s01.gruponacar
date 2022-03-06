<template>
  <nav class="_nav">
    <div class="_nav-brand"></div>
    <div class="_nav-burger">
      <img :src="imgMenu" alt="icono de opciones" />
    </div>
    <div class="_nav-search">
      <el-input
        class=""
        placeholder="Ingrese secci&oacute;n que desea visitar"
      ></el-input>
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
      <p class="my-0" v-for="(item, index) in rutas" :key="index">
        <router-link :to="item.url">{{ item.nombre }}</router-link>
      </p>
    </div>
  </nav>
</template>
<script>
import imgMenu from "@/assets/illustrations/Menu.svg";
import imgPlus from "@/assets/illustrations/Plus.svg";
import imgOptionsVertical from "@/assets/illustrations/options-vertical.svg";
import imgClose from "@/assets/illustrations/close.svg";

export default {
  data() {
    return {
      images: {
        imgMenu,
        imgPlus,
        imgOptionsVertical,
        imgClose,
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
          grupo: "Usuario",
          palabras: ["perfil", "perfiles", "cuenta", "cuentas", "yo"],
        },
      ],
    };
  },
  methods: {
    navOptionsSwitcher() {
      // Verifica si esta abierto el menu de opciones
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
  },
};
</script>
<style lang="scss">
._nav {
  height: 60px;
  background-color: var(--white);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  position: relative;
  padding: 10px 15px;
}

._nav-burger {
  display: block;
}

._nav-search {
  flex: 1;
  padding: 10px 20px;
}

//Icono
._icon {
  width: 28px;
  height: 28px;
}

@media screen and (min-width: 768px) {
  ._nav {
  }

  ._nav-burger {
    display: none;
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
    transition: all 0.3s ease-in-out;
    border-radius: 5px;
    min-width: 250px;
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
  ._nav-options-activator-active {
    transform: rotate(180deg);
    background-color: var(--dark-white);
  }
}
</style>
