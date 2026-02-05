---
title: Jak nastavit Tellor jako vaše orákulum
description: Průvodce, jak začít s integrací orákula Tellor do vašeho protokolu
author: "Tellor"
lang: cs
tags: [ "solidity", "smart kontrakt účty", "orákula" ]
skill: beginner
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Rychlý kvíz: Váš protokol je téměř hotový, ale potřebuje orákulum, aby získal přístup k offchainovým datům... Co uděláte?

## Doporučené předpoklady {#soft-prerequisites}

Cílem tohoto příspěvku je, aby byl přístup ke zdroji dat z orákula co nejjednodušší a nejsrozumitelnější. Nicméně předpokládáme následující úroveň vašich programátorských dovedností, abychom se mohli soustředit na aspekt orákula.

Předpoklady:

- umíte se orientovat v terminálu
- máte nainstalovaný npm
- víte, jak používat npm ke správě závislostí

Tellor je funkční open-source orákulum připravené k implementaci. Tento průvodce pro začátečníky je zde, aby ukázal, jak snadno lze Tellor zprovoznit a poskytnout tak vašemu projektu plně decentralizované orákulum odolné vůči cenzuře.

## Přehled {#overview}

Tellor je systém orákul, kde strany mohou požadovat hodnotu offchainového datového bodu (např. BTC/USD) a reportéři soutěží o přidání této hodnoty do onchainové datové banky, která je přístupná všem chytrým kontraktům na Ethereu. Vstupy do této datové banky jsou zabezpečeny sítí reportérů, kteří stakují. Tellor využívá kryptoekonomické motivační mechanismy, odměňuje poctivé reportéry za předkládání dat a trestá podvodníky prostřednictvím vydávání tokenu Telloru, Tributes (TRB), a mechanismu pro řešení sporů.

V tomto tutoriálu si projdeme:

- Nastavení počáteční sady nástrojů, kterou budete potřebovat pro zprovoznění.
- Projdeme si jednoduchý příklad.
- Vypíšeme si adresy testnetů, na kterých můžete v současné době Tellor testovat.

## UsingTellor {#usingtellor}

První věc, kterou budete chtít udělat, je nainstalovat základní nástroje potřebné k použití Telloru jako vašeho orákula. Použijte [tento balíček](https://github.com/tellor-io/usingtellor) k instalaci uživatelských kontraktů Tellor:

`npm install usingtellor`

Po instalaci to umožní vašim kontraktům dědit funkce z kontraktu ‚UsingTellor‘.

Skvělé! Nyní, když máte připravené nástroje, projděme si jednoduché cvičení, ve kterém získáme cenu bitcoinu:

### Příklad BTC/USD {#btcusd-example}

Děděte kontrakt UsingTellor a předejte adresu Telloru jako argument konstruktoru:

Toto je příklad:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //Tento kontrakt má nyní přístup ke všem funkcím v UsingTellor

constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

function setBtcPrice() public {
    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryId = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

Úplný seznam adres kontraktů naleznete [zde](https://docs.tellor.io/tellor/the-basics/contracts-reference).

Pro usnadnění použití je repozitář UsingTellor dodáván s verzí kontraktu [Tellor Playground](https://github.com/tellor-io/TellorPlayground) pro snazší integraci. Seznam užitečných funkcí naleznete [zde](https://github.com/tellor-io/sampleUsingTellor#tellor-playground).

Pro robustnější implementaci orákula Tellor se podívejte na úplný seznam dostupných funkcí [zde](https://github.com/tellor-io/usingtellor/blob/master/README.md).
