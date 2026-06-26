---
title: "Společný staking"
description: "Zjistěte více o stakingových poolech"
lang: cs
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: "Nosorožec Leslie plave v bazénu."
sidebarDepth: 2
summaryPoints:
  - Stakujte a získávejte odměny s jakýmkoli množstvím ETH tím, že spojíte síly s ostatními
  - Přeskočte složitou část a svěřte provoz validátoru třetí straně
  - Držte stakingové tokeny ve své vlastní peněžence
---

## Co jsou stakingové pooly? {#what-are-staking-pools}

Stakingové pooly představují kolaborativní přístup, který umožňuje mnoha uživatelům s menším množstvím ETH získat 32 ETH potřebných k aktivaci sady klíčů validátoru. Funkce sdružování (pooling) není v protokolu nativně podporována, takže řešení byla vytvořena samostatně, aby tuto potřebu naplnila.

Některé pooly fungují pomocí chytrých kontraktů, kam lze vložit prostředky do kontraktu, který bez nutnosti důvěry (trustlessly) spravuje a sleduje váš stake a vydá vám token, který tuto hodnotu reprezentuje. Jiné pooly nemusí zahrnovat chytré kontrakty a jsou místo toho zprostředkovány offchain.

## Proč stakovat s poolem? {#why-stake-with-a-pool}

Kromě výhod, které jsme nastínili v našem [úvodu do stakingu](/staking/), přináší staking s poolem řadu dalších specifických výhod.

<Grid>
  <Card title="Nízká bariéra vstupu" emoji="🐟" description="Nejste velryba? Žádný problém. Většina stakingových poolů vám umožní stakovat prakticky jakékoli množství ETH tím, že spojíte síly s ostatními stakery, na rozdíl od sólo stakingu, který vyžaduje 32 ETH." />
  <Card title="Stakujte ještě dnes" emoji=":stopwatch:" description="Staking s poolem je stejně snadný jako swap tokenů. Nemusíte se starat o nastavení hardwaru a údržbu uzlu. Pooly vám umožňují vložit vaše ETH, což umožňuje provozovatelům uzlů spouštět validátory. Odměny jsou pak rozděleny přispěvatelům po odečtení poplatku za provoz uzlu." />
  <Card title="Stakingové tokeny" emoji=":droplet:" description="Mnoho stakingových poolů poskytuje token, který představuje nárok na vaše stakované ETH a odměny, které generuje. To vám umožňuje využít vaše stakované ETH, např. jako zástavu v DeFi aplikacích." />
</Grid>

<StakingComparison page="pools" />

## Co zvážit {#what-to-consider}

Společný staking nebo delegovaný staking není nativně podporován protokolem [Ethereum](/), ale vzhledem k poptávce uživatelů po stakování méně než 32 ETH bylo vytvořeno rostoucí množství řešení, která tuto poptávku uspokojují.

Každý pool a nástroje nebo chytré kontrakty, které používají, byly vytvořeny různými týmy a každý přináší výhody i rizika. Pooly umožňují uživatelům swapovat jejich ETH za token reprezentující stakované ETH. Token je užitečný, protože umožňuje uživatelům na decentralizovaných burzách swapovat jakékoli množství ETH za ekvivalentní množství výnosového tokenu, který generuje návratnost ze stakingových odměn aplikovaných na podkladové stakované ETH (a naopak), i když skutečné ETH zůstává stakováno na vrstvě konsensu. To znamená, že swapy tam a zpět mezi výnosovým produktem stakovaného ETH a „čistým ETH“ jsou rychlé, snadné a nejsou dostupné pouze v násobcích 32 ETH.

Tyto tokeny stakovaného ETH však mají tendenci vytvářet chování podobné kartelům, kdy velké množství stakovaného ETH končí pod kontrolou několika centralizovaných organizací, místo aby bylo rozloženo mezi mnoho nezávislých jednotlivců. To vytváří podmínky pro cenzuru nebo extrakci hodnoty. Zlatým standardem pro staking by vždy měli být jednotlivci provozující validátory na vlastním hardwaru, kdykoli je to možné.

