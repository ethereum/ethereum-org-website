---
title: zkEVM per la verifica dei blocchi di L1
description: Scopri come le prove a conoscenza-zero possono verificare l'esecuzione dei blocchi di Ethereum, consentendo un throughput più elevato e requisiti inferiori per i validatori.
lang: it
---

# zkEVM per la verifica dei blocchi di L1 {#zkevm-l1}

zkEVM è una tecnologia che utilizza le [prove a conoscenza-zero](/zero-knowledge-proofs/) per verificare l'esecuzione dei blocchi di Ethereum. Invece di richiedere a ogni [validatore](/glossary/#validator) di rieseguire tutte le transazioni in un blocco, un singolo attore specializzato (chiamato "prover") esegue il blocco e genera una prova crittografica che l'esecuzione è stata corretta. Qualsiasi nodo può quindi verificare questa prova: un processo che è ordini di grandezza più economico rispetto alla riesecuzione di tutte le transazioni.

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>Da non confondere con i rollup zkEVM</AlertTitle>
<AlertDescription>
Questa pagina discute l'utilizzo di zkEVM per verificare l'esecuzione dei blocchi di L1 di Ethereum. Per i rollup zkEVM che utilizzano le prove ZK per scalare Ethereum come soluzioni di livello 2, consulta i [rollup a conoscenza zero](/developers/docs/scaling/zk-rollups/).
</AlertDescription>
</AlertContent>
</Alert>

## Il problema della riesecuzione {#reexecution-problem}

Oggi, Ethereum utilizza un modello di verifica "N-di-N": ogni validatore deve rieseguire in modo indipendente ogni transazione in ogni blocco per verificare che le modifiche di stato proposte siano corrette. Sebbene questo approccio sia massimamente trustless, crea un collo di bottiglia fondamentale.

Il problema è che il throughput di Ethereum è limitato da ciò che il validatore medio può elaborare. Aumentare il [limite del gas](/glossary/#gas-limit) consentirebbe più transazioni per blocco, ma aumenterebbe anche i requisiti hardware per i validatori. Questo minaccia la decentralizzazione: se l'esecuzione di un validatore richiede hardware costoso, meno persone possono partecipare alla messa in sicurezza della rete.

zkEVM offre una via d'uscita da questo compromesso. Passando da "tutti rieseguono" a "uno prova, tutti verificano", Ethereum può aumentare in sicurezza il limite del gas senza aumentare i requisiti hardware dei validatori.

## Come funziona la verifica di L1 con zkEVM {#how-it-works}

La verifica zkEVM trasforma la convalida dei blocchi in un modello "1-di-N":

1. **Esecuzione**: Un prover esegue tutte le transazioni in un blocco, tracciando ogni modifica di stato
2. **Prova**: Il prover genera una prova crittografica (uno [SNARK o STARK](/zero-knowledge-proofs/#types-of-zero-knowledge-proofs)) che attesta la correttezza dell'esecuzione
3. **Verifica**: I validatori verificano la prova invece di rieseguire le transazioni: questo è drasticamente più economico rispetto alla riesecuzione completa

La garanzia di sicurezza rimane la stessa: se l'esecuzione non era corretta, non può essere generata alcuna prova valida. Ma ora, invece che ogni nodo esegua calcoli costosi, lo fa solo il prover, e la verifica è abbastanza economica da non limitare il limite del gas.

### zkEVM di Tipo 1 {#type-1-zkevm}

Gli zkEVM sono classificati in tipi in base alla loro compatibilità con Ethereum:

- **Tipo 1**: Completamente equivalenti a Ethereum. Nessuna modifica all'EVM, quindi qualsiasi blocco di Ethereum può essere provato esattamente così com'è
- **Tipo 2-4**: Accettano vari compromessi, modificando il comportamento dell'EVM per facilitare la prova

Per la verifica di L1, il Tipo 1 è essenziale. Lo zkEVM deve essere in grado di provare qualsiasi blocco di Ethereum valido, inclusi i casi limite e i blocchi storici. Qualsiasi deviazione dal comportamento esatto di Ethereum creerebbe problemi di consenso.

La ricerca sugli zkEVM della Ethereum Foundation si concentra sulle implementazioni di Tipo 1 che sono completamente compatibili con l'esecuzione esistente di Ethereum.

## Vantaggi per Ethereum {#benefits}

### Throughput più elevato {#higher-throughput}

Quando la verifica è economica, il limite del gas può aumentare in sicurezza. Questo espande la capacità della rete e aiuta a stabilizzare le commissioni durante i periodi di alta domanda. L'attuale limite del gas è in parte vincolato dall'hardware dei validatori: zkEVM rimuove questo vincolo.

### Decentralizzazione più forte {#stronger-decentralization}

Con la verifica zkEVM, i validatori devono solo verificare le prove piuttosto che eseguire le transazioni. Questo riduce drasticamente i requisiti hardware per l'esecuzione di un validatore, consentendo a più persone di partecipare alla messa in sicurezza della rete. Una maggiore diversità dei validatori rafforza la resistenza alla censura e la resilienza di Ethereum.

Nota che la prova stessa richiede risorse computazionali significative, maggiori di quelle dell'attuale hardware dei validatori. Tuttavia, a differenza della convalida, la prova non ha bisogno di essere decentralizzata allo stesso modo: è necessaria solo una prova corretta per blocco e chiunque può verificarla rapidamente. La ricerca sui mercati dei prover, sull'aggregazione delle prove e sull'accelerazione hardware mira a garantire che la prova rimanga competitiva e accessibile piuttosto che concentrata tra pochi grandi operatori.

### Finalità prevedibile {#predictable-finality}

La verifica delle prove opera in tempo costante indipendentemente dalla complessità del blocco. Questo rende i tempi di attestazione più prevedibili e riduce le attestazioni mancate che possono verificarsi quando i validatori faticano a elaborare blocchi complessi in tempo.

## Sfide della prova in tempo reale {#realtime-proving}

La sfida principale per la verifica di L1 con zkEVM è la velocità. I blocchi di Ethereum vengono prodotti ogni 12 secondi, il che significa che le prove devono essere generate in un lasso di tempo simile per essere utili per il consenso.

Le attuali implementazioni zkEVM possono impiegare da minuti a ore per provare un singolo blocco. La ricerca si concentra sul colmare questo divario attraverso:

- **Parallelizzazione**: Distribuire il lavoro di prova su più macchine
- **Hardware specializzato**: Progettare circuiti e hardware ottimizzati per le prove ZK
- **Miglioramenti algoritmici**: Sistemi di prova e design dei circuiti più efficienti
- **Prova incrementale**: Generare prove man mano che le transazioni vengono eseguite, piuttosto che dopo

## Ricerca e implementazioni attuali {#current-research}

La Ethereum Foundation finanzia la ricerca sugli zkEVM attraverso il team [Privacy Stewards of Ethereum (PSE)](https://pse.dev/). I principali filoni di ricerca includono:

- **Prova in tempo reale**: Generare prove complete dei blocchi entro slot di 12 secondi
- **Integrazione dei client**: Standardizzare le interfacce tra i client di esecuzione e i prover
- **Incentivi economici**: Progettare mercati dei prover e strutture delle commissioni sostenibili

### Stato dell'implementazione {#implementations}

Diverse implementazioni zkVM sono in fase di sviluppo e test per la prova dei blocchi di Ethereum:

| Implementazione | Architettura |
|----------------|--------------|
| [OpenVM](https://github.com/openvm-org/openvm) | rv32im |
| [RISC Zero](https://github.com/risc0/risc0) | rv32im |
| [Airbender](https://github.com/matter-labs/zksync-airbender) | rv32im |
| [Jolt](https://github.com/a16z/jolt) | rv32im |
| [Zisk](https://github.com/0xPolygonHermez/zisk) | rv64ima |

Queste utilizzano macchine virtuali basate su RISC-V per eseguire il bytecode dell'EVM, quindi generano prove ZK della corretta esecuzione. I risultati dei test aggiornati e i progressi sono tracciati nel [tracker zkVM della Ethereum Foundation](https://zkevm.ethereum.foundation/zkvm-tracker).

## Come si inserisce zkEVM con gli altri aggiornamenti {#related-upgrades}

La verifica di L1 con zkEVM si collega a diversi altri elementi del piano d'azione di Ethereum:

- **[Alberi di Verkle](/roadmap/verkle-trees/)**: Consentono witness più piccoli per la verifica senza stato, riducendo i dati con cui i prover devono lavorare
- **[Assenza di stato](/roadmap/statelessness/)**: zkEVM è un fattore abilitante chiave: con le prove ZK di esecuzione, i nodi non hanno bisogno dello stato completo per verificare i blocchi
- **[PBS](/roadmap/pbs/)**: I costruttori di blocchi potrebbero potenzialmente integrare la generazione di prove, o potrebbe emergere un mercato dei prover separato
- **[Finalità a slot singolo](/roadmap/single-slot-finality/)**: Una generazione di prove più rapida potrebbe consentire la finalità a slot singolo con garanzie crittografiche

<Alert variant="warning">
<AlertEmoji text="🧪" />
<AlertContent>
<AlertDescription>
La verifica di L1 con zkEVM è in fase di ricerca attiva e non è ancora integrata nei client di Ethereum in produzione.
</AlertDescription>
</AlertContent>
</Alert>

## Letture consigliate {#further-reading}

- [zkEVM Foundation](https://zkevm.ethereum.foundation) - Hub ufficiale di ricerca sugli zkEVM della Ethereum Foundation
- [Ethproofs](https://ethproofs.org/) - Segui la corsa per provare Ethereum in tempo reale
- [zkevm.fyi](https://zkevm.fyi) - Libro tecnico su zkEVM per L1
- [Specifiche zkEVM di PSE](https://github.com/privacy-scaling-explorations/zkevm-specs) - Specifiche tecniche
- [The Verge](https://vitalik.eth.limo/general/2024/10/23/futures4.html) - Panoramica di Vitalik sui miglioramenti della verifica
- [Blog zkEVM della EF](https://zkevm.ethereum.foundation/blog) - Analisi delle prestazioni dal team della EF