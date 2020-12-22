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
  </div>
</template>

<script>
export default {
  props: {
    beerName: String,
    beerId: Number,
    beerImgUrl: String,
    loadingBeer: Boolean,
  },
  methods: {
    fetchBeer() {
      this.$emit('fetchBeer')
    },
  },
}
</script>

<style scoped>
.random-beer-card {
  background-color: #eee;
  cursor: default;
  display: flex;
  flex-direction: column;
  height: 21.2rem;
  margin: 1rem;
  width: 13.5rem;
  padding: 0.5rem;
}

.opaque {
  opacity: 0.5;
}

.random-beer-image-container {
  align-items: center;
  background-color: #53adab;
  display: flex;
  height: 11.2rem;
  justify-content: center;
  opacity: 0.95;
  width: 12.5rem;
}

.random-beer-image-container:hover {
  opacity: 1;
}

.random-beer-image {
  height: 9.5rem;
}

.random-beer-card h2 {
  font-family: 'Yanone Kaffeesatz', sans-serif;
  font-size: 1.8rem;
  min-height: 5rem;
  margin-top: 1rem;
  /* margin-right: auto; */
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
