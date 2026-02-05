---
title: Jak implementovat trh ERC-721
description: Jak dát tokenizované položky k prodeji na decentralizovanou inzertní tabuli
author: "Alberto Cuesta Cañada"
tags: [ "chytré kontrakty", "erc-721", "solidity", "tokeny" ]
skill: intermediate
lang: cs
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

V tomto článku vám ukážu, jak naprogramovat Craigslist pro blockchain Etherea.

Před Gumtree, Ebay a Craigslist byly inzertní tabule většinou z korku nebo papíru. Inzertní tabule byly na školních chodbách, v novinách, na pouličních lampách, ve výlohách obchodů.

To vše se změnilo s internetem. Počet lidí, kteří mohli vidět konkrétní inzertní tabuli, se znásobil o mnoho řádů. Díky tomu se trhy, které představují, staly mnohem efektivnějšími a rozšířily se do globální velikosti. Ebay je obrovský byznys, který má původ v těchto fyzických inzertních tabulích.

S blockchainem se tyto trhy opět změní, dovolte mi ukázat vám jak.

## Monetizace {#monetization}

Obchodní model veřejné blockchainové inzertní tabule se bude muset lišit od modelu Ebay a podobných společností.

Zaprvé je tu [úhel decentralizace](/developers/docs/web2-vs-web3/). Stávající platformy musí udržovat své vlastní servery. Decentralizovaná platforma je udržována jejími uživateli, takže náklady na provoz základní platformy pro vlastníka platformy klesají na nulu.

Pak je tu front-end, webová stránka nebo rozhraní, které umožňuje přístup k platformě. Zde existuje mnoho možností. Vlastníci platformy mohou omezit přístup a nutit všechny používat jejich rozhraní a účtovat si poplatek. Vlastníci platformy se také mohou rozhodnout otevřít přístup (Moc lidem!). a nechat kohokoli vytvářet rozhraní k platformě. Nebo se majitelé mohli rozhodnout pro jakýkoli přístup uprostřed těchto extrémů.

_Obchodní lídři s větší vizí než já budou vědět, jak to zpeněžit. Vše, co vidím, je, že je to odlišné od současného stavu a pravděpodobně ziskové._

Dále je tu úhel automatizace a plateb. Některé věci mohou být velmi [efektivně tokenizovány](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) a obchodovány na inzertní tabuli. Tokenizovaná aktiva se v blockchainu snadno převádějí. Velmi složité platební metody lze v blockchainu snadno implementovat.

Jen zde cítím obchodní příležitost. Inzertní tabuli bez provozních nákladů lze snadno implementovat, se složitými platebními cestami zahrnutými v každé transakci. Jsem si jistý, že někdo přijde s nápadem, na co to použít.

Jsem prostě šťastný, že to stavím. Podívejme se na kód.

## Implementace {#implementation}

Před nějakou dobou jsme založili [open-source repozitář](https://github.com/HQ20/contracts?ref=hackernoon.com) s příklady implementací obchodních případů a dalšími vychytávkami, prosím, podívejte se.

Kód pro tuto [inzertní tabuli Etherea](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) je tam, prosím, používejte ho a nebojte se ho využít na maximum. Jen si uvědomte, že kód nebyl auditován a musíte provést vlastní hloubkovou kontrolu, než do něj vložíte peníze.

Základy tabule nejsou složité. Všechny inzeráty na tabuli budou jen strukturou s několika poli:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Otevřený, provedený, zrušený
}
```

Takže je tu někdo, kdo inzerát zveřejňuje. Položka na prodej. Cena za položku. Stav obchodu, který může být otevřený, provedený nebo zrušený.

Všechny tyto obchody budou uloženy v mapování. Protože všechno v Solidity se zdá být mapování. Také proto, že je to pohodlné.

```solidity
mapping(uint256 => Trade) public trades;
```

Použití mapování jen znamená, že musíme před zveřejněním přijít s ID pro každý inzerát a budeme muset znát ID inzerátu, než s ním budeme moci pracovat. Existuje několik způsobů, jak se s tím vypořádat, a to buď v chytrém kontraktu, nebo ve front-endu. Pokud potřebujete nějaké rady, zeptejte se.

Dále přichází otázka, s jakými položkami se zabýváme a jaká je měna, která se používá k placení za transakci.

U položek budeme jen požadovat, aby implementovaly rozhraní [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com), což je ve skutečnosti jen způsob, jak reprezentovat položky z reálného světa v blockchainu, i když to [nejlépe funguje s digitálními aktivy](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). V konstruktoru zadáme náš vlastní kontrakt ERC721, což znamená, že jakákoli aktiva v naší inzertní tabuli musí být předem tokenizována.

U plateb uděláme něco podobného. Většina blockchainových projektů definuje svou vlastní kryptoměnu [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com). Některé jiné preferují použití mainstreamové kryptoměny jako DAI. V této inzertní tabuli se stačí při konstrukci rozhodnout, jaká bude vaše měna. Snadné.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Už se k tomu dostáváme. Máme inzeráty, položky k obchodu a měnu pro platby. Vytvořit inzerát znamená vložit položku do úschovy (escrow), abyste ukázali, že ji máte, a že jste ji nezveřejnili dvakrát, případně na jiné tabuli.

Níže uvedený kód dělá přesně to. Vloží položku do úschovy (escrow), vytvoří inzerát, provede nějaké úklidové práce.

```solidity
function openTrade(uint256 _item, uint256 _price)
  public
{
  itemToken.transferFrom(msg.sender, address(this), _item);
  trades[tradeCounter] = Trade({
    poster: msg.sender,
    item: _item,
    price: _price,
    status: "Open"
  });
  tradeCounter += 1;
  emit TradeStatusChange(tradeCounter - 1, "Open");
}
```

Přijmout obchod znamená vybrat inzerát (obchod), zaplatit cenu, obdržet položku. Níže uvedený kód načte obchod. Zkontroluje, zda je k dispozici. Zaplatí za položku. Načte položku. Aktualizuje inzerát.

```solidity
function executeTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(trade.status == "Open", "Obchod není otevřený.");
  currencyToken.transferFrom(msg.sender, trade.poster, trade.price);
  itemToken.transferFrom(address(this), msg.sender, trade.item);
  trades[_trade].status = "Executed";
  emit TradeStatusChange(_trade, "Executed");
}
```

Nakonec máme pro prodejce možnost odstoupit od obchodu dříve, než ho kupující přijme. V některých modelech by inzeráty byly místo toho aktivní po určitou dobu, než vyprší jejich platnost. Vaše volba v závislosti na návrhu vašeho trhu.

Kód je velmi podobný tomu, který se používá k provedení obchodu, pouze s tím rozdílem, že nedochází k výměně měny a položka se vrací autorovi inzerátu.

```solidity
function cancelTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(
    msg.sender == trade.poster,
    "Obchod může zrušit pouze autor."
  );
  require(trade.status == "Open", "Obchod není otevřený.");
  itemToken.transferFrom(address(this), trade.poster, trade.item);
  trades[_trade].status = "Cancelled";
  emit TradeStatusChange(_trade, "Cancelled");
}
```

A je to. Dostali jste se na konec implementace. Je docela překvapivé, jak kompaktní jsou některé obchodní koncepty, když jsou vyjádřeny v kódu, a toto je jeden z těch případů. Podívejte se na kompletní kontrakt [v našem repozitáři](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol).

## Závěr {#conclusion}

Inzertní tabule jsou běžnou konfigurací trhu, která se s internetem masivně rozšířila a stala se nesmírně populárním obchodním modelem s několika monopolními vítězi.

Inzertní tabule jsou také nástrojem, který lze snadno replikovat v blockchainovém prostředí, se velmi specifickými funkcemi, které umožní vyzvat stávající giganty.

V tomto článku jsem se pokusil propojit obchodní realitu inzertního byznysu s technologickou implementací. Tyto znalosti by vám měly pomoci vytvořit vizi a plán implementace, pokud máte správné dovednosti.

Jako vždy, pokud se chystáte vytvořit něco zábavného a uvítali byste radu, prosím, [napište mi](https://albertocuesta.es/)! Vždy rád pomohu.
