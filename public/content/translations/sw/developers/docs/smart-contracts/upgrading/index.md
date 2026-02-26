---
title: Kuboresha mikataba erevu
description: Muhtasari wa mifumo ya usasishaji kwa mikataba-erevu ya Ethereum
lang: sw
---

Mikataba-erevu kwenye Ethereum ni programu zinazojitekeleza zinazoendeshwa kwenye mashine halisi ya ethereum (EVM). Programu hizi hazibadiliki kimuundo, jambo ambalo huzuia masasisho yoyote kwa mantiki ya kibiashara mara tu mkataba unapopelekwa.

Ingawa kutobadilika ni muhimu kwa kutokuwa na haja ya kuaminiana, ugatuzi, na usalama wa mikataba-erevu, inaweza kuwa hasara katika hali fulani. Kwa mfano, msimbo usiobadilika unaweza kufanya iwe vigumu kwa wasanidi programu kurekebisha mikataba iliyo hatarini.

Hata hivyo, utafiti ulioongezeka katika kuboresha mikataba-erevu umesababisha kuanzishwa kwa mifumo kadhaa ya usasishaji. Mifumo hii ya usasishaji huwawezesha wasanidi programu kusasisha mikataba-erevu (huku wakihifadhi kutobadilika) kwa kuweka mantiki ya biashara katika mikataba tofauti.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuwa na uelewa mzuri wa [mikataba-erevu](/developers/docs/smart-contracts/), [muundo wa mkataba-erevu](/developers/docs/smart-contracts/anatomy/), na [mashine halisi ya ethereum (EVM)](/developers/docs/evm/). Mwongozo huu pia unachukulia kuwa wasomaji wana uelewa wa kupanga programu za mikataba-erevu.

## Usasishaji wa mkataba-erevu ni nini? {#what-is-a-smart-contract-upgrade}

Usasishaji wa mkataba-erevu unahusisha kubadilisha mantiki ya biashara ya mkataba-erevu huku ukihifadhi hali ya mkataba. Ni muhimu kufafanua kwamba uwezo wa kusasishwa na uwezo wa kubadilika si kitu kimoja, hasa katika muktadha wa mikataba-erevu.

Bado huwezi kubadilisha programu iliyotumwa kwenye anwani katika mtandao wa Ethereum. Lakini unaweza kubadilisha msimbo unaotekelezwa watumiaji wanapoingiliana na mkataba-erevu.

Hili linaweza kufanywa kupitia njia zifuatazo:

1. Kuunda matoleo mengi ya mkataba-erevu na kuhamisha hali (yaani, data) kutoka kwa mkataba wa zamani hadi nakala mpya ya mkataba.

2. Kuunda mikataba tofauti ya kuhifadhi mantiki ya biashara na hali.

3. Kutumia mifumo ya proksi ili kukasimu miito ya chaguo za kukokotoa kutoka kwa mkataba wa proksi usiobadilika hadi mkataba wa kimantiki unaoweza kurekebishwa.

4. Kuunda mkataba mkuu usiobadilika unaounganishwa na kutegemea mikataba rahisi ya setilaiti ili kutekeleza chaguo za kukokotoa mahususi.

5. Kutumia mfumo wa almasi ili kukasimu miito ya chaguo za kukokotoa kutoka kwa mkataba wa proksi hadi kwa mikataba ya kimantiki.

### Utaratibu wa usasishaji #1: Uhamishaji wa mkataba {#contract-migration}

Uhamishaji wa mkataba unategemea uwekaji matoleo—wazo la kuunda na kudhibiti hali za kipekee za programu moja. Uhamishaji wa mkataba unahusisha kupeleka nakala mpya ya mkataba-erevu uliopo na kuhamisha ghala na salio kwenye mkataba mpya.

Mkataba mpya uliotumwa utakuwa na ghala tupu, inayokuruhusu kupata data kutoka kwa mkataba wa zamani na kuiandika kwenye utekelezaji mpya. Baadaye, utahitaji kusasisha mikataba yote iliyoingiliana na mkataba wa zamani ili kuonyesha anwani mpya.

Hatua ya mwisho katika uhamishaji wa mkataba ni kuwashawishi watumiaji wabadili na kutumia mkataba mpya. Toleo jipya la mkataba litahifadhi salio na anwani za watumiaji, jambo ambalo huhifadhi kutobadilika. Ikiwa ni mkataba unaotegemea tokeni, utahitaji pia kuwasiliana na mabadilishano ili kuachana na mkataba wa zamani na kutumia mkataba mpya.

