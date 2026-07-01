---
title: Pectra
metaTitle: Prague-Electra (Pectra)
description: Jifunze kuhusu sasisho la itifaki ya Pectra
lang: sw
authors: ["Nixo", "Mario Havel"]
---

Sasisho la mtandao la Pectra lilifuata [Dencun](/roadmap/dencun/) na kuleta mabadiliko kwenye tabaka la utekelezaji na tabaka la mwafaka la Ethereum. Jina lililofupishwa la Pectra ni muunganiko wa Prague na Electra, ambayo ni majina husika ya mabadiliko ya vipimo vya tabaka la utekelezaji na tabaka la mwafaka. Pamoja, mabadiliko haya yanaleta maboresho kadhaa kwa watumiaji, wasanidi na wathibitishaji wa [Ethereum](/).

Sasisho hili liliwezeshwa kwa mafanikio kwenye Mtandao Mkuu wa Ethereum katika kipindi cha `364032`, mnamo **07-Mei-2025 saa 10:05 (UTC)**.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Sasisho la Pectra ni hatua moja tu katika malengo ya muda mrefu ya maendeleo ya Ethereum. Jifunze zaidi kuhusu [ramani ya njia ya itifaki](/roadmap/) na [masasisho yaliyopita](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Maboresho katika Pectra {#new-improvements}

Pectra inaleta idadi kubwa zaidi ya [EIPs](https://eips.ethereum.org/) kuliko masasisho yoyote yaliyopita! Kuna mabadiliko mengi madogo lakini pia baadhi ya vipengele vipya muhimu. Orodha kamili ya mabadiliko na maelezo ya kiufundi inaweza kupatikana katika EIPs binafsi zilizojumuishwa.

### Msimbo wa akaunti ya EOA {#7702}

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) inawakilisha hatua kubwa kuelekea [udhanifu wa akaunti](/roadmap/account-abstraction/) ulioenea. Kwa kipengele hiki, watumiaji wanaweza kuweka anwani zao ([EOA](/glossary/#eoa)) kupanuliwa na mkataba mahiri. EIP inatambulisha aina mpya ya muamala yenye kazi maalum - kuruhusu wamiliki wa anwani kusaini idhini inayoweka anwani zao kuiga mkataba mahiri uliochaguliwa. 

Kwa EIP hii, watumiaji wanaweza kuchagua kutumia pochi zinazoweza kupangwa ambazo zinaruhusu vipengele vipya kama vile kuunganisha miamala, kufanya miamala bila gesi na ufikiaji maalum wa rasilimali kwa mipango mbadala ya urejeshaji. Mbinu hii ya mseto inachanganya urahisi wa EOAs na uwezo wa kupangwa wa akaunti zinazotegemea mkataba. 

Soma uchunguzi wa kina kuhusu 7702 [hapa](/roadmap/pectra/7702/)

### Kuongeza salio tendaji la juu zaidi {#7251}

Salio tendaji la sasa la mthibitishaji ni ETH 32 kamili. Ni kiasi cha chini kinachohitajika kushiriki katika mwafaka lakini wakati huo huo ni kiasi cha juu zaidi ambacho mthibitishaji mmoja anaweza kuweka dhamana.

[EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) inaongeza salio tendaji la juu zaidi linalowezekana hadi ETH 2048, ikimaanisha kuwa mthibitishaji mmoja sasa anaweza kuweka dhamana kati ya ETH 32 na 2048. Badala ya vigawe vya 32, waweka dhamana sasa wanaweza kuchagua kiasi chochote cha ETH kuweka dhamana na kupokea tuzo kwa kila ETH 1 iliyo juu ya kiasi cha chini. Kwa mfano, ikiwa salio la mthibitishaji linakua na tuzo zake hadi ETH 33, ETH 1 ya ziada pia inachukuliwa kuwa sehemu ya salio tendaji na inapokea tuzo.

Lakini faida ya mfumo bora wa tuzo kwa wathibitishaji ni sehemu tu ya uboreshaji huu. [Waweka dhamana](/staking/) wanaoendesha wathibitishaji wengi sasa wanaweza kuwajumuisha kuwa mmoja, jambo ambalo linawezesha uendeshaji rahisi na kupunguza mzigo wa mtandao. Kwa sababu kila mthibitishaji katika Mnyororo wa Beacon anawasilisha sahihi katika kila kipindi, mahitaji ya kipimo data yanakua na wathibitishaji wengi na idadi kubwa ya sahihi za kusambaza. Kujumuisha wathibitishaji kutapunguza mzigo kwenye mtandao na kufungua chaguzi mpya za kuongeza ukubwa huku kudumisha usalama ule ule wa kiuchumi.

Soma uchunguzi wa kina kuhusu MaxEB [hapa](/roadmap/pectra/maxeb/)

### Ongezeko la uwezo wa upitishaji wa blobu {#7691}

Mablobu hutoa [upatikanaji wa data](/developers/docs/data-availability/#data-availability-and-layer-2-rollups) kwa L2s. Yalianzishwa katika [sasisho la mtandao lililopita](/roadmap/dencun/). 

Kwa sasa, mtandao unalenga wastani wa mablobu 3 kwa kila kitalu na kiwango cha juu cha mablobu 6. Kwa [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691), wastani wa idadi ya mablobu utaongezwa hadi 6, na kiwango cha juu cha 9 kwa kila kitalu, na kusababisha ongezeko la uwezo kwa mikusanyiko ya Ethereum. EIP hii inasaidia kuziba pengo hadi [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) iwezeshe idadi kubwa zaidi ya mablobu.

### Kuongeza gharama ya data za mwito {#7623}

Kabla ya kuanzishwa kwa [mablobu katika sasisho la Dencun](/roadmap/danksharding), L2s zilikuwa zikitumia [data za mwito](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata) kuhifadhi data zao katika Ethereum. Mablobu na data za mwito zote zinaathiri matumizi ya kipimo data cha Ethereum. Ingawa vitalu vingi hutumia kiasi kidogo tu cha data za mwito, vitalu vyenye data nyingi ambavyo pia vina mablobu mengi vinaweza kudhuru mtandao wa p2p wa Ethereum. 

Ili kushughulikia hili, [EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) inaongeza bei ya data za mwito, lakini tu kwa miamala yenye data nyingi. Hii inaweka kikomo cha ukubwa wa kitalu katika hali mbaya zaidi, inatoa motisha kwa L2s kutumia mablobu pekee na kuacha zaidi ya 99% ya miamala bila kuathiriwa.

### Kujitoa kunakoweza kuanzishwa na tabaka la utekelezaji {#7002}

Kwa sasa, kujitoa kwa mthibitishaji na [kuondoa ETH iliyowekwa dhamana](/staking/withdrawals/) ni operesheni ya tabaka la mwafaka inayohitaji ufunguo amilifu wa mthibitishaji, ufunguo ule ule wa BLS unaotumiwa na mthibitishaji kufanya majukumu amilifu kama vile uthibitisho. Vitambulisho vya uondoaji ni ufunguo baridi tofauti unaopokea dhamana iliyotolewa lakini hauwezi kuanzisha kujitoa. Njia pekee kwa waweka dhamana kujitoa ni kutuma ujumbe maalum kwenye mtandao wa Mnyororo wa Beacon uliosainiwa kwa kutumia ufunguo amilifu wa mthibitishaji. Hili linaweka kikomo katika matukio ambapo vitambulisho vya uondoaji na ufunguo wa mthibitishaji vinashikiliwa na vyombo tofauti au wakati ufunguo wa mthibitishaji unapopotea.

[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) inatambulisha mkataba mpya unaoweza kutumika kuanzisha kujitoa kwa kutumia vitambulisho vya uondoaji vya tabaka la utekelezaji. Waweka dhamana wataweza kujitoa kwa mthibitishaji wao kwa kuita utendakazi katika mkataba huu maalum bila hitaji la ufunguo wao wa kusaini wa mthibitishaji au ufikiaji wa Mnyororo wa Beacon kabisa. Muhimu zaidi, kuwezesha uondoaji wa mthibitishaji mnyororoni kunaruhusu itifaki za uwekaji dhamana zenye dhana za uaminifu zilizopunguzwa juu ya waendeshaji wa nodi.

### Amana za mthibitishaji mnyororoni {#6110}

Amana za mthibitishaji kwa sasa zinachakatwa na [kura ya eth1data](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/) ambayo ni utendakazi kwenye Mnyororo wa Beacon unaochukua data kutoka kwenye tabaka la utekelezaji. Ni aina ya deni la kiufundi kutoka nyakati za kabla ya Unganisho wakati Mnyororo wa Beacon ulikuwa mtandao tofauti na ulilazimika kujishughulisha na upangaji upya wa Uthibitisho wa Kazi (PoW). 

[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) ni njia mpya ya kuwasilisha amana kutoka kwenye tabaka la utekelezaji hadi kwenye tabaka la mwafaka, ambayo inaruhusu uchakataji wa papo hapo na utata mdogo wa utekelezaji. Ni njia salama zaidi ya kushughulikia amana asilia kwa Ethereum iliyounganishwa. Pia inasaidia kuandaa itifaki kwa ajili ya siku zijazo kwa sababu haihitaji amana za kihistoria kuanzisha nodi, jambo ambalo ni muhimu kwa ukomo wa historia.

### Prikampaili kwa BLS12-381 {#2537}

Prikampaili ni seti maalum ya mikataba mahiri iliyojengwa moja kwa moja kwenye Mashine Pepe ya Ethereum ([EVM](/developers/docs/evm/)). Tofauti na mikataba ya kawaida, prikampaili hazisambazwi na watumiaji bali ni sehemu ya utekelezaji wa mteja wenyewe, zikiwa zimeandikwa katika lugha yake asilia (k.m., Go, Java, n.k., sio Solidity). Prikampaili hutumika kwa utendakazi unaotumiwa sana na uliosanifiwa kama vile operesheni za kificho. Wasanidi wa mikataba mahiri wanaweza kuita prikampaili kama mkataba wa kawaida lakini kwa usalama na ufanisi zaidi.

[EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) inaongeza prikampaili mpya kwa operesheni za tao juu ya [BLS12-381](https://hackmd.io/@benjaminion/bls12-381). Tao hili la duaradufu lilianza kutumika sana katika mifumo ikolojia ya sarafu-fiche kutokana na sifa zake za kiutendaji. Hasa zaidi, limepitishwa na tabaka la mwafaka la Ethereum, ambapo linatumiwa na wathibitishaji.

Prikampaili mpya inaongeza uwezo kwa kila msanidi kufanya operesheni za kificho kwa urahisi, ufanisi, na usalama akitumia tao hili, kwa mfano, kuthibitisha sahihi. Programu za mnyororoni zinazotegemea tao hili zinaweza kuwa na ufanisi zaidi wa gesi na salama zikitegemea prikampaili badala ya mkataba fulani maalum. Hii inatumika zaidi kwa programu zinazotaka kufikiri kuhusu wathibitishaji ndani ya EVM, k.m., mabwawa ya uwekaji dhamana, [uwekaji dhamana upya](/restaking/), wateja wepesi, madaraja lakini pia sifuri-maarifa.

### Kutoa heshi za kitalu za kihistoria kutoka kwenye hali {#2935}

EVM kwa sasa inatoa msimbo wa operesheni wa `BLOCKHASH` ambao unawezesha wasanidi wa mkataba kupata heshi ya kitalu moja kwa moja katika tabaka la utekelezaji. Hata hivyo, hii ina kikomo kwa vitalu 256 vya mwisho pekee na inaweza kuwa tatizo kwa wateja wasio na hali katika siku zijazo.

[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) inaunda mkataba mpya wa mfumo unaoweza kutoa heshi za kitalu 8192 za mwisho kama nafasi za kuhifadhi. Hii inasaidia kuandaa itifaki kwa ajili ya siku zijazo kwa utekelezaji usio na hali na inakuwa na ufanisi zaidi wakati miti ya verkle inapitishwa. Hata hivyo, mbali na hili, mikusanyiko inaweza kufaidika na hili mara moja, kwani inaweza kuhoji mkataba moja kwa moja na dirisha refu zaidi la kihistoria.

### Kuhamisha faharisi ya kamati nje ya Uthibitisho {#7549}

Mwafaka wa Mnyororo wa Beacon unategemea wathibitishaji kupiga kura zao kwa kitalu cha hivi punde na kipindi kilichokamilishwa. Uthibitisho unajumuisha vipengele 3, 2 kati ya hivyo ni kura na cha tatu ni thamani ya faharisi ya kamati.

[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) inahamisha faharisi hii nje ya ujumbe wa uthibitisho uliosainiwa, jambo ambalo linafanya iwe rahisi kuthibitisha na kujumuisha kura za mwafaka. Hili litawezesha ufanisi zaidi katika kila mteja wa mwafaka na linaweza kuleta maboresho makubwa ya utendaji kwa saketi za sifuri-maarifa kwa kuthibitisha mwafaka wa Ethereum.

### Kuongeza ratiba ya blobu kwenye faili za usanidi za EL {#7840}

[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) ni mabadiliko rahisi yanayoongeza uwanja mpya kwenye usanidi wa mteja wa tabaka la utekelezaji. Inasanidi idadi ya vitalu, kuwezesha mpangilio thabiti wa idadi lengwa na ya juu zaidi ya mablobu kwa kila kitalu pamoja na marekebisho ya ada ya blob. Kwa usanidi uliofafanuliwa moja kwa moja, wateja wanaweza kuepuka utata wa kubadilishana taarifa hizi kupitia API ya Injini.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Ili kujifunza zaidi kuhusu jinsi Pectra inavyokuathiri wewe haswa kama mtumiaji, msanidi au mthibitishaji wa Ethereum, angalia <a href="https://epf.wiki/#/wiki/pectra-faq">Maswali Yanayoulizwa Mara kwa Mara (FAQ) ya Pectra</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Je, sasisho hili linaathiri nodi na wathibitishaji wote wa Ethereum? {#client-impact}

Ndiyo, sasisho la Pectra linahitaji masasisho kwa [wateja wa utekelezaji na wateja wa mwafaka](/developers/docs/nodes-and-clients/) wote. Wateja wote wakuu wa Ethereum watatoa matoleo yanayounga mkono mchepuo mgumu yaliyowekwa alama ya kipaumbele cha juu. Ili kudumisha usawazishaji na mtandao wa Ethereum baada ya sasisho, waendeshaji wa nodi lazima wahakikishe wanaendesha toleo la mteja linaloungwa mkono. Kumbuka kwamba taarifa kuhusu matoleo ya mteja inategemea wakati, na watumiaji wanapaswa kurejelea masasisho ya hivi punde kwa maelezo ya sasa zaidi.

## Je, ETH inaweza kubadilishwaje baada ya mchepuo mgumu? {#scam-alert}

- **Hakuna Hatua Inayohitajika kwa ETH Yako**: Kufuatia sasisho la Pectra la Ethereum, hakuna haja ya kubadilisha au kusasisha ETH yako. Salio la akaunti yako litabaki vile vile, na ETH unayoshikilia kwa sasa itaendelea kufikiwa katika muundo wake uliopo baada ya mchepuo mgumu.
- **Jihadhari na Utapeli!** <Emoji text="⚠️" /> **mtu yeyote anayekuelekeza "kusasisha" ETH yako anajaribu kukutapeli.** Hakuna unachohitaji kufanya kuhusiana na sasisho hili. Rasilimali zako zitabaki bila kuathiriwa kabisa. Kumbuka, kuwa na taarifa ni ulinzi bora dhidi ya utapeli.

[Zaidi kuhusu kutambua na kuepuka utapeli](/security/)

## Je, unapendelea kujifunza kwa kuona? {#visual-learner}

<VideoWatch slug="pectra-upgrade-overview" />

_Nini Kinaingia Kwenye Sasisho la Pectra? - Christine Kim_

<VideoWatch slug="pectra-what-stakers-need-to-know" />

_Sasisho la Pectra la Ethereum: Kile Waweka Dhamana Wanachohitaji Kujua — Blockdaemon_

## Usomaji zaidi {#further-reading}

- [Ramani ya njia ya Ethereum](/roadmap/)
- [Maswali Yanayoulizwa Mara kwa Mara (FAQ) ya Pectra](https://epf.wiki/#/wiki/pectra-faq)
- [Jinsi Pectra inavyoboresha uzoefu wa mweka dhamana](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Ukurasa wa maelezo wa EIP7702](https://eip7702.io/)
- [Mitandao ya wasanidi ya Pectra](https://github.com/ethereum/pm/blob/master/Network-Upgrade-Archive/Pectra/pectra-pm.md)
