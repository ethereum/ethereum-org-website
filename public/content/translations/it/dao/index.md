---
title: "Cos'è una DAO?"
metaTitle: "Cos'è una DAO? | Organizzazione Autonoma Decentralizzata"
description: Una panoramica sulle DAO su Ethereum
lang: it
template: use-cases
sidebarDepth: 2
image: /images/use-cases/dao-2.png
alt: Una rappresentazione di una DAO che vota una proposta.
summaryPoints:
  - "Comunità di proprietà dei membri senza una leadership centralizzata."
  - "Un modo sicuro per collaborare con sconosciuti su internet."
  - "Un luogo sicuro in cui impegnare fondi per una causa specifica."
---

## Cosa sono le DAO? {#what-are-daos}

Una DAO è un'organizzazione di proprietà collettiva che lavora per una missione condivisa.

Le DAO ci consentono di lavorare con persone affini in tutto il mondo senza doverci fidare di un leader benevolo per la gestione dei fondi o delle operazioni. Non c'è un CEO che possa spendere i fondi per un capriccio o un CFO che possa manipolare i libri contabili. Invece, regole basate sulla blockchain e integrate nel codice definiscono il funzionamento dell'organizzazione e come vengono spesi i fondi.

Hanno tesorerie integrate a cui nessuno ha l'autorità di accedere senza l'approvazione del gruppo. Le decisioni sono governate da proposte e votazioni per garantire che tutti nell'organizzazione abbiano voce in capitolo, e tutto avviene in modo trasparente [onchain](/glossary/#onchain).

## Perché abbiamo bisogno delle DAO? {#why-dao}

Avviare un'organizzazione con qualcuno che coinvolge finanziamenti e denaro richiede molta fiducia nelle persone con cui si lavora. Ma è difficile fidarsi di qualcuno con cui si è interagito solo su internet. Con le DAO non è necessario fidarsi di nessun altro nel gruppo, ma solo del codice della DAO, che è trasparente al 100% e verificabile da chiunque.

Questo apre tantissime nuove opportunità per la collaborazione e il coordinamento a livello globale.

### Un confronto {#dao-comparison}

| DAO                                                                                                                     | Un'organizzazione tradizionale                                                                       |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Solitamente orizzontale e completamente democratizzata.                                                                                   | Solitamente gerarchica.                                                                            |
| È richiesto il voto dei membri per implementare qualsiasi modifica.                                                           | A seconda della struttura, le modifiche possono essere richieste da una singola parte, oppure può essere offerta una votazione.     |
| I voti vengono conteggiati e il risultato viene implementato automaticamente senza un intermediario fidato.                                      | Se la votazione è consentita, i voti vengono conteggiati internamente e il risultato della votazione deve essere gestito manualmente. |
| I servizi offerti sono gestiti automaticamente in modo decentralizzato (ad esempio la distribuzione di fondi filantropici). | Richiede la gestione umana, o un'automazione controllata centralmente, soggetta a manipolazione.              |
| Tutte le attività sono trasparenti e completamente pubbliche.                                                                           | Le attività sono tipicamente private e limitate al pubblico.                                        |

### Esempi di DAO {#dao-examples}

Per rendere il concetto più chiaro, ecco alcuni esempi di come potresti utilizzare una DAO:

- **Un ente di beneficenza** – potresti accettare donazioni da chiunque nel mondo e votare su quali cause finanziare.
- **Proprietà collettiva** – potresti acquistare asset fisici o digitali e i membri possono votare su come utilizzarli.
- **Iniziative e sovvenzioni** – potresti creare un fondo di venture capital che raccoglie capitale di investimento e vota sulle iniziative da sostenere. Il denaro rimborsato potrebbe poi essere ridistribuito tra i membri della DAO.

<VideoWatch slug="dao-build-next-great-city" />

## Come funzionano le DAO? {#how-daos-work}

