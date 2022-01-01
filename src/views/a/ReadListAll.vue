<template>
	<div class="read-o">
		<div class="w">
			<div class="navi">
				<div class="x">
					<button :class="dataViewType == 1 ? 'active' : ''"><v-icon name="list-ul"></v-icon> Tabular</button>
				</div>
				<div class="y">
					<button v-if="queryString != ''" @click="clearQuery()">&times;</button><div v-else></div>
					<input type="date" placeholder="Filter by Date" v-model="queryString"/>
					<button @click="fetchReadings()" :disabled="queryString == ''"><v-icon name="filter"></v-icon></button>
				</div>
			</div>
			<div class="data">
				<div class="list">
					<div class="h">
						<div></div>
						<div>Volt (V)</div>
						<div>Amps (A)</div>
						<div>Power (kW)</div>
						<div>Node</div>
						<div>ChipID</div>
						<div>Time</div>
					</div>
					<div v-if="readings.length > 0" class="g">
						<div class="i" v-for="(r,i) in readings" :key="'r_'+i">
							<div><v-icon name="square"></v-icon></div>
							<div>{{ r.volt }}</div>
							<div>{{ r.amps }}</div>
							<div>{{ r.volt*r.amps }}</div>
							<div>{{ r.node.name }}</div>
							<div>{{ r.node.chipid }}</div>
							<div>{{ formatDate(r.created_at, true) }}</div>
						</div>
					</div>
					<div v-else class="g">
						<div class="x">
							No Data Available
						</div>
					</div>
					<ui-loader v-if="isFetchingList" :opacity="0.8"></ui-loader>
				</div>
				<div class="page">
					<div>
						<button :disabled="listerStart == 0" @click="prevList()"><v-icon name="arrow-left"></v-icon> PREV</button>
						<button :disabled="readings.length < listerLimit" @click="nextList()">NEXT<v-icon name="arrow-right"></v-icon></button>
					</div>
					<div class="ta-r">
						<button @click="fetchReadings()"><v-icon name="exchange-alt"></v-icon> REFRESH</button>
						<button :disabled="listerStart > 0" @click="homeList()"><v-icon name="home"></v-icon> LATEST</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import UILoader from '../../components/UILoader.vue';

import 'vue-awesome/icons/square';
import 'vue-awesome/icons/list-ul';
import 'vue-awesome/icons/industry';
import 'vue-awesome/icons/filter';
import 'vue-awesome/icons/arrow-left';
import 'vue-awesome/icons/arrow-right';
import 'vue-awesome/icons/home';
import 'vue-awesome/icons/exchange-alt';

export default {
	components: { 
		UiLoader : UILoader
	},
	data() {
		return {
			isFetchingList: false,
			dataViewType: 1,
			queryString: '',
			randomKey: 0,
            readings: {},
            listerStart: 0,
            listerLimit: 20
		}
	},
	computed: {
		randomKeyValue() {
			return this.randomKey;
		}
	},
	methods: {
        fetchReadings() {
			this.isFetchingList = true;
			this.$http.get('/read/?action=lister&read_fields=volt,amps,created_at,updated_at,node&node_fields=id,name,chipid&queryString='+ this.queryString +'&listerStart='+ this.listerStart +'&listerLimit='+ this.listerLimit).then(res => {
				this.readings = res.data;
			}).finally(() => {
				this.isFetchingList = false;
			});
		},
        prevList() {
            if (this.listerStart > 0)
                this.listerStart--;
            this.fetchReadings();
        },
        nextList() {
            if (this.readings.length == this.listerLimit)
                this.listerStart++;
            this.fetchReadings();
        },
        homeList() {
            this.listerStart = 0;
            this.fetchReadings();
        },
		clearQuery() {
			this.queryString = '';
			this.fetchReadings();
		},
		randomKeyGenerator() {
			this.randomKey = Math.floor(Math.random()*10000000);
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
	},
    mounted() {
        this.fetchReadings();
    }
}
</script>

<style scoped>
.read-o { height: 100% }
.read-o .w { height: inherit; }

.w .navi { display: grid; grid-template-columns: auto 200px; }
.w .navi .x { padding: 4px; }
.w .navi .x button { border: 1px solid #f0f0f0; margin-right: 4px; height: 22px; padding: 2px 12px; }
.w .navi .x button svg {  width: 12px; height: 12px; color: #707070; margin-right: 4px; }
.w .navi .x button.active, .w .navi .x button.active svg { color: rgb(35, 187, 214); }
.w .navi .y { padding: 4px; position: relative; display: grid; grid-template-columns:  28px auto 28px; }
.w .navi .y input { width: 100%; padding: 4px; height: 22px; border: 1px solid #d0d0d0; background-color: #fff; color: #222; }
.w .navi .y button { height: 22px; border: 1px solid #d0d0d0; font-size: 10px; text-transform: uppercase; }
.w .navi .y button svg { color: #808080; width: 12px; height: 12px; }

.w .list { position: relative; }
.w .list .h, .w .list .g .i { display: grid; grid-template-columns: 32px 80px 80px 100px 140px 160px auto ; }
.w .list .h { background-color: #f0f0ea; padding: 0 7px; }
.w .list .h div { padding: 7px 0; font-weight: 500; }
.w .list .g { height: 400px; overflow-y: scroll; }
.w .list .g::scrollbar { width: 5px; display: block; }
.w .list .g::scrollbar-track { background: #f6f6f0; }
.w .list .g::scrollbar-thumb { background-color: #d7d7d0; border-radius: 3px; }
.w .list .g .i { padding: 0 7px; border-bottom: 1px solid #fbfbfb; }
.w .list .g .i:hover { background-color: #f8f8f2; }
.w .list .g .i div { padding: 7px 0; font-size: 12px; }
.w .list .g .i div svg { width: 10px; height: 10px; color: #f0f0f0; border: 1px solid #c0c0c0; }
.w .list .g .x { padding: 7px 0; text-align: center; }

.w .page { border-top: 1px solid #f0f0f0; padding: 4px 8px; display: grid; grid-template-columns: 60% 40%; }
.w .page button { height: 20px; font-size: 10px; text-transform: uppercase; border: 1px solid #d0d0d0; margin-right: 8px; padding: 2px 12px; }
.w .page button svg { color: #777; width: 10px; height: 10px; }

</style>
