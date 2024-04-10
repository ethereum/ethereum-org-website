---
title: Kdo řídí Ethereum
description: Úvod do rozhodování o Ethereu.
lang: cs
postMergeBannerTranslation: page-upgrades-post-merge-banner-governance-ood
---

# Úvod do správy Etherea {#introduction}

_Pokud Ethereum nikdo nevlastní, jak se rozhoduje o minulých a budoucích změnách Etherea? Ethereum governance, nebo česky správa Etherea, je proces, který toto umožňuje._

<Divider />

## Co je správa? {#what-is-governance}

Pod pojmem správa rozumíme systémy, které umožňují přijímat rozhodnutí. V typické organizační struktuře může mít při rozhodování poslední slovo výkonný management nebo představenstvo. Nebo možná o návrzích změn hlasují akcionáři. V politickém systému mohou volení úředníci uzákonit legislativu, která se pokouší reprezentovat přání jejich voličů.

## Decentralizované řízení {#decentralized-governance}

Nikdo nevlastní ani neřídí protokol Etherea, ale stále je třeba dělat rozhodnutí o implementaci změn, aby byla co nejlépe zajištěna životnost a prosperita sítě. Nedostatek vlastnictví znamená, že tradiční organizační řízení není řešením.

## Kdo řídí Ethereum {#ethereum-governance}

Správa Etherea je proces, kterým se provádějí změny v protokolu. Je důležité zdůraznit, že tento proces nesouvisí s tím, jak uživatelé a aplikace protokol používají – Ethereum je bez vstupních bariér. Do on-chain aktivit se může zapojit kdokoli z celého světa. Nejsou nastavena žádná pravidla pro to, kdo může nebo nemůže spustit aplikaci nebo odeslat transakci. Existuje však proces navrhování změn základního protokolu, nad kterým jsou spuštěny decentralizované aplikace. Na stabilitě Etherea je v současné době závislých hodně lidí. Existuje proto vysoce pečlivá koordinace změn základních funkcí, včetně sociálních a technických procesů, za účelem zajištění bezpečnosti jakýcholiv změn Etherea, které budou zároveň přijaty komunitou.

### On-chain versus off-chain správa {#on-chain-vs-off-chain}

Blockchainové technologie umožňují nové možnosti řízení, známé jako on-chain správa. On-chain správa znamená, že o navrhovaných změnách protokolu hlasují zúčastněné strany, obvykle držitelé tokenu umožňujícího se na hlasování podílet, a celý proces probíhá na blockchainu. U některých forem on-chain správy jsou navrhované změny protokolu zapsány v kódu a implementovány automaticky, pokud zainteresované strany schválí změny podpisem transakce.

Opačný přístup, off-chain správa, spočívá v tom, že jakákoliv rozhodnutí o změně protokolu probíhají prostřednictvím neformálního procesu diskuse, jejíž výstupy by byly implementovány do kódu, pokud by byly schváleny.

**Správa Etherea probíhá off-chain** s širokou škálou zúčastněných stran zapojených do procesu.

_Zatímco na úrovni protokolu je řízení Etherea off-chain, velké množství projektů běžících na Ethereu, jako jsou DAO, používá řízení on-chain._

<ButtonLink to="/dao/">
  Více o DAO
</ButtonLink>

<Divider />

## Kdo je zapojen do správy Etherea? {#who-is-involved}

V [komunitě Etherea](/community/), jsou různé zainteresované strany, z nichž každá hraje roli v procesu správy. Počínaje zainteresovanými stranami, které jsou nejvzdálenější od protokolu, se jedná o:

