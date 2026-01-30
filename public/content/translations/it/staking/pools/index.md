---
title: Staking condiviso
description: Scopri i pool di staking
lang: it
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: Leslie il rinoceronte che nuota in piscina.
sidebarDepth: 2
summaryPoints:
  - Metti in stake e guadagna ricompense con qualsiasi importo di ETH unendo le forze con gli altri
  - Salta la parte dura e affida l'operazione di validatore a una terza parte
  - Possiedi token di staking nel tuo portafoglio
---

## Cosa sono i pool di staking? {#what-are-staking-pools}

I pool di staking sono un approccio collaborativo per consentire a molti, con quantità minori di ETH, di ottenere i 32 ETH necessari per attivare un insieme di chiavi di validazione. La funzionalità di pooling non è supportata nativamente all'interno del protocollo, quindi le soluzioni sono state sviluppate separatamente per rispondere a questa esigenza.

Alcuni pool operano utilizzando i contratti intelligenti, dove i fondi possono essere depositati in un contratto, che gestisce e traccia senza fiducia il tuo stake, e ti emette un token che rappresenta questo valore. Altri pool potrebbero non coinvolgere i contratti intelligenti ed essere invece mediati offchain.

## Perché mettere in stake con un pool? {#why-stake-with-a-pool}

Oltre ai vantaggi illustrati nella nostra [introduzione allo staking](/staking/), lo staking con un pool comporta una serie di vantaggi distinti.

<CardGrid>
  <Card title="Bassa barriera all'ingresso" emoji="🐟" description="Non sei una balena? Nessun problema. La maggior parte dei pool di staking ti permette di mettere in staking praticamente qualsiasi importo di ETH unendo le forze con altri staker, a differenza dello staking in solitaria che richiede 32 ETH." />
  <Card title="Metti in staking oggi" emoji=":stopwatch:" description="Mettere in staking con un pool è facile come scambiare un token. Non devi preoccuparti della configurazione hardware e della manutenzione del nodo. I pool ti consentono di depositare i tuoi ETH, permettendo agli operatori dei nodi di eseguire i validatori. Le ricompense vengono poi distribuite ai partecipanti, al netto di una commissione per le operazioni del nodo." />
  <Card title="Token di staking" emoji=":droplet:" description="Molti pool di staking forniscono un token che rappresenta un diritto sui tuoi ETH messi in staking e sulle ricompense che genera. Questo ti permette di utilizzare i tuoi ETH in staking, ad esempio come garanzia nelle applicazioni DeFi." />
</CardGrid>

<StakingComparison page="pools" />

## Cosa considerare {#what-to-consider}

Lo staking in pool o delegato non è supportato nativamente dal protocollo di Ethereum, ma data la domanda degli utenti di mettere meno di 32 ETH in staking, sono state costruite sempre più soluzioni per soddisfare tale richiesta.

Ogni pool e gli strumenti o i contratti intelligenti che utilizzano sono stati creati da team differenti e ognuno presenta i propri benefici e rischi. I pool consentono agli utenti di scambiare i propri ETH per un token che rappresenta gli ETH in staking. Il token è utile perché consente agli utenti di scambiare qualsiasi importo di ETH con un importo equivalente di un token fruttifero che genera un rendimento dalle ricompense di staking applicate agli ETH sottostanti (e viceversa) sulle borse decentralizzate, anche se gli ETH veri e propri rimangono in staking sul livello del consenso. Ciò significa che lo scambio da e verso un prodotto di ETH in staking che generi una resa e gli "ETH grezzi" è rapido, facile e non solo disponibile in multipli di 32 ETH.

Tuttavia, questi token derivanti dagli ETH in staking tendono a creare comportamenti in stile cartello, in cui una grande quantità di ETH in staking finisce sotto il controllo di alcune organizzazioni centralizzate, piuttosto che distribuirsi a molti individui indipendenti. Ciò crea condizioni di censura o di estrazione del valore. Lo standard di riferimento per lo staking dovrebbe sempre prevedere l'esecuzione di validatori da parte di individui, sul proprio hardware, quando possibile.

