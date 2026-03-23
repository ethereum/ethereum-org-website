---
title: ERC-223 Token-Standard
description: "Eine Übersicht über den ERC-223-Fungible-Token-Standard, wie er funktioniert und ein Vergleich mit ERC-20."
lang: de
---

## Einführung {#introduction}

### Was ist ERC-223? {#what-is-erc223}

ERC-223 ist ein Standard für Fungible Tokens, ähnlich dem ERC-20-Standard. Der Hauptunterschied besteht darin, dass ERC-223 nicht nur die Token-API definiert, sondern auch die Logik für die Übertragung von Token vom Absender zum Empfänger. Es führt ein Kommunikationsmodell ein, das ermöglicht, dass Token-Übertragungen auf der Empfängerseite verarbeitet werden können.

### Unterschiede zu ERC-20 {#erc20-differences}

ERC-223 behebt einige Einschränkungen von ERC-20 und führt eine neue Methode der Interaktion zwischen dem Token-Contract und einem Contract, der Token empfangen kann, ein. Es gibt einige Dinge, die mit ERC-223 möglich sind, nicht jedoch mit ERC-20:

- Verarbeitung von Token-Übertragungen auf der Empfängerseite: Empfänger können erkennen, dass ein ERC-223-Token eingezahlt wird.
- Ablehnung falsch gesendeter Token: Wenn ein Nutzer ERC-223-Token an einen Contract sendet, der keine Token empfangen soll, kann der Contract die Transaktion ablehnen und so Token-Verluste verhindern.
- Metadaten in Übertragungen: ERC-223-Token können Metadaten enthalten, wodurch beliebige Informationen an Token-Transaktionen angehängt werden können.

## Voraussetzungen {#prerequisites}

