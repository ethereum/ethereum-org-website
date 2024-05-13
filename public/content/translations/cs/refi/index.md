---
title: Regenerativní finance (ReFi)
description: Přehled ReFi a aktuálních případů použití.
lang: cs
template: use-cases
emoji: ":recycle:"
sidebarDepth: 2
image: /future_transparent.png
alt: ""
summaryPoint1: Alternativní ekonomický systém postavený na regenerativních principech
summaryPoint2: Snaha využít Ethereum k řešení koordinačních krizí na globální úrovni, jako je změna klimatu
summaryPoint3: Nástroj k významnému zvýšení škálování ekologických výhod, jako jsou ověřené emisní povolenky
---

## Co je to ReFi? {#what-is-refi}

Pod pojmem **Regenerativní finance (ReFi)** rozumíme sadu nástrojů a nápadů na blockchainech, jejichž cílem je vytvářet ekonomiky, které jsou regenerativní, spíše než vykořisťovatelské nebo zaměřené na vytěžení surovin. Systémy zaměřené na vytěžení surovin časem spotřebují dostupné zdroje a zhroutí se; bez regenerativních mechanismů jim chybí odolnost. ReFi předpokládá, že vytváření monetární hodnoty je třeba oddělit od neudržitelného vytěžování zdrojů z naší planety a komunit.

Namísto toho se ReFi snaží řešit environmentální, komunitní nebo sociální problémy vytvářením regenerativních cyklů. Tyto systémy vytvářejí hodnotu pro účastníky a současně jsou prospěšné pro ekosystémy a komunity.

