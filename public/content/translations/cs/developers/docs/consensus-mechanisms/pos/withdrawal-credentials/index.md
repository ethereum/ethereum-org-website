---
title: "Pověření k výběru"
description: "Vysvětlení typů pověření validátora k výběru (0x00, 0x01, 0x02) a jejich dopady na stakery Etherea."
lang: cs
---

Každý validátor má **pověření k výběru**, které určuje, jak a kam lze vybrat jeho stakované ETH a odměny. Typ pověření je určen prvním bajtem: `0x00`, `0x01` nebo `0x02`. Porozumění těmto typům je důležité pro validátory, kteří spravují svůj vklad.

## 0x00: Pověření před upgradem Shapella {#0x00-credentials}

Typ `0x00` je původní formát pověření k výběru z doby před upgradem Shapella (duben 2023). Validátoři s tímto typem pověření nemají nastavenou adresu pro výběr na exekuční vrstvě, což znamená, že jejich prostředky zůstávají uzamčeny na vrstvě konsenzu. Pokud stále máte pověření `0x00`, musíte provést upgrade na `0x01` nebo `0x02`, abyste mohli provádět jakékoli výběry.

## 0x01: Zastaralá pověření k výběru {#0x01-credentials}

Typ `0x01` byl zaveden s upgradem Shapella a stal se standardem pro validátory, kteří si chtěli nastavit adresu pro výběr na exekuční vrstvě. S pověřením `0x01`:

- Jakýkoli zůstatek nad 32 ETH je **automaticky převeden** na vaši adresu pro výběr
- Úplné exity procházejí standardní frontou pro exity
- Odměny nad 32 ETH se nemohou úročit – jsou pravidelně převáděny pryč

**Proč někteří validátoři stále používají 0x01:** Je to jednodušší a znají to. Mnoho validátorů provedlo vklad po upgradu Shapella a tento typ již mají a funguje dobře pro ty, kteří chtějí automatické výběry přebytečného zůstatku.

**Proč se nedoporučuje:** S typem `0x01` ztrácíte možnost úročit odměny nad 32 ETH. Každý přebytek je automaticky převeden pryč, což omezuje výdělkový potenciál vašeho validátora a vyžaduje samostatnou správu vybraných prostředků.

## 0x02: Pověření k výběru s úročením {#0x02-credentials}

Typ `0x02` byl zaveden s upgradem Pectra a dnes je pro validátory **doporučenou volbou**. Validátoři s pověřením `0x02` se někdy nazývají "úročící validátoři".

S pověřením `0x02`:

- Odměny nad 32 ETH se **úročí** v přírůstcích po 1 ETH až do maximálního efektivního zůstatku 2048 ETH
- O částečné výběry je nutné požádat ručně (automatické převody se provádějí pouze nad hranicí 2048 ETH)
- Validátoři mohou sloučit více validátorů s vkladem 32 ETH do jednoho validátora s vyšším zůstatkem
- Úplné exity jsou stále podporovány prostřednictvím standardní fronty pro exity

Jak částečné výběry, tak slučování lze provést prostřednictvím [akcí pro validátory na Launchpadu](https://launchpad.ethereum.org/en/validator-actions).

**Proč by měli validátoři preferovat 0x02:** Nabízí lepší kapitálovou efektivitu díky úročení, větší kontrolu nad tím, kdy dochází k výběrům, a podporuje slučování validátorů. Pro sólo stakery, kteří v průběhu času shromažďují odměny, to znamená, že jejich efektivní zůstatek – a tedy i jejich odměny – mohou růst nad 32 ETH bez ručního zásahu.

**Důležité:** Jakmile provedete převod z `0x01` na `0x02`, nemůžete se vrátit zpět.

Podrobného průvodce převodem na pověření typu 2 a funkcí MaxEB najdete na [stránce s vysvětlením MaxEB](/roadmap/pectra/maxeb/).

## Co si mám vybrat? {#what-should-i-pick}

- **Noví validátoři:** Zvolte `0x02`. Je to moderní standard s lepším úročením a flexibilitou.
- **Stávající validátoři s pověřením 0x01:** Zvažte převod na `0x02`, pokud chcete, aby se odměny úročily nad 32 ETH, nebo plánujete sloučit validátory.
- **Stávající validátoři s pověřením 0x00:** Okamžitě proveďte upgrade – bez aktualizace pověření nemůžete provádět výběry. Nejprve musíte provést převod na `0x01`, poté můžete provést převod na `0x02`.

## Nástroje pro správu pověření k výběru {#withdrawal-credential-tools}

Několik nástrojů podporuje výběr nebo převod mezi typy pověření:

- **[Ethereum Staking Launchpad](https://launchpad.ethereum.org/en/validator-actions)** – oficiální nástroj pro vklady a správu validátorů, včetně převodů pověření a slučování
- **[Pectra Staking Manager](https://pectrastaking.com)** – webové rozhraní s podporou wallet-connect pro převody a slučování
- **[Pectra Validator Ops CLI Tool](https://github.com/Luganodes/Pectra-Batch-Contract)** – nástroj příkazového řádku pro hromadné převody
- **[Ethereal](https://github.com/wealdtech/ethereal)** – nástroj CLI pro operace v síti Ethereum včetně správy validátorů

Úplný seznam nástrojů pro slučování a podrobné pokyny k převodu najdete v části [Nástroje pro slučování MaxEB](/roadmap/pectra/maxeb/#consolidation-tooling).

## Další čtení {#further-reading}

- [Klíče v síti Ethereum s proof-of-stake](/developers/docs/consensus-mechanisms/pos/keys/) – zjistěte více o klíčích validátorů a o tom, jak souvisí s pověřeními k výběru
- [MaxEB](/roadmap/pectra/maxeb/) – podrobný průvodce upgradem Pectra a funkcí maximálního efektivního zůstatku
