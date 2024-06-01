---
title: Organizzazioni autonome decentralizzate (DAO)
description: Una panoramica delle DAO su Ethereum
lang: it
template: use-cases
emoji: ":handshake:"
sidebarDepth: 3
image: /use-cases/dao-2.png
alt: Rappresentazione di una votazione DAO su una proposta.
summaryPoint1: Community posseduta dai membri, prive di leadership centralizzata.
summaryPoint2: Un modo sicuro per collaborare con sconosciuti su Internet.
summaryPoint3: Un luogo sicuro per impegnare fondi in una causa specifica.
---

## Cosa sono le DAO? {#what-are-daos}

Una DAO è un'organizzazione posseduta collettivamente che opera per realizzare una missione condivisa.

Le DAO ci consentono di lavorare con persone con la stessa mentalità provenienti da tutto il mondo, senza doversi fidare di un capo benevolo, per la gestione di fondi od operazioni. Non esiste alcun CEO che possa spendere i fondi secondo i propri capricci, o CFO che possa manipolare i libri contabili. Invece, le regole basate sulla blockchain, integrate nel codice, definiscono il funzionamento dell'organizzazione e come vengono spesi i fondi.

Contengono delle tesoriere integrate, a cui nessuno ha l'autorità di accedere senza l'approvazione del gruppo. Le decisioni sono governate da proposte e votazioni, per assicurarsi che tutti nell'organizzazione abbiano voce in capitolo, e che tutto si verifichi in modo trasparente [sulla catena](/glossary/#on-chain).

## Perché abbiamo bisogno delle DAO? {#why-dao}

Per avviare un'organizzazione con altre persone quando sono in ballo finanziamenti e denaro occorre riporre molta fiducia nei propri compagni di avventura. Ma è difficile fidarsi di qualcuno con cui hai interagito solo tramite Internet. Con le DAO non occorre fidarsi di nessun altro nel gruppo, bensì solamente del codice DAO, che è al 100% trasparente e verificabile da chiunque.

Ciò apre molte opportunità di cooperazione e coordinamento a livello globale.

### Un confronto {#dao-comparison}

| DAO                                                                                                                         | Organizzazione tradizionale                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Di solito orizzontale e completamente democratizzata.                                                                       | Di solito gerarchica.                                                                                                         |
| Votazione richiesta dai membri per l'implementazione di eventuali modifiche.                                                | A seconda della struttura, le modifiche possono essere richieste da una sola parte oppure sottoposte a votazione.             |
| Conteggio dei voti e implementazione automatica del risultato senza intermediari.                                           | Se la votazione è consentita, i voti sono conteggiati internamente e l'esito della votazione deve essere gestito manualmente. |
| I servizi offerti vengono gestiti automaticamente in modo decentralizzato (ad esempio distribuzione di fondi filantropici). | Richiede manipolazione umana o automazione controllata centralmente, suscettibile di manipolazione.                           |
| Tutte le attività sono trasparenti e completamente pubbliche.                                                               | L'attività è tipicamente privata e limitata al pubblico.                                                                      |

### Esempi di DAO {#dao-examples}

Per aiutarti a comprendere meglio, ecco alcuni esempi di come potresti utilizzare una DAO:

- ** Un ente di beneficenza**: puoi accettare donazioni da chiunque nel mondo e votare in merito a quali cause finanziare.
- **Proprietà collettiva**: potresti acquistare beni fisici o digitali e i membri possono votare sul loro utilizzo.
- **Iniziative e sovvenzioni**: potresti creare un fondo di rischio che raggruppa il capitale di investimento e che vota sulle iniziative da finanziare. Il denaro rimborsato potrebbe essere successivamente ridistribuito tra i membri del DAO.

<iframe src="https://embed.ted.com/talks/lang/en/scott_fitsimones_could_a_dao_build_the_next_great_city" ></p>

<h2 id="how-daos-work" spaces-before="0">
  Come funziona la DAO?
</h2>

