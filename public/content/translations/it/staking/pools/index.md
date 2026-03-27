---
title: Staking in pool
description: Scopri le pool di staking
lang: it
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: Leslie il rinoceronte che nuota nella piscina.
sidebarDepth: 2
summaryPoints:
  - Fai staking e ottieni ricompense con qualsiasi importo di ETH unendo le forze con altri
  - Salta la parte difficile e affida l'operazione del validatore a terzi
  - Conserva i token di staking nel tuo portafoglio
---

## Cosa sono le pool di staking? {#what-are-staking-pools}

Le pool di staking sono un approccio collaborativo per consentire a molti con quantità minori di ETH di ottenere i 32 ETH necessari per attivare un set di chiavi del validatore. La funzionalità di raggruppamento (pooling) non è supportata nativamente all'interno del protocollo, quindi sono state create soluzioni separate per soddisfare questa esigenza.

Alcune pool operano utilizzando contratti intelligenti, in cui i fondi possono essere depositati in un contratto, che gestisce e traccia il tuo stake in modo trustless, e ti emette un token che rappresenta questo valore. Altre pool potrebbero non coinvolgere contratti intelligenti e sono invece mediate fuori catena.

## Perché fare staking con una pool? {#why-stake-with-a-pool}

Oltre ai vantaggi che abbiamo delineato nella nostra [introduzione allo staking](/staking/), fare staking con una pool comporta una serie di vantaggi distinti.

<CardGrid>
  <Card title="Bassa barriera all'ingresso" emoji="🐟" description="Non sei una balena? Nessun problema. La maggior parte delle pool di staking ti consente di fare staking praticamente con qualsiasi importo di ETH unendo le forze con altri staker, a differenza dello staking in solitaria che richiede 32 ETH." />
  <Card title="Fai staking oggi" emoji=":stopwatch:" description="Fare staking con una pool è facile come uno scambio di token. Non c'è bisogno di preoccuparsi della configurazione dell'hardware e della manutenzione del nodo. Le pool ti consentono di depositare i tuoi ETH, il che permette agli operatori dei nodi di eseguire i validatori. Le ricompense vengono poi distribuite ai contributori meno una commissione per le operazioni del nodo." />
  <Card title="Token di staking" emoji=":droplet:" description="Molte pool di staking forniscono un token che rappresenta un diritto sui tuoi ETH in staking e sulle ricompense che genera. Questo ti consente di utilizzare i tuoi ETH in staking, ad esempio, come collaterale nelle applicazioni DeFi." />
</CardGrid>

<StakingComparison page="pools" />

## Cosa considerare {#what-to-consider}

Lo staking in pool o delegato non è supportato nativamente dal protocollo di [Ethereum](/), ma data la richiesta degli utenti di fare staking con meno di 32 ETH, è stato sviluppato un numero crescente di soluzioni per soddisfare questa domanda.

Ogni pool e gli strumenti o i contratti intelligenti che utilizzano sono stati sviluppati da team diversi, e ognuno comporta vantaggi e rischi. Le pool consentono agli utenti di scambiare i propri ETH per un token che rappresenta gli ETH in staking. Il token è utile perché consente agli utenti di scambiare qualsiasi importo di ETH con un importo equivalente di un token fruttifero che genera un rendimento dalle ricompense di staking applicate agli ETH in staking sottostanti (e viceversa) sugli exchange decentralizzati, anche se gli ETH effettivi rimangono in staking sul livello di consenso. Ciò significa che gli scambi avanti e indietro da un prodotto di ETH in staking fruttifero e "ETH grezzi" sono rapidi, facili e non disponibili solo in multipli di 32 ETH.

Tuttavia, questi token di ETH in staking tendono a creare comportamenti simili a cartelli in cui una grande quantità di ETH in staking finisce sotto il controllo di poche organizzazioni centralizzate piuttosto che essere distribuita tra molti individui indipendenti. Questo crea le condizioni per la censura o l'estrazione di valore. Lo standard di riferimento per lo staking dovrebbe sempre essere costituito da individui che eseguono validatori sul proprio hardware ogni volta che è possibile.

