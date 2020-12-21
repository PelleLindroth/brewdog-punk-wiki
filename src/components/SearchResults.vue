<template>
  <div class="search-results-wrapper">
    <div class="nav-left">
      <img
        v-if="page > 1"
        src="../assets/large-arrow-left.svg"
        alt="Arrow pointing left"
        @click="previousPage"
      />
    </div>
    <div class="search-results-container">
      <ul class="results-list">
        <li class="beer-card" v-for="result in searchResults" :key="result.id">
          {{ result.name }}
        </li>
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
</template>

<script>
export default {
  methods: {
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

<style scoped>
.search-results-wrapper {
  grid-column: 3 / span 8;
  grid-row: 3 / span 7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-results-container {
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

.beer-card {
  background-color: #eee;
  cursor: default;
  display: flex;
  flex-direction: column;
  height: 21.2rem;
  margin: 0.5rem;
  width: 13.5rem;
  padding: 1rem;
}
</style>
