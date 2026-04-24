---
title: Pověření k výběru
description: Vysvětlení typů pověření k výběru validátoru (0x00, 0x01, 0x02) a jejich důsledků pro stakery na Ethereu.
lang: cs
---

Každý validátor má **pověření k výběru**, které určuje, jak a kam lze vybrat jeho stakovaný ETH a odměny. Typ pověření je indikován prvním bajtem: `0x00`, `0x01` nebo `0x02`. Porozumění těmto typům je důležité pro validátory spravující svůj stake.

## 0x00: Pověření před upgradem Shapella {#0x00-credentials}

Typ `0x00` je původní formát pověření k výběru z doby před upgradem Shapella (duben 2023). Validátoři s tímto typem pověření nemají nastavenou adresu pro výběr na exekuční vrstvě, což znamená, že jejich prostředky zůstávají uzamčeny na vrstvě konsensu. Pokud stále máte pověření `0x00`, musíte provést upgrade na `0x01` nebo `0x02`, než budete moci přijímat jakékoli výběry.

## 0x01: Starší pověření k výběru (Legacy) {#0x01-credentials}

Typ `0x01` byl představen s upgradem Shapella a stal se standardem pro validátory, kteří si chtěli nastavit adresu pro výběr na exekuční vrstvě. S pověřeními `0x01`:

- Jakýkoli zůstatek nad 32 ETH je **automaticky převeden** na vaši adresu pro výběr
- Úplné výstupy procházejí standardní frontou pro výstup
- Odměny nad 32 ETH se nemohou úročit (compounding) – jsou pravidelně převáděny pryč

**Proč někteří validátoři stále používají 0x01:** Je to jednodušší a známé. Mnoho validátorů vložilo prostředky po upgradu Shapella a již tento typ má, a funguje dobře pro ty, kteří chtějí automatické výběry přebytečného zůstatku.

**Proč se to nedoporučuje:** S `0x01` ztrácíte možnost úročit odměny nad 32 ETH. Každý kousek přebytku je automaticky převeden pryč, což omezuje potenciál výdělku vašeho validátoru a vyžaduje oddělenou správu vybraných prostředků.

## 0x02: Úročící se pověření k výběru {#0x02-credentials}

Typ `0x02` byl představen s upgradem Pectra a dnes je **doporučenou volbou** pro validátory. Validátoři s pověřeními `0x02` se někdy nazývají „úročící se validátoři“ (compounding validators).

S pověřeními `0x02`:

- Odměny nad 32 ETH se **úročí** v krocích po 1 ETH až do maximálního efektivního zůstatku 2048 ETH
- Částečné výběry musí být vyžádány manuálně (automatické převody probíhají pouze nad hranicí 2048 ETH)
- Validátoři mohou konsolidovat více 32 ETH validátorů do jednoho validátoru s vyšším zůstatkem
- Úplné výstupy jsou stále podporovány prostřednictvím standardní fronty pro výstup

Jak částečné výběry, tak konsolidace lze provádět prostřednictvím [Launchpad Validator Actions](https://launchpad.ethereum.org/en/validator-actions).

**Proč by měli validátoři preferovat 0x02:** Nabízí lepší kapitálovou efektivitu díky úročení, větší kontrolu nad tím, kdy k výběrům dochází, a podporuje konsolidaci validátorů. Pro sólo stakery, kteří v průběhu času hromadí odměny, to znamená, že jejich efektivní zůstatek – a tím i jejich odměny – může růst nad 32 ETH bez manuálního zásahu.

**Důležité:** Jakmile převedete z `0x01` na `0x02`, nemůžete to zvrátit.

Podrobného průvodce převodem na pověření typu 2 a funkcí MaxEB najdete na [stránce s vysvětlením MaxEB](/roadmap/pectra/maxeb/).

## Co si mám vybrat? {#what-should-i-pick}

- **Noví validátoři:** Zvolte `0x02`. Je to moderní standard s lepším úročením a flexibilitou.
- **Stávající validátoři s 0x01:** Zvažte převod na `0x02`, pokud chcete, aby se odměny úročily nad 32 ETH, nebo plánujete konsolidovat validátory.
- **Stávající validátoři s 0x00:** Okamžitě proveďte upgrade – bez aktualizace pověření nemůžete vybírat. Nejprve musíte převést na `0x01`, poté můžete převést na `0x02`.

## Nástroje pro správu pověření k výběru {#withdrawal-credential-tools}

Výběr nebo převod mezi typy pověření podporuje několik nástrojů:

- **[Ethereum Staking Launchpad](https://launchpad.ethereum.org/en/validator-actions)** - Oficiální nástroj pro vklady a správu validátorů, včetně převodů pověření a konsolidací
- **[Pectra Staking Manager](https://pectrastaking.com)** - Webové uživatelské rozhraní s podporou připojení peněženky pro převody a konsolidaci
- **[Pectra Validator Ops CLI Tool](https://github.com/Luganodes/Pectra-Batch-Contract)** - Nástroj příkazového řádku pro dávkové převody
- **[Ethereal](https://github.com/wealdtech/ethereal)** - Nástroj příkazového řádku pro operace na Ethereu včetně správy validátorů

Úplný seznam konsolidačních nástrojů a podrobné pokyny k převodu najdete v části [Nástroje pro konsolidaci MaxEB](/roadmap/pectra/maxeb/#consolidation-tooling).

## Další čtení {#further-reading}

- [Klíče v Ethereu s důkazem podílem (PoS)](/developers/docs/consensus-mechanisms/pos/keys/) - Přečtěte si o klíčích validátoru a o tom, jak souvisejí s pověřeními k výběru
- [MaxEB](/roadmap/pectra/maxeb/) - Podrobný průvodce upgradem Pectra a funkcí maximálního efektivního zůstatku