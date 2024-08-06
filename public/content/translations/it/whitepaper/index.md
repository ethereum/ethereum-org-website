---
title: Whitepaper Ethereum
description: Documento introduttivo a Ethereum, pubblicato nel 2013 prima del lancio.
lang: it
sidebarDepth: 2
hideEditButton: true
---

# Whitepaper Ethereum {#ethereum-whitepaper}

_Questo documento introduttivo è stato originariamente pubblicato nel 2014 da Vitalik Buterin, fondatore di [Ethereum](/what-is-ethereum/), prima del lancio del progetto nel 2015. Vale la pena di ricordare che Ethereum, come molti progetti software open-source basati su una comunità, si è evoluto dai primi tempi._

_Pur essendo stato redatto qualche anno fa, questo documento rimane comunque un utile riferimento e una rappresentazione accurata di Ethereum e della sua visione. Per conoscere gli ultimi sviluppi di Ethereum e come vengono apportate modifiche al protocollo, consigliamo di consultare [questa guida](/learn/)._

[Ricercatori e accademici alla ricerca di una versione storica o canonica del whitepaper [del dicembre 2014] dovrebbero avvalersi di questo PDF.](./whitepaper-pdf/Ethereum_Whitepaper_-_Buterin_2014.pdf)

## Un Contratto Intelligente di Prossima Generazione e una Piattaforma dell'Applicazione Decentralizzata {#a-next-generation-smart-contract-and-decentralized-application-platform}

