---
title: Atestace
description: "Popis atestací v proof-of-stake Ethereu."
lang: cs
---

Očekává se, že validátor vytvoří, podepíše a odvysílá atestaci během každé epochy. Tato stránka nastiňuje, jak tyto atestace vypadají a jak jsou zpracovávány a komunikovány mezi klienty konsensu.

## Co je to atestace? {#what-is-an-attestation}

Každou [epochu](/glossary/#epoch) (6,4 minuty) validátor odvysílá atestaci do sítě. Atestace je pro konkrétní slot v epoše. Účelem atestace je hlasovat ve prospěch pohledu validátoru na řetězec, zejména na hlavu řetězce, nejnovější ospravedlněný kontrolní bod a kontrolní bod na začátku aktuální epochy (známé jako kontrolní body `source` a `target`). Tyto informace jsou kombinovány pro všechny zúčastněné validátory, což umožňuje síti dosáhnout konsensu o stavu blockchainu.

Od [upgradu Pectra](/roadmap/pectra/) ([EIP-7549](https://eips.ethereum.org/EIPS/eip-7549)) mají atestace od jednoho validátoru a agregovaná atestace různé formáty. Atestace jednoho validátoru obsahuje:

- `committee_index`: výbor, do kterého validátor v daném slotu patří
- `attester_index`: index validátoru
- `data`: podrobnosti týkající se atestace, jak je definováno níže
- `signature`: podpis BLS validátoru nad `data`

Prvním úkolem pro atestujícího validátora je sestavit `data`. `data` obsahuje následující informace:

- `slot`: Číslo slotu, na které se atestace vztahuje
- `index`: Od upgradu Pectra nastaveno na `0`. Výbor je identifikován mimo `data` (pomocí `committee_index` nebo pomocí `committee_bits` v agregátu), takže hlasy z různých výborů mají identická `data` a mohou být agregovány dohromady. Před upgradem Pectra toto pole identifikovalo výbor
- `beacon_block_root`: Kořenový hash bloku, který validátor vidí na hlavě řetězce (výsledek použití algoritmu fork-choice)
- `source`: Část hlasu o finalitě označující, co validátory vidí jako nejnovější ospravedlněný kontrolní bod
- `target`: Část hlasu o finalitě označující, co validátory vidí jako kontrolní bod na začátku aktuální epochy (blok v jejím prvním slotu, nebo nejnovější blok před ním, pokud je tento slot prázdný)

Jakmile je `data` sestaveno, validátor jej podepíše a odvysílá atestaci do [podsítě](#aggregated-attestation) pro svůj výbor.

### Agregovaná atestace {#aggregated-attestation}

S předáváním těchto dat po síti pro každého validátora je spojena značná režie. Proto jsou atestace od jednotlivých validátorů agregovány v rámci podsítí předtím, než jsou odvysílány šířeji. To zahrnuje agregaci podpisů dohromady, takže atestace, která je odvysílána, obsahuje konsensuální `data` a jediný podpis vytvořený kombinací podpisů všech validátorů, kteří s tímto `data` souhlasí. Agregovaná atestace obsahuje:

- `aggregation_bits`: bitlist s jedním bitem na člena každého zahrnutého výboru, kde pozice mapuje pozici validátoru v jeho výboru; hodnota (0/1) označuje, zda je podpis tohoto validátoru zahrnut
- `data`: data atestace, která podepsal každý zahrnutý validátor
- `signature`: podpis BLS, který agreguje podpisy zahrnutých validátorů
- `committee_bits`: členové kterých výborů jsou pokryti pomocí `aggregation_bits`

Kdokoli může zkontrolovat agregovaný podpis proti kombinovaným veřejným klíčům validátorů, jejichž bity jsou nastaveny.

V každém slotu je vybráno asi 16 členů každého výboru, aby se stali jeho `aggregators` (`TARGET_AGGREGATORS_PER_COMMITTEE`). Validátor zjistí, zda byl vybrán, ze svého vlastního podpisu nad číslem slotu. Agregátoři shromažďují všechny atestace, které slyší v podsíti svého výboru a které mají stejné `data` jako jejich vlastní, a kombinují je, přičemž odesílatele každé z nich zaznamenají do `aggregation_bits`. Agregátoři pak odvysílají agregát do širší sítě.

Když je validátor vybrán jako navrhovatel bloku, zahrne do nového bloku agregované atestace z nedávných slotů. Od upgradu Pectra může navrhovatel sloučit agregáty z různých výborů, které sdílejí stejné `data`, do jedné atestace a blok jich může obsahovat až 8.

### Životní cyklus zahrnutí atestace {#attestation-inclusion-lifecycle}

1. Generování
2. Propagace
3. Agregace
4. Propagace
5. Zahrnutí

Životní cyklus atestace je nastíněn ve schématu níže:

<AttestationsDiagram />

## Odměny {#rewards}

Validátoři jsou odměňováni za odesílání atestací. Odměna za atestaci závisí na příznacích účasti (zdroj, cíl a hlava), základní odměně a míře účasti.

Každý z příznaků účasti může být buď pravdivý (true), nebo nepravdivý (false), v závislosti na odeslané atestaci a jejím zpoždění zahrnutí.

Nejlepší scénář nastává, když jsou všechny tři příznaky pravdivé, v takovém případě by validátor získal (za každý správný příznak):

`reward += base reward * flag weight * flag attesting rate / 64`

Míra atestace příznaku se měří pomocí součtu efektivních zůstatků všech atestujících validátorů pro daný příznak v porovnání s celkovým aktivním efektivním zůstatkem.

### Základní odměna {#base-reward}

Základní odměna se vypočítává podle počtu atestujících validátorů a jejich efektivních zůstatků stakovaného etheru:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Zpoždění zahrnutí {#inclusion-delay}

V době, kdy validátoři hlasovali o hlavě řetězce (`block n`), `block n+1` ještě nebyl navržen. Proto jsou atestace přirozeně zahrnuty **o jeden blok později**, takže všechny atestace, které hlasovaly pro to, že `block n` je hlava řetězce, byly zahrnuty do `block n+1` a **zpoždění zahrnutí** je 1. Zpoždění zahrnutí rozhoduje o tom, jaké příznaky účasti atestace získá:

- `head`: pouze pokud je zpoždění zahrnutí přesně 1 slot
- `source`: pokud je zpoždění zahrnutí maximálně 5 slotů (celočíselná druhá odmocnina z 32 slotů v epoše)
- `target`: kdykoli je atestace zahrnuta (od upgradu Deneb, [EIP-7045](https://eips.ethereum.org/EIPS/eip-7045))

Takže atestace zahrnutá o dva sloty později ztrácí svou odměnu za hlavu, ale stále získává odměny za zdroj a cíl.

### Scénáře atestací {#attestation-scenarios}

#### Chybějící hlasující validátor {#missing-voting-validator}

Atestace může být zahrnuta do jakéhokoli bloku od slotu poté, co byla vytvořena, až do konce následující epochy. Pokud atestace z epochy 0 není zahrnuta do bloku během epochy 0, může být stále zahrnuta v epoše 1 s delším zpožděním zahrnutí.

#### Chybějící agregátor {#missing-aggregator}

Každý výbor usiluje o přibližně 16 agregátorů v každém slotu, takže jeden chybějící agregátor zřídkakdy zabrání agregaci atestací výboru. Odděleně zůstává každý uzel Beacon přihlášen k odběru **dvou podsítí po dobu 256 epoch** najednou, vybraných z jeho ID uzlu, což udržuje každou podsíť dobře propojenou.

#### Chybějící navrhovatel bloku {#missing-block-proposer}

Všimněte si, že v některých případech se šťastný agregátor může stát také navrhovatelem bloku. Pokud atestace nebyla zahrnuta, protože navrhovatel bloku chybí, další navrhovatel bloku by agregovanou atestaci převzal a zahrnul ji do dalšího bloku. Nicméně **zpoždění zahrnutí** se zvýší o jedna.

## Další čtení {#further-reading}

- [Atestace ve Vitalikově anotované specifikaci konsensu](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Atestace na eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)
- [Atestace ve specifikaci konsensu Electra](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md#attestation)

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_