[Více o rizicích stakingových tokenů](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Níže uvedené indikátory atributů se používají k signalizaci významných silných nebo slabých stránek, které může uvedený stakingový pool mít. Tuto sekci použijte jako referenci pro to, jak tyto atributy definujeme, když si vybíráte pool, ke kterému se připojíte.

<StakingConsiderations page="pools" />

## Prozkoumejte stakingové pooly {#explore-staking-pools}

K dispozici je celá řada možností, které vám pomohou s vaším nastavením. Použijte výše uvedené indikátory, které vás provedou níže uvedenými nástroji.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Vezměte prosím na vědomí důležitost výběru služby, která bere [klientskou diverzitu](/developers/docs/nodes-and-clients/client-diversity/) vážně, protože to zlepšuje bezpečnost sítě a omezuje vaše riziko. Služby, u kterých existují důkazy o omezování používání většinového klienta, jsou označeny jako <em style={{ textTransform: "uppercase" }}>„diverzita exekučního klienta“</em> a <em style={{ textTransform: "uppercase" }}>„diverzita konsensuálního klienta“.</em>

Máte návrh na stakingový nástroj, který jsme vynechali? Podívejte se na naše [zásady pro zařazení produktů](/contributing/adding-staking-products/), abyste zjistili, zda by se hodil, a předložte jej k posouzení.

## Často kladené dotazy {#faq}

<ExpandableCard title="Jak získám odměny?">
Stakingové tokeny ERC-20 jsou obvykle vydávány stakerům a představují hodnotu jejich stakovaného ETH plus odměny. Mějte na paměti, že různé pooly budou distribuovat stakingové odměny svým uživatelům mírně odlišnými metodami, ale toto je společný princip.
</ExpandableCard>

<ExpandableCard title="Kdy si mohu vybrat svůj stake?">
Právě teď! Upgrade sítě Šanghaj/Capella proběhl v dubnu 2023 a zavedl výběry ze stakingu. Účty validátorů, které stojí za stakingovými pooly, mají nyní možnost provést výstup a vybrat ETH na svou určenou adresu pro výběr. To umožňuje vyměnit vaši část staku za podkladové ETH. Ověřte si u svého poskytovatele, jak tuto funkci podporuje.

Alternativně pooly, které využívají stakingový token ERC-20, umožňují uživatelům obchodovat s tímto tokenem na otevřeném trhu, což vám umožňuje prodat vaši stakingovou pozici a efektivně tak „vybrat“ bez skutečného odstranění ETH ze stakingového kontraktu.

<ButtonLink href="/staking/withdrawals/">Více o výběrech ze stakingu</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Liší se to od stakingu na mé burze?">
Mezi těmito možnostmi společného stakingu a centralizovanými burzami existuje mnoho podobností, jako je možnost stakovat malá množství ETH a nechat je spojit dohromady za účelem aktivace validátorů.

Na rozdíl od centralizovaných burz využívá mnoho dalších možností společného stakingu chytré kontrakty a/nebo stakingové tokeny, což jsou obvykle tokeny ERC-20, které lze držet ve vaší vlastní peněžence a kupovat nebo prodávat stejně jako jakýkoli jiný token. To nabízí vrstvu suverenity a bezpečnosti tím, že vám dává kontrolu nad vašimi tokeny, ale stále vám nedává přímou kontrolu nad klientem validátoru, který za vás na pozadí atestuje.

Některé možnosti sdružování jsou decentralizovanější než jiné, pokud jde o uzly, které za nimi stojí. Pro podporu zdraví a decentralizace sítě se stakerům vždy doporučuje vybrat si službu sdružování, která umožňuje decentralizovanou sadu provozovatelů uzlů nevyžadující povolení.
</ExpandableCard>

## Další čtení {#further-reading}

- [Adresář stakingu na Ethereu](https://www.staking.directory/) – _Eridian a Spacesider_
- [Staking s Rocket Pool – Přehled stakingu](https://docs.rocketpool.net/guides/staking/overview.html) – _Dokumentace Rocket Pool_
- [Staking Etherea s Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) – _Dokumentace nápovědy Lido_