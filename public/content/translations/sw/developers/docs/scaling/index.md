---
title: Uongezwaji
description: Utangulizi wa chaguzi tofauti za kuongeza viwango zinazoendelezwa sasa na jumuiya ya Ethereum.
lang: sw
sidebarDepth: 3
---

## Muhtasari wa uongezwaji {#scaling-overview}

Kwa kuwa idadi ya watu wanaotumia Ethereum imeongezeka, blockchain imefikia mapungufu fulani ya uwezo. Hii imeongeza gharama ya kutumia mtandao, na kujenga hitaji la "suluhisho za kuongeza kiwango." Kuna masuluhisho mengi yanayofanyiwa utafiti, kujaribiwa na kutekelezwa ambayo huchukua mbinu tofauti kufikia malengo sawa.

Lengo kuu la uwezo wa kuongezeka ni kuongeza kasi ya muamala (mwisho wa haraka) na upitishaji wa miamala (idadi kubwa ya miamala kwa sekunde) bila kuathiri ugatuzi au usalama. Kwenye mnyororo wa bloku wa safu ya 1 ya Ethereum, mahitaji makubwa husababisha miamala ya polepole na [bei za gesi](/developers/docs/gas/) zisizowezekana. Kuongeza uwezo wa mtandao kwa suala la kasi na upitishaji ni msingi wa kupitishwa kwa maana na kwa wingi kwa Ethereum.

Ingawa kasi na matokeo ni muhimu, ni muhimu kwamba masuluhisho ya kuongeza viwango yanayowezesha malengo haya yabaki yakiwa yamegawanywa na salama. Kuweka kizuizi cha kuingia kwa waendeshaji wa nodi kuwa chini ni muhimu katika kuzuia maendeleo kuelekea nguvu ya kompyuta ya kati na isiyo salama.

Kimsingi, kwanza tunaainisha uongezwaji kama uongezwaji wa onchain au uongezwaji wa offchain.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuwa na uelewa mzuri wa mada zote za msingi. Utekelezaji wa suluhisho za uongezwaji ni wa hali ya juu kwani teknolojia haijajaribiwa sana, na inaendelea kutafitiwa na kuendelezwa.

## Uongezwaji wa Onchain {#onchain-scaling}

