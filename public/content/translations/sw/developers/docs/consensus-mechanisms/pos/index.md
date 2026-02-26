---
title: Uthibitisho-wa-hisa (PoS)
description: Maelezo ya itifaki ya makubaliano ya uthibitisho wa stake na jukumu lake katika Ethereum.
lang: sw
---

Uthibitisho wa Hisa (PoS) ndio msingi wa [utaratibu wa makubaliano](/developers/docs/consensus-mechanisms/) wa Ethereum. Ethereum iliwasha utaratibu wake wa uthibitisho wa hisa mnamo 2022 kwa sababu ni salama zaidi, hutumia nishati kidogo, na ni bora zaidi kwa kutekeleza suluhu mpya za kuongeza ukubwa ikilinganishwa na usanifu wa awali wa [uthibitisho wa kazi](/developers/docs/consensus-mechanisms/pow).

## Mahitaji ya awali {#prerequisites}

Ili kuelewa ukurasa huu vizuri zaidi, tunapendekeza usome kwanza kuhusu [taratibu za makubaliano](/developers/docs/consensus-mechanisms/).

## Uthibitisho wa stake (PoS) ni nini? {#what-is-pos}

Uthibitisho-wa-stake ni njia ya kuthibitisha kwamba wathibitishaji wameweka kitu cha thamani kwenye mtandao ambacho kinaweza kuharibiwa ikiwa watafanya uaminifu. Katika uthibitisho wa dau la Ethereum, waidhinishaji huweka stake waziwazi katika mfumo wa ETH na kuwa kandarasi mahiri kwenye Ethereum. Mthibitishaji basi ana jukumu la kuangalia ikiwa vitalu vipya vinavyoenezwa kwenye mtandao ni halali na mara kwa mara huunda na kueneza vitalu vipya vyenyewe. Iwapo watajaribu kulaghai mtandao (kwa mfano kwa kupendekeza vitalu vingi wakati wanapaswa kutuma moja au kutuma uthibitisho unaokinzana), baadhi ya staked ETH zao au zote zilizowekwa hatarini zinaweza kuharibiwa.

## Wathibitishaji {#validators}

Ili kushiriki kama mthibitishaji, ni lazima mtumiaji aweke 32 ETH kwenye mkataba wa amana na aendeshe vipande vitatu tofauti vya programu: mteja wa kutekeleza, mteja wa makubaliano na mteja aliyeidhinisha. Wakati wa kuweka ETH zao, mtumiaji hujiunga na foleni ya kuwezesha ambayo inaweka kikomo cha wathibitishaji wapya wanaojiunga na mtandao. Mara baada ya kuanzishwa, wathibitishaji hupokea vitalu vipya kutoka kwa wenzao kwenye mtandao wa Ethereum. Shughuli zilizowasilishwa kwenye kitalu zinatekelezwa tena ili kuangalia kwamba mabadiliko yaliyopendekezwa kwa hali ya Ethereum ni halali, na saini ya kitalu imeangaliwa. Kisha mthibitishaji hutuma kura (inayoitwa uthibitisho) kupendelea kitalu hicho kwenye mtandao.

Ingawa chini ya uthibitisho wa kazi, muda wa vitalu huamuliwa na ugumu wa uchimbaji madini, katika uthibitisho wa stake, tempo huwekwa. Wakati katika uthibitisho wa hatari Ethereum imegawanywa katika nafasi (sekunde 12) na vipindi (mipaka 32). Kithibitishaji kimoja huchaguliwa kwa nasibu kuwa pendekezo la kitalu katika kila yanayopangwa. Kithibitishaji hiki kinawajibika kuunda kitalu kipya na kutuma kwa nodi zingine kwenye mtandao. Pia katika kila yanayopangwa, kamati ya wathibitishaji huchaguliwa kwa nasibu, ambao kura zao hutumiwa kuamua uhalali wa kitalu kinachopendekezwa. Kugawanya kiidhinishi kilichoundwa katika kamati ni muhimu kwa kuweka mzigo wa mtandao kudhibitiwa. Kamati hugawanya seti ya kiidhinishaji ili kila mthibitishaji anayetumika athibitishe katika kila kipindi, lakini si katika kila nafasi.

## Jinsi Muamala Unavyotekelezwa katika Ethereum PoS {#transaction-execution-ethereum-pos}

