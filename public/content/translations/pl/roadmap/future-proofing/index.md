---
title: "Zabezpieczenie Ethereum na przyszłość i bezpieczeństwo kwantowe kryptografii"
description: "Te aktualizacje ugruntowują pozycję Ethereum jako odpornej, zdecentralizowanej warstwy bazowej na przyszłość, niezależnie od tego, co ona przyniesie."
lang: pl
image: /images/roadmap/roadmap-future.png
alt: "Mapa drogowa Ethereum"
template: roadmap
summaryPoints:
  - Kryptografia postkwantowa zapewnia, że Ethereum przetrwa zaawansowane zagrożenia sprzętowe w miarę rozwoju komputerów kwantowych
  - Uproszczenie protokołu sprawia, że Ethereum jest łatwiejsze w utrzymaniu, audytowaniu i zabezpieczaniu
  - Niedawne aktualizacje już przyniosły znaczącą poprawę wydajności
---

Niektóre części mapy drogowej nie dotyczą skalowania ani zabezpieczania Ethereum w tym momencie. Chodzi w nich o to, aby Ethereum było **stabilne i niezawodne w dalekiej przyszłości**. Oznacza to przygotowanie się na nowe rodzaje zagrożeń i usunięcie niepotrzebnej złożoności z protokołu.

## Odporność na komputery kwantowe {#quantum-resistance}

