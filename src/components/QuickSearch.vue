<template>
  <div class="search-container">
    <div class="input-container">
      <input
        class="search-input"
        :placeholder="searchPlaceholder"
        type="text"
        v-model="searchString"
        @keyup="update"
      />
      <img
        src="../assets/close-icon.svg"
        alt="Clear Search"
        class="clear-input"
        title="Clear search"
        @click="clearInput"
      />
    </div>

    <router-link
      to="/advanced-search"
      tag="button"
      class="advanced-search-button"
      title="Search by specifics"
    >
      {{ this.$root.isMobile ? 'SEARCH' : 'Advanced Search' }}
    </router-link>
    <div v-if="searchString.length > 2" class="search-results-container">
      <nav v-if="page > 1" class="next-page-nav">
        <img
          class="arrow-up"
          src="../assets/up-arrow.svg"
          alt="Arrow pointing up"
          title="Next"
          @click="previousPage"
        />
      </nav>
      <ul>
        <router-link
          :to="`/beer-info/${beer.id}`"
          tag="li"
          v-for="beer of searchResults"
          :key="beer.id"
          >{{ beer.name }}</router-link
        >
      </ul>
      <nav v-if="searchResults.length > 9" class="next-page-nav">
        <img
          class="arrow-down"
          src="../assets/down-arrow.svg"
          alt="Arrow pointing down"
          title="Next"
          @click="nextPage"
        />
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.searchResults = this.$root.searchResults
    this.searchString = this.$root.quickSearch.searchInput
    this.page = this.$root.quickSearch.page
  },
  data() {
    return {
      page: 1,
      searchString: '',
      searchPlaceholder: 'Search beer...',
      searchResults: [],
      timer: null,
    }
  },
  methods: {
    clearInput() {
      this.searchString = ''
      this.update()
    },
    async nextPage() {
      this.page++
      await this.$root.fetchBeers(this.page)
      this.searchResults = this.$root.searchResults
    },
    async previousPage() {
      this.page--
      await this.$root.fetchBeers(this.page)
      this.searchResults = this.$root.searchResults
    },
    async update() {
      this.$root.setSearchInput(this.searchString)
      if (this.searchString.length > 2) {
        await this.$root.fetchBeers(this.page)
        this.searchResults = this.$root.searchResults
      } else {
        this.page = 1
      }
    },
  },
}
</script>

<style lang="scss" scoped>
$mobile-cutoff: 650px;

.search-container {
  align-items: flex-end;
  display: flex;
  flex-direction: column;
}

.input-container {
  background: #fff;
  display: flex;

  @media screen and (max-width: $mobile-cutoff) {
    display: none;
  }
}

.search-input {
  border: none;
  font-family: 'Roboto', sans-serif;
  height: 3.2rem;
  min-width: 15.6rem;
  outline: none;
  padding: 1rem;
  position: relative;
}

.clear-input {
  cursor: pointer;
  padding: 1rem;

  @media screen and (max-width: $mobile-cutoff) {
    padding: 0.5rem;
    width: 2rem;
  }
}

.advanced-search-button {
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  font-family: 'Yanone Kaffeesatz', sans-serif;
  font-size: 1.2rem;
  outline: none;
  margin-top: 0.5rem;
  text-align: right;

  @media screen and (max-width: $mobile-cutoff) {
    border: 1px solid #fff;
    border-radius: 3px;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 700;
    padding: 0.8rem 2rem 0.6rem;
  }
}

.search-results-container {
  top: 10rem;
  z-index: 2;
  position: absolute;

  @media screen and (max-width: $mobile-cutoff) {
    display: none;
  }

  ul {
    list-style: none;
    margin: 1.5rem 0;

    li {
      color: white;
      cursor: pointer;
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
      min-height: 5rem;
      opacity: 0.9;
      text-align: right;
    }

    li:hover {
      opacity: 1;
    }
  }

  nav {
    align-items: center;
    color: white;
    display: flex;
    font-size: 1.2rem;
    justify-content: flex-end;

    img {
      margin: 0;
      padding: 0;
      width: 1.5rem;
      cursor: pointer;
    }
  }
}
</style>
