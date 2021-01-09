<template>
  <v-row align="center">
    <heading caption="Статистика" />
    <v-col cols="12">
      <v-card elevation="0">
        <v-card-text>
          <line-chart
            ref="lineChart"
            :chart-data="chartData"
            :options="options"
          />
          <div class="chart__action">
            <v-btn
              class="btn-stats"
              outlined
              rounded
              @click="generateRandomData"
              >Случайные данные</v-btn
            >
            <v-btn class="btn-stats" outlined rounded @click="addRandomDataSet"
              >Добавить данные</v-btn
            >
            <v-btn class="btn-stats" outlined rounded @click="removeLastDataSet"
              >Удалить данные</v-btn
            >
            <v-btn class="btn-stats" outlined rounded @click="addDataLabel"
              >Увеличить кол-во данных</v-btn
            >
            <v-btn class="btn-stats" outlined rounded @click="removeDataLabel"
              >Уменьшить кол-во данных</v-btn
            >
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      labelIndex: 5,
      avaivalableLabels: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      chartData: {
        labels: [
          'Январь',
          'Февраль',
          'Март',
          'Апрель',
          'Май',
          'Июнь',
          'Июль',
          'Август',
          'Сентябрь',
          'Октябрь',
          'Ноябрь',
          'Декабрь',
        ],
        datasets: [],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          custom: null,
          callbacks: {
            label(tooltipItem, data) {
              let label = data.datasets[tooltipItem.datasetIndex].label || ''

              if (label) {
                label += ''
              }

              return `${tooltipItem.yLabel} ₽`
            },
          },
        },
      },
    }
  },
  mounted() {
    this.generateRandomData()
  },
  methods: {
    getRandomColor() {
      // eslint-disable-next-line unicorn/number-literal-case
      const color = '#' + ((Math.random() * 0xffffff) << 0).toString(16)
      return color
    },

    getRandomInt() {
      return Math.floor(Math.random() * (3000 - 5 + 1)) + 5
    },

    getNextLabel() {
      return this.avaivalableLabels[this.labelIndex + 1]
    },

    generateRandomData() {
      const randomValue = Math.floor(Math.random() * Math.floor(10)) + 1

      const randomLabelsValue = Math.floor(Math.random() * Math.floor(4)) + 3
      const arrayLabels = [
        'Первая дата',
        'Вторая дата',
        'Третья дата',
        'Четвертая дата',
        'Пятая дата',
        'Шестая дата',
        'Седьмая дата',
        'Восьмая дата',
        'Девятая дата',
        'Десятая дата',
      ]

      const chartData = { labels: [], datasets: [] }

      const labels = []

      for (let j = 0; j < randomLabelsValue; j++) {
        labels.push(this.avaivalableLabels[j])
      }

      chartData.labels = labels

      for (let i = 0; i < randomValue; i++) {
        const randomColor = this.getRandomColor()
        const label = arrayLabels[i]
        const data = []

        for (let j = 0; j < labels.length; j++) {
          data.push(this.getRandomInt())
        }

        const dataSet = {
          label,
          backgroundColor: randomColor,
          borderColor: randomColor,
          data,
          fill: false,
        }

        chartData.datasets.push(dataSet)
      }

      this.chartData = chartData
    },

    removeDataLabel() {
      if (this.labelIndex - 1 < 0) {
        this.labelIndex = this.labelIndex.length
      }

      const dataSets = []

      this.chartData.datasets.forEach((dataSet) => {
        const newDataSet = {
          ...dataSet,
          data: [...dataSet.data.slice(0, dataSet.data.length - 1)],
        }

        dataSets.push(newDataSet)
      })

      const chartData = {
        ...this.chartData,
        labels: this.chartData.labels.slice(
          0,
          this.chartData.labels.length - 1
        ),
        datasets: dataSets,
      }

      this.chartData = chartData

      this.labelIndex -= 1
    },

    addDataLabel() {
      if (
        this.labelIndex + 1 >= this.avaivalableLabels.length ||
        isNaN(this.labelIndex)
      ) {
        this.labelIndex = -1
      }

      const nextLabel = this.getNextLabel()

      const dataSets = []

      this.chartData.datasets.forEach((dataSet) => {
        const newDataSet = {
          ...dataSet,
          data: [...dataSet.data, this.getRandomInt()],
        }

        dataSets.push(newDataSet)
      })

      const chartData = {
        ...this.chartData,
        labels: [...this.chartData.labels, nextLabel],
        datasets: dataSets,
      }

      this.labelIndex += 1
      this.chartData = chartData
    },

    removeLastDataSet() {
      const dataSets = this.chartData.datasets.slice(
        0,
        this.chartData.datasets.length - 1
      )

      this.chartData = { ...this.chartData, datasets: dataSets }
    },

    addRandomDataSet() {
      const data = []

      this.chartData.labels.forEach(() => {
        data.push(this.getRandomInt())
      })

      const randomColor = this.getRandomColor()

      const dataSets = [
        ...this.chartData.datasets,
        {
          label: 'Доп. дата',
          backgroundColor: randomColor,
          borderColor: randomColor,
          data,
          fill: false,
        },
      ]

      this.chartData = { ...this.chartData, datasets: dataSets }
    },
  },
}
</script>

<style lang="scss" scoped>
.chart__action {
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(5, auto);
  grid-template-rows: auto;
  grid-auto-flow: row dense;

  .btn-stats {
    border: 1px solid #cbcbcb;
    color: #cbcbcb;
    padding: 0 16px !important;
    font-size: 12px;
    transition: all 0.35s;
    background-color: unset;

    &::before {
      background-color: unset;
    }

    &:hover {
      color: #bd0d22;
      border: 1px solid #bd0d22;
    }
  }
}
@media (max-width: 1100px) {
  .chart__action {
    margin-top: 48px;
    grid-gap: 12px;
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(3, 1fr);

    .btn-stats {
      &:last-child {
        grid-column: 1 / span 2;
        grid-row: 3;
      }
    }
  }
}
</style>
