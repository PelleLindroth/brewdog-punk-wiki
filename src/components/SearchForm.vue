<template>
  <form class="search-form" @submit.prevent="search">
    <div class="search-card beer-name">
      <h2>Beer Name</h2>
      <input v-model="searchParams.beer_name" type="text" />
    </div>
    <div class="search-card abv">
      <h2>ABV (Alcohol by volume)</h2>
      <div class="input-row">
        <div class="label-and-input">
          <label for="abv_gt">Min</label>
          <input v-model="searchParams.abv_gt" type="number" step="0.1" />
        </div>
        <div class="label-and-input">
          <label for="abv_lt">Max</label>
          <input v-model="searchParams.abv_lt" type="number" step="0.1" />
        </div>
      </div>
    </div>
    <div class="search-card ebc">
      <h2>EBC (Color)</h2>
      <div class="input-row">
        <div class="label-and-input">
          <label for="ebc_gt">Min</label>
          <input
            name="ebc_gt"
            v-model="searchParams.ebc_gt"
            type="number"
            step="10"
          />
        </div>
        <div class="label-and-input">
          <label for="ebc_lt">Max</label>
          <input v-model="searchParams.ebc_lt" type="number" step="10" />
        </div>
      </div>
    </div>
    <div class="search-card first-brewed">
      <h2>First brewed</h2>
      <div class="label-and-input">
        <label>After</label>
        <input v-model="searchParams.brewed_after" type="month" />
      </div>

      <div class="label-and-input">
        <label>Before</label>
        <input v-model="searchParams.brewed_before" type="month" />
      </div>
    </div>
    <div class="search-card ibu">
      <h2>IBU (Bitterness)</h2>
      <div class="input-row">
        <div class="label-and-input">
          <label for="ibu_gt">Min</label>
          <input v-model="searchParams.ibu_gt" type="number" />
        </div>
        <div class="label-and-input">
          <label for="ibu_lt">Max</label>
          <input v-model="searchParams.ibu_lt" type="number" />
        </div>
      </div>
    </div>
    <div class="search-card malt">
      <h2>Malt</h2>
      <input v-model="searchParams.malt" type="text" />
    </div>
    <div class="search-card hops">
      <h2>Hops</h2>
      <input v-model="searchParams.hops" type="text" />
    </div>
    <div class="search-card yeast">
      <h2>Yeast</h2>
      <input v-model="searchParams.yeast" type="text" />
    </div>
    <div class="search-card food">
      <h2>Food pairings</h2>
      <input v-model="searchParams.food" type="text" />
    </div>
    <button>SEARCH BEER</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      searchParams: {
        beer_name: '',
        abv_gt: '',
        abv_lt: '',
        ebc_gt: '',
        ebcMax: '',
        brewed_after: '2000-01',
        brewed_before: '2020-01',
        ibu_gt: '',
        ibu_lt: '',
        malt: '',
        hops: '',
        yeast: '',
        food: '',
      },
    }
  },
  methods: {
    convertDates() {
      let [afterYear, afterMonth] = this.searchParams.brewed_after.split('-')
      this.searchParams.brewed_after = `${afterMonth}-${afterYear}`
      let [beforeYear, beforeMonth] = this.searchParams.brewed_before.split('-')
      this.searchParams.brewed_before = `${beforeMonth}-${beforeYear}`
    },
    search() {
      let brewedAfter = this.searchParams.brewed_after
      let brewedBefore = this.searchParams.brewed_before
      this.convertDates()
      this.$emit('search', this.searchParams)
      this.searchParams.brewed_after = brewedAfter
      this.searchParams.brewed_before = brewedBefore
    },
  },
}
</script>

<style scoped>
form {
  align-items: space-between;
  grid-column: 3 / span 8;
  grid-row: 3 / span 7;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  min-height: 50rem;
  min-width: 79.6rem;
}

.search-card {
  background-color: rgba(255, 255, 255, 0.25);
  color: white;
  display: flex;
  flex-direction: column;
  height: 13rem;
  justify-content: space-between;
  padding: 1rem;
  width: 25.8rem;
}

.search-card h2 {
  font-family: 'Yanone Kaffeesatz', sans-serif;
  font-size: 2rem;
  font-weight: 700;
}

.search-card label {
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  margin-bottom: 2px;
}

.search-card input {
  border: none;
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  height: 3rem;
  outline: none;
  padding: 0.5rem;
  width: 100%;
}

.label-and-input {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.input-row {
  display: flex;
  justify-content: space-between;
}

.input-row input {
  width: 11rem;
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
  height: 4.1rem;
  margin: 1rem auto;
  outline: none;
  width: 21.2rem;
}
</style>
