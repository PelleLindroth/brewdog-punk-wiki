<template>
  <div class="home-view">
    <QuickSearch :searchInput="this.$root.searchInput" />
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
      @fetchBeer="this.$root.fetchRandomBeer"
    />
  </div>
</template>

<script>
import BeerCard from '../components/BeerCard'
import QuickSearch from '../components/QuickSearch'

export default {
  components: {
    BeerCard,
    QuickSearch,
  },
}
</script>

<style lang="scss" scoped>
.home-view {
  grid-column: 1 / span 12;
  grid-row: 2 / span 10;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(auto-fill, 64px);
  height: 100%;
  margin: auto;
}
</style>
