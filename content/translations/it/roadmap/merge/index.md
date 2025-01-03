---
title: La Fusione
description: 'Scopri La Fusione: quando la Rete principale di Ethereum ha adottato il Poof of stake.'
lang: it
template: upgrade
image: /images/upgrades/merge.png
alt:
summaryPoint1: La Rete Principale di Ethereum utilizza il proof-of-stake, ma non è sempre stato così.
summaryPoint2: L'aggiornamento dal meccanismo originale di proof-of-work al proof-of-stake, è stato detto La Fusione.
summaryPoint3: La Fusione si riferisce all'unione della Rete Principale di Ethereum con una blockchain di proof-of-stake separata, detta Beacon Chain, ora coesistenti come un'unica catena.
summaryPoint4: La Fusione ha ridotto il consumo energetico di Ethereum di circa il 99,95%.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  La Fusione è avvenuta il 15 settembre 2022. Ciò ha portato a termine la transizione di Ethereum al consenso di proof-of-stake, deprecando ufficialmente il proof-of-work e riducendo il consumo energetico di circa il 99,95%.
</UpgradeStatus>

## In cosa ha consistito la Fusione? {#what-is-the-merge}

La Fusione è stata l'unione del livello di esecuzione originale di Ethereum (la Rete principale che esisteva dalla [genesi](/history/#frontier)) con il suo nuovo livello di consenso di Proof of stake, la Beacon Chain. Ha eliminato la necessità di grandi quantità di energia richieste dal processo di mining, consentendo invece di proteggere la rete utilizzando l'ETH in staking. È stato un passo davvero emozionante nel realizzare la visione di Ethereum: maggiori scalabilità, sicurezza e sostenibilità.

<MergeInfographic />

