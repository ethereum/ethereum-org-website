---
title: Bevezetés az okosszerződésekbe
description: Egy áttekintő az okosszerződésekről kiemelve az egyedi karakterisztikájukat és a határaikat.
lang: hu
---

## Mi az az okosszerződés?

Az "okosszerződés" egy program, mely az Ethereum blokkláncon fut. Kód (a függvényei) és adat (az állapota) gyűjteménye, mely egy bizonyos címen létezik az Ethereum blokkláncon.

Az okosszerződés egy [Ethereum számla](/developers/docs/accounts/) típus. Ez azt jelenti, hogy van egy egyenlegük és tranzakciókat tudnak indítani a hálózaton. Azonban nem egy felhasználó kezeli őket, ehelyett telepítve vannak a hálózatra és úgy futnak, ahogy programozták őket. A felhasználói számlák interakcióba léphetnek az okosszerződésekkel tranzakciók indításával, melyek egy függvényt hajtanak végre az okosszerződésen. Az okosszerződések szabályokat fektethetnek le, mint egy rendes szerződés, és automatikusan betartatják azokat a kód által.

## Előfeltételek {#prerequisites}

Olvasd el a [számlákról](/developers/docs/accounts/), [tranzakciókról](/developers/docs/transactions/) és az [Ethereum virtuális gépről szóló cikkeket](/developers/docs/evm/), mielőtt beleugranál az okosszerződések világába.

## Egy digitális ételautomata {#a-digital-vending-machine}

Talán a legjobb okosszerződés metafora az ételautomata, ahogy Nick Szabo fogalmazta meg. A megfelelő bemenetekkel, egy bizonyos kimenet jön létre.

Hogy megkapd a nasit az ételautomatából:

```
pénz + nasi választás = kiadott nasi
```

Ez a logika be van programozva az ételautomatába.

Az okosszerződésbe logika van beprogramozva, mint egy ételautomatába. Az alábbi példában bemutatjuk, hogy hogy nézne ki ez az ételautomata egy okosszerződés formájában:

```solidity
pragma solidity 0.6.11;

contract VendingMachine {

    // A szerződés állapotváltozóinak deklarálása
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Amikor a 'VendingMachine' szerződést telepítik:
    // 1. beállítja a telepítő címet a szerződés tulajdonosaként
    // 2. beállítja a telepített okosszerződés egyenlegét 100 muffinra
    constructor() public {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // A tulajdonos növelheti az okosszerződés muffin egyenlegét
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Bárki vásárolhat muffint
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Mint ahogy az ételautomaták szükségtelenné teszik az árusító alkalmazottat, az okosszerződések is számos iparágban leválthatják a közvetítőket.

## Nem engedélyköteles {#permissionless}

Bárki írhat okosszerződést és telepítheti a hálózatra. Csak meg kell tanulnod egy [okosszerződés nyelven](/developers/docs/smart-contracts/languages/) programoznod és elegendő ETH-tel rendelkezned, hogy telepítsd a szerződést. Egy okosszerződés telepítés lényegében egy tranzakció, így ki kell fizetned a [gázt](/developers/docs/gas/), ahogy kifizetnéd egy egyszerű ETH átutalás esetében is. A gáz költségek azonban sokkal magasabbak a szerződés telepítés esetében.

Az Ethereum fejlesztőbarát okosszerződés nyelvekkel rendelkezik:

- Solidity
- Vyper

[Többet a nyelvekről](/developers/docs/smart-contracts/languages/)

Azonban be kell őket fordítani telepítés előtt, hogy az Ethereum virtuális gép értelmezni és tárolni tudja majd a szerződést. [Többet a fordításról](/developers/docs/smart-contracts/compiling/)

## Összeilleszthetőség {#composability}

Az okosszerződések nyilvánosak az Ethereumon, így nyílt API-ként is tekinthetünk rájuk. Ez azt jelenti, hogy meghívhatsz más okosszerződéseket a te szerződésedben, hogy nagymértékben kiterjeszthesd a lehetőségeket. A szerződések még más szerződéseket is telepíteni tudnak.

Tudj meg többet az [okosszerződés összeilleszthetőségről](/developers/docs/smart-contracts/composability/).

## Korlátok {#limitations}

Az okosszerződések önmagukban nem képesek információt lekérni a "külvilági" eseményekről, mivel nem tudnak HTTP kérvényeket küldeni. Ez a design szerinti külső információkra való támaszkodás veszélyeztetheti a biztonság és a decentralizáció szempontjából fontos konszenzust.

Az [orákulumok](/developers/docs/oracles/) használata megoldást nyújt ezen probléma megoldására.

## Okosszerződés anyagok {#smart-contract-resources}

**OpenZeppelin Contracts -** **_Library biztonságos okosszerződés fejlesztéshez._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Közösségi Fórum](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Biztonságos, egyszerű, flexibilis okosszerződés építőelemek._**

- [Dappsys](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

## További olvasnivaló {#further-reading}

- [Okosszerződések: A blokklánc technológia, mely leváltja az ügyvédeket](https://blockgeeks.com/guides/smart-contracts/) _– Blockgeeks_
- [Okosszerződés fejlesztés bevált gyakorlatai](https://yos.io/2019/11/10/smart-contract-development-best-practices/) _– Nov 10, 2019 - Yos Riady_
