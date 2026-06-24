---
title: Valore massimo estraibile (MEV)
description: Un'introduzione al valore massimo estraibile (MEV)
lang: it
---

Il valore massimo estraibile (MEV) si riferisce al valore massimo che può essere estratto dalla produzione dei blocchi in eccesso rispetto alla ricompensa del blocco standard e alle commissioni del gas includendo, escludendo e modificando l'ordine delle transazioni in un blocco.

## Valore massimo estraibile {#maximal-extractable-value}

Il valore massimo estraibile è stato applicato per la prima volta nel contesto della [Prova di lavoro (PoW)](/developers/docs/consensus-mechanisms/pow/) e inizialmente definito come "valore estraibile dal minatore" (miner extractable value). Questo perché nella Prova di lavoro, i minatori controllano l'inclusione, l'esclusione e l'ordinamento delle transazioni. Tuttavia, dalla transizione alla Proof-of-Stake (PoS) tramite [The Merge](/roadmap/merge), i validatori sono diventati responsabili di questi ruoli e il minaggio non fa più parte del protocollo [Ethereum](/). I metodi di estrazione del valore esistono ancora, tuttavia, quindi ora viene utilizzato il termine "Valore massimo estraibile".

## Prerequisiti {#prerequisites}

Assicurati di avere familiarità con le [transazioni](/developers/docs/transactions/), i [blocchi](/developers/docs/blocks/), la [Proof-of-Stake (PoS)](/developers/docs/consensus-mechanisms/pos) e il [gas](/developers/docs/gas/). È utile anche avere familiarità con le [applicazioni decentralizzate (dapp)](/apps/) e la [finanza decentralizzata (DeFi)](/defi/).

## Estrazione del MEV {#mev-extraction}

In teoria, il MEV matura interamente a favore dei validatori perché sono l'unica parte in grado di garantire l'esecuzione di un'opportunità MEV redditizia. In pratica, tuttavia, gran parte del MEV viene estratto da partecipanti indipendenti alla rete chiamati "searcher". I searcher eseguono algoritmi complessi sui dati della blockchain per rilevare opportunità MEV redditizie e dispongono di bot per inviare automaticamente tali transazioni redditizie alla rete.

I validatori ottengono comunque una parte dell'intero importo del MEV perché i searcher sono disposti a pagare elevate commissioni del gas (che vanno al validatore) in cambio di una maggiore probabilità di inclusione delle loro transazioni redditizie in un blocco. Supponendo che i searcher siano economicamente razionali, la commissione del gas che un searcher è disposto a pagare sarà un importo fino al 100% del MEV del searcher (perché se la commissione del gas fosse più alta, il searcher perderebbe denaro).

Con ciò, per alcune opportunità MEV altamente competitive, come l'[arbitraggio sui DEX](#mev-examples-dex-arbitrage), i searcher potrebbero dover pagare il 90% o anche più delle loro entrate totali del MEV in commissioni del gas al validatore perché molte persone vogliono eseguire la stessa operazione di arbitraggio redditizia. Questo perché l'unico modo per garantire l'esecuzione della loro transazione di arbitraggio è inviare la transazione con il prezzo del gas più alto.

### Gas golfing {#mev-extraction-gas-golfing}

Questa dinamica ha reso l'essere bravi nel "gas golfing" — programmare le transazioni in modo che utilizzino la minor quantità di gas — un vantaggio competitivo, perché consente ai searcher di impostare un prezzo del gas più alto mantenendo costanti le loro commissioni del gas totali (poiché commissioni del gas = prezzo del gas \* gas utilizzato).

Alcune tecniche ben note di gas golfing includono: l'utilizzo di indirizzi che iniziano con una lunga stringa di zeri (es. [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://eth.blockscout.com/address/0x0000000000C521824EaFf97Eac7B73B084ef9306)) poiché occupano meno spazio (e quindi gas) per essere memorizzati; e lasciare piccoli saldi di token [ERC-20](/developers/docs/standards/tokens/erc-20/) nei contratti, poiché costa più gas inizializzare uno slot di archiviazione (il caso in cui il saldo è 0) rispetto all'aggiornamento di uno slot di archiviazione. Trovare ulteriori tecniche per ridurre l'utilizzo del gas è un'area di ricerca attiva tra i searcher.

### Frontrunner generalizzati {#mev-extraction-generalized-frontrunners}

Invece di programmare algoritmi complessi per rilevare opportunità MEV redditizie, alcuni searcher eseguono frontrunner generalizzati. I frontrunner generalizzati sono bot che osservano la mempool per rilevare transazioni redditizie. Il frontrunner copierà il codice della transazione potenzialmente redditizia, sostituirà gli indirizzi con l'indirizzo del frontrunner ed eseguirà la transazione localmente per verificare che la transazione modificata si traduca in un profitto per l'indirizzo del frontrunner. Se la transazione è effettivamente redditizia, il frontrunner invierà la transazione modificata con l'indirizzo sostituito e un prezzo del gas più alto, anticipando ("frontrunning") la transazione originale e ottenendo il MEV del searcher originale.

### Flashbots {#mev-extraction-flashbots}

Flashbots è un progetto indipendente che estende i client di esecuzione con un servizio che consente ai searcher di inviare transazioni MEV ai validatori senza rivelarle alla mempool pubblica. Ciò impedisce che le transazioni vengano anticipate dai frontrunner generalizzati.

## Esempi di MEV {#mev-examples}

Il MEV emerge sulla blockchain in diversi modi.

### Arbitraggio sui DEX {#mev-examples-dex-arbitrage}

L'arbitraggio sugli [exchange decentralizzati](/glossary/#dex) (DEX) è l'opportunità MEV più semplice e conosciuta. Di conseguenza, è anche la più competitiva.

Funziona così: se due DEX offrono un token a due prezzi diversi, qualcuno può acquistare il token sul DEX a prezzo inferiore e venderlo sul DEX a prezzo superiore in un'unica transazione atomica. Grazie alle meccaniche della blockchain, questo è un vero arbitraggio privo di rischi.

[Ecco un esempio](https://eth.blockscout.com/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) di una transazione di arbitraggio redditizia in cui un searcher ha trasformato 1.000 ETH in 1.045 ETH sfruttando i diversi prezzi della coppia ETH/DAI su Uniswap rispetto a Sushiswap.

### Liquidazioni {#mev-examples-liquidations}

Le liquidazioni dei protocolli di prestito rappresentano un'altra ben nota opportunità MEV.

I protocolli di prestito come MakerDAO e Aave richiedono agli utenti di depositare un collaterale (es. ETH). Questo collaterale depositato viene poi utilizzato per concedere prestiti ad altri utenti.

Gli utenti possono quindi prendere in prestito asset e token da altri a seconda di ciò di cui hanno bisogno (es. potresti prendere in prestito MKR se vuoi esprimere un voto in una proposta di governance di MakerDAO) fino a una certa percentuale del loro collaterale depositato. Ad esempio, se l'importo dell'assunzione di prestito è al massimo del 30%, un utente che deposita 100 DAI nel protocollo può prendere in prestito fino a 30 DAI di un altro asset. Il protocollo determina l'esatta percentuale del potere di assunzione di prestito.

Poiché il valore del collaterale di un mutuatario fluttua, lo stesso vale per il suo potere di assunzione di prestito. Se, a causa delle fluttuazioni del mercato, il valore degli asset presi in prestito supera, ad esempio, il 30% del valore del loro collaterale (di nuovo, la percentuale esatta è determinata dal protocollo), il protocollo in genere consente a chiunque di liquidare il collaterale, ripagando istantaneamente i prestatori (questo è simile a come funzionano le [richieste di margine](https://www.investopedia.com/terms/m/margincall.asp) nella finanza tradizionale). In caso di liquidazione, il mutuatario di solito deve pagare una pesante commissione di liquidazione, parte della quale va al liquidatore — ed è qui che entra in gioco l'opportunità MEV.

I searcher competono per analizzare i dati della blockchain il più velocemente possibile per determinare quali mutuatari possono essere liquidati ed essere i primi a inviare una transazione di liquidazione e riscuotere la commissione di liquidazione per se stessi.

### Sandwich trading {#mev-examples-sandwich-trading}

Il sandwich trading è un altro metodo comune di estrazione del MEV.

Per fare un "sandwich", un searcher osserverà la mempool alla ricerca di grandi scambi sui DEX. Ad esempio, supponiamo che qualcuno voglia acquistare 10.000 UNI con DAI su Uniswap. Uno scambio di questa portata avrà un effetto significativo sulla coppia UNI/DAI, aumentando potenzialmente in modo significativo il prezzo di UNI rispetto a DAI.

Un searcher può calcolare l'effetto approssimativo sul prezzo di questo grande scambio sulla coppia UNI/DAI ed eseguire un ordine di acquisto ottimale immediatamente _prima_ del grande scambio, acquistando UNI a basso costo, per poi eseguire un ordine di vendita immediatamente _dopo_ il grande scambio, vendendolo al prezzo più alto causato dal grande ordine.

Il sandwiching, tuttavia, è più rischioso in quanto non è atomico (a differenza dell'arbitraggio sui DEX, come descritto sopra) ed è soggetto a un [attacco salmonella](https://github.com/Defi-Cartel/salmonella).

### MEV degli NFT {#mev-examples-nfts}

Il MEV nello spazio degli NFT è un fenomeno emergente e non è necessariamente redditizio.

Tuttavia, poiché le transazioni NFT avvengono sulla stessa blockchain condivisa da tutte le altre transazioni Ethereum, i searcher possono utilizzare tecniche simili a quelle utilizzate nelle opportunità MEV tradizionali anche nel mercato degli NFT.

Ad esempio, se c'è un drop di NFT popolare e un searcher desidera un certo NFT o un set di NFT, può programmare una transazione in modo da essere il primo della fila ad acquistare l'NFT, oppure può acquistare l'intero set di NFT in un'unica transazione. Oppure, se un NFT viene [erroneamente messo in vendita a un prezzo basso](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), un searcher può anticipare gli altri acquirenti e accaparrarselo a poco prezzo.

Un esempio lampante di MEV degli NFT si è verificato quando un searcher ha speso 7 milioni di dollari per [acquistare](https://eth.blockscout.com/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5?tab=txs) ogni singolo Cryptopunk al prezzo minimo (floor price). Un ricercatore blockchain ha [spiegato su Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538) come l'acquirente abbia collaborato con un fornitore di MEV per mantenere segreto il proprio acquisto.

### La coda lunga {#mev-examples-long-tail}

L'arbitraggio sui DEX, le liquidazioni e il sandwich trading sono tutte opportunità MEV molto note ed è improbabile che siano redditizie per i nuovi searcher. Tuttavia, esiste una coda lunga di opportunità MEV meno conosciute (il MEV degli NFT è probabilmente una di queste opportunità).

I searcher alle prime armi potrebbero avere più successo cercando il MEV in questa coda più lunga. La [bacheca degli annunci di lavoro MEV](https://github.com/flashbots/mev-job-board) di Flashbots elenca alcune opportunità emergenti.

## Effetti del MEV {#effects-of-mev}

Il MEV non è del tutto negativo: ci sono conseguenze sia positive che negative per il MEV su Ethereum.

### I lati positivi {#effects-of-mev-the-good}

Molti progetti della finanza decentralizzata (DeFi) si affidano ad attori economicamente razionali per garantire l'utilità e la stabilità dei loro protocolli. Ad esempio, l'arbitraggio sui DEX garantisce che gli utenti ottengano i prezzi migliori e più corretti per i loro token, e i protocolli di prestito si affidano a liquidazioni rapide quando i mutuatari scendono al di sotto dei rapporti di collateralizzazione per garantire che i prestatori vengano rimborsati.

Senza searcher razionali che cercano e correggono le inefficienze economiche e sfruttano gli incentivi economici dei protocolli, i protocolli DeFi e le dapp in generale potrebbero non essere così robusti come lo sono oggi.

### I lati negativi {#effects-of-mev-the-bad}

A livello di applicazione, alcune forme di MEV, come il sandwich trading, si traducono in un'esperienza inequivocabilmente peggiore per gli utenti. Gli utenti che subiscono un sandwich affrontano un maggiore slittamento e un'esecuzione peggiore delle loro operazioni.

A livello di rete, i frontrunner generalizzati e le aste sul prezzo del gas in cui spesso si impegnano (quando due o più frontrunner competono affinché la loro transazione venga inclusa nel blocco successivo aumentando progressivamente il prezzo del gas delle proprie transazioni) causano congestione della rete e prezzi del gas elevati per tutti gli altri che cercano di eseguire transazioni regolari.

Oltre a ciò che accade _all'interno_ dei blocchi, il MEV può avere effetti deleteri _tra_ i blocchi. Se il MEV disponibile in un blocco supera significativamente la ricompensa del blocco standard, i validatori potrebbero essere incentivati a riorganizzare i blocchi e catturare il MEV per se stessi, causando una riorganizzazione della blockchain e instabilità del consenso.

Questa possibilità di riorganizzazione della blockchain è stata [precedentemente esplorata sulla blockchain di Bitcoin](https://dl.acm.org/doi/10.1145/2976749.2978408). Man mano che la ricompensa del blocco di Bitcoin si dimezza e le commissioni di transazione costituiscono una porzione sempre maggiore della ricompensa del blocco, si presentano situazioni in cui diventa economicamente razionale per i minatori rinunciare alla ricompensa del blocco successivo e invece minare nuovamente i blocchi passati con commissioni più elevate. Con la crescita del MEV, lo stesso tipo di situazione potrebbe verificarsi in Ethereum, minacciando l'integrità della blockchain.

## Stato del MEV {#state-of-mev}

L'estrazione del MEV è esplosa all'inizio del 2021, portando a prezzi del gas estremamente elevati nei primi mesi dell'anno. L'emergere del relay MEV di Flashbots ha ridotto l'efficacia dei frontrunner generalizzati e ha portato le aste sul prezzo del gas offchain, abbassando i prezzi del gas per gli utenti comuni.

Sebbene molti searcher stiano ancora guadagnando bene dal MEV, man mano che le opportunità diventano più note e sempre più searcher competono per la stessa opportunità, i validatori cattureranno sempre più entrate totali del MEV (perché lo stesso tipo di aste del gas originariamente descritte sopra si verificano anche in Flashbots, sebbene privatamente, e i validatori cattureranno le entrate del gas risultanti). Il MEV non è inoltre un'esclusiva di Ethereum e, man mano che le opportunità diventano più competitive su Ethereum, i searcher si stanno spostando su blockchain alternative come Binance Smart Chain, dove esistono opportunità MEV simili a quelle su Ethereum con meno concorrenza.

D'altra parte, la transizione dalla Prova di lavoro alla Proof-of-Stake e lo sforzo continuo per scalare Ethereum utilizzando i rollup cambiano tutti il panorama del MEV in modi che sono ancora in qualche modo poco chiari. Non è ancora ben noto come avere proponenti del blocco garantiti e conosciuti con un po' di anticipo cambi le dinamiche dell'estrazione del MEV rispetto al modello probabilistico nella Prova di lavoro o come questo verrà stravolto quando verranno implementate la [Single Secret Leader Election (SSLE)](https://ethresear.ch/t/secret-non-single-leader-election/11789) e la [tecnologia dei validatori distribuiti (DVT)](/staking/dvt/). Allo stesso modo, resta da vedere quali opportunità MEV esisteranno quando la maggior parte dell'attività degli utenti verrà spostata da Ethereum ai suoi rollup di layer 2 (l2) e shard.

## Il MEV nella Proof-of-Stake (PoS) di Ethereum {#mev-in-ethereum-proof-of-stake}

Come spiegato, il MEV ha implicazioni negative per l'esperienza utente complessiva e la sicurezza del livello di consenso. Ma la transizione di Ethereum a un consenso Proof-of-Stake (soprannominata "The Merge") introduce potenzialmente nuovi rischi legati al MEV:

### Centralizzazione dei validatori {#validator-centralization}

Nell'Ethereum post-Merge, i validatori (avendo effettuato depositi di sicurezza di 32 ETH) raggiungono il consenso sulla validità dei blocchi aggiunti alla Beacon Chain. Poiché 32 ETH potrebbero essere fuori dalla portata di molti, [unirsi a una pool di staking](/staking/pools/) potrebbe essere un'opzione più fattibile. Tuttavia, una sana distribuzione di [staker solitari](/staking/solo/) è l'ideale, in quanto mitiga la centralizzazione dei validatori e migliora la sicurezza di Ethereum.

Tuttavia, si ritiene che l'estrazione del MEV sia in grado di accelerare la centralizzazione dei validatori. Questo in parte perché, poiché i validatori [guadagnano meno per la proposta di blocchi](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply) rispetto a quanto facevano in precedenza i minatori, l'estrazione del MEV ha fortemente [influenzato i guadagni dei validatori](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb) da [The Merge](/roadmap/merge/).

Le pool di staking più grandi avranno probabilmente più risorse da investire nelle ottimizzazioni necessarie per catturare le opportunità MEV. Più MEV estraggono queste pool, più risorse hanno per migliorare le loro capacità di estrazione del MEV (e aumentare le entrate complessive), creando essenzialmente [economie di scala](https://www.investopedia.com/terms/e/economiesofscale.asp#).

Con meno risorse a loro disposizione, gli staker solitari potrebbero non essere in grado di trarre profitto dalle opportunità MEV. Ciò potrebbe aumentare la pressione sui validatori indipendenti affinché si uniscano a potenti pool di staking per aumentare i loro guadagni, riducendo la decentralizzazione in Ethereum.

### Mempool autorizzate {#permissioned-mempools}

In risposta agli attacchi di sandwiching e frontrunning, i trader potrebbero iniziare a condurre accordi offchain con i validatori per la privacy delle transazioni. Invece di inviare una potenziale transazione MEV alla mempool pubblica, il trader la invia direttamente al validatore, che la include in un blocco e divide i profitti con il trader.

Le "dark pool" sono una versione più ampia di questo accordo e funzionano come mempool autorizzate e ad accesso limitato aperte agli utenti disposti a pagare determinate commissioni. Questa tendenza diminuirebbe la natura senza permessi e l'assenza di necessità di fiducia di Ethereum e trasformerebbe potenzialmente la blockchain in un meccanismo "pay-to-play" che favorisce il miglior offerente.

Le mempool autorizzate accelererebbero anche i rischi di centralizzazione descritti nella sezione precedente. Le grandi pool che gestiscono più validatori trarranno probabilmente vantaggio dall'offrire la privacy delle transazioni a trader e utenti, aumentando le loro entrate MEV.

Combattere questi problemi legati al MEV nell'Ethereum post-Merge è un'area di ricerca fondamentale. Ad oggi, due soluzioni proposte per ridurre l'impatto negativo del MEV sulla decentralizzazione e sulla sicurezza di Ethereum dopo The Merge sono la [**separazione proponente-costruttore (PBS)**](/roadmap/pbs/) e l'[**API del costruttore**](https://github.com/ethereum/builder-specs).

### Separazione proponente-costruttore {#proposer-builder-separation}

Sia nella Prova di lavoro che nella Proof-of-Stake, un nodo che costruisce un blocco lo propone per l'aggiunta alla catena agli altri nodi che partecipano al consenso. Un nuovo blocco diventa parte della catena canonica dopo che un altro minatore vi costruisce sopra (nella PoW) o riceve attestazioni dalla maggioranza dei validatori (nella PoS).

La combinazione dei ruoli di produttore del blocco e proponente del blocco è ciò che introduce la maggior parte dei problemi legati al MEV descritti in precedenza. Ad esempio, i nodi di consenso sono incentivati a innescare riorganizzazioni della catena in [attacchi time-bandit](https://www.mev.wiki/attack-examples/time-bandit-attack) per massimizzare i guadagni del MEV.

La [separazione proponente-costruttore (PBS)](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) è progettata per mitigare l'impatto del MEV, specialmente al livello di consenso. La caratteristica principale della PBS è la separazione dei ruoli di produttore del blocco e proponente del blocco. I validatori sono ancora responsabili della proposta e del voto sui blocchi, ma una nuova classe di entità specializzate, chiamate **costruttori di blocchi**, ha il compito di ordinare le transazioni e costruire i blocchi.

Con la PBS, un costruttore di blocchi crea un pacchetto di transazioni e fa un'offerta per la sua inclusione in un blocco della Beacon Chain (come "payload di esecuzione"). Il validatore selezionato per proporre il blocco successivo controlla quindi le diverse offerte e sceglie il pacchetto con la commissione più alta. La PBS crea essenzialmente un mercato d'asta, in cui i costruttori negoziano con i validatori che vendono spazio nei blocchi.

Gli attuali design della PBS utilizzano uno [schema commit-reveal](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/) in cui i costruttori pubblicano solo un commitment crittografico ai contenuti di un blocco (intestazione del blocco) insieme alle loro offerte. Dopo aver accettato l'offerta vincente, il proponente crea una proposta di blocco firmata che include l'intestazione del blocco. Ci si aspetta che il costruttore di blocchi pubblichi l'intero corpo del blocco dopo aver visto la proposta di blocco firmata, e deve anche ricevere abbastanza [attestazioni](/glossary/#attestation) dai validatori prima che sia finalizzato.

#### In che modo la separazione proponente-costruttore mitiga l'impatto del MEV? {#how-does-pbs-curb-mev-impact}

La separazione proponente-costruttore all'interno del protocollo riduce l'effetto del MEV sul consenso rimuovendo l'estrazione del MEV dalla competenza dei validatori. Invece, i costruttori di blocchi che eseguono hardware specializzato cattureranno le opportunità MEV in futuro.

Questo non esclude totalmente i validatori dal reddito legato al MEV, tuttavia, poiché i costruttori devono fare offerte alte per far accettare i loro blocchi dai validatori. Ciononostante, con i validatori non più direttamente concentrati sull'ottimizzazione del reddito MEV, la minaccia di attacchi time-bandit si riduce.

La separazione proponente-costruttore riduce anche i rischi di centralizzazione del MEV. Ad esempio, l'uso di uno schema commit-reveal elimina la necessità per i costruttori di fidarsi che i validatori non rubino l'opportunità MEV o la espongano ad altri costruttori. Ciò abbassa la barriera per gli staker solitari per beneficiare del MEV, altrimenti i costruttori tenderebbero a favorire le grandi pool con reputazione offchain e a condurre accordi offchain con loro.

Allo stesso modo, i validatori non devono fidarsi che i costruttori non trattengano i corpi dei blocchi o pubblichino blocchi non validi perché il pagamento è incondizionato. La commissione del validatore viene comunque elaborata anche se il blocco proposto non è disponibile o viene dichiarato non valido da altri validatori. In quest'ultimo caso, il blocco viene semplicemente scartato, costringendo il costruttore di blocchi a perdere tutte le commissioni di transazione e le entrate del MEV.

### API del costruttore {#builder-api}

Sebbene la separazione proponente-costruttore prometta di ridurre gli effetti dell'estrazione del MEV, la sua implementazione richiede modifiche al protocollo di consenso. Nello specifico, la regola di [scelta del fork](/developers/docs/consensus-mechanisms/pos/#fork-choice) sulla Beacon Chain dovrebbe essere aggiornata. L'[API del costruttore](https://github.com/ethereum/builder-specs) è una soluzione temporanea volta a fornire un'implementazione funzionante della separazione proponente-costruttore, sebbene con maggiori assunzioni di fiducia.

L'API del costruttore è una versione modificata dell'[API del motore (Engine API)](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) utilizzata dai client del livello di consenso per richiedere i payload di esecuzione dai client del livello di esecuzione. Come delineato nelle [specifiche del validatore onesto](https://github.com/ethereum/consensus-specs/blob/master/specs/bellatrix/validator.md), i validatori selezionati per i compiti di proposta del blocco richiedono un pacchetto di transazioni da un client di esecuzione connesso, che includono nel blocco proposto della Beacon Chain.

L'API del costruttore funge anche da middleware tra i validatori e i client del livello di esecuzione; ma è diversa perché consente ai validatori sulla Beacon Chain di reperire blocchi da entità esterne (invece di costruire un blocco localmente utilizzando un client di esecuzione).

Di seguito è riportata una panoramica di come funziona l'API del costruttore:

1. L'API del costruttore connette il validatore a una rete di costruttori di blocchi che eseguono client del livello di esecuzione. Come nella PBS, i costruttori sono parti specializzate che investono nella costruzione di blocchi ad alta intensità di risorse e utilizzano diverse strategie per massimizzare le entrate guadagnate dal MEV + le mance di priorità.

2. Un validatore (che esegue un client del livello di consenso) richiede i payload di esecuzione insieme alle offerte dalla rete di costruttori. Le offerte dei costruttori conterranno l'intestazione del payload di esecuzione — un commitment crittografico ai contenuti del payload — e una commissione da pagare al validatore.

3. Il validatore esamina le offerte in arrivo e sceglie il payload di esecuzione con la commissione più alta. Utilizzando l'API del costruttore, il validatore crea una proposta di blocco beacon "cieca" che include solo la sua firma e l'intestazione del payload di esecuzione e la invia al costruttore.

4. Ci si aspetta che il costruttore che esegue l'API del costruttore risponda con l'intero payload di esecuzione dopo aver visto la proposta di blocco cieca. Ciò consente al validatore di creare un blocco beacon "firmato", che propaga attraverso la rete.

5. Ci si aspetta comunque che un validatore che utilizza l'API del costruttore costruisca un blocco localmente nel caso in cui il costruttore di blocchi non risponda tempestivamente, in modo da non perdere le ricompense per la proposta del blocco. Tuttavia, il validatore non può creare un altro blocco utilizzando le transazioni ora rivelate o un altro set, poiché ciò equivarrebbe a un'_equivocazione_ (firmare due blocchi all'interno dello stesso slot), che è un'infrazione passibile di slashing.

Un esempio di implementazione dell'API del costruttore è [MEV-Boost](https://github.com/flashbots/mev-boost), un miglioramento del [meccanismo d'asta di Flashbots](https://docs.flashbots.net/flashbots-auction/overview) progettato per frenare le esternalità negative del MEV su Ethereum. L'asta di Flashbots consente ai validatori nella Proof-of-Stake di esternalizzare il lavoro di costruzione di blocchi redditizi a parti specializzate chiamate **searcher**.
![A diagram showing the MEV flow in detail](./mev.png)

I searcher cercano opportunità MEV redditizie e inviano pacchetti di transazioni ai proponenti del blocco insieme a un'[offerta a prezzo sigillato](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) per l'inclusione nel blocco. Il validatore che esegue mev-geth, una versione forkata del client Go Ethereum (Geth), deve solo scegliere il pacchetto con il maggior profitto e includerlo come parte del nuovo blocco. Per proteggere i proponenti del blocco (validatori) dallo spam e dalle transazioni non valide, i pacchetti di transazioni passano attraverso i **relayer** per la convalida prima di arrivare al proponente.

MEV-Boost mantiene lo stesso funzionamento dell'asta originale di Flashbots, sebbene con nuove funzionalità progettate per il passaggio di Ethereum alla Proof-of-Stake. I searcher trovano ancora transazioni MEV redditizie per l'inclusione nei blocchi, ma una nuova classe di parti specializzate, chiamate **costruttori**, è responsabile dell'aggregazione di transazioni e pacchetti in blocchi. Un costruttore accetta offerte a prezzo sigillato dai searcher ed esegue ottimizzazioni per trovare l'ordinamento più redditizio.

Il relayer è ancora responsabile della convalida dei pacchetti di transazioni prima di passarli al proponente. Tuttavia, MEV-Boost introduce degli **escrow** responsabili di fornire la [disponibilità dei dati (DA)](/developers/docs/data-availability/) memorizzando i corpi dei blocchi inviati dai costruttori e le intestazioni dei blocchi inviate dai validatori. Qui, un validatore connesso a un relay richiede i payload di esecuzione disponibili e utilizza l'algoritmo di ordinamento di MEV-Boost per selezionare l'intestazione del payload con l'offerta più alta + le mance del MEV.

#### In che modo l'API del costruttore mitiga l'impatto del MEV? {#how-does-builder-api-curb-mev-impact}

Il vantaggio principale dell'API del costruttore è il suo potenziale per democratizzare l'accesso alle opportunità MEV. L'utilizzo di schemi commit-reveal elimina le assunzioni di fiducia e riduce le barriere all'ingresso per i validatori che cercano di trarre vantaggio dal MEV. Ciò dovrebbe ridurre la pressione sugli staker solitari affinché si integrino con grandi pool di staking al fine di aumentare i profitti del MEV.

L'implementazione diffusa dell'API del costruttore incoraggerà una maggiore concorrenza tra i costruttori di blocchi, il che aumenta la resistenza alla censura. Poiché i validatori esaminano le offerte di più costruttori, un costruttore intento a censurare una o più transazioni degli utenti deve superare l'offerta di tutti gli altri costruttori non censuranti per avere successo. Ciò aumenta drasticamente il costo della censura degli utenti e scoraggia la pratica.

Alcuni progetti, come MEV-Boost, utilizzano l'API del costruttore come parte di una struttura complessiva progettata per fornire la privacy delle transazioni a determinate parti, come i trader che cercano di evitare attacchi di frontrunning/sandwiching. Ciò si ottiene fornendo un canale di comunicazione privato tra utenti e costruttori di blocchi. A differenza delle mempool autorizzate descritte in precedenza, questo approccio è vantaggioso per i seguenti motivi:

1. L'esistenza di più costruttori sul mercato rende la censura impraticabile, a vantaggio degli utenti. Al contrario, l'esistenza di dark pool centralizzate e basate sulla fiducia concentrerebbe il potere nelle mani di pochi costruttori di blocchi e aumenterebbe la possibilità di censura.

2. Il software dell'API del costruttore è open source, il che consente a chiunque di offrire servizi di costruttore di blocchi. Ciò significa che gli utenti non sono costretti a utilizzare alcun costruttore di blocchi in particolare e migliora la neutralità e la natura senza permessi di Ethereum. Inoltre, i trader in cerca di MEV non contribuiranno inavvertitamente alla centralizzazione utilizzando canali di transazione privati.

## Risorse correlate {#related-resources}

- [Documentazione di Flashbots](https://docs.flashbots.net/)
- [GitHub di Flashbots](https://github.com/flashbots/pm)
- [mevboost.org](https://www.mevboost.org/) - _Tracker con statistiche in tempo reale per i relay e i costruttori di blocchi di MEV-Boost_

## Letture consigliate {#further-reading}

- [Cos'è il Miner-Extractable Value (MEV)?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV and Me](https://www.paradigm.xyz/2021/02/mev-and-me)
- [Ethereum is a Dark Forest](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Escaping the Dark Forest](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: Frontrunning the MEV Crisis](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [Thread sul MEV di @bertcmiller](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost: Merge ready Flashbots Architecture](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [Cos'è MEV-Boost](https://www.alchemy.com/overviews/mev-boost)
- [Perché eseguire mev-boost?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [The Hitchhikers Guide To Ethereum](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)