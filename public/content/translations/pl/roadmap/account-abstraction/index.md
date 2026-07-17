---
title: Abstrakcja konta
description: Przegląd planów Ethereum dotyczących uproszczenia i zwiększenia bezpieczeństwa kont użytkowników
lang: pl
summaryPoints:
  - Abstrakcja konta znacznie ułatwia tworzenie portfeli opartych na inteligentnych kontraktach
  - Portfele oparte na inteligentnych kontraktach znacznie ułatwiają zarządzanie dostępem do kont Ethereum
  - Utracone i ujawnione klucze można odzyskać za pomocą wielu kopii zapasowych
---

Większość obecnych użytkowników wchodzi w interakcję z [Ethereum](/) za pomocą **[kont posiadanych zewnętrznie (EOA)](/glossary/#eoa)**. Ogranicza to sposób, w jaki użytkownicy mogą korzystać z Ethereum. Na przykład utrudnia to wykonywanie partii transakcji i wymaga od użytkowników ciągłego utrzymywania salda ETH w celu uiszczania opłat transakcyjnych.

Abstrakcja konta to sposób na rozwiązanie tych problemów poprzez umożliwienie użytkownikom elastycznego programowania większego bezpieczeństwa i lepszych doświadczeń użytkownika na ich kontach. Może się to odbyć poprzez [aktualizację EOA](https://eips.ethereum.org/EIPS/eip-7702) (EIP-7702), aby mogły być kontrolowane przez inteligentne kontrakty. Istnieje również inna ścieżka polegająca na dodaniu [drugiego, oddzielnego systemu transakcji](https://eips.ethereum.org/EIPS/eip-4337) (EIP-4337), który działałby równolegle do istniejącego protokołu. Niezależnie od wybranej drogi, rezultatem jest dostęp do Ethereum za pośrednictwem portfeli opartych na inteligentnych kontraktach, natywnie obsługiwanych jako część istniejącego protokołu lub za pośrednictwem dodatkowej sieci transakcyjnej.

Portfele oparte na inteligentnych kontraktach odblokowują wiele korzyści dla użytkownika, w tym:

- definiowanie własnych, elastycznych zasad bezpieczeństwa
- odzyskiwanie konta w przypadku utraty kluczy
- współdzielenie bezpieczeństwa konta między zaufanymi urządzeniami lub osobami
- opłacanie gazu za kogoś innego lub pozwolenie komuś innemu na opłacenie Twojego
- grupowanie transakcji (np. zatwierdzenie i wykonanie wymiany za jednym zamachem)
- więcej możliwości dla twórców zdecentralizowanych aplikacji (dapp) i portfeli na wprowadzanie innowacji w zakresie doświadczeń użytkownika

Te korzyści nie są obecnie natywnie obsługiwane, ponieważ tylko konta posiadane zewnętrznie ([EOA](/glossary/#eoa)) mogą inicjować transakcje. EOA to po prostu pary kluczy publicznych i prywatnych. Działają one w następujący sposób:

- jeśli masz klucz prywatny, możesz zrobić _wszystko_ w ramach zasad Wirtualnej Maszyny Ethereum (EVM)
- jeśli nie masz klucza prywatnego, nie możesz zrobić _nic_.

Jeśli zgubisz swoje klucze, nie można ich odzyskać, a skradzione klucze dają złodziejom natychmiastowy dostęp do wszystkich środków na koncie.

Portfele oparte na inteligentnych kontraktach są rozwiązaniem tych problemów, ale obecnie są trudne do zaprogramowania, ponieważ ostatecznie każda logika, którą implementują, musi zostać przetłumaczona na zestaw transakcji EOA, zanim będą mogły zostać przetworzone przez Ethereum. Abstrakcja konta umożliwia inteligentnym kontraktom samodzielne inicjowanie transakcji, dzięki czemu każda logika, którą użytkownik chce zaimplementować, może zostać zakodowana w samym portfelu opartym na inteligentnym kontrakcie i wykonana w Ethereum.

Ostatecznie abstrakcja konta poprawia wsparcie dla portfeli opartych na inteligentnych kontraktach, ułatwiając ich tworzenie i zwiększając bezpieczeństwo ich użytkowania. Dzięki abstrakcji konta użytkownicy mogą cieszyć się wszystkimi korzyściami płynącymi z Ethereum bez konieczności rozumienia technologii leżącej u ich podstaw.

## Poza frazami odzyskiwania {#beyond-seed-phrases}

Dzisiejsze konta są zabezpieczone za pomocą kluczy prywatnych, które są obliczane na podstawie fraz odzyskiwania. Każdy, kto ma dostęp do frazy odzyskiwania, może łatwo odkryć klucz prywatny chroniący konto i uzyskać dostęp do wszystkich chronionych przez niego aktywów. Jeśli klucz prywatny i fraza odzyskiwania zostaną utracone, aktywa stają się trwale niedostępne. Zabezpieczenie tych fraz odzyskiwania jest kłopotliwe, nawet dla zaawansowanych użytkowników, a phishing fraz odzyskiwania jest jednym z najczęstszych oszustw.

Abstrakcja konta rozwiązuje ten problem, wykorzystując inteligentny kontrakt do przechowywania aktywów i autoryzacji transakcji. Inteligentne kontrakty mogą zawierać niestandardową logikę dostosowaną do maksymalnego bezpieczeństwa i użyteczności. Użytkownicy nadal używają kluczy prywatnych do kontrolowania dostępu, ale z ulepszonymi środkami bezpieczeństwa.

Na przykład do portfela można dodać klucze zapasowe, co umożliwia wymianę klucza w przypadku naruszenia bezpieczeństwa klucza głównego. Każdy klucz może być zabezpieczony w inny sposób lub rozdzielony między zaufane osoby, co znacznie zwiększa bezpieczeństwo. Dodatkowe reguły portfela mogą złagodzić szkody wynikające z ujawnienia klucza, na przykład wymagając wielu podpisów dla transakcji o dużej wartości lub ograniczając transakcje do zaufanych adresów.

## Lepsze doświadczenie użytkownika {#better-user-experience}

Abstrakcja konta znacznie poprawia doświadczenie użytkownika i bezpieczeństwo, wspierając portfele oparte na inteligentnych kontraktach na poziomie protokołu. Deweloperzy mogą swobodnie wprowadzać innowacje, ulepszając grupowanie transakcji w celu zwiększenia szybkości i wydajności. Proste wymiany mogą stać się operacjami wykonywanymi jednym kliknięciem, co znacznie poprawia łatwość obsługi.

Zarządzanie gazem ulega znacznej poprawie. Aplikacje mogą opłacać opłaty za gaz użytkowników lub umożliwiać płatności w tokenach innych niż ETH, eliminując potrzebę utrzymywania salda ETH.

## Jak zostanie wdrożona abstrakcja konta? {#how-will-aa-be-implemented}

Obecnie portfele oparte na inteligentnych kontraktach są trudne do wdrożenia, ponieważ opierają się na złożonym kodzie opakowującym standardowe transakcje. Ethereum może to zmienić, pozwalając inteligentnym kontraktom na bezpośrednie inicjowanie transakcji, osadzając logikę w inteligentnych kontraktach Ethereum, zamiast polegać na zewnętrznych przekaźnikach.

### EIP-4337: Abstrakcja konta bez zmian w protokole {#eip-4337-account-abstraction-without-protocol-changes}

EIP-4337 umożliwia natywną obsługę portfeli opartych na inteligentnych kontraktach bez modyfikowania głównego protokołu Ethereum. Wprowadza obiekty `UserOperation` zbierane w pakiety transakcji przez walidatorów, upraszczając rozwój portfeli. Kontrakt EntryPoint EIP-4337 został wdrożony w sieci głównej Ethereum 1 marca 2023 r. i ułatwił utworzenie ponad 26 milionów inteligentnych portfeli oraz 170 milionów operacji UserOperations.

## Obecny postęp {#current-progress}

W ramach aktualizacji Pectra w Ethereum, wdrożenie EIP-7702 zaplanowano na 7 maja 2025 r. EIP-4337 został szeroko przyjęty, [z ponad 26 milionami wdrożonych inteligentnych kont i ponad 170 milionami przetworzonych operacji UserOperations](https://www.bundlebear.com/erc4337-overview/all).

## Dalsza lektura {#further-reading}

- [erc4337.io](https://docs.erc4337.io/)
- [Dokumentacja EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Dokumentacja EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)
- [Pulpit nawigacyjny adopcji ERC-4337](https://www.bundlebear.com/erc4337-overview/all)
- [„Droga do abstrakcji konta” według Vitalika](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Blog Vitalika o portfelach z odzyskiwaniem społecznościowym](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Awesome Account Abstraction](https://github.com/4337Mafia/awesome-account-abstraction)