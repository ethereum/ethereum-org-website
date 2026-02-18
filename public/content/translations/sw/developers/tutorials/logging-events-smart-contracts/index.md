---
title: Kuweka data kutoka kwa mikataba-erevu na matukio
description: Utangulizi wa matukio ya mkataba-erevu na jinsi unavyoweza kuyatumia kuweka data
author: "jdourlens"
tags: ["smart contracts", "remix", "solidity", "events"]
skill: intermediate
lang: sw
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Katika Solidity, [matukio](/developers/docs/smart-contracts/anatomy/#events-and-logs) ni ishara zinazotumwa ambazo mikataba-erevu inaweza kuzichochea. Mifumo mtawanyo ya kimamlaka, au kitu chochote kilichounganishwa na API ya Ethereum JSON-RPC, kinaweza kusikiliza matukio haya na kutenda ipasavyo. Tukio linaweza pia kuwekewa faharasa ili historia ya tukio iweze kutafutwa baadaye.

## Matukio {#events}

Tukio la kawaida zaidi kwenye mnyororo wa bloku wa Ethereum wakati wa kuandika makala hii ni tukio la Uhamisho linalotolewa na tokeni za ERC20 wakati mtu anahamisha tokeni.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Sahihi ya tukio hutangazwa ndani ya msimbo wa mkataba na inaweza kutolewa kwa kutumia neno msingi "emit". Kwa mfano, tukio la uhamisho huweka kumbukumbu ya nani aliyetuma uhamisho (_from_), kwa nani (_to_) na ni tokeni ngapi zilihamishwa (_value_).

Tukirejea kwenye mkataba-erevu wetu wa Counter na kuamua kuweka kumbukumbu kila wakati thamani inapobadilishwa. Kwa vile mkataba huu haukukusudiwa kupelekwa bali kutumika kama msingi wa kuunda mkataba mwingine kwa kuuongeza: unaitwa mkataba dhahania. Katika mfano wetu wa kaunta, ingeonekana hivi:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Tofauti ya kibinafsi ya aina ya nambari kamili isiyo na alama ili kuweka idadi ya hesabu
    uint256 private count = 0;

    // Kazi inayo ongeza kaunta yetu
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Kichukuzi cha kupata thamani ya hesabu
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Kumbuka kwamba:

- **Mstari wa 5**: tunatangaza tukio letu na kile linachobeba, thamani ya zamani na thamani mpya.

- **Mstari wa 13**: Tunapoongeza tofauti yetu ya hesabu, tunatoa tukio.

Tukipeleka mkataba sasa na kuita kazi ya 'increment', tutaona kwamba Remix itaionyesha kiotomatiki ukibofya kwenye muamala mpya ndani ya safu inayoitwa logs.

![Picha ya skrini ya Remix](./remix-screenshot.png)

Kumbukumbu ni muhimu sana kwa utatuzi wa mikataba-erevu yako lakini pia ni muhimu ikiwa unaunda programu zinazotumiwa na watu tofauti na kurahisisha kufanya uchanganuzi ili kufuatilia na kuelewa jinsi mkataba-erevu wako unavyotumika. Kumbukumbu zinazotokana na miamala huonyeshwa katika wachunguzi wa tofali maarufu na unaweza pia kwa mfano kuzitumia kuunda hati za offchain kwa ajili ya kusikiliza matukio maalum na kuchukua hatua yanapotokea.
