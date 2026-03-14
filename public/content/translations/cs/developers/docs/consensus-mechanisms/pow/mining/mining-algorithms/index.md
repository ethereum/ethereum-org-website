---
title: "Těžební algoritmy"
description: "Podrobný pohled na algoritmy používané pro těžbu Etherea."
lang: cs
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Proof-of-work již není základním mechanismem konsensu Etherea, což znamená, že těžení bylo vypnuto. Místo toho je Ethereum zabezpečeno validátory, kteří stakují ETH. Své ETH můžete začít stakeovat hned dnes. Přečtěte si více o <a href='/roadmap/merge/'>Sloučení</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>proof-of-stake</a> a <a href='/staking/'>stakování</a>. Tato stránka má pouze historický význam.
</AlertDescription>
</AlertContent>
</Alert>

Těžba Etherea používala algoritmus známý jako Ethash. Základní myšlenkou algoritmu je, že se těžař snaží najít vstupní nonce pomocí výpočtu hrubou silou tak, aby výsledný haš byl menší než prahová hodnota určená vypočítanou obtížností. Tuto úroveň obtížnosti lze dynamicky upravovat, což umožňuje, aby produkce bloků probíhala v pravidelném intervalu.

## Předpoklady {#prerequisites}

Pro lepší pochopení této stránky vám doporučujeme si nejprve přečíst o [konsensu proof-of-work](/developers/docs/consensus-mechanisms/pow) a [těžbě](/developers/docs/consensus-mechanisms/pow/mining).

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimoto byl předběžný výzkumný algoritmus pro těžbu Etherea, který nahradil Ethash. Jednalo se o spojení dvou různých algoritmů: Dagger a Hashimoto. Šlo pouze o výzkumnou implementaci, která byla v době spuštění mainnetu Etherea nahrazena algoritmem Ethash.

[Dagger](http://www.hashcash.org/papers/dagger.html) zahrnuje generování [orientovaného acyklického grafu](https://en.wikipedia.org/wiki/Directed_acyclic_graph), jehož náhodné části se společně hašují. Základním principem je, že každá nonce vyžaduje pouze malou část velkého celkového datového stromu. Přepočítávání podstromu pro každou nonce je pro těžbu neúnosné – proto je nutné strom uložit –, ale pro ověření jediné hodnoty nonce je to v pořádku. Dagger byl navržen jako alternativa ke stávajícím algoritmům, jako je Scrypt, které jsou paměťově náročné (memory-hard), ale obtížně se ověřují, když se jejich paměťová náročnost zvýší na skutečně bezpečnou úroveň. Dagger byl však zranitelný vůči hardwarové akceleraci sdílené paměti a bylo od něj upuštěno ve prospěch jiných směrů výzkumu.

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) je algoritmus, který přidává odolnost vůči ASIC tím, že je vázán na I/O (vstup/výstup) (tj. čtení z paměti je limitujícím faktorem v procesu těžby). Teorie je taková, že paměť RAM je dostupnější než výpočetní výkon; výzkum v hodnotě miliard dolarů se již zabýval optimalizací paměti RAM pro různé případy použití, které často zahrnují téměř náhodné vzory přístupu (odtud „paměť s náhodným přístupem“). V důsledku toho je stávající paměť RAM pravděpodobně poměrně blízko optimu pro vyhodnocování algoritmu. Hashimoto používá blockchain jako zdroj dat a současně splňuje body (1) a (3) uvedené výše.

Dagger-Hashimoto používal upravené verze algoritmů Dagger a Hashimoto. Rozdíl mezi Dagger Hashimoto a Hashimoto je v tom, že namísto použití blockchainu jako zdroje dat používá Dagger Hashimoto vlastní vygenerovanou datovou sadu, která se aktualizuje na základě dat bloku každých N bloků. Datová sada se generuje pomocí algoritmu Dagger, což umožňuje efektivní výpočet podmnožiny specifické pro každou nonce pro ověřovací algoritmus lehkého klienta. Rozdíl mezi algoritmy Dagger Hashimoto a Dagger je v tom, že na rozdíl od původního Daggeru je datová sada používaná k dotazování bloku semipermanentní a aktualizuje se pouze v občasných intervalech (např. jednou týdně). To znamená, že část úsilí vynaloženého na generování datové sady se blíží nule, takže argumenty Sergia Lernera ohledně zrychlení díky sdílené paměti se stávají zanedbatelnými.

Více o [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto).

## Ethash {#ethash}

Ethash byl těžební algoritmus, který se skutečně používal na mainnetu Etherea v rámci dnes již zastaralé architektury proof-of-work. Ethash byl v podstatě nový název pro specifickou verzi Dagger-Hashimoto poté, co byl algoritmus výrazně aktualizován, přičemž si stále zachoval základní principy svého předchůdce. Mainnet Etherea používal pouze Ethash – Dagger Hashimoto byl verzí těžebního algoritmu pro výzkum a vývoj, která byla nahrazena předtím, než začala těžba na mainnetu Etherea.

Více o [Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## Další čtení {#further-reading}

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_
