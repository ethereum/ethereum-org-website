---
title: "Skládatelnost chytrých kontraktů"
description: "Zjistěte, jak lze chytré kontrakty kombinovat jako kostky Lega a vytvářet tak složité decentralizované aplikace (dapp) opětovným použitím stávajících komponent."
lang: cs
incomplete: true
---

## Krátký úvod {#a-brief-introduction}

Chytré kontrakty jsou na Ethereu veřejné a lze je považovat za otevřená API. Abyste se stali vývojářem decentralizovaných aplikací (dapp), nemusíte psát vlastní chytrý kontrakt, stačí vědět, jak s nimi interagovat. Můžete například použít stávající chytré kontrakty [Uniswapu](https://uniswap.exchange/swap), decentralizované burzy, ke zpracování veškeré logiky swapu tokenů ve vaší aplikaci – nemusíte začínat od nuly. Podívejte se na některé z jejich kontraktů [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) a [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts).

## Co je to skládatelnost? {#what-is-composability}

Skládatelnost je kombinování odlišných komponent za účelem vytvoření nových systémů nebo výstupů. Při vývoji softwaru skládatelnost znamená, že vývojáři mohou znovu použít stávající softwarové komponenty k vytváření nových aplikací. Dobrým způsobem, jak porozumět skládatelnosti, je představit si komponovatelné prvky jako kostky Lega. Každou kostku Lega lze kombinovat s jinou, což vám umožňuje stavět složité struktury kombinováním různých kostek.

V Ethereu je každý chytrý kontrakt svým způsobem kostkou Lega – chytré kontrakty z jiných projektů můžete použít jako stavební bloky pro svůj projekt. To znamená, že nemusíte trávit čas tím, že budete znovu objevovat kolo nebo stavět od nuly.

## Jak skládatelnost funguje? {#how-does-composability-work}

Chytré kontrakty na Ethereu jsou jako veřejná API, takže kdokoli může s kontraktem interagovat nebo jej integrovat do dapp pro přidání dalších funkcí. Skládatelnost chytrých kontraktů obecně funguje na třech principech: modularitě, autonomii a objevitelnosti:

**1. Modularita**: Jedná se o schopnost jednotlivých komponent plnit specifický úkol. V Ethereu má každý chytrý kontrakt specifický případ užití (jak je ukázáno na příkladu Uniswapu).

**2. Autonomie**: Komponovatelné komponenty musí být schopny fungovat nezávisle. Každý chytrý kontrakt v Ethereu je samočinně spustitelný a může fungovat, aniž by se spoléhal na jiné části systému.

**3. Objevitelnost**: Vývojáři nemohou volat externí kontrakty nebo integrovat softwarové knihovny do aplikací, pokud nejsou veřejně dostupné. Chytré kontrakty jsou ze své podstaty open-source; kdokoli může zavolat chytrý kontrakt nebo provést fork kódové základny.

## Výhody skládatelnosti {#benefits-of-composability}

### Kratší vývojový cyklus {#shorter-development-cycle}

Skládatelnost snižuje množství práce, kterou musí vývojáři odvést při vytváření [dapp](/apps/#what-are-dapps). [Jak říká Naval Ravikant:](https://twitter.com/naval/status/1444366754650656770) „Open source znamená, že každý problém se musí vyřešit jen jednou.“

Pokud existuje chytrý kontrakt, který řeší jeden problém, ostatní vývojáři jej mohou znovu použít, takže nemusí řešit stejný problém. Tímto způsobem mohou vývojáři vzít stávající softwarové knihovny a přidat další funkce k vytvoření nových dapp.

### Větší inovace {#greater-innovation}

Skládatelnost podporuje inovace a experimentování, protože vývojáři mohou volně znovu používat, upravovat, duplikovat nebo integrovat open-source kód k dosažení požadovaných výsledků. Vývojové týmy tak tráví méně času základními funkcemi a mohou věnovat více času experimentování s novými funkcemi.

### Lepší uživatelská zkušenost {#better-user-experience}

Interoperabilita mezi komponentami ekosystému Etherea zlepšuje uživatelskou zkušenost. Uživatelé mají přístup k větším funkcím, když dapp integrují externí chytré kontrakty, než v roztříštěném ekosystému, kde aplikace nemohou komunikovat.

K ilustraci výhod interoperability použijeme příklad z arbitrážního obchodování:

Pokud se token obchoduje dráž na `exchange A` než na `exchange B`, můžete využít cenového rozdílu k dosažení zisku. To však můžete udělat pouze tehdy, pokud máte dostatek kapitálu na financování transakce (tj. nákup tokenu na `exchange B` a jeho prodej na `exchange A`).

Ve scénáři, kdy nemáte dostatek prostředků na pokrytí obchodu, může být ideální blesková půjčka. [Bleskové půjčky](/defi/#flash-loans) jsou vysoce technické, ale základní myšlenkou je, že si můžete půjčit aktiva (bez zajištění) a vrátit je v rámci _jedné_ transakce.

Vrátíme-li se k našemu původnímu příkladu, arbitrážní obchodník si může vzít velkou bleskovou půjčku, koupit tokeny na `exchange B`, prodat je na `exchange A`, splatit kapitál + úroky a ponechat si zisk, a to vše v rámci stejné transakce. Tato složitá logika vyžaduje kombinování volání více kontraktů, což by nebylo možné, kdyby chytrým kontraktům chyběla interoperabilita.

## Příklady skládatelnosti v Ethereu {#composability-in-ethereum}

### Swapy tokenů {#token-swaps}

Pokud vytvoříte dapp, která vyžaduje, aby byly transakce placeny v ETH, můžete uživatelům umožnit platit v jiných ERC-20 tokenech integrací logiky swapu tokenů. Kód automaticky převede uživatelův token na ETH předtím, než kontrakt provede volanou funkci.

### Správa {#governance}

Budování systémů správy na míru pro [DAO](/dao/) může být drahé a časově náročné. Místo toho byste mohli použít open-source sadu nástrojů pro správu, jako je [Aragon Client](https://client.aragon.org/), k nastartování vaší DAO a rychlému vytvoření rámce pro správu.

### Správa identit {#identity-management}

Místo budování vlastního autentizačního systému nebo spoléhání se na centralizované poskytovatele můžete integrovat nástroje pro decentralizovanou identitu (DID) ke správě autentizace uživatelů. Příkladem je [SpruceID](https://www.spruceid.com/), open-source sada nástrojů, která nabízí funkci „Přihlásit se pomocí Etherea“ (Sign in with Ethereum), jež uživatelům umožňuje autentizovat identity pomocí ethereové peněženky.

## Související návody {#related-tutorials}

- [Nastartujte vývoj frontendu vaší dapp pomocí create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Přehled toho, jak používat create-eth-app k vytváření aplikací s populárními chytrými kontrakty v základu._

## Další čtení {#further-reading}

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

- [Skládatelnost je inovace](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [Proč na skládatelnosti ve Web3 záleží](https://hackernoon.com/why-composability-matters-for-web3)
- [Co je to skládatelnost?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)