<p spaces-before="0">
  La struttura portante di una DAO è rappresentata dal suo <a href="/glossary/#smart-contract"> contratto intelligente</a>, che definisce le regole dell'organizzazione e detiene il patrimonio del gruppo. Una volta che il contratto è attivo su Ethereum, nessuno può modificare le regole se non tramite voto. Nessuno può fare qualcosa che non sia previsto dalle regole e dalla logica del codice. E poiché anche il patrimonio è definito dal contratto intelligente, ciò significa che nessuno può spendere il denaro senza l'approvazione del gruppo. Questo significa che le DAO non hanno bisogno di un'autorità centrale. Al contrario, il gruppo prende le decisioni collettivamente e i pagamenti sono autorizzati automaticamente quando le proposte sono approvate dal voto.
</p>

<p spaces-before="0">
  Ciò è possibile perché i contratti intelligenti sono a prova di manomissione, una volta che sono attivi su Ethereum. Non è possibile modificare il codice (le regole della DAO) senza che gli altri lo notino, perché tutto è pubblico.
</p>

<h2 id="ethereum-and-daos" spaces-before="0">
  Ethereum e DAO
</h2>

<p spaces-before="0">
  Ethereum è la base perfetta per le DAO per una serie di motivi:
</p>

<ul>
  <li>
    Il consenso di Ethereum è sufficientemente decentralizzato e affermato affinché le organizzazioni possano fidarsi della rete.
  </li>
  <li>
    Il codice del contratto intelligente non è modificabile una volta attivato, nemmeno dai suoi proprietari. Ciò permette alla DAO di funzionare secondo le regole con cui è stata programmata.
  </li>
  <li>
    I contratti intelligenti possono inviare/ricevere fondi. In caso contrario occorrerebbe un intermediario fidato per gestire i fondi del gruppo.
  </li>
  <li>
    La community di Ethereum si è dimostrata più collaborativa che competitiva, consentendo l'emergere rapido di migliori pratiche e sistemi di supporto.
  </li>
</ul>

<h2 id="dao-governance" spaces-before="0">
  Governance della DAO
</h2>

<p spaces-before="0">
  Ci sono molte considerazioni da fare governando una DAO, ad esempio, come funzionano le votazioni e le proposte.
</p>

<h3 id="governance-delegation" spaces-before="0">
  Delegazione
</h3>

<p spaces-before="0">
  Una delegazione è la versione della democrazia rappresentativa della DAO. I titolari di token delegano i voti agli utenti da loro stessi nominati e si impegnano a gestire il protocollo e a rimanere informati.
</p>

<h4 id="governance-example" spaces-before="0">
  Un celebre esempio
</h4>

<p spaces-before="0">
  <a href="https://claim.ens.domains/delegate-ranking">ENS</a> – I titolari di ENS possono delegare i propri voti a membri impegnati della community perché li rappresentino.
</p>

<h3 id="governance-example" spaces-before="0">
  Governance automatica delle transazioni
</h3>

<p spaces-before="0">
  In molte DAO, le transazioni saranno eseguite automaticamente se un quorum dei membri vota in modo affermativo.
</p>

<h4 id="governance-example" spaces-before="0">
  Un celebre esempio
</h4>

<p spaces-before="0">
  <a href="https://nouns.wtf">Nouns</a>: nelle DAO di Nouns, una transazione viene eseguita automaticamente se viene raggiunto un quorum di voti e la maggioranza di questi è a favore, purché non ci sia un veto da parte dei fondatori.
</p>

<h3 id="governance-example" spaces-before="0">
  Governance multifirma
</h3>

<p spaces-before="0">
  Mentre le DAO potrebbero includere migliaia di membri votanti, i fondi possono esistere in un <a href="/glossary/#wallet">portafoglio</a> condiviso da 5-20 membri attivi della community ritenuti affidabili e solitamente doxati (identità pubbliche note alla community). In seguito a un voto, i firmatari <a href="/glossary/#multisig">multifirma</a> eseguono la volontà della community.
</p>

<h2 id="dao-laws" spaces-before="0">
  Leggi sulle DAO
</h2>

<p spaces-before="0">
  Nel 1977, il Wyoming inventò la LLC, che protegge gli imprenditori e ne limita le responsabilità. Più di recente, lo Stato è stato il pioniere della legge sulle DAO, che stabilisce lo status giuridico delle DAO. Al momento, Wyoming, Vermont e le Isole Vergini hanno una qualche forma di legge sulle DAO.
