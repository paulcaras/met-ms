<template>
	<div class="make-c">
		<div class="t">
			<div class="h">
				<v-icon name="plus"></v-icon>
				<b>Create Node</b>
			</div>
		</div>
		<div class="m">
			<div class="x">
				<div>
					<input type="text" class="f-input" v-model="node.name" placeholder="Name"/>
					<span>Device Name (Arbitrary)</span>
				</div>
				<div style="padding-left: 12px">
					<input type="text" numeric class="f-input" v-model="node.chipid" placeholder="Chip ID"/>
					<span>Consumer Meter ID (Device's Chip ID)</span>
				</div>
			</div>
			<fieldset>
				<legend>Owner's Information</legend>
				<div class="form">
					<div>
						<input type="text" class="f-input" v-model="node.owner_fullname" placeholder="Fullname"/>
					</div>
					<div style="padding-left: 10px;">
						<input type="text" class="f-input" v-model="node.owner_address" placeholder="Home Address"/>
					</div>
				</div>
			</fieldset>
			<div class="y">
				<div>
					<input type="date" class="f-input" format="YYYY-MM-DD" v-model="node.installed_at"/>
					<span>Device Installation Date</span>
				</div>
				<div></div>
			</div>
			<div class="z">
				<button @click="goSaveForm()" :disabled="!isFormOkay || isSavingForm" class="br-confirm"><v-icon name="save"></v-icon> Submit Form</button>
			</div>
		</div>
		<div class="b">
			<div v-if="isOkaySaved" class="okay">Node Created Successfully!</div>
		</div>
		<ui-loader v-if="isSavingForm" :opacity="0.8"></ui-loader>
	</div>
</template>

<script>
import UILoader from '../../components/UILoader.vue';

import 'vue-awesome/icons/save';


export default {
	components: { 
		UiLoader : UILoader
	},
	data() {
		return {
			isOkaySaved: false,
			isSavingForm: false,
			node: { name: '', chipid: null, owner_fullname: '', owner_address: '', installed_at: null }
		}
	},
	computed: {
		isFormOkay() {
			return this.node.chipid != null && parseInt(this.node.chipid) > 0;
		}
	},
	methods: {
        goSaveForm() {
			this.isSavingForm = true;
			this.isOkaySaved = false;
			this.$http.post('/node/?action=new-node', this.node).then(res => {
				this.isOkaySaved = true;
			}).finally(() => {
				this.isSavingForm = false;
				this.$sleep(2000).then(() => {
					this.isOkaySaved = false;
					this.node = { name: '', chipid: null, owner_fullname: '', owner_address: '', installed_at: null }
				});
				
			});
		}
	}
}
</script>

<style scoped>
.make-c { height: 100%; position: relative }

.t {}

.t .h { padding: 12px; border-bottom: 4px solid #f8f8f8; }
.t .h svg { width: 14px; height: 14px; margin-right: 8px; color: #777; }
.t .h b { font-size: 16px; font-weight: 400; color: #555; }

.m { padding: 24px 12px; width: 80%; margin: 0 auto; }
.m span { font-size: 11px; font-weight: 200; color: #444; display: block; padding: 2px; }
.m .x { display: grid; grid-template-columns: auto 200px; }
.m .y { display: grid; grid-template-columns: 200px auto ; }
.m .z { padding: 12px 0; text-align: right; }

.m fieldset { margin: 12px 0; padding: 10px; border: 1px solid #f0f0f0; height: 100px; }
.m fieldset legend { font-size: 12px; color: #444; padding: 6px; }
.m fieldset .form { display: grid; grid-template-columns: 160px auto; }

.m button:disabled { color: #aaa; }

.b {}
.b .okay { width: 60%; margin: 24px auto; text-align: center; background-color: #f0fbf0; padding: 8px; border: 1px solid #eaf0ea; }
</style>
