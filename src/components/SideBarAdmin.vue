<template>
	<div class="__side_con">
		<div class="__cons">
			<ul class="a">
				<li>
					<div class="l">
						<span @click="$router.push({ name: 'a-index' })" class="active">
							<v-icon name="th-large"></v-icon>
						</span>
					</div>
				</li>
			</ul>
			<ul class="b"></ul>
			<ul class="c" style="padding: 24px 0 0 0">
				<li>
					<div class="l">
						<span>
							<v-icon name="cog"></v-icon>
						</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import 'vue-awesome/icons/th-large';
import 'vue-awesome/icons/cog';
import 'vue-awesome/icons/user-circle';

export default {
	data() {
		return {
		}
	}
}
</script>

<style scoped>
.__side_con { height: inherit; background-color: #1E2426; position: relative; width: 32px; }
.__side_con .__cons { height: 100%; display: grid; grid-template-rows: 200px auto 64px; z-index: 9000; position: relative; }
.__cons ul { padding: 34px 0 0 0; list-style: none; }
.__cons ul li { height: 36px; cursor: pointer; }
.__cons ul li div.l {}
.__cons ul li div.l > span { display: block; text-align: center; padding: 10px 0; }
.__cons ul li div.l > span svg { height: 16px; width: 16px; color: #f0f0f0 }
.__cons ul li div.l > span.active { background-color: rgb(35, 187, 214); }
.__cons ul li div.l > span.active svg { color: #fff; }
</style>
