---
title: "Budování na Ethereu v roce 2026: co se změnilo"
description: "Tři upgrady protokolu od roku 2023 změnily dvě věci, na kterých tvůrcům záleží: kolik stojí používání vrstvy 1 (l1) a co dokážou běžné peněženky. Praktický průvodce budováním na Ethereu v roce 2026."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "poplatky za gas"
  - "abstrakce účtu"
  - "upgrady protokolu"
published: 2026-05-07
image: /images/developers/blog/latest-post-header-3.png
breadcrumb: "Budování na Ethereu v roce 2026"
lang: cs
---

Pokud se váš mentální model Etherea utvářel v letech 2021 až 2023, je již zastaralý. Tři upgrady protokolu od té doby – [Dencun](/roadmap/dencun/) v březnu 2024, [Pectra](/roadmap/pectra/) v květnu 2025 a [Fusaka](/roadmap/fusaka/) v prosinci 2025 – změnily dvě věci, na kterých tvůrcům záleží: kolik stojí používání vrstvy 1 (l1) a co dokážou běžné peněženky.

## Mainnet je opět levný {#mainnet-is-cheap-again}

Režim poplatků z let 2021 až 2023 už není bezpečným výchozím předpokladem.

K 5. květnu 2026 ukazuje sledovač gasu na Etherscanu standardní gas kolem 0,15 Gwei, přičemž denní průměry se v průběhu dubna pohybovaly blízko 0,5 Gwei. Základní převod ETH stojí na této úrovni méně než cent, přičemž v typických nedávných dnech se pohyboval v řádu nízkých jednotek centů. Trend klesá s každým z nedávných upgradů a ten další, [Glamsterdam](/roadmap/glamsterdam/), má poplatky stlačit ještě níže. Tvrzení, že „Ethereum Mainnet je pro většinu aplikací příliš drahý“, je tak již zastaralým východiskem.

Pokud chcete jednoduché pravidlo, použijte matematiku gasu místo starých povídaček. Při 0,5 Gwei, což je nedávný dubnový průměr, a ceně ETH zhruba 2 350 USD vypadají ilustrativní náklady takto.

| Operace | Spotřebovaný gas | Ilustrativní cena |
| :-------------- | :---------- | :---------------- |
| Převod ETH | 21,000 | **$0.025** |
| Převod ERC-20 | \~65,000 | **$0.076** |
| Schválení ERC-20 | \~46,000 | **$0.054** |
| Swap | \~180,000 | **$0.21** |
| Nasazení ERC-20 | \~1,200,000 | **$1.41** |

Toto jsou příklady, nikoli záruky. Náklady se mění s cenou ETH, cenou gasu a složitostí kontraktu. Hodnoty Gwei mohou během běžného měsíce značně kolísat, zatímco cena v dolarech se téměř nemění, protože rollupy nyní zpracovávají asi 95 procent transakcí Etherea a vrstva 1 (l1) obvykle běží hluboko pod svým cílovým limitem bloku. Poplatky na Mainnetu jsou nyní natolik nízké, že mnoho aplikací může smysluplně běžet na Mainnetu.

### Proč náklady klesly {#why-costs-fell}

Většinu práce odvedly tři upgrady.

Dencun (březen 2024) představil EIP-4844 a poskytl rollupům jejich vlastní datový pruh prostřednictvím blobů s odděleným trhem poplatků. Rollupy přestaly soutěžit s běžným provozem provádění o stejný prostor v bloku.

Pectra byla aktivována 7. května 2025. EIP-7691 zvýšil propustnost blobů z cílových 3 / maximálně 6 blobů na blok na cílových 6 / maximálně 9, což rozšířilo levný datový pruh, který rollupy používají, a stlačilo poplatky na vrstvě 2 (l2) níže.

Fusaka byla aktivována 3. prosince 2025. Její hlavní změnou kapacity byl PeerDAS, který umožňuje validátorům vzorkovat data blobů místo stahování každého blobu v plném rozsahu, a právě toto vzorkování činí vyšší počty blobů bezpečnými na síťové vrstvě. Paralelně s tím komunita během roku 2025 zvýšila limit gasu na vrstvě 1 (l1) z 30M na 60M a EIP-7935 ve Fusace standardizoval 60M jako novou výchozí hodnotu. EIP-7825 omezuje jakoukoli jednotlivou transakci na \~16,78M gasu, čehož si většina aplikací nikdy nevšimne, ale velmi rozsáhlá nasazení a monolitické multicalls se nyní musí vejít do tohoto limitu. EIP-7951 také přidal nativní ověřování secp256r1 (P-256) na Mainnetu, díky čemuž je ověřování podpisů přístupových klíčů a WebAuthn v tocích účtů mnohem levnější.

Čistým efektem je, že Mainnet už není cenově nastaven jako trvale přetížený řetězec.

## Jak EIP-7702 mění model účtu {#how-eip-7702-changes-the-account-model}

Pectra také přinesla EIP-7702, který dává běžným peněženkám přístup k chování chytrých účtů, jako je dávkování, sponzorování gasu, klíče relace, procesy obnovy a uživatelské prostředí přátelské k přístupovým klíčům, aniž by nutil uživatele migrovat na nový účet.

