---
title: Account di Ethereum
description: "Una spiegazione degli account di Ethereum: le loro strutture dati e la loro relazione con la crittografia a coppie di chiavi."
lang: it
---

Un account di [Ethereum](/) è un'entità con un saldo in ether (ETH) che può inviare messaggi su Ethereum. Gli account possono essere controllati dagli utenti o distribuiti come smart contract.

## Prerequisiti {#prerequisites}

Per aiutarti a comprendere meglio questa pagina, ti consigliamo di leggere prima la nostra [introduzione a Ethereum](/developers/docs/intro-to-ethereum/).

## Tipi di account {#types-of-account}

Ethereum ha due tipi di account:

- Account di proprietà esterna (EOA) – controllato da chiunque possieda le chiavi private
- Account di contratto – uno smart contract distribuito sulla rete, controllato dal codice. Scopri di più sugli [smart contract](/developers/docs/smart-contracts/)

Entrambi i tipi di account hanno la capacità di:

- Ricevere, detenere e inviare ETH e token
- Interagire con gli smart contract distribuiti

### Differenze chiave {#key-differences}

**Di proprietà esterna**

- La creazione di un account non costa nulla
- Può avviare transazioni
- Le transazioni tra account di proprietà esterna possono essere solo trasferimenti di ETH/token
- Composto da una coppia di chiavi crittografiche: chiavi pubbliche e private che controllano le attività dell'account

**Di contratto**

- La creazione di un contratto ha un costo perché si utilizza l'archiviazione di rete
- Può inviare messaggi solo in risposta alla ricezione di una transazione
- Le transazioni da un account esterno a un account di contratto possono attivare codice che può eseguire molte azioni diverse, come il trasferimento di token o persino la creazione di un nuovo contratto
- Gli account di contratto non hanno chiavi private. Sono invece controllati dalla logica del codice dello smart contract

## Analisi di un account {#an-account-examined}

Gli account di Ethereum hanno quattro campi:

- `nonce` – Un contatore che indica il numero di transazioni inviate da un account di proprietà esterna o il numero di contratti creati da un account di contratto. Per ogni account può essere eseguita solo una transazione con un dato nonce, proteggendo dagli attacchi di replay in cui le transazioni firmate vengono ripetutamente trasmesse e rieseguite.
- `balance` – Il numero di Wei posseduti da questo indirizzo. Il Wei è una denominazione di ETH e ci sono 1e+18 Wei per ETH.
- `codeHash` – Questo hash si riferisce al _codice_ di un account sulla macchina virtuale di Ethereum (EVM). Gli account di contratto hanno frammenti di codice programmati al loro interno che possono eseguire diverse operazioni. Questo codice EVM viene eseguito se l'account riceve una chiamata di messaggio. Non può essere modificato, a differenza degli altri campi dell'account. Tutti questi frammenti di codice sono contenuti nel database di stato sotto i loro hash corrispondenti per un successivo recupero. Questo valore di hash è noto come codeHash. Per gli account di proprietà esterna, il campo codeHash è l'hash di una stringa vuota.
- `storageRoot` – A volte noto come hash di archiviazione. Un hash a 256 bit del nodo radice di un [Merkle Patricia Trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/) che codifica i contenuti di archiviazione dell'account (una mappatura tra valori interi a 256 bit), codificato nel trie come una mappatura dall'hash Keccak-256 delle chiavi intere a 256 bit ai valori interi a 256 bit codificati in RLP. Questo trie codifica l'hash dei contenuti di archiviazione di questo account ed è vuoto per impostazione predefinita.

