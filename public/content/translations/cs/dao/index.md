---
title: Co je to DAO?
metaTitle: "Co je to DAO? | Decentralizovaná autonomní organizace"
description: "Přehled DAO na Ethereu"
lang: cs
template: use-cases
sidebarDepth: 2
image: /images/use-cases/dao-2.png
alt: "Znázornění DAO hlasující o návrhu."
summaryPoints:
  - "Komunity vlastněné členy bez centralizovaného vedení."
  - "Bezpečný způsob spolupráce s cizími lidmi na internetu."
  - "Bezpečné místo pro vložení prostředků na konkrétní účel."
---

## Co jsou to DAO? {#what-are-daos}

DAO je kolektivně vlastněná organizace pracující na společné misi.

DAO nám umožňují spolupracovat s podobně smýšlejícími lidmi po celém světě, aniž bychom museli důvěřovat benevolentnímu vůdci, že bude spravovat prostředky nebo operace. Neexistuje žádný generální ředitel (CEO), který by mohl utrácet prostředky z rozmaru, ani finanční ředitel (CFO), který by mohl manipulovat s účetnictvím. Místo toho pravidla založená na blockchainu, která jsou pevně zakódována, definují, jak organizace funguje a jak se utrácejí prostředky.

Mají zabudované pokladny, ke kterým nemá nikdo oprávnění přistupovat bez schválení skupiny. Rozhodnutí se řídí návrhy a hlasováním, aby se zajistilo, že každý v organizaci má hlas, a vše probíhá transparentně [onchain](/glossary/#onchain).

## Proč potřebujeme DAO? {#why-dao}

Založení organizace s někým, což zahrnuje financování a peníze, vyžaduje velkou důvěru v lidi, se kterými spolupracujete. Je ale těžké důvěřovat někomu, s kým jste komunikovali pouze na internetu. U DAO nemusíte důvěřovat nikomu dalšímu ve skupině, pouze kódu DAO, který je 100% transparentní a kýmkoli ověřitelný.

To otevírá mnoho nových příležitostí pro globální spolupráci a koordinaci.

### Srovnání {#dao-comparison}

| DAO                                                                                                                     | Tradiční organizace                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Obvykle plochá a plně demokratizovaná.                                                                                  | Obvykle hierarchická.                                                                                                        |
| K provedení jakýchkoli změn je vyžadováno hlasování členů.                                                              | V závislosti na struktuře mohou být změny vyžadovány jedinou stranou, nebo může být nabídnuto hlasování.                     |
| Hlasy jsou sečteny a výsledek je implementován automaticky bez důvěryhodného zprostředkovatele.                         | Pokud je hlasování povoleno, hlasy se sčítají interně a výsledek hlasování se musí zpracovat ručně.                          |
| Nabízené služby jsou zpracovávány automaticky decentralizovaným způsobem (například distribuce filantropických prostředků). | Vyžaduje lidskou obsluhu nebo centrálně řízenou automatizaci, která je náchylná k manipulaci.                                |
| Veškerá aktivita je transparentní a plně veřejná.                                                                       | Aktivita je obvykle soukromá a pro veřejnost omezená.                                                                        |

### Příklady DAO {#dao-examples}

Aby to dávalo větší smysl, zde je několik příkladů, jak byste mohli DAO využít:

- **Charita** – mohli byste přijímat dary od kohokoli na světě a hlasovat o tom, jaké účely financovat.
- **Kolektivní vlastnictví** – mohli byste nakupovat fyzická nebo digitální aktiva a členové mohou hlasovat o tom, jak je využít.
- **Rizikový kapitál a granty** – mohli byste vytvořit fond rizikového kapitálu, který shromažďuje investiční kapitál a hlasuje o tom, jaké projekty podpořit. Splacené peníze by se později mohly přerozdělit mezi členy DAO.

<VideoWatch slug="dao-build-next-great-city" />

## Jak DAO fungují? {#how-daos-work}

Páteří DAO je jeho [chytrý kontrakt](/glossary/#smart-contract), který definuje pravidla organizace a spravuje pokladnu skupiny. Jakmile je kontrakt spuštěn na [Ethereu](/), nikdo nemůže změnit pravidla jinak než hlasováním. Pokud se někdo pokusí udělat něco, co není pokryto pravidly a logikou v kódu, selže to. A protože je pokladna také definována chytrým kontraktem, znamená to, že nikdo nemůže utratit peníze bez schválení skupiny. To znamená, že DAO nepotřebují centrální autoritu. Místo toho skupina rozhoduje kolektivně a platby jsou automaticky autorizovány, když návrhy projdou hlasováním.

To je možné, protože chytré kontrakty jsou po spuštění na Ethereu odolné proti neoprávněné manipulaci. Nemůžete jen tak upravit kód (pravidla DAO), aniž by si toho lidé všimli, protože vše je veřejné.

## Ethereum a DAO {#ethereum-and-daos}

Ethereum je dokonalým základem pro DAO z několika důvodů:

- Vlastní konsensus Etherea je decentralizovaný a dostatečně zavedený na to, aby organizace mohly síti důvěřovat.
- Kód chytrého kontraktu nelze po spuštění upravovat, a to ani jeho vlastníky. To umožňuje DAO fungovat podle pravidel, se kterými bylo naprogramováno.
- Chytré kontrakty mohou odesílat/přijímat prostředky. Bez toho byste ke správě skupinových prostředků potřebovali důvěryhodného zprostředkovatele.
- Komunita Etherea se ukázala být spíše spolupracující než konkurenční, což umožňuje rychlý vznik osvědčených postupů a systémů podpory.

## Správa DAO {#dao-governance}

Při správě DAO je třeba zvážit mnoho věcí, například jak funguje hlasování a návrhy.

### Delegace {#governance-delegation}

Delegace je jako DAO verze zastupitelské demokracie. Držitelé tokenů delegují hlasy na uživatele, kteří se sami nominují a zavazují se ke správě protokolu a k tomu, že budou informováni.

#### Známý příklad {#governance-example}

[ENS](https://claim.ens.domains/delegate-ranking) – Držitelé ENS mohou delegovat své hlasy na angažované členy komunity, aby je zastupovali.

### Automatická správa transakcí {#governance-example-2}

V mnoha DAO budou transakce automaticky provedeny, pokud pro ně bude hlasovat usnášeníschopná většina (kvorum) členů.

#### Známý příklad {#governance-example-3}

[Nouns](https://nouns.wtf) – V Nouns DAO je transakce automaticky provedena, pokud je dosaženo kvora hlasů a většina hlasuje kladně, pokud ji zakladatelé nevetují.

### Správa pomocí multisig {#governance-example-4}

Zatímco DAO mohou mít tisíce hlasujících členů, prostředky mohou být uloženy v [peněžence](/glossary/#wallet) sdílené 5-20 aktivními členy komunity, kteří jsou důvěryhodní a obvykle doxxovaní (jejich veřejná identita je komunitě známa). Po hlasování podepisující osoby [multisig](/glossary/#multisig) peněženky vykonají vůli komunity.

## Zákony o DAO {#dao-laws}

V roce 1977 stát Wyoming vynalezl LLC (společnost s ručením omezeným), která chrání podnikatele a omezuje jejich ručení. Nedávno se stali průkopníky zákona o DAO, který pro DAO zavádí právní status. V současné době mají zákony o DAO v nějaké formě Wyoming, Vermont a Panenské ostrovy.

### Známý příklad {#law-example}

[CityDAO](https://citizen.citydao.io/) – CityDAO využilo wyomingský zákon o DAO k nákupu 40 akrů půdy poblíž Yellowstonského národního parku.

## Členství v DAO {#dao-membership}

Existují různé modely členství v DAO. Členství může určovat, jak funguje hlasování a další klíčové části DAO.

### Členství založené na tokenech {#token-based-membership}

Obvykle plně [nevyžadující povolení](/glossary/#permissionless), v závislosti na použitém tokenu. Většinou lze tyto tokeny pro správu obchodovat bez povolení na [decentralizované burze](/glossary/#dex). Jiné je nutné získat poskytováním likvidity nebo nějakým jiným „důkazem prací (PoW)“. Ať tak či onak, pouhé držení tokenu poskytuje přístup k hlasování.

_Typicky se používá ke správě širokých decentralizovaných protokolů a/nebo samotných tokenů._

#### Známý příklad {#token-example}

[MakerDAO](https://makerdao.com) – Token MKR od MakerDAO je široce dostupný na decentralizovaných burzách a kdokoli si může koupit hlasovací právo o budoucnosti protokolu Maker.

### Členství založené na podílech {#share-based-membership}

DAO založené na podílech jsou více s řízeným přístupem, ale stále poměrně otevřené. Kdokoli z potenciálních členů může podat návrh na připojení k DAO, obvykle s nabídkou příspěvku určité hodnoty ve formě tokenů nebo práce. Podíly představují přímou hlasovací sílu a vlastnictví. Členové mohou kdykoli provést výstup se svým poměrným podílem z pokladny.

_Typicky se používá pro úžeji propojené organizace zaměřené na lidi, jako jsou charity, zaměstnanecké kolektivy a investiční kluby. Může také spravovat protokoly a tokeny._

### Členství založené na reputaci {#reputation-based-membership}

Reputace představuje důkaz o účasti a uděluje hlasovací právo v DAO. Na rozdíl od členství založeného na tokenech nebo podílech, DAO založené na reputaci nepřevádějí vlastnictví na přispěvatele. Reputaci nelze koupit, převést ani delegovat; členové DAO si musí reputaci zasloužit svou účastí. Hlasování onchain je nevyžadující povolení a potenciální členové mohou volně podávat návrhy na připojení k DAO a žádat o získání reputace a tokenů jako odměny výměnou za své příspěvky.

_Typicky se používá pro decentralizovaný vývoj a správu protokolů a [decentralizovaných aplikací (dapp)](/glossary/#dapp), ale také se dobře hodí pro rozmanitou škálu organizací, jako jsou charity, zaměstnanecké kolektivy, investiční kluby atd._

#### Známý příklad {#reputation-example}

[DXdao](https://DXdao.eth.limo) – DXdao byl globální suverénní kolektiv, který od roku 2019 budoval a spravoval decentralizované protokoly a aplikace. Využíval správu založenou na reputaci a [holografický konsenzus](/glossary/#holographic-consensus) ke koordinaci a správě prostředků, což znamenalo, že si nikdo nemohl koupit vliv na jeho budoucnost nebo správu.

## Připojte se / založte DAO {#join-start-a-dao}

### Připojte se k DAO {#join-a-dao}

- [Komunitní DAO na Ethereu](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [Seznam DAO od DAOHaus](https://app.daohaus.club/explore)
- [Seznam DAO na Tally.xyz](https://www.tally.xyz/explore)
- [Seznam DAO na DeGov.AI](https://apps.degov.ai/)

### Založte DAO {#start-a-dao}

- [Vyvolejte DAO pomocí DAOHaus](https://app.daohaus.club/summon)
- [Založte Governor DAO pomocí Tally](https://www.tally.xyz/get-started)
- [Vytvořte DAO poháněné Aragonem](https://aragon.org/product)
- [Založte kolonii](https://colony.io/)
- [Vytvořte DAO s holografickým konsenzem od DAOstack](https://alchemy.daostack.io/daos/create)
- [Spusťte DAO pomocí DeGov Launcher](https://docs.degov.ai/integration/deploy)

## Další čtení {#further-reading}

### Články o DAO {#dao-articles}

- [Co je to DAO?](https://aragon.org/dao) – [Aragon](https://aragon.org/)
- [Dům DAO](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) – [Metagame](https://wiki.metagame.wtf/)
- [Co je to DAO a k čemu slouží?](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for) – [DAOhaus](https://daohaus.club/)
- [Jak založit digitální komunitu poháněnou DAO](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) – [DAOhaus](https://daohaus.club/)
- [Co je to DAO?](https://coinmarketcap.com/alexandria/article/what-is-a-dao) – [Coinmarketcap](https://coinmarketcap.com)
- [Co je to holografický konsenzus?](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c) - [DAOstack](https://daostack.io/)
- [DAO nejsou korporace: kde záleží na decentralizaci v autonomních organizacích od Vitalika](https://vitalik.eth.limo/general/2022/09/20/daos.html)
- [DAO, DAC, DA a další: Neúplný průvodce terminologií](https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide) - [Blog Etherea](https://blog.ethereum.org)

### Videa {#videos}

- [Co je to DAO v kryptu?](https://youtu.be/KHm0uUPqmVE)
- [Může DAO postavit město?](https://www.ted.com/talks/scott_fitsimones_could_a_dao_build_the_next_great_city) – [TED](https://www.ted.com/)

<Divider />

<QuizWidget quizKey="daos" />