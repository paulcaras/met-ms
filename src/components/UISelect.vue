<template>
	<div class="_com_us">
		<div class="sele" :style="styles[0] ? styles[0] : 'width: 100%;'">
			<div class="name" @click="isSelect = !isSelect">
				<span>{{ selected.name }}</span>
				<b><v-icon name="caret-down"></v-icon></b>
			</div>
			<div :class="['opti', orient == 'top-bot' ? 'tb' : 'bt']" v-show="isSelect">
				<span :style="styles[1] ? styles[1] : 'padding: 7px 10px'" v-for="(o,i) in options" :key="i" @click="hasSelected(o)">{{ o.name }}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/caret-down';

	export default {
		emits: ['setValue'],
		props: {
			options: {
				type: Array,
				required: true
			},
			styles: {
				type: Array,
				required: false
			},
			presets: {
				type: Object,
				default() {
					return { id: 0, name: '------' };
				}
			},
			changed: {
				type: Number,
				default() {
					return -1;
				}
			},
			orient: {
				type: String,
				default() {
					return 'top-bot';
				}
			}
		},
		data() {
			return {
				selected: { id: 0, name: '' },
				isSelect: false
			}
		},
		methods: {
			hasSelected(o) {
				this.selected = o;
				this.$emit('setValue', o);
				this.isSelect = false;
			}
		},
		watch: {
			changed(n) {
				this.selected = { id: 0, name: '------' };
			}
		},
		mounted() {
			this.selected = this.presets;
			this.$emit('setValue', this.presets);
		}
	}
</script>

<style scoped>
	._com_us { position: relative; }
	.sele { color: #391e22; background-color: #fdfdfd; border: none; outline: none; cursor: pointer; border-style: solid; border-width: 1px; border-color: #f0f0f0 #eaeaea #d0d0d0 #eaeaea; position: relative; border-radius: 2px; padding: 6px 10px 6px 10px; height: 27px; }

	.name { height: inherit; display: grid; grid-template-columns: auto 10px }
	.name span { font-size: 11px; color: #111; text-overflow: clip; overflow: hidden; white-space: nowrap; }
	.name b svg { height: 10px; width: 10px; }

	.opti { position: absolute;  left: 0; right: 0; background-color: #fff; box-shadow: 0 4px 9px rgba(0,0,0,0.12); overflow-y: scroll; max-height: 140px; z-index: 5000; }
	.opti.bt { bottom: 100%; }
	.opti.tb { top: -1px; }

	.opti::-webkit-scrollbar { width: 4px; display: block; }
	.opti::-webkit-scrollbar-track { background: transparent; }
	.opti::-webkit-scrollbar-thumb { background-color: #d0d0d0; border-radius: 4px; }

	.opti span { display: block; border-top: 1px solid #f8f8f8; color: #111; font-size: 11px; }
	.opti span:hover { background-color: #f0f0f0 }
</style>
