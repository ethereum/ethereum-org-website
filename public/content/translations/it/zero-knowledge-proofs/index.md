---
title: Prove a conoscenza zero
description: Un introduzione "non tecnica" per i principianti sulle prove a conoscenza zero.
lang: it
---

# Cosa sono le prove a conoscenza zero? {#what-are-zk-proofs}

Una prova a conoscenza zero è un modo per provare la validità di una dichiarazione senza rivelarla. Il 'dimostratore' è la parte che tenta di provare una rivendicazione, mentre il 'validatore' è responsabile della sua convalida.

Le prove a conoscenza zero sono apparse per la prima volta in un documento del 1985, "[La complessità di conoscenza dei sistemi di prova interattiva](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)", che fornisce una definizione delle prove a conoscenza zero, ampiamente utilizzata oggi:

> Un protocollo a conoscenza zero è un metodo tramite cui una parte (il dimostratore) **può provare** a un'altra parte (il verificatore) **che qualcosa è vero, senza rivelare alcuna informazione** tranne il fatto che tale specifica istruzione sia vera.

Le prove a conoscenza zero sono migliorate negli anni e adesso sono utilizzate in diverse applicazioni del mondo reale.

<YouTube id="fOGdb1CTu5c" />

## Perché ci servono le prove a conoscenza zero? {#why-zero-knowledge-proofs-are-important}

Le prove a conoscenza zero hanno rappresentato una svolta nella crittografia applicata, poiché hanno promesso di migliorare la sicurezza delle informazioni per le persone. Pensa a come potresti dimostrare una rivendicazione (es. "Sono un cittadino del paese X") a un'altra parte (es. un fornitore di servizi). Dovresti fornire una "prova" per sostenere la tua rivendicazione, come un passaporto nazionale o la patente di guida.

Ma questo approccio presenta dei problemi, principalmente la mancanza di privacy. Le informazioni di identificazione personale (PII) condivise con servizi di terze parti sono memorizzate in banche dati centrali, vulnerabili alle violazioni. Poiché il furto d'identità sta diventando un problema critico, è necessario identificare mezzi di condivisione delle informazioni sensibili con una protezione più efficace della privacy.

Le prove a conoscenza zero risolvono questo problema **eliminando la necessità di rivelare informazioni per dimostrare la validità delle rivendicazioni**. Il protocollo a conoscenza zero utilizza l'istruzione (detta 'testimone') come input per generare una prova succinta della sua validità. Tale prova fornisce forti garanzie che un'istruzione sia vera senza esporre le informazioni utilizzate per crearla.

Tornando al nostro esempio precedente, l'unica prova che serve per dimostrare la rivendicazione sulla tua cittadinanza è una prova a conoscenza zero. Il verificatore deve soltanto verificare se determinate proprietà della prova sono vere per convincersi che anche l'istruzione sottostante sia vera.

## Casi d'uso delle prove a conoscenza zero {#use-cases-for-zero-knowledge-proofs}

### Pagamenti anonimi {#anonymous-payments}

I pagamenti con carta di credito sono spesso visibili a più parti, inclusi il fornitore dei pagamenti, le banche e altre parti interessate (ad es. autorità governative). La sorveglianza finanziaria comporta vantaggi per l'identificazione delle attività illegali, ma compromette anche la privacy dei cittadini comuni.

Le criptovalute avevano lo scopo di fornire agli utenti un mezzo per condurre transazioni private e peer-to-peer. Ma la maggior parte delle transazioni di criptovalute è visibile a tutti sulle blockchain pubbliche. Le identità degli utenti sono spesso pseudonime e collegate intenzionalmente a identità del mondo reale (ad esempio includendo indirizzi ETH su profili Twitter o GitHub) o possono essere associate a identità del mondo reale utilizzando l'analisi base, on e off-chain di dati.

