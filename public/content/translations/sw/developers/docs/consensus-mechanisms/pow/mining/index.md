---
title: Uchimbaji
description: Maelezo ya jinsi madini yalivyofanya kazi kwenye Ethereum.
lang: sw
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Uthibitisho wa kazi sio msingi tena wa utaratibu wa makubaliano wa Ethereum, kumaanisha uchimbaji umezimwa. Badala yake, Ethereum inalindwa na wathibitishaji ambao wanashiriki ETH. Unaweza kuanza kuweka ETH yako leo. Soma zaidi kwenye <a href='/roadmap/merge/'>The Merge</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>ushahidi-wa-stake</a>, na <a href='/staking/'>staking</a>. Ukurasa huu ni kwa ajili ya maslahi ya kihistoria tu.
</AlertDescription>
</AlertContent>
</Alert>

## Mahitaji ya awali {#prerequisites}

Ili kuelewa ukurasa huu vizuri zaidi, tunapendekeza kwanza usome kuhusu [miamala](/developers/docs/transactions/), [bloku](/developers/docs/blocks/) na [uthibitishaji-wa-kazi](/developers/docs/consensus-mechanisms/pow/).

## Je, madini ya Ethereum ni nini? {#what-is-ethereum-mining}

Uchimbaji madini ni mchakato wa kuunda kitalu cha shughuli za kuongezwa kwenye kiambajengo ya Ethereum katika usanifu wa uthibitisho wa kazi uliopunguzwa wa Ethereum.

Neno madini linatokana na muktadha wa mlinganisho wa dhahabu wa sarafu fiche. Dhahabu au madini ya thamani ni haba, vivyo hivyo ishara za kidijitali, na njia pekee ya kuongeza kiasi cha jumla katika mfumo wa uthibitisho wa kazi ni kupitia uchimbaji madini. Katika Ethereum ya uthibitisho wa kazi, njia pekee ya utoaji ilikuwa kupitia kuchimba. Tofauti na dhahabu au madini ya thamani hata hivyo, madini ya Ethereum pia yalikuwa njia ya kupata mtandao kwa kuunda, kuthibitisha, kuchapisha na kueneza vitalu katika kiambajengo.

Uchimbaji ether = Kulinda Mtandao

Uchimbaji ndio uhai wa kiambajengo chochote cha uthibitisho wa kazi. Wachimba migodi wa Ethereum - kompyuta zinazoendesha programu - walitumia muda wao na nguvu ya kukokotoa kuchakata miamala na kutengeneza vitalu kabla ya mpito hadi uthibitisho wa stake.

## Kwa nini wachimbaji wapo? {#why-do-miners-exist}

Katika mifumo mtawanyo kama vile Ethereum, tunahitaji kuhakikisha kuwa kila mtu anakubali utaratibu wa miamala. Wachimbaji walisaidia hili kutokea kwa kutatua mafumbo magumu kwa hesabu kutengeneza vizuizi, kulinda mtandao dhidi ya mashambulizi.

[Maelezo zaidi kuhusu uthibitishaji-wa-kazi](/developers/docs/consensus-mechanisms/pow/)

Mtu yeyote hapo awali aliweza kuchimba kwenye mtandao wa Ethereum kwa kutumia kompyuta yake. Walakini, sio kila mtu angeweza kuchimba ether (ETH) kwa faida. Katika hali nyingi, wachimbaji walilazimika kununua vifaa maalum vya kompyuta, na kupata vyanzo vya nishati vya bei ghali. Kompyuta ya wastani haikuwezekana kupata zawadi za kutosha za kuzuia kufidia gharama zinazohusiana za uchimbaji.

### Gharama ya uchimbaji {#cost-of-mining}

- Gharama zinazowezekana za vifaa vinavyohitajika kujenga na kudumisha mtambo wa uchimbaji
- Gharama ya umeme ya kuwezesha mtambo wa uchimbaji
- Ikiwa ulikuwa unachimba madini kwenye bwawa, mabwawa haya kwa kawaida yalitoza ada ya % flat ya kila kitalu inayotolewa na bwawa hilo
- Gharama inayowezekana ya vifaa vya kusaidia kifaa cha kuchimba (uingizaji hewa, ufuatiliaji wa nishati, waya za umeme, n. k.)

