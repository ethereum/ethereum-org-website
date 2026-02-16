---
title: Gesi na ada
metaTitle: "Gesi na ada za Ethereum: Maelezo ya kiufundi"
description: Jifunze kuhusu ada za gesi za Ethereum, jinsi zinavyokokotolewa, na jukumu lake katika usalama wa mtandao na uchakataji wa miamala.
lang: sw
---

Gesi ni muhimu kwa mtandao wa Ethereum. Ni mafuta yanayoiwezesha kufanya kazi, kama vile gari linavyohitaji petroli ili kufanya kazi.

## Mahitaji ya awali {#prerequisites}

Ili kuelewa ukurasa huu vizuri zaidi, tunapendekeza usome kwanza kuhusu [miamala](/developers/docs/transactions/) na [EVM](/developers/docs/evm/).

## Gesi ni nini? {#what-is-gas}

Gesi hurejelea kitengo kinachopima kiasi cha juhudi za kihesabu zinazohitajika kutekeleza shughuli maalumu kwenye mtandao wa Ethereum.

Kwa sababu kila muamala wa Ethereum unahitaji rasilimali za kompyuta ili kutekelezwa, rasilimali hizo lazima zilipiwe ili kuhakikisha Ethereum sio hatarishi dhidi ya barua taka na haiwezi kukwama kwenye mzunguko wa kompyuta usio na mwisho. Malipo kwa ajili ya hesabu hufanywa kwa njia ya ada ya gesi.

Ada ya gesi ni **kiasi cha gesi kinachotumika kufanya operesheni fulani, kikizidishwa na gharama ya kila kitengo cha gesi**. Ada inalipwa bila kujali kama muamala unafanikiwa au hautafanikiwa.

