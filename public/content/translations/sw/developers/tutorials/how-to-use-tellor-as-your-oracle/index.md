---
title: Jinsi ya Kuweka Tellor kama Orakeli yako
description: Mwongozo wa kuanza kuunganisha orakeli ya Tellor kwenye itifaki yako
author: "Tellor"
lang: sw
tags: ["Solidity", "mikataba mahiri", "orakeli"]
skill: beginner
breadcrumb: Orakeli ya Tellor
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Swali la Ghafla: Itifaki yako inakaribia kukamilika, lakini inahitaji orakeli ili kupata ufikiaji wa data za nje ya mnyororo...Utafanya nini?

## Mahitaji ya Awali (Mepesi) {#soft-prerequisites}

Chapisho hili linalenga kufanya ufikiaji wa mlisho wa orakeli kuwa rahisi na wa moja kwa moja iwezekanavyo. Hata hivyo, tunachukulia yafuatayo kuhusu kiwango chako cha ujuzi wa kuandika kodi ili kuzingatia kipengele cha orakeli.

Mambo tunayochukulia:

- unaweza kutumia terminali
- umesakinisha npm
- unajua jinsi ya kutumia npm kudhibiti vitegemezi

Tellor ni orakeli iliyo hai na ya chanzo wazi iliyo tayari kwa utekelezaji. Mwongozo huu wa wanaoanza upo hapa ili kuonyesha urahisi ambao mtu anaweza kuanza na kuendelea na Tellor, na kuipatia mradi wako orakeli iliyogatuliwa kikamilifu na inayostahimili udhibiti.

## Muhtasari {#overview}

Tellor ni mfumo wa orakeli ambapo wahusika wanaweza kuomba thamani ya data ya nje ya mnyororo (k.m., BTC/USD) na waripoti hushindana kuongeza thamani hii kwenye hifadhidata ya mnyororoni, inayoweza kufikiwa na mikataba mahiri yote ya Ethereum. Ingizo kwenye hifadhidata hii zinalindwa na mtandao wa waripoti walioweka dhamana. Tellor hutumia mifumo ya motisha ya kiuchumi ya kripto, kuwatuza waripoti kwa mawasilisho ya data ya uaminifu na kuwaadhibu watendaji wabaya kupitia utoaji wa tokeni ya Tellor, Tributes (TRB), na mfumo wa utatuzi wa migogoro.

Katika somo hili tutapitia:

- Kuweka zana za awali utakazohitaji ili kuanza na kuendelea.
- Kupitia mfano rahisi.
- Kuorodhesha anwani za mtandao wa majaribio za mitandao ambayo kwa sasa unaweza kujaribu Tellor.

## UsingTellor {#usingtellor}

Jambo la kwanza utakalotaka kufanya ni kusakinisha zana za msingi zinazohitajika kwa kutumia Tellor kama orakeli yako. Tumia [kifurushi hiki](https://github.com/tellor-io/usingtellor) kusakinisha Mikataba ya Mtumiaji wa Tellor:

`npm install usingtellor`

Baada ya kusakinishwa hii itaruhusu mikataba yako kurithi utendaji kutoka kwa mkataba wa 'UsingTellor'.

Vizuri! Kwa kuwa sasa una zana tayari, hebu tupitie zoezi rahisi ambapo tunapata bei ya bitcoin:

### Mfano wa BTC/USD {#btcusd-example}

Rithi mkataba wa UsingTellor, ukipitisha anwani ya Tellor kama hoja ya konstrukta:

Huu hapa ni mfano:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //Mkataba huu sasa una ufikiaji wa kazi zote katika UsingTellor

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

Kwa orodha kamili ya anwani za mkataba rejelea [hapa](https://docs.tellor.io/tellor/the-basics/contracts-reference).

Kwa urahisi wa matumizi, hazina ya UsingTellor inakuja na toleo la mkataba wa [Tellor Playground](https://github.com/tellor-io/TellorPlayground) kwa muunganisho rahisi zaidi. Tazama [hapa](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) kwa orodha ya utendaji muhimu.

Kwa utekelezaji thabiti zaidi wa orakeli ya Tellor, angalia orodha kamili ya utendaji unaopatikana [hapa](https://github.com/tellor-io/usingtellor/blob/master/README.md).