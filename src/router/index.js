import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import BeerInfo from '../views/BeerInfo.vue'
import AdvancedSearch from '../views/AdvancedSearch.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/beer-info/:id',
    name: 'Beer-Info',
    component: BeerInfo,
    // beforeEnter: (to, from, next) => {
    //   console.log(next())
    //   console.log(from.name)
    // }
  },
  {
    path: '/advanced-search',
    name: 'Advanced-Search',
    component: AdvancedSearch
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
