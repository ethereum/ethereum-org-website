---
title: Fulu-Osaka (Fusaka)
description: Scopri l'aggiornamento del protocollo Fusaka
lang: it
---

# Fusaka <Emoji text="🦓" /> {#fusaka}

**L'attesissimo aggiornamento Fusaka di Ethereum è stato lanciato il 3 dicembre 2025**

L'aggiornamento della rete Fusaka segue [Pectra](/roadmap/pectra/) e porta ulteriori nuove funzionalità e migliora l'esperienza per ogni utente e sviluppatore di [Ethereum](/). Il nome è composto dall'aggiornamento del livello di esecuzione Osaka e dalla versione del livello di consenso che prende il nome dalla stella Fulu. Entrambe le parti di Ethereum ricevono un aggiornamento che spinge la scalabilità, la sicurezza e l'esperienza utente di Ethereum verso il futuro.

<Alert variant="update">
<AlertContent>
<AlertDescription>
L'aggiornamento Fusaka è solo un singolo passo negli obiettivi di sviluppo a lungo termine di Ethereum. Scopri di più sul [piano d'azione del protocollo](/roadmap/) e sui [precedenti aggiornamenti](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Miglioramenti in Fusaka {#improvements-in-fusaka}

### Scalare i blob {#scale-blobs}

#### PeerDAS {#peerdas}

Questo è il _protagonista_ della biforcazione Fusaka, la funzionalità principale aggiunta in questo aggiornamento. I livello 2 attualmente pubblicano i loro dati su Ethereum nei blob, il tipo di dati effimero creato specificamente per i livello 2. Prima di Fusaka, ogni nodo completo doveva archiviare ogni blob per garantire che i dati esistessero. Con l'aumento del throughput dei blob, dover scaricare tutti questi dati diventa insostenibilmente dispendioso in termini di risorse.

Con il [campionamento della disponibilità dei dati](https://notes.ethereum.org/@fradamt/das-fork-choice), invece di dover archiviare tutti i dati dei blob, ogni nodo sarà responsabile di un sottoinsieme dei dati dei blob. I blob sono distribuiti in modo uniformemente casuale tra i nodi della rete, con ogni nodo completo che detiene solo 1/8 dei dati, consentendo quindi una scalabilità teorica fino a 8x. Per garantire la disponibilità dei dati, qualsiasi porzione dei dati può essere ricostruita da qualsiasi 50% esistente del totale con metodi che riducono la probabilità di dati errati o mancanti a un livello crittograficamente trascurabile (da ~uno su 10<sup>20</sup> a uno su 10<sup>24</sup>).

Questo mantiene sostenibili i requisiti hardware e di larghezza di banda per i nodi, consentendo al contempo la scalabilità dei blob, con conseguente maggiore scalabilità e commissioni inferiori per i livello 2.

[Scopri di più su PeerDAS](/roadmap/fusaka/peerdas/)

**Risorse**:

- [Specifica tecnica dell'EIP-7594](https://eips.ethereum.org/EIPS/eip-7594)
- [DappLion su PeerDAS: Scalare Ethereum Oggi | ETHSofia 2024](https://youtu.be/bONWd1x2TjQ?t=328)
- [Accademico: Una documentazione del PeerDAS di Ethereum (PDF)](https://eprint.iacr.org/2024/1362.pdf)

#### Biforcazioni solo per i parametri dei blob {#blob-parameter-only-forks}

I livello 2 scalano Ethereum: man mano che le loro reti crescono, devono pubblicare più dati su Ethereum. Ciò significa che Ethereum dovrà aumentare il numero di blob a loro disposizione col passare del tempo. Sebbene PeerDAS consenta di scalare i dati dei blob, ciò deve essere fatto gradualmente e in modo sicuro.

Poiché Ethereum è un codice in esecuzione su migliaia di nodi indipendenti che richiedono un accordo sulle stesse regole, non possiamo semplicemente introdurre modifiche come l'aumento del conteggio dei blob nel modo in cui si distribuisce l'aggiornamento di un sito web. Qualsiasi modifica alle regole deve essere un aggiornamento coordinato in cui ogni nodo, client e software del validatore si aggiorna prima dello stesso blocco predeterminato.

Questi aggiornamenti coordinati generalmente includono molte modifiche, richiedono molti test e ciò richiede tempo. Per adattarsi più rapidamente alle mutevoli esigenze dei blob dei livello 2, le biforcazioni solo per i parametri dei blob introducono un meccanismo per aumentare i blob senza dover aspettare quel programma di aggiornamento.

Le biforcazioni solo per i parametri dei blob possono essere impostate dai client, in modo simile ad altre configurazioni come il limite del gas. Tra i principali aggiornamenti di Ethereum, i client possono concordare di aumentare i blob `target` e `max` ad es. a 9 e 12 e quindi gli operatori dei nodi si aggiorneranno per prendere parte a quella minuscola biforcazione. Queste biforcazioni solo per i parametri dei blob possono essere configurate in qualsiasi momento.

Quando i blob sono stati aggiunti per la prima volta alla rete nell'aggiornamento Dencun, l'obiettivo era 3. È stato aumentato a 6 in Pectra e, dopo Fusaka, ora può essere aumentato a un ritmo sostenibile indipendentemente da questi importanti aggiornamenti della rete.

![Grafico che mostra il conteggio medio dei blob per blocco e l'aumento degli obiettivi con gli aggiornamenti](./average-blob-count-per-block.webp)

Fonte del grafico: [Ethereum Blobs - @hildobby, Dune Analytics](https://dune.com/hildobby/blobs)

**Risorse**: [Specifica tecnica dell'EIP-7892](https://eips.ethereum.org/EIPS/eip-7892)

#### Commissione di base dei blob limitata dai costi di esecuzione {#blob-base-fee-bounded-by-execution-costs}

I livello 2 pagano due conti quando pubblicano i dati: la commissione del blob e il gas di esecuzione necessario per verificare quei blob. Se il gas di esecuzione domina, l'asta della commissione del blob può scendere a spirale fino a 1 wei e smettere di essere un segnale di prezzo.

L'EIP-7918 fissa un prezzo di riserva proporzionale sotto ogni blob. Quando la riserva è superiore alla commissione di base nominale del blob, l'algoritmo di adeguamento delle commissioni tratta il blocco come oltre l'obiettivo e smette di spingere la commissione verso il basso, consentendole di aumentare normalmente. Di conseguenza:

- il mercato delle commissioni dei blob reagisce sempre alla congestione
- i livello 2 pagano almeno una fetta significativa del calcolo che impongono ai nodi
- i picchi della commissione di base sul livello di esecuzione non possono più bloccare la commissione del blob a 1 wei

**Risorse**:

- [Specifica tecnica dell'EIP-7918](https://eips.ethereum.org/EIPS/eip-7918)
- [Spiegazione Storybook](https://notes.ethereum.org/@anderselowsson/AIG)

### Scalare il L1 {#scale-l1}

#### Scadenza della cronologia e ricevute più semplici {#history-expiry}

A luglio 2025, i client di esecuzione di Ethereum [hanno iniziato a supportare la scadenza parziale della cronologia](https://blog.ethereum.org/2025/07/08/partial-history-exp). Questo ha eliminato la cronologia precedente a [The Merge](https://ethereum.org/roadmap/merge/) al fine di ridurre lo spazio su disco richiesto dagli operatori dei nodi mentre Ethereum continua a crescere.

Questo EIP si trova in una sezione separata dai "Core EIP" perché la biforcazione non implementa effettivamente alcuna modifica: è un avviso che i team dei client devono supportare la scadenza della cronologia entro l'aggiornamento Fusaka. In pratica, i client possono implementarlo in qualsiasi momento, ma aggiungerlo all'aggiornamento lo ha inserito concretamente nella loro lista di cose da fare e ha permesso loro di testare le modifiche di Fusaka in combinazione con questa funzionalità.

**Risorse**: [Specifica tecnica dell'EIP-7642](https://eips.ethereum.org/EIPS/eip-7642)

#### Impostare limiti superiori per MODEXP {#set-upper-bounds-for-modexp}

Finora, la precompilazione MODEXP accettava numeri di praticamente qualsiasi dimensione. Ciò la rendeva difficile da testare, facile da abusare e rischiosa per la stabilità del client. L'EIP-7823 pone un limite chiaro: ogni numero di input può essere lungo al massimo 8192 bit (1024 byte). Qualsiasi cosa più grande viene rifiutata, il gas della transazione viene bruciato e non si verificano cambiamenti di stato. Copre molto comodamente le esigenze del mondo reale rimuovendo i casi estremi che complicavano la pianificazione del limite del gas e le revisioni di sicurezza. Questa modifica fornisce maggiore sicurezza e protezione DoS senza influire sull'esperienza dell'utente o dello sviluppatore.

**Risorse**: [Specifica tecnica dell'EIP-7823](https://eips.ethereum.org/EIPS/eip-7823)

#### Tetto al limite del gas della transazione {#transaction-gas-limit-cap}

L'EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) aggiunge un tetto di 16.777.216 (2^24) gas per transazione. È un rafforzamento proattivo contro i DoS limitando il costo nel caso peggiore di qualsiasi singola transazione mentre aumentiamo il limite del gas del blocco. Rende la convalida e la propagazione più facili da modellare per consentirci di affrontare la scalabilità tramite l'aumento del limite del gas.

Perché esattamente 2^24 gas? È comodamente inferiore al limite del gas odierno, è abbastanza grande per le distribuzioni di contratti reali e le precompilazioni pesanti, e una potenza di 2 lo rende facile da implementare tra i client. Questa nuova dimensione massima della transazione è simile alla dimensione media del blocco pre-Pectra, rendendola un limite ragionevole per qualsiasi operazione su Ethereum.

**Risorse**: [Specifica tecnica dell'EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)

#### Aumento del costo del gas di `MODEXP` {#modexp-gas-cost-increase}

MODEXP è una funzione integrata di precompilazione che calcola l'esponenziazione modulare, un tipo di matematica per grandi numeri utilizzata nella verifica delle firme RSA e nei sistemi di prova. Consente ai contratti di eseguire questi calcoli direttamente senza doverli implementare da soli.

Gli sviluppatori e i team dei client hanno identificato MODEXP come un ostacolo importante all'aumento del limite del gas del blocco perché l'attuale prezzo del gas spesso sottostima quanta potenza di calcolo richiedono determinati input. Ciò significa che una transazione che utilizza MODEXP potrebbe occupare la maggior parte del tempo necessario per elaborare un intero blocco, rallentando la rete.

Questo EIP modifica i prezzi per farli corrispondere ai costi computazionali reali:

- aumentando l'addebito minimo da 200 a 500 gas e rimuovendo lo sconto di un terzo dall'EIP-2565 sul calcolo del costo generale
- aumentando il costo in modo più netto quando l'input dell'esponente è molto lungo. Se l'esponente (il numero "potenza" che passi come secondo argomento) è più lungo di 32 byte / 256 bit, l'addebito del gas sale molto più velocemente per ogni byte extra
- addebitando un extra anche per basi o moduli di grandi dimensioni. Si presume che gli altri due numeri (la base e il modulo) siano di almeno 32 byte: se uno dei due è più grande, il costo aumenta in proporzione alle sue dimensioni

Adattando meglio i costi al tempo di elaborazione effettivo, MODEXP non può più far sì che un blocco impieghi troppo tempo per essere convalidato. Questa modifica è una delle tante volte a rendere sicuro l'aumento del limite del gas del blocco di Ethereum in futuro.

**Risorse**: [Specifica tecnica dell'EIP-7883](https://eips.ethereum.org/EIPS/eip-7883)

#### Limite della dimensione del blocco di esecuzione RLP {#rlp-execution-block-size-limit}

Questo crea un tetto su quanto può essere grande un blocco: questo è un limite su ciò che viene _inviato_ sulla rete ed è separato dal limite del gas, che limita il _lavoro_ all'interno di un blocco. Il limite della dimensione del blocco è di 10 MiB, con un piccolo margine (2 MiB) riservato ai dati di consenso in modo che tutto si adatti e si propaghi in modo pulito. Se un blocco si presenta più grande di così, i client lo rifiutano.
Questo è necessario perché i blocchi molto grandi impiegano più tempo a diffondersi e a essere verificati attraverso la rete e possono creare problemi di consenso o essere abusati come vettore DoS. Inoltre, il gossip del livello di consenso già non inoltra blocchi superiori a ~10 MiB, quindi allineare il livello di esecuzione a quel limite evita strane situazioni del tipo "visto da alcuni, scartato da altri".

I dettagli pratici: questo è un tetto alla dimensione del blocco di esecuzione codificato in [RLP](/developers/docs/data-structures-and-encoding/rlp/). 10 MiB in totale, con un margine di sicurezza di 2 MiB riservato all'inquadramento del blocco della beacon chain. In pratica, i client definiscono

`MAX_BLOCK_SIZE = 10,485,760` byte e

`SAFETY_MARGIN = 2,097,152` byte,

e rifiutano qualsiasi blocco di esecuzione il cui payload RLP superi

`MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`

L'obiettivo è limitare il tempo di propagazione/convalida nel caso peggiore e allinearsi al comportamento del gossip del livello di consenso, riducendo il rischio di riorganizzazione/DoS senza modificare la contabilità del gas.

**Risorse**: [Specifica tecnica dell'EIP-7934](https://eips.ethereum.org/EIPS/eip-7934)

#### Impostare il limite del gas predefinito a 60 milioni {#set-default-gas-limit-to-60-million}

Prima di aumentare il limite del gas da 30M a 36M a febbraio 2025 (e successivamente a 45M), questo valore non era cambiato da The Merge (settembre 2022). Questo EIP mira a rendere la scalabilità coerente una priorità.

L'EIP-7935 coordina i team dei client di esecuzione per aumentare il limite del gas predefinito oltre gli attuali 45M per Fusaka. È un EIP informativo, ma chiede esplicitamente ai client di testare limiti più elevati sulle reti di sviluppo, convergere su un valore sicuro e distribuire quel numero nelle loro versioni di Fusaka.

La pianificazione della rete di sviluppo punta a uno stress di ~60M (blocchi pieni con carico sintetico) e ad aumenti iterativi; la ricerca afferma che le patologie della dimensione del blocco nel caso peggiore non dovrebbero vincolare al di sotto di ~150M. Il lancio dovrebbe essere abbinato al tetto del limite del gas della transazione (EIP-7825) in modo che nessuna singola transazione possa dominare man mano che i limiti aumentano.

**Risorse**: [Specifica tecnica dell'EIP-7935](https://eips.ethereum.org/EIPS/eip-7935)

### Migliorare l'UX {#improve-ux}

#### Previsione deterministica del proponente {#deterministic-proposer-lookahead}

Con l'EIP-7917, la Beacon Chain diventerà consapevole dei futuri proponenti del blocco per la prossima epoca. Avere una visione deterministica su quali validatori proporranno i blocchi futuri può abilitare le [preconferme](https://ethresear.ch/t/based-preconfirmations/17353): un impegno con il futuro proponente che garantisce che la transazione dell'utente sarà inclusa nel suo blocco senza aspettare il blocco effettivo.

Questa funzionalità avvantaggia le implementazioni dei client e la sicurezza della rete in quanto previene casi limite in cui i validatori potrebbero manipolare il programma del proponente. La previsione consente inoltre una minore complessità dell'implementazione.

**Risorse**: [Specifica tecnica dell'EIP-7917](https://eips.ethereum.org/EIPS/eip-7917)

#### Opcode per il conteggio degli zeri iniziali (CLZ) {#count-leading-zeros-opcode}

Questa funzionalità aggiunge una piccola istruzione alla EVM, il **conteggio degli zeri iniziali (CLZ)**. Quasi tutto nella EVM è rappresentato come un valore a 256 bit: questo nuovo opcode restituisce quanti bit zero ci sono all'inizio. Questa è una funzionalità comune in molte architetture di set di istruzioni in quanto consente operazioni aritmetiche più efficienti. In pratica, questo riduce le odierne scansioni di bit manuali in un unico passaggio, quindi trovare il primo bit impostato, scansionare i byte o analizzare i campi di bit diventa più semplice ed economico. L'opcode ha un costo fisso e basso ed è stato valutato alla pari con un'addizione di base, il che riduce il bytecode e fa risparmiare gas per lo stesso lavoro.

**Risorse**: [Specifica tecnica dell'EIP-7939](https://eips.ethereum.org/EIPS/eip-7939)

#### Precompilazione per il supporto della curva secp256r1 {#secp256r1-precompile}

Introduce un verificatore di firme secp256r1 (P-256) integrato in stile passkey all'indirizzo fisso `0x100` utilizzando lo stesso formato di chiamata già adottato da molti L2 e risolvendo i casi limite, in modo che i contratti scritti per quegli ambienti funzionino sul L1 senza modifiche.

Aggiornamento dell'UX! Per gli utenti, questo sblocca la firma nativa del dispositivo e le passkey. I portafogli possono attingere direttamente ad Apple Secure Enclave, Android Keystore, moduli di sicurezza hardware (HSM) e FIDO2/WebAuthn: nessuna frase di recupero, onboarding più fluido e flussi multi-fattore che sembrano app moderne. Ciò si traduce in una migliore UX, un recupero più semplice e modelli di astrazione dell'account che corrispondono a ciò che miliardi di dispositivi fanno già.

Per gli sviluppatori, accetta un input di 160 byte e restituisce un output di 32 byte, semplificando il porting di librerie e contratti L2 esistenti. Sotto il cofano, include controlli del punto all'infinito e di confronto modulare per eliminare casi limite insidiosi senza interrompere i chiamanti validi.

**Risorse**:

- [Specifica tecnica dell'EIP-7951](https://eips.ethereum.org/EIPS/eip-7951)
- [Maggiori informazioni su RIP-7212](https://www.alchemy.com/blog/what-is-rip-7212) _(Nota che l'EIP-7951 ha sostituito il RIP-7212)_

### Meta {#meta}

#### Metodo JSON-RPC `eth_config` {#eth-config}

Questa è una chiamata JSON-RPC che ti consente di chiedere al tuo nodo quali impostazioni della biforcazione stai eseguendo. Restituisce tre istantanee: `current`, `next` e `last` in modo che i validatori e gli strumenti di monitoraggio possano verificare che i client siano allineati per un'imminente biforcazione.

In pratica, questo serve ad affrontare una lacuna scoperta quando la biforcazione Pectra è stata lanciata sulla rete di test Holesky all'inizio del 2025 con configurazioni errate minori che hanno portato a uno stato non finalizzante. Questo aiuta i team di test e gli sviluppatori a garantire che le principali biforcazioni si comportino come previsto quando si passa dalle reti di sviluppo alle reti di test e dalle reti di test alla rete principale.

Le istantanee includono: `chainId`, `forkId`, tempo di attivazione pianificato della biforcazione, quali precompilazioni sono attive, indirizzi di precompilazione, dipendenze dei contratti di sistema e la pianificazione dei blob della biforcazione.

Questo EIP si trova in una sezione separata dai "Core EIP" perché la biforcazione non implementa effettivamente alcuna modifica: è un avviso che i team dei client devono implementare questo metodo JSON-RPC entro l'aggiornamento Fusaka.

**Risorse**: [Specifica tecnica dell'EIP-7910](https://eips.ethereum.org/EIPS/eip-7910)

## FAQ {#faq}

### Questo aggiornamento influisce su tutti i nodi e i validatori di Ethereum? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

Sì, l'aggiornamento Fusaka richiede aggiornamenti sia ai [client di esecuzione che ai client di consenso](/developers/docs/nodes-and-clients/). Tutti i principali client di Ethereum rilasceranno versioni che supportano la biforcazione hard contrassegnate come ad alta priorità. Puoi tenerti aggiornato su quando queste versioni saranno disponibili nei repository GitHub dei client, nei loro [canali Discord](https://ethstaker.org/support), nel [Discord di EthStaker](https://dsc.gg/ethstaker) o iscrivendoti al blog di Ethereum per gli aggiornamenti del protocollo. Per mantenere la sincronizzazione con la rete Ethereum dopo l'aggiornamento, gli operatori dei nodi devono assicurarsi di eseguire una versione del client supportata. Nota che le informazioni sulle versioni dei client sono sensibili al fattore tempo e gli utenti dovrebbero fare riferimento agli ultimi aggiornamenti per i dettagli più recenti.

### Come può essere convertito l'ETH dopo la biforcazione hard? {#how-can-eth-be-converted-after-the-hardfork}

- **Nessuna azione richiesta per i tuoi ETH**: A seguito dell'aggiornamento Fusaka di Ethereum, non è necessario convertire o aggiornare i tuoi ETH. I saldi del tuo account rimarranno gli stessi e gli ETH che detieni attualmente rimarranno accessibili nella loro forma esistente dopo la biforcazione hard.
- **Attenzione alle truffe!** <Emoji text="⚠️" /> **chiunque ti istruisca ad "aggiornare" i tuoi ETH sta cercando di truffarti.** Non c'è nulla che tu debba fare in relazione a questo aggiornamento. I tuoi asset rimarranno completamente inalterati. Ricorda, rimanere informati è la migliore difesa contro le truffe.

[Maggiori informazioni su come riconoscere ed evitare le truffe](/security/)

### Cosa c'entrano le zebre? <Emoji text="🦓" /> {#whats-with-the-zebras}

Una zebra è la "mascotte" scelta dagli sviluppatori per Fusaka perché le sue strisce riflettono il campionamento della disponibilità dei dati basato su colonne di PeerDAS, in cui i nodi custodiscono determinate sottoreti di colonne e campionano alcune altre colonne dallo slot di ciascun peer per verificare che i dati dei blob siano disponibili.

The Merge nel 2022 [ha utilizzato un panda](https://x.com/hwwonx/status/1431970802040127498) come mascotte per segnalare l'unione dei livelli di esecuzione e di consenso. Da allora, le mascotte sono state scelte in modo informale per ogni biforcazione e vengono visualizzate come arte ASCII nei log del client al momento dell'aggiornamento. È solo un modo divertente per festeggiare.

### Quali miglioramenti sono inclusi per la scalabilità dei L2? {#what-improvements-are-included-for-l2-scaling}

[PeerDAS](/roadmap/fusaka/peerdas) è la funzionalità principale della biforcazione. Implementa il campionamento della disponibilità dei dati (DAS) che sblocca maggiore scalabilità per i rollup, scalando teoricamente lo spazio dei blob fino a 8 volte la dimensione attuale. Anche il mercato delle commissioni dei blob verrà migliorato per reagire in modo efficiente alla congestione e garantire che i L2 paghino una commissione significativa per il calcolo e lo spazio che i blob impongono ai nodi.

### In che modo le biforcazioni BPO sono diverse? {#how-are-bpo-forks-different}

Le biforcazioni Blob Only Parameter (solo per i parametri dei blob) forniscono un meccanismo per aumentare continuamente il conteggio dei blob (sia target che max) dopo l'attivazione di PeerDAS, senza dover aspettare un aggiornamento coordinato completo. Ogni aumento è codificato per essere preconfigurato nelle versioni dei client che supportano Fusaka.

Come utente o validatore, non è necessario aggiornare i client per ogni BPO e devi solo assicurarti di seguire le principali biforcazioni hard come Fusaka. Questa è la stessa pratica di prima, non sono necessarie azioni speciali. Si consiglia comunque di monitorare i client in prossimità di aggiornamenti e BPO e di mantenerli aggiornati anche tra le versioni principali, poiché correzioni o ottimizzazioni potrebbero seguire la biforcazione hard.

### Qual è il programma dei BPO? {#what-is-the-bpo-schedule}

Il programma esatto degli aggiornamenti BPO verrà determinato con le versioni di Fusaka. Segui gli [Annunci del protocollo](https://blog.ethereum.org/category/protocol) e le note di rilascio dei tuoi client.

Esempio di come potrebbe apparire:

- Prima di Fusaka: target 6, max 9
- All'attivazione di Fusaka: target 6, max 9
- BPO1, poche settimane dopo l'attivazione di Fusaka: target 10, max 15, con un aumento di due terzi
- BPO2, poche settimane dopo il BPO1: target 14, max 21

### Questo abbasserà le commissioni su Ethereum (livello 1)? {#will-this-lower-gas}

Questo aggiornamento non abbassa le commissioni del gas sul L1, almeno non direttamente. L'obiettivo principale è più spazio per i blob per i dati dei rollup, abbassando quindi le commissioni sul livello 2. Questo potrebbe avere alcuni effetti collaterali sul mercato delle commissioni del L1, ma non è previsto alcun cambiamento significativo.

### Come staker, cosa devo fare per l'aggiornamento? {#as-a-staker-what-do-i-need-to-do-for-the-upgrade}

Come per ogni aggiornamento della rete, assicurati di aggiornare i tuoi client alle ultime versioni contrassegnate con il supporto per Fusaka. Segui gli aggiornamenti nella mailing list e negli [Annunci del protocollo sul blog della EF](https://blog.ethereum.org/category/protocol) per essere informato sulle versioni.
Per convalidare la tua configurazione prima che Fusaka venga attivato sulla rete principale, puoi eseguire un validatore sulle reti di test. Fusaka viene [attivato prima sulle reti di test](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement) dandoti più spazio per assicurarti che tutto funzioni e segnalare bug. Le biforcazioni della rete di test vengono annunciate anche nella mailing list e nel blog.

### La "Previsione deterministica del proponente" (EIP-7917) influisce sui validatori? {#does-7917-affect-validators}

Questa modifica non cambia il funzionamento del tuo client del validatore, tuttavia, fornirà maggiori informazioni sul futuro dei tuoi doveri di validatore. Assicurati di aggiornare i tuoi strumenti di monitoraggio per stare al passo con le nuove funzionalità.

### In che modo Fusaka influisce sui requisiti di larghezza di banda per nodi e validatori? {#how-does-fusaka-affect-bandwidth-requirements-for-nodes-and-validators}

PeerDAS apporta un cambiamento significativo nel modo in cui i nodi trasmettono i dati dei blob. Tutti i dati sono divisi in pezzi chiamati colonne attraverso 128 sottoreti con i nodi che si iscrivono solo ad alcune di esse. La quantità di colonne di sottorete che i nodi devono custodire dipende dalla loro configurazione e dal numero di validatori connessi. I requisiti effettivi di larghezza di banda dipenderanno dalla quantità di blob consentiti nella rete e dal tipo di nodo. Al momento dell'attivazione di Fusaka, l'obiettivo dei blob rimane lo stesso di prima, ma con PeerDAS, gli operatori dei nodi possono vedere una diminuzione dell'utilizzo del disco dei blob e del traffico di rete. Man mano che i BPO configurano un numero maggiore di blob nella rete, la larghezza di banda necessaria aumenterà con ogni BPO.

I requisiti dei nodi rientrano ancora nei [margini consigliati](https://eips.ethereum.org/EIPS/eip-7870) anche dopo i BPO di Fusaka.

#### Nodi completi {#full-nodes}

I nodi regolari senza alcun validatore si iscriveranno a sole 4 sottoreti, fornendo la custodia per 1/8 dei dati originali. Ciò significa che con la stessa quantità di dati dei blob, la larghezza di banda del nodo per scaricarli sarebbe inferiore di un fattore otto (8). L'utilizzo del disco e la larghezza di banda di download dei blob per un normale nodo completo potrebbero diminuire di circa l'80%, a soli pochi Mb.

#### Staker solitari {#solo-stakers}

Se il nodo viene utilizzato per un client del validatore, deve custodire più colonne e quindi elaborare più dati. Con l'aggiunta di un validatore, il nodo si iscrive ad almeno 8 sottoreti di colonne e quindi elabora il doppio dei dati rispetto a un nodo regolare, ma comunque meno rispetto a prima di Fusaka. Se il saldo del validatore è superiore a 287 ETH, verranno sottoscritte sempre più sottoreti.

Per uno staker solitario, ciò significa che l'utilizzo del disco e la larghezza di banda di download diminuiranno di circa il 50%. Tuttavia, per costruire blocchi localmente e caricare tutti i blob sulla rete, è necessaria una maggiore larghezza di banda di upload. I costruttori locali avranno bisogno di una larghezza di banda di upload 2-3 volte superiore rispetto a prima al momento di Fusaka e con l'obiettivo BPO2 di 15/21 blob, la larghezza di banda di upload finale necessaria dovrà essere circa 5 volte superiore, a 100 Mbps.

#### Grandi validatori {#large-validators}

Il numero di sottoreti sottoscritte cresce con l'aggiunta di più saldo e validatori al nodo. Ad esempio, con un saldo di circa 800 ETH, il nodo custodisce 25 colonne e avrà bisogno di circa il 30% in più di larghezza di banda di download rispetto a prima. L'upload necessario aumenta in modo simile ai nodi regolari ed è necessario almeno 100 Mbps.

A 4096 ETH, 2 validatori con saldo massimo, il nodo diventa un "supernodo" che custodisce tutte le colonne, quindi scarica e archivia tutto. Questi nodi curano attivamente la rete restituendo i dati mancanti, ma richiedono anche molta più larghezza di banda e spazio di archiviazione. Con l'obiettivo finale dei blob 6 volte superiore rispetto a prima, i supernodi dovranno archiviare circa 600 GB di dati dei blob extra e avere una larghezza di banda di download sostenuta più veloce a circa 20 Mbps.

[Leggi maggiori dettagli sui requisiti previsti.](https://ethpandaops.io/posts/fusaka-bandwidth-estimation/#theoretical-requirements)

### Quali modifiche alla EVM sono implementate? {#what-evm-changes-are-implemented}

Fusaka consolida la EVM con nuove modifiche e funzionalità minori.

- Per la sicurezza durante la scalabilità, la dimensione massima di una singola transazione sarà [limitata a 16,7 milioni](https://eips.ethereum.org/EIPS/eip-7825) di unità di gas.
- [Il nuovo opcode per il conteggio degli zeri iniziali (CLZ)](https://eips.ethereum.org/EIPS/eip-7939) viene aggiunto alla EVM e consentirà ai linguaggi dei contratti intelligenti di eseguire determinate operazioni in modo più efficiente.
- [Il costo della precompilazione `ModExp` verrà aumentato](https://eips.ethereum.org/EIPS/eip-7883): i contratti che la utilizzano addebiteranno più gas per l'esecuzione.

### In che modo il nuovo limite del gas di 16M influisce sugli sviluppatori di contratti? {#how-does-new-16m-gas-limit-affects-contract-developers}

Fusaka introduce un limite alla [dimensione massima di una singola transazione a 16,7 milioni](https://eips.ethereum.org/EIPS/eip-7825) (2^24) di unità di gas. Questa è all'incirca la dimensione precedente di un blocco medio, il che la rende abbastanza grande da accogliere transazioni complesse che consumerebbero un intero blocco. Questo limite crea protezione per i client, prevenendo potenziali attacchi DoS in futuro con un limite del gas del blocco più elevato. L'obiettivo della scalabilità è consentire a più transazioni di entrare nella blockchain senza che una singola consumi l'intero blocco.

Le normali transazioni degli utenti sono lontane dal raggiungere questo limite. Alcuni casi limite come operazioni DeFi grandi e complesse, distribuzioni di contratti intelligenti di grandi dimensioni o transazioni in batch destinate a più contratti potrebbero essere interessati da questa modifica. Queste transazioni dovranno essere divise in transazioni più piccole o ottimizzate in un altro modo. Usa la simulazione prima di inviare transazioni che potenzialmente raggiungono il limite.

Il metodo RPC `eth_call` non è limitato e consentirà la simulazione di transazioni più grandi rispetto al limite effettivo della blockchain. Il limite effettivo per i metodi RPC può essere configurato dall'operatore del client per garantire la prevenzione degli abusi.

### Cosa significa CLZ per gli sviluppatori? {#what-clz-means-for-developers}

I compilatori EVM come Solidity implementeranno e utilizzeranno la nuova funzione per il conteggio degli zeri dietro le quinte. I nuovi contratti potrebbero beneficiare di risparmi di gas se si basano su questo tipo di operazione. Segui le versioni e gli annunci delle funzionalità del linguaggio dei contratti intelligenti per la documentazione sui potenziali risparmi.

### Ci sono modifiche per i miei contratti intelligenti esistenti? {#what-clz-means-for-developers}

Fusaka non ha alcun effetto diretto che interromperebbe i contratti esistenti o ne cambierebbe il comportamento. Le modifiche introdotte nel livello di esecuzione sono apportate con retrocompatibilità, tuttavia, tieni sempre d'occhio i casi limite e il potenziale impatto.

[Con l'aumento del costo della precompilazione `ModExp`](https://eips.ethereum.org/EIPS/eip-7883), i contratti che ne dipendono consumeranno più gas per l'esecuzione. Se il tuo contratto fa molto affidamento su questo e diventa più costoso per gli utenti, riconsidera come viene utilizzato.

Considera il [nuovo limite di 16,7 milioni](https://eips.ethereum.org/EIPS/eip-7825) se le transazioni che eseguono i tuoi contratti potrebbero raggiungere dimensioni simili.

## Letture di approfondimento {#further-reading}

- [Piano d'azione di Ethereum](/roadmap/)
- [Forkcast: Fusaka](https://forkcast.org/upgrade/fusaka)
- [Meta EIP di Fusaka](https://eips.ethereum.org/EIPS/eip-7607)
- [Annuncio sul blog della rete di test Fusaka](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)
- [Bankless: Cosa porteranno Fusaka e Pectra a Ethereum](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless: I prossimi aggiornamenti di Ethereum: Fusaka, Glamsterdam e oltre con Preston Van Loon](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
- [I file Fusaka](https://www.youtube.com/playlist?list=PL4cwHXAawZxpz-erUbKKUnnGoQNdF8s7Z)
- [PEEPanEIPs spiegati](https://www.youtube.com/playlist?list=PL4cwHXAawZxoIenfk7OJry4rxcqX-eqBt)