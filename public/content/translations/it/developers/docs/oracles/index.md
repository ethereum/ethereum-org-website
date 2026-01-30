---
title: Oracoli
description: "Gli oracoli forniscono ai contratti intelligenti di Ethereum l'accesso ai dati del mondo reale, sbloccando più casi d'uso e maggiore valore per gli utenti."
lang: it
---

Gli oracoli sono applicazioni che producono feed di dati che rendono le fonti di dati fuori dalla catena disponibili alla blockchain per i contratti intelligenti. Ciò è necessario perché i contratti intelligenti basati su Ethereum non possono, di default, accedere alle informazioni memorizzate al di fuori della rete della blockchain.

Dare ai contratti intelligenti la capacità di eseguirsi utilizzando dati fuori dalla catena estende l'utilità e il valore delle applicazioni decentralizzate. Ad esempio, i mercati di previsione sulla catena si basano sugli oracoli per fornire informazioni sui risultati che utilizzano per convalidare le previsioni degli utenti. Supponiamo che Alice scommetta 20 ETH su chi diventerà il prossimo presidente degli Stati Uniti . In tal caso, la dapp del mercato predittivo ha bisogno di un oracolo per confermare i risultati delle elezioni e determinare se Alice abbia diritto o meno alla "vincita".

## Prerequisiti {#prerequisites}

Questa pagina presuppone che il lettore abbia familiarità con i fondamenti di Ethereum, inclusi i [nodi](/developers/docs/nodes-and-clients/), i [meccanismi di consenso](/developers/docs/consensus-mechanisms/) e l'[EVM](/developers/docs/evm/). Dovresti anche avere una buona comprensione dei [contratti intelligenti](/developers/docs/smart-contracts/) e dell'[anatomia dei contratti intelligenti](/developers/docs/smart-contracts/anatomy/), in particolare degli [eventi](/glossary/#events).

## Cos'è un oracolo della blockchain? {#what-is-a-blockchain-oracle}

Gli oracoli sono applicazioni che agiscono da fonti, verificatori e trasmettitori di informazioni esterne (ossia informazioni archiviate fuori dalla catena) ai contratti intelligenti in esecuzione sulla blockchain. Oltre a “estrarre” dati fuori dalla catena e trasmetterli su Ethereum, gli oracoli possono anche “immettere” informazioni dalla blockchain a sistemi esterni, ad esempio sbloccando una serratura intelligente una volta che l'utente invia una commissione tramite una transazione di Ethereum.

Senza un oracolo, un contratto intelligente sarebbe limitato interamente ai dati sulla catena.

Gli oracoli differiscono in base alla fonte di dati (una o più fonti), ai modelli di fiducia (centralizzati o decentralizzati) e all'architettura di sistema (immediate-read, publish-subscribe e request-response). Possiamo anche distinguere gli oracoli in base al fatto che recuperino dati esterni per l'uso da parte di contratti sulla catena (oracoli di input), inviino informazioni dalla blockchain alle applicazioni fuori dalla catena (oracoli di output), o svolgano attività di calcolo fuori dalla catena (oracoli di calcolo).

## Perché i contratti intelligenti hanno bisogno degli oracoli? {#why-do-smart-contracts-need-oracles}

Molti sviluppatori vedono i contratti intelligenti come del codice in esecuzione in determinati indirizzi sulla blockchain. Tuttavia, una [visione più generale dei contratti intelligenti](/smart-contracts/) è che siano programmi software autoeseguibili in grado di far rispettare gli accordi tra le parti una volta soddisfatte determinate condizioni - da qui il termine “contratti intelligenti”.

Ma utilizzare contratti intelligenti per far rispettare gli accordi tra le persone non è semplice, dato che Ethereum è deterministico. Un [sistema deterministico](https://en.wikipedia.org/wiki/Deterministic_algorithm) è un sistema che produce sempre gli stessi risultati dato uno stato iniziale e un input specifico, il che significa che non c'è casualità o variazione nel processo di calcolo degli output dagli input.

Per ottenere un'esecuzione deterministica, le blockchain limitano i nodi al raggiungimento del consenso su semplici domande binarie (vero/falso) utilizzando _solo_ dati memorizzati sulla blockchain stessa. Alcuni esempi sono:

- “Il proprietario del conto (identificato da una chiave pubblica) ha firmato questa transazione con la sua chiave privata associata?”
- “Questo conto ha abbastanza fondi per coprire la transazione?”
- “Questa transazione è valida nel contesto di questo contratto intelligente?”, ecc.

Se le blockchain ricevessero informazioni da fonti esterne (ossia dal mondo reale), il determinismo sarebbe impossibile da raggiungere, impedendo ai nodi di concordare la validità dei cambiamenti dello stato della blockchain. Prendiamo ad esempio un contratto intelligente che esegue una transazione basata sull'attuale tasso di cambio ETH-USD ottenuto da un'API di prezzo tradizionale. Questa cifra probabilmente cambierebbe frequentemente (per non parlare del fatto che l'API potrebbe diventare obsoleta o essere hackerata), il che significa che i nodi che eseguono lo stesso codice del contratto arriverebbero a risultati diversi.

Per una blockchain pubblica, come Ethereum, con migliaia di nodi in tutto il mondo che elaborano transazioni, essere deterministica è essenziale. Senza alcuna autorità centrale che funga da fonte di verità, i nodi necessitano di meccanismi per arrivare allo stesso stato dopo aver applicato le stesse transazioni. Un caso in cui il nodo A esegue il codice di un contratto intelligente e ottiene "3" come risultato mentre il nodo B ottiene "7" dopo aver eseguito la stessa transazione comporterebbe la perdita del consenso e l'eliminazione del valore di Ethereum come piattaforma di calcolo decentralizzata.

Questo scenario evidenzia anche il problema della progettazione di blockchain per estrapolare informazioni da fonti esterne. Gli oracoli, tuttavia, risolvono questo problema prendendo informazioni da fonti fuori dalla catena e memorizzandole sulla blockchain, pronte per essere usate dai contratti intelligenti. Poiché le informazioni memorizzate sulla catena sono inalterabili e pubblicamente disponibili, i nodi di Ethereum possono usare in sicurezza i dati importati dall'oracolo fuori dalla catena per calcolare i cambiamenti di stato senza rompere il consenso.

Per fare questo, un oracolo è tipicamente costituito da un contratto intelligente in esecuzione sulla catena e alcuni componenti fuori dalla catena. Il contratto sulla catena riceve richieste di dati da altri contratti intelligenti, che passa al componente fuori dalla catena (chiamato nodo oracolo). Questo nodo oracolo può interrogare le fonti di dati – utilizzando interfacce di programmazione dell'applicazione (API), ad esempio – e inviare transazioni per memorizzare i dati richiesti nell'archivio del contratto intelligente.

Essenzialmente, un oracolo della blockchain colma il divario informativo tra la blockchain ed il mondo esterno, creando “contratti intelligenti ibridi”. Un contratto intelligente ibrido è uno che funziona sulla base di una combinazione di codice del contratto sulla catena e di infrastruttura fuori dalla catena. I mercati predittivi decentralizzati sono un ottimo esempio di contratto intelligente ibrido. Altri esempi potrebbero essere i contratti intelligenti di assicurazione agricole che pagano quando una serie di oracoli determina che hanno avuto luogo alcuni fenomeni meteorologici.

## Qual è il problema dell'oracolo? Il problema dell'oracolo {#the-oracle-problem}

Gli oracoli risolvono un problema importante, ma introducono anche delle complicazioni, ad esempio:

- Come possiamo verificare che le informazioni iniettate siano state estratte dalla fonte corretta o non siano state manomesse?

- Come possiamo garantire che questi dati siano sempre disponibili e aggiornati regolarmente?

Il cosiddetto “problema dell'oracolo” dimostra i problemi che provengono dall'utilizzo di oracoli della blockchain per inviare input ai contratti intelligenti. I dati di un oracolo devono essere corretti affinché un contratto intelligente sia eseguito correttamente. Inoltre, doversi "affidare" al fatto che gli operatori dell'oracolo forniscano informazioni accurate, compromette l'aspetto di "assenza di fiducia" dei contratti intelligenti.

Oracoli differenti offrono soluzioni differenti al problema dell'oracolo, che esamineremo in seguito. Tipicamente, gli oracoli sono valutati sulla base di quanto siano in grado di gestire le seguenti sfide:

1. **Correttezza**: Un oracolo non dovrebbe far sì che i contratti intelligenti attivino cambiamenti di stato basati su dati non validi fuori dalla catena. Un oracolo deve garantire _autenticità_ e _integrità_ dei dati. Autenticità significa che i dati sono stati ricevuti dalla fonte corretta, mentre integrità significa che i dati restano intatti (cioè non sono alterati), prima dell'invio sulla catena.

2. **Disponibilità**: Un oracolo non dovrebbe ritardare o impedire ai contratti intelligenti di eseguire azioni e attivare cambiamenti di stato. Ciò significa che i dati di un oracolo devono essere _disponibili su richiesta_ senza interruzioni.

3. **Compatibilità degli incentivi**: Un oracolo dovrebbe incentivare i fornitori di dati fuori dalla catena a inviare informazioni corrette ai contratti intelligenti. La compatibilità degli incentivi implica _attribuibilità_ e _responsabilità_. L'attribuibilità consente di correlare un'informazione esterna al suo fornitore, mentre la responsabilità lega i fornitori di dati alle informazioni che forniscono, così che possano essere ricompensati o sanzionati a seconda della qualità delle informazioni ricevute.

## Come funziona un servizio oracolo della blockchain? {#how-does-a-blockchain-oracle-service-work}
### Utenti {#users}

Gli utenti sono entità (ossia contratti intelligenti) che hanno bisogno di informazioni esterne alla blockchain per completare azioni specifiche. Il flusso di lavoro di base di un servizio oracolo inizia con l'invio da parte dell'utente di una richiesta di dati al contratto oracolo. Le richieste di dati solitamente rispondono ad alcune o a tutte le seguenti domande:

1. Quali fonti possono consultare i nodi fuori dalla catena per le informazioni richieste?

2. Come fanno i segnalatori a elaborare le informazioni dalle fonti di dati e a estrarre punti di dati utili?

3. Quanti nodi oracolo possono partecipare al recupero dei dati?

4. Come dovrebbero essere gestite le discrepanze nei report degli oracoli?

5. Quale metodo dovrebbe essere implementato per filtrare gli invii e aggregare i report in un unico valore?

### Contratto dell'oracolo {#oracle-contract}

Il contratto dell'oracolo è il componente sulla catena per il servizio dell'oracolo. Ascolta le richieste di dati da parte di altri contratti, inoltra le richieste di dati ai nodi oracolo e trasmette i dati restituiti ai contratti client. Questo contratto, inoltre, potrebbe eseguire dei calcoli sui punti di dati restituiti per produrre un valore aggregato da inviare al contratto richiedente.

Il contratto dell'oracolo espone delle funzioni che i contratti del client chiamano, effettuando una richiesta di dati. Alla ricezione di una nuova query, il contratto intelligente emetterà un [evento di log](/developers/docs/smart-contracts/anatomy/#events-and-logs) con i dettagli della richiesta di dati. Ciò notifica i nodi fuori dalla catena iscritti al log (solitamente usando qualcosa come il comando JSON-RPC `eth_subscribe`), che procedono a recuperare i dati definiti nell'evento di log.

Di seguito è riportato un [esempio di contratto di oracolo](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) di Pedro Costa. Questo è un semplice servizio di oracolo che può interrogare le API fuori dalla catena su richiesta di altri contratti intelligenti e memorizzare le informazioni richieste sulla blockchain:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //elenco delle richieste effettuate al contratto
  uint currentId = 0; //id della richiesta crescente
  uint minQuorum = 2; //numero minimo di risposte da ricevere prima di dichiarare il risultato finale
  uint totalOracleCount = 3; //conteggio degli oracoli hardcoded

  // definisce una richiesta API generale
  struct Request {
    uint id;                            //id della richiesta
    string urlToQuery;                  //URL API
    string attributeToFetch;            //attributo json (chiave) da recuperare nella risposta
    string agreedValue;                 //valore dalla chiave
    mapping(uint => string) answers;     //risposte fornite dagli oracoli
    mapping(address => uint) quorum;    //oracoli che interrogheranno la risposta (1=l'oracolo non ha votato, 2=l'oracolo ha votato)
  }

  //evento che attiva l'oracolo al di fuori della blockchain
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //attivato quando c'è un consenso sul risultato finale
  event UpdatedRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch,
    string agreedValue
  );

  function createRequest (
    string memory _urlToQuery,
    string memory _attributeToFetch
  )
  public
  {
    uint length = requests.push(Request(currentId, _urlToQuery, _attributeToFetch, ""));
    Request storage r = requests[length-1];

    // Indirizzo degli oracoli hardcoded
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // lancia un evento da rilevare dall'oracolo al di fuori della blockchain
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // aumenta l'id della richiesta
    currentId++;
  }

  //chiamata dall'oracolo per registrare la sua risposta
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //controlla se l'oracolo è nell'elenco degli oracoli fidati
    //e se l'oracolo non ha ancora votato
    if(currRequest.quorum[address(msg.sender)] == 1){

      //indica che questo indirizzo ha votato
      currRequest.quorum[msg.sender] = 2;

      //itera attraverso l' "array" di risposte finché una posizione non è libera e salva il valore recuperato
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //trova il primo slot vuoto
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //itera attraverso l'elenco degli oracoli e controlla se un numero sufficiente di oracoli (quorum minimo)
      //hanno votato la stessa risposta di quella corrente
      for(uint i = 0; i < totalOracleCount; i++){
        bytes memory a = bytes(currRequest.answers[i]);
        bytes memory b = bytes(_valueRetrieved);

        if(keccak256(a) == keccak256(b)){
          currentQuorum++;
          if(currentQuorum >= minQuorum){
            currRequest.agreedValue = _valueRetrieved;
            emit UpdatedRequest (
              currRequest.id,
              currRequest.urlToQuery,
              currRequest.attributeToFetch,
              currRequest.agreedValue
            );
          }
        }
      }
    }
  }
}
```

### Nodi oracolo {#oracle-nodes}

Il nodo oracolo è il componente fuori dalla catena del servizio oracolo. Estrae informazioni da fonti esterne, come le API ospitate su server di terze parti, e le inserisce sulla catena perché siano utilizzate dai contratti intelligenti. I nodi oracolo ascoltano gli eventi dal contratto oracolo sulla catena e procedono a completare l'attività descritta nel log.

Un'attività comune per i nodi oracolo è l'invio di una richiesta [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) a un servizio API, l'analisi della risposta per estrarre i dati rilevanti, la formattazione in un output leggibile dalla blockchain e l'invio sulla catena includendolo in una transazione al contratto dell'oracolo. Inoltre, al nodo dell'oracolo, potrebbe essere richiesto di attestare la validità e l'integrità delle informazioni inviate utilizzando le "prove di autenticità", che esploreremo in seguito.

Anche gli oracoli di calcolo si affidano a nodi fuori dalla catena per eseguire compiti di calcolo che non sarebbe pratico eseguire sulla catena dati i costi del gas e i limiti di dimensione dei blocchi. Ad esempio, il nodo dell'oracolo potrebbe essere incaricato della generazone di una cifra casuale verificabile (es., per i giochi basati sulla blockchain).

## Schemi di progettazione degli oracoli {#oracle-design-patterns}

Esistono diverse tipologie di oracoli, tra cui: _immediate-read_, _publish-subscribe_ e _request-response_, di cui gli ultimi due sono i più popolari tra i contratti intelligenti di Ethereum. Qui descriviamo brevemente i modelli publish-subscribe e request-response.

### Oracoli Publish-subscribe {#publish-subscribe-oracles}

Questo tipo di oracolo espone un "feed di dati" che gli altri contratti possono leggere regolarmente per le informazioni. In questo caso, i dati, dovrebbero cambiare frequentemente, quindi i contratti del client devono ascoltare gli aggiornamenti dei dati, nell'archiviazione dell'oracolo. Un esempio è un oracolo che fornisce le più recenti informazioni sui prezzi ETH-USD agli utenti.

### Oracoli Request-response {#request-response-oracles}

Una configurazione request-response consente al contratto del client di richiedere dei dati arbitrari diversi da quelli forniti da un oracolo publish-subscribe. Gli oracoli request-response sono ideali quando il set di dati è troppo grande per essere archiviato in un contratto intelligente e/o quando gli utenti hanno bisogno solo di una piccola parte dei dati in qualsiasi momento.

Sebbene siano più complessi dei modelli publish-subscribe, gli oracoli request-response sono fondamentalmente quanto descritto nella sezione precedente. L'oracolo avrà un componente sulla catena che riceve una richiesta di dati e la passa a un nodo fuori dalla catena per l'elaborazione.

Gli utenti che avviano le query di dati devono coprire i costi di recupero delle informazioni dalla fonte fuori dalla catena. Il contratto del client, inoltre, deve fornire i fondi per coprire i costi del gas sostenuti dal contratto dell'oracolo nel restituire la risposta tramite la funzione di richiamata, specificata nella richiesta.

## Oracoli centralizzati e decentralizzati {#types-of-oracles}

### Oracoli centralizzati {#centralized-oracles}

Un oracolo centralizzato è controllato da un'unica entità, responsabile dell'aggregazione delle informazioni fuori dalla catena e dell'aggiornamento dei dati del contratto dell'oracolo, quando richiesto. Gli oracoli centralizzati sono efficienti perché si basano su un'unica fonte di verità. Potrebbero funzionare meglio nei casi in cui i set di dati proprietari siano pubblicati direttamente dal proprietario con una firma ampiamente accettata. Tuttavia, comportano anche degli svantaggi:

#### Garanzie di correttezza basse {#low-correctness-guarantees}

Con gli oracoli centralizzati, non c'è modo di confermare se le informazioni siano sono corrette o meno. Anche i fornitori con una "buona reputazione" possono comportarsi modo sleale o subire attacchi hacker. Se l'oracolo è corrotto, i contratti intelligenti verranno eseguiti sulla base di dati errati.

#### Disponibilità scarsa {#poor-availability}

Gli oracoli centralizzati non garantiscono che i dati fuori dalla catena siano sempre disponibili per gli altri contratti intelligenti. Se il fornitore decide di disattivare il servizio o un hacker dirotta il componente fuori dalla catena dell'oracolo, il vostro contratto intelligente è a rischio di un attacco denial of service (DoS).

#### Scarsa compatibilità degli incentivi {#poor-incentive-compatibility}

Gli oracoli centralizzati hanno spesso incentivi mal concepiti o inesistenti per indurre il fornitore di dati a inviare informazioni precise/inalterate. Pagare un oracolo per la correttezza non ne garantisce l'onestà. Questo problema è maggiore all'aumentare del valore controllato dai contratti intelligenti.

### Oracoli decentralizzati {#decentralized-oracles}

Gli oracoli decentralizzati sono progettati per superare le limitazioni degli oracoli centralizzati eliminando punti di errori unici. Un servizio di oracolo decentralizzato comprende più partecipanti in una rete peer-to-peer che formano un consenso sui dati fuori dalla catena prima di inviarli a un contratto intelligente.

Un oracolo decentralizzato dovrebbe (idealmente) essere senza permessi, senza fiducia e libero dall'amministrazione di una parte centrale; in realtà, la decentralizzazione tra gli oracoli è su uno spettro. Ci sono reti di oracoli semi-decentralizzati dove chiunque può partecipare, ma con un “proprietario” che approva e rimuove i nodi in base alle prestazioni storiche. Esistono anche reti di oracoli completamente decentralizzati: queste solitamente funzionano come blockchain standalone e hanno definito meccanismi di consenso per coordinare i nodi e punire i comportamenti scorretti.

L'utilizzo di oracoli decentralizzati ha i seguenti vantaggi:

### Garanzie di correttezza elevate {#high-correctness-guarantees}

Gli oracoli decentralizzati tentano di ottenere la correttezza dei dati utilizzando approcci diversi. Ciò include l'uso di prove che attestino l'autenticità e l'integrità delle informazioni restituite e che impongano a più entità di concordare collettivamente la validità dei dati fuori dalla catena.

#### Prove di autenticità {#authenticity-proofs}

Le prove di autenticità sono meccanismi crittografici che consentono la verifica indipendente delle informazioni recuperate da fonti esterne. Queste prove possono convalidare la fonte delle informazioni e rilevare eventuali modifiche ai dati dopo il recupero.

Esempi di prove di autenticità includono:

**Prove di Transport Layer Security (TLS)**: i nodi oracolo spesso recuperano dati da fonti esterne utilizzando una connessione HTTP sicura basata sul protocollo Transport Layer Security (TLS). Alcuni oracoli decentralizzati utilizzano prove di autenticità per verificare le sessioni TLS (ossia, confermano lo scambio di informazioni tra un nodo e un server specifico) e confermare che il contenuto della sessione non è stato alterato.

**Attestazioni Trusted Execution Environment (TEE)**: un [ambiente di esecuzione affidabile](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) è un ambiente computazionale sandbox isolato dai processi operativi del suo sistema host. I TEE garantiscono che qualunque codice applicativo o dato memorizzato/utilizzato nell'ambiente di calcolo conservi integrità, riservatezza e immutabilità. Gli utenti possono anche generare un attestato per dimostrare che un'istanza di applicazione è in esecuzione all'interno dell'ambiente di esecuzione affidabile.

Alcune classi di oracoli decentralizzati richiedono agli operatori dei nodi oracolo di fornire attestazioni TEE. Questo conferma ad un utente che l'operatore del nodo sta eseguendo un'istanza del client oracolo in un ambiente di esecuzione affidabile. I TEE impediscono ai processi esterni di modificare o leggere il codice e i dati di un’applicazione, pertanto, le attestazioni dimostrano che il nodo oracolo ha mantenuto intatte e riservate le informazioni.

#### Convalida delle informazioni basata sul consenso {#consensus-based-validation-of-information}

Gli oracoli centralizzati si affidano a un'unica fonte di verità quando forniscono dati ai contratti intelligenti, il che introduce la possibilità di pubblicare informazioni imprecise. Gli oracoli decentralizzati risolvono questo problema affidandosi a più nodi oracolo per interrogare le informazioni fuori dalla catena. Confrontando i dati provenienti da più fonti, gli oracoli decentralizzati riducono il rischio di trasmettere informazioni non valide ai contratti sulla catena.

Gli oracoli decentralizzati, tuttavia, devono gestire le discrepanze nelle informazioni recuperate da più fonti fuori dalla catena. Per ridurre al minimo le differenze di informazione e garantire che i dati passati al contratto oracolo riflettano l'opinione collettiva dei nodi oracolo, gli oracoli decentralizzati utilizzano i seguenti meccanismi:

##### Votazione/staking sulla precisione dei dati

Alcune reti di oracoli decentralizzati richiedono ai partecipanti di votare o mettere in staking token sulla precisione delle risposte alle interrogazioni di dati (ad esempio, "Chi ha vinto le elezioni negli Stati Uniti del 2020?") utilizzando il token nativo della rete. Un protocollo di aggregazione aggrega quindi i voti e gli stake e prende come valida la risposta sostenuta dalla maggioranza.

I nodi le cui risposte si discostano dalla risposta maggioritaria vengono penalizzati con la distribuzione dei loro token ad altri che forniscono valori più corretti. Obbligare i nodi a fornire una garanzia prima di fornire i dati incentiva le risposte oneste, poiché si presume che siano attori economici razionali intenti a massimizzare i rendimenti.

Lo staking/la votazione proteggono anche gli oracoli decentralizzati dagli [attacchi Sybil](/glossary/#sybil-attack) in cui attori malintenzionati creano più identità per manipolare il sistema di consenso. Tuttavia, lo staking non può impedire il "freeloading" (nodi oracolo che copiano informazioni da altri) e la "convalida pigra" (nodi oracolo che seguono la maggioranza senza verificare le informazioni stesse).

##### Meccanismi del punto di Schelling

Il [punto di Schelling](https://en.wikipedia.org/wiki/Focal_point_\(game_theory\)) è un concetto della teoria dei giochi che presuppone che più entità, in assenza di qualsiasi comunicazione, sceglieranno sempre una soluzione comune a un problema. I meccanismi del punto di Schelling sono spesso utilizzati nelle reti di oracoli decentralizzati per consentire ai nodi di raggiungere un consenso sulle risposte alle richieste di dati.

Una prima idea a riguardo è stato [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/), un feed di dati proposto in cui i partecipanti inviano risposte a domande "scalari" (domande le cui risposte sono descritte da una grandezza, ad esempio "qual è il prezzo di ETH?"), insieme a un deposito. Gli utenti che forniscono valori compresi tra il 25° e il 75° [percentile](https://en.wikipedia.org/wiki/Percentile) vengono premiati, mentre quelli i cui valori si discostano ampiamente dal valore mediano vengono penalizzati.

Sebbene SchellingCoin oggi non esista, svariati oracoli decentralizzati, in particolare gli [Oracoli del Protocollo Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module), utilizzano il meccanismo del punto di Schelling per migliorare l'accuratezza dei dati dell'oracolo. Ogni Oracolo Maker consiste in una rete P2P fuori dalla catena di nodi ("relayer" e "feed") che inviano i prezzi di mercato per le risorse collaterali e un contratto "Medianizer" sulla catena che calcola la mediana di tutti i valori forniti. Una volta terminato il periodo di ritardo specificato, questo valore mediano diventa il nuovo prezzo di riferimento per la risorsa associata.

Altri esempi di oracoli che usano i meccanismi del punto di Schelling includono [Chainlink Offchain Reporting](https://docs.chain.link/architecture-overview/off-chain-reporting) e [Witnet](https://witnet.io/). In entrambi i sistemi, le risposte dei nodi oracolo nella rete peer-to-peer vengono aggregate in un unico valore, come la media o la mediana. I nodi vengono premiati o sanzionati in base alla misura in cui le loro risposte si allineano o si discostano dal valore aggregato.

I meccanismi del punto di Schelling sono interessanti perché riducono al minimo lo spazio occupato sulla catena (è necessario inviare una sola transazione) garantendo al contempo la decentralizzazione. Questa è possibile perché i nodi devono approvare l'elenco delle risposte inviate prima che questo venga inserito nell'algoritmo che produce il valore medio/mediano.

### Disponibilità {#availability}

I servizi oracolo decentralizzati garantiscono un'elevata disponibilità di dati fuori dalla catena per i contratti intelligenti. Ciò si ottiene decentralizzando sia la fonte delle informazioni fuori dalla catena sia i nodi responsabili del trasferimento delle informazioni sulla catena.

Questo garantisce la tolleranza ai guasti, perché il contratto oracolo può affidarsi a più nodi (che si affidano anche a più fonti di dati) per eseguire interrogazioni da altri contratti. La decentralizzazione a livello di fonte _e_ di operatore del nodo è fondamentale: una rete di nodi oracolo che serve informazioni recuperate dalla stessa fonte incorrerà nello stesso problema di un oracolo centralizzato.

È anche possibile che gli oracoli basati sullo stake penalizzino gli operatori dei nodi che non rispondono rapidamente alle richieste di dati. Questo incentiva in modo significativo i nodi oracolo a investire nell'infrastruttura tollerante ai guasti e a fornire i dati in modo tempestivo.

### Buona compatibilità degli incentivi {#good-incentive-compatibility}

Gli oracoli decentralizzati implementano svariati modelli di incentivi per prevenire il comportamento [bizantino](https://en.wikipedia.org/wiki/Byzantine_fault) tra i nodi dell'oracolo. In particolare, ottengono _attribuibilità_ e _responsabilità_:

1. Ai nodi oracolo decentralizzati viene spesso richiesto di firmare i dati che forniscono in risposta alle richieste di dati. Queste informazioni aiutano a valutare le prestazioni storiche dei nodi oracolo, in modo che gli utenti possano filtrare i nodi oracolo inaffidabili quando effettuano richieste di dati. Un esempio è l'[Algorithmic Reputation System](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) di Witnet.

2. Gli oracoli decentralizzati, come spiegato in precedenza, possono richiedere ai nodi di mettere token in staking per garantire la veridicità dei dati inviati. Se i dati vengono confermati, lo stake può essere restituito insieme ai premi per il servizio onesto. Ma può anche essere tagliato nel caso in cui le informazioni non siano corrette, il che fornisce un certo grado di responsabilità.

## Applicazioni degli oracoli nei contratti intelligenti {#applications-of-oracles-in-smart-contracts}

I seguenti sono casi d'uso comuni per gli oracoli in Ethereum:

### Recupero dei dati finanziari {#retrieving-financial-data}

Le applicazioni di [finanza decentralizzata](/defi/) (DeFi) consentono di concedere e ricevere prestiti e scambiare risorse peer-to-peer. Questo spesso impone di ottenere diverse informazioni finanziarie, tra cui i dati sui tassi di cambio (per calcolare il valore in moneta legale delle criptovalute o per confrontare i prezzi dei token) e i dati sui mercati dei capitali (per calcolare il valore delle risorse tokenizzate, come l'oro o il dollaro USA).

Un protocollo di prestito DeFi, ad esempio, deve poter interrogare i prezzi di mercato correnti per le risorse (es. ETH) depositate come garanzia. Ciò consente al contratto di determinare il valore delle risorse collaterali e di determinare quanto può prendere in prestito dal sistema.

Gli “oracoli di prezzo” (come sono spesso chiamati) più popolari nella DeFi includono i feed di prezzo di Chainlink, l'[Open Price Feed](https://compound.finance/docs/prices) del Compound Protocol, i [prezzi medi ponderati nel tempo (TWAP)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) di Uniswap e gli [oracoli di Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module).

I costruttori dovrebbero comprendere le avvertenze che accompagnano questi oracoli dei prezzi prima di integrarli nel proprio progetto. Questo [articolo](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) fornisce un'analisi dettagliata di cosa considerare quando si prevede di utilizzare uno qualsiasi degli oracoli di prezzo menzionati.

Di seguito è riportato un esempio di come recuperare l'ultimo prezzo dell'ETH nel proprio contratto intelligente utilizzando un feed di prezzo di Chainlink:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
```

### Generazione di casualità verificabile {#generating-verifiable-randomness}

Alcune applicazioni della blockchain, come i giochi o le lotterie basate su blockchain, richiedono un alto livello di imprevedibilità e casualità per funzionare efficacemente. Tuttavia, l'esecuzione deterministica delle blockchain elimina la casualità.

L'approccio originale era quello di usare funzioni crittografiche pseudocasuali, come `blockhash`, ma queste potevano essere [manipolate dai minatori](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) risolvendo l'algoritmo di proof-of-work. Inoltre, il [passaggio di Ethereum al proof-of-stake](/roadmap/merge/) significa che gli sviluppatori non possono più fare affidamento su `blockhash` per la casualità sulla catena. Il [meccanismo RANDAO](https://eth2book.info/altair/part2/building_blocks/randomness) della Beacon Chain fornisce invece una fonte alternativa di casualità.

È possibile generare il valore casuale fuori dalla catena e inviarlo sulla catena, ma ciò impone agli utenti requisiti di fiducia elevati. Devono credere che il valore sia stato realmente generato attraverso meccanismi imprevedibili e non sia stato alterato in transito.

Gli oracoli progettati per il calcolo fuori dalla catena risolvono questo problema generando in modo sicuro risultati casuali fuori dalla catena che trasmettono sulla catena insieme a prove crittografiche che attestano l'imprevedibilità del processo. Un esempio è [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (Verifiable Random Function), un generatore di numeri casuali (RNG) dimostrabilmente equo e a prova di manomissione, utile per costruire contratti intelligenti affidabili per applicazioni che si basano su risultati imprevedibili.

### Ottenere risultati per eventi {#getting-outcomes-for-events}

Con gli oracoli, la creazione di contratti intelligenti che rispondono a eventi del mondo reale è facile. I servizi oracolo lo rendono possibile consentendo ai contratti di connettersi ad API esterne attraverso componenti fuori dalla catena e di consumare informazioni da tali fonti di dati. Ad esempio, la dApp di previsione menzionata in precedenza può richiedere a un oracolo di restituire i risultati delle elezioni da una fonte fidata fuori dalla catena (ad esempio l'Associated Press).

L'utilizzo degli oracoli per recuperare i dati secondo i risultati del mondo reale consente altri nuovi casi d'uso; ad esempio, un prodotto assicurativo decentralizzato necessita di informazioni accurate su meteo, disastri, ecc., per funzionare efficientemente.

### Automatizzazione dei contratti intelligenti {#automating-smart-contracts}

I contratti intelligenti non si eseguono automaticamente; piuttosto, un conto posseduto esternamente (EOA), o un altro conto di contratto, deve attivare le funzioni giuste per eseguire il codice del contratto. Nella maggior parte dei casi, la maggior parte delle funzioni del contratto è pubblica e può essere invocata da EOA e altri contratti.

Ma in un contratto esistono anche _funzioni private_ che non sono accessibili ad altri, ma critiche per la funzionalità complessiva della dApp. Tra gli esempi figurano una funzione `mintERC721Token()` che conia periodicamente nuovi NFT per gli utenti, una funzione per l'assegnazione di pagamenti in un mercato di previsione o una funzione per sbloccare i token in staking in un DEX.

Gli sviluppatori dovranno attivare tali funzioni a intervalli per mantenere il corretto funzionamento dell'applicazione. Tuttavia, ciò potrebbe comportare un aumento delle ore perse in attività banali per gli sviluppatori, motivo per cui l'automazione dell'esecuzione dei contratti intelligenti è accattivante.

Alcune reti di oracoli decentralizzati offrono servizi di automazione, che consentono ai nodi oracolo fuori dalla catena di attivare funzioni di contratti intelligenti in base a parametri definiti dall'utente. In genere, ciò richiede la "registrazione" del contratto interessato al servizio oracolo, la fornitura di fondi per pagare l'operatore dell'oracolo e la specificazione delle condizioni o dei tempi di attivazione del contratto.

La [Keeper Network](https://chain.link/keepers) di Chainlink fornisce opzioni per i contratti intelligenti per esternalizzare le attività di manutenzione ordinaria in modo decentralizzato e con il minimo di fiducia. Leggi la [documentazione ufficiale di Keeper](https://docs.chain.link/docs/chainlink-keepers/introduction/) per le informazioni su come rendere il tuo contratto compatibile con Keeper e utilizzare il servizio Upkeep.

## Come usare gli oracoli della blockchain {#use-blockchain-oracles}

Ci sono più applicazioni di oracoli che puoi integrare nella tua dapp su Ethereum:

**[Chainlink](https://chain.link/)** - _Le reti di oracoli decentralizzati di Chainlink forniscono input, output e calcoli a prova di manomissione per supportare contratti intelligenti avanzati su qualsiasi blockchain._

**[Oracoli RedStone](https://redstone.finance/)** - _RedStone è un oracolo modulare decentralizzato che fornisce feed di dati ottimizzati per il gas. È specializzato nell'offerta di feed di prezzo per asset emergenti, come i token di staking liquido (LST), i token di restaking liquido (LRT) e i derivati di staking di Bitcoin._

**[Chronicle](https://chroniclelabs.org/)** - _Chronicle supera le attuali limitazioni del trasferimento dei dati sulla catena sviluppando oracoli veramente scalabili, economici, decentralizzati e verificabili._

**[Witnet](https://witnet.io/)** - _Witnet è un oracolo senza permessi, decentralizzato e resistente alla censura che aiuta i contratti intelligenti a reagire agli eventi del mondo reale con forti garanzie cripto-economiche._

**[Oracolo UMA](https://uma.xyz)** - _L'oracolo ottimistico di UMA consente ai contratti intelligenti di ricevere rapidamente qualsiasi tipo di dati per diverse applicazioni, tra cui assicurazioni, derivati finanziari e mercati di previsione._

**[Tellor](https://tellor.io/)** - _Tellor è un protocollo di oracolo trasparente e senza permessi per i tuoi contratti intelligenti al fine di ottenere facilmente tutti i dati ogni volta che ne hanno bisogno._

**[Band Protocol](https://bandprotocol.com/)** - _Band Protocol è una piattaforma di oracolo di dati tra catene che aggrega e collega dati reali e API ai contratti intelligenti._

**[Pyth Network](https://pyth.network/)** - _La rete Pyth è una rete di oracoli finanziari di prima parte progettata per pubblicare dati continui del mondo reale sulla catena in un ambiente resistente alle manomissioni, decentralizzato e autosostenibile._

**[DAO di API3](https://www.api3.org/)** - _La DAO di API3 distribuisce soluzioni di oracolo di prima parte che offrono una maggiore trasparenza della fonte, sicurezza e scalabilità in una soluzione decentralizzata per i contratti intelligenti_

**[Supra](https://supra.com/)** - Un kit di strumenti integrato verticalmente di soluzioni tra catene che interconnettono tutte le blockchain, pubbliche (L1 e L2) o private (aziendali), fornendo feed sui prezzi degli oracoli decentralizzati utilizzabili per i casi d'uso sulla catena e fuori dalla catena.

**[Gas Network](https://gas.network/)** - Una piattaforma di oracolo distribuita che fornisce dati sul prezzo del gas in tempo reale su tutta la blockchain. Portando sulla catena i dati dei principali fornitori di dati sui prezzi del gas, Gas Network contribuisce a promuovere l'interoperabilità. Gas Network supporta i dati di oltre 35 catene, tra cui la Rete Principale di Ethereum e molti dei principali L2.

## Letture consigliate {#further-reading}

**Articoli**

- [Cos'è un oracolo della blockchain?](https://chain.link/education/blockchain-oracles) — _Chainlink_
- [Cos'è un oracolo della blockchain?](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) — _Patrick Collins_
- [Oracoli decentralizzati: una panoramica completa](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — _Julien Thevenard_
- [Implementazione di un oracolo della blockchain su Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Perché i contratti intelligenti non possono effettuare chiamate API?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — _StackExchange_
- [Quindi vuoi usare un oracolo di prezzo](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — _samczsun_

**Video**

- [Oracoli ed espansione dell'utilità della blockchain](https://youtu.be/BVUZpWa8vpw) — _Real Vision Finance_

**Guide**

- [Come recuperare il prezzo attuale di Ethereum in Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — _Chainlink_
- [Consumo di dati dell'oracolo](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — _Chronicle_

**Esempi di progetti**

- [Progetto iniziale completo di Chainlink per Ethereum in Solidity](https://github.com/hackbg/chainlink-fullstack) — _HackBG_
