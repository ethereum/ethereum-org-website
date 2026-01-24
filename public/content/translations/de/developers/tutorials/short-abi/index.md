---
title: "Kurze ABIs zur Calldata-Optimierung"
description: Optimierung von Smart Contracts für Optimistic Rollups
author: Ori Pomerantz ist der Autor des Linux Kernel Module Programming Guide
lang: de
tags: [ "Layer 2" ]
skill: intermediate
published: 2022-04-01
---

## Einführung {#introduction}

In diesem Artikel erfahren Sie mehr über [Optimistic Rollups](/developers/docs/scaling/optimistic-rollups), die Transaktionskosten auf ihnen und wie diese andere Kostenstruktur es erfordert, dass wir für andere Dinge optimieren als auf dem Ethereum-Mainnet.
Sie erfahren auch, wie Sie diese Optimierung implementieren können.

### Vollständige Offenlegung {#full-disclosure}

Ich bin ein Vollzeitmitarbeiter bei [Optimism](https://www.optimism.io/), daher werden die Beispiele in diesem Artikel auf Optimism ausgeführt.
Die hier erläuterte Technik sollte jedoch genauso gut für andere Rollups funktionieren.

### Terminologie {#terminology}

Wenn über Rollups gesprochen wird, wird der Begriff „Layer 1“ (L1) für das Mainnet, das produktive Ethereum-Netzwerk, verwendet.
Der Begriff „Layer 2“ (L2) wird für den Rollup oder jedes andere System verwendet, das für die Sicherheit auf L1 angewiesen ist, aber den größten Teil seiner Verarbeitung offchain durchführt.

## Wie können wir die Kosten von L2-Transaktionen weiter senken? {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[Optimistic Rollups](/developers/docs/scaling/optimistic-rollups) müssen eine Aufzeichnung jeder historischen Transaktion aufbewahren, sodass jeder sie durchgehen und überprüfen kann, dass der aktuelle Zustand korrekt ist.
Der günstigste Weg, Daten in das Ethereum-Mainnet zu bekommen, ist, sie als Calldata zu schreiben.
Diese Lösung wurde sowohl von [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) als auch von [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups) gewählt.

### Kosten von L2-Transaktionen {#cost-of-l2-transactions}

Die Kosten von L2-Transaktionen setzen sich aus zwei Komponenten zusammen:

1. L2-Verarbeitung, die in der Regel extrem günstig ist
2. L1-Speicher, der an die Gas-Kosten des Mainnets gebunden ist

Während ich dies schreibe, betragen die Kosten für L2-Gas auf Optimism 0,001 [Gwei](/developers/docs/gas/#pre-london).
Die Kosten für L1-Gas hingegen betragen ungefähr 40 Gwei.
[Die aktuellen Preise können Sie hier einsehen](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

Ein Byte Calldata kostet entweder 4 Gas (wenn es null ist) oder 16 Gas (wenn es ein anderer Wert ist).
Eine der teuersten Operationen auf der EVM ist das Schreiben in den Speicher.
Die maximalen Kosten für das Schreiben eines 32-Byte-Wortes in den Speicher auf L2 betragen 22.100 Gas. Derzeit sind das 22,1 Gwei.
Wenn wir also ein einziges Null-Byte an Calldata einsparen können, können wir etwa 200 Bytes in den Speicher schreiben und trotzdem einen Vorteil erzielen.

### Das ABI {#the-abi}

Die überwiegende Mehrheit der Transaktionen greift auf einen Vertrag über ein externes Konto zu.
Die meisten Verträge sind in Solidity geschrieben und interpretieren ihr Datenfeld gemäß der [Application Binary Interface (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Das ABI wurde jedoch für L1 entwickelt, wo ein Byte Calldata ungefähr so viel kostet wie vier arithmetische Operationen, und nicht für L2, wo ein Byte Calldata mehr als tausend arithmetische Operationen kostet.
Die Calldata ist wie folgt aufgeteilt:

| Abschnitt         | Länge | Bytes | Verschwendete Bytes | Verschwendetes Gas | Benötigte Bytes | Benötigtes Gas |
| ----------------- | ----: | ----: | ------------------: | -----------------: | --------------: | -------------: |
| Funktionsselektor |     4 |   0-3 |                   3 |                 48 |               1 |             16 |
| Nullen            |    12 |  4-15 |                  12 |                 48 |               0 |              0 |
| Zieladresse       |    20 | 16-35 |                   0 |                  0 |              20 |            320 |
| Betrag            |    32 | 36-67 |                  17 |                 64 |              15 |            240 |
| Gesamt            |    68 |       |                     |                160 |                 |            576 |

Erläuterung:

- **Funktionsselektor**: Der Vertrag hat weniger als 256 Funktionen, sodass wir sie mit einem einzigen Byte unterscheiden können.
  Diese Bytes sind typischerweise nicht null und kosten daher [sechzehn Gas](https://eips.ethereum.org/EIPS/eip-2028).
- **Nullen**: Diese Bytes sind immer null, weil eine 20-Byte-Adresse kein 32-Byte-Wort benötigt, um sie zu speichern.
  Bytes, die null enthalten, kosten vier Gas ([siehe Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf), Anhang G,
  S. 27, der Wert für `G`<sub>`txdatazero`</sub>).
- **Betrag**: Wenn wir annehmen, dass in diesem Vertrag `decimals` achtzehn ist (der normale Wert) und der maximale Betrag an Tokens, den wir überweisen, 10<sup>18</sup> sein wird, erhalten wir einen maximalen Betrag von 10<sup>36</sup>.
  256<sup>15</sup> > 10<sup>36</sup>, also sind fünfzehn Bytes ausreichend.

Eine Verschwendung von 160 Gas auf L1 ist normalerweise vernachlässigbar. Eine Transaktion kostet mindestens [21.000 Gas](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), daher machen zusätzliche 0,8 % keinen Unterschied.
Auf L2 sind die Dinge jedoch anders. Fast die gesamten Kosten der Transaktion entstehen durch das Schreiben auf L1.
Zusätzlich zu den Transaktions-Calldata gibt es 109 Bytes Transaktions-Header (Zieladresse, Signatur usw.).
Die Gesamtkosten betragen daher `109*16+576+160=2480`, und wir verschwenden etwa 6,5 % davon.

## Kosten senken, wenn Sie das Ziel nicht kontrollieren {#reducing-costs-when-you-dont-control-the-destination}

Angenommen, Sie haben keine Kontrolle über den Zielvertrag, können Sie dennoch eine Lösung verwenden, die [dieser](https://github.com/qbzzt/ethereum.org-20220330-shortABI) ähnlich ist.
Sehen wir uns die relevanten Dateien an.

### Token.sol {#token-sol}

[Dies ist der Zielvertrag](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
Es handelt sich um einen Standard-ERC-20-Vertrag mit einer zusätzlichen Funktion.
Diese `faucet`-Funktion ermöglicht es jedem Benutzer, einige Tokens zur Verwendung zu erhalten.
Es würde einen produktiven ERC-20-Vertrag unbrauchbar machen, aber es erleichtert das Leben, wenn ein ERC-20 nur zum Testen existiert.

```solidity
    /**
     * @dev Gibt dem Aufrufer 1000 Tokens zum Herumspielen
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // Funktion Faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Dies ist der Vertrag, den Transaktionen mit kürzeren Calldata aufrufen sollen](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Gehen wir ihn Zeile für Zeile durch.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Wir benötigen die Token-Funktion, um zu wissen, wie sie aufgerufen wird.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

Die Adresse des Tokens, für das wir ein Proxy sind.

```solidity

    /**
     * @dev Geben Sie die Token-Adresse an
     * @param tokenAddr_ ERC-20-Vertragsadresse
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // Konstruktor
```

Die Token-Adresse ist der einzige Parameter, den wir angeben müssen.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Lesen Sie einen Wert aus den Calldata.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal-Längenlimit beträgt 32 Bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal versucht, über die Calldata-Größe hinaus zu lesen");
```

Wir laden ein einzelnes 32-Byte-(256-Bit)-Wort in den Speicher und entfernen die Bytes, die nicht zu dem gewünschten Feld gehören.
Dieser Algorithmus funktioniert nicht für Werte, die länger als 32 Bytes sind, und natürlich können wir nicht über das Ende der Calldata hinaus lesen.
Auf L1 könnte es notwendig sein, diese Tests zu überspringen, um Gas zu sparen, aber auf L2 ist Gas extrem billig, was alle denkbaren Plausibilitätsprüfungen ermöglicht.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Wir hätten die Daten aus dem Aufruf von `fallback()` (siehe unten) kopieren können, aber es ist einfacher, [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), die Assemblersprache der EVM, zu verwenden.

Hier verwenden wir [den CALLDATALOAD-Opcode](https://www.evm.codes/#35), um die Bytes von `startByte` bis `startByte+31` in den Stack zu lesen.
Im Allgemeinen lautet die Syntax eines Opcodes in Yul `<Opcode-Name>(<erster Stack-Wert, falls vorhanden>,<zweiter Stack-Wert, falls vorhanden>...).`

```solidity

        _retVal = _retVal >> (256-length*8);
```

Nur die höchstwertigen `length` Bytes sind Teil des Feldes, daher verwenden wir eine [Rechtsverschiebung](https://en.wikipedia.org/wiki/Logical_shift), um die anderen Werte zu entfernen.
Dies hat den zusätzlichen Vorteil, dass der Wert nach rechts im Feld verschoben wird, sodass es der Wert selbst ist und nicht der Wert mal 256<sup>irgendwas</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Wenn ein Aufruf an einen Solidity-Vertrag keiner der Funktionssignaturen entspricht, ruft er [die `fallback()`-Funktion](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) auf (sofern eine vorhanden ist).
Im Fall von `CalldataInterpreter` landet _jeder_ Aufruf hier, da es keine anderen `external`- oder `public`-Funktionen gibt.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Lesen Sie das erste Byte der Calldata, das uns die Funktion mitteilt.
Es gibt zwei Gründe, warum eine Funktion hier nicht verfügbar wäre:

1. Funktionen, die `pure` oder `view` sind, ändern den Zustand nicht und kosten kein Gas (wenn sie offchain aufgerufen werden).
   Es macht keinen Sinn, ihre Gas-Kosten zu reduzieren.
2. Funktionen, die auf [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties) angewiesen sind.
   Der Wert von `msg.sender` wird die Adresse von `CalldataInterpreter` sein, nicht die des Aufrufers.

Leider, [wenn man sich die ERC-20-Spezifikationen ansieht](https://eips.ethereum.org/EIPS/eip-20), bleibt nur eine Funktion übrig, `transfer`.
Damit bleiben uns nur zwei Funktionen: `transfer` (weil wir `transferFrom` aufrufen können) und `faucet` (weil wir die Tokens an denjenigen zurücküberweisen können, der uns aufgerufen hat).

```solidity

        // Rufen Sie die zustandsändernden Methoden von Token auf mit
        // Informationen aus den Calldata

        // Faucet
        if (_func == 1) {
```

Ein Aufruf an `faucet()`, der keine Parameter hat.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

Nachdem wir `token.faucet()` aufgerufen haben, erhalten wir Tokens. Als Proxy-Vertrag **benötigen** wir jedoch keine Tokens.
Das EOA (externally owned account) oder der Vertrag, der uns aufgerufen hat, schon.
Also überweisen wir alle unsere Tokens an denjenigen, der uns angerufen hat.

```solidity
        // Überweisung (angenommen, wir haben eine Freigabe dafür)
        if (_func == 2) {
```

Das Überweisen von Tokens erfordert zwei Parameter: die Zieladresse und den Betrag.

```solidity
            token.transferFrom(
                msg.sender,
```

Wir erlauben Anrufern nur, Tokens zu überweisen, die sie besitzen

```solidity
                address(uint160(calldataVal(1, 20))),
```

Die Zieladresse beginnt bei Byte #1 (Byte #0 ist die Funktion).
Als Adresse ist sie 20 Bytes lang.

```solidity
                calldataVal(21, 2)
```

Für diesen speziellen Vertrag gehen wir davon aus, dass die maximale Anzahl von Tokens, die jemand überweisen möchte, in zwei Bytes passt (weniger als 65.536).

```solidity
            );
        }
```

Insgesamt benötigt eine Überweisung 35 Bytes an Calldata:

| Abschnitt         | Länge | Bytes |
| ----------------- | ----: | ----: |
| Funktionsselektor |     1 |     0 |
| Zieladresse       |    32 |  1-32 |
| Betrag            |     2 | 33-34 |

```solidity
    }   // Fallback

}       // Vertrag CalldataInterpreter
```

### test.js {#test-js}

[Dieser JavaScript-Unit-Test](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) zeigt uns, wie dieser Mechanismus verwendet wird (und wie man seine korrekte Funktionsweise überprüft).
Ich gehe davon aus, dass Sie [chai](https://www.chaijs.com/) und [ethers](https://docs.ethers.io/v5/) verstehen und erkläre nur die Teile, die sich speziell auf den Vertrag beziehen.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Sollte uns die Verwendung von Tokens ermöglichen", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Token-Adresse:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("CalldataInterpreter-Adresse:", cdi.address)

    const signer = await ethers.getSigner()
```

Wir beginnen mit der Bereitstellung beider Verträge.

```javascript
    // Holen Sie sich Tokens zum Herumspielen
    const faucetTx = {
```

Wir können nicht die übergeordneten Funktionen verwenden, die wir normalerweise verwenden würden (wie z. B. `token.faucet()`), um Transaktionen zu erstellen, da wir uns nicht an das ABI halten.
Stattdessen müssen wir die Transaktion selbst erstellen und dann senden.

```javascript
      to: cdi.address,
      data: "0x01"
```

Es gibt zwei Parameter, die wir für die Transaktion angeben müssen:

1. `to`, die Zieladresse.
   Dies ist der Calldata-Interpreter-Vertrag.
2. `data`, die zu sendenden Calldata.
   Im Falle eines Faucet-Aufrufs bestehen die Daten aus einem einzigen Byte, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Wir rufen die `sendTransaction`-Methode [des Signierers](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) auf, da wir das Ziel (`faucetTx.to`) bereits angegeben haben und die Transaktion signiert werden muss.

```javascript
// Überprüfen Sie, ob der Faucet die Tokens korrekt bereitstellt
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Hier überprüfen wir den Kontostand.
Bei `view`-Funktionen muss kein Gas gespart werden, daher führen wir sie ganz normal aus.

```javascript
// Dem CDI eine Freigabe erteilen (Freigaben können nicht über einen Proxy geleitet werden)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Geben Sie dem Calldata-Interpreter eine Freigabe, um Überweisungen durchführen zu können.

```javascript
// Tokens überweisen
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Erstellen Sie eine Überweisungstransaktion. Das erste Byte ist „0x02“, gefolgt von der Zieladresse und schließlich dem Betrag (0x0100, was dezimal 256 entspricht).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Überprüfen, ob wir 256 Tokens weniger haben
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // Und dass unser Ziel sie erhalten hat
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // es
})      // beschreiben
```

## Kostenreduzierung, wenn Sie den Zielvertrag kontrollieren {#reducing-the-cost-when-you-do-control-the-destination-contract}

Wenn Sie die Kontrolle über den Zielvertrag haben, können Sie Funktionen erstellen, die die `msg.sender`-Prüfungen umgehen, da sie dem Calldata-Interpreter vertrauen.
[Ein Beispiel dafür, wie das funktioniert, finden Sie hier im `control-contract`-Branch](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

Wenn der Vertrag nur auf externe Transaktionen reagieren würde, könnten wir mit nur einem Vertrag auskommen.
Dies würde jedoch die [Komponierbarkeit](/developers/docs/smart-contracts/composability/) beeinträchtigen.
Es ist viel besser, einen Vertrag zu haben, der auf normale ERC-20-Aufrufe reagiert, und einen anderen Vertrag, der auf Transaktionen mit kurzen Anrufdaten reagiert.

### Token.sol {#token-sol-2}

In diesem Beispiel können wir `Token.sol` modifizieren.
Dies ermöglicht uns, eine Reihe von Funktionen zu haben, die nur der Proxy aufrufen darf.
Hier sind die neuen Teile:

```solidity
    // Die einzige Adresse, die die CalldataInterpreter-Adresse angeben darf
    address owner;

    // Die CalldataInterpreter-Adresse
    address proxy = address(0);
```

Der ERC-20-Vertrag muss die Identität des autorisierten Proxys kennen.
Wir können diese Variable jedoch nicht im Konstruktor festlegen, da wir den Wert noch nicht kennen.
Dieser Vertrag wird zuerst instanziiert, da der Proxy die Adresse des Tokens in seinem Konstruktor erwartet.

```solidity
    /**
     * @dev Ruft den ERC20-Konstruktor auf.
     */
    constructor(
    ) ERC20("Oris nutzloser Token-2", "OUT-2") {
        owner = msg.sender;
    }
```

Die Adresse des Erstellers (genannt `owner`) wird hier gespeichert, da dies die einzige Adresse ist, die den Proxy festlegen darf.

```solidity
    /**
     * @dev Legt die Adresse für den Proxy (den CalldataInterpreter) fest.
     * Kann nur einmal vom Eigentümer aufgerufen werden
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Kann nur vom Eigentümer aufgerufen werden");
        require(proxy == address(0), "Proxy ist bereits festgelegt");

        proxy = _proxy;
    }    // Funktion setProxy
```

Der Proxy hat privilegierten Zugriff, da er Sicherheitsprüfungen umgehen kann.
Um sicherzustellen, dass wir dem Proxy vertrauen können, lassen wir nur `owner` diese Funktion aufrufen, und das nur einmal.
Sobald `proxy` einen echten Wert hat (nicht null), kann dieser Wert nicht mehr geändert werden. Selbst wenn der Besitzer bösartig wird oder die Mnemonik dafür bekannt wird, sind wir immer noch sicher.

```solidity
    /**
     * @dev Einige Funktionen dürfen nur vom Proxy aufgerufen werden.
     */
    modifier onlyProxy {
```

Dies ist eine [`modifier`-Funktion](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), sie modifiziert die Funktionsweise anderer Funktionen.

```solidity
      require(msg.sender == proxy);
```

Überprüfen Sie zuerst, ob wir vom Proxy und von niemand anderem aufgerufen wurden.
Wenn nicht, `revert`.

```solidity
      _;
    }
```

Wenn ja, führen Sie die Funktion aus, die wir ändern.

```solidity
   /* Funktionen, die es dem Proxy ermöglichen, tatsächlich für Konten zu fungieren */

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

Dies sind drei Operationen, bei denen die Nachricht normalerweise direkt von der Entität kommen muss, die Tokens überweist oder eine Freigabe genehmigt.
Hier haben wir eine Proxy-Version dieser Operationen, die:

1. durch `onlyProxy()` modifiziert ist, sodass niemand anderes sie kontrollieren darf.
2. die Adresse, die normalerweise `msg.sender` wäre, als zusätzlichen Parameter erhält.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

Der Calldata-Interpreter ist fast identisch mit dem oben genannten, außer dass die über den Proxy geleiteten Funktionen einen `msg.sender`-Parameter erhalten und keine Freigabe für `transfer` erforderlich ist.

```solidity
        // Überweisung (keine Freigabe erforderlich)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // genehmigen
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

Es gibt einige Änderungen zwischen dem vorherigen Testcode und diesem.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

Wir müssen dem ERC-20-Vertrag mitteilen, welchem Proxy er vertrauen soll

```js
console.log("CalldataInterpreter-Adresse:", cdi.address)

// Benötigen zwei Unterzeichner, um die Zulagen zu überprüfen
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Um `approve()` und `transferFrom()` zu überprüfen, benötigen wir einen zweiten Unterzeichner.
Wir nennen ihn `poorSigner` (armer Unterzeichner), weil er keine unserer Tokens erhält (er muss natürlich ETH haben).

```js
// Tokens überweisen
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Da der ERC-20-Vertrag dem Proxy (`cdi`) vertraut, benötigen wir keine Freigabe für die Weiterleitung von Überweisungen.

```js
// Freigabe und transferFrom
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

// Überprüfen, ob die Kombination aus Freigabe und transferFrom korrekt ausgeführt wurde
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Testen Sie die beiden neuen Funktionen.
Beachten Sie, dass `transferFromTx` zwei Adressparameter erfordert: den Geber der Freigabe und den Empfänger.

## Fazit {#conclusion}

Sowohl [Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) als auch [Arbitrum](https://developer.offchainlabs.com/docs/special_features) suchen nach Wegen, die Größe der auf L1 geschriebenen Calldata und damit die Kosten von Transaktionen zu reduzieren.
Als Infrastrukturanbieter, die nach generischen Lösungen suchen, sind unsere Möglichkeiten jedoch begrenzt.
Als Dapp-Entwickler verfügen Sie über anwendungsspezifisches Wissen, mit dem Sie Ihre Calldata viel besser optimieren können, als wir es in einer generischen Lösung könnten.
Hoffentlich hilft Ihnen dieser Artikel, die ideale Lösung für Ihre Bedürfnisse zu finden.

[Hier finden Sie mehr von meiner Arbeit](https://cryptodocguy.pro/).

