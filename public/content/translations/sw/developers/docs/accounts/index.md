---
title: Akaunti za Ethereum
description: Maelezo ya akaunti za Ethereum – miundo ya data zake na uhusiano wake na kriptografia ya jozi ya funguo.
lang: sw
---

Akaunti ya [Ethereum](/) ni huluki yenye salio la Etha (ETH) inayoweza kutuma ujumbe kwenye Ethereum. Akaunti zinaweza kudhibitiwa na mtumiaji au kusambazwa kama mikataba mahiri.

## Mahitaji ya awali {#prerequisites}

Ili kukusaidia kuelewa ukurasa huu vizuri zaidi, tunapendekeza usome kwanza [utangulizi wetu wa Ethereum](/developers/docs/intro-to-ethereum/).

## Aina za akaunti {#types-of-account}

Ethereum ina aina mbili za akaunti:

- Akaunti inayomilikiwa na mtu wa nje (EOA) – inadhibitiwa na mtu yeyote aliye na funguo za siri
- Akaunti ya mkataba – mkataba mahiri uliosambazwa kwenye mtandao, unaodhibitiwa na msimbo. Jifunze kuhusu [mikataba mahiri](/developers/docs/smart-contracts/)

Aina zote mbili za akaunti zina uwezo wa:

- Kupokea, kushikilia na kutuma ETH na tokeni
- Kutangamana na mikataba mahiri iliyosambazwa

### Tofauti kuu {#key-differences}

**Inayomilikiwa na mtu wa nje**

- Kuunda akaunti hakugharimu chochote
- Inaweza kuanzisha miamala
- Miamala kati ya akaunti zinazomilikiwa na watu wa nje inaweza tu kuwa uhamishaji wa ETH/tokeni
- Imeundwa na jozi ya funguo za kriptografia: funguo za umma na za siri zinazodhibiti shughuli za akaunti

**Mkataba**

- Kuunda mkataba kuna gharama kwa sababu unatumia hifadhi ya mtandao
- Inaweza tu kutuma ujumbe kama jibu la kupokea muamala
- Miamala kutoka kwa akaunti ya nje kwenda kwa akaunti ya mkataba inaweza kuanzisha msimbo ambao unaweza kutekeleza vitendo vingi tofauti, kama vile kuhamisha tokeni au hata kuunda mkataba mpya
- Akaunti za mkataba hazina funguo za siri. Badala yake, zinadhibitiwa na mantiki ya msimbo wa mkataba mahiri

## Uchunguzi wa akaunti {#an-account-examined}

Akaunti za Ethereum zina sehemu nne:

- `nonce` – Kihesabu kinachoonyesha idadi ya miamala iliyotumwa kutoka kwa akaunti inayomilikiwa na mtu wa nje au idadi ya mikataba iliyoundwa na akaunti ya mkataba. Muamala mmoja tu wenye nonsi fulani ndio unaoweza kutekelezwa kwa kila akaunti, ukilinda dhidi ya mashambulizi ya kurudia ambapo miamala iliyosainiwa inatangazwa mara kwa mara na kutekelezwa tena.
- `balance` – Idadi ya Wei inayomilikiwa na anwani hii. Wei ni kigawanyo cha ETH na kuna Wei 1e+18 kwa kila ETH.
- `codeHash` – Heshi hii inarejelea _msimbo_ wa akaunti kwenye mashine pepe ya Ethereum (EVM). Akaunti za mkataba zina vipande vya msimbo vilivyopangwa ndani ambavyo vinaweza kufanya shughuli tofauti. Msimbo huu wa EVM hutekelezwa ikiwa akaunti itapata mwito wa ujumbe. Hauwezi kubadilishwa, tofauti na sehemu zingine za akaunti. Vipande vyote vya msimbo kama hivyo vimo kwenye hifadhidata ya hali chini ya heshi zao zinazolingana kwa ajili ya kurejeshwa baadaye. Thamani hii ya heshi inajulikana kama codeHash. Kwa akaunti zinazomilikiwa na watu wa nje, sehemu ya codeHash ni heshi ya mfuatano tupu.
- `storageRoot` – Wakati mwingine inajulikana kama heshi ya hifadhi. Heshi ya biti 256 ya nodi ya mzizi ya [Trie ya Merkle Patricia](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/) inayosimba yaliyomo kwenye hifadhi ya akaunti (upangaji kati ya thamani za nambari kamili za biti 256), iliyosimbwa kwenye trie kama upangaji kutoka kwa heshi ya biti 256 ya Keccak ya funguo za nambari kamili za biti 256 hadi thamani za nambari kamili za biti 256 zilizosimbwa kwa RLP. Trie hii inasimba heshi ya yaliyomo kwenye hifadhi ya akaunti hii, na kwa chaguo-msingi huwa tupu.

