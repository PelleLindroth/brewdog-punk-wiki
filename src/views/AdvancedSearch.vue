<template>
  <div class="advanced-search-view">
    <SearchForm v-if="!showResults" @search="advancedSearch" />
    <SearchResults
      v-if="showResults"
      :page="page"
      :searchResults="this.$root.searchResults"
      @previousPage="previousPage"
      @nextPage="nextPage"
    />
  </div>
</template>

<script>
import SearchForm from '../components/SearchForm'
import SearchResults from '../components/SearchResults'

export default {
  components: {
    SearchForm,
    SearchResults,
  },
  data() {
    return {
      page: 1,
      searchParams: '',
      showResults: false,
    }
  },
  methods: {
    async advancedSearch(searchObject) {
      this.searchParams = ''

      for (let [query, value] of Object.entries(searchObject)) {
        if (value) {
          this.searchParams += `${query}=${value}&`
        }
      }
      await this.$root.fetchBeers(this.page, this.searchParams.slice(0, -1))
      this.showResults = true
    },
    async previousPage() {
      this.page--
      await this.$root.fetchBeers(this.page, this.searchParams.slice(0, -1))
    },
    async nextPage() {
      this.page++
      await this.$root.fetchBeers(this.page, this.searchParams.slice(0, -1))
    },
  },
}
</script>

<style scoped>
.advanced-search-view {
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
