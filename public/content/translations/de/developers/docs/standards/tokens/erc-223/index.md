---
title: ERC-223-Token-Standard
description: "Ein Überblick über den fungiblen Token-Standard ERC-223, wie er funktioniert und ein Vergleich mit ERC-20."
lang: de
---

## Einführung {#introduction}

### Was ist ERC-223? {#what-is-erc223}

ERC-223 ist ein Standard für fungible Token, ähnlich dem ERC-20-Standard. Der Hauptunterschied besteht darin, dass ERC-223 nicht nur die Token-API definiert, sondern auch die Logik für die Übertragung von Token vom Sender zum Empfänger. Er führt ein Kommunikationsmodell ein, das es ermöglicht, Token-Übertragungen auf der Seite des Empfängers zu verarbeiten.

### Unterschiede zu ERC-20 {#erc20-differences}

ERC-223 behebt einige Einschränkungen von ERC-20 und führt eine neue Methode der Interaktion zwischen dem Token-Vertrag und einem Vertrag ein, der die Token empfangen kann. Es gibt einige Dinge, die mit ERC-223 möglich sind, aber nicht mit ERC-20:

- Verarbeitung von Token-Übertragungen auf Empfängerseite: Empfänger können erkennen, dass ein ERC-223-Token eingezahlt wird.
- Ablehnung von unsachgemäß gesendeten Token: Wenn ein Benutzer ERC-223-Token an einen Vertrag sendet, der keine Token empfangen soll, kann der Vertrag die Transaktion ablehnen und so einen Token-Verlust verhindern.
- Metadaten in Übertragungen: ERC-223-Token können Metadaten enthalten, wodurch beliebige Informationen an Token-Transaktionen angehängt werden können.

## Voraussetzungen {#prerequisites}

