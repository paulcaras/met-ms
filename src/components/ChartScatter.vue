<script>
import { Scatter } from 'vue-chartjs'

export default {
    extends: Scatter,
    props: ['chartData', 'options'],
    mounted() {
        this.renderChart(this.chartData, this.options)
    }
  }
</script>