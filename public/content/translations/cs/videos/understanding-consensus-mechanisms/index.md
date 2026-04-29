---
title: "Porozumění mechanismům konsensu blockchainu"
description: "Vysvětlení pokrývající základní mechanismy konsensu používané v blockchainech a to, jak umožňují decentralizovaným sítím shodnout se na stavu transakcí bez centrální autority."
lang: cs
youtubeId: "ojxfbN78WFQ"
uploadDate: 2018-11-29
duration: "0:09:33"
educationLevel: beginner
topic:
  - "konsensus"
  - "blockchain"
format: explainer
author: Tech in Asia
breadcrumb: "Mechanismy konsensu"
---

Vysvětlení od **Tech in Asia** pokrývající tři hlavní mechanismy konsensu používané v blockchainových systémech: důkaz prací (PoW), důkaz podílem (PoS) a důkaz autority, a to, jak umožňují decentralizovaným sítím shodnout se na stavu transakcí.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=ojxfbN78WFQ) publikovaného společností Tech in Asia. Byl lehce upraven pro lepší čitelnost.*

#### Co jsou mechanismy konsensu? (0:00) {#what-are-consensus-mechanisms-000}

Blockchain — populární slovo roku 2018. Víte ale, jak decentralizovaný peer-to-peer systém bez autoritativní postavy přijímá rozhodnutí? Odpověď spočívá v mechanismech konsensu. Existují různé mechanismy konsensu, ale všechny slouží stejnému účelu: zajistit, aby záznamy byly pravdivé a poctivé. Rozdíl je ve způsobu, jakým je konsensu dosaženo. Zde prozkoumáme tři typy mechanismů konsensu.

#### Důkaz prací (PoW) (0:23) {#proof-of-work-023}

V systému důkazu prací (PoW) jsou data transakcí ukládána do bloků, které jsou validovány tím, že lidé řeší složitý matematický problém, který je k nim připojen. To se obvykle provádí pomocí výkonných počítačů a je to známé jako „těžba“. Odměna ve formě kryptoměny je vydána prvnímu těžaři, který problém vyřeší.

Představte si skupinu hledačů pokladů, kteří se snaží otevřít truhlu se složitým zámkem. Zjištění správné kombinace je zdlouhavé, ale první člověk, kterému se to podaří, získá odměnu. Jednoduše řečeno, důkaz prací (PoW) je závod o zjištění správné kombinace k truhle s pokladem. Kryptoměny jako Bitcoin a Ethereum používají mechanismus důkazu prací (PoW).

#### Důkaz podílem (PoS) (1:04) {#proof-of-stake-104}

Dále tu máme důkaz podílem (PoS). Zde je tvůrce nového bloku, známý také jako validátor, náhodně vybrán na základě toho, jak velký stake vloží do sítě. Čím vyšší je vložený stake, tím vyšší je šance na výběr jako validátor.

Aplikujme to na scénář s truhlou s pokladem. Představte si skupinu hledačů pokladů, kteří soupeří o truhlu. Truhla je udělena na základě loterijního systému. Aby se každý hledač mohl zúčastnit, musí si koupit losy. Čím více jich každý hledač koupí, tím vyšší má šanci na výhru. Blockchainové protokoly jako Ouroboros od Cardana a EOS přijímají konsensus důkazu podílem (PoS).

#### Důkaz autority (1:42) {#proof-of-authority-142}

Nakonec důkaz autority — upravená forma důkazu podílem (PoS). Zde se validátory mohou stát pouze schválené strany vybrané na základě jejich reputace.

Vraťme se ke scénáři s truhlou s pokladem. Skupina hledačů pokladů vytvoří unii a spojí své poklady. Na základě úrovně jejich důvěryhodnosti je skupinou jmenováno několik vybraných jedinců, aby zajistili platnost obsahu truhly. Hyperledger Fabric od IBM a testnet Kovan na Ethereu jsou některé z příkladů blockchainových systémů, které používají důkaz autority.

#### Hybridní modely konsensu (2:14) {#hybrid-consensus-models-214}

Zatímco tradiční blockchainové společnosti fungují na jediném mechanismu konsensu, některé inovativní společnosti přijímají více protokolů konsensu. Vezměte si například Opet Foundation, která buduje unikátní blockchain pro ukládání dat shromážděných ve své aplikaci s chatbotem pro doučování tím, že aplikuje protokoly důkazu autority i důkazu prací (PoW).

Data, jako jsou akademické, mimoškolní a osobnostní profily studentů, jsou uložena na blockchainu a potenciálně validována prostřednictvím rámce důkazu autority poháněného systémem Hyperledger Fabric. Validátory jsou v tomto případě renomované vzdělávací instituce nebo dokonce národní registry a příslušná ministerstva školství. To pomáhá zajistit, že všechna data studentů jsou důvěryhodná.

Ale kdo bude pracovat zadarmo? Zde vstupuje do hry konsensus důkazu prací (PoW), který odměňuje validátory, kteří odvedli práci.

#### Soukromí a data studentů (3:02) {#privacy-and-student-data-302}

S Hyperledger Fabric je každý záznam studenta zabezpečen soukromým hash klíčem, který vlastní student. K datům lze přistupovat pouze tehdy, když student poskytne tento unikátní klíč. To znamená, že soukromí studenta je zachováno a kontrolováno samotným studentem.

Například, když se studenti hlásí na univerzitu přes platformu Opet, poskytnou univerzitě unikátní klíč ke svým záznamům. Díky tomu má univerzita přístup k jejich nejnovějším akademickým záznamům. Studenti také uvidí, zda byly jejich záznamy odemčeny nebo alespoň zváženy pro přijetí. To zvyšuje efektivitu a transparentnost ve srovnání s tradičními metodami.

#### Závěr (3:37) {#closing-337}

Spojením modelů důkazu prací (PoW) a důkazu autority zajišťuje blockchainové řešení Opet Foundation soukromí dat studentů a zároveň motivuje vzdělávací instituce i studenty, když přispívají do platformy. Vzhledem k tomu, že blockchainy získávají na popularitě, je jen otázkou času, než uvidíme vytvoření ještě více unikátních hybridních systémů.