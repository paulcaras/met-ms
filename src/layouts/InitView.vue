<template>
	<div class="main-v">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
	}
</script>

<style scoped>
	.main-v { max-height: 550px; height: 550px; max-width: 900px; margin: calc((100vh - 550px)/2) auto; background-color: rgba(0,0,0,0); box-sizing: border-box; box-shadow: 10px 10px 40px rgba(0,0,0,0.45); }
</style>