Uhamishaji wa mkataba ni hatua rahisi na salama kwa kusasisha mikataba-erevu bila kuvunja mwingiliano wa watumiaji. Hata hivyo, kuhamisha ghala na salio za mtumiaji kwa mkono hadi kwa mkataba mpya kunachukua muda mwingi na kunaweza kusababisha gharama kubwa za gesi.

[Zaidi kuhusu uhamishaji wa mkataba.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### Utaratibu wa usasishaji #2: Utengano wa data {#data-separation}

Njia nyingine ya kusasisha mikataba-erevu ni kutenganisha mantiki ya biashara na ghala la data katika mikataba tofauti. Hii inamaanisha watumiaji huingiliana na mkataba wa kimantiki, huku data ikihifadhiwa kwenye mkataba wa ghala.

Mkataba wa kimantiki una msimbo unaotekelezwa wakati watumiaji wanapoingiliana na programu. Pia unashikilia anwani ya mkataba wa ghala na huingiliana nao ili kupata na kuweka data.

Wakati huo huo, mkataba wa ghala unashikilia hali inayohusishwa na mkataba-erevu, kama vile salio na anwani za watumiaji. Kumbuka kuwa mkataba wa ghala unamilikiwa na mkataba wa kimantiki na umesanidiwa na anwani ya mkataba huo wa kimantiki wakati wa kupelekwa. Hii inazuia mikataba isiyoidhinishwa kuita mkataba wa ghala au kusasisha data yake.

Kwa chaguo-msingi, mkataba wa ghala haubadiliki—lakini unaweza kubadilisha mkataba wa kimantiki unaoelekeza na utekelezaji mpya. Hii itabadilisha msimbo unaoendeshwa katika EVM, huku ukiweka ghala na salio bila kubadilika.

Kutumia njia hii ya usasishaji kunahitaji kusasisha anwani ya mkataba wa kimantiki katika mkataba wa ghala. Ni lazima pia usanidi mkataba mpya wa kimantiki na anwani ya mkataba wa ghala kwa sababu zilizoelezwa hapo awali.

Mfumo wa utengano wa data bila shaka ni rahisi kutekeleza ikilinganishwa na uhamishaji wa mkataba. Hata hivyo, itabidi udhibiti mikataba mingi na utekeleze mifumo changamano ya uidhinishaji ili kulinda mikataba-erevu dhidi ya masasisho dhalimu.

### Utaratibu wa usasishaji #3: Mifumo ya proksi {#proxy-patterns}

Mfumo wa proksi pia hutumia utengano wa data ili kuweka mantiki ya biashara na data katika mikataba tofauti. Hata hivyo, katika mfumo wa proksi, mkataba wa ghala (unaoitwa proksi) huita mkataba wa kimantiki wakati wa utekelezaji wa msimbo. Hii ni kinyume cha njia ya kutenganisha data, ambapo mkataba wa kimantiki huita mkataba wa ghala.

Hivi ndivyo hutokea katika mfumo wa proksi:

1. Watumiaji huingiliana na mkataba wa proksi, ambao huhifadhi data, lakini haushikilii mantiki ya biashara.

2. Mkataba wa proksi huhifadhi anwani ya mkataba wa kimantiki na hukasimu miito yote ya chaguo za kukokotoa kwa mkataba wa kimantiki (unaoshikilia mantiki ya biashara) kwa kutumia chaguo za kukokotoa la `delegatecall`.

3. Baada ya wito kupelekwa kwa mkataba wa kimantiki, data iliyorejeshwa kutoka kwa mkataba wa kimantiki inapatikana na kurejeshwa kwa mtumiaji.

Kutumia mifumo ya proksi kunahitaji uelewa wa chaguo za kukokotoa la **delegatecall**. Kimsingi, `delegatecall` ni opcode inayoruhusu mkataba kuita mkataba mwingine, wakati utekelezaji halisi wa msimbo unafanyika katika muktadha wa mkataba unaopiga simu. Athari ya kutumia `delegatecall` katika mifumo ya proksi ni kwamba mkataba wa proksi husoma na kuandika kwenye ghala lake na kutekeleza mantiki iliyohifadhiwa kwenye mkataba wa kimantiki kana kwamba inaita chaguo za kukokotoa la ndani.

Kutoka [nyaraka za Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries):

> _Kuna lahaja maalum ya wito wa ujumbe, inayoitwa **delegatecall** ambayo ni sawa na wito wa ujumbe isipokuwa ukweli kwamba msimbo katika anwani lengwa unatekelezwa katika muktadha (yaani, katika anwani) ya mkataba unaoita na `msg.sender` na `msg.value` hazibadilishi thamani zao._ _Hii ina maana kwamba mkataba unaweza kupakia msimbo kutoka kwa anwani tofauti kwa nguvu wakati wa uendeshaji. Ghala, anwani ya sasa na salio bado zinarejelea mkataba unaopiga simu, ni msimbo tu unachukuliwa kutoka kwa anwani inayoitwa._

Mkataba wa proksi unajua kuomba `delegatecall` wakati wowote mtumiaji anapoita chaguo za kukokotoa kwa sababu una chaguo za kukokotoa la `fallback` lililojengwa ndani yake. Katika programu ya Solidity, [chaguo za kukokotoa mbadala](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) hutekelezwa wakati wito wa chaguo za kukokotoa hailingani na chaguo za kukokotoa zilizobainishwa katika mkataba.

Kufanya mfumo wa proksi ufanye kazi kunahitaji kuandika chaguo za kukokotoa mbadala maalum ambalo hubainisha jinsi mkataba wa proksi unapaswa kushughulikia miito ya chaguo za kukokotoa usiyounga mkono. Katika hali hii, chaguo za kukokotoa mbadala la proksi limepangwa kuanzisha delegatecall na kuelekeza ombi la mtumiaji kwa utekelezaji wa sasa wa mkataba wa kimantiki.

Mkataba wa proksi haubadiliki kwa chaguo-msingi, lakini mikataba mipya ya kimantiki yenye mantiki ya biashara iliyosasishwa inaweza kuundwa. Kufanya usasishaji basi ni suala la kubadilisha anwani ya mkataba wa kimantiki unaorejelewa katika mkataba wa proksi.

Kwa kuelekeza mkataba wa proksi kwenye mkataba mpya wa kimantiki, msimbo unaotekelezwa watumiaji wanapoita chaguo za kukokotoa la mkataba wa proksi hubadilika. Hii inatuwezesha kusasisha mantiki ya mkataba bila kuwauliza watumiaji kuingiliana na mkataba mpya.

Mifumo ya proksi ni njia maarufu ya kusasisha mikataba-erevu kwa sababu huondoa ugumu unaohusishwa na uhamishaji wa mkataba. Hata hivyo, mifumo ya proksi ni ngumu zaidi kutumia na inaweza kuleta dosari kubwa, kama vile [migongano ya viteuzi vya chaguo za kukokotoa](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357), ikitumiwa isivyofaa.

[Zaidi kuhusu mifumo ya proksi](https://blog.openzeppelin.com/proxy-patterns/).

### Utaratibu wa usasishaji #4: Mfumo wa mkakati {#strategy-pattern}

Mbinu hii inaathiriwa na [mfumo wa mkakati](https://en.wikipedia.org/wiki/Strategy_pattern), ambayo inahimiza kuunda programu za kompyuta zinazoungana na programu nyingine ili kutekeleza vipengele maalum. Kutumia mfumo wa mkakati kwenye usanidi wa Ethereum kutamaanisha kujenga mkataba-erevu unaoita chaguo za kukokotoa kutoka kwa mikataba mingine.

Mkataba mkuu katika kesi hii una mantiki ya msingi ya biashara, lakini unaunganishwa na mikataba-erevu mingine ("mikataba ya setilaiti") ili kutekeleza chaguo za kukokotoa fulani. Mkataba huu mkuu pia huhifadhi anwani ya kila mkataba wa setilaiti na unaweza kubadili kati ya utekelezaji tofauti wa mkataba wa setilaiti.

Unaweza kujenga mkataba mpya wa setilaiti na kusanidi mkataba mkuu na anwani mpya. Hii hukuruhusu kubadilisha _mikakati_ (yaani, kutekeleza mantiki mpya) kwa mkataba-erevu.

Ingawa inafanana na mfumo wa proksi uliojadiliwa hapo awali, mfumo wa mkakati ni tofauti kwa sababu mkataba mkuu, ambao watumiaji huingiliana nao, unashikilia mantiki ya biashara. Kutumia mfumo huu kunakupa fursa ya kuleta mabadiliko machache kwenye mkataba-erevu bila kuathiri miundombinu ya msingi.

Hasara kuu ni kwamba mfumo huu unafaa zaidi kwa kutoa masasisho madogo. Pia, ikiwa mkataba mkuu utadukuliwa (k.m., kupitia udukuzi), huwezi kutumia njia hii ya usasishaji.

### Utaratibu wa usasishaji #5: Mfumo wa almasi {#diamond-pattern}

Mfumo wa almasi unaweza kuchukuliwa kama uboreshaji wa mfumo wa proksi. Mifumo ya almasi hutofautiana na mifumo ya proksi kwa sababu mkataba wa proksi wa almasi unaweza kukasimu miito ya chaguo za kukokotoa kwa zaidi ya mkataba mmoja wa kimantiki.

Mikataba ya kimantiki katika mfumo wa almasi inajulikana kama _facets_. Ili kufanya mfumo wa almasi ufanye kazi, unahitaji kuunda ramani katika mkataba wa proksi ambayo inaunganisha [viteuzi vya chaguo za kukokotoa](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) kwenye anwani tofauti za facet.

Mtumiaji anapofanya wito wa chaguo za kukokotoa, mkataba wa proksi hukagua ramani ili kupata facet inayohusika na kutekeleza chaguo hilo la kukokotoa. Kisha inaomba `delegatecall` (kwa kutumia chaguo za kukokotoa mbadala) na kuelekeza wito kwa mkataba wa kimantiki unaofaa.

Mfumo wa usasishaji wa almasi una faida fulani kuliko mifumo ya jadi ya usasishaji wa proksi:

1. Inakuruhusu kusasisha sehemu ndogo ya mkataba bila kubadilisha msimbo wote. Kutumia mfumo wa proksi kwa masasisho kunahitaji kuunda mkataba mpya kabisa wa kimantiki, hata kwa masasisho madogo.

2. Mikataba yote erevu (ikiwa ni pamoja na mikataba ya kimantiki inayotumika katika mifumo ya proksi) ina kikomo cha ukubwa wa KB 24, ambacho kinaweza kuwa kikwazo—hasa kwa mikataba tata inayohitaji chaguo za kukokotoa zaidi. Mfumo wa almasi hurahisisha kutatua tatizo hili kwa kugawanya chaguo za kukokotoa katika mikataba mingi ya kimantiki.

3. Mifumo ya proksi huchukua mbinu ya kujumlisha kwa udhibiti wa ufikiaji. Huluki yenye ufikiaji wa chaguo za kukokotoa za kusasisha inaweza kubadilisha mkataba _mzima_. Lakini mfumo wa almasi huwezesha mbinu ya ruhusa za mifumo, ambapo unaweza kuzuia huluki kusasisha chaguo za kukokotoa fulani ndani ya mkataba-erevu.

[Zaidi kuhusu mfumo wa almasi](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Faida na hasara za kusasisha mikataba-erevu {#pros-and-cons-of-upgrading-smart-contracts}

| Faida                                                                                                                                                                     | Hasara                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Usasishaji wa mkataba-erevu unaweza kurahisisha kurekebisha udhaifu uliogunduliwa katika awamu ya baada ya kupelekwa.                                     | Kusasisha mikataba-erevu kunapingana na wazo la kutobadilika kwa msimbo, jambo ambalo lina athari kwa ugatuzi na usalama.                                |
| Wasanidi programu wanaweza kutumia masasisho ya kimantiki kuongeza vipengele vipya kwenye mifumo iliyotawanywa.                                           | Watumiaji lazima wawaamini wasanidi programu wasibadilishe mikataba-erevu kiholela.                                                                      |
| Masasisho ya mikataba-erevu yanaweza kuboresha usalama kwa watumiaji wa mwisho kwani hitilafu zinaweza kurekebishwa haraka.                               | Kupanga programu ya utendaji wa usasishaji katika mikataba-erevu huongeza safu nyingine ya utata na huongeza uwezekano wa dosari kubwa.                  |
| Masasisho ya mkataba huwapa wasanidi programu nafasi zaidi ya kujaribu vipengele tofauti na kuboresha mifumo mtawanyo ya kimamlaka kadri muda unavyopita. | Fursa ya kusasisha mikataba-erevu inaweza kuwahimiza wasanidi programu kuzindua miradi haraka bila kufanya uchunguzi wa kina wakati wa awamu ya usanidi. |
|                                                                                                                                                                           | Udhibiti wa ufikiaji usio salama au uwekaji kati katika mikataba-erevu unaweza kurahisisha wahusika dhalimu kufanya masasisho yasiyoidhinishwa.          |

## Mambo ya kuzingatia katika kusasisha mikataba-erevu {#considerations-for-upgrading-smart-contracts}

1. Tumia mifumo salama ya udhibiti wa ufikiaji/uidhinishaji ili kuzuia masasisho yasiyoidhinishwa ya mikataba-erevu, hasa ikiwa unatumia mifumo ya proksi, mifumo ya mikakati, au utengano wa data. Mfano ni kuzuia ufikiaji wa chaguo za kukokotoa la usasishaji, ili mmiliki wa mkataba pekee ndiye anayeweza kuiita.

2. Kusasisha mikataba-erevu ni shughuli tata na inahitaji kiwango cha juu cha bidii ili kuzuia kuanzishwa kwa udhaifu.

3. Punguza dhana za uaminifu kwa kugatua mchakato wa kutekeleza masasisho. Mikakati inayowezekana ni pamoja na kutumia [mkataba wa mkoba wa saini-nyingi](/developers/docs/smart-contracts/#multisig) kudhibiti masasisho, au kuwataka [wanachama wa DAO](/dao/) kupiga kura kuidhinisha usasishaji.

4. Jihadharini na gharama zinazohusika katika kusasisha mikataba. Kwa mfano, kunakili hali (k.m., salio za mtumiaji) kutoka kwa mkataba wa zamani hadi mkataba mpya wakati wa uhamishaji wa mkataba kunaweza kuhitaji zaidi ya muamala mmoja, ikimaanisha ada zaidi za gesi.

5. Fikiria kutekeleza **kufuli za muda** ili kuwalinda watumiaji. Kufuli ya muda hurejelea ucheleweshaji unaotekelezwa kwenye mabadiliko ya mfumo. Kufuli za muda zinaweza kuunganishwa na mfumo wa utawala wa saini-nyingi ili kudhibiti masasisho: ikiwa hatua iliyopendekezwa itafikia kizingiti cha idhini kinachohitajika, haitekelezwi hadi kipindi cha ucheleweshaji kilichobainishwa awali kiishe.

Kufuli za muda huwapa watumiaji muda wa kujiondoa kwenye mfumo ikiwa hawakubaliani na mabadiliko yaliyopendekezwa (k.m., usasishaji wa kimantiki au mifumo mipya ya ada). Bila kufuli za muda, watumiaji wanahitaji kuwaamini wasanidi programu wasitekeleze mabadiliko ya kiholela katika mkataba-erevu bila taarifa ya awali. Hasara hapa ni kwamba kufuli za muda huzuia uwezo wa kurekebisha udhaifu haraka.

## Rasilimali {#resources}

**Vidirisha vya Masasisho vya OpenZeppelin - _Mkusanyiko wa zana za kupeleka na kulinda mikataba-erevu inayoweza kusasishwa._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Nyaraka](https://docs.openzeppelin.com/upgrades)

## Mafunzo {#tutorials}

- [Kusasisha Mikataba-erevu Yako | Mafunzo ya YouTube](https://www.youtube.com/watch?v=bdXJmWajZRY) na Patrick Collins
- [Mafunzo ya Uhamishaji wa Mkataba-erevu wa Ethereum](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd) na Austin Griffith
- [Kutumia mfumo wa proksi wa UUPS kusasisha mikataba-erevu](https://blog.logrocket.com/author/praneshas/) na Pranesh A.S
- [Mafunzo ya Web3: Andika mkataba-erevu unaoweza kusasishwa (proksi) kwa kutumia OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916) na fangjun.eth

## Masomo zaidi {#further-reading}

- [Hali ya Masasisho ya Mikataba-erevu](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) na Santiago Palladino
- [Njia nyingi za kusasisha mkataba-erevu wa Solidity](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/) - Blogu ya Crypto Market Pool
- [Jifunze: Kusasisha Mikataba-erevu](https://docs.openzeppelin.com/learn/upgrading-smart-contracts) - Nyaraka za OpenZeppelin
- [Mifumo ya Proksi kwa Uwezo wa Kusasishwa wa Mikataba ya Solidity: Proksi za Wazi dhidi ya Proksi za UUPS](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0) na Naveen Sahu
- [Jinsi Masasisho ya Almasi Yanavyofanya Kazi](https://dev.to/mudgen/how-diamond-upgrades-work-417j) na Nick Mudge
