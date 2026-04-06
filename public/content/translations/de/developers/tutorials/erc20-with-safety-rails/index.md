---
title: ERC-20 mit Sicherheitsvorkehrungen
description: Wie man Menschen hilft, dumme Fehler zu vermeiden
author: Ori Pomerantz
lang: de
tags: ["erc-20"]
skill: beginner
breadcrumb: ERC-20-Sicherheit
published: 2022-08-15
---

## Einführung {#introduction}

Eines der großartigen Dinge an Ethereum ist, dass es keine zentrale Autorität gibt, die Ihre Transaktionen ändern oder rückgängig machen kann. Eines der großen Probleme bei Ethereum ist, dass es keine zentrale Autorität gibt, die die Macht hat, Benutzerfehler oder illegale Transaktionen rückgängig zu machen. In diesem Artikel lernen Sie einige der häufigsten Fehler kennen, die Benutzer mit [ERC-20](/developers/docs/standards/tokens/erc-20/)-Token machen, sowie wie man ERC-20-Smart-Contracts erstellt, die Benutzern helfen, diese Fehler zu vermeiden, oder die einer zentralen Autorität eine gewisse Macht verleihen (zum Beispiel, um Konten einzufrieren).

Beachten Sie, dass wir zwar den [OpenZeppelin ERC-20-Token-Smart-Contract](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20) verwenden werden, dieser Artikel ihn jedoch nicht im Detail erklärt. Sie finden diese Informationen [hier](/developers/tutorials/erc20-annotated-code).

Wenn Sie den vollständigen Quellcode sehen möchten:

1. Öffnen Sie die [Remix IDE](https://remix.ethereum.org/).
2. Klicken Sie auf das GitHub-Klonen-Symbol (![clone github icon](icon-clone.png)).
3. Klonen Sie das GitHub-Repository `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Öffnen Sie **contracts > erc20-safety-rails.sol**.

## Erstellen eines ERC-20-Smart-Contracts {#creating-an-erc-20-contract}

Bevor wir die Sicherheitsvorkehrungsfunktionen hinzufügen können, benötigen wir einen ERC-20-Smart-Contract. In diesem Artikel verwenden wir [den OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/5.x/wizard). Öffnen Sie ihn in einem anderen Browser und befolgen Sie diese Anweisungen:

1. Wählen Sie **ERC20** aus.
2. Geben Sie diese Einstellungen ein:

   | Parameter      | Wert             |
   | -------------- | ---------------- |
   | Name           | SafetyRailsToken |
   | Symbol         | SAFE             |
   | Premint        | 1000             |
   | Features       | None             |
   | Access Control | Ownable          |
   | Upgradability  | None             |

3. Scrollen Sie nach oben und klicken Sie auf **Open in Remix** (für Remix) oder **Download**, um eine andere Umgebung zu verwenden. Ich gehe davon aus, dass Sie Remix verwenden; falls Sie etwas anderes nutzen, nehmen Sie einfach die entsprechenden Änderungen vor.
4. Wir haben nun einen voll funktionsfähigen ERC-20-Smart-Contract. Sie können `.deps` > `npm` erweitern, um den importierten Code zu sehen.
5. Kompilieren, deployen und spielen Sie mit dem Smart Contract, um zu sehen, dass er als ERC-20-Smart-Contract funktioniert. Wenn Sie lernen müssen, wie man Remix benutzt, [verwenden Sie dieses Tutorial](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Häufige Fehler {#common-mistakes}

### Die Fehler {#the-mistakes}

Benutzer senden manchmal Token an die falsche Adresse. Obwohl wir keine Gedanken lesen können, um zu wissen, was sie eigentlich tun wollten, gibt es zwei Arten von Fehlern, die häufig vorkommen und leicht zu erkennen sind:

1. Das Senden der Token an die eigene Adresse des Smart Contracts. Zum Beispiel hat der [OP-Token von Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) in weniger als zwei Monaten [über 120.000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) OP-Token angesammelt. Dies stellt eine beträchtliche Menge an Vermögen dar, das die Leute vermutlich einfach verloren haben.

2. Das Senden der Token an eine leere Adresse, die weder einem [Extern verwaltetes Konto](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) noch einem [Smart Contract](/developers/docs/smart-contracts) entspricht. Obwohl ich keine Statistiken darüber habe, wie oft dies passiert, [hätte ein Vorfall 20.000.000 Token kosten können](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Verhindern von Übertragungen {#preventing-transfers}

Der OpenZeppelin ERC-20-Smart-Contract enthält [einen Hook, `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368), der aufgerufen wird, bevor ein Token übertragen wird. Standardmäßig tut dieser Hook nichts, aber wir können unsere eigene Funktionalität daran anhängen, wie zum Beispiel Überprüfungen, die die Transaktion rückgängig machen (revert), wenn es ein Problem gibt.

