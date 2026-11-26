---
title: Portal Network
description: "Přehled sítě Portal Network, peer-to-peer sítě, která udržuje historii Etherea dostupnou i poté, co ji klienti přestanou celou ukládat."
lang: cs
---

[Ethereum](/) je síť tvořená počítači, na kterých běží klientský software Etherea. Každý z těchto počítačů se nazývá „uzel“. Klientský software umožňuje uzlu odesílat a přijímat data v síti Ethereum a ověřuje data podle pravidel protokolu Ethereum. Uzly uchovávají na svých discích velké množství historických dat a přidávají k nim další, když od ostatních uzlů v síti obdrží nové balíčky informací, známé jako bloky. To je nezbytné pro neustálou kontrolu, zda má uzel informace konzistentní se zbytkem sítě. To znamená, že provozování uzlu může vyžadovat hodně místa na disku. Některé operace uzlu mohou vyžadovat také hodně paměti RAM.

Exekuční klienti už nemusí uchovávat všechna tato data. Od července 2025 mohou zahodit těla a stvrzenky bloků z doby před [Merge](/roadmap/merge/) a roadmapa Etherea počítá s tím, že se postupem času bude zahazovat další historie řetězce. Tato historie však musí zůstat dostupná každému, kdo ji potřebuje, jako jsou prohlížeče bloků, indexery nebo peněženka vyhledávající starou transakci.

Portal Network udržuje tuto historii dostupnou tím, že ji sdílí po malých částech mezi mnoha uzly. Žádný uzel ji nemusí ukládat celou a uzel si může stáhnout jakoukoli část a zkontrolovat ji vůči datům, která už má, aniž by musel důvěřovat uzlu, který mu ji poslal.

Více o [uzlech a klientech](/developers/docs/nodes-and-clients/)

## Proč potřebujeme Portal Network {#why-do-we-need-portal-network}

Uzly Etherea ukládají svou vlastní plnou nebo částečnou kopii blockchainu Etherea. Tato lokální kopie se používá k ověřování transakcí a zajištění toho, že uzel sleduje správný řetězec. Tato lokálně uložená data umožňují uzlům nezávisle ověřit, že příchozí data jsou platná a správná, aniž by musely důvěřovat jakémukoli jinému subjektu.

