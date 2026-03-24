---
title: Oracoli
description: "Gli oracoli forniscono ai contratti intelligenti di Ethereum l'accesso ai dati del mondo reale, sbloccando più casi d'uso e un maggior valore per gli utenti."
lang: it
---

Gli oracoli sono applicazioni che producono feed di dati che rendono le fonti di dati fuori catena disponibili alla blockchain per i contratti intelligenti. Ciò è necessario perché i contratti intelligenti basati su Ethereum non possono, per impostazione predefinita, accedere alle informazioni archiviate all'esterno della rete blockchain.

Dare ai contratti intelligenti la capacità di essere eseguiti utilizzando dati fuori catena estende l'utilità e il valore delle applicazioni decentralizzate. Ad esempio, i mercati di previsione on-chain si affidano agli oracoli per fornire informazioni sui risultati che utilizzano per convalidare le previsioni degli utenti. Supponiamo che Alice scommetta 20 ETH su chi diventerà il prossimo Presidente degli Stati Uniti. In tal caso, la dApp del mercato di previsione ha bisogno di un oracolo per confermare i risultati elettorali e determinare se Alice è idonea a ricevere un pagamento.

## Prerequisiti {#prerequisites}

Questa pagina presuppone che il lettore abbia familiarità con i fondamenti di [Ethereum](/), inclusi i [nodi](/developers/docs/nodes-and-clients/), i [meccanismi di consenso](/developers/docs/consensus-mechanisms/) e la [EVM](/developers/docs/evm/). Dovresti anche avere una buona comprensione dei [contratti intelligenti](/developers/docs/smart-contracts/) e dell'[anatomia dei contratti intelligenti](/developers/docs/smart-contracts/anatomy/), specialmente degli [eventi](/glossary/#events).

## Cos'è un oracolo blockchain? {#what-is-a-blockchain-oracle}

Gli oracoli sono applicazioni che reperiscono, verificano e trasmettono informazioni esterne (ovvero, informazioni archiviate fuori catena) ai contratti intelligenti in esecuzione sulla blockchain. Oltre a "estrarre" dati fuori catena e trasmetterli su Ethereum, gli oracoli possono anche "inviare" informazioni dalla blockchain a sistemi esterni, ad es. sbloccando una serratura intelligente una volta che l'utente invia una commissione tramite una transazione di Ethereum.

Senza un oracolo, un contratto intelligente sarebbe limitato interamente ai dati on-chain.

Gli oracoli differiscono in base alla fonte dei dati (una o più fonti), ai modelli di fiducia (centralizzati o decentralizzati) e all'architettura di sistema (lettura immediata, pubblicazione-sottoscrizione e richiesta-risposta). Possiamo anche distinguere tra gli oracoli in base al fatto che recuperino dati esterni per l'uso da parte di contratti on-chain (oracoli di input), inviino informazioni dalla blockchain alle applicazioni fuori catena (oracoli di output) o eseguano compiti computazionali fuori catena (oracoli computazionali).

## Perché i contratti intelligenti hanno bisogno degli oracoli? {#why-do-smart-contracts-need-oracles}

Molti sviluppatori vedono i contratti intelligenti come codice in esecuzione a indirizzi specifici sulla blockchain. Tuttavia, una [visione più generale dei contratti intelligenti](/smart-contracts/) è che sono programmi software auto-eseguibili in grado di far rispettare gli accordi tra le parti una volta soddisfatte condizioni specifiche - da qui il termine "contratti intelligenti".

Ma usare i contratti intelligenti per far rispettare gli accordi tra le persone non è semplice, dato che Ethereum è deterministico. Un [sistema deterministico](https://en.wikipedia.org/wiki/Deterministic_algorithm) è quello che produce sempre gli stessi risultati dato uno stato iniziale e un particolare input, il che significa che non c'è casualità o variazione nel processo di calcolo degli output dagli input.

Per ottenere un'esecuzione deterministica, le blockchain limitano i nodi a raggiungere il consenso su semplici domande binarie (vero/falso) utilizzando _solo_ i dati archiviati sulla blockchain stessa. Esempi di tali domande includono:

- "Il proprietario dell'account (identificato da una chiave pubblica) ha firmato questa transazione con la chiave privata associata?"
- "Questo account ha fondi sufficienti per coprire la transazione?"
- "Questa transazione è valida nel contesto di questo contratto intelligente?", ecc.

Se le blockchain ricevessero informazioni da fonti esterne (ovvero, dal mondo reale), il determinismo sarebbe impossibile da raggiungere, impedendo ai nodi di concordare sulla validità delle modifiche allo stato della blockchain. Prendi ad esempio un contratto intelligente che esegue una transazione in base all'attuale tasso di cambio ETH-USD ottenuto da una tradizionale API di prezzo. È probabile che questa cifra cambi frequentemente (per non parlare del fatto che l'API potrebbe essere deprecata o hackerata), il che significa che i nodi che eseguono lo stesso codice del contratto arriverebbero a risultati diversi.

