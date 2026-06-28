---
title: Introduzione alla governance di Ethereum
metaTitle: Governance di Ethereum
description: Un'introduzione a come vengono prese le decisioni su Ethereum.
lang: it
---

_Se nessuno possiede [Ethereum](/), come vengono prese le decisioni sui cambiamenti passati e futuri di Ethereum? La governance di Ethereum si riferisce al processo che consente di prendere tali decisioni._

<Divider />

## Cos'è la governance? {#what-is-governance}

La governance è l'insieme dei sistemi in atto che consentono di prendere decisioni. In una tipica struttura organizzativa, il team esecutivo o un consiglio di amministrazione potrebbero avere l'ultima parola nel processo decisionale. O forse gli azionisti votano su proposte per attuare un cambiamento. In un sistema politico, i funzionari eletti possono promulgare leggi che tentano di rappresentare i desideri dei loro elettori.

## Governance decentralizzata {#decentralized-governance}

Nessuna singola persona possiede o controlla il protocollo di Ethereum, ma è comunque necessario prendere decisioni sull'implementazione di modifiche per garantire al meglio la longevità e la prosperità della rete. Questa mancanza di proprietà rende la governance organizzativa tradizionale una soluzione incompatibile.

## Governance di Ethereum {#ethereum-governance}

La governance di Ethereum è il processo attraverso il quale vengono apportate modifiche al protocollo. È importante sottolineare che questo processo non è correlato a come le persone e le applicazioni utilizzano il protocollo: Ethereum è permissionless. Chiunque, da qualsiasi parte del mondo, può partecipare alle attività onchain. Non ci sono regole stabilite su chi può o non può creare un'applicazione o inviare una transazione. Tuttavia, esiste un processo per proporre modifiche al protocollo principale, su cui vengono eseguite le applicazioni decentralizzate (dapp). Poiché così tante persone dipendono dalla stabilità di Ethereum, esiste una soglia di coordinamento molto alta per le modifiche principali, che include processi sociali e tecnici, per garantire che qualsiasi modifica a Ethereum sia sicura e ampiamente supportata dalla community.

<VideoWatch slug="ethereum-core-governance-explained" />

### Governance onchain vs offchain {#onchain-vs-offchain}

La tecnologia blockchain consente nuove capacità di governance, note come governance onchain. La governance onchain si verifica quando le modifiche proposte al protocollo vengono decise dal voto degli stakeholder, di solito dai detentori di un token di governance, e la votazione avviene sulla blockchain. Con alcune forme di governance onchain, le modifiche proposte al protocollo sono già scritte nel codice e implementate automaticamente se gli stakeholder approvano le modifiche tramite la firma di una transazione.

L'approccio opposto, la governance offchain, prevede che qualsiasi decisione di modifica del protocollo avvenga attraverso un processo informale di discussione sociale che, se approvato, verrebbe implementato nel codice.

**La governance di Ethereum avviene offchain** con un'ampia varietà di stakeholder coinvolti nel processo.

_Mentre a livello di protocollo la governance di Ethereum è offchain, molti casi d'uso costruiti su Ethereum, come le DAO, utilizzano la governance onchain._

<ButtonLink href="/dao/">
  Maggiori informazioni sulle DAO
</ButtonLink>

<Divider />

## Chi è coinvolto? {#who-is-involved}

Ci sono vari stakeholder nella [community di Ethereum](/community/), ognuno dei quali svolge un ruolo nel processo di governance. Partendo dagli stakeholder più lontani dal protocollo e avvicinandoci, abbiamo:

- **Detentori di ether**: queste persone detengono una quantità arbitraria di ETH. [Maggiori informazioni su ETH](/what-is-ether/).
- **Utenti delle applicazioni**: queste persone interagiscono con le applicazioni sulla blockchain di Ethereum.
- **Sviluppatori di applicazioni/strumenti**: queste persone scrivono applicazioni che vengono eseguite sulla blockchain di Ethereum (es. finanza decentralizzata (DeFi), NFT, ecc.) o creano strumenti per interagire con Ethereum (es. portafogli, suite di test, ecc.). [Maggiori informazioni sulle dapp](/apps/).
- **Operatori dei nodi**: queste persone gestiscono i nodi che propagano blocchi e transazioni, rifiutando qualsiasi transazione o blocco non valido in cui si imbattono. [Maggiori informazioni sui nodi](/developers/docs/nodes-and-clients/).
- **Autori di EIP**: queste persone propongono modifiche al protocollo di Ethereum, sotto forma di Ethereum Improvement Proposal (EIP). [Maggiori informazioni sulle EIP](/eips/).
- **Validatori**: queste persone gestiscono nodi che possono aggiungere nuovi blocchi alla blockchain di Ethereum.
- **Sviluppatori del protocollo** (noti anche come "Core Developer"): queste persone mantengono le varie implementazioni di Ethereum (es. go-ethereum, Nethermind, Besu, Erigon, Reth al livello di esecuzione o Prysm, Lighthouse, Nimbus, Teku, Lodestar, Grandine al livello di consenso). [Maggiori informazioni sui client di Ethereum](/developers/docs/nodes-and-clients/).

