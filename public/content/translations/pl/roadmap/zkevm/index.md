---
title: zkEVM do weryfikacji bloków L1
description: Dowiedz się, jak dowody z wiedzą zerową mogą weryfikować wykonanie bloków Ethereum, umożliwiając wyższą przepustowość i niższe wymagania dla walidatorów.
lang: pl
---

zkEVM to technologia, która wykorzystuje [dowody z wiedzą zerową](/zero-knowledge-proofs/) do weryfikacji wykonania bloków Ethereum. Zamiast wymagać od każdego [walidatora](/glossary/#validator) ponownego wykonania wszystkich transakcji w bloku, pojedynczy wyspecjalizowany podmiot (zwany „proverem”) wykonuje blok i generuje kryptograficzny dowód na to, że wykonanie było poprawne. Każdy węzeł może następnie zweryfikować ten dowód — proces ten jest o rzędy wielkości tańszy niż ponowne wykonanie wszystkich transakcji.

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>Nie mylić z rollupami zkEVM</AlertTitle>
<AlertDescription>
Ta strona omawia wykorzystanie zkEVM do weryfikacji wykonania bloków w warstwie 1 (L1) Ethereum. Informacje o rollupach zkEVM, które wykorzystują dowody ZK do skalowania Ethereum jako rozwiązania warstwy 2 (L2), znajdziesz w sekcji [rollupy z wiedzą zerową](/developers/docs/scaling/zk-rollups/).
</AlertDescription>
</AlertContent>
</Alert>

## Problem ponownego wykonania {#reexecution-problem}

Obecnie Ethereum wykorzystuje model weryfikacji „N z N”: każdy walidator musi niezależnie ponownie wykonać każdą transakcję w każdym bloku, aby zweryfikować, czy proponowane zmiany stanu są poprawne. Chociaż to podejście jest maksymalnie niewymagające zaufania, tworzy fundamentalne wąskie gardło.

Problem polega na tym, że przepustowość Ethereum jest ograniczona przez to, co może przetworzyć przeciętny walidator. Podniesienie [limitu gazu](/glossary/#gas-limit) pozwoliłoby na więcej transakcji w bloku, ale jednocześnie zwiększyłoby wymagania sprzętowe dla walidatorów. Zagraża to decentralizacji — jeśli uruchomienie walidatora wymaga drogiego sprzętu, mniej osób może uczestniczyć w zabezpieczaniu sieci.

zkEVM oferuje wyjście z tego kompromisu. Przechodząc z modelu „każdy wykonuje ponownie” na „jeden dowodzi, każdy weryfikuje”, Ethereum może bezpiecznie zwiększyć limit gazu bez podnoszenia wymagań sprzętowych dla walidatorów.

## Jak działa weryfikacja zkEVM w L1 {#how-it-works}

Weryfikacja zkEVM przekształca walidację bloku w model „1 z N”:

1. **Wykonanie**: Prover wykonuje wszystkie transakcje w bloku, śledząc każdą zmianę stanu.
2. **Dowodzenie**: Prover generuje kryptograficzny dowód ([SNARK lub STARK](/zero-knowledge-proofs/#types-of-zero-knowledge-proofs)), który poświadcza poprawność wykonania.
3. **Weryfikacja**: Walidatory weryfikują dowód zamiast ponownie wykonywać transakcje — jest to drastycznie tańsze niż pełne ponowne wykonanie.

Gwarancja bezpieczeństwa pozostaje taka sama: jeśli wykonanie było niepoprawne, nie można wygenerować ważnego dowodu. Ale teraz, zamiast każdego węzła wykonującego kosztowne obliczenia, robi to tylko prover — a weryfikacja jest na tyle tania, że nie ogranicza limitu gazu.

### zkEVM typu 1 {#type-1-zkevm}

zkEVM są klasyfikowane na typy w oparciu o ich kompatybilność z Ethereum:

- **Typ 1**: W pełni równoważny z Ethereum. Brak modyfikacji w EVM, więc każdy blok Ethereum może zostać udowodniony dokładnie w takiej postaci, w jakiej jest.
- **Typ 2-4**: Idą na różne kompromisy, modyfikując zachowanie EVM, aby ułatwić dowodzenie.

W przypadku weryfikacji w warstwie 1 (L1), Typ 1 jest niezbędny. zkEVM musi być w stanie udowodnić każdy prawidłowy blok Ethereum, w tym przypadki brzegowe i bloki historyczne. Jakiekolwiek odstępstwo od dokładnego zachowania Ethereum stworzyłoby problemy z konsensusem.

Badania Fundacji Ethereum nad zkEVM skupiają się na implementacjach Typu 1, które są w pełni kompatybilne z istniejącym wykonaniem Ethereum.

## Korzyści dla Ethereum {#benefits}

### Wyższa przepustowość {#higher-throughput}

Kiedy weryfikacja jest tania, limit gazu może bezpiecznie wzrosnąć. Zwiększa to pojemność sieci i pomaga ustabilizować opłaty w okresach wysokiego popytu. Obecny limit gazu jest częściowo ograniczony przez sprzęt walidatorów — zkEVM usuwa to ograniczenie.

### Silniejsza decentralizacja {#stronger-decentralization}

Dzięki weryfikacji zkEVM walidatory muszą jedynie weryfikować dowody, a nie wykonywać transakcje. To drastycznie obniża wymagania sprzętowe do uruchomienia walidatora, umożliwiając większej liczbie osób uczestnictwo w zabezpieczaniu sieci. Większa różnorodność walidatorów wzmacnia odporność Ethereum na cenzurę i jego ogólną niezawodność.

Należy zauważyć, że samo dowodzenie wymaga znacznych zasobów obliczeniowych, większych niż obecny sprzęt walidatorów. Jednak w przeciwieństwie do walidacji, dowodzenie nie musi być zdecentralizowane w ten sam sposób: potrzebny jest tylko jeden poprawny dowód na blok, a każdy może go szybko zweryfikować. Badania nad rynkami proverów, agregacją dowodów i akceleracją sprzętową mają na celu zapewnienie, że dowodzenie pozostanie konkurencyjne i dostępne, a nie skoncentrowane wśród kilku dużych operatorów.

### Przewidywalna ostateczność {#predictable-finality}

Weryfikacja dowodu działa w stałym czasie, niezależnie od złożoności bloku. Sprawia to, że czas poświadczeń jest bardziej przewidywalny i zmniejsza liczbę pominiętych poświadczeń, które mogą wystąpić, gdy walidatory mają trudności z przetworzeniem złożonych bloków na czas.

## Wyzwania związane z dowodzeniem w czasie rzeczywistym {#realtime-proving}

Głównym wyzwaniem dla weryfikacji zkEVM w L1 jest szybkość. Bloki Ethereum są produkowane co 12 sekund, co oznacza, że dowody muszą być generowane w podobnym przedziale czasowym, aby były użyteczne dla konsensusu.

Obecne implementacje zkEVM mogą potrzebować od kilku minut do kilku godzin na udowodnienie pojedynczego bloku. Badania skupiają się na zniwelowaniu tej luki poprzez:

- **Zrównoleglenie**: Rozdzielenie pracy związanej z dowodzeniem na wiele maszyn.
- **Specjalistyczny sprzęt**: Projektowanie obwodów i sprzętu zoptymalizowanego pod kątem dowodzenia ZK.
- **Ulepszenia algorytmiczne**: Bardziej wydajne systemy dowodzenia i projekty obwodów.
- **Dowodzenie przyrostowe**: Generowanie dowodów w miarę wykonywania transakcji, a nie po ich zakończeniu.

## Obecne badania i implementacje {#current-research}

Fundacja Ethereum finansuje badania nad zkEVM za pośrednictwem zespołu [Privacy Stewards of Ethereum (PSE)](https://pse.dev/). Kluczowe ścieżki badawcze obejmują:

- **Dowodzenie w czasie rzeczywistym**: Generowanie pełnych dowodów bloków w ramach 12-sekundowych slotów.
- **Integracja klientów**: Standaryzacja interfejsów między klientami wykonawczymi a proverami.
- **Zachęty ekonomiczne**: Projektowanie zrównoważonych rynków proverów i struktur opłat.

### Status implementacji {#implementations}

Kilka implementacji zkVM jest obecnie rozwijanych i testowanych pod kątem dowodzenia bloków Ethereum:

| Implementacja | Architektura |
|----------------|--------------|
| [OpenVM](https://github.com/openvm-org/openvm) | rv32im |
| [RISC Zero](https://github.com/risc0/risc0) | rv32im |
| [Airbender](https://github.com/matter-labs/zksync-airbender) | rv32im |
| [Jolt](https://github.com/a16z/jolt) | rv32im |
| [Zisk](https://github.com/0xPolygonHermez/zisk) | rv64ima |

Wykorzystują one maszyny wirtualne oparte na architekturze RISC-V do wykonywania kodu bajtowego EVM, a następnie generują dowody ZK poprawnego wykonania. Aktualne wyniki testów i postępy są śledzone w [trackerze zkVM Fundacji Ethereum](https://zkevm.ethereum.foundation/zkvm-tracker).

## Jak zkEVM łączy się z innymi aktualizacjami {#related-upgrades}

Weryfikacja zkEVM w L1 łączy się z kilkoma innymi elementami mapy drogowej Ethereum:

- **[Drzewa Verkle](/roadmap/verkle-trees/)**: Umożliwiają mniejszych świadków (witnesses) dla weryfikacji bezstanowej, zmniejszając ilość danych, z którymi muszą pracować provery.
- **[Bezstanowość](/roadmap/statelessness/)**: zkEVM jest kluczowym czynnikiem umożliwiającym jej wdrożenie — dzięki dowodom wykonania ZK węzły nie potrzebują pełnego stanu do weryfikacji bloków.
- **[Separacja proponującego i budującego (PBS)](/roadmap/pbs/)**: Budujący bloki mogliby potencjalnie zintegrować generowanie dowodów lub mógłby powstać oddzielny rynek proverów.
- **[Ostateczność w pojedynczym slocie](/roadmap/single-slot-finality/)**: Szybsze generowanie dowodów mogłoby umożliwić ostateczność w pojedynczym slocie z gwarancjami kryptograficznymi.

<Alert variant="warning">
<AlertEmoji text="🧪" />
<AlertContent>
<AlertDescription>
Weryfikacja zkEVM w L1 jest w fazie aktywnych badań i nie została jeszcze zintegrowana z produkcyjnymi klientami Ethereum.
</AlertDescription>
</AlertContent>
</Alert>

## Dalsza lektura {#further-reading}

- [zkEVM Foundation](https://zkevm.ethereum.foundation) – Oficjalne centrum badawcze zkEVM Fundacji Ethereum
- [Ethproofs](https://ethproofs.org/) – Śledź wyścig o udowodnienie Ethereum w czasie rzeczywistym
- [zkevm.fyi](https://zkevm.fyi) – Książka techniczna o zkEVM dla L1
- [PSE zkEVM Specs](https://github.com/privacy-scaling-explorations/zkevm-specs) – Specyfikacje techniczne
- [The Verge](https://vitalik.eth.limo/general/2024/10/23/futures4.html) – Przegląd ulepszeń weryfikacji autorstwa Vitalika
- [EF zkEVM Blog](https://zkevm.ethereum.foundation/blog) – Analiza wydajności od zespołu Fundacji Ethereum