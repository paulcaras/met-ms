import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import plugins from '@/plugins';
import VIcon from 'vue-awesome/components/Icon.vue';
import VueHtmlToPaper from 'vue-html-to-paper';
import * as VueGoogleMaps from 'vue2-google-maps';
import App from '@/App.vue';

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(plugins);
Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyAFcDJl6dlTksK7Qr-AFq4BrHwmyyDQhbc',
		libraries: 'places'
	}
});
Vue.use(VueHtmlToPaper, {
	name: '_blank',
	specs: ['fullscreen=no', 'titlebar=no', 'scrollbars=yes', 'height=600', 'width=800', 'top=100', 'left=300'
	],
	styles: [
		'/static/css/print.css',
	]
});

Vue.component('v-icon', VIcon);

const vue = new Vue({
	template: '<app/>',
	components: { app: App },
	router,
	store,
	render: h => h(App)
});

vue.$mount('#app');
