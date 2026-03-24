---
title: The Merge
description: "Scopri di più su The Merge: quando la rete principale di Ethereum ha adottato la prova di stake."
lang: it
template: upgrade
image: /images/upgrades/merge.png
alt: 
summaryPoint1: "La rete principale di Ethereum utilizza la prova di stake, ma non è sempre stato così."
summaryPoint2: "L'aggiornamento dal meccanismo originale di prova di lavoro alla prova di stake è stato chiamato The Merge."
summaryPoint3: The Merge si riferisce all'unione della rete principale originale di Ethereum con una blockchain separata basata sulla prova di stake chiamata Beacon Chain, che ora esistono come un'unica catena.
summaryPoint4: The Merge ha ridotto il consumo energetico di Ethereum di circa il 99,95%.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  The Merge è stato eseguito il 15 settembre 2022. Questo ha completato la transizione di Ethereum al consenso della prova di stake, deprecando ufficialmente la prova di lavoro e riducendo il consumo energetico di circa il 99,95%.
</UpgradeStatus>

## Cos'era The Merge? {#what-is-the-merge}

The Merge è stata l'unione del livello di esecuzione originale di Ethereum (la rete principale esistente sin dalla [genesi](/ethereum-forks/#frontier)) con il suo nuovo livello di consenso basato sulla prova di stake, la Beacon Chain. Ha eliminato la necessità del mining ad alto consumo energetico e ha invece permesso di proteggere la rete utilizzando gli ETH in staking. È stato un passo davvero entusiasmante nella realizzazione della visione di [Ethereum](/): maggiore scalabilità, sicurezza e sostenibilità.

<MergeInfographic />

