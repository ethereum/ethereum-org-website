---
title: Jinsi ya kutekeleza soko la ERC-721
description: Jinsi ya kuweka bidhaa zilizofanywa kuwa tokeni kwa ajili ya kuuzwa kwenye ubao wa matangazo uliogatuliwa
author: "Alberto Cuesta Cañada"
tags: ["mikataba mahiri", "erc-721", "solidity", "tokeni"]
skill: intermediate
breadcrumb: Soko la ERC-721
lang: sw
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

Katika makala haya, nitakuonyesha jinsi ya kuandika kodi ya Craigslist kwa ajili ya mnyororo wa vitalu wa Ethereum.

Kabla ya Gumtree, Ebay na Craigslist, mbao za matangazo zilikuwa zimetengenezwa zaidi kwa gome la mti au karatasi. Kulikuwa na mbao za matangazo kwenye korido za shule, magazeti, taa za barabarani, na mbele ya maduka.

Yote hayo yalibadilika na ujio wa intaneti. Idadi ya watu ambao wangeweza kuona ubao maalum wa matangazo iliongezeka kwa viwango vikubwa sana. Pamoja na hayo, masoko yanayowakilishwa yalikuwa na ufanisi zaidi na kukua hadi kufikia ukubwa wa kimataifa. Ebay ni biashara kubwa ambayo asili yake inatokana na mbao hizi za matangazo za kimaumbile.

Pamoja na mnyororo wa vitalu masoko haya yanatarajiwa kubadilika kwa mara nyingine tena, hebu nikuonyeshe jinsi gani.

## Uchumaji wa Mapato {#monetization}

Muundo wa biashara wa ubao wa matangazo wa mnyororo wa vitalu wa umma utahitaji kuwa tofauti na ule wa Ebay na kampuni nyingine.

Kwanza, kuna [mtazamo wa ugatuzi](/developers/docs/web2-vs-web3/). Majukwaa yaliyopo yanahitaji kudumisha seva zao wenyewe. Jukwaa lililogatuliwa hudumishwa na watumiaji wake, hivyo gharama ya kuendesha jukwaa kuu inashuka hadi sifuri kwa mmiliki wa jukwaa.

Kisha kuna upande wa mbele (front end), tovuti au kiolesura kinachotoa ufikiaji wa jukwaa. Hapa kuna chaguzi nyingi. Wamiliki wa jukwaa wanaweza kuzuia ufikiaji na kulazimisha kila mtu kutumia kiolesura chao, na kutoza ada. Wamiliki wa jukwaa pia wanaweza kuamua kufungua ufikiaji (Nguvu kwa Watu!) na kuruhusu mtu yeyote kujenga violesura kwenye jukwaa. Au wamiliki wanaweza kuamua mbinu yoyote katikati ya misimamo hiyo miwili.

_Viongozi wa biashara wenye maono zaidi yangu watajua jinsi ya kuchuma mapato kutokana na hili. Ninachokiona tu ni kwamba hii ni tofauti na hali ilivyo sasa na huenda ikaleta faida._

Zaidi ya hayo, kuna mtazamo wa uendeshaji wa kiotomatiki na malipo. Baadhi ya vitu vinaweza [kufanywa kuwa tokeni kwa ufanisi mkubwa](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) na kuuzwa kwenye ubao wa matangazo. Rasilimali zilizofanywa kuwa tokeni huhamishwa kwa urahisi katika mnyororo wa vitalu. Njia za malipo zenye utata mkubwa zinaweza kutekelezwa kwa urahisi katika mnyororo wa vitalu.

Ninahisi tu fursa ya biashara hapa. Ubao wa matangazo usio na gharama za uendeshaji unaweza kutekelezwa kwa urahisi, huku njia tata za malipo zikijumuishwa katika kila muamala. Nina uhakika mtu atakuja na wazo kuhusu nini cha kutumia kwa ajili ya hili.

Nina furaha tu kuijenga. Hebu tuangalie kodi.

## Utekelezaji {#implementation}

