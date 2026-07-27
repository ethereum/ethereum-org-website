---
title: La roadmap della privacy per Ethereum
description: "Ethereum sta lavorando per rendere la privacy una proprietà di prim'ordine della rete attraverso aggiornamenti che proteggono la privacy delle transazioni, mettono al sicuro l'accesso ai dati degli utenti e abilitano un'identità verificabile ma privata."
lang: it
image: /images/roadmap/roadmap-security.png
alt: Roadmap di Ethereum
template: roadmap
---

**La privacy su Ethereum sta passando da un'aggiunta opzionale a un'impostazione predefinita a livello di rete.** Le roadmap proposte per la privacy di Ethereum mirano a specifici punti di connessione vulnerabili in cui i dati degli utenti possono trapelare oggi. La ricerca in tutto l'ecosistema mira a rendere Ethereum una piattaforma in cui la privacy è strutturale piuttosto che facoltativa (opt-in).

I ricercatori della Fondazione Ethereum hanno [aggregato tre priorità fondamentali della roadmap](https://pse.dev/blog/pse-roadmap-2025) dalla ricerca distribuita dell'ecosistema:

- **Letture private** - interrogare e navigare su Ethereum senza rivelare a quali indirizzi, contratti o dati un utente sta accedendo. Proteggere le letture impedisce che i dati vengano raccolti prima ancora che una transazione venga firmata.
- **Scritture private** - inviare transazioni resistenti alla censura e alla fuga di metadati, dall'inclusione nella mempool fino al regolamento finale. Proteggere le scritture garantisce che le transazioni private non vengano censurate o ricollegate alla loro origine.
- **Dimostrazioni private** - verificare l'identità, l'idoneità o i dati senza divulgare le informazioni personali sottostanti, utilizzando efficienti prove a conoscenza zero. Le dimostrazioni private consentono agli utenti di partecipare alla rete scegliendo di rivelare solo le informazioni minime necessarie (divulgazione selettiva).

Insieme, queste tre aree formano un modello di privacy end-to-end. L'obiettivo è la **sovranità computazionale**, garantendo che Ethereum sia una piattaforma in cui individui e istituzioni possano interagire, coordinarsi ed effettuare transazioni a livello globale senza raccolta di dati non approvata, sorveglianza o censura centralizzata.

**Perché la privacy è importante?** Scopri di più sulla privacy, su come proteggere la tua privacy online e su come proteggere la tua privacy su Ethereum oggi.

<ButtonLink variant="outline" href="/privacy/">Maggiori informazioni sulla privacy</ButtonLink>

## Le letture private proteggono le query degli utenti e i dati di accesso {#private-reads}

Prima ancora che una transazione venga firmata, un utente deve leggere i dati dalla blockchain. Per controllare un saldo, stimare il gas o verificare lo stato di uno smart contract, il software del portafoglio invia query a un fornitore di nodi. Queste query standard **Remote Procedure Call (RPC)** espongono un'immensa quantità di metadati.

Il fornitore del nodo può vedere l'indirizzo IP dell'utente, l'impronta digitale del dispositivo, gli indirizzi specifici interrogati, nonché i tempi e la frequenza della sua attività. Anche se un utente invia successivamente una transazione privata, il fornitore dell'infrastruttura ha già accesso a una mappa dettagliata delle sue intenzioni.

<VideoWatch slug="ethereum-privacy-stack-andy-guzman" />

La fuga di metadati al livello di accesso è uno dei problemi di privacy più persistenti in tutti i sistemi blockchain. Ethereum mira ad affrontare la fuga di metadati attraverso la privacy all'origine, ovvero nascondendo chi ha effettuato la richiesta, la privacy nel contenuto, ovvero nascondendo cosa è stato richiesto, e verificando la correttezza delle informazioni restituite.

La **privacy all'origine** utilizza [RPC anonime](https://privreads.ethereum.foundation/feed/anon-rpc/) e soluzioni di rete anonime per oscurare l'entità che richiede i dati, la **privacy nel contenuto** utilizza tattiche come il recupero di informazioni private e la [RAM ignara (oblivious RAM)](https://en.wikipedia.org/wiki/Oblivious_RAM) per nascondere i dati interrogati, mentre la **verifica della correttezza** utilizza client leggeri per dimostrare che i dati restituiti sono accurati.

Il blocco crittografico alla base della privacy nel contenuto è il [**Private Information Retrieval (PIR)**](https://en.wikipedia.org/wiki/Private_information_retrieval), una tecnica crittografica che consente a un client di interrogare un database e recuperare un'informazione specifica senza rivelare al server a quale elemento si è acceduto. Il server elabora la richiesta alla cieca e restituisce una risposta cifrata che solo il portafoglio richiedente può decifrare.

Il PIR opera al livello di accesso, posizionandosi tra il software del portafoglio e i fornitori di nodi. Man mano che le implementazioni PIR matureranno, verranno integrate nei kit di sviluppo software (SDK) dei portafogli e nei fornitori di infrastrutture, consentendo agli utenti di interrogare la rete senza esporre la propria attività a intermediari centralizzati.

Le letture private riducono anche l'esposizione al front-running e agli attacchi di ordinamento delle transazioni. Se un fornitore di infrastrutture non può vedere quale smart contract o indirizzo un utente sta interrogando, non può vendere tali informazioni ad attori che traggono profitto dall'anticipare l'attività onchain.

## Le scritture private prevengono la censura e la fuga di transazioni {#private-writes}

Una volta inviata, una transazione passa attraverso l'infrastruttura di rete che può osservarla o bloccarla prima che venga registrata onchain. È qui che molti protocolli di privacy falliscono nella pratica. I grandi costruttori di blocchi centralizzati monitorano la mempool e possono silenziosamente mettere da parte o censurare le transazioni provenienti da strumenti per la privacy. Anche se la crittografia sottostante è solida, una transazione che non viene mai inclusa in un blocco non fornisce alcuna protezione.

Due aggiornamenti a livello di protocollo affrontano questo problema insieme:

[**EIP-8141 (Transazioni Frame)**](https://eips.ethereum.org/EIPS/eip-8141) introduce un nuovo tipo di transazione che divide le transazioni in segmenti per la convalida della firma e l'autorizzazione delle commissioni, e per le istruzioni effettive della transazione. Le transazioni frame consentono agli [smart account](/roadmap/account-abstraction/) di definire i propri schemi di firma e utilizzare contratti esterni per coprire le commissioni del gas. Rigide regole di sandboxing nella mempool impediscono a queste transazioni di esporre la rete ad attacchi denial-of-service.

Le transazioni frame sono in fase di valutazione per l'aggiornamento [Hegotá](https://forkcast.org/upgrade/hegota/) di Ethereum, il prossimo aggiornamento della rete dopo l'imminente aggiornamento [Glamsterdam](/roadmap/glamsterdam/). Lo stesso aggiornamento consentirà inoltre agli smart account di adottare [firme sicure contro i computer quantistici (quantum-safe)](/roadmap/security/quantum-resistance/) prima che la transizione completa della rete post-quantistica sia terminata.

<ExpandableCard title="In che modo le transazioni frame (EIP-8141) consentono la privacy?" eventCategory="/roadmap/privacy" eventName="clicked how do frame transactions enable privacy?">

Le transazioni frame consentono agli account di scegliere il proprio metodo di verifica della firma. Per la privacy, ciò significa che gli utenti possono adottare schemi di firma che preservano la privacy senza attendere una migrazione su larga scala a livello di rete. Le transazioni frame consentono anche l'astrazione delle commissioni del gas, permettendo agli strumenti per la privacy di coprire i costi di transazione senza esporre gli indirizzi degli utenti onchain.

</ExpandableCard>

[**EIP-7805 (Elenchi di inclusione applicati dalla scelta del fork, o FOCIL)**](https://eips.ethereum.org/EIPS/eip-7805) fornisce il meccanismo di applicazione per le scritture private. Ai proponenti dei blocchi è richiesto dalle regole del consenso di includere nei loro blocchi le transazioni provenienti da elenchi di inclusione locali aggregati, che raccolgono transazioni da più fonti. Se un costruttore di blocchi tenta di censurare una transazione apparsa negli elenchi di inclusione, i nodi attestanti rifiutano interamente il blocco proposto. FOCIL è attualmente in fase di valutazione per l'aggiornamento [Hegotá](https://forkcast.org/upgrade/hegota/).

Le transazioni frame offrono agli utenti la flessibilità di costruire transazioni che preservano la privacy con schemi di firma personalizzati, mentre FOCIL garantisce che tali transazioni non possano essere censurate selettivamente una volta entrate nella mempool. Insieme affrontano due diversi punti di vulnerabilità: uno abilita il formato delle transazioni private, l'altro ne garantisce l'inclusione. Nessun attore centrale può bloccare un trasferimento privato valido.

<VideoWatch slug="eip-7805-focil-explained" />

Un secondo punto vulnerabile per la privacy degli utenti è il modo in cui Ethereum traccia l'ordine delle transazioni, chiamato sistema di nonce sequenziale. Nel modello di account standard di Ethereum, ogni account utilizza un singolo contatore a incremento lineare. Se una transazione privata subisce un ritardo nella mempool, tutte le transazioni successive da quell'account si bloccano dietro di essa. La sequenza dei nonce consente inoltre agli osservatori della rete di ricollegare più transazioni allo stesso account di origine, compromettendo la privacy.

[**EIP-8250 (Nonce con chiave per le transazioni frame)**](https://eips.ethereum.org/EIPS/eip-8250), attualmente in fase di valutazione per Hegotá, risolve questo problema consentendo a un singolo account di gestire simultaneamente più sequenze di transazioni parallele. Gli utenti possono eseguire contemporaneamente molte transazioni private in contesti diversi e gli osservatori non possono più correlare in modo affidabile attività distinte allo stesso account principale.

### Pagamenti privati e trasferimento di valore {#private-payments}

Oltre all'instradamento delle transazioni e alla gestione dei nonce, proteggere le scritture richiede di schermare le identità e gli asset coinvolti in un trasferimento. Anche quando un utente interroga privatamente e trasmette una transazione senza censura, i dati della transazione registrati onchain rimangono visibili pubblicamente. Chiunque può vedere chi ha inviato quanto a chi, e le società di analisi della catena aggregano questi dati in profili ricercabili che persistono a tempo indeterminato.

[**EIP-8182 (Trasferimenti privati di ETH ed ERC-20)**](https://eips.ethereum.org/EIPS/eip-8182), proposto per l'aggiornamento Hegotá, introduce un pool schermato nativo e condiviso direttamente nel protocollo Ethereum per i trasferimenti di ETH ed ERC-20. I pool di privacy utilizzano il mixing crittografico per recidere il legame tra deposito e prelievo, ma oggi sono disponibili solo tramite app per la privacy, portafogli e reti layer 2 (l2).

Storicamente, le soluzioni per la privacy a livello di app hanno frammentato la liquidità e sofferto di insiemi di anonimato ridotti. L'EIP-8182 consolida i trasferimenti schermati a livello di protocollo, consentendo agli utenti di instradare i fondi tramite chiavi di consegna nascoste senza richiedere architetture di portafoglio specializzate o interagire con applicazioni frammentate e facoltative.

Altri approcci di ricerca in fase di sviluppo per la privacy delle transazioni includono prove che consentono agli utenti di dimostrare che gli importi delle transazioni sono validi senza rivelare i valori effettivi (come i bulletproof e le prove di intervallo). La ricerca sulle **transazioni confidenziali** mira a nascondere gli importi pur consentendo alla rete di verificare che nessun valore venga creato o distrutto.

Queste soluzioni a livello di pagamento si basano sull'infrastruttura descritta in precedenza in questa sezione. Il PIR protegge la fase di preparazione, le transazioni frame e FOCIL garantiscono che i pagamenti privati raggiungano la mempool senza censura, e le zkVM abilitano la complessa crittografia necessaria per nascondere il valore mantenendo al contempo le garanzie di sicurezza della rete.

## Dimostrazioni private e protezione dell'identità {#private-proving}

La privacy non riguarda l'occultamento totale. Riguarda la **divulgazione selettiva**, ovvero la scelta di quali informazioni rivelare, a chi e a quali condizioni. Ethereum supporta la divulgazione selettiva attraverso le [**prove a conoscenza zero (ZKP)**](/zero-knowledge-proofs/), che consentono a una parte di dimostrare che un'affermazione è vera senza rivelare i dati sottostanti. Ad esempio, dimostrare la cittadinanza senza rivelare i dettagli del passaporto, o dimostrare una soglia di età senza rivelare l'esatta data di nascita.

Le dimostrazioni private si collegano alla roadmap della privacy abilitando un'identità verificabile senza esposizione dei dati a livello di protocollo. Mentre le letture e le scritture private proteggono i metadati delle transazioni, le dimostrazioni private garantiscono che i controlli di identità e idoneità richiesti per la partecipazione nel mondo reale non richiedano la cessione di dati personali a sistemi di verifica centralizzati.

Nella roadmap della privacy di Ethereum, le dimostrazioni private sono supportate da percorsi infrastrutturali complementari, uno sul livello di esecuzione per rendere possibile il calcolo privato a livello di protocollo, e uno sul livello di accesso, che rende il calcolo privato pratico sui dispositivi di consumo.

Le **macchine virtuali a conoscenza zero (zkVM)** consentono agli smart contract di eseguire la propria logica e generare una prova crittografica che il lavoro è stato svolto correttamente. Quando tale prova è veramente a conoscenza zero, non rivela nulla sugli input, sullo stato intermedio o sugli output, sbloccando il calcolo privato a livello di rete.

Il nome "zkVM" porta con sé una sfumatura; la maggior parte dei sistemi chiamati zkVM oggi sono succinti piuttosto che a conoscenza zero. Le loro prove sono piccole e veloci da verificare, ma non nascondono necessariamente i dati utilizzati per generarle. Oggi, solo una manciata di sistemi di dimostrazione fornisce la proprietà di occultamento da cui dipendono le applicazioni per la privacy. I [benchmark del Client-Side Proving](https://ethproofs.org/csp-benchmarks) tracciano quali zkVM sono state analizzate per l'effettiva conoscenza zero nelle proprietà del loro sistema. Colmare questa lacuna fa parte del lavoro sulle dimostrazioni private della roadmap.

Anche le transazioni frame (EIP-8141) sono collegate all'implementazione delle zkVM. Possono utilizzare schemi di verifica personalizzati per inviare transizioni di stato verificate da prove, consentendo alle app di offrire ambienti di esecuzione privati e inviare alla rete pubblica di Ethereum la prova crittografica che l'azione è stata eseguita correttamente, senza esporre i dati della transazione stessa.

Le prove a conoscenza zero sono eccellenti per consentire agli individui di dimostrare che i propri dati sono validi mantenendoli privati, ma non possono gestire facilmente gli smart contract in cui più utenti devono interagire contemporaneamente con un pool condiviso di dati segreti.

Per colmare questa lacuna, la roadmap di Ethereum incorpora la **Cifratura Completamente Omoforma (Fully Homomorphic Encryption, FHE)**. La FHE consente agli smart contract di eseguire calcoli direttamente sui dati cifrati senza mai dover decifrare o esporre le informazioni sottostanti. L'integrazione dei blocchi costitutivi della FHE e di coprocessori crittografici specializzati in Ethereum è essenziale per le applicazioni decentralizzate che si basano su uno "stato nascosto" condiviso, come i market maker automatizzati (AMM) privati, i pool di prestito confidenziali o le aste a busta chiusa in cui gli input di tutti devono interagire pur rimanendo completamente segreti.

La **dimostrazione lato client (client-side proving)** rende pratica la generazione di queste prove di privacy sui dispositivi di tutti i giorni. Il progetto Client-Side Proving mantiene una suite di benchmark pubblica che confronta i sistemi di dimostrazione e le zkVM sull'hardware di consumo, pubblicando i risultati su [ethproofs.org](https://ethproofs.org). La ricerca tecnica punta a prove trasparenti e [post-quantistiche](/roadmap/security/quantum-resistance/) con verifica diretta onchain, rendendo il calcolo privato più veloce, più facile da verificare direttamente sulla rete Ethereum e praticabile sui dispositivi mobili.

L'[**iniziativa zkID**](https://pse.dev/projects/zk-id) ha prodotto un'infrastruttura open-source allineata con i framework di identità globali, incluso il portafoglio dell'Identità Digitale Europea (EUDI). Il sistema Open Anonymous Credentials (OpenAC) fornisce l'impossibilità di collegamento (unlinkability) per le credenziali emesse, garantendo che più prove generate dallo stesso utente su piattaforme diverse non possano essere correlate a un singolo profilo.

Nello spazio della governance, il protocollo [**Minimal Anti-Collusion Infrastructure (MACI)**](https://maci.pse.dev/) fornisce l'**assenza di ricevuta (receipt-freeness)**, rendendo crittograficamente impossibile dimostrare come ha votato un account. Poiché gli elettori non possono produrre una ricevuta che mostri la loro scelta, la compravendita di voti e la coercizione perdono il loro incentivo economico. MACI ha garantito decisioni di finanziamento nel mondo reale dal 2020 attraverso [clr.fund](https://clr.fund/), che ha distribuito milioni di dollari in finanziamento quadratico per i beni pubblici di Ethereum.

Il voto che preserva la privacy sta già proteggendo elettori reali in contesti ad alto rischio. Il [Freedom Tool di Rarimo](https://docs.rarimo.com/freedom-tool/) utilizza la verifica del passaporto a conoscenza zero per consentire ai cittadini di dimostrare di avere diritto al voto senza rivelare chi sono. Ha alimentato elezioni ombra anonime e sondaggi dell'opposizione in paesi tra cui la Russia (il voto dell'opposizione [Russia2024](https://rarimo.medium.com/russian-opposition-use-rarimos-freedom-tool-to-launch-surveillance-free-voting-app-0d73ebea5e8a)), la Georgia (l'app di sondaggi United Space) e l'Iran (il progetto Iranians Vote), dove la sicurezza degli elettori dipende dalla segretezza crittografica del voto.

Le dimostrazioni private abilitano anche la **privacy consapevole della conformità (compliance-aware privacy)**. Le soluzioni per la privacy come i pool di privacy accettano depositi liberamente, ma richiedono agli utenti di generare prove a conoscenza zero che i loro fondi non si intersechino con indirizzi dannosi noti prima di effettuare il prelievo. Il modello di conformità programmabile separa l'atto di schermare le transazioni dall'atto di dimostrare la conformità normativa, consentendo agli utenti comuni di effettuare transazioni privatamente pur soddisfacendo i requisiti istituzionali.

Le zkEVM possono eseguire questi controlli di conformità privatamente, verificando lo stato normativo senza esporre i dettagli della transazione o le identità degli utenti.

## Progressi attuali della roadmap {#current-progress}

La direzione dello sviluppo della privacy su Ethereum è modellata dall'allineamento a livello di ecosistema piuttosto che da una singola organizzazione. La roadmap di [strawmap.org](https://strawmap.org/) raccoglie gli aggiornamenti proposti da tutto l'ecosistema per tracciare e proporre dove la comunità ha raggiunto il consenso. I ricercatori della Fondazione Ethereum aiutano a gestire una roadmap parallela di ricerca e sviluppo in tutto l'ecosistema di ricerca, focalizzata sul progresso degli strumenti per la privacy a livello di accesso, dell'infrastruttura di identità e dei sistemi consapevoli della conformità. Entrambi gli esempi riflettono la stessa priorità di fondo: rendere la privacy su Ethereum strutturale piuttosto che opzionale.

La ricerca e lo sviluppo sulla privacy su Ethereum coinvolgono dozzine di team in tutto l'ecosistema. Il lavoro sta avanzando sugli aggiornamenti del protocollo, sulle soluzioni a livello di accesso, sull'infrastruttura di identità e sugli strumenti consapevoli della conformità.

**Aggiornamenti del protocollo**: EIP-8141 (Transazioni Frame), EIP-7805 (FOCIL), EIP-8250 (Nonce con chiave) ed EIP-8182 (Pool schermati a livello di protocollo) sono in fase di sviluppo attivo e in considerazione per l'aggiornamento [Hegotá](https://forkcast.org/upgrade/hegota/), il prossimo aggiornamento della rete dopo [Glamsterdam](/roadmap/glamsterdam/). Anche l'EIP-8025 (prove di esecuzione opzionali) e gli alberi di Verkle sono previsti per Hegotá, fornendo le basi per il calcolo privato basato su zkEVM sulla Mainnet di Ethereum. Parallelamente, la ricerca sta maturando attorno ai coprocessori FHE per abilitare smart contract cifrati multi-parte.

**Livello di accesso**: La ricerca sul PIR sta progredendo con implementazioni attive in fase di test da parte dei team infrastrutturali. L'SDK del portafoglio Kohaku è in fase di sviluppo come riferimento open-source per i portafogli che preservano la privacy.

**Dimostrazione lato client**: I team stanno utilizzando attivamente i risultati dei test basati su benchmark per ottimizzare il modo in cui le prove a conoscenza zero vengono eseguite sui dispositivi standard. Progetti come Spartan-WHIR stanno portando avanti prove sicure e resistenti ai computer quantistici che possono essere facilmente verificate direttamente sulla rete Ethereum. Iniziative di ricerca come leanVM forniscono una zkVM leggera progettata per raggruppare insieme più firme crittografiche, riducendo le dimensioni dei dati delle firme quantum-safe di 250 volte per risparmiare spazio e ridurre i costi di rete.

**Identità e dimostrazioni**: L'iniziativa zkID sta producendo schemi di dimostrazione ottimizzati per i dispositivi mobili. MACI continua a garantire round di finanziamento quadratico e la governance delle DAO, strumenti come il Freedom Tool di Rarimo stanno portando il voto a conoscenza zero nelle elezioni del mondo reale, e la ricerca in corso continua sugli standard di identità che preservano la privacy.

Nessuna parte di questo lavoro è terminata. Le tempistiche sono obiettivi, non garanzie, e il [processo di governance basato sul consenso](/governance/) di Ethereum significa che la roadmap potrebbe cambiare con l'avanzare della ricerca. Ma la portata dello sviluppo attivo e il numero di team che lavorano sulla privacy rappresentano un chiaro impegno a rendere Ethereum resistente all'estrazione per impostazione predefinita.

## Letture di approfondimento {#further-reading}

- [Privacy su Ethereum](/privacy/)
- [Roadmap PSE: 2025 e oltre](https://pse.dev/blog/pse-roadmap-2025)
- [Il mandato della Fondazione Ethereum](/foundation/mandate/)
- [strawmap.org](https://strawmap.org/)
- [Prove a conoscenza zero](/zero-knowledge-proofs/)
- [Identità decentralizzata](/decentralized-identity/)
- [Roadmap di Kohaku](https://notes.ethereum.org/@niard/KohakuRoadmap)
- [Benchmark del Client-Side Proving](https://ethproofs.org/csp-benchmarks)
- [Le zkEVM in numeri](https://zkevm.ethereum.foundation/)