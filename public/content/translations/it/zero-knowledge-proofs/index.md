---
title: Dimostrazioni a conoscenza zero
description: Un'introduzione non tecnica alle prove a conoscenza-zero per principianti.
lang: it
---

# Cosa sono le prove a conoscenza zero? {#what-are-zk-proofs}

Una prova a conoscenza zero è un modo per provare la validità di una dichiarazione senza rivelarla. Il 'dimostratore' è la parte che tenta di provare una rivendicazione, mentre il 'validatore' è responsabile della sua convalida.

Le prove a conoscenza-zero sono apparse per la prima volta in un articolo del 1985, “[The knowledge complexity of interactive proof systems](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)”, che fornisce una definizione di prove a conoscenza-zero ampiamente usata oggi:

> Un protocollo a conoscenza-zero è un metodo con cui una parte (il dimostratore) **può provare** a un'altra parte (il verificatore) **che qualcosa è vero, senza rivelare alcuna informazione**, a parte il fatto che questa specifica affermazione è vera.

Le prove a conoscenza zero sono migliorate negli anni e adesso sono utilizzate in diverse applicazioni del mondo reale.

<YouTube id="fOGdb1CTu5c" />

## Perché ci servono le prove a conoscenza zero? {#why-zero-knowledge-proofs-are-important}

Le prove a conoscenza zero hanno rappresentato una svolta nella crittografia applicata, poiché hanno promesso di migliorare la sicurezza delle informazioni per le persone. Pensa a come potresti dimostrare una rivendicazione (es. "Sono un cittadino del paese X") a un'altra parte (es. un fornitore di servizi). Dovresti fornire una "prova" per sostenere la tua rivendicazione, come un passaporto nazionale o la patente di guida.

Ma questo approccio presenta dei problemi, principalmente la mancanza di privacy. Le informazioni di identificazione personale (PII) condivise con servizi di terze parti sono memorizzate in banche dati centrali, vulnerabili alle violazioni. Poiché il furto d'identità sta diventando un problema critico, è necessario identificare mezzi di condivisione delle informazioni sensibili con una protezione più efficace della privacy.

Le prove a conoscenza-zero risolvono questo problema **eliminando la necessità di rivelare informazioni per dimostrare la validità delle affermazioni**. Il protocollo a conoscenza zero utilizza l'istruzione (detta 'testimone') come input per generare una prova succinta della sua validità. Tale prova fornisce forti garanzie che un'istruzione sia vera senza esporre le informazioni utilizzate per crearla.

Tornando al nostro esempio precedente, l'unica prova che serve per dimostrare la rivendicazione sulla tua cittadinanza è una prova a conoscenza zero. Il verificatore deve soltanto verificare se determinate proprietà della prova sono vere per convincersi che anche l'istruzione sottostante sia vera.

## Casi d'uso per le prove a conoscenza-zero {#use-cases-for-zero-knowledge-proofs}

### Pagamenti anonimi {#anonymous-payments}

I pagamenti con carta di credito sono spesso visibili a più parti, inclusi il fornitore dei pagamenti, le banche e altre parti interessate (ad es. autorità governative). La sorveglianza finanziaria comporta vantaggi per l'identificazione delle attività illegali, ma compromette anche la privacy dei cittadini comuni.

Le criptovalute avevano lo scopo di fornire agli utenti un mezzo per condurre transazioni private e peer-to-peer. Ma la maggior parte delle transazioni di criptovalute è visibile a tutti sulle blockchain pubbliche. Le identità degli utenti sono spesso pseudonime e vengono collegate volontariamente a identità del mondo reale (ad es. includendo indirizzi ETH su profili Twitter o GitHub) o possono essere associate a identità del mondo reale utilizzando un'analisi di base dei dati on-chain e off-chain.

Esistono delle “monete per la privacy” specifiche pensate per transazioni completamente anonime. Le blockchain incentrate sulla privacy, come Zcash e Monero, proteggono i dettagli delle transazioni, inclusi gli indirizzi del mittente/destinatario, il tipo di risorsa, la quantità e la sequenza temporale della transazione.

