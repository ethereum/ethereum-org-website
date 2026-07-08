---
title: Proof-of-Stake vs Prova di lavoro
description: Un confronto tra il meccanismo di consenso basato sulla Proof-of-Stake e quello basato sulla Prova di lavoro di Ethereum
lang: it
---

Quando [Ethereum](/) è stato lanciato, la Proof-of-Stake (PoS) necessitava ancora di molta ricerca e sviluppo prima di poter essere considerata affidabile per proteggere Ethereum. La Prova di lavoro (PoW) era un meccanismo più semplice che era già stato collaudato da Bitcoin, il che significava che gli sviluppatori principali potevano implementarlo immediatamente per lanciare Ethereum. Ci sono voluti altri otto anni per sviluppare la Proof-of-Stake al punto in cui potesse essere implementata.

Questa pagina spiega la logica alla base del passaggio di Ethereum dalla Prova di lavoro alla Proof-of-Stake e i compromessi coinvolti.

## Sicurezza {#security}

I ricercatori di Ethereum considerano la Proof-of-Stake più sicura della Prova di lavoro. Tuttavia, è stata implementata solo di recente per la vera Mainnet di Ethereum ed è meno collaudata nel tempo rispetto alla Prova di lavoro. Le sezioni seguenti discutono i pro e i contro del modello di sicurezza della Proof-of-Stake rispetto alla Prova di lavoro.

### Costo di un attacco {#cost-to-attack}

Nella Proof-of-Stake, ai validatori è richiesto di depositare in garanzia ("mettere in staking") almeno 32 ETH in uno smart contract. Ethereum può distruggere gli ether in staking per punire i validatori che si comportano in modo scorretto. Per raggiungere il consenso, almeno il 66% degli ether totali in staking deve votare a favore di un particolare insieme di blocchi. I blocchi votati da >=66% dello stake diventano "finalizzati", il che significa che non possono essere rimossi o riorganizzati.

Attaccare la rete può significare impedire alla catena di raggiungere la definitività o garantire una certa organizzazione dei blocchi nella catena canonica che in qualche modo avvantaggi un utente malintenzionato. Ciò richiede che l'attaccante devii il percorso del consenso onesto accumulando una grande quantità di ether e votando direttamente con essi, oppure ingannando i validatori onesti affinché votino in un modo particolare. A parte gli attacchi sofisticati e a bassa probabilità che ingannano i validatori onesti, il costo per attaccare Ethereum è il costo dello stake che un attaccante deve accumulare per influenzare il consenso a proprio favore.

Il costo più basso di un attacco è >33% dello stake totale. Un attaccante che detiene >33% dello stake totale può causare un ritardo nella definitività semplicemente andando offline. Questo è un problema relativamente minore per la rete poiché esiste un meccanismo noto come "perdita per inattività" che sottrae progressivamente lo stake ai validatori offline finché la maggioranza online non rappresenta il 66% dello stake e può finalizzare nuovamente la catena. È anche teoricamente possibile per un attaccante causare una doppia definitività con poco più del 33% dello stake totale creando due blocchi invece di uno quando gli viene chiesto di essere un produttore di blocchi e poi votando due volte con tutti i propri validatori. Ogni fork richiede solo che il 50% dei restanti validatori onesti veda prima ogni blocco, quindi se riescono a tempificare i loro messaggi nel modo giusto, potrebbero essere in grado di finalizzare entrambi i fork. Questo ha una bassa probabilità di successo, ma se un attaccante fosse in grado di causare una doppia definitività, la comunità di Ethereum dovrebbe decidere di seguire un fork, nel qual caso i validatori dell'attaccante subirebbero necessariamente lo slashing sull'altro.

