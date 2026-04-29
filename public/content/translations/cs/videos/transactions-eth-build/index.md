---
title: "Transakce — ETH.BUILD"
description: "Ukázka toho, jak fungují transakce na Ethereu pomocí vzdělávacího nástroje ETH.BUILD. Podívejte se, jak se transakce vytvářejí, podepisují a odesílají v síti Ethereum."
lang: cs
youtubeId: "er-0ihqFQB0"
uploadDate: 2021-01-14
duration: "0:06:12"
educationLevel: beginner
topic:
  - "transakce"
format: tutorial
author: Austin Griffith
breadcrumb: "Transakce (ETH.BUILD)"
---

Návod od **Austina Griffitha**, který ukazuje, jak fungují transakce na Ethereu pomocí vizuálního programovacího nástroje ETH.BUILD — pokrývá strukturu transakce, ceny plynu, podepisování, odesílání a transakční pool.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=er-0ihqFQB0), který zveřejnil Austin Griffith. Byl lehce upraven pro lepší čitelnost.*

#### Transakční poplatky a pobídky pro těžaře (0:00) {#transaction-fees-and-miner-incentives-000}

Dnes se na ETH.BUILD budeme bavit o transakcích. Až doteď jsme měli tyto transakce, které se těžily do bloků, balily do bloků a těžily do řetězce. Chceme si promluvit o tom, co motivuje těžaře — kromě odměny za blok — aby vytáhl naši transakci z poolu, vložil ji do bloku a vytěžil ji do řetězce, ve srovnání s ostatními lidmi v poolu. V poolu mohou být tisíce lidí, kteří všichni tak trochu přihazují, a tímto příhozem je právě tento poplatek.

Ve své transakci bych mohl mít poplatek, který říká: „Jsem Alice a posílám pět Bobovi a moje nonce je jedna kvůli ochraně proti přehrání (replay protection).“ Také ten, kdo to vytěží, si může poplatek nechat pro sebe. V podstatě Alice posílá pět Bobovi, ale také platí těžaři drobný poplatek za to, že to vloží do řetězce.

#### Anatomie transakce na Ethereu (1:10) {#anatomy-of-an-ethereum-transaction-110}

Jak vypadá transakce na Ethereu? Už nebudeme mít „Boba“ a „Alici“ — budeme mít adresy. Hodnota bude ve Wei, ne v ETH. A poplatek bude také ve Wei.

Pojďme se do toho vrhnout a podívat se na tuto transakci. Mám účet s vloženou mnemotechnickou pomůckou (seedem) a jsem připojen k Ethereum Mainnetu. Také spouštím modul pro získání cenových dat z CoinMarketCap, takže vidím, že nula celá jedna něco ETH odpovídá asi třiadvaceti dolarům.

#### Nastavení transakce (2:25) {#setting-up-the-transaction-225}

To, co udělám, je, že vytvořím transakci a budu motivovat těžaře, aby ji vzal a vložil onchain. Mám dvě postavy — Alici a Boba. Alice pošle pomocí svého soukromého klíče nějakou hodnotu Bobovi. Není zde žádné pole pro adresu „od“ (from), protože — pamatujte — podepisujeme a obnovujeme pomocí našeho páru klíčů. Transakce se zabalí, podepíše a poté se odešle přes síť. Nikdo s ní nemůže manipulovat a na druhé straně ji někdo může obnovit a zjistit, že jsme to skutečně podepsali my. Adresa „od“ je odvozena.

#### Strategie ceny plynu (4:20) {#gas-price-strategy-420}

Cena plynu je ve výchozím nastavení nastavena na přibližně 4,1 Gwei — to je 4,1 miliardy Wei. Chceme k tomu ale přistoupit více strategicky a podívat se, co se právě teď děje onchain. Vidíme, že poslední blok měl 78 transakcí a cena plynu se pohybovala od zhruba 5 až po nějaké minimum. V podstatě bychom museli být nad 5, abychom byli vytěženi do tohoto bloku. Nastavme tedy cenu plynu na 5,001 — jen o trochu více.

