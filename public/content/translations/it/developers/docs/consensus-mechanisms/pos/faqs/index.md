---
title: Domande frequenti
description: Domande frequenti sull'Ethereum di proof-of-stake.
lang: it
---

## Cos'è il proof-of-stake {#what-is-proof-of-stake}

Il proof-of-stake è una classe di algoritmo che può fornire sicurezza alle blockchain assicurandosi che le risorse di valore siano perse dagli utenti malevoli che agiscono in modo disonesto. I sistemi di proof-of-stake richiedono che una serie di validatori rendano disponibili delle risorse che possono essere distrutte se il validatore adotta certi comportamenti comprovatamente disonesti. Ethereum utilizza il meccanismo di proof-of-stake per proteggere la blockchain.

## Come si distingue il proof-of-stake dal proof-of-work? {#comparison-to-proof-of-work}

Sia il proof-of-work che il proof-of-stake sono meccanismi che disincentivano economicamente gli utenti malevoli dallo spam o da truffe alla rete. In entrambi i casi, i nodi che partecipano attivamente al consenso mettono "nella rete" alcune risorse che perderanno se si comportano scorrettamente.

Nel proof-of-work, tale risorsa è l'energia. Il nodo, noto come miner, esegue un algoritmo che mira a calcolare un valore più velocemente di ogni altro nodo. Il nodo più veloce ha il diritto di proporre un blocco alla catena. Per modificare lo storico della catena o dominare la proposta dei blocchi, un miner dovrebbe avere tanta potenza di calcolo da vincere sempre la gara. Ciò è costoso in modo proibitivo e difficile da eseguire, il che protegge la catena dagli attacchi. L'energia necessaria a "minare" utilizzando il proof-of-work è una risorsa del mondo reale pagata dai miner.

Il proof-of-stake richiede che i nodi, noti come validatori, inviino esplicitamente una risorsa di criptovalute a un contratto intelligente. Se un validatore si comporta male, questa criptovaluta può essere distrutta perché sta "mettendo in staking" le sue risorse direttamente nella catena invece che indirettamente tramite il consumo energetico.

Il proof-of-work consuma molta più energia perché il processo di mining consumata elettricità. Il proof-of-stake, d'altra parte, richiede soltanto una piccola quantità di energia: i validatori di Ethereum possono essere eseguiti persino su un dispositivo a bassa potenza, come un Raspberry Pi. Il meccanismo di proof-of-stake di Ethereum è concepito per essere più sicuro del proof-of-work, perché il costo dell'attacco è maggiore e le conseguenze sono più severe.

Il confronto proof-of-work vs. proof-of-stake è un argomento controverso. Il [blog di Vitalik Buterin](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-are-the-benefits-of-proof-of-stake-as-opposed-to-proof-of-work) e il dibattito tra Justin Drake e Lyn Alden offrono una buona sintesi delle argomentazioni.

<YouTube id="1m12zgJ42dI" />

## Il proof-of-stake è efficiente dal punto di vista energetico? {#is-pos-energy-efficient}

Sì. I nodi su una rete di proof-of-stake utilizzano una minuscola quantità di energia. Uno studio di terze parti ha concluso che l'intera rete di proof-of-stake di Ethereum consuma circa 0,0026 TWh/anno, circa 13.000 volte in meno del gaming nei soli Stati Uniti.

[Di più sul consumo energetico di Ethereum](/energy-consumption/).

## Il proof-of-stake è sicuro? {#is-pos-secure}

Il proof-of-stake di Ethereum è molto sicuro. Il meccanismo è stato studiato, sviluppato e testato rigorosamente per otto anni prima di entrare in funzione. Le garanzie di sicurezza sono differenti dalle blockchain di proof-of-work. Nel proof-of-stake, i validatori malevoli possono essere puniti attivamente ("tagliati") ed espulsi dall'insieme di validatori, costando un sostanziale importo di ETH. Nel proof-of-work, un utente malevolo può continuare a ripetere il proprio attacco fintanto che ha sufficiente potenza di hash. Inoltre, è più costoso compiere attacchi equivalenti sull'Ethereum con proof-of-stake rispetto al proof-of-work. Per influenzare la vitalità della catena, è necessario almeno il 33% dell'ether in staking totale sulla rete (tranne nei casi di attacchi molto sofisticati che hanno una probabilità di successo estremamente ridotta). Per controllare i contenuti dei blocchi futuri, è necessario almeno il 51% degli ETH in staking totali e per riscrivere lo storico serve oltre il 66% dello stake totale. Il protocollo di Ethereum distruggerebbe queste risorse negli scenari di attacco al 33% e 51% e tramite il consenso sociale nello scenario di attacchi del 66%.

- [Maggiori informazioni sulla difesa del proof-of-stake di Ethereum dagli utenti malevoli](/developers/docs/consensus-mechanisms/pos/attack-and-defense)
- [Maggiori informazioni sulla progettazione del proof-of-stake](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)

## Il proof-of-stake rende Ethereum più economico? {#does-pos-make-ethereum-cheaper}

No. Il costo di invio di una transazione (commissione sul carburante) è determinato da un mercato di commissioni dinamico che aumenta all'aumentare della domanda di rete. Il meccanismo di consenso non lo influenza direttamente.

[Maggiori informazioni sul carburante](/developers/docs/gas).

## Cosa sono i nodi, i client e i validatori? {#what-are-nodes-clients-and-validators}

I nodi sono computer connessi alla rete di Ethereum. I client sono i software che eseguono, che trasformano il computer in un nodo. Esistono due tipi di client: di esecuzione e di consenso. Sono entrambi necessari per creare un nodo. Un validatore è un componente aggiuntivo facoltativo a un client di consenso, che consente al nodo di partecipare al consenso di proof-of-stake. Ciò significa creare e proporre blocchi quando selezionati e attestare i blocchi che sentono sulla rete. Per eseguire un validatore, l'operatore del nodo deve depositare 32 ETH nel contratto di deposito.

- [Maggiori informazioni su nodi e client](/developers/docs/nodes-and-clients)
- [Maggiori informazioni sullo staking](/staking)

## Il proof-of-stake è una idea nuova? {#is-pos-new}