Con >33% dello stake totale, un attaccante ha la possibilità di avere un effetto minore (ritardo della definitività) o più grave (doppia definitività) sulla rete Ethereum. Con oltre 14.000.000 di ETH in staking sulla rete e un prezzo rappresentativo di 1000 $/ETH, il costo minimo per sferrare questi attacchi è `1000 x 14,000,000 x 0.33 = $4,620,000,000`. L'attaccante perderebbe questo denaro attraverso lo slashing e verrebbe espulso dalla rete. Per attaccare di nuovo, dovrebbe accumulare >33% dello stake (di nuovo) e bruciarlo (di nuovo). Ogni tentativo di attaccare la rete costerebbe >4,6 miliardi di dollari (a 1000 $/ETH e 14 milioni di ETH in staking). L'attaccante viene anche espulso dalla rete quando subisce lo slashing e deve unirsi a una coda di attivazione per rientrare. Ciò significa che la frequenza di un attacco ripetuto è limitata non solo dalla velocità con cui l'attaccante può accumulare >33% dello stake totale, ma anche dal tempo necessario per inserire tutti i propri validatori nella rete. Ogni volta che l'attaccante attacca, diventa molto più povero e il resto della comunità diventa più ricco, grazie al conseguente shock dell'offerta.

Altri attacchi, come gli attacchi del 51% o l'inversione della definitività con il 66% dello stake totale, richiedono sostanzialmente più ETH e sono molto più costosi per l'attaccante.

Confrontiamo questo con la Prova di lavoro. Il costo per lanciare un attacco su Ethereum basato sulla Prova di lavoro era il costo di possedere costantemente >50% dell'hash rate totale della rete. Ciò equivaleva all'hardware e ai costi di gestione di una potenza di calcolo sufficiente per superare gli altri minatori nel calcolare costantemente le soluzioni della Prova di lavoro. Il minaggio di Ethereum avveniva principalmente utilizzando GPU piuttosto che ASIC, il che manteneva bassi i costi (sebbene se Ethereum fosse rimasto sulla Prova di lavoro, il minaggio con ASIC sarebbe potuto diventare più popolare). Un avversario dovrebbe acquistare molto hardware e pagare l'elettricità per farlo funzionare per attaccare una rete Ethereum basata sulla Prova di lavoro, ma il costo totale sarebbe inferiore al costo richiesto per accumulare abbastanza ETH per lanciare un attacco. Un attacco del 51% è ~[20 volte meno](https://youtu.be/1m12zgJ42dI?t=1562) costoso sulla Prova di lavoro rispetto alla Proof-of-Stake. Se l'attacco venisse rilevato e la catena subisse un hard fork per rimuovere le loro modifiche, l'attaccante potrebbe utilizzare ripetutamente lo stesso hardware per attaccare il nuovo fork.

### Complessità {#complexity}

La Proof-of-Stake è molto più complessa della Prova di lavoro. Questo potrebbe essere un punto a favore della Prova di lavoro poiché è più difficile introdurre accidentalmente bug o effetti indesiderati in protocolli più semplici. Tuttavia, la complessità è stata domata da anni di ricerca e sviluppo, simulazioni e implementazioni su testnet. Il protocollo Proof-of-Stake è stato implementato in modo indipendente da cinque team separati (su ciascuno dei livelli di esecuzione e di consenso) in cinque linguaggi di programmazione, fornendo resilienza contro i bug dei client.

Per sviluppare e testare in sicurezza la logica di consenso della Proof-of-Stake, la Beacon Chain è stata lanciata due anni prima che la Proof-of-Stake fosse implementata sulla Mainnet di Ethereum. La Beacon Chain ha agito come una sandbox per i test della Proof-of-Stake, poiché era una blockchain live che implementava la logica di consenso della Proof-of-Stake ma senza toccare le vere transazioni di Ethereum - di fatto raggiungendo il consenso solo su se stessa. Una volta che questa è stata stabile e priva di bug per un tempo sufficiente, la Beacon Chain è stata "fusa" (merged) con la Mainnet di Ethereum. Tutto ciò ha contribuito a domare la complessità della Proof-of-Stake al punto che il rischio di conseguenze indesiderate o bug dei client era molto basso.

### Superficie di attacco {#attack-surface}

