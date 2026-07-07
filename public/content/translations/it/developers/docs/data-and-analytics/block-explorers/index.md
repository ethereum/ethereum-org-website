---
title: Block explorer
description: Un'introduzione ai block explorer, il tuo portale nel mondo dei dati della blockchain, dove puoi interrogare informazioni su transazioni, account, contratti e altro ancora.
lang: it
sidebarDepth: 3
---

I block explorer sono il tuo portale per i dati di Ethereum. Puoi usarli per visualizzare dati in tempo reale su blocchi, transazioni, validatori, account e altre attività onchain.

## Prerequisiti {#prerequisites}

Dovresti comprendere i concetti di base di Ethereum per poter dare un senso ai dati che un block explorer ti fornisce. Inizia con [un'introduzione a Ethereum](/developers/docs/intro-to-ethereum/).

## Strumenti open source {#open-source-tools}

- [3xpl](https://3xpl.com/ethereum) - Un explorer di Ethereum senza pubblicità che consente di scaricare i suoi set di dati (open-core: i moduli principali sono open source)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockscout](https://eth.blockscout.com/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)
- [Otterscan](https://otterscan.io/)

## Servizi {#services}

- [Blockchair](https://blockchair.com/ethereum) - Explorer privato di Ethereum. Utile anche per ordinare e filtrare i dati (della mempool). Disponibile in spagnolo, francese, italiano, olandese, portoghese, russo, cinese e farsi
- [Chainlens](https://www.chainlens.com/)
- [DexGuru Block Explorer](https://ethereum.dex.guru/)
- [Etherchain](https://www.etherchain.org/)
- [Etherscan](https://etherscan.io/) - Disponibile anche in cinese, coreano, russo e giapponese
- [Ethplorer](https://ethplorer.io/) - Un block explorer incentrato sui token. Disponibile anche in cinese, spagnolo, francese, turco, russo, coreano e vietnamita
- [Ethseer](https://ethseer.io)
- [EthVM](https://www.ethvm.com/)
- [OKLink](https://www.oklink.com/eth)

## Dati {#data}

Ethereum è trasparente per progettazione, quindi tutto è verificabile. I block explorer forniscono un'interfaccia per ottenere queste informazioni. E questo vale sia per la rete principale di Ethereum che per le reti di prova (testnet), nel caso in cui avessi bisogno di quei dati. I dati sono divisi in dati di esecuzione e dati di consenso. I dati di esecuzione si riferiscono alle transazioni che sono state eseguite in un blocco specifico. I dati di consenso si riferiscono ai blocchi stessi e ai validatori che li hanno proposti.

Ecco un riepilogo dei tipi di dati che puoi ottenere da un block explorer.

### Dati di esecuzione {#execution-data}

Nuovi blocchi vengono aggiunti a Ethereum ogni 12 secondi (a meno che un proponente del blocco non salti il proprio turno), quindi un flusso quasi costante di dati viene aggiunto ai block explorer. I blocchi contengono molti dati importanti che potresti trovare utili:

**Dati standard**

- Altezza del blocco - Il numero del blocco e la lunghezza della blockchain (in blocchi) alla creazione del blocco corrente
- Timestamp - L'ora in cui è stato proposto un blocco
- Transazioni - Il numero di transazioni incluse nel blocco
- Destinatario delle commissioni - L'indirizzo che ha ricevuto le mance delle commissioni del gas dalle transazioni
- Ricompensa del blocco - La quantità di ETH assegnata al validatore che ha proposto il blocco
- Dimensione - La dimensione dei dati all'interno del blocco (misurata in byte)
- Gas utilizzato - Le unità totali di gas utilizzate dalle transazioni nel blocco
- Limite di gas - I limiti di gas totali impostati dalle transazioni nel blocco
- Commissione di base per gas - Il moltiplicatore minimo richiesto affinché una transazione sia inclusa in un blocco
- Commissioni bruciate - Quanto ETH viene bruciato nel blocco
- Dati extra - Qualsiasi dato extra che il costruttore ha incluso nel blocco

**Dati avanzati**

- Hash - L'hash crittografico che rappresenta l'intestazione del blocco (l'identificatore univoco del blocco)
- Hash genitore - L'hash del blocco precedente al blocco corrente
- StateRoot - L'hash radice del trie di Merkle che memorizza l'intero stato del sistema

### Gas {#gas}

Non solo i block explorer ti forniranno dati sull'utilizzo del gas nelle transazioni e nei blocchi, ma alcuni ti daranno informazioni sui prezzi del gas attuali della rete. Questo ti aiuterà a comprendere l'utilizzo della rete, a inviare transazioni sicure e a non spendere troppo in gas. Cerca le API che possono aiutarti a integrare queste informazioni nell'interfaccia del tuo prodotto. I dati specifici del gas includono:

- Unità stimate di gas necessarie per una transazione sicura ma lenta (+ prezzo e durata stimati)
- Unità stimate di gas necessarie per una transazione media (+ prezzo e durata stimati)
- Unità stimate di gas necessarie per una transazione veloce (+ prezzo e durata stimati)
- Tempo medio di conferma basato sul prezzo del gas
- Contratti che consumano gas - in altre parole, prodotti popolari che registrano un elevato utilizzo sulla rete
- Account che spendono gas - in altre parole, utenti frequenti della rete

### Transazioni {#transactions}

I block explorer sono diventati un luogo comune in cui le persone tengono traccia dell'avanzamento delle loro transazioni. Questo perché il livello di dettaglio che puoi ottenere fornisce un'ulteriore certezza. I dati della transazione includono:

**Dati standard**

- Hash della transazione - Un hash generato quando la transazione viene inviata
- Stato - Un'indicazione se la transazione è in sospeso, fallita o riuscita
- Blocco - Il blocco in cui è stata inclusa la transazione
- Timestamp - L'ora in cui una transazione è stata inclusa in un blocco proposto da un validatore
- Da - L'indirizzo dell'account che ha inviato la transazione
- A - L'indirizzo del destinatario o dello smart contract con cui interagisce la transazione
- Token trasferiti - Un elenco di token che sono stati trasferiti come parte della transazione
- Valore - Il valore totale in ETH trasferito
- Commissione di transazione - L'importo pagato al validatore per elaborare la transazione (calcolato da prezzo del gas\*gas utilizzato)

**Dati avanzati**

- Limite di gas - Il numero massimo di unità di gas che questa transazione può consumare
- Gas utilizzato - La quantità effettiva di unità di gas consumate dalla transazione
- Prezzo del gas - Il prezzo impostato per unità di gas
- Nonce - Il numero di transazione per l'indirizzo `from` (tieni presente che inizia da 0, quindi un nonce di `100` sarebbe in realtà la 101esima transazione inviata da questo account)
- Dati di input - Qualsiasi informazione extra richiesta dalla transazione

### Account {#accounts}

Ci sono molti dati a cui puoi accedere riguardo a un account. Questo è il motivo per cui si consiglia spesso di utilizzare più account in modo che i tuoi asset e il tuo valore non possano essere facilmente tracciati. Ci sono anche alcune soluzioni in fase di sviluppo per rendere le transazioni e l'attività dell'account più private. Ma ecco i dati disponibili per gli account:

**Account utente**

- Indirizzo dell'account - L'indirizzo pubblico che puoi utilizzare per inviare fondi
- Saldo in ETH - La quantità di ETH associata a quell'account
- Valore totale in ETH - Il valore degli ETH
- Token - I token associati all'account e il loro valore
- Cronologia delle transazioni - Un elenco di tutte le transazioni in cui questo account era il mittente o il destinatario

**Smart contract**

Gli account degli smart contract hanno tutti i dati che avrà un account utente, ma alcuni block explorer mostreranno anche alcune informazioni sul codice. Gli esempi includono:

- Creatore del contratto - L'indirizzo che ha effettuato la distribuzione del contratto sulla Mainnet
- Transazione di creazione - La transazione che includeva la distribuzione sulla Mainnet
- Codice sorgente - Il codice Solidity o Vyper dello smart contract
- ABI del contratto - L'Application Binary Interface del contratto: le chiamate che il contratto effettua e i dati ricevuti
- Codice di creazione del contratto - Il bytecode compilato dello smart contract, creato quando compili uno smart contract scritto in Solidity o Vyper, ecc.
- Eventi del contratto - Una cronologia dei metodi chiamati nello smart contract: fondamentalmente un modo per vedere come viene utilizzato il contratto e con quale frequenza

### Token {#tokens}

I token sono un tipo di contratto, quindi avranno dati simili a uno smart contract. Ma poiché hanno un valore e possono essere scambiati, hanno punti dati aggiuntivi:

- Tipo - Se sono un ERC-20, ERC-721 o un altro standard di token
- Prezzo - Se sono un ERC-20 avranno un valore di mercato attuale
- Capitalizzazione di mercato - Se sono un ERC-20 avranno una capitalizzazione di mercato (calcolata da prezzo\*offerta totale)
- Offerta totale - Il numero di token in circolazione
- Titolari - Il numero di indirizzi che detengono il token
- Trasferimenti - Il numero di volte in cui il token è stato trasferito tra account
- Cronologia delle transazioni - Una cronologia di tutte le transazioni che includono il token
- Indirizzo del contratto - L'indirizzo del token che è stato distribuito sulla Mainnet
- Decimali - I token ERC-20 sono divisibili e hanno posizioni decimali

### Rete {#network}

Alcuni dati dei blocchi riguardano la salute di Ethereum in modo più olistico.

- Transazioni totali - Il numero di transazioni da quando è stato creato Ethereum
- Transazioni al secondo - Il numero di transazioni elaborabili in un secondo
- Prezzo di ETH - Le valutazioni attuali di 1 ETH
- Offerta totale di ETH - Numero di ETH in circolazione: ricorda che nuovi ETH vengono creati con la creazione di ogni blocco sotto forma di ricompense del blocco
- Capitalizzazione di mercato - Calcolo di prezzo\*offerta

## Dati del livello di consenso {#consensus-layer-data}

### Epoca {#epoch}

Per motivi di sicurezza, comitati randomizzati di validatori vengono creati alla fine di ogni epoca (ogni 6,4 minuti). I dati dell'epoca includono:

- Numero dell'epoca
- Stato finalizzato - Se l'epoca è stata finalizzata (Sì/No)
- Ora - L'ora in cui è terminata l'epoca
- Attestazioni - Il numero di attestazioni nell'epoca (voti per i blocchi all'interno degli slot)
- Depositi - Il numero di depositi in ETH inclusi nell'epoca (i validatori devono mettere in staking ETH per diventare validatori)
- Slashing - Numero di penalità inflitte ai proponenti dei blocchi o agli attestatori
- Partecipazione al voto - La quantità di ETH in staking utilizzata per attestare i blocchi
- Validatori - Numero di validatori attivi per l'epoca
- Saldo medio del validatore - Saldo medio per i validatori attivi
- Slot - Numero di slot inclusi nell'epoca (gli slot includono un blocco valido)

### Slot {#slot}

Gli slot sono opportunità per la creazione di blocchi, i dati disponibili per ogni slot includono:

- Epoca - L'epoca in cui lo slot è valido
- Numero dello slot
- Stato - Lo stato dello slot (Proposto/Mancato)
- Ora - Il timestamp dello slot
- Proponente - Il validatore che ha proposto il blocco per lo slot
- Radice del blocco - L'hash-tree-root del blocco beacon (BeaconBlock)
- Radice genitore - L'hash del blocco precedente
- Radice dello stato - L'hash-tree-root del BeaconState
- Firma
- Rivelazione RANDAO
- Graffiti - Un proponente del blocco può includere un messaggio lungo 32 byte alla sua proposta di blocco
- Dati di esecuzione
  - Hash del blocco
  - Conteggio dei depositi
  - Radice del deposito
- Attestazioni - Numero di attestazioni per il blocco in questo slot
- Depositi - Il numero di depositi durante questo slot
- Uscite volontarie - Il numero di validatori che hanno abbandonato durante lo slot
- Slashing - Numero di penalità inflitte ai proponenti dei blocchi o agli attestatori
- Voti - I validatori che hanno votato per il blocco in questo slot

### Blocchi {#blocks-1}

La Proof-of-Stake (PoS) divide il tempo in slot ed epoche. Quindi questo significa nuovi dati!

- Proponente - Il validatore che è stato scelto algoritmicamente per proporre il nuovo blocco
- Epoca - L'epoca in cui è stato proposto il blocco
- Slot - Lo slot in cui è stato proposto il blocco
- Attestazioni - Il numero di attestazioni incluse nello slot: le attestazioni sono come voti che indicano che il blocco è pronto per passare alla Beacon Chain

### Validatori {#validators}

I validatori sono responsabili della proposta dei blocchi e della loro attestazione all'interno degli slot.

- Numero del validatore - Numero univoco che rappresenta il validatore
- Saldo attuale - Il saldo del validatore incluse le ricompense
- Saldo effettivo - Il saldo del validatore che viene utilizzato per lo staking
- Entrate - Le ricompense o le penalità ricevute dal validatore
- Stato - Se il validatore è attualmente online e attivo o meno
- Efficacia dell'attestazione - Il tempo medio necessario affinché le attestazioni del validatore vengano incluse nella catena
- Idoneità per l'attivazione - Data (ed epoca) in cui il validatore è diventato disponibile per la convalida
- Attivo dal - Data (ed epoca) in cui il validatore è diventato attivo
- Blocchi proposti - Il blocco che il validatore ha proposto
- Attestazioni - Le attestazioni che il validatore ha fornito
- Depositi - L'indirizzo di provenienza, l'hash della transazione, il numero del blocco, il timestamp, l'importo e lo stato del deposito di staking effettuato dal validatore

### Attestazioni {#attestations}

Le attestazioni sono voti "sì" per includere i blocchi nella catena. I loro dati si riferiscono a un record dell'attestazione e ai validatori che hanno attestato

- Slot - Lo slot in cui ha avuto luogo l'attestazione
- Indice del comitato - L'indice del comitato nello slot specificato
- Bit di aggregazione - Rappresenta l'attestazione aggregata di tutti i validatori partecipanti all'attestazione
- Validatori - I validatori che hanno fornito attestazioni
- Radice del blocco beacon - Punta al blocco che i validatori stanno attestando
- Origine - Punta all'ultima epoca giustificata
- Destinazione - Punta all'ultimo limite dell'epoca
- Firma

### Rete {#network-1}

I dati di primo livello del livello di consenso includono quanto segue:

- Epoca corrente
- Slot corrente
- Validatori attivi - Numero di validatori attivi
- Validatori in sospeso - Numero di validatori in attesa di essere resi attivi
- ETH in staking - Quantità di ETH messi in staking nella rete
- Saldo medio - Saldo medio in ETH dei validatori

## Letture consigliate {#further-reading}

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Transazioni](/developers/docs/transactions/)
- [Account](/developers/docs/accounts/)
- [Reti](/developers/docs/networks/)