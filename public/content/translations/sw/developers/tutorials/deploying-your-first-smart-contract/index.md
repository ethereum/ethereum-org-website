---
title: Kupeleka mkataba-erevu wako wa kwanza
description: Utangulizi wa kupeleka mkataba-erevu wako wa kwanza kwenye mtandao wa majaribio wa Ethereum
author: "jdourlens"
tags: [ "mikataba erevu", "remix", "uimara", "upelekaji" ]
skill: beginner
lang: sw
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Nadhani una msisimko kama sisi [kupeleka](/developers/docs/smart-contracts/deploying/) na kuingiliana na [mkataba-erevu](/developers/docs/smart-contracts/) wako wa kwanza kwenye mnyororo wa bloku wa Ethereum.

Usijali, kwa kuwa ni mkataba-erevu wetu wa kwanza, tutaupeleka kwenye [mtandao wa majaribio wa ndani](/developers/docs/networks/) kwa hivyo haitakugharimu chochote kupeleka na kucheza nao kadri upendavyo.

## Kuandika mkataba wetu {#writing-our-contract}

Hatua ya kwanza ni [kutembelea Remix](https://remix.ethereum.org/) na kuunda faili mpya. Kwenye sehemu ya juu kushoto ya kiolesura cha Remix ongeza faili mpya na uweke jina la faili unalotaka.

![Kuongeza faili mpya katika kiolesura cha Remix](./remix.png)

Katika faili mpya, tutabandika msimbo ufuatao.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Kigezo cha umma cha aina ya nambari kamili isiyo na alama ili kuweka idadi ya hesabu
    uint256 public count = 0;

    // Kitendakazi kinachoongeza kaunta yetu
    function increment() public {
        count += 1;
    }

    // Kipataji kisicho lazima cha kupata thamani ya hesabu
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Ikiwa umezoea programu unaweza kukisia kwa urahisi kile programu hii inafanya. Hapa kuna maelezo mstari kwa mstari:

- Mstari wa 4: Tunafafanua mkataba wenye jina la `Counter`.
- Mstari wa 7: Mkataba wetu unahifadhi nambari kamili moja isiyo na alama inayoitwa `count` inayoanzia 0.
- Mstari wa 10: Kitendakazi cha kwanza kitabadilisha hali ya mkataba na kuongeza kigezo chetu cha `count`.
- Mstari wa 15: Kitendakazi cha pili ni kipataji tu ili kuweza kusoma thamani ya kigezo cha `count` nje ya mkataba-erevu. Kumbuka kwamba, kwa vile tulifafanua kigezo chetu cha `count` kama cha umma hii si lazima lakini inaonyeshwa kama mfano.

Hayo ndiyo yote kwa mkataba-erevu wetu wa kwanza rahisi. Kama unavyoweza kujua, inaonekana kama darasa kutoka kwa lugha za OOP (Upangaji Unaolenga Kitu) kama Java au C++. Sasa ni wakati wa kucheza na mkataba wetu.

## Kupeleka mkataba wetu {#deploying-our-contract}

Kwa vile tumeandika mkataba-erevu wetu wa kwanza kabisa, sasa tutaupeleka kwenye mnyororo wa bloku ili tuweze kucheza nao.

[Kupeleka mkataba-erevu kwenye mnyororo wa bloku](/developers/docs/smart-contracts/deploying/) ni kutuma tu muamala wenye msimbo wa mkataba-erevu ulioandaliwa bila kubainisha wapokeaji wowote.

Kwanza [tutaandaa mkataba](/developers/docs/smart-contracts/compiling/) kwa kubofya aikoni ya kuandaa iliyo upande wa kushoto:

![Aikoni ya kuandaa katika upau wa vidhibiti wa Remix](./remix-compile-button.png)

Kisha bofya kwenye kitufe cha kuandaa:

![Kitufe cha kuandaa katika kiandaaji cha Remix solidity](./remix-compile.png)

Unaweza kuchagua chaguo la “Kuandaa Kiotomatiki” ili mkataba uwe unaandaliwa kila wakati unapohifadhi maudhui kwenye kihariri cha maandishi.

Kisha nenda kwenye skrini ya "peleka na endesha miamala":

![Aikoni ya kupeleka katika upau wa vidhibiti wa Remix](./remix-deploy.png)

Ukishakuwa kwenye skrini ya "peleka na endesha miamala", hakikisha mara mbili kwamba jina la mkataba wako linaonekana na ubofye Peleka. Kama unavyoona juu ya ukurasa, mazingira ya sasa ni “JavaScript VM” hii inamaanisha kuwa tutapeleka na kuingiliana na mkataba-erevu wetu kwenye mnyororo wa bloku wa majaribio wa ndani ili kuweza kupima haraka zaidi na bila ada zozote.

![Kitufe cha kupeleka katika kiandaaji cha Remix solidity](./remix-deploy-button.png)

Mara tu unapobofya kitufe cha “Peleka”, utaona mkataba wako ukionekana chini. Bofya mshale ulio upande wa kushoto ili kuipanua ili tuone maudhui ya mkataba wetu. Hiki ni kigezo chetu cha `counter`, kitendakazi chetu cha `increment()` na kipataji cha `getCounter()`.

Ukibofya kitufe cha `count` au `getCount`, kwa kweli kitachukua maudhui ya kigezo cha `count` cha mkataba na kuyaonyesha. Kwa kuwa bado hatujaita kitendakazi cha `increment`, inapaswa kuonyesha 0.

![Kitufe cha kitendakazi katika kiandaaji cha Remix solidity](./remix-function-button.png)

Sasa hebu tuite kitendakazi cha `increment` kwa kubofya kitufe. Utaona kumbukumbu za miamala inayofanywa zikionekana chini ya dirisha. Utaona kuwa kumbukumbu ni tofauti unapobonyeza kitufe cha kuchukua data badala ya kitufe cha `increment`. Ni kwa sababu kusoma data kwenye mnyororo wa bloku hakuhitaji miamala yoyote (kuandika) au ada. Kwa sababu kurekebisha tu hali ya mnyororo wa bloku ndiko kunahitaji kufanya muamala:

![Kumbukumbu ya miamala](./transaction-log.png)

Baada ya kubonyeza kitufe cha increment ambacho kitazalisha muamala wa kuita kitendakazi chetu cha `increment()`, tukibofya tena vitufe vya count au getCount tutasoma hali mpya iliyosasishwa ya mkataba-erevu wetu huku kigezo cha count kikiwa kikubwa kuliko 0.

![Hali mpya iliyosasishwa ya mkataba-erevu](./updated-state.png)

Katika mafunzo yajayo, tutaangazia [jinsi unavyoweza kuongeza matukio kwenye mikataba-erevu yako](/developers/tutorials/logging-events-smart-contracts/). Kurekodi matukio ni njia rahisi ya kutatua mkataba-erevu wako na kuelewa kinachoendelea unapoita kitendakazi.
