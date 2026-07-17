---
title: Fai staking di ETH da casa
description: Una panoramica su come iniziare a fare staking di ETH da casa
lang: it
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: Il rinoceronte Leslie sul suo chip per computer.
sidebarDepth: 2
summaryPoints:
  - Ricevi le massime ricompense direttamente dal protocollo mantenendo il tuo validatore online e correttamente funzionante
  - Esegui l'hardware da casa e contribuisci personalmente alla sicurezza e alla decentralizzazione della rete Ethereum
  - Rimuovi la necessità di fiducia e non cedere mai il controllo delle chiavi dei tuoi fondi
---

## Cos'è lo staking da casa? {#what-is-solo-staking}

Lo staking da casa è l'atto di [eseguire un nodo Ethereum](/run-a-node/) connesso a internet e depositare 32 ETH per attivare un [validatore](#faq), dandoti la possibilità di partecipare direttamente al consenso della rete.

**Lo staking da casa aumenta la decentralizzazione della rete Ethereum**, rendendo [Ethereum](/) più resistente alla censura e robusto contro gli attacchi. Altri metodi di staking potrebbero non aiutare la rete allo stesso modo. Lo staking da casa è la migliore opzione di staking per proteggere Ethereum.

Un nodo Ethereum è composto sia da un client del livello di esecuzione (EL) che da un client del livello di consenso (CL). Questi client sono software che lavorano insieme, insieme a un set valido di chiavi di firma, per verificare transazioni e blocchi, attestare la corretta testa della catena, aggregare le attestazioni e proporre blocchi.

Gli staker da casa sono responsabili della gestione dell'hardware necessario per eseguire questi client. Si consiglia vivamente di utilizzare una macchina dedicata a questo scopo da gestire da casa: ciò è estremamente vantaggioso per la salute della rete.

Uno staker da casa riceve ricompense direttamente dal protocollo per mantenere il proprio validatore online e correttamente funzionante.

## Perché fare staking da casa? {#why-stake-solo}

Lo staking da casa comporta maggiori responsabilità, ma ti offre il massimo controllo sui tuoi fondi e sulla configurazione dello staking.

<Grid>
  <Card title="Guadagna nuovi ETH" emoji="💸" description="Guadagna ricompense denominate in ETH direttamente dal protocollo quando il tuo validatore è online, senza intermediari che trattengono una percentuale." />
  <Card title="Pieno controllo" emoji="🎛️" description="Conserva le tue chiavi. Scegli la combinazione di client e hardware che ti consente di ridurre al minimo i rischi e contribuire al meglio alla salute e alla sicurezza della rete. I servizi di staking di terze parti prendono queste decisioni per te e non sempre fanno le scelte più sicure." />
  <Card title="Sicurezza della rete" emoji="🔐" description="Lo staking da casa è il modo con il maggiore impatto per fare staking. Eseguendo un validatore sul tuo hardware a casa, rafforzi la robustezza, la decentralizzazione e la sicurezza del protocollo Ethereum." />
</Grid>

## Considerazioni prima di fare staking da casa {#considerations-before-staking-solo}

Per quanto vorremmo che lo staking da casa fosse accessibile e privo di rischi per tutti, questa non è la realtà. Ci sono alcune considerazioni pratiche e serie da tenere a mente prima di scegliere di fare staking di ETH da casa.

<ExpandableCard title="Letture obbligatorie" eventCategory="SoloStaking" eventName="clicked required reading">
Quando gestisci il tuo nodo dovresti dedicare del tempo a imparare come usare il software che hai scelto. Ciò comporta la lettura della documentazione pertinente e l'attenzione ai canali di comunicazione di quei team di sviluppo.

Più comprendi il software che stai eseguendo e come funziona la Proof-of-Stake (PoS), meno rischioso sarà come staker e più facile sarà risolvere eventuali problemi che potrebbero sorgere lungo il percorso come operatore del nodo.
</ExpandableCard>

<ExpandableCard title="Dimestichezza con i computer" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
La configurazione del nodo richiede un ragionevole livello di dimestichezza nel lavorare con i computer, sebbene i nuovi strumenti stiano rendendo questo processo più semplice nel tempo. La comprensione dell'interfaccia a riga di comando è utile, ma non più strettamente richiesta.

Richiede anche una configurazione hardware di base e una certa comprensione delle specifiche minime consigliate.
</ExpandableCard>

<ExpandableCard title="Gestione sicura delle chiavi" eventCategory="SoloStaking" eventName="clicked secure key management">
Proprio come le chiavi private proteggono il tuo indirizzo Ethereum, dovrai generare chiavi specifiche per il tuo validatore. Devi capire come mantenere al sicuro e protette eventuali frasi seed o chiavi private.{' '}

