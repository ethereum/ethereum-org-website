---
title: "Kupunguza ukubwa wa mikataba ili kupambana na kikomo cha ukubwa wa mkataba"
description: Unaweza kufanya nini kuzuia mikataba-erevu yako isiwe mikubwa sana?
author: Markus Waas
lang: sw
tags: [ "uimara", "mikataba erevu", "ghala" ]
skill: intermediate
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Kwa nini kuna kikomo? {#why-is-there-a-limit}

Mnamo [Novemba 22, 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/) uma mgumu wa Spurious Dragon ulianzisha [EIP-170](https://eips.ethereum.org/EIPS/eip-170) ambao uliongeza kikomo cha ukubwa wa mkataba-erevu cha kb 24.576. Kwa wewe kama msanidi programu wa Solidity hii inamaanisha unapoongeza utendaji zaidi na zaidi kwenye mkataba wako, wakati fulani utafikia kikomo na wakati wa kupeleka utaona hitilafu:

`Onyo: Ukubwa wa msimbo wa Mkataba umezidi baiti 24576 (kikomo kilichoanzishwa katika Spurious Dragon).` Mkataba huu huenda usiweze kupelekwa kwenye Mtandao Mkuu. `Fikiria kuwezesha kiboreshaji (na thamani ndogo ya "runs"!), kuzima jumbe za urejeshaji, au kutumia maktaba.`

Kikomo hiki kilianzishwa ili kuzuia mashambulizi ya kunyimwa huduma (DOS). Wito wowote kwa mkataba una gharama nafuu kiasi kwa upande wa gesi. Hata hivyo, athari za wito wa mkataba kwa nodi za Ethereum huongezeka isivyo sawia kulingana na ukubwa wa msimbo wa mkataba unaoitwa (kusoma msimbo kutoka kwenye diski, kuchakata msimbo awali, kuongeza data kwenye uthibitisho wa Merkle). Wakati wowote unapokuwa na hali kama hiyo ambapo mshambuliaji anahitaji rasilimali chache kusababisha kazi nyingi kwa wengine, unapata uwezekano wa mashambulizi ya DOS.

Hapo awali hili halikuwa tatizo kubwa kwa sababu kikomo kimoja cha asili cha ukubwa wa mkataba ni kikomo cha gesi cha bloku. Ni wazi, mkataba lazima upelekwe ndani ya muamala unaoshikilia msimbo baiti wote wa mkataba. Ikiwa utajumuisha muamala huo mmoja tu kwenye bloku, unaweza kutumia gesi yote hiyo, lakini si isiyo na kikomo. Tangu [Sasisho la London](/ethereum-forks/#london), kikomo cha gesi cha bloku kimeweza kubadilika kati ya vitengo milioni 15 na milioni 30 kulingana na mahitaji ya mtandao.

Katika yafuatayo tutaangalia baadhi ya mbinu zilizopangwa kulingana na athari zake zinazowezekana. Fikiria kuhusu hilo kwa mtazamo wa kupunguza uzito. Mkakati bora kwa mtu kufikia uzito anaolenga (katika hali yetu 24kb) ni kuzingatia mbinu zenye athari kubwa kwanza. Katika visa vingi kurekebisha lishe yako tu kutakufikisha hapo, lakini wakati mwingine unahitaji zaidi kidogo. Kisha unaweza kuongeza mazoezi (athari ya kati) au hata virutubisho (athari ndogo).

## Athari kubwa {#big-impact}

### Tenganisha mikataba yako {#separate-your-contracts}

Hii inapaswa kuwa mbinu yako ya kwanza kila wakati. Unawezaje kutenganisha mkataba katika mikataba midogo mingi? Kwa ujumla inakulazimisha kubuni usanifu mzuri kwa mikataba yako. Mikataba midogo inapendekezwa kila wakati kutoka kwa mtazamo wa usomaji wa msimbo. Kwa ajili ya kugawanya mikataba, jiulize:

- Ni vitendaji vipi vinavyohusiana? Kila seti ya vitendaji inaweza kuwa bora katika mkataba wake.
- Ni vitendaji vipi ambavyo havihitaji kusoma hali ya mkataba au sehemu ndogo tu ya hali hiyo?
- Unaweza kutenganisha ghala na utendaji?

### Maktaba {#libraries}

Njia moja rahisi ya kuhamisha msimbo wa utendaji mbali na ghala ni kutumia [maktaba](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). Usitangaze vitendaji vya maktaba kama vya ndani kwani vitaongezwa moja kwa moja [kwenye mkataba](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) wakati wa ukusanyaji. Lakini ukitumia vitendaji vya umma, basi vitakuwa katika mkataba tofauti wa maktaba. Fikiria [kutumia kwa](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) ili kufanya matumizi ya maktaba yawe rahisi zaidi.

### Proksi {#proxies}

Mkakati wa hali ya juu zaidi ungekuwa mfumo wa proksi. Maktaba hutumia `DELEGATECALL` kwa nyuma, ambayo hutekeleza kitendaji cha mkataba mwingine kwa kutumia hali ya mkataba unaoita. Angalia [chapisho hili la blogu](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) ili kujifunza zaidi kuhusu mifumo ya proksi. Hukupa utendaji zaidi, k.m., huwezesha uwezo wa kusasishwa, lakini pia huongeza utata mwingi. Singeongeza hizo ili tu kupunguza ukubwa wa mkataba isipokuwa ndiyo chaguo lako pekee kwa sababu yoyote ile.

## Athari ya kati {#medium-impact}

### Ondoa vitendaji {#remove-functions}

Hili linapaswa kuwa dhahiri. Vitendaji huongeza ukubwa wa mkataba kwa kiasi kikubwa.

- **Nje**: Mara nyingi tunaongeza vitendaji vingi vya kuona kwa sababu za kurahisisha. Hiyo ni sawa kabisa mpaka ufikie kikomo cha ukubwa. Kisha unaweza kutaka kufikiria kweli kuondoa vyote isipokuwa vile vya muhimu kabisa.
- **Ndani**: Unaweza pia kuondoa vitendaji vya ndani/binafsi na kuingiza msimbo moja kwa moja mradi tu kitendaji kinaitwa mara moja tu.

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

Mabadiliko rahisi kama haya hufanya tofauti ya **0.28kb**. Kuna uwezekano unaweza kupata hali nyingi sawa katika mikataba yako na hizo zinaweza kujumlisha na kuwa kiasi kikubwa.

### Fupisha ujumbe wa hitilafu {#shorten-error-message}

Jumbe ndefu za urejeshaji na hasa jumbe nyingi tofauti za urejeshaji zinaweza kufanya mkataba uwe mkubwa. Badala yake tumia misimbo mifupi ya hitilafu na uisimbue katika mkataba wako. Ujumbe mrefu unaweza kuwa mfupi zaidi:

```solidity
require(msg.sender == owner, "Ni mmiliki wa mkataba huu pekee anayeweza kuita kitendaji hiki");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Tumia hitilafu maalum badala ya jumbe za hitilafu

Hitilafu maalum zilianzishwa katika [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Ni njia nzuri ya kupunguza ukubwa wa mikataba yako, kwa sababu zimesimbwa kwa ABI kama viteuzi (kama vile vitendaji vilivyo).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### Fikiria thamani ya chini ya 'run' kwenye kiboreshaji {#consider-a-low-run-value-in-the-optimizer}

Unaweza pia kubadilisha mipangilio ya kiboreshaji. Thamani chaguo-msingi ya 200 inamaanisha kwamba inajaribu kuboresha msimbo baiti kana kwamba kitendaji kinaitwa mara 200. Ukiibadilisha kuwa 1, kimsingi unakiambia kiboreshaji kiboreshe kwa ajili ya hali ya kuendesha kila kitendaji mara moja tu. Kitendaji kilichoboreshwa kwa ajili ya kuendeshwa mara moja tu kinamaanisha kimeboreshwa kwa ajili ya upelekaji wenyewe. Fahamu kwamba **hii huongeza [gharama za gesi](/developers/docs/gas/) za kuendesha vitendaji**, kwa hivyo unaweza usitake kufanya hivyo.

## Athari ndogo {#small-impact}

### Epuka kupitisha miundo kwa vitendaji {#avoid-passing-structs-to-functions}

Ikiwa unatumia [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2), inaweza kusaidia kutopitisha miundo kwa kitendaji. Badala ya kupitisha kigezo kama muundo, pitisha vigezo vinavyohitajika moja kwa moja. Katika mfano huu tumeokoa **0.1kb** nyingine.

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

### Tangaza mwonekano sahihi kwa vitendaji na vigezo {#declare-correct-visibility-for-functions-and-variables}

- Vitendaji au vigezo vinavyoitwa kutoka nje tu? Vitangaze kama `external` badala ya `public`.
- Vitendaji au vigezo vinavyoitwa kutoka ndani ya mkataba tu? Vitangaze kama `private` au `internal` badala ya `public`.

### Ondoa virekebishaji {#remove-modifiers}

Virekebishaji, hasa vinapotumiwa sana, vinaweza kuwa na athari kubwa kwenye ukubwa wa mkataba. Fikiria kuviondoa na badala yake utumie vitendaji.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

Dokezo hizo zinapaswa kukusaidia kupunguza kwa kiasi kikubwa ukubwa wa mkataba. Kwa mara nyingine tena, siwezi kusisitiza vya kutosha, daima zingatia kugawanya mikataba ikiwezekana kwa athari kubwa zaidi.