Ifuatayo inatoa maelezo ya mwisho hadi mwisho ya jinsi shughuli inavyotekelezwa katika uthibitisho wa stake ya Ethereum.

1. Mtumiaji huunda na kutia saini [muamala](/developers/docs/transactions/) kwa kutumia ufunguo wake wa siri. Hii kwa kawaida hushughulikiwa na mkoba au maktaba kama vile [ethers.js](https://docs.ethers.org/v6/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/) n.k. lakini kwa ndani mtumiaji anafanya ombi kwa nodi kwa kutumia [API ya JSON-RPC](/developers/docs/apis/json-rpc/) ya Ethereum. Mtumiaji anafafanua kiasi cha gharama za miamala ambazo amejitayarisha kulipa kama kidokezo kwa kithibitishaji ili kumhimiza kujumuisha muamala kwenye kiambajengo. [Ada za kipaumbele](/developers/docs/gas/#priority-fee) hulipwa kwa mthibitishaji huku [ada ya msingi](/developers/docs/gas/#base-fee) ikichomwa.
2. Muamala huwasilishwa kwa [mteja wa utekelezaji](/developers/docs/nodes-and-clients/#execution-client) wa Ethereum ambaye huthibitisha uhalali wake. Hii inamaanisha kuhakikisha kuwa mtumaji ana ETH ya kutosha kutimiza muamala na wametia saini kwa ufunguo sahihi.
3. Ikiwa muamala ni halali, mteja wa utekelezaji anauongeza kwenye kumbukumbu yake ya ndani (orodha ya miamala ambayo haijashughulikiwa) na pia huitangaza kwa nodi nyingine juu ya safu ya utekelezaji ya mtandao wa porojo. Nodi nyingine zinaposikia kuhusu muamala huongeza kwenye kumbukumbu zao za ndani pia. Watumiaji wa hali ya juu wanaweza kujizuia kutangaza muamala wao na badala yake kuupeleka kwa wajenzi maalum wa vizuizi kama vile [Flashbots Auction](https://docs.flashbots.net/flashbots-auction/overview). Hii huwaruhusu kupanga miamala katika vizuizi vijavyo kwa faida ya juu zaidi ([MEV](/developers/docs/mev/#mev-extraction)).
4. Moja ya nodi za uthibitishaji kwenye mtandao ni pendekezo la kitalu kwa slot ya sasa, ambayo hapo awali ilichaguliwa pseudo-randomly kwa kutumia RANDAO. Node hii inawajibika kwa kujenga na kutangaza kitalu kinachofuata kuongezwa kwenye kiambajengo cha Ethereum na kusasisha hali ya kimataifa. Node imeundwa na sehemu tatu: mteja wa utekelezaji, mteja wa makubaliano na mteja wa kuthibitisha. Mteja wa utekelezaji hukusanya miamala kutoka kwa mempool ya ndani hadi "mzigo wa utekelezaji" na kuzitekeleza ndani ili kuleta mabadiliko ya hali. Taarifa hii hupitishwa kwa mteja wa makubaliano ambapo malipo ya utekelezaji yanafungwa kama sehemu ya "kitalu cha beacon" ambacho pia kina taarifa kuhusu zawadi, adhabu, kufyeka, uthibitisho n. k. zinazowezesha mtandao kukubaliana juu ya mlolongo wa vitalu kwenye kichwa cha mnyororo. Mawasiliano kati ya wateja wa utekelezaji na makubaliano yameelezewa kwa undani zaidi katika [Kuunganisha Wateja wa Makubaliano na Utekelezaji](/developers/docs/networking-layer/#connecting-clients).
5. Nodi zingine hupokea kitalu kipya cha beacon kwenye mtandao wa uvumi wa safu ya makubaliano. Wanaipitisha kwa mteja wao wa utekelezaji ambapo miamala inatekelezwa tena ndani ya nchi ili kuhakikisha kuwa mabadiliko ya hali yanayopendekezwa ni halali. Mteja mthibitishaji kisha huthibitisha kwamba kizuizi ni halali na ndicho kizuizi kinachofuata kimantiki katika mtazamo wao wa mnyororo (ikimaanisha inajengwa kwenye mnyororo wenye uzito mkubwa zaidi wa uthibitisho kama ilivyofafanuliwa katika [sheria za kuchagua uma](/developers/docs/consensus-mechanisms/pos/#fork-choice)). Kizuizi kinaongezwa kwenye hifadhidata ya ndani katika kila nodi inayoithibitisha.
6. Muamala unaweza kuchukuliwa kuwa "umekamilika" ikiwa umekuwa sehemu ya mlolongo wenye "kiungo cha walio wengi" kati ya vituo viwili vya ukaguzi. Vituo vya ukaguzi hutokea mwanzoni mwa kila kipindi na vipo kwa ajili ya ukweli kwamba ni sehemu ndogo tu ya wathibitishaji amilifu wanaothibitisha katika kila nafasi, lakini wathibitishaji wote wanaofanya kazi huthibitisha kila moja. Kwa hivyo, ni kati ya enzi pekee ambapo 'kiungo cha walio wengi zaidi' kinaweza kuonyeshwa (hapa ndipo 66% ya jumla ya ETH iliyowekwa kwenye mtandao inakubalika katika vituo viwili vya ukaguzi).

Maelezo zaidi juu ya mwisho yanaweza kupatikana hapa chini.

## Mwisho {#finality}

Muamala una "mwisho" katika mitandao iliyosambazwa wakati ni sehemu ya kizuizi ambacho hakiwezi kubadilika bila kiwango kikubwa cha ETH kuchomwa. Kwenye Ethereum ya uthibitisho wa dau, hii inadhibitiwa kwa kutumia vitalu vya "vituo vya ukaguzi". Kitalu cha kwanza katika kila enzi ni kituo cha ukaguzi. Wathibitishaji hupigia kura jozi za vituo vya ukaguzi ambavyo inachukulia kuwa halali. Iwapo jozi ya vituo vya ukaguzi vitavutia kura zinazowakilisha angalau theluthi mbili ya jumla ya ETH zilizokua staked, vituo vya ukaguzi vinaboreshwa. Hivi karibuni zaidi ya mbili (lengo) inakuwa "haki". Mapema kati ya haya mawili tayari yamehesabiwa haki kwa sababu ilikuwa "lengo" katika enzi iliyopita. Sasa imeboreshwa hadi "imekamilika". Mchakato huu wa kuboresha vituo vya ukaguzi unashughulikiwa na **[Casper the Friendly Finality Gadget (Casper-FFG)](https://arxiv.org/pdf/1710.09437)**. Casper-FFG ni zana ya umwisho wa kizuizi kwa ajili ya makubaliano. Pindi kizuizi kinapokamilishwa, hakiwezi kurejeshwa nyuma au kubadilishwa bila kufyekwa kwa hisa za walio wengi, na kuifanya isiwezekane kiuchumi.

Ili kurejesha kizuizi kilichokamilika, mshambulizi atajitolea kupoteza angalau theluthi moja ya jumla ya usambazaji wa ETH iliyokua staked. Sababu kamili ya hili imeelezewa katika [chapisho hili la blogu la Wakfu wa Ethereum](https://blog.ethereum.org/2016/05/09/on-settlement-finality/). Kwa kuwa umaliziaji unahitaji kura ya thuluthi mbili, mshambulizi anaweza kuzuia mtandao kufikia tamati kwa kupiga kura na thuluthi moja ya stake zote. Kuna utaratibu wa kujilinda dhidi ya hili: [uvujaji kutokana na kutokuwepo shughuli](https://eth2book.info/bellatrix/part2/incentives/inactivity). Hii huwashwa wakati wowote mnyororo unaposhindwa kukamilika kwa zaidi ya vipindi vinne. Uvujaji wa kutofanya kazi huondoa ETH iliyowekwa hatarini kutoka kwa waidhinishaji wanaopiga kura dhidi ya walio wengi, na hivyo kuruhusu walio wengi kurejesha thuluthi mbili na kukamilisha mnyororo.

## Usalama wa kiuchumi-kripto {#crypto-economic-security}

Kuendesha kithibitishaji ni kujitolea. Kithibitishaji kinatarajiwa kudumisha maunzi na muunganisho wa kutosha ili kushiriki katika uthibitishaji wa kitalu na pendekezo. Kwa kurudi, kihalalishaji hulipwa kwa ETH (salio lao la stake huongezeka). Kwa upande mwingine, kushiriki kama mthibitishaji pia hufungua njia mpya kwa watumiaji kushambulia mtandao kwa manufaa ya kibinafsi au hujuma. Ili kuzuia hili, waidhinishaji hukosa zawadi za ETH ikiwa watashindwa kushiriki walipoitwa, na hisa yao iliyopo inaweza kuharibiwa ikiwa watafanya ukosefu wa uaminifu. Tabia mbili za msingi zinaweza kuchukuliwa kuwa si za uaminifu: kupendekeza vizuizi vingi katika nafasi moja (kusawazisha) na kuwasilisha uthibitisho unaokinzana.

Kiasi cha ETH kilichopunguzwa kinategemea ni wathibitishaji wangapi pia wanapunguzwa karibu wakati huo huo. Hii inajulikana kama ["adhabu ya uwiano"](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty), na inaweza kuwa ndogo (~1% ya hisa kwa mthibitishaji mmoja anayefyekwa peke yake) au inaweza kusababisha 100% ya hisa ya mthibitishaji kuharibiwa (tukio la kufyeka kwa wingi). Imewekwa katikati ya kipindi cha kuondoka kwa kulazimishwa ambacho huanza na adhabu ya papo hapo (hadi 1 ETH) Siku ya 1, adhabu ya uunganisho Siku ya 18, na hatimaye, kutolewa kwenye mtandao Siku ya 36. Wanapokea adhabu ndogo za uthibitisho kila siku kwa sababu wapo kwenye mtandao lakini hawawasilishi kura. Hii yote inamaanisha kuwa shambulio lililoratibiwa litakuwa ghali sana kwa mshambuliaji.

## Uchaguzi wa uma {#fork-choice}

Wakati mtandao unafanya kazi kikamilifu na kwa uaminifu, kuna kizuizi kimoja tu kipya kwenye kichwa cha mnyororo, na waidhinishaji wote wanathibitisha hilo. Walakini, inawezekana kwa waidhinishaji kuwa na maoni tofauti ya mkuu wa mnyororo kwa sababu ya latency ya mtandao au kwa sababu mpendekezaji wa kitalu amepata usawa. Kwa hivyo, wateja wa makubaliano wanahitaji algorithm kuamua ni ipi ya kupendelea. Kanuni inayotumika katika uthibitisho wa hisa wa Ethereum inaitwa [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf), na inafanya kazi kwa kutambua uma ambao una uzito mkubwa zaidi wa uthibitisho katika historia yake.

## Uthibitisho wa hisa na usalama {#pos-and-security}

Tishio la [shambulizi la 51%](https://www.investopedia.com/terms/1/51-attack.asp) bado lipo kwenye uthibitisho wa hisa kama ilivyo kwenye uthibitisho wa kazi, lakini ni hatari zaidi kwa washambuliaji. Mshambulizi atahitaji 51% ya ETH iliyowekwa stake. Kisha wangeweza kutumia ushuhuda wao wenyewe ili kuhakikisha uma wapendao ndio ulikuwa na uthibitisho uliokusanywa zaidi. 'Uzito' wa uthibitisho uliokusanywa ndio ambao wateja wa makubaliano hutumia kubainisha mnyororo sahihi, ili mshambuliaji huyu aweze kufanya uma wao kuwa wa kisheria. Hata hivyo, nguvu ya uthibitisho wa hatari juu ya uthibitisho wa-kazi ni kwamba jumuiya ina badilika katika kuweka mashambulizi ya kukabiliana. Kwa mfano, wathibitishaji waaminifu wanaweza kuamua kuendelea kujikita kwenye mnyororo wa wachache na kupuuza uma wa mshambulizi huku wakihimiza programu, exchange na mabwawa kufanya vivyo hivyo. Wanaweza pia kuamua kumwondoa mshambuliaji kutoka kwa mtandao kwa nguvu na kuharibu staked ETH yao iliyohusika. Hizi ni ulinzi mkali wa kiuchumi dhidi ya shambulio la 51%.

Zaidi ya 51% ya mashambulizi, watendaji wabaya wanaweza pia kujaribu aina zingine za shughuli hasidi, kama vile:

- mashambulizi ya masafa marefu (ingawa kifaa cha mwisho kinapunguza vekta hii ya shambulio)
- masafa mafupi 'reorgs' (ingawa uongezaji wa mapendekezo na tarehe za mwisho za uthibitisho hupunguza hii)
- mashambulizi ya kurukaruka na kusawazisha (pia yamepunguzwa na uongezaji wa pendekezo, na mashambulizi haya hata hivyo yameonyeshwa tu chini ya hali bora za mtandao)
- mashambulizi ya avalanche (yaliyotengwa na sheria ya algorithms ya uchaguzi wa uma ya kuzingatia tu ujumbe wa hivi punde)

Kwa ujumla, uthibitisho wa stake, kama unavyotekelezwa kwenye Ethereum, umeonyeshwa kuwa salama zaidi kiuchumi kuliko uthibitisho wa kazi.

## Faida na hasara {#pros-and-cons}

| Faida                                                                                                                                                                                                                                                                                 | Hasara                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Staking hurahisisha watu binafsi kushiriki katika kupata mtandao, kukuza mfumo mtawanyo. nodi ya uthibitisho inaweza kuendeshwa kwenye kompyuta ndogo ya kawaida. Mabwawa ya staking huruhusu watumiaji kuhusika bila kuwa na 32 ETH. | Uthibitisho wa stake ni mchanga na haujajaribiwa vitani ikilinganishwa na uthibitisho wa kazi                                     |
| Staking ni ya mfumo mtawanyo zaidi. Uchumi wa viwango hautumiki kwa njia sawa na vile hufanya kwa uchimbaji wa PoW.                                                                                                                                   | Uthibitisho wa stake ni ngumu zaidi kutekeleza kuliko uthibitisho wa kazi                                                         |
| Uthibitisho-wa-stake hutoa usalama mkubwa zaidi wa kiuchumi wa kripto kuliko uthibitisho wa kazi                                                                                                                                                                                      | Watumiaji wanahitaji kuendesha vipande vitatu vya programu ili kushiriki katika uthibitisho wa stake ya Ethereum. |
| Utoaji mdogo wa ETH mpya unahitajika ili kutoa motisha kwa washiriki wa mtandao                                                                                                                                                                                                       |                                                                                                                                   |

### Ulinganisho na uthibitisho wa kazi {#comparison-to-proof-of-work}

Hapo awali Ethereum alitumia uthibitisho wa kazi lakini akabadilisha hadi uthibitisho wa stake mnamo Septemba 2022. PoS inatoa faida kadhaa juu ya PoW, kama vile:

- ufanisi bora wa nishati - hakuna haja ya kutumia nishati nyingi kwenye hesabu za uthibitisho wa kazi
- vizuizi vya chini vya kuingia, mahitaji ya vifaa vilivyopunguzwa - hakuna haja ya vifaa vya wasomi kupata nafasi ya kuunda vitalu vipya
- kupunguza hatari ya mfumo mkusanyo - uthibitisho wa kuhusika unapaswa kusababisha nodi nyingi kupata mtandao
- kwa sababu ya mahitaji ya chini ya nishati utoaji mdogo wa ETH unahitajika ili kuhamasisha ushiriki
- adhabu za kiuchumi kwa utovu wa nidhamu hufanya mashambulizi ya mtindo wa 51% kuwa ghali zaidi kwa mshambuliaji ikilinganishwa na uthibitisho wa kazi
- jamii inaweza kuamua kufufua kijamii ya mlolongo wa uaminifu ikiwa shambulio la 51% lingeshinda ulinzi wa kripto-uchumi.

## Masomo zaidi {#further-reading}

- [Maswali Yanayoulizwa Mara kwa Mara kuhusu Uthibitisho wa Hisa](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Uthibitisho wa Hisa ni nini](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Uthibitisho wa Hisa ni Nini na Kwa Nini ni Muhimu](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Kwa Nini Uthibitisho wa Hisa (Nov 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Uthibitisho wa Hisa: Jinsi Nilivyojifunza Kupenda Ubinifu Dhaifu](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/) _Vitalik Buterin_
- [Shambulizi na ulinzi wa uthibitisho wa hisa wa Ethereum](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [Falsafa ya Usanifu wa Uthibitisho wa Hisa](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_
- [Video: Vitalik Buterin anaelezea uthibitisho wa hisa kwa Lex Fridman](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## Mada zinazohusiana {#related-topics}

- [Uthibitisho wa kazi](/developers/docs/consensus-mechanisms/pow/)
- [Uthibitisho wa Mamlaka](/developers/docs/consensus-mechanisms/poa/)
