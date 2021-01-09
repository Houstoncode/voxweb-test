import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

Vue.component('line-chart', {
  mixins: [Line, reactiveProp],
  // eslint-disable-next-line vue/require-prop-types
  props: ['options'],
  watch: {
    chartData() {
      this.$data._chart.update()
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
})
