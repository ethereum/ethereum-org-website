---
title: "Fusaka 🦓"
metaTitle: Fulu-Osaka (Fusaka)
description: Scopri l'aggiornamento del protocollo Fusaka
lang: it
authors: ["Nixo", "Mario Havel"]
---

**L'attesissimo aggiornamento Fusaka di Ethereum è stato attivato il 3 dicembre 2025**

L'aggiornamento della rete Fusaka segue [Pectra](/roadmap/pectra/) e introduce ulteriori nuove funzionalità, migliorando l'esperienza per ogni utente e sviluppatore di [Ethereum](/). Il nome è composto dall'aggiornamento del livello di esecuzione Osaka e dalla versione del livello di consenso che prende il nome dalla stella Fulu. Entrambe le parti di Ethereum ricevono un aggiornamento che spinge la scalabilità, la sicurezza e l'esperienza utente di Ethereum verso il futuro.

<Alert variant="update">
<AlertContent>
<AlertDescription>
L'aggiornamento Fusaka è solo un singolo passo negli obiettivi di sviluppo a lungo termine di Ethereum. Scopri di più sulla [roadmap del protocollo](/roadmap/) e sui [precedenti aggiornamenti](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

<VideoWatch slug="fusaka-upgrade-explained" />

## Miglioramenti in Fusaka {#improvements-in-fusaka}

### Scalabilità dei blob {#scale-blobs}

#### PeerDAS {#peerdas}

Questo è il _fiore all'occhiello_ del fork Fusaka, la funzionalità principale aggiunta in questo aggiornamento. I layer 2 (l2) attualmente pubblicano i loro dati su Ethereum nei blob, il tipo di dati effimero creato specificamente per i layer 2. Prima di Fusaka, ogni nodo completo doveva archiviare ogni blob per garantire che i dati esistessero. Con l'aumento della capacità transazionale dei blob, dover scaricare tutti questi dati diventa insostenibile in termini di risorse.

