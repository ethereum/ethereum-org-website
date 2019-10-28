<template>
	<RandomList :n="4", :items="items"></RandomList>
</template>

<script>

/*
* 
*/

import RandomList from './RandomList.vue'

export default {
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
		return {items}
	}
} 
</script>
