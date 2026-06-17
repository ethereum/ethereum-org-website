---
title: Kuweka logi za data kutoka kwenye mikataba mahiri kwa kutumia matukio
description: Utangulizi wa matukio ya mkataba mahiri na jinsi unavyoweza kuyatumia kuweka logi za data
author: "jdourlens"
tags: ["mikataba mahiri", "Remix", "Solidity", "matukio"]
skill: intermediate
breadcrumb: Uwekaji logi wa matukio
lang: sw
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Katika Solidity, [matukio](/developers/docs/smart-contracts/anatomy/#events-and-logs) ni ishara zinazotumwa ambazo mikataba mahiri inaweza kuzianzisha. Programu tumizi zilizogatuliwa (dapps), au chochote kilichounganishwa kwenye API ya JSON-RPC ya Ethereum, kinaweza kusikiliza matukio haya na kuchukua hatua ipasavyo. Tukio linaweza pia kuwekewa faharasa ili historia ya tukio iweze kutafutwa baadaye.

## Matukio {#events}

Tukio la kawaida zaidi kwenye mnyororo wa vitalu wa Ethereum wakati wa kuandika makala haya ni tukio la Transfer ambalo hutolewa na tokeni za ERC-20 wakati mtu anafanya hamisho la tokeni.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Sahihi ya tukio inatangazwa ndani ya msimbo wa mkataba na inaweza kutolewa kwa neno kuu la emit. Kwa mfano, tukio la transfer linaweka logi ya nani aliyetuma hamisho (_from_), kwa nani (_to_) na kiasi gani cha tokeni zilihamishwa (_value_).

Tukirudi kwenye mkataba mahiri wetu wa Counter na kuamua kuweka logi kila wakati thamani inapobadilishwa. Kwa kuwa mkataba huu haukusudiwi kusambazwa bali kutumika kama msingi wa kujenga mkataba mwingine kwa kuupanua: unaitwa mkataba dhahania (abstract contract). Katika mfano wetu wa counter, ingeonekana hivi:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Kibadili cha kibinafsi cha aina ya unsigned int ili kuhifadhi idadi ya hesabu
    uint256 private count = 0;

    // Kitendaji kinachoongeza kihesabu chetu
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Kipataji ili kupata thamani ya hesabu
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Kumbuka kwamba:

- **Mstari wa 5**: tunatangaza tukio letu na kile linachojumuisha, thamani ya zamani na thamani mpya.

- **Mstari wa 13**: Tunapoongeza kigezo chetu cha count, tunatoa tukio.

Ikiwa sasa tutasambaza mkataba na kuita kipengele cha increment, tutaona kwamba Remix itaionyesha kiotomatiki ukibofya kwenye muamala mpya ndani ya safu inayoitwa logs.

![Remix screenshot](./remix-screenshot.png)

Logi ni muhimu sana kwa kutatua hitilafu kwenye mikataba mahiri yako lakini pia ni muhimu ikiwa unaunda programu zinazotumiwa na watu tofauti na kurahisisha kufanya uchanganuzi ili kufuatilia na kuelewa jinsi mkataba mahiri wako unavyotumika. Logi zinazozalishwa na miamala zinaonyeshwa kwenye vivinjari maarufu vya vitalu na unaweza pia kwa mfano kuzitumia kuunda hati za nje ya mnyororo kwa ajili ya kusikiliza matukio mahususi na kuchukua hatua yanapotokea.