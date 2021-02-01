import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ApiService from '@/services/api.service'

import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

import { ROOT_API_APOLLO } from '@/config/app.config'

Vue.use(VueApollo)

export const defaultClient = new ApolloClient({
  uri: `${ROOT_API_APOLLO}/graphql`
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
