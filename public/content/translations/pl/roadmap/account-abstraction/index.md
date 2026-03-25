---
title: Abstrakcja kont
description: "Przegląd planów Ethereum mających zapewnić prostsze w użytkowaniu i bezpieczniejsze konta użytkowników"
lang: pl
summaryPoints:
  - Abstrakcja kont znacząco ułatwia tworzenie portfeli inteligentnych kontraktów
  - Portfele inteligentnych kontraktów znacząco ułatwiają zarządzanie dostępem do kont Ethereum
  - Zgubione i ujawnione klucze można odzyskać przy użyciu wielu różnych kopii zapasowych
---

# Abstrakcja kont {#account-abstraction}

Większość obecnych użytkowników wchodzi w interakcję z Ethereum za pomocą **[kont zewnętrznych (EOA)](/glossary/#eoa)**. Ogranicza to jednak możliwości interakcji użytkowników z Ethereum. Przykładowo, utrudnia to wysyłanie wielu transakcji naraz i wymaga od użytkowników ciągłego utrzymywania salda ETH, aby móc opłacić opłaty transakcyjne.

Abstrakcja kont jest sposobem rozwiązania tych problemów poprzez pozwalanie użytkownikom na elastyczne zaprogramowanie większego bezpieczeństwa i lepszych doświadczeń użytkownika na ich kontach. Może to zostać osiągnięte poprzez [ulepszenie kont EOA](https://eips.ethereum.org/EIPS/eip-7702) (EIP-7702), aby mogły być kontrolowane przez inteligentne kontrakty. Istnieje również inna ścieżka, polegająca na dodaniu [drugiego, oddzielnego systemu transakcji](https://eips.ethereum.org/EIPS/eip-4337) (EIP-4337), który będzie działał równolegle do istniejącego protokołu. Niezależnie od wybranej metody, rezultatem jest dostęp do Ethereum za pomocą portfeli inteligentnych kontraktów, obsługiwanych natywnie przez istniejący protokół lub przez dodatkową sieć transakcyjną.

Portfele inteligentnych kontraktów odblokowują wiele korzyści dla użytkownika, w tym:

- definiowanie własnych elastycznych zasad bezpieczeństwa
- odzyskanie konta w przypadku utraty kluczy
- udostępnianie zabezpieczeń konta zaufanym urządzeniom lub osobom
- płacenie za cudzy gaz lub na odwrót
- grupowanie transakcji razem (np. zatwierdzanie i wykonywanie wymiany za jednym razem)
- więcej możliwości dla twórców zdecentralizowanych aplikacji i portfeli w zakresie innowacji doświadczeń użytkownika

Korzyści te nie są obecnie natywnie obsługiwane, ponieważ tylko konta zewnętrzne ([EOA](/glossary/#eoa)) mogą rozpoczynać transakcje. EOA to po prostu pary kluczy publiczno-prywatnych. Działają w następujący sposób:

- jeśli masz klucz prywatny, możesz zrobić _wszystko_ w ramach zasad Wirtualnej Maszyny Ethereum (EVM)
- jeśli nie masz klucza prywatnego, nie możesz zrobić _nic_.

Jeśli stracisz swoje klucze, nie będzie można ich odzyskać, a skradzione klucze dają złodziejowi natychmiastowy dostęp do wszystkich środków na Twoim koncie.

Portfele inteligentnych kontraktów są rozwiązaniem tych problemów, ale obecnie trudno je zaprogramować, ponieważ ostatecznie każdą wdrażaną przez nie logikę należy przetłumaczyć na zestaw transakcji EOA, zanim będzie mogła ona zostać przetworzona przez Ethereum. Abstrakcja kont umożliwia inteligentnym kontraktom na samodzielne inicjowanie transakcji, dzięki czemu każda logika, którą użytkownik chce zaimplementować, może zostać zaprogramowana w samym portfelu inteligentnego kontraktu i wykonana na Ethereum.

W ostatecznym rozrachunku abstrakcja kont poprawia wsparcie dla portfeli inteligentnych kontraktów, dzięki czemu będą one łatwiejsze w tworzeniu i bezpieczniejsze w użyciu. Dzięki abstrakcji kont użytkownicy mogą korzystać ze wszystkich zalet Ethereum bez konieczności rozumienia stojących za nim technologii.

## Poza frazami seed {#beyond-seed-phrases}

Dzisiejsze konta są zabezpieczone kluczami prywatnymi, które są obliczane z fraz seed. Każdy z dostępem do tej frazy, może z łatwością poznać klucz prywatny ochraniający konto i uzyskać dostęp do wszystkich aktywów. Jeśli klucz prywatny i fraza seed zostaną utracone, aktywa stają się trwale niedostępne. Zabezpieczenie tych fraz seed jest kłopotliwe nawet dla doświadczonych użytkowników, a wyłudzanie fraz seed jest jednym z najczęstszych oszustw.

Abstrakcja kont rozwiązuje ten problem poprzez użycie inteligentnych kontraktów do przechowywania aktywów i autoryzowania transakcji. Inteligentne kontrakty mogą zawierać niestandardową logikę zapewniającą maksymalne bezpieczeństwo i użyteczność. Użytkownicy nadal używają kluczy prywatnych do kontrolowania dostępu, ale z ulepszonymi środkami bezpieczeństwa.

Przykładowo, do portfela można dodać klucze zapasowe, umożliwiające wymianę klucza głównego w przypadku jego ujawnienia. Każdy klucz może być zabezpieczony w inny sposób lub rozdzielony pomiędzy zaufanymi osobami, co znacznie zwiększa bezpieczeństwo. Dodatkowe reguły portfela mogą ograniczać skutki wynikające z ujawnienia klucza, na przykład poprzez wymaganie wielu podpisów przy transakcjach o wysokiej wartości lub ograniczanie transakcji tylko do zaufanych adresów.

## Lepsze wrażenia użytkownika {#better-user-experience}

Abstrakcja kont znacząco poprawia doświadczenia użytkowników i bezpieczeństwo, dzięki natywnemu wsparciu portfeli inteligentnych kontraktów na poziomie protokołu. Deweloperzy zyskują swobodę innowacji, mogąc usprawniać łączenie transakcji dla większej szybkości i wydajności. Proste wymiany mogą stać się operacjami wymagającymi tylko jednego kliknięcia, co znacznie poprawia łatwość korzystania.

Zarządzanie gazem również ulega dużej poprawie. Aplikacje mogą płacić opłaty za gaz za użytkowników lub umożliwiać jego opłacanie w tokenach innych niż ETH, eliminując konieczność utrzymywania salda ETH.

## W jaki sposób wdrożona zostanie abstrakcja kont? {#how-will-aa-be-implemented}

Obecnie wdrożenie portfeli inteligentnych kontraktów jest trudne, ponieważ opierają się one na złożonym kodzie opakowującym standardowe transakcje. Ethereum może to zmienić, umożliwiając inteligentnym kontraktom bezpośrednio inicjować transakcje, osadzając logikę w inteligentnych kontraktach Ethereum, zamiast polegać na zewnętrznych przekaźnikach.

### EIP-4337: Abstrakcja kont bez zmian w protokole

EIP-4337 umożliwia natywną obsługę portfeli inteligentnych kontraktów bez modyfikacji głównego protokołu Ethereum. Wprowadza obiekty `UserOperation`, które są zbierane w pakiety transakcji przez walidatorów, co upraszcza rozwój portfeli. Kontrakt EntryPoint EIP-4337 został wdrożony do sieci głównej Ethereum 1 marca 2023 roku i od tego czasu umożliwił stworzenie ponad 26 milionów inteligentnych portfeli oraz ponad 170 milionów obiektów UserOperation.

## Aktualny postęp {#current-progress}

EIP-7702 zostanie wdrożony 7 maja 2025 roku w ramach aktualizacji Ethereum o nazwie Pectra. EIP-4337 został szeroko przyjęty – [wdrożono ponad 26 milionów inteligentnych kont i przetworzono ponad 170 milionów obiektów UserOperation](https://www.bundlebear.com/erc4337-overview/all).

## Dalsza lektura {#further-reading}

- [erc4337.io](https://docs.erc4337.io/)
- [Dokumentacja EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Dokumentacja EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)
- [Panel adopcji ERC-4337](https://www.bundlebear.com/erc4337-overview/all)
- ["Droga do abstrakcji kont" Vitalika](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Blog Vitalika o portfelach z odzyskiwaniem społecznościowym](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Awesome Account Abstraction](https://github.com/4337Mafia/awesome-account-abstraction)
