<template>
  <div id="app">
    <header>
      <router-link class="home-logo" to="/">
        <HomeLogo />
      </router-link>
      <QuickSearch
        v-show="this.$route.path == '/'"
        :searchInput="this.$root.searchInput"
      />
    </header>

    <transition name="slide" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import HomeLogo from './components/HomeLogo'
import QuickSearch from './components/QuickSearch'

export default {
  components: {
    HomeLogo,
    QuickSearch,
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&family=Yanone+Kaffeesatz:wght@300;400;700&display=swap');
$mobile-cutoff: 650px;

:root {
  font-size: 10px;
}

body {
  background-color: #3298af;
  font-family: 'Roboto', sans-serif;
  height: 100vh;
  margin: 0;
  overflow: scroll;

  @media screen and (max-width: $mobile-cutoff) {
    padding: 0;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
}

#app {
  background-image: url('./assets/background-image.png');
  min-height: 100vh;
  margin: auto;
  max-width: 1200px;
  min-width: 750px;
  padding: 0 2rem;

  @media screen and (max-width: $mobile-cutoff) {
    background-image: url('./assets/background-image-mobile.png');
    background-repeat: no-repeat;
    background-size: 100vw;
    padding: 0 1rem;
    width: 100%;
    margin: 0;
    max-width: 100vw;
    min-width: 0;
  }

  header {
    align-items: center;
    display: flex;
    padding: 1.5rem 0;
    justify-content: space-between;

    @media screen and (max-width: $mobile-cutoff) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    }

    .home-logo {
      cursor: pointer;

      img {
        max-width: 5rem;

        @media screen and (max-width: $mobile-cutoff) {
          max-width: 3.5rem;
        }
      }
    }

    h2 {
      color: #fff;
    }
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: opacity 0.1s;
  }

  .slide-leave-to,
  .slide-enter {
    opacity: 0;
  }
}
</style>
