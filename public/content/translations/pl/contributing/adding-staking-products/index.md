---
title: Dodawanie produktów lub usług stakingowych
description: Zasady, którymi się kierujemy przy dodawaniu produktów lub usług stakingowych do ethereum.org
lang: pl
---

Chcemy mieć pewność, że wymieniamy najlepsze możliwe zasoby, jednocześnie dbając o bezpieczeństwo i pewność użytkowników.

Każdy może zaproponować dodanie produktu lub usługi stakingowej na ethereum.org. Jeśli pominęliśmy jakiś produkt, **[zaproponuj go](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml)!**

Obecnie wymieniamy produkty i usługi stakingowe na następujących stronach:

- [Staking solo](/staking/solo/)
- [Staking jako usługa](/staking/saas/)
- [Pule stakingowe](/staking/pools/)

Dowód stawki (PoS) w Beacon Chain działa od 1 grudnia 2020 roku. Chociaż staking jest wciąż stosunkowo nowy, staraliśmy się stworzyć uczciwe i przejrzyste ramy rozpatrywania zgłoszeń na ethereum.org, jednak kryteria umieszczania na liście będą się zmieniać i ewoluować z czasem, a ostateczna decyzja należy do zespołu odpowiedzialnego za stronę ethereum.org.

## Ramy decyzyjne {#the-decision-framework}

Decyzja o umieszczeniu produktu na ethereum.org nie zależy od jednego czynnika. Przy podejmowaniu decyzji o dodaniu produktu lub usługi bierze się pod uwagę wiele kryteriów łącznie. Im więcej z tych kryteriów jest spełnionych, tym większe prawdopodobieństwo, że produkt zostanie dodany do listy.

**Po pierwsze, do jakiej kategorii należy produkt lub usługa?**

- Narzędzia dla węzłów lub klientów
- Zarządzanie kluczami
- Staking jako usługa (SaaS)
- Pula stakingowa

Obecnie na liście umieszczamy tylko produkty lub usługi z tych kategorii.

### Kryteria włączenia {#criteria-for-inclusion}

Zgłoszenia produktów lub usług stakingowych będą oceniane według następujących kryteriów:

**Kiedy projekt lub usługa zostały uruchomione?**

- Czy istnieją dowody na to, kiedy produkt lub usługa stały się publicznie dostępne?
- Służy to do określenia oceny „sprawdzenia w boju” (battle tested) produktu.

**Czy projekt jest aktywnie utrzymywany?**

- Czy istnieje aktywny zespół rozwijający projekt? Kto jest w niego zaangażowany?
- Pod uwagę będą brane tylko aktywnie utrzymywane produkty.

**Czy produkt lub usługa są wolne od zaufanych/ludzkich pośredników?**

- Jakie kroki na ścieżce użytkownika wymagają zaufania do ludzi w kwestii przechowywania kluczy do ich środków lub prawidłowej dystrybucji nagród?
- Służy to do określenia oceny „niewymagający zaufania” (trustless) produktu lub usługi.

**Czy projekt dostarcza dokładnych i wiarygodnych informacji?**

- Kluczowe jest, aby strona internetowa produktu zawierała aktualne, dokładne i niewprowadzające w błąd informacje, w szczególności jeśli dotyczą one protokołu Ethereum lub innych powiązanych technologii.
- Zgłoszenia zawierające dezinformację, nieaktualne szczegóły lub potencjalnie mylące stwierdzenia na temat Ethereum lub innych powiązanych tematów nie zostaną umieszczone na liście lub zostaną z niej usunięte, jeśli już się na niej znajdują.

**Jakie platformy są obsługiwane?**

- tj. Linux, macOS, Windows, iOS, Android

#### Oprogramowanie i inteligentne kontrakty {#software-and-smart-contracts}

W przypadku jakiegokolwiek niestandardowego oprogramowania lub inteligentnych kontraktów:

**Czy wszystko jest open source?**

- Projekty open source powinny mieć publicznie dostępne repozytorium kodu źródłowego.
- Służy to do określenia oceny „open source” produktu.

**Czy produkt wyszedł z fazy rozwoju _beta_?**

- Na jakim etapie cyklu rozwoju znajduje się produkt?
- Produkty w fazie beta nie są brane pod uwagę przy dodawaniu do ethereum.org.

**Czy oprogramowanie przeszło zewnętrzny audyt bezpieczeństwa?**

- Jeśli nie, czy w planach jest przeprowadzenie zewnętrznego audytu?
- Służy to do określenia oceny „audytowany” (audited) produktu.

**Czy projekt ma program nagród za znalezienie błędów (bug bounty)?**

- Jeśli nie, czy w planach jest stworzenie programu nagród za znalezienie luk w zabezpieczeniach?
- Służy to do określenia oceny „bug bounty” produktu.

#### Narzędzia dla węzłów lub klientów {#node-or-client-tooling}

W przypadku oprogramowania związanego z konfiguracją, zarządzaniem lub migracją węzła lub klienta:

