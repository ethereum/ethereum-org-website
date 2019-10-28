<template>
        <div>
                <ul>
                        <li v-for="item in this.selected">
                                <a :href="item.url" target="_blank" rel="noopener noreferrer">{{item.name}}</a>, {{item.description}}
                        </li>
                </ul>
        </div>
</template>

<script>

/*
* Using RandomList as a Mixin we can achieve the random list functionality
*/

import RandomList from './RandomList.vue'

export default {
	mixins: [RandomList],	
	data() {
		const items = [
			{
				name: "Gitcoin",
				url: "https://gitcoin.co",
				description: "a network of incentivized open-source developers"
			},
			{
				name: "Cent",
				url: "https://beta.cent.co",
				description: "a social network where you can earn money by posting"
			},
			{
				name: "CryptoKitties",
				url: "https://www.cryptokitties.co",			
				description: "a game where you collect and breed digital collectible cats"
			},
			{
				name: "DAI",
				url: "https://makerdao.com/en/",
				description: "a stable cryptocurrency that holds value at $1 USD"	
			}
		];

		let selected = [];		

		return { items: items, selected: selected }
	},
	
	created() {
		this.selected = this.selectItems(this.items, 4);	
	}
} 
</script>