![A diagram showing the make up of an account](./accounts.png)
_Mchoro umechukuliwa kutoka [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Akaunti zinazomilikiwa na watu wa nje na jozi za funguo {#externally-owned-accounts-and-key-pairs}

Akaunti imeundwa na jozi ya funguo za kriptografia: ya umma na ya siri. Zinasaidia kuthibitisha kwamba muamala ulisainiwa kweli na mtumaji na kuzuia udanganyifu. Ufunguo wako wa siri ndio unaotumia kusaini miamala, kwa hivyo unakupa ulinzi juu ya fedha zinazohusiana na akaunti yako. Kwa kweli hushikilii sarafu-fiche, unashikilia funguo za siri – fedha huwa kwenye leja ya Ethereum kila wakati.

Hii inazuia watendaji wabaya kutangaza miamala feki kwa sababu unaweza kuthibitisha mtumaji wa muamala kila wakati.

Ikiwa Alice anataka kutuma Etha kutoka kwa akaunti yake kwenda kwa akaunti ya Bob, Alice anahitaji kuunda ombi la muamala na kulituma kwenye mtandao kwa uthibitisho. Matumizi ya Ethereum ya kriptografia ya ufunguo wa umma yanahakikisha kwamba Alice anaweza kuthibitisha kwamba yeye ndiye aliyeanzisha ombi la muamala hapo awali. Bila mbinu za kriptografia, adui mbaya Eve angeweza tu kutangaza hadharani ombi linaloonekana kama "tuma ETH 5 kutoka kwa akaunti ya Alice kwenda kwa akaunti ya Eve," na hakuna mtu ambaye angeweza kuthibitisha kwamba halikutoka kwa Alice.

## Uundaji wa akaunti {#account-creation}

Unapotaka kuunda akaunti, maktaba nyingi zitakutengenezea ufunguo wa siri wa nasibu.

Ufunguo wa siri umeundwa na herufi 64 za heksadesimali na unaweza kusimbwa kwa nenosiri.

Mfano:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

Ufunguo wa umma unazalishwa kutoka kwa ufunguo wa siri kwa kutumia [Kanuni ya Sahihi ya Kidijitali ya Tao la Duaradufu](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). Unapata anwani ya umma kwa akaunti yako kwa kuchukua baiti 20 za mwisho za heshi ya Keccak-256 ya ufunguo wa umma na kuongeza `0x` mwanzoni.

Hii inamaanisha Akaunti inayomilikiwa na mtu wa nje (EOA) ina anwani ya herufi 42 (sehemu ya baiti 20 ambayo ni herufi 40 za heksadesimali pamoja na kiambishi awali cha `0x`).

Mfano:

`0x5e97870f263700f46aa00d967821199b9bc5a120`

Mfano ufuatao unaonyesha jinsi ya kutumia zana ya kusaini inayoitwa [Clef](https://geth.ethereum.org/docs/tools/clef/introduction) ili kuunda akaunti mpya. Clef ni zana ya usimamizi wa akaunti na kusaini inayokuja pamoja na mteja wa Ethereum, [Geth](https://geth.ethereum.org). Amri ya `clef newaccount` inaunda jozi mpya ya funguo na kuzihifadhi kwenye hifadhi ya funguo iliyosimbwa.

```
> clef newaccount --keystore <njia>

Tafadhali weka nenosiri kwa akaunti mpya itakayoundwa:
> <nenosiri>

------------
INFO [10-28|16:19:09.156] Ufunguo wako mpya umezalishwa       address=0x5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Tafadhali hifadhi nakala ya faili lako la ufunguo      path=/home/user/go-ethereum/data/keystore/UTC--2022-10-28T15-19-08.000825927Z--5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Tafadhali kumbuka nenosiri lako!
Akaunti iliyozalishwa 0x5e97870f263700f46aa00d967821199b9bc5a120
```

[Nyaraka za Geth](https://geth.ethereum.org/docs)

Inawezekana kupata funguo mpya za umma kutoka kwa ufunguo wako wa siri, lakini huwezi kupata ufunguo wa siri kutoka kwa funguo za umma. Ni muhimu sana kuweka funguo zako za siri salama na, kama jina linavyopendekeza, **SIRI**.

Unahitaji ufunguo wa siri ili kusaini ujumbe na miamala ambayo hutoa sahihi. Wengine wanaweza kisha kuchukua sahihi ili kupata ufunguo wako wa umma, kuthibitisha mwandishi wa ujumbe. Katika programu yako, unaweza kutumia maktaba ya JavaScript kutuma miamala kwenye mtandao.

## Akaunti za mkataba {#contract-accounts}

Akaunti za mkataba pia zina anwani ya heksadesimali ya herufi 42:

Mfano:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

Anwani ya mkataba kawaida hutolewa wakati mkataba unasambazwa kwenye Mnyororo wa vitalu wa Ethereum. Anwani inatoka kwa anwani ya muundaji na idadi ya miamala iliyotumwa kutoka kwa anwani hiyo ("nonsi").

## Funguo za mthibitishaji {#validators-keys}

Pia kuna aina nyingine ya ufunguo katika Ethereum, iliyoanzishwa wakati Ethereum ilipobadilika kutoka Uthibitisho wa Kazi (PoW) kwenda kwenye mwafaka unaotegemea Uthibitisho wa Dau (PoS). Hizi ni funguo za 'BLS' na zinatumika kutambua wathibitishaji. Funguo hizi zinaweza kujumlishwa kwa ufanisi ili kupunguza kipimo data kinachohitajika kwa mtandao kufikia mwafaka. Bila ujumlishaji huu wa funguo, dhamana ya chini zaidi kwa mthibitishaji ingekuwa kubwa zaidi.

[Zaidi kuhusu funguo za mthibitishaji](/developers/docs/consensus-mechanisms/pos/keys/).

## Ujumbe kuhusu mikoba {#a-note-on-wallets}

Akaunti sio mkoba. Mkoba ni kiolesura au programu inayokuruhusu kutangamana na akaunti yako ya Ethereum, iwe ni akaunti inayomilikiwa na mtu wa nje au akaunti ya mkataba.

## Onyesho la kuona {#a-visual-demo}

Mtazame Austin akikupitisha kwenye vipengele vya heshi, na jozi za funguo.

<VideoWatch slug="hash-function-eth-build" />

<VideoWatch slug="key-pair-eth-build" />

## Kusoma zaidi {#further-reading}

- [Kuelewa Akaunti za Ethereum](https://info.etherscan.com/understanding-ethereum-accounts/) - Etherscan

_Je, unajua nyenzo ya jamii iliyokusaidia? Hariri ukurasa huu na uiongeze!_

## Mada zinazohusiana {#related-topics}

- [Mikataba mahiri](/developers/docs/smart-contracts/)
- [Miamala](/developers/docs/transactions/)