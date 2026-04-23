---
title: Proof-of-authority (PoA)
description: Una spiegazione del protocollo di consenso proof-of-authority e del suo ruolo nell'ecosistema blockchain.
lang: it
---

La **Proof-of-authority (PoA)** è un algoritmo di consenso basato sulla reputazione che è una versione modificata della [prova di stake](/developers/docs/consensus-mechanisms/pos/). È utilizzata principalmente da catene private, reti di test e reti di sviluppo locali. La PoA è un algoritmo di consenso basato sulla reputazione che richiede di fidarsi di un insieme di firmatari autorizzati per produrre blocchi, invece di un meccanismo basato sullo stake come nella PoS.

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, ti consigliamo di leggere prima le [transazioni](/developers/docs/transactions/), i [blocchi](/developers/docs/blocks/) e i [meccanismi di consenso](/developers/docs/consensus-mechanisms/).

## Cos'è la proof-of-authority (PoA)? {#what-is-poa}

La proof-of-authority è una versione modificata della **[prova di stake](/developers/docs/consensus-mechanisms/pos/) (PoS)** che è un algoritmo di consenso basato sulla reputazione invece del meccanismo basato sullo stake della PoS. Il termine è stato introdotto per la prima volta nel 2017 da Gavin Wood, e questo algoritmo di consenso è stato utilizzato principalmente da catene private, reti di test e reti di sviluppo locali, poiché supera la necessità di risorse di alta qualità come fa la PoW (prova di lavoro), e supera i problemi di scalabilità della PoS avendo un piccolo sottoinsieme di nodi che memorizzano la blockchain e producono blocchi.

