---
title: Likvidní a společný staking
description: Přehled likvidního a společného stakingu na Ethereu
lang: cs
template: staking
image: /images/staking/leslie-pool.png
sidebarDepth: 2
summaryPoints:
  - Stakujte a získávejte odměny s jakýmkoli množstvím ETH tím, že spojíte síly s ostatními
  - Přeskočte složitou část a svěřte provoz validátoru třetí straně
  - Držte tokeny likvidního stakingu ve své vlastní peněžence
---

## Co jsou stakingové pooly? {#what-are-staking-pools}

Stakingové pooly představují kolaborativní přístup, který umožňuje mnoha lidem s menším množstvím ETH dosáhnout minima 32 ETH potřebného k aktivaci validátoru na [Ethereu](/). Funkce sdružování (pooling) není v protokolu nativně podporována, takže řešení byla vytvořena samostatně, aby uspokojila potřebu účasti s menšími částkami.

Některé stakingové pooly fungují pomocí chytrých kontraktů, kam jsou prostředky vloženy do kontraktu, který spravuje a sleduje váš stake a vydá vám stvrzenku v podobě tokenu (token likvidního stakingu), který tuto hodnotu představuje. Jiné pooly nemusí využívat chytré kontrakty a jsou místo toho zprostředkovány offchain.

