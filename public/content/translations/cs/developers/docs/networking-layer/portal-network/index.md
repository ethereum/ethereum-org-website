---
title: Portal Network
description: "Přehled sítě Portal Network – sítě ve vývoji, která je navržena pro podporu klientů s nízkými nároky na zdroje."
lang: cs
---

[Ethereum](/) je síť tvořená počítači, na kterých běží klientský software Etherea. Každý z těchto počítačů se nazývá „uzel“. Klientský software umožňuje uzlu odesílat a přijímat data v síti Ethereum a ověřuje data podle pravidel protokolu Etherea. Uzly uchovávají na svých discích velké množství historických dat a přidávají k nim další, když od ostatních uzlů v síti obdrží nové balíčky informací, známé jako bloky. To je nezbytné pro neustálou kontrolu, zda má uzel informace konzistentní se zbytkem sítě. To znamená, že provozování uzlu může vyžadovat hodně místa na disku. Některé operace uzlu mohou vyžadovat také hodně paměti RAM.

Aby se tento problém s diskovým úložištěm vyřešil, byly vyvinuty „lehké uzly“ (light nodes), které si vyžadují informace od plných uzlů, místo aby je všechny ukládaly samy. To však znamená, že lehký uzel informace neověřuje nezávisle a místo toho důvěřuje jinému uzlu. Znamená to také, že plné uzly musí převzít práci navíc, aby těmto lehkým uzlům mohly sloužit.

Portal Network je nový návrh sítě pro Ethereum, jehož cílem je vyřešit problém dostupnosti dat pro „lehké“ uzly, aniž by musely důvěřovat plným uzlům nebo je nadměrně zatěžovat, a to sdílením potřebných dat v malých částech napříč sítí.

Více o [uzlech a klientech](/developers/docs/nodes-and-clients/)

## Proč potřebujeme Portal Network {#why-do-we-need-portal-network}

Uzly Etherea ukládají svou vlastní úplnou nebo částečnou kopii blockchainu Etherea. Tato lokální kopie se používá k ověřování transakcí a zajištění toho, že uzel sleduje správný řetězec. Tato lokálně uložená data umožňují uzlům nezávisle ověřit, že příchozí data jsou platná a správná, aniž by musely důvěřovat jakémukoli jinému subjektu.

Tato lokální kopie blockchainu a související data o stavu a stvrzenkách zabírají na pevném disku uzlu spoustu místa. Například pro provoz uzlu pomocí [Geth](https://geth.ethereum.org) spárovaného s konsensuálním klientem se doporučuje 2TB pevný disk. Při použití synchronizace snap (snap sync), která ukládá pouze data řetězce z relativně nedávné sady bloků, Geth obvykle zabírá asi 650 GB místa na disku, ale roste rychlostí přibližně 14 GB za týden (uzel můžete pravidelně prořezávat zpět na 650 GB).

To znamená, že provozování uzlů může být drahé, protože Ethereu musí být vyhrazeno velké množství místa na disku. V plánu vývoje Etherea (roadmap) existuje několik řešení tohoto problému, včetně [exspirace historie](/roadmap/statelessness/#history-expiry), [exspirace stavu](/roadmap/statelessness/#state-expiry) a [bezstavovosti](/roadmap/statelessness/). Jejich implementace je však pravděpodobně ještě několik let vzdálená. Existují také [lehké uzly](/developers/docs/nodes-and-clients/light-clients/), které neukládají svou vlastní kopii dat řetězce, ale vyžadují potřebná data od plných uzlů. To však znamená, že lehké uzly musí důvěřovat plným uzlům, že poskytují poctivá data, a také to zatěžuje plné uzly, které musí poskytovat data, jež lehké uzly potřebují.

Portal Network si klade za cíl poskytnout lehkým uzlům alternativní způsob získávání dat, který nevyžaduje důvěru ani významně nezvyšuje množství práce, kterou musí plné uzly vykonávat. Způsob, jakým toho bude dosaženo, je zavedení nového způsobu sdílení dat mezi uzly Etherea napříč sítí.

## Jak funguje Portal Network? {#how-does-portal-network-work}

Uzly Etherea mají přísné protokoly, které definují, jak spolu komunikují. Exekuční klienti komunikují pomocí sady podprotokolů známých jako [devp2p](/developers/docs/networking-layer/#devp2p), zatímco konsensuální klienti používají jinou sadu podprotokolů zvanou [libp2p](/developers/docs/networking-layer/#libp2p). Ty definují typy dat, která si mohou uzly mezi sebou předávat.

![devP2P and libP2P](portal-network-devp2p-libp2p.png)

Uzly mohou také poskytovat specifická data prostřednictvím [JSON-RPC API](/developers/docs/apis/json-rpc/), což je způsob, jakým si aplikace a peněženky vyměňují informace s uzly Etherea. Žádný z nich však není ideálním protokolem pro poskytování dat lehkým klientům.

Lehcí klienti v současné době nemohou požadovat konkrétní části dat řetězce přes devp2p nebo libp2p, protože tyto protokoly jsou navrženy pouze k tomu, aby umožnily synchronizaci řetězce a šíření (gossiping) bloků a transakcí. Lehcí klienti tyto informace stahovat nechtějí, protože by tím přestali být „lehcí“.

JSON-RPC API není ideální volbou ani pro datové požadavky lehkých klientů, protože spoléhá na připojení ke konkrétnímu plnému uzlu nebo centralizovanému poskytovateli RPC, který může data poskytnout. To znamená, že lehký klient musí důvěřovat tomuto konkrétnímu uzlu/poskytovateli, že je poctivý, a plný uzel by navíc mohl muset zpracovávat spoustu požadavků od mnoha lehkých klientů, což by zvyšovalo jeho nároky na šířku pásma.

Smyslem sítě Portal Network je přehodnotit celý návrh a stavět specificky pro lehkost, mimo konstrukční omezení stávajících klientů Etherea.

Základní myšlenkou sítě Portal Network je převzít to nejlepší ze současného síťového zásobníku tím, že umožní poskytovat informace potřebné pro lehké klienty, jako jsou historická data a identita aktuální hlavy řetězce, prostřednictvím odlehčené decentralizované peer-to-peer sítě ve stylu devp2p pomocí [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) (podobně jako BitTorrent).

Myšlenkou je přidat každému uzlu malé části celkových historických dat Etherea a některé specifické povinnosti uzlu. Požadavky jsou pak obsluhovány vyhledáním uzlů, které ukládají konkrétní požadovaná data, a jejich získáním od nich.

Tím se obrací běžný model, kdy lehké uzly najdou jeden uzel a požádají ho o filtrování a poskytování velkých objemů dat; místo toho rychle filtrují velkou síť uzlů, z nichž každý zpracovává malé množství dat.

Cílem je umožnit decentralizované síti lehkých klientů Portal:

- sledovat hlavu řetězce
- synchronizovat nedávná a historická data řetězce
- získávat data o stavu
- vysílat transakce
- provádět transakce pomocí [EVM](/developers/docs/evm/)

Výhody tohoto návrhu sítě jsou:

- snížení závislosti na centralizovaných poskytovatelích
- snížení využití šířky pásma internetu
- minimalizovaná nebo nulová synchronizace
- přístupnost pro zařízení s omezenými zdroji (\<1 GB RAM, \<100 MB místa na disku, 1 CPU)

Níže uvedená tabulka ukazuje funkce stávajících klientů, které může Portal Network poskytovat, což uživatelům umožňuje přístup k těmto funkcím na zařízeních s velmi nízkými zdroji.

### Sítě Portal Network {#the-portal-networks}

| Lehký klient Beacon | Stavová síť                  | Šíření transakcí    | Historická síť  | Kanonický index transakcí |
| ------------------- | ---------------------------- | ------------------- | --------------- | ------------------------- |
| Lehký Beacon chain  | Úložiště účtů a kontraktů    | Odlehčený mempool   | Hlavičky        | TxHash > Hash, Index      |
| Data protokolu      |                              |                     | Těla bloků      |                           |
|                     |                              |                     | Stvrzenky       |                           |

## Klientská diverzita ve výchozím nastavení {#client-diversity-as-default}

Vývojáři sítě Portal Network také učinili rozhodnutí vytvořit od prvního dne čtyři samostatné klienty sítě Portal Network.

Klienti sítě Portal Network jsou:

- [Trin](https://github.com/ethereum/trin): napsaný v jazyce Rust
- [Fluffy](https://fluffy.guide): napsaný v jazyce Nim
- [Ultralight](https://github.com/ethereumjs/ultralight): napsaný v jazyce TypeScript
- [Shisui](https://github.com/zen-eth/shisui): napsaný v jazyce Go

Mít více nezávislých implementací klientů zvyšuje odolnost a decentralizaci sítě Ethereum.

Pokud se u jednoho klienta vyskytnou problémy nebo zranitelnosti, ostatní klienti mohou nadále hladce fungovat, čímž se zabrání jedinému bodu selhání. Různorodé implementace klientů navíc podporují inovace a konkurenci, což vede ke zlepšením a snižuje riziko monokultury v rámci ekosystému.

## Další čtení {#further-reading}

- [Portal Network (Piper Merriam na Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA).
- [Discord sítě Portal Network](https://discord.gg/CFFnmE7Hbs)
- [Webové stránky sítě Portal Network](https://www.ethportal.net/)