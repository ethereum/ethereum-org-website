<script>
/* 
*  Implements a component showing an <ul> with `numberOfItems` items took from 
*  the array `items` after shuffling it using random.js APIs. The component can be
*  used as a child component (e.g. RandomAppList.vue) to implement a random selection
*  of items. 
*/

import {MersenneTwister19937, shuffle} from "random-js"

export default {
	data() {
		const random = MersenneTwister19937.autoSeed();
		return {random}
	},

	methods: {
		selectItems(items, numberOfItems) {
			shuffle(this.random, items);
			return items.slice(0, numberOfItems);
		}
	}
} 
</script>
