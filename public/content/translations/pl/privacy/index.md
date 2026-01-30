---
title: "Prywatność na Ethereum"
description: "Narzędzia i techniki ochrony prywatności w Ethereum"
lang: pl
---

# Prywatność na Ethereum {#introduction}

Prywatność jest nie tylko niezbędna dla bezpieczeństwa osobistego, jest także kamieniem węgielnym wolności i kluczowym [gwarantem decentralizacji](https://vitalik.eth.limo/general/2025/04/14/privacy.html). Prywatność daje ludziom możliwość swobodnego wyrażania siebie, zawierania transakcji z innymi i organizowania społeczności. Ale podobnie jak w przypadku wszystkich blockchainów, publiczny rejestr Ethereum utrudnia zachowanie prywatności.

Ethereum jest z założenia przejrzyste. Każde działanie w łańcuchu jest widoczne dla każdego, kto je sprawdzi. Chociaż Ethereum oferuje pseudonimowość poprzez powiązanie Twojej aktywności z [kluczem publicznym](/decentralized-identity/#public-key-cryptography) zamiast z tożsamością w świecie rzeczywistym, wzorce aktywności mogą być analizowane w celu ujawnienia poufnych informacji i identyfikacji użytkowników.

Wbudowanie w Ethereum narzędzi chroniących prywatność może pomóc ludziom, organizacjom i instytucjom w bezpiecznej interakcji, ograniczając jednocześnie niepotrzebną ekspozycję. Dzięki temu ekosystem jest bezpieczniejszy i bardziej praktyczny dla szerszego zakresu zastosowań.

## Prywatność zapisów {#privacy-of-writes}

Domyślnie każda transakcja zapisana na Ethereum jest publiczna i trwała. Obejmuje to nie tylko wysyłanie ETH, ale także rejestrowanie nazw ENS, zbieranie POAP-ów lub handel NFT. Codzienne działania, takie jak płatności, głosowanie czy weryfikacja tożsamości, mogą ujawnić Twoje informacje niepożądanym stronom. Istnieje kilka narzędzi i technik, które mogą pomóc uczynić je bardziej prywatnymi:

### Protokoły mieszające (lub „miksery”) {#mixing-protocols}

Miksery zrywają połączenie między nadawcami a odbiorcami, umieszczając transakcje wielu użytkowników we wspólnej „puli”, a następnie pozwalając ludziom na późniejszą wypłatę na nowy adres. Ponieważ wpłaty i wypłaty są ze sobą pomieszane, obserwatorom znacznie trudniej jest je połączyć.

_Przykłady: [PrivacyPools](https://docs.privacypools.com/), [Tornado Cash](https://tornado.cash/)_

### Pule chronione {#shielded-pools}

Pule chronione są podobne do mikserów, ale pozwalają użytkownikom na prywatne przechowywanie i transferowanie środków wewnątrz samej puli. Zamiast tylko zaciemniać związek między wpłatą a wypłatą, chronione pule utrzymują stały stan prywatny, często zabezpieczony dowodami o zerowej wiedzy. Umożliwia to tworzenie prywatnych transferów, prywatnych sald i nie tylko.

_Przykłady: [Railgun](https://www.railgun.org/), [Aztec](https://aztec.network/), Nightfall_

### Adresy stealth {#stealth-addresses}

[Adres stealth](https://vitalik.eth.limo/general/2023/01/20/stealth.html) jest jak nadanie każdemu nadawcy unikalnej, jednorazowej skrytki pocztowej, którą tylko Ty możesz otworzyć. Za każdym razem, gdy ktoś wysyła Ci kryptowaluty, trafiają one na nowy adres, więc nikt inny nie widzi, że wszystkie te płatności należą do Ciebie. Dzięki temu Twoja historia płatności pozostaje prywatna i trudniejsza do śledzenia.

_Przykłady: [UmbraCash](https://app.umbra.cash/faq), [FluidKey](https://www.fluidkey.com/)_

### Inne przypadki użycia {#other-use-cases}

Inne projekty badające prywatne zapisy to [PlasmaFold](https://pse.dev/projects/plasma-fold) (prywatne płatności) oraz systemy takie jak [MACI](https://pse.dev/projects/maci) i [Semaphore](https://pse.dev/projects/semaphore) (prywatne głosowanie).

Narzędzia te rozszerzają możliwości prywatnego zapisu na Ethereum, ale każde z nich wiąże się z kompromisami. Niektóre podejścia są wciąż eksperymentalne, niektóre zwiększają koszty lub złożoność, a niektóre narzędzia, takie jak miksery, mogą podlegać kontroli prawnej lub regulacyjnej w zależności od sposobu ich wykorzystania.

## Prywatność odczytów {#privacy-of-reads}

Odczytywanie lub sprawdzanie jakichkolwiek informacji na Ethereum (np. salda Twojego portfela) odbywa się zazwyczaj za pośrednictwem usługi takiej jak dostawca portfela, dostawca węzła lub eksplorator bloków. Ponieważ polegasz na nich w kwestii odczytu blockchaina, mogą oni również zobaczyć Twoje żądania wraz z metadanymi, takimi jak adres IP lub lokalizacja. Jeśli stale sprawdzasz to samo konto, informacje te można połączyć, aby powiązać Twoją tożsamość z Twoją aktywnością.

Uruchomienie własnego węzła Ethereum zapobiegłoby temu, ale przechowywanie i synchronizacja całego blockchaina pozostaje kosztowna i niepraktyczna dla większości użytkowników, zwłaszcza na urządzeniach mobilnych.

Niektóre projekty badające prywatne odczyty obejmują [Private Information Retrieval](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (PIR, pobieranie danych bez ujawniania, czego szukasz), [zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (prywatne sprawdzanie tożsamości za pomocą dowodów zerowej wiedzy), [vOPRF](https://pse.dev/projects/voprf) (używanie kont Web2 pseudonimowo w Web3), [vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (obliczanie na zaszyfrowanych danych) i [MachinaIO](https://pse.dev/projects/machina-io) (ukrywanie szczegółów programu przy jednoczesnym zachowaniu funkcjonalności).

## Prywatność udowadniania {#privacy-of-proving}

Dowody z zachowaniem prywatności to narzędzia, których można używać w Ethereum, aby wykazać, że coś jest prawdą, bez ujawniania niepotrzebnych szczegółów. Na przykład możesz:

- Udowodnić, że masz ukończone 18 lat, bez podawania pełnej daty urodzenia
- Udowodnić posiadanie NFT lub tokena bez ujawniania całego portfela
- Udowodnić uprawnienia do członkostwa, nagrody lub głosu bez ujawniania innych danych osobowych

Większość narzędzi do tego celu opiera się na technikach kryptograficznych, takich jak dowody o zerowej wiedzy, ale wyzwaniem jest uczynienie ich na tyle wydajnymi, aby mogły działać na urządzeniach codziennego użytku, były przenośne na dowolną platformę i bezpieczne.

Niektóre projekty badające prywatność dowodzenia obejmują [Client Side Proving](https://pse.dev/projects/client-side-proving) (systemy dowodzenia ZK), [TLSNotary](https://tlsnotary.org/) (dowody autentyczności dla dowolnych danych w sieci), [Mopro](https://pse.dev/projects/mopro) (dowodzenie po stronie klienta mobilnego), [Private Proof Delegation](https://pse.dev/projects/private-proof-delegation) (frameworki delegacji, które unikają założeń dotyczących zaufania) oraz [Noir](https://noir-lang.org/) (język do prywatnych i weryfikowalnych obliczeń).

## Słowniczek prywatności {#privacy-glossary}

**Anonimowość**: interakcja z trwale usuniętymi wszystkimi identyfikatorami z Twoich danych, co uniemożliwia prześledzenie informacji z powrotem do danej osoby

**Szyfrowanie**: proces, który szyfruje dane, tak że tylko ktoś z odpowiednim kluczem może je odczytać

**[W pełni homomorficzne szyfrowanie](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)**: sposób na wykonywanie obliczeń bezpośrednio na zaszyfrowanych danych, bez ich odszyfrowywania

**[Nierozróżnialna obfuskacja](https://pse.dev/projects/machina-io) (iO)**: techniki ochrony prywatności, które sprawiają, że programy lub dane są niezrozumiałe, ale nadal użyteczne

**[Obliczenia wielostronne](https://pse.dev/blog/secure-multi-party-computation) (MPC)**: metody, które pozwalają wielu stronom na wspólne obliczenie wyniku bez ujawniania swoich prywatnych danych wejściowych

**Programowalna kryptografia**: elastyczna, oparta na zasadach kryptografia, którą można dostosować w oprogramowaniu, aby kontrolować, jak i kiedy dane są udostępniane, weryfikowane lub ujawniane

**Pseudonimowość**: używanie unikalnych kodów lub numerów (takich jak adres Ethereum) zamiast osobistych identyfikatorów

**Selektywne ujawnianie**: możliwość udostępniania tylko tego, co jest potrzebne (np. udowodnienie posiadania NFT bez ujawniania całej historii portfela)

**Niepowiązywalność**: upewnienie się, że oddzielne działania na blockchainie nie mogą być powiązane z tym samym adresem

**Weryfikowalność**: zapewnienie, że inni mogą potwierdzić prawdziwość roszczenia, np. poprzez walidację transakcji lub dowodu na Ethereum

**Weryfikowalna delegacja**: przypisanie zadania — np. wygenerowania dowodu — innej stronie (np. portfelowi mobilnemu korzystającemu z serwera do ciężkiej kryptografii), przy jednoczesnym zachowaniu możliwości zweryfikowania, czy zostało ono wykonane poprawnie

**[Dowody o zerowej wiedzy](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKP)**: protokoły kryptograficzne, które pozwalają komuś udowodnić prawdziwość informacji bez ujawniania danych źródłowych

**ZK Rollup**: system skalowalności, który grupuje transakcje poza łańcuchem i przesyła dowód ważności do łańcucha — domyślnie nie jest prywatny, ale umożliwia wydajne systemy prywatności (takie jak pule chronione) poprzez redukcję kosztów

## Zasoby {#resources}

- [Privacy Stewards of Ethereum](https://pse.dev/) (PSE), laboratorium badawczo-rozwojowe Ethereum Foundation, skoncentrowane na prywatności dla ekosystemu
- [Web3PrivacyNow](https://web3privacy.info/), sieć osób, projektów i stowarzyszonych organizacji, które chronią i promują prawa człowieka w Internecie
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/), witryna oceniająca portfele Ethereum, której celem jest udostępnienie kompleksowej listy portfeli, ich funkcjonalności, praktyk i wsparcia dla określonych standardów.
- [Zk-kit](https://zkkit.pse.dev/): Zestaw bibliotek (algorytmów, funkcji użytkowych i struktur danych), które można ponownie wykorzystać w różnych projektach i protokołach zerowej wiedzy.
- [Aplikacje zapewniające prywatność](/apps/categories/privacy/) – odkryj listę wyselekcjonowanych aplikacji zapewniających prywatność, które działają na Ethereum.
