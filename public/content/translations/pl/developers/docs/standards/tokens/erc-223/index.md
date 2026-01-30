---
title: Standard tokenów ERC-223
description: Przegląd standardu tokenów wymienialnych ERC-223, tego, jak działa wraz z porównaniem z ERC-20.
lang: pl
---

## Wprowadzenie {#introduction}

### Czym jest ERC-223? {#what-is-erc223}

ERC-223 jest standardem dla tokenów wymienialnych, podobnie jak standard ERC-20. Kluczową różnicą jest to, że ERC-223 określa nie tylko API tokena, ale również logikę odpowiedzialną za transfer tokenów od nadawcy do odbiorcy. Wprowadza model komunikacji, który zezwala na obsługę transferów tokenów po stronie odbiorcy.

### Różnice w stosunku do ERC-20 {#erc20-differences}

ERC-223 rozwiązuje pewne ograniczenia ERC-20 oraz wprowadza nową metodę interakcji między kontraktem tokena, a kontraktem, które może otrzymać tokeny. Istnieje kilka rzeczy, które są możliwe z ERC-223, ale nie z ERC-20:

- Obsługa transferu tokenów po stronie odbiorcy: odbiorcy mogą wykryć, że token ERC-223 zostaje wpłacony.
- Odrzucenie nieprawidłowo wysłanych tokenów: jeśli użytkownik wyśle tokeny ERC-223 do kontraktu, który nie powinien otrzymać tokenów, to kontrakt może odrzucić transakcję, zapobiegając utracie tokenów.
- Metadane w transferach: tokeny ERC-223 mogą zawierać metadane zezwalające na dołączenie dowolnych informacji do transakcji tokenowych.

## Wymagania wstępne {#prerequisites}

