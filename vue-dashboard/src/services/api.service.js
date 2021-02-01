import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import NProgress from 'nprogress'
import { ROOT_API_FASTIFY } from '../config/app.config'

const ApiService = {
  init: () => {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = ROOT_API_FASTIFY

    Vue.axios.interceptors.request.use(
      config => {
        if (config.method !== 'get') {
          NProgress.start()
        }
        return config
      },
      error => {
        NProgress.done()
        return Promise.reject(error)
      }
    )
    Vue.axios.interceptors.response.use(
      res => {
        NProgress.done()
        const { data } = res
        return data
      },
      error => {
        NProgress.done()
        return Promise.reject(error)
      }
    )
  },

  get (resource, params) {
    return Vue.axios.get(resource, { params })
  },

  post (resource, params, options) {
    return Vue.axios.post(resource, params, options)
  },

  put (resource, params) {
    return Vue.axios.put(resource, params)
  },

  delete (resource, payload) {
    return Vue.axios.delete(resource, payload)
  }
}

export default ApiService
