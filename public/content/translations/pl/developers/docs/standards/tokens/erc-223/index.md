---
title: Standard tokena ERC-223
description: "Przegląd standardu tokenów zamiennych ERC-223, jak działa i porównanie z ERC-20."
lang: pl
---

## Wprowadzenie {#introduction}

### Czym jest ERC-223? {#what-is-erc223}

ERC-223 to standard tokenów zamiennych, podobny do standardu ERC-20. Główną różnicą jest to, że ERC-223 definiuje nie tylko API tokena, ale także logikę transferu tokenów od nadawcy do odbiorcy. Wprowadza model komunikacji, który pozwala na obsługę transferów tokenów po stronie odbiorcy.

### Różnice w stosunku do ERC-20 {#erc20-differences}

ERC-223 rozwiązuje niektóre ograniczenia ERC-20 i wprowadza nową metodę interakcji między kontraktem tokena a kontraktem, który może otrzymywać tokeny. Istnieje kilka rzeczy, które są możliwe w przypadku ERC-223, ale nie w przypadku ERC-20:

- Obsługa transferu tokenów po stronie odbiorcy: Odbiorcy mogą wykryć, że token ERC-223 jest deponowany.
- Odrzucanie nieprawidłowo wysłanych tokenów: Jeśli użytkownik wyśle tokeny ERC-223 do kontraktu, który nie powinien ich otrzymywać, kontrakt może odrzucić transakcję, zapobiegając utracie tokenów.
- Metadane w transferach: Tokeny ERC-223 mogą zawierać metadane, co pozwala na dołączanie dowolnych informacji do transakcji tokenów.

## Wymagania wstępne {#prerequisites}