[Maggiori informazioni sui rischi dei token di staking](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Gli indicatori degli attributi sono utilizzati di seguito per segnalare i punti di forza o di debolezza notevoli che una pool di staking elencata potrebbe avere. Usa questa sezione come riferimento per come definiamo questi attributi mentre scegli una pool a cui unirti.

<StakingConsiderations page="pools" />

## Esplora le pool di staking {#explore-staking-pools}

Ci sono diverse opzioni disponibili per aiutarti con la tua configurazione. Usa gli indicatori sopra per guidarti attraverso gli strumenti qui sotto.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Tieni presente l'importanza di scegliere un servizio che prenda sul serio la [diversità dei client](/developers/docs/nodes-and-clients/client-diversity/), poiché migliora la sicurezza della rete e limita i tuoi rischi. I servizi che presentano prove di limitazione dell'uso del client di maggioranza sono indicati con <em style={{ textTransform: "uppercase" }}>"diversità dei client di esecuzione"</em> e <em style={{ textTransform: "uppercase" }}>"diversità dei client di consenso."</em>

Hai un suggerimento per uno strumento di staking che ci è sfuggito? Dai un'occhiata alla nostra [politica di inserimento dei prodotti](/contributing/adding-staking-products/) per vedere se sarebbe adatto e per inviarlo per la revisione.

## Domande frequenti {#faq}

<ExpandableCard title="Come ottengo le ricompense?">
In genere, i token di staking ERC-20 vengono emessi agli staker e rappresentano il valore dei loro ETH in staking più le ricompense. Tieni presente che diverse pool distribuiranno le ricompense di staking ai propri utenti tramite metodi leggermente diversi, ma questo è il tema comune.
</ExpandableCard>

<ExpandableCard title="Quando posso prelevare il mio stake?">
Proprio ora! L'aggiornamento della rete Shanghai/Capella è avvenuto nell'aprile 2023 e ha introdotto i prelievi di staking. Gli account del validatore che supportano le pool di staking ora hanno la possibilità di uscire e prelevare ETH al loro indirizzo di prelievo designato. Questo abilita la possibilità di riscattare la tua porzione di stake per gli ETH sottostanti. Verifica con il tuo fornitore per vedere come supportano questa funzionalità.

In alternativa, le pool che utilizzano un token di staking ERC-20 consentono agli utenti di scambiare questo token nel mercato aperto, permettendoti di vendere la tua posizione di staking, di fatto "prelevando" senza rimuovere effettivamente gli ETH dal contratto di staking.

<ButtonLink href="/staking/withdrawals/">Maggiori informazioni sui prelievi di staking</ButtonLink>
</ExpandableCard>

<ExpandableCard title="È diverso dallo staking con il mio exchange?">
Ci sono molte somiglianze tra queste opzioni di staking in pool e gli exchange centralizzati, come la possibilità di fare staking con piccole quantità di ETH e farle raggruppare insieme per attivare i validatori.

A differenza degli exchange centralizzati, molte altre opzioni di staking in pool utilizzano contratti intelligenti e/o token di staking, che di solito sono token ERC-20 che possono essere conservati nel tuo portafoglio e acquistati o venduti proprio come qualsiasi altro token. Questo offre un livello di sovranità e sicurezza dandoti il controllo sui tuoi token, ma non ti dà comunque il controllo diretto sul client del validatore che esegue l'attestazione per tuo conto in background.

Alcune opzioni di raggruppamento sono più decentralizzate di altre per quanto riguarda i nodi che le supportano. Per promuovere la salute e la decentralizzazione della rete, gli staker sono sempre incoraggiati a selezionare un servizio di raggruppamento che abiliti un set decentralizzato e senza permessi di operatori di nodi.
</ExpandableCard>

## Letture consigliate {#further-reading}

- [La directory dello staking di Ethereum](https://www.staking.directory/) - _Eridian e Spacesider_
- [Staking con Rocket Pool - Panoramica dello staking](https://docs.rocketpool.net/guides/staking/overview.html) - _Documentazione di RocketPool_
- [Staking di Ethereum con Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Documentazione di aiuto di Lido_