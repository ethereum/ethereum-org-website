---
title: Jinsi ya Kusanidi Tellor kama Oracle yako
description: Mwongozo wa jinsi ya kuanza kuunganisha oracle ya Tellor kwenye itifaki yako
author: "Tellor"
lang: sw
tags: ["solidity", "smart contracts", "oracles"]
skill: beginner
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Swali la Ghafla: Itifaki yako iko karibu kukamilika, lakini inahitaji oracle ili kupata data ya offchain... Utafanya nini?

## (Masharti Yasiyo ya Lazima) {#soft-prerequisites}

Chapisho hili linalenga kufanya upatikanaji wa mlisho wa oracle uwe rahisi na wa moja kwa moja iwezekanavyo. Pamoja na hayo, tunadhania yafuatayo kuhusu kiwango cha ujuzi wako wa uandishi wa msimbo ili kuzingatia kipengele cha oracle.

Mawazo:

- unaweza kutumia terminal
- una npm iliyosakinishwa
- unajua jinsi ya kutumia npm kudhibiti vitegemezi

Tellor ni oracle inayofanya kazi na ya chanzo-wazi ambayo iko tayari kwa utekelezaji. Mwongozo huu wa wanaoanza upo ili kuonyesha urahisi wa kuanza kutumia Tellor, na kuupa mradi wako oracle yenye ugatuaji kamili na isiyoweza kudhibitiwa.

## Muhtasari {#overview}

Tellor ni mfumo wa oracle ambapo pande zinaweza kuomba thamani ya nukta ya data ya offchain (k.m., BTC/USD) na waripoti hushindana kuongeza thamani hii kwenye benki ya data ya onchain, inayopatikana kwa mikataba-erevu yote ya Ethereum. Pembejeo za benki hii ya data zinalindwa na mtandao wa waripoti walioweka hisa. Tellor hutumia mifumo ya motisha ya kiuchumi ya crypto, ikiwatuza waripoti wanaowasilisha data kwa uaminifu na kuwaadhibu wahusika wabaya kupitia utoaji wa tokeni ya Tellor, Tributes (TRB), na utaratibu wa kutatua mizozo.

Katika mafunzo haya tutapitia:

- Kusanidi zana za awali utakazohitaji ili kuanza kutumia.
- Kupitia mfano rahisi.
- Orodhesha anwani za testnet za mitandao unayoweza kujaribu Tellor kwa sasa.

## KutumiaTellor {#usingtellor}

Jambo la kwanza utakalotaka kufanya ni kusakinisha zana za msingi zinazohitajika ili kutumia Tellor kama oracle yako. Tumia [kifurushi hiki](https://github.com/tellor-io/usingtellor) kusakinisha Mikataba ya Watumiaji wa Tellor:

`npm install usingtellor`

Baada ya kusakinishwa, hii itaruhusu mikataba yako kurithi kazi kutoka kwa mkataba wa 'UsingTellor'.

Safi sana! Sasa kwa kuwa una zana tayari, hebu tupitie zoezi rahisi ambapo tunapata bei ya bitcoin:

### Mfano wa BTC/USD {#btcusd-example}

Rithi mkataba wa UsingTellor, ukipitisha anwani ya Tellor kama hoja ya mjenzi:

Mfano huu hapa:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //Mkataba huu sasa una uwezo wa kufikia kazi zote katika UsingTellor

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

Kwa urahisi wa matumizi, repo ya UsingTellor inakuja na toleo la mkataba wa [Tellor Playground](https://github.com/tellor-io/TellorPlayground) kwa uunganisho rahisi. Tazama [hapa](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) kwa orodha ya kazi muhimu.

Kwa utekelezaji thabiti zaidi wa oracle ya Tellor, angalia orodha kamili ya kazi zinazopatikana [hapa](https://github.com/tellor-io/usingtellor/blob/master/README.md).
