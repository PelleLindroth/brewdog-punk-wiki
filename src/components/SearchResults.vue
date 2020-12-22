<template>
  <div class="search-results-view">
    <div class="search-results-container">
      <div class="nav-left">
        <img
          v-if="page > 1"
          src="../assets/large-arrow-left.svg"
          alt="Arrow pointing left"
          @click="previousPage"
        />
      </div>
      <div class="search-results">
        <ul class="results-list">
          <BeerCardSmall
            v-for="beer in searchResults"
            :key="beer.id"
            :beerName="beer.name"
            :beerId="beer.id"
            :beerImgUrl="
              beer.image_url
                ? beer.image_url
                : require('../assets/no_image.svg')
            "
            :loadingBeer="beer.loadingBeer"
          />
        </ul>
      </div>
      <div class="nav-right">
        <img
          v-if="searchResults.length > 9"
          src="../assets/large-arrow-right.svg"
          alt="Arrow pointing right"
          @click="nextPage"
        />
      </div>
    </div>
    <button @click="backToForm">BACK TO SEARCH</button>
  </div>
</template>

<script>
import BeerCardSmall from './BeerCardSmall'

export default {
  components: {
    BeerCardSmall,
  },
  methods: {
    backToForm() {
      this.$emit('backToForm')
    },
    previousPage() {
      this.$emit('previousPage')
    },
    nextPage() {
      this.$emit('nextPage')
    },
  },
  props: {
    page: Number,
    searchResults: Array,
  },
}
</script>

<style lang="scss" scoped>
.search-results-view {
  grid-column: 3 / span 8;
  grid-row: 3 / span 7;
  display: flex;
  flex-direction: column;
}

.search-results-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-results {
  min-width: 79.6rem;
}

.nav-left,
.nav-right {
  align-self: center;
  cursor: pointer;
  min-width: 4rem;
}

.results-list {
  align-items: space-between;
  display: flex;
  justify-content: center;
  list-style: none;
  flex-wrap: wrap;
  min-width: 79.6rem;
}

button {
  background-color: #3298af;
  border: none;
  box-shadow: 0 4px 15px -4px rgba(0, 0, 0, 0.25);
  color: white;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  min-height: 4.1rem;
  margin: 1rem auto;
  outline: none;
  width: 21.2rem;
}
</style>
