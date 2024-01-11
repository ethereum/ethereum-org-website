---
title: Proof of stake e proof of work a confronto
description: Un confronto tra il meccanismo di consenso di Ethereum basato sul proof-of-stake e sul proof-of-work
lang: it
---

Al lancio di Ethereum, il proof-of-stake necessitava ancora di molta ricerca e sviluppo prima che potesse essere affidabile per proteggere Ethereum. Il proof-of-work era un meccanismo più semplice già collaudato da Bitcoin, il che significava che gli sviluppatori principali potevano implementarlo subito per lanciare Ethereum. Ci sono voluti altri otto anni per sviluppare il proof-of-stake al punto in cui fosse possibile implementarlo.

Questa pagina spiega la logica dietro il passaggio di Ethereum al proof-of-stake dal proof-of-work e i compromessi che ne derivano.

## Sicurezza {#security}

I ricercatori di Ethereum considerano il proof-of-stake più sicuro del proof-of-work. Tuttavia, è stato implementato soltanto di recente per la vera rete principale di Ethereum ed è meno collaudato del proof-of-work. Le seguenti sezioni discutono dei pro e contro del modello di sicurezza del proof-of-stake rispetto al proof-of-work.

### Costo di attacco {#cost-to-attack}

Nel proof-of-stake, i validatori devono mettere in garanzia (in "staking") almeno 32 ETH in un contratto intelligente. Ethereum può distruggere l'ether in staking, per punire i validatori che si comportano in maniera errata. Per raggiungere il consenso, almeno il 66% dell'ether in staking totale deve votare in favore di una serie particolare di blocchi. I blocchi votati dal >=66% dello stake diventano "finalizzati", a significare che non possono essere rimossi o riorganizzati.

Attaccare la rete può significare impedire alla catena di finalizzarsi, o assicurare una certa organizzazione di blocchi nella catena canonica tale che avvantaggi un utente malevolo. Ciò richiede all'utente malevolo di deviare il percorso del consenso onesto, accumulando una grande quantità di ether e votando direttamente con essa, o ingannando i validatori onesti nel votare in un modo in particolare. A parte gli attacchi sofisticati e a bassa probabilità che ingannano i validatori onesti, il costo di attacco di Ethereum è il costo dello stake che un utente malevolo deve accumulare per influenzare il consenso a proprio favore.

Il costo minimo di attacco è il >33% dello stake totale. Un utente malevolo che possiede il >33% dello stake totale può causare un ritardo di finalità semplicemente andando offline. Questo è un problema relativamente minore per la rete, esistendo un meccanismo, noto come "perdita d'inattività", che fa trapelare lo stake dai validatori offline finché la maggioranza online non rappresenta il 66% dello stake e può nuovamente finalizzare la catena. Inoltre, è teoricamente possibile, per un utente malevolo, causare la doppia finalità con poco più del 33% dello stake totale, creando due blocchi invece di uno, quando gli viene chiesto di essere produttore di blocchi e quindi di votare due volte con tutti i validatori. Ogni biforcazione richiede che soltanto il 50% dei validatori onesti rimanenti visualizzi ogni blocco per primo, quindi, se riescono a sincronizzare i propri messaggi nel modo giusto, potrebbero riuscire a finalizzare entrambe le biforcazioni. Ciò ha una bassa probabilità di successo, ma se un utente malevolo è riuscito a causare una doppia finalità, la comunità di Ethereum dovrebbe decidere di seguire una biforcazione, nel qual caso i validatori dell'utente malevolo verrebbero necessariamente frammentati nell'altra.

