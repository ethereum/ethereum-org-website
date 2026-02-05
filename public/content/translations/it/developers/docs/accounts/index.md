---
title: Conti di Ethereum
description: "Una spiegazione dei conti di Ethereum: loro struttura dei dati e relazioni con la crittografia con coppie di chiavi."
lang: it
---

Un account Ethereum è un'entità con un saldo in ether (ETH) che può inviare messaggi su Ethereum. I conti sono controllabili da utenti o distribuibili come contratti intelligenti.

## Prerequisiti {#prerequisites}

Per aiutarti a comprendere meglio questa pagina, ti consigliamo di leggere prima la nostra [introduzione a Ethereum](/developers/docs/intro-to-ethereum/).

## Tipi di conto {#types-of-account}

Ethereum ha due tipi di conto:

- Conto posseduto esternamente (EOA): controllato da chiunque possieda le chiavi private
- Conto del contratto: un contratto intelligente distribuito alla rete, controllato dal codice. Scopri di più sui [contratti intelligenti](/developers/docs/smart-contracts/)

Entrambi i tipi di conto hanno l'abilità di:

- Ricevere, conservare e inviare ETH e token
- Interagire con i contratti intelligenti distribuiti

### Differenze principali {#key-differences}

**Posseduti esternamente**

- Creare un conto non costa nulla
- Può avviare transazioni
- Le transazioni tra conti esterni possono riguardare unicamente trasferimenti di ETH/token
- Composto da una coppia di chiavi crittografiche: chiavi pubbliche e private che controllano le attività del conto

**Contratto**

- Creare un contratto ha un costo, poiché l'utente utilizza l'archiviazione di rete
- Può inviare messaggi solo in risposta alla ricezione di una transazione.
- Le transazioni da un conto esterno al conto di un contratto possono innescare un codice che può eseguire molte azioni differenti, come trasferire token o persino creare un nuovo contratto
- I conti del contratto non hanno chiavi private. Invece, sono controllati dalla logica del codice del contratto intelligente

## Analisi di un conto {#an-account-examined}

I conti di Ethereum hanno quattro campi:

- `nonce` – Un contatore che indica il numero di transazioni inviate da un conto di proprietà esterna o il numero di contratti creati da un conto del contratto. Per ogni conto può essere eseguita una sola transazione con un determinato nonce, il che protegge da attacchi replay in cui le transazioni firmate vengono trasmesse e ri-eseguite ripetutamente.
- `balance` – Il numero di wei posseduti da questo indirizzo. Wei è una denominazione di ETH e ci sono 1e+18 wei per ETH.
- `codeHash` – Questo hash si riferisce al _codice_ di un conto sulla macchina virtuale di Ethereum (EVM). I conti del contratto contengono frammenti di codice programmati per poter eseguire diverse operazioni. Questo codice dell'EVM viene eseguito se il conto riceve una chiamata di messaggio. Non è modificabile, a differenza degli altri campi del conto. Tutti i frammenti di codice sono conservati nel database di stato sotto gli hash corrispondenti, per riferimento futuro. Questo valore dell'hash è noto come un codeHash. Per i conti esterni, il campo codeHash è l'hash di una stringa vuota.
- `storageRoot` – A volte noto come hash di archiviazione. Un hash a 256 bit del nodo radice di un [albero di Merkle Patricia](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/) che codifica i contenuti di archiviazione del conto (una mappatura tra valori interi a 256 bit), codificato nel trie come mappatura dall'hash Keccak a 256 bit delle chiavi intere a 256 bit ai valori interi a 256 bit con codifica RLP. Questo albero codifica l'hash dei contenuti dell'archiviazione di questo conto ed è vuoto di default.

