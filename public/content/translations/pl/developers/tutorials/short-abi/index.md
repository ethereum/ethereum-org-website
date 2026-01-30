---
title: "Krótkie ABI w celu optymalizacji Calldata"
description: Optymalizacja inteligentnych kontraktów dla rollupów optymistycznych
author: Ori Pomerantz
lang: pl
tags: [ "warstwa 2" ]
skill: intermediate
published: 2022-04-01
---

## Wprowadzenie {#introduction}

W tym artykule dowiesz się o [rollupach optymistycznych](/developers/docs/scaling/optimistic-rollups), kosztach transakcji na nich oraz o tym, jak odmienna struktura kosztów wymaga od nas optymalizacji pod kątem innych rzeczy niż w sieci głównej Ethereum.
Dowiesz się również, jak wdrożyć tę optymalizację.

### Pełne ujawnienie {#full-disclosure}

Jestem pracownikiem zatrudnionym na pełen etat w [Optimism](https://www.optimism.io/), więc przykłady w tym artykule będą działać na Optimism.
Jednakże wyjaśniona tutaj technika powinna działać równie dobrze w przypadku innych rollupów.

### Terminologia {#terminology}

W dyskusjach o rollupach termin „warstwa 1” (L1) jest używany w odniesieniu do sieci głównej (Mainnet), produkcyjnej sieci Ethereum.
Termin „warstwa 2” (L2) jest używany w odniesieniu do rollupu lub jakiegokolwiek innego systemu, który opiera się na L1 w kwestii bezpieczeństwa, ale wykonuje większość przetwarzania poza łańcuchem.

## Jak możemy jeszcze bardziej obniżyć koszt transakcji L2? {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[Rollupy optymistyczne](/developers/docs/scaling/optimistic-rollups) muszą przechowywać zapis każdej historycznej transakcji, aby każdy mógł je przejrzeć i zweryfikować, czy obecny stan jest prawidłowy.
Najtańszym sposobem na wprowadzenie danych do sieci głównej Ethereum jest zapisanie ich jako calldata.
To rozwiązanie zostało wybrane zarówno przez [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-), jak i [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups).

### Koszt transakcji L2 {#cost-of-l2-transactions}

Koszt transakcji L2 składa się z dwóch składników:

1. Przetwarzanie na L2, które jest zazwyczaj niezwykle tanie
2. Przechowywanie na L1, które jest powiązane z kosztami gazu w sieci głównej

W chwili, gdy to piszę, na Optimism koszt gazu L2 wynosi 0,001 [Gwei](/developers/docs/gas/#pre-london).
Z drugiej strony, koszt gazu L1 wynosi około 40 gwei.
[Aktualne ceny można zobaczyć tutaj](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

Jeden bajt calldata kosztuje albo 4 gazu (jeśli jest to zero), albo 16 gazu (jeśli ma inną wartość).
Jedną z najdroższych operacji w EVM jest zapis do pamięci masowej.
Maksymalny koszt zapisu 32-bajtowego słowa do pamięci masowej na L2 wynosi 22100 gazu. Obecnie jest to 22,1 gwei.
Jeśli więc uda nam się zaoszczędzić jeden zerowy bajt calldata, będziemy w stanie zapisać około 200 bajtów do pamięci masowej i nadal wyjdziemy na tym na plus.

### ABI {#the-abi}

Zdecydowana większość transakcji uzyskuje dostęp do kontraktu z konta zewnętrznego.
Większość kontraktów jest napisana w Solidity i interpretuje swoje pole danych zgodnie z [binarnym interfejsem aplikacji (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Jednak ABI zostało zaprojektowane dla L1, gdzie bajt calldata kosztuje mniej więcej tyle samo co cztery operacje arytmetyczne, a nie dla L2, gdzie bajt calldata kosztuje ponad tysiąc operacji arytmetycznych.
Calldata jest podzielona w następujący sposób:

| Sekcja           | Długość | Bajty | Zmarnowane bajty | Zmarnowany gaz | Niezbędne bajty | Niezbędny gaz |
| ---------------- | ------: | ----: | ---------------: | -------------: | --------------: | ------------: |
| Selektor funkcji |       4 |   0-3 |                3 |             48 |               1 |            16 |
| Zera             |      12 |  4-15 |               12 |             48 |               0 |             0 |
| Adres docelowy   |      20 | 16-35 |                0 |              0 |              20 |           320 |
| Kwota            |      32 | 36-67 |               17 |             64 |              15 |           240 |
| Łącznie          |      68 |       |                  |            160 |                 |           576 |

Wyjaśnienie:

- **Selektor funkcji**: Kontrakt ma mniej niż 256 funkcji, więc możemy je rozróżnić za pomocą jednego bajtu.
  Te bajty są zazwyczaj niezerowe i dlatego [kosztują szesnaście gazu](https://eips.ethereum.org/EIPS/eip-2028).
- **Zera**: Te bajty są zawsze zerowe, ponieważ dwudziestobajtowy adres nie wymaga trzydziestodwubajtowego słowa, aby go pomieścić.
  Bajty, które zawierają zero, kosztują cztery gazu ([zobacz yellow paper](https://ethereum.github.io/yellowpaper/paper.pdf), Dodatek G,
  s. 27, wartość dla `G`<sub>`txdatazero`</sub>).
- **Ilość**: Jeśli założymy, że w tym kontrakcie `decimals` wynosi osiemnaście (normalna wartość), a maksymalna ilość tokenów, które transferujemy, wyniesie 10<sup>18</sup>, otrzymamy maksymalną ilość 10<sup>36</sup>.
  256<sup>15</sup> > 10<sup>36</sup>, więc piętnaście bajtów wystarczy.

Strata 160 gazu na L1 jest normalnie znikoma. Transakcja kosztuje co najmniej [21 000 gazu](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), więc dodatkowe 0,8% nie ma znaczenia.
Jednak na L2 sprawy mają się inaczej. Prawie cały koszt transakcji to zapisanie jej na L1.
Oprócz calldata transakcji, istnieje 109 bajtów nagłówka transakcji (adres docelowy, podpis itp.).
Całkowity koszt wynosi zatem `109*16+576+160=2480`, a my marnujemy około 6,5% tej kwoty.

## Redukcja kosztów, gdy nie kontrolujesz kontraktu docelowego {#reducing-costs-when-you-dont-control-the-destination}

Zakładając, że nie masz kontroli nad kontraktem docelowym, nadal możesz użyć rozwiązania podobnego do [tego](https://github.com/qbzzt/ethereum.org-20220330-shortABI).
Przejdźmy do odpowiednich plików.

### Token.sol {#token-sol}

[To jest kontrakt docelowy](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
Jest to standardowy kontrakt ERC-20, z jedną dodatkową funkcją.
Ta funkcja `faucet` pozwala każdemu użytkownikowi otrzymać trochę tokenów do wykorzystania.
Uczyniłoby to produkcyjny kontrakt ERC-20 bezużytecznym, ale ułatwia życie, gdy ERC-20 istnieje tylko w celu ułatwienia testowania.

```solidity
    /**
     * @dev Daje wywołującemu 1000 tokenów do zabawy
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[To jest kontrakt, który transakcje mają wywoływać z krótszymi calldata](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Przejdźmy przez niego linia po linii.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Potrzebujemy interfejsu kontraktu tokena, aby wiedzieć, jak go wywoływać.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

Adres tokena, dla którego jesteśmy proxy.

```solidity

    /**
     * @dev Określ adres tokena
     * @param tokenAddr_ adres kontraktu ERC-20
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

Adres tokena jest jedynym parametrem, który musimy określić.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Odczytaj wartość z calldata.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal limit długości to 32 bajty");

        require(length + startByte <= msg.data.length,
            "calldataVal próbuje czytać poza calldatasize");
```

Zamierzamy załadować do pamięci pojedyncze 32-bajtowe (256-bitowe) słowo i usunąć bajty, które nie są częścią pola, które nas interesuje.
Ten algorytm nie działa dla wartości dłuższych niż 32 bajty i oczywiście nie możemy czytać poza końcem calldata.
Na L1 może być konieczne pominięcie tych testów w celu zaoszczędzenia na gazie, ale na L2 gaz jest niezwykle tani, co umożliwia wszelkie testy poprawności, jakie możemy sobie wyobrazić.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Moglibyśmy skopiować dane z wywołania do `fallback()` (patrz niżej), ale łatwiej jest użyć [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), języka asemblera EVM.

Tutaj używamy [opcodu CALLDATALOAD](https://www.evm.codes/#35), aby odczytać bajty od `startByte` do `startByte+31` na stos.
Ogólnie rzecz biorąc, składnia opcodu w Yul to \`<nazwa opcodu>(<pierwsza wartość stosu, jeśli istnieje>, <druga wartość stosu, jeśli istnieje>...).

```solidity

        _retVal = _retVal >> (256-length*8);
```

Tylko najbardziej znaczące bajty o długości `length` są częścią pola, więc wykonujemy [przesunięcie w prawo](https://en.wikipedia.org/wiki/Logical_shift), aby pozbyć się pozostałych wartości.
Ma to dodatkową zaletę, że przenosi wartość na prawo od pola, więc jest to sama wartość, a nie wartość pomnożona przez 256<sup>coś</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Gdy wywołanie do kontraktu Solidity nie pasuje do żadnej z sygnatur funkcji, wywołuje [funkcję `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (zakładając, że taka istnieje).
W przypadku `CalldataInterpreter` _każde_ wywołanie trafia tutaj, ponieważ nie ma innych funkcji `external` ani `public`.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Odczytaj pierwszy bajt calldata, który informuje nas o funkcji.
Istnieją dwa powody, dla których funkcja nie byłaby tutaj dostępna:

1. Funkcje, które są `pure` lub `view`, nie zmieniają stanu i nie kosztują gazu (gdy są wywoływane poza łańcuchem).
   Nie ma sensu próbować zmniejszać ich kosztu gazu.
2. Funkcje, które opierają się na [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   Wartością `msg.sender` będzie adres `CalldataInterpreter`, a nie adres wywołującego.

Niestety, [patrząc na specyfikacje ERC-20](https://eips.ethereum.org/EIPS/eip-20), pozostaje tylko jedna funkcja, `transfer`.
Pozostawia to nam tylko dwie funkcje: `transfer` (ponieważ możemy wywołać `transferFrom`) i `faucet` (ponieważ możemy przelać tokeny z powrotem do tego, kto nas wywołał).

```solidity

        // Wywołaj metody zmieniające stan tokena, używając
        // informacji z calldata

        // faucet
        if (_func == 1) {
```

Wywołanie `faucet()`, które nie ma parametrów.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

Po wywołaniu `token.faucet()` otrzymujemy tokeny. Jednak jako kontrakt proxy **nie potrzebujemy** tokenów.
Potrzebuje ich EOA (konto należące do podmiotu zewnętrznego) lub kontrakt, który nas wywołał.
Więc transferujemy wszystkie nasze tokeny do tego, kto nas wywołał.

```solidity
        // transfer (zakładamy, że mamy na to zgodę)
        if (_func == 2) {
```

Przesyłanie tokenów wymaga dwóch parametrów: adresu docelowego i kwoty.

```solidity
            token.transferFrom(
                msg.sender,
```

Zezwalamy wywołującym tylko na transfer posiadanych przez nich tokenów

```solidity
                address(uint160(calldataVal(1, 20))),
```

Adres docelowy zaczyna się od bajtu nr 1 (bajt nr 0 to funkcja).
Jako adres, ma długość 20 bajtów.

```solidity
                calldataVal(21, 2)
```

W przypadku tego konkretnego kontraktu zakładamy, że maksymalna liczba tokenów, jaką ktokolwiek chciałby przenieść, mieści się w dwóch bajtach (mniej niż 65536).

```solidity
            );
        }
```

Ogólnie rzecz biorąc, transfer zajmuje 35 bajtów calldata:

| Sekcja           | Długość | Bajty |
| ---------------- | ------: | ----: |
| Selektor funkcji |       1 |     0 |
| Adres docelowy   |      32 |  1-32 |
| Kwota            |       2 | 33-34 |

```solidity
    }   // fallback

}       // kontrakt CalldataInterpreter
```

### test.js {#test-js}

[Ten test jednostkowy JavaScript](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) pokazuje, jak używać tego mechanizmu (i jak zweryfikować jego prawidłowe działanie).
Zakładam, że rozumiesz [chai](https://www.chaijs.com/) i [ethers](https://docs.ethers.io/v5/) i wyjaśniam tylko te części, które dotyczą konkretnie kontraktu.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Powinien pozwolić nam używać tokenów", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Adres tokena:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("Adres CalldataInterpreter:", cdi.address)

    const signer = await ethers.getSigner()
```

Zaczynamy od wdrożenia obu kontraktów.

```javascript
    // Pobierz tokeny do zabawy
    const faucetTx = {
```

Nie możemy używać funkcji wysokiego poziomu, których normalnie byśmy użyli (takich jak `token.faucet()`) do tworzenia transakcji, ponieważ nie przestrzegamy ABI.
Zamiast tego musimy sami zbudować transakcję, a następnie ją wysłać.

```javascript
      to: cdi.address,
      data: "0x01"
```

Istnieją dwa parametry, które musimy podać dla transakcji:

1. `to`, adres docelowy.
   To jest kontrakt interpretera calldata.
2. `data`, calldata do wysłania.
   W przypadku wywołania `faucet`, danymi jest pojedynczy bajt, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Wywołujemy [metodę `sendTransaction` sygnatariusza](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction), ponieważ już określiliśmy miejsce docelowe (`faucetTx.to`) i potrzebujemy, aby transakcja została podpisana.

```javascript
// Sprawdź, czy faucet poprawnie dostarcza tokeny
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Tutaj weryfikujemy saldo.
Nie ma potrzeby oszczędzania gazu na funkcjach `view`, więc po prostu uruchamiamy je normalnie.

```javascript
// Daj CDI upoważnienie (zatwierdzenia nie mogą być przekazywane przez proxy)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Daj interpreterowi calldata upoważnienie do wykonywania transferów.

```javascript
// Transfer tokenów
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Utwórz transakcję transferu. Pierwszy bajt to „0x02”, po nim następuje adres docelowy, a na końcu kwota (0x0100, co w systemie dziesiętnym daje 256).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Sprawdź, czy mamy o 256 tokenów mniej
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // I czy nasz cel je otrzymał
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## Zmniejszenie kosztów, gdy kontrolujesz kontrakt docelowy {#reducing-the-cost-when-you-do-control-the-destination-contract}

Jeśli masz kontrolę nad kontraktem docelowym, możesz tworzyć funkcje, które omijają sprawdzanie `msg.sender`, ponieważ ufają interpreterowi calldata.
[Przykład działania można zobaczyć tutaj, w gałęzi `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

Gdyby kontrakt odpowiadał tylko na transakcje zewnętrzne, moglibyśmy sobie poradzić z jednym kontraktem.
Jednakże, złamałoby to [kompozycyjność](/developers/docs/smart-contracts/composability/).
O wiele lepiej jest mieć kontrakt, który odpowiada na normalne wywołania ERC-20, i inny kontrakt, który odpowiada na transakcje z krótkimi danymi wywołania.

### Token.sol {#token-sol-2}

W tym przykładzie możemy zmodyfikować `Token.sol`.
Pozwala to na posiadanie wielu funkcji, które może wywoływać tylko proxy.
Oto nowe części:

```solidity
    // Jedyny adres uprawniony do określenia adresu CalldataInterpreter
    address owner;

    // Adres CalldataInterpreter
    address proxy = address(0);
```

Kontrakt ERC-20 musi znać tożsamość autoryzowanego proxy.
Nie możemy jednak ustawić tej zmiennej w konstruktorze, ponieważ nie znamy jeszcze jej wartości.
Ten kontrakt jest tworzony jako pierwszy, ponieważ proxy oczekuje adresu tokena w swoim konstruktorze.

```solidity
    /**
     * @dev Wywołuje konstruktor ERC20.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

Adres twórcy (o nazwie `owner`) jest tutaj przechowywany, ponieważ jest to jedyny adres uprawniony do ustawienia proxy.

```solidity
    /**
     * @dev Ustawia adres dla proxy (CalldataInterpreter).
     * Może być wywołane tylko raz przez właściciela
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Może być wywołane tylko przez właściciela");
        require(proxy == address(0), "Proxy jest już ustawione");

        proxy = _proxy;
    }    // funkcja setProxy
```

Proxy ma uprzywilejowany dostęp, ponieważ może omijać kontrole bezpieczeństwa.
Aby upewnić się, że możemy zaufać proxy, pozwalamy tylko `owner` na wywołanie tej funkcji, i to tylko raz.
Gdy `proxy` ma rzeczywistą wartość (niezerową), wartość ta nie może ulec zmianie, więc nawet jeśli właściciel zdecyduje się zbuntować lub jego mnemonik zostanie ujawniony, nadal jesteśmy bezpieczni.

```solidity
    /**
     * @dev Niektóre funkcje mogą być wywoływane tylko przez proxy.
     */
    modifier onlyProxy {
```

Jest to [funkcja `modifier`](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), która modyfikuje działanie innych funkcji.

```solidity
      require(msg.sender == proxy);
```

Najpierw zweryfikuj, czy zostaliśmy wywołani przez proxy i nikogo innego.
Jeśli nie, `revert`.

```solidity
      _;
    }
```

Jeśli tak, uruchom funkcję, którą modyfikujemy.

```solidity
   /* Funkcje, które pozwalają proxy na faktyczne pośredniczenie dla kont */

    function transferProxy(address from, address to, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _transfer(from, to, amount);
        return true;
    }

    function approveProxy(address from, address spender, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _approve(from, spender, amount);
        return true;
    }

    function transferFromProxy(
        address spender,
        address from,
        address to,
        uint256 amount
    ) public virtual onlyProxy() returns (bool)
    {
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
```

Są to trzy operacje, które normalnie wymagają, aby wiadomość pochodziła bezpośrednio od podmiotu transferującego tokeny lub zatwierdzającego upoważnienie.
Tutaj mamy wersję proxy tych operacji, która:

1. Jest modyfikowana przez `onlyProxy()`, więc nikt inny nie może ich kontrolować.
2. Otrzymuje adres, który normalnie byłby `msg.sender` jako dodatkowy parametr.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

Interpreter calldata jest prawie identyczny z powyższym, z wyjątkiem tego, że funkcje przekazywane przez proxy otrzymują parametr `msg.sender` i nie ma potrzeby posiadania upoważnienia do `transferu`.

```solidity
        // transfer (nie ma potrzeby posiadania upoważnienia)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // zatwierdzenie
        if (_func == 3) {
            token.approveProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // transferFrom
        if (_func == 4) {
            token.transferFromProxy(
                msg.sender,
                address(uint160(calldataVal( 1, 20))),
                address(uint160(calldataVal(21, 20))),
                calldataVal(41, 2)
            );
        }
```

### Test.js {#test-js-2}

Jest kilka zmian między poprzednim kodem testującym a tym.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

Musimy poinformować kontrakt ERC-20, któremu proxy ma ufać

```js
console.log("Adres CalldataInterpreter:", cdi.address)

// Potrzebujemy dwóch sygnatariuszy do weryfikacji upoważnień
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Aby sprawdzić `approve()` i `transferFrom()`, potrzebujemy drugiego sygnatariusza.
Nazywamy go `poorSigner`, ponieważ nie dostaje żadnych naszych tokenów (musi mieć oczywiście ETH).

```js
// Transfer tokenów
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Ponieważ kontrakt ERC-20 ufa proxy (`cdi`), nie potrzebujemy upoważnienia do przekazywania transferów.

```js
// zatwierdzenie i transferFrom
const approveTx = {
  to: cdi.address,
  data: "0x03" + poorSigner.address.slice(2, 42) + "00FF",
}
await (await signer.sendTransaction(approveTx)).wait()

const destAddr2 = "0xE1165C689C0c3e9642cA7606F5287e708d846206"

const transferFromTx = {
  to: cdi.address,
  data: "0x04" + signer.address.slice(2, 42) + destAddr2.slice(2, 42) + "00FF",
}
await (await poorSigner.sendTransaction(transferFromTx)).wait()

// Sprawdź, czy kombinacja zatwierdzenia / transferFrom została wykonana poprawnie
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Przetestuj dwie nowe funkcje.
Zauważ, że `transferFromTx` wymaga dwóch parametrów adresu: dającego upoważnienie i odbiorcy.

## Wnioski {#conclusion}

Zarówno [Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92), jak i [Arbitrum](https://developer.offchainlabs.com/docs/special_features) szukają sposobów na zmniejszenie rozmiaru calldata zapisywanych w L1, a tym samym kosztów transakcji.
Jednak jako dostawcy infrastruktury poszukujący ogólnych rozwiązań, nasze możliwości są ograniczone.
Jako deweloper dApp, masz wiedzę specyficzną dla aplikacji, co pozwala na znacznie lepszą optymalizację calldata, niż moglibyśmy to zrobić w rozwiązaniu ogólnym.
Mamy nadzieję, że ten artykuł pomoże Ci znaleźć idealne rozwiązanie dla Twoich potrzeb.

[Zobacz więcej mojej pracy tutaj](https://cryptodocguy.pro/).