#### Převod na Wei (5:20) {#converting-to-wei-520}

Musíme provést převod na Wei. Na Ethereu se většinou setkáte se dvěma nominálními hodnotami: ETH, o kterém lidé běžně mluví, a pak Wei, což je velmi nepatrný zlomek ETH. Gwei — to, co používáme pro ceny plynu — je někde mezi tím. Důvod je podobný tomu, proč nechodíme a nebavíme se ve zlomcích haléřů.

Alice má 0,18 ETH a my pošleme 0,05 ETH Bobovi. Zadáme cenu plynu 5 Gwei.

#### Podepisování a odesílání (7:02) {#signing-and-broadcasting-702}

Když se Alice rozhodne podepsat transakci, vyletí jako podepsaná transakce, která může putovat sítí. Nikdo s ní nemůže manipulovat — na druhé straně může někdo odvodit, že ji podepsala Alice, a obsahuje všechny informace o tom, komu chceme poslat prostředky a jaký gas připadne těžaři.

Vezmeme tuto podepsanou transakci a zapojíme ji do funkce odeslání v modulu blockchainu. Když kliknu na odeslat, vrátí nám to hash — hash transakce. V podstatě jsem ji poslal do distribuované sítě a ta mi vrátila hash transakce. Jde to do sítě a pak je tu tento pool transakcí — všichni lidé přihazují, aby jejich transakce prošla.

#### Kontrola bloku (8:41) {#checking-the-block-841}

Můžeme se dotázat blockchainu na naši transakci. A skutečně, už byla vytěžena. Můžeme se podívat na blok, seřadit ho podle ceny plynu a najít se. Tady je naše transakce s cenou plynu 5,001 — Alice posílá Bobovi, bez žádných dalších dat. Jsme tam, asi čtyři nebo pět pozic odspodu.

#### Odesílání dat s transakcí (9:54) {#sending-data-with-a-transaction-954}

Jsme schopni poslat hodnotu a přihodit, aby byla naše transakce rozpoznána onchain. Ale podívejme se ještě na jednu věc — datové pole. Spolu s naší transakcí můžeme posílat i další věci. Bude to v hexadecimálním formátu. Alice pošle Bobovi dalších šest dolarů a my připojíme zprávu: „ahoj Bobe“. Můžeme vidět „ahoj Bobe“ převedené do hexadecimálního formátu.

Podepíšeme tuto transakci, pošleme ji těžaři, jde do sítě a dostaneme zpět hash. Sledujeme, jak se těží, a skutečně se vytěží. Když zkontrolujeme tento blok, vidíme naši transakci s připojenými daty.

#### Transakční pool a navýšení gasu (12:43) {#transaction-pool-and-gas-bumping-1243}

Pro poslední ukázku jsem vložil transakci do poolu s velmi nízkou cenou plynu — asi 1,001 Gwei. Sedí tam nevytěžená, protože těžaře dostatečně nemotivujeme. Vidíme, že transakce čeká v transakčním poolu. Pool má mezi jedním a třemi sty transakcemi, ale poslední těžené bloky ukazují, že nejmenší cena plynu je asi 5.

Takže musíme tuto transakci odeslat znovu — zvedneme to na 10. To je mnohem více, než je potřeba, ale znovu odešleme stejnou transakci se stejnou nonce, ale s vyšší cenou plynu. Síť si řekne: „stejná osoba, stejná transakce, ochotná zaplatit více.“ Je vyzvednuta a vytěžena do dalšího bloku.

#### Shrnutí (14:52) {#summary-1452}

Odeslali jsme transakci, zaplatili jsme nějaký gas, abychom motivovali těžaře k jejímu vložení do řetězce bloků. Spolu s transakcí jsme také odeslali data — teď, když máme k dispozici tato data volání, můžeme dělat spoustu opravdu skvělých věcí, a později se dostaneme k chytrým kontraktům a spoustě dalších zábavných věcí.