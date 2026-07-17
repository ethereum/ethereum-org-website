---
title: Domande frequenti
description: Domande frequenti sulla Proof-of-Stake (PoS) di Ethereum.
lang: it
---

## Cos'è la Proof-of-Stake (PoS) {#what-is-proof-of-stake}

La Proof-of-Stake (PoS) è una classe di algoritmi che può fornire sicurezza alle blockchain assicurando che gli asset di valore vengano persi dagli aggressori che agiscono in modo disonesto. I sistemi Proof-of-Stake richiedono a un insieme di validatori di rendere disponibile un certo asset che può essere distrutto se il validatore si impegna in un comportamento dimostrabilmente disonesto. Ethereum utilizza un meccanismo di Proof-of-Stake per proteggere la blockchain.

## Come si confronta la Proof-of-Stake con la Prova di lavoro (PoW)? {#comparison-to-proof-of-work}

Sia la Prova di lavoro (PoW) che la Proof-of-Stake sono meccanismi che disincentivano economicamente gli attori malintenzionati dallo spammare o frodare la rete. In entrambi i casi, i nodi che partecipano attivamente al consenso mettono un certo asset "nella rete" che perderanno se si comportano male.

Nella Prova di lavoro, questo asset è l'energia. Il nodo, noto come minatore, esegue un algoritmo che mira a calcolare un valore più velocemente di qualsiasi altro nodo. Il nodo più veloce ha il diritto di proporre un blocco alla catena. Per cambiare la cronologia della catena o dominare la proposta del blocco, un minatore dovrebbe avere così tanta potenza di calcolo da vincere sempre la gara. Questo è proibitivamente costoso e difficile da eseguire, proteggendo la catena dagli attacchi. L'energia richiesta per il "minaggio" utilizzando la Prova di lavoro è un asset del mondo reale che i minatori pagano.

La Proof-of-Stake richiede ai nodi, noti come validatori, di inviare esplicitamente un asset cripto a uno smart contract. Se un validatore si comporta male, questa cripto può essere distrutta perché stanno mettendo in "staking" i loro asset direttamente nella catena invece che indirettamente tramite il dispendio di energia.

La Prova di lavoro è molto più affamata di energia perché l'elettricità viene bruciata nel processo di minaggio. La Proof-of-Stake, d'altra parte, richiede solo una piccolissima quantità di energia: i validatori di Ethereum possono persino funzionare su un dispositivo a bassa potenza come un Raspberry Pi. Si ritiene che il meccanismo di Proof-of-Stake di Ethereum sia più sicuro della Prova di lavoro perché il costo per attaccare è maggiore e le conseguenze per un aggressore sono più gravi.

Il confronto tra Prova di lavoro e Proof-of-Stake è un argomento controverso. Il [blog di Vitalik Buterin](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-are-the-benefits-of-proof-of-stake-as-opposed-to-proof-of-work) e il dibattito tra Justin Drake e Lyn Alden forniscono un buon riassunto delle argomentazioni.

<VideoWatch slug="pow-vs-pos" />

## La Proof-of-Stake è efficiente dal punto di vista energetico? {#is-pos-energy-efficient}

Sì. I nodi su una rete Proof-of-Stake utilizzano una piccolissima quantità di energia. Uno studio di terze parti ha concluso che l'intera rete Proof-of-Stake di Ethereum consuma circa 0,0026 TWh/anno, circa 13.000 volte meno del solo settore dei videogiochi negli Stati Uniti.

[Maggiori informazioni sul consumo energetico di Ethereum](/energy-consumption/).

## La Proof-of-Stake è sicura? {#is-pos-secure}

