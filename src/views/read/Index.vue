<template>
	<div class="read-o">
		<div class="w">
			<div class="p">
				<div class="navi">
					<div class="x">
						<button @click="dataViewType = 1" :class="dataViewType == 1 ? 'active' : ''"><v-icon name="list-ul"></v-icon> Tabular</button>
						<button @click="dataViewType = 2" :class="dataViewType == 2 ? 'active' : ''"><v-icon name="industry"></v-icon> Graphical</button>
					</div>
					<div class="y">
						<button v-if="queryString != ''" @click="clearQuery()">&times;</button><div v-else></div>
						<input type="date" placeholder="Filter by Date" v-model="queryString"/>
						<button @click="randomKeyGenerator()" :disabled="queryString == ''"><v-icon name="filter"></v-icon></button>
					</div>
				</div>
				<div class="data">
					<data-table v-if="dataViewType == 1" :key="'tab_'+ randomKeyValue.toString()" :queryString="queryString" @fetchListStat="fetchListStat"></data-table>
					<data-graph v-if="dataViewType == 2" :key="'gra_'+ randomKeyValue.toString()" :queryString="queryString" @fetchListStat="fetchListStat"></data-graph>
				</div>
				<ui-loader v-if="isFetchingList" :opacity="0.8"></ui-loader>
			</div>
			<div class="q">
				<div class="a">Readings for: <b>{{ queryString.length > 0 ? queryString : formatDate(new Date, false) }}</b></div>
			</div>
		</div>
	</div>
</template>

<script>
import 'vue-awesome/icons/square';
import 'vue-awesome/icons/list-ul';
import 'vue-awesome/icons/industry';
import 'vue-awesome/icons/filter';
import UILoader from '../../components/UILoader.vue';
import DataTable from '../../components/DataTable.vue';
import DataGraph from '../../components/DataGraph.vue';

export default {
	components: { 
		UiLoader : UILoader,
		DataTable,
		DataGraph
	},
	data() {
		return {
			isFetchingList: false,
			dataViewType: 1,
			queryString: '',
			randomKey: 0
		}
	},
	computed: {
		randomKeyValue() {
			return this.randomKey;
		}
	},
	methods: {
		fetchListStat(v) {
			this.isFetchingList = v;
		},
		clearQuery() {
			this.queryString = '';
			this.randomKeyGenerator();
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
	}
}
</script>

<style scoped>
.read-o { height: 100% }
.read-o .w { height: inherit; display: grid; grid-template-columns: auto 200px;}
.w .p { height: inherit; border-right: 1px solid #f0f0f0; position: relative; }
.w .q { height: inherit; background-color: #f8f8f8; }

.p .navi { display: grid; grid-template-columns: auto 200px; }
.p .navi .x { padding: 4px; }
.p .navi .x button { border: 1px solid #f0f0f0; margin-right: 4px; height: 22px; padding: 2px 12px; }
.p .navi .x button svg {  width: 12px; height: 12px; color: #707070; margin-right: 4px; }
.p .navi .x button.active, .p .navi .x button.active svg { color: rgb(35, 187, 214); }
.p .navi .y { padding: 4px; position: relative; display: grid; grid-template-columns:  28px auto 28px; }
.p .navi .y input { width: 100%; padding: 4px; height: 22px; border: 1px solid #d0d0d0; background-color: #fff; color: #222; }
.p .navi .y button { height: 22px; border: 1px solid #d0d0d0; font-size: 10px; text-transform: uppercase; }
.p .navi .y button svg { color: #808080; width: 12px; height: 12px; }

.q {}
.q .a { padding: 12px 10px; }
.q .a b { font-weight: 600; }
</style>
