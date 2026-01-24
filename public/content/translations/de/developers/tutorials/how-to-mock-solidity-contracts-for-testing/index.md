---
title: So simulieren Sie Solidity Smart Contracts für Testzwecke
description: Warum Sie sich beim Testen über Ihre Verträge lustig machen sollten
author: Markus Waas
lang: de
tags:
  [
    "solidity",
    "intelligente Verträge",
    "testen",
    "mocking"
  ]
skill: intermediate
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Mockobjekte](https://wikipedia.org/wiki/Mock_object) sind ein übliches Entwurfsmuster in der objektorientierten Programmierung. Das Wort stammt von dem französischen Wort "mocquer" ab, das so viel bedeutet wie "sich über etwas lustig machen". Es bedeutet aber auch "etwas nachbilden" was genau das ist, was in der Programmierung gemacht wird. Machen Sie sich bitte nur über Ihre Smart Contracts lustig, wenn Sie wollen, aber simulieren Sie sie, wann immer Sie können. Das macht Ihr Leben einfacher.

## Unittests von Verträgen mit Mocks {#unit-testing-contracts-with-mocks}

Das Mocking eines Vertrags bedeutet im Wesentlichen, eine zweite Version dieses Vertrags zu erstellen, die sich sehr ähnlich wie das Original verhält, jedoch auf eine Weise, die vom Entwickler leicht kontrolliert werden kann. Oft hat man es mit komplexen Verträgen zu tun, bei denen man nur [kleine Teile des Vertrags per Unittest testen](/developers/docs/smart-contracts/testing/) möchte. Das Problem dabei ist: Was ist, wenn das Testen dieses kleinen Teils einen ganz bestimmten Vertragszustand erfordert, der nur schwer zu erreichen ist?

Sie könnten jedes Mal eine komplexe Test-Setup-Logik schreiben, die den Vertrag in den erforderlichen Zustand bringt, oder Sie schreiben einen Mock. Das Mocking eines Vertrags ist mit Vererbung einfach. Erstellen Sie einfach einen zweiten Mock-Vertrag, der vom ursprünglichen erbt. Jetzt können Sie Funktionen in Ihrem Mock überschreiben. Sehen wir uns ein Beispiel an.

## Beispiel: Privates ERC20 {#example-private-erc20}

Wir verwenden einen beispielhaften ERC-20-Vertrag, der anfänglich eine private Phase hat. Der Eigentümer kann private Benutzer verwalten und nur diesen ist es zu Beginn gestattet, Tokens zu erhalten. Sobald eine bestimmte Zeit vergangen ist, darf jeder die Tokens verwenden. Falls Sie neugierig sind: Wir verwenden den [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks)-Hook aus den neuen OpenZeppelin Contracts v3.

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

        require(_validRecipient(to), "PrivateERC20: ungültiger Empfänger");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

Und nun werden wir ihn mocken.

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

Da wir die neue Solidity-Version 0.6 verwenden, müssen wir das Schlüsselwort `virtual` für Funktionen, die überschrieben werden können, und `override` für die überschreibende Funktion hinzufügen. Fügen wir diese also beiden `isPublic`-Funktionen hinzu.

In Ihren Unittests können Sie jetzt stattdessen `PrivateERC20Mock` verwenden. Wenn Sie das Verhalten während der privaten Nutzungszeit testen möchten, verwenden Sie `setIsPublic(false)` und entsprechend `setIsPublic(true)` zum Testen der öffentlichen Nutzungszeit. Natürlich könnten wir in unserem Beispiel auch einfach [Zeithelfer](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) verwenden, um die Zeiten entsprechend zu ändern. Aber die Idee des Mockings sollte jetzt klar sein und Sie können sich Szenarien vorstellen, in denen es nicht so einfach ist, wie nur die Zeit vorzustellen.

## Mocking vieler Verträge {#mocking-many-contracts}

Es kann unübersichtlich werden, wenn Sie für jeden einzelnen Mock einen weiteren Vertrag erstellen müssen. Wenn Sie das stört, können Sie sich die [MockContract](https://github.com/gnosis/mock-contract)-Bibliothek ansehen. Sie ermöglicht es Ihnen, das Verhalten von Verträgen zur Laufzeit zu überschreiben und zu ändern. Sie funktioniert jedoch nur für das Mocking von Aufrufen an einen anderen Vertrag, weshalb sie für unser Beispiel nicht funktionieren würde.

## Mocking kann noch leistungsfähiger sein {#mocking-can-be-even-more-powerful}

Die Möglichkeiten des Mockings enden hier nicht.

- Hinzufügen von Funktionen: Nicht nur das Überschreiben einer bestimmten Funktion ist nützlich, sondern auch das einfache Hinzufügen zusätzlicher Funktionen. Ein gutes Beispiel für Tokens ist es, einfach eine zusätzliche `mint`-Funktion zu haben, die es jedem Benutzer erlaubt, kostenlos neue Tokens zu erhalten.
- Verwendung in Testnets: Wenn Sie Ihre Verträge zusammen mit Ihrer Dapp auf Testnets bereitstellen und testen, sollten Sie die Verwendung einer gemockten Version in Betracht ziehen. Vermeiden Sie das Überschreiben von Funktionen, es sei denn, es ist absolut notwendig. Schließlich wollen Sie ja die eigentliche Logik testen. Aber das Hinzufügen zum Beispiel einer Reset-Funktion, die den Vertragszustand einfach auf den Anfang zurücksetzt, kann nützlich sein, ohne dass eine neue Bereitstellung erforderlich ist. Offensichtlich würden Sie das nicht in einem Mainnet-Vertrag haben wollen.
