---
title: "Kryptoekonomie: důkaz autority"
description: "Přednáška o kryptoekonomii vysvětlující mechanismus konsensu důkaz autority (PoA), jak funguje, jeho kompromisy ve srovnání s důkazem prací a důkazem podílu a kde se v praxi používá."
lang: cs
youtubeId: "Mj10HSEM5_8"
uploadDate: 2018-10-19
duration: "0:09:18"
educationLevel: intermediate
topic:
  - "konsensus"
  - "důkaz autority"
format: presentation
author: Cryptoeconomics Study
breadcrumb: "Důkaz autority"
---

Přednáška o kryptoekonomii od **Cryptoeconomics Study** vysvětlující mechanismus konsensu důkaz autority (PoA), včetně toho, jak centrální autorita určuje pořadí transakcí, jaké problémy s dvojí útratou a cenzurou to přináší a jaký je přístup ke zmírnění pomocí vícenásobného podpisu.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=Mj10HSEM5_8) publikovaného Cryptoeconomics Study. Byl lehce upraven pro lepší čitelnost.*

#### Jak funguje důkaz autority (0:00) {#how-proof-of-authority-works-000}

Vítejte v sekci 2.4 — důkaz autority — kde obnovujeme tuto centrální autoritu, aby určovala pořadí transakcí a vyřešila ten otravný malý problém s dvojí útratou.

Kdysi dávno existovala centrální autorita, kterou měli všichni docela rádi. Všichni tuto skvělou autoritu schvalovali a říkali: „Proč ji prostě neposloucháme? Měli jsme tyto problémy a neshodneme se na správném stavu, tak ať nám prostě řekne, jaký ten stav je.“

Naše centrální autorita provozuje svůj velký uzel a lidé nyní podepisují transakce a místo toho, aby si je posílali přímo mezi sebou, posílají je centrální autoritě. Centrální autorita aplikuje každou transakci a sama ji podepíše se slovy: „Ano, schvaluji — toto je transakce nula.“ Centrální autorita ji pak pošle všem a všichni transakci přijmou a berou ji jako bernou minci.

#### Problém s dvojí útratou (1:05) {#the-double-spend-problem-105}

Nyní zkusme dvojí útratu. Co se stane? Mallory pošle centrální autoritě dvě konfliktní transakce. Centrální autorita přijme první z nich a podepíše, že toto je druhá transakce, kterou viděla, pak podepíše, že toto je třetí transakce, kterou viděla, a poté tyto zprávy šíří dál.

Co se stane? Všichni obdrží stejné zprávy a všichni sledují pořadí od centrální autority. To znamená, že všichni skončí se stejnou historií. Pokud se podíváme na stavy, vedeme si dobře — Alice posílá Jingovi, pak Mallory posílá Alici, pak se Mallory pokusí poslat Jingovi, ale to neprojde, protože Mallory nemá dost peněz. Jejich zůstatky budou všechny stejné. Všichni jsou v konsensu. Centrální autorita — skvělé, zvládli jsme to.

#### Když je autorita kompromitována (2:09) {#when-the-authority-is-compromised-209}

Problém ale je, že musíme důvěřovat centrální autoritě, že zajistí toto pořadí transakcí. Co se tedy stane, když je centrální autorita vyhozena a ukáže se, že to celou dobu byla Mallory?

Dostáváme se zpět ke stejným problémům, jaké jsme měli předtím. Zaprvé, dvojí útraty — Mallory prostě podepíše obě konfliktní transakce a řekne, že obě probíhají ve stejnou dobu. Nevíme, která z nich přišla první. Mallory je selektivně šíří, zmate uzly a ty ztratí shodu.

Druhým problémem je cenzura. To je nový problém s naším řetězcem s důkazem autority. Co když Mallory nemá ráda Alici? Alice se snaží odeslat transakci a centrální autorita se na ni jen podívá, všimne si, že je to Alice, a zahodí ji. Alice se ji pokusí odeslat znovu a je opět zahozena. Alice neví, co se děje — její transakce neprocházejí. Cenzura je úspěšná a my jsme zpět v problémech.

#### Zmírnění pomocí vícenásobného podpisu (3:21) {#mitigating-with-multi-signature-321}

Nedělejte si příliš velké starosti — existuje potenciální zmírnění. Můžeme autoritu politicky decentralizovat. To teoreticky ztíží Mallory získání kontroly. Takže místo jedné centrální autority máme čtyři různé autority. Všechny možná zastupují různé zájmy různých stran a všechny se musí sejít, aby schválily transakce.

Tomu se říká vícenásobný podpis (multisig). Obdrží transakci od Alice pro Jinga a první z nich ji podepíše se slovy: „Viděl jsem tuto zprávu a schvaluji ji.“ Pak ji podepíše druhý a třetí. Můžeme říci, že přijímáme vícenásobný podpis dva ze čtyř, nebo tři ze čtyř, nebo možná vyžadujeme všechny strany — čtyři ze čtyř. Záleží to na vás, když navrhujete svůj vícenásobný podpis.

To znamená, že transakce projde a byla schválena autoritami.

#### Omezení důkazu autority (4:32) {#limitations-of-proof-of-authority-432}

Co se ale stane, když se všechny tyto autority stanou Mallory? Máme úplně stejné problémy — dvojí útraty a cenzuru. Takže to není dokonalé. V některých ohledech je to však lepší než centralizovaný zpracovatel plateb, protože alespoň uživatelé sami provádějí všechny transakce. Mohou nakonec odhalit dvojí útratu, ale stále máme své problémy. Technicky vzato můžeme stále provádět dvojí útratu a technicky vzato můžeme stále cenzurovat.

Neexistuje žádný otevřený přístup — může být těžké stát se jednou z těchto autorit. A neexistují žádné sankce v rámci protokolu, pokud dojde k dvojí útratě nebo cenzuře. V protokolu není nic, co by tyto autority potrestalo.

#### Co přijde dál (5:19) {#what-comes-next-519}

Naše moudrá Alice se tedy rozhodne, že existuje i jiná cesta — zbavit se autority. Kdo ji potřebuje? Místo toho umožníme komukoli stát se těžařem a účastnit se protokolu konsensu. To poskytuje otevřený přístup k účasti, ekonomické odměny za dobré chování — utváření konsensu způsobem, který funguje — a ekonomické tresty za špatné chování, kdy ho odhalíme a spálíme lidem jejich mince.

Ale to nás čeká příště v důkazu prací (PoW) — návrh mechanismu pro kapitolu 3.