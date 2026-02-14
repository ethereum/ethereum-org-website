---
title: Jinsi ya kutekeleza soko la ERC-721
description: Jinsi ya kuweka vitu vilivyowekwa kwenye tokeni kwa ajili ya kuuza kwenye ubao wa matangazo uliogatuliwa
author: "Alberto Cuesta Cañada"
tags: [ "mikataba erevu", "erc-721", "uimara", "tokeni" ]
skill: intermediate
lang: sw
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

Katika makala hii, nitakuonyesha jinsi ya kutengeneza msimbo wa Craigslist kwa ajili ya mnyororo wa bloku wa Ethereum.

Kabla ya Gumtree, Ebay na Craigslist, bao za matangazo zilitengenezwa zaidi kwa gome la mwaloni au karatasi. Kulikuwa na bao za matangazo kwenye korido za shule, magazeti, taa za barabarani, na sehemu za mbele za maduka.

Yote hayo yalibadilika kwa ujio wa intaneti. Idadi ya watu walioweza kuona ubao maalum wa matangazo iliongezeka kwa viwango vingi sana. Kwa hayo, masoko wanayoyawakilisha yalikuwa na ufanisi zaidi na kupanuka hadi kufikia ukubwa wa kimataifa. Ebay ni biashara kubwa ambayo chimbuko lake ni kwenye hizi bao za matangazo halisi.

Kupitia mnyororo wa bloku, masoko haya yako tayari kubadilika kwa mara nyingine, acha nikuonyeshe jinsi gani.

## Uchumaji wa mapato {#monetization}

Mfumo wa biashara wa ubao wa matangazo wa umma wa mnyororo wa bloku utahitaji kuwa tofauti na ule wa Ebay na kampuni nyinginezo.

Kwanza, kuna [mtazamo wa ugatuzi](/developers/docs/web2-vs-web3/). Mifumo iliyopo inahitaji kudumisha seva zao wenyewe. Mfumo uliogatuliwa unadumishwa na watumiaji wake, hivyo gharama za kuendesha mfumo mkuu hushuka hadi sifuri kwa mmiliki wa mfumo.

Halafu kuna sehemu ya mbele, tovuti au kiolesura kinachotoa ufikiaji kwenye mfumo. Hapa kuna chaguzi nyingi. Wamiliki wa mfumo wanaweza kuzuia ufikiaji na kulazimisha kila mtu atumie kiolesura chao, kwa kutoza ada. Wamiliki wa mfumo wanaweza pia kuamua kufungua ufikiaji (Nguvu kwa Watu!) na kumruhusu yeyote ajenge violesura vya kuingilia mfumo. Au wamiliki wanaweza kuamua njia yoyote iliyo katikati ya pande hizo mbili.

_Viongozi wa biashara wenye maono zaidi kuliko mimi watajua jinsi ya kuchuma mapato kutokana na hili. Ninachokiona ni kwamba hii ni tofauti na hali ilivyo na pengine ina faida._

Zaidi ya hayo, kuna mtazamo wa otomatiki na malipo. Baadhi ya vitu vinaweza [kuwekwa kwenye tokeni kwa ufanisi mkubwa](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) na kuuzwa kwenye ubao wa matangazo. Mali zilizowekwa kwenye tokeni huhamishwa kwa urahisi katika mnyororo wa bloku. Njia tata sana za malipo zinaweza kutekelezwa kwa urahisi katika mnyororo wa bloku.

Nahisi kuna fursa ya biashara hapa. Ubao wa matangazo usio na gharama za uendeshaji unaweza kutekelezwa kwa urahisi, ukiwa na njia tata za malipo zilizojumuishwa katika kila muamala. Nina hakika mtu atakuja na wazo la jinsi ya kutumia hii.

Ninafurahi tu kuijenga. Hebu tuangalie msimbo.

## Utekelezaji {#implementation}

