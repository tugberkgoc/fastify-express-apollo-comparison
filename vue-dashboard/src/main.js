import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ApiService from '@/services/api.service'

import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

Vue.use(VueApollo)

export const defaultClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

const apolloProvider = new VueApollo({ defaultClient })

ApiService.init()

Vue.config.productionTip = false

new Vue({
  apolloProvider,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
