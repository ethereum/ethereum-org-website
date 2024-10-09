---
title: Prova di autorità (PoA)
description: Una spiegazione del protocollo di consenso a prova di autorità e del suo ruolo nell'ecosistema della blockchain.
lang: it
---

La **prova di autorità (PoA)** è un algoritmo del consenso basato sulla reputazione, una versione modificata del [proof-of-stake](/developers/docs/consensus-mechanisms/pos/). È utilizzata prevalentemente dalle catene private, di prova e dalle reti di sviluppo locali. La PoA è un algoritmo di consenso basato sulla reputazione che richiede di affidarsi a una serie di firmatari autorizzati per produrre i blocchi, piuttosto che un meccanismo basato sullo staking nel PoS.

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, ti suggeriamo di leggere prima qualcosa sulle [transazioni](/developers/docs/transactions/), sui [blocchi](/developers/docs/blocks/), e i [meccanismi di consenso](/developers/docs/consensus-mechanisms/).

## Cos'è la prova di autorità (PoA)? {#what-is-poa}

La prova di autorità è una versione modificata del **[proof-of-stake](/developers/docs/consensus-mechanisms/pos/) (PoS)**, un algoritmo di consenso basato sulla reputazione invece che un meccanismo basato sullo staking in PoS. Il termine è stato introdotto per la prima volta nel 2017 da Gavin Wood, e questo algoritmo di consenso è stato utilizzato prevalentemente da catene private e di prova e da reti di sviluppo locali in quanto supera la necessità di risorse di elevata qualità, come nel PoW, e supera i problemi di scalabilità del PoS, disponendo di un piccolo sottoinsieme di nodi che archiviano la blockchain e producono i blocchi.