_Nota: qualsiasi individuo può far parte di più di questi gruppi (es. uno sviluppatore del protocollo potrebbe sostenere una EIP, gestire un validatore della Beacon Chain e utilizzare applicazioni DeFi). Per chiarezza concettuale, tuttavia, è più semplice distinguerli._

<Divider />

## Cos'è una EIP? {#what-is-an-eip}

Un processo importante utilizzato nella governance di Ethereum è la proposta delle **Ethereum Improvement Proposal (EIP)**. Le EIP sono standard che specificano potenziali nuove funzionalità o processi per Ethereum. Chiunque all'interno della community di Ethereum può creare una EIP. Se ti interessa scrivere una EIP o partecipare alla revisione paritaria e/o alla governance, consulta:

<ButtonLink href="/eips/">
  Maggiori informazioni sulle EIP
</ButtonLink>

<Divider />

## Il processo formale {#formal-process}

Il processo formale per introdurre modifiche al protocollo di Ethereum è il seguente:

1. **Proporre una Core EIP**: come descritto nella [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips), il primo passo per proporre formalmente una modifica a Ethereum è dettagliarla in una Core EIP. Questa fungerà da specifica ufficiale per una EIP che gli sviluppatori del protocollo implementeranno se accettata.

2. **Presentare la tua EIP agli sviluppatori del protocollo**: una volta che hai una Core EIP per la quale hai raccolto i feedback della community, dovresti presentarla agli sviluppatori del protocollo. Puoi farlo proponendola per la discussione in una [chiamata AllCoreDevs](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status). È probabile che alcune discussioni siano già avvenute in modo asincrono sul [forum di Ethereum Magicians](https://ethereum-magicians.org/) o nel [Discord di R&S di Ethereum](https://discord.gg/mncqtgVSVw).

> I potenziali risultati di questa fase sono:

> - La EIP sarà presa in considerazione per un futuro aggiornamento della rete
> - Verranno richieste modifiche tecniche
> - Potrebbe essere rifiutata se non è una priorità o se il miglioramento non è abbastanza grande rispetto allo sforzo di sviluppo

3. **Iterare verso una proposta finale:** dopo aver ricevuto feedback da tutti gli stakeholder rilevanti, probabilmente dovrai apportare modifiche alla tua proposta iniziale per migliorarne la sicurezza o soddisfare meglio le esigenze dei vari utenti. Una volta che la tua EIP avrà incorporato tutte le modifiche che ritieni necessarie, dovrai presentarla nuovamente agli sviluppatori del protocollo. Passerai quindi alla fase successiva di questo processo, oppure emergeranno nuove preoccupazioni, richiedendo un altro ciclo di iterazioni sulla tua proposta.

4. **EIP inclusa nell'aggiornamento della rete**: supponendo che la EIP venga approvata, testata e implementata, viene programmata come parte di un aggiornamento della rete. Dati gli elevati costi di coordinamento degli aggiornamenti della rete (tutti devono aggiornare contemporaneamente), le EIP vengono generalmente raggruppate negli aggiornamenti.

5. **Aggiornamento della rete attivato**: dopo l'attivazione dell'aggiornamento della rete, la EIP sarà attiva sulla rete Ethereum. _Nota: gli aggiornamenti della rete vengono solitamente attivati sulle testnet prima di essere attivati sulla Mainnet di Ethereum._

Questo flusso, sebbene molto semplificato, fornisce una panoramica delle fasi significative affinché una modifica del protocollo venga attivata su Ethereum. Ora, diamo un'occhiata ai fattori informali in gioco durante questo processo.

## Il processo informale {#informal-process}

### Comprendere il lavoro precedente {#prior-work}

I sostenitori delle EIP (EIP Champion) dovrebbero familiarizzare con i lavori e le proposte precedenti prima di creare una EIP che possa essere seriamente presa in considerazione per la distribuzione sulla Mainnet di Ethereum. In questo modo, si spera che la EIP porti qualcosa di nuovo che non sia già stato rifiutato in precedenza. I tre luoghi principali in cui fare ricerca al riguardo sono il [repository delle EIP](https://github.com/ethereum/EIPs), [Ethereum Magicians](https://ethereum-magicians.org/) ed [ethresear.ch](https://ethresear.ch/).

### Gruppi di lavoro {#working-groups}

È improbabile che la bozza iniziale di una EIP venga implementata sulla Mainnet di Ethereum senza modifiche o cambiamenti. In genere, i sostenitori delle EIP lavoreranno con un sottoinsieme di sviluppatori del protocollo per specificare, implementare, testare, iterare e finalizzare la loro proposta. Storicamente, questi gruppi di lavoro hanno richiesto diversi mesi (e a volte anni!) di lavoro. Allo stesso modo, i sostenitori delle EIP per tali modifiche dovrebbero coinvolgere tempestivamente gli sviluppatori di applicazioni/strumenti pertinenti nei loro sforzi per raccogliere i feedback degli utenti finali e mitigare eventuali rischi di distribuzione.

### Consenso della community {#community-consensus}

Mentre alcune EIP sono semplici miglioramenti tecnici con sfumature minime, altre sono più complesse e comportano compromessi che influenzeranno i diversi stakeholder in modi diversi. Ciò significa che alcune EIP sono più controverse di altre all'interno della community.

Non esiste un manuale chiaro su come gestire le proposte controverse. Questo è il risultato del design decentralizzato di Ethereum, in base al quale nessun singolo gruppo di stakeholder può costringere l'altro con la forza bruta: gli sviluppatori del protocollo possono scegliere di non implementare le modifiche al codice; gli operatori dei nodi possono scegliere di non eseguire l'ultimo client di Ethereum; i team delle applicazioni e gli utenti possono scegliere di non effettuare transazioni sulla catena. Poiché gli sviluppatori del protocollo non hanno modo di costringere le persone ad adottare gli aggiornamenti della rete, in genere eviteranno di implementare EIP in cui le controversie superano i vantaggi per la community in generale.

Ci si aspetta che i sostenitori delle EIP sollecitino feedback da tutti gli stakeholder rilevanti. Se ti ritrovi a sostenere una EIP controversa, dovresti cercare di affrontare le obiezioni per creare consenso attorno alla tua EIP. Date le dimensioni e la diversità della community di Ethereum, non esiste una singola metrica (es. un voto basato sui token) che possa essere utilizzata per valutare il consenso della community, e ci si aspetta che i sostenitori delle EIP si adattino alle circostanze della loro proposta.

Oltre alla sicurezza della rete Ethereum, storicamente gli sviluppatori del protocollo hanno attribuito un peso significativo a ciò che gli sviluppatori di applicazioni/strumenti e gli utenti delle applicazioni apprezzano, dato che il loro utilizzo e sviluppo su Ethereum è ciò che rende l'ecosistema attraente per gli altri stakeholder. Inoltre, le EIP devono essere implementate in tutte le implementazioni dei client, che sono gestite da team distinti. Parte di questo processo di solito significa convincere più team di sviluppatori del protocollo che una particolare modifica è preziosa e che aiuta gli utenti finali o risolve un problema di sicurezza.

<Divider />

## Gestire i disaccordi {#disagreements}

Avere molti stakeholder con motivazioni e convinzioni diverse significa che i disaccordi non sono rari.

In genere, i disaccordi vengono gestiti con lunghe discussioni nei forum pubblici per comprendere la radice del problema e consentire a chiunque di intervenire. In genere, un gruppo cede o si raggiunge un giusto compromesso. Se un gruppo è abbastanza convinto, forzare una particolare modifica potrebbe provocare una divisione della catena (chain split). Una divisione della catena si verifica quando alcuni stakeholder protestano contro l'implementazione di una modifica del protocollo, con il risultato che operano versioni diverse e incompatibili del protocollo, da cui emergono due blockchain distinte.

### Il fork della DAO {#dao-fork}

I fork si verificano quando è necessario apportare importanti aggiornamenti o modifiche tecniche alla rete e cambiare le "regole" del protocollo. I [client di Ethereum](/developers/docs/nodes-and-clients/) devono aggiornare il proprio software per implementare le nuove regole del fork.

Il fork della DAO è stato in risposta all'[attacco alla DAO del 2016](https://www.coindesk.com/learn/understanding-the-dao-attack), in cui un contratto [DAO](/glossary/#dao) non sicuro è stato prosciugato di oltre 3,6 milioni di ETH in un attacco informatico. Il fork ha spostato i fondi dal contratto difettoso a un nuovo contratto, consentendo a chiunque avesse perso fondi nell'attacco di recuperarli.

Questa linea d'azione è stata votata dalla community di Ethereum. Qualsiasi detentore di ETH ha potuto votare tramite una transazione su [una piattaforma di voto](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). La decisione di eseguire il fork ha raggiunto oltre l'85% dei voti.

È importante notare che, sebbene il protocollo abbia eseguito un fork per eseguire il revert dell'attacco, il peso che il voto ha avuto nella decisione di eseguire il fork è discutibile per alcuni motivi:

- L'affluenza al voto è stata incredibilmente bassa
- La maggior parte delle persone non sapeva che si stesse svolgendo la votazione
- Il voto rappresentava solo i detentori di ETH, non nessuno degli altri partecipanti al sistema

Un sottoinsieme della community si è rifiutato di eseguire il fork, in gran parte perché riteneva che l'incidente della DAO non fosse un difetto del protocollo. Hanno continuato a formare [Ethereum Classic](https://ethereumclassic.org/).

Oggi, la community di Ethereum ha adottato una politica di non intervento in caso di bug dei contratti o fondi persi per mantenere la neutralità credibile del sistema.

Guarda di più sull'attacco alla DAO:

<VideoWatch slug="dao-hack-ethereum-classic" />

<Divider />

### L'utilità del fork {#forking-utility}

Il fork Ethereum/Ethereum Classic è un eccellente esempio di un fork sano. Avevamo due gruppi che erano in forte disaccordo tra loro su alcuni valori fondamentali, tanto da ritenere che valesse la pena correre i rischi connessi per perseguire le loro specifiche linee d'azione.

La capacità di eseguire un fork di fronte a significative differenze politiche, filosofiche o economiche gioca un ruolo importante nel successo della governance di Ethereum. Senza la capacità di eseguire un fork, l'alternativa era una continua lotta intestina, una partecipazione forzata e riluttante per coloro che alla fine hanno formato Ethereum Classic e una visione sempre più divergente di come appare il successo per Ethereum.

<Divider />

## Governance della Beacon Chain {#beacon-chain}

Il processo di governance di Ethereum spesso scambia velocità ed efficienza con apertura e inclusività. Al fine di accelerare lo sviluppo della Beacon Chain, è stata lanciata separatamente dalla rete Ethereum basata sulla Prova di lavoro (PoW) e ha seguito le proprie pratiche di governance.

Sebbene le specifiche e le implementazioni di sviluppo siano sempre state completamente open source, i processi formali utilizzati per proporre gli aggiornamenti descritti sopra non sono stati utilizzati. Ciò ha consentito a ricercatori e implementatori di specificare e concordare le modifiche più rapidamente.

Quando la Beacon Chain si è unita al livello di esecuzione di Ethereum il 15 settembre 2022, The Merge è stato completato come parte dell'[aggiornamento della rete Paris](/ethereum-forks/#paris). La proposta [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) è passata da "Last Call" a "Final", completando la transizione alla Proof-of-Stake (PoS).

<ButtonLink href="/roadmap/merge/">
  Maggiori informazioni su The Merge
</ButtonLink>

<Divider />

## Come posso essere coinvolto? {#get-involved}

- [Proponi una EIP](/eips/#participate)
- [Discuti le proposte attuali](https://ethereum-magicians.org/)
- [Partecipa alle discussioni di R&S](https://ethresear.ch/)
- [Unisciti al Discord di R&S di Ethereum](https://discord.gg/mncqtgVSVw)
- [Gestisci un nodo](/developers/docs/nodes-and-clients/run-a-node/)
- [Contribuisci allo sviluppo dei client](/developers/docs/nodes-and-clients/#execution-clients)
- [Programma di apprendistato per Core Developer](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort)

## Letture consigliate {#further-reading}

La governance in Ethereum non è definita in modo rigido. Vari partecipanti alla community hanno prospettive diverse al riguardo. Eccone alcune:

- [Note sulla governance della blockchain](https://vitalik.eth.limo/general/2017/12/17/voting.html) - _Vitalik Buterin_
- [Come funziona la governance di Ethereum?](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [Come funziona la governance di Ethereum](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [Cos'è un core developer di Ethereum?](https://hudsonjameson.com/posts/2020-06-22-what-is-an-ethereum-core-developer/) - _Hudson Jameson_
- [Governance, Parte 2: La plutocrazia è ancora un male](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) - _Vitalik Buterin_
- [Andare oltre la governance basata sul voto con i token](https://vitalik.eth.limo/general/2021/08/16/voting3.html) - _Vitalik Buterin_
- [Comprendere la governance della blockchain](https://web.archive.org/web/20250124192731/https://research.2077.xyz/understanding-blockchain-governance) - _2077 Research_
- [Il governo di Ethereum](https://www.galaxy.com/insights/research/ethereum-governance/) - _Christine Kim_