---
title: Domande frequenti
description: Domande frequenti sulla prova di stake di Ethereum.
lang: it
---

## Cos'è la prova di stake {#what-is-proof-of-stake}

La prova di stake è una classe di algoritmo che può fornire sicurezza alle blockchain assicurando che gli asset di valore vengano persi dagli aggressori che agiscono in modo disonesto. I sistemi di prova di stake richiedono a un insieme di validatori di rendere disponibile un certo asset che può essere distrutto se il validatore si impegna in un comportamento dimostrabilmente disonesto. Ethereum utilizza un meccanismo di consenso basato sulla prova di stake per proteggere la blockchain.

## Come si confronta la prova di stake con la prova di lavoro? {#comparison-to-proof-of-work}

Sia la prova di lavoro che la prova di stake sono meccanismi che disincentivano economicamente gli attori malintenzionati dallo spammare o frodare la rete. In entrambi i casi, i nodi che partecipano attivamente al consenso mettono un certo asset "nella rete" che perderanno se si comportano male.

Nella prova di lavoro, questo asset è l'energia. Il nodo, noto come minatore, esegue un algoritmo che mira a calcolare un valore più velocemente di qualsiasi altro nodo. Il nodo più veloce ha il diritto di proporre un blocco alla catena. Per cambiare la cronologia della catena o dominare la proposta del blocco, un minatore dovrebbe avere così tanta potenza di calcolo da vincere sempre la gara. Questo è proibitivamente costoso e difficile da eseguire, proteggendo la catena dagli attacchi. L'energia richiesta per "estrarre" (mine) utilizzando la prova di lavoro è un asset del mondo reale che i minatori pagano.

La prova di stake richiede ai nodi, noti come validatori, di inviare esplicitamente un asset crittografico a un contratto intelligente. Se un validatore si comporta male, questa criptovaluta può essere distrutta perché stanno mettendo in "staking" i loro asset direttamente nella catena invece che indirettamente tramite il dispendio di energia.

La prova di lavoro è molto più affamata di energia perché l'elettricità viene bruciata nel processo di mining. La prova di stake, d'altra parte, richiede solo una piccolissima quantità di energia: i validatori di Ethereum possono persino funzionare su un dispositivo a bassa potenza come un Raspberry Pi. Si ritiene che il meccanismo di prova di stake di Ethereum sia più sicuro della prova di lavoro perché il costo per attaccare è maggiore e le conseguenze per un aggressore sono più gravi.

Il confronto tra prova di lavoro e prova di stake è un argomento controverso. Il [blog di Vitalik Buterin](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-are-the-benefits-of-proof-of-stake-as-opposed-to-proof-of-work) e il dibattito tra Justin Drake e Lyn Alden offrono un buon riassunto delle argomentazioni.

<YouTube id="1m12zgJ42dI" />

## La prova di stake è efficiente dal punto di vista energetico? {#is-pos-energy-efficient}

Sì. I nodi su una rete di prova di stake utilizzano una quantità minuscola di energia. Uno studio di terze parti ha concluso che l'intera rete Ethereum basata sulla prova di stake consuma circa 0,0026 TWh/anno, circa 13.000 volte meno del solo settore dei videogiochi negli Stati Uniti.

[Maggiori informazioni sul consumo energetico di Ethereum](/energy-consumption/).

## La prova di stake è sicura? {#is-pos-secure}

La prova di stake di Ethereum è molto sicura. Il meccanismo è stato ricercato, sviluppato e testato rigorosamente per oltre otto anni prima di essere lanciato. Le garanzie di sicurezza sono diverse dalle blockchain basate sulla prova di lavoro. Nella prova di stake, i validatori malintenzionati possono essere attivamente puniti ed espulsi dall'insieme dei validatori, costando loro una notevole quantità di ETH. Con la prova di lavoro, un aggressore può continuare a ripetere il proprio attacco finché dispone di sufficiente potenza di hash. È anche più costoso organizzare attacchi equivalenti su Ethereum con prova di stake rispetto alla prova di lavoro. Per influenzare la vitalità (liveness) della catena, è richiesto almeno il 33% dell'ether totale messo in stake sulla rete (tranne nei casi di attacchi molto sofisticati con una probabilità di successo estremamente bassa). Per controllare i contenuti dei blocchi futuri, è richiesto almeno il 51% dell'ETH totale messo in stake, e per riscrivere la cronologia, è necessario oltre il 66% dello stake totale. Il protocollo di Ethereum distruggerebbe questi asset negli scenari di attacco del 33% o del 51% e tramite consenso sociale nello scenario di attacco del 66%.

- [Maggiori informazioni sulla difesa della prova di stake di Ethereum dagli aggressori](/developers/docs/consensus-mechanisms/pos/attack-and-defense)
- [Maggiori informazioni sulla progettazione della prova di stake](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)

## La prova di stake rende Ethereum più economico? {#does-pos-make-ethereum-cheaper}

No. Il costo per inviare una transazione (commissione) è determinato da un mercato delle commissioni dinamico che aumenta con la maggiore domanda della rete. Il meccanismo di consenso non influenza direttamente questo aspetto.

[Maggiori informazioni sul gas](/developers/docs/gas).

## Cosa sono i nodi, i client e i validatori? {#what-are-nodes-clients-and-validators}

I nodi sono computer connessi alla rete Ethereum. I client sono i software che eseguono e che trasformano il computer in un nodo. Esistono due tipi di client: client di esecuzione e client di consenso. Entrambi sono necessari per creare un nodo. Un validatore è un componente aggiuntivo opzionale per un client di consenso che consente al nodo di partecipare al consenso della prova di stake. Ciò significa creare e proporre blocchi quando selezionato e attestare i blocchi di cui viene a conoscenza sulla rete. Per eseguire un validatore, l'operatore del nodo deve depositare 32 ETH nel contratto di deposito.

- [Maggiori informazioni su nodi e client](/developers/docs/nodes-and-clients)
- [Maggiori informazioni sullo staking](/staking)

## La prova di stake è un'idea nuova? {#is-pos-new}

