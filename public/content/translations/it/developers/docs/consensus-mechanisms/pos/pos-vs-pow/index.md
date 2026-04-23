---
title: Prova di stake vs prova di lavoro
description: Un confronto tra il meccanismo di consenso basato sulla prova di stake e quello basato sulla prova di lavoro di Ethereum
lang: it
---

Quando [Ethereum](/) è stato lanciato, la prova di stake necessitava ancora di molta ricerca e sviluppo prima che le si potesse affidare la sicurezza di Ethereum. La prova di lavoro era un meccanismo più semplice che era già stato collaudato da Bitcoin, il che significava che gli sviluppatori principali potevano implementarlo immediatamente per lanciare Ethereum. Ci sono voluti altri otto anni per sviluppare la prova di stake al punto in cui potesse essere implementata.

Questa pagina spiega la logica alla base del passaggio di Ethereum dalla prova di lavoro alla prova di stake e i compromessi coinvolti.

## Sicurezza {#security}

I ricercatori di Ethereum considerano la prova di stake più sicura della prova di lavoro. Tuttavia, è stata implementata solo di recente per la vera rete principale di Ethereum ed è meno collaudata nel tempo rispetto alla prova di lavoro. Le sezioni seguenti discutono i pro e i contro del modello di sicurezza della prova di stake rispetto alla prova di lavoro.

### Costo per attaccare {#cost-to-attack}

Nella prova di stake, ai validatori è richiesto di depositare in garanzia ("stake") almeno 32 ETH in un contratto intelligente. Ethereum può distruggere gli ether in stake per punire i validatori che si comportano in modo scorretto. Per raggiungere il consenso, almeno il 66% degli ether totali in stake deve votare a favore di un particolare insieme di blocchi. I blocchi votati da >=66% dello stake diventano "finalizzati", il che significa che non possono essere rimossi o riorganizzati.

Attaccare la rete può significare impedire alla catena di finalizzarsi o garantire una certa organizzazione dei blocchi nella catena canonica che in qualche modo avvantaggi un utente malintenzionato. Ciò richiede che l'attaccante devii il percorso del consenso onesto accumulando una grande quantità di ether e votando direttamente con essa, oppure ingannando i validatori onesti affinché votino in un modo particolare. A parte gli attacchi sofisticati e a bassa probabilità che ingannano i validatori onesti, il costo per attaccare Ethereum è il costo dello stake che un attaccante deve accumulare per influenzare il consenso a proprio favore.

Il costo di attacco più basso è >33% dello stake totale. Un attaccante che detiene >33% dello stake totale può causare un ritardo nella finalità semplicemente andando offline. Questo è un problema relativamente minore per la rete poiché esiste un meccanismo noto come "perdita per inattività" che sottrae stake ai validatori offline finché la maggioranza online non rappresenta il 66% dello stake e può finalizzare nuovamente la catena. È anche teoricamente possibile per un attaccante causare una doppia finalità con poco più del 33% dello stake totale creando due blocchi invece di uno quando gli viene chiesto di essere un produttore di blocchi e poi votando due volte con tutti i propri validatori. Ogni biforcazione richiede solo che il 50% dei restanti validatori onesti veda prima ogni blocco, quindi se riescono a tempizzare i loro messaggi nel modo giusto, potrebbero essere in grado di finalizzare entrambe le biforcazioni. Questo ha una bassa probabilità di successo, ma se un attaccante fosse in grado di causare una doppia finalità, la comunità di Ethereum dovrebbe decidere di seguire una biforcazione, nel qual caso i validatori dell'attaccante verrebbero necessariamente puniti sull'altra.

