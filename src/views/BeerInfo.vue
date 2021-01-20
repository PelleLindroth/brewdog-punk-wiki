<template>
  <div class="beer-info-view">
    <div class="beer-info-wrapper">
      <div class="beer-image-container">
        <img
          v-if="!this.$root.isMobile"
          :src="
            beer.image_url ? beer.image_url : require('../assets/no_image.svg')
          "
          :alt="altText"
          :style="
            (beer.image_url && beer.image_url.match(/.*(keg|cask)\.png$/)) ||
            cans.includes(beer.id)
              ? { maxHeight: '32rem' }
              : { maxHeight: '42rem' }
          "
          class="beer-image"
        />
      </div>
      <div class="beer-data">
        <div v-if="this.$root.isMobile" class="header-mobile-wrapper">
          <div class="beer-header-container">
            <h2>{{ beer.name }}</h2>
            <p>{{ beer.description }}</p>
          </div>
          <div class="beer-image-container">
            <img
              :src="
                beer.image_url
                  ? beer.image_url
                  : require('../assets/no_image.svg')
              "
              :alt="altText"
              class="beer-image"
            />
          </div>
        </div>
        <div v-if="!this.$root.isMobile" class="beer-header-container">
          <h2>{{ beer.name }}</h2>
          <p>{{ beer.description }}</p>
        </div>
        <div class="beer-info-cards-container">
          <div class="card-pair">
            <div class="beer-info-card card-one">
              <h3>Alcohol by volume</h3>
              <p class="abv">{{ `${beer.abv}%` }}</p>
            </div>
            <div class="beer-info-card card-two">
              <h3>pH value</h3>
              <p class="ph">{{ beer.ph }}</p>
            </div>
          </div>

          <div class="card-pair">
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
          </div>

          <div class="card-pair">
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
    </div>
    <router-link class="back-arrow" :to="backLink" title="Go back">
      <img src="../assets/back-arrow.svg" alt="Left pointing arrow" />
    </router-link>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.backLink = from.path
    })
  },
  created() {
    this.beer = this.$root.findBeer(this.$route.params.id)
    // if (this.beer.description.length > 570 && !this.$root.isMobile) {
    //   this.beer.description = this.beer.description.slice(0, 570) + '...'
    // }
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
      cans: [54, 73, 218, 226, 229, 230],
    }
  },
}
</script>

<style lang="scss" scoped>
$mobile-cutoff: 650px;

.beer-info-view {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin: 4rem auto;
  max-width: 80rem;

  @media screen and (max-width: $mobile-cutoff) {
    margin: 2rem auto;
  }

  .beer-info-wrapper {
    cursor: default;
    display: flex;

    .beer-image-container {
      align-items: center;
      display: grid;
      justify-content: center;

      img {
        margin: 0 2rem 0 1rem;
      }
    }

    .beer-header-container {
      color: white;
      font-family: 'Yanone Kaffeesatz', sans-serif;

      h2 {
        font-size: 3.2rem;
        font-weight: 700;
      }

      p {
        font-size: 1.6rem;
        font-weight: 300;
        margin-top: 2rem;
      }
    }

    .beer-data {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      @media screen and (max-width: $mobile-cutoff) {
        .header-mobile-wrapper {
          background-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 3px -3px rgba(0, 0, 0, 0.3);
          display: flex;
          padding: 2rem 1rem 2rem 1rem;

          .beer-image-container {
            align-items: center;
            img {
              max-height: 15rem;
            }
          }

          .beer-header-container {
            h2 {
              font-size: 3rem;
            }
          }
        }
      }

      .beer-info-cards-container {
        display: flex;
        flex-direction: column;
        min-width: 60rem;

        @media screen and (max-width: $mobile-cutoff) {
          min-width: 0;
        }
      }

      .beer-info-card {
        background-color: rgba(255, 255, 255, 0.3);
        color: white;
        flex-grow: 1;
        margin-top: 1rem;
        min-width: 50%;
        padding: 1rem;

        @media screen and (max-width: $mobile-cutoff) {
          box-shadow: 0 4px 3px -3px rgba(0, 0, 0, 0.3);
        }
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

      .card-pair {
        display: flex;
        @media screen and (max-width: $mobile-cutoff) {
          flex-direction: column;
        }

        .card-one,
        .card-three,
        .card-five {
          margin-right: 0.5rem;

          @media screen and (max-width: $mobile-cutoff) {
            margin-right: 0;
          }
        }

        .card-two,
        .card-four,
        .card-six {
          margin-left: 0.5rem;

          @media screen and (max-width: $mobile-cutoff) {
            margin-left: 0;
          }
        }
      }
    }
  }

  .back-arrow {
    margin-left: auto;
    margin-top: 1rem;

    @media screen and (max-width: $mobile-cutoff) {
      margin: 2rem auto;
      max-width: 5rem;
    }

    img {
      max-width: 100%;
    }
  }
}
</style>
