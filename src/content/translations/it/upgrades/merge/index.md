---
title: La Fusione
description: "Scopri La Fusione: quando la Rete principale di Ethereum ha adottato il Poof of stake."
lang: it
template: upgrade
image: ../../../../../assets/upgrades/merge.png
summaryPoint1: La Rete principale di Ethereum usa il Poof of stake, ma non è sempre stato così.
summaryPoint2: La transizione dal meccanismo originale di Proof of Work al Proof of stake è stata chiamata La Fusione.
summaryPoint3: La Fusione si riferisce al momento in cui la Rete principale originale di Ethereum è divenuta parte di una blockchain di Proof of stake separata, detta Beacon Chain, ora esistente come un'unica catena.
summaryPoint4: La Fusione ha ridotto il consumo energetico di Ethereum di circa il 99,95%.
---

## In cosa ha consistito la Fusione? {#what-is-the-merge}

La Fusione è stata l'unione del livello di esecuzione originale di Ethereum (la Rete principale che esisteva dalla [genesi](/history/#frontier)) con il suo nuovo livello di consenso di Proof of stake, la Beacon Chain. Ha eliminato la necessità di grandi quantità di energia richieste dal processo di mining, consentendo invece di proteggere la rete utilizzando l'ETH in staking. È stato un passo davvero emozionante nel realizzare la visione di Ethereum: maggiori scalabilità, sicurezza e sostenibilità.

<MergeInfographic />

