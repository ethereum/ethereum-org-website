---
title: ERC-20 z zabezpieczeniami
description: Jak pomóc ludziom unikać prostych błędów
author: Ori Pomerantz
lang: pl
tags: [ "erc-20" ]
skill: beginner
published: 2022-08-15
---

## Wprowadzenie {#introduction}

Jedną z wielkich zalet Ethereum jest to, że nie ma centralnego organu, który mógłby modyfikować lub cofać Twoje transakcje. Jednym z wielkich problemów z Ethereum jest to, że nie ma centralnego organu z uprawnieniami do cofania błędów użytkowników lub nielegalnych transakcji. W tym artykule dowiesz się o niektórych typowych błędach popełnianych przez użytkowników z tokenami [ERC-20](/developers/docs/standards/tokens/erc-20/), a także o tym, jak tworzyć kontrakty ERC-20, które pomagają użytkownikom unikać tych błędów lub które dają centralnemu organowi pewne uprawnienia (na przykład do zamrażania kont).

Pamiętaj, że chociaż będziemy używać [kontraktu tokena ERC-20 OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), ten artykuł nie wyjaśnia go szczegółowo. Możesz znaleźć te informacje [tutaj](/developers/tutorials/erc20-annotated-code).

Jeśli chcesz zobaczyć pełny kod źródłowy:

1. Otwórz [Remix IDE](https://remix.ethereum.org/).
2. Kliknij ikonę klonowania z GitHuba (![ikona klonowania z GitHuba](icon-clone.png)).
3. Sklonuj repozytorium z GitHuba `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Otwórz **contracts > erc20-safety-rails.sol**.

## Tworzenie kontraktu ERC-20 {#creating-an-erc-20-contract}

Zanim dodamy funkcjonalność zabezpieczeń, potrzebujemy kontraktu ERC-20. W tym artykule użyjemy [kreatora kontraktów OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/wizard). Otwórz go w innej przeglądarce i postępuj zgodnie z poniższymi instrukcjami:

1. Wybierz **ERC20**.

2. Wprowadź te ustawienia:

   | Parametr               | Wartość          |
   | ---------------------- | ---------------- |
   | Nazwa                  | SafetyRailsToken |
   | Symbol                 | SAFE             |
   | Premint                | 1000             |
   | Funkcje                | Brak             |
   | Kontrola dostępu       | Ownable          |
   | Możliwość aktualizacji | Brak             |

3. Przewiń w górę i kliknij **Otwórz w Remix** (dla Remix) lub **Pobierz**, aby użyć innego środowiska. Zakładam, że używasz Remix, jeśli używasz czegoś innego, po prostu wprowadź odpowiednie zmiany.

4. Mamy teraz w pełni funkcjonalny kontrakt ERC-20. Możesz rozwinąć `.deps` > `npm`, aby zobaczyć zaimportowany kod.

5. Skompiluj, wdróż i pobaw się kontraktem, aby zobaczyć, że działa on jak kontrakt ERC-20. Jeśli chcesz dowiedzieć się, jak używać Remix, [skorzystaj z tego samouczka](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Częste błędy {#common-mistakes}

### Błędy {#the-mistakes}

Użytkownicy czasami wysyłają tokeny na zły adres. Chociaż nie możemy czytać w ich myślach, aby wiedzieć, co zamierzali zrobić, istnieją dwa rodzaje błędów, które zdarzają się często i są łatwe do wykrycia:

1. Wysyłanie tokenów na własny adres kontraktu. Na przykład, [token OP Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) zdołał zgromadzić [ponad 120 000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) tokenów OP w mniej niż dwa miesiące. Reprezentuje to znaczną ilość bogactwa, które ludzie przypuszczalnie po prostu stracili.

2. Wysyłanie tokenów na pusty adres, taki, który nie odpowiada [kontu zewnętrznemu (EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) lub [inteligentnemu kontraktowi](/developers/docs/smart-contracts). Chociaż nie mam statystyk dotyczących tego, jak często to się zdarza, [jeden incydent mógł kosztować 20 000 000 tokenów](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Zapobieganie transferom {#preventing-transfers}

Kontrakt ERC-20 OpenZeppelin zawiera [hak (hook), `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368), który jest wywoływany przed transferem tokena. Domyślnie ten hak nic nie robi, ale możemy podpiąć do niego naszą własną funkcjonalność, taką jak kontrole, które cofają transakcję w razie problemu.

Aby użyć tego haka, dodaj tę funkcję po konstruktorze:

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Niektóre części tej funkcji mogą być nowe, jeśli nie znasz dobrze języka Solidity:

