<template>
  <div id="home">
    <h1>Performance Test</h1>

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

import BarChart from '@/components/BarChart.js'
import LoadingBar from '@/components/LoadingBar'

export default {
  name: 'home',
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

      const graphqlExecutionTime = await this.measureExecutionTimeGraphql()

      const fastifyExecutionTime = await this.measureExecutionTimeFastify()

      const expressExecutionTime = await this.measureExecutionTimeExpress()

      this.datacollection = {
        labels: ['Apollo (Graphql)', 'Fastify', 'Express'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: [
              graphqlExecutionTime,
              fastifyExecutionTime,
              expressExecutionTime
            ]
          }
        ]
      }

      this.disabled = true
    },
    async measureExecutionTimeGraphql () {
      const start = new Date().getTime()

      for (let i = 1; i <= this.howMany; i++) {
        await apolloClient.query({
          query: GET_POSTS,
          fetchPolicy: 'no-cache'
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
        await axiosInstance.get('http://localhost:3001/api/posts')
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
