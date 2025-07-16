---
title: Složitelnost chytrých kontraktů
description:
lang: cs
incomplete: true
---

## Stručné představení {#a-brief-introduction}

Chytré kontrakty na Ethereu jsou veřejné a lze je považovat za otevřená API. Nemusíte napsat vlastní chytrý kontrakt, abyste se stali vývojářem dapp, stačí vědět, jak s nimi pracovat. Například můžete použít existující chytré kontrakty [Uniswapu](https://uniswap.exchange/swap), decentralizované burzy, k obsluze veškeré logiky pro směnu tokenů ve vaší aplikaci – nemusíte začínat od nuly. Podívejte se na některé z jejich kontraktů [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) a [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts).

## Co je to složitelnost? {#what-is-composability}

Složitelnost znamená kombinování různých komponent k vytvoření nových systémů nebo výstupů. Ve vývoji softwaru znamená složitelnost, že vývojáři mohou znovu použít existující softwarové komponenty k vytváření nových aplikací. Dobrou analogií pro pochopení složitelnosti je představit si složitelné prvky jako kostky Lego. Každou kostku je možné zkombinovat s jinou, což vám umožní stavět složité struktury kombinací různých kostek Lego.

Na Ethereu je každý chytrý kontrakt jakousi kostkou Lego – můžete použít chytré kontrakty z jiných projektů jako stavební bloky pro váš projekt. To znamená, že nemusíte trávit čas znovuobjevováním kola nebo začínáním od nuly.

## Jak funguje složitelnost? {#how-does-composability-work}

Chytré kontrakty na Ethereu jsou jako veřejná API, takže s nimi může kdokoli pracovat nebo je integrovat do své dappky za účelem přidání funkcionality. Složitelnost chytrých kontraktů obecně funguje na třech principech: modularita, autonomie a objevitelnost:

**1. Modularita**: Schopnost jednotlivých komponent vykonávat specifickou úlohu. Na Ethereu má každý chytrý kontrakt specifické použití (jak je ukázáno v příkladu Uniswapu).

**2. Autonomie**: Složitelné komponenty musí být schopny fungovat nezávisle. Každý chytrý kontrakt na Ethereu je samostatně vykonávaný a může fungovat bez závislosti na jiných částech systému.

**3. Objevitelnost**: Vývojáři nemohou volat externí kontrakty nebo integrovat softwarové knihovny do aplikací, pokud nejsou veřejně dostupné. Chytré kontrakty jsou z podstaty open-source; kdokoli je může volat nebo může kódovou základnu větvit.

## Výhody složitelnosti {#benefits-of-composability}

### Kratší vývojový cyklus {#shorter-development-cycle}

Složitelnost zmenšuje množství práce, kterou musí vývojáři při vytváření [dappek](/dapps/#what-are-dapps) udělat. [Jak říká Naval Ravikant](https://twitter.com/naval/status/1444366754650656770): „Open source znamená, že každý problém musí být vyřešen pouze jednou.“

Pokud existuje chytrý kontrakt, který řeší jeden problém, mohou ho ostatní vývojáři znovu použít, takže nemusí řešit stejný problém znovu. Tímto způsobem mohou vzít existující softwarové knihovny a přidat k nim další funkce, když vyvíjejí novou dappku.

### Větší inovace {#greater-innovation}

Složitelnost podporuje inovace a experimentování, protože vývojáři mohou svobodně znovu použít, upravit, duplikovat nebo integrovat open-source kód za účelem dosažení požadovaných výsledků. Vývojové týmy tak tráví méně času základní funkcionalitou a mohou věnovat více času experimentování s novými funkcemi.

### Lepší uživatelská zkušenost {#better-user-experience}

Interoperabilita mezi komponentami ekosystému Ethereum zlepšuje uživatelskou zkušenost. Uživatelé mají přístup k větší funkcionalitě, když dappky integrují externí chytré kontrakty, než v roztříštěném ekosystému, kde aplikace nemohou komunikovat.

K ilustraci výhod interoperability použijeme příklad z arbitrážního obchodování:

Pokud se token obchoduje na `burze A` za vyšší cenu než na `burze B`, můžete využít cenový rozdíl k dosažení zisku. To však můžete udělat, pouze pokud máte dostatek prostředků k financování transakce (tj. nákup tokenu na `burze B` a prodej na `burze A`).

V situaci, kdy nemáte dostatek prostředků na pokrytí takové směny, může být řešením blesková půjčka. [Bleskové půjčky](/defi/#flash-loans) jsou vysoce technické, ale základní myšlenkou je, že si můžete půjčit aktiva (bez zástavy) a ještě je stihnout v rámci _jedné_ transakce vrátit.

Vrátíme-li se k našemu původnímu příkladu, arbitrážní obchodník si může vzít velkou bleskovou půjčku, nakoupit tokeny na `burze B`, prodat je na `burze A`, splatit půjčený kapitál i s úroky a vydělat na tom, to vše v rámci jedné transakce. Tato složitá logika vyžaduje kombinování volání více kontraktů, což by nebylo možné, kdyby chytré kontrakty neměly interoperabilitu.

## Příklady složitelnosti na Ethereu {#composability-in-ethereum}

### Směny tokenů {#token-swaps}

Pokud vytvoříte dappku, která vyžaduje platbu za transakce v ETH, můžete uživatelům umožnit platit v jiných ERC-20 tokenech a to pomocí zavedení logiky pro směnu tokenů. Kód automaticky převede token uživatele na ETH, než kontrakt vykoná volanou funkci.

### Řízení {#governance}

Tvorba na míru šitých řídicích systémů pro [DAO](/dao/) může být drahá a časově náročná. Místo toho můžete k rychlému vytvoření řídicího frameworku pro vaše DAO použít open-source toolkit řízení, jako je [Aragon Client](https://client.aragon.org/).

### Správa identity {#identity-management}

Místo vytváření vlastního autentizačního systému nebo nutnosti spoléhat se na centralizované poskytovatele, můžete ke správě autentizace uživatelů integrovat nástroje pro decentralizovanou identitu (DID). Příkladem je [SpruceID](https://www.spruceid.com/), open-source toolkit, který nabízí funkci „Přihlásit se pomocí Etherea“, která uživatelům umožňuje autentizovat identitu pomocí ethereovské peněženky.

## Související návody {#related-tutorials}

- [Nastartujte vývoj frontendového rozhraní pro dappky pomocí create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Přehled o tom, jak používat create-eth-app k vytváření aplikací s populárními chytrými kontrakty._

## Další informace {#further-reading}

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

- [Složitelnost je inovace](https://future.a16z.com/how-composability-unlocks-crypto-and-everything-else/)
- [Proč je složitelnost důležitá pro Web3](https://hackernoon.com/why-composability-matters-for-web3)
- [Co je to složitelnost?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)
