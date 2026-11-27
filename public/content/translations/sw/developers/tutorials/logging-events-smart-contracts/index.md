---
title: Kuweka logi za data kutoka kwenye mikataba mahiri kwa kutumia matukio
description: Utangulizi wa matukio ya mkataba mahiri na jinsi unavyoweza kuyatumia kuweka logi za data
author: "jdourlens"
tags: ["mikataba mahiri", "Remix", "Solidity", "matukio"]
skill: intermediate
breadcrumb: Uwekaji logi wa matukio
lang: sw
published: 2020-04-03
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Katika Solidity, [matukio](/developers/docs/smart-contracts/anatomy/#events-and-logs) ni ishara zinazotumwa ambazo mikataba mahiri inaweza kuzianzisha. Programu tumizi zilizogatuliwa (dapps), au chochote kilichounganishwa kwenye API ya JSON-RPC ya Ethereum, kinaweza kusikiliza matukio haya na kuchukua hatua ipasavyo. Tukio linaweza pia kuwekewa faharasa ili historia ya tukio iweze kutafutwa baadaye.

## Matukio {#events}

Moja ya matukio ya kawaida kwenye mnyororo wa vitalu wa Ethereum ni tukio la `Transfer` ambalo hutolewa na tokeni za ERC-20 wakati mtu anapohamisha tokeni.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Sahihi ya tukio hutangazwa ndani ya msimbo wa mkataba na inaweza kutolewa kwa neno kuu la emit. Kwa mfano, tukio la hamisho huweka logi ya nani aliyetuma hamisho (_from_), kwa nani (_to_) na kiasi gani cha tokeni zilizohamishwa (_value_).

Hebu turudi kwenye mkataba mahiri wa `Counter` kutoka kwenye [kusambaza mkataba wako mahiri wa kwanza](/developers/tutorials/deploying-your-first-smart-contract/) na kuweka logi kila wakati thamani inapobadilishwa. Ingeonekana hivi:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {

    event ValueChanged(uint256 oldValue, uint256 newValue);

    // Kibadilika cha umma cha aina ya unsigned int ili kuhifadhi idadi ya hesabu
    uint256 public count = 0;

    // Fankisheni inayoongeza kihesabio chetu
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter isiyo ya lazima ili kupata thamani ya hesabu
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Kumbuka kwamba:

- **Mstari wa 6**: tunatangaza tukio letu na kile linachojumuisha, thamani ya zamani na thamani mpya.

- **Mstari wa 14**: Tunapoongeza kigezo chetu cha kuhesabu, tunatoa tukio.

Ikiwa sasa tutasambaza mkataba na kuita kipengele cha kuongeza, tutaona kwamba Remix itaionyesha kiotomatiki ukibofya kwenye muamala mpya ndani ya safu inayoitwa logi.

![Picha ya skrini ya Remix](./remix-screenshot.png)

Logi ni muhimu sana kwa kutatua hitilafu kwenye mikataba yako mahiri lakini pia ni muhimu ikiwa unaunda programu zinazotumiwa na watu tofauti na kurahisisha kufanya uchanganuzi ili kufuatilia na kuelewa jinsi mkataba wako mahiri unavyotumika. Logi zinazozalishwa na miamala huonyeshwa kwenye vivinjari maarufu vya vitalu na unaweza pia kwa mfano kuzitumia kuunda hati za nje ya mnyororo kwa ajili ya kusikiliza matukio mahususi na kuchukua hatua yanapotokea.
