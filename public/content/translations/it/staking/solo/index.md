---
title: Staking dometico dei tuoi ETH
description: Una panoramica su come iniziare a mettere i tuoi ETH in staking domestico
lang: it
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: Leslie il rinoceronte sul suo chip informatico.
sidebarDepth: 2
summaryPoints:
  - Ricevi le ricompense massime direttamente dal protocollo per mantenere il tuo validatore propriamente in funzione e online
  - Opera hardware domestico e aggiungi personalmente alla sicurezza e decentralizzazione della rete di Ethereum
  - Rimuovi la fiducia e non lasciar mai perdere il controllo delle chiavi dei tuoi fondi
---

## Cos'è lo staking domestico? {#what-is-solo-staking}

Lo staking domestico è l'atto di [eseguire un nodo di Ethereum](/run-a-node/) connesso a Internet e depositare 32 ETH per attivare un [validatore](#faq), dandoti la possibilità di partecipare direttamente al consenso della rete.

**Lo staking domestico aumenta la decentralizzazione della rete di Ethereum**, rendendo Ethereum più resistente alla censura e robusto contro gli attacchi. Altri metodi di staking potrebbero non aiutare la rete nello stesso modo. Lo staking domestico è la migliore opzione di staking per proteggere Ethereum.

Un nodo di Ethereum è composto sia da un client del livello di esecuzione (EL) che da un client del livello di consenso (CL). Questi client sono software che funzionano insieme, con un set valido di chiavi di firma, per verificare le transazioni e i blocchi, attestare la testata corretta della catena, aggregare le attestazioni e proporre i blocchi.

Gli staker domestici sono responsabili del funzionamento dell'hardware necessario per eseguire questi client. È vivamente consigliato usare una macchina dedicata a questo scopo, che puoi gestire da casa: ciò è estremamente vantaggioso per la salute della rete.

Uno staker domestico riceve ricompense direttamente dal protocollo per mantenere il proprio validatore correttamente in funzione e online.

## Perché fare staking da casa? {#why-stake-solo}

Lo staking domestico richiede maggiori responsabilità, ma fornisce il massimo controllo sui propri fondi e sulla propria configurazione di staking.

<CardGrid>
  <Card title="Guadagna nuovi ETH" emoji="💸" description="Guadagna ricompense in ETH direttamente dal protocollo quando il tuo validatore è online, senza che intermediari ne trattengano una parte." />
  <Card title="Pieno controllo" emoji="🎛️" description="Conserva le tue chiavi. Scegli la combinazione di client e hardware che ti consente di minimizzare i rischi e di contribuire al meglio alla salute e alla sicurezza della rete. I servizi di staking di terze parti prendono queste decisioni per te, e non sempre fanno le scelte più sicure." />
  <Card title="Sicurezza della rete" emoji="🔐" description="Lo staking da casa è il modo più efficace per fare staking. Eseguendo un validatore sul tuo hardware a casa, rafforzi la robustezza, la decentralizzazione e la sicurezza del protocollo di Ethereum." />
</CardGrid>

## Considerazioni prima dello staking domestico {#considerations-before-staking-solo}

Per quanto vorremmo che lo staking domestico fosse accessibile e privo di rischi per tutti, questa non è la realtà. Ci sono alcune considerazioni pratiche e serie da tenere a mente prima di scegliere di mettere in staking i propri ETH da casa.

<InfoGrid>
<ExpandableCard title="Lettura obbligatoria" eventCategory="SoloStaking" eventName="clicked required reading">
Quando gestisci il tuo nodo, dovresti dedicare del tempo a imparare come usare il software che hai scelto. Ciò comporta la lettura della documentazione pertinente e la consultazione dei canali di comunicazione di tali team di sviluppo.

Più capisci del software che stai eseguendo e di come funziona la proof-of-stake, meno rischi correrai come staker e più facile sarà risolvere eventuali problemi che potrebbero sorgere lungo il percorso come operatore di un nodo.
</ExpandableCard>

<ExpandableCard title="Dimestichezza con i computer" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
La configurazione del nodo richiede una discreta dimestichezza con i computer, sebbene nuovi strumenti stiano rendendo questo processo più facile nel tempo. La comprensione dell'interfaccia a riga di comando è utile, ma non più strettamente necessaria.

Richiede anche una configurazione hardware molto basilare e una certa comprensione delle specifiche minime consigliate.
</ExpandableCard>

<ExpandableCard title="Gestione sicura delle chiavi" eventCategory="SoloStaking" eventName="clicked secure key management">
Proprio come le chiavi private proteggono il tuo indirizzo Ethereum, dovrai generare chiavi specifiche per il tuo validatore. Devi capire come mantenere al sicuro qualsiasi frase seed o chiave privata. 