Jedním ze základů ReFi je koncept regenerativní ekonomie, jehož průkopníkem je John Fullerton z Capital Institute. Navrhl [osm vzájemně propojených principů](https://capitalinstitute.org/8-principles-regenerative-economy/), které jsou základem zdravého ekosystému:

![Osm vzájemně propojených principů](refi-regenerative-economy-diagram.png)

ReFi projekty realizují tyto principy pomocí [smart kontraktů](/developers/docs/smart-contracts/) a aplikací [decentralizovaných financí (DeFi)](/defi/), které motivují regenerativní chování, například obnovu degradovaných ekosystémů, a usnadňují širokou spolupráci v globálních otázkách, jako je změna klimatu a ztráta biodiverzity.

ReFi se také částěčně překrývá s hnutím [decentralizované vědy (DeSci)](/desci/), které využívá platformu Ethereum k financování, vytváření, recenzování, oceňování, ukládání a šíření vědeckých znalostí. Nástroje DeSci by mohly být užitečné pro vývoj ověřitelných standardů a postupů pro implementaci a monitorování regenerativních aktivit, jako je výsadba stromů, odstraňování plastů z oceánu nebo obnova degradovaného ekosystému.

## Tokenizace emisních povolenek {#tokenization-of-carbon-credits}

**[Dobrovolný trh s emisními povolenkami (voluntary carbon market, VCM)](https://climatefocus.com/so-what-voluntary-carbon-market-exactly/)** je mechanismus pro financování projektů, které mají ověřitelný pozitivní vliv na emise uhlíku, ať už jde o snižování probíhajících emisí nebo odstraňování skleníkových plynů již vypuštěných do atmosféry. Tyto projekty po ověření obdrží aktivum nazvané "uhlíkové kredity". Tyto kredity mohou prodávat jednotlivcům a organizacím, které chtějí podpořit opatření na ochranu klimatu.

Kromě VCM existuje také několik vládou řízených trhů s emisními povolenkami (tzv. „povinné trhy“), které se snaží stanovit cenu uhlíku prostřednictvím zákonů nebo nařízení v určité jurisdikci (např. země nebo regionu), a tím řídí nabídku distribuovaných povolenek. Povinné trhy motivovují znečišťovatele v rámci své jurisdikce ke snižování emisí, ale nejsou schopné redukovat skleníkové plyny, které již byly emitovány.

Navzdory svému vývoji v posledních desetiletích má VCM řadu nedostatků:

1. Silně fragmentovaná likvidita
2. Netransparentní mechanismy transakcí
3. Vysoké poplatky
4. Příliš malá rychlost obchodování
5. Nedostatek škálovatelnosti

Přechod VCM na nový **digitální trh s uhlíkovými kredity (digital carbon market, DCM)** založený na blockchainové technologii by mohl být příležitostí pro modernizaci stávající technologie pro ověřování, převod a spotřebu emisních povolenek. Blockchainové technologie umožňují veřejně ověřitelná data, přístup pro širokou škálu uživatelů a vyšší likviditu.

Projekty ReFi využívají technologii blockchainu k řešení množství problémů tradičního trhu:

- **Likvidita je soustředěna v malém počtu likvidních poolů**, které může kdokoliv volně obchodovat. Velké organizace, stejně jako jednotliví uživatelé, mohou tyto pooly využívat bez manuálního vyhledávání prodejců/kupců, bez účastnických poplatků nebo registrace.
- **Všechny transakce se zaznamenávají na veřejné blockchainy**. Od okamžiku, kdy je kredit k dispozici v DCM, je cesta, kterou každá emisní povolenka absolvuje v důsledku obchodní aktivity, navždy sledovatelná.
- **Transakce jsou zpracovány téměř okamžitě**. Obstarání velkého množství emisních povolenek prostřednictvím tradičních trhů může trvat dny nebo týdny, ale na DCM toho lze dosáhnout během několika sekund.
- **Obchodování probíhá bez zprostředkovatelů**, kteří si účtují vysoké poplatky. Podle dat jisté analytické společnosti představují digitální emisní povolenky [62% zlepšení nákladů ve srovnání se srovnatelnými tradičními povolenkami](https://www.klimadao.finance/blog/klimadao-analysis-of-the-base-carbon-tonne).
- **DCM je škálovatelný** a může uspokojit potřeby jednotlivců i nadnárodních společností.

### Klíčové složky DCM {#key-components-dcm}

Současný ekosystém DCM se skládá ze čtyř hlavních složek:

1. Registry, jako je například [Verra](https://verra.org/project/vcs-program/registry-system/) a [Gold Standard](https://www.goldstandard.org/), zajišťují, že projekty vytvářející emisní povolenky jsou spolehlivé. Také provozují databáze, ve kterých digitální emisní povolenky vznikají a mohou být převáděny nebo spotřebovány (zrušeny).

Nová vlna inovativních projektů budovaných na blockchainech se snaží konkurovat tradičním hráčům v tomto odvětví.

2. Emisní bridge, a.k.a. tokenizery poskytují technologii pro reprezentaci nebo přenos emisních povolenek z tradičních registrů do DCM. Mezi zajímavé příklady patří [Toucan Protocol](https://toucan.earth/), [C3](https://c3.app/) a [Moss.Earth](https://moss.earth/).
3. Integrované služby nabízejí koncovým uživatelům kredity za zamezení a/nebo odstranění uhlíkových emisí. Takto mohou získat reputaci v oblasti životního prostředí a sdílet se světem, že podporují kroky vedoucí ke zlepšení životního prostředí.

Některé organizace, jako jsou [Klima Infinity](https://www.klimadao.finance/infinity) a [Senken](https://senken.io/), nabízejí širokou škálu projektů vyvinutých třetími stranami a vydávaných podle zavedených standardů, jako je Verra; jiné, jako je [Nori](https://nori.com/), nabízejí pouze konkrétní projekty vyvinuté v rámci jejich vlastního standardu emisních povolenek, které vydávají a pro které mají vyhrazen svůj vlastní trh.

4. Základní infrastruktura, která usnadňuje zvýšení dopadu a účinnosti celého dodavatelského řetězce na trhu s emisními povolenkami. [KlimaDAO](http://klimadao.finance/) dodává likviditu jako veřejný statek (umožňuje komukoli nakupovat nebo prodávat emisní povolenky za transparentní cenu), pobízí ke zvýšení přístupnosti trhů s povolenkami a odměnám za jejich vyřazení. Také poskytuje uživatelsky přívětivé interoperabilní nástroje pro přístup k údajům o široké škále tokenizovaných emisních povolenek, o jejich získávání a vyřazení.

## ReFi mimo trhy s emisními povolenkami {#refi-beyond}

Ačkoliv je v současnosti kladen silný důraz na trhy s emisními povolenkami obecně a zejména na přechod z VCM na DCM, termín „ReFi“ není striktně omezen na tento problém. Další environmentální aktiva mimo emisní povolenky mohou být vyvinuta a tokenizována, což znamená, že další negativní externality mohou být také zahrnuty do základních vrstev budoucích ekonomických systémů. Navíc lze regenerativní aspekt tohoto ekonomického modelu aplikovat i na jiné oblasti, jako je financování veřejných statků prostřednictvím platforem pro kvadratické financování, například [Gitcoin](https://gitcoin.co/). Organizace postavené na myšlence otevřené účasti a spravedlivé distribuce zdrojů umožňují komukoliv směrovat peníze do open-source software projektů, stejně jako do projektů zaměřených na vzdělávání, životní prostředí a komunity.

Přesunem směřování kapitálu z projektů vytěžujících zdroje k regenerativně zaměřeným akcím mohou projekty a společnosti, které poskytují sociální, environmentální nebo komunitní výhody – a které by nemusely získat financování v tradičním finančním sektoru – rychleji a snadněji získat základní kapitál a generovat pozitivní externality pro společnost. Přechod na tento model financování také otevírá dveře mnohem inkluzivnějším ekonomickým systémům, ve kterých se lidé všech demografických skupin mohou stát aktivními účastníky místo pouhých pasivních pozorovatelů. ReFi nabízí vizi Etherea jako mechanismu pro koordinaci akcí souvisejících s existenčními výzvami, kterým čelí naše druhy a veškerý život na naší planetě – jako základní vrstvu nového ekonomického paradigmatu, který umožňuje inkluzivnější a udržitelnou budoucnost na budoucí staletí.

## Další zdroje informací o ReFi

- [Základní přehled emisních měn a jejich místo v ekonomice](https://www.klimadao.finance/blog/the-vision-of-a-carbon-currency)
- [The Ministry for the Future, román popisující roli měny kryté emisními povolenkami v boji proti změně klimatu](https://en.wikipedia.org/wiki/The_Ministry_for_the_Future)
- [Podrobná zpráva od Taskforce on Scaling Voluntary Carbon Markets](https://www.iif.com/Portals/1/Files/TSVCM_Report.pdf)
- [Glossář o ReFi od Kevina Owockiho a Evana Miyazona na CoinMarketCap](https://coinmarketcap.com/alexandria/glossary/regenerative-finance-refi)
