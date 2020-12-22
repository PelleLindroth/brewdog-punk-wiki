<template>
  <div id="app">
    <router-link class="home-logo" to="/">
      <HomeLogo />
    </router-link>
    <transition name="slide" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import HomeLogo from './components/HomeLogo'

export default {
  components: {
    HomeLogo,
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&family=Yanone+Kaffeesatz:wght@300;400;700&display=swap');

:root {
  font-size: 10px;
}

body {
  background-color: #3298af;
  font-family: 'Roboto', sans-serif;
  height: 100vh;
  margin: 0;
  overflow: hidden;
  padding: 0 2rem;

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
}

#app {
  background-image: url('./assets/background-image.png');
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 3rem repeat(auto-fill, 64px);
  min-height: 100%;
  margin: auto;
  max-width: 1200px;
  min-width: 750px;

  .home-logo {
    cursor: pointer;
    grid-column: 1;
    grid-row: 2;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: opacity 0.2s;
  }

  .slide-leave-to,
  .slide-enter {
    opacity: 0;
  }
}
</style>
