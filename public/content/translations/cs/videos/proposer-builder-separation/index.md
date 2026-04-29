---
title: "Za hranicemi protokolu Ethereum: oddělení navrhovatele a tvůrce"
description: "Prezentace o oddělení navrhovatele a tvůrce (PBS), návrhovém vzoru, který v Ethereu odděluje role tvorby bloku a navrhování bloku."
lang: cs
youtubeId: "u8XvkTrjITs"
uploadDate: 2024-02-05
duration: "0:22:47"
educationLevel: advanced
topic:
  - "plán"
  - "pbs"
  - "mev"
format: presentation
author: CBER Forum
breadcrumb: "Vysvětlení PBS"
---

Tato prezentace vysvětluje, jak se produkce bloků v Ethereu vyvinula z jednoduchého modelu do sofistikovaného dodavatelského řetězce zahrnujícího validátory, tvůrce, hledače a relays. Barnabé Monnot z Nadace Ethereum podrobně popisuje, proč existuje oddělení navrhovatele a tvůrce (PBS), jak MEV-Boost relays zprostředkovávají vztah mezi navrhovateli a tvůrci a jaká řešení přímo v protokolu se zkoumají za účelem snížení závislosti na důvěře a zlepšení odolnosti vůči cenzuře, distribuce MEV a decentralizace validátorů.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=u8XvkTrjITs) zveřejněného fórem CBER. Pro lepší čitelnost byl lehce upraven.*

#### Úvod (0:00) {#introduction-000}

Jmenuji se Barnabé Monnot. Budu mluvit o tom, co se děje mimo protokol, a zejména o konceptu oddělení navrhovatele a tvůrce (PBS) a o tom, jak funguje s relays a velkým množstvím offchain infrastruktury.

Rád o protokolu přemýšlím jako o abstraktním objektu, který má určité pravomoci. Jednou z pravomocí, které protokol má, je schopnost udělovat práva určitým účastníkům. V předchozí přednášce jsme viděli, že protokol opravňuje validátory k plnění povinností spojených s konsensem, ale to není to jediné, co dělají — musíme také plnit bloky transakcemi. Tomu říkáme exekuční povinnosti a právě na ty se chci v této přednášce zaměřit.

#### Proč validátoři používají tvůrce (0:46) {#why-validators-use-builders-046}

Zajímavé je, že i když je to protokol, kdo tato práva vytváří a dává je validátorům, v praxi pozorujeme, že mnoho validátorů se rozhodne toto právo nevyužít samo. Rozhodnou se toto právo předat někomu jinému, aby ho vykonával jejich jménem. A tím „někým jiným“ jsou ti, které v Ethereu známe jako tvůrce.

Pozorujeme tedy, že i když validátoři nadále plní tyto povinnosti spojené s konsensem sami, rozhodnou se předat exekuční povinnosti tvůrcům. Je to vlastně docela významný trh. Dnes je asi 90 % bloků vytvářeno externími tvůrci, a to platí zhruba od prosince 2022 — tři měsíce po Merge. Mediánová platba od tvůrce validátorovi je asi 120 dolarů za blok. Denně se vyplácí milion dolarů a každých 12 sekund existuje možnost, že na tomto trhu dojde k nějaké dohodě mezi jedním navrhovatelem a jedním tvůrcem.

Dnes chci probrat, proč validátoři používají tvůrce, odkud tento vztah pochází — cestou vám trochu představím MEV a hledače — pak vám řeknu, jak je tento vztah zprostředkován, a budu mluvit o relays, které dnes existují, a o řešeních přímo v protokolu, o kterých uvažujeme. Chci se také trochu podívat na celkový pohled, protože je snadné vidět tyto obrázky a pomyslet si: „Ach, to je velmi děsivé, a co decentralizace?“ Chci vám ukázat, že se jedná o kompromisy, které se dělají, ale podle mého názoru se dělají správným směrem.

#### Naivní model a MEV (3:04) {#the-naive-model-and-mev-304}

Můžete si představit naivní model produkce bloků, kde je validátor vybrán podle procesu výběru lídra a musí vytvořit blok obsahující seznam transakcí z mempoolu. V tom nejnaivnějším modelu máte vlastně jen dvě strany — validátora, který naslouchá mempoolu, a když je na něm řada, aby vytvořil blok, vybere transakce, které platí nejvyšší poplatky, a přidá je, obvykle pomocí nepříliš sofistikovaných algoritmů pro plnění.

V posledních pěti letech se poměrně dramaticky ukázalo, že to dává producentovi velkou moc — zejména moc posledního pohledu. Vidí, co chtějí uživatelé udělat, například vidí, že uživatel chce provést swap, a mohou tuto informaci využít k tomu, aby pro sebe získali zisk.

V nejlepším případě tento zisk pochází z přirozeného fungování trhu, jako je arbitráž. V nejhorším případě může jít přímo z kapsy uživatele, jako v případě sendvičových útoků. Například uživatel zadá příkaz na swap tokenu A za token B na nějakém trhu, jako je Uniswap. Tato transakce vytvoří cenovou nerovnováhu s jiným trhem nasazeným na stejném řetězci. Producent může vidět čekající transakci a vložit svou vlastní transakci, která provede swap v opačném směru na jiném trhu, a přitom shrábne arbitráž.

