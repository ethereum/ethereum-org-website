---
title: Funguo katika Uthibitisho wa Dau (PoS) wa Ethereum
description: Maelezo ya funguo zinazotumika katika utaratibu wa mwafaka wa Uthibitisho wa Dau (PoS) wa Ethereum
lang: sw
---

Ethereum hulinda rasilimali za watumiaji ikitumia kriptografia ya ufunguo wa umma na ufunguo wa siri. Ufunguo wa umma hutumika kama msingi wa anwani ya Ethereum—yaani, unaonekana kwa umma kwa ujumla na hutumika kama kitambulisho cha kipekee. Ufunguo wa siri (au 'wa faragha') unapaswa kufikiwa tu na mmiliki wa akaunti. Ufunguo wa siri hutumika 'kusaini' miamala na data ili kriptografia iweze kuthibitisha kuwa mmiliki anaidhinisha kitendo fulani cha ufunguo wa siri mahususi.

Funguo za Ethereum huzalishwa kwa kutumia [kriptografia ya elliptic-curve](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

Hata hivyo, wakati Ethereum ilipobadilika kutoka [Uthibitisho wa Kazi (PoW)](/developers/docs/consensus-mechanisms/pow) kwenda [Uthibitisho wa Dau (PoS)](/developers/docs/consensus-mechanisms/pos) aina mpya ya ufunguo iliongezwa kwenye Ethereum. Funguo za asili bado zinafanya kazi sawa na hapo awali—hakukuwa na mabadiliko kwenye funguo zinazotegemea elliptic-curve zinazolinda akaunti. Hata hivyo, watumiaji walihitaji aina mpya ya ufunguo kwa ajili ya kushiriki katika Uthibitisho wa Dau (PoS) kwa kuweka dhamana ya ETH na kuendesha wathibitishaji. Uhitaji huu ulitokana na changamoto za uwezo wa kupanuka zinazohusiana na jumbe nyingi zinazopita kati ya idadi kubwa ya wathibitishaji ambazo zilihitaji mbinu ya kriptografia inayoweza kujumlishwa kwa urahisi ili kupunguza kiasi cha mawasiliano kinachohitajika kwa mtandao kufikia mwafaka.

Aina hii mpya ya ufunguo inatumia [mpango wa sahihi wa **Boneh-Lynn-Shacham (BLS)**](https://wikipedia.org/wiki/BLS_digital_signature). BLS inawezesha ujumuishaji mzuri sana wa sahihi lakini pia inaruhusu uhandisi wa kinyume wa funguo za wathibitishaji binafsi zilizojumuishwa na ni bora kwa kusimamia vitendo kati ya wathibitishaji.

## Aina mbili za funguo za mthibitishaji {#two-types-of-keys}

Kabla ya kubadilika kwenda kwenye Uthibitisho wa Dau (PoS), watumiaji wa Ethereum walikuwa na ufunguo wa siri mmoja tu unaotegemea elliptic-curve ili kufikia fedha zao. Kwa kuanzishwa kwa Uthibitisho wa Dau (PoS), watumiaji waliotaka kuwa waweka dhamana wa pekee pia walihitaji **ufunguo wa mthibitishaji** na **ufunguo wa utoaji**.

### Ufunguo wa mthibitishaji {#validator-key}

Ufunguo wa kusaini wa mthibitishaji unajumuisha vipengele viwili:

- Ufunguo wa **siri** wa mthibitishaji
- Ufunguo wa **umma** wa mthibitishaji

Madhumuni ya ufunguo wa siri wa mthibitishaji ni kusaini shughuli za mnyororoni kama vile mapendekezo ya kitalu na uthibitisho. Kwa sababu hii, funguo hizi lazima zihifadhiwe kwenye mkoba wa mtandaoni.

Unyumbufu huu una faida ya kuhamisha funguo za kusaini za mthibitishaji haraka sana kutoka kifaa kimoja hadi kingine, hata hivyo, ikiwa zimepotea au kuibiwa, mwizi anaweza **kutenda kwa nia mbaya** kwa njia chache:

- Kusababisha mthibitishaji kukumbwa na ukataji kwa:
  - Kuwa mpendekezaji na kusaini vitalu viwili tofauti vya beacon kwa sloti moja
  - Kuwa mtoa uthibitisho na kusaini uthibitisho ambao "unazunguka" mwingine
  - Kuwa mtoa uthibitisho na kusaini thibitisho mbili tofauti zenye lengo moja
- Kulazimisha kujitoa kwa hiari, ambako kunamzuia mthibitishaji kuweka dhamana, na kutoa ufikiaji wa salio lake la ETH kwa mmiliki wa ufunguo wa utoaji

**Ufunguo wa umma wa mthibitishaji** unajumuishwa kwenye data ya muamala wakati mtumiaji anaweka ETH kwenye mkataba wa amana ya uwekaji dhamana. Hii inajulikana kama _data ya amana_ na inaruhusu Ethereum kumtambua mthibitishaji.

### Vitambulisho vya uondoaji {#withdrawal-credentials}

Kila mthibitishaji ana sifa inayojulikana kama _vitambulisho vya uondoaji_. Baiti ya kwanza ya uwanja huu wa baiti 32 inatambulisha aina ya akaunti: `0x00` inawakilisha vitambulisho asili vya BLS (kabla ya Shapella, visivyoweza kutolewa), `0x01` inawakilisha vitambulisho vya zamani vinavyoelekeza kwenye anwani ya tabaka la utekelezaji, na `0x02` inawakilisha aina ya kisasa ya kitambulisho cha kujumuisha.

Wathibitishaji wenye funguo za BLS za `0x00` lazima wasasishe vitambulisho hivi ili kuelekeza kwenye anwani ya tabaka la utekelezaji ili kuwezesha malipo ya salio la ziada au utoaji kamili kutoka kwenye uwekaji dhamana. Hili linaweza kufanywa kwa kutoa anwani ya tabaka la utekelezaji katika data ya amana wakati wa uzalishaji wa awali wa ufunguo, _AU_ kwa kutumia ufunguo wa utoaji baadaye kusaini na kutangaza ujumbe wa `BLSToExecutionChange`.

[Zaidi kuhusu vitambulisho vya uondoaji vya mthibitishaji](/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/)

### Ufunguo wa utoaji {#withdrawal-key}

Ufunguo wa utoaji utahitajika ili kusasisha vitambulisho vya uondoaji kuelekeza kwenye anwani ya tabaka la utekelezaji, ikiwa haikuwekwa wakati wa amana ya awali. Hii itawezesha malipo ya salio la ziada kuanza kushughulikiwa, na pia itaruhusu watumiaji kufanya utoaji kamili wa ETH zao walizoweka dhamana.

Kama tu funguo za mthibitishaji, funguo za utoaji pia zinajumuisha vipengele viwili:

- Ufunguo wa **siri** wa utoaji
- Ufunguo wa **umma** wa utoaji

Kupoteza ufunguo huu kabla ya kusasisha vitambulisho vya uondoaji kuwa aina ya `0x01` inamaanisha kupoteza ufikiaji wa salio la mthibitishaji. Mthibitishaji bado anaweza kusaini uthibitisho na vitalu kwa kuwa vitendo hivi vinahitaji ufunguo wa siri wa mthibitishaji, hata hivyo kuna motisha ndogo au hakuna kabisa ikiwa funguo za utoaji zimepotea.

Kutenganisha funguo za mthibitishaji na funguo za akaunti ya Ethereum kunawezesha wathibitishaji wengi kuendeshwa na mtumiaji mmoja.

![validator key schematic](validator-key-schematic.png)

**Kumbuka**: Kujitoa kwenye majukumu ya uwekaji dhamana na kufanya utoaji wa salio la mthibitishaji kwa sasa kunahitaji kusaini [ujumbe wa kujitoa kwa hiari (VEM)](https://mirror.xyz/ladislaus.eth/wmoBbUBes2Wp1_6DvP6slPabkyujSU7MZOFOC3QpErs&1) kwa kutumia ufunguo wa mthibitishaji. Hata hivyo, [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) ni pendekezo ambalo litaruhusu mtumiaji kuanzisha kujitoa kwa mthibitishaji na kufanya utoaji wa salio lake kwa kusaini jumbe za kujitoa kwa kutumia ufunguo wa utoaji katika siku zijazo. Hii itapunguza dhana za uaminifu kwa kuwezesha waweka dhamana wanaokaimisha ETH kwa [watoa huduma za uwekaji dhamana](/staking/saas/#what-is-staking-as-a-service) kuendelea kudhibiti fedha zao.

## Kuzalisha funguo kutoka kwenye kirai cha mbegu {#deriving-keys-from-seed}

Ikiwa kila ETH 32 zilizowekwa dhamana zingehitaji seti mpya ya funguo 2 zinazojitegemea kabisa, usimamizi wa funguo ungekuwa mgumu haraka, hasa kwa watumiaji wanaoendesha wathibitishaji wengi. Badala yake, funguo nyingi za mthibitishaji zinaweza kuzalishwa kutoka kwenye siri moja ya kawaida na kuhifadhi siri hiyo moja kunaruhusu ufikiaji wa funguo nyingi za mthibitishaji.

[Nemoniki (Mnemonics)](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) na njia ni vipengele muhimu ambavyo watumiaji mara nyingi hukutana navyo wakati [wanafikia](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0) mikoba yao. Nemoniki ni mfuatano wa maneno ambayo hufanya kazi kama mbegu ya awali kwa ufunguo wa siri. Inapounganishwa na data ya ziada, nemoniki inazalisha heshi inayojulikana kama 'ufunguo mkuu'. Hii inaweza kufikiriwa kama mzizi wa mti. Matawi kutoka kwenye mzizi huu yanaweza kuzalishwa kwa kutumia njia ya kihierarkia ili nodi tanzu ziweze kuwepo kama michanganyiko ya heshi ya nodi mzazi wao na faharisi yao kwenye mti. Soma kuhusu viwango vya [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) na [BIP-19](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) kwa ajili ya uzalishaji wa ufunguo unaotegemea nemoniki.

Njia hizi zina muundo ufuatao, ambao utakuwa unafahamika kwa watumiaji ambao wametumia mikoba ya maunzi:

```
m/44'/60'/0'/0`
```

Mikwaju katika njia hii inatenganisha vipengele vya ufunguo wa siri kama ifuatavyo:

```
master_key / purpose / coin_type / account / change / address_index
```

Mantiki hii inawezesha watumiaji kuunganisha wathibitishaji wengi iwezekanavyo kwenye **kirai cha nemoniki** kimoja kwa sababu mzizi wa mti unaweza kuwa wa kawaida, na utofautishaji unaweza kutokea kwenye matawi. Mtumiaji anaweza **kuzalisha idadi yoyote ya funguo** kutoka kwenye kirai cha nemoniki.

```
[m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Kila tawi linatenganishwa na `/` kwa hivyo `m/2` inamaanisha anza na ufunguo mkuu na ufuate tawi la 2. Katika mchoro hapa chini kirai kimoja cha nemoniki kinatumika kuhifadhi funguo tatu za utoaji, kila moja ikiwa na wathibitishaji wawili wanaohusishwa.

![validator key logic](multiple-keys.png)

## Kusoma zaidi {#further-reading}

- [Chapisho la blogu la Taasisi ya Ethereum na Carl Beekhuizen](https://blog.ethereum.org/2020/05/21/keys)
- [Uzalishaji wa ufunguo wa EIP-2333 BLS12-381](https://eips.ethereum.org/EIPS/eip-2333)
- [EIP-7002: Kujitoa Kunakoanzishwa na Tabaka la Utekelezaji](https://web.archive.org/web/20250125035123/https://research.2077.xyz/eip-7002-unpacking-improvements-to-staking-ux-post-merge)
- [Usimamizi wa ufunguo kwa kiwango kikubwa](https://docs.ethstaker.cc/ethstaker-knowledge-base/scaled-node-operators/key-management-at-scale)