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

Alcuni pool operano utilizzando contratti intelligenti, dove i fondi possono essere depositati in un contratto, che gestisce e traccia in modo affidabile il tuo stake, e ti emette un token che rappresenta questo valore. Altri pool non possono coinvolgere smart contract e sono invece mediati fuori dalla catena.

## Perché mettere in stake con un pool? {#why-stake-with-a-pool}

Oltre ai vantaggi che abbiamo delineato nella nostra [introduzione allo staking](/staking/), lo staking mediante un pool viene fornito con una serie di vantaggi distinti.

<CardGrid>
  <Card title="Bassa barriera all’ingresso" emoji="🐟">
    Non è una balena? Nessun problema. La maggior parte dei pool di staking ti permette di accumulare (staking) praticamente qualsiasi quantità di ETH unendo le forze con altri staker, a differenza dello staking in solitaria che richiede 32 ETH.
  </Card>
  <Card title="Inizia oggi" emoji=":stopwatch:">
    Fare staking con un pool è facile come fare un token swap. Non c'è bisogno di preoccuparsi di installazione hardware e manutenzione del nodo. I pool ti consentono di depositare i tuoi ETH, il che consente agli operatori del nodo di eseguire i validatori. Le ricompense sono poi distribuite ai collaboratori, meno una commissione per le operazioni del nodo.
  </Card>
  <Card title="Token di liquidità" emoji=":droplet:">
    Molti pool di staking forniscono un token che rappresenta una rivendicazione sui tuoi ETH in staking e le ricompense che genera. Questo ti consente di usare i tuoi ETH in staking, es. come garanzia nelle applicazioni DeFi.
  </Card>
</CardGrid>

<StakingComparison page="pools" />

## Cosa considerare {#what-to-consider}

Lo staking in pool o delegato non è supportato nativamente dal protocollo di Ethereum, ma data la domanda degli utenti di mettere meno di 32 ETH in staking, sono state costruite sempre più soluzioni per soddisfare tale richiesta.

Ogni pool e gli strumenti o i contratti intelligenti che usano sono stati creati da diversi team e, ognuno, presenta i propri rischi e benefici.

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
Attualmente, il prelievo di fondi da un validatore sulla Beacon Chain non è possibile, il che limita la possibilità di <em>riscattare</em> effettivamente il tuo token di liquidità per le ricompense in ETH bloccate nel livello del consenso.

Altrimenti, i pool che usano un token di liquidità ERC-20 consentono agli utenti di scambiare questo token nel mercato aperto, consentendoti efficientemente di "prelevare" senza rimuovere realmente gli ETH dalla Beacon Chain.
</ExpandableCard>

<ExpandableCard title="Gli staker in pool devono fare qualcosa per La Fusione?">
Gli staker in pool <strong>non devono fare nulla per prepararsi alla Fusione</strong>.

Tuttavia, all'avvicinarsi della Fusione, state attenti ai truffatori. **Non devi aggiornare i tuoi ETH o token ETH in staking** per la transizione al proof-of-stake.

Scopri di più su [La Fusione](/upgrades/merge/)
</ExpandableCard>

<ExpandableCard title="È diverso dallo staking con la mia borsa?">
Esistono molte somiglianze tra queste opzioni di staking in pool e le borse centralizzate, come la possibilità di mettere in staking piccole quantità di ETH e farle impacchettare insieme per attivare i validatori.

A differenza delle borse centralizzate, molte altre opzioni di staking in pool usano i contratti intelligenti e/o i token di liquidità, che sono solitamente token ERC-20 che possono essere tenuti nel tuo portafoglio e acquistati o venduti come qualsiasi altro token. Questo offre un livello di sovranità e sicurezza, dandoti il controllo dei tuoi token, ma non ti dà ancora il controllo diretto sul client del validatore che attesta per conto tuo in background.

Alcune opzioni di pooling sono più decentralizzate di altre quando si tratta di nodi che le sostengono. Per promuovere la salute e la decentralizzazione della rete, gli staker sono sempre incoraggiati a selezionare un servizio di pooling che consenta una serie di operatori del nodo decentralizzati e privi di permessi.
</ExpandableCard>

## Approfondimenti {#further-reading}

- [Staking con Rocket Pool - Panoramica sullo Staking](https://docs.rocketpool.net/guides/staking/overview.html) - _RocketPool docs_
- [Staking di Ethereum con Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Documentazione di supporto di Lido_