Um den Hook zu verwenden, fügen Sie diese Funktion nach dem Konstruktor hinzu:

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Einige Teile dieser Funktion könnten neu für Sie sein, wenn Sie nicht sehr vertraut mit Solidity sind:

```solidity
        internal virtual
```

Das Schlüsselwort `virtual` bedeutet, dass, genau wie wir Funktionalität von `ERC20` geerbt und diese Funktion überschrieben haben, andere Smart Contracts von uns erben und diese Funktion überschreiben können.

```solidity
        override(ERC20)
```

Wir müssen explizit angeben, dass wir die ERC20-Token-Definition von `_beforeTokenTransfer` [überschreiben](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding). Im Allgemeinen sind explizite Definitionen aus Sicherheitssicht viel besser als implizite – man kann nicht vergessen, dass man etwas getan hat, wenn es direkt vor einem steht. Das ist auch der Grund, warum wir angeben müssen, von welcher Superklasse wir `_beforeTokenTransfer` überschreiben.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

Diese Zeile ruft die Funktion `_beforeTokenTransfer` des Smart Contracts oder der Smart Contracts auf, von denen wir geerbt haben und die diese Funktion besitzen. In diesem Fall ist das nur `ERC20`, `Ownable` hat diesen Hook nicht. Auch wenn `ERC20._beforeTokenTransfer` derzeit nichts tut, rufen wir sie für den Fall auf, dass in Zukunft Funktionalität hinzugefügt wird (und wir uns dann entscheiden, den Smart Contract neu zu deployen, da sich Smart Contracts nach dem Deployment nicht mehr ändern).

### Programmieren der Anforderungen {#coding-the-requirements}

Wir möchten der Funktion diese Anforderungen hinzufügen:

- Die `to`-Adresse darf nicht gleich `address(this)` sein, der Adresse des ERC-20-Smart-Contracts selbst.
- Die `to`-Adresse darf nicht leer sein, sie muss eines der folgenden sein:
  - Ein Extern verwaltetes Konto (EOA). Wir können nicht direkt überprüfen, ob eine Adresse ein EOA ist, aber wir können das ETH-Guthaben einer Adresse überprüfen. EOAs haben fast immer ein Guthaben, selbst wenn sie nicht mehr verwendet werden – es ist schwierig, sie bis auf das letzte Wei zu leeren.
  - Ein Smart Contract. Zu testen, ob eine Adresse ein Smart Contract ist, ist etwas schwieriger. Es gibt einen Opcode, der die externe Codelänge überprüft, genannt [`EXTCODESIZE`](https://www.evm.codes/#3b), aber er ist in Solidity nicht direkt verfügbar. Wir müssen dafür [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html) verwenden, was EVM-Assembly ist. Es gibt andere Werte, die wir aus Solidity verwenden könnten ([`<address>.code` und `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)), aber sie kosten mehr Gas.

Lassen Sie uns den neuen Code Zeile für Zeile durchgehen:

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

Dies ist die erste Anforderung: Überprüfen, dass `to` und `this(address)` nicht dasselbe sind.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

So überprüfen wir, ob eine Adresse ein Smart Contract ist. Wir können keine direkte Ausgabe von Yul erhalten, also definieren wir stattdessen eine Variable, um das Ergebnis zu speichern (in diesem Fall `isToContract`). Yul funktioniert so, dass jeder Opcode als Funktion betrachtet wird. Zuerst rufen wir also [`EXTCODESIZE`](https://www.evm.codes/#3b) auf, um die Größe des Smart Contracts zu erhalten, und verwenden dann [`GT`](https://www.evm.codes/#11), um zu überprüfen, ob sie nicht null ist (wir haben es mit vorzeichenlosen Ganzzahlen zu tun, also kann sie natürlich nicht negativ sein). Wir schreiben das Ergebnis dann in `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

Und schließlich haben wir die eigentliche Überprüfung auf leere Adressen.

## Administrativer Zugriff {#admin-access}

Manchmal ist es nützlich, einen Administrator zu haben, der Fehler rückgängig machen kann. Um das Missbrauchspotenzial zu verringern, kann dieser Administrator eine [Mehrfachsignatur](https://blog.logrocket.com/security-choices-multi-signature-wallets/) (Multisig) sein, sodass mehrere Personen einer Aktion zustimmen müssen. In diesem Artikel werden wir zwei administrative Funktionen haben:

1. Einfrieren und Entsperren von Konten. Dies kann zum Beispiel nützlich sein, wenn ein Konto möglicherweise kompromittiert wurde.
2. Bereinigung von Vermögenswerten (Asset Cleanup).

   Manchmal senden Betrüger betrügerische Token an den Smart Contract des echten Tokens, um Legitimität zu erlangen. Ein Beispiel [finden Sie hier](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). Der legitime ERC-20-Smart-Contract ist [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). Der Betrug, der vorgibt, dieser zu sein, ist [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   Es ist auch möglich, dass Leute versehentlich legitime ERC-20-Token an unseren Smart Contract senden, was ein weiterer Grund ist, eine Möglichkeit haben zu wollen, sie herauszuholen.

OpenZeppelin bietet zwei Mechanismen, um administrativen Zugriff zu ermöglichen:

- [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable)-Smart-Contracts haben einen einzigen Eigentümer. Funktionen, die den `onlyOwner`-[Modifikator](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) haben, können nur von diesem Eigentümer aufgerufen werden. Eigentümer können das Eigentum an jemand anderen übertragen oder vollständig darauf verzichten. Die Rechte aller anderen Konten sind typischerweise identisch.
- [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control)-Smart-Contracts verfügen über eine [rollenbasierte Zugriffskontrolle (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Der Einfachheit halber verwenden wir in diesem Artikel `Ownable`.

### Einfrieren und Entsperren von Smart Contracts {#freezing-and-thawing-contracts}

Das Einfrieren und Entsperren von Smart Contracts erfordert mehrere Änderungen:

- Ein [Mapping](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) von Adressen zu [Booleans](https://en.wikipedia.org/wiki/Boolean_data_type), um zu verfolgen, welche Adressen eingefroren sind. Alle Werte sind anfangs null, was bei booleschen Werten als falsch (false) interpretiert wird. Das ist es, was wir wollen, da Konten standardmäßig nicht eingefroren sind.

  ```solidity
      mapping(address => bool) public frozenAccounts;
```

- [Events](https://www.tutorialspoint.com/solidity/solidity_events.htm) (Ereignisse), um jeden Interessierten zu informieren, wenn ein Konto eingefroren oder entsperrt wird. Technisch gesehen sind Events für diese Aktionen nicht erforderlich, aber sie helfen Off-Chain-Code dabei, auf diese Events zu hören und zu wissen, was passiert. Es gilt als guter Ton für einen Smart Contract, sie auszugeben (emit), wenn etwas passiert, das für jemand anderen relevant sein könnte.

  Die Events sind indiziert, sodass es möglich sein wird, nach allen Malen zu suchen, in denen ein Konto eingefroren oder entsperrt wurde.

  ```solidity
    // Wenn Konten eingefroren oder entsperrt werden
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
```

- Funktionen zum Einfrieren und Entsperren von Konten. Diese beiden Funktionen sind nahezu identisch, daher werden wir nur die Einfrier-Funktion durchgehen.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
```

  Funktionen, die als [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) markiert sind, können von anderen Smart Contracts oder direkt durch eine Transaktion aufgerufen werden.

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    } // freezeAccount
```

  Wenn das Konto bereits eingefroren ist, wird die Transaktion rückgängig gemacht (revert). Andernfalls frieren Sie es ein und geben ein Event aus (`emit`).

- Ändern Sie `_beforeTokenTransfer`, um zu verhindern, dass Geld von einem eingefrorenen Konto verschoben wird. Beachten Sie, dass weiterhin Geld auf das eingefrorene Konto überwiesen werden kann.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
```

### Bereinigung von Vermögenswerten {#asset-cleanup}

Um ERC-20-Token freizugeben, die von diesem Smart Contract gehalten werden, müssen wir eine Funktion im Token-Smart-Contract aufrufen, zu dem sie gehören, entweder [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) oder [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). Es hat keinen Sinn, in diesem Fall Gas für Freigaben (Allowances) zu verschwenden, wir können genauso gut direkt übertragen.

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

Dies ist die Syntax, um ein Objekt für einen Smart Contract zu erstellen, wenn wir die Adresse erhalten. Wir können dies tun, weil wir die Definition für ERC-20-Token als Teil des Quellcodes haben (siehe Zeile 4), und diese Datei enthält [die Definition für IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), die Schnittstelle für einen OpenZeppelin ERC-20-Smart-Contract.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Dies ist eine Bereinigungsfunktion, also wollen wir vermutlich keine Token zurücklassen. Anstatt das Guthaben manuell vom Benutzer abzurufen, können wir den Prozess genauso gut automatisieren.

## Fazit {#conclusion}

Dies ist keine perfekte Lösung – es gibt keine perfekte Lösung für das Problem „Benutzer hat einen Fehler gemacht“. Die Verwendung solcher Überprüfungen kann jedoch zumindest einige Fehler verhindern. Die Möglichkeit, Konten einzufrieren, ist zwar gefährlich, kann aber genutzt werden, um den Schaden bestimmter Hacks zu begrenzen, indem dem Hacker die gestohlenen Gelder verweigert werden.

[Weitere meiner Arbeiten finden Sie hier](https://cryptodocguy.pro/).