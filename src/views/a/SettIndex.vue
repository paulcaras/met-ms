<template>
	<div class="sett-o">
		<div class="t">
			<div class="a" @click="sessionDestroy()">
				<div>
					<v-icon name="circle-notch"></v-icon>
				</div>
				<div>
					<b>Session Destroy</b>
					<span>Terminate current session and logout</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import 'vue-awesome/icons/circle-notch';


export default {
	methods: {
		sessionDestroy() {
			window.localStorage.clear('api_token');
			this.$router.push('/');
		}
	}
}
</script>

<style scoped>
.sett-o { height: 100% }

.t { padding: 12px; }

.t .a { display: grid; grid-template-columns: 32px auto; cursor: pointer; }
.t .a svg { width: 24px; height: 24px; color: #777; }
.t .a b { display: block; font-weight: 500; font-size: 14px; color: #444; margin-bottom: 2px; }
.t .a span { display: block; font-size: 10px; color: #999; font-weight: 200; }

</style>