![A diagram showing the make up of an account](./accounts.png)
_Diagramma adattato da [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Account di proprietà esterna e coppie di chiavi {#externally-owned-accounts-and-key-pairs}

Un account è composto da una coppia di chiavi crittografiche: pubblica e privata. Aiutano a dimostrare che una transazione è stata effettivamente firmata dal mittente e prevengono le falsificazioni. La tua chiave privata è ciò che usi per firmare le transazioni, quindi ti garantisce la custodia dei fondi associati al tuo account. Non detieni mai realmente criptovaluta, detieni chiavi private: i fondi sono sempre sul registro di Ethereum.

Questo impedisce ad attori malintenzionati di trasmettere transazioni false perché puoi sempre verificare il mittente di una transazione.

Se Alice vuole inviare ether dal proprio account all'account di Bob, Alice deve creare una richiesta di transazione e inviarla alla rete per la verifica. L'uso della crittografia a chiave pubblica da parte di Ethereum garantisce che Alice possa dimostrare di aver originariamente avviato la richiesta di transazione. Senza meccanismi crittografici, un avversario malintenzionato, Eve, potrebbe semplicemente trasmettere pubblicamente una richiesta simile a "invia 5 ETH dall'account di Alice all'account di Eve" e nessuno sarebbe in grado di verificare che non provenga da Alice.

## Creazione dell'account {#account-creation}

Quando desideri creare un account, la maggior parte delle librerie genererà per te una chiave privata casuale.

Una chiave privata è composta da 64 caratteri esadecimali e può essere crittografata con una password.

Esempio:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

La chiave pubblica viene generata dalla chiave privata utilizzando l'[Algoritmo per la firma digitale a curva ellittica](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) (Elliptic Curve Digital Signature Algorithm). Ottieni un indirizzo pubblico per il tuo account prendendo gli ultimi 20 byte dell'hash Keccak-256 della chiave pubblica e aggiungendo `0x` all'inizio.

Ciò significa che un account di proprietà esterna (EOA) ha un indirizzo di 42 caratteri (segmento di 20 byte che corrisponde a 40 caratteri esadecimali più il prefisso `0x`).

Esempio:

`0x5e97870f263700f46aa00d967821199b9bc5a120`

L'esempio seguente mostra come utilizzare uno strumento di firma chiamato [Clef](https://geth.ethereum.org/docs/tools/clef/introduction) per generare un nuovo account. Clef è uno strumento di gestione degli account e di firma fornito in bundle con il client Ethereum, [Geth](https://geth.ethereum.org). Il comando `clef newaccount` crea una nuova coppia di chiavi e le salva in un keystore crittografato.

```
> clef newaccount --keystore <path>

Inserisci una password per il nuovo account da creare:
> <password>

------------
INFO [10-28|16:19:09.156] La tua nuova chiave è stata generata       address=0x5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Esegui il backup del tuo file chiave      path=/home/user/go-ethereum/data/keystore/UTC--2022-10-28T15-19-08.000825927Z--5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Ricorda la tua password!
Account generato 0x5e97870f263700f46aa00d967821199b9bc5a120
```

[Documentazione di Geth](https://geth.ethereum.org/docs)

È possibile derivare nuove chiavi pubbliche dalla tua chiave privata, ma non puoi derivare una chiave privata dalle chiavi pubbliche. È vitale mantenere le tue chiavi private al sicuro e, come suggerisce il nome, **PRIVATE**.

Hai bisogno di una chiave privata per firmare messaggi e transazioni che producono una firma. Altri possono quindi prendere la firma per derivare la tua chiave pubblica, dimostrando l'autore del messaggio. Nella tua applicazione, puoi utilizzare una libreria JavaScript per inviare transazioni alla rete.

## Account di contratto {#contract-accounts}

Anche gli account di contratto hanno un indirizzo esadecimale di 42 caratteri:

Esempio:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

L'indirizzo del contratto viene solitamente fornito quando un contratto viene distribuito sulla blockchain di Ethereum. L'indirizzo deriva dall'indirizzo del creatore e dal numero di transazioni inviate da quell'indirizzo (il "nonce").

## Chiavi del validatore {#validators-keys}

C'è anche un altro tipo di chiave in Ethereum, introdotto quando Ethereum è passato dal consenso basato sulla Prova di lavoro (PoW) alla Proof-of-Stake (PoS). Queste sono le chiavi "BLS" e vengono utilizzate per identificare i validatori. Queste chiavi possono essere aggregate in modo efficiente per ridurre la larghezza di banda richiesta alla rete per raggiungere il consenso. Senza questa aggregazione di chiavi, lo stake minimo per un validatore sarebbe molto più alto.

[Maggiori informazioni sulle chiavi del validatore](/developers/docs/consensus-mechanisms/pos/keys/).

## Una nota sui portafogli {#a-note-on-wallets}

Un account non è un portafoglio. Un portafoglio è un'interfaccia o un'applicazione che ti consente di interagire con il tuo account di Ethereum, che sia un account di proprietà esterna o un account di contratto.

## Una demo visiva {#a-visual-demo}

Guarda Austin che ti guida attraverso le funzioni di hash e le coppie di chiavi.

<VideoWatch slug="hash-function-eth-build" />

<VideoWatch slug="key-pair-eth-build" />

## Letture consigliate {#further-reading}

- [Comprendere gli account di Ethereum](https://info.etherscan.com/understanding-ethereum-accounts/) - Etherscan

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Smart contract](/developers/docs/smart-contracts/)
- [Transazioni](/developers/docs/transactions/)