Esistono delle “monete per la privacy” specifiche pensate per transazioni completamente anonime. Le blockchain incentrate sulla privacy, come Zcash e Monero, proteggono i dettagli delle transazioni, inclusi gli indirizzi del mittente/destinatario, il tipo di risorsa, la quantità e la sequenza temporale della transazione.

Integrando la tecnologia a conoscenza zero nel protocollo, le reti [blockchain](/glossary/#blockchain) incentrate sulla privacy consentono ai [nodi](/glossary/#node) di convalidare le transazioni senza la necessità di accedere ai dati delle transazioni.

**Le prove a conoscenza zero sono applicate anche all'anonimizzazione delle transazioni sulle blockchain pubbliche**. Un esempio è Tornado Cash, un servizio decentralizzato e non custodito che consente agli utenti di effettuare transazioni private su Ethereum. Tornado Cash utilizza dimostrazioni a conoscenza zero per offuscare i dettagli delle transazioni e garantire la privacy finanziaria. Purtroppo, visto che questi sono strumenti di privacy "opt-in" sono associati ad attività illecite. Per superare questo problema, la privacy deve diventare l'impostazione predefinita sulle blockchain pubbliche.

### Protezione dell'identità {#identity-protection}

Gli attuali sistemi di gestione dell'identità mettono a rischio i dati personali. Le prove a conoscenza zero possono aiutare gli individui a convalidare l'identità proteggendo le informazioni sensibili.

Le dimostrazioni a conoscenza zero sono particolarmente utili nel contesto di [identità decentralizzata](/decentralized-identity/). L'identità decentralizzata (descritta anche come «identità auto-sovrana») conferisce all'individuo la possibilità di controllare l'accesso agli identificatori personali. Dimostrare la propria cittadinanza senza rivelare il proprio ID fiscale o i dettagli del passaporto è un buon esempio di come la tecnologia a conoscenza zero consente l'identità decentralizzata.

### Autenticazione {#authentication}

L'utilizzo di servizi online richiede la prova della tua identità e del diritto di accedere a tali piattaforme. Questo richiede spesso di fornire informazioni personali, come nomi, indirizzi e-mail, date di nascita, e così via. Potrebbe anche essere necessario memorizzare password lunghe o rischiare di perdere l'accesso.

Le dimostrazioni a conoscenza zero possono, tuttavia, semplificare l'autenticazione sia per le piattaforme che per gli utenti. Una volta che una dimostrazione a conoscenza zero è stata generata utilizzando input pubblici (es., dati che attestano l'appartenenza dell'utente alla piattaforma) e input privati (es., i dati dell'utente), l'utente può semplicemente presentarlo per autenticare la propria identità quando hanno bisogno di accedere al servizio. Questo migliora l'esperienza per gli utenti e libera le organizzazioni dalla necessità di memorizzare enormi quantità di informazioni per gli utenti.

### Calcolo verificabile {#verifiable-computation}

Il calcolo verificabile è un'altra applicazione della tecnologia a conoscenza zero per migliorare i progetti blockchain. Il calcolo verificabile ci permette di esternalizzare il calcolo ad un'altra entità mantenendo i risultati verificabili. L'entità presenta il risultato insieme a un'attestazione che verifica che il programma è stato eseguito correttamente.

Il calcolo verificabile è **fondamentale per migliorare le velocità d'elaborazione sulle blockchain** senza ridurne la sicurezza. Comprendere questo aspetto richiede di conoscere le differenze nelle soluzioni proposte per la scalabilità di Ethereum.