![Un diagramma che mostra la composizione di un conto](./accounts.png)
_Diagramma adattato da [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Conti di proprietà esterna e coppie di chiavi {#externally-owned-accounts-and-key-pairs}

Un conto si compone di una coppia di chiavi crittografiche: pubblica e privata. Aiutano a provare che una transazione è stata realmente firmata dal mittente e prevenire le falsificazioni. La tua chiave privata è ciò che usi per firmare le transazioni, quindi ti concede la custodia dei fondi associati al tuo conto. Non possiedi mai realmente le criptovalute, possiedi le chiavi private; i fondi sono sempre nel registro mastro di Ethereum.

Questo impedisce ai malintenzionati di trasmettere false transazioni perché puoi sempre verificare il mittente di una transazione.

Se Alice desidera inviare ether dal proprio conto a quello di Bob, deve creare una richiesta di transazione e inviarla alla rete per la verifica. L'uso di Ethereum della crittografia a chiave pubblica assicura che Alice possa provare che abbia originariamente avviato la richiesta di transazione. Senza i meccanismi crittografici, un utente malintenzionato "Eve", potrebbe semplicemente trasmettere pubblicamente una richiesta che somigli a "inviare 5 ETH dal conto di Alice al conto di Eve" e nessuno potrebbe verificare che non fosse provenuta da Alice.

## Creazione del conto {#account-creation}

Quando vuoi creare un conto, la maggior parte delle librerie genererà una chiave privata casuale.

Una chiave privata si compone di 64 caratteri hex ed è codificabile con una password.

Esempio:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

La chiave pubblica è generata dalla chiave privata usando l'[Algoritmo di Firma Digitale a Curva Ellittica](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). Puoi ottenere un indirizzo pubblico per il tuo conto prendendo gli ultimi 20 byte dell'hash Keccak-256 della chiave pubblica e aggiungendo `0x` all'inizio.

Ciò significa che un conto di proprietà esterna (EOA) ha un indirizzo di 42 caratteri (un segmento di 20 byte che corrisponde a 40 caratteri esadecimali più il prefisso `0x`).

Esempio:

`0x5e97870f263700f46aa00d967821199b9bc5a120`

L'esempio seguente mostra come usare uno strumento di firma chiamato [Clef](https://geth.ethereum.org/docs/tools/clef/introduction) per generare un nuovo conto. Clef è uno strumento di gestione dei conti e di firma fornito in bundle con il client di Ethereum, [Geth](https://geth.ethereum.org). Il comando `clef newaccount` crea una nuova coppia di chiavi e la salva in un keystore crittografato.

```
> clef newaccount --keystore <path>

Inserisci una password per il nuovo conto da creare:
> <password>

------------
INFO [10-28|16:19:09.156] La tua nuova chiave è stata generata       address=0x5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Esegui il backup del file della chiave      path=/home/user/go-ethereum/data/keystore/UTC--2022-10-28T15-19-08.000825927Z--5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Ricorda la tua password!
Conto generato 0x5e97870f263700f46aa00d967821199b9bc5a120
```

[Documentazione di Geth](https://geth.ethereum.org/docs)

È possibile derivare nuove chiavi pubbliche dalla tua chiave privata, ma non puoi derivare una chiave privata dalle chiavi pubbliche. È fondamentale mantenere le proprie chiavi private al sicuro e, come suggerisce il nome, **RISERVATE**.

Necessiti di una chiave privata per firmare i messaggi e le transazioni che producono una firma. Gli altri possono quindi prendere la firma per derivare la tua chiave pubblica, provando l'autore del messaggio. Nella tua applicazione puoi utilizzare una libreria Javascript per inviare transazioni alla rete.

## Conti del contratto {#contract-accounts}

Inoltre, i conti del contratto contengono un indirizzo esadecimale da 42 caratteri:

Esempio:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

L'indirizzo del contratto è solitamente dato alla distribuzione di un contratto alla Blockchain di Ethereum. L’indirizzo deriva da quello del creatore e dal numero di transazioni inviate da tale indirizzo (il “nonce”).

## Chiavi del validatore {#validators-keys}

Esiste inoltre un altro tipo di chiave su Ethereum, introdotto quando Ethereum è passato dal consenso basato sul proof-of-work al proof-of-stake. Queste sono le chiavi 'BLS' e sono usate per identificare i validatori. Queste chiavi possono esser aggregate efficientemente per ridurre la larghezza di banda necessaria affinché la rete raggiunga il consenso. Senza questa chiave, l'aggregazione della quota minima per un validatore saremme molto maggiore.

[Maggiori informazioni sulle chiavi del validatore](/developers/docs/consensus-mechanisms/pos/keys/).

## Una nota sui portafogli {#a-note-on-wallets}

Un conto non è un portafoglio. Un portafoglio è un'interfaccia o un'applicazione che ti consente di interagire con il tuo conto di Ethereum, sia esso posseduto esternamente o di un contratto.

## Una demo visiva {#a-visual-demo}

Fatti guidare da Austin attraverso le funzionalità di hash e le coppie di chiavi.

<YouTube id="QJ010l-pBpE" />

<YouTube id="9LtBDy67Tho" />

## Letture consigliate {#further-reading}

- [Comprendere i conti di Ethereum](https://info.etherscan.com/understanding-ethereum-accounts/) - etherscan

_Conosci una risorsa della comunità che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Contratti intelligenti](/developers/docs/smart-contracts/)
- [Transazioni](/developers/docs/transactions/)