To dává producentovi opravdu velkou moc a činí pozici producenta bloku nesmírně cennou. Toto privilegium producenta je něco, co nyní nazýváme **maximální extrahovatelná hodnota (MEV)**.

#### Role hledačů (5:43) {#the-role-of-searchers-543}

V praxi producenti nemusí vědět, kde se hodnota nachází. Můžete mít poněkud nesofistikované producenty bloků — jak již bylo zmíněno, kdokoli se může stát validátorem, pokud má dostatečný kapitál a je schopen provozovat uzel. V praxi možná nevím, jak dělat arbitráž, ani nic o finančních trzích. Chtěl bych, aby mi někdo řekl, kde tyto příležitosti jsou — trh lidí, kteří soutěží o to, aby mi řekli, co je pro mě jako producenta bloku nejlepší udělat.

Tyto subjekty, které jsou velmi dobré v hledání příležitostí, nazýváme **hledači**. Odhalují příležitosti producentovi bloku. Hledač může pozorovat uživatele, který provádí swap, ať už prostřednictvím veřejného mempoolu, nebo prostřednictvím dark poolů či soukromých kanálů, a poté sdělit validátorovi: „Probíhá swap — pokud tento swap zabalíte spolu s touto arbitráží do balíčku atomických transakcí a tento balíček zahrnete, pak můžete na arbitráži vydělat.“ Budete mít mnoho hledačů, kteří budou soutěžit o to, aby přesvědčili producenta bloku.

Tento model v praxi funguje dobře, pokud hledač důvěřuje producentovi, že zachová atomicitu balíčku. Možná jste nedávno slyšeli o útoku na Ethereum, který stál skupinu sendvičovačů 25 milionů dolarů — hlavní příčinou bylo, že se útočníkovi podařilo narušit atomicitu balíčků, získat jejich obsah a pokusit se je reorganizovat a upravit. To je velmi důležitá vlastnost, která skutečně platí jen do té doby, dokud lze producentovi důvěřovat, že tuto atomicitu nenaruší.

#### Proč potřebujeme tvůrce (8:16) {#why-we-need-builders-816}

Co dělat, když je producent nedůvěryhodný? Po Merge máme v Ethereu sólo stakery — asi 6 % sítě —, které neznáme. Hledači nebudou chtít těmto navrhovatelům bloků posílat balíčky, protože je to příliš nebezpečné.

Takže návrh, ke kterému se dospělo, zní: místo toho, aby hledači komunikovali balíčky, které producent zahrne do svého bloku, vytvoříme pro vás rovnou celý blok. Tímto způsobem můžete blok jen slepě podepsat — nepotřebujete vědět, co v něm je, důvěřujete, že vám tvůrce dává dobrý blok.

Nyní máte tento ještě hlubší řetězec: validátor na jednom konci, uživatel na druhém a mezi nimi celý tento řetězec zprostředkovatelů, který se postupem času stále zahušťuje. Tvůrce provádí exekuční část, zatímco validátor zajišťuje konsensus.

#### Jak fungují MEV-Boost relays (13:01) {#how-mev-boost-relays-work-1301}

Řekněme, že jste navrhovatel a chcete vstoupit na tento trh. Tato služba produkce bloků je klasickým problémem spravedlivé směny — dvě strany se snaží dospět k dohodě, ale navzájem si nedůvěřují. Klasická literatura říká, že spravedlivou směnu nelze provést bez důvěryhodné třetí strany.

To, co dnes používáme jako důvěryhodnou třetí stranu, nazýváme **relay** — MEV-Boost relay. MEV-Boost je název protokolu, který zprostředkovává interakce mezi tvůrci a validátory. Relay sedí uprostřed, aby zajistila, že dohoda bude naplněna z obou stran.

Relay má několik rolí. Zaprvé musí ověřit payload tvůrce — relay vidí v nezašifrované podobě blok, který tvůrce vytváří, a může zkontrolovat, zda je platný a může být navržen síti. Existuje varianta zvaná optimistická relay, kde relay nekontroluje platnost okamžitě, ale žádá tvůrce o zajištění pro případ, že by byl blok nakonec neplatný.

Zadruhé, tvůrci podávají nabídky a snaží se soutěžit o to, aby se stali tvůrcem vybraným validátorem. Relay funguje jako přeposílač nabídek a odesílá je validátorovi. V posledním kroku, jakmile si validátor vybere jednu z nabídek od relay — a validátor se může připojit k libovolnému počtu relays —, podepíše ji, stále aniž by věděl, jaký je obsah bloku, a pošle podepsanou nabídku zpět relay. Na základě této podepsané nabídky může relay uvolnit blok do sítě.

