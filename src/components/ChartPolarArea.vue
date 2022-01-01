<script>
import { PolarArea } from 'vue-chartjs'

export default {
    extends: PolarArea,
    props: ['chartData', 'options'],
    mounted() {
        this.renderChart(this.chartData, this.options)
    }
  }
</script>