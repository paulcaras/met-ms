<template>
	<div class="wrap-a">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		created() {
			let api_config = this.$storageGet('api_config', 'local');
			if (api_config && api_config.hasOwnProperty('server')) {
				this.API_BASEURL = api_config.server;
				this.$http.defaults.baseURL = api_config.server;
			}
		}
	}
</script>


<style scoped>
	.wrap-a { height: 100%; background-color: rgba(0,0,0,0); pointer-events: auto; }
</style>