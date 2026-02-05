---
title: The Portal Network
description: Přehled sítě Portal Network - sítě ve vývoji, navržené pro podporu nízkozdrojových klientů.
lang: cs
---

Ethereum je síť složená z počítačů, které provozují softwarové klienty Etherea. Každý z těchto počítačů se nazývá síťový „uzel“. Klientský software umožňuje uzlu odesílat a přijímat data v síti Ethereum a ověřovat data podle pravidel protokolu Etherea. Uzel uchovává velké množství historických dat na svém disku a přidává další, když přijme nové informační pakety, známé jako bloky, od ostatních uzlů v síti. To je nutné pro neustálou kontrolu, zda má uzel informace konzistentní se zbytkem sítě. To znamená, že provozování uzlu může vyžadovat hodně prostoru na disku. Některé operace uzlu mohou vyžadovat také hodně RAM.

Aby se tento problém s prostorem vyřešil, byly vyvinuty „jednoduché“ uzly, které požadují informace od úplných uzlů, místo aby je všechny uchovávaly samy. To však znamená, že jednoduchý uzel nezávisle neověřuje informace a místo toho důvěřuje jinému uzlu. Znamená to také, že úplné uzly musí vykonávat dodatečnou práci, aby těmto jednoduchým uzlům poskytly potřebná data.

Portal Network je nový síťový design pro Ethereum, který si klade za cíl vyřešit problém dostupnosti dat pro „jednoduché“ uzly, aniž by bylo nutné důvěřovat úplným uzlům nebo na ně klást další zátěž, sdílením potřebných dat v malých kouscích napříč sítí.

Více o [uzlech a klientech](/developers/docs/nodes-and-clients/)

## Proč potřebujeme síť Portal {#why-do-we-need-portal-network}

Síťové uzly na Ethereu uchovávají vlastní plnou nebo částečnou kopii blockchainu Etherea. Tato lokální kopie slouží k validaci transakcí a zajištění, že uzel sleduje správný řetězec. Tato lokálně uložená data umožňují síťovým uzlům nezávisle ověřovat, že příchozí data jsou platná a správná, aniž by musely důvěřovat jakékoli jiné entitě.

Tato lokální kopie blockchainu a s ní spojená stavová a potvrzovací data zabírají na pevném disku uzlu hodně místa. Například pro spuštění uzlu pomocí [Geth](https://geth.ethereum.org) spárovaného s konsensuálním klientem se doporučuje 2TB pevný disk. Při použití snap syncu, který ukládá data řetězce pouze z relativně nedávné sady bloků, obvykle Geth zabírá asi 650 GB diskového prostoru, ale roste přibližně o 14 GB týdně (uzel můžete pravidelně snižovat úschovu zpět na 650 GB).

To znamená, že provozování síťových uzlů může být nákladné, protože velké množství diskového prostoru musí být vyhrazeno pro Ethereum. V plánu Ethereum existuje několik řešení tohoto problému, včetně [vypršení historie](/roadmap/statelessness/#history-expiry), [vypršení stavu](/roadmap/statelessness/#state-expiry) a [bezstavovosti](/roadmap/statelessness/). Tato řešení jsou však pravděpodobně od implementace vzdálena několik let. Existují také [lehké uzly](/developers/docs/nodes-and-clients/light-clients/), které neukládají vlastní kopii dat řetězce, ale vyžadují data, která potřebují, od plných uzlů. To však znamená, že jednoduché uzly musí důvěřovat úplným uzlům, že poskytnou poctivá data, a zároveň zatěžují úplné uzly, které musí tato data poskytovat.

Portal Network si klade za cíl poskytnout alternativní způsob, jak mohou jednoduché uzly získat svá data, aniž by musely důvěřovat úplným uzlům nebo výrazně přispívat k práci, kterou musí úplné uzly vykonávat. Tento cíl bude dosažen zavedením nového způsobu, jak mohou uzly Etherea sdílet data napříč sítí.

## Jak funguje Portal Network? {#how-does-portal-network-work}

Síťové uzly na Ethereu mají přísné protokoly, které definují, jak spolu komunikují. Exekuční klienti komunikují pomocí sady subprotokolů známých jako [DevP2P](/developers/docs/networking-layer/#devp2p), zatímco konsensuální klienti používají jinou sadu subprotokolů nazvanou [libP2P](/developers/docs/networking-layer/#libp2p). Tyto protokoly definují typy dat, která mohou být mezi uzly předávána.

![devP2P a libP2P](portal-network-devp2p-libp2p.png)

Uzly mohou také poskytovat specifická data prostřednictvím [JSON-RPC API](/developers/docs/apis/json-rpc/), což je způsob, jakým si aplikace a peněženky vyměňují informace s uzly Ethereum. Nicméně, žádný z těchto protokolů není ideální pro poskytování dat jednoduchým klientům.

Jednoduché uzly aktuálně nemohou požadovat konkrétní části dat řetězce přes DevP2P nebo libP2p, protože tyto protokoly jsou navrženy pouze pro synchronizaci řetězce a šíření bloků a transakcí. Jednoduché uzly nechtějí tato data stahovat, protože by to narušilo jejich jednoduchost.

JSON-RPC API také není ideální volbou pro požadavky na data vyslaná od jednoduchými klienty, protože spoléhá na připojení ke konkrétnímu úplnému uzlu nebo centralizovanému poskytovateli RPC, který může tato data sdílet. To znamená, že jednoduchý klient musí důvěřovat tomuto konkrétnímu uzlu nebo poskytovateli, že bude poctivý, a také úplný uzel může být zatížen množstvím požadavků od mnoha jednoduchých klientů, což zvyšuje jeho nároky na šířku pásma.

Cílem sítě Portal Network je znovu promyslet celý design, s důrazem na jednoduchost, mimo omezení existujících Ethereum klientů.

Hlavní myšlenkou sítě Portal je vzít to nejlepší ze současného síťového stacku tím, že umožní, aby informace potřebné pro lehké klienty, jako jsou historická data a identita aktuální hlavy řetězce, byly obsluhovány prostřednictvím odlehčené, decentralizované peer-to-peer sítě ve stylu DevP2P s využitím [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) (podobně jako Bittorrent).

Idea je přidat malé části celkových historických dat Etherea a určité specifické uzlové odpovědnosti každému uzlu. Poté jsou požadavky obsluhovány tím, že se vyhledají síťové uzly uchovávající požadovaná data a tato data se od nich získají.

Tento přístup obrací normální model, kdy jednoduché uzly vyhledávají jediný uzel a požadují po něm filtrování a poskytování velkých objemů dat; místo toho rychle filtrují velkou síť uzlů, z nichž každý zpracovává malé množství dat.

Cílem je umožnit decentralizované síti jednoduchých Portal klientů:

- sledovat hlavičku řetězce
- synchronizovat nedávná a historická data řetězce
- získávat stavová data
- vysílat transakce
- provádět transakce pomocí [EVM](/developers/docs/evm/)

Výhody tohoto síťového designu jsou:

- snížení závislosti na centralizovaných poskytovatelích
- Snížení využití internetové šířky pásma
- Minimální nebo žádná synchronizace
- Přístupné pro zařízení s omezenými zdroji (\<1 GB RAM, \<100 MB místa na disku, 1 CPU)

Níže uvedená tabulka ukazuje funkce stávajících klientů, které může poskytovat síť Portal, což uživatelům umožňuje přístup k těmto funkcím na zařízeních s velmi malými zdroji.

### Sítě Portal

| Lehký klient Beaconu        | Stavová síť           | Gossip transakcí  | Historická síť |
| --------------------------- | --------------------- | ----------------- | -------------- |
| Lehká data pro Beacon Chain | Úložiště účtů a smluv | Odlehčený mempool | Hlavičky       |
| Data protokolu              |                       |                   | Těla bloků     |
|                             |                       |                   | Potvrzení      |

## Diverzita klientů ve výchozím nastavení {#client-diversity-as-default}

Vývojáři sítě Portal se také od prvního dne rozhodli vytvořit čtyři samostatné klienty sítě Portal.

Klienti sítě Portal Network jsou:

- [Trin](https://github.com/ethereum/trin): napsaný v Rustu
- [Fluffy](https://fluffy.guide): napsaný v Nim
- [Ultralight](https://github.com/ethereumjs/ultralight): napsaný v Typescriptu
- [Shisui](https://github.com/zen-eth/shisui): napsaný v Go

Mít více nezávislých implementací klientů zvyšuje odolnost a decentralizaci sítě Ethereum.

Pokud by jeden klient měl problémy nebo zranitelnosti, ostatní klienti mohou nadále hladce fungovat, čímž se zabrání vzniku jediného bodu selhání. Různorodost implementací klientů navíc podporuje inovace a konkurenci, což vede k vylepšením a snižuje riziko monokultury v ekosystému.

## Další čtení {#further-reading}

- [Síť Portal (Piper Merriam na Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA).
- [Discord sítě Portal](https://discord.gg/CFFnmE7Hbs)
- [Webové stránky sítě Portal](https://www.ethportal.net/)
