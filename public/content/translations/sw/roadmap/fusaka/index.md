---
title: "Fusaka 🦓"
metaTitle: Fulu-Osaka (Fusaka)
description: Jifunze kuhusu sasisho la itifaki ya Fusaka
lang: sw
authors: ["Nixo", "Mario Havel"]
---

**Sasisho la Fusaka la Ethereum lililokuwa likisubiriwa kwa hamu lilianza kutumika tarehe 3 Desemba 2025**

Sasisho la mtandao la Fusaka linafuata [Pectra](/roadmap/pectra/) na kuleta vipengele vipya zaidi na kuboresha matumizi kwa kila mtumiaji na msanidi wa [Ethereum](/). Jina hili linajumuisha sasisho la tabaka la utekelezaji la Osaka na toleo la tabaka la mwafaka lililopewa jina la nyota ya Fulu. Sehemu zote mbili za Ethereum zinapokea sasisho ambalo linasukuma uwezo wa kuongezeka, usalama na matumizi ya mtumiaji wa Ethereum kuelekea siku zijazo.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Sasisho la Fusaka ni hatua moja tu katika malengo ya maendeleo ya muda mrefu ya Ethereum. Jifunze zaidi kuhusu [ramani ya njia ya itifaki](/roadmap/) na [masasisho yaliyopita](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

<VideoWatch slug="fusaka-upgrade-explained" />

## Maboresho katika Fusaka {#improvements-in-fusaka}

### Kuongeza mablobu {#scale-blobs}

#### PeerDAS {#peerdas}

Hiki ndicho _kivutio kikuu_ cha mchepuo wa Fusaka, kipengele kikuu kilichoongezwa katika sasisho hili. Matabaka ya 2 (l2) kwa sasa huchapisha data zao kwenye Ethereum katika mablobu, aina ya data ya muda mfupi iliyoundwa mahususi kwa ajili ya matabaka ya 2 (l2). Kabla ya Fusaka, kila nodi kamili inapaswa kuhifadhi kila blobu ili kuhakikisha kuwa data ipo. Kadiri uwezo wa upitishaji wa blobu unavyoongezeka, kulazimika kupakua data hii yote kunakuwa na matumizi makubwa ya rasilimali yasiyoweza kuvumilika.

Pamoja na [uchukuaji sampuli wa upatikanaji wa data](https://notes.ethereum.org/@fradamt/das-fork-choice) , badala ya kulazimika kuhifadhi data zote za blobu, kila nodi itawajibika kwa sehemu ndogo ya data ya blobu. Mablobu yanasambazwa kwa usawa na kwa nasibu kwenye nodi katika mtandao huku kila nodi kamili ikishikilia 1/8 tu ya data, hivyo kuwezesha uwezo wa kuongezeka kinadharia hadi mara 8. Ili kuhakikisha upatikanaji wa data, sehemu yoyote ya data inaweza kujengwa upya kutoka kwa 50% yoyote iliyopo ya jumla kwa mbinu zinazopunguza uwezekano wa data isiyo sahihi au inayokosekana hadi kiwango kidogo sana cha kifumbaji (~moja katika 10<sup>20</sup> hadi moja katika 10<sup>24</sup>).

Hii huweka mahitaji ya maunzi na kipimo data kwa nodi kuwa yanayowezekana huku ikiwezesha kuongezeka kwa blobu na kusababisha uwezo zaidi wa kuongezeka kwa ada ndogo kwa matabaka ya 2 (l2).

[Jifunze zaidi kuhusu PeerDAS](/roadmap/fusaka/peerdas/)

**Rasilimali**:

- [Ufafanuzi wa kiufundi wa EIP-7594](https://eips.ethereum.org/EIPS/eip-7594)
- [DappLion kuhusu PeerDAS: Kuongeza Ethereum Leo | ETHSofia 2024](https://youtu.be/bONWd1x2TjQ?t=328)
- [Kitaaluma: Nyaraka za PeerDAS ya Ethereum (PDF)](https://eprint.iacr.org/2024/1362.pdf)

#### Michepuo ya Kigezo-cha-Blobu-Pekee {#blob-parameter-only-forks}

Matabaka ya 2 (l2) huongeza Ethereum - kadiri mitandao yao inavyokua, yanahitaji kuchapisha data zaidi kwenye Ethereum. Hii inamaanisha kuwa Ethereum itahitaji kuongeza idadi ya mablobu yanayopatikana kwao kadiri muda unavyosonga. Ingawa PeerDAS inawezesha kuongeza data ya blobu, inahitaji kufanywa hatua kwa hatua na kwa usalama.

Kwa sababu Ethereum ni msimbo unaoendeshwa kwenye maelfu ya nodi zinazojitegemea ambazo zinahitaji mwafaka juu ya sheria sawa, hatuwezi tu kuanzisha mabadiliko kama vile kuongeza idadi ya blobu kwa njia unayosambaza sasisho la tovuti. Mabadiliko yoyote ya sheria lazima yawe sasisho lililoratibiwa ambapo kila nodi, mteja na programu ya mthibitishaji inasasishwa kabla ya kitalu kile kile kilichoamuliwa mapema.

Masasisho haya yaliyoratibiwa kwa ujumla yanajumuisha mabadiliko mengi, yanahitaji majaribio mengi, na hilo huchukua muda. Ili kukabiliana haraka na mabadiliko ya mahitaji ya blobu ya tabaka la 2 (l2), michepuo ya kigezo cha blobu pekee huanzisha utaratibu wa kuongeza mablobu bila kulazimika kusubiri ratiba hiyo ya sasisho.

Michepuo ya kigezo cha blobu pekee inaweza kuwekwa na wateja, sawa na usanidi mwingine kama kikomo cha gesi. Kati ya masasisho makuu ya Ethereum, wateja wanaweza kukubaliana kuongeza mablobu ya `target` na `max` hadi k.m. 9 na 12 na kisha waendeshaji wa nodi watasasisha ili kushiriki katika mchepuo huo mdogo. Michepuo hii ya kigezo cha blobu pekee inaweza kusanidiwa wakati wowote.

Wakati mablobu yalipoongezwa kwa mara ya kwanza kwenye mtandao katika sasisho la Dencun, lengo lilikuwa 3. Hiyo iliongezwa hadi 6 katika Pectra na, baada ya Fusaka, hiyo sasa inaweza kuongezwa kwa kiwango endelevu bila kutegemea masasisho haya makuu ya mtandao.

![Chart showing average blob count per block and increasing targets with upgrades](./average-blob-count-per-block.webp)

Chanzo cha grafu: [Mablobu ya Ethereum - @hildobby, Dune Analytics](https://dune.com/hildobby/blobs)

**Rasilimali**: [Ufafanuzi wa kiufundi wa EIP-7892](https://eips.ethereum.org/EIPS/eip-7892)

#### Ada ya msingi ya blobu inayofungwa na gharama za utekelezaji {#blob-base-fee-bounded-by-execution-costs}

Matabaka ya 2 (l2) hulipa bili mbili yanapochapisha data: ada ya blob na gesi ya utekelezaji inayohitajika kuthibitisha mablobu hayo. Ikiwa gesi ya utekelezaji inatawala, mnada wa ada ya blob unaweza kushuka hadi Wei 1 na kuacha kuwa ishara ya bei.

EIP-7918 huweka bei ya akiba sawia chini ya kila blobu. Wakati akiba iko juu kuliko ada ya msingi ya blobu ya kawaida, algoriti ya kurekebisha ada huchukulia kitalu kama kilichozidi lengo na kuacha kusukuma ada chini na kuiruhusu kuongezeka kwa kawaida. Kama matokeo:

- soko la ada ya blob daima hujibu msongamano
- matabaka ya 2 (l2) hulipa angalau sehemu yenye maana ya ukokotoaji wanaolazimisha kwenye nodi
- kupanda kwa ada ya msingi kwenye tabaka la utekelezaji (EL) hakuwezi tena kukwaza ada ya blob kwa Wei 1

**Rasilimali**:

- [Ufafanuzi wa kiufundi wa EIP-7918](https://eips.ethereum.org/EIPS/eip-7918)
- [Kifafanuzi cha Storybook](https://notes.ethereum.org/@anderselowsson/AIG)

### Kuongeza L1 {#scale-l1}

#### Ukomo wa historia na risiti rahisi zaidi {#history-expiry}

Mnamo Julai 2025, wateja wa utekelezaji wa Ethereum [walianza kusaidia ukomo wa historia kwa kiasi](https://blog.ethereum.org/2025/07/08/partial-history-exp). Hii iliondoa historia ya zamani kuliko [Unganisho](https://ethereum.org/roadmap/merge/) ili kupunguza nafasi ya diski inayohitajika na waendeshaji wa nodi kadiri Ethereum inavyoendelea kukua.

EIP hii iko katika sehemu tofauti na "EIPs za Msingi" kwa sababu mchepuo hautekelezi mabadiliko yoyote - ni ilani kwamba timu za wateja lazima zisaidie ukomo wa historia ifikapo sasisho la Fusaka. Kivitendo, wateja wanaweza kutekeleza hili wakati wowote lakini kuliongeza kwenye sasisho kuliliweka wazi kwenye orodha yao ya mambo ya kufanya na kuwawezesha kujaribu mabadiliko ya Fusaka kwa kushirikiana na kipengele hiki.

**Rasilimali**: [Ufafanuzi wa kiufundi wa EIP-7642](https://eips.ethereum.org/EIPS/eip-7642)

#### Weka mipaka ya juu kwa MODEXP {#set-upper-bounds-for-modexp}

Hadi sasa, prikampaili ya MODEXP ilikubali nambari za karibu ukubwa wowote. Hiyo ilifanya iwe ngumu kujaribu, rahisi kutumia vibaya, na hatari kwa uthabiti wa mteja. EIP-7823 inaweka kikomo wazi: kila nambari ya ingizo inaweza kuwa na urefu wa biti 8192 (baiti 1024) zaidi. Chochote kikubwa zaidi kinakataliwa, gesi ya muamala inachomwa, na hakuna mabadiliko ya hali yanayotokea. Inashughulikia kwa urahisi sana mahitaji ya ulimwengu halisi huku ikiondoa visa vilivyokithiri ambavyo vilifanya upangaji wa kikomo cha gesi na ukaguzi wa usalama kuwa mgumu. Mabadiliko haya hutoa usalama zaidi na ulinzi wa DoS bila kuathiri matumizi ya mtumiaji au msanidi.

**Rasilimali**: [Ufafanuzi wa kiufundi wa EIP-7823](https://eips.ethereum.org/EIPS/eip-7823)

#### Ukomo wa Kikomo cha Gesi ya Muamala {#transaction-gas-limit-cap}

EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) inaongeza ukomo wa gesi 16,777,216 (2^24) kwa kila muamala. Ni uimarishaji wa DoS wa mapema kwa kufunga gharama ya hali mbaya zaidi ya muamala wowote mmoja tunapoongeza kikomo cha gesi cha kitalu. Inafanya uthibitishaji na usambazaji kuwa rahisi kuiga ili kuturuhusu kushughulikia uwezo wa kuongezeka kupitia kuongeza kikomo cha gesi.

Kwa nini hasa gesi 2^24? Ni ndogo kwa urahisi kuliko kikomo cha gesi cha leo, ni kubwa vya kutosha kwa usambazaji wa mkataba halisi na prikampaili nzito, na kipeo cha 2 hufanya iwe rahisi kutekeleza kwa wateja wote. Ukubwa huu mpya wa juu wa muamala ni sawa na ukubwa wa wastani wa kitalu kabla ya Pectra, na kuifanya kuwa kikomo kinachofaa kwa operesheni yoyote kwenye Ethereum.

**Rasilimali**: [Ufafanuzi wa kiufundi wa EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)

#### Ongezeko la gharama ya gesi ya `MODEXP` {#modexp-gas-cost-increase}

MODEXP ni chaguo la kukokotoa lililojengewa ndani la prikampaili ambalo hukokotoa kipeo cha moduli, aina ya hesabu ya nambari kubwa inayotumika katika uthibitishaji wa sahihi wa RSA na mifumo ya uthibitisho. Inaruhusu mikataba kuendesha hesabu hizi moja kwa moja bila kulazimika kuzitekeleza zenyewe.

Wasanidi na timu za wateja walitambua MODEXP kama kikwazo kikuu cha kuongeza kikomo cha gesi cha kitalu kwa sababu upangaji wa bei wa gesi wa sasa mara nyingi hudharau ni kiasi gani cha nguvu ya ukokotoaji kinachohitajika na baadhi ya ingizo. Hii inamaanisha muamala mmoja unaotumia MODEXP unaweza kuchukua muda mwingi unaohitajika kuchakata kitalu kizima, na kupunguza kasi ya mtandao.

EIP hii inabadilisha upangaji wa bei ili kuendana na gharama halisi za ukokotoaji kwa:

- kuongeza malipo ya chini kutoka gesi 200 hadi 500 na kuondoa punguzo la theluthi moja kutoka EIP-2565 kwenye hesabu ya gharama ya jumla
- kuongeza gharama kwa kasi zaidi wakati ingizo la kipeo ni refu sana. ikiwa kipeo (nambari ya "nguvu" unayopitisha kama hoja ya pili) ni ndefu zaidi ya baiti 32 / biti 256, malipo ya gesi hupanda haraka sana kwa kila baiti ya ziada
- kutoza msingi mkubwa au moduli ya ziada pia. Nambari zingine mbili (msingi na moduli) zinachukuliwa kuwa angalau baiti 32 - ikiwa mojawapo ni kubwa zaidi, gharama hupanda kulingana na ukubwa wake

Kwa kulinganisha vyema gharama na muda halisi wa kuchakata, MODEXP haiwezi tena kusababisha kitalu kuchukua muda mrefu sana kuthibitisha. Mabadiliko haya ni mojawapo ya kadhaa yanayolenga kuifanya iwe salama kuongeza kikomo cha gesi cha kitalu cha Ethereum katika siku zijazo.

**Rasilimali**: [Ufafanuzi wa kiufundi wa EIP-7883](https://eips.ethereum.org/EIPS/eip-7883)

#### Kikomo cha Ukubwa wa Kitalu cha Utekelezaji cha RLP {#rlp-execution-block-size-limit}

Hii inaunda ukomo wa jinsi kitalu kinaruhusiwa kuwa kikubwa - hiki ni kikomo cha kile _kinachotumwa_ kwenye mtandao na ni tofauti na kikomo cha gesi, ambacho kinapunguza _kazi_ ndani ya kitalu. Ukomo wa ukubwa wa kitalu ni MiB 10, na kibali kidogo (MiB 2) kilichotengwa kwa ajili ya data ya mwafaka ili kila kitu kitoshee na kusambaa vizuri. Ikiwa kitalu kitaonekana kikubwa zaidi ya hapo, wateja wanakikataa.
Hii inahitajika kwa sababu vitalu vikubwa sana huchukua muda mrefu kuenea na kuthibitisha kwenye mtandao na vinaweza kuunda masuala ya mwafaka au kutumiwa vibaya kama vekta ya DoS. Pia, usambazaji wa taarifa wa tabaka la mwafaka tayari hautasambaza vitalu zaidi ya ~MiB 10, kwa hivyo kuoanisha tabaka la utekelezaji na kikomo hicho huepuka hali za ajabu za "kuonekana na wengine, kuachwa na wengine".

Kwa undani: huu ni ukomo wa ukubwa wa kitalu cha utekelezaji kilichosimbwa kwa [RLP](/developers/docs/data-structures-and-encoding/rlp/). Jumla ya MiB 10, na ukingo wa usalama wa MiB 2 uliotengwa kwa ajili ya uundaji wa kitalu cha beacon. Kivitendo, wateja hufafanua

`MAX_BLOCK_SIZE = 10,485,760` baiti na

`SAFETY_MARGIN = 2,097,152` baiti,

na kukataa kitalu chochote cha utekelezaji ambacho mzigo wake wa RLP unazidi

`MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`

Lengo ni kufunga muda wa usambazaji/uthibitishaji wa hali mbaya zaidi na kuoanisha na tabia ya usambazaji wa taarifa ya tabaka la mwafaka, kupunguza hatari ya upangaji upya/DoS bila kubadilisha uhasibu wa gesi.

**Rasilimali**: [Ufafanuzi wa kiufundi wa EIP-7934](https://eips.ethereum.org/EIPS/eip-7934)

#### Weka kikomo cha gesi cha msingi kuwa milioni 60 {#set-default-gas-limit-to-60-million}

Kabla ya kuongeza kikomo cha gesi kutoka 30M hadi 36M mnamo Februari 2025 (na baadaye hadi 45M), thamani hii haikuwa imebadilika tangu Unganisho (Septemba 2022). EIP hii inalenga kufanya uwezo wa kuongezeka thabiti kuwa kipaumbele.

EIP-7935 inaratibu timu za wateja wa EL ili kuongeza kikomo cha gesi cha msingi juu ya 45M ya leo kwa Fusaka. Ni EIP ya Taarifa, lakini inauliza waziwazi wateja kujaribu vikomo vya juu kwenye mitandao ya wasanidi, kukubaliana juu ya thamani salama, na kusafirisha nambari hiyo katika matoleo yao ya Fusaka.

Upangaji wa mtandao wa wasanidi unalenga mkazo wa ~60M (vitalu kamili vilivyo na mzigo wa kutengenezwa) na ongezeko la mara kwa mara; utafiti unasema matatizo ya ukubwa wa kitalu ya hali mbaya zaidi hayapaswi kufunga chini ya ~150M. Usambazaji unapaswa kuoanishwa na ukomo wa kikomo cha gesi cha muamala (EIP-7825) ili hakuna muamala mmoja unaoweza kutawala kadiri vikomo vinavyoongezeka.

**Rasilimali**: [Ufafanuzi wa kiufundi wa EIP-7935](https://eips.ethereum.org/EIPS/eip-7935)

### Kuboresha UX {#improve-ux}

#### Mtazamo wa mbele wa mpendekezaji unaotabirika {#deterministic-proposer-lookahead}

Pamoja na EIP-7917, Mnyororo wa Beacon utafahamu wapendekezaji wa kitalu wajao kwa kipindi kijacho. Kuwa na mtazamo unaotabirika kuhusu wathibitishaji gani watapendekeza vitalu vya baadaye kunaweza kuwezesha [uthibitishaji wa awali](https://ethresear.ch/t/based-preconfirmations/17353) - ufungamanisho na mpendekezaji ujao ambao unahakikisha muamala wa mtumiaji utajumuishwa kwenye kitalu chao bila kusubiri kitalu halisi.

Kipengele hiki kinanufaisha utekelezaji wa mteja na usalama wa mtandao kwani kinazuia visa vya ukingoni ambapo wathibitishaji wanaweza kuchezea ratiba ya mpendekezaji. Mtazamo wa mbele pia unaruhusu utata mdogo wa utekelezaji.

**Rasilimali**: [Ufafanuzi wa kiufundi wa EIP-7917](https://eips.ethereum.org/EIPS/eip-7917)

#### Msimbo wa operesheni wa kuhesabu sifuri zinazoongoza (CLZ) {#count-leading-zeros-opcode}

Kipengele hiki kinaongeza maagizo madogo ya EVM, **kuhesabu sifuri zinazoongoza (CLZ)**. Karibu kila kitu katika EVM kinawakilishwa kama thamani ya biti 256—msimbo huu mpya wa operesheni unarudisha ni biti ngapi za sifuri ziko mbele. Hiki ni kipengele cha kawaida katika usanifu mwingi wa seti za maagizo kwani kinawezesha operesheni za hesabu zenye ufanisi zaidi. Kivitendo hii inakusanya uchanganuzi wa biti wa leo unaofanywa kwa mkono kuwa hatua moja, kwa hivyo kupata biti ya kwanza iliyowekwa, kuchanganua baiti, au kuchanganua nyanja za biti inakuwa rahisi na nafuu zaidi. Msimbo wa operesheni ni wa chini, wa gharama isiyobadilika na umepimwa kuwa sawa na nyongeza ya msingi, ambayo hupunguza msimbo wa baiti na kuokoa gesi kwa kazi sawa.

**Rasilimali**: [Ufafanuzi wa kiufundi wa EIP-7939](https://eips.ethereum.org/EIPS/eip-7939)

#### Prikampaili kwa Usaidizi wa Curve ya secp256r1 {#secp256r1-precompile}

Inaanzisha kikagua sahihi cha secp256r1 (P-256) kilichojengewa ndani, cha mtindo wa kifunguo kwenye anwani isiyobadilika `0x100` kwa kutumia muundo sawa wa wito ambao tayari umepitishwa na matabaka ya 2 (l2) mengi na kurekebisha visa vya ukingoni, kwa hivyo mikataba iliyoandikwa kwa mazingira hayo inafanya kazi kwenye tabaka la 1 (l1) bila mabadiliko.

Sasisho la UX! Kwa watumiaji, hii inafungua usaini wa asili wa kifaa na vifunguo. Pochi zinaweza kutumia Apple Secure Enclave, Hifadhi ya funguo ya Android, moduli za usalama za maunzi (HSMs), na FIDO2/WebAuthn moja kwa moja - hakuna kirai cha mbegu, uingizaji rahisi zaidi, na mtiririko wa vipengele vingi unaohisi kama programu za kisasa. Hii inasababisha UX bora, urejeshaji rahisi, na mifumo ya udhanifu wa akaunti inayolingana na kile ambacho mabilioni ya vifaa tayari yanafanya.

Kwa wasanidi, inachukua ingizo la baiti 160 na kurudisha towe la baiti 32, na kuifanya iwe rahisi kuhamisha maktaba zilizopo na mikataba ya tabaka la 2 (l2). Kwa ndani, inajumuisha ukaguzi wa pointi-kwenye-ukomo na ulinganisho wa moduli ili kuondoa visa vya ukingoni vyenye hila bila kuvunja wapigaji halali.

**Rasilimali**:

- [Ufafanuzi wa kiufundi wa EIP-7951](https://eips.ethereum.org/EIPS/eip-7951)
- [Zaidi kuhusu RIP-7212](https://www.alchemy.com/blog/what-is-rip-7212) _(Kumbuka kwamba EIP-7951 ilichukua nafasi ya RIP-7212)_

### Meta {#meta}

#### Mbinu ya JSON-RPC ya `eth_config` {#eth-config}

Huu ni wito wa JSON-RPC unaokuruhusu kuuliza nodi yako ni mipangilio gani ya mchepuo unayoendesha. Inarudisha picha tatu: `current`, `next`, & `last` ili wathibitishaji na zana za ufuatiliaji waweze kuthibitisha kuwa wateja wamepangwa kwa mchepuo ujao.

Kivitendo, hii ni kushughulikia upungufu uliogunduliwa wakati mchepuo wa Pectra ulipoanza kutumika kwenye mtandao wa majaribio wa Holesky mapema 2025 na usanidi mdogo usio sahihi ambao ulisababisha hali isiyokamilika. Hii inasaidia timu za majaribio na wasanidi kuhakikisha kuwa michepuo mikuu itafanya kazi kama inavyotarajiwa wakati wa kuhama kutoka mitandao ya wasanidi hadi mitandao ya majaribio, na kutoka mitandao ya majaribio hadi Mtandao Mkuu.

Picha zinajumuisha: `chainId`, `forkId`, muda uliopangwa wa uanzishaji wa mchepuo, ni prikampaili zipi zinazofanya kazi, anwani za prikampaili, utegemezi wa mkataba wa mfumo, na ratiba ya blobu ya mchepuo.

EIP hii iko katika sehemu tofauti na "EIPs za Msingi" kwa sababu mchepuo hautekelezi mabadiliko yoyote - ni ilani kwamba timu za wateja lazima zitekeleze mbinu hii ya JSON-RPC ifikapo sasisho la Fusaka.

**Rasilimali**: [Ufafanuzi wa kiufundi wa EIP-7910](https://eips.ethereum.org/EIPS/eip-7910)

## Maswali Yanayoulizwa Mara kwa Mara {#faq}

### Je, sasisho hili linaathiri nodi na wathibitishaji wote wa Ethereum? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

Ndiyo, sasisho la Fusaka linahitaji masasisho kwa [wateja wa utekelezaji na wateja wa mwafaka](/developers/docs/nodes-and-clients/). Wateja wote wakuu wa Ethereum watatoa matoleo yanayosaidia mchepuo mgumu yaliyowekwa alama kama kipaumbele cha juu. Unaweza kufuatilia wakati matoleo haya yatapatikana katika hazina za GitHub za wateja, [chaneli zao za Discord](https://ethstaker.org/support), [Discord ya EthStaker](https://dsc.gg/ethstaker), au kwa kujiandikisha kwenye blogu ya Ethereum kwa masasisho ya itifaki. Ili kudumisha usawazishaji na mtandao wa Ethereum baada ya sasisho, waendeshaji wa nodi lazima wahakikishe wanaendesha toleo la mteja linaloungwa mkono. Kumbuka kwamba taarifa kuhusu matoleo ya mteja inategemea wakati, na watumiaji wanapaswa kurejelea masasisho ya hivi punde kwa maelezo ya sasa zaidi.

### Je, ETH inawezaje kubadilishwa baada ya mchepuo mgumu? {#how-can-eth-be-converted-after-the-hardfork}

- **Hakuna Hatua Inayohitajika kwa ETH Yako**: Kufuatia sasisho la Fusaka la Ethereum, hakuna haja ya kubadilisha au kusasisha ETH yako. Salio la akaunti yako litabaki vile vile, na ETH unayoshikilia kwa sasa itaendelea kupatikana katika muundo wake uliopo baada ya mchepuo mgumu.
- **Jihadhari na Utapeli!** <Emoji text="⚠️" /> **mtu yeyote anayekuelekeza "kusasisha" ETH yako anajaribu kukutapeli.** Hakuna unachohitaji kufanya kuhusiana na sasisho hili. Mali zako zitabaki bila kuathiriwa kabisa. Kumbuka, kukaa na taarifa ni ulinzi bora dhidi ya utapeli.

[Zaidi kuhusu kutambua na kuepuka utapeli](/security/)

### Kuna nini kuhusu punda milia? <Emoji text="🦓" /> {#whats-with-the-zebras}

Punda milia ni "kibonzo" kilichochaguliwa na wasanidi wa Fusaka kwa sababu mistari yake inaonyesha uchukuaji sampuli wa upatikanaji wa data unaotegemea safu wima wa PeerDAS, ambapo nodi huhifadhi vijitandao fulani vya safu wima na kuchukua sampuli za safu wima chache kutoka kwa kila sloti ya wenzao ili kuangalia kuwa data ya blobu inapatikana.

Unganisho mnamo 2022 [lilitumia panda](https://x.com/hwwonx/status/1431970802040127498) kama kibonzo chake kuashiria kuunganishwa kwa tabaka la utekelezaji na tabaka la mwafaka. Tangu wakati huo, vibonzo vimechaguliwa kwa njia isiyo rasmi kwa kila mchepuo na huonekana kama sanaa ya ASCII katika kumbukumbu za mteja wakati wa sasisho. Ni njia ya kufurahisha tu ya kusherehekea.

### Ni maboresho gani yamejumuishwa kwa Kuongeza L2? {#what-improvements-are-included-for-l2-scaling}

[PeerDAS](/roadmap/fusaka/peerdas) ndicho kipengele kikuu cha mchepuo. Inatekeleza uchukuaji sampuli wa upatikanaji wa data (DAS) ambao unafungua uwezo zaidi wa kuongezeka kwa mikusanyiko, kinadharia kuongeza nafasi ya blobu hadi mara 8 ya ukubwa wa sasa. Soko la ada ya blob pia litaboreshwa ili kujibu kwa ufanisi msongamano na kuhakikisha matabaka ya 2 (l2) yanalipa ada yenye maana kwa ukokotoaji na nafasi ambayo mablobu huweka kwenye nodi.

### Je, michepuo ya BPO ni tofauti vipi? {#how-are-bpo-forks-different}

Michepuo ya Kigezo cha Blobu Pekee hutoa utaratibu wa kuendelea kuongeza idadi ya blobu (lengo na kiwango cha juu) baada ya PeerDAS kuanzishwa, bila kulazimika kusubiri sasisho kamili lililoratibiwa. Kila ongezeko limewekwa kwa msimbo mgumu ili kusanidiwa mapema katika matoleo ya mteja yanayosaidia Fusaka.

Kama mtumiaji au mthibitishaji, huhitaji kusasisha wateja wako kwa kila BPO na hakikisha tu unafuata michepuo migumu mikuu kama Fusaka. Hii ni desturi sawa na hapo awali, hakuna hatua maalum zinazohitajika. Bado inashauriwa kufuatilia wateja wako karibu na masasisho na BPO na kuwasasisha hata kati ya matoleo makuu kwani marekebisho au uboreshaji unaweza kufuata mchepuo mgumu.

### Ratiba ya BPO ni ipi? {#what-is-the-bpo-schedule}

Ratiba kamili ya masasisho ya BPO itabainishwa na matoleo ya Fusaka. Fuata [Matangazo ya Itifaki](https://blog.ethereum.org/category/protocol) na maelezo ya toleo la wateja wako.

Mfano wa jinsi inavyoweza kuonekana:

- Kabla ya Fusaka: lengo 6, kiwango cha juu 9
- Wakati wa uanzishaji wa Fusaka: lengo 6, kiwango cha juu 9
- BPO1, wiki chache baada ya uanzishaji wa Fusaka: lengo 10, kiwango cha juu 15, ikiongezeka kwa theluthi mbili
- BPO2, wiki chache baada ya BPO1: lengo 14, kiwango cha juu 21

### Je, hii itapunguza ada kwenye Ethereum (tabaka la 1) {#will-this-lower-gas}

Sasisho hili halipunguzi ada za gesi kwenye tabaka la 1 (l1), angalau si moja kwa moja. Lengo kuu ni nafasi zaidi ya blobu kwa data ya rollup, kwa hivyo kupunguza ada kwenye tabaka la 2 (l2). Hii inaweza kuwa na athari fulani kwenye soko la ada la tabaka la 1 (l1) lakini hakuna mabadiliko makubwa yanayotarajiwa.

### Kama mweka dhamana, ninahitaji kufanya nini kwa sasisho? {#as-a-staker-what-do-i-need-to-do-for-the-upgrade}

Kama ilivyo kwa kila sasisho la mtandao, hakikisha unasasisha wateja wako kwa matoleo ya hivi punde yaliyowekwa alama ya usaidizi wa Fusaka. Fuata masasisho katika orodha ya barua pepe na [Matangazo ya Itifaki kwenye Blogu ya EF](https://blog.ethereum.org/category/protocol) ili kupata taarifa kuhusu matoleo.
Ili kuthibitisha usanidi wako kabla ya Fusaka kuanzishwa kwenye Mtandao Mkuu, unaweza kuendesha mthibitishaji kwenye mitandao ya majaribio. Fusaka [inaanzishwa mapema kwenye mitandao ya majaribio](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement) ikikupa nafasi zaidi ya kuhakikisha kila kitu kinafanya kazi na kuripoti hitilafu. Michepuo ya mtandao wa majaribio pia inatangazwa katika orodha ya barua pepe na blogu.

### Je, "Mtazamo wa mbele wa Mpendekezaji unaotabirika" (EIP-7917) unaathiri wathibitishaji? {#does-7917-affect-validators}

Mabadiliko haya hayabadilishi jinsi mteja wako wa mthibitishaji anavyofanya kazi, hata hivyo, yatatoa ufahamu zaidi kuhusu mustakabali wa majukumu yako ya mthibitishaji. Hakikisha unasasisha zana zako za ufuatiliaji ili kuendana na vipengele vipya.

### Je, Fusaka inaathiri vipi mahitaji ya kipimo data kwa nodi na wathibitishaji? {#how-does-fusaka-affect-bandwidth-requirements-for-nodes-and-validators}

PeerDAS inafanya mabadiliko makubwa katika jinsi nodi zinavyosambaza data ya blobu. Data yote imegawanywa katika vipande vinavyoitwa safu wima kwenye vijitandao 128 huku nodi zikijiandikisha kwa baadhi yao tu. Kiasi cha safu wima za kijitandao ambazo nodi zinapaswa kuhifadhi inategemea usanidi wao na idadi ya wathibitishaji waliounganishwa. Mahitaji halisi ya kipimo data yatategemea kiasi cha mablobu yanayoruhusiwa kwenye mtandao na aina ya nodi. Wakati wa uanzishaji wa Fusaka lengo la blobu linabaki sawa na hapo awali, lakini kwa PeerDAS, waendeshaji wa nodi wanaweza kuona kupungua kwa matumizi yao ya diski ya mablobu na trafiki ya mtandao. Kadiri BPO zinavyosanidi idadi kubwa ya mablobu kwenye mtandao, kipimo data kinachohitajika kitaongezeka kwa kila BPO.

Mahitaji ya nodi bado yako ndani ya [ukingo uliopendekezwa](https://eips.ethereum.org/EIPS/eip-7870) hata baada ya BPO za Fusaka.

#### Nodi kamili {#full-nodes}

Nodi za kawaida zisizo na wathibitishaji wowote zitajiandikisha kwa vijitandao 4 tu, zikitoa hifadhi kwa 1/8 ya data asili. Hii inamaanisha kuwa kwa kiasi sawa cha data ya blobu, kipimo data cha nodi cha kuzipakua kitakuwa kidogo kwa sababu ya nane (8). Matumizi ya diski na kipimo data cha kupakua cha mablobu kwa nodi kamili ya kawaida kinaweza kupungua karibu 80%, hadi Mb chache tu.

#### Waweka dhamana wa pekee {#solo-stakers}

Ikiwa nodi inatumika kwa mteja wa mthibitishaji, inapaswa kuhifadhi safu wima zaidi na kwa hivyo kuchakata data zaidi. Pamoja na mthibitishaji kuongezwa, nodi hujiandikisha kwa angalau vijitandao 8 vya safu wima na kwa hivyo huchakata data mara mbili zaidi ya nodi ya kawaida lakini bado ni chini ya kabla ya Fusaka. Ikiwa salio la mthibitishaji liko juu ya ETH 287, vijitandao zaidi na zaidi vitajiandikishwa.

Kwa mweka dhamana wa pekee, hii inamaanisha matumizi yao ya diski na kipimo data cha kupakua kitapungua karibu 50%. Hata hivyo ili kujenga vitalu ndani ya nchi na kupakia mablobu yote kwenye mtandao, kipimo data zaidi cha kupakia kinahitajika. Wajenzi wa ndani watahitaji kipimo data cha kupakia mara 2-3 zaidi kuliko hapo awali wakati wa Fusaka na kwa lengo la BPO2 la mablobu 15/21, kipimo data cha mwisho cha kupakia kinachohitajika kitapaswa kuwa karibu mara 5 zaidi, kwa 100Mpbs.

#### Wathibitishaji wakubwa {#large-validators}

Idadi ya vijitandao vilivyojiandikishwa inakua na salio zaidi na wathibitishaji kuongezwa kwenye nodi. Kwa mfano, karibu salio la ETH 800, nodi huhifadhi safu wima 25 na itahitaji karibu 30% zaidi ya kipimo data cha kupakua kuliko hapo awali. Upakiaji unaohitajika hupanda sawa na nodi za kawaida na angalau 100Mbps inahitajika.

Kwa ETH 4096, wathibitishaji 2 wa salio la juu, nodi inakuwa 'nodi kuu' ambayo huhifadhi safu wima zote, kwa hivyo hupakua na kuhifadhi kila kitu. Nodi hizi huponya mtandao kikamilifu kwa kuchangia data inayokosekana lakini pia inahitaji kipimo data na hifadhi zaidi. Huku lengo la mwisho la blobu likiwa mara 6 zaidi ya hapo awali, nodi kuu zitalazimika kuhifadhi karibu 600GB ya data ya ziada ya blobu na kuwa na kipimo data cha kupakua cha haraka zaidi kwa karibu 20Mbps.

[Soma maelezo zaidi kuhusu mahitaji yanayotarajiwa.](https://ethpandaops.io/posts/fusaka-bandwidth-estimation/#theoretical-requirements)

### Ni mabadiliko gani ya EVM yanatekelezwa? {#what-evm-changes-are-implemented}

Fusaka inaimarisha EVM na mabadiliko mapya madogo na vipengele.

- Kwa usalama wakati wa kuongeza, ukubwa wa juu wa muamala mmoja [utapunguzwa hadi milioni 16.7](https://eips.ethereum.org/EIPS/eip-7825) za vitengo vya gesi.
- [Msimbo mpya wa operesheni wa kuhesabu sifuri zinazoongoza (CLZ)](https://eips.ethereum.org/EIPS/eip-7939) umeongezwa kwenye EVM na utawezesha lugha za mkataba mahiri kufanya operesheni fulani kwa ufanisi zaidi.
- [Gharama ya prikampaili ya `ModExp` itaongezwa](https://eips.ethereum.org/EIPS/eip-7883)—mikataba inayoitumia itatoza gesi zaidi kwa utekelezaji.

### Je, kikomo kipya cha gesi cha 16M kinaathiri vipi wasanidi wa mkataba? {#how-does-new-16m-gas-limit-affects-contract-developers}

Fusaka inaanzisha kikomo kwa [ukubwa wa juu wa muamala mmoja hadi milioni 16.7](https://eips.ethereum.org/EIPS/eip-7825) (2^24) za vitengo vya gesi. Huu ni takriban ukubwa wa awali wa kitalu cha wastani ambacho kinaifanya iwe kubwa vya kutosha kuchukua miamala tata ambayo ingetumia kitalu kizima. Kikomo hiki kinaunda ulinzi kwa wateja, kuzuia mashambulizi yanayowezekana ya DoS katika siku zijazo na kikomo cha juu cha gesi cha kitalu. Lengo la kuongeza ni kuwezesha miamala zaidi kuingia kwenye mnyororo wa vitalu bila mmoja kutumia kitalu kizima.

Miamala ya kawaida ya mtumiaji iko mbali na kufikia kikomo hiki. Baadhi ya visa vya ukingoni kama operesheni kubwa na tata za fedha zilizogatuliwa (DeFi), usambazaji mkubwa wa mkataba mahiri au miamala ya kundi inayolenga mikataba mingi inaweza kuathiriwa na mabadiliko haya. Miamala hii itabidi igawanywe katika midogo zaidi au kuboreshwa kwa njia nyingine. Tumia uigaji kabla ya kuwasilisha miamala ambayo inaweza kufikia kikomo.

Mbinu ya RPC ya `eth_call` haina kikomo na itaruhusu uigaji wa miamala mikubwa zaidi kuliko kikomo halisi cha mnyororo wa vitalu. Kikomo halisi cha mbinu za RPC kinaweza kusanidiwa na mwendeshaji wa mteja ili kuhakikisha kuzuia matumizi mabaya.

### CLZ inamaanisha nini kwa wasanidi? {#what-clz-means-for-developers}

Vikusanyaji vya EVM kama Solidity vitatekeleza na kutumia chaguo jipya la kukokotoa kwa kuhesabu sifuri kwa ndani. Mikataba mipya inaweza kunufaika kutokana na uokoaji wa gesi ikiwa inategemea aina hii ya operesheni. Fuata matoleo na tangazo la kipengele cha lugha ya mkataba mahiri kwa nyaraka kuhusu uokoaji unaowezekana.

### Je, kuna mabadiliko yoyote kwa mikataba yangu mahiri iliyopo? {#what-clz-means-for-developers-2}

Fusaka haina athari ya moja kwa moja ambayo ingevunja mikataba yoyote iliyopo au kubadilisha tabia zao. Mabadiliko yaliyoletwa kwenye tabaka la utekelezaji yanafanywa kwa utangamano wa nyuma, hata hivyo, daima weka jicho kwenye visa vya ukingoni na athari zinazowezekana.

[Pamoja na ongezeko la gharama ya prikampaili ya `ModExp`](https://eips.ethereum.org/EIPS/eip-7883), mikataba inayoitegemea itatumia gesi zaidi kwa utekelezaji. Ikiwa mkataba wako unategemea sana hii na kuwa ghali zaidi kwa watumiaji, fikiria upya jinsi inavyotumika.

Fikiria [kikomo kipya cha milioni 16.7](https://eips.ethereum.org/EIPS/eip-7825) ikiwa miamala inayotekeleza mikataba yako inaweza kuwa inafikia ukubwa sawa.

## Usomaji zaidi {#further-reading}

- [Ramani ya njia ya Ethereum](/roadmap/)
- [Forkcast: Fusaka](https://forkcast.org/upgrade/fusaka)
- [Meta EIP ya Fusaka](https://eips.ethereum.org/EIPS/eip-7607)
- [Tangazo la blogu la mtandao wa majaribio wa Fusaka](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)
- [Bankless: Kile Fusaka na Pectra zitaleta kwa Ethereum](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless: Masasisho Yajayo ya Ethereum: Fusaka, Glamsterdam na Zaidi na Preston Van Loon](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
- [Faili za Fusaka](https://www.youtube.com/playlist?list=PL4cwHXAawZxpz-erUbKKUnnGoQNdF8s7Z)
- [PEEPanEIPs Zimefafanuliwa](https://www.youtube.com/playlist?list=PL4cwHXAawZxoIenfk7OJry4rxcqX-eqBt)