Con >33% dello stake totale, un attaccante ha la possibilità di avere un effetto minore (ritardo della finalità) o più grave (doppia finalità) sulla rete Ethereum. Con oltre 14.000.000 di ETH in stake sulla rete e un prezzo rappresentativo di 1000 $/ETH, il costo minimo per montare questi attacchi è `1000 x 14,000,000 x 0.33 = $4,620,000,000`. L'attaccante perderebbe questo denaro venendo punito e verrebbe espulso dalla rete. Per attaccare di nuovo, dovrebbe accumulare >33% dello stake (di nuovo) e bruciarlo (di nuovo). Ogni tentativo di attaccare la rete costerebbe >4,6 miliardi di dollari (a 1000 $/ETH e 14 milioni di ETH in stake). L'attaccante viene anche espulso dalla rete quando viene punito, e deve unirsi a una coda di attivazione per rientrare. Ciò significa che la frequenza di un attacco ripetuto è limitata non solo dalla velocità con cui l'attaccante può accumulare >33% dello stake totale, ma anche dal tempo necessario per integrare tutti i propri validatori nella rete. Ogni volta che l'attaccante attacca, diventa molto più povero e il resto della comunità diventa più ricco, grazie al conseguente shock dell'offerta.

Altri attacchi, come gli attacchi del 51% o l'inversione della finalità con il 66% dello stake totale, richiedono sostanzialmente più ETH e sono molto più costosi per l'attaccante.

Confrontalo con la prova di lavoro. Il costo per lanciare un attacco su Ethereum basato sulla prova di lavoro era il costo di possedere costantemente >50% del tasso di hash totale della rete. Ciò ammontava ai costi hardware e operativi di una potenza di calcolo sufficiente per superare gli altri minatori nel calcolare costantemente le soluzioni della prova di lavoro. Ethereum veniva minato principalmente utilizzando GPU piuttosto che ASIC, il che manteneva bassi i costi (sebbene se Ethereum fosse rimasto sulla prova di lavoro, il mining con ASIC sarebbe potuto diventare più popolare). Un avversario dovrebbe acquistare molto hardware e pagare l'elettricità per farlo funzionare per attaccare una rete Ethereum basata sulla prova di lavoro, ma il costo totale sarebbe inferiore al costo richiesto per accumulare abbastanza ETH per lanciare un attacco. Un attacco del 51% è ~[20 volte meno](https://youtu.be/1m12zgJ42dI?t=1562) costoso sulla prova di lavoro rispetto alla prova di stake. Se l'attacco venisse rilevato e la catena subisse una biforcazione hard per rimuovere le loro modifiche, l'attaccante potrebbe utilizzare ripetutamente lo stesso hardware per attaccare la nuova biforcazione.

### Complessità {#complexity}

La prova di stake è molto più complessa della prova di lavoro. Questo potrebbe essere un punto a favore della prova di lavoro poiché è più difficile introdurre accidentalmente bug o effetti indesiderati in protocolli più semplici. Tuttavia, la complessità è stata domata da anni di ricerca e sviluppo, simulazioni e implementazioni su rete di test. Il protocollo della prova di stake è stato implementato in modo indipendente da cinque team separati (su ciascuno dei livelli, livello di esecuzione e livello di consenso) in cinque linguaggi di programmazione, fornendo resilienza contro i bug dei client.

Per sviluppare e testare in sicurezza la logica di consenso della prova di stake, la beacon chain è stata lanciata due anni prima che la prova di stake fosse implementata sulla rete principale di Ethereum. La beacon chain ha agito come un ambiente di prova per i test della prova di stake, poiché era una blockchain attiva che implementava la logica di consenso della prova di stake ma senza toccare le vere transazioni di Ethereum - di fatto raggiungendo il consenso solo su se stessa. Una volta che questa è stata stabile e priva di bug per un tempo sufficiente, la beacon chain è stata "fusa" con la rete principale di Ethereum. Tutto ciò ha contribuito a domare la complessità della prova di stake al punto che il rischio di conseguenze indesiderate o bug dei client era molto basso.

### Superficie di attacco {#attack-surface}

La prova di stake è più complessa della prova di lavoro, il che significa che ci sono più potenziali vettori di attacco da gestire. Invece di una rete peer-to-peer che collega i client, ce ne sono due, ciascuna delle quali implementa un protocollo separato. Avere un validatore specifico preselezionato per proporre un blocco in ogni slot crea il potenziale per attacchi denial-of-service in cui grandi quantità di traffico di rete mettono offline quel validatore specifico.

