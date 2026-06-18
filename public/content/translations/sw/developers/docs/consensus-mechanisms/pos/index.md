---
title: Uthibitisho wa Dau (PoS)
description: Maelezo ya itifaki ya mwafaka ya uthibitisho wa dau na jukumu lake katika Ethereum.
lang: sw
---

Uthibitisho wa Dau (PoS) ndio msingi wa [utaratibu wa makubaliano](/developers/docs/consensus-mechanisms/) wa Ethereum. Ethereum iliwasha utaratibu wake wa uthibitisho wa dau mnamo 2022 kwa sababu ni salama zaidi, unatumia nishati kidogo, na ni bora kwa kutekeleza suluhisho mpya za kuongeza viwango ikilinganishwa na usanifu wa awali wa [Uthibitisho wa Kazi (PoW)](/developers/docs/consensus-mechanisms/pow).

## Mahitaji ya awali {#prerequisites}

Ili kuelewa vyema ukurasa huu, tunapendekeza usome kwanza kuhusu [taratibu za makubaliano](/developers/docs/consensus-mechanisms/).

## Uthibitisho wa Dau (PoS) ni nini? {#what-is-pos}

Uthibitisho wa dau ni njia ya kuthibitisha kwamba mathibitishaji wameweka kitu cha thamani kwenye mtandao ambacho kinaweza kuharibiwa ikiwa watatenda kwa udanganyifu. Katika uthibitisho wa dau wa [Ethereum](/), mathibitishaji huweka dhamana ya mtaji waziwazi kwa njia ya ETH kwenye mkataba mahiri kwenye Ethereum. Mthibitishaji kisha anawajibika kuangalia kwamba vitalu vipya vinavyosambazwa kwenye mtandao ni halali na mara kwa mara kuunda na kusambaza vitalu vipya wenyewe. Wakijaribu kulaghai mtandao (kwa mfano kwa kupendekeza vitalu vingi wakati wanapaswa kutuma kimoja au kutuma uthibitisho unaokinzana), baadhi au ETH yao yote iliyowekwa dhamana inaweza kuharibiwa.

## Mathibitishaji {#validators}

Ili kushiriki kama mthibitishaji, mtumiaji lazima aweke amana ya 32 ETH kwenye mkataba wa amana na kuendesha programu tatu tofauti: kiteja cha utekelezaji, mteja wa mwafaka, na kiteja cha mthibitishaji. Baada ya kuweka ETH yao, mtumiaji hujiunga na foleni ya uanzishaji ambayo inazuia kiwango cha mathibitishaji wapya kujiunga na mtandao. Baada ya kuanzishwa, mathibitishaji hupokea vitalu vipya kutoka kwa wenzao kwenye mtandao wa Ethereum. Miamala iliyowasilishwa kwenye kitalu inatekelezwa tena ili kuangalia kwamba mabadiliko yaliyopendekezwa kwenye hali ya Ethereum ni halali, na sahihi ya kitalu inakaguliwa. Mthibitishaji kisha hutuma kura (inayoitwa uthibitisho) kuunga mkono kitalu hicho kwenye mtandao.

Wakati chini ya uthibitisho wa kazi, muda wa vitalu huamuliwa na ugumu wa uchimbaji, katika uthibitisho wa dau, kasi imepangwa. Muda katika Ethereum ya uthibitisho wa dau umegawanywa katika sloti (sekunde 12) na vipindi (sloti 32). Mthibitishaji mmoja huchaguliwa kwa nasibu kuwa mpendekezaji wa bloku katika kila sloti. Mthibitishaji huyu anawajibika kuunda kitalu kipya na kukituma kwa nodi zingine kwenye mtandao. Pia katika kila sloti, kamati ya mathibitishaji huchaguliwa kwa nasibu, ambao kura zao hutumiwa kuamua uhalali wa kitalu kinachopendekezwa. Kugawanya kundi la mathibitishaji katika kamati ni muhimu kwa kuweka mzigo wa mtandao katika kiwango kinachoweza kudhibitiwa. Kamati hugawanya kundi la mathibitishaji ili kila mthibitishaji anayefanya kazi atoe uthibitisho katika kila kipindi, lakini si katika kila sloti.

## Jinsi Muamala Unavyotekelezwa katika PoS ya Ethereum {#transaction-execution-ethereum-pos}

