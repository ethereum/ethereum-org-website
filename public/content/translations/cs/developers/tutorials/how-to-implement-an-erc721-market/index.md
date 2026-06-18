---
title: Jak implementovat trh s ERC-721
description: "Jak nabídnout tokenizované položky k prodeji na decentralizovaném inzertním portálu"
author: "Alberto Cuesta Cañada"
tags: ["chytré kontrakty", "erc-721", "Solidity", "tokeny"]
skill: intermediate
breadcrumb: Trh s ERC-721
lang: cs
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

V tomto článku vám ukážu, jak naprogramovat Craigslist pro blockchain Etherea.

Před Gumtree, Ebay a Craigslistem byly inzertní tabule většinou z korku nebo papíru. Inzertní tabule byly na školních chodbách, v novinách, na pouličních lampách a ve výlohách.

To vše se změnilo s internetem. Počet lidí, kteří mohli vidět konkrétní inzertní tabuli, se znásobil o mnoho řádů. Díky tomu se trhy, které představují, staly mnohem efektivnějšími a rozšířily se do globálních rozměrů. Ebay je obrovský byznys, který má své kořeny právě v těchto fyzických inzertních tabulích.

S blockchainem se tyto trhy opět změní, dovolte mi ukázat vám jak.

## Monetizace {#monetization}

Obchodní model veřejné blockchainové inzertní tabule se bude muset lišit od modelu Ebay a podobných společností.

Zaprvé je tu [úhel pohledu decentralizace](/developers/docs/web2-vs-web3/). Stávající platformy musí udržovat své vlastní servery. Decentralizovaná platforma je udržována svými uživateli, takže náklady na provoz samotného jádra platformy klesají pro jejího vlastníka na nulu.

Pak je tu front-end, webová stránka nebo rozhraní, které poskytuje přístup k platformě. Zde existuje mnoho možností. Vlastníci platformy mohou omezit přístup a donutit všechny používat jejich rozhraní za poplatek. Vlastníci platformy se také mohou rozhodnout otevřít přístup (Moc lidu!) a nechat kohokoli vytvořit rozhraní k platformě. Nebo by se vlastníci mohli rozhodnout pro jakýkoli přístup někde mezi těmito extrémy.

_Obchodní lídři s větší vizí než já budou vědět, jak to zpeněžit. Já vidím jen to, že se to liší od současného stavu a pravděpodobně to bude ziskové._

Dále je tu hledisko automatizace a plateb. Některé věci lze velmi [efektivně tokenizovat](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) a obchodovat s nimi na inzertní tabuli. Tokenizovaná aktiva se v blockchainu snadno převádějí. V blockchainu lze snadno implementovat vysoce komplexní platební metody.

Cítím tu prostě obchodní příležitost. Inzertní tabuli bez provozních nákladů lze snadno implementovat, přičemž do každé transakce lze zahrnout složité platební cesty. Jsem si jistý, že někdo přijde s nápadem, k čemu to využít.

Já jsem prostě rád, že to mohu budovat. Pojďme se podívat na kód.

## Implementace {#implementation}

