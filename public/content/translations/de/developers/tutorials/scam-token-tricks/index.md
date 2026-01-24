---
title: "Einige Tricks, die von Betrugs-Tokens verwendet werden, und wie man sie erkennt"
description: In diesem Tutorial analysieren wir einen Betrugs-Token, um einige der Tricks zu sehen, die Betrüger anwenden, wie sie sie implementieren und wie wir sie erkennen können.
author: Ori Pomerantz ist der Autor des Linux Kernel Module Programming Guide
tags:
  [
    "Betrug",
    "Solidity",
    "Erc-20",
    "javascript",
    "typescript"
  ]
skill: intermediate
published: 15.09.2023
lang: de
---

In diesem Tutorial analysieren wir [einen Betrugs-Token](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), um einige der Tricks zu sehen, die Betrüger anwenden und wie sie sie implementieren. Am Ende des Tutorials werden Sie einen umfassenderen Überblick über ERC-20-Token-Verträge, ihre Fähigkeiten und warum Skepsis notwendig ist, haben. Dann schauen wir uns die von diesem Betrugs-Token ausgegebenen Ereignisse an und sehen, wie wir automatisch erkennen können, dass er nicht legitim ist.

## Betrugs-Tokens – was sind sie, warum machen Leute sie und wie kann man sie vermeiden {#scam-tokens}

Eine der häufigsten Anwendungen von Ethereum ist die Schaffung eines handelbaren Tokens durch eine Gruppe, der gewissermaßen ihre eigene Währung darstellt. Jedoch gibt es überall, wo es legitime wertschöpfende Anwendungsmöglichkeiten gibt, auch Kriminelle, die diese Werte stehlen möchten.

Sie können mehr über dieses Thema [an anderer Stelle auf ethereum.org](/guides/how-to-id-scam-tokens/) aus der Perspektive eines Benutzers lesen. Dieses Tutorial konzentriert sich auf die Analyse eines Betrugs-Tokens, um zu sehen, wie es gemacht wird und wie es erkannt werden kann.

### Woher weiß ich, dass wARB ein Betrug ist? {#warb-scam}

Der Token, den wir analysieren, ist [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), der vorgibt, dem legitimen [ARB-Token](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) gleichwertig zu sein.

