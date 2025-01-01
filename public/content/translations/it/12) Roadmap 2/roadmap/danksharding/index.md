---
title: Danksharding
description: Informazioni su Proto-Danksharding e Danksharding - due aggiornamenti sequenziali per scalare Ethereum.
lang: it
summaryPoints:
  - Il danksharding è un aggiornamento multi-fase per migliorare la scalabilità e la capacità di Ethereum.
  - La prima fase, il Proto-Danksharding, aggiunge i blob di dati ai blocchi
  - I blob di dati offrono un modo più economico per i rollup di pubblicare i dati su Ethereum, tali costi possono essere trasferiti agli utenti sotto forma di commissioni di transazione inferiori.
  - In seguito, il Dansharding completo diffonderà la responsabilità di verificare i blob di dati tra i sottoinsiemi di nodi, ridimensionando ulteriormente Ethereum, a oltre 100.000 transazioni al secondo.
---

# Danksharding {#danksharding}

Il **Danksharding** è il metodo tramite cui Ethereum diventa una blockchain realmente scalabile ma, per arrivarci, sono necessari diversi aggiornamenti del protocollo. Il **Proto-Danksharding** è un passaggio intermedio, lungo tale percorso. Entrambi mirano a rendere le transazioni sul Livello 2 quanto più possibile economiche per gli utenti e dovrebbero ridimensionare Ethereum a >100.000 transazioni al secondo.

## Cos'è il Proto-Danksharding? {#what-is-protodanksharding}

