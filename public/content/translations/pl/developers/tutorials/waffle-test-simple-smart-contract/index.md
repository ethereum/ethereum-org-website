---
title: "Testowanie prostego inteligentnego kontraktu za pomocą biblioteki Waffle"
description: "Samouczek dla początkujących"
author: Ewa Kowalska
tags: [ "smart kontrakty", "solidity", "Waffle", "testowanie" ]
skill: beginner
lang: pl
published: 2021-02-26
---

## W tym samouczku dowiesz się, jak {#in-this-tutorial-youll-learn-how-to}

- Testować zmiany salda portfela
- Testować emisję zdarzeń z określonymi argumentami
- Sprawdzić, czy transakcja została cofnięta

## Założenia {#assumptions}

- Potrafisz utworzyć nowy projekt w języku JavaScript lub TypeScript
- Masz podstawowe doświadczenie w testach w języku JavaScript
- Używasz menedżerów pakietów takich jak yarn lub npm
- Posiadasz podstawową wiedzę na temat inteligentnych kontraktów i języka Solidity

## Pierwsze kroki {#getting-started}

Samouczek przedstawia konfigurację i uruchamianie testów za pomocą yarn, ale nie ma problemu, jeśli wolisz npm – podam odpowiednie odniesienia do oficjalnej [dokumentacji](https://ethereum-waffle.readthedocs.io/en/latest/index.html) Waffle.

## Instalacja zależności {#install-dependencies}

[Dodaj](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation) zależności ethereum-waffle i typescript do zależności deweloperskich (`dev dependencies`) swojego projektu.

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## Przykładowy inteligentny kontrakt {#example-smart-contract}

W trakcie tego samouczka będziemy pracować na przykładzie prostego inteligentnego kontraktu – EtherSplitter. Nie robi on wiele poza tym, że pozwala każdemu wysłać trochę wei i podzielić je równo między dwóch predefiniowanych odbiorców.
Funkcja `split` wymaga, aby liczba wei była parzysta, w przeciwnym razie transakcja zostanie cofnięta. Dla obu odbiorców wykonuje transfer wei, a następnie emituje zdarzenie `Transfer`.

Umieść fragment kodu EtherSplitter w pliku `src/EtherSplitter.sol`.

```solidity
pragma solidity ^0.6.0;

contract EtherSplitter {
    address payable receiver1;
    address payable receiver2;

    event Transfer(address from, address to, uint256 amount);

    constructor(address payable _address1, address payable _address2) public {
        receiver1 = _address1;
        receiver2 = _address2;
    }

    function split() public payable {
        require(msg.value % 2 == 0, 'Uneven wei amount not allowed');
        receiver1.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver1, msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver2, msg.value / 2);
    }
}
```

## Kompilacja kontraktu {#compile-the-contract}

Aby [skompilować](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract) kontrakt, dodaj następujący wpis do pliku package.json:

```json
"scripts": {
    "build": "waffle"
  }
```

Następnie utwórz plik konfiguracyjny Waffle w głównym katalogu projektu – `waffle.json` – a następnie wklej do niego następującą konfigurację:

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

Uruchom `yarn build`. W rezultacie pojawi się katalog `build` ze skompilowanym kontraktem EtherSplitter w formacie JSON.

## Konfiguracja testu {#test-setup}

Testowanie za pomocą Waffle wymaga użycia mechanizmów dopasowujących (matcherów) Chai oraz biblioteki Mocha, więc musisz je [dodać](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests) do swojego projektu. Zaktualizuj plik package.json i dodaj wpis `test` w sekcji `scripts`:

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

Jeśli chcesz [uruchomić](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests) testy, po prostu wykonaj polecenie `yarn test`.

## Testowanie {#testing}

Teraz utwórz katalog `test` i nowy plik `test\EtherSplitter.test.ts`.
Skopiuj poniższy fragment kodu i wklej go do naszego pliku testowego.

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import EtherSplitter from "../build/EtherSplitter.json"

use(solidity)

describe("Ether Splitter", () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [
      receiver1.address,
      receiver2.address,
    ])
  })

  // tutaj dodaj testy
})
```

Kilka słów na początek.
`MockProvider` udostępnia testową wersję blockchaina. Udostępnia również portfele testowe, które posłużą nam do testowania kontraktu EtherSplitter. Możemy uzyskać do dziesięciu portfeli, wywołując metodę `getWallets()` na dostawcy. W tym przykładzie otrzymujemy trzy portfele – dla nadawcy i dwóch odbiorców.

Następnie deklarujemy zmienną o nazwie „splitter” – jest to nasz testowy kontrakt EtherSplitter. Jest on tworzony przed każdym wykonaniem pojedynczego testu za pomocą metody `deployContract`. Ta metoda symuluje wdrożenie kontraktu z portfela przekazanego jako pierwszy parametr (w naszym przypadku portfela nadawcy). Drugim parametrem jest ABI i kod bajtowy testowanego kontraktu – przekazujemy tam plik JSON skompilowanego kontraktu EtherSplitter z katalogu `build`. Trzeci parametr to tablica z argumentami konstruktora kontraktu, którymi w naszym przypadku są dwa adresy odbiorców.

## changeBalances {#changebalances}

Najpierw sprawdzimy, czy metoda `split` faktycznie zmienia salda portfeli odbiorców. Jeśli podzielimy 50 wei z konta nadawcy, spodziewalibyśmy się, że salda obu odbiorców wzrosną o 25 wei. Użyjemy matchera `changeBalances` z Waffle:

```ts
it("Zmienia salda kont", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

Jako pierwszy parametr matchera przekazujemy tablicę portfeli odbiorców, a jako drugi – tablicę oczekiwanych wzrostów na odpowiednich kontach.
Gdybyśmy chcieli sprawdzić saldo jednego konkretnego portfela, moglibyśmy również użyć matchera `changeBalance`, który nie wymaga przekazywania tablic, jak w poniższym przykładzie:

```ts
it("Zmienia saldo konta", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

Zwróć uwagę, że w obu przypadkach (`changeBalance` i `changeBalances`) przekazujemy funkcję `split` jako wywołanie zwrotne (callback), ponieważ matcher musi mieć dostęp do stanu sald przed i po wywołaniu.

Następnie przetestujemy, czy zdarzenie `Transfer` zostało wyemitowane po każdym transferze wei. Sięgniemy po kolejny matcher z biblioteki Waffle:

## Emit {#emit}

```ts
it("Emituje zdarzenie przy transferze do pierwszego odbiorcy", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("Emituje zdarzenie przy transferze do drugiego odbiorcy", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

Matcher `emit` pozwala nam sprawdzić, czy kontrakt wyemitował zdarzenie podczas wywoływania metody. Jako parametry matchera `emit` podajemy kontrakt testowy, który naszym zdaniem wyemituje zdarzenie, wraz z nazwą tego zdarzenia. W naszym przypadku kontraktem testowym jest `splitter`, a nazwą zdarzenia – `Transfer`. Możemy również zweryfikować dokładne wartości argumentów, z którymi zdarzenie zostało wyemitowane – przekazujemy do matchera `withArgs` tyle argumentów, ile oczekuje deklaracja naszego zdarzenia. W przypadku kontraktu EtherSplitter przekazujemy adresy nadawcy i odbiorcy wraz z kwotą transferowanych wei.

## revertedWith {#revertedwith}

Jako ostatni przykład sprawdzimy, czy transakcja została cofnięta w przypadku nieparzystej liczby wei. Użyjemy do tego matchera `revertedWith`:

```ts
it("Cofa transakcję, gdy kwota Wei jest nieparzysta", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "Uneven wei amount not allowed"
  )
})
```

Test, jeśli zakończy się pomyślnie, upewni nas, że transakcja rzeczywiście została cofnięta. Musi jednak istnieć dokładna zgodność między komunikatami, które przekazaliśmy w instrukcji `require`, a komunikatem, którego oczekujemy w `revertedWith`. Jeśli wrócimy do kodu kontraktu EtherSplitter, w instrukcji `require` dla kwoty wei podajemy komunikat: „Uneven wei amount not allowed”. Jest on zgodny z komunikatem, którego oczekujemy w naszym teście. Gdyby nie były takie same, test zakończyłby się niepowodzeniem.

## Gratulacje! {#congratulations}

Zrobiłeś(-aś) pierwszy duży krok w kierunku testowania inteligentnych kontraktów za pomocą Waffle!