Funguje to tak, že přidává nový typ transakce (typ `0x04`, `SetCode`), který umožňuje EOA nastavit ukazatel na již nasazený kód kontraktu. Uživatel si ponechá stejnou adresu, původní klíč EOA si zachová konečnou kontrolu nad účtem a delegace může být později změněna nebo resetována na nulovou adresu.

Pro tvůrce aplikací spočívá praktická změna v tom, že od peněženky požadují výsledek, nikoli nízkoúrovňové nastavení EIP-7702. Pokud uživatel potřebuje schválit a provést swap v jednom kroku, vyžádejte si dávku prostřednictvím ERC-5792 `wallet_sendCalls`. Peněženka se může rozhodnout, zda použije EIP-7702, ERC-4337 nebo jiný systém účtů.

Delegovaný kód představuje bezpečnostní hranici. Pokud peněženka nasměruje EOA na chybný nebo škodlivý kód, může tento kód provádět volání jménem uživatele, včetně schvalování tokenů, převodů a interakcí s aplikacemi. Tvůrci by měli k cílům delegace přistupovat jako k infrastruktuře peněženky, spoléhat se na implementace prověřené peněženkou a nežádat uživatele, aby lehkovážně delegovali na kód ovládaný aplikací.

## Co to mění na způsobu budování {#what-this-changes-about-how-to-build}

Výchozí otázka tvůrců dříve zněla: „Která vrstva 2 (l2) je dostatečně levná?“ Tato otázka má stále své odpovědi, ale už není jediná. Vzhledem k tomu, že poplatky na vrstvě 1 (l1) se při běžném zatížení pohybují v řádu centů za transakci a EIP-7702 umožňuje jakékoli peněžence nabídnout uživatelské prostředí chytrého účtu bez migrace adres, je užitečnějším výchozím bodem otázka, zda by aplikace měla běžet na Mainnetu, nebo zda konkrétní vrstva 2 (l2) poskytuje skutečnou výhodu v distribuci, likviditě nebo uživatelském prostředí, kterou vrstva 1 (l1) nabídnout nemůže.

Mění se i předpoklady ohledně účtů. Nenavrhujte nové aplikace tak, jako by každý uživatelský účet byl obyčejný ECDSA EOA, který musí držet ETH, než bude moci udělat cokoli užitečného. Upřednostňujte rozhraní pro dávkování na úrovni peněženky, jako je ERC-5792 `wallet_sendCalls`, předpokládejte, že sponzorování gasu a klíče relace se stanou běžnými funkcemi peněženek, a přistupujte k přístupovým klíčům a procesům obnovy jako k součásti uživatelského prostředí účtu, nikoli jako k odděleným trikům pro onboarding.

## Co bude dál {#whats-next}