La Proof-of-Stake di Ethereum è molto sicura. Il meccanismo è stato ricercato, sviluppato e testato rigorosamente per oltre otto anni prima di essere lanciato. Le garanzie di sicurezza sono diverse dalle blockchain basate sulla Prova di lavoro. Nella Proof-of-Stake, i validatori malintenzionati possono essere attivamente puniti (subendo lo "slashing") ed espulsi dall'insieme dei validatori, costando loro una notevole quantità di ETH. Con la Prova di lavoro, un aggressore può continuare a ripetere il proprio attacco finché dispone di sufficiente potenza di hash. È anche più costoso sferrare attacchi equivalenti sulla Proof-of-Stake di Ethereum rispetto alla Prova di lavoro. Per compromettere la vitalità della catena, è richiesto almeno il 33% dell'ether totale in staking sulla rete (tranne nei casi di attacchi molto sofisticati con una probabilità di successo estremamente bassa). Per controllare i contenuti dei blocchi futuri, è richiesto almeno il 51% degli ETH totali in staking, e per riscrivere la cronologia, è necessario oltre il 66% dello stake totale. Il protocollo di Ethereum distruggerebbe questi asset negli scenari di attacco del 33% o del 51% e tramite consenso sociale nello scenario di attacco del 66%.

- [Maggiori informazioni sulla difesa della Proof-of-Stake di Ethereum dagli aggressori](/developers/docs/consensus-mechanisms/pos/attack-and-defense)
- [Maggiori informazioni sul design della Proof-of-Stake](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)

## La Proof-of-Stake rende Ethereum più economico? {#does-pos-make-ethereum-cheaper}

No. Il costo per inviare una transazione (commissione del gas) è determinato da un mercato delle commissioni dinamico che aumenta con la maggiore domanda della rete. Il meccanismo di consenso non influenza direttamente questo aspetto.

[Maggiori informazioni sul gas](/developers/docs/gas).

## Cosa sono i nodi, i client e i validatori? {#what-are-nodes-clients-and-validators}

I nodi sono computer connessi alla rete Ethereum. I client sono i software che eseguono e che trasformano il computer in un nodo. Esistono due tipi di client: client di esecuzione e client di consenso. Entrambi sono necessari per creare un nodo. Un validatore è un componente aggiuntivo opzionale per un client di consenso che consente al nodo di partecipare al consenso Proof-of-Stake. Ciò significa creare e proporre blocchi quando selezionato e attestare i blocchi di cui viene a conoscenza sulla rete. Per eseguire un validatore, l'operatore del nodo deve depositare 32 ETH nel contratto di deposito.

- [Maggiori informazioni su nodi e client](/developers/docs/nodes-and-clients)
- [Maggiori informazioni sullo staking](/staking)

## La Proof-of-Stake è un'idea nuova? {#is-pos-new}