[Maggiori informazioni sui rischi dello staking di token](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Gli indicatori d'attributo sono usati di seguito per segnalare notevoli punti di forza o debolezze che un pool di staking elencato potrebbe avere. Usa questa sezione come un riferimento per come definire tali attributi mentre stai scegliendo un pool cui unirti.

<StakingConsiderations page="pools" />

## Esplora i pool di staking {#explore-staking-pools}

Esistono una varietà di opzioni disponibili per aiutarti con la tua configurazione. Gli indicatori di cui sopra ti guideranno per gli strumenti seguenti.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

È importante scegliere un servizio che prenda sul serio la [diversità dei client](/developers/docs/nodes-and-clients/client-diversity/), poiché migliora la sicurezza della rete e limita i rischi. I servizi aventi prova della limitazione dell'utilizzo dei client di maggioranza sono indicati con <em style={{ textTransform: "uppercase" }}>"diversità del client d'esecuzione"</em> e <em style={{ textTransform: "uppercase" }}>"diversità del client del consenso."</em>

Hai un suggerimento per uno strumento di staking che abbiamo dimenticato? Consulta la nostra [politica di inserimento dei prodotti](/contributing/adding-staking-products/) per verificare se è idoneo e per sottoporlo a revisione.

## Domande frequenti {#faq}

<ExpandableCard title="Come guadagno le ricompense?">
Tipicamente i token di staking ERC-20 sono emessi agli staker e rappresentano il valore dei loro ETH in staking più le ricompense. Tieni a mente che diversi pool distribuiranno ricompense di staking ai loro utenti tramite metodi lievemente differenti, ma questo è il tema comune.
</ExpandableCard>

<ExpandableCard title="Quando posso prelevare il mio stake?">
Subito! L'aggiornamento della rete di Shanghai/Capella è avvenuto ad aprile 2023 e ha introdotto i prelievi di staking. I conti del validatore che sostengono i pool di staking hanno ora la possibilità di uscire e prelevare ETH al proprio indirizzo di prelievo designato. Ciò consente di riscattare la propria parte di stake per gli ETH sottostanti. Confrontati con il tuo fornitore per scoprire come supporta tale funzionalità.

In alternativa, i pool che utilizzano un token di staking ERC-20 consentono agli utenti di scambiare questo token sul mercato libero, permettendo di vendere la propria posizione di staking, "prelevando" i propri fondi di fatto senza rimuovere effettivamente ETH dal contratto di staking.

<ButtonLink href="/staking/withdrawals/">Maggiori informazioni sui prelievi dello staking</ButtonLink> </ExpandableCard>

<ExpandableCard title="È diverso dallo staking con il mio exchange?">
Esistono molte somiglianze tra queste opzioni di staking in pool e gli exchange centralizzati, come la possibilità di mettere in staking piccole quantità di ETH e raggrupparle per attivare i validatori.

A differenza delle borse centralizzate, molte altre opzioni di staking in pool utilizzano contratti intelligenti e/o token di staking, che di solito sono token ERC-20 che possono essere conservati nel proprio portafoglio e acquistati o venduti come qualsiasi altro token. Questo offre un livello di sovranità e sicurezza, dandoti il controllo dei tuoi token, ma non ti dà ancora il controllo diretto sul client del validatore che attesta per conto tuo in background.

Alcune opzioni di pooling sono più decentralizzate di altre quando si tratta di nodi che le sostengono. Per promuovere la salute e la decentralizzazione della rete, gli staker sono sempre incoraggiati a selezionare un servizio di pooling che consenta una serie di operatori del nodo decentralizzati e privi di permessi. </ExpandableCard>

## Letture consigliate {#further-reading}

- [La Directory dello Staking di Ethereum](https://www.staking.directory/) - _Eridian e Spacesider_
- [Staking con Rocket Pool - Panoramica sullo staking](https://docs.rocketpool.net/guides/staking/overview.html) - _Documentazione di RocketPool_
- [Staking di Ethereum con Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Documentazione di supporto di Lido_
