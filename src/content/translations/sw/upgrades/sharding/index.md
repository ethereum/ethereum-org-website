---
title: Minyororo ya Vigae
description: Jifunze juu ya minyororo ya shard - sehemu za mtandao ambazo zinampa Ethereum uwezo zaidi wa shughuli na iwe rahisi kukimbia.
lang: sw
template: upgrade
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: Ugawanyaji wa vigae ni kazi ya usasishaji yenye awamu nyingi ili kuboresha utanukaji wa Ethereum na ujazo wake.
summaryPoint2: Minyororo ya vigae hutoa huduma nafuu zaidi kwa ajili ya safu za kuhifadhi programu na sehemu za kutunza data.
summaryPoint3: Zinawezesha suluhisho la safu ya 2 kupunguza ada ya muamala huku ikiinua usalama wa Ethereum.
summaryPoint4: Maboresho haya yanatarajiwa kufuata muungano wa mtandao mkuu na Mnyororo Kioleza.
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    Vipande vya minyororo vitasafisrishwa muda fulani mwaka 2023, hii itategemea kasi ya kazi itakavyoenda baada ya <a href="/upgrades/merge/">muungano</a>. Vipande hivi vitaipa Ethereum uwezo zaodo kutunza na upatikanaji wa taarifa, ila hautatumika kwenye utekelezaji wa msimbo.
</UpgradeStatus>

## Kuvunja nin nini? {#what-is-sharding}

Kuvunja ni mchakato wa kutenganisha hifadhidata kwa usawa ili kusamabaza uzito -- ni dhana ya kawaida kaika sayansi ya tarakinishi. Katika muktadha wa Ethereum, kukata itapunguza msongamano wa mtandao na kuongeza shughuli kwa sekunde kwa kuunda minyororo mipya, ijulikanayo kama "vipande".

Hii ni muhimu kwa sababu zingine isipokuwa utanukaji.

## Vipengele vya vigae {#features-of-sharding}

### Kila mtu anaweza kuendesha nodi {#everyone-can-run-a-node}

Ugawanyaji ni njia nzuri ya uboreshaji kama unataka kuweka nguvu nje ya wamiliki wa madaraka kama njia mbadala ni kutanua wigo kwa kuongeza ujazo wa hifadhidta iliopo. Hii itafanya Ethereum isipatikane kwa wathibitishaji wa mtandao kwa sababu watahitaji tanakirishi zenye nguvu na za gharama kubwa. Kukiwa na vipand vya minyororo, wathibitishaji watahitaji kuhifadhi/kuendesha data ya vigae wanavyothibitisha, sio mtandao mzima(kama kinachotokea leo hii). Hii itaongeza kasi na itapunguza sana mahitaji ya vifaa.

### Ushiriki zaidi wa mtandao {#more-network-participation}

Mwishowe ugawannyaji huu utaruhusu Ethereum kuendeshwa kwenye tarakinishi(kompyuta) ndogo au simu. Kwahio watu wengi zaidi wnatakiwa kuweza kushiriki, au kuendesha[wateja](/developers/docs/nodes-and-clients/), ndani ya Ethereum iliogawanywa. Hii itaongeza usalama zaidi kwasababu jinsi mtandao unavyojitegemea, ndivyo nafasi ya uvamizi inapungua.

Na mahitaji ya chini ya vifaa, ugawanyaji utafanya iwe rahisi kuendesha [wateja](/developers/docs/nodes-and-clients/)wewe mwenyewe, bila kutegemea huduma za mpatanishi. Na ikiwa unaweza, fikiria kuendesha wateja wengi. Hii inaweza kusaidia afya ya mtandao kwa kupunguza zaidi alama za kutofaulu. [Endesha programu ya Mnyororo Kioleza](/upgrades/get-involved/)

<br />

<InfoBanner isWarning={true}>
  Mara ya kwanza, utahitaji kuendesha programu ya mtandao mkuu (mainnet) kwa wakati mmoja na programu yako ya Eth2. <a href="https://launchpad.ethereum.org" target="_blank">Uzinduzi wa pedi</a>itakuelekeza mahitaji ya vifaa na mchakato. Vinginevyo unaweza kutumia <a href="/developers/docs/apis/backend/#available-libraries">mawasiliano ya nyuma ya programu(backend API)</a>.
</InfoBanner>

## Minyororo ya vugae toleo 1: Upatikanaji wa data {#data-availability}

Minyororo ya vigae itakaposafirishwa itatoa huduma ya kuupa mtandao data zaidi tu. Haitagusa mwenendo wa pesa wala mikataba erevu. Lakini bado watatoa maboresho ya ajabu kwa miamala kwa kila sekunde yakiunganishwa na uboreshaji.

Uboreshwaji ni teknolojia ya "safu 2" ambayo ipo leo. Zinaruhusu programu zilizogatuliwa kuunda kifungu cha miamala mabali mbali kuwa muamala mmoja ulioko nje ya mnyororo, kuzalisha uthibitisho wa kriptografia na kisha kuwasilisha kwenye mnyororo. Hii inapunguza data inayohitajika kwwenye muamala. Changanya hii na upatikanaji wote wa ziada wa data unaotolewa na vigae na unapata miamala 100,000 kwa sekunde.

