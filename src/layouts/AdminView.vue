<template>
	<div class="main-o">
		<side-bar-admin></side-bar-admin>
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
			<div class="_m">
                <div class="sbar">
                    <div class="o">BOOKMARKS</div>
                    <ul class="a">
                        <li v-for="(m,i) in menus" :key="'menu_'+ i">
                            <span @click="toLink(m)" :class="$route.name == m.link ? 'active' : ''">
                                <i><v-icon :name="m.icon"></v-icon></i> <b>{{ m.name }}</b>
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="vbar">
                    <router-view></router-view>
                </div>
            </div>
			<div class="_b">
				<span>Copyright &copy;2021 PHYLight. All right reserved.</span>
			</div>
		</div>
	</div>
</template>

<script>
import SideBarAdmin from '../components/SideBarAdmin.vue';

import 'vue-awesome/icons/plus';
import 'vue-awesome/icons/industry';
import 'vue-awesome/icons/microchip';


export default {
    components: {
        SideBarAdmin
    },
	data() {
		return {
			selectedMenu: { name: '', icon: '', link: '' },
			menus: [
				{ name: 'All Readings', icon: 'industry', link: 'a-read-list-all' },
				{ name: 'View Nodes', icon: 'microchip', link: 'a-node-list' },
				{ name: 'Create Node', icon: 'plus', link: 'a-node-make' }
			]
		}
	},
	methods: {
		toLink(m) {
			this.selectedMenu = m;
			this.$router.push({ name: m.link });
		}

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

.view-o ._m { display: grid; grid-template-columns: 160px auto; }
.view-o ._m .sbar { height: 100%; background-color: #f9f9f2; padding: 32px 0; }
.view-o ._m .vbar { height: 100%; }
.view-o ._m .sbar .o { padding: 5px; font-size: 10px; font-weight: 200; color: #c0c0c0; }
.view-o ._m .sbar ul { list-style: none; border-top: 1px solid #eaeae7; }
.view-o ._m .sbar ul li { cursor: pointer; }
.view-o ._m .sbar ul li span { display: block; display: grid; grid-template-columns: 24px auto; padding: 5px 10px; border-top: 1px solid #fdfdf7; border-bottom: 1px solid #eaeae7; }
.view-o ._m .sbar ul li span svg { height: 14px; width: 14px; color: #888; }
.view-o ._m .sbar ul li span b { font-weight: normal; color: #444; font-size: 11px; padding: 2px 0; }
.view-o ._m .sbar ul li span.active, .view-o ._m .sbar ul li span:hover { background-color: #e0e0e0; }
.view-o ._m .sbar ul li span.active svg { color: #555; }
</style>
