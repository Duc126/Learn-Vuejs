import Vue from 'vue'
import Vuex from 'vuex'
import { getJobs } from '@/services/JobService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jobs: [],
    selectedCategories: [],
    categories: []
  },
  getters: {
    filteredJobs: state => {
      if (state.selectedCategories.length === 0) {
        return state.jobs
      } else {
        return state.jobs.filter(job => {
          return state.selectedCategories.some(category => job.category === category)
        })
      }
    },
    filterCategory: state => {
      const categories = []
      state.jobs.forEach(job => {
        if (!categories.includes(job.category)) {
          categories.push(job.category)
        }
      })
      return categories
    },
    selectedCategories: state => state.selectedCategories
  },
  mutations: {
    setJobs: (state, jobs) => {
      state.jobs = jobs
    },
    setSelectedCategories: (state, categories) => {
      state.selectedCategories = categories
    }
  },
  actions: {
    async fetchJobs ({ commit }) {
      try {
        const jobs = await getJobs()
        commit('setJobs', jobs)
      } catch (error) {
        console.error(error)
      }
    },
    setCategories ({ commit }, categories) {
      commit('setSelectedCategories', categories)
    }
  }
})
