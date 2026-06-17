---
title: Těžební algoritmy
description: Detailní pohled na algoritmy používané pro těžbu Etherea.
lang: cs
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Důkaz prací (PoW) již není základem mechanismu konsensu Etherea, což znamená, že těžba byla vypnuta. Místo toho je Ethereum zabezpečeno validátory, kteří stakují ETH. Své ETH můžete začít stakovat ještě dnes. Přečtěte si více o <a href='/roadmap/merge/'>Merge</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>důkazu podílem (PoS)</a> a <a href='/staking/'>stakingu</a>. Tato stránka slouží pouze pro historické účely.
</AlertDescription>
</AlertContent>
</Alert>

Těžba Etherea používala algoritmus známý jako Ethash. Základní myšlenkou tohoto algoritmu je, že se těžař snaží pomocí výpočtů hrubou silou najít vstupní nonce tak, aby výsledný hash byl menší než prahová hodnota určená vypočítanou obtížností. Tuto úroveň obtížnosti lze dynamicky upravovat, což umožňuje produkci bloků v pravidelných intervalech.

## Předpoklady {#prerequisites}

Pro lepší pochopení této stránky doporučujeme nejprve si přečíst o [konsensu důkazu prací (PoW)](/developers/docs/consensus-mechanisms/pow) a [těžbě](/developers/docs/consensus-mechanisms/pow/mining).

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimoto byl předcházející výzkumný algoritmus pro těžbu Etherea, který byl nahrazen algoritmem Ethash. Šlo o sloučení dvou různých algoritmů: Dagger a Hashimoto. Byla to pouze výzkumná implementace a v době spuštění sítě Ethereum Mainnet byla nahrazena algoritmem Ethash.

[Dagger](http://www.hashcash.org/papers/dagger.html) zahrnuje generování [orientovaného acyklického grafu (DAG)](https://en.wikipedia.org/wiki/Directed_acyclic_graph), jehož náhodné části se společně hashují. Základním principem je, že každá nonce vyžaduje pouze malou část velkého celkového datového stromu. Přepočítávání podstromu pro každou nonce je pro těžbu neúnosné – proto je nutné strom ukládat – ale je v pořádku pro ověření jedné nonce. Dagger byl navržen jako alternativa k existujícím algoritmům, jako je Scrypt, které jsou náročné na paměť, ale obtížně se ověřují, když se jejich paměťová náročnost zvýší na skutečně bezpečné úrovně. Dagger byl však zranitelný vůči hardwarové akceleraci sdílené paměti a byl opuštěn ve prospěch jiných směrů výzkumu.

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) je algoritmus, který přidává odolnost vůči ASIC tím, že je vázán na I/O (tj. čtení z paměti je limitujícím faktorem v procesu těžby). Teorie spočívá v tom, že RAM je dostupnější než výpočetní výkon; výzkum v hodnotě miliard dolarů již zkoumal optimalizaci RAM pro různé případy použití, které často zahrnují vzorce téměř náhodného přístupu (odtud „paměť s náhodným přístupem“ - random access memory). V důsledku toho je pravděpodobné, že stávající RAM bude poměrně blízko optimu pro vyhodnocování algoritmu. Hashimoto používá blockchain jako zdroj dat, čímž současně splňuje výše uvedené body (1) a (3).

Dagger-Hashimoto používal upravené verze algoritmů Dagger a Hashimoto. Rozdíl mezi Dagger-Hashimoto a Hashimoto spočívá v tom, že místo použití blockchainu jako zdroje dat používá Dagger-Hashimoto vlastní generovaný datový soubor, který se aktualizuje na základě dat bloku každých N bloků. Datový soubor je generován pomocí algoritmu Dagger, což umožňuje efektivně vypočítat podmnožinu specifickou pro každou nonce pro ověřovací algoritmus lehkého klienta. Rozdíl mezi Dagger-Hashimoto a Dagger je v tom, že na rozdíl od původního Daggeru je datový soubor používaný k dotazování bloku semipermanentní a aktualizuje se pouze v občasných intervalech (např. jednou týdně). To znamená, že část úsilí na generování datového souboru se blíží nule, takže argumenty Sergia Lernera ohledně zrychlení sdílené paměti se stávají zanedbatelnými.

Více o [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto).

## Ethash {#ethash}

Ethash byl těžební algoritmus, který se skutečně používal na reálné síti Ethereum Mainnet v rámci nyní již zastaralé architektury důkazu prací (PoW). Ethash byl v podstatě nový název pro specifickou verzi Dagger-Hashimoto poté, co byl algoritmus významně aktualizován, přičemž si stále zachoval základní principy svého předchůdce. Ethereum Mainnet vždy používal pouze Ethash – Dagger Hashimoto byla výzkumná a vývojová (R&D) verze těžebního algoritmu, která byla nahrazena ještě před zahájením těžby na síti Ethereum Mainnet.

[Více o Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## Další čtení {#further-reading}

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_