- [Konten](/developers/docs/accounts)
- [Smart Contracts](/developers/docs/smart-contracts/)
- [Token-Standards](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Hauptteil {#body}

ERC-223 ist ein Token-Standard, der eine API für Token innerhalb von Smart Contracts implementiert. Er deklariert auch eine API für Verträge, die ERC-223-Token empfangen sollen. Verträge, die die ERC-223-Empfänger-API nicht unterstützen, können keine ERC-223-Token empfangen, was Benutzerfehler verhindert.

Wenn ein Smart Contract die folgenden Methoden und Ereignisse implementiert, kann er als ERC-223-kompatibler Token-Vertrag bezeichnet werden. Sobald er bereitgestellt ist, ist er dafür verantwortlich, die erstellten Token auf Ethereum zu verfolgen.

Der Vertrag ist nicht verpflichtet, nur diese Funktionen zu haben, und ein Entwickler kann diesem Vertrag jede andere Funktion aus verschiedenen Token-Standards hinzufügen. Zum Beispiel sind die Funktionen `approve` und `transferFrom` nicht Teil des ERC-223-Standards, aber diese Funktionen könnten implementiert werden, falls dies erforderlich sein sollte.

Aus [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### Methoden {#methods}

Ein ERC-223-Token muss die folgenden Methoden implementieren:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

Ein Vertrag, der ERC-223-Token empfangen soll, muss die folgende Methode implementieren:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

Wenn ERC-223-Token an einen Vertrag gesendet werden, der die Funktion `tokenReceived(..)` nicht implementiert, muss die Übertragung fehlschlagen und die Token dürfen nicht vom Guthaben des Senders abgebucht werden.

### Ereignisse {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Beispiele {#examples}

Die API des ERC-223-Tokens ähnelt der von ERC-20, sodass es aus Sicht der UI-Entwicklung keinen Unterschied gibt. Die einzige Ausnahme hierbei ist, dass ERC-223-Token möglicherweise keine `approve` + `transferFrom`-Funktionen haben, da diese für diesen Standard optional sind.

#### Solidity-Beispiele {#solidity-example}

Das folgende Beispiel veranschaulicht, wie ein grundlegender ERC-223-Token-Vertrag funktioniert:

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

Nun möchten wir, dass ein anderer Vertrag Einzahlungen von `tokenA` akzeptiert, unter der Annahme, dass tokenA ein ERC-223-Token ist. Der Vertrag darf nur tokenA akzeptieren und muss alle anderen Token ablehnen. Wenn der Vertrag tokenA empfängt, muss er ein `Deposit()`-Ereignis auslösen und den Wert der internen Variablen `deposits` erhöhen.

Hier ist der Code:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // Der einzige Token, den wir akzeptieren wollen.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // Es ist wichtig zu verstehen, dass innerhalb dieser Funktion
        // msg.sender die Adresse eines Tokens ist, der empfangen wird,
        // msg.value  immer 0 ist, da der Token-Vertrag in den meisten Fällen kein Ether besitzt oder sendet,
        // _from      der Absender des Token-Transfers ist,
        // _value     die Anzahl der Token ist, die eingezahlt wurde.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Häufig gestellte Fragen {#faq}

### Was passiert, wenn wir etwas tokenB an den Vertrag senden? {#sending-tokens}

Die Transaktion wird fehlschlagen und die Übertragung der Token wird nicht stattfinden. Die Token werden an die Adresse des Senders zurückgegeben.

### Wie können wir eine Einzahlung in diesen Vertrag vornehmen? {#contract-deposits}

Rufen Sie die Funktion `transfer(address,uint256)` oder `transfer(address,uint256,bytes)` des ERC-223-Tokens auf und geben Sie die Adresse des `RecipientContract` an.

### Was passiert, wenn wir einen ERC-20-Token an diesen Vertrag übertragen? {#erc-20-transfers}

Wenn ein ERC-20-Token an den `RecipientContract` gesendet wird, werden die Token übertragen, aber die Übertragung wird nicht erkannt (es wird kein `Deposit()`-Ereignis ausgelöst und der Wert der Einzahlungen ändert sich nicht). Unerwünschte ERC-20-Einzahlungen können nicht gefiltert oder verhindert werden.

### Was ist, wenn wir nach Abschluss der Token-Einzahlung eine Funktion ausführen möchten? {#function-execution}

Es gibt mehrere Möglichkeiten, dies zu tun. In diesem Beispiel folgen wir der Methode, die ERC-223-Übertragungen identisch mit Ether-Übertragungen macht:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // Der einzige Token, den wir akzeptieren wollen.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Eingehende Transaktion verarbeiten und einen anschließenden Funktionsaufruf durchführen.
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

Wenn der `RecipientContract` einen ERC-223-Token empfängt, führt der Vertrag eine Funktion aus, die als `_data`-Parameter der Token-Transaktion codiert ist, identisch damit, wie Ether-Transaktionen Funktionsaufrufe als Transaktions-`data` codieren. Lesen Sie [das Datenfeld](/developers/docs/transactions/#the-data-field) für weitere Informationen.

Im obigen Beispiel muss ein ERC-223-Token mit der Funktion `transfer(address,uin256,bytes calldata _data)` an die Adresse des `RecipientContract` übertragen werden. Wenn der Datenparameter `0xc2985578` (die Signatur einer `foo()`-Funktion) ist, wird die Funktion foo() aufgerufen, nachdem die Token-Einzahlung empfangen wurde, und das Ereignis Foo() wird ausgelöst.

Parameter können auch in den `data` der Token-Übertragung codiert werden, zum Beispiel können wir die Funktion bar() mit dem Wert 12345 für `_someNumber` aufrufen. In diesem Fall müssen die `data` `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` sein, wobei `0x0423a132` die Signatur der Funktion `bar(uint256)` ist und `00000000000000000000000000000000000000000000000000000000000004d2` 12345 als uint256 ist.

## Einschränkungen {#limitations}

Obwohl ERC-223 mehrere Probleme des ERC-20-Standards behebt, ist er nicht ohne eigene Einschränkungen:

- Akzeptanz und Kompatibilität: ERC-223 ist noch nicht weit verbreitet, was seine Kompatibilität mit bestehenden Tools und Plattformen einschränken kann.
- Abwärtskompatibilität: ERC-223 ist nicht abwärtskompatibel mit ERC-20, was bedeutet, dass bestehende ERC-20-Verträge und -Tools ohne Modifikationen nicht mit ERC-223-Token funktionieren.
- Gaskosten: Die zusätzlichen Überprüfungen und Funktionalitäten bei ERC-223-Übertragungen können im Vergleich zu ERC-20-Transaktionen zu höheren Gaskosten führen.

## Weiterführende Literatur {#further-reading}

- [EIP-223: ERC-223-Token-Standard](https://eips.ethereum.org/EIPS/eip-223)
- [Ursprünglicher ERC-223-Vorschlag](https://github.com/ethereum/eips/issues/223)