No. Un utente su BitcoinTalk [ha proposto l'idea di base della prova di stake](https://bitcointalk.org/index.php?topic=27787.0) come aggiornamento per Bitcoin nel 2011. Sono passati undici anni prima che fosse pronta per essere implementata sulla rete principale di Ethereum. Alcune altre catene hanno implementato la prova di stake prima di Ethereum, ma non il meccanismo specifico di Ethereum (noto come Gasper).

## Cosa c'è di speciale nella prova di stake di Ethereum? {#why-is-ethereum-pos-special}

Il meccanismo di prova di stake di Ethereum è unico nel suo design. Non è stato il primo meccanismo di prova di stake a essere progettato e implementato, ma è il più robusto. Il meccanismo di prova di stake è noto come "Casper". Casper definisce come i validatori vengono selezionati per proporre blocchi, come e quando vengono fatte le attestazioni, come vengono contate le attestazioni, le ricompense e le penalità date ai validatori, le condizioni per punire (slashing), i meccanismi di sicurezza come la perdita per inattività (inactivity leak) e le condizioni per la "finalità". La finalità è la condizione per cui, affinché un blocco sia considerato una parte permanente della catena canonica, deve essere stato votato da almeno il 66% dell'ETH totale messo in stake sulla rete. I ricercatori hanno sviluppato Casper specificamente per Ethereum, ed Ethereum è la prima e unica blockchain ad averlo implementato.

Oltre a Casper, la prova di stake di Ethereum utilizza un algoritmo di scelta della biforcazione chiamato LMD-GHOST. Questo è necessario nel caso in cui si verifichi una condizione in cui esistono due blocchi per lo stesso slot. Ciò crea due biforcazioni della blockchain. LMD-GHOST sceglie quella che ha il "peso" maggiore di attestazioni. Il peso è il numero di attestazioni ponderato in base al saldo effettivo dei validatori. LMD-GHOST è unico per Ethereum.

La combinazione di Casper e LMD_GHOST è nota come Gasper.

[Maggiori informazioni su Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)

## Cosa significa punire (slashing)? {#what-is-slashing}

Punire (slashing) è il termine dato alla distruzione di una parte dello stake di un validatore e all'espulsione del validatore dalla rete. La quantità di ETH persa in una punizione scala con il numero di validatori che vengono puniti: ciò significa che i validatori che colludono vengono puniti più severamente rispetto ai singoli.

[Maggiori informazioni sulle punizioni](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties#slashing)

## Perché i validatori hanno bisogno di 32 ETH? {#why-32-eth}

I validatori devono mettere in stake ETH in modo da avere qualcosa da perdere se si comportano male. Il motivo per cui devono mettere in stake specificamente 32 ETH è per consentire ai nodi di funzionare su hardware modesto. Se l'ETH minimo per validatore fosse inferiore, il numero di validatori e quindi il numero di messaggi che devono essere elaborati in ogni slot aumenterebbe, il che significa che sarebbe necessario un hardware più potente per eseguire un nodo.

## Come vengono selezionati i validatori? {#how-are-validators-selected}

Un singolo validatore viene scelto in modo pseudo-casuale per proporre un blocco in ogni slot utilizzando un algoritmo chiamato RANDAO che mescola un hash dal proponente del blocco con un seme (seed) che viene aggiornato a ogni blocco. Questo valore viene utilizzato per selezionare un validatore specifico dall'insieme totale dei validatori. La selezione del validatore è fissata con due epoche di anticipo.

[Maggiori informazioni sulla selezione dei validatori](/developers/docs/consensus-mechanisms/pos/block-proposal)

## Cos'è lo stake grinding? {#what-is-stake-grinding}

Lo stake grinding è una categoria di attacco alle reti di prova di stake in cui l'aggressore cerca di influenzare l'algoritmo di selezione dei validatori a favore dei propri validatori. Gli attacchi di stake grinding su RANDAO richiedono circa la metà dell'ETH totale messo in stake.

[Maggiori informazioni sullo stake grinding](https://eth2book.info/altair/part2/building_blocks/randomness/#randao-biasability)

## Cos'è la punizione sociale (social slashing)? {#what-is-social-slashing}

La punizione sociale (social slashing) è la capacità della comunità di coordinare una biforcazione della blockchain in risposta a un attacco. Consente alla comunità di riprendersi da un aggressore che finalizza una catena disonesta. La punizione sociale può essere utilizzata anche contro gli attacchi di censura.

- [Maggiori informazioni sulla punizione sociale](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7)
- [Vitalik Buterin sulla punizione sociale](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)

## Verrò punito (slashed)? {#will-i-get-slashed}

Come validatore, è molto difficile essere puniti a meno che non ci si impegni deliberatamente in comportamenti malintenzionati. La punizione viene implementata solo in scenari molto specifici in cui i validatori propongono più blocchi per lo stesso slot o si contraddicono con le loro attestazioni: è molto improbabile che questi si verifichino accidentalmente.

[Maggiori informazioni sulle condizioni di punizione](https://eth2book.info/altair/part2/incentives/slashing)

## Cos'è il problema del "nulla in gioco" (nothing-at-stake)? {#what-is-nothing-at-stake-problem}

Il problema del "nulla in gioco" è una questione concettuale con alcuni meccanismi di prova di stake in cui ci sono solo ricompense e nessuna penalità. Se non c'è nulla in gioco (stake), un validatore pragmatico è ugualmente felice di attestare qualsiasi, o anche più, biforcazioni della blockchain, poiché ciò aumenta le sue ricompense. Ethereum aggira questo problema utilizzando condizioni di finalità e punizioni per garantire una singola catena canonica.

[Maggiori informazioni sul problema del nulla in gioco](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)

## Cos'è un algoritmo di scelta della biforcazione? {#what-is-a-fork-choice-algorithm}

Un algoritmo di scelta della biforcazione implementa regole che determinano quale catena sia quella canonica. In condizioni ottimali, non c'è bisogno di una regola di scelta della biforcazione perché c'è solo un proponente del blocco per slot e un blocco tra cui scegliere. Occasionalmente, tuttavia, più blocchi per lo stesso slot o informazioni in arrivo in ritardo portano a più opzioni su come sono organizzati i blocchi vicino alla testa della catena. In questi casi, tutti i client devono implementare alcune regole in modo identico per assicurarsi che scelgano tutti la sequenza corretta di blocchi. L'algoritmo di scelta della biforcazione codifica queste regole.

L'algoritmo di scelta della biforcazione di Ethereum si chiama LMD-GHOST. Sceglie la biforcazione con il maggior peso di attestazioni, ovvero quella per cui ha votato la maggior parte dell'ETH messo in stake.

[Maggiori informazioni su LMD-GHOST](/developers/docs/consensus-mechanisms/pos/gasper/#fork-choice)

## Cos'è la finalità nella prova di stake? {#what-is-finality}

La finalità nella prova di stake è la garanzia che un dato blocco sia una parte permanente della catena canonica e non possa essere annullato a meno che non vi sia un fallimento del consenso in cui un aggressore brucia il 33% dell'ether totale messo in stake. Questa è la finalità "cripto-economica", in contrapposizione alla "finalità probabilistica" che è rilevante per le blockchain basate sulla prova di lavoro. Nella finalità probabilistica, non ci sono stati espliciti finalizzati/non finalizzati per i blocchi: diventa semplicemente sempre meno probabile che un blocco possa essere rimosso dalla catena man mano che invecchia, e gli utenti determinano da soli quando sono sufficientemente sicuri che un blocco sia "sicuro". Con la finalità cripto-economica, le coppie di blocchi di checkpoint devono essere votate dal 66% dell'ether messo in stake. Se questa condizione è soddisfatta, i blocchi tra quei checkpoint sono esplicitamente "finalizzati".

[Maggiori informazioni sulla finalità](/developers/docs/consensus-mechanisms/pos/#finality)

## Cos'è la "soggettività debole"? {#what-is-weak-subjectivity}

La soggettività debole è una caratteristica delle reti di prova di stake in cui le informazioni sociali vengono utilizzate per confermare lo stato attuale della blockchain. Ai nuovi nodi o ai nodi che si ricongiungono alla rete dopo essere stati offline per molto tempo può essere fornito uno stato recente in modo che il nodo possa vedere immediatamente se si trova sulla catena corretta. Questi stati sono noti come "checkpoint di soggettività debole" e possono essere ottenuti da altri operatori di nodi fuori banda (out-of-band), o da esploratori di blocchi, o da diversi endpoint pubblici.

[Maggiori informazioni sulla soggettività debole](/developers/docs/consensus-mechanisms/pos/weak-subjectivity)

## La prova di stake è resistente alla censura? {#is-pos-censorship-resistant}

La resistenza alla censura è attualmente difficile da dimostrare. Tuttavia, a differenza della prova di lavoro, la prova di stake offre l'opzione di coordinare le punizioni per sanzionare i validatori che censurano. Ci sono imminenti modifiche al protocollo che separano i costruttori di blocchi dai proponenti dei blocchi e implementano elenchi di transazioni che i costruttori devono includere in ogni blocco. Questa proposta è nota come separazione tra proponente e costruttore (proposer-builder separation) e aiuta a impedire ai validatori di censurare le transazioni.

[Maggiori informazioni sulla separazione tra proponente e costruttore](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Original-basic-scheme)

## Il sistema di prova di stake di Ethereum può subire un attacco del 51%? {#pos-51-attack}

Sì. La prova di stake è vulnerabile agli attacchi del 51%, proprio come la prova di lavoro. Invece di richiedere il 51% della potenza di hash della rete, l'aggressore richiede il 51% dell'ETH totale messo in stake. Un aggressore che accumula il 51% dello stake totale ottiene il controllo dell'algoritmo di scelta della biforcazione. Ciò consente all'aggressore di censurare determinate transazioni, eseguire riorganizzazioni a corto raggio ed estrarre il valore massimo estraibile (MEV) riordinando i blocchi a proprio favore.

[Maggiori informazioni sugli attacchi alla prova di stake](/developers/docs/consensus-mechanisms/pos/attack-and-defense)

## Cos'è il coordinamento sociale e perché è necessario? {#what-is-social-coordination}

Il coordinamento sociale è un'ultima linea di difesa per Ethereum che consentirebbe di recuperare una catena onesta da un attacco che ha finalizzato blocchi disonesti. In questo caso, la comunità di Ethereum dovrebbe coordinarsi "fuori banda" e concordare di utilizzare una biforcazione di minoranza onesta, punendo i validatori dell'aggressore nel processo. Ciò richiederebbe che anche le app e gli exchange riconoscano la biforcazione onesta.

[Leggi di più sul coordinamento sociale](/developers/docs/consensus-mechanisms/pos/attack-and-defense#people-the-last-line-of-defense)

## I ricchi diventano più ricchi nella prova di stake? {#do-rich-get-richer}

Più ETH qualcuno ha da mettere in stake, più validatori può eseguire e più ricompense può accumulare. Le ricompense scalano linearmente con la quantità di ETH messa in stake e tutti ottengono la stessa percentuale di rendimento. La prova di lavoro arricchisce i ricchi più della prova di stake perché i minatori più ricchi che acquistano hardware su larga scala beneficiano di economie di scala, il che significa che la relazione tra ricchezza e ricompensa non è lineare.

## La prova di stake è più centralizzata della prova di lavoro? {#is-pos-decentralized}

No, la prova di lavoro tende alla centralizzazione perché i costi di mining aumentano ed escludono i singoli individui, poi escludono le piccole aziende e così via. Il problema attuale con la prova di stake è l'influenza dei derivati di staking liquido (LSD). Si tratta di token che rappresentano ETH messi in stake da un fornitore che chiunque può scambiare sui mercati secondari senza che l'ETH effettivo venga rimosso dallo stake. Gli LSD consentono agli utenti di fare staking con meno di 32 ETH, ma creano anche un rischio di centralizzazione in cui poche grandi organizzazioni possono finire per controllare gran parte dello stake. Questo è il motivo per cui lo [staking in solitaria](/staking/solo) è l'opzione migliore per Ethereum.

[Maggiori informazioni sulla centralizzazione dello stake negli LSD](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Perché posso mettere in stake solo ETH? {#why-can-i-only-stake-eth}

L'ETH è la valuta nativa di Ethereum. È essenziale avere un'unica valuta in cui sono denominati tutti gli stake, sia per la contabilizzazione dei saldi effettivi per la ponderazione dei voti sia per la sicurezza. L'ETH stesso è un componente fondamentale di Ethereum piuttosto che un contratto intelligente. L'incorporazione di altre valute aumenterebbe significativamente la complessità e diminuirebbe la sicurezza dello staking.

## Ethereum è l'unica blockchain con prova di stake? {#is-ethereum-the-only-pos-blockchain}

No, ci sono diverse blockchain con prova di stake. Nessuna è identica a Ethereum; il meccanismo di prova di stake di Ethereum è unico.

## Cos'è Il Merge? {#what-is-the-merge}

Il Merge è stato il momento in cui Ethereum ha disattivato il suo meccanismo di consenso basato sulla prova di lavoro e ha attivato il suo meccanismo di consenso basato sulla prova di stake. Il Merge è avvenuto il 15 settembre 2022.

[Maggiori informazioni su Il Merge](/roadmap/merge)

## Cosa sono la vitalità (liveness) e la sicurezza (safety)? {#what-are-liveness-and-safety}

La vitalità (liveness) e la sicurezza (safety) sono le due preoccupazioni fondamentali per la sicurezza di una blockchain. La vitalità è la disponibilità di una catena che finalizza. Se la catena smette di finalizzare o gli utenti non sono in grado di accedervi facilmente, si tratta di fallimenti della vitalità. Anche un costo di accesso estremamente elevato potrebbe essere considerato un fallimento della vitalità. La sicurezza si riferisce a quanto sia difficile attaccare la catena, ad esempio finalizzare checkpoint in conflitto.

[Leggi di più nel documento su Casper](https://arxiv.org/pdf/1710.09437.pdf)