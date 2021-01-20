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
      <nav class="mobile-nav">
        <div class="nav-button-container">
          <button v-show="page > 1" @click="previousPage" class="previous">
            PREVIOUS
          </button>
        </div>
        <div class="nav-button-container">
          <button
            v-show="searchResults.length > 9"
            @click="nextPage"
            class="next"
          >
            NEXT
          </button>
        </div>
      </nav>
      <ul class="results-list">
        <BeerCardSmall
          v-for="beer in searchResults"
          :key="beer.id"
          :beerName="beer.name"
          :beerId="beer.id"
          :beerImgUrl="
            beer.image_url ? beer.image_url : require('../assets/no_image.svg')
          "
          :loadingBeer="beer.loadingBeer"
        />
      </ul>
      <div class="nav-right">
        <img
          v-if="searchResults.length > 9"
          src="../assets/large-arrow-right.svg"
          alt="Arrow pointing right"
          @click="nextPage"
        />
      </div>
    </div>
    <button class="back-button" @click="backToForm">BACK TO SEARCH</button>
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
$mobile-cutoff: 650px;

.search-results-view {
  grid-column: 3 / span 8;
  grid-row: 1 / span 7;
  display: flex;
  flex-direction: column;
  margin-top: -1rem;
  min-width: 79.6rem;

  @media screen and (max-width: 650px) {
    grid-column: 1 / span 8;
    min-width: 100%;
  }

  .search-results-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 46.4rem;

    @media screen and (max-width: 650px) {
      flex-direction: column;
      margin-top: 3rem;
      min-height: 0;
    }

    .nav-left,
    .nav-right {
      align-self: center;
      cursor: pointer;
      min-width: 4rem;

      @media screen and (max-width: 650px) {
        display: none;
      }
    }

    .mobile-nav {
      display: none;
      @media screen and (max-width: $mobile-cutoff) {
        display: flex;
        margin: 0 1rem;
        min-width: 100%;

        .nav-button-container {
          min-width: 50%;
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
          min-width: 100%;
          margin: 1rem auto;

          outline: none;
        }
      }
    }

    .results-list {
      align-items: center;
      display: flex;
      justify-content: center;
      list-style: none;
      flex-wrap: wrap;
      min-width: 79.6rem;

      @media screen and (max-width: 650px) {
        flex-direction: column;
        min-width: 100%;
      }
    }
  }
}

.back-button {
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
