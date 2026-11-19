---
title: Fai staking di ETH da casa
description: Una panoramica su come iniziare a fare staking di ETH da casa
lang: it
template: staking
image: /images/staking/leslie-solo.png
sidebarDepth: 2
summaryPoints:
  - Ricevi le massime ricompense direttamente dal protocollo per mantenere il tuo validatore online e correttamente funzionante
  - Esegui l'hardware da casa e contribuisci personalmente alla sicurezza e alla decentralizzazione della rete Ethereum
  - Rimuovi la necessità di fiducia e non cedere mai il controllo delle chiavi dei tuoi fondi
---

## Cos'è lo staking da casa? {#what-is-solo-staking}

Lo staking da casa è l'atto di [eseguire un nodo Ethereum](/run-a-node/) connesso a Internet e depositare almeno 32 ETH per attivare un [validatore](#faq), dandoti la possibilità di partecipare direttamente al consenso della rete.

Lo staking da casa è il modo più diretto per fare staking. Nessuno smart contract, operatore o custode si frappone tra te e il protocollo. Detieni le tue chiavi, partecipi attivamente alla convalida della rete [Ethereum](/) e ricevi direttamente le ricompense della rete. Ogni altro metodo di staking aggiunge livelli di tecnologia, middleware o servizi al di sopra di questa attività di rete principale.

**Lo staking da casa aumenta la decentralizzazione della rete Ethereum**, rendendo Ethereum più resistente alla censura e robusto contro gli attacchi. Altri metodi di staking potrebbero non aiutare la rete allo stesso modo. Lo staking da casa è la migliore opzione di staking per proteggere Ethereum.

Un nodo Ethereum è costituito sia da un client del livello di esecuzione (EL) che da un client del livello di consenso (CL). Questi client sono software che lavorano insieme, insieme a un set valido di chiavi di firma, per verificare transazioni e blocchi, attestare la corretta testa della catena, aggregare le attestazioni e proporre blocchi.

Gli staker da casa sono responsabili del funzionamento dell'hardware necessario per eseguire questi client. Si consiglia vivamente di utilizzare una macchina dedicata a questo scopo da gestire da casa: ciò è estremamente vantaggioso per la salute della rete.

Uno staker da casa riceve ricompense direttamente dal protocollo per mantenere il proprio validatore online e correttamente funzionante.

## Perché fare staking da casa? {#why-stake-solo}

Lo staking da casa comporta maggiori responsabilità, ma ti offre il massimo controllo sui tuoi fondi e sulla configurazione dello staking.

<Grid>
  <Card title="Mantieni tutte le ricompense" icon={<HandCoins />} description="Gli staker da casa ricevono il 100% delle ricompense del protocollo, pagate direttamente dal protocollo mentre il validatore è online." />
  <Card title="Auto-sovranità" icon={<KeyRound />} description="Mantieni le tue chiavi e la piena custodia dei tuoi fondi in ogni momento. Scegli la combinazione di client e hardware che ti consente di ridurre al minimo i rischi. Nessuna terza parte può prendere queste decisioni per te o limitare i tuoi prelievi." />
  <Card title="Diversità dei client e geografica" icon={<GlobeLock />} description="Gli staker da casa che eseguono client di minoranza su hardware distribuito in molte posizioni rafforzano la decentralizzazione e la sicurezza della rete." />
</Grid>

## Considerazioni prima di fare staking da casa {#considerations-before-staking-solo}

Per quanto vorremmo che lo staking da casa fosse accessibile e privo di rischi per tutti, questa non è la realtà. Ci sono alcune considerazioni pratiche e serie da tenere a mente prima di scegliere di mettere in staking i tuoi ETH da casa.

<ExpandableCard title="Lettura obbligatoria" eventCategory="SoloStaking" eventName="clicked required reading">
Quando gestisci il tuo nodo dovresti dedicare un po' di tempo a imparare come utilizzare il software che hai scelto. Ciò comporta la lettura della documentazione pertinente e l'attenzione ai canali di comunicazione di quei team di sviluppo.

Più comprendi il software che stai eseguendo e come funziona la Proof-of-Stake (PoS), meno rischioso sarà come staker e più facile sarà risolvere eventuali problemi che potrebbero sorgere lungo il percorso come operatore del nodo.
</ExpandableCard>

<ExpandableCard title="Dimestichezza con i computer" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
La configurazione del nodo richiede un ragionevole livello di dimestichezza nel lavorare con i computer, sebbene i nuovi strumenti stiano rendendo questo processo più semplice nel tempo. La comprensione dell'interfaccia a riga di comando è utile, ma non più strettamente necessaria.

Richiede anche una configurazione hardware di base e una certa comprensione delle specifiche minime consigliate.
</ExpandableCard>

<ExpandableCard title="Requisiti hardware" eventCategory="SoloStaking" eventName="clicked hardware requirements">
Le attuali linee guida della community per l'hardware e la larghezza di banda del validatore sono mantenute nelle [raccomandazioni su hardware e larghezza di banda (EIP-7870)](https://eips.ethereum.org/EIPS/eip-7870). Come guida approssimativa, pianifica un SSD NVMe da 4 TB, 64 GB di RAM (può funzionare anche con meno, ma questo è il margine consigliato), una solida e moderna CPU multi-core e una connessione Internet di circa 50 Mbps in download / 25 Mbps in upload.

Poiché l'aggiornamento Fusaka ha introdotto PeerDAS, un nodo di staking deve solo archiviare e scaricare una frazione dei dati blob della rete, riducendo significativamente i requisiti di disco e larghezza di banda per gli staker da casa.
</ExpandableCard>

<ExpandableCard title="Gestione sicura delle chiavi" eventCategory="SoloStaking" eventName="clicked secure key management">
Proprio come le chiavi private proteggono il tuo indirizzo Ethereum, dovrai generare chiavi specifiche per il tuo validatore. Devi capire come mantenere al sicuro eventuali frasi seme (seed phrase) o chiavi private.{' '}

[Sicurezza di Ethereum e prevenzione delle truffe](/security/)
</ExpandableCard>

<ExpandableCard title="Manutenzione" eventCategory="SoloStaking" eventName="clicked maintenance">
L'hardware a volte si guasta, le connessioni di rete generano errori e il software client occasionalmente necessita di aggiornamenti. La manutenzione del nodo è inevitabile e occasionalmente richiederà la tua attenzione. Vorrai assicurarti di rimanere informato su eventuali aggiornamenti di rete previsti o altri aggiornamenti critici del client.
</ExpandableCard>

<ExpandableCard title="Uptime affidabile" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Le tue ricompense sono proporzionali al tempo in cui il tuo validatore è online e attesta correttamente. Il tempo di inattività comporta penalità proporzionali a quanti altri validatori sono offline contemporaneamente, ma [non comporta lo slashing](#faq). Anche la larghezza di banda è importante, poiché le ricompense vengono ridotte per le attestazioni che non vengono ricevute in tempo. I requisiti varieranno, ma le attuali [raccomandazioni su hardware e larghezza di banda (EIP-7870)](https://eips.ethereum.org/EIPS/eip-7870) suggeriscono circa 50 Mbps in download e 25 Mbps in upload.
</ExpandableCard>

<ExpandableCard title="Rischio di slashing" eventCategory="SoloStaking" eventName="clicked slashing risk">
A differenza delle penalità di inattività per essere offline, lo <em>slashing</em> è una penalità molto più grave riservata alle infrazioni dannose. Eseguendo un client di minoranza con le tue chiavi caricate su una sola macchina alla volta, il rischio di subire lo slashing è ridotto al minimo. Detto questo, tutti gli staker devono essere consapevoli dei rischi dello slashing.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Maggiori informazioni sullo slashing e sul ciclo di vita del validatore</a>
</ExpandableCard>

## Confronto delle opzioni di staking {#comparison-of-staking-options}

<StakingComparison page="solo" />

## Come funziona {#how-it-works}

<StakingHowSoloWorks />

Una volta che il tuo nodo è sincronizzato e le tue chiavi sono generate, depositi il tuo stake per attivare il tuo validatore. Un singolo validatore richiede un minimo di 32 ETH e può contenere fino a 2048 ETH. La rete riconosce i depositi in circa 13 minuti, ma i nuovi validatori passano attraverso una coda di attivazione prima di iniziare ad attestare; la sua lunghezza varia in base alla domanda.

Mentre sei attivo guadagnerai ricompense in ETH. Con le credenziali di prelievo composte (0x02), le ricompense vengono aggiunte automaticamente al tuo stake; con le credenziali di prelievo regolari (0x01), le ricompense superiori ai 32 ETH iniziali vengono periodicamente trasferite al tuo indirizzo di prelievo.

Se lo desideri, puoi uscire come validatore, il che elimina il requisito di essere online e interrompe qualsiasi ulteriore ricompensa. Il saldo rimanente verrà quindi prelevato all'indirizzo di prelievo designato durante la configurazione. Le uscite possono essere avviate con le chiavi di firma del validatore o attivate direttamente dal tuo indirizzo di prelievo con una transazione del livello di esecuzione, in modo che il controllo finale dei tuoi fondi spetti sempre al tuo indirizzo di prelievo.

### Interesse composto e il massimo di 2048 ETH {#compounding}

I validatori hanno uno dei due tipi di credenziali di prelievo:

- **Prelievi regolari (0x01)**: il saldo effettivo del validatore è limitato a 32 ETH e qualsiasi saldo superiore a tale importo viene automaticamente trasferito al tuo indirizzo di prelievo ogni pochi giorni.
- **Composto (0x02)**: il saldo effettivo del validatore può crescere fino a 2048 ETH. Le ricompense si compongono automaticamente e guadagni ricompense su ogni ETH intero al di sopra del minimo di 32 ETH, quindi puoi mettere in staking importi flessibili come 40 ETH, non solo multipli di 32. Solo il saldo superiore a 2048 ETH viene trasferito automaticamente; prelevare qualsiasi altra cosa significa attivare manualmente un prelievo parziale dal tuo indirizzo di prelievo, il che costa gas.

Se esegui più validatori, puoi consolidarli in un singolo validatore composto senza uscire e rientrare nella rete, riducendo i costi di manutenzione. Il consolidamento viene richiesto dal tuo indirizzo di prelievo ed è soggetto a code di elaborazione. Il passaggio di un validatore dalle credenziali 0x01 a 0x02 utilizza questo stesso meccanismo e **non può essere annullato** senza uscire completamente e depositare di nuovo.

[Maggiori informazioni sui prelievi di staking](/staking/withdrawals/)

## Inizia sullo Staking Launchpad {#get-started-on-the-staking-launchpad}

Lo Staking Launchpad è un'applicazione open source che ti aiuterà a diventare uno staker. Ti guiderà nella scelta dei tuoi client, genererà le tue chiavi e depositerà i tuoi ETH nel contratto di deposito di staking. Viene fornita una lista di controllo per assicurarti di aver coperto tutto per configurare il tuo validatore in modo sicuro.

<StakingLaunchpadWidget />

## Cosa considerare con gli strumenti di configurazione del nodo e del client {#node-tool-considerations}

C'è un numero crescente di strumenti e servizi per aiutarti a fare staking dei tuoi ETH da casa, ma ognuno comporta rischi e vantaggi diversi.

Gli indicatori di attributo vengono utilizzati di seguito per segnalare notevoli punti di forza o di debolezza che uno strumento di staking elencato potrebbe avere. Usa questa sezione come riferimento per come definiamo questi attributi mentre scegli quali strumenti ti aiuteranno nel tuo percorso di staking.

<StakingConsiderations page="solo" />

## Esplora gli strumenti di configurazione del nodo e del client {#node-and-client-tools}

Sono disponibili diverse opzioni per aiutarti con la configurazione. Usa gli indicatori sopra per guidarti attraverso gli strumenti sottostanti.

<ProductDisclaimer />

### Strumenti per i nodi {#node-tools}

<StakingProductsCardGrid category="nodeTools" />

Tieni presente l'importanza di scegliere un [client di minoranza](/developers/docs/nodes-and-clients/client-diversity/) in quanto migliora la sicurezza della rete e limita i tuoi rischi. Gli strumenti che ti consentono di configurare client di minoranza sono indicati come <em style={{ textTransform: "uppercase" }}>"multi-client".</em>

### Generatori di chiavi {#key-generators}

Questi strumenti possono essere utilizzati in alternativa alla [CLI di deposito di staking](https://github.com/ethereum/staking-deposit-cli/) per aiutare con la generazione delle chiavi.

<StakingProductsCardGrid category="keyGen" />

Hai un suggerimento per uno strumento di staking che ci è sfuggito? Dai un'occhiata alla nostra [politica di inserimento dei prodotti](/contributing/adding-staking-products/) per vedere se sarebbe adatto e per inviarlo per la revisione.

## Esplora le guide allo staking da casa {#staking-guides}

<StakingGuides />

## Squad staking: staking da casa con tolleranza agli errori {#squad-staking}

La **tecnologia dei validatori distribuiti (DVT)** consente a un singolo validatore di essere eseguito su un cluster di macchine anziché su una sola. La chiave del validatore è divisa in quote utilizzando la generazione di chiavi distribuite e una soglia del cluster (ad esempio, 3 nodi qualsiasi su 4) deve firmare insieme; la chiave completa non esiste mai su una singola macchina. Se una macchina si guasta, va offline o è configurata in modo errato, il resto del cluster mantiene il validatore in attestazione.

Per gli staker da casa questo abilita lo "squad staking": fare squadra con amici o altri membri della community per eseguire validatori insieme, rimuovendo i singoli punti di errore di una configurazione in solitaria e riducendo il rischio di slashing da una singola macchina malfunzionante. Obol e SSV Network forniscono entrambi implementazioni DVT di produzione, utilizzate oggi nello staking da casa, nello staking come servizio e nelle pool di staking.

[Maggiori informazioni sulla tecnologia dei validatori distribuiti (DVT)](/staking/dvt/)

## Esegui validatori per un protocollo di staking {#run-validators-for-a-staking-protocol}

Se hai l'hardware e le competenze per eseguire un nodo ma meno di 32 ETH, alcuni protocolli di staking abbineranno il tuo validatore con gli ETH dei loro staker in pool. Depositi una cauzione più piccola come collaterale ed esegui il validatore sulla tua macchina; il protocollo fornisce il resto dello stake e tu guadagni una quota delle ricompense.

Questo è un approccio ibrido: mantieni le responsabilità (e la soddisfazione) di gestire il tuo hardware, ma il tuo validatore opera in base agli smart contract, alla governance e alle regole di prestazione del protocollo, il che rappresenta un profilo di fiducia diverso rispetto allo staking diretto dei tuoi ETH.

Scopri di più su come funzionano questi protocolli, incluse le loro assunzioni di fiducia e le meccaniche dei token, sulla [pagina dello staking in pool](/staking/pools/).

## Altri modi per utilizzare il tuo nodo {#more-ways-to-use-your-node}

Non è necessario fare staking per mettere a frutto le competenze operative del nodo. Chiunque può [eseguire un nodo Ethereum](/run-a-node/) senza depositare alcun ETH. Ottieni una visione auto-verificata della catena, il tuo endpoint privato per l'invio di transazioni e l'interazione con le applicazioni e contribuisci alla salute e alla resilienza della rete. Eseguire un nodo è anche un buon modo per accumulare esperienza prima di attivare un validatore, senza alcun ETH a rischio.

<StakingCommunityCallout className="my-16" />

## Domande frequenti {#faq}

Queste sono alcune delle domande più comuni sullo staking che vale la pena conoscere.

<ExpandableCard title="Cos'è un validatore?">

Un <em>validatore</em> è un'entità virtuale che vive su Ethereum e partecipa al consenso del protocollo Ethereum. I validatori sono rappresentati da un saldo, una chiave pubblica e altre proprietà. Un <em>client del validatore</em> è il software che agisce per conto del validatore detenendo e utilizzando la sua chiave privata. Un singolo client del validatore può contenere molte coppie di chiavi, controllando molti validatori.

</ExpandableCard>

<ExpandableCard title="Posso depositare più di 32 ETH?">
Sì. Un validatore con credenziali di prelievo <em>composte</em> (0x02) può detenere un saldo effettivo fino a 2048 ETH, mentre il minimo per l'attivazione rimane 32 ETH. Le ricompense su un validatore composto vengono aggiunte automaticamente al suo stake e guadagna ricompense su ogni ETH intero al di sopra del minimo di 32 ETH, quindi puoi mettere in staking importi che non sono multipli di 32. Vedi [Interesse composto e il massimo di 2048 ETH](#compounding).

I validatori con credenziali di <em>prelievi regolari</em> (0x01) rimangono limitati a un saldo effettivo di 32 ETH, con qualsiasi saldo superiore a tale importo trasferito automaticamente all'indirizzo di prelievo ogni pochi giorni.

Per un validatore composto, solo il saldo superiore al massimo di 2048 ETH viene trasferito automaticamente. Per prelevare qualsiasi importo inferiore, attivi un prelievo parziale dal tuo indirizzo di prelievo (una transazione che costa gas), che può prelevare qualsiasi saldo superiore al minimo di 32 ETH. Se esegui più validatori, puoi anche consolidarli in un singolo validatore composto senza uscire dalla rete.

[Maggiori informazioni sui prelievi di staking](/staking/withdrawals/)
</ExpandableCard>

<ExpandableCard title="Subirò lo slashing se vado offline? (tldr: No.)">
Andare offline quando la rete sta finalizzando correttamente NON comporterà lo slashing. Piccole <em>penalità di inattività</em> vengono incorse se il tuo validatore non è disponibile per attestare per una determinata epoca (ciascuna della durata di 6,4 minuti), ma questo è molto diverso dallo <em>slashing</em>. Queste penalità sono leggermente inferiori alla ricompensa che avresti guadagnato se il validatore fosse stato disponibile per attestare e le perdite possono essere recuperate con un periodo di tempo approssimativamente uguale di nuovo online.

Nota che le penalità per inattività sono proporzionali a quanti validatori sono offline contemporaneamente. Nei casi in cui gran parte della rete è tutta offline contemporaneamente, le penalità per ciascuno di questi validatori saranno maggiori rispetto a quando un singolo validatore non è disponibile.

In casi estremi, se la rete smette di finalizzare a causa del fatto che più di un terzo dei validatori è offline, questi utenti subiranno quella che è nota come <em>perdita per inattività quadratica</em>, che è un drenaggio esponenziale di ETH dagli account dei validatori offline. Ciò consente alla rete di auto-ripararsi alla fine bruciando gli ETH dei validatori inattivi fino a quando il loro saldo non raggiunge i 16 ETH, a quel punto verranno automaticamente espulsi dalla pool dei validatori. I restanti validatori online alla fine comprenderanno di nuovo oltre i 2/3 della rete, soddisfacendo la supermaggioranza necessaria per finalizzare ancora una volta la catena.
</ExpandableCard>

<ExpandableCard title="Come mi assicuro di non subire lo slashing?">
In breve, questo non può mai essere completamente garantito, ma se agisci in buona fede, esegui un client di minoranza e mantieni le tue chiavi di firma solo su una macchina alla volta, il rischio di subire lo slashing è quasi zero.

Ci sono solo pochi modi specifici che possono portare un validatore a subire lo slashing e ad essere espulso dalla rete. Al momento della stesura, gli slashing che si sono verificati sono stati esclusivamente il prodotto di configurazioni hardware ridondanti in cui le chiavi di firma sono archiviate su due macchine separate contemporaneamente. Ciò può inavvertitamente provocare un <em>doppio voto</em> dalle tue chiavi, che è un'infrazione passibile di slashing.

L'esecuzione di un client di supermaggioranza (qualsiasi client utilizzato da oltre i 2/3 della rete) comporta anche il rischio di potenziale slashing nel caso in cui questo client abbia un bug che si traduce in un fork della catena. Ciò può provocare un fork difettoso che viene finalizzato. Per correggere e tornare alla catena prevista sarebbe necessario inviare un <em>voto di accerchiamento (surround vote)</em> cercando di annullare un blocco finalizzato. Anche questa è un'infrazione passibile di slashing e può essere evitata semplicemente eseguendo un client di minoranza.

Bug equivalenti in un <em>client di minoranza non verrebbero mai finalizzati</em> e quindi non si tradurrebbero mai in un voto di accerchiamento, e si tradurrebbero semplicemente in penalità di inattività, <em>non in slashing</em>.

<ul>
  <li><a href="https://clientdiversity.org/">Scopri di più sull'importanza di eseguire un client di minoranza.</a></li>
  <li><a href="/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/">Scopri di più su ricompense, penalità e slashing</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Qual è il client migliore?">
I singoli client possono variare leggermente in termini di prestazioni e interfaccia utente, poiché ciascuno è sviluppato da team diversi utilizzando una varietà di linguaggi di programmazione. Detto questo, nessuno di loro è "il migliore". Tutti i client di produzione sono eccellenti software, che svolgono tutti le stesse funzioni principali per sincronizzare e interagire con la blockchain.

Poiché tutti i client di produzione forniscono le stesse funzionalità di base, è in realtà molto importante scegliere un <strong>client di minoranza</strong>, ovvero qualsiasi client che NON è attualmente utilizzato dalla maggioranza dei validatori sulla rete. Questo può sembrare controintuitivo, ma l'esecuzione di un client di maggioranza o supermaggioranza ti espone a un rischio maggiore di slashing in caso di bug in quel client. L'esecuzione di un client di minoranza limita drasticamente questi rischi.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Scopri di più sul perché la diversità dei client è fondamentale</a>
</ExpandableCard>

<ExpandableCard title="Posso usare semplicemente una VPS (virtual private server)?">
Sebbene un server privato virtuale (VPS) possa essere utilizzato in sostituzione dell'hardware domestico, l'accesso fisico e la posizione del client del validatore <em>sono importanti</em>. Le soluzioni cloud centralizzate come Amazon Web Services o Digital Ocean offrono la comodità di non dover ottenere e gestire l'hardware, a scapito della centralizzazione della rete.

Più client del validatore sono in esecuzione su un'unica soluzione di archiviazione cloud centralizzata, più diventa pericoloso per questi utenti. Qualsiasi evento che porti offline questi provider, che si tratti di un attacco, di richieste normative o semplicemente di interruzioni di corrente/Internet, farà sì che ogni client del validatore che si affida a questo server vada offline contemporaneamente.

Le penalità offline sono proporzionali a quanti altri sono offline contemporaneamente. L'utilizzo di un VPS aumenta notevolmente il rischio che le penalità offline siano più gravi e aumenta il rischio di perdita per inattività quadratica o slashing nel caso in cui l'interruzione sia abbastanza grande. Per ridurre al minimo il proprio rischio e il rischio per la rete, gli utenti sono fortemente incoraggiati a ottenere e gestire il proprio hardware.
</ExpandableCard>

<ExpandableCard title="Come sblocco le mie ricompense o riottengo i miei ETH?">

Ogni prelievo richiede che il tuo validatore abbia un indirizzo di prelievo impostato. I nuovi staker lo impostano al momento della generazione delle chiavi e del deposito. Gli staker dei primi giorni della rete che non hanno ancora impostato un indirizzo di prelievo dovranno aggiornare le proprie credenziali di prelievo prima di prelevare.

Per i validatori con credenziali di prelievi regolari (0x01), i pagamenti delle ricompense (ETH accumulati oltre i 32 iniziali) vengono periodicamente distribuiti automaticamente all'indirizzo di prelievo. Per i validatori composti (0x02), le ricompense rimangono in staking e si compongono automaticamente. Puoi prelevare qualsiasi saldo superiore a 32 ETH attivando un prelievo parziale dal tuo indirizzo di prelievo.

Per sbloccare e ricevere indietro l'intero saldo devi uscire dal tuo validatore. Puoi farlo utilizzando le chiavi di firma del tuo validatore o attivarlo direttamente dal tuo indirizzo di prelievo con una transazione del livello di esecuzione, il che significa che i tuoi fondi rimangono recuperabili anche se le tue chiavi di firma vengono perse.

<ButtonLink href="/staking/withdrawals/">Maggiori informazioni sui prelievi di staking</ButtonLink>
</ExpandableCard>

## Letture consigliate {#further-reading}

- [Statistiche sulla diversità dei client e guide alla migrazione](https://clientdiversity.org/)
- [Aiutare la diversità dei client](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Diversità dei client sul livello di consenso di Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Come fare: acquistare hardware per il validatore Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [EIP-7870: Raccomandazioni su hardware e larghezza di banda](https://eips.ethereum.org/EIPS/eip-7870)
- [L'aggiornamento Pectra: saldo effettivo massimo e altro](/roadmap/pectra/maxeb/)

<QuizWidget quizKey="staking-solo" />