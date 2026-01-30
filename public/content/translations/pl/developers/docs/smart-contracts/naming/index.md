---
title: Nazywanie inteligentnych kontraktów
description: Najlepsze praktyki nazywania inteligentnych kontraktów Ethereum za pomocą ENS
lang: pl
---

Inteligentne kontrakty są podstawą zdecentralizowanej infrastruktury Ethereum, umożliwiając tworzenie autonomicznych aplikacji i protokołów. Jednak nawet w miarę ewolucji możliwości kontraktów użytkownicy i deweloperzy wciąż polegają na surowych adresach szesnastkowych do identyfikacji i odwoływania się do tych kontraktów.

Nazywanie inteligentnych kontraktów za pomocą [Usługi nazw Ethereum (ENS)](https://ens.domains/) poprawia doświadczenie użytkownika poprzez eliminację szesnastkowych adresów kontraktów i zmniejsza ryzyko ataków, takich jak zatruwanie adresów i ataki typu spoofing. Ten poradnik wyjaśnia, dlaczego nazywanie inteligentnych kontraktów jest ważne, jak można to wdrożyć oraz jakie narzędzia, takie jak [Enscribe](https://www.enscribe.xyz), są dostępne, aby uprościć ten proces i pomóc deweloperom wdrożyć tę praktykę.

## Dlaczego nazywać inteligentne kontrakty? {#why-name-contracts}

### Identyfikatory czytelne dla człowieka {#human-readable-identifiers}

Zamiast wchodzić w interakcje z nieprzejrzystymi adresami kontraktów, takimi jak `0x8f8e...f9e3`, deweloperzy i użytkownicy mogą używać czytelnych dla człowieka nazw, takich jak `v2.myapp.eth`. To upraszcza interakcje z inteligentnymi kontraktami.

Jest to możliwe dzięki [Usłudze nazw Ethereum](https://ens.domains/), która zapewnia zdecentralizowaną usługę nazewnictwa dla adresów Ethereum. Jest to analogiczne do sposobu, w jaki System Nazw Domen (DNS) umożliwia użytkownikom internetu dostęp do adresów sieciowych za pomocą nazwy, takiej jak ethereum.org, zamiast adresu IP, takiego jak `104.18.176.152`.

### Poprawa bezpieczeństwa i zaufania {#improved-security-and-trust}

Nazwane kontrakty pomagają zredukować liczbę przypadkowych transakcji na zły adres. Pomagają również użytkownikom identyfikować kontrakty powiązane z określonymi aplikacjami lub markami. Dodaje to warstwę zaufania opartego na reputacji, zwłaszcza gdy nazwy są dołączone do znanych domen nadrzędnych, takich jak `uniswap.eth`.

Ze względu na 42-znakową długość adresu Ethereum, użytkownikom bardzo trudno jest zidentyfikować niewielkie zmiany w adresach, w których zmodyfikowano kilka znaków. Na przykład adres taki jak `0x58068646C148E313CB414E85d2Fe89dDc3426870` zostałby normalnie skrócony do `0x580...870` przez aplikacje dla użytkowników, takie jak portfele. Jest mało prawdopodobne, że użytkownik zauważy złośliwy adres, w którym zmieniono kilka znaków.

Ten rodzaj techniki jest wykorzystywany w atakach typu spoofing i zatruwania adresów, w których użytkownicy są wprowadzani w błąd, że wchodzą w interakcję lub wysyłają środki na właściwy adres, podczas gdy w rzeczywistości adres ten tylko przypomina właściwy adres, ale nie jest taki sam.

Nazwy ENS dla portfeli i kontraktów chronią przed tego typu atakami. Podobnie jak ataki typu DNS spoofing, ataki typu ENS spoofing również mogą mieć miejsce, jednak użytkownik z większym prawdopodobieństwem zauważy błąd w nazwie ENS niż niewielką modyfikację w adresie szesnastkowym.

### Lepszy UX dla portfeli i eksploratorów {#better-ux}

Gdy inteligentny kontrakt został skonfigurowany z nazwą ENS, aplikacje, takie jak portfele i eksploratory blockchain, mogą wyświetlać nazwy ENS dla inteligentnych kontraktów zamiast adresów szesnastkowych. Zapewnia to znaczną poprawę doświadczenia użytkownika (UX).

Na przykład, podczas interakcji z aplikacją taką jak Uniswap, użytkownicy zazwyczaj widzą, że aplikacja, z którą wchodzą w interakcję, jest hostowana na stronie internetowej `uniswap.org`, ale zostanie im przedstawiony szesnastkowy adres kontraktu, jeśli Uniswap nie nazwał swoich inteligentnych kontraktów za pomocą ENS. Jeśli kontrakt jest nazwany, zamiast tego mogliby zobaczyć `v4.contracts.uniswap.eth`, co jest o wiele bardziej użyteczne.

## Nazywanie podczas wdrożenia a nazywanie po wdrożeniu {#when-to-name}

Istnieją dwa momenty, w których można nadać nazwę inteligentnym kontraktom:

- **W momencie wdrożenia**: przypisanie nazwy ENS do kontraktu w trakcie jego wdrażania.
- **Po wdrożeniu**: mapowanie istniejącego adresu kontraktu na nową nazwę ENS.

Oba podejścia opierają się na posiadaniu dostępu właściciela lub menedżera do domeny ENS, aby móc tworzyć i ustawiać rekordy ENS.

## Jak działa nazywanie kontraktów za pomocą ENS {#how-ens-naming-works}

Nazwy ENS są przechowywane w łańcuchu i są rozwiązywane na adresy Ethereum za pomocą resolverów ENS. Aby nadać nazwę inteligentnemu kontraktowi:

1. Zarejestruj lub kontroluj nadrzędną domenę ENS (np. `myapp.eth`)
2. Utwórz subdomenę (np. `v1.myapp.eth`)
3. Ustaw rekord `address` subdomeny na adres kontraktu
4. Ustaw rekord odwrotny kontraktu na ENS, aby umożliwić znalezienie nazwy za pomocą jej adresu

Nazwy ENS są hierarchiczne i obsługują nieograniczoną liczbę subdomen. Ustawianie tych rekordów zazwyczaj wiąże się z interakcją z kontraktami rejestru ENS i publicznego resolvera.

## Narzędzia do nazywania kontraktów {#tools}

Istnieją dwa podejścia do nazywania inteligentnych kontraktów. Można użyć [aplikacji ENS](https://app.ens.domains), wykonując kilka ręcznych kroków, lub użyć [Enscribe](https://www.enscribe.xyz). Zostały one opisane poniżej.

### Ręczna konfiguracja ENS {#manual-ens-setup}

Korzystając z [aplikacji ENS](https://app.ens.domains/), deweloperzy mogą ręcznie tworzyć subdomeny i ustawiać rekordy adresu docelowego. Nie mogą jednak ustawić podstawowej nazwy dla inteligentnego kontraktu poprzez ustawienie rekordu odwrotnego dla nazwy za pośrednictwem aplikacji ENS. Należy wykonać ręczne kroki, które są opisane w [dokumentacji ENS](https://docs.ens.domains/web/naming-contracts/).

### Enscribe {#enscribe}

[Enscribe](https://www.enscribe.xyz) upraszcza nazywanie inteligentnych kontraktów za pomocą ENS i zwiększa zaufanie użytkowników do inteligentnych kontraktów. Zapewnia:

- **Atomowe wdrożenie i nazwanie**: przypisz nazwę ENS podczas wdrażania nowego kontraktu
- **Nazywanie po wdrożeniu**: dołączanie nazw do już wdrożonych kontraktów
- **Obsługa wielu łańcuchów**: działa w sieciach Ethereum i L2, w których obsługiwane jest ENS
- **Dane weryfikacyjne kontraktu**: zawiera dane weryfikacyjne kontraktu pobierane z wielu źródeł w celu zwiększenia zaufania użytkowników

Enscribe obsługuje nazwy ENS dostarczone przez użytkowników lub własne domeny, jeśli użytkownik nie ma nazwy ENS.

Możesz uzyskać dostęp do [aplikacji Enscribe](https://app.enscribe.xyz), aby rozpocząć nazywanie i przeglądanie inteligentnych kontraktów.

## Najlepsze praktyki {#best-practices}

- **Używaj jasnych, wersjonowanych nazw**, takich jak `v1.myapp.eth`, aby aktualizacje kontraktów były przejrzyste
- **Ustaw rekordy odwrotne**, aby połączyć kontrakty z nazwami ENS w celu zapewnienia widoczności w aplikacjach, takich jak portfele i eksploratory blockchain.
- **Dokładnie monitoruj daty wygaśnięcia**, jeśli chcesz zapobiec przypadkowym zmianom własności
- **Weryfikuj źródło kontraktu**, aby użytkownicy mogli ufać, że nazwany kontrakt zachowuje się zgodnie z oczekiwaniami

## Zagrożenia {#risks}

Nazywanie inteligentnych kontraktów zapewnia znaczne korzyści dla użytkowników Ethereum, jednak właściciele domen ENS muszą być czujni w odniesieniu do zarządzania nimi. Do istotnych zagrożeń należą:

- **Wygaśnięcie**: podobnie jak w przypadku nazw DNS, rejestracje nazw ENS mają ograniczony czas trwania. Dlatego ważne jest, aby właściciele monitorowali daty wygaśnięcia swoich domen i odnawiali je z dużym wyprzedzeniem. Zarówno aplikacja ENS, jak i Enscribe zapewniają właścicielom domen wizualne wskaźniki zbliżającego się terminu wygaśnięcia.
- **Zmiana właściciela**: rekordy ENS są reprezentowane jako NFT na Ethereum, gdzie właściciel określonej domeny `.eth` posiada powiązane z nią NFT. Dlatego też, jeśli inne konto przejmie własność tego NFT, nowy właściciel może modyfikować dowolne rekordy ENS według własnego uznania.

Aby złagodzić takie ryzyko, konto właściciela domen `.eth` drugiego poziomu (2LD) powinno być zabezpieczone za pomocą portfela multi-sig, a do zarządzania nazwami kontraktów powinny być tworzone subdomeny. W ten sposób w przypadku jakichkolwiek przypadkowych lub złośliwych zmian własności na poziomie subdomeny mogą one zostać nadpisane przez właściciela 2LD.

## Przyszłość nazywania kontraktów {#future}

Nazywanie kontraktów staje się najlepszą praktyką w rozwoju dappek, podobnie jak nazwy domen zastąpiły adresy IP w internecie. W miarę jak coraz więcej elementów infrastruktury, takich jak portfele, eksploratory i pulpity nawigacyjne, będzie integrować rozwiązywanie nazw ENS dla kontraktów, nazwane kontrakty poprawią bezpieczeństwo i zmniejszą liczbę błędów w całym ekosystemie.

Ułatwiając rozpoznawanie i rozumowanie inteligentnych kontraktów, nadawanie im nazw pomaga zmniejszyć lukę między użytkownikami a aplikacjami na Ethereum, poprawiając zarówno bezpieczeństwo, jak i wrażenia użytkownika (UX).

## Dalsza lektura {#further-reading}

- [Nazywanie inteligentnych kontraktów za pomocą ENS](https://docs.ens.domains/web/naming-contracts/)
- [Nazywanie inteligentnych kontraktów za pomocą Enscribe](https://www.enscribe.xyz/docs).
