---
title: Uongezaji wa Uwezo
description: Utangulizi wa chaguzi tofauti za uongezaji wa uwezo zinazotengenezwa kwa sasa na jamii ya Ethereum.
lang: sw
sidebarDepth: 3
---

## Muhtasari wa uongezaji wa uwezo {#scaling-overview}

Kadiri idadi ya watu wanaotumia [Ethereum](/) inavyoongezeka, mnyororo wa vitalu umefikia vikwazo fulani vya uwezo. Hii imepandisha gharama ya kutumia mtandao, na kujenga hitaji la "suluhisho za uongezaji wa uwezo." Kuna suluhisho nyingi zinazofanyiwa utafiti, kujaribiwa na kutekelezwa ambazo zinachukua mbinu tofauti kufikia malengo yanayofanana.

Lengo kuu la uwezo wa kuongezeka ni kuongeza kasi ya muamala (ukamilifu wa haraka zaidi) na uwezo wa upitishaji wa muamala (idadi kubwa ya miamala kwa sekunde) bila kuathiri ugatuzi au usalama. Kwenye mnyororo wa vitalu wa tabaka la 1 (l1) la Ethereum, mahitaji makubwa husababisha miamala ya polepole na [bei za gesi](/developers/docs/gas/) zisizowezekana. Kuongeza uwezo wa mtandao kwa upande wa kasi na uwezo wa upitishaji ni msingi kwa upitishaji wa maana na wa umati wa Ethereum.

Ingawa kasi na uwezo wa upitishaji ni muhimu, ni muhimu kwamba suluhisho za uongezaji wa uwezo zinazowezesha malengo haya zibaki zimegatuliwa na salama. Kuweka kizuizi cha kuingia chini kwa waendeshaji wa nodi ni muhimu katika kuzuia maendeleo kuelekea nguvu ya kompyuta iliyowekwa kati na isiyo salama.

Kimawazo kwanza tunaainisha uongezaji wa uwezo kama uongezaji wa uwezo mnyororoni au uongezaji wa uwezo nje ya mnyororo.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuwa na uelewa mzuri wa mada zote za msingi. Kutekeleza suluhisho za uongezaji wa uwezo ni kwa hali ya juu kwani teknolojia haijajaribiwa sana, na inaendelea kufanyiwa utafiti na kuendelezwa.

## Uongezaji wa uwezo mnyororoni {#onchain-scaling}

Uongezaji wa uwezo mnyororoni unahitaji mabadiliko kwenye itifaki ya Ethereum ([Mtandao Mkuu](/glossary/#mainnet) wa tabaka la 1). Kwa muda mrefu, kugawanya mnyororo wa vitalu (sharding) kulitarajiwa kuongeza uwezo wa Ethereum. Hii ilikuwa inahusisha kugawanya mnyororo wa vitalu katika vipande tofauti (shadi) ili kuthibitishwa na vikundi vidogo vya wathibitishaji. Hata hivyo, uongezaji wa uwezo kwa mikusanyiko ya tabaka la 2 (l2) umechukua nafasi kama mbinu kuu ya uongezaji wa uwezo. Hili linaungwa mkono na kuongezwa kwa aina mpya ya data ya bei nafuu iliyoambatishwa kwenye vitalu vya Ethereum ambayo imeundwa maalum kufanya mikusanyiko iwe nafuu kwa watumiaji.

### Sharding {#sharding}

Sharding ni mchakato wa kugawanya hifadhidata. Vikundi vidogo vya wathibitishaji vingehusika na shadi binafsi badala ya kufuatilia Ethereum yote. Sharding ilikuwa kwenye [ramani ya njia](/roadmap/) ya Ethereum kwa muda mrefu, na iliwahi kukusudiwa kutolewa kabla ya Unganisho kwenda kwenye Uthibitisho wa Dau (PoS). Hata hivyo, maendeleo ya haraka ya [mikusanyiko ya tabaka la 2](#layer-2-scaling) na uvumbuzi wa [danksharding](/roadmap/danksharding) (kuongeza blobs za data za rollup kwenye vitalu vya Ethereum ambazo zinaweza kuthibitishwa kwa ufanisi sana na wathibitishaji) kumesababisha jamii ya Ethereum kupendelea uongezaji wa uwezo unaozingatia rollup badala ya uongezaji wa uwezo kwa sharding. Hii pia itasaidia kuweka mantiki ya mwafaka ya Ethereum kuwa rahisi zaidi.

## Uongezaji wa uwezo nje ya mnyororo {#offchain-scaling}

Suluhisho za nje ya mnyororo zinatekelezwa kando na Mtandao Mkuu wa tabaka la 1 - hazihitaji mabadiliko yoyote kwenye itifaki iliyopo ya Ethereum. Baadhi ya suluhisho, zinazojulikana kama suluhisho za "tabaka la 2", hupata usalama wao moja kwa moja kutoka kwa mwafaka wa Ethereum wa tabaka la 1, kama vile [mikusanyiko yenye matumaini (optimistic rollups)](/developers/docs/scaling/optimistic-rollups/), [mikusanyiko ya sifuri-maarifa](/developers/docs/scaling/zk-rollups/) au [chaneli za hali](/developers/docs/scaling/state-channels/). Suluhisho zingine zinahusisha uundaji wa minyororo mipya katika aina mbalimbali ambayo hupata usalama wao kando na Mtandao Mkuu, kama vile [minyororo ya kando](#sidechains), [Validium](#validium), au [minyororo ya Plasma](#plasma). Suluhisho hizi huwasiliana na Mtandao Mkuu lakini hupata usalama wao kwa njia tofauti ili kufikia malengo mbalimbali.

### Uongezaji wa uwezo wa tabaka la 2 {#layer-2-scaling}

Kategoria hii ya suluhisho za nje ya mnyororo hupata usalama wake kutoka kwa Mtandao Mkuu wa Ethereum.

Tabaka la 2 ni neno la pamoja kwa suluhisho zilizoundwa kusaidia kuongeza uwezo wa programu yako kwa kushughulikia miamala nje ya Mtandao Mkuu wa Ethereum (tabaka la 1) huku ikitumia faida ya muundo thabiti wa usalama uliogatuliwa wa Mtandao Mkuu. Kasi ya muamala huathirika wakati mtandao una shughuli nyingi, na kufanya uzoefu wa mtumiaji kuwa mbaya kwa aina fulani za programu tumizi zilizogatuliwa (dapp). Na kadiri mtandao unavyozidi kuwa na shughuli nyingi, bei za gesi huongezeka kwani watumaji wa miamala wanalenga kushindana kwa bei. Hii inaweza kufanya matumizi ya Ethereum kuwa ghali sana.

Suluhisho nyingi za tabaka la 2 zinajikita kwenye seva au kikundi cha seva, ambazo kila moja inaweza kuitwa nodi, mthibitishaji, mwendeshaji, mpangaji, mzalishaji wa kitalu, au neno linalofanana. Kulingana na utekelezaji, nodi hizi za tabaka la 2 zinaweza kuendeshwa na watu binafsi, biashara au taasisi zinazozitumia, au na mwendeshaji wa tatu, au na kundi kubwa la watu binafsi (sawa na Mtandao Mkuu). Kwa ujumla, miamala huwasilishwa kwa nodi hizi za tabaka la 2 badala ya kuwasilishwa moja kwa moja kwenye tabaka la 1 (Mtandao Mkuu). Kwa baadhi ya suluhisho, mfumo wa tabaka la 2 kisha huzikusanya katika makundi kabla ya kuziweka kwenye tabaka la 1, baada ya hapo zinalindwa na tabaka la 1 na haziwezi kubadilishwa. Maelezo ya jinsi hii inafanywa yanatofautiana sana kati ya teknolojia na utekelezaji tofauti wa tabaka la 2.

Mfumo maalum wa tabaka la 2 unaweza kuwa wazi na kushirikiwa na programu nyingi, au unaweza kusambazwa na mradi mmoja na kujitolea kusaidia programu yao pekee.

#### Kwa nini tabaka la 2 linahitajika? {#why-is-layer-2-needed}

- Kuongezeka kwa miamala kwa sekunde kunaboresha sana uzoefu wa mtumiaji, na kupunguza msongamano wa mtandao kwenye Mtandao Mkuu wa Ethereum.
- Miamala inakusanywa kuwa muamala mmoja kwenye Mtandao Mkuu wa Ethereum, kupunguza ada za gesi kwa watumiaji na kufanya Ethereum iwe jumuishi zaidi na kufikiwa na watu kila mahali.
- Masasisho yoyote ya uwezo wa kuongezeka hayapaswi kuwa kwa gharama ya ugatuzi au usalama – tabaka la 2 linajengwa juu ya Ethereum.
- Kuna mitandao ya tabaka la 2 maalum kwa programu ambayo huleta seti yao wenyewe ya ufanisi wakati wa kufanya kazi na rasilimali kwa kiwango kikubwa.

[Zaidi kuhusu tabaka la 2](/layer-2/).

#### Mikusanyiko {#rollups}

Mikusanyiko hufanya utekelezaji wa muamala nje ya tabaka la 1 na kisha data inatumwa kwenye tabaka la 1 ambapo mwafaka unafikiwa. Kwa kuwa data ya muamala inajumuishwa kwenye vitalu vya tabaka la 1, hii inaruhusu mikusanyiko kulindwa na usalama wa asili wa Ethereum.

Kuna aina mbili za mikusanyiko yenye miundo tofauti ya usalama:

- **Mikusanyiko yenye matumaini (Optimistic rollups)**: huchukulia miamala kuwa halali kwa chaguo-msingi na huendesha tu ukokotoaji, kupitia [**ushahidi wa udanganyifu**](/glossary/#fraud-proof), endapo kutatokea changamoto. [Zaidi kuhusu mikusanyiko yenye matumaini](/developers/docs/scaling/optimistic-rollups/).
- **Mikusanyiko ya sifuri-maarifa**: huendesha ukokotoaji nje ya mnyororo na kuwasilisha [**uthibitisho wa uhalali**](/glossary/#validity-proof) kwenye mnyororo. [Zaidi kuhusu mikusanyiko ya sifuri-maarifa](/developers/docs/scaling/zk-rollups/).

#### Chaneli za hali {#channels}

Chaneli za hali hutumia mikataba ya saini-nyingi kuwezesha washiriki kufanya miamala haraka na kwa uhuru nje ya mnyororo, kisha kutatua ukamilifu na Mtandao Mkuu. Hii inapunguza msongamano wa mtandao, ada, na ucheleweshaji. Aina mbili za chaneli kwa sasa ni chaneli za hali na chaneli za malipo.

Jifunze zaidi kuhusu [chaneli za hali](/developers/docs/scaling/state-channels/).

### Minyororo ya kando {#sidechains}

Mnyororo wa kando ni mnyororo wa vitalu unaojitegemea unaoendana na EVM ambao unafanya kazi sambamba na Mtandao Mkuu. Hizi zinaendana na Ethereum kupitia madaraja ya njia mbili na zinafanya kazi chini ya sheria zao zilizochaguliwa za mwafaka na vigezo vya kitalu.

Jifunze zaidi kuhusu [Minyororo ya kando](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Mnyororo wa Plasma ni mnyororo wa vitalu tofauti ambao umewekwa kwenye mnyororo mkuu wa Ethereum na hutumia ushahidi wa udanganyifu (kama [mikusanyiko yenye matumaini](/developers/docs/scaling/optimistic-rollups/)) kusuluhisha mizozo.

Jifunze zaidi kuhusu [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Mnyororo wa Validium hutumia uthibitisho wa uhalali kama mikusanyiko ya sifuri-maarifa lakini data haihifadhiwi kwenye mnyororo mkuu wa Ethereum wa tabaka la 1. Hii inaweza kusababisha miamala 10k kwa sekunde kwa kila mnyororo wa Validium na minyororo mingi inaweza kuendeshwa sambamba.

Jifunze zaidi kuhusu [Validium](/developers/docs/scaling/validium/).

## Kwa nini suluhisho nyingi za uongezaji wa uwezo zinahitajika? {#why-do-we-need-these}

- Suluhisho nyingi zinaweza kusaidia kupunguza msongamano wa jumla kwenye sehemu yoyote ya mtandao na pia kuzuia sehemu moja ya kutofaulu.
- Kwa pamoja ni zaidi ya jumla ya sehemu zake. Suluhisho tofauti zinaweza kuwepo na kufanya kazi kwa upatano, kuruhusu athari kubwa kwenye kasi ya muamala ya baadaye na uwezo wa upitishaji.
- Sio suluhisho zote zinahitaji kutumia algoriti ya mwafaka ya Ethereum moja kwa moja, na njia mbadala zinaweza kutoa faida ambazo vinginevyo zingekuwa ngumu kupata.

## Je, unapendelea kujifunza kwa kuona? {#visual-learner}

<VideoWatch slug="layer-2-scaling-explained" />

_Kumbuka maelezo kwenye video yanatumia neno "Tabaka la 2" kurejelea suluhisho zote za uongezaji wa uwezo nje ya mnyororo, wakati sisi tunatofautisha "Tabaka la 2" kama suluhisho la nje ya mnyororo ambalo hupata usalama wake kupitia mwafaka wa Mtandao Mkuu wa tabaka la 1._

<VideoWatch slug="rollups-scaling-strategy" />

## Usomaji zaidi {#further-reading}

- [Ramani ya njia ya Ethereum inayozingatia rollup](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Uchanganuzi wa kisasa kuhusu suluhisho za uongezaji wa uwezo wa Tabaka la 2 kwa Ethereum](https://www.l2beat.com/)
- [Kutathmini Suluhisho za Uongezaji wa Uwezo wa tabaka la 2 la Ethereum: Mfumo wa Ulinganisho](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Mwongozo Usiokamilika wa Mikusanyiko](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [Mikusanyiko ya ZK Inayoendeshwa na Ethereum: Washindi wa Dunia](https://hackmd.io/@canti/rkUT0BD8K)
- [Mikusanyiko Yenye Matumaini dhidi ya Mikusanyiko ya ZK](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Kwa nini mikusanyiko + shadi za data ndio suluhisho pekee endelevu kwa uwezo wa juu wa kuongezeka](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Ni aina gani ya Tabaka la 3 inaleta maana?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Upatikanaji wa Data Au: Jinsi Mikusanyiko Ilivyojifunza Kuacha Kuwa na Wasiwasi na Kuipenda Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [Mwongozo wa Vitendo wa Mikusanyiko ya Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_Je, unajua rasilimali ya jamii iliyokusaidia? Hariri ukurasa huu na uiongeze!_

## Mafunzo: Jenga Tabaka la 2 lenye uwezo wa kuongezeka kwenye Ethereum {#tutorials}

- [Yote unayoweza kuhifadhi kwenye kache](/developers/tutorials/all-you-can-cache/) _– Jinsi ya kujenga na kutumia mkataba wa kuhifadhi kwenye kache ili kupunguza gharama za data za mwito kwenye mikusanyiko._
- [ABI Fupi kwa Uboreshaji wa Data za Mwito](/developers/tutorials/short-abi/) _– Jinsi ya kutumia ABI fupi zaidi kupunguza gharama za data za mwito kwa miamala ya tabaka la 2._