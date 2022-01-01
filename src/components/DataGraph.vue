<template>
	<div class="__w">
		<chart-line :key="randomKeyValue.toString()" :chartData="cd" :options="options"></chart-line> 
		<div class="page">
            <div>
                <button :disabled="listerStart == 0" @click="prevList()"><v-icon name="arrow-left"></v-icon> PREV</button>
                <button :disabled="readings.hasOwnProperty('read') && readings.read.length < listerLimit" @click="nextList()">NEXT<v-icon name="arrow-right"></v-icon></button>
            </div>
            <div class="ta-r">
                <button @click="fetchReadings()"><v-icon name="exchange-alt"></v-icon> REFRESH</button>
                <button :disabled="listerStart > 0 || listerStart == 0" @click="homeList()"><v-icon name="home"></v-icon> LATEST</button>
            </div>
        </div>
	</div>
</template>


<script>
import ChartLine from '@/components/ChartLine.vue'

export default {
	props: ['queryString'],
    emits: ['fetchListStat'],
	components: {
		ChartLine, 
	},
	data() {
		return {
			readings: [],
			nid: 0,
			randomKey: 0,
			chartData: {
				labels: [],
				datasets: []
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						},
						gridLines: {
							display: true
						}
					}],
					xAxes: [ {
						gridLines: {
							display: false
						}
					}]
				},
				legend: {
					display: false
				},
				responsive: true,
				maintainAspectRatio: false
			},
			listerStart: 0,
            listerLimit: 20
		}
	},
	computed: {
		randomKeyValue(){
			return this.randomKey
		},
		cd() {
			return this.chartData;
		}
	},
	methods: {
		fetchReadings() {
			this.$emit('fetchListStat', true);
			this.$http.get('/g/node_list/?nid='+ this.nid +'&node_fields=id,name,chipid,read&read_fields=volt,amps,created_at,updated_at&queryString='+ this.queryString +'&listerStart='+ this.listerStart +'&listerLimit='+ this.listerLimit).then(res => {
				let v = [], i = [], p = [], t = [] ;
				res.data.read.forEach(r => {
					v.push(r.volt);
					i.push(r.amps);
					p.push((r.amps*r.volt)/1000);
					t.push(this.formatTime(r.created_at));
				});
				let dv = {
					label: "Voltage (V)",
					data: v,
					fill: false,
					borderColor: '#2554FF',
					backgroundColor: '#2554FF',
					borderWidth: 1
				}
				let di = {
					label: "Current (A)",
					data: i,
					fill: false,
					borderColor: '#25FF54',
					backgroundColor: '#25FF54',
					borderWidth: 1
				}
				let dp = {
					label: "Power (kW)",
					data: p,
					fill: false,
					borderColor: '#FF2554',
					backgroundColor: '#FF2554',
					borderWidth: 1
				}
				this.chartData.datasets.push(dv);
				this.chartData.datasets.push(di);
				//this.chartData.datasets.push(dp);
				this.chartData.labels = t;
				this.randomKeyGenerator();
			}).finally(() => {
				this.$emit('fetchListStat', false);
			});
		},
        prevList() {
            if (this.listerStart > 0)
                this.listerStart--;
            this.fetchReadings();
        },
        nextList() {
            if (this.readings.read.length == this.listerLimit)
                this.listerStart++;
            this.fetchReadings();
        },
        homeList() {
            this.listerStart = 0;
            this.fetchReadings();
        },
		formatDate(v, t) {
			const d = new Date(v);
			let YYYY = d.getFullYear(), MM = d.getMonth()+1, DD = d.getDate();
			if (MM < 10)
				MM = '0' + MM;
			if (DD < 10)
				DD = '0' + DD;
			let xx =  YYYY +'-'+ MM +'-'+ DD;
			let hh = d.getHours(), mm = d.getMinutes();
			if (hh < 10)
				hh = '0'+ hh;
			if (mm < 10)
				mm = '0'+ mm;
			if (t)
				return xx +' '+ hh +':'+ mm;
			return xx;
		},
		formatTime(v) {
			const d = new Date(v);
			let hh = d.getHours(), mm =  d.getMinutes();
			if (hh < 10)
				hh = '0'+ hh;
			if (mm < 10)
				mm = '0'+ mm;
			return  hh +':'+ mm;
		},
		randomKeyGenerator() {
			this.randomKey = Math.floor(Math.random() * 10000);
		}
	},
	mounted() {
		this.nid = this.$storageGet('nid', 'local');
		this.fetchReadings();
	}
}
</script>


<style scoped>
.__w { width: 100%; position: relative; height: 200px; padding: 10px; }
.page { border-top: 1px solid #f0f0f0; padding: 4px 8px; display: grid; grid-template-columns: 60% 40%; }
.page button { height: 20px; font-size: 10px; text-transform: uppercase; border: 1px solid #d0d0d0; margin-right: 8px; padding: 2px 12px; }
.page button svg { color: #777; width: 10px; height: 10px; }
</style>	