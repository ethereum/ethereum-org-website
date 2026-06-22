---
title: Whitepaper di Ethereum
description: Un documento introduttivo a Ethereum, pubblicato nel 2013 prima del suo lancio.
lang: it
sidebarDepth: 2
hideEditButton: true
authors: ["Vitalik Buterin"]
---

<WhitepaperBridge />

_Sebbene abbia diversi anni, manteniamo il documento originale qui sotto perché continua a fungere da utile riferimento e da rappresentazione accurata di [Ethereum](/) e della sua visione._

## Una piattaforma di nuova generazione per smart contract e applicazioni decentralizzate (dapp) {#a-next-generation-smart-contract-and-decentralized-application-platform}

Lo sviluppo di Bitcoin da parte di Satoshi Nakamoto nel 2009 è stato spesso acclamato come uno sviluppo radicale nel campo del denaro e della valuta, essendo il primo esempio di asset digitale che simultaneamente non ha alcun supporto o "[valore intrinseco](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)" e nessun emittente o controllore centralizzato. Tuttavia, un'altra parte, probabilmente più importante, dell'esperimento Bitcoin è la tecnologia blockchain sottostante come strumento di consenso distribuito, e l'attenzione sta rapidamente iniziando a spostarsi su questo altro aspetto di Bitcoin. Le applicazioni alternative comunemente citate della tecnologia blockchain includono l'utilizzo di asset digitali sulla blockchain per rappresentare valute personalizzate e strumenti finanziari ("[colored coin](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)"), la proprietà di un dispositivo fisico sottostante ("[smart property](https://en.bitcoin.it/wiki/Smart_Property)"), asset non fungibili come i nomi di dominio ("[Namecoin](http://namecoin.org)"), nonché applicazioni più complesse che prevedono che gli asset digitali siano controllati direttamente da una porzione di codice che implementa regole arbitrarie ("[smart contract](http://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/idea.html)") o persino "[organizzazioni autonome decentralizzate](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)" (DAO) basate su blockchain. Ciò che Ethereum intende fornire è una blockchain con un linguaggio di programmazione Turing-completo a tutti gli effetti integrato, che può essere utilizzato per creare "contratti" in grado di codificare funzioni di transizione di stato arbitrarie, consentendo agli utenti di creare qualsiasi sistema descritto in precedenza, così come molti altri che non abbiamo ancora immaginato, semplicemente scrivendo la logica in poche righe di codice.

## Introduzione a Bitcoin e ai concetti esistenti {#introduction-to-bitcoin-and-existing-concepts}

### Storia {#history}

Il concetto di valuta digitale decentralizzata, così come le applicazioni alternative come i registri di proprietà, esiste da decenni. I protocolli anonimi di e-cash degli anni '80 e '90, per lo più basati su una primitiva crittografica nota come firma cieca di Chaum (Chaumian blinding), fornivano una valuta con un alto grado di privacy, ma i protocolli non riuscirono in gran parte a prendere piede a causa della loro dipendenza da un intermediario centralizzato. Nel 1998, [b-money](http://www.weidai.com/bmoney.txt) di Wei Dai divenne la prima proposta a introdurre l'idea di creare denaro attraverso la risoluzione di enigmi computazionali e il consenso decentralizzato, ma la proposta era carente di dettagli su come il consenso decentralizzato potesse essere effettivamente implementato. Nel 2005, Hal Finney introdusse il concetto di "[prove di lavoro riutilizzabili](https://nakamotoinstitute.org/finney/rpow/)", un sistema che utilizza idee di b-money insieme ai complessi enigmi computazionali Hashcash di Adam Back per creare il concetto di criptovaluta, ma ancora una volta non raggiunse l'ideale affidandosi al trusted computing come backend. Nel 2009, una valuta decentralizzata fu implementata in pratica per la prima volta da Satoshi Nakamoto, combinando primitive consolidate per la gestione della proprietà attraverso la crittografia a chiave pubblica con un algoritmo di consenso per tenere traccia di chi possiede le monete, noto come "Prova di lavoro (PoW)".

Il meccanismo alla base della Prova di lavoro (PoW) è stato una svolta nel settore perché ha risolto simultaneamente due problemi. In primo luogo, ha fornito un algoritmo di consenso semplice e moderatamente efficace, consentendo ai nodi della rete di concordare collettivamente su una serie di aggiornamenti canonici allo stato del registro di Bitcoin. In secondo luogo, ha fornito un meccanismo per consentire il libero ingresso nel processo di consenso, risolvendo il problema politico di decidere chi può influenzare il consenso, prevenendo al contempo gli attacchi Sybil. Lo fa sostituendo una barriera formale alla partecipazione, come il requisito di essere registrati come entità unica in una particolare lista, con una barriera economica: il peso di un singolo nodo nel processo di voto del consenso è direttamente proporzionale alla potenza di calcolo che il nodo apporta. Da allora, è stato proposto un approccio alternativo chiamato _Proof-of-Stake (PoS)_, che calcola il peso di un nodo in modo proporzionale alle sue disponibilità di valuta e non alle risorse computazionali; la discussione sui relativi meriti dei due approcci esula dallo scopo di questo documento, ma va notato che entrambi gli approcci possono essere utilizzati come spina dorsale di una criptovaluta.

### Bitcoin come sistema di transizione di stato {#bitcoin-as-a-state-transition-system}

![Ethereum state transition](./ethereum-state-transition.png)

Da un punto di vista tecnico, il registro di una criptovaluta come Bitcoin può essere pensato come un sistema di transizione di stato, in cui c'è uno "stato" costituito dallo stato di proprietà di tutti i bitcoin esistenti e una "funzione di transizione di stato" che prende uno stato e una transazione e restituisce un nuovo stato che ne è il risultato. In un sistema bancario standard, ad esempio, lo stato è un bilancio, una transazione è una richiesta di spostare $X da A a B e la funzione di transizione di stato riduce il valore nell'account di A di $X e aumenta il valore nell'account di B di $X. Se l'account di A ha meno di $X in primo luogo, la funzione di transizione di stato restituisce un errore. Quindi, si può definire formalmente:

```
APPLY(S,TX) -> S' or ERROR
```

Nel sistema bancario definito sopra:

```js
APPLY({ Alice: $50, Bob: $50 },"send $20 from Alice to Bob") = { Alice: $30, Bob: $70 }
```

Ma:

```js
APPLY({ Alice: $50, Bob: $50 },"send $70 from Alice to Bob") = ERROR
```

Lo "stato" in Bitcoin è l'insieme di tutte le monete (tecnicamente, "output di transazione non spesi" o UTXO) che sono state coniate e non ancora spese, dove ogni UTXO ha un taglio e un proprietario (definito da un indirizzo di 20 byte che è essenzialmente una chiave pubblica crittografica<sup>[fn1](#notes)</sup>). Una transazione contiene uno o più input, dove ogni input contiene un riferimento a un UTXO esistente e una firma crittografica prodotta dalla chiave privata associata all'indirizzo del proprietario, e uno o più output, dove ogni output contiene un nuovo UTXO da aggiungere allo stato.

La funzione di transizione di stato `APPLY(S,TX) -> S'` può essere definita approssimativamente come segue:

<ol>
  <li>
    Per ogni input in <code>TX</code>:
    <ul>
    <li>
        Se l'UTXO di riferimento non è in <code>S</code>, restituisci un errore.
    </li>
    <li>
        Se la firma fornita non corrisponde al proprietario dell'UTXO, restituisci un errore.
    </li>
    </ul>
  </li>
  <li>
    Se la somma dei tagli di tutti gli UTXO di input è inferiore alla somma dei tagli di tutti gli UTXO di output, restituisci un errore.
  </li>
  <li>
    Restituisci <code>S</code> con tutti gli UTXO di input rimossi e tutti gli UTXO di output aggiunti.
  </li>
</ol>

La prima metà del primo passaggio impedisce ai mittenti delle transazioni di spendere monete che non esistono, la seconda metà del primo passaggio impedisce ai mittenti delle transazioni di spendere le monete di altre persone e il secondo passaggio impone la conservazione del valore. Per utilizzare questo sistema per i pagamenti, il protocollo è il seguente. Supponiamo che Alice voglia inviare 11,7 BTC a Bob. Per prima cosa, Alice cercherà un insieme di UTXO disponibili di sua proprietà che totalizzino almeno 11,7 BTC. Realisticamente, Alice non sarà in grado di ottenere esattamente 11,7 BTC; supponiamo che il minimo che possa ottenere sia 6+4+2=12. Crea quindi una transazione con quei tre input e due output. Il primo output sarà di 11,7 BTC con l'indirizzo di Bob come proprietario, e il secondo output sarà il restante "resto" di 0,3 BTC, con la stessa Alice come proprietaria.

### Minaggio {#mining}

![Ethereum blocks](./ethereum-blocks.png)

Se avessimo accesso a un servizio centralizzato affidabile, questo sistema sarebbe banale da implementare; potrebbe semplicemente essere codificato esattamente come descritto, utilizzando il disco rigido di un server centralizzato per tenere traccia dello stato. Tuttavia, con Bitcoin stiamo cercando di costruire un sistema di valuta decentralizzato, quindi dovremo combinare il sistema di transizione di stato con un sistema di consenso per garantire che tutti siano d'accordo sull'ordine delle transazioni. Il processo di consenso decentralizzato di Bitcoin richiede che i nodi della rete tentino continuamente di produrre pacchetti di transazioni chiamati "blocchi". La rete è progettata per produrre all'incirca un blocco ogni dieci minuti, dove ogni blocco contiene un timestamp, un nonce, un riferimento (ovvero l'hash) al blocco precedente e un elenco di tutte le transazioni avvenute dal blocco precedente. Nel tempo, questo crea una "blockchain" persistente e in continua crescita che si aggiorna costantemente per rappresentare l'ultimo stato del registro di Bitcoin.

L'algoritmo per verificare se un blocco è valido, espresso in questo paradigma, è il seguente:

1. Verifica se il blocco precedente a cui fa riferimento il blocco esiste ed è valido.
2. Verifica che il timestamp del blocco sia maggiore di quello del blocco precedente<sup>[fn2](#notes)</sup> e inferiore a 2 ore nel futuro.
3. Verifica che la Prova di lavoro (PoW) sul blocco sia valida.
4. Sia `S[0]` lo stato alla fine del blocco precedente.
5. Supponiamo che `TX` sia l'elenco delle transazioni del blocco con `n` transazioni. Per tutti i `i` in `0...n-1`, imposta `S[i+1] = APPLY(S[i],TX[i])` Se un'applicazione restituisce un errore, esci e restituisci falso.
6. Restituisci vero e registra `S[n]` come stato alla fine di questo blocco.

Essenzialmente, ogni transazione nel blocco deve fornire una transizione di stato valida da quello che era lo stato canonico prima dell'esecuzione della transazione a un nuovo stato. Nota che lo stato non è codificato nel blocco in alcun modo; è puramente un'astrazione che deve essere ricordata dal nodo di validazione e può essere calcolata (in modo sicuro) per qualsiasi blocco solo partendo dallo stato genesi e applicando in sequenza ogni transazione in ogni blocco. Inoltre, nota che l'ordine in cui il minatore include le transazioni nel blocco è importante; se ci sono due transazioni A e B in un blocco tali che B spende un UTXO creato da A, allora il blocco sarà valido se A viene prima di B, ma non altrimenti.

L'unica condizione di validità presente nell'elenco precedente che non si trova in altri sistemi è il requisito della "Prova di lavoro (PoW)". La condizione precisa è che il doppio hash SHA-256 di ogni blocco, trattato come un numero a 256 bit, deve essere inferiore a un obiettivo regolato dinamicamente, che al momento in cui scriviamo è di circa 2<sup>187</sup>. Lo scopo di questo è rendere la creazione dei blocchi computazionalmente "difficile", impedendo così agli aggressori Sybil di rifare l'intera blockchain a loro favore. Poiché SHA-256 è progettato per essere una funzione pseudo-casuale completamente imprevedibile, l'unico modo per creare un blocco valido è semplicemente procedere per tentativi ed errori, incrementando ripetutamente il nonce e verificando se il nuovo hash corrisponde.

All'obiettivo attuale di ~2<sup>187</sup>, la rete deve fare in media ~2<sup>69</sup> tentativi prima di trovare un blocco valido; in generale, l'obiettivo viene ricalibrato dalla rete ogni 2016 blocchi in modo che in media un nuovo blocco venga prodotto da qualche nodo nella rete ogni dieci minuti. Per compensare i minatori per questo lavoro computazionale, il minatore di ogni blocco ha il diritto di includere una transazione che gli conferisce 25 BTC dal nulla. Inoltre, se una transazione ha un taglio totale maggiore nei suoi input rispetto ai suoi output, anche la differenza va al minatore come "commissione di transazione". Per inciso, questo è anche l'unico meccanismo attraverso il quale vengono emessi i BTC; lo stato genesi non conteneva alcuna moneta.

Per comprendere meglio lo scopo del minaggio, esaminiamo cosa succede in caso di un aggressore malintenzionato. Poiché la crittografia sottostante di Bitcoin è nota per essere sicura, l'aggressore prenderà di mira l'unica parte del sistema Bitcoin che non è protetta direttamente dalla crittografia: l'ordine delle transazioni. La strategia dell'aggressore è semplice:

1. Inviare 100 BTC a un commerciante in cambio di un prodotto (preferibilmente un bene digitale a consegna rapida).
2. Attendere la consegna del prodotto.
3. Produrre un'altra transazione inviando gli stessi 100 BTC a se stesso.
4. Cercare di convincere la rete che la sua transazione verso se stesso è stata quella arrivata per prima.

Una volta avvenuto il passaggio (1), dopo pochi minuti qualche minatore includerà la transazione in un blocco, diciamo il blocco numero 270000. Dopo circa un'ora, altri cinque blocchi saranno stati aggiunti alla catena dopo quel blocco, e ciascuno di questi blocchi punterà indirettamente alla transazione, "confermandola". A questo punto, il commerciante accetterà il pagamento come finalizzato e consegnerà il prodotto; poiché stiamo supponendo che si tratti di un bene digitale, la consegna è istantanea. Ora, l'aggressore crea un'altra transazione inviando i 100 BTC a se stesso. Se l'aggressore la rilasciasse semplicemente in rete, la transazione non verrebbe elaborata; i minatori tenterebbero di eseguire `APPLY(S,TX)` e noterebbero che `TX` consuma un UTXO che non è più nello stato. Quindi, invece, l'aggressore crea un "fork" della blockchain, iniziando a minare un'altra versione del blocco 270000 che punta allo stesso blocco 269999 come genitore, ma con la nuova transazione al posto di quella vecchia. Poiché i dati del blocco sono diversi, ciò richiede di rifare la Prova di lavoro (PoW). Inoltre, la nuova versione del blocco 270000 dell'aggressore ha un hash diverso, quindi i blocchi originali dal 270001 al 270005 non "puntano" ad esso; di conseguenza, la catena originale e la nuova catena dell'aggressore sono completamente separate. La regola è che in un fork la blockchain più lunga è considerata la verità, e quindi i minatori legittimi lavoreranno sulla catena 270005 mentre l'aggressore da solo lavorerà sulla catena 270000. Affinché l'aggressore renda la sua blockchain la più lunga, avrebbe bisogno di avere più potenza di calcolo rispetto al resto della rete combinata per recuperare il ritardo (da qui, "attacco del 51%").

### Alberi di Merkle {#merkle-trees}

![SPV in Bitcoin](./spv-bitcoin.png)

_A sinistra: è sufficiente presentare solo un piccolo numero di nodi in un albero di Merkle per fornire una prova della validità di un ramo._

_A destra: qualsiasi tentativo di modificare una qualsiasi parte dell'albero di Merkle porterà inevitabilmente a un'incoerenza da qualche parte lungo la catena._

Un'importante caratteristica di scalabilità di Bitcoin è che il blocco è archiviato in una struttura dati multilivello. L'"hash" di un blocco è in realtà solo l'hash dell'intestazione del blocco, un pezzo di dati di circa 200 byte che contiene il timestamp, il nonce, l'hash del blocco precedente e l'hash radice di una struttura dati chiamata albero di Merkle che memorizza tutte le transazioni nel blocco. Un albero di Merkle è un tipo di albero binario, composto da un insieme di nodi con un gran numero di nodi foglia nella parte inferiore dell'albero contenenti i dati sottostanti, un insieme di nodi intermedi in cui ogni nodo è l'hash dei suoi due figli e infine un singolo nodo radice, anch'esso formato dall'hash dei suoi due figli, che rappresenta la "cima" dell'albero. Lo scopo dell'albero di Merkle è consentire che i dati in un blocco vengano consegnati in modo frammentato: un nodo può scaricare solo l'intestazione di un blocco da una fonte, la piccola parte dell'albero a lui rilevante da un'altra fonte, ed essere comunque certo che tutti i dati siano corretti. Il motivo per cui questo funziona è che gli hash si propagano verso l'alto: se un utente malintenzionato tenta di scambiare una transazione falsa nella parte inferiore di un albero di Merkle, questa modifica causerà una modifica nel nodo superiore, e poi una modifica nel nodo ancora superiore, modificando infine la radice dell'albero e quindi l'hash del blocco, facendo sì che il protocollo lo registri come un blocco completamente diverso (quasi certamente con una Prova di lavoro (PoW) non valida).

Il protocollo dell'albero di Merkle è probabilmente essenziale per la sostenibilità a lungo termine. Un "nodo completo" nella rete Bitcoin, uno che archivia ed elabora l'interezza di ogni blocco, occupa circa 15 GB di spazio su disco nella rete Bitcoin ad aprile 2014 e cresce di oltre un gigabyte al mese. Attualmente, questo è fattibile per alcuni computer desktop e non per i telefoni, e in futuro solo le aziende e gli hobbisti saranno in grado di partecipare. Un protocollo noto come "verifica di pagamento semplificata" (SPV) consente l'esistenza di un'altra classe di nodi, chiamati "nodi leggeri", che scaricano le intestazioni dei blocchi, verificano la Prova di lavoro (PoW) sulle intestazioni dei blocchi e quindi scaricano solo i "rami" associati alle transazioni che sono rilevanti per loro. Ciò consente ai nodi leggeri di determinare con una forte garanzia di sicurezza quale sia lo stato di qualsiasi transazione Bitcoin e il loro saldo attuale, scaricando solo una porzione molto piccola dell'intera blockchain.

### Applicazioni alternative della blockchain {#alternative-blockchain-applications}

Anche l'idea di prendere il concetto alla base della blockchain e applicarlo ad altri concetti ha una lunga storia. Nel 2005, Nick Szabo ha presentato il concetto di "[titoli di proprietà sicuri con l'autorità del proprietario](https://nakamotoinstitute.org/library/secure-property-titles/)", un documento che descrive come i "nuovi progressi nella tecnologia dei database replicati" consentiranno un sistema basato su blockchain per l'archiviazione di un registro di chi possiede quale terreno, creando un quadro elaborato che include concetti come l'assegnazione di terre (homesteading), l'usucapione e l'imposta fondiaria georgiana. Tuttavia, all'epoca purtroppo non era disponibile alcun sistema di database replicato efficace, e quindi il protocollo non fu mai implementato in pratica. Dopo il 2009, tuttavia, una volta sviluppato il consenso decentralizzato di Bitcoin, iniziarono a emergere rapidamente una serie di applicazioni alternative.

- **Namecoin** - creato nel 2010, [Namecoin](https://namecoin.org/) è meglio descritto come un database di registrazione dei nomi decentralizzato. Nei protocolli decentralizzati come Tor, Bitcoin e BitMessage, deve esserci un modo per identificare gli account in modo che altre persone possano interagire con essi, ma in tutte le soluzioni esistenti l'unico tipo di identificatore disponibile è un hash pseudo-casuale come `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. Idealmente, si vorrebbe poter avere un account con un nome come "george". Tuttavia, il problema è che se una persona può creare un account chiamato "george", qualcun altro può utilizzare lo stesso processo per registrare "george" anche per sé e impersonarla. L'unica soluzione è un paradigma "first-to-file" (il primo che deposita), in cui il primo registrante ha successo e il secondo fallisce: un problema perfettamente adatto al protocollo di consenso di Bitcoin. Namecoin è l'implementazione più vecchia e di maggior successo di un sistema di registrazione dei nomi che utilizza tale idea.
- **Colored coins** - lo scopo dei [colored coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) è fungere da protocollo per consentire alle persone di creare le proprie valute digitali o, nell'importante caso banale di una valuta con una sola unità, token digitali, sulla blockchain di Bitcoin. Nel protocollo dei colored coins, si "emette" una nuova valuta assegnando pubblicamente un colore a uno specifico UTXO di Bitcoin, e il protocollo definisce ricorsivamente il colore di altri UTXO in modo che sia lo stesso del colore degli input spesi dalla transazione che li ha creati (si applicano alcune regole speciali nel caso di input di colori misti). Ciò consente agli utenti di mantenere portafogli contenenti solo UTXO di un colore specifico e di inviarli in giro in modo molto simile ai normali bitcoin, risalendo attraverso la blockchain per determinare il colore di qualsiasi UTXO che ricevono.
- **Metacoin** - l'idea alla base di un metacoin è avere un protocollo che vive sopra Bitcoin, utilizzando le transazioni Bitcoin per archiviare le transazioni metacoin ma avendo una diversa funzione di transizione di stato, `APPLY'`. Poiché il protocollo metacoin non può impedire che transazioni metacoin non valide appaiano nella blockchain di Bitcoin, viene aggiunta una regola secondo cui se `APPLY'(S,TX)` restituisce un errore, il protocollo passa per impostazione predefinita a `APPLY'(S,TX) = S`. Ciò fornisce un meccanismo semplice per creare un protocollo di criptovaluta arbitrario, potenzialmente con funzionalità avanzate che non possono essere implementate all'interno di Bitcoin stesso, ma con un costo di sviluppo molto basso poiché le complessità del minaggio e della rete sono già gestite dal protocollo Bitcoin. I metacoin sono stati utilizzati per implementare alcune classi di contratti finanziari, la registrazione dei nomi e lo scambio decentralizzato.

Pertanto, in generale, ci sono due approcci per costruire un protocollo di consenso: costruire una rete indipendente e costruire un protocollo sopra Bitcoin. Il primo approccio, sebbene ragionevolmente di successo nel caso di applicazioni come Namecoin, è difficile da implementare; ogni singola implementazione deve avviare una blockchain indipendente, oltre a costruire e testare tutto il codice di transizione di stato e di rete necessario. Inoltre, prevediamo che l'insieme di applicazioni per la tecnologia del consenso decentralizzato seguirà una distribuzione a legge di potenza in cui la stragrande maggioranza delle applicazioni sarebbe troppo piccola per giustificare la propria blockchain, e notiamo che esistono ampie classi di applicazioni decentralizzate, in particolare le organizzazioni autonome decentralizzate, che devono interagire tra loro.

L'approccio basato su Bitcoin, d'altra parte, ha il difetto di non ereditare le funzionalità di verifica di pagamento semplificata di Bitcoin. L'SPV funziona per Bitcoin perché può utilizzare la profondità della blockchain come proxy per la validità; a un certo punto, una volta che gli antenati di una transazione risalgono abbastanza indietro, è sicuro affermare che facevano legittimamente parte dello stato. I meta-protocolli basati su blockchain, d'altra parte, non possono forzare la blockchain a non includere transazioni che non sono valide nel contesto dei propri protocolli. Quindi, un'implementazione di meta-protocollo SPV completamente sicura dovrebbe eseguire una scansione a ritroso fino all'inizio della blockchain di Bitcoin per determinare se determinate transazioni siano valide o meno. Attualmente, tutte le implementazioni "leggere" di meta-protocolli basati su Bitcoin si affidano a un server fidato per fornire i dati, un risultato probabilmente molto subottimale, specialmente quando uno degli scopi principali di una criptovaluta è eliminare la necessità di fiducia.

### Scripting {#scripting}

Anche senza alcuna estensione, il protocollo Bitcoin in realtà facilita una versione debole del concetto di "smart contract". Gli UTXO in Bitcoin possono essere posseduti non solo da una chiave pubblica, ma anche da uno script più complicato espresso in un semplice linguaggio di programmazione basato su stack. In questo paradigma, una transazione che spende quell'UTXO deve fornire dati che soddisfino lo script. In effetti, anche il meccanismo di base della proprietà della chiave pubblica è implementato tramite uno script: lo script prende in input una firma a curva ellittica, la verifica rispetto alla transazione e all'indirizzo che possiede l'UTXO e restituisce 1 se la verifica ha esito positivo e 0 altrimenti. Esistono altri script più complicati per vari casi d'uso aggiuntivi. Ad esempio, si può costruire uno script che richiede le firme di due su tre chiavi private fornite per la convalida ("multisig"), una configurazione utile per account aziendali, conti di risparmio sicuri e alcune situazioni di deposito a garanzia (escrow) per i commercianti. Gli script possono anche essere utilizzati per pagare taglie per soluzioni a problemi computazionali, e si può persino costruire uno script che dice qualcosa come "questo UTXO di Bitcoin è tuo se puoi fornire una prova SPV di avermi inviato una transazione Dogecoin di questo taglio", consentendo essenzialmente lo scambio decentralizzato tra criptovalute.

Tuttavia, il linguaggio di scripting implementato in Bitcoin presenta diverse limitazioni importanti:

- **Mancanza di Turing-completezza** - vale a dire, sebbene ci sia un ampio sottoinsieme di calcoli che il linguaggio di scripting di Bitcoin supporta, non supporta quasi tutto. La categoria principale mancante sono i cicli (loop). Questo viene fatto per evitare cicli infiniti durante la verifica delle transazioni; teoricamente è un ostacolo superabile per i programmatori di script, poiché qualsiasi ciclo può essere simulato semplicemente ripetendo il codice sottostante molte volte con un'istruzione if, ma porta a script che sono molto inefficienti in termini di spazio. Ad esempio, l'implementazione di un algoritmo di firma a curva ellittica alternativo richiederebbe probabilmente 256 cicli di moltiplicazione ripetuti, tutti inclusi individualmente nel codice.
- **Cecità al valore (Value-blindness)** - non c'è modo per uno script UTXO di fornire un controllo granulare sull'importo che può essere prelevato. Ad esempio, un potente caso d'uso di un contratto oracolo sarebbe un contratto di copertura (hedging), in cui A e B inseriscono $1000 in BTC e dopo 30 giorni lo script invia $1000 in BTC ad A e il resto a B. Ciò richiederebbe un oracolo per determinare il valore di 1 BTC in USD, ma anche in questo caso si tratta di un enorme miglioramento in termini di fiducia e requisiti infrastrutturali rispetto alle soluzioni completamente centralizzate attualmente disponibili. Tuttavia, poiché gli UTXO sono tutto o niente, l'unico modo per ottenere questo risultato è attraverso l'espediente molto inefficiente di avere molti UTXO di vari tagli (ad esempio, un UTXO di 2<sup>k</sup> per ogni k fino a 30) e far scegliere all'oracolo quali UTXO inviare ad A e quali a B.
- **Mancanza di stato** - gli UTXO possono essere spesi o non spesi; non c'è opportunità per contratti o script a più fasi che mantengano qualsiasi altro stato interno oltre a questo. Ciò rende difficile creare contratti di opzioni a più fasi, offerte di scambio decentralizzate o protocolli di commitment crittografico a due fasi (necessari per taglie computazionali sicure). Significa anche che gli UTXO possono essere utilizzati solo per costruire contratti semplici e una tantum e non contratti "stateful" (con stato) più complessi come le organizzazioni decentralizzate, e rende difficile l'implementazione dei meta-protocolli. Lo stato binario combinato con la cecità al valore significa anche che un'altra importante applicazione, i limiti di prelievo, è impossibile.
- **Cecità alla blockchain (Blockchain-blindness)** - gli UTXO sono ciechi ai dati della blockchain come il nonce, il timestamp e l'hash del blocco precedente. Ciò limita gravemente le applicazioni nel gioco d'azzardo e in diverse altre categorie, privando il linguaggio di scripting di una fonte di casualità potenzialmente preziosa.

Pertanto, vediamo tre approcci per costruire applicazioni avanzate sopra la criptovaluta: costruire una nuova blockchain, utilizzare lo scripting sopra Bitcoin e costruire un meta-protocollo sopra Bitcoin. Costruire una nuova blockchain consente una libertà illimitata nella creazione di un set di funzionalità, ma a costo di tempi di sviluppo, sforzi di avvio e sicurezza. L'utilizzo dello scripting è facile da implementare e standardizzare, ma è molto limitato nelle sue capacità, e i meta-protocolli, sebbene facili, soffrono di difetti di scalabilità. Con Ethereum, intendiamo costruire un framework alternativo che fornisca vantaggi ancora maggiori in termini di facilità di sviluppo, nonché proprietà del client leggero ancora più forti, consentendo allo stesso tempo alle applicazioni di condividere un ambiente economico e la sicurezza della blockchain.

## Ethereum {#ethereum}

L'intento di Ethereum è creare un protocollo alternativo per la creazione di applicazioni decentralizzate (dapp), fornendo un diverso insieme di compromessi che riteniamo sarà molto utile per un'ampia classe di applicazioni decentralizzate, con particolare enfasi sulle situazioni in cui sono importanti tempi di sviluppo rapidi, sicurezza per applicazioni piccole e usate raramente, e la capacità di diverse applicazioni di interagire in modo molto efficiente. Ethereum fa questo costruendo quello che è essenzialmente il livello base astratto definitivo: una blockchain con un linguaggio di programmazione Turing-completo integrato, che consente a chiunque di scrivere smart contract e applicazioni decentralizzate in cui possono creare le proprie regole arbitrarie per la proprietà, i formati delle transazioni e le funzioni di transizione di stato. Una versione essenziale di Namecoin può essere scritta in due righe di codice, e altri protocolli come valute e sistemi di reputazione possono essere costruiti in meno di venti. Gli smart contract, "scatole" crittografiche che contengono valore e lo sbloccano solo se vengono soddisfatte determinate condizioni, possono anche essere costruiti sulla piattaforma, con una potenza di gran lunga superiore a quella offerta dallo scripting di Bitcoin grazie ai poteri aggiuntivi della Turing-completezza, della consapevolezza del valore, della consapevolezza della blockchain e dello stato.

### Account Ethereum {#ethereum-accounts}

In Ethereum, lo stato è costituito da oggetti chiamati "account", dove ogni account ha un indirizzo di 20 byte e le transizioni di stato sono trasferimenti diretti di valore e informazioni tra account. Un account Ethereum contiene quattro campi:

- Il **nonce**, un contatore utilizzato per assicurarsi che ogni transazione possa essere elaborata solo una volta
- Il **saldo in ether** attuale dell'account
- Il **codice del contratto** dell'account, se presente
- L'**archiviazione** dell'account (vuota per impostazione predefinita)

L'"ether" è il principale cripto-carburante interno di Ethereum ed è utilizzato per pagare le commissioni di transazione. In generale, ci sono due tipi di account: **account di proprietà esterna**, controllati da chiavi private, e **account di contratto**, controllati dal loro codice del contratto. Un account di proprietà esterna non ha codice e si possono inviare messaggi da un account di proprietà esterna creando e firmando una transazione; in un account di contratto, ogni volta che l'account di contratto riceve un messaggio, il suo codice si attiva, consentendogli di leggere e scrivere nell'archiviazione interna e di inviare altri messaggi o creare contratti a sua volta.

Si noti che i "contratti" in Ethereum non dovrebbero essere visti come qualcosa che deve essere "soddisfatto" o "rispettato"; piuttosto, sono più simili ad "agenti autonomi" che vivono all'interno dell'ambiente di esecuzione di Ethereum, eseguendo sempre una porzione specifica di codice quando "sollecitati" da un messaggio o da una transazione, e avendo il controllo diretto sul proprio saldo in ether e sul proprio archivio chiave/valore per tenere traccia delle variabili persistenti.

### Messaggi e transazioni {#messages-and-transactions}

Il termine "transazione" è utilizzato in Ethereum per riferirsi al pacchetto di dati firmato che memorizza un messaggio da inviare da un account di proprietà esterna. Le transazioni contengono:

- Il destinatario del messaggio
- Una firma che identifica il mittente
- La quantità di ether da trasferire dal mittente al destinatario
- Un campo dati opzionale
- Un valore `STARTGAS`, che rappresenta il numero massimo di passaggi computazionali che l'esecuzione della transazione è autorizzata a compiere
- Un valore `GASPRICE`, che rappresenta la commissione che il mittente paga per ogni passaggio computazionale

I primi tre sono campi standard previsti in qualsiasi criptovaluta. Il campo dati non ha alcuna funzione per impostazione predefinita, ma la macchina virtuale ha un codice operativo (opcode) tramite il quale un contratto può accedere ai dati; come caso d'uso di esempio, se un contratto funziona come servizio di registrazione di domini sulla blockchain, allora potrebbe voler interpretare i dati che gli vengono passati come contenenti due "campi", il primo campo essendo un dominio da registrare e il secondo campo essendo l'indirizzo IP a cui registrarlo. Il contratto leggerebbe questi valori dai dati del messaggio e li collocherebbe appropriatamente nell'archiviazione.

I campi `STARTGAS` e `GASPRICE` sono cruciali per il modello anti-denial of service di Ethereum. Al fine di prevenire cicli infiniti accidentali o ostili o altri sprechi computazionali nel codice, a ogni transazione è richiesto di impostare un limite a quanti passaggi computazionali di esecuzione del codice può utilizzare. L'unità fondamentale di calcolo è il "gas"; di solito, un passaggio computazionale costa 1 gas, ma alcune operazioni costano quantità maggiori di gas perché sono computazionalmente più costose, o aumentano la quantità di dati che devono essere memorizzati come parte dello stato. C'è anche una commissione di 5 gas per ogni byte nei dati della transazione. L'intento del sistema di commissioni è richiedere a un utente malintenzionato di pagare proporzionalmente per ogni risorsa che consuma, inclusi calcolo, larghezza di banda e archiviazione; quindi, qualsiasi transazione che porti la rete a consumare una quantità maggiore di una qualsiasi di queste risorse deve avere una commissione del gas approssimativamente proporzionale all'incremento.

### Messaggi {#messages}

I contratti hanno la capacità di inviare "messaggi" ad altri contratti. I messaggi sono oggetti virtuali che non vengono mai serializzati ed esistono solo nell'ambiente di esecuzione di Ethereum. Un messaggio contiene:

- Il mittente del messaggio (implicito)
- Il destinatario del messaggio
- La quantità di ether da trasferire insieme al messaggio
- Un campo dati opzionale
- Un valore `STARTGAS`

Essenzialmente, un messaggio è come una transazione, tranne per il fatto che è prodotto da un contratto e non da un attore esterno. Un messaggio viene prodotto quando un contratto che sta attualmente eseguendo del codice esegue il codice operativo (opcode) `CALL`, che produce ed esegue un messaggio. Come una transazione, un messaggio porta l'account destinatario a eseguire il proprio codice. Pertanto, i contratti possono avere relazioni con altri contratti esattamente nello stesso modo in cui possono averle gli attori esterni.

Si noti che l'autorizzazione di spesa del gas assegnata da una transazione o da un contratto si applica al gas totale consumato da quella transazione e da tutte le sotto-esecuzioni. Ad esempio, se un attore esterno A invia una transazione a B con 1000 gas, e B consuma 600 gas prima di inviare un messaggio a C, e l'esecuzione interna di C consuma 300 gas prima di ritornare, allora B può spendere altri 100 gas prima di esaurire il gas.

### Funzione di transizione di stato di Ethereum {#ethereum-state-transition-function}

![Ether state transition](./ether-state-transition.png)

La funzione di transizione di stato di Ethereum, `APPLY(S,TX) -> S'`, può essere definita come segue:

1. Verificare se la transazione è ben formata (cioè, ha il giusto numero di valori), la firma è valida e il nonce corrisponde al nonce nell'account del mittente. In caso contrario, restituire un errore.
2. Calcolare la commissione di transazione come `STARTGAS * GASPRICE` e determinare l'indirizzo di invio dalla firma. Sottrarre la commissione dal saldo dell'account del mittente e incrementare il nonce del mittente. Se non c'è abbastanza saldo da spendere, restituire un errore.
3. Inizializzare `GAS = STARTGAS` e sottrarre una certa quantità di gas per byte per pagare i byte nella transazione.
4. Trasferire il valore della transazione dall'account del mittente all'account ricevente. Se l'account ricevente non esiste ancora, crearlo. Se l'account ricevente è un contratto, eseguire il codice del contratto fino al completamento o fino a quando l'esecuzione non esaurisce il gas.
5. Se il trasferimento di valore è fallito perché il mittente non aveva abbastanza denaro, o l'esecuzione del codice ha esaurito il gas, eseguire il revert di tutte le modifiche di stato tranne il pagamento delle commissioni, e aggiungere le commissioni all'account del minatore.
6. Altrimenti, rimborsare le commissioni per tutto il gas rimanente al mittente e inviare le commissioni pagate per il gas consumato al minatore.

Ad esempio, supponiamo che il codice del contratto sia:

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Si noti che in realtà il codice del contratto è scritto nel codice EVM di basso livello; questo esempio è scritto in Serpent, uno dei nostri linguaggi di alto livello, per chiarezza, e può essere compilato in codice EVM. Supponiamo che l'archiviazione del contratto inizi vuota e che venga inviata una transazione con un valore di 10 ether, 2000 gas, un prezzo del gas di 0,001 ether e 64 byte di dati, con i byte 0-31 che rappresentano il numero `2` e i byte 32-63 che rappresentano la stringa `CHARLIE`<sup>[fn3](#notes)</sup>. Il processo per la funzione di transizione di stato in questo caso è il seguente:

1. Verificare che la transazione sia valida e ben formata.
2. Verificare che il mittente della transazione abbia almeno 2000 \* 0,001 = 2 ether. Se è così, sottrarre 2 ether dall'account del mittente.
3. Inizializzare gas = 2000; supponendo che la transazione sia lunga 170 byte e che la commissione per byte sia 5, sottrarre 850 in modo che rimangano 1150 gas.
4. Sottrarre altri 10 ether dall'account del mittente e aggiungerli all'account del contratto.
5. Eseguire il codice. In questo caso, è semplice: verifica se l'archiviazione del contratto all'indice `2` è utilizzata, nota che non lo è, e quindi imposta l'archiviazione all'indice `2` al valore `CHARLIE`. Supponiamo che questo richieda 187 gas, quindi la quantità rimanente di gas è 1150 - 187 = 963
6. Aggiungere 963 \* 0,001 = 0,963 ether di nuovo all'account del mittente e restituire lo stato risultante.

Se non ci fosse alcun contratto all'estremità ricevente della transazione, allora la commissione di transazione totale sarebbe semplicemente uguale al `GASPRICE` fornito moltiplicato per la lunghezza della transazione in byte, e i dati inviati insieme alla transazione sarebbero irrilevanti.

Si noti che i messaggi funzionano in modo equivalente alle transazioni in termini di revert: se l'esecuzione di un messaggio esaurisce il gas, allora l'esecuzione di quel messaggio, e tutte le altre esecuzioni innescate da quell'esecuzione, eseguono il revert, ma le esecuzioni genitore non hanno bisogno di eseguire il revert. Ciò significa che è "sicuro" per un contratto chiamare un altro contratto, poiché se A chiama B con G gas, allora l'esecuzione di A è garantita per perdere al massimo G gas. Infine, si noti che esiste un codice operativo (opcode), `CREATE`, che crea un contratto; le sue meccaniche di esecuzione sono generalmente simili a `CALL`, con l'eccezione che l'output dell'esecuzione determina il codice di un contratto appena creato.

### Esecuzione del codice {#code-execution}

Il codice nei contratti Ethereum è scritto in un linguaggio bytecode basato su stack di basso livello, indicato come "codice della macchina virtuale di Ethereum" o "codice EVM". Il codice è costituito da una serie di byte, dove ogni byte rappresenta un'operazione. In generale, l'esecuzione del codice è un ciclo infinito che consiste nell'eseguire ripetutamente l'operazione al program counter corrente (che inizia da zero) e quindi incrementare il program counter di uno, fino a quando non viene raggiunta la fine del codice o viene rilevato un errore o un'istruzione `STOP` o `RETURN`. Le operazioni hanno accesso a tre tipi di spazio in cui memorizzare i dati:

- Lo **stack**, un contenitore last-in-first-out in cui i valori possono essere inseriti (push) ed estratti (pop)
- La **memoria**, un array di byte espandibile all'infinito
- L'**archiviazione** a lungo termine del contratto, un archivio chiave/valore. A differenza dello stack e della memoria, che si azzerano al termine del calcolo, l'archiviazione persiste a lungo termine.

Il codice può anche accedere al valore, al mittente e ai dati del messaggio in arrivo, nonché ai dati dell'intestazione del blocco, e il codice può anche restituire un array di byte di dati come output.

Il modello di esecuzione formale del codice EVM è sorprendentemente semplice. Mentre la macchina virtuale di Ethereum è in esecuzione, il suo stato computazionale completo può essere definito dalla tupla `(block_state, transaction, message, code, memory, stack, pc, gas)`, dove `block_state` è lo stato globale contenente tutti gli account e include saldi e archiviazione. All'inizio di ogni round di esecuzione, l'istruzione corrente viene trovata prendendo il `pc`-esimo byte di `code` (o 0 se `pc >= len(code)`), e ogni istruzione ha la propria definizione in termini di come influisce sulla tupla. Ad esempio, `ADD` estrae due elementi dallo stack e inserisce la loro somma, riduce `gas` di 1 e incrementa `pc` di 1, e `SSTORE` estrae i primi due elementi dallo stack e inserisce il secondo elemento nell'archiviazione del contratto all'indice specificato dal primo elemento. Sebbene ci siano molti modi per ottimizzare l'esecuzione della macchina virtuale di Ethereum tramite la compilazione just-in-time, un'implementazione di base di Ethereum può essere eseguita in poche centinaia di righe di codice.

### Blockchain e minaggio {#blockchain-and-mining}

![Ethereum apply block diagram](./ethereum-apply-block-diagram.png)

La blockchain di Ethereum è per molti versi simile alla blockchain di Bitcoin, sebbene presenti alcune differenze. La differenza principale tra Ethereum e Bitcoin per quanto riguarda l'architettura della blockchain è che, a differenza di Bitcoin, i blocchi di Ethereum contengono una copia sia dell'elenco delle transazioni sia dello stato più recente. A parte questo, anche altri due valori, il numero del blocco e la difficoltà, sono memorizzati nel blocco. L'algoritmo di base per la validazione del blocco in Ethereum è il seguente:

1. Verificare se il blocco precedente a cui si fa riferimento esiste ed è valido.
2. Verificare che il timestamp del blocco sia maggiore di quello del blocco precedente a cui si fa riferimento e inferiore a 15 minuti nel futuro
3. Verificare che il numero del blocco, la difficoltà, la radice della transazione, la radice degli uncle e il limite di gas (vari concetti di basso livello specifici di Ethereum) siano validi.
4. Verificare che la Prova di lavoro (PoW) sul blocco sia valida.
5. Sia `S[0]` lo stato alla fine del blocco precedente.
6. Sia `TX` l'elenco delle transazioni del blocco, con `n` transazioni. Per tutti i `i` in `0...n-1`, impostare `S[i+1] = APPLY(S[i],TX[i])`. Se un'applicazione restituisce un errore, o se il gas totale consumato nel blocco fino a questo punto supera il `GASLIMIT`, restituire un errore.
7. Sia `S_FINAL` uguale a `S[n]`, ma aggiungendo la ricompensa del blocco pagata al minatore.
8. Verificare se la radice dell'albero di Merkle dello stato `S_FINAL` è uguale alla radice dello stato finale fornita nell'intestazione del blocco. Se lo è, il blocco è valido; altrimenti, non è valido.

L'approccio potrebbe sembrare altamente inefficiente a prima vista, perché ha bisogno di memorizzare l'intero stato con ogni blocco, ma in realtà l'efficienza dovrebbe essere paragonabile a quella di Bitcoin. Il motivo è che lo stato è memorizzato nella struttura ad albero e, dopo ogni blocco, solo una piccola parte dell'albero deve essere modificata. Pertanto, in generale, tra due blocchi adiacenti la stragrande maggioranza dell'albero dovrebbe essere la stessa, e quindi i dati possono essere memorizzati una volta e referenziati due volte utilizzando puntatori (cioè, hash di sottoalberi). Un tipo speciale di albero noto come "albero Patricia" viene utilizzato per realizzare questo, inclusa una modifica al concetto di albero di Merkle che consente di inserire ed eliminare i nodi, e non solo di modificarli, in modo efficiente. Inoltre, poiché tutte le informazioni di stato fanno parte dell'ultimo blocco, non è necessario memorizzare l'intera cronologia della blockchain: una strategia che, se potesse essere applicata a Bitcoin, si può calcolare che fornirebbe un risparmio di spazio di 5-20 volte.

Una domanda frequente è "dove" viene eseguito il codice del contratto, in termini di hardware fisico. Questo ha una risposta semplice: il processo di esecuzione del codice del contratto fa parte della definizione della funzione di transizione di stato, che fa parte dell'algoritmo di validazione del blocco, quindi se una transazione viene aggiunta nel blocco `B` l'esecuzione del codice generata da quella transazione verrà eseguita da tutti i nodi, ora e in futuro, che scaricano e convalidano il blocco `B`.

## Applicazioni {#applications}

In generale, ci sono tre tipi di applicazioni basate su Ethereum. La prima categoria è quella delle applicazioni finanziarie, che forniscono agli utenti modi più potenti per gestire e stipulare contratti utilizzando il proprio denaro. Ciò include sotto-valute, derivati finanziari, contratti di copertura, portafogli di risparmio, testamenti e, in ultima analisi, persino alcune classi di contratti di lavoro su vasta scala. La seconda categoria è quella delle applicazioni semi-finanziarie, in cui è coinvolto il denaro ma c'è anche un forte aspetto non monetario in ciò che viene fatto; un esempio perfetto sono le taglie auto-eseguibili per le soluzioni a problemi computazionali. Infine, ci sono applicazioni come il voto online e la governance decentralizzata che non sono affatto finanziarie.

### Sistemi di token {#token-systems}

I sistemi di token sulla blockchain hanno molte applicazioni che vanno dalle sotto-valute che rappresentano asset come USD o oro alle azioni aziendali, token individuali che rappresentano proprietà intelligenti, coupon sicuri non falsificabili e persino sistemi di token senza alcun legame con il valore convenzionale, utilizzati come sistemi a punti per l'incentivazione. I sistemi di token sono sorprendentemente facili da implementare in Ethereum. Il punto chiave da comprendere è che tutto ciò che una valuta, o un sistema di token, è fondamentalmente, è un database con una sola operazione: sottrarre X unità da A e dare X unità a B, a condizione che (i) A avesse almeno X unità prima della transazione e (2) la transazione sia approvata da A. Tutto ciò che serve per implementare un sistema di token è implementare questa logica in un contratto.

Il codice di base per implementare un sistema di token in Serpent è il seguente:

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Questa è essenzialmente un'implementazione letterale della funzione di transizione di stato del "sistema bancario" descritta in precedenza in questo documento. È necessario aggiungere alcune righe di codice extra per prevedere la fase iniziale di distribuzione delle unità di valuta in primo luogo e alcuni altri casi limite, e idealmente verrebbe aggiunta una funzione per consentire ad altri contratti di interrogare il saldo di un indirizzo. Ma questo è tutto. Teoricamente, i sistemi di token basati su Ethereum che fungono da sotto-valute possono potenzialmente includere un'altra importante caratteristica che manca alle meta-valute basate su Bitcoin onchain: la capacità di pagare le commissioni di transazione direttamente in quella valuta. Il modo in cui ciò verrebbe implementato è che il contratto manterrebbe un saldo in ether con il quale rimborserebbe gli ether utilizzati per pagare le commissioni al mittente, e ricaricherebbe questo saldo raccogliendo le unità di valuta interna che preleva in commissioni e rivendendole in un'asta a esecuzione costante. Gli utenti dovrebbero quindi "attivare" i propri account con ether, ma una volta che l'ether è lì sarebbe riutilizzabile perché il contratto lo rimborserebbe ogni volta.

### Derivati finanziari e valute a valore stabile {#financial-derivatives-and-stable-value-currencies}

I derivati finanziari sono l'applicazione più comune di uno "smart contract" e una delle più semplici da implementare nel codice. La sfida principale nell'implementazione dei contratti finanziari è che la maggior parte di essi richiede il riferimento a un ticker di prezzo esterno; ad esempio, un'applicazione molto desiderabile è uno smart contract che copre dalla volatilità dell'ether (o di un'altra criptovaluta) rispetto al dollaro USA, ma per fare ciò è necessario che il contratto conosca il valore di ETH/USD. Il modo più semplice per farlo è attraverso un contratto di "feed di dati" mantenuto da una parte specifica (ad es. NASDAQ) progettato in modo che tale parte abbia la capacità di aggiornare il contratto secondo necessità, e fornendo un'interfaccia che consenta ad altri contratti di inviare un messaggio a quel contratto e ottenere una risposta che fornisca il prezzo.

Dato questo ingrediente critico, il contratto di copertura si presenterebbe come segue:

1. Attendere che la parte A inserisca 1000 ether.
2. Attendere che la parte B inserisca 1000 ether.
3. Registrare il valore in USD di 1000 ether, calcolato interrogando il contratto del feed di dati, nello spazio di archiviazione, supponiamo che sia $x.
4. Dopo 30 giorni, consentire ad A o B di "riattivare" il contratto per inviare un valore di $x in ether (calcolato interrogando nuovamente il contratto del feed di dati per ottenere il nuovo prezzo) ad A e il resto a B.

Un tale contratto avrebbe un potenziale significativo nel cripto-commercio. Uno dei problemi principali citati riguardo alla criptovaluta è il fatto che sia volatile; sebbene molti utenti e commercianti possano desiderare la sicurezza e la comodità di trattare con asset crittografici, potrebbero non voler affrontare la prospettiva di perdere il 23% del valore dei propri fondi in un solo giorno. Fino ad ora, la soluzione proposta più comunemente è stata quella degli asset garantiti dall'emittente; l'idea è che un emittente crei una sotto-valuta in cui ha il diritto di emettere e revocare unità, e fornisca un'unità della valuta a chiunque gli fornisca (offline) un'unità di un asset sottostante specificato (ad es. oro, USD). L'emittente promette quindi di fornire un'unità dell'asset sottostante a chiunque restituisca un'unità del cripto-asset. Questo meccanismo consente a qualsiasi asset non crittografico di essere "elevato" a un asset crittografico, a condizione che ci si possa fidare dell'emittente.

In pratica, tuttavia, gli emittenti non sono sempre affidabili e in alcuni casi l'infrastruttura bancaria è troppo debole, o troppo ostile, perché tali servizi esistano. I derivati finanziari forniscono un'alternativa. Qui, invece di un singolo emittente che fornisce i fondi per sostenere un asset, un mercato decentralizzato di speculatori, scommettendo che il prezzo di un asset di riferimento crittografico (ad es. ETH) salirà, svolge quel ruolo. A differenza degli emittenti, gli speculatori non hanno la possibilità di non adempiere alla loro parte dell'accordo perché il contratto di copertura trattiene i loro fondi in garanzia. Si noti che questo approccio non è completamente decentralizzato, perché è ancora necessaria una fonte attendibile per fornire il ticker del prezzo, sebbene si possa sostenere che questo sia comunque un enorme miglioramento in termini di riduzione dei requisiti infrastrutturali (a differenza dell'essere un emittente, l'emissione di un feed dei prezzi non richiede licenze e può probabilmente essere classificata come libertà di parola) e di riduzione del potenziale di frode.

### Sistemi di identità e reputazione {#identity-and-reputation-systems}

La primissima criptovaluta alternativa in assoluto, [Namecoin](http://namecoin.org/), ha tentato di utilizzare una blockchain simile a Bitcoin per fornire un sistema di registrazione dei nomi, in cui gli utenti possono registrare i propri nomi in un database pubblico insieme ad altri dati. Il principale caso d'uso citato è per un sistema [DNS](https://wikipedia.org/wiki/Domain_Name_System), che mappa nomi di dominio come "bitcoin.org" (o, nel caso di Namecoin, "bitcoin.bit") a un indirizzo IP. Altri casi d'uso includono l'autenticazione e-mail e sistemi di reputazione potenzialmente più avanzati. Ecco il contratto di base per fornire un sistema di registrazione dei nomi simile a Namecoin su Ethereum:

```py
def register(name, value):
  if !self.storage[name]:
    self.storage[name] = value
```

Il contratto è molto semplice; non è altro che un database all'interno della rete Ethereum a cui è possibile aggiungere dati, ma non modificarli o rimuoverli. Chiunque può registrare un nome con un certo valore, e quella registrazione rimane per sempre. Un contratto di registrazione dei nomi più sofisticato avrà anche una "clausola di funzione" che consentirà ad altri contratti di interrogarlo, nonché un meccanismo per il "proprietario" (ovvero, il primo registrante) di un nome per modificare i dati o trasferire la proprietà. Si possono persino aggiungere funzionalità di reputazione e rete di fiducia (web-of-trust).

### Archiviazione di file decentralizzata {#decentralized-file-storage}

Negli ultimi anni sono emerse diverse startup popolari di archiviazione di file online, la più importante delle quali è Dropbox, che cercano di consentire agli utenti di caricare un backup del proprio disco rigido e fare in modo che il servizio archivi il backup e consenta all'utente di accedervi in cambio di un canone mensile. Tuttavia, a questo punto il mercato dell'archiviazione dei file è a volte relativamente inefficiente; un rapido sguardo a varie soluzioni esistenti mostra che, in particolare al livello della "uncanny valley" di 20-200 GB in cui non scattano né le quote gratuite né gli sconti a livello aziendale, i prezzi mensili per i costi di archiviazione dei file tradizionali sono tali che si finisce per pagare più del costo dell'intero disco rigido in un solo mese. I contratti Ethereum possono consentire lo sviluppo di un ecosistema di archiviazione di file decentralizzato, in cui i singoli utenti possono guadagnare piccole quantità di denaro affittando i propri dischi rigidi e lo spazio inutilizzato può essere utilizzato per ridurre ulteriormente i costi di archiviazione dei file.

L'elemento chiave alla base di un tale dispositivo sarebbe quello che abbiamo definito il "contratto Dropbox decentralizzato". Questo contratto funziona come segue. Innanzitutto, si dividono i dati desiderati in blocchi, crittografando ogni blocco per la privacy, e se ne costruisce un albero di Merkle. Si stipula quindi un contratto con la regola che, ogni N blocchi, il contratto sceglierebbe un indice casuale nell'albero di Merkle (utilizzando l'hash del blocco precedente, accessibile dal codice del contratto, come fonte di casualità), e darebbe X ether alla prima entità che fornisce una transazione con una prova di proprietà simile alla verifica di pagamento semplificata del blocco a quel particolare indice nell'albero. Quando un utente desidera scaricare nuovamente il proprio file, può utilizzare un protocollo di canale di micropagamento (ad es. pagare 1 szabo per 32 kilobyte) per recuperare il file; l'approccio più efficiente in termini di commissioni è che il pagatore non pubblichi la transazione fino alla fine, sostituendo invece la transazione con una leggermente più redditizia con lo stesso nonce dopo ogni 32 kilobyte.

Una caratteristica importante del protocollo è che, sebbene possa sembrare che ci si stia fidando di molti nodi casuali affinché non decidano di dimenticare il file, si può ridurre quel rischio quasi a zero dividendo il file in molti pezzi tramite la condivisione di segreti e osservando i contratti per vedere se ogni pezzo è ancora in possesso di qualche nodo. Se un contratto sta ancora pagando denaro, ciò fornisce una prova crittografica che qualcuno là fuori sta ancora archiviando il file.

### Organizzazioni autonome decentralizzate {#decentralized-autonomous-organizations}

Il concetto generale di "organizzazione autonoma decentralizzata" è quello di un'entità virtuale che ha un certo insieme di membri o azionisti che, forse con una maggioranza del 67%, hanno il diritto di spendere i fondi dell'entità e modificarne il codice. I membri deciderebbero collettivamente su come l'organizzazione dovrebbe allocare i propri fondi. I metodi per allocare i fondi di una DAO potrebbero variare da taglie, stipendi a meccanismi ancora più esotici come una valuta interna per ricompensare il lavoro. Questo replica essenzialmente gli orpelli legali di un'azienda tradizionale o di un'organizzazione no-profit, ma utilizzando solo la tecnologia crittografica della blockchain per l'applicazione. Finora gran parte delle discussioni sulle DAO si è concentrata sul modello "capitalista" di una "società autonoma decentralizzata" (DAC) con azionisti che ricevono dividendi e azioni negoziabili; un'alternativa, forse descritta come una "comunità autonoma decentralizzata", prevederebbe che tutti i membri abbiano una quota uguale nel processo decisionale e richiederebbe che il 67% dei membri esistenti accetti di aggiungere o rimuovere un membro. Il requisito che una persona possa avere una sola iscrizione dovrebbe quindi essere applicato collettivamente dal gruppo.

Una struttura generale su come programmare una DAO è la seguente. Il design più semplice è semplicemente un pezzo di codice auto-modificante che cambia se due terzi dei membri concordano su una modifica. Sebbene il codice sia teoricamente immutabile, si può facilmente aggirare questo problema e avere una mutabilità de facto avendo porzioni di codice in contratti separati e avendo l'indirizzo di quali contratti chiamare memorizzato nello spazio di archiviazione modificabile. In una semplice implementazione di un tale contratto DAO, ci sarebbero tre tipi di transazione, distinti dai dati forniti nella transazione:

- `[0,i,K,V]` per registrare una proposta con indice `i` per modificare l'indirizzo all'indice di archiviazione `K` al valore `V`
- `[1,i]` per registrare un voto a favore della proposta `i`
- `[2,i]` per finalizzare la proposta `i` se sono stati espressi abbastanza voti

Il contratto avrebbe quindi clausole per ciascuno di questi. Manterrebbe un registro di tutte le modifiche di archiviazione aperte, insieme a un elenco di chi ha votato per esse. Avrebbe anche un elenco di tutti i membri. Quando una qualsiasi modifica di archiviazione ottiene il voto di due terzi dei membri, una transazione di finalizzazione potrebbe eseguire la modifica. Una struttura più sofisticata avrebbe anche una capacità di voto integrata per funzionalità come l'invio di una transazione, l'aggiunta di membri e la rimozione di membri, e potrebbe persino prevedere la delega del voto in stile [Democrazia Liquida](https://wikipedia.org/wiki/Liquid_democracy) (ovvero, chiunque può assegnare a qualcuno di votare per lui, e l'assegnazione è transitiva, quindi se A assegna B e B assegna C, allora C determina il voto di A). Questo design consentirebbe alla DAO di crescere organicamente come una comunità decentralizzata, consentendo alle persone di delegare eventualmente il compito di filtrare chi è un membro a degli specialisti, sebbene a differenza del "sistema attuale" gli specialisti possano facilmente apparire e scomparire nel tempo man mano che i singoli membri della comunità cambiano i loro allineamenti.

Un modello alternativo è quello di una società decentralizzata, in cui qualsiasi account può avere zero o più azioni e sono necessari due terzi delle azioni per prendere una decisione. Una struttura completa comporterebbe funzionalità di gestione degli asset, la capacità di fare un'offerta per acquistare o vendere azioni e la capacità di accettare offerte (preferibilmente con un meccanismo di abbinamento degli ordini all'interno del contratto). La delega esisterebbe anche in stile Democrazia Liquida, generalizzando il concetto di "consiglio di amministrazione".

### Ulteriori applicazioni {#further-applications}

**1. Portafogli di risparmio**. Supponiamo che Alice voglia tenere al sicuro i suoi fondi, ma sia preoccupata di perdere o che qualcuno hackererà la sua chiave privata. Mette degli ether in un contratto con Bob, una banca, come segue:

- Solo Alice può prelevare un massimo dell'1% dei fondi al giorno.
- Solo Bob può prelevare un massimo dell'1% dei fondi al giorno, ma Alice ha la possibilità di effettuare una transazione con la sua chiave per disattivare questa capacità.
- Alice e Bob insieme possono prelevare qualsiasi importo.

Normalmente, l'1% al giorno è sufficiente per Alice, e se Alice vuole prelevare di più può contattare Bob per chiedere aiuto. Se la chiave di Alice viene hackerata, corre da Bob per spostare i fondi su un nuovo contratto. Se perde la sua chiave, Bob alla fine tirerà fuori i fondi. Se Bob si rivela malintenzionato, allora lei può disattivare la sua capacità di prelevare.

**2. Assicurazione del raccolto**. Si può facilmente stipulare un contratto di derivati finanziari ma utilizzando un feed di dati meteorologici invece di un qualsiasi indice di prezzo. Se un agricoltore in Iowa acquista un derivato che paga in modo inversamente proporzionale in base alle precipitazioni in Iowa, allora se c'è siccità, l'agricoltore riceverà automaticamente denaro e se c'è abbastanza pioggia l'agricoltore sarà felice perché i suoi raccolti andranno bene. Questo può essere esteso all'assicurazione contro i disastri naturali in generale.

**3. Un feed di dati decentralizzato**. Per i contratti finanziari per differenza, potrebbe effettivamente essere possibile decentralizzare il feed di dati tramite un protocollo chiamato "[SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed)". SchellingCoin funziona fondamentalmente come segue: N parti inseriscono tutte nel sistema il valore di un dato (ad es. il prezzo ETH/USD), i valori vengono ordinati e tutti coloro che si trovano tra il 25° e il 75° percentile ottengono un token come ricompensa. Tutti hanno l'incentivo a fornire la risposta che tutti gli altri forniranno, e l'unico valore su cui un gran numero di giocatori può realisticamente concordare è l'ovvio valore predefinito: la verità. Questo crea un protocollo decentralizzato che può teoricamente fornire un numero qualsiasi di valori, incluso il prezzo ETH/USD, la temperatura a Berlin o persino il risultato di un particolare calcolo complesso.

**4. Deposito a garanzia multisig intelligente**. Bitcoin consente contratti di transazione multisig in cui, ad esempio, tre chiavi su cinque possono spendere i fondi. Ethereum consente una maggiore granularità; ad esempio, quattro su cinque possono spendere tutto, tre su cinque possono spendere fino al 10% al giorno e due su cinque possono spendere fino allo 0,5% al giorno. Inoltre, il multisig di Ethereum è asincrono: due parti possono registrare le loro firme sulla blockchain in momenti diversi e l'ultima firma invierà automaticamente la transazione.

**5. Cloud computing**. La tecnologia EVM può anche essere utilizzata per creare un ambiente di calcolo verificabile, consentendo agli utenti di chiedere ad altri di eseguire calcoli e quindi, facoltativamente, chiedere prove che i calcoli in determinati checkpoint selezionati casualmente siano stati eseguiti correttamente. Ciò consente la creazione di un mercato di cloud computing in cui qualsiasi utente può partecipare con il proprio desktop, laptop o server specializzato, e i controlli a campione insieme ai depositi cauzionali possono essere utilizzati per garantire che il sistema sia affidabile (ovvero, i nodi non possono imbrogliare in modo redditizio). Sebbene un tale sistema possa non essere adatto a tutte le attività; le attività che richiedono un alto livello di comunicazione inter-processo, ad esempio, non possono essere facilmente eseguite su un grande cloud di nodi. Altre attività, tuttavia, sono molto più facili da parallelizzare; progetti come SETI@home, folding@home e algoritmi genetici possono essere facilmente implementati su una tale piattaforma.

**6. Gioco d'azzardo peer-to-peer**. Qualsiasi numero di protocolli di gioco d'azzardo peer-to-peer, come [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf) di Frank Stajano e Richard Clayton, può essere implementato sulla blockchain di Ethereum. Il protocollo di gioco d'azzardo più semplice è in realtà semplicemente un contratto per differenza sull'hash del blocco successivo, e da lì si possono costruire protocolli più avanzati, creando servizi di gioco d'azzardo con commissioni quasi nulle che non hanno la possibilità di imbrogliare.

**7. Mercati di previsione**. Fornito un oracolo o SchellingCoin, anche i mercati di previsione sono facili da implementare, e i mercati di previsione insieme a SchellingCoin potrebbero rivelarsi la prima applicazione mainstream della [futarchia](https://mason.gmu.edu/~rhanson/futarchy.html) come protocollo di governance per le organizzazioni decentralizzate.

**8. Marketplace decentralizzati onchain**, utilizzando il sistema di identità e reputazione come base.

## Miscellanea e problematiche {#miscellanea-and-concerns}

### Implementazione GHOST modificata {#modified-ghost-implementation}

Il protocollo "Greedy Heaviest Observed Subtree" (GHOST) è un'innovazione introdotta per la prima volta da Yonatan Sompolinsky e Aviv Zohar a [dicembre 2013](https://eprint.iacr.org/2013/881.pdf). La motivazione alla base di GHOST è che le blockchain con tempi di conferma rapidi attualmente soffrono di una sicurezza ridotta a causa di un alto tasso di blocchi stantii (stale rate): poiché i blocchi impiegano un certo tempo per propagarsi attraverso la rete, se il minatore A mina un blocco e poi il minatore B si trova a minare un altro blocco prima che il blocco del minatore A si propaghi a B, il blocco del minatore B finirà per essere sprecato e non contribuirà alla sicurezza della rete. Inoltre, c'è un problema di centralizzazione: se il minatore A è una mining pool con il 30% della potenza di hash e B ha il 10% della potenza di hash, A avrà il rischio di produrre un blocco stantio il 70% delle volte (poiché l'altro 30% delle volte A ha prodotto l'ultimo blocco e quindi otterrà immediatamente i dati di minaggio), mentre B avrà il rischio di produrre un blocco stantio il 90% delle volte. Pertanto, se l'intervallo tra i blocchi è sufficientemente breve da rendere alto il tasso di blocchi stantii, A sarà sostanzialmente più efficiente semplicemente in virtù delle sue dimensioni. Con questi due effetti combinati, le blockchain che producono blocchi rapidamente hanno un'alta probabilità di portare una singola mining pool ad avere una percentuale di potenza di hash della rete sufficientemente grande da avere il controllo de facto sul processo di minaggio.

Come descritto da Sompolinsky e Zohar, GHOST risolve il primo problema della perdita di sicurezza della rete includendo i blocchi stantii nel calcolo di quale catena sia la "più lunga"; vale a dire, non solo il genitore e gli ulteriori antenati di un blocco, ma anche i discendenti stantii dell'antenato del blocco (nel gergo di Ethereum, gli "uncle" o zii) vengono aggiunti al calcolo di quale blocco abbia la maggiore Prova di lavoro (PoW) totale a sostenerlo. Per risolvere il secondo problema della tendenza alla centralizzazione, andiamo oltre il protocollo descritto da Sompolinsky e Zohar e forniamo ricompense del blocco anche ai blocchi stantii: un blocco stantio riceve l'87,5% della sua ricompensa di base e il nipote che include il blocco stantio riceve il restante 12,5%. Le commissioni di transazione, tuttavia, non vengono assegnate agli uncle.

Ethereum implementa una versione semplificata di GHOST che scende solo di sette livelli. Nello specifico, è definita come segue:

- Un blocco deve specificare un genitore e deve specificare 0 o più uncle
- Un uncle incluso nel blocco B deve avere le seguenti proprietà:
  - Deve essere un figlio diretto dell'antenato di k-esima generazione di B, dove `2 <= k <= 7`.
  - Non può essere un antenato di B
  - Un uncle deve essere un'intestazione del blocco valida, ma non deve necessariamente essere un blocco precedentemente verificato o persino valido
  - Un uncle deve essere diverso da tutti gli uncle inclusi nei blocchi precedenti e da tutti gli altri uncle inclusi nello stesso blocco (nessuna doppia inclusione)
- Per ogni uncle U nel blocco B, il minatore di B ottiene un ulteriore 3,125% aggiunto alla sua ricompensa coinbase e il minatore di U ottiene il 93,75% di una ricompensa coinbase standard.

Questa versione limitata di GHOST, con uncle includibili solo fino a 7 generazioni, è stata utilizzata per due motivi. In primo luogo, un GHOST illimitato includerebbe troppe complicazioni nel calcolo di quali uncle per un dato blocco siano validi. In secondo luogo, un GHOST illimitato con compensazione come utilizzato in Ethereum rimuove l'incentivo per un minatore a minare sulla catena principale e non sulla catena di un utente malintenzionato pubblico.

### Commissioni {#fees}

Poiché ogni transazione pubblicata nella blockchain impone alla rete il costo di doverla scaricare e verificare, c'è bisogno di un meccanismo di regolamentazione, che in genere coinvolge le commissioni di transazione, per prevenire abusi. L'approccio predefinito, utilizzato in Bitcoin, è quello di avere commissioni puramente volontarie, affidandosi ai minatori affinché agiscano da guardiani e stabiliscano minimi dinamici. Questo approccio è stato accolto molto favorevolmente nella comunità di Bitcoin, in particolare perché è "basato sul mercato", consentendo alla domanda e all'offerta tra i minatori e i mittenti delle transazioni di determinare il prezzo. Il problema con questa linea di ragionamento è, tuttavia, che l'elaborazione delle transazioni non è un mercato; sebbene sia intuitivamente attraente interpretare l'elaborazione delle transazioni come un servizio che il minatore sta offrendo al mittente, in realtà ogni transazione che un minatore include dovrà essere elaborata da ogni nodo della rete, quindi la stragrande maggioranza del costo dell'elaborazione delle transazioni è sostenuta da terze parti e non dal minatore che sta prendendo la decisione se includerla o meno. Di conseguenza, è molto probabile che si verifichino problemi legati alla tragedia dei beni comuni.

Tuttavia, si scopre che questo difetto nel meccanismo basato sul mercato, se si considera una particolare ipotesi semplificativa inaccurata, si annulla magicamente da solo. L'argomentazione è la seguente. Supponiamo che:

1. Una transazione porta a `k` operazioni, offrendo la ricompensa `kR` a qualsiasi minatore che la includa, dove `R` è impostato dal mittente e `k` e `R` sono (approssimativamente) visibili al minatore in anticipo.
2. Un'operazione ha un costo di elaborazione di `C` per qualsiasi nodo (ovvero, tutti i nodi hanno la stessa efficienza)
3. Ci sono `N` nodi di minaggio, ciascuno con una potenza di elaborazione esattamente uguale (ovvero, `1/N` del totale)
4. Non esistono nodi completi non di minaggio.

Un minatore sarebbe disposto a elaborare una transazione se la ricompensa attesa è maggiore del costo. Pertanto, la ricompensa attesa è `kR/N` poiché il minatore ha una probabilità di `1/N` di elaborare il blocco successivo e il costo di elaborazione per il minatore è semplicemente `kC`. Di conseguenza, i minatori includeranno le transazioni in cui `kR/N > kC`, o `R > NC`. Si noti che `R` è la commissione per operazione fornita dal mittente ed è quindi un limite inferiore al vantaggio che il mittente trae dalla transazione, e `NC` è il costo per l'intera rete nel suo complesso per l'elaborazione di un'operazione. Pertanto, i minatori hanno l'incentivo a includere solo quelle transazioni per le quali il beneficio utilitaristico totale supera il costo.

Tuttavia, nella realtà ci sono diverse importanti deviazioni da queste ipotesi:

1. Il minatore paga un costo maggiore per elaborare la transazione rispetto agli altri nodi di verifica, poiché il tempo di verifica aggiuntivo ritarda la propagazione dei blocchi e quindi aumenta la probabilità che il blocco diventi stantio.
2. Esistono nodi completi non di minaggio.
3. La distribuzione della potenza di minaggio potrebbe finire per essere radicalmente inegualitaria nella pratica.
4. Esistono speculatori, nemici politici e folli la cui funzione di utilità include causare danni alla rete, e possono abilmente creare contratti in cui il loro costo è molto inferiore al costo pagato dagli altri nodi di verifica.

(1) fornisce una tendenza per il minatore a includere meno transazioni e
(2) aumenta `NC`; di conseguenza, questi due effetti si annullano almeno parzialmente a vicenda.<sup>[Come?](https://web.archive.org/web/20250427212319/https://github.com/ethereum/wiki/issues/447#issuecomment-316972260#issuecomment-316972260)</sup>
(3) e (4) rappresentano il problema principale; per risolverli istituiamo semplicemente un limite fluttuante: nessun blocco può avere più operazioni di
`BLK_LIMIT_FACTOR` volte la media mobile esponenziale a lungo termine.
Nello specifico:

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

`BLK_LIMIT_FACTOR` e `EMA_FACTOR` sono costanti che per il momento saranno impostate a 65536 e 1,5, ma che probabilmente verranno modificate dopo ulteriori analisi.

C'è un altro fattore che disincentiva le grandi dimensioni dei blocchi in Bitcoin: i blocchi di grandi dimensioni impiegheranno più tempo a propagarsi e quindi avranno una maggiore probabilità di diventare stantii. In Ethereum, i blocchi che consumano molto gas possono anche impiegare più tempo a propagarsi sia perché sono fisicamente più grandi sia perché impiegano più tempo a elaborare le transizioni di stato delle transazioni da convalidare. Questo disincentivo legato al ritardo è una considerazione significativa in Bitcoin, ma lo è meno in Ethereum a causa del protocollo GHOST; pertanto, fare affidamento su limiti dei blocchi regolamentati fornisce una base più stabile.

### Calcolo e Turing-completezza {#computation-and-turing-completeness}

Una nota importante è che la macchina virtuale di Ethereum è Turing-completa; ciò significa che il codice EVM può codificare qualsiasi calcolo che possa essere concepibilmente eseguito, inclusi i cicli infiniti. Il codice EVM consente di eseguire cicli in due modi. In primo luogo, c'è un'istruzione `JUMP` che consente al programma di tornare a un punto precedente nel codice e un'istruzione `JUMPI` per eseguire salti condizionali, consentendo istruzioni come `while x < 27: x = x * 2`. In secondo luogo, i contratti possono chiamare altri contratti, consentendo potenzialmente di eseguire cicli tramite ricorsione. Questo porta naturalmente a un problema: gli utenti malintenzionati possono essenzialmente bloccare i minatori e i nodi completi costringendoli a entrare in un ciclo infinito? Il problema sorge a causa di un problema in informatica noto come problema della terminazione (halting problem): non c'è modo di dire, nel caso generale, se un dato programma si fermerà mai o meno.

Come descritto nella sezione sulle transizioni di stato, la nostra soluzione funziona richiedendo a una transazione di impostare un numero massimo di passaggi computazionali che le è consentito compiere e, se l'esecuzione richiede più tempo, il calcolo subisce un revert ma le commissioni vengono comunque pagate. I messaggi funzionano allo stesso modo. Per mostrare la motivazione alla base della nostra soluzione, si considerino i seguenti esempi:

- Un utente malintenzionato crea un contratto che esegue un ciclo infinito e quindi invia una transazione che attiva quel ciclo al minatore. Il minatore elaborerà la transazione, eseguendo il ciclo infinito, e aspetterà che esaurisca il gas. Anche se l'esecuzione esaurisce il gas e si ferma a metà, la transazione è ancora valida e il minatore richiede comunque la commissione all'utente malintenzionato per ogni passaggio computazionale.
- Un utente malintenzionato crea un ciclo infinito molto lungo con l'intento di costringere il minatore a continuare a calcolare per un tempo così lungo che, nel momento in cui il calcolo finisce, saranno usciti altri blocchi e non sarà possibile per il minatore includere la transazione per richiedere la commissione. Tuttavia, all'utente malintenzionato verrà richiesto di inviare un valore per `STARTGAS` che limiti il numero di passaggi computazionali che l'esecuzione può compiere, in modo che il minatore sappia in anticipo che il calcolo richiederà un numero eccessivamente elevato di passaggi.
- Un utente malintenzionato vede un contratto con un codice di qualche forma come `send(A,contract.storage[A]); contract.storage[A] = 0` e invia una transazione con gas appena sufficiente per eseguire il primo passaggio ma non il secondo (ovvero, effettuando un prelievo ma non lasciando che il saldo scenda). L'autore del contratto non deve preoccuparsi di proteggersi da tali attacchi, perché se l'esecuzione si ferma a metà le modifiche subiscono un revert.
- Un contratto finanziario funziona prendendo la mediana di nove feed di dati proprietari al fine di ridurre al minimo il rischio. Un utente malintenzionato prende il controllo di uno dei feed di dati, che è progettato per essere modificabile tramite il meccanismo di chiamata a indirizzo variabile descritto nella sezione sulle DAO, e lo converte per eseguire un ciclo infinito, tentando così di forzare qualsiasi tentativo di riscattare fondi dal contratto finanziario a esaurire il gas. Tuttavia, il contratto finanziario può impostare un limite di gas sul messaggio per prevenire questo problema.

L'alternativa alla Turing-completezza è la Turing-incompletezza, in cui `JUMP` e `JUMPI` non esistono ed è consentita l'esistenza di una sola copia di ciascun contratto nello stack delle chiamate in un dato momento. Con questo sistema, il sistema di commissioni descritto e le incertezze sull'efficacia della nostra soluzione potrebbero non essere necessari, poiché il costo di esecuzione di un contratto sarebbe limitato superiormente dalle sue dimensioni. Inoltre, la Turing-incompletezza non è nemmeno una limitazione così grande; tra tutti gli esempi di contratti che abbiamo concepito internamente, finora solo uno richiedeva un ciclo, e persino quel ciclo poteva essere rimosso effettuando 26 ripetizioni di un pezzo di codice di una riga. Date le gravi implicazioni della Turing-completezza e il beneficio limitato, perché non avere semplicemente un linguaggio Turing-incompleto? In realtà, tuttavia, la Turing-incompletezza è tutt'altro che una soluzione pulita al problema. Per capire perché, si considerino i seguenti contratti:

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (run one step of a program and record the change in storage)
```

Ora, invia una transazione ad A. Pertanto, in 51 transazioni, abbiamo un contratto che richiede 2<sup>50</sup> passaggi computazionali. I minatori potrebbero cercare di rilevare tali bombe logiche in anticipo mantenendo un valore accanto a ciascun contratto che specifichi il numero massimo di passaggi computazionali che può compiere e calcolandolo per i contratti che chiamano altri contratti in modo ricorsivo, ma ciò richiederebbe ai minatori di vietare i contratti che creano altri contratti (poiché la creazione e l'esecuzione di tutti i 26 contratti di cui sopra potrebbero essere facilmente raggruppate in un singolo contratto). Un altro punto problematico è che il campo dell'indirizzo di un messaggio è una variabile, quindi in generale potrebbe non essere nemmeno possibile dire in anticipo quali altri contratti chiamerà un dato contratto. Quindi, tutto sommato, giungiamo a una conclusione sorprendente: la Turing-completezza è sorprendentemente facile da gestire e la mancanza di Turing-completezza è altrettanto sorprendentemente difficile da gestire a meno che non siano in atto gli stessi identici controlli; ma in tal caso, perché non lasciare semplicemente che il protocollo sia Turing-completo?

### Valuta ed emissione {#currency-and-issuance}

La rete Ethereum include la propria valuta integrata, l'ether, che ha il duplice scopo di fornire un livello di liquidità primario per consentire uno scambio efficiente tra vari tipi di asset digitali e, cosa più importante, di fornire un meccanismo per il pagamento delle commissioni di transazione. Per comodità e per evitare discussioni future (si veda l'attuale dibattito mBTC/uBTC/satoshi in Bitcoin), le denominazioni saranno pre-etichettate:

- 1: Wei
- 10<sup>12</sup>: szabo
- 10<sup>15</sup>: finney
- 10<sup>18</sup>: ether

Questo dovrebbe essere considerato come una versione estesa del concetto di "dollari" e "centesimi" o "BTC" e "satoshi". Nel prossimo futuro, ci aspettiamo che "ether" venga utilizzato per le transazioni ordinarie, "finney" per le microtransazioni e "szabo" e "Wei" per le discussioni tecniche sulle commissioni e sull'implementazione del protocollo; le restanti denominazioni potrebbero diventare utili in seguito e non dovrebbero essere incluse nei client in questo momento.

Il modello di emissione sarà il seguente:

- L'ether verrà rilasciato in una vendita di valuta al prezzo di 1000-2000 ether per BTC, un meccanismo inteso a finanziare l'organizzazione Ethereum e pagare per lo sviluppo che è stato utilizzato con successo da altre piattaforme come Mastercoin e NXT. I primi acquirenti beneficeranno di sconti maggiori. I BTC ricevuti dalla vendita verranno utilizzati interamente per pagare stipendi e taglie agli sviluppatori e investiti in vari progetti a scopo di lucro e senza scopo di lucro nell'ecosistema di Ethereum e delle criptovalute.
- 0,099 volte l'importo totale venduto (60102216 ETH) sarà assegnato all'organizzazione per compensare i primi contributori e pagare le spese denominate in ETH prima del blocco genesi.
- 0,099 volte l'importo totale venduto sarà mantenuto come riserva a lungo termine.
- 0,26 volte l'importo totale venduto sarà assegnato ai minatori all'anno per sempre dopo quel momento.

| Gruppo | Al lancio | Dopo 1 anno | Dopo 5 anni |
| ---------------------- | --------- | ------------ | ------------- |
| Unità di valuta | 1,198X | 1,458X | 2,498X |
| Acquirenti | 83,5% | 68,6% | 40,0% |
| Riserva spesa pre-vendita | 8,26% | 6,79% | 3,96% |
| Riserva usata post-vendita | 8,26% | 6,79% | 3,96% |
| Minatori | 0% | 17,8% | 52,0% |

#### Tasso di crescita dell'offerta a lungo termine (percentuale) {#long-term-supply-growth-rate-percent}

![Ethereum inflation](./ethereum-inflation.png)

_Nonostante l'emissione lineare di valuta, proprio come con Bitcoin nel tempo il tasso di crescita dell'offerta tende comunque a zero._

Le due scelte principali nel modello precedente sono (1) l'esistenza e le dimensioni di un fondo di dotazione (endowment pool) e (2) l'esistenza di un'offerta lineare in costante crescita, in contrasto con un'offerta limitata come in Bitcoin. La giustificazione del fondo di dotazione è la seguente. Se il fondo di dotazione non esistesse e l'emissione lineare si riducesse a 0,217x per fornire lo stesso tasso di inflazione, la quantità totale di ether sarebbe inferiore del 16,5% e quindi ogni unità avrebbe un valore superiore del 19,8%. Pertanto, in equilibrio verrebbe acquistato il 19,8% in più di ether nella vendita, quindi ogni unità sarebbe ancora una volta esattamente preziosa come prima. L'organizzazione avrebbe quindi anche 1,198 volte più BTC, che possono essere considerati divisi in due fette: i BTC originali e lo 0,198x aggiuntivo. Di conseguenza, questa situazione è _esattamente equivalente_ alla dotazione, ma con un'importante differenza: l'organizzazione detiene puramente BTC e quindi non è incentivata a sostenere il valore dell'unità di ether.

Il modello di crescita dell'offerta lineare permanente riduce il rischio di quella che alcuni vedono come un'eccessiva concentrazione di ricchezza in Bitcoin e offre agli individui che vivono nelle epoche presenti e future un'equa possibilità di acquisire unità di valuta, pur mantenendo allo stesso tempo un forte incentivo a ottenere e detenere ether perché il "tasso di crescita dell'offerta" in percentuale tende comunque a zero nel tempo. Teorizziamo anche che, poiché le monete vengono sempre perse nel tempo a causa di disattenzione, morte, ecc., e la perdita di monete può essere modellata come una percentuale dell'offerta totale all'anno, l'offerta totale di valuta in circolazione si stabilizzerà di fatto alla fine a un valore pari all'emissione annuale divisa per il tasso di perdita (ad esempio, a un tasso di perdita dell'1%, una volta che l'offerta raggiunge 26X, verranno minati 0,26X e persi 0,26X ogni anno, creando un equilibrio).

Si noti che in futuro è probabile che Ethereum passi a un modello Proof-of-Stake (PoS) per la sicurezza, riducendo il requisito di emissione a un valore compreso tra zero e 0,05X all'anno. Nel caso in cui l'organizzazione Ethereum perda i finanziamenti o per qualsiasi altro motivo scompaia, lasciamo aperto un "contratto sociale": chiunque ha il diritto di creare una futura versione candidata di Ethereum, con l'unica condizione che la quantità di ether debba essere al massimo pari a `60102216 * (1.198 + 0.26 * n)` dove `n` è il numero di anni dopo il blocco genesi. I creatori sono liberi di vendere in crowdsale o altrimenti assegnare in parte o in toto la differenza tra l'espansione dell'offerta guidata dalla PoS e l'espansione massima consentita dell'offerta per pagare lo sviluppo. Gli aggiornamenti candidati che non rispettano il contratto sociale possono essere giustificatamente sottoposti a fork in versioni conformi.

### Centralizzazione del minaggio {#mining-centralization}

L'algoritmo di minaggio di Bitcoin funziona facendo in modo che i minatori calcolino SHA-256 su versioni leggermente modificate dell'intestazione del blocco milioni di volte ancora e ancora, finché alla fine un nodo non trova una versione il cui hash è inferiore all'obiettivo (attualmente circa 2<sup>192</sup>). Tuttavia, questo algoritmo di minaggio è vulnerabile a due forme di centralizzazione. In primo luogo, l'ecosistema di minaggio è arrivato a essere dominato dagli ASIC (circuiti integrati specifici per l'applicazione), chip per computer progettati per, e quindi migliaia di volte più efficienti in, il compito specifico del minaggio di Bitcoin. Ciò significa che il minaggio di Bitcoin non è più un'attività altamente decentralizzata ed egualitaria, richiedendo milioni di dollari di capitale per parteciparvi in modo efficace. In secondo luogo, la maggior parte dei minatori di Bitcoin non esegue effettivamente la validazione del blocco a livello locale; si affidano invece a una mining pool centralizzata per fornire le intestazioni dei blocchi. Questo problema è probabilmente peggiore: al momento in cui scriviamo, le prime tre mining pool controllano indirettamente circa il 50% della potenza di elaborazione nella rete Bitcoin, sebbene ciò sia mitigato dal fatto che i minatori possono passare ad altre mining pool se una pool o una coalizione tenta un attacco del 51%.

L'intento attuale in Ethereum è quello di utilizzare un algoritmo di minaggio in cui ai minatori è richiesto di recuperare dati casuali dallo stato, calcolare alcune transazioni selezionate casualmente dagli ultimi N blocchi nella blockchain e restituire l'hash del risultato. Questo ha due importanti vantaggi. In primo luogo, i contratti di Ethereum possono includere qualsiasi tipo di calcolo, quindi un ASIC per Ethereum sarebbe essenzialmente un ASIC per il calcolo generale, ovvero una CPU migliore. In secondo luogo, il minaggio richiede l'accesso all'intera blockchain, costringendo i minatori a memorizzare l'intera blockchain e ad essere almeno in grado di verificare ogni transazione. Ciò rimuove la necessità di mining pool centralizzate; sebbene le mining pool possano ancora svolgere il ruolo legittimo di livellare la casualità della distribuzione delle ricompense, questa funzione può essere svolta altrettanto bene da pool peer-to-peer senza alcun controllo centrale.

Questo modello non è testato e potrebbero esserci difficoltà lungo il percorso nell'evitare certe ottimizzazioni intelligenti quando si utilizza l'esecuzione dei contratti come algoritmo di minaggio. Tuttavia, una caratteristica particolarmente interessante di questo algoritmo è che consente a chiunque di "avvelenare il pozzo", introducendo un gran numero di contratti nella blockchain specificamente progettati per ostacolare determinati ASIC. Esistono incentivi economici per i produttori di ASIC a utilizzare un simile trucco per attaccarsi a vicenda. Pertanto, la soluzione che stiamo sviluppando è in definitiva una soluzione umana economica adattiva piuttosto che puramente tecnica.

### Scalabilità {#scalability}

Una preoccupazione comune riguardo a Ethereum è il problema della scalabilità. Come Bitcoin, Ethereum soffre del difetto che ogni transazione deve essere elaborata da ogni nodo della rete. Con Bitcoin, la dimensione dell'attuale blockchain si attesta a circa 15 GB, crescendo di circa 1 MB all'ora. Se la rete Bitcoin dovesse elaborare le 2000 transazioni al secondo di Visa, crescerebbe di 1 MB ogni tre secondi (1 GB all'ora, 8 TB all'anno). È probabile che Ethereum subisca un modello di crescita simile, peggiorato dal fatto che ci saranno molte applicazioni basate sulla blockchain di Ethereum invece di una sola valuta come nel caso di Bitcoin, ma migliorato dal fatto che i nodi completi di Ethereum devono memorizzare solo lo stato invece dell'intera cronologia della blockchain.

Il problema con una dimensione della blockchain così grande è il rischio di centralizzazione. Se la dimensione della blockchain aumentasse, ad esempio, a 100 TB, lo scenario probabile sarebbe che solo un numero molto piccolo di grandi aziende eseguirebbe nodi completi, con tutti gli utenti regolari che utilizzerebbero nodi SPV leggeri. In una situazione del genere, sorge la potenziale preoccupazione che i nodi completi possano unirsi e concordare tutti di imbrogliare in qualche modo redditizio (ad esempio, modificare la ricompensa del blocco, darsi dei BTC). I nodi leggeri non avrebbero modo di rilevarlo immediatamente. Naturalmente, esisterebbe probabilmente almeno un nodo completo onesto e, dopo poche ore, le informazioni sulla frode trapelerebbero attraverso canali come Reddit, ma a quel punto sarebbe troppo tardi: spetterebbe agli utenti comuni organizzare uno sforzo per inserire nella lista nera i blocchi in questione, un problema di coordinamento massiccio e probabilmente irrealizzabile su una scala simile a quella di portare a termine con successo un attacco del 51%. Nel caso di Bitcoin, questo è attualmente un problema, ma esiste una modifica della blockchain [suggerita da Peter Todd](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/) che allevierà questo problema.

A breve termine, Ethereum utilizzerà due strategie aggiuntive per far fronte a questo problema. In primo luogo, a causa degli algoritmi di minaggio basati sulla blockchain, almeno ogni minatore sarà costretto a essere un nodo completo, creando un limite inferiore al numero di nodi completi. In secondo luogo e cosa più importante, tuttavia, includeremo una radice dell'albero di stato intermedio nella blockchain dopo aver elaborato ogni transazione. Anche se la validazione del blocco è centralizzata, finché esiste un nodo di verifica onesto, il problema della centralizzazione può essere aggirato tramite un protocollo di verifica. Se un minatore pubblica un blocco non valido, quel blocco deve essere formattato male o lo stato `S[n]` non è corretto. Poiché è noto che `S[0]` è corretto, deve esserci un primo stato `S[i]` che non è corretto in cui `S[i-1]` è corretto. Il nodo di verifica fornirebbe l'indice `i`, insieme a una "prova di invalidità" costituita dal sottoinsieme di nodi dell'albero di Patricia necessari per elaborare `APPLY(S[i-1],TX[i]) -> S[i]`. I nodi sarebbero in grado di utilizzare quei nodi per eseguire quella parte del calcolo e vedere che lo `S[i]` generato non corrisponde allo `S[i]` fornito.

Un altro attacco, più sofisticato, comporterebbe la pubblicazione di blocchi incompleti da parte dei minatori malintenzionati, in modo che non esistano nemmeno le informazioni complete per determinare se i blocchi siano validi o meno. La soluzione a questo è un protocollo challenge-response (sfida-risposta): i nodi di verifica emettono "sfide" sotto forma di indici di transazione di destinazione e, alla ricezione di un nodo, un nodo leggero tratta il blocco come non attendibile finché un altro nodo, che sia il minatore o un altro verificatore, non fornisce un sottoinsieme di nodi di Patricia come prova di validità.

## Conclusione {#conclusion}

Il protocollo Ethereum è stato originariamente concepito come una versione aggiornata di una criptovaluta, fornendo funzionalità avanzate come l'escrow sulla blockchain, limiti di prelievo, contratti finanziari, mercati del gioco d'azzardo e simili tramite un linguaggio di programmazione altamente generalizzato. Il protocollo Ethereum non "supporterebbe" direttamente alcuna applicazione, ma l'esistenza di un linguaggio di programmazione Turing completo significa che, teoricamente, possono essere creati contratti arbitrari per qualsiasi tipo di transazione o applicazione. Ciò che è più interessante di Ethereum, tuttavia, è che il protocollo Ethereum va ben oltre la semplice valuta. I protocolli relativi all'archiviazione decentralizzata di file, al calcolo decentralizzato e ai mercati di previsione decentralizzati, tra dozzine di altri concetti simili, hanno il potenziale per aumentare sostanzialmente l'efficienza del settore informatico e fornire un enorme impulso ad altri protocolli peer-to-peer aggiungendo, per la prima volta, un livello economico. Infine, c'è anche una vasta gamma di applicazioni che non hanno assolutamente nulla a che fare con il denaro.

Il concetto di una funzione di transizione di stato arbitraria, così come implementata dal protocollo Ethereum, fornisce una piattaforma con un potenziale unico; piuttosto che essere un protocollo chiuso e monouso destinato a una gamma specifica di applicazioni nell'archiviazione dei dati, nel gioco d'azzardo o nella finanza, Ethereum è aperto per concezione, e crediamo che sia estremamente adatto a fungere da livello di base per un numero molto ampio di protocolli sia finanziari che non finanziari negli anni a venire.

## Note e ulteriori letture {#notes-and-further-reading}

### Note {#notes}

1. Un lettore esperto potrebbe notare che in realtà un indirizzo Bitcoin è l'hash della chiave pubblica a curva ellittica, e non la chiave pubblica stessa. Tuttavia, è di fatto una terminologia crittografica perfettamente legittima riferirsi all'hash della chiave pubblica come a una chiave pubblica stessa. Questo perché la crittografia di Bitcoin può essere considerata un algoritmo di firma digitale personalizzato, in cui la chiave pubblica consiste nell'hash della chiave pubblica ECC, la firma consiste nella chiave pubblica ECC concatenata con la firma ECC, e l'algoritmo di verifica prevede il controllo della chiave pubblica ECC nella firma rispetto all'hash della chiave pubblica ECC fornito come chiave pubblica, per poi verificare la firma ECC rispetto alla chiave pubblica ECC.
2. Tecnicamente, la mediana degli 11 blocchi precedenti.
3. Internamente, 2 e "CHARLIE" sono entrambi numeri, con quest'ultimo in rappresentazione in base 256 big-endian. I numeri possono essere almeno 0 e al massimo 2<sup>256</sup>-1.

### Ulteriori letture {#further-reading}

1. [Valore intrinseco](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)
2. [Proprietà smart](https://en.bitcoin.it/wiki/Smart_Property)
3. [Smart contract](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](http://www.weidai.com/bmoney.txt)
5. [Prove di lavoro (PoW) riutilizzabili](https://nakamotoinstitute.org/finney/rpow/)
6. [Titoli di proprietà sicuri con l'autorità del proprietario](https://nakamotoinstitute.org/library/secure-property-titles/)
7. [Whitepaper di Bitcoin](https://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Triangolo di Zooko](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Whitepaper delle Colored coin](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Whitepaper di Mastercoin](https://github.com/mastercoin-MSC/spec)
12. [Società autonome decentralizzate, Bitcoin Magazine](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Verifica di pagamento semplificata](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Alberi di Merkle](https://wikipedia.org/wiki/Merkle_tree)
15. [Alberi di Patricia](https://wikipedia.org/wiki/Patricia_tree)
16. [GHOST](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ e agenti autonomi, Jeff Garzik](http://garzikrants.blogspot.ca/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Mike Hearn sulla Proprietà smart al Turing Festival](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [RLP di Ethereum](/developers/docs/data-structures-and-encoding/rlp/)
20. [Alberi di Merkle Patricia di Ethereum](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)
21. [Peter Todd sugli alberi delle somme di Merkle](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_Per la storia del whitepaper, consulta [questa wiki](https://web.archive.org/web/20250427212319/https://ethereum.org/whitepaper/)._

_Ethereum, come molti progetti software open-source guidati dalla community, si è evoluto dalla sua concezione iniziale. Per conoscere gli ultimi sviluppi di Ethereum e come vengono apportate le modifiche al protocollo, consigliamo [questa guida](/learn/)._
