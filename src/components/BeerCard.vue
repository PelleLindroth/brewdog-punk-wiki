<template>
  <div class="random-beer-card" :class="{ opaque: loadingBeer }">
    <router-link
      :to="`/beer-info/${beerId}`"
      class="random-beer-image-container"
      title="Learn more"
    >
      <div v-show="loadingBeer" class="lds-ripple">
        <div></div>
        <div></div>
      </div>
      <img
        v-show="!loadingBeer"
        :src="beerImgUrl"
        :alt="`A bottle of ${beerName}`"
        class="random-beer-image"
      />
    </router-link>
    <h2>{{ beerName }}</h2>
    <button
      v-show="randomButton"
      class="new-random-beer-button"
      @click="fetchBeer"
    >
      One more please
    </button>
  </div>
</template>

<script>
export default {
  props: {
    beerName: String,
    beerId: Number,
    beerImgUrl: String,
    loadingBeer: Boolean,
    randomButton: Boolean,
  },
  methods: {
    fetchBeer() {
      this.$emit('fetchBeer')
    },
  },
}
</script>

<style lang="scss" scoped>
$mobile-cutoff: 650px;

.random-beer-card {
  background-color: #eee;
  cursor: default;
  display: flex;
  flex-direction: column;
  grid-column: 6 / span 2;
  grid-row: 2 / span 6;
  height: 38rem;
  margin-left: -1rem;
  width: 21.2rem;
  padding: 1rem;

  @media screen and (max-width: $mobile-cutoff) {
    box-shadow: 0 4px 4px -4px rgba(0, 0, 0, 0.5);
    height: 34rem;
    margin: 0;
    place-self: center;
    grid-row: 5;
  }
}

.opaque {
  opacity: 0.5;
}

.random-beer-image-container {
  align-items: center;
  background-color: #53adab;
  display: flex;
  height: 19.2rem;
  justify-content: center;
  opacity: 0.95;
  width: 19.2rem;
}

.random-beer-image-container:hover {
  opacity: 1;
}

.random-beer-image {
  height: 16rem;
}

.random-beer-card h2 {
  font-family: 'Yanone Kaffeesatz', sans-serif;
  font-size: 2.4rem;
  min-height: 5rem;
  margin-top: 1rem;
}

.random-beer-info-link {
  align-self: center;
  align-items: center;
  cursor: pointer;
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-size: 1.4rem;
  margin-top: auto;
}

.new-random-beer-button {
  align-items: center;
  background-color: #3298af;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-size: 1.3rem;
  font-weight: 500;
  height: 4.4rem;
  justify-content: center;
  margin-top: auto;
  outline: none;
  width: 19.2rem;
}

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>
