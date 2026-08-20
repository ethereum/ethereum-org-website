---
title: Staking liquido e in pool
description: Una panoramica dello staking liquido e in pool su Ethereum
lang: it
template: staking
image: /images/staking/leslie-pool.png
sidebarDepth: 2
summaryPoints:
  - Metti in staking e ottieni ricompense con qualsiasi importo di ETH unendo le forze con altri
  - Salta la parte difficile e affida l'operatività del validatore a una terza parte
  - Conserva i token di liquid staking nel tuo portafoglio
---

## Cosa sono le pool di staking? {#what-are-staking-pools}

Le pool di staking sono un approccio collaborativo per consentire a molte persone con importi minori di ETH di ottenere il minimo di 32 ETH richiesto per attivare un validatore su [Ethereum](/). La funzionalità di pooling non è supportata nativamente all'interno del protocollo, quindi sono state sviluppate soluzioni separate per soddisfare la necessità di partecipare con importi inferiori.

Alcune pool di staking operano utilizzando smart contract, in cui i fondi vengono depositati in un contratto che gestisce e traccia il tuo stake, e ti emette un token di ricevuta (token di liquid staking) che rappresenta questo valore. Altre pool potrebbero non coinvolgere smart contract e sono invece mediate offchain.

Le opzioni in pool differiscono enormemente in base a quanto puoi verificare su di esse. Le pool trasparenti e governate dal protocollo sono smart contract open-source su Ethereum che detengono i depositi, pubblicano i loro set di operatori di nodi ed emettono un token riscattabile; tutto ciò che supporta la tua posizione è visibile onchain. I prodotti in pool opachi, come alcuni programmi di rendimento degli exchange centralizzati, prendono in custodia i tuoi ETH e non puoi verificare in modo indipendente cosa viene messo in staking per tuo conto, se non del tutto. La maggior parte di questa pagina tratta il primo tipo; vedi i [prodotti in pool opachi](#opaque-pooled-products) per capire la differenza.

Ogni opzione in pool risolve il reale problema di accesso allo staking con meno di 32 ETH, o senza eseguire hardware. Ma ognuna pone anche un intermediario tra lo staker e il protocollo principale di Ethereum. Solo il [solo staking](/staking/solo/) ti offre una relazione diretta e non mediata con Ethereum.

## Perché fare staking con una pool? {#why-stake-with-a-pool}

Oltre ai vantaggi di [partecipare allo staking](/staking/), lo staking con una pool offre una serie di vantaggi unici.

<Grid>
  <Card title="Low barrier to entry" icon={<Fish />} description="Non sei una balena? Nessun problema. La maggior parte delle pool di staking ti consente di mettere in staking virtualmente qualsiasi importo di ETH unendo le forze con altri staker, a differenza del solo staking che richiede 32 ETH." />
  <Card title="Stake today" icon={<Clock />} description="Lo staking con una pool è facile come uno swap di token. Non c'è bisogno di preoccuparsi della configurazione dell'hardware e della manutenzione del nodo. Le pool ti consentono di depositare i tuoi ETH, il che permette agli operatori dei nodi di eseguire i validatori. Le ricompense vengono poi distribuite ai contributori al netto di una commissione per le operazioni del nodo." />
  <Card title="Liquid staking tokens" icon={<Droplets />} description="Molte pool di staking forniscono un token che rappresenta un diritto di riscatto sui tuoi ETH messi in staking e sulle ricompense che generano. Questo ti consente di utilizzare i tuoi ETH messi in staking, ad esempio, come collaterale nelle applicazioni della DeFi." />
</Grid>

## Confronto delle opzioni di staking {#comparison-of-staking-options}

<StakingComparison page="pools" />

## Token di liquid staking {#liquid-staking-tokens}

La maggior parte delle pool di staking trasparenti emette un **token di liquid staking (LST)**, un token ERC-20 che rappresenta un diritto di riscatto sugli ETH messi in staking e sulle ricompense che ottiene. Quando depositi ETH, il protocollo li mette in staking con i suoi operatori di nodi e conia un token di ricevuta (LST) nel tuo portafoglio. Puoi conservare il token tu stesso o affidarlo in custodia a un fornitore di terze parti, e puoi trasferire o vendere il token in qualsiasi momento. Gli ETH sottostanti rimangono in staking sul livello di consenso. I protocolli di staking liquido rappresentano circa un terzo di tutti gli ETH messi in staking, rendendo gli LST uno dei modi più comuni per fare staking oggi.

### Come vengono mostrate le ricompense nel token {#how-rewards-show-up-in-the-token}

Gli LST riflettono le ricompense di staking in uno dei due modi seguenti:

- **Token di rebasing** (come stETH di Lido): il saldo del tuo token aumenta man mano che si accumulano le ricompense, quindi un token rimane all'incirca uguale in valore a un ETH.
- **Token a tasso di cambio** (come rETH di Rocket Pool): il saldo del tuo token rimane lo stesso, ma ogni token diventa riscattabile per una quantità crescente di ETH nel tempo.

Entrambi i design offrono ricompense al netto della commissione del protocollo di staking. Nessuno dei due è intrinsecamente migliore, ma si comportano in modo diverso nei portafogli e nelle applicazioni della DeFi, e sono trattati diversamente a fini fiscali in alcune giurisdizioni. I token di rebasing hanno spesso versioni "wrapped" (avvolte) non di rebasing per la compatibilità con le applicazioni della [finanza decentralizzata (DeFi)](/glossary/#defi).

### Riscatto e trading {#redeeming-and-trading}

Ci sono due modi per uscire da una posizione LST:

- **Riscattare tramite il protocollo** per gli ETH sottostanti. Il riscatto dipende dalla disponibilità di liquidità del protocollo, che si tratti di un buffer di ETH non in staking o di validatori in uscita attraverso la coda di uscita del livello di consenso, il che può richiedere tempo.
- **Vendere sui mercati secondari** in qualsiasi momento. Poiché il token viene scambiato liberamente, il suo prezzo di mercato può deviare dal valore degli ETH che lo supportano, in particolare durante i periodi di stress del mercato.

Dall'aggiornamento Pectra, i [prelievi attivati dal livello di esecuzione (EIP-7002)](https://eips.ethereum.org/EIPS/eip-7002) consentono di attivare le uscite dei validatori direttamente dal livello di esecuzione da parte del titolare dell'indirizzo di prelievo. I protocolli di staking possono utilizzare questa funzionalità per garantire che i loro validatori possano uscire senza fare affidamento sulla cooperazione degli operatori dei nodi, quindi i riscatti dipendono meno dalla fiducia negli operatori dei nodi rispetto al passato.

### Detenere un LST non è la stessa cosa che fare staking {#holding-an-lst-is-not-the-same-as-staking}

Il protocollo Ethereum paga le ricompense ai validatori; non sa che il tuo token esiste. Quando detieni un LST, non sei uno staker dal punto di vista del protocollo. Invece, detieni un diritto di riscatto su un servizio o uno smart contract che fa staking per tuo conto. Questo funziona bene in condizioni normali, ma comporta ulteriori dipendenze di fiducia. I tuoi ETH messi in staking dipendono dal corretto funzionamento dei contratti, della governance e degli operatori della pool, non solo da Ethereum stesso.

## Rischi dei token di liquid staking {#risks-of-liquid-staking-tokens}

Gli LST ereditano i rischi sottostanti dello staking (come lo slashing e le penalità per inattività sui validatori della pool) e aggiungono i propri livelli:

- **Rischio degli smart contract** - i tuoi ETH sono detenuti da contratti che potrebbero contenere bug o essere sfruttati. Prediligi protocolli con codice open-source, verificato e collaudato.
- **Rischio di mercato e di liquidità** - il prezzo sul mercato secondario del token può scendere al di sotto del valore degli ETH che lo supportano ("depegging"). Se i riscatti del protocollo sono lenti o congestionati quando vuoi uscire, vendere a sconto potrebbe essere la tua unica via d'uscita rapida.
- **Rischio di governance e aggiornamento** - le commissioni, i set di operatori dei nodi e persino il funzionamento del token possono essere modificati attraverso la governance del protocollo e gli aggiornamenti dei contratti. Come detentore di token, in genere non hai diritto di voto in tale governance.
- **Centralizzazione del set di operatori** - alcune pool concentrano lo stake con i loro operatori di nodi scelti. Grandi quantità di ETH messi in staking sotto il controllo di poche organizzazioni creano le condizioni per la censura, l'estrazione di valore e singoli punti di guasto. Preferisci le pool con set di operatori distribuiti e permissionless.
- **Trasmissione dello slashing** - se i validatori della pool subiscono lo slashing o vengono penalizzati, la perdita viene in genere socializzata tra tutti i detentori di token secondo le regole del protocollo.

<Alert variant="update">
<AlertIcon size="xl"><Split /></AlertIcon>
<AlertContent>
<AlertDescription>
Molte pool riducono il rischio dell'operatore utilizzando la **tecnologia dei validatori distribuiti (DVT)**, un middleware che divide la chiave di un validatore su più macchine e operatori in modo che nessun singolo guasto o compromissione metta fuori uso il validatore. [Maggiori informazioni sulla tecnologia dei validatori distribuiti](/staking/dvt/)
</AlertDescription>
</AlertContent>
</Alert>

## Prodotti in pool opachi {#opaque-pooled-products}

Non tutto ciò che viene commercializzato come "staking" è staking del protocollo. I programmi "earn" o "rewards" degli exchange centralizzati e alcuni prodotti di rendimento basati sui token di staking, raggruppano gli ETH dei clienti in modi che non puoi ispezionare:

- **Custodial** - il fornitore detiene le chiavi di prelievo e gli ETH.
- **I termini possono cambiare** - i tassi, i blocchi e l'idoneità sono stabiliti dalla politica aziendale e possono essere rivisti in qualsiasi momento, a differenza delle regole applicate dai contratti onchain.
- **Potrebbe non essere affatto staking** - internamente, il rendimento potrebbe derivare da prestiti, trading o altre attività piuttosto che dai validatori. Di solito non hai modo di verificarlo.
- **Rischio di controparte** - se il fornitore diventa insolvente o congela i prelievi, non c'è nulla onchain che tu possa riscattare.

Per distinguere una pool trasparente da un prodotto opaco, chiediti:

1. Puoi verificare onchain dove vanno a finire i tuoi ETH, in contratti open-source e verificati?
2. Il set di operatori dei nodi è pubblicato?
3. Ricevi un token conservato nel tuo portafoglio che è riscattabile per gli ETH sottostanti?
4. Le regole sono applicate da smart contract e governance pubblica, o dai termini di servizio di un'azienda?

Più a queste domande un fornitore può rispondere solo con "fidati di noi", più il prodotto è opaco.

<Alert variant="warning">
<AlertIcon size="lg"><TriangleAlert /></AlertIcon>
<AlertContent>
<AlertDescription>
Alcuni prodotti pubblicizzano un rendimento "migliorato" o "potenziato" combinando lo staking con il **restaking**, un caso d'uso per gli LST che impegna gli ETH messi in staking per proteggere protocolli aggiuntivi in condizioni di slashing aggiuntive. Il restaking è una categoria di rischio separata e una nuova applicazione costruita sugli LST, non una forma di partecipazione diretta allo staking. Se una cifra di rendimento è significativamente superiore al tasso di staking della rete principale, dovresti chiederti esattamente da dove provenga il rendimento extra. [Cos'è il restaking?](/restaking/)
</AlertDescription>
</AlertContent>
</Alert>

## Eseguire un nodo per una pool {#run-a-node-for-a-pool}

Diventare un operatore di nodo vincolato per una pool di staking è una via di mezzo tra detenere un token e il solo staking. Alcuni protocolli di staking consentono agli individui di eseguire validatori utilizzando gli ETH in pool di altri utenti. Depositi un vincolo dei tuoi ETH come collaterale, gestisci l'hardware e le chiavi e guadagni una commissione sullo stake che ti viene abbinato.

Ad esempio, i validatori megapool di Rocket Pool richiedono un vincolo di 4 ETH per validatore, e il Community Staking Module di Lido richiede circa 2,4 ETH per una prima chiave del validatore (1,5 ETH per gli Identified Community Stakers). Questo offre alle persone con meno di 32 ETH un modo per eseguire il proprio hardware e rafforzare il set di operatori della rete, accettando al contempo le regole, i requisiti di prestazione e le condizioni di penalità della pool.

## Cosa considerare {#what-to-consider}

Ogni pool e gli strumenti o gli smart contract che utilizzano sono stati sviluppati da team diversi, e ognuno presenta vantaggi e rischi. Lo staking in pool o delegato non è supportato nativamente dal protocollo Ethereum, e lo standard di riferimento per lo staking dovrebbe sempre essere costituito da individui che eseguono validatori sul proprio hardware, ove possibile.

Gli indicatori di attributo sono utilizzati di seguito per segnalare i punti di forza o di debolezza degni di nota che una pool di staking elencata potrebbe avere. Usa questa sezione come riferimento per capire come definiamo questi attributi mentre scegli a quale pool unirti.

<StakingConsiderations page="pools" />

## Esplora le pool di staking {#explore-staking-pools}

Ci sono diverse opzioni disponibili per aiutarti con la tua configurazione. Usa gli indicatori sopra per guidarti attraverso gli strumenti sottostanti.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Tieni presente l'importanza di scegliere un servizio che prenda sul serio la [diversità dei client](/developers/docs/nodes-and-clients/client-diversity/), poiché migliora la sicurezza della rete e limita i tuoi rischi. I servizi che hanno prove di limitare l'uso dei client di maggioranza sono indicati con <em style={{ textTransform: "uppercase" }}>"diversità dei client di esecuzione"</em> e <em style={{ textTransform: "uppercase" }}>"diversità dei client di consenso".</em>

Hai un suggerimento per uno strumento di staking che ci è sfuggito? Dai un'occhiata alla nostra [politica di inserimento dei prodotti](/contributing/adding-staking-products/) per vedere se sarebbe adatto e per inviarlo per la revisione.

<StakingCommunityCallout className="my-16" />

## Domande frequenti {#faq}

<ExpandableCard title="Come guadagno le ricompense?">
In genere, i token di liquid staking ERC-20 vengono emessi agli staker e rappresentano il valore dei loro ETH messi in staking più le ricompense. Le ricompense ti raggiungono in uno dei due modi a seconda del design del token: i token di rebasing aumentano il saldo del tuo token man mano che si accumulano le ricompense, mentre i token a tasso di cambio mantengono fisso il tuo saldo e diventano riscattabili per più ETH nel tempo. In entrambi i casi, le ricompense vengono distribuite al netto della commissione della pool.
</ExpandableCard>

<ExpandableCard title="Quando posso prelevare il mio stake?">
I prelievi di staking sono stati abilitati dall'aggiornamento Shanghai/Capella nell'aprile 2023. Gli account dei validatori che supportano le pool di staking possono uscire e prelevare ETH al loro indirizzo di prelievo designato, il che ti consente di riscattare la tua porzione di stake per gli ETH sottostanti. La velocità di riscatto dipende dalla liquidità disponibile della tua pool e dalla coda di uscita del livello di consenso. Verifica con il tuo fornitore per vedere come supporta questa funzionalità.

Dall'aggiornamento Pectra, le pool possono anche utilizzare i prelievi attivati dal livello di esecuzione (EIP-7002) per far uscire i validatori direttamente dall'indirizzo di prelievo, senza fare affidamento sulle chiavi di firma degli operatori dei nodi, riducendo la fiducia richiesta affinché i riscatti vengano onorati.

In alternativa, le pool che utilizzano un token di liquid staking ERC-20 consentono agli utenti di scambiare questo token nel mercato aperto, permettendoti di vendere la tua posizione di staking, di fatto "prelevando" senza rimuovere effettivamente gli ETH dal contratto di staking. Nota che il prezzo di mercato può differire dal valore di riscatto del token.

<ButtonLink href="/staking/withdrawals/">Maggiori informazioni sui prelievi di staking</ButtonLink>
</ButtonLink>

<ExpandableCard title="È diverso dallo staking con il mio exchange?">
Ci sono molte somiglianze tra queste opzioni di staking in pool e gli exchange centralizzati, come la possibilità di mettere in staking piccole quantità di ETH e farle raggruppare per attivare i validatori.

A differenza degli exchange centralizzati, molte altre opzioni di staking in pool utilizzano smart contract e/o token di liquid staking, che di solito sono token ERC-20 che possono essere conservati nel tuo portafoglio e acquistati o venduti proprio come qualsiasi altro token. Questo offre un livello di sovranità e sicurezza dandoti il controllo sui tuoi token, ma non ti dà comunque il controllo diretto sul client del validatore che attesta per tuo conto in background.

I programmi "earn" degli exchange sono anch'essi custodial e governati dai termini aziendali piuttosto che da regole onchain, e il loro rendimento potrebbe non derivare affatto dallo staking del protocollo. Vedi i [prodotti in pool opachi](#opaque-pooled-products) per capire la differenza.

Alcune opzioni di pooling sono più decentralizzate di altre per quanto riguarda i nodi che le supportano. Per promuovere la salute e la decentralizzazione della rete, gli staker sono sempre incoraggiati a selezionare un servizio di pooling che abiliti un set decentralizzato e permissionless di operatori di nodi.
</ExpandableCard>

## Letture consigliate {#further-reading}

- [La directory dello staking di Ethereum](https://www.staking.directory/) - _Eridian e Spacesider_
- [I rischi dei derivati di liquid staking](https://notes.ethereum.org/@djrtwo/risks-of-lsd) - _Danny Ryan_
- [Cos'è il liquid staking?](https://chain.link/education-hub/liquid-staking) - _Chainlink_
- [EIP-7002: Prelievi attivabili dal livello di esecuzione](https://eips.ethereum.org/EIPS/eip-7002) - _Ethereum Improvement Proposals_
- [Valutazioni delle pool di staking di Ethereum](https://explorer.rated.network/) - _Rated Network Explorer_
- [Qual è la differenza tra un token di liquid restaking (LRT) e un token di liquid staking (LST)?](https://liquidcollective.io/lst-vs-lrt/) - _Liquid Collective_