[Sicurezza di Ethereum e prevenzione delle truffe](/security/)
</ExpandableCard>

<ExpandableCard title="Manutenzione" eventCategory="SoloStaking" eventName="clicked maintenance">
L'hardware a volte si guasta, le connessioni di rete generano errori e il software client occasionalmente necessita di aggiornamenti. La manutenzione del nodo è inevitabile e richiederà occasionalmente la tua attenzione. Vorrai assicurarti di rimanere informato su eventuali aggiornamenti di rete previsti o altri aggiornamenti critici del client.
</ExpandableCard>

<ExpandableCard title="Uptime affidabile" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Le tue ricompense sono proporzionali al tempo in cui il tuo validatore è online e attesta correttamente. I tempi di inattività comportano penalità proporzionali a quanti altri validatori sono offline contemporaneamente, ma <a href="#faq">non comportano lo slashing</a>. Anche la larghezza di banda è importante, poiché le ricompense vengono ridotte per le attestazioni che non vengono ricevute in tempo. I requisiti variano, ma si consiglia un minimo di 10 Mb/s in upload e download.
</ExpandableCard>

<ExpandableCard title="Rischio di slashing" eventCategory="SoloStaking" eventName="clicked slashing risk">
A differenza delle penalità di inattività per essere offline, lo <em>slashing</em> è una penalità molto più grave riservata alle offese dannose. Eseguendo un client di minoranza con le tue chiavi caricate su una sola macchina alla volta, il rischio di subire lo slashing è ridotto al minimo. Detto questo, tutti gli staker devono essere consapevoli dei rischi dello slashing.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Maggiori informazioni sullo slashing e sul ciclo di vita del validatore</a>
</ExpandableCard>

<StakingComparison page="solo" />

## Come funziona {#how-it-works}

<StakingHowSoloWorks />

Mentre sei attivo guadagnerai ricompense in ETH, che verranno periodicamente depositate nel tuo indirizzo di prelievo.

Se lo desideri, puoi effettuare l'uscita come validatore, il che elimina il requisito di essere online e interrompe ulteriori ricompense. Il tuo saldo rimanente verrà quindi prelevato all'indirizzo di prelievo che hai designato durante la configurazione.

[Maggiori informazioni sui prelievi di staking](/staking/withdrawals/)

## Inizia sullo Staking Launchpad {#get-started-on-the-staking-launchpad}

Lo Staking Launchpad è un'applicazione open source che ti aiuterà a diventare uno staker. Ti guiderà nella scelta dei tuoi client, nella generazione delle tue chiavi e nel deposito dei tuoi ETH nel contratto di deposito di staking. Viene fornita una lista di controllo per assicurarti di aver coperto tutto per configurare il tuo validatore in modo sicuro.

<StakingLaunchpadWidget />

## Cosa considerare con gli strumenti di configurazione del nodo e del client {#node-tool-considerations}

C'è un numero crescente di strumenti e servizi per aiutarti a fare staking di ETH da casa, ma ognuno comporta rischi e vantaggi diversi.

Gli indicatori di attributo vengono utilizzati di seguito per segnalare notevoli punti di forza o di debolezza che uno strumento di staking elencato potrebbe avere. Usa questa sezione come riferimento per come definiamo questi attributi mentre scegli quali strumenti ti aiuteranno nel tuo percorso di staking.

<StakingConsiderations page="solo" />

## Esplora gli strumenti di configurazione del nodo e del client {#node-and-client-tools}

Sono disponibili diverse opzioni per aiutarti con la tua configurazione. Usa gli indicatori sopra per guidarti attraverso gli strumenti sottostanti.

<ProductDisclaimer />

### Strumenti per i nodi {#node-tools}

<StakingProductsCardGrid category="nodeTools" />

Tieni presente l'importanza di scegliere un [client di minoranza](/developers/docs/nodes-and-clients/client-diversity/) poiché migliora la sicurezza della rete e limita i tuoi rischi. Gli strumenti che ti consentono di configurare un client di minoranza sono indicati come <em style={{ textTransform: "uppercase" }}>"multi-client".</em>

### Generatori di chiavi {#key-generators}

