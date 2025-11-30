---
title: Zlepšování zkušeností uživatelů
description: Používání Etherea je pro většinu lidí stále moc složité. Aby bylo možné přiblížit se k masovému přijetí, musí Ethereum zásadně snížit své bariéry pro vstup – uživatelé by měli mít výhody decentralizovaného, cenzuře odolného přístupu k Ethereu bez omezení, ale musí to být stejně bezproblémové, jako používání tradičních Web2 aplikací.
lang: cs
image: /images/roadmap/roadmap-ux.png
alt: "Plán Etherea"
template: roadmap
---

**Používání Etherea musí být jednodušší**; od správy [klíčů](/glossary/#key) a [peněženek](/glossary/#wallet) až po PoSílání transakcí. Aby bylo masové přijetí vůbec možné, musí být používání Etherea mnohem jednodušší, aby měli uživatelé možnost cenzuře odolného přístupu k Ethereu bez omezení se zkušeností podobnou bezproblémovému používání [Web2](/glossary/#web2) aplikací.

## Za bezpečnostní frází {#no-more-seed-phrases}

Účty na Ethereu jsou chráněny párem klíčů, které se používají k identifikaci účtu (veřejný klíč) a podepisování zpráv (privátní klíč). Privátní klíč je jako hlavní heslo; umožňuje úplný přístup k účtu na Ethereu. To je odlišný způsob fungování, než na který jsou lidé zvyklí u bank a Web2 aplikací, které spravují účty za uživatele. Aby Ethereum dosáhlo masového přijetí bez nutnosti spoléhat se na centralizované třetí strany, musí existovat jednoduchý a bezproblémový způsob, jak může uživatel převzít kontrolu nad svými aktivy a daty, aniž by musel rozumět kryptografii veřejného a privátního klíče a správě těchto klíčů.

Řešením je při interakci s Ethereem používat peněženky založené na [chytrých kontraktech](/glossary/#smart-contract). Takové peněženky vytvářejí způsoby ochrany účtů v případě ztráty nebo krádeže klíčů, možnosti lepší detekce a obrany proti podvodům a umožňují peněženkám rozšířit nabídku o nové funkce. Ačkoliv peněženky založené na chytrých kontraktech v současné době existují, je obtížné je vyvíjet, protože to ze strany protokolu Ethereum vyžaduje lepší podporu. Tato dodatečná podpora je známá jako abstrakce účtů.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">Více o abstrakci účtů</ButtonLink>

## Síťové uzly pro každého

Uživatelé provozující [síťové uzly](/glossary/#node) nemusí důvěřovat třetím stranám, které by jim poskytovaly data, a mohou rychle, v soukromí a bez povolení interagovat s [blockchainem](/glossary/#blockchain) Ethereum. Nicméně, provoz síťového uzlu v současnosti vyžaduje technické znalosti a významný prostor na pevném disku, což vede mnoho lidí k tomu, že raději důvěřují zprostředkovatelům.

Existuje několik vylepšení, která usnadní provoz těchto uzlů a sníží jejich náročnost na zdroje. Způsob ukládání dat se změní ve prospěch prostorově efektivnější struktury známé jako **Verkle Tree**. Dále, s využitím [bezstavovosti](/roadmap/statelessness) nebo [expirace dat](/roadmap/statelessness/#data-expiry), nebudou síťové uzly na Ethereu potřebovat ukládat kopii celého stavu Etherea, což výrazně sníží požadavky na prostor na pevném disku. [Jednoduché síťové uzly](/developers/docs/nodes-and-clients/light-clients/) nabídnou řadu výhod provozu plného uzlu, ale mohou být snadno provozovány na mobilních telefonech nebo v jednoduchých webových aplikacích.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">Další informace o Verkle Trees</ButtonLink>

S těmito vylepšeními budou bariéry pro provoz síťového uzlu sníženy prakticky na nulu. Uživatelé budou benefitovat z bezpečného přístupu k Ethereu bez bariér, aniž by museli obětovat velký prostor na pevném disku nebo CPU na svém počítači či mobilním telefonu, a nebudou se muset spoléhat na třetí strany za účelem získání dat nebo přístupu k síti při používání aplikací.

## Aktuální průběh {#current-progress}

Peněženky založené na chytrých kontraktech jsou už k dispozici, ale je třeba uvést do chodu další vylepšení, aby byly co nejvíce decentralizované a přístupné bez nutnosti povolení třetí strany. EIP-4337 je hotový návrh, který nevyžaduje žádné změny v protokolu Etherea. Hlavní chytrý kontrakt nutný pro EIP-4337 byl **spuštěn v březnu 2023**.

**Úplná bezstavovost je stále ve fázi výzkumu** a její implementace bude pravděpodobně trval několik let. Existuje několik milníků na cestě k úplné bezstavovosti, včetně expirace dat, které mohou být implementovány dříve. Nejprve je ale třeba dokončit jiné body plánu, jako jsou [Verkle Trees](/roadmap/verkle-trees/) a [oddělení navrhovatelů a stavitelů bloků](/roadmap/pbs/).

Testovací sítě Verkle Trees jsou již v provozu a další fáze zahrnuje spuštění klientů podporujících Verkle Tree na soukromých a následně veřejných testovacích sítích. I vy můžete pomoci urychlit tento vývoj tím, že spustíte své kontrakty na testovacích sítích nebo spustíte klienty testovacích sítí.