La proof-of-authority richiede di fidarsi di un insieme di firmatari autorizzati che sono impostati nel [blocco genesi](/glossary/#genesis-block). Nella maggior parte delle implementazioni attuali, tutti i firmatari autorizzati mantengono poteri e privilegi uguali nel determinare il consenso della catena. L'idea alla base dello staking della reputazione è che ogni validatore autorizzato sia ben noto a tutti attraverso procedure come il "know your customer" (KYC), o avendo un'organizzazione ben nota come unico validatore; in questo modo, se un validatore fa qualcosa di sbagliato, la sua identità è nota.

Esistono diverse implementazioni della PoA, ma l'implementazione standard di Ethereum è **clique**, che implementa l'[EIP-225](https://eips.ethereum.org/EIPS/eip-225). Clique è uno standard facile da implementare e adatto agli sviluppatori, che supporta tutti i tipi di sincronizzazione dei client. Altre implementazioni includono [IBFT 2.0](https://besu.hyperledger.org/private-networks/concepts/poa) e [Aura](https://openethereum.github.io/Chain-specification).

## Come funziona {#how-it-works}

Nella PoA, un insieme di firmatari autorizzati viene selezionato per creare nuovi blocchi. I firmatari sono selezionati in base alla loro reputazione e sono gli unici autorizzati a creare nuovi blocchi. I firmatari vengono selezionati in modalità round-robin e a ciascun firmatario è consentito creare un blocco in un intervallo di tempo specifico. Il tempo di creazione del blocco è fisso e ai firmatari è richiesto di creare un blocco entro tale intervallo di tempo.

La reputazione in questo contesto non è una cosa quantificata, ma piuttosto è la reputazione di aziende ben note come Microsoft e Google, quindi il modo di selezionare i firmatari fidati non è algoritmico ma piuttosto è il normale atto umano di _fiducia_ in cui un'entità, diciamo ad esempio Microsoft, crea una rete privata PoA tra centinaia o migliaia di startup e assume il ruolo di unico firmatario fidato con la possibilità di aggiungere altri firmatari ben noti come Google in futuro; le startup si fiderebbero senza dubbio che Microsoft agisca in modo onesto in ogni momento e utilizzerebbero la rete. Questo risolve la necessità di fare stake in diverse reti piccole/private che sono state costruite per scopi diversi per mantenerle decentralizzate e funzionanti, insieme alla necessità di minatori, che consumano molta energia e risorse. Alcune reti private utilizzano lo standard PoA così com'è, come VeChain, e alcune lo modificano, come Binance che utilizza la [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa), che è una versione personalizzata e modificata di PoA e PoS.

Il processo di voto viene effettuato dai firmatari stessi. Ogni firmatario vota per l'aggiunta o la rimozione di un firmatario nel proprio blocco quando crea un nuovo blocco. I voti vengono conteggiati dai nodi e i firmatari vengono aggiunti o rimossi in base al raggiungimento di una certa soglia di voti `SIGNER_LIMIT`.

Potrebbe verificarsi una situazione in cui si verificano piccole biforcazioni; la difficoltà di un blocco dipende dal fatto che il blocco sia stato firmato nel proprio turno o fuori turno. I blocchi "nel turno" hanno difficoltà 2 e i blocchi "fuori turno" hanno difficoltà 1. Nel caso di piccole biforcazioni, la catena con la maggior parte dei firmatari che sigillano i blocchi "nel turno" accumulerà la maggiore difficoltà e vincerà.

## Vettori di attacco {#attack-vectors}

### Firmatari malintenzionati {#malicious-signers}

Un utente malintenzionato potrebbe essere aggiunto all'elenco dei firmatari, oppure una chiave/macchina di firma potrebbe essere compromessa. In un simile scenario, il protocollo deve essere in grado di difendersi da riorganizzazioni e spam. La soluzione proposta è che, data una lista di N firmatari autorizzati, qualsiasi firmatario può coniare solo 1 blocco ogni K. Questo assicura che i danni siano limitati e che il resto dei validatori possa votare per escludere l'utente malintenzionato.

### Censura {#censorship-attack}

Un altro interessante vettore di attacco si verifica se un firmatario (o un gruppo di firmatari) tenta di censurare i blocchi che votano per la loro rimozione dalla lista di autorizzazione. Per aggirare questo problema, la frequenza di conio consentita ai firmatari è limitata a 1 su N/2. Questo assicura che i firmatari malintenzionati debbano controllare almeno il 51% degli account di firma, punto in cui diventerebbero effettivamente la nuova fonte di verità per la catena.

### Spam {#spam-attack}

Un altro piccolo vettore di attacco è rappresentato dai firmatari malintenzionati che iniettano nuove proposte di voto all'interno di ogni blocco che coniano. Poiché i nodi devono conteggiare tutti i voti per creare l'elenco effettivo dei firmatari autorizzati, devono registrare tutti i voti nel tempo. Senza porre un limite alla finestra di voto, questa potrebbe crescere lentamente, ma senza limiti. La soluzione è quella di inserire una finestra _mobile_ di W blocchi dopo la quale i voti sono considerati obsoleti. _Una finestra ragionevole potrebbe essere di 1-2 epoche._

### Blocchi concorrenti {#concurrent-blocks}

In una rete PoA, quando ci sono N firmatari autorizzati, a ciascun firmatario è consentito coniare 1 blocco su K, il che significa che N-K+1 validatori sono autorizzati a coniare in qualsiasi momento. Per evitare che questi validatori competano per i blocchi, ogni firmatario dovrebbe aggiungere un piccolo "offset" casuale al momento in cui rilascia un nuovo blocco. Sebbene questo processo assicuri che le piccole biforcazioni siano rare, possono comunque verificarsi biforcazioni occasionali, proprio come sulla rete principale. Se si scopre che un firmatario sta abusando del proprio potere e causando caos, gli altri firmatari possono votare per escluderlo.

Se ad esempio ci sono 10 firmatari autorizzati e a ciascun firmatario è consentito creare 1 blocco su 20, in qualsiasi momento 11 validatori possono creare blocchi. Per evitare che competano per creare blocchi, ogni firmatario aggiunge un piccolo "offset" casuale al momento in cui rilascia un nuovo blocco. Questo riduce il verificarsi di piccole biforcazioni ma consente comunque biforcazioni occasionali, come si vede sulla rete principale di Ethereum. Se un firmatario abusa della propria autorità e causa interruzioni, può essere escluso dalla rete tramite votazione.

## Pro e contro {#pros-and-cons}

| Pro                                                                                                                                                                                          | Contro                                                                                                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Più scalabile rispetto ad altri meccanismi popolari come PoS e PoW, poiché si basa su un numero limitato di firmatari di blocchi                                                             | Le reti PoA hanno in genere un numero relativamente piccolo di nodi di validazione. Questo rende una rete PoA più centralizzata.                                                                |
| Le blockchain PoA sono incredibilmente economiche da eseguire e mantenere                                                                                                                    | Diventare un firmatario autorizzato è in genere fuori dalla portata di una persona comune, perché la blockchain richiede entità con una reputazione consolidata.                                |
| Le transazioni vengono confermate molto rapidamente, potendo impiegare meno di 1 secondo, poiché è richiesto solo un numero limitato di firmatari per validare i nuovi blocchi               | I firmatari malintenzionati potrebbero riorganizzare, spendere due volte, censurare le transazioni nella rete; questi attacchi sono mitigati ma ancora possibili                                |

## Letture consigliate {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Standard Clique_
- [Studio sulla Proof of Authority](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Criptoeconomia_
- [Cos'è la Proof of Authority](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [Spiegazione della Proof of Authority](https://academy.binance.com/en/articles/proof-of-authority-explained) _Binance_
- [La PoA nella blockchain](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Spiegazione di Clique](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [PoA deprecata, specifica Aura](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, un'altra implementazione PoA](https://besu.hyperledger.org/private-networks/concepts/poa)

### Impari meglio con i video? {#visual-learner}

Guarda una spiegazione visiva della proof-of-authority:

<YouTube id="Mj10HSEM5_8" />

## Argomenti correlati {#related-topics}

- [Prova di lavoro](/developers/docs/consensus-mechanisms/pow/)
- [Prova di stake](/developers/docs/consensus-mechanisms/pos/)