Questi strumenti possono essere utilizzati come alternativa alla [CLI di deposito di staking](https://github.com/ethereum/staking-deposit-cli/) per aiutare con la generazione delle chiavi.

<StakingProductsCardGrid category="keyGen" />

Hai un suggerimento per uno strumento di staking che ci è sfuggito? Dai un'occhiata alla nostra [politica di inserimento dei prodotti](/contributing/adding-staking-products/) per vedere se sarebbe adatto e per inviarlo per la revisione.

## Esplora le guide allo staking da casa {#staking-guides}

<StakingGuides />

## Domande frequenti {#faq}

Queste sono alcune delle domande più comuni sullo staking che vale la pena conoscere.

<ExpandableCard title="Cos'è un validatore?">

Un <em>validatore</em> è un'entità virtuale che vive su Ethereum e partecipa al consenso del protocollo Ethereum. I validatori sono rappresentati da un saldo, una chiave pubblica e altre proprietà. Un <em>client del validatore</em> è il software che agisce per conto del validatore conservando e utilizzando la sua chiave privata. Un singolo client del validatore può contenere molte coppie di chiavi, controllando molti validatori.

</ExpandableCard>

<ExpandableCard title="Posso depositare più di 32 ETH?">
Sì, i moderni account dei validatori sono in grado di contenere fino a 2048 ETH. Gli ETH aggiuntivi oltre i 32 si accumuleranno in modo graduale, aumentando con incrementi di numeri interi all'aumentare del tuo saldo reale. Questo è noto come il tuo <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">saldo effettivo</a>.

Per aumentare il saldo effettivo di un account, e quindi aumentare le ricompense, deve essere superato un margine di 0,25 ETH al di sopra di qualsiasi soglia di ETH intero. Ad esempio, un account con un saldo reale di 32,9 e un saldo effettivo di 32 dovrebbe guadagnare altri 0,35 ETH per portare il suo saldo reale sopra 33,25 prima di innescare un aumento del saldo effettivo.

Questo margine impedisce anche che un saldo effettivo scenda finché non è sceso di 0,25 ETH al di sotto del suo attuale saldo effettivo.

Ogni coppia di chiavi associata a un validatore richiede almeno 32 ETH per essere attivata. Qualsiasi saldo superiore a questo può essere prelevato all'indirizzo di prelievo associato in qualsiasi momento tramite una transazione firmata da questo indirizzo. Eventuali fondi oltre il saldo effettivo massimo verranno automaticamente prelevati su base periodica.

Se lo staking da casa ti sembra troppo impegnativo, considera l'utilizzo di un fornitore di [staking-as-a-service](/staking/saas/), o se stai lavorando con meno di 32 ETH, dai un'occhiata ai [pool di staking](/staking/pools/).
</ExpandableCard>

<ExpandableCard title="Subirò lo slashing se vado offline? (tldr: No.)">
Andare offline quando la rete sta finalizzando correttamente NON comporterà lo slashing. Si incorre in piccole <em>penalità di inattività</em> se il tuo validatore non è disponibile per attestare per una determinata epoca (ciascuna della durata di 6,4 minuti), ma questo è molto diverso dallo <em>slashing</em>. Queste penalità sono leggermente inferiori alla ricompensa che avresti guadagnato se il validatore fosse stato disponibile per attestare, e le perdite possono essere recuperate con circa un uguale periodo di tempo di nuovo online.

Nota che le penalità per inattività sono proporzionali a quanti validatori sono offline contemporaneamente. Nei casi in cui un'ampia porzione della rete è tutta offline in una volta, le penalità per ciascuno di questi validatori saranno maggiori rispetto a quando un singolo validatore non è disponibile.

In casi estremi, se la rete smette di finalizzare a causa del fatto che più di un terzo dei validatori è offline, questi utenti subiranno quella che è nota come <em>perdita per inattività quadratica</em>, che è un drenaggio esponenziale di ETH dagli account dei validatori offline. Ciò consente alla rete di auto-ripararsi alla fine bruciando gli ETH dei validatori inattivi fino a quando il loro saldo non raggiunge i 16 ETH, a quel punto verranno automaticamente espulsi dal pool dei validatori. I restanti validatori online alla fine costituiranno di nuovo oltre i 2/3 della rete, soddisfacendo la supermaggioranza necessaria per finalizzare ancora una volta la catena.
</ExpandableCard>

<ExpandableCard title="Come mi assicuro di non subire lo slashing?">
In breve, questo non può mai essere completamente garantito, ma se agisci in buona fede, esegui un client di minoranza e mantieni le tue chiavi di firma solo su una macchina alla volta, il rischio di subire lo slashing è quasi zero.

Ci sono solo pochi modi specifici che possono portare un validatore a subire lo slashing e ad essere espulso dalla rete. Al momento della stesura, gli slashing che si sono verificati sono stati esclusivamente il prodotto di configurazioni hardware ridondanti in cui le chiavi di firma sono archiviate su due macchine separate contemporaneamente. Ciò può inavvertitamente provocare un <em>doppio voto</em> dalle tue chiavi, che è un'offesa punibile con lo slashing.

L'esecuzione di un client di supermaggioranza (qualsiasi client utilizzato da oltre i 2/3 della rete) comporta anche il rischio di un potenziale slashing nel caso in cui questo client abbia un bug che si traduce in un fork della catena. Ciò può provocare un fork difettoso che viene finalizzato. Per correggere e tornare alla catena prevista sarebbe necessario inviare un <em>voto circondante</em> (surround vote) cercando di annullare un blocco finalizzato. Anche questa è un'offesa punibile con lo slashing e può essere evitata semplicemente eseguendo invece un client di minoranza.

Bug equivalenti in un <em>client di minoranza non verrebbero mai finalizzati</em> e quindi non porterebbero mai a un voto circondante, e si tradurrebbero semplicemente in penalità di inattività, <em>non nello slashing</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Scopri di più sull'importanza di eseguire un client di minoranza.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Scopri di più sulla prevenzione dello slashing</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Qual è il client migliore?">
I singoli client possono variare leggermente in termini di prestazioni e interfaccia utente, poiché ciascuno è sviluppato da team diversi utilizzando una varietà di linguaggi di programmazione. Detto questo, nessuno di loro è "il migliore". Tutti i client di produzione sono eccellenti software, che svolgono tutti le stesse funzioni principali per la sincronizzazione e l'interazione con la blockchain.

Poiché tutti i client di produzione forniscono le stesse funzionalità di base, è in realtà molto importante scegliere un <strong>client di minoranza</strong>, ovvero qualsiasi client che NON è attualmente utilizzato dalla maggioranza dei validatori sulla rete. Questo potrebbe sembrare controintuitivo, ma l'esecuzione di un client di maggioranza o di supermaggioranza ti espone a un rischio maggiore di slashing in caso di bug in quel client. L'esecuzione di un client di minoranza limita drasticamente questi rischi.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Scopri di più sul perché la diversità dei client è fondamentale</a>
</ExpandableCard>

<ExpandableCard title="Posso usare semplicemente un VPS (server privato virtuale)?">
Sebbene un server privato virtuale (VPS) possa essere utilizzato in sostituzione dell'hardware domestico, l'accesso fisico e la posizione del tuo client del validatore <em>sono importanti</em>. Le soluzioni cloud centralizzate come Amazon Web Services o Digital Ocean offrono la comodità di non dover ottenere e gestire l'hardware, a scapito della centralizzazione della rete.

Più client del validatore sono in esecuzione su una singola soluzione di archiviazione cloud centralizzata, più diventa pericoloso per questi utenti. Qualsiasi evento che porti questi fornitori offline, che si tratti di un attacco, di richieste normative o semplicemente di interruzioni di corrente/internet, farà sì che ogni client del validatore che si affida a questo server vada offline contemporaneamente.

Le penalità offline sono proporzionali a quanti altri sono offline contemporaneamente. L'utilizzo di un VPS aumenta notevolmente il rischio che le penalità offline siano più gravi e aumenta il rischio di perdita per inattività quadratica o slashing nel caso in cui l'interruzione sia abbastanza grande. Per ridurre al minimo il proprio rischio e il rischio per la rete, gli utenti sono fortemente incoraggiati a ottenere e gestire il proprio hardware.
</ExpandableCard>

<ExpandableCard title="Come sblocco le mie ricompense o riottengo i miei ETH?">

I prelievi di qualsiasi tipo dalla Beacon Chain richiedono l'impostazione delle credenziali di prelievo.

I nuovi staker lo impostano al momento della generazione della chiave e del deposito. Gli staker esistenti che non lo hanno già impostato possono aggiornare le loro chiavi per supportare questa funzionalità.

Una volta impostate le credenziali di prelievo, i pagamenti delle ricompense (ETH accumulati oltre i 32 iniziali) verranno periodicamente distribuiti automaticamente all'indirizzo di prelievo.

Per sbloccare e ricevere indietro l'intero saldo devi anche completare il processo di uscita del tuo validatore.

<ButtonLink href="/staking/withdrawals/">Maggiori informazioni sui prelievi di staking</ButtonLink>
</ExpandableCard>

## Letture di approfondimento {#further-reading}

- [La directory dello staking di Ethereum](https://www.staking.directory/) - _Eridian e Spacesider_
- [Il problema della diversità dei client di Ethereum](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [Aiutare la diversità dei client](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Diversità dei client sul livello di consenso di Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Come fare: acquistare hardware per il validatore Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Suggerimenti per la prevenzione dello slashing su Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />