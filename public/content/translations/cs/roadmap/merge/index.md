---
title: Merge
description: "Přečtěte si o Merge – kdy Ethereum Mainnet přešel na důkaz podílem (PoS)."
lang: cs
template: upgrade
image: /images/upgrades/merge.png
alt: 
summaryPoints:
  - "Ethereum Mainnet využívá důkaz podílem (PoS), ale nebylo tomu tak vždy."
  - "Aktualizace z původního mechanismu důkazu prací (PoW) na důkaz podílem (PoS) se nazývala Merge."
  - "Merge označuje sloučení původního Ethereum Mainnetu s odděleným blockchainem s důkazem podílem (PoS) zvaným Beacon chain, které nyní existují jako jeden řetězec."
  - "Merge snížil spotřebu energie Etherea o ~99,95 %."
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Merge proběhl 15. září 2022. Tím byl dokončen přechod Etherea na konsensus důkazu podílem (PoS), oficiálně byl ukončen důkaz prací (PoW) a spotřeba energie se snížila o ~99,95 %.
</UpgradeStatus>

## Co byl Merge? {#what-is-the-merge}

Merge bylo spojení původní exekuční vrstvy Etherea (Mainnetu, který existoval od [genesis](/ethereum-forks/#frontier)) s jeho novou vrstvou konsensu s důkazem podílem (PoS), Beacon chainem. Eliminoval potřebu energeticky náročné těžby a místo toho umožnil zabezpečení sítě pomocí stakovaného ETH. Byl to skutečně vzrušující krok k realizaci vize [Etherea](/) – větší škálovatelnosti, bezpečnosti a udržitelnosti.

<MergeInfographic />

Zpočátku byl [Beacon chain](/roadmap/beacon-chain/) spuštěn odděleně od [Mainnetu](/glossary/#mainnet). Ethereum Mainnet – se všemi svými účty, zůstatky, chytrými kontrakty a stavem blockchainu – byl nadále zabezpečen [důkazem prací (PoW)](/developers/docs/consensus-mechanisms/pow/), i když Beacon chain běžel paralelně pomocí [důkazu podílem (PoS)](/developers/docs/consensus-mechanisms/pos/). Merge nastal, když se tyto dva systémy konečně spojily a důkaz prací (PoW) byl trvale nahrazen důkazem podílem (PoS).

Představte si Ethereum jako vesmírnou loď, která odstartovala dříve, než byla zcela připravena na mezihvězdnou cestu. S Beacon chainem komunita postavila nový motor a zpevněný trup. Po rozsáhlém testování nastal čas vyměnit starý motor za nový za letu. Tím se nový, účinnější motor začlenil do stávající lodi, což jí umožnilo urazit pořádné světelné roky a vydat se do vesmíru.

## Sloučení s Mainnetem {#merging-with-mainnet}

Důkaz prací (PoW) zabezpečoval Ethereum Mainnet od genesis až po Merge. To umožnilo, aby v červenci 2015 vznikl blockchain Etherea, na který jsme všichni zvyklí, se všemi jeho známými funkcemi – transakcemi, chytrými kontrakty, účty atd.

V průběhu historie Etherea se vývojáři připravovali na případný přechod od důkazu prací (PoW) k důkazu podílem (PoS). Dne 1. prosince 2020 byl vytvořen Beacon chain jako samostatný blockchain k Mainnetu, který běžel paralelně.

Beacon chain původně nezpracovával transakce Mainnetu. Místo toho dosahoval konsensu o svém vlastním stavu tím, že se shodoval na aktivních validátorech a zůstatcích na jejich účtech. Po rozsáhlém testování nastal čas, aby Beacon chain dosáhl konsensu o datech z reálného světa. Po Merge se Beacon chain stal motorem konsensu pro všechna síťová data, včetně transakcí exekuční vrstvy a zůstatků na účtech.

Merge představoval oficiální přechod na používání Beacon chainu jako motoru pro produkci bloků. Těžba již není prostředkem k produkci platných bloků. Místo toho tuto roli převzali validátoři důkazu podílem (PoS) a nyní jsou zodpovědní za zpracování platnosti všech transakcí a navrhování bloků.

Při Merge se neztratila žádná historie. Když se Mainnet sloučil s Beacon chainem, sloučila se s ním i celá transakční historie Etherea.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Tento přechod na důkaz podílem (PoS) změnil způsob emise etheru. Přečtěte si více o [emisi etheru před a po Merge](/roadmap/merge/issuance/).
</AlertDescription>
</AlertContent>
</Alert>

### Uživatelé a držitelé {#users-holders}

**Merge pro držitele/uživatele nic nezměnil.**

_To stojí za zopakování_: Jako uživatel nebo držitel ETH či jakéhokoli jiného digitálního aktiva na Ethereu, stejně jako stakeři, kteří neprovozují uzel, **nemusíte se svými prostředky nebo peněženkou kvůli Merge dělat vůbec nic.** ETH je prostě ETH. Neexistuje nic jako „staré ETH“/„nové ETH“ nebo „Eth1“/„Eth2“ a peněženky fungují po Merge úplně stejně jako předtím – lidé, kteří vám tvrdí opak, jsou pravděpodobně podvodníci.

Navzdory výměně důkazu prací (PoW) zůstala celá historie Etherea od genesis nedotčena a přechodem na důkaz podílem (PoS) se nezměnila. Jakékoli prostředky držené ve vaší peněžence před Merge jsou přístupné i po Merge. **Z vaší strany není vyžadována žádná akce k aktualizaci.**

[Více o bezpečnosti Etherea](/security/#eth2-token-scam)

### Provozovatelé uzlů a vývojáři dapp {#node-operators-dapp-developers}

<ExpandableCard
title="Provozovatelé a poskytovatelé staking uzlů"
contentPreview="Pokud jste staker provozující vlastní uzel nebo poskytovatel infrastruktury uzlů, je několik věcí, o kterých byste po Merge měli vědět."
id="staking-node-operators">

Klíčové kroky zahrnují:

1. Spusťte _jak_ konsensuální klient, tak exekuční klient; koncové body třetích stran pro získání exekučních dat od Merge již nefungují.
2. Ověřte exekuční i konsensuální klienty pomocí sdíleného tajemství JWT, aby mohly bezpečně komunikovat.
3. Nastavte adresu `fee recipient` pro příjem získaných spropitných z transakčních poplatků/MEV.

Nedokončení prvních dvou výše uvedených bodů bude mít za následek, že váš uzel bude považován za „offline“, dokud nebudou obě vrstvy synchronizovány a ověřeny.

Nenastavení `fee recipient` sice umožní vašemu validátoru chovat se jako obvykle, ale přijdete o nespálená spropitná z poplatků a jakékoli MEV, které byste jinak získali v blocích, jež váš validátor navrhne.
</ExpandableCard>

<ExpandableCard
title="Provozovatelé nevalidujících uzlů a poskytovatelé infrastruktury"
contentPreview="Pokud provozujete nevalidující uzel Etherea, nejvýznamnější změnou, která přišla s Merge, byl požadavek na provozování klientů JAK pro exekuční vrstvu, TAK pro vrstvu konsensu."
id="node-operators">

Až do Merge stačil exekuční klient (jako Go Ethereum (Geth), Erigon, Besu nebo Nethermind) k přijímání, správnému ověřování a šíření bloků, které si síť předávala. _Po Merge_ nyní platnost transakcí obsažených v exekučním payloadu závisí také na platnosti „bloku konsensu“, ve kterém je obsažen.

V důsledku toho nyní plný uzel Etherea vyžaduje jak exekuční klient, tak konsensuální klient. Tyto dva klienty spolupracují pomocí nového Engine API. Engine API vyžaduje ověření pomocí tajemství JWT, které je poskytnuto oběma klientům a umožňuje bezpečnou komunikaci.

Klíčové kroky zahrnují:

- Nainstalujte konsensuální klient navíc k exekučnímu klientovi
- Ověřte exekuční a konsensuální klienty pomocí sdíleného tajemství JWT, aby spolu mohly bezpečně komunikovat.

Nedokončení výše uvedených bodů bude mít za následek, že se váš uzel bude jevit jako „offline“, dokud nebudou obě vrstvy synchronizovány a ověřeny.

</ExpandableCard>

<ExpandableCard
title="Vývojáři dapp a chytrých kontraktů"
contentPreview="Merge byl navržen tak, aby měl minimální dopad na vývojáře chytrých kontraktů a dapp."
id="developers">

Merge přinesl změny v konsensu, což zahrnuje i změny týkající se:

<ul>
  <li>struktury bloku</li>
  <li>časování slotů/bloků</li>
  <li>změn operačních kódů (opcode)</li>
  <li>zdrojů onchain náhodnosti</li>
  <li>konceptu <em>bezpečné hlavy (safe head)</em> a <em>finalizovaných bloků</em></li>
</ul>

Pro více informací se podívejte na tento blogový příspěvek od Tima Beika o tom, <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer">jak Merge ovlivňuje aplikační vrstvu Etherea</a>.

</ExpandableCard>

## Merge a spotřeba energie {#merge-and-energy}

Merge znamenal konec důkazu prací (PoW) pro Ethereum a odstartoval éru udržitelnějšího a ekologičtějšího Etherea. Spotřeba energie Etherea klesla odhadem o 99,95 %, čímž se Ethereum stalo zeleným blockchainem. Přečtěte si více o [spotřebě energie Etherea](/energy-consumption/).

## Merge a škálování {#merge-and-scaling}

Merge také připravil půdu pro další aktualizace škálovatelnosti, které nebyly v rámci důkazu prací (PoW) možné, a posunul Ethereum o krok blíže k dosažení plného rozsahu, bezpečnosti a udržitelnosti, k nimž směřuje [jeho roadmapa](/roadmap/).

## Mylné představy o Merge {#misconceptions}

<ExpandableCard
title="Mýtus: &quot;Provozování uzlu vyžaduje staking 32 ETH.&quot;"
contentPreview="Nepravda. Kdokoli si může svobodně synchronizovat vlastní, samostatně ověřenou kopii Etherea (tj. provozovat uzel). Není k tomu potřeba žádné ETH – ani před Merge, ani po Merge, prostě nikdy.">

Existují dva typy uzlů Etherea: uzly, které mohou navrhovat bloky, a uzly, které nemohou.

Uzly, které navrhují bloky, tvoří pouze malý počet z celkového počtu uzlů na Ethereu. Do této kategorie patří těžební uzly v rámci důkazu prací (PoW) a uzly validátorů v rámci důkazu podílem (PoS). Tato kategorie vyžaduje vložení ekonomických zdrojů (jako je hashovací výkon GPU u důkazu prací nebo stakované ETH u důkazu podílem) výměnou za možnost občas navrhnout další blok a získat odměny protokolu.

Ostatní uzly v síti (tj. většina) nemusí vkládat žádné ekonomické zdroje nad rámec běžného počítače s 1-2 TB dostupného úložiště a připojením k internetu. Tyto uzly nenavrhují bloky, ale přesto hrají klíčovou roli při zabezpečení sítě tím, že volají k odpovědnosti všechny navrhovatele bloků – naslouchají novým blokům a při jejich přijetí ověřují jejich platnost podle pravidel konsenzu sítě. Pokud je blok platný, uzel jej dále šíří sítí. Pokud je blok z jakéhokoli důvodu neplatný, software uzlu jej bude ignorovat jako neplatný a zastaví jeho šíření.

Provozování uzlu, který neprodukuje bloky, je možné pro kohokoli v rámci obou mechanismů konsensu (důkaz prací i důkaz podílem); všem uživatelům se to <em>důrazně doporučuje</em>, pokud k tomu mají prostředky. Provozování uzlu je pro Ethereum nesmírně cenné a každému jednotlivci, který jej provozuje, přináší další výhody, jako je lepší bezpečnost, soukromí a odolnost vůči cenzuře.

Možnost kohokoli provozovat vlastní uzel je <em>naprosto nezbytná</em> pro zachování decentralizace sítě Ethereum.

[Více o provozování vlastního uzlu](/run-a-node/)

</ExpandableCard>

<ExpandableCard
title="Mýtus: &quot;Merge nesnížil poplatky za gas.&quot;"
contentPreview="Nepravda. Merge byl změnou mechanismu konsensu, nikoli rozšířením kapacity sítě, a nikdy neměl za cíl snížit poplatky za gas.">

Poplatky za gas jsou produktem poptávky v síti v poměru k její kapacitě. Merge ukončil používání důkazu prací (PoW) a přešel na důkaz podílem (PoS) pro konsensus, ale nijak významně nezměnil žádné parametry, které by přímo ovlivňovaly kapacitu nebo propustnost sítě.

S <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">roadmapou zaměřenou na rollupy</a> se úsilí soustředí na škálování uživatelské aktivity na [vrstvě 2 (l2)](/layer-2/), přičemž vrstva 1 (l1) Mainnetu slouží jako bezpečná decentralizovaná vrstva pro vypořádání optimalizovaná pro ukládání dat rollupů, což pomůže exponenciálně zlevnit transakce rollupů. Přechod na důkaz podílem (PoS) je kritickým předpokladem k realizaci tohoto cíle. [Více o gasu a poplatcích.](/developers/docs/gas/)

</ExpandableCard>

<ExpandableCard
title="Mýtus: &quot;Transakce byly díky Merge podstatně zrychleny.&quot;"
contentPreview="Nepravda. Ačkoli existují drobné změny, rychlost transakcí je nyní na vrstvě 1 většinou stejná jako před Merge.">
„Rychlost“ transakce lze měřit několika způsoby, včetně času do zařazení do bloku a času do finalizace. Obojí se mírně mění, ale ne tak, aby si toho uživatelé všimli.

Historicky bylo u důkazu prací (PoW) cílem mít nový blok každých ~13,3 sekundy. V rámci důkazu podílem (PoS) se sloty objevují přesně každých 12 sekund, přičemž každý z nich je příležitostí pro validátora publikovat blok. Většina slotů má bloky, ale ne nutně všechny (např. validátor je offline). V důkazu podílem (PoS) jsou bloky produkovány o ~10 % častěji než u důkazu prací (PoW). Byla to poměrně nevýznamná změna a je nepravděpodobné, že by si jí uživatelé všimli.

Důkaz podílem (PoS) zavedl koncept finality transakcí, který dříve neexistoval. U důkazu prací (PoW) je schopnost zvrátit blok exponenciálně obtížnější s každým dalším blokem vytěženým nad transakcí, ale nikdy nedosáhne úplné nuly. V rámci důkazu podílem (PoS) jsou bloky sdružovány do epoch (časové úseky o délce 6,4 minuty obsahující 32 šancí na bloky), o kterých validátoři hlasují. Když epocha skončí, validátoři hlasují o tom, zda epochu považovat za „ospravedlněnou“. Pokud se validátoři shodnou na ospravedlnění epochy, je v další epoše finalizována. Zrušení finalizovaných transakcí je ekonomicky neproveditelné, protože by vyžadovalo získání a spálení více než jedné třetiny celkového stakovaného ETH.

</ExpandableCard>

<ExpandableCard
title="Mýtus: &quot;Merge umožnil výběry ze stakingu.&quot;"
contentPreview="Nepravda, ale výběry ze stakingu byly od té doby umožněny prostřednictvím upgradu Šanghaj/Capella.">

Zpočátku po Merge měli stakeři přístup pouze ke spropitným z poplatků a MEV, které získali jako výsledek návrhů bloků. Tyto odměny jsou připisovány na nestakovací účet kontrolovaný validátorem (známý jako <em>příjemce poplatků</em>) a jsou k dispozici okamžitě. Tyto odměny jsou oddělené od odměn protokolu za plnění povinností validátora.

Od aktualizace sítě Šanghaj/Capella mohou nyní stakeři určit <em>adresu pro výběr</em>, aby začali dostávat automatické výplaty jakéhokoli přebytečného stakovacího zůstatku (ETH nad 32 z odměn protokolu). Tato aktualizace také umožnila validátorovi odemknout a získat zpět celý svůj zůstatek při výstupu ze sítě.

[Více o výběrech ze stakingu](/staking/withdrawals/)

</ExpandableCard>

<ExpandableCard
title="Mýtus: &quot;Nyní, když je Merge dokončen a výběry jsou povoleny, by všichni stakeři mohli vystoupit najednou.&quot;"
contentPreview="Nepravda. Výstupy validátorů jsou z bezpečnostních důvodů rychlostně omezeny.">
Vzhledem k tomu, že aktualizace Šanghaj/Capella umožnila výběry, jsou validátoři motivováni k výběru svého stakovacího zůstatku nad 32 ETH, protože tyto prostředky nezvyšují výnos a jsou jinak uzamčeny. V závislosti na APR (určeném celkovým stakovaným ETH) mohou být motivováni k výstupu svého validátoru (nebo validátorů), aby získali zpět celý svůj zůstatek, nebo případně stakovali ještě více pomocí svých odměn, aby získali větší výnos.

Důležité upozornění: úplné výstupy validátorů jsou protokolem rychlostně omezeny a za epochu (každých 6,4 minuty) může vystoupit pouze určitý počet validátorů. Tento limit kolísá v závislosti na počtu aktivních validátorů, ale vychází na přibližně 0,33 % z celkového stakovaného ETH, které může být ze sítě vybráno za jediný den.

To zabraňuje masovému odlivu stakovaných prostředků. Dále to brání potenciálnímu útočníkovi s přístupem k velké části celkového stakovaného ETH spáchat přestupek podléhající penalizaci a vystoupit/vybrat všechny zůstatky provinilých validátorů ve stejné epoše, než protokol stihne uplatnit penalizaci (slashing).

APR je také záměrně dynamické, což umožňuje trhu stakerů vyvážit, kolik jsou ochotni dostat zaplaceno za pomoc se zabezpečením sítě. Pokud je sazba příliš nízká, validátoři budou vystupovat rychlostí omezenou protokolem. Postupně to zvýší APR pro všechny, kteří zůstanou, což opět přiláká nové nebo vracející se stakery.
</ExpandableCard>

## Co se stalo s „Eth2“? {#eth2}

Termín „Eth2“ byl zrušen. Po sloučení „Eth1“ a „Eth2“ do jediného řetězce již není nutné rozlišovat mezi dvěma sítěmi Etherea; existuje pouze Ethereum.

Aby se omezil zmatek, komunita tyto termíny aktualizovala:

- „Eth1“ je nyní „exekuční vrstva“, která zpracovává transakce a exekuci.
- „Eth2“ je nyní „vrstva konsensu“, která zpracovává konsensus důkazu podílem (PoS).

Tyto terminologické aktualizace mění pouze konvence pojmenování; nemění to cíle ani roadmapu Etherea.

[Přečtěte si více o přejmenování „Eth2“](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming)

## Vztah mezi aktualizacemi {#relationship-between-upgrades}

Všechny aktualizace Etherea spolu do jisté míry souvisejí. Pojďme si tedy shrnout, jak Merge souvisí s ostatními aktualizacemi.

### Merge a Beacon chain {#merge-and-beacon-chain}

Merge představuje formální přijetí Beacon chainu jako nové vrstvy konsensu k původní exekuční vrstvě Mainnetu. Od Merge jsou validátoři přiděleni k zabezpečení Ethereum Mainnetu a těžba na [důkazu prací (PoW)](/developers/docs/consensus-mechanisms/pow/) již není platným prostředkem produkce bloků.

Bloky jsou místo toho navrhovány validujícími uzly, které stakovaly ETH výměnou za právo účastnit se konsensu. Tyto aktualizace připravily půdu pro budoucí aktualizace škálovatelnosti, včetně shardingu.

<ButtonLink href="/roadmap/beacon-chain/">
  Beacon chain
</ButtonLink>

### Merge a aktualizace Šanghaj {#merge-and-shanghai}

Aby se zjednodušilo a maximalizovalo soustředění na úspěšný přechod na důkaz podílem (PoS), aktualizace Merge nezahrnovala některé očekávané funkce, jako je možnost vybrat stakované ETH. Tato funkcionalita byla povolena samostatně s aktualizací Šanghaj/Capella.

Pro zvědavé, přečtěte si více o tom, [co se stane po Merge](https://youtu.be/7ggwLccuN5s?t=101), jak to prezentoval Vitalik na události ETHGlobal v dubnu 2021.

### Merge a sharding {#merge-and-data-sharding}

Původně bylo v plánu pracovat na shardingu před Merge, aby se vyřešila škálovatelnost. S rozmachem [řešení škálování na vrstvě 2 (l2)](/layer-2/) se však priorita přesunula na to, aby se nejprve vyměnil důkaz prací (PoW) za důkaz podílem (PoS).

Plány pro sharding se rychle vyvíjejí, ale vzhledem k vzestupu a úspěchu technologií vrstvy 2 (l2) pro škálování exekuce transakcí se plány shardingu přesunuly k nalezení nejoptimálnějšího způsobu, jak rozložit zátěž ukládání komprimovaných dat volání (call data) z kontraktů rollupů, což umožní exponenciální růst kapacity sítě. To by nebylo možné bez předchozího přechodu na důkaz podílem (PoS).

<ButtonLink href="/roadmap/danksharding/">
  Sharding
</ButtonLink>

## Další čtení {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />
