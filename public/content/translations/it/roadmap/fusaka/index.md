---
title: Fulu-Osaka (Fusaka)
description: "Scopri di più sull'aggiornamento del protocollo Fusaka"
lang: it
---

# Fusaka <Emoji text="🦓" /> {#fusaka}

**L'attesissimo aggiornamento Fusaka di Ethereum è stato attivato il 3 dicembre 2025**

L'aggiornamento della rete Fusaka segue [Pectra](/roadmap/pectra/) e introduce nuove funzionalità, migliorando l'esperienza per ogni utente e sviluppatore di Ethereum. Il nome è composto dall'aggiornamento del livello di esecuzione Osaka e dalla versione del livello di consenso che prende il nome dalla stella Fulu. Entrambe le parti di Ethereum ricevono un aggiornamento che proietta la scalabilità, la sicurezza e l'esperienza utente di Ethereum nel futuro.

<Alert variant="update">
<AlertContent>
<AlertDescription>
L'aggiornamento Fusaka è solo un singolo passo negli obiettivi di sviluppo a lungo termine di Ethereum. Scopri di più sulla [tabella di marcia del protocollo](/roadmap/) e sugli [aggiornamenti precedenti](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Miglioramenti in Fusaka {#improvements-in-fusaka}

### Scalabilità dei blob {#scale-blobs}

#### PeerDAS {#peerdas}

Questa è la _novità principale_ della biforcazione Fusaka, la funzionalità più importante aggiunta in questo aggiornamento. I Layer 2 attualmente pubblicano i loro dati su Ethereum in blob, il tipo di dati effimero creato appositamente per i Layer 2. Prima di Fusaka, ogni nodo completo doveva archiviare ogni blob per garantire l'esistenza dei dati. Con l'aumento del throughput dei blob, il download di tutti questi dati diventa insostenibile in termini di risorse.

Con il [campionamento della disponibilità dei dati](https://notes.ethereum.org/@fradamt/das-fork-choice), invece di dover archiviare tutti i dati dei blob, ogni nodo sarà responsabile di un sottoinsieme dei dati dei blob. I blob sono distribuiti in modo casuale e uniforme tra i nodi della rete, con ogni nodo completo che detiene solo 1/8 dei dati, consentendo così una scalabilità teorica fino a 8x. Per garantire la disponibilità dei dati, qualsiasi porzione dei dati può essere ricostruita da un qualsiasi 50% esistente del totale, con metodi che riducono la probabilità di dati errati o mancanti a un livello crittograficamente trascurabile (da ~uno su 10<sup>20</sup> a uno su 10<sup>24</sup>).

Ciò mantiene sostenibili i requisiti hardware e di larghezza di banda per i nodi, abilitando al contempo la scalabilità dei blob, con conseguente maggiore scalabilità e commissioni più basse per i Layer 2.

[Scopri di più su PeerDAS](/roadmap/fusaka/peerdas/)

**Risorse**:

- [Specifica tecnica dell'EIP-7594](https://eips.ethereum.org/EIPS/eip-7594)
- [DappLion su PeerDAS: scalare Ethereum oggi | ETHSofia 2024](https://youtu.be/bONWd1x2TjQ?t=328)
- [Accademico: una documentazione del PeerDAS di Ethereum (PDF)](https://eprint.iacr.org/2024/1362.pdf)

#### Fork solo per parametri blob {#blob-parameter-only-forks}

I Layer 2 scalano Ethereum: man mano che le loro reti crescono, devono pubblicare più dati su Ethereum. Ciò significa che Ethereum dovrà aumentare il numero di blob a loro disposizione nel tempo. Sebbene PeerDAS consenta la scalabilità dei dati dei blob, è necessario farlo in modo graduale e sicuro.

Poiché Ethereum è un codice in esecuzione su migliaia di nodi indipendenti che richiedono un accordo sulle stesse regole, non possiamo semplicemente introdurre modifiche come l'aumento del conteggio dei blob allo stesso modo in cui si distribuisce un aggiornamento di un sito web. Qualsiasi modifica delle regole deve essere un aggiornamento coordinato in cui ogni software di nodo, client e validatore si aggiorna prima dello stesso blocco predeterminato.

Questi aggiornamenti coordinati generalmente includono molti cambiamenti, richiedono molti test e ciò richiede tempo. Per adattarsi più rapidamente alle mutevoli esigenze dei blob dei Layer 2, i fork solo per parametri blob introducono un meccanismo per aumentare i blob senza dover attendere il programma di aggiornamento.

I fork solo per parametri blob possono essere impostati dai client, in modo simile ad altre configurazioni come il limite di gas. Tra i principali aggiornamenti di Ethereum, i client possono concordare di aumentare i blob `target` e `max` a, ad esempio, 9 e 12, e quindi gli operatori dei nodi si aggiorneranno per partecipare a quel piccolo fork. Questi fork solo per parametri blob possono essere configurati in qualsiasi momento.

Quando i blob furono aggiunti per la prima volta alla rete con l'aggiornamento Dencun, il target era 3. Questo valore è stato aumentato a 6 in Pectra e, dopo Fusaka, può ora essere aumentato a un ritmo sostenibile indipendentemente da questi importanti aggiornamenti di rete.

![Grafico che mostra il conteggio medio dei blob per blocco e l'aumento dei target con gli aggiornamenti](./average-blob-count-per-block.webp)

Fonte del grafico: [Ethereum Blobs - @hildobby, Dune Analytics](https://dune.com/hildobby/blobs)

**Risorse**: [Specifica tecnica dell'EIP-7892](https://eips.ethereum.org/EIPS/eip-7892)

#### Commissione di base dei blob limitata dai costi di esecuzione {#blob-base-fee-bounded-by-execution-costs}

I Layer 2 pagano due conti quando pubblicano i dati: la commissione del blob e il gas di esecuzione necessario per verificare tali blob. Se il gas di esecuzione domina, l'asta della commissione del blob può scendere a 1 wei e smettere di essere un segnale di prezzo.

L'EIP-7918 fissa un prezzo di riserva proporzionale per ogni blob. Quando la riserva è superiore alla commissione di base nominale del blob, l'algoritmo di aggiustamento della commissione considera il blocco come sopra il target, smette di spingere la commissione verso il basso e le consente di aumentare normalmente. Di conseguenza:

- il mercato delle commissioni dei blob reagisce sempre alla congestione
- i Layer 2 pagano almeno una fetta significativa del calcolo che impongono ai nodi
- i picchi della commissione di base sull'EL non possono più bloccare la commissione del blob a 1 wei

**Risorse**:

- [Specifica tecnica dell'EIP-7918](https://eips.ethereum.org/EIPS/eip-7918)
- [Spiegazione di Storybook](https://notes.ethereum.org/@anderselowsson/AIG)

### Scalabilità L1 {#scale-l1}

#### Scadenza della cronologia e ricevute più semplici {#history-expiry}

Nel luglio 2025, i client di esecuzione di Ethereum [hanno iniziato a supportare la scadenza parziale della cronologia](https://blog.ethereum.org/2025/07/08/partial-history-exp). Questo ha eliminato la cronologia più vecchia della [Fusione (Merge)](https://ethereum.org/roadmap/merge/) per ridurre lo spazio su disco richiesto dagli operatori dei nodi man mano che Ethereum continua a crescere.

Questo EIP si trova in una sezione separata dagli "EIP Core" perché il fork non implementa effettivamente alcuna modifica: è un avviso che i team dei client devono supportare la scadenza della cronologia entro l'aggiornamento Fusaka. In pratica, i client possono implementarlo in qualsiasi momento, ma aggiungerlo all'aggiornamento lo ha inserito concretamente nella loro lista di cose da fare e ha permesso loro di testare le modifiche di Fusaka insieme a questa funzionalità.

**Risorse**: [Specifica tecnica dell'EIP-7642](https://eips.ethereum.org/EIPS/eip-7642)

#### Imposta limiti superiori per MODEXP {#set-upper-bounds-for-modexp}

Fino ad ora, la precompilazione MODEXP accettava numeri di dimensioni virtualmente qualsiasi. Ciò lo rendeva difficile da testare, facile da abusare e rischioso per la stabilità del client. L'EIP-7823 stabilisce un limite chiaro: ogni numero di input può avere una lunghezza massima di 8192 bit (1024 byte). Qualsiasi valore più grande viene rifiutato, il gas della transazione viene bruciato e non si verificano cambiamenti di stato. Copre molto comodamente le esigenze del mondo reale, eliminando i casi estremi che complicavano la pianificazione del limite di gas e le revisioni di sicurezza. Questa modifica fornisce maggiore sicurezza e protezione da attacchi DoS senza influire sull'esperienza dell'utente o dello sviluppatore.

**Risorse**: [Specifica tecnica dell'EIP-7823](https://eips.ethereum.org/EIPS/eip-7823)

#### Limite massimo di gas per transazione {#transaction-gas-limit-cap}

L'EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) aggiunge un limite massimo di 16.777.216 (2^24) di gas per transazione. È un rafforzamento proattivo contro gli attacchi DoS, che limita il costo nel caso peggiore di ogni singola transazione mentre aumentiamo il limite di gas del blocco. Semplifica la modellazione della validazione e della propagazione per consentirci di affrontare la scalabilità aumentando il limite di gas.

Perché esattamente 2^24 di gas? È comodamente più piccolo del limite di gas attuale, è abbastanza grande per le distribuzioni di contratti reali e per precompilazioni pesanti, e una potenza di 2 lo rende facile da implementare su tutti i client. Questa nuova dimensione massima della transazione è simile alla dimensione media del blocco pre-Pectra, rendendola un limite ragionevole per qualsiasi operazione su Ethereum.

**Risorse**: [Specifica tecnica dell'EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)

#### Aumento del costo del gas di `MODEXP` {#modexp-gas-cost-increase}

MODEXP è una funzione precompilata integrata che calcola l'esponenziazione modulare, un tipo di calcolo su numeri grandi utilizzato nella verifica delle firme RSA e nei sistemi di prova. Consente ai contratti di eseguire questi calcoli direttamente senza doverli implementare da soli.

Sviluppatori e team dei client hanno identificato MODEXP come un ostacolo principale all'aumento del limite di gas del blocco, perché il prezzo attuale del gas spesso sottostima la potenza di calcolo richiesta da determinati input. Ciò significa che una singola transazione che utilizza MODEXP potrebbe occupare la maggior parte del tempo necessario per elaborare un intero blocco, rallentando la rete.

Questo EIP modifica il prezzo per farlo corrispondere ai costi computazionali reali:

- aumentando il costo minimo da 200 a 500 gas e rimuovendo lo sconto di un terzo dell'EIP-2565 dal calcolo del costo generale
- aumentando il costo in modo più marcato quando l'input dell'esponente è molto lungo. se l'esponente (il numero della "potenza" che si passa come secondo argomento) è più lungo di 32 byte / 256 bit, il costo del gas aumenta molto più velocemente per ogni byte aggiuntivo
- addebitando un extra anche per basi o moduli di grandi dimensioni. Gli altri due numeri (la base e il modulo) si presume siano di almeno 32 byte; se uno dei due è più grande, il costo aumenta in proporzione alla sua dimensione

Abbinando meglio i costi al tempo di elaborazione effettivo, MODEXP non può più causare un tempo di validazione eccessivamente lungo per un blocco. Questa modifica è una delle tante volte a rendere sicuro l'aumento del limite di gas dei blocchi di Ethereum in futuro.

**Risorse**: [Specifica tecnica dell'EIP-7883](https://eips.ethereum.org/EIPS/eip-7883)

#### Limite della dimensione del blocco di esecuzione RLP {#rlp-execution-block-size-limit}

Questo crea un tetto massimo per la dimensione di un blocco: è un limite su ciò che viene _inviato_ sulla rete ed è separato dal limite di gas, che limita il _lavoro_ all'interno di un blocco. Il limite di dimensione del blocco è di 10 MiB, con una piccola tolleranza (2 MiB) riservata ai dati di consenso, in modo che tutto si adatti e si propaghi correttamente. Se un blocco risulta più grande, i client lo rifiutano.
Ciò è necessario perché i blocchi molto grandi richiedono più tempo per diffondersi e essere verificati sulla rete e possono creare problemi di consenso o essere sfruttati come vettore di attacco DoS. Inoltre, il gossip del livello di consenso non inoltra già i blocchi superiori a ~10 MiB, quindi allineare il livello di esecuzione a tale limite evita strane situazioni in cui "alcuni lo vedono, altri lo scartano".

In dettaglio: questo è un limite alla dimensione del blocco di esecuzione codificato in [RLP](/developers/docs/data-structures-and-encoding/rlp/). 10 MiB totali, con un margine di sicurezza di 2 MiB riservato per l'inquadramento del blocco beacon. In pratica, i client definiscono

`MAX_BLOCK_SIZE = 10.485.760` byte e

`SAFETY_MARGIN = 2.097.152` byte,

e rifiutano qualsiasi blocco di esecuzione il cui payload RLP superi

`MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`

L'obiettivo è limitare il tempo di propagazione/validazione nel caso peggiore e allinearsi con il comportamento del gossip del livello di consenso, riducendo il rischio di riorganizzazione/DoS senza modificare la contabilità del gas.

**Risorse**: [Specifica tecnica dell'EIP-7934](https://eips.ethereum.org/EIPS/eip-7934)

#### Imposta il limite di gas predefinito a 60 milioni {#set-default-gas-limit-to-60-million}

Prima di aumentare il limite di gas da 30M a 36M nel febbraio 2025 (e successivamente a 45M), questo valore non era cambiato dalla Fusione (settembre 2022). Questo EIP mira a rendere la scalabilità coerente una priorità.

L'EIP-7935 coordina i team dei client EL per aumentare il limite di gas predefinito sopra i 45M attuali per Fusaka. È un EIP informativo, ma chiede esplicitamente ai client di testare limiti più alti sulle devnet, convergere su un valore sicuro e includere quel numero nelle loro versioni di Fusaka.

La pianificazione della devnet punta a uno stress di ~60M (blocchi pieni con carico sintetico) e ad aumenti iterativi; la ricerca afferma che le patologie relative alla dimensione dei blocchi nel caso peggiore non dovrebbero diventare vincolanti al di sotto di ~150M. Il rollout dovrebbe essere abbinato al limite massimo di gas per transazione (EIP-7825) in modo che nessuna singola transazione possa dominare all'aumentare dei limiti.

**Risorse**: [Specifica tecnica dell'EIP-7935](https://eips.ethereum.org/EIPS/eip-7935)

### Migliorare la UX {#improve-ux}

#### Visione anticipata deterministica dei proponenti {#deterministic-proposer-lookahead}

Con l'EIP-7917, la Beacon Chain sarà a conoscenza dei prossimi proponenti di blocchi per l'epoca successiva. Avere una visione deterministica su quali validatori proporranno i blocchi futuri può abilitare le [preconferme](https://ethresear.ch/t/based-preconfirmations/17353), un impegno con il proponente imminente che garantisce che la transazione dell'utente sarà inclusa nel suo blocco senza attendere il blocco effettivo.

Questa funzionalità avvantaggia le implementazioni dei client e la sicurezza della rete, poiché previene casi limite in cui i validatori potrebbero manipolare il programma dei proponenti. La visione anticipata consente anche una minore complessità dell'implementazione.

**Risorse**: [Specifica tecnica dell'EIP-7917](https://eips.ethereum.org/EIPS/eip-7917)

#### Opcode per contare gli zeri iniziali (CLZ) {#count-leading-zeros-opcode}

Questa funzionalità aggiunge una piccola istruzione EVM, **il conteggio degli zeri iniziali (CLZ)**. Quasi tutto nell'EVM è rappresentato come un valore a 256 bit: questo nuovo opcode restituisce quanti bit zero ci sono all'inizio. Questa è una caratteristica comune in molte architetture di set di istruzioni, in quanto consente operazioni aritmetiche più efficienti. In pratica, questo riduce le scansioni di bit fatte a mano di oggi in un unico passaggio, quindi trovare il primo bit impostato, scansionare byte o analizzare campi di bit diventa più semplice ed economico. L'opcode è a basso costo fisso ed è stato confrontato per essere alla pari di un'addizione di base, il che riduce il bytecode e risparmia gas per lo stesso lavoro.

**Risorse**: [Specifica tecnica dell'EIP-7939](https://eips.ethereum.org/EIPS/eip-7939)

#### Precompilazione per il supporto della curva secp256r1 {#secp256r1-precompile}

Introduce un verificatore di firma secp256r1 (P-256) integrato in stile passkey all'indirizzo fisso `0x100`, utilizzando lo stesso formato di chiamata già adottato da molti L2 e risolvendo casi limite, in modo che i contratti scritti per tali ambienti funzionino su L1 senza modifiche.

Aggiornamento della UX! Per gli utenti, questo sblocca la firma nativa del dispositivo e le passkey. I portafogli possono attingere direttamente a Apple Secure Enclave, Android Keystore, moduli di sicurezza hardware (HSM) e FIDO2/WebAuthn: niente frase seed, onboarding più fluido e flussi multi-fattore che sembrano app moderne. Ciò si traduce in una migliore UX, un recupero più facile e modelli di astrazione dell'account che corrispondono a ciò che miliardi di dispositivi fanno già.

Per gli sviluppatori, accetta un input di 160 byte e restituisce un output di 32 byte, rendendo facile il porting di librerie e contratti L2 esistenti. Sotto il cofano, include controlli del punto all'infinito e di confronto modulare per eliminare casi limite complessi senza interrompere i chiamanti validi.

**Risorse**:

- [Specifica tecnica dell'EIP-7951](https://eips.ethereum.org/EIPS/eip-7951)
- [Maggiori informazioni su RIP-7212](https://www.alchemy.com/blog/what-is-rip-7212) _(Nota che l'EIP-7951 ha sostituito il RIP-7212)_

### Meta {#meta}

#### Metodo JSON-RPC `eth_config` {#eth-config}

Si tratta di una chiamata JSON-RPC che consente di chiedere al proprio nodo quali impostazioni di fork si stanno utilizzando. Restituisce tre istantanee: `current`, `next` e `last`, in modo che validatori e strumenti di monitoraggio possano verificare che i client siano allineati per un fork imminente.

In pratica, questo serve a risolvere una lacuna scoperta quando il fork Pectra è stato attivato sulla testnet Holesky all'inizio del 2025 con piccole errate configurazioni che hanno portato a uno stato di non finalizzazione. Questo aiuta i team di test e gli sviluppatori a garantire che i fork principali si comportino come previsto quando si passa dalle devnet alle testnet e dalle testnet alla Mainnet.

Le istantanee includono: `chainId`, `forkId`, ora di attivazione del fork pianificata, quali precompilazioni sono attive, indirizzi delle precompilazioni, dipendenze dei contratti di sistema e il programma dei blob del fork.

Questo EIP si trova in una sezione separata dagli "EIP Core" perché il fork non implementa effettivamente alcuna modifica: è un avviso che i team dei client devono implementare questo metodo JSON-RPC entro l'aggiornamento Fusaka.

**Risorse**: [Specifica tecnica dell'EIP-7910](https://eips.ethereum.org/EIPS/eip-7910)

## Domande frequenti {#faq}

### Questo aggiornamento riguarda tutti i nodi e i validatori di Ethereum? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}
Sì, l'aggiornamento Fusaka richiede aggiornamenti sia per i [client di esecuzione che per i client di consenso](/developers/docs/nodes-and-clients/). Tutti i client principali di Ethereum rilasceranno versioni che supportano l'hard fork, contrassegnate come ad alta priorità. Puoi tenerti aggiornato su quando queste versioni saranno disponibili nei repository Github dei client, sui loro [canali Discord](https://ethstaker.org/support), sul [Discord di EthStaker](https://dsc.gg/ethstaker) o iscrivendoti al blog di Ethereum per gli aggiornamenti del protocollo. Per mantenere la sincronizzazione con la rete Ethereum dopo l'aggiornamento, gli operatori dei nodi devono assicurarsi di eseguire una versione client supportata. Si tenga presente che le informazioni sui rilasci dei client sono sensibili al fattore tempo e gli utenti devono fare riferimento agli ultimi aggiornamenti per dettagli attuali.

### Come si converte l'ETH dopo la biforcazione dura? {#how-can-eth-be-converted-after-the-hardfork}

- **Nessuna azione richiesta per i tuoi ETH**: a seguito dell'aggiornamento Fusaka di Ethereum, non è necessario convertire o aggiornare i propri ETH. I saldi del proprio conto rimarranno gli stessi e l'ETH che si possiede in quel momento rimarrà accessibile nella sua forma esistente dopo la biforcazione dura.
- **Attenzione alle truffe!** <Emoji text="⚠️" /> **chiunque ti dica di "aggiornare" il tuo ETH sta cercando di truffarti.** Non occorre fare nulla in relazione a questo aggiornamento. Le proprie risorse rimarranno completamente inalterate. Ricorda: essere informati è la migliore difesa contro le truffe.

[Ulteriori informazioni su come riconoscere ed evitare le truffe](/security/)

### Cosa c'entrano le zebre? <Emoji text="🦓" /> {#whats-with-the-zebras}

La zebra è la "mascotte" scelta dagli sviluppatori per Fusaka perché le sue strisce riflettono il campionamento della disponibilità dei dati basato su colonne di PeerDAS, in cui i nodi custodiscono determinate sottoreti di colonne e campionano alcune altre colonne da ogni slot dei peer per verificare che i dati dei blob siano disponibili.

La Fusione (Merge) del 2022 [ha usato un panda](https://x.com/hwwonx/status/1431970802040127498) come mascotte per segnalare l'unione dei livelli di esecuzione e di consenso. Da allora, per ogni fork sono state scelte informalmente delle mascotte che appaiono come arte ASCII nei log dei client al momento dell'aggiornamento. È solo un modo divertente per celebrare.

### Quali miglioramenti sono inclusi per la scalabilità L2? {#what-improvements-are-included-for-l2-scaling}

[PeerDAS](/roadmap/fusaka/peerdas) è la caratteristica principale del fork. Implementa il campionamento della disponibilità dei dati (DAS) che sblocca una maggiore scalabilità per i rollup, scalando teoricamente lo spazio dei blob fino a 8 volte la dimensione attuale. Anche il mercato delle commissioni dei blob sarà migliorato per reagire in modo efficiente alla congestione e garantire che i L2 paghino una commissione significativa per il calcolo e lo spazio che i blob impongono ai nodi.

### In che cosa differiscono i fork BPO? {#how-are-bpo-forks-different}

I fork solo per parametri blob forniscono un meccanismo per aumentare continuamente il conteggio dei blob (sia target che max) dopo l'attivazione di PeerDAS, senza dover attendere un aggiornamento completamente coordinato. Ogni aumento è preconfigurato tramite hardcoding nelle versioni dei client che supportano Fusaka.

Come utente o validatore, non è necessario aggiornare i client per ogni BPO, ma solo assicurarsi di seguire i principali hardfork come Fusaka. Questa è la stessa pratica di prima, non sono necessarie azioni speciali. È comunque consigliabile monitorare i client durante gli aggiornamenti e i BPO e mantenerli aggiornati anche tra le versioni principali, poiché correzioni o ottimizzazioni potrebbero seguire l'hardfork.

### Qual è il programma dei BPO? {#what-is-the-bpo-schedule}

Il programma esatto degli aggiornamenti BPO sarà determinato con le versioni di Fusaka. Segui gli [annunci del protocollo](https://blog.ethereum.org/category/protocol) e le note di rilascio dei tuoi client.

Esempio di come potrebbe apparire:

- Prima di Fusaka: target 6, max 9
- All'attivazione di Fusaka: target 6, max 9
- BPO1, poche settimane dopo l'attivazione di Fusaka: target 10, max 15, con un aumento di due terzi
- BPO2, poche settimane dopo il BPO1: target 14, max 21

### Questo ridurrà le commissioni su Ethereum (Layer 1)? {#will-this-lower-gas}

Questo aggiornamento non riduce le commissioni del gas su L1, almeno non direttamente. L'obiettivo principale è avere più spazio per i blob per i dati dei rollup, riducendo quindi le commissioni sul Layer 2. Questo potrebbe avere alcuni effetti collaterali sul mercato delle commissioni L1, ma non si prevede alcun cambiamento significativo.

### Come staker, cosa devo fare per l'aggiornamento? {#as-a-staker-what-do-i-need-to-do-for-the-upgrade}

Come per ogni aggiornamento di rete, assicurati di aggiornare i tuoi client alle ultime versioni contrassegnate con il supporto a Fusaka. Segui gli aggiornamenti nella mailing list e gli [annunci del protocollo sul blog di EF](https://blog.ethereum.org/category/protocol) per essere informato sui rilasci.
Per convalidare la tua configurazione prima che Fusaka venga attivato sulla Mainnet, puoi eseguire un validatore sulle testnet. Fusaka viene [attivato prima sulle testnet](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement), dandoti più tempo per assicurarti che tutto funzioni e per segnalare bug. Anche i fork delle testnet sono annunciati nella mailing list e sul blog.

### La "Visione anticipata deterministica dei proponenti" (EIP-7917) influisce sui validatori? {#does-7917-affect-validators}

Questa modifica non cambia il funzionamento del tuo client validatore, tuttavia, fornirà maggiori informazioni sul futuro dei tuoi compiti di validatore. Assicurati di aggiornare i tuoi strumenti di monitoraggio per stare al passo con le nuove funzionalità.

### In che modo Fusaka influisce sui requisiti di larghezza di banda per nodi e validatori? {#how-does-fusaka-affect-bandwidth-requirements-for-nodes-and-validators}

PeerDAS apporta un cambiamento significativo nel modo in cui i nodi trasmettono i dati dei blob. Tutti i dati sono divisi in pezzi chiamati colonne su 128 sottoreti, con i nodi che si iscrivono solo ad alcune di esse. Il numero di colonne di sottorete che i nodi devono custodire dipende dalla loro configurazione e dal numero di validatori connessi. I requisiti effettivi di larghezza di banda dipenderanno dalla quantità di blob consentiti nella rete e dal tipo di nodo. Al momento dell'attivazione di Fusaka, il target di blob rimane lo stesso di prima, ma con PeerDAS, gli operatori dei nodi possono notare una diminuzione dell'utilizzo del disco per i blob e del traffico di rete. Man mano che i BPO configurano un numero maggiore di blob nella rete, la larghezza di banda necessaria aumenterà con ogni BPO.

I requisiti dei nodi rientrano ancora nei [margini consigliati](https://eips.ethereum.org/EIPS/eip-7870) anche dopo i BPO di Fusaka.

#### Nodi completi {#full-nodes}

I nodi regolari senza alcun validatore si iscriveranno solo a 4 sottoreti, fornendo la custodia di 1/8 dei dati originali. Ciò significa che, con la stessa quantità di dati dei blob, la larghezza di banda del nodo per scaricarli sarebbe inferiore di un fattore otto (8). L'utilizzo del disco e la larghezza di banda di download dei blob per un normale nodo completo potrebbero diminuire di circa l'80%, a solo pochi Mb.

#### Staking in solitaria {#solo-stakers}

Se il nodo è utilizzato per un client validatore, deve custodire più colonne e quindi elaborare più dati. Con l'aggiunta di un validatore, il nodo si iscrive ad almeno 8 sottoreti di colonne e quindi elabora il doppio dei dati di un nodo normale, ma comunque meno di prima di Fusaka. Se il saldo del validatore è superiore a 287 ETH, verranno sottoscritte sempre più sottoreti.

Per uno staker solitario, ciò significa che l'utilizzo del disco e la larghezza di banda di download diminuiranno di circa il 50%. Tuttavia, per costruire blocchi localmente e caricare tutti i blob sulla rete, è necessaria una maggiore larghezza di banda di upload. I costruttori locali avranno bisogno di una larghezza di banda di upload 2-3 volte superiore rispetto a prima al momento di Fusaka e con il target BPO2 di 15/21 blob, la larghezza di banda di upload finale necessaria dovrà essere circa 5 volte superiore, a 100 Mbps.

#### Grandi validatori {#large-validators}

Il numero di sottoreti sottoscritte cresce con l'aumento del saldo e dei validatori aggiunti al nodo. Ad esempio, con un saldo di circa 800 ETH, il nodo custodisce 25 colonne e avrà bisogno di circa il 30% in più di larghezza di banda di download rispetto a prima. L'upload necessario aumenta in modo simile ai nodi normali ed è necessario almeno 100 Mbps.

A 4096 ETH, con 2 validatori a saldo massimo, il nodo diventa un 'supernodo' che custodisce tutte le colonne, quindi scarica e archivia tutto. Questi nodi guariscono attivamente la rete contribuendo a ripristinare i dati mancanti, ma richiedono anche molta più larghezza di banda e spazio di archiviazione. Con il target finale di blob 6 volte superiore a prima, i super nodi dovranno archiviare circa 600 GB di dati blob extra e avere una larghezza di banda di download sostenuta più veloce, intorno ai 20 Mbps.

[Leggi maggiori dettagli sui requisiti previsti.](https://ethpandaops.io/posts/fusaka-bandwidth-estimation/#theoretical-requirements)

### Quali modifiche all'EVM sono state implementate? {#what-evm-changes-are-implemented}

Fusaka consolida l'EVM con nuove piccole modifiche e funzionalità.

- Per la sicurezza durante la scalabilità, la dimensione massima di una singola transazione sarà [limitata a 16,7 milioni](https://eips.ethereum.org/EIPS/eip-7825) di unità di gas.
- Il [nuovo opcode per contare gli zeri iniziali (CLZ)](https://eips.ethereum.org/EIPS/eip-7939) è stato aggiunto all'EVM e consentirà ai linguaggi dei contratti intelligenti di eseguire determinate operazioni in modo più efficiente.
- [Il costo della precompilazione `ModExp` sarà aumentato](https://eips.ethereum.org/EIPS/eip-7883): i contratti che la utilizzano addebiteranno più gas per l'esecuzione.

### In che modo il nuovo limite di gas di 16M influisce sugli sviluppatori di contratti? {#how-does-new-16m-gas-limit-affects-contract-developers}

Fusaka introduce un limite alla [dimensione massima di una singola transazione a 16,7 milioni](https://eips.ethereum.org/EIPS/eip-7825) (2^24) di unità di gas. Questa è all'incirca la dimensione precedente di un blocco medio, il che la rende abbastanza grande da ospitare transazioni complesse che consumerebbero un intero blocco. Questo limite crea una protezione per i client, prevenendo potenziali attacchi DoS in futuro con un limite di gas del blocco più elevato. L'obiettivo della scalabilità è consentire a più transazioni di entrare nella blockchain senza che una singola transazione consumi l'intero blocco.

Le normali transazioni degli utenti sono lontane dal raggiungere questo limite. Alcuni casi limite come operazioni DeFi grandi e complesse, grandi distribuzioni di contratti intelligenti o transazioni batch che mirano a più contratti potrebbero essere influenzati da questa modifica. Queste transazioni dovranno essere suddivise in transazioni più piccole o ottimizzate in un altro modo. Utilizza la simulazione prima di inviare transazioni che potrebbero raggiungere il limite.

Il metodo RPC `eth_call` non è limitato e consentirà la simulazione di transazioni più grandi del limite effettivo della blockchain. Il limite effettivo per i metodi RPC può essere configurato dall'operatore del client per prevenire abusi.

### Cosa significa CLZ per gli sviluppatori? {#what-clz-means-for-developers}

I compilatori EVM come Solidity implementeranno e utilizzeranno la nuova funzione per contare gli zeri sotto il cofano. I nuovi contratti potrebbero beneficiare di un risparmio di gas se si basano su questo tipo di operazione. Segui le versioni e gli annunci delle funzionalità del linguaggio dei contratti intelligenti per la documentazione sui potenziali risparmi.

### Ci sono modifiche per i miei contratti intelligenti esistenti? {#what-clz-means-for-developers}

Fusaka non ha effetti diretti che potrebbero interrompere contratti esistenti o cambiarne il comportamento. Le modifiche introdotte al livello di esecuzione sono realizzate con compatibilità con le versioni precedenti, tuttavia, tieni sempre d'occhio i casi limite e il potenziale impatto.

[Con l'aumento del costo della precompilazione `ModExp`](https://eips.ethereum.org/EIPS/eip-7883), i contratti che dipendono da essa consumeranno più gas per l'esecuzione. Se il tuo contratto si basa molto su questo e diventa più costoso per gli utenti, riconsidera come viene utilizzato.

Considera il [nuovo limite di 16,7 milioni](https://eips.ethereum.org/EIPS/eip-7825) se le transazioni che eseguono i tuoi contratti potrebbero raggiungere dimensioni simili.

## Letture consigliate {#further-reading}

- [Tabella di marcia di Ethereum](/roadmap/)
- [Forkcast: Fusaka](https://forkcast.org/upgrade/fusaka)
- [Meta EIP di Fusaka](https://eips.ethereum.org/EIPS/eip-7607)
- [Annuncio sul blog della testnet di Fusaka](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)
- [Bankless: cosa porteranno Fusaka e Pectra a Ethereum](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless: i prossimi aggiornamenti di Ethereum: Fusaka, Glamsterdam e oltre con Preston Van Loon](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
- [The Fusaka Files](https://www.youtube.com/playlist?list=PL4cwHXAawZxpz-erUbKKUnnGoQNdF8s7Z)
- [PEEPanEIPs Explained](https://www.youtube.com/playlist?list=PL4cwHXAawZxoIenfk7OJry4rxcqX-eqBt)
