---
title: Prague-Electra (Pectra)
description: Jifunze kuhusu uboreshaji wa itifaki ya Pectra
lang: sw
---

# Pectra {#pectra}

Uboreshaji wa mtandao wa Pectra ulifuata [Dencun](/roadmap/dencun/) na kuleta mabadiliko kwenye safu ya utekelezaji na safu ya makubaliano ya Ethereum. Jina lililofupishwa la Pectra ni mchanganyiko wa Prague na Electra, ambayo ni majina husika ya mabadiliko ya vipimo vya safu ya utekelezaji na safu ya makubaliano. Kwa pamoja, mabadiliko haya yanaleta maboresho kadhaa kwa watumiaji, wasanidi programu na wathibitishaji wa Ethereum.

Uboreshaji huu uliwashwa kwa mafanikio kwenye Mtandao Mkuu wa Ethereum katika epoch `364032`, mnamo **07-Mei-2025 saa 10:05 (UTC)**.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Uboreshaji wa Pectra ni hatua moja tu katika malengo ya maendeleo ya muda mrefu ya Ethereum. Jifunze zaidi kuhusu [ramani ya barabara ya itifaki](/roadmap/) na [maboresho ya awali](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Maboresho katika Pectra {#new-improvements}

Pectra inaleta idadi kubwa zaidi ya [EIPs](https://eips.ethereum.org/) kuliko maboresho yoyote ya awali! Kuna mabadiliko mengi madogo lakini pia baadhi ya vipengele vipya muhimu. Orodha kamili ya mabadiliko na maelezo ya kiufundi yanaweza kupatikana katika EIPs binafsi zilizojumuishwa.

### Msimbo wa akaunti ya EOA {#7702}

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) inawakilisha hatua kubwa kuelekea [uondoaji wa akaunti](/roadmap/account-abstraction/) ulioenea. Kwa kipengele hiki, watumiaji wanaweza kuweka anwani zao ([EOA](/glossary/#eoa)) ili kupanuliwa na mkataba-erevu. EIP inatambulisha aina mpya ya muamala wenye kazi maalum - kuruhusu wamiliki wa anwani kusaini idhini ambayo inaweka anwani zao kuiga mkataba-erevu uliochaguliwa.

Kwa EIP hii, watumiaji wanaweza kuchagua pochi zinazoweza kupangwa ambazo huruhusu vipengele vipya kama vile kuunganisha miamala, kufanya miamala bila gesi na ufikiaji maalum wa mali kwa mipango mbadala ya urejeshaji. Mfumo huu mseto unachanganya wepesi wa EOA na uwezo wa kupangwa wa akaunti zinazotegemea mikataba.

Soma uchambuzi wa kina kuhusu 7702 [hapa](/roadmap/pectra/7702/)

### Ongeza salio la juu la ufanisi {#7251}

Salio la sasa la ufanisi la mthibitishaji ni ETH 32 haswa. Ni kiasi cha chini kinachohitajika kushiriki katika makubaliano lakini wakati huo huo ni kiwango cha juu ambacho mthibitishaji mmoja anaweza kuweka.

[EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) huongeza salio la juu la ufanisi linalowezekana hadi ETH 2048, ikimaanisha kuwa mthibitishaji mmoja sasa anaweza kuweka kati ya ETH 32 na 2048. Badala ya vizidisho vya 32, wawekezaji sasa wanaweza kuchagua kiasi chochote cha ETH cha kuweka na kupokea zawadi kwa kila ETH 1 juu ya kiwango cha chini. Kwa mfano, ikiwa salio la mthibitishaji linakua na zawadi zake hadi ETH 33, ETH 1 ya ziada pia inachukuliwa kuwa sehemu ya salio la ufanisi na inapokea zawadi.

Lakini manufaa ya mfumo bora wa zawadi kwa wathibitishaji ni sehemu tu ya uboreshaji huu. [Wawekezaji](/staking/) wanaoendesha wathibitishaji wengi sasa wanaweza kuwaunganisha kuwa mmoja, jambo ambalo linarahisisha uendeshaji na kupunguza mzigo wa mtandao. Kwa sababu kila mthibitishaji katika Beacon Chain huwasilisha saini katika kila epoch, mahitaji ya kipimo data huongezeka na wathibitishaji wengi na idadi kubwa ya saini za kusambaza. Kuunganisha wathibitishaji kutapunguza mzigo kwenye mtandao na kufungua chaguo mpya za kuongeza ukubwa huku ukiweka usalama sawa wa kiuchumi.

Soma uchambuzi wa kina kuhusu maxEB [hapa](/roadmap/pectra/maxeb/)

### Ongezeko la uwezo wa kusindika Blob {#7691}

Blob hutoa [upatikanaji wa data](/developers/docs/data-availability/#data-availability-and-layer-2-rollups) kwa L2s. Zilianzishwa katika [uboreshaji wa mtandao uliopita](/roadmap/dencun/).

Hivi sasa, mtandao unalenga wastani wa blobs 3 kwa kila kizuizi na upeo wa blobs 6. Kwa [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691), wastani wa idadi ya blob utaongezwa hadi 6, na upeo wa 9 kwa kila kizuizi, na kusababisha kuongezeka kwa uwezo wa rollup za Ethereum. EIP hii inasaidia kuziba pengo hadi [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) itakapowezesha idadi kubwa zaidi ya blob.

### Ongeza gharama ya calldata {#7623}

Kabla ya kuanzishwa kwa [blobs katika uboreshaji wa Dencun](/roadmap/danksharding), L2s zilikuwa zikitumia [calldata](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata) kuhifadhi data zao katika Ethereum. Blobs na calldata zote huathiri matumizi ya kipimo data cha Ethereum. Ingawa vizuizi vingi hutumia kiasi kidogo tu cha calldata, vizuizi vyenye data nyingi ambavyo pia vina blobs nyingi vinaweza kuwa na madhara kwa mtandao wa p2p wa Ethereum.

Ili kushughulikia hili, [EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) huongeza bei ya calldata, lakini tu kwa miamala yenye data nyingi. Hii inadhibiti ukubwa mbaya zaidi wa kizuizi, inatoa motisha kwa L2s kutumia blobs pekee na inaacha zaidi ya 99% ya miamala bila kuathiriwa.

### Toka zinazoweza kuanzishwa na safu ya utekelezaji {#7002}

Hivi sasa, kutoka kwa mthibitishaji na [kutoa ETH iliyowekwa](/staking/withdrawals/) ni operesheni ya safu ya makubaliano ambayo inahitaji ufunguo amilifu wa mthibitishaji, ufunguo uleule wa BLS unaotumiwa na mthibitishaji kufanya majukumu amilifu kama vile uthibitisho. Vitambulisho vya uondoaji ni ufunguo baridi tofauti ambao hupokea hisa iliyotolewa lakini hauwezi kuanzisha utokaji. Njia pekee kwa wawekezaji kutoka ni kutuma ujumbe maalum kwa mtandao wa Beacon Chain uliosainiwa kwa kutumia ufunguo amilifu wa mthibitishaji. Hii inaweka kikomo katika hali ambapo vitambulisho vya uondoaji na ufunguo wa mthibitishaji vinashikiliwa na taasisi tofauti au wakati ufunguo wa mthibitishaji unapotea.

[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) inatambulisha mkataba mpya unaoweza kutumika kuanzisha utokaji kwa kutumia vitambulisho vya uondoaji vya safu ya utekelezaji. Wawekezaji wataweza kutoka kwa mthibitishaji wao kwa kupiga simu kazi katika mkataba huu maalum bila hitaji la ufunguo wao wa kusaini wa mthibitishaji au ufikiaji wa Beacon Chain kabisa. Muhimu zaidi, kuwezesha uondoaji wa wathibitishaji kwenye mnyororo huruhusu itifaki za uwekezaji na dhana za uaminifu zilizopunguzwa kwa waendeshaji wa nodi.

### Amana za Mthibitishaji kwenye mnyororo {#6110}

Amana za Mthibitishaji kwa sasa zinashughulikiwa na [eth1data poll](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/) ambayo ni kazi kwenye Beacon Chain ambayo huchota data kutoka kwa safu ya utekelezaji. Ni aina ya deni la kiufundi kutoka nyakati za kabla ya The Merge wakati Beacon Chain ilikuwa mtandao tofauti na ilibidi kujihusisha na upangaji upya wa uthibitisho-wa-kazi.

[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) ni njia mpya ya kuwasilisha amana kutoka kwa utekelezaji hadi safu ya makubaliano, ambayo inaruhusu usindikaji wa papo hapo na utata mdogo wa utekelezaji. Ni njia salama zaidi ya kushughulikia amana asili za Ethereum iliyounganishwa. Pia husaidia kuandaa itifaki kwa siku zijazo kwa sababu haihitaji amana za kihistoria ili kuanzisha nodi, jambo ambalo ni muhimu kwa kumalizika kwa historia.

### Precompile ya BLS12-381 {#2537}

Precompiles ni seti maalum ya mikataba-erevu iliyojengwa moja kwa moja kwenye Mashine Halisi ya Ethereum ([EVM](/developers/docs/evm/)). Tofauti na mikataba ya kawaida, precompiles hazitumwi na watumiaji lakini ni sehemu ya utekelezaji wa mteja wenyewe, zilizoandikwa kwa lugha yake ya asili (k.m., Go, Java, n.k., sio Solidity). Precompiles hutumika kwa kazi zinazotumika sana na sanifu kama vile operesheni za kriptografia. Wasanidi programu wa mikataba-erevu wanaweza kupiga simu precompiles kama mkataba wa kawaida lakini kwa usalama na ufanisi zaidi.

[EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) huongeza precompiles mpya za operesheni za curve juu ya [BLS12-381](https://hackmd.io/@benjaminion/bls12-381). Curve hii ya eliptiki ilitumika sana katika mifumo ya ikolojia ya sarafu ya kidijitali kutokana na sifa zake za vitendo. Hasa zaidi, imepitishwa na safu ya makubaliano ya Ethereum, ambapo inatumiwa na wathibitishaji.

Precompile mpya huongeza uwezo kwa kila msanidi programu kufanya operesheni za kriptografia kwa urahisi, kwa ufanisi, na kwa usalama kwa kutumia curve hii, kwa mfano, kuthibitisha saini. Programu za kwenye mnyororo zinazotegemea curve hii zinaweza kuwa na ufanisi zaidi wa gesi na salama kwa kutegemea precompile badala ya mkataba fulani maalum. Hii inatumika hasa kwa programu ambazo zinataka kufikiria kuhusu wathibitishaji ndani ya EVM, k.m., mabwawa ya uwekezaji, [uwekezaji upya](/restaking/), wateja wepesi, madaraja lakini pia zero-knowledge.

### Tumikia hashi za kizuizi za kihistoria kutoka kwa hali {#2935}

EVM kwa sasa inatoa `BLOCKHASH` opcode ambayo huwawezesha wasanidi programu wa mikataba kupata hashi ya kizuizi moja kwa moja kwenye safu ya utekelezaji. Hata hivyo, hii ni kwa vizuizi 256 vya mwisho pekee na inaweza kuwa tatizo kwa wateja wasio na hali katika siku zijazo.

[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) huunda mkataba mpya wa mfumo ambao unaweza kutumikia hashi 8192 za mwisho za vizuizi kama nafasi za kuhifadhi. Hii inasaidia kuandaa itifaki kwa siku zijazo kwa utekelezaji usio na hali na inakuwa na ufanisi zaidi wakati verkle tries zinapopitishwa. Hata hivyo, mbali na hili, rollup zinaweza kufaidika na hili mara moja, kwani zinaweza kuuliza mkataba moja kwa moja na dirisha refu la kihistoria.

### Sogeza faharasa ya kamati nje ya Uthibitisho {#7549}

Makubaliano ya Beacon Chain yanategemea wathibitishaji kupiga kura zao kwa kizuizi cha hivi karibuni na epoch iliyokamilishwa. Uthibitisho unajumuisha vipengele 3, ambapo 2 ni kura na cha tatu ni thamani ya faharasa ya kamati.

[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) husogeza faharasa hii nje ya ujumbe wa uthibitisho uliosainiwa, jambo ambalo hurahisisha kuthibitisha na kujumlisha kura za makubaliano. Hii itawezesha ufanisi zaidi katika kila mteja wa makubaliano na inaweza kuleta maboresho makubwa ya utendaji kwa sakiti za zero-knowledge za kuthibitisha makubaliano ya Ethereum.

### Ongeza ratiba ya blob kwenye faili za usanidi za EL {#7840}

[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) ni mabadiliko rahisi ambayo huongeza uga mpya kwenye usanidi wa mteja wa safu ya utekelezaji. Husanidi idadi ya vizuizi, kuwezesha mpangilio unaobadilika wa lengo na idadi ya juu ya blob kwa kila kizuizi pamoja na marekebisho ya ada ya blob. Kwa usanidi ulioainishwa moja kwa moja, wateja wanaweza kuepuka utata wa kubadilishana habari hii kupitia Engine API.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Ili kujifunza zaidi kuhusu jinsi Pectra inavyokuathiri hasa kama mtumiaji, msanidi programu au mthibitishaji wa Ethereum, angalia <a href="https://epf.wiki/#/wiki/pectra-faq">Maswali Yanayoulizwa Mara kwa Mara ya Pectra</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Je, uboreshaji huu unaathiri nodi zote za Ethereum na wathibitishaji? {#client-impact}

Ndiyo, uboreshaji wa Pectra unahitaji masasisho kwa [wateja wa utekelezaji na wateja wa makubaliano](/developers/docs/nodes-and-clients/). Wateja wote wakuu wa Ethereum watatoa matoleo yanayounga mkono hard fork iliyowekwa alama kama kipaumbele cha juu. Ili kudumisha usawazishaji na mtandao wa Ethereum baada ya uboreshaji, waendeshaji nodi lazima wahakikishe kuwa wanatumia toleo la mteja linaloungwa mkono. Kumbuka kwamba taarifa kuhusu matoleo ya wateja hubadilika kulingana na wakati, na watumiaji wanapaswa kurejelea masasisho ya hivi punde kwa maelezo ya sasa zaidi.

## Je, ETH inawezaje kubadilishwa baada ya 'hard fork'? {#scam-alert}

- **Hakuna Hatua Inayohitajika kwa ETH Yako**: Kufuatia uboreshaji wa Pectra wa Ethereum, hakuna haja ya kubadilisha au kuboresha ETH yako. Salio la akaunti yako litabaki kama lilivyo, na ETH unayomiliki sasa itaendelea kupatikana katika hali yake ya sasa baada ya 'hard fork'.
- **Jihadhari na Ulaghai!** <Emoji text="⚠️" /> **mtu yeyote anayekuelekeza "kuboresha" ETH yako anajaribu kukuibia.** Hakuna unachohitaji kufanya kuhusiana na uboreshaji huu.
  Rasilimali zako hazitaathirika kabisa. Kumbuka, kuwa na taarifa ndiyo njia bora ya kujilinda dhidi ya ulaghai.

[Zaidi kuhusu kutambua na kuepuka ulaghai](/security/)

## Wewe ni mwanafunzi wa kuona zaidi? {#visual-learner}

<YouTube id="ufIDBCgdGwY" />

_Nini Kinaingia Katika Uboreshaji wa Pectra?_ - Christine Kim_

<YouTube id="_UpAFpC7X6Y" />

_Uboreshaji wa Pectra wa Ethereum: Wawekezaji Wanachohitaji Kujua — Blockdaemon_

## Masomo zaidi {#further-reading}

- [Ramani ya barabara ya Ethereum](/roadmap/)
- [Maswali Yanayoulizwa Mara kwa Mara ya Pectra](https://epf.wiki/#/wiki/pectra-faq)
- [Ukurasa wa habari wa Pectra.wtf](https://pectra.wtf)
- [Jinsi Pectra inavyoboresha uzoefu wa mwekezaji](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Ukurasa wa habari wa EIP7702](https://eip7702.io/)
- [Devnets za Pectra](https://github.com/ethereum/pm/blob/master/Pectra/pectra-pm.md)
