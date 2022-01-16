import axios from 'axios';

export default {
	install(Vue) {
		Vue.prototype.APP_NAME = "haloo";
		Vue.prototype.APP_NAME_FULL = "haloo";
		Vue.prototype.APP_VERSION = "v1.0-alpha";
		Vue.prototype.CLIENT_NAME = "";
		Vue.prototype.CLIENT_ADDR = "";

		Vue.filter('currency', function(value) {
			if (typeof value !== "number") {
				return value;
			}
			const formatter = new Intl.NumberFormat('en-PH', {
				style: 'currency',
				currency: 'PHP',
				symbol: '₱',
				minimumFractionDigits: 2
			});
			return formatter.format(value);
		});

		Vue.filter('currencyNoSymbol', function(value) {
			return value.replace('₱', '');
		});

		Vue.filter('lowercase', function(value) {
			return value.toLowerCase();
		});

		Vue.filter('uppercase', function(value) {
			return value.toUpperCase();
		});

		Vue.filter('getDate', function(value) {
			var d = new Date(value);
			return d.getFullYear() +'-'+ Number.parseInt(d.getMonth()+1) +'-'+ d.getDate();
		});

		/**Vue.directive('currency', {
			twoWay: true,
			bind: function () {
				this.handler = function() {
					const formatter = new Intl.NumberFormat('en-PH', {
						style: 'currency',
						currency: 'PHP',
						minimumFractionDigits: 2
					});
					const value = formatter.format(this.el.value).replace('₱', '');
					this.set(value);
				}.bind(this);
				this.el.addEventListener('input', this.handler);
			},
			unbind: function() {
				this.el.removeEventListener('input', this.handler);
			}
		}); **/

		Vue.prototype.$storageGet = function(key, type) {
			var ttype = type || 'local';
			var value = ttype === 'local' ? window.localStorage.getItem(key) : window.sessionStorage.getItem(key)
			return value && JSON.parse(value)
		};
		Vue.prototype.$storageSet = function(key, value, type) {
			var ttype = type || 'local';
			if (ttype === 'local')
				window.localStorage.setItem(key, JSON.stringify(value));
			else if(ttype === 'session')
				window.sessionStorage.setItem(key, JSON.stringify(value));
		};
		Vue.prototype.$storageDel = function(key, type) {
			var ttype = type || 'local';
			if (ttype === 'local')
				window.localStorage.removeItem(key);
			else if(ttype === 'session')
				window.sessionStorage.removeItem(key);
		};
		Vue.prototype.$sleep = function(milliseconds) {
			return new Promise(resolve => window.setTimeout(resolve, milliseconds));
		};

		Vue.prototype.$rerun = function(milliseconds) {
			return new Promise(resolve => window.setInterval(resolve, milliseconds));
		};

		Vue.prototype.$http = axios.create({
			baseURL: window.API_BASEURL,
			timeout: 5000
		});
		Vue.prototype.$http.interceptors.request.use(function (config) {
				const api_token = window.localStorage.getItem("api_token") || "0";
				var getCookie = function(cname) {
					let name = cname + "=";
					let ca = document.cookie.split(';');
					for(let i = 0; i < ca.length; i++) {
						let c = ca[i];
						while (c.charAt(0) == ' ') {
							c = c.substring(1);
						}
						if (c.indexOf(name) == 0) {
							return c.substring(name.length, c.length);
						}
					}{{ csrf_token }}
						return "";
				};
				config.headers.common["X-CSRFToken"] = getCookie("csrftoken");
				config.headers.common["Authorization"] = "Token "+ JSON.parse(api_token);
				return config;
			}, function (error) {
				return Promise.reject(error);
		});
	}
};