Con il >33% dello stake totale, un utente malevolo ha una possibilità di avere un effetto minore (ritardo della finalità) o più grave (doppia finalità) sulla rete di Ethereum. Con più di 14.000.000 ETH in staking sulla rete e un prezzo rappresentativo di $1000/ETH, il costo minimo per eseguire questi attacchi è di `1000 x 14.000.000 x 0,33 = $4.620.000.000`. L'utente malevolo perderebbe tale denaro tramite il frazionamento e verrebbe espulso dalla rete. Per ripetere l'attacco, dovrebbe accumulare il >33% dello stake (nuovamente) e bruciarlo (di nuovo). Ogni tentativo di attaccare la rete costerebbe >$4,6 miliardi (a $1000/ETH e 14M di ETH in staking). L'utente malevolo, inoltre, viene espulso dalla rete quando è frazionato e dovrà aggiungersi alla coda d'attivazione per unirsi nuovamente. Ciò significa che il tasso di un attacco ripetuto è limitato non soltanto alla velocità a cui l'utente malevolo può accumulare il >33% dello stake totale, ma anche al tempo necessario per far accedere tutti i validatori alla rete. Ogni volta che l'utente malevolo attacca diventa molto più povero e il resto della comunità si arricchisce grazie allo shock di approvvigionamento risultante.

Altri attacchi, come gli attacchi al 51% o l'inversione di finalità con il 66% dello stake totale, richiedono sostanzialmente più ETH e sono molto più costosi per l'utente malevolo.

