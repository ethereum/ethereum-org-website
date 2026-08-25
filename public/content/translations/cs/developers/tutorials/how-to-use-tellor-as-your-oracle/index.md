---
title: "Jak nastavit Tellor jako vaše orákulum"
description: "Průvodce pro začátek s integrací orákula Tellor do vašeho protokolu"
author: "Tellor"
lang: cs
tags: ["Solidity", "chytré kontrakty", "orákula"]
skill: beginner
breadcrumb: "Orákulum Tellor"
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Bleskový kvíz: Váš protokol je téměř hotový, ale potřebuje orákulum pro přístup k offchain datům... Co uděláte?

## (Mírné) Předpoklady {#soft-prerequisites}

Tento článek si klade za cíl učinit přístup k datům z orákula co nejjednodušším a nejpřímočařejším. Přesto předpokládáme následující úroveň vašich programátorských dovedností, abychom se mohli soustředit na samotné orákulum.

Předpoklady:

- umíte se pohybovat v terminálu
- máte nainstalované npm
- víte, jak používat npm ke správě závislostí

Tellor je živé a open-source orákulum připravené k implementaci. Tento průvodce pro začátečníky je tu proto, aby ukázal, jak snadno lze Tellor zprovoznit a poskytnout tak vašemu projektu plně decentralizované orákulum odolné vůči cenzuře.

## Přehled {#overview}

Tellor je systém orákula, kde mohou strany požadovat hodnotu offchain datového bodu (např. BTC/USD) a reportéři soutěží o přidání této hodnoty do onchain databanky, která je přístupná všem chytrým kontraktům na Ethereu. Vstupy do této databanky jsou zabezpečeny sítí reportérů, kteří poskytli stake. Tellor využívá kryptoekonomické motivační mechanismy, které odměňují poctivé odesílání dat reportéry a trestají špatné aktéry prostřednictvím emise tokenu Telloru, Tributes (TRB), a mechanismu řešení sporů.

V tomto tutoriálu si projdeme:

- Nastavení počáteční sady nástrojů, kterou budete potřebovat k zprovoznění.
- Projití jednoduchého příkladu.
- Vypsání testnet adres sítí, na kterých můžete Tellor aktuálně testovat.

## UsingTellor {#usingtellor}

První věc, kterou budete chtít udělat, je nainstalovat základní nástroje nezbytné pro používání Telloru jako vašeho orákula. Použijte [tento balíček](https://github.com/tellor-io/usingtellor) k instalaci uživatelských kontraktů Telloru:

`npm install usingtellor`

Po instalaci to umožní vašim kontraktům dědit funkce z kontraktu 'UsingTellor'.

Skvělé! Nyní, když máte nástroje připravené, pojďme si projít jednoduché cvičení, kde získáme cenu bitcoinu:

### Příklad BTC/USD {#btcusd-example}

Zděďte kontrakt UsingTellor a předejte adresu Telloru jako argument konstruktoru:

Zde je příklad:

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

Pro kompletní seznam adres kontraktů se podívejte [sem](https://docs.tellor.io/tellor/the-basics/contracts-reference).

Pro snadnější použití obsahuje repozitář UsingTellor verzi kontraktu [Tellor Playground](https://github.com/tellor-io/TellorPlayground) pro jednodušší integraci. Seznam užitečných funkcí najdete [zde](https://github.com/tellor-io/sampleUsingTellor#tellor-playground).

Pro robustnější implementaci orákula Tellor se podívejte na úplný seznam dostupných funkcí [zde](https://github.com/tellor-io/usingtellor/blob/master/README.md).