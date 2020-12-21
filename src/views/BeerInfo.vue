<template>
  <div class="beer-info-view">
    <router-link class="back-arrow" :to="backLink" title="Go back">
      <img src="../assets/back-arrow.svg" alt="Left pointing arrow" />
    </router-link>
    <div class="beer-info-wrapper">
      <div class="beer-image-container">
        <img
          :src="
            beer.image_url ? beer.image_url : require('../assets/no_image.svg')
          "
          :alt="altText"
          :style="
            (beer.image_url && beer.image_url.match(/.*(keg|cask)\.png$/)) ||
            cans.includes(beer.id)
              ? { width: '13rem', height: 'auto', 'margin-right': '4rem' }
              : { height: '100%' }
          "
          class="beer-image"
        />
      </div>
      <div class="beer-header-container">
        <h2>{{ beer.name }}</h2>
        <p>{{ beer.description }}</p>
      </div>
      <div class="beer-info-cards-container">
        <div class="beer-info-card card-one">
          <h3>Alcohol by volume</h3>
          <p class="abv">{{ `${beer.abv}%` }}</p>
        </div>
        <div class="beer-info-card card-two">
          <h3>pH value</h3>
          <p class="ph">{{ beer.ph }}</p>
        </div>
        <div class="beer-info-card card-three">
          <h3>Malts</h3>
          <p>
            {{ listMalts }}
          </p>
        </div>
        <div class="beer-info-card card-four">
          <h3>Hops</h3>
          <p>
            {{ listHops }}
          </p>
        </div>
        <div class="beer-info-card card-five">
          <h3>Goes well with</h3>
          <p>{{ beer.food_pairing[0] }}</p>
          <p>{{ beer.food_pairing[1] }}</p>
          <p>{{ beer.food_pairing[2] }}</p>
        </div>
        <div class="beer-info-card card-six">
          <h3>Brewers tips</h3>
          <p>{{ beer.brewers_tips }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  beforeRouteUpdate(to, from) {
    this.backLink = from.path
  },
  created() {
    this.beer = this.$root.findBeer(this.$route.params.id)
  },
  computed: {
    altText() {
      return `A bottle of ${this.beer.name}`
    },
    listMalts() {
      let string = ''

      if (this.beer.ingredients.malt) {
        const maltsArr = [
          ...new Set(this.beer.ingredients.malt.map(malt => malt.name)),
        ]

        for (let malt of maltsArr) {
          string += malt.slice(0, 1).toUpperCase() + malt.slice(1) + ', '
        }
        string = string.slice(0, -2)
      }

      return string
    },
    listHops() {
      let string = ''

      if (this.beer.ingredients.hops) {
        const hopsArr = [
          ...new Set(this.beer.ingredients.hops.map(hop => hop.name)),
        ]

        for (let hop of hopsArr) {
          string += hop.slice(0, 1).toUpperCase() + hop.slice(1) + ', '
        }

        string = string.slice(0, -2)
      }

      return string
    },
  },
  data() {
    return {
      backLink: '/',
      beer: {},
      cans: [218, 226, 229, 230],
    }
  },
}
</script>

<style scoped>
.beer-info-view {
  grid-column: 1 / span 12;
  grid-row: 2 / span 10;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(auto-fill, 64px);
  height: 100%;
  margin: auto;
}

.back-arrow {
  margin-left: auto;
  grid-column: 10;
  grid-row: 2;
}

.beer-info-wrapper {
  cursor: default;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(auto-fill, 64px);
  grid-column: 3 / span 8;
  grid-row: 3 / span 6;
}

.beer-image-container {
  align-items: center;
  display: grid;
  justify-content: center;
  grid-column: 1 / span 2;
  grid-row: 1 / span 6;
}

.beer-image-container img {
  height: 100%;
}

.beer-header-container {
  color: white;
  font-family: 'Yanone Kaffeesatz', sans-serif;
  grid-column: 3 / span 6;
  grid-row: 1 / span 2;
}

.beer-header-container h2 {
  font-size: 3.2rem;
  font-weight: 700;
}

.beer-header-container p {
  font-size: 1.6rem;
  font-weight: 300;
  margin-top: 2rem;
}

.beer-info-cards-container {
  display: grid;
  grid-column: 3 / span 6;
  grid-row: 3 / span 4;
  gap: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(auto-fill, 64px);
}

.beer-info-card {
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
  padding: 1rem;
}

.beer-info-card h3 {
  font-family: 'Yanone Kaffeesatz', sans-serif;
  font-size: 1.8rem;
  font-weight: 400;
}

.beer-info-card p {
  font-size: 1.1rem;
  margin-top: 1rem;
}

.card-one {
  grid-column: 1 / span 3;
  grid-row: 1;
}

.card-two {
  grid-column: 4 / span 3;
  grid-row: 1;
}

.card-three {
  grid-column: 1 / span 3;
  grid-row: 2;
}

.card-four {
  grid-column: 4 / span 3;
  grid-row: 2;
}

.card-five {
  grid-column: 1 / span 3;
  grid-row: 3 / span 2;
}

.card-six {
  grid-column: 4 / span 3;
  grid-row: 3 / span 2;
}
</style>
