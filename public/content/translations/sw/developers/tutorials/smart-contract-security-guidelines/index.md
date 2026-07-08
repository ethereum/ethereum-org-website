---
title: Miongozo ya usalama wa mkataba mahiri
description: Orodha ya miongozo ya usalama ya kuzingatia unapounda dapp yako
author: "Trailofbits"
tags: ["Solidity", "mikataba mahiri", "usalama"]
skill: intermediate
breadcrumb: Miongozo ya usalama
lang: sw
published: 2020-09-06
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Fuata mapendekezo haya ya kiwango cha juu ili kuunda mikataba mahiri iliyo salama zaidi.

## Miongozo ya muundo {#design-guidelines}

Muundo wa mkataba unapaswa kujadiliwa mapema, kabla ya kuandika mstari wowote wa msimbo.

### Nyaraka na vipimo {#documentation-and-specifications}

Nyaraka zinaweza kuandikwa katika viwango tofauti, na zinapaswa kusasishwa wakati wa kutekeleza mikataba:

- **Maelezo ya mfumo kwa lugha rahisi**, yakielezea kile ambacho mikataba inafanya na mawazo yoyote kwenye msingi wa msimbo.
- **Michoro ya mpangilio na usanifu**, ikijumuisha mwingiliano wa mkataba na mashine ya hali ya mfumo. [Printa za Slither](https://github.com/crytic/slither/wiki/Printer-documentation) zinaweza kusaidia kuzalisha mipangilio hii.
- **Nyaraka za kina za msimbo**, [umbizo la NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html) linaweza kutumika kwa Solidity.

### Ukokotoaji wa mnyororoni dhidi ya nje ya mnyororo {#onchain-vs-offchain-computation}

- **Weka msimbo mwingi uwezavyo nje ya mnyororo.** Weka safu ya mnyororoni iwe ndogo. Chakata data mapema kwa msimbo nje ya mnyororo kwa njia ambayo uthibitishaji mnyororoni unakuwa rahisi. Je, unahitaji orodha iliyopangwa? Panga orodha nje ya mnyororo, kisha uangalie tu mpangilio wake mnyororoni.

### Uwezo wa kuboreshwa {#upgradeability}

Tulijadili suluhu tofauti za uwezo wa kuboreshwa katika [chapisho letu la blogu](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Fanya uamuzi wa makusudi wa kusaidia uwezo wa kuboreshwa au la kabla ya kuandika msimbo wowote. Uamuzi huo utaathiri jinsi unavyounda msimbo wako. Kwa ujumla, tunapendekeza:

- **Kupendelea [uhamishaji wa mkataba](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) badala ya uwezo wa kuboreshwa.** Mifumo ya uhamishaji ina faida nyingi sawa na zile zinazoweza kuboreshwa, bila mapungufu yake.
- **Kutumia muundo wa utenganishaji wa data badala ya ule wa delegatecallproxy.** Ikiwa mradi wako una utenganishaji wazi wa dhana, uwezo wa kuboreshwa kwa kutumia utenganishaji wa data utahitaji marekebisho machache tu. Delegatecallproxy inahitaji utaalamu wa EVM na ina uwezekano mkubwa wa makosa.
- **Andika utaratibu wa uhamishaji/uboreshaji kabla ya usambazaji.** Ikiwa itabidi uchukue hatua chini ya shinikizo bila miongozo yoyote, utafanya makosa. Andika utaratibu wa kufuata mapema. Unapaswa kujumuisha:
  - Miito inayoanzisha mikataba mipya
  - Mahali ambapo funguo zimehifadhiwa na jinsi ya kuzifikia
  - Jinsi ya kuangalia usambazaji! Tengeneza na ujaribu hati ya baada ya usambazaji.

## Miongozo ya utekelezaji {#implementation-guidelines}

**Jitahidi kuwa na urahisi.** Kila wakati tumia suluhisho rahisi zaidi linalofaa dhumuni lako. Mwanachama yeyote wa timu yako anapaswa kuwa na uwezo wa kuelewa suluhisho lako.

### Muundo wa utendakazi {#function-composition}

Usanifu wa msingi wako wa msimbo unapaswa kufanya msimbo wako uwe rahisi kukaguliwa. Epuka chaguzi za usanifu zinazopunguza uwezo wa kufikiri juu ya usahihi wake.

- **Gawanya mantiki ya mfumo wako**, iwe kupitia mikataba mingi au kwa kupanga utendakazi unaofanana pamoja (kwa mfano, uthibitishaji, hesabu, ...).
- **Andika utendakazi mdogo, wenye dhumuni wazi.** Hii itarahisisha ukaguzi na kuruhusu majaribio ya vipengele vya kibinafsi.

### Urithi {#inheritance}

- **Weka urithi uweze kudhibitiwa.** Urithi unapaswa kutumika kugawanya mantiki, hata hivyo, mradi wako unapaswa kulenga kupunguza kina na upana wa mti wa urithi.
- **Tumia [printa ya urithi](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) ya Slither kuangalia mpangilio wa mikataba.** Printa ya urithi itakusaidia kukagua ukubwa wa mpangilio.

### Matukio {#events}

- **Weka logi ya shughuli zote muhimu.** Matukio yatasaidia kutatua mkataba wakati wa uundaji, na kuufuatilia baada ya usambazaji.

### Epuka mitego inayojulikana {#avoid-known-pitfalls}

- **Fahamu masuala ya usalama yanayojulikana sana.** Kuna rasilimali nyingi mtandaoni za kujifunza kuhusu masuala ya kawaida, kama vile [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/), au [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/).
- **Fahamu sehemu za maonyo katika [nyaraka za Solidity](https://docs.soliditylang.org/en/latest/).** Sehemu za maonyo zitakujulisha kuhusu tabia isiyo dhahiri ya lugha.

### Vitegemezi {#dependencies}

- **Tumia maktaba zilizojaribiwa vizuri.** Kuleta msimbo kutoka kwa maktaba zilizojaribiwa vizuri kutapunguza uwezekano wa wewe kuandika msimbo wenye hitilafu. Ikiwa unataka kuandika mkataba wa ERC-20, tumia [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Tumia kidhibiti cha vitegemezi; epuka kunakili na kubandika msimbo.** Ikiwa unategemea chanzo cha nje, basi lazima ukisasishe na chanzo asili.

### Majaribio na uthibitishaji {#testing-and-verification}

- **Andika majaribio ya kina ya vipengele.** Kifurushi kikubwa cha majaribio ni muhimu ili kuunda programu ya ubora wa juu.
- **Andika ukaguzi na sifa maalum za [Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) na [Manticore](https://github.com/trailofbits/manticore).** Zana za kiotomatiki zitasaidia kuhakikisha mkataba wako uko salama. Kagua mwongozo huu uliosalia ili kujifunza jinsi ya kuandika ukaguzi na sifa bora.
- **Tumia [crytic.io](https://crytic.io/).** Crytic inaunganishwa na GitHub, inatoa ufikiaji wa vitambuzi vya kibinafsi vya Slither, na inaendesha ukaguzi wa sifa maalum kutoka kwa Echidna.

### Solidity {#solidity}

- **Pendelea Solidity 0.5 badala ya 0.4 na 0.6.** Kwa maoni yetu, Solidity 0.5 ni salama zaidi na ina mbinu bora zilizojengewa ndani kuliko 0.4. Solidity 0.6 imethibitika kutokuwa thabiti sana kwa uzalishaji na inahitaji muda ili kukomaa.
- **Tumia toleo thabiti kukusanya; tumia toleo la hivi punde kuangalia maonyo.** Hakikisha kuwa msimbo wako hauna masuala yaliyoripotiwa na toleo la hivi punde la kikusanyaji. Hata hivyo, Solidity ina mzunguko wa haraka wa matoleo na ina historia ya hitilafu za kikusanyaji, kwa hivyo hatupendekezi toleo la hivi punde kwa usambazaji (tazama [pendekezo la toleo la solc](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33) la Slither).
- **Usitumie assembly ya ndani.** Assembly inahitaji utaalamu wa EVM. Usiandike msimbo wa EVM ikiwa _hujabobea_ kwenye waraka wa manjano.

## Miongozo ya usambazaji {#deployment-guidelines}

Pindi mkataba utakapoundwa na kusambazwa:

- **Fuatilia mikataba yako.** Tazama logi, na uwe tayari kuchukua hatua endapo mkataba au mkoba utaingiliwa.
- **Ongeza maelezo yako ya mawasiliano kwenye [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).** Orodha hii inasaidia wahusika wengine kuwasiliana nawe ikiwa dosari ya usalama itagunduliwa.
- **Linda mikoba ya watumiaji wenye mapendeleo.** Fuata [mbinu zetu bora](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/) ikiwa unahifadhi funguo kwenye mikoba ya maunzi.
- **Kuwa na mpango wa kukabiliana na matukio.** Zingatia kwamba mikataba yako mahiri inaweza kuingiliwa. Hata kama mikataba yako haina hitilafu, mshambuliaji anaweza kuchukua udhibiti wa funguo za mmiliki wa mkataba.