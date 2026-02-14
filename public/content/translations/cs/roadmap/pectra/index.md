---
title: Prague-Electra (Pectra)
description: "Zjistěte více o vylepšení protokolu Pectra"
lang: cs
---

# Pectra {#pectra}

Vylepšení sítě Pectra následovalo po vylepšení [Dencun](/roadmap/dencun/) a přineslo změny jak na exekuční, tak i na konsensuální vrstvu Etherea. Zkrácený název Pectra je kombinací názvů Prague a Electra, což jsou příslušné názvy pro změny specifikací na exekuční vrstvě a na vrstvě konsenzu. Tyto změny společně přinášejí řadu vylepšení uživatelům, vývojářům a validátorům Etherea.

Toto vylepšení bylo úspěšně aktivováno na hlavní síti Ethereum v epoše `364032`, dne **7. května 2025 v 10:05 (UTC)**.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Vylepšení Pectra je pouze jedním krokem v dlouhodobých vývojových cílech Etherea. Zjistěte více o [plánu rozvoje protokolu](/roadmap/) a [předchozích vylepšeních](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Vylepšení v Pectra {#new-improvements}

Pectra přináší největší počet [návrhů EIP](https://eips.ethereum.org/) ze všech předchozích vylepšení! Obsahuje mnoho menších změn, ale také některé významné nové funkce. Úplný seznam změn a technických podrobností lze nalézt v jednotlivých zahrnutých návrzích EIP.

### Kód účtu EOA {#7702}

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) představuje významný krok směrem k širokému rozšíření [abstrakce účtů](/roadmap/account-abstraction/). Díky této funkci mohou uživatelé nastavit svou adresu ([EOA](/glossary/#eoa)) tak, aby byla rozšířena o chytrý kontrakt. Tento EIP zavádí nový typ transakce se specifickou funkcí – umožnit vlastníkům adres podepsat autorizaci, která nastaví jejich adresu tak, aby napodobovala zvolený chytrý kontrakt.

Díky tomuto EIP se uživatelé mohou přihlásit k programovatelným peněženkám, které umožňují nové funkce, jako je sdružování transakcí, provádění transakcí bez poplatků a vlastní přístup k aktivům pro alternativní schémata obnovy. Tento hybridní přístup kombinuje jednoduchost účtů EOA s programovatelností účtů založených na kontraktech.

Přečtěte si podrobnější informace o 7702 [zde](/roadmap/pectra/7702/)

### Zvýšení maximálního efektivního zůstatku {#7251}

Současný efektivní zůstatek validátora je přesně 32 ETH. Je to minimální nezbytná částka k účasti na konsensu, ale zároveň maximum, které může jeden validátor uzamknout.

[EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) zvyšuje maximální možný efektivní zůstatek na 2048 ETH, což znamená, že jeden validátor může nyní uzamknout od 32 do 2048 ETH. Místo násobků 32 si nyní stakeři mohou zvolit libovolné množství ETH k uzamčení a získávat odměny za každý 1 ETH nad minimem. Například pokud se zůstatek validátora zvýší s jeho odměnami na 33 ETH, je i tento 1 ETH navíc považován za součást efektivního zůstatku a získává odměny.

Výhoda lepšího systému odměn pro validátory je však pouze jednou částí tohoto vylepšení. [Stakeři](/staking/), kteří provozují více validátorů, je nyní mohou agregovat do jednoho, což umožňuje snadnější provoz a snižuje zátěž sítě. Protože každý validátor v Řetězové vazbě odesílá podpis v každé epoše, požadavky na šířku pásma rostou s větším počtem validátorů a velkým počtem podpisů k šíření. Agregace validátorů sníží zátěž sítě a otevře nové možnosti škálování při zachování stejného ekonomického zabezpečení.

Přečtěte si podrobnější informace o maxEB [zde](/roadmap/pectra/maxeb/)

### Zvýšení propustnosti blobů {#7691}

Bloby poskytují [dostupnost dat](/developers/docs/data-availability/#data-availability-and-layer-2-rollups) pro L2. Byly zavedeny v [předchozím vylepšení sítě](/roadmap/dencun/).

V současné době síť cílí na průměrně 3 bloby na blok s maximem 6 blobů. S [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691) se průměrný počet blobů zvýší na 6 s maximem 9 na blok, což povede ke zvýšení kapacity pro Ethereum rollupy. Tento EIP pomáhá překlenout mezeru, než [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) umožní ještě vyšší počty blobů.

### Zvýšení nákladů na calldata {#7623}

Před zavedením [blobů ve vylepšení Dencun](/roadmap/danksharding), používaly L2 k ukládání svých dat na Ethereu [calldata](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata). Bloby i calldata ovlivňují využití šířky pásma Etherea. Zatímco většina bloků používá jen minimální množství calldata, datově náročné bloky, které také obsahují mnoho blobů, mohou být škodlivé pro p2p síť Etherea.

K řešení tohoto problému [EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) zvyšuje cenu za calldata, ale pouze pro datově náročné transakce. Tím se omezuje velikost bloku v nejhorším případě, poskytuje motivaci pro L2, aby používaly pouze bloby, a ponechává více než 99 % transakcí bez dopadu.

### Spustitelné výběry z exekuční vrstvy {#7002}

V současné době je opuštění validátora a [výběr uzamčeného ETH](/staking/withdrawals/) operací na konsensuální vrstvě, která vyžaduje aktivní klíč validátora, stejný BLS klíč, který validátor používá k plnění aktivních povinností, jako jsou atestace. Pověření pro výběr je samostatný studený klíč, který přijímá vybranou uzamčenou částku, ale nemůže výběr spustit. Jediný způsob, jak mohou stakeři provést výběr, je poslat speciální zprávu do sítě Řetězové vazby podepsanou pomocí aktivního klíče validátora. To je omezující ve scénářích, kdy pověření pro výběr a klíč validátora drží různé entity, nebo když dojde ke ztrátě klíče validátora.

[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) zavádí nový kontrakt, který lze použít ke spuštění výběru pomocí pověření pro výběr na exekuční vrstvě. Stakeři budou moci opustit svého validátora zavoláním funkce v tomto speciálním kontraktu bez potřeby svého podpisového klíče validátora nebo vůbec jakéhokoliv přístupu k Řetězové vazbě. Důležité je, že umožnění výběrů validátorů na blockchainu umožňuje stakovací protokoly se sníženými předpoklady důvěry vůči provozovatelům uzlů.

### Vklady validátorů na blockchainu {#6110}

Vklady validátorů jsou v současnosti zpracovávány pomocí [dotazování eth1data](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/), což je funkce na Řetězové vazbě, která načítá data z exekuční vrstvy. Je to takový technický dluh z doby před Sloučením, kdy byla Řetězová vazba samostatnou sítí a musela se zabývat reorganizacemi důkazu prací.

[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) je nový způsob doručování vkladů z exekuční na konsensuální vrstvu, který umožňuje okamžité zpracování s menší složitostí implementace. Je to bezpečnější způsob zpracování vkladů, který je pro sloučené Ethereum nativní. Pomáhá to také zajistit budoucnost protokolu, protože nevyžaduje historické vklady k zavedení uzlu, což je nezbytné pro vypršení historie.

### Předkompilace pro BLS12-381 {#2537}

Předkompilace jsou speciální sadou chytrých kontraktů zabudovaných přímo do Ethereum Virtual Machine ([EVM](/developers/docs/evm/)). Na rozdíl od běžných kontraktů nejsou předkompilace nasazovány uživateli, ale jsou součástí samotné implementace klienta, napsané v jeho nativním jazyce (např. Go, Java atd., nikoliv Solidity). Předkompilace slouží pro široce používané a standardizované funkce, jako jsou kryptografické operace. Vývojáři chytrých kontraktů mohou volat předkompilace jako běžný kontrakt, ale s větší bezpečností a efektivitou.

[EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) přidává nové předkompilace pro operace s křivkami nad [BLS12-381](https://hackmd.io/@benjaminion/bls12-381). Tato eliptická křivka se stala široce používanou v kryptoměnových ekosystémech díky svým praktickým vlastnostem. Konkrétněji, byla přijata konsensuální vrstvou Etherea, kde ji používají validátoři.

Nová předkompilace přidává každému vývojáři možnost snadno, efektivně a bezpečně provádět kryptografické operace s použitím této křivky, například ověřování podpisů. Aplikace na blockchainu, které jsou na této křivce závislé, se mohou stát efektivnějšími z hlediska poplatků a bezpečnějšími tím, že se spoléhají na předkompilaci místo na nějaký vlastní kontrakt. To se týká především aplikací, které chtějí uvažovat o validátorech uvnitř EVM, např. stakovacích poolů, [restakingu](/restaking/), lehkých klientů, přemostění, ale také aplikací s nulovou znalostí.

### Poskytování historických hašů bloků ze stavu {#2935}

EVM v současné době poskytuje operační kód `BLOCKHASH`, který umožňuje vývojářům kontraktů získat haš bloku přímo v exekuční vrstvě. To je však omezeno pouze na posledních 256 bloků a v budoucnu by se to mohlo stát problematickým pro bezstavové klienty.

[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) vytváří nový systémový kontrakt, který může poskytovat posledních 8192 hašů bloků jako úložné sloty. To pomáhá zajistit budoucnost protokolu pro bezstavové provádění a stává se efektivnějším po přijetí stromů Verkle. Kromě toho však mohou rollupy z toho okamžitě těžit, protože se mohou dotazovat na kontrakt přímo s delším historickým oknem.

### Přesunutí indexu výboru mimo atestaci {#7549}

Konsensus Řetězové vazby je založen na tom, že validátoři odevzdávají své hlasy pro nejnovější blok a finalizovanou epochu. Atestace obsahuje 3 prvky, z nichž 2 jsou hlasy a třetí je hodnota indexu výboru.

[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) přesouvá tento index mimo podepsanou zprávu atestace, což usnadňuje ověřování a agregaci hlasů konsensu. To umožní větší efektivitu v každém konsensuálním klientovi a může přinést významná vylepšení výkonu pro obvody s nulovou znalostí pro dokazování konsensu Etherea.

### Přidání plánu blobů do konfiguračních souborů EL {#7840}

[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) je jednoduchá změna, která přidává nové pole do konfigurace klienta exekuční vrstvy. Konfiguruje počet bloků a umožňuje dynamické nastavení cílového a maximálního počtu blobů na blok, stejně jako úpravu poplatku za blob. S přímo definovanou konfigurací se klienti mohou vyhnout složitosti výměny těchto informací prostřednictvím Engine API.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Chcete-li se dozvědět více o tom, jak se vás Pectra konkrétně dotýká jako uživatele, vývojáře nebo validátora Etherea, podívejte se do <a href="https://epf.wiki/#/wiki/pectra-faq">Pectra FAQ</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Ovlivňuje toto vylepšení všechny uzly a validátory Etherea? {#client-impact}

Ano, vylepšení Pectra vyžaduje aktualizace jak [exekučních, tak konsensuálních klientů](/developers/docs/nodes-and-clients/). Všichni hlavní klienti Etherea vydají verze podporující hard fork, označené jako vysoká priorita. Aby operátoři uzlů po vylepšení udrželi synchronizaci se sítí Ethereum, musí si ověřit, že používají podporovanou verzi klienta. Nezapomínejte, že informace o vydání upgradů klientů jsou časově citlivé, a uživatelé by měli sledovat nejnovější aktualizace pro nejaktuálnější podrobnosti.

## Jak mohu posílat ETH po hard forku? {#scam-alert}

- **S vašimi ETH není třeba nic dělat**: Po vylepšení Ethereum Pectra není potřeba vaše ETH převádět ani vylepšovat. Zůstatky na vašem účtu se nezmění a ETH, které aktuálně držíte, zůstanou po hard forku přístupné ve své stávající podobě.
- **Pozor na podvody!** <Emoji text="⚠️" /> **Každý, kdo vás vyzývá k „upgradu“ vašich ETH, se vás snaží podvést.** V souvislosti s tímto vylepšením nemusíte podnikat žádné kroky. Vaše aktiva zůstanou nedotčena. Pamatujte, že informovanost je nejlepší obranou proti podvodům.

[Více o rozpoznávání a vyhýbání se podvodům](/security/)

## Učíte se spíše vizuálně? Vizuální výuka {#visual-learner}

<YouTube id="ufIDBCgdGwY" />

_Co je součástí vylepšení Pectra?_ - Christine Kim_

<YouTube id="_UpAFpC7X6Y" />

_Vylepšení Ethereum Pectra: Co potřebují stakeři vědět — Blockdaemon_

## Další čtení {#further-reading}

- [Plán rozvoje Etherea](/roadmap/)
- [Často kladené otázky o Pectra](https://epf.wiki/#/wiki/pectra-faq)
- [Informační stránka Pectra.wtf](https://pectra.wtf)
- [Jak Pectra vylepšuje zkušenost stakerů](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Informační stránka o EIP7702](https://eip7702.io/)
- [Vývojářské sítě Pectra](https://github.com/ethereum/pm/blob/master/Pectra/pectra-pm.md)
