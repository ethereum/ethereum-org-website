---
title: zkEVM per la verifica dei blocchi del L1
description: Scopri come le prove a conoscenza zero possono verificare l'esecuzione dei blocchi di Ethereum, consentendo una maggiore capacità transazionale e requisiti inferiori per i validatori.
lang: it
---

La zkEVM è una tecnologia che utilizza le [prove a conoscenza zero](/zero-knowledge-proofs/) per verificare l'esecuzione dei blocchi di Ethereum. Invece di richiedere a ogni [validatore](/glossary/#validator) di rieseguire tutte le transazioni in un blocco, un singolo attore specializzato (chiamato "prover") esegue il blocco e genera una prova crittografica che l'esecuzione è stata corretta. Qualsiasi nodo può quindi verificare questa prova: un processo che è ordini di grandezza più economico rispetto alla riesecuzione di tutte le transazioni.

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>Da non confondere con i rollup zkEVM</AlertTitle>
<AlertDescription>
Questa pagina discute l'utilizzo della zkEVM per verificare l'esecuzione dei blocchi del layer 1 (l1) di Ethereum. Per i rollup zkEVM che utilizzano le prove ZK per scalare Ethereum come soluzioni di layer 2 (l2), consulta i [rollup a conoscenza zero](/developers/docs/scaling/zk-rollups/).
</AlertDescription>
</AlertContent>
</Alert>

## Il problema della riesecuzione {#reexecution-problem}

Oggi, Ethereum utilizza un modello di verifica "N-di-N": ogni validatore deve rieseguire in modo indipendente ogni transazione in ogni blocco per verificare che le modifiche di stato proposte siano corrette. Sebbene questo approccio sia massimamente trustless, crea un collo di bottiglia fondamentale.

Il problema è che la capacità transazionale di Ethereum è limitata da ciò che il validatore medio può elaborare. Aumentare il [limite di gas](/glossary/#gas-limit) consentirebbe più transazioni per blocco, ma aumenterebbe anche i requisiti hardware per i validatori. Questo minaccia la decentralizzazione: se l'esecuzione di un validatore richiede hardware costoso, meno persone possono partecipare alla messa in sicurezza della rete.

La zkEVM offre una via d'uscita da questo compromesso. Passando da "tutti rieseguono" a "uno prova, tutti verificano", Ethereum può aumentare in sicurezza il limite di gas senza aumentare i requisiti hardware dei validatori.

## Come funziona la verifica del L1 con la zkEVM {#how-it-works}

La verifica tramite zkEVM trasforma la validazione del blocco in un modello "1-di-N":

1. **Esecuzione**: Un prover esegue tutte le transazioni in un blocco, tracciando ogni modifica di stato
2. **Generazione della prova**: Il prover genera una prova crittografica (uno [SNARK o STARK](/zero-knowledge-proofs/#types-of-zero-knowledge-proofs)) che attesta la correttezza dell'esecuzione
3. **Verifica**: I validatori verificano la prova invece di rieseguire le transazioni: questo è drasticamente più economico rispetto alla riesecuzione completa

La garanzia di sicurezza rimane la stessa: se l'esecuzione non è stata corretta, non può essere generata alcuna prova valida. Ma ora, invece di far eseguire calcoli costosi a ogni nodo, lo fa solo il prover, e la verifica è abbastanza economica da non limitare il limite di gas.

### zkEVM di Tipo 1 {#type-1-zkevm}

Le zkEVM sono classificate in tipi in base alla loro compatibilità con Ethereum:

- **Tipo 1**: Completamente equivalenti a Ethereum. Nessuna modifica all'EVM, quindi qualsiasi blocco di Ethereum può essere provato esattamente così com'è
- **Tipo 2-4**: Accettano vari compromessi, modificando il comportamento dell'EVM per facilitare la generazione delle prove

Per la verifica del layer 1 (l1), il Tipo 1 è essenziale. La zkEVM deve essere in grado di provare qualsiasi blocco valido di Ethereum, inclusi i casi limite e i blocchi storici. Qualsiasi deviazione dal comportamento esatto di Ethereum creerebbe problemi di consenso.

La ricerca sulla zkEVM della Fondazione Ethereum si concentra sulle implementazioni di Tipo 1 che sono completamente compatibili con l'attuale esecuzione di Ethereum.

## Vantaggi per Ethereum {#benefits}

### Maggiore capacità transazionale {#higher-throughput}

Quando la verifica è economica, il limite di gas può aumentare in sicurezza. Questo espande la capacità della rete e aiuta a stabilizzare le commissioni durante i periodi di alta domanda. L'attuale limite di gas è in parte vincolato dall'hardware dei validatori: la zkEVM rimuove questo vincolo.

### Maggiore decentralizzazione {#stronger-decentralization}

Con la verifica tramite zkEVM, i validatori devono solo verificare le prove anziché eseguire le transazioni. Questo riduce drasticamente i requisiti hardware per l'esecuzione di un validatore, consentendo a più persone di partecipare alla messa in sicurezza della rete. Una maggiore diversità dei validatori rafforza la resistenza alla censura e la resilienza di Ethereum.

Nota che la generazione delle prove richiede di per sé risorse computazionali significative, maggiori rispetto a quelle dell'attuale hardware dei validatori. Tuttavia, a differenza della validazione, la generazione delle prove non deve essere decentralizzata allo stesso modo: è necessaria solo una prova corretta per blocco e chiunque può verificarla rapidamente. La ricerca sui mercati dei prover, sull'aggregazione delle prove e sull'accelerazione hardware mira a garantire che la generazione delle prove rimanga competitiva e accessibile, anziché concentrata tra pochi grandi operatori.

### Definitività prevedibile {#predictable-finality}

La verifica delle prove opera in tempo costante indipendentemente dalla complessità del blocco. Questo rende le tempistiche di attestazione più prevedibili e riduce le attestazioni mancate che possono verificarsi quando i validatori faticano a elaborare blocchi complessi in tempo.

## Sfide della generazione delle prove in tempo reale {#realtime-proving}

La sfida principale per la verifica del L1 tramite zkEVM è la velocità. I blocchi di Ethereum vengono prodotti ogni 12 secondi, il che significa che le prove devono essere generate in un lasso di tempo simile per essere utili al consenso.

Le attuali implementazioni della zkEVM possono impiegare da minuti a ore per provare un singolo blocco. La ricerca si concentra sul colmare questo divario attraverso:

- **Parallelizzazione**: Distribuire il lavoro di generazione delle prove su più macchine
- **Hardware specializzato**: Progettare circuiti e hardware ottimizzati per la generazione di prove ZK
- **Miglioramenti algoritmici**: Sistemi di prova e design dei circuiti più efficienti
- **Generazione incrementale delle prove**: Generare le prove man mano che le transazioni vengono eseguite, anziché in seguito

## Ricerca e implementazioni attuali {#current-research}

La Fondazione Ethereum finanzia la ricerca sulla zkEVM attraverso il team [Privacy Stewards of Ethereum (PSE)](https://pse.dev/). I principali filoni di ricerca includono:

- **Generazione delle prove in tempo reale**: Generare prove complete dei blocchi all'interno di slot di 12 secondi
- **Integrazione dei client**: Standardizzare le interfacce tra i client di esecuzione e i prover
- **Incentivi economici**: Progettare mercati dei prover e strutture tariffarie sostenibili

### Stato dell'implementazione {#implementations}

Diverse implementazioni di zkVM sono in fase di sviluppo e test per la generazione delle prove dei blocchi di Ethereum:

| Implementazione | Architettura |
|----------------|--------------|
| [OpenVM](https://github.com/openvm-org/openvm) | rv32im |
| [RISC Zero](https://github.com/risc0/risc0) | rv32im |
| [Airbender](https://github.com/matter-labs/zksync-airbender) | rv32im |
| [Jolt](https://github.com/a16z/jolt) | rv32im |
| [Zisk](https://github.com/0xPolygonHermez/zisk) | rv64ima |

Queste utilizzano macchine virtuali basate su RISC-V per eseguire il bytecode dell'EVM, per poi generare prove ZK della corretta esecuzione. I risultati dei test aggiornati e i progressi sono tracciati nello [zkVM tracker della Fondazione Ethereum](https://zkevm.ethereum.foundation/zkvm-tracker).

## Come la zkEVM si integra con altri aggiornamenti {#related-upgrades}

La verifica del L1 tramite zkEVM si collega a diversi altri elementi della roadmap di Ethereum:

- **[Alberi di Verkle](/roadmap/verkle-trees/)**: Consentono witness più piccoli per la verifica in assenza di stato, riducendo i dati con cui i prover devono lavorare
- **[Assenza di stato](/roadmap/statelessness/)**: La zkEVM è un fattore abilitante chiave: con le prove ZK di esecuzione, i nodi non hanno bisogno dello stato completo per verificare i blocchi
- **[Separazione proponente-costruttore (PBS)](/roadmap/pbs/)**: I costruttori di blocchi potrebbero potenzialmente integrare la generazione delle prove, oppure potrebbe emergere un mercato dei prover separato
- **[Finalità a singolo slot](/roadmap/single-slot-finality/)**: Una generazione più rapida delle prove potrebbe consentire la finalità a singolo slot con garanzie crittografiche

<Alert variant="warning">
<AlertEmoji text="🧪" />
<AlertContent>
<AlertDescription>
La verifica del L1 tramite zkEVM è in fase di ricerca attiva e non è ancora integrata nei client di Ethereum in produzione.
</AlertDescription>
</AlertContent>
</Alert>

## Letture di approfondimento {#further-reading}

- [zkEVM Foundation](https://zkevm.ethereum.foundation) - Hub ufficiale di ricerca sulla zkEVM della Fondazione Ethereum
- [Ethproofs](https://ethproofs.org/) - Segui la corsa per provare Ethereum in tempo reale
- [zkevm.fyi](https://zkevm.fyi) - Libro tecnico sulla zkEVM per il L1
- [PSE zkEVM Specs](https://github.com/privacy-scaling-explorations/zkevm-specs) - Specifiche tecniche
- [The Verge](https://vitalik.eth.limo/general/2024/10/23/futures4.html) - Panoramica di Vitalik sui miglioramenti della verifica
- [EF zkEVM Blog](https://zkevm.ethereum.foundation/blog) - Analisi delle prestazioni dal team della Fondazione Ethereum