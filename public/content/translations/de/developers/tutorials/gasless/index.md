---
title: "Sponsoring von Gasgebühren: Wie Sie Transaktionskosten für Ihre Nutzer übernehmen"
description: "Es ist einfach, einen Private-Key und eine Adresse zu erstellen; es ist nur eine Frage der Ausführung der richtigen Software. Aber es gibt viele Orte auf der Welt, an denen es viel schwieriger ist, ETH zu bekommen, um Transaktionen zu senden. In diesem Tutorial lernen Sie, wie Sie die Gasgebühren auf der Blockchain für die Ausführung von nutzersignierten, strukturierten Off-Chain-Daten in Ihrem Smart Contract übernehmen. Sie lassen den Nutzer eine Struktur signieren, die die Transaktionsinformationen enthält, welche Ihr Off-Chain-Code dann als Transaktion an die Blockchain übermittelt."
author: Ori Pomerantz
tags: ["gaslos", "Solidity", "EIP-712", "Meta-Transaktionen"]
skill: intermediate
breadcrumb: Gas-Sponsoring
lang: de
published: 2026-02-27
---

## Einführung {#introduction}

Wenn wir wollen, dass Ethereum [einer Milliarde weiterer Menschen](https://blog.ethereum.org/category/next-billion) dient, müssen wir Reibungspunkte beseitigen und die Nutzung so einfach wie möglich machen. Eine Quelle dieser Reibung ist die Notwendigkeit von ETH, um Gasgebühren zu bezahlen.

Wenn Sie eine Dapp haben, die mit Nutzern Geld verdient, könnte es sinnvoll sein, Nutzer Transaktionen über Ihren Server einreichen zu lassen und die Transaktionsgebühren selbst zu bezahlen. Da die Nutzer weiterhin eine [EIP-712-Autorisierungsnachricht](https://eips.ethereum.org/EIPS/eip-712) in ihren Wallets signieren, behalten sie die Integritätsgarantien von Ethereum. Die Verfügbarkeit hängt von dem Server ab, der die Transaktionen weiterleitet, und ist daher eingeschränkter. Sie können es jedoch so einrichten, dass Nutzer auch direkt auf den Smart Contract zugreifen können (wenn sie ETH erhalten), und andere ihre eigenen Server einrichten lassen, wenn sie Transaktionen sponsern möchten.

Die Technik in diesem Tutorial funktioniert nur, wenn Sie den Smart Contract kontrollieren. Es gibt andere Techniken, einschließlich der [Kontoabstraktion](https://eips.ethereum.org/EIPS/eip-4337), mit denen Sie Transaktionen an andere Smart Contracts sponsern können, was ich hoffentlich in einem zukünftigen Tutorial behandeln werde.

Hinweis: Dies ist _kein_ produktionsreifer Code. Er ist anfällig für erhebliche Angriffe und es fehlen wichtige Funktionen. Erfahren Sie mehr im [Abschnitt über Schwachstellen in diesem Leitfaden](#vulnerabilities).

### Voraussetzungen {#prerequisites}

Um dieses Tutorial zu verstehen, sollten Sie bereits vertraut sein mit:

- Solidity
- JavaScript
- React und WAGMI. Wenn Sie mit diesen Benutzeroberflächen-Tools nicht vertraut sind, [haben wir ein Tutorial dafür](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

## Die Beispielanwendung {#sample-app}

Die hier gezeigte Beispielanwendung ist eine Variante des `Greeter`-Vertrags von Hardhat. Sie können sie [auf GitHub](https://github.com/qbzzt/260301-gasless) ansehen. Der Smart Contract ist bereits auf [Sepolia](https://sepolia.dev/) unter der Adresse [`0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA) bereitgestellt.

Um sie in Aktion zu sehen, befolgen Sie diese Schritte.

1. Klonen Sie das Repository und installieren Sie die erforderliche Software.

   ```sh
   git clone https://github.com/qbzzt/260301-gasless.git
   cd 260301-gasless/server
   npm install
```

2. Bearbeiten Sie `.env`, um `PRIVATE_KEY` auf ein Wallet zu setzen, das ETH auf Sepolia hat. Wenn Sie Sepolia-ETH benötigen, [verwenden Sie ein Faucet](/developers/docs/networks/#sepolia). Idealerweise sollte sich dieser Private-Key von dem in Ihrem Browser-Wallet unterscheiden.

3. Starten Sie den Server.

   ```sh
   npm run dev
```

4. Rufen Sie die Anwendung unter der URL [`http://localhost:5173`](http://localhost:5173) auf.

5. Klicken Sie auf **Connect with Injected**, um sich mit einem Wallet zu verbinden. Bestätigen Sie dies im Wallet und genehmigen Sie bei Bedarf den Wechsel zu Sepolia.

6. Schreiben Sie eine neue Begrüßung und klicken Sie auf **Update greeting via sponsor**.

7. Signieren Sie die Nachricht.

8. Warten Sie etwa 12 Sekunden (die Blockzeit auf Sepolia). Während Sie warten, können Sie sich die URL in der Serverkonsole ansehen, um die Transaktion zu sehen.

9. Sehen Sie, dass sich die Begrüßung geändert hat und dass der Wert der Adresse, die zuletzt aktualisiert hat, nun die Adresse Ihres Browser-Wallets ist.

Um zu verstehen, wie das funktioniert, müssen wir uns ansehen, wie die Nachricht in der Benutzeroberfläche erstellt wird, wie sie vom Server weitergeleitet wird und wie der Smart Contract sie verarbeitet.

### Die Benutzeroberfläche {#ui-changes}

Die Benutzeroberfläche basiert auf [WAGMI](https://wagmi.sh/); Sie können [in diesem Tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) darüber lesen.

So signieren wir die Nachricht:

```js
const signGreeting = useCallback(
```

Der React-Hook [`useCallback`](https://react.dev/reference/react/useCallback) ermöglicht es uns, die Leistung zu verbessern, indem wir dieselbe Funktion wiederverwenden, wenn die Komponente neu gezeichnet wird.

```js
    async (greeting) => {
        if (!account) throw new Error("Wallet not connected")
```

Wenn es kein Konto gibt, wird ein Fehler ausgelöst. Dies sollte niemals passieren, da die UI-Schaltfläche, die den Prozess startet, der `signGreeting` aufruft, in diesem Fall deaktiviert ist. Zukünftige Programmierer könnten diese Schutzmaßnahme jedoch entfernen, daher ist es eine gute Idee, diese Bedingung auch hier zu überprüfen.

```js
        const domain = {
            name: "Greeter",
            version: "1",
            chainId,
            verifyingContract: contractAddr,
        }
```

Parameter für den [Domain-Separator](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). Dieser Wert ist konstant, daher könnten wir ihn in einer besser optimierten Implementierung einmal berechnen, anstatt ihn bei jedem Aufruf der Funktion neu zu berechnen.

- `name` ist ein für den Nutzer lesbarer Name, wie z. B. der Name der Dapp, für die wir Signaturen erstellen.
- `version` ist die Version. Verschiedene Versionen sind nicht kompatibel.
- `chainId` ist die Chain, die wir verwenden, wie sie [von WAGMI](https://wagmi.sh/react/api/hooks/useChainId) bereitgestellt wird.
- `verifyingContract` ist die Vertragsadresse, die diese Signatur verifizieren wird. Wir möchten nicht, dass dieselbe Signatur für mehrere Verträge gilt, falls es mehrere `Greeter`-Verträge gibt und wir möchten, dass sie unterschiedliche Begrüßungen haben.

```js

        const types = {
            GreetingRequest: [
                { name: "greeting", type: "string" },
            ],
        }
```

Der Datentyp, den wir signieren. Hier haben wir einen einzigen Parameter, `greeting`, aber reale Systeme haben typischerweise mehr.

```js
        const message = { greeting }
```

Die eigentliche Nachricht, die wir signieren und senden möchten. `greeting` ist sowohl der Feldname als auch der Name der Variablen, die ihn füllt.

```js
        const signature = await signTypedDataAsync({
            domain,
            types,
            primaryType: "GreetingRequest",
            message,
        })
```

Die Signatur tatsächlich abrufen. Diese Funktion ist asynchron, da Nutzer (aus Sicht eines Computers) lange brauchen, um Daten zu signieren.

```js
        const r = `0x${signature.slice(2, 66)}`
        const s = `0x${signature.slice(66, 130)}`
        const v = parseInt(signature.slice(130, 132), 16)

        return {
            req: { greeting },
            v,
            r,
            s,
        }
    },
```

Die Funktion gibt einen einzelnen hexadezimalen Wert zurück. Hier teilen wir ihn in Felder auf.

```js
    [account, chainId, contractAddr, signTypedDataAsync],
)
```

Wenn sich eine dieser Variablen ändert, erstellen Sie eine neue Instanz der Funktion. Die Parameter `account` und `chainId` können vom Nutzer im Wallet geändert werden. `contractAddr` ist eine Funktion der Chain-ID. `signTypedDataAsync` sollte sich nicht ändern, aber wir importieren es aus [einem Hook](https://wagmi.sh/react/api/hooks/useSignTypedData), daher können wir nicht sicher sein, und es ist am besten, es hier hinzuzufügen.

Nachdem die neue Begrüßung nun signiert ist, müssen wir sie an den Server senden.

```js
  const sponsoredGreeting = async () => {
    try {
```

Diese Funktion nimmt eine Signatur und sendet sie an den Server.

```js
      const signedMessage = await signGreeting(newGreeting)
      const response = await fetch("/server/sponsor", {
```

Senden Sie an den Pfad `/server/sponsor` auf dem Server, von dem wir gekommen sind.

```js
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signedMessage),
      })
```

Verwenden Sie `POST`, um die Informationen JSON-codiert zu senden.

```js
      const data = await response.json()
      console.log("Server response:", data)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Geben Sie die Antwort aus. Auf einem Produktionssystem würden wir die Antwort auch dem Nutzer anzeigen.

### Der Server {#server}

Ich verwende gerne [Vite](https://vite.dev/) als mein Front-End. Es stellt automatisch die React-Bibliotheken bereit und aktualisiert den Browser, wenn sich der Front-End-Code ändert. Vite enthält jedoch keine Backend-Tools.

Die Lösung befindet sich in [`index.js`](https://github.com/qbzzt/260301-gasless/blob/main/server/index.js).

```js
  app.post("/server/sponsor", async (req, res) => {
    ...
  })

  // Lass Vite alles andere erledigen
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)
```

Zuerst registrieren wir einen Handler für die Anfragen, die wir selbst bearbeiten (`POST` an `/server/sponsor`). Dann erstellen und verwenden wir einen Vite-Server, um alle anderen URLs zu verarbeiten.

```js
  app.post("/server/sponsor", async (req, res) => {
    try {
      const signed = req.body

      const txHash = await sepoliaClient.writeContract({
        address: greeterAddr,
        abi: greeterABI,
        functionName: 'sponsoredSetGreeting',
        args: [signed.req, signed.v, signed.r, signed.s],
      })
    } ...
  })
```

Dies ist nur ein standardmäßiger [viem](https://viem.sh/)-Blockchain-Aufruf.

### Der Smart Contract {#smart-contract}

Schließlich muss [`Greeter.sol`](https://github.com/qbzzt/260301-gasless/blob/main/contracts/src/Greeter.sol) die Signatur verifizieren.

```solidity
    constructor(string memory _greeting) {
        greeting = _greeting;

        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("Greeter")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

Der Konstruktor erstellt den [Domain-Separator](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator), ähnlich wie der obige Benutzeroberflächen-Code. Die Ausführung auf der Blockchain ist viel teurer, daher berechnen wir ihn nur einmal.

```solidity
    struct GreetingRequest {
        string greeting;
    }
```

Dies ist die Struktur, die signiert wird. Hier haben wir nur ein Feld.

```solidity
    bytes32 private constant GREETING_TYPEHASH =
        keccak256("GreetingRequest(string greeting)");
```

Dies ist der [Struktur-Identifikator](https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct). Er wird jedes Mal in der Benutzeroberfläche berechnet.

```solidity
    function sponsoredSetGreeting(
        GreetingRequest calldata req,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
```

Diese Funktion empfängt eine signierte Anfrage und aktualisiert die Begrüßung.

```solidity
        // EIP-712-Digest berechnen
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        GREETING_TYPEHASH,
                        keccak256(bytes(req.greeting))
                    )
                )
            )
        );
```

Erstellen Sie den Digest in Übereinstimmung mit [EIP 712](https://eips.ethereum.org/EIPS/eip-712).

```solidity
        // Signer wiederherstellen
        address signer = ecrecover(digest, v, r, s);
        require(signer != address(0), "Invalid signature");
```

Verwenden Sie [`ecrecover`](https://www.evm.codes/precompiled?fork=osaka#0x01), um die Adresse des Unterzeichners zu erhalten. Beachten Sie, dass eine fehlerhafte Signatur dennoch zu einer gültigen Adresse führen kann, nur eben zu einer zufälligen.

```solidity
        // Begrüßung anwenden, als hätte der Signer sie aufgerufen
        greeting = req.greeting;
        emit SetGreeting(signer, req.greeting);
    }
```

Aktualisieren Sie die Begrüßung.

## Schwachstellen {#vulnerabilities}

Dies ist _kein_ produktionsreifer Code. Er ist anfällig für erhebliche Angriffe und es fehlen wichtige Funktionen. Hier sind einige davon, zusammen mit Lösungsansätzen.

Um einige dieser Angriffe zu sehen, klicken Sie auf die Schaltflächen unter der Überschrift _Attacks_ und sehen Sie, was passiert. Für die Schaltfläche **Invalid signature** überprüfen Sie die Serverkonsole, um die Transaktionsantwort zu sehen.

### Denial-of-Service auf dem Server {#dos-on-server}

Der einfachste Angriff ist ein [Denial-of-Service](https://en.wikipedia.org/wiki/Denial-of-service_attack)-Angriff auf den Server. Der Server empfängt Anfragen von überall im Internet und sendet basierend auf diesen Anfragen Transaktionen. Es gibt absolut nichts, was einen Angreifer daran hindert, eine Reihe von Signaturen auszustellen, ob gültig oder ungültig. Jede wird eine Transaktion verursachen. Letztendlich wird dem Server das ETH ausgehen, um für Gas zu bezahlen.

Eine Lösung für dieses Problem besteht darin, die Rate auf eine Transaktion pro Block zu begrenzen. Wenn der Zweck darin besteht, Begrüßungen für [Extern verwaltete Konten](/developers/docs/accounts/#key-differences) anzuzeigen, spielt es ohnehin keine Rolle, wie die Begrüßung in der Mitte des Blocks lautet.

Eine weitere Lösung besteht darin, Adressen nachzuverfolgen und nur Signaturen von gültigen Kunden zuzulassen.

### Falsche Begrüßungssignaturen {#wrong-greeting-sigs}

Wenn Sie auf **Signature for wrong greeting** klicken, übermitteln Sie eine gültige Signatur für eine bestimmte Adresse (`0xaA92c5d426430D4769c9E878C1333BDe3d689b3e`) und Begrüßung (`Hello`). Aber sie wird mit einer anderen Begrüßung übermittelt. Dies verwirrt `ecrecover`, was die Begrüßung ändert, aber die falsche Adresse hat.

Um dieses Problem zu lösen, fügen Sie die Adresse zur [signierten Struktur](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx#L122-L124) hinzu. Auf diese Weise stimmt die zufällige Adresse von `ecrecover` nicht mit der Adresse in der Signatur überein, und der Smart Contract wird die Nachricht ablehnen.

### Replay-Angriffe {#replay-attack}

Wenn Sie auf **Replay attack** klicken, übermitteln Sie dieselbe Signatur „Ich bin 0xaA92c5d426430D4769c9E878C1333BDe3d689b3e und ich möchte, dass die Begrüßung `Hello` lautet“, aber mit der korrekten Begrüßung. Infolgedessen glaubt der Smart Contract, dass die Adresse (die nicht Ihre ist) die Begrüßung wieder in `Hello` geändert hat. Die Informationen dazu sind öffentlich in den [Transaktionsinformationen](https://eth-sepolia.blockscout.com/tx/0xa66afe4bbf886f59533e677a798c802ceab1ac0f9db6e83a4d4b59a45cf7c1b1) verfügbar.

Wenn dies ein Problem darstellt, besteht eine Lösung darin, eine [Nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) hinzuzufügen. Erstellen Sie ein [Mapping](https://docs.soliditylang.org/en/latest/types.html#mapping-types) zwischen Adressen und Zahlen und fügen Sie der Signatur ein Nonce-Feld hinzu. Wenn das Nonce-Feld mit dem Mapping für die Adresse übereinstimmt, akzeptieren Sie die Signatur und erhöhen Sie das Mapping für das nächste Mal. Wenn nicht, lehnen Sie die Transaktion ab.

Eine weitere Lösung besteht darin, den signierten Daten einen Zeitstempel hinzuzufügen und die Signatur nur für wenige Sekunden nach diesem Zeitstempel als gültig zu akzeptieren. Dies ist einfacher und billiger, aber wir riskieren Replay-Angriffe innerhalb des Zeitfensters und das Fehlschlagen legitimer Transaktionen, wenn das Zeitfenster überschritten wird.

## Weitere fehlende Funktionen {#other-missing-features}

Es gibt zusätzliche Funktionen, die wir in einer Produktionsumgebung hinzufügen würden.

### Zugriff von anderen Servern {#other-servers}

Derzeit erlauben wir jeder Adresse, ein `sponsorSetGreeting` zu übermitteln. Dies könnte im Interesse der Dezentralisierung genau das sein, was wir wollen. Oder vielleicht möchten wir sicherstellen, dass gesponserte Transaktionen über _unseren_ Server laufen, in welchem Fall wir `msg.sender` im Smart Contract überprüfen würden.

So oder so sollte dies eine bewusste Designentscheidung sein und nicht nur das Ergebnis davon, dass man nicht über das Problem nachgedacht hat.

### Fehlerbehandlung {#error-handling}

Ein Nutzer übermittelt eine Begrüßung. Vielleicht wird sie beim nächsten Block aktualisiert. Vielleicht auch nicht. Fehler sind unsichtbar. Auf einem Produktionssystem sollte der Nutzer zwischen diesen Fällen unterscheiden können:

- Die neue Begrüßung wurde noch nicht übermittelt
- Die neue Begrüßung wurde übermittelt und wird verarbeitet
- Die neue Begrüßung wurde abgelehnt

## Fazit {#conclusion}

An diesem Punkt sollten Sie in der Lage sein, ein gasloses Erlebnis für die Nutzer Ihrer Dapp zu schaffen, auf Kosten einer gewissen Zentralisierung.

Dies funktioniert jedoch nur mit Smart Contracts, die ERC-712 unterstützen. Um beispielsweise einen ERC-20-Token zu übertragen, ist es erforderlich, dass die Transaktion vom Eigentümer signiert wird und nicht nur eine Nachricht. Die Lösung ist die [Kontoabstraktion (ERC-4337)](https://docs.erc4337.io/index.html). Ich hoffe, in Zukunft ein Tutorial darüber zu schreiben.

[Sehen Sie hier für weitere meiner Arbeiten](https://cryptodocguy.pro/).