Ci sono anche modi in cui gli attaccanti possono tempizzare attentamente il rilascio dei loro blocchi o attestazioni in modo che vengano ricevuti da una certa proporzione della rete onesta, influenzandoli a votare in determinati modi. Infine, un attaccante può semplicemente accumulare ETH sufficienti per fare stake e dominare il meccanismo di consenso. Ciascuno di questi [vettori di attacco ha difese associate](/developers/docs/consensus-mechanisms/pos/attack-and-defense), ma non esistono per essere difesi sotto la prova di lavoro.

## Decentralizzazione {#decentralization}

La prova di stake è più decentralizzata della prova di lavoro perché le corse agli armamenti per l'hardware di mining tendono a escludere dal mercato individui e piccole organizzazioni. Sebbene chiunque possa tecnicamente iniziare a minare con hardware modesto, la probabilità di ricevere una ricompensa è incredibilmente piccola rispetto alle operazioni di mining istituzionali. Con la prova di stake, il costo dello staking e il rendimento percentuale su quello stake sono gli stessi per tutti. Attualmente costa 32 ETH eseguire un validatore.

D'altra parte, l'invenzione dei derivati di staking liquido ha portato a preoccupazioni di centralizzazione perché alcuni grandi fornitori gestiscono grandi quantità di ETH in stake. Questo è problematico e deve essere corretto il prima possibile, ma è anche più sfumato di quanto sembri. I fornitori di staking centralizzati non hanno necessariamente il controllo centralizzato dei validatori: spesso è solo un modo per creare un pool centrale di ETH che molti operatori di nodi indipendenti possono mettere in stake senza che ogni partecipante richieda 32 ETH propri.

L'opzione migliore per Ethereum è che i validatori vengano eseguiti localmente sui computer di casa, massimizzando la decentralizzazione. Questo è il motivo per cui Ethereum resiste ai cambiamenti che aumentano i requisiti hardware per l'esecuzione di un nodo/validatore.

## Sostenibilità {#sustainability}

La prova di stake è un modo a basse emissioni di carbonio per proteggere la blockchain. Sotto la prova di lavoro i minatori competono per il diritto di minare un blocco. I minatori hanno più successo quando possono eseguire calcoli più velocemente, incentivando gli investimenti in hardware e il consumo di energia. Questo è stato osservato per Ethereum prima che passasse alla prova di stake. Poco prima della transizione alla prova di stake, Ethereum consumava circa 78 TWh/anno, quanto un piccolo paese. Tuttavia, il passaggio alla prova di stake ha ridotto questo dispendio energetico di circa il 99,98%. La prova di stake ha reso Ethereum una piattaforma efficiente dal punto di vista energetico e a basse emissioni di carbonio.

[Maggiori informazioni sul consumo energetico di Ethereum](/energy-consumption)

## Emissione {#issuance}

L'Ethereum basato sulla prova di stake può pagare per la sua sicurezza emettendo molte meno monete rispetto all'Ethereum basato sulla prova di lavoro perché i validatori non devono pagare alti costi per l'elettricità. Di conseguenza, l'ETH può ridurre la sua inflazione o persino diventare deflazionistico quando vengono bruciate grandi quantità di ETH. Livelli di inflazione più bassi significano che la sicurezza di Ethereum è più economica rispetto a quando era sotto la prova di lavoro.

## Preferisci imparare visivamente? {#visual-learner}

Guarda Justin Drake spiegare i vantaggi della prova di stake rispetto alla prova di lavoro:

<YouTube id="1m12zgJ42dI" />

## Letture consigliate {#further-reading}

- [Filosofia di progettazione della prova di stake di Vitalik](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [FAQ sulla prova di stake di Vitalik](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)
- [Video "Simply Explained" su pos vs pow](https://www.youtube.com/watch?v=M3EFi_POhps)