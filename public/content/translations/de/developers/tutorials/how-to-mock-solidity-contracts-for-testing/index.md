---
title: "Wie man Solidity-Smart-Contracts für Tests mockt"
description: "Warum Sie sich beim Testen über Ihre Contracts lustig machen sollten"
author: Markus Waas
lang: de
tags: ["Solidity", "Smart Contracts", "Testen", "Mocking"]
skill: intermediate
breadcrumb: Contracts mocken
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Mock-Objekte](https://wikipedia.org/wiki/Mock_object) sind ein gängiges Entwurfsmuster in der objektorientierten Programmierung. Abgeleitet vom altfranzösischen Wort „mocquer“ mit der Bedeutung „sich über etwas lustig machen“, entwickelte es sich zu „etwas Reales imitieren“, was genau das ist, was wir in der Programmierung tun. Bitte machen Sie sich nur über Ihre Smart Contracts lustig, wenn Sie das möchten, aber mocken Sie sie, wann immer Sie können. Es macht Ihr Leben einfacher.

## Unit-Tests von Contracts mit Mocks {#unit-testing-contracts-with-mocks}

Einen Contract zu mocken bedeutet im Wesentlichen, eine zweite Version dieses Contracts zu erstellen, die sich sehr ähnlich wie das Original verhält, aber auf eine Weise, die vom Entwickler leicht kontrolliert werden kann. Oft hat man es mit komplexen Contracts zu tun, bei denen man nur [kleine Teile des Contracts mit Unit-Tests prüfen](/developers/docs/smart-contracts/testing/) möchte. Das Problem ist: Was ist, wenn das Testen dieses kleinen Teils einen sehr spezifischen Contract-Zustand erfordert, der schwer zu erreichen ist?

Sie könnten jedes Mal eine komplexe Test-Setup-Logik schreiben, die den Contract in den erforderlichen Zustand versetzt, oder Sie schreiben einen Mock. Das Mocken eines Contracts ist durch Vererbung einfach. Erstellen Sie einfach einen zweiten Mock-Contract, der vom ursprünglichen erbt. Nun können Sie Funktionen für Ihren Mock überschreiben. Sehen wir uns das an einem Beispiel an.

## Beispiel: Privater ERC-20 {#example-private-erc20}

Wir verwenden einen beispielhaften ERC-20-Contract, der eine anfängliche private Zeitspanne hat. Der Eigentümer kann private Benutzer verwalten und nur diese dürfen zu Beginn Token erhalten. Sobald eine bestimmte Zeit verstrichen ist, darf jeder die Token verwenden. Falls Sie neugierig sind: Wir verwenden den Hook [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) aus den neuen OpenZeppelin-Contracts v3.

```solidity
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateERC20 is ERC20, Ownable {
    mapping (address => bool) public isPrivateUser;
    uint256 private publicAfterTime;

    constructor(uint256 privateERC20timeInSec) ERC20("PrivateERC20", "PRIV") public {
        publicAfterTime = now + privateERC20timeInSec;
    }

    function addUser(address user) external onlyOwner {
        isPrivateUser[user] = true;
    }

    function isPublic() public view returns (bool) {
        return now >= publicAfterTime;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        require(_validRecipient(to), "PrivateERC20: invalid recipient");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

Und nun lassen Sie uns diesen mocken.

```solidity
pragma solidity ^0.6.0;
import "../PrivateERC20.sol";

contract PrivateERC20Mock is PrivateERC20 {
    bool isPublicConfig;

    constructor() public PrivateERC20(0) {}

    function setIsPublic(bool isPublic) external {
        isPublicConfig = isPublic;
    }

    function isPublic() public view returns (bool) {
        return isPublicConfig;
    }
}
```

Sie erhalten eine der folgenden Fehlermeldungen:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

Da wir die neue Solidity-Version 0.6 verwenden, müssen wir das Schlüsselwort `virtual` für Funktionen hinzufügen, die überschrieben werden können, und `override` für die überschreibende Funktion. Fügen wir diese also zu beiden `isPublic`-Funktionen hinzu.

In Ihren Unit-Tests können Sie nun stattdessen `PrivateERC20Mock` verwenden. Wenn Sie das Verhalten während der privaten Nutzungszeit testen möchten, verwenden Sie `setIsPublic(false)` und analog `setIsPublic(true)` zum Testen der öffentlichen Nutzungszeit. Natürlich könnten wir in unserem Beispiel auch einfach [Zeit-Hilfsfunktionen (Time Helpers)](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) verwenden, um die Zeiten entsprechend zu ändern. Aber die Idee des Mockings sollte nun klar sein und Sie können sich Szenarien vorstellen, in denen es nicht so einfach ist, wie nur die Zeit vorzudrehen.

## Viele Contracts mocken {#mocking-many-contracts}

Es kann unübersichtlich werden, wenn Sie für jeden einzelnen Mock einen weiteren Contract erstellen müssen. Wenn Sie das stört, können Sie sich die Bibliothek [MockContract](https://github.com/gnosis/mock-contract) ansehen. Sie ermöglicht es Ihnen, das Verhalten von Contracts im laufenden Betrieb (on-the-fly) zu überschreiben und zu ändern. Sie funktioniert jedoch nur für das Mocken von Aufrufen an einen anderen Contract, würde also für unser Beispiel nicht funktionieren.

## Mocking kann noch mächtiger sein {#mocking-can-be-even-more-powerful}

Die Möglichkeiten des Mockings enden hier nicht.

- Funktionen hinzufügen: Nicht nur das Überschreiben einer bestimmten Funktion ist nützlich, sondern auch das einfache Hinzufügen zusätzlicher Funktionen. Ein gutes Beispiel für Token ist eine zusätzliche `mint`-Funktion, die es jedem Benutzer ermöglicht, kostenlos neue Token zu erhalten.
- Verwendung in Testnets: Wenn Sie Ihre Contracts zusammen mit Ihrer Dapp in Testnets bereitstellen und testen, sollten Sie die Verwendung einer gemockten Version in Betracht ziehen. Vermeiden Sie es, Funktionen zu überschreiben, es sei denn, Sie müssen es wirklich tun. Schließlich wollen Sie die echte Logik testen. Aber das Hinzufügen einer Reset-Funktion kann beispielsweise nützlich sein, um den Contract-Zustand einfach auf den Anfang zurückzusetzen, ohne dass eine neue Bereitstellung erforderlich ist. Offensichtlich würden Sie so etwas nicht in einem Mainnet-Contract haben wollen.