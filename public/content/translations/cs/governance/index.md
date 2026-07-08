---
title: Úvod do správy Etherea
metaTitle: Správa Etherea
description: Úvod do toho, jak se přijímají rozhodnutí o Ethereu.
lang: cs
---

_Pokud nikdo nevlastní [Ethereum](/), jak se přijímají rozhodnutí o minulých a budoucích změnách Etherea? Správa Etherea označuje proces, který umožňuje taková rozhodnutí přijímat._

<Divider />

## Co je to správa? {#what-is-governance}

Správa představuje zavedené systémy, které umožňují přijímat rozhodnutí. V typické organizační struktuře může mít konečné slovo v rozhodování výkonný tým nebo představenstvo. Nebo možná akcionáři hlasují o návrzích na zavedení změn. V politickém systému mohou volení zástupci přijímat zákony, které se snaží reprezentovat přání jejich voličů.

## Decentralizovaná správa {#decentralized-governance}

Žádná jednotlivá osoba nevlastní ani nekontroluje protokol Ethereum, ale stále je třeba přijímat rozhodnutí o implementaci změn, aby se co nejlépe zajistila dlouhověkost a prosperita sítě. Tento nedostatek vlastnictví činí z tradiční organizační správy nekompatibilní řešení.

## Správa Etherea {#ethereum-governance}

Správa Etherea je proces, jehož prostřednictvím se provádějí změny protokolu. Je důležité zdůraznit, že tento proces nesouvisí s tím, jak lidé a aplikace protokol používají – Ethereum je nevyžadující povolení. Kdokoli odkudkoli na světě se může účastnit onchain aktivit. Nejsou stanovena žádná pravidla pro to, kdo může nebo nemůže vytvořit aplikaci nebo odeslat transakci. Existuje však proces pro navrhování změn základního protokolu, nad kterým běží decentralizované aplikace (dapp). Vzhledem k tomu, že na stabilitě Etherea závisí tolik lidí, existuje velmi vysoký práh koordinace pro základní změny, včetně sociálních a technických procesů, aby se zajistilo, že jakékoli změny Etherea budou bezpečné a široce podporované komunitou.

<VideoWatch slug="ethereum-core-governance-explained" />

### Onchain vs. offchain správa {#onchain-vs-offchain}

Technologie blockchainu umožňuje nové možnosti správy, známé jako onchain správa. Onchain správa je situace, kdy o navrhovaných změnách protokolu rozhodují zúčastněné strany hlasováním, obvykle držitelé tokenu správy, a hlasování probíhá na blockchainu. U některých forem onchain správy jsou navrhované změny protokolu již napsány v kódu a implementovány automaticky, pokud zúčastněné strany změny schválí podepsáním transakce.

Opačný přístup, offchain správa, je situace, kdy jakákoli rozhodnutí o změně protokolu probíhají prostřednictvím neformálního procesu sociální diskuse, která by v případě schválení byla implementována do kódu.

**Správa Etherea probíhá offchain** a do procesu je zapojena široká škála zúčastněných stran.

_Zatímco na úrovni protokolu je správa Etherea offchain, mnoho případů užití postavených na Ethereu, jako jsou DAO, využívá onchain správu._

<ButtonLink href="/dao/">
  Více o DAO
</ButtonLink>

<Divider />

## Kdo je zapojen? {#who-is-involved}

V [komunitě Etherea](/community/) existují různé zúčastněné strany, z nichž každá hraje roli v procesu správy. Začneme-li od zúčastněných stran nejdále od protokolu a přiblížíme se, máme:

- **Držitelé etheru**: tito lidé drží libovolné množství ETH. [Více o ETH](/what-is-ether/).
- **Uživatelé aplikací**: tito lidé interagují s aplikacemi na blockchainu Etherea.
- **Vývojáři aplikací/nástrojů**: tito lidé píší aplikace, které běží na blockchainu Etherea (např. decentralizované finance (DeFi), NFT atd.), nebo vytvářejí nástroje pro interakci s Ethereem (např. peněženky, testovací sady atd.). [Více o dapp](/apps/).
- **Provozovatelé uzlů**: tito lidé provozují uzly, které šíří bloky a transakce, a odmítají jakoukoli neplatnou transakci nebo blok, na který narazí. [Více o uzlech](/developers/docs/nodes-and-clients/).
- **Autoři EIP**: tito lidé navrhují změny protokolu Ethereum ve formě návrhů na vylepšení Etherea (EIP). [Více o EIP](/eips/).
- **Validátoři**: tito lidé provozují uzly, které mohou přidávat nové bloky do blockchainu Etherea.
- **Vývojáři protokolu** (tzv. „Core Developers“): tito lidé udržují různé implementace Etherea (např. go-ethereum, Nethermind, Besu, Erigon, Reth na exekuční vrstvě nebo Prysm, Lighthouse, Nimbus, Teku, Lodestar, Grandine na vrstvě konsensu). [Více o klientech Etherea](/developers/docs/nodes-and-clients/).