Con il [campionamento della disponibilità dei dati](https://notes.ethereum.org/@fradamt/das-fork-choice), invece di dover archiviare tutti i dati dei blob, ogni nodo sarà responsabile di un sottoinsieme dei dati dei blob. I blob sono distribuiti in modo uniforme e casuale tra i nodi della rete, con ogni nodo completo che detiene solo 1/8 dei dati, consentendo quindi una scalabilità teorica fino a 8 volte. Per garantire la disponibilità dei dati, qualsiasi porzione dei dati può essere ricostruita da un qualsiasi 50% esistente del totale con metodi che riducono la probabilità di dati errati o mancanti a un livello crittograficamente trascurabile (da ~uno su 10<sup>20</sup> a uno su 10<sup>24</sup>).

Ciò mantiene sostenibili i requisiti hardware e di larghezza di banda per i nodi, consentendo al contempo la scalabilità dei blob, il che si traduce in maggiore scalabilità con commissioni inferiori per i layer 2.

[Scopri di più su PeerDAS](/roadmap/fusaka/peerdas/)

**Risorse**:

- [Specifica tecnica dell'EIP-7594](https://eips.ethereum.org/EIPS/eip-7594)
- [DappLion su PeerDAS: Scalare Ethereum Oggi | ETHSofia 2024](https://youtu.be/bONWd1x2TjQ?t=328)
- [Accademico: Una documentazione del PeerDAS di Ethereum (PDF)](https://eprint.iacr.org/2024/1362.pdf)

#### Fork di soli parametri dei blob (Blob-Parameter-Only) {#blob-parameter-only-forks}

I layer 2 scalano Ethereum: man mano che le loro reti crescono, hanno bisogno di pubblicare più dati su Ethereum. Ciò significa che Ethereum dovrà aumentare il numero di blob a loro disposizione nel tempo. Sebbene PeerDAS consenta di scalare i dati dei blob, ciò deve essere fatto in modo graduale e sicuro.

Poiché Ethereum è un codice in esecuzione su migliaia di nodi indipendenti che richiedono un accordo sulle stesse regole, non possiamo semplicemente introdurre modifiche come l'aumento del conteggio dei blob nel modo in cui si distribuisce un aggiornamento di un sito web. Qualsiasi modifica alle regole deve essere un aggiornamento coordinato in cui ogni nodo, client e software del validatore si aggiorna prima dello stesso blocco predeterminato.

Questi aggiornamenti coordinati generalmente includono molte modifiche, richiedono molti test e questo richiede tempo. Per adattarsi più rapidamente alle mutevoli esigenze dei blob dei layer 2, i fork di soli parametri dei blob introducono un meccanismo per aumentare i blob senza dover aspettare quel programma di aggiornamento.

I fork di soli parametri dei blob possono essere impostati dai client, in modo simile ad altre configurazioni come il limite di gas. Tra i principali aggiornamenti di Ethereum, i client possono concordare di aumentare i blob `target` e `max` ad esempio a 9 e 12, e quindi gli operatori dei nodi si aggiorneranno per prendere parte a quel piccolo fork. Questi fork di soli parametri dei blob possono essere configurati in qualsiasi momento.

Quando i blob sono stati aggiunti per la prima volta alla rete nell'aggiornamento Dencun, l'obiettivo era 3. Questo è stato aumentato a 6 in Pectra e, dopo Fusaka, ora può essere aumentato a un ritmo sostenibile indipendentemente da questi importanti aggiornamenti della rete.

![Chart showing average blob count per block and increasing targets with upgrades](./average-blob-count-per-block.webp)

Fonte del grafico: [Ethereum Blobs - @hildobby, Dune Analytics](https://dune.com/hildobby/blobs)

**Risorse**: [Specifica tecnica dell'EIP-7892](https://eips.ethereum.org/EIPS/eip-7892)

#### Commissione di base dei blob limitata dai costi di esecuzione {#blob-base-fee-bounded-by-execution-costs}

I layer 2 pagano due conti quando pubblicano dati: la commissione per i blob e il gas di esecuzione necessario per verificare quei blob. Se il gas di esecuzione domina, l'asta della commissione per i blob può scendere a spirale fino a 1 Wei e smettere di essere un segnale di prezzo.

L'EIP-7918 fissa un prezzo di riserva proporzionale sotto ogni blob. Quando la riserva è superiore alla commissione di base nominale del blob, l'algoritmo di adeguamento delle commissioni tratta il blocco come oltre l'obiettivo e smette di spingere la commissione verso il basso, consentendole di aumentare normalmente. Di conseguenza:

- il mercato delle commissioni per i blob reagisce sempre alla congestione
- i layer 2 pagano almeno una fetta significativa del calcolo che impongono ai nodi
- i picchi della commissione di base sul livello di esecuzione non possono più bloccare la commissione per i blob a 1 Wei

**Risorse**:

- [Specifica tecnica dell'EIP-7918](https://eips.ethereum.org/EIPS/eip-7918)
- [Spiegazione su Storybook](https://notes.ethereum.org/@anderselowsson/AIG)

### Scalabilità del layer 1 (L1) {#scale-l1}

#### Scadenza della cronologia e ricevute più semplici {#history-expiry}

A luglio 2025, i client del livello di esecuzione di Ethereum [hanno iniziato a supportare la scadenza della cronologia parziale](https://blog.ethereum.org/2025/07/08/partial-history-exp). Questo ha eliminato la cronologia precedente a [The Merge](https://ethereum.org/roadmap/merge/) al fine di ridurre lo spazio su disco richiesto dagli operatori dei nodi mentre Ethereum continua a crescere.

Questo EIP si trova in una sezione separata dai "Core EIPs" perché il fork in realtà non implementa alcuna modifica: è un avviso che i team dei client devono supportare la scadenza della cronologia entro l'aggiornamento Fusaka. In pratica, i client possono implementarlo in qualsiasi momento, ma aggiungerlo all'aggiornamento lo ha inserito concretamente nella loro lista delle cose da fare e ha permesso loro di testare le modifiche di Fusaka in combinazione con questa funzionalità.

**Risorse**: [Specifica tecnica dell'EIP-7642](https://eips.ethereum.org/EIPS/eip-7642)

#### Impostazione dei limiti superiori per MODEXP {#set-upper-bounds-for-modexp}

Fino ad ora, il precompilato MODEXP accettava numeri di praticamente qualsiasi dimensione. Ciò lo rendeva difficile da testare, facile da abusare e rischioso per la stabilità del client. L'EIP-7823 pone un limite chiaro: ogni numero di input può essere lungo al massimo 8192 bit (1024 byte). Qualsiasi cosa più grande viene rifiutata, il gas della transazione viene bruciato e non si verificano cambiamenti di stato. Copre molto comodamente le esigenze del mondo reale rimuovendo i casi estremi che complicavano la pianificazione del limite di gas e le revisioni di sicurezza. Questa modifica fornisce maggiore sicurezza e protezione DoS senza influire sull'esperienza dell'utente o dello sviluppatore.

**Risorse**: [Specifica tecnica dell'EIP-7823](https://eips.ethereum.org/EIPS/eip-7823)

#### Limite massimo di gas per transazione {#transaction-gas-limit-cap}

L'EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) aggiunge un limite massimo di 16.777.216 (2^24) gas per transazione. È un rafforzamento proattivo contro i DoS limitando il costo nel caso peggiore di qualsiasi singola transazione mentre aumentiamo il limite di gas del blocco. Rende la convalida e la propagazione più facili da modellare per consentirci di affrontare la scalabilità tramite l'aumento del limite di gas.

Perché esattamente 2^24 gas? È comodamente inferiore al limite di gas odierno, è abbastanza grande per le distribuzioni di contratti reali e precompilati pesanti, e una potenza di 2 lo rende facile da implementare su tutti i client. Questa nuova dimensione massima della transazione è simile alla dimensione media del blocco pre-Pectra, rendendola un limite ragionevole per qualsiasi operazione su Ethereum.

**Risorse**: [Specifica tecnica dell'EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)

#### Aumento del costo del gas di `MODEXP` {#modexp-gas-cost-increase}

MODEXP è una funzione integrata in un precompilato che calcola l'esponenziazione modulare, un tipo di matematica per grandi numeri utilizzata nella verifica della firma RSA e nei sistemi di prova. Consente ai contratti di eseguire questi calcoli direttamente senza doverli implementare da soli.

Gli sviluppatori e i team dei client hanno identificato MODEXP come un ostacolo importante all'aumento del limite di gas del blocco perché l'attuale determinazione del prezzo del gas spesso sottostima la potenza di calcolo richiesta da determinati input. Ciò significa che una transazione che utilizza MODEXP potrebbe occupare la maggior parte del tempo necessario per elaborare un intero blocco, rallentando la rete.

Questo EIP modifica i prezzi per farli corrispondere ai costi computazionali reali:

- aumentando l'addebito minimo da 200 a 500 gas e rimuovendo lo sconto di un terzo dall'EIP-2565 sul calcolo del costo generale
- aumentando il costo in modo più netto quando l'input dell'esponente è molto lungo. Se l'esponente (il numero "potenza" che passi come secondo argomento) è più lungo di 32 byte / 256 bit, l'addebito del gas sale molto più velocemente per ogni byte extra
- addebitando un extra anche per basi o moduli di grandi dimensioni. Si presume che gli altri due numeri (la base e il modulo) siano di almeno 32 byte: se uno dei due è più grande, il costo aumenta in proporzione alle sue dimensioni

Abbinando meglio i costi al tempo di elaborazione effettivo, MODEXP non può più far sì che un blocco impieghi troppo tempo per essere convalidato. Questa modifica è una delle tante volte a rendere sicuro l'aumento del limite di gas del blocco di Ethereum in futuro.

**Risorse**: [Specifica tecnica dell'EIP-7883](https://eips.ethereum.org/EIPS/eip-7883)

#### Limite della dimensione del blocco di esecuzione RLP {#rlp-execution-block-size-limit}

Questo crea un tetto massimo su quanto può essere grande un blocco: si tratta di un limite su ciò che viene _inviato_ sulla rete ed è separato dal limite di gas, che limita il _lavoro_ all'interno di un blocco. Il limite della dimensione del blocco è di 10 MiB, con un piccolo margine (2 MiB) riservato ai dati di consenso in modo che tutto si adatti e si propaghi in modo pulito. Se un blocco si presenta più grande di così, i client lo rifiutano.
Ciò è necessario perché i blocchi molto grandi impiegano più tempo a diffondersi e a essere verificati attraverso la rete e possono creare problemi di consenso o essere abusati come vettore DoS. Inoltre, il gossip del livello di consenso già non inoltra blocchi superiori a ~10 MiB, quindi allineare il livello di esecuzione a quel limite evita strane situazioni del tipo "visto da alcuni, scartato da altri".

I dettagli: questo è un limite sulla dimensione del blocco di esecuzione codificato in [RLP](/developers/docs/data-structures-and-encoding/rlp/). 10 MiB in totale, con un margine di sicurezza di 2 MiB riservato al framing del blocco della beacon chain. In pratica, i client definiscono

`MAX_BLOCK_SIZE = 10,485,760` byte e

`SAFETY_MARGIN = 2,097,152` byte,

e rifiutano qualsiasi blocco di esecuzione il cui payload RLP superi

`MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`

L'obiettivo è limitare il tempo di propagazione/convalida nel caso peggiore e allinearsi al comportamento del gossip del livello di consenso, riducendo il rischio di riorganizzazione/DoS senza modificare la contabilità del gas.

**Risorse**: [Specifica tecnica dell'EIP-7934](https://eips.ethereum.org/EIPS/eip-7934)

#### Impostazione del limite di gas predefinito a 60 milioni {#set-default-gas-limit-to-60-million}

Prima di aumentare il limite di gas da 30M a 36M a febbraio 2025 (e successivamente a 45M), questo valore non era cambiato da The Merge (settembre 2022). Questo EIP mira a rendere la scalabilità coerente una priorità.

L'EIP-7935 coordina i team dei client del livello di esecuzione per aumentare il limite di gas predefinito oltre gli attuali 45M per Fusaka. È un EIP informativo, ma chiede esplicitamente ai client di testare limiti più elevati sulle devnet, convergere su un valore sicuro e distribuire quel numero nelle loro versioni di Fusaka.

La pianificazione delle devnet punta a uno stress di ~60M (blocchi completi con carico sintetico) e ad aumenti iterativi; la ricerca afferma che le patologie della dimensione del blocco nel caso peggiore non dovrebbero vincolare al di sotto di ~150M. Il lancio dovrebbe essere abbinato al limite massimo di gas per transazione (EIP-7825) in modo che nessuna singola transazione possa dominare man mano che i limiti aumentano.

**Risorse**: [Specifica tecnica dell'EIP-7935](https://eips.ethereum.org/EIPS/eip-7935)

### Miglioramento dell'UX {#improve-ux}

#### Previsione deterministica del proponente {#deterministic-proposer-lookahead}

Con l'EIP-7917, la Beacon Chain diventerà consapevole dei futuri proponenti dei blocchi per l'epoca successiva. Avere una visione deterministica su quali validatori proporranno i blocchi futuri può abilitare le [preconferme](https://ethresear.ch/t/based-preconfirmations/17353): un commitment con il proponente imminente che garantisce che la transazione dell'utente sarà inclusa nel suo blocco senza aspettare il blocco effettivo.

Questa funzionalità avvantaggia le implementazioni dei client e la sicurezza della rete in quanto previene casi limite in cui i validatori potrebbero manipolare la pianificazione del proponente. La previsione consente inoltre una minore complessità dell'implementazione.

**Risorse**: [Specifica tecnica dell'EIP-7917](https://eips.ethereum.org/EIPS/eip-7917)

#### Codice operativo (opcode) per il conteggio degli zeri iniziali (CLZ) {#count-leading-zeros-opcode}

Questa funzionalità aggiunge una piccola istruzione EVM, il **conteggio degli zeri iniziali (CLZ)**. Quasi tutto nell'EVM è rappresentato come un valore a 256 bit: questo nuovo codice operativo (opcode) restituisce quanti bit zero si trovano all'inizio. Questa è una funzionalità comune in molte architetture di set di istruzioni in quanto consente operazioni aritmetiche più efficienti. In pratica, questo riduce le odierne scansioni di bit manuali in un unico passaggio, quindi trovare il primo bit impostato, scansionare i byte o analizzare i campi di bit diventa più semplice ed economico. Il codice operativo (opcode) ha un costo fisso e basso ed è stato valutato alla pari con un'addizione di base, il che riduce il bytecode e fa risparmiare gas per lo stesso lavoro.

**Risorse**: [Specifica tecnica dell'EIP-7939](https://eips.ethereum.org/EIPS/eip-7939)

#### Precompilato per il supporto della curva secp256r1 {#secp256r1-precompile}

Introduce un verificatore di firma secp256r1 (P-256) integrato in stile passkey all'indirizzo fisso `0x100` utilizzando lo stesso formato di chiamata già adottato da molti layer 2 (l2) e risolvendo i casi limite, in modo che i contratti scritti per quegli ambienti funzionino sul layer 1 (l1) senza modifiche.

Aggiornamento dell'UX! Per gli utenti, questo sblocca la firma nativa del dispositivo e le passkey. I portafogli possono attingere direttamente ad Apple Secure Enclave, Android Keystore, moduli di sicurezza hardware (HSM) e FIDO2/WebAuthn: nessuna frase seme, un inserimento più fluido e flussi multi-fattore che sembrano app moderne. Ciò si traduce in una migliore UX, un recupero più semplice e modelli di astrazione dell'account che corrispondono a ciò che miliardi di dispositivi fanno già.

Per gli sviluppatori, accetta un input di 160 byte e restituisce un output di 32 byte, semplificando il porting di librerie esistenti e contratti dei layer 2 (l2). Internamente, include controlli del punto all'infinito e di confronto modulare per eliminare casi limite insidiosi senza interrompere i chiamanti validi.

**Risorse**:

- [Specifica tecnica dell'EIP-7951](https://eips.ethereum.org/EIPS/eip-7951)
- [Maggiori informazioni su RIP-7212](https://www.alchemy.com/blog/what-is-rip-7212) _(Nota che l'EIP-7951 ha sostituito il RIP-7212)_

### Meta {#meta}

#### Metodo JSON-RPC `eth_config` {#eth-config}

Questa è una chiamata JSON-RPC che ti consente di chiedere al tuo nodo quali impostazioni del fork stai eseguendo. Restituisce tre snapshot: `current`, `next` e `last` in modo che i validatori e gli strumenti di monitoraggio possano verificare che i client siano allineati per un fork imminente.

In pratica, questo serve ad affrontare una lacuna scoperta quando il fork Pectra è stato attivato sulla testnet Holesky all'inizio del 2025 con configurazioni errate minori che hanno portato a uno stato non finalizzante. Questo aiuta i team di test e gli sviluppatori a garantire che i fork principali si comportino come previsto quando si passa dalle devnet alle testnet e dalle testnet alla Mainnet.

Gli snapshot includono: `chainId`, `forkId`, il tempo di attivazione del fork pianificato, quali precompilati sono attivi, gli indirizzi dei precompilati, le dipendenze dei contratti di sistema e la pianificazione dei blob del fork.

Questo EIP si trova in una sezione separata dai "Core EIPs" perché il fork in realtà non implementa alcuna modifica: è un avviso che i team dei client devono implementare questo metodo JSON-RPC entro l'aggiornamento Fusaka.

**Risorse**: [Specifica tecnica dell'EIP-7910](https://eips.ethereum.org/EIPS/eip-7910)

## Domande frequenti (FAQ) {#faq}

### Questo aggiornamento influisce su tutti i nodi e i validatori di Ethereum? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

Sì, l'aggiornamento Fusaka richiede aggiornamenti sia per i [client di esecuzione che per i client di consenso](/developers/docs/nodes-and-clients/). Tutti i principali client di Ethereum rilasceranno versioni che supportano l'hard fork contrassegnate come ad alta priorità. Puoi tenerti aggiornato su quando queste versioni saranno disponibili nei repository GitHub dei client, nei loro [canali Discord](https://ethstaker.org/support), nel [Discord di EthStaker](https://dsc.gg/ethstaker) o iscrivendoti al blog di Ethereum per gli aggiornamenti del protocollo. Per mantenere la sincronizzazione con la rete Ethereum dopo l'aggiornamento, gli operatori dei nodi devono assicurarsi di eseguire una versione del client supportata. Tieni presente che le informazioni sulle versioni dei client sono sensibili al fattore tempo e gli utenti dovrebbero fare riferimento agli ultimi aggiornamenti per i dettagli più recenti.

### Come possono essere convertiti gli ETH dopo l'hard fork? {#how-can-eth-be-converted-after-the-hardfork}

- **Nessuna azione richiesta per i tuoi ETH**: A seguito dell'aggiornamento Fusaka di Ethereum, non è necessario convertire o aggiornare i tuoi ETH. I saldi del tuo account rimarranno gli stessi e gli ETH che detieni attualmente rimarranno accessibili nella loro forma esistente dopo l'hard fork.
- **Attenzione alle truffe!** <Emoji text="⚠️" /> **chiunque ti istruisca ad "aggiornare" i tuoi ETH sta cercando di truffarti.** Non c'è nulla che tu debba fare in relazione a questo aggiornamento. I tuoi asset rimarranno completamente inalterati. Ricorda, rimanere informati è la migliore difesa contro le truffe.

[Maggiori informazioni su come riconoscere ed evitare le truffe](/security/)

### Che c'entrano le zebre? <Emoji text="🦓" /> {#whats-with-the-zebras}

Una zebra è la "mascotte" scelta dagli sviluppatori per Fusaka perché le sue strisce riflettono il campionamento della disponibilità dei dati basato su colonne di PeerDAS, in cui i nodi custodiscono determinate sottoreti di colonne e campionano alcune altre colonne dallo slot di ciascun peer per verificare che i dati dei blob siano disponibili.

The Merge nel 2022 [ha utilizzato un panda](https://x.com/hwwonx/status/1431970802040127498) come mascotte per segnalare l'unione dei livelli di esecuzione e di consenso. Da allora, le mascotte sono state scelte in modo informale per ogni fork e vengono visualizzate come ASCII art nei log del client al momento dell'aggiornamento. È solo un modo divertente per festeggiare.

### Quali miglioramenti sono inclusi per la scalabilità dei layer 2 (L2)? {#what-improvements-are-included-for-l2-scaling}

[PeerDAS](/roadmap/fusaka/peerdas) è la funzionalità principale del fork. Implementa il campionamento della disponibilità dei dati (DAS) che sblocca maggiore scalabilità per i rollup, scalando teoricamente lo spazio dei blob fino a 8 volte la dimensione attuale. Anche il mercato delle commissioni per i blob sarà migliorato per reagire in modo efficiente alla congestione e garantire che i layer 2 (l2) paghino una commissione significativa per il calcolo e lo spazio che i blob impongono ai nodi.

### In che modo i fork BPO sono diversi? {#how-are-bpo-forks-different}

I fork di soli parametri dei blob (Blob Only Parameter) forniscono un meccanismo per aumentare continuamente il conteggio dei blob (sia target che massimo) dopo l'attivazione di PeerDAS, senza dover aspettare un aggiornamento coordinato completo. Ogni aumento è codificato per essere preconfigurato nelle versioni dei client che supportano Fusaka.

Come utente o validatore, non è necessario aggiornare i client per ogni BPO e devi solo assicurarti di seguire i principali hard fork come Fusaka. Questa è la stessa pratica di prima, non sono necessarie azioni speciali. Si consiglia comunque di monitorare i client in prossimità di aggiornamenti e BPO e di mantenerli aggiornati anche tra le versioni principali, poiché correzioni o ottimizzazioni potrebbero seguire l'hard fork.

### Qual è il programma dei BPO? {#what-is-the-bpo-schedule}

Il programma esatto degli aggiornamenti BPO sarà determinato con le versioni di Fusaka. Segui gli [annunci del protocollo](https://blog.ethereum.org/category/protocol) e le note di rilascio dei tuoi client.

Esempio di come potrebbe apparire:

- Prima di Fusaka: target 6, massimo 9
- All'attivazione di Fusaka: target 6, massimo 9
- BPO1, poche settimane dopo l'attivazione di Fusaka: target 10, massimo 15, con un aumento di due terzi
- BPO2, poche settimane dopo il BPO1: target 14, massimo 21

### Questo abbasserà le commissioni su Ethereum (layer 1)? {#will-this-lower-gas}

Questo aggiornamento non abbassa le commissioni del gas sul layer 1 (l1), almeno non direttamente. L'obiettivo principale è avere più spazio nei blob per i dati dei rollup, abbassando quindi le commissioni sul layer 2 (l2). Ciò potrebbe avere alcuni effetti collaterali sul mercato delle commissioni del layer 1, ma non si prevede alcun cambiamento significativo.

### Come staker, cosa devo fare per l'aggiornamento? {#as-a-staker-what-do-i-need-to-do-for-the-upgrade}

Come per ogni aggiornamento della rete, assicurati di aggiornare i tuoi client alle ultime versioni contrassegnate con il supporto per Fusaka. Segui gli aggiornamenti nella mailing list e gli [Annunci del protocollo sul blog della EF](https://blog.ethereum.org/category/protocol) per essere informato sulle versioni.
Per convalidare la tua configurazione prima che Fusaka venga attivato sulla Mainnet, puoi eseguire un validatore sulle testnet. Fusaka viene [attivato prima sulle testnet](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement), dandoti più spazio per assicurarti che tutto funzioni e segnalare bug. I fork delle testnet vengono annunciati anche nella mailing list e nel blog.

### La "Previsione deterministica del proponente" (EIP-7917) influisce sui validatori? {#does-7917-affect-validators}

Questa modifica non cambia il modo in cui funziona il tuo client del validatore, tuttavia fornirà maggiori informazioni sul futuro dei tuoi doveri di validatore. Assicurati di aggiornare i tuoi strumenti di monitoraggio per stare al passo con le nuove funzionalità.

### In che modo Fusaka influisce sui requisiti di larghezza di banda per nodi e validatori? {#how-does-fusaka-affect-bandwidth-requirements-for-nodes-and-validators}

PeerDAS apporta un cambiamento significativo nel modo in cui i nodi trasmettono i dati dei blob. Tutti i dati sono divisi in parti chiamate colonne su 128 sottoreti con i nodi che si iscrivono solo ad alcune di esse. La quantità di colonne di sottorete che i nodi devono custodire dipende dalla loro configurazione e dal numero di validatori connessi. I requisiti effettivi di larghezza di banda dipenderanno dalla quantità di blob consentiti nella rete e dal tipo di nodo. Al momento dell'attivazione di Fusaka, il target dei blob rimane lo stesso di prima, ma con PeerDAS, gli operatori dei nodi possono notare una diminuzione dell'utilizzo del disco per i blob e del traffico di rete. Man mano che i BPO configurano un numero maggiore di blob nella rete, la larghezza di banda necessaria aumenterà con ogni BPO.

I requisiti dei nodi rientrano ancora nei [margini consigliati](https://eips.ethereum.org/EIPS/eip-7870) anche dopo i BPO di Fusaka.

#### Nodi completi {#full-nodes}

I nodi regolari senza alcun validatore si iscriveranno a sole 4 sottoreti, fornendo la custodia per 1/8 dei dati originali. Ciò significa che con la stessa quantità di dati dei blob, la larghezza di banda del nodo per scaricarli sarebbe inferiore di un fattore otto (8). L'utilizzo del disco e la larghezza di banda di download dei blob per un normale nodo completo potrebbero diminuire di circa l'80%, a soli pochi Mb.

#### Staker solitari {#solo-stakers}

Se il nodo viene utilizzato per un client del validatore, deve custodire più colonne e quindi elaborare più dati. Con l'aggiunta di un validatore, il nodo si iscrive ad almeno 8 sottoreti di colonne e quindi elabora il doppio dei dati rispetto a un nodo regolare, ma comunque meno rispetto a prima di Fusaka. Se il saldo del validatore è superiore a 287 ETH, verranno sottoscritte sempre più sottoreti.

Per uno staker solitario, ciò significa che l'utilizzo del disco e la larghezza di banda di download diminuiranno di circa il 50%. Tuttavia, per costruire blocchi localmente e caricare tutti i blob sulla rete, è necessaria una maggiore larghezza di banda di upload. I costruttori locali avranno bisogno di una larghezza di banda di upload 2-3 volte superiore rispetto a prima al momento di Fusaka e con il target BPO2 di 15/21 blob, la larghezza di banda di upload finale necessaria dovrà essere circa 5 volte superiore, a 100 Mbps.

#### Grandi validatori {#large-validators}

Il numero di sottoreti sottoscritte cresce con l'aggiunta di più saldo e validatori al nodo. Ad esempio, con un saldo di circa 800 ETH, il nodo custodisce 25 colonne e avrà bisogno di circa il 30% in più di larghezza di banda di download rispetto a prima. L'upload necessario aumenta in modo simile ai nodi regolari ed è necessario almeno 100 Mbps.

A 4096 ETH, 2 validatori con saldo massimo, il nodo diventa un "supernodo" che custodisce tutte le colonne, quindi scarica e archivia tutto. Questi nodi curano attivamente la rete contribuendo a ripristinare i dati mancanti, ma richiedono anche molta più larghezza di banda e spazio di archiviazione. Con il target finale dei blob 6 volte superiore rispetto a prima, i supernodi dovranno archiviare circa 600 GB di dati dei blob extra e avere una larghezza di banda di download sostenuta più veloce a circa 20 Mbps.

[Leggi maggiori dettagli sui requisiti previsti.](https://ethpandaops.io/posts/fusaka-bandwidth-estimation/#theoretical-requirements)

### Quali modifiche all'EVM sono implementate? {#what-evm-changes-are-implemented}

Fusaka consolida l'EVM con nuove modifiche e funzionalità minori.

- Per la sicurezza durante la scalabilità, la dimensione massima di una singola transazione sarà [limitata a 16,7 milioni](https://eips.ethereum.org/EIPS/eip-7825) di unità di gas.
- Il [nuovo codice operativo (opcode) per il conteggio degli zeri iniziali (CLZ)](https://eips.ethereum.org/EIPS/eip-7939) viene aggiunto all'EVM e consentirà ai linguaggi degli smart contract di eseguire determinate operazioni in modo più efficiente.
- [Il costo del precompilato `ModExp` sarà aumentato](https://eips.ethereum.org/EIPS/eip-7883): i contratti che lo utilizzano addebiteranno più gas per l'esecuzione.

### In che modo il nuovo limite di gas di 16M influisce sugli sviluppatori di contratti? {#how-does-new-16m-gas-limit-affects-contract-developers}

Fusaka introduce un limite alla [dimensione massima di una singola transazione a 16,7 milioni](https://eips.ethereum.org/EIPS/eip-7825) (2^24) di unità di gas. Questa è all'incirca la dimensione precedente di un blocco medio, il che la rende abbastanza grande da accogliere transazioni complesse che consumerebbero un intero blocco. Questo limite crea protezione per i client, prevenendo potenziali attacchi DoS in futuro con un limite di gas del blocco più elevato. L'obiettivo della scalabilità è consentire a più transazioni di entrare nella blockchain senza che una singola consumi l'intero blocco.

Le normali transazioni degli utenti sono lontane dal raggiungere questo limite. Alcuni casi limite come operazioni di finanza decentralizzata (DeFi) grandi e complesse, distribuzioni di smart contract di grandi dimensioni o transazioni in batch destinate a più contratti potrebbero essere interessati da questa modifica. Queste transazioni dovranno essere divise in transazioni più piccole o ottimizzate in un altro modo. Usa la simulazione prima di inviare transazioni che potenzialmente raggiungono il limite.

Il metodo RPC `eth_call` non è limitato e consentirà la simulazione di transazioni più grandi rispetto al limite effettivo della blockchain. Il limite effettivo per i metodi RPC può essere configurato dall'operatore del client per garantire la prevenzione degli abusi.

### Cosa significa CLZ per gli sviluppatori? {#what-clz-means-for-developers}

I compilatori EVM come Solidity implementeranno e utilizzeranno la nuova funzione per il conteggio degli zeri internamente. I nuovi contratti potrebbero beneficiare di risparmi di gas se si basano su questo tipo di operazione. Segui le versioni e gli annunci delle funzionalità del linguaggio degli smart contract per la documentazione sui potenziali risparmi.

### Ci sono modifiche per i miei smart contract esistenti? {#what-clz-means-for-developers-2}

Fusaka non ha alcun effetto diretto che interromperebbe i contratti esistenti o ne cambierebbe il comportamento. Le modifiche introdotte nel livello di esecuzione sono apportate con retrocompatibilità, tuttavia, tieni sempre d'occhio i casi limite e il potenziale impatto.

[Con l'aumento del costo del precompilato `ModExp`](https://eips.ethereum.org/EIPS/eip-7883), i contratti che dipendono da esso consumeranno più gas per l'esecuzione. Se il tuo contratto fa molto affidamento su questo e diventa più costoso per gli utenti, riconsidera come viene utilizzato.

Considera il [nuovo limite di 16,7 milioni](https://eips.ethereum.org/EIPS/eip-7825) se le transazioni che eseguono i tuoi contratti potrebbero raggiungere dimensioni simili.

## Letture consigliate {#further-reading}

- [Roadmap di Ethereum](/roadmap/)
- [Forkcast: Fusaka](https://forkcast.org/upgrade/fusaka)
- [Meta EIP di Fusaka](https://eips.ethereum.org/EIPS/eip-7607)
- [Annuncio sul blog della testnet Fusaka](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)
- [Bankless: Cosa porteranno Fusaka e Pectra a Ethereum](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless: I prossimi aggiornamenti di Ethereum: Fusaka, Glamsterdam e oltre con Preston Van Loon](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
- [I file di Fusaka](https://www.youtube.com/playlist?list=PL4cwHXAawZxpz-erUbKKUnnGoQNdF8s7Z)
- [Spiegazione di PEEPanEIPs](https://www.youtube.com/playlist?list=PL4cwHXAawZxoIenfk7OJry4rxcqX-eqBt)