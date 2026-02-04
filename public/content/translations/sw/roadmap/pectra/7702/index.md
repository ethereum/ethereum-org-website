---
title: Miongozo ya Pectra 7702
description: Jifunze zaidi kuhusu 7702 katika toleo la Pectra
lang: sw
---

# Pectra 7702

## Muhtasari {#abstract}

EIP 7702 inafafanua utaratibu wa kuongeza msimbo kwenye EOA. Pendekezo hili linaruhusu EOA, akaunti za zamani za Ethereum, kupokea maboresho ya utendaji wa muda mfupi, na kuongeza utumiaji wa programu. Hili linafanywa kwa kuweka kielekezi kwa msimbo ambao tayari umetumwa kwa kutumia aina mpya ya muamala: 4.

Anwani ya mkataba Kila tuple ya idhini kwenye orodha inafafanuliwa kama

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**anwani** ni uwakilishi (bytecode iliyotumwa tayari ambayo itatumiwa na EOA)
**chain_id** hufunga idhini kwa chain maalum (au 0 kwa chain zote)
**nonce** hufunga idhini kwa akaunti maalum ya nonce
(**y_parity, r, s**) ni saini ya tuple ya idhini, inayofafanuliwa kama keccak(0x05 || rlp ([chain_id ,address, nonce])) na ufunguo binafsi wa EOA ambayo idhini inatumika (pia huitwa mamlaka)

Uwakilishi unaweza kuwekwa upya kwa kuwakilisha kwenye anwani batili.

Ufunguo binafsi wa EOA hubaki na udhibiti kamili juu ya akaunti baada ya uwakilishi. Kwa mfano, kuwakilisha kwa Safe hakufanyi akaunti kuwa multisig kwa sababu bado kuna ufunguo mmoja unaoweza kupita sera yoyote ya kutia saini. Kuanzia sasa, wasanidi programu wanapaswa kubuni kwa dhana kwamba mshiriki yeyote katika mfumo anaweza kuwa mkataba-erevu. Kwa wasanidi programu wa mikataba-erevu, sio salama tena kudhania kwamba `tx.origin` inarejelea EOA.

## Mbinu bora {#best-practices}

**Uondoaji wa Akaunti**: Mkataba wa uwakilishi unapaswa kuendana na viwango vipana vya uondoaji wa akaunti (AA) vya Ethereum ili kuongeza upatanifu. Hasa, inapaswa kuwa inayokubaliana na ERC-4337 au inayooana.

