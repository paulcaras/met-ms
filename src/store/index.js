import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isReloadView: false,
		module: { name: 'Optimum Monitoring System' },
		forms: {
			employee: {
				positions: [
					{ id: 'MNGR', name: 'Manager'},
					{ id: 'CSHR', name: 'Cashier'},
					{ id: 'INV1', name: 'Stock I'}
				]
			}
		}
	},
	mutations: {
		setModuleName(state, name) {
			Vue.set(state, 'module', { name });
		},
		setReloadView(state) {
			state.isReloadView = !state.isReloadView;
		}
	}
});