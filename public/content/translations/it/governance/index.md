---
title: La governance di Ethereum
description: Un'introduzione a come vengono prese le decisioni su Ethereum.
lang: it
---

# Introduzione alla governance di Ethereum {#introduction}

_Se nessuno possiede Ethereum, come vengono prese le decisioni sui cambiamenti passati e futuri? La governance di Ethereum si riferisce al processo che consente di prendere tali decisioni._

<Divider />

## Che cos'è la governance? {#what-is-governance}

La governance è il sistema in atto che consente di prendere decisioni. In una struttura organizzativa tipica, il team esecutivo o un consiglio di amministrazione può avere l'ultima parola nel processo decisionale. Oppure gli azionisti votano le proposte per attuare eventuali cambiamenti. In un sistema politico, i funzionari eletti possono emanare leggi che cercano di rappresentare i desideri degli elettori.

## Governance decentralizzata {#decentralized-governance}

Nessuna persona possiede o controlla il protocollo Ethereum, ma è comunque necessario prendere decisioni sull'implementazione delle modifiche per garantire al meglio la longevità e la prosperità della rete. Questa mancanza di proprietà rende la governance organizzativa tradizionale una soluzione incompatibile.

## Governance di Ethereum {#ethereum-governance}

La governance di Ethereum è il processo attraverso il quale vengono apportate modifiche al protocollo. È importante sottolineare che questo processo non ha a che fare con il modo in cui le persone e le applicazioni utilizzano il protocollo, infatti Ethereum è senza autorizzazioni. Chiunque da qualsiasi parte del mondo può partecipare ad attività onchain. Non ci sono regole fisse su chi può o non può creare un'applicazione o inviare una transazione. Tuttavia, esiste un processo per proporre modifiche al protocollo principale, su cui vengono eseguite queste applicazioni. Poiché molte persone dipendono dalla stabilità di Ethereum, esiste una soglia di coordinamento davvero elevata per i cambiamenti principali, inclusi i processi sociali e tecnici, per garantire che ogni modifica a Ethereum sia sicura e ampiamente supportata dalla community.

### Governance sulla catena e fuori dalla catena {#onchain-vs-offchain}

La tecnologia blockchain rende possibili nuove modalità di governance, conosciute come governance onchain. Per governance onchain si intendono proposte di modifica al protocollo decise tramite il voto degli stakeholder, che in genere detengono un governance token, e la votazione avviene sulla blockchain. In alcune forme di governance onchain, le modifiche proposte al protocollo sono già scritte nel codice e vengono implementate automaticamente nel caso in cui vengano approvate dagli stakeholder tramite la sottoscrizione di una transazione.

Con la governance offchain si intende invece l'approccio opposto, ovvero quando le decisioni di modifica al protocollo passano attraverso un processo informale di discussione e, se approvate, vengono implementate nel codice.

**La governance di Ethereum avviene fuori dalla catena**, con un'ampia varietà di stakeholder coinvolti nel processo.

_Mentre a livello di protocollo Ethereum la governance è gestita offchain, molti casi d'uso costruiti su Ethereum, come le DAO, utilizzano una governance onchain._

<ButtonLink href="/dao/">
  Maggiori informazioni sulle DAO
</ButtonLink>

<Divider />

## Chi è coinvolto? {#who-is-involved}

Ci sono vari stakeholder nella [community di Ethereum](/community/), ognuno dei quali svolge un ruolo nel processo di governance. Partendo dagli stakeholder più "lontani" dal protocollo per arrivare a quelli più vicini, abbiamo:

- **Detentori di Ether**: persone che detengono una quantità arbitraria di ETH. [Maggiori informazioni su ETH](/what-is-ether/).
- **Utenti delle applicazioni**: persone che interagiscono con le applicazioni sulla blockchain di Ethereum.
- **Sviluppatori di applicazioni/strumenti**: persone che scrivono applicazioni che funzionano sulla blockchain di Ethereum (ad es. DeFi, NFT, ecc.) o creano strumenti per interagire con Ethereum (ad es. portafogli, suite di test, ecc.). [Maggiori informazioni sulle dApp](/apps/).
- **Operatori di nodi**: persone che eseguono nodi che propagano blocchi e transazioni, rifiutando qualsiasi transazione o blocco non valido che incontrano. [Maggiori informazioni sui nodi](/developers/docs/nodes-and-clients/).
- **Autori di EIP**: persone che propongono modifiche al protocollo Ethereum, sotto forma di Proposte di Miglioramento di Ethereum (EIP). [Maggiori informazioni sulle EIP](/eips/).
- **Validatori**: persone che eseguono nodi che possono aggiungere nuovi blocchi alla blockchain di Ethereum.
- **Sviluppatori del protocollo** (noti anche come "Sviluppatori core"): persone che mantengono le varie implementazioni di Ethereum (ad es. go-ethereum, Nethermind, Besu, Erigon, Reth al livello di esecuzione o Prysm, Lighthouse, Nimbus, Teku, Lodestar, Grandine al livello di consenso). [Maggiori informazioni sui client di Ethereum](/developers/docs/nodes-and-clients/).