[Sicurezza di Ethereum e prevenzione delle truffe](/security/)
</ExpandableCard>

<ExpandableCard title="Manutenzione" eventCategory="SoloStaking" eventName="clicked maintenance">
L'hardware occasionalmente si guasta, le connessioni di rete danno errore e il software del client occasionalmente necessita di aggiornamenti. La manutenzione del nodo è inevitabile e occasionalmente richiederà la tua attenzione. Dovrai assicurarti di essere a conoscenza di eventuali aggiornamenti di rete previsti o di altri aggiornamenti critici del client.
</ExpandableCard>

<ExpandableCard title="Uptime affidabile" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Le tue ricompense sono proporzionali al tempo in cui il tuo validatore è online e attesta correttamente. I tempi di inattività comportano sanzioni proporzionali al numero di altri validatori offline nello stesso momento, ma <a href="#faq">non si traducono in tagli</a>. Anche la larghezza di banda è importante, poiché le ricompense diminuiscono per le attestazioni che non vengono ricevute in tempo. I requisiti possono variare, ma si consiglia un minimo di 10 Mb/s in upload e download.
</ExpandableCard>

<ExpandableCard title="Rischio di slashing" eventCategory="SoloStaking" eventName="clicked slashing risk">
A differenza delle penalità per inattività dovute all'essere offline, lo <em>slashing</em> è una sanzione molto più grave riservata alle infrazioni malevole. Eseguendo un client di minoranza con le tue chiavi caricate su una sola macchina alla volta, il rischio di subire uno slashing è ridotto al minimo. Detto questo, tutti gli staker devono essere consapevoli dei rischi di slashing.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Ulteriori informazioni sullo slashing e sul ciclo di vita dei validatori</a>
</ExpandableCard>
</InfoGrid>

<StakingComparison page="solo" />

## Come funziona {#how-it-works}

<StakingHowSoloWorks />

Quando saranno attivi, riceverai le ricompense in ETH, che saranno depositate periodicamente al tuo indirizzo di prelievo.

Se lo desideri, puoi uscire dal ruolo di validatore, eliminando il requisito di essere online e interrompendo ogni ulteriore ricompensa. Il tuo saldo rimanente sarà quindi prelevato all'indirizzo di prelievo da te designato durante la configurazione.

[Di più sulle ricompense di staking](/staking/withdrawals/)

## Inizia a usare il Launchpad di staking {#get-started-on-the-staking-launchpad}

Il Launchpad di staking è un'applicazione open source che ti aiuterà a diventare uno staker. Ti guiderà nella scelta dei client, nella generazione delle chiavi e nel deposito dei tuoi ETH nel contratto di deposito per lo staking. Viene fornita una checklist per assicurarsi di aver coperto tutto il necessario per configurare il proprio validatore in sicurezza.

<StakingLaunchpadWidget />

## Cosa considerare riguardo agli strumenti di configurazione di nodi e client {#node-tool-considerations}

Esistono sempre più strumenti e servizi per aiutarti a mettere i tuoi ETH in staking domestico, ma ognuno presenta rischi e benefici differenti.

Gli indicatori di attributo sono usati di seguito per segnalare punti di forza o di debolezza notevoli che uno strumento di staking elencato potrebbe avere. Usa questa sezione come riferimento per come definiamo questi attributi mentre scegli quali strumenti usare per aiutarti nel tuo percorso di staking.

<StakingConsiderations page="solo" />

## Esplora gli strumenti di configurazione di nodi e client {#node-and-client-tools}

Esistono una varietà di opzioni disponibili per aiutarti con la tua configurazione. Gli indicatori di cui sopra ti guideranno per gli strumenti seguenti.

<ProductDisclaimer />

### Strumenti del nodo

<StakingProductsCardGrid category="nodeTools" />

Tieni presente l'importanza di scegliere un [client di minoranza](/developers/docs/nodes-and-clients/client-diversity/) poiché migliora la sicurezza della rete e limita i tuoi rischi. Gli strumenti che ti consentono di configurare un client di minoranza sono indicati come <em style={{ textTransform: "uppercase" }}>"multi-client".</em>

### Generatori di chiavi

Questi strumenti possono essere utilizzati come alternativa alla [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/) per aiutare con la generazione delle chiavi.

<StakingProductsCardGrid category="keyGen" />

Hai un suggerimento per uno strumento di staking che abbiamo dimenticato? Consulta la nostra [politica di inserimento dei prodotti](/contributing/adding-staking-products/) per verificare se è idoneo e per sottoporlo a revisione.

## Esplora le guide allo staking domestico {#staking-guides}

<StakingGuides />

## Domande frequenti {#faq}

Esistono alcune domande molto comuni sullo staking che meritano di essere affrontate.

<ExpandableCard title="Cos'è un validatore?">

Un <em>validatore</em> è un'entità virtuale che vive su Ethereum e partecipa al consenso del protocollo di Ethereum. I validatori sono rappresentati da un saldo, una chiave pubblica e altre proprietà. Un <em>client del validatore</em> è il software che agisce per conto del validatore detenendone e utilizzandone la chiave privata. Un singolo client del validatore può contenere molte coppie di chiavi, controllando molti validatori.
</ExpandableCard>

<ExpandableCard title="Posso depositare più di 32 ETH?">
Sì, i moderni account di validatore sono in grado di contenere fino a 2048 ETH. Gli ETH aggiuntivi oltre i 32 matureranno interessi in modo graduale, aumentando con incrementi di numeri interi man mano che il tuo saldo reale aumenta. Questo è noto come il tuo <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">saldo effettivo</a>.

Per aumentare il saldo effettivo di un account, e quindi aumentare le ricompense, deve essere superata una soglia di 0,25 ETH al di sopra di qualsiasi soglia di ETH intero. Ad esempio, un account con un saldo reale di 32,9 e un saldo effettivo di 32 dovrebbe guadagnare altri 0,35 ETH per portare il suo saldo reale sopra 33,25 prima di innescare un aumento del saldo effettivo.

Questo buffer impedisce anche che un saldo effettivo si abbassi prima di arrivare a 0,25 ETH al di sotto del proprio saldo effettivo corrente.

Ogni coppia di chiavi associata a un validatore richiede almeno 32 ETH per essere attivata. Qualsiasi saldo superiore a questo importo può essere prelevato in qualsiasi momento all'indirizzo di prelievo associato tramite una transazione firmata da questo indirizzo. Tutti i fondi al di sopra del saldo effettivo massimo saranno prelevati automaticamente su base periodica.

Se lo staking domestico ti sembra troppo impegnativo, considera l'utilizzo di un fornitore di [staking-as-a-service](/staking/saas/), o se hai a disposizione meno di 32 ETH, dai un'occhiata agli [staking pool](/staking/pools/).
</ExpandableCard>

<ExpandableCard title="Subirò uno slashing se vado offline? (in breve: no)">
Andare offline quando la rete sta finalizzando correttamente NON comporterà uno slashing. Piccole <em>penalità per inattività</em> vengono applicate se il tuo validatore non è disponibile ad attestare per una data epoca (ciascuna della durata di 6,4 minuti), ma questo è molto diverso dallo <em>slashing</em>. Queste penalità sono leggermente inferiori alla ricompensa che avresti guadagnato se il validatore fosse stato disponibile ad attestare, e le perdite possono essere recuperate con circa la stessa quantità di tempo trascorso di nuovo online.

Nota che le penalità per inattività sono proporzionali al numero di validatori offline contemporaneamente. Nei casi in cui una grande porzione della rete sia tutta offline contemporaneamente, le penalità per ciascuno di questi validatori saranno maggiori rispetto a quando un singolo validatore non è disponibile.

In casi estremi, se la rete smette di finalizzare a causa del fatto che più di un terzo dei validatori è offline, questi utenti subiranno quella che è nota come una <em>fuga di inattività quadratica</em>, che è un drenaggio esponenziale di ETH dagli account dei validatori offline. Ciò consente alla rete di auto-ripararsi bruciando gli ETH dei validatori inattivi finché il loro saldo non raggiunge i 16 ETH, a quel punto saranno espulsi automaticamente dal pool di validatori. I restanti validatori online finiranno per costituire di nuovo oltre i 2/3 della rete, soddisfacendo la supermaggioranza necessaria per finalizzare nuovamente la catena.
</ExpandableCard>

<ExpandableCard title="Come posso assicurarmi di non subire uno slashing?">
In breve, non può mai essere garantito pienamente, ma se agisci in buona fede, esegui un client di minoranza e mantieni le chiavi di firma su una sola macchina alla volta, il rischio di subire un taglio è quasi nullo.

Ci sono solo alcuni modi specifici che possono comportare lo slashing di un validatore e la sua espulsione dalla rete. Al momento della stesura di questo articolo, gli slashing che si sono verificati sono stati esclusivamente il prodotto di configurazioni hardware ridondanti in cui le chiavi di firma sono memorizzate su due macchine separate contemporaneamente. Questo può inavvertitamente risultare in un <em>doppio voto</em> da parte delle tue chiavi, che è un'infrazione passibile di slashing.

L'esecuzione di un client di supermaggioranza (qualsiasi client utilizzato da oltre 2/3 della rete) comporta anche il rischio di potenziale slashing nel caso in cui questo client abbia un bug che si traduce in una biforcazione della catena. Questo può risultare in una biforcazione difettosa che viene finalizzata. Per tornare alla catena prevista sarebbe necessario inviare un <em>voto surround</em>, tentando di annullare un blocco finalizzato. Anche questa è un'infrazione passibile di slashing e può essere evitata semplicemente eseguendo un client di minoranza.

I bug equivalenti in un <em>client di minoranza non sarebbero mai finalizzati</em> e, ciò risulterebbe in un voto di contorno, con la semplice conseguenza di sanzioni d'inattività, <em>non tagli</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Scopri di più sull'importanza di eseguire un client di minoranza.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Scopri di più sulla prevenzione dei tagli</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Qual è il client migliore?">
I singoli client possono variare leggermente in termini di prestazioni e interfaccia utente, poiché ognuno è sviluppato da team diversi che utilizzano una varietà di linguaggi di programmazione. Detto ciò, nessuno di essi è il "migliore". Tutti i client di produzione sono software eccellenti, che svolgono tutti le stesse funzioni principali per sincronizzarsi e interagire con la blockchain.

Poiché tutti i client di produzione forniscono la stessa funzionalità di base, è in realtà molto importante che tu scelga un <strong>client di minoranza</strong>, ovvero qualsiasi client che NON sia attualmente utilizzato dalla maggioranza dei validatori sulla rete. Questo può sembrare controintuitivo, ma l'esecuzione di un client di maggioranza o supermaggioranza ti espone a un rischio maggiore di slashing in caso di bug in quel client. L'esecuzione di un client di minoranza limita drasticamente questi rischi.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Scopri di più sul perché la diversità dei client è fondamentale</a>
</ExpandableCard>

<ExpandableCard title="Posso usare semplicemente un VPS (server privato virtuale)?">
Sebbene un server privato virtuale (VPS) possa essere utilizzato in sostituzione dell'hardware domestico, l'accesso fisico e la posizione del tuo client validatore <em>sono importanti</em>. Le soluzioni cloud centralizzate come Amazon Web Services o Digital Ocean offrono la comodità di non dover ottenere e gestire l'hardware, a scapito della centralizzazione della rete.

Più client validatore vengono eseguiti su un'unica soluzione di archiviazione cloud centralizzata, più diventa pericoloso per questi utenti. Qualsiasi evento che metta offline questi fornitori, che si tratti di un attacco, di richieste normative o di semplici interruzioni di corrente/internet, farà sì che ogni client validatore che si affida a questo server vada offline contemporaneamente.

Le sanzioni per l'inattività sono proporzionali al numero di altri validatori offline contemporaneamente. L'utilizzo di un VPS aumenta notevolmente il rischio che le penalità per l'inattività siano più severe e aumenta il rischio di fuga quadratica o slashing nel caso in cui l'interruzione sia sufficientemente grande. Per ridurre al minimo il proprio rischio e quello della rete, gli utenti sono fortemente incoraggiati a procurarsi e a gestire il proprio hardware.
</ExpandableCard>

<ExpandableCard title="Come posso sbloccare le mie ricompense o riavere i miei ETH?">

I prelievi di ogni tipo dalla beacon chain richiedono l'impostazione delle credenziali di prelievo.

I nuovi staker impostano questo dato al momento della generazione della chiave e del deposito. Gli staker esistenti che non l'hanno ancora impostato possono aggiornare le loro chiavi per supportare questa funzionalità.

Una volta impostate le credenziali di prelievo, i pagamenti delle ricompense (gli ETH accumulati oltre i 32 iniziali) saranno distribuiti periodicamente e automaticamente all'indirizzo di prelievo.

Per sbloccare e ricevere il tuo intero saldo, devi inoltre completare il processo di uscita dal tuo validatore.

<ButtonLink href="/staking/withdrawals/">Maggiori informazioni sui prelievi dello staking</ButtonLink>
</ExpandableCard>

## Letture consigliate {#further-reading}

- [La Directory dello Staking di Ethereum](https://www.staking.directory/) - _Eridian e Spacesider_
- [Il problema della diversità dei client di Ethereum](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [Aiutare la diversità dei client](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [La diversità dei client sul livello di consenso di Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Come scegliere l'hardware per un validatore di Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Consigli per la prevenzione dei tagli di Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />
