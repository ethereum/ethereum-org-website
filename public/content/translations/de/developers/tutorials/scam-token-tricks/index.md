---
title: "Einige Tricks von Betrugs-Token und wie man sie erkennt"
description: "In diesem Tutorial analysieren wir einen Betrugs-Token, um einige der Tricks von Betrügern zu untersuchen, wie sie diese implementieren und wie wir sie erkennen können."
author: Ori Pomerantz
tags: ["Betrug", "Solidity", "erc-20", "JavaScript", "TypeScript"]
skill: intermediate
breadcrumb: Tricks von Betrugs-Token
published: 2023-09-15
lang: de
---

In diesem Tutorial analysieren wir [einen Betrugs-Token](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), um einige der Tricks von Betrügern zu untersuchen und zu sehen, wie sie diese implementieren. Am Ende des Tutorials werden Sie ein umfassenderes Verständnis von ERC-20-Token-Verträgen und deren Fähigkeiten haben und wissen, warum Skepsis geboten ist. Anschließend betrachten wir die von diesem Betrugs-Token ausgegebenen Ereignisse und zeigen, wie wir automatisch erkennen können, dass er nicht legitim ist.

## Betrugs-Token – was sie sind, warum Leute sie erstellen und wie man sie vermeidet {#scam-tokens}

Eine der häufigsten Anwendungen für Ethereum ist die Erstellung eines handelbaren Tokens durch eine Gruppe, gewissermaßen als eigene Währung. Wo es jedoch legitime Anwendungsfälle gibt, die Wert schaffen, gibt es auch Kriminelle, die versuchen, diesen Wert für sich selbst zu stehlen.

Sie können mehr über dieses Thema aus der Nutzerperspektive [an anderer Stelle auf ethereum.org](/guides/how-to-id-scam-tokens/) lesen. Dieses Tutorial konzentriert sich auf die Analyse eines Betrugs-Tokens, um zu sehen, wie es gemacht wird und wie es erkannt werden kann.

### Woher weiß ich, dass wARB ein Betrug ist? {#warb-scam}

Der Token, den wir analysieren, ist [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), der vorgibt, dem legitimen [ARB-Token](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) gleichwertig zu sein.

