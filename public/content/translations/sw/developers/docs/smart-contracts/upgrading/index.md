---
title: Kuboresha mikataba mahiri
description: Muhtasari wa mifumo ya uboreshaji kwa mikataba mahiri ya Ethereum
lang: sw
---

Mikataba mahiri kwenye Ethereum ni programu zinazojitekeleza zenyewe zinazoendeshwa katika Mashine Pepe ya Ethereum (EVM). Programu hizi ni zisizobadilika kwa muundo, jambo ambalo huzuia masasisho yoyote kwenye mantiki ya biashara mara tu mkataba unaposambazwa.

Ingawa kutobadilika ni muhimu kwa hali ya kutohitaji kuamini, ugatuzi, na usalama wa mikataba mahiri, inaweza kuwa kikwazo katika baadhi ya matukio. Kwa mfano, msimbo usiobadilika unaweza kufanya iwezekane kwa wasanidi programu kurekebisha mikataba iliyo hatarini.

Hata hivyo, utafiti ulioongezeka katika kuboresha mikataba mahiri umesababisha kuanzishwa kwa mifumo kadhaa ya uboreshaji. Mifumo hii ya uboreshaji inawawezesha wasanidi programu kuboresha mikataba mahiri (huku wakihifadhi kutobadilika) kwa kuweka mantiki ya biashara katika mikataba tofauti.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuwa na uelewa mzuri wa [mikataba mahiri](/developers/docs/smart-contracts/), [muundo wa mkataba mahiri](/developers/docs/smart-contracts/anatomy/), na [Mashine Pepe ya Ethereum (EVM)](/developers/docs/evm/). Mwongozo huu pia unachukulia kuwa wasomaji wana uelewa wa kuandaa mikataba mahiri.

## Uboreshaji wa mkataba mahiri ni nini? {#what-is-a-smart-contract-upgrade}

Uboreshaji wa mkataba mahiri unahusisha kubadilisha mantiki ya biashara ya mkataba mahiri huku ukihifadhi hali ya mkataba. Ni muhimu kufafanua kwamba uwezo wa kuboreshwa na uwezo wa kubadilika si sawa, hasa katika muktadha wa mikataba mahiri.

Bado huwezi kubadilisha programu iliyosambazwa kwenye anwani katika mtandao wa Ethereum. Lakini unaweza kubadilisha msimbo unaotekelezwa wakati watumiaji wanaingiliana na mkataba mahiri.

Hili linaweza kufanywa kupitia mbinu zifuatazo:

1. Kuunda matoleo mengi ya mkataba mahiri na kuhamisha hali (yaani, data) kutoka kwa mkataba wa zamani hadi mfano mpya wa mkataba.

2. Kuunda mikataba tofauti ili kuhifadhi mantiki ya biashara na hali.

3. Kutumia mifumo ya uwakilishi kukaimisha miito ya fanksheni kutoka kwa mkataba wa uwakilishi usiobadilika hadi mkataba wa mantiki unaoweza kurekebishwa.

4. Kuunda mkataba mkuu usiobadilika ambao unaingiliana na kutegemea mikataba ya satelaiti inayobadilika ili kutekeleza fanksheni maalum.

5. Kutumia mfumo wa almasi kukaimisha miito ya fanksheni kutoka kwa mkataba wa uwakilishi hadi mikataba ya mantiki.

### Utaratibu wa uboreshaji #1: Uhamishaji wa mkataba {#contract-migration}

Uhamishaji wa mkataba unategemea utoaji wa matoleo—wazo la kuunda na kudhibiti hali za kipekee za programu sawa. Uhamishaji wa mkataba unahusisha kusambaza mfano mpya wa mkataba mahiri uliopo na kuhamisha hifadhi na salio kwenye mkataba mpya.

Mkataba uliosambazwa hivi karibuni utakuwa na hifadhi tupu, kukuwezesha kurejesha data kutoka kwa mkataba wa zamani na kuiandika kwenye utekelezaji mpya. Baadaye, utahitaji kusasisha mikataba yote iliyoingiliana na mkataba wa zamani ili kuonyesha anwani mpya.

Hatua ya mwisho katika uhamishaji wa mkataba ni kuwashawishi watumiaji kubadili na kutumia mkataba mpya. Toleo jipya la mkataba litahifadhi salio na anwani za watumiaji, jambo ambalo huhifadhi kutobadilika. Ikiwa ni mkataba unaotegemea tokeni, utahitaji pia kuwasiliana na mabadilishano ili kutupa mkataba wa zamani na kutumia mkataba mpya.

Uhamishaji wa mkataba ni hatua ya moja kwa moja na salama ya kuboresha mikataba mahiri bila kuvunja mwingiliano wa watumiaji. Hata hivyo, kuhamisha hifadhi na salio la mtumiaji kwa mikono kwenye mkataba mpya kunachukua muda mwingi na kunaweza kuingiza gharama kubwa za gesi.

[Zaidi kuhusu uhamishaji wa mkataba.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### Utaratibu wa uboreshaji #2: Utenganishaji wa data {#data-separation}

Mbinu nyingine ya kuboresha mikataba mahiri ni kutenganisha mantiki ya biashara na hifadhi ya data katika mikataba tofauti. Hii inamaanisha watumiaji wanaingiliana na mkataba wa mantiki, huku data ikihifadhiwa katika mkataba wa hifadhi.

Mkataba wa mantiki una msimbo unaotekelezwa wakati watumiaji wanaingiliana na programu. Pia unashikilia anwani ya mkataba wa hifadhi na kuingiliana nao ili kupata na kuweka data.

Wakati huo huo, mkataba wa hifadhi unashikilia hali inayohusishwa na mkataba mahiri, kama vile salio na anwani za watumiaji. Kumbuka kwamba mkataba wa hifadhi unamilikiwa na mkataba wa mantiki na umesanidiwa na anwani ya mwisho wakati wa usambazaji. Hii inazuia mikataba isiyoidhinishwa kuita mkataba wa hifadhi au kusasisha data yake.

Kwa chaguo-msingi, mkataba wa hifadhi haubadiliki—lakini unaweza kubadilisha mkataba wa mantiki unaoelekeza kwa utekelezaji mpya. Hii itabadilisha msimbo unaoendeshwa katika EVM, huku ukiweka hifadhi na salio sawa.

Kutumia mbinu hii ya uboreshaji kunahitaji kusasisha anwani ya mkataba wa mantiki katika mkataba wa hifadhi. Lazima pia usanidi mkataba mpya wa mantiki na anwani ya mkataba wa hifadhi kwa sababu zilizoelezwa hapo awali.

Mfumo wa utenganishaji wa data bila shaka ni rahisi kutekeleza ikilinganishwa na uhamishaji wa mkataba. Hata hivyo, itabidi udhibiti mikataba mingi na kutekeleza mipango tata ya uidhinishaji ili kulinda mikataba mahiri dhidi ya uboreshaji mbaya.

### Utaratibu wa uboreshaji #3: Mifumo ya uwakilishi {#proxy-patterns}

Mfumo wa uwakilishi pia unatumia utenganishaji wa data ili kuweka mantiki ya biashara na data katika mikataba tofauti. Hata hivyo, katika mfumo wa uwakilishi, mkataba wa hifadhi (unaoitwa uwakilishi) unaita mkataba wa mantiki wakati wa utekelezaji wa msimbo. Hii ni kinyume cha mbinu ya utenganishaji wa data, ambapo mkataba wa mantiki unaita mkataba wa hifadhi.

Hivi ndivyo kinachotokea katika mfumo wa uwakilishi:

1. Watumiaji wanaingiliana na mkataba wa uwakilishi, ambao unahifadhi data, lakini haushikilii mantiki ya biashara.

2. Mkataba wa uwakilishi unahifadhi anwani ya mkataba wa mantiki na kukaimisha miito yote ya fanksheni kwa mkataba wa mantiki (ambao unashikilia mantiki ya biashara) kwa kutumia fanksheni ya `delegatecall`.

3. Baada ya mwito kusambazwa kwa mkataba wa mantiki, data iliyorejeshwa kutoka kwa mkataba wa mantiki inarejeshwa na kurudishwa kwa mtumiaji.

Kutumia mifumo ya uwakilishi kunahitaji uelewa wa fanksheni ya **delegatecall**. Kimsingi, `delegatecall` ni msimbo wa operesheni unaoruhusu mkataba kuita mkataba mwingine, huku utekelezaji halisi wa msimbo ukitokea katika muktadha wa mkataba unaoita. Maana ya kutumia `delegatecall` katika mifumo ya uwakilishi ni kwamba mkataba wa uwakilishi unasoma na kuandika kwenye hifadhi yake na kutekeleza mantiki iliyohifadhiwa kwenye mkataba wa mantiki kana kwamba unaita fanksheni ya ndani.

Kutoka kwenye [nyaraka za Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries):

> _Kuna aina maalum ya mwito wa ujumbe, inayoitwa **delegatecall** ambayo inafanana na mwito wa ujumbe isipokuwa ukweli kwamba msimbo kwenye anwani lengwa unatekelezwa katika muktadha (yaani, kwenye anwani) wa mkataba unaoita na `msg.sender` na `msg.value` hazibadilishi thamani zake._ _Hii inamaanisha kuwa mkataba unaweza kupakia msimbo kwa nguvu kutoka kwa anwani tofauti wakati wa utekelezaji. Hifadhi, anwani ya sasa na salio bado zinarejelea mkataba unaoita, msimbo pekee ndio unachukuliwa kutoka kwa anwani inayoitwa._

Mkataba wa uwakilishi unajua kuita `delegatecall` wakati wowote mtumiaji anapoita fanksheni kwa sababu una fanksheni ya `fallback` iliyojengwa ndani yake. Katika upangaji programu wa Solidity [fanksheni mbadala](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) inatekelezwa wakati mwito wa fanksheni haulingani na fanksheni zilizobainishwa katika mkataba.

Kufanya mfumo wa uwakilishi ufanye kazi kunahitaji kuandika fanksheni mbadala maalum inayobainisha jinsi mkataba wa uwakilishi unapaswa kushughulikia miito ya fanksheni ambayo hauiauni. Katika hali hii fanksheni mbadala ya uwakilishi imepangwa kuanzisha delegatecall na kuelekeza upya ombi la mtumiaji kwenye utekelezaji wa sasa wa mkataba wa mantiki.

Mkataba wa uwakilishi haubadiliki kwa chaguo-msingi, lakini mikataba mipya ya mantiki yenye mantiki ya biashara iliyosasishwa inaweza kuundwa. Kufanya uboreshaji basi ni suala la kubadilisha anwani ya mkataba wa mantiki unaorejelewa katika mkataba wa uwakilishi.

Kwa kuelekeza mkataba wa uwakilishi kwenye mkataba mpya wa mantiki, msimbo unaotekelezwa wakati watumiaji wanaita fanksheni ya mkataba wa uwakilishi unabadilika. Hii inaturuhusu kuboresha mantiki ya mkataba bila kuwauliza watumiaji kuingiliana na mkataba mpya.

Mifumo ya uwakilishi ni mbinu maarufu ya kuboresha mikataba mahiri kwa sababu inaondoa matatizo yanayohusiana na uhamishaji wa mkataba. Hata hivyo, mifumo ya uwakilishi ni ngumu zaidi kutumia na inaweza kuanzisha dosari muhimu, kama vile [migongano ya kiteuzi cha fanksheni](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357), ikiwa inatumiwa isivyofaa.

[Zaidi kuhusu mifumo ya uwakilishi](https://blog.openzeppelin.com/proxy-patterns/).

### Utaratibu wa uboreshaji #4: Mfumo wa mkakati {#strategy-pattern}

Mbinu hii inasukumwa na [mfumo wa mkakati](https://en.wikipedia.org/wiki/Strategy_pattern), ambao unahimiza kuunda programu za kompyuta zinazoingiliana na programu nyingine ili kutekeleza vipengele maalum. Kutumia mfumo wa mkakati kwenye uundaji wa Ethereum kungemaanisha kujenga mkataba mahiri unaoita fanksheni kutoka kwa mikataba mingine.

Mkataba mkuu katika hali hii una mantiki ya msingi ya biashara, lakini unaingiliana na mikataba mingine mahiri ("mikataba ya satelaiti") ili kutekeleza fanksheni fulani. Mkataba huu mkuu pia unahifadhi anwani kwa kila mkataba wa satelaiti na unaweza kubadili kati ya utekelezaji tofauti wa mkataba wa satelaiti.

Unaweza kujenga mkataba mpya wa satelaiti na kusanidi mkataba mkuu na anwani mpya. Hii inakuruhusu kubadilisha _mikakati_ (yaani, kutekeleza mantiki mpya) kwa mkataba mahiri.

Ingawa inafanana na mfumo wa uwakilishi uliojadiliwa hapo awali, mfumo wa mkakati ni tofauti kwa sababu mkataba mkuu, ambao watumiaji wanaingiliana nao, unashikilia mantiki ya biashara. Kutumia mfumo huu kunakupa fursa ya kuanzisha mabadiliko machache kwenye mkataba mahiri bila kuathiri miundombinu ya msingi.

Kikwazo kikuu ni kwamba mfumo huu ni muhimu zaidi kwa kutoa uboreshaji mdogo. Pia, ikiwa mkataba mkuu umeathiriwa (k.m., kupitia udukuzi), huwezi kutumia mbinu hii ya uboreshaji.

### Utaratibu wa uboreshaji #5: Mfumo wa almasi {#diamond-pattern}

Mfumo wa almasi unaweza kuchukuliwa kama uboreshaji wa mfumo wa uwakilishi. Mifumo ya almasi inatofautiana na mifumo ya uwakilishi kwa sababu mkataba wa uwakilishi wa almasi unaweza kukaimisha miito ya fanksheni kwa zaidi ya mkataba mmoja wa mantiki.

Mikataba ya mantiki katika mfumo wa almasi inajulikana kama _facets_. Ili kufanya mfumo wa almasi ufanye kazi, unahitaji kuunda ramani katika mkataba wa uwakilishi inayounganisha [viteuzi vya fanksheni](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) kwenye anwani tofauti za facet.

Mtumiaji anapofanya mwito wa fanksheni, mkataba wa uwakilishi unakagua ramani ili kupata facet inayohusika na kutekeleza fanksheni hiyo. Kisha inaita `delegatecall` (kwa kutumia fanksheni mbadala) na kuelekeza upya mwito kwenye mkataba unaofaa wa mantiki.

Mfumo wa uboreshaji wa almasi una baadhi ya faida juu ya mifumo ya jadi ya uboreshaji wa uwakilishi:

1. Inakuruhusu kuboresha sehemu ndogo ya mkataba bila kubadilisha msimbo wote. Kutumia mfumo wa uwakilishi kwa uboreshaji kunahitaji kuunda mkataba mpya kabisa wa mantiki, hata kwa uboreshaji mdogo.

2. Mikataba yote mahiri (ikiwa ni pamoja na mikataba ya mantiki inayotumika katika mifumo ya uwakilishi) ina kikomo cha ukubwa cha 24KB, ambacho kinaweza kuwa kizuizi—hasa kwa mikataba tata inayohitaji fanksheni zaidi. Mfumo wa almasi hurahisisha kutatua tatizo hili kwa kugawanya fanksheni kwenye mikataba mingi ya mantiki.

3. Mifumo ya uwakilishi inachukua mbinu ya kujumuisha yote kwa vidhibiti vya ufikiaji. Huluki iliyo na ufikiaji wa kuboresha fanksheni inaweza kubadilisha mkataba _mzima_. Lakini mfumo wa almasi unawezesha mbinu ya ruhusa ya msimu, ambapo unaweza kuzuia huluki kuboresha fanksheni fulani ndani ya mkataba mahiri.

[Zaidi kuhusu mfumo wa almasi](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Faida na hasara za kuboresha mikataba mahiri {#pros-and-cons-of-upgrading-smart-contracts}

| Faida                                                                                                          | Hasara                                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Uboreshaji wa mkataba mahiri unaweza kurahisisha kurekebisha udhaifu uliogunduliwa katika awamu ya baada ya usambazaji.    | Kuboresha mikataba mahiri kunapingana na wazo la kutobadilika kwa msimbo, jambo ambalo lina athari kwa ugatuzi na usalama.                              |
| Wasanidi programu wanaweza kutumia uboreshaji wa mantiki ili kuongeza vipengele vipya kwenye programu tumizi zilizogatuliwa.                           | Watumiaji lazima waamini wasanidi programu kutorekebisha mikataba mahiri kiholela.                                                                                  |
| Uboreshaji wa mkataba mahiri unaweza kuboresha usalama kwa watumiaji wa mwisho kwa kuwa hitilafu zinaweza kurekebishwa haraka.                      | Kupanga utendakazi wa uboreshaji katika mikataba mahiri kunaongeza safu nyingine ya utata na kuongeza uwezekano wa dosari muhimu.                |
| Uboreshaji wa mkataba huwapa wasanidi programu nafasi zaidi ya kufanya majaribio na vipengele tofauti na kuboresha dapp kadiri muda unavyopita. | Fursa ya kuboresha mikataba mahiri inaweza kuwahimiza wasanidi programu kuzindua miradi haraka bila kufanya uchunguzi wa kina wakati wa awamu ya uundaji. |
|                                                                                                                | Udhibiti usio salama wa ufikiaji au uwekaji kati katika mikataba mahiri unaweza kurahisisha kwa watendaji wabaya kufanya uboreshaji usioidhinishwa.                  |

## Mambo ya kuzingatia kwa kuboresha mikataba mahiri {#considerations-for-upgrading-smart-contracts}

1. Tumia udhibiti salama wa ufikiaji/mbinu za uidhinishaji ili kuzuia uboreshaji usioidhinishwa wa mkataba mahiri, hasa ikiwa unatumia mifumo ya uwakilishi, mifumo ya mkakati, au utenganishaji wa data. Mfano ni kuzuia ufikiaji wa fanksheni ya uboreshaji, kiasi kwamba mmiliki wa mkataba pekee ndiye anayeweza kuiita.

2. Kuboresha mikataba mahiri ni shughuli ngumu na inahitaji kiwango cha juu cha uangalifu ili kuzuia kuanzishwa kwa udhaifu.

3. Punguza dhana za uaminifu kwa kugatua mchakato wa kutekeleza uboreshaji. Mikakati inayowezekana inajumuisha kutumia [mkataba wa mkoba wa saini nyingi](/developers/docs/smart-contracts/#multisig) ili kudhibiti uboreshaji, au kuhitaji [wanachama wa DAO](/dao/) kupiga kura kuidhinisha uboreshaji.

4. Fahamu gharama zinazohusika katika kuboresha mikataba. Kwa mfano, kunakili hali (k.m., salio la mtumiaji) kutoka kwa mkataba wa zamani hadi mkataba mpya wakati wa uhamishaji wa mkataba kunaweza kuhitaji zaidi ya muamala mmoja, ikimaanisha ada zaidi za gesi.

5. Fikiria kutekeleza **timelocks** ili kulinda watumiaji. Timelock inarejelea ucheleweshaji unaotekelezwa kwenye mabadiliko ya mfumo. Timelocks zinaweza kuunganishwa na mfumo wa utawala wa saini nyingi ili kudhibiti uboreshaji: ikiwa hatua iliyopendekezwa inafikia kiwango kinachohitajika cha idhini, haitekelezi hadi kipindi cha ucheleweshaji kilichobainishwa awali kipite.

Timelocks huwapa watumiaji muda wa kujitoa kwenye mfumo ikiwa hawakubaliani na mabadiliko yaliyopendekezwa (k.m., uboreshaji wa mantiki au mipango mipya ya ada). Bila timelocks, watumiaji wanahitaji kuamini wasanidi programu kutotekeleza mabadiliko ya kiholela katika mkataba mahiri bila taarifa ya awali. Kikwazo hapa ni kwamba timelocks huzuia uwezo wa kurekebisha udhaifu haraka.

## Rasilimali {#resources}

**Programu-jalizi za Uboreshaji za OpenZeppelin - _Kikundi cha zana za kusambaza na kulinda mikataba mahiri inayoweza kuboreshwa._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Nyaraka](https://docs.openzeppelin.com/upgrades)

## Mafunzo {#tutorials}

- [Kuboresha Mikataba yako Mahiri | Mafunzo ya YouTube](https://www.youtube.com/watch?v=bdXJmWajZRY) na Patrick Collins
- [Mafunzo ya Uhamishaji wa Mkataba Mahiri wa Ethereum](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd) na Austin Griffith
- [Kutumia mfumo wa uwakilishi wa UUPS kuboresha mikataba mahiri](https://blog.logrocket.com/author/praneshas/) na Pranesh A.S
- [Mafunzo ya Web3: Andika mkataba mahiri unaoweza kuboreshwa (uwakilishi) kwa kutumia OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916) na fangjun.eth

## Usomaji zaidi {#further-reading}

- [Hali ya Uboreshaji wa Mkataba Mahiri](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) na Santiago Palladino
- [Njia nyingi za kuboresha mkataba mahiri wa Solidity](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/) - Blogu ya Crypto Market Pool
- [Jifunze: Kuboresha Mikataba Mahiri](https://docs.openzeppelin.com/learn/upgrading-smart-contracts) - Nyaraka za OpenZeppelin
- [Mifumo ya Uwakilishi Kwa Uwezo wa Kuboreshwa wa Mikataba ya Solidity: Uwakilishi wa Uwazi dhidi ya UUPS](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0) na Naveen Sahu
- [Jinsi Uboreshaji wa Almasi Unavyofanya Kazi](https://dev.to/mudgen/how-diamond-upgrades-work-417j) na Nick Mudge