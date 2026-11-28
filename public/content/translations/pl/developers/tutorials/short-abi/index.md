---
title: "Krótkie ABI do optymalizacji danych wywołania"
description: "Optymalizacja inteligentnych kontraktów dla rollupów optymistycznych"
author: Ori Pomerantz
lang: pl
tags: ["warstwa 2 (L2)"]
skill: intermediate
breadcrumb: "Krótkie ABI"
published: 2022-04-01
---

## Wprowadzenie {#introduction}

W tym artykule dowiesz się o [rollupach optymistycznych](/developers/docs/scaling/optimistic-rollups), kosztach transakcji w nich oraz o tym, jak ta inna struktura kosztów wymaga od nas optymalizacji pod kątem innych rzeczy niż w sieci głównej Ethereum.
Dowiesz się również, jak zaimplementować tę optymalizację.

### Pełne ujawnienie {#full-disclosure}

Jestem pełnoetatowym pracownikiem [Optimism](https://www.optimism.io/), więc przykłady w tym artykule będą uruchamiane na Optimism.
Jednak technika opisana tutaj powinna działać równie dobrze dla innych rollupów.

### Terminologia {#terminology}

Podczas omawiania rollupów, termin „warstwa 1 (L1)” jest używany w odniesieniu do sieci głównej (Mainnet), produkcyjnej sieci Ethereum.
Termin „warstwa 2 (L2)” jest używany w odniesieniu do rollupa lub dowolnego innego systemu, który opiera się na L1 w kwestii bezpieczeństwa, ale wykonuje większość swojego przetwarzania w sposób pozałańcuchowy.

## Jak możemy jeszcze bardziej obniżyć koszt transakcji L2? {#how-can-we-further-reduce-the-cost-of-l2-transactions}

[Optymistyczne rollupy](/developers/docs/scaling/optimistic-rollups) muszą zachować rejestr każdej historycznej transakcji, aby każdy mógł je przejrzeć i zweryfikować, czy obecny stan jest poprawny.
Kiedy ten artykuł był pisany, najtańszym sposobem na wprowadzenie danych do sieci głównej Ethereum było zapisanie ich jako dane wywołania.
To rozwiązanie zostało wybrane zarówno przez [Optimism](https://docs.optimism.io/op-stack/protocol/overview), jak i [Arbitrum](https://docs.arbitrum.io/welcome/arbitrum-gentle-introduction).
Od czasu aktualizacji Dencun (marzec 2024 r.), rollupy mogą zamiast tego publikować te dane w [blobach](/roadmap/danksharding/), które są znacznie tańsze.

### Koszt transakcji L2 {#cost-of-l2-transactions}

Koszt transakcji L2 składa się z dwóch elementów:

1. Przetwarzanie L2, które zazwyczaj jest niezwykle tanie
2. Przechowywanie L1, które jest powiązane z kosztami gazu w sieci głównej

Kiedy pisałem ten artykuł w 2022 roku, na Optimism koszt gazu L2 wynosił 0,001 [gwei](/developers/docs/gas/#what-is-gas).
Z kolei koszt gazu L1 wynosił około 40 gwei.

Bajt danych wywołania kosztuje 4 jednostki gazu (jeśli jest zerem) lub 16 jednostek gazu (jeśli ma jakąkolwiek inną wartość).
Jedną z najdroższych operacji na EVM jest zapis do pamięci (storage).
Maksymalny koszt zapisu 32-bajtowego słowa do pamięci na L2 wynosi 22100 jednostek gazu. W tamtym czasie było to 22,1 gwei.
Więc gdybyśmy mogli zaoszczędzić pojedynczy zerowy bajt danych wywołania, bylibyśmy w stanie zapisać około 200 bajtów do pamięci i nadal wyjść na plus.

#### Jak koszty L2 zmieniły się w 2024 roku {#how-l2-costs-changed-in-2024}

Formuła [opłaty za dane L1](https://docs.optimism.io/op-stack/transactions/fees#l1-data-fee) w OP Stack zmieniła się dwukrotnie od czasu napisania tego artykułu:

- Wraz z [aktualizacją Ecotone](https://docs.optimism.io/op-stack/transactions/fees#ecotone) (marzec 2024 r.), łańcuchy OP Stack zaczęły publikować dane transakcji w blobach, które są wyceniane na podstawie oddzielnej (i zazwyczaj znacznie niższej) opłaty podstawowej za bloby.
- Wraz z [aktualizacją Fjord](https://docs.optimism.io/op-stack/transactions/fees#fjord) (lipiec 2024 r.), opłata za dane L1 opiera się na szacunkowym rozmiarze transakcji po kompresji [FastLZ](https://github.com/ariya/FastLZ), przy czym minimum wynosi 100 bajtów na transakcję ([zobacz specyfikację](https://specs.optimism.io/protocol/fjord/exec-engine.html)).

Zmienia to analizę w pozostałej części tego artykułu na trzy sposoby:

1. Zerowe bajty dobrze się kompresują, więc są prawie darmowe.
   Poniższe wartości 4 i 16 jednostek gazu za bajt to koszt danych wywołania L1, a nie to, co płacisz dzisiaj za dane transakcji w łańcuchu OP Stack.
2. Poniżej minimum 100 bajtów, krótsze dane wywołania niczego nie oszczędzają.
   Na przykład w październiku 2026 r. w sieci głównej OP standardowy `transfer` ERC-20 (68 bajtów danych wywołania) i 23-bajtowa krótka wersja z tego artykułu zapłaciłyby dokładnie taką samą opłatę za dane L1, czyli minimum, około 1 gwei (10<sup>-9</sup> ETH).
3. Ponieważ przestrzeń blobów jest tania, opłata za wykonanie L2 jest teraz często wyższa niż opłata za dane L1.
   Przy cenie gazu L2 wynoszącej 0,001 gwei, 1000 jednostek gazu kosztuje 1 gwei, czyli tyle samo co cała opłata za dane L1, więc dodatkowy gaz na wykonanie przejścia przez kontrakt proxy może kosztować więcej niż bajty, które oszczędza.

Zasada nadal obowiązuje: mniej skompresowanych bajtów oznacza niższą opłatę za dane L1.
Krótkie ABI mają największy sens w przypadku transakcji z dużą ilością danych, które nie kompresują się dobrze, a także w łańcuchach lub w okresach, gdy dane L1 są drogie.
Aby zobaczyć, ile zapłaciłaby konkretna transakcja, wywołaj `getL1Fee` na [predeployu `GasPriceOracle`](https://specs.optimism.io/protocol/predeploys.html#gaspriceoracle) z niepodpisaną transakcją.
Na przykład, używając `cast` z [Foundry](https://getfoundry.sh/introduction/installation/):

```sh
TX=$(cast mktx --raw-unsigned --from <your address> --chain 10 --nonce 0 --gas-limit 100000 \
  --priority-gas-price 1000000 --gas-price 1000000 <destination address> <calldata>)
cast call 0x420000000000000000000000000000000000000F "getL1Fee(bytes)(uint256)" $TX --rpc-url https://mainnet.optimism.io
```

Wynik jest w wei.

### ABI {#the-abi}

Zdecydowana większość transakcji uzyskuje dostęp do kontraktu z konta posiadanego zewnętrznie (EOA).
Większość kontraktów jest napisana w Solidity i interpretuje swoje pole danych zgodnie z [binarnym interfejsem aplikacji (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Jednakże ABI zostało zaprojektowane dla L1, gdzie bajt danych wywołania kosztuje w przybliżeniu tyle samo co cztery operacje arytmetyczne, a nie dla L2, gdzie (w cenach z 2022 r.) bajt danych wywołania kosztuje więcej niż tysiąc operacji arytmetycznych.
Dane wywołania są podzielone w następujący sposób:

| Sekcja | Długość | Bajty | Zmarnowane bajty | Zmarnowany gaz | Niezbędne bajty | Niezbędny gaz |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| Selektor funkcji | 4 | 0-3 | 3 | 48 | 1 | 16 |
| Zera | 12 | 4-15 | 12 | 48 | 0 | 0 |
| Adres docelowy | 20 | 16-35 | 0 | 0 | 20 | 320 |
| Kwota | 32 | 36-67 | 17 | 68 | 15 | 240 |
| Razem | 68 | | | 164 | | 576 |

Wyjaśnienie:

- **Selektor funkcji**: Kontrakt ma mniej niż 256 funkcji, więc możemy je rozróżnić za pomocą jednego bajtu.
  Te bajty są zazwyczaj niezerowe i dlatego [kosztują szesnaście jednostek gazu](https://eips.ethereum.org/EIPS/eip-2028).
- **Zera**: Te bajty są zawsze zerowe, ponieważ dwudziestobajtowy adres nie wymaga trzydziestodwubajtowego słowa do jego przechowania.
  Bajty przechowujące zero kosztują cztery jednostki gazu ([zobacz żółtą księgę](https://ethereum.github.io/yellowpaper/paper.pdf), Dodatek G,
  str. 27, wartość dla `G`<sub>`txdatazero`</sub>).
- **Kwota**: Jeśli założymy, że w tym kontrakcie `decimals` wynosi osiemnaście (normalna wartość), a maksymalna kwota tokenów, które transferujemy, wyniesie 10<sup>18</sup>, otrzymamy maksymalną kwotę 10<sup>36</sup>.
  256<sup>15</sup> &gt; 10<sup>36</sup>, więc piętnaście bajtów wystarczy.

Zmarnowanie 164 jednostek gazu na L1 jest zazwyczaj pomijalne. Transakcja kosztuje co najmniej [21 000 jednostek gazu](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), więc dodatkowe 0,8% nie ma znaczenia.
Jednak na L2 w 2022 roku sytuacja wyglądała inaczej. Prawie cały koszt transakcji polegał na zapisaniu jej na L1.
Oprócz danych wywołania transakcji, istnieje 109 bajtów nagłówka transakcji (adres docelowy, podpis itp.).
Całkowity koszt wynosi zatem `109*16+576+164=2484`, a my marnujemy z tego około 6,6%.

## Obniżanie kosztów, gdy nie kontrolujesz miejsca docelowego {#reducing-costs-when-you-dont-control-the-destination}

Zakładając, że nie masz kontroli nad kontraktem docelowym, nadal możesz użyć rozwiązania podobnego do [tego](https://github.com/qbzzt/ethereum.org-20220330-shortABI).

Aby je uruchomić, potrzebujesz [Node.js](https://nodejs.org/) i git:

```sh
git clone https://github.com/qbzzt/ethereum.org-20220330-shortABI.git
cd ethereum.org-20220330-shortABI
npm install
npx hardhat test
```

Test wdraża kontrakty do wbudowanej sieci lokalnej Hardhata, więc nie potrzebujesz żadnego ETH.
Repozytorium używa Hardhat 2.9, więc w obecnych wersjach Node.js ostrzega, że Twoja wersja Node.js nie jest obsługiwana, ale test nadal kończy się powodzeniem.

Przejdźmy przez odpowiednie pliki.

### Token.sol {#token-sol}

[To jest kontrakt docelowy](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
Jest to standardowy kontrakt ERC-20 z jedną dodatkową funkcją.
Ta funkcja `faucet` pozwala każdemu użytkownikowi zdobyć trochę tokenów do użycia.
Uczyniłoby to produkcyjny kontrakt ERC-20 bezużytecznym, ale ułatwia życie, gdy ERC-20 istnieje tylko po to, by ułatwić testowanie.

```solidity
    /**
     * @dev Daje wywołującemu 1000 tokenów do zabawy
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[To jest kontrakt, który transakcje powinny wywoływać z krótszymi danymi wywołania](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Przeanalizujmy go linijka po linijce.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Potrzebujemy funkcji tokena, aby wiedzieć, jak ją wywołać.

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
    }   // konstruktor
```

Adres tokena to jedyny parametr, który musimy określić.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Odczytaj wartość z danych wywołania.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

Załadujemy pojedyncze 32-bajtowe (256-bitowe) słowo do pamięci i usuniemy bajty, które nie są częścią pożądanego przez nas pola.
Ten algorytm nie działa dla wartości dłuższych niż 32 bajty i oczywiście nie możemy czytać poza końcem danych wywołania.
Na L1 może być konieczne pominięcie tych testów, aby zaoszczędzić na gazie, ale na L2 gaz jest niezwykle tani, co umożliwia nam przeprowadzenie dowolnych kontroli poprawności, jakie tylko przyjdą nam do głowy.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Moglibyśmy skopiować dane z wywołania do `fallback()` (zobacz poniżej), ale łatwiej jest użyć [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), języka asemblera EVM.

Tutaj używamy [kodu operacji CALLDATALOAD](https://www.evm.codes/#35), aby odczytać bajty od `startByte` do `startByte+31` na stos.
Ogólnie rzecz biorąc, składnia kodu operacji w Yul to `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Tylko najbardziej znaczące `length` bajty są częścią pola, więc wykonujemy [przesunięcie w prawo](https://en.wikipedia.org/wiki/Logical_shift), aby pozbyć się pozostałych wartości.
Ma to dodatkową zaletę polegającą na przesunięciu wartości na prawą stronę pola, więc jest to sama wartość, a nie wartość pomnożona przez 256<sup>coś</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Kiedy wywołanie kontraktu Solidity nie pasuje do żadnej z sygnatur funkcji, wywołuje [funkcję `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (zakładając, że taka istnieje).
W przypadku `CalldataInterpreter`, _każde_ wywołanie trafia tutaj, ponieważ nie ma innych funkcji `external` ani `public`.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Odczytaj pierwszy bajt danych wywołania, który mówi nam o funkcji.
Istnieją dwa powody, dla których funkcja nie byłaby tutaj dostępna:

1. Funkcje, które są `pure` lub `view`, nie zmieniają stanu i nie kosztują gazu (gdy są wywoływane w sposób pozałańcuchowy).
   Nie ma sensu próbować obniżać ich kosztu gazu.
2. Funkcje, które opierają się na [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   Wartością `msg.sender` będzie adres `CalldataInterpreter`, a nie wywołującego.

Niestety, [patrząc na specyfikacje ERC-20](https://eips.ethereum.org/EIPS/eip-20), pozostawia to tylko jedną standardową funkcję, `transfer` (ponieważ możemy wywołać `transferFrom`).
Nasz token testowy ma również `faucet`, co możemy obsłużyć, ponieważ możemy przetransferować tokeny z powrotem do tego, kto nas wywołał.

```solidity

        // Wywołaj metody zmieniające stan tokena używając
        // informacji z danych wywołania

        // kranik
        if (_func == 1) {
```

Wywołanie `faucet()`, które nie ma parametrów.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

Po wywołaniu `token.faucet()` otrzymujemy tokeny. Jednak jako kontrakt proxy nie **potrzebujemy** tokenów.
Potrzebuje ich konto posiadane zewnętrznie (EOA) lub kontrakt, który nas wywołał.
Więc transferujemy wszystkie nasze tokeny do tego, kto nas wywołał.

```solidity
        // transfer (zakładając, że mamy na to limit wydatków)
        if (_func == 2) {
```

Transfer tokenów wymaga dwóch parametrów: adresu docelowego i kwoty.

```solidity
            token.transferFrom(
                msg.sender,
```

Pozwalamy wywołującym tylko na transfer tokenów, które posiadają

```solidity
                address(uint160(calldataVal(1, 20))),
```

Adres docelowy zaczyna się od bajtu nr 1 (bajt nr 0 to funkcja).
Jako adres ma długość 20 bajtów.

```solidity
                calldataVal(21, 2)
```

Dla tego konkretnego kontraktu zakładamy, że maksymalna liczba tokenów, którą ktokolwiek chciałby przetransferować, mieści się w dwóch bajtach (mniej niż 65536).

```solidity
            );
        }
```

Ogólnie rzecz biorąc, transfer zajmuje 23 bajty danych wywołania:

| Sekcja | Długość | Bajty |
| ------------------- | -----: | ----: |
| Selektor funkcji | 1 | 0 |
| Adres docelowy | 20 | 1-20 |
| Kwota | 2 | 21-22 |

```solidity
    }   // fallback

}       // kontrakt CalldataInterpreter
```

### test.js {#test-js}

[Ten test jednostkowy w JavaScript](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) pokazuje nam, jak używać tego mechanizmu (i jak zweryfikować, czy działa poprawnie).
Zakładam, że rozumiesz [chai](https://www.chaijs.com/) oraz [ethers](https://docs.ethers.org/v5/) i wyjaśnię tylko te części, które bezpośrednio dotyczą kontraktu.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Should let us use tokens", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Token addr:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("CalldataInterpreter addr:", cdi.address)

    const signer = await ethers.getSigner()
```

Zaczynamy od wdrożenia obu kontraktów.

```javascript
    // Zdobądź tokeny do zabawy
    const faucetTx = {
```

Nie możemy użyć funkcji wysokiego poziomu, których normalnie byśmy użyli (takich jak `token.faucet()`), do tworzenia transakcji, ponieważ nie postępujemy zgodnie z ABI.
Zamiast tego musimy sami zbudować transakcję, a następnie ją wysłać.

```javascript
      to: cdi.address,
      data: "0x01"
```

Są dwa parametry, które musimy podać dla transakcji:

1. `to`, adres docelowy.
   Jest to kontrakt interpretera danych wywołania.
2. `data`, dane wywołania do wysłania.
   W przypadku wywołania kranika, dane to pojedynczy bajt, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Wywołujemy [metodę `sendTransaction` podpisującego (signer)](https://docs.ethers.org/v5/api/signer/#Signer-sendTransaction), ponieważ określiliśmy już cel (`faucetTx.to`) i potrzebujemy, aby transakcja została podpisana.

```javascript
// Sprawdź, czy faucet poprawnie dostarcza tokeny
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Tutaj weryfikujemy saldo.
Nie ma potrzeby oszczędzania gazu na funkcjach `view`, więc po prostu uruchamiamy je normalnie.

```javascript
// Daj CDI limit wydatków (zatwierdzenia nie mogą być pośredniczone)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Przyznaj interpreterowi danych wywołania limit wydatków, aby mógł wykonywać transfery.

```javascript
// Transfer tokenów
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Utwórz transakcję transferu. Pierwszy bajt to „0x02”, po którym następuje adres docelowy, a na końcu kwota (0x0100, czyli 256 w systemie dziesiętnym).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Sprawdź, czy mamy o 256 tokenów mniej
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // I czy nasz cel je otrzymał
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## Obniżanie kosztów, gdy kontrolujesz kontrakt docelowy {#reducing-the-cost-when-you-do-control-the-destination-contract}

Jeśli masz kontrolę nad kontraktem docelowym, możesz utworzyć funkcje, które omijają kontrole `msg.sender`, ponieważ ufają interpreterowi danych wywołania.
[Możesz zobaczyć przykład, jak to działa tutaj, w gałęzi `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).
Aby to uruchomić, przełącz się na tę gałąź w sklonowanym wcześniej repozytorium i uruchom test ponownie:

```sh
git checkout control-contract
npx hardhat test
```

Gdyby kontrakt odpowiadał tylko na transakcje zewnętrzne, moglibyśmy zadowolić się posiadaniem tylko jednego kontraktu.
Jednakże zniszczyłoby to [kompozycyjność](/developers/docs/smart-contracts/composability/).
Znacznie lepiej jest mieć kontrakt, który odpowiada na normalne wywołania ERC-20, oraz inny kontrakt, który odpowiada na transakcje z krótkimi danymi wywołania.

### Token.sol {#token-sol-2}

W tym przykładzie możemy zmodyfikować `Token.sol`.
Pozwala nam to na posiadanie wielu funkcji, które może wywołać tylko kontrakt proxy.
Oto nowe części:

```solidity
    // Jedyny adres uprawniony do określenia adresu CalldataInterpreter
    address owner;

    // Adres CalldataInterpreter
    address proxy = address(0);
```

Kontrakt ERC-20 musi znać tożsamość autoryzowanego kontraktu proxy.
Jednak nie możemy ustawić tej zmiennej w konstruktorze, ponieważ nie znamy jeszcze jej wartości.
Ten kontrakt jest tworzony jako pierwszy, ponieważ kontrakt proxy oczekuje adresu tokena w swoim konstruktorze.

```solidity
    /**
     * @dev Wywołuje konstruktor ERC20.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

Adres twórcy (nazwany `owner`) jest tutaj przechowywany, ponieważ jest to jedyny adres, który może ustawić kontrakt proxy.

```solidity
    /**
     * @dev ustaw adres dla proxy (CalldataInterpreter).
     * Może być wywołane tylko raz przez właściciela
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

Kontrakt proxy ma uprzywilejowany dostęp, ponieważ może ominąć kontrole bezpieczeństwa.
Aby upewnić się, że możemy zaufać kontraktowi proxy, pozwalamy tylko `owner` na wywołanie tej funkcji i to tylko raz.
Gdy `proxy` ma rzeczywistą wartość (nie zero), wartość ta nie może ulec zmianie, więc nawet jeśli właściciel zdecyduje się działać na szkodę lub jego mnemonik zostanie ujawniony, nadal jesteśmy bezpieczni.

```solidity
    /**
     * @dev Niektóre funkcje mogą być wywoływane tylko przez proxy.
     */
    modifier onlyProxy {
```

To jest [funkcja `modifier`](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), modyfikuje ona sposób działania innych funkcji.

```solidity
      require(msg.sender == proxy);
```

Najpierw zweryfikuj, czy zostaliśmy wywołani przez kontrakt proxy i nikogo innego.
Jeśli nie, `revert`.

```solidity
      _;
    }
```

Jeśli tak, uruchom funkcję, którą modyfikujemy.

```solidity
   /* Funkcje, które pozwalają proxy na rzeczywiste pośredniczenie dla kont */

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

Są to trzy operacje, które normalnie wymagają, aby wiadomość pochodziła bezpośrednio od podmiotu transferującego tokeny lub zatwierdzającego limit wydatków.
Tutaj mamy wersję proxy tych operacji, która:

1. Jest modyfikowana przez `onlyProxy()`, więc nikt inny nie może ich kontrolować.
2. Otrzymuje adres, który normalnie byłby `msg.sender`, jako dodatkowy parametr.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

Interpreter danych wywołania jest prawie identyczny z powyższym, z tą różnicą, że funkcje proxy otrzymują parametr `msg.sender` i nie ma potrzeby ustalania limitu wydatków dla `transfer`.

```solidity
        // transfer (brak potrzeby limitu wydatków)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // approve
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

Istnieje kilka zmian między poprzednim kodem testowym a tym.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

Musimy powiedzieć kontraktowi ERC-20, któremu kontraktowi proxy ma ufać

```js
console.log("CalldataInterpreter addr:", cdi.address)

// Potrzeba dwóch podpisujących, aby zweryfikować limity wydatków
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Aby sprawdzić `approve()` i `transferFrom()`, potrzebujemy drugiego podpisującego.
Nazywamy go `poorSigner`, ponieważ nie otrzymuje żadnych naszych tokenów (oczywiście musi posiadać ETH).

```js
// Transfer tokenów
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Ponieważ kontrakt ERC-20 ufa kontraktowi proxy (`cdi`), nie potrzebujemy limitu wydatków do przekazywania transferów.

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

// Sprawdź, czy kombinacja approve / transferFrom została wykonana poprawnie
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Przetestuj dwie nowe funkcje.
Zauważ, że `transferFromTx` wymaga dwóch parametrów adresowych: dawcy limitu wydatków i odbiorcy.

## Wniosek {#conclusion}

Zarówno [Optimism](https://docs.optimism.io/op-stack/transactions/fees#fjord), jak i [Arbitrum](https://docs.arbitrum.io/how-arbitrum-works/deep-dives/gas-and-fees) kompresują teraz dane, które zapisują na L1, i pobierają opłatę za każdą transakcję na podstawie jej skompresowanego rozmiaru, aby obniżyć koszt transakcji.
Jednak jako dostawcy infrastruktury poszukujący ogólnych rozwiązań, nasze możliwości są ograniczone.
Jako deweloper dapp masz wiedzę specyficzną dla aplikacji, co pozwala Ci zoptymalizować dane wywołania znacznie lepiej, niż moglibyśmy to zrobić w ogólnym rozwiązaniu.
Mamy nadzieję, że ten artykuł pomoże Ci znaleźć idealne rozwiązanie dla Twoich potrzeb.

[Zobacz tutaj więcej moich prac](https://cryptodocguy.pro/).