Uongezwaji wa Onchain unahitaji mabadiliko kwenye itifaki ya Ethereum (safu ya 1 ya [Mtandao Mkuu](/glossary/#mainnet)). Kwa muda mrefu, ugawanyaji wa mnyororo wa bloku ulitarajiwa kuongeza Ethereum. Hii ingehusisha kugawanya mnyororo wa bloku katika vipande tofauti (shards) ili kuthibitishwa na vikundi vidogo vya wathibitishaji. Hata hivyo, uongezwaji kwa kutumia unda-mpya za safu-2 umechukua nafasi kama mbinu ya msingi ya uongezwaji. Hili linaungwa mkono na nyongeza ya aina mpya ya data ya bei nafuu iliyoambatishwa kwenye bloku za Ethereum ambayo imeundwa mahususi kufanya unda-mpya ziwe nafuu kwa watumiaji.

### Ugawanyaji {#sharding}

Ugawanyaji ni mchakato wa kugawanya hifadhidata. Vikundi vidogo vya wathibitishaji vingewajibika kwa shardi binafsi badala ya kufuatilia Ethereum yote. Ugawanyaji ulikuwa kwenye [ramani ya maendeleo](/roadmap/) ya Ethereum kwa muda mrefu, na hapo awali ulikusudiwa kutolewa kabla ya Muungano kuelekea uthibitisho-wa-hisa. Hata hivyo, maendeleo ya haraka ya [unda-mpya za safu 2](#layer-2-scaling) na uvumbuzi wa [Danksharding](/roadmap/danksharding) (kuongeza matone ya data ya unda-mpya kwenye bloku za Ethereum ambazo zinaweza kuthibitishwa kwa ufanisi sana na wathibitishaji) umesababisha jumuiya ya Ethereum kupendelea uongezwaji unaozingatia unda-mpya badala ya uongezwaji kwa ugawanyaji. Hii pia itasaidia kuweka mantiki ya makubaliano ya Ethereum kuwa rahisi.

## Uongezwaji wa Offchain {#offchain-scaling}

Suluhisho za Offchain zinatekelezwa kando na Mtandao Mkuu wa safu ya 1 - hazihitaji mabadiliko yoyote kwenye itifaki iliyopo ya Ethereum. Baadhi ya suluhisho, zinazojulikana kama suluhisho za "safu ya 2", hupata usalama wao moja kwa moja kutoka kwa makubaliano ya safu ya 1 ya Ethereum, kama vile [optimistic rollups](/developers/docs/scaling/optimistic-rollups/), [zero-knowledge rollups](/developers/docs/scaling/zk-rollups/) au [chaneli za hali](/developers/docs/scaling/state-channels/). Suluhisho zingine zinahusisha uundaji wa minyororo mipya katika aina mbalimbali ambazo hupata usalama wao kando na Mtandao Mkuu, kama vile [sidechains](#sidechains), [validiums](#validium), au [minyororo ya njozi](#plasma). Suluhisho hizi huwasiliana na Mtandao Mkuu lakini hupata usalama wao kwa njia tofauti ili kufikia malengo mbalimbali.

### Uongezwaji wa safu ya 2 {#layer-2-scaling}

Aina hii ya suluhisho za offchain hupata usalama wake kutoka kwa Mtandao Mkuu wa Ethereum.

Safu ya 2 ni neno la pamoja la suluhisho zilizoundwa kusaidia kuongeza programu yako kwa kushughulikia miamala nje ya Mtandao Mkuu wa Ethereum (safu ya 1) huku ukichukua fursa ya mfumo imara wa usalama wa ugatuzi wa Mtandao Mkuu. Kasi ya muamala hupungua mtandao unapokuwa na shughuli nyingi, na kufanya uzoefu wa mtumiaji kuwa duni kwa aina fulani za dapps. Na mtandao unapozidi kuwa na shughuli nyingi, bei za gesi huongezeka kadri watumaji wa miamala wanavyolenga kushindana kwa bei. Hii inaweza kufanya utumiaji wa Ethereum kuwa ghali sana.

Suluhisho nyingi za safu ya 2 huzingatia seva au nguzo ya seva, ambapo kila moja inaweza kujulikana kama nodi, mthibitishaji, mwendeshaji, mratibu wa mfuatano, mtayarishaji wa bloku, au neno linalofanana. Kulingana na utekelezaji, nodi hizi za safu ya 2 zinaweza kuendeshwa na watu binafsi, biashara au mashirika yanayozitumia, au na mwendeshaji wa tatu, au na kundi kubwa la watu binafsi (sawa na Mtandao Mkuu). Kwa ujumla, miamala huwasilishwa kwa nodi hizi za safu ya 2 badala ya kuwasilishwa moja kwa moja kwa safu ya 1 (Mtandao Mkuu). Kwa baadhi ya suluhisho, kisa cha safu ya 2 kisha huviweka katika makundi kabla ya kuvitia nanga kwenye safu ya 1, na baada ya hapo hulindwa na safu ya 1 na haviwezi kubadilishwa. Maelezo ya jinsi hii inafanywa hutofautiana sana kati ya teknolojia na utekelezaji tofauti wa safu ya 2.

Kisa maalum cha safu ya 2 kinaweza kuwa wazi na kushirikiwa na programu nyingi, au kinaweza kupelekwa na mradi mmoja na kujitolea kusaidia programu yao pekee.

#### Kwa nini safu ya 2 inahitajika? {#why-is-layer-2-needed}

- Kuongezeka kwa miamala kwa sekunde kunaboresha sana uzoefu wa mtumiaji, na kupunguza msongamano wa mtandao kwenye Mtandao Mkuu wa Ethereum.
- Miamala hukusanywa katika muamala mmoja kwenye Mtandao Mkuu wa Ethereum, na kupunguza ada za gesi kwa watumiaji na kuifanya Ethereum kuwa jumuishi zaidi na kupatikana kwa watu kila mahali.
- Sasisho zozote za uwezo wa kuongezeka hazipaswi kuwa kwa gharama ya ugatuzi au usalama – safu ya 2 inajengwa juu ya Ethereum.
- Kuna mitandao ya safu ya 2 maalum kwa programu ambayo huleta seti zao za ufanisi wakati wa kufanya kazi na mali kwa kiwango kikubwa.

[Zaidi kuhusu safu ya 2](/layer-2/).

#### Unda-mpya {#rollups}

Unda-mpya hutekeleza miamala nje ya safu ya 1 na kisha data huwekwa kwenye safu ya 1 ambapo makubaliano hufikiwa. Kwa vile data ya muamala imejumuishwa katika bloku za safu ya 1, hii inaruhusu unda-mpya kulindwa na usalama asili wa Ethereum.

Kuna aina mbili za unda-mpya zenye miundo tofauti ya usalama:

- **Optimistic rollups**: huchukulia miamala kuwa halali kwa chaguo-msingi na huendesha hesabu tu, kupitia [**uthibitisho wa ulaghai**](/glossary/#fraud-proof), endapo kuna changamoto. [Zaidi kuhusu Optimistic rollups](/developers/docs/scaling/optimistic-rollups/).
- **Zero-knowledge rollups**: huendesha hesabu offchain na huwasilisha [**uthibitisho wa uhalali**](/glossary/#validity-proof) kwenye mnyororo. [Zaidi kuhusu zero-knowledge rollups](/developers/docs/scaling/zk-rollups/).

#### Chaneli za hali {#channels}

Chaneli za hali hutumia mikataba ya multisig kuwezesha washiriki kufanya miamala haraka na kwa uhuru offchain, kisha kukamilisha mwisho na Mtandao Mkuu. Hii inapunguza msongamano wa mtandao, ada, na ucheleweshaji. Aina mbili za chaneli kwa sasa ni chaneli za hali na chaneli za malipo.

Jifunze zaidi kuhusu [chaneli za hali](/developers/docs/scaling/state-channels/).

### Sidechains {#sidechains}

Sidechain ni blockchain huru inayolingana na EVM ambayo inaendeshwa sambamba na Mainnet. Hizi zinapatana na Ethereum kupitia madaraja ya njia mbili na huendeshwa chini ya sheria zao walizochagua za makubaliano na vigezo vya kuzuia.

Jifunze zaidi kuhusu [Sidechains](/developers/docs/scaling/sidechains/).

### Njozi {#plasma}

Mnyororo wa njozi ni mnyororo wa bloku tofauti ambao umetiwa nanga kwenye mnyororo mkuu wa Ethereum na hutumia uthibitisho wa ulaghai (kama [optimistic rollups](/developers/docs/scaling/optimistic-rollups/)) kusuluhisha mizozo.

Jifunze zaidi kuhusu [Njozi](/developers/docs/scaling/plasma/).

### Validium {#validium}

Mnyororo wa Validium hutumia uthibitisho wa uhalali kama zero-knowledge rollups lakini data haihifadhiwi kwenye mnyororo mkuu wa safu ya 1 ya Ethereum. Hii inaweza kusababisha miamala 10k kwa sekunde kwa kila mnyororo wa Validium na minyororo mingi inaweza kuendeshwa sambamba.

Jifunze zaidi kuhusu [Validium](/developers/docs/scaling/validium/).

## Kwa nini suluhisho nyingi za uongezwaji zinahitajika? {#why-do-we-need-these}

- Suluhisho nyingi zinaweza kusaidia kupunguza msongamano wa jumla kwenye sehemu yoyote ya mtandao na pia kuzuia sehemu moja ya kushindwa.
- Jumla ni kubwa kuliko jumla ya sehemu zake. Suluhisho tofauti zinaweza kuwepo na kufanya kazi kwa pamoja, kuruhusu athari ya kielelezo kwenye kasi ya muamala ya baadaye na upitishaji.
- Sio suluhisho zote zinahitaji kutumia kanuni ya makubaliano ya Ethereum moja kwa moja, na mbadala zinaweza kutoa manufaa ambayo vinginevyo yangekuwa magumu kupata.

## Wewe ni mwanafunzi wa kuona zaidi? {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Kumbuka maelezo katika video yanatumia neno "Safu ya 2" kurejelea suluhisho zote za uongezwaji za offchain, wakati sisi tunatofautisha "Safu ya 2" kama suluhisho la offchain ambalo hupata usalama wake kupitia makubaliano ya Mtandao Mkuu wa safu ya 1._

<YouTube id="7pWxCklcNsU" />

## Masomo zaidi {#further-reading}

- [Ramani ya maendeleo ya Ethereum inayozingatia unda-mpya](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Uchanganuzi wa kisasa kuhusu suluhisho za uongezwaji za Safu ya 2 kwa Ethereum](https://www.l2beat.com/)
- [Kutathmini Suluhisho za Uongezwaji za safu ya 2 za Ethereum: Mfumo wa Kulinganisha](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Mwongozo Usio Kamili wa Unda-mpya](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [ZK-Rollups zinazoendeshwa na Ethereum: Washindi wa Dunia](https://hackmd.io/@canti/rkUT0BD8K)
- [Optimistic Rollups dhidi ya ZK Rollups](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Kwa nini unda-mpya + vipande vya data ndio suluhisho pekee endelevu kwa uwezo mkubwa wa kuongezeka](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Ni aina gani za Safu za 3 zina mantiki?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Upatikanaji wa Data au: Jinsi Unda-mpya zilivyojifunza Kuacha Kuhangaika na Kuipenda Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [Mwongozo wa Vitendo kwa Unda-mpya za Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_Unajua rasilimali ya jamii iliyokusaidia?_ Hariri ukurasa huu na uiongeze!_
