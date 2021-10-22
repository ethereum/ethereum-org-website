---
title: Glossario di Ethereum
description: Glossario non esaustivo di termini tecnici e non relativi a Ethereum
lang: it
sidebar: true
sidebarDepth: 2
---

# Glossario {#ethereum-glossary}

<Divider />

## # {#section-numbers}

### Attacco del 51% {#51-attack}

Tipo di attacco nei confronti di una [rete](#network) decentralizzata dove un gruppo ottiene il controllo della maggioranza dei [nodi](#node). Questa situazione permetterebbe di defraudare la blockchain, annullando le [transazioni](#transaction) e spendendo il doppio di [ether](#ether) e altri token.

## A {#section-a}

### account {#account}

Oggetto contenente un [indirizzo](#address), saldo, [nonce](#nonce), e facoltativamente uno spazio di archiviazione e codice. Può essere un [account contratto](#contract-account) o un [account con proprietà esterna (EOA)](#eoa).

<DocLink to="/developers/docs/accounts" title="Account Ethereum" />

### indirizzo {#address}

Generalmente, rappresenta un [EOA](#eoa) o un [contratto](#contract-accouint) che può ricevere (indirizzo di destinazione) o inviare (indirizzo di origine) [transazioni](#transaction) sulla blockchain. Più nello specifico, si tratta dei 160 bit più a destra di un [hash di Keccak](#keccak-256) di una [chiave pubblica](#public-key) [ECDSA](#ecdsa).

### assert {#assert}

In [Solidity](#solidity), `assert(false)` viene compilata in `0xfe`, un opcode non valido che usa tutto il [carburante](#gas) rimanente e annulla tutte le modifiche. Quando un'istruzione `assert()` fallisce, avviene qualcosa di molto sbagliato e imprevisto ed è necessario correggere il codice. Devi usare `assert()` per evitare condizioni che non dovrebbero verificarsi mai.

<DocLink to="/developers/docs/security/" title="Sicurezza" />

### attestazione {#attestation}

Il voto di un validatore per una [beacon chain](#beacon-chain) o [blocco](#block) dello [shard](#shard). I validatori devono attestare i blocchi, segnalando che acconsentono allo stato proposto dal blocco.

<Divider />

## B {#section-b}

### beacon chain {#beacon-chain}

Aggiornamento a Eth2 che diventerà il coordinatore della rete Ethereum. Introduce la [Proof of Stake](#proof-of-stake) e i [validatori](#validator) in Ethereum. Alla fine sarà unita con la [rete principale](#mainnet).

<DocLink to="/eth2/beacon-chain/" title="Beacon chain" />

### big-endian {#big-endian}

Rappresentazione numerica posizionale dove la cifra più significativa è la prima in memoria. Opposto di little-endian, dove la cifra meno significativa è la prima.

### blocco {#block}

Raccolta di informazioni necessarie (intestazione di un blocco) sulle [transazioni](#transaction) incluse e una serie di altre intestazioni di blocco note come [ommer](#ommer). I blocchi vengono aggiunti alla rete Ethereum dai [miner](#miner).

<DocLink to="/developers/docs/blocks/" title="Blocchi" />

### blockchain {#blockchain}

In Ethereum, sequenza di [blocchi](#block) convalidati dal sistema [Proof of Work](#pow), ognuna collegata al proprio predecessore fino al [blocco genesi](#genesis-block). Non esiste un limite della dimensione del blocco, ma ci sono diversi [limiti per il carburante](#gas-limit).

<DocLink to="/developers/docs/intro-to-ethereum#what-is-a-blockchain" title="Cos'è una Blockchain?" />

### bytecode {#bytecode}

Serie astratta di istruzioni progettata per l'esecuzione efficiente da parte di un interprete software o una macchina virtuale. A differenza del codice sorgente leggibile dall'uomo, il bytecode è espresso in formato numerico.

### Diramazione Byzantium {#byzantium-fork}

La prima di due [diramazioni permanenti](#hard-fork) per la fase di sviluppo di [Metropolis](#metropolis). Includeva EIP-649 Metropolis [Difficulty Bomb](#difficulty-bomb) Delay e Block Reward Reduction, dove l'[Era Glaciale](#ice-age) era stata ritardata di 1 anno e la ricompensa sul blocco era stata ridotta da 5 a 3 ether.

<Divider />

## C {#section-c}

### compilare {#compiling}

Convertire il codice scritto in un linguaggio di programmazione di alto livello (es. [Solidity](#solidity)) in un linguaggio di livello inferiore (es. [bytecode](#bytecode) di EVM).

<DocLink to="/developers/docs/smart-contracts/compiling/" title="Compilare Smart Contract" />

### commissione {#committee}

Gruppo di almeno 128 [validatori](#validator) assegnato a beacon e shard block casualmente dalla [beacon chain](#beacon-chain).

### consenso {#consensus}

Si verifica quando numerosi nodi (di solito la maggior parte dei nodi sulla rete) hanno tutti gli stessi blocchi nella migliore blockchain convalidata localmente. Da non confondere con le [regole di consenso](#consensus-rules).

### regole di consenso {#consensus-rules}

Le regole di convalida del blocco che i nodi completi seguono per mantenere il consenso con gli altri nodi. Da non confondere con il [consenso](#consensus).

### Diramazione Costantinople {#constantinople-fork}

Seconda parte della fase [Metropolis](#metropolis), originariamente pianificata per la metà del 2018. Si prevedeva il passaggio a un algoritmo di consenso ibrido [Proof of Work](#pow)/[Proof of Stake](#pos), tra gli altri cambiamenti.

### account contratto {#contract-account}

Account che contiene codice che viene eseguito ogni volta che viene ricevuta una [transazione](#transaction) da un altro [account](#account) ([EOA](#eoa) o [contratto](#contract-account)).

### transazione per la creazione di un contratto {#contract-creation-transaction}

[Transazione](#transaction) speciale, con [indirizzo zero](#zero-address) come destinatario, usata per registrare un [contratto](#contract-account) e memorizzarlo sulla blockchain Ethereum.

### crosslink {#crosslink}

Un crosslink fornisce un riepilogo dello stato di uno shard. È così che le catene [shard](#shard) comunicheranno tra di loro attraverso la [beacon chain](#beacon-chain) nel [sistema Proof of Stake](#proof-of-stake) a shard.

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work" title="Proof of Stake" />

<Divider />

## D {#section-d}

### Decentralized Autonomous Organization (DAO) {#dao}

Azienda o altra organizzazione che opera senza gestione gerarchica. DAO potrebbe anche riferirsi a un contratto denominato "The DAO" lanciato il 30 aprile 2016, che fu poi hackerato a giugno 2016; questo motivò alla fine una [diramazione permanente](#hard-fork) (denominata DAO) al blocco 1.192.000 che invertì il contratto DAO hackerato e causò la divisione di Ethereum ed Ethereum Classic in due sistemi concorrenti.

<DocLink to="/community/#decentralized-autonomous-organizations-daos" title="Organizzazioni Autonome Decentralizzate (DAO)" />

### dapp {#dapp}

Applicazione decentralizzata. È almeno uno [Smart Contract](#smart-contract) con un'interfaccia utente Web. Più in generale, una dapp è un'applicazione Web creata sulla base di servizi di infrastruttura peer-to-peer, decentralizzati e aperti. Inoltre, molte dapp includono memoria decentralizzata e/o un protocollo e una piattaforma per messaggi.

<DocLink to="/developers/docs/dapps/" title="Introduzione alle dapp" />

### scambio decentralizzato (DEX) {#dex}

Tipo di [dapp](#dapp) che permette di scambiare token con altri utenti allo stesso livello sulla rete. Per l'uso servono [ether](#ether) (per pagare le [commissioni sulle transazioni](#transaction-fee)) ma non sono soggetti a restrizioni geografiche come gli scambi centralizzati. Tutti possono partecipare.

<DocLink to="/get-eth/#dex" title="Scambi decentralizzati" />

### atto notarile {#deed}

Vedi [token non fungibile (NFT)](#nft)

### defi {#defi}

Abbreviazione di "finanza decentralizzata", una vasta categoria di [dapp](#dapp) che mirano a fornire servizi finanziari supportati dalla blockchain, senza alcun intermediario, a cui può partecipare chiunque abbia una connessione Internet.

<DocLink to="/dapps/#explore" title="Dapp defi" />

### difficoltà {#difficulty}

Impostazione a livello della rete che controlla quanto calcolo è necessario per produrre una [Proof of Work](#pow).

### bomba di difficoltà {#difficulty-bomb}

Aumento esponenziale pianificato della [difficoltà](#difficulty) della [Proof of Work](#pow) impostata per motivare la transizione alla [Proof of Stake](#pos), riducendo i cambiamenti di una [diramazione](#hard-fork)

### firma digitale {#digital-signatures}

Breve stringa di dati che un utente produce per un documento utilizzando una [chiave privata](#private-key) in modo tale che chiunque disponga della corrispondente [chiave pubblica](#public-key), della firma e del documento possa verificare che (1) il documento è stato "firmato" dal proprietario di quella chiave privata e (2) il documento non è stato modificato dopo essere stato firmato.

<Divider />

## E {#section-e}

### algoritmo di firma digitale con curva ellittica (ECDSA) {#ecdsa}

Algoritmo crittografico utilizzato da Ethereum per garantire che i fondi possano essere spesi solo dai loro proprietari.

### epoca {#epoch}

Periodo di 32 [slot](#slot) (6,4 minuti) nel sistema coordinato [beacon chain](#beacon-chain). In ogni epoca, per motivi di sicurezza, le [commissioni](#committee) di [validatori](#validator) vengono cambiate. In ogni epoca c'è un'opportunità per [finalizzare](#finality) la catena.

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work" title="Proof of Stake" />

### Proposta di miglioramento di Ethereum (EIP) {#eip}

Un documento di progettazione che fornisce informazioni alla community Ethereum, descrivendo una nuova funzionalità proposta, i processi o l'ambiente (vedi [ERC](#erc)).

<DocLink to="/eips/" title="Introduzione alle EIP" />

### Servizio dei nomi Ethereum (ENS) {#ens}

Il registro ENS è un unico [contract](#smart-contract) centrale che fornisce una mappatura tra nomi di dominio, proprietari e resolver, come descritto in [EIP](#eip) 137.

[Ulteriori informazioni su github.com](https://github.com/ethereum/ens)

### entropia {#entropy}

Nel contesto della crittografia, mancanza di prevedibilità o livello di casualità. Durante la generazione di informazioni segrete, come [chiavi private](#private-key), gli algoritmi si basano solitamente su una fonte di alta entropia per assicurarsi che l'output sia imprevedibile.

### account di proprietà esterna (EOA) {#eoa}

[Account](#account) creato da o per utenti della rete Ethereum.

### richiesta di commenti Ethereum (ERC) {#erc}

Etichetta assegnata ad alcune [EIP](#eip) per tentare di definire uno standard specifico per l'uso di Ethereum.

<DocLink to="/eips/" title="Introduzione alle EIP" />

### Ethash {#ethash}

Algoritmo [Proof of Work](#pow) per Ethereum 1.0.

[Per saperne di più: https://eth.wiki/](https://eth.wiki/en/concepts/ethash/ethash)

### ether {#ether}

Criptovaluta nativa usata dall'ecosistema di Ethereum, che copre i costi del [carburante](#gas) per l'esecuzione delle transazioni. Indicata anche come ETH o con il simbolo Ξ, il carattere greco maiuscolo Xi.

<DocLink to="/eth/" title="Valuta per il nostro futuro digitale" />

### eventi {#events}

Consentono l'uso delle risorse di registrazione dell'[EVM](#evm). Le [dapp](#dapp) possono rimanere in attesa di eventi e usarli per innescare callback JavaScript nell'interfaccia utente.

<DocLink to="/developers/docs/smart-contracts/anatomy/#events-and-logs" title="Eventi e registri" />

### macchina virtuale Ethereum (EVM) {#evm}

Macchina virtuale basata su stack che esegue il [bytecode](#bytecode). In Ethereum, il modello di esecuzione specifica in che modo lo stato di sistema viene alterato in base a una serie di istruzioni bytecode e una piccola tupla di dati ambientali. È specificato tramite un modello formale di macchina a stati virtuale.

<DocLink to="/developers/docs/evm/" title="Macchina virtuale Ethereum" />

### linguaggio assembly dell'EVM {#evm-assembly-language}

Modulo leggibile dall'uomo di [bytecode](#bytecode) dell'EVM.

<Divider />

## F {#section-f}

### funzione fallback {#fallback-function}

Funzione predefinita chiamata in assenza di dati o di un nome di funzione dichiarato.

### faucet {#faucet}

Servizio fornito tramite [Smart Contract](#smart-contract) che dispensa fondi sotto forma di ether di test gratuiti, utilizzabili su una rete di prova.

<DocLink to="/developers/docs/networks/#testnet-faucets" title="Faucet della rete di prova" />

### finalità {#finality}

La finalità è la garanzia che una serie di transazioni prima di un dato periodo non cambieranno né saranno annullate.

<DocLink to="/developers/docs/consensus-mechanisms/pow/#finality" title="Finalità della Proof of Work" /> <DocLink to="/developers/docs/consensus-mechanisms/pos/#finality" title="Finalità della Proof of Stake" />

### finney {#finney}

Un taglio dell'[ether](#ether). 1 finney = 10<sup>15</sup> [wei](#wei). 10<sup>3</sup> finney = 1 ether.

### diramazione {#fork}

Cambio nel protocollo che causa la creazione di una catena alternativa o divergenza temporale in due percorsi potenziali di un blocco durante il mining.

### prova di frode {#fraud-proof}

Modello di sicurezza per determinate soluzioni di [livello 2](#layer-2) in cui, per aumentare la velocità, viene eseguito il [roll up](#rollups) delle transazioni in batch e poi queste ultime vengono inviate a Ethereum come una sola transazione. Sono considerate valide ma sono contestabili se si sospetta una frode. In questo caso, una prova di frode eseguirà la transazione per controllare se si sia effettivamente verificata una frode. Questo metodo aumenta la quantità di transazioni possibili mantenendo la sicurezza. Alcuni [rollup](#rollups) usano [prove di validità](#validity-proof).

<DocLink to="/developers/docs/layer-2-scaling/#optimistic-rollups" title="Optimistic rollup" />

### frontiera {#frontier}

Fase di sviluppo di test iniziale di Ethereum, che durò dal luglio 2015 al marzo 2016.

<Divider />

## G {#section-g}

### carburante {#gas}

Carburante virtuale usato in Ethereum per eseguire gli Smart Contract. L'[EVM](#evm) usa un meccanismo di contabilità per misurare il consumo di carburante e limitare il consumo delle risorse informatiche (vedi [Turing completo](#turing-complete)).

<DocLink to="/developers/docs/gas/" title="Carburante e commissioni" />

### limite di carburante {#gas-limit}

La massima quantità di [carburante](#gas) consumabile da una [transazione](#transaction) o da un [blocco](#block).

### blocco genesi {#genesis-block}

Il primo blocco in una [blockchain](#blockchain), usato per inizializzare una determinata rete e la sua criptovaluta.

### geth {#geth}

Go Ethereum. Una delle implementazioni più prominenti del protocollo di Ethereum, scritta in Go.

[Leggi di più su geth.ethereum.org](https://geth.ethereum.org/)

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

[Leggi di più su github.com](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### seed del portafoglio HD {#hd-wallet-seed}

Valore usato per generare la [chiave privata](#private-key) principale e il codice della catena principale per un [portafoglio](#wallet) HD. Il seed del portafoglio è rappresentabile con parole mnemoniche, in modo da facilitare la copia, il backup e il ripristino delle chiavi private.

### homestead {#homestead}

La seconda fase di sviluppo di Ethereum, lanciata nel marzo 2016 al blocco 1.150.000.

<Divider />

## I {#section-i}

### Inter-exchange Client Address Protocol (ICAP) {#icap}

Codifica degli indirizzi Ethereum parzialmente compatibile con la codifica IBAN (International Bank Account Number), per offrire una codifica versatile, dotata di checksum e interoperabile per gli indirizzi Ethereum. Gli indirizzi ICAP usano un nuovo codice IBAN pseudo-nazionale, XE, che sta per "eXtended Ethereum", come si usa nelle valute non giurisdizionali (es. XBT, XRP, XCP).

### era glaciale (Ice Age) {#ice-age}

[Diramazione permanente](#hard-fork) di Ethereum al blocco 200.000 per introdurre un aumento esponenziale della [difficoltà](#difficulty) (o [bomba di difficoltà](#difficulty-bomb)), che motivi una transizione a passare al [Proof of Stake](#pos).

### ambiente di sviluppo integrato (IDE) {#ide}

Interfaccia utente che tipicamente combina un editor di codice, un compilatore, un ambiente runtime e un debugger.

<DocLink to="/developers/docs/ides/" title="Ambienti di sviluppo integrati" />

### problema del codice distribuito immutabile {#immutable-deployed-code-problem}

Una volta distribuito il codice di un [contratto](#smart-contract) (o di una [libreria](#library)), questo diventa immutabile. Le pratiche di sviluppo standard del software si basano sul poter risolvere possibili bug e aggiungere nuove funzionalità, quindi questo rappresenta una sfida per lo sviluppo degli Smart Contract.

<DocLink to="/developers/docs/smart-contracts/deploying/" title="Distribuzione di Smart Contract" />

### transazione interna {#internal-transaction}

[Transazione](#transaction) inviata da un [account contratto](#contract-account) a un altro account dello stesso tipo o a un [EOA](#eoa) (vedi [messaggio](#message)).

<Divider />

## K {#section-k}

### funzione di derivazione della chiave (KDF) {#kdf}

Detta anche "algoritmo di allungamento della password", è usata dai formati [keystore](#keystore-file) per proteggere contro attacchi di forza bruta, dictionary e rainbow table ai danni della crittografia di una passphrase, mediante continuo hashing della passphrase.

<DocLink to="/developers/docs/security/" title="Sicurezza" />

### keccak-256 {#keccak-256}

Funzione crittografica dell'[hash](#hash) usata in Ethereum. Keccak-256 è stata standardizzata come [SHA](#sha)-3.

### file keystore {#keystore-file}

File con codifica JSON che contiene una [chiave privata](#private-key) singola (generata casualmente), crittografata con passphrase per maggior sicurezza.

<Divider />

## L {#section-l}

### livello 2 {#layer-2}

Area di sviluppo incentrata sui miglioramenti alla stratificazione, in base al protocollo Ethereum. Questi miglioramenti riguardano la velocità delle [transazioni](#transaction), l'importo delle [commissioni sulle transazioni](#transaction-fee) e la privacy delle transazioni.

<DocLink to="/developers/docs/layer-2-scaling/" title="Livello 2" />

### LevelDB {#level-db}

Store open source chiave-valore su disco, implementato come [libreria](#library) leggera, con scopo singolo, e legami con molte piattaforme.

### libreria {#library}

Tipo speciale di [contratto](#smart-contract) privo di funzioni pagabili, funzione di fallback e storage dati. Non può quindi ricevere o contenere ether o archiviare dati. Una libreria funge da codice distribuito precedentemente che altri contratti possono chiamare per calcoli di sola lettura.

<DocLink to="/developers/docs/smart-contracts/libraries/" title="Librerie degli Smart Contract" />

### client leggero {#lightweight-client}

Client di Ethereum che non memorizza una copia locale della [blockchain](#blockchain) né convalida i blocchi e le [transazioni](#transaction). Offre le funzioni di un [portafoglio](#wallet) e può creare e trasmettere transazioni.

<Divider />

## M {#section-m}

### rete principale {#mainnet}

In inglese mainnet, è la [blockchain](#blockchain) Ethereum pubblica principale. ETH reali, valore reale e conseguenze reali. Viene detta livello 1 quando si parla di soluzioni per passare al [livello 2](#layer-2). (Vedi anche [rete di prova](#testnet))

### albero di Merkle Patricia {#merkle-patricia-tree}

Struttura dati usata in Ethereum per memorizzare in modo efficiente coppie chiave-valore.

### messaggio {#message}

[Transazione interna](#internal-transaction) mai serializzata e inviata solo all'interno dell'[EVM](#evm).

### chiamata del messaggio {#message-call}

Atto di passare un [messaggio](#message) da un account a un altro. Se l'account di destinazione è associato al codice dell'[EVM](#evm), la VM sarà avviata con lo stato di quell'oggetto e del messaggio che ha avviato l'azione.

### Metropolis {#metropolis}

Terza fase di sviluppo di Ethereum, lanciata nell'ottobre 2017.

### miner {#miner}

[Nodo](#node) della rete che trova [Proof of Work](#pow) valide per i nuovi blocchi, tramite passaggi ripetuti di hash (vedi [Ethash](#ethash)).

<DocLink to="/developers/docs/consensus-mechanisms/pow/mining/" title="Mining" />

<Divider />

## N {#section-n}

### rete {#network}

Se si parla di rete Ethereum, rete peer-to-peer che propaga le transazioni e i blocchi a ogni nodo di Ethereum (partecipante alla rete).

<DocLink to="/developers/docs/networks/" title="Reti" />

### token non fungibile (NFT) {#nft}

Detto anche "atto notarile" (deed), si tratta di uno standard token introdotto dalla proposta ERC-721. Gli NFT possono essere tracciati e scambiati, ma ogni token è unico e distinto; non sono intercambiabili come i token ERC-20. Gli NFT possono rappresentare la proprietà delle risorse digitali o fisiche.

<DocLink to="/developers/docs/standards/tokens/erc-721/" title="Standard token non fungibile ERC-721" />

### nodo {#node}

Software client che partecipa alla rete.

<DocLink to="/developers/docs/nodes-and-clients/" title="Nodi e client" />

<DocLink to="/developers/docs/nodes-and-clients/" title="Nodi e client" />

### nonce {#nonce}

In termini crittografici è un valore che può essere usato una volta sola. Ci sono due tipi di nonce utilizzati in Ethereum: un nonce account è un contatore di transazioni in ogni account, che viene usato per impedire attacchi replay; un nonce [Proof of Work](#pow) è il valore casuale di un blocco che è stato utilizzato per soddisfare la [Proof of Work](#pow).

<Divider />

## O {#section-o}

### blocco ommer (zio) {#ommer}

Nel momento in cui un [miner](#miner) trova un [blocco](#block) valido, un altro miner potrebbe aver pubblicato un blocco concorrente e averlo aggiunto alla fine della blockchain. Questo blocco valido, ma non aggiornato, può essere incluso dai nuovi blocchi come _ommer_ e ricevere una ricompensa parziale per i blocchi. Il termine "ommer" è il termine preferito, neutro dal punto di vista del genere, per lo stesso livello di un blocco padre, ma a volte viene anche indicato come "zio".

### Optimistic rollup {#optimistic-rollup}

[Rollup](#rollups) di transazioni che utilizzano [prove di frode](#fraud-proof) per offrire maggiori volumi di transazioni di [livello 2](#layer-2) e la sicurezza fornita dalla [rete principale](#mainnet) (livello 1). A differenza di [Plasma](#plasma), una soluzione simile di livello 2, gli Optimistic rollup possono gestire tipi di transazioni più complessi. Tutto ciò è possibile nell'[EVM](#evm). Hanno problemi di latenza rispetto ai [rollup Zero-knowledge](#zk-rollups) perché una transazione può essere contestata tramite la prova di frode.

<DocLink to="/developers/docs/layer-2-scaling/#optimistic-rollups" title="Optimistic rollup" />

<Divider />

## P {#section-p}

### parità {#parity}

Una delle implementazioni interoperabili più importanti del software client Ethereum.

### Plasma {#plasma}

Soluzione per il passaggio al [livello 2](#layer-2) che utilizza [prove di frode](#fraud-proof), come gli [Optimistic rollup](#optimistic-rollups). Plasma è limitato a transazioni semplici come trasferimenti e scambi base di token.

<DocLink to="/developers/docs/layer-2-scaling/#Plasma" title="Plasma" />

### chiave privata (chiave segreta) {#private-key}

Numero segreto che consente agli utenti di Ethereum di dimostrare la proprietà di un account o di un contratto, producendo una firma digitale (vedi [chiave pubblica](#public-key), [indirizzo](#address), [ECDSA](#ecdsa)).

### Proof of Stake (PoS) {#pos}

Metodo con cui un protocollo blockchain di criptovalute mira a raggiungere il [consenso distribuito](#consensus). La PoS chiede agli utenti di dimostrare la proprietà di una determinata quantità di criptovalute (la loro "stake", o quota, nella rete) per poter partecipare alla convalida delle transazioni.

<DocLink to="/developers/docs/consensus-mechanisms/pos/" title="Proof of Stake" />

### Proof of Work (PoW) {#pow}

Informazioni (la prova) che richiedono calcoli significativi per essere trovate. In Ethereum, i [miner](#miner) devono trovare una soluzione numerica per l'algoritmo [Ethash](#ethash) che soddisfi una [difficoltà](#difficulty) specificata a livello di rete.

<DocLink to="/developers/docs/consensus-mechanisms/pow/" title="Proof of Work" />

### chiave pubblica {#public-key}

Numero derivato tramite una funzione unidirezionale da una [chiave privata](#private-key), che può essere condiviso pubblicamente e utilizzato da chiunque per verificare una firma digitale eseguita con la corrispondente chiave privata.

<Divider />

## R {#section-r}

### ricevuta {#receipt}

Dati restituiti da un client Ethereum per rappresentare il risultato di una particolare [transazione](#transaction), che includono un [hash](#hash) della transazione, il relativo numero di [blocco](#block), il quantitativo di [carburante](#gas) utilizzato e, in caso di distribuzione di uno [Smart Contract](#smart-contract), l'indirizzo [](#address) del contratto.

### attacco con codice rientrante {#re-entrancy-attack}

Attacco che consiste nella chiamata da parte del contratto di un aggressore alla funzione del contratto della vittima in modo che, durante l'esecuzione, la vittima chiami di nuovo il contratto dell'aggressore, in modo ricorsivo. Questo può causare, ad esempio, il furto di fondi perché vengono ignorate le parti del contratto della vittima che aggiornano i saldi o contano gli importi prelevati.

<DocLink to="/developers/docs/security/#re-entrancy" title="Codice rientrante" />

### ricompensa {#reward}

Quantità di ether inclusa in ogni nuovo blocco come ricompensa da parte della rete al [miner](#miner) che ha trovato la soluzione [Proof of Work](#pow).

### prefisso a lunghezza ricorsiva (RLP) {#rlp}

Standard di codifica progettato dagli sviluppatori di Ethereum per codificare e serializzare oggetti (strutture di dati) di complessità e lunghezza arbitrarie.

### rollup {#rollups}

Tipo di soluzione per il passaggio al [livello 2](#layer-2) che raggruppa più transazioni e le invia alla [catena principale Ethereum](#mainnet) in una sola transazione. Consente di ridurre i costi del [carburante](#gas) e di aumentare il volume delle [transazioni](#transaction). I rollup possono essere di tipo Optimistic e Zero-knowledge. Utilizzano diversi metodi di sicurezza per offrire vantaggi in termini di scalabilità.

<DocLink to="/developers/docs/layer-2-scaling/#rollups" title="Rollup" />

<Divider />

## S {#section-s}

### Serenity {#serenity}

Quarta e ultima fase di sviluppo di Ethereum.

<DocLink to="/eth2/" title="Ethereum 2.0 (Eth2)" />

### Secure Hash Algorithm (SHA) {#sha}

Famiglia di funzioni hash crittografiche pubblicata dal National Institute of Standards and Technology (NIST).

### shard/shard chain {#shard}

Catena [Proof of Stake](#proof-of-stake) coordinata dalla [beacon chain](#beacon-chain) e protetta dai [validatori](#validator). Ne verranno aggiunte 64 alla rete all'interno dell'upgrade alla shard chain Eth2. Le shard chain offriranno maggiori volumi di transazioni a Ethereum fornendo dati aggiuntivi alle soluzioni di [livello 2](#layer-2) come gli [Optimistic rollup](#optimistic-rollups) e i [rollup ZK](#zk-rollups).

<DocLink to="/eth2/shard-chains" title="Shard chain" />

### sidechain {#sidechain}

Soluzione per la scalabilità che utilizza una catena separata con [regole di consenso]{#consensus-rules} diverse e spesso più veloci. Per collegare queste sidechain alla [rete principale](#mainnet) è necessario un bridge. Anche i [rollup](#rollups) utilizzano le sidechain, ma operano in collaborazione con la [rete principale](#mainnet).

<DocLink to="/developers/docs/layer-2-scaling/#sidechains" title="Sidechain" />

### singleton {#singleton}

Termine appartenente al contesto di programmazione che descrive un oggetto di cui può esistere solo un'istanza.

### slot {#slot}

Periodo di tempo (12 secondi) in cui un nuovo blocco della [beacon chain](#beacon-chain) e della [shard chain](#shard) può essere proposto da un [validatore](#validator) nel sistema [Proof of Stake](#proof-of-stake). Uno slot può rimanere vuoto. 32 slot formano un'[epoca](#epoch).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work" title="Proof of Stake" />

### Smart Contract {#smart-contract}

Programma eseguito sull'infrastruttura di calcolo Ethereum.

<DocLink to="/developers/docs/smart-contracts/" title="Introduzione agli Smart Contract" />

### Solidity {#solidity}

Linguaggio di programmazione procedurale (imperativo) con sintassi simile a JavaScript, C++ o Java. Il linguaggio più popolare e più usato per gli [Smart Contract](#smart-contract) Ethereum. Creato dal dott. Gavin Wood.

<DocLink to="/developers/docs/smart-contracts/languages/#solidity" title="Solidity" />

### Assembly in linea Solidity {#solidity-inline-assembly}

Linguaggio assembly dell'[EVM](#evm) in un programma [Solidity](#solidity). Il supporto di Solidity per l'assembly in linea facilita la scrittura di determinate operazioni.

### Spurious Dragon {#spurious-dragon}

[Diramazione permanente](#hard-fork) della blockchain Ethereum, che si è verificata al blocco 2.675, 00 per affrontare più vettori di attacco denial-of-service e cancellare lo stato (vedi [Tangerine Whistle](#tangerine-whistle)). Anche meccanismo di protezione contro gli attacchi replay (vedi [nonce](#nonce)).

### stablecoin {#stablecoin}

Token [ERC-20](#token-standard) con un valore ancorato al valore di un'altra risorsa. Ci sono stablecoins supportati da valute legali come dollari, metalli preziosi come l'oro e altre criptovalute come bitcoin.

<DocLink to="/eth/#tokens" title="ETH non è l'unica criptovaluta su Ethereum" />

### staking {#staking}

Depositare una quantità di [ether](#ether) (lo stake) per diventare validatore e proteggere la [rete](#network). Un validatore controlla [transazioni](#transaction) e propone [blocchi](#block) secondo un modello di consenso [Proof of Stake](#pos). Lo staking dà un incentivo economico per agire nel miglior interesse della rete. Si ottengono ricompense per svolgere i compiti di [validatore](#validator), ma si perdono quantità variabili di ETH se non si svolgono tali compiti.

<DocLink to="/eth2/staking/" title="Fai staking con i tuoi ETH per diventare validatore di Ethereum" />

### canali di stato {#state-channels}

Soluzione di [livello 2](#layer-2) in cui un canale è configurato tra i partecipanti per eseguire transazioni liberamente e in modo economico. Viene inviata alla [rete principale](#mainnet) solo una [transazione](#transaction) per configurare il canale e chiuderlo. Questo consente un volume di transazioni molto elevato, ma si basa sulla conoscenza del numero di partecipanti in anticipo e sul blocco dei fondi.

<DocLink to="/developers/docs/layer-2-scaling/#state-channels" title="Canali di stato" />

### szabo {#szabo}

Uno dei tagli dell'[ether](#ether). 1 szabo = 10<sup>12</sup> [wei](#wei), 10<sup>6</sup> szabo = 1 ether.

<Divider />

## T {#section-t}

### Tangerine Whistle {#tangerine-whistle}

[Diramazione permanente](#hard-fork) della blockchain Ethereum, che si è verificata al blocco 2.463, 00 per modificare il calcolo del [carburante](#gas) per alcune operazioni ad alta intensità di I/O e per cancellare lo stato accumulato da un attacco denial-of-service che aveva sfruttato il basso costo del carburante di tali operazioni.

### rete di test {#testnet}

In inglese testnet, è una rete utilizzata per simulare il comportamento della rete principale Ethereum (vedi [rete principale](#mainnet)).

<DocLink to="/developers/docs/networks/#testnets" title="Reti di test" />

### standard token {#token-standard}

Introdotto dalla proposta ERC-20, offre una struttura standardizzata per [Smart Contract](#smart-contract) per i token fungibili. I token dello stesso contratto possono essere tracciati, scambiati e sono intercambiabili, a differenza degli [NFT](#nft).

<DocLink to="/developers/docs/standards/tokens/erc-20/" title="Standard token ERC-20" />

### transazione {#transaction}

Dati salvati nella blockchain Ethereum firmati da un [account](#account) di origine, che puntano a un [indirizzo](#address) specifico. La transazione contiene metadati come il [limite di carburante](#gas-limit) per la transazione.

<DocLink to="/developers/docs/transactions/" title="Transazioni" />

### commissione sulle transazioni {#transaction-fee}

Commissione da pagare ogni volta che si usa la rete Ethereum. Esempi includono l'invio di fondi da un [portafoglio](#wallet) o un'interazione con una [dapp](#dapp), come lo scambio di token o l'acquisto di un oggetto collezionabile. Può essere paragonata a una commissione di servizio e cambia in base a quanto è congestionata la rete, perché i [miner](#miner), cioè i responsabili dell'elaborazione della transazione, danno verosimilmente priorità alle transazioni con commissioni più elevate, quindi la congestione fa salire il prezzo.

A livello tecnico, la commissione sulle transazioni fa riferimento a quanto [carburante](#gas) richiede la transazione.

La riduzione delle commissioni sulle transazioni è un argomento caldo in questo momento. Vedi [livello 2](#layer-2)

### Turing completo {#turing-complete}

Concetto che prende il nome dal matematico e informatico inglese Alan Turing. Un sistema di regole per la manipolazione dei dati (come un set di istruzioni per computer, un linguaggio di programmazione o un automa cellulare) è detto "Turing completo" o "universale dal punto di vista computazionale" se può essere utilizzato per simulare qualsiasi macchina di Turing.

<Divider />

## V {#section-v}

### validatore {#validator}

[Nodo](#node) in un sistema [Proof of Stake](#proof-of-stake) responsabile della memorizzazione dei dati, dell'elaborazione delle transazioni e dell'aggiunta di nuovi blocchi alla blockchain. Per il software di validatore attivo, è necessario essere in grado di fare [staking](#staking) con 32 ETH.

<DocLink to="/developers/docs/consensus-mechanisms/pos" title="Proof of Stake" /> <DocLink to="/eth2/staking/" title="Staking in Ethereum" />

### prova di validità {#validity-proof}

Modello di sicurezza per determinate soluzioni di [livello 2](#layer-2) in cui, per aumentare la velocità, viene eseguito il [roll up](/#rollups) delle transazioni in batch e poi queste ultime vengono inviate a Ethereum come una sola transazione. Il calcolo della transazione viene effettuato esternamente alla catena e poi fornito alla catena principale con una prova di validità. Questo metodo aumenta la quantità di transazioni possibili garantendo comunque la sicurezza. Alcuni [rollup](#rollups) usano [prove di frode](#fraud-proof).

<DocLink to="/developers/docs/layer-2-scaling/#zk-rollups" title="Rollup zero-knowledge" />

### Validium {#validium}

Soluzione di [livello 2](#layer-2) che utilizza [prove di validità](#validity-proof) per aumentare il volume delle transazioni. A differenza dei [rollup Zero-knowlege](#zk-rollup), i dati Validium non vengono memorizzati al livello 1 della [rete principale](#mainnet).

<DocLink to="/developers/docs/layer-2-scaling/#validium" title="Validium" />

### Vyper {#vyper}

Linguaggio di programmazione di alto livello con sintassi simile a Python. Pensato per avvicinarsi a un linguaggio funzionale puro. Creato da Vitalik Buterin.

<DocLink to="/developers/docs/smart-contracts/languages/#vyper" title="Vyper" />

<Divider />

## W {#section-w}

### portafoglio {#wallets}

Software che contiene [chiavi private](#private-key). Utilizzato per accedere agli [account](#account), permetterne il controllo e interagire con gli [Smart Contract](#smart-contract). Le chiavi non devono essere memorizzate in un portafoglio, ma possono essere recuperate offline (ad esempio da una scheda di memoria o su carta) per migliorare la sicurezza. Nonostante il nome, i portafogli non contengono mai le monete o i token reali.

<DocLink to="/wallets/" title="Portafogli di Ethereum" />

### Web3 {#web3}

Terza versione del Web. Proposto per la prima volta dal dott. Gavin Wood, il Web3 rappresenta una nuova visione per le applicazioni web: dalle applicazioni centralizzate e gestite, alle applicazioni create sulla base di protocolli decentralizzati (vedi [dapp](#dapp)).

<DocLink to="/developers/docs/web2-vs-web3/" title="Web2 e Web3" />

### wei {#wei}

Il taglio più piccolo dell'[ether](#ether). 10<sup>18</sup> wei = 1 ether.

<Divider />

## Z {#section-z}

### indirizzo zero {#zero-address}

Indirizzo Ethereum speciale, composto interamente da zeri, specificato come indirizzo di destinazione di una [transazione per la creazione di un contratto](#contract-creation-transaction).

### Rollup zero-knowledge {#zk-rollup}

[Rollup](#rollups) di transazioni che utilizzano [prove di validità](#validity-proof) per offrire maggiori volumi di transazioni di [livello 2](#layer-2) e la sicurezza fornita dalla [rete principale](#mainnet) (livello 1). Anche se non sono in grado di gestire tipi di transazioni complessi, come gli [Optimistic rollup](#optimistic-rollups), non hanno problemi di latenza perché le transazioni sono già dimostrate come valide quando vengono inviate.

<DocLink to="/developers/docs/layer-2-scaling/#zk-rollups" title="Rollup zero-knowledge" />

<Divider />

## Fonti {#sources}

_Fornito in parte da [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook) di [Andreas M. Antonopoulos, Gavin Wood](https://ethereumbook.info) con CC-BY-SA_

<Divider />

## Contribuisci a questa pagina {#contribute-to-this-page}

Manca qualcosa? Hai trovato qualcosa di sbagliato? Aiutaci a migliorare contribuendo a questo glossario su GitHub!

[Scopri di più su come contribuire](/en/contributing/adding-glossary-terms)
