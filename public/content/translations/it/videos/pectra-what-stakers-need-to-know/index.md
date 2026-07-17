---
title: "Aggiornamento Pectra di Ethereum: cosa devono sapere gli staker"
description: "Spiegazione dell'aggiornamento Pectra dal punto di vista di uno staker, coprendo gli impatti pratici sui validatori, le operazioni di staking e i principali EIP che influenzano lo staking nel protocollo Ethereum."
lang: it
youtubeId: "_UpAFpC7X6Y"
uploadDate: 2025-01-22
duration: "0:09:14"
educationLevel: intermediate
topic:
  - "roadmap"
  - "pectra"
  - "staking"
format: explainer
author: Blockdaemon
breadcrumb: "Pectra per gli staker"
---

Un webinar ospitato da **Blockdaemon** con l'ingegnere blockchain Julia Schmidt (Alluvial) e Freddy Tänzer (Blockdaemon) che discute di come l'aggiornamento Pectra influisca sullo staking di ETH. Il webinar copre i prelievi attivabili dal livello di esecuzione, gli aumenti del saldo effettivo massimo, il consolidamento dei validatori e le implicazioni dello staking liquido.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=_UpAFpC7X6Y) pubblicata da Blockdaemon. È stata leggermente modificata per facilitarne la lettura.*

#### Introduzione (0:00) {#introduction-000}

**Host:** Ciao e benvenuti a questo webinar ospitato da Blockdaemon incentrato sull'imminente aggiornamento Pectra di Ethereum. Con noi oggi ci sono Julia Schmidt, ingegnere blockchain presso Alluvial, e Freddy Tänzer, responsabile dell'ecosistema Ethereum di Blockdaemon, per discutere di come i cambiamenti di Pectra avranno un impatto sullo staking di ETH, sulla rete nel suo complesso, sui servizi di staking liquido e altro ancora. Per iniziare, Freddy: potresti darci una breve panoramica dell'aggiornamento Pectra e di quale sarà il suo impatto sugli staker?

#### Cos'è Pectra (1:28) {#what-is-pectra-128}

**Freddy Tänzer:** Dunque, Pectra è un aggiornamento di Ethereum programmato per la fine del primo trimestre del 2025 — circa a marzo, potrebbe slittare un po' più in là, forse ad aprile o giù di lì. All'inizio doveva essere un piccolo fork, ma poi sono state aggiunte sempre più cose, quindi ora lo hanno diviso in due.

La prima parte contiene molte cose — ad esempio, per quanto riguarda gli smart account, l'astrazione dell'account e cose del genere — ma voglio concentrarmi davvero sulle cose che sono rilevanti per il nostro pubblico in termini di modifiche allo staking. Ce ne sono principalmente due grandi.

La prima è il fatto che si possono attivare prelievi e uscite dal proprio validatore tramite il livello di esecuzione — le credenziali di prelievo — eliminando di fatto la dipendenza dall'operatore del nodo. La seconda, probabilmente ancora più grande nei suoi effetti, è che il saldo effettivo massimo di un validatore ora può cambiare. Prima era solo di 32 ETH come importo fisso, e ora può essere compreso tra 32 e 2.048 ETH.

Ce n'è anche una più piccola che porta fondamentalmente al fatto che i depositi sono molto più rapidi — registrati onchain da circa 14 ore a meno di un'ora — ma penso che quelle due siano le più rilevanti per la nostra discussione qui.

#### EIP-7002: uscite attivabili dal livello di esecuzione (2:58) {#eip-7002-execution-layer-triggerable-exits-258}

**Host:** Per il primo grande cambiamento, Julia, potresti spiegare come cambierà il processo post-Pectra rispetto ai modi attuali in cui vengono avviati i prelievi nell'ecosistema di staking di Ethereum?

**Julia Schmidt:** Per proporre e attestare i blocchi, il validatore deve essere costantemente online e avere un saldo in staking di 32 ETH. Quando si configura un validatore per prendere parte al meccanismo di consenso, si configurano due chiavi. Una è la chiave del validatore, che viene utilizzata per eseguire i compiti del validatore: la firma delle attestazioni dei blocchi. La seconda è la chiave di prelievo, che rappresenta la proprietà degli ETH in staking.

Ci sono due modi per fare staking: il solo staking, o configurazioni multi-custodia come con Blockdaemon e come stiamo facendo in Liquid Collective, dove puoi scegliere il tuo operatore del nodo per svolgere tutti i compiti e le operazioni del validatore per tuo conto. Questo dà loro la chiave del validatore, e tu hai accesso solo alla chiave di prelievo.

Il messaggio effettivo per l'uscita di un validatore può essere inviato solo dalla chiave del validatore che è controllata dall'operatore del nodo. Questo richiede di fidarsi del proprio operatore del nodo: dipendere da loro per l'uscita del proprio validatore. Se lo fanno, è fantastico, ma devi sempre fare affidamento su questa terza parte.

Quello che succedeva in precedenza era che si accettava di pre-firmare i messaggi di uscita quando si configurava questa impostazione di staking multi-custodia. Si otteneva un messaggio che si poteva usare in seguito per l'uscita del validatore, ma non si sapeva se il messaggio di uscita avrebbe effettivamente funzionato. Ogni volta che c'era un aggiornamento in Ethereum che cambiava il numero di versione, il tuo messaggio di uscita poteva non funzionare più.

Nell'ultimo aggiornamento Dencun, un nuovo EIP ha modificato il tempo di scadenza di questi messaggi di uscita, ma stava solo curando il sintomo, non risolvendo il problema. Il vero problema è che il proprietario degli ETH in staking non può attivare il prelievo. I fondi possono essere essenzialmente tenuti in ostaggio dall'operatore del nodo.

Questo è ora risolto con l'EIP-7002, che consente sia alla chiave del validatore che alla chiave di prelievo di attivare l'uscita dal livello di esecuzione, semplicemente inviando una transazione a uno speciale contratto di prelievo in cui si invia una richiesta di prelievo e si specifica un'uscita completa del validatore o un prelievo parziale dal saldo in staking.

#### EIP-7251: saldo effettivo massimo (4:15) {#eip-7251-max-effective-balance-415}

**Host:** Freddy, potresti darci una panoramica del saldo effettivo massimo da Pectra in poi, e di come questo avrà un impatto sulle persone che attualmente fanno staking?

**Freddy Tänzer:** Solo per aggiungere: per i nostri clienti istituzionali, questa dipendenza dall'operatore del nodo veniva solitamente affrontata con messaggi di uscita pre-firmati, principalmente per rispondere alle preoccupazioni delle autorità di regolamentazione o ai problemi di continuità aziendale. Dovevano anche tenere al sicuro quei messaggi di uscita. Quindi c'è una chiara semplificazione del processo, eliminando quella dipendenza.

Ora, sul saldo effettivo massimo: molte cose non cambiano, e tutto questo è facoltativo (opt-in). Non devi cambiare nulla. L'obiettivo degli sviluppatori principali di Ethereum e dell'ecosistema in generale è ridurre il numero di validatori sulla rete. Siamo a oltre un milione di validatori ora, e ognuno deve comunicare con gli altri riguardo alle attestazioni e al consenso. È un sacco di traffico di rete: i test hanno dimostrato che raggiungere i due milioni di validatori potrebbe essere un problema.

L'obiettivo è ridurre il numero di validatori senza influire sulla sicurezza della rete, poiché la quantità totale di ETH in staking rimarrebbe costante, solo con più ETH per validatore in media.

Per il cliente, significa principalmente che deve decidere se utilizzare il nuovo tipo di validatore o quello vecchio. Questo dipende dalle sue esigenze di liquidità. Nell'attuale configurazione con validatori da 32 ETH, le ricompense del protocollo verranno inviate alle tue credenziali di prelievo ogni nove o dieci giorni, offrendoti liquidità regolare.

Ma molte configurazioni presuppongono che le ricompense vengano utilizzate per capitalizzare lo stake. In passato, durante la capitalizzazione, dovevi aspettare di avere 32 ETH in ricompense per lanciare manualmente un nuovo validatore. Con il nuovo tipo di validatore, le tue ricompense si capitalizzano automaticamente: questo significa più ricompense e meno lavoro.

Il compromesso è che non ottieni ricompense regolarmente e devi impostare un processo per recuperarle. Le attivazioni dei prelievi sono ora transazioni regolari che comportano una commissione del gas, piuttosto che ricevere ricompense gratuitamente nel vecchio modello.

Ci sono buone notizie anche sullo slashing: la penalità iniziale di slashing scenderà drasticamente, di circa 128 volte. Con un validatore da 32 ETH, la penalità iniziale era di un ETH. Dopo Pectra, sarà una frazione di un ETH, forse 20 o 25 dollari. Questo ha effetti collaterali positivi sul solo staking, che è ovviamente importante per la neutralità credibile di Ethereum.

Il vantaggio della capitalizzazione automatica va a beneficio principalmente di importi di stake più piccoli. Se hai mille validatori, potresti lanciarne manualmente uno nuovo ogni mese. Ma se hai un solo validatore, dovresti praticamente aspettare 32 anni per capitalizzare.

#### Implicazioni dello staking liquido (11:25) {#liquid-staking-implications-1125}

