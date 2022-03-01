---
title: Block explorer
description: Introduzione ai block explorer, il tuo portale nel mondo dei dati della blockchain, dove puoi eseguire query su informazioni su transazioni, account, contratti e altro ancora.
lang: it
sidebar: true
sidebarDepth: 3
---

I block explorer sono il tuo portale sui dati di Ethereum. Puoi usarli per vedere dati in tempo reale su blocchi, transazioni, miner, account e altre attività che avvengono sulla catena.

## Prerequisiti {#prerequisites}

È consigliabile conoscere i concetti base di Ethereum in modo da capire quali dati si possono consultare in un block explorer. Inizia con [un'introduzione a Ethereum](/developers/docs/intro-to-ethereum/).

## Servizi {#services}

- [Etherscan](https://etherscan.io/): _disponibile anche in cinese, coreano, russo e giapponese_
- [Etherchain](https://www.etherchain.org/)
- [Ethplorer](https://ethplorer.io/)
- [Blockchair](https://blockchair.com/ethereum): _disponibile anche in spagnolo, francese, italiano, olandese, portoghese, russo, cinese e farsi_
- [Blockscout](https://blockscout.com/)
- [OKLink](https://www.oklink.com/eth)

## Dati {#data}

Ethereum è trasparente per definizione, quindi tutto è verificabile. I block explorer offrono un'interfaccia per ottenere queste informazioni. Questo vale sia per la rete Ethereum principale che per le reti di prova, nel caso servissero questi tipi di dati.

Ecco un riepilogo dei tipi di dati ottenibili da un block explorer.

### Blocchi {#blocks}

A Ethereum vengono aggiunti nuovi blocchi ogni ~12 secondi (il dato può fluttuare) quindi c'è un flusso quasi costante di dati che vengono aggiunti ai block explorer. I blocchi contengono molti dati importanti che potrebbero risultare utili:

**Dati standard**

- Altezza del blocco: numero del blocco e lunghezza della blockchain (in blocchi) alla creazione del blocco corrente.
- Data/ora: momento in cui un miner ha eseguito il mining del blocco.
- Transazioni: numero di transazioni incluse nel blocco.
- Miner: indirizzo del miner che ha eseguito il mining del blocco.
- Ricompensa: ammontare di ETH riconosciuti al miner per aver aggiunto il blocco (ricompensa standard 2 ETH + commissioni sulle transazioni incluse nel blocco).
- Difficoltà: difficoltà associata al mining del blocco.
- Dimensione: dimensione dei dati all'interno del blocco (misurata in byte).
- Carburante utilizzato: totale delle unità di carburante utilizzate dalle transazioni nel blocco.
- Limite carburante: totale dei limiti di carburante stabiliti per le transazioni nel blocco.
- Dati aggiuntivi: ogni dato aggiuntivo che il miner ha incluso nel blocco.

**Dati avanzati**

- Hash: hash crittografico che rappresenta l'intestazione del blocco (identificatore univoco del blocco).
- Hash padre: hash del blocco precedente a quello attuale.
- Sha3Uncles: hash combinato di tutti i blocchi zio per un determinato blocco padre.
- StateRoot: hash root dell'albero di Merkel che conserva l'intero stato del sistema.
- Nonce: valore usato per dimostrare la proof-of-work per un blocco da parte del miner.

**Blocchi zio**

I blocchi zio vengono creati quando due miner creano blocchi più o meno simultaneamente. Solo un blocco può essere convalidato sui nodi. Non vengono inclusi ma ricevono comunque una ricompensa per il lavoro.

I block explorer forniscono informazioni sui blocchi zio come:

- Il numero di un blocco zio.
- L'orario in cui si sono verificati.
- L''altezza del blocco alla quale sono stati creati.
- Chi ne ha eseguito il mining.
- La ricompensa in ETH.

### Carburante {#gas}

I block explorer non forniscono informazioni solo sull'utilizzo del carburante nelle transazioni e nei blocchi, ma anche sui prezzi correnti del carburante nella rete. Questo può aiutare a capire l'utilizzo della rete, a inviare transazioni sicure e a non spendere più carburante del necessario. Cerca le API che possono aiutarti a ottenere queste informazioni nell'interfaccia del tuo prodotto. I dati riguardanti il carburante coprono:

- Le unità stimate di carburante necessarie per una transazione sicura ma lenta (+ prezzo stimato e durata).
- Le unità stimate di carburante necessarie per una transazione media (+ prezzo stimato e durata).
- Le unità stimate di carburante necessarie per una transazione veloce (+ prezzo stimato e durata).
- Tempo medio per la conferma basato sul prezzo del carburante.
- I contratti che consumano carburante, in altre parole prodotti popolari che sono molto utilizzati sulla rete.
- Account che stanno spendendo carburante, cioè gli utenti frequenti della rete.

### Transazioni {#transactions}

I block explorer sono diventati un punto di riferimento comune per tracciare l'andamento delle transazioni. Questo perché il livello di dettaglio che si può ottenere offre maggior certezza. I dati della transazione includono:

**Dati standard**

- Hash della transazione: un hash generato quando la transazione viene inviata.
- Stato: indicazione del fatto che la transazione sia in sospeso, non sia riuscita o sia stata completata.
- Blocco: blocco in cui la transazione è stata inclusa.
- Data/ora: ora in cui il miner ha effettuare il mining della transazione.
- Da: indirizzo dell'account che ha inviato la transazione.
- A: indirizzo del destinatario o dello Smart Contract con il quale interagisce la transazione.
- Token trasferiti: lista dei token che sono stati trasferiti come parte della transazione.
- Valore: valore totale degli ETH che vengono trasferiti.
- Commissione sulle transazioni: importo pagato al miner per elaborare la transazione (calcolato per prezzo del carburante\*carburante utilizzato).

**Dati avanzati**

- Limite carburante: numero massimo di unità di carburante che questa transazione può consumare.
- Carburante utilizzato: quantità effettiva di unità carburante che la transazione ha consumato.
- Prezzo carburante: prezzo fissato per unità di carburante.
- Nonce: numero di transazione per l'indirizzo `from` (tieni a mente che parte da 0, quindi un nonce di `100` significa che questa sarebbe la 101esima transazione inviata da questo account.
- Dati input: ogni informazione extra richiesta dalla transazione.

### Account {#accounts}

Ci sono molti dati relativi all'account ai quali puoi accedere. Ecco perché è spesso raccomandato utilizzare diversi account, così che le tue risorse e il valore non possano essere tracciati facilmente. Sono state sviluppate anche alcune soluzioni per rendere transazioni e attività dell'account più private. Ecco i dati che sono disponibili per gli account:

**Account utente**

- Indirizzo dell'account: indirizzo pubblico al quale si possono inviare fondi.
- Saldo ETH: ammontare di ETH associato all'account.
- Valore ETH totale: valore totale degli ETH.
- Token: i token associati all'account e il loro valore.
- Cronologia delle transazioni: elenco di tutte le transazioni nelle quali questo account è stato il mittente o il destinatario.

**Smart Contract**

Gli account Smart Contract hanno tutti i dati di un account utente, ma alcuni block explorer mostreranno anche alcune informazioni di codice. Ad esempio:

- Creatore contratto: indirizzo che ha distribuito il contratto alla rete principale.
- Transazione di creazione: transazione che ha incluso la distribuzione alla rete principale.
- Codice sorgente: codice Solidity o Vyper dello Smart Contract.
- ABI contratto: Application Binary Interface del contratto. Le chiamate che fa il contratto e i dati ricevuti.
- Codice creazione contratto: bytecode compilato dello Smart Contract, creato quando si compila uno Smart Contract scritto in Solidity o Vyper, ecc.
- Eventi contratto: cronologia dei metodi chiamati nello Smart Contract. In pratica un modo per vedere come il contratto viene utilizzato e quanto spesso.

### Token {#tokens}

I token sono un tipo di contratto, quindi hanno dati simili a quelli di uno Smart Contract. Ma siccome hanno un valore e possono essere scambiati, hanno dei dati aggiuntivi:

- Tipo: indica se si tratta di ERC-20, ERC-721 o un altro standard di token.
- Prezzo: se si tratta di ERC-20, hanno un valore corrente di mercato.
- Capitalizzazione di mercato: se sono token ERC-20, hanno una capitalizzazione di mercato (calcolata con prezzo\*quantità totale di token).
- Quantità totale: quantità totale di token in circolazione.
- Titolari: numero di indirizzi che contengono il token.
- Trasferimenti: numero di volte che il token è stato trasferito tra account.
- Cronologia transazioni: cronologia di tutte le transazioni che includono il token.
- Indirizzo contratto: indirizzo del token che è stato distribuito alla rete principale.
- Decimali: i token ERC-20 sono divisibili e hanno cifre decimali.

### Rete {#network}

Naturalmente ci sono alcuni dati che indicano la salute della rete. Sono abbastanza specifici del meccanismo di consenso proof-of-work di Ethereum. Quando Ethereum passerà a Eth2 alcuni di questi dati saranno ridondanti

- Difficoltà: l'attuale difficoltà di mining.
- Tasso di hash: stima di quanti hash sono stati generati dai miner di Ethereum tentando di risolvere il blocco corrente o un blocco specifico.
- Transazioni totali: numero di transazioni da quando Ethereum è stata creata.
- Transazioni al secondo: numero di transazioni elaborabili in un secondo.
- Prezzo ETH: quotazione attuale di 1 ETH.
- Quantità totale di ETH: numero di ETH in circolazione. Rricorda che nuovi ETH vengono creati con la creazione di ogni blocco, sotto forma di ricompensa.
- Capitalizzazione di mercato: capitalizzazione calcolata come prezzo\*quantità totale in circolazione.

## Dati di Eth2 {#consensus-layer-data}

Gli upgrade a Eth2 sono ancora in fase di sviluppo ma vale la pena parlare di alcuni dati che gli explorer saranno in grado di fornire. Di fatto, tutti questi dati sono già disponibili per le reti di prova.

Se non hai familiarità con Eth2, consulta la [nostra panoramica sugli aggiornamenti a Eth2](/upgrades/).

### Epoch {#epoch}

Il primo upgrade a Eth2, la Beacon Chain, creerà commissioni di validatori che vengono randomizzate alla fine di ogni epoca (ogni 6,4 minuti) per motivi di sicurezza. I dati dell'epoca includono:

- Numero dell'epoca.
- Stato finalizzato: se l'epoca è stata finalizzata (sì/no).
- Ora: ora in cui l'epoca è terminata.
- Attestazioni: numero di attestazioni nell'epoca (voti per i blocchi all'interno di slot).
- Depositi: numero dei depositi ETH inclusi nell'epoca (per diventare tali, i validatori devono mettere in staking ETH).
- Slashing: numero di penalità inflitte ai proponenti di blocchi o attestati.
- Partecipazione al voto: quantità di ETH in staking usati per attestare i blocchi.
- Validatori: numero di validatori attivi nell'epoca.
- Saldo medio validatori: saldo medio dei validatori attivi.
- Slot: numero di slot inclusi nell'epoca (gli slot includono un blocco valido).

### Slot {#slot}

Gli slot sono opportunità per la creazione di un blocco e i dati disponibili per ogni slot includono:

- Epoca: epoca nella quale lo slot è valido.
- Numero slot.
- Stato: stato dello slot (proposto/perso).
- Ora: data/ora dello slot.
- Propositore: validatore che ha proposto il blocco per lo slot.
- Radice blocco: hash-albero-radice del BeaconBlock.
- Radice padre: hash del blocco precedente.
- Radice stato: hash-albero-radice del BeaconState.
- Firma.
- Randao reveal.
- Graffiti: un proponente di un blocco può includere un messaggio di 32 byte alla sua proposta di blocco.
- Dati ETH1.
  - Hash del blocco.
  - Numero di depositi.
  - Radice deposito.
- Attestazioni: numero di attestazioni per il blocco in questo slot.
- Depositi: numero di depositi durante questo slot.
- Uscite volontarie: numero di validatori che hanno abbandonato durante lo slot.
- Slashing: numero di penalità date ai proponenti di blocchi o attestati.
- Voti: validatori che hanno votato per il blocco in questo slot.

### Blocchi {#blocks-1}

In Eth2 i blocchi funzionano diversamente perché i miner sono sostituiti da validatori e la Beacon Chain introduce slot ed epoche in Ethereum. Questo significa nuovi dati!

- Propositore: validatore che è stato scelto algoritmicamente per proporre il nuovo blocco.
- Epoca: epoca nella quale il blocco è stato proposto.
- Slot: slot nel quale il blocco è stato proposto.
- Attestazioni: numero di attestazioni incluse nello slot. Le attestazioni sono come voti che indicano che il blocco è pronto ad andare nella Beacon Chain.

### Validatori {#validators}

I validatori sono responsabili di proporre blocchi e attestarli all'interno degli slot.

- Numero validatore: numero unico che rappresenta il validatore.
- Saldo corrente: saldo del validatore, incluse le ricompense.
- Saldo effettivo: saldo del validatore che è stato usato per lo staking.
- Reddito: ricompense o penalità ricevute dal validatore.
- Stato: indica se il validatore è online e attivo.
- Efficacia attestazioni: tempo medio necessario perché le attestazioni del validatore vengano incluse nella catena.
- Idoneità per attivazione: data (ed epoca) nella quale il validatore è diventato disponibile per convalidare.
- Attivo da: Data (ed epoca) nella quale il validatore è diventato attivo.
- Blocchi proposti: il blocco che il validatore ha proposto.
- Attestazioni: attestazioni attestations che il validatore ha fornito.
- Depositi: indirizzo mittente, hash della transazione, numero del blocco, data/ora, importo e stato del deposito di staking fatto dal validatore.

### Attestazioni {#attestations}

Le attestazioni sono voti positivi per includere blocchi nella catena. I loro dati si riferiscono a un record dell'attestazione e ai validatori che hanno attestato

- Slot: slot in cui l'attestazione ha avuto luogo.
- Indice commissione: indice della commissione nello slot indicato.
- Bit aggregazione: rappresenta l'attestazione aggregata di tutti i validatori partecipanti nell'attestazione.
- Validatori: validatori che hanno fornito attestazioni.
- Radice blocco beacon: punta al blocco che i validatori stanno attestando.
- Origine: punta all'ultima epoca giustificata.
- Destinazione: punta alla fine dell'ultima epoca.
- Firma.

### Rete {#network-1}

I dati di primo livello di Eth2 comprendono quanto segue:

- Epoca attuale.
- Slot attuale.
- Validatori attivi: numero di validatori attivi.
- Validatori in sospeso: numero di validatori in attesa di essere attivati.
- ETH in staking: quantità di ETH in staking nella rete.
- Saldo medio: saldo medio di ETH medio dei validatori.

## Block explorer {#block-explorers}

- [Etherscan](https://etherscan.io/): un block explorer utilizzabile per recuperare dati per la rete principale Ethereum, la rete di test Ropsten, Kovan Testnet, Rinkeby Testnet e la rete di test Goerli.
- [Blockscout](https://blockscout.com/): si concentra sulle seguenti reti:
  - xDai: una combinazione intelligente di stablecoin DAI di MakerDAO e tecnologie POA sidechain e tokenbridge.
  - POA: sidechain e rete autonoma protetta da un gruppo di validatori attendibili. Tutti i validatori della rete sono United States notai degli Stati Uniti e le loro informazioni sono accessibili al pubblico.
  - Rete di test POA Sokol.
  - ARTIS: blockchain conforme a Ethereum.
  - [LUKSO L14](https://blockscout.com/lukso/l14): L14 funziona come prima rete di test, per consentire alla community LUKSO di programmare e testare su un'infrastruttura comune.
  - qDai.
- [Etherchain](https://www.etherchain.org/): block explorer per la rete principale Ethereum.
- [Ethplorer](https://ethplorer.io/): block explorer che si concentra sui token per la rete principale Ethereum e la rete di prova Kovan.
- [Blockchair](https://blockchair.com/ethereum): l'explorer Ethereum più privato. Anche per ordinare e filtrare dati (mempool).

## Block explorer Eth2 {#beacon-chain-block-explorers}

- [https://beaconcha.in/](https://beaconcha.in/)
- [https://beaconscan.com/](https://beaconscan.com/)
- [https://eth2stats.io/](https://eth2stats.io/medalla-testnet)

## Letture consigliate {#further-reading}

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
- [Transazioni](/developers/docs/transactions/)
- [Account](/developers/docs/accounts/)
- [Reti](/developers/docs/networks/)