Integrando la tecnologia a conoscenza-zero nel protocollo, le reti [blockchain](/glossary/#blockchain) incentrate sulla privacy consentono ai [nodi](/glossary/#node) di convalidare le transazioni senza dover accedere ai dati delle transazioni. [EIP-7503](https://eips.ethereum.org/EIPS/eip-7503) è un esempio di progetto proposto che consentirà trasferimenti di valore privati nativi sulla blockchain di Ethereum. Proposte di questo tipo sono però difficili da implementare a causa di un mix di preoccupazioni sulla sicurezza, regolamentazione e UX.

**Le prove a conoscenza zero sono applicate anche all'anonimizzazione delle transazioni sulle blockchain pubbliche**. Un esempio è Tornado Cash, un servizio decentralizzato e non custodito che consente agli utenti di effettuare transazioni private su Ethereum. Tornado Cash utilizza dimostrazioni a conoscenza zero per offuscare i dettagli delle transazioni e garantire la privacy finanziaria. Purtroppo, visto che questi sono strumenti di privacy "opt-in" sono associati ad attività illecite. Per superare questo problema, la privacy deve diventare l'impostazione predefinita sulle blockchain pubbliche. Scopri di più sulla [privacy su Ethereum](/privacy/).

### Protezione dell'identità {#identity-protection}

Gli attuali sistemi di gestione dell'identità mettono a rischio i dati personali. Le prove a conoscenza zero possono aiutare gli individui a convalidare l'identità proteggendo le informazioni sensibili.

Le prove a conoscenza-zero sono particolarmente utili nel contesto dell'[identità decentralizzata](/decentralized-identity/). L'identità decentralizzata (descritta anche come «identità auto-sovrana») conferisce all'individuo la possibilità di controllare l'accesso agli identificatori personali. Dimostrare la propria cittadinanza senza rivelare il proprio ID fiscale o i dettagli del passaporto è un buon esempio di come la tecnologia a conoscenza zero consente l'identità decentralizzata.

<Alert variant="info">
  <AlertEmoji text="💡" />
  <AlertContent>
    <AlertTitle className="mb-2">
      ZKP + Identità in azione: ID digitale nazionale del Bhutan (NDI) su Ethereum
    </AlertTitle>
    <AlertDescription>
      <p>
        Un esempio reale di utilizzo di ZKP per i sistemi di gestione dell'identità è il sistema di ID digitale nazionale (NDI) del Regno del Bhutan, costruito su Ethereum. L'NDI del Bhutan utilizza le ZKP per consentire ai cittadini di provare crittograficamente fatti su se stessi, come "Sono un cittadino" o "Ho più di 18 anni", senza rivelare i dati personali sensibili sul loro documento d'identità.
      </p>
      <p>
        Scopri di più sull'NDI del Bhutan nel <a href="/decentralized-identity/#national-and-government-id">caso di studio sull'identità decentralizzata</a>.
      </p>
    </AlertDescription>
  </AlertContent>
</Alert>

### Prova di umanità {#proof-of-humanity}

Uno degli esempi più diffusi di prove a conoscenza-zero in azione oggi è il [protocollo World ID](https://world.org/blog/world/world-id-faqs), che può essere considerato come "un passaporto digitale globale per l'era dell'IA". Permette alle persone di dar prova della propria unicità come individui senza rivelare informazioni personali. Questo si ottiene attraverso un dispositivo chiamato Orb che scannerizza l'iride della persona generando un codice dell'iride stesso. Il codice dell'iride viene controllato e verificato per confermare che la persona è biologicamente un essere umano unico. Dopo la verifica, un impegno d'identità generato sul dispositivo dell'utente (e non collegato a o derivato dai dati biometrici) è aggiunto a una lista sicura sulla blockchain. Poi ogni volta che l'utente vuole provare di essere un umano verificato - che sia per firmare, votare o eseguire altre azioni - possono generare una prova a conoscenza zero che conferma la propria appartenenza alla lista. La bellezza dell'utilizzo di una prova a conoscenza zero è che solo una dichiarazione è rivelata: questa persona è unica. Tutto il resto rimane privato.

World ID si basa sul [protocollo Semaphore](https://docs.semaphore.pse.dev/) sviluppato dal [team PSE](https://pse.dev/) della Ethereum Foundation. Semaphore è progettato per essere un modo semplice ma potente per generare e verificare le prove a conoscenza zero. Permette agli utenti di provare che fanno parte di un gruppo (in questo caso, umani verificati) senza mostrare di quale membro del gruppo si tratta. Semaphore è anche estremamente flessibile, permettendo la creazione di gruppi basata su un ampio raggio di criteri come la verifica dell'identità, partecipazione a eventi o titolarità di credenziali.

### Autenticazione {#authentication}

L'utilizzo di servizi online richiede la prova della tua identità e del diritto di accedere a tali piattaforme. Questo richiede spesso di fornire informazioni personali, come nomi, indirizzi e-mail, date di nascita, e così via. Potrebbe anche essere necessario memorizzare password lunghe o rischiare di perdere l'accesso.

Le dimostrazioni a conoscenza zero possono, tuttavia, semplificare l'autenticazione sia per le piattaforme che per gli utenti. Una volta che una dimostrazione a conoscenza zero è stata generata utilizzando input pubblici (es., dati che attestano l'appartenenza dell'utente alla piattaforma) e input privati (es., i dati dell'utente), l'utente può semplicemente presentarlo per autenticare la propria identità quando hanno bisogno di accedere al servizio. Questo migliora l'esperienza per gli utenti e libera le organizzazioni dalla necessità di memorizzare enormi quantità di informazioni per gli utenti.

### Calcolo verificabile {#verifiable-computation}

Il calcolo verificabile è un'altra applicazione della tecnologia a conoscenza zero per migliorare i progetti blockchain. Il calcolo verificabile ci permette di esternalizzare il calcolo ad un'altra entità mantenendo i risultati verificabili. L'entità presenta il risultato insieme a un'attestazione che verifica che il programma è stato eseguito correttamente.

Il calcolo verificabile è **fondamentale per migliorare la velocità di elaborazione sulle blockchain** senza ridurre la sicurezza. Comprendere questo aspetto richiede di conoscere le differenze nelle soluzioni proposte per la scalabilità di Ethereum.

Le [soluzioni di scalabilità on-chain](/developers/docs/scaling/#onchain-scaling), come lo sharding, richiedono una modifica estesa del livello di base della blockchain. Tuttavia, questo approccio è molto complesso e gli errori nell'attuazione possono compromettere il modello di sicurezza di Ethereum.

Le [soluzioni di scalabilità off-chain](/developers/docs/scaling/#offchain-scaling) non richiedono la riprogettazione del protocollo core di Ethereum. Invece si basano su un modello di calcolo esternalizzato per migliorare la produttività sul livello base di Ethereum.

Ecco come funziona nella pratica:

- Invece di elaborare ogni transazione, Ethereum scarica l'esecuzione in una catena separata.

- Dopo aver elaborato le transazioni, l'altra catena restituisce i risultati da applicare allo stato di Ethereum.

Il vantaggio è che Ethereum non deve fare alcuna esecuzione e deve solo applicare i risultati dal calcolo esternalizzato al suo stato. Questo riduce la congestione di rete e inoltre migliora la velocità delle transazioni (i protocolli offchain ottimizzano per un'esecuzione più veloce).

La catena ha bisogno di un modo di validare le transazioni offchain senza dover eseguirle nuovamente, altrimenti si perde il valore dell'esecuzione offchain.

È qui che entra in gioco il calcolo verificabile. Quando un nodo esegue una transazione al di fuori di Ethereum, esso invia una prova a conoscenza zero per dimostrare la correttezza dell'esecuzione offchain. Questa prova (chiamata [prova di validità](/glossary/#validity-proof)) garantisce la validità di una transazione, consentendo a Ethereum di applicare il risultato al suo stato, senza attendere che qualcuno la contesti.

I [rollup a conoscenza-zero](/developers/docs/scaling/zk-rollups) e i [validium](/developers/docs/scaling/validium/) sono due soluzioni di scalabilità off-chain che utilizzano prove di validità per fornire una scalabilità sicura. Questi protocolli eseguono centinaia di transazioni offchain e inviano la prova di verifica su Ethereum. Questi risultati possono essere applicati immediatamente dopo che la prova è stata verificata, permettendo ad Ethereum di elaborare più transazioni senza incrementare i calcoli sul livello di base.

### Ridurre la corruzione e la collusione nelle votazioni on-chain {#secure-blockchain-voting}

Gli schemi di voto della blockchain hanno molte caratteristiche favorevoli: sono interamente controllabili, sicuri contro gli attacchi, resistenti alla censura e liberi da vincoli geografici. Ma anche gli schemi di voto on-chain non sono immuni al problema della **collusione**.

Definita come "azioni di coordinamento per limitare la competizione aperta ingannando, truffando e fuorviando gli altri", la collusione potrebbe assumere la forma di un utente malevolo che influenza il voto offrendo tangenti. Ad esempio, Alice potrebbe ricevere una tangente da Bob per votare per l'`opzione B` in una votazione, anche se preferisce l'`opzione A`.

Corruzione e collusione limitano l'efficiacia di qualsiasi processo che utilizzi il voto come meccanismo di indicazione (specialmente nei casi in cui gli utenti possono provare come hanno votato). Ciò può avere conseguenze significative, specialmente quando i voti determinano l'allocazione di risorse scarse.

Ad esempio, i [meccanismi di finanziamento quadratico](https://www.radicalxchange.org/wiki/plural-funding/) si basano sulle donazioni per misurare la preferenza per determinate opzioni tra diversi progetti di beni pubblici. Ogni donazione conta come un "voto" per un progetto specifico, e i progetti che ricevono il maggior numero di voti ottengono maggiori finanziamenti dal gruppo corrispondente.

Utilizzare il voto onchain espone il finanziamento quadratico alla collusione: le transazioni della blockchain sono pubbliche, quindi i corruttori possono ispezionare l'attività onchain di un corrotto, per vedere come ha "votato". Così, i finanziamenti quadratici cessano di essere un mezzo efficiente per allocare fondi a seconda delle preferenze aggregate della community.

Fortunatamente, soluzioni più recenti come MACI (Minimum Anti-Collusion Infrastructure) stanno usando le prove a conoscenza-zero per rendere il voto on-chain (ad es. i meccanismi di finanziamento quadratico) resistente a corruzione e collusione. MACI è un insieme di contratti intelligenti e script che consentono a un amministratore centrale (chiamato "coordinatore") di aggregare i voti e calcolare i risultati _senza_ rivelare i dettagli su come ogni individuo ha votato. Ciononostante, è ancora possibile verificare che i voti siano stati contati correttamente o confermare che un particolare individuo abbia partecipato al turno di votazioni.

#### Come funziona MACI con prove a conoscenza zero? {#how-maci-works-with-zk-proofs}

All'inizio, il coordinatore distribuisce il contratto della MACI su Ethereum, dopodiché gli utenti possono iscriversi al voto (registrando la propria chiave pubblica nel contratto intelligente). Gli utenti trasmettono i voti inviando messaggi crittografati con la propria chiave pubblica al contratto intelligente (un voto valido dev'essere firmato con la chiave pubblica più recente associata all'identità dell'utente, tra gli altri criteri). Dopodiché, il coordinatore elabora tutti i messaggi al termine del periodo di voto, conteggia i voti e verifica i risultati onchain.

Nella MACI, le prove a conoscenza zero sono utilizzate per assicurare la correttezza del calcolo, rendendo impossibile per il coordinatore elaborare erroneamente i voti e i risultati dei conteggi. Questo si ottiene richiedendo al coordinatore di generare prove ZK-SNARK che verifichino che a) tutti i messaggi siano stati elaborati correttamente b) il risultato finale corrisponda alla somma di tutti i voti _validi_.

Dunque, anche senza condividere una ripartizione dei voti per utente (come avviene in genere), la MACI garantisce l'integrità dei risultati calcolati durante la procedura di conteggio. Questa funzionalità è utile nel ridurre l'efficacia degli schemi basilari di collusione. Possiamo esplorare questa possibilità utilizzando l'esempio precedente di Bob che corrompe Alice per votare per un'opzione:

- Alice si registra per votare inviando la propria chiave pubblica a uno smart contract.
- Alice accetta di votare per l'`opzione B` in cambio di una tangente da Bob.
- Alice vota per l'`opzione B`.
- Alice invia segretamente una transazione cifrata per cambiare la chiave pubblica associata alla sua identità.
- Alice invia un altro messaggio (crittografato) al contratto intelligente votando per l'`opzione A` usando la nuova chiave pubblica.
- Alice mostra a Bob una transazione che dimostra che ha votato per l'`opzione B` (che non è valida poiché la chiave pubblica non è più associata all'identità di Alice nel sistema)
- Durante l'elaborazione dei messaggi, il coordinatore salta il voto di Alice per l'`opzione B` e conta solo il voto per l'`opzione A`. Dunque, il tentativo di collusione di Bob con Alice e di manipolazione del voto onchain fallisce.

L'uso di MACI _richiede_ di fidarsi che il coordinatore non colluda con i corruttori o tenti di corrompere gli elettori stessi. Il coordinatore può decifrare i messaggi degli utenti (operazione necessaria per creare la prova), così che possa verificare accuratamente il voto di ogni persona.

Ma nei casi in cui il coordinatore rimane onesto, la MACI rappresenta un potente strumento a garanzia della legittimità del voto onchain. Questo spiega la sua popolarità tra le applicazioni di finanziamento quadratico (ad es. [clr.fund](https://clr.fund/#/about/maci)) che si basano molto sull'integrità delle scelte di voto di ogni individuo.

[Scopri di più su MACI](https://maci.pse.dev/).

## Come funzionano le prove a conoscenza zero? {#how-do-zero-knowledge-proofs-work}

Una prova a conoscenza zero permette di dimostrare la verità di una dichiarazione senza condividere i contenuti dell’affermazione o rivelare come l'hai scoperta. A tal fine, i protocolli a conoscenza zero si basano su algoritmi che prendono alcuni dati in entrata e restituiscono ‘true’ o ‘false’ come risultato.

Un protocollo a conoscenza zero deve soddisfare i seguenti criteri:

1. **Completezza**: Se l'input è valido, il protocollo a conoscenza-zero restituisce sempre 'true'. Quindi, se la dichiarazione sottostante è vera, se il dimostratore e il validatore agiscono onestamente, la prova può essere accettata.

2. **Solidità**: Se l'input non è valido, è teoricamente impossibile ingannare il protocollo a conoscenza-zero per fargli restituire 'true'. Quindi, un dimostratore bugiardo non può ingannare un validatore onesto a credere che una dichiarazione non valida sia valida (se non con un piccolo margine di probabilità).

3. **Conoscenza-zero**: Il verificatore non apprende nulla su un'affermazione al di là della sua validità o falsità (ha "conoscenza zero" dell'affermazione). Questo requisito impedisce anche al validatore di ricavare l'immissione iniziale (il contenuto della dichiarazione) dal protocollo.

Nella sua forma di base, una prova a conoscenza-zero è composta da tre elementi: **testimone**, **sfida** e **risposta**.

- **Testimone**: con una prova a conoscenza-zero, il dimostratore vuole provare la conoscenza di alcune informazioni nascoste. L'informazione segreta è il "testimone" della prova, e la presunta conoscenza del testimone da parte del dimostratore stabilisce una serie di domande a cui può rispondere solo una parte a conoscenza dell'informazione. Pertanto, il dimostratore avvia il processo di prova scegliendo casualmente una domanda, calcolando la risposta e inviandola al verificatore.

- **Sfida**: il verificatore sceglie a caso un'altra domanda dall'insieme e chiede al dimostratore di rispondere.

- **Risposta**: il dimostratore accetta la domanda, calcola la risposta e la restituisce al verificatore. La risposta del dimostratore consente al validatore di verificare se il primo ha realmente accesso al testimone. Per garantire che il dimostratore non indovini alla cieca e ottenga le risposte corrette per caso, il validatore sceglie più domande da porre. Ripetendo questa interazione molte volte, la possibilità che il dimostratore falsifichi la conoscenza del testimone diminuisce in modo significativo fino a quando il validatore non è soddisfatto.

Quanto sopra descrive la struttura di una “prova interattiva a conoscenze zero”. I primi protocolli a conoscenza zero utilizzavano la dimostrazione interattiva, in cui la verifica della validità di una dichiarazione richiedeva una comunicazione avanti e indietro tra dimostratori e validatori.

Un buon esempio che illustra come funzionano le prove interattive è la famosa [storia della grotta di Ali Baba](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) di Jean-Jacques Quisquater. Nella storia, Peggy (il dimostratore) vuole dimostrare a Victor (il validatore) che conosce la frase segreta per aprire una porta magica senza rivelare la frase.

### Prove a conoscenza-zero non interattive {#non-interactive-zero-knowledge-proofs}

Sebbene rivoluzionario, la prova interattiva aveva un'utilità limitata poiché richiedeva che le due parti fossero disponibili e interagissero ripetutamente. Anche se un validatore fosse convinto dell’onestà di un dimostratore, la prova non sarebbe disponibile per una verifica indipendente (il calcolo di una nuova prova richiede una nuova serie di messaggi tra il dimostratore e il validatore).

Per risolvere questo problema, Manuel Blum, Paul Feldman e Silvio Micali hanno suggerito le prime [prove a conoscenza-zero non interattive](https://dl.acm.org/doi/10.1145/62212.62222) in cui il dimostratore e il verificatore hanno una chiave condivisa. Ciò permette al dimostratore di manifestare la propria conoscenza di alcune informazioni (ad esempio, testimone) senza fornire le informazioni stesse.

A differenza delle prove interattive, le prove non interattive richiedevano solo una serie di comunicazioni tra i partecipanti (dimostratore e validatore). Il dimostratore passa le informazioni segrete a un apposito algoritmo per calcolare una prova a conoscenza zero. Questa prova viene inviata al validatore, che controlla che il dimostratore conosca le informazioni segrete utilizzando un altro algoritmo.

La prova non interattiva riduce la comunicazione tra dimostratore e validatore, rendendo le prove ZK più efficienti. Inoltre, una volta generata una prova, è disponibile per chiunque altro (con accesso alla chiave condivisa e all'algoritmo di verifica) per la verifica.

Le prove non interattive hanno rappresentato una svolta per la tecnologia a conoscenza zero e hanno stimolato lo sviluppo dei sistemi di dimostrazione utilizzati oggi. Discutiamo questi tipi di prova di seguito:

### Tipi di prove a conoscenza-zero {#types-of-zero-knowledge-proofs}

#### ZK-SNARK {#zk-snarks}

ZK-SNARK è l'acronimo di **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge**. Il protocollo ZK-SNARK ha le seguenti qualità:

- **Conoscenza-zero**: un verificatore può convalidare l'integrità di un'affermazione senza sapere nient'altro sull'affermazione stessa. L'unica conoscenza che il validatore ha della dichiarazione è se è vera o falsa.

- **Succinto**: la prova a conoscenza-zero è più piccola del testimone e può essere verificata rapidamente.

- **Non interattiva**: la prova è 'non interattiva' perché il dimostratore e il verificatore interagiscono solo una volta, a differenza delle prove interattive che richiedono più cicli di comunicazione.

- **Argomento**: la prova soddisfa il requisito di 'solidità', quindi imbrogliare è estremamente improbabile.

- **(Di) Conoscenza**: la prova a conoscenza-zero non può essere costruita senza l'accesso alle informazioni segrete (testimone). È difficile, se non impossibile, per un dimostratore che non ha il testimone calcolare una valida prova a conoscenza zero.

La «chiave condivisa» menzionata in precedenza si riferisce a parametri pubblici che il dimostratore e il validatore accettano di utilizzare per generare e verificare le prove. Generare i parametri pubblici (collettivamente noti come la Stringa di Riferimento Comune (CRS)) è un'operazione sensibile data la sua importanza nella sicurezza del protocollo. Se l'entropia (casualità) utilizzata per generare il CRS entra nelle mani di un dimostratore disonesto, possono calcolare delle prove false.

Il [calcolo multipartitico (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) è un modo per ridurre i rischi nella generazione di parametri pubblici. Più parti partecipano a una [cerimonia di configurazione fidata](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), in cui ogni persona contribuisce con alcuni valori casuali per generare il CRS. Finché una parte onesta distrugge la propria porzione di entropia, il protocollo ZK-SNARK mantiene la solidità computazionale.

Le configurazioni sulla fiducia richiedono agli utenti di fidarsi dei partecipanti alla generazione dei parametri. Tuttavia, lo sviluppo di ZK-STARK ha creato le condizioni affinché i protocolli di prova funzionino con una configurazione non affidabile.

#### ZK-STARK {#zk-starks}

ZK-STARK è l'acronimo di **Zero-Knowledge Scalable Transparent Argument of Knowledge**. I ZK-STARK sono simili ai ZK-SNARK, tranne per il fatto che sono:

- **Scalabile**: ZK-STARK è più veloce di ZK-SNARK nel generare e verificare le prove quando la dimensione del testimone è maggiore. Con le prove STARK, i tempi di dimostrazione e verifica aumentano solo leggermente man mano che il testimone cresce (i tempi di dimostrazione e validazione SNARK aumentano linearmente con la dimensione del testimone).

- **Trasparente**: ZK-STARK si basa su una casualità pubblicamente verificabile per generare parametri pubblici per la dimostrazione e la verifica, invece di una configurazione fidata. Pertanto, sono più trasparenti rispetto agli ZK-SNARK.

Gli ZK-STARK producono prove più grandi rispetto agli ZK-SNARK, il che significa che generalmente hanno spese generali di verifica più elevate. Tuttavia, esistono casi (come la dimostrazione di grandi set di dati) in cui ZK-STARK può essere più conveniente rispetto a ZK-SNARK.

## Svantaggi dell'uso delle prove a conoscenza-zero {#drawbacks-of-using-zero-knowledge-proofs}

### Costi hardware {#hardware-costs}

Generare prove a conoscenza zero comporta calcoli molto complessi, eseguiti meglio su macchine specializzate. Poiché tali macchine sono costose, sono spesso fuori dalla portata delle persone "normali". Inoltre, le applicazioni che desiderano utilizzare la tecnologia a conoscenza zero devono tenere conto dei costi dell'hardware, che potrebbero incrementare i costi per gli utenti finali.

### Costi di verifica della prova {#proof-verification-costs}

Anche la verifica delle prove richiede calcoli complessi e incrementa i costi di implementazione della tecnologia a conoscenza zero nelle applicazioni. Questo costo è particolarmente importante nel contesto della prova del calcolo. Ad esempio, i rollup ZK pagano approssimativamente 500.000 gas per verificare una singola prova ZK-SNARK su Ethereum, mentre le ZK-STARK richiedono commissioni persino maggiori.

### Presupposti di fiducia {#trust-assumptions}

Nelle ZN-SNARK, la Stringa di Riferimento Comune (parametri pubblici) è generata una volta ed è disponibile per il riutilizzo alle parti che desiderano partecipare al protocollo a conoscenza zero. I parametri pubblici sono creati tramite una cerimonia di configurazione attendibile, in cui partecipanti sono considerati onesti.

Ma non esiste davvero un modo tramite cui gli utenti possano valutare l'onestà dei partecipanti e gli utenti devono prendere in parola gli sviluppatori. Le ZK-STARK sono libere da ipotesi di fiducia, poiché la casualità utilizzata nel generare la stringa è verificabile pubblicamente. Nel mentre, i ricercatori stanno lavorando a configurazioni non basate sulla fiducia per le ZK-SNARK per aumentare la sicurezza dei meccanismi di prova.

### Minacce del calcolo quantistico {#quantum-computing-threats}

ZK-SNARK utilizza la crittografia a curva ellittica. Sebbene oggi si presupponga che il problema del logaritmo discreto della curva ellittica sia irrisolvibile, in futuro lo sviluppo dei computer quantistici potrebbero infrangere questo modello di sicurezza.

ZK-STARK è considerato immune alla minaccia dell'informatica quantistica, poiché si affida esclusivamente a funzioni di hash resistenti alla collisione per la propria sicurezza. A differenza delle coppie di chiavi pubbliche-private utilizzate nella crittografia a curva ellittica, gli hash resistenti alla collisione sono più difficili da rompere per gli algoritmi dei computer quantistici.

## Letture consigliate {#further-reading}

- [Panoramica dei casi d'uso delle prove a conoscenza-zero](https://pse.dev/projects) — _Privacy and Scaling Explorations Team_
- [SNARK, STARK e SNARK ricorsivi a confronto](https://www.alchemy.com/overviews/snarks-vs-starks) — _Alchemy Overviews_
- [Una prova a conoscenza-zero: migliorare la privacy su una blockchain](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARK — Un esempio realistico di conoscenza-zero e un approfondimento](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARK — Creare fiducia verificabile, anche contro i computer quantistici](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [Un'introduzione approssimativa a come sono possibili gli zk-SNARK](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Perché le prove a conoscenza-zero (ZKP) sono una svolta per l'identità auto-sovrana](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_
- [Spiegazione dell'EIP-7503: abilitare i trasferimenti privati su Ethereum con le prove ZK](https://research.2077.xyz/eip-7503-zero-knowledge-wormholes-for-private-ethereum-transactions#introduction) — _Emmanuel Awosika_
- [Gioco di carte ZK: un gioco per imparare i fondamenti della ZK e i casi d'uso reali](https://github.com/ZK-card/zk-cards) - _ZK-Cards_