Inizialmente, la [Beacon Chain](/roadmap/beacon-chain/) è stata rilasciata separatamente dalla [rete principale](/glossary/#mainnet). La rete principale di Ethereum, con tutti i suoi account, saldi, contratti intelligenti e lo stato della blockchain, ha continuato a essere protetta dalla [prova di lavoro](/developers/docs/consensus-mechanisms/pow/), anche mentre la Beacon Chain veniva eseguita in parallelo utilizzando la [prova di stake](/developers/docs/consensus-mechanisms/pos/). The Merge è avvenuto quando questi due sistemi si sono finalmente uniti e la prova di lavoro è stata sostituita in modo permanente dalla prova di stake.

Immagina che Ethereum sia un'astronave lanciata prima di essere del tutto pronta per un viaggio interstellare. Con la Beacon Chain, la community ha costruito un nuovo motore e uno scafo rinforzato. Dopo test significativi, è arrivato il momento di sostituire a caldo il nuovo motore con quello vecchio in pieno volo. Questo ha fuso il nuovo motore, più efficiente, nella nave esistente, consentendole di percorrere seri anni luce e affrontare l'universo.

## Fusione con la rete principale {#merging-with-mainnet}

La prova di lavoro ha protetto la rete principale di Ethereum dalla genesi fino a The Merge. Ciò ha permesso alla blockchain di Ethereum a cui siamo tutti abituati di nascere nel luglio 2015 con tutte le sue funzionalità familiari: transazioni, contratti intelligenti, account, ecc.

Nel corso della storia di Ethereum, gli sviluppatori si sono preparati per un'eventuale transizione dalla prova di lavoro alla prova di stake. Il 1° dicembre 2020, la Beacon Chain è stata creata come blockchain separata dalla rete principale, in esecuzione in parallelo.

Inizialmente, la Beacon Chain non elaborava le transazioni della rete principale. Raggiungeva invece il consenso sul proprio stato concordando sui validatori attivi e sui saldi dei loro account. Dopo test approfonditi, è arrivato il momento per la Beacon Chain di raggiungere il consenso sui dati del mondo reale. Dopo The Merge, la Beacon Chain è diventata il motore di consenso per tutti i dati della rete, incluse le transazioni del livello di esecuzione e i saldi degli account.

The Merge ha rappresentato il passaggio ufficiale all'utilizzo della Beacon Chain come motore di produzione dei blocchi. Il mining non è più il mezzo per produrre blocchi validi. Invece, i validatori della prova di stake hanno adottato questo ruolo e sono ora responsabili dell'elaborazione della validità di tutte le transazioni e della proposta dei blocchi.

Nessuna cronologia è andata persa in The Merge. Quando la rete principale si è fusa con la Beacon Chain, ha fuso anche l'intera cronologia transazionale di Ethereum.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Questa transizione alla prova di stake ha cambiato il modo in cui viene emesso l'ether. Scopri di più sull'[emissione di ether prima e dopo The Merge](/roadmap/merge/issuance/).
</AlertDescription>
</AlertContent>
</Alert>

### Utenti e detentori {#users-holders}

**The Merge non ha cambiato nulla per i detentori/utenti.**

_Vale la pena ripeterlo_: come utente o detentore di ETH o di qualsiasi altra risorsa digitale su Ethereum, così come per gli staker che non gestiscono nodi, **non devi fare nulla con i tuoi fondi o il tuo portafoglio per tenere conto di The Merge.** ETH è semplicemente ETH. Non esiste un "vecchio ETH"/"nuovo ETH" o "ETH1"/"ETH2" e i portafogli funzionano esattamente allo stesso modo dopo The Merge come prima: le persone che ti dicono il contrario sono probabilmente truffatori.

Nonostante la sostituzione della prova di lavoro, l'intera cronologia di Ethereum dalla genesi è rimasta intatta e inalterata dalla transizione alla prova di stake. Tutti i fondi detenuti nel tuo portafoglio prima di The Merge sono ancora accessibili dopo The Merge. **Non è richiesta alcuna azione di aggiornamento da parte tua.**

[Maggiori informazioni sulla sicurezza di Ethereum](/security/#eth2-token-scam)

### Operatori di nodi e sviluppatori di dApp {#node-operators-dapp-developers}

<ExpandableCard
title="Operatori e fornitori di nodi di staking"
contentPreview="Se sei uno staker che gestisce la propria configurazione del nodo o un fornitore di infrastrutture di nodi, ci sono alcune cose di cui devi essere a conoscenza dopo The Merge."
id="staking-node-operators">

Le azioni chiave includono:

1. Eseguire _entrambi_ un client di consenso e un client di esecuzione; gli endpoint di terze parti per ottenere i dati di esecuzione non funzionano più da The Merge.
2. Autenticare sia il client di esecuzione che il client di consenso con un segreto JWT condiviso in modo che possano comunicare in modo sicuro.
3. Impostare un indirizzo `fee recipient` per ricevere le mance delle commissioni della transazione guadagnate/MEV.

Il mancato completamento dei primi due punti sopra indicati farà sì che il tuo nodo venga visto come "offline" finché entrambi i livelli non saranno sincronizzati e autenticati.

Non impostare un `fee recipient` consentirà comunque al tuo validatore di comportarsi come al solito, ma perderai le mance delle commissioni non bruciate e qualsiasi MEV che avresti altrimenti guadagnato nei blocchi proposti dal tuo validatore.
</ExpandableCard>

<ExpandableCard
title="Operatori di nodi non validatori e fornitori di infrastrutture"
contentPreview="Se gestisci un nodo Ethereum non validatore, il cambiamento più significativo introdotto con The Merge è stato il requisito di eseguire client per ENTRAMBI il livello di esecuzione E il livello di consenso."
id="node-operators">

Fino a The Merge, un client di esecuzione (come Geth, Erigon, Besu o Nethermind) era sufficiente per ricevere, validare correttamente e propagare i blocchi diffusi dalla rete. _Dopo The Merge_, la validità delle transazioni contenute all'interno di un payload di esecuzione dipende ora anche dalla validità del "blocco di consenso" in cui è contenuto.

Di conseguenza, un nodo Ethereum completo ora richiede sia un client di esecuzione che un client di consenso. Questi due client lavorano insieme utilizzando una nuova API Engine. L'API Engine richiede l'autenticazione tramite un segreto JWT, che viene fornito a entrambi i client consentendo una comunicazione sicura.

Le azioni chiave includono:

- Installare un client di consenso in aggiunta a un client di esecuzione
- Autenticare i client di esecuzione e di consenso con un segreto JWT condiviso in modo che possano comunicare in modo sicuro tra loro.

Il mancato completamento dei punti precedenti farà sì che il tuo nodo appaia "offline" finché entrambi i livelli non saranno sincronizzati e autenticati.
</ExpandableCard>

<ExpandableCard
title="Sviluppatori di dApp e contratti intelligenti"
contentPreview="The Merge è stato progettato per avere un impatto minimo sugli sviluppatori di contratti intelligenti e dApp."
id="developers">

The Merge ha comportato modifiche al consenso, che includono anche modifiche relative a:

<ul>
  <li>struttura del blocco</li>
  <li>tempistiche di slot/blocco</li>
  <li>modifiche agli opcode</li>
  <li>fonti di casualità on-chain</li>
  <li>concetto di <em>safe head</em> e <em>blocchi finalizzati</em></li>
</ul>

Per maggiori informazioni, dai un'occhiata a questo post sul blog di Tim Beiko su <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer">Come The Merge impatta il livello applicativo di Ethereum</a>.
</ExpandableCard>

## The Merge e il consumo energetico {#merge-and-energy}

The Merge ha segnato la fine della prova di lavoro per Ethereum e ha dato inizio all'era di un Ethereum più sostenibile ed ecologico. Il consumo energetico di Ethereum è diminuito di circa il 99,95%, rendendo Ethereum una blockchain verde. Scopri di più sul [consumo energetico di Ethereum](/energy-consumption/).

## The Merge e la scalabilità {#merge-and-scaling}

The Merge ha anche posto le basi per ulteriori aggiornamenti di scalabilità non possibili con la prova di lavoro, portando Ethereum un passo più vicino al raggiungimento della piena scalabilità, sicurezza e sostenibilità verso cui [il suo piano d'azione](/roadmap/) sta puntando.

## Idee sbagliate su The Merge {#misconceptions}

<ExpandableCard
title="Idea sbagliata: &quot;Eseguire un nodo richiede lo staking di 32 ETH.&quot;"
contentPreview="Falso. Chiunque è libero di sincronizzare la propria copia auto-verificata di Ethereum (ovvero, eseguire un nodo). Non è richiesto alcun ETH: né prima di The Merge, né dopo The Merge, mai.">

Esistono due tipi di nodi Ethereum: i nodi che possono proporre blocchi e i nodi che non possono farlo.

I nodi che propongono blocchi sono solo un piccolo numero dei nodi totali su Ethereum. Questa categoria include i nodi di mining con la prova di lavoro (PoW) e i nodi validatori con la prova di stake (PoS). Questa categoria richiede l'impegno di risorse economiche (come la potenza di hash della GPU nella prova di lavoro o gli ETH in staking nella prova di stake) in cambio della capacità di proporre occasionalmente il blocco successivo e guadagnare le ricompense del protocollo.

Agli altri nodi della rete (ovvero la maggioranza) non è richiesto di impegnare alcuna risorsa economica oltre a un computer di livello consumer con 1-2 TB di spazio di archiviazione disponibile e una connessione Internet. Questi nodi non propongono blocchi, ma svolgono comunque un ruolo fondamentale nella protezione della rete, ritenendo responsabili tutti i proponenti del blocco ascoltando i nuovi blocchi e verificandone la validità all'arrivo secondo le regole di consenso della rete. Se il blocco è valido, il nodo continua a propagarlo attraverso la rete. Se il blocco non è valido per qualsiasi motivo, il software del nodo lo ignorerà come non valido e ne interromperà la propagazione.

L'esecuzione di un nodo che non produce blocchi è possibile per chiunque con entrambi i meccanismi di consenso (prova di lavoro o prova di stake); è <em>fortemente incoraggiata</em> per tutti gli utenti se ne hanno i mezzi. L'esecuzione di un nodo è immensamente preziosa per Ethereum e offre ulteriori vantaggi a chiunque ne esegua uno, come una maggiore sicurezza, privacy e resistenza alla censura.

La capacità di chiunque di eseguire il proprio nodo è <em>assolutamente essenziale</em> per mantenere la decentralizzazione della rete Ethereum.

[Maggiori informazioni sull'esecuzione del proprio nodo](/run-a-node/)
</ExpandableCard>

<ExpandableCard
title="Idea sbagliata: &quot;The Merge non è riuscito a ridurre le commissioni del gas.&quot;"
contentPreview="Falso. The Merge è stato un cambiamento del meccanismo di consenso, non un'espansione della capacità della rete, e non è mai stato inteso per abbassare le commissioni del gas.">

Le commissioni del gas sono un prodotto della domanda della rete rispetto alla capacità della rete stessa. The Merge ha deprecato l'uso della prova di lavoro, passando alla prova di stake per il consenso, ma non ha modificato in modo significativo alcun parametro che influenzi direttamente la capacità o il throughput della rete.

Con un <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">piano d'azione incentrato sui rollup</a>, gli sforzi si stanno concentrando sulla scalabilità dell'attività degli utenti al [livello 2](/layer-2/), abilitando al contempo la rete principale di livello 1 come un livello di regolamento decentralizzato sicuro ottimizzato per l'archiviazione dei dati dei rollup per contribuire a rendere le transazioni dei rollup esponenzialmente più economiche. La transizione alla prova di stake è un precursore fondamentale per realizzare tutto ciò. [Maggiori informazioni su gas e commissioni.](/developers/docs/gas/)
</ExpandableCard>

<ExpandableCard
title="Idea sbagliata: &quot;Le transazioni sono state accelerate in modo sostanziale da The Merge.&quot;"
contentPreview="Falso. Sebbene esistano alcune lievi modifiche, la velocità delle transazioni è per lo più la stessa sul livello 1 ora come lo era prima di The Merge.">
La "velocità" di una transazione può essere misurata in diversi modi, tra cui il tempo necessario per essere inclusa in un blocco e il tempo per la finalizzazione. Entrambi cambiano leggermente, ma non in un modo che gli utenti noteranno.

Storicamente, con la prova di lavoro, l'obiettivo era avere un nuovo blocco ogni circa 13,3 secondi. Con la prova di stake, gli slot si verificano esattamente ogni 12 secondi, ognuno dei quali è un'opportunità per un validatore di pubblicare un blocco. La maggior parte degli slot ha blocchi, ma non necessariamente tutti (ad esempio, un validatore è offline). Nella prova di stake, i blocchi vengono prodotti circa il 10% più frequentemente rispetto alla prova di lavoro. Si è trattato di un cambiamento abbastanza insignificante ed è improbabile che venga notato dagli utenti.

La prova di stake ha introdotto il concetto di finalità della transazione che in precedenza non esisteva. Nella prova di lavoro, la capacità di invertire un blocco diventa esponenzialmente più difficile con ogni blocco minato sopra una transazione, ma non raggiunge mai lo zero. Con la prova di stake, i blocchi sono raggruppati in epoche (intervalli di tempo di 6,4 minuti contenenti 32 possibilità per i blocchi) su cui i validatori votano. Quando un'epoca finisce, i validatori votano se considerare l'epoca "giustificata". Se i validatori concordano nel giustificare l'epoca, questa viene finalizzata nell'epoca successiva. Annullare le transazioni finalizzate è economicamente impraticabile in quanto richiederebbe l'ottenimento e il rogo di oltre un terzo degli ETH totali in staking.
</ExpandableCard>

<ExpandableCard
title="Idea sbagliata: &quot;The Merge ha abilitato i prelievi di staking.&quot;"
contentPreview="Falso, ma i prelievi di staking sono stati successivamente abilitati tramite l'aggiornamento Shanghai/Capella.">

Inizialmente dopo The Merge, gli staker potevano accedere solo alle mance delle commissioni e al MEV guadagnati come risultato delle proposte di blocco. Queste ricompense vengono accreditate su un account non di staking controllato dal validatore (noto come <em>fee recipient</em>) e sono disponibili immediatamente. Queste ricompense sono separate dalle ricompense del protocollo per l'esecuzione dei doveri del validatore.

Dall'aggiornamento della rete Shanghai/Capella, gli staker possono ora designare un <em>indirizzo di prelievo</em> per iniziare a ricevere pagamenti automatici di qualsiasi saldo di staking in eccesso (ETH oltre i 32 derivanti dalle ricompense del protocollo). Questo aggiornamento ha anche abilitato la capacità per un validatore di sbloccare e reclamare il suo intero saldo all'uscita dalla rete.

[Maggiori informazioni sui prelievi di staking](/staking/withdrawals/)
</ExpandableCard>

<ExpandableCard
title="Idea sbagliata: &quot;Ora che The Merge è completo e i prelievi sono abilitati, gli staker potrebbero uscire tutti in una volta.&quot;"
contentPreview="Falso. Le uscite dei validatori sono limitate in base alla frequenza per motivi di sicurezza.">
Poiché l'aggiornamento Shanghai/Capella ha abilitato i prelievi, i validatori sono incentivati a prelevare il loro saldo di staking superiore a 32 ETH, poiché questi fondi non si aggiungono al rendimento e sono altrimenti bloccati. A seconda dell'APR (determinato dal totale degli ETH in staking), potrebbero essere incentivati a uscire dai loro validatori per reclamare l'intero saldo o potenzialmente mettere in staking ancora di più utilizzando le loro ricompense per guadagnare più rendimento.

Un avvertimento importante qui: le uscite complete dei validatori sono limitate in base alla frequenza dal protocollo e solo un certo numero di validatori può uscire per epoca (ogni 6,4 minuti). Questo limite fluttua a seconda del numero di validatori attivi, ma risulta che circa lo 0,33% degli ETH totali in staking può uscire dalla rete in un solo giorno.

Questo previene un esodo di massa dei fondi in staking. Inoltre, impedisce a un potenziale aggressore con accesso a un'ampia porzione degli ETH totali in staking di commettere un'infrazione punibile e di uscire/prelevare tutti i saldi dei validatori colpevoli nella stessa epoca prima che il protocollo possa applicare la penalità di punizione.

L'APR è anche intenzionalmente dinamico, consentendo a un mercato di staker di bilanciare quanto sono disposti a essere pagati per aiutare a proteggere la rete. Se il tasso è troppo basso, i validatori usciranno a un ritmo limitato dal protocollo. Gradualmente questo aumenterà l'APR per tutti coloro che rimangono, attirando ancora una volta staker nuovi o di ritorno.
</ExpandableCard>

## Che fine ha fatto 'Eth2'? {#eth2}

Il termine 'Eth2' è stato deprecato. Dopo aver fuso 'Eth1' ed 'Eth2' in un'unica catena, non c'è più alcuna necessità di distinguere tra due reti Ethereum; c'è solo Ethereum.

Per limitare la confusione, la community ha aggiornato questi termini:

- 'Eth1' è ora il 'livello di esecuzione', che gestisce le transazioni e l'esecuzione.
- 'Eth2' è ora il 'livello di consenso', che gestisce il consenso della prova di stake.

Questi aggiornamenti terminologici cambiano solo le convenzioni di denominazione; questo non altera gli obiettivi o il piano d'azione di Ethereum.

[Scopri di più sulla ridenominazione di 'Eth2'](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming)

## Relazione tra gli aggiornamenti {#relationship-between-upgrades}

Gli aggiornamenti di Ethereum sono tutti in qualche modo correlati tra loro. Quindi ricapitoliamo come The Merge si relaziona agli altri aggiornamenti.

### The Merge e la Beacon Chain {#merge-and-beacon-chain}

The Merge rappresenta l'adozione formale della Beacon Chain come nuovo livello di consenso per il livello di esecuzione originale della rete principale. Da The Merge, i validatori sono assegnati per proteggere la rete principale di Ethereum e il mining sulla [prova di lavoro](/developers/docs/consensus-mechanisms/pow/) non è più un mezzo valido per la produzione di blocchi.

I blocchi vengono invece proposti da nodi validatori che hanno messo in staking ETH in cambio del diritto di partecipare al consenso. Questi aggiornamenti pongono le basi per futuri aggiornamenti di scalabilità, inclusa la frammentazione.

<ButtonLink href="/roadmap/beacon-chain/">
  La Beacon Chain
</ButtonLink>

### The Merge e l'aggiornamento Shanghai {#merge-and-shanghai}

Al fine di semplificare e massimizzare l'attenzione su una transizione di successo alla prova di stake, l'aggiornamento The Merge non ha incluso alcune funzionalità previste come la capacità di prelevare gli ETH in staking. Questa funzionalità è stata abilitata separatamente con l'aggiornamento Shanghai/Capella.

Per i più curiosi, scopri di più su [Cosa succede dopo The Merge](https://youtu.be/7ggwLccuN5s?t=101), presentato da Vitalik all'evento ETHGlobal di aprile 2021.

### The Merge e la frammentazione {#merge-and-data-sharding}

Inizialmente, il piano era di lavorare sulla frammentazione prima di The Merge per affrontare la scalabilità. Tuttavia, con il boom delle [soluzioni di scalabilità di livello 2](/layer-2/), la priorità si è spostata prima sul passaggio dalla prova di lavoro alla prova di stake.

I piani per la frammentazione si stanno evolvendo rapidamente, ma dato l'aumento e il successo delle tecnologie di livello 2 per scalare l'esecuzione delle transazioni, i piani di frammentazione si sono spostati sulla ricerca del modo più ottimale per distribuire l'onere dell'archiviazione dei calldata compressi dai contratti di rollup, consentendo una crescita esponenziale della capacità della rete. Ciò non sarebbe possibile senza prima passare alla prova di stake.

<ButtonLink href="/roadmap/danksharding/">
  Frammentazione
</ButtonLink>

## Letture consigliate {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />