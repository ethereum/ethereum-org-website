---
title: "Vysvětlení decentralizované identity"
description: "Vysvětlení, jak decentralizovaná identita dává uživatelům větší kontrolu nad jejich digitální identitou a udržuje osobní údaje na internetu ve větším bezpečí pomocí pověření založených na blockchainu."
lang: cs
youtubeId: "Ew-_F-OtDFI"
uploadDate: 2022-04-12
duration: "0:05:22"
educationLevel: beginner
topic:
  - "identity"
format: explainer
author: Microsoft Security
breadcrumb: "Decentralizovaná identita"
---

Vysvětlení od **Microsoft Security** o tom, jak decentralizovaná identita dává uživatelům větší kontrolu nad jejich digitálními pověřeními, pokrývající problémy se současnými digitálními identifikátory, jak fungují ověřitelná pověření (Verifiable Credentials) a decentralizované identifikátory (Decentralized Identifiers) a co to znamená pro soukromí online.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=Ew-_F-OtDFI) zveřejněného společností Microsoft Security. Byl lehce upraven pro lepší čitelnost.*

#### Problém s digitálními pověřeními (0:02) {#the-problem-with-digital-credentials-002}

Každý den nosíme peněženky plné karet. Nicméně jen několik vybraných – jako jsou vládní průkazy totožnosti a kreditní karty – je široce přijímáno. Naše společnost zavedla globální normy pro to, jak předkládáme a ověřujeme pověření, která tyto fyzické karty představují. Pro digitální pověření však neexistuje žádný skutečný ekvivalent.

Proč ne? Zaprvé neexistuje žádný standardní mechanismus pro vydávání digitálních karet. K vydávání univerzálně přijatelných digitálních karet nebo pověření potřebujeme digitální identifikátory, které mohou jednotlivci vlastnit nezávisle na jakémkoli subjektu, organizaci nebo instituci. V současné době používáme e-mailové adresy a telefonní čísla jako identifikátory pro přístup k webovým stránkám a aplikacím. Náš přístup k těmto identifikátorům a našim osobním údajům je však vydán na milost a nemilost poskytovatelům služeb, kteří je mohou kdykoli zrušit.

Zadruhé neexistují žádné univerzálně přijímané standardy pro vyjadřování, výměnu a ověřování digitálních pověření napříč hranicemi organizací.

#### Jak funguje decentralizovaná identita (1:03) {#how-decentralized-identity-works-103}

To vše se brzy změní. Nová forma digitální identity, založená na vznikajících standardech, jako jsou ověřitelná pověření a decentralizované identifikátory, může umožnit, aby digitální pověření fungovala všude, byla důvěryhodnější a respektovala soukromí.

Funguje to takto. Seznamte se s Alicí. Její nová digitální peněženka jí umožňuje vlastnit a ovládat svá pověření. Vzhledem k tomu, že není vázána na žádnou konkrétní organizaci, mohou autoritativní zdroje s jistotou vydávat Alici pověření založená na standardech. Když Alice tato pověření předloží, webové stránky a aplikace mohou zkontrolovat jejich platnost – například potvrzením u univerzity, že je tam studentkou – a následně jí podle toho udělit přístup.

#### Kryptografická důvěra (1:51) {#cryptographic-trust-151}

I když tento proces může být jednodušší, jak víme, že je důvěryhodný? Decentralizované identifikátory využívají osvědčené kryptografické systémy. Když Alice předloží svá pověření, její digitální peněženka vygeneruje jedinečný identifikátor a podepíše jej pomocí soukromého klíče zabezpečeného biometrickým důkazem nebo PIN kódem, který zná pouze ona. Jedinečně spárovaný veřejný klíč je publikován do distribuované účetní knihy (distributed ledger).

Alice může předložit svůj digitální studentský průkaz v knihkupectví a to si před poskytnutím slevy může potvrdit, že průkaz Alici vydala univerzita.

#### Soukromí a kontrola (2:27) {#privacy-and-control-227}

Tato zkušenost napodobuje to, co Alice dělá dnes. Může digitálně předložit a ověřit sadu ověřitelných pověření, stejně jako by předložila fyzickou kartu. A může je zrušit jediným kliknutím, stejně jako by vrátila kartu do své peněženky.

Nejlepší ze všeho je, že tyto digitální karty jsou soukromé. To dává Alici výhradní kontrolu nad její digitální identitou – ona za ni činí rozhodnutí. Ověřitelná pověření usnadní udržení kontroly a pomohou odemknout důvěryhodnější internet, který respektuje soukromí nás všech.