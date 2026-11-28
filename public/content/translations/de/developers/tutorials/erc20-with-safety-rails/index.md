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

Eines der großartigen Dinge an Ethereum ist, dass es keine zentrale Autorität gibt, die Ihre Transaktionen ändern oder rückgängig machen kann. Eines der großen Probleme bei Ethereum ist, dass es keine zentrale Autorität mit der Macht gibt, Benutzerfehler oder illegale Transaktionen rückgängig zu machen. In diesem Artikel erfahren Sie mehr über einige der häufigsten Fehler, die Benutzer mit [ERC-20](/developers/docs/standards/tokens/erc-20/)-Token machen, sowie darüber, wie Sie ERC-20-Verträge erstellen, die Benutzern helfen, diese Fehler zu vermeiden, oder die einer zentralen Autorität eine gewisse Macht verleihen (zum Beispiel, um Konten einzufrieren).

Beachten Sie, dass wir zwar den [OpenZeppelin ERC-20-Token-Vertrag](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20) verwenden werden, dieser Artikel ihn jedoch nicht im Detail erklärt. Sie finden diese Informationen [hier](/developers/tutorials/erc20-annotated-code).

Wenn Sie den vollständigen Quellcode sehen möchten:

1. Öffnen Sie die [Remix IDE](https://remix.ethereum.org/).
2. Klicken Sie auf das GitHub-Klonen-Symbol (![clone github icon](icon-clone.png)).
3. Klonen Sie das GitHub-Repository `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Öffnen Sie **contracts > erc20-safety-rails.sol**.

Beachten Sie, dass das Repository für OpenZeppelin Contracts 4.7.2 geschrieben wurde, wo die Funktion, die dieser Artikel überschreibt, `_beforeTokenTransfer` heißt. Dieser Artikel verwendet die aktuellen OpenZeppelin Contracts 5.x, wo Sie stattdessen `_update` überschreiben, sodass sich der Code in diesem Artikel geringfügig vom Code im Repository unterscheidet.

## Erstellen eines ERC-20-Vertrags {#creating-an-erc-20-contract}

Bevor wir die Sicherheitsvorkehrungen hinzufügen können, benötigen wir einen ERC-20-Vertrag. In diesem Artikel verwenden wir [den OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/5.x/wizard). Öffnen Sie ihn in einem anderen Browser und befolgen Sie diese Anweisungen:

1. Wählen Sie **ERC20**.
2. Geben Sie diese Einstellungen ein:

   | Parameter      | Wert                      |
   | -------------- | ------------------------- |
   | Name           | SafetyRailsToken          |
   | Symbol         | SAFE                      |
   | Premint        | 1000                      |
   | Features       | None (deaktivieren Sie **Permit**) |
   | Access Control | Ownable                   |
   | Upgradability  | None                      |

3. Scrollen Sie nach oben und klicken Sie auf **Open in Remix** (für Remix) oder **Download**, um eine andere Umgebung zu verwenden. Ich gehe davon aus, dass Sie Remix verwenden; wenn Sie etwas anderes verwenden, nehmen Sie einfach die entsprechenden Änderungen vor.
4. Wir haben nun einen voll funktionsfähigen ERC-20-Vertrag. Sie können `.deps` > `npm` erweitern, um den importierten Code zu sehen.
5. Kompilieren Sie den Vertrag, stellen Sie ihn bereit und spielen Sie damit herum, um zu sehen, dass er als ERC-20-Vertrag funktioniert. Wenn Sie lernen müssen, wie man Remix verwendet, [nutzen Sie dieses Tutorial](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Häufige Fehler {#common-mistakes}

### Die Fehler {#the-mistakes}

Benutzer senden manchmal Token an die falsche Adresse. Obwohl wir keine Gedanken lesen können, um zu wissen, was sie eigentlich tun wollten, gibt es zwei Arten von Fehlern, die häufig vorkommen und leicht zu erkennen sind:

1. Das Senden der Token an die eigene Adresse des Vertrags. Zum Beispiel hat [der OP-Token von Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) in weniger als zwei Monaten [über 120.000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) OP-Token angesammelt. Dies stellt eine beträchtliche Menge an Vermögen dar, das die Leute vermutlich einfach verloren haben.

2. Das Senden der Token an eine leere Adresse, die weder einem [externally owned account (EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) (extern verwaltetes Konto) noch einem [Smart Contract](/developers/docs/smart-contracts) entspricht. Obwohl ich keine Statistiken darüber habe, wie oft dies passiert, [hätte ein Vorfall 20.000.000 Token kosten können](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Transfers verhindern {#preventing-transfers}

Im OpenZeppelin ERC-20-Vertrag durchläuft jede Änderung der Guthaben, sei es ein Transfer, eine Prägung oder ein Verbrennen, [eine interne Funktion, `_update`](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20-_update-address-address-uint256-). Wir können sie überschreiben, um unsere eigene Funktionalität daran anzuhängen, wie zum Beispiel Überprüfungen, die rückgängig machen, wenn es ein Problem gibt.

Fügen Sie dazu diese Funktion nach dem Konstruktor hinzu:

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        super._update(from, to, value);
    }
```

Einige Teile dieser Funktion könnten neu für Sie sein, wenn Sie mit Solidity nicht sehr vertraut sind:

```solidity
        internal virtual
```

Das Schlüsselwort `virtual` bedeutet, dass genau wie wir Funktionalität von `ERC20` geerbt und diese Funktion überschrieben haben, andere Verträge von uns erben und diese Funktion überschreiben können.

```solidity
        override(ERC20)
```

Wir müssen explizit angeben, dass wir die ERC20-Token-Definition von `_update` [überschreiben](https://docs.soliditylang.org/en/latest/contracts.html#function-overriding). Im Allgemeinen sind explizite Definitionen aus Sicherheitssicht viel besser als implizite – man kann nicht vergessen, dass man etwas getan hat, wenn es direkt vor einem steht. Das ist auch der Grund, warum wir angeben müssen, die `_update` welcher Superklasse wir überschreiben.

```solidity
        super._update(from, to, value);
```

Diese Zeile ruft die Funktion `_update` des Vertrags oder der Verträge auf, von denen wir geerbt haben und die sie besitzen. In diesem Fall ist das nur `ERC20`, `Ownable` hat diese Funktion nicht. Im Gegensatz zu einem leeren Hook ist `ERC20._update` das, was die Token tatsächlich bewegt, daher ist es unerlässlich, sie aufzurufen. Unsere Überprüfungen finden vor diesem Aufruf statt, sodass sie rückgängig machen können, bevor sich Guthaben ändern.

### Programmieren der Anforderungen {#coding-the-requirements}

Wir möchten diese Anforderungen zur Funktion hinzufügen. Da `_update` auch aufgerufen wird, wenn Token verbrannt werden, wobei `to` auf `address(0)` gesetzt ist, überprüfen wir `to` nur, wenn es nicht `address(0)` ist:

- Die Adresse `to` darf nicht gleich `address(this)` sein, der Adresse des ERC-20-Vertrags selbst.
- Die Adresse `to` darf nicht leer sein, sie muss entweder Folgendes sein:
  - Ein externes Konto (EOA). Wir können nicht direkt überprüfen, ob eine Adresse ein EOA ist, aber wir können das ETH-Guthaben einer Adresse überprüfen. EOAs haben fast immer ein Guthaben, selbst wenn sie nicht mehr verwendet werden – es ist schwierig, sie bis auf das letzte Wei zu leeren.
  - Ein Smart Contract. Zu testen, ob eine Adresse ein Smart Contract ist, ist etwas schwieriger. Es gibt einen Opcode, der die externe Codelänge überprüft, genannt [`EXTCODESIZE`](https://www.evm.codes/#3b). In Solidity können Sie ihn mit [`<address>.code.length`](https://docs.soliditylang.org/en/latest/units-and-global-variables.html#members-of-address-types) abrufen, was der Compiler in `EXTCODESIZE` umwandelt. Hier verwenden wir [Yul](https://docs.soliditylang.org/en/latest/yul.html), was EVM-Assembly ist, um zu zeigen, wie man den Opcode direkt aufruft. Beachten Sie, dass seit [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) ein EOA auch Code haben kann (eine Delegation an einen Vertrag), sodass diese Überprüfung Konten mit Code identifiziert, nicht streng genommen Verträge. Für unseren Zweck, leere Adressen abzulehnen, ist das in Ordnung.

Hier ist die vollständige Funktion:

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        // Verbrennen sendet Token an Adresse(0), blockiere es nicht
        if (to != address(0)) {
            require(to != address(this), "Can't send tokens to the contract address");

            bool isToContract;
            assembly {
               isToContract := gt(extcodesize(to), 0)
            }

            require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
        }

        super._update(from, to, value);
    }
```

Lassen Sie uns den neuen Code Zeile für Zeile durchgehen:

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

Dies ist die erste Anforderung: Überprüfen Sie, dass `to` und `this(address)` nicht dasselbe sind.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

So überprüfen wir, ob eine Adresse ein Vertrag ist. Wir können die Ausgabe nicht direkt von Yul empfangen, also definieren wir stattdessen eine Variable, um das Ergebnis zu speichern (in diesem Fall `isToContract`). Yul funktioniert so, dass jeder Opcode als Funktion betrachtet wird. Zuerst rufen wir also [`EXTCODESIZE`](https://www.evm.codes/#3b) auf, um die Vertragsgröße zu erhalten, und verwenden dann [`GT`](https://www.evm.codes/#11), um zu überprüfen, ob sie nicht null ist (wir haben es mit vorzeichenlosen Ganzzahlen zu tun, also kann sie natürlich nicht negativ sein). Wir schreiben das Ergebnis dann in `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

Und schließlich haben wir die eigentliche Überprüfung auf leere Adressen.

## Administrativer Zugriff {#admin-access}

Manchmal ist es nützlich, einen Administrator zu haben, der Fehler rückgängig machen kann. Um das Missbrauchspotenzial zu verringern, kann dieser Administrator eine [Multisig](https://blog.logrocket.com/security-choices-multi-signature-wallets/) sein, sodass mehrere Personen einer Aktion zustimmen müssen. In diesem Artikel werden wir zwei administrative Funktionen haben:

1. Einfrieren und Entsperren von Konten. Dies kann zum Beispiel nützlich sein, wenn ein Konto möglicherweise kompromittiert wurde.
2. Bereinigung von Vermögenswerten (Asset Cleanup).

   Manchmal senden Betrüger betrügerische Token an den Vertrag des echten Tokens, um Legitimität zu erlangen. Ein Beispiel [finden Sie hier](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). Der legitime ERC-20-Vertrag ist [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). Der Betrug, der vorgibt, dieser zu sein, ist [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   Es ist auch möglich, dass Leute versehentlich legitime ERC-20-Token an unseren Vertrag senden, was ein weiterer Grund ist, eine Möglichkeit haben zu wollen, sie herauszuholen.

OpenZeppelin bietet zwei Mechanismen, um administrativen Zugriff zu ermöglichen:

- [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable)-Verträge haben einen einzigen Eigentümer. Funktionen, die den [Modifikator](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) `onlyOwner` haben, können nur von diesem Eigentümer aufgerufen werden. Eigentümer können das Eigentum an jemand anderen übertragen oder vollständig darauf verzichten. Die Rechte aller anderen Konten sind in der Regel identisch.
- [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control)-Verträge verfügen über eine [rollenbasierte Zugriffskontrolle (Role Based Access Control, RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Der Einfachheit halber verwenden wir in diesem Artikel `Ownable`.

### Einfrieren und Entsperren von Verträgen {#freezing-and-thawing-contracts}

Das Einfrieren und Entsperren von Verträgen erfordert mehrere Änderungen:

- Ein [Mapping](https://docs.soliditylang.org/en/latest/types.html#mapping-types) von Adressen zu [Booleans](https://en.wikipedia.org/wiki/Boolean_data_type), um nachzuverfolgen, welche Adressen eingefroren sind. Alle Werte sind anfangs null, was bei booleschen Werten als falsch (false) interpretiert wird. Das ist es, was wir wollen, da Konten standardmäßig nicht eingefroren sind.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [Ereignisse](https://docs.soliditylang.org/en/latest/contracts.html#events), um jeden Interessierten zu informieren, wenn ein Konto eingefroren oder entsperrt wird. Technisch gesehen sind Ereignisse für diese Aktionen nicht erforderlich, aber es hilft offchain-Code, auf diese Ereignisse hören zu können und zu wissen, was passiert. Es gilt als guter Ton für einen Smart Contract, sie auszugeben, wenn etwas passiert, das für jemand anderen relevant sein könnte.

  Die Ereignisse sind indiziert, sodass es möglich sein wird, nach allen Zeitpunkten zu suchen, an denen ein Konto eingefroren oder entsperrt wurde.

  ```solidity
    // Wenn Konten eingefroren oder entsperrt werden
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Funktionen zum Einfrieren und Entsperren von Konten. Diese beiden Funktionen sind fast identisch, daher werden wir nur die Funktion zum Einfrieren durchgehen.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  Funktionen, die mit [`public`](https://docs.soliditylang.org/en/latest/contracts.html#function-visibility) markiert sind, können von anderen Smart Contracts oder direkt durch eine Transaktion aufgerufen werden.

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // Konto einfrieren
  ```

  Wenn das Konto bereits eingefroren ist, machen Sie es rückgängig. Andernfalls frieren Sie es ein und geben Sie mit `emit` ein Ereignis aus.

- Ändern Sie `_update`, um zu verhindern, dass Geld von einem eingefrorenen Konto bewegt wird. Beachten Sie, dass weiterhin Geld auf das eingefrorene Konto transferiert werden kann. Setzen Sie diese Zeile an den Anfang der Funktion, außerhalb des `if`-Blocks, damit sie auch das Verbrennen von Token von einem eingefrorenen Konto verhindert.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### Bereinigung von Vermögenswerten {#asset-cleanup}

Um ERC-20-Token freizugeben, die von diesem Vertrag gehalten werden, müssen wir eine Funktion im Token-Vertrag aufrufen, zu dem sie gehören, entweder [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) oder [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). Es hat keinen Sinn, in diesem Fall Gas für Freigaben (Allowances) zu verschwenden, wir können genauso gut direkt transferieren.

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

Dies ist die Syntax, um ein Objekt für einen Vertrag zu erstellen, wenn wir die Adresse erhalten. Um sie zu verwenden, benötigen wir [die Definition für IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), die Schnittstelle für einen OpenZeppelin ERC-20-Vertrag. Die Zeile `import {ERC20} from ...` des Wizards bringt nur `ERC20` ein, fügen Sie also diese Zeile neben den anderen Importen oben in der Datei hinzu:

```solidity
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Dies ist eine Bereinigungsfunktion, also wollen wir vermutlich keine Token zurücklassen. Anstatt das Guthaben manuell vom Benutzer abzurufen, können wir den Prozess genauso gut automatisieren.

## Fazit {#conclusion}

Dies ist keine perfekte Lösung – es gibt keine perfekte Lösung für das Problem „Benutzer hat einen Fehler gemacht“. Die Verwendung solcher Überprüfungen kann jedoch zumindest einige Fehler verhindern. Die Fähigkeit, Konten einzufrieren, ist zwar gefährlich, kann aber genutzt werden, um den Schaden bestimmter Hacks zu begrenzen, indem dem Hacker die gestohlenen Gelder verweigert werden.

[Weitere meiner Arbeiten finden Sie hier](https://cryptodocguy.pro/).