![Mchoro unaoonyesha mahali gesi inahitajika katika operesheni za EVM](./gas.png)
_Mchoro umechukuliwa kutoka [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Ada za gesi lazima zilipwe kwa kutumia sarafu ya asili ya Ethereum, ether (ETH). Bei za gesi huwekwa kwa gwei, ambayo ni kiwango kidogo cha ETH. Kila gwei ni sawa na sehemu ya bilioni moja ya ETH (0.000000001 ETH au 10<sup>-9</sup>ETH).

Kwa mfano, badala ya kusema kuwa gesi yako inagharimu ether 0.000000001, unaweza kusema gesi yako inagharimu gwei 1.

Neno 'gwei' ni ufupisho wa 'giga-wei', likimaanisha 'bilioni wei'. Gwei moja ni sawa na bilioni wei. Wei yenyewe (iliyoitwa jina la [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), muundaji wa [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) ndiyo sehemu ndogo zaidi ya ETH.

## Ni jinsi gani gesi inapigiwa mahesabu? {#how-are-gas-fees-calculated}

Unaweza weka kiwango cha gesi ambacho upo tayari kulipa pale unapotaka kufanya muamala. Kwa kutoa kiasi fulani cha gesi, unajilipia ili muamala wako ujumuishwe katika kitalu kinachofuata. Ikiwa utatoa kidogo sana, wathibitishaji itawawia vigumu kuchagua muamala wako ujumuishwe, ikimaanisha muamala wako unaweza kutekelezwa kwa kuchelewa au usitekelezwe kabisa. Ukitoa kiwango kikubwa zaidi, inawezekana ukapoteza baadhi ya ETH. Sasa, unaweza kugundua kiwango gani unaweza kulipia?

Jumla ya gesi unayolipa imegawanywa katika vipengele viwili: `ada ya msingi` na `ada ya kipaumbele` (bakshishi).

`Ada ya msingi` huwekwa na itifaki—unapaswa kulipa angalau kiasi hiki ili muamala wako uchukuliwe kuwa halali. `Ada ya kipaumbele` ni bakshishi unayoongeza kwenye ada ya msingi ili kufanya muamala wako uvutie kwa wathibitishaji ili wauchague kwa ajili ya kujumuishwa kwenye kitalu kinachofuata.

Muamala unaolipa `ada ya msingi` pekee ni halali kitaalamu lakini hauwezekani kujumuishwa kwa sababu haitoi motisha kwa wathibitishaji kuuchagua badala ya muamala mwingine wowote. Ada 'sahihi' ya `kipaumbele` huamuliwa na matumizi ya mtandao wakati unapotuma muamala wako—ikiwa kuna mahitaji mengi, huenda ikabidi uweke ada yako ya `kipaumbele` juu zaidi, lakini wakati kuna mahitaji kidogo, unaweza kulipa kidogo.

Kwa mfano, hebu tuseme Jordan anapaswa kumlipa Taylor ETH 1. Uhamisho wa ETH unahitaji vitengo 21,000 vya gesi, na ada ya msingi ni gwei 10. Jordan anajumuisha ada ya kipaumbele ya gwei 2.

Jumla ya ada itakuwa sawa sawa na:

`vitengo vya gesi vilivyotumika * (ada ya msingi + ada ya kipaumbele)`

ambapo `ada ya msingi` ni thamani iliyowekwa na itifaki na `ada ya kipaumbele` ni thamani iliyowekwa na mtumiaji kama bakshishi kwa mthibitishaji.

k.m., `21,000 * (10 + 2) = 252,000 gwei` (0.000252 ETH).

Wakati Jordan anapotuma pesa, ETH 1.000252 zitatolewa kutoka kwenye akaunti ya Jordan. Taylor atapewa ETH 1.0000. Mthibitishaji atapokea ada ya kipaumbele ya ETH 0.000042. `Ada ya msingi` ya ETH 0.00021 inachomwa.

### Ada ya msingi {#base-fee}

Kila kitalu kina ada ya msingi ambacho kinafanya kazi kama bei ya akiba. Ili kustahili kujumuishwa katika kitalu bei iliyotolewa kwa kila gesi lazima angalau iwe sawa na ada ya msingi. Ada ya msingi huhesabiwa kwa kujitegemea na kitalu cha sasa na badala yake huamuliwa na vitalu vilivyotangulia, na kufanya ada za muamala zitabirike zaidi kwa watumiaji. Kitalu kinapoundwa, **ada hii ya msingi "inachomwa"**, na kuondolewa kwenye mzunguko.

Ada ya msingi hukokotolewa kwa fomula inayolinganisha ukubwa wa kitalu kilichopita (kiasi cha gesi iliyotumika kwa miamala yote) na ukubwa unaolengwa (nusu ya kikomo cha gesi). Ada ya msingi itaongezeka au kupungua kwa upeo wa 12.5% kwa kila kitalu ikiwa ukubwa wa kitalu lengwa utazidi au kuwa chini ya lengo, mtawalia. Ukuaji huu wa kasi hufanya iwe vigumu kiuchumi kwa ukubwa wa kitalu kubaki juu kwa muda usiojulikana.

| Namba ya Kitalu | Gesi Iliyojumuishwa |    Kuongezeka kwa Ada | Ada ya Msingi ya Hivi Sasa |
| --------------- | ------------------: | --------------------: | -------------------------: |
| 1               |                 18M |                    0% |                   gwei 100 |
| 2               |                 36M |                    0% |                   gwei 100 |
| 3               |                 36M | 12.5% | gwei 112.5 |
| 4               |                 36M | 12.5% | gwei 126.6 |
| 5               |                 36M | 12.5% | gwei 142.4 |
| 6               |                 36M | 12.5% | gwei 160.2 |
| 7               |                 36M | 12.5% | gwei 180.2 |
| 8               |                 36M | 12.5% | gwei 202.7 |

Katika jedwali lililo hapo juu, mfano unaonyeshwa kwa kutumia milioni 36 kama kikomo cha gesi. Kufuatia mfano huu, ili kuunda muamala kwenye kitalu nambari 9, mkoba utamjulisha mtumiaji kwa uhakika kwamba **ada ya msingi ya juu zaidi** itakayoongezwa kwenye kitalu kinachofuata ni `ada ya msingi ya sasa * 112.5%` au `202.7 gwei * 112.5% = 228.1 gwei`.

Ni muhimu pia kuzingatia kuwa kuna uwezekano mdogo wa kuona vitalu vilivyojaa kwa muda mrefu kutokana na kasi ambayo ada ya msingi huongezeka kabla ya kitalu kujaa kabisa.

| Namba ya Kitalu                                     |                                 Gesi Iliyojumuishwa |    Kuongezeka kwa Ada |                          Ada ya Msingi ya Hivi Sasa |
| --------------------------------------------------- | --------------------------------------------------: | --------------------: | --------------------------------------------------: |
| 30                                                  |                                                 36M | 12.5% |                         gwei 2705.6 |
| ... | ... | 12.5% | ... |
| 50                                                  |                                                 36M | 12.5% |                        gwei 28531.3 |
| ... | ... | 12.5% | ... |
| 100                                                 |                                                 36M | 12.5% |                     gwei 10302608.6 |

### Ada ya kipaumbele (bakshishi) {#priority-fee}

Ada ya kipaumbele (bakshishi) huwapa wathibitishaji motisha wa kuongeza idadi ya miamala katika kitalu, wakizuiliwa tu na kikomo cha gesi cha kitalu. Bila bakshishi, mthibitishaji mwenye busara anaweza kujumuisha miamala michache—au hata sifuri—bila adhabu yoyote ya moja kwa moja ya safu ya utekelezaji au safu ya makubaliano, kwa kuwa zawadi za kusimamisha hazitegemei idadi ya miamala iliyo kwenye kitalu. Zaidi ya hayo, bakshishi huwaruhusu watumiaji kuwazidi wengine zabuni kwa ajili ya kipaumbele ndani ya kitalu kimoja, na hivyo kuashiria uharaka.

### Ada ya juu zaidi {#maxfee}

Ili kutekeleza muamala kwenye mtandao, watumiaji wanaweza kubainisha kiwango cha juu wanachotaka kulipia ili muamala wao utekelezwe. Kigezo hiki cha hiari kinajulikana kama `maxFeePerGas`. Ili muamala utekelezwe, ada ya juu kabisa lazima izidi jumla ya ada ya msingi na ada ya kipaumbele. Mtumaji wa muamala anarudishiwa tofauti kati ya ada ya juu kabisa na jumla ya ada ya msingi na ada ya kipaumbele.

### Ukubwa wa bloku {#block-size}

Kila kitalu kina ukubwa unaolengwa wa nusu ya kikomo cha gesi cha sasa, lakini ukubwa wa vitalu utaongezeka au kupungua kulingana na mahitaji ya mtandao, hadi kikomo cha kitalu kifikiwe (2x ukubwa wa kitalu lengwa). Itifaki hufikia wastani wa ukubwa wa kitalu wa usawa kwenye lengo kupitia mchakato wa _tâtonnement_. Hii inamaanisha ikiwa ukubwa wa kitalu ni mkubwa kuliko ukubwa unaolengwa wa kitalu, itifaki itaongeza ada ya msingi kwa kitalu kinachofuata. Vilevile, itifaki itapunguza ada ya msingi ikiwa ukubwa wa kitalu ni mdogo kuliko ukubwa unaolengwa wa kitalu.

Kiasi ambacho ada ya msingi hurekebishwa ni sawia na umbali ambao ukubwa wa kitalu cha sasa upo kutoka kwenye lengo. Huu ni ukokotoaji wa mstari kutoka -12.5% kwa kitalu tupu, 0% kwenye ukubwa lengwa, hadi +12.5% kwa kitalu kinachofikia kikomo cha gesi. Kikomo cha gesi kinaweza kubadilika-badilika kadri muda unavyopita kulingana na ishara za wathibitishaji, na pia kupitia maboresho ya mtandao. Unaweza [kuona mabadiliko katika kikomo cha gesi kadiri muda unavyopita hapa](https://eth.blockscout.com/stats/averageGasLimit?interval=threeMonths).

[Zaidi kuhusu vitalu](/developers/docs/blocks/)

### Kukokotoa ada za gesi katika vitendo {#calculating-fees-in-practice}

Unaweza kueleza waziwazi ni kiasi gani uko tayari kulipa ili muamala wako utekelezwe. Hata hivyo, watoa huduma wengi wa mkoba huweka moja kwa moja ada ya muamala inayopendekezwa (ada ya msingi + ada ya kipaumbele iliyopendekezwa) ili kupunguza ugumu kwa watumiaji wao.

## Kwa nini ada ya gesi ipo? {#why-do-gas-fees-exist}

Kiufupi, ada ya gesi husaidia kuifanya mtandao wa Ethereum kuwa na ulinzi wa kutosha. Kwa kuhitaji ada kwa kila hesabu inayotekelezwa kwenye mtandao, tunawazuia wahalifu wasijaze mtandao kwa vitu visivyo na maana. Ili kuepuka vitanzi visivyoisha vya bahati mbaya au vya uhasama au upotevu mwingine wa hesabu katika msimbo, kila muamala unahitajika kuweka kikomo cha hatua ngapi za hesabu za utekelezaji wa msimbo unazoweza kutumia. Kitengo cha msingi cha hesabu ni "gesi".

Ingawa muamala unajumuisha kikomo, gesi yoyote isiyotumika katika muamala hurejeshwa kwa mtumiaji (k.m., `ada ya juu zaidi - (ada ya msingi + bakshishi)` hurejeshwa).

![Mchoro unaoonyesha jinsi gesi isiyotumika inavyorejeshwa](../transactions/gas-tx.png)
_Mchoro umechukuliwa kutoka [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Nini ni kiwango cha gesi? {#what-is-gas-limit}

Kikomo cha gesi hurejelea kiwango cha juu cha gesi unachotaka kutumia kwenye muamala. Miamala ngumu zaidi inayohusisha [mikataba-erevu](/developers/docs/smart-contracts/) huhitaji kazi zaidi ya kikokotozi, kwa hivyo huhitaji kikomo cha gesi cha juu zaidi kuliko malipo rahisi. Uhamisho wa kawaida wa ETH unahitaji kikomo cha gesi cha vitengo 21,000.

Kwa mfano, ukiweka kikomo cha gesi cha 50,000 kwa uhamisho rahisi wa ETH, EVM itatumia 21,000, na utarudishiwa 29,000 vilivyobaki. Hata hivyo, ukiweka kiwango kidogo cha gesi, kwa mfano, kikomo cha gesi cha 20,000 kwa uhamisho rahisi wa ETH, muamala utashindikana wakati wa hatua ya uthibitisho. Utakataliwa kabla ya kujumuishwa kwenye kitalu, na hakuna gesi itakayotumiwa. Kwa upande mwingine, ikiwa muamala utaishiwa na gesi wakati wa utekelezaji (kwa mfano, mkataba mahiri unatumia gesi yote katikati ya mchakato), EVM itarudisha mabadiliko yoyote, lakini gesi yote iliyotolewa bado itatumiwa kwa kazi iliyofanywa.

## Kwa nini ada ya gesi inaweza ikawa ya kiwango cha juu? {#why-can-gas-fees-get-so-high}

Ada za juu za gesi zinatokana na umaarufu wa Ethereum. Ikiwa kuna mahitaji mengi mno, watumiaji wanapaswa kutoa kiasi cha juu zaidi cha ada ya kipaumbele ili kujaribu kushinda miamala ya watumiaji wengine. Ada ya kipaumbele ya juu inaweza kufanya muamala wako uwe na uwezekano mkubwa wa kuingia kwenye kitalu kinachofuata. Pia, programu tata zaidi za mikataba mahiri zinaweza kufanya shughuli nyingi kusaidia kazi zao, hivyo kuzifanya zitumie gesi nyingi.

## Mipango ya kupunguza gharama za gesi {#initiatives-to-reduce-gas-costs}

Maboresho ya [kuongeza uwezo](/roadmap/) wa Ethereum hatimaye yanapaswa kushughulikia baadhi ya masuala ya ada za gesi, ambayo, kwa upande wake, yatawezesha jukwaa kuchakata maelfu ya miamala kwa sekunde na kuongezeka kimataifa.

Maboresho ya tabaka la pili ni mpango mkuu wa kuboresha kwa kiasi kikubwa gharama za gesi, uzoefu wa mtumiaji na uwezo wa mtandao.

[Zaidi kuhusu uongezaji wa safu ya 2](/developers/docs/scaling/#layer-2-scaling)

## Ufuatiliaji wa ada za gesi {#monitoring-gas-fees}

Ikiwa ungependa kufuatilia bei za gesi, ili uweze kutuma ETH yako kwa bei nafuu, unaweza kutumia zana nyingi tofauti kama vile:

- [Etherscan](https://etherscan.io/gastracker) _Kikadiriaji bei ya gesi ya muamala_
- [Blockscout](https://eth.blockscout.com/gas-tracker) _Kikadiriaji bei ya gesi ya muamala cha chanzo huria_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _Fuatilia bei za gesi za Ethereum, na safu ya 2 ili kupunguza ada za muamala na kuokoa pesa_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Kiendelezi cha Chrome cha kukadiria gesi kinachoauni miamala ya urithi ya Aina 0 na miamala ya EIP-1559 ya Aina 2._
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Kokotoa ada za gesi katika sarafu ya nchi yako kwa aina tofauti za miamala kwenye Mtandao Mkuu, Arbitrum, na Polygon._

## Zana zinazohusiana {#related-tools}

- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _API ya kukadiria gesi inayoendeshwa na jukwaa la data la mempool la kimataifa la Blocknative_
- [Gas Network](https://gas.network) Orakali za Gesi za Onchain. Inasaidia chaini 35+.

## Masomo zaidi {#further-reading}

- [Gesi ya Ethereum Imefafanuliwa](https://defiprime.com/gas)
- [Kupunguza matumizi ya gesi ya Mikataba-erevu yako](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Mbinu za Uboreshaji wa Gesi kwa Wasanidi Programu](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [Nyaraka za EIP-1559](https://eips.ethereum.org/EIPS/eip-1559).
- [Rasilimali za EIP-1559 za Tim Beiko](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559: Kutenganisha Mbinu na Memes](https://web.archive.org/web/20241126205908/https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)
