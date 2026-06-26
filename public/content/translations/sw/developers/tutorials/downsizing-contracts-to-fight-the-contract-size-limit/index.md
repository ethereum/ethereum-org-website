---
title: "Kupunguza ukubwa wa mikataba ili kupambana na kikomo cha ukubwa wa mkataba"
description: Unaweza kufanya nini ili kuzuia mikataba mahiri yako isiwe mikubwa sana?
author: Markus Waas
lang: sw
tags:
  - solidity
  - mikataba mahiri
  - hifadhi
skill: intermediate
breadcrumb: Kupunguza ukubwa wa mikataba
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Kwa nini kuna kikomo? {#why-is-there-a-limit}

Mnamo [Novemba 22, 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon) mchepuo mgumu wa Spurious Dragon ulianzisha [EIP-170](https://eips.ethereum.org/EIPS/eip-170) ambao uliongeza kikomo cha ukubwa wa mkataba mahiri cha kb 24.576. Kwako kama msanidi wa Solidity hii inamaanisha unapoongeza utendaji zaidi na zaidi kwenye mkataba wako, wakati fulani utafikia kikomo na wakati wa usambazaji utaona hitilafu:

`Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

Kikomo hiki kilianzishwa ili kuzuia mashambulizi ya kunyima huduma (DOS). Wito wowote kwa mkataba ni wa bei nafuu kiasi kwa upande wa gesi. Hata hivyo, athari ya wito wa mkataba kwa nodi za Ethereum huongezeka kwa kiasi kikubwa kulingana na ukubwa wa msimbo wa mkataba ulioitwa (kusoma msimbo kutoka kwenye diski, kuchakata msimbo mapema, kuongeza data kwenye ushahidi wa Merkle). Kila unapokuwa na hali kama hiyo ambapo mshambuliaji anahitaji rasilimali chache ili kusababisha kazi nyingi kwa wengine, unapata uwezekano wa mashambulizi ya DOS.

Hapo awali hili halikuwa tatizo sana kwa sababu kikomo kimoja cha asili cha ukubwa wa mkataba ni kikomo cha gesi cha kitalu. Ni wazi, mkataba lazima usambazwe ndani ya muamala ambao unashikilia msimbo wa baiti wote wa mkataba. Ikiwa utajumuisha muamala huo mmoja tu kwenye kitalu, unaweza kutumia gesi hiyo yote, lakini haina mwisho. Tangu [Uboreshaji wa London](/ethereum-forks/#london), kikomo cha gesi cha kitalu kimeweza kutofautiana kati ya uniti 15M na 30M kulingana na mahitaji ya mtandao.

Katika yafuatayo tutaangalia baadhi ya mbinu zilizopangwa kwa athari zake zinazowezekana. Fikiria juu yake kwa suala la kupunguza uzito. Mkakati bora kwa mtu kufikia uzito wake anaolenga (kwa upande wetu kb 24) ni kuzingatia mbinu zenye athari kubwa kwanza. Katika hali nyingi kurekebisha tu mlo wako kutakufikisha hapo, lakini wakati mwingine unahitaji zaidi kidogo. Kisha unaweza kuongeza mazoezi (athari ya kati) au hata virutubisho (athari ndogo).

## Athari kubwa {#big-impact}

### Tenganisha mikataba yako {#separate-your-contracts}

Hii inapaswa kuwa mbinu yako ya kwanza kila wakati. Unawezaje kutenganisha mkataba kuwa midogo midogo mingi? Kwa ujumla inakulazimisha kuja na usanifu mzuri wa mikataba yako. Mikataba midogo hupendelewa kila wakati kutoka kwa mtazamo wa usomaji wa msimbo. Kwa kugawanya mikataba, jiulize:

- Ni kazi zipi zinazofaa kuwa pamoja? Kila seti ya kazi inaweza kuwa bora katika mkataba wake yenyewe.
- Ni kazi zipi hazihitaji kusoma hali ya mkataba au tu sehemu ndogo maalum ya hali?
- Je, unaweza kugawanya hifadhi na utendaji?

### Maktaba {#libraries}

Njia moja rahisi ya kuhamisha msimbo wa utendaji mbali na hifadhi ni kutumia [maktaba](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). Usitangaze kazi za maktaba kama za ndani kwani hizo [zitaongezwa kwenye mkataba](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) moja kwa moja wakati wa uunganishaji. Lakini ukitumia kazi za umma, basi hizo zitakuwa katika mkataba tofauti wa maktaba. Fikiria [kutumia kwa](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) ili kufanya matumizi ya maktaba kuwa rahisi zaidi.

### Proksi {#proxies}

Mkakati wa hali ya juu zaidi ungekuwa mfumo wa proksi. Maktaba hutumia `DELEGATECALL` nyuma ambayo hutekeleza tu kazi ya mkataba mwingine na hali ya mkataba unaoita. Angalia [chapisho hili la blogu](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) ili kujifunza zaidi kuhusu mifumo ya proksi. Inakupa utendaji zaidi, k.m., inawezesha uboreshaji, lakini pia inaongeza utata mwingi. Nisingeongeza hizo tu ili kupunguza ukubwa wa mkataba isipokuwa iwe ndiyo chaguo lako pekee kwa sababu yoyote ile.

## Athari ya kati {#medium-impact}

### Ondoa kazi {#remove-functions}

Hili linapaswa kuwa wazi. Kazi huongeza ukubwa wa mkataba kwa kiasi fulani.

- **Nje**: Mara nyingi tunaongeza kazi nyingi za kutazama kwa sababu za urahisi. Hiyo ni sawa kabisa hadi ufikie kikomo cha ukubwa. Kisha unaweza kutaka kufikiria kwa kweli kuhusu kuondoa zote isipokuwa zile muhimu kabisa.
- **Ndani**: Unaweza pia kuondoa kazi za ndani/binafsi na kuweka tu msimbo kwenye mstari mradi kazi inaitwa mara moja tu.

### Epuka vigezo vya ziada {#avoid-additional-variables}

```solidity
function get(uint id) returns (address,address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns (address,address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

Mabadiliko rahisi kama haya yanaleta tofauti ya **kb 0.28**. Kuna uwezekano unaweza kupata hali nyingi zinazofanana katika mikataba yako na hizo zinaweza kuongezeka hadi kiasi kikubwa.

### Fupisha ujumbe wa hitilafu {#shorten-error-message}

Ujumbe mrefu wa kutengua na hasa jumbe nyingi tofauti za kutengua zinaweza kuvimbisha mkataba. Badala yake tumia misimbo mifupi ya hitilafu na uifumbue katika mkataba wako. Ujumbe mrefu unaweza kuwa mfupi zaidi:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Tumia hitilafu maalum badala ya jumbe za hitilafu {#use-custom-errors-instead-of-error-messages}

Hitilafu maalum zimeanzishwa katika [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Ni njia nzuri ya kupunguza ukubwa wa mikataba yako, kwa sababu zimesimbwa kwa ABI kama viteuzi (kama vile kazi zilivyo).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### Fikiria thamani ya chini ya uendeshaji katika kiboreshaji {#consider-a-low-run-value-in-the-optimizer}

Unaweza pia kubadilisha mipangilio ya kiboreshaji. Thamani chaguo-msingi ya 200 inamaanisha kuwa inajaribu kuboresha msimbo wa baiti kana kwamba kazi inaitwa mara 200. Ukiibadilisha kuwa 1, kimsingi unakiambia kiboreshaji kuboresha kwa ajili ya kuendesha kila kazi mara moja tu. Kazi iliyoboreshwa kwa ajili ya kuendesha mara moja tu inamaanisha imeboreshwa kwa ajili ya usambazaji wenyewe. Fahamu kuwa **hii inaongeza [gharama za gesi](/developers/docs/gas/) kwa kuendesha kazi**, kwa hivyo unaweza usitake kufanya hivyo.

## Athari ndogo {#small-impact}

### Epuka kupitisha miundo (structs) kwenye kazi {#avoid-passing-structs-to-functions}

Ikiwa unatumia [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2), inaweza kusaidia kutopitisha miundo kwenye kazi. Badala ya kupitisha kigezo kama muundo, pitisha vigezo vinavyohitajika moja kwa moja. Katika mfano huu tumeokoa **kb 0.1** nyingine.

```solidity
function get(uint id) returns (address,address) {
    return _get(myStruct);
}

function _get(MyStruct memory myStruct) private view returns(address,address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns(address,address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private view returns(address,address) {
    return (addr1, addr2);
}
```

### Tangaza mwonekano sahihi kwa kazi na vigezo {#declare-correct-visibility-for-functions-and-variables}

- Kazi au vigezo ambavyo vinaitwa tu kutoka nje? Vitangaze kama `external` badala ya `public`.
- Kazi au vigezo vinaitwa tu kutoka ndani ya mkataba? Vitangaze kama `private` au `internal` badala ya `public`.

### Ondoa virekebishaji {#remove-modifiers}

Virekebishaji, hasa vinapotumiwa sana, vinaweza kuwa na athari kubwa kwenye ukubwa wa mkataba. Fikiria kuviondoa na badala yake utumie kazi.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

Vidokezo hivyo vinapaswa kukusaidia kupunguza kwa kiasi kikubwa ukubwa wa mkataba. Kwa mara nyingine tena, siwezi kusisitiza vya kutosha, daima zingatia kugawanya mikataba ikiwezekana kwa athari kubwa zaidi.