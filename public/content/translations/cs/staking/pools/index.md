---
title: "Sdružené uzamčení"
description: "Zjistěte více o stakingových poolech"
lang: cs
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-rhino-mascot-swimming-pool.png
alt: "Nosorožec Leslie plave v bazénu."
sidebarDepth: 2
summaryPoints:
  - Vložte a vydělávejte s jakýmkoliv množství ETH spojením sil s ostatními
  - Přeskočte těžkou část a svěřte operaci validátoru třetí straně
  - Mějte vkladové tokeny ve své peněžence
---

## Co jsou vkladové fondy? {#what-are-staking-pools}

Vkladový fond je přístup založený na spolupráci, který umožňuje mnoha lidem s menším množsvím ETH získat 32 ETH potřebných k aktivaci sady validátorových klíčů. Funkce stakingových fondů není v rámci protokolu nativně podporována, takže řešením byla vytvořena tato samostatná funkce, aby potřebu řešila.

Některé fondy fungují pomocí chytrých kontraktů, kde lze vložit prostředky do kontraktu, který důvěryhodně spravuje a sleduje váš vklad a vydává vám token, který představuje tuto hodnotu. Jiné fondy nemusí zahrnovat chytré kontrakty a jsou místo toho zprostředkovány mimo blockchain.

## Proč vkládat s fondem? Proč stakovat s poolem? {#why-stake-with-a-pool}

Kromě výhod, které jsme nastínili v našem [úvodu do stakování](/staking/), přináší stakování v poolu řadu odlišných výhod.

<CardGrid>
  <Card title="Nízká vstupní bariéra" emoji="🐟" description="Nejste velryba? Žádný problém. Většina stakovacích poolů umožňuje stakovat prakticky jakékoli množství ETH společně s ostatními, na rozdíl od sólo stakování, které vyžaduje 32 ETH." />
  <Card title="Stakujte ještě dnes" emoji=":stopwatch:" description="Stakování v poolu je stejně snadné jako směna tokenů. Nemusíte si dělat starosti s nastavováním hardwaru a údržbou uzlu. Pooly vám umožní vložit ETH, což provozovatelům uzlů umožní spouštět validátory. Odměny se pak rozdělí mezi přispěvatele po odečtení poplatku za provoz uzlů." />
  <Card title="Stakovací tokeny" emoji=":droplet:" description="Mnoho stakovacích poolů poskytuje token, který představuje nárok na vaše stakované ETH a odměny, které generuje. To vám umožní využít vaše stakované ETH, například jako zástavu v DeFi aplikacích." />
</CardGrid>

<StakingComparison page="pools" />

## Co je třeba zvážit {#what-to-consider}

Sdružené nebo delegované vklady nejsou nativně podporovány protokolem Ethereum, ale vzhledem k poptávce po uživatelích, aby vkládali méně než 32 ETH, byl vytvořen rostoucí počet řešení, která tuto poptávku uspokojí.

Každý fond a nástroje nebo chytré kontrakty, které používají, byly vytvořeny různými týmy a všechny mají jiné výhody a rizika. Fondy umožňují uživatelům směnit ETH za token představující vložený ETH. Tento token je užitečný, protože umožňuje uživatelům směnit jakékoli množství ETH za ekvivalentní částku tokenu nesoucího výnos, který generuje výnos z vložených odměn aplikovaných na podkladové vložené ETH (a naopak) na decentralizovaných burzách, i když skutečný ETH zůstává vložen v konsensuální vrstvě. To znamená, že směny tam a zpět z vloženého ETH nesoucího výnos a „raw ETH“ jsou rychlé, snadné a jsou dostupné i v jiných objemech než jen v násobcích 32 ETH.

Tyto vložené ETH tokeny však mají tendenci vykazovat kartelové chování, kdy velké množství vložených ETH skončí pod kontrolou několika centralizovaných organizací, místo toho aby bylo rozděleno mezi mnoho nezávislých jednotlivců. To vytváří podmínky pro cenzuru nebo extrakci hodnot. Zlatým standardem pro vkládání by vždy měli být jednotlivci provozující validátory na vlastním hardwaru, kdykoli je to možné.

