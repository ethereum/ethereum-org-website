---
title: Staking in pool
description: Una panoramica di come iniziare con lo staking in pool di ETH
lang: it
template: staking
emoji: ":money_with_wings:"
image: ../../../../../assets/staking/leslie-pool.png
alt: Leslie il rinoceronte che nuota in piscina.
sidebarDepth: 2
summaryPoints:
  - Metti in stake e guadagna ricompense con qualsiasi importo di ETH unendo le forze con gli altri
  - Salta la parte dura e affida l'operazione di validatore a una terza parte
  - Tieni i token di liquidità nel tuo portafoglio
---

## Cosa sono i pool di staking? {#what-are-staking-pools}

I pool di staking sono un approccio collaborativo per consentire a molti, con quantità minori di ETH, di ottenere i 32 ETH necessari per attivare un insieme di chiavi di validazione. La funzionalità di pooling non è supportata nativamente all'interno del protocollo, quindi le soluzioni sono state sviluppate separatamente per rispondere a questa esigenza.

Alcuni pool operano utilizzando i contratti intelligenti, dove i fondi possono essere depositati in un contratto, che gestisce e traccia senza fiducia il tuo stake, e ti emette un token che rappresenta questo valore. Altri pool potrebbero non coinvolgere i contratti intelligenti ed essere invece mediati al di fuori dalla catena.

## Perché mettere in stake con un pool? {#why-stake-with-a-pool}

Oltre ai vantaggi che abbiamo delineato nella nostra [introduzione allo staking](/staking/), lo staking mediante un pool viene fornito con una serie di vantaggi distinti.

<CardGrid>
  <Card title="Bassa barriera all’ingresso" emoji="🐟" description="Not a whale? No problem. Most staking pools let you stake virtually any amount of ETH by joining forces with other stakers, unlike staking solo which requires 32 ETH." />
  <Card title="Inizia oggi" emoji=":stopwatch:" description="Staking with a pool is as easy as a token swap. No need to worry about hardware setup and node maintenance. Pools allow you to deposit your ETH which enables node operators to run validators. Rewards are then distributed to contributors minus a fee for node operations." />
  <Card title="Token di liquidità" emoji=":droplet:" description="Many staking pools provide a token that represents a claim on your staked ETH and the rewards it generates. This allows you to make use of your staked ETH, e.g. as collateral in DeFi applications." />
</CardGrid>

<StakingComparison page="pools" />

## Cosa considerare {#what-to-consider}

Lo staking in pool o delegato non è supportato nativamente dal protocollo di Ethereum, ma data la domanda degli utenti di mettere meno di 32 ETH in staking, sono state costruite sempre più soluzioni per soddisfare tale richiesta.

Ogni pool e gli strumenti o i contratti intelligenti che utilizzano sono stati creati da team differenti e ognuno presenta i propri benefici e rischi. I pool consentono agli utenti di scambiare i propri ETH per un token che rappresenta gli ETH in staking. Il token è noto come un "derivato liquido dello staking"; questo è utile perché consente agli utenti di scambiare qualsiasi importo di ETH in un importo equivalente di un token che generi una resa dalle ricompense di staking applicate agli ETH in staking sottostanti (e viceversa), sugli scambi decentralizzati, sebbene gli ETH effettivi restino in staking sulla Beacon Chain. Ciò significa che lo scambio da e verso un prodotto di ETH in staking che generi una resa e gli "ETH grezzi" è rapido, facile e non solo disponibile in multipli di 32 ETH.

Tuttavia, questi derivati liquidi dello staking tendono a creare comportamenti in stile cartello, in cui una grande quantità di ETH in staking finisce sotto il controllo di alcune organizzazioni centralizzate, piuttosto che distribuirsi a molti individui indipendenti. Ciò crea condizioni di censura o di estrazione del valore. Lo standard di riferimento per lo staking dovrebbe sempre prevedere l'esecuzione di validatori da parte di individui, sul proprio hardware, quando possibile.