Ekonomika relays je složitá. Některé jsou zdarma, něco jako veřejné statky. Jiné si vyvinuly modely příjmů — například Ultrasound relay má „úpravu nabídky“, kde si jako příjem berou rozdíl mezi nejlepší a druhou nejlepší nabídkou.

#### Důvěra a relay (17:01) {#trust-and-the-relay-1701}

Relay je v systému důvěryhodnou třetí stranou. Řekněme, že relay naservíruje neplatný blok — lidé to okamžitě uvidí, protože je podepsaný, a velmi rychle se od této relay odpojí. Můžete dokonce šířit nějaký druh důkazu chyby. Během pěti bloků, pokud relay nefunguje dobře, jí lidé přestanou důvěřovat a prostě se odpojí.

Je to tedy založeno na důvěře, ale s předpokladem, že ji lze poměrně rychle nahradit. Relays nejsou validátoři — nemusí mít nutně stake a nemusí mít s Ethereem nic společného. Dnes to mohou být lidé, které známe a máme rádi, ale zítra to může být kdokoli.

#### Zakotvení PBS v protokolu (20:01) {#enshrining-pbs-in-the-protocol-2001}

Snažíme se eliminovat status relay jako důvěryhodné třetí strany. V Ethereu máme důvěryhodnou třetí stranu, kterou máme rádi — a tou je samotné Ethereum. Můžete navrhnout řešení přímo v protokolu, která se v podstatě snaží zakotvit roli relay a učinit závislost na ní volitelnou.

Právě teď protokol Ethereum vidí část toho, co dělají validátoři, ale je zcela slepý vůči síti tvůrců. Snažíme se to posunout tak, aby se protokol Ethereum stal důvěryhodnou třetí stranou v interakci mezi navrhovatelem a tvůrcem — v tomto smyslu se už nebudeme muset spoléhat na relay.

#### Omezování tvůrců, posilování decentralizace (22:05) {#constraining-builders-amplifying-decentralization-2205}

Celkový pohled je důležitý. Zdá se, že na každé vrstvě probíhají různé hry a různí hráči si navzájem berou peníze — jsou to zase tradiční finance? Chci tvrdit, že tyto kompromisy nevycházejí ze špatných úmyslů. Snaží se opřít o vlastnosti těchto systémů, o kterých si myslíme, že jsou užitečné pro jejich škálování a zvýšení jejich užitečnosti.

Vitalik mluvil o zásadní asymetrii služeb, které může blockchain nabízet. Konsensus vyžaduje velmi velkou decentralizovanou skupinu lidí, kteří provádějí kontrolu. Některé služby ale skutečně vyžadují, aby jeden člověk odvedl práci dobře a všichni ostatní ověřili, že byla odvedena dobře. Potřebujeme pouze jednoho tvůrce, aby vytvořil blok, a pak mohou všichni ověřit, že je platný.

Dnes existují jasně tři dominantní tvůrci: Beaver Build, Titan a rsync Builder. Je to dobrý stav věcí? Ani ne — můžeme to udělat lépe. Ale je reálné si představit, že budeme mít tolik tvůrců jako validátorů? Pravděpodobně ne.

To, co skutečně chceme, je tato tenká vrstva validátorů, která omezuje a využívá skutečnosti, že uprostřed jsou vysoce výkonné strany, které mohou provádět úkoly nevyžadující předpoklady poctivé většiny.

Některé nápady na omezení tvůrců:

- **Seznamy zahrnutí (inclusion lists)** — kde validátor říká tvůrci: „Tyto transakce musíš zahrnout do svého bloku.“
- **Částečná tvorba bloku** — rozdělení celého bloku tak, aby tvůrce neměl monopol na veškerý prostor.
- **Snížení závislostí na třetích stranách** — zakotvení role relay v protokolu.

Pro posílení decentralizace validátorů:

- **Oddělení atestátora a navrhovatele** — místo toho, aby byl validátor standardně producentem bloku, vybere se jiná skupina lidí, kteří se stanou producenty bloků, a tyto role se oddělí.
- **Vylepšené mechanismy stakingu** — staking v Ethereu je dnes trochu rudimentární a lze jej vylepšit.

#### Otázky a závěr (27:03) {#questions-and-closing-2703}

Otázka z publika: v tradičním finančním světě se doba vypořádání zkracuje ze dvou dnů na jeden den. Vyřešilo by zkrácení doby vypořádání z 12 sekund na kratší interval některé problémy s předbíháním?

Lidé o tom mluví — říkají tomu **předběžná potvrzení (pre-confirmations)**. Myšlenka je taková, že pošlete svou transakci a někdo vám řekne: „Jste tam, za tuto cenu, v tomto stavu.“ Jde o to, že nemůžete provést vypořádání rychleji, než běží protokol. Nemůžete dosáhnout rychlejšího vypořádání s finalitou než za 12 minut. Nemůžete se pohybovat rychleji, než je čas bloku.

Zkrácení času bloku je těžké, protože chceme udržet vrstvu validátorů co nejvíce decentralizovanou, a jeho zkrácení jen zvyšuje hardwarové požadavky.