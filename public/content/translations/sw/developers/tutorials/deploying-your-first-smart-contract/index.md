---
title: Kusambaza mkataba mahiri wako wa kwanza
description: Utangulizi wa kusambaza mkataba mahiri wako wa kwanza kwenye mtandao wa majaribio wa Ethereum
author: "jdourlens"
tags: ["mikataba mahiri", "Remix", "Solidity", "kusambaza"]
skill: beginner
breadcrumb: Sambaza mkataba wa kwanza
lang: sw
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Nadhani una msisimko kama sisi wa [kusambaza](/developers/docs/smart-contracts/deploying/) na kuingiliana na [mkataba mahiri](/developers/docs/smart-contracts/) wako wa kwanza kwenye mnyororo wa vitalu wa Ethereum.

Usiwe na wasiwasi, kwa kuwa ni mkataba mahiri wetu wa kwanza, tutausambaza kwenye [mtandao wa majaribio wa ndani](/developers/docs/networks/) ili isikugharimu chochote kuusambaza na kucheza nao kadri utakavyo.

## Kuandika mkataba wetu {#writing-our-contract}

Hatua ya kwanza ni [kutembelea Remix](https://remix.ethereum.org/) na kuunda faili jipya. Kwenye sehemu ya juu kushoto ya kiolesura cha Remix ongeza faili jipya na uweke jina la faili unalotaka.

![Adding a new file in the Remix interface](./remix.png)

Kwenye faili jipya, tutabandika msimbo ufuatao.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Kibadili cha umma cha aina ya unsigned int ili kuhifadhi idadi ya hesabu
    uint256 public count = 0;

    // Fankisheni inayoongeza kihesabu chetu
    function increment() public {
        count += 1;
    }

    // Getter isiyo ya lazima ili kupata thamani ya hesabu
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Ikiwa umezoea upangaji programu unaweza kukisia kwa urahisi kile programu hii inafanya. Hapa kuna maelezo mstari kwa mstari:

- Mstari wa 4: Tunafafanua mkataba wenye jina `Counter`.
- Mstari wa 7: Mkataba wetu unahifadhi nambari kamili moja isiyo na saini inayoitwa `count` inayoanzia 0.
- Mstari wa 10: Kazi ya kwanza itabadilisha hali ya mkataba na `increment()` kigezo chetu cha `count`.
- Mstari wa 15: Kazi ya pili ni kipataji (getter) tu ili kuweza kusoma thamani ya kigezo cha `count` nje ya mkataba mahiri. Kumbuka kwamba, kwa kuwa tulifafanua kigezo chetu cha `count` kama cha umma hii si lazima lakini imeonyeshwa kama mfano.

Haya ndiyo yote kwa mkataba mahiri wetu wa kwanza rahisi. Kama unavyoweza kujua, inaonekana kama darasa kutoka kwa lugha za OOP (Upangaji Programu Unaoelekezwa kwa Kitu) kama Java au C++. Sasa ni wakati wa kucheza na mkataba wetu.

## Kusambaza mkataba wetu {#deploying-our-contract}

Kwa kuwa tumeandika mkataba mahiri wetu wa kwanza kabisa, sasa tutausambaza kwenye mnyororo wa vitalu ili kuweza kucheza nao.

[Kusambaza mkataba mahiri kwenye mnyororo wa vitalu](/developers/docs/smart-contracts/deploying/) kwa kweli ni kutuma tu muamala ulio na msimbo wa mkataba mahiri uliokusanywa bila kubainisha wapokeaji wowote.

Kwanza [tutakusanya mkataba](/developers/docs/smart-contracts/compiling/) kwa kubofya ikoni ya kukusanya (compile) upande wa kushoto:

![The compile icon in the Remix toolbar](./remix-compile-button.png)

Kisha bofya kitufe cha kukusanya (compile):

![The compile button in the Remix solidity compiler](./remix-compile.png)

Unaweza kuchagua chaguo la “Kukusanya kiotomatiki” (Auto compile) ili mkataba uwe unakusanywa kila wakati unapohifadhi maudhui kwenye kihariri cha maandishi.

Kisha nenda kwenye skrini ya "sambaza na uendeshe miamala" (deploy and run transactions):

![The deploy icon in the Remix toolbar](./remix-deploy.png)

Mara tu unapokuwa kwenye skrini ya "sambaza na uendeshe miamala", hakikisha mara mbili kwamba jina la mkataba wako linaonekana na ubofye Sambaza (Deploy). Kama unavyoweza kuona juu ya ukurasa, mazingira ya sasa ni “JavaScript VM” ambayo inamaanisha kwamba tutasambaza na kuingiliana na mkataba mahiri wetu kwenye mnyororo wa vitalu wa majaribio wa ndani ili kuweza kujaribu haraka na bila ada yoyote.

![The deploy button in the Remix solidity compiler](./remix-deploy-button.png)

Mara tu unapobofya kitufe cha “Sambaza” (Deploy), utaona mkataba wako ukionekana chini. Bofya mshale ulio upande wa kushoto ili kuupanua ili tuone maudhui ya mkataba wetu. Hiki ni kigezo chetu cha `counter`, kazi yetu ya `increment()` na kipataji cha `getCounter()`.

Ikiwa utabofya kitufe cha `count` au `getCount`, kwa kweli itarejesha maudhui ya kigezo cha `count` cha mkataba na kuionyesha. Kwa kuwa bado hatujaita kazi ya `increment`, inapaswa kuonyesha 0.

![The function button in the Remix solidity compiler](./remix-function-button.png)

Sasa tuite kazi ya `increment` kwa kubofya kitufe. Utaona logi za miamala inayofanywa zikionekana chini ya dirisha. Utaona kwamba logi ni tofauti unapobonyeza kitufe ili kurejesha data badala ya kitufe cha `increment`. Ni kwa sababu kusoma data kwenye mnyororo wa vitalu hakuhitaji miamala yoyote (kuandika) au ada. Kwa sababu kurekebisha tu hali ya mnyororo wa vitalu kunahitaji kufanya muamala:

![A log of transactions](./transaction-log.png)

Baada ya kubonyeza kitufe cha kuongeza (increment) ambacho kitazalisha muamala wa kuita kazi yetu ya `increment()` ikiwa tutabofya tena kwenye vitufe vya count au getCount tutasoma hali mpya iliyosasishwa ya mkataba mahiri wetu huku kigezo cha count kikiwa kikubwa kuliko 0.

![Newly updated state of the smart contract](./updated-state.png)

Katika mafunzo yajayo, tutaangazia [jinsi unavyoweza kuongeza matukio kwenye mikataba mahiri yako](/developers/tutorials/logging-events-smart-contracts/). Kuweka logi za matukio ni njia rahisi ya kutatua mkataba mahiri wako na kuelewa kile kinachotokea wakati wa kuita kazi.