Inizialmente, la [Beacon Chain](/upgrades/beacon-chain/) veniva inviata separatamente dalla [Rete principale](/glossary/#mainnet). La Rete principale di Ethereum, con tutti i suoi account, saldi, smart contract e lo stato della blockchain, continuava a esser protetta dalla [Proof of Work](/developers/docs/consensus-mechanisms/pow/), anche mentre la Beacon Chain funzionava in parallelo utilizzando la [Proof of stake](/developers/docs/consensus-mechanisms/pos/). La Fusione si è verificata quando, finalmente, questi due sistemi si sono uniti e il Poof of Work è stata permanentemente sostituita dal Proof of stake.

Immagina Ethereum come una nave lanciata prima di essere pronta per un viaggio interstellare. Con la Beacon Chain, la community ha costruito un nuovo motore e uno scafo più resistente. Dopo test significativi, è arrivato il momento di scambiare il vecchio motore con quello nuovo durante il volo. Questo ha aggiunto il nuovo e più efficiente motore nella nave esistente, consentendole di percorrere diversi anni luce e conquistare l'universo.

## La fusione con la rete principale {#merging-with-mainnet}

La Proof of Work ha protetto la Rete rrincipale di Ethereum dalla genesi alla Fusione. Questo ha permesso alla blockchain di Ethereum a cui siamo tutti abituati di venire alla luce, nel luglio 2015, con tutte le sue funzionalità familiari: transazioni, smart contract, account, ecc.

Nella storia di Ethereum, gli sviluppatori si sono preparati per un'eventuale transizione dal Proof of Work al Proof of stake. Il 1° dicembre 2020, la Beacon Chain è stata creata come una blockchain separata dalla Rete principale, eseguita in parallelo.

Originariamente la Beacon Chain non elaborava le transazioni della Rete principale. Invece, ha raggiunto il consenso sul proprio stato, concordando sui validatori attivi e i saldi dei loro account. Dopo numerose prove, è giunto il momento che la Beacon Chain raggiunga il consenso sui dati del mondo reale. Dopo La Fusione, la Beacon Chain è diventata il motore di consenso per tutti i dati della rete, incluse le transazioni e i saldi degli account del livello di esecuzione.

La Fusione ha rappresentato il passaggio ufficiale all'uso della Beacon Chain come il motore della produzione del blocco. Il mining non è più il mezzo di produzione di blocchi validi. Invece, i validatori del Proof of stake hanno adottato questo ruolo e sono ora responsabili dell'elaborazione della validità di tutte le transazioni e della proposta dei blocchi.

Con La Fusione, la cronologia non è andata perduta. Quando la Rete principale si è fusa con la Beacon Chain, ha unito anche l'intera cronologia delle transazioni di Ethereum.

<InfoBanner>
Questa transizione al Proof of stake ha cambiato il metodo di emissione dell'ether. Scopri di più sull'<a href="/upgrades/merge/issuance/">emissione di ether prima e dopo La Fusione</a>.
</InfoBanner>

### Utenti e detentori {#users-holders}

**La Fusione non ha modificato nulla per i detentori/utenti.**

_Vale la pena ripeterlo_: Come utente o detentore di ETH o di qualsiasi altra risorsa digitale su Ethereum, nonché come staker non operante su nodi, **non devi fare nulla coi tuoi fondi o il tuo portafoglio per approcciare La Fusione.** Gli ETH sono sempre ETH. Non esiste nulla del tipo "vecchi ETH"/"nuovi ETH" o "ETH1"/"ETH2" e i portafogli funzioneranno esattamente allo stesso modo dopo La Fusione. Le persone che dicono altro sono probabilmente truffatori.

Nonostante il passaggio dal Proof of Work, l'intera cronologia di Ethereum dalla genesi è rimasta intatta e inalterata dalla transizione al Proof of stake. Ogni fondo detenuto nel tuo portafoglio prima de La Fusione sarà ancora accessibile dopo di essa. **Non è richiesta alcuna azione di aggiornamento da parte tua.**

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

Non completare i primi due elementi farà sì che il tuo nodo risulti "offline", finché entrambi i livelli non saranno sincronizzati e autenticati.

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
title="Sviluppatori di dapp e smart contract"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

La Fusione comporta modifiche al consenso, che includono anche modifiche correlate a:

- la struttura del blocco
- tempistiche dello slot/blocco
- modifiche all'opcode
- fonti di casualità su catena
- concetto di _testa sicura_ e _blocchi finalizzati_

Per ulteriori informazioni, dai un'occhiata a questo post del blog di Tim Beiko su [Come La Fusione Influisce sul Livello di Applicazione di Ethereum](https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/).
</ExpandableCard>

## La Fusione e il consumo energetico {#merge-and-energy}

Questa fase ha segnato la fine del Proof of Work per Ethereum e l'inizio di una rete Ethereum più sostenibile ed ecologica. Il consumo energetico di Ethereum si è ridotto di una stima del 99,95%, rendendo Ethereum una blockchain ecosostenibile. Scopri di più sul [consumo energetico di Ethereum](/energy-consumption/).

## La Fusione e il ridimensionamento {#merge-and-scaling}

La Fusione ha inoltre gettato le basi per ulteriori aggiornamenti di scalabilità, impossibili sotto il Poof of Work, portando Ethereum un po' più vicina al raggiungimento della completa scalabilità, sicurezza e sostenibilità delinate nella [visione di Ethereum](/upgrades/vision/).

## Equivoci su La Fusione {#misconceptions}

<ExpandableCard
title="Equivoci: &quot;Eseguire un nodo richiede lo staking di 32 ETH.&quot;"
contentPreview="False. Anyone is free to sync their own self-verified copy of Ethereum (i.e. run a node). No ETH is required—not before The Merge, not after The Merge, not ever.">
Esistono due tipi di nodi di Ethereum: i nodi che possono proporre blocchi e quelli che non possono.

I nodi che propongono blocchi sono solo una minima parte dei nodi totali su Ethereum. Questa categoria include i nodi di mining in modalità Proof of Work (PoW) e i nodi validatori in modalità Proof of stake (PoS). Questa categoria richiede l'impegno di risorse economiche (come la potenza di hash della GPU nel Proof of Work o ETH in staking nel Proof of stake) in cambio della capacità di proporre occasionalmente il blocco successivo e ottenere le ricompense del protocollo.

Gli altri nodi sulla rete (cioè, la maggioranza) non devono impegnare alcuna risorsa economica oltre a un computer di livello consumer con 1-2 TB di spazio di archiviazione disponibile e una connessione a Internet. Questi nodi non propongono i blocchi, ma rivestono comunque un ruolo critico nel proteggere la rete, considerando responsabili tutti i propositori di blocchi, attendendo nuovi blocchi e verificandone la validità all'arrivo secondo le regole del consenso di rete. Se il blocco è valido, il nodo continua a propagarlo per la rete. Se per qualsiasi motivo il blocco non è valido, il software del nodo lo scarterà come non valido e ne interromperà la propagazione.

Eseguire un nodo che non produce blocchi è possibile per chiunque in entrambi i meccanismi di consenso (Proof of Work o Proof of stake); è _fortemente consigliato_ a tutti gli utenti che ne hanno i mezzi. Eseguire un nodo è estremamente prezioso per Ethereum e offre benefici aggiuntivi a ogni persona che ne esegue uno, come maggiore sicurezza, privacy e resistenza alla censura.

L'abilità per chiunque di eseguire il proprio nodo è _assolutamente essenziale_ per mantenere la decentralizzazione della rete Ethereum.

[Maggiori informazione sull'esecuzione del proprio nodo](/run-a-node/)

</ExpandableCard>

<ExpandableCard
title="Equivoco: &quot;La Fusione non è riuscita a ridurre le commissioni del carburante.&quot;"
contentPreview="False. The Merge was a change of consensus mechanism, not an expansion of network capacity, and was never intended to lower gas fees.">
Le commissioni del carburante sono un prodotto della domanda di rete rispetto alla capacità della rete. La Fusione ha reso obsoleto l'uso del Proof of Work, passando al Proof of stake per il consenso, ma non ha modificato significativamente alcun parametro che influenzi direttamente la capacità o il volume di rete.

Con una [tabella di marcia incentrata sul rollup](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698), gli sforzi si concentrano su scalare l'attività degli utenti al [livello 2](/layer-2/), abilitando allo stesso tempo la Rete principale di livello 1 come livello di accordo decentralizzato sicuro, ottimizzato per l'archiviazione dei dati di rollup per aiutare a rendere esponenzialmente più economiche le transazioni di rollup. La transizione al Proof of stake è un precursore essenziale per realizzarlo. [Maggiori informazioni su carburante e commissioni.](/developers/docs/gas/)
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
contentPreview="False. Staking withdrawals are not yet enabled with The Merge. The following Shanghai upgrade will enable staking withdrawals.">
Gli ETH in staking e le ricompense di staking continuano a esser bloccate, senza possibilità di prelievo. I prelievi sono pianificati per il prossimo aggiornamento di Shanghai.
</ExpandableCard>

<ExpandableCard
title="Equivoco: &quot;I validatori non riceveranno alcuna ricompensa liquida in ETH fino all'aggiornamento di Shanghai, quando saranno abilitati i prelievi.&quot;"
contentPreview="False. Fee tips/MEV are credited to a non-staking account controlled by the validator, available immediately.">
Questo potrebbe sembrare controintuitivo rispetto alla nota precedente, ovvero che i prelievi non saranno abilitati fino all'aggiornamento di Shanghai, ma i validatori HANNO accesso immediato alle ricompense/MEV delle commissioni ottenute durante le proposte dei blocchi.

Il protocollo emette ETH come una ricompensa ai validatori per aver contribuito al consenso. Il livello di consenso tiene conto degli ETH appena emessi, in cui un validatore ha un indirizzo univoco che detiene i suoi ETH in staking e le ricompense del protocollo. Questi ETH sono bloccati fino a Shanghai.

Gli ETH sul livello di esecuzione sono contabilizzati separatamente dal livello di consenso. Quando gli utenti eseguono transazioni sulla Rete principale di Ethereum, gli ETH devono esser pagati per coprire il carburante, inclusa una mancia al validatore. Questi ETH sono già sul livello di esecuzione, NON sono appena stati emessi dal protocollo e sono disponibili immediatamente al validatore (a condizione che un indirizzo `fee recipient` adatto sia fornito al software client).
</ExpandableCard>

<ExpandableCard
title="Equivoco: &quot;Quando i prelievi saranno abilitati, gli staker usciranno tutti insieme.&quot;"
contentPreview="False. Validator exits are rate limited for security reasons.">
Dopo che l'aggiornamento di Shanghai avrà consento i prelievi, tutti i validatori saranno incentivati a prelevare il proprio saldo di staking oltre i 32 ETH, poiché questi fondi non si aggiungono al rendimento e sono altrimenti bloccati. A seconda dell'APR (determinato dagli ETH in staking totali), potrebbero esser incentivati a uscire dai loro validatori per rivendicare il proprio saldo per intero o metterne potenzialmente in staking persino di più usando le proprie ricompense per ottenere maggiori rendimenti.

Ecco un'importante avvertenza, le uscite complete dai validatori sono limitate in termini di frequenza dal protocollo, quindi solo sei validatori possono uscire per ogni epoca (ogni 6,4 minuti, quindi 1350 al giorno o solo circa 43.200 ETH al giorno degli oltre 10 milioni di ETH in staking). Questo limite di frequenza si regola a seconda degli ETH in staking totali e impedisce un esodo di massa di fondi. Inoltre, impedisce a un potenziale utente malevolo di usare il suo saldo di staking per commettere un illecito passibile di slashing e di uscire dal suo saldo di staking per intero nella stessa epoca prima che il protocollo possa applicare la sanzione di slashing.

L'APR è intenzionalmente dinamico, consentendo a un mercato di staker di ponderare quanto vogliano essere pagati per contribuire a proteggere la rete. Quando i prelievi saranno abilitati, se la frequenza sarà troppo bassa, allora i validatori usciranno a una frequenza limitata dal protocollo. Questo porterà gradualmente all'aumento dell'APR per chiunque rimanga, attirando staker nuovi o di ritorno.
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

<ButtonLink to="/upgrades/beacon-chain/">
  La beacon chain
</ButtonLink>

### La Fusione e l'aggiornamento di Shanghai {#merge-and-shanghai}

Per poter semplificare e massimizzare l'attenzione sulla riuscita della transizione al Proof of stake, l'aggiornamento de La Fusione non ha incluso alcune funzionalità annunciate, come la possibilità di prelevare gli ETH in staking. Si prevede che l'aggiornamento di Shanghai segua La Fusione, abilitando la possibilità di prelievo per gli staker.

Rimani aggiornato sul [Problema di pianificazione dell'aggiornamento di Shanghai su GitHub](https://github.com/ethereum/pm/issues/450), o sul [Blog di Ricerca e Sviluppo dell'EF](https://blog.ethereum.org/category/research-and-development/). Per i curiosi, scoprite di più su [Cosa succede dopo la Fusione](https://youtu.be/7ggwLccuN5s?t=101), presentato da Vitalik all'evento ETHGlobal di aprile 2021.

### La Fusione e lo sharding {#merge-and-data-sharding}

Originariamente, il piano prevedeva di lavorare allo sharding prima della Fusione per risolvere la questione della scalabilità. Tuttavia, con il boom delle [soluzioni di ridimensionamento del livello 2](/layer-2/), la priorità si è spostata sul passaggio dal Proof of Work al Proof of stake.

I piani per lo sharding si stanno evolvendo rapidamente, ma data la nascita e il successo delle tecnologie di livello 2 per scalare l'esecuzione delle transazioni, i piani per lo sharding hanno spostato l'attenzione sul trovare il modo ottimale per distribuire il carico per memorizzare i dati di chiamata compressi dai contratti di rollup, consentendo la crescita esponenziale della capacità di rete. Questo sarebbe impossibile senza prima passare al Proof of stake.

<ButtonLink to="/upgrades/sharding/">
  Sharding
</ButtonLink>

## Letture consigliate {#further-reading}

<MergeArticleList />
