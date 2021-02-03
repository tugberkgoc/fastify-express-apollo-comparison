<template>
  <div id="home">
    <h1>GET POSTS</h1>

    <bar-chart :chart-data="datacollection" :options="options"></bar-chart>

    <input v-model="howMany" />

    <button v-on="{ click: startExecute }">Run</button>

    <LoadingBar :disabled="disabled" />
  </div>
</template>

<script>
import { defaultClient as apolloClient } from '@/main'
import { GET_POSTS } from '@/queries'

import axios from 'axios'
import ApolloClient from 'apollo-boost'
import {
  ROOT_API_EXPRESS,
  ROOT_API_FASTIFY_GQL,
  ROOT_API_APOLLO_EXPRESS
} from '../config/app.config'

import BarChart from '@/components/BarChart.js'
import LoadingBar from '@/components/LoadingBar'

export default {
  components: {
    BarChart,
    LoadingBar
  },
  data: () => {
    return {
      disabled: false,
      howMany: 10,
      datacollection: {},
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            label: function (tooltipItems, data) {
              return tooltipItems.yLabel + ' ms'
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        height: 200
      }
    }
  },
  async beforeMount () {
    await this.startExecute()
  },
  methods: {
    async startExecute () {
      this.disabled = false

      const apolloGraphqlExecutionTime = await this.measureExecutionTimeApolloGraphql()

      const fastifyExecutionTime = await this.measureExecutionTimeFastify()

      const fastifyGqlExecutionTime = await this.measureExecutionTimeFastifyGql()

      const expressExecutionTime = await this.measureExecutionTimeExpress()

      const apolloExpressExecutionTime = await this.measureExecutionTimeApolloExpress()

      this.datacollection = {
        labels: [
          'Apollo (Graphql)',
          'Fastify (REST API)',
          'Fastify Mercuries (Graphql)',
          'Express (REST API)',
          'Apollo Express (Graphql)'
        ],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: [
              apolloGraphqlExecutionTime,
              fastifyExecutionTime,
              fastifyGqlExecutionTime,
              expressExecutionTime,
              apolloExpressExecutionTime
            ]
          }
        ]
      }

      this.disabled = true
    },
    async measureExecutionTimeApolloGraphql () {
      const start = new Date().getTime()

      for (let i = 1; i <= this.howMany; i++) {
        await apolloClient.query({
          query: GET_POSTS,
          fetchPolicy: 'network-only'
        })
      }

      const end = new Date().getTime()

      return end - start
    },
    async measureExecutionTimeFastify () {
      const start = new Date().getTime()

      for (let i = 1; i <= this.howMany; i++) {
        await this.$http.get('/api/posts')
      }

      const end = new Date().getTime()

      return end - start
    },
    async measureExecutionTimeExpress () {
      const axiosInstance = axios.create()

      const start = new Date().getTime()

      for (let i = 1; i <= this.howMany; i++) {
        await axiosInstance.get(`${ROOT_API_EXPRESS}/api/posts`)
      }

      const end = new Date().getTime()

      return end - start
    },
    async measureExecutionTimeFastifyGql () {
      const apolloInstance = new ApolloClient({
        uri: `${ROOT_API_FASTIFY_GQL}/graphql`
      })

      const start = new Date().getTime()

      for (let i = 1; i <= this.howMany; i++) {
        await apolloInstance.query({
          query: GET_POSTS,
          fetchPolicy: 'network-only'
        })
      }

      const end = new Date().getTime()

      return end - start
    },
    async measureExecutionTimeApolloExpress () {
      const apolloInstance = new ApolloClient({
        uri: `${ROOT_API_APOLLO_EXPRESS}/graphql`
      })

      const start = new Date().getTime()

      for (let i = 1; i <= this.howMany; i++) {
        await apolloInstance.query({
          query: GET_POSTS,
          fetchPolicy: 'network-only'
        })
      }

      const end = new Date().getTime()

      return end - start
    }
  }
}
</script>

<style>
#home {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #282f36;
  margin-top: 30px;
}
</style>
