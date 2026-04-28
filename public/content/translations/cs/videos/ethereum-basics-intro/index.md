---
title: "Základy Etherea: úvod"
description: "Úvodní přednáška o základech Etherea, která pokrývá, co je Ethereum, jak se liší od Bitcoinu a základní koncepty, o které se opírá síť Ethereum."
lang: cs
youtubeId: "j78ZcIIpi0Q"
uploadDate: 2022-03-01
duration: "0:11:14"
educationLevel: beginner
topic:
  - "ethereum"
  - "úvod"
format: presentation
author: Quezar
breadcrumb: "Základy Etherea"
---

Úvodní přednáška od **Quezara**, která pokrývá základy Etherea, včetně toho, co jsou blockchainy, jak fungují uvnitř a jaké jsou klíčové komponenty, které tvoří síť Ethereum.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=j78ZcIIpi0Q), který zveřejnil Quezar. Byl lehce upraven pro lepší čitelnost.*

#### Přivítání a přehled série (0:03) {#welcome-and-series-overview-003}

Vítejte zpět u další části série o Ethereu. Pokud jste hledali dobrý zdroj k pochopení toho, jak Ethereum funguje uvnitř, jste na správném místě. V předchozí části jsme si ukázali, jak číst a psát základní chytré kontrakty v Solidity, a krátce jsme probrali několik věcí o různých komponentách sítě Ethereum. V této části se podrobněji podíváme na architekturu Etherea a probereme každou komponentu mnohem detailněji. Brzy přibude mnoho dalších videí, takže pokud se vám tento typ obsahu líbí, klikněte na tlačítko To se mi líbí a přihlaste se k odběru, abyste dostali upozornění, jakmile bude nové video zveřejněno.

#### Cíle a předpoklady (0:40) {#goals-and-prerequisites-040}

Cílem této části série je poskytnout vám během jednoho týdne dobré porozumění architektuře Etherea. Stejně jako u předchozí části jsem ji strukturoval tak, abyste se během sedmi dnů mnohem lépe orientovali ve všem, co se děje v síti Ethereum, kdykoli v ní někdo provede nějakou aktivitu.

Pokud jde o předpoklady — není nic konkrétního, co byste už museli znát. Pokud sledujete toto video, pak s největší pravděpodobností víte o síti Ethereum dostatek na to, abyste tuto část zvládli. Doporučil bych ale dokončit předchozí část série — Základy Solidity — protože ta je mnohem více prakticky zaměřená. Můžete si v ní spustit kód v Remix IDE a vidět, jak věci v síti Ethereum skutečně fungují. Tato část bude převážně teoretická, a pokud jste již prošli předchozí částí, bude pro vás mnohem snazší ji absolvovat.

#### Co probereme (1:41) {#what-well-cover-141}

V této části si vysvětlíme, co jsou blockchainy, a podíváme se, jak fungují uvnitř. Také se podíváme, jaké komponenty tvoří síť Ethereum, a poté se posuneme dál a probereme každou komponentu mnohem detailněji.

Pro tuto část jsem jako základ použil oficiální dokumentaci Etherea. Jakmile tuto část dokončíte, budete mít z velké části pokrytá základní témata této dokumentace. Bude pro vás mnohem snazší jí projít. Ve videích samozřejmě není úplně všechno, ale snažil jsem se pokrýt všechny věci na obecnější úrovni. Tuto část můžete považovat za úvod k dokumentaci, která jde mnohem více do hloubky.

#### Nástroje a přístup (2:30) {#tools-and-approach-230}

Budeme také používat Etherscan, abychom viděli, jak každá komponenta funguje v reálném čase. Nebojte se, pokud nepochopíte všechno napoprvé — ke konkrétním tématům se můžete kdykoli vrátit, když budete chtít. Doporučoval bych dělat si po každém tématu krátké přestávky, abyste je dokázali lépe vstřebat. Pojďme tedy začít tím, že si vysvětlíme, co jsou blockchainy.