No. Un utente su BitcoinTalk [ha proposto l'idea di base del proof-of-stake](https://bitcointalk.org/index.php?topic=27787.0) come un aggiornamento a Bitcoin nel 2011. Erano undici anni prima che fosse pronto all'implementazione sulla Rete Principale di Ethereum. Alcune altre catene hanno implementato il proof-of-stake prima di Ethereum, ma non il meccanismo specifico di Ethereum (noto come Gasper).

## Cosa rende speciale il proof-of-stake di Ethereum? {#why-is-ethereum-pos-special}

Il meccanismo di proof-of-stake di Ethereum è unico nella sua progettazione. Non è stato il primo meccanismo di proof-of-stake mai progettato e implementato, ma è il più robusto. Il meccanismo di proof-of-stake è noto come "Casper". Casper definisce come i validatori sono selezionati per proporre i blocchi, come e quando sono effettuate le attestazioni, come sono contate le attestazioni, le ricompense e le sanzioni date ai validatori, le condizioni di taglio, i meccanismi di emergenza come la perdita per inattività e le condizioni per la "finalità". La finalità è la condizione secondo cui per essere considerato una parte permanente della catena canonica, un blocco deve essere votato da almeno il 66% degli ETH in staking totali sulla rete. I ricercatori hanno sviluppato Casper specificamente per Ethereum, ed Ethereum è la prima e unica blockchain ad averlo implementato.

Oltre a Casper, il proof-of-stake di Ethereum utilizza un algoritmo di scelta della diramazione chiamato LMD-GHOST. Questo è necessario nel caso in cui sorga una condizione in cui due blocchi esistono per lo stesso slot. Ciò crea due diramazioni della blockchain. LMD-GHOST seleziona quella con il "peso" di attestazioni maggiore. Il peso è il numero di attestazioni ponderate dal saldo effettivo dei validatori. LMD-GHOST è un'esclusiva di Ethereum.

La combinazione di Casper e LMD-GHOST è nota come Gasper.

[Maggiori informazioni su Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)

## Cos'è il taglio? {#what-is-slashing}

Taglio è il termine dato alla distruzione di parte dello stake di un validatore e la sua espulsione dalla rete. L'importo di ETH perduto in un taglio scala con il numero di validatori tagliati; ciò significa che i validatori complici sono puniti più severamente dei singoli.

[Maggiori informazioni sul taglio](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties#slashing)

## Perché i validatori necessitano di 32 ETH? {#why-32-eth}

I validatori devono mettere in staking ETH così che abbiano qualcosa da perdere se si comportano male. Il motivo per cui devono specificamente mettere 32 ETH in staking è per consentire di eseguire i nodi su hardware modesti. Se gli ETH minimi per validatore fossero inferiori, il numero di validatori e dunque il numero di messaggi da elaborare in ogni slot aumenterebbe, il che comporta che sarebbe necessario hardware più potente per eseguire un nodo.

## Come sono selezionati i validatori? {#how-are-validators-selected}

Un singolo validatore è scelto pseudo-casualmente per proporre un blocco in ogni slot utilizzando un algoritmo detto RANDAO, che combina un hash dal propositore del blocco con un seed aggiornato a ogni blocco. Questo valore è utilizzato per selezionare un validatore specifico dall'insieme totale di validatori. La selezione del validatore è fissata con due epoche di anticipo.

[Maggiori informazioni sulla selezione dei validatori](/developers/docs/consensus-mechanisms/pos/block-proposal)

## Cos'è la frantumazione dello stake? {#what-is-stake-grinding}

La frantumazione dello stake è una categoria di attacco alle reti di proof-of-stake in cui l'utente malevolo prova a orientare l'algoritmo di selezione del validatore a favore dei propri validatori. Gli attacchi di frantumazione dello stake richiedono all'incirca metà degli ETH totali in staking.

[Maggiori informazioni sulla frantumazione dello stake](https://eth2book.info/altair/part2/building_blocks/randomness/#randao-biasability)

## Cos'è il taglio sociale? {#what-is-social-slashing}

Il taglio sociale è l'abilità della community di coordinare una diramazione blockchain in risposta a un attacco. Consente alla community di riprendersi da un utente malevolo che finalizza una catena disonesta. Il taglio sociale è anche utilizzabile contro gli attacchi di censura.

- [Maggiori informazioni sul taglio sociale](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7)
- [Vitalik Buterin sul taglio sociale](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)

## Riceverò un taglio? {#will-i-get-slashed}

Come validatore, è molto difficile essere tagliato a meno che non si adottino deliberatamente comportamenti malevoli. Il taglio è implementato soltanto in scenari davvero specifici in cui i validatori propongono più blocchi per lo stesso slot o si contraddicono con le proprie attestazioni – situazioni che è davvero improbabile sorgano accidentalmente.

[Maggiori informazioni sulle condizioni di taglio](https://eth2book.info/altair/part2/incentives/slashing)

## Cos'è il problema del "nulla in staking"? {#what-is-nothing-at-stake-problem}

Il problema del "nulla in staking" è un problema concettuale con alcuni meccanismi di proof-of-stake in cui esistono solo ricompense e nessuna sanzione. Se non c'è nulla in staking, un validatore pragmatico è altrettanto felice di attestare qualsiasi, o persino più, diramazioni della blockchain, perché questo aumenta le sue ricompense. Ethereum aggira tale problema utilizzando le condizioni di finalità e il taglio per assicurare una catena canonica.

[Maggiori informazioni sul problema di "nulla in staking"](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)

## Cos'è un algoritmo di scelta della diramazione? {#what-is-a-fork-choice-algorithm}

Un algoritmo di scelta della diramazione implementa regole che determinano quale catena sia quella canonica. In condizioni ottimali, una regola di scelta della diramazione non è necessaria poiché esiste un solo propositore di blocchi per slot e un blocco tra cui scegliere. Talvolta, però, più blocchi per lo stesso slot o informazioni in ritardo comportano più opzioni per come sono organizzati i blocchi vicino alla testa della catena. In questi casi, tutti i client devono implementare delle regole in maniera identica per assicurarsi che tutti selezionino la sequenza corretta di blocchi. L'algoritmo di scelta della diramazione codifica tali regole.

L'algoritmo di scelta della diramazione di Ethereum si chiama LMD-GHOST. Seleziona la diramazione con il peso di attestazioni maggiore, ossia quello votato da più ETH in staking.

[Maggiori informazioni su LMD-GHOST](/developers/docs/consensus-mechanisms/pos/gasper/#fork-choice)

## Cos'è la finalità nel proof-of-stake? {#what-is-finality}

La finalità nel proof-of-stake è la garanzia che un dato blocco sia una parte permanente della catena canonica e non sia annullabile tranne in caso di mancanza del consenso in cui un utente malevolo brucia il 33% dell'ether in staking totale. Questa è la finalità "cripto-economica", contrapposta alla "finalità probabilistica" che riguarda le blockchain di proof-of-work. Nella finalità probabilistica, non esistono stati finalizzati/non finalizzati espliciti per i blocchi; semplicemente, diventa sempre meno probabile che un blocco possa essere rimosso dalla catena più diventa vecchio, e gli utenti determinano da soli quando sono abbastanza certi che un blocco sia "sicuro". Con la finalità cripto-economica, le coppie di blocchi di punti di controllo devono essere votate dal 66% dell'ether in staking. Se tale condizione è soddisfatta, i blocchi tra tali punti di controllo sono esplicitamente "finalizzati".

[Maggiori informazioni sulla finalità](/developers/docs/consensus-mechanisms/pos/#finality)

## Cos'è la "soggettività debole"? {#what-is-weak-subjectivity}

La soggettività debole è una funzionalità delle reti di proof-of-stake in cui le informazioni sociali sono utilizzate per confermare lo stato corrente della blockchain. I nuovi nodi, o quelli che si riuniscono alla rete dopo esser stati offline per molto tempo, possono ricevere uno stato recente così che il nodo possa vedere immediatamente se si trovano sulla catena corretta. Questi stati sono noti come "punti di controllo della soggettività debole" e sono ottenibili da altri operatori di nodi fuori banda, o dagli esploratori di blocchi, o da svariati endpoint pubblici.

[Maggiori informazioni sulla soggettività debole](/developers/docs/consensus-mechanisms/pos/weak-subjectivity)

## Il proof-of-stake è resistente alla censura? {#is-pos-censorship-resistant}

La resistenza alla censura è attualmente difficile da dimostrare. Tuttavia, a differenza del proof-of-work, il proof-of-stake offre l'opzione di coordinare i tagli per punire i validatori autori di censura. Sono previste delle modifiche al protocollo per separare i costruttori dai propositori di blocchi e implementare elenchi di transazioni che i costruttori devono includere in ogni blocco. Questa proposta è nota come separazione tra propositori e costruttori e aiuta a impedire che i validatori censurino le transazioni.

[Maggiori informazioni sulla separazione tra propositori e costruttori](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Original-basic-scheme)

## Il sistema di proof-of-stake di Ethereum può subire attacchi al 51%? {#pos-51-attack}

Sì. Il proof-of-stake è vulnerabile agli attacchi al 51%, proprio come il proof-of-work. Anziché aver bisogno del 51% della potenza di hash della rete, l'utente malevolo necessita del 51% del totale degli ETH in staking. Un utente malevolo che accumula il 51% dello stake totale ottiene il controllo dell'algoritmo di scelta della diramazione. Ciò gli consente di censurare certe transazioni, effettuare riorganizzazioni a breve raggio ed estrarre MEV riordinando i blocchi a proprio favore.

[Maggiori informazioni sugli attacchi al proof-of-stake](/developers/docs/consensus-mechanisms/pos/attack-and-defense)

## Cos'è il coordinamento sociale e perché è necessario? {#what-is-social-coordination}

Il coordinamento sociale è l'ultima linea di difesa di Ethereum, che consentirebbe a una catena onesta di essere recuperata da un attacco che ha finalizzato dei blocchi disonesti. In questo caso, la community di Ethereum dovrebbe coordinarsi "fuori banda" e accordarsi sull'uso di una diramazione onesta di minoranza, tagliando i validatori malevoli nel processo. Ciò richiederebbe anche alle app e alle borse di riconoscere la diramazione onesta.

[Maggiori informazioni sul coordinamento sociale](/developers/docs/consensus-mechanisms/pos/attack-and-defense#people-the-last-line-of-defense)

## Il ricco si arricchisce con il proof-of-stake? {#do-rich-get-richer}

Più ETH qualcuno ha da mettere in staking, più validatori può eseguire e più ricompense può ottenere. Le ricompense scalano linearmente con l'importo di ETH in staking e tutti ottengono in cambio la stessa percentuale. Il proof-of-work arricchisce il ricco più del proof-of-stake, perché i miner più ricchi che acquistano hardware su larga scala beneficiano dalle economie di scala, il che significa che la relazione tra ricchezza e ricompensa non è lineare.

## Il proof-of-stake è più centralizzato del proof-of-work? {#is-pos-decentralized}

No, il proof-of-work tende alla centralizzazione perché i costi di mining aumentano e tagliano fuori gli individui, poi tagliano fuori le piccole aziende e così via. L'attuale problema con il proof-of-stake è l'influenza dei derivati di staking liquidi (LSD). Si tratta di token rappresentanti gli ETH messi in staking da qualche fornitore, che chiunque può scambiare su mercati secondari senza prelevare gli ETH effettivi. Gli LSD consentono agli utenti di mettere in staking meno di 32 ETH, ma creano anche un rischio di centralizzazione in cui poche grandi organizzazioni possono finire per controllare gran parte dello stake. Per questo lo [staking in autonomia](/staking/solo) è l'opzione migliore per Ethereum.

[Maggiori informazioni sulla centralizzazione dello stake in LSD](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Perché posso mettere soltanto gli ETH in staking? {#why-can-i-only-stake-eth}

ETH è la valuta nativa di Ethereum. È essenziale avere una singola valuta in cui sono denominati tutti gli stake, sia per tenere conto dei saldi effettivi che per ponderare i voti e per la sicurezza. Gli stessi ETH sono componenti fondamentali di Ethereum, rispetto a un contratto intelligente. Integrare altre valute aumenterebbe significativamente la complessità, riducendo la sicurezza dello staking.

## Ethereum è la sola blockchain di proof-of-stake? {#is-ethereum-the-only-pos-blockchain}

No, esistono diverse blockchain di proof-of-stake. Nessuna è identica a Ethereum; il meccanismo di proof-of-stake di Ethereum è unico.

## In cosa consiste La Fusione? {#what-is-the-merge}

La Fusione è stata il momento in cui Ethereum ha spento il suo meccanismo di consenso basato sul proof-of-work ed è passato a quello di proof-of-stake. La Fusione si è verificata il 15 settembre 2022.

[Maggiori informazioni sulla fusione](/roadmap/merge)

## Cosa sono vitalità e sicurezza? {#what-are-liveness-and-safety}

Vitalità e sicurezza sono le due preoccupazioni fondamentali in materia di sicurezza per una blockchain. La vitalità è la disponibilità di una catena che si finalizza. Se la catena smette di finalizzarsi o gli utenti non possono accedervi facilmente, si parla di perdita di vitalità. Anche un costo d'accesso estremamente elevato potrebbe essere considerato una perdita di vitalità. La sicurezza si riferisce alla difficoltà di attacco della catena, ossia finalizzare punti di controllo in conflitto.

[Leggi di più nel documento di Casper](https://arxiv.org/pdf/1710.09437.pdf)
