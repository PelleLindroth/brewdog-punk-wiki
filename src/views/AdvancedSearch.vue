<template>
  <div class="advanced-search-view">
    <SearchForm
      v-if="!showResults"
      :params="params"
      @clearForm="clearSearchObject"
      @search="advancedSearch"
    />
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
    if (to.name == 'Beer-Info') {
      this.cacheParams()
    }
    next()
  },
  components: {
    SearchForm,
    SearchResults,
  },
  computed: {
    params() {
      return this.$root.getSearchObject()
    },
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
      this.$root.setSearchObject(searchObject)

      for (let [query, value] of Object.entries(searchObject)) {
        if (value) {
          this.searchParams += `${query}=${value}&`
        }
      }

      if (this.searchParams != this.$root.tempParams) {
        this.page = 1
      }

      await this.$root.fetchBeers(this.page, this.searchParams.slice(0, -1))
      this.showResults = true
    },
    cacheParams() {
      this.$root.setParams({ search: this.searchParams, page: this.page })
    },
    clearSearchObject() {
      this.$root.clearSearchObject()
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

<style lang="scss" scoped>
$mobile-cutoff: 650px;

.advanced-search-view {
  grid-column: 1 / span 12;
  grid-row: 1 / span 10;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(auto-fill, 64px);
  height: 100%;
  margin: auto;

  @media screen and (max-width: $mobile-cutoff) {
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(auto-fill, 32px);
  }
}
</style>
