<template>
  <div class="home-view">
    <BeerCard
      class="beer-card"
      :beerName="this.$root.currentBeer.name"
      :beerId="this.$root.currentBeer.id"
      :beerImgUrl="
        this.$root.currentBeer.image_url
          ? this.$root.currentBeer.image_url
          : require('../assets/no_image.svg')
      "
      :loadingBeer="this.$root.loadingBeer"
      :randomButton="true"
      @fetchBeer="this.$root.fetchRandomBeer"
    />
  </div>
</template>

<script>
import BeerCard from '../components/BeerCard'

export default {
  components: {
    BeerCard,
  },
}
</script>

<style lang="scss" scoped>
.home-view {
  align-items: center;
  display: flex;
  min-height: 80vh;
  justify-content: center;
  margin: auto;
}
</style>
