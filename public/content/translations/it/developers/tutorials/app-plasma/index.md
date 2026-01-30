---
title: Scrivere una plasma specifica per l'app che preserva la privacy
description: In questa guida, creiamo una banca semi-segreta per i depositi. La banca è un componente centralizzato; conosce il saldo di ogni utente. Tuttavia, questa informazione non è archiviata sulla catena. Invece, la banca pubblica un hash dello stato. Ogni volta che si verifica una transazione, la banca pubblica il nuovo hash, insieme a una prova a conoscenza-zero che dimostra l'esistenza di una transazione firmata che cambia lo stato dell'hash in quello nuovo. Dopo aver letto questa guida, non solo capirai come usare le prove a conoscenza-zero, ma anche perché le usi e come farlo in modo sicuro.
author: Ori Pomerantz
tags: [ "conoscenza-zero", "server", "offchain", "privacy" ]
skill: advanced
lang: it
published: 2025-10-15
---

## Introduzione {#introduction}

A differenza dei [rollup](/developers/docs/scaling/zk-rollups/), le [plasma](/developers/docs/scaling/plasma) usano la rete principale di Ethereum per l'integrità, ma non per la disponibilità. In questo articolo, scriviamo un'applicazione che si comporta come una plasma, con Ethereum che garantisce l'integrità (nessuna modifica non autorizzata) ma non la disponibilità (un componente centralizzato può andare fuori servizio e disabilitare l'intero sistema).

L'applicazione che scriviamo qui è una banca che preserva la privacy. Indirizzi diversi hanno conti con saldi, e possono inviare denaro (ETH) ad altri conti. La banca pubblica gli hash dello stato (conti e loro saldi) e delle transazioni, ma mantiene i saldi effettivi fuori dalla catena, dove possono rimanere privati.

## Progettazione {#design}

Questo non è un sistema pronto per la produzione, ma uno strumento didattico. Come tale, è stato scritto con diverse ipotesi semplificative.

- Gruppo di conti fisso. C'è un numero specifico di conti, e ogni conto appartiene a un indirizzo predeterminato. Questo rende il sistema molto più semplice perché è difficile gestire strutture di dati a dimensione variabile nelle prove a conoscenza-zero. Per un sistema pronto per la produzione, possiamo usare la [radice di Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) come hash di stato e fornire prove di Merkle per i saldi richiesti.

- Archiviazione in memoria. Su un sistema di produzione, dobbiamo scrivere tutti i saldi dei conti su disco per preservarli in caso di riavvio. Qui, va bene se le informazioni vengono semplicemente perse.

- Solo trasferimenti. Un sistema di produzione richiederebbe un modo per depositare asset nella banca e per prelevarli. Ma lo scopo qui è solo quello di illustrare il concetto, quindi questa banca è limitata ai trasferimenti.

### Prove a conoscenza-zero {#zero-knowledge-proofs}

A un livello fondamentale, una prova a conoscenza-zero mostra che il prover conosce alcuni dati, _Dati<sub>privati</sub>_ tali che esiste una relazione _Relazione_ tra alcuni dati pubblici, _Dati<sub>pubblici</sub>_, e _Dati<sub>privati</sub>_. Il verificatore conosce _Relazione_ e _Dati<sub>pubblici</sub>_.