Yafuatayo yanatoa maelezo ya mwanzo hadi mwisho ya jinsi muamala unavyotekelezwa katika uthibitisho wa dau wa Ethereum.

1. Mtumiaji huunda na kutia sahihi [muamala](/developers/docs/transactions/) kwa ufunguo wa siri wao. Hili kwa kawaida hushughulikiwa na mkoba au maktaba kama vile [Ethers.js](https://docs.ethers.org/v6/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/) n.k. lakini kiufundi mtumiaji anafanya ombi kwa nodi akitumia [JSON-RPC API](/developers/docs/apis/json-rpc/) ya Ethereum. Mtumiaji hufafanua kiasi cha gesi ambacho yuko tayari kulipa kama ada ya kipaumbele kwa mthibitishaji ili kuwahimiza kujumuisha muamala kwenye kitalu. [Ada za kipaumbele](/developers/docs/gas/#priority-fee) hulipwa kwa mthibitishaji huku [ada ya msingi](/developers/docs/gas/#base-fee) ikichomwa.
2. Muamala unawasilishwa kwa [kiteja cha utekelezaji](/developers/docs/nodes-and-clients/#execution-client) cha Ethereum ambacho huthibitisha uhalali wake. Hii inamaanisha kuhakikisha kuwa mtumaji ana ETH ya kutosha kutimiza muamala na ametia sahihi kwa ufunguo sahihi.
3. Ikiwa muamala ni halali, kiteja cha utekelezaji huongeza kwenye mempool yake ya ndani (orodha ya miamala inayosubiri) na pia kuisambaza kwa nodi zingine kupitia mtandao wa uvumi wa tabaka la utekelezaji. Nodi zingine zinaposikia kuhusu muamala huo, zinauongeza kwenye mempool yao ya ndani pia. Watumiaji wa hali ya juu wanaweza kujizuia kusambaza muamala wao na badala yake kuupeleka kwa wajenzi maalum wa vitalu kama vile [Flashbots Auction](https://docs.flashbots.net/flashbots-auction/overview). Hii inawaruhusu kupanga miamala katika vitalu vijavyo kwa faida kubwa zaidi ([MEV](/developers/docs/mev/#mev-extraction)).
4. Moja ya nodi za mthibitishaji kwenye mtandao ni mpendekezaji wa bloku kwa sloti ya sasa, akiwa amechaguliwa hapo awali kwa nasibu akitumia RANDAO. Nodi hii inawajibika kujenga na kusambaza kitalu kijacho kitakachoongezwa kwenye mnyororo wa vitalu wa Ethereum na kusasisha hali ya kimataifa. Nodi inaundwa na sehemu tatu: kiteja cha utekelezaji, mteja wa mwafaka na kiteja cha mthibitishaji. Kiteja cha utekelezaji hukusanya miamala kutoka kwenye mempool ya ndani kuwa "mzigo wa utekelezaji" na kuitekeleza ndani ili kuzalisha mabadiliko ya hali. Taarifa hii hupitishwa kwa mteja wa mwafaka ambapo mzigo wa utekelezaji hufungwa kama sehemu ya "kitalu cha kinara" ambacho pia kina taarifa kuhusu zawadi, adhabu, ukataji, uthibitisho n.k. zinazowezesha mtandao kukubaliana juu ya mfuatano wa vitalu kwenye kichwa cha mnyororo. Mawasiliano kati ya wateja wa utekelezaji na mwafaka yameelezwa kwa kina zaidi katika [Kuunganisha Wateja wa Mwafaka na Utekelezaji](/developers/docs/networking-layer/#connecting-clients).
5. Nodi zingine hupokea kitalu cha kinara kipya kwenye mtandao wa uvumi wa tabaka la mwafaka. Wanapitisha kwa kiteja chao cha utekelezaji ambapo miamala inatekelezwa tena ndani ili kuhakikisha mabadiliko ya hali yaliyopendekezwa ni halali. Kiteja cha mthibitishaji kisha kinathibitisha kwamba kitalu ni halali na ni kitalu kinachofuata kimantiki katika mtazamo wao wa mnyororo (ikimaanisha kinajengwa kwenye mnyororo wenye uzito mkubwa zaidi wa uthibitisho kama ilivyofafanuliwa katika [sheria za uchaguzi wa mchepuo](/developers/docs/consensus-mechanisms/pos/#fork-choice)). Kitalu kinaongezwa kwenye hifadhidata ya ndani katika kila nodi inayokithibitisha.
6. Muamala unaweza kuchukuliwa kuwa "uliokamilishwa" ikiwa umekuwa sehemu ya mnyororo wenye "kiungo cha wingi mkuu" kati ya vituo viwili vya ukaguzi. Vituo vya ukaguzi hutokea mwanzoni mwa kila kipindi na vipo ili kuzingatia ukweli kwamba ni kikundi kidogo tu cha mathibitishaji wanaofanya kazi hutoa uthibitisho katika kila sloti, lakini mathibitishaji wote wanaofanya kazi hutoa uthibitisho katika kila kipindi. Kwa hivyo, ni kati ya vipindi tu ambapo 'kiungo cha wingi mkuu' kinaweza kuonyeshwa (hapa ndipo 66% ya jumla ya ETH iliyowekwa dhamana kwenye mtandao inakubaliana juu ya vituo viwili vya ukaguzi).

Maelezo zaidi kuhusu ukamilifu yanaweza kupatikana hapa chini.

## Ukamilifu {#finality}

Muamala una "ukamilifu" katika mitandao iliyosambazwa unapokuwa sehemu ya kitalu ambacho hakiwezi kubadilika bila kiasi kikubwa cha ETH kuchomwa. Kwenye Ethereum ya uthibitisho wa dau, hili linasimamiwa kwa kutumia vitalu vya "kituo cha ukaguzi". Kitalu cha kwanza katika kila kipindi ni kituo cha ukaguzi. Mathibitishaji hupiga kura kwa jozi za vituo vya ukaguzi wanavyoona kuwa halali. Ikiwa jozi ya vituo vya ukaguzi inavutia kura zinazowakilisha angalau theluthi mbili ya jumla ya ETH iliyowekwa dhamana, vituo vya ukaguzi vinaboreshwa. Kile cha hivi karibuni zaidi kati ya hivyo viwili (lengo) kinakuwa "iliyohalalishwa". Kile cha awali kati ya hivyo viwili tayari kimehalalishwa kwa sababu kilikuwa "lengo" katika kipindi kilichopita. Sasa kinaboreshwa kuwa "kiliokamilishwa". Mchakato huu wa kuboresha vituo vya ukaguzi unashughulikiwa na **[Casper the Friendly Finality Gadget (Casper FFG)](https://arxiv.org/pdf/1710.09437)**. Casper FFG ni zana ya ukamilifu wa kitalu kwa ajili ya mwafaka. Pindi kitalu kinapokamilishwa, hakiwezi kutenguliwa au kubadilishwa bila ukataji wa wengi wa waweka dhamana, na kuifanya isiwezekane kiuchumi.

Ili kutengua kitalu kiliokamilishwa, mshambuliaji angejitolea kupoteza angalau theluthi moja ya jumla ya usambazaji wa ETH iliyowekwa dhamana. Sababu hasa ya hili imeelezwa katika [chapisho hili la blogu la Taasisi ya Ethereum](https://blog.ethereum.org/2016/05/09/on-settlement-finality). Kwa kuwa ukamilifu unahitaji wingi wa theluthi mbili, mshambuliaji angeweza kuzuia mtandao kufikia ukamilifu kwa kupiga kura na theluthi moja ya jumla ya dhamana. Kuna utaratibu wa kujilinda dhidi ya hili: [uvujaji wa kutotenda](https://eth2book.info/bellatrix/part2/incentives/inactivity). Hii huanzishwa wakati wowote mnyororo unaposhindwa kukamilika kwa zaidi ya vipindi vinne. Uvujaji wa kutotenda unavujisha ETH iliyowekwa dhamana kutoka kwa mathibitishaji wanaopiga kura dhidi ya wengi, na kuruhusu wengi kupata tena wingi wa theluthi mbili na kukamilisha mnyororo.

## Usalama wa kiuchumi wa kripto {#crypto-economic-security}

Kuendesha mthibitishaji ni ufungumanisho. Mthibitishaji anatarajiwa kudumisha maunzi na muunganisho wa kutosha ili kushiriki katika uthibitishaji wa kitalu na pendekezo. Kwa malipo, mthibitishaji analipwa kwa ETH (salio lao lililowekwa dhamana linaongezeka). Kwa upande mwingine, kushiriki kama mthibitishaji pia hufungua njia mpya kwa watumiaji kushambulia mtandao kwa faida ya kibinafsi au hujuma. Ili kuzuia hili, mathibitishaji hukosa zawadi za ETH ikiwa watashindwa kushiriki wanapoitwa, na dhamana yao iliyopo inaweza kuharibiwa ikiwa watatenda kwa udanganyifu. Tabia mbili za msingi zinaweza kuchukuliwa kuwa za udanganyifu: kupendekeza vitalu vingi katika sloti moja (kudanganya) na kuwasilisha uthibitisho unaokinzana.

Kiasi cha ETH kinachokatwa kinategemea ni mathibitishaji wangapi pia wanakatwa kwa wakati mmoja. Hii inajulikana kama ["adhabu ya uwiano"](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty), na inaweza kuwa ndogo (~1% ya dhamana kwa mthibitishaji mmoja aliyekatwa peke yake) au inaweza kusababisha 100% ya dhamana ya mthibitishaji kuharibiwa (tukio la ukataji wa watu wengi). Inawekwa katikati ya kipindi cha kujitoa kwa lazima ambacho huanza na adhabu ya haraka (hadi 1 ETH) Siku ya 1, adhabu ya uwiano Siku ya 18, na hatimaye, kutolewa kwenye mtandao Siku ya 36. Wanapokea adhabu ndogo za uthibitisho kila siku kwa sababu wapo kwenye mtandao lakini hawawasilishi kura. Haya yote yanamaanisha shambulio lililoratibiwa lingekuwa la gharama kubwa sana kwa mshambuliaji.

## Uchaguzi wa mchepuo {#fork-choice}

Wakati mtandao unafanya kazi kikamilifu na kwa uaminifu, kuna kitalu kipya kimoja tu kwenye kichwa cha mnyororo, na mathibitishaji wote wanakithibitisha. Hata hivyo, inawezekana kwa mathibitishaji kuwa na mitazamo tofauti ya kichwa cha mnyororo kutokana na ucheleweshaji wa mtandao au kwa sababu mpendekezaji wa bloku amedanganya. Kwa hivyo, wateja wa mwafaka wanahitaji algoriti ili kuamua ni ipi ya kupendelea. Algoriti inayotumika katika uthibitisho wa dau wa Ethereum inaitwa [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf), na inafanya kazi kwa kutambua mchepuo ambao una uzito mkubwa zaidi wa uthibitisho katika historia yake.

## Uthibitisho wa dau na usalama {#pos-and-security}

Tishio la [shambulio la asilimia 51](https://www.investopedia.com/terms/1/51-attack.asp) bado lipo kwenye uthibitisho wa dau kama lilivyo kwenye uthibitisho wa kazi, lakini ni hatari zaidi kwa washambuliaji. Mshambuliaji angehitaji 51% ya ETH iliyowekwa dhamana. Wangeweza kisha kutumia uthibitisho wao wenyewe kuhakikisha mchepuo wanaoupendelea ndio uliokuwa na uthibitisho mwingi uliokusanywa. 'Uzito' wa uthibitisho uliokusanywa ndio wateja wa mwafaka hutumia kuamua mnyororo sahihi, kwa hivyo mshambuliaji huyu angeweza kufanya mchepuo wao kuwa ule unaokubalika. Hata hivyo, nguvu ya uthibitisho wa dau juu ya uthibitisho wa kazi ni kwamba jamii ina unyumbufu katika kuanzisha shambulio la kupinga. Kwa mfano, mathibitishaji waaminifu wangeweza kuamua kuendelea kujenga kwenye mnyororo wa wachache na kupuuza mchepuo wa mshambuliaji huku wakiwahimiza programu, mabadilishano, na mabwawa kufanya vivyo hivyo. Wangeweza pia kuamua kumuondoa mshambuliaji kwa nguvu kwenye mtandao na kuharibu ETH yao iliyowekwa dhamana. Hizi ni ngome imara za kiuchumi dhidi ya shambulio la asilimia 51.

Zaidi ya mashambulio ya asilimia 51, watendaji wabaya wanaweza pia kujaribu aina zingine za shughuli mbaya, kama vile:

- mashambulio ya masafa marefu (ingawa zana ya ukamilifu inabatilisha vekta hii ya shambulio)
- 'reorgs' za masafa mafupi (ingawa uimarishaji wa mpendekezaji na tarehe za mwisho za uthibitisho hupunguza hili)
- mashambulio ya kudunda na kusawazisha (pia hupunguzwa na uimarishaji wa mpendekezaji, na mashambulio haya hata hivyo yameonyeshwa tu chini ya hali bora za mtandao)
- mashambulio ya maporomoko (yanabatilishwa na sheria ya algoriti za uchaguzi wa mchepuo ya kuzingatia tu ujumbe wa hivi punde)

Kwa ujumla, uthibitisho wa dau, kama unavyotekelezwa kwenye Ethereum, umeonyeshwa kuwa salama zaidi kiuchumi kuliko uthibitisho wa kazi.

## Faida na hasara {#pros-and-cons}

| Faida                                                                                                                                                                                                                | Hasara                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Uweka dhamana hurahisisha watu binafsi kushiriki katika kulinda mtandao, na kukuza ugatuzi. Nodi ya mthibitishaji inaweza kuendeshwa kwenye kompyuta mpakato ya kawaida. Mabwawa ya uwekaji dhamana huruhusu watumiaji kuweka dhamana bila kuwa na 32 ETH. | Uthibitisho wa dau ni mchanga na haujajaribiwa sana vitani ikilinganishwa na uthibitisho wa kazi              |
| Uwekaji dhamana umepewa ugatuzi zaidi. Uchumi wa kiwango hautumiki kwa njia sawa na unavyofanya kwa uchimbaji wa PoW.                                                                                                         | Uthibitisho wa dau ni mgumu zaidi kutekeleza kuliko uthibitisho wa kazi                          |
| Uthibitisho wa dau hutoa usalama mkubwa zaidi wa kiuchumi wa kripto kuliko uthibitisho wa kazi                                                                                                                                           | Watumiaji wanahitaji kuendesha programu tatu ili kushiriki katika uthibitisho wa dau wa Ethereum. |
| Utoaji mdogo wa ETH mpya unahitajika ili kuwahamasisha washiriki wa mtandao                                                                                                                                            |                                                                                         |

### Ulinganisho na uthibitisho wa kazi {#comparison-to-proof-of-work}

Ethereum awali ilitumia uthibitisho wa kazi lakini ilibadilika na kuwa uthibitisho wa dau mnamo Septemba 2022. PoS inatoa faida kadhaa juu ya PoW, kama vile:

- ufanisi bora wa nishati – hakuna haja ya kutumia nishati nyingi kwenye hesabu za uthibitisho wa kazi
- vizuizi vya chini vya kuingia, mahitaji yaliyopunguzwa ya maunzi – hakuna haja ya maunzi ya hali ya juu ili kupata nafasi ya kuunda vitalu vipya
- hatari iliyopunguzwa ya uwekaji kati – uthibitisho wa dau unapaswa kusababisha nodi nyingi zaidi kulinda mtandao
- kwa sababu ya hitaji dogo la nishati utoaji mdogo wa ETH unahitajika ili kuhamasisha ushiriki
- adhabu za kiuchumi kwa tabia mbaya hufanya mashambulio ya mtindo wa asilimia 51 kuwa ya gharama kubwa zaidi kwa mshambuliaji ikilinganishwa na uthibitisho wa kazi
- jamii inaweza kukimbilia urejeshaji wa kijamii wa mnyororo wa uaminifu ikiwa shambulio la asilimia 51 lingeshinda ngome za kiuchumi za kripto.

## Kusoma zaidi {#further-reading}

- [Maswali Yanayoulizwa Mara kwa Mara kuhusu Uthibitisho wa Dau](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Uthibitisho wa Dau ni Nini](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Uthibitisho wa Dau ni Nini na Kwa Nini ni Muhimu](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Kwa Nini Uthibitisho wa Dau (Nov 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Uthibitisho wa Dau: Jinsi Nilivyojifunza Kupenda Udhanifu Dhaifu](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity) _Vitalik Buterin_
- [Shambulio na ulinzi wa Ethereum ya uthibitisho wa dau](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [Falsafa ya Usanifu wa Uthibitisho wa Dau](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_
- [Video: Vitalik Buterin anaelezea uthibitisho wa dau kwa Lex Fridman](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## Mada zinazohusiana {#related-topics}

- [Uthibitisho wa kazi](/developers/docs/consensus-mechanisms/pow/)
- [Uthibitisho wa mamlaka (PoA)](/developers/docs/consensus-mechanisms/poa/)