---
title: Funguo katika Ethereum ya uthibitisho-wa-hisa
description: Ufafanuzi wa funguo zinazotumika katika utaratibu wa makubaliano wa uthibitisho-wa-hisa wa Ethereum
lang: sw
---

Ethereum hulinda mali za mtumiaji kwa kutumia kriptografia ya funguo za umma-binafsi. Ufunguo wa umma hutumika kama msingi wa anwani ya Ethereum—yaani, unaonekana kwa umma kwa ujumla na hutumika kama kitambulisho cha kipekee. Ufunguo binafsi (au wa 'siri') unapaswa kufikiwa tu na mmiliki wa akaunti. Ufunguo binafsi hutumika 'kutia saini' miamala na data ili kriptografia iweze kuthibitisha kwamba mmiliki anaidhinisha hatua fulani ya ufunguo binafsi maalum.

Funguo za Ethereum hutengenezwa kwa kutumia [kriptografia ya mkunjo-duaradufu](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

Hata hivyo, wakati Ethereum ilipobadilisha kutoka [uthibitisho-wa-kazi](/developers/docs/consensus-mechanisms/pow) kwenda [uthibitisho-wa-hisa](/developers/docs/consensus-mechanisms/pos), aina mpya ya ufunguo iliongezwa kwenye Ethereum. Funguo za awali bado zinafanya kazi sawa na hapo awali—hapakuwa na mabadiliko yoyote kwenye funguo za msingi wa mkunjo-duaradufu zinazolinda akaunti. Hata hivyo, watumiaji walihitaji aina mpya ya ufunguo kwa ajili ya kushiriki katika uthibitisho-wa-hisa kwa kusimamisha ETH na kuendesha wathibitishaji. Hitaji hili lilitokana na changamoto za upanuzi zinazohusiana na jumbe nyingi zinazopita kati ya idadi kubwa ya wathibitishaji ambazo zilihitaji mbinu ya kriptografia ambayo inaweza kujumlishwa kwa urahisi ili kupunguza kiwango cha mawasiliano kinachohitajika ili mtandao ufikie makubaliano.

Aina hii mpya ya ufunguo inatumia mpango wa sahihi wa [**Boneh-Lynn-Shacham (BLS)**](https://wikipedia.org/wiki/BLS_digital_signature). BLS inawezesha ujumlishaji mzuri sana wa sahihi lakini pia inaruhusu ubunifu wa kinyumenyume wa funguo za wathibitishaji binafsi zilizojumlishwa na ni bora kwa kusimamia vitendo kati ya wathibitishaji.

## Aina mbili za funguo za mthibitishaji {#two-types-of-keys}

Kabla ya kubadili kwenda uthibitisho-wa-hisa, watumiaji wa Ethereum walikuwa na ufunguo binafsi mmoja tu wa msingi wa mkunjo-duaradufu ili kufikia fedha zao. Kwa kuanzishwa kwa uthibitisho-wa-hisa, watumiaji waliotaka kuwa wasimamishaji wa pekee pia walihitaji **ufunguo wa mthibitishaji** na **ufunguo wa kutoa**.

### Ufunguo wa mthibitishaji {#validator-key}

Ufunguo wa kutia saini wa mthibitishaji unajumuisha vitu viwili:

- Ufunguo **binafsi** wa mthibitishaji
- Ufunguo wa **umma** wa mthibitishaji

Madhumuni ya ufunguo binafsi wa mthibitishaji ni kutia saini shughuli za kwenye mnyororo kama vile mapendekezo ya bloku na uthibitisho. Kwa sababu ya hili, funguo hizi lazima zihifadhiwe katika hot wallet.

Unyumbufu huu una faida ya kuhamisha funguo za kutia saini za mthibitishaji haraka sana kutoka kifaa kimoja hadi kingine, hata hivyo, zikipotea au kuibiwa, mwizi anaweza **kutenda kwa nia mbaya** kwa njia chache:

- Kusababisha mthibitishaji apigwe faini kwa:
  - Kuwa mpendekezaji na kutia saini bloku mbili tofauti za beacon kwa nafasi moja
  - Kuwa mthibitishaji na kutia saini uthibitisho ambao "unazunguka" mwingine
  - Kuwa mthibitishaji na kutia saini uthibitisho mbili tofauti zenye lengo sawa
- Kulazimisha kujiondoa kwa hiari, ambayo humzuia mthibitishaji kusimamisha, na kumpa ufikiaji wa salio lake la ETH mmiliki wa ufunguo wa kutoa

**Ufunguo wa umma wa mthibitishaji** hujumuishwa kwenye data ya muamala mtumiaji anapoweka ETH kwenye mkataba wa amana ya kusimamisha. Hii inajulikana kama _data ya amana_ na inairuhusu Ethereum kumtambua mthibitishaji.

### Vitambulisho vya utoaji {#withdrawal-credentials}

Kila mthibitishaji ana sifa inayojulikana kama _vitambulisho vya utoaji_. Baiti ya kwanza ya sehemu hii ya baiti 32 hutambulisha aina ya akaunti: `0x00` inawakilisha vitambulisho asili vya BLS (kabla ya Shapella, visivyoweza kutolewa), `0x01` inawakilisha vitambulisho vya zamani vinavyoelekeza kwenye anwani ya utekelezaji, na `0x02` inawakilisha aina ya kisasa ya kitambulisho cha kujumuisha.

Wathibitishaji walio na funguo za BLS za `0x00` lazima wasasishe vitambulisho hivi ili vielekeze kwenye anwani ya utekelezaji ili kuwezesha malipo ya salio la ziada au utoaji kamili kutoka kwenye usimamishaji. Hili linaweza kufanywa kwa kutoa anwani ya utekelezaji katika data ya amana wakati wa utengenezaji wa awali wa funguo, _AU_ kwa kutumia ufunguo wa kutoa baadaye kutia saini na kutangaza ujumbe wa `BLSToExecutionChange`.

[Maelezo zaidi kuhusu vitambulisho vya utoaji vya wathibitishaji](/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/)

### Ufunguo wa kutoa {#withdrawal-key}

Ufunguo wa kutoa utahitajika kusasisha vitambulisho vya utoaji ili vielekeze kwenye anwani ya utekelezaji, ikiwa haukuwekwa wakati wa amana ya awali. Hii itawezesha malipo ya salio la ziada kuanza kushughulikiwa, na pia itawaruhusu watumiaji kutoa kikamilifu ETH yao iliyosimamishwa.

Kama tu funguo za mthibitishaji, funguo za kutoa pia zinajumuisha vipengele viwili:

- Ufunguo **binafsi** wa kutoa
- Ufunguo wa **umma** wa kutoa

Kupoteza ufunguo huu kabla ya kusasisha vitambulisho vya utoaji kuwa aina ya `0x01` kunamaanisha kupoteza ufikiaji wa salio la mthibitishaji. Mthibitishaji bado anaweza kutia saini uthibitisho na bloku kwa kuwa vitendo hivi vinahitaji ufunguo binafsi wa mthibitishaji, hata hivyo kuna motisha mdogo au hakuna kabisa ikiwa funguo za kutoa zimepotea.

Kutenganisha funguo za mthibitishaji kutoka kwenye funguo za akaunti ya Ethereum kunawezesha wathibitishaji wengi kuendeshwa na mtumiaji mmoja.

![mchoro wa ufunguo wa mthibitishaji](validator-key-schematic.png)

**Kumbuka**: Kujiondoa kwenye majukumu ya usimamishaji na kutoa salio la mthibitishaji kwa sasa kunahitaji kutia saini [ujumbe wa kujiondoa kwa hiari (VEM)](https://mirror.xyz/ladislaus.eth/wmoBbUBes2Wp1_6DvP6slPabkyujSU7MZOFOC3QpErs&1) kwa kutumia ufunguo wa mthibitishaji. Hata hivyo, [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) ni pendekezo ambalo litamruhusu mtumiaji kuanzisha kujiondoa kwa mthibitishaji na kutoa salio lake kwa kutia saini jumbe za kujiondoa kwa kutumia ufunguo wa kutoa katika siku zijazo. Hii itapunguza dhana za uaminifu kwa kuwawezesha wasimamishaji wanaokabidhi ETH kwa [watoa huduma za usimamishaji kama huduma](/staking/saas/#what-is-staking-as-a-service) kubaki na udhibiti wa fedha zao.

## Kutohoa funguo kutoka kwenye fungu la maneno {#deriving-keys-from-seed}

Ikiwa kila ETH 32 zilizosimamishwa zingehitaji seti mpya ya funguo 2 zinazojitegemea kabisa, usimamizi wa funguo ungekuwa mgumu haraka, hasa kwa watumiaji wanaoendesha wathibitishaji wengi. Badala yake, funguo nyingi za wathibitishaji zinaweza kutoholewa kutoka siri moja ya pamoja na kuhifadhi siri hiyo moja kunaruhusu ufikiaji wa funguo nyingi za wathibitishaji.

[Manemoni](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) na njia ni sifa maarufu ambazo watumiaji hukutana nazo mara kwa mara wanapo[fikia](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0) mikoba yao. Manemoni ni mfuatano wa maneno ambayo hufanya kazi kama mbegu ya awali kwa ufunguo binafsi. Inapojumuishwa na data ya ziada, manemoni hutengeneza hashi inayojulikana kama 'ufunguo mkuu'. Hii inaweza kufikiriwa kama mzizi wa mti. Matawi kutoka kwenye mzizi huu yanaweza kutoholewa kwa kutumia njia ya kihierarkia ili nodi za watoto ziweze kuwepo kama mchanganyiko wa hashi ya nodi yao ya mzazi na faharasa yao kwenye mti. Soma kuhusu viwango vya [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) na [BIP-19](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) kwa ajili ya utengenezaji wa funguo za msingi wa manemoni.

Njia hizi zina muundo ufuatao, ambao utakuwa unajulikana kwa watumiaji ambao wamewahi kutumia mikoba ya maunzi:

```
m/44'/60'/0'/0`
```

Mikwaju katika njia hii hutenganisha vipengele vya ufunguo binafsi kama ifuatavyo:

```
master_key / purpose / coin_type / account / change / address_index
```

Mantiki hii huwawezesha watumiaji kuambatisha wathibitishaji wengi iwezekanavyo kwenye **fungu moja la manemoni** kwa sababu mzizi wa mti unaweza kuwa wa pamoja, na utofautishaji unaweza kutokea kwenye matawi. Mtumiaji anaweza **kutohoa idadi yoyote ya funguo** kutoka kwenye fungu la manemoni.

```
      [m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Kila tawi limetenganishwa na `/` kwa hivyo `m/2` inamaanisha anza na ufunguo mkuu na ufuate tawi la 2. Katika mchoro ulio hapa chini, fungu moja la manemoni linatumika kuhifadhi funguo tatu za kutoa, kila moja ikiwa na wathibitishaji wawili wanaohusiana.

![mantiki ya ufunguo wa mthibitishaji](multiple-keys.png)

## Masomo zaidi {#further-reading}

- [Chapisho la blogu la Wakfu wa Ethereum na Carl Beekhuizen](https://blog.ethereum.org/2020/05/21/keys/)
- [Utengenezaji wa funguo za EIP-2333 BLS12-381](https://eips.ethereum.org/EIPS/eip-2333)
- [EIP-7002: Uondoaji Unaoanzishwa na Safu ya Utekelezaji](https://web.archive.org/web/20250125035123/https://research.2077.xyz/eip-7002-unpacking-improvements-to-staking-ux-post-merge)
- [Usimamizi wa funguo kwa kiwango kikubwa](https://docs.ethstaker.cc/ethstaker-knowledge-base/scaled-node-operators/key-management-at-scale)
