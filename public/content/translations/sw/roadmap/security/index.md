---
title: Ethereum salama zaidi
description: Ramani ya njia ya Ethereum inaimarisha uzalishaji wa kitalu na upinzani wa udhibiti leo huku ikiandaa itifaki kwa enzi ya kwanta na miongo ya utendakazi wa kutegemewa.
lang: sw
image: /images/roadmap/roadmap-security.png
alt: "Ramani ya njia ya Ethereum"
template: roadmap
summaryPoints:
  - Maboresho ya uimarishaji ya muda mfupi kama vile utengano wa mpendekezaji na mjengaji (PBS) uliowekwa rasmi na orodha za ujumuishaji yanatengenezwa kikamilifu
  - Maandalizi ya baada ya kwanta yanaendelea miaka kadhaa kabla ya tishio lolote la kweli la kwanta
  - Urahisishaji wa itifaki huondoa utata na kupunguza eneo la ushambuliaji la Ethereum
---

Ethereum tayari ni jukwaa salama sana, lililogatuliwa la [mkataba mahiri](/glossary/#smart-contract). Ramani ya njia inalenga kuiweka hivyo kwa miongo kadhaa kwa **kuimarisha mtandao leo huku ikijiandaa kwa vitisho ambavyo vinaweza kuonekana miaka kadhaa kuanzia sasa**. Maboresho ya muda mfupi yanafuatiliwa kwenye [forkcast.org](https://forkcast.org), na rasimu ya ramani ya njia ya muda mrefu imechapishwa kwenye [strawmap.org](https://strawmap.org).

<ExpandableCard title="Je, Ethereum ni salama leo?" eventCategory="/roadmap/security" eventName="clicked is ethereum secure today?">

Ndiyo. Ethereum imefanya kazi mfululizo tangu 2015 bila kukatika. Maboresho kwenye ukurasa huu yanafanya mtandao ambao tayari ni salama kuwa mgumu zaidi kushambulia, kudhibiti, au kuvuruga.

</ExpandableCard>

## Ujenzi wa kitalu bila hitaji la uaminifu {#trustless-block-building}

Vitalu vingi vya Ethereum leo vinakusanywa kupitia mgawanyo wa kazi: wajenga kizuizi maalum huunda kitalu cha thamani zaidi wawezavyo, na [mthibitishaji](/glossary/#validator) ambaye ni zamu yake hupendekeza ofa bora zaidi. Hii inazuia ujenzi wa kitalu wa kitaalamu kulimbikiza [dhamana](/glossary/#staking) miongoni mwa waendeshaji wakubwa zaidi, lakini tangu 2022 imetegemea programu iliyo nje ya itifaki ambayo mtandao hauwezi kuthibitisha.

**Utengano wa mpendekezaji na mjengaji (PBS) uliowekwa rasmi (ePBS, au EIP-7732)** huhamisha mgawanyiko huu kwenye itifaki, na kuondoa hitaji la kuamini wapatanishi (relays), ambao ni watu wa kati wanaopitisha vitalu kati ya wajenga kizuizi na wathibitishaji kwa sasa. ePBS ni kipengele kikuu cha uboreshaji ujao wa [Glamsterdam](/roadmap/glamsterdam/), unaolengwa kufanyika 2026. Hakuna tarehe ya Mtandao Mkuu iliyopangwa; timu za wateja zinaifanyia majaribio kwenye devnets (mitandao ya majaribio ya muda).

<ButtonLink variant="outline" href="/roadmap/pbs/">Zaidi kuhusu utengano wa mpendekezaji na mjengaji</ButtonLink>

## Upinzani wa udhibiti {#censorship-resistance}

Mtandao unaopinga udhibiti unamaanisha hakuna mtu anayeweza kuzuia muamala halali kufikia mnyororo. **Orodha za ujumuishaji zinazolazimishwa na chaguo la mchepuo (FOCIL, au EIP-7805)** huwapa wathibitishaji wengi sauti katika kile ambacho kitalu lazima kijumuishe: wanachapisha orodha za miamala inayosubiri ambayo mjenga kizuizi anahitajika kujumuisha. Hakuna mhusika mmoja anayeweza kuacha muamala wako kimyakimya.

FOCIL ni kipengele kikuu cha tabaka la mwafaka la Hegotá, uboreshaji unaofuata Glamsterdam na unalengwa kufanyika 2027. Ilipangwa kimakusudi baada ya Glamsterdam ili ePBS na FOCIL zisiwahi kutolewa kama mchanganyiko mmoja ambao haujajaribiwa. Utafiti kuhusu mempools zilizosimbwa kwa siri, ambazo zingeficha yaliyomo kwenye miamala inayosubiri hadi ijumuishe kwa usalama kwenye kitalu, unaendelea.

## Ukamilifu wa haraka zaidi {#faster-finality}

Kwa watumiaji, [ukamilifu](/glossary/#finality) ni wakati ambapo muamala unakuwa wa kudumu, ambapo kuubadilisha kungemgharimu mshambuliaji kiasi kikubwa cha ETH iliyowekwa dhamana. Leo ukamilifu unachukua takriban dakika 15, na **watafiti wanataka kupunguza muda huo kwa kiasi kikubwa**. Kazi ilianza kama ukamilifu wa sloti moja, ikabadilika kuwa ukamilifu wa sloti tatu, na sasa inaendelea kama Minimmit, itifaki ya mwafaka ya mzunguko mmoja katika programu ya Lean Ethereum iliyoanzishwa Julai 2025. Ukamilifu ndani ya sekunde ni lengo kuu la muda mrefu kwenye rasimu ya ramani ya njia, ikilenga takriban 2029. Huu unasalia kuwa utafiti unaoendelea, na hakuna uboreshaji wa ukamilifu uliopangiwa mchepuo bado.

<ButtonLink variant="outline" href="/roadmap/single-slot-finality/">Zaidi kuhusu utafiti wa ukamilifu wa haraka zaidi</ButtonLink>

## Wathibitishaji wastahimilivu {#resilient-validators}

Mthibitishaji kwa kawaida ni mashine moja inayoshikilia ufunguo mmoja wa kusaini. **Teknolojia ya kithibitishaji kilichosambazwa (DVT)** inachukua nafasi ya mashine hiyo moja na kamati ya mashine zinazoshiriki ufunguo na kusaini pamoja, kwa hivyo kompyuta moja ikishindwa kufanya kazi au ufunguo mmoja ukiibiwa haimwangushi mthibitishaji. DVT inatumika kikamilifu na inatumiwa na waendeshaji wa uwekaji dhamana kwa kiwango kikubwa. Mnamo Januari 2026, Vitalik Buterin alitoa pendekezo la toleo lililorahisishwa la kiwango cha itifaki linaloitwa DVT-lite; ni pendekezo la mapema ambalo halijapangiwa mchepuo.

Mtandao pia unajilinda kupitia [anuwai ya wateja](/developers/docs/nodes-and-clients/client-diversity/): Ethereum inaendeshwa kwenye utekelezaji kadhaa wa programu zilizojengwa kwa kujitegemea, kwa hivyo hitilafu katika mteja mmoja huiacha sehemu iliyosalia ya mtandao ikiwa salama.

Mawazo mawili ya awali ya utafiti, view-merge na uchaguzi wa siri wa kiongozi, si vipengele vinavyoendelea tena kwenye ramani ya njia.

<ButtonLink variant="outline" href="/staking/dvt/">Zaidi kuhusu teknolojia ya kithibitishaji kilichosambazwa (DVT)</ButtonLink>

## Upinzani wa kwanta {#quantum-resistance}

Ethereum inatumia [kriptografia](/glossary/#cryptography) kuweka mtandao salama na kulinda fedha za watumiaji. Hatimaye, baadhi ya mbinu hizi za kriptografia zitakuwa **hatarini kwa kompyuta za kwanta**, ambazo zinaweza kutatua matatizo maalum ya hisabati kwa haraka sana kuliko mashine za kawaida.

**Hakuna kompyuta ya kwanta inayoweza kuvunja kriptografia ya Ethereum leo.** Vifaa vinavyohitajika bado havipo kwa kiwango kikubwa. Lakini utafiti wa hivi karibuni unapendekeza pengo linafungwa kwa haraka zaidi kuliko ilivyotarajiwa hapo awali. Mnamo Machi 2026, Google Quantum AI ilichapisha karatasi inayokadiria kuwa kuvunja kriptografia ya tao la duaradufu ya biti 256 (aina ambayo Ethereum inatumia kwa sahihi za akaunti) kunaweza kuhitaji takriban qubits 1,200 za kimantiki, karibu mara 20 chini ya makadirio ya awali.

Mabadiliko ya kriptografia huchukua miaka kupanga na kutekeleza kwa usalama, kwa hivyo maandalizi yanafanyika sasa, muda mrefu kabla ya vifaa kuwepo. Maeneo manne yametambuliwa kama yanayohitaji maboresho ya baada ya kwanta: sahihi za mwafaka wa mthibitishaji (BLS), mifumo ya ufungamanisho inayotumika kwa upatikanaji wa data (KZG), sahihi za akaunti (ECDSA), na mifumo ya uthibitisho wa maarifa-sifuri (ZK-proof) inayotumiwa na [mikusanyiko](/glossary/#rollups).

Taasisi ya Ethereum iliunda **timu maalum ya Usalama wa Baada ya Kwanta** mnamo Januari 2026, na kazi yake inafuatiliwa hadharani kwenye [pq.ethereum.org](https://pq.ethereum.org). Kazi inayoendelea inajumuisha sahihi za mthibitishaji zinazotegemea heshi (leanXMSS) zilizooanishwa na zkVM ndogo (leanVM) ambayo inakusanya sahihi kubwa zaidi zilizo salama dhidi ya kwanta kwa ufanisi, na devnets za mwingiliano za kila wiki zenye zaidi ya timu 10 za wateja.

Sehemu muhimu ya mkakati wa mpito ni **EIP-8141**, ambayo inaleta [udhanifu wa akaunti](/roadmap/account-abstraction/) asilia. Hii inaruhusu akaunti binafsi kuchagua uthibitishaji wao wenyewe wa sahihi, ikimaanisha watumiaji wanaweza kubadili kwenda kwenye sahihi zilizo salama dhidi ya kwanta bila kusubiri uhamiaji mmoja wa itifaki nzima. EIP-8141 inafikiriwa kwa uboreshaji wa Hegotá. Hatua kuu za miundombinu ya baada ya kwanta zinalenga kukamilika ifikapo takriban 2029. Haya ni malengo ya mipango na yanaweza kubadilika.

<ExpandableCard title="Je, kompyuta za quantum zinaweza kuiba ETH yangu leo?" eventCategory="/roadmap/security" eventName="clicked can quantum computers steal my ETH today?">

Hapana. Hakuna kompyuta ya kwanta leo inayoweza kuvunja kriptografia ya Ethereum. Kazi iliyoelezwa kwenye ukurasa huu ni maandalizi ya mapema kwa tishio ambalo bado liko miaka kadhaa mbele. Wakati mikoba ya baada ya kwanta itakapopatikana, programu ya mkoba itakuongoza kupitia uhamiaji. Kwa sasa, hakuna unachohitaji kufanya.

</ExpandableCard>

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">Zaidi kuhusu upinzani wa kwanta</ButtonLink>

## Itifaki rahisi na yenye ufanisi zaidi {#simpler-and-more-efficient-protocol}

Utata hutengeneza fursa za hitilafu na udhaifu. Sehemu ya ramani ya njia inalenga **kurahisisha Ethereum na kuondoa deni la kiufundi** ili itifaki iwe rahisi kudumisha, kukagua, na kuelewa. Itifaki rahisi pia huwapa washambuliaji eneo dogo la kuchunguza.

Zilizowasilishwa hadi sasa:

- **[Pectra (Mei 2025)](/roadmap/pectra/)**: Ilianzisha EIP-7702, ambayo inaruhusu akaunti zinazomilikiwa na watu wa nje kukaimisha kwa muda kwa msimbo wa mkataba mahiri, hatua kuelekea udhanifu wa akaunti kamili.
- **[Fusaka (Desemba 2025)](/roadmap/fusaka/)**: Ilisambaza PeerDAS (EIP-7594), ambayo inasambaza mzigo wa kazi wa upatikanaji wa data kwenye mtandao. Pia iliongeza vigezo vya blobu, ikipanua uwezo wa upitishaji wa data kwa mikusanyiko.
- **[Dencun (Machi 2024)](/roadmap/dencun/)**: Ilianzisha miamala ya blobu (EIP-4844) kwa data ya rollup ya bei nafuu na kuzuia `SELFDESTRUCT` (EIP-6780) ili kuondoa chanzo cha muda mrefu cha utata.
- **[Shapella (Aprili 2023)](/staking/withdrawals/)**: Iliwezesha wathibitishaji kutoa ETH iliyowekwa dhamana (EIP-4895), ikiondoa kizuizi cha mapema cha uwekaji dhamana wa [Uthibitisho wa Dau (PoS)](/glossary/#pos).
- **London (Agosti 2021)**: Ilifanyia marekebisho makubwa upangaji wa bei ya gesi kwa EIP-1559, ikianzisha ada ya msingi na utaratibu wa kuteketeza kwa gharama za muamala zinazotabirika zaidi.

Zinazoendelea:

- **Glamsterdam (inayolengwa kwa 2026)**: Vipengele vikuu ni ePBS (EIP-7732) na orodha za ufikiaji za kiwango cha kitalu (EIP-7928), huku upangaji upya wa bei ya gesi pia ukifikiriwa.
- **Hegotá (inayolengwa kwa 2027)**: FOCIL (EIP-7805) ni kipengele kikuu cha tabaka la mwafaka. Inayofikiriwa kujumuishwa: EIP-8141 (udhanifu wa akaunti asilia).
- **Inayoendelea**: Juhudi za kurahisisha [EVM](/developers/docs/evm/), kuoanisha utekelezaji wa wateja, na kuondoa hatua kwa hatua vipengele vilivyopitwa na wakati zinaendelea katika timu zote za wateja. Kazi kuhusu ubilahali (kuruhusu washiriki kuthibitisha mnyororo bila kuhifadhi data yake yote) inaundwa upya kuzunguka miti ya heshi ya mfumo wa jozi iliyo salama dhidi ya kwanta, huku mbinu ya mwisho bado haijathibitishwa.

## Maendeleo ya sasa {#current-progress}

Kufikia katikati ya 2026:

- **Ujenzi wa kitalu na upinzani wa udhibiti**: ePBS na orodha za ufikiaji za kiwango cha kitalu zinaendeshwa kwenye devnets za Glamsterdam. FOCIL imepangwa kwa Hegotá, inayolengwa kwa 2027.
- **Ukamilifu**: Minimmit na kazi pana ya mwafaka ya Lean Ethereum zinasalia katika utafiti unaoendelea bila kupangiwa mchepuo bado.
- **Upinzani wa kwanta**: Devnets za mwingiliano za baada ya kwanta za kila wiki zinaendeshwa, na hatua kuu za miundombinu zinalenga takriban 2029.
- **Urahisishaji**: Pectra na Fusaka zilitolewa; Glamsterdam na Hegotá zinabeba awamu inayofuata ya usafishaji.

Hakuna sehemu ya kazi hii iliyokamilika, na ratiba zote ni makadirio ambayo yanaweza kubadilika.

## Kusoma zaidi {#further-reading}

- [Forkcast: Kifuatiliaji cha uboreshaji wa mtandao wa Ethereum](https://forkcast.org)
- [Strawmap: rasimu ya ramani ya njia ya tabaka la 1 (l1) la Ethereum](https://strawmap.org) - _Usanifu wa EF_
- [Ethereum ya Baada ya Kwanta](https://pq.ethereum.org) - _Taasisi ya Ethereum_
- [Kifuatiliaji cha ramani ya njia ya Lean Ethereum](https://leanroadmap.org) - _ReamLabs_
- [Uthibitisho wa Dau (PoS) na ukamilifu](/developers/docs/consensus-mechanisms/pos/#finality)
- [EVM](/developers/docs/evm/)