</p>

<h3 id="law-example" spaces-before="0">
  Un celebre esempio
</h3>

<p spaces-before="0">
  <a href="https://citydao.io">CityDAO</a> – CityDao ha utilizzato la legge sulle DAO del Wyoming per acquistare 40 acri di terreno nei pressi del Parco Nazionale di Yellowstone.
</p>

<h2 id="dao-membership" spaces-before="0">
  Aderire a una DAO
</h2>

<p spaces-before="0">
  Ci sono diversi modelli per aderire a una DAO. L'adesione può determinare come funziona il voto e altri aspetti chiave della DAO.
</p>

<h3 id="token-based-membership" spaces-before="0">
  Appartenenza basata su token
</h3>

<p spaces-before="0">
  In genere è completamente <a href="/glossary/#permissionless">senza permessi</a>, a seconda del token utilizzato. Questi token di governance possono essere per lo più scambiati senza permessi su una <a href="/glossary/#dex">borsa decentralizzata</a>. Altri, invece, devono esser guadagnati fornendo liquidità o altri tipi di "Proof of Work". In entrambi i casi, la semplice detenzione del token garantisce l'accesso al voto.
</p>

<p spaces-before="0">
  <em x-id="4">Di solito usato per governare ampi protocolli decentralizzati e/o i token stessi.</em>
</p>

<h4 id="token-example" spaces-before="0">
  Un celebre esempio
</h4>

<p spaces-before="0">
  <a href="https://makerdao.com">MakerDAO</a> – Il token MKR di MakerDAO è ampiamente disponibile sulle borse decentralizzate e chiunque può acquistare il potere di voto sul futuro del protocollo di Maker.
</p>

<h3 id="share-based-membership" spaces-before="0">
  Appartenenza basata su quote
</h3>

<p spaces-before="0">
  I DAO basati su quote sono maggiormente soggetti a permessi, ma comunque abbastanza aperti. Tutti i potenziali membri possono inviare una proposta di adesione alla DAO, solitamente offrendo un tributo di qualche valore sotto forma di token o di lavoro. Le quote rappresentano il potere di voto diretto e la proprietà. I membri possono uscire in qualsiasi momento con la propria quota proporzionale del patrimonio.
</p>

<p spaces-before="0">
  <em x-id="4">In genere usato per organizzazioni più compatte e incentrate sul fattore umano, come enti di beneficenza, collettivi di lavoratori e club di investimento. Può anche governare protocolli e token.</em>
</p>

<h4 id="share-example" spaces-before="0">
  Un celebre esempio
</h4>

<p spaces-before="0">
  <a href="http://molochdao.com/">MolochDAO</a>: MolochDAO si concentra sul finanziamento dei progetti su Ethereum. Richiede una proposta di adesione in modo che il gruppo possa valutare se il richiedente ha la competenza e il capitale necessari per formulare giudizi informati sui potenziali beneficiari. Non si può semplicemente acquistare l'accesso al DAO sul mercato.
</p>

<h3 id="reputation-based-membership" spaces-before="0">
  Appartenenza basata sulla reputazione
</h3>

<p spaces-before="0">
  La reputazione rappresenta la prova di partecipazione e conferisce potere di voto nella DAO. A differenza dell'adesione basata sui token o sulle quote, le DAO basate sulla reputazione non trasferiscono la proprietà ai collaboratori. La reputazione non può esser comprata, trasferita o delegata; i membri della DAO devono ottenere la reputazione tramite la loro partecipazione. Il voto sulla blockchain è privo di permessi e i potenziali membri possono inviare liberamente proposte per aderire alla DAO e richiedere di ricevere reputazione e token come ricompensa in cambio dei loro contributi.
</p>

<p spaces-before="0">
  <em x-id="4">Sono tipicamente utilizzate per lo sviluppo e governance decentralizzati di protocolli e <a href="/glossary/#dapp">dapp</a>, ma si adattano bene anche ad una vasta gamma di organizzazioni, quali enti di beneficenza, collettivi di lavoratori, club di investimento, ecc.</em>