```solidity
        internal virtual
```

Słowo kluczowe `virtual` oznacza, że tak jak odziedziczyliśmy funkcjonalność z `ERC20` i nadpisaliśmy tę funkcję, inne kontrakty mogą dziedziczyć po nas i nadpisywać tę funkcję.

```solidity
        override(ERC20)
```

Musimy jawnie określić, że [nadpisujemy](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) definicję `_beforeTokenTransfer` z tokena ERC20. Ogólnie rzecz biorąc, jawne definicje są znacznie lepsze z punktu widzenia bezpieczeństwa niż te niejawne – nie możesz zapomnieć, że coś zrobiłeś, jeśli masz to tuż przed oczami. To jest również powód, dla którego musimy określić, którą `_beforeTokenTransfer` z klasy nadrzędnej nadpisujemy.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

Ta linia wywołuje funkcję `_beforeTokenTransfer` kontraktu lub kontraktów, z których dziedziczyliśmy i które ją posiadają. W tym przypadku jest to tylko `ERC20`, `Ownable` nie ma tego haka. Mimo że obecnie `ERC20._beforeTokenTransfer` nic nie robi, wywołujemy ją na wypadek, gdyby w przyszłości została dodana jakaś funkcjonalność (i zdecydujemy się wtedy na ponowne wdrożenie kontraktu, ponieważ kontrakty nie zmieniają się po wdrożeniu).

### Kodowanie wymagań {#coding-the-requirements}

Chcemy dodać do funkcji następujące wymagania:

- Adres `to` nie może być równy `address(this)`, czyli adresowi samego kontraktu ERC-20.
- Adres `to` nie może być pusty, musi być to:
  - Konto zewnętrzne (EOA). Nie możemy bezpośrednio sprawdzić, czy adres jest EOA, ale możemy sprawdzić saldo ETH adresu. Konta EOA prawie zawsze mają jakieś saldo, nawet jeśli nie są już używane – trudno jest je wyczyścić do ostatniego wei.
  - Inteligentny kontrakt. Sprawdzanie, czy adres jest inteligentnym kontraktem, jest nieco trudniejsze. Istnieje kod operacyjny, który sprawdza długość kodu zewnętrznego, o nazwie [`EXTCODESIZE`](https://www.evm.codes/#3b), ale nie jest on dostępny bezpośrednio w Solidity. Musimy do tego użyć [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html), który jest asemblerem EVM. Istnieją inne wartości, których moglibyśmy użyć z Solidity ([`<address>.code` i `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)), ale kosztują więcej.

Przeanalizujmy nowy kod linia po linii:

```solidity
        require(to != address(this), "Nie można wysyłać tokenów na adres kontraktu");
```

To jest pierwsze wymaganie, sprawdzić, czy `to` i `this(address)` nie są tym samym.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

W ten sposób sprawdzamy, czy adres jest kontraktem. Nie możemy otrzymać wyniku bezpośrednio z Yul, więc zamiast tego definiujemy zmienną do przechowywania wyniku (w tym przypadku `isToContract`). Yul działa w ten sposób, że każdy kod operacyjny jest traktowany jako funkcja. Najpierw więc wywołujemy [`EXTCODESIZE`](https://www.evm.codes/#3b), aby uzyskać rozmiar kontraktu, a następnie używamy [`GT`](https://www.evm.codes/#11), aby sprawdzić, czy nie jest on zerowy (mamy do czynienia z liczbami całkowitymi bez znaku, więc oczywiście nie może być ujemny). Następnie zapisujemy wynik do `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Nie można wysyłać tokenów na pusty adres");
```

I na koniec mamy faktyczne sprawdzanie pustych adresów.

## Dostęp administracyjny {#admin-access}

Czasami przydatne jest posiadanie administratora, który może cofać błędy. Aby zmniejszyć potencjał nadużyć, ten administrator może być [multisigiem](https://blog.logrocket.com/security-choices-multi-signature-wallets/), dzięki czemu wiele osób musi zgodzić się na daną akcję. W tym artykule omówimy dwie funkcje administracyjne:

1. Zamrażanie i odmrażanie kont. Może to być przydatne, na przykład, gdy konto może być zagrożone.
2. Czyszczenie aktywów.

   Czasami oszuści wysyłają fałszywe tokeny do kontraktu prawdziwego tokena, aby zyskać na wiarygodności. Na przykład, [zobacz tutaj](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). Prawdziwy kontrakt ERC-20 to [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). Oszustwo, które go udaje, to [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   Możliwe jest również, że ludzie przez pomyłkę wyślą prawdziwe tokeny ERC-20 do naszego kontraktu, co jest kolejnym powodem, dla którego warto mieć sposób na ich wyciągnięcie.

OpenZeppelin dostarcza dwa mechanizmy umożliwiające dostęp administracyjny:

- Kontrakty [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) mają jednego właściciela. Funkcje, które mają [modyfikator](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `onlyOwner`, mogą być wywoływane tylko przez tego właściciela. Właściciele mogą przenieść własność na kogoś innego lub całkowicie się jej zrzec. Prawa wszystkich pozostałych kont są zazwyczaj identyczne.
- Kontrakty [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) mają [kontrolę dostępu opartą na rolach (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Dla uproszczenia, w tym artykule używamy `Ownable`.

### Zamrażanie i rozmrażanie kontraktów {#freezing-and-thawing-contracts}

Zamrażanie i rozmrażanie kontraktów wymaga kilku zmian:

- [Mapowanie](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) adresów na [wartości logiczne](https://en.wikipedia.org/wiki/Boolean_data_type), aby śledzić, które adresy są zamrożone. Wszystkie wartości są początkowo zerowe, co dla wartości logicznych jest interpretowane jako fałsz (false). Jest to pożądane, ponieważ domyślnie konta nie są zamrożone.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [Zdarzenia](https://www.tutorialspoint.com/solidity/solidity_events.htm), aby informować wszystkich zainteresowanych, gdy konto zostanie zamrożone lub rozmrożone. Technicznie rzecz biorąc, zdarzenia nie są wymagane do tych działań, ale pomaga to kodowi offchain nasłuchiwać tych zdarzeń i wiedzieć, co się dzieje. Uważa się za dobry zwyczaj, aby inteligentny kontrakt je emitował, gdy dzieje się coś, co może być istotne dla kogoś innego.

  Zdarzenia są indeksowane, więc będzie można wyszukać wszystkie przypadki zamrożenia lub rozmrożenia konta.

  ```solidity
    // Gdy konta są zamrażane lub odmrażane
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Funkcje do zamrażania i rozmrażania kont. Te dwie funkcje są prawie identyczne, więc omówimy tylko funkcję zamrażania.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  Funkcje oznaczone jako [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) mogą być wywoływane z innych inteligentnych kontraktów lub bezpośrednio przez transakcję.

  ```solidity
    {
        require(!frozenAccounts[addr], "Konto jest już zamrożone");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  Jeśli konto jest już zamrożone, cofnij transakcję. W przeciwnym razie zamroź je i `emituj` zdarzenie.

- Zmień `_beforeTokenTransfer`, aby uniemożliwić przenoszenie pieniędzy z zamrożonego konta. Pamiętaj, że pieniądze nadal mogą być przelewane na zamrożone konto.

  ```solidity
       require(!frozenAccounts[from], "Konto jest zamrożone");
  ```

### Czyszczenie aktywów {#asset-cleanup}

Aby uwolnić tokeny ERC-20 przechowywane przez ten kontrakt, musimy wywołać funkcję na kontrakcie tokena, do którego należą, albo [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer), albo [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). W tym przypadku nie ma sensu marnować gazu na przydziały (allowances), możemy równie dobrze przenieść je bezpośrednio.

```solidity
    function cleanupERC20(
        address erc20,
        address dest
    )
        public
        onlyOwner
    {
        IERC20 token = IERC20(erc20);
```

To jest składnia do tworzenia obiektu dla kontraktu, gdy otrzymamy jego adres. Możemy to zrobić, ponieważ mamy definicję tokenów ERC20 jako część kodu źródłowego (patrz linia 4), a ten plik zawiera [definicję dla IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), interfejs dla kontraktu ERC-20 OpenZeppelin.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

To jest funkcja czyszcząca, więc przypuszczalnie nie chcemy zostawiać żadnych tokenów. Zamiast ręcznego pobierania salda od użytkownika, możemy równie dobrze zautomatyzować ten proces.

## Wnioski {#conclusion}

To nie jest idealne rozwiązanie – nie ma idealnego rozwiązania problemu „użytkownik popełnił błąd”. Jednak używanie tego rodzaju kontroli może przynajmniej zapobiec niektórym błędom. Możliwość zamrażania kont, chociaż niebezpieczna, może być użyta do ograniczenia szkód niektórych hacków poprzez uniemożliwienie hakerowi dostępu do skradzionych środków.

[Zobacz więcej mojej pracy tutaj](https://cryptodocguy.pro/).