**Muundo Usio na Ruhusa na Unaostahimili Udhibiti**: Ethereum inathamini ushiriki usio na ruhusa. Mkataba wa uwakilishi HAUPASWI kuweka msimbo mgumu au kutegemea relayer au huduma moja “inayoaminika”. Hii ingeharibu akaunti kama relayer akitoka mtandaoni. Vipengele kama vile kuweka kwa makundi (batching) (k.m., approve+transferFrom) vinaweza kutumiwa na EOA yenyewe bila relayer. Kwa wasanidi programu wa programu wanaotaka kutumia vipengele vya hali ya juu vinavyowezeshwa na 7702 (Gas Abstraction, Utoaji unaohifadhi faragha) utahitaji relayer. Ingawa kuna usanifu tofauti wa relayer, pendekezo letu ni kutumia [bundlers 4337](https://www.erc4337.io/bundlers) zinazoelekeza angalau [entry point 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) kwa sababu:

- Zinatoa violesura sanifu vya kupeleka (relaying)
- Zinajumuisha mifumo ya paymaster iliyojengewa ndani
- Hakikisha upatanifu wa mbele
- Zinaweza kusaidia ustahimilivu wa udhibiti kupitia [mempool ya umma](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)
- Zinaweza kuhitaji kazi ya init iitwe tu kutoka [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0)

Kwa maneno mengine, mtu yeyote anapaswa kuwa na uwezo wa kufanya kazi kama mdhamini/relayer wa muamala mradi tu wanatoa saini halali inayohitajika au UserOperation kutoka kwa akaunti. Hii inahakikisha ustahimilivu wa udhibiti: kama hakuna miundombinu maalum inayohitajika, miamala ya mtumiaji haiwezi kuzuiwa kiholela na relay ya ulinzi. Kwa mfano, [Delegation Toolkit ya MetaMask](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) inafanya kazi waziwazi na bundler au paymaster yeyote wa ERC-4337 kwenye chain yoyote, badala ya kuhitaji seva maalum ya MetaMask.

**Ujumuishaji wa Mfumo Mtawanyo wa Kimamlaka kupitia Violela vya Mkoba**:

Kwa kuwa mikoba itaorodhesha mikataba maalum ya uwakilishi kwa EIP-7702, mifumo mtawanyo ya kimamlaka haipaswi kutarajia kuomba idhini za 7702 moja kwa moja. Badala yake, ujumuishaji unapaswa kufanyika kupitia violesura sanifu vya mkoba:

- **ERC-5792 (`wallet_sendCalls`)**: Huwezesha mifumo mtawanyo ya kimamlaka kuomba mikoba kutekeleza simu za makundi, kuwezesha utendaji kama vile uwekaji wa miamala kwa makundi na uondoaji wa gesi.

- **ERC-6900**: Huruhusu mifumo mtawanyo ya kimamlaka kutumia uwezo wa akaunti-erevu za moduli, kama vile funguo za kipindi na urejeshaji wa akaunti, kupitia moduli zinazodhibitiwa na mkoba.

Kwa kutumia violesura hivi, mifumo mtawanyo ya kimamlaka inaweza kupata utendaji wa akaunti-erevu zinazotolewa na EIP-7702 bila kusimamia uwakilishi moja kwa moja, kuhakikisha upatanifu na usalama katika utekelezaji tofauti wa mikoba.

> Kumbuka: Hakuna njia sanifu kwa mifumo mtawanyo ya kimamlaka kuomba saini za idhini za 7702 moja kwa moja. Mifumo mtawanyo ya kimamlaka lazima itegemee violesura maalum vya mkoba kama ERC-6900 ili kutumia vipengele vya EIP-7702.

Kwa taarifa zaidi:

- [Vipimo vya ERC-5792](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [Vipimo vya ERC-6900](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**Kuepuka Kufungiwa na Mchuuzi**: Kwa kuzingatia yaliyo hapo juu, utekelezaji mzuri haufungamani na mchuuzi na unaweza kufanya kazi na mifumo mingine. Hii mara nyingi inamaanisha kuzingatia viwango vinavyoibuka kwa akaunti-erevu. Kwa mfano, [Akaunti ya Moduli ya Alchemy](https://github.com/alchemyplatform/modular-account) inatumia kiwango cha ERC-6900 kwa akaunti-erevu za moduli na imebuniwa kwa kuzingatia “matumizi yasiyo na ruhusa na yanayofanya kazi na mifumo mingine”.

**Uhifadhi wa Faragha**: Ingawa faragha ya onchain ni ndogo, mkataba wa uwakilishi unapaswa kujitahidi kupunguza ufichuaji wa data na uwezo wa kuunganishwa. Hili linaweza kufikiwa kwa kusaidia vipengele kama malipo ya gesi kwa tokeni za ERC-20 (hivyo watumiaji hawahitaji kudumisha salio la umma la ETH, ambayo inaboresha faragha na UX) na funguo za kipindi cha mara moja (ambazo hupunguza utegemezi kwa ufunguo mmoja wa muda mrefu). Kwa mfano, EIP-7702 inawezesha kulipa gesi kwa tokeni kupitia miamala inayodhaminiwa, na utekelezaji mzuri utafanya iwe rahisi kujumuisha paymaster kama hao bila kuvujisha taarifa zaidi ya inavyohitajika. Zaidi ya hayo, uwakilishi wa off-chain wa idhini fulani (kwa kutumia saini zinazothibitishwa onchain) inamaanisha miamala michache ya onchain na ufunguo mkuu wa mtumiaji, kusaidia faragha. Akaunti zinazohitaji kutumia relayer huwalazimisha watumiaji kufichua anwani zao za IP. PublicMempools inaboresha hili, wakati muamala/UserOp unaposambaa kupitia mempool huwezi kujua kama ilitoka kwenye IP iliyoituma au ilipitishwa tu kupitia itifaki ya p2p.

**Upanuzi na Usalama wa Moduli**: Utekelezaji wa akaunti unapaswa kuwa na uwezo wa kupanuliwa ili ziweze kubadilika na vipengele vipya na maboresho ya usalama. Uboreshaji unawezekana kiasili na EIP-7702 (kwa kuwa EOA inaweza daima kuwakilisha kwa mkataba mpya siku zijazo ili kuboresha mantiki yake). Zaidi ya uboreshaji, muundo mzuri unaruhusu moduli – k.m., moduli za programu-jalizi za mifumo tofauti ya saini au sera za matumizi – bila kuhitaji kutuma upya kabisa. Account Kit ya Alchemy ni mfano mkuu, inayoruhusu wasanidi programu kusakinisha moduli za uthibitishaji (kwa aina tofauti za saini kama ECDSA, BLS, n.k.) na moduli za utekelezaji kwa mantiki maalum. Ili kufikia unyumbufu na usalama mkubwa zaidi katika akaunti zinazowezeshwa na EIP-7702, wasanidi programu wanahimizwa kuwakilisha kwa mkataba wa proksi badala ya moja kwa moja kwa utekelezaji maalum. Njia hii inaruhusu maboresho yasiyo na mshono na moduli bila kuhitaji idhini za ziada za EIP-7702 kwa kila mabadiliko.

Faida za Muundo wa Proksi:

- **Uboreshaji**: Sasisha mantiki ya mkataba kwa kuelekeza proksi kwa mkataba mpya wa utekelezaji.

- **Mantiki Maalum ya Kuanzisha**: Jumuisha kazi za kuanzisha ndani ya proksi ili kuweka vigezo vya hali muhimu kwa usalama.

Kwa mfano, [SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe) inaonyesha jinsi proksi inavyoweza kutumika kuanzisha na kusimamia uwakilishi kwa usalama katika akaunti zinazooana na EIP-7702.

Hasara za Muundo wa Proksi:

- **Utegemezi kwa watendaji wa nje**: Inabidi utegemee timu ya nje isiyoboresha hadi kwenye mkataba usio salama.

## Mazingatio ya Usalama {#security-considerations}

**Mlinzi wa kuingia tena**: Kwa kuanzishwa kwa uwakilishi wa EIP-7702, akaunti ya mtumiaji inaweza kubadilika kati ya Akaunti Inayomilikiwa Nje (EOA) na Mkataba-Erevu (SC). Unyumbufu huu huwezesha akaunti kuanzisha miamala na kuwa lengo la simu. Matokeo yake, matukio ambapo akaunti inajiita yenyewe na kupiga simu za nje yatakuwa na `msg.sender` sawa na `tx.origin`, ambayo inadhoofisha dhana fulani za usalama ambazo hapo awali zilitegemea `tx.origin` kuwa EOA kila wakati.

Kwa wasanidi programu wa mikataba-erevu, sio salama tena kudhania kwamba `tx.origin` inarejelea EOA. Vivyo hivyo, kutumia `msg.sender == tx.origin` kama kinga dhidi ya mashambulizi ya kuingia tena sio mkakati wa kuaminika tena.

Kuanzia sasa, wasanidi programu wanapaswa kubuni kwa dhana kwamba mshiriki yeyote katika mfumo anaweza kuwa mkataba-erevu. Vinginevyo, wanaweza kutekeleza ulinzi dhahiri wa kuingia tena kwa kutumia walinzi wa kuingia tena na mifumo ya kurekebisha ya `nonReentrant`. Tunapendekeza kufuata kirekebishaji kilichokaguliwa k.m. [Mlinzi wa Kuingia Tena wa Open Zeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol). Wangeweza pia kutumia [kigezo cha hifadhi ya muda](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html).

**Mazingatio ya Usalama wa Kuanzisha**

Utekelezaji wa mikataba ya uwakilishi ya EIP-7702 huleta changamoto maalum za usalama, hasa kuhusu mchakato wa kuanzisha. Udhaifu mkubwa hutokea wakati kazi ya kuanzisha (`init`) inaunganishwa kiatomiki na mchakato wa uwakilishi. Katika hali kama hizo, mshambuliaji anaweza kukatiza saini ya uwakilishi na kutekeleza kazi ya `init` na vigezo vilivyobadilishwa, na hivyo kuchukua udhibiti wa akaunti.

Hatari hii ni muhimu hasa wakati wa kujaribu kutumia utekelezaji uliopo wa Akaunti ya Mkataba-Erevu (SCA) na EIP-7702 bila kurekebisha mifumo yao ya kuanzisha.

**Suluhu za Kupunguza Udhaifu wa Kuanzisha**

- Tekeleza `initWithSig`
  Badilisha kazi ya kawaida ya `init` na kazi ya `initWithSig` ambayo inahitaji mtumiaji kusaini vigezo vya kuanzisha. Njia hii inahakikisha kuwa uanzishaji unaweza kuendelea tu kwa idhini ya wazi ya mtumiaji, na hivyo kupunguza hatari za uanzishaji usioidhinishwa.

- Tumia EntryPoint ya ERC-4337
  Hitaji kwamba kazi ya uanzishaji iitwe tu kutoka kwa mkataba wa EntryPoint wa ERC-4337. Njia hii hutumia mfumo sanifu wa uthibitishaji na utekelezaji unaotolewa na ERC-4337, na kuongeza safu ya ziada ya usalama kwenye mchakato wa kuanzisha.  
  _(Angalia: [Hati za Safe](https://docs.safe.global/advanced/eip-7702/7702-safe))_

Kwa kutumia suluhu hizi, wasanidi programu wanaweza kuimarisha usalama wa mikataba ya uwakilishi ya EIP-7702, na kujilinda dhidi ya mashambulizi yanayoweza kutokea wakati wa awamu ya kuanzisha.

**Migongano ya Hifadhi** Msimbo wa kuwakilisha haufuti hifadhi iliyopo. Wakati wa kuhamia kutoka mkataba mmoja wa uwakilishi hadi mwingine, data iliyobaki kutoka kwa mkataba uliopita inabaki. Ikiwa mkataba mpya unatumia nafasi zile zile za hifadhi lakini unazitafsiri tofauti, inaweza kusababisha tabia isiyotarajiwa. Kwa mfano, ikiwa uwakilishi wa awali ulikuwa kwa mkataba ambapo nafasi ya hifadhi inawakilisha `bool`, na uwakilishi unaofuata ni kwa mkataba ambapo nafasi ile ile inawakilisha `uint`, kutofautiana huko kunaweza kusababisha matokeo yasiyotabirika.

**Hatari za kuhadaa ili kupata taarifa** Pamoja na utekelezaji wa uwakilishi wa EIP-7702, mali katika akaunti ya mtumiaji inaweza kudhibitiwa kabisa na mikataba-erevu. Ikiwa mtumiaji bila kujua anawakilisha akaunti yake kwa mkataba hasidi, mshambuliaji anaweza kupata udhibiti na kuiba fedha kwa urahisi. Wakati wa kutumia `chain_id=0` uwakilishi unatumika kwa vitambulisho vyote vya mnyororo. Wakilisha tu kwa mkataba usioweza kubadilika (usimwakilishe kamwe proksi), na kwa mikataba tu ambayo ilitumwa kwa kutumia CREATE2 (na msimbo wa awali wa kawaida - hakuna mikataba ya metamorphic) ili mtumaji asiweze kutuma kitu tofauti kwenye anwani ile ile mahali pengine. Vinginevyo, uwakilishi wako unaweka akaunti yako katika hatari kwenye chain zingine zote za EVM.

Wakati watumiaji wanapofanya saini zilizowakilishwa, mkataba lengwa unaopokea uwakilishi unapaswa kuonyeshwa wazi na kwa uwazi ili kusaidia kupunguza hatari za kuhadaa.

**Eneo Dogo Linaloaminika & Usalama**: Wakati unatoa unyumbufu, mkataba wa uwakilishi unapaswa kuweka mantiki yake ya msingi kuwa ndogo na inayoweza kukaguliwa. Mkataba huo ni kiendelezi cha EOA ya mtumiaji, kwa hivyo kasoro yoyote inaweza kuwa mbaya. Utekelezaji unapaswa kufuata mbinu bora kutoka kwa jamii ya usalama wa mikataba-erevu. Kwa mfano, kazi za ujenzi au za kuanzisha lazima zilindwe kwa uangalifu - kama ilivyoainishwa na Alchemy, ikiwa unatumia muundo wa proksi chini ya 7702, kianzilishi kisicho na ulinzi kinaweza kumruhusu mshambuliaji kuchukua akaunti. Timu zinapaswa kulenga kuweka msimbo wa onchain kuwa rahisi: Mkataba wa 7702 wa Ambire una mistari ~200 tu ya Solidity, ukipunguza kwa makusudi utata ili kupunguza hitilafu. Usawa lazima uwekwe kati ya mantiki yenye vipengele vingi na urahisi unaorahisisha ukaguzi.

### Utekelezaji unaojulikana {#known-implementations}

Kwa sababu ya asili ya EIP 7702, inashauriwa mikoba iwe mwangalifu wakati inawasaidia watumiaji kuwakilisha kwa mkataba wa mtu wa tatu. Yaliyoorodheshwa hapa chini ni mkusanyiko wa utekelezaji unaojulikana ambao umekaguliwa:

| Anwani ya mkataba                          | Chanzo                                                                                                                                          | Ukaguzi                                                                                                                                                        |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                           | [ukaguzi](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                           | [ukaguzi](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)                   | [ukaguzi](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                               | [ukaguzi](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [Timu ya AA ya Msingi wa Ethereum](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [ukaguzi](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                                           | [ukaguzi](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## Miongozo ya mkoba wa maunzi {#hardware-wallet-guidelines}

Mikoba ya maunzi haipaswi kufichua uwakilishi wa kiholela. Makubaliano katika eneo la mikoba ya maunzi ni kutumia orodha ya mikataba ya kuwakilisha inayoaminika. Tunashauri kuruhusu utekelezaji unaojulikana ulioorodheshwa hapo juu na kuzingatia mingine kwa msingi wa kesi kwa kesi. Kwa kuwa kuwakilisha EOA yako kwa mkataba kunatoa udhibiti juu ya mali zote, mikoba ya maunzi inapaswa kuwa makini na jinsi wanavyotekeleza 7702.

### Matukio ya ujumuishaji kwa programu saidizi {#integration-scenarios-for-companion-apps}

#### Uvivu {#lazy}

Kwa kuwa EOA bado inafanya kazi kama kawaida, hakuna la kufanya.

Kumbuka : baadhi ya mali zinaweza kukataliwa kiotomatiki na msimbo wa uwakilishi, kama vile NFT za ERC 1155, na usaidizi unapaswa kufahamu hilo.

#### Ufahamu {#aware}

Mjulishe mtumiaji kwamba uwakilishi upo kwa EOA kwa kuangalia msimbo wake, na kwa hiari toa kuondoa uwakilishi.

#### Uwakilishi wa kawaida {#common-delegation}

Mtoa huduma wa maunzi huorodhesha mikataba inayojulikana ya uwakilishi na kutekeleza usaidizi wao katika programu saidizi. Inapendekezwa kuchagua mkataba wenye usaidizi kamili wa ERC 4337.

EOA zilizowakilishwa kwa tofauti zitashughulikiwa kama EOA za kawaida.

#### Uwakilishi maalum {#custom-delegation}

Mtoa huduma wa maunzi hutekeleza mkataba wake wa uwakilishi na kuuongeza kwenye orodha hutekeleza usaidizi wake katika programu saidizi. Inapendekezwa kujenga mkataba wenye usaidizi kamili wa ERC 4337.

EOA zilizowakilishwa kwa tofauti zitashughulikiwa kama EOA za kawaida.