</p>

<h4 id="reputation-example" spaces-before="0">
  Un celebre esempio
</h4>

<p spaces-before="0">
  <a href="https://DXdao.eth.limo">DXdao</a>: DXdao è un collettivo sovrano globale che dal 2019 crea e amministra protocolli e applicazioni decentralizzati. Ha sfruttato la governance basata sulla reputazione e il <a href="/glossary/#holographic-consensus">consenso olografico</a> per coordinare e gestire i fondi, il che significa che nessuno poteva farsi strada per influenzarne il futuro o la governance.
</p>

<h2 id="join-start-a-dao" spaces-before="0">
  Aderisci a / Crea una DAO
</h2>

<h3 id="join-a-dao" spaces-before="0">
  Entra a far parte di una DAO
</h3>

<ul>
  <li>
    <a href="/community/get-involved/#decentralized-autonomous-organizations-daos">Community di Ethereum</a>
  </li>
  <li>
    <a href="https://app.daohaus.club/explore">Lista delle DAO di DAOHaus</a>
  </li>
  <li>
    <a href="https://www.tally.xyz">Elenco di DAO di Tally.xyz</a>
  </li>
</ul>

<h3 id="start-a-dao" spaces-before="0">
  Crea una DAO
</h3>

<ul>
  <li>
    <a href="https://app.daohaus.club/summon">Evoca una DAO con DAOHaus</a>
  </li>
  <li>
    <a href="https://www.tally.xyz/add-a-dao">Crea una DAO di Governance con Tally</a>
  </li>
  <li>
    <a href="https://aragon.org/product">Crea una DAO basata su Aragon</a>
  </li>
  <li>
    <a href="https://colony.io/">Avvia una colonia</a>
  </li>
  <li>
    <a href="https://alchemy.daostack.io/daos/create">Crea una DAO con il consenso olografico di DAOstack</a>
  </li>
</ul>

<h2 id="further-reading" spaces-before="0">
  Letture consigliate
</h2>

<h3 id="dao-articles" spaces-before="0">
  Articoli sulle DAO
</h3>

<ul>
  <li>
    <a href="https://aragon.org/dao">Che cos'è una DAO?</a> – <a href="https://aragon.org/">Aragon</a>
  </li>
  <li>
    <a href="https://wiki.metagame.wtf/docs/great-houses/house-of-daos">La casa delle DAO</a> – <a href="https://wiki.metagame.wtf/">Metagame</a>
  </li>
  <li>
    <a href="https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for">Che cos'è una DAO e a cosa serve?</a> – <a href="https://daohaus.club/">DAOhaus</a>
  </li>
  <li>
    <a href="https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a">Come avviare una comunità digitale basata su DAO</a> – <a href="https://daohaus.club/">DAOhaus</a>
  </li>
  <li>
    <a href="https://coinmarketcap.com/alexandria/article/what-is-a-dao">Che cos'è una DAO?</a> – <a href="https://coinmarketcap.com">Coinmarketcap</a>
  </li>
  <li>
    <a href="https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c">Cos'è il consenso olografico?</a> - <a href="https://daostack.io/">DAOstack</a>
  </li>
  <li>
    <a href="https://vitalik.eth.limo/general/2022/09/20/daos.html">Le DAO non sono società: dove è importante la decentralizzazione nelle organizzazioni autonome, di Vitalik</a>
  </li>
  <li>
    <a href="https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide">DAO, DAC, DA e altro: una guida incompleta alla terminologia</a> - <a href="https://blog.ethereum.org">Blog di Ethereum</a>
  </li>
</ul>

<h3 id="videos" spaces-before="0">
  Video
</h3>

<ul>
  <li>
    <a href="https://youtu.be/KHm0uUPqmVE">Che cos'è una DAO nel mondo delle criptovalute?</a>
  </li>
  <li>
    <a href="https://www.ted.com/talks/scott_fitsimones_could_a_dao_build_the_next_great_city">Può una DAO costruire una città?</a> – <a href="https://www.ted.com/">TED</a>
  </li>
</ul>
