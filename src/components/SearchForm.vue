<template>
  <form class="search-form" @submit.prevent="search">
    <div class="search-card beer-name">
      <h2>Beer Name</h2>
      <input v-model="params.beer_name" type="text" />
    </div>
    <div class="search-card abv">
      <h2>ABV (Alcohol by volume)</h2>
      <div class="input-row">
        <div class="label-and-input">
          <label for="abv_gt">Min</label>
          <input
            v-model="params.abv_gt"
            type="number"
            inputmode="numeric"
            step="0.1"
          />
        </div>
        <div class="label-and-input">
          <label for="abv_lt">Max</label>
          <input
            v-model="params.abv_lt"
            type="number"
            inputmode="numeric"
            step="0.1"
          />
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
            v-model="params.ebc_gt"
            type="number"
            inputmode="numeric"
            step="10"
          />
        </div>
        <div class="label-and-input">
          <label for="ebc_lt">Max</label>
          <input
            v-model="params.ebc_lt"
            type="number"
            inputmode="numeric"
            step="10"
          />
        </div>
      </div>
    </div>
    <div class="search-card first-brewed">
      <h2>First brewed</h2>
      <div class="date-inputs">
        <div class="label-and-input">
          <label>After</label>
          <input v-model="params.brewed_after" type="month" />
        </div>

        <div class="label-and-input">
          <label>Before</label>
          <input v-model="params.brewed_before" type="month" />
        </div>
      </div>
    </div>
    <div class="search-card ibu">
      <h2>IBU (Bitterness)</h2>
      <div class="input-row">
        <div class="label-and-input">
          <label for="ibu_gt">Min</label>
          <input v-model="params.ibu_gt" type="number" inputmode="numeric" />
        </div>
        <div class="label-and-input">
          <label for="ibu_lt">Max</label>
          <input v-model="params.ibu_lt" type="number" inputmode="numeric" />
        </div>
      </div>
    </div>
    <div class="search-card malt">
      <h2>Malt</h2>
      <input v-model="params.malt" type="text" />
    </div>
    <div class="search-card hops">
      <h2>Hops</h2>
      <input v-model="params.hops" type="text" />
    </div>
    <div class="search-card yeast">
      <h2>Yeast</h2>
      <input v-model="params.yeast" type="text" />
    </div>
    <div class="search-card food">
      <h2>Food pairings</h2>
      <input v-model="params.food" type="text" />
    </div>
    <nav class="buttons">
      <button @click.prevent="clearForm" class="clear">CLEAR</button>
      <button class="search">SEARCH</button>
    </nav>
  </form>
</template>

<script>
export default {
  beforeMount() {
    console.log(this.$route.path)
  },
  methods: {
    clearForm() {
      this.$emit('clearForm')
    },
    convertDates() {
      let [afterYear, afterMonth] = this.params.brewed_after.split('-')
      this.params.brewed_after = `${afterMonth}-${afterYear}`
      let [beforeYear, beforeMonth] = this.params.brewed_before.split('-')
      this.params.brewed_before = `${beforeMonth}-${beforeYear}`
    },
    search() {
      let brewedAfter = this.params.brewed_after
      let brewedBefore = this.params.brewed_before
      this.convertDates()
      this.$emit('search', this.params)
      this.params.brewed_after = brewedAfter
      this.params.brewed_before = brewedBefore
    },
  },
  props: {
    params: Object,
  },
}
</script>

<style lang="scss" scoped>
$mobile-cutoff: 650px;

form {
  align-items: space-between;
  grid-column: 3 / span 8;
  grid-row: 1 / span 7;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  min-height: 56rem;
  min-width: 79.6rem;

  @media screen and (max-width: 650px) {
    flex-direction: column;
    flex-wrap: none;
    margin-top: 3rem;
    min-height: 0;
    min-width: 100%;
    grid-column: 1 / span 8;
    grid-row: 1 / span 7;
  }
}

.search-card {
  background-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 3px -3px rgba(0, 0, 0, 0.3);
  color: white;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  min-height: 13rem;
  justify-content: space-between;
  padding: 1rem;
  min-width: 25.8rem;

  @media screen and (max-width: 650px) {
    align-items: flex-start;
    min-height: 8rem;
    min-width: 100%;
  }

  h2 {
    font-family: 'Yanone Kaffeesatz', sans-serif;
    font-size: 2rem;
    font-weight: 700;
  }

  label {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    margin-bottom: 2px;

    @media screen and (max-width: 650px) {
      margin-bottom: 0.3rem;
    }
  }

  input {
    border: none;
    border-radius: 0px;
    font-family: 'Roboto', sans-serif;
    font-size: 1.2rem;
    height: 3rem;
    outline: none;
    padding: 0.5rem;
    min-width: 100%;

    @media screen and (max-width: 650px) {
      margin-bottom: 0.5rem;
      min-width: 60%;
    }
  }

  .label-and-input {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &.first-brewed {
    @media screen and (max-width: 650px) {
      .date-inputs {
        display: flex;

        input {
          margin-right: 1rem;
          -webkit-appearance: none;
        }
      }
    }
  }

  .input-row {
    display: flex;
    justify-content: space-between;

    input {
      width: 11rem;

      @media screen and (max-width: 650px) {
        flex-grow: 1;
        margin-right: 1rem;
      }
    }
  }
}

.buttons {
  display: flex;
  margin: auto;

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
    margin: 3rem 0.5rem 4rem;
    outline: none;
    width: 21.2rem;
  }

  @media screen and (max-width: 650px) {
    max-width: 60%;
  }

  .clear {
    border: 2px solid #fff;
  }
}
</style>
