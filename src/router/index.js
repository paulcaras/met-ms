import Vue from 'vue';
import VueRouter from 'vue-router';

import InitView from '../layouts/InitView.vue';
import MainView from '../layouts/MainView.vue';
import LoadIndex from '../views/LoadIndex.vue';
import AdminView from '../layouts/AdminView.vue';

Vue.use(VueRouter);
const routes = [
	{ path: '', component: InitView,
		children: [
			{ path: '', component: LoadIndex, name: 'load-index-0' },
			{ path: '/', component: LoadIndex, name: 'load-index' },
			{ path: 'config-info', component: () => import('../views/ConfigInfo.vue'), name: 'config-info' },
		]
	},

	{ path: '/dash', component: MainView,
		children: [
			{ path: 'board', component: () => import('../views/DashBoard.vue'), name: 'dash-board' }
		]
	},


	{ path: '/bill', component: MainView,
		children: [
			{ path: 'index', component: () => import('../views/bill/Index.vue'), name: 'bill-index' }
		]
	},

	{ path: '/serv', component: MainView,
		children: [
			{ path: 'index', component: () => import('../views/serv/Index.vue'), name: 'serv-index' }
		]
	},

	{ path: '/sett', component: MainView,
		children: [
			{ path: 'index', component: () => import('../views/sett/Index.vue'), name: 'sett-index' }
		]
	},

	{ path: '/read', component: MainView,
		children: [
			{ path: 'index', component: () => import('../views/read/Index.vue'), name: 'read-index' },
			{ path: 'graph', component: () => import('../views/read/Graph.vue'), name: 'read-graph' }
		]
	},

	{ path: '/user', component: MainView,
		children: [
			{ path: 'index', component: () => import('../views/user/Index.vue'), name: 'user-index' }
		]
	},

	{ path: '/a/', component: AdminView,
		children: [
			{ path: 'node-list', component: () => import('../views/a/NodeList.vue'), name: 'a-node-list' },
			{ path: 'read-list-all', component: () => import('../views/a/ReadListAll.vue'), name: 'a-read-list-all' },
			{ path: 'read-list-one', component: () => import('../views/a/ReadListOne.vue'), name: 'a-read-list-one' },
			{ path: 'node-make', component: () => import('../views/a/NodeMake.vue'), name: 'a-node-make' },
			{ path: 'sett-index', component: () => import('../views/a/SettIndex.vue'), name: 'a-sett-index' }
	]
},

	{ path: '*', component: () => import('../views/Error404.vue'), name: 'error-404' }
];


const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router;
