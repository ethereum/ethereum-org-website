---
title: Kuingiliana na mikataba mingine kutoka Solidity
description: Jinsi ya kusambaza mkataba mahiri kutoka kwenye mkataba uliopo na kuingiliana nao
author: "jdourlens"
tags: ["mikataba mahiri", "Solidity", "Remix", "kusambaza", "utunzi"]
skill: advanced
breadcrumb: Mwingiliano wa mikataba
lang: sw
published: 2020-04-05
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Katika mafunzo yaliyopita tulijifunza mengi [jinsi ya kusambaza mkataba mahiri wako wa kwanza](/developers/tutorials/deploying-your-first-smart-contract/) na kuongeza baadhi ya vipengele kwake kama [kudhibiti ufikiaji kwa kutumia virekebishaji](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) au [kushughulikia makosa katika Solidity](https://docs.soliditylang.org/en/latest/control-structures.html#error-handling-assert-require-revert-and-exceptions). Katika mafunzo haya tutajifunza jinsi ya kusambaza mkataba mahiri kutoka kwenye mkataba uliopo na kuingiliana nao.

Tutaunda mkataba unaowezesha mtu yeyote kuwa na mkataba mahiri wake wa `Counter` kwa kuunda kiwanda (factory) kwa ajili yake, jina lake litakuwa `CounterFactory`. Kwanza hapa kuna msimbo wa mkataba mahiri wetu wa awali wa `Counter`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
        _;
    }

     constructor(address owner) {
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

Kumbuka kwamba tulibadilisha kidogo msimbo wa mkataba ili kufuatilia anwani ya kiwanda na anwani ya mmiliki wa mkataba. Unapoita msimbo wa mkataba kutoka kwenye mkataba mwingine, msg.sender itarejelea anwani ya kiwanda chetu cha mkataba. Hili ni **jambo muhimu sana kuelewa** kwani kutumia mkataba kuingiliana na mikataba mingine ni jambo la kawaida. Kwa hivyo unapaswa kuwa mwangalifu kuhusu nani ni mtumaji katika hali ngumu.

Kwa hili pia tuliongeza kirekebishaji cha `onlyFactory` ambacho kinahakikisha kwamba kipengele cha kubadilisha hali kinaweza kuitwa tu na kiwanda ambacho kitapisha mpigaji wa asili kama kigezo.

Ndani ya `CounterFactory` yetu mpya itakayosimamia Counters zingine zote, tutaongeza ramani (mapping) itakayohusisha mmiliki na anwani ya mkataba wake wa counter:

```solidity
mapping(address => Counter) _counters;
```

Katika Solidity, [ramani (mappings)](https://docs.soliditylang.org/en/latest/types.html#mapping-types) zinafanana na vitu (objects) katika JavaScript: zinahusisha ufunguo wa aina A na thamani ya aina B. Katika hali hii tunahusisha anwani ya mmiliki na mfano (instance) wa Counter yake.

Kuanzisha Counter mpya kwa ajili ya mtu kutaonekana hivi:

```solidity
  function createCounter() public {
      require(address(_counters[msg.sender]) == address(0), "You already have a counter");
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Kwanza tunaangalia ikiwa mtu huyo tayari anamiliki counter. Ramani hurudisha thamani chaguo-msingi kwa funguo ambazo hazikuwahi kuwekwa, ambayo kwa aina ya mkataba ni anwani sifuri, kwa hivyo tunalinganisha anwani ya mkataba iliyohifadhiwa na `address(0)`. Ikiwa hamiliki counter tunaanzisha counter mpya kwa kupitisha anwani yake kwenye konstrukta ya `Counter` na kukabidhi mfano mpya ulioundwa kwenye ramani.

Ili kupata hesabu ya Counter maalum itaonekana hivi:

```solidity
function getCount(address account) public view returns (uint256) {
    require(address(_counters[account]) != address(0), "This account has no counter");
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

Kipengele cha kwanza kinaangalia ikiwa mkataba wa Counter upo kwa anwani iliyotolewa na kisha kuita mbinu ya `getCount` kutoka kwenye mfano. Kipengele cha pili: `getMyCount` ni njia fupi tu ya kupitisha msg.sender moja kwa moja kwenye kipengele cha `getCount`.

Kipengele cha `increment` kinafanana sana lakini kinapitisha mtumaji wa asili wa muamala kwenye mkataba wa `Counter`:

```solidity
function increment() public {
      require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
      _counters[msg.sender].increment(msg.sender);
  }
```

Tangu Solidity 0.8, hesabu [hukaguliwa kwa chaguo-msingi](https://docs.soliditylang.org/en/latest/control-structures.html#checked-or-unchecked-arithmetic): ikiwa `_count` itawahi kufurika (overflow), `_count++` itatengua muamala badala ya kuzunguka kimya kimya, kwa hivyo hakuna maktaba ya ziada kama SafeMath inayohitajika.

Ili kusambaza mkataba wetu, utahitaji kutoa msimbo wa `CounterFactory` na `Counter`. Wakati wa kusambaza kwa mfano katika Remix utahitaji kuchagua CounterFactory.

Hapa kuna msimbo kamili:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
        _;
    }

     constructor(address owner) {
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
        require(address(_counters[msg.sender]) == address(0), "You already have a counter");
        _counters[msg.sender] = new Counter(msg.sender);
    }

    function increment() public {
        require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
        _counters[msg.sender].increment(msg.sender);
    }

    function getCount(address account) public view returns (uint256) {
        require(address(_counters[account]) != address(0), "This account has no counter");
        return (_counters[account].getCount());
    }

    function getMyCount() public view returns (uint256) {
        return (getCount(msg.sender));
    }

}
```

Baada ya ukusanyaji, katika sehemu ya kusambaza ya Remix utachagua kiwanda kitakachosambazwa:

![Kuchagua kiwanda kitakachosambazwa katika Remix](./counterfactory-deploy.png)

Kisha unaweza kucheza na kiwanda chako cha mkataba na kuangalia thamani ikibadilika. Ikiwa ungependa kuita mkataba mahiri kutoka kwenye anwani tofauti utahitaji kubadilisha anwani katika uteuzi wa Akaunti wa Remix.