La spina dorsale di una DAO è il suo [smart contract](/glossary/#smart-contract), che definisce le regole dell'organizzazione e detiene la tesoreria del gruppo. Una volta che il contratto è attivo su [Ethereum](/), nessuno può cambiare le regole se non tramite un voto. Se qualcuno cerca di fare qualcosa che non è coperto dalle regole e dalla logica nel codice, fallirà. E poiché anche la tesoreria è definita dallo smart contract, ciò significa che nessuno può spendere il denaro senza l'approvazione del gruppo. Questo significa che le DAO non hanno bisogno di un'autorità centrale. Invece, il gruppo prende decisioni collettivamente e i pagamenti vengono autorizzati automaticamente quando i voti passano.

Questo è possibile perché gli smart contract sono a prova di manomissione una volta attivi su Ethereum. Non puoi semplicemente modificare il codice (le regole della DAO) senza che le persone se ne accorgano, perché tutto è pubblico.

## Ethereum e le DAO {#ethereum-and-daos}

Ethereum è la base perfetta per le DAO per una serie di motivi:

- Il consenso stesso di Ethereum è decentralizzato e sufficientemente consolidato affinché le organizzazioni si fidino della rete.
- Il codice dello smart contract non può essere modificato una volta attivo, nemmeno dai suoi proprietari. Questo consente alla DAO di funzionare secondo le regole con cui è stata programmata.
- Gli smart contract possono inviare/ricevere fondi. Senza questo, avresti bisogno di un intermediario fidato per gestire i fondi del gruppo.
- La comunità di Ethereum ha dimostrato di essere più collaborativa che competitiva, consentendo l'emergere rapido di best practice e sistemi di supporto.

## Governance delle DAO {#dao-governance}

Ci sono molte considerazioni da fare quando si governa una DAO, come ad esempio il funzionamento del voto e delle proposte.

### Delega {#governance-delegation}

La delega è come la versione DAO della democrazia rappresentativa. I detentori di token delegano i voti agli utenti che si candidano e si impegnano a gestire il protocollo e a rimanere informati.

#### Un esempio famoso {#governance-example}

[ENS](https://claim.ens.domains/delegate-ranking) – I detentori di ENS possono delegare i propri voti a membri attivi della comunità affinché li rappresentino.

### Governance automatica delle transazioni {#governance-example-2}

In molte DAO, le transazioni verranno eseguite automaticamente se un quorum di membri vota a favore.

#### Un esempio famoso {#governance-example-3}

[Nouns](https://nouns.wtf) – Nella Nouns DAO, una transazione viene eseguita automaticamente se viene raggiunto un quorum di voti e la maggioranza vota a favore, a condizione che non venga posta la veto dai fondatori.

### Governance multisig {#governance-example-4}

Sebbene le DAO possano avere migliaia di membri votanti, i fondi possono risiedere in un [portafoglio](/glossary/#wallet) condiviso da 5-20 membri attivi della comunità che sono fidati e solitamente "doxxati" (identità pubbliche note alla comunità). Dopo un voto, i firmatari del [multisig](/glossary/#multisig) eseguono la volontà della comunità.

## Leggi sulle DAO {#dao-laws}

Nel 1977, il Wyoming ha inventato la LLC (società a responsabilità limitata), che protegge gli imprenditori e limita la loro responsabilità. Più di recente, ha fatto da pioniere per la legge sulle DAO che stabilisce lo status legale per le DAO. Attualmente Wyoming, Vermont e le Isole Vergini hanno leggi sulle DAO in qualche forma.

### Un esempio famoso {#law-example}

[CityDAO](https://citizen.citydao.io/) – CityDAO ha utilizzato la legge sulle DAO del Wyoming per acquistare 40 acri di terreno vicino al Parco Nazionale di Yellowstone.

## Appartenenza a una DAO {#dao-membership}

Esistono diversi modelli per l'appartenenza a una DAO. L'appartenenza può determinare come funziona il voto e altre parti chiave della DAO.

### Appartenenza basata su token {#token-based-membership}

Solitamente completamente [permissionless](/glossary/#permissionless), a seconda del token utilizzato. Per lo più questi token di governance possono essere scambiati in modo permissionless su un [exchange decentralizzato](/glossary/#dex). Altri devono essere guadagnati fornendo liquidità o qualche altra "Prova di lavoro (PoW)". In ogni caso, il semplice possesso del token garantisce l'accesso al voto.

_Tipicamente utilizzata per governare ampi protocolli decentralizzati e/o i token stessi._

#### Un esempio famoso {#token-example}

[MakerDAO](https://makerdao.com) – Il token MKR di MakerDAO è ampiamente disponibile sugli exchange decentralizzati e chiunque può acquistarlo per avere potere di voto sul futuro del protocollo Maker.

### Appartenenza basata su quote {#share-based-membership}

Le DAO basate su quote sono più autorizzate, ma comunque piuttosto aperte. Qualsiasi potenziale membro può presentare una proposta per unirsi alla DAO, solitamente offrendo un tributo di un certo valore sotto forma di token o lavoro. Le quote rappresentano il potere di voto diretto e la proprietà. I membri possono uscire in qualsiasi momento con la loro quota proporzionale della tesoreria.

_Tipicamente utilizzata per organizzazioni più unite e incentrate sull'uomo, come enti di beneficenza, collettivi di lavoratori e club di investimento. Può anche governare protocolli e token._

### Appartenenza basata sulla reputazione {#reputation-based-membership}

La reputazione rappresenta la prova di partecipazione e garantisce potere di voto nella DAO. A differenza dell'appartenenza basata su token o quote, le DAO basate sulla reputazione non trasferiscono la proprietà ai contributori. La reputazione non può essere acquistata, trasferita o delegata; i membri della DAO devono guadagnare reputazione attraverso la partecipazione. Il voto onchain è permissionless e i potenziali membri possono presentare liberamente proposte per unirsi alla DAO e richiedere di ricevere reputazione e token come ricompensa in cambio dei loro contributi.

_Tipicamente utilizzata per lo sviluppo decentralizzato e la governance di protocolli e [applicazioni decentralizzate (dapp)](/glossary/#dapp), ma anche ben adatta a un insieme diversificato di organizzazioni come enti di beneficenza, collettivi di lavoratori, club di investimento, ecc._

#### Un esempio famoso {#reputation-example}

[DXdao](https://DXdao.eth.limo) – DXdao è stato un collettivo sovrano globale che ha costruito e governato protocolli e applicazioni decentralizzate dal 2019. Ha sfruttato la governance basata sulla reputazione e il [consenso olografico](/glossary/#holographic-consensus) per coordinare e gestire i fondi, il che significa che nessuno poteva comprare la propria influenza sul suo futuro o sulla sua governance.

## Unisciti / avvia una DAO {#join-start-a-dao}

### Unisciti a una DAO {#join-a-dao}

- [DAO della comunità di Ethereum](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [Elenco di DAO di DAOHaus](https://app.daohaus.club/explore)
- [Elenco di DAO di Tally.xyz](https://www.tally.xyz/explore)
- [Elenco di DAO di DeGov.AI](https://apps.degov.ai/)

### Avvia una DAO
- [Crea una DAO con DAOHaus](https://app.daohaus.club/summon)
- [Avvia una DAO Governor con Tally](https://www.tally.xyz/get-started)
- [Crea una DAO basata su Aragon](https://aragon.org/product)
- [Avvia una colony](https://colony.io/)
- [Lancia una DAO con il DeGov Launcher](https://docs.degov.ai/integration/deploy)
## Letture di approfondimento {#further-reading}

### Articoli sulle DAO {#dao-articles}

- [Cos'è una DAO?](https://blog.aragon.org/what-is-a-dao/) – [Aragon](https://aragon.org/)
- [La casa delle DAO](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) – [Metagame](https://wiki.metagame.wtf/)
- [Cos'è una DAO e a cosa serve?](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for) – [DAOhaus](https://daohaus.club/)
- [Come avviare una comunità digitale basata su DAO](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) – [DAOhaus](https://daohaus.club/)
- [Cos'è una DAO?](https://coinmarketcap.com/alexandria/article/what-is-a-dao) – [Coinmarketcap](https://coinmarketcap.com)
- [Cos'è il consenso olografico?](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c) - [DAOstack](https://daostack.io/)
- [Le DAO non sono corporazioni: dove conta la decentralizzazione nelle organizzazioni autonome, di Vitalik](https://vitalik.eth.limo/general/2022/09/20/daos.html)
- [DAO, DAC, DA e altro: una guida terminologica incompleta](https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide) - [Blog di Ethereum](https://blog.ethereum.org)

### Video {#videos}

- [Cos'è una DAO nel mondo cripto?](https://youtu.be/KHm0uUPqmVE)
- [Può una DAO costruire una città?](https://www.ted.com/talks/scott_fitsimones_could_a_dao_build_the_next_great_city) – [TED](https://www.ted.com/)

<Divider />

<QuizWidget quizKey="daos" />
