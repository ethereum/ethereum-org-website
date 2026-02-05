---
title: Atestace
description: Popis atestací na Ethereu s důkazem podílem.
lang: cs
---

Očekává se, že validátor během každé epochy vytvoří, podepíše a odvysílá atestaci. Tato stránka popisuje, jak tyto atestace vypadají a jak jsou zpracovávány a předávány mezi konsensuálními klienty.

## Co je atestace? {#what-is-an-attestation}

Každou [epochu](/glossary/#epoch) (6,4 minuty) validátor navrhuje síti atestaci. Atestace se týká konkrétního slotu v epoše. Účelem atestace je hlasovat ve prospěch pohledu validátora na řetězec, zejména pro nejnovější potvrzený blok a první blok v aktuální epoše (známé jako kontrolní body `source` a `target`). Tyto informace od všech zúčastněných validátorů se zkombinují, což síti umožňuje dosáhnout konsensu o stavu blockchainu.

Atestace obsahuje následující komponenty:

- `aggregation_bits`: bitový seznam validátorů, kde pozice odpovídá indexu validátora v jeho výboru; hodnota (0/1) udává, zda validátor podepsal `data` (tzn. zda je aktivní a souhlasí s navrhovatelem bloku)
- `data`: podrobnosti týkající se atestace, jak je definováno níže
- `signature`: podpis BLS, který agreguje podpisy jednotlivých validátorů

Prvním úkolem atestujícího validátora je sestavit `data`. `data` obsahuje následující informace:

- `slot`: Číslo slotu, na který se atestace vztahuje
- `index`: Číslo, které identifikuje, do kterého výboru validátor v daném slotu patří
- `beacon_block_root`: Kořenový haš bloku, který validátor vidí v čele řetězce (výsledek použití algoritmu pro výběr větve)
- `source`: Část hlasování o finalitě, která udává, co validátoři považují za nejnovější potvrzený blok
- `target`: Část hlasování o finalitě, která udává, co validátoři považují za první blok v aktuální epoše

Jakmile jsou `data` sestavena, může validátor otočit bit v `aggregation_bits` odpovídající jeho vlastnímu indexu validátora z 0 na 1, aby ukázal, že se zúčastnil.

Nakonec validátor podepíše atestaci a odvysílá ji do sítě.

### Agregovaná atestace {#aggregated-attestation}

S předáváním těchto dat po síti pro každého validátora je spojena značná režie. Proto jsou atestace od jednotlivých validátorů agregovány v podsítích, než jsou odvysílány do širší sítě. To zahrnuje agregaci podpisů tak, aby atestace, která je odvysílána, obsahovala konsensuální `data` a jediný podpis vytvořený spojením podpisů všech validátorů, kteří s těmito `daty` souhlasí. To lze zkontrolovat pomocí `aggregation_bits`, protože to poskytuje index každého validátora v jeho výboru (jehož ID je uvedeno v `data`), který lze použít k dotazování na jednotlivé podpisy.

V každé epoše je v každé podsíti vybráno 16 validátorů, kteří se stanou `agregátory`. Agregátoři shromažďují všechny atestace, o kterých se doslechnou v gossip síti a které mají ekvivalentní `data` jako jejich vlastní. Odesílatel každé shodné atestace je zaznamenán v `aggregation_bits`. Agregátoři poté odvysílají agregát atestací do širší sítě.

Když je validátor vybrán jako navrhovatel bloku, zabalí agregované atestace z podsítí až do posledního slotu do nového bloku.

### Životní cyklus zahrnutí atestace {#attestation-inclusion-lifecycle}

1. Generování
2. Šíření
3. Agregace
4. Šíření
5. Zahrnutí

Životní cyklus atestace je znázorněn na schématu níže:

![životní cyklus atestace](./attestation_schematic.png)

## Odměny {#rewards}

Validátoři jsou za odesílání atestací odměňováni. Odměna za atestaci závisí na příznacích účasti (zdroj, cíl a hlava), základní odměně a míře účasti.

Každý z příznaků účasti může být buď pravdivý, nebo nepravdivý, v závislosti na odeslané atestaci a jejím zpoždění zahrnutí.

Nejlepší scénář nastává, když jsou všechny tři příznaky pravdivé, v takovém případě by validátor získal (za každý správný příznak):

`odměna += základní odměna * váha příznaku * míra atestace příznaku / 64`

Míra atestace příznaku se měří pomocí součtu efektivních zůstatků všech atestujících validátorů pro daný příznak v porovnání s celkovým aktivním efektivním zůstatkem.

### Základní odměna {#base-reward}

Základní odměna se vypočítá podle počtu atestujících validátorů a jejich efektivních uzamčených zůstatků etheru:

`základní odměna = efektivní zůstatek validátora x 2^6 / SQRT(Efektivní zůstatek všech aktivních validátorů)`

#### Zpoždění zahrnutí {#inclusion-delay}

V době, kdy validátoři hlasovali o čele řetězce (`blok n`), `blok n+1` ještě nebyl navržen. Atestace se proto přirozeně zařazují **o jeden blok později**, takže všechny atestace, které hlasovaly o tom, že `blok n` je čelo řetězce, se zařadily do `bloku n+1` a **zpoždění zahrnutí** je 1. Pokud se zpoždění zahrnutí zdvojnásobí na dva sloty, odměna za atestaci se sníží na polovinu, protože pro výpočet odměny za atestaci se základní odměna násobí převrácenou hodnotou zpoždění zahrnutí.

### Scénáře atestací {#attestation-scenarios}

#### Chybějící hlasující validátor {#missing-voting-validator}

Validátoři mají na odeslání své atestace maximálně 1 epochu. Pokud byla atestace v epoše 0 zmeškána, mohou ji odeslat se zpožděním zahrnutí v epoše 1.

#### Chybějící agregátor {#missing-aggregator}

V každé epoše je celkem 16 agregátorů. Kromě toho se náhodní validátoři přihlásí k odběru **dvou podsítí na 256 epoch** a slouží jako záloha pro případ, že by agregátoři chyběli.

#### Chybějící navrhovatel bloku {#missing-block-proposer}

Všimněte si, že v některých případech se šťastný agregátor může stát i navrhovatelem bloku. Pokud atestace nebyla zahrnuta, protože navrhovatel bloku chyběl, další navrhovatel bloku by agregovanou atestaci vyzvedl a zahrnul ji do dalšího bloku. Nicméně, **zpoždění zahrnutí** se zvýší o jedna.

## Další čtení {#further-reading}

- [Atestace v komentované specifikaci konsensu od Vitalika](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Atestace na eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_