La Proof-of-Stake è più complessa della Prova di lavoro, il che significa che ci sono più potenziali vettori di attacco da gestire. Invece di una rete peer-to-peer che collega i client, ce ne sono due, ciascuna delle quali implementa un protocollo separato. Avere un validatore specifico preselezionato per proporre un blocco in ogni slot crea il potenziale per attacchi denial-of-service in cui grandi quantità di traffico di rete mettono offline quel validatore specifico.

Ci sono anche modi in cui gli attaccanti possono tempificare attentamente il rilascio dei loro blocchi o attestazioni in modo che vengano ricevuti da una certa proporzione della rete onesta, influenzandoli a votare in determinati modi. Infine, un attaccante può semplicemente accumulare ETH sufficienti per fare staking e dominare il meccanismo di consenso. Ognuno di questi [vettori di attacco ha difese associate](/developers/docs/consensus-mechanisms/pos/attack-and-defense), ma non esistono per essere difesi sotto la Prova di lavoro.

## Decentralizzazione {#decentralization}

La Proof-of-Stake è più decentralizzata della Prova di lavoro perché le corse agli armamenti per l'hardware di minaggio tendono a escludere dal mercato gli individui e le piccole organizzazioni. Sebbene chiunque possa tecnicamente iniziare il minaggio con hardware modesto, la probabilità di ricevere una ricompensa è incredibilmente piccola rispetto alle operazioni di minaggio istituzionali. Con la Proof-of-Stake, il costo dello staking e il rendimento percentuale su quello stake sono gli stessi per tutti. Attualmente costa 32 ETH eseguire un validatore.

D'altra parte, l'invenzione dei derivati di staking liquido ha portato a preoccupazioni di centralizzazione perché alcuni grandi fornitori gestiscono grandi quantità di ETH in staking. Questo è problematico e deve essere corretto il prima possibile, ma è anche più sfumato di quanto sembri. I fornitori di staking centralizzati non hanno necessariamente il controllo centralizzato dei validatori: spesso è solo un modo per creare un pool centrale di ETH che molti operatori di nodi indipendenti possono mettere in staking senza che ogni partecipante richieda 32 ETH propri.

L'opzione migliore per Ethereum è che i validatori vengano eseguiti localmente sui computer di casa, massimizzando la decentralizzazione. Questo è il motivo per cui Ethereum resiste ai cambiamenti che aumentano i requisiti hardware per l'esecuzione di un nodo/validatore.

## Sostenibilità {#sustainability}

La Proof-of-Stake è un modo a basse emissioni di carbonio per proteggere la blockchain. Sotto la Prova di lavoro i minatori competono per il diritto di minare un blocco. I minatori hanno più successo quando possono eseguire calcoli più velocemente, incentivando gli investimenti in hardware e il consumo di energia. Questo è stato osservato per Ethereum prima che passasse alla Proof-of-Stake. Poco prima della transizione alla Proof-of-Stake, Ethereum consumava circa 78 TWh/anno, quanto un piccolo paese. Tuttavia, il passaggio alla Proof-of-Stake ha ridotto questo dispendio energetico di circa il 99,98%. La Proof-of-Stake ha reso Ethereum una piattaforma efficiente dal punto di vista energetico e a basse emissioni di carbonio.

[Maggiori informazioni sul consumo energetico di Ethereum](/energy-consumption)

## Emissione {#issuance}

L'Ethereum basato sulla Proof-of-Stake può pagare per la sua sicurezza emettendo molte meno monete rispetto all'Ethereum basato sulla Prova di lavoro perché i validatori non devono pagare alti costi per l'elettricità. Di conseguenza, l'ETH può ridurre la sua inflazione o persino diventare deflazionistico quando grandi quantità di ETH vengono bruciate. Livelli di inflazione più bassi significano che la sicurezza di Ethereum è più economica rispetto a quando era sotto la Prova di lavoro.

## Preferisci imparare visivamente? {#visual-learner}


<VideoWatch slug="pow-vs-pos" />

## Letture consigliate {#further-reading}

- [Filosofia di progettazione della Proof-of-Stake di Vitalik](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [FAQ sulla Proof-of-Stake di Vitalik](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)
- [Video "Simply Explained" su PoS vs PoW](https://www.youtube.com/watch?v=M3EFi_POhps)