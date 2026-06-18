---
title: Uchimbaji
description: Maelezo ya jinsi uchimbaji ulivyofanya kazi kwenye Ethereum.
lang: sw
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Uthibitisho wa kazi (PoW) sio tena msingi wa utaratibu wa makubaliano wa Ethereum, ikimaanisha uchimbaji umezimwa. Badala yake, [Ethereum](/) inalindwa na wathibitishaji wanaoweka dhamana ya ETH. Unaweza kuanza kuweka dhamana ya ETH yako leo. Soma zaidi kuhusu <a href='/roadmap/merge/'>Unganisho</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>uthibitisho wa dau</a>, na <a href='/staking/'>uwekaji dhamana</a>. Ukurasa huu ni kwa ajili ya historia tu.
</AlertDescription>
</AlertContent>
</Alert>

## Mahitaji ya Awali {#prerequisites}

Ili kuelewa vyema ukurasa huu, tunapendekeza usome kwanza kuhusu [miamala](/developers/docs/transactions/), [vitalu](/developers/docs/blocks/) na [uthibitisho wa kazi](/developers/docs/consensus-mechanisms/pow/).

## Uchimbaji wa Ethereum ni nini? {#what-is-ethereum-mining}

Uchimbaji ni mchakato wa kuunda kitalu cha miamala kitakachoongezwa kwenye mnyororo wa vitalu wa Ethereum katika usanifu wa uthibitisho wa kazi wa Ethereum uliopitwa na wakati.

Neno uchimbaji linatokana na muktadha wa mlinganisho wa dhahabu kwa sarafu za siri. Dhahabu au metali za thamani ni adimu, vivyo hivyo na tokeni za kidijitali, na njia pekee ya kuongeza kiasi cha jumla katika mfumo wa uthibitisho wa kazi ni kupitia uchimbaji. Katika uthibitisho wa kazi wa Ethereum, njia pekee ya utoaji ilikuwa kupitia uchimbaji. Hata hivyo, tofauti na dhahabu au metali za thamani, uchimbaji wa Ethereum pia ulikuwa njia ya kulinda mtandao kwa kuunda, kuthibitisha, kuchapisha na kusambaza vitalu katika mnyororo wa vitalu.

Kuchimba Etha = Kulinda Mtandao

Uchimbaji ni uhai wa mnyororo wa vitalu wowote wa uthibitisho wa kazi. Wachimbaji wa Ethereum - kompyuta zinazoendesha programu - walitumia muda wao na nguvu ya kompyuta kuchakata miamala na kuzalisha vitalu kabla ya mpito kwenda kwenye uthibitisho wa dau.

## Kwa nini wachimbaji wapo? {#why-do-miners-exist}

Katika mifumo iliyogatuliwa kama Ethereum, tunahitaji kuhakikisha kwamba kila mtu anakubaliana juu ya mpangilio wa miamala. Wachimbaji walisaidia hili kufanyika kwa kutatua mafumbo magumu ya kikompyuta ili kuzalisha vitalu, na kulinda mtandao dhidi ya mashambulizi.

[Zaidi kuhusu uthibitisho wa kazi](/developers/docs/consensus-mechanisms/pow/)

Hapo awali, mtu yeyote aliweza kuchimba kwenye mtandao wa Ethereum akitumia kompyuta yake. Hata hivyo, si kila mtu angeweza kuchimba Etha (ETH) kwa faida. Katika hali nyingi, wachimbaji walilazimika kununua vifaa maalum vya kompyuta, na kuwa na ufikiaji wa vyanzo vya nishati vya bei nafuu. Kompyuta ya kawaida haikuwa na uwezekano wa kupata tuzo za kitalu za kutosha kufidia gharama zinazohusiana na uchimbaji.

### Gharama ya uchimbaji {#cost-of-mining}

- Gharama zinazowezekana za vifaa vinavyohitajika kujenga na kudumisha mtambo wa kuchimba
- Gharama ya umeme ya kuendesha mtambo wa kuchimba
- Ikiwa ulikuwa unachimba kwenye bwawa, mabwawa haya kwa kawaida yalitoza asilimia maalum ya ada ya kila kitalu kilichozalishwa na bwawa
- Gharama zinazowezekana za vifaa vya kusaidia mtambo wa kuchimba (uingizaji hewa, ufuatiliaji wa nishati, nyaya za umeme, n.k.)

