---
title: Bevezetés az okosszerződésekbe
description: Áttekintés az okosszerződésekről, kiemelve az egyedi jellemzőiket és korlátaikat.
lang: hu
---

## Mi az az okosszerződés? {#what-is-a-smart-contract}

Az „okosszerződés” egy program, mely az Ethereum blokkláncon fut. Kód (a függvényei) és adat (az állapota/státusza) gyűjteménye, mely egy bizonyos címen létezik az Ethereum blokkláncon.

Az okosszerződés egyfajta [Ethereum-számla](/developers/docs/accounts/). Ennélfogva egyenlegük van és tranzakciók irányulhatnak feléjük. Azonban nem egy felhasználó kezeli őket, ehelyett telepítve vannak a hálózatra, és a programjuk szerint futnak. A felhasználói számlák interakcióba léphetnek az okosszerződésekkel tranzakciók indításával, melyek egy függvényt hajtanak végre az okosszerződésen. Az okosszerződések szabályokat fektethetnek le, mint egy rendes szerződés, és automatikusan betartatják azokat a kód által. Az okosszerződéseket nem lehet törölni, és a velük való interakció visszafordíthatatlan.

## Előfeltételek {#prerequisites}

Ha Ön most ismerkedik a témával vagy egy kevésbé technikai bevezetést keres, akkor tekintse meg a [bevezetés az okosszerződésekbe](/smart-contracts/) című cikket.

Olvassa el a [számlákról](/developers/docs/accounts/), [tranzakciókról](/developers/docs/transactions/) és az [Ethereum virtuális gépről szóló cikkeket](/developers/docs/evm/) mielőtt belevetné magát az okosszerződések világába.

## Egy digitális ételautomata {#a-digital-vending-machine}

Talán a legjobb metafora az okosszerződésre egy ételautomata, ahogy azt [Nick Szabo](https://unenumerated.blogspot.com/) bemutatta. A megfelelő bemenetekkel egy bizonyos kimenet jön létre.

Ahhoz, hogy megkapja az ételt az automatából:

```
pénz + nasi választás = kiadott nasi
```

Ez a logika be van programozva az ételautomatába.

Az okosszerződésbe logika van programozva, akár egy ételautomatába. Egy egyszerű példa, hogyan nézne ki ez az ételautomata, ha egy okosszerződés lenne Solidity nyelven:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // A szerződés állapotváltozóinak deklarálása
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Amikor a 'VendingMachine' szerződést telepítik:
    // 1. beállítja a telepítő címet a szerződés tulajdonosaként
    // 2. set the deployed smart contract's cupcake balance to 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Allow the owner to increase the smart contract's cupcake balance
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Allow anyone to purchase cupcakes
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

Bárki írhat okosszerződést és telepítheti azt a hálózatra. A szerződés telepítéséhez elég csak megtanulnia egy [okosszerződésnyelven](/developers/docs/smart-contracts/languages/) programozni, illetve a szükséges ETH-val kell rendelkeznie. Az okosszerződés telepítése lényegében egy tranzakció, így ugyanúgy ki kell fizetnie a [gázt](/developers/docs/gas/), mint egy egyszerű ETH-átutalás esetében. Ugyanakkor a szerződéstelepítés gázköltsége magasabb.

Az Ethereum fejlesztőbarát okosszerződésnyelvekkel rendelkezik:

- Solidity
- Vyper

[Többet a nyelvekről](/developers/docs/smart-contracts/languages/)

Azonban be kell őket fordítani telepítés előtt, hogy az Ethereum virtuális gép értelmezni és tárolni tudja majd a szerződést. [Többet a befordításról](/developers/docs/smart-contracts/compiling/)

## Összeilleszthetőség {#composability}

Az okosszerződések nyilvánosak az Ethereumon, így nyílt API-ként is tekinthetünk rájuk. Ez azt jelenti, hogy meghívhat más okosszerződéseket az Ön szerződésében, hogy nagymértékben kiterjeszthesse a lehetőségeket. A szerződések még más szerződéseket is tudnak telepíteni.

Tudjon meg többet az [okosszerződések összeilleszthetőségről](/developers/docs/smart-contracts/composability/).

## Korlátok {#limitations}

Az okosszerződések önmagukban nem képesek információt lekérni a „külvilági” eseményekről, mivel nem tudnak adatot szerezni a láncon kívüli forrásokból. Tehát nem tudnak válaszolni a világ történéseire. Ez a tervezett logikájuk. A külső információkra való támaszkodás veszélyeztetheti a biztonság és a decentralizáció szempontjából fontos konszenzust.

Ugyanakkor fontos a blokklánchoz tartozó alkalmazásoknak, hogy láncon kívüli adatokat használhassanak. A megoldás az [orákulum](/developers/docs/oracles/), amely egy olyan eszköz, ami láncon kívüli adatokat kap fel és tesz elérhetővé az okosszerződések számára.

Az okosszerződések másik korlátja a maximális méret. Legfeljebb 24 KB méretű lehet egy okosszerződés, különben nem lesz elegendő gáz a működéséhez. Ezt meg lehet kerülni a [gyémántminta](https://eips.ethereum.org/EIPS/eip-2535) használatával.

## Több aláírásos szerződések {#multisig}

A több aláírásos szerződések olyan okosszerződésszámlák, amelyeknek több érvényes aláírás kell, hogy egy tranzakciót végrehajtsanak. Ez nagyon hasznos az egyetlen meghibásodási pont elkerülésére az olyan szerződéseknél, amelyek jelentős mennyiségű ethert vagy más tokent tartanak. A több aláírásos szerződések megosztják a szerződés­-végrehajtási és kulcskezelési felelősséget több fél között, és így nem kell attól tartani, hogy az egyetlen privát kulcs elveszik, és így a pénzeszközök elérhetetlenné válnak. Ebből az okból kifolyólag a több aláírásos szerződéseket egyszerű DAO irányításra is lehet használni. A több aláírásos szerződés N aláírást igényel M lehetséges elfogadható aláírásból (ahol N ≤ M, és M > 1) ahhoz, hogy végrehajtsa a tranzakciót. Gyakran használják a következő kombinációkat: `N = 3, M = 5` és `N = 4, M = 7`. A 4/7 több aláírásos szerződés négyet igényel a hét lehetséges érvényes aláírásból. Tehát a pénzeszközökhöz akkor is hozzáférnek, ha három aláírás elveszik. Ebben az esetben a kulcsokbirtokosok többségének egyet kell értenie és alá kell írnia ahhoz, hogy a szerződés végrehajtható legyen.

## Okosszerződés-erőforrások {#smart-contract-resources}

**OpenZeppelin Contracts –** **_Könyvtár a biztonságos okosszerződésfejlesztéshez._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Közösségi Fórum](https://forum.openzeppelin.com/c/general/16)

## További olvasnivaló {#further-reading}

- [Coinbase: Mi az az okosszerződés?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: Mi az az okosszerződés?](https://chain.link/education/smart-contracts)
- [Video: Egyszerű magyarázat: Okosszerződések](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: Web3 tanulási és ellenőrzési platform](https://updraft.cyfrin.io)