Confrontalo con il proof-of-work. Il costo di lanciare un attacco al proof-of-work di Ethereum era il costo di possedere costantemente il >50% del tasso di hash di rete totale. Ciò corrispondeva ai costi del hardware e di gestione della potenza di calcolo sufficiente per superare la concorrenza degli altri miner e calcolare coerentemente le soluzioni di proof-of-work. Ethereum era per lo più minato utilizzando le GPU piuttosto che l'ASIC, il che ha mantenuto i costi bassi (tuttavia, se Ethereum fosse rimasto sul proof-of-work, il mining con ASIC sarebbe potuto divenire più popolare). Un concorrente avrebbe dovuto acquistare molto hardware e pagare per l'elettricità per eseguirlo per attaccare una rete di Ethereum in proof-of-work, ma il costo totale sarebbe stato inferiore a quello richiesto per accumulare abbastanza ETH e attaccare Ethereum. Un attacco del 51% è circa [20 volte meno](https://youtu.be/1m12zgJ42dI?t=1562) costoso sul proof-of-work che sul proof-of-stake. Se l'attacco è stato rilevato e la catena è stata biforcata duramente per rimuovere le modifiche, l'utente malevolo potrebbe utilizzare ripetutamente lo stesso hardware per attaccare la nuova biforcazione.

### Complessità {#complexity}

Il proof-of-stake è molto più complesso del proof-of-work. Questo potrebbe essere un punto a favore del proof-of-work, poiché è più complesso introdurre accidentalmente bug o effetti indesiderati a dei protocolli più semplici. Tuttavia, la complessità è stata domata da anni di ricerca e sviluppo, simulazioni e implementazioni della rete di prova. Il protocollo di proof-of-stake è stato implementato indipendentemente da cinque team separati (su ogni livello d'esecuzione e del consenso), in cinque linguaggi di programmazione, fornendo resilienza contro i bug dei client.

Per sviluppare e testare in sicurezza la logica di consenso del proof-of-stake, la Beacon Chain è stata lanciata due anni prima dell'implementazione del proof-of-stake sulla rete principale di Ethereum. La Beacon Chain ha agito da sandbox per il test del proof-of-stake, essendo una blockchain attiva che implementava la logica di consenso del proof-of-stake senza toccare le transazioni reali di Ethereum, in modo efficace, arrivando al consenso soltanto su se stessa. Una volta che questa è diventata stabile e priva di bug per un periodo sufficiente, la Beacon Chain è stata "fusa" con la rete principale di Ethereum. Tutto ciò ha contribuito a "domare" la complessità del proof-of-stake al punto che i rischi di conseguenze impreviste o bug del client sono stati ridotti al minimo.

### Superficie d'attacco {#attack-surface}

Il proof-of-stake è più complesso del proof-of-work, il che significa che esistono più vettori d'attacco potenziali da gestire. Invece di una rete tra pari che connette i client, ne esistono due, ognuna delle quali implementa un protocollo separato. Avere un validatore specifico e preselezionato per proporre un blocco in ogni spazio crea il potenziale per la negazione del servizio, laddove grandi quantità di traffico di rete portano tale validatore specifico ad andare offline.

Esistono inoltre dei modi in cui gli utenti malevoli possono sincronizzare attentamente il rilascio dei propri blocchi o delle proprie attestazioni, così che siano ricevuti da una certa percentuale della rete onesta influenzandola a votare in certi modi. Infine, un utente malevolo potrebbe semplicemente accumulare abbastanza ETH da mettere in staking, dominando il meccanismo di consenso. Ognuno di questi [vettori d'attacco ha delle difese associate](/developers/docs/consensus-mechanisms/pos/attack-and-defense), ma non esistono per la difesa sotto il proof-of-work.

## Decentralizzazione {#decentralization}

Il proof-of-stake è più decentralizzato del proof-of-work perché la "corsa agli armamenti" nell'hardware di mining tende a deprezzare gli individui e le piccole organizzazioni. Mentre chiunque può tecnicamente iniziare il mining con hardware modesto, la probabilità che riceva qualsiasi ricompensa è incredibilmente piccola rispetto alle operazioni istituzionali di mining. Con il proof-of-stake, il costo dello staking e il rendimento percentuale su tale stake sono gli stessi per tutti. Al momento, l'operazione di un validatore costa 32 ETH.

D'altra parte, l'invenzione dei derivati di staking liquidi ha portato a preoccupazioni sulla centralizzazione, poiché alcuni grandi fornitori gestiscono grandi importi di ETH in staking. Ciò è problematico e dev'essere corretto il prima possibile, ma è anche più sfumato di quanto sembri. I fornitori di staking centralizzati non hanno necessariamente il controllo centralizzato dei validatori; spesso è soltanto un modo per creare un gruppo di ETH centrale, che molti operatori di nodi indipendenti possono mettere in staking, senza che siano richiesti 32 ETH a ogni partecipante.

La migliore opzione per Ethereum è che i validatori siano operati localmente sui computer domestici, massimizzando la decentralizzazione. Ecco perché Ethereum resiste alle modifiche che incrementano i requisiti hardware per l'operazione di un nodo/validatore.

## Sostenibilità {#sustainability}

Il proof-of-stake è un metodo a basso costo carbonico per proteggere la blockchain. Sotto il proof-of-work, i miner competono per il diritto di minare un blocco. I miner hanno più successo quando possono eseguire i calcoli più velocemente, incentivando l'investimento in hardware e il consumo energetico. Ciò è stato osservato per Ethereum prima che passasse al proof-of-stake. Poco dopo la transizione al proof-of-stake, Ethereum consumava approssimativamente 78 TWh/anno; tanto quanto un piccolo paese. Tuttavia, il passaggio al proof-of-stake ha ridotto il consumo energetico di circa il 99,98%. Il proof-of-stake ha reso Ethereum una piattaforma a basso tenore carbonico, nonché efficiente a livello energetico.

[Di più sul consumo energetico di Ethereum](/energy-consumption)

## Emissione {#issuance}

Il proof-of-stake di Ethereum può pagare per la sua sicurezza, emettendo molte meno monete del proof-of-work, poiché i validatori non devono pagare costi d'elettricità elevati. Di conseguenza, gli ETH possono ridurre l'inflazione o persino deflazionarsi, quando sono bruciati grandi importi di ETH. Livelli d'inflazione inferiori significano che la sicurezza di Ethereum è più economica rispetto al proof-of-work.

## Preferisci un approccio visivo all'apprendimento? {#visual-learner}

Guarda Justin Drake spiegare i benefici del proof-of-stake rispetto al proof-of-work:

<YouTube id="1m12zgJ42dI" />

## Letture consigliate {#further-reading}

- [Filosofia di design del proof-of-stake di Vitalik](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [FAQ sul proof-of-stake di Vitalik](https://vitalik.ca/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)
- [Video di "Spiegazione semplice" su PoS e PoW a confronto](https://www.youtube.com/watch?v=M3EFi_POhps)
