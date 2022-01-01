<template>
	<div class="wrap-o">
		<div class="u">
			<div class="p">
				<div class="a">
					<div :class="['circle', reading.amps >= 30 ? 'sc' : (reading.amps > 20 ? 'sd' : 'sn') ]">
						<b>{{ reading.amps }}A</b>
						<i>{{ reading.volt }}V</i>
						<span>{{ reading.volt*reading.amps }}kW</span>
					</div>
					<div class="detail">
						<div>
							<div>
								<b class="sn"></b>
								<span>Normal</span>
							</div>
							<div>
								<b class="sd"></b>
								<span>Warning</span>
							</div>
							<div>
								<b class="sc"></b>
								<span>Critical</span>
							</div>
						</div>
					</div>
				</div>
				<ui-loader v-if="isFetchingList" :opacity="0.8"></ui-loader>
			</div>
			<div class="q"></div>		
		</div>
		<div class="v">
			<div class="a">
				<div class="tab">
					<div @click="$router.push({ name: 'read-index' })">
						<v-icon name="chart-line"></v-icon>
						<span>Energy <br/> Consumption</span>
					</div>
				</div>
				<div class="tab">
					<div @click="$router.push({ name: 'bill-index' })">
						<v-icon name="credit-card"></v-icon>
						<span>Monthly<br/>Billing</span>
					</div>
				</div>
				<div class="tab">
					<div @click="$router.push({ name: 'user-index' })">
						<v-icon name="user-circle"></v-icon>
						<span>My <br/>Account</span>
					</div>
				</div>
				<div class="tab">
					<div @click="$router.push({ name: 'serv-index' })">
						<v-icon name="phone"></v-icon>
						<span>Customer<br/>Service</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import UILoader from '@/components/UILoader.vue';
import 'vue-awesome/icons/user-circle';
import 'vue-awesome/icons/chart-line';
import 'vue-awesome/icons/phone';
import 'vue-awesome/icons/credit-card';


export default {
	components: {
		UiLoader: UILoader
	},
	data() {
		return {
			isFetchingList: true,
			reading: { amps: 0, volts: 0 },
			nid: 0,
			readHandler: null,
			maxCurrent: 30
		}
	},
	methods: {
		fetchLastRead() {
			this.isFetchingList = true
			this.$http.get('/g/node_last/?nid='+ this.nid +'&node_fields=id,name,chipid,read&read_fields=volt,amps,created_at,updated_at&queryString=0').then(res => {
				this.reading = res.data.read;
			}).finally(() => {
				this.isFetchingList = false;
			});
		}
	},
	mounted() {
		this.nid = this.$storageGet('nid', 'local');
		this.fetchLastRead();
		this.readHandler = window.setInterval(this.fetchLastRead, 10000);
	},
	destroyed() {
		window.clearInterval(this.readHandler);
	}
}
</script>

<style scoped>
.wrap-o { height: 100%; position: relative; display: grid; grid-template-rows: auto 140px; }
.wrap-o .u { display: grid; grid-template-columns: auto 360px; border-bottom: 1px solid #f0f0f0 }
.wrap-o .v { }
.u .p { border-right: 1px solid #f0f0f0; position: relative; }
.u .q { background-color: #fefefe; }
.u .p .a { padding: 60px 32px 0 32px; }
.u .p .a .circle { height: 180px; width: 180px; margin: 0 auto; border-radius: 100%; background-color: rgba(255,255,255,1); display: grid; align-content: center; text-align: center; transition: box-shadow ease 1000ms; }
.u .p .a .circle.sn { box-shadow: 0 0 0 30px rgb(28, 194, 64); }
.u .p .a .circle.sd { box-shadow: 0 0 0 30px rgb(214, 211, 28); }
.u .p .a .circle.sc { box-shadow: 0 0 0 30px rgb(207, 33, 33); }
.u .p .a .circle b { color: #333; font-size: 32px; }
.u .p .a .circle i { color: #666; font-size: 16px; }
.u .p .a .circle span { color: #666; font-size: 16px; }

.u .p .a .detail { padding: 30px 0 0 0; text-align: center; }
.u .p .a .detail span { font-size: 16px; color: #444; }
.u .p .a .detail > div { margin: 24px auto 0 auto; width: 240px; display: grid; grid-template-columns: 80px 80px 80px; }
.u .p .a .detail > div div { text-align: center; }
.u .p .a .detail > div div b { height: 8px; width: 70px; display: block; margin: 0 auto; }
.u .p .a .detail > div div b.sn { background-color: rgb(28, 194, 64); }
.u .p .a .detail > div div b.sd { background-color: rgb(214, 211, 28); }
.u .p .a .detail > div div b.sc { background-color: rgb(207, 33, 33); }
.u .p .a .detail > div div span { font-size: 14px; display: block; text-align: center; margin-top: 4px;  }

.v { padding: 30px 0; background-color: #fdfdfd; }
.v .a { width: 700px; margin: 0 auto; display: grid; grid-template-columns: 25% 25% 25% 25%; }
.v .a .tab { padding: 0 20px; }
.v .a .tab div { border: 1px solid #e0e0e0; height: 90px; background-color: #fff; text-align: right; position: relative; box-shadow: 1px 3px 9px rgba(0,0,0,0.15); }
.v .a .tab div:hover { margin: -5px; }
.v .a .tab div:hover svg { color: #808080 }
.v .a .tab div:hover span { background: #f8f8f2; color: #333; text-shadow: none }
.v .a .tab div svg { width: 32px; height: 32px; color: rgb(35, 187, 214); margin: 5px 7px 5px 5px; }
.v .a .tab div span { position: absolute; bottom: 0; width: 100%; display: block; padding: 4px 7px; font-size: 14px; color: #fff; text-align: right; background-color: rgb(35, 187, 214); text-shadow: -1px 0 1px #777; }

</style>