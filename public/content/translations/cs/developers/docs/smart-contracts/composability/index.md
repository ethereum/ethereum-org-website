---
title: "Složitelnost chytrých kontraktů"
description: "Zjistěte, jak lze chytré kontrakty kombinovat jako kostky Lega a vytvářet tak komplexní dapps s využitím existujících komponent."
lang: cs
incomplete: true
---

## Stručný úvod {#a-brief-introduction}

Chytré kontrakty na Ethereu jsou veřejné a lze je považovat za otevřená API. Nemusíte napsat vlastní chytrý kontrakt, abyste se stali vývojářem dapp, stačí vědět, jak s nimi pracovat. Můžete například použít stávající chytré kontrakty [Uniswapu](https://uniswap.exchange/swap), decentralizované burzy, k obsluze veškeré logiky pro směnu tokenů ve vaší aplikaci – nemusíte začínat od nuly. Podívejte se na některé z jejich kontraktů [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) a [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts).

## Co je to složitelnost? {#what-is-composability}

Složitelnost znamená kombinování různých komponent k vytvoření nových systémů nebo výstupů. Ve vývoji softwaru znamená složitelnost, že vývojáři mohou znovu použít existující softwarové komponenty k vytváření nových aplikací. Dobrou analogií pro pochopení složitelnosti je představit si složitelné prvky jako kostky Lego. Každou kostku je možné zkombinovat s jinou, což vám umožní stavět složité struktury kombinací různých kostek Lego.

Na Ethereu je každý chytrý kontrakt jakousi kostkou Lego – můžete použít chytré kontrakty z jiných projektů jako stavební bloky pro váš projekt. To znamená, že nemusíte trávit čas znovuobjevováním kola nebo začínáním od nuly.

## Jak funguje složitelnost? {#how-does-composability-work}
Chytré kontrakty na Ethereu jsou jako veřejná API, takže s nimi může kdokoli pracovat nebo je integrovat do své dappky za účelem přidání funkcionality. Složitelnost chytrých kontraktů obecně funguje na třech principech: modularita, autonomie a objevitelnost:

**1.** Modularita\*\*: Schopnost jednotlivých komponent vykonávat specifickou úlohu. Na Ethereu má každý chytrý kontrakt specifické použití (jak je ukázáno v příkladu Uniswapu).

**2.** Autonomie\*\*: Složitelné komponenty musí být schopny fungovat nezávisle. Každý chytrý kontrakt na Ethereu je samostatně vykonávaný a může fungovat bez závislosti na jiných částech systému.

**3.** Objevitelnost\*\*: Vývojáři nemohou volat externí kontrakty nebo integrovat softwarové knihovny do aplikací, pokud nejsou veřejně dostupné. Chytré kontrakty jsou z podstaty open-source; kdokoli je může volat nebo může kódovou základnu větvit.

## Výhody složitelnosti {#benefits-of-composability}

### Kratší vývojový cyklus {#shorter-development-cycle}

Složitelnost snižuje množství práce, kterou musí vývojáři odvést při vytváření [dapps](/apps/#what-are-dapps). [Jak říká Naval Ravikant:](https://twitter.com/naval/status/1444366754650656770) „Open source znamená, že každý problém stačí vyřešit pouze jednou.“

Pokud existuje chytrý kontrakt, který řeší jeden problém, mohou ho ostatní vývojáři znovu použít, takže nemusí řešit stejný problém znovu. Tímto způsobem mohou vzít existující softwarové knihovny a přidat k nim další funkce, když vyvíjejí novou dappku.

### Větší inovace {#greater-innovation}

Složitelnost podporuje inovace a experimentování, protože vývojáři mohou svobodně znovu použít, upravit, duplikovat nebo integrovat open-source kód za účelem dosažení požadovaných výsledků. Vývojové týmy tak tráví méně času základní funkcionalitou a mohou věnovat více času experimentování s novými funkcemi.

### Lepší uživatelská zkušenost {#better-user-experience}

Interoperabilita mezi komponentami ekosystému Ethereum zlepšuje uživatelskou zkušenost. Uživatelé mají přístup k větší funkcionalitě, když dappky integrují externí chytré kontrakty, než v roztříštěném ekosystému, kde aplikace nemohou komunikovat.

K ilustraci výhod interoperability použijeme příklad z arbitrážního obchodování:

Pokud se token obchoduje na `exchange A` za vyšší cenu než na `exchange B`, můžete využít cenový rozdíl k dosažení zisku. To však můžete udělat, pouze pokud máte dostatek prostředků k financování transakce (tj. nákup tokenu na `exchange B` a prodej na `exchange A`).

V situaci, kdy nemáte dostatek prostředků na pokrytí takové směny, může být řešením blesková půjčka. [Bleskové půjčky](/defi/#flash-loans) jsou vysoce technické, ale základní myšlenkou je, že si můžete půjčit aktiva (bez zástavy) a vrátit je v rámci _jedné_ transakce.

Když se vrátíme k našemu úvodnímu příkladu, arbitrážní obchodník si může vzít velkou bleskovou půjčku, nakoupit tokeny na `exchange B`, prodat je na `exchange A`, splatit kapitál + úrok a ponechat si zisk, a to vše v rámci jedné transakce. Tato složitá logika vyžaduje kombinování volání více kontraktů, což by nebylo možné, kdyby chytré kontrakty neměly interoperabilitu.

## Příklady složitelnosti v Ethereu {#composability-in-ethereum}

### Směny tokenů {#token-swaps}

Pokud vytvoříte dappku, která vyžaduje platbu za transakce v ETH, můžete uživatelům umožnit platit v jiných ERC-20 tokenech a to pomocí zavedení logiky pro směnu tokenů. Kód automaticky převede token uživatele na ETH, než kontrakt vykoná volanou funkci.

### Správa {#governance}

Vytváření systémů správy na míru pro [DAO](/dao/) může být nákladné a časově náročné. Místo toho můžete použít open-source sadu nástrojů pro správu, jako je [Aragon Client](https://client.aragon.org/), k nastartování svého DAO a rychlému vytvoření rámce pro správu.

### Správa identity {#identity-management}

Místo vytváření vlastního autentizačního systému nebo nutnosti spoléhat se na centralizované poskytovatele, můžete ke správě autentizace uživatelů integrovat nástroje pro decentralizovanou identitu (DID). Příkladem je [SpruceID](https://www.spruceid.com/), open-source sada nástrojů, která nabízí funkci „Přihlásit se pomocí Etherea“, která uživatelům umožňuje ověřovat identitu pomocí ethereovské peněženky.

## Související návody {#related-tutorials}

- [Nastartujte vývoj frontendu pro dapps s create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Přehled, jak použít create-eth-app k vytváření aplikací s populárními chytrými kontrakty, které jsou okamžitě k dispozici._

## Další čtení {#further-reading}

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

- [Složitelnost je inovace](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [Proč je složitelnost důležitá pro Web3](https://hackernoon.com/why-composability-matters-for-web3)
- [Co je složitelnost?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)
