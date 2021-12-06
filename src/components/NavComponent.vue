<template>
  <header class="header" :class="{ 'navbar--hidden': !showNavbar }">
    <div class="burguer-container-nav" v-on:click="changeShowItemsContainerNav">
      <svg
        aria-hidden="true"
        height="24"
        viewBox="0 0 16 16"
        version="1.1"
        width="24"
        data-view-component="true"
        class="burguer-icon-nav"
      >
        <path
          fill-rule="evenodd"
          d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 100 1.5h12.5a.75.75 0 100-1.5H1.75z"
        ></path>
      </svg>
    </div>
    <div class="icon-container-nav">  
      <span class="icon-text"
        >Grupo NACAR <span class="icon-text-accent">admin</span></span
      >
    </div>

    <div class="items-container-nav" v-if="showItemsContainerNav">
      <div
        class="item-nav"
        v-for="(item, index) in routerElements"
        :key="index"
        v-on:click="verifyAndCloseItemsContainerNav()"
      >
        <router-link v :to="item.path" class="item-link-nav">{{
          item.text
        }}</router-link>
      </div>
    </div>
    <div class="session-container-nav">
      <router-link to="profile" class="session-logged-container">
        <div class="profile-lyrics-container">
          <span>{{ /*getLyricsFromCookies() */}}</span>
        </div>
      </router-link>
    </div>
  </header>
</template>
<script>
//import tokenActions from "@/scripts/tokenActions.js";
export default {
  data() {
    return {
      currentSelected: "",
      showNavbar: true,
      lastScrollPosition: 0,
      showItemsContainerNav: false,
      routerElements: [
        { path: "/", text: "Info General" },
        { path: "/sales", text: "Ventas" },
        { path: "/inventory", text: "Inventario" },
        { path: "/control", text: "Control" },
      ],
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    if (window.innerWidth > 600) {
      this.showItemsContainerNav = true;
    }
    //this.getDataSession();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    changeShowItemsContainerNav() {
      this.showItemsContainerNav = !this.showItemsContainerNav;
    },
    verifyAndCloseItemsContainerNav() {
      window.innerWidth < 600
        ? (this.showItemsContainerNav = false)
        : (this.showItemsContainerNav = true);
    } /*
    async getDataSession() {
      this.stateLoggedSession = await tokenActions.verifyExistingToken();
    },
    getLyricsFromCookies() {
      return this.$cookies.get("userLyrics");
    }*/,

    onScroll() {
      // Get the current scroll position
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
      if (currentScrollPosition < 0) {
        return;
      }
      // Here we determine whether we need to show or hide the navbar
      this.showNavbar = currentScrollPosition < this.lastScrollPosition; // Set the current scroll position as the last scroll position
      this.lastScrollPosition = currentScrollPosition;
    },
  },
};
</script>
<style lang="scss">
//@import "./../assets/css/views/LoginView.css";
//header general
.header {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  background-color: var(--main-bg);
  height: 10vh;
  transform: translate3d(0, 0, 0);
  transition: 0.2s all ease-out;
  z-index: 100;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
}
//hide navbar

.header.navbar--hidden {
  transform: translate3d(0, 100%, 0);
}
//icon container and icon Nav
.icon-container-nav {
  height: calc(100% - 25px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-nav {
  display: none;
  height: 100%;
}

.icon-text {
  display: none;
  font-size: 1.2rem;
  font-weight: 700;
}
.icon-text-accent {
  color: var(--primary);
  font-weight: 200;
}
//burguer container nav

.burguer-container-nav {
  display: flex;
  align-items: center;
  height: 100%;
}
.burguer-icon-nav {
  display: block;
}

//items container nav and items

.items-container-nav {
  display: block;
  text-align: center;
  position: absolute;
  bottom: calc(10vh + 1px);
  left: 0;
  width: 100% !important;
  background: var(--main-bg);
}
.item-nav {
  padding: 10px 0px;
}
.item-link-nav {
  outline: none;
  text-decoration: none;
  transition: 0.2s linear;
  font-weight: 600;
  letter-spacing: 0.3px;
  color: var(--black);
  &:hover {
    color: var(--primary);
  }
}

//session container nav
.session-container-nav {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: calc(100% - 15px);
}

.session-picture-nav {
  display: block;
  border-radius: 50%;
  height: 60%;
}
.session-logged-container {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  text-decoration: none !important;
}

.session-picture-nav-logged {
  border-radius: 50%;
  height: 60%;
}

.session-login-container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: calc(100% - 15px);
  cursor: pointer;
}

.session-loggin-text {
  display: none;
  margin: auto 1rem;
}

//lyrics container
.profile-lyrics-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1vh;
  text-align: center;
  transition: 0.2s linear;
  min-width: 5vw;
  span {
    color: var(--primary);
    font-weight: 800;
    outline: none;
    text-decoration: none;
    font-size: 1rem;
    transition: 0.2s linear;
    border-bottom: 1px solid var(--primary);
    &:hover {
      color: black;
      font-size: 1.2rem;
      letter-spacing: 3px;
    }
  }
}

@media only screen and (min-width: 600px) {
  
  .icon-nav {
    display: block;
  }

  .icon-text {
    display: block;
  }

  .items-container-nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100% !important;
    align-items: center;
    position: relative;
    flex-direction: column;
    top: 0;
    left: 0;
    height: calc(100% - 15px);
  }
  .item-nav {
    padding: 10px 0px;
    border-top: none;
  }

  .burguer-container-nav {
    display: none;
  }
  .session-loggin-text {
    display: block;
  }
  .session-picture-nav {
    display: hidden;
  }
}
</style>
