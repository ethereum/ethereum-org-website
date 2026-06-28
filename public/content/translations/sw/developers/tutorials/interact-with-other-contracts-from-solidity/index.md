---
title: Kuingiliana na mikataba mingine kutoka Solidity
description: Jinsi ya kusambaza mkataba mahiri kutoka kwenye mkataba uliopo na kuingiliana nao
author: "jdourlens"
tags: ["mikataba mahiri", "Solidity", "Remix", "kusambaza", "utunzi"]
skill: advanced
breadcrumb: Mwingiliano wa mikataba
lang: sw
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Katika mafunzo yaliyopita tulijifunza mengi kuhusu [jinsi ya kusambaza mkataba mahiri wako wa kwanza](/developers/tutorials/deploying-your-first-smart-contract/) na kuongeza baadhi ya vipengele kwake kama vile [kudhibiti ufikiaji kwa kutumia virekebishaji](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) au [ushughulikiaji wa makosa katika Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). Katika mafunzo haya tutajifunza jinsi ya kusambaza mkataba mahiri kutoka kwenye mkataba uliopo na kuingiliana nao.

Tutaunda mkataba unaomwezesha mtu yeyote kuwa na mkataba mahiri wake wa `Counter` kwa kuunda kiwanda chake, jina lake litakuwa `CounterFactory`. Kwanza hapa kuna msimbo wa mkataba mahiri wetu wa awali wa `Counter`:

```solidity
pragma solidity 0.5.17;

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

Kumbuka kwamba tulibadilisha kidogo msimbo wa mkataba ili kufuatilia anwani ya kiwanda na anwani ya mmiliki wa mkataba. Unapoita msimbo wa mkataba kutoka kwenye mkataba mwingine, msg.sender itarejelea anwani ya kiwanda chetu cha mkataba. Hili ni **suala muhimu sana kuelewa** kwani kutumia mkataba kuingiliana na mikataba mingine ni jambo la kawaida. Kwa hivyo unapaswa kuwa mwangalifu kuhusu nani ni mtumaji katika hali ngumu.

Kwa hili pia tuliongeza kirekebishaji cha `onlyFactory` ambacho kinahakikisha kwamba kipengele cha kubadilisha hali kinaweza kuitwa tu na kiwanda ambacho kitapisha mpigaji wa asili kama kigezo.

Ndani ya `CounterFactory` yetu mpya ambayo itasimamia Counters zingine zote, tutaongeza ramani (mapping) ambayo itahusisha mmiliki na anwani ya mkataba wake wa counter:

```solidity
mapping(address => Counter) _counters;
```

Katika Ethereum, ramani (mapping) ni sawa na vitu (objects) katika JavaScript, zinawezesha kuweka ramani ya ufunguo wa aina A kwa thamani ya aina B. Katika kesi hii tunaweka ramani ya anwani ya mmiliki na mfano wa Counter yake.

Kuanzisha Counter mpya kwa ajili ya mtu kutaonekana hivi:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Kwanza tunaangalia ikiwa mtu huyo tayari anamiliki counter. Ikiwa hamiliki counter tunaanzisha counter mpya kwa kupitisha anwani yake kwenye konstrukta ya `Counter` na kugawa mfano ulioundwa hivi karibuni kwenye ramani.

Ili kupata hesabu ya Counter maalum itaonekana hivi:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

Kazi ya kwanza inaangalia ikiwa mkataba wa Counter upo kwa anwani iliyotolewa na kisha inaita mbinu ya `getCount` kutoka kwenye mfano. Kazi ya pili: `getMyCount` ni njia fupi tu ya kupitisha msg.sender moja kwa moja kwenye kazi ya `getCount`.

Kazi ya `increment` inafanana sana lakini inapitisha mtumaji wa asili wa muamala kwenye mkataba wa `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Kumbuka kwamba ikiwa itaitwa mara nyingi sana, counter yetu inaweza kuwa mwathirika wa mzidio. Unapaswa kutumia maktaba ya [SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) kadiri iwezekanavyo ili kujilinda kutokana na hali hii inayowezekana.

Ili kusambaza mkataba wetu, utahitaji kutoa msimbo wa `CounterFactory` na `Counter`. Wakati wa kusambaza kwa mfano katika Remix utahitaji kuchagua CounterFactory.

Hapa kuna msimbo kamili:

```solidity
pragma solidity 0.5.17;

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

Baada ya ukusanyaji, katika sehemu ya kusambaza ya Remix utachagua kiwanda kitakachosambazwa:

![Selecting the factory to be deployed in Remix](./counterfactory-deploy.png)

Kisha unaweza kucheza na kiwanda chako cha mkataba na kuangalia thamani ikibadilika. Ikiwa ungependa kuita mkataba mahiri kutoka kwenye anwani tofauti utahitaji kubadilisha anwani katika sehemu ya kuchagua Akaunti ya Remix.