Lo sviluppo di Bitcoin da parte di Satoshi Nakamoto nel 2009 è stato spesso considerato come uno sviluppo radicale in denaro e valuta, essendo il primo esempio di risorsa digitale che allo stesso tempo non ha alcun supporto o [valore intrinseco](http://bitcoinmagazine.com/8640/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it/) e nessun emittente o controllore centralizzato. Tuttavia, un'altra parte, probabilmente più importante, dell'esperimento Bitcoin è la tecnologia blockchain sottostante come strumento di consenso distribuito e l'attenzione sta rapidamente iniziando a spostarsi su quest'altro aspetto di Bitcoin. Le applicazioni alternative comunemente citate della tecnologia della blockchain, includono l'utilizzo delle risorse digitali sulla blockchain per rappresentare valute personalizzate e strumenti finanziari ("[monete colorate](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)"), il proprietario di un dispositivo fisico sottostante ("[proprietà intelligente](https://en.bitcoin.it/wiki/Smart_Property)"), risorse non fungibili come i nomi del dominio ("[Namecoin](http://namecoin.org)"), nonché applicazioni più complesse che precludano il possesso di risorse digitali, direttamente controllate da un pezzo di codice che implementi regole arbitrarie ("[contratti intelligenti](http://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/idea.html)") o persino "[organizzazioni autonome decentralizzate](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)" (DAO) basate sulla blockchain. Ciò che Ethereum intende fornire è una blockchain con un linguaggio di programmazione completo di Turing integrato, che può essere utilizzato per creare "contratti" da utilizzare per codificare funzioni di transizioni di stato arbitrarie, consentendo agli utenti di creare uno qualsiasi dei sistemi descritti sopra, nonché molti altri che non abbiamo ancora immaginato, semplicemente scrivendo la logica in poche righe di codice.

## Introduzione a Bitcoin e concetti esistenti {#introduction-to-bitcoin-and-existing-concepts}

### Storia {#history}

Il concetto di valuta digitale decentralizzata, così come di applicazioni alternative come i registri di proprietà, esiste da decenni. I protocolli anonimi di moneta elettronica degli anni '80 e '90, per lo più basati su una crittografia primitiva nota come Chaumian blinding, fornivano una valuta con un alto grado di privacy, ma i protocolli non riuscivano in gran parte a guadagnare popolarità a causa della loro dipendenza da un intermediario centralizzato. Nel 1998, il sistema [b-money](http://www.weidai.com/bmoney.txt) proposto da Wei Dai è stato il primo a introdurre l'idea di creare denaro attraverso la risoluzione di enigmi computazionali ed il consenso decentralizzato, ma la sua proposta era povera di dettagli su come il consenso decentralizzato potesse essere effettivamente implementato. Nel 2005, Hal Finney ha introdotto il concetto di "[proof-of-work riutilizzabili](https://nakamotoinstitute.org/finney/rpow/)", un sistema che utilizza le idee di b-money insieme agli enigmi Hashcash di Adam Back, difficili dal punto di vista computazionale, per creare un concetto di criptovaluta, ma ancora una volta non è stato all'altezza dell'ideale affidandosi al trusted computing come back-end. Nel 2009 Satoshi Nakamoto ha realizzato per la prima volta una moneta decentralizzata, combinando primitive consolidate per la gestione della proprietà attraverso la crittografia a chiave pubblica con un algoritmo di consenso per tenere traccia di chi possiede le monete, noto come "proof-of-work".

Il meccanismo alla base del proof-of-work ha rappresentato una svolta nel settore perché ha risolto contemporaneamente due problemi. In primo luogo, ha fornito un algoritmo di consenso semplice e moderatamente efficace, consentendo ai nodi della rete di concordare collettivamente una serie di aggiornamenti canonici allo stato del libro mastro Bitcoin. In secondo luogo, ha fornito un meccanismo per consentire il libero ingresso nel processo di consenso, risolvendo il problema politico di decidere chi può influenzare il consenso, e allo stesso tempo prevenendo gli attacchi Sybil. Ciò avviene sostituendo una barriera formale alla partecipazione, come il requisito di essere registrati come entità unica in una particolare lista, con una barriera economica: il peso di un singolo nodo nel processo di votazione del consenso è direttamente proporzionale alla potenza di calcolo che il nodo rappresenta. Da allora, è stato proposto un approccio alternativo chiamato _proof-of-stake_, che calcola il peso di un nodo come proporzionale alle sue disponibilità di valuta e non alle risorse computazionali; la discussione dei meriti relativi dei due approcci esula dallo scopo di questo documento, ma va notato che entrambi gli approcci possono fungere da colonna portante di una criptovaluta.

### Bitcoin come sistema di transizione tra stati {#bitcoin-as-a-state-transition-system}

![Transizione tra stati di Ethereum](./ethereum-state-transition.png)

Da un punto di vista tecnico, il libro mastro di una criptovaluta come Bitcoin può esser pensato come un sistema di transizione tra stati, dove esiste uno "stato" di proprietà di tutti i Bitcoin esistenti e una "funzione di transizione tra stati" che, da uno stato e una transazione, produce un nuovo stato, che è il risultato. In un sistema bancario standard, ad esempio, lo stato è un bilancio, una transazione è una richiesta di spostare $X da A a B e la funzione di transizione di stato riduce il valore nel conto di A di $X e aumenta il valore nel conto di B di $X. Se il conto di A ha meno di $X, la funzione di transizione di stato restituisce un errore. Pertanto, si può formalmente definire come:

```
APPLY(S,TX) -> S' or ERROR
```

Nel sistema bancario sopra definito:

```js
APPLY({ Alice: $50, Bob: $50 },"send $20 from Alice to Bob") = { Alice: $30, Bob: $70 }
```

Ma:

```js
APPLY({ Alice: $50, Bob: $50 },"send $70 from Alice to Bob") = ERROR
```

Lo "stato" in Bitcoin è la raccolta di tutte le monete (tecnicamente, "output di transazione non speso" o UTXO) di cui è stato eseguito il minting e che non sono ancora state spese, dove ogni UTXO ha un taglio e un proprietario (definito da un indirizzo a 20 byte che è essenzialmente una chiave pubblica crittografica<sup>[fn1](#notes)</sup>). Una transazione contiene uno o più input contenenti ciascuno un riferimento a un UTXO esistente e a una firma crittografica, prodotta dalla chiave privata associata all'indirizzo del proprietario, e ad uno o più input contenenti ciascuno un nuovo UTXO da aggiungere allo stato.

La funzione di transizione di stato `APPLY(S,TX) -> S'` è approssimativamente definibile come segue:

<ol>
  <li>
    Per ogni input in <code>TX</code>:
    <ul>
    <li>
        Se l'UTXO a cui si fa riferimento non è in <code>S</code>, viene restituito un errore.
    </li>
    <li>
        Se la firma fornita non corrisponde al proprietario dell'UXTO, viene restituito un errore.
    </li>
    </ul>
  </li>
  <li>
    Se la somma dei tagli di tutti gli UTXO in ingresso è inferiore alla somma dei tagli di tutti gli UTXO in uscita, viene restituito un errore.
  </li>
  <li>
    Restituisce <code>S</code> con tutti gli UTXO di ingresso rimossi e tutti gli UTXO di uscita aggiunti.
  </li>
</ol>

La prima metà del primo passaggio impedisce ai mittenti delle transazioni di spendere monete che non esistono, la seconda metà del primo passaggio impedisce ai mittenti delle transazioni di spendere monete altrui e il secondo passaggio implementa la conservazione del valore. Per utilizzare queste regole per il pagamento, il protocollo è il seguente. Supponiamo che Alice voglia inviare 11,7 BTC a Bob. In primo luogo, Alice cercherà una serie di UTXO disponibili che possiede, che ammontino almeno a un totale di 11,7 BTC. Realisticamente, Alice non sarà in grado di ottenere esattamente 11,7 BTC; supponiamo che il minimo che riesce a ottenere sia 6+4+2=12. Quindi crea una transazione con questi tre input e due output. Il primo output sarà 11,7 BTC con l'indirizzo di Bob come proprietario e il secondo output saranno i restanti 0,3 BTC di "resto", aventi come proprietario la stessa Alice.

### Mining {#mining}

![Blocchi di Ethereum](./ethereum-blocks.png)

Se avessimo accesso a un servizio centralizzato affidabile, il sistema sarebbe facile da implementare; si potrebbe semplicemente programmare come descritto, usando il disco rigido di un server centralizzato per tenere traccia dello stato. Invece con Bitcoin stiamo cercando di costruire un sistema di valuta decentralizzato, quindi dovremo combinare il sistema di transizione tra stati con un sistema di consenso, per garantire che tutti concordino sull'ordine delle transazioni. Il processo di consenso decentralizzato di Bitcoin richiede che i nodi nella rete tentino continuamente di produrre pacchetti di transazioni chiamati "blocchi". La rete è destinata a produrre circa un blocco ogni dieci minuti e ogni blocco contiene un indicatore data/ora, un nonce, un riferimento (hash) al blocco precedente e un elenco di tutte le transazioni che sono state effettuate dopo il blocco precedente. Nel tempo, questa situazione crea una "blockchain" persistente, in continua crescita, che si aggiorna costantemente per rappresentare l'ultimo stato del libro mastro di Bitcoin.

L'algoritmo per controllare se un blocco è valido, espresso in questo paradigma, è il seguente:

1. Verifica se il blocco precedente a cui fa riferimento il blocco corrente esiste ed è valido.
2. Verifica che l'indicatore data/ora (timestamp) del blocco sia maggiore di quella del precedente<sup>[fn2](#notes)</sup> e meno di 2 ore nel futuro.
3. Verifica che il proof-of-work del blocco sia valido.
4. Supponiamo che `S[0]` sia lo stato alla fine del blocco precedente.
5. Supponiamo che `TX` sia la lista delle transazioni del blocco con `n` transazioni. Per ogni `i` in `0...n-1`, impostare `S[i+1] = APPLY(S[i],TX[i])`. Se una qualsiasi applicazione restituisce un errore, si chiude e restituisce il valore "false".
6. Quando restituisce il valore "true", registrare `S[n]` come stato alla fine del blocco.

In sostanza, ogni transazione nel blocco deve fornire una transizione di stato valida da quello che era lo stato canonico prima che la transazione al nuovo stato fosse eseguita. Si noti che lo stato non è codificato in alcun modo nel blocco; è puramente un'astrazione che il nodo che esegue la convalida deve ricordare e può essere calcolato in sicurezza per ogni blocco solo partendo dallo stato genesi e applicando sequenzialmente ogni transazione in ogni blocco. Si noti inoltre che l'ordine in cui il miner include le transazioni nel blocco è importante; se ci sono due transazioni A e B in un blocco, in modo tale che B spenda un UTXO creato da A, il blocco sarà valido solo se A viene prima di B e non viceversa.

L'unica condizione di validità presente nell'elenco qui sopra che non si trova in altri sistemi è il requisito "proof-of-work". La condizione esatta è che l'hash double-SHA256 di ogni blocco, trattato come un numero a 256 bit, debba essere inferiore a un target regolato dinamicamente, che al momento della scrittura di questo documento è di circa 2<sup>187</sup>. Lo scopo è rendere la creazione di blocchi "difficile" dal punto di vista computazionale, impedendo così ad attacchi Sybil di ricreare l'intera blockchain a loro favore. Dato che SHA256 è progettato per essere una funzione pseudocasuale completamente imprevedibile, l'unico modo per creare un blocco valido è semplicemente tramite il metodo "prova e sbaglia", incrementando ripetutamente il nonce e controllando se il nuovo hash coincide.

All'attuale target di \~2<sup>187</sup>, la rete deve fare una media di \~2<sup>69</sup> tentativi prima di trovare un blocco valido; in generale, il target viene ricalibrato dalla rete ogni 2016 blocchi, in modo che, in media, un nuovo blocco venga prodotto da un nodo nella rete ogni dieci minuti. Al fine di ricompensare i miner per questo lavoro computazionale, il miner di ogni blocco ha il diritto di includere una transazione assegnandosi 12,5 BTC creati dal nulla. Inoltre, se una o più transazioni hanno un taglio totale superiore nei propri input rispetto agli output, anche la differenza va al miner come "commissione sulle transazioni". Per inciso, questo è anche l'unico meccanismo con cui vengono emessi nuovi BTC; lo stato genesi non conteneva alcuna moneta.

Al fine di comprendere meglio lo scopo del mining, vediamo cosa succede in caso di attacco da parte di un malintenzionato. Poiché la crittografia sottostante di Bitcoin è nota per essere sicura, l'attaccante rivolgerà la sua attenzione all'unica parte del sistema Bitcoin che non è protetta direttamente dalla crittografia: l'ordine delle transazioni. La strategia dell'attaccante è semplice:

1. Invia 100 BTC ad un commerciante in cambio di un prodotto (preferibilmente un prodotto digitale a consegna rapida)
2. Attende la consegna del prodotto
3. Esegue un'altra transazione inviando gli stessi 100 BTC a se stesso
4. Cerca di convincere la rete che la transazione che ha inviato a se stesso è quella che è arrivata prima.

Qualche minuto dopo aver eseguito il passaggio 1), qualche miner includerà la transazione in un blocco, ad esempio il blocco numero 270000. Dopo circa un'ora, altri cinque blocchi saranno stati aggiunti alla catena dopo quel blocco, e ciascuno di questi blocchi punterà indirettamente alla transazione, pertanto confermandola. A questo punto, il commerciante accetterà il pagamento come finalizzato e consegnerà il prodotto; dal momento che supponiamo che si tratti di un bene digitale, la consegna è immediata. Ora, l'attaccante crea un'altra transazione, inviando i 100 BTC a se stesso. Se l'attaccante inviasse questa transazione semplicemente a caso, la transazione non verrebbe elaborata; i miner cercherebbero di eseguire `APPLY(S, X)` e noterebbero che `TX` consuma un UTXO che non è più nello stato. Invece l'attaccante crea una "diramazione" della blockchain, iniziando a eseguire il mining di un'altra versione del blocco 270000 e puntando al blocco 269999 in quanto principale, ma con la nuova transazione al posto di quella vecchia. Poiché i dati del blocco sono diversi, la situazione richiede una ripetizione del proof-of-work. Inoltre, la nuova versione del blocco 270000 dell'attaccante ha un hash diverso, quindi i blocchi originali da 270001 a 270005 non "puntano" ad esso; così la catena originale e la nuova catena dell'attaccante sono completamente separate. La regola è che, in caso di diramazione, la blockchain più lunga è considerata quella vera, così i miner legittimi lavoreranno sulla catena 270005 mentre solo l'attaccante lavorerà sulla catena 270000. Per far diventare la propria blockchain la più lunga, l'attaccante ha bisogno di disporre di più potenza computazionale rispetto al resto della rete combinata, per recuperare il ritardo (da qui l'espressione "attacco del 51%").

### Alberi di Merkle {#merkle-trees}

![SPV in Bitcoin](./spv-bitcoin.png)

_A sinistra: basta presentare solo un piccolo numero di nodi in un albero di Merkle per fornire una prova della validità di un ramo._

_A destra: ogni tentativo di cambiare una parte dell'albero di Merkle causerà incoerenze ai livelli superiori della catena._

Una caratteristica importante per la scalabilità di Bitcoin è che il blocco è memorizzato in una struttura dati multi-livello. L'"hash" di un blocco è in realtà solo l'hash dell'intestazione del blocco, un dato di circa 200 byte che contiene indicatore data/ora, nonce, hash del blocco precedente e hash radice di una struttura di dati chiamata albero di Merkle, che memorizza tutte le transazioni nel blocco. Un albero di Merkle è un tipo di albero binario, composto da un insieme di nodi con un gran numero di "nodi-foglia" nella parte bassa dell'albero contenenti i dati sottostanti, un insieme di nodi intermedi in cui ogni nodo è l'hash dei suoi due elementi secondari e infine un solo nodo radice, anch'esso formato dall'hash dei suoi due elementi secondari, che rappresenta la cima dell'albero. Lo scopo dell'albero di Merkle è di consentire che i dati in un blocco siano consegnati pezzo per pezzo: un nodo può scaricare solo l'intestazione di un blocco da una sorgente, la piccola parte dell'albero pertinente da un'altra sorgente, essendo comunque certi che tutti i dati siano corretti. Il motivo per cui questo funziona è che gli hash si propagano verso l'alto: se un utente malintenzionato tenta di inserire una transazione falsa nella parte inferiore dell'albero di Merkle, questo cambiamento causerà un cambiamento nel nodo superiore e poi un cambiamento nel nodo ancora superiore finché, alla fine, cambierà la radice dell'albero e quindi l'hash del blocco, causando la registrazione di un blocco completamente diverso da parte del protocollo (quasi certamente con un "proof-of-work" non valido).

Il protocollo dell'albero di Merkle è probabilmente essenziale per la sostenibilità a lungo termine. Un nodo completo nella rete Bitcoin è un nodo che memorizza ed elabora per intero tutti i blocchi e occupa circa 15 GB di spazio su disco nella rete Bitcoin ad aprile 2014, e cresce di oltre un gigabyte al mese. Attualmente, questo è fattibile per alcuni computer desktop e non per gli smartphone, ma in futuro solo aziende e hobbisti saranno in grado di partecipare. Un protocollo noto come "simplified payment verification" (SPV) consente l'esistenza di un'altra classe di nodi, chiamati "nodi leggeri", che scaricano le intestazioni dei blocchi, verificano il "proof-of-work" sulle intestazioni dei blocchi, quindi scaricano solo i rami associati alle transazioni che sono rilevanti per loro. Questo permette ai nodi leggeri di determinare con una forte sicurezza lo stato di qualsiasi transazione Bitcoin, e il loro saldo corrente, scaricando solo una piccolissima porzione dell'intera blockchain.

### Applicazioni blockchain alternative {#alternative-blockchain-applications}

L'idea di prendere il concetto di blockchain e applicarlo ad altri campi ha una lunga storia. Nel 2005, Nick Szabo ha presentato il concetto di "[titoli di proprietà protetti con autorità del proprietario](https://nakamotoinstitute.org/secure-property-titles/)", un documento che descrive come "i nuovi progressi nella tecnologia dei database replicati" consentiranno un sistema basato su blockchain per l'archiviazione di un registro di chi possiede quale terreno, creando un quadro elaborato che includa concetti come fattoria, possesso avverso e tassa fondiaria georgiana. Tuttavia ai tempi non esisteva purtroppo alcun efficace sistema di database replicato e quindi il protocollo non è mai stato realizzato. Dopo il 2009, però, una volta sviluppato il consenso decentralizzato di Bitcoin, un certo numero di applicazioni alternative ha rapidamente iniziato a emergere.

- **Namecoin**: creato nel 2010, [Namecoin](https://namecoin.org/) si può descrivere come un database di registrazione dei nomi decentralizzato. Nei protocolli decentralizzati come Tor, Bitcoin e BitMessage, è necessario un modo per identificare i conti, così che le altre persone possano interagirvi; ma in tutte le soluzioni esistenti, il solo tipo di identificativo disponibile è un hash pseudo-casuale come `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. Idealmente, si dovrebbe poter avere un conto con un nome come "george". Tuttavia, il problema è che se una persona può creare un conto denominato "george", allora qualcun altro può usare lo stesso processo per registrare "george" per se stesso, oltre a impersonarlo. La soluzione è un paradigma del “primo depositante”, dove la prima registrazione riesce e la seconda no, un problema perfettamente adatto al protocollo di consenso di Bitcoin. Namecoin è l'implementazione meno recente e più riuscita di un sistema di registrazione dei nomi che usa tale idea.
- **Colored coins**: lo scopo di [colored coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) è di servire come protocollo per consentire alle persone di creare le proprie valute digitali o, nell'importante caso banale di una valuta con un'unità, token digitali, sulla blockchain di Bitcoin. Nel protocollo colored coins, qualcuno "emette" una nuova valuta assegnando pubblicamente un colore a un UTXO di Bitcoin specifico e il protocollo definisce ricorsivamente il colore dell'altro UTXO affinché sia lo stesso degli input spesi dalla transazione che la sta creando (si applicano alcune regole speciali in caso di input di colore misto). Questo consente agli utenti di mantenere i portafogli contenenti solo UTXO di un colore specifico e di inviarli, proprio come i Bitcoin regolari, retrocedendo per la blockchain per determinare il colore di ogni UTXO che ricevono.
- **Metacoins**: l'idea dietro un metacoin è di avere un protocollo che risieda su Bitcoin, usando le transazioni di Bitcoin per memorizzare le transazioni di metacoin, ma avendo una funzione di transizione tra stati differente, `APPLY'`. Poiché il protocollo metacoin non può impedire la comparsa di transazioni di metacoin non valide nella blockchain di Bitcoin, si aggiunge la regola secondo cui, se `APPLY'(S,TX)` restituisce un errore, il protocollo va al valore predefinito `APPLY'(S,TX) = S`. Questo fornisce un facile meccanismo per creare un protocollo della criptovaluta arbitrario, potenzialmente con funzionalità avanzate non implementabili nello stesso Bitcoin, ma con un costo di sviluppo molto ridotto poiché le complessità di mining e di rete sono già gestite dal protocollo di Bitcoin. I metacoin sono stati usati per implementare delle classi di contratti finanziari, di registrazione dei nomi e di scambio decentralizzato.

Quindi, in generale, ci sono due approcci per creare un protocollo di consenso: creare una rete indipendente e creare un protocollo basato su Bitcoin. Il primo approccio, pur essendo ragionevolmente riuscito nel caso di applicazioni come Namecoin, è difficile da attuare; ogni implementazione individuale deve avviare una blockchain indipendente, oltre a creare e testare tutta la transizione tra stati necessaria e il codice di networking. Inoltre, prevediamo che l'insieme di applicazioni per la tecnologia decentralizzata di consenso seguirà una distribuzione della legge di potenza, in cui la stragrande maggioranza delle applicazioni sarebbe troppo piccola per garantire una propria blockchain, e notiamo che esistono grandi classi di applicazioni decentralizzate, in particolare organizzazioni autonome decentrate, che hanno bisogno di interagire tra loro.

L'approccio basato su Bitcoin, d'altra parte, ha il difetto che non eredita le funzionalità semplificate di verifica dei pagamenti di Bitcoin. SPV funziona per Bitcoin perché può utilizzare la profondità della blockchain come delega di validità; a un certo punto, quando i predecessori di una transazione sono abbastanza obsoleti, si può affermare con sicurezza che erano legittimamente parte dello stato. Meta-protocolli basati sulla blockchain, invece, non possono obbligare la blockchain a non includere le transazioni che non sono valide nel contesto dei propri protocolli. Quindi, un'implementazione completamente sicura del meta-protocollo SPV dovrebbe eseguire una scansione all'indietro fino all'inizio della blockchain Bitcoin per stabilire se alcune transazioni sono valide. Attualmente, tutte le implementazioni leggere dei meta-protocolli basati su Bitcoin fanno riferimento a un server attendibile per fornire i dati, probabilmente un risultato poco ottimale, soprattutto se uno degli scopi principali di una criptovaluta è quello di eliminare la necessità di attendibilità.

### Scripting {#scripting}

Anche senza alcuna estensione, il protocollo di Bitcoin facilità in realtà una versione debole di un concetto di "contratti intelligenti". UTXO in Bitcoin può essere posseduto non solo da una chiave pubblica, ma anche da uno script più complesso, espresso in un semplice linguaggio di programmazione basato su stack. In questo paradigma, una transazione che spende quell'UTXO deve fornire dati che soddisfano lo script. In realtà, anche il meccanismo base di proprietà della chiave pubblica è implementato tramite uno script: lo script accetta una firma a curva ellittica come input, la verifica in base alla transazione e all'indirizzo che possiede l'UTXO e restituisce 1 se la verifica dà esito positivo, altrimenti 0. Esistono altri script più complicati per altri casi d'uso. Ad esempio, si può creare uno script che richieda le firme da due di tre chiavi private per validare ("multifirma"), una configurazione utile per i conti aziendali, i conti di risparmi sicuri e alcune situazioni di deposito a garanzia del commerciante. Gli script possono anche essere utilizzati per pagare ricompense per soluzioni a problemi di calcolo e si può persino creare uno script che indichi qualcosa del tipo "questo UTXO Bitcoin è tuo se puoi fornire una prova SPV che hai inviato una transazione Dogecoin di questo taglio a me", essenzialmente consentendo lo scambio decentralizzato tra criptovalute diverse.

Il linguaggio di scripting implementato in Bitcoin ha però diverse importanti limitazioni:

- **Mancanza di completezza di Turing**: serve a indicare che, sebbene esista una grande sottoserie di calcolo supportata dal linguaggio di scripting di Bitcoin, non supporta quasi niente. La categoria principale che manca sono i cicli. Ciò si esegue evitando i cicli infiniti durante la verifica della transazione; teoricamente, è un ostacolo sormontabile per i programmatori di script, poiché ogni ciclo è simulabile semplicemente ripetendo il codice sottostante molte volte con un'istruzione if, ma ciò porta a script molto inefficienti a livello di spazio. Ad esempio, implementare un algoritmo di firma della curva ellittica alternativo richiederebbe 256 turni di moltiplicazione ripetuti, tutti inclusi individualmente nel codice.
- **Mancata visibilità del valore**, non c'è modo per uno script UTXO di fornire un controllo fine sull'importo prelevabile. Ad esempio, un caso d'uso interessante di un contratto oracolo sarebbe un contratto di copertura secondo cui A e B mettono 1000 dollari in BTC e dopo 30 giorni lo script invia 1000 dollari in BTC ad A e il resto a B. Questo richiederebbe un oracolo per stabilire il valore di 1 BTC in USD, ma anche in questo caso si tratterebbe di un enorme miglioramento in termini di attendibilità e requisiti infrastrutturali rispetto alle soluzioni completamente centralizzate attualmente disponibili. Tuttavia, poiché i UTXO sono tutto o niente, il solo modo per ottenere questo risultato è tramite il poco efficiente trucco di possedere molti UTXO di denominazioni variabili (es. un UTXO di 2<sup>k</sup> per ogni k fino a 30) e far scegliere all'oracolo quale UTXO inviare ad A e quale a B.
- **Mancanza di stato** - un UTXO può essere speso o non speso; non vi è alcuna possibilità di avere contratti multifase o script con uno stato interno diverso. Così si rende difficile creare contratti di opzioni multifase, piattaforme di scambio decentralizzate o protocolli d'impegno crittografico a due fasi (necessari per ricompense computazionali sicure). Significa anche che UTXO può essere usato solo per costruire semplici contratti irripetibili e non dei contratti più complessi "di stato", quali organizzazioni decentralizzate, e rende difficile da implementare i meta protocolli. Stato binario abbinato a mancanza di valore significa inoltre che un'altra applicazione importante, i limiti sui prelievi, è possibile.
- **Blockchain invisibile** - per gli UTXO i dati blockchain quali il nonce, la marca temporale e l'hash blocco precedente sono invisibili. Questo limita severamente applicazioni dei giochi d'azzardo e alcune altre categorie, in quanto priva la lingua dello script di fonti di casualità potenzialmente utili.

Quindi abbiamo tre approcci alla creazione di applicazioni per le criptovalute: creare una nuova blockchain, usare lo scripting basato su Bitcoin e creare un meta-protocollo basato su Bitcoin. Creare una nuova blockchain offre libertà illimitata nella creazione di un set di funzionalità, ma a scapito del tempo di sviluppo, del lavoro necessario per partire e della sicurezza. L'utilizzo di script è facile da implementare e standardizzare, ma è molto limitato in termini di capacità e i meta-protocolli, sebbene semplici, peccano in termini di scalabilità. Con Ethereum, vogliamo creare un framework alternativo che fornisca vantaggi anche maggiori in termini di facilità di sviluppo, proprietà di light client più complete e consenta allo stesso tempo alle applicazioni di condividere un ambiente economico e la sicurezza della blockchain.

## Ethereum {#ethereum}

L'intento di Ethereum è creare un protocollo alternativo per sviluppare applicazioni decentralizzate, fornendo una serie diversa di compromessi che crediamo saranno molto utili per una vasta classe di applicazioni decentralizzate, con enfasi particolare sulle situazioni dove i tempi di sviluppo rapidi, la sicurezza per le applicazioni piccole e usate raramente e la possibilità per applicazioni diverse di interagire molto efficientemente sono importanti. Ethereum lo fa costruendo essenzialmente il livello fondamentale astratto definitivo: una blockchain con un linguaggio di programmazione completo e integrato, consentendo a chiunque di scrivere i contratti intelligenti e le applicazioni decentralizzate, in cui possono creare le proprie regole arbitrarie per proprietà, formati di transazione e funzioni di transizione di stato. Una versione base di Namecoin può essere scritta in due righe di codice e altri protocolli come valute e sistemi di reputazione sono costruibili in meno di venti. I contratti intelligenti, "scatole" crittografiche contenenti valore, sbloccate esclusivamente alla soddisfazione di certe condizioni, possono esser basati sulla piattaforma, con una potenza vastamente maggiore di quella offerta dallo scripting di Bitcoin, grazie alla completezza di Turing, la consapevolezza del valore e della blockchain e lo stato.

### Conti di Ethereum {#ethereum-accounts}

In Ethereum, lo stato si compone di oggetti detti "conti", ognuno avente un indirizzo da 20 byte e transizioni di stato, trasferimenti diretti di valore e informazioni tra i conti. Un conto di Ethereum contiene quattro campi:

- Il **nonce**, un contatore usato per assicurarsi che ogni transazione sia elaborabile solo una volta
- Il **saldo di ether** corrente del conto
- Il **codice del contratto** del conto, se presente
- L'archiviazione del **conto** (vuoto per impostazione predefinita)

"Ether" è il cripto-carburante interno principale di Ethereum ed è usato per pagare le commissioni delle transazioni. In generale, esistono due tipi di conto: **conti posseduti esternamente**, controllati da chiavi private e **conti di contratti**, controllati dal codice del rispettivo contratto. Un conto posseduto esternamente non contiene codice e nessuno puoi inviare messaggi da un conto posseduto esternamente creando e firmando una transazione; nel conto di un contratto, ogni volta che esso riceve un messaggio, il suo codice si attiva, consentendogli di leggere e scrivere all'archiviazione interna e di inviare altri messaggi o, a sua volta, creare contratti.

Si noti che i "contratti" in Ethereum non dovrebbero essere visti come qualcosa che dovrebbe essere "soddisfatto" o "rispettato"; piuttosto, sono più come "agenti autonomi" che vivono all'interno dell'ambiente di esecuzione di Ethereum, eseguendo sempre una parte specifica del codice se ricevono un messaggio o una transazione, e hanno il controllo diretto sul proprio saldo ether e sul proprio archivio di chiavi/valori per tenere traccia delle variabili persistenti.

### Messaggi e transazioni {#messages-and-transactions}

Il termine "transazione" è usato in Ethereum per riferirsi al pacchetto di dati firmati che memorizza un messaggio da inviare da un conto posseduto esternamente. Le transazioni contengono:

- Il destinatario del messaggio
- Una firma che identifica il mittente
- L'importo di ether da trasferire dal mittente al destinatario
- Un campo di dati facoltativo
- Un valore `STARTGAS`, rappresentante il numero massimo di passaggi di calcolo che l'esecuzione della transazione può intraprendere
- Un valore `GASPRICE`, rappresentante la commissione pagata dal mittente per il passaggio di calcolo

I primi tre sono campi standard previsti in ogni criptovaluta. Il campo dati non ha alcuna funzione predefinita, ma la macchina virtuale ha un codice operativo tramite il quale un contratto può accedere ai dati; come esempio d'uso, se un contratto funziona come un servizio di registrazione di domini su blockchain, allora potrebbe voler interpretare i dati che gli vengono trasmessi come contenenti due "campi", il primo campo è un dominio da registrare e il secondo campo è l'indirizzo IP in cui registrarlo. Il contratto leggerebbe tali valori dai dati del messaggio e li posizionerebbe in modo appropriato nell'archivio.

I campi `STARTGAS` e `GASPRICE` sono cruciali per il modello contro il denial of service di Ethereum. Per prevenire cicli infiniti accidentali o ostili oppure altri sprechi di calcolo nel codice, ogni transazione deve definire un limite del numero di passaggi di calcolo dell'esecuzione di codice che può utilizzare. L'unità fondamentale di calcolo è il "gas"; solitamente, un passaggio di calcolo costa 1 gas, ma alcune operazioni costano importi di gas maggiori, perché più costosi a livello di calcolo, o aumentano la quantità di dati da memorizzare come parte dello stato. Inoltre, esiste una commissione di 5 gas per ogni byte nei dati della transazione. L'intento del sistema di commissioni è richiedere a un utente malevolo di pagare proporzionatamente per ogni risorsa consumata, inclusi calcolo, larghezza di banda e archiviazione; dunque, qualsiasi transazione che induca a consumi maggiori di qualsiasi di queste risorse dalla rete, deve avere una commissione di gas approssimativamente proporzionale all'incremento.

### Messaggi {#messages}

I contratti possono inviare "messaggi" ad altri contratti, I messaggi sono oggetti virtuali mai serializzati ed esistono solo nell'ambiente d'esecuzione di Ethereum. Un messaggio contiene:

- Il mittente del messaggio (implicito)
- Il destinatario del messaggio
- L'importo di ether da trasferire con il messaggio
- Un campo di dati facoltativo
- Un valore `STARTGAS`

Essenzialmente, un messaggio è come una transazione, ma è prodotto da un contratto e non da un attore esterno. Un messaggio è prodotto quando un contratto che sta correntemente eseguendo il codice esegue l'opcode `CALL`, che produce ed esegue un messaggio. Come una transazione, un messaggio induce il conto del destinatario a eseguire il proprio codice. Dunque, i contratti possono avere rapporti con altri contratti esattamente come gli attori esterni.

Nota che l'indennità di gas assegnata da una transazione o contratto si applica al gas totale consumato da quella transazione e tutte le esecuzioni secondarie. Ad esempio, se un attore esterno A invia una transazione a B con 1000 gas e B consuma 600 gas prima di inviare un messaggio a C e l'esecuzione interna di C consuma 300 gas prima di rispondere, allora B può spendere altri 100 gas prima di terminarlo.

### Funzione di transizione tra stati di Ethereum {#ethereum-state-transition-function}

![Transizione tra stati dell'ether](./ether-state-transition.png)

La funzione di transizione tra stati di Ethereum, `APPLY(S,TX) -> S'`, è definibile come segue:

1. Verifica se la transzione è ben formata (cioè, ha il numero corretto di valori), se la firma è valida e se il nonce corrisponde a quello del conto del mittente. Se non è così, viene restituito un errore.
2. Calcola la commissione di transazione come ` STARTGAS * GASPRICE` e determina l'indirizzo del mittente dalla firma. Sottrae la commissione dal saldo del conto del mittente e incrementa il nonce del mittente. Se il saldo non è sufficiente, viene restituito un errore.
3. Inizializza `GAS = STARTGAS` e preleva un dato importo di gas per byte per pagare per i byte nella transazione.
4. Trasferisce il valore della transazione dal conto del mittente al conto ricevente. Se il conto ricevente ancora non esiste, lo crea. Se il conto del ricevente è un contratto, esegue il codice del contratto al completamento o finché l'esecuzione termina il gas.
5. Se il trasferimento di valore fallisce perché il mittente non aveva abbastanza denaro o l'esecuzione del codice ha terminato il gas, ripristina tutte le modifiche di stato tranne il pagamento delle commissioni e le aggiunge al conto del miner.
6. Altrimenti, rimborsa le commissioni per tutto il gas rimanente al mittente e invia le commissioni pagate per il gas consumato al miner.

Per esempio, supponiamo che il codice del contratto sia:

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Si noti che in realtà il codice del contratto è scritto nel codice di basso livello dell'EVM; questo esempio è scritto in Serpent, uno dei nostri linguaggi di alto livello, per chiarezza, ed è compilabile al codice dell'EVM. Supponiamo che l'archiviazione del contratto sia vuota all'inizio e che sia inviata una transazione con valore di 10 ether, 2000 gas, 0,001 ether di prezzo del gas e 64 byte di dati, con i byte dallo 0 al 31 rappresentanti il numero `2` e i byte dal 32 al 63 rappresentanti la stringa `CHARLIE`. Il processo per la funzione di transizione tra stati in questo caso sarà il seguente:

1. Verifica che la transazione sia valida e abbia un formato corretto.
2. Verifica che il mittente della transazione abbia almeno 2000 \ * 0,001 = 2 ether. Se sì, si sottraggono 2 ether dal conto del mittente.
3. Inizializza gas = 2000; supponendo che la transazione sia lunga 170 byte e la commissione per byte sia 5, sottrarre 850 così che rimangano 1150 unità di gas.
4. Sottrae altri 10 ether dal conto del mittente e li aggiunge conto del contratto.
5. Esegue il codice. In questo caso è semplice: verifica se è usato l'archivio del contratto all'indice `2`, nota che non è così e, quindi, imposta l'archivio all'indice `2` al valore `CHARLIE`. Supponiamo che questo richieda 187 gas, quindi l'importo di gas rimanente è di 1150 - 187 = 963
6. Aggiunge 963 \* 0.001 = 0.963 ether al conto del mittente del mittente e restituisce lo stato risultante.

Se non c'era alcun contratto al destinatario della transazione, allora la commissione totale della transazione sarebbe semplicemente pari al `GASPRICE` fornito, moltiplicato per la lunghezza della transazione in byte e, i dati inviati insieme a essa, sarebbero irrilevanti.

Nota che i messaggi operano come le transazioni in termini di ripristino: se l'esecuzione di un messaggio esaurisce il gas, allora essa e tutte le altre esecuzioni innescate da essa, si ripristinano; mentre le esecuzioni principali non necessitano di esser ripristinate. Ciò significa che è un contratto può chiamare "in sicurezza" un altro contratto, poiché se A chiama B con G gas, allora è garantito che l'esecuzione di A perda al massimo G di gas. Infine, si noti che c'è un opcode `CREATE`, che crea un contratto; i suoi meccanismi di esecuzione assomigliano generalmente a `CALL`, tranne che l'output dell'esecuzione determina il codice di un contratto appena creato.

### Esecuzione del codice {#code-execution}

Il codice nei contratti di Ethereum è scritto in un linguaggio bytecode basato sullo stack di basso livello, detto "codice della macchina virtuale di Ethereum" o "codice EVM". Il codice consiste in una serie di byte, dove ogni byte rappresenta un'operazione. In generale, l'esecuzione del codice è un ciclo infinito che consiste nella ripetuta esecuzione dell'operazione al contatore corrente del programma (che inizia da zero) e poi nell'aumento del contatore del programma di uno, finché non viene raggiunta la fine del codice, si verifica un errore o viene rilevata l'istruzione `STOP` o `RETURN`. Le operazioni hanno accesso a tre tipi di spazio in cui archiviare i dati:

- Lo **stack**, un contenitore last-in-first-out in cui è possibile eseguire il push e il pop dei valori
- La **memoria**, un array di byte espandibili infinitamente
- L'**archivio** a lungo termine del contratto, un archivio di chiavi/valori. A differenza dello stack e della memoria, che si ripristinano al termine del calcolo, l'archivio persiste a lungo termine.

Il codice può anche accedere al valore, al mittente e ai dati del messaggio in arrivo, nonché ai dati dell'intestazione del blocco e il codice può anche restituire una matrice di dati di byte come output.

Il modello di esecuzione formale del codice dell'EVM è sorprendentemente semplice. Mentre la macchina virtuale Ethereum è in esecuzione, il suo stato di calcolo completo può essere definito dalla tupla `(block_state, transaction, message, code, memory, stack, pc, gas)`, in cui `block_state` è lo stato globale, contenente tutti i conti e include i saldi e l'archiviazione. All'inizio di ogni ciclo di esecuzione, l'istruzione corrente viene trovata prendendo il `pc`esimo byte di `code` (o 0 se `pc >= len(code)`), e ogni istruzione ha la propria definizione in termini di come influisce sulla tupla. Ad esempio, `ADD` estrae due elementi dallo stack ed esegue il push della somma, riduce i `gas` di 1 e incrementa `pc` di 1, mentre `SSTORE` estrae i primi due elementi dallo stack e inserisce il secondo nell'archiviazione del contratto, all'indice specificato dal primo elemento. Sebbene ci siano molti modi per ottimizzare l'esecuzione della macchina virtuale di Ethereum tramite una compilazione just-in-time, un'implementazione di base di Ethereum è eseguibile in poche centinaia di righe di codice.

### Blockchain e mining {#blockchain-and-mining}

![Diagramma a blocchi dell'applicazione in Ethereum](./ethereum-apply-block-diagram.png)

La blockchain di Ethereum è per molti versi simile a quella di Bitcoin, ma con alcune differenze. La differenza principale tra Ethereum e Bitcoin, riguardo l'architettura della blockchain, è che, a differenza di Bitcoin che contiene solo una copia dell'elenco delle transazioni, i blocchi di Ethereum contengono una copia sia dell'elenco delle transazioni che dello stato più recente. A parte questo, anche altri due valori, il numero del blocco e la difficoltà, sono memorizzati nel blocco. L'algoritmo di convalida del blocco di base in Ethereum è il seguente:

1. Verifica se il blocco a cui si fa riferimento in precedenza esiste ed è valido.
2. Verifica che la marca temporale del blocco sia maggiore di quella del blocco precedente di riferimento e meno di 15 minuti nel futuro
3. Verifica che il numero del blocco, la difficoltà, la radice della transazione, la radice dell'ommer e il limite di gas (vari concetti di basso livello specifici di Ethereum), siano validi.
4. Verifica che il proof-of-work del blocco sia valido.
5. Supponiamo che `S[0]` sia lo stato alla fine del blocco precedente.
6. Si rende `TX` l'elenco delle transazioni del blocco, con `n` transazioni. Per tutti gli `i` in `0...n-1`, si imposta `S[i+1] = APPLY(S[i],TX[i])`. Se qualsiasi applicazione restituisce un errore, o se il gas totale consumato nel blocco fino a questo punto supera il `GASLIMIT`, restituisce un errore.
7. Si rende `S_FINAL` `S[n]`, ma aggiungendo la ricompensa del blocco pagata al miner.
8. Verifica che la radice dell'albero di Merkle dello stato `S_FINAL` sia uguale alla radice dello stato finale fornita nell'intestazione del blocco. In caso affermativo, il blocco è valido; in caso negativo, no.

A prima vista l'approccio può sembrare poco efficiente, perché deve memorizzare l'intero stato con ogni blocco, ma in realtà l'efficienza dovrebbe essere paragonabile a quella di Bitcoin. Il motivo è che lo stato è memorizzato nella struttura ad albero e dopo ogni blocco è necessario modificare solo una piccola parte di esso. Quindi, in generale, tra due blocchi adiacenti la stragrande maggioranza dell'albero dovrebbe essere la stessa, e quindi i dati possono essere archiviati una volta e referenziati due volte usando i puntatori (es. hash di sottoalberi). A questo scopo, viene usato un tipo di albero speciale, noto come "Patricia tree", includendo una modifica al concetto di albero di Merkle che consente ai nodi di essere inseriti ed eliminati, e non solo modificati, in modo efficiente. Inoltre, poiché tutte le informazioni sullo stato fanno parte dell'ultimo blocco, non è necessario archiviare l'intera cronologia della blockchain: una strategia che, se potesse essere applicata a Bitcoin, può essere calcolata per fornire un risparmio di spazio di 5-20 volte.

Una domanda frequente è "dove" viene eseguito il codice del contratto, in termini di hardware fisico. La risposta è semplice: il processo di esecuzione del codice del contratto fa parte della definizione della funzione di transizione tra stati, che fa parte dell'algoritmo di convalida del blocco, quindi se una transazione viene aggiunta nel blocco `B` il codice di esecuzione generato da quella transazione verrà eseguito da tutti i nodi, ora e in futuro, che scaricano e convalidano il blocco `B`.

## Applicazioni {#applications}

In generale, esistono tre tipi di applicazioni su Ethereum. La prima categoria è quella delle applicazioni finanziarie, che forniscono agli utenti metodi più potenti per gestire i contratti e accedervi usando il proprio denaro. Questa categoria include le valute secondarie, i derivati finanziari, i contratti di copertura, i portafogli di risparmio, i testamenti e anche alcune classi di contratti di impiego su larga scala. La seconda categoria è quella delle applicazioni semi-finanziarie, dove il denaro è coinvolto ma esiste anche un aspetto decisamente non monetario; un esempio perfetto è l'auto-imposizione di ricompense per soluzioni a problemi di calcolo. Infine, esistono applicazioni come il voto online e la governance decentralizzata, che non sono affatto operazioni finanziarie.

### Sistemi di token {#token-systems}

I sistemi di token sulla blockchain hanno molte applicazioni che vanno dalle valute secondarie che rappresentano risorse come USD o oro ad azioni aziendali, token singoli che rappresentano proprietà intelligenti, coupon non falsificabili sicuri e persino sistemi di token assolutamente privi di legami al valore convenzionale, usati come sistemi di punti a scopo di incentivo. I sistemi di token sono sorprendentemente facili da implementare in Ethereum. Il punto principale per capire questo aspetto è che una valuta, o un sistema di token, fondamentalmente è un database con un'operazione: sottrarre X unità da A e dare X unità a B, con l'indicazione che (1) A abbia almeno X unità prima della transazione e che (2) la transazione sia approvata da A. Tutto ciò che serve per implementare un sistema di token è implementare questa logica in un contratto.

Il codice di base per l'implementazione di un sistema token in Serpent appare come segue:

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Si tratta essenzialmente di un'implementazione letterale della funzione di transizione tra stati "sistema bancario" descritta più sopra nel presente documento. In primo luogo e per pochi altri casi limite, è necessario aggiungere alcune righe di codice extra per il passaggio iniziale della distribuzione delle unità di valuta e, idealmente, sarebbe aggiunta una funzione per permettere ad altri contratti di chiedere il saldo di un indirizzo. E questo è tutto. Teoricamente, i sistemi di token basati su Ethereum che agiscono come sottovalute possono potenzialmente includere un'altra importante caratteristica che manca alle meta-valute basate su Bitcoin a catena: la possibilità di pagare le commissioni delle transazioni direttamente in quella valuta. Tutto ciò verrebbe implementato in modo che il contratto mantenga un saldo in ether con il quale rimborserebbe l'ether utilizzato per pagare le commissioni al mittente e ricarichi questo saldo raccogliendo le unità di valuta interne che riceve in commissioni rivendendole in un'asta in costantemente attiva. Dunque, gli utenti devono "attivare" i propri conti con dell'ether, ma una volta che l'ether è lì, sarebbe riutilizzabile, poiché il contratto lo rimborserebbe ogni volta.

### Derivati finanziari e valute dal valore stabile {#financial-derivatives-and-stable-value-currencies}

Le derivate finanziari sono l'applicazione più comune di un "contratto intelligente" e tra le più semplici da implementare nel codice. La sfida principale nell'implementazione dei contratti finanziari è che la maggioranza di essi richiede riferimenti a un ticker del prezzo esterno; ad esempio, un'applicazione molto desiderabile è un contratto intelligente che copra dalla volatilità dell'ether (o di un'altra criptovaluta), relativamente al dollaro americano ma, farlo, richiede al contratto di conoscere quale sia il valore di ETH/USD. Il modo più semplice per implementare questa funzione è tramite un contratto di "feed di dati" gestito da una parte specifica (es. NASDAQ), progettato in modo che quella parte abbia la possibilità di aggiornare il contratto quando necessario, fornendo un'interfaccia che consenta ad altri contratti di inviare un messaggio al contratto originario e ottenere una risposta con il prezzo.

Dato l'aspetto critico appena evidenziato, il contratto di copertura sarebbe il seguente:

1. Si attende che la parte A inserisca 1000 ether.
2. Si attende che la parte B inserisca 1000 ether.
3. Si registra il valore USD di 1000 ether, calcolato interrogando il contratto del feed di dati nell'archivio. Supponiamo che il valore sia x $.
4. Dopo 30 giorni, si consente ad A o B di "riattivare" il contratto per inviare x $ in ether (calcolato interrogando di nuovo il contratto del feed di dati per ottenere il nuovo prezzo) ad A e il resto a B.

Un contratto del genere avrebbe un potenziale significativo nel commercio di criptovalute. Uno dei problemi principali menzionati in relazione alle criptovalute è il fatto che siano volatili; sebbene molti utenti e commercianti possano cercare la sicurezza e la comodità di avere a che fare con risorse crittografiche, potrebbero non voler rischiare di perdere il 23% del valore dei propri fondi in un solo giorno. Finora, la soluzione più comunemente proposta sono le risorse sostenute dall'emittente; l'idea è che un emittente crei una valuta secondaria per la quale abbia il diritto di emettere e revocare unità e fornisca un'unità della valuta a tutti coloro che le forniscono (offline) con un'unità di una risorsa sottostante specificata (ad esempio oro, USD). L'emittente poi promette di fornire un'unità della risorsa sottostante a chiunque restituisca un'unità della criptorisorsa. Questo meccanismo consente a tutte le risorse non crittografiche di essere "accumulate" in una risorsa crittografica, a patto che l'emittente sia attendibile.

In pratica, però, gli emittenti non sono sempre affidabili e in alcuni casi l'infrastruttura bancaria è troppo debole, o troppo ostile, perchè tali servizi possano essere presi in considerazione. I derivati finanziari rappresentano un'alternativa. In questo caso, invece di un singolo emittente che fornisce i fondi per sostenere una risorsa, il ruolo è rivestito da un mercato decentralizzato di speculatori che scommettono che il prezzo di una risorsa di riferimento crittografica (es. ETH) aumenterà. A differenza degli emittenti, agli speculatori non conviene far fallire la loro posizione perché il contratto di copertura tiene in deposito i loro fondi. Si noti che questo approccio non è completamente decentralizzato, perché una fonte attendibile è ancora necessaria per fornire il ticker dei prezzi, nonostante si tratti di un enorme miglioramento in termini di riduzione dei requisiti dell'infrastruttura (al contrario del caso degli emittenti, emettere un feed di prezzi non richiederebbe alcuna licenza e potrebbe essere categorizzato come libertà di parola) e di riduzione delle potenziali frodi.

### Identità e sistemi di reputazione {#identity-and-reputation-systems}

La prima criptovaluta alternativa, [Namecoin](http://namecoin.org/), tentò di usare una blockchain in stile Bitcoin per fornire un sistema di registrazione dei nomi, dove gli utenti potevano registrare i propri nomi in un database pubblico insieme ad altri dati. Il caso d'uso principale è per un sistema [DNS](https://wikipedia.org/wiki/Domain_Name_System), che mappa i nomi di dominio come "Bitcoin.org" (o, nel caso di Namescoin, "Bitcoin.bit") e un indirizzo IP. Altri casi d'uso includono l'autenticazione e-mail e sistemi di reputazione potenzialmente più avanzati. Questo è il contratto di base per fornire un sistema di registrazione dei nomi in stile Namecoin su Ethereum:

```py
def register(name, value):
  if !self.storage[name]:
    self.storage[name] = value
```

Il contratto è molto semplice; si tratta semplicemente di un database nella rete di Ethereum a cui può essere aggiunto, ma che non può essere modificato o rimosso da essa. Tutti possono registrare un nome con un dato valore e quella registrazione rimarrà per sempre. Un contratto di registrazione dei nomi più sofisticato avrà anche una "clausola di funzione" che consentirà ad altri contratti di interrogarlo, nonché un meccanismo per il "proprietario" di un nome (cioè chi lo ha registrato per primo) per cambiare i dati o trasferirne la proprietà. Si può anche aggiungere la reputazione e la funzionalità web-of-trust.

### Archivio di file decentralizzato {#decentralized-file-storage}

Negli ultimi anni, sono emerse molte startup popolari che si occupano di archivi di file online, la più prominente è Dropbox. Puntano a consentire agli utenti di caricare un backup del proprio disco rigido, facendo memorizzare il backup al servizio e consentendo all'utente di accedervi in cambio di un abbonamento mensile. Tuttavia, attualmente il mercato degli archivi di file è talvolta piuttosto inefficiente; un breve sguardo a varie soluzioni esistenti mostra che, in particolare a livello dei 20-200 GB, detti "uncanny valley", in cui non sono disponibili né quote gratuite né sconti a livello aziendale, i prezzi mensili per l'archivio di file sono superiori a quelli di un intero disco rigido per un mese. I contratti di Ethereum possono consentire lo sviluppo di un ecosistema di archivi di file decentralizzato, dove i singoli utenti possono guadagnare piccole quantità di denaro dando in affitto i propri dischi fissi e lo spazio inutilizzato è utilizzabile per abbassare ulteriormente i costi dell'archivio di file.

La chiave su cui si basa questo meccanismo sarebbe quella che abbiamo definito "contratto decentralizzato di Dropbox". Questo contratto funziona come segue. Innanzitutto, si dividono i dati desiderati in blocchi, crittografando ognuno di essi a scopo di privacy e derivandone un albero di Merkle. Poi si crea un contratto con la regola che, ogni N blocchi, il contratto seleziona un indice casuale nell'albero di Merkle (usando l'hash del blocco precedente, accessibile dal codice del contratto, come fonte di casualità) e assegna X ether alla prima entità che offre una transazione con una prova semplificata di proprietà del blocco (simile alla verifica di un pagamento) in quel particolare indice dell'albero. Quando un utente vuole riscaricare il suo file, può usare un protocollo del canale di micropagamento (es. paga 1 szabo per 32 kilobyte) per recuperare il file; l'approccio più efficiente in termini di commissioni è non pubblicare la transazione fino alla fine, ma sostituirla con una lievemente più lucrativa con lo stesso nonce per ogni 32 kilobyte.

Un'importante funzionalità del protocollo è che, sebbene possa sembrare che ci si fidi di molti nodi casuali per non dimenticare il file, si può ridurre tale rischio quasi a zero dividendo il file in molte parti tramite la condivisione del segreto e controllando i contratti per vedere che ogni parte sia ancora in possesso di qualche nodo. Se un contratto sta ancora pagando denaro, fornisce una prova crittografica che qualcuno sta ancora utilizzando l'archivio per il file.

### Organizzazioni autonome decentralizzate {#decentralized-autonomous-organizations}

Il concetto generale di "organizzazione decentralizzata autonoma" è quello di un'entità virtuale che ha un certo insieme di membri o azionisti che, magari con una maggioranza del 67%, hanno il diritto di spendere i fondi dell'entità e di modificarne il codice. I membri deciderebbero collettivamente come l'organizzazione dovrebbe allocare i propri fondi. I metodi per allocare i fondi di una DAO vanno da ricompense, a salari, fino a meccanismi molto più particolari come una valuta interna per premiare il lavoro. Questo replica essenzialmente gli "escamotage" legali di un'azienda tradizionale o senza scopo di lucro, ma usando solo la tecnologia crittografica della blockchain per applicarli. Finora gran parte delle discussioni sulle DAO si è concentrata sul modello "capitalista" di una "corporazione autonoma decentralizzata" (DAC) con azionisti che ricevono dividendi e azioni scambiabili; un'alternativa, forse descritta come una "comunità autonoma decentralizzata", farebbe avere ai membri una parte uguale nel processo decisionale e richiederebbe al 67% dei membri esistenti di raggiungere un accordo per aggiungere o rimuovere un membro. Il requisito che una persona possa avere una sola quota dovrebbe quindi essere applicato collettivamente dal gruppo.

Segue una descrizione di massima di come programmare una DAO. Il design più semplice è un codice auto-modificante che cambia se due terzi dei membri concordano una modifica. Sebbene il codice sia teoricamente immutabile, si può facilmente aggirare questo problema e avere una mutabilità di fatto avendo blocchi di codice in contratti separati e avendo l'indirizzo di quali contratti invocare archiviato nella memoria modificabile. In una semplice implementazione di un simile contratto DAO, ci sarebbero tre tipi di transazione, distinti dai dati forniti nella transazione:

- `[0,i,K,V]` per registrare una proposta con indice `i` per modificare l'indirizzo nell'indice di archivio `K` al valore `V`
- `[1,i]` per registrare un voto a favore della proposta `i`
- `[2,i]` per finalizzare la proposta `i` se sono stati espressi abbastanza voti

Il contratto avrebbe poi clausole per ognuno dei punti. Manterrebbe un registro di tutte le modifiche aperte nell'archivio, insieme a una lista di chi le ha votate. Avrebbe anche un elenco di tutti i membri. Quando un cambiamento dell'archivio arriva ai due terzi dei membri che lo votano, una transazione finalizzante potrebbe eseguire la modifica. Una struttura più sofisticata avrebbe anche una capacità di voto integrata per funzionalità quali l'invio di una transazione, l'aggiunta e la rimozione di membri, e potrebbe persino assicurare la delega del voto in stile [democrazia liquida](https://wikipedia.org/wiki/Liquid_democracy) (ossia chiunque può delegare qualcuno a votare per conto suo e la delega è transitiva, quindi se A delega B e B delega C, allora C determina il voto di A). Questo design consentirebbe alla DAO di crescere organicamente come comunità decentralizzata, consentendo alle persone di delegare eventualmente il compito di filtrare chi è un membro a specialisti, sebbene, a differenza del "sistema attuale", gli specialisti possano facilmente entrare e uscire dall'esistenza nel tempo man mano che i singoli membri della comunità cambiano i loro allineamenti.

Un modello alternativo è per una società decentralizzata, dove ogni conto può avere zero o più quote e sono necessarie più di due terzi di quote per prendere una decisione. Una struttura completa comporterebbe la funzionalità di gestione delle risorse, la capacità di fare un'offerta per l'acquisto o la vendita di azioni e la capacità di accettare offerte (preferibilmente con un meccanismo di corrispondenza degli ordini all'interno del contratto). Esiste anche una delega in stile "democrazia liquida", generalizzando il concetto di "consiglio di amministrazione".

### Ulteriori applicazioni {#further-applications}

**1. Portafogli di risparmio**. Supponiamo che Alice voglia tenere al sicuro i suoi fondi, ma sia preoccupata di perdere la sua chiave privata o che qualcuno possa hackerarla. Versa ether in un contratto con Bob, una banca, come segue:

- Alice da sola può prelevare al massimo l'1% dei fondi ogni giorno.
- Bob da solo può prelevare al massimo l'1% dei fondi ogni giorno, ma Alice ha la possibilità di effettuare una transazione con la sua chiave per revocare questa possibilità.
- Alice e Bob insieme possono prelevare tutto.

Normalmente, l'1% al giorno è abbastanza per Alice, e se Alice vuole prelevare di più può contattare Bob e chiedergli aiuto. Nel caso la chiave di Alice venga compromessa, Alice si potrebbe rivolgere a Bob per spostare i fondi in un nuovo contratto. Se Alice perdesse la sua chiave, Bob potrebbe prelevare i fondi. Se Bob si rivelasse malintenzionato, Alice potrebbe revocare la sua capacità di prelievo.

**2. Assicurazione dei raccolti**. Si può facilmente stipulare un contratto di derivati finanziari ma utilizzando un feed di dati del tempo invece di qualsiasi indice di prezzo. Se un agricoltore in Iowa acquista un derivato che paga inversamente in base alle precipitazioni in Iowa, in caso di siccità, l'agricoltore riceverà automaticamente denaro e se invece ci sarà abbastanza pioggia l'agricoltore sarà felice perché i suoi raccolti saranno positivi. Questo discorso può essere esteso alle assicurazioni sulle calamità naturali in generale.

**3. Un feed dati decentralizzato**. Per i contratti finanziari per differenza, potrebbe essere effettivamente possibile decentralizzare il feed di dati tramite un protocollo chiamato"[SchellingCoin](http://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/)". In pratica, SchellingCoin funziona così: N parti mettono nel sistema il valore di un determinato dato (ad esempio il prezzo di ETH/USD), i valori vengono ordinati e tutti quelli tra il 25° e il 75° percentile ottengono un token come ricompensa. Ognuno ha l'incentivo a fornire la risposta che tutti gli altri forniranno, e l'unico valore su cui un gran numero di giocatori può essere realisticamente d'accordo è l'ovvio valore predefinito: la verità. Questo crea un protocollo decentralizzato che può teoricamente fornire qualsiasi numero di valori, compreso il prezzo in ETH/USD, la temperatura a Berlino o anche il risultato di un particolare calcolo rigido.

**4. Deposito multi-firma intelligente**. Bitcoin permette contratti di transazioni multi-firma dove, ad esempio, tre chiavi su cinque possono spendere i fondi. Ethereum consente una granularità maggiore; ad esempio, quattro su cinque possono spendere tutto, tre su cinque possono spendere fino al 10% al giorno e due su cinque possono spendere fino allo 0,5% al giorno. Inoltre, la multi-firma di Ethereum è asincrona: due parti possono registrare le proprie firme sulla blockchain in momenti diversi e l'ultima firma invierà automaticamente la transazione.

**5. Cloud computing**. La tecnologia dell'EVM può essere usata anche per creare un ambiente di calcolo verificabile, che consenta agli utenti di chiedere ad altri di effettuare i calcoli e quindi, facoltativamente, chiedere una prova del fatto che i calcoli, a certi punti di controllo selezionati casualmente, siano stati eseguiti correttamente. Questa situazione consente di creare un mercato di cloud computing, dove ogni utente può partecipare con il proprio desktop, notebook o server specializzato e il controllo a campione unito a depositi di sicurezza può essere utilizzato per garantire che il sistema sia attendibile (cioè che i nodi non possano aggirare il sistema traendone profitto). Un sistema del genere potrebbe non essere idoneo per tutte le operazioni; quelle che richiedono un alto livello di comunicazione tra processi, ad esempio, non possono essere eseguite facilmente su un cloud di nodi di grandi dimensioni. Altre operazioni, invece, sono molto più facili da parallelizzare; progetti come SETI@home, folding@home e algoritmi genetici possono essere facilmente implementati su una piattaforma di questa natura.

**6. Gioco d'azzardo peer to peer**. Qualsiasi numero di protocolli di gioco d'azzardo peer-to-peer, come Frank Stajano e il [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf)di Richard Clayton, può essere implementato sulla blockchain Ethereum. Il più semplice protocollo di gioco d'azzardo è in realtà semplicemente un contratto che controlla la differenza sull'hash del blocco successivo, e da questo possono essere realizzati protocolli più avanzati, creando servizi di gioco d'azzardo con commissioni pari quasi a zero, che non hanno alcuna possibilità di aggirare il sistema.

**7. Mercati predittivi**. Con un oracolo o SchellingCoin, anche i mercati predittivi sono facili da implementare e, insieme a SchellingCoin, possono rivelarsi la prima applicazione mainstream di [futarchy](http://hanson.gmu.edu/futarchy.html) come protocollo di governance per le organizzazioni decentrate.

**8. Mercati decentralizzati sulla catena**, che utilizzano il sistema di reputazione e di identità come base.

## Problematiche, varie ed eventuali {#miscellanea-and-concerns}

### Implementazione GHOST modificata {#modified-ghost-implementation}

Il protocollo "Greedy Heaviest Observed Subtree" (GHOST) è un'innovazione introdotta per la prima volta da Yonatan Sompolinsky e Aviv Zohar nel [dicembre 2013](https://eprint.iacr.org/2013/881.pdf). La motivazione che sta alla base di GHOST è che le blockchain con tempi di conferma rapidi attualmente hanno una sicurezza ridotta a causa di un elevato tasso di obsolescenza, perché i blocchi impiegano un certo periodo di tempo per propagarsi attraverso la rete. Se il miner A esegue il mining di un blocco e poi il miner B esegue il mining di un altro blocco prima che il blocco del miner A si propaghi a B, il blocco del miner B andrà sprecato e non contribuirà alla sicurezza della rete. Inoltre, è presente un problema di centralizzazione: se il miner A è un pool di mining con il 30% di hashpower e B ha il 10% di hashpower, A corre il rischio di produrre un blocco obsoleto per il 70% del tempo (dato che per il rimanente 30% del tempo produce l'ultimo blocco e quindi ottiene subito i dati di mining) mentre B corre il rischio di produrre un blocco obsoleto per il 90% del tempo. Quindi, se l'intervallo del blocco è abbastanza breve affinché il tasso di obsolescenza sia elevato, A sarà notevolmente più efficiente semplicemente in virtù delle sue dimensioni. Con la combinazione di questi due effetti, nelle blockchain che producono blocchi rapidamente è probabile che un pool di mining con una percentuale abbastanza elevata di hashpower in rete abbia di fatto il controllo sul processo di mining.

Come descritto da Sompolinsky e Zohar, GHOST risolve il primo problema di perdita di sicurezza della rete includendo blocchi obsoleti nel calcolo della catena "più lunga"; cioè, al calcolo del blocco con il proof-of-work più elevato vengono aggiunti non solo il principale e gli elementi ancora superiori di un blocco, ma anche i discendenti obsoleti del principale del blocco (nel gergo di Ethereum gli "ommer"). Per risolvere il secondo problema della propensione alla centralizzazione, andiamo oltre il protocollo descritto da Sompolinsky e Zohar e forniamo ricompense anche per i blocchi obsoleti: un blocco obsoleto riceve l'87,5% della ricompensa di base dovuta e il subordinato che include il blocco obsoleto il restante 12,5%. Le commissioni sulle transazioni però non vengono assegnate agli ommer.

Ethereum implementa una versione semplificata di GHOST che scende solo di sette livelli. In particolare, è definito come segue:

- Un blocco deve specificare un elemento principale, oltre che 0 o più ommer
- Uno ommer incluso nel blocco B deve avere le seguenti proprietà:
  - Dev'essere un figlio diretto della generazione k, antenata di B, dove `2 <= k <= 7`.
  - Non può essere un elemento principale di B
  - Un ommer deve essere un'intestazione di blocco valida, ma non è necessario che sia un blocco verificato in precedenza o addirittura valido
  - Un ommer deve essere diverso da tutti gli ommer inclusi nei precedenti blocchi e da tutti quelli inclusi nello stesso blocco (inclusione non doppia)
- Per ogni ommer U nel blocco B, alla ricompensa base del miner di B viene aggiunto un ulteriore 3,125% e il miner di U ottiene il 93,75% di una ricompensa base standard.

Questa versione limitata di GHOST, con ommer che possono essere inclusi solo fino a 7 generazioni, è stata utilizzata per due motivi. In primo luogo, una versione di GHOST illimitata includerebbe troppe complicazioni nel calcolo degli ommer validi per un determinato blocco. In secondo luogo, il GHOST illimitato con compensazione come utilizzato in Ethereum elimina l'incentivo per un miner ad eseguire il mining dalla catena principale e non dalla catena di un utente malintenzionato.

### Commissioni {#fees}

Poiché ogni transazione pubblicata nella blockchain impone alla rete l'obbligo di scaricarla e verificarla, nasce così la necessità di avere un meccanismo di regolamentazione, che in genere includa commissioni sulle transazioni, per prevenire gli abusi. L'approccio predefinito, utilizzato in Bitcoin, è quello di avere commissioni puramente volontarie, basandosi sui miner che agiscono come guardiani e stabiliscono minimi dinamici. Questo approccio è stato accolto molto favorevolmente dalla comunità di Bitcoin, soprattutto perché "si basa sul mercato", cioè consente di determinare il prezzo in base all’offerta e alla domanda tra miner e chi invia le transazioni. Il problema con questo tipo di ragionamento risiede nel fatto che l'elaborazione delle transazioni non è un mercato. Anche se può sembrare attraente configurare l'elaborazione delle transazioni come un servizio che il miner offre al mittente, in realtà ogni transazione che un miner include dovrà essere elaborata da ogni nodo della rete, quindi la stragrande maggioranza del costo legato all'elaborazione delle transazioni è a carico di terzi e non del miner che decide se includere o no il blocco. Di conseguenza, è molto probabile che si verifichi una situazione di tragedia dei beni comuni.

Tuttavia, come risulta da questo difetto del meccanismo basato sul mercato, quando si tratta di un'ipotesi di semplificazione particolarmente imprecisa, magicamente si annulla. L'argomentazione è la seguente. Si supponga che:

1. Una transazione porti a `k` operazioni, offrendo la ricompensa `kR` al miner che la include, dove `R` è impostato dal mittente e `k` e `R` sono (approssimativamente) visibili al miner in anticipo.
2. Un'operazione abbia un costo di elaborazione di `C` per ogni nodo (cioè tutti i nodi hanno uguale efficienza)
3. Ci siano `N` nodi di mining, ognuno con esattamente la stessa potenza di elaborazione (quindi `1/N` del totale)
4. Non esistano nodi completi che esulino dal mining.

Un miner è disposto a elaborare una transazione se la ricompensa prevista è superiore al costo. Quindi, la ricompensa prevista è `kR/N` dal momento che il miner ha una possibilità di `1/N` di elaborare il blocco successivo e il costo di elaborazione è semplicemente `kC`. Di conseguenza, i miner includeranno le transazioni in cui `kR/N > kC`, o `R > NC`. Si noti che `R` è la commissione per operazione fornita dal mittente ed è quindi un limite inferiore sul vantaggio che il mittente ottiene dalla transazione, e `NC` è il costo per l'intera rete per l'elaborazione di un'operazione. Di conseguenza, i miner sono incentivati a includere solo le transazioni per cui il beneficio utilitaristico totale supera il costo.

Tuttavia, nella realtà, ci sono diverse differenze importanti da queste ipotesi:

1. Il miner in realtà paga un costo più elevato per elaborare la transazione rispetto agli altri nodi di verifica, dal momento che il tempo di verifica supplementare ritarda la propagazione del blocco e quindi aumenta la possibilità che il blocco diventi obsoleto.
2. Esistono nodi completi non sottoposti a mining.
3. Nella pratica la distribuzione di potenza di mining può risultare per nulla equa.
4. Sono presenti speculatori, avversari politici e squilibrati la cui funzione di utilità include il causare danni alla rete, che possono abilmente configurare contratti con costo molto inferiore rispetto al costo pagato da altri nodi di verifica.

(1) favorisce una tendenza per il miner a includere meno transazioni e (2) aumenta `NC`; di conseguenza, questi due effetti si annullano a vicenda almeno parzialmente.<sup>[Come?](https://github.com/ethereum/wiki/issues/447#issuecomment-316972260)</sup> (3) e (4) sono i problemi principali; per risolverli, stabiliamo semplicemente un limite fluttuante: nessun blocco può avere un numero di operazioni superiore a `BLK_LIMIT_FACTOR` volte la media mobile esponenziale a lungo termine. Nello specifico:

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

`BLK_LIMIT_FACTOR` e `EMA_FACTOR` sono costanti che per il momento saranno impostate a 65536 e 1,5, ma questo probabilmente cambierà dopo ulteriori analisi.

C'è un altro fattore che disincentiva blocchi di grandi dimensioni in Bitcoin: i blocchi grandi richiedono più tempo per essere propagati e quindi hanno una maggiore probabilità di diventare obsoleti. Su Ethereum, anche i blocchi ad alto consumo di gas possono richiedere più tempo per esser propagati, sia perché fisicamente più grandi, che perché richiedono più tempo per elaborare le transizioni di stato della transazione da convalidare. Questo disincentivo al ritardo è una problematica importante in Bitcoin ma meno in Ethereum, a causa del protocollo GHOST; quindi, i limiti di blocco regolamentati offrono una base più stabile.

### Calcolo e Turing equivalenza {#computation-and-turing-completeness}

È importante tenere presente che la macchina virtuale di Ethereum è Turing equivalente. Significa che il codice dell'EVM può codificare qualsiasi calcolo eseguibile dal punto di vista concettuale, compresi i cicli infiniti. Il codice dell'EVM permette il looping in due modi. In primo luogo, sono presenti un'istruzione `JUMP`, che permette al programma di tornare a un punto precedente nel codice, e un'istruzione `JUMPI`, per fare un salto condizionale, consentendo istruzioni come `while x < 27: x = x * 2`. In secondo luogo, i contratti possono chiamarsi a vicenda, consentendo potenzialmente il looping attraverso la ricorsività. Questo fa nascere naturalmente un problema: gli utenti malintenzionati possono danneggiare miner e nodi completi costringendoli a entrare in un ciclo infinito? Questa questione si presenta a causa di un problema informatico noto come problema della terminazione: non c'è modo di prevedere, in termini generali, se un dato programma si arresterà o meno.

Come descritto nella sezione sulla transizione tra stati, la nostra soluzione funziona richiedendo che una transazione imposti un numero massimo di passaggi di calcolo eseguibili. Se l'esecuzione richiede un calcolo più lungo, viene ripristinata, ma le commissioni vengono pagate comunque. I messaggi funzionano allo stesso modo. Per spiegare i motivi che stanno alla base della nostra soluzione, si considerino i seguenti esempi:

- Un aggressore crea un contratto che esegue un ciclo infinito, poi invia una transazione che attiva quel ciclo per il miner. Il miner elaborerà la transazione, eseguendo il ciclo infinito e attenderà che il gas si esaurisca. Sebbene l'esecuzione esaurisca il gas e si interrompa a metà, la transazione è comunque valida e il miner rivendica ugualmente la commissione dall'utente malevolo, per ogni passaggio di calcolo.
- Un aggressore crea un ciclo infinito molto lungo con l'intento di costringere il miner ad eseguire il calcolo per un tempo talmente lungo che, nel momento in cui il calcolo terminerà, saranno stati creati alcuni nuovi blocchi e non sarà possibile per il miner includere la transazione per richiedere la commissione. Tuttavia, l'utente malevolo dovrà inviare un valore per `STARTGAS`, limitando il numero di passaggi di calcolo permessi all'esecuzione, quindi, il miner saprà in anticipo che il calcolo richiederà un numero eccessivamente elevato di passaggi.
- Un utente malevolo vede un contratto con un codice come il seguente `send(A,contract.storage[A]); contract.storage[A] = 0` e invia uan transazione con abbastanza gas da eseguire il primo passaggio, ma non il secondo (es. effettuando un prelievo ma non consentendo al saldo di ridursi). L'autore del contratto non si deve preoccupare di proteggersi da tali attacchi, perché se l'esecuzione si ferma a metà, le modifiche apportate vengono ripristinate.
- Un contratto finanziario funziona prendendo la mediana di nove feed di dati proprietari per ridurre al minimo il rischio. Un utente malevolo prende possesso di uno dei feed di dati, progettato per esser modificabile tramite il meccanismo di chiamata all'indirizzo della variabile descritto nella sezione sulle DAO e lo converte in un ciclo infinito, dunque tentando di forzare qualsiasi tentativo di rivendicare fondi dal contratto finanziario, per esaurire il gas. Tuttavia, il contratto finanziario può impostare un limite di gas sul messaggio per impedire tale problema.

L'alternativa all'equivalenza Turing è l'incompletezza Turing, dove `JUMP` e `JUMPI` non esistono e può esistere solo una copia di ogni contratto nello stack di chiamate in un determinato momento. Con questo sistema, il sistema di commissioni descritto e le incertezze sull'efficacia della nostra soluzione potrebbero non essere necessari, in quanto il costo di esecuzione di un contratto sarebbe limitato dalla sua dimensione. Inoltre, l'incompletezza di Turing non è neanche una limitazione eccessiva; tra tutti gli esempi di contratto che abbiamo concepito internamente, finora solo uno richiedeva un ciclo, e anche questo ciclo potrebbe essere rimosso inserendo 26 ripetizioni di una riga di codice. Considerate le gravi implicazioni dell'equivalenza Turing, e i vantaggi limitati, perché non usare semplicemente un linguaggio Turing incompleto? In realtà, l'incompletezza di Turing è lontana dall'essere una vera soluzione al problema. Per capire perché, prendiamo in considerazione i contratti seguenti:

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (esegue un passaggio di un programma e registra la modifica nello storage)
```

Ora, si invia una transazione ad A. Così, in 51 transazioni, abbiamo un contratto che richiede 2<sup>50</sup> passaggi di calcolo. I miner potrebbero provare a rilevare tali "bombe logiche" in anticipo mantenendo un valore insieme a ciascun contratto specificando il numero massimo di passaggi computazionali che può richiedere e calcolandolo per i contratti che invocano ricorsivamente altri contratti, ma ciò richiederebbe ai miner di vietare i contratti che creano altri contratti (poiché tutti i 26 contratti di cui sopra creati ed eseguiti potrebbero essere facilmente raggruppati in un unico contratto). Un altro punto problematico riguarda il fatto che il campo dell'indirizzo di un messaggio è una variabile, quindi in generale potrebbe non essere neanche possibile sapere in anticipo quali altri contratti verranno invocati da un determinato contratto. Quindi, tutto sommato, giungiamo a una conclusione sorprendente: la Turing equivalenza è incredibilmente facile da gestire, mentre l'incompletezza di Turing è altrettanto incredibilmente difficile da gestire, a meno che non vengano messi in atto esattamente gli stessi controlli. Ma in tal caso, perché non lasciare che il protocollo rimanga Turing equivalente?

### Valuta ed emissione {#currency-and-issuance}

La rete Ethereum include una propria valuta integrata, l'ether, che ha il duplice scopo di fornire un livello di liquidità primaria per consentire uno scambio efficiente tra vari tipi di risorse digitali e, soprattutto, un meccanismo per il pagamento delle commissioni sulle transazioni. Per comodità e per evitare discussioni in futuro (vedi l'attuale dibattito su mBTC/uBTC/satoshi in Bitcoin), i tagli saranno predefiniti:

- 1: wei
- 10<sup>12</sup>: szabo
- 10<sup>15</sup>: finney
- 10<sup>18</sup>: ether

Deve essere considerata come una versione ampliata del concetto di "dollari" e "centesimi" o "BTC" e "satoshi". Nel prossimo futuro, prevediamo che l'ether verrà utilizzato per le transazioni ordinarie, il finney per le microtransazioni e lo szabo e il wei per discussioni tecniche su commissioni e implementazione del protocollo; i rimanenti tagli possono risultare utili in un secondo momento e non devono essere inclusi nei client in questo momento.

L'emissione avverrà secondo il seguente modello:

- L'ether sarà rilasciato in una vendita di valuta al prezzo di 1000-2000 ether per BTC, un meccanismo destinato a finanziare l'organizzazione Ethereum e a pagare lo sviluppo, utilizzato con successo su altre piattaforme come Mastercoin e NXT. Chi acquisterà nelle prime fasi beneficerà di sconti maggiori. I BTC ottenuti dalla vendita saranno utilizzati interamente per pagare stipendi e ricompense per gli sviluppatori e verranno investiti in vari progetti con e senza scopo di lucro nell'ecosistema di Ethereum e delle criptovalute.
- Lo 0,099x dell'importo totale venduto (60102216 ETH) sarà assegnato all'organizzazione per retribuire chi ha fornito un contributo nelle prime fasi e pagare le spese legate a ETH prima del blocco genesi.
- Lo 0,099x dell'importo totale venduto verrà mantenuto come riserva a lungo termine.
- Lo 0,26x dell'importo totale venduto sarà assegnato ai miner ogni anno per sempre dopo quel momento.

| Gruppo                          | Al lancio | Dopo 1 anno | Dopo 5 anni |
| ------------------------------- | --------- | ----------- | ----------- |
| Unità di valuta                 | 1,198X    | 1,458X      | 2,498X      |
| Acquirenti                      | 83,5%     | 68,6%       | 40,0%       |
| Riserva spesa pre-vendita       | 8,26%     | 6,79%       | 3,96%       |
| Riserva utilizzata post-vendita | 8,26%     | 6,79%       | 3,96%       |
| Miner                           | 0%        | 17,8%       | 52,0%       |

#### Tasso di crescita a lungo termine dell'offerta (in percentuale)

![Inflazione in Ethereum](./ethereum-inflation.png)

_Nonostante l'emissione lineare della valuta, come è avvenuto con Bitcoin, nel tempo il tasso di crescita dell'offerta tende comunque allo zero._

Le due scelte principali nel modello di cui sopra sono (1) l'esistenza e la dimensione di un pool di sovvenzioni e (2) l'esistenza di un'offerta lineare in continua crescita, anziché limitata come in Bitcoin. Il pool di sovvenzioni è giustificato come segue. Se non esistesse, e l'emissione lineare fosse ridotta a 0,217x per garantire un tasso di inflazione costante, la quantità totale di ether sarebbe inferiore del 16,5%, quindi ogni unità varrebbe il 19,8% in più. Di conseguenza, nell'equilibrio verrebbe acquistato il 19,8% in più di ether nella vendita, quindi ogni unità avrebbe di nuovo esattamente lo stesso valore che aveva in precedenza. L'organizzazione avrebbe inoltre 1,198x BTC, che si possono considerare come suddivisi in due parti: i BTC originali e l'ulteriore 0,198x. Quindi, questa situazione è _esattamente equivalente_ alla sovvenzione, ma con una differenza importante: l'organizzazione detiene puramente BTC e quindi non è incentivata a supportare il valore dell'unità ether.

Il modello di crescita lineare permanente dell'offerta riduce il rischio di quello che alcuni considerano un'eccessiva concentrazione di ricchezza in Bitcoin, e dà agli individui che vivono in epoche presenti e future un'equa possibilità di acquistare unità di valuta, assicurando allo stesso tempo un forte incentivo a ottenere e conservare ether, perché il "tasso di crescita dell'offerta" in percentuale nel tempo tende ancora a zero. Teorizziamo questo anche perché le monete vengono sempre perse nel tempo per negligenza, decesso, ecc, e la perdita di monete può essere modellata come percentuale dell'offerta totale annua, dove l'offerta totale di valuta in circolazione si stabilizzerà alla fine su un valore pari all'emissione annua diviso per il tasso di perdita (cioè con un tasso di perdita dell'1%, quando l'offerta raggiunge 26X, verrà eseguito il mining di 0.26X e 0.26X andrà perso ogni anno, creando un equilibrio).

Occorre notare che, in futuro, è probabile che Ethereum passerà a un modello proof-of-stake per motivi di sicurezza, riducendo l'obbligo di emissione a un valore compreso tra 0 e 0,05X l'anno. Nel caso in cui l'organizzazione Ethereum perda fondi o per qualsiasi altro motivo scompaia, lasciamo aperto un "contratto sociale": chiunque ha il diritto di creare un candidato futuro di Ethereum, all'unica condizione che la quantità di ether debba essere al massimo uguale a`60102216 * (1,198 + 0,26 * n)` dove `n` è il numero di anni dopo il blocco genesi. I creatori sono liberi di vendere tramite crowd-selling o assegnare in altro modo una parte o tutta la differenza tra l'espansione dell'offerta basata su PoS e l'espansione massima consentita dell'offerta per finanziare lo sviluppo. Gli upgrade candidati che non sono conformi al contratto sociale possono creare diramazioni giustificate verso versioni conformi.

### Centralizzazione del mining {#mining-centralization}

L'algoritmo di mining di Bitcoin si basa sul fatto che i miner calcolano SHA256 su versioni leggermente modificate dell'intestazione del blocco milioni di volte, in continuazione, fino a quando alla fine trovano un nodo con una versione di hash inferiore al target (attualmente circa 2<sup>192</sup>). Tuttavia, questo algoritmo di mining è vulnerabile a due forme di centralizzazione. In primo luogo, l'ecosistema di mining è attualmente dominato da ASIC (circuiti integrati specifici per applicazioni), chip di computer progettati specificamente per il mining su Bitcoin e quindi migliaia di volte più efficienti per questo compito. Significa che il mining su Bitcoin non è più un'attività altamente decentralizzata ed egualitaria, che richiede milioni di dollari di capitale per partecipare in modo efficace. In secondo luogo, la maggior parte dei miner Bitcoin non esegue realmente la convalida del blocco localmente, ma si basa su un pool di mining centralizzato che fornisce le intestazioni dei blocchi. Questo problema è probabilmente anche peggiore: mentre scriviamo il presente documento, i tre principali pool di mining controllano indirettamente circa il 50% della potenza di elaborazione nella rete Bitcoin, anche se questo è mitigato dal fatto che i miner possono passare ad altri pool di mining se un pool o una coalizione tenta un attacco del 51%.

L'intento corrente di Ethereum è di utilizzare un algoritmo di mining in cui i miner devono recuperare dati casuali dallo stato, calcolare alcune transazioni selezionate casualmente dagli ultimi N blocchi della blockchain e restituire l'hash del risultato. Questo ha due vantaggi importanti. In primo luogo, i contratti Ethereum possono includere qualsiasi tipo di calcolo, quindi un ASIC Ethereum sarebbe essenzialmente un ASIC per il calcolo generale, cioè una CPU migliore. In secondo luogo, il mining richiede l'accesso all'intera blockchain e costringe quindi i miner a memorizzare l'intera blockchain e ad essere almeno in grado di verificare ogni transazione. Ciò elimina la necessità di avere pool di mining centralizzati. Anche se i pool di mining possono comunque svolgere il ruolo legittimo di uniformare la casualità della distribuzione delle ricompense, questa funzione può essere svolta altrettanto bene da pool peer-to-peer senza controllo centrale.

Questo modello non è testato e si possono presentare difficoltà lungo il percorso per evitare determinate ottimizzazioni intelligenti quando si utilizza l'esecuzione del contratto come algoritmo di mining. Tuttavia, una caratteristica particolarmente interessante di questo algoritmo è che permette a chiunque di "avvelenare il pozzo", introducendo un gran numero di contratti nella blockchain appositamente progettati per ostacolare determinati ASIC. I produttori di ASIC sono incentivati economicamente a utilizzare un trucco di questo tipo per attaccarsi a vicenda. Per questo motivo, la soluzione che stiamo sviluppando è in ultima analisi una soluzione economica adattabile piuttosto che puramente tecnica.

### Scalabilità {#scalability}

Una problematica sollevata spesso in riferimento a Ethereum è la questione della scalabilità. Come Bitcoin, Ethereum ha lo svantaggio che ogni transazione deve essere elaborata da ogni nodo della rete. Con Bitcoin, la dimensione della blockchain corrente rimane a circa 15 GB, e cresce di circa 1 MB all'ora. Se la rete Bitcoin dovesse elaborare le 2.000 transazioni al secondo di Visa, crescerebbe di 1 MB ogni tre secondi (1 GB all'ora, 8 TB all'anno). È probabile che Ethereum sperimenti un modello di crescita simile, peggiorato dal fatto che ci saranno molte applicazioni basate sulla blockchain Ethereum e non solo una valuta, come nel caso di Bitcoin, ma migliorato dal fatto che i nodi completi di Ethereum devono memorizzare solo lo stato e non l'intera cronologia della blockchain.

Il problema legato a una dimensione della blockchain così elevata è il rischio di centralizzazione. Se la dimensione della blockchain aumenta ad esempio a 100 TB, lo scenario probabile sarebbe che solo un numero molto esiguo di grandi imprese eseguirebbe nodi completi, mentre tutti gli utenti abituali utilizzerebbero nodi SPV leggeri. In una situazione del genere, si presenta il problema potenziale che i nodi completi potrebbero aggregarsi e accordarsi per aggirare il sistema in qualche modo redditizio (ad esempio cambiando la ricompensa del blocco e attribuendosi BTC). I nodi leggeri non avrebbero modo di rilevare immediatamente la situazione. Certo, probabilmente esisterebbe almeno un full node onesto, e dopo poche ore le informazioni sulla frode uscirebbero attraverso canali come Reddit, ma a quel punto sarebbe troppo tardi: spetterebbe agli utenti ordinari organizzare uno sforzo per inserire nella lista nera i blocchi dati, un problema di coordinamento enorme e probabilmente irrealizzabile su una scala simile a quella di portare a termine un attacco riuscito del 51%. Nel caso di Bitcoin, questo è attualmente un problema, ma esiste una modifica della blockchain [suggerita da Peter Todd](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/) che allevierà il problema.

A breve termine, Ethereum utilizzerà due strategie aggiuntive per affrontare il problema. In primo luogo, a causa degli algoritmi di mining basati sulla blockchain, almeno ogni miner sarà costretto a essere un nodo completo, creando un limite inferiore al numero di nodi completi. In secondo luogo, ancora più importante, includeremo una radice intermedia dell'albero di stati nella blockchain dopo l'elaborazione di ogni transazione. Anche se la convalida dei blocchi è centralizzata, a patto che sia presente un nodo di verifica onesto, il problema della centralizzazione può essere aggirato tramite un protocollo di verifica. Se un miner pubblica un blocco non valido, questo blocco o è formattato in modo scorretto oppure lo stato `S[n]` non è corretto. Dal momento che `S[0]` è sempre corretto, ci deve essere un primo stato `S[i]` errato, dove `S[i-1]` è corretto. Il nodo di verifica fornirebbe l'indice `i`, insieme a una "prova di non validità" costituita dal sottoinsieme dei nodi del "Patricia tree" che devono elaborare `APPLY(S[i-1], X[i]) -> S[i]`. I nodi potrebbero usare i suddetti nodi per eseguire quella parte del calcolo e notare che il valore `S[i]` generato non corrisponde al valore `S[i]` fornito.

Un altro attacco più sofisticato coinvolgerebbe miner malintenzionati che pubblicano blocchi incompleti. In questo caso non esistono nemmeno informazioni complete per determinare se i blocchi sono validi o meno. La soluzione a questo problema è un protocollo challenge-response: nodi di verifica emettono "challenge" sotto forma di indici delle transazioni target; al ricevimento di un nodo, un nodo leggero considera il blocco non attendibile fino a quando un altro nodo, il miner o un altro autore della verifica, fornisce un sottoinsieme dei nodi di Patricia come prova di validità.

## Conclusioni {#conclusion}

Il protocollo Ethereum è stato concepito originariamente come una versione aggiornata di una criptovaluta, che fornisce funzionalità avanzate come deposito sulla blockchain, limiti di prelievo, contratti finanziari, mercati per il gioco d'azzardo e simili attraverso un linguaggio di programmazione altamente generalizzato. Il protocollo Ethereum non "supporta" direttamente nessuna delle applicazioni, ma l'esistenza di un linguaggio di programmazione Turing equivalente significa che possono essere creati contratti arbitrari teoricamente per qualsiasi tipo di transazione o applicazione. L'aspetto più interessante di Ethereum, però, è che il protocollo va oltre la valuta. Protocolli che riguardano l'archivio decentralizzato di file, il calcolo decentralizzato e i mercati predittivi decentralizzati, tra decine di altri concetti, hanno il potenziale di aumentare sostanzialmente l'efficienza dell'industria del calcolo e fornire un'enorme spinta ad altri protocolli peer-to-peer aggiungendo per la prima volta un livello di natura economica. Per concludere, è presente anche una gamma notevole di applicazioni che non hanno nulla a che fare con il denaro.

Il concetto di funzione di transizione arbitraria tra stati implementato dal protocollo di Ethereum fornisce una piattaforma con un potenziale unico; anziché essere un protocollo chiuso e con un unico scopo, pensato per una gamma specifica di applicazioni di archiviazione dei dati, gioco d'azzardo o finanza, Ethereum è aperto per natura e crediamo che sia altamente idoneo per essere utilizzato nei prossimi anni come base per moltissimi protocolli di natura finanziaria e non.

## Note e articoli per approfondire {#notes-and-further-reading}

### Note {#notes}

1. Un lettore con esperienza potrebbe notare che in realtà un indirizzo Bitcoin è l'hash della chiave pubblica della curva ellittica e non la chiave pubblica stessa. Tuttavia, in realtà è perfettamente legittimo dal punto di vista della terminologia della crittografia fare riferimento all'hash della chiave pubblica come alla chiave pubblica stessa. Questo perché la crittografia di Bitcoin può essere considerata un algoritmo di firma digitale personalizzato, in cui la chiave pubblica è costituita dall'hash della chiave pubblica ECC, la firma è costituita dalla chiave pubblica ECC concatenata con la firma ECC e l'algoritmo di verifica prevede il controllo della chiave pubblica ECC nella firma rispetto all'hash della chiave pubblica ECC, fornito come chiave pubblica e quindi verificando la firma ECC rispetto alla chiave pubblica ECC.
2. Tecnicamente, la mediana degli 11 blocchi precedenti.
3. Internamente, sia 2 che "CHARLIE" sono numeri<sup>[fn3](#notes)</sup>, con quest'ultimo nella rappresentazione di base 256 big-endian. I numeri possono essere da 0 a 2<sup>256</sup>-1.

### Letture consigliate {#further-reading}

1. [Valore intrinseco](http://bitcoinmagazine.com/8640/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it/)
2. [Proprietà intelligente](https://en.bitcoin.it/wiki/Smart_Property)
3. [Contratti intelligenti](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](http://www.weidai.com/bmoney.txt)
5. [Proof-of-work riutilizzabili](https://nakamotoinstitute.org/finney/rpow/)
6. [Titoli di proprietà sicuri con l'autorità del proprietario](https://nakamotoinstitute.org/secure-property-titles/)
7. [Whitepaper Bitcoin](http://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Triangolo di Zooko](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Whitepaper Colored coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Whitepaper Mastercoin](https://github.com/mastercoin-MSC/spec)
12. [Aziende autonome decentralizzate, Bitcoin Magazine](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Verifica del pagamento semplificata](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Albero di Merkle](https://wikipedia.org/wiki/Merkle_tree)
15. [Patricia tree](https://wikipedia.org/wiki/Patricia_tree)
16. [GHOST](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ e agenti autonomi, Jeff Garzik](http://garzikrants.blogspot.ca/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Mike Hearn sulla proprietà intelligente al Turing Festival](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [Ethereum RLP](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-RLP)
20. [Alberi di Merkle e Patricia di Ethereum](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-Patricia-Tree)
21. [Peter Todd sugli alberi della somma Merkle](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_Per la storia del whitepaper, vedere [questo wiki](https://github.com/ethereum/wiki/blob/old-before-deleting-all-files-go-to-wiki-wiki-instead/old-whitepaper-for-historical-reference.md)._

_Ethereum, come molti progetti di software open source basati su una comunità, si è evoluto dal suo lancio iniziale. Per conoscere gli ultimi sviluppi di Ethereum e come vengono apportate modifiche al protocollo, consigliamo di consultare [questa guida](/learn/)._