- [Konten](/developers/docs/accounts)
- [Smart Contracts](/developers/docs/smart-contracts/)
- [Token-Standards](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Hauptteil {#body}

ERC-223 ist ein Token-Standard, der eine Programmierschnittstelle (API) für Token innerhalb von Smart Contracts implementiert. Zudem legt er eine API für Contracts fest, die ERC-223-Tokens empfangen sollen. Contracts, die die ERC-223-Empfänger-API nicht unterstützen, können keine ERC-223-Token empfangen, wodurch Nutzerfehler vermieden werden.

Ein Smart Contract kann als ERC-223-kompatibler Token-Contract bezeichnet werden, wenn er die folgenden Methoden und Ereignisse implementiert. Nach der Bereitstellung ist er dafür verantwortlich, die erstellten Token auf Ethereum zu verwalten.

Der Contract ist nicht verpflichtet, ausschließlich diese Funktionen zu enthalten; Entwickler:innen können beliebige weitere Funktionen aus anderen Token-Standards hinzufügen. Beispielsweise gehören die Funktionen `approve` und `transferFrom` nicht zum ERC-223-Standard, können jedoch bei Bedarf implementiert werden.

Von [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### Methoden {#methods}

ERC-223-Token müssen die folgenden Methoden implementieren:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

Ein Contract, der ERC-223-Token empfangen soll, muss die folgende Methode implementieren:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

Wenn ERC-223-Token an einen Contract gesendet werden, der die Funktion `tokenReceived(..)` nicht implementiert, muss die Übertragung fehlschlagen und die Token dürfen nicht vom Guthaben des Absenders abgebucht werden.

### Ereignisse {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Beispiele {#examples}

Die API des ERC-223-Tokens ist ähnlich der von ERC-20, sodass es aus Sicht der UI-Entwicklung keinen Unterschied gibt. Die einzige Ausnahme ist hier, dass ERC-223-Token möglicherweise keine `approve` + `transferFrom`-Funktionen haben, da diese für diesen Standard optional sind.

#### Solidity-Beispiele {#solidity-example}

Das folgende Beispiel veranschaulicht, wie ein einfacher ERC-223-Token-Contract funktioniert:

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

Nun soll ein anderer Contract Einzahlungen von `tokenA` annehmen, vorausgesetzt, tokenA ist ein ERC-223-Token. Der Contract darf nur tokenA annehmen und alle anderen Token ablehnen. Wenn der Contract tokenA empfängt, muss er ein `Deposit()`-Ereignis auslösen und den Wert der internen Variable `deposits` erhöhen.

Hier ist der Code:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // Der einzige Token, den wir akzeptieren wollen.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // Es ist wichtig zu verstehen, dass innerhalb dieser Funktion
        // msg.sender die Adresse des Tokens ist, der empfangen wird,
        // msg.value immer 0 ist, da der Token-Contract in den meisten Fällen keinen Ether besitzt oder sendet,
        // _from der Absender der Token-Übertragung ist,
        // _value die Menge der eingezahlten Token ist.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Häufig gestellte Fragen {#faq}

### Was passiert, wenn wir tokenB an den Contract senden? {#sending-tokens}

Die Transaktion wird fehlschlagen, und die Übertragung der Token wird nicht stattfinden. Die Token werden an die Adresse des Absenders zurückgegeben.

### Wie können wir eine Einzahlung an diesen Contract tätigen? {#contract-deposits}

Rufen Sie die Funktion `transfer(address,uint256)` oder `transfer(address,uint256,bytes)` des ERC-223-Tokens auf und geben Sie dabei die Adresse des `RecipientContract` an.

### Was geschieht, wenn wir einen ERC-20-Token an diesen Contract überweisen? {#erc-20-transfers}

Wenn ein ERC-20-Token an den `RecipientContract` gesendet wird, werden die Token zwar übertragen, die Übertragung wird jedoch nicht erkannt (es wird kein `Deposit()`-Event ausgelöst und der Einzahlungswert ändert sich nicht). Unerwünschte ERC-20-Einzahlungen können nicht gefiltert oder verhindert werden.

### Was, wenn wir nach Abschluss der Token-Einzahlung eine bestimmte Funktion ausführen möchten? {#function-execution}

Dafür gibt es mehrere Möglichkeiten. In diesem Beispiel folgen wir der Methode, die ERC-223-Übertragungen mit Ether-Übertragungen identisch macht:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // Der einzige Token, den wir akzeptieren wollen.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Eingehende Transaktion verarbeiten und einen nachfolgenden Funktionsaufruf durchführen.
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

Wenn der `RecipientContract` einen ERC-223-Token empfängt, führt der Contract eine Funktion aus, die als `_data`-Parameter der Token-Transaktion kodiert ist, genauso wie Ether-Transaktionen Funktionsaufrufe als Transaktions-`data` kodieren. Lesen Sie [das Datenfeld](/developers/docs/transactions/#the-data-field) für weitere Informationen.

Im obigen Beispiel muss ein ERC-223-Token mit der Funktion `transfer(address,uin256,bytes calldata _data)` an die Adresse des `RecipientContract` gesendet werden. Wenn der data-Parameter den Wert `0xc2985578` (die Signatur der Funktion `foo()`) enthält, wird die Funktion `foo()` nach dem Empfang der Token-Einzahlung aufgerufen und das Ereignis `Foo()` ausgelöst.

Parameter können ebenfalls im `data`-Feld der Token-Überweisung kodiert werden. Beispielsweise lässt sich die Funktion `bar()` mit dem Wert 12345 für den Parameter `_someNumber` aufrufen. In diesem Fall muss `data` den Wert `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` haben, wobei `0x0423a132` die Signatur der `bar(uint256)`-Funktion ist und `00000000000000000000000000000000000000000000000000000000000004d2` 12345 als uint256 darstellt.

## Einschränkungen {#limitations}

Obwohl ERC-223 mehrere Probleme des ERC-20-Standards behebt, hat er auch seine eigenen Einschränkungen:

- Verbreitung und Kompatibilität: ERC-223 ist noch nicht weit verbreitet, was seine Kompatibilität mit bestehenden Tools und Plattformen einschränken kann.
- Abwärtskompatibilität: ERC-223 ist nicht abwärtskompatibel zu ERC-20, was bedeutet, dass bestehende ERC-20-Contracts und -Tools ohne Änderungen nicht mit ERC-223-Token funktionieren.
- Gaskosten: Die zusätzlichen Überprüfungen und Funktionalitäten bei ERC-223-Übertragungen können im Vergleich zu ERC-20-Transaktionen zu höheren Gaskosten führen.

## Weiterführende Lektüre {#further-reading}

- [EIP-223: ERC-223 Token-Standard](https://eips.ethereum.org/EIPS/eip-223)
- [Ursprünglicher ERC-223-Vorschlag](https://github.com/ethereum/eips/issues/223)
