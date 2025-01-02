---
title: Esploratori dei blocchi
description: Un'introduzione agli esploratori di blocchi, il tuo portale al mondo dei dati della blockchain, dove puoi richiedere informazioni sulle transazioni, i conti, i contratti e altro.
lang: it
sidebarDepth: 3
---

I block explorer sono il tuo portale sui dati di Ethereum. Puoi usarli per vedere in tempo reale dati su blocchi, transazioni, validatori, conti e altre attività on-chain.

## Prerequisiti {#prerequisites}

È consigliabile conoscere i concetti base di Ethereum in modo da capire quali dati si possono consultare in un block explorer. Inizia con [un'introduzione a Ethereum](/developers/docs/intro-to-ethereum/).

## Servizi {#services}

- [Etherscan](https://etherscan.io/): _disponibile anche in cinese, coreano, russo e giapponese_
- [3xpl](https://3xpl.com/ethereum)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockchair](https://blockchair.com/ethereum): _disponibile anche in spagnolo, francese, italiano, olandese, portoghese, russo, cinese e farsi_
- [Blockscout](https://eth.blockscout.com/)
- [Chainlens](https://www.chainlens.com/)
- [DexGuru Block Explorer](https://ethereum.dex.guru/)
- [Etherchain](https://www.etherchain.org/)
- [Ethernow](https://www.ethernow.xyz/)
- [Ethplorer](https://ethplorer.io/): _disponibile anche in cinese, spagnolo, francese, turco, russo, coreano e vietnamita_
- [EthVM](https://www.ethvm.com/)
- [OKLink](https://www.oklink.com/eth)
- [Rantom](https://rantom.app/)
- [Ethseer](https://ethseer.io)

## Strumenti open source {#open-source-tools}

- [Otterscan](https://otterscan.io/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)

## Dati {#data}

Ethereum è trasparente per definizione, quindi tutto è verificabile. I block explorer offrono un'interfaccia per ottenere queste informazioni. Questo vale sia per la rete Ethereum principale che per le reti di prova, nel caso servissero questi tipi di dati. I dati sono divisi in dati d'esecuzione e di consenso. I dati d'esecuzione si riferiscono alle transazioni eseguite in un blocco specifico. I dati di consenso si riferiscono ai blocchi stessi e ai validatori che li hanno proposti.

Ecco un riepilogo dei tipi di dati ottenibili da un block explorer.

### Dati d'esecuzione {#execution-data}

Ogni 12 secondi vengono aggiunti nuovi blocchi a Ethereum (a meno che un propositore del blocco salti il proprio turno), quindi un flusso di dati quasi costante viene aggiunto agli esploratori di blocchi. I blocchi contengono molti dati importanti che potrebbero risultare utili:

**Dati standard**

- Altezza del blocco - Il numero del blocco e la lunghezza della blockchain (in blocchi) alla creazione del blocco corrente
- Marca oraria - L'ora in cui è stato proposto un blocco
- Transazioni - Il numero di transazioni incluse nel blocco
- Destinatario della commissione: L'indirizzo che ha ricevuto le mance della commissione del gas dalle transazioni
- Ricompensa del blocco - L'importo di ETH elargito al validatore che ha proposto il blocco
- Dimensione - Le dimensioni dei dati nel blocco (misurate in byte)
- Gas usato: Le unità di gas totali usate dalle transazioni nel blocco
- Limite di gas: I limiti totali di gas impostati dalle transazioni nel blocco
- Commissione di base per il gas: Il moltiplicatore minimo necessario perché una transazione sia inclusa in un blocco
- Commissioni bruciate - La quantità di ETH bruciati nel blocco
- Dati aggiuntivi - Eventuali dati aggiuntivi che il costruttore ha incluso nel blocco

**Dati avanzati**

- Hash - L'hash crittografico rappresentante l'intestazione del blocco (l'identificativo univoco del blocco)
- Hash padre - L'hash del blocco che precedeva quello corrente
- StateRoot - L'hash di root dell'albero di Merkle che memorizza l'intero stato del sistema

### Gas {#gas}

Non solo gli esploratori dei blocchi ti forniranno i dati sull'utilizzo del Gas nelle transazioni e nei blocchi, ma alcuni ti forniranno informazioni anche sui prezzi correnti del gas nella rete. Ciò ti aiuterà a comprendere l'utilizzo della rete, a inviare transazioni sicuri e a non spendere troppo in gas. Cerca le API che possono aiutarti a ottenere queste informazioni nell'interfaccia del tuo prodotto. I dati specifici sul gas coprono:

- Le unità stimate di gas necessarie per una transazione sicura ma lenta (+ prezzo stimato e durata)
- Le unità stimate di gas necessarie per una transazione media (+ prezzo stimato e durata)
- Le unità stimate di gas necessarie per una transazione veloce (+ prezzo stimato e durata)
- Tempo medio di conferma basato sul prezzo del gas
- Contratti che consumano gas: in altre parole, i prodotti popolari e più utilizzati sulla rete
- Conti che consumano gas: in altre parole, gli utenti frequenti della rete

### Transazioni {#transactions}

Gli esploratori di blocchi sono diventati un punto di riferimento comune per tracciare l'andamento delle transazioni. Questo perché il livello di dettaglio che si può ottenere offre maggior certezza. I dati delle transazioni includono:

**Dati standard**

- Hash di transazione - Un hash generato all'invio della transazione
- Stato - Un'indicazione del fatto che la transazione sia in sospeso, fallita o riuscita
- Blocco - Il blocco in cui è stata inclusa la transazione
- Timestamp - Il momento in cui una transazione è stata inclusa in un blocco proposto da un validatore
- Mittente: L'indirizzo del conto che ha inviato la transazione
- A - L'indirizzo del destinatario o del contratto intelligente con cui interagisce la transazione
- Token trasferiti - Un elenco dei token trasferiti nell'ambito della transazione
- Valore - Il valore totale degli ETH trasferiti
- Commissione sulla transazione - L'importo pagato al validatore per elaborare la transazione (calcolato come prezzo del gas\*gas utilizzato).

**Dati avanzati**

- Limite di gas: I numeri massimi di unità di gas che questa transazione può consumare
- Gas usato: L'importo effettivo di unità di gas che la transazione ha consumato
- Prezzo del gas: Il prezzo fissato per unità di gas
- Nonce: Il numero della transazione per l'indirizzo `from` (tieni a mente che inizia a 0, quindi un nonce di `100`, sarebbe in realtà la 101° transazione inviata da questo conto
- Dati di input - Ogni informazione aggiuntiva richiesta dalla transazione

### Conti {#accounts}

Esistono molti dati relativi a un conto a cui puoi accedere. Ecco perché, spesso, è consigliato usare più conti, così che le tue risorse e il tuo valore non siano facili da tracciare. Sono in oltre in corso di sviluppo alcune soluzioni per rendere le transazioni e l'attività del conto, più private. Ma ecco i dati disponibili per i conti:

**Conti dell'utente**

- Indirizzo del conto: L'indirizzo pubblico che puoi usare per l'invio dei fondi
- Saldo di ETH: L'importo di ETH associato a quel conto
- Valore totale di ETH - Il valore degli ETH
- Token: I token associati al conto e il loro valore
- Storico delle transazioni: Un elenco di tutte le transazioni in cui questo conto era il mittente o il destinatario

**Contratto intelligente**

I conti del contratto intelligente contengono tutti i dati che avrà il conto di un utente, ma alcuni esploratori del blocco mostreranno persino delle informazioni del codice. Ad esempio:

- Creatore del contratto - L'indirizzo che ha distribuito il contratto sulla rete principale
- Transazione di creazione - La transazione che ha incluso la distribuzione alla rete principale
- Codice sorgente: Il codice in Solidity o Vyper del contratto intelligente
- ABI del contratto - L'interfaccia binaria dell'applicazione del contratto; le chiamate che il contratto effettua e i dati ricevuti
- Codice di creazione del contratto: Il bytecode compilato del contratto intelligente, creato quando compili un contratto intelligente scritto in Solidity o Vyper, etc.
- Eventi del contratto: Uno storico dei metodi chiamati nel contratto intelligente, fondamentalmente, un modo per vedere come e quanto spesso è usato il contratto

### Token {#tokens}

I token sono un tipo di contratto, quindi conterranno dati simili a un contratto intelligente. Ma siccome hanno un valore e possono essere scambiati, contengono dati aggiuntivi:

- Tipo - Se si tratta di un ERC-20, un ERC-721 o un altro standard di token
- Prezzo - Se si tratta di un ERC-20, avrà il valore di mercato corrente
- Limite di mercato - Se si tratta di un ERC-20, avrà un limite di mercato (calcolato come prezzo\*offerta totale)
- Offerta totale - Il numero di token in circolazione
- Titolari - Il numero di indirizzi contenenti il token
- Trasferimenti: Il numero di volte che il token è stato trasferito tra i conti
- Storico delle transazioni - Uno storico di tutte le transazioni che includono il token
- Indirizzo del contratto - L'indirizzo del token distribuito sulla rete principale
- Decimali - I token ERC-20 sono divisibili e hanno cifre decimali

### Rete {#network}

Alcuni dati del blocco si preoccupano della salute di Ethereum in modo più olistico.

- Transazioni totali - Il numero di transazioni dalla creazione di Ethereum
- Transazioni al secondo - Il numero di transazioni elaborabili in un secondo
- Prezzo di ETH - Le quotazioni correnti di 1 ETH
- Offerta totale di ETH - Numero di ETH in circolazione, ricorda che i nuovi ETH sono creati alla creazione di ogni blocco sotto forma di ricompense del blocco
- Limite di mercato - Calcolo di prezzo\*offerta

## Dati del livello di consenso {#consensus-layer-data}

### Epoche {#epoch}

Per motivi di sicurezza, vengono creati commissioni randomizzate di validatori alla fine di ogni epoca (ogni 6,4 minuti). I dati relativi alle epoche includono:

- Numero dell'epoca
- Stato finalizzato - Se l'epoca è stata finalizzata (Sì/No)
- Ora - L'ora in cui è terminata l'epoca
- Attestazioni - Il numero di attestazioni nell'epoca (voti per i blocchi negli slot)
- Depositi - Il numero di depositi di ETH inclusi nell'epoca (per diventare validatori, occorre mettere ETH in staking)
- Tagli - Numero di sanzioni date ai propositori di blocchi o agli attestatori
- Partecipazione al voto - L'importo di ETH in staking usato per attestare i blocchi
- Validatori - Numero di validatori attivi per ogni epoca
- Saldo medio del validatore - Saldo medio per i validatori attivi
- Slot - Numero di slot inclusi nell'epoca (gli slot includono un blocco valido)

### Slot {#slot}

Gli slot sono opportunità per la creazione di un blocco e i dati disponibili per ogni slot includono:

- Epoca - L'epoca in cui è valido lo slot
- Numero dello slot
- Stato - Lo stato dello slot (Proposto/Mancato)
- Ora - La marca oraria dello slot
- Propositore - Il validatore che ha proposto il blocco per lo slot
- Radice del blocco - La radice dell'albero dell'hash del BeaconBlock
- Radice madre - L'hash del blocco precedente
- Radice di stato - La radice dell'albero dell'hash del BeaconState
- Firma
- Randao reveal
- Graffiti - Il propositore di un blocco può includere un messaggio di 32 byte alla proposta relativa al blocco
- Dati d'esecuzione
  - Hash del blocco
  - Numero di depositi
  - Radice del deposito
- Attestazioni - Numero di attestazioni per il blocco in questo slot
- Depositi - Il numero di depositi durante questo slot
- Uscite volontarie - Il numero di validatori che hanno abbandonato durante lo slot
- Tagli - Numero di sanzioni date ai propositori di blocchi o attestatori
- Voti - I validatori che hanno votato per il blocco in questo slot

### Blocchi {#blocks-1}

Il proof-of-stake divide il tempo in slot ed epoche, il che significa nuovi dati!

- Propositore - Il validatore scelto dall'algoritmo per proporre il nuovo blocco
- Epoca - L'epoca in cui è stato proposto il blocco
- Slot - Lo slot in cui è stato proposto il blocco
- Attestazioni - Il numero di attestazioni incluse nello slot; le attestazioni sono come i voti che indicano che il blocco è pronto per andare alla beacon chain

### Validatori {#validators}

I validatori sono responsabili per proporre blocchi e attestarli all'interno degli slot.

- Numero del validatore - Numero univoco rappresentante il validatore
- Saldo corrente - Il saldo del validatore che include le ricompense
- Saldo effettivo - Il saldo del validatore usato per lo staking
- Reddito - Le ricompense o sanzioni ricevute dal validatore
- Stato - Se il validatore è attualmente online e se è attivo o meno
- Efficienza dell'attestazione - Il tempo medio impiegato per le attestazioni del validatore affinché fossero incluse nella catena
- Idoneità all'attivazione - Data (ed epoca) in cui il validatore è divenuto disponibile a validare
- Attivo dal - Data (ed epoca) in cui il validatore è divenuto attivo
- Blocchi proposti - Il blocco proposto dal validatore
- Attestazioni - Le attestazioni fornite dal validatore
- Depositi - L'indirizzo di provenienza, l'hash della transazione, il numero del blocco, la marca oraria, l'importo e lo stato del deposito di staking effettuato dal validatore

### Attestazioni {#attestations}

Le attestazioni sono voti positivi per l'inclusione dei blocchi nella catena. I loro dati si riferiscono a un record dell'attestazione e ai validatori che hanno attestato

- Slot - Lo slot in cui è avvenuta l'attestazione
- Indice della commissione - L'indice della commissione allo slot dato
- Bit di aggregazione - Rappresenta l'attestazione aggregata di tutti i validatori partecipanti nell'attestazione
- Validatori - I validatori che hanno fornito le attestazioni
- Radice del blocco della Beacon - Punta al blocco su cui i validatori stanno attestando
- Sorgente - Punta all'ultima epoca giustificata
- Destinazione - Punta al confine dell'ultima epoca
- Firma

### Rete {#network-1}

I dati di livello superiore del livello di consenso includono quanto segue:

- Epoca attuale
- Slot attuale
- Validatori attivi - Numero di validatori attivi
- Validatori in sospeso - Numero di validatori in attesa di essere resi attivi
- ETH in staking - Importo di ETH in staking nella rete
- Saldo medio - Saldo medio di ETH dei validatori

## Block explorer {#block-explorers}

- [Etherscan](https://etherscan.io/) - un esploratore di blocchi che puoi usare per recuperare i dati per la Rete Principale di Ethereum e le reti di prova di Ropsten, Kovan, Rinkeby e Goerli
- [3xpl](https://3xpl.com/ethereum) - un esploratore di Ethereum open source e privo di inserzioni che consente di scaricare i propri dataset
- [Beaconcha.in](https://beaconcha.in/) - un esploratore di blocchi open source per la Rete Principale di Ethereum e la rete di prova di Goerli
- [Blockchair](https://blockchair.com/ethereum): l'esploratore di Ethereum più privato. Anche per ordinare e filtrare i dati (mempool)
- [Etherchain](https://www.etherchain.org/) - un esploratore di blocchi per la rete principale di Ethereum
- [Ethplorer](https://ethplorer.io/) - un esploratore di blocchi incentrato sui token per la Rete Principale di Ethereum e la rete di prova di Kovan
- [Rantom](https://rantom.app/): Un visualizzatore di transazioni NFT e DeFi open source e intuitivo per gli utenti, per una visione dettagliata
- [Ethernow](https://www.ethernow.xyz/): un esploratore in tempo reale delle transazioni che ti consente di visualizzare il livello pre-catena della Rete Principale di Ethereum

## Approfondimenti {#further-reading}

_Conosci una risorsa pubblica che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Transazioni](/developers/docs/transactions/)
- [Conti](/developers/docs/accounts/)
- [Reti](/developers/docs/networks/)
