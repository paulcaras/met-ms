<template>
    <div>
        <div class="list">
            <div class="h">
                <div></div>
                <div>Volt (V)</div>
                <div>Amps (A)</div>
                <div>Power (kW)</div>
                <div>Energy (kWh)</div>
                <div>Time</div>
            </div>
            <div v-if="readings.hasOwnProperty('read')" class="g">
                <div class="i" v-for="(r,i) in readings.read" :key="'r_'+i">
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
        </div>
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
import 'vue-awesome/icons/arrow-left';
import 'vue-awesome/icons/arrow-right';
import 'vue-awesome/icons/home';
import 'vue-awesome/icons/exchange-alt';


export default {
    props: ['queryString'],
    emits: ['fetchListStat'],
    data() {
        return {
            readings: {},
            nid: 0,
            listerStart: 0,
            listerLimit: 20
        }
    },
    methods: {
        fetchReadings() {
			this.$emit('fetchListStat', true);
			this.$http.get('/g/node_list/?nid='+ this.nid +'&node_fields=id,name,chipid,read&read_fields=volt,amps,created_at,updated_at&queryString='+ this.queryString +'&listerStart='+ this.listerStart +'&listerLimit='+ this.listerLimit).then(res => {
				this.readings = res.data;
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
		}
    },
    mounted() {
        this.nid = this.$storageGet('nid', 'local');
        this.fetchReadings();
    }
}
</script>

<style scoped>
.list { }
.list .h, .list .g .i { display: grid; grid-template-columns: 32px 80px 80px 140px 220px auto ; }
.list .h { background-color: #f0f0ea; padding: 0 7px; }
.list .h div { padding: 7px 0; font-weight: 600; }
.list .g { height: 400px; overflow-y: scroll; }
.list .g .i { padding: 0 7px; border-bottom: 1px solid #fbfbfb; }
.list .g .i:hover { background-color: #f8f8f2; }
.list .g .i div { padding: 7px 0; font-size: 12px; }
.list .g .i div svg { width: 10px; height: 10px; color: #f0f0f0; border: 1px solid #c0c0c0; }
.list .g .x { padding: 7px 0; text-align: center; }

.page { border-top: 1px solid #f0f0f0; padding: 4px 8px; display: grid; grid-template-columns: 60% 40%; }
.page button { height: 20px; font-size: 10px; text-transform: uppercase; border: 1px solid #d0d0d0; margin-right: 8px; padding: 2px 12px; }
.page button svg { color: #777; width: 10px; height: 10px; }
</style>
