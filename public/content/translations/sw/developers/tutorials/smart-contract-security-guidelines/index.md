---
title: Miongozo ya usalama ya mkataba-erevu
description: Orodha hakiki ya miongozo ya usalama ya kuzingatia unapojenga dapp yako
author: "Trailofbits"
tags: [ "uimara", "mikataba erevu", "usalama" ]
skill: intermediate
lang: sw
published: 2020-09-06
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Fuata mapendekezo haya ya kiwango cha juu ili kujenga mikataba-erevu salama zaidi.

## Miongozo ya usanifu {#design-guidelines}

Usanifu wa mkataba unapaswa kujadiliwa mapema, kabla ya kuandika mstari wowote wa msimbo.

### Nyaraka na vipimo {#documentation-and-specifications}

Nyaraka zinaweza kuandikwa katika viwango tofauti, na zinapaswa kusasishwa wakati wa kutekeleza mikataba:

- **Maelezo ya mfumo kwa Kiingereza rahisi**, yanayoelezea kile ambacho mikataba hufanya na dhana zozote kwenye msingi wa msimbo.
- **Michoro ya schema na usanifu**, ikiwemo mwingiliano wa mkataba na mashine ya hali ya mfumo. [Vichapishi vya Slither](https://github.com/crytic/slither/wiki/Printer-documentation) vinaweza kusaidia kutengeneza schema hizi.
- **Nyaraka za msimbo za kina**, umbizo la [Natspec](https://docs.soliditylang.org/en/develop/natspec-format.html) linaweza kutumika kwa ajili ya Solidity.

### Ukokoaji wa Onchain dhidi ya offchain {#onchain-vs-offchain-computation}

- **Weka msimbo mwingi iwezekanavyo offchain.** Weka safu ya onchain iwe ndogo. Chakata awali data na msimbo offchain kwa namna ambayo uthibitishaji kwenye onchain ni rahisi. Je, unahitaji orodha iliyopangwa? Panga orodha offchain, kisha angalia tu mpangilio wake kwenye onchain.

### Uboreshaji {#upgradeability}

Tulijadili suluhisho tofauti za uboreshaji katika [chapisho letu la blogi](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Fanya uamuzi wa makusudi kuunga mkono uboreshaji au la kabla ya kuandika msimbo wowote. Uamuzi utaathiri jinsi unavyounda msimbo wako. Kwa ujumla, tunapendekeza:

- **Pendelea [uhamishaji wa mkataba](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) badala ya uboreshaji.** Mifumo ya uhamishaji ina faida nyingi sawa na ile inayoweza kuboreshwa, bila hasara zake.
- **Tumia muundo wa kutenganisha data badala ya ule wa delegatecallproxy.** Ikiwa mradi wako una utenganisho wazi wa kimantiki, uboreshaji kwa kutumia utenganishaji wa data utahitaji marekebisho machache tu. Delegatecallproxy inahitaji utaalamu wa EVM na ina uwezekano mkubwa wa kuwa na makosa.
- **Andika utaratibu wa uhamishaji/usasishaji kabla ya kupeleka.** Ikiwa itakubidi uchukue hatua chini ya shinikizo bila miongozo yoyote, utafanya makosa. Andika utaratibu wa kufuata mapema. Inapaswa kujumuisha:
  - Wito unaoanzisha mikataba mipya
  - Mahali ambapo funguo zimehifadhiwa na jinsi ya kuzifikia
  - Jinsi ya kuangalia upelekaji! Tengeneza na jaribu hati ya baada ya upelekaji.

## Miongozo ya utekelezaji {#implementation-guidelines}

**Jitahidi kuwa na urahisi.** Daima tumia suluhisho rahisi zaidi linalofaa lengo lako. Mwanachama yeyote wa timu yako anapaswa kuwa na uwezo wa kuelewa suluhisho lako.

### Muundo wa kazi {#function-composition}

Usanifu wa msingi wa msimbo wako unapaswa kufanya msimbo wako kuwa rahisi kupitia. Epuka chaguzi za usanifu zinazopunguza uwezo wa kufikiria kuhusu usahihi wake.

- **Gawanya mantiki ya mfumo wako**, ama kupitia mikataba mingi au kwa kuweka pamoja kazi zinazofanana (kwa mfano, uthibitishaji, hesabu, ...).
- **Andika kazi ndogo, zenye lengo wazi.** Hii itarahisisha upitiaji na kuruhusu upimaji wa vijenzi vya kibinafsi.

### Urithi {#inheritance}

- **Weka urithi uweze kudhibitiwa.** Urithi unapaswa kutumika kugawanya mantiki, hata hivyo, mradi wako unapaswa kulenga kupunguza kina na upana wa mti wa urithi.
- **Tumia [kichapishi cha urithi cha Slither](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) kuangalia daraja la mikataba.** Kichapishi cha urithi kitakusaidia kupitia ukubwa wa daraja.

### Matukio {#events}

- **Rekodi shughuli zote muhimu.** Matukio yatasaidia kurekebisha mkataba wakati wa uundaji, na kuufuatilia baada ya kupelekwa.

### Epuka mitego inayojulikana {#avoid-known-pitfalls}

- **Fahamu masuala ya kawaida ya usalama.** Kuna rasilimali nyingi mtandaoni za kujifunza kuhusu masuala ya kawaida, kama vile [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/), au [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/).
- **Fahamu sehemu za maonyo katika [nyaraka za Solidity](https://docs.soliditylang.org/en/latest/).** Sehemu za maonyo zitakujulisha kuhusu tabia zisizo dhahiri za lugha.

### Tegemezi {#dependencies}

- **Tumia maktaba zilizojaribiwa vizuri.** Kuingiza msimbo kutoka kwa maktaba zilizojaribiwa vizuri kutapunguza uwezekano wa kuandika msimbo wenye hitilafu. Ikiwa unataka kuandika mkataba wa ERC20, tumia [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Tumia kidhibiti tegemezi; epuka kunakili na kubandika msimbo.** Ikiwa unategemea chanzo cha nje, basi lazima ukiweke kisasa na chanzo asili.

### Upimaji na uthibitishaji {#testing-and-verification}

- **Andika majaribio ya kina ya vipande.** Mkusanyiko mpana wa majaribio ni muhimu ili kujenga programu ya hali ya juu.
- **Tumia ukaguzi na sifa maalum za [Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) na [Manticore](https://github.com/trailofbits/manticore).** Zana za kiotomatiki zitasaidia kuhakikisha mkataba wako ni salama. Pitia sehemu iliyobaki ya mwongozo huu ili kujifunza jinsi ya kuandika ukaguzi na sifa zenye ufanisi.
- **Tumia [crytic.io](https://crytic.io/).** Crytic huunganishwa na GitHub, hutoa ufikiaji wa vigunduzi vya faragha vya Slither, na huendesha ukaguzi wa sifa maalum kutoka Echidna.

### Solidity {#solidity}

- **Pendelea Solidity 0.5 badala ya 0.4 na 0.6.** Kwa maoni yetu, Solidity 0.5 ni salama zaidi na ina mazoea bora yaliyojengwa ndani kuliko 0.4. Solidity 0.6 imeonekana kuwa si thabiti sana kwa uzalishaji na inahitaji muda kukomaa.
- **Tumia toleo thabiti kwa kuandaa; tumia toleo la hivi karibuni kuangalia maonyo.** Hakikisha msimbo wako hauna masuala yaliyoripotiwa na toleo la hivi karibuni la mkusanyaji. Hata hivyo, Solidity ina mzunguko wa haraka wa matoleo na ina historia ya hitilafu za mkusanyaji, kwa hivyo hatupendekezi toleo la hivi karibuni kwa upelekaji (angalia [pendekezo la toleo la solc la Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33)).
- **Usitumie uunganishaji wa ndani.** Uunganishaji unahitaji utaalamu wa EVM. Usiandike msimbo wa EVM kama hujai_bobea_ karatasi ya njano.

## Miongozo ya upelekaji {#deployment-guidelines}

Mara mkataba unapokuwa umeundwa na kupelekwa:

- **Fuatilia mikataba yako.** Tazama kumbukumbu, na uwe tayari kuchukua hatua ikiwa kuna ukiukaji wa mkataba au mkoba.
- **Ongeza maelezo yako ya mawasiliano kwenye [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).** Orodha hii husaidia wahusika wengine kuwasiliana nawe ikiwa kasoro ya usalama itagunduliwa.
- **Linda mikoba ya watumiaji wenye fursa.** Fuata [mazoea yetu bora](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/) ikiwa unahifadhi funguo katika mikoba ya maunzi.
- **Kuwa na mpango wa kukabiliana na matukio.** Zingatia kuwa mikataba-erevu yako inaweza kuathiriwa. Hata kama mikataba yako haina hitilafu, mshambuliaji anaweza kuchukua udhibiti wa funguo za mmiliki wa mkataba.