Tato lokální kopie blockchainu a souvisejících dat o stavu a stvrzenkách zabírá na pevném disku uzlu spoustu místa. Například pro provoz uzlu pomocí klienta [Geth](https://geth.ethereum.org) spárovaného s konsensuálním klientem se doporučuje 4TB SSD. S plnou historií řetězce zabírá Geth více než 1,8 TB místa na disku (k září 2026) a toto číslo s růstem řetězce neustále roste.

To znamená, že provozování uzlů může být drahé, protože Ethereu musí být vyhrazeno velké množství místa na disku. [Exspirace historie](/roadmap/statelessness/#history-expiry) to snižuje tím, že umožňuje klientům smazat stará data bloků, která nepotřebují ke sledování řetězce: od [částečné exspirace historie](https://blog.ethereum.org/2025/07/08/partial-history-exp) v červenci 2025 mohou exekuční klienti zahodit těla a stvrzenky každého bloku před Merge. [Exspirace stavu](/roadmap/statelessness/#state-expiry) a [bezstavovost](/roadmap/statelessness/) jsou další řešení, která se stále zkoumají.

Jakmile uzly přestanou ukládat starou historii, nemohou ji už poskytovat ostatním. Archivy, torrenty a poskytovatelé si uchovávají její kopie; Portal Network ji rozprostírá mezi mnoho uzlů, takže zůstává dostupná, aniž by se spoléhala na kterýkoli z nich.

## Jak Portal Network funguje? {#how-does-portal-network-work}

Uzly Etherea mají přísné protokoly, které definují, jak spolu komunikují. Exekuční klienti komunikují pomocí sady podprotokolů známých jako [devp2p](/developers/docs/networking-layer/#devp2p), zatímco konsensuální klienti používají jinou sadu podprotokolů zvanou [libp2p](/developers/docs/networking-layer/#libp2p). Devp2p umožňuje uzlu vyžádat si těla bloků a stvrzenky od svých peerů, ale peer, který zahodil starou historii, ji nemůže poskytnout. Aplikace a peněženky mohou také získávat data z uzlu prostřednictvím [rozhraní pro programování aplikací (API) JSON-RPC](/developers/docs/apis/json-rpc/), ale to spoléhá na to, že data ukládá jeden uzel nebo poskytovatel, a na důvěru v jeho poctivost.

Portal Network je samostatná peer-to-peer síť vytvořená pro sdílení historie. Běží na [discv5](https://github.com/ethereum/devp2p/blob/master/discv5/discv5.md), protokolu pro objevování uzlů, který konsensuální klienti také používají k hledání peerů, a organizuje své uzly jako [distribuovanou hashovací tabulku (DHT)](https://en.wikipedia.org/wiki/Distributed_hash_table), podobně jako BitTorrent. Každý uzel má ID uzlu a každý kus obsahu, jako jsou stvrzenky jednoho bloku, má ID obsahu ve stejném prostoru ID, odvozené od čísla jeho bloku. Každý uzel ukládá obsah, jehož ID jsou nejblíže jeho vlastnímu ID, až do vzdálenosti, kterou si zvolí, zvané jeho poloměr. K získání kusu obsahu se uzel zeptá peerů, které zná a kteří jsou nejblíže ID obsahu. Peery, které jej nemají, odpoví uzly, které jsou ještě blíže, dokud požadavek nedosáhne uzlu, který jej ukládá.

<PortalHistoryDiagram />

Uzel nikdy nemusí důvěřovat datům, která obdrží. Uchovává každou hlavičku bloku a každá hlavička se zavazuje k transakcím a stvrzenkám svého bloku prostřednictvím kořenů, jako jsou `transactionsRoot` a `receiptsRoot`. Uzel před použitím zkontroluje tělo bloku nebo stvrzenky bloku vůči těmto kořenům.

### Sítě Portal Network {#the-portal-networks}

Portal Network byla původně navržena jako několik podsítí, které by umožnily lehkým klientům sledovat řetězec bez důvěry v plný uzel: síť lehkých klientů Beacon chainu, síť stavu, síť pro šíření transakcí (gossip) a síť historie. V roce 2025 byly specifikace všech kromě jedné přesunuty do starších verzí (legacy) a vývoj se nyní zaměřuje na **síť historie** (History network), která ukládá těla a stvrzenky minulých bloků pro exekuční klienty, kteří si uchovávají každou hlavičku bloku, ale zbytek historie zahodili.

## Klienti sítě Portal Network {#client-diversity-as-default}

Několik týmů vytvořilo klienty pro Portal Network:

- [Klient Nimbus Portal](https://fluffy.guide) (dříve Fluffy): napsaný v jazyce Nim a jako jediný je stále v aktivním vývoji
- [Trin](https://github.com/ethereum/trin): napsaný v jazyce Rust, již není udržován
- [Ultralight](https://github.com/ethereumjs/ultralight): napsaný v jazyce TypeScript, bez aktualizací od poloviny roku 2025
- [Shisui](https://github.com/zen-eth/shisui): napsaný v jazyce Go, bez aktualizací od poloviny roku 2025

## Další čtení {#further-reading}

- [Specifikace sítě Portal Network](https://github.com/ethereum/portal-network-specs)
- [Použití protokolu Portal Network pro exspiraci historie](https://ethresear.ch/t/using-portal-network-protocol-for-history-expiry/22658)
- [Částečná exspirace historie](https://blog.ethereum.org/2025/07/08/partial-history-exp)
- [Portal Network (Piper Merriam na Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA)
- [Discord sítě Portal Network](https://discord.gg/CFFnmE7Hbs)
- [Webové stránky sítě Portal Network](https://www.ethportal.net/)
