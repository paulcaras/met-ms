<script>
import { Pie } from 'vue-chartjs'

export default {
    extends: Pie,	
    props: ['chartData', 'options'],
    data () {
		  return {

		  }
	  },
	  mounted () {
		  this.renderChart(this.chartData, this.options)
	  }
}
</script>