- **Držitele etheru**: Tito lidé drží libovolné množství ETH. [Více o ETH](/eth/).
- **Uživatele aplikací**: Tito lidé komunikují s aplikacemi na blockchainu Ethereum.
- **Vývojáře aplikací a nástrojů**: Tito lidé píší aplikace, které běží na blockchainu Ethereum (např. DeFi, NFT atd.) nebo vytvářejí nástroje pro interakci s Ethereem (např. peněženky, testovací sady atd.). [Více o decentralizovaných aplikacích](/dapps/).
- **Operátory síťových uzlů**: Tito lidé provozují síťové uzly, které schvalují bloky a transakce a odmítají jakoukoli neplatnou transakci nebo blok, se kterým se setkají. [Více o síťových uzlech](/developers/docs/nodes-and-clients/).
- **Autory EIP**: Tito lidé navrhují změny protokolu Ethereum ve formě návrhů na vylepšení Etherea (EIP). [Více o EIP](/eips/).
- **Validátory**: Tito lidé provozují síťové uzly, které mohou přidávat nové bloky do blockchainu Ethereum.
- **Vývojáře protokolu** (také známí jako  "Core Developers“ ): Tito lidé se starají o různé implementace Etherea (např. go-ethereum, Nethermind, Besu, Erigon na exekuční vrstvě nebo Prysm, Lighthouse, Nimbus, Teku, Lodestar na konsenzuální vrstvě). [Více o klientech Etherea](/developers/docs/nodes-and-clients/).

_Poznámka: Každý může být součástí více skupin (např. vývojář protokolu může navrhovat EIP a provozovat validátor beacon chainu a používat DeFi aplikace). Pro jednoduchost je však lepší tyto skupiny uvést odděleně._

<Divider />

## Co je to EIP? {#what-is-an-eip}

Důležitým procesem používaným při správě Etherea je **návrh na zlepšení Etherea (Ethereum Improvement Proposals, EIP)**. EIP jsou standardy specifikující potenciální nové funkce nebo procesy pro Ethereum. EIP může vytvořit kdokoliv. Jestliže chcete sepsat EIP nebo se zúčastnit vzájemného hodnocení a/nebo správy, podívejte se na:

<ButtonLink to="/eips/">
  Více o EIP
</ButtonLink>

<Divider />

## Formální proces {#formal-process}

Formální proces zavádění změn do protokolu Ethereum je následující:

1. **Navrhněte základní EIP**: Jak je popsáno v [EIP- 1](https://eips.ethereum.org/EIPS/eip-1#core-eips), prvním krokem k formálnímu navržení změny Etherea je její podrobný popis v Core EIP. Ten bude sloužit jako oficiální specifikace pro EIP, kterou budou vývojáři protokolů implementovat, pokud bude přijata.

2. **Představte své EIP vývojářům protokolu**: Jakmile budete mít základní EIP, pro které jste dostali zpětnou vazbu od komunity, měli byste je předložit vývojářům protokolu. To uděláte tak, že ho navrhnete k diskusi na [AllCoreDevs callu](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status). Je pravděpodobné, že některé diskuze již proběhly asynchronně na [fóru Ethereum Magicians](https://ethereum-magicians.org/) nebo na [Ethereum R&D Discordu](https://discord.gg/mncqtgVSVw).

> Potenciální výsledky této fáze jsou:

> - EIP bude zvažován pro budoucí vylepšení sítě
> - Budou požadovány technické změny
> - Váš návrh být odmítnut, pokud to není priorita nebo neposkytuje dostatečně velké zlepšení rozvoje sítě

3. **Směřujte ke konečnému návrhu:** Po obdržení zpětné vazby od všech relevantních zúčastněných stran budete pravděpodobně muset provést změny ve svém původním návrhu, abyste zlepšili jeho zabezpečení nebo aby lépe vyhovoval potřebám uživatelů. Jakmile do svého EIP začleníte všechny změny, které považujete za nezbytné, budete je muset znovu předložit vývojářům protokolu. Poté buď přejdete k dalšímu kroku tohoto procesu, nebo se objeví nové podněty, které vyžadují další kolo schvalování vašeho návrhu.

4. **EIP zahrnuto ve vylepšení sítě**: Za předpokladu, že je EIP schváleno, otestováno a implementováno, je naplánováno jako součást vylepšení sítě. Vzhledem k vysokým nákladům na koordinaci vylepšení sítě (každý musí upgradovat současně) jsou EIP většinou spojovány do balíčků.

5. **Aktivace vylepšení sítě**: Po aktivaci vylepšení sítě bude vaše EIP aktivní v síti Ethereum. _Poznámka: Vylepšení sítě se obvykle nejdříve aktivuje na testovacích sítích před aktivací v síti Ethereum Mainnet._

Tento postup, i když je velmi zjednodušený, poskytuje přehled hlavních fází změny protokolu, která má být implementována na Ethereu. Níže rozebíráme neformální faktory, které během tohoto procesu také hrají roli.

## Neformální proces {#informal-process}

### Porozumění předchozím vylepšením {#prior-work}

Šampioni EIP by se měli seznámit s předchozí prací a návrhy před vytvořením EIP, které má ambice vylepšit Ethereum Mainnet. Díky tomu, doufejme, přináší EIP něco nového, co dosud nebylo zamítnuto. Tři hlavní místa, kde se můžete seznámit s prací ostatních navrhovatelů vylepšení, jsou [EIP repozitář](https://github.com/ethereum/EIPs), [Ethereum Magicians](https://ethereum-magicians.org/) a [ethresear.ch](https://ethresear.ch/).

### Pracovní skupiny {#working-groups}

Je nepravděpodobné, že by původní návrh EIP mohl být implementován na Ethereum Mainnet bez úprav nebo změn. Obecně vzato, budou EIP šampióni vždy spolupracovat s podskupinou vývojářů protokolu na specifikaci, implementaci, testování, iteraci a finalizaci jejich návrhu. Historicky tyto pracovní skupiny vyžadovaly několik měsíců (a někdy i let!) práce. Podobně by EIP šampióni měli zapojit příslušné vývojáře aplikací/nástrojů v rané fázi jejich úsilí získat zpětnou vazbu od koncových uživatelů a zmírnit jakákoli rizika začlenění EIP do Etherea.

### Konsensus komunity {#community-consensus}

Zatímco některá EIP jsou jednoduchá technická vylepšení s minimálními nuancemi, některá jsou složitější a přinášejí kompromisy, které ovlivní různé zúčastněné strany a to různými způsoby. To znamená, že některé EIP jsou v rámci komunity spornější než jiné.

Neexistuje žádný jasný návod, jak řešit sporné návrhy. Je to výsledek decentralizovaného návrhu Etherea, kdy žádná jednotlivá skupina zúčastněných stran nemůže k ničemu donutit druhou skupinu k nějaké akci hrubou silou: Vývojáři protokolu se mohou rozhodnout neimplementovat změny v kódu; operátoři síťových uzlů se mohou rozhodnout nespouštět nejnovějšího klienta Etherea; týmy vyvíjející aplikace a uživatelé se mohou rozhodnout, že nebudou provádět transakce na blockchainu. Vzhledem k tomu, že vývojáři protokolu nemají žádný způsob, jak donutit uživatele přijmout vylepšení sítě, budou se obecně vyhýbat implementaci EIP, kde spornost převažuje nad přínosy pro širší komunitu.

Od šampionů EIP se očekává, že si vyžádají zpětnou vazbu od všech zúčastněných stran. Pokud zjistíte, že jste šampionem EIP, které je sporné, měli byste se pokusit vyřešit námitky zúčastněných stran, abyste dosáhli konsensu. Vzhledem k velikosti a rozmanitosti komunity Etherea neexistuje jediná metrika (např. hlasování pomocí tokenů), kterou by bylo možné použít k posouzení konsenzu komunity, a od šampionů EIP se očekává, že se přizpůsobí okolnostem svého návrhu.

Kromě zabezpečení sítě přikládali vývojáři protokolu významnou váhu tomu, čeho si vývojáři aplikací/nástrojů a uživatelé aplikací cení - a to vzhledem k tomu, že používání aplikací a vývoj na Ethereu je to, co činí ekosystém atraktivním pro ostatní zúčastněné strany. Kromě toho je třeba implementovat EIP napříč všemi implementacemi klientů, které jsou spravovány různými týmy. Součástí tohoto procesu je obvykle přesvědčování různých týmů vývojářů protokolu, že konkrétní změna je cenná a že pomůže koncovým uživatelům nebo vyřeší problém se zabezpečením.

<Divider />

## Vyřizování neshod {#disagreements}

Mnoho zúčastněných stran s různými motivacemi a přesvědčeními znamená, že neshody nejsou neobvyklé.

Obecně se neshody řeší dlouhodobou diskusí na veřejných fórech, aby se porozumělo základům problému a umožnilo komukoli zvážit dopady implementace. Obvykle se jedna skupina s návrhem, i když s výhradami, spokojí, nebo se dosáhne šťastné shody. Pokud se jedna skupina cítí dostatečně silná a není připravena přijmou kompromisy, prosazení konkrétní změny by mohlo vést k rozdělení blockchainu. Rozdělení blockchainu nastává, když některé zúčastněné strany protestují proti implementaci změny protokolu, která má za následek různé, nekompatibilní verze protokolu, z nichž vzejdou dva odlišné blockchainy.

### Fork The DAO {#dao-fork}

Forky nastávají, když je potřeba provést zásadní technická vylepšení nebo změny v síti a změnit "pravidla“ protokolu. [Klienti na Ethereu](/developers/docs/nodes-and-clients/) musí aktualizovat svůj software, aby implementovali nová pravidla forku.

Fork The DAO byl reakcí na [útok na DAO v roce 2016](https://www.coindesk.com/understanding-dao-hack-journalists), kdy bylo z nezabezpečeného kontraktu [DAO](/glossary/#dao) odčerpáno více než 3,6 milionu ETH. Tento fork přesunul finanční prostředky z chybného smart kontraktu do nového kontraktu, který umožnil získat zpět své finanční prostředky komukoli, kdo o ně přišel během hacku.

Tento postup byl odhlasován ethereovskou komunitou. Každý držitel ETH mohl hlasovat prostřednictvím transakce na [hlasovací platformě](http://v1.carbonvote.com/). Rozhodnutí o forku získalo více než 85 % hlasů.

Je důležité poznamenat, že i když se protokol rozdělil, aby se stav sítě vrátil do stavu před hackem, váha, kterou měl hlas při rozhodování o forku, je diskutabilní z několika důvodů:

- Volební účast byla neuvěřitelně nízká
- Většina držitelů ETH nevěděla, že hlasování probíhá
- Hlas měli pouze držitelé ETH, ostatní účastníci systému nikoliv

Část komunity fork odmítla, především proto, že se domnívala, že tento incident nebyl vadou v protokolu. Proto vytvořili blockchain [Ethereum Classic.](https://ethereumclassic.org/).

Současná ethereovská komunita přijala politiku nezasahování v případech chyb v kontraktu nebo ztráty finančních prostředků, aby byla zachována důvěryhodná neutralita systému.

Pusťe si další informace o DAO hacku:

<YouTube id="rNeLuBOVe8A" />

<Divider />

### Užitečnost forku {#forking-utility}

Fork Ethereum/Ethereum Classic je vynikajícím příkladem zdravého forku. Proti sobě stály dvě skupiny, které spolu dostatečně silně nesouhlasily v některých základních hodnotách. Neměly proto pocit, že stojí za to riskovat a pokračovat postupu, který navrhovali.

Schopnost provést fork tváří v tvář významným politickým, filozofickým nebo ekonomickým rozdílům hraje velkou roli v úspěchu řízení Etherea. Bez schopnosti udělat fork by byl jedinou alternativou přetrvávající spor uvnitř komunity, nucení ke spolupráci těch, kteří nakonec vytvořili Ethereum Classic, a stále rozdílnější vize toho, jak má úspěšná verze Etherea vypadat.

<Divider />

## Řízení Beacon Chain {#beacon-chain}

Proces správy Etherea často upozaďuje rychlost a efektivitu ve prospěch otevřenosti a inkluzivity. Aby se urychlil vývoj Beacon Chainu, byl spuštěn odděleně od sítě proof-of-work a řídil se vlastními postupy správy.

Implementace specifikací a vývoje byly i v případě Beacon Chainu vždy plně open source, ale výše popsané formální procesy používané k navrhování aktualizací použity nebyly. To umožnilo rychleji navrhnout a odsouhlasit změny a stejně tak je i implementovat.

Když se 15. září 2022 sloučil Beacon Chain s realizační vrstvou Etherea, byl merge dokončen jako součást [pařížského upgradu sítě](/history/#paris). Stav návrhu [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) byl změněn z „Poslední výzva“ na „Konečný“, čímž byl dokončen přechod na proof-of-stake.

<ButtonLink to="/roadmap/merge/">
  Více o mergi
</ButtonLink>

<Divider />

## Jak se mohu zapojit? {#get-involved}

- [Navrhněte EIP](/eips/#participate)
- [Diskutujte o aktuálních návrzích](https://ethereum-magicians.org/)
- [Zapojte se do diskuse o výzkumu a vývoji](https://ethresear.ch/)
- [Připojte se k Discord serveru Ethereum R&D](https://discord.gg/mncqtgVSVw)
- [Spusť uzel](/developers/docs/nodes-and-clients/run-a-node/)
- [Přispějte k rozvoji klienta](/developers/docs/nodes-and-clients/#execution-clients)
- [Program Core Developer Apprenticeship](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort/)

## Další informace {#further-reading}

Správa Etherea není pevně definována. Různí členové komunity mají na řízení odlišné pohledy. Zde je několik z nich:

- [Poznámky k řízení blockchainu](https://vitalik.eth.limo/general/2017/12/17/voting.html) - _Vitalik Buterin_
- [Jak funguje Ethereum Governance?](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [Jak funguje správa Etherea](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [Kdo je Ethereum core developer?](https://hudsonjameson.com/2020-06-22-what-is-an-ethereum-core-developer/) - _Hudson Jameson_
- [Řízení, část 2: Plutokracie je furt špatná](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) - _Vitalik Buterin_
- [Nahrazení mincemi hlasované řízení](https://vitalik.eth.limo/general/2021/08/16/voting3.html) - _Vitalik Buterin_
