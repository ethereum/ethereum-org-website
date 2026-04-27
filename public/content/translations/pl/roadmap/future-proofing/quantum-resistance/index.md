---
title: Kryptografia postkwantowa w Ethereum
description: "Jak Ethereum przygotowuje się na erę postkwantową, co jest podatne na ataki i co jest budowane, aby to chronić."
lang: pl
image: /images/roadmap/roadmap-future.png
alt: "Ethereum roadmap"
template: roadmap
summaryPoints:
  - Komputery kwantowe w końcu zagrożą kryptografii, której Ethereum używa dzisiaj
  - Fundacja Ethereum ma dedykowany zespół badawczy ds. kryptografii postkwantowej oraz ustrukturyzowaną mapę drogową „Lean Ethereum”, której celem jest pełna ochrona postkwantowa do 2029 roku
  - Twoje środki są dziś bezpieczne, a oprogramowanie portfela poprowadzi Cię przez przyszłą migrację
---

Komputery kwantowe w końcu będą w stanie złamać metody kryptograficzne, które dziś zabezpieczają Ethereum i większość innych systemów cyfrowych. Ta strona wyjaśnia, co to oznacza, jak sieć proaktywnie opracowuje ulepszenia w celu zminimalizowania tego ryzyka oraz co musisz wiedzieć.

## Dlaczego kryptografia postkwantowa ma znaczenie {#why-post-quantum-matters}