Ili kuchunguza zaidi faida ya uchimbaji, tumia kikokotoo cha uchimbaji, kama kile kinachotolewa na [Etherscan](https://etherscan.io/ether-mining-calculator).

## Jinsi miamala ya Ethereum ilivyochimbwa {#how-ethereum-transactions-were-mined}

Ifuatayo inatoa muhtasari wa jinsi miamala ilivyochimbwa katika uthibitisho wa kazi wa Ethereum. Maelezo yanayofanana ya mchakato huu kwa uthibitisho wa dau wa Ethereum yanaweza kupatikana [hapa](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos).

1. Mtumiaji anaandika na kutia sahihi ombi la [muamala](/developers/docs/transactions/) kwa kutumia ufunguo wa siri wa [akaunti](/developers/docs/accounts/) fulani.
2. Mtumiaji anatangaza ombi la muamala kwa mtandao mzima wa Ethereum kutoka kwenye [nodi](/developers/docs/nodes-and-clients/) fulani.
3. Baada ya kusikia kuhusu ombi jipya la muamala, kila nodi katika mtandao wa Ethereum huongeza ombi hilo kwenye mempool yao ya ndani, orodha ya maombi yote ya miamala waliyosikia ambayo bado hayajawekwa kwenye mnyororo wa vitalu katika kitalu.
4. Wakati fulani, nodi ya kuchimba inakusanya makumi au mamia ya maombi ya miamala kuwa [kitalu](/developers/docs/blocks/) kinachowezekana, kwa njia inayoongeza [ada za muamala](/developers/docs/gas/) wanazopata huku wakiendelea kubaki chini ya kikomo cha gesi cha kitalu. Kisha nodi ya kuchimba:
   1. Inathibitisha uhalali wa kila ombi la muamala (yaani, hakuna anayejaribu kufanya hamisho la Etha kutoka kwenye akaunti ambayo hawajatoa sahihi yake, ombi halijaharibika, n.k.), na kisha inatekeleza msimbo wa ombi, ikibadilisha hali ya nakala yao ya ndani ya EVM. Mchimbaji anajipa ada ya muamala kwa kila ombi la muamala kama hilo kwenye akaunti yake mwenyewe.
   2. Inaanza mchakato wa kuzalisha "cheti cha uhalali" cha uthibitisho wa kazi kwa kitalu kinachowezekana, mara tu maombi yote ya miamala katika kitalu yamehakikiwa na kutekelezwa kwenye nakala ya ndani ya EVM.
5. Hatimaye, mchimbaji atamaliza kuzalisha cheti cha kitalu ambacho kinajumuisha ombi letu maalum la muamala. Kisha mchimbaji anatangaza kitalu kilichokamilika, ambacho kinajumuisha cheti na checksum ya hali mpya ya EVM inayodaiwa.
6. Nodi zingine zinasikia kuhusu kitalu kipya. Zinathibitisha cheti, zinatekeleza miamala yote kwenye kitalu zenyewe (ikiwa ni pamoja na muamala uliotangazwa awali na mtumiaji wetu), na kuthibitisha kwamba checksum ya hali yao mpya ya EVM baada ya utekelezaji wa miamala yote inalingana na checksum ya hali inayodaiwa na kitalu cha mchimbaji. Hapo ndipo nodi hizi huongeza kitalu hiki kwenye mkia wa mnyororo wao wa vitalu, na kukubali hali mpya ya EVM kama hali rasmi.
7. Kila nodi inaondoa miamala yote katika kitalu kipya kutoka kwenye mempool yao ya ndani ya maombi ya miamala ambayo hayajatimizwa.
8. Nodi mpya zinazojiunga na mtandao zinapakua vitalu vyote kwa mfuatano, ikiwa ni pamoja na kitalu chenye muamala wetu tunaoujali. Zinaanzisha nakala ya ndani ya EVM (ambayo inaanza kama EVM yenye hali tupu), na kisha kupitia mchakato wa kutekeleza kila muamala katika kila kitalu juu ya nakala yao ya ndani ya EVM, zikithibitisha checksums za hali katika kila kitalu njiani.

Kila muamala unachimbwa (kujumuishwa katika kitalu kipya na kusambazwa kwa mara ya kwanza) mara moja, lakini unatekelezwa na kuthibitishwa na kila mshiriki katika mchakato wa kuendeleza hali rasmi ya EVM. Hili linaangazia mojawapo ya kauli mbiu kuu za mnyororo wa vitalu: **Usiamini, thibitisha**.

## Vitalu vya Ommer (mjomba) {#ommer-blocks}

Uchimbaji wa vitalu kwenye uthibitisho wa kazi ulikuwa wa kubahatisha, ikimaanisha wakati mwingine vitalu viwili halali vilichapishwa kwa wakati mmoja kutokana na ucheleweshaji wa mtandao. Katika hali hii, itifaki ilibidi kuamua mnyororo mrefu zaidi (na kwa hivyo "halali" zaidi) huku ikihakikisha usawa kwa wachimbaji kwa kutoa tuzo kiasi kwa kitalu halali kilichopendekezwa ambacho hakikujumuishwa. Hili lilihamasisha ugatuzi zaidi wa mtandao kwani wachimbaji wadogo, ambao wanaweza kukabiliwa na ucheleweshaji mkubwa, bado wangeweza kuzalisha faida kupitia tuzo za [kitalu cha Ommer](/glossary/#ommer).

Neno "ommer" ni neno linalopendelewa lisiloegemea jinsia kwa ndugu wa kitalu mzazi, lakini hili pia wakati mwingine hujulikana kama "mjomba" (uncle). **Tangu Ethereum ihamie kwenye uthibitisho wa dau, vitalu vya Ommer havichimbwi tena** kwani mpendekezaji mmoja tu ndiye anayechaguliwa katika kila sloti. Unaweza kuona mabadiliko haya kwa kutazama [chati ya kihistoria](https://ycharts.com/indicators/ethereum_uncle_rate) ya vitalu vya Ommer vilivyochimbwa.

## Onyesho la kuona {#a-visual-demo}

Tazama Austin akikupitisha kwenye uchimbaji na mnyororo wa vitalu wa uthibitisho wa kazi.

<VideoWatch slug="blockchain-eth-build" />

## Algoriti ya uchimbaji {#mining-algorithm}

Mtandao Mkuu wa Ethereum ulitumia algoriti moja tu ya uchimbaji - ['Ethash'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Ethash ilikuwa mrithi wa algoriti ya asili ya R&D iliyojulikana kama ['Dagger-Hashimoto'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/).

[Zaidi kuhusu algoriti za uchimbaji](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Mada zinazohusiana {#related-topics}

- [Gesi](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Uthibitisho wa kazi](/developers/docs/consensus-mechanisms/pow/)