Per una blockchain pubblica come Ethereum, con migliaia di nodi in tutto il mondo che elaborano transazioni, il determinismo è fondamentale. Senza un'autorità centrale che funga da fonte di verità, i nodi hanno bisogno di meccanismi per arrivare allo stesso stato dopo aver applicato le stesse transazioni. Un caso in cui il nodo A esegue il codice di un contratto intelligente e ottiene "3" come risultato, mentre il nodo B ottiene "7" dopo aver eseguito la stessa transazione, causerebbe la rottura del consenso ed eliminerebbe il valore di Ethereum come piattaforma di calcolo decentralizzata.

Questo scenario evidenzia anche il problema della progettazione di blockchain per estrarre informazioni da fonti esterne. Gli oracoli, tuttavia, risolvono questo problema prendendo informazioni da fonti fuori catena e archiviandole sulla blockchain affinché i contratti intelligenti le consumino. Poiché le informazioni archiviate on-chain sono inalterabili e pubblicamente disponibili, i nodi di Ethereum possono utilizzare in sicurezza i dati fuori catena importati dall'oracolo per calcolare i cambiamenti di stato senza interrompere il consenso.

Per fare ciò, un oracolo è tipicamente costituito da un contratto intelligente in esecuzione on-chain e da alcuni componenti fuori catena. Il contratto on-chain riceve richieste di dati da altri contratti intelligenti, che passa al componente fuori catena (chiamato nodo oracolo). Questo nodo oracolo può interrogare le fonti di dati — utilizzando interfacce di programmazione delle applicazioni (API), ad esempio — e inviare transazioni per archiviare i dati richiesti nell'archiviazione del contratto intelligente.

Essenzialmente, un oracolo blockchain colma il divario informativo tra la blockchain e l'ambiente esterno, creando "contratti intelligenti ibridi". Un contratto intelligente ibrido è quello che funziona in base a una combinazione di codice del contratto on-chain e infrastruttura fuori catena. I mercati di previsione decentralizzati sono un eccellente esempio di contratti intelligenti ibridi. Altri esempi potrebbero includere contratti intelligenti di assicurazione del raccolto che pagano quando un insieme di oracoli determina che si sono verificati determinati fenomeni meteorologici.

## Qual è il problema dell'oracolo? {#the-oracle-problem}

Gli oracoli risolvono un problema importante, ma introducono anche alcune complicazioni, ad es.:

- Come verifichiamo che le informazioni iniettate siano state estratte dalla fonte corretta o non siano state manomesse?

- Come garantiamo che questi dati siano sempre disponibili e aggiornati regolarmente?

Il cosiddetto "problema dell'oracolo" dimostra i problemi che derivano dall'utilizzo degli oracoli blockchain per inviare input ai contratti intelligenti. I dati provenienti da un oracolo devono essere corretti affinché un contratto intelligente venga eseguito correttamente. Inoltre, dover 'fidarsi' degli operatori degli oracoli per fornire informazioni accurate mina l'aspetto 'senza fiducia' (trustless) dei contratti intelligenti.

Diversi oracoli offrono diverse soluzioni al problema dell'oracolo, che esploreremo in seguito. Gli oracoli sono tipicamente valutati in base a quanto bene riescono a gestire le seguenti sfide:

1. **Correttezza**: Un oracolo non dovrebbe far sì che i contratti intelligenti inneschino cambiamenti di stato basati su dati fuori catena non validi. Un oracolo deve garantire l'_autenticità_ e l'_integrità_ dei dati. Autenticità significa che i dati sono stati ottenuti dalla fonte corretta, mentre integrità significa che i dati sono rimasti intatti (ovvero, non sono stati alterati) prima di essere inviati on-chain.

2. **Disponibilità**: Un oracolo non dovrebbe ritardare o impedire ai contratti intelligenti di eseguire azioni e innescare cambiamenti di stato. Ciò significa che i dati provenienti da un oracolo devono essere _disponibili su richiesta_ senza interruzioni.

3. **Compatibilità degli incentivi**: Un oracolo dovrebbe incentivare i fornitori di dati fuori catena a inviare informazioni corrette ai contratti intelligenti. La compatibilità degli incentivi implica _attribuibilità_ e _responsabilità_. L'attribuibilità consente di collegare un'informazione esterna al suo fornitore, mentre la responsabilità vincola i fornitori di dati alle informazioni che forniscono, in modo che possano essere ricompensati o penalizzati in base alla qualità delle informazioni fornite.

## Come funziona un servizio di oracolo blockchain? {#how-does-a-blockchain-oracle-service-work}

### Utenti {#users}

Gli utenti sono entità (ovvero, contratti intelligenti) che necessitano di informazioni esterne alla blockchain per completare azioni specifiche. Il flusso di lavoro di base di un servizio di oracolo inizia con l'utente che invia una richiesta di dati al contratto dell'oracolo. Le richieste di dati di solito risponderanno ad alcune o a tutte le seguenti domande:

1. Quali fonti possono consultare i nodi fuori catena per le informazioni richieste?

2. Come elaborano i reporter le informazioni dalle fonti di dati e ne estraggono punti dati utili?

3. Quanti nodi oracolo possono partecipare al recupero dei dati?

4. Come dovrebbero essere gestite le discrepanze nei report degli oracoli?

5. Quale metodo dovrebbe essere implementato nel filtrare gli invii e aggregare i report in un singolo valore?

### Contratto dell'oracolo {#oracle-contract}

Il contratto dell'oracolo è il componente on-chain per il servizio di oracolo. Ascolta le richieste di dati da altri contratti, inoltra le query di dati ai nodi oracolo e trasmette i dati restituiti ai contratti client. Questo contratto può anche eseguire alcuni calcoli sui punti dati restituiti per produrre un valore aggregato da inviare al contratto richiedente.

Il contratto dell'oracolo espone alcune funzioni che i contratti client chiamano quando effettuano una richiesta di dati. Alla ricezione di una nuova query, il contratto intelligente emetterà un [evento di log](/developers/docs/smart-contracts/anatomy/#events-and-logs) con i dettagli della richiesta di dati. Questo notifica i nodi fuori catena iscritti al log (di solito utilizzando qualcosa come il comando JSON-RPC `eth_subscribe`), che procedono a recuperare i dati definiti nell'evento di log.

Di seguito è riportato un [esempio di contratto oracolo](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) di Pedro Costa. Questo è un semplice servizio di oracolo che può interrogare API fuori catena su richiesta di altri contratti intelligenti e archiviare le informazioni richieste sulla blockchain:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; // lista delle richieste effettuate al contratto
  uint currentId = 0; // id di richiesta crescente
  uint minQuorum = 2; // numero minimo di risposte da ricevere prima di dichiarare il risultato finale
  uint totalOracleCount = 3; // conteggio degli oracoli hardcoded

  // definisce una richiesta api generale
  struct Request {
    uint id; // id della richiesta
    string urlToQuery; // url dell'API
    string attributeToFetch; // attributo json (chiave) da recuperare nella risposta
    string agreedValue; // valore dalla chiave
    mapping(uint => string) answers; // risposte fornite dagli oracoli
    mapping(address => uint) quorum; // oracoli che interrogheranno la risposta (1=l'oracolo non ha votato, 2=l'oracolo ha votato)
  }

  // evento che innesca l'oracolo al di fuori della blockchain
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  // innescato quando c'è un consenso sul risultato finale
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

    // indirizzo degli oracoli hardcoded
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // lancia un evento per essere rilevato dall'oracolo al di fuori della blockchain
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // incrementa l'id della richiesta
    currentId++;
  }

  // chiamato dall'oracolo per registrare la sua risposta
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    // controlla se l'oracolo è nella lista degli oracoli fidati
    // e se l'oracolo non ha ancora votato
    if(currRequest.quorum[address(msg.sender)] == 1){

      // segna che questo indirizzo ha votato
      currRequest.quorum[msg.sender] = 2;

      // itera attraverso l'"array" delle risposte finché una posizione è libera e salva il valore recuperato
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        // trova il primo slot vuoto
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      // itera attraverso la lista degli oracoli e controlla se ci sono abbastanza oracoli (quorum minimo)
      // hanno votato la stessa risposta di quella attuale
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

Il nodo oracolo è il componente fuori catena del servizio di oracolo. Estrae informazioni da fonti esterne, come le API ospitate su server di terze parti, e le inserisce on-chain per il consumo da parte dei contratti intelligenti. I nodi oracolo ascoltano gli eventi dal contratto dell'oracolo on-chain e procedono a completare il compito descritto nel log.

Un compito comune per i nodi oracolo è inviare una richiesta [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) a un servizio API, analizzare la risposta per estrarre i dati rilevanti, formattarli in un output leggibile dalla blockchain e inviarli on-chain includendoli in una transazione verso il contratto dell'oracolo. Al nodo oracolo potrebbe anche essere richiesto di attestare la validità e l'integrità delle informazioni inviate utilizzando "prove di autenticità", che esploreremo in seguito.

Gli oracoli computazionali si affidano anche a nodi fuori catena per eseguire compiti computazionali che sarebbero poco pratici da eseguire on-chain, dati i costi del gas e i limiti di dimensione del blocco. Ad esempio, il nodo oracolo potrebbe essere incaricato di generare una cifra verificabilmente casuale (ad es., per i giochi basati su blockchain).

## Modelli di progettazione degli oracoli {#oracle-design-patterns}

Gli oracoli sono di diversi tipi, tra cui _lettura immediata_, _pubblicazione-sottoscrizione_ e _richiesta-risposta_, con gli ultimi due che sono i più popolari tra i contratti intelligenti di Ethereum. Qui descriviamo brevemente i modelli di pubblicazione-sottoscrizione e richiesta-risposta.

### Oracoli di pubblicazione-sottoscrizione {#publish-subscribe-oracles}

Questo tipo di oracolo espone un "feed di dati" che altri contratti possono leggere regolarmente per ottenere informazioni. In questo caso ci si aspetta che i dati cambino frequentemente, quindi i contratti client devono ascoltare gli aggiornamenti dei dati nell'archiviazione dell'oracolo. Un esempio è un oracolo che fornisce agli utenti le ultime informazioni sul prezzo ETH-USD.

### Oracoli di richiesta-risposta {#request-response-oracles}

Una configurazione di richiesta-risposta consente al contratto client di richiedere dati arbitrari diversi da quelli forniti da un oracolo di pubblicazione-sottoscrizione. Gli oracoli di richiesta-risposta sono ideali quando il set di dati è troppo grande per essere archiviato nell'archiviazione di un contratto intelligente e/o gli utenti avranno bisogno solo di una piccola parte dei dati in un dato momento.

Sebbene più complessi dei modelli di pubblicazione-sottoscrizione, gli oracoli di richiesta-risposta sono fondamentalmente ciò che abbiamo descritto nella sezione precedente. L'oracolo avrà un componente on-chain che riceve una richiesta di dati e la passa a un nodo fuori catena per l'elaborazione.

Gli utenti che avviano query di dati devono coprire il costo del recupero delle informazioni dalla fonte fuori catena. Il contratto client deve anche fornire fondi per coprire i costi del gas sostenuti dal contratto dell'oracolo nel restituire la risposta tramite la funzione di callback specificata nella richiesta.

## Oracoli centralizzati vs. decentralizzati {#types-of-oracles}

### Oracoli centralizzati {#centralized-oracles}

Un oracolo centralizzato è controllato da una singola entità responsabile dell'aggregazione delle informazioni fuori catena e dell'aggiornamento dei dati del contratto dell'oracolo come richiesto. Gli oracoli centralizzati sono efficienti poiché si affidano a un'unica fonte di verità. Possono funzionare meglio nei casi in cui i set di dati proprietari vengono pubblicati direttamente dal proprietario con una firma ampiamente accettata. Tuttavia, portano anche degli svantaggi:

#### Basse garanzie di correttezza {#low-correctness-guarantees}

Con gli oracoli centralizzati, non c'è modo di confermare se le informazioni fornite siano corrette o meno. Anche i fornitori "rispettabili" possono diventare disonesti o essere hackerati. Se l'oracolo viene corrotto, i contratti intelligenti verranno eseguiti in base a dati errati.

#### Scarsa disponibilità {#poor-availability}

Gli oracoli centralizzati non garantiscono di rendere sempre disponibili i dati fuori catena ad altri contratti intelligenti. Se il fornitore decide di disattivare il servizio o un hacker dirotta il componente fuori catena dell'oracolo, il tuo contratto intelligente è a rischio di un attacco di negazione del servizio (DoS).

#### Scarsa compatibilità degli incentivi {#poor-incentive-compatibility}

Gli oracoli centralizzati hanno spesso incentivi mal progettati o inesistenti affinché il fornitore di dati invii informazioni accurate/inalterate. Pagare un oracolo per la correttezza non garantisce l'onestà. Questo problema diventa più grande man mano che aumenta la quantità di valore controllata dai contratti intelligenti.

### Oracoli decentralizzati {#decentralized-oracles}

Gli oracoli decentralizzati sono progettati per superare i limiti degli oracoli centralizzati eliminando i singoli punti di guasto. Un servizio di oracolo decentralizzato comprende più partecipanti in una rete peer-to-peer che formano il consenso sui dati fuori catena prima di inviarli a un contratto intelligente.

Un oracolo decentralizzato dovrebbe (idealmente) essere senza permessi, senza fiducia (trustless) e libero dall'amministrazione da parte di una parte centrale; in realtà, la decentralizzazione tra gli oracoli è su uno spettro. Esistono reti di oracoli semi-decentralizzate a cui chiunque può partecipare, ma con un "proprietario" che approva e rimuove i nodi in base alle prestazioni storiche. Esistono anche reti di oracoli completamente decentralizzate: queste di solito funzionano come blockchain autonome e hanno meccanismi di consenso definiti per coordinare i nodi e punire i comportamenti scorretti.

L'utilizzo di oracoli decentralizzati comporta i seguenti vantaggi:

### Elevate garanzie di correttezza {#high-correctness-guarantees}

Gli oracoli decentralizzati tentano di ottenere la correttezza dei dati utilizzando approcci diversi. Ciò include l'utilizzo di prove che attestano l'autenticità e l'integrità delle informazioni restituite e la richiesta a più entità di concordare collettivamente sulla validità dei dati fuori catena.

#### Prove di autenticità {#authenticity-proofs}

Le prove di autenticità sono meccanismi crittografici che consentono la verifica indipendente delle informazioni recuperate da fonti esterne. Queste prove possono convalidare la fonte delle informazioni e rilevare possibili alterazioni ai dati dopo il recupero.

Esempi di prove di autenticità includono:

**Prove Transport Layer Security (TLS)**: I nodi oracolo spesso recuperano dati da fonti esterne utilizzando una connessione HTTP sicura basata sul protocollo Transport Layer Security (TLS). Alcuni oracoli decentralizzati utilizzano prove di autenticità per verificare le sessioni TLS (ovvero, confermare lo scambio di informazioni tra un nodo e un server specifico) e confermare che i contenuti della sessione non siano stati alterati.

**Attestazioni Trusted Execution Environment (TEE)**: Un [ambiente di esecuzione affidabile](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) è un ambiente computazionale in sandbox isolato dai processi operativi del suo sistema host. I TEE garantiscono che qualsiasi codice applicativo o dato archiviato/utilizzato nell'ambiente di calcolo mantenga integrità, riservatezza e immutabilità. Gli utenti possono anche generare un'attestazione per dimostrare che un'istanza dell'applicazione è in esecuzione all'interno dell'ambiente di esecuzione affidabile.

Alcune classi di oracoli decentralizzati richiedono agli operatori dei nodi oracolo di fornire attestazioni TEE. Ciò conferma a un utente che l'operatore del nodo sta eseguendo un'istanza del client dell'oracolo in un ambiente di esecuzione affidabile. I TEE impediscono ai processi esterni di alterare o leggere il codice e i dati di un'applicazione, quindi, tali attestazioni dimostrano che il nodo oracolo ha mantenuto le informazioni intatte e riservate.

#### Convalida delle informazioni basata sul consenso {#consensus-based-validation-of-information}

Gli oracoli centralizzati si affidano a un'unica fonte di verità quando forniscono dati ai contratti intelligenti, il che introduce la possibilità di pubblicare informazioni inaccurate. Gli oracoli decentralizzati risolvono questo problema affidandosi a più nodi oracolo per interrogare le informazioni fuori catena. Confrontando i dati provenienti da più fonti, gli oracoli decentralizzati riducono il rischio di passare informazioni non valide ai contratti on-chain.

Gli oracoli decentralizzati, tuttavia, devono affrontare le discrepanze nelle informazioni recuperate da più fonti fuori catena. Per ridurre al minimo le differenze nelle informazioni e garantire che i dati passati al contratto dell'oracolo riflettano l'opinione collettiva dei nodi oracolo, gli oracoli decentralizzati utilizzano i seguenti meccanismi:

##### Votazione/staking sull'accuratezza dei dati

Alcune reti di oracoli decentralizzate richiedono ai partecipanti di votare o fare staking sull'accuratezza delle risposte alle query di dati (ad es., "Chi ha vinto le elezioni statunitensi del 2020?") utilizzando il token nativo della rete. Un protocollo di aggregazione aggrega quindi i voti e gli stake e prende come valida la risposta supportata dalla maggioranza.

I nodi le cui risposte si discostano dalla risposta della maggioranza vengono penalizzati distribuendo i loro token ad altri che forniscono valori più corretti. Costringere i nodi a fornire una cauzione prima di fornire dati incentiva risposte oneste poiché si presume che siano attori economici razionali intenti a massimizzare i rendimenti.

Lo staking/votazione protegge anche gli oracoli decentralizzati dagli [attacchi Sybil](/glossary/#sybil-attack) in cui attori malintenzionati creano più identità per manipolare il sistema di consenso. Tuttavia, lo staking non può impedire lo "scrocco" (freeloading, nodi oracolo che copiano informazioni da altri) e la "convalida pigra" (lazy validation, nodi oracolo che seguono la maggioranza senza verificare le informazioni da soli).

##### Meccanismi del punto di Schelling

Il [punto di Schelling](<https://en.wikipedia.org/wiki/Focal_point_(game_theory)>) è un concetto della teoria dei giochi che presuppone che più entità adotteranno sempre una soluzione comune a un problema in assenza di qualsiasi comunicazione. I meccanismi del punto di Schelling sono spesso utilizzati nelle reti di oracoli decentralizzate per consentire ai nodi di raggiungere il consenso sulle risposte alle richieste di dati.

Una prima idea per questo è stata [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed), un feed di dati proposto in cui i partecipanti inviano risposte a domande "scalari" (domande le cui risposte sono descritte da una grandezza, ad es., "qual è il prezzo di ETH?"), insieme a un deposito. Gli utenti che forniscono valori compresi tra il 25° e il 75° [percentile](https://en.wikipedia.org/wiki/Percentile) vengono ricompensati, mentre quelli i cui valori si discostano ampiamente dal valore mediano vengono penalizzati.

Sebbene SchellingCoin non esista oggi, un certo numero di oracoli decentralizzati — in particolare gli [Oracoli del Protocollo Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module) — utilizzano il meccanismo del punto di Schelling per migliorare l'accuratezza dei dati dell'oracolo. Ogni Oracolo Maker è costituito da una rete P2P fuori catena di nodi ("relayer" e "feed") che inviano i prezzi di mercato per gli asset collaterali e da un contratto "Medianizer" on-chain che calcola la mediana di tutti i valori forniti. Una volta terminato il periodo di ritardo specificato, questo valore mediano diventa il nuovo prezzo di riferimento per l'asset associato.

Altri esempi di oracoli che utilizzano meccanismi del punto di Schelling includono [Chainlink Offchain Reporting](https://docs.chain.link/architecture-overview/off-chain-reporting) e [Witnet](https://witnet.io/). In entrambi i sistemi, le risposte dei nodi oracolo nella rete peer-to-peer vengono aggregate in un singolo valore aggregato, come una media o una mediana. I nodi vengono ricompensati o puniti in base alla misura in cui le loro risposte si allineano o si discostano dal valore aggregato.

I meccanismi del punto di Schelling sono attraenti perché riducono al minimo l'impronta on-chain (deve essere inviata solo una transazione) garantendo al contempo la decentralizzazione. Quest'ultima è possibile perché i nodi devono firmare l'elenco delle risposte inviate prima che venga inserito nell'algoritmo che produce il valore medio/mediano.

### Disponibilità {#availability}

I servizi di oracolo decentralizzati garantiscono un'elevata disponibilità di dati fuori catena ai contratti intelligenti. Ciò si ottiene decentralizzando sia la fonte delle informazioni fuori catena sia i nodi responsabili del trasferimento delle informazioni on-chain.

Ciò garantisce la tolleranza ai guasti poiché il contratto dell'oracolo può fare affidamento su più nodi (che a loro volta si affidano a più fonti di dati) per eseguire query da altri contratti. La decentralizzazione alla fonte _e_ a livello di operatore del nodo è cruciale: una rete di nodi oracolo che serve informazioni recuperate dalla stessa fonte incorrerà nello stesso problema di un oracolo centralizzato.

È anche possibile per gli oracoli basati sullo staking punire gli operatori dei nodi che non rispondono rapidamente alle richieste di dati. Ciò incentiva in modo significativo i nodi oracolo a investire in infrastrutture tolleranti ai guasti e a fornire dati in modo tempestivo.

### Buona compatibilità degli incentivi {#good-incentive-compatibility}

Gli oracoli decentralizzati implementano vari modelli di incentivi per prevenire comportamenti [bizantini](https://en.wikipedia.org/wiki/Byzantine_fault) tra i nodi oracolo. Nello specifico, ottengono _attribuibilità_ e _responsabilità_:

1. Ai nodi oracolo decentralizzati è spesso richiesto di firmare i dati che forniscono in risposta alle richieste di dati. Queste informazioni aiutano a valutare le prestazioni storiche dei nodi oracolo, in modo che gli utenti possano filtrare i nodi oracolo inaffidabili quando effettuano richieste di dati. Un esempio è il [Sistema di Reputazione Algoritmica](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) di Witnet.

2. Gli oracoli decentralizzati — come spiegato in precedenza — possono richiedere ai nodi di piazzare uno stake sulla loro fiducia nella veridicità dei dati che inviano. Se l'affermazione risulta corretta, questo stake può essere restituito insieme a ricompense per il servizio onesto. Ma può anche essere punito nel caso in cui le informazioni siano errate, il che fornisce una certa misura di responsabilità.

## Applicazioni degli oracoli nei contratti intelligenti {#applications-of-oracles-in-smart-contracts}

I seguenti sono casi d'uso comuni per gli oracoli in Ethereum:

### Recupero di dati finanziari {#retrieving-financial-data}

Le applicazioni di [finanza decentralizzata](/defi/) (DeFi) consentono il prestito, l'indebitamento e il trading di asset peer-to-peer. Ciò richiede spesso l'ottenimento di diverse informazioni finanziarie, inclusi i dati sui tassi di cambio (per calcolare il valore fiat delle criptovalute o confrontare i prezzi dei token) e i dati dei mercati dei capitali (per calcolare il valore degli asset tokenizzati, come l'oro o il dollaro USA).

Un protocollo di prestito DeFi, ad esempio, deve interrogare i prezzi di mercato attuali per gli asset (ad es., ETH) depositati come garanzia. Ciò consente al contratto di determinare il valore degli asset collaterali e determinare quanto può prendere in prestito dal sistema.

I popolari "oracoli di prezzo" (come vengono spesso chiamati) nella DeFi includono i Chainlink Price Feeds, l'[Open Price Feed](https://compound.finance/docs/prices) del Protocollo Compound, i [Time-Weighted Average Prices (TWAP)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) di Uniswap e i [Maker Oracles](https://docs.makerdao.com/smart-contract-modules/oracle-module).

I costruttori dovrebbero comprendere le avvertenze che derivano da questi oracoli di prezzo prima di integrarli nel loro progetto. Questo [articolo](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) fornisce un'analisi dettagliata di cosa considerare quando si pianifica di utilizzare uno qualsiasi degli oracoli di prezzo menzionati.

Di seguito è riportato un esempio di come puoi recuperare l'ultimo prezzo di ETH nel tuo contratto intelligente utilizzando un feed di prezzo Chainlink:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /* *
     * Rete: Kovan
     * Aggregatore: ETH/USD
     * Indirizzo: 0x9326BFA02ADD2366b30bacB125260Af641031331 */
    




    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /* *
     * Restituisce l'ultimo prezzo */
    


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

Alcune applicazioni blockchain, come i giochi basati su blockchain o i sistemi di lotteria, richiedono un alto livello di imprevedibilità e casualità per funzionare in modo efficace. Tuttavia, l'esecuzione deterministica delle blockchain elimina la casualità.

L'approccio originale era quello di utilizzare funzioni crittografiche pseudocasuali, come `blockhash`, ma queste potevano essere [manipolate dai miner](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) che risolvevano l'algoritmo di prova di lavoro. Inoltre, il [passaggio di Ethereum alla prova di stake](/roadmap/merge/) significa che gli sviluppatori non possono più fare affidamento su `blockhash` per la casualità on-chain. Il [meccanismo RANDAO](https://eth2book.info/altair/part2/building_blocks/randomness) della beacon chain fornisce invece una fonte alternativa di casualità.

È possibile generare il valore casuale fuori catena e inviarlo on-chain, ma farlo impone elevati requisiti di fiducia agli utenti. Devono credere che il valore sia stato veramente generato tramite meccanismi imprevedibili e non sia stato alterato durante il transito.

Gli oracoli progettati per il calcolo fuori catena risolvono questo problema generando in modo sicuro risultati casuali fuori catena che trasmettono on-chain insieme a prove crittografiche che attestano l'imprevedibilità del processo. Un esempio è [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (Verifiable Random Function), che è un generatore di numeri casuali (RNG) dimostrabilmente equo e a prova di manomissione utile per costruire contratti intelligenti affidabili per applicazioni che si basano su risultati imprevedibili.

### Ottenere risultati per gli eventi {#getting-outcomes-for-events}

Con gli oracoli, creare contratti intelligenti che rispondono a eventi del mondo reale è facile. I servizi di oracolo lo rendono possibile consentendo ai contratti di connettersi ad API esterne tramite componenti fuori catena e consumare informazioni da quelle fonti di dati. Ad esempio, la dApp di previsione menzionata in precedenza potrebbe richiedere a un oracolo di restituire i risultati elettorali da una fonte fuori catena affidabile (ad es., l'Associated Press).

L'utilizzo di oracoli per recuperare dati basati su risultati del mondo reale abilita altri nuovi casi d'uso; ad esempio, un prodotto assicurativo decentralizzato ha bisogno di informazioni accurate su meteo, disastri, ecc. per funzionare in modo efficace.

### Automazione dei contratti intelligenti {#automating-smart-contracts}

I contratti intelligenti non vengono eseguiti automaticamente; piuttosto, un account controllato esternamente (EOA), o un altro account di contratto, deve innescare le funzioni giuste per eseguire il codice del contratto. Nella maggior parte dei casi, la maggior parte delle funzioni del contratto sono pubbliche e possono essere invocate da EOA e altri contratti.

Ma ci sono anche _funzioni private_ all'interno di un contratto che sono inaccessibili ad altri, ma che sono fondamentali per la funzionalità complessiva di una dApp. Esempi includono una funzione `mintERC721Token()` che conia periodicamente nuovi NFT per gli utenti, una funzione per l'assegnazione di pagamenti in un mercato di previsione o una funzione per sbloccare i token in staking in un DEX.

Gli sviluppatori dovranno innescare tali funzioni a intervalli per mantenere l'applicazione in esecuzione senza intoppi. Tuttavia, ciò potrebbe portare a più ore perse in compiti banali per gli sviluppatori, motivo per cui l'automazione dell'esecuzione dei contratti intelligenti è attraente.

Alcune reti di oracoli decentralizzate offrono servizi di automazione, che consentono ai nodi oracolo fuori catena di innescare le funzioni dei contratti intelligenti in base a parametri definiti dall'utente. In genere, ciò richiede la "registrazione" del contratto di destinazione con il servizio di oracolo, fornendo fondi per pagare l'operatore dell'oracolo e specificando le condizioni o i tempi per innescare il contratto.

La [Keeper Network](https://chain.link/keepers) di Chainlink fornisce opzioni per i contratti intelligenti per esternalizzare le normali attività di manutenzione in modo decentralizzato e con fiducia ridotta al minimo. Leggi la [documentazione ufficiale di Keeper](https://docs.chain.link/docs/chainlink-keepers/introduction/) per informazioni su come rendere il tuo contratto compatibile con Keeper e utilizzare il servizio Upkeep.

## Come usare gli oracoli blockchain {#use-blockchain-oracles}

Ci sono diverse applicazioni di oracoli che puoi integrare nella tua dApp di Ethereum:

**[Chainlink](https://chain.link/)** - _Le reti di oracoli decentralizzate Chainlink forniscono input, output e calcoli a prova di manomissione per supportare contratti intelligenti avanzati su qualsiasi blockchain._

**[RedStone Oracles](https://redstone.finance/)** - _RedStone è un oracolo modulare decentralizzato che fornisce feed di dati ottimizzati per il gas. È specializzato nell'offrire feed di prezzo per asset emergenti, come i token di liquid staking (LST), i token di liquid restaking (LRT) e i derivati di staking di Bitcoin._

**[Chronicle](https://chroniclelabs.org/)** - _Chronicle supera gli attuali limiti del trasferimento di dati on-chain sviluppando oracoli veramente scalabili, efficienti in termini di costi, decentralizzati e verificabili._

**[Witnet](https://witnet.io/)** - _Witnet è un oracolo senza permessi, decentralizzato e resistente alla censura che aiuta i contratti intelligenti a reagire agli eventi del mondo reale con forti garanzie cripto-economiche._

**[UMA Oracle](https://uma.xyz)** - _L'oracolo ottimistico di UMA consente ai contratti intelligenti di ricevere rapidamente qualsiasi tipo di dato per diverse applicazioni, tra cui assicurazioni, derivati finanziari e mercati di previsione._

**[Tellor](https://tellor.io/)** - _Tellor è un protocollo oracolo trasparente e senza permessi per il tuo contratto intelligente per ottenere facilmente qualsiasi dato ogni volta che ne ha bisogno._

**[Band Protocol](https://bandprotocol.com/)** - _Band Protocol è una piattaforma di oracoli di dati cross-chain che aggrega e connette dati del mondo reale e API ai contratti intelligenti._

**[Pyth Network](https://pyth.network/)** - _La rete Pyth è una rete di oracoli finanziari di prima parte progettata per pubblicare dati continui del mondo reale on-chain in un ambiente a prova di manomissione, decentralizzato e autosostenibile._

**[API3 DAO](https://www.api3.org/)** - _API3 DAO sta fornendo soluzioni di oracoli di prima parte che offrono maggiore trasparenza delle fonti, sicurezza e scalabilità in una soluzione decentralizzata per i contratti intelligenti_

**[Supra](https://supra.com/)** - Un toolkit integrato verticalmente di soluzioni cross-chain che interconnettono tutte le blockchain, pubbliche (L1 e L2) o private (aziende), fornendo feed di prezzo di oracoli decentralizzati che possono essere utilizzati per casi d'uso on-chain e fuori catena. 

**[Gas Network](https://gas.network/)** - Una piattaforma di oracoli distribuita che fornisce dati sui prezzi del gas in tempo reale attraverso la blockchain. Portando on-chain i dati dei principali fornitori di dati sui prezzi del gas, Gas Network sta aiutando a guidare l'interoperabilità. Gas Network supporta i dati per oltre 35 catene, tra cui la rete principale di Ethereum e molti dei principali L2.

**[DIA](https://www.diadata.org/)** - Una rete di oracoli cross-chain che fornisce feed di dati verificabili per oltre 20.000 asset in tutte le principali classi di asset. DIA ricava i dati grezzi di trading direttamente da oltre 100 mercati primari e li calcola on-chain, garantendo completa trasparenza e verificabilità dei dati con configurazioni personalizzate per qualsiasi caso d'uso.

**[Stork](https://stork.network)** - Stork fornisce dati sui prezzi a latenza ultra-bassa, supportando un'ampia gamma di casi d'uso tra cui mercati perpetui, protocolli di prestito ed ecosistemi DeFi, con nuovi asset supportati rapidamente al momento della quotazione.

## Letture consigliate {#further-reading}

**Articoli**

- [Cos'è un oracolo blockchain?](https://chain.link/education/blockchain-oracles) — _Chainlink_
- [Cos'è un oracolo blockchain?](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) — _Patrick Collins_
- [Oracoli decentralizzati: una panoramica completa](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — _Julien Thevenard_
- [Implementazione di un oracolo blockchain su Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Perché i contratti intelligenti non possono effettuare chiamate API?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — _StackExchange_
- [Quindi vuoi usare un oracolo di prezzo](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — _samczsun_

**Video**

- [Gli oracoli e l'espansione dell'utilità della blockchain](https://youtu.be/BVUZpWa8vpw) — _Real Vision Finance_

**Tutorial**

- [Come recuperare il prezzo attuale di Ethereum in Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — _Chainlink_
- [Consumare i dati dell'oracolo](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — _Chronicle_ 

**Progetti di esempio**

- [Progetto iniziale completo Chainlink per Ethereum in Solidity](https://github.com/hackbg/chainlink-fullstack) — _HackBG_