[Soluzioni scalabili on-chain](/developers/docs/scaling/#on-chain-scaling), come la frammentazione, richiedono ampie modifiche del livello base della blockchain. Tuttavia, questo approccio è molto complesso e gli errori nell'attuazione possono compromettere il modello di sicurezza di Ethereum.

[Le soluzioni di scaling off-chain](/developers/docs/scaling/#off-chain-scaling) non richiedono una nuova progettazione del protocollo Ethereum di base. Invece si basano su un modello di calcolo esternalizzato per migliorare la produttività sul livello base di Ethereum.

Ecco come funziona nella pratica:

- Invece di elaborare ogni transazione, Ethereum scarica l'esecuzione in una catena separata.

- Dopo aver elaborato le transazioni, l'altra catena restituisce i risultati da applicare allo stato di Ethereum.

Il vantaggio è che Ethereum non deve fare alcuna esecuzione e deve solo applicare i risultati dal calcolo esternalizzato al suo stato. Ciò riduce la congestione della rete e migliora anche la velocità delle transazioni (i protocolli off-chain vengono ottimizzati per un'esecuzione più rapida).

La catena ha bisogno di un modo per convalidare le transazioni off-chain senza eseguirle nuovamente, altrimenti il valore dell'esecuzione off-chain viene perso.

È qui che entra in gioco il calcolo verificabile. Quando un nodo esegue una transazione al di fuori di Ethereum, invia una prova a conoscenza zero per dimostrare la correttezza dell'esecuzione off-chain. Questa prova (chiamata [prova di validità](/glossary/#validity-proof)) garantisce che una transazione è valida, consentendo a Ethereum di applicare il risultato al suo stato, senza attendere che qualcuno contesti.

I [rollup a conoscenza zero](/developers/docs/scaling/zk-rollups) e [validium](/developers/docs/scaling/validium/) sono due soluzioni di scaling off-chain che utilizzano prove di validità per fornire una scalabilità sicura. Questi protocolli eseguono centinaia di transazioni off-chain e inviano la prova di verifica su Ethereum. Questi risultati possono essere applicati immediatamente dopo che la prova è stata verificata, permettendo ad Ethereum di elaborare più transazioni senza incrementare i calcoli sul livello di base.

### Ridurre la corruzione e la collusione nelle votazioni on-chain {#secure-blockchain-voting}

Gli schemi di voto della blockchain hanno molte caratteristiche favorevoli: sono interamente controllabili, sicuri contro gli attacchi, resistenti alla censura e liberi da vincoli geografici. Ma persino gli schemi di voto on-chain non sono immuni al problema della **collusione**.

Definita come "azioni di coordinamento per limitare la competizione aperta ingannando, truffando e fuorviando gli altri", la collusione potrebbe assumere la forma di un utente malevolo che influenza il voto offrendo tangenti. Ad esempio, Alice potrebbe ricevere una tangente da Bob per votare per l'`opzione B` a scrutinio, anche se preferisce l'`opzione A`.

Corruzione e collusione limitano l'efficiacia di qualsiasi processo che utilizzi il voto come meccanismo di indicazione (specialmente nei casi in cui gli utenti possono provare come hanno votato). Ciò può avere conseguenze significative, specialmente quando i voti determinano l'allocazione di risorse scarse.

Ad esempio, i [meccanismi di finanziamento quadratico](https://www.radicalxchange.org/concepts/plural-funding/) si affidano alle donazioni per misurare la preferenza per certe opzioni, tra svariati progetti di interesse pubblico. Ogni donazione conta come un "voto" per un progetto specifico, e i progetti che ricevono il maggior numero di voti ottengono maggiori finanziamenti dal gruppo corrispondente.

Utilizzare il voto on-chain espone il finanziamento quadratico alla collusione: le transazioni della blockchain sono pubbliche, quindi i corruttori possono ispezionare l'attività on-chain di un corrotto, per vedere come questi ha "votato". Così, i finanziamenti quadratici cessano di essere un mezzo efficiente per allocare fondi a seconda delle preferenze aggregate della community.

Per fortuna, le nuove soluzioni, come la MACI (Infrastruttura Anti-Collusione Minima), utilizzano le prove a conoscenza zero per rendere il voto on-chain (es. i meccanismi di finanziamento quadratico) resistenti a corruzione e collusione. La MACI è una serie di contratti intelligenti e script che consentono a un amministratore centrale (detto "coordinatore") di aggregare voti e risultati _senza_ rivelare nulla sulle indicazioni di voto del singolo. Ciononostante, è ancora possibile verificare che i voti siano stati contati correttamente o confermare che un particolare individuo abbia partecipato al turno di votazioni.

#### Come funziona MACI con prove a conoscenza zero? {#how-maci-works-with-zk-proofs}

All'inizio, il coordinatore distribuisce il contratto della MACI su Ethereum, dopodiché gli utenti possono iscriversi al voto (registrando la propria chiave pubblica nel contratto intelligente). Gli utenti trasmettono i voti inviando messaggi crittografati con la propria chiave pubblica al contratto intelligente (un voto valido dev'essere firmato con la chiave pubblica più recente associata all'identità dell'utente, tra gli altri criteri). Dopodiché, il coordinatore elabora tutti i messaggi al termine del periodo di voto, conteggia i voti e verifica i risultati on-chain.

Nella MACI, le prove a conoscenza zero sono utilizzate per assicurare la correttezza del calcolo, rendendo impossibile per il coordinatore elaborare erroneamente i voti e i risultati dei conteggi. Ciò si ottiene chiedendo al coordinatore di generare le prove ZK-SNARK, verificando che a) tutti i messaggi siano stati elaborati correttamente, b) il risultato finale corrisponda alla somma di tutti i voti _validi_.

Dunque, anche senza condividere una ripartizione dei voti per utente (come avviene in genere), la MACI garantisce l'integrità dei risultati calcolati durante la procedura di conteggio. Questa funzionalità è utile nel ridurre l'efficacia degli schemi basilari di collusione. Possiamo esplorare questa possibilità utilizzando l'esempio precedente di Bob che corrompe Alice per votare per un'opzione:

- Alice si registra per votare inviando la propria chiave pubblica a uno smart contract.
- Alice accetta di votare per l'`opzione B` in cambio di una tangente da Bob.
- Alice vota per l'`opzione B`.
- Alice invia segretamente una transazione cifrata per cambiare la chiave pubblica associata alla sua identità.
- Alice invia un altro messaggio (crittografato) allo smart contract votando per l'`opzione A ` utilizzando la nuova chiave pubblica.
- Alice mostra a Bob una transazione che mostra che ha votato per l'`opzione B` (che non è valida poiché la chiave pubblica non è più associata all'identità di Alice nel sistema)
- Elaborando i messaggi, il coordinatore salta il voto di Alice per `option B` e conteggia soltanto il voto per `option A`. Dunque, il tentativo di collusione di Bob con Alice e di manipolazione del voto on-chain fallisce.

