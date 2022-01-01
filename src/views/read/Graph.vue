<template>
	<div class="bill-o">
		<div class="w">
			<div class="p">
				<div class="navi">
					<div class="x">
						<button @click="$router.push({ name: 'read-index' })"><v-icon name="list-ul"></v-icon> Table</button>
						<button class="active"><v-icon name="industry"></v-icon> Graph</button>
					</div>
					<div class="y">
						<input type="text" placeholder="Find Readings by Date"/>
						<v-icon name="search"></v-icon>
					</div>
				</div>
				<div class="list">
					<div class="h">
						<div></div>
						<div>Volt (V)</div>
						<div>Amps (A)</div>
						<div>Power (kW)</div>
						<div>Energy (kWh)</div>
						<div>Time</div>
					</div>
					<div v-if="readings.length > 0" class="g">
						<div class="i" v-for="(r,i) in readings[0].read" :key="'r_'+i">
							<div><v-icon name="square"></v-icon></div>
							<div>{{ r.volt }}</div>
							<div>{{ r.amps }}</div>
							<div>{{ r.volt*r.amps }}</div>
							<div>{{ r.volt }}</div>
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
			</div>
			<div class="q">
			</div>
		</div>
	</div>
</template>

<script>
import 'vue-awesome/icons/square';
import 'vue-awesome/icons/list-ul';
import 'vue-awesome/icons/industry';
import 'vue-awesome/icons/search';
import UILoader from '../../components/UILoader.vue';



export default {
	components: { 
		UiLoader : UILoader
	},
	data() {
		return {
			isFetchingList: false,
			readings: [],
			nid: 0
		}
	},
	methods: {
		fetchReadings() {
			this.isFetchingList = false;
			this.$http.get('/g/node_list/?nid='+ this.nid +'&node_fields=id,name,chipid,read&read_fields=volt,amps,created_at,updated_at').then(res => {
				this.readings = res.data;
			}).finally(() => {
				this.isFetchingList = false;
			});
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
		}
	},
	created() {
		this.nid = this.$storageGet('nid', 'local');
		this.fetchReadings();
	}
}
</script>

<style scoped>
.bill-o { height: 100% }
.bill-o .w { height: inherit; display: grid; grid-template-columns: auto 200px;}
.w .p { height: inherit; border-right: 1px solid #f0f0f0; }
.w .q { height: inherit; background-color: #f8f8f8; }

.p .list {}
.p .list .h, .p .list .g .i { display: grid; grid-template-columns: 32px auto auto 120px 120px 140px; }
.p .list .h { background-color: #f0f0ea; padding: 0 7px; }
.p .list .h div { padding: 7px 0; font-weight: 600; }
.p .list .g {}
.p .list .g .i { padding: 0 7px; border-bottom: 1px solid #fbfbfb; }
.p .list .g .i:hover { background-color: #f8f8f2; }
.p .list .g .i div { padding: 7px 0; font-size: 12px; }
.p .list .g .i div svg { width: 10px; height: 10px; color: #f0f0f0; border: 1px solid #c0c0c0; }
.p .list .g .x { padding: 7px 0; text-align: center; }

.p .navi { display: grid; grid-template-columns: auto 200px; }
.p .navi .x { padding: 4px; }
.p .navi .x button { border: 1px solid #f0f0f0; margin-right: 4px; height: 22px; padding: 2px 12px; }
.p .navi .x button svg {  width: 12px; height: 12px; color: #707070; margin-right: 4px; }
.p .navi .x button.active, .p .navi .x button.active svg { color: rgb(35, 187, 214); }
.p .navi .y { padding: 4px; position: relative; }
.p .navi .y input { width: 100%; padding: 4px; height: 22px; border: 1px solid #d0d0d0; background-color: #fff; color: #222; }
.p .navi .y svg { position: absolute; top: 8px; right: 12px; color: #909090; width: 12px; height: 12px; }
</style>