Ili kuchunguza zaidi faida ya uchimbaji, tumia kikokotoo cha uchimbaji, kama kile kinachotolewa na [Etherscan](https://etherscan.io/ether-mining-calculator).

## Jinsi miamala ya Ethereum ilivyokuwa ikichimbwa {#how-ethereum-transactions-were-mined}

Ifuatayo inatoa muhtasari wa jinsi shughuli zilichimbwa katika uthibitisho wa kazi wa Ethereum. Maelezo yanayofanana ya mchakato huu kwa uthibitisho wa hisa wa Ethereum yanaweza kupatikana [hapa](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos).

1. Mtumiaji huandika na kutia saini ombi la [muamala](/developers/docs/transactions/) kwa ufunguo binafsi wa [akaunti](/developers/docs/accounts/) fulani.
2. Mtumiaji hutangaza ombi la muamala kwa mtandao mzima wa Ethereum kutoka kwa [nodi](/developers/docs/nodes-and-clients/) fulani.
3. Baada ya kusikia juu ya ombi jipya la shughuli, kila nodi katika mtandao wa Ethereum inaongeza ombi kwa mempool yao ya ndani, orodha ya maombi yote ya shughuli ambayo wamesikia kuhusu ambayo bado hayajafanywa kwa kiambajengo katika kitalu.
4. Wakati fulani, nodi ya uchimbaji hujumlisha maombi kadhaa au mamia ya miamala kuwa [bloku](/developers/docs/blocks/) inayowezekana, kwa njia inayoongeza [ada za muamala](/developers/docs/gas/) wanazopata huku ikibaki chini ya kikomo cha gesi cha bloku. Nodi ya madini basi:
   1. Huthibitisha uhalali wa kila ombi la muamala (yaani, hakuna anayejaribu kuhamisha etha kutoka kwa akaunti ambayo hajaitolea saini, ombi halijaharibika, n.k.), na kisha hutekeleza msimbo wa ombi, na kubadilisha hali ya nakala yake ya ndani ya EVM. Mchimbaji hutoa ada ya ununuzi kwa kila ombi kama hilo la ununuzi kwa akaunti yake mwenyewe.
   2. Huanzisha mchakato wa kutoa "cheti cha uhalali" cha uthibitisho wa kazi kwa kizuizi kinachowezekana, mara tu maombi yote ya miamala kwenye vitalu vimethibitishwa na kutekelezwa kwenye nakala ya EVM ya karibu.
5. Hatimaye, mchimbaji atamaliza kutoa cheti cha kizuizi ambacho kinajumuisha ombi letu mahususi la muamala. Kisha mchimbaji hutangaza kitalu kilichokamilika, ambacho kinajumuisha cheti na hundi ya hali mpya ya EVM inayodaiwa.
6. Nodi zingine husikia juu ya kitalu kipya. Wanathibitisha cheti, hutekeleza miamala yote kwenye bloku wenyewe (ikiwa ni pamoja na muamala uliotangazwa awali na mtumiaji wetu), na kuthibitisha kuwa checksum ya hali yao mpya ya EVM baada ya utekelezaji wa miamala yote inalingana na checksum ya hali iliyodaiwa na bloku ya mchimbaji. Ni hapo tu ambapo nodi hizi huambatanisha kitalu hiki kwenye mkia wa kiambajengo yao, na kukubali hali mpya ya EVM kama hali ya kisheria.
7. Kila nodi huondoa miamala yote kwenye kitalu kipya kutoka kwa kumbukumbu zao za ndani za maombi ambayo hayajatekelezwa.
8. Nodi mpya zinazojiunga na mtandao hupakua vitalu vyote kwa mfuatano, ikijumuisha kitalu kilicho na shughuli yetu ya riba. Wanaanzisha nakala ya ndani ya EVM (ambayo huanza kama EVM ya hali tupu), na kisha kupitia mchakato wa kutekeleza kila muamala katika kila kitalu juu ya nakala yao ya ndani ya EVM, kuthibitisha ukaguzi wa serikali katika kila kitalu njiani.

Kila shughuli inachimbwa (imejumuishwa kwenye kitalu kipya na kuenezwa kwa mara ya kwanza) mara moja, lakini inatekelezwa na kuthibitishwa na kila mshiriki katika mchakato wa kuendeleza hali ya kisheria ya EVM. Hii inaangazia moja ya kauli mbiu kuu za mnyororo wa bloku: **Usiamini, thibitisha**.

## Bloku za Ommer (mjomba) {#ommer-blocks}

Uchimbaji vitalu kwenye uthibitisho wa kazi uliwezekana, ikimaanisha kuwa wakati mwingine vitalu viwili halali vilichapishwa kwa wakati mmoja kwa sababu ya muda wa mtandao. Katika hali hii, itifaki ilibidi iamue mnyororo mrefu zaidi (na kwa hivyo "halali") mwingi zaidi huku ikihakikisha usawa kwa wachimbaji kwa kuwazawadia kwa kiasi kitalu halali ambacho hakijajumuishwa kilichopendekezwa. Hii ilihimiza ugatuaji zaidi wa mtandao kwani wachimbaji wadogo, ambao wanaweza kukabiliwa na hali ya kusubiri zaidi, bado wangeweza kupata mapato kupitia zawadi za bloku za [ommer](/glossary/#ommer).

Neno "ommer" ni neno linalopendekezwa lisilopendelea kijinsia kwa kaka wa kitalu mzazi, lakini hii pia wakati mwingine hujulikana kama "mjomba". **Tangu hatua ya Ethereum ya kuhamia kwenye uthibitisho wa hisa, bloku za ommer hazichimbwi tena** kwa kuwa ni mpendekezaji mmoja tu anayechaguliwa katika kila yanayopangwa. Unaweza kuona mabadiliko haya kwa kutazama [chati ya kihistoria](https://ycharts.com/indicators/ethereum_uncle_rate) ya bloku za ommer zilizochimbwa.

## Onyesho la picha {#a-visual-demo}

Tazama Austin akikutembeza kwenye uchimbaji na uthibitisho wa kazi-kiambajengo.

<YouTube id="zcX7OJ-L8XQ" />

## Algorithm ya uchimbaji {#mining-algorithm}

Mtandao Mkuu wa Ethereum ulitumia algorithm moja tu ya uchimbaji - ['Ethash'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Ethash ilikuwa mrithi wa algorithm ya awali ya R&D iliyojulikana kama ['Dagger-Hashimoto'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/).

[Maelezo zaidi kuhusu algorithm za uchimbaji](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Mada zinazohusiana {#related-topics}

- [Gesi](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Uthibitisho wa kazi](/developers/docs/consensus-mechanisms/pow/)
