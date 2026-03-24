---
title: "Sponsorizzare le commissioni: Come coprire i costi di transazione per i tuoi utenti"
description: "È facile creare una chiave privata e un indirizzo; è solo questione di eseguire il software giusto. Ma ci sono molti posti al mondo in cui ottenere ETH per inviare transazioni è molto più difficile. In questo tutorial imparerai come coprire i costi del gas on-chain per l'esecuzione di dati strutturati fuori catena firmati dall'utente nel tuo contratto intelligente. Fai firmare all'utente una struttura contenente le informazioni della transazione, che il tuo codice fuori catena invia poi alla blockchain come transazione."
author: Ori Pomerantz
tags: ["senza gas", "Solidity", "eip-712", "meta-transazioni"]
skill: intermediate
breadcrumb: Sponsorizzazione del gas
lang: it
published: 2026-02-27
---

## Introduzione {#introduction}

Se vogliamo che Ethereum serva [un miliardo di persone in più](https://blog.ethereum.org/category/next-billion), dobbiamo rimuovere gli attriti e renderlo il più facile possibile da usare. Una fonte di questo attrito è la necessità di ETH per pagare le commissioni.

Se hai una dApp che guadagna dagli utenti, potrebbe avere senso consentire agli utenti di inviare transazioni tramite il tuo server e pagare tu stesso le commissioni della transazione. Poiché gli utenti firmano comunque un [messaggio di autorizzazione EIP-712](https://eips.ethereum.org/EIPS/eip-712) nei loro portafogli, mantengono le garanzie di integrità di Ethereum. La disponibilità dipende dal server che trasmette le transazioni, quindi è più limitata. Tuttavia, puoi configurare le cose in modo che gli utenti possano anche accedere direttamente al contratto intelligente (se ottengono ETH) e consentire ad altri di configurare i propri server se desiderano sponsorizzare le transazioni.

La tecnica in questo tutorial funziona solo quando controlli il contratto intelligente. Ci sono altre tecniche, inclusa l'[astrazione dell'account](https://eips.ethereum.org/EIPS/eip-4337) che ti permettono di sponsorizzare transazioni verso altri contratti intelligenti, che spero di trattare in un tutorial futuro.

Nota: Questo _non_ è codice a livello di produzione. È vulnerabile ad attacchi significativi e manca di funzionalità importanti. Scopri di più nella [sezione sulle vulnerabilità di questa guida](#vulnerabilities).

### Prerequisiti {#prerequisites}

Per comprendere questo tutorial devi avere già familiarità con:

- Solidity
- JavaScript
- React e WAGMI. Se non hai familiarità con questi strumenti per l'interfaccia utente, [abbiamo un tutorial a riguardo](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

## L'applicazione di esempio {#sample-app}

L'applicazione di esempio qui è una variante del contratto `Greeter` di Hardhat. Puoi vederla [su GitHub](https://github.com/qbzzt/260301-gasless). Il contratto intelligente è già distribuito su [Sepolia](https://sepolia.dev/), all'indirizzo [`0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA).

Per vederla in azione, segui questi passaggi.

1. Clona il repository e installa il software necessario.

   ```sh
   git clone https://github.com/qbzzt/260301-gasless.git
   cd 260301-gasless/server
   npm install
```

2. Modifica `.env` per impostare `PRIVATE_KEY` su un portafoglio che ha ETH su Sepolia. Se hai bisogno di ETH su Sepolia, [usa un rubinetto](/developers/docs/networks/#sepolia). Idealmente, questa chiave privata dovrebbe essere diversa da quella che hai nel portafoglio del tuo browser.

3. Avvia il server.

   ```sh
   npm run dev
```

4. Naviga verso l'applicazione all'URL [`http://localhost:5173`](http://localhost:5173).

5. Fai clic su **Connect with Injected** per connetterti a un portafoglio. Approva nel portafoglio e approva il passaggio a Sepolia se necessario.

6. Scrivi un nuovo saluto e fai clic su **Update greeting via sponsor**.

7. Firma il messaggio.

8. Attendi circa 12 secondi (il tempo di blocco su Sepolia). Durante l'attesa puoi guardare l'URL nella console del server per vedere la transazione.

9. Verifica che il saluto sia cambiato e che il valore dell'indirizzo dell'ultimo aggiornamento sia ora l'indirizzo del portafoglio del tuo browser.

Per capire come funziona, dobbiamo esaminare come il messaggio viene creato nell'interfaccia utente, come viene trasmesso dal server e come il contratto intelligente lo elabora.

### L'interfaccia utente {#ui-changes}

L'interfaccia utente è basata su [WAGMI](https://wagmi.sh/); puoi leggerne a riguardo [in questo tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Ecco come firmiamo il messaggio:

```js
const signGreeting = useCallback(
```

L'hook di React [`useCallback`](https://react.dev/reference/react/useCallback) ci permette di migliorare le prestazioni riutilizzando la stessa funzione quando il componente viene ridisegnato.

```js
    async (greeting) => {
        if (!account) throw new Error("Wallet not connected")
```

Se non c'è alcun account, solleva un errore. Questo non dovrebbe mai accadere perché il pulsante dell'interfaccia utente che avvia il processo che chiama `signGreeting` è disabilitato in quel caso. Tuttavia, i programmatori futuri potrebbero rimuovere quella salvaguardia, quindi è una buona idea controllare questa condizione anche qui.

```js
        const domain = {
            name: "Greeter",
            version: "1",
            chainId,
            verifyingContract: contractAddr,
        }
```

Parametri per il [separatore di dominio](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). Questo valore è costante, quindi in un'implementazione meglio ottimizzata, potremmo calcolarlo una volta anziché ricalcolarlo ogni volta che la funzione viene chiamata.

- `name` è un nome leggibile dall'utente, come il nome della dApp per cui stiamo producendo le firme.
- `version` è la versione. Versioni diverse non sono compatibili.
- `chainId` è la catena che stiamo utilizzando, come fornito [da WAGMI](https://wagmi.sh/react/api/hooks/useChainId).
- `verifyingContract` è l'indirizzo del contratto che verificherà questa firma. Non vogliamo che la stessa firma si applichi a più contratti, nel caso in cui ci siano diversi contratti `Greeter` e vogliamo che abbiano saluti diversi.

```js

        const types = {
            GreetingRequest: [
                { name: "greeting", type: "string" },
            ],
        }
```

Il tipo di dati che firmiamo. Qui abbiamo un singolo parametro, `greeting`, ma i sistemi reali in genere ne hanno di più.

```js
        const message = { greeting }
```

Il messaggio effettivo che vogliamo firmare e inviare. `greeting` è sia il nome del campo che il nome della variabile che lo riempie.

```js
        const signature = await signTypedDataAsync({
            domain,
            types,
            primaryType: "GreetingRequest",
            message,
        })
```

Ottieni effettivamente la firma. Questa funzione è asincrona perché gli utenti impiegano molto tempo (dal punto di vista di un computer) per firmare i dati.

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

La funzione restituisce un singolo valore esadecimale. Qui lo dividiamo in campi.

```js
    [account, chainId, contractAddr, signTypedDataAsync],
)
```

Se una qualsiasi di queste variabili cambia, crea una nuova istanza della funzione. I parametri `account` e `chainId` possono essere modificati dall'utente nel portafoglio. `contractAddr` è una funzione dell'Id della catena. `signTypedDataAsync` non dovrebbe cambiare, ma lo importiamo da [un hook](https://wagmi.sh/react/api/hooks/useSignTypedData), quindi non possiamo esserne sicuri, ed è meglio aggiungerlo qui.

Ora che il nuovo saluto è firmato, dobbiamo inviarlo al server.

```js
  const sponsoredGreeting = async () => {
    try {
```

Questa funzione prende una firma e la invia al server.

```js
      const signedMessage = await signGreeting(newGreeting)
      const response = await fetch("/server/sponsor", {
```

Invia al percorso `/server/sponsor` nel server da cui proveniamo.

```js
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signedMessage),
      })
```

Usa `POST` per inviare le informazioni codificate in JSON.

```js
      const data = await response.json()
      console.log("Server response:", data)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Emetti la risposta. Su un sistema di produzione mostreremmo anche la risposta all'utente.

### Il server {#server}

Mi piace usare [Vite](https://vite.dev/) come mio front-end. Serve automaticamente le librerie React e aggiorna il browser quando il codice front-end cambia. Tuttavia, Vite non include strumenti di backend.

La soluzione è in [`index.js`](https://github.com/qbzzt/260301-gasless/blob/main/server/index.js).

```js
  app.post("/server/sponsor", async (req, res) => {
    ...
  })

  // Lascia che Vite gestisca tutto il resto
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)
```

Per prima cosa registriamo un gestore per le richieste che gestiamo noi stessi (`POST` a `/server/sponsor`). Quindi creiamo e usiamo un server Vite per gestire tutti gli altri URL.

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

Questa è solo una chiamata standard alla blockchain con [viem](https://viem.sh/).

### Il contratto intelligente {#smart-contract}

Infine, [`Greeter.sol`](https://github.com/qbzzt/260301-gasless/blob/main/contracts/src/Greeter.sol) deve verificare la firma.

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

Il costruttore crea il [separatore di dominio](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator), in modo simile al codice dell'interfaccia utente sopra. L'esecuzione sulla blockchain è molto più costosa, quindi lo calcoliamo solo una volta.

```solidity
    struct GreetingRequest {
        string greeting;
    }
```

Questa è la struttura che viene firmata. Qui abbiamo un solo campo.

```solidity
    bytes32 private constant GREETING_TYPEHASH =
        keccak256("GreetingRequest(string greeting)");
```

Questo è l'[identificatore della struttura](https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct). Viene calcolato ogni volta nell'interfaccia utente.

```solidity
    function sponsoredSetGreeting(
        GreetingRequest calldata req,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
```

Questa funzione riceve una richiesta firmata e aggiorna il saluto.

```solidity
        // Calcola il digest EIP-712
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

Crea il digest in conformità con l'[EIP 712](https://eips.ethereum.org/EIPS/eip-712).

```solidity
        // Recupera il firmatario
        address signer = ecrecover(digest, v, r, s);
        require(signer != address(0), "Invalid signature");
```

Usa [`ecrecover`](https://www.evm.codes/precompiled?fork=osaka#0x01) per ottenere l'indirizzo del firmatario. Nota che una firma errata può comunque produrre un indirizzo valido, solo che sarà casuale.

```solidity
        // Applica il saluto come se il firmatario lo avesse chiamato
        greeting = req.greeting;
        emit SetGreeting(signer, req.greeting);
    }
```

Aggiorna il saluto.

## Vulnerabilità {#vulnerabilities}

Questo _non_ è codice a livello di produzione. È vulnerabile ad attacchi significativi e manca di funzionalità importanti. Eccone alcune, insieme a come risolverle.

Per vedere alcuni di questi attacchi, fai clic sui pulsanti sotto l'intestazione _Attacks_ e guarda cosa succede. Per il pulsante **Invalid signature**, controlla la console del server per vedere la risposta della transazione.

### Denial of service sul server {#dos-on-server}

L'attacco più semplice è un attacco [denial-of-service](https://en.wikipedia.org/wiki/Denial-of-service_attack) sul server. Il server riceve richieste da qualsiasi parte di Internet e, in base a tali richieste, invia transazioni. Non c'è assolutamente nulla che impedisca a un utente malintenzionato di emettere un mucchio di firme, valide o non valide. Ognuna causerà una transazione. Alla fine il server esaurirà gli ETH per pagare il gas.

Una soluzione a questo problema è limitare la frequenza a una transazione per blocco. Se lo scopo è mostrare i saluti agli [account controllati esternamente](/developers/docs/accounts/#key-differences), non importa comunque quale sia il saluto nel mezzo del blocco.

Un'altra soluzione è tenere traccia degli indirizzi e consentire solo le firme da clienti validi.

### Firme di saluto errate {#wrong-greeting-sigs}

Quando fai clic su **Signature for wrong greeting**, invii una firma valida per un indirizzo specifico (`0xaA92c5d426430D4769c9E878C1333BDe3d689b3e`) e un saluto (`Hello`). Ma lo invia con un saluto diverso. Questo confonde `ecrecover`, che cambia il saluto ma ha l'indirizzo sbagliato.

Per risolvere questo problema, aggiungi l'indirizzo alla [struttura firmata](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx#L122-L124). In questo modo, l'indirizzo casuale di `ecrecover` non corrisponderà all'indirizzo nella firma e il contratto intelligente rifiuterà il messaggio.

### Attacchi di replay {#replay-attack}

Quando fai clic su **Replay attack**, invii la stessa firma "Sono 0xaA92c5d426430D4769c9E878C1333BDe3d689b3e e vorrei che il saluto fosse `Hello`", ma con il saluto corretto. Di conseguenza, il contratto intelligente crede che l'indirizzo (che non è il tuo) abbia riportato il saluto a `Hello`. Le informazioni per farlo sono pubblicamente disponibili nelle [informazioni della transazione](https://eth-sepolia.blockscout.com/tx/0xa66afe4bbf886f59533e677a798c802ceab1ac0f9db6e83a4d4b59a45cf7c1b1).

Se questo è un problema, una soluzione è aggiungere un [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Crea una [mappatura](https://docs.soliditylang.org/en/latest/types.html#mapping-types) tra indirizzi e numeri e aggiungi un campo nonce alla firma. Se il campo nonce corrisponde alla mappatura per l'indirizzo, accetta la firma e incrementa la mappatura per la volta successiva. In caso contrario, rifiuta la transazione.

Un'altra soluzione è aggiungere un timestamp ai dati firmati e accettare la firma come valida solo per pochi secondi dopo quel timestamp. Questo è più semplice ed economico, ma rischiamo attacchi di replay all'interno della finestra temporale e il fallimento di transazioni legittime se la finestra temporale viene superata.

## Altre funzionalità mancanti {#other-missing-features}

Ci sono funzionalità aggiuntive che aggiungeremmo in un ambiente di produzione.

### Accesso da altri server {#other-servers}

Attualmente, consentiamo a qualsiasi indirizzo di inviare un `sponsorSetGreeting`. Questo potrebbe essere esattamente ciò che vogliamo, nell'interesse della decentralizzazione. O forse vogliamo assicurarci che le transazioni sponsorizzate passino attraverso il _nostro_ server, nel qual caso controlleremmo `msg.sender` nel contratto intelligente.

In ogni caso, questa dovrebbe essere una decisione di progettazione consapevole, non solo il risultato di non aver pensato al problema.

### Gestione degli errori {#error-handling}

Un utente invia un saluto. Forse viene aggiornato al blocco successivo. Forse no. Gli errori sono invisibili. Su un sistema di produzione, l'utente dovrebbe essere in grado di distinguere tra questi casi:

- Il nuovo saluto non è stato ancora inviato
- Il nuovo saluto è stato inviato ed è in fase di elaborazione
- Il nuovo saluto è stato rifiutato

## Conclusione {#conclusion}

A questo punto, dovresti essere in grado di creare un'esperienza senza gas per gli utenti della tua dApp, al costo di una certa centralizzazione.

Tuttavia, questo funziona solo con contratti intelligenti che supportano ERC-712. Per trasferire un token ERC-20, ad esempio, è necessario che la transazione sia firmata dal proprietario anziché solo un messaggio. La soluzione è l'[astrazione dell'account (ERC-4337)](https://docs.erc4337.io/index.html). Spero di scrivere un tutorial futuro a riguardo.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).