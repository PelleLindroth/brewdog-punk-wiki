import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  created() {
    this.fetchRandomBeer()
  },
  data() {
    return {
      beers: [],
      currentBeer: {},
      loadingBeer: false,
      quickSearch: {
        page: 1,
        searchInput: '',

      },
      searchResults: [],
      tempParams: {}
    }
  },
  methods: {
    cacheBeers(beers) {
      for (let beer of beers) {
        this.beers.push(beer)
      }

      this.beers = this.beers.filter((beer, pos, arr) => arr.map(mapBeer => mapBeer.id).indexOf(beer.id) === pos)
    },
    async fetchBeers(page, searchPhrase) {
      this.quickSearch.page = page
      let url = ''

      if (!searchPhrase) {
        if (this.quickSearch.searchInput.length > 2) {
          url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=10&beer_name=${this.quickSearch.searchInput}`
        }
      } else {
        url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=10&${searchPhrase}`
      }

      if (localStorage.getItem(url)) {
        this.searchResults = JSON.parse(localStorage.getItem(url))
        this.cacheBeers(this.searchResults)
      } else {
        let res = await fetch(url)
        this.searchResults = await res.json()
        localStorage.setItem(url, JSON.stringify(this.searchResults))
        this.cacheBeers(this.searchResults)
      }
    },
    async fetchRandomBeer() {
      this.loadingBeer = true
      const res = await fetch('https://api.punkapi.com/v2/beers/random')
      let beerArr = await res.json()
      this.currentBeer = beerArr[0]
      this.cacheBeers([this.currentBeer])
      this.loadingBeer = false
    },
    findBeer(id) {
      return this.beers.find(beer => beer.id == id)
    },
    getCurrentBeer() {
      return this.currentBeer
    },
    setParams(params) {
      this.tempParams = params
    },
    getParams() {
      return this.tempParams
    },
    setSearchInput(string) {
      this.quickSearch.searchInput = string

      if (this.quickSearch.searchInput.length == 0) {
        this.searchResults = []
        this.quickSearch.page = 1
      }
    },
  },
  router,
  render: h => h(App)
}).$mount('#app') 
