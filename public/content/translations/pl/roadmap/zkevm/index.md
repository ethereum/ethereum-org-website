---
title: zkEVM do weryfikacji bloków L1
description: Dowiedz się, jak dowody zerowej wiedzy mogą weryfikować wykonanie bloków Ethereum, umożliwiając wyższą przepustowość i niższe wymagania dla walidatorów.
lang: pl
---

# zkEVM do weryfikacji bloków L1 {#zkevm-l1}

zkEVM to technologia, która wykorzystuje [dowody zerowej wiedzy](/zero-knowledge-proofs/) do weryfikacji wykonania bloków Ethereum. Zamiast wymagać od każdego [walidatora](/glossary/#validator) ponownego wykonania wszystkich transakcji w bloku, pojedynczy wyspecjalizowany podmiot (zwany „dowodzącym” - ang. prover) wykonuje blok i generuje kryptograficzny dowód na to, że wykonanie było poprawne. Każdy węzeł może następnie zweryfikować ten dowód — proces ten jest o rzędy wielkości tańszy niż ponowne wykonanie wszystkich transakcji.

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>Nie mylić z rollupami zkEVM</AlertTitle>
<AlertDescription>
Ta strona omawia wykorzystanie zkEVM do weryfikacji wykonania bloków L1 Ethereum. Informacje na temat rollupów zkEVM, które wykorzystują dowody ZK do skalowania Ethereum jako rozwiązania warstwy 2, można znaleźć w sekcji [pakiety zbiorcze o wiedzy zerowej](/developers/docs/scaling/zk-rollups/).
</AlertDescription>
</AlertContent>
</Alert>

## Problem ponownego wykonania {#reexecution-problem}

Obecnie Ethereum wykorzystuje model weryfikacji „N z N”: każdy walidator musi niezależnie ponownie wykonać każdą transakcję w każdym bloku, aby zweryfikować, czy proponowane zmiany stanu są poprawne. Chociaż to podejście jest maksymalnie pozbawione konieczności zaufania (trustless), tworzy fundamentalne wąskie gardło.

Problem polega na tym, że przepustowość Ethereum jest ograniczona przez to, co może przetworzyć przeciętny walidator. Podniesienie [limitu gazu](/glossary/#gas-limit) pozwoliłoby na więcej transakcji na blok, ale podniosłoby również wymagania sprzętowe dla walidatorów. Zagraża to decentralizacji — jeśli uruchomienie walidatora wymaga drogiego sprzętu, mniej osób może uczestniczyć w zabezpieczaniu sieci.

zkEVM oferuje wyjście z tego kompromisu. Przechodząc od „wszyscy wykonują ponownie” do „jeden dowodzi, wszyscy weryfikują”, Ethereum może bezpiecznie zwiększyć limit gazu bez podnoszenia wymagań sprzętowych dla walidatorów.

## Jak działa weryfikacja zkEVM L1 {#how-it-works}

Weryfikacja zkEVM przekształca walidację bloków w model „1 z N”:

1. **Wykonanie**: Dowodzący wykonuje wszystkie transakcje w bloku, śledząc każdą zmianę stanu
2. **Dowodzenie**: Dowodzący generuje kryptograficzny dowód ([SNARK lub STARK](/zero-knowledge-proofs/#types-of-zero-knowledge-proofs)), który poświadcza poprawność wykonania
3. **Weryfikacja**: Walidatorzy weryfikują dowód zamiast ponownie wykonywać transakcje — jest to drastycznie tańsze niż pełne ponowne wykonanie

Gwarancja bezpieczeństwa pozostaje taka sama: jeśli wykonanie było niepoprawne, nie można wygenerować ważnego dowodu. Ale teraz, zamiast każdego węzła wykonującego kosztowne obliczenia, robi to tylko dowodzący — a weryfikacja jest na tyle tania, że nie ogranicza limitu gazu.

### zkEVM typu 1 {#type-1-zkevm}

zkEVM są klasyfikowane na typy w oparciu o ich kompatybilność z Ethereum:

- **Typ 1**: W pełni równoważny z Ethereum. Brak modyfikacji w EVM, więc każdy blok Ethereum może zostać udowodniony dokładnie w takiej postaci, w jakiej jest
- **Typ 2-4**: Idą na różne kompromisy, modyfikując zachowanie EVM, aby ułatwić dowodzenie

Dla weryfikacji L1, Typ 1 jest niezbędny. zkEVM musi być w stanie udowodnić każdy ważny blok Ethereum, w tym przypadki brzegowe i bloki historyczne. Jakiekolwiek odstępstwo od dokładnego zachowania Ethereum stworzyłoby problemy z konsensusem.

Badania Ethereum Foundation nad zkEVM skupiają się na implementacjach Typu 1, które są w pełni kompatybilne z istniejącym wykonaniem Ethereum.

## Korzyści dla Ethereum {#benefits}

### Wyższa przepustowość {#higher-throughput}

Gdy weryfikacja jest tania, limit gazu może bezpiecznie wzrosnąć. Zwiększa to pojemność sieci i pomaga ustabilizować opłaty w okresach wysokiego popytu. Obecny limit gazu jest częściowo ograniczony przez sprzęt walidatorów — zkEVM usuwa to ograniczenie.

### Silniejsza decentralizacja {#stronger-decentralization}

Dzięki weryfikacji zkEVM walidatorzy muszą jedynie weryfikować dowody, a nie wykonywać transakcje. To drastycznie obniża wymagania sprzętowe do uruchomienia walidatora, umożliwiając większej liczbie osób udział w zabezpieczaniu sieci. Większa różnorodność walidatorów wzmacnia odporność Ethereum na cenzurę i jego ogólną niezawodność.

Należy zauważyć, że samo dowodzenie wymaga znacznych zasobów obliczeniowych, większych niż obecny sprzęt walidatorów. Jednak w przeciwieństwie do walidacji, dowodzenie nie musi być zdecentralizowane w ten sam sposób: na każdy blok potrzebny jest tylko jeden poprawny dowód, a każdy może go szybko zweryfikować. Badania nad rynkami dowodzących, agregacją dowodów i akceleracją sprzętową mają na celu zapewnienie, że dowodzenie pozostanie konkurencyjne i dostępne, a nie skoncentrowane wśród kilku dużych operatorów.

### Przewidywalna finalizacja {#predictable-finality}

Weryfikacja dowodu działa w stałym czasie, niezależnie od złożoności bloku. Sprawia to, że czas poświadczenia jest bardziej przewidywalny i zmniejsza liczbę pominiętych poświadczeń, które mogą wystąpić, gdy walidatorzy mają trudności z przetworzeniem złożonych bloków na czas.

## Wyzwania związane z dowodzeniem w czasie rzeczywistym {#realtime-proving}

Głównym wyzwaniem dla weryfikacji zkEVM L1 jest szybkość. Bloki Ethereum są produkowane co 12 sekund, co oznacza, że dowody muszą być generowane w podobnym przedziale czasowym, aby były użyteczne dla konsensusu.

Obecne implementacje zkEVM mogą potrzebować od kilku minut do kilku godzin, aby udowodnić pojedynczy blok. Badania skupiają się na zniwelowaniu tej luki poprzez:

- **Zrównoleglenie**: Rozdzielenie pracy dowodzenia na wiele maszyn
- **Specjalistyczny sprzęt**: Projektowanie obwodów i sprzętu zoptymalizowanego pod kątem dowodzenia ZK
- **Ulepszenia algorytmiczne**: Bardziej wydajne systemy dowodzenia i projekty obwodów
- **Dowodzenie przyrostowe**: Generowanie dowodów w miarę wykonywania transakcji, a nie po ich zakończeniu

## Obecne badania i implementacje {#current-research}

Ethereum Foundation finansuje badania nad zkEVM za pośrednictwem zespołu [Privacy Stewards of Ethereum (PSE)](https://pse.dev/). Kluczowe ścieżki badawcze obejmują:

- **Dowodzenie w czasie rzeczywistym**: Generowanie pełnych dowodów bloków w 12-sekundowych slotach
- **Integracja klientów**: Standaryzacja interfejsów między klientami wykonawczymi a dowodzącymi
- **Zachęty ekonomiczne**: Projektowanie zrównoważonych rynków dowodzących i struktur opłat

### Status implementacji {#implementations}

Kilka implementacji zkVM jest obecnie rozwijanych i testowanych pod kątem dowodzenia bloków Ethereum:

| Implementacja | Architektura |
|----------------|--------------|
| [OpenVM](https://github.com/openvm-org/openvm) | rv32im |
| [RISC Zero](https://github.com/risc0/risc0) | rv32im |
| [Airbender](https://github.com/matter-labs/zksync-airbender) | rv32im |
| [Jolt](https://github.com/a16z/jolt) | rv32im |
| [Zisk](https://github.com/0xPolygonHermez/zisk) | rv64ima |

Wykorzystują one maszyny wirtualne oparte na architekturze RISC-V do wykonywania kodu bajtowego EVM, a następnie generują dowody ZK poprawnego wykonania. Aktualne wyniki testów i postępy można śledzić w [trackerze zkVM Ethereum Foundation](https://zkevm.ethereum.foundation/zkvm-tracker).

## Jak zkEVM łączy się z innymi aktualizacjami {#related-upgrades}

Weryfikacja zkEVM L1 łączy się z kilkoma innymi elementami planu działania Ethereum:

- **[Drzewa Verkle](/roadmap/verkle-trees/)**: Umożliwiają mniejsze dane poświadczające (witnesses) dla bezstanowej weryfikacji, zmniejszając ilość danych, z którymi muszą pracować dowodzący
- **[Bezstanowość](/roadmap/statelessness/)**: zkEVM jest kluczowym czynnikiem umożliwiającym — dzięki dowodom wykonania ZK węzły nie potrzebują pełnego stanu do weryfikacji bloków
- **[PBS](/roadmap/pbs/)**: Budowniczowie bloków mogliby potencjalnie zintegrować generowanie dowodów lub mógłby powstać oddzielny rynek dowodzących
- **[Finalizacja w jednym slocie](/roadmap/single-slot-finality/)**: Szybsze generowanie dowodów mogłoby umożliwić finalizację w jednym slocie z gwarancjami kryptograficznymi

<Alert variant="warning">
<AlertEmoji text="🧪" />
<AlertContent>
<AlertDescription>
Weryfikacja zkEVM L1 jest w fazie aktywnych badań i nie została jeszcze zintegrowana z produkcyjnymi klientami Ethereum.
</AlertDescription>
</AlertContent>
</Alert>

## Dalsza lektura {#further-reading}

- [zkEVM Foundation](https://zkevm.ethereum.foundation) - Oficjalne centrum badawcze zkEVM Ethereum Foundation
- [Ethproofs](https://ethproofs.org/) - Śledź wyścig w dowodzeniu Ethereum w czasie rzeczywistym
- [zkevm.fyi](https://zkevm.fyi) - Książka techniczna o zkEVM dla L1
- [PSE zkEVM Specs](https://github.com/privacy-scaling-explorations/zkevm-specs) - Specyfikacje techniczne
- [The Verge](https://vitalik.eth.limo/general/2024/10/23/futures4.html) - Przegląd ulepszeń weryfikacji autorstwa Vitalika
- [EF zkEVM Blog](https://zkevm.ethereum.foundation/blog) - Analiza wydajności od zespołu EF