- [Konta](/developers/docs/accounts)
- [Inteligentne kontrakty](/developers/docs/smart-contracts/)
- [Standardy tokenów](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Treść {#body}

ERC-223 to standard tokena, który implementuje API dla tokenów w ramach inteligentnych kontraktów. Deklaruje również API dla kontraktów, które mają otrzymywać tokeny ERC-223. Kontrakty, które nie obsługują API odbiorcy ERC-223, nie mogą otrzymywać tokenów ERC-223, co zapobiega błędom użytkowników.

Jeśli inteligentny kontrakt implementuje następujące metody i zdarzenia, można go nazwać kontraktem tokena zgodnym z ERC-223. Po wdrożeniu będzie on odpowiedzialny za śledzenie utworzonych tokenów w sieci Ethereum.

Kontrakt nie jest zobowiązany do posiadania tylko tych funkcji, a programista może dodać do niego dowolną inną funkcję z różnych standardów tokenów. Na przykład funkcje `approve` i `transferFrom` nie są częścią standardu ERC-223, ale mogą zostać zaimplementowane, jeśli zajdzie taka potrzeba.

Z [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### Metody {#methods}

Token ERC-223 musi implementować następujące metody:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

Kontrakt, który ma otrzymywać tokeny ERC-223, musi implementować następującą metodę:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

Jeśli tokeny ERC-223 zostaną wysłane do kontraktu, który nie implementuje funkcji `tokenReceived(..)`, transfer musi się nie powieść, a tokeny nie mogą zostać pobrane z salda nadawcy.

### Zdarzenia {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Przykłady {#examples}

API tokena ERC-223 jest podobne do API ERC-20, więc z punktu widzenia tworzenia interfejsu użytkownika nie ma żadnej różnicy. Jedynym wyjątkiem jest to, że tokeny ERC-223 mogą nie posiadać funkcji `approve` + `transferFrom`, ponieważ są one opcjonalne dla tego standardu.

#### Przykłady w Solidity {#solidity-example}

Poniższy przykład ilustruje, jak działa podstawowy kontrakt tokena ERC-223:

```solidity
pragma solidity ^0.8.19;
abstract contract IERC223Recipient {
    function tokenReceived(address _from, uint _value, bytes memory _data) public virtual;
}
contract VeryBasicERC223Token {
    event Transfer(address indexed from, address indexed to, uint value, bytes data);
    string  private _name;
    string  private _symbol;
    uint8   private _decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private balances;
    function name() public view returns (string memory) { return _name; }
    function symbol() public view returns (string memory) {return _symbol; }
    function decimals() public view returns (uint8) { return _decimals; }
    function totalSupply() public view returns (uint256) { return _totalSupply; }
    function balanceOf(address _owner) public view returns (uint256) { return balances[_owner]; }
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
    }
    function transfer(address _to, uint _value, bytes calldata _data) public returns (bool success){
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }
    function transfer(address _to, uint _value) public returns (bool success){
        bytes memory _empty = hex"00000000";
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _empty);
        }
        emit Transfer(msg.sender, _to, _value, _empty);
        return true;
    }
}
```

Teraz chcemy, aby inny kontrakt akceptował depozyty `tokenA`, zakładając, że tokenA jest tokenem ERC-223. Kontrakt musi akceptować tylko tokenA i odrzucać wszelkie inne tokeny. Kiedy kontrakt otrzyma tokenA, musi wyemitować zdarzenie `Deposit()` i zwiększyć wartość wewnętrznej zmiennej `deposits`.

Oto kod:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // Jedyny token, który chcemy zaakceptować.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // Ważne jest, aby zrozumieć, że wewnątrz tej funkcji
        // msg.sender to adres odbieranego tokena,
        // msg.value wynosi zawsze 0, ponieważ kontrakt tokena w większości przypadków nie posiada ani nie wysyła etheru,
        // _from to nadawca transferu tokenów,
        // _value to ilość tokenów, która została zdeponowana.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Często zadawane pytania {#faq}

### Co się stanie, jeśli wyślemy jakiś tokenB do kontraktu? {#sending-tokens}

Transakcja zakończy się niepowodzeniem, a transfer tokenów nie dojdzie do skutku. Tokeny zostaną zwrócone na adres nadawcy.

### Jak możemy złożyć depozyt w tym kontrakcie? {#contract-deposits}

Wywołaj funkcję `transfer(address,uint256)` lub `transfer(address,uint256,bytes)` tokena ERC-223, określając adres `RecipientContract`.

### Co się stanie, jeśli przetransferujemy token ERC-20 do tego kontraktu? {#erc-20-transfers}

Jeśli token ERC-20 zostanie wysłany do `RecipientContract`, tokeny zostaną przetransferowane, ale transfer nie zostanie rozpoznany (nie zostanie wyemitowane zdarzenie `Deposit()`, a wartość depozytów nie ulegnie zmianie). Niechcianych depozytów ERC-20 nie można filtrować ani im zapobiegać.

### Co jeśli chcemy wykonać jakąś funkcję po zakończeniu deponowania tokena? {#function-execution}

Istnieje na to wiele sposobów. W tym przykładzie zastosujemy metodę, która sprawia, że transfery ERC-223 są identyczne z transferami etheru:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // Jedyny token, który chcemy zaakceptować.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Obsłuż przychodzącą transakcję i wykonaj kolejne wywołanie funkcji.
    }
    function foo() public
    {
        emit Foo();
    }
    function bar(uint256 _someNumber) public
    {
        emit Bar(_someNumber);
    }
}
```

Kiedy `RecipientContract` otrzyma token ERC-223, kontrakt wykona funkcję zakodowaną jako parametr `_data` transakcji tokena, identycznie jak transakcje etheru kodują wywołania funkcji jako `data` transakcji. Przeczytaj o [polu danych](/developers/docs/transactions/#the-data-field), aby uzyskać więcej informacji.

W powyższym przykładzie token ERC-223 musi zostać przetransferowany na adres `RecipientContract` za pomocą funkcji `transfer(address,uin256,bytes calldata _data)`. Jeśli parametrem danych będzie `0xc2985578` (podpis funkcji `foo()`), to funkcja foo() zostanie wywołana po otrzymaniu depozytu tokena i zostanie wyemitowane zdarzenie Foo().

Parametry mogą być również zakodowane w `data` transferu tokena, na przykład możemy wywołać funkcję bar() z wartością 12345 dla `_someNumber`. W tym przypadku `data` musi wynosić `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2`, gdzie `0x0423a132` to podpis funkcji `bar(uint256)`, a `00000000000000000000000000000000000000000000000000000000000004d2` to 12345 jako uint256.

## Ograniczenia {#limitations}

Chociaż ERC-223 rozwiązuje kilka problemów występujących w standardzie ERC-20, nie jest pozbawiony własnych ograniczeń:

- Adopcja i kompatybilność: ERC-223 nie jest jeszcze powszechnie zaadoptowany, co może ograniczać jego kompatybilność z istniejącymi narzędziami i platformami.
- Kompatybilność wsteczna: ERC-223 nie jest wstecznie kompatybilny z ERC-20, co oznacza, że istniejące kontrakty i narzędzia ERC-20 nie będą działać z tokenami ERC-223 bez modyfikacji.
- Koszty gazu: Dodatkowe kontrole i funkcjonalności w transferach ERC-223 mogą skutkować wyższymi kosztami gazu w porównaniu do transakcji ERC-20.

## Dalsza lektura {#further-reading}

- [EIP-223: Standard tokena ERC-223](https://eips.ethereum.org/EIPS/eip-223)
- [Początkowa propozycja ERC-223](https://github.com/ethereum/eips/issues/223)