La prova di autorità richiede di fare affidamento su una serie di firmatari autorizzati definita nel [blocco di genesi](/glossary/#genesis-block). In gran parte delle implementazioni correnti, tutti i firmatari autorizzati detengono pari potere e privilegi nel determinare il consenso della catena. L'idea dietro lo staking di reputazione è che ogni validatore autorizzato sia ben noto a tutti, tramite verifiche come conosci il tuo cliente (KYC) o facendo in modo che l'unico validatore sia un'organizzazione nota; in questo modo, se un validatore commette qualcosa di sbagliato, la sua identità è nota.

Esistono numerose implementazioni della PoA, ma l'implementazione standard di Ethereum è **clique**, che implementa l'[EIP-225](https://eips.ethereum.org/EIPS/eip-225). Clique è uno standard per sviluppatori facile da implementare, che supporta tutti i tipi di sincronizzazione dei client. Altre implementazioni includono [IBFT 2.0](https://besu.hyperledger.org/stable/private-networks/concepts/poa) e [Aura](https://openethereum.github.io/Chain-specification).

## Come funziona {#how-it-works}

Nella PoA, una serie di firmatari autorizzati sono selezionati per creare dei nuovi blocchi. I firmatari sono selezionati in base alla loro reputazione, e saranno i soli autorizzati a creare nuovi blocchi. I firmatari sono selezionati secondo il metodo round-robin e ogni firmatario è autorizzato a creare un blocco in un periodo di tempo specifico. Il tempo di creazione del blocco è fisso, e i firmatari devono creare un blocco entro tale periodo di tempo.

La reputazione, in questo contesto, non è un aspetto quantificato ma è piuttosto la reputazione di aziende note come Microsoft e Google; dunque, la selezione dei firmatari fidati non è algoritmica, ma piuttosto il normale atto umano di _fiducia_ quando un'entità, come ad esempio Microsoft, crea una rete privata di PoA tra centinaia o migliaia di startup e assume il ruolo di unico firmatario attendibile con la possibilità di aggiungerne altri in futuro. In tal caso le startup si fiderebbero, senza dubbio, del fatto che Microsoft agirà sempre con onestà e utilizzerebbero la rete. Ciò risolve la necessità di effettuare lo staking in diverse reti piccole/private costruite per scopi diversi per mantenerle decentralizzate e funzionanti, insieme alla necessità di minatori, che consumano molta energia e risorse. Alcune reti private utilizzano lo standard PoA, come VeChain, e alcune lo modificano, come Binance, che utilizza la [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa), una versione modificata e personalizzata di PoA e PoS.

Il processo di voto è eseguito dai firmatari stessi. Ogni firmatario vota per l'aggiunta o la rimozione di un firmatario nel proprio blocco alla creazione di un nuovo blocco. I voti sono conteggiati dai nodi, e i firmatari sono aggiunti o rimossi a seconda del fatto che i voti raggiungano una certa soglia, detta `SIGNER_LIMIT`.

Potrebbe verificarsi una situazione in cui si genera una piccola diramazione; la difficoltà di un blocco dipende dal fatto che sia stato firmato in turno o fuori turno. I blocchi "in turno" hanno una difficoltà di 2, quelli "fuori turno" hanno una difficoltà di 1. Nel caso di piccole diramazioni, la catena con la maggior parte dei firmatari che sigillano i blocchi "in turno" accumulerà la difficoltà maggiore e vincerà.

## Vettori d'attacco {#attack-vectors}

### Firmatari malevoli {#malicious-signers}

Un utente malevolo potrebbe essere aggiunto all'elenco dei firmatari, o una chiave/macchina di firma potrebbe essere compromessa. In tale scenario, il protocollo deve potersi difendere dalle riorganizzazioni e dallo spam. La soluzione proposta è che, dato un elenco di N firmatari autorizzati, qualsiasi firmatario possa coniare solo 1 blocco ogni K. Ciò garantisce che il danno sia limitato e il resto dei validatori possa votare per escludere l'utente malintenzionato.

### Censura {#censorship-attack}

Un altro interessante vettore d'attacco si verifica se un firmatario, o un gruppo di firmatari, tenta di censurare blocchi che votano per la sua rimozione dall'elenco d'autorizzazione. Per risolvere questo problema, la frequenza di conio consentita ai firmatari è limitata a 1 su N/2. Ciò assicura che i firmatari malevoli debbano controllare almeno il 51% dei conti di firma, diventando così effettivamente la nuova fonte di verità per la catena.

### Spam {#spam-attack}

Un altro piccolo vettore d'attacco si verifica quando dei firmatari malevoli iniettano nuove proposte di voto in ogni blocco coniato. Poiché i nodi devono conteggiare tutti i voti per creare l'elenco effettivo di firmatari autorizzati, devono registrarli tutti nel corso del tempo. Senza fissare un limite alla finestra di voto, questi crescerebbero lentamente, ma indefinitamente. La soluzione è definire una finestra _mobile_ di blocchi W, scaduta la quale i voti sono considerati obsoleti. _Una finestra ragionevole potrebbe essere di 1-2 epoche._

### Blocchi concorrenti {#concurrent-blocks}

In una rete di PoA, quando sono presenti N firmatari autorizzati, ogni firmatario può coniare 1 blocco ogni K, il che significa che in un dato momento sono autorizzati coniare N-K+1 validatori. Per evitare che questi validatori gareggino per creare blocchi, ogni firmatario dovrebbe aggiungere un lieve "scostamento" casuale all'ora di rilascio di un nuovo blocco. Sebbene questo processo assicuri che le piccole diramazioni siano rare, delle diramazioni occasionali possono comunque verificarsi, proprio come sulla Rete Principale. Se si scopre che un firmatario abusa del proprio potere e causa disordini, gli altri firmatari possono votare per la sua espulsione.

Se ad esempio ci sono 10 firmatari autorizzati e a ciascun firmatario è consentito creare 1 blocco su 20, allora in un dato momento 11 validatori possono creare blocchi. Per evitare che gareggino per creare i blocchi, ogni firmatario aggiunge un lieve "scostamento" casuale all'ora di rilascio di un nuovo blocco. Ciò riduce il verificarsi di piccole diramazioni, pur consentendone di occasionali, come avviene sulla Rete Principale di Ethereum. Se un firmatario utilizza erroneamente la propria autorità e causa disordini, può essere espulso dalla rete.

## Pro e contro {#pros-and-cons}

| Pro                                                                                                                                                       | Contro                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Più scalabile di altri meccanismi popolari come il PoS e il PoW, e basata su un numero limitato di firmatari dei blocchi                                  | Le reti di PoA dispongono tipicamente di un numero ridotto di nodi di convalida. Questo rende una rete di PoA più centralizzata.                  |
| Le blockchain di PoA sono incredibilmente economiche da eseguire e mantenere                                                                              | Diventare un firmatario autorizzato è solitamente fuori portata per una persona "normale", poiché la blockchain richiede delle entità con una reputazione nota.   |
| Le transazioni sono confermate molto rapidamente, fino a meno di 1 secondo, poiché soltanto un numero limitato di firmatari deve validare i nuovi blocchi | I firmatari malevoli potrebbero riorganizzare, spendere doppiamente e censurare le transazioni nella rete. Questi attacchi sono mitigati, seppur ancora possibili |

## Letture consigliate {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Clique standard_
- [Studio sulla prova di autorità](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Cryptoeconomics_
- [Cos'è la prova di autorità](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [Spiegazione della prova di autorità](https://academy.binance.com/en/articles/proof-of-authority-explained) _binance_
- [PoA nella blockchain](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Cos'è Clique](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [PoA deprecata, specifiche di Aura](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, un'altra implementazione della PoA](https://besu.hyperledger.org/stable/private-networks/concepts/poa)

### Preferisci un approccio visivo all'apprendimento? {#visual-learner}

Guarda una spiegazione visiva della Prova d'Autorità:

<YouTube id="Mj10HSEM5_8" />

## Argomenti correlati {#related-topics}

- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
