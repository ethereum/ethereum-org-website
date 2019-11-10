<template>
	<component :is="comp" :items="selected">
		<slot/>
	</component>
</template>

<script>
/*
*  Implements a component showing elements from the array `items` after shuffling it
*  using random.js APIs. The component can be used as a child component (e.g. RandomAppList.vue)
*  to implement a random selection of items.
*/
import DefaultList from './DefaultList.vue';
import {MersenneTwister19937, shuffle} from "random-js"

export default {
	props: {
		n: Number,
		items: Array,
		comp: {
			type: [String, Object],
			default: () => (DefaultList),
		}
	},

	data() {
		const random = MersenneTwister19937.autoSeed();
		return {random: random, selected: []}
	},

	created() {
		this.selectItems();
	},

	methods: {
		selectItems() {
			shuffle(this.random, this.items);
			this.selected = this.items.slice(0, this.n);
		}
	}
}
</script>