<InfoBanner isWarning={false}>
  Kwa kuzingatia maendeleo ya hivi majuzi katika utafiti na ukuzaji wa suluhisho la safu ya 2, hii imesababisha kipaumbele cha uboreshwaji wa muunganiko kabla ya minyororo kigae. Haya ndio yatakua malengo yanayofuata mtandao mkuu kwenda kuwa uthibitisho-wa-hisa.

[Zaidi juu ya mafungu](/wasanidiprogramu/docs/ukuaji/safu--mafungu)
</InfoBanner>

## Minyororo ya vipande toleo 2: utekelezaji wa msimbo {#code-execution}

Mpango ulikuwa daima kuongeza utendaji wa ziada kwenye vipande, ili kuvifanya zaidi kama[Mtandao Mkuu wa Ethereum](/glossary/#mainnet)wa leo. Hii itawaruhusu kutunza na kuendesha msimbo na kusimamia miamala, kwa kua kila kigae kina seti tofauti ya mkataba erevu na salio la akaunti. Mawasliano kati ya vigae ingeweza kuruhusu miamala kati ya kigae na kigae.

Lakini kwa kuzingatia miamala kwa sekunde ilioongezeka ambayo toleo la 1 la vigae hutoa, hii bado inahitaji kutokea? Hili bado linajadiliwa kwenye jumuiya na inaonekana kuna chaguzi kadhaa.

### Je vigae vinahitaji utekelezaji wa msimbo? {#do-shards-need-code-execution}

Vitalik Buterin, alipokua anaongea na podikasti ya bila benki "Bankless podcast", aliwasilisha chaguzi 3 zilizokua na uzito wa kujadili.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. Utekelexaji wa hali hauhitajiki {#state-execution-not-needed}

Hii inamaana hatuvupi vigae uwezo wa kusimamia mikataba erevu na kuviacha kama bohari ya data.

#### 2. Pata utekelezaji wa vigae {#some-execution-shards}

Wenda kuna maelewano ambapo hatutahitaji vigae vyote(64 ilivopangwa sasa) to be smater. Tungeweza kuongezea utendakazi huu kwa vichache tu na kuacha vingine. Hii ingeongeza kasi ya utoaji.

#### 3. Subiri mpaka tutakapoweza kufanya utambuzi sifurio (ZK) kwa nyoka {#wait-for-zk-snarks}

Hatimaye, wenda tunatakiwa kupitia upya mjadala huu ZK zitakaposimamishwa. Hii ni teknolojia ambayo ingesaidia kuleta miamala ya kweli iliobinafsi kwenye mtandao. Kuna uwezekano zitahitaji vigae erevu zaidi, lakini bado ziko kwenye uchungizi na uundaji.

#### Rasilimali zingine {#other-sources}

Fikra zinaoingia kwenye mstari huo huo:

- [Fezi ya kwanza na Imeisha: Eth2 kama injini ya upatikanaji wa data](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) -_cdetrio, ethresear.ch_

Huu ni mjadala unaoendelea kwa sasa. Tutasasihsha kurasa hizi mara moja tutakapojua zaidi.

## Mahusiano kati ya visasisho {#relationship-between-upgrades}

Visasisho vyote vya Eth2 vinahusiana kwa kiasi fulani. Basi hebu tukumbushe jinsi mnyororo wa Beacon(Kioleza) unavyoathiri visasisho vingine.

### Vigae na Mnyororo Kioleza {#shards-and-beacon-chain}

Mnyororo Kioleza ina mantiki yote ya kulinda vigae na kuhakikisha vimesawazishwa. Mnyororo Kioleza utaratibu wanahisa kwenye mtandao, kuwagawia viage wanavyohitaji kufanyia kazi. Na pia itawezwesha mawasiliano kati ya vigae kwa kupokea na kutunza data ya muamala wa kigae amabao utakua unapatikana kama vigae vingine vitahitaji kuutumia. Hii itaipa vigae picha ya hali ya Ethereum ili kusasisha kila kitu.

<ButtonLink to="/upgrades/beacon-chain/">
  Mnyororo Kioleza
</ButtonLink>

### Vigae na Muungano {#shards-and-docking}

Mda ukifika vigae vya ziada vitakapoongezwa, Mtandao Mkuu wa Ethereum utakua umeshawekwa salama na Mnyororo Kioleza ukitumia uthibotisho wa kazi. Hii inawezesha mtandao mkuu wenye rutuba ili ujenge minyororo ya viagae kwa kuutumia, ukipewa nguvu na ufumbuzi safu namba 2 ambayo utakimbiza ukuaji.

Itabaki ili ionekane kama mtandao mkuu utabaki kama kigae "erevu" kitakachoshughulikia utekelezaji wa msimbo -- lakini, maamuzi ya utanuzi wa vigae utaarudiwa kadiri ya mahitaji.

<ButtonLink to="/upgrades/merge/">
  Muungano
</ButtonLink>

<Divider />

### Soma zaidi {#read-more}

<ShardChainsList />
