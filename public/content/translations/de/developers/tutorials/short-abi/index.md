---
title: "Kurze ABIs zur Calldata-Optimierung"
description: "Optimierung von Smart Contracts für Optimistic Rollups"
author: Ori Pomerantz
lang: de
tags: ["Layer 2"]
skill: intermediate
breadcrumb: Kurze ABIs
published: 2022-04-01
---

## Einführung {#introduction}

In diesem Artikel lernen Sie etwas über [Optimistic Rollups](/developers/docs/scaling/optimistic-rollups), die Kosten von Transaktionen auf ihnen und wie diese unterschiedliche Kostenstruktur es erfordert, dass wir für andere Dinge optimieren als im Ethereum Mainnet.
Sie lernen auch, wie man diese Optimierung implementiert.

### Offenlegung {#full-disclosure}

Ich bin ein Vollzeitmitarbeiter bei [Optimism](https://www.optimism.io/), daher werden die Beispiele in diesem Artikel auf Optimism ausgeführt.
Die hier erklärte Technik sollte jedoch für andere Rollups genauso gut funktionieren.

### Terminologie {#terminology}

Wenn über Rollups diskutiert wird, wird der Begriff „Layer 1“ (L1) für das Mainnet, das produktive Ethereum-Netzwerk, verwendet.
Der Begriff „Layer 2“ (L2) wird für das Rollup oder jedes andere System verwendet, das sich für die Sicherheit auf L1 verlässt, aber den Großteil seiner Verarbeitung offchain durchführt.

## Wie können wir die Kosten für L2-Transaktionen weiter senken? {#how-can-we-further-reduce-the-cost-of-l2-transactions}

[Optimistic Rollups](/developers/docs/scaling/optimistic-rollups) müssen eine Aufzeichnung jeder historischen Transaktion aufbewahren, damit jeder sie durchgehen und überprüfen kann, ob der aktuelle Zustand korrekt ist.
Als dieser Artikel geschrieben wurde, war der günstigste Weg, Daten in das Ethereum Mainnet zu bekommen, sie als Calldata zu schreiben.
Diese Lösung wurde sowohl von [Optimism](https://docs.optimism.io/op-stack/protocol/overview) als auch von [Arbitrum](https://docs.arbitrum.io/welcome/arbitrum-gentle-introduction) gewählt.
Seit dem Dencun-Upgrade (März 2024) können Rollups diese Daten stattdessen in [Blobs](/roadmap/danksharding/) posten, die viel günstiger sind.

### Kosten von L2-Transaktionen {#cost-of-l2-transactions}

Die Kosten von L2-Transaktionen setzen sich aus zwei Komponenten zusammen:

1. L2-Verarbeitung, die normalerweise extrem günstig ist
2. L1-Speicherung, die an die Gaskosten des Mainnets gebunden ist

Als ich diesen Artikel im Jahr 2022 schrieb, betrugen die Kosten für L2-Gas auf Optimism 0,001 [Gwei](/developers/docs/gas/#what-is-gas).
Die Kosten für L1-Gas lagen hingegen bei etwa 40 Gwei.

Ein Byte Calldata kostet entweder 4 Gas (wenn es null ist) oder 16 Gas (wenn es ein beliebiger anderer Wert ist).
Eine der teuersten Operationen auf der EVM ist das Schreiben in den Speicher (Storage).
Die maximalen Kosten für das Schreiben eines 32-Byte-Wortes in den Speicher auf L2 betragen 22100 Gas. Zu dieser Zeit waren das 22,1 Gwei.
Wenn wir also ein einziges Null-Byte an Calldata einsparen könnten, könnten wir etwa 200 Bytes in den Speicher schreiben und hätten immer noch einen Vorteil.

#### Wie sich die L2-Kosten im Jahr 2024 verändert haben {#how-l2-costs-changed-in-2024}

Die Formel für die [L1-Datengebühr](https://docs.optimism.io/op-stack/transactions/fees#l1-data-fee) des OP Stacks hat sich seit dem Schreiben dieses Artikels zweimal geändert:

- Mit dem [Ecotone-Upgrade](https://docs.optimism.io/op-stack/transactions/fees#ecotone) (März 2024) begannen OP Stack-Chains, Transaktionsdaten in Blobs zu posten, die durch eine separate (und normalerweise viel niedrigere) Blob-Grundgebühr bepreist werden.
- Mit dem [Fjord-Upgrade](https://docs.optimism.io/op-stack/transactions/fees#fjord) (Juli 2024) basiert die L1-Datengebühr auf einer Schätzung der Größe der Transaktion nach der [FastLZ](https://github.com/ariya/FastLZ)-Komprimierung, mit einem Minimum von 100 Bytes pro Transaktion ([siehe Spezifikation](https://specs.optimism.io/protocol/fjord/exec-engine.html)).

Dies ändert die Analyse im Rest dieses Artikels auf drei Arten:

1. Null-Bytes lassen sich gut komprimieren, daher sind sie fast kostenlos.
   Die unten genannten Zahlen von 4 und 16 Gas pro Byte sind die Kosten für L1-Calldata, nicht das, was Sie heute für Transaktionsdaten auf einer OP Stack-Chain bezahlen.
2. Unterhalb des Minimums von 100 Bytes sparen kürzere Calldata nichts ein.
   Zum Beispiel hätten im Oktober 2026 auf dem OP Mainnet ein Standard-ERC-20-`transfer` (68 Bytes Calldata) und die 23-Byte-Kurzversion in diesem Artikel genau die gleiche L1-Datengebühr bezahlt, nämlich das Minimum, etwa 1 Gwei (10<sup>-9</sup> ETH).
3. Da Blob-Speicherplatz günstig ist, ist die L2-Ausführungsgebühr jetzt oft höher als die L1-Datengebühr.
   Bei einem L2-Gaspreis von 0,001 Gwei kosten 1000 Gas 1 Gwei, genauso viel wie diese gesamte L1-Datengebühr, sodass das zusätzliche Ausführungsgas für den Weg über einen Proxy-Contract mehr kosten kann als die Bytes, die dadurch eingespart werden.

Das Prinzip gilt weiterhin: Weniger komprimierte Bytes bedeuten eine niedrigere L1-Datengebühr.
Kurze ABIs sind am sinnvollsten für Transaktionen mit vielen Daten, die sich nicht gut komprimieren lassen, und auf Chains oder zu Zeiten, in denen L1-Daten teuer sind.
Um zu sehen, was eine bestimmte Transaktion kosten würde, rufen Sie `getL1Fee` auf dem [`GasPriceOracle`-Predeploy](https://specs.optimism.io/protocol/predeploys.html#gaspriceoracle) mit der unsignierten Transaktion auf.
Zum Beispiel mit `cast` von [Foundry](https://getfoundry.sh/introduction/installation/):

```sh
TX=$(cast mktx --raw-unsigned --from <your address> --chain 10 --nonce 0 --gas-limit 100000 \
  --priority-gas-price 1000000 --gas-price 1000000 <destination address> <calldata>)
cast call 0x420000000000000000000000000000000000000F "getL1Fee(bytes)(uint256)" $TX --rpc-url https://mainnet.optimism.io
```

Das Ergebnis ist in Wei.

### Die ABI {#the-abi}

Die überwiegende Mehrheit der Transaktionen greift von einem externen Konto (EOA) auf einen Vertrag zu.
Die meisten Verträge sind in Solidity geschrieben und interpretieren ihr Datenfeld gemäß [der Application Binary Interface (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Die ABI wurde jedoch für L1 entwickelt, wo ein Byte Calldata ungefähr so viel kostet wie vier arithmetische Operationen, und nicht für L2, wo (zu Preisen von 2022) ein Byte Calldata mehr als tausend arithmetische Operationen kostet.
Die Calldata sind wie folgt aufgeteilt:

| Abschnitt | Länge | Bytes | Verschwendete Bytes | Verschwendetes Gas | Notwendige Bytes | Notwendiges Gas |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| Funktionsselektor | 4 | 0-3 | 3 | 48 | 1 | 16 |
| Nullen | 12 | 4-15 | 12 | 48 | 0 | 0 |
| Zieladresse | 20 | 16-35 | 0 | 0 | 20 | 320 |
| Betrag | 32 | 36-67 | 17 | 68 | 15 | 240 |
| Gesamt | 68 | | | 164 | | 576 |

Erklärung:

- **Funktionsselektor**: Der Vertrag hat weniger als 256 Funktionen, sodass wir sie mit einem einzigen Byte unterscheiden können.
  Diese Bytes sind typischerweise ungleich null und [kosten daher sechzehn Gas](https://eips.ethereum.org/EIPS/eip-2028).
- **Nullen**: Diese Bytes sind immer null, da eine zwanzig Byte lange Adresse kein zweiunddreißig Byte langes Wort benötigt, um sie aufzunehmen.
  Bytes, die null enthalten, kosten vier Gas ([siehe Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf), Anhang G,
  S. 27, der Wert für `G`<sub>`txdatazero`</sub>).
- **Betrag**: Wenn wir annehmen, dass in diesem Vertrag `decimals` achtzehn ist (der normale Wert) und die maximale Menge an Token, die wir transferieren, 10<sup>18</sup> beträgt, erhalten wir einen maximalen Betrag von 10<sup>36</sup>.
  256<sup>15</sup> &gt; 10<sup>36</sup>, also sind fünfzehn Bytes ausreichend.

Eine Verschwendung von 164 Gas auf L1 ist normalerweise vernachlässigbar. Eine Transaktion kostet mindestens [21.000 Gas](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), also spielen zusätzliche 0,8 % keine Rolle.
Auf L2 im Jahr 2022 sah die Sache jedoch anders aus. Fast die gesamten Kosten der Transaktion bestanden darin, sie auf L1 zu schreiben.
Zusätzlich zu den Transaktions-Calldata gibt es 109 Bytes an Transaktions-Header (Zieladresse, Signatur usw.).
Die Gesamtkosten betragen daher `109*16+576+164=2484`, und wir verschwenden etwa 6,6 % davon.

## Kosten senken, wenn Sie das Ziel nicht kontrollieren {#reducing-costs-when-you-dont-control-the-destination}

Angenommen, Sie haben keine Kontrolle über den Zielvertrag, können Sie dennoch eine Lösung ähnlich [dieser hier](https://github.com/qbzzt/ethereum.org-20220330-shortABI) verwenden.

Um sie auszuführen, benötigen Sie [Node.js](https://nodejs.org/) und git:

```sh
git clone https://github.com/qbzzt/ethereum.org-20220330-shortABI.git
cd ethereum.org-20220330-shortABI
npm install
npx hardhat test
```

Der Test stellt die Verträge im integrierten lokalen Netzwerk von Hardhat bereit, sodass Sie keine ETH benötigen.
Das Repository verwendet Hardhat 2.9, daher warnt es bei aktuellen Versionen von Node.js, dass Ihre Node.js-Version nicht unterstützt wird, aber der Test ist dennoch erfolgreich.

Lassen Sie uns die relevanten Dateien durchgehen.

### Token.sol {#token-sol}

[Dies ist der Zielvertrag](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
Es ist ein Standard-ERC-20-Vertrag mit einer zusätzlichen Funktion.
Diese `faucet`-Funktion ermöglicht es jedem Benutzer, einige Token zur Nutzung zu erhalten.
Sie würde einen produktiven ERC-20-Vertrag nutzlos machen, aber sie erleichtert das Leben, wenn ein ERC-20 nur zu Testzwecken existiert.

```solidity
    /**
     * @dev Gibt dem Aufrufer 1000 Token zum Spielen
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Dies ist der Vertrag, den Transaktionen mit kürzeren Calldata aufrufen sollen](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Lassen Sie uns ihn Zeile für Zeile durchgehen.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Wir benötigen die Token-Funktion, um zu wissen, wie wir sie aufrufen können.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

Die Adresse des Tokens, für das wir ein Proxy sind.

```solidity

    /**
     * @dev Geben Sie die Token (A digital asset on Ethereum following a standard (ERC-20, ERC-721). NOT a physical coin or voucher.) Adresse (A unique hexadecimal identifier (0x...) for an Ethereum account. NOT a physical location.) an
     * @param tokenAddr_ ERC-20 (ERC-n identifiers always Latin. Expanded form translatable. Pattern applies to ALL numbered ERCs. Filter matches the family at request time; no per-instance entries needed.) Vertrag (Smart contract -- code deployed on the blockchain. NOT a legal agreement.) Adresse (A unique hexadecimal identifier (0x...) for an Ethereum account. NOT a physical location.)
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

Einen Wert aus den Calldata lesen.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

Wir werden ein einzelnes 32-Byte-Wort (256-Bit) in den Speicher laden und die Bytes entfernen, die nicht Teil des gewünschten Feldes sind.
Dieser Algorithmus funktioniert nicht für Werte, die länger als 32 Bytes sind, und natürlich können wir nicht über das Ende der Calldata hinaus lesen.
Auf L1 könnte es notwendig sein, diese Tests zu überspringen, um Gas zu sparen, aber auf L2 ist Gas extrem günstig, was alle Plausibilitätsprüfungen ermöglicht, die wir uns vorstellen können.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Wir hätten die Daten aus dem Aufruf in `fallback()` kopieren können (siehe unten), aber es ist einfacher, [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), die Assemblersprache der EVM, zu verwenden.

Hier verwenden wir [den CALLDATALOAD-Opcode](https://www.evm.codes/#35), um die Bytes `startByte` bis `startByte+31` in den Stack zu lesen.
Im Allgemeinen lautet die Syntax eines Opcodes in Yul `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Nur die höchstwertigen `length` Bytes sind Teil des Feldes, also führen wir eine [Rechtsverschiebung (Right-Shift)](https://en.wikipedia.org/wiki/Logical_shift) durch, um die anderen Werte loszuwerden.
Dies hat den zusätzlichen Vorteil, dass der Wert an das rechte Ende des Feldes verschoben wird, sodass es der Wert selbst ist und nicht der Wert mal 256<sup>irgendwas</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Wenn ein Aufruf an einen Solidity-Vertrag mit keiner der Funktionssignaturen übereinstimmt, ruft er [die `fallback()`-Funktion](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) auf (vorausgesetzt, es gibt eine).
Im Fall von `CalldataInterpreter` landet _jeder_ Aufruf hier, da es keine anderen `external`- oder `public`-Funktionen gibt.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Lesen Sie das erste Byte der Calldata, das uns die Funktion mitteilt.
Es gibt zwei Gründe, warum eine Funktion hier nicht verfügbar sein könnte:

1. Funktionen, die `pure` oder `view` sind, ändern den Zustand nicht und kosten kein Gas (wenn sie offchain aufgerufen werden).
   Es macht keinen Sinn zu versuchen, ihre Gaskosten zu senken.
2. Funktionen, die sich auf [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties) verlassen.
   Der Wert von `msg.sender` wird die Adresse von `CalldataInterpreter` sein, nicht die des Aufrufers.

Wenn man sich [die ERC-20-Spezifikationen ansieht](https://eips.ethereum.org/EIPS/eip-20), bleibt leider nur eine Standardfunktion übrig, `transfer` (da wir `transferFrom` aufrufen können).
Unser Test-Token hat auch `faucet`, was wir unterstützen können, da wir die Token an denjenigen zurücktransferieren können, der uns aufgerufen hat.

```solidity

        // Rufe die Zustand ändernden Methoden des Token (A digital asset on Ethereum following a standard (ERC-20, ERC-721). NOT a physical coin or voucher.) auf unter Verwendung von
        // Informationen aus den Aufrufdaten (Often used in plural. 'Calldata' is frequently kept as a loanword in developer contexts.)

        // Faucet (Generally untranslated in German.)
        if (_func == 1) {
```

Ein Aufruf von `faucet()`, der keine Parameter hat.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

Nachdem wir `token.faucet()` aufgerufen haben, erhalten wir Token. Als Proxy-Contract **benötigen** wir jedoch keine Token.
Das externe Konto (EOA) oder der Vertrag, der uns aufgerufen hat, hingegen schon.
Also transferieren wir alle unsere Token an denjenigen, der uns aufgerufen hat.

```solidity
        // Transfer (In the context of ERC-20, 'Transfer' is standard. 'Übertragung' is also frequently used in general blockchain contexts.) (angenommen, wir haben einen Freigabebetrag (Translates the concept of approving a specific amount of ERC-20 tokens.) dafür)
        if (_func == 2) {
```

Der Transfer von Token erfordert zwei Parameter: die Zieladresse und den Betrag.

```solidity
            token.transferFrom(
                msg.sender,
```

Wir erlauben Aufrufern nur, Token zu transferieren, die sie besitzen

```solidity
                address(uint160(calldataVal(1, 20))),
```

Die Zieladresse beginnt bei Byte #1 (Byte #0 ist die Funktion).
Als Adresse ist sie 20 Bytes lang.

```solidity
                calldataVal(21, 2)
```

Für diesen speziellen Vertrag gehen wir davon aus, dass die maximale Anzahl an Token, die jemand transferieren möchte, in zwei Bytes passt (weniger als 65536).

```solidity
            );
        }
```

Insgesamt benötigt ein Transfer 23 Bytes an Calldata:

| Abschnitt | Länge | Bytes |
| ------------------- | -----: | ----: |
| Funktionsselektor | 1 | 0 |
| Zieladresse | 20 | 1-20 |
| Betrag | 2 | 21-22 |

```solidity
    }   // Fallback

}       // Vertrag (Smart contract -- code deployed on the blockchain. NOT a legal agreement.) CalldataInterpreter
```

### test.js {#test-js}

[Dieser JavaScript-Unit-Test](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) zeigt uns, wie wir diesen Mechanismus verwenden (und wie wir überprüfen, ob er korrekt funktioniert).
Ich gehe davon aus, dass Sie [chai](https://www.chaijs.com/) und [ethers](https://docs.ethers.org/v5/) verstehen, und erkläre nur die Teile, die sich speziell auf den Vertrag beziehen.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Should let us use tokens", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Token addr:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("CalldataInterpreter addr:", cdi.address)

    const signer = await ethers.getSigner()
```

Wir beginnen mit der Bereitstellung (Deployment) beider Verträge.

```javascript
    // Token zum Spielen erhalten
    const faucetTx = {
```

Wir können nicht die High-Level-Funktionen verwenden, die wir normalerweise nutzen würden (wie `token.faucet()`), um Transaktionen zu erstellen, da wir der ABI nicht folgen.
Stattdessen müssen wir die Transaktion selbst erstellen und sie dann senden.

```javascript
      to: cdi.address,
      data: "0x01"
```

Es gibt zwei Parameter, die wir für die Transaktion bereitstellen müssen:

1. `to`, die Zieladresse.
   Dies ist der Calldata-Interpreter-Vertrag.
2. `data`, die zu sendenden Calldata.
   Im Falle eines Faucet-Aufrufs bestehen die Daten aus einem einzigen Byte, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Wir rufen [die `sendTransaction`-Methode des Signers](https://docs.ethers.org/v5/api/signer/#Signer-sendTransaction) auf, da wir das Ziel (`faucetTx.to`) bereits angegeben haben und die Transaktion signiert werden muss.

```javascript
// Überprüfen, ob das Faucet die Token korrekt bereitstellt
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Hier überprüfen wir den Kontostand.
Es besteht keine Notwendigkeit, bei `view`-Funktionen Gas zu sparen, also führen wir sie einfach normal aus.

```javascript
// Dem CDI einen Freigabebetrag geben (Genehmigungen können nicht über einen Proxy weitergeleitet werden)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Geben Sie dem Calldata-Interpreter einen Freigabebetrag (Allowance), um Transfers durchführen zu können.

```javascript
// Transfer von Token
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Erstellen Sie eine Transfer-Transaktion. Das erste Byte ist „0x02“, gefolgt von der Zieladresse und schließlich dem Betrag (0x0100, was dezimal 256 entspricht).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Überprüfen, ob wir 256 Token weniger haben
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // Und dass unser Ziel sie erhalten hat
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## Kosten senken, wenn Sie den Zielvertrag kontrollieren {#reducing-the-cost-when-you-do-control-the-destination-contract}

Wenn Sie die Kontrolle über den Zielvertrag haben, können Sie Funktionen erstellen, die die `msg.sender`-Prüfungen umgehen, da sie dem Calldata-Interpreter vertrauen.
[Ein Beispiel dafür, wie das funktioniert, finden Sie hier im `control-contract`-Branch](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).
Um es auszuführen, wechseln Sie in dem zuvor geklonten Repository zu diesem Branch und führen Sie den Test erneut aus:

```sh
git checkout control-contract
npx hardhat test
```

Wenn der Vertrag nur auf externe Transaktionen reagieren würde, kämen wir mit nur einem Vertrag aus.
Das würde jedoch die [Komponierbarkeit](/developers/docs/smart-contracts/composability/) beeinträchtigen.
Es ist viel besser, einen Vertrag zu haben, der auf normale ERC-20-Aufrufe reagiert, und einen weiteren Vertrag, der auf Transaktionen mit kurzen Aufrufdaten (Calldata) reagiert.

### Token.sol {#token-sol-2}

In diesem Beispiel können wir `Token.sol` modifizieren.
Dadurch können wir eine Reihe von Funktionen haben, die nur der Proxy aufrufen darf.
Hier sind die neuen Teile:

```solidity
    // Die einzige Adresse, die die Adresse des CalldataInterpreter angeben darf
    address owner;

    // Die Adresse des CalldataInterpreter
    address proxy = address(0);
```

Der ERC-20-Vertrag muss die Identität des autorisierten Proxys kennen.
Wir können diese Variable jedoch nicht im Konstruktor setzen, da wir den Wert noch nicht kennen.
Dieser Vertrag wird zuerst instanziiert, da der Proxy die Adresse des Tokens in seinem Konstruktor erwartet.

```solidity
    /**
     * @dev Ruft den ERC-20 Konstruktor auf.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

Die Adresse des Erstellers (genannt `owner`) wird hier gespeichert, da dies die einzige Adresse ist, die den Proxy festlegen darf.

```solidity
    /**
     * @dev Setzt die Adresse für den Proxy (den CalldataInterpreter).
     * Kann nur einmal vom Eigentümer aufgerufen werden
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

Der Proxy hat privilegierten Zugriff, da er Sicherheitsprüfungen umgehen kann.
Um sicherzustellen, dass wir dem Proxy vertrauen können, lassen wir nur `owner` diese Funktion aufrufen, und das nur einmal.
Sobald `proxy` einen echten Wert hat (nicht null), kann sich dieser Wert nicht mehr ändern. Selbst wenn der Besitzer beschließt, bösartig zu werden, oder die Mnemonic dafür aufgedeckt wird, sind wir immer noch sicher.

```solidity
    /**
     * @dev Einige Funktionen dürfen nur vom Proxy aufgerufen werden.
     */
    modifier onlyProxy {
```

Dies ist eine [`modifier`-Funktion](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), sie modifiziert die Art und Weise, wie andere Funktionen arbeiten.

```solidity
      require(msg.sender == proxy);
```

Zuerst überprüfen wir, ob wir vom Proxy und von niemand anderem aufgerufen wurden.
Wenn nicht, `revert`.

```solidity
      _;
    }
```

Wenn ja, führen Sie die Funktion aus, die wir modifizieren.

```solidity
   /* Funktionen, die es dem Proxy ermöglichen, tatsächlich als Proxy für Konten zu fungieren */

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

Dies sind drei Operationen, die normalerweise erfordern, dass die Nachricht direkt von der Entität stammt, die Token transferiert oder einen Freigabebetrag genehmigt.
Hier haben wir eine Proxy-Version dieser Operationen, die:

1. Durch `onlyProxy()` modifiziert wird, sodass niemand sonst sie kontrollieren darf.
2. Die Adresse, die normalerweise `msg.sender` wäre, als zusätzlichen Parameter erhält.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

Der Calldata-Interpreter ist fast identisch mit dem obigen, außer dass die Proxy-Funktionen einen `msg.sender`-Parameter erhalten und kein Freigabebetrag für `transfer` erforderlich ist.

```solidity
        // Transfer (kein Freigabebetrag erforderlich)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // approve
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

Es gibt ein paar Änderungen zwischen dem vorherigen Testcode und diesem.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

Wir müssen dem ERC-20-Vertrag mitteilen, welchem Proxy er vertrauen soll

```js
console.log("CalldataInterpreter addr:", cdi.address)

// Zwei Unterzeichner werden benötigt, um Freigabebeträge zu verifizieren
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Um `approve()` und `transferFrom()` zu überprüfen, benötigen wir einen zweiten Signer.
Wir nennen ihn `poorSigner`, weil er keine unserer Token erhält (er muss natürlich ETH haben).

```js
// Transfer von Token
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Da der ERC-20-Vertrag dem Proxy vertraut (`cdi`), benötigen wir keinen Freigabebetrag, um Transfers weiterzuleiten.

```js
// Genehmigung und transferFrom
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

// Überprüfen, ob die Kombination aus approve / transferFrom korrekt ausgeführt wurde
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Testen Sie die beiden neuen Funktionen.
Beachten Sie, dass `transferFromTx` zwei Adressparameter erfordert: den Geber des Freigabebetrags und den Empfänger.

## Fazit {#conclusion}

Sowohl [Optimism](https://docs.optimism.io/op-stack/transactions/fees#fjord) als auch [Arbitrum](https://docs.arbitrum.io/how-arbitrum-works/deep-dives/gas-and-fees) komprimieren nun die Daten, die sie auf L1 schreiben, und berechnen jede Transaktion basierend auf ihrer komprimierten Größe, um die Transaktionskosten zu senken.
Als Infrastrukturanbieter, die nach generischen Lösungen suchen, sind unsere Möglichkeiten jedoch begrenzt.
Als dapp-Entwickler verfügen Sie über anwendungsspezifisches Wissen, mit dem Sie Ihre Calldata viel besser optimieren können, als wir es in einer generischen Lösung könnten.
Hoffentlich hilft Ihnen dieser Artikel dabei, die ideale Lösung für Ihre Bedürfnisse zu finden.

[Weitere meiner Arbeiten finden Sie hier](https://cryptodocguy.pro/).

