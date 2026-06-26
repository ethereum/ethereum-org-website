---
title: Gesi na ada
metaTitle: "Gesi na ada za Ethereum: muhtasari wa kiufundi"
description: Jifunze kuhusu ada za gesi za Ethereum, jinsi zinavyokokotolewa, na jukumu lake katika usalama wa mtandao na uchakataji wa miamala.
lang: sw
---

Gesi ni muhimu kwa mtandao wa [Ethereum](/). Ni mafuta yanayouwezesha kufanya kazi, kwa njia sawa na ambayo gari linahitaji petroli ili kwenda.

## Mahitaji ya awali {#prerequisites}

Ili kuelewa vyema ukurasa huu, tunapendekeza usome kwanza kuhusu [miamala](/developers/docs/transactions/) na [EVM](/developers/docs/evm/).

## Gesi ni nini? {#what-is-gas}

Gesi inarejelea kipimo kinachopima kiasi cha juhudi za kikokotozi kinachohitajika kutekeleza shughuli mahususi kwenye mtandao wa Ethereum.

Kwa kuwa kila muamala wa Ethereum unahitaji rasilimali za kikokotozi ili kutekelezwa, rasilimali hizo lazima zilipiwe ili kuhakikisha Ethereum haishambuliwi na taka na haiwezi kukwama katika mizunguko isiyo na kikomo ya kikokotozi. Malipo ya ukokotoaji hufanywa kwa njia ya ada ya gesi.

Ada ya gesi ni **kiasi cha gesi kinachotumika kufanya operesheni fulani, kikizidishwa na gharama kwa kila uniti ya gesi**. Ada hulipwa bila kujali kama muamala umefaulu au umeshindwa.