**Którzy klienci warstwy konsensusu (tj. Lighthouse, Teku, Nimbus, Prysm, Grandine) są obsługiwani?**

- Którzy klienci są obsługiwani? Czy użytkownik ma wybór?
- Służy to do określenia oceny „wielu klientów” (multi-client) produktu.

#### Staking jako usługa {#staking-as-a-service}

W przypadku [listy stakingu jako usługi](/staking/saas/) (tj. delegowanej obsługi węzła):

**Jakie są opłaty związane z korzystaniem z usługi?**

- Jaka jest struktura opłat, np. czy istnieje miesięczna opłata za usługę?
- Czy są jakieś dodatkowe wymagania dotyczące stakingu?

**Czy użytkownicy muszą założyć konto?**

- Czy ktoś może korzystać z usługi bez pozwolenia lub KYC?
- Służy to do określenia oceny „niewymagający pozwoleń” (permissionless) produktu.

**Kto przechowuje klucze podpisywania i klucze wypłaty?**

- Do jakich kluczy użytkownik zachowuje dostęp? Do jakich kluczy usługa uzyskuje dostęp?
- Służy to do określenia oceny „niewymagający zaufania” (trustless) produktu.

**Jaka jest różnorodność klientów obsługiwanych węzłów?**

- Jaki procent kluczy walidatora jest obsługiwany przez klienta warstwy konsensusu (CL) posiadającego większość w sieci?
- Według stanu na czas ostatniej edycji, Prysm jest klientem warstwy konsensusu uruchamianym przez większość operatorów węzłów, co jest niebezpieczne dla sieci. Jeśli jakikolwiek klient CL jest obecnie używany przez ponad 33% sieci, prosimy o dane dotyczące jego użycia.
- Służy to do określenia oceny „różnorodność klientów” (diverse clients) produktu.

#### Pula stakingowa {#staking-pool}

W przypadku [usług stakingu grupowego](/staking/pools/):

**Jakie jest minimalne ETH wymagane do stakowania?**

- np. 0,01 ETH

**Jakie są związane z tym opłaty lub wymagania dotyczące stakingu?**

- Jaki procent nagród jest pobierany jako opłaty?
- Czy są jakieś dodatkowe wymagania dotyczące stakingu?

**Czy istnieje token płynności?**

- Jakie tokeny biorą w tym udział? Jak one działają? Jakie są adresy kontraktów?
- Służy to do określenia oceny „token płynności” (liquidity token) produktu.

**Czy użytkownicy mogą uczestniczyć jako operator węzła?**

- Co jest wymagane do uruchomienia klientów walidatora przy użyciu połączonych środków?
- Czy wymaga to pozwolenia od osoby fizycznej, firmy lub DAO?
- Służy to do określenia oceny „węzły niewymagające pozwoleń” (permissionless nodes) produktu.

**Jaka jest różnorodność klientów operatorów węzłów w puli?**

- Jaki procent operatorów węzłów uruchamia klienta warstwy konsensusu (CL) posiadającego większość w sieci?
- Według stanu na czas ostatniej edycji, Prysm jest klientem warstwy konsensusu uruchamianym przez większość operatorów węzłów, co jest niebezpieczne dla sieci. Jeśli jakikolwiek klient CL jest obecnie używany przez ponad 33% sieci, prosimy o dane dotyczące jego użycia.
- Służy to do określenia oceny „różnorodność klientów” (diverse clients) produktu.

### Inne kryteria: mile widziane dodatki {#other-criteria}

**Jakie interfejsy użytkownika są obsługiwane?**

- tj. aplikacja przeglądarkowa, aplikacja komputerowa, aplikacja mobilna, CLI

**W przypadku narzędzi dla węzłów, czy oprogramowanie zapewnia łatwy sposób przełączania się między klientami?**

- Czy użytkownik może łatwo i bezpiecznie zmieniać klientów za pomocą tego narzędzia?

**W przypadku SaaS, ile walidatorów jest obecnie obsługiwanych przez usługę?**

- Daje nam to wyobrażenie o dotychczasowym zasięgu Twojej usługi.

## Jak wyświetlamy wyniki {#product-ordering}

Powyższe [kryteria włączenia](#criteria-for-inclusion) służą do obliczenia łącznej oceny dla każdego produktu lub usługi. Jest to wykorzystywane jako sposób sortowania i prezentowania produktów, które spełniają określone obiektywne kryteria. Im więcej kryteriów zostanie udokumentowanych, tym wyżej produkt zostanie posortowany, a w przypadku remisów kolejność będzie losowana przy ładowaniu strony.

Logika kodu i wagi dla tych kryteriów znajdują się obecnie w [tym komponencie JavaScript](https://github.com/ethereum/ethereum-org-website/blob/dev/src/components/Staking/StakingProductsCardGrid/index.tsx#L350) w naszym repozytorium.

## Dodaj swój produkt lub usługę {#add-product}

Jeśli chcesz dodać produkt lub usługę stakingową do ethereum.org, utwórz zgłoszenie (issue) na GitHubie.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml">
  Utwórz zgłoszenie
</ButtonLink>