Před nějakou dobou jsme založili [open source repozitář](https://github.com/HQ20/contracts?ref=hackernoon.com) s ukázkovými implementacemi obchodních případů a dalšími vychytávkami, určitě se na něj podívejte.

Kód pro tuto [inzertní tabuli na Ethereu](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) je tam, prosím, používejte ho a zkoušejte, co vydrží. Jen mějte na paměti, že kód neprošel auditem a předtím, než do něj vložíte peníze, musíte provést vlastní hloubkovou kontrolu (due diligence).

Základy této tabule nejsou složité. Všechny inzeráty na tabuli budou jen struktura (struct) s několika poli:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Otevřeno, Provedeno, Zrušeno
}
```

Takže je tu někdo, kdo inzerát zveřejňuje. Položka na prodej. Cena položky. Stav obchodu, který může být otevřený (open), provedený (executed) nebo zrušený (cancelled).

Všechny tyto obchody budou uchovávány v mapování (mapping). Protože všechno v Solidity se zdá být mapováním. A také proto, že je to pohodlné.

```solidity
mapping(uint256 => Trade) public trades;
```

Použití mapování jen znamená, že musíme vymyslet ID pro každý inzerát před jeho zveřejněním, a budeme muset znát ID inzerátu, než s ním budeme moci pracovat. Existuje několik způsobů, jak se s tím vypořádat, ať už v chytrém kontraktu, nebo ve front-endu. Pokud potřebujete nějaké tipy, zeptejte se.

Dále přichází otázka, co jsou ty položky, se kterými obchodujeme, a co je to za měnu, která se používá k platbě za transakci.

U položek budeme pouze požadovat, aby implementovaly rozhraní [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com), což je ve skutečnosti jen způsob reprezentace položek reálného světa v blockchainu, ačkoli to [funguje nejlépe s digitálními aktivy](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). V konstruktoru specifikujeme náš vlastní ERC-721 kontrakt, což znamená, že jakákoli aktiva na naší inzertní tabuli musí být předem tokenizována.

Pro platby uděláme něco podobného. Většina blockchainových projektů definuje svou vlastní [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com) kryptoměnu. Některé jiné raději používají nějakou mainstreamovou, jako je DAI. U této inzertní tabule se stačí při vytváření rozhodnout, jaká bude vaše měna. Jednoduché.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Už se k tomu dostáváme. Máme inzeráty, položky k obchodu a měnu pro platby. Vytvořit inzerát znamená vložit položku do úschovy (escrow), abyste ukázali, že ji máte a že jste ji nezveřejnili dvakrát, případně na jiné tabuli.

Níže uvedený kód dělá přesně to. Vloží položku do úschovy, vytvoří inzerát a provede nezbytnou údržbu.

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

Přijmout obchod znamená vybrat inzerát (obchod), zaplatit cenu a obdržet položku. Níže uvedený kód načte obchod. Zkontroluje, zda je k dispozici. Zaplatí za položku. Vyzvedne položku. Aktualizuje inzerát.

```solidity
function executeTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(trade.status == "Open", "Trade is not Open.");
  currencyToken.transferFrom(msg.sender, trade.poster, trade.price);
  itemToken.transferFrom(address(this), msg.sender, trade.item);
  trades[_trade].status = "Executed";
  emit TradeStatusChange(_trade, "Executed");
}
```

Nakonec tu máme možnost pro prodejce odstoupit od obchodu dříve, než jej kupující přijme. V některých modelech by inzeráty byly místo toho aktivní po určitou dobu, než vyprší. Je to vaše volba, v závislosti na designu vašeho trhu.

Kód je velmi podobný tomu, který se používá k provedení obchodu, jen s tím rozdílem, že nedochází k převodu měny a položka se vrací zpět zadavateli inzerátu.

```solidity
function cancelTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(
    msg.sender == trade.poster,
    "Trade can be cancelled only by poster."
  );
  require(trade.status == "Open", "Trade is not Open.");
  itemToken.transferFrom(address(this), trade.poster, trade.item);
  trades[_trade].status = "Cancelled";
  emit TradeStatusChange(_trade, "Cancelled");
}
```

To je vše. Dostali jste se na konec implementace. Je docela překvapivé, jak kompaktní jsou některé obchodní koncepty, když jsou vyjádřeny v kódu, a toto je jeden z těch případů. Podívejte se na kompletní kontrakt [v našem repozitáři](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol).

## Závěr {#conclusion}

Inzertní tabule jsou běžnou konfigurací trhu, která se s internetem masivně rozšířila a stala se nesmírně populárním obchodním modelem s několika monopolními vítězi.

Inzertní tabule jsou také snadným nástrojem k replikaci v blockchainovém prostředí, s velmi specifickými funkcemi, které umožní vyzvat stávající giganty.

V tomto článku jsem se pokusil propojit obchodní realitu byznysu inzertních tabulí s technologickou implementací. Tyto znalosti by vám měly pomoci vytvořit vizi a plán implementace, pokud máte ty správné dovednosti.

Jako vždy, pokud se chystáte postavit něco zábavného a uvítali byste nějakou radu, prosím, [napište mi](https://albertocuesta.es/)! Vždy rád pomohu.