![A diagram showing where gas is needed in EVM operations](./gas.png)
_Mchoro umechukuliwa kutoka [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Ada za gesi lazima zilipwe kwa sarafu ya asili ya Ethereum, Etha (ETH). Bei za gesi kwa kawaida hunukuliwa kwa Gwei, ambayo ni kigawanyo cha ETH. Kila Gwei ni sawa na sehemu moja ya bilioni ya ETH (0.000000001 ETH au 10<sup>-9</sup> ETH).

Kwa mfano, badala ya kusema kwamba gesi yako inagharimu Etha 0.000000001, unaweza kusema gesi yako inagharimu Gwei 1.

Neno 'Gwei' ni ufupisho wa 'giga-wei', ikimaanisha 'Wei bilioni'. Gwei moja ni sawa na Wei bilioni moja. Wei yenyewe (iliyopewa jina la [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), muundaji wa [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) ni uniti ndogo zaidi ya ETH.

## Ada za gesi zinakokotolewa vipi? {#how-are-gas-fees-calculated}

Unaweza kuweka kiasi cha gesi ambacho uko tayari kulipa unapowasilisha muamala. Kwa kutoa kiasi fulani cha gesi, unashindania muamala wako ujumuishwe kwenye kitalu kinachofuata. Ukitoa kiasi kidogo sana, wathibitishaji wana uwezekano mdogo wa kuchagua muamala wako ili ujumuishwe, ikimaanisha muamala wako unaweza kutekelezwa kwa kuchelewa au usitekelezwe kabisa. Ukitoa kiasi kikubwa sana, unaweza kupoteza ETH. Kwa hivyo, unawezaje kujua kiasi cha kulipa?

Jumla ya gesi unayolipa imegawanywa katika vipengele viwili: `base fee` na `priority fee` (ada ya kipaumbele).

`base fee` huwekwa na itifaki—lazima ulipe angalau kiasi hiki ili muamala wako uchukuliwe kuwa halali. `priority fee` ni ada ya kipaumbele unayoongeza kwenye ada ya msingi ili kufanya muamala wako uvutie kwa wathibitishaji ili wauchague kwa ajili ya kujumuishwa kwenye kitalu kinachofuata.

Muamala unaolipa tu `base fee` ni halali kiufundi lakini hauna uwezekano wa kujumuishwa kwa sababu hautoi motisha kwa wathibitishaji kuuchagua badala ya muamala mwingine wowote. Ada 'sahihi' ya `priority` inabainishwa na matumizi ya mtandao wakati unapotuma muamala wako—kama kuna mahitaji mengi basi unaweza kulazimika kuweka ada yako ya `priority` kuwa juu zaidi, lakini wakati kuna mahitaji machache unaweza kulipa kidogo.

Kwa mfano, tuseme Jordan anapaswa kumlipa Taylor ETH 1. Hamisho la ETH linahitaji uniti 21,000 za gesi, na ada ya msingi ni Gwei 10. Jordan anajumuisha ada ya kipaumbele ya Gwei 2.

Jumla ya ada sasa itakuwa sawa na:

`units of gas used * (base fee + priority fee)`

ambapo `base fee` ni thamani iliyowekwa na itifaki na `priority fee` ni thamani iliyowekwa na mtumiaji kama ada ya kipaumbele kwa mthibitishaji.

k.m., `21,000 * (10 + 2) = 252,000 gwei` (0.000252 ETH).

Wakati Jordan anatuma pesa, ETH 1.000252 itakatwa kutoka kwenye akaunti ya Jordan. Taylor atawekewa ETH 1.0000. Mthibitishaji anapokea ada ya kipaumbele ya ETH 0.000042. `base fee` ya ETH 0.00021 inachomwa.

### Ada ya msingi {#base-fee}

Kila kitalu kina ada ya msingi ambayo hufanya kazi kama bei ya akiba. Ili kustahiki kujumuishwa kwenye kitalu, bei inayotolewa kwa kila gesi lazima angalau ilingane na ada ya msingi. Ada ya msingi inakokotolewa bila kutegemea kitalu cha sasa na badala yake inabainishwa na vitalu vilivyotangulia, na kufanya ada za muamala kutabirika zaidi kwa watumiaji. Kitalu kinapoundwa **ada hii ya msingi "inachomwa"**, na kuiondoa kwenye mzunguko.

Ada ya msingi inakokotolewa kwa fomula inayolinganisha ukubwa wa kitalu kilichotangulia (kiasi cha gesi kilichotumika kwa miamala yote) na ukubwa unaolengwa (nusu ya kikomo cha gesi). Ada ya msingi itaongezeka au kupungua kwa kiwango cha juu cha 12.5% kwa kila kitalu ikiwa ukubwa wa kitalu unaolengwa uko juu au chini ya lengo, mtawalia. Ukuaji huu wa kielelezo hufanya isiwezekane kiuchumi kwa ukubwa wa kitalu kubaki juu kwa muda usiojulikana.

| Nambari ya Kitalu | Gesi Iliyojumuishwa | Ongezeko la Ada | Ada ya Msingi ya Sasa |
| ------------ | -----------: | -----------: | ---------------: |
| 1            |          18M |           0% |         100 gwei |
| 2            |          36M |           0% |         100 gwei |
| 3            |          36M |        12.5% |       112.5 gwei |
| 4            |          36M |        12.5% |       126.6 gwei |
| 5            |          36M |        12.5% |       142.4 gwei |
| 6            |          36M |        12.5% |       160.2 gwei |
| 7            |          36M |        12.5% |       180.2 gwei |
| 8            |          36M |        12.5% |       202.7 gwei |

Katika jedwali hapo juu, mfano unaonyeshwa kwa kutumia milioni 36 kama kikomo cha gesi. Kufuatia mfano huu, ili kuunda muamala kwenye kitalu nambari 9, mkoba utamjulisha mtumiaji kwa uhakika kwamba **ada ya juu zaidi ya msingi** itakayoongezwa kwenye kitalu kinachofuata ni `current base fee * 112.5%` au `202.7 gwei * 112.5% = 228.1 gwei`.

Pia ni muhimu kutambua kuwa hakuna uwezekano wa kuona ongezeko la muda mrefu la vitalu vilivyojaa kwa sababu ya kasi ambayo ada ya msingi huongezeka kabla ya kitalu kujaa.

| Nambari ya Kitalu | Gesi Iliyojumuishwa | Ongezeko la Ada | Ada ya Msingi ya Sasa |
| ------------ | -----------: | -----------: | ---------------: |
| 30           |          36M |        12.5% |      2705.6 gwei |
| ...          |          ... |        12.5% |              ... |
| 50           |          36M |        12.5% |     28531.3 gwei |
| ...          |          ... |        12.5% |              ... |
| 100          |          36M |        12.5% |  10302608.6 gwei |

### Ada ya kipaumbele {#priority-fee}

Ada ya kipaumbele inawapa motisha wathibitishaji kuongeza idadi ya miamala kwenye kitalu, ikizuiliwa tu na kikomo cha gesi cha kitalu. Bila ada za kipaumbele, mthibitishaji mwenye mantiki angeweza kujumuisha miamala michache—au hata sifuri—bila adhabu yoyote ya moja kwa moja ya tabaka la utekelezaji au tabaka la mwafaka, kwa kuwa zawadi za uwekaji dhamana hazitegemei idadi ya miamala iliyo kwenye kitalu. Zaidi ya hayo, ada za kipaumbele huwaruhusu watumiaji kushinda wengine kwa kipaumbele ndani ya kitalu kile kile, kuashiria udharura kwa ufanisi. 

### Ada ya juu zaidi {#maxfee}

Ili kutekeleza muamala kwenye mtandao, watumiaji wanaweza kubainisha kikomo cha juu zaidi ambacho wako tayari kulipa ili muamala wao utekelezwe. Kigezo hiki cha hiari kinajulikana kama `maxFeePerGas`. Ili muamala utekelezwe, ada ya juu zaidi lazima izidi jumla ya ada ya msingi na ada ya kipaumbele. Mtumaji wa muamala anarejeshewa tofauti kati ya ada ya juu zaidi na jumla ya ada ya msingi na ada ya kipaumbele.

### Ukubwa wa kitalu {#block-size}

Kila kitalu kina ukubwa unaolengwa wa nusu ya kikomo cha gesi cha sasa, lakini ukubwa wa vitalu utaongezeka au kupungua kulingana na mahitaji ya mtandao, hadi kikomo cha kitalu kifikiwe (mara 2 ya ukubwa wa kitalu unaolengwa). Itifaki hufikia wastani wa ukubwa wa kitalu ulio sawa kwenye lengo kupitia mchakato wa _tâtonnement_. Hii inamaanisha ikiwa ukubwa wa kitalu ni mkubwa kuliko ukubwa wa kitalu unaolengwa, itifaki itaongeza ada ya msingi kwa kitalu kinachofuata. Vile vile, itifaki itapunguza ada ya msingi ikiwa ukubwa wa kitalu ni mdogo kuliko ukubwa wa kitalu unaolengwa.

Kiasi ambacho ada ya msingi inarekebishwa kinalingana na jinsi ukubwa wa kitalu cha sasa ulivyo mbali na lengo. Huu ni ukokotoaji wa mstari kutoka -12.5% kwa kitalu tupu, 0% kwenye ukubwa unaolengwa, hadi +12.5% kwa kitalu kinachofikia kikomo cha gesi. Kikomo cha gesi kinaweza kubadilika kadiri muda unavyopita kulingana na uashiriaji wa mthibitishaji, pamoja na kupitia uboreshaji wa mtandao. Unaweza [kutazama mabadiliko katika kikomo cha gesi kadiri muda unavyopita hapa](https://eth.blockscout.com/stats/averageGasLimit?interval=threeMonths).

[Zaidi kuhusu vitalu](/developers/docs/blocks/)

### Kukokotoa ada za gesi katika vitendo {#calculating-fees-in-practice}

Unaweza kueleza waziwazi kiasi ambacho uko tayari kulipa ili muamala wako utekelezwe. Hata hivyo, watoa huduma wengi wa mikoba wataweka kiotomatiki ada ya muamala inayopendekezwa (ada ya msingi + ada ya kipaumbele inayopendekezwa) ili kupunguza kiasi cha utata kinachowekwa kwa watumiaji wao.

## Kwa nini ada za gesi zipo? {#why-do-gas-fees-exist}

Kwa ufupi, ada za gesi husaidia kuweka mtandao wa Ethereum salama. Kwa kuhitaji ada kwa kila ukokotoaji unaotekelezwa kwenye mtandao, tunazuia watendaji wabaya kutuma taka kwenye mtandao. Ili kuepuka mizunguko isiyo na kikomo ya bahati mbaya au ya uhasama au upotevu mwingine wa kikokotozi katika msimbo, kila muamala unahitajika kuweka kikomo cha hatua ngapi za kikokotozi za utekelezaji wa msimbo unaweza kutumia. Uniti ya msingi ya ukokotoaji ni "gesi".

Ingawa muamala unajumuisha kikomo, gesi yoyote ambayo haijatumika katika muamala inarejeshwa kwa mtumiaji (k.m., `max fee - (base fee + tip)` inarejeshwa).

![Diagram showing how unused gas is refunded](../transactions/gas-tx.png)
_Mchoro umechukuliwa kutoka [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Kikomo cha gesi ni nini? {#what-is-gas-limit}

Kikomo cha gesi kinarejelea kiasi cha juu zaidi cha gesi ambacho uko tayari kutumia kwenye muamala. Miamala ngumu zaidi inayohusisha [mikataba mahiri](/developers/docs/smart-contracts/) inahitaji kazi zaidi ya kikokotozi, kwa hivyo inahitaji kikomo cha juu zaidi cha gesi kuliko malipo rahisi. Hamisho la kawaida la ETH linahitaji kikomo cha gesi cha uniti 21,000 za gesi.

Kwa mfano, ukiweka kikomo cha gesi cha 50,000 kwa hamisho rahisi la ETH, EVM itatumia 21,000, na utarudishiwa 29,000 zilizosalia. Hata hivyo, ukibainisha gesi kidogo sana, kwa mfano, kikomo cha gesi cha 20,000 kwa hamisho rahisi la ETH, muamala utashindwa wakati wa awamu ya uthibitishaji. Utakataliwa kabla ya kujumuishwa kwenye kitalu, na hakuna gesi itakayotumika. Kwa upande mwingine, ikiwa muamala utaishiwa na gesi wakati wa utekelezaji (k.m., mkataba mahiri unatumia gesi yote katikati), EVM itatengua mabadiliko yoyote, lakini gesi yote iliyotolewa bado itatumika kwa kazi iliyofanywa.

## Kwa nini ada za gesi zinaweza kuwa juu sana? {#why-can-gas-fees-get-so-high}

Ada za juu za gesi zinatokana na umaarufu wa Ethereum. Ikiwa kuna mahitaji mengi sana, watumiaji lazima watoe kiasi cha juu zaidi cha ada ya kipaumbele ili kujaribu kushinda miamala ya watumiaji wengine. Ada ya kipaumbele ya juu zaidi inaweza kufanya iwezekane zaidi kwamba muamala wako utaingia kwenye kitalu kinachofuata. Pia, programu ngumu zaidi za mkataba mahiri zinaweza kuwa zinafanya operesheni nyingi ili kusaidia utendaji wao, na kuzifanya zitumie gesi nyingi.

## Mipango ya kupunguza gharama za gesi {#initiatives-to-reduce-gas-costs}

[Uboreshaji wa uwezo wa kuongezeka](/roadmap/) wa Ethereum unapaswa hatimaye kushughulikia baadhi ya masuala ya ada ya gesi, ambayo, kwa upande wake, itawezesha jukwaa kuchakata maelfu ya miamala kwa sekunde na kuongezeka ulimwenguni kote.

Uongezaji wa tabaka la 2 (l2) ni mpango wa msingi wa kuboresha sana gharama za gesi, uzoefu wa mtumiaji na uwezo wa kuongezeka.

[Zaidi kuhusu uongezaji wa tabaka la 2 (l2)](/developers/docs/scaling/#layer-2-scaling)

## Kufuatilia ada za gesi {#monitoring-gas-fees}

Ikiwa unataka kufuatilia bei za gesi, ili uweze kutuma ETH yako kwa bei nafuu, unaweza kutumia zana nyingi tofauti kama vile:

- [Etherscan](https://etherscan.io/gastracker) _Kikadiriaji cha bei ya gesi ya muamala_
- [Blockscout](https://eth.blockscout.com/gas-tracker) _Kikadiriaji cha bei ya gesi ya muamala cha chanzo wazi_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _Fuatilia na ufuatilie bei za gesi za Ethereum, na L2 ili kupunguza ada za muamala na kuokoa pesa_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Kiendelezi cha Chrome cha kukadiria gesi kinachoauni miamala ya urithi ya Aina ya 0 na miamala ya Aina ya 2 ya EIP-1559._
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Kokotoa ada za gesi katika sarafu yako ya ndani kwa aina tofauti za miamala kwenye Mtandao Mkuu, Arbitrum, na Polygon._

## Zana zinazohusiana {#related-tools}

- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _API ya ukadiriaji wa gesi inayoendeshwa na jukwaa la data la mempool la kimataifa la Blocknative_
- [Gas Network](https://gas.network) Oracles za Gesi za Mnyororoni. Usaidizi kwa misururu 35+. 

## Usomaji zaidi {#further-reading}

- [Gesi ya Ethereum Imefafanuliwa](https://defiprime.com/gas)
- [Kupunguza matumizi ya gesi ya Mikataba yako Mahiri](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Mikakati ya Matumizi Bora ya Gesi kwa Wasanidi Programu](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [Nyaraka za EIP-1559](https://eips.ethereum.org/EIPS/eip-1559).
- [Rasilimali za EIP-1559 za Tim Beiko](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559: Kutenganisha Taratibu na Meme](https://web.archive.org/web/20241126205908/https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)