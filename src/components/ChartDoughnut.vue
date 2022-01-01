<script>
import { Doughnut } from 'vue-chartjs'

export default {
    extends: Doughnut,	
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