Ethereum opiera się na kilku formach [kryptografii](/glossary/#cryptography), aby utrzymać bezpieczeństwo sieci i chronić środki użytkowników. Najważniejsze z nich to:

- **Algorytm podpisu cyfrowego opartego na krzywych eliptycznych (ECDSA)**: Kryptografia używana do podpisywania transakcji. Od tego zależy bezpieczeństwo Twojego konta Ethereum.
- **Podpisy BLS**: Używane przez [walidatorów](/glossary/#validator) do osiągnięcia [konsensusu](/glossary/#consensus) co do stanu sieci.
- **Zobowiązania wielomianowe KZG**: Używane do [dostępności danych](/glossary/#data-availability) w mapie drogowej skalowania Ethereum.
- **Systemy dowodów z wiedzą zerową (ZK)**: Używane przez rollupy i inne aplikacje do weryfikacji obliczeń pozałańcuchowo.

Wszystkie one opierają się na strukturach matematycznych, takich jak grupy abelowe, które są trudne dla klasycznych komputerów, ale mogą zostać skutecznie rozwiązane przez komputer kwantowy przy użyciu [algorytmu Shora](https://en.wikipedia.org/wiki/Shor%27s_algorithm).

### Kiedy komputery kwantowe zagrożą Ethereum? {#when-will-quantum-computers-threaten-ethereum}

W marcu 2026 r. Google Quantum AI opublikowało badania szacujące, że złamanie 256-bitowej kryptografii opartej na krzywych eliptycznych (typu, którego Ethereum używa do podpisów kont) może wymagać około 1200 kubitów logicznych. Poprzednie szacunki określały tę liczbę na znacznie wyższym poziomie. Google wyznaczyło wewnętrzny termin na 2029 r. na migrację własnych systemów do kryptografii postkwantowej.

Obecny sprzęt kwantowy jest daleki od tej skali, działając z kilkoma tysiącami zaszumionych kubitów fizycznych. Kubity logiczne (które korygują błędy i wykonują niezawodne obliczenia) wymagają wielu kubitów fizycznych każdy. **Luka między obecnym sprzętem a tym, co jest potrzebne do złamania kryptografii Ethereum, pozostaje znaczna, ale zmniejsza się szybciej, niż wielu oczekiwało.** Co ważne, amerykański Narodowy Instytut Standaryzacji i Technologii (NIST) przewiduje wycofanie ECDSA do 2030 r. i zakazanie go do 2035 r.

Nie jest to bezpośrednie zagrożenie. Jednak przejścia kryptograficzne trwają latami, a model bezpieczeństwa Ethereum został zaprojektowany tak, aby przetrwać stulecia. Odpowiedzią Ethereum jest mapa drogowa **Lean Ethereum**, celowa, wieloletnia misja przebudowy Ethereum wokół prymitywów, które przetrwają każde zagrożenie kryptograficzne.

## Cztery obszary podatne na ataki kwantowe {#four-vulnerable-areas}

W lutym 2026 r. Vitalik Buterin [opublikował mapę drogową](https://x.com/VitalikButerin/status/2027075026378543132) identyfikującą cztery odrębne obszary kryptografii Ethereum, które wymagają aktualizacji postkwantowych. Każdy z nich wiąże się z innymi wyzwaniami i ścieżkami rozwiązań.

### 1. Podpisy BLS w warstwie konsensusu {#consensus-bls}

**Co to robi**: Protokół [dowodu stawki (PoS)](/glossary/#pos) Ethereum używa podpisów BLS do agregacji głosów od setek tysięcy walidatorów. BLS pozwala na połączenie wielu podpisów w jeden, utrzymując wydajność sieci.

**Dlaczego jest to podatne na ataki**: Podpisy BLS opierają się na parowaniach krzywych eliptycznych, które komputer kwantowy mógłby złamać.

**Podejście**: Mapa drogowa Lean Consensus obejmuje opracowanie dwóch uzupełniających się narzędzi:
- **leanXMSS**: Ethereum zastąpi podpisy BLS za pomocą leanXMSS, schematu podpisów opartego na hashach dla walidatorów. Podpisy oparte na hashach są uważane za bezpieczne kwantowo, ponieważ opierają się wyłącznie na bezpieczeństwie funkcji hashujących, które komputery kwantowe osłabiają, ale nie łamią.
- **leanVM**: Minimalna maszyna wirtualna z wiedzą zerową (zkVM) do agregacji podpisów opartej na SNARK. Ponieważ podpisy oparte na hashach są znacznie większe (około 3000 bajtów w porównaniu do 96 bajtów dla BLS), przejście na leanXMSS wygenerowałoby znacznie więcej danych na slot. Aby temu zaradzić, leanVM działa jako silnik agregacji, kompresując dane 250-krotnie. Pozwala to zachować korzyści wydajnościowe wynikające z łączenia wielu podpisów w jeden, nawet po przejściu na schematy bezpieczne kwantowo.

<ExpandableCard title="Dlaczego Ethereum nie może po prostu zastąpić BLS schematem odpornym na ataki kwantowe?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked why cant ethereum just replace BLS?">

Właściwość agregacji, która sprawia, że BLS jest wydajny (łączenie setek tysięcy podpisów w jeden), nie ma oczywistego odpowiednika bezpiecznego kwantowo. Podpisy postkwantowe są również znacznie większe niż podpisy BLS. Zwykła zamiana jednego na drugie sprawiłaby, że warstwa konsensusu Ethereum stałaby się znacznie wolniejsza i droższa. Dlatego zespół buduje leanVM, narzędzie, które wykorzystuje dowody z wiedzą zerową do wydajnej agregacji podpisów bezpiecznych kwantowo.

</ExpandableCard>

### 2. Dostępność danych: Zobowiązania KZG {#data-availability-kzg}

**Co to robi**: Zobowiązania wielomianowe KZG zapewniają, że dane (w szczególności dane [blobów](/glossary/#blob) z rollupów) są dostępne w sieci bez konieczności pobierania ich w całości przez każdy węzeł.

**Dlaczego jest to podatne na ataki**: Zobowiązania KZG opierają się na parowaniach krzywych eliptycznych, tej samej strukturze matematycznej, którą mogą zaatakować komputery kwantowe.

**Obecne środki zaradcze**: Zobowiązania KZG wykorzystują „zaufaną konfigurację”, w której wielu uczestników wniosło losowość. Dopóki co najmniej jeden uczestnik był uczciwy i odrzucił swój sekret, konfiguracja jest bezpieczna, nawet przed komputerami kwantowymi próbującymi odtworzyć ją po fakcie.

**Rozwiązanie długoterminowe**: Zastąpienie KZG schematem zobowiązań bezpiecznym kwantowo. Dwaj wiodący kandydaci to:
- **Zobowiązania oparte na STARK**: Opierają się na funkcjach hashujących, a nie na krzywych eliptycznych. Są już używane w niektórych ZK-rollupach.
- **Zobowiązania oparte na kratach**: Opierają się na trudności problemów kratowych, które uważa się za odporne na ataki kwantowe.

Oba podejścia są nadal badane pod kątem wydajności i praktyczności w skali Ethereum.

### 3. Podpisy kont: ECDSA {#eoa-signatures}

**Co to robi**: Każde standardowe konto Ethereum (konto posiadane zewnętrznie, czyli [EOA](/glossary/#eoa)) używa ECDSA na krzywej secp256k1 do podpisywania transakcji. To właśnie chroni Twoje środki.

**Dlaczego jest to podatne na ataki**: W przypadku każdego konta, które wysłało transakcję, klucz publiczny jest ujawniony onchain. Komputer kwantowy mógłby wyprowadzić klucz prywatny z tych ujawnionych danych klucza publicznego.

**Ważny niuans**: Konta, które tylko otrzymywały ether i nigdy nie wysłały transakcji, nie ujawniły swojego klucza publicznego. Widoczny jest tylko adres (hash klucza publicznego), co zapewnia pewną dodatkową ochronę.

**Podejście**: Zamiast pojedynczej migracji w całym protokole, Ethereum planuje użyć [abstrakcji konta](/roadmap/account-abstraction/) (w szczególności EIP-8141, rozważanego dla Hegotá w drugiej połowie 2026 r.), aby zapewnić użytkownikom **elastyczność podpisów**. Poszczególne konta mogłyby przejść na schemat podpisów postkwantowych bez czekania na zmianę całego protokołu.

Jest to pragmatyczne podejście. Użytkownicy i portfele, którzy chcą wcześnie uzyskać ochronę postkwantową, mogą ją dobrowolnie wdrożyć, podczas gdy szersza migracja będzie następować z czasem.

### 4. Dowody ZK w warstwie aplikacji {#zk-proofs}

**Co to robi**: Systemy dowodów z wiedzą zerową są używane przez rollupy warstwy 2 (L2) i inne aplikacje do weryfikacji obliczeń bez ujawniania podstawowych danych.

**Dlaczego jest to podatne na ataki**: Wiele popularnych systemów dowodów ZK (SNARK wykorzystujące parowania krzywych eliptycznych) opiera się na założeniach podatnych na ataki kwantowe.

**Podejście**: STARK, które opierają się na funkcjach hashujących, a nie na krzywych eliptycznych, są już odporne na ataki kwantowe i są używane przez kilka rollupów. Naturalna adopcja systemów opartych na STARK w ekosystemie już teraz zapewnia bezpieczeństwo postkwantowe w warstwie aplikacji.

## Standardy NIST {#nist-standards}

W sierpniu 2024 r. amerykański Narodowy Instytut Standaryzacji i Technologii (NIST) [sfinalizował trzy standardy kryptografii postkwantowej](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards). Mają one znaczenie, ponieważ dają całej branży technologicznej, w tym Ethereum, wspólny zestaw sprawdzonych algorytmów, na których można budować, zamiast wymyślania własnych przez każdy projekt.

| Standard | Nazwa | Typ | Przypadek użycia |
|----------|------|------|----------|
| FIPS 203 | ML-KEM | Oparty na kratach | Enkapsulacja klucza (wymiana klucza) |
| FIPS 204 | ML-DSA (Dilithium) | Oparty na kratach | Podpisy cyfrowe |
| FIPS 205 | SLH-DSA (SPHINCS+) | Oparty na hashach | Podpisy cyfrowe |

Standardy te stanowią fundament dla przejścia na technologie postkwantowe w szerszej branży. Prace Ethereum opierają się na nich i je rozszerzają, ze szczególnym uwzględnieniem unikalnych wyzwań zdecentralizowanej sieci, w której liczy się wydajność i agregacja.

## Podejście Fundacji Ethereum {#ef-approach}

Fundacja Ethereum utworzyła dedykowany zespół ds. bezpieczeństwa postkwantowego w styczniu 2026 r., kierowany przez Thomasa Coratgera. Prace zespołu można śledzić publicznie na stronie [pq.ethereum.org](https://pq.ethereum.org).

### Bieżąca aktywność (stan na kwiecień 2026 r.) {#current-activity}

- **Cotygodniowe devnety interoperacyjności**: Ponad 10 zespołów klienckich uczestniczy w regularnych testach interoperacyjności postkwantowej, w tym Lighthouse, Grandine, Zeam, Ream Labs i PierTwo.
- **Nagroda Poseidona**: Nagroda badawcza w wysokości 1 miliona dolarów, której celem są ulepszenia w prymitywach kryptograficznych opartych na hashach.
- **Implementacje open-source**: leanXMSS, leanVM, leanSpec (Python), leanSig (Rust) i leanMultisig są dostępne w ramach [organizacji leanEthereum na GitHubie](https://github.com/leanEthereum).
- **Drugie coroczne spotkanie badawcze PQ**: Zaplanowane na 9-12 października 2026 r. w Cambridge w Wielkiej Brytanii.
- **Zgodność z NIST**: Prace Ethereum opierają się na standardach kryptografii postkwantowej sfinalizowanych przez NIST w sierpniu 2024 r. (takich jak ML-KEM, ML-DSA i SLH-DSA).

### Kamienie milowe migracji {#migration-milestones}

Zespół nakreślił serię aktualizacji protokołu w celu stopniowego wprowadzania kryptografii postkwantowej do Ethereum. Są to planowane kamienie milowe, a nie gwarantowane zobowiązania. Nazwy i kolejność mogą ulec zmianie.

| Kamień milowy | Co wprowadza |
|-----------|--------------------|
| I* | Rejestr kluczy PQ. Walidatorzy mogą rejestrować postkwantowe klucze publiczne obok istniejących kluczy BLS. |
| J* | Prekompilacje weryfikacji podpisów PQ. Inteligentne kontrakty i portfele mogą natywnie weryfikować podpisy PQ. |
| L* | Atestacje PQ i dowody warstwy konsensusu w czasie rzeczywistym za pośrednictwem leanVM. Walidatorzy zaczynają używać podpisów PQ do konsensusu. |
| M* | Pełna agregacja podpisów PQ i zobowiązania blobów bezpieczne dla PQ. |

**Cel**: Ustrukturyzowane kamienie milowe rozwidleń (forków) mają na celu ukończenie podstawowej infrastruktury postkwantowej do około 2029 r. Pełna migracja warstwy wykonawczej i ekosystemu wykracza poza ten termin.

## Co muszą zrobić użytkownicy? {#what-users-need-to-do}

**W tej chwili: nic.** Twoje środki są bezpieczne. Żaden dzisiejszy komputer kwantowy nie może zagrozić kryptografii Ethereum.

**W przyszłości**: Gdy schematy podpisów postkwantowych będą szeroko obsługiwane w Ethereum (co jest spodziewane po twardym rozwidleniu Hegotá i wdrożeniu EIP-8141), będziesz chciał zmigrować swoje konto do podpisów bezpiecznych kwantowo. Oprogramowanie portfela poprowadzi Cię przez to przejście.

Jeśli Twoje konto nigdy nie wysłało transakcji (co oznacza, że Twój klucz publiczny nie został ujawniony onchain), ma ono dodatkową warstwę ochrony. Jednak wszystkie konta powinny ostatecznie zostać zmigrowane.

Kwestia tego, jak postępować z uśpionymi portfelami (kontami, których właściciele mogą nie być świadomi konieczności migracji), jest otwartym tematem zarządzania. Społeczność Ethereum nie osiągnęła jeszcze konsensusu w tej sprawie.

## Często zadawane pytania {#faq}

<ExpandableCard title="Czy komputery kwantowe mogą dziś ukraść moje ETH?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked can quantum computers steal my ETH today?">

**Nie.** Żaden dzisiejszy komputer kwantowy nie jest w stanie złamać kryptografii Ethereum. Obecny sprzęt kwantowy jest daleki od wymaganej skali. Prace opisane na tej stronie są przygotowaniem na przyszłość, a nie odpowiedzią na aktywne zagrożenie.

</ExpandableCard>

<ExpandableCard title="Kiedy komputery kwantowe mogą stać się zagrożeniem?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked when could quantum computers become a threat?">

Szacunki są różne. Badania Google z marca 2026 r. sugerują, że sprzęt potrzebny do złamania 256-bitowej kryptografii opartej na krzywych eliptycznych może pojawić się najwcześniej pod koniec tej dekady, ale nadal pozostają poważne wyzwania inżynieryjne. Większość badaczy uważa, że realne zagrożenie to kwestia co najmniej kilku lat. Szczera odpowiedź brzmi: nikt nie zna dokładnego harmonogramu, i właśnie dlatego przygotowanie się już teraz jest tak ważne.

</ExpandableCard>

<ExpandableCard title="Czy będę musiał coś zrobić, aby chronić swój portfel?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked will I need to do anything?">

Ostatecznie tak. Gdy schematy podpisów postkwantowych będą dostępne w Ethereum, użytkownicy będą chcieli zmigrować swoje konta. Oprogramowanie portfela prawdopodobnie zajmie się tym przejściem za Ciebie. Na razie nie musisz nic robić. Kiedy konieczne będzie podjęcie działań, społeczność Ethereum i twórcy portfeli zapewnią jasne wskazówki i narzędzia.

</ExpandableCard>

<ExpandableCard title="A co z moimi tokenami, NFT i pozycjami DeFi?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what about tokens NFTs DeFi?">

Aktywa w Ethereum są kontrolowane przez podpisy kont. Po zmigrowaniu konta do schematu podpisów bezpiecznego kwantowo, wszystko na tym koncie jest chronione. Nie musisz migrować każdego zasobu z osobna. Inteligentne kontrakty przechowujące środki (takie jak protokoły zdecentralizowanych finansów (DeFi)) mogą wymagać własnych aktualizacji w zależności od tego, jakich prymitywów kryptograficznych używają wewnętrznie.

</ExpandableCard>

<ExpandableCard title="Czy Ethereum jest w tej kwestii w tyle za innymi blockchainami?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked is Ethereum behind?">

Nie. Ethereum ma jeden z najbardziej ustrukturyzowanych programów postkwantowych ze wszystkich blockchainów: dedykowany zespół, finansowane badania, cotygodniowe devnety i opublikowaną mapę drogową migracji, traktując obliczenia kwantowe jako pierwszorzędne ograniczenie projektowe. Żaden blockchain nie zakończył jeszcze pełnego przejścia na technologie postkwantowe. Według szacunków Fundacji Ethereum, ekspozycja uśpionych funduszy Ethereum podatnych na ataki kwantowe wynosi około 0,1%, co jest drastycznie niższą wartością niż w przypadku innych głównych sieci blockchain.

</ExpandableCard>

<ExpandableCard title="Czym jest "zbieraj teraz, odszyfruj później"?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what is harvest now decrypt later?">

„Zbierz teraz, odszyfruj później” (ang. Harvest now, decrypt later) to atak, w którym ktoś rejestruje zaszyfrowane dane lub ujawnione klucze publiczne dzisiaj, a następnie łamie szyfrowanie później, gdy powstanie wystarczająco potężny komputer kwantowy. W przypadku Ethereum jest to najbardziej istotne dla kont, których klucze publiczne są już ujawnione onchain (każde konto, które wysłało transakcję). Jest to jeden z powodów, dla których społeczność traktuje migrację postkwantową jako wrażliwą na czas, mimo że zagrożenie kwantowe nie jest jeszcze bezpośrednie.

</ExpandableCard>

## Dalsza lektura {#further-reading}

- [pq.ethereum.org](https://pq.ethereum.org) – _Fundacja Ethereum_
- [Projekt kryptografii postkwantowej](https://pse.dev/projects/post-quantum-cryptography) – _Privacy Stewards of Ethereum (PSE)_
- [Standardy kryptografii postkwantowej NIST](https://csrc.nist.gov/projects/post-quantum-cryptography) – _NIST_
- [Ochrona kryptowalut poprzez odpowiedzialne ujawnianie luk kwantowych](https://research.google/blog/safeguarding-cryptocurrency-by-disclosing-quantum-vulnerabilities-responsibly/) – _Google Quantum AI_
- [Kwantowe granice mogą być bliżej, niż się wydaje](https://blog.google/innovation-and-ai/technology/safety-security/cryptography-migration-timeline/) – _Google_
- [KZG i zaufane konfiguracje](/roadmap/danksharding/#what-is-kzg)
- [Zasoby z warsztatów leanVM + PQ podczas Lean Week Cambridge (2025)](https://github.com/leanEthereum/pm/blob/main/workshops-and-interops/2025/lean-week-cambridge/index.md) – _Lean Ethereum_
- [Rozmowy ACD Breakout dotyczące podpisów transakcji PQ](https://youtube.com/playlist?list=PLJqWcTqh_zKEOum3uR0odkH59fmGUYuZB) – _Fundacja Ethereum_
- [Rozmowy ACD Breakout dotyczące interoperacyjności PQ](https://youtube.com/playlist?list=PLJqWcTqh_zKF_Q9HNXBLW_AtktsjToTIu) – _Fundacja Ethereum_
- [Playlista YouTube: Lean Ethereum i bezpieczeństwo postkwantowe](https://youtube.com/playlist?list=PLJqWcTqh_zKGGuO_q1dgYLsfUoX1sNhWM) – _Fundacja Ethereum_
- [Wywiad panelowy na temat odporności postkwantowej](https://youtu.be/5DRDjeMmOPw) – _Bankless Podcast_
- [Abstrakcja konta w Ethereum](/roadmap/account-abstraction/)
- [strawmap.org](https://strawmap.org/) – _Architektura EF_
- [Superpositioned: Analiza branży obliczeń kwantowych](https://www.superpositioned.co/) – _Saneel Sreeni_