[Di più sui rischi dello staking di token](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Gli indicatori d'attributo sono usati di seguito per segnalare notevoli punti di forza o debolezze che un pool di staking elencato potrebbe avere. Usa questa sezione come un riferimento per come definire tali attributi mentre stai scegliendo un pool cui unirti.

<StakingConsiderations page="pools" />

## Esplora i pool di staking {#explore-staking-pools}

Esistono una varietà di opzioni disponibili per aiutarti con la tua configurazione. Gli indicatori di cui sopra ti guideranno per gli strumenti seguenti.

<InfoBanner emoji="⚠️" isWarning>
Sei pregato di notare l'importanza di scegliere un servizio che prenda sul serio la <a href="/developers/docs/nodes-and-clients/client-diversity/">diversità del client</a>, poiché essa migliora la sicurezza della rete e limita i tuoi rischi. I servizi per i quali è dimostrato che limitino l'uso del client di maggioranza sono contrassegnati come <em style="text-transform: uppercase;">"client diversi."</em>
</InfoBanner>

<StakingProductsCardGrid category="pools" />

Hai un suggerimento per uno strumento di staking che abbiamo dimenticato? Dai un'occhiata alla nostra [politica di elenco dei prodotti](/contributing/adding-staking-products/) per vedere se sarebbe adatto e sottoporcelo.

## Domande frequenti {#faq}

<ExpandableCard title="Come ottengo ricompense?">
Tipicamente, i token di liquidità ERC-20 sono emessi agli staker che rappresentano il valore dei loro ETH in staking più le ricompense. Tieni a mente che diversi pool distribuiranno ricompense di staking ai loro utenti tramite metodi lievemente differenti, ma questo è il tema comune.
</ExpandableCard>

<ExpandableCard title="Quando posso prelevare il mio stake?">
Subito! L'aggiornamento della rete di Shanghai/Capella è avvenuto ad aprile 2023 e ha introdotto i prelievi di staking. I conti del validatore che sostengono i pool di staking hanno ora la possibilità di uscire e prelevare ETH al proprio indirizzo di prelievo designato. Ciò consente di riscattare la propria parte di stake per gli ETH sottostanti. Confrontati con il tuo fornitore per scoprire come supporta tale funzionalità.

Altrimenti, i pool che usano un token di liquidità ERC-20 consentono agli utenti di scambiarlo nel mercato aperto, consentendoti di vendere la tua posizione di staking, "prelevando" effettivamente senza rimuovere realmente ETH dal contratto di staking.

<ButtonLink to="/staking/withdrawals/">Di più sui prelievi di staking</ButtonLink>
</ExpandableCard>

<ExpandableCard title="È diverso dallo staking con la mia borsa?">
Esistono molte somiglianze tra queste opzioni di staking in pool e le borse centralizzate, come la possibilità di mettere in staking piccole quantità di ETH e farle impacchettare insieme per attivare i validatori.

A differenza delle borse centralizzate, molte altre opzioni di staking in pool usano i contratti intelligenti e/o i token di liquidità, che sono solitamente token ERC-20 che possono essere tenuti nel tuo portafoglio e acquistati o venduti come qualsiasi altro token. Questo offre un livello di sovranità e sicurezza, dandoti il controllo dei tuoi token, ma non ti dà ancora il controllo diretto sul client del validatore che attesta per conto tuo in background.

Alcune opzioni di pooling sono più decentralizzate di altre quando si tratta di nodi che le sostengono. Per promuovere la salute e la decentralizzazione della rete, gli staker sono sempre incoraggiati a selezionare un servizio di pooling che consenta una serie di operatori del nodo decentralizzati e privi di permessi.
</ExpandableCard>

## Approfondimenti {#further-reading}

- [Staking con Rocket Pool - Panoramica sullo Staking](https://docs.rocketpool.net/guides/staking/overview.html) - _RocketPool docs_
- [Staking di Ethereum con Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Documentazione di supporto di Lido_