- [Konta](/developers/docs/accounts)
- [Inteligentne kontrakty](/developers/docs/smart-contracts/)
- [Standardy tokenów](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Treść {#body}

ERC-223 to standard tokenów, który implementuje API dla tokenów w inteligentnych kontraktach. Deklaruje również API dla kontraktów, które miałyby otrzymywać tokeny ERC-223. Kontrakty, które nie wspierają API odbiorcy ERC-223, nie mogą otrzymać tokenów ERC-223, co zapobiega przed błędami użytkownika.

Jeśli inteligentny kontrakt implementuje następujące metody i zdarzenia to może zostać nazwanym kontraktem tokena zgodnym z ERC-223. Po wdrożeniu będzie on odpowiedzialny za monitorowanie stworzonym tokenów na Ethereum.

Kontrakt nie jest zobowiązany, aby mieć tylko te funkcje, a deweloper może dodać każdą inną funkcję od innego standardu tokenów to tego kontraktu. Dla przykładu, funkcje `approve` oraz `transferFrom` nie są częścią standardu ERC-223, ale mogą zostać zaimplementowane, jeśli tylko zajdzie taka potrzeba.

Na podstawie [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### Metody {#methods}

Token ERC-223 musi zaimplementować następujące metody:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

A kontrakt, który miałby otrzymać tokeny ERC-223 musi zaimplementować następującą metodę:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

Jeśli tokeny ERC-223 zostaną wysłane do kontraktu, który nie zaimplementował funkcji `tokenReceived(..)`, to transfer musi się zakończyć niepowodzeniem, a tokeny nie mogą zostać przeniesione z konta nadawcy.

### Zdarzenia {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Przykłady {#examples}

API tokena ERC-223 jest podobne do tego z ERC-20, więc z punktu widzenia rozwoju UI, nie ma różnicy. Jedynym wyjątkiem tutaj jest to, że tokeny ERC-223 mogą nie mieć funkcji `approve` i `transferFrom`, ponieważ te są opcjonalne dla tego standardu.

#### Przykłady w Solidity {#solidity-example}

Poniższy przykład pokazuje, w jaki sposób działa podstawowy kontrakt tokena ERC-223:

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

Teraz chcemy, aby inny kontrakt zaakceptował wpłaty tokena o nazwie `tokenA` zakładając, że tokenA jest tokenem ERC-223. Kontrakt musi akceptować tylko tokenA oraz odrzucać wszystkie inne tokeny. Kiedy kontrakt otrzyma tokenA, music wyemitować zdarzenie `Deposit()` oraz zwiększyć wartość wewnętrznej zmiennej `deposits`.

Oto kod:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // Jedyny token, który chcemy akceptować.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // Ważne jest, aby zrozumieć, że w ramach tej funkcji
        // msg.sender to adres otrzymywanego tokenu,
        // msg.value ma zawsze wartość 0, ponieważ kontrakt tokenu w większości przypadków nie posiada ani nie wysyła etheru,
        // _from      to nadawca transferu tokenu,
        // _value     to kwota tokenów, które zostały zdeponowane.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Często zadawane pytania {#faq}

### Co się stanie, jeśli wyślę tokenB do kontraktu? {#sending-tokens}

Transakcja się nie powiedzie, a transfer tokenów się nie wydarzy. Tokeny zostają zwrócone na adres nadawcy.

### Jak mogę dokonać wpłaty na ten kontrakt? {#contract-deposits}

Wywołaj funkcję `transfer(address,uint256)` lub `transfer(address,uint256,bytes)` tokena ERC-223, określając adres `RecipientContract`.

### Co się stanie, jeśli wyślę token ERC-20 do tego kontraktu? {#erc-20-transfers}

Jeśli token ERC-20 zostanie wysłany do `RecipientContract`, to tokeny zostaną przesłane, ale transfer nie zostanie rozpoznany (nie zostanie uruchomione żadnego zdarzenie `Deposit()`, a wartość depozytów nie zostanie zmieniona). Niechcianych wpłat ERC-20 nie można filtrować ani im zapobiegać.

### Co, jeśli chcę wykonać jakąś funkcję po zakończeniu wpłaty tokena? {#function-execution}

Istnieje kilka sposobów na zrobienie tego. W tym przykładzie zastosujemy metodę, która sprawia, że transfery ERC-223 są identyczne, jak transfery etheru:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // The only token that we want to accept.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Handle incoming transaction and perform a subsequent function call.
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

Kiedy `RecipientContract` otrzyma token ERC-223, kontrakt wykona funkcję zakodowaną jako parametr `_data` transakcji tokena, identycznie do tego, jak transakcje etheru kodują wywołania funkcji jako `data` transakcji. Przeczytaj o [polu danych](/developers/docs/transactions/#the-data-field) po więcej informacji.

W powyższym przykładzie token ERC-223 musi zostać przeniesiony na adres `RecipientContract` przy użyciu funkcji `transfer(address,uin256,bytes calldata _data)`. Jeśli parametr danych będzie wynosił `0xc2985578` (podpis funkcji `foo()`), to funkcja foo() zostanie wywołana po otrzymaniu wpłaty tokena oraz zostanie uruchomione zdarzenie Foo().

Parametry mogą również zostać zakodowane w `data` transferu tokena, dla przykładu możemy wywołać funkcję bar() z wartością 12345 dla `_someNumber`. W tym przypadku `data` musi wynosić
`0x0423a13200000000000000000000000000000000000000000000000000000000000004d2`, gdzie
`0x0423a132` to podpis funkcji `bar(uint256)`, a
`00000000000000000000000000000000000000000000000000000000000004d2` to 12345 w formie uint256.

## Ograniczenia {#limitations}

Chociaż ERC-223 rozwiązuje parę problemów znalezionych w standardzie ERC-20, to nie jest pozbawiony on własnych ograniczeń:

- Przyjęcie i kompatybilność: ERC-223 nie jest jeszcze powszechnie przyjęty, co może ograniczać jego kompatybilność z istniejącymi narzędziami i platformami.
- Kompatybilność wsteczna: ERC-223 nie jest wstecznie kompatybilny z ERC-20, co oznacza, że istniejące kontrakty ERC-20 i narzędzia nie będą działać z tokenami ERC-223 bez modyfikacji.
- Koszty gazu: dodatkowe kontrole i funkcje w transferach ERC-223 mogą powodować większe koszta gazu w porównaniu z transakcjami ERC-20.

## Dalsza lektura {#further-reading}

- [EIP-223: standard tokenów ERC-223](https://eips.ethereum.org/EIPS/eip-223)
- [Wstępna propozycja ERC-223](https://github.com/ethereum/eips/issues/223)