Muda fulani uliopita tulianzisha [hazina ya chanzo huria](https://github.com/HQ20/contracts?ref=hackernoon.com) yenye mifano ya utekelezaji wa kesi za biashara na vitu vingine vizuri, tafadhali angalia.

Msimbo wa [Ubao huu wa Matangazo wa Ethereum](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) upo hapo, tafadhali utumie upendavyo. Fahamu tu kwamba msimbo haujakaguliwa na unahitaji kufanya uchunguzi wako mwenyewe kabla ya kuweka pesa ndani yake.

Misingi ya ubao si tata. Matangazo yote kwenye ubao yatakuwa tu muundo wenye sehemu chache:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Imefunguliwa, Imetekelezwa, Imeghairiwa
}
```

Kwa hiyo kuna mtu anayetangaza tangazo. Kitu cha kuuza. Bei ya kitu. Hali ya biashara ambayo inaweza kuwa imefunguliwa, imetekelezwa au imeghairiwa.

Biashara hizi zote zitawekwa kwenye 'mapping'. Kwa sababu kila kitu katika Solidity kinaonekana kuwa 'mapping'. Pia kwa sababu ni rahisi.

```solidity
mapping(uint256 => Trade) public trades;
```

Kutumia 'mapping' kunamaanisha tu kwamba lazima tupate kitambulisho kwa kila tangazo kabla ya kulichapisha, na tutahitaji kujua kitambulisho cha tangazo kabla hatujaweza kulifanyia kazi. Kuna njia nyingi za kushughulikia hili ama kwenye mkataba-erevu au kwenye sehemu ya mbele. Tafadhali uliza ikiwa unahitaji vidokezo.

Kisha inakuja swali la vitu gani tunavyoshughulika navyo, na ni sarafu gani inayotumika kulipia muamala.

Kwa upande wa vitu, tutaomba tu vitekeleze kiolesura cha [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com), ambayo kwa kweli ni njia tu ya kuwakilisha vitu vya ulimwengu halisi katika mnyororo wa bloku, ingawa [inafanya kazi vizuri zaidi na mali za kidijitali](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). Tutaainisha mkataba wetu wa ERC721 katika 'constructor', ikimaanisha kuwa mali zozote kwenye ubao wetu wa matangazo zinahitaji kuwa zimewekwa kwenye tokeni kabla.

Kwa upande wa malipo, tutafanya kitu kinachofanana. Miradi mingi ya mnyororo wa bloku hufafanua sarafu yao ya kidigitali ya [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com). Wengine wanapendelea kutumia iliyo maarufu kama DAI. Katika ubao huu wa matangazo, unahitaji tu kuamua wakati wa kuunda sarafu yako itakuwa ipi. Rahisi.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Tunakaribia kufika. Tuna matangazo, vitu vya kubadilishana na sarafu ya malipo. Kutengeneza tangazo kunamaanisha kuweka kitu katika escrow ili kuonyesha kuwa unacho na kwamba haujakichapisha mara mbili, labda katika ubao tofauti.

Msimbo ufuatao unafanya hivyo hasa. Unaweka kitu kwenye escrow, unatengeneza tangazo, unafanya usimamizi fulani.

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

Kukubali biashara kunamaanisha kuchagua tangazo (biashara), kulipa bei, na kupokea kitu. Msimbo ufuatao unapata biashara. Unakagua kama inapatikana. Unalipia kitu. Unapata kitu. Unasasisha tangazo.

```solidity
function executeTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(trade.status == "Open", "Biashara haijafunguliwa.");
  currencyToken.transferFrom(msg.sender, trade.poster, trade.price);
  itemToken.transferFrom(address(this), msg.sender, trade.item);
  trades[_trade].status = "Executed";
  emit TradeStatusChange(_trade, "Executed");
}
```

Mwishowe, tuna chaguo kwa wauzaji kujiondoa kwenye biashara kabla mnunuzi hajakubali. Katika baadhi ya mifumo, matangazo badala yake yangekuwa hewani kwa kipindi fulani kabla ya muda wake kuisha. Ni chaguo lako, kulingana na muundo wa soko lako.

Msimbo unafanana sana na ule unaotumika kutekeleza biashara, isipokuwa tu hakuna sarafu inayobadilisha mikono na kitu kinarudi kwa mchapishaji wa tangazo.

```solidity
function cancelTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(
    msg.sender == trade.poster,
    "Biashara inaweza kughairiwa na mchapishaji pekee."
  );
  require(trade.status == "Open", "Biashara haijafunguliwa.");
  itemToken.transferFrom(address(this), trade.poster, trade.item);
  trades[_trade].status = "Cancelled";
  emit TradeStatusChange(_trade, "Cancelled");
}
```

Ni hayo tu. Umemaliza kufika mwisho wa utekelezaji. Inashangaza sana jinsi baadhi ya dhana za biashara zinavyokuwa fupi zinapoelezwa kwa msimbo, na hii ni moja ya kesi hizo. Angalia mkataba kamili [katika hazina yetu](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol).

## Hitimisho {#conclusion}

Bao za matangazo ni muundo wa kawaida wa soko uliopanuka sana na intaneti, ukawa mfumo wa biashara maarufu sana ukiwa na washindi wachache wa ukiritimba.

Bao za matangazo pia ni zana rahisi kuiga katika mazingira ya mnyororo wa bloku, zenye sifa maalum sana zitakazowezesha changamoto kwa makampuni makubwa yaliyopo.

Katika makala hii, nimejaribu kuunganisha uhalisia wa biashara ya bodi ya matangazo na utekelezaji wa kiteknolojia. Ujuzi huu unapaswa kukusaidia kuunda maono na ramani ya utekelezaji ikiwa una ujuzi unaofaa.

Kama kawaida, ikiwa unataka kujenga kitu chochote cha kufurahisha na ungependa ushauri, tafadhali [niandikie](https://albertocuesta.es/)! Daima ninafurahi kusaidia.
