---
title: Atestace
description: "Popis atestací v síti Ethereum s mechanismem proof-of-stake."
lang: cs
---

Očekává se, že validátor vytvoří, podepíše a odvysílá atestaci během každé epochy. Tato stránka nastiňuje, jak tyto atestace vypadají a jak jsou zpracovávány a komunikovány mezi klienty konsensu.

## Co je to atestace? {#what-is-an-attestation}

Každou [epochu](/glossary/#epoch) (6,4 minuty) navrhuje validátor síti atestaci. Atestace je pro konkrétní slot v epoše. Účelem atestace je hlasovat ve prospěch pohledu validátoru na řetězec, zejména na nejnovější ospravedlněný blok a první blok v aktuální epoše (známé jako kontrolní body `source` a `target`). Tyto informace se kombinují pro všechny zúčastněné validátory, což umožňuje síti dosáhnout konsensu o stavu blockchainu.

Atestace obsahuje následující komponenty:

- `aggregation_bits`: bitový seznam validátorů, kde pozice odpovídá indexu validátoru v jejich výboru; hodnota (0/1) označuje, zda validátor podepsal `data` (tj. zda je aktivní a souhlasí s navrhovatelem bloku)
- `data`: podrobnosti týkající se atestace, jak je definováno níže
- `signature`: podpis BLS, který agreguje podpisy jednotlivých validátorů

Prvním úkolem pro atestujícího validátora je sestavit `data`. `data` obsahuje následující informace:

- `slot`: Číslo slotu, na který se atestace vztahuje
- `index`: Číslo, které identifikuje, do kterého výboru validátor v daném slotu patří
- `beacon_block_root`: Kořenový hash bloku, který validátor vidí na vrcholu řetězce (výsledek použití algoritmu pro výběr forku)
- `source`: Část hlasu o finalitě, která ukazuje, co validátoři považují za nejnovější ospravedlněný blok
- `target`: Část hlasu o finalitě, která ukazuje, co validátoři považují za první blok v aktuální epoše

Jakmile je `data` sestaven, může validátor přepnout bit v `aggregation_bits`, který odpovídá jeho vlastnímu indexu validátoru, z 0 na 1, aby ukázal, že se zúčastnil.

Nakonec validátor atestaci podepíše a odvysílá ji do sítě.

### Agregovaná atestace {#aggregated-attestation}

S předáváním těchto dat po síti pro každého validátora je spojena značná režie. Proto jsou atestace od jednotlivých validátorů agregovány v rámci podsítí předtím, než jsou odvysílány šířeji. To zahrnuje společnou agregaci podpisů tak, aby atestace, která se vysílá, obsahovala konsensus `data` a jediný podpis vytvořený kombinací podpisů všech validátorů, kteří s tímto `data` souhlasí. To lze zkontrolovat pomocí `aggregation_bits`, protože to poskytuje index každého validátoru v jeho výboru (jehož ID je uvedeno v `data`), což lze použít k dotazování na jednotlivé podpisy.

V každé epoše je v každé podsíti vybráno 16 validátorů, kteří se stanou `aggregators`. Agregátoři shromažďují všechny atestace, o kterých se dozvědí prostřednictvím sítě gossip, které mají ekvivalentní `data` k jejich vlastnímu. Odesílatel každé odpovídající atestace je zaznamenán v `aggregation_bits`. Agregátoři pak odvysílají agregát atestací do širší sítě.

Když je validátor vybrán jako navrhovatel bloku, zabalí agregované atestace z podsítí až do nejnovějšího slotu v novém bloku.

### Životní cyklus zahrnutí atestace {#attestation-inclusion-lifecycle}

1. Generování
2. Šíření
3. Agregace
4. Šíření
5. Zahrnutí

Životní cyklus atestace je nastíněn ve schématu níže:

![attestation lifecycle](./attestation_schematic.png)

## Odměny {#rewards}

Validátoři jsou odměňováni za předkládání atestací. Odměna za atestaci závisí na příznacích účasti (zdroj, cíl a vrchol), základní odměně a míře účasti.

Každý z příznaků účasti může být buď pravdivý (true), nebo nepravdivý (false), v závislosti na předložené atestaci a jejím zpoždění zahrnutí.

Nejlepší scénář nastává, když jsou všechny tři příznaky pravdivé, v takovém případě by validátor získal (za každý správný příznak):

`reward += base reward * flag weight * flag attesting rate / 64`

Míra atestace příznaku se měří pomocí součtu efektivních zůstatků všech atestujících validátorů pro daný příznak v porovnání s celkovým aktivním efektivním zůstatkem.

### Základní odměna {#base-reward}

Základní odměna se vypočítává podle počtu atestujících validátorů a jejich efektivních zůstatků stakovaného etheru:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Zpoždění zahrnutí {#inclusion-delay}

V době, kdy validátoři hlasovali o vrcholu řetězce (`block n`), `block n+1` ještě nebyl navržen. Proto jsou atestace přirozeně zahrnuty **o jeden blok později**, takže všechny atestace, které hlasovaly pro to, že `block n` je vrcholem řetězce, byly zahrnuty do `block n+1` a **zpoždění zahrnutí** je 1. Pokud se zpoždění zahrnutí zdvojnásobí na dva sloty, odměna za atestaci se sníží na polovinu, protože pro výpočet odměny za atestaci se základní odměna vynásobí převrácenou hodnotou zpoždění zahrnutí.

### Scénáře atestace {#attestation-scenarios}

#### Chybějící hlasující validátor {#missing-voting-validator}

Validátoři mají na předložení své atestace maximálně 1 epochu. Pokud byla atestace zmeškána v epoše 0, mohou ji předložit se zpožděním zahrnutí v epoše 1.

#### Chybějící agregátor {#missing-aggregator}

Celkem je 16 agregátorů na epochu. Kromě toho se náhodní validátoři přihlašují k odběru **dvou podsítí na 256 epoch** a slouží jako záloha pro případ, že by agregátoři chyběli.

#### Chybějící navrhovatel bloku {#missing-block-proposer}

Všimněte si, že v některých případech se šťastný agregátor může stát také navrhovatelem bloku. Pokud atestace nebyla zahrnuta, protože navrhovatel bloku chyběl, další navrhovatel bloku by agregovanou atestaci převzal a zahrnul ji do dalšího bloku. **Zpoždění zahrnutí** se však zvýší o jedna.

## Další čtení {#further-reading}

- [Atestace ve Vitalikově anotované specifikaci konsensu](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Atestace na eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_