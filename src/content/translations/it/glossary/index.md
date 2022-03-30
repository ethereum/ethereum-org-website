---
title: Glossario di Ethereum
description: Glossario non esaustivo di termini tecnici e non relativi a Ethereum
lang: it
sidebar: true
sidebarDepth: 2
---

# Glossario {#ethereum-glossary}

<Divider />

## \# {#section-numbers}

### Attacco del 51% {#51-attack}

Tipo di attacco nei confronti di una [rete](#network) decentralizzata dove un gruppo ottiene il controllo della maggioranza dei [nodi](#node). Questa situazione permetterebbe di defraudare la blockchain, annullando le [transazioni](#transaction) e spendendo il doppio di [ether](#ether) e altri token.

## A {#section-a}

### conto {#account}

Oggetto contenente un [indirizzo](#address), saldo, [nonce](#nonce), e facoltativamente uno spazio di archiviazione e codice. Può essere un [account contratto](#contract-account) o un [account con proprietà esterna (EOA)](#eoa).

<DocLink to="/developers/docs/accounts">
  Account Ethereum
</DocLink>

### indirizzo {#address}

In generale, rappresenta un [EOA](#eoa) o un [contratto](#contract-accouint) che può ricevere (indirizzo di destinazione) o inviare (indirizzo di origine) [transazioni](#transaction) sulla blockchain. Più nello specifico, si tratta dei 160 bit più a destra di un [hash di Keccak](#keccak-256) di una [chiave pubblica](#public-key) [ECDSA](#ecdsa).

### interfaccia binaria dell'applicazione (ABI) {#abi}

Il metodo standard di interagire con i [contratti](#contract-account) nell'ecosistema di Ethereum, sia dall'esterno della blockchain che per le interazioni tra contratti.

<DocLink to="/developers/docs/smart-contracts/compiling/#web-applications">
  ABI
</DocLink>

### interfaccia di programmazione dell'applicazione {#api}

Un'interfaccia di programmazione dell'applicazione (API) è una serie di definizioni per l'utilizzo di un software. Un'API si trova tra un'applicazione e un server web e facilita il trasferimento di dati tra di essi.

### assert {#assert}

In [Solidity](#solidity), `assert(false)` viene compilata in `0xfe`, un opcode non valido che consuma tutto il [carburante](#gas) rimanente e annulla tutte le modifiche. Quando un'istruzione `assert()` fallisce, significa che sta avvenendo qualcosa di molto grave e imprevisto ed è necessario correggere il codice. Un'istruzione `assert()` va utilizzata per evitare condizioni che non dovrebbero verificarsi mai.

<DocLink to="/developers/docs/smart-contracts/security/">
  Sicurezza degli smart contract
</DocLink>

### attestazione {#attestation}

Il voto di un validatore per una [beacon chain](#beacon-chain) o un [blocco](#block) di [shard](#shard). I validatori devono attestare i blocchi, segnalando di acconsentire con lo stato proposto dal blocco.

<Divider />

## B {#section-b}

### Commissione base {#base-fee}

Ogni [blocco](#block) ha un prezzo di riserva noto come la "commissione base". È la commissione minima di [gas](#gas) che un utente deve pagare per inserire una transazione nel blocco successivo.

<DocLink to="/developers/docs/gas/">
  Carburante e commissioni
</DocLink>

### La beacon chain {#beacon-chain}

Un aggiornamento della rete che ha introdotto un nuovo livello di consenso, che diverrà il coordinatore dell'intera rete di Ethereum. Introduce il [Proof of Stake](#pos) e i [validatori](#validator) in Ethereum. Alla fine sarà fusa con la [rete principale](#mainnet).

<DocLink to="/upgrades/beacon-chain/">
  La beacon chain
</DocLink>

### big-endian {#big-endian}

Rappresentazione numerica posizionale dove la cifra più significativa è la prima in memoria. Opposto di little-endian, dove la cifra meno significativa è la prima.

### blocco {#block}

Raccolta di informazioni necessarie (intestazione di un blocco) sulle [transazioni](#transaction) incluse, e una serie di altre intestazioni di blocco dette [ommer](#ommer). I blocchi vengono aggiunti alla rete Ethereum dai [miner](#miner).

<DocLink to="/developers/docs/blocks/">
  Blocchi
</DocLink>

### blockchain {#blockchain}

In Ethereum, sequenza di [blocchi](#block) convalidati con il sistema [Proof of Work](#pow), ognuna collegata al proprio predecessore fino al [blocco genesi](#genesis-block). Non esiste un limite della dimensione del blocco, ma ci sono diversi [limiti per il carburante](#gas-limit).

<DocLink to="/developers/docs/intro-to-ethereum#what-is-a-blockchain">
  Cos'è una Blockchain?
</DocLink>

### bytecode {#bytecode}

Serie astratta di istruzioni progettata per essere eseguite in modo efficiente da un interprete software o una macchina virtuale. A differenza del codice sorgente leggibile dall'uomo, il bytecode è espresso in formato numerico.

### Diramazione Byzantium {#byzantium-fork}

La prima di due [diramazioni permanenti](#hard-fork) per la fase di sviluppo di [Metropolis](#metropolis). Includeva [bomba di difficoltà](#difficulty-bomb) il ritardo e la riduzione della ricompensa dei blocchi di EIP-649 Metropolis, dove l'[Ice Age](#ice-age) era stata ritardata di 1 anno e la ricompensa sul blocco era stata ridotta da 5 a 3 ether.

<Divider />

## C {#section-c}

### compilare {#compiling}

Convertire il codice scritto in un linguaggio di programmazione di alto livello (es. [Solidity](#solidity)) in un linguaggio di livello inferiore (es. [bytecode](#bytecode) di EVM).

<DocLink to="/developers/docs/smart-contracts/compiling/">
  Compilare Smart Contract
</DocLink>

### commissione {#committee}

Gruppo di almeno 128 [validatori](#validator) assegnato a beacon e blocchi shard casualmente dalla [beacon chain](#beacon-chain).

### consenso {#consensus}

Si verifica quando numerosi nodi (di solito la maggior parte dei nodi sulla rete) hanno tutti gli stessi blocchi nella migliore blockchain convalidata localmente. Da non confondere con le [regole di consenso](#consensus-rules).

### regole di consenso {#consensus-rules}

Le regole di convalida dei blocchi che i nodi completi seguono per mantenere il consenso con gli altri nodi. Da non confondere con il [consenso](#consensus).

### Diramazione Costantinopoli {#constantinople-fork}

Seconda parte della fase [Metropolis](#metropolis), originariamente prevista per la metà del 2018. Si prevedeva il passaggio a un algoritmo di consenso ibrido [Proof of Work](#pow)/[Proof of Stake](#pos), e altri cambiamenti.

### account contratto {#contract-account}

Account che contiene codice che viene eseguito ogni volta che viene ricevuta una [transazione](#transaction) da un altro [account](#account) ([EOA](#eoa) o [contratto](#contract-account)).

### transazione di creazione del contratto {#contract-creation-transaction}

[Transazione](#transaction) speciale, con [indirizzo zero](#zero-address) come destinatario, usata per registrare un [contratto](#contract-account) e memorizzarlo sulla blockchain Ethereum.

### reticolazione {#crosslink}

Una reticolazione fornisce un riepilogo dello stato di uno shard. È così che le catene di [shard](#shard) comunicheranno tra loro tramite la [Beacon Chain](#beacon-chain) nel [sistema di proof-of-stake](#proof-of-stake) frammentato.

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Proof of Stake
</DocLink>

<Divider />

## D {#section-d}

### Organizzazione Autonoma Decentralizzata (OAD) {#dao}

Società o altra organizzazione che opera senza gestione gerarchica. OAD potrebbe anche indicare un contratto denominato "The DAO" lanciato il 30 aprile 2016, che è stato poi violato a giugno 2016; questo ha giustificato in definitiva una [diramazione permanente](#hard-fork) (denominata OAD) al blocco 1.192.000 che ha annullato il contratto OAD violato e causato la divisione di Ethereum ed Ethereum Classic in due sistemi concorrenti.

<DocLink to="/dao/">
  Organizzazioni Autonome Decentralizzate (OAD)
</DocLink>

### dapp {#dapp}

Applicazione decentralizzata. Come minimo, uno [Smart Contract](#smart-contract) con un'interfaccia utente Web. Più in generale, una dapp è un'applicazione web creata sulla base di servizi di infrastruttura peer-to-peer, decentralizzati e aperti. Inoltre, molte dapp includono memoria decentralizzata e/o un protocollo e una piattaforma per messaggi.

<DocLink to="/developers/docs/dapps/">
  Introduzione alle dapp
</DocLink>

### scambio decentralizzato (DEX) {#dex}

Tipo di [dapp](#dapp) che permette di scambiare token con altri utenti allo stesso livello sulla rete. Per usarli servono degli [ether](#ether) (per pagare le [commissioni sulle transazioni](#transaction-fee)) ma non sono soggetti a restrizioni geografiche come gli scambi centralizzati. Tutti possono partecipare.

<DocLink to="/get-eth/#dex">
  Scambi decentralizzati
</DocLink>

### atto {#deed}

Vedi [token non fungibile (NFT)](#nft)

### DeFi {#defi}

Abbreviazione di "finanza decentralizzata", un'ampia categoria di [dapp](#dapp) mirate a fornire servizi finanziari supportati dalla blockchain, senza alcun intermediario, così che chiunque abbia una connessione a internet possa partecipare.

<DocLink to="/defi/">
  Finanza Decentralizzata (DeFi)
</DocLink>

### difficoltà {#difficulty}

Impostazione a livello della rete che controlla quanto calcolo è necessario per produrre una [Proof of Work](#pow).

### bomba di difficoltà {#difficulty-bomb}

Aumento esponenziale pianificato nell'impostazione di [difficoltà](#difficulty) di [proof-of-work](#pow) per motivare la transizione al [proof-of-stake](#pos), riducendo le possibilità di una [diramazione](#hard-fork)

### firma digitale {#digital-signatures}

Breve stringa di dati che un utente produce per un documento utilizzando una [chiave privata](#private-key) in modo tale che chiunque disponga della corrispondente [chiave pubblica](#public-key), della firma e del documento possa verificare che (1) il documento è stato "firmato" dal proprietario di quella chiave privata e (2) il documento non è stato modificato dopo essere stato firmato.

<Divider />

## E {#section-e}

### algoritmo di firma digitale della curva ellittica (ECDSA) {#ecdsa}

Algoritmo crittografico utilizzato da Ethereum per garantire che i fondi possano essere spesi solo dai loro proprietari. È il metodo preferito per la creazione di chiavi pubbliche e private. Rilevante per la generazione degli [indirizzi](#address) dell'account e per la verifica delle [transazioni](#transaction).

### epoca {#epoch}

Periodo di 32 [slot](#slot) (6,4 minuti) nel sistema coordinato [beacon chain](#beacon-chain). In ogni epoca, per motivi di sicurezza, le [commissioni](#committee) di [validatori](#validator) vengono cambiate. In ogni epoca c'è un'opportunità per [finalizzare](#finality) la catena.

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Proof of Stake
</DocLink>

### Proposta di miglioramento di Ethereum (EIP) {#eip}

Un documento progettuale che fornisce informazioni alla community Ethereum, descrivendo una nuova funzionalità proposta, i processi o l'ambiente (vedi [ERC](#erc)).

<DocLink to="/eips/">
  Introduzione alle EIP
</DocLink>

### Servizio del nome di Ethereum (ENS) {#ens}

Il registro ENS è un unico [contratto](#smart-contract) centrale che fornisce una mappatura tra nomi di dominio, proprietari e resolver, come descritto in [EIP](#eip) 137.

[Per saperne di più: ens.domains](https://ens.domains)

### entropia {#entropy}

Nel contesto della crittografia, mancanza di prevedibilità o livello di casualità. Durante la generazione di informazioni segrete, come le [chiavi private](#private-key), gli algoritmi si basano solitamente su una fonte di alta entropia per assicurarsi che l'output sia imprevedibile.

### account posseduto esternamente (EOA) {#eoa}

[Account](#account) creato da o per utenti della rete Ethereum.

### richiesta di commenti di Ethereum (ERC) {#erc}

Etichetta assegnata ad alcune [EIP](#eip) per tentare di definire uno standard specifico per l'uso di Ethereum.

<DocLink to="/eips/">
  Introduzione alle EIP
</DocLink>

### Ethash {#ethash}

Algoritmo [Proof of Work](#pow) per Ethereum 1.0.

[Per saperne di più: eth.wiki](https://eth.wiki/en/concepts/ethash/ethash)

### ether {#ether}

Criptovaluta nativa usata dall'ecosistema di Ethereum, che copre i costi del [carburante](#gas) per l'esecuzione delle transazioni. Indicata anche come ETH o con il simbolo Ξ, il carattere greco maiuscolo Xi.

<DocLink to="/eth/">
  Valuta del nostro futuro digitale
</DocLink>

### eventi {#events}

Consentono l'uso delle risorse di registrazione dell'[EVM](#evm). Le [dapp](#dapp) possono rimanere in attesa di eventi e usarli per innescare dei callback JavaScript nell'interfaccia utente.

<DocLink to="/developers/docs/smart-contracts/anatomy/#events-and-logs">
  Eventi e registri
</DocLink>

### Macchina virtuale Ethereum (EVM) {#evm}

Macchina virtuale basata su stack che esegue il [bytecode](#bytecode). In Ethereum, il modello di esecuzione specifica in che modo lo stato di sistema viene alterato in base a una serie di istruzioni bytecode e una piccola tupla di dati ambientali. È specificato tramite un modello formale di macchina a stati virtuale.

<DocLink to="/developers/docs/evm/">
  Macchina virtuale Ethereum
</DocLink>

### linguaggio assembly dell'EVM {#evm-assembly-language}

Modulo leggibile dall'uomo di [bytecode](#bytecode) dell'EVM.

<Divider />

## F {#section-f}

### funzione di ripiego {#fallback-function}

Funzione predefinita chiamata in assenza di dati o di un nome di funzione dichiarato.

### faucet {#faucet}

Servizio fornito tramite [Smart Contract](#smart-contract) che distribuisce fondi sotto forma di ether di prova gratuiti, utilizzabili su una rete di prova.

<DocLink to="/developers/docs/networks/#testnet-faucets">
  Faucet della rete di prova
</DocLink>

### finalità {#finality}

La finalità è la garanzia che una serie di transazioni non cambieranno né saranno annullate prima di un dato periodo.

<DocLink to="/developers/docs/consensus-mechanisms/pow/#finality">
  Finalità del Proof of Work
</DocLink>
<DocLink to="/developers/docs/consensus-mechanisms/pos/#finality">
  Finalità del Proof of Stake
</DocLink>

### finney {#finney}

Un taglio dell'[ether](#ether). 1 finney = 10<sup>15</sup> [wei](#wei). 10<sup>3</sup> finney = 1 ether.

### diramazione {#fork}

Cambio nel protocollo che causa la creazione di una catena alternativa o divergenza temporale in due percorsi potenziali di un blocco durante il mining.

### prova di frode {#fraud-proof}

Modello di sicurezza per determinate soluzioni di [livello 2](#layer-2) in cui, per aumentare la velocità, viene eseguito il [roll up](#rollups) delle transazioni in batch e poi queste ultime vengono inviate a Ethereum come una sola transazione. Sono considerate valide ma sono contestabili se si sospetta una frode. In questo caso, una prova di frode eseguirà la transazione per controllare se si sia effettivamente verificata una frode. Questo metodo aumenta la quantità di transazioni possibili mantenendo allo stesso tempo la sicurezza. Alcuni [rollup](#rollups) usano [prove di validità](#validity-proof).

<DocLink to="/developers/docs/scaling/layer-2-rollups/#optimistic-rollups">
  Rollup ottimistici
</DocLink>

### confine {#frontier}

Fase di sviluppo di test iniziale di Ethereum, durata dal luglio 2015 al marzo 2016.

<Divider />

## G {#section-g}

### carburante {#gas}

Carburante virtuale usato in Ethereum per eseguire gli Smart Contract. L'[EVM](#evm) usa un meccanismo di contabilità per misurare il consumo di carburante e limitare il consumo delle risorse informatiche (vedi [Turing completo](#turing-complete)).

<DocLink to="/developers/docs/gas/">
  Carburante e commissioni
</DocLink>

### limite di carburante {#gas-limit}

La massima quantità di [carburante](#gas) consumabile da una [transazione](#transaction) o da un [blocco](#block).

### blocco genesi {#genesis-block}

Il primo blocco in una [blockchain](#blockchain), usato per inizializzare una determinata rete e la sua criptovaluta.

### geth {#geth}

Go Ethereum. Una delle implementazioni più importanti del protocollo di Ethereum, scritta in Go.

[Per saperne di più: geth.ethereum.org](https://geth.ethereum.org/)

### gwei {#gwei}

Abbreviazione di gigawei, un taglio dell'[ether](#ether), comunemente usato per indicare il prezzo del [carburante](#gas). 1 gwei = 10<sup>9</sup> [wei](#wei). 10<sup>9</sup> gwei = 1 ether.

<Divider />

## H {#section-h}

### diramazione permanente {#hard-fork}

Divergenza permanente nella [blockchain](#blockchain); detta anche hard fork o hard-forking change. Si verifica comunemente quando i nodi non aggiornati non possono convalidare i blocchi creati dai nodi aggiornati che seguono le [regole di consenso](#consensus-rules) più recenti. Da non confondere con diramazione (fork), soft fork, software fork o Git fork.

### hash {#hash}

Fingerprint di lunghezza fissa di input di dimensione variabile, prodotto da una funzione hash. (Vedi [keccak-256](#keccak-256))

### portafoglio HD {#hd-wallet}

[Portafoglio](#wallet) che usa la creazione della chiave deterministica gerarchica (HD) e il protocollo di trasferimento.

[Per saperne di più: github.com](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### seed del portafoglio HD {#hd-wallet-seed}

Valore usato per generare la [chiave privata](#private-key) principale e il codice della catena principale per un [portafoglio](#wallet) HD. Il seed del portafoglio è rappresentabile con parole mnemoniche, in modo da facilitare la copia, il backup e il ripristino delle chiavi private.

### homestead {#homestead}

La seconda fase di sviluppo di Ethereum, lanciata nel marzo 2016 al blocco 1.150.000.

<Divider />

## I {#section-i}

### indice {#index}

Una struttura di rete pensata per ottimizzare l'interrogazione di informazioni da tutta la blockchain [](#blockchain) fornendo un percorso efficiente alla sua sorgente di archiviazione.

### Inter-exchange Client Address Protocol (ICAP) {#icap}

Codifica degli indirizzi Ethereum parzialmente compatibile con la codifica IBAN (International Bank Account Number), per offrire una codifica versatile, dotata di checksum e interoperabile per gli indirizzi Ethereum. Gli indirizzi ICAP usano un nuovo codice IBAN pseudo-nazionale, XE, che sta per "eXtended Ethereum", come nelle valute non giurisdizionali (es. XBT, XRP, XCP).

### Ice Age {#ice-age}

[Diramazione permanente](#hard-fork) di Ethereum al blocco 200.000 per introdurre un aumento esponenziale della [difficoltà](#difficulty) (o [bomba di difficoltà](#difficulty-bomb)), che motivi una transizione a passare al [Proof of Stake](#pos).

### ambiente di sviluppo integrato (IDE) {#ide}

Interfaccia utente che solitamente combina un editor di codice, un compilatore, un ambiente runtime e un debugger.

<DocLink to="/developers/docs/ides/">
  Ambienti di sviluppo integrati
</DocLink>

### problema del codice distribuito immutabile {#immutable-deployed-code-problem}

Una volta distribuito il codice di un [contratto](#smart-contract) (o di una [libreria](#library)), questo diventa immutabile. Le pratiche standard di sviluppo del software si basano sul poter risolvere possibili bug e aggiungere nuove funzionalità, quindi questo rappresenta una sfida per lo sviluppo degli Smart Contract.

<DocLink to="/developers/docs/smart-contracts/deploying/">
  Distribuzione di Smart Contract
</DocLink>

### transazione interna {#internal-transaction}

[Transazione](#transaction) inviata da un [account contratto](#contract-account) a un altro account dello stesso tipo o a un [EOA](#eoa) (vedi [messaggio](#message)).

<Divider />

## K {#section-k}

### funzione di derivazione della chiave (KDF) {#kdf}

Detta anche "algoritmo di allungamento della password", è usata dai formati [keystore](#keystore-file) come protezione contro attacchi di forza bruta, dictionary e rainbow table ai danni della crittografia di una passphrase, mediante continuo hashing della passphrase.

<DocLink to="/developers/docs/smart-contracts/security/">
  Sicurezza degli smart contract
</DocLink>

### keccak-256 {#keccak-256}

Funzione crittografica dell'[hash](#hash) usata in Ethereum. Keccak-256 è stata standardizzata come [SHA](#sha)-3.

### file keystore {#keystore-file}

File con codifica JSON che contiene una [chiave privata](#private-key) singola (generata casualmente), crittografata con passphrase per maggior sicurezza.

<Divider />

## L {#section-l}

### livello 2 {#layer-2}

Un'area di sviluppo incentrata sui miglioramenti stratificati sopra il protocollo Ethereum. Questi miglioramenti riguardano la velocità delle [transazioni](#transaction), l'importo delle [commissioni sulle transazioni](#transaction-fee) e la privacy delle transazioni.

<DocLink to="/developers/docs/scaling/layer-2-rollups/">
  Livello 2
</DocLink>

### LevelDB {#level-db}

Store open source chiave-valore su disco, implementato come [libreria](#library) leggera, con scopo singolo, e legami con molte piattaforme.

### libreria {#library}

Tipo speciale di [contratto](#smart-contract) privo di funzioni pagabili, funzione di ripiego?? e storage dati. Non può quindi ricevere o contenere ether né archiviare dati. Una libreria funge da codice distribuito precedentemente che altri contratti possono chiamare per calcoli in sola lettura.

<DocLink to="/developers/docs/smart-contracts/libraries/">
  Librerie degli Smart Contract
</DocLink>

### client leggero {#lightweight-client}

Client di Ethereum che non memorizza una copia locale della [blockchain](#blockchain) né convalida i blocchi e le [transazioni](#transaction). Offre le funzioni di un [portafoglio](#wallet) e può creare e trasmettere transazioni.

<Divider />

## M {#section-m}

### Rete principale {#mainnet}

In inglese mainnet, abbreviazione di "main network", è la [blockchain](#blockchain) Ethereum pubblica principale. ETH reali, valore reale e conseguenze reali. Viene detta livello 1 quando si parla di soluzioni per scalare al [livello 2](#layer-2). (Vedi anche [rete di prova](#testnet))

### Albero di Merkle Patricia {#merkle-patricia-tree}

Struttura dati usata in Ethereum per memorizzare in modo efficiente coppie chiave-valore.

### messaggio {#message}

[Transazione interna](#internal-transaction) mai serializzata e inviata solo all'interno dell'[EVM](#evm).

### chiamata di messaggio {#message-call}

Atto di passare un [messaggio](#message) da un account a un altro. Se l'account di destinazione è associato al codice dell'[EVM](#evm), la VM sarà avviata con lo stato di quell'oggetto e del messaggio che ha avviato l'azione.

### Metropolis {#metropolis}

Terza fase di sviluppo di Ethereum, lanciata nell'ottobre 2017.

### miner {#miner}

[Nodo](#node) della rete che trova [Proof of Work](#pow) validi per nuovi blocchi, tramite passaggi ripetuti di hashing (vedi [Ethash](#ethash)).

<DocLink to="/developers/docs/consensus-mechanisms/pow/mining/">
  Mining
</DocLink>

<Divider />

## N {#section-n}

### rete {#network}

In riferimento alla rete Ethereum, rete peer-to-peer che propaga le transazioni e i blocchi a ogni nodo di Ethereum (partecipante alla rete).

<DocLink to="/developers/docs/networks/">
  Reti
</DocLink>

### token non fungibile (NFT) {#nft}

Detto anche "atto" (deed), si tratta di uno standard token introdotto dalla proposta ERC-721. Gli NFT possono essere tracciati e scambiati, ma ogni token è unico e distinto; non sono intercambiabili come i [token ERC-20](#token-standard). Gli NFT possono rappresentare la proprietà delle risorse digitali o fisiche.

<DocLink to="/nft/">
  Token Non Fungibili (NFT)
</DocLink>
<DocLink to="/developers/docs/standards/tokens/erc-721/">
  Standard token non fungibile ERC-721
</DocLink>

### nodo {#node}

Software client che partecipa alla rete.

<DocLink to="/developers/docs/nodes-and-clients/">
  Nodi e client
</DocLink>

### nonce {#nonce}

In termini crittografici è un valore che può essere usato una volta sola. In Ethereum sono utilizzati due tipi di nonce: un nonce account è un contatore di transazioni in ogni account, che viene usato per impedire attacchi replay; un nonce [Proof of Work](#pow) è il valore casuale di un blocco che è stato utilizzato per soddisfare il [Proof of Work](#pow).

<Divider />

## O {#section-o}

### blocco ommer (zio) {#ommer}

Nel momento in cui un [miner](#miner) trova un [blocco](#block) valido, un altro miner potrebbe aver pubblicato un blocco concorrente e averlo aggiunto alla fine della blockchain. Questo blocco valido, ma non aggiornato, può essere incluso dai nuovi blocchi come _ommer_ e ricevere una ricompensa parziale per i blocchi. Il termine "ommer" è il termine preferito, neutro dal punto di vista del genere, per lo stesso livello di un blocco padre, ma a volte viene anche indicato come "zio".

### Optimistic rollup {#optimistic-rollup}

Un [rollup](#rollups) di transazioni che usa le [prove di frode](#fraud-proof) per offrire un maggiore volume di transazione del [livello 2](#layer-2) usando la sicurezza fornita dalla [Rete principale](#mainnet) (livello 1). A differenza di [Plasma](#plasma), una soluzione simile di livello 2, i rollup ottimistici possono gestire tipi di transazioni più complessi. Tutto ciò è possibile nell'[EVM](#evm). Hanno problemi di latenza rispetto ai [rollup cumulativo a conoscenza zero](#zk-rollups) perché una transazione può essere contestata tramite la prova di frode.

<DocLink to="/developers/docs/scaling/layer-2-rollups/#optimistic-rollups">
  Rollup ottimistici
</DocLink>

### Oracolo {#oracle}

Un oracolo è un ponte tra la blockchain [blockchain](#blockchain) e il mondo reale. Fungono da [API](#api) on-chain, che è possibile interrogare per informazioni e utilizzare negli [smart contract](#smart-contract).

<DocLink to="/developers/docs/oracles/">
  Oracoli
</DocLink>

<Divider />

## P {#section-p}

### parità {#parity}

Una delle implementazioni interoperabili più importanti del software client Ethereum.

### Plasma {#plasma}

Una soluzione di scaling?? esterna alla catena che usa le [prove di frode](#fraud-proof), come i [rollup ottimistici](#optimistic-rollups). Plasma è limitato a transazioni semplici, come trasferimenti e scambi basilari di token.

<DocLink to="/developers/docs/scaling/plasma">
  Plasma
</DocLink>

### chiave privata (chiave segreta) {#private-key}

Numero segreto che consente agli utenti di Ethereum di dimostrare la proprietà di un account o di un contratto, producendo una firma digitale (vedi [chiave pubblica](#public-key), [indirizzo](#address), [ECDSA](#ecdsa)).

### Proof-of-stake (PoS) {#pos}

Metodo con cui un protocollo blockchain di criptovalute mira a raggiungere il [consenso distribuito](#consensus). Il PoS?? chiede agli utenti di dimostrare la proprietà di una determinata quantità di criptovalute (la loro "stake", o quota, nella rete) per poter partecipare alla convalida delle transazioni.

<DocLink to="/developers/docs/consensus-mechanisms/pos/">
  Proof of Stake
</DocLink>

### Proof of Work (PoW) {#pow}

Informazioni (la prova) che richiedono calcoli significativi per essere trovate. In Ethereum, i [miner](#miner) devono trovare una soluzione numerica per l'algoritmo [Ethash](#ethash) che soddisfi una [difficoltà](#difficulty) specificata a livello di rete.

<DocLink to="/developers/docs/consensus-mechanisms/pow/">
  Proof of work
</DocLink>

### chiave pubblica {#public-key}

Numero ottenuto con una funzione unidirezionale da una [chiave privata](#private-key), che può essere condiviso pubblicamente e utilizzato da chiunque per verificare una firma digitale eseguita con la corrispondente chiave privata.

<Divider />

## R {#section-r}

### ricevuta {#receipt}

Dati restituiti da un client Ethereum per rappresentare il risultato di una particolare [transazione](#transaction), che includono un [hash](#hash) della transazione, il relativo numero di [blocco](#block), il quantitativo di [carburante](#gas) utilizzato e, in caso di distribuzione di uno [Smart Contract](#smart-contract), l'indirizzo [](#address) del contratto.

### attacco di reingresso {#re-entrancy-attack}

Attacco che consiste nella chiamata, da parte del contratto di un aggressore, alla funzione del contratto della vittima in modo che, durante l'esecuzione, la vittima chiami di nuovo il contratto dell'aggressore, in modo ricorsivo. Questo può causare, ad esempio, il furto di fondi perché vengono ignorate le parti del contratto della vittima che aggiornano i saldi o contano gli importi prelevati.

<DocLink to="/developers/docs/smart-contracts/security/#re-entrancy">
  Codice rientrante
</DocLink>

### ricompensa {#reward}

Quantità di ether inclusa in ogni nuovo blocco come ricompensa da parte della rete al [miner](#miner) che ha trovato la soluzione [Proof of Work](#pow).

### prefisso di lunghezza ricorsiva (RLP) {#rlp}

Standard di codifica progettato dagli sviluppatori di Ethereum per codificare e serializzare oggetti (strutture di dati) di complessità e lunghezza arbitrarie.

### rollup {#rollups}

Tipo di soluzione per il passaggio al [livello 2](#layer-2) che raggruppa più transazioni e le invia alla [catena principale Ethereum](#mainnet) in una sola transazione. Consente di ridurre i costi del [carburante](#gas) e di aumentare il volume delle [transazioni](#transaction). I rollup possono essere di tipo ottimistico e cumulativo a conoscenza zero. Utilizzano diversi metodi di sicurezza per offrire vantaggi in termini di scalabilità.

<DocLink to="/developers/docs/scaling/layer-2-rollups/">
  Rollup
</DocLink>

<Divider />

## S {#section-s}

### Serenity {#serenity}

La fase dello sviluppo di Ethereum che ha dato il via a una serie di aggiornamenti di scalabilità e sostenibilità, precedentemente nota come "Ethereum 2.0" o "Eth2".

<DocLink to="/upgrades/">
  Aggiornamenti di Ethereum
</DocLink>

### Secure Hash Algorithm (SHA) {#sha}

Famiglia di funzioni hash crittografiche pubblicata dal National Institute of Standards and Technology (NIST).

### shard/catena di shard {#shard}

Catena [Proof of Stake](#pos) coordinata dalla [beacon chain](#beacon-chain) e protetta dai [validatori](#validator). Ne saranno aggiunte 64 alla rete nell'ambito dell'aggiornamento della catena di shard. Le catene di shard offriranno un maggior volume di transazioni per Ethereum, fornendo dati aggiuntivi alle soluzioni del [livello 2](#layer-2), come i [rollup ottimistici](#optimistic-rollups) e i [rollup zero-knowledge](#zk-rollups).

<DocLink to="/upgrades/shard-chains">
  catene di shard
</DocLink>

### sidechain {#sidechain}

Una soluzione di scaling che usa una catena separata con [regole di consenso](#consensus-rules) differenti e spesso più veloci. Serve un ponte per connettere queste sidechain alla [Rete principale](#mainnet). I [rollup](#rollups) usano anche le sidechain, ma operano invece in collaborazione con la [Rete principale](#mainnet).

<DocLink to="/developers/docs/scaling/sidechains/">
  Sidechain
</DocLink>

### singleton {#singleton}

Termine appartenente al contesto di programmazione che descrive un oggetto di cui può esistere solo un'istanza.

### slot {#slot}

Periodo di tempo (12 secondi) in cui un nuovo blocco della [beacon chain](#beacon-chain) e della [catena di shard](#shard) può essere proposto da un [validatore](#validator) nel sistema [Proof of Stake](#pos). Uno slot può rimanere vuoto. 32 slot formano un'[epoca](#epoch).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Proof of Stake
</DocLink>

### smart contract {#smart-contract}

Programma eseguito sull'infrastruttura di calcolo Ethereum.

<DocLink to="/developers/docs/smart-contracts/">
  Introduzione agli Smart Contract
</DocLink>

### Solidity {#solidity}

Linguaggio di programmazione procedurale (imperativo) con sintassi simile a JavaScript, C++ o Java. Il linguaggio più popolare e più usato per gli [Smart Contract](#smart-contract) Ethereum. Creato dal dott. Gavin Wood.

<DocLink to="/developers/docs/smart-contracts/languages/#solidity">
  Solidity
</DocLink>

### Assembly inline Solidity {#solidity-inline-assembly}

Linguaggio assembly dell'[EVM](#evm) in un programma [Solidity](#solidity). Il supporto di Solidity per l'assembly inline facilita la scrittura di determinate operazioni.

### Spurious Dragon {#spurious-dragon}

[Diramazione permanente](#hard-fork) della blockchain Ethereum, che si è verificata al blocco 2.675,000 per affrontare più vettori di attacco denial-of-service e cancellare lo stato (vedi [Tangerine Whistle](#tangerine-whistle)). È anche un meccanismo di protezione contro gli attacchi replay (vedi [nonce](#nonce)).

### stablecoin {#stablecoin}

Token [ERC-20](#token-standard) con un valore ancorato al valore di un'altra risorsa. Ci sono stablecoin supportati da valute legali come dollari, metalli preziosi come l'oro e altre criptovalute, come i Bitcoin.

<DocLink to="/eth/#tokens">
  ETH non è l'unica criptovaluta su Ethereum
</DocLink>

### staking {#staking}

Depositare una quantità di [ether](#ether) (lo stake) per diventare validatore e proteggere la [rete](#network). Un validatore controlla [transazioni](#transaction) e propone [blocchi](#block) secondo un modello di consenso [Proof of Stake](#pos). Lo staking dà un incentivo economico per agire nel miglior interesse della rete. Si ottengono ricompense per svolgere i compiti di [validatore](#validator), ma si perdono quantità variabili di ETH se non si svolgono tali compiti.

<DocLink to="/staking/">
  Fai staking con i tuoi ETH per diventare validatore di Ethereum
</DocLink>

### canali di stato {#state-channels}

Soluzione di [livello 2](#layer-2) in cui un canale è configurato tra i partecipanti per eseguire transazioni liberamente e in modo economico. Solo una [transazione](#transaction) per configurare il canale e chiudere il canale è inviata alla [Rete principale](#mainnet). Questo consente un volume di transazioni molto elevato, ma richiede di conoscere il numero di partecipanti in anticipo e di bloccare i fondi.

<DocLink to="/developers/docs/scaling/state-channels/#state-channels">
  Canali di stato
</DocLink>

### szabo {#szabo}

Un taglio dell'[ether](#ether). 1 szabo = 10<sup>12</sup> [wei](#wei), 10<sup>6</sup> szabo = 1 ether.

<Divider />

## T {#section-t}

### Tangerine Whistle {#tangerine-whistle}

Una [diramazione permanente](#hard-fork) della blockchain Ethereum, che si è verificata al blocco 2,463,000 per modificare il calcolo del [carburante](#gas) per alcune operazioni I/O ad alta intensità e per eliminare lo stato accumulato da un attacco denial-of-service, che ha sfruttato il basso costo di tali operazioni.

### rete di prova {#testnet}

Abbreviazione di "rete di prova", una rete usata per simulare il comportamento della rete principale di Ethereum (vedi [Rete principale](#mainnet)).

<DocLink to="/developers/docs/networks/#testnets">
  Reti di prova
</DocLink>

### standard token {#token-standard}

Introdotto dalla proposta ERC-20, offre una struttura standardizzata per [Smart Contract](#smart-contract) per i token fungibili. I token dello stesso contratto sono tracciabili, scambiabili e intercambiabili, a differenza degli [NFT](#nft).

<DocLink to="/developers/docs/standards/tokens/erc-20/">
  Standard token ERC-20
</DocLink>

### transazione {#transaction}

Dati salvati nella blockchain Ethereum firmati da un [account](#account) di origine, che puntano a un [indirizzo](#address) specifico. La transazione contiene metadati come il [limite di carburante](#gas-limit) per la transazione.

<DocLink to="/developers/docs/transactions/">
  Transazioni
</DocLink>

### commissione sulle transazioni {#transaction-fee}

Commissione da pagare ogni volta che si usa la rete Ethereum. Esempi includono l'invio di fondi da un [portafoglio](#wallet) o un'interazione con una [dapp](#dapp), come lo scambio di token o l'acquisto di un oggetto collezionabile. Può essere paragonata a una commissione di servizio, e cambia in base a quanto è congestionata la rete, perché i [miner](#miner), cioè i responsabili dell'elaborazione della transazione, danno verosimilmente priorità alle transazioni con commissioni più elevate, quindi la congestione fa salire il prezzo.

A livello tecnico, la commissione sulle transazioni fa riferimento a quanto [carburante](#gas) richiede la transazione.

La riduzione delle commissioni sulle transazioni è un argomento caldo in questo momento. Vedi [livello 2](#layer-2)

### Turing completo {#turing-complete}

Concetto che prende il nome dal matematico e informatico inglese Alan Turing. Un sistema di regole per la manipolazione dei dati (come un set di istruzioni per computer, un linguaggio di programmazione o un automa cellulare) è detto "Turing completo" o "universale dal punto di vista computazionale" se può essere utilizzato per simulare qualsiasi macchina di Turing.

<Divider />

## V {#section-v}

### validatore {#validator}

[Nodo](#node) in un sistema [Proof of Stake](#pos) responsabile della memorizzazione dei dati, dell'elaborazione delle transazioni e dell'aggiunta di nuovi blocchi alla blockchain. Per attivare il software di validatore, è necessario essere in grado di fare [staking](#staking) con 32 ETH.

<DocLink to="/developers/docs/consensus-mechanisms/pos">
  Proof of Stake
</DocLink>
<DocLink to="/staking/">
  Staking in Ethereum
</DocLink>

### prova di validità {#validity-proof}

Modello di sicurezza per determinate soluzioni di [livello 2](#layer-2) in cui, per aumentare la velocità, viene eseguito il [rollup](/#rollups) delle transazioni in batch e poi queste ultime vengono inviate a Ethereum come una sola transazione. Il calcolo della transazione viene effettuato esternamente alla catena e poi fornito alla catena principale con una prova di validità. Questo metodo aumenta la quantità di transazioni possibili mantenendo allo stesso tempo la sicurezza. Alcuni [rollup](#rollups) usano [prove di frode](#fraud-proof).

<DocLink to="/developers/docs/scaling/layer-2-rollups/#zk-rollups">
  Rollup cumulativo a conoscenza zero
</DocLink>

### Validium {#validium}

Una soluzione esterna alla catena che usa le [prove di validità](#validity-proof) per migliorare il volume delle transazioni. A differenza dei [rollup a conoscenza zero](#zk-rollup), i dati di Validium non sono archiviati sulla [Rete principale](#mainnet) (livello 1).

<DocLink to="/developers/docs/scaling/validium/">
  Validium
</DocLink>

### Vyper {#vyper}

Linguaggio di programmazione di alto livello con sintassi simile a Python. Pensato per avvicinarsi a un linguaggio funzionale puro. Creato da Vitalik Buterin.

<DocLink to="/developers/docs/smart-contracts/languages/#vyper">
  Vyper
</DocLink>

<Divider />

## W {#section-w}

### portafoglio {#wallet}

Software che contiene [chiavi private](#private-key). Utilizzato per accedere agli [account](#account), permetterne il controllo e interagire con gli [Smart Contract](#smart-contract). Per migliorare la sicurezza, le chiavi non devono essere memorizzate in un portafoglio, ma possono essere recuperate offline (ad esempio da una scheda di memoria o su carta). Nonostante il nome, i portafogli non contengono mai le monete o i token reali.

<DocLink to="/wallets/">
  Portafogli di Ethereum
</DocLink>

### Web3 {#web3}

Terza versione del Web. Proposto per la prima volta dal dott. Gavin Wood, il Web3 rappresenta una nuova visione per le applicazioni web: dalle applicazioni centralizzate e gestite, alle applicazioni create sulla base di protocolli decentralizzati (vedi [dapp](#dapp)).

<DocLink to="/developers/docs/web2-vs-web3/">
  Confronto tra Web2 e Web3
</DocLink>

### wei {#wei}

Il taglio più piccolo dell'[ether](#ether). 10<sup>18</sup> wei = 1 ether.

<Divider />

## Z {#section-z}

### indirizzo zero {#zero-address}

Indirizzo Ethereum speciale, composto interamente da zeri, specificato come indirizzo di destinazione di una [transazione di creazione del contratto](#contract-creation-transaction).

### Rollup cumulativo a conoscenza zero {#zk-rollup}

Un [rollup](#rollups) di transazioni che usa le [prove di validità](#validity-proof) per offrire un maggiore volume di transazioni del [livello 2](#layer-2) usando la sicurezza fornita dalla [Rete principale](#mainnet) (livello 1). Anche se non sono in grado di gestire tipi di transazioni complessi, come i [rollup ottimistici](#optimistic-rollups), non hanno problemi di latenza perché la validità delle transazioni è già dimostrata quando vengono inviate.

<DocLink to="/developers/docs/scaling/layer-2-rollups/#zk-rollups">
  Rollup cumulativo a conoscenza zero
</DocLink>

<Divider />

## Fonti {#sources}

_Fornito in parte da [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook) di [Andreas M. Antonopoulos, Gavin Wood](https://ethereumbook.info) con CC-BY-SA_

<Divider />

## Contribuisci a questa pagina {#contribute-to-this-page}

Manca qualcosa? Hai trovato errori? Aiutaci a migliorare contribuendo a questo glossario su GitHub!

[Maggiori informazioni su come contribuire](/contributing/adding-glossary-terms)
