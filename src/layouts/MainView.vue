<template>
	<div class="main-o">
		<side-bar></side-bar>
		<div class="view-o">
			<div class="_t">
				<div class="a">PHY L<v-icon name="bolt"></v-icon>ght</div>
				<div class="b"></div>
				<div class="c">
					<input type="text" placeholder=""/>
					<v-icon name="search"></v-icon>
				</div>
				<div class="d"><v-icon name="align-justify"></v-icon></div>
			</div>
			<router-view></router-view> 
			<div class="_b">
				<span>Copyright &copy;2021 PHYLight. All right reserved.</span>
			</div>
		</div>
	</div>
</template>

<script>
	import SideBar from '../components/SideBar.vue';

	import 'vue-awesome/icons/align-justify';
	import 'vue-awesome/icons/search';
	import 'vue-awesome/icons/bolt';


	export default {
		components: {
			SideBar
		}
	}
</script>

<style scoped>
.main-o { max-height: 550px; height: 550px; max-width: 900px; margin: calc((100vh - 550px)/2) auto; background-color: rgba(0,0,0,0); box-sizing: border-box; box-shadow: 10px 10px 40px rgba(0,0,0,0.45); display: grid; grid-template-columns: 32px auto; }
.view-o { height: inherit; display: grid; grid-template-rows: 36px auto 28px; }
.view-o ._t { height: 36px; background-color: rgb(35, 187, 214); display: grid; grid-template-columns: auto auto 180px 44px; }
.view-o ._t .a { font-size: 24px; font-weight: 800; color: #fff; padding: 4px 8px; }
.view-o ._t .a svg { width: 11px; height: 16px; }
.view-o ._t .b {}
.view-o ._t .c { padding: 6px; position: relative; }
.view-o ._t .c svg { position: absolute; right: 12px; top: 10px; width: 14px; height: 14px; color: rgb(35, 187, 214) }
.view-o ._t .c input { height: 24px; width: 100%; padding: 6px  }
.view-o ._t .d { padding: 8px; }
.view-o ._t .d svg { color: #fff; width: 18px; height: 18px; }
.view-o ._b { text-align: right; color: #909090; padding: 6px 10px; background-color: #f2f2f2; }
</style>