Der einfachste Weg, um herauszufinden, welcher der legitime Token ist, besteht darin, sich die Ursprungsorganisation [Arbitrum](https://arbitrum.foundation/) anzusehen. Die legitimen Adressen sind [in ihrer Dokumentation](https://docs.arbitrum.foundation/deployment-addresses#token) angegeben.

### Warum ist der Quellcode verfügbar? {#why-source}

Normalerweise würden wir erwarten, dass Leute, die versuchen, andere zu betrügen, geheimnisvoll tun, und tatsächlich ist der Code vieler Betrugs-Token nicht verfügbar (zum Beispiel [dieser](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) und [dieser](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

Da legitime Token jedoch in der Regel ihren Quellcode veröffentlichen, tun die Autoren von Betrugs-Token manchmal dasselbe, um legitim zu erscheinen. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) ist einer dieser Token mit verfügbarem Quellcode, was es einfacher macht, ihn zu verstehen.

Während die Bereitsteller von Verträgen wählen können, ob sie den Quellcode veröffentlichen oder nicht, können sie _nicht_ den falschen Quellcode veröffentlichen. Die Blocksuchmaschine kompiliert den bereitgestellten Quellcode unabhängig, und wenn sie nicht genau denselben Bytecode erhält, lehnt sie diesen Quellcode ab. [Sie können mehr darüber auf der Etherscan-Website lesen](https://etherscan.io/verifyContract).

## Vergleich mit legitimen ERC-20-Token {#compare-legit-erc20}

Wir werden diesen Token mit legitimen ERC-20-Token vergleichen. Wenn Sie nicht damit vertraut sind, wie legitime ERC-20-Token typischerweise geschrieben werden, [sehen Sie sich dieses Tutorial an](/developers/tutorials/erc20-annotated-code/).

### Konstanten für privilegierte Adressen {#constants-for-privileged-addresses}

Verträge benötigen manchmal privilegierte Adressen. Verträge, die für eine langfristige Nutzung ausgelegt sind, ermöglichen es einer privilegierten Adresse, diese Adressen zu ändern, beispielsweise um die Nutzung eines neuen Mehrfachsignatur-Vertrags zu ermöglichen. Es gibt mehrere Möglichkeiten, dies zu tun.

Der [`HOP`-Token-Vertrag](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) verwendet das [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable)-Muster. Die privilegierte Adresse wird im Speicher in einem Feld namens `_owner` aufbewahrt (siehe die dritte Datei, `Ownable.sol`).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

Der [`ARB`-Token-Vertrag](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) hat nicht direkt eine privilegierte Adresse. Er benötigt jedoch auch keine. Er befindet sich hinter einem [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) unter der [Adresse `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code). Dieser Vertrag hat eine privilegierte Adresse (siehe die vierte Datei, `ERC1967Upgrade.sol`), die für Upgrades verwendet werden kann.

```solidity
    /* *
     * @dev Speichert eine neue Adresse im EIP1967-Admin-Slot. */
    


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

[Dieser Vertragsbesitzer](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) ist kein Vertrag, der zu verschiedenen Zeiten von verschiedenen Konten kontrolliert werden könnte, sondern ein [Extern verwaltetes Konto](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). Dies bedeutet, dass es wahrscheinlich eher für die kurzfristige Nutzung durch eine Einzelperson konzipiert ist, als als langfristige Lösung zur Kontrolle eines ERC-20, der wertvoll bleiben soll.

Und tatsächlich, wenn wir in Etherscan nachsehen, sehen wir, dass der Betrüger diesen Vertrag nur 12 Stunden lang genutzt hat ([erste Transaktion](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) bis [letzte Transaktion](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)) am 19. Mai 2023.

### Die gefälschte `_transfer`-Funktion {#the-fake-transfer-function}

Es ist Standard, dass tatsächliche Übertragungen über [eine interne `_transfer`-Funktion](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer) erfolgen.

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

Wenn der Vertragsbesitzer Token sendet, warum zeigt das `Transfer`-Ereignis dann an, dass sie vom `deployer` kommen?

Es gibt jedoch ein wichtigeres Problem. Wer ruft diese `_transfer`-Funktion auf? Sie kann nicht von außen aufgerufen werden, da sie als `internal` markiert ist. Und der uns vorliegende Code enthält keine Aufrufe von `_transfer`. Offensichtlich ist sie hier als Täuschung gedacht.

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

Wenn wir uns die Funktionen ansehen, die zur Übertragung von Token aufgerufen werden, `transfer` und `transferFrom`, sehen wir, dass sie eine völlig andere Funktion aufrufen, nämlich `_f_`.

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

- Die Verwendung des [Funktionsmodifikators](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`. Wenn wir uns jedoch den Quellcode ansehen, stellen wir fest, dass `_mod_` eigentlich harmlos ist.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
```

- Dasselbe Problem, das wir in `_transfer` gesehen haben: Wenn der `contract_owner` Token sendet, scheinen sie vom `deployer` zu kommen.

### Die gefälschte Ereignisfunktion `dropNewTokens` {#the-fake-events-function-dropNewTokens}

Nun kommen wir zu etwas, das wie ein tatsächlicher Betrug aussieht. Ich habe die Funktion zur besseren Lesbarkeit etwas bearbeitet, aber sie ist funktional äquivalent.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

Diese Funktion hat den Modifikator `auth()`, was bedeutet, dass sie nur vom Vertragsbesitzer aufgerufen werden kann.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

Diese Einschränkung ist absolut sinnvoll, da wir nicht wollen, dass beliebige Konten Token verteilen. Der Rest der Funktion ist jedoch verdächtig.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

Eine Funktion, um von einem Pool-Konto an ein Array von Empfängern ein Array von Beträgen zu übertragen, ist absolut sinnvoll. Es gibt viele Anwendungsfälle, in denen man Token von einer einzigen Quelle an mehrere Ziele verteilen möchte, wie z. B. Gehaltsabrechnungen, Airdrops usw. Es ist (in Bezug auf Gas) günstiger, dies in einer einzigen Transaktion zu tun, anstatt mehrere Transaktionen auszustellen oder sogar den ERC-20 mehrfach von einem anderen Vertrag aus als Teil derselben Transaktion aufzurufen.

`dropNewTokens` tut dies jedoch nicht. Es gibt [`Transfer`-Ereignisse](https://eips.ethereum.org/EIPS/eip-20#transfer-1) aus, überträgt aber tatsächlich keine Token. Es gibt keinen legitimen Grund, Off-Chain-Anwendungen zu verwirren, indem man ihnen von einer Übertragung erzählt, die nicht wirklich stattgefunden hat.

### Die verbrennende `Approve`-Funktion {#the-burning-approve-function}

ERC-20-Verträge sollen [eine `approve`-Funktion](/developers/tutorials/erc20-annotated-code/#approve) für Freigaben haben, und tatsächlich hat unser Betrugs-Token eine solche Funktion, und sie ist sogar korrekt. Da Solidity jedoch von C abstammt, wird zwischen Groß- und Kleinschreibung unterschieden. "Approve" und "approve" sind unterschiedliche Zeichenfolgen.

Außerdem hat die Funktionalität nichts mit `approve` zu tun.

```solidity
    function Approve(
        address[] memory holders)
```

Diese Funktion wird mit einem Array von Adressen für Inhaber des Tokens aufgerufen.

```solidity
    public approver() {
```

Der Modifikator `approver()` stellt sicher, dass nur der `contract_owner` diese Funktion aufrufen darf (siehe unten).

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

Für jede Inhaberadresse verschiebt die Funktion das gesamte Guthaben des Inhabers an die Adresse `0x00...01`, wodurch es effektiv verbrannt wird (das eigentliche `burn` im Standard ändert auch das Gesamtangebot und überträgt die Token an `0x00...00`). Dies bedeutet, dass der `contract_owner` die Vermögenswerte jedes Benutzers entfernen kann. Das scheint keine Funktion zu sein, die man in einem Governance-Token haben möchte.

### Probleme mit der Codequalität {#code-quality-issues}

Diese Probleme mit der Codequalität _beweisen_ nicht, dass dieser Code ein Betrug ist, aber sie lassen ihn verdächtig erscheinen. Organisierte Unternehmen wie Arbitrum veröffentlichen normalerweise keinen so schlechten Code.

#### Die `mount`-Funktion {#the-mount-function}

Obwohl es in [dem Standard](https://eips.ethereum.org/EIPS/eip-20) nicht spezifiziert ist, wird die Funktion, die neue Token erstellt, im Allgemeinen [`mint`](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) (Prägen) genannt.

Wenn wir uns den `wARB`-Konstruktor ansehen, sehen wir, dass die Präge-Funktion aus irgendeinem Grund in `mount` umbenannt wurde und fünfmal mit einem Fünftel des anfänglichen Angebots aufgerufen wird, anstatt aus Effizienzgründen einmal für den gesamten Betrag.

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

Wenn wir uns das `require` ansehen, sehen wir, dass nur der Vertragsbesitzer prägen darf. Das ist legitim. Aber die Fehlermeldung sollte _only owner is allowed to mint_ oder etwas Ähnliches lauten. Stattdessen ist es das irrelevante _ERC20: mint to the zero address_. Der korrekte Test für das Prägen an die Null-Adresse ist `require(account != address(0), "<error message>")`, was der Vertrag nie zu überprüfen bemüht ist.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Es gibt zwei weitere verdächtige Fakten, die direkt mit dem Prägen zusammenhängen:

- Es gibt einen `account`-Parameter, der vermutlich das Konto ist, das den geprägten Betrag erhalten soll. Aber das Guthaben, das sich erhöht, ist tatsächlich das des `contract_owner`.

- Während das erhöhte Guthaben dem `contract_owner` gehört, zeigt das ausgegebene Ereignis eine Übertragung an `account`.

### Warum sowohl `auth` als auch `approver`? Warum das `mod`, das nichts tut? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

Dieser Vertrag enthält drei Modifikatoren: `_mod_`, `auth` und `approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` nimmt drei Parameter entgegen und macht nichts damit. Warum gibt es ihn?

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

`auth` und `approver` machen mehr Sinn, da sie überprüfen, ob der Vertrag vom `contract_owner` aufgerufen wurde. Wir würden erwarten, dass bestimmte privilegierte Aktionen, wie das Prägen, auf dieses Konto beschränkt sind. Was ist jedoch der Sinn von zwei separaten Funktionen, die _genau dasselbe tun_?

## Was können wir automatisch erkennen? {#what-can-we-detect-automatically}

Wir können durch einen Blick auf Etherscan erkennen, dass `wARB` ein Betrugs-Token ist. Dies ist jedoch eine zentralisierte Lösung. Theoretisch könnte Etherscan unterwandert oder gehackt werden. Es ist besser, unabhängig herausfinden zu können, ob ein Token legitim ist oder nicht.

Es gibt einige Tricks, mit denen wir erkennen können, dass ein ERC-20-Token verdächtig ist (entweder ein Betrug oder sehr schlecht geschrieben), indem wir uns die von ihm ausgegebenen Ereignisse ansehen.

## Verdächtige `Approval`-Ereignisse {#suspicious-approval-events}

[`Approval`-Ereignisse](https://eips.ethereum.org/EIPS/eip-20#approval) sollten nur bei einer direkten Anfrage auftreten (im Gegensatz zu [`Transfer`-Ereignissen](https://eips.ethereum.org/EIPS/eip-20#transfer-1), die als Ergebnis einer Freigabe auftreten können). [Siehe die Solidity-Dokumentation](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin) für eine detaillierte Erklärung dieses Problems und warum die Anfragen direkt sein müssen, anstatt durch einen Vertrag vermittelt zu werden.

Dies bedeutet, dass `Approval`-Ereignisse, die Ausgaben von einem [Extern verwalteten Konto](/developers/docs/accounts/#types-of-account) genehmigen, aus Transaktionen stammen müssen, die von diesem Konto ausgehen und deren Ziel der ERC-20-Vertrag ist. Jede andere Art der Genehmigung von einem Extern verwalteten Konto ist verdächtig.

Hier ist [ein Programm, das diese Art von Ereignis identifiziert](https://github.com/qbzzt/20230915-scam-token-detection), unter Verwendung von [viem](https://viem.sh/) und [TypeScript](https://www.typescriptlang.org/docs/), einer JavaScript-Variante mit Typsicherheit. Um es auszuführen:

1. Kopieren Sie `.env.example` nach `.env`.
2. Bearbeiten Sie `.env`, um die URL zu einem Ethereum-Mainnet-Blockchain-Knoten bereitzustellen.
3. Führen Sie `pnpm install` aus, um die erforderlichen Pakete zu installieren.
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

Erstellen Sie einen Viem-Client. Wir müssen nur von der Blockchain lesen, daher benötigt dieser Client keinen Private-Key.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

Die Adresse des verdächtigen ERC-20-Vertrags und die Blöcke, in denen wir nach Ereignissen suchen werden. Anbieter von Blockchain-Knoten schränken typischerweise unsere Fähigkeit ein, Ereignisse zu lesen, da die Bandbreite teuer werden kann. Glücklicherweise war `wARB` für einen Zeitraum von achtzehn Stunden nicht in Gebrauch, sodass wir nach allen Ereignissen suchen können (es gab insgesamt nur 13).

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

Dies ist der Weg, um Viem nach Ereignisinformationen zu fragen. Wenn wir ihm die genaue Ereignissignatur einschließlich der Feldnamen zur Verfügung stellen, parst es das Ereignis für uns.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

Unser Algorithmus ist nur auf Extern verwaltete Konten anwendbar. Wenn von `client.getBytecode` ein Bytecode zurückgegeben wird, bedeutet dies, dass es sich um einen Vertrag handelt und wir ihn einfach überspringen sollten.

Wenn Sie TypeScript noch nicht verwendet haben, sieht die Funktionsdefinition möglicherweise etwas seltsam aus. Wir sagen ihm nicht nur, dass der erste (und einzige) Parameter `addr` heißt, sondern auch, dass er vom Typ `Address` ist. Ebenso teilt der Teil `: boolean` TypeScript mit, dass der Rückgabewert der Funktion ein Boolean ist.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

Diese Funktion ruft den Transaktionsbeleg aus einem Ereignis ab. Wir benötigen den Beleg, um sicherzustellen, dass wir wissen, was das Ziel der Transaktion war.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

Dies ist die wichtigste Funktion, diejenige, die tatsächlich entscheidet, ob ein Ereignis verdächtig ist oder nicht. Der Rückgabetyp `(Event | null)` teilt TypeScript mit, dass diese Funktion entweder ein `Event` oder `null` zurückgeben kann. Wir geben `null` zurück, wenn das Ereignis nicht verdächtig ist.

```typescript
const owner = ev.args._owner
```

Viem hat die Feldnamen, also hat es das Ereignis für uns geparst. `_owner` ist der Besitzer der auszugebenden Token.

```typescript
// Genehmigungen durch Verträge sind nicht verdächtig
if (await isContract(owner)) return null
```

Wenn der Besitzer ein Vertrag ist, gehen Sie davon aus, dass diese Genehmigung nicht verdächtig ist. Um zu überprüfen, ob die Genehmigung eines Vertrags verdächtig ist oder nicht, müssten wir die vollständige Ausführung der Transaktion verfolgen, um zu sehen, ob sie jemals zum Besitzervertrag gelangt ist und ob dieser Vertrag den ERC-20-Vertrag direkt aufgerufen hat. Das ist weitaus ressourcenintensiver, als wir es gerne tun würden.

```typescript
const txn = await getEventTxn(ev)
```

Wenn die Genehmigung von einem Extern verwalteten Konto stammt, rufen Sie die Transaktion ab, die sie verursacht hat.

```typescript
// Die Genehmigung ist verdächtig, wenn sie von einem EOA-Besitzer stammt, der nicht das `from` der Transaktion ist
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

Wir können nicht einfach auf Zeichenfolgengleichheit prüfen, da Adressen hexadezimal sind und daher Buchstaben enthalten. Manchmal, zum Beispiel in `txn.from`, sind diese Buchstaben alle kleingeschrieben. In anderen Fällen, wie bei `ev.args._owner`, ist die Adresse in [gemischter Groß-/Kleinschreibung zur Fehlererkennung](https://eips.ethereum.org/EIPS/eip-55).

Aber wenn die Transaktion nicht vom Besitzer stammt und dieser Besitzer extern verwaltet wird, dann haben wir eine verdächtige Transaktion.

```typescript
// Es ist auch verdächtig, wenn das Transaktionsziel nicht der ERC-20-Vertrag ist, den wir
// untersuchen
if (txn.to.toLowerCase() != testedAddress) return ev
```

Ebenso ist es verdächtig, wenn die `to`-Adresse der Transaktion, der erste aufgerufene Vertrag, nicht der untersuchte ERC-20-Vertrag ist.

```typescript
    // Wenn kein Grund zum Verdacht besteht, gib null zurück.
    return null
}
```

Wenn keine der Bedingungen zutrifft, ist das `Approval`-Ereignis nicht verdächtig.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[Eine `async`-Funktion](https://www.w3schools.com/js/js_async.asp) gibt ein `Promise`-Objekt zurück. Mit der üblichen Syntax `await x()` warten wir darauf, dass dieses `Promise` erfüllt wird, bevor wir mit der Verarbeitung fortfahren. Dies ist einfach zu programmieren und nachzuvollziehen, aber es ist auch ineffizient. Während wir darauf warten, dass das `Promise` für ein bestimmtes Ereignis erfüllt wird, können wir bereits mit der Arbeit am nächsten Ereignis beginnen.

Hier verwenden wir [`map`](https://www.w3schools.com/jsref/jsref_map.asp), um ein Array von `Promise`-Objekten zu erstellen. Dann verwenden wir [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/), um darauf zu warten, dass alle diese Promises aufgelöst werden. Anschließend [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp)n wir diese Ergebnisse, um die nicht verdächtigen Ereignisse zu entfernen.

### Verdächtige `Transfer`-Ereignisse {#suspicious-transfer-events}

Eine weitere mögliche Methode zur Identifizierung von Betrugs-Token besteht darin, zu prüfen, ob sie verdächtige Übertragungen aufweisen. Zum Beispiel Übertragungen von Konten, die nicht so viele Token haben. Sie können sehen, [wie man diesen Test implementiert](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), aber `wARB` hat dieses Problem nicht.

## Fazit {#conclusion}

Die automatisierte Erkennung von ERC-20-Betrügereien leidet unter [falsch-negativen Ergebnissen](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error), da ein Betrug einen völlig normalen ERC-20-Token-Vertrag verwenden kann, der einfach nichts Reales darstellt. Daher sollten Sie immer versuchen, _die Token-Adresse aus einer vertrauenswürdigen Quelle zu beziehen_.

Die automatisierte Erkennung kann in bestimmten Fällen helfen, wie z. B. bei DeFi-Komponenten, bei denen es viele Token gibt und diese automatisch verarbeitet werden müssen. Aber wie immer gilt [Caveat emptor](https://www.investopedia.com/terms/c/caveatemptor.asp) (Käufer, sei wachsam): Recherchieren Sie selbst und ermutigen Sie Ihre Benutzer, dasselbe zu tun.

[Weitere meiner Arbeiten finden Sie hier](https://cryptodocguy.pro/).