Il proto-danksharding, anche noto come [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), è un modo per i [rollup](/layer-2/#rollups) per aggiungere dati più economici ai blocchi. Il nome proviene dai due ricercatori che hanno proposto l'idea: Protolambda e Dankrad Feist. Storicamente, i rollup erano limitati nell'economicità che possono apportare alle transazioni dell'utente dal fatto che pubblicassero le proprie transazioni in `CALLDATA`.

Ciò è costoso perché elaborato da tutti i nodi di Ethereum e risiede per sempre sulla catena, anche se i rollup necessitano dei dati soltanto per un breve periodo di tempo. Il Proto-Danksharding introduce i blob di dati, inviabili e collegabili ai blocchi. I dati in questi blob non sono accessibili all'EVM e sono eliminati automaticamente dopo un periodo di tempo fisso (impostato a 4096 epoche al momento di scrittura, o circa 18 giorni). Ciò significa che i rollup possono inviare i propri dati in modo molto più economico, trasferendo i risparmi agli utenti finali sotto forma di transazioni più economiche.

<ExpandableCard title="Perché i blob rendono i rollup più economici?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

I rollup sono un metodo per scalare Ethereum raggruppando le transazioni all'esterno della catena e, in seguito, pubblicando i risultati su Ethereum. Un rollup, essenzialmente, si compone di due parti: dati e controllo dell'esecuzione. I dati sono la sequenza completa delle transazioni elaborate da un rollup per produrre il cambiamento di stato pubblicato su Ethereum. Il controllo d'esecuzione è la ri-esecuzione di tali transazioni da un utente onesto (dimostratore) per aassicurarsi che il cambiamento di stato proposto sia corretto. Per effettuare il controllo d'esecuzione, i dati della transazione devono essere disponibili per un tempo sufficiente perché chiunque possa scaricarli e controllarli. Ciò significa che qualsiasi comportamento disonesto dal sequenziatore del rollup puà essere identificato e sfidato dal dimostratore. Tuttavia, non è necessario che sia disponibile per sempre.

</ExpandableCard>

<ExpandableCard title="Perché va bene eliminare i dati del blob?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

I rollup pubblicano gli impegni ai dati delle proprie transazioni on chain e, inoltre, rendono disponibili i dati effettivi nei blob di dati. Ciò significa che i dimostratori possono verificare che gli impegni siano validi o sfidare i dati che ritengono siano errati. Al livello del nodo, i blob di dati sono conservati nel client del consenso. I client del consenso attestano di aver visto i dati e che sono stati propagati per la rete. Se i dati fossero conservati per sempre, tali client si allargherebberò, determinando grandi requisiti hardware per l'esecuzione di nodi. Invece, i dati sono eliminati automaticamente dal nodo ogni 18 giorni. Le attestazioni del client del consenso dimostrano che vi è stata un'opportunità sufficiente, affinché i dimostratori potessero verificare i dati. I dati effettivi possono essere memorizzati off-chain dagli operatori di rollup, dagli utenti o da terzi.

</ExpandableCard>

### Come sono verificati i dati dei blob? {#how-are-blobs-verified}

I rollup pubblicano le transazioni che eseguono nei blob di dati. Inoltre, pubblicano un "impegno" ai dati. Lo fanno fissando una funzione polinomiale ai dati. Questa è valutabile su vari punti. Ad esempio, se definiamo una funzione estremamente semplice `f(x) = 2x-1`, possiamo valutarla per `x = 1`, `x = 2`, `x = 3`, che danno i risultati `1, 3, 5`. Un dimostratore applica la stessa funzione ai dati, valutandoli sugli stessi punti. Se i dati originali vengono modificati, la funzione non sarà identica e quindi i valori non sono valutati in ciascun punto. In realtà, l'impegno e la prova sono più complicati poiché sono avvolti in funzioni crittografiche.

### Cos'è KZG? {#what-is-kzg}

KZG sta per Kate-Zaverucha-Goldberg, i nomi dei tre [autori originali](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) di uno schema che riduce un blob di dati a un piccolo ["impegno" crittografico](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html). Il blob di dati inviato da un rollup dev'essere verificato per assicurarsi che il rollup si stia comportando correttamente. Ciò richiede la ri-esecuzione delle transazioni nel blob da un dimostratore per verificare che l'impegno sia valido. Questo equivale, concettualmente, al metodo con cui i client d'esecuzione verificano la validità delle transazioni di Ethereum sul livello 1 utilizzando le prove di Merkle. KZG è una prova alternativa che adatta un'equazione polinomiale ai dati. L'impegno valuta la polinomiale a determinati punti di dati segreti. Un dimostratore si adatterebbe alla stessa polinomiale sui dati, valutandola agli stessi valori e verificando che i risultati corrispondano. Questo è un modo di verifica dei dati compatibile con le tecniche di conoscenza zero utilizzate da alcuni rollup ed, eventualmente, da altre parti del protocollo di Ethereum.

### Cos'è la cerimonia KZG? {#what-is-a-kzg-ceremony}

La cerimonia KZG era un metodo, per molte persone da tutta la community di Ethereum, di generare collettivamente una stringa casuale segreta di numeri, utilizzabile per verificare dei dati. È molto importante che tale stringa di numeri non sia nota e non possa essere ricreata da nessuno. Per assicurarlo, ogni partecipante alla cerimonia ha ricevuto una stringa dal partecipante precedente. Quindi, creava dei nuovi valori casuali (ad esempio, consentendo al proprio browser di misurare il movimento del proprio mouse) e li mischiava con il valore precedente. Poi, inviava il valore al partecipante successivo e lo eliminava dalla propria macchina locale. Finché una persona nella cerimonia lo faceva onestamente, il valore finale non poteva essere noto a un utente malevolo.

La cerimonia KZG dell'EIP-4844 era aperta al pubblico e decine di migliaia di persone hanno partecipato per aggiungere la propria entropia (casualità). In totale ci sono stati oltre 140.000 contributi, rendendola la più grande cerimonia al mondo nel suo genere. Affinché la cerimonia sia compromessa, il 100% di questi partecipanti avrebbe dovuto essere attivamente disonesto. Dalla prospettiva dei partecipanti, se sanno di essere onesti, non è necessario fidarsi di nessun altro, poiché sanno di aver protetto la cerimonia (soddisfacendo individualmente il requisito del partecipante onesto "1 di N").

<ExpandableCard title="Per cosa si utilizza il numero casuale dalla cerimonia KZG?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Quando un rollup pubblica dati in un blob, fornisce un "impegno" che viene pubblicato sulla catena. Questo, è il risultato della valutazione di un adattamento polinomiale ai dati, in certi punti. Questi punti sono definiti dai numeri casuali generati nella cerimonia KZG. I dimostratori, quindi, possono valutare la polinomiale agli stessi punti, per poter verificare i dati; se arrivano agli stessi valori, allora i dati sono corretti.

</ExpandableCard>

<ExpandableCard title="Perché i dati casuali KZG devono rimanere segreti?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Se qualcuno conoscesse le posizioni casuali utilizzate per l'impegno, sarebbe facile, per loro, generare una nuova polinomiaale che si adatti a quei punti specifici (cioè, una "collisione"). Ciò significa che potrebbero aggiungere o rimuovere i dati dal blob e, comunque, fornire una prova valida. Per impedirlo, invece di dare ai dimostratori le posizioni segrete effettive, ricevono in realtà le posizioni, avvolte in una "scatola nera" crittografica, utilizzando le curve ellittiche. Questi, infatti, rimescolano i valori in modo tale che i valori originali non siano decodificabili, ma con dimostratori e verificatori capaci in algebra, le polinomiali sono ancora valutabili ai punti rappresentati.

</ExpandableCard>

<InfoBanner isWarning mb={8}>
  Né il Danksharding né il Proto-Danksharding seguono il tradizionale modello di “frammentazione” (sharding) che mira a dividere la blockchain in più parti. Le catene di frammenti non fanno più parte della tabella di marcia. Invece, il Danksharding utilizza il campionamento dei dati distribuiti tra blob, per ridimensionare Ethereum. Ciò è molto più semplice da implementare. Questo modello, talvolta, è stato indicato come "frammentazione dei dati".
</InfoBanner>

## Cos'è il Danksharding? {#what-is-danksharding}

Il Danksharding è la piena realizzazione del ridimensionamento del rollup, avviata con il Proto-Danksharding. Il Dankshaarding comporterà enormi quantità di spazio su Ethereum, dove i rollup potranno riversare i dati compressi delle loro transazioni. Ciò significa che Ethereum potrà supportare centinaia di rollup individuali con facilità, rendendo realtà milioni di transazioni al secondo.

Funziona espandendo i blob collegati ai blocchi da sei (6) nel proto-danksharding, a 64 nel Danksharding completo. Il resto delle modifiche necessarie sono tutti gli aggiornamenti al metodo di operazione dei client del consenso, per consentire loro di gestire i nuovi, grandi blob. Svariate di queste modifiche sono già sulla tabella di marcia per altri scopi, indipendenti dal Danksharding. Ad esempio, il Danksharding richiede la separazione del propositore e del costruttore, per essere implementata. Questo è un aggiornamento che separa le mansioni di costruzione e proposta dei blocchi, tra validatori differenti. Similmente, il campionamento della disponibilità dei dati è necessario per il Danksharding, ma è anche necessario per lo sviluppo di client molto leggeri, che non memorizzano molti dati storici ("client privi di stato").

<ExpandableCard title="Perché il Danksharding richiede la separazione di propositori e costruttori?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

La separazione di propositori e costruttori è necessaria per impedire ai singoli validatori di dover generare costosi impegni e prove, per 32 MB di dati del blob. Questo metterebbe a dura prova gli staker domestici e richiederebbe loro di investire in hardware più potenti, danneggiando la decentralizzazione. Invece, i costruttori di blocchi specializzati si prendono la responsabilità di questo costoso lavoro di calcolo. Poi, mettono a disposizione i propri blocchi ai propositori di blocchi per la trasmissione. Il propositore di blocchi, semplicemente, sceglie il blocco più redditizio. Chiunque può verificare i blob in modo economico e rapido, a significare che ogni normale validatore può verificare che i costruttori di blocchi si stiano comportando onestamente. Questo permette di elaborare i blob di grandi dimensioni senza sacrificare la decentralizzazione. I costruttori di blocchi malevoli potrebbero semplicemente essere esplusi dalla rete e tagliati; altri arriverebbero al loro posto, poiché la costruzione di blocchi è un'attività redditizia.

</ExpandableCard>

<ExpandableCard title="Perché il Danksharding richiede il campionamento della disponibilità dei dati?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

Il campionamento della disponibilità dei dati è necessario perché i validatori verifichino in modo rapido ed efficace i dati dei blob. Utilizzando il campionmento della disponibilità dei dati, i validatori possono essere davvero certi che i blob di dati fossero disponibili e che siano stati inviati correttamente. Ogni validatore può campionare casualmente alcuni punti di dati e creare una prova, a significare che nessun validatore deve verificare l'intero blob. Se mancano dei dati, saranno identificati rapidamente e il blob sarà respinto.

</ExpandableCard>

### Stato attuale {#current-progress}

Il Danksharding completo dista svariati anni. Nel mentre, la cerimonia KZG si è conclusa con oltre 140.000 contributi e l'[EIP](https://eips.ethereum.org/EIPS/eip-4844) per il Proto-Danksharding è maturata. Questa proposta è stata implementata integralmente in tutte le reti di prova, ed è stata attivata sulla Rete Principale con l'aggiornamento di rete Cancun-Deneb ("Dencun"), a marzo 2024.

### Letture consigliate {#further-reading}

- [Note sul Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Note di Dankrad sul Danksharding](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad, Proto e Vitalik discutono sul Danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [La cerimonia KZG](https://ceremony.ethereum.org/)
- [Il discorso di Carl Beekhuizen al Devcon sulle configurazioni attendibili](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Maggiori informazioni sul campionamento della disponibilità dei dati per i blob](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist su impegni e prove del KZG](https://youtu.be/8L2C6RDMV9Q)
- [Impegni polinomiali KZG](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)
