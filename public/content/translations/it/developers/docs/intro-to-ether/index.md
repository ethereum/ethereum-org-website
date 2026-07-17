---
title: Introduzione tecnica a ether
description: Un'introduzione per sviluppatori alla criptovaluta ether.
lang: it
---

## Prerequisiti {#prerequisites}

Per aiutarti a comprendere meglio questa pagina, ti consigliamo di leggere prima l'[Introduzione a Ethereum](/developers/docs/intro-to-ethereum/).

## Cos'è una criptovaluta? {#what-is-a-cryptocurrency}

Una criptovaluta è un mezzo di scambio protetto da un registro basato su blockchain.

Un mezzo di scambio è qualsiasi cosa ampiamente accettata come pagamento per beni e servizi, e un registro è un archivio di dati che tiene traccia delle transazioni. La tecnologia blockchain consente agli utenti di effettuare transazioni sul registro senza fare affidamento su una terza parte fidata per mantenerlo.

La prima criptovaluta è stata Bitcoin, creata da Satoshi Nakamoto. Dal rilascio di Bitcoin nel 2009, sono state create migliaia di criptovalute su molte blockchain diverse.

## Cos'è ether? {#what-is-ether}

**Ether (ETH)** è la criptovaluta utilizzata per molte cose sulla rete Ethereum. Fondamentalmente, è l'unica forma di pagamento accettabile per le commissioni di transazione e, dopo [The Merge](/roadmap/merge), ether è necessario per validare e proporre blocchi sulla Mainnet. Ether è anche utilizzato come forma primaria di collaterale nei mercati di prestito della [finanza decentralizzata (DeFi)](/defi), come unità di conto nei marketplace di NFT, come pagamento guadagnato per l'esecuzione di servizi o la vendita di beni del mondo reale e altro ancora.

Ethereum consente agli sviluppatori di creare [**applicazioni decentralizzate (dapp)**](/developers/docs/dapps), che condividono tutte un pool di potenza di calcolo. Questo pool condiviso è finito, quindi Ethereum ha bisogno di un meccanismo per determinare chi può utilizzarlo. Altrimenti, una dapp potrebbe consumare accidentalmente o maliziosamente tutte le risorse della rete, bloccando l'accesso agli altri.

La criptovaluta ether supporta un meccanismo di determinazione dei prezzi per la potenza di calcolo di Ethereum. Quando gli utenti vogliono effettuare una transazione, devono pagare in ether affinché la loro transazione venga riconosciuta sulla blockchain. Questi costi di utilizzo sono noti come [commissioni del gas](/developers/docs/gas/) e la commissione del gas dipende dalla quantità di potenza di calcolo richiesta per eseguire la transazione e dalla domanda di potenza di calcolo a livello di rete in quel momento.

Pertanto, anche se una dapp malevola inviasse un ciclo infinito, la transazione alla fine esaurirebbe gli ether e terminerebbe, consentendo alla rete di tornare alla normalità.

È [comune confondere](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) Ethereum ed ether: quando le persone fanno riferimento al "prezzo di Ethereum", stanno descrivendo il prezzo di ether.

## Conio di ether {#minting-ether}

Il conio è il processo in cui vengono creati nuovi ether sul registro di Ethereum. Il protocollo Ethereum sottostante crea i nuovi ether e non è possibile per un utente creare ether.

Ether viene coniato come ricompensa per ogni blocco proposto e a ogni checkpoint di epoca per altre attività del validatore relative al raggiungimento del consenso. L'importo totale emesso dipende dal numero di validatori e da quanti ether hanno messo in staking. Questa emissione totale è divisa equamente tra i validatori nel caso ideale in cui tutti i validatori siano onesti e online, ma in realtà varia in base alle prestazioni del validatore. Circa 1/8 dell'emissione totale va al proponente del blocco; il resto è distribuito tra gli altri validatori. I proponenti del blocco ricevono anche mance dalle commissioni di transazione e dalle entrate relative al MEV, ma queste provengono da ether riciclati, non da una nuova emissione.

## Bruciare ether {#burning-ether}

Oltre a creare ether attraverso le ricompense dei blocchi, ether può essere distrutto attraverso un processo chiamato "bruciare" (burning). Quando ether viene bruciato, viene rimosso permanentemente dalla circolazione.

La bruciatura di ether si verifica in ogni transazione su Ethereum. Quando gli utenti pagano per le loro transazioni, una commissione di base del gas, impostata dalla rete in base alla domanda transazionale, viene distrutta. Questo, unito a dimensioni dei blocchi variabili e a una commissione del gas massima, semplifica la stima delle commissioni di transazione su Ethereum. Quando la domanda della rete è alta, i [blocchi](https://eth.blockscout.com/block/22580057) possono bruciare più ether di quanti ne conino, compensando di fatto l'emissione di ether.

Bruciare la commissione di base ostacola la capacità di un produttore di blocchi di manipolare le transazioni. Ad esempio, se i produttori di blocchi ricevessero la commissione di base, potrebbero includere le proprie transazioni gratuitamente e aumentare la commissione di base per tutti gli altri. In alternativa, potrebbero rimborsare la commissione di base ad alcuni utenti offchain, portando a un mercato delle commissioni di transazione più opaco e complesso.

## Denominazioni di ether {#denominations}

Poiché il valore di molte transazioni su Ethereum è piccolo, ether ha diverse denominazioni a cui si può fare riferimento come unità di conto più piccole. Di queste denominazioni, Wei e Gwei sono particolarmente importanti.

Wei è la quantità più piccola possibile di ether e, di conseguenza, molte implementazioni tecniche, come l'[Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf), baseranno tutti i calcoli in Wei.

Gwei, abbreviazione di giga-wei, è spesso usato per descrivere i costi del gas su Ethereum.

| Denominazione | Valore in ether  | Uso comune                              |
| ------------- | ---------------- | --------------------------------------- |
| Wei           | 10<sup>-18</sup> | Implementazioni tecniche                |
| Gwei          | 10<sup>-9</sup>  | Commissioni del gas leggibili dall'uomo |

## Trasferire ether {#transferring-ether}

Ogni transazione su Ethereum contiene un campo `value`, che specifica la quantità di ether da trasferire, denominata in Wei, da inviare dall'indirizzo del mittente all'indirizzo del destinatario.

Quando l'indirizzo del destinatario è uno [smart contract](/developers/docs/smart-contracts/), questo ether trasferito può essere utilizzato per pagare il gas quando lo smart contract esegue il suo codice.

[Maggiori informazioni sulle transazioni](/developers/docs/transactions/)

## Interrogare ether {#querying-ether}

Gli utenti possono interrogare il saldo in ether di qualsiasi [account](/developers/docs/accounts/) ispezionando il campo `balance` dell'account, che mostra le disponibilità di ether denominate in Wei.

[Etherscan](https://etherscan.io) e [Blockscout](https://eth.blockscout.com) sono strumenti popolari per ispezionare i saldi degli indirizzi tramite applicazioni basate sul web. Ad esempio, [questa pagina di Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) mostra il saldo della Fondazione Ethereum. I saldi degli account possono anche essere interrogati utilizzando i portafogli o direttamente effettuando richieste ai nodi.

## Letture consigliate {#further-reading}

- [Definire ether ed Ethereum](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _CME Group_
- [Whitepaper di Ethereum](/whitepaper/): La proposta originale per Ethereum. Questo documento include una descrizione di ether e le motivazioni alla base della sua creazione.
- [Calcolatore di Gwei](https://www.alchemy.com/gwei-calculator): Usa questo calcolatore di Gwei per convertire facilmente Wei, Gwei ed ether. Inserisci semplicemente qualsiasi importo di Wei, Gwei o ETH e calcola automaticamente la conversione.

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_