**Host:** Julia, come si confronta il consolidamento dei validatori più grandi con i vantaggi dello staking liquido? Come peseranno queste decisioni nella mente di uno staker dopo Pectra?

**Julia Schmidt:** In Alluvial, abbiamo seguito da vicino questi cambiamenti e vogliamo offrire entrambe le soluzioni. Le richieste di consolidamento in Pectra sono una soluzione provvisoria che non dovrebbe influire sul tempo di guadagno del tuo saldo effettivo: non dovrà passare di nuovo attraverso una coda di attivazione quando si consolidano più validatori. Il processo è abbastanza fluido.

Il fatto che la penalità iniziale di slashing sia stata abbassata riduce il rischio di gestire validatori con saldi elevati. La spinta della Ethereum Foundation è davvero quella di consolidare il più possibile per ridurre il carico della rete. C'è un piccolo svantaggio: nel rarissimo caso in cui un validatore con saldo effettivo massimo di 2.048 ETH subisca uno slashing, finirebbe nella coda di uscita e i tuoi fondi verrebbero bloccati per un tempo più lungo: sarebbe come se 64 validatori subissero uno slashing contemporaneamente. Quindi cercheremmo di offrire massimali flessibili per i validatori in base alla propensione al rischio del cliente.

Dal lato dell'utilità, un token di liquid staking (LST) aggiunge ovviamente liquidità: anche con prelievi parziali dal livello di esecuzione, non sarà istantaneo. Invia la transazione, viene messa in coda, poi c'è l'epoca di uscita e l'epoca di prelievo. I token di liquid staking offrono comunque una liquidità istantanea che i prelievi parziali non possono offrire.

#### Prossimi passi per gli staker (16:20) {#next-steps-for-stakers-1620}

**Freddy Tänzer:** Quello che vediamo è che le istituzioni finanziarie in genere mettono in staking tra il 65% e l'85% dei loro ETH in custodia, perché hanno bisogno del resto come riserva di liquidità per i rimborsi. Con lo staking liquido, puoi potenzialmente aumentare la quantità di ETH in staking, il che genera ricompense più elevate.

Entrambe le parti traggono vantaggio da Pectra: lo staking liquido ottiene l'opzione dei prelievi dal livello di esecuzione, e lo staking tradizionale ottiene l'eliminazione del problema dell'incremento di 32 ETH, in particolare per gli stake più piccoli.

**Julia Schmidt:** Con il protocollo Liquid Collective, non offriamo lo staking a un solo operatore del nodo: abbiamo un consorzio di diversi operatori del nodo a cui assegniamo gli stake con un approccio round-robin. Questo aumenta la decentralizzazione degli ETH in staking. E questi operatori del nodo seguono il NORS (Node Operator Risk Standard), quindi garantiamo anche la copertura in caso di slashing.

Un vantaggio chiave che non ho ancora menzionato sono i prelievi parziali: ora che puoi prelevare gli ETH in staking dal livello di esecuzione, questo apre nuove strade per protocolli come EigenLayer per attivare prelievi e uscite. C'è un enorme aumento di funzionalità e interoperabilità che la finanza decentralizzata (DeFi) può ora incorporare meglio nell'intero ciclo di vita del validatore, dal deposito all'uscita. Come ingegnere blockchain, è entusiasmante poter automatizzare l'intero flusso di lavoro.

#### Conclusione (19:50) {#closing-1950}

**Host:** Julia, dove possono andare le persone per saperne di più su Liquid Collective e Alluvial?

**Julia Schmidt:** Potete seguire Alluvial e Liquid Collective su Twitter, su X, su LinkedIn o sul sito web di Alluvial. Condivideremo un articolo che descrive in dettaglio i cambiamenti riguardanti l'aggiornamento Pectra e come influenzeranno il panorama di Ethereum.

**Host:** Freddy, ci sono aggiornamenti da condividere riguardo a Pectra?

**Freddy Tänzer:** Abbiamo molte novità in arrivo. Avremo una pagina dedicata sul nostro sito web, blockdaemon.com: sarà l'hub centrale di tutte le risorse. Avremo un post sul blog, delle FAQ e alcune linee guida e raccomandazioni di modellazione riguardo a quale tipo di validatore scegliere e di quali dimensioni. Che tu voglia un validatore da 2.000 ETH, o due da 1.000, o quattro da 500: tutte queste opzioni sono generalmente possibili e ci sono decisioni di compromesso da prendere. Aiuteremo i nostri clienti a orientarsi in tutto questo.

**Host:** Fantastico. Freddy, Julia, molte grazie per il vostro tempo oggi: una discussione affascinante e un'ottima introduzione a Pectra.