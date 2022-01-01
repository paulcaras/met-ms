<template>
	<div class="load-i">
		<div class="navi-o">
			<b>PHY Line</b>
			<span>Smart Meter Monitoring System</span>
			<i></i>
		</div>
		<div v-if="isFormShow" class="form">
			<div class="w" v-if="loginType == 1">
				<div class="t">
					<span>Meter Account</span>
				</div>
				<div class="f">
					<input type="text" numeric v-model="user.meter_id" placeholder="Meter ID" :class="{'e': isError }"/>
					<button :disabled="!isFormOkayU" @click="loginUser()">{{ isLogin ? '...' : 'Connect' }}</button>
				</div>
			</div>
			<div class="w" v-else>
				<div class="t">
					<span>Admin Login</span>
				</div>
				<div class="f">
					<input type="text" v-model="admin.username" placeholder="Username" :class="{'e': isError }"/>
					<input type="password" v-model="admin.password" placeholder="Password" :class="{'e': isError }"/>
					<button :disabled="!isFormOkayA" @click="loginAdmin()">{{ isLogin ? '...' : 'Connect' }}</button>
				</div>
			</div>
		</div>
		<div v-if="isLoadAnim" class="load-o">
			<span><v-icon name="spinner" :spin="true"></v-icon>PHYLine</span>
		</div>
		<div class="type-o">
			<span @click="loginType = loginType == 1 ? 2 : 1">Switch Login</span>
		</div>
	</div>
</template>

<script>
	import qs from 'qs';

	import 'vue-awesome/icons/rocket';
	import 'vue-awesome/icons/user-circle';
	import 'vue-awesome/icons/lock';
	import 'vue-awesome/icons/unlock';
	import 'vue-awesome/icons/spinner';


	export default {
		data() {
			return {
				isLoadAnim: true,
				isFormShow: true,
				isLogin: false,
				isError: false,
				user: { meter_id: null },
				reconnectHandler: null,
				loginType: 1,
				admin: { username: '', password: '' }
			}
		},
		computed: {
			isFormOkayU() {
				return this.user.meter_id && this.user.meter_id > 0;
			},
			isFormOkayA() {
				return this.admin.username != '' && this.admin.password != '';
			}
		},
		methods: {
			loginUser() {
				this.isLogin = true;
				this.isError = false;
				this.$http.get('/g/node_auth/?nid='+ this.user.meter_id +'&node_fields=id').then(res => {
					if (res.data.hasOwnProperty('id')) {
						this.$storageSet('nid', parseInt(this.user.meter_id), 'local')
						this.$sleep(1000).then(() => this.$router.push({ name : 'dash-board' }));
					} else {
						this.isError = true;
					}
				}).catch(res => {
					this.isError = true;
				}).finally(() => {
					this.isLogin = false;
					this.$sleep(2000).then(() => this.isError = false );
				});
			},
			loginAdmin() {
				this.isLogin = true;
				this.isError = false;
				this.$http.post('/login/?action=authenticate', qs.stringify({ uname: this.admin.username, passw: this.admin.password })).then(res => {
					if (res.data.hasOwnProperty('api_token')) {
						this.$storageSet('api_token', res.data.api_token, 'local')
						this.$router.push({ name : 'a-read-list-all' });
					} else {
						this.isError = true;
					}
				}).catch(res => {
					this.isError = true;
				}).finally(() => {
					this.isLogin = false;
					this.$sleep(2000).then(() => this.isError = false );
				});
			},
			loginByEnter(event) {
				if (event.key == 'Enter' && (this.isFormOkayA || this.isFormOkayU) && !this.isLogin) {
					if (this.loginType == 1)
						this.loginUser();
					else
						this.loginAdmin();
				}
			}
		},
		mounted() {
			this.$sleep(3000).then(() => this.isLoadAnim = false);
			window.addEventListener('keypress', this.loginByEnter);
		},
		beforeDestroy() {
			window.removeEventListener('keypress', this.loginByEnter);
		}
	}
</script>

<style scoped>
.load-i { height: 100%; background-color: #fff; color: #fff; position: relative; }
.name { position: absolute; top: 42%; width: 100%; text-align: center; }
.name span { font-size: 96px; font-family: "Bauhaus 93" }
.logo { position: absolute; top: 36%; width: 100%; text-align: center; }
.logo svg { width: 64px; height: 64px; color: #fff; margin-left: 260px; }
.stat { position: absolute; bottom: 0; width: 100%; padding: 12px; display: grid; grid-template-columns: 50% 50%; }
.stat .x {}
.stat .x svg { width: 10px; height: 10px; }
.stat .y { text-align: right }
.stat span { color: #297080; font-size: 12px; font-weight: 100; }

.form { position: absolute; top: 40%; width: 280px; right: 60px; text-align: center; background-color: #b3659c; padding: 10px 24px; border-radius: 10px; box-shadow: 10px 10px 16px rgba(0,0,0,0.24); }
.form .t { position: relative;  margin-bottom: 36px; }
.form .t span { font-size: 24px; display: block; text-align: center; }

.form .t svg { width: 30px; height: 30px; color: #fff; position: absolute; top: -10px; right: 42px; }
.form .f { width: 80%; text-align: center; margin: 0 auto; }
.form .f input { display: block; width: 100%; height: 32px; padding: 5px 7px; background: #193549; font-size: 12px; color: #fff; border: 1px solid #122738; margin-bottom: 10px; border-radius: 6px; text-align: center }
.form .f input::placeholder { color: #ddd; }
.form .f input.e { color: #fb4646; }
.form .f button { width: 80%; height: 30px; padding: 5px 7px; background: #fff; font-size: 14px; color: #122738; border: 1px solid #122738; margin-top: 10px; border-radius: 6px; }
.form .f button:disabled { background: #ddd; }

.erro { position: absolute; top: 48%;  width: 100%; }
.erro > div { width:180px; margin: 0 auto; background-color: #763749; padding: 1px; text-align: center; }

.navi-o { position: absolute; top: 0; right: 25%; left: 0; bottom: 0; border-radius: 0 0 100% 0; background-color: #5d7599; display: grid; align-content: center; }
.navi-o b { font-size: 96px; display: block; padding: 12px 0 0px 20px; font-family: "Californian FB"; font-weight: normal; }
.navi-o span { font-size: 24px; display: block; padding: 0 0 16px 24px; }
.navi-o i { height: 8px; background-color: #fff; display: block;}

.load-o { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: #fff; display: grid; justify-content: center; align-items: center; z-index: 9999; }
.load-o svg { width: 32px; height: 32px; color: #777; margin-right: 10px;  }
.load-o span { color: #555; font-size: 36px; font-weight: 600; font-family: "Californian FB"; }

.type-o { position: absolute; z-index: 1000; bottom: 12px; right: 12px; }
.type-o span { display: block; padding: 2px 10px; color: #999; font-weight: 100; font-size: 10px; cursor: pointer }
</style>
