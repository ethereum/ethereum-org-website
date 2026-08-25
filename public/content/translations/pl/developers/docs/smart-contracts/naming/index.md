---
title: "Nazywanie inteligentnych kontraktów"
description: "Najlepsze praktyki dotyczące nazywania inteligentnych kontraktów Ethereum za pomocą ENS"
lang: pl
---

Inteligentne kontrakty są fundamentem zdecentralizowanej infrastruktury Ethereum, umożliwiając działanie autonomicznych aplikacji i protokołów. Jednak mimo rozwoju możliwości kontraktów, użytkownicy i deweloperzy nadal polegają na surowych adresach szesnastkowych, aby identyfikować i odwoływać się do tych kontraktów.

Nazywanie inteligentnych kontraktów za pomocą [Ethereum Name Service (ENS)](https://ens.domains/) poprawia doświadczenia użytkowników poprzez eliminację szesnastkowych adresów kontraktów i zmniejsza ryzyko ataków, takich jak zatruwanie adresów (address poisoning) i spoofing. Ten przewodnik wyjaśnia, dlaczego nazywanie inteligentnych kontraktów ma znaczenie, jak można je wdrożyć oraz jakie narzędzia są dostępne, takie jak [Enscribe](https://www.enscribe.xyz), aby uprościć ten proces i pomóc deweloperom w przyjęciu tej praktyki.

## Dlaczego warto nazywać inteligentne kontrakty? {#why-name-contracts}

### Identyfikatory czytelne dla człowieka {#human-readable-identifiers}

Zamiast wchodzić w interakcje z nieczytelnymi adresami kontraktów, takimi jak `0x8f8e...f9e3`, deweloperzy i użytkownicy mogą używać nazw czytelnych dla człowieka, takich jak `v2.myapp.eth`. Upraszcza to interakcje z inteligentnymi kontraktami.

Jest to możliwe dzięki [Ethereum Name Service](https://ens.domains/), który zapewnia zdecentralizowaną usługę nazewnictwa dla adresów Ethereum. Jest to analogiczne do tego, jak system nazw domen (DNS) umożliwia użytkownikom internetu dostęp do adresów sieciowych za pomocą nazwy, takiej jak ethereum.org, zamiast adresu IP, takiego jak `104.18.176.152`.

### Poprawa bezpieczeństwa i zaufania {#improved-security-and-trust}

Nazwane kontrakty pomagają zmniejszyć liczbę przypadkowych transakcji na niewłaściwy adres. Pomagają również użytkownikom zidentyfikować kontrakty powiązane z konkretnymi aplikacjami lub markami. Dodaje to warstwę zaufania opartego na reputacji, zwłaszcza gdy nazwy są dołączone do znanych domen nadrzędnych, takich jak `uniswap.eth`.

Ze względu na 42-znakową długość adresu Ethereum, użytkownikom bardzo trudno jest zidentyfikować drobne zmiany w adresach, w których zmodyfikowano zaledwie kilka znaków. Na przykład adres taki jak `0x58068646C148E313CB414E85d2Fe89dDc3426870` zostałby normalnie skrócony do `0x580...870` przez aplikacje skierowane do użytkownika, takie jak portfele. Użytkownik prawdopodobnie nie zauważy złośliwego adresu, w którym zmieniono kilka znaków.

Tego typu technika jest stosowana w atakach typu spoofing i zatruwanie adresów, w których użytkownicy są wprowadzani w błąd, wierząc, że wchodzą w interakcję lub wysyłają środki na właściwy adres, podczas gdy w rzeczywistości adres ten tylko przypomina ten właściwy, ale nie jest taki sam.

Nazwy ENS dla portfeli i kontraktów chronią przed tego typu atakami. Podobnie jak ataki DNS spoofing, ataki ENS spoofing również mogą mieć miejsce, jednak użytkownik z większym prawdopodobieństwem zauważy literówkę w nazwie ENS niż drobną modyfikację w adresie szesnastkowym.

### Lepszy UX dla portfeli i eksploratorów {#better-ux}

Gdy inteligentny kontrakt został skonfigurowany z nazwą ENS, aplikacje takie jak portfele i eksploratory blockchain mogą wyświetlać nazwy ENS dla inteligentnych kontraktów zamiast adresów szesnastkowych. Zapewnia to znaczną poprawę doświadczeń użytkownika (UX).

Na przykład, podczas interakcji z aplikacją taką jak Uniswap, użytkownicy zazwyczaj widzą, że aplikacja, z którą wchodzą w interakcję, jest hostowana na stronie internetowej `uniswap.org`, ale zostałby im przedstawiony szesnastkowy adres kontraktu, gdyby Uniswap nie nazwał swoich inteligentnych kontraktów za pomocą ENS. Jeśli kontrakt jest nazwany, zamiast tego mogliby zobaczyć `v4.contracts.uniswap.eth`, co jest znacznie bardziej użyteczne.

## Nazywanie podczas wdrożenia a po wdrożeniu {#when-to-name}

Istnieją dwa momenty, w których można nazwać inteligentne kontrakty:

- **W czasie wdrożenia**: przypisanie nazwy ENS do kontraktu w momencie jego wdrożenia.
- **Po wdrożeniu**: mapowanie istniejącego adresu kontraktu na nową nazwę ENS.

Oba podejścia opierają się na posiadaniu dostępu właściciela lub menedżera do domeny ENS, aby mogli oni tworzyć i ustawiać rekordy ENS.

## Jak działa nazewnictwo ENS dla kontraktów {#how-ens-naming-works}

Nazwy ENS są przechowywane onchain i rozwiązywane na adresy Ethereum za pośrednictwem resolverów ENS. Aby nazwać inteligentny kontrakt:

1. Zarejestruj lub kontroluj nadrzędną domenę ENS (np. `myapp.eth`)
2. Utwórz subdomenę (np. `v1.myapp.eth`)
3. Ustaw rekord `address` subdomeny na adres kontraktu
4. Ustaw rekord odwrotny (reverse record) kontraktu w ENS, aby umożliwić znalezienie nazwy za pomocą jego adresu

Nazwy ENS są hierarchiczne i obsługują nieograniczoną liczbę subdomen. Ustawienie tych rekordów zazwyczaj wiąże się z interakcją z rejestrem ENS i publicznymi kontraktami resolverów.

## Narzędzia do nazywania kontraktów {#tools}

Istnieją dwa podejścia do nazywania inteligentnych kontraktów. Albo przy użyciu [aplikacji ENS](https://app.ens.domains) z pewnymi ręcznymi krokami, albo przy użyciu [Enscribe](https://www.enscribe.xyz). Zostały one opisane poniżej.

### Ręczna konfiguracja ENS {#manual-ens-setup}

Korzystając z [aplikacji ENS](https://app.ens.domains/), deweloperzy mogą ręcznie tworzyć subdomeny i ustawiać rekordy adresów (forward records). Nie mogą jednak ustawić głównej nazwy dla inteligentnego kontraktu poprzez ustawienie rekordu odwrotnego dla nazwy za pośrednictwem aplikacji ENS. Należy podjąć ręczne kroki, które zostały opisane w [dokumentacji ENS](https://docs.ens.domains/web/naming-contracts/).

### Enscribe {#enscribe}

[Enscribe](https://www.enscribe.xyz) upraszcza nazywanie inteligentnych kontraktów za pomocą ENS i zwiększa zaufanie użytkowników do inteligentnych kontraktów. Zapewnia:

- **Atomowe wdrożenie i nazywanie**: Przypisanie nazwy ENS podczas wdrażania nowego kontraktu
- **Nazywanie po wdrożeniu**: Dołączanie nazw do już wdrożonych kontraktów
- **Obsługa wielu łańcuchów**: Działa w sieci Ethereum i sieciach warstwy 2 (L2), w których obsługiwany jest ENS
- **Dane weryfikacyjne kontraktu**: Obejmuje dane weryfikacyjne kontraktu pobierane z wielu źródeł w celu zwiększenia zaufania użytkowników

Enscribe obsługuje nazwy ENS dostarczone przez użytkowników lub własne domeny, jeśli użytkownik nie posiada nazwy ENS.

Możesz uzyskać dostęp do [aplikacji Enscribe](https://app.enscribe.xyz), aby rozpocząć nazywanie i przeglądanie inteligentnych kontraktów.

## Najlepsze praktyki {#best-practices}

- **Używaj jasnych, wersjonowanych nazw**, takich jak `v1.myapp.eth`, aby aktualizacje kontraktów były przejrzyste
- **Ustaw rekordy odwrotne**, aby powiązać kontrakty z nazwami ENS w celu zapewnienia widoczności w aplikacjach takich jak portfele i eksploratory blockchain.
- **Uważnie monitoruj daty wygaśnięcia**, jeśli chcesz zapobiec przypadkowym zmianom własności
- **Weryfikuj kod źródłowy kontraktu**, aby użytkownicy mogli ufać, że nazwany kontrakt zachowuje się zgodnie z oczekiwaniami

## Ryzyka {#risks}

Nazywanie inteligentnych kontraktów zapewnia znaczne korzyści użytkownikom Ethereum, jednak właściciele domen ENS muszą zachować czujność w odniesieniu do zarządzania nimi. Do najważniejszych ryzyk należą:

- **Wygaśnięcie**: Podobnie jak w przypadku nazw DNS, rejestracje nazw ENS mają ograniczony czas trwania. Dlatego ważne jest, aby właściciele monitorowali daty wygaśnięcia swoich domen i odnawiali je z dużym wyprzedzeniem. Zarówno aplikacja ENS, jak i Enscribe zapewniają właścicielom domen wizualne wskaźniki zbliżającego się wygaśnięcia.
- **Zmiana własności**: Rekordy ENS są reprezentowane jako NFT na Ethereum, gdzie właściciel określonej domeny `.eth` posiada powiązany z nią token NFT. W związku z tym, jeśli inne konto przejmie własność tego NFT, nowy właściciel może modyfikować dowolne rekordy ENS według własnego uznania.

Aby zminimalizować takie ryzyko, konto właściciela domen drugiego poziomu (2LD) `.eth` powinno być zabezpieczone za pomocą portfela z wieloma podpisami (multi-sig), a subdomeny powinny być tworzone w celu zarządzania nazewnictwem kontraktów. W ten sposób, w przypadku jakichkolwiek przypadkowych lub złośliwych zmian własności na poziomie subdomeny, mogą one zostać nadpisane przez właściciela 2LD.

## Przyszłość nazewnictwa kontraktów {#future}

Nazywanie kontraktów staje się najlepszą praktyką w tworzeniu zdecentralizowanych aplikacji (dapp), podobnie jak nazwy domen zastąpiły adresy IP w sieci. W miarę jak coraz więcej elementów infrastruktury, takich jak portfele, eksploratory i pulpity nawigacyjne, integruje rozwiązywanie nazw ENS dla kontraktów, nazwane kontrakty poprawią bezpieczeństwo i zmniejszą liczbę błędów w całym ekosystemie.

Sprawiając, że inteligentne kontrakty są łatwiejsze do rozpoznania i zrozumienia, nazewnictwo pomaga wypełnić lukę między użytkownikami a aplikacjami na Ethereum, poprawiając zarówno bezpieczeństwo, jak i UX dla użytkowników.

## Dalsza lektura {#further-reading}

- [Nazywanie inteligentnych kontraktów za pomocą ENS](https://docs.ens.domains/web/naming-contracts/)
- [Nazywanie inteligentnych kontraktów za pomocą Enscribe](https://www.enscribe.xyz/docs).