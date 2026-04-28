---
title: Prove a conoscenza-zero
description: Un'introduzione non tecnica alle prove a conoscenza-zero per principianti.
lang: it
---

# Cosa sono le prove a conoscenza-zero? {#what-are-zk-proofs}

Una prova a conoscenza-zero è un modo per dimostrare la validità di un'affermazione senza rivelare l'affermazione stessa. Il "dimostratore" è la parte che cerca di dimostrare un'affermazione, mentre il "verificatore" è responsabile della convalida dell'affermazione.

Le prove a conoscenza-zero sono apparse per la prima volta in un articolo del 1985, "[The knowledge complexity of interactive proof systems](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)" che fornisce una definizione delle prove a conoscenza-zero ampiamente utilizzata oggi:

> Un protocollo a conoscenza-zero è un metodo con cui una parte (il dimostratore) **può dimostrare** a un'altra parte (il verificatore) **che qualcosa è vero, senza rivelare alcuna informazione** oltre al fatto che questa specifica affermazione è vera.

Le prove a conoscenza-zero sono migliorate nel corso degli anni e ora vengono utilizzate in diverse applicazioni del mondo reale.

<YouTube id="fOGdb1CTu5c" />

## Perché abbiamo bisogno delle prove a conoscenza-zero? {#why-zero-knowledge-proofs-are-important}

Le prove a conoscenza-zero hanno rappresentato una svolta nella crittografia applicata, poiché promettevano di migliorare la sicurezza delle informazioni per gli individui. Considera come potresti dimostrare un'affermazione (ad es., "Sono un cittadino del paese X") a un'altra parte (ad es., un fornitore di servizi). Dovresti fornire delle "prove" a sostegno della tua affermazione, come un passaporto nazionale o una patente di guida.

Ma ci sono problemi con questo approccio, principalmente la mancanza di privacy. Le Informazioni di Identificazione Personale (PII) condivise con servizi di terze parti vengono archiviate in database centrali, che sono vulnerabili agli attacchi informatici. Con il furto d'identità che sta diventando un problema critico, c'è richiesta di mezzi più protettivi della privacy per la condivisione di informazioni sensibili.

Le prove a conoscenza-zero risolvono questo problema **eliminando la necessità di rivelare informazioni per dimostrare la validità delle affermazioni**. Il protocollo a conoscenza-zero utilizza l'affermazione (chiamata 'testimone' o 'witness') come input per generare una prova succinta della sua validità. Questa prova fornisce forti garanzie che un'affermazione sia vera senza esporre le informazioni utilizzate per crearla.

Tornando al nostro esempio precedente, l'unica prova di cui hai bisogno per dimostrare la tua cittadinanza è una prova a conoscenza-zero. Il verificatore deve solo controllare se certe proprietà della prova sono vere per convincersi che anche l'affermazione sottostante sia vera.

## Casi d'uso per le prove a conoscenza-zero {#use-cases-for-zero-knowledge-proofs}

### Pagamenti anonimi {#anonymous-payments}

I pagamenti con carta di credito sono spesso visibili a più parti, inclusi il fornitore dei pagamenti, le banche e altre parti interessate (ad es., le autorità governative). Sebbene la sorveglianza finanziaria abbia dei vantaggi per l'identificazione di attività illegali, mina anche la privacy dei cittadini comuni.

Le criptovalute erano intese per fornire un mezzo agli utenti per condurre transazioni private peer-to-peer. Ma la maggior parte delle transazioni di criptovaluta sono apertamente visibili sulle blockchain pubbliche. Le identità degli utenti sono spesso pseudonime e collegate volontariamente a identità del mondo reale (ad es., includendo indirizzi ETH sui profili Twitter o GitHub) o possono essere associate a identità del mondo reale utilizzando un'analisi di base dei dati on-chain e fuori catena.

