---
title: Prywatność w Ethereum
description: Narzędzia i techniki ochrony prywatności w Ethereum
lang: pl
---

Prywatność jest nie tylko niezbędna dla bezpieczeństwa osobistego, ale stanowi fundament wolności i kluczowy [gwarant decentralizacji](https://vitalik.eth.limo/general/2025/04/14/privacy.html). Prywatność daje ludziom możliwość swobodnego wyrażania siebie, przeprowadzania transakcji z innymi i organizowania społeczności. Jednak, podobnie jak w przypadku wszystkich blockchainów, publiczny rejestr Ethereum sprawia, że zachowanie prywatności jest wyzwaniem.

Ethereum jest z założenia przejrzyste. Każde działanie onchain jest widoczne dla każdego, kto zechce je sprawdzić. Chociaż Ethereum oferuje pseudonimowość poprzez powiązanie Twojej aktywności z [kluczem publicznym](/decentralized-identity/#public-key-cryptography) zamiast z prawdziwą tożsamością, wzorce aktywności mogą być analizowane w celu ujawnienia poufnych informacji i identyfikacji użytkowników.

Wbudowanie w Ethereum narzędzi chroniących prywatność może pomóc ludziom, organizacjom i instytucjom w bezpiecznej interakcji przy jednoczesnym ograniczeniu niepotrzebnego ujawniania danych. Sprawia to, że ekosystem jest bezpieczniejszy i bardziej praktyczny w szerszym zakresie przypadków użycia.

<VideoWatch slug="privacy-is-existential" />

## Prywatność przy zapisie {#privacy-of-writes}

Domyślnie każda transakcja zapisana w Ethereum jest publiczna i trwała. Obejmuje to nie tylko wysyłanie ETH, ale także rejestrowanie nazw ENS, zbieranie POAP-ów czy handel NFT. Codzienne czynności, takie jak płatności, głosowanie czy weryfikacja tożsamości, mogą ujawnić Twoje informacje niepowołanym stronom. Istnieje kilka narzędzi i technik, które mogą pomóc w zwiększeniu ich prywatności:

### Protokoły miksujące (lub „miksery”) {#mixing-protocols}

Miksery zrywają powiązanie między nadawcami a odbiorcami, umieszczając transakcje wielu użytkowników we wspólnej „puli”, a następnie pozwalając im na późniejszą wypłatę na nowy adres. Ponieważ depozyty i wypłaty są ze sobą wymieszane, obserwatorom znacznie trudniej jest je powiązać.

_Przykłady: [PrivacyPools](https://docs.privacypools.com/), [Tornado Cash](https://tornado.cash/)_

### Pule osłonięte {#shielded-pools}

Pule osłonięte są podobne do mikserów, ale pozwalają użytkownikom na prywatne przechowywanie i transfer środków wewnątrz samej puli. Zamiast tylko ukrywać powiązanie między depozytem a wypłatą, pule osłonięte utrzymują ciągły prywatny stan, często zabezpieczony dowodami z wiedzą zerową. Umożliwia to tworzenie prywatnych transferów, prywatnych sald i nie tylko.

_Przykłady: [Railgun](https://www.railgun.org/), [Aztec](https://aztec.network/), Nightfall_

### Adresy ukryte {#stealth-addresses}

[Adres ukryty](https://vitalik.eth.limo/general/2023/01/20/stealth.html) jest jak podanie każdemu nadawcy unikalnej, jednorazowej skrytki pocztowej, którą tylko Ty możesz otworzyć. Za każdym razem, gdy ktoś wysyła Ci krypto, trafia ono na nowy adres, więc nikt inny nie może zobaczyć, że wszystkie te płatności należą do Ciebie. Dzięki temu Twoja historia płatności pozostaje prywatna i trudniejsza do wyśledzenia.

_Przykłady: [UmbraCash](https://app.umbra.cash/faq), [FluidKey](https://www.fluidkey.com/)_

### Inne przypadki użycia {#other-use-cases}

Inne projekty badające prywatne zapisy to [PlasmaFold](https://pse.dev/projects/plasma-fold) (prywatne płatności) oraz systemy takie jak [MACI](https://pse.dev/projects/maci) i [Semaphore](https://pse.dev/projects/semaphore) (prywatne głosowanie).

Narzędzia te rozszerzają możliwości prywatnego zapisu w Ethereum, ale każde z nich wiąże się z kompromisami. Niektóre podejścia są wciąż eksperymentalne, inne zwiększają koszty lub złożoność, a niektóre narzędzia, takie jak miksery, mogą podlegać kontroli prawnej lub regulacyjnej w zależności od tego, jak są używane.

## Prywatność przy odczycie {#privacy-of-reads}

Odczytywanie lub sprawdzanie jakichkolwiek informacji w Ethereum (np. salda Twojego portfela) zazwyczaj odbywa się za pośrednictwem usługi, takiej jak dostawca portfela, dostawca węzła lub eksplorator bloków. Ponieważ polegasz na nich w kwestii odczytu blockchaina, mogą oni również zobaczyć Twoje żądania wraz z metadanymi, takimi jak Twój adres IP lub lokalizacja. Jeśli ciągle sprawdzasz to samo konto, informacje te można połączyć, aby powiązać Twoją tożsamość z Twoją aktywnością.

Uruchomienie własnego węzła Ethereum zapobiegłoby temu, ale przechowywanie i synchronizacja pełnego blockchaina pozostaje kosztowna i niepraktyczna dla większości użytkowników, zwłaszcza na urządzeniach mobilnych.

Niektóre projekty badające prywatne odczyty obejmują [Private Information Retrieval](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (PIR, pobieranie danych bez ujawniania tego, czego szukasz), [zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (prywatne sprawdzanie tożsamości za pomocą dowodów z wiedzą zerową), [vOPRF](https://pse.dev/projects/voprf) (pseudonimowe korzystanie z kont Web2 w Web3), [vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (obliczenia na zaszyfrowanych danych) oraz [MachinaIO](https://pse.dev/projects/machina-io) (ukrywanie szczegółów programu przy zachowaniu funkcjonalności).

## Prywatność przy dowodzeniu {#privacy-of-proving}

Dowody chroniące prywatność to narzędzia, których możesz użyć w Ethereum, aby wykazać, że coś jest prawdą, bez ujawniania niepotrzebnych szczegółów. Na przykład możesz:

- Udowodnić, że masz ukończone 18 lat, bez udostępniania pełnej daty urodzenia
- Udowodnić własność NFT lub tokena bez ujawniania całego swojego portfela
- Udowodnić uprawnienia do członkostwa, nagrody lub głosu bez ujawniania innych danych osobowych

Większość narzędzi do tego celu opiera się na technikach kryptograficznych, takich jak dowody z wiedzą zerową, ale wyzwaniem jest uczynienie ich wystarczająco wydajnymi, aby działały na urządzeniach codziennego użytku, przenośnymi na dowolną platformę i bezpiecznymi.

Niektóre projekty badające prywatność przy dowodzeniu obejmują [Client Side Proving](https://pse.dev/projects/client-side-proving) (systemy dowodzenia ZK), [TLSNotary](https://tlsnotary.org/) (dowody autentyczności dla dowolnych danych w sieci), [Mopro](https://pse.dev/projects/mopro) (mobilne dowodzenie po stronie klienta), [Private Proof Delegation](https://pse.dev/projects/private-proof-delegation) (frameworki do delegowania, które unikają założeń dotyczących zaufania) oraz [Noir](https://noir-lang.org/) (język do prywatnych i weryfikowalnych obliczeń).

## Słowniczek prywatności {#privacy-glossary}

**Anonimowy**: Interakcja z trwałym usunięciem wszystkich identyfikatorów z Twoich danych, co uniemożliwia powiązanie informacji z konkretną osobą

**Szyfrowanie**: Proces, który miesza dane w taki sposób, że tylko osoba posiadająca odpowiedni klucz może je odczytać

**[W pełni homomorficzne szyfrowanie](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)**: Sposób wykonywania obliczeń bezpośrednio na zaszyfrowanych danych, bez ich uprzedniego deszyfrowania

**[Nierozróżnialne zaciemnianie](https://pse.dev/projects/machina-io) (iO)**: Techniki prywatności, które sprawiają, że programy lub dane są niezrozumiałe, ale nadal użyteczne

**[Obliczenia wielostronne](https://pse.dev/blog/secure-multi-party-computation) (MPC)**: Metody, które pozwalają wielu stronom wspólnie obliczyć wynik bez ujawniania ich prywatnych danych wejściowych

**Programowalna kryptografia**: Elastyczna, oparta na regułach kryptografia, którą można dostosować w oprogramowaniu, aby kontrolować, jak i kiedy dane są udostępniane, weryfikowane lub ujawniane

**Pseudonimowy**: Używanie unikalnych kodów lub numerów (takich jak adres Ethereum) zamiast identyfikatorów osobistych

**Selektywne ujawnianie**: Możliwość udostępniania tylko tego, co jest potrzebne (np. udowodnienie, że posiadasz NFT bez ujawniania całej historii portfela)

**Brak możliwości powiązania (Unlinkability)**: Upewnienie się, że oddzielne działania na blockchainie nie mogą być powiązane z tym samym adresem

**Weryfikowalność**: Zapewnienie, że inni mogą potwierdzić prawdziwość roszczenia, na przykład poprzez walidację transakcji lub dowodu w Ethereum

**Weryfikowalne delegowanie**: Przypisanie zadania — takiego jak wygenerowanie dowodu — innej stronie (np. portfelowi mobilnemu korzystającemu z serwera do ciężkiej kryptografii) przy jednoczesnej możliwości zweryfikowania, czy zostało ono wykonane poprawnie

**[Dowody z wiedzą zerową](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKP)**: Protokoły kryptograficzne, które pozwalają komuś udowodnić, że informacja jest prawdziwa, bez ujawniania podstawowych danych

**ZK Rollup**: System skalowalności, który grupuje transakcje pozałańcuchowo i przesyła dowód ważności onchain — domyślnie nie jest prywatny, ale umożliwia wydajne systemy prywatności (takie jak pule osłonięte) poprzez redukcję kosztów

## Zasoby {#resources}

- [Privacy Stewards of Ethereum](https://pse.dev/) (PSE), laboratorium badawczo-rozwojowe Fundacji Ethereum skupiające się na prywatności w ekosystemie
- [Web3PrivacyNow](https://web3privacy.info/), sieć ludzi, projektów i sprzymierzonych organizacji, które chronią i promują prawa człowieka w internecie
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/), strona z ocenami portfeli Ethereum, której celem jest dostarczenie kompleksowej listy portfeli, ich funkcjonalności, praktyk i wsparcia dla określonych standardów.
- [Zk-kit](https://zkkit.org/): Zestaw bibliotek (algorytmów, funkcji narzędziowych i struktur danych), które można ponownie wykorzystać w różnych projektach i protokołach z wiedzą zerową.
- [Privacy Apps](/apps/categories/privacy/) – Odkryj wyselekcjonowaną listę aplikacji chroniących prywatność, które działają w Ethereum.
