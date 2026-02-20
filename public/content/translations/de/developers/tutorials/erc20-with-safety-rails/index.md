---
title: ERC-20 mit Sicherheitsvorkehrungen
description: Wie man Leuten helfen kann, dumme Fehler zu vermeiden
author: Ori Pomerantz
lang: de
tags: [ "Erc-20" ]
skill: beginner
published: 2022-08-15
---

## Einführung {#introduction}

Einer der großen Vorteile von Ethereum ist, dass es keine zentrale Instanz gibt, die Ihre Transaktionen ändern oder rückgängig machen kann. Eines der großen Probleme bei Ethereum ist, dass es keine zentrale Instanz gibt, die die Macht hat, Benutzerfehler oder illegale Transaktionen rückgängig zu machen. In diesem Artikel erfahren Sie mehr über einige der häufigsten Fehler, die Benutzer mit [ERC-20](/developers/docs/standards/tokens/erc-20/)-Token machen, sowie darüber, wie Sie ERC-20-Verträge erstellen, die den Benutzern helfen, diese Fehler zu vermeiden, oder die einer zentralen Instanz eine gewisse Macht geben (zum Beispiel das Einfrieren von Konten).

Beachten Sie, dass wir zwar den [OpenZeppelin ERC-20-Token-Vertrag](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20) verwenden werden, dieser Artikel ihn aber nicht im Detail erklärt. Sie können diese Informationen [hier](/developers/tutorials/erc20-annotated-code) finden.

Wenn Sie den vollständigen Quellcode sehen möchten:

1. Öffnen Sie die [Remix IDE](https://remix.ethereum.org/).
2. Klicken Sie auf das GitHub-Klon-Symbol (![clone github icon](icon-clone.png)).
3. Klonen Sie das GitHub-Repository `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Öffnen Sie **contracts > erc20-safety-rails.sol**.

## Einen ERC-20-Vertrag erstellen {#creating-an-erc-20-contract}

Bevor wir die Sicherheitsfunktionalität hinzufügen können, benötigen wir einen ERC-20-Vertrag. In diesem Artikel verwenden wir [den OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/5.x/wizard). Öffnen Sie es in einem anderen Browser und befolgen Sie diese Anweisungen:

1. Wählen Sie **ERC20** aus.

2. Geben Sie diese Einstellungen ein:

   | Parameter          | Wert                            |
   | ------------------ | ------------------------------- |
   | Name               | SafetyRailsToken                |
   | Symbol             | SAFE                            |
   | Premint            | 1000                            |
   | Eigenschaften      | Keine (None) |
   | Zugriffskontrolle  | Ownable                         |
   | Aktualisierbarkeit | Keine (None) |

3. Scrollen Sie nach oben und klicken Sie auf **In Remix öffnen** (für Remix) oder auf **Herunterladen**, um eine andere Umgebung zu verwenden. Ich gehe davon aus, dass Sie Remix verwenden. Wenn Sie etwas anderes verwenden, nehmen Sie einfach die entsprechenden Änderungen vor.

4. Wir haben jetzt einen voll funktionsfähigen ERC-20-Vertrag. Sie können `.deps` > `npm` erweitern, um den importierten Code zu sehen.

5. Kompilieren, deployen und spielen Sie mit dem Vertrag, um zu sehen, dass er als ERC-20-Vertrag funktioniert. Wenn Sie lernen müssen, wie man Remix benutzt, [verwenden Sie dieses Tutorial](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Häufige Fehler {#common-mistakes}

### Die Fehler {#the-mistakes}

Benutzer senden manchmal Token an die falsche Adresse. Wir können zwar nicht ihre Gedanken lesen, um zu wissen, was sie vorhatten, aber es gibt zwei Fehlertypen, die häufig vorkommen und leicht zu erkennen sind:

1. Senden der Token an die eigene Adresse des Vertrags. Zum Beispiel hat [Optimisms OP-Token](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) in weniger als zwei Monaten [über 120.000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) OP-Token angesammelt. Dies stellt ein beträchtliches Vermögen dar, das die Leute vermutlich einfach verloren haben.

2. Senden der Token an eine leere Adresse, die weder einem [externen Konto](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) noch einem [Smart Contract](/developers/docs/smart-contracts) entspricht. Obwohl ich keine Statistiken darüber habe, wie oft dies vorkommt, [hätte ein Vorfall 20.000.000 Token kosten können](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Verhindern von Überweisungen {#preventing-transfers}

Der OpenZeppelin ERC-20-Vertrag enthält [einen Hook, `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368), der aufgerufen wird, bevor ein Token übertragen wird. Standardmäßig tut dieser Hook nichts, aber wir können unsere eigene Funktionalität daran hängen, wie z. B. Prüfungen, die zurücksetzen, wenn es ein Problem gibt.

