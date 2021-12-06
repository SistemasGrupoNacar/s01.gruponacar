<template>
  <nav class="_navbar">
    <div class="_navbar-burguer" v-on:click="changeShowItemsContainerNav">
      <svg
        aria-hidden="true"
        height="24"
        viewBox="0 0 16 16"
        version="1.1"
        width="24"
        data-view-component="true"
        class="_navbar-burguer-icon"
      >
        <path
          fill-rule="evenodd"
          d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 100 1.5h12.5a.75.75 0 100-1.5H1.75z"
        ></path>
      </svg>
    </div>
    <div class="_navbar-brand" v-on:click="goHome()">Grupo Nacar</div>
    <div class="_navbar-menu" v-if="showItemsContainerNav">
      <div
        class="_navbar-items"
        v-for="(item, index) in routerElements"
        :key="index"
        v-on:click="verifyAndCloseItemsContainerNav()"
      >
        <router-link v :to="item.path" class="_navbar-link">{{
          item.text
        }}</router-link>
      </div>
    </div>
    <div class="_navbar-profile">
      <img
        :src="require('@/assets/icons/profile-user.png')"
        class="_navbar-profile-icon"
        alt="profile user"
        v-on:click="goProfile()"
      />
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      showItemsContainerNav: false,
      routerElements: [
        { path: "/", text: "Info General" },
        {
          path: "/moves",
          text: "Movimientos",
        },
        { path: "/inventory", text: "Inventario" },
        { path: "/control", text: "Control" },
      ],
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    if (window.innerWidth >= 768) {
      this.showItemsContainerNav = true;
    }
    //this.getDataSession();
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    goProfile() {
      this.$router.push("/profile");
    },
    verifyAndCloseItemsContainerNav() {
      window.innerWidth < 768
        ? (this.showItemsContainerNav = false)
        : (this.showItemsContainerNav = true);
    },
    changeShowItemsContainerNav() {
      this.showItemsContainerNav = !this.showItemsContainerNav;
    },
  },
};
</script>
<style lang="scss">
@import "./../assets/css/components/NavComponent.css";
</style>
