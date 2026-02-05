---
title: Sloučení
description: Zjistěte více o Sloučení – když hlavní síť Ethereum přešla na důkaz podílem.
lang: cs
template: upgrade
image: /images/upgrades/merge.png
alt:
summaryPoint1: Hlavní síť Ethereum používá důkaz podílem, ale ne vždy tomu tak bylo.
summaryPoint2: Upgrade z původního mechanismu důkazu prací na důkaz podílem se nazývá Sloučení.
summaryPoint3: Sloučení označuje sloučení původní hlavní sítě Ethereum s odděleným blockchainem založeným na důkazu podílem nazývaným Řetězová vazba, které nyní existují jako jeden řetězec.
summaryPoint4: Sloučení snížilo spotřebu energie potřebné k provozu Etherea přibližně o 99,95 %.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Sloučení bylo provedeno 15. září 2022. Tento krok dokončil přechod Etherea na konsensuální mechanismus důkaz podílem a oficiálně odstranil důkaz prací, čímž snížil spotřebu energie přibližně o 99,95 %.
</UpgradeStatus>

## Co bylo Sloučení? {#what-is-the-merge}

Sloučení bylo spojením původní exekuční vrstvy Etherea (hlavní sítě, která existuje od [počátku](/ethereum-forks/#frontier)) s její novou konsensuální vrstvou s důkazem podílem, Řetězovou vazbou. To eliminovalo potřebu energeticky náročného těžení a místo toho umožnilo zabezpečení sítě pomocí uzamčeného ETH. Byl to opravdu zajímavý krok k naplnění vize Etherea — větší škálovatelnost, bezpečnost a udržitelnost.

<MergeInfographic />

Původně byl [Beacon Chain](/roadmap/beacon-chain/) spuštěn odděleně od [hlavní sítě](/glossary/#mainnet). Hlavní síť Etherea – se všemi svými účty, zůstatky, chytrými kontrakty a stavem blockchainu – byla nadále zabezpečována [důkazem prací](/developers/docs/consensus-mechanisms/pow/), i když Řetězová vazba běžela souběžně a používala [důkaz podílem](/developers/docs/consensus-mechanisms/pos/). Sloučení byl okamžik, kdy se tyto dva systémy konečně spojily a důkaz prací byl trvale nahrazen důkazem podílem.

Představte si Ethereum jako vesmírnou loď, která byla vypuštěna předtím, než byla zcela připravena na mezihvězdné putování. S Řetězovou vazbou komunita postavila nový motor a zpevněný trup. Po pečlivém testování nastal čas vyměnit starý motor za nový během letu. Tím se nový, efektivnější motor zapojil do existující lodi, což jí umožnilo urazit velké vzdálenosti a vydat se hlouběji do vesmíru.

## Sloučení s hlavní sítí {#merging-with-mainnet}

Důkaz prací zabezpečoval hlavní síť Ethereum od začátku (Genesis) až do Sloučení. To umožnilo vznik blockchainu Etherea, na který jsme všichni zvyklí, v červenci 2015, se všemi jeho známými funkcemi — transakcemi, chytrými kontrakty, účty atd.

V průběhu historie Etherea vývojáři připravovali přechod z důkazu prací na důkaz podílem. 1. prosince 2020 byla vytvořena Řetězová vazba jako blockchain oddělený od hlavní sítě, který běžel paralelně.

Řetězová vazba původně nezpracovávala transakce hlavní sítě. Místo toho dosahovala konsensu o svém vlastním stavu tím, že se dohodla na aktivních validátorech a zůstatcích na jejich účtech. Po rozsáhlém testování nastal čas, aby Řetězová vazba dosahovala konsensu o skutečných datech. Po Sloučení se Řetězová vazba stala konsensuálním motorem pro všechna data sítě, včetně transakcí exekuční vrstvy a zůstatků na účtech.

Sloučení představovalo oficiální přechod na používání Řetězové vazby jako pohonu pro vytváření bloků. Těžba už není prostředkem k vytváření platných bloků. Místo toho tuto roli převzali validátoři důkazu podílem, kteří nyní zpracovávají platnost všech transakcí a navrhují bloky.

Historie nebyla během Sloučení vymazána. Jak se hlavní síť sloučila s Řetězovou vazbou, sloučila se také celá transakční historie Etherea.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Tento přechod na důkaz podílem změnil způsob, jakým je ether vydáván. Zjistěte více o [vydávání etheru před a po Sloučení](/roadmap/merge/issuance/).
</AlertDescription>
</AlertContent>
</Alert>

### Uživatelé a držitelé {#users-holders}

**Sloučení nezměnilo nic pro držitele/uživatele.**

_Jednu věc je třeba zdůraznit_: Jako uživatel nebo držitel ETH či jakéhokoli jiného digitálního aktiva na Ethereu, stejně jako stakeři, kteří neprovozují uzel, **nemusíte se svými prostředky nebo peněženkou kvůli Sloučení nic dělat.** ETH je prostě ETH. Neexistuje něco jako „starý ETH“/„nový ETH“ nebo „ETH1“/„ETH2“ a peněženky fungují po Sloučení úplně stejně jako předtím — lidé, kteří vám říkají něco jiného, jsou s největší pravděpodobností podvodníci.

Navzdory přechodu z důkazu prací na důkaz podílem zůstala celá historie Etherea od genesis neporušená a nezměněná. Jakékoliv prostředky držené ve vaší peněžence před Sloučením jsou stále přístupné i po Sloučení. **Nemusíte pro to vůbec nic udělat.**

[Více o zabezpečení Etherea](/security/#eth2-token-scam)

### Provozovatelé uzlů a vývojáři dapp {#node-operators-dapp-developers}

<ExpandableCard
title="Provozovatelé uzlů pro uzamykání a poskytovatelé"
contentPreview="Pokud uzamykáte a provozujete si vlastní uzel nebo jste poskytovatelem infrastruktury uzlů, je zde pár věcí, o kterých byste měli po Sloučení vědět."
id="staking-node-operators">

Klíčové akční položky zahrnují:

1. Spusťte _oba_ klienty: konsensuálního i exekučního; koncové body třetích stran pro získání exekučních dat po Sloučení nefungují.
2. Autentizujte exekučního i konsensuálního klienta s použitím sdíleného JWT klíče, aby spolu mohli komunikovat v zabezpečeném prostředí.
3. Nastavte adresu pro „příjem odměn“ abyste mohli dostat transakční poplatky/MEV, které si vyděláte.

Pokud neprovedete první dvě výše uvedené položky, vámi provozovaný síťový uzel uzel bude považován za „offline“, dokud nebudou obě vrstvy synchronizovány a autentizovány.

Pokud nenastavíte adresu pro „příjem odměn“, váš validátor bude stále fungovat jako obvykle, ale poplatky a MEV, které byste jinak získali v blocích navržených vaším validátorem, budou spáleny. </ExpandableCard>

<ExpandableCard
title="Provozovatelé nevalidujících uzlů a poskytovatelé infrastruktury"
contentPreview="Pokud provozujete nevalidující uzel Etherea, nejvýznamnější změnou, kterou Sloučení přineslo, byl požadavek na spuštění klientů pro OBĚ vrstvy, exekuční I konsensuální."
id="node-operators">

Před Sloučením byl exekuční klient (například Geth, Erigon, Besu nebo Nethermind) dostačující pro příjem, správné ověření a šíření bloků distribuovaných sítí. Platnost transakcí obsažených v exekuční zprávě _po Sloučení_ závisí i na platnosti „konsensuálního bloku“, ve kterém je obsažena.

Výsledkem je, že kompletní síťový uzel Etherea nyní potřebuje jak klienta exekučního, tak konsensuálního. Tyto dva klienty spolupracují prostřednictvím nového Engine API. Engine API vyžaduje autentizaci pomocí JWT klíče, který je poskytován oběma klientům a umožňuje jim tak bezpečnou komunikaci.

Klíčové akční položky zahrnují:

- Nainstalujte si konsensuálního klienta navíc k exekučnímu klientovi
- Autentizujte exekučního a konsensuálního klienta pomocí sdíleného tajemství JWT, aby spolu mohli bezpečně komunikovat.

Nesplnění výše uvedených položek povede k tomu, že váš uzel se bude jevit jako „offline“, dokud nebudou obě vrstvy synchronizovány a autentizovány.

</ExpandableCard>

<ExpandableCard
title="Vývojáři dapp a chytrých kontraktů"
contentPreview="Sloučení bylo navrženo tak, aby mělo minimální dopad na vývojáře chytrých kontraktů a dapp."
id="developers">

Sloučení přineslo změny v konsensu, což zahrnuje i změny týkající se:

<ul>
  <li>struktury bloku</li>
  <li>časování slotů/bloků</li>
  <li>změn opcode</li>
  <li>zdrojů náhodnosti na blockchainu</li>
  <li>konceptu <em>bezpečného prvního prvku</em> a <em>finalizovaných bloků</em></li>
</ul>

Více informací najdete v tomto příspěvku na blogu od Tima Beika o tom, <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/">jak Sloučení ovlivňuje aplikační vrstvu Etherea</a>.

</ExpandableCard>

## Sloučení a spotřeba energie {#merge-and-energy}

Sloučení znamenalo pro Ethereum konec důkazu prací a zahájilo éru udržitelnějšího, ekologičtějšího Etherea. Spotřeba energie Ethereem klesla odhadem o 99,95 %, což činí Ethereum ekologickým blockchainem. Zjistěte více o [spotřebě energie Etherea](/energy-consumption/).

## Sloučení a škálování {#merge-and-scaling}

Sloučení také připravilo půdu pro další vylepšení škálovatelnosti, která nebyla s důkazem prací možná, a přiblížilo tak Ethereum o krok blíže k dosažení plného rozsahu, bezpečnosti a udržitelnosti, ke kterým směřuje [jeho plán](/roadmap/).

## Mylné představy o Sloučení {#misconceptions}

<ExpandableCard
title="Mylná představa: &quot;Provozování uzlu vyžaduje uzamčení 32 ETH.&quot;"
contentPreview="Nepravda. Kdokoli si může synchronizovat vlastní, sebou ověřenou kopii Etherea (tj. provozovat uzel). Žádné ETH není potřeba – ani před Sloučením, ani po Sloučení, nikdy.">

Existují dva typy síťových uzlů Etherea: Uzly, které mohou navrhovat bloky, a uzly, které nemohou.

Uzly, které navrhují bloky, jsou pouze malou částí celkového počtu uzlů na Ethereu. Tato kategorie zahrnuje těžební uzly pod důkazem prací (proof-of-work, PoW) a validační uzly pod důkazem podílem (proof-of-stake, PoS). Tato kategorie vyžaduje investici ekonomických zdrojů (například GPU hashovací výkon v případě důkazu prací nebo uzamčené ETH v případě důkazu podílem) výměnou za možnost občas navrhnout další blok a získat protokolové odměny.

Ostatní uzly v síti (tj. většina) nemusí investovat žádné ekonomické zdroje nad rámec běžného počítače s 1–2 TB dostupného úložiště a internetového připojení. Tyto síťové uzly nenavrhují bloky, ale stále hrají klíčovou roli při zabezpečení sítě tím, že kontrolují platnost nových bloků a ověřují je podle pravidel konsensu sítě. Pokud je blok platný, uzel pokračuje v jeho šíření sítí. Pokud je blok z jakéhokoli důvodu neplatný, software síťového uzlu jej odmítne jako neplatný a přestane jej šířit.

Spuštění uzlu, který nenavrhuje bloky, je možné pro každého pod konsensuálním mechanismem (důkaz prací nebo důkaz podílem) a <em>doporučuje se všem uživatelům</em>, pokud k tomu mají volné prostředky. Provozování takového uzlu je pro Ethereum velmi cenné a poskytuje jednotlivcům, kteří ho provozují, dodatečné výhody, jako je zvýšená bezpečnost, soukromí a odolnost proti cenzuře.

Schopnost každého spustit svůj vlastní uzel je <em>naprostým základem</em> pro udržení decentralizace sítě Ethereum.

[Více o provozování vlastního uzlu](/run-a-node/)

</ExpandableCard>

<ExpandableCard
title="Mylná představa: &quot;Sloučení nesnížilo poplatky za palivo.&quot;"
contentPreview="Nepravda. Sloučení bylo změnou mechanismu konsensu, nikoli rozšířením kapacity sítě, a nikdy nemělo za cíl snížit poplatky za palivo.">

Transakční poplatky jsou výsledkem poptávky na síti v poměru k její kapacitě. Sloučení zrušilo používání důkazu prací, došlo k přechodu na důkaz podílem z důvodu konsensu, ale nezměnilo významně žádné parametry, které přímo ovlivňují kapacitu nebo propustnost sítě.

S <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">plánem orientovaným na rollupy</a> se úsilí zaměřuje na škálování uživatelské aktivity na [druhé vrstvě](/layer-2/), zatímco hlavní síť na první vrstvě funguje jako bezpečná decentralizovaná vypořádací vrstva optimalizovaná pro ukládání dat rollupů, což vede k exponenciálnímu snížení nákladů na transakce na rollupech. Přechod na důkaz podílem je klíčovým předpokladem pro realizaci tohoto cíle. [Více o palivu a poplatcích.](/developers/docs/gas/)

</ExpandableCard>

<ExpandableCard
title="Mylná představa: &quot;Sloučení podstatně zrychlilo transakce.&quot;"
contentPreview="Nepravda. Ačkoli existují drobné změny, rychlost transakcí na první vrstvě je nyní většinou stejná jako před Sloučením.">
„Rychlost“ transakce lze měřit několika způsoby, včetně doby potřebné pro zařazení do bloku a doby do finalizace. Oba tyto aspekty se mírně změnily, ale ne tak, aby to uživatelé zaznamenali.

Historicky, na důkazu prací, bylo cílem mít nový blok přibližně každých 13,3 sekundy. Na důkazu podílem se sloty objevují přesně každých 12 sekund, z nichž každý je příležitostí pro validátora publikovat blok. Většina slotů obsahuje bloky, ale nutně ne všechny (např. když je validátor offline). V případě důkazu podílem se bloky produkují přibližně o 10 % častěji než v případě důkazu prací. Tento rozdíl je poměrně nevýznamný a je nepravděpodobné, že by byl uživateli zaznamenán.

Důkaz podílem zavedl koncept finalizace transakcí, který dříve neexistoval. V případě důkazu prací se schopnost vrátit blok stává exponenciálně obtížnější s každým dalším blokem těženým po této transakci, ale nikdy nedosáhne nuly. V případě důkazu podílem jsou bloky seskupeny do epoch (6,4minutové úseky času obsahující 32 šancí na blok), o kterých validátoři hlasují. Když epocha skončí, validátoři hlasují o tom, zda ji lze považovat za „ověřenou“. Pokud se validátoři dohodnou na justifikaci epochy, bude finalizována v následující epoše. Vrátit finalizované transakce je ekonomicky neproveditelné, protože by to vyžadovalo zisk a spálení více než jedné třetiny celkového uzamčeného ETH.

</ExpandableCard>

<ExpandableCard
title="Mylná představa: &quot;Sloučení umožnilo výběry uzamčených prostředků.&quot;"
contentPreview="Nepravda, ale výběry uzamčených prostředků byly od té doby povoleny prostřednictvím vylepšení Shanghai/Capella.">

Bezprostředně po Sloučení mohli uzamykatelé přistupovat pouze k odměnám za poplatky a MEV, které získali v důsledku navrhování bloků. Tyto odměny jsou připisovány na účet, který sám o sobě vkladový není a který ovládá validátor (známý jako <em>příjemce poplatků</em>), a jsou dostupné okamžitě. Tyto odměny jsou oddělené od protokolových odměn za vykonávání funkcí validátora.

Po vylepšení sítě Shanghai/Capella mohou nyní uzamykatelé určit <em>adresu pro výběr</em>, kde mohou začít přijímat automatické výplaty jakéhokoliv přebytku zůstatku uzamčení (množství větší než je 32 ETH z protokolových odměn). Toto vylepšení také umožnilo validátorovi odemknout a získat celý svůj zůstatek po vystoupení ze sítě.

[Více o výběrech uzamčených prostředků](/staking/withdrawals/)

</ExpandableCard>

<ExpandableCard
title="Mylná představa: &quot;Když je Sloučení dokončeno a výběry jsou povoleny, všichni stakeři mohou odejít najednou.&quot;"
contentPreview="Nepravda. Odejití validátorů je z bezpečnostních důvodů omezeno.">
Od vylepšení Shanghai/Capella, které povolilo výběry, jsou validátoři motivováni k výběru svého zůstatku uzamčených prostředků nad 32 ETH, protože tyto prostředky nepřispívají k výnosu a jinak by ležely nevyužity. V závislosti na APR (určeném celkovým množstvím uzamčeného ETH) mohou být motivováni k vystoupení ze svých validátorů, aby si vymohli celý svůj zůstatek, nebo případně uzamknout ještě více pomocí svých odměn, aby získali větší výnos.

Důležité upozornění: Úplné vystoupení validátorů je omezeno protokolem, a pouze určité množství validátorů může vystoupit během jedné epochy (každých 6,4 minuty). Tento limit se mění v závislosti na počtu aktivních validátorů, ale vychází přibližně na 0,33 % celkového uzamčeného ETH, které může být vybráno ze sítě za jeden den.

To brání masovému exodu uzamčených prostředků. Dále to zabraňuje potenciálnímu útočníkovi, který má přístup k velké části celkového uzamčeného ETH, aby spáchal trestný čin a vystoupil či vybral všechny zůstatky vadných validátorů v jedné epoše, než protokol uplatní trest.

APR je také úmyslně dynamický, což umožňuje trhu uzamykatelů vyvážit, kolik jsou ochotni být placeni za zabezpečení sítě. Pokud je sazba příliš nízká, validátoři vystoupí rychlostí omezenou protokolem. Tento krok postupně zvýší APR pro všechny, kteří zůstanou, a znovu přiláká nové nebo vracející se uzamykatele. </ExpandableCard>

## Co se stalo s Eth2? {#eth2}

Termín Eth2 už se nepoužívá. Po sloučení Eth1 a Eth2 do jednoho řetězce již není potřeba rozlišovat mezi dvěma sítěmi Ethereum; existuje pouze Ethereum.

Aby nedošlo ke zmatku, komunita tyto termíny aktualizovala:

- Eth1 je nyní „exekuční vrstva“, která zpracovává transakce a exekuci.
- Eth2 je nyní „vrstva konsenzu“, která se zabývá konsensem důkazu podílem.

Tyto změny termínů slouží pouze k úpravě názvosloví. Cíle ani plán Etherea se nemění.

[Přečtěte si více o přejmenování „Eth2“](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)

## Vztah mezi vylepšeními {#relationship-between-upgrades}

Všechna vylepšení Etherea jsou vzájemně provázaná. Pojďme si tedy připomenout, jak Sloučení souvisí s ostatními vylepšeními.

### Sloučení a Řetězová vazba {#merge-and-beacon-chain}

Sloučení představuje formální přijetí Řetězové vazby jako nové konsensuální vrstvy k původní exekuční vrstvě, hlavní síti. Od Sloučení jsou validátoři přidělováni k zabezpečení hlavní sítě Etherea a těžba pomocí [důkazu prací](/developers/docs/consensus-mechanisms/pow/) již není platným způsobem produkce bloků.

Bloky jsou nyní navrhovány validujícími uzly, které mají uzamčené ETH, výměnou za právo účastnit se konsensu. Tato vylepšení připravují půdu pro budoucí škálovací vylepšení, včetně tříštění.

<ButtonLink href="/roadmap/beacon-chain/">
  Řetězová vazba
</ButtonLink>

### Sloučení a vylepšení Shanghai {#merge-and-shanghai}

Aby se usnadnilo a maximalizovalo zaměření na úspěšný přechod na důkaz podílem, vylepšení Sloučení z počátku nezahrnovalo některé očekávané funkce, jako je možnost vybrat uzamčené ETH. Tato funkčnost byla umožněna samostatně s vylepšením Shanghai/Capella.

Zvědavci se mohou dozvědět více v prezentaci [Co se stane po Sloučení](https://youtu.be/7ggwLccuN5s?t=101) od Vitalika na akci ETHGlobal v dubnu 2021.

### Sloučení a sharding {#merge-and-data-sharding}

Původní plán byl pracovat na tříštění před Sloučením, aby se zlepšila škálovatelnost. S boomem [řešení škálování druhé vrstvy](/layer-2/) však dostal přednost nejprve přechod z důkazu prací na důkaz podílem.

Plány na tříštění se rychle vyvíjejí, ale vzhledem k úspěchu technologií druhé vrstvy pro škálování exekuce transakcí, se přesunuly na hledání optimálního způsobu, jak distribuovat zátěž, kterou způsobuje uchovávání komprimovaných calldat z kontraktů rollupů, což umožní exponenciální růst kapacity sítě. To by nebylo možné bez předchozího přechodu na důkaz podílem.

<ButtonLink href="/roadmap/danksharding/">
  Sharding
</ButtonLink>

## Další čtení {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />
