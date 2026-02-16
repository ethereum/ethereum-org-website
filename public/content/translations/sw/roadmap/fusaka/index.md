---
title: Fulu-Osaka (Fusaka)
description: Jifunze kuhusu uboreshaji wa itifaki ya Fusaka
lang: sw
---

# Fusaka <Emoji text="🦓" /> {#fusaka}

**Sasisho la Fusaka la Ethereum linalosubiriwa kwa hamu lilianza kutumika tarehe 3 Desemba, 2025**

Uboreshaji wa mtandao wa Fusaka hufuata [Pectra](/roadmap/pectra/) na huleta vipengele vipya zaidi na kuboresha matumizi kwa kila mtumiaji na mjenzi wa Ethereum. Jina linajumuisha toleo jipya la safu ya utekelezaji la Osaka na toleo la safu ya makubaliano lililopewa jina la nyota ya Fulu. Sehemu zote mbili za Ethereum hupokea uboreshaji unaosukuma kuongeza kiwango cha Ethereum, usalama na uzoefu wa mtumiaji hadi siku zijazo.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Sasisho la Fusaka ni hatua moja tu katika malengo ya maendeleo ya muda mrefu ya Ethereum. Pata maelezo zaidi kuhusu [mpango kazi wa itifaki](/roadmap/) na [masasisho yaliyopita](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Maboresho katika Fusaka {#maboresho-katika-fusaka}

### Ongeza ukubwa wa blobs {#scale-blobs}

#### PeerDAS {#peerdas}

Hiki ndicho _kichwa_ cha mgawanyiko wa Fusaka, kipengele kikuu kilichoongezwa katika sasisho hili. Layer 2s kwa sasa huchapisha data zao kwa Ethereum katika blobs, aina ya data ya muda mfupi iliyoundwa mahsusi kwa safu ya 2. Kabla ya Fusaka, kila nodi kamili lazima ihifadhi kila blob ili kuhakikisha kuwa data iko. Kadiri upitishaji wa blob unavyoongezeka, kulazimika kupakua data hii yote kunachukua rasilimali nyingi.

Kwa [data availability sampling](https://notes.ethereum.org/@fradamt/das-fork-choice) , badala ya kulazimika kuhifadhi data yote ya blob, kila nodi itawajibika kwa seti ndogo ya data ya blob. Blobu husambazwa kwa nasibu katika vifundo vyote kwenye mtandao huku kila kifundo kikiwa na 1/8 pekee ya data, kwa hivyo kuwezesha ukubwa wa kinadharia hadi 8x. Ili kuhakikisha upatikanaji wa data, sehemu yoyote ya data inaweza kuundwa upya kutoka kwa 50% yoyote iliyopo ya yote kwa mbinu zinazopunguza uwezekano wa data isiyo sahihi au inayokosekana hadi kiwango kidogo sana cha kriptografia (~moja kwa 10<sup>20</sup> hadi moja kwa 10<sup>24</sup>).

Hii hudumisha mahitaji ya maunzi na kipimo data cha nodi kushinikizwa huku kuwezesha uongezaji wa blob na kusababisha kiwango kikubwa na ada ndogo za safu ya 2.

[Jifunze zaidi kuhusu PeerDAS](/roadmap/fusaka/peerdas/)

**Rasilimali**:

- [Uainishaji wa kiufundi wa EIP-7594](https://eips.ethereum.org/EIPS/eip-7594)
- [DappLion kuhusu PeerDAS: Uongezwaji wa Ethereum Leo | ETHSofia 2024](https://youtu.be/bONWd1x2TjQ?t=328)
- [Kitaaluma: Nyaraka za PeerDAS ya Ethereum (PDF)](https://eprint.iacr.org/2024/1362.pdf)

#### Migawanyiko ya Vigezo vya Blob Pekee {#blob-parameter-only-forks}

Layer 2s inapanua Ethereum - mitandao yao inapokua, wanahitaji kutuma data zaidi kwa Ethereum. Hii ina maana kwamba Ethereum itahitaji kuongeza idadi ya blobs zinazopatikana kwao kadiri muda unavyosonga. Ingawa PeerDAS huwezesha kuongeza data ya blob, inahitaji kufanywa hatua kwa hatua na kwa usalama.

Kwa sababu Ethereum ni msimbo unaotumia maelfu ya nodi huru zinazohitaji makubaliano kuhusu sheria sawa, hatuwezi tu kuleta mabadiliko kama vile kuongeza idadi ya blob jinsi unavyosambaza sasisho la tovuti. Mabadiliko yoyote ya sheria lazima yawe uboreshaji ulioratibiwa ambapo kila nodi, mteja na programu ya kiidhinishaji husasishwa kabla ya kitalu kile kile kilichoamuliwa.

Maboresho haya yaliyoratibiwa kwa ujumla yanajumuisha mabadiliko mengi, yanahitaji majaribio mengi, na hiyo inachukua muda. Ili kukabiliana haraka na mabadiliko ya mahitaji ya safu ya 2 ya blob, kigezo cha blob tu uma huanzisha utaratibu wa kuongeza matone bila kusubiri ratiba hiyo ya kuboresha.

Vigezo vya Blob pekee vinaweza kuwekwa na wateja, sawa na usanidi mwingine kama kikomo cha gesi. Kati ya uboreshaji mkubwa wa Ethereum, wateja wanaweza kukubali kuongeza blobs za `lengo` na `max` kwa k.m. 9 na 12 na kisha waendeshaji wa nodi watasasisha ili kushiriki katika uma huo mdogo. Vigezo hivi vya blob pekee vinaweza kusanidiwa wakati wowote.

Wakati blobs zilipoongezwa kwa mara ya kwanza kwenye mtandao katika sasisho la Dencun, lengo lilikuwa 3. Hiyo iliongezwa hadi 6 katika Pectra na, baada ya Fusaka, sasa inaweza kuongezwa kwa kiwango endelevu bila kutegemea sasisho hizi kuu za mtandao.

![Chati inayoonyesha wastani wa idadi ya blob kwa kila bloku na malengo yanayoongezeka na sasisho](./average-blob-count-per-block.webp)

Chanzo cha grafu: [Ethereum Blobs - @hildobby, Dune Analytics](https://dune.com/hildobby/blobs)

**Rasilimali**: [Uainishaji wa kiufundi wa EIP-7892](https://eips.ethereum.org/EIPS/eip-7892)

#### Ada ya msingi ya Blob inayoambatana na gharama za utekelezaji {#blob-base-fee-bounded-by-execution-costs}

Layer 2s hulipa bili mbili wanapochapisha data: ada ya blob na gesi ya utekelezaji inayohitajika ili kuthibitisha blobs hizo. Iwapo gesi ya kutekeleza itatawala, mnada wa ada ya blob unaweza kuongezeka hadi wei 1 na kuacha kuwa ishara ya bei.

EIP-7918 huweka bei ya akiba sawia chini ya kila blob. Wakati akiba ni kubwa kuliko ada ya msingi ya blob, kanuni ya kurekebisha ada huchukulia bloku kama iko juu ya lengo na huacha kusukuma ada chini na kuiruhusu kuongezeka kawaida. Kama matokeo:

- soko la ada ya blob daima humenyuka kwa msongamano
- safu ya 2 hulipa angalau kipande cha maana cha hesabu wanayolazimisha kwenye nodi
- ada ya msingi kwenye EL haiwezi tena kuweka ada ya blob katika 1 wei

**Rasilimali**:

- [Uainishaji wa kiufundi wa EIP-7918](https://eips.ethereum.org/EIPS/eip-7918)
- [Mfafanuzi wa Storybook](https://notes.ethereum.org/@anderselowsson/AIG)

### Ongeza ukubwa wa L1 {#scale-l1}

#### Muda wa mwisho wa historia na risiti rahisi {#history-expiry}

Mnamo Julai 2025, programu za utekelezaji za Ethereum [zilianza kusaidia muda wa mwisho wa historia kiasi](https://blog.ethereum.org/2025/07/08/partial-history-exp). Hii iliacha historia ya zamani kuliko [Muungano](https://ethereum.org/roadmap/merge/) ili kupunguza nafasi ya diski inayohitajika na waendeshaji wa nodi kadri Ethereum inavyoendelea kukua.

EIP hii iko katika sehemu tofauti na "Core EIPs" kwa sababu mgawanyiko hautekelezi mabadiliko yoyote - ni taarifa kwamba timu za programu za wateja lazima zisaidie muda wa mwisho wa historia kabla ya sasisho la Fusaka. Kivitendo, programu za wateja zinaweza kutekeleza hili wakati wowote lakini kuliongeza kwenye sasisho kuliweka wazi kwenye orodha yao ya mambo ya kufanya na kuwaruhusu kujaribu mabadiliko ya Fusaka kwa kushirikiana na kipengele hiki.

**Rasilimali**: [Uainishaji wa kiufundi wa EIP-7642](https://eips.ethereum.org/EIPS/eip-7642)

#### Weka mipaka ya juu ya MODEXP {#set-upper-bounds-for-modexp}

Hadi sasa, muundo wa MODEXP unajumuisha nambari zinazokubalika za ukubwa wowote. Hiyo ilifanya iwe vigumu kupima, rahisi kutumia vibaya, na kuwa hatari kwa uthabiti wa mteja. EIP-7823 inaweka kikomo wazi mahali: kila nambari ya ingizo inaweza kuwa na urefu wa biti 8192 (baiti 1024). Kitu chochote kikubwa kinakataliwa, gesi ya shughuli hiyo inachomwa, na hakuna mabadiliko ya hali yanayotokea. Inashughulikia kwa urahisi mahitaji ya ulimwengu halisi huku ikiondoa hali mbaya zaidi ambazo huchanganya upangaji wa kikomo cha gesi na ukaguzi wa usalama. Mabadiliko haya hutoa usalama zaidi na ulinzi wa DoS bila kuathiri matumizi ya mtumiaji au msanidi.

**Rasilimali**: [Uainishaji wa kiufundi wa EIP-7823](https://eips.ethereum.org/EIPS/eip-7823)

#### Kikomo cha Muamala wa Gesi {#transaction-gas-limit-cap}

EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) adds a cap of 16,777,216 (2^24) gas per transaction. Ni ugumu wa DoS kwa kuweka gharama ya hali mbaya zaidi ya muamala wowote tunapoongeza kikomo cha gesi. Hurahisisha uthibitishaji na uenezi kuwa mfano ili kuturuhusu kukabiliana na uwekaji viwango kupitia kuongeza kikomo cha gesi.

Kwa nini hasa 2^24 gesi? Ni ndogo kwa urahisi kuliko kikomo cha sasa cha gesi, ni kubwa vya kutosha kwa uwekaji wa mikataba halisi na ujumuishaji mzito, na nguvu ya 2 hurahisisha kutekeleza kwa wateja wote. Ukubwa huu mpya wa juu zaidi wa muamala ni sawa na ukubwa wa wastani wa bloku kabla ya Pectra, na kuifanya kuwa kikomo kinachofaa kwa operesheni yoyote kwenye Ethereum.

**Rasilimali**: [Uainishaji wa kiufundi wa EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)

#### Ongezeko la gharama ya gesi ya `MODEXP` {#modexp-gas-cost-increase}

MODEXP ni mkusanyiko wa chaguo za kukokotoa uliojumuishwa ndani ambao hukokotoa ubainishaji wa moduli, aina ya hesabu kubwa inayotumika katika uthibitishaji sahihi wa RSA na mifumo ya uthibitishaji. Inaruhusu kandarasi kuendesha hesabu hizi moja kwa moja bila kuzitekeleza zenyewe.

Wasanidi programu na timu za wateja zilitambua MODEXP kama kikwazo kikuu cha kuongeza kikomo cha gesi ya kuzuia gesi kwa sababu bei ya sasa ya gesi mara nyingi hukadiria kiasi cha nguvu za kompyuta ambacho vifaa vingine huhitaji. Hii inamaanisha kuwa muamala mmoja unaotumia MODEXP unaweza kuchukua muda mwingi unaohitajika kuchakata kizuizi kizima, hivyo basi kupunguza kasi ya mtandao.

EIP hii inabadilisha bei ili ilingane na gharama halisi za kikokotoo kwa:

- kupandisha ada ya chini kutoka gesi 200 hadi 500 na kuondoa punguzo la theluthi moja kutoka EIP-2565 kwenye hesabu ya gharama ya jumla
- kuongeza gharama kwa kasi zaidi wakati pembejeo ya kipeo ni ndefu sana. ikiwa kielelezo (nambari ya "nguvu" unayopitisha kama hoja ya pili) ni ndefu kuliko baiti 32 / biti 256, chaji ya gesi hupanda kwa kasi zaidi kwa kila baiti ya ziada
- kuchaji msingi mkubwa au moduli ya ziada pia. Nambari zingine mbili (msingi na moduli) inachukuliwa kuwa angalau ka 32 - ikiwa moja ni kubwa, gharama huongezeka kulingana na saizi yake

Kwa kulinganisha gharama bora na wakati halisi wa usindikaji, MODEXP haiwezi tena kusababisha kizuizi kuchukua muda mrefu kuthibitishwa. Mabadiliko haya ni mojawapo ya kadhaa yanayolenga kuifanya kuwa salama kuongeza kikomo cha gesi ya kuzuia Ethereum katika siku zijazo.

**Rasilimali**: [Uainishaji wa kiufundi wa EIP-7883](https://eips.ethereum.org/EIPS/eip-7883)

#### Kikomo cha Ukubwa wa Kizuizi cha Utekelezaji wa RLP {#rlp-execution-block-size-limit}

Hii inaunda kikomo cha juu cha ukubwa wa bloku unaoruhusiwa - hiki ni kikomo kwa kile _kinachotumwa_ kupitia mtandao na kiko tofauti na kikomo cha gesi, ambacho kinaweka kikomo cha _kazi_ ndani ya bloku. Kikomo cha ukubwa wa bloku ni 10 MiB, na nafasi ndogo ya ziada (2 MiB) iliyotengwa kwa ajili ya data ya makubaliano ili kila kitu kitoshee na kusambazwa vizuri. Ikiwa bloku itaonekana kubwa kuliko hiyo, programu za wateja huikataa.
Hii inahitajika kwa sababu bloku kubwa sana huchukua muda mrefu kusambaa na kuthibitishwa kwenye mtandao na inaweza kusababisha masuala ya makubaliano au kutumiwa vibaya kama njia ya shambulio la DoS. Pia, 'gossip' ya safu ya makubaliano tayari haitumi mbele bloku zenye ukubwa zaidi ya ~10 MiB, kwa hivyo kuoanisha safu ya utekelezaji na kikomo hicho huepuka hali za ajabu za “kuonekana na wengine, kuachwa na wengine”.

Maelezo ya kina: hiki ni kikomo kwenye ukubwa wa bloku ya utekelezaji iliyosimbwa kwa [RLP](/developers/docs/data-structures-and-encoding/rlp/). Jumla ya 10 MiB, na kinga ya usalama ya 2 MiB iliyotengwa kwa ajili ya uundaji wa bloku ya 'beacon'. Kivitendo, programu za wateja hufafanua

`MAX_BLOCK_SIZE = 10,485,760` baiti na

`SAFETY_MARGIN = 2,097,152` baiti,

na hukataa bloku yoyote ya utekelezaji ambayo mzigo wake wa RLP unazidi

`MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`

Lengo ni kuweka kikomo cha muda mbaya zaidi wa uenezaji/uthibitishaji na kuendana na tabia ya 'gossip' ya safu ya makubaliano, na kupunguza hatari ya reorg/DoS bila kubadilisha uhasibu wa gesi.

**Rasilimali**: [Uainishaji wa kiufundi wa EIP-7934](https://eips.ethereum.org/EIPS/eip-7934)

#### Weka kikomo cha gesi chaguo-msingi kuwa milioni 60 {#set-default-gas-limit-to-60-million}

Kabla ya kuongeza kikomo cha gesi kutoka 30M hadi 36M mnamo Februari 2025 (na baadaye hadi 45M), thamani hii ilikuwa haijabadilika tangu Kuunganishwa (Septemba 2022). EIP hii inalenga kuweka kupanuka kwa uwiano thabiti.

EIP-7935 huratibu timu za wateja wa EL ili kuongeza kikomo-msingi cha gesi zaidi ya 45M cha leo cha Fusaka. Ni EIP ya Taarifa, lakini inawauliza wateja kwa uwazi kupima vikomo vya juu zaidi kwenye devnets, kuungana kwa thamani salama, na kusafirisha nambari hiyo katika matoleo yao ya Fusaka.

Malengo ya upangaji wa Devnet ~ 60M dhiki (vitalu kamili vilivyo na mzigo wa syntetisk) na matuta ya kurudia; utafiti unasema patholojia za ukubwa wa kitalu hazipaswi kushikamana chini ya ~ 150M. Rollout inapaswa kuoanishwa na kiwango cha juu cha kikomo cha shughuli za gesi (EIP-7825) ili hakuna muamala mmoja unaoweza kutawala vikomo vinavyoongezeka.

**Rasilimali**: [Uainishaji wa kiufundi wa EIP-7935](https://eips.ethereum.org/EIPS/eip-7935)

### Boresha UX {#improve-ux}

#### Muonekano wa pendekezo la kuamua {#deterministic-proposer-lookahead}

Ukiwa na EIP-7917, Beacon Chain itafahamu kuhusu watayarishaji wa vitalu vijavyo kwa enzi inayofuata. Kuwa na mwonekano wa kubaini ni wapi wathibitishaji watakuwa wakipendekeza vitalu vya siku zijazo kunaweza kuwezesha [uthibitisho wa awali](https://ethresear.ch/t/based-preconfirmations/17353) - ahadi na mpendekezaji ujao ambayo inahakikisha shughuli ya mtumiaji itajumuishwa kwenye kitalu chao bila kungoja kitalu halisi.

Kipengele hiki hunufaisha utekelezaji wa mteja na usalama wa mtandao kwa vile huzuia matukio makali ambapo wathibitishaji wanaweza kuchezea ratiba ya wapendekezaji. Mtazamo pia unaruhusu ugumu mdogo wa utekelezaji.

**Rasilimali**: [Uainishaji wa kiufundi wa EIP-7917](https://eips.ethereum.org/EIPS/eip-7917)

#### Count leading zeros (CLZ) opcode {#count-leading-zeros-opcode

Kipengele hiki kinaongeza agizo dogo la EVM, **hesabu sifuri zinazoongoza (CLZ)**. Takriban kila kitu katika EVM kinawakilishwa kama thamani ya biti-256—opcode hii mpya inarudisha idadi ya biti za sifuri zilizo mbele. Hiki ni kipengele cha kawaida katika usanifu wa seti nyingi za maagizo kwani huwezesha utendakazi bora wa hesabu. Kwa vitendo, hii hubadilisha utafutaji wa baiti ulioandikwa kwa mkono wa leo kuwa hatua moja, hivyo basi kupata biti ya kwanza iliyo washwa, kuchanganua baiti, au kuchambua sehemu za biti kunakuwa rahisi na cha bei nafuu zaidi. Opcode ni ya chini, ya gharama isiyobadilika na imeainishwa kuwa sambamba na nyongeza ya kimsingi, ambayo hupunguza bytecode na kuokoa gesi kwa kazi sawa.

**Rasilimali**: [Uainishaji wa kiufundi wa EIP-7939](https://eips.ethereum.org/EIPS/eip-7939)

#### Precompile kwa Usaidizi wa Curve ya secp256r1 {#secp256r1-precompile}

Huanzisha kikagua saini cha secp256r1 (P-256) kilichojengewa ndani, cha mtindo wa passkey katika anwani isiyobadilika `0x100` kwa kutumia umbizo la wito lilelile ambalo tayari limetumiwa na L2 nyingi na kurekebisha kesi za pembezoni, ili mikataba iliyoandikwa kwa ajili ya mazingira hayo ifanye kazi kwenye L1 bila mabadiliko.

Uboreshaji wa UX! Kwa watumiaji, hii inafungua utiaji saini asili wa kifaa na passkeys. Pochi zinaweza kutumia moja kwa moja Apple Secure Enclave, Android Keystore, moduli za usalama za maunzi (HSM), na FIDO2/WebAuthn - hakuna maneno muhimu ya ufunguo, mchakato rahisi wa kujiunga, na mtiririko wa vipengele vingi unaohisi kama programu za kisasa. Hii inaleta UX bora zaidi, urejeshaji rahisi, na miundo ya ufichaji wa akaunti inayofanana na kile ambacho mabilioni ya vifaa tayari hufanya.

Kwa wasanidi programu, huchukua ingizo la baiti 160 na kurudisha tokeo la baiti 32, na kuifanya iwe rahisi kuhamisha maktaba zilizopo na mikataba ya L2. Kwa ndani, inajumuisha ukaguzi wa pointi-kwenye-ukomo na ulinganisho wa moduli ili kuondoa kesi za pembezoni zenye changamoto bila kuvunja waitaji halali.

**Rasilimali**:

- [Uainishaji wa kiufundi wa EIP-7951](https://eips.ethereum.org/EIPS/eip-7951)
- [Zaidi kuhusu RIP-7212](https://www.alchemy.com/blog/what-is-rip-7212) _(Kumbuka kuwa EIP-7951 ilichukua nafasi ya RIP-7212)_

### Meta {#meta}

#### Mbinu ya JSON-RPC ya `eth_config` {#eth-config}

Huu ni wito wa JSON-RPC unaokuruhusu kuuliza nodi yako ni mipangilio gani ya mgawanyiko unayotumia. Inarudisha picha tatu za hali: `current`, `next`, na `last` ili wathibitishaji na zana za ufuatiliaji waweze kuthibitisha kuwa programu za wateja zimejipanga kwa ajili ya mgawanyiko ujao.

Kivitendo, hii ni kushughulikia upungufu uliogunduliwa wakati mgawanyiko wa Pectra ulipoanza kutumika kwenye mtandao wa majaribio wa Holesky mapema 2025 na usanidi mbovu mdogo ambao ulisababisha hali isiyokamilika. Hii husaidia timu za majaribio na wasanidi programu kuhakikisha kuwa migawanyiko mikuu itafanya kazi kama inavyotarajiwa wakati wa kuhamia kutoka devnets kwenda mitandao ya majaribio, na kutoka mitandao ya majaribio kwenda Mtandao Mkuu.

Picha za hali zinajumuisha: `chainId`, `forkId`, muda uliopangwa wa uanzishaji wa mgawanyiko, ni 'precompiles' zipi zinazotumika, anwani za 'precompile', utegemezi wa mikataba ya mfumo, na ratiba ya blob ya mgawanyiko.

EIP hii iko katika sehemu tofauti na "Core EIPs" kwa sababu mgawanyiko hautekelezi mabadiliko yoyote - ni taarifa kwamba timu za programu za wateja lazima zitekeleze mbinu hii ya JSON-RPC kabla ya sasisho la Fusaka.

**Rasilimali**: [Uainishaji wa kiufundi wa EIP-7910](https://eips.ethereum.org/EIPS/eip-7910)

## Maswali Yanayoulizwa Mara kwa Mara {#faq}

### Je, uboreshaji huu unaathiri nodi zote za Ethereum na wathibitishaji? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

Ndiyo, uboreshaji wa Fusaka unahitaji masasisho kwa [wateja wa kutekeleza na wateja wa makubaliano](/developers/docs/nodes-and-clients/). Wateja wote wakuu wa Ethereum watatoa matoleo yanayounga mkono mgawanyiko mkuu uliotiwa alama kuwa kipaumbele cha juu. Unaweza kufuatilia ni lini matoleo haya yatapatikana katika repos za mteja za Github,[Discord channels](https://ethstaker.org/support), the [EthStaker Discord](https://dsc.gg/ethstaker), au kwa kujiandikisha kwenye blogu ya Ethereum kwa masasisho ya itifaki. Ili kudumisha usawazishaji na mtandao wa Ethereum baada ya uboreshaji, waendeshaji nodi lazima wahakikishe kuwa wanatumia toleo la mteja linaloungwa mkono. Kumbuka kwamba taarifa kuhusu matoleo ya wateja hubadilika kulingana na wakati, na watumiaji wanapaswa kurejelea masasisho ya hivi punde kwa maelezo ya sasa zaidi.

### Je, ETH inawezaje kubadilishwa baada ya 'hard fork'? {#how-can-eth-be-converted-after-the-hardfork}

- **Hakuna Hatua Inayohitajika kwa ETH Yako**: Kufuatia uboreshaji wa Ethereum Fusaka, hakuna haja ya kubadilisha au kuboresha ETH yako. Salio la akaunti yako litabaki kama lilivyo, na ETH unayomiliki sasa itaendelea kupatikana katika hali yake ya sasa baada ya 'hard fork'.
- **Jihadhari na Ulaghai!** <Emoji text="⚠️" /> **mtu yeyote anayekuelekeza "kuboresha" ETH yako anajaribu kukuibia.** Hakuna unachohitaji kufanya kuhusiana na uboreshaji huu.
  Rasilimali zako hazitaathirika kabisa. Kumbuka, kuwa na taarifa ndiyo njia bora ya kujilinda dhidi ya ulaghai.

[Zaidi kuhusu kutambua na kuepuka ulaghai](/security/)

### Kuna nini na punda milia? <Emoji text="🦓" /> {#whats-with-the-zebras}

Punda milia ni "nembo" iliyochaguliwa na wasanidi programu wa Fusaka kwa sababu milia yake inaakisi uchukuaji sampuli za upatikanaji wa data kwa msingi wa safu wa PeerDAS, ambapo nodi huhifadhi mitandao midogo fulani ya safu na huchukua sampuli za safu chache zingine kutoka kwa kila nafasi ya rika ili kuangalia kama data ya blob inapatikana.

Muungano wa 2022 [ulitumia panda](https://x.com/hwwonx/status/1431970802040127498) kama nembo yake kuashiria kuunganishwa kwa safu za utekelezaji na makubaliano. Tangu wakati huo, nembo zimechaguliwa isivyo rasmi kwa kila mgawanyiko na huonekana kama sanaa ya ASCII katika kumbukumbu za programu ya mteja wakati wa sasisho. Ni njia ya kufurahisha tu ya kusherehekea.

### Ni maboresho gani yanajumuishwa kwa ajili ya Uongezwaji wa L2? {#what-improvements-are-included-for-l2-scaling}

[PeerDAS](/roadmap/fusaka/peerdas) ndicho kipengele kikuu cha mgawanyiko. Inatekeleza uchukuaji wa sampuli za upatikanaji wa data (DAS) ambayo inafungua uwezekano wa kuongezeka zaidi kwa unda-mpya, kinadharia ikiongeza nafasi ya blob hadi mara 8 ya ukubwa wa sasa. Soko la ada za blob pia litaboreshwa ili kukabiliana na msongamano na kuhakikisha L2 zinalipa ada inayofaa kwa hesabu na nafasi ambayo blobs huweka kwenye nodi.

### Migawanyiko ya BPO ni tofauti vipi? {#how-are-bpo-forks-different}

Migawanyiko ya Vigezo vya Blob Pekee hutoa utaratibu wa kuongeza idadi ya blob (lengo na kiwango cha juu) baada ya PeerDAS kuanzishwa, bila kulazimika kusubiri sasisho kamili lililoratibiwa. Kila ongezeko huwekwa tayari katika matoleo ya programu za wateja yanayounga mkono Fusaka.

Kama mtumiaji au mthibitishaji, huhitaji kusasisha programu zako za wateja kwa kila BPO na hakikisha tu unafuata migawanyiko migumu mikuu kama Fusaka. Hii ni desturi ileile kama zamani, hakuna hatua maalum zinazohitajika. Bado inapendekezwa ufuatilie programu zako za wateja wakati wa masahisho na BPO na uzisasishe hata kati ya matoleo makuu kwani marekebisho au uboreshaji unaweza kufuata mgawanyiko mgumu.

### Ratiba ya BPO ni ipi? {#what-is-the-bpo-schedule}

Ratiba kamili ya sasisho za BPO itaamuliwa na matoleo ya Fusaka. Fuata [Matangazo ya Itifaki](https://blog.ethereum.org/category/protocol) na maelezo ya toleo ya programu zako za wateja.

Mfano wa jinsi inaweza kuonekana:

- Kabla ya Fusaka: lengo 6, kiwango cha juu 9
- Wakati wa uanzishaji wa Fusaka: lengo 6, kiwango cha juu 9
- BPO1, wiki chache baada ya uanzishaji wa Fusaka: lengo 10, kiwango cha juu 15, ikiongezeka kwa theluthi mbili
- BPO2, wiki chache baada ya BPO1: lengo 14, kiwango cha juu 21

### Je, hii itapunguza ada kwenye Ethereum (safu ya 1) {#will-this-lower-gas}

Sasisho hili halipunguzi ada za gesi kwenye L1, angalau si moja kwa moja. Lengo kuu ni nafasi zaidi ya blob kwa data ya unda-mpya, na hivyo kupunguza ada kwenye safu ya 2. Hii inaweza kuwa na madhara fulani kwenye soko la ada za L1 lakini hakuna mabadiliko makubwa yanayotarajiwa.

### Kama mweka dau, ninahitaji kufanya nini kwa ajili ya sasisho? {#as-a-staker-what-do-i-need-to-do-for-the-upgrade}

Kama ilivyo kwa kila sasisho la mtandao, hakikisha unasasisha programu zako za wateja kwa matoleo ya hivi karibuni yaliyotiwa alama ya usaidizi wa Fusaka. Fuata sasisho katika orodha ya barua pepe na [Matangazo ya Itifaki kwenye Blogu ya EF](https://blog.ethereum.org/category/protocol) ili kupata taarifa kuhusu matoleo.
Ili kuthibitisha usanidi wako kabla ya Fusaka kuanzishwa kwenye Mtandao Mkuu, unaweza kuendesha mthibitishaji kwenye mitandao ya majaribio. Fusaka [inaanzishwa mapema kwenye mitandao ya majaribio](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement) kukupa nafasi zaidi ya kuhakikisha kila kitu kinafanya kazi na kuripoti hitilafu. Migawanyiko ya mitandao ya majaribio pia hutangazwa kwenye orodha ya barua pepe na blogu.

### Je, "Mtazamo wa Mapendekezo Uliodhamiriwa" (EIP-7917) huathiri wathibitishaji? {#does-7917-affect-validators}

Mabadiliko haya hayabadilishi jinsi programu yako ya mteja ya mthibitishaji inavyofanya kazi, hata hivyo, yatatoa ufahamu zaidi kuhusu mustakabali wa majukumu yako ya uthibitishaji. Hakikisha unasasisha zana zako za ufuatiliaji ili uendane na vipengele vipya.

### Je, Fusaka inaathiri vipi mahitaji ya kipimo data kwa nodi na wathibitishaji? {#how-does-fusaka-affect-bandwidth-requirements-for-nodes-and-validators}

PeerDAS inafanya mabadiliko makubwa katika jinsi nodi zinavyosambaza data ya blob. Data zote zimegawanywa katika vipande vinavyoitwa safu katika mitandao midogo 128 na nodi hujisajili kwa baadhi tu. Idadi ya safu za mtandao mdogo ambazo nodi zinapaswa kuhifadhi inategemea usanidi wao na idadi ya wathibitishaji walioounganishwa. Mahitaji halisi ya kipimo data yatategemea kiasi cha blobs zinazoruhusiwa kwenye mtandao na aina ya nodi. Wakati wa uanzishaji wa Fusaka lengo la blob linabaki sawa na hapo awali, lakini kwa PeerDAS, waendeshaji wa nodi wanaweza kuona kupungua kwa matumizi yao ya diski ya blobs na trafiki ya mtandao. Kadri BPO zinavyosanidi idadi kubwa ya blobs kwenye mtandao, kipimo data kinachohitajika kitaongezeka kwa kila BPO.

Mahitaji ya nodi bado yako ndani ya [viwango vinavyopendekezwa](https://eips.ethereum.org/EIPS/eip-7870) hata baada ya BPO za Fusaka.

#### Nodi kamili {#full-nodes}

Nodi za kawaida zisizo na wathibitishaji wowote zitajisajili kwa mitandao midogo 4 tu, zikihifadhi 1/8 ya data asili. Hii inamaanisha kwamba kwa kiasi kile kile cha data ya blob, kipimo data cha nodi cha kuzipakua kitakuwa kidogo kwa mara nane (8). Matumizi ya diski na kipimo data cha upakuaji wa blobs kwa nodi kamili ya kawaida yanaweza kupungua karibu 80%, hadi Mb chache tu.

#### Weka dau binafsi {#solo-stakers}

Ikiwa nodi inatumiwa kwa programu ya mteja ya mthibitishaji, inapaswa kuhifadhi safu zaidi na hivyo kuchakata data zaidi. Kwa mthibitishaji aliyeongezwa, nodi hujisajili kwa angalau mitandao midogo 8 ya safu na hivyo kuchakata data mara mbili zaidi ya nodi ya kawaida lakini bado kidogo kuliko kabla ya Fusaka. Ikiwa salio la mthibitishaji liko juu ya ETH 287, mitandao midogo zaidi na zaidi itasajiliwa.

Kwa mweka dau pekee, hii inamaanisha matumizi yao ya diski na kipimo data cha upakuaji vitapungua karibu 50%. Hata hivyo, ili kujenga bloku kihalisi na kupakia blobs zote kwenye mtandao, kipimo data kikubwa zaidi cha upakiaji kinahitajika. Wajenzi wa kihalisi watahitaji kipimo data cha upakiaji cha juu mara 2-3 kuliko hapo awali wakati wa Fusaka na kwa lengo la BPO2 la blobs 15/21, kipimo data cha upakiaji cha mwisho kitahitajika kuwa karibu mara 5 zaidi, kwa 100Mpbs.

#### Wathibitishaji wakubwa {#large-validators}

Idadi ya mitandao midogo iliyosajiliwa huongezeka kulingana na salio na wathibitishaji walioongezwa kwenye nodi. Kwa mfano, karibu na salio la ETH 800, nodi huhifadhi safu 25 na itahitaji karibu 30% zaidi ya kipimo data cha upakuaji kuliko hapo awali. Upakiaji unaohitajika huongezeka sawa na nodi za kawaida na angalau 100Mbps inahitajika.

Kwa ETH 4096, wathibitishaji 2 wa salio la juu, nodi inakuwa 'supernode' ambayo huhifadhi safu zote, na hivyo kupakua na kuhifadhi kila kitu. Nodi hizi huponya mtandao kikamilifu kwa kuchangia data inayokosekana lakini pia zinahitaji kipimo data na hifadhi zaidi. Lengo la mwisho la blob likiwa mara 6 zaidi ya hapo awali, nodi kuu zitalazimika kuhifadhi karibu GB 600 za data ya ziada ya blob na kuwa na kipimo data cha upakuaji cha kasi endelevu cha karibu 20Mbps.

[Soma maelezo zaidi juu ya mahitaji yanayotarajiwa.](https://ethpandaops.io/posts/fusaka-bandwidth-estimation/#theoretical-requirements)

### Ni mabadiliko gani ya EVM yanayotekelezwa? {#what-evm-changes-are-implemented}

Fusaka inaimarisha EVM na mabadiliko madogo mapya na vipengele.

- Kwa usalama wakati wa kuongeza ukubwa, ukubwa wa juu wa muamala mmoja [utawekewa kikomo cha vitengo milioni 16.7](https://eips.ethereum.org/EIPS/eip-7825) vya gesi.
- [Opcode mpya ya kuhesabu sifuri zinazoongoza (CLZ)](https://eips.ethereum.org/EIPS/eip-7939) imeongezwa kwenye EVM na itaruhusu lugha za mikataba-erevu kufanya shughuli fulani kwa ufanisi zaidi.
- [Gharama ya precompile ya `ModExp` itaongezwa](https://eips.ethereum.org/EIPS/eip-7883)—mikataba inayoitumia itatoza gesi zaidi kwa utekelezaji.

### Je, kikomo kipya cha gesi cha milioni 16 kinaathirije wasanidi wa mikataba? {#how-does-new-16m-gas-limit-affects-contract-developers}

Fusaka inaweka kikomo cha [ukubwa wa juu wa muamala mmoja kuwa vitengo milioni 16.7](https://eips.ethereum.org/EIPS/eip-7825) (2^24) vya gesi. Huu ni takriban ukubwa wa awali wa bloku ya wastani ambayo inaufanya kuwa mkubwa kutosha kushughulikia miamala tata ambayo ingetumia bloku nzima. Kikomo hiki kinatoa ulinzi kwa programu za wateja, kuzuia mashambulizi yanayoweza kutokea ya DoS katika siku zijazo na kikomo cha juu cha gesi cha bloku. Lengo la kuongeza ukubwa ni kuwezesha miamala zaidi kuingia kwenye mnyororo wa bloku bila hata mmoja kutumia bloku nzima.

Miamala ya kawaida ya watumiaji iko mbali na kufikia kikomo hiki. Kesi fulani za pembezoni kama shughuli kubwa na tata za DeFi, uhamishaji mkubwa wa mikataba-erevu au miamala ya makundi inayolenga mikataba mingi inaweza kuathiriwa na mabadiliko haya. Miamala hii italazimika kugawanywa katika midogo zaidi au kuboreshwa kwa njia nyingine. Tumia uigaji kabla ya kuwasilisha miamala ambayo inaweza kufikia kikomo.

Mbinu ya RPC `eth_call` haina kikomo na itaruhusu uigaji wa miamala mikubwa kuliko kikomo halisi cha mnyororo wa bloku. Kikomo halisi cha mbinu za RPC kinaweza kusanidiwa na mwendeshaji wa programu ya mteja ili kuzuia matumizi mabaya.

### CLZ ina maana gani kwa wasanidi programu? {#what-clz-means-for-developers}

Wakusanyaji wa EVM kama Solidity watatekeleza na kutumia kazi mpya ya kuhesabu sifuri chinichini. Mikataba mipya inaweza kufaidika na uokoaji wa gesi ikiwa inategemea aina hii ya operesheni. Fuata matoleo na tangazo la kipengele cha lugha ya mikataba-erevu kwa nyaraka juu ya uwezekano wa kuokoa.

### Je, kuna mabadiliko yoyote kwa mikataba-erevu yangu iliyopo? {#what-clz-means-for-developers}

Fusaka haina athari ya moja kwa moja ambayo ingevunja mikataba yoyote iliyopo au kubadilisha tabia zao. Mabadiliko yaliyoletwa kwenye safu ya utekelezaji yanafanywa kwa utangamano wa nyuma, hata hivyo, daima weka jicho kwenye kesi za pembezoni na athari zinazowezekana.

[Kwa kuongezeka kwa gharama ya precompile ya `ModExp`](https://eips.ethereum.org/EIPS/eip-7883), mikataba inayotegemea itatumia gesi zaidi kwa utekelezaji. Ikiwa mkataba wako unategemea sana hii na unakuwa wa gharama kubwa kwa watumiaji, fikiria upya jinsi unavyotumika.

Fikiria [kikomo kipya cha milioni 16.7](https://eips.ethereum.org/EIPS/eip-7825) ikiwa miamala inayotekeleza mikataba yako inaweza kufikia ukubwa sawa.

## Usomaji zaidi {#further-reading}

- [Mpango kazi wa Ethereum](/roadmap/)
- [Forkcast: Fusaka](https://forkcast.org/upgrade/fusaka)
- [Fusaka Meta EIP](https://eips.ethereum.org/EIPS/eip-7607)
- [Tangazo la blogu la mtandao wa majaribio wa Fusaka](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)
- [Bankless: What Fusaka & Pectra will bring Ethereum](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless: Ethereum's Next Upgrades: Fusaka, Glamsterdam & Beyond with Preston Van Loon](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
- [Mafaili ya Fusaka](https://www.youtube.com/playlist?list=PL4cwHXAawZxpz-erUbKKUnnGoQNdF8s7Z)
- [PEEPanEIPs Imefafanuliwa](https://www.youtube.com/playlist?list=PL4cwHXAawZxoIenfk7OJry4rxcqX-eqBt)
