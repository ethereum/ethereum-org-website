---
title: 7 euristiche per la progettazione di interfacce Web3
description: "Principi per migliorare l'usabilità del Web3"
lang: it
---

Le euristiche di usabilità sono "regole pratiche" generali che puoi utilizzare per misurare l'usabilità del tuo sito.
Le 7 euristiche qui presentate sono specificamente adattate per il Web3 e dovrebbero essere utilizzate insieme ai [10 principi generali per la progettazione dell'interazione](https://www.nngroup.com/articles/ten-usability-heuristics/) di Jakob Nielsen.

## Sette euristiche di usabilità per il web3 {#seven-usability-heuristics-for-web3}

1. Il feedback segue l'azione
2. Sicurezza e fiducia
3. Le informazioni più importanti sono ovvie
4. Terminologia comprensibile
5. Le azioni sono il più brevi possibile
6. Le connessioni di rete sono visibili e flessibili
7. Controllo dall'app, non dal portafoglio

## Definizioni ed esempi {#definitions-and-examples}

### 1. Il feedback segue l'azione {#feedback-follows-action}

**Dovrebbe essere ovvio quando qualcosa è successo o sta succedendo.**

Gli utenti decidono i loro passi successivi in base al risultato dei passi precedenti. Pertanto è essenziale che rimangano informati sullo stato del sistema. Questo è particolarmente importante nel Web3 poiché le transazioni a volte possono richiedere un po' di tempo per essere registrate sulla blockchain. Se non c'è alcun feedback che li informi di aspettare, gli utenti non sono sicuri che sia successo qualcosa.

**Suggerimenti:** 
- Informa l'utente tramite messaggi, notifiche e altri avvisi.
- Comunica chiaramente i tempi di attesa.
- Se un'azione richiederà più di qualche secondo, rassicura l'utente con un timer o un'animazione per fargli capire che sta succedendo qualcosa.
- Se ci sono più passaggi in un processo, mostra ogni passaggio.

**Esempio:**
Mostrare ogni passaggio coinvolto in una transazione aiuta gli utenti a sapere a che punto del processo si trovano. Icone appropriate fanno conoscere all'utente lo stato delle sue azioni.

![Informare l'utente su ogni passaggio durante lo scambio di token](./Image1.png)

### 2. Sicurezza e fiducia sono integrate {#security-and-trust-are-backed-in}

La sicurezza dovrebbe avere la priorità, e questo dovrebbe essere enfatizzato per l'utente. 
Le persone tengono molto ai propri dati. La sicurezza è spesso una preoccupazione primaria per gli utenti, quindi dovrebbe essere considerata a tutti i livelli della progettazione. Dovresti sempre cercare di guadagnare la fiducia dei tuoi utenti, ma il modo in cui lo fai può significare cose diverse su app diverse. Non dovrebbe essere un ripensamento, ma dovrebbe essere progettato consapevolmente in ogni sua parte. Costruisci la fiducia attraverso l'intera esperienza utente, inclusi i canali social e la documentazione, così come l'interfaccia utente finale. Cose come il livello di decentralizzazione, lo stato multifirma della tesoreria e se il team è pubblico (doxxed), influenzano tutte la fiducia degli utenti.

**Suggerimenti:**
- Elenca con orgoglio i tuoi audit
- Ottieni più audit
- Pubblicizza qualsiasi funzionalità di sicurezza che hai progettato
- Evidenzia i possibili rischi, incluse le integrazioni sottostanti
- Comunica la complessità delle strategie
- Considera i problemi non legati all'interfaccia utente che potrebbero influenzare la percezione di sicurezza dei tuoi utenti

**Esempio:** 
Includi i tuoi audit nel piè di pagina, in dimensioni ben visibili.

![Audit citati nel piè di pagina del sito web](./Image2.png)

### 3. Le informazioni più importanti sono ovvie {#the-most-important-info-is-obvious}

Per i sistemi complessi, mostra solo i dati più rilevanti. Determina cosa è più importante e dai priorità alla sua visualizzazione. 
Troppe informazioni sono opprimenti e gli utenti in genere si ancorano a una singola informazione quando prendono decisioni. Nella DeFi, questo sarà probabilmente l'APR sulle app di rendimento e l'LTV sulle app di prestito.

**Suggerimenti:**
- La ricerca sugli utenti scoprirà la metrica più importante
- Rendi grandi le informazioni chiave e piccoli e discreti gli altri dettagli
- Le persone non leggono, scorrono; assicurati che il tuo design sia facilmente scansionabile visivamente

**Esempio:** I token grandi a colori sono facili da trovare durante lo scorrimento visivo. L'APR è grande ed evidenziato in un colore d'accento.

![Il token e l'APR sono facili da trovare](./Image3.png)

### 4. Terminologia chiara {#clear-terminology}

La terminologia dovrebbe essere comprensibile e appropriata.
Il gergo tecnico può essere un enorme ostacolo, perché richiede la costruzione di un modello mentale completamente nuovo. Gli utenti non sono in grado di mettere in relazione il design con parole, frasi e concetti che già conoscono. Tutto sembra confuso e non familiare, e c'è una ripida curva di apprendimento prima ancora che possano tentare di usarlo. Un utente potrebbe avvicinarsi alla DeFi volendo risparmiare un po' di denaro, e quello che trova è: Mining, farming, staking, emissioni, tangenti (bribes), caveau (vaults), armadietti (lockers), veToken, maturazione (vesting), epoche, algoritmi decentralizzati, liquidità di proprietà del protocollo...
Cerca di usare termini semplici che saranno compresi dal gruppo più ampio di persone. Non inventare termini completamente nuovi solo per il tuo progetto.

**Suggerimenti:**
- Usa una terminologia semplice e coerente
- Usa il più possibile il linguaggio esistente
- Non inventare i tuoi termini
- Segui le convenzioni man mano che appaiono
- Educa gli utenti il più possibile

**Esempio:**
"Le tue ricompense" è un termine neutro e ampiamente compreso; non una nuova parola inventata per questo progetto. Le ricompense sono denominate in USD per corrispondere ai modelli mentali del mondo reale, anche se le ricompense stesse sono in un altro token.

![Ricompense in token, visualizzate in dollari statunitensi](./Image4.png)

### 5. Le azioni sono il più brevi possibile {#actions-are-as-short-as-possible}

Velocizza le interazioni dell'utente raggruppando le sotto-azioni. 
Questo può essere fatto a livello di contratto intelligente, così come nell'interfaccia utente. L'utente non dovrebbe doversi spostare da una parte all'altra del sistema – o lasciare del tutto il sistema – per completare un'azione comune. 

**Suggerimenti:**
- Combina "Approva" con altre azioni dove possibile
- Raggruppa i passaggi di firma il più vicino possibile

**Esempio:** Combinare "aggiungi liquidità" e "stake" è un semplice esempio di acceleratore che fa risparmiare all'utente sia tempo che gas.

![Modale che mostra un interruttore per combinare le azioni di deposito e stake](./Image5.png)

### 6. Le connessioni di rete sono visibili e flessibili {#network-connections-are-visible-and-flexible}

Informa l'utente su quale rete è connesso e fornisci scorciatoie chiare per cambiare rete. 
Questo è particolarmente importante sulle app multi-catena. Le funzioni principali dell'app dovrebbero essere ancora visibili mentre si è disconnessi o connessi a una rete non supportata.

**Suggerimenti:**
- Mostra il più possibile dell'app mentre si è disconnessi
- Mostra a quale rete l'utente è attualmente connesso
- Non costringere l'utente ad andare sul portafoglio per cambiare rete
- Se l'app richiede all'utente di cambiare rete, richiedi l'azione dalla chiamata all'azione (CTA) principale
- Se l'app contiene mercati o caveau per più reti, indica chiaramente quale set l'utente sta attualmente guardando

**Esempio:** Mostra all'utente a quale rete è connesso e consentigli di cambiarla, nella barra dell'app.

![Pulsante a discesa che mostra la rete connessa](./Image6.png)

### 7. Controllo dall'app, non dal portafoglio {#control-from-the-app-not-the-wallet}

L'interfaccia utente dovrebbe dire all'utente tutto ciò che ha bisogno di sapere e dargli il controllo su tutto ciò che deve fare. 
Nel Web3, ci sono azioni che intraprendi nell'interfaccia utente e azioni che intraprendi nel portafoglio. Generalmente, avvii un'azione nell'interfaccia utente e poi la confermi nel portafoglio. Gli utenti possono sentirsi a disagio se questi due filoni non sono integrati con attenzione.

**Suggerimenti:**
- Comunica lo stato del sistema tramite feedback nell'interfaccia utente
- Tieni un registro della loro cronologia
- Fornisci collegamenti agli esploratori di blocchi per le vecchie transazioni
- Fornisci scorciatoie per cambiare rete. 

**Esempio:** Un contenitore discreto mostra all'utente quali token rilevanti ha nel proprio portafoglio, e la CTA principale fornisce una scorciatoia per cambiare la rete.

![La CTA principale chiede all'utente di cambiare rete](./Image7.png)