Per preservare la privacy, abbiamo bisogno che gli stati e le transazioni siano privati. Ma per garantire l'integrità, abbiamo bisogno che l'[hash crittografico](https://en.wikipedia.org/wiki/Cryptographic_hash_function) degli stati sia pubblico. Per dimostrare a chi invia le transazioni che tali transazioni sono realmente avvenute, dobbiamo anche pubblicare gli hash delle transazioni.

Nella maggior parte dei casi, _Dati<sub>privati</sub>_ è l'input del programma della prova a conoscenza-zero e _Dati<sub>pubblici</sub>_ è l'output.

Questi campi in _Dati<sub>privati</sub>_:

- _Stato<sub>n</sub>_, il vecchio stato
- _Stato<sub>n+1</sub>_, il nuovo stato
- _Transazione_, una transazione che cambia dal vecchio stato a quello nuovo. Questa transazione deve includere questi campi:
  - _Indirizzo di destinazione_ che riceve il trasferimento
  - _Importo_ trasferito
  - _Nonce_ per garantire che ogni transazione possa essere elaborata una sola volta.
    L'indirizzo di origine non deve essere nella transazione, perché può essere recuperato dalla firma.
- _Firma_, una firma autorizzata a eseguire la transazione. Nel nostro caso, l'unico indirizzo autorizzato a eseguire una transazione è l'indirizzo di origine. Poiché il nostro sistema a conoscenza-zero funziona in questo modo, abbiamo bisogno anche della chiave pubblica del conto, oltre alla firma di Ethereum.

Questi sono i campi in _Dati<sub>pubblici</sub>_:

- _Hash(Stato<sub>n</sub>)_ l'hash del vecchio stato
- _Hash(Stato<sub>n+1</sub>)_ l'hash del nuovo stato
- _Hash(Transazione)_ l'hash della transazione che cambia lo stato da _Stato<sub>n</sub>_ a _Stato<sub>n+1</sub>_.

La relazione verifica diverse condizioni:

- Gli hash pubblici sono effettivamente gli hash corretti per i campi privati.
- La transazione, se applicata al vecchio stato, produce il nuovo stato.
- La firma proviene dall'indirizzo di origine della transazione.

A causa delle proprietà delle funzioni di hash crittografico, la dimostrazione di queste condizioni è sufficiente a garantire l'integrità.

### Strutture dei dati {#data-structures}

La struttura dati principale è lo stato detenuto dal server. Per ogni conto, il server tiene traccia del saldo del conto e di un [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce), utilizzato per prevenire [attacchi di replay](https://en.wikipedia.org/wiki/Replay_attack).

### Componenti {#components}

Questo sistema richiede due componenti:

- Il _server_ che riceve le transazioni, le elabora e pubblica gli hash sulla catena insieme alle prove a conoscenza-zero.
- Un _contratto intelligente_ che archivia gli hash e verifica le prove a conoscenza-zero per garantire che le transizioni di stato siano legittime.

### Flusso di dati e di controllo {#flows}

Questi sono i modi in cui i vari componenti comunicano per trasferire da un conto a un altro.

1. Un browser web invia una transazione firmata che richiede un trasferimento dal conto del firmatario a un conto diverso.

2. Il server verifica che la transazione sia valida:

   - Il firmatario ha un conto in banca con un saldo sufficiente.
   - Il destinatario ha un conto in banca.

3. Il server calcola il nuovo stato sottraendo l'importo trasferito dal saldo del firmatario e aggiungendolo al saldo del destinatario.

4. Il server calcola una prova a conoscenza-zero che il cambio di stato è valido.

5. Il server invia a Ethereum una transazione che include:

   - Il nuovo hash di stato
   - L'hash della transazione (in modo che il mittente della transazione possa sapere che è stata elaborata)
   - La prova a conoscenza-zero che dimostra che la transizione al nuovo stato è valida

6. Il contratto intelligente verifica la prova a conoscenza-zero.

7. Se la prova a conoscenza-zero risulta corretta, il contratto intelligente esegue queste azioni:
   - Aggiorna l'hash di stato corrente con il nuovo hash di stato
   - Emette una voce di registro con il nuovo hash di stato e l'hash della transazione

### Strumenti {#tools}

Per il codice lato client, useremo [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/) e [Wagmi](https://wagmi.sh/). Questi sono strumenti standard del settore; se non li conosci, puoi usare [questa guida](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

La maggior parte del server è scritta in JavaScript utilizzando [Node](https://nodejs.org/en). La parte a conoscenza-zero è scritta in [Noir](https://noir-lang.org/). Abbiamo bisogno della versione `1.0.0-beta.10`, quindi dopo aver [installato Noir come indicato](https://noir-lang.org/docs/getting_started/quick_start), esegui:

```
noirup -v 1.0.0-beta.10
```

La blockchain che usiamo è `anvil`, una blockchain di prova locale che fa parte di [Foundry](https://getfoundry.sh/introduction/installation).

## Implementazione {#implementation}

Dato che si tratta di un sistema complesso, lo implementeremo per fasi.

### Fase 1 - Conoscenza-zero manuale {#stage-1}

Per la prima fase, firmeremo una transazione nel browser e poi forniremo manualmente le informazioni alla prova a conoscenza-zero. Il codice a conoscenza-zero si aspetta di ricevere tali informazioni in `server/noir/Prover.toml` (documentato [qui](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)).

Per vederlo in azione:

1. Assicurati di aver installato [Node](https://nodejs.org/en/download) e [Noir](https://noir-lang.org/install). Preferibilmente, installali su un sistema UNIX come macOS, Linux o [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

2. Scarica il codice della fase 1 e avvia il server web per servire il codice client.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   Il motivo per cui hai bisogno di un server web qui è che, per prevenire certi tipi di frode, molti portafogli (come MetaMask) non accettano file serviti direttamente dal disco

3. Apri un browser con un portafoglio.

4. Nel portafoglio, inserisci una nuova passphrase. Nota che questo cancellerà la tua passphrase esistente, quindi _assicurati di averne un backup_.

   La passphrase è `test test test test test test test test test test test junk`, la passphrase di prova predefinita per anvil.

5. Vai al [codice lato client](http://localhost:5173/).

6. Connettiti al portafoglio e seleziona il conto di destinazione e l'importo.

7. Fai clic su **Firma** e firma la transazione.

8. Sotto l'intestazione **Prover.toml**, troverai del testo. Sostituisci `server/noir/Prover.toml` con quel testo.

9. Esegui la prova a conoscenza-zero.

   ```sh
   cd ../server/noir
   nargo execute
   ```

   L'output dovrebbe essere simile a

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. Confronta gli ultimi due valori con l'hash che vedi sul browser web per vedere se il messaggio è stato correttamente sottoposto ad hashing.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[Questo file](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) mostra il formato delle informazioni atteso da Noir.

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

Il messaggio è in formato testo, il che lo rende facile da capire per l'utente (cosa necessaria al momento della firma) e da analizzare per il codice Noir. L'importo è quotato in finney per consentire, da un lato, trasferimenti frazionari e, dall'altro, per essere facilmente leggibile. L'ultimo numero è il [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce).

La stringa è lunga 100 caratteri. Le prove a conoscenza-zero non gestiscono bene i dati di dimensione variabile, quindi è spesso necessario riempire i dati.

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

Questi tre parametri sono array di byte a dimensione fissa.

```toml
[[accounts]]
address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
balance=100_000
nonce=0

[[accounts]]
address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
balance=100_000
nonce=0
```

Questo è il modo di specificare un array di strutture. Per ogni voce, specifichiamo l'indirizzo, il saldo (in milliETH, alias [finney](https://cryptovalleyjournal.com/glossary/finney/)) e il valore nonce successivo.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[Questo file](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) implementa l'elaborazione lato client e genera il file `server/noir/Prover.toml` (quello che include i parametri a conoscenza-zero).

Ecco la spiegazione delle parti più interessanti.

```tsx
export default attrs =>  {
```

Questa funzione crea il componente React `Transfer`, che altri file possono importare.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

Questi sono gli indirizzi dei conti, gli indirizzi creati dalla passphrase `test ...` `test junk`. Se vuoi usare i tuoi indirizzi, basta modificare questa definizione.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

Questi [hook di Wagmi](https://wagmi.sh/react/api/hooks) ci consentono di accedere alla libreria [viem](https://viem.sh/) e al portafoglio.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

Questo è il messaggio, riempito con spazi. Ogni volta che una delle variabili di [`useState`](https://react.dev/reference/react/useState) cambia, il componente viene ridisegnato e `message` viene aggiornato.

```tsx
  const sign = async () => {
```

Questa funzione viene chiamata quando l'utente fa clic sul pulsante **Firma**. Il messaggio viene aggiornato automaticamente, ma la firma richiede l'approvazione dell'utente nel portafoglio e non vogliamo chiederla se non è necessario.

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

Chiedi al portafoglio di [firmare il messaggio](https://viem.sh/docs/accounts/local/signMessage).

```tsx
    const hash = hashMessage(message)
```

Ottieni l'hash del messaggio. È utile fornirlo all'utente per il debug (del codice Noir).

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[Ottieni la chiave pubblica](https://viem.sh/docs/utilities/recoverPublicKey). Ciò è richiesto per la funzione [`ecrecover` di Noir](https://github.com/colinnielsen/ecrecover-noir).

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

Imposta le variabili di stato. In questo modo si ridisegna il componente (dopo l'uscita della funzione `sign`) e si mostrano all'utente i valori aggiornati.

```tsx
    let proverToml = `
```

Il testo per `Prover.toml`.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem ci fornisce la chiave pubblica come una stringa esadecimale di 65 byte. Il primo byte è `0x04`, un marcatore di versione. Questo è seguito da 32 byte per la `x` della chiave pubblica e poi da 32 byte per la `y` della chiave pubblica.

Tuttavia, Noir si aspetta di ricevere queste informazioni come due array di byte, uno per `x` e uno per `y`. È più facile analizzarlo qui sul client piuttosto che come parte della prova a conoscenza-zero.

Nota che questa è una buona pratica nella conoscenza-zero in generale. Il codice all'interno di una prova a conoscenza-zero è costoso, quindi qualsiasi elaborazione che può essere fatta al di fuori della prova a conoscenza-zero _dovrebbe_ essere fatta al di fuori della prova a conoscenza-zero.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

Anche la firma viene fornita come stringa esadecimale di 65 byte. Tuttavia, l'ultimo byte è necessario solo per recuperare la chiave pubblica. Dato che la chiave pubblica sarà già fornita al codice Noir, non ne abbiamo bisogno per verificare la firma, e il codice Noir non la richiede.

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

Fornisci i conti.

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Trasferimento</h2>
```

Questo è il formato HTML (più precisamente, [JSX](https://react.dev/learn/writing-markup-with-jsx)) del componente.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[Questo file](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) è il codice effettivo a conoscenza-zero.

```
use std::hash::pedersen_hash;
```

L'[Hash di Pedersen](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) è fornito con la [libreria standard di Noir](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash). Le prove a conoscenza-zero usano comunemente questa funzione di hash. È molto più facile da calcolare all'interno di [circuiti aritmetici](https://rareskills.io/post/arithmetic-circuit) rispetto alle funzioni di hash standard.

```
use keccak256::keccak256;
use dep::ecrecover;
```

Queste due funzioni sono librerie esterne, definite in [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml). Sono esattamente ciò per cui sono state nominate: una funzione che calcola l'[hash keccak256](https://emn178.github.io/online-tools/keccak_256.html) e una funzione che verifica le firme di Ethereum e recupera l'indirizzo Ethereum del firmatario.

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir si ispira a [Rust](https://www.rust-lang.org/). Le variabili, per impostazione predefinita, sono costanti. Questo è il modo in cui definiamo le costanti di configurazione globali. In particolare, `ACCOUNT_NUMBER` è il numero di conti che archiviamo.

I tipi di dati denominati `u<numero>` sono quel numero di bit, senza segno. Gli unici tipi supportati sono `u8`, `u16`, `u32`, `u64` e `u128`.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

Questa variabile viene utilizzata per l'hash di Pedersen dei conti, come spiegato di seguito.

```
global MESSAGE_LENGTH : u32 = 100;
```

Come spiegato sopra, la lunghezza del messaggio è fissa. È specificata qui.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

Le [firme EIP-191](https://eips.ethereum.org/EIPS/eip-191) richiedono un buffer con un prefisso di 26 byte, seguito dalla lunghezza del messaggio in ASCII e, infine, dal messaggio stesso.

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

Le informazioni che archiviamo su un conto. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) è un numero, tipicamente fino a 253 bit, che può essere usato direttamente nel [circuito aritmetico](https://rareskills.io/post/arithmetic-circuit) che implementa la prova a conoscenza-zero. Qui usiamo `Field` per archiviare un indirizzo Ethereum a 160 bit.

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

Le informazioni che archiviamo per una transazione di trasferimento.

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

Una definizione di funzione. Il parametro è l'informazione `Account`. Il risultato è un array di variabili `Field`, la cui lunghezza è `FLAT_ACCOUNT_FIELDS`

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

Il primo valore nell'array è l'indirizzo del conto. Il secondo include sia il saldo che il nonce. Le chiamate a `.into()` cambiano un numero nel tipo di dati che deve essere. `account.nonce` è un valore `u32`, ma per aggiungerlo a `account.balance << 32`, un valore `u128`, deve essere un `u128`. Questo è il primo `.into()`. Il secondo converte il risultato `u128` in un `Field` in modo che si adatti all'array.

```
    flat
}
```

In Noir, le funzioni possono restituire un valore solo alla fine (non c'è un ritorno anticipato). Per specificare il valore di ritorno, lo si valuta appena prima della parentesi di chiusura della funzione.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

Questa funzione trasforma l'array di conti in un array di `Field`, che può essere usato come input per un Hash di Petersen.

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

Questo è il modo in cui si specifica una variabile mutabile, cioè _non_ una costante. Le variabili in Noir devono sempre avere un valore, quindi inizializziamo questa variabile a tutti zeri.

```
    for i in 0..ACCOUNT_NUMBER {
```

Questo è un ciclo `for`. Nota che i limiti sono costanti. I cicli di Noir devono avere i loro limiti noti al momento della compilazione. Il motivo è che i circuiti aritmetici non supportano il controllo di flusso. Quando elabora un ciclo `for`, il compilatore semplicemente inserisce il codice al suo interno più volte, una per ogni iterazione.

```
        let fields = flatten_account(accounts[i]);
        for j in 0..FLAT_ACCOUNT_FIELDS {
            flat[i*FLAT_ACCOUNT_FIELDS + j] = fields[j];
        }
    }

    flat
}

fn hash_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> Field {
    pedersen_hash(flatten_accounts(accounts))
}
```

Finalmente, siamo arrivati alla funzione che calcola l'hash dell'array di conti.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

Questa funzione trova il conto con un indirizzo specifico. Questa funzione sarebbe terribilmente inefficiente nel codice standard perché itera su tutti i conti, anche dopo aver trovato l'indirizzo.

Tuttavia, nelle prove a conoscenza-zero, non c'è controllo di flusso. Se mai avessimo bisogno di verificare una condizione, dobbiamo verificarla ogni volta.

Una cosa simile accade con le istruzioni `if`. L'istruzione `if` nel ciclo sopra è tradotta in queste istruzioni matematiche.

_risultato<sub>condizione</sub> = accounts[i].address == address_ // uno se sono uguali, zero altrimenti

_conto<sub>nuovo</sub> = risultato<sub>condizione</sub>\*i + (1-risultato<sub>condizione</sub>)\*conto<sub>vecchio</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} non ha un conto");

    account
}
```

La funzione [`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) fa sì che la prova a conoscenza-zero si blocchi se l'asserzione è falsa. In questo caso, se non riusciamo a trovare un conto con l'indirizzo pertinente. Per segnalare l'indirizzo, usiamo una [stringa di formato](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings).

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

Questa funzione applica una transazione di trasferimento e restituisce il nuovo array di conti.

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

Non possiamo accedere agli elementi della struttura all'interno di una stringa di formato in Noir, quindi creiamo una copia utilizzabile.

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} non ha {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"La transazione ha nonce {txnNonce}, ma ci si aspetta che il conto usi {accountNonce}");
```

Queste sono due condizioni che potrebbero rendere una transazione non valida.

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

Crea il nuovo array di conti e poi restituiscilo.

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

Questa funzione legge l'indirizzo dal messaggio.

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

L'indirizzo è sempre lungo 20 byte (alias 40 cifre esadecimali), e inizia al carattere #7.

```rust
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 {    // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 {   // a-f
            result += (messageBytes[i]-97+10).into()
        }        
    }    

    result
}

fn readAmountAndNonce(messageBytes: [u8; MESSAGE_LENGTH]) -> (u128, u32)
```

Leggi l'importo e il nonce dal messaggio.

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

Nel messaggio, il primo numero dopo l'indirizzo è l'importo in finney (alias millesimo di un ETH) da trasferire. Il secondo numero è il nonce. Qualsiasi testo tra di loro viene ignorato.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // L'abbiamo appena trovato
                stillReadingNonce = true;
                lookingForNonce = false;
            }

            if stillReadingNonce {
                nonce = nonce*10 + digit.into();
            }
        } else {
            if stillReadingAmount {
                stillReadingAmount = false;
                lookingForNonce = true;
            }
            if stillReadingNonce {
                stillReadingNonce = false;
            }
        }
    }

    (amount, nonce)
}
```

Restituire una [tupla](https://noir-lang.org/docs/noir/concepts/data_types/tuples) è il modo di Noir per restituire più valori da una funzione.

```rust
fn readTransferTxn(message: str<MESSAGE_LENGTH>) -> TransferTxn 
{
    let mut txn: TransferTxn = TransferTxn { from: 0, to: 0, amount:0, nonce:0 };
    let messageBytes = message.as_bytes();

    txn.to = readAddress(messageBytes);
    let (amount, nonce) = readAmountAndNonce(messageBytes);
    txn.amount = amount;
    txn.nonce = nonce;

    txn
}
```

Questa funzione converte il messaggio in byte, quindi converte gli importi in una `TransferTxn`.

```rust
// L'equivalente di hashMessage di Viem
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

Siamo stati in grado di utilizzare l'Hash di Pedersen per i conti perché vengono sottoposti a hashing solo all'interno della prova a conoscenza-zero. Tuttavia, in questo codice dobbiamo controllare la firma del messaggio, che viene generata dal browser. Per questo, dobbiamo seguire il formato di firma di Ethereum in [EIP 191](https://eips.ethereum.org/EIPS/eip-191). Ciò significa che dobbiamo creare un buffer combinato con un prefisso standard, la lunghezza del messaggio in ASCII e il messaggio stesso, e utilizzare lo standard Ethereum keccak256 per calcolarne l'hash.

```rust
    // Prefisso ASCII
    let prefix_bytes = [
        0x19, // \x19
        0x45, // 'E'
        0x74, // 't'
        0x68, // 'h'
        0x65, // 'e'
        0x72, // 'r'
        0x65, // 'e'
        0x75, // 'u'
        0x6D, // 'm'
        0x20, // ' '
        0x53, // 'S'
        0x69, // 'i'
        0x67, // 'g'
        0x6E, // 'n'
        0x65, // 'e'
        0x64, // 'd'
        0x20, // ' '
        0x4D, // 'M'
        0x65, // 'e'
        0x73, // 's'
        0x73, // 's'
        0x61, // 'a'
        0x67, // 'g'
        0x65, // 'e'
        0x3A, // ':'
        0x0A  // '\n'
    ];
```

Per evitare i casi in cui un'applicazione chiede all'utente di firmare un messaggio che può essere usato come transazione o per qualche altro scopo, l'EIP 191 specifica che tutti i messaggi firmati iniziano con il carattere 0x19 (non un carattere ASCII valido) seguito da `Ethereum Signed Message:` e da un a capo.

```rust
    let mut buffer: [u8; HASH_BUFFER_SIZE] = [0u8; HASH_BUFFER_SIZE];
    for i in 0..26 {
        buffer[i] = prefix_bytes[i];
    }

    let messageBytes : [u8; MESSAGE_LENGTH] = message.as_bytes();

    if MESSAGE_LENGTH <= 9 {
        for i in 0..1 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+1] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 10 & MESSAGE_LENGTH <= 99 {
        for i in 0..2 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+2] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 100 {
        for i in 0..3 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+3] = messageBytes[i];
        }
    }

    assert(MESSAGE_LENGTH < 1000, "I messaggi la cui lunghezza supera le tre cifre non sono supportati");
```

Gestisci lunghezze di messaggio fino a 999 e fallisci se è maggiore. Ho aggiunto questo codice, anche se la lunghezza del messaggio è una costante, perché rende più facile cambiarlo. Su un sistema di produzione, probabilmente si darebbe per scontato che `MESSAGE_LENGTH` non cambi, per ottenere prestazioni migliori.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

Usa la funzione standard di Ethereum `keccak256`.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // indirizzo, primi 16 byte dell'hash, ultimi 16 byte dell'hash        
{
```

Questa funzione verifica la firma, che richiede l'hash del messaggio. Poi ci fornisce l'indirizzo che l'ha firmato e l'hash del messaggio. L'hash del messaggio è fornito in due valori `Field` perché sono più facili da usare nel resto del programma rispetto a un array di byte.

Dobbiamo usare due valori `Field` perché i calcoli dei campi sono fatti [modulo](https://en.wikipedia.org/wiki/Modulo) un numero grande, ma quel numero è tipicamente inferiore a 256 bit (altrimenti sarebbe difficile eseguire quei calcoli nell'EVM).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

Specifica `hash1` e `hash2` come variabili mutabili e scrivi l'hash in esse byte per byte.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```

È simile a [`ecrecover` di Solidity](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions), con due importanti differenze:

- Se la firma non è valida, la chiamata fallisce un `assert` e il programma viene interrotto.
- Anche se la chiave pubblica può essere recuperata dalla firma e dall'hash, si tratta di un'elaborazione che può essere eseguita esternamente e, quindi, non vale la pena di eseguirla all'interno della prova a conoscenza-zero. Se qualcuno cerca di imbrogliarci qui, la verifica della firma fallirà.

```rust
        hash1,
        hash2
    )
}

fn main(
        accounts: [Account; ACCOUNT_NUMBER],
        message: str<MESSAGE_LENGTH>,
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64],
    ) -> pub (
        Field,  // Hash del vecchio array di conti
        Field,  // Hash del nuovo array di conti
        Field,  // Primi 16 byte dell'hash del messaggio
        Field,  // Ultimi 16 byte dell'hash del messaggio
    )
```

Finalmente, raggiungiamo la funzione `main`. Dobbiamo dimostrare di avere una transazione che cambia validamente l'hash dei conti dal vecchio valore a quello nuovo. Dobbiamo anche dimostrare che ha questo specifico hash di transazione, in modo che la persona che l'ha inviata sappia che la sua transazione è stata elaborata.

```rust
{
    let mut txn = readTransferTxn(message);
```

Abbiamo bisogno che `txn` sia mutabile perché non leggiamo l'indirizzo di provenienza dal messaggio, lo leggiamo dalla firma.

```rust
    let (fromAddress, txnHash1, txnHash2) = signatureToAddressAndHash(
        message,
        pubKeyX,
        pubKeyY,
        signature);

    txn.from = fromAddress;

    let newAccounts = apply_transfer_txn(accounts, txn);

    (
        hash_accounts(accounts),
        hash_accounts(newAccounts),
        txnHash1,
        txnHash2
    )
}
```

### Fase 2 - Aggiunta di un server {#stage-2}

Nella seconda fase, aggiungiamo un server che riceve e implementa le transazioni di trasferimento dal browser.

Per vederlo in azione:

1. Interrompi Vite se è in esecuzione.

2. Scarica il branch che include il server e assicurati di avere tutti i moduli necessari.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Non è necessario compilare il codice Noir, è lo stesso codice che hai usato per la fase 1.

3. Avvia il server.

   ```sh
   npm run start
   ```

4. In una finestra a riga di comando separata, esegui Vite per servire il codice del browser.

   ```sh
   cd client
   npm run dev
   ```

5. Vai al codice client su [http://localhost:5173](http://localhost:5173)

6. Prima di poter emettere una transazione, devi conoscere il nonce e l'importo che puoi inviare. Per ottenere queste informazioni, fai clic su **Aggiorna dati conto** e firma il messaggio.

   Abbiamo un dilemma qui. Da un lato, non vogliamo firmare un messaggio che possa essere riutilizzato (un [attacco di replay](https://en.wikipedia.org/wiki/Replay_attack)), motivo per cui vogliamo un nonce in primo luogo. Tuttavia, non abbiamo ancora un nonce. La soluzione è scegliere un nonce che possa essere usato una sola volta e che abbiamo già da entrambe le parti, come l'ora corrente.

   Il problema di questa soluzione è che l'ora potrebbe non essere perfettamente sincronizzata. Quindi, invece, firmiamo un valore che cambia ogni minuto. Ciò significa che la nostra finestra di vulnerabilità agli attacchi di replay è al massimo di un minuto. Considerando che in produzione la richiesta firmata sarà protetta da TLS e che l'altra parte del tunnel, il server, può già divulgare il saldo e il nonce (deve conoscerli per funzionare), questo è un rischio accettabile.

7. Una volta che il browser riceve il saldo e il nonce, mostra il modulo di trasferimento. Seleziona l'indirizzo di destinazione e l'importo e fai clic su **Trasferisci**. Firma questa richiesta.

8. Per vedere il trasferimento, **aggiorna i dati del conto** o guarda nella finestra in cui esegui il server. Il server registra lo stato ogni volta che cambia.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start
    
    > server@1.0.0 start
    > node --experimental-json-modules index.mjs
    
    In ascolto sulla porta 3000
    Transazione send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0 elaborata
    Nuovo stato:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 ha 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 ha 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC ha 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 ha 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 ha 100000 (0)
    Transazione send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1 elaborata
    Nuovo stato:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 ha 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 ha 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC ha 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 ha 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 ha 100000 (0)
    Transazione send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2 elaborata
    Nuovo stato:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 ha 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 ha 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC ha 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 ha 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 ha 100000 (0)
    ```

#### `server/index.mjs` {#server-index-mjs-1}

[Questo file](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) contiene il processo del server e interagisce con il codice Noir in [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr). Ecco una spiegazione delle parti interessanti.

```js
import { Noir } from '@noir-lang/noir_js'
```

La libreria [noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) funge da interfaccia tra il codice JavaScript e il codice Noir.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

Carica il circuito aritmetico, il programma Noir compilato che abbiamo creato nella fase precedente, e preparati a eseguirlo.

```js
// Forniamo le informazioni sul conto solo in risposta a una richiesta firmata
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

Per fornire le informazioni sul conto, abbiamo bisogno solo della firma. Il motivo è che sappiamo già quale sarà il messaggio, e quindi l'hash del messaggio.

```js
const processMessage = async (message, signature) => {
```

Elabora un messaggio ed esegui la transazione che codifica.

```js
    // Ottieni la chiave pubblica
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

Ora che eseguiamo JavaScript sul server, possiamo recuperare la chiave pubblica lì piuttosto che sul client.

```js
    let noirResult
    try {
        noirResult = await noir.execute({
            message,
            signature: signature.slice(2,-2).match(/.{2}/g).map(x => `0x${x}`),
            pubKeyX,
            pubKeyY,
            accounts: Accounts
        })
```

`noir.execute` esegue il programma Noir. I parametri sono equivalenti a quelli forniti in [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml). Nota che i valori lunghi vengono forniti come un array di stringhe esadecimali (`["0x60", "0xA7"]`), non come un singolo valore esadecimale (`0x60A7`), come fa Viem.

```js
    } catch (err) {
        console.log(`Errore Noir: ${err}`)
        throw Error("Transazione non valida, non elaborata")
    }
```

Se c'è un errore, catturalo e poi inoltra una versione semplificata al client.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

Applica la transazione. L'abbiamo già fatto nel codice Noir, ma è più facile farlo di nuovo qui piuttosto che estrarre il risultato da lì.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

La struttura iniziale di `Accounts`.

### Fase 3 - Contratti intelligenti di Ethereum {#stage-3}

1. Interrompi i processi del server e del client.

2. Scarica il branch con i contratti intelligenti e assicurati di avere tutti i moduli necessari.

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Esegui `anvil` in una finestra a riga di comando separata.

4. Genera la chiave di verifica e il verificatore di solidità, quindi copia il codice del verificatore nel progetto Solidity.

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. Vai ai contratti intelligenti e imposta le variabili d'ambiente per usare la blockchain `anvil`.

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. Distribuisci `Verifier.sol` e memorizza l'indirizzo in una variabile d'ambiente.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. Distribuisci il contratto `ZkBank`.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   Il valore `0x199..67b` è l'hash di Pederson dello stato iniziale di `Accounts`. Se modifichi questo stato iniziale in `server/index.mjs`, puoi eseguire una transazione per vedere l'hash iniziale riportato dalla prova a conoscenza-zero.

8. Esegui il server.

   ```sh
   cd ../server
   npm run start
   ```

9. Esegui il client in una finestra a riga di comando diversa.

   ```sh
   cd client
   npm run dev
   ```

10. Esegui alcune transazioni.

11. Per verificare che lo stato sia cambiato sulla catena, riavvia il processo del server. Vedi che `ZkBank` non accetta più transazioni, perché il valore hash originale nelle transazioni differisce dal valore hash archiviato sulla catena.

    Questo è il tipo di errore previsto.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    In ascolto sulla porta 3000
    Errore di verifica: ContractFunctionExecutionError: La funzione del contratto "processTransaction" è stata ripristinata per il seguente motivo:
    Hash dello stato precedente errato

    Chiamata del contratto:
        address:   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        function:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        args:                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000)
    ```

#### `server/index.mjs` {#server-index-mjs-2}

Le modifiche in questo file si riferiscono principalmente alla creazione della prova effettiva e alla sua presentazione sulla catena.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

Dobbiamo usare [il pacchetto Barretenberg](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) per creare la prova effettiva da inviare sulla catena. Possiamo usare questo pacchetto sia eseguendo l'interfaccia a riga di comando (`bb`) sia usando la [libreria JavaScript, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js). La libreria JavaScript è molto più lenta dell'esecuzione di codice nativo, quindi qui usiamo [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) per usare la riga di comando.

Nota che se decidi di usare `bb.js`, devi usare una versione compatibile con la versione di Noir che stai usando. Al momento della stesura, l'attuale versione di Noir (1.0.0-beta.11) utilizza la versione 0.87 di `bb.js`.

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

L'indirizzo qui è quello che si ottiene quando si inizia con un `anvil` pulito e si seguono le indicazioni sopra.

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

Questa chiave privata è uno dei conti pre-finanziati predefiniti in `anvil`.

```js
const generateProof = async (witness, fileID) => {
```

Genera una prova usando l'eseguibile `bb`.

```js
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

Scrivi la testimonianza in un file.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

Crea effettivamente la prova. Questo passaggio crea anche un file con le variabili pubbliche, ma non ne abbiamo bisogno. Abbiamo già ottenuto quelle variabili da `noir.execute`.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

La prova è un array JSON di valori `Field`, ognuno rappresentato come valore esadecimale. Tuttavia, dobbiamo inviarlo nella transazione come un singolo valore `bytes`, che Viem rappresenta con una grande stringa esadecimale. Qui cambiamo il formato concatenando tutti i valori, rimuovendo tutti gli `0x` e aggiungendone uno alla fine.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

Pulisci e restituisci la prova.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

I campi pubblici devono essere un array di valori a 32 byte. Tuttavia, poiché abbiamo dovuto dividere l'hash della transazione tra due valori `Field`, appare come un valore a 16 byte. Qui aggiungiamo zeri in modo che Viem capisca che sono effettivamente 32 byte.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

Ogni indirizzo utilizza ogni nonce una sola volta, quindi possiamo utilizzare una combinazione di `fromAddress` e `nonce` come identificatore univoco per il file di testimonianza e la directory di output.

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Errore di verifica: ${err}`)
        throw Error("Impossibile verificare la transazione sulla catena")
    }
    .
    .
    .
}
```

Invia la transazione alla catena.

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

Questo è il codice sulla catena che riceve la transazione.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.21;

import {HonkVerifier} from "./Verifier.sol";

contract ZkBank {
    HonkVerifier immutable myVerifier;
    bytes32 currentStateHash;

    constructor(address _verifierAddress, bytes32 _initialStateHash) {
        currentStateHash = _initialStateHash;
        myVerifier = HonkVerifier(_verifierAddress);
    }
```

Il codice sulla catena deve tenere traccia di due variabili: il verificatore (un contratto separato creato da `nargo`) e l'hash dello stato corrente.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

Ogni volta che lo stato cambia, emettiamo un evento `TransactionProcessed`.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

Questa funzione elabora le transazioni. Ottiene la prova (come `bytes`) e gli input pubblici (come array `bytes32`), nel formato richiesto dal verificatore (per minimizzare l'elaborazione sulla catena e quindi i costi del gas).

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Hash dello stato precedente errato");
```

La prova a conoscenza-zero deve essere che la transazione cambia dal nostro hash corrente a uno nuovo.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

Chiama il contratto del verificatore per verificare la prova a conoscenza-zero. Questo passaggio annulla la transazione se la prova a conoscenza-zero è sbagliata.

```solidity
        currentStateHash = _publicFields[1];

        emit TransactionProcessed(
            _publicFields[2]<<128 | _publicFields[3],
            _publicFields[0],
            _publicFields[1]
        );
    }
}
```

Se tutto è corretto, aggiorna l'hash di stato al nuovo valore ed emetti un evento `TransactionProcessed`.

## Abusi da parte del componente centralizzato {#abuses}

La sicurezza delle informazioni è composta da tre attributi:

- _Riservatezza_, gli utenti non possono leggere informazioni che non sono autorizzati a leggere.
- _Integrità_, le informazioni non possono essere modificate se non da utenti autorizzati e in modo autorizzato.
- _Disponibilità_, gli utenti autorizzati possono usare il sistema.

In questo sistema, l'integrità è fornita tramite prove a conoscenza-zero. La disponibilità è molto più difficile da garantire, e la riservatezza è impossibile, perché la banca deve conoscere il saldo di ogni conto e tutte le transazioni. Non c'è modo di impedire a un'entità che ha informazioni di condividerle.

Potrebbe essere possibile creare una banca veramente confidenziale utilizzando [indirizzi stealth](https://vitalik.eth.limo/general/2023/01/20/stealth.html), ma questo va oltre lo scopo di questo articolo.

### Informazioni false {#false-info}

Un modo in cui il server può violare l'integrità è fornire informazioni false quando [vengono richiesti i dati](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291).

Per risolvere questo problema, possiamo scrivere un secondo programma Noir che riceve i conti come input privato e l'indirizzo per cui si richiedono informazioni come input pubblico. L'output è il saldo e il nonce di quell'indirizzo, e l'hash dei conti.

Naturalmente, questa prova non può essere verificata sulla catena, perché non vogliamo pubblicare nonce e saldi sulla catena. Tuttavia, può essere verificato dal codice client in esecuzione nel browser.

### Transazioni forzate {#forced-txns}

Il meccanismo usuale per garantire la disponibilità e prevenire la censura sugli L2 sono le [transazioni forzate](https://docs.optimism.io/stack/transactions/forced-transaction). Ma le transazioni forzate non si combinano con le prove a conoscenza-zero. Il server è l'unica entità che può verificare le transazioni.

Possiamo modificare `smart-contracts/src/ZkBank.sol` per accettare transazioni forzate e impedire al server di cambiare lo stato finché non vengono elaborate. Tuttavia, questo ci espone a un semplice attacco di negazione del servizio. E se una transazione forzata non è valida e quindi impossibile da elaborare?

La soluzione è avere una prova a conoscenza-zero che una transazione forzata non è valida. Questo dà al server tre opzioni:

- Elaborare la transazione forzata, fornendo una prova a conoscenza-zero che è stata elaborata e il nuovo hash di stato.
- Rifiutare la transazione forzata e fornire una prova a conoscenza-zero al contratto che la transazione non è valida (indirizzo sconosciuto, nonce errato o saldo insufficiente).
- Ignorare la transazione forzata. Non c'è modo di forzare il server a elaborare effettivamente la transazione, ma ciò significa che l'intero sistema non è disponibile.

#### Obbligazioni di disponibilità {#avail-bonds}

In un'implementazione reale, ci sarebbe probabilmente una sorta di incentivo al profitto per mantenere il server in funzione. Possiamo rafforzare questo incentivo facendo sì che il server pubblichi un'obbligazione di disponibilità che chiunque può bruciare se una transazione forzata non viene elaborata entro un certo periodo.

### Codice Noir errato {#bad-noir-code}

Normalmente, per ottenere la fiducia delle persone in un contratto intelligente, carichiamo il codice sorgente su un [esploratore di blocchi](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract). Tuttavia, nel caso delle prove a conoscenza-zero, ciò è insufficiente.

`Verifier.sol` contiene la chiave di verifica, che è una funzione del programma Noir. Tuttavia, quella chiave non ci dice quale fosse il programma Noir. Per avere effettivamente una soluzione affidabile, è necessario caricare il programma Noir (e la versione che lo ha creato). Altrimenti, le prove a conoscenza-zero potrebbero riflettere un programma diverso, uno con una backdoor.

Finché gli esploratori di blocchi non ci permetteranno di caricare e verificare i programmi Noir, dovresti farlo da solo (preferibilmente su [IPFS](/developers/tutorials/ipfs-decentralized-ui/)). Poi gli utenti sofisticati potranno scaricare il codice sorgente, compilarlo da soli, creare `Verifier.sol` e verificare che sia identico a quello sulla catena.

## Conclusione {#conclusion}

Le applicazioni di tipo Plasma richiedono un componente centralizzato come archivio di informazioni. Questo apre potenziali vulnerabilità ma, in cambio, ci permette di preservare la privacy in modi non disponibili sulla blockchain stessa. Con le prove a conoscenza-zero possiamo garantire l'integrità e possibilmente rendere economicamente vantaggioso per chiunque gestisca il componente centralizzato il mantenimento della disponibilità.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).

## Riconoscimenti {#acknowledgements}

- Josh Crites ha letto una bozza di questo articolo e mi ha aiutato con un problema spinoso di Noir.

Eventuali errori rimanenti sono di mia responsabilità.