Muda fulani uliopita tulianzisha [hifadhi ya chanzo wazi](https://github.com/HQ20/contracts?ref=hackernoon.com) yenye mifano ya utekelezaji wa matukio ya biashara na mambo mengine mazuri, tafadhali iangalie.

Kodi ya [Ubao wa Matangazo wa Ethereum](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) huu ipo hapo, tafadhali itumie na uifanyie majaribio yote. Tambua tu kwamba kodi haijakaguliwa na unahitaji kufanya uchunguzi wako mwenyewe kabla ya kuruhusu pesa kuingia humo.

Misingi ya ubao huu si migumu. Matangazo yote kwenye ubao yatakuwa tu muundo (struct) wenye sehemu chache:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Wazi, Imetekelezwa, Imeghairiwa
}
```

Kwa hivyo kuna mtu anayeweka tangazo. Bidhaa inayouzwa. Bei ya bidhaa. Hali ya biashara ambayo inaweza kuwa wazi, imetekelezwa au imeghairiwa.

Biashara hizi zote zitawekwa kwenye ramani (mapping). Kwa sababu kila kitu katika Solidity kinaonekana kuwa ramani. Pia kwa sababu ni rahisi.

```solidity
mapping(uint256 => Trade) public trades;
```

Kutumia ramani kunamaanisha tu kwamba inabidi tupate kitambulisho (id) kwa kila tangazo kabla ya kuliweka, na tutahitaji kujua kitambulisho cha tangazo kabla ya kuweza kulifanyia kazi. Kuna njia nyingi za kushughulikia hili iwe katika mkataba mahiri au katika upande wa mbele. Tafadhali uliza ikiwa unahitaji miongozo.

Kisha inakuja swali la je, ni vitu gani hivyo tunavyoshughulika navyo, na ni sarafu gani hii inayotumika kulipia muamala.

Kwa bidhaa, tutaomba tu zitekeleze kiolesura cha [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com), ambacho kwa kweli ni njia tu ya kuwakilisha vitu vya ulimwengu halisi katika mnyororo wa vitalu, ingawa [hufanya kazi vizuri zaidi na rasilimali za kidijitali](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). Tutabainisha mkataba wetu wenyewe wa ERC721 katika konstrukta, ikimaanisha kwamba rasilimali zozote katika ubao wetu wa matangazo zinahitaji kuwa zimefanywa kuwa tokeni mapema.

Kwa malipo, tutafanya kitu kama hicho. Miradi mingi ya mnyororo wa vitalu hufafanua sarafu-fiche yao wenyewe ya [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com). Baadhi ya mingine hupendelea kutumia ile iliyozoeleka kama DAI. Katika ubao huu wa matangazo, unahitaji tu kuamua wakati wa ujenzi sarafu yako itakuwa nini. Rahisi.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Tunakaribia kufika. Tuna matangazo, bidhaa za kufanyia biashara na sarafu kwa ajili ya malipo. Kutengeneza tangazo kunamaanisha kuweka bidhaa kwenye akaunti ya amana (escrow) ili kuonyesha kwamba unayo na kwamba hujaiweka mara mbili, labda kwenye ubao tofauti.

Kodi iliyo hapa chini inafanya hivyo haswa. Inaweka bidhaa kwenye akaunti ya amana, inaunda tangazo, na kufanya usimamizi wa kimsingi.

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

Kukubali biashara kunamaanisha kuchagua tangazo (biashara), kulipa bei, na kupokea bidhaa. Kodi iliyo hapa chini inaleta biashara. Inakagua kama inapatikana. Inalipia bidhaa. Inaleta bidhaa. Inasasisha tangazo.

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

Hatimaye, tuna chaguo kwa wauzaji kujiondoa kwenye biashara kabla mnunuzi hajaikubali. Katika baadhi ya miundo, matangazo yangekuwa hewani kwa muda fulani kabla ya kuisha muda wake. Ni chaguo lako, kulingana na muundo wa soko lako.

Kodi inafanana sana na ile inayotumika kutekeleza biashara, isipokuwa tu kwamba hakuna sarafu inayobadilishana mikono na bidhaa inarudi kwa mweka tangazo.

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

Ndiyo hivyo. Umefika mwisho wa utekelezaji. Inashangaza kidogo jinsi baadhi ya dhana za biashara zinavyokuwa fupi zinapoelezwa katika kodi, na hii ni mojawapo ya matukio hayo. Angalia mkataba kamili [katika hifadhi yetu](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol).

## Hitimisho {#conclusion}

Mbao za matangazo ni muundo wa kawaida wa soko uliokua kwa kiasi kikubwa na ujio wa intaneti, na kuwa muundo wa biashara maarufu sana wenye washindi wachache wanaohodhi soko.

Mbao za matangazo pia hutokea kuwa zana rahisi kunakili katika mazingira ya mnyororo wa vitalu, zikiwa na vipengele maalum sana ambavyo vitafanya iwezekane kutoa changamoto kwa makampuni makubwa yaliyopo.

Katika makala haya, nilijaribu kuunganisha uhalisia wa biashara wa ubao wa matangazo na utekelezaji wa kiteknolojia. Maarifa haya yanapaswa kukusaidia kuunda maono na ramani ya njia ya utekelezaji ikiwa una ujuzi sahihi.

Kama kawaida, ikiwa uko tayari kujenga chochote cha kufurahisha na ungependa kupata ushauri, tafadhali [niandikie ujumbe](https://albertocuesta.es/)! Siku zote nina furaha kusaidia.