Um den Hook zu verwenden, fügen Sie diese Funktion nach dem Konstruktor hinzu:

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Einige Teile dieser Funktion sind vielleicht neu für Sie, wenn Sie mit Solidity nicht sehr vertraut sind:

```solidity
        internal virtual
```

Das Schlüsselwort `virtual` bedeutet, dass, so wie wir die Funktionalität von `ERC20` geerbt und diese Funktion überschrieben haben, andere Verträge von uns erben und diese Funktion überschreiben können.

```solidity
        override(ERC20)
```

Wir müssen explizit angeben, dass wir die ERC20-Token-Definition von `_beforeTokenTransfer` [überschreiben](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding). Im Allgemeinen sind explizite Definitionen aus Sicherheitssicht viel besser als implizite – man kann nicht vergessen, dass man etwas getan hat, wenn es direkt vor einem liegt. Das ist auch der Grund, warum wir angeben müssen, welche `_beforeTokenTransfer`-Funktion der Superklasse wir überschreiben.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

Diese Zeile ruft die `_beforeTokenTransfer`-Funktion des Vertrags oder der Verträge auf, von denen wir geerbt haben und die sie besitzen. In diesem Fall ist das nur `ERC20`, `Ownable` hat diesen Hook nicht. Auch wenn `ERC20._beforeTokenTransfer` derzeit nichts tut, rufen wir es auf, für den Fall, dass in Zukunft Funktionalität hinzugefügt wird (und wir uns dann entscheiden, den Vertrag neu zu deployen, da sich Verträge nach dem Deployment nicht ändern).

### Kodierung der Anforderungen {#coding-the-requirements}

Wir wollen der Funktion diese Anforderungen hinzufügen:

- Die `to`-Adresse darf nicht `address(this)` sein, die Adresse des ERC-20-Vertrags selbst.
- Die `to`-Adresse darf nicht leer sein, sie muss entweder:
  - Ein externes Konto (EOA). Wir können nicht direkt prüfen, ob eine Adresse ein EOA ist, aber wir können den ETH-Saldo einer Adresse prüfen. EOAs haben fast immer einen Saldo, auch wenn sie nicht mehr verwendet werden – es ist schwierig, sie bis auf den letzten Wei zu leeren.
  - Ein Smart Contract. Zu testen, ob eine Adresse ein Smart Contract ist, ist etwas schwieriger. Es gibt einen Opcode, der die externe Codelänge prüft, namens [`EXTCODESIZE`](https://www.evm.codes/#3b), aber er ist in Solidity nicht direkt verfügbar. Wir müssen dafür [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html) verwenden, was EVM-Assembly ist. Es gibt andere Werte, die wir von Solidity verwenden könnten ([`<address>.code` und `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)), aber sie kosten mehr.

Gehen wir den neuen Code Zeile für Zeile durch:

```solidity
        require(to != address(this), "Token können nicht an die Vertragsadresse gesendet werden");
```

Dies ist die erste Anforderung: Prüfen, dass `to` und `this(address)` nicht dasselbe sind.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

So prüfen wir, ob eine Adresse ein Vertrag ist. Wir können die Ausgabe nicht direkt von Yul empfangen, also definieren wir stattdessen eine Variable, die das Ergebnis enthält (in diesem Fall `isToContract`). Yul funktioniert so, dass jeder Opcode als eine Funktion betrachtet wird. Zuerst rufen wir also [`EXTCODESIZE`](https://www.evm.codes/#3b) auf, um die Vertragsgröße zu erhalten, und verwenden dann [`GT`](https://www.evm.codes/#11), um zu prüfen, ob sie nicht Null ist (wir haben es mit vorzeichenlosen Ganzzahlen zu tun, also kann sie natürlich nicht negativ sein). Wir schreiben dann das Ergebnis in `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Token können nicht an eine leere Adresse gesendet werden");
```

Und schließlich haben wir die eigentliche Prüfung auf leere Adressen.

## Administrativer Zugriff {#admin-access}

Manchmal ist es nützlich, einen Administrator zu haben, der Fehler rückgängig machen kann. Um das Missbrauchspotenzial zu verringern, kann dieser Administrator ein [Multisig](https://blog.logrocket.com/security-choices-multi-signature-wallets/) sein, sodass mehrere Personen einer Aktion zustimmen müssen. In diesem Artikel werden wir zwei administrative Funktionen haben:

1. Einfrieren und Freigeben von Konten. Dies kann nützlich sein, zum Beispiel, wenn ein Konto kompromittiert sein könnte.
2. Asset-Bereinigung.

   Manchmal senden Betrüger betrügerische Token an den Vertrag des echten Tokens, um an Legitimität zu gewinnen. Zum Beispiel, [sehen Sie hier](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). Der legitime ERC-20-Vertrag ist [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). Der Betrug, der vorgibt, er zu sein, ist [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   Es ist auch möglich, dass Leute versehentlich legitime ERC-20-Token an unseren Vertrag senden, was ein weiterer Grund ist, eine Möglichkeit zu haben, sie herauszuholen.

OpenZeppelin bietet zwei Mechanismen, um administrativen Zugriff zu ermöglichen:

- [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable)-Verträge haben einen einzigen Besitzer. Funktionen, die den `onlyOwner`-[Modifikator](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) haben, können nur von diesem Besitzer aufgerufen werden. Besitzer können das Eigentum an jemand anderen übertragen oder vollständig darauf verzichten. Die Rechte aller anderen Konten sind typischerweise identisch.
- [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control)-Verträge haben eine [rollenbasierte Zugriffskontrolle (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Der Einfachheit halber verwenden wir in diesem Artikel `Ownable`.

### Einfrieren und Auftauen von Verträgen {#freezing-and-thawing-contracts}

Das Einfrieren und Auftauen von Verträgen erfordert mehrere Änderungen:

- Ein [Mapping](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) von Adressen zu [Booleans](https://en.wikipedia.org/wiki/Boolean_data_type), um zu verfolgen, welche Adressen eingefroren sind. Alle Werte sind anfangs Null, was bei booleschen Werten als falsch interpretiert wird. Das ist, was wir wollen, denn standardmäßig sind Konten nicht eingefroren.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [Ereignisse](https://www.tutorialspoint.com/solidity/solidity_events.htm), um alle Interessierten zu informieren, wenn ein Konto eingefroren oder aufgetaut wird. Technisch gesehen sind Ereignisse für diese Aktionen nicht erforderlich, aber es hilft Offchain-Code, auf diese Ereignisse zu lauschen und zu wissen, was passiert. Es gilt als guter Stil, wenn ein Smart Contract sie ausgibt, wenn etwas passiert, das für jemand anderen relevant sein könnte.

  Die Ereignisse sind indiziert, so dass es möglich sein wird, nach allen Zeitpunkten zu suchen, an denen ein Konto eingefroren oder aufgetaut wurde.

  ```solidity
    // Wenn Konten eingefroren oder aufgetaut werden
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Funktionen zum Einfrieren und Auftauen von Konten. Diese beiden Funktionen sind fast identisch, also werden wir nur die Einfrierfunktion durchgehen.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  Funktionen, die als [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) markiert sind, können von anderen Smart Contracts oder direkt durch eine Transaktion aufgerufen werden.

  ```solidity
    {
        require(!frozenAccounts[addr], "Konto bereits eingefroren");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  Wenn das Konto bereits eingefroren ist, wird die Transaktion zurückgesetzt (revert). Andernfalls wird es eingefroren und ein Ereignis per `emit` ausgegeben.

- Ändern Sie `_beforeTokenTransfer`, um zu verhindern, dass Geld von einem eingefrorenen Konto bewegt wird. Beachten Sie, dass Geld weiterhin auf das eingefrorene Konto überwiesen werden kann.

  ```solidity
       require(!frozenAccounts[from], "Das Konto ist eingefroren");
  ```

### Asset-Bereinigung {#asset-cleanup}

Um ERC-20-Token freizugeben, die von diesem Vertrag gehalten werden, müssen wir eine Funktion auf dem Token-Vertrag aufrufen, zu dem sie gehören, entweder [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) oder [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). Es hat keinen Sinn, in diesem Fall Gas für Freigaben (allowances) zu verschwenden, wir können genauso gut direkt übertragen.

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

Dies ist die Syntax, um ein Objekt für einen Vertrag zu erstellen, wenn wir die Adresse erhalten. Wir können dies tun, weil wir die Definition für ERC20-Token als Teil des Quellcodes haben (siehe Zeile 4), und diese Datei enthält [die Definition für IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), die Schnittstelle für einen OpenZeppelin ERC-20-Vertrag.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Dies ist eine Bereinigungsfunktion, also wollen wir vermutlich keine Token übrig lassen. Anstatt den Saldo manuell vom Benutzer abzurufen, können wir den Prozess auch automatisieren.

## Fazit {#conclusion}

Dies ist keine perfekte Lösung – es gibt keine perfekte Lösung für das Problem \"Benutzer hat einen Fehler gemacht\". Die Verwendung dieser Art von Überprüfungen kann jedoch zumindest einige Fehler verhindern. Die Möglichkeit, Konten einzufrieren, ist zwar gefährlich, kann aber genutzt werden, um den Schaden bestimmter Hacks zu begrenzen, indem dem Hacker die gestohlenen Gelder verweigert werden.

[Hier finden Sie mehr von meiner Arbeit](https://cryptodocguy.pro/).
