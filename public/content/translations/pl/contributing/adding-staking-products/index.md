---
title: Dodawanie produktów lub usług stakowania
description: Zasady, które stosujemy podczas dodawania produktów lub usług stakowania na ethereum.org.
lang: pl
---

# Dodawanie produktów lub usług stakowania {#adding-staking-products-or-services}

Chcemy mieć pewność, że udostępniamy najlepsze możliwe zasoby, zapewniając jednocześnie użytkownikom bezpieczeństwo i pewność.

Każdy może zaproponować dodanie produktu lub usługi stakowania na ethereum.org. Jeśli pominęliśmy jakiś produkt, **[zaproponuj go](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml)!**

Obecnie produkty i usługi stakowania wymieniamy na następujących stronach:

- [Stakowanie solo](/staking/solo/)
- [Stakowanie jako usługa](/staking/saas/)
- [Pule stakowania](/staking/pools/)

Mechanizm Dowodu stawki (Proof-of-stake) na Beacon Chain jest aktywny od 1 grudnia 2020 r. Chociaż stakowanie jest wciąż stosunkowo nowe, staraliśmy się stworzyć sprawiedliwe i przejrzyste ramy do rozważenia na ethereum.org, ale kryteria umieszczania na liście będą się zmieniać i ewoluować w czasie i ostatecznie zależą od uznania zespołu strony internetowej ethereum.org.

## Ramy decyzyjne {#the-decision-framework}

Decyzja o umieszczeniu produktu na liście na ethereum.org nie jest zależna od jednego czynnika. Przy podejmowaniu decyzji o umieszczeniu produktu lub usługi na liście bierze się pod uwagę wiele kryteriów łącznie. Im więcej z tych kryteriów zostanie spełnionych, tym większe prawdopodobieństwo, że produkt zostanie umieszczony na liście.

**Po pierwsze, do jakiej kategorii należy produkt lub usługa?**

- Narzędzia dla węzłów lub klientów
- Zarządzanie kluczami
- Usługi stakingowe (SaaS)
- Pula stakingu

Obecnie umieszczamy na liście tylko produkty lub usługi z tych kategorii.

### Kryteria włączenia {#criteria-for-inclusion}

Zgłoszenia produktów lub usług stakowania będą oceniane według następujących kryteriów:

**Kiedy projekt lub usługa zostały uruchomione?**

- Czy istnieją dowody na to, kiedy produkt lub usługa stały się publicznie dostępne?
- Służy to do określenia oceny produktu „sprawdzonego w boju”.

**Czy projekt jest aktywnie utrzymywany?**

- Czy istnieje aktywny zespół rozwijający projekt? Kto jest zaangażowany?
- Pod uwagę będą brane tylko aktywnie utrzymywane produkty.

**Czy produkt lub usługa są wolne od zaufanych/ludzkich pośredników?**

- Które kroki na ścieżce użytkownika wymagają zaufania ludziom, którzy albo przechowują klucze do ich środków, albo prawidłowo dystrybuują nagrody?
- Służy to do określenia oceny produktu lub usługi w kategorii „niewymagający zaufania”.

**Czy projekt dostarcza dokładnych i wiarygodnych informacji?**

- Kluczowe jest, aby strona internetowa produktu zawierała aktualne, dokładne i niewprowadzające w błąd informacje, zwłaszcza jeśli dotyczą one protokołu Ethereum lub innych powiązanych technologii.
- Zgłoszenia zawierające dezinformację, nieaktualne szczegóły lub potencjalnie wprowadzające w błąd oświadczenia na temat Ethereum lub innych istotnych tematów nie zostaną umieszczone na liście lub zostaną z niej usunięte, jeśli już się na niej znajdują.

**Jakie platformy są obsługiwane?**

- tj. Linux, macOS, Windows, iOS, Android

#### Oprogramowanie i inteligentne kontrakty {#software-and-smart-contracts}

Dla każdego niestandardowego oprogramowania lub zaangażowanych inteligentnych kontraktów:

**Czy wszystko jest oprogramowaniem typu open source?**

- Projekty typu open source powinny mieć publicznie dostępne repozytorium kodu źródłowego
- Służy to do określenia oceny produktu w kategorii „open source”.

**Czy produkt zakończył etap rozwoju _beta_?**

- Na jakim etapie cyklu rozwoju znajduje się produkt?
- Produkty w fazie beta nie są brane pod uwagę przy umieszczaniu na liście ethereum.org

**Czy oprogramowanie przeszło zewnętrzny audyt bezpieczeństwa?**

- Jeśli nie, czy planowane jest przeprowadzenie audytu zewnętrznego?
- Służy to do określenia oceny produktu w kategorii „poddany audytowi”.

**Czy projekt ma program nagród za znalezienie błędów?**

- Jeśli nie, czy planowane jest utworzenie programu nagród za znalezienie błędów bezpieczeństwa?
- Służy to do określenia oceny produktu w kategorii „nagrody za błędy”.

#### Narzędzia dla węzłów lub klientów {#node-or-client-tooling}

Dla produktów oprogramowania związanych z konfiguracją, zarządzaniem lub migracją węzłów lub klientów:

