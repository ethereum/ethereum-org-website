---
title: Akaunti za Ethereum
description: "Maelezo ya akaunti za Ethereum – miundo yao ya data na uhusiano wao na usimbaji fiche wa jozi za funguo."
lang: sw
---

Akaunti ya Ethereum ni chombo chenye salio la ether (ETH) ambacho kinaweza kutuma ujumbe kwenye Ethereum. Akaunti zinaweza kudhibitiwa na mtumiaji au kupelekwa kama mikataba mahiri

## Mahitaji ya awali {#prerequisites}

Ili kukusaidia kuelewa ukurasa huu vyema, tunapendekeza usome kwanza [utangulizi wetu wa Ethereum](/developers/docs/intro-to-ethereum/).

## Aina za akaunti {#types-of-account}

Ethereum ina aina mbili za akaunti:

- Akaunti inayomilikiwa nje (EOA) – inadhibitiwa na yeyote mwenye funguo za kibinafsi
- Akaunti ya mkataba – mkataba mahiri uliowekwa kwenye mtandao, unaodhibitiwa na msimbo Jifunze kuhusu [mikataba-erevu](/developers/docs/smart-contracts/)

Aina zote mbili za akaunti zina uwezo wa:

- Pokea, shikilia, na tuma ETH na tokeni
- Shirikiana na mikataba mahiri iliyowekwa

### Tofauti muhimu {#key-differences}

**Inayomilikiwa Nje**

- Kuunda akaunti hakugharimu chochote
- Inaweza kuanzisha miamala
- Miamala kati ya akaunti zinazomilikiwa nje inaweza kuwa ni uhamisho wa ETH/tokeni pekee
- Inaundwa na jozi ya funguo za usimbaji fiche: funguo za umma na za kibinafsi zinazodhibiti shughuli za akaunti

**Mkataba**

- Kuunda mkataba kuna gharama kwa sababu unatumia hifadhi ya mtandao
- Inaweza tu kutuma ujumbe kwa kujibu kupokea muamala
- Miamala kutoka akaunti ya nje kwenda akaunti ya mkataba inaweza kuchochea msimbo ambao unaweza kutekeleza vitendo mbalimbali, kama vile kuhamisha tokeni au hata kuunda mkataba mpya
- Akaunti za mkataba hazina funguo za kibinafsi Badala yake, zinadhibitiwa na mantiki ya msimbo wa mkataba mahiri

## Uchunguzi wa akaunti {#an-account-examined}

Akaunti za Ethereum zina sehemu nne:

- `nonce` – Kihesabu kinachoonyesha idadi ya miamala iliyotumwa kutoka kwa akaunti inayomilikiwa nje au idadi ya mikataba iliyoundwa na akaunti ya mkataba. Ni muamala mmoja tu wenye nonce fulani unaweza kutekelezwa kwa kila akaunti, ikilinda dhidi ya mashambulio ya kurudia ambapo miamala iliyosainiwa inatangazwa tena na kutekelezwa upya
- `balance` – Idadi ya wei inayomilikiwa na anwani hii. Wei ni mgawanyo wa ETH na kuna 1e+18 wei kwa kila ETH.
- `codeHash` – Hashi hii inarejelea _msimbo_ wa akaunti kwenye mashine halisi ya ethereum (EVM). Akaunti za mkataba zina vipande vya msimbo vilivyopangwa ambavyo vinaweza kutekeleza shughuli tofauti. Msimbo huu wa EVM hutekelezwa ikiwa akaunti inapokea mwito wa ujumbe. Haiwezi kubadilishwa, tofauti na sehemu zingine za akaunti. Vipande vyote vya msimbo kama hivyo huhifadhiwa kwenye hifadhidata ya hali chini ya hash zinazolingana kwa upatikanaji wa baadaye. Thamani hii ya hash inajulikana kama codeHash. Kwa akaunti zinazomilikiwa nje, sehemu ya codeHash ni hash ya herufi tupu.
- `storageRoot` – Wakati mwingine hujulikana kama hashi ya hifadhi. Hashi ya biti 256 ya nodi ya mzizi ya [Merkle Patricia Trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/) inayoweka msimbo wa yaliyomo kwenye hifadhi ya akaunti (ramani kati ya thamani za nambari kamili za biti 256), iliyowekwa msimbo ndani ya trie kama ramani kutoka kwa hashi ya Keccak ya biti 256 ya funguo za nambari kamili za biti 256 hadi kwa thamani za nambari kamili za biti 256 zilizowekwa msimbo kwa RLP. Trie hii inaonyesha hash ya maudhui ya hifadhi ya akaunti hii, na kwa chaguo-msingi huwa tupu.