[Více o rizicích stakování tokenů](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Atributové indikátory se používají níže k signalizaci pozoruhodných silných nebo slabých stránek, které může mít uvedený vkladový fond. Tuto část použijte jako referenci, jak definujeme tyto atributy, když vybíráte fond, ke kterému se chcete připojit.

<StakingConsiderations page="pools" />

## Prozkoumejte stakingové pooly {#explore-staking-pools}

K dispozici jsou různé možnosti, které vám pomohou s nastavením. Pomocí výše uvedených indikátorů vás provedou níže uvedenými nástroji.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Vezměte prosím na vědomí, že je důležité vybrat si službu, která bere [rozmanitost klientů](/developers/docs/nodes-and-clients/client-diversity/) vážně, protože zlepšuje zabezpečení sítě a omezuje vaše riziko. Služby, které prokazatelně omezují většinové klientské používání, jsou označeny <em style={{ textTransform: "uppercase" }}>"rozmanitost realizačního klienta"</em> a <em style={{ textTransform: "uppercase" }}>"rozmanitost klientů konsensu."</em>

Máte návrh na vkladový nástroj, který nám chyběl? Podívejte se na naše [zásady pro uvádění produktů](/contributing/adding-staking-products/), abyste zjistili, zda je váš produkt vhodný, a mohli ho odeslat ke kontrole.

## Často kladené dotazy {#faq}

<ExpandableCard title="Jak získám odměny?">
Tokeny ERC-20 jsou obvykle vydávány vkladatelům a představují hodnotu jejich vložených ETH společně s odměnami. Mějte na paměti, že různé fondy rozdělují odměny za vklady svým uživatelům mírně odlišnými metodami, ale toto je společné téma.
</ExpandableCard>

<ExpandableCard title="Kdy si můžu vybrat svůj vklad?">
Právě teď! K upgradu sítě Shanghai/Capella došlo v dubnu 2023 a zavedlo výběry vkladů. Účty validátorů, které podporují vkladové fondy, mají nyní možnost opustit a vybrat ETH na jejich určenou adresu pro výběr. To umožňuje možnost vykoupit část svého vkladu za základní ETH. Informujte se u svého poskytovatele, jak tuto funkci podporuje.

Případně fondy, které využívají token ERC-20 pro vkládání, umožňují uživatelům obchodovat s tímto tokenem na otevřeném trhu, což vám umožní prodat svou pozici pro vkládání a efektivně se „stáhnout“, aniž byste skutečně odstranili ETH ze smlouvy o vkládání.

<ButtonLink href="/staking/withdrawals/">Více o výběrech ze stakování</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Liší se to od stakování na mé burze?">
Existuje mnoho podobností mezi těmito možnostmi stakování v poolech a centralizovanými burzami, jako je možnost stakovat malá množství ETH a nechat je spojit dohromady pro aktivaci validátorů.

Na rozdíl od centralizovaných burz využívá mnoho dalších možností sdruženého vkládání chytré kontrakty a/nebo vkladové tokeny, což jsou obvykle tokeny ERC-20, které lze držet ve vlastní peněžence a kupovat nebo prodávat stejně jako jakýkoli jiný token. To nabízí vrstvu suverenity a zabezpečení tím, že vám dává kontrolu nad vašimi tokeny, ale stále vám nedává přímou kontrolu nad klientem validátoru, který osvědčuje vaším jménem na pozadí.

Některé možnosti sdružování jsou více decentralizované než jiné, pokud jde o uzly, které je podporují. Za účelem podpory zdraví a decentralizace sítě se vklady držitelé vždy doporučuje, aby si vybrali službu sdružování, která umožňuje decentralizovanou sadu operátorů uzlů bez povolení.
</ExpandableCard>

## Další čtení {#further-reading}

- [Adresář stakování Etherea](https://www.staking.directory/) - _Eridian and Spacesider_
- [Stakování s Rocket Pool – Přehled stakování](https://docs.rocketpool.net/guides/staking/overview.html) - _dokumentace RocketPoolu_
- [Stakování Etherea s Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _nápověda Lido_
