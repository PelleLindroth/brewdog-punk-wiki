<template>
  <div class="advanced-search-view">
    <SearchForm v-if="!showResults" @search="advancedSearch" />
    <SearchResults
      v-if="showResults"
      :page="page"
      :searchResults="this.$root.searchResults"
      @previousPage="previousPage"
      @nextPage="nextPage"
      @backToForm="showResults = false"
    />
  </div>
</template>

<script>
import SearchForm from '../components/SearchForm'
import SearchResults from '../components/SearchResults'

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name == 'Beer-Info') {
        vm.showResults = true
        let params = vm.$root.getParams()
        vm.searchParams = params.search
        vm.page = params.page
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    console.log(to.name)
    if (to.name == 'Beer-Info') {
      this.cacheParams()
    }
    next()
  },
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
    cacheParams() {
      this.$root.setParams({ search: this.searchParams, page: this.page })
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
