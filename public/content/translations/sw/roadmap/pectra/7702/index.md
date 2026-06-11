---
title: Pectra 7702
metaTitle: Miongozo ya Pectra 7702
description: Jifunze zaidi kuhusu 7702 katika toleo la Pectra
lang: sw
---

## Muhtasari {#abstract}

EIP-7702 inafafanua utaratibu wa kuongeza msimbo kwenye EOA. Pendekezo hili linaruhusu EOA, akaunti za zamani za Ethereum, kupokea maboresho ya utendaji wa muda mfupi, na kuongeza utumiaji wa programu. Hili linafanywa kwa kuweka kielekezi kwenye msimbo uliosambazwa tayari kwa kutumia aina mpya ya muamala: 4.

Aina hii mpya ya muamala inaleta orodha ya uidhinishaji. Kila tuplo ya uidhinishaji katika orodha inafafanuliwa kama

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**address** ni ukaimishaji (msimbo wa baiti uliosambazwa tayari ambao utatumiwa na EOA)
**chain_id** inafunga uidhinishaji kwenye mnyororo maalum (au 0 kwa minyororo yote)
**nonce** inafunga uidhinishaji kwenye nonsi maalum ya akaunti
(**y_parity, r, s**) ni sahihi ya tuplo ya uidhinishaji, inayofafanuliwa kama keccak(0x05 || rlp ([chain_id ,address, nonce])) na ufunguo wa siri wa EOA ambao uidhinishaji unatumika (pia unaitwa mamlaka)

Ukaimishaji unaweza kuwekwa upya kwa kukaimisha kwenye anwani tupu.

Ufunguo wa siri wa EOA unabaki na udhibiti kamili wa akaunti baada ya ukaimishaji. Kwa mfano kukaimisha kwenye Safe hakufanyi akaunti kuwa saini-nyingi kwa sababu bado kuna ufunguo mmoja unaoweza kukwepa sera yoyote ya kusaini. Kusonga mbele, wasanidi programu wanapaswa kubuni kwa dhana kwamba mshiriki yeyote katika mfumo anaweza kuwa mkataba mahiri. Kwa wasanidi wa mkataba mahiri, si salama tena kudhani kwamba `tx.origin` inarejelea EOA.

## Mbinu bora {#best-practices}

**Udhanifu wa Akaunti**: Mkataba wa ukaimishaji unapaswa kuendana na viwango vipana vya udhanifu wa akaunti (AA) vya Ethereum ili kuongeza utangamano. Hasa, inapaswa kuwa inatii au inayoingiliana na ERC-4337.