Možnosti společného stakingu se obrovsky liší v tom, kolik si toho o nich můžete ověřit. Transparentní pooly řízené protokolem jsou open-source chytré kontrakty na Ethereu, které drží vklady, zveřejňují své sady provozovatelů uzlů a vydávají směnitelný token; vše, co kryje vaši pozici, je viditelné onchain. Neprůhledné produkty společného stakingu, jako jsou některé výnosové programy centralizovaných burz, převezmou vaše ETH do úschovy a vy nemůžete nezávisle ověřit, co je vaším jménem stakováno, pokud vůbec něco. Většina této stránky se věnuje prvnímu druhu; podívejte se na [neprůhledné produkty společného stakingu](#opaque-pooled-products), abyste zjistili, jak poznat rozdíl.

Každá možnost společného stakingu řeší skutečný problém s přístupem ke stakingu s méně než 32 ETH nebo bez provozování hardwaru. Každá z nich ale také staví prostředníka mezi stakera a základní protokol Etherea. Pouze [sólo staking](/staking/solo/) vám dává přímý, nezprostředkovaný vztah s Ethereem.

## Proč stakovat s poolem? {#why-stake-with-a-pool}

Kromě výhod [účasti na stakingu](/staking/) přináší staking s poolem řadu jedinečných výhod.

<Grid>
  <Card title="Low barrier to entry" icon={<Fish />} description="Nejste velryba? Žádný problém. Většina stakingových poolů vám umožňuje stakovat prakticky jakékoli množství ETH tím, že spojíte síly s ostatními stakery, na rozdíl od sólo stakingu, který vyžaduje 32 ETH." />
  <Card title="Stake today" icon={<Clock />} description="Staking s poolem je stejně snadný jako swap tokenů. Nemusíte se starat o nastavení hardwaru a údržbu uzlu. Pooly vám umožňují vložit vaše ETH, což provozovatelům uzlů umožňuje provozovat validátory. Odměny jsou pak rozděleny přispěvatelům po odečtení poplatku za provoz uzlu." />
  <Card title="Liquid staking tokens" icon={<Droplets />} description="Mnoho stakingových poolů poskytuje token, který představuje nárok na vaše stakované ETH a odměny, které generuje. To vám umožňuje využít vaše stakované ETH, např. jako zajištění v DeFi aplikacích." />
</Grid>

## Srovnání možností stakingu {#comparison-of-staking-options}

<StakingComparison page="pools" />

## Tokeny likvidního stakingu {#liquid-staking-tokens}

Většina transparentních stakingových poolů vydává **token likvidního stakingu (LST)**, ERC-20 token, který představuje nárok na stakované ETH a odměny, které získává. Když vložíte ETH, protokol jej stakuje u svých provozovatelů uzlů a vyrazí (mint) stvrzenku v podobě tokenu (LST) do vaší peněženky. Token můžete držet sami nebo jej svěřit do úschovy poskytovateli třetí strany a můžete jej kdykoli převést nebo prodat. Podkladové ETH zůstává stakováno na vrstvě konsensu. Protokoly likvidního stakingu tvoří přibližně třetinu všech stakovaných ETH, což z LST dělá dnes jeden z nejběžnějších způsobů stakingu.

### Jak se odměny projevují v tokenu {#how-rewards-show-up-in-the-token}

LST odrážejí odměny ze stakingu jedním ze dvou způsobů:

- **Rebasující tokeny** (jako je stETH od Lida): zůstatek vašich tokenů se zvyšuje s tím, jak narůstají odměny, takže jeden token zůstává hodnotou zhruba roven jednomu ETH.
- **Tokeny se směnným kurzem** (jako je rETH od Rocket Poolu): zůstatek vašich tokenů zůstává stejný, ale každý token se postupem času stává směnitelným za rostoucí množství ETH.

Oba návrhy přinášejí odměny po odečtení poplatku stakingového protokolu. Žádný z nich není ze své podstaty lepší, ale chovají se odlišně v peněženkách a aplikacích decentralizovaných financí (DeFi) a v některých jurisdikcích se s nimi pro daňové účely zachází odlišně. Rebasující tokeny mají často „zabalené“ (wrapped) nerebasující verze pro kompatibilitu s [DeFi](/glossary/#defi) aplikacemi.

### Směna a obchodování {#redeeming-and-trading}

Existují dva způsoby, jak opustit pozici v LST:

- **Směna prostřednictvím protokolu** za podkladové ETH. Směna závisí na tom, zda má protokol k dispozici likviditu, ať už jde o rezervu nestakovaných ETH, nebo o validátory, kteří provádějí výstup prostřednictvím fronty pro výstup na vrstvě konsensu, což může nějakou dobu trvat.
- **Prodej na sekundárních trzích** kdykoli. Protože se token volně obchoduje, jeho tržní cena se může odchýlit od hodnoty ETH, které jej kryje, zejména v obdobích tržního stresu.

Od aktualizace Pectra umožňují [výběry spouštěné z exekuční vrstvy (EIP-7002)](https://eips.ethereum.org/EIPS/eip-7002) spouštět výstupy validátorů přímo z exekuční vrstvy držitelem adresy pro výběr. Stakingové protokoly mohou tuto funkci využít k zajištění toho, že jejich validátoři mohou provést výstup, aniž by se museli spoléhat na spolupráci provozovatelů uzlů, takže směny se méně spoléhají na důvěru v provozovatele uzlů než dříve.

### Držení LST není totéž co staking {#holding-an-lst-is-not-the-same-as-staking}

Protokol Etherea vyplácí odměny validátorům; neví, že váš token existuje. Když držíte LST, z pohledu protokolu nejste staker. Místo toho držíte nárok na službu nebo chytrý kontrakt, který stakuje vaším jménem. To funguje dobře za normálních podmínek, ale přináší to další závislosti na důvěře. Vaše stakované ETH závisí na tom, zda kontrakty, správa a provozovatelé poolu fungují správně, a ne pouze na samotném Ethereu.

## Rizika tokenů likvidního stakingu {#risks-of-liquid-staking-tokens}

LST dědí základní rizika stakingu (jako je penalizace a pokuty za prostoje u validátorů poolu) a přidávají své vlastní vrstvy:

- **Riziko chytrých kontraktů** - vaše ETH je drženo kontrakty, které by mohly obsahovat chyby nebo být zneužity. Dávejte přednost protokolům s open-source, auditovaným a v praxi prověřeným kódem.
- **Tržní riziko a riziko likvidity** - cena tokenu na sekundárním trhu může klesnout pod hodnotu ETH, které jej kryje („depegging“). Pokud jsou směny v protokolu pomalé nebo přetížené, když chcete vystoupit, prodej se slevou může být vaším jediným rychlým výstupem.
- **Riziko správy a aktualizací** - poplatky, sady provozovatelů uzlů a dokonce i to, jak token funguje, lze změnit prostřednictvím správy protokolu a aktualizací kontraktů. Jako držitel tokenu obvykle nemáte v této správě žádný hlas.
- **Centralizace sady provozovatelů** - některé pooly koncentrují stake u jimi vybraných provozovatelů uzlů. Velké množství stakovaných ETH pod kontrolou několika organizací vytváří podmínky pro cenzuru, extrakci hodnoty a jediná místa selhání (single points of failure). Dávejte přednost poolům s distribuovanými sadami provozovatelů nevyžadujícími povolení.
- **Přenos penalizace** - pokud jsou validátoři poolu penalizováni nebo pokutováni, ztráta je obvykle socializována mezi všechny držitele tokenů podle pravidel protokolu.

<Alert variant="update">
<AlertIcon size="xl"><Split /></AlertIcon>
<AlertContent>
<AlertDescription>
Mnoho poolů snižuje riziko provozovatele pomocí **technologie distribuovaných validátorů (DVT)**, middlewaru, který rozděluje klíč validátoru mezi více strojů a provozovatelů, takže žádné jediné selhání nebo kompromitace nevyřadí validátor z provozu. [Více o technologii distribuovaných validátorů](/staking/dvt/)
</AlertDescription>
</AlertContent>
</Alert>

## Neprůhledné produkty společného stakingu {#opaque-pooled-products}

Ne vše, co je propagováno jako „staking“, je staking na úrovni protokolu. Programy „earn“ nebo „rewards“ na centralizovaných burzách a některé výnosové produkty postavené na stakingových tokenech sdružují ETH zákazníků způsoby, které nemůžete zkontrolovat:

- **Úschova (custodial)** - poskytovatel drží klíče pro výběr a ETH.
- **Podmínky se mohou změnit** - sazby, uzamčení a způsobilost jsou stanoveny firemními zásadami a mohou být kdykoli revidovány, na rozdíl od pravidel vynucovaných onchain kontrakty.
- **Nemusí jít vůbec o staking** - interně může výnos pocházet z půjčování, obchodování nebo jiných aktivit spíše než od validátorů. Obvykle nemáte možnost si to ověřit.
- **Riziko protistrany** - pokud se poskytovatel stane insolventním nebo zmrazí výběry, neexistuje nic onchain, co byste mohli směnit.

Chcete-li rozeznat transparentní pool od neprůhledného produktu, zeptejte se:

1. Můžete onchain ověřit, kam vaše ETH směřuje, v open-source, auditovaných kontraktech?
2. Je zveřejněna sada provozovatelů uzlů?
3. Obdržíte token držený ve vaší vlastní peněžence, který je směnitelný za podkladové ETH?
4. Jsou pravidla vynucována chytrými kontrakty a veřejnou správou, nebo podmínkami služby společnosti?

Na čím více z těchto otázek může poskytovatel odpovědět pouze „věřte nám“, tím neprůhlednější produkt je.

<Alert variant="warning">
<AlertIcon size="lg"><TriangleAlert /></AlertIcon>
<AlertContent>
<AlertDescription>
Některé produkty inzerují „vylepšený“ nebo „zvýšený“ výnos kombinací stakingu s **restakingem**, což je případ užití pro LST, který zavazuje stakované ETH k zabezpečení dalších protokolů za dodatečných podmínek penalizace. Restaking je samostatná kategorie rizika a nová aplikace postavená na LST, nikoli forma přímé účasti na stakingu. Pokud je hodnota výnosu smysluplně vyšší než sazba stakingu základní sítě, měli byste se zeptat, odkud přesně dodatečný výnos pochází. [Co je restaking?](/restaking/)
</AlertDescription>
</AlertContent>
</Alert>

## Provozujte uzel pro pool {#run-a-node-for-a-pool}

Stát se vázaným provozovatelem uzlu pro stakingový pool je střední cesta mezi držením tokenu a sólo stakingem. Některé stakingové protokoly umožňují jednotlivcům provozovat validátory pomocí společných ETH od jiných uživatelů. Složíte kauci z vlastních ETH jako zajištění, provozujete hardware a klíče a získáváte provizi ze staku, který je vám přidělen.

Například validátoři megapoolu Rocket Pool vyžadují kauci 4 ETH na validátor a Community Staking Module od Lida vyžaduje přibližně 2,4 ETH pro první klíč validátoru (1,5 ETH pro identifikované komunitní stakery). To nabízí lidem s méně než 32 ETH způsob, jak provozovat vlastní hardware a posílit sadu provozovatelů sítě, přičemž přijímají pravidla poolu, požadavky na výkon a podmínky penalizace.

## Co zvážit {#what-to-consider}

Každý pool a nástroje nebo chytré kontrakty, které používají, byly vytvořeny různými týmy a každý přináší výhody a rizika. Společný nebo delegovaný staking není nativně podporován protokolem Etherea a zlatým standardem pro staking by vždy měli být jednotlivci provozující validátory na vlastním hardwaru, kdykoli je to možné.

Níže jsou použity indikátory atributů k signalizaci významných silných nebo slabých stránek, které může uvedený stakingový pool mít. Tuto sekci použijte jako referenci pro to, jak tyto atributy definujeme, když si vybíráte pool, ke kterému se připojíte.

<StakingConsiderations page="pools" />

## Prozkoumejte stakingové pooly {#explore-staking-pools}

K dispozici je celá řada možností, které vám pomohou s vaším nastavením. Použijte výše uvedené indikátory, které vás provedou níže uvedenými nástroji.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Vezměte prosím na vědomí důležitost výběru služby, která bere [klientskou diverzitu](/developers/docs/nodes-and-clients/client-diversity/) vážně, protože to zlepšuje bezpečnost sítě a omezuje vaše riziko. Služby, u kterých existují důkazy o omezování používání většinového klienta, jsou označeny <em style={{ textTransform: "uppercase" }}>„diverzita exekučních klientů“</em> a <em style={{ textTransform: "uppercase" }}>„diverzita konsensuálních klientů“.</em>

Máte návrh na nástroj pro staking, který jsme vynechali? Podívejte se na naše [zásady pro zařazení produktů](/contributing/adding-staking-products/), abyste zjistili, zda by se hodil, a předložte jej k posouzení.

<StakingCommunityCallout className="my-16" />

## Často kladené dotazy {#faq}

<ExpandableCard title="Jak získám odměny?">
Obvykle jsou stakerům vydávány ERC-20 tokeny likvidního stakingu, které představují hodnotu jejich stakovaných ETH plus odměny. Odměny se k vám dostanou jedním ze dvou způsobů v závislosti na návrhu tokenu: rebasující tokeny zvyšují váš zůstatek tokenů s tím, jak narůstají odměny, zatímco tokeny se směnným kurzem udržují váš zůstatek fixní a postupem času se stávají směnitelnými za více ETH. V obou případech jsou odměny rozdělovány po odečtení poplatku poolu.
</ExpandableCard>

<ExpandableCard title="Kdy mohu vybrat svůj stake?">
Výběry ze stakingu byly povoleny od aktualizace Šanghaj/Capella v dubnu 2023. Účty validátorů, které kryjí stakingové pooly, mohou provést výstup a vybrat ETH na svou určenou adresu pro výběr, což vám umožní směnit vaši část staku za podkladové ETH. Rychlost směny závisí na dostupné likviditě vašeho poolu a frontě pro výstup na vrstvě konsensu. Ověřte si u svého poskytovatele, jak tuto funkci podporuje.

Od aktualizace Pectra mohou pooly také využívat výběry spouštěné z exekuční vrstvy (EIP-7002) k výstupu validátorů přímo z adresy pro výběr, aniž by se spoléhaly na podepisovací klíče provozovatelů uzlů, což snižuje důvěru potřebnou k tomu, aby byly směny dodrženy.

Alternativně pooly, které využívají ERC-20 token likvidního stakingu, umožňují uživatelům obchodovat s tímto tokenem na otevřeném trhu, což vám umožňuje prodat vaši stakingovou pozici a efektivně „vybrat“ bez skutečného odstranění ETH ze stakingového kontraktu. Upozorňujeme, že tržní cena se může lišit od hodnoty směny tokenu.

<ButtonLink href="/staking/withdrawals/">Více o výběrech ze stakingu</ButtonLink>
</ButtonLink>

<ExpandableCard title="Liší se to od stakingu na mé burze?">
Mezi těmito možnostmi společného stakingu a centralizovanými burzami existuje mnoho podobností, jako je schopnost stakovat malá množství ETH a nechat je spojit dohromady k aktivaci validátorů.

Na rozdíl od centralizovaných burz využívá mnoho dalších možností společného stakingu chytré kontrakty a/nebo tokeny likvidního stakingu, což jsou obvykle ERC-20 tokeny, které lze držet ve vaší vlastní peněžence a kupovat nebo prodávat stejně jako jakýkoli jiný token. To nabízí vrstvu suverenity a bezpečnosti tím, že vám dává kontrolu nad vašimi tokeny, ale stále vám to nedává přímou kontrolu nad klientem validátoru, který na pozadí atestuje vaším jménem.

Burzovní programy „earn“ jsou také úschovné (custodial) a řídí se spíše podmínkami společnosti než onchain pravidly a jejich výnos nemusí vůbec pocházet ze stakingu na úrovni protokolu. Podívejte se na [neprůhledné produkty společného stakingu](#opaque-pooled-products), abyste zjistili, jak poznat rozdíl.

Některé možnosti společného stakingu jsou decentralizovanější než jiné, pokud jde o uzly, které je kryjí. Pro podporu zdraví a decentralizace sítě se stakerům vždy doporučuje vybrat si službu společného stakingu, která umožňuje decentralizovanou sadu provozovatelů uzlů nevyžadující povolení.
</ExpandableCard>

## Další čtení {#further-reading}

- [Adresář stakingu na Ethereu](https://www.staking.directory/) - _Eridian a Spacesider_
- [Rizika derivátů likvidního stakingu](https://notes.ethereum.org/@djrtwo/risks-of-lsd) - _Danny Ryan_
- [Co je likvidní staking?](https://chain.link/education-hub/liquid-staking) - _Chainlink_
- [EIP-7002: Výběry spouštěné z exekuční vrstvy](https://eips.ethereum.org/EIPS/eip-7002) - _Návrhy na vylepšení Etherea (EIP)_
- [Hodnocení stakingových poolů na Ethereu](https://explorer.rated.network/) - _Rated Network Explorer_
- [Jaký je rozdíl mezi tokenem likvidního restakingu (LRT) a tokenem likvidního stakingu (LST)?](https://liquidcollective.io/lst-vs-lrt/) - _Liquid Collective_