L'utilizzo di MACI _richiede_ la fiducia nel fatto che il coordinatore sia colluso con i corruttori, né tenti di corrompere gli stessi elettori. Il coordinatore può decifrare i messaggi degli utenti (operazione necessaria per creare la prova), così che possa verificare accuratamente il voto di ogni persona.

Ma nei casi in cui il coordinatore rimane onesto, la MACI rappresenta un potente strumento a garanzia della legittimità del voto on-chain. Ciò spiega la sua popolarità tra le applicazioni di finanziamento quadratico (es., [clr.fund](https://clr.fund/#/about/maci)) che fanno molto affidamento sull'integrità delle scelte di voto di ogni individuo.

[Maggiori informazioni su MACI](https://privacy-scaling-explorations.github.io/maci/).

## Come funzionano le prove a conoscenza zero? {#how-do-zero-knowledge-proofs-work}

Una prova a conoscenza zero permette di dimostrare la verità di una dichiarazione senza condividere i contenuti dell’affermazione o rivelare come l'hai scoperta. A tal fine, i protocolli a conoscenza zero si basano su algoritmi che prendono alcuni dati in entrata e restituiscono ‘true’ o ‘false’ come risultato.

Un protocollo a conoscenza zero deve soddisfare i seguenti criteri:

1. **Completezza**: se l'immissione è valida, il protocollo a conoscenza zero restituisce sempre 'true'. Quindi, se la dichiarazione sottostante è vera, se il dimostratore e il validatore agiscono onestamente, la prova può essere accettata.

2. **Solidità**: se l'immissione non è valida, è teoricamente impossibile ingannare il protocollo a conoscenza zero per restituire 'true'. Quindi, un dimostratore bugiardo non può ingannare un validatore onesto a credere che una dichiarazione non valida sia valida (se non con un piccolo margine di probabilità).

3. **Conoscenza zero**: il validatore non impara nulla su una dichiarazione se non la sua validità o falsità (hanno “conoscenza zero” della dichiarazione). Questo requisito impedisce anche al validatore di ricavare l'immissione iniziale (il contenuto della dichiarazione) dal protocollo.

Nella forma semplice, una prova a conoscenza zero è composta da tre elementi: **testimonianza**, **sfida** e **risposta**.

- **Testimonianza**: Con una prova a conoscenza zero, il dimostratore vuole manifestare la conoscenza di alcune informazioni nascoste. L'informazione segreta è il "testimone" della prova, e la presunta conoscenza del testimone da parte del dimostratore stabilisce una serie di domande a cui può rispondere solo una parte a conoscenza dell'informazione. Pertanto, il dimostratore avvia il processo di prova scegliendo casualmente una domanda, calcolando la risposta e inviandola al verificatore.

- **Sfida**: il validatore sceglie casualmente un'altra domanda dal set e chiede al dimostratore di rispondere.

- **Risposta**: Ii dimostratore accetta la domanda, calcola la risposta e la restituisce al validatore. La risposta del dimostratore consente al validatore di verificare se il primo ha realmente accesso al testimone. Per garantire che il dimostratore non indovini alla cieca e ottenga le risposte corrette per caso, il validatore sceglie più domande da porre. Ripetendo questa interazione molte volte, la possibilità che il dimostratore falsifichi la conoscenza del testimone diminuisce in modo significativo fino a quando il validatore non è soddisfatto.

Quanto sopra descrive la struttura di una “prova interattiva a conoscenze zero”. I primi protocolli a conoscenza zero utilizzavano la dimostrazione interattiva, in cui la verifica della validità di una dichiarazione richiedeva una comunicazione avanti e indietro tra dimostratori e validatori.

Un buon esempio che illustra come funzionano le prove interattive è la famosa storia di Jean-Jacques Quisquater sulla[ grotta di Ali Baba](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave). Nella storia, Peggy (il dimostratore) vuole dimostrare a Victor (il validatore) che conosce la frase segreta per aprire una porta magica senza rivelare la frase.

### Prove a conoscenze zero non interattive {#non-interactive-zero-knowledge-proofs}

Sebbene rivoluzionario, la prova interattiva aveva un'utilità limitata poiché richiedeva che le due parti fossero disponibili e interagissero ripetutamente. Anche se un validatore fosse convinto dell’onestà di un dimostratore, la prova non sarebbe disponibile per una verifica indipendente (il calcolo di una nuova prova richiede una nuova serie di messaggi tra il dimostratore e il validatore).

Per risolvere questo problema, Manuel Blum, Paul Feldman, e Silvio Micali hanno suggerito le prime prove [a conoscenza zero non interattive](https://dl.acm.org/doi/10.1145/62212.62222) in cui il dimostratore e il validatore hanno una chiave condivisa. Ciò permette al dimostratore di manifestare la propria conoscenza di alcune informazioni (ad esempio, testimone) senza fornire le informazioni stesse.

A differenza delle prove interattive, le prove non interattive richiedevano solo una serie di comunicazioni tra i partecipanti (dimostratore e validatore). Il dimostratore passa le informazioni segrete a un apposito algoritmo per calcolare una prova a conoscenza zero. Questa prova viene inviata al validatore, che controlla che il dimostratore conosca le informazioni segrete utilizzando un altro algoritmo.

La prova non interattiva riduce la comunicazione tra dimostratore e validatore, rendendo le prove ZK più efficienti. Inoltre, una volta generata una prova, è disponibile per chiunque altro (con accesso alla chiave condivisa e all'algoritmo di verifica) per la verifica.

Le prove non interattive hanno rappresentato una svolta per la tecnologia a conoscenza zero e hanno stimolato lo sviluppo dei sistemi di dimostrazione utilizzati oggi. Discutiamo questi tipi di prova di seguito:

### Tipologie di prove a conoscenza zero {#types-of-zero-knowledge-proofs}

#### ZK-SNARK {#zk-snarks}

ZK-SNARK è un acronimo per **Zero-Knowledge Succinct Non-Interactive Argoment of Knowledge**. Il protocollo ZK-SNARK ha le seguenti qualità:

- **Conoscenza zero**: un validatore può convalidare l'integrità di una dichiarazione senza sapere nient'altro sull'affermazione. L'unica conoscenza che il validatore ha della dichiarazione è se è vera o falsa.

- **Concisione**: la prova a conoscenza zero è più piccola del testimone e può essere verificata rapidamente.

- **Non interattiva**: la prova è 'non interattiva' perché il dimostratore e il validatore interagiscono solo una volta, a differenza delle prove interattive che richiedono più cicli di comunicazione.

- **Argomento**: la prova soddisfa il requisito di 'solidità', quindi l'imbroglio è estremamente improbabile.

- **(Di) Conoscenza**: la prova a conoscenza zero non può essere costruita senza l'accesso a informazioni segrete (testimone). È difficile, se non impossibile, per un dimostratore che non ha il testimone calcolare una valida prova a conoscenza zero.

La «chiave condivisa» menzionata in precedenza si riferisce a parametri pubblici che il dimostratore e il validatore accettano di utilizzare per generare e verificare le prove. Generare i parametri pubblici (collettivamente noti come la Stringa di Riferimento Comune (CRS)) è un'operazione sensibile data la sua importanza nella sicurezza del protocollo. Se l'entropia (casualità) utilizzata per generare il CRS entra nelle mani di un dimostratore disonesto, possono calcolare delle prove false.

[Calcolo multipartitico (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) è un modo per ridurre i rischi nella generazione di parametri pubblici. Più parti partecipano a una [ cerimonia di configurazione basata sulla fiducia](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), dove ogni persona contribuisce con alcuni valori casuali per generare il CRS. Finché una parte onesta distrugge la propria porzione di entropia, il protocollo ZK-SNARK mantiene la solidità computazionale.

Le configurazioni sulla fiducia richiedono agli utenti di fidarsi dei partecipanti alla generazione dei parametri. Tuttavia, lo sviluppo di ZK-STARK ha creato le condizioni affinché i protocolli di prova funzionino con una configurazione non affidabile.

#### ZK-STARK {#zk-starks}

ZK-SNARK è un acronimo per **Zero-Knowledge Succinct Non-Interactive Argoment of Knowledge**. I ZK-STARK sono simili ai ZK-SNARK, tranne per il fatto che sono:

- **Scalabili**: ZK-STARK è più veloce di ZK-SNARK nel generare e verificare prove quando la dimensione del testimone è più grande. Con le prove STARK, i tempi di dimostrazione e verifica aumentano solo leggermente man mano che il testimone cresce (i tempi di dimostrazione e validazione SNARK aumentano linearmente con la dimensione del testimone).

- **Trasparente**: ZK-STARK si basa sulla casualità verificabile pubblicamente per generare parametri pubblici per la prova e la verifica invece di una configurazione sulla fiducia. Pertanto, sono più trasparenti rispetto agli ZK-SNARK.

Gli ZK-STARK producono prove più grandi rispetto agli ZK-SNARK, il che significa che generalmente hanno spese generali di verifica più elevate. Tuttavia, esistono casi (come la dimostrazione di grandi set di dati) in cui ZK-STARK può essere più conveniente rispetto a ZK-SNARK.

## Svantaggi dell'utilizzo delle prove a conoscenza zero {#drawbacks-of-using-zero-knowledge-proofs}

### Costi hardware {#hardware-costs}

Generare prove a conoscenza zero comporta calcoli molto complessi, eseguiti meglio su macchine specializzate. Poiché tali macchine sono costose, sono spesso fuori dalla portata delle persone "normali". Inoltre, le applicazioni che desiderano utilizzare la tecnologia a conoscenza zero devono tenere conto dei costi dell'hardware, che potrebbero incrementare i costi per gli utenti finali.

### Costi di verifica delle prove {#proof-verification-costs}

Anche la verifica delle prove richiede calcoli complessi e incrementa i costi di implementazione della tecnologia a conoscenza zero nelle applicazioni. Questo costo è particolarmente importante nel contesto della prova del calcolo. Ad esempio, i rollup ZK pagano approssimativamente 500.000 gas per verificare una singola prova ZK-SNARK su Ethereum, mentre le ZK-STARK richiedono commissioni persino maggiori.

### Ipotesi di fiducia {#trust-assumptions}

Nelle ZN-SNARK, la Stringa di Riferimento Comune (parametri pubblici) è generata una volta ed è disponibile per il riutilizzo alle parti che desiderano partecipare al protocollo a conoscenza zero. I parametri pubblici sono creati tramite una cerimonia di configurazione attendibile, in cui partecipanti sono considerati onesti.

Ma non esiste davvero un modo tramite cui gli utenti possano valutare l'onestà dei partecipanti e gli utenti devono prendere in parola gli sviluppatori. Le ZK-STARK sono libere da ipotesi di fiducia, poiché la casualità utilizzata nel generare la stringa è verificabile pubblicamente. Nel mentre, i ricercatori stanno lavorando a configurazioni non basate sulla fiducia per le ZK-SNARK per aumentare la sicurezza dei meccanismi di prova.

### Minacce del calcolo quantistico {#quantum-computing-threats}

ZK-SNARK utilizza la crittografia a curva ellittica. Sebbene oggi si presupponga che il problema del logaritmo discreto della curva ellittica sia irrisolvibile, in futuro lo sviluppo dei computer quantistici potrebbero infrangere questo modello di sicurezza.

ZK-STARK è considerato immune alla minaccia dell'informatica quantistica, poiché si affida esclusivamente a funzioni di hash resistenti alla collisione per la propria sicurezza. A differenza delle coppie di chiavi pubbliche-private utilizzate nella crittografia a curva ellittica, gli hash resistenti alla collisione sono più difficili da rompere per gli algoritmi dei computer quantistici.

## Letture consigliate {#further-reading}

- [Panoramica dei casi d'uso per le prove a conoscenza zero](https://pse.dev/projects): _Privacy and Scaling Explorations Team_
- [SNARK vs. STARK vs. SNARK Ricorsivi](https://www.alchemy.com/overviews/snarks-vs-starks) _Alchemy Overviews_
- [Una prova a conoscenza zero: migliorare la privacy su una Blockchain](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/): _Dmitry Lavrenov_
- [zk-SNARK: un esempio e approfondimento realistico sulla conoscenza zero realistica](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARK: creare fiducia verificabile, persino contro i computer quantistici](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [Un'introduzione approssimativa a come siano possibili gli zk-SNARK](https://vitalik.eth.limo/general/2021/01/26/snarks.html) - _Vitalik Buterin_
- [Perché le prove a conoscenza zero (ZKP) sono la svolta per l'Identità auto-sovrana](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) - _Franklin Ohaegbulam_