_Poznámka: každý jednotlivec může být součástí více těchto skupin (např. vývojář protokolu může prosazovat EIP, provozovat validátor na Beacon chainu a používat DeFi aplikace). Pro koncepční jasnost je však nejjednodušší je rozlišovat._

<Divider />

## Co je to EIP? {#what-is-an-eip}

Jedním z důležitých procesů používaných při správě Etherea je navrhování **návrhů na vylepšení Etherea (EIP)**. EIP jsou standardy specifikující potenciální nové funkce nebo procesy pro Ethereum. Kdokoli v komunitě Etherea může vytvořit EIP. Pokud máte zájem o napsání EIP nebo o účast na vzájemném hodnocení (peer-review) a/nebo správě, podívejte se na:

<ButtonLink href="/eips/">
  Více o EIP
</ButtonLink>

<Divider />

## Formální proces {#formal-process}

Formální proces pro zavádění změn do protokolu Ethereum je následující:

1. **Navrhněte Core EIP**: jak je popsáno v [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips), prvním krokem k formálnímu navržení změny Etherea je její podrobné popsání v Core EIP. To bude sloužit jako oficiální specifikace pro EIP, kterou vývojáři protokolu implementují, pokud bude přijata.

2. **Představte svůj EIP vývojářům protokolu**: jakmile máte Core EIP, pro který jste shromáždili zpětnou vazbu od komunity, měli byste jej představit vývojářům protokolu. Můžete tak učinit tím, že jej navrhnete k diskusi v rámci [hovoru AllCoreDevs](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status). Je pravděpodobné, že některé diskuse již proběhly asynchronně na [fóru Ethereum Magicians](https://ethereum-magicians.org/) nebo na [Discordu Ethereum R&D](https://discord.gg/mncqtgVSVw).

> Potenciální výsledky této fáze jsou:

> - EIP bude zvážen pro budoucí upgrade sítě
> - Budou požadovány technické změny
> - Může být zamítnut, pokud to není priorita nebo pokud vylepšení není dostatečně velké v poměru k úsilí vynaloženému na vývoj

3. **Iterujte směrem ke konečnému návrhu:** po obdržení zpětné vazby od všech relevantních zúčastněných stran budete pravděpodobně muset provést změny ve svém původním návrhu, abyste zlepšili jeho bezpečnost nebo lépe vyhověli potřebám různých uživatelů. Jakmile váš EIP začlení všechny změny, které považujete za nezbytné, budete jej muset znovu představit vývojářům protokolu. Poté přejdete k dalšímu kroku tohoto procesu, nebo se objeví nové obavy, které si vyžádají další kolo iterací vašeho návrhu.

4. **EIP zahrnut do upgradu sítě**: za předpokladu, že je EIP schválen, otestován a implementován, je naplánován jako součást upgradu sítě. Vzhledem k vysokým nákladům na koordinaci upgradů sítě (všichni musí upgradovat současně) jsou EIP obecně sdružovány do upgradů.

5. **Upgrade sítě aktivován**: po aktivaci upgradu sítě bude EIP spuštěn v síti Ethereum. _Poznámka: upgrady sítě se obvykle aktivují na testnetech předtím, než jsou aktivovány na Ethereum Mainnetu._

Tento postup, ačkoliv je velmi zjednodušený, poskytuje přehled o významných fázích aktivace změny protokolu na Ethereu. Nyní se podívejme na neformální faktory, které v tomto procesu hrají roli.

## Neformální proces {#informal-process}

### Porozumění předchozí práci {#prior-work}

Zastánci EIP (EIP Champions) by se měli seznámit s předchozí prací a návrhy před vytvořením EIP, který může být vážně zvažován pro nasazení na Ethereum Mainnetu. Tímto způsobem EIP snad přinese něco nového, co nebylo dříve zamítnuto. Tři hlavní místa pro průzkum jsou [repozitář EIP](https://github.com/ethereum/EIPs), [Ethereum Magicians](https://ethereum-magicians.org/) a [ethresear.ch](https://ethresear.ch/).

### Pracovní skupiny {#working-groups}

Je nepravděpodobné, že by byl počáteční návrh EIP implementován na Ethereum Mainnetu bez úprav nebo změn. Obecně platí, že zastánci EIP budou spolupracovat s podskupinou vývojářů protokolu na specifikaci, implementaci, testování, iteraci a finalizaci svého návrhu. Historicky tyto pracovní skupiny vyžadovaly několik měsíců (a někdy i let!) práce. Podobně by zastánci EIP pro takové změny měli včas zapojit příslušné vývojáře aplikací/nástrojů do svého úsilí, aby shromáždili zpětnou vazbu od koncových uživatelů a zmírnili jakákoli rizika nasazení.

### Komunitní konsensus {#community-consensus}

Zatímco některé EIP jsou přímočará technická vylepšení s minimálními nuancemi, jiné jsou složitější a přinášejí kompromisy, které různými způsoby ovlivní různé zúčastněné strany. To znamená, že některé EIP jsou v komunitě spornější než jiné.

Neexistuje žádný jasný návod, jak zacházet se spornými návrhy. Je to výsledek decentralizovaného designu Etherea, kdy žádná jednotlivá skupina zúčastněných stran nemůže donutit druhou hrubou silou: vývojáři protokolu se mohou rozhodnout neimplementovat změny kódu; provozovatelé uzlů se mohou rozhodnout nespouštět nejnovějšího klienta Etherea; aplikační týmy a uživatelé se mohou rozhodnout neprovádět transakce na řetězci. Vzhledem k tomu, že vývojáři protokolu nemají žádný způsob, jak donutit lidi k přijetí upgradů sítě, obecně se vyhnou implementaci EIP, kde spornost převažuje nad přínosy pro širší komunitu.

Očekává se, že zastánci EIP si vyžádají zpětnou vazbu od všech relevantních zúčastněných stran. Pokud se ocitnete v roli zastánce sporného EIP, měli byste se pokusit vyřešit námitky a vybudovat konsensus kolem vašeho EIP. Vzhledem k velikosti a rozmanitosti komunity Etherea neexistuje jediná metrika (např. hlasování pomocí mincí), kterou by bylo možné použít k měření komunitního konsensu, a očekává se, že se zastánci EIP přizpůsobí okolnostem svého návrhu.

Kromě bezpečnosti sítě Ethereum kladli vývojáři protokolu historicky značný důraz na to, čeho si cení vývojáři aplikací/nástrojů a uživatelé aplikací, vzhledem k tomu, že jejich používání a vývoj na Ethereu je to, co činí ekosystém atraktivním pro ostatní zúčastněné strany. Kromě toho musí být EIP implementovány napříč všemi implementacemi klientů, které spravují různé týmy. Součástí tohoto procesu obvykle je přesvědčit více týmů vývojářů protokolu, že konkrétní změna je cenná a že pomáhá koncovým uživatelům nebo řeší bezpečnostní problém.

<Divider />

## Řešení neshod {#disagreements}

Mít mnoho zúčastněných stran s různými motivacemi a přesvědčeními znamená, že neshody nejsou neobvyklé.

Obecně se neshody řeší dlouhými diskusemi na veřejných fórech, aby se pochopil kořen problému a umožnilo se komukoli vyjádřit. Typicky jedna skupina ustoupí, nebo se dosáhne zlaté střední cesty. Pokud je jedna skupina dostatečně přesvědčena, protlačení konkrétní změny by mohlo vést k rozdělení řetězce (chain split). Rozdělení řetězce je situace, kdy některé zúčastněné strany protestují proti implementaci změny protokolu, což vede k fungování různých, nekompatibilních verzí protokolu, ze kterých vzniknou dva odlišné blockchainy.

### Fork DAO {#dao-fork}

Forky nastávají, když je třeba v síti provést zásadní technické upgrady nebo změny, které mění „pravidla“ protokolu. [Klienti Etherea](/developers/docs/nodes-and-clients/) musí aktualizovat svůj software, aby implementovali nová pravidla forku.

Fork DAO byl reakcí na [útok na DAO v roce 2016](https://www.coindesk.com/learn/understanding-the-dao-attack), kdy byl nezabezpečený kontrakt [DAO](/glossary/#dao) při hacku vysát o více než 3,6 milionu ETH. Fork přesunul prostředky z chybného kontraktu do nového kontraktu, což umožnilo komukoli, kdo při hacku ztratil prostředky, získat je zpět.

O tomto postupu hlasovala komunita Etherea. Každý držitel ETH mohl hlasovat prostřednictvím transakce na [hlasovací platformě](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Rozhodnutí o forku dosáhlo více než 85 % hlasů.

Je důležité poznamenat, že ačkoli protokol provedl fork, aby zvrátil hack, váha, kterou hlasování mělo při rozhodování o forku, je diskutabilní z několika důvodů:

- Účast na hlasování byla neuvěřitelně nízká
- Většina lidí nevěděla, že hlasování probíhá
- Hlasování reprezentovalo pouze držitele ETH, nikoli žádné další účastníky systému

Část komunity odmítla fork, z velké části proto, že měli pocit, že incident s DAO nebyl chybou v protokolu. Následně vytvořili [Ethereum Classic](https://ethereumclassic.org/).

Dnes komunita Etherea přijala politiku nezasahování v případech chyb v kontraktech nebo ztracených prostředků, aby zachovala důvěryhodnou neutralitu systému.

Podívejte se na více informací o hacku DAO:

<VideoWatch slug="dao-hack-ethereum-classic" />

<Divider />

### Užitečnost forkování {#forking-utility}

Fork Ethereum/Ethereum Classic je vynikajícím příkladem zdravého forku. Měli jsme dvě skupiny, které se navzájem natolik neshodly na některých základních hodnotách, že měly pocit, že stojí za to podstoupit související rizika a sledovat své specifické postupy.

Schopnost provést fork tváří v tvář významným politickým, filozofickým nebo ekonomickým rozdílům hraje velkou roli v úspěchu správy Etherea. Bez možnosti forku by alternativou byly neustálé vnitřní boje, nucená neochotná účast pro ty, kteří nakonec vytvořili Ethereum Classic, a stále se lišící vize toho, jak vypadá úspěch pro Ethereum.

<Divider />

## Správa Beacon chainu {#beacon-chain}

Proces správy Etherea často vyměňuje rychlost a efektivitu za otevřenost a inkluzivitu. Aby se urychlil vývoj Beacon chainu, byl spuštěn odděleně od sítě Ethereum s důkazem prací (PoW) a řídil se vlastními postupy správy.

Ačkoli specifikace a vývojové implementace byly vždy plně open source, formální procesy používané k navrhování aktualizací popsané výše nebyly použity. To umožnilo výzkumníkům a implementátorům rychleji specifikovat a dohodnout se na změnách.

Když se Beacon chain 15. září 2022 sloučil s exekuční vrstvou Etherea, Merge byl dokončen jako součást [upgradu sítě Paris](/ethereum-forks/#paris). Návrh [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) byl změněn z „Last Call“ na „Final“, čímž byl dokončen přechod na důkaz podílem (PoS).

<ButtonLink href="/roadmap/merge/">
  Více o Merge
</ButtonLink>

<Divider />

## Jak se mohu zapojit? {#get-involved}

- [Navrhněte EIP](/eips/#participate)
- [Diskutujte o aktuálních návrzích](https://ethereum-magicians.org/)
- [Zapojte se do diskuse o výzkumu a vývoji](https://ethresear.ch/)
- [Připojte se na Discord Ethereum R&D](https://discord.gg/mncqtgVSVw)
- [Provozujte uzel](/developers/docs/nodes-and-clients/run-a-node/)
- [Přispějte k vývoji klienta](/developers/docs/nodes-and-clients/#execution-clients)
- [Učňovský program pro Core vývojáře](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort)

## Další čtení {#further-reading}

Správa v Ethereu není pevně definována. Různí účastníci komunity na ni mají různé pohledy. Zde je několik z nich:

- [Poznámky ke správě blockchainu](https://vitalik.eth.limo/general/2017/12/17/voting.html) - _Vitalik Buterin_
- [Jak funguje správa Etherea?](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [Jak funguje správa Etherea](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [Co je to Core vývojář Etherea?](https://hudsonjameson.com/posts/2020-06-22-what-is-an-ethereum-core-developer/) - _Hudson Jameson_
- [Správa, část 2: Plutokracie je stále špatná](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) - _Vitalik Buterin_
- [Posun za hranice správy pomocí hlasování mincemi](https://vitalik.eth.limo/general/2021/08/16/voting3.html) - _Vitalik Buterin_
- [Porozumění správě blockchainu](https://web.archive.org/web/20250124192731/https://research.2077.xyz/understanding-blockchain-governance) - _2077 Research_
- [Vláda Etherea](https://www.galaxy.com/insights/research/ethereum-governance/) - _Christine Kim_