Inizialmente, la [Beacon Chain](/roadmap/beacon-chain/) veniva inviata separatamente dalla [Rete principale](/glossary/#mainnet). La Rete Principale di Ethereum, con tutti i suoi conti, saldi, contratti intelligenti e stati della blockchain, ha continuato a essere protetta dal [proof-of-work](/developers/docs/consensus-mechanisms/pow/), anche mentre la Beacon Chain veniva eseguita in parallelo, utilizzando il [proof-of-stake](/developers/docs/consensus-mechanisms/pos/). La Fusione si è verificata quando, finalmente, questi due sistemi si sono uniti e il Poof of Work è stata permanentemente sostituita dal Proof of stake.

Immagina Ethereum come una nave lanciata prima di essere pronta per un viaggio interstellare. Con la Beacon Chain, la community ha costruito un nuovo motore e uno scafo più resistente. Dopo test significativi, è arrivato il momento di scambiare il vecchio motore con quello nuovo durante il volo. Questo ha aggiunto il nuovo e più efficiente motore nella nave esistente, consentendole di percorrere diversi anni luce e conquistare l'universo.

## La fusione con la rete principale {#merging-with-mainnet}

La Proof of Work ha protetto la Rete rrincipale di Ethereum dalla genesi alla Fusione. Questo ha consentito alla blockchain di Ethereum a cui siamo tutti abituati di venire alla luce, a luglio 2015, con tutte le sue funzionalità familiari: transazioni, contratti intelligenti, conti, etc.

Nella storia di Ethereum, gli sviluppatori si sono preparati per un'eventuale transizione dal Proof of Work al Proof of stake. Il 1° dicembre 2020, la Beacon Chain è stata creata come una blockchain separata dalla Rete principale, eseguita in parallelo.

Originariamente la Beacon Chain non elaborava le transazioni della Rete principale. Invece, stava raggiungendo il consenso sul proprio stato, concordando sui validatori attivi e i saldi dei loro conti. Dopo numerose prove, è giunto il momento che la Beacon Chain raggiunga il consenso sui dati del mondo reale. Dopo La Fusione, la Beacon Chain è divenuta il motore di consenso per tutti i dati della rete, incluse le transazioni del livello d'esecuzione e i saldi dei conti.

La Fusione ha rappresentato il passaggio ufficiale all'uso della Beacon Chain come il motore della produzione del blocco. Il mining non è più il mezzo di produzione di blocchi validi. Invece, i validatori del Proof of stake hanno adottato questo ruolo e sono ora responsabili dell'elaborazione della validità di tutte le transazioni e della proposta dei blocchi.

Con La Fusione, la cronologia non è andata perduta. Quando la Rete principale si è fusa con la Beacon Chain, ha unito anche l'intera cronologia delle transazioni di Ethereum.

<InfoBanner>
Questa transizione al Proof of stake ha cambiato il metodo di emissione dell'ether. Scopri di più sull'<a href="/roadmap/merge/issuance/">emissione di ether prima e dopo La Fusione</a>.
</InfoBanner>

### Utenti e detentori {#users-holders}

**La Fusione non ha modificato nulla per i detentori/utenti.**

_Vale la pena ripeterlo_: Come utente o detentore di ETH o di qualsiasi altra risorsa digitale su Ethereum, nonché come staker non operatore di nodo, **non devi fare nulla coi tuoi fondi o il tuo portafoglio per approcciare La Fusione.** Gli ETH sono sempre ETH. Non esiste nulla del tipo "vecchi ETH"/"nuovi ETH" o "ETH1"/"ETH2" e i portafogli funzioneranno esattamente allo stesso modo dopo La Fusione. Le persone che dicono altro sono probabilmente truffatori.

Nonostante il passaggio dal Proof of Work, l'intera cronologia di Ethereum dalla genesi è rimasta intatta e inalterata dalla transizione al Proof of stake. Qualsiasi fondo detenuto nel tuo portafoglio prima della Fusione è ancora accessibile dopo di essa. **Non è richiesta alcuna azione di aggiornamento da parte tua.**

[Maggiori informazioni sulla sicurezza di Ethereum](/security/#eth2-token-scam)

### Operatori di nodi e sviluppatori di dapp {#node-operators-dapp-developers}

<ExpandableCard
title="Operatori e fornitori di nodi di staking"
contentPreview="If you are a staker running your own node setup or a node infrastructure provider, there are a few things you need to be aware of after The Merge."
id="staking-node-operators">

Gli elementi dell'azione chiave includono:

1. Esegui _sia_ un client di consenso che uno di esecuzione; gli endpoint di terze parti per ottenere i dati di esecuzione non funzioneranno successivamente alla Fusione.
2. Autentica sia il client di esecuzione che quello di consenso con un segreto JWT condiviso, così che tu possa comunicare in sicurezza.
3. Imposta un indirizzo `fee recipient` per ricevere le mance/MEV di commissioni su transazioni che hai guadagnato.

Non completare i primi due elementi farà sì che il tuo nodo risulti "offline" finché entrambi i livelli non saranno sincronizzati e autenticati.

Non impostare un `fee recipient` consentirà comunque al tuo validatore di comportarsi come al solito, ma perderai le mance e qualsiasi MEV di commissioni non bruciate che avresti altrimenti ottenuto nei blocchi proposti dal tuo validatore.
</ExpandableCard>

<ExpandableCard
title="Operatori di nodi non validanti e fornitori di infrastrutture"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

Fino a La Fusione, un client di esecuzione (come Geth, Erigon, Besu o Nethermind) era sufficiente per ricevere, convalidare correttamente e propagare i blocchi oggetto di gossip dalla rete. _Dopo La Fusione_, la validità delle transazioni contenute in un payload di esecuzione dipende ora dalla validità del "blocco di consenso" in cui sono contenute.

Di conseguenza, un nodo completo di Ethereum richiede ora sia un client di esecuzione che uno di consenso. Questi due client collaborano usando una nuova API Engine. L'API Engine richiede l'autenticazione usando un segreto JWT, fornito a entrambi i client, che consente la comunicazione sicura.

Gli elementi d'azione chiave includono:

- Installare un client di consenso oltre a un client di esecuzione
- Autenticare i client di esecuzione e di consenso con un segreto JWT condiviso, così che possano comunicare in sicurezza tra loro.

Non completare i suddetti elementi farà sì che il tuo nodo risulti "offline", finché entrambi i livelli non saranno sincronizzati e autenticati.

</ExpandableCard>

<ExpandableCard
title="Sviluppatori di dapp e contratti intelligenti"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

La Fusione è stata accompagnata da modifiche al consenso, incluse anche modifiche relative a:<

<ul>
  <li>struttura del blocco</li>
  <li>tempistiche spazio/blocco</li>
  <li>modifiche ai codici operativi</li>
  <li>fonti di casualità su catena on-chain</li>
  <li>concetto di <em>testa sicura</em> e <em>blocchi finalizzati</em></li>
</ul>

Per ulteriori informazioni, consulta questo post del blog di Tim Beiko su <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/">Come La Fusione Influenza il Livello d'Applicazione di Ethereum</a>.

</ExpandableCard>

## La Fusione e il consumo energetico {#merge-and-energy}

La Fusione ha segnato la fine del proof-of-work per Ethereum e ha dato inizio all’era di una rete Ethereum più sostenibile ed ecologica. Il consumo energetico di Ethereum si è ridotto di una stima del 99,95%, rendendo Ethereum una blockchain ecosostenibile. Scopri di più sul [consumo energetico di Ethereum](/energy-consumption/).

## La Fusione e il ridimensionamento {#merge-and-scaling}

La Fusione ha inoltre gettato le basi per ulteriori aggiornamenti di scalabilità, impossibili sotto il Poof of Work, portando Ethereum un po' più vicina al raggiungimento della completa scalabilità, sicurezza e sostenibilità delinate nella [visione di Ethereum](/roadmap/vision/).

## Equivoci su La Fusione {#misconceptions}

<ExpandableCard
title="Equivoci: &quot;Eseguire un nodo richiede lo staking di 32 ETH.&quot;"
contentPreview="False. Anyone is free to sync their own self-verified copy of Ethereum (i.e. run a node). No ETH is required—not before The Merge, not after The Merge, not ever.">

Esistono due tipi di nodi di Ethereum: i nodi che possono proporre blocchi e quelli che non possono.

I nodi che propongono blocchi sono solo una minima parte dei nodi totali su Ethereum. Questa categoria include i nodi di mining in modalità Proof of Work (PoW) e i nodi validatori in modalità Proof of stake (PoS). Questa categoria richiede l'impegno di risorse economiche (come la potenza di hash della GPU nel Proof of Work o ETH in staking nel Proof of stake) in cambio della capacità di proporre occasionalmente il blocco successivo e ottenere le ricompense del protocollo.

Gli altri nodi sulla rete (cioè, la maggioranza) non devono impegnare alcuna risorsa economica oltre a un computer di livello consumer con 1-2 TB di spazio di archiviazione disponibile e una connessione a Internet. Questi nodi non propongono blocchi, tuttavia, rivestono un ruolo critico nel proteggere la rete, considerando responsabili tutti i propositori di blocco, ascoltando nuovi blocchi e verificandone la validità all'arrivo, secondo le regole di consenso della rete. Se il blocco è valido, il nodo continua a propagarlo per la rete. Se per qualsiasi motivo il blocco non è valido, il software del nodo lo scarterà come non valido e ne interromperà la propagazione.

Eseguire un nodo che non produce blocchi è possibile per chiunque, in entrambi i meccanismi di consenso (proof-of-work o proof-of-stake); si <em>vivamente consigliato</em> a tutti gli utenti, se ne hanno i mezzi. Eseguire un nodo è estremamente prezioso per Ethereum e offre benefici aggiuntivi a ogni persona che ne esegue uno, come maggiore sicurezza, privacy e resistenza alla censura.

L'abilità per chiunque di gestire il proprio nodo è <em>assolutamente essenziale</em> per mantenere la decentralizzazione della rete di Ethereum.

<a href="/run-a-node/">Ulteriori informazioni sull'esecuzione di un proprio nodo</a>

</ExpandableCard>

<ExpandableCard
title="Equivoco: &quot;La Fusione non è riuscita a ridurre le commissioni del gas.&quot;"
contentPreview="False. The Merge was a change of consensus mechanism, not an expansion of network capacity, and was never intended to lower gas fees.">

Le commissioni del gas sono un prodotto della domanda di rete relativo alla capacità della rete. La Fusione ha reso obsoleto l'uso del Proof of Work, passando al Proof of stake per il consenso, ma non ha modificato significativamente alcun parametro che influenzi direttamente la capacità o il volume di rete.

Con una <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">tabella di marcia incentrata sui rollup</a>, gli sforzi si concentrano sul ridimensionamento delle attività degli utenti al <a href="/layer-2/">livello 2</a>, consentendo alla Rete Principale di Livello 1 di essere un livello di accordo decentralizzato e sicuro, ottimizzato per l'archiviazione dei dati dei rollup, per aiutare a rendere esponenzialmente più economiche le transazioni dei rollup. La transizione al Proof of stake è un precursore essenziale per realizzarlo. <a href="/developers/docs/gas/">Ulteriori informazioni su gas e commissioni.</a>

</ExpandableCard>

<ExpandableCard
title="Equivoco: &quot;Le transazioni sono state sostanzialmente accelerate dalla Fusione.&quot;"
contentPreview="False. Though some slight changes exist, transaction speed is mostly the same on layer 1 now as it was before The Merge.">
La "velocità" di una transazione è misurabile in diversi modi, incluso il tempo di inclusione in un blocco e il tempo alla finalizzazione. Entrambi cambiano lievemente, ma non in modo apprezzabile dagli utenti.

Storicamente, con il Poof of Work, l'obiettivo era avere un nuovo blocco ogni 13,3 secondi circa. Con il Poof of stake, gli slot si verificano precisamente ogni 12 secondi, e ciascuno rappresenta un'opportunità per un validatore di pubblicare un blocco. Gran parte degli slot contiene blocchi, ma non necessariamente tutti (cioè un validatore è offline). Nel Proof of stake, i blocchi sono prodotti a una frequenza del 10% circa maggiore che nel Proof of Work. Questo è stato un cambiamento abbastanza irrilevante ed è improbabile che sia notato dagli utenti.

La Proof of stake ha introdotto il concetto di finalità della transazione che, precedentemente, non esisteva. Nel Proof of Work, la capacità di annullare un blocco diventa esponenzialmente più difficile all'aumentare dei blocchi minati su una transazione, ma non raggiunge mai lo zero. In modalità Proof of stake, i blocchi sono raggruppati in epoche (intervalli di 6,4 minuti contenenti 32 possibili blocchi), su cui votano i validatori. Quando termina un'epoca, i validatori votano se considerare l'epoca 'giustificata'. Se i validatori acconsentono a giustificare l'epoca, questa viene finalizzata nell'epoca successiva. Annullare le transazioni finalizzate è economicamente non redditizio, in quanto richiederebbe di ottenere e bruciare oltre un terzo dell'ETH in staking totale.

</ExpandableCard>

<ExpandableCard
title="Equivoco: &quot;La Fusione ha abilitato i prelievi di staking.&quot;"
contentPreview="False, but staking withdrawals have since been enabled via the Shanghai/Capella upgrade.">

Inizialmente, dopo La Fusione, gli staker potevano accedere soltanto alle mance delle commissioni e la MEV guadagnate come conseguenza delle proposte di blocchi. Queste ricompense sono accreditate a un conto non di staking, controllato dal validatore (noto come il <em>destinatario della commissione</em>) e sono immediatamente disponibili. Queste ricompense sono separate dalle ricompense del protocollo, per l'esecuzione dei doveri del validatore.

Dall'aggiornamento della rete di Shanghai/Capella, gli staker possono ora designare un <em>indirizzo di prelievo</em> per iniziare a ricevere pagamenti automatici di qualsiasi saldo di staking in eccesso (ETH superiori a 32, da ricompense del protocollo). Questo aggiornamento, inoltre, ha consentito la capacità di un validatore di sbloccare e rivendicare l'intero saldo all'uscita dalla rete.

<a href="/staking/withdrawals/">Maggiori informazioni sui prelievi in staking</a>

</ExpandableCard>

<ExpandableCard
title="Equivoco: &quot;Ora che La Fusione è completa e i prelievi sono abilitati, gli staker potrebbero uscire tutti in una volta.&quot;"
contentPreview="False. Validator exits are rate limited for security reasons.">
Quando l'aggiornamento di Shnanghai/Capella ha consentito i prelievi, i validatori sono stati incentivati a prelevare il proprio saldo di staking superiore a 32 ETH, poiché questi fondi non si sommano alla resa e sono altrimenti bloccati. A seconda dell'APR (determinato dagli ETH in staking totali), potrebbero esser incentivati a uscire dai loro validatori per rivendicare il proprio saldo per intero o metterne potenzialmente in staking persino di più usando le proprie ricompense per ottenere maggiori rendimenti.

Un importante avvertimento, qui, le uscite dei validatori completi sono limitate in tasso dal protocollo e soltanto un certo numero di validatori può uscire, per ogni epoca (ogni 6,4 minuti). Questo limite fluttua a second del numero di validatori attivi, ma equivale, all'incirca, allo 0,33% degli ETH in staking totali, che possono uscire dalla rete in un singolo giorno.

Ciò impedisce un esodo di massa dei fondi in staking. Inoltre, previene che un potenziale utente malevolo, con accesso a una grande porzione degli ETH in staking totali, commetta un illecito passibile di slashing e prelevi per intero i saldi del validatore incriminato di staking per intero nella stessa epoca prima che il protocollo possa applicare la sanzione di slashing.

L'APR, inoltre, è intenzionalmente dinamico, consentendo a un mercato di staker di bilanciare quanto desiderano essere pagati per contribuire alla protezione della rete. Se il tasso è troppo basso, i validatori usciranno a un tasso limitato dal protocollo. Questo porterà gradualmente all'aumento dell'APR per chiunque rimanga, attirando staker nuovi o di ritorno.
</ExpandableCard>

## Cos'è successo a 'Eth2'? {#eth2}

Il termine 'Eth2' è stato superato. Dopo aver fuso 'Eth1' ed 'Eth2' in una singola catena, non vi è più alcun bisogno di distinguere tra le due reti di Ethereum; esiste solo Ethereum.

Per limitare la confusione, la community ha aggiornato questi termini:

- 'Eth1' è ora il 'livello di esecuzione' che gestisce le transazioni e l'esecuzione.
- 'Eth2' è ora il 'livello di consenso', che gestisce il consenso di Proof of stake.

Questi aggiornamenti della terminologia cambiano solo le convenzioni di nomenclatura, senza alterare gli obiettivi né la tabella di marcia di Ethereum.

[Scopri di più sulla rinominazione di 'Eth2'](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)

## Relazione tra gli aggiornamenti {#relationship-between-upgrades}

Gli aggiornamenti di Ethereum sono tutti in qualche modo interconnessi. Quindi, ricapitoliamo di come la Fusione si collega agli altri aggiornamenti.

### La Fusione e la Beacon Chain {#merge-and-beacon-chain}

La Fusione rappresenta l'adozione formale della Beacon Chain come nuovo livello di consenso al livello di esecuzione originale della Rete principale. A partire dalla Fusione, i validatori sono assegnati alla Rete principale sicura di Ethereum e il mining su [Proof of Work](/developers/docs/consensus-mechanisms/pow/) non è più un mezzo valido di produzione di blocchi.

I blocchi sono invece proposti dai nodi di convalida, che ottengono ETH in staking in cambio del diritto di partecipare al consenso. Questi aggiornamenti stabiliscono le basi per gli aggiornamenti di scalabilità futuri, incluso lo sharding.

<ButtonLink href="/roadmap/beacon-chain/">
  La beacon chain
</ButtonLink>

### La Fusione e l'aggiornamento di Shanghai {#merge-and-shanghai}

Per poter semplificare e massimizzare l'attenzione sulla riuscita della transizione al Proof of stake, l'aggiornamento de La Fusione non ha incluso alcune funzionalità annunciate, come la possibilità di prelevare gli ETH in staking. Questa funzionalità è stata abilitata separatamente, con l'aggiornamento di Shanghai/Capella.

Per i curiosi, scoprite di più su [Cosa succede dopo la Fusione](https://youtu.be/7ggwLccuN5s?t=101), presentato da Vitalik all'evento ETHGlobal di aprile 2021.

### La Fusione e lo sharding {#merge-and-data-sharding}

Originariamente, il piano prevedeva di lavorare allo sharding prima della Fusione per risolvere la questione della scalabilità. Tuttavia, con il boom delle [soluzioni di ridimensionamento del livello 2](/layer-2/), la priorità si è spostata sul passaggio dal Proof of Work al Proof of stake.

I piani per lo sharding si stanno evolvendo rapidamente, ma data la nascita e il successo delle tecnologie di livello 2 per scalare l'esecuzione delle transazioni, i piani per lo sharding hanno spostato l'attenzione sul trovare il modo ottimale per distribuire il carico per memorizzare i dati di chiamata compressi dai contratti di rollup, consentendo la crescita esponenziale della capacità di rete. Questo sarebbe impossibile senza prima passare al Proof of stake.

<ButtonLink href="/roadmap/danksharding/">
  Sharding
</ButtonLink>

## Letture consigliate {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />
