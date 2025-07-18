---
title: Valore estraibile massimo (MEV)
description: Un'introduzione al valore estraibile massimo (MEV)
lang: it
---

Il valore estraibile massimo (MEV) si riferisce al valore massimo che può esser estratto dalla produzione del blocco, oltre alla ricompensa standard del blocco e alle commissioni sul gas, includendo, escludendo e cambiando l'ordine delle transazioni in un blocco.

## Valore estraibile massimo {#maximal-extractable-value}

Il valore estraibile massimo fu applicato per la prima volta nel contesto del [proof-of-work](/developers/docs/consensus-mechanisms/pow/) e fu inizialmente definito come "valore estraibile dal miner". Questo perché nel Proof of Work i miner controllano l'inclusione, l'esclusione e l'ordinamento della transazione. Tuttavia, a partire dalla transizione al proof-of-stake tramite [La Fusione](/roadmap/merge), i validatori sono responsabili di tali ruoli e il mining non fa più parte del protocollo di Ethereum. I metodi d'estrazione del valore però esistono ancora, quindi il termine usato adesso è invece "Valore estraibile massimo".

## Prerequisiti {#prerequisites}

Assicurati di essere familiare con le [transazioni](/developers/docs/transactions/), i [blocchi](/developers/docs/blocks/), il [proof-of-stake](/developers/docs/consensus-mechanisms/pos) e il [gas](/developers/docs/gas/). Anche la familiarità con [dApp](/dapps/) e [DeFi](/defi/) è utile.

## Estrazione del MEV {#mev-extraction}

In teoria, il MEV proviene interamente dai validatori poiché sono l'unica parte in grado di garantire l'esecuzione di un'opportunità di MEV redditizia. Nella pratica, tuttavia, una grande porzione del MEV è estratta da partecipanti indipendenti della rete, chiamati "ricercatori". I ricercatori eseguono algoritmi complessi sui dati della blockchain per rilevare opportunità di MEV redditizie e si servono di bot per inviare automaticamente tali transazioni redditizie alla rete.

I validatori ottengono comunque una porzione dell'intero importo del MEV, poiché i ricercatori sono disposti a pagare commissioni sul gas maggiori (che vanno al validatore), in cambio di una maggiore probabilità d'inclusione delle loro transazioni profittevoli in un blocco. Supponendo che i ricercatori siano economicamente razionari, la commissione sul gas che un ricercatore è disposto a pagare sarà un importo fino al 100% del MEV del ricercatore (poiché se la commissione sul gas fosse stata maggiore, il ricercatore avrebbe perso denaro).

Così, per alcune opportunità di MEV molto competitive, come l'[arbitraggio della DEX](#mev-examples-dex-arbitrage), i ricercatori potrebbero dover pagare il 90%, se non più, delle loro entrate totali del MEV in commissioni sul gas al validatore, poiché così tante persone vogliono eseguire lo stesso scambio d'arbitraggio profittevole. Questo è perché il solo modo per garantire che la loro transazione d'arbitraggio sia eseguita se inviano la transazione con il prezzo sul gas maggiore.

### Golfing del gas {#mev-extraction-gas-golfing}

Questa dinamica ha reso esser bravi al "golf del gas", la programmazione delle transazioni così che usino l'importo minimo di gas, un vantaggio competitivo, poiché consente ai ricercatori di impostare un prezzo del gas maggiore, mantenendo costanti le proprie commissioni sul gas totali (poiché, commissioni sul gas = prezzo del gas \* gas usato).

Alcune tecniche di golf del gas ben note includono: usare indirizzi che iniziano con una lunga stringa di zeri (es. [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://etherscan.io/address/0x0000000000c521824eaff97eac7b73b084ef9306)) poiché richiedono meno spazio (e quindi gas) da archiviare; e lasciando piccoli saldi del token [ERC-20](/developers/docs/standards/tokens/erc-20/) nei contratti, poiché costa più gas inizializzare uno slot d'archiviazione (se il saldo è 0), piuttosto che aggiornarne uno. Individuare altre tecniche per ridurre il consumo di gas è un'area di ricerca attiva tra i ricercatori.

### Frontrunner generalizzati {#mev-extraction-generalized-frontrunners}

Anziché programmare algoritmi complessi per rilevare opportunità di MEV redditizie, alcuni ricercatori eseguono frontrunner generalizzati. I frontrunner generalizzati sono bot che tengono d'occhio il mempool per individuare le transazioni redditizie. Il frontrunner copierà il codice della transazione potenzialmente redditizia, sostituirà gli indirizzi con il proprio ed eseguirà la transazione localmente per verificare due volte che la transazione modificata risulti in un profitto all'indirizzo del frontrunner. Se la transazione è effettivamente redditizia, il precursore invierà la transazione modificata con l'indirizzo sostituito e un prezzo del gas maggiore, "precorrendo" la transazione originale e ottenendo il MEV originale del ricercatore.

### Flashbot {#mev-extraction-flashbots}

I flashbot sono un progetto indipendente che estende i client di esecuzione con un servizio che consente ai ricercatori di inviare le transazioni del MEV ai validatori senza rivelarle al mempool pubblico. Questo impedisce ai frontrunner generalizzati di eseguire frontrun sulle transazioni.

## Esempi di MEV {#mev-examples}

Il MEV emerge sulla blockchain in diversi modi.

### Arbitraggio DEX {#mev-examples-dex-arbitrage}

L'arbitraggio dello [scambio decentralizzato](/glossary/#dex) (DEX) è l'opportunità di MEV più semplice e più diffusa. Di conseguenza è anche la più competitiva.

Funziona come segue: se due DEX offrono un token a due prezzi diversi, qualcuno può acquistare il token sul DEX al prezzo minore e rivenderlo sul DEX al prezzo maggiore in un'unica transazione atomica. Grazie ai meccanismi della blockchain, questo è vero e proprio arbitraggio privo di rischi.

[Ecco un esempio](https://etherscan.io/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) di una transazione di arbitraggio redditizia in cui un ricercatore ha trasformato 1.000 ETH in 1.045 ETH sfruttando i diversi prezzi della coppia ETH/DAI su Uniswap vs. Sushiswap.

### Liquidazioni {#mev-examples-liquidations}

Le liquidazioni del protocollo di prestito presentano un'altra opportunità di MEV ben nota.

I protocolli di prestito come Maker e Aave richiedono agli utenti di depositare un qualche tipo di garanzia (es. ETH). Questa garanzia depositata è quindi utilizzata per concedere prestiti ad altri utenti.

Gli utenti possono quindi prendere in prestito risorse e token dagli altri, a seconda delle loro esigenze (ad es. potresti prendere in prestito MKR se desideri votare in una proposta di governance di MakerDAO), fino a una certa percentuale della loro garanzia depositata. Ad esempio, se l'importo preso in prestito è un massimo del 30%, un utente che deposita 100 DAI nel protocollo può prendere in prestito fino all'equivalente di 30 DAI di un'altra risorsa. Il protocollo determina l'esatta percentuale di potenza presa in prestito.

Al fluttuare del valore della garanzia di un debitore, fluttua anche la capacità di prestito. Se, a causa delle fluttuazioni del mercato, il valore degli attivi presi in presi in prestito supera, ad esempio, il 30% del valore della loro garanzia (anche in questo caso l'esatta percentuale è determinata dal protocollo), il protocollo consente tipicamente a chiunque di liquidare la garanzia, pagando istantaneamente i creditori (in modo simile al funzionamento dei [margini aggiuntivi](https://www.investopedia.com/terms/m/margincall.asp) nella finanza tradizionale). In caso di liquidazione, il debitore deve solitamente pagare una cospicua commissione di liquidazione, parte della quale va al liquidatore; ed è qui che risiede l'opportunità di MEV.

I ricercatori competono per analizzare i dati della blockchain il più velocemente possibile per determinare quali debitori sono liquidabili ed essere i primi a inviare una transazione di liquidazione e raccogliere la commissione di liquidazione per se stessi.

### Sandwich trading {#mev-examples-sandwich-trading}

Il sandwich trading è un altro metodo comune di estrazione del MEV.

Per eseguirlo, un ricercatore osserverà il mempool alla ricerca di scambi di DEX di notevole entità. Per esempio, supponiamo che qualcuno voglia comprare 10.000 UNI con DAI su Uniswap. Uno scambio di tale portata avrà un effetto significativo sulla coppia UNI/DAI, aumentando in modo potenzialmente importante il prezzo di UNI rispetto al DAI.

Un ricercatore può calcolare l'effetto approssimativo del prezzo di questo scambio di ampia portata sulla coppia UNI/DAI ed eseguire un acquisto ottimale immediatamente _prima_ di esso, acquistando UNI a basso costo per poi eseguire l'ordine di vendita immediatamente _dopo_ lo scambio, vendendolo a un prezzo superiore, causato dallo stesso ordine.

Il sandwiching, tuttavia, è più rischioso non essendo atomico (a differenza dell'arbitraggio di DEX, come descritto sopra) ed è soggetto a un [attacco di salmonella](https://github.com/Defi-Cartel/salmonella).

### MEV dei NFT {#mev-examples-nfts}

Nel mondo dei NFT, il MEV è un fenomeno emergente e non necessariamente redditizio.

Tuttavia, poiché le transazioni di NFT hanno luogo sulla stessa blockchain condivisa da tutte le transazioni di Ethereum, i ricercatori possono usare tecniche simili a quelle usate per le opportunità di MEV tradizionali anche nel mercato dei NFT.

Per esempio, se si verifica un calo a livello di un NFT popolare e un ricercatore vuole un certo NFT o una serie di NFT, può programmare una transazione in modo tale da essere il primo ad acquistare il NFT o l'intera serie di NFT in una sola transazione. Oppure, se un NFT viene [erroneamente elencato a un prezzo basso](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), un ricercatore può scavalcare gli altri acquirenti e ottenerlo a buon mercato.

Un esempio eloquente di MEV nel mondo dei NFT si è verificato quando un ricercatore ha speso $7 milioni per [comprare](https://etherscan.io/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5) ogni singolo Cryptopunk al prezzo di base. Un ricercatore della blockchain [ha spiegato su Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538) come l'acquirente avesse lavorato con un fornitore di MEV per mantenere segreto l'acquisto.

### La lunga coda {#mev-examples-long-tail}

L'arbitraggio di DEX, le liquidazioni e il sandwich trading sono tutte opportunità di MEV ben note e difficilmente saranno redditizie per i nuovi ricercatori. Tuttavia, esiste una lunga coda di opportunità di MEV meno note (il MEV nel mondo dei NFT è probabilmente una di esse).

I ricercatori che stanno muovendo i primi passi potrebbero avere maggiore successo ricercando MEV in questa lunga coda. La [MEV job board](https://github.com/flashbots/mev-job-board) del flashbot elenca alcune opportunità emergenti.

## Effetti del MEV {#effects-of-mev}

Il MEV non è una cosa negativa: su Ethereum ci sono conseguenze sia positive che negative connesse al MEV.

### Aspetti positivi {#effects-of-mev-the-good}

Molti progetti di DeFi si basano su attori economicamente razionali per assicurare l'utilità e stabilità dei loro protocolli. Per esempio, l'arbitraggio di DEX assicura che gli utenti ottengano i prezzi migliori e più corretti per i loro token, mentre i protocolli di prestito si basano su liquidazioni rapide quando i debitori scendono al di sotto dei coefficienti di garanzia per garantire il rimborso dei creditori.

Senza ricercatori razionali che cercano e correggono le inefficienze economiche e sfruttano gli incentivi economici dei protocolli, i protocolli DeFi e le dApp in generale potrebbero perdere la robustezza che esibiscono oggi.

### Aspetti negativi {#effects-of-mev-the-bad}

A livello di applicazione, alcune forme di MEV, come il sandwich trading, si traducono in un'esperienza inequivocabilmente peggiore per gli utenti. Gli utenti che ricevono il sandwich subiscono un maggiore slittamento e una peggiore esecuzione delle loro operazioni.

Al livello della rete, i precursori generalizzati e le aste del prezzo del gas, che spesso intraprendono (quando due o più precursori competono perché la propria transazione sia inclusa nel blocco successivo, aumentando progressivamente il prezzo del gas della loro transazione), risultano in congestione della rete e prezzi del gas elevati per chiunque altro sia provando a eseguire transazioni regolari.

Oltre a ciò che si verifica _all'interno_ dei blocchi, il MEV può avere effetti deleteri _tra_ i blocchi. Se il MEV disponibile in un blocco supera significativamente la ricompensa standard del blocco, i validatori potrebbero essere incentivati a riorganizzare i blocchi e catturare da soli il MEV, causando la riorganizzazione della blockchain e l'instabilità del consenso.

Questa possibile riorganizzazione della blockchain è stata [precedentemente esplorata sulla blockchain di Bitcoin](https://dl.acm.org/doi/10.1145/2976749.2978408). Poiché le metà delle ricompense del blocco e le commissioni di transazione di Bitcoin costituiscono una porzione sempre più consistente della ricompensa del blocco, si presentano situazioni in cui diventa economicamente razionale per i miner rinunciare alla ricompensa del blocco successivo e ri-minare invece i blocchi passati con commissioni maggiori. Con la crescita del MEV, la stessa tipologia di situazione potrebbe verificarsi in Ethereum, minacciando l'integrità della blockchain.

## Stato del MEV {#state-of-mev}

L'estrazione del MEV è aumentata a dismisura agli inizi del 2021, risultando in prezzi del gas estremamente elevati nei primi mesi dell'anno. L'emergere della trasmissione del MEV dei Flashbot ha ridotto l'efficienza dei precursori generalizzati e ha portato le aste del prezzo del gas al di fuori della catena, riducendo i prezzi del gas per gli utenti ordinari.

Mentre molti ricercatori guadagnano ancora molto dal MEV, con il diffondersi delle opportunità e la competizione di sempre più ricercatori per la stessa opportunità, i validatori cattureranno sempre più ricavi totali del MEV (poiché lo stesso tipo di aste del gas originariamente descritte in precedenza, si verificano anche nei Flashbot, seppur privatamente, e i validatori cattureranno i ricavi di gas risultanti). Inoltre, il MEV non è un'esclusiva di Ethereum e, man mano che le opportunità su Ethereum diventano più competitive, i ricercatori si spostano su blockchain alternative come Binance Smart Chain, dove esistono opportunità di MEV simili a quelle di Ethereum ma con minore competizione.

D'altra parte, la transizione dal proof-of-work al proof-of-stake e lo sforzo di ridimensionamento di Ethereum in corso usando i rollup stanno modificando il panorama del MEV in modi ancora piuttosto nebulosi. Non è ancora noto come il fatto di conoscere i propositori di blocchi garantiti lievemente in anticipo modifichi le dinamiche di estrazione del MEV rispetto al modello probabilistico nel proof-of-work, o come questo sarà sconvolto quando l'[elezione segreta di un singolo capo ](https://ethresear.ch/t/secret-non-single-leader-election/11789) e la [tecnologia distribuita del validatore](/staking/dvt/) saranno implementate. Similmente, resta da vedere quali opportunità del MEV esistono quando gran parte dell'attività degli utenti è portata via da Ethereum e sui suoi rollup e shard di livello 2.

## MEV nel Proof-of-Stake (PoS) di Ethereum {#mev-in-ethereum-proof-of-stake}

Come spiegato, il MEV ha implicazioni negative per l’esperienza complessiva degli utenti e per la sicurezza al livello di consenso. Ma la transizione di Ethereum al protocollo di consenso proof-of-stake (soprannominato “La Fusione”) introduce potenzialmente nuovi rischi legati al MEV:

### Centralizzazione dei validatori {#validator-centralization}

Dopo La Fusione di Ethereum, i validatori (dopo aver effettuato depositi di sicurezza di 32 ETH) raggiungono il consenso sulla validità dei blocchi aggiunti alla Beacon Chain. Dal momento che 32 ETH possono essere fuori dalla portata di molti, [unirsi a un pool di staking](/staking/pools/) può essere un'opzione più fattibile. Ciò nonostante, una sana distribuzione di [staker autonomi](/staking/solo/) è ideale, in quanto attenua la centralizzazione dei validatori e migliora la sicurezza di Ethereum.

Tuttavia, si ritiene che l'estrazione del MEV sia in grado di accelerare la centralizzazione dei validatori. Ciò è in parte dovuto al fatto che, poiché i validatori [guadagnano meno per proporre blocchi](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply) rispetto a quanto facessero i minatori in precedenza, l'estrazione del MEV ha notevolmente [influenzato i guadagni dei validatori](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb) da quando c'é stata [La Fusione](/roadmap/merge/).

I pool di staking più grandi avranno probabilmente più risorse da investire nelle ottimizzazioni necessarie per cogliere le opportunità del MEV. Quanto più MEV questi pool estraggono, tanto più risorse avranno per migliorare le loro capacità di estrazione del MEV (e aumentare le entrate complessive), creando essenzialmente [economie di scala](https://www.investopedia.com/terms/e/economiesofscale.asp#).

Con un minor numero di risorse a loro disposizione, gli staker autonomi potrebbero non essere in grado di trarre profitto dalle opportunità offerte dal MEV. Questo potrebbe aumentare la pressione sui validatori autonomi per unire potenti pool di staking per aumentare i loro guadagni, riducendo la decentralizzazione in Ethereum.

### Mempool con permessi {#permissioned-mempools}

In risposta agli attacchi di sandwiching e di frontrunning, i trader possono iniziare a condurre operazioni off-chain con validatori per la privacy delle transazioni. Invece di inviare una potenziale transazione MEV al mempool pubblico, il trader la invia direttamente al validatore, che la include in un blocco e divide i profitti con il trader.

I “dark pool” sono una versione più ampia di questo accordo e funzionano come mempool di solo accesso, con permessi, aperti agli utenti disposti a pagare determinate commissioni. Questa tendenza diminuirebbe la mancanza di permessi e la mancanza di fiducia di Ethereum e trasformerebbe potenzialmente la blockchain in un meccanismo “pay-to-play” che favorisce il miglior offerente.

I mempool con permessi accelererebbero anche i rischi di centralizzazione descritti nella sezione precedente. I grandi pool che eseguono più validatori trarranno probabilmente vantaggio dall'offrire la privacy delle transazioni ai trader e agli utenti, aumentando i loro ricavi in MEV.

La lotta a questi problemi legati al MEV successivamente alla Fusione di Ethereum è un ambito centrale di ricerca. Finora le due soluzioni proposte per ridurre l'impatto negativo del MEV sulla decentralizzazione e la sicurezza di Ethereum dopo La Fusione sono la [**Separazione propositore-costruttore (PBS)**](/roadmap/pbs/) e l'[**API del costruttore**](https://github.com/ethereum/builder-specs).

### Separazione del Propositore e del Costruttore {#proposer-builder-separation}

Sia nel proof-of-of-work che nel proof-of-stake, un nodo che costruisce un blocco propone di aggiungerlo alla catena ad altri nodi che partecipano al consenso. Un nuovo blocco diventa parte della catena canonica dopo che un altro minatore vi ha costruito sopra (in PoW) o ha ricevuto attestazioni dalla maggior parte dei validatori (in PoS).

La combinazione dei ruoli del produttore di blocchi e del propositore di blocchi è ciò che introduce la maggior parte dei problemi relativi al MEV descritti in precedenza. Ad esempio, i nodi di consenso sono incentivati a innescare le riorganizzazioni della catena negli [attacchi time-bandit](https://www.mev.wiki/attack-examples/time-bandit-attack) per massimizzare i guadagni di MEV.

La [Separazione propositore-costruttore](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) (PBS) è concepita per mitigare l'impatto del MEV, soprattutto al livello di consenso. La caratteristica principale della PBS è la separazione dei produttori di blocchi e le regole del propositore di blocchi. I validatori sono ancora responsabili di proporre e votare i blocchi, ma una nuova classe di entità specializzate, chiamati **costruttori di blocchi**, sono incaricati di ordinare transazioni e costruire i blocchi.

Nella PBS, un costruttore di blocchi crea un pacchetto di transazioni e mette un'offerta per la sua inclusione in un blocco della Beacon Chain (come il “payload di esecuzione”). Il validatore selezionato per proporre il blocco successivo quindi controlla le diverse offerte e sceglie il pacchetto con la commissione più alta. La PBS crea essenzialmente un mercato d'asta, dove i costruttori negoziano con validatori che vendono lo spazio del blocco.

Gli attuali progetti PBS utilizzano uno [schema commit-reveal](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/) in cui i costruttori pubblicano solo un impegno crittografico per i contenuti di un blocco (intestazione del blocco) insieme alle loro offerte. Dopo aver accettato l'offerta vincente, il propositore crea una proposta di blocco firmata che include l'intestazione del blocco. Il costruttore di blocchi dovrebbe pubblicare il corpo completo del blocco dopo aver visualizzato la proposta del blocco firmata e, inoltre, deve ricevere abbastanza [attestazioni](/glossary/#attestation) dai validatori prima che sia finalizzata.

#### In che modo la separazione propositore-costruttore riduce l’impatto del MEV? {#how-does-pbs-curb-mev-impact}

La separazione del propositore e del costruttore riduce l’effetto del MEV sul consenso eliminando l’estrazione del MEV dal campo di applicazione dei validatori. Invece, da ora in poi saranno i costruttori di blocchi che eseguono hardware specializzato a cogliere le opportunità di MEV.

Ciò, però, non esclude del tutto i validatori dal reddito relativo al MEV, poiché i costruttori devono offrire alti pagamenti per far accettare i propri blocchi dai validatori. Tuttavia, con i validatori non più direttamente focalizzati sull'ottimizzazione del reddito da MEV, la minaccia di attacchi di time-bandit si riduce.

La separazione propositore-costruttore riduce anche i rischi di centralizzazione del MEV. Per esempio, l'uso di uno schema commit-reveal elimina la necessità per i costruttori di fidarsi del fatto che i validatori non ruberanno l'opportunità di MEV o non la esporranno ad altri costruttori. In questo modo si riduce la barriera per gli operatori autonomi di beneficiare del MEV, altrimenti i costruttori tenderebbero a favorire grandi pool con buona reputazione off-chain e a condurre delle trattative off-chain con loro.

Allo stesso modo, i validatori non devono fidarsi del fatto che i costruttori non tratterranno i corpi dei blocchi o non pubblicheranno blocchi non validi perché il pagamento è incondizionato. La commissione del validatore continua a essere elaborata anche se il blocco proposto non è disponibile o è dichiarato non valido da altri validatori. In quest'ultimo caso, il blocco viene semplicemente scartato, costringendo il costruttore di blocchi a perdere tutte le commissioni di transazione e i ricavi di MEV.

### API del Costruttore {#builder-api}

Mentre la separazione tra propositori e creatori promette di ridurre gli effetti dell'estrazione del MEV, la sua attuazione richiede modifiche al protocollo di consenso. In particolare, la regola [scelta della diramazione](/developers/docs/consensus-mechanisms/pos/#fork-choice) sulla Beacon Chain dovrebbe essere aggiornata. L'API [Builder](https://github.com/ethereum/builder-specs) è una soluzione temporanea volta a fornire un'implementazione funzionante della separazione propositore-costruttore, anche se con presupposti di fiducia più elevati.

L'API Builder è una versione modificata dell'[API Engine](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) utilizzata dai client del livello di consenso per richiedere payload di esecuzione dai client del livello di esecuzione. Come indicato nella [specifica del validatore onesto](https://github.com/ethereum/consensus-specs/blob/dev/specs/bellatrix/validator.md), i validatori selezionati per i compiti di proposta dei blocchi richiedono un pacchetto di transazioni da un client di esecuzione connesso, che includono nel blocco della Beacon Chain proposto.

L'API Builder funge anche da middleware tra validatori e client al livello di esecuzione, ma è diverso perché permette ai validatori sulla Beacon Chain di procurarsi blocchi da entità esterne (invece di costruire un blocco localmente utilizzando un client di esecuzione).

Di seguito una panoramica di come funziona l'API Builder:

1. L'API Builder collega il validatore a una rete di costruttori di blocchi che eseguono client del livello di esecuzione. Come nella PBS, i costruttori sono parti specializzate che investono nella costruzione di blocchi ad alta intensità di risorse e utilizzano diverse strategie per massimizzare i ricavi guadagnati dai MEV + mance di priorità.

2. Un validatore (che esegue un client del livello di consenso) richiede payload di esecuzione insieme alle offerte dalla rete di costruttori. Le offerte dei costruttori conterranno l'intestazione del payload di esecuzione – un impegno crittografico per i contenuti del payload – e una commissione da pagare al validatore.

3. Il validatore esamina le offerte in arrivo e sceglie il payload di esecuzione con la commissione più alta. Usando l'API Builder, il validatore crea una proposta di blocco Beacon "alla cieca" che include solo la sua firma e l'intestazione del payload di esecuzione e la invia al costruttore.

4. Il costruttore che esegue l'API Builder dovrebbe rispondere con il payload di esecuzione completo quando si vede la proposta di blocco alla cieca. Questo permette al validatore di creare un blocco Beacon "firmato", che propaga in tutta la rete.

5. Un validatore che utilizza l'API Builder dovrebbe ancora costruire un blocco localmente nel caso in cui il costruttore del blocco non risponda tempestivamente, in modo da non perdere le ricompense della proposta di blocco. Tuttavia, il validatore non può creare un altro blocco utilizzando le transazioni ormai rivelate o un altro set, in quanto equivarrebbe a un _equivoco_ (firmare due blocchi all'interno dello stesso slot), che è un illecito tagliabile.

Un esempio di implementazione dell'API Builder è [MEV Boost](https://github.com/flashbots/mev-boost), un miglioramento rispetto al [meccanismo di asta di Flashbots](https://docs.flashbots.net/Flashbots-auction/overview/) progettato per frenare le esternalità negative del MEV su Ethereum. L'asta di Flashbots consente ai validatori in proof-of-stake di esternalizzare il lavoro di creazione di blocchi redditizi a soggetti specializzati chiamati **ricercatori**. ![Un diagramma che mostra nel dettaglio il flusso del MEV](./mev.png)

I ricercatori cercano opportunità di MEV redditizie e inviano pacchetti di transazioni ai propositori dei blocchi insieme a un'[offerta in busta chiusa](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) per l'inclusione nel blocco. Il validatore che esegue mev-geth, una versione biforcata del client go-ethereum (Geth), deve solo scegliere il pacchetto con il maggior profitto e includerlo come parte del nuovo blocco. Per proteggere i propositori del blocco (validatori) dalle truffe e dalle transazioni non valide, i pacchetti di transazioni passano attraverso i **relayer** per la convalida prima di arrivare al propositore.

MEV Boost mantiene lo stesso funzionamento dell’asta originale di Flashbots, anche se con nuove funzionalità progettate per il passaggio di Ethereum al proof-of-stake. I ricercatori trovano ancora transazioni MEV redditizie per l'inclusione nei blocchi, ma una nuova classe di soggetti specializzati, chiamati **costruttori**, sono responsabili dell'aggregazione delle transazioni e dei pacchetti nei blocchi. Un costruttore accetta offerte in busta chiusa dai ricercatori ed esegue ottimizzazioni per trovare l'ordine più redditizio.

Il relayer è ancora responsabile della convalida dei pacchetti di transazioni prima di trasmetterli al propositore. Tuttavia, MEV Boost introduce **escrow ** responsabili di fornire la [disponibilità di dati](/developers/docs/data-availability/) memorizzando i corpi dei blocchi inviati dai costruttori e le intestazioni dei blocchi inviati dai validatori. Qui, un validatore collegato a un relay chiede i payload di esecuzione disponibili e utilizza l'algoritmo di ordinamento di MEV Boost per selezionare l'intestazione del payload con l'offerta più alta + mance in MEV.

#### Come fa l'API Builder a mitigare l'impatto del MEV? {#how-does-builder-api-curb-mev-impact}

Il vantaggio principale dell'API Builder è il suo potenziale per democratizzare l'accesso alle opportunità del MEV. Il ricorso a sistemi di commit-reveal elimina le ipotesi di fiducia e riduce le barriere all’ingresso per i validatori che cercano di trarre vantaggio dai MEV. Ciò dovrebbe ridurre la pressione sugli staker autonomi per integrarsi con grandi pool di staking al fine di aumentare i profitti in MEV.

L'implementazione generalizzata dell'API Builder incoraggerà una maggiore concorrenza tra i costruttori di blocchi, il che aumenta la resistenza alla censura. Dato che i validatori selezionano le offerte da più costruttori, un costruttore intenzionato a censurare una o più transazioni deve superare tutti gli altri costruttori senza censura per avere successo. Ciò aumenta drasticamente il costo della censura degli utenti e ne scoraggia la pratica.

Alcuni progetti, come MEV Boost, utilizzano l'API Builder come parte di una struttura generale progettata per fornire privacy delle transazioni a determinate parti, come i trader che cercano di evitare attacchi frontrunning/sandwiching. Questo obiettivo è conseguito fornendo un canale di comunicazione privato tra gli utenti e i costruttori di blocchi. A differenza dei mempool con permessi (permissioned) descritti in precedenza, questo approccio è vantaggioso per i seguenti motivi:

1. L'esistenza di più costruttori sul mercato rende la censura impraticabile, il che va a vantaggio degli utenti. Al contrario, l'esistenza di pool centralizzati e basati sulla fiducia concentrerebbe il potere nelle mani di pochi costruttori di blocchi e aumenterebbe la possibilità di censura.

2. Il software API Builder è open-source e consente a chiunque di offrire servizi di costruttore di blocchi. Ciò significa che gli utenti non sono obbligati a utilizzare un particolare costruttore di blocca, migliorando la neutralità e la mancanza di permessi di Ethereum. Inoltre, i trader in cerca di MEV non contribuiranno inavvertitamente alla centralizzazione utilizzando canali di transazione privati.

## Risorse correlate {#related-resources}

- [Documentazione dei Flashbot](https://docs.flashbots.net/)
- [Flashbots GitHub](https://github.com/flashbots/pm)
- [MEV-Explore](https://explore.flashbots.net/) _Pannello di controllo ed esploratore live delle transazioni per transazioni MEV_
- [mevboost.org](https://www.mevboost.org/) - _Tracker con statistiche in tempo reale per relay e costruttori di blocchi di MEV Boost_

## Letture consigliate {#further-reading}

- [What Is Miner-Extractable Value (MEV)?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV and Me](https://www.paradigm.xyz/2021/02/mev-and-me)
- [Ethereum is a Dark Forest](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Escaping the Dark Forest](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: Frontrunning the MEV Crisis](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [@bertcmiller's MEV Threads](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost: architettura Flashbots pronta per la Fusione](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [Che cos'è MEV Boost?](https://www.alchemy.com/overviews/mev-boost)
- [Perché eseguire mev-boost?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [La guida per autostoppisti a Ethereum](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)
