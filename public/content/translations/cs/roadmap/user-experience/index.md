---
title: "Zlepšení uživatelské zkušenosti"
description: "Používání Etherea je pro většinu lidí stále příliš složité. Aby Ethereum podpořilo masové přijetí, musí drasticky snížit bariéry vstupu – uživatelé musí získat výhody decentralizovaného přístupu k Ethereu, který nevyžaduje povolení a je odolný vůči cenzuře, ale musí to být stejně bezproblémové jako používání tradiční Web2 aplikace."
lang: cs
image: /images/roadmap/roadmap-ux.png
alt: "Plán vývoje Etherea"
template: roadmap
---

**Používání Etherea je třeba zjednodušit**; od správy [klíčů](/glossary/#key) a [peněženek](/glossary/#wallet) až po iniciování transakcí. K usnadnění masového přijetí musí Ethereum drasticky zvýšit snadnost použití a umožnit uživatelům zažít přístup k Ethereu, který nevyžaduje povolení a je odolný vůči cenzuře, s bezproblémovým zážitkem jako při používání [Web2](/glossary/#web2) aplikací.

## Za hranice seed frází {#no-more-seed-phrases}

Účty na Ethereu jsou chráněny párem klíčů, které se používají k identifikaci účtů (veřejný klíč) a podepisování zpráv (soukromý klíč). Soukromý klíč je jako hlavní heslo; umožňuje úplný přístup k účtu na Ethereu. To je odlišný způsob fungování pro lidi, kteří jsou více zvyklí na banky a Web2 aplikace, jež spravují účty jménem uživatele. Aby Ethereum dosáhlo masového přijetí bez spoléhání se na centralizované třetí strany, musí existovat přímočarý a bezproblémový způsob, jak uživatel může převzít úschovu svých aktiv a udržet si kontrolu nad svými daty, aniž by musel rozumět kryptografii veřejného a soukromého klíče a správě klíčů.

Řešením je používání peněženek typu [chytrý kontrakt](/glossary/#smart-contract) pro interakci s Ethereem. Peněženky s chytrými kontrakty vytvářejí způsoby, jak chránit účty v případě ztráty nebo krádeže klíčů, příležitosti pro lepší detekci podvodů a obranu a umožňují peněženkám získat nové funkce. Ačkoli peněženky s chytrými kontrakty existují již dnes, jejich vývoj je neohrabaný, protože protokol Etherea je potřebuje lépe podporovat. Tato dodatečná podpora je známá jako abstrakce účtu.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">Více o abstrakci účtu</ButtonLink>

## Uzly pro každého {#nodes-for-everyone}

Uživatelé provozující [uzly](/glossary/#node) nemusí důvěřovat třetím stranám, že jim poskytnou data, a mohou s [blockchainem](/glossary/#blockchain) Etherea interagovat rychle, soukromě a způsobem nevyžadujícím povolení. Provozování uzlu však v současné době vyžaduje technické znalosti a značný prostor na disku, což znamená, že mnoho lidí musí místo toho důvěřovat zprostředkovatelům.

Existuje několik vylepšení, která učiní provozování uzlů mnohem snazším a méně náročným na zdroje. Způsob ukládání dat se změní tak, aby využíval prostorově efektivnější strukturu známou jako **Verkle strom**. Také díky [bezstavovosti](/roadmap/statelessness) nebo [expiraci dat](/roadmap/statelessness/#data-expiry) nebudou uzly Etherea muset ukládat kopii celkových dat o stavu Etherea, což drasticky sníží požadavky na místo na pevném disku. [Lehké uzly](/developers/docs/nodes-and-clients/light-clients/) nabídnou mnoho výhod provozování plného uzlu, ale mohou snadno běžet na mobilních telefonech nebo v jednoduchých aplikacích v prohlížeči.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">Přečtěte si o Verkle stromech</ButtonLink>

S těmito vylepšeními se bariéry pro provozování uzlu snižují prakticky na nulu. Uživatelé budou těžit z bezpečného přístupu k Ethereu, který nevyžaduje povolení, aniž by museli obětovat znatelné místo na disku nebo výkon procesoru na svém počítači či mobilním telefonu, a při používání aplikací se nebudou muset spoléhat na třetí strany ohledně dat nebo přístupu k síti.

## Současný pokrok {#current-progress}

Peněženky s chytrými kontrakty jsou již k dispozici, ale je zapotřebí dalších vylepšení, aby byly co nejvíce decentralizované a nevyžadující povolení. EIP-4337 je vyspělý návrh, který nevyžaduje žádné změny protokolu Etherea. Hlavní chytrý kontrakt požadovaný pro EIP-4337 byl **nasazen v březnu 2023**.

**Úplná bezstavovost je stále ve fázi výzkumu** a její implementace je pravděpodobně ještě několik let vzdálená. Na cestě k úplné bezstavovosti je několik milníků, včetně expirace dat, které mohou být implementovány dříve. Nejprve je třeba dokončit další položky plánu vývoje, jako jsou [Verkle stromy](/roadmap/verkle-trees/) a [oddělení navrhovatele a tvůrce (PBS)](/roadmap/pbs/).

Testnety pro Verkle stromy jsou již v provozu a další fází je spuštění klientů s podporou Verkle stromů na soukromých a poté veřejných testnetech. Pokrok můžete pomoci urychlit nasazením kontraktů na testnety nebo provozováním klientů na testnetu.