Ethereum wykorzystuje [kryptografię](/glossary/#cryptography), aby zapewnić bezpieczeństwo sieci i chronić środki użytkowników. Z czasem niektóre z tych metod kryptograficznych staną się **podatne na ataki z użyciem komputerów kwantowych**, które potrafią rozwiązywać określone problemy matematyczne wykładniczo szybciej niż klasyczne maszyny.

**Obecnie żaden komputer kwantowy nie jest w stanie złamać kryptografii Ethereum.** Wymagany do tego sprzęt jeszcze nie istnieje na odpowiednią skalę. Jednak najnowsze badania sugerują, że ta luka zmniejsza się szybciej, niż wcześniej przewidywano. W marcu 2026 r. Google Quantum AI opublikowało artykuł, w którym oszacowano, że złamanie 256-bitowej kryptografii opartej na krzywych eliptycznych (typu używanego przez Ethereum do podpisów kont) może wymagać około 1200 logicznych kubitów, czyli około 20 razy mniej niż we wcześniejszych szacunkach. Google wyznaczyło wewnętrzny termin na 2029 r. na migrację własnych systemów do kryptografii bezpiecznej kwantowo.

Przejścia kryptograficzne wymagają lat planowania i bezpiecznego wdrażania. Ponieważ model bezpieczeństwa Ethereum został zaprojektowany na dziesięciolecia, przygotowania postkwantowe znalazły się w mapie drogowej Ethereum, zanim temat ten trafił na pierwsze strony gazet. Przygotowanie sieci trwa już teraz, aby zapewnić płynne przejście, a nie jako reakcja na sytuację awaryjną.

### Co jest zagrożone? {#what-is-at-risk}

Zidentyfikowano cztery główne obszary kryptografii Ethereum, które wymagają aktualizacji postkwantowych:

1. **Podpisy konsensusu (BLS)**: [Walidatory](/glossary/#validator) używają podpisów BLS, aby oddawać głos na prawidłowe [bloki](/glossary/#block). Komputer kwantowy mógłby sfałszować te podpisy.
2. **Dostępność danych (zobowiązania KZG)**: [Schematy zobowiązań](/roadmap/danksharding/#what-is-kzg), które pomagają w skalowaniu Ethereum, opierają się na matematyce (konkretnie na parowaniu krzywych eliptycznych), która jest podatna na ataki kwantowe.
3. **Podpisy kont (ECDSA)**: Schemat podpisu, który chroni poszczególne konta Ethereum. Kiedy konto wysyła transakcję, jego klucz publiczny jest ujawniany onchain. Komputer kwantowy mógłby wyprowadzić klucz prywatny z tego ujawnionego klucza publicznego, potencjalnie umożliwiając kradzież środków.
4. **Dowody z wiedzą zerową (ZK) w warstwie aplikacji**: Systemy dowodów z wiedzą zerową używane przez rollupy i inne aplikacje opierają się na założeniach kryptograficznych, które komputery kwantowe mogłyby podważyć.

<ExpandableCard title="Czy komputery kwantowe mogą dziś ukraść moje ETH?" eventCategory="/roadmap/future-proofing" eventName="clicked can quantum computers steal my ETH today?">

Nie. Obecnie żaden komputer kwantowy nie jest w stanie złamać kryptografii Ethereum. Prace opisane na tej stronie to przygotowanie na przyszłość, a nie odpowiedź na aktywne zagrożenie. Kiedy portfele postkwantowe staną się dostępne, oprogramowanie portfela przeprowadzi Cię przez proces migracji. Na ten moment nie musisz nic robić.

</ExpandableCard>

### Co jest robione? {#what-is-being-done}

Ethereum jest obecnie najbardziej proaktywnym obrońcą przed zagrożeniami kwantowymi w ekosystemie blockchain. Fundacja Ethereum utworzyła dedykowany **zespół ds. bezpieczeństwa postkwantowego (Post-Quantum Security team)** w styczniu 2026 r., a aktywne prace obejmują wiele zespołów klienckich i grup badawczych. Prace zespołu postkwantowego Fundacji Ethereum można śledzić publicznie na stronie [pq.ethereum.org](https://pq.ethereum.org).

Aktywne prace obejmują:

- **Podpisy oparte na hashu (leanXMSS)**: Bezpieczny kwantowo zamiennik dla podpisów walidatorów, zbudowany na funkcjach hashujących, których komputery kwantowe nie potrafią skutecznie złamać.
- **Minimalna maszyna zkVM (leanVM)**: Ponieważ podpisy bezpieczne kwantowo są większe niż obecnie używane, leanXMSS jest połączony z minimalną maszyną zkVM (leanVM). Ten silnik wydajnie agreguje podpisy bezpieczne kwantowo, kompresując dane 250-krotnie, dzięki czemu sieć pozostaje szybka po przejściu.
- **Cotygodniowe testy interoperacyjności**: Ponad 10 zespołów klienckich uczestniczy w regularnych postkwantowych sieciach deweloperskich (devnetach).
- **Dostępność danych:** Aktualizacja podstawowej kryptografii używanej do obsługi dużych ilości danych sieciowych zapewni, że Ethereum pozostanie szybkie i przystępne cenowo w użyciu bez ryzyka przyszłych luk kwantowych.
- **Nagroda Poseidon**: Nagroda badawcza w wysokości 1 miliona dolarów, której celem jest ulepszenie prymitywów kryptograficznych opartych na hashu.
- **Standardy NIST**: Amerykański Narodowy Instytut Standaryzacji i Technologii (NIST) sfinalizował trzy standardy kryptografii postkwantowej w sierpniu 2024 r. (ML-KEM, ML-DSA, SLH-DSA). Prace nad Ethereum opierają się na tych fundamentach.

Kluczową częścią strategii przejścia jest **EIP-8141**, który wprowadza natywną [abstrakcję konta](/roadmap/account-abstraction/). Pozwala to poszczególnym kontom na wybór własnej weryfikacji podpisu, co oznacza, że użytkownicy mogliby przejść na podpisy bezpieczne kwantowo **bez czekania na jedną migrację obejmującą cały protokół**. EIP-8141 jest rozważany do włączenia w twarde rozwidlenie Hegotá (planowane na drugą połowę 2026 r.).

Fundacja Ethereum nakreśliła ustrukturyzowane kamienie milowe rozwidleń, których celem jest ukończenie podstawowej infrastruktury postkwantowej do około 2029 roku. Są to cele planistyczne, a nie gwarantowane zobowiązania.

[Przeczytaj nasz szczegółowy przewodnik po kryptografii postkwantowej w Ethereum](/roadmap/future-proofing/quantum-resistance/)

## Prostsze i bardziej wydajne Ethereum {#simpler-more-efficient-ethereum}

Złożoność stwarza okazje do powstawania błędów i luk w zabezpieczeniach. Część mapy drogowej skupia się na **uproszczeniu Ethereum i usunięciu długu technicznego**, aby protokół był łatwiejszy w utrzymaniu, audytowaniu i analizowaniu.

### Co zostało wdrożone {#what-has-been-delivered}

Kilka ostatnich aktualizacji sprawiło, że Ethereum stało się prostsze i bardziej wydajne:

- **[Pectra (maj 2025)](/roadmap/pectra/)**: Wprowadzono EIP-7702, który pozwala kontom zewnętrznym (EOA) tymczasowo delegować uprawnienia do kodu inteligentnego kontraktu, co jest krokiem w kierunku pełnej [abstrakcji konta](/roadmap/account-abstraction/). Dodano również prekompilat BLS12-381 (EIP-2537), obsługę depozytów onchain (EIP-6110), dostęp do historycznych hashów bloków w EVM (EIP-2935) oraz zwiększono maksymalne efektywne saldo dla walidatorów (EIP-7251).
- **[Fusaka (grudzień 2025)](/roadmap/fusaka/)**: Wdrożono PeerDAS (EIP-7594), system próbkowania dostępności danych peer-to-peer, który rozkłada obciążenie związane z dostępnością danych w całej sieci. Zwiększono również parametry blobów, zwiększając przepustowość danych dla [rollupów](/glossary/#rollups).
- **[Dencun (marzec 2024)](/roadmap/dencun/)**: Wprowadzono transakcje typu blob (EIP-4844) w celu obniżenia kosztów danych rollupów i ograniczono `SELFDESTRUCT` (EIP-6780), aby usunąć długotrwałe źródło złożoności.
- **[London (sierpień 2021)](/ethereum-forks/#london)**: Przebudowano wycenę [gazu](/glossary/#gas) za pomocą EIP-1559, wprowadzając opłatę podstawową i mechanizm pozwalający spalić część opłat w celu uzyskania bardziej przewidywalnych kosztów transakcji.

### Co jest w trakcie realizacji {#what-is-in-progress}

- **[Glamsterdam (planowane na pierwszą połowę 2026 r.)](/roadmap/glamsterdam/)**: Rozważane do włączenia: wbudowana separacja proponującego i budującego (PBS) (EIP-7732), listy dostępu na poziomie bloku (EIP-7928) oraz zmiana wyceny gazu w celu lepszego dostosowania kosztów do rzeczywistego zużycia zasobów.
- **Hegotá (planowane na drugą połowę 2026 r.)**: Rozważane do włączenia: [drzewa Verkle](/roadmap/verkle-trees/), zastępujące obecną strukturę danych bardziej wydajną, która umożliwia działanie bezstanowych klientów. Planowane jest również włączenie EIP-8141 (natywna abstrakcja konta).
- **W toku**: Wysiłki mające na celu uproszczenie [EVM](/developers/docs/evm/), harmonizację implementacji klientów i wycofywanie przestarzałych funkcji są kontynuowane w całej społeczności deweloperów Ethereum.

## Obecny postęp {#current-progress}

Stan na początek 2026 r.:

**Uproszczenie i wydajność**: Pectra i Fusaka przyniosły rzeczywistą poprawę elastyczności kont, dostępności danych i operacji walidatorów. Glamsterdam i Hegotá są w fazie aktywnego rozwoju z jasnymi celami, aby uczynić sieć bardziej odporną i wydajną, przy jednoczesnym usunięciu zewnętrznych zależności.

**Kryptografia postkwantowa**: Trwają aktywne badania i wczesne wdrożenia. Ekosystem ufundował nagrody badawcze i prowadzi cotygodniowe devnety interoperacyjności dla wielu klientów, oprócz badań prowadzonych przez dedykowany zespół postkwantowy Fundacji Ethereum. Chociaż ustrukturyzowane kamienie milowe rozwidleń zakładają zakończenie prac na około 2029 r., wczesne badania dostarczają namacalnych dowodów na to, że egzekucja postkwantowa jest możliwa już dziś.

**Abstrakcja konta i elastyczność podpisów**: EIP-7702 został wdrożony w aktualizacji Pectra. EIP-8141, rozważany dla Hegotá, pozwoli kontom na korzystanie z dowolnego schematu podpisu, dając użytkownikom możliwość przyjęcia podpisów bezpiecznych kwantowo, zanim pełne przejście protokołu zostanie zakończone.

Żadna część tych prac nie jest jeszcze zakończona. Harmonogramy to cele, a nie gwarancje. Jednak zakres i tempo aktywnego rozwoju stanowią wyraźne zobowiązanie do utrzymania bezpieczeństwa i wydajności Ethereum w dłuższej perspektywie.

**Dalsza lektura**

- [Kryptografia postkwantowa w Ethereum](/roadmap/future-proofing/quantum-resistance/)
- [strawmap.org](https://strawmap.org/) – _Architektura EF_
- [pq.ethereum.org](https://pq.ethereum.org)
- [Gaz](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Struktury danych](/developers/docs/data-structures-and-encoding/)