**Którzy klienci warstwy konsensusu (tj. Lighthouse, Teku, Nimbus, Prysm, Grandine) są obsługiwani?**

- Którzy klienci są obsługiwani? Czy użytkownik może wybierać?
- Służy to do określenia oceny produktu w kategorii „obsługa wielu klientów”.

#### Stakowanie jako usługa {#staking-as-a-service}

Dla [ofert stakowania jako usługi](/staking/saas/) (tj. delegowana obsługa węzła):

**Jakie są opłaty związane z korzystaniem z usługi?**

- Jaka jest struktura opłat, np. czy za usługę pobierana jest opłata miesięczna?
- Jakieś dodatkowe wymagania dotyczące stakowania?

**Czy użytkownicy muszą zakładać konto?**

- Czy ktoś może korzystać z usługi bez pozwolenia lub KYC?
- Służy to do określenia oceny produktu w kategorii „niewymagający pozwoleń”.

**Kto przechowuje klucze do podpisywania i klucze do wypłat?**

- Do jakich kluczy użytkownik zachowuje dostęp? Do jakich kluczy usługa uzyskuje dostęp?
- Służy to do określenia oceny produktu w kategorii „niewymagający zaufania”.

**Jaka jest różnorodność klientów obsługiwanych węzłów?**

- Jaki procent kluczy walidatora jest uruchamiany przez klienta warstwy konsensusu (CL) stanowiącego większość?
- Według stanu na ostatnią edycję, Prysm jest klientem warstwy konsensusu używanym przez większość operatorów węzłów, co jest niebezpieczne dla sieci. Jeśli jakikolwiek klient CL jest obecnie używany przez ponad 33% sieci, prosimy o dane dotyczące jego wykorzystania.
- Służy to do określenia oceny produktu w kategorii „różnorodność klientów”.

#### Pula stakowania {#staking-pool}

Dla [usług stakowania w puli](/staking/pools/):

**Jaka jest minimalna ilość ETH wymagana do stakowania?**

- np. 0,01 ETH

**Jakie są opłaty lub wymagania dotyczące stakowania?**

- Jaki procent nagród jest pobierany jako opłaty?
- Jakieś dodatkowe wymagania dotyczące stakowania?

**Czy istnieje token płynnościowy?**

- Jakie tokeny są zaangażowane? Jak one działają? Jakie są adresy kontraktów?
- Służy to do określenia oceny produktu w kategorii „token płynnościowy”.

**Czy użytkownicy mogą uczestniczyć jako operatorzy węzłów?**

- Co jest wymagane do uruchomienia klientów walidatorów przy użyciu środków z puli?
- Czy wymaga to zgody osoby fizycznej, firmy lub DAO?
- Służy to do określenia oceny produktu w kategorii „węzły niewymagające pozwoleń”.

**Jaka jest różnorodność klientów wśród operatorów węzłów w puli?**

- Jaki procent operatorów węzłów używa klienta warstwy konsensusu (CL) stanowiącego większość?
- Według stanu na ostatnią edycję, Prysm jest klientem warstwy konsensusu używanym przez większość operatorów węzłów, co jest niebezpieczne dla sieci. Jeśli jakikolwiek klient CL jest obecnie używany przez ponad 33% sieci, prosimy o dane dotyczące jego wykorzystania.
- Służy to do określenia oceny produktu w kategorii „różnorodność klientów”.

### Inne kryteria: mile widziane dodatki {#other-criteria}

**Jakie interfejsy użytkownika są obsługiwane?**

- tj. aplikacja przeglądarkowa, aplikacja desktopowa, aplikacja mobilna, CLI (interfejs wiersza polecenia)

**W przypadku narzędzi dla węzłów, czy oprogramowanie zapewnia łatwy sposób przełączania się między klientami?**

- Czy użytkownik może łatwo i bezpiecznie zmieniać klientów za pomocą tego narzędzia?

**W przypadku SaaS, ilu walidatorów jest obecnie obsługiwanych przez usługę?**

- Daje nam to pojęcie o dotychczasowym zasięgu Państwa usługi.

## Jak wyświetlamy wyniki {#product-ordering}

Powyższe [kryteria włączenia](#criteria-for-inclusion) służą do obliczenia łącznej oceny dla każdego produktu lub usługi. Służy to jako sposób sortowania i prezentowania produktów, które spełniają określone obiektywne kryteria. Im więcej kryteriów, dla których dostarczono dowody, tym wyżej produkt będzie sortowany, a w przypadku remisów kolejność będzie losowa przy każdym załadowaniu strony.

Logika kodu i wagi dla tych kryteriów są obecnie zawarte w [tym komponencie JavaScript](https://github.com/ethereum/ethereum-org-website/blob/dev/src/components/Staking/StakingProductsCardGrid.js#L350) w naszym repozytorium.

## Dodaj swój produkt lub usługę {#add-product}

Jeśli chcesz dodać produkt lub usługę stakowania do ethereum.org, utwórz zgłoszenie na GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml">
  Utwórz zgłoszenie
</ButtonLink>
