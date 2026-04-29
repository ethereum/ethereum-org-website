---
title: "Co je to důkaz prací (PoW)?"
description: "Srozumitelné vysvětlení mechanismu konsensu důkaz prací (PoW) pro začátečníky, včetně toho, jak těžaři řeší kryptografické hádanky, aby ověřili transakce a zabezpečili síť blockchainu."
lang: cs
youtubeId: "3EUAcxhuoU4"
uploadDate: 2019-02-22
duration: "0:05:31"
educationLevel: beginner
topic:
  - "consensus"
  - "pow"
format: explainer
author: Binance Academy
breadcrumb: "Důkaz prací (PoW)"
---

Vysvětlující video od **Binance Academy**, které pokrývá mechanismus konsensu důkaz prací (PoW), včetně jeho původu, toho, jak těžaři soutěží v řešení kryptografických hádanek, a jak zabezpečuje síť blockchainu.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=3EUAcxhuoU4) zveřejněného Binance Academy. Byl lehce upraven pro lepší čitelnost.*

#### Původ důkazu prací (0:00) {#origins-of-proof-of-work-000}

Koncept důkazu prací (PoW), jehož původ sahá až do roku 1993, byl vyvinut k prevenci útoků typu denial-of-service a dalšího zneužívání služeb, jako je spam v síti, tím, že vyžaduje určitou práci od uživatele služby — což obvykle znamená čas zpracování počítačem.

V roce 2009 představil Bitcoin inovativní způsob využití důkazu prací jako algoritmu konsensu k ověřování transakcí a vysílání nových bloků do blockchainu. Od té doby se rozšířil a stal se široce používaným algoritmem konsensu v mnoha kryptoměnách.

#### Jak funguje důkaz prací (0:33) {#how-proof-of-work-works-033}

Stručně řečeno, těžaři v síti mezi sebou soutěží v řešení složitých výpočetních hádanek. Tyto hádanky je obtížné vyřešit, ale jakmile někdo najde správné řešení, je snadné je ověřit.

Jakmile těžař najde řešení hádanky, může vyslat blok do sítě, kde všichni ostatní těžaři ověří, že je řešení správné.

#### Příklad těžby Bitcoinu (0:56) {#bitcoin-mining-example-056}

Bitcoin je systém založený na blockchainu, který je udržován kolektivní prací decentralizovaných uzlů. Některé z těchto uzlů jsou známé jako těžaři a jsou zodpovědné za přidávání nových bloků do blockchainu.

Aby tak mohli učinit, musí se těžaři pokusit uhodnout pseudonáhodné číslo známé jako nonce. Toto číslo, když je zkombinováno s daty poskytnutými v bloku a projde hashovací funkcí, musí přinést výsledek, který odpovídá daným podmínkám — například hash začínající čtyřmi nulami.

Když je nalezen odpovídající výsledek, ostatní uzly ověří platnost výsledku a uzel těžaře je odměněn odměnou za blok. Proto je nemožné přidat nový blok do hlavního řetězce bez předchozího nalezení platné nonce, což následně generuje řešení pro tento konkrétní blok — nazývané hash bloku.

#### Proč se to nazývá „důkaz prací“ (1:46) {#why-its-called-proof-of-work-146}

Každý ověřený blok obsahuje hash bloku, který představuje práci odvedenou těžařem. Proto se to nazývá důkaz prací.

#### Bezpečnostní výhody (1:54) {#security-benefits-154}

Důkaz prací pomáhá chránit síť před mnoha různými útoky. Úspěšný útok by vyžadoval obrovský výpočetní výkon a spoustu času na provedení výpočtů. Proto by byl neefektivní, protože vynaložené náklady by byly vyšší než potenciální odměny za útok na síť.

#### Omezení (2:10) {#limitations-210}

Jedním z problémů důkazu prací je, že těžba vyžaduje drahý počítačový hardware, který spotřebovává velké množství energie. Ačkoli složité výpočty algoritmů zaručují bezpečnost sítě, tyto výpočty nelze využít k ničemu jinému.

#### Výhled do budoucna (2:25) {#looking-ahead-225}

Ačkoli důkaz prací nemusí být nejefektivnějším řešením, stále je to jedna z nejpopulárnějších metod dosahování konsensu v blockchainech. Již existují alternativní metody a přístupy, které se snaží tyto problémy vyřešit, ale jen čas ukáže, jaká metoda se stane nástupcem důkazu prací.