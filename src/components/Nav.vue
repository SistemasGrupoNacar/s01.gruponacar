<template>
  <div class="dropdown">
    <input type="checkbox" id="dropdown" />

    <label class="dropdown__face" for="dropdown">
      <div class="dropdown__text">Sub menu</div>

      <div class="dropdown__arrow"></div>
    </label>

    <ul class="dropdown__items">
      <li>Producciones</li>
      <li>Perfil</li>
      <li>Herramientas</li>
    </ul>
  </div>

  <svg>
    <filter id="goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
        result="goo"
      />
      <feBlend in="SourceGraphic" in2="goo" />
    </filter>
  </svg>
</template>
<script>
export default {};
</script>
<style lang="scss">
.dropdown {
  position: relative;
  width: 230px;
  filter: url(#goo);

  &__face,
  &__items {
    background-color: #fff;
    padding: 5px 15px;
    border-radius: 1px;
  }

  &__face {
    display: block;
    position: relative;
  }

  &__items {
    margin: 0;
    position: absolute;
    right: 0;
    top: 50%;
    width: 100%;
    list-style: none;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    visibility: hidden;
    z-index: -1;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.93, 0.88, 0.1, 0.8);

    &::before {
      content: "";
      background-color: #fff;
      position: absolute;
      bottom: 100%;
      right: 20%;
      height: 40px;
      width: 20px;
    }
  }

  &__arrow {
    border-bottom: 2px solid #000;
    border-right: 2px solid #000;
    position: absolute;
    top: 50%;
    right: 30px;
    width: 10px;
    height: 10px;
    transform: rotate(45deg) translateY(-50%);
    transform-origin: right;
  }

  input {
    display: none;

    &:checked ~ .dropdown__items {
      top: calc(100% + 25px);
      visibility: visible;
      opacity: 1;
    }
  }
}

body {
  background-image: linear-gradient(140deg, #e2e2e2, #cdcdcd);
  display: grid;
  place-items: center;
  font-family: "Lato", Arial, sans-serif;
  height: 100vh;
  margin: 0;
}

* {
  box-sizing: border-box;
}

svg {
  display: none;
}
</style>
