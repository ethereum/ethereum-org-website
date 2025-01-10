---
title: 7 euristiche per la progettazione di interfacce Web3
description: Principi per migliorare l'usabilità del Web3
lang: it
---

Le euristiche di usabilità sono “regole pratiche” generali che puoi utilizzare per misurare l'usabilità del tuo sito.
Le 7 euristiche sono specificamente su misura per il Web3 e dovrebbero essere utilizzate insieme ai [10 principi generali per la progettazione dell'interazione](https://www.nngroup.com/articles/ten-usability-heuristics/) di Jakob Nielsen.

## Sette euristiche di usabilità per il web3 {#seven-usability-heuristics-for-web3}

1. I feedback seguono l'azione
2. Sicurezza e fiducia
3. L'informazione più importante è ovvia
4. Terminologia comprensibile
5. Le azioni sono le più brevi possibili
6. Le connessioni di rete sono visibili e flessibili
7. Controllo dall'applicazione non dal portafoglio

## Definizioni ed esempi {#definitions-and-examples}

### 1. Il feedback segue l'azione {#feedback-follows-action}

**Dovrebbe essere ovvio quando qualcosa è successo o sta succedendo**

Gli utenti decidono i loro passi successivi basandosi sul risultato delle azioni precedenti. Perciò è essenziale che rimangano informati sullo stato del sistema. Questo è specialmente importante nel Web3 perché a volte le transazioni possono metterci poco tempo a impegnarsi sulla blockchain. Se non c'è un feedback che li informi di aspettare, gli utenti non sanno se è successo qualcosa o meno.

**Suggerimenti:**

- Informare gli utenti con messaggi, notifiche o altri avvisi.
- Comunicare chiaramente i tempi di attesa.
- Se un'azione impiegherà più di qualche secondo, rassicurare l'utente con un timer o un'animazione per fargli capire che sta accadendo qualcosa.
- Se ci sono vari passaggi in un processo, mostrare ogni passaggio.

**Esempio:**
Mostrare ogni passaggio previsto in una transazione aiuta gli utenti a sapere a che punto si trovano nel processo. Icone appropriate fanno sapere all'utente lo stato delle sue azioni.

![Informare l'utente di ogni passaggio quando scambia token](./Image1.png)

### 2. Sicurezza e fiducia sono integrati {#security-and-trust-are-backed-in}

La sicurezza dovrebbe essere prioritaria e questo deve essere enfatizzato per l'utente.
Le persone tengono moltissimo ai loro dati. La sicurezza è spesso una preoccupazione primaria per gli utenti e quindi deve essere considerata a tutti i livelli di progettazione. Si dovrebbe sempre cercare di guadagnare la fiducia dei propri utenti, ma il modo in cui lo si fa può avere implicazioni diverse su applicazioni differenti. Non dovrebbe essere inclusa in un secondo momento, ma dovrebbe essere progettata consapevolmente in ogni fase. Costruire la fiducia attraverso l'esperienza dell'utente, anche attraverso canali social e documentazione, oltre alla UI finale. Aspetti come il livello di decentralizzazione, lo stato multi-firma del patrimonio e se il team è doxato, avranno un effetto sulla fiducia dell'utente

**Suggerimenti:**

- Elencare fieramente i propri controlli
- Ottenere molteplici controlli
- Pubblicizzare tutte le funzionalità di sicurezza progettate
- Evidenziare i possibili rischi, comprese le integrazioni sottostanti
- Comunicare la complessità delle strategie
- Considerare le problematiche non-UI che potrebbero influire sulla percezione della sicurezza da parte degli utenti

**Esempio:**
Includere i propri controlli a piè pagina, ad una dimensione ben visibile.

![Controlli citati a piè pagina nel sito](./Image2.png)

### 3. L'informazione più importante è ovvia {#the-most-important-info-is-obvious}

Per sistemi complessi, mostrare solo i dati più rilevanti. Determinare ciò che è più importante e poi darvi priorità nella visualizzazione.
Troppe informazioni diventano opprimenti e gli utenti tipicamente si basano su una sola informazione quando devono prendere una decisione. Nella DeFi questa sarà probabilmente l'APR sulle app di rendimento e il LTV sulle app di prestito.

**Suggerimenti:**

- La ricerca sugli utenti farà chiarezza sulle metriche più importanti
- Mostrare le informazioni chiave in grande e gli altri dettagli in piccolo e in maniera discreta
- Le persone non leggono, scansionano; assicurati che il tuo design sia scansionabile

**Esempio:** I grandi token in colori pieni sono facili da trovare quando si scansiona. L'APR è grande ed evidenziato in un colore che risalta.

![Il token e l'APR sono facili da trovare](./Image3.png)

### 4. Terminologia chiara {#clear-terminology}

La terminologia dovrebbe essere comprensibile e appropriata.
Il gergo tecnico può essere un blocco notevole perché richiede la costruzione di un modello mentale completamente nuovo. Gli utenti non sono in grado di correlare il design alle parole, alle frasi e ai concetti che già conoscono. Tutto sembra confuso e poco familiare e c'è una curva di apprendimento ripida prima che possano anche tentare di utilizzarlo. Un utente potrebbe approcciarsi alla DeFi con l'intento di risparmiare un po' di denaro e quello che trova è: minare, farmare, staking, emissioni, tangenti, caveau, locker, veToken, vesting, epoche, algoritmi decentralizzati, liquidità di proprietà del protocollo…
Provare ad utilizzare termini semplici che possano essere compresi da un ampio gruppo di persone. Non inventarsi un nuovo termine di sana pianta per il proprio progetto.

**Suggerimenti:**

- Utilizzare terminologia semplice e coerente
- Utilizzare il linguaggio esistente il più possibile
- Non inventarsi dei termini nuovi
- Seguire le conversazioni come appaiono
- Educare gli utenti il più possibile

**Esempio:**
“Le tue ricompense” è un termine neutrale e ampiamente comprensibile, non una parola nuova inventata per questo progetto. Le ricompense sono denominate in USD per riflettere i modelli mentali del mondo reale, anche quando le ricompense stesse sono in un altro token.

![Ricompense dei token, visualizzate in dollari statunitensi](./Image4.png)

### 5. Le azioni sono le più brevi possibili {#actions-are-as-short-as-possible}

Velocizzare le interazioni dell'utente raggruppando le azioni secondarie.
Questo può essere fatto anche a livello di contratto intelligente o della UI. L'utente non dovrebbe essere obbligato a muoversi da una parte all'altra del sistema – o lasciare completamente il sistema – per completare delle azioni comuni.

**Suggerimenti:**

- Combinare "Approva" con altre azioni quando possibile
- Raggruppa i passaggi che richiedono una firma il più vicino possibile

**Esempio:** Combinare "aggiungi liquidità" e "metti in staking" è un semplice esempio di un passaggio veloce che fa risparmiare all'utente sia tempo che gas.

![Finestra modale che visualizza un interruttore per combinare le azioni di deposito e staking](./Image5.png)

### 6. Le connessioni di rete sono visibili e flessibili {#network-connections-are-visible-and-flexible}

Informare l'utente della rete alla quale è connesso e fornire scorciatoie chiare per cambiare rete.
Questo è particolarmente importante nelle applicazioni multi-catena. Le funzioni principali dell'applicazione dovrebbero essere sempre visibili mentre si è disconnessi o connessi a reti non supportate.

**Suggerimenti:**

- Visualizzare il più possibile dell'applicazione anche quando si è disconnessi
- Mostrare la rete alla quale l'utente è collegato in quel momento
- Non costringere l'utente ad andare nel portafoglio per poter cambiare rete
- Se l'applicazione richiede all'utente di cambiare rete, richiediere l'azione dalla chiamata all'azione principale
- Se l'applicazione contiene mercati o casseforti di più reti, dichiarare in maniera chiara quale set l'utente ha davanti in quel momento

**Esempio:** Mostrare all'utente a quale rete è collegato e permettergli di cambiarla nella barra dell'applicazione.

![Pulsante a discesa che mostra la rete connessa](./Image6.png)

### 7. Controllare dall'applicazione non dal portafoglio {#control-from-the-app-not-the-wallet}

La UI dovrebbe dire all'utente tutto ciò che deve sapere e dargli il controllo su tutto quello che deve fare.
Nel Web3 ci sono azioni che si fanno nella UI e azioni che si fanno nel portafoglio. Generalmente si inizia con un'azione nella UI e poi si conferma nel portafoglio. Gli utenti potrebbe sentirsi a disagio se queste due parti non sono attentamente integrate.

**Suggerimenti:**

- Comunicare lo stato del sistema attraverso un feedback nella UI
- Tenere un registro dello storico
- Fornire i link agli esploratori di blocchi per le vecchie transazioni
- Fornire scorciatoie per cambiare rete.

**Esempio:** Un contenitore discreto mostra all'utente quali token rilevanti ha nel proprio portafoglio e la CTA principale fornisce una scorciatoia per cambiare rete.

![La CTA principale sta chiedendo all'utente di cambiare rete](./Image7.png)