![Mchoro unaoonyesha muundo wa akaunti](./accounts.png)
_Mchoro umechukuliwa kutoka [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Akaunti zinazomilikiwa nje na jozi za funguo {#externally-owned-accounts-and-key-pairs}

Akaunti inaundwa na jozi ya funguo za usimbaji fiche: ya umma na ya kibinafsi. Hizi husaidia kuthibitisha kuwa muamala ulisainiwa kweli na mtumaji na kuzuia ulaghai. Funguo yako ya kibinafsi ndiyo unayotumia kusaini miamala, kwa hivyo inakupa umiliki wa fedha zilizounganishwa na akaunti yako. Huwezi kamwe kushikilia sarafu za kidijitali moja kwa moja, unashikilia funguo za kibinafsi – fedha daima zipo kwenye leja ya Ethereum.

Hii huzuia wahalifu kutoka kutangaza miamala bandia kwa sababu unaweza kila mara kuthibitisha mtumaji wa muamala.

Ikiwa Alice anataka kutuma ether kutoka kwa akaunti yake kwenda kwa akaunti ya Bob, Alice anapaswa kuunda ombi la muamala na kulituma kwa mtandao ili lithibitishwe. Matumizi ya Ethereum ya usimbaji fiche wa funguo za umma yanahakikisha kwamba Alice anaweza kuthibitisha kuwa yeye ndiye aliyekusudia kuanzisha ombi la muamala. Bila mbinu za usimbaji fiche, mshambulizi Eve anaweza kutangaza ombi hadharani linalofanana na "tuma 5 ETH kutoka kwa akaunti ya Alice kwenda kwa akaunti ya Eve," na hakuna mtu anayeweza kuthibitisha kuwa halikutoka kwa Alice.

## Uundaji wa akaunti {#account-creation}

Unapotaka kuunda akaunti, maktaba nyingi zitakutengenezea funguo ya kibinafsi ya nasibu.

Funguo ya kibinafsi inaundwa na herufi 64 za hex na inaweza kusimbwa kwa nenosiri.

Mfano:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

Ufunguo wa umma hutengenezwa kutoka kwa ufunguo binafsi kwa kutumia [Elliptic Curve Digital Signature Algorithm](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). Unapata anwani ya umma ya akaunti yako kwa kuchukua baiti 20 za mwisho za hashi ya Keccak-256 ya ufunguo wa umma na kuongeza `0x` mwanzoni.

Hii inamaanisha kuwa akaunti inayomilikiwa nje (EOA) ina anwani ya herufi 42 (sehemu ya baiti 20 ambayo ni herufi 40 za heksadesimali pamoja na kiambishi awali cha `0x`).

Mfano:

`Mfano wa Anwani ya Ethereum 0x5e97870f263700f46aa00d967821199b9bc5a120`

Mfano ufuatao unaonyesha jinsi ya kutumia zana ya kusaini iitwayo [Clef](https://geth.ethereum.org/docs/tools/clef/introduction) ili kuunda akaunti mpya. Clef ni zana ya usimamizi wa akaunti na utiaji saini inayokuja pamoja na mteja wa Ethereum, [Geth](https://geth.ethereum.org). Amri ya `clef newaccount` huunda jozi mpya ya funguo na kuzihifadhi kwenye keystore iliyosimbwa kwa njia fiche.

```
> clef newaccount --keystore <path>

Please enter a password for the new account to be created:
> <password>

------------
INFO [10-28|16:19:09.156] Your new key was generated       address=0x5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please backup your key file      path=/home/user/go-ethereum/data/keystore/UTC--2022-10-28T15-19-08.000825927Z--5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please remember your password!
Generated account 0x5e97870f263700f46aa00d967821199b9bc5a120
```

[Nyaraka za Geth](https://geth.ethereum.org/docs)

Inawezekana kupata funguo mpya za umma kutoka kwa funguo yako ya kibinafsi, lakini huwezi kupata funguo ya kibinafsi kutoka kwa funguo za umma. Ni muhimu kuweka funguo zako za kibinafsi salama na, kama jina linavyopendekeza, **KIBINAFSI**.

Unahitaji funguo ya kibinafsi kusaini jumbe na miamala inayozalisha saini. Wengine wanaweza kuchukua saini hiyo ili kupata funguo yako ya umma, kuthibitisha mwandishi wa ujumbe. Katika programu yako, unaweza kutumia maktaba ya JavaScript kutuma miamala kwa mtandao.

## Akaunti za mkataba {#contract-accounts}

Akaunti za mkataba pia zina anwani ya herufi 42 ya hexadesimali:

Mfano:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

Anwani ya mkataba kwa kawaida hutolewa wakati mkataba unapowekwa kwenye Blockchain ya Ethereum. Anwani hutokana na anwani ya muundaji na idadi ya miamala iliyotumwa kutoka kwa anwani hiyo ("nonce").

## Funguo za mthibitishaji {#validators-keys}

Kuna aina nyingine ya funguo katika Ethereum, iliyoanzishwa Ethereum ilipobadilika kutoka uthibitisho wa kazi hadi uthibitisho wa hisa kama mfumo wa makubaliano. Hizi ni funguo za BLS, na zinatumika kutambua vihakiki. Funguo hizi zinaweza kujumlishwa kwa ufanisi ili kupunguza bandwidth inayohitajika kwa mtandao kufikia makubaliano. Bila ujumuishaji huu wa funguo, kiwango cha chini cha hisa kwa kihakiki (validator) kingekuwa cha juu zaidi.

[Zaidi kuhusu funguo za mthibitishaji](/developers/docs/consensus-mechanisms/pos/keys/).

## Dokezo kuhusu mikoba {#a-note-on-wallets}

Akaunti siyo wallet. Wallet ni kiolesura au programu inayokuwezesha kuingiliana na akaunti yako ya Ethereum, iwe ni akaunti inayomilikiwa nje au akaunti ya mkataba.

## Onyesho la picha {#a-visual-demo}

Tazama Austin akielezea jinsi hash functions na key pairs zinavyofanya kazi.

<YouTube id="QJ010l-pBpE" />

<YouTube id="9LtBDy67Tho" />

## Masomo zaidi {#further-reading}

- [Kuelewa Akaunti za Ethereum](https://info.etherscan.com/understanding-ethereum-accounts/) - etherscan

_Unajua rasilimali ya jamii iliyokusaidia?_ Hariri ukurasa huu na uiongeze!_

## Mada zinazohusiana {#related-topics}

- [Mikataba-erevu](/developers/docs/smart-contracts/)
- [Miamala](/developers/docs/transactions/)
