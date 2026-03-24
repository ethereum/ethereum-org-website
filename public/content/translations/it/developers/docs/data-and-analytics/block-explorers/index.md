---
title: Esploratori di blocchi
description: Un'introduzione agli esploratori di blocchi, il tuo portale nel mondo dei dati della blockchain, dove puoi interrogare informazioni su transazioni, account, contratti e altro ancora.
lang: it
sidebarDepth: 3
---

Gli esploratori di blocchi sono il tuo portale per i dati di Ethereum. Puoi usarli per visualizzare dati in tempo reale su blocchi, transazioni, validatori, account e altre attività on-chain.

## Prerequisiti {#prerequisites}

Dovresti comprendere i concetti di base di Ethereum per poter dare un senso ai dati che un esploratore di blocchi ti fornisce. Inizia con [un'introduzione a Ethereum](/developers/docs/intro-to-ethereum/).

## Strumenti open source {#open-source-tools}

- [3xpl](https://3xpl.com/ethereum) - Un esploratore di Ethereum senza pubblicità che consente di scaricare i suoi set di dati (open-core: i moduli principali sono open source)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockscout](https://eth.blockscout.com/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)
- [Otterscan](https://otterscan.io/)

## Servizi {#services}

- [Blockchair](https://blockchair.com/ethereum) - Esploratore privato di Ethereum. Utile anche per ordinare e filtrare i dati (mempool). Disponibile in spagnolo, francese, italiano, olandese, portoghese, russo, cinese e farsi
- [Chainlens](https://www.chainlens.com/)
- [DexGuru Block Explorer](https://ethereum.dex.guru/)
- [Etherchain](https://www.etherchain.org/)
- [Etherscan](https://etherscan.io/) - Disponibile anche in cinese, coreano, russo e giapponese
- [Ethplorer](https://ethplorer.io/) - Un esploratore di blocchi con un focus sui token. Disponibile anche in cinese, spagnolo, francese, turco, russo, coreano e vietnamita
- [Ethseer](https://ethseer.io)
- [EthVM](https://www.ethvm.com/)
- [OKLink](https://www.oklink.com/eth)

## Dati {#data}

Ethereum è trasparente per concezione, quindi tutto è verificabile. Gli esploratori di blocchi forniscono un'interfaccia per ottenere queste informazioni. E questo vale sia per la rete principale di Ethereum che per le reti di test, nel caso in cui avessi bisogno di quei dati. I dati sono divisi in dati di esecuzione e dati di consenso. I dati di esecuzione si riferiscono alle transazioni che sono state eseguite in un blocco specifico. I dati di consenso si riferiscono ai blocchi stessi e ai validatori che li hanno proposti.

Ecco un riepilogo dei tipi di dati che puoi ottenere da un esploratore di blocchi.

### Dati di esecuzione {#execution-data}

Nuovi blocchi vengono aggiunti a Ethereum ogni 12 secondi (a meno che un proponente del blocco non salti il suo turno), quindi un flusso quasi costante di dati viene aggiunto agli esploratori di blocchi. I blocchi contengono molti dati importanti che potresti trovare utili:

**Dati standard**

- Altezza del blocco (Block height) - Il numero del blocco e la lunghezza della blockchain (in blocchi) alla creazione del blocco corrente
- Marca temporale (Timestamp) - Il momento in cui un blocco è stato proposto
- Transazioni (Transactions) - Il numero di transazioni incluse all'interno del blocco
- Destinatario delle commissioni (Fee recipient) - L'indirizzo che ha ricevuto le mance delle commissioni del gas dalle transazioni
- Ricompensa del blocco (Block Reward) - La quantità di ETH assegnata al validatore che ha proposto il blocco
- Dimensione (Size) - La dimensione dei dati all'interno del blocco (misurata in byte)
- Gas utilizzato (Gas used) - Le unità totali di gas utilizzate dalle transazioni nel blocco
- Limite del gas (Gas limit) - I limiti totali del gas impostati dalle transazioni nel blocco
- Commissione di base per gas (Base fee per gas) - Il moltiplicatore minimo richiesto affinché una transazione sia inclusa in un blocco
- Commissioni bruciate (Burnt fees) - Quanto ETH viene bruciato nel blocco
- Dati extra (Extra data) - Qualsiasi dato extra che il costruttore ha incluso nel blocco

**Dati avanzati**

- Hash - L'hash crittografico che rappresenta l'intestazione del blocco (l'identificatore univoco del blocco)
- Hash genitore (Parent hash) - L'hash del blocco precedente al blocco corrente
- Radice dello stato (StateRoot) - L'hash radice del trie di Merkle che memorizza l'intero stato del sistema

### Gas {#gas}

Non solo gli esploratori di blocchi ti forniranno dati sull'utilizzo del gas nelle transazioni e nei blocchi, ma alcuni ti daranno informazioni sui prezzi del gas attuali della rete. Questo ti aiuterà a comprendere l'utilizzo della rete, a inviare transazioni sicure e a non spendere troppo in gas. Cerca le API che possono aiutarti a integrare queste informazioni nell'interfaccia del tuo prodotto. I dati specifici del gas coprono:

- Unità stimate di gas necessarie per una transazione sicura ma lenta (+ prezzo e durata stimati)
- Unità stimate di gas necessarie per una transazione media (+ prezzo e durata stimati)
- Unità stimate di gas necessarie per una transazione veloce (+ prezzo e durata stimati)
- Tempo medio di conferma basato sul prezzo del gas
- Contratti che stanno consumando gas - in altre parole, prodotti popolari che stanno registrando un grande utilizzo sulla rete
- Account che stanno spendendo gas - in altre parole, utenti frequenti della rete

### Transazioni {#transactions}

Gli esploratori di blocchi sono diventati un luogo comune per le persone per tracciare l'avanzamento delle loro transazioni. Questo perché il livello di dettaglio che puoi ottenere fornisce una maggiore certezza. I dati delle transazioni includono:

**Dati standard**

- Hash della transazione (Transaction hash) - Un hash generato quando la transazione viene inviata
- Stato (Status) - Un'indicazione se la transazione è in sospeso, fallita o riuscita
- Blocco (Block) - Il blocco in cui è stata inclusa la transazione
- Marca temporale (Timestamp) - Il momento in cui una transazione è stata inclusa in un blocco proposto da un validatore
- Da (From) - L'indirizzo dell'account che ha inviato la transazione
- A (To) - L'indirizzo del destinatario o del contratto intelligente con cui la transazione interagisce
- Token trasferiti (Tokens transferred) - Un elenco di token che sono stati trasferiti come parte della transazione
- Valore (Value) - Il valore totale in ETH che viene trasferito
- Commissione della transazione (Transaction fee) - L'importo pagato al validatore per elaborare la transazione (calcolato da prezzo del gas\*gas utilizzato)

**Dati avanzati**

- Limite del gas (Gas limit) - Il numero massimo di unità di gas che questa transazione può consumare
- Gas utilizzato (Gas used) - La quantità effettiva di unità di gas consumate dalla transazione
- Prezzo del gas (Gas price) - Il prezzo impostato per unità di gas
- Nonce - Il numero della transazione per l'indirizzo `from` (tieni presente che inizia da 0, quindi un nonce di `100` sarebbe in realtà la 101esima transazione inviata da questo account)
- Dati di input (Input data) - Qualsiasi informazione extra richiesta dalla transazione

### Account {#accounts}

Ci sono molti dati a cui puoi accedere riguardo a un account. Questo è il motivo per cui spesso si consiglia di utilizzare più account in modo che i tuoi asset e il tuo valore non possano essere facilmente tracciati. Ci sono anche alcune soluzioni in fase di sviluppo per rendere le transazioni e l'attività dell'account più private. Ma ecco i dati disponibili per gli account:

**Account utente**

- Indirizzo dell'account (Account address) - L'indirizzo pubblico che puoi utilizzare per inviare fondi
- Saldo in ETH (ETH balance) - La quantità di ETH associata a quell'account
- Valore totale in ETH (Total ETH value) - Il valore degli ETH
- Token - I token associati all'account e il loro valore
- Cronologia delle transazioni (Transaction history) - Un elenco di tutte le transazioni in cui questo account è stato il mittente o il destinatario

**Contratti intelligenti**

Gli account dei contratti intelligenti hanno tutti i dati che avrà un account utente, ma alcuni esploratori di blocchi mostreranno persino alcune informazioni sul codice. Gli esempi includono:

- Creatore del contratto (Contract creator) - L'indirizzo che ha distribuito il contratto sulla rete principale
- Transazione di creazione (Creation transaction) - La transazione che ha incluso la distribuzione sulla rete principale
- Codice sorgente (Source code) - Il codice Solidity o Vyper del contratto intelligente
- ABI del contratto (Contract ABI) - L'Application Binary Interface del contratto: le chiamate che il contratto effettua e i dati ricevuti
- Codice di creazione del contratto (Contract creation code) - Il bytecode compilato del contratto intelligente, creato quando compili un contratto intelligente scritto in Solidity o Vyper, ecc.
- Eventi del contratto (Contract events) - Una cronologia dei metodi chiamati nel contratto intelligente: fondamentalmente un modo per vedere come viene utilizzato il contratto e con quale frequenza

### Token {#tokens}

I token sono un tipo di contratto, quindi avranno dati simili a un contratto intelligente. Ma poiché hanno un valore e possono essere scambiati, hanno punti dati aggiuntivi:

- Tipo (Type) - Se sono un ERC-20, ERC-721 o un altro standard di token
- Prezzo (Price) - Se sono un ERC-20 avranno un valore di mercato attuale
- Capitalizzazione di mercato (Market cap) - Se sono un ERC-20 avranno una capitalizzazione di mercato (calcolata da prezzo\*offerta totale)
- Offerta totale (Total supply) - Il numero di token in circolazione
- Titolari (Holders) - Il numero di indirizzi che detengono il token
- Trasferimenti (Transfers) - Il numero di volte in cui il token è stato trasferito tra gli account
- Cronologia delle transazioni (Transaction history) - Una cronologia di tutte le transazioni che includono il token
- Indirizzo del contratto (Contract address) - L'indirizzo del token che è stato distribuito sulla rete principale
- Decimali (Decimals) - I token ERC-20 sono divisibili e hanno posizioni decimali

### Rete {#network}

Alcuni dati dei blocchi riguardano la salute di Ethereum in modo più olistico.

- Transazioni totali (Total transactions) - Il numero di transazioni da quando è stato creato Ethereum
- Transazioni al secondo (Transactions per second) - Il numero di transazioni elaborabili in un secondo
- Prezzo di ETH (ETH price) - Le valutazioni attuali di 1 ETH
- Offerta totale di ETH (Total ETH supply) - Numero di ETH in circolazione: ricorda che nuovi ETH vengono creati con la creazione di ogni blocco sotto forma di ricompense del blocco
- Capitalizzazione di mercato (Market cap) - Calcolo di prezzo\*offerta

## Dati del livello di consenso {#consensus-layer-data}

### Epoca {#epoch}

Per motivi di sicurezza, comitati randomizzati di validatori vengono creati alla fine di ogni epoca (ogni 6,4 minuti). I dati dell'epoca includono:

- Numero dell'epoca (Epoch number)
- Stato finalizzato (Finalized status) - Se l'epoca è stata finalizzata (Sì/No)
- Tempo (Time) - Il momento in cui è terminata l'epoca
- Attestazioni (Attestations) - Il numero di attestazioni nell'epoca (voti per i blocchi all'interno degli slot)
- Depositi (Deposits) - Il numero di depositi di ETH inclusi nell'epoca (i validatori devono mettere in stake ETH per diventare validatori)
- Punizioni (Slashings) - Numero di penalità inflitte ai proponenti dei blocchi o agli attestatori
- Partecipazione al voto (Voting participation) - La quantità di ETH in stake utilizzata per attestare i blocchi
- Validatori (Validators) - Numero di validatori attivi per l'epoca
- Saldo medio del validatore (Average Validator balance) - Saldo medio per i validatori attivi
- Slot (Slots) - Numero di slot inclusi nell'epoca (gli slot includono un blocco valido)

### Slot {#slot}

Gli slot sono opportunità per la creazione di blocchi, i dati disponibili per ogni slot includono:

- Epoca (Epoch) - L'epoca in cui lo slot è valido
- Numero dello slot (Slot number)
- Stato (Status) - Lo stato dello slot (Proposto/Mancato)
- Tempo (Time) - La marca temporale dello slot
- Proponente (Proposer) - Il validatore che ha proposto il blocco per lo slot
- Radice del blocco (Block root) - L'hash-tree-root del BeaconBlock
- Radice genitore (Parent root) - L'hash del blocco precedente
- Radice dello stato (State root) - L'hash-tree-root del BeaconState
- Firma (Signature)
- Rivelazione Randao (Randao reveal)
- Graffiti - Un proponente del blocco può includere un messaggio lungo 32 byte alla sua proposta di blocco
- Dati di esecuzione (Execution Data)
  - Hash del blocco (Block hash)
  - Conteggio dei depositi (Deposit count)
  - Radice dei depositi (Deposit root)
- Attestazioni (Attestations) - Numero di attestazioni per il blocco in questo slot
- Depositi (Deposits) - Il numero di depositi durante questo slot
- Uscite volontarie (Voluntary exits) - Il numero di validatori che hanno lasciato durante lo slot
- Punizioni (Slashings) - Numero di penalità inflitte ai proponenti dei blocchi o agli attestatori
- Voti (Votes) - I validatori che hanno votato per il blocco in questo slot

### Blocchi {#blocks-1}

La prova di stake divide il tempo in slot ed epoche. Quindi questo significa nuovi dati!

- Proponente (Proposer) - Il validatore che è stato scelto algoritmicamente per proporre il nuovo blocco
- Epoca (Epoch) - L'epoca in cui è stato proposto il blocco
- Slot - Lo slot in cui è stato proposto il blocco
- Attestazioni (Attestations) - Il numero di attestazioni incluse nello slot: le attestazioni sono come voti che indicano che il blocco è pronto per andare sulla Beacon Chain

### Validatori {#validators}

I validatori sono responsabili della proposta dei blocchi e della loro attestazione all'interno degli slot.

- Numero del validatore (Validator number) - Numero univoco che rappresenta il validatore
- Saldo attuale (Current balance) - Il saldo del validatore incluse le ricompense
- Saldo effettivo (Effective balance) - Il saldo del validatore che viene utilizzato per lo staking
- Reddito (Income) - Le ricompense o le penalità ricevute dal validatore
- Stato (Status) - Se il validatore è attualmente online e attivo o meno
- Efficacia dell'attestazione (Attestation effectiveness) - Il tempo medio impiegato affinché le attestazioni del validatore vengano incluse nella catena
- Idoneità per l'attivazione (Eligibility for activation) - Data (ed epoca) in cui il validatore è diventato disponibile per validare
- Attivo dal (Active since) - Data (ed epoca) in cui il validatore è diventato attivo
- Blocchi proposti (Proposed blocks) - Il blocco che il validatore ha proposto
- Attestazioni (Attestations) - Le attestazioni che il validatore ha fornito
- Depositi (Deposits) - L'indirizzo di provenienza, l'hash della transazione, il numero del blocco, la marca temporale, l'importo e lo stato del deposito di staking effettuato dal validatore

### Attestazioni {#attestations}

Le attestazioni sono voti "sì" per includere i blocchi nella catena. I loro dati si riferiscono a un registro dell'attestazione e ai validatori che hanno attestato

- Slot - Lo slot in cui ha avuto luogo l'attestazione
- Indice del comitato (Committee index) - L'indice del comitato nello slot specificato
- Bit di aggregazione (Aggregation bits) - Rappresenta l'attestazione aggregata di tutti i validatori partecipanti all'attestazione
- Validatori (Validators) - I validatori che hanno fornito attestazioni
- Radice del blocco beacon (Beacon block root) - Punta al blocco a cui i validatori stanno attestando
- Origine (Source) - Punta all'ultima epoca giustificata
- Destinazione (Target) - Punta all'ultimo confine dell'epoca
- Firma (Signature)

### Rete {#network-1}

I dati di primo livello del livello di consenso includono quanto segue:

- Epoca attuale (Current epoch)
- Slot attuale (Current slot)
- Validatori attivi (Active validators) - Numero di validatori attivi
- Validatori in attesa (Pending validators) - Numero di validatori in attesa di essere resi attivi
- ETH in stake (Staked ETH) - Quantità di ETH in stake nella rete
- Saldo medio (Average balance) - Saldo medio in ETH dei validatori

## Letture consigliate {#further-reading}

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Transazioni](/developers/docs/transactions/)
- [Account](/developers/docs/accounts/)
- [Reti](/developers/docs/networks/)