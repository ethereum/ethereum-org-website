---
title: Kuingiliana na mikataba mingine kutoka Solidity
description: Jinsi ya kupeleka mkataba-erevu kutoka kwa mkataba uliopo na kuingiliana nao
author: "jdourlens"
tags: ["smart contracts", "solidity", "remix", "deploying", "composability"]
skill: advanced
lang: sw
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Katika mafunzo yaliyopita tulijifunza mengi [jinsi ya kupeleka mkataba-erevu wako wa kwanza](/developers/tutorials/deploying-your-first-smart-contract/) na kuongeza baadhi ya vipengele kwake kama vile [kudhibiti ufikiaji kwa virekebishaji](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) au [kushughulikia makosa katika Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). Katika funzo hili tutajifunza jinsi ya kupeleka mkataba-erevu kutoka kwa mkataba uliopo na kuingiliana nao.

Tutaunda mkataba unaomwezesha mtu yeyote kuwa na mkataba-erevu wake wa `Counter` kwa kuunda kiwanda chake, jina lake litakuwa `CounterFactory`. Kwanza huu hapa msimbo wa mkataba-erevu wetu wa awali wa `Counter`:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "Wewe si mmiliki wa mkataba");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "Unahitaji kutumia kiwanda");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}
```

Kumbuka kuwa tumerekebisha kidogo msimbo wa mkataba ili kufuatilia anwani ya kiwanda na anwani ya mmiliki wa mkataba. Unapoita msimbo wa mkataba kutoka kwa mkataba mwingine, `msg.sender` itarejelea anwani ya kiwanda chetu cha mkataba. Hili ni **jambo muhimu sana kuelewa** kwani kutumia mkataba kuingiliana na mikataba mingine ni jambo la kawaida. Kwa hivyo unapaswa kuwa mwangalifu kuhusu nani ni mtumaji katika visa tata.

Kwa ajili hii, pia tuliongeza kirekebishaji cha `onlyFactory` kinachohakikisha kuwa chaguo za kukokotoa zinazobadilisha hali zinaweza kuitwa tu na kiwanda ambacho kitapitisha mwitaji halisi kama kigezo.

Ndani ya `CounterFactory` yetu mpya ambayo itasimamia Kaunta zingine zote, tutaongeza ramani ambayo itahusisha mmiliki na anwani ya mkataba wake wa kaunta:

```solidity
mapping(address => Counter) _counters;
```

Katika Ethereum, ramani ni sawa na vitu katika javascript, zinawezesha kuweka ufunguo wa aina A kwa thamani ya aina B. Katika hali hii tunapanga anwani ya mmiliki na mfano wa Kaunta yake.

Kuanzisha Kaunta mpya kwa ajili ya mtu kutaonekana kama hivi:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Kwanza tunakagua kama mtu huyo tayari anamiliki kaunta. Ikiwa hamiliki kaunta, tunaanzisha kaunta mpya kwa kupitisha anwani yake kwa kijenzi cha `Counter` na kukabidhi mfano mpya ulioundwa kwenye ramani.

Ili kupata hesabu ya Kaunta maalum itaonekana kama hivi:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

Chaguo la kwanza la kukokotoa hukagua ikiwa mkataba wa Kaunta upo kwa anwani fulani na kisha huita mbinu ya `getCount` kutoka kwa mfano. Chaguo la pili la kukokotoa: `getMyCount` ni njia fupi tu ya kupitisha `msg.sender` moja kwa moja kwenye chaguo la kukokotoa la `getCount`.

Chaguo la kukokotoa la `increment` linafanana kabisa lakini hupitisha mtumaji asili wa muamala kwa mkataba wa `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Kumbuka kwamba ikiitwa mara nyingi sana, kaunta yetu inaweza kuwa mwathirika wa kufurika. Unapaswa kutumia [maktaba ya SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) kadri iwezekanavyo ili kujikinga na hali hii inayowezekana.

Ili kupeleka mkataba wetu, utahitaji kutoa msimbo wa `CounterFactory` na `Counter`. Wakati wa kupeleka kwa mfano katika Remix utahitaji kuchagua CounterFactory.

Huu hapa msimbo kamili:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "Wewe si mmiliki wa mkataba");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "Unahitaji kutumia kiwanda");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}

contract CounterFactory {

    mapping(address => Counter) _counters;

    function createCounter() public {
        require (_counters[msg.sender] == Counter(0));
        _counters[msg.sender] = new Counter(msg.sender);
    }

    function increment() public {
        require (_counters[msg.sender] != Counter(0));
        Counter(_counters[msg.sender]).increment(msg.sender);
    }

    function getCount(address account) public view returns (uint256) {
        require (_counters[account] != Counter(0));
        return (_counters[account].getCount());
    }

    function getMyCount() public view returns (uint256) {
        return (getCount(msg.sender));
    }

}
```

Baada ya kuandaa, katika sehemu ya kupeleka ya Remix utachagua kiwanda kitakachopelekwa:

![Ukichagua kiwanda cha kupelekwa katika Remix](./counterfactory-deploy.png)

Kisha unaweza kucheza na kiwanda chako cha mkataba na uangalie mabadiliko ya thamani. Ikiwa ungependa kuita mkataba-erevu kutoka kwa anwani tofauti utahitaji kubadilisha anwani katika uteuzi wa Akaunti ya Remix.