_Nota: un individuo può far parte di più di uno di questi gruppi (ad esempio, uno sviluppatore di protocollo potrebbe promuovere un'EIP, gestire un validatore della Beacon Chain e usare applicazioni DeFi)._ Tuttavia, per chiarezza concettuale risulta più facile distinguerli._

<Divider />

## Cos'è una EIP? {#what-is-an-eip}

Un processo importante utilizzato nella governance di Ethereum è la proposta di **Proposte di Miglioramento di Ethereum (EIP)**. Le EIP costituiscono lo standard per potenziali nuove funzioni o processi di Ethereum. Chiunque nella community Ethereum può creare un'EIP. Se sei interessata/o a scrivere un’EIP o a partecipare alla revisione tra colleghi e/o alla governance, vedi:

<ButtonLink href="/eips/">
  Maggiori informazioni sulle EIP
</ButtonLink>

<Divider />

## Il processo formale {#formal-process}

Il processo formale per l'introduzione di modifiche al protocollo Ethereum è il seguente:

1. **Proporre una EIP Core**: come descritto in [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips), il primo passo per proporre formalmente una modifica a Ethereum è dettagliarla in una EIP Core. Questa fungerà da specifica ufficiale per una EIP the gli sviluppatori del protocollo implementeranno nel caso venga accettata.

2. **Presentare la tua EIP agli Sviluppatori del Protocollo**: una volta che hai una EIP Core per cui hai raccolto il feedback della community, dovresti presentarla agli Sviluppatori del Protocollo. Puoi farlo proponendola per la discussione in una [chiamata AllCoreDevs](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status). È probabile che alcune discussioni siano già avvenute in modo asincrono sul [forum di Ethereum Magicians](https://ethereum-magicians.org/) o nel [Discord di Ethereum R&D](https://discord.gg/mncqtgVSVw).

> I possibili risultati di questa fase sono:

> - L'EIP verrà presa in considerazione per un upgrade futuro del network
> - Saranno richieste modifiche tecniche
> - Potrebbe essere rifiutata se non viene considerata una priorità o se il miglioramento non giustifica lo sforzo di sviluppo

3. **Iterare verso una proposta finale:** dopo aver ricevuto il feedback da tutti gli stakeholder pertinenti, probabilmente dovrai apportare modifiche alla tua proposta iniziale per migliorarne la sicurezza o per soddisfare meglio le esigenze dei vari utenti. Una volta che la tua EIP incorporerà tutte le modifiche ritenute necessarie, dovrai presentarla di nuovo agli sviluppatori del protocollo. Dovrai quindi passare alla fase successiva del processo; se invece emergeranno nuovi dubbi, occorrerà un nuovo round di iterazione della proposta.

4. **EIP inclusa nell'aggiornamento della rete**: supponendo che l'EIP sia approvata, testata e implementata, viene pianificata come parte di un aggiornamento della rete. Considerati gli elevati costi di coordinamento (tutti devono procedere all'upgrade della rete contemporaneamente), in genere le EIP vengono raggruppate in un aggiornamento polivalente.

5. **Aggiornamento della rete attivato**: dopo l'attivazione dell'aggiornamento della rete, l'EIP sarà attiva sulla rete di Ethereum. _Nota: gli aggiornamenti della rete vengono solitamente attivati sulle reti di test prima di essere attivati sulla Mainnet di Ethereum._

Benché molto semplificato, questo flusso può dare un'idea delle fasi principali necessarie per l'implementazione di una modifica su Ethereum. Ora diamo un'occhiata ai fattori informali che entrano in gioco durante il processo.

## Il processo informale {#informal-process}

### Comprendere il lavoro precedente {#prior-work}

Gli EIP Champion dovrebbero familiarizzare con il lavoro e le proposte fatte in precedenza prima di creare una EIP che possa essere considerata seriamente per il rilascio sulla rete principale di Ethereum. In questo modo, si spera che l'EIP possa portare qualcosa di nuovo, che non sia già stato rifiutato in precedenza. I tre luoghi principali in cui fare ricerca sono il [repository delle EIP](https://github.com/ethereum/EIPs), [Ethereum Magicians](https://ethereum-magicians.org/) e [ethresear.ch](https://ethresear.ch/).

### Gruppi di lavoro {#working-groups}

La bozza iniziale di una EIP difficilmente verrà implementata sulla rete principale di Ethereum senza modifiche o variazioni. Generalmente, l'EIP Champion lavorerà con un sottoinsieme di sviluppatori del protocollo per specificare, implementare, testare, iterare e finalizzare la proposta. Storicamente, questi gruppi di lavoro hanno richiesto diversi mesi (e a volte anni!) di lavoro. Allo stesso modo, gli EIP Champion coinvolti in queste modifiche dovrebbero includere sviluppatori di app/tool sin dall'inizio per ottenere un feedback dall'utente finale e mitigare i potenziali rischi connessi al rilascio.

### Consenso della community {#community-consensus}

Mentre alcune EIP sono semplici miglioramenti tecnici con sfumature minime, altre sono più complesse e implicano compromessi che influenzeranno diverse parti interessate, in modi differenti. Questo significa che alcune EIP finiscono per essere più discusse nella community rispetto ad altre.

Non c'è una modalità definita su come gestire le proposte controverse. Questo è il risultato del design decentralizzato di Ethereum in cui nessun singolo gruppo di stakeholder può costringere l'altro attraverso la forza bruta: gli sviluppatori di protocollo possono scegliere di non implementare modifiche di codice; gli operatori dei nodi possono scegliere di non eseguire l'ultimo client Ethereum; i team di applicazioni e gli utenti possono scegliere di non effettuare transazioni sulla catena. Dato che gli sviluppatori del protocollo non hanno modo di forzare le persone ad adottare gli upgrade, evitano generalmente di implementare le EIP per le quali le discussioni superano i benefici per l'intera community.

Gli EIP Champion dovrebbero sollecitare i feedback da tutti gli stakeholder interessati. Se ti ritrovi ad essere un EIP Champion di un'EIP controversa, dovresti provare a rispondere alle obiezioni cercando di raggiungere un consenso. Date le dimensioni e la diversità della community di Ethereum, non esiste un singolo parametro (ad es. un voto tramite coin) che possa essere utilizzato per misurare il consenso della community, e ci si aspetta che i promotori delle EIP si adattino alle circostanze della loro proposta.

Al di là della sicurezza della rete di Ethereum, storicamente gli sviluppatori del protocollo attribuiscono un peso significativo agli aspetti che hanno valore per gli sviluppatori di app/tool e gli utenti dell'applicazione, dato che il loro utilizzo e sviluppo su Ethereum è ciò che rende l'ecosistema interessante per gli altri stakeholder. Inoltre, le EIP devono essere implementate per tutte le implementazioni del client, gestite da team distinti. Parte di questo processo significa solitamente convincere più team di Sviluppatori del Protocollo che una modifica particolare sia preziosa e aiuti gli utenti finali o risolva un problema di sicurezza.

<Divider />

## Gestione dei disaccordi {#disagreements}

Avere molte parti interessate con motivazioni e convinzioni diverse si traduce in frequenti disaccordi.

In genere le controversie sono gestite mediante discussioni approfondite nei forum pubblici, per comprendere la radice del problema e consentire a chiunque di soppesarlo. Solitamente un gruppo cede oppure viene raggiunto un accordo soddisfacente. Può però accadere che un gruppo arrivi a forzare un particolare cambiamento, con il rischio di una divisione della catena. Una divisione della catena si verifica quando alcuni stakeholder protestano, implementando una modifica del protocollo che si traduce in versioni differenti e incompatibili del protocollo operativo, da cui emergono due blockchain distinte.

### La biforcazione della DAO {#dao-fork}

Le diramazioni si verificano quando occorre eseguire aggiornamenti tecnici o modifiche importanti alla rete, tali da cambiare le "regole" del protocollo. I [client Ethereum](/developers/docs/nodes-and-clients/) devono aggiornare il proprio software per implementare le nuove regole di diramazione.

La biforcazione della DAO è stata una risposta all'[attacco alla DAO del 2016](https://www.coindesk.com/learn/understanding-the-dao-attack), in cui un contratto [DAO](/glossary/#dao) non sicuro è stato prosciugato di oltre 3,6 milioni di ETH a causa di un hack. La diramazione ha spostato i fondi dal contratto lacunoso a uno nuovo, consentendo a chiunque avesse perso i fondi di hackerare per recuperarli.

Questa iniziativa è stata votata dalla community di Ethereum. Ogni detentore di ETH ha potuto votare tramite una transazione su [una piattaforma di voto](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). La decisione di creare la diramazione ha ottenuto oltre l'85% dei voti.

È importante notare che, anche se la diramazione del protocollo è servita per invertire l'attacco, il peso assegnato al voto per decidere in merito alla diramazione è discutibile per alcune ragioni:

- La partecipazione al voto è stata incredibilmente bassa
- Gran parte delle persone non era al corrente della votazione
- Il voto rappresentava solo i titolari di ETH, lasciando fuori tutti gli altri partecipanti al sistema

Un sottogruppo della community ha rifiutato la diramazione, soprattutto perché riteneva che l'episodio del DAO non fosse imputabile a un difetto del protocollo. Hanno quindi formato [Ethereum Classic](https://ethereumclassic.org/).

Oggi, la community di Ethereum ha adottato una politica di non intervento in caso di bug sui contratti o di fondi persi per mantenere la credibile neutralità del sistema.

Guarda altri contenuti sull'attacco alla DAO:

<YouTube id="rNeLuBOVe8A" />

<Divider />

### L'utilità della biforcazione {#forking-utility}

Il fork Ethereum/Ethereum Classic è un ottimo esempio di fork sano. Due gruppi hanno espresso un disaccordo sufficientemente forte tra loro su alcuni valori principali, per ritenere che valesse la pena correre i rischi connessi al perseguimento delle loro specifiche linee d'azione.

La capacità di eseguire il fork di fronte a divergenze politiche, filosofiche o economiche molto significative, svolge un ruolo importante nel successo della governance di Ethereum. Senza la capacità di eseguire il fork, l'alternativa sarebbe quella di lotte continue, di una partecipazione riluttante e forzata per coloro che alla fine hanno deciso di formare Ethereum Classic nonché una visione sempre più divergente su quale sia l'aspetto del successo per Ethereum.

<Divider />

## Governance della Beacon Chain {#beacon-chain}

Il processo di governance di Ethereum spesso rinuncia a velocità ed efficienza a favore di apertura e inclusività. Al fine di accelerare lo sviluppo della Beacon Chain, è stata lanciata separatamente dalla rete proof-of-work di Ethereum e ha seguito le proprie pratiche di governance.

Lo sviluppo di specifiche e implementazioni è sempre stato totalmente open source, non sono stati invece utilizzati i processi formali descritti sopra per proporre gli aggiornamenti. Questo ha consentito a ricercatori e implementatori di specificare e concordare le modifiche più rapidamente.

Quando la Beacon Chain si è fusa con il livello di esecuzione di Ethereum il 15 settembre 2022, la Fusione è stata completata come parte dell'[aggiornamento della rete Paris](/ethereum-forks/#paris). La proposta [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) è passata da "Last Call" a "Final", completando la transizione a Proof-of-Stake.

<ButtonLink href="/roadmap/merge/">
  Maggiori informazioni sulla Fusione
</ButtonLink>

<Divider />

## Come posso partecipare? Partecipa {#get-involved}

- [Proponi un'EIP](/eips/#participate)
- [Discuti le proposte attuali](https://ethereum-magicians.org/)
- [Partecipa alla discussione sulla R&S](https://ethresear.ch/)
- [Unisciti al Discord di Ethereum R&D](https://discord.gg/mncqtgVSVw)
- [Esegui un nodo](/developers/docs/nodes-and-clients/run-a-node/)
- [Contribuisci allo sviluppo dei client](/developers/docs/nodes-and-clients/#execution-clients)
- [Core Developer Apprenticeship Program](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort/)

## Letture consigliate {#further-reading}

La governance in Ethereum non è definita rigidamente. I vari partecipanti della comunità hanno diverse prospettive a riguardo. Eccone alcune:

- [Note sulla governance della blockchain](https://vitalik.eth.limo/general/2017/12/17/voting.html) - _Vitalik Buterin_
- [Come funziona la governance di Ethereum?](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [Come funziona la governance di Ethereum](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [Cos'è uno sviluppatore core di Ethereum?](https://hudsonjameson.com/2020-06-22-what-is-an-ethereum-core-developer/) - _Hudson Jameson_
- [Governance, Parte 2: la plutocrazia è ancora un male](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) - _Vitalik Buterin_
- [Andare oltre la governance del voto tramite coin](https://vitalik.eth.limo/general/2021/08/16/voting3.html) - _Vitalik Buterin_
- [Comprendere la governance della blockchain](https://web.archive.org/web/20250124192731/https://research.2077.xyz/understanding-blockchain-governance) - _2077 Research_
- [Il governo di Ethereum](https://www.galaxy.com/insights/research/ethereum-governance/) - _Christine Kim_