Der einfachste Weg, um zu wissen, welcher der legitime Token ist, ist ein Blick auf die Herkunftsorganisation, [Arbitrum](https://arbitrum.foundation/). Die legitimen Adressen sind [in ihrer Dokumentation](https://docs.arbitrum.foundation/deployment-addresses#token) angegeben.

### Warum ist der Quellcode verfügbar? {#why-source}

Normalerweise würden wir erwarten, dass Leute, die versuchen, andere zu betrügen, geheimnisvoll sind, und tatsächlich haben viele Betrugs-Tokens ihren Code nicht verfügbar (zum Beispiel [dieser](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) und [dieser](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

Allerdings veröffentlichen legitime Tokens normalerweise ihren Quellcode, sodass die Autoren von Betrugs-Tokens manchmal dasselbe tun, um legitim zu erscheinen. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) ist einer dieser Tokens mit verfügbarem Quellcode, was das Verständnis erleichtert.

Während Vertrags-Deployer wählen können, ob sie den Quellcode veröffentlichen oder nicht, können sie _nicht_ den falschen Quellcode veröffentlichen. Der Block-Explorer kompiliert den bereitgestellten Quellcode unabhängig, und wenn er nicht genau denselben Bytecode erhält, lehnt er diesen Quellcode ab. [Sie können mehr darüber auf der Etherscan-Seite lesen](https://etherscan.io/verifyContract).

## Vergleich mit legitimen ERC-20-Tokens {#compare-legit-erc20}

Wir werden diesen Token mit legitimen ERC-20-Tokens vergleichen. Wenn Sie nicht damit vertraut sind, wie legitime ERC-20-Tokens typischerweise geschrieben werden, [sehen Sie sich dieses Tutorial an](/developers/tutorials/erc20-annotated-code/).

### Konstanten für privilegierte Adressen {#constants-for-privileged-addresses}

Verträge benötigen manchmal privilegierte Adressen. Verträge, die für den langfristigen Gebrauch konzipiert sind, erlauben es einigen privilegierten Adressen, diese Adressen zu ändern, zum Beispiel um die Verwendung eines neuen Multisig-Vertrags zu ermöglichen. Es gibt mehrere Möglichkeiten, dies zu tun.

Der [`HOP`-Token-Vertrag](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) verwendet das [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable)-Muster. Die privilegierte Adresse wird im Speicher in einem Feld namens `_owner` gehalten (siehe die dritte Datei, `Ownable.sol`).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

Der [`ARB`-Token-Vertrag](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) hat nicht direkt eine privilegierte Adresse. Er braucht jedoch auch keine. Er befindet sich hinter einem [`Proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) an der [Adresse `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code). Dieser Vertrag hat eine privilegierte Adresse (siehe die vierte Datei, `ERC1967Upgrade.sol`), die für Upgrades verwendet werden kann.

```solidity
    /**
     * @dev Speichert eine neue Adresse im EIP1967-Admin-Slot.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

Im Gegensatz dazu hat der `wARB`-Vertrag einen fest codierten `contract_owner`.

```solidity
contract WrappedArbitrum is Context, IERC20 {
    .
    .
    .
    address deployer = 0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1;
    address public contract_owner = 0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33;
    .
    .
    .
}
```

[Dieser Vertragsinhaber](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) ist kein Vertrag, der zu verschiedenen Zeiten von verschiedenen Konten kontrolliert werden könnte, sondern ein [externes Konto](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). Das bedeutet, dass es wahrscheinlich für den kurzfristigen Gebrauch durch eine Einzelperson konzipiert ist, anstatt als langfristige Lösung zur Kontrolle eines ERC-20, das wertvoll bleiben wird.

Und tatsächlich, wenn wir in Etherscan nachsehen, sehen wir, dass der Betrüger diesen Vertrag nur für 12 Stunden (von der [ersten Transaktion](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) bis zur [letzten Transaktion](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)) am 19. Mai 2023 verwendet hat.

### Die gefälschte `_transfer`-Funktion {#the-fake-transfer-function}

Es ist Standard, dass tatsächliche Transfers über eine [interne `_transfer`-Funktion](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer) stattfinden.

In `wARB` sieht diese Funktion fast legitim aus:

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

Der verdächtige Teil ist:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

Wenn der Vertragsinhaber Tokens sendet, warum zeigt das `Transfer`-Ereignis, dass sie von `deployer` kommen?

Es gibt jedoch ein wichtigeres Problem. Wer ruft diese `_transfer`-Funktion auf? Sie kann nicht von außen aufgerufen werden, sie ist als `internal` markiert. Und der Code, den wir haben, enthält keine Aufrufe an `_transfer`. Offensichtlich ist sie hier als Köder.

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

Wenn wir uns die Funktionen ansehen, die zum Übertragen von Tokens aufgerufen werden, `transfer` und `transferFrom`, sehen wir, dass sie eine völlig andere Funktion aufrufen, `_f_`.

### Die echte `_f_`-Funktion {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

Es gibt zwei potenzielle Warnsignale in dieser Funktion.

- Die Verwendung des [Funktionsmodifikators](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`. Wenn wir uns jedoch den Quellcode ansehen, sehen wir, dass `_mod_` tatsächlich harmlos ist.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- Das gleiche Problem, das wir bei `_transfer` gesehen haben: Wenn `contract_owner` Tokens sendet, scheinen sie von `deployer` zu kommen.

### Die gefälschte Ereignisfunktion `dropNewTokens` {#the-fake-events-function-dropNewTokens}

Jetzt kommen wir zu etwas, das wie ein tatsächlicher Betrug aussieht. Ich habe die Funktion zur besseren Lesbarkeit etwas bearbeitet, aber sie ist funktional gleichwertig.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

Diese Funktion hat den `auth()`-Modifikator, was bedeutet, dass sie nur vom Vertragsinhaber aufgerufen werden kann.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

Diese Einschränkung ist vollkommen sinnvoll, da wir nicht wollen würden, dass zufällige Konten Tokens verteilen. Der Rest der Funktion ist jedoch verdächtig.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

Eine Funktion zum Übertragen von einem Pool-Konto an ein Array von Empfängern mit einem Array von Beträgen ist vollkommen sinnvoll. Es gibt viele Anwendungsfälle, in denen Sie Tokens von einer einzigen Quelle an mehrere Ziele verteilen möchten, wie z. B. Gehaltsabrechnungen, Airdrops usw. Es ist günstiger (in Gas), dies in einer einzigen Transaktion zu tun, anstatt mehrere Transaktionen auszugeben oder sogar den ERC-20-Vertrag mehrmals von einem anderen Vertrag als Teil derselben Transaktion aufzurufen.

`dropNewTokens` tut das jedoch nicht. Es gibt [`Transfer`-Ereignisse](https://eips.ethereum.org/EIPS/eip-20#transfer-1) aus, aber es werden keine Tokens tatsächlich übertragen. Es gibt keinen legitimen Grund, Off-Chain-Anwendungen zu verwirren, indem man ihnen von einer Übertragung berichtet, die nicht wirklich stattgefunden hat.

### Die „brennende“ `Approve`-Funktion {#the-burning-approve-function}

ERC-20-Verträge sollen eine [`approve`-Funktion](/developers/tutorials/erc20-annotated-code/#approve) für Freigaben haben, und tatsächlich hat unser Betrugs-Token eine solche Funktion, und sie ist sogar korrekt. Da Solidity jedoch von C abstammt, ist die Groß- und Kleinschreibung von Bedeutung. `Approve` und `approve` sind unterschiedliche Zeichenketten.

Außerdem steht die Funktionalität nicht im Zusammenhang mit `approve`.

```solidity
    function Approve(
        address[] memory holders)
```

Diese Funktion wird mit einem Array von Adressen für Inhaber des Tokens aufgerufen.

```solidity
    public approver() {
```

Der `approver()`-Modifikator stellt sicher, dass nur `contract_owner` diese Funktion aufrufen darf (siehe unten).

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: burn amount exceeds balance");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

Für jede Inhaberadresse verschiebt die Funktion das gesamte Guthaben des Inhabers an die Adresse `0x00...01` und „verbrennt“ es damit effektiv (der eigentliche `burn`-Vorgang im Standard ändert auch die Gesamtversorgung und überträgt die Tokens an `0x00...00`). Das bedeutet, dass `contract_owner` die Vermögenswerte jedes Benutzers entfernen kann. Das scheint keine Funktion zu sein, die man in einem Governance-Token haben möchte.

### Probleme mit der Codequalität {#code-quality-issues}

Diese Probleme mit der Codequalität _beweisen_ nicht, dass dieser Code ein Betrug ist, aber sie lassen ihn verdächtig erscheinen. Organisierte Unternehmen wie Arbitrum veröffentlichen normalerweise keinen so schlechten Code.

#### Die `mount`-Funktion {#the-mount-function}

Obwohl es nicht im [Standard](https://eips.ethereum.org/EIPS/eip-20) spezifiziert ist, wird die Funktion, die neue Tokens erstellt, allgemein [`mint`](https://ethereum.org/el/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) genannt.

Wenn wir uns den `wARB`-Konstruktor ansehen, sehen wir, dass die Mint-Funktion aus irgendeinem Grund in `mount` umbenannt wurde und fünfmal mit einem Fünftel der anfänglichen Versorgung aufgerufen wird, anstatt einmal für den gesamten Betrag aus Effizienzgründen.

```solidity
    constructor () public {

        _name = "Wrapped Arbitrum";
        _symbol = "wARB";
        _decimals = 18;
        uint256 initialSupply = 1000000000000;

        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
    }
```

Die `mount`-Funktion selbst ist ebenfalls verdächtig.

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

Wenn wir uns das `require` ansehen, sehen wir, dass nur der Vertragsinhaber prägen darf. Das ist legitim. Aber die Fehlermeldung sollte _only owner is allowed to mint_ oder so etwas Ähnliches sein. Stattdessen lautet sie irrelevant _ERC20: mint to the zero address_. Der korrekte Test für das Prägen an die Nulladresse ist `require(account != address(0), "<Fehlermeldung>")`, was der Vertrag nie überprüft.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Es gibt zwei weitere verdächtige Fakten, die direkt mit dem Prägen zusammenhängen:

- Es gibt einen `account`-Parameter, der vermutlich das Konto ist, das den geprägten Betrag erhalten sollte. Aber das Guthaben, das sich erhöht, ist tatsächlich das von `contract_owner`.

- Während das erhöhte Guthaben zu `contract_owner` gehört, zeigt das ausgegebene Ereignis eine Übertragung an `account`.

### Warum sowohl `auth` als auch `approver`? Warum das `mod`, das nichts tut? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

Dieser Vertrag enthält drei Modifikatoren: `_mod_`, `auth` und `approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` nimmt drei Parameter und macht nichts damit. Warum gibt es ihn?

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }
```

`auth` und `approver` machen mehr Sinn, weil sie prüfen, ob der Vertrag von `contract_owner` aufgerufen wurde. Wir würden erwarten, dass bestimmte privilegierte Aktionen, wie das Prägen, auf dieses Konto beschränkt sind. Was ist jedoch der Sinn, zwei separate Funktionen zu haben, die _genau dasselbe tun_?

## Was können wir automatisch erkennen? {#what-can-we-detect-automatically}

Wir können sehen, dass `wARB` ein Betrugs-Token ist, indem wir uns Etherscan ansehen. Das ist jedoch eine zentralisierte Lösung. Theoretisch könnte Etherscan unterwandert oder gehackt werden. Es ist besser, unabhängig herausfinden zu können, ob ein Token legitim ist oder nicht.

Es gibt einige Tricks, mit denen wir einen verdächtigen ERC-20-Token identifizieren können (entweder ein Betrug oder sehr schlecht geschrieben), indem wir uns die von ihnen ausgegebenen Ereignisse ansehen.

## Verdächtige `Approval`-Ereignisse {#suspicious-approval-events}

[`Approval`-Ereignisse](https://eips.ethereum.org/EIPS/eip-20#approval) sollten nur auf eine direkte Anfrage hin geschehen (im Gegensatz zu [`Transfer`-Ereignissen](https://eips.ethereum.org/EIPS/eip-20#transfer-1), die als Ergebnis einer Freigabe stattfinden können). Siehe die Solidity-Dokumentation für eine detaillierte Erklärung dieses Problems und warum die Anfragen direkt sein müssen, anstatt durch einen Vertrag vermittelt zu werden.

Das bedeutet, dass `Approval`-Ereignisse, die Ausgaben von einem [externen Konto](/developers/docs/accounts/#types-of-account) genehmigen, von Transaktionen stammen müssen, die in diesem Konto ihren Ursprung haben und deren Ziel der ERC-20-Vertrag ist. Jede andere Art der Genehmigung von einem externen Konto ist verdächtig.

Hier ist [ein Programm, das diese Art von Ereignis identifiziert](https://github.com/qbzzt/20230915-scam-token-detection), das [viem](https://viem.sh/) und [TypeScript](https://www.typescriptlang.org/docs/), eine JavaScript-Variante mit Typsicherheit, verwendet. So führen Sie es aus:

1. Kopieren Sie `.env.example` nach `.env`.
2. Bearbeiten Sie `.env`, um die URL zu einem Ethereum-Mainnet-Node bereitzustellen.
3. Führen Sie `pnpm install` aus, um die notwendigen Pakete zu installieren.
4. Führen Sie `pnpm susApproval` aus, um nach verdächtigen Genehmigungen zu suchen.

Hier ist eine zeilenweise Erklärung:

```typescript
import {
  Address,
  TransactionReceipt,
  createPublicClient,
  http,
  parseAbiItem,
} from "viem"
import { mainnet } from "viem/chains"
```

Importieren Sie Typdefinitionen, Funktionen und die Chain-Definition aus `viem`.

```typescript
import { config } from "dotenv"
config()
```

Lesen Sie `.env`, um die URL zu erhalten.

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

Erstellen Sie einen Viem-Client. Wir müssen nur aus der Blockchain lesen, daher benötigt dieser Client keinen privaten Schlüssel.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

Die Adresse des verdächtigen ERC-20-Vertrags und die Blöcke, in denen wir nach Ereignissen suchen werden. Node-Anbieter beschränken typischerweise unsere Fähigkeit, Ereignisse zu lesen, da die Bandbreite teuer werden kann. Glücklicherweise wurde `wARB` für einen Zeitraum von achtzehn Stunden nicht verwendet, sodass wir nach allen Ereignissen suchen können (es waren insgesamt nur 13).

```typescript
const approvalEvents = await client.getLogs({
  address: testedAddress,
  fromBlock,
  toBlock,
  event: parseAbiItem(
    "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
  ),
})
```

So fragen Sie Viem nach Ereignisinformationen. Wenn wir ihm die genaue Ereignissignatur, einschließlich Feldnamen, zur Verfügung stellen, analysiert es das Ereignis für uns.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

Unser Algorithmus ist nur auf externe Konten anwendbar. Wenn von `client.getBytecode` ein Bytecode zurückgegeben wird, bedeutet dies, dass es sich um einen Vertrag handelt und wir ihn einfach überspringen sollten.

Wenn Sie TypeScript noch nicht verwendet haben, könnte die Funktionsdefinition etwas seltsam aussehen. Wir sagen ihm nicht nur, dass der erste (und einzige) Parameter `addr` heißt, sondern auch, dass er vom Typ `Address` ist. Ähnlich teilt der `: boolean`-Teil TypeScript mit, dass der Rückgabewert der Funktion ein boolescher Wert ist.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

Diese Funktion ruft den Transaktionsbeleg aus einem Ereignis ab. Wir benötigen den Beleg, um sicherzustellen, dass wir das Transaktionsziel kennen.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

Dies ist die wichtigste Funktion, die tatsächlich entscheidet, ob ein Ereignis verdächtig ist oder nicht. Der Rückgabetyp `(Event | null)` teilt TypeScript mit, dass diese Funktion entweder ein `Event` oder `null` zurückgeben kann. Wir geben `null` zurück, wenn das Ereignis nicht verdächtig ist.

```typescript
const owner = ev.args._owner
```

Viem kennt die Feldnamen, also hat es das Ereignis für uns analysiert. `_owner` ist der Eigentümer der auszugebenden Tokens.

```typescript
// Genehmigungen durch Verträge sind nicht verdächtig
if (await isContract(owner)) return null
```

Wenn der Eigentümer ein Vertrag ist, gehen Sie davon aus, dass diese Genehmigung nicht verdächtig ist. Um zu überprüfen, ob die Genehmigung eines Vertrags verdächtig ist oder nicht, müssen wir die vollständige Ausführung der Transaktion verfolgen, um zu sehen, ob sie jemals zum Eigentümervertrag gelangt ist und ob dieser Vertrag den ERC-20-Vertrag direkt aufgerufen hat. Das ist viel ressourcenintensiver, als wir es gerne hätten.

```typescript
const txn = await getEventTxn(ev)
```

Wenn die Genehmigung von einem externen Konto kommt, holen Sie sich die Transaktion, die sie verursacht hat.

```typescript
// Die Genehmigung ist verdächtig, wenn sie von einem EOA-Besitzer stammt, der nicht das `from` der Transaktion ist
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

Wir können nicht einfach auf Zeichenketten-Gleichheit prüfen, da Adressen hexadezimal sind und daher Buchstaben enthalten. Manchmal, zum Beispiel in `txn.from`, sind diese Buchstaben alle in Kleinbuchstaben. In anderen Fällen, wie bei `ev.args._owner`, ist die Adresse in [gemischter Groß- und Kleinschreibung zur Fehlererkennung](https://eips.ethereum.org/EIPS/eip-55).

Aber wenn die Transaktion nicht vom Eigentümer stammt und dieser Eigentümer ein externes Konto ist, dann haben wir eine verdächtige Transaktion.

```typescript
// Es ist auch verdächtig, wenn das Transaktionsziel nicht der ERC-20-Vertrag ist, den wir
// untersuchen
if (txn.to.toLowerCase() != testedAddress) return ev
```

Ähnlich verhält es sich, wenn die `to`-Adresse der Transaktion, also der erste aufgerufene Vertrag, nicht der zu untersuchende ERC-20-Vertrag ist, dann ist dies verdächtig.

```typescript
    // Wenn es keinen Grund gibt, misstrauisch zu sein, gib null zurück.
    return null
}
```

Wenn keine der beiden Bedingungen zutrifft, ist das `Approval`-Ereignis nicht verdächtig.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[Eine `async`-Funktion](https://www.w3schools.com/js/js_async.asp) gibt ein `Promise`-Objekt zurück. Mit der gängigen Syntax `await x()` warten wir darauf, dass dieses `Promise` erfüllt wird, bevor wir mit der Verarbeitung fortfahren. Dies ist einfach zu programmieren und zu verfolgen, aber es ist auch ineffizient. Während wir darauf warten, dass das `Promise` für ein bestimmtes Ereignis erfüllt wird, können wir bereits mit dem nächsten Ereignis beginnen.

Hier verwenden wir [`map`](https://www.w3schools.com/jsref/jsref_map.asp), um ein Array von `Promise`-Objekten zu erstellen. Dann verwenden wir [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/), um darauf zu warten, dass alle diese Promises aufgelöst werden. Wir filtern dann diese Ergebnisse mit [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp), um die nicht verdächtigen Ereignisse zu entfernen.

### Verdächtige `Transfer`-Ereignisse {#suspicious-transfer-events}

Eine weitere Möglichkeit, Betrugs-Tokens zu identifizieren, besteht darin, zu prüfen, ob sie verdächtige Übertragungen aufweisen. Zum Beispiel Übertragungen von Konten, die nicht so viele Tokens haben. Sie können sehen, [wie dieser Test implementiert wird](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), aber `wARB` hat dieses Problem nicht.

## Fazit {#conclusion}

Die automatisierte Erkennung von ERC-20-Betrugsfällen leidet unter [falsch-negativen Ergebnissen](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error), da ein Betrug einen vollkommen normalen ERC-20-Token-Vertrag verwenden kann, der einfach nichts Reales darstellt. Sie sollten also immer versuchen, _die Token-Adresse aus einer vertrauenswürdigen Quelle zu beziehen_.

Die automatisierte Erkennung kann in bestimmten Fällen helfen, wie z.B. bei DeFi-Komponenten, wo es viele Tokens gibt und diese automatisch gehandhabt werden müssen. Aber wie immer gilt [caveat emptor](https://www.investopedia.com/terms/c/caveatemptor.asp), führen Sie Ihre eigenen Recherchen durch und ermutigen Sie Ihre Benutzer, es Ihnen gleichzutun.

[Hier finden Sie mehr von meiner Arbeit](https://cryptodocguy.pro/).