Dalším pojmenovaným upgradem Etherea je Glamsterdam, jehož hlavními body jsou seznamy přístupů na úrovni bloku (BALs) a zakotvené oddělení navrhovatele a tvůrce (ePBS). Společně umožňují bezpečně zvýšit limit gasu v bloku z dnešních 60 milionů na zhruba 200 milionů, což tvůrcům ponechá větší kapacitu na vrstvě 1 (l1). Aktivace se očekává ve druhé polovině roku 2026. Po Glamsterdamu má následovat [Hegotá](https://forkcast.org/upgrade/hegota/), jejíž hlavní funkcí byly zvoleny seznamy zahrnutí vynucené volbou forku (FOCIL).

Pro tvůrce jsou položkami, které stojí za to sledovat, větší kapacita vrstvy 1 (l1) (BALs), spolehlivější zahrnutí transakcí (FOCIL) a cesta k nativní abstrakci účtu. ePBS, další hlavní bod Glamsterdamu, je převážně infrastrukturní změna, která odstraňuje závislost na důvěře při zahrnování transakcí na vrstvě 1 (l1). Přímá změna na úrovni aplikací je malá.

Cílem BALs je udržet vrstvu 1 (l1) levnou i při rostoucím používání. Jednoduše řečeno, blok by obsahoval mapu účtů a úložišť, kterých se dotýká. Klienti mohou tuto mapu použít k předběžnému načtení dat a paralelnímu provádění nezávislých transakcí, což činí zvýšení limitu gasu na vrstvě 1 (l1) bezpečnějším, aniž by se bloky staly příliš pomalými na ověření. Praktickým důsledkem pro tvůrce je, že se na Mainnet může vrátit více aktivity, aniž by se automaticky obnovil režim gasu z let 2021 až 2023.

FOCIL se týká dostávání platných transakcí do bloků i v případě, že by je jeden producent bloku raději vynechal. Dnes, pokud strana budující blok ignoruje transakci, má zbytek protokolu omezené možnosti, jak její zahrnutí vynutit. S EIP-7805 by několik validátorů v podstatě řeklo: „Viděli jsme tyto platné transakce čekat ve veřejném mempoolu.“ Další blok je pak musí zahrnout, jinak mohou validátoři odmítnout tento blok podpořit. Pro tvůrce je to důležité, když je spolehlivý přístup k vrstvě 1 (l1) součástí produktu, včetně nástrojů pro soukromí, regulovaných vstupních bran (onramps) nebo aplikací sloužících uživatelům, kteří mohou být filtrováni některými poskytovateli infrastruktury.

Pro tvůrce aplikací je v rámci Hegotá nejdůležitější sledovat abstrakci účtu. EIP-8141, Frame Transactions (Rámcové transakce), by přidal typ transakce, kde jsou validace, provádění a platba za gas rozděleny do rámců. V praxi to znamená, že chytrý účet by mohl sám ověřit transakci, definovat svá vlastní pravidla pro podpis, schválit, kdo platí gas, a provést jednu nebo více akcí bez závislosti na EntryPointu ERC-4337, bundlerech nebo relayerech provozovaných aplikací.

To mění předpoklady o produktech. Sponzorování gasu se stává nativním vzorem účtu namísto infrastruktury, kterou si každá aplikace musí zařizovat zvlášť. Alternativní schémata podpisů se snáze podporují, včetně dnešních přístupových klíčů a cesty od ECDSA, pokud bude nutná postkvantová migrace. Pokud bude EIP-8141 nebo podobný návrh nativní abstrakce účtu přijat, model tvůrce se přesune od „EOA podepisuje transakci“ k „účet definuje, jak validuje, platí a provádí transakci“.

To je směr, nikoli slib. EIP-8141 je ve fázi návrhu (Draft) a od května 2026 se pouze „zvažuje jeho zahrnutí“ do Hegotá, což znamená, že klientské týmy o něm diskutují, ale nezavázaly se k jeho dodání v tomto upgradu. Praktickou cestou pro budování uživatelského prostředí účtů v roce 2026 jsou stále toky peněženek EIP-7702 plus ERC-4337, ale tvůrci by měli navrhovat tak, jako by se programovatelné účty stávaly výchozím modelem účtu.

## Co nyní budovat jinak {#what-to-build-differently-now}

Začněte přehodnocením starých předpokladů o poplatcích. Pokud váš plán nasazení stále ve výchozím stavu považuje Ethereum Mainnet za prostředí s 10 až 30 Gwei, pravděpodobně směruje příliš mnoho práce pryč z vrstvy 1 (l1). Mainnet stojí za zvážení jako první, když vaše aplikace závisí na sdílené likviditě, skládatelnosti s existujícími protokoly, neutralitě nebo stavu s vysokou hodnotou, který by měl existovat tam, kde jsou bezpečnost a sociální konsensus Etherea nejsilnější.

Používejte vrstvy 2 (l2) z důvodů, na kterých stále záleží, včetně distribuce, velmi vysokého objemu transakcí, ekosystémů specifických pro aplikace nebo nákladů na akci, které musí být co nejblíže nule. Pointou není „Mainnet pro všechno“. Pointou je, že „Mainnet je příliš drahý“ by už nemělo být prvním filtrem.

Co se týče účtů, budujte s ohledem na schopnosti peněženek namísto surových EOA. Váš frontend by měl být připraven na to, že dávková volání, sponzorovaný gas, klíče relace, přístupové klíče a procesy obnovy budou přicházet prostřednictvím peněženek. EIP-7702 a ERC-4337 jsou dnes praktickými nástroji. Nativní abstrakce účtu je směr, který je třeba sledovat dále.

Přestaňte považovat Ethereum Mainnet za drahou vrstvu pro vypořádání, které se dotknete až na konci, a přestaňte považovat uživatelské účty za statické klíče ECDSA, které musí držet ETH, než mohou cokoli udělat. Ethereum v roce 2026 směřuje k levnějšímu provádění na vrstvě 1 (l1) a programovatelným účtům. Budujte pro tento svět.

## Další čtení {#further-reading}

- [Oznámení o Mainnetu Pectra](https://blog.ethereum.org/en/2025/04/23/pectra-mainnet)
- [Oznámení o Mainnetu Fusaka](https://blog.ethereum.org/2025/11/06/fusaka-mainnet-announcement)
- [Aktualizace priorit protokolu pro rok 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Kontrolní bod #9 (duben 2026)](https://blog.ethereum.org/2026/04/10/checkpoint-9)
- [Pokyny pro Pectra 7702 na ethereum.org](https://ethereum.org/en/roadmap/pectra/7702/)
- [EIP-7702 Nastavení kódu pro EOA](https://eips.ethereum.org/EIPS/eip-7702)
- [EIP-7928 Seznamy přístupů na úrovni bloku](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-7805 Seznamy zahrnutí vynucené volbou forku (FOCIL)](https://eips.ethereum.org/EIPS/eip-7805)
- [EIP-8141 Rámcová transakce](https://eips.ethereum.org/EIPS/eip-8141)
- [Forkcast Upgrade Hegotá](https://forkcast.org/upgrade/hegota/)
- [Sledovač gasu Etherscan](https://etherscan.io/gastracker)
- [EIP-7773 Meta hard forku Glamsterdam](https://eips.ethereum.org/EIPS/eip-7773)
- [Plán Glamsterdamu na ethereum.org](https://ethereum.org/roadmap/glamsterdam/)