Esistono specifiche "privacy coin" progettate per transazioni completamente anonime. Le blockchain incentrate sulla privacy, come Zcash e Monero, nascondono i dettagli della transazione, inclusi gli indirizzi del mittente/destinatario, il tipo di risorsa, la quantità e la cronologia della transazione.

Integrando la tecnologia a conoscenza-zero nel protocollo, le reti [blockchain](/glossary/#blockchain) incentrate sulla privacy consentono ai [nodi](/glossary/#node) di convalidare le transazioni senza dover accedere ai dati della transazione. L'[EIP-7503](https://eips.ethereum.org/EIPS/eip-7503) è un esempio di un design proposto che abiliterà trasferimenti privati nativi di valore sulla blockchain di [Ethereum](/). Tali proposte sono, tuttavia, difficili da implementare a causa di un mix di preoccupazioni relative alla sicurezza, alla regolamentazione e all'esperienza utente (UX).  

**Le prove a conoscenza-zero vengono applicate anche per anonimizzare le transazioni sulle blockchain pubbliche**. Un esempio è Tornado Cash, un servizio decentralizzato e non detentivo che consente agli utenti di condurre transazioni private su Ethereum. Tornado Cash utilizza le prove a conoscenza-zero per offuscare i dettagli della transazione e garantire la privacy finanziaria. Sfortunatamente, poiché si tratta di strumenti per la privacy "opt-in", sono associati ad attività illecite. Per superare questo problema, la privacy dovrà prima o poi diventare l'impostazione predefinita sulle blockchain pubbliche. Scopri di più sulla [privacy su Ethereum](/privacy/).

### Protezione dell'identità {#identity-protection}

Gli attuali sistemi di gestione dell'identità mettono a rischio le informazioni personali. Le prove a conoscenza-zero possono aiutare gli individui a convalidare l'identità proteggendo al contempo i dettagli sensibili.

Le prove a conoscenza-zero sono particolarmente utili nel contesto dell'[identità decentralizzata](/decentralized-identity/). L'identità decentralizzata (descritta anche come 'identità auto-sovrana') dà all'individuo la capacità di controllare l'accesso agli identificatori personali. Dimostrare la propria cittadinanza senza rivelare il proprio codice fiscale o i dettagli del passaporto è un buon esempio di come la tecnologia a conoscenza-zero abiliti l'identità decentralizzata.

<Alert variant="info">
  <AlertEmoji text="💡" />
  <AlertContent>
    <AlertTitle className="mb-2">
      ZKP + Identità in azione: ID Digitale Nazionale (NDI) del Bhutan su Ethereum
    </AlertTitle>
    <AlertDescription>
      <p>
        Un esempio reale di utilizzo delle ZKP per i sistemi di gestione dell'identità è il sistema di ID Digitale Nazionale (NDI) del Regno del Bhutan, costruito su Ethereum. L'NDI del Bhutan utilizza le ZKP per consentire ai cittadini di dimostrare crittograficamente fatti su se stessi, come "Sono un cittadino" o "Ho più di 18 anni", senza rivelare i dati personali sensibili presenti sul loro documento d'identità.
      </p>
      <p>
        Scopri di più sull'NDI del Bhutan nel <a href="/decentralized-identity/#national-and-government-id">caso di studio sull'Identità Decentralizzata</a>.
      </p>
</AlertDescription>
</AlertContent>
</Alert>

### Prova di Umanità {#proof-of-humanity}

Uno degli esempi più ampiamente utilizzati di prove a conoscenza-zero in azione oggi è il [protocollo World ID](https://world.org/blog/world/world-id-faqs), che può essere pensato come "un passaporto digitale globale per l'era dell'IA". Consente alle persone di dimostrare di essere individui unici senza rivelare informazioni personali. Ciò si ottiene attraverso un dispositivo chiamato Orb, che scansiona l'iride di una persona e genera un codice dell'iride. Il codice dell'iride viene controllato e verificato per confermare che la persona sia un essere umano biologicamente unico. Dopo la verifica, un impegno di identità generato sul dispositivo dell'utente (e non collegato o derivato dai dati biometrici) viene aggiunto a un elenco sicuro sulla blockchain. Quindi, ogni volta che l'utente vuole dimostrare di essere un umano verificato – che sia per accedere, votare o intraprendere altre azioni – può generare una prova a conoscenza-zero che conferma la sua appartenenza all'elenco. La bellezza dell'utilizzo di una prova a conoscenza-zero è che viene rivelata solo un'affermazione: questa persona è unica. Tutto il resto rimane privato.

World ID si basa sul [protocollo Semaphore](https://docs.semaphore.pse.dev/) sviluppato dal [team PSE](https://pse.dev/) presso la Ethereum Foundation. Semaphore è progettato per essere un modo leggero ma potente per generare e verificare prove a conoscenza-zero. Consente agli utenti di dimostrare di far parte di un gruppo (in questo caso, umani verificati) senza mostrare quale membro del gruppo siano. Semaphore è anche altamente flessibile, consentendo la creazione di gruppi basati su un'ampia gamma di criteri come la verifica dell'identità, la partecipazione a eventi o il possesso di credenziali.

### Autenticazione {#authentication}

L'utilizzo di servizi online richiede di dimostrare la propria identità e il diritto di accedere a tali piattaforme. Questo spesso richiede di fornire informazioni personali, come nomi, indirizzi e-mail, date di nascita e così via. Potrebbe anche essere necessario memorizzare lunghe password o rischiare di perdere l'accesso.

Le prove a conoscenza-zero, tuttavia, possono semplificare l'autenticazione sia per le piattaforme che per gli utenti. Una volta generata una prova ZK utilizzando input pubblici (ad es., dati che attestano l'appartenenza dell'utente alla piattaforma) e input privati (ad es., i dettagli dell'utente), l'utente può semplicemente presentarla per autenticare la propria identità quando ha bisogno di accedere al servizio. Ciò migliora l'esperienza per gli utenti e libera le organizzazioni dalla necessità di archiviare enormi quantità di informazioni sugli utenti.

### Calcolo verificabile {#verifiable-computation}

Il calcolo verificabile è un'altra applicazione della tecnologia a conoscenza-zero per migliorare i design della blockchain. Il calcolo verificabile ci consente di esternalizzare il calcolo a un'altra entità mantenendo risultati verificabili. L'entità invia il risultato insieme a una prova che verifica che il programma sia stato eseguito correttamente.

Il calcolo verificabile è **fondamentale per migliorare le velocità di elaborazione sulle blockchain** senza ridurre la sicurezza. Comprenderlo richiede di conoscere le differenze nelle soluzioni proposte per la scalabilità di Ethereum.

Le [soluzioni di scalabilità on-chain](/developers/docs/scaling/#onchain-scaling), come la frammentazione, richiedono ampie modifiche al livello di base della blockchain. Tuttavia, questo approccio è altamente complesso e gli errori nell'implementazione possono minare il modello di sicurezza di Ethereum.

Le [soluzioni di scalabilità fuori catena](/developers/docs/scaling/#offchain-scaling) non richiedono la riprogettazione del protocollo principale di Ethereum. Si basano invece su un modello di calcolo esternalizzato per migliorare il throughput sul livello di base di Ethereum.

Ecco come funziona in pratica:

- Invece di elaborare ogni transazione, Ethereum scarica l'esecuzione su una catena separata.

- Dopo aver elaborato le transazioni, l'altra catena restituisce i risultati da applicare allo stato di Ethereum.

Il vantaggio qui è che Ethereum non deve eseguire alcuna esecuzione e deve solo applicare i risultati del calcolo esternalizzato al suo stato. Ciò riduce la congestione della rete e migliora anche le velocità delle transazioni (i protocolli fuori catena ottimizzano per un'esecuzione più rapida).

La catena ha bisogno di un modo per convalidare le transazioni fuori catena senza rieseguirle, altrimenti il valore dell'esecuzione fuori catena va perso.

È qui che entra in gioco il calcolo verificabile. Quando un nodo esegue una transazione al di fuori di Ethereum, invia una prova a conoscenza-zero per dimostrare la correttezza dell'esecuzione fuori catena. Questa prova (chiamata [prova di validità](/glossary/#validity-proof)) garantisce che una transazione sia valida, consentendo a Ethereum di applicare il risultato al suo stato, senza aspettare che qualcuno lo contesti.

I [rollup a conoscenza zero](/developers/docs/scaling/zk-rollups) e i [validium](/developers/docs/scaling/validium/) sono due soluzioni di scalabilità fuori catena che utilizzano le prove di validità per fornire una scalabilità sicura. Questi protocolli eseguono migliaia di transazioni fuori catena e inviano prove per la verifica su Ethereum. Tali risultati possono essere applicati immediatamente una volta verificata la prova, consentendo a Ethereum di elaborare più transazioni senza aumentare il calcolo sul livello di base.

Oltre alla scalabilità del livello 2, le prove a conoscenza zero possono anche verificare l'esecuzione stessa del blocco L1 di Ethereum. Lo zkEVM per la verifica L1 consentirebbe ai validatori di verificare i blocchi controllando una prova piuttosto che ri-eseguire tutte le transazioni -- consentendo limiti del gas più elevati senza aumentare i requisiti hardware del validatore.

### Ridurre la corruzione e la collusione nel voto on-chain {#secure-blockchain-voting}

Gli schemi di voto su blockchain hanno molte caratteristiche favorevoli: sono completamente verificabili, sicuri contro gli attacchi, resistenti alla censura e privi di vincoli geografici. Ma anche gli schemi di voto on-chain non sono immuni al problema della **collusione**.

Definita come "coordinarsi per limitare la concorrenza aperta ingannando, frodando e fuorviando gli altri", la collusione può assumere la forma di un attore malintenzionato che influenza il voto offrendo tangenti. Ad esempio, Alice potrebbe ricevere una tangente da Bob per votare per l'`option B` in una votazione anche se preferisce l'`option A`.

La corruzione e la collusione limitano l'efficacia di qualsiasi processo che utilizza il voto come meccanismo di segnalazione (specialmente dove gli utenti possono dimostrare come hanno votato). Ciò può avere conseguenze significative, specialmente dove i voti sono responsabili dell'allocazione di risorse scarse.

Ad esempio, i [meccanismi di finanziamento quadratico](https://www.radicalxchange.org/wiki/plural-funding/) si basano sulle donazioni per misurare la preferenza per determinate opzioni tra diversi progetti di beni pubblici. Ogni donazione conta come un "voto" per un progetto specifico, con i progetti che ricevono più voti che ottengono più fondi dal pool di abbinamento.

L'utilizzo del voto on-chain rende il finanziamento quadratico suscettibile alla collusione: le transazioni blockchain sono pubbliche, quindi i corruttori possono ispezionare l'attività on-chain di un corrotto per vedere come ha "votato". In questo modo il finanziamento quadratico cessa di essere un mezzo efficace per allocare fondi in base alle preferenze aggregate della comunità.

Fortunatamente, soluzioni più recenti come MACI (Minimum Anti-Collusion Infrastructure) stanno utilizzando le prove a conoscenza-zero per rendere il voto on-chain (ad es., i meccanismi di finanziamento quadratico) resistente alla corruzione e alla collusione. MACI è un insieme di contratti intelligenti e script che consentono a un amministratore centrale (chiamato "coordinatore") di aggregare i voti e conteggiare i risultati _senza_ rivelare i dettagli su come ogni individuo ha votato. Anche così, è ancora possibile verificare che i voti siano stati contati correttamente, o confermare che un particolare individuo ha partecipato al turno di votazione.

#### Come funziona MACI con le prove a conoscenza-zero? {#how-maci-works-with-zk-proofs}

All'inizio, il coordinatore distribuisce il contratto MACI su Ethereum, dopodiché gli utenti possono iscriversi per votare (registrando la loro chiave pubblica nel contratto intelligente). Gli utenti esprimono i voti inviando messaggi crittografati con la loro chiave pubblica al contratto intelligente (un voto valido deve essere firmato con la chiave pubblica più recente associata all'identità dell'utente, tra gli altri criteri). Successivamente, il coordinatore elabora tutti i messaggi una volta terminato il periodo di votazione, conteggia i voti e verifica i risultati on-chain.

In MACI, le prove a conoscenza-zero vengono utilizzate per garantire la correttezza del calcolo rendendo impossibile per il coordinatore elaborare in modo errato i voti e conteggiare i risultati. Ciò si ottiene richiedendo al coordinatore di generare prove ZK-SNARK che verificano che a) tutti i messaggi siano stati elaborati correttamente b) il risultato finale corrisponda alla somma di tutti i voti _validi_.

Pertanto, anche senza condividere una ripartizione dei voti per utente (come di solito accade), MACI garantisce l'integrità dei risultati calcolati durante il processo di conteggio. Questa funzione è utile per ridurre l'efficacia degli schemi di collusione di base. Possiamo esplorare questa possibilità utilizzando l'esempio precedente di Bob che corrompe Alice per votare per un'opzione:

- Alice si registra per votare inviando la sua chiave pubblica a un contratto intelligente.
- Alice accetta di votare per l'`option B` in cambio di una tangente da Bob.
- Alice vota per l'`option B`.
- Alice invia segretamente una transazione crittografata per modificare la chiave pubblica associata alla sua identità.
- Alice invia un altro messaggio (crittografato) al contratto intelligente votando per l'`option A` utilizzando la nuova chiave pubblica.
- Alice mostra a Bob una transazione che dimostra che ha votato per l'`option B` (che non è valida poiché la chiave pubblica non è più associata all'identità di Alice nel sistema).
- Durante l'elaborazione dei messaggi, il coordinatore salta il voto di Alice per l'`option B` e conta solo il voto per l'`option A`. Quindi, il tentativo di Bob di colludere con Alice e manipolare il voto on-chain fallisce.

L'utilizzo di MACI _richiede_ di fidarsi del coordinatore affinché non colluda con i corruttori o tenti di corrompere gli elettori stessi. Il coordinatore può decrittografare i messaggi degli utenti (necessario per creare la prova), in modo da poter verificare accuratamente come ha votato ogni persona.

Ma nei casi in cui il coordinatore rimane onesto, MACI rappresenta un potente strumento per garantire la sacralità del voto on-chain. Questo spiega la sua popolarità tra le applicazioni di finanziamento quadratico (ad es., [clr.fund](https://clr.fund/#/about/maci)) che si basano fortemente sull'integrità delle scelte di voto di ogni individuo.

[Scopri di più su MACI](https://maci.pse.dev/).

## Come funzionano le prove a conoscenza-zero? {#how-do-zero-knowledge-proofs-work}

Una prova a conoscenza-zero ti consente di dimostrare la verità di un'affermazione senza condividere i contenuti dell'affermazione o rivelare come hai scoperto la verità. Per rendere ciò possibile, i protocolli a conoscenza-zero si basano su algoritmi che prendono alcuni dati come input e restituiscono 'vero' o 'falso' come output.

Un protocollo a conoscenza-zero deve soddisfare i seguenti criteri:

1. **Completezza**: Se l'input è valido, il protocollo a conoscenza-zero restituisce sempre 'vero'. Quindi, se l'affermazione sottostante è vera e il dimostratore e il verificatore agiscono onestamente, la prova può essere accettata.

2. **Solidità**: Se l'input non è valido, è teoricamente impossibile ingannare il protocollo a conoscenza-zero per fargli restituire 'vero'. Quindi, un dimostratore bugiardo non può ingannare un verificatore onesto facendogli credere che un'affermazione non valida sia valida (tranne con un piccolissimo margine di probabilità).

3. **Conoscenza-zero**: Il verificatore non impara nulla su un'affermazione oltre alla sua validità o falsità (ha "conoscenza-zero" dell'affermazione). Questo requisito impedisce inoltre al verificatore di derivare l'input originale (i contenuti dell'affermazione) dalla prova.

Nella forma di base, una prova a conoscenza-zero è composta da tre elementi: **testimone** (witness), **sfida** (challenge) e **risposta** (response).

- **Testimone**: Con una prova a conoscenza-zero, il dimostratore vuole dimostrare la conoscenza di alcune informazioni nascoste. L'informazione segreta è il "testimone" della prova e la presunta conoscenza del testimone da parte del dimostratore stabilisce una serie di domande a cui può rispondere solo una parte a conoscenza delle informazioni. Pertanto, il dimostratore avvia il processo di dimostrazione scegliendo casualmente una domanda, calcolando la risposta e inviandola al verificatore.

- **Sfida**: Il verificatore sceglie casualmente un'altra domanda dal set e chiede al dimostratore di rispondere.

- **Risposta**: Il dimostratore accetta la domanda, calcola la risposta e la restituisce al verificatore. La risposta del dimostratore consente al verificatore di controllare se il primo ha davvero accesso al testimone. Per garantire che il dimostratore non stia tirando a indovinare alla cieca e ottenendo le risposte corrette per caso, il verificatore sceglie altre domande da porre. Ripetendo questa interazione molte volte, la possibilità che il dimostratore finga di conoscere il testimone diminuisce significativamente fino a quando il verificatore non è soddisfatto.

Quanto sopra descrive la struttura di una "prova a conoscenza-zero interattiva". I primi protocolli a conoscenza-zero utilizzavano la dimostrazione interattiva, in cui la verifica della validità di un'affermazione richiedeva una comunicazione avanti e indietro tra dimostratori e verificatori.

Un buon esempio che illustra come funzionano le prove interattive è la famosa [storia della caverna di Ali Babà](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) di Jean-Jacques Quisquater. Nella storia, Peggy (il dimostratore) vuole dimostrare a Victor (il verificatore) di conoscere la frase segreta per aprire una porta magica senza rivelare la frase.

### Prove a conoscenza-zero non interattive {#non-interactive-zero-knowledge-proofs}

Sebbene rivoluzionaria, la dimostrazione interattiva aveva un'utilità limitata poiché richiedeva che le due parti fossero disponibili e interagissero ripetutamente. Anche se un verificatore fosse convinto dell'onestà di un dimostratore, la prova non sarebbe disponibile per una verifica indipendente (il calcolo di una nuova prova richiedeva un nuovo set di messaggi tra il dimostratore e il verificatore).

Per risolvere questo problema, Manuel Blum, Paul Feldman e Silvio Micali hanno suggerito le prime [prove a conoscenza-zero non interattive](https://dl.acm.org/doi/10.1145/62212.62222) in cui il dimostratore e il verificatore hanno una chiave condivisa. Ciò consente al dimostratore di dimostrare la propria conoscenza di alcune informazioni (ovvero, il testimone) senza fornire le informazioni stesse.

A differenza delle prove interattive, le prove non interattive richiedevano solo un round di comunicazione tra i partecipanti (dimostratore e verificatore). Il dimostratore passa le informazioni segrete a un algoritmo speciale per calcolare una prova a conoscenza-zero. Questa prova viene inviata al verificatore, che controlla che il dimostratore conosca le informazioni segrete utilizzando un altro algoritmo.

La dimostrazione non interattiva riduce la comunicazione tra dimostratore e verificatore, rendendo le prove ZK più efficienti. Inoltre, una volta generata una prova, è disponibile per chiunque altro (con accesso alla chiave condivisa e all'algoritmo di verifica) per la verifica.

Le prove non interattive hanno rappresentato una svolta per la tecnologia a conoscenza-zero e hanno stimolato lo sviluppo dei sistemi di dimostrazione utilizzati oggi. Discutiamo questi tipi di prove di seguito:

### Tipi di prove a conoscenza-zero {#types-of-zero-knowledge-proofs}

#### ZK-SNARK {#zk-snarks}

ZK-SNARK è un acronimo per **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge** (Argomento di Conoscenza Succinto Non Interattivo a Conoscenza-Zero). Il protocollo ZK-SNARK ha le seguenti qualità:

- **Conoscenza-zero**: Un verificatore può convalidare l'integrità di un'affermazione senza sapere nient'altro sull'affermazione. L'unica conoscenza che il verificatore ha dell'affermazione è se è vera o falsa.

- **Succinto**: La prova a conoscenza-zero è più piccola del testimone e può essere verificata rapidamente.

- **Non interattivo**: La prova è "non interattiva" perché il dimostratore e il verificatore interagiscono solo una volta, a differenza delle prove interattive che richiedono più round di comunicazione.

- **Argomento**: La prova soddisfa il requisito di "solidità", quindi barare è estremamente improbabile.

- **Di Conoscenza**: La prova a conoscenza-zero non può essere costruita senza l'accesso alle informazioni segrete (testimone). È difficile, se non impossibile, per un dimostratore che non ha il testimone calcolare una prova a conoscenza-zero valida.

La "chiave condivisa" menzionata in precedenza si riferisce ai parametri pubblici che il dimostratore e il verificatore concordano di utilizzare nella generazione e nella verifica delle prove. La generazione dei parametri pubblici (noti collettivamente come Common Reference String (CRS)) è un'operazione sensibile a causa della sua importanza nella sicurezza del protocollo. Se l'entropia (casualità) utilizzata nella generazione della CRS finisce nelle mani di un dimostratore disonesto, questi può calcolare prove false.

Il [calcolo multipartecipante (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) è un modo per ridurre i rischi nella generazione di parametri pubblici. Più parti partecipano a una [cerimonia di configurazione fidata (trusted setup)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), in cui ogni persona contribuisce con alcuni valori casuali per generare la CRS. Finché una parte onesta distrugge la propria porzione di entropia, il protocollo ZK-SNARK mantiene la solidità computazionale.

Le configurazioni fidate richiedono che gli utenti si fidino dei partecipanti alla generazione dei parametri. Tuttavia, lo sviluppo degli ZK-STARK ha abilitato protocolli di dimostrazione che funzionano con una configurazione non fidata.

#### ZK-STARK {#zk-starks}

ZK-STARK è un acronimo per **Zero-Knowledge Scalable Transparent Argument of Knowledge** (Argomento di Conoscenza Trasparente Scalabile a Conoscenza-Zero). Gli ZK-STARK sono simili agli ZK-SNARK, tranne per il fatto che sono:

- **Scalabili**: ZK-STARK è più veloce di ZK-SNARK nel generare e verificare le prove quando la dimensione del testimone è maggiore. Con le prove STARK, i tempi del dimostratore e di verifica aumentano solo leggermente al crescere del testimone (i tempi del dimostratore e del verificatore SNARK aumentano linearmente con la dimensione del testimone).

- **Trasparenti**: ZK-STARK si basa su una casualità verificabile pubblicamente per generare parametri pubblici per la dimostrazione e la verifica invece di una configurazione fidata. Pertanto, sono più trasparenti rispetto agli ZK-SNARK.

Gli ZK-STARK producono prove più grandi rispetto agli ZK-SNARK, il che significa che generalmente hanno costi di verifica più elevati. Tuttavia, ci sono casi (come la dimostrazione di set di dati di grandi dimensioni) in cui gli ZK-STARK possono essere più convenienti rispetto agli ZK-SNARK.

## Svantaggi dell'utilizzo delle prove a conoscenza-zero {#drawbacks-of-using-zero-knowledge-proofs}

### Costi hardware {#hardware-costs}

La generazione di prove a conoscenza-zero comporta calcoli molto complessi eseguiti al meglio su macchine specializzate. Poiché queste macchine sono costose, sono spesso fuori dalla portata dei normali individui. Inoltre, le applicazioni che desiderano utilizzare la tecnologia a conoscenza-zero devono tenere conto dei costi hardware, che potrebbero aumentare i costi per gli utenti finali.

### Costi di verifica della prova {#proof-verification-costs}

Anche la verifica delle prove richiede calcoli complessi e aumenta i costi di implementazione della tecnologia a conoscenza-zero nelle applicazioni. Questo costo è particolarmente rilevante nel contesto della dimostrazione del calcolo. Ad esempio, i rollup a conoscenza zero pagano ~ 500.000 gas per verificare una singola prova ZK-SNARK su Ethereum, con gli ZK-STARK che richiedono commissioni ancora più elevate.

### Presupposti di fiducia {#trust-assumptions}

In ZK-SNARK, la Common Reference String (parametri pubblici) viene generata una volta ed è disponibile per il riutilizzo alle parti che desiderano partecipare al protocollo a conoscenza-zero. I parametri pubblici vengono creati tramite una cerimonia di configurazione fidata, in cui si presume che i partecipanti siano onesti.

Ma non c'è davvero alcun modo per gli utenti di valutare l'onestà dei partecipanti e gli utenti devono prendere in parola gli sviluppatori. Gli ZK-STARK sono liberi da presupposti di fiducia poiché la casualità utilizzata nella generazione della stringa è verificabile pubblicamente. Nel frattempo, i ricercatori stanno lavorando a configurazioni non fidate per gli ZK-SNARK per aumentare la sicurezza dei meccanismi di dimostrazione.

### Minacce dell'informatica quantistica {#quantum-computing-threats}

ZK-SNARK utilizza la crittografia a curva ellittica per la crittografia. Sebbene il problema del logaritmo discreto della curva ellittica sia considerato intrattabile per ora, lo sviluppo dei computer quantistici potrebbe infrangere questo modello di sicurezza in futuro.

ZK-STARK è considerato immune alla minaccia dell'informatica quantistica, poiché si basa solo su funzioni di hash resistenti alle collisioni per la sua sicurezza. A differenza degli accoppiamenti di chiavi pubbliche-private utilizzati nella crittografia a curva ellittica, l'hashing resistente alle collisioni è più difficile da infrangere per gli algoritmi di calcolo quantistico.

## Letture consigliate {#further-reading}

- [Panoramica dei casi d'uso per le prove a conoscenza-zero](https://pse.dev/projects) — _Team Privacy and Scaling Explorations_
- [SNARK vs. STARK vs. SNARK Ricorsivi](https://www.alchemy.com/overviews/snarks-vs-starks) — _Alchemy Overviews_
- [Una Prova a Conoscenza-Zero: Migliorare la Privacy su una Blockchain](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARK — Un Esempio Realistico a Conoscenza-Zero e Approfondimento](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARK — Creare Fiducia Verificabile, anche contro i Computer Quantistici](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [Un'introduzione approssimativa a come sono possibili gli zk-SNARK](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Perché le Prove a Conoscenza-Zero (ZKP) sono un Punto di Svolta per l'Identità Auto-Sovrana](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_
- [EIP-7503 Spiegato: Abilitare Trasferimenti Privati su Ethereum con Prove ZK](https://research.2077.xyz/eip-7503-zero-knowledge-wormholes-for-private-ethereum-transactions#introduction) — _Emmanuel Awosika_
- [Gioco di Carte ZK: gioco per imparare i fondamenti ZK e i casi d'uso nella vita reale](https://github.com/ZK-card/zk-cards) - _ZK-Cards_