**Muundo Bila Ruhusa na Unaostahimili Udhibiti**: Ethereum inathamini ushiriki bila ruhusa. Mkataba wa ukaimishaji HAUPASWI kuweka msimbo mgumu au kutegemea mpeleka ujumbe au huduma moja "inayoaminika". Hii itaharibu akaunti ikiwa mpeleka ujumbe ataacha kufanya kazi. Vipengele kama vile ukusanyaji wa mafungu (k.m., idhinisha+transferFrom) vinaweza kutumiwa na EOA yenyewe bila mpeleka ujumbe. Kwa wasanidi wa programu wanaotaka kutumia vipengele vya hali ya juu vinavyowezeshwa na 7702 (Udhanifu wa Gesi, Utoaji Unaolinda Faragha) utahitaji mpeleka ujumbe. Ingawa kuna miundo tofauti ya wapeleka ujumbe, pendekezo letu ni kutumia [vifungashaji vya 4337](https://www.erc4337.io/bundlers) vinavyoelekeza angalau kwenye [sehemu ya kuingilia 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) kwa sababu:

- Vinatoa miingiliano sanifu ya kupeleka ujumbe
- Vinajumuisha mifumo ya ndani ya mlipiaji
- Vinahakikisha utangamano wa mbele
- Vinaweza kusaidia ustahimilivu wa udhibiti kupitia [mempool ya umma](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)
- Vinaweza kuhitaji kitendakazi cha init kuitwa tu kutoka kwenye [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0)

Kwa maneno mengine, mtu yeyote anapaswa kuweza kufanya kazi kama mfadhili/mpeleka ujumbe wa muamala mradi tu atoe sahihi halali inayohitajika au Operesheni ya Mtumiaji kutoka kwenye akaunti. Hii inahakikisha ustahimilivu wa udhibiti: ikiwa hakuna miundombinu maalum inayohitajika, miamala ya mtumiaji haiwezi kuzuiwa kiholela na mpeleka ujumbe anayedhibiti ufikiaji. Kwa mfano, [Zana za Ukaimishaji za MetaMask](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) hufanya kazi waziwazi na kifungashaji chochote cha ERC-4337 au mlipiaji kwenye mnyororo wowote, badala ya kuhitaji seva maalum ya MetaMask.

**Ujumuishaji wa programu tumizi zilizogatuliwa (dapps) kupitia Miingiliano ya Mkoba**:

Kwa kuwa mikoba itaidhinisha mikataba maalum ya ukaimishaji kwa EIP-7702, dapps hazipaswi kutarajia kuomba uidhinishaji wa 7702 moja kwa moja. Badala yake, ujumuishaji unapaswa kufanyika kupitia miingiliano sanifu ya mkoba:

- **ERC-5792 (`wallet_sendCalls`)**: Inawezesha dapps kuomba mikoba kutekeleza miito iliyokusanywa, kuwezesha utendaji kama vile ukusanyaji wa mafungu ya miamala na udhanifu wa gesi.

- **ERC-6900**: Inaruhusu dapps kutumia uwezo wa akaunti janja za msimu, kama vile funguo za kipindi na urejeshaji wa akaunti, kupitia moduli zinazosimamiwa na mkoba.

Kwa kutumia miingiliano hii, dapps zinaweza kufikia utendaji wa akaunti janja unaotolewa na EIP-7702 bila kusimamia ukaimishaji moja kwa moja, kuhakikisha utangamano na usalama katika utekelezaji tofauti wa mkoba.

> Kumbuka: Hakuna mbinu sanifu kwa dapps kuomba sahihi za uidhinishaji za 7702 moja kwa moja. Dapps lazima zitegemee miingiliano maalum ya mkoba kama ERC-6900 ili kunufaika na vipengele vya EIP-7702.

Kwa maelezo zaidi:

- [Uainisho wa ERC-5792](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [Uainisho wa ERC-6900](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**Kuepuka Kufungwa na Mchuuzi**: Sambamba na hayo hapo juu, utekelezaji mzuri haupendelei mchuuzi na ni inayoingiliana. Hii mara nyingi inamaanisha kuzingatia viwango vinavyoibuka vya akaunti janja. Kwa mfano, [Akaunti ya Msimu ya Alchemy](https://github.com/alchemyplatform/modular-account) inatumia kiwango cha ERC-6900 kwa akaunti janja za msimu na imeundwa kwa kuzingatia "matumizi inayoingiliana bila ruhusa".

**Uhifadhi wa Faragha**: Ingawa faragha mnyororoni ina kikomo, mkataba wa ukaimishaji unapaswa kujitahidi kupunguza ufichuaji wa data na uwezekano wa kuunganishwa. Hili linaweza kufikiwa kwa kusaidia vipengele kama vile malipo ya gesi katika tokeni za ERC-20 (ili watumiaji wasihitaji kudumisha salio la umma la ETH, ambalo linaboresha faragha na uzoefu wa mtumiaji) na funguo za kipindi cha mara moja (ambazo zinapunguza utegemezi wa ufunguo mmoja wa muda mrefu). Kwa mfano, EIP-7702 inawezesha kulipa gesi kwa tokeni kupitia miamala iliyofadhiliwa, na utekelezaji mzuri utafanya iwe rahisi kujumuisha walipiaji kama hao bila kuvujisha taarifa zaidi kuliko inavyohitajika. Zaidi ya hayo, ukaimishaji nje ya mnyororo wa idhini fulani (kwa kutumia sahihi zinazothibitishwa mnyororoni) inamaanisha miamala michache mnyororoni na ufunguo mkuu wa mtumiaji, kusaidia faragha. Akaunti zinazohitaji kutumia mpeleka ujumbe zinalazimisha watumiaji kufichua anwani zao za IP. Mempool za Umma zinaboresha hili, wakati muamala/Operesheni ya Mtumiaji inaposambaa kupitia mempool huwezi kujua kama ilitoka kwenye IP iliyoituma, au ilipitishwa tu kupitia hiyo kupitia itifaki ya p2p.

**Upanuzi na Usalama wa Msimu**: Utekelezaji wa akaunti unapaswa kupanuka ili uweze kubadilika na vipengele vipya na maboresho ya usalama. Uwezo wa kuboresha unawezekana kiasili na EIP-7702 (kwa kuwa EOA inaweza daima kukaimisha kwenye mkataba mpya katika siku zijazo ili kuboresha mantiki yake). Zaidi ya uwezo wa kuboresha, muundo mzuri unaruhusu uwezo wa msimu – k.m., moduli za kuingiza kwa mifumo tofauti ya sahihi au sera za matumizi – bila kuhitaji kusambaza upya kabisa. Kiti cha Akaunti cha Alchemy ni mfano mzuri, kinachoruhusu wasanidi programu kusakinisha moduli za uthibitishaji (kwa aina tofauti za sahihi kama ECDSA, BLS, n.k.) na moduli za utekelezaji kwa mantiki maalum. Ili kufikia unyumbufu na usalama zaidi katika akaunti zinazowezeshwa na EIP-7702, wasanidi programu wanahimizwa kukaimisha kwenye mkataba wa uwakilishi badala ya moja kwa moja kwenye utekelezaji maalum. Mbinu hii inaruhusu maboresho yasiyo na mshono na uwezo wa msimu bila kuhitaji uidhinishaji wa ziada wa EIP-7702 kwa kila mabadiliko.

Faida za Muundo wa Uwakilishi:

- **Uwezo wa Kuboresha**: Sasisha mantiki ya mkataba kwa kuelekeza uwakilishi kwenye mkataba mpya wa utekelezaji.

- **Mantiki Maalum ya Kuanzisha**: Jumuisha vitendakazi vya kuanzisha ndani ya uwakilishi ili kuweka vigezo muhimu vya hali kwa usalama.

Kwa mfano, [SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe) inaonyesha jinsi uwakilishi unavyoweza kutumiwa kuanzisha na kusimamia ukaimishaji kwa usalama katika akaunti zinazoingiliana na EIP-7702.

Hasara za Muundo wa Uwakilishi:

- **Kutegemea wahusika wa nje**: Inabidi utegemee timu ya nje kutoboresha kwenda kwenye mkataba usio salama.

## Mambo ya Kuzingatia KiUsalama {#security-considerations}

**Kizuizi cha uingiaji wa kurudia**: Kwa kuanzishwa kwa ukaimishaji wa EIP-7702, akaunti ya mtumiaji inaweza kubadilika kwa nguvu kati ya Akaunti Inayomilikiwa na Nje (EOA) na Mkataba Mahiri (SC). Unyumbufu huu unawezesha akaunti kuanzisha miamala na kuwa lengo la miito. Kama matokeo, matukio ambapo akaunti inajiita yenyewe na kufanya miito ya nje itakuwa na `msg.sender` sawa na `tx.origin`, ambayo inadhoofisha dhana fulani za usalama ambazo hapo awali zilitegemea `tx.origin` kuwa EOA kila wakati.

Kwa wasanidi wa mkataba mahiri, si salama tena kudhani kwamba `tx.origin` inarejelea EOA. Vile vile, kutumia `msg.sender == tx.origin` kama kinga dhidi ya mashambulizi ya uingiaji upya si mkakati wa kutegemewa tena.

Kusonga mbele, wasanidi programu wanapaswa kubuni kwa dhana kwamba mshiriki yeyote katika mfumo anaweza kuwa mkataba mahiri. Vinginevyo wanaweza kutekeleza ulinzi wa wazi wa uingiaji upya kwa kutumia vizuizi vya uingiaji wa kurudia na miundo ya kirekebishaji cha `nonReentrant`. Tunapendekeza kufuata kirekebishaji kilichokaguliwa k.m [Kizuizi cha Uingiaji wa Kurudia cha Open Zeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol). Wanaweza pia kutumia [kigezo cha hifadhi cha mpito](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html).

**Mambo ya Kuzingatia KiUsalama ya Kuanzisha**

Kutekeleza mikataba ya ukaimishaji ya EIP-7702 kunaleta changamoto maalum za usalama, hasa kuhusu mchakato wa kuanzisha. Udhaifu mkubwa unatokea wakati kitendakazi cha kuanzisha (`init`) kinapounganishwa kiatomiki na mchakato wa ukaimishaji. Katika hali kama hizo, mkimbiaji wa mbele anaweza kunasa sahihi ya ukaimishaji na kutekeleza kitendakazi cha `init` na vigezo vilivyobadilishwa, na uwezekano wa kuchukua udhibiti wa akaunti.

Hatari hii inafaa hasa unapojaribu kutumia utekelezaji uliopo wa Akaunti ya Mkataba Mahiri (SCA) na EIP-7702 bila kurekebisha taratibu zao za kuanzisha.

**Suluhu za Kupunguza Udhaifu wa Kuanzisha**

- Tekeleza `initWithSig`  
  Badilisha kitendakazi cha kawaida cha `init` na kitendakazi cha `initWithSig` ambacho kinahitaji mtumiaji kusaini vigezo vya kuanzisha. Mbinu hii inahakikisha kwamba uanzishaji unaweza tu kuendelea kwa idhini ya wazi ya mtumiaji, na hivyo kupunguza hatari za uanzishaji usioidhinishwa.

- Tumia EntryPoint ya ERC-4337  
  Hitaji kwamba kitendakazi cha kuanzisha kiitwe pekee kutoka kwenye mkataba wa EntryPoint wa ERC-4337. Mbinu hii inatumia mfumo sanifu wa uthibitishaji na utekelezaji uliotolewa na ERC-4337, na kuongeza safu ya ziada ya usalama kwenye mchakato wa kuanzisha.  
  _(Tazama: [Nyaraka za Safe](https://docs.safe.global/advanced/eip-7702/7702-safe))_

Kwa kupitisha suluhu hizi, wasanidi programu wanaweza kuimarisha usalama wa mikataba ya ukaimishaji ya EIP-7702, kulinda dhidi ya mashambulizi yanayowezekana ya kukimbia mbele wakati wa awamu ya kuanzisha.

**Migongano ya Hifadhi** Kukaimisha msimbo hakufuti hifadhi iliyopo. Wakati wa kuhamia kutoka mkataba mmoja wa ukaimishaji hadi mwingine, data iliyobaki kutoka kwenye mkataba uliopita inabaki. Ikiwa mkataba mpya unatumia sloti zilezile za hifadhi lakini unazitafsiri tofauti, inaweza kusababisha tabia isiyokusudiwa. Kwa mfano, ikiwa ukaimishaji wa awali ulikuwa kwenye mkataba ambapo sloti ya hifadhi inawakilisha `bool`, na ukaimishaji unaofuata ni kwenye mkataba ambapo sloti hiyohiyo inawakilisha `uint`, kutolingana kunaweza kusababisha matokeo yasiyotabirika.

**Hatari za kuhadaa (Phishing)** Kwa utekelezaji wa ukaimishaji wa EIP-7702, mali katika akaunti ya mtumiaji zinaweza kudhibitiwa kabisa na mikataba mahiri. Ikiwa mtumiaji atakaimisha akaunti yake bila kujua kwenye mkataba mbaya, mshambuliaji anaweza kupata udhibiti kwa urahisi na kuiba fedha. Unapotumia `chain_id=0` ukaimishaji unatumika kwa vitambulisho vyote vya mnyororo. Kaimisha tu kwenye mkataba isiyobadilika (usijaribu kukaimisha kwenye uwakilishi), na tu kwenye mikataba iliyosambazwa kwa kutumia CREATE2 (na msimbo wa kuanzisha wa kawaida - hakuna mikataba ya kubadilika) ili msambazaji asiweze kusambaza kitu tofauti kwenye anwani hiyohiyo mahali pengine. Vinginevyo ukaimishaji wako unaweka akaunti yako hatarini kwenye minyororo mingine yote ya EVM.

Wakati watumiaji wanafanya sahihi zilizokaimishwa, mkataba lengwa unaopokea ukaimishaji unapaswa kuonyeshwa wazi na kwa uwazi ili kusaidia kupunguza hatari za kuhadaa.

**Uso Mdogo Unaoaminika na Usalama**: Ingawa inatoa unyumbufu, mkataba wa ukaimishaji unapaswa kuweka mantiki yake ya msingi kuwa ndogo na inayoweza kukaguliwa. Mkataba huo kwa kweli ni ugani wa EOA ya mtumiaji, kwa hivyo dosari yoyote inaweza kuwa mbaya sana. Utekelezaji unapaswa kufuata mbinu bora kutoka kwa jamii ya usalama wa mkataba mahiri. Kwa mfano, vitendakazi vya konstrukta au kianzishaji lazima vilindwe kwa uangalifu – kama ilivyoangaziwa by Alchemy, ikiwa unatumia muundo wa uwakilishi chini ya 7702, kianzishaji kisicholindwa kinaweza kuruhusu mshambuliaji kuchukua akaunti. Timu zinapaswa kulenga kuweka msimbo mnyororoni kuwa rahisi: Mkataba wa 7702 wa Ambire ni mistari ~200 tu ya Solidity, ikipunguza ugumu kwa makusudi ili kupunguza hitilafu. Usawa lazima upatikane kati ya mantiki yenye vipengele vingi na urahisi unaorahisisha ukaguzi.

### Utekelezaji unaojulikana {#known-implementations}

Kutokana na asili ya EIP-7702, inashauriwa mikoba itumie tahadhari wakati wa kusaidia watumiaji kukaimisha kwenye mkataba wa mtu wa tatu. Imeorodheshwa hapa chini ni mkusanyiko wa utekelezaji unaojulikana ambao umekaguliwa:

| Anwani ya mkataba                           | Chanzo                                                                                                                                     | Ukaguzi                                                                                                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                      | [ukaguzi](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                      | [ukaguzi](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)              | [ukaguzi](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                          | [ukaguzi](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [Timu ya AA ya Taasisi ya Ethereum](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [ukaguzi](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                                      | [ukaguzi](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## Miongozo ya mkoba wa maunzi {#hardware-wallet-guidelines}

Mikoba ya maunzi haipaswi kufichua ukaimishaji wa kiholela. Mwafaka katika nafasi ya mkoba wa maunzi ni kutumia orodha ya mikataba inayoaminika ya wakaimishaji. Tunapendekeza kuruhusu utekelezaji unaojulikana ulioorodheshwa hapo juu na kuzingatia mingine kulingana na kila kesi. Kwa kuwa kukaimisha EOA yako kwenye mkataba kunatoa udhibiti wa mali zote, mikoba ya maunzi inapaswa kuwa waangalifu na jinsi wanavyotekeleza 7702.

### Matukio ya ujumuishaji kwa programu shirikishi {#integration-scenarios-for-companion-apps}

#### Mvivu {#lazy}

Kwa kuwa EOA bado inafanya kazi kama kawaida, hakuna cha kufanya.

Kumbuka : baadhi ya mali zinaweza kukataliwa kiotomatiki na msimbo wa ukaimishaji, kama vile NFT za ERC-1155, na usaidizi unapaswa kufahamu hilo.

#### Kufahamu {#aware}

Mjulishe mtumiaji kwamba ukaimishaji upo kwa EOA kwa kuangalia msimbo wake, na kwa hiari toa ofa ya kuondoa ukaimishaji.

#### Ukaimishaji wa kawaida {#common-delegation}

Mtoa huduma wa maunzi anaidhinisha mikataba inayojulikana ya ukaimishaji na kutekeleza usaidizi wao katika programu shirikishi. Inapendekezwa kuchagua mkataba wenye usaidizi kamili wa ERC-4337.

EOA zilizokaimishwa kwa mwingine tofauti zitashughulikiwa kama EOA za kawaida.

#### Ukaimishaji maalum {#custom-delegation}

Mtoa huduma wa maunzi anatekeleza mkataba wake wa ukaimishaji na kuuongeza kwenye orodha anatekeleza usaidizi wake katika programu shirikishi. Inapendekezwa kujenga mkataba wenye usaidizi kamili wa ERC-4337.

EOA zilizokaimishwa kwa mwingine tofauti zitashughulikiwa kama EOA za kawaida.