No. Un utente su BitcoinTalk [ha proposto l'idea di base della Proof-of-Stake](https://bitcointalk.org/index.php?topic=27787.0) come aggiornamento per Bitcoin nel 2011. Sono passati undici anni prima che fosse pronta per essere implementata sulla Mainnet di Ethereum. Alcune altre catene hanno implementato la Proof-of-Stake prima di Ethereum, ma non il meccanismo specifico di Ethereum (noto come Gasper).

## Cosa c'è di speciale nella Proof-of-Stake di Ethereum? {#why-is-ethereum-pos-special}

Il meccanismo di Proof-of-Stake di Ethereum è unico nel suo design. Non è stato il primo meccanismo di Proof-of-Stake a essere progettato e implementato, ma è il più robusto. Il meccanismo di Proof-of-Stake è noto come "Casper". Casper definisce come vengono selezionati i validatori per proporre blocchi, come e quando vengono fatte le attestazioni, come vengono contate le attestazioni, le ricompense e le penalità date ai validatori, le condizioni di slashing, i meccanismi di sicurezza come la perdita per inattività e le condizioni per la "definitività". La definitività è la condizione per cui, affinché un blocco sia considerato una parte permanente della catena canonica, deve essere stato votato da almeno il 66% degli ETH totali in staking sulla rete. I ricercatori hanno sviluppato Casper specificamente per Ethereum, ed Ethereum è la prima e unica blockchain ad averlo implementato.

Oltre a Casper, la Proof-of-Stake di Ethereum utilizza un algoritmo di scelta del fork chiamato LMD-GHOST. Questo è richiesto nel caso in cui si verifichi una condizione in cui esistono due blocchi per lo stesso slot. Ciò crea due fork della blockchain. LMD-GHOST sceglie quello che ha il maggior "peso" di attestazioni. Il peso è il numero di attestazioni ponderato in base al saldo effettivo dei validatori. LMD-GHOST è unico per Ethereum.

La combinazione di Casper e LMD-GHOST è nota come Gasper.

[Maggiori informazioni su Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)

## Cos'è lo slashing? {#what-is-slashing}

Lo slashing è il termine dato alla distruzione di una parte dello stake di un validatore e all'espulsione del validatore dalla rete. La quantità di ETH persa in uno slashing scala con il numero di validatori che subiscono lo slashing: questo significa che i validatori che colludono vengono puniti più severamente rispetto ai singoli.

[Maggiori informazioni sullo slashing](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties#slashing)

## Perché i validatori hanno bisogno di 32 ETH? {#why-32-eth}

I validatori devono mettere in staking ETH in modo da avere qualcosa da perdere se si comportano male. Il motivo per cui devono mettere in staking specificamente 32 ETH è per consentire ai nodi di funzionare su hardware modesto. Se l'ETH minimo per validatore fosse inferiore, il numero di validatori e quindi il numero di messaggi che devono essere elaborati in ogni slot aumenterebbe, il che significa che sarebbe richiesto un hardware più potente per eseguire un nodo.

## Come vengono selezionati i validatori? {#how-are-validators-selected}

Un singolo validatore viene scelto in modo pseudo-casuale per proporre un blocco in ogni slot utilizzando un algoritmo chiamato RANDAO che mescola un hash dal proponente del blocco con un seme che viene aggiornato a ogni blocco. Questo valore viene utilizzato per selezionare un validatore specifico dall'insieme totale dei validatori. La selezione del validatore è fissata con due epoche di anticipo.

[Maggiori informazioni sulla selezione dei validatori](/developers/docs/consensus-mechanisms/pos/block-proposal)

## Cos'è lo stake grinding? {#what-is-stake-grinding}

Lo stake grinding è una categoria di attacco sulle reti Proof-of-Stake in cui l'aggressore cerca di influenzare l'algoritmo di selezione dei validatori a favore dei propri validatori. Gli attacchi di stake grinding su RANDAO richiedono circa la metà degli ETH totali in staking.

[Maggiori informazioni sullo stake grinding](https://eth2book.info/altair/part2/building_blocks/randomness/#randao-biasability)

## Cos'è lo slashing sociale? {#what-is-social-slashing}

Lo slashing sociale è la capacità della comunità di coordinare un fork della blockchain in risposta a un attacco. Consente alla comunità di riprendersi da un aggressore che ha finalizzato una catena disonesta. Lo slashing sociale può essere utilizzato anche contro gli attacchi di censura.

- [Maggiori informazioni sullo slashing sociale](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7)
- [Vitalik Buterin sullo slashing sociale](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)

## Subirò lo slashing? {#will-i-get-slashed}

Come validatore, è molto difficile subire lo slashing a meno che non ci si impegni deliberatamente in comportamenti malintenzionati. Lo slashing viene implementato solo in scenari molto specifici in cui i validatori propongono più blocchi per lo stesso slot o si contraddicono con le loro attestazioni: è molto improbabile che questi si verifichino accidentalmente.

[Maggiori informazioni sulle condizioni di slashing](https://eth2book.info/altair/part2/incentives/slashing)

## Cos'è il problema del nulla in gioco? {#what-is-nothing-at-stake-problem}

Il problema del nulla in gioco è una questione concettuale con alcuni meccanismi di Proof-of-Stake in cui ci sono solo ricompense e nessuna penalità. Se non c'è nulla in gioco, un validatore pragmatico è ugualmente felice di attestare qualsiasi, o persino multipli, fork della blockchain, poiché questo aumenta le sue ricompense. Ethereum aggira questo problema utilizzando condizioni di definitività e lo slashing per garantire una singola catena canonica.

[Maggiori informazioni sul problema del nulla in gioco](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)

## Cos'è un algoritmo di scelta del fork? {#what-is-a-fork-choice-algorithm}

Un algoritmo di scelta del fork implementa regole che determinano quale catena sia quella canonica. In condizioni ottimali, non c'è bisogno di una regola di scelta del fork perché c'è solo un proponente del blocco per slot e un solo blocco tra cui scegliere. Occasionalmente, tuttavia, più blocchi per lo stesso slot o informazioni in arrivo in ritardo portano a più opzioni su come sono organizzati i blocchi vicino alla testa della catena. In questi casi, tutti i client devono implementare alcune regole in modo identico per assicurarsi che scelgano tutti la sequenza corretta di blocchi. L'algoritmo di scelta del fork codifica queste regole.

L'algoritmo di scelta del fork di Ethereum si chiama LMD-GHOST. Sceglie il fork con il maggior peso di attestazioni, ovvero quello per cui ha votato la maggior parte degli ETH in staking.

[Maggiori informazioni su LMD-GHOST](/developers/docs/consensus-mechanisms/pos/gasper/#fork-choice)

## Cos'è la definitività nella Proof-of-Stake? {#what-is-finality}

La definitività nella Proof-of-Stake è la garanzia che un dato blocco sia una parte permanente della catena canonica e non possa essere annullato a meno che non vi sia un fallimento del consenso in cui un aggressore brucia il 33% dell'ether totale in staking. Questa è la definitività "criptoeconomica", in contrapposizione alla "definitività probabilistica" che è rilevante per le blockchain basate sulla Prova di lavoro. Nella definitività probabilistica, non ci sono stati espliciti finalizzati/non finalizzati per i blocchi: diventa semplicemente sempre meno probabile che un blocco possa essere rimosso dalla catena man mano che invecchia, e gli utenti determinano da soli quando sono sufficientemente sicuri che un blocco sia "sicuro". Con la definitività criptoeconomica, le coppie di blocchi di checkpoint devono essere votate dal 66% dell'ether in staking. Se questa condizione è soddisfatta, i blocchi tra quei checkpoint sono esplicitamente "finalizzati".

[Maggiori informazioni sulla definitività](/developers/docs/consensus-mechanisms/pos/#finality)

## Cos'è la "soggettività debole"? {#what-is-weak-subjectivity}

La soggettività debole è una caratteristica delle reti Proof-of-Stake in cui le informazioni sociali vengono utilizzate per confermare lo stato attuale della blockchain. Ai nuovi nodi o ai nodi che si ricongiungono alla rete dopo essere stati offline per molto tempo può essere fornito uno stato recente in modo che il nodo possa vedere immediatamente se si trova sulla catena corretta. Questi stati sono noti come "checkpoint di soggettività debole" e possono essere ottenuti da altri operatori di nodi fuori banda (out-of-band), o da block explorer, o da diversi endpoint pubblici.

[Maggiori informazioni sulla soggettività debole](/developers/docs/consensus-mechanisms/pos/weak-subjectivity)

## La Proof-of-Stake è resistente alla censura? {#is-pos-censorship-resistant}

La resistenza alla censura è attualmente difficile da dimostrare. Tuttavia, a differenza della Prova di lavoro, la Proof-of-Stake offre l'opzione di coordinare gli slashing per punire i validatori che censurano. Ci sono imminenti modifiche al protocollo che separano i costruttori di blocchi dai proponenti dei blocchi e implementano elenchi di transazioni che i costruttori devono includere in ogni blocco. Questa proposta è nota come separazione proponente-costruttore (PBS) e aiuta a impedire ai validatori di censurare le transazioni.

[Maggiori informazioni sulla separazione proponente-costruttore (PBS)](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Original-basic-scheme)

## Il sistema Proof-of-Stake di Ethereum può subire un attacco del 51%? {#pos-51-attack}

Sì. La Proof-of-Stake è vulnerabile agli attacchi del 51%, proprio come la Prova di lavoro. Invece di richiedere il 51% della potenza di hash della rete, l'aggressore richiede il 51% degli ETH totali in staking. Un aggressore che accumula il 51% dello stake totale arriva a controllare l'algoritmo di scelta del fork. Ciò consente all'aggressore di censurare determinate transazioni, eseguire riorganizzazioni a corto raggio ed estrarre MEV riordinando i blocchi a proprio favore.

[Maggiori informazioni sugli attacchi alla Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/attack-and-defense)

## Cos'è il coordinamento sociale e perché è necessario? {#what-is-social-coordination}

Il coordinamento sociale è un'ultima linea di difesa per Ethereum che consentirebbe di recuperare una catena onesta da un attacco che ha finalizzato blocchi disonesti. In questo caso, la comunità di Ethereum dovrebbe coordinarsi "fuori banda" e concordare di utilizzare un fork di minoranza onesto, applicando lo slashing ai validatori dell'aggressore nel processo. Ciò richiederebbe che anche le app e gli exchange riconoscano il fork onesto.

[Leggi di più sul coordinamento sociale](/developers/docs/consensus-mechanisms/pos/attack-and-defense#people-the-last-line-of-defense)

## I ricchi diventano più ricchi nella Proof-of-Stake? {#do-rich-get-richer}

Più ETH qualcuno ha da mettere in staking, più validatori può eseguire e più ricompense può accumulare. Le ricompense scalano linearmente con la quantità di ETH in staking e tutti ottengono lo stesso rendimento percentuale. La Prova di lavoro arricchisce i ricchi più della Proof-of-Stake perché i minatori più ricchi che acquistano hardware su larga scala beneficiano di economie di scala, il che significa che la relazione tra ricchezza e ricompensa non è lineare.

## La Proof-of-Stake è più centralizzata della Prova di lavoro? {#is-pos-decentralized}

No, la Prova di lavoro tende alla centralizzazione perché i costi di minaggio aumentano ed escludono i singoli individui, poi escludono le piccole aziende e così via. Il problema attuale con la Proof-of-Stake è l'influenza dei derivati di staking liquido (LSD). Si tratta di token che rappresentano ETH messi in staking da un fornitore che chiunque può scambiare (swap) sui mercati secondari senza che gli ETH effettivi vengano ritirati dallo staking. Gli LSD consentono agli utenti di fare staking con meno di 32 ETH, ma creano anche un rischio di centralizzazione in cui poche grandi organizzazioni possono finire per controllare gran parte dello stake. Questo è il motivo per cui il [solo staking](/staking/solo) è l'opzione migliore per Ethereum.

[Maggiori informazioni sulla centralizzazione dello stake negli LSD](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Perché posso mettere in staking solo ETH? {#why-can-i-only-stake-eth}

L'ETH è la valuta nativa di Ethereum. È essenziale avere una singola valuta in cui sono denominati tutti gli stake, sia per la contabilizzazione dei saldi effettivi per la ponderazione dei voti sia per la sicurezza. L'ETH stesso è un componente fondamentale di Ethereum piuttosto che uno smart contract. L'incorporazione di altre valute aumenterebbe significativamente la complessità e diminuirebbe la sicurezza dello staking.

## Ethereum è l'unica blockchain Proof-of-Stake? {#is-ethereum-the-only-pos-blockchain}

No, ci sono diverse blockchain Proof-of-Stake. Nessuna è identica a Ethereum; il meccanismo di Proof-of-Stake di Ethereum è unico.

## Cos'è The Merge? {#what-is-the-merge}

The Merge è stato il momento in cui Ethereum ha disattivato il suo meccanismo di consenso basato sulla Prova di lavoro e ha attivato il suo meccanismo di consenso basato sulla Proof-of-Stake. The Merge è avvenuto il 15 settembre 2022.

[Maggiori informazioni su The Merge](/roadmap/merge)

## Cosa sono la vitalità (liveness) e la sicurezza (safety)? {#what-are-liveness-and-safety}

La vitalità (liveness) e la sicurezza (safety) sono le due preoccupazioni fondamentali per la sicurezza di una blockchain. La vitalità è la disponibilità di una catena che finalizza. Se la catena smette di finalizzare o gli utenti non sono in grado di accedervi facilmente, si tratta di fallimenti della vitalità. Anche un costo di accesso estremamente elevato potrebbe essere considerato un fallimento della vitalità. La sicurezza si riferisce a quanto sia difficile attaccare la catena, ad esempio finalizzare checkpoint in conflitto.

[Leggi di più nel documento su Casper](https://arxiv.org/pdf/1710.09437.pdf)