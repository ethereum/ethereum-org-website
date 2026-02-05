---
title: Introduzione tecnica all'ether
description: Introduzione di uno sviluppatore alla criptovaluta ether.
lang: it
---

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, ti consigliamo di leggere prima [Introduzione a Ethereum](/developers/docs/intro-to-ethereum/).

## Cos'è una criptovaluta? {#what-is-a-cryptocurrency}

Una criptovaluta è un mezzo di scambio protetto da un registro basato su blockchain.

Con mezzo di scambio si intende qualsiasi forma di pagamento ampiamente accettata per beni e servizi, mentre con registro si intende un archivio di dati che tiene traccia delle transazioni. La tecnologia Blockchain consente agli utenti di effettuare transazioni sul registro senza fare affidamento su una terza parte fidata per mantenere il registro.

La prima criptovaluta è stata Bitcoin, creata da Satoshi Nakamoto. Dal rilascio di Bitcoin nel 2009, sono state create migliaia di criptovalute su molte blockchain diverse.

## Cos'è un ether? {#what-is-ether}

**Ether (ETH)** è la criptovaluta impiegata per molti scopi sulla rete Ethereum. Fondamentalmente, è l'unica forma di pagamento accettabile per le commissioni di transazione e, dopo [La Fusione](/roadmap/merge), è richiesto l'ether per convalidare e proporre blocchi sulla Rete Principale. L'ether è usato anche come forma principale di garanzia nei mercati di prestito della [DeFi](/defi), come unità di conto nei marketplace di NFT, come pagamento guadagnato per l'esecuzione di servizi o la vendita di beni del mondo reale e altro ancora.

Ethereum consente agli sviluppatori di creare [**applicazioni decentralizzate (dApp)**](/developers/docs/dapps), che condividono tutte un pool di potenza di calcolo. Questo pool condiviso è limitato, quindi Ethereum necessita di un meccanismo per determinare chi lo usa. In caso contrario, una dApp potrebbe consumare accidentalmente o malevolmente tutte le risorse della rete, impedendo ad altri di accedervi.

La criptovaluta ether supporta un meccanismo di determinazione dei prezzi per la potenza di calcolo di Ethereum. Quando vogliono effettuare una transazione, gli utenti devono pagare ether per far riconoscere la propria transazione sulla blockchain. Questi costi d'uso sono noti come [commissioni sul gas](/developers/docs/gas/), e la commissione sul gas dipende dalla quantità di potenza di calcolo necessaria per eseguire la transazione e dalla domanda della rete per la potenza di calcolo in quel momento.

Pertanto, anche se una dApp malevola inviasse un ciclo infinito, a un certo punto la transazione terminerebbe gli ether e si arresterebbe, consentendo alla rete di tornare alla normalità.

È [comune confondere](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) Ethereum ed ether — quando le persone si riferiscono al "prezzo di Ethereum", stanno descrivendo il prezzo dell'ether.

## Coniare ether {#minting-ether}

La coniazione è il processo con vengono creati nuovi ether sul registro di Ethereum. Il protocollo sottostante di Ethereum crea i nuovi ether, cosa impossibile da fare per un utente.

L'ether è coniato come una ricompensa per ogni blocco proposto e al punto di controllo di ogni epoca per altre attività correlate al validatore per raggiungere il consenso. L'importo totale emesso dipende dal numero di validatori e da quanto ether hanno in staking. Quest'emissione totale è divisa equamente tra i validatori nel caso ideale in cui tutti i validatori siano onesti e online ma, in realtà, varia a seconda delle prestazioni del validatore. Circa 1/8 dell'emissione totale va al propositore del blocco; il resto è distribuito tra gli altri validatori. I propositori di blocchi, inoltre, ricevono mance dalle commissioni di transazione e dal reddito correlato alla MEV, ma provengono da ether riciclati, non appena emessi.

## Bruciare ether {#burning-ether}

Oltre a creare ether tramite le ricompense del blocco, l'ether può essere distrutto tramite un processo detto 'bruciatura'. L'ether bruciato viene rimosso dalla circolazione in via permanente.

La bruciatura di ether ha luogo in ogni transazione su Ethereum. Quando gli utenti pagano per le proprie transazioni, una commissione di base sul gas, impostata dalla rete secondo la domanda di transazioni, viene distrutta. Questo, insieme a dimensioni variabili dei blocchi e una commissione sul gas massima, semplifica la stima della commissione della transazione su Ethereum. Quando la domanda della rete è elevata, i [blocchi](https://eth.blockscout.com/block/22580057) possono bruciare più ether di quanti ne coniano, compensando efficacemente l'emissione di ether.

Bruciare la commissione di base ostacola la capacità dei produttori di blocchi di manipolare le transazioni. Ad esempio, se i produttori del blocco hanno ricevuto la commissione di base, potrebbero includere le proprie transazioni gratuitamente e aumentare la commissione di base per tutti gli altri. In alternativa, potrebbero rimborsare la commissione di base ad alcuni utenti fuori catena, portando a un mercato delle commissioni di transazione più opaco e complesso.

## Denominazioni dell'ether {#denominations}

Poiché il valore di molte transazioni su Ethereum è ridotto, l'ether ha svariate denominazioni che possono essere utilizzate per fare riferimento a unità di conto inferiori. Tra queste denominazioni, Wei e gwei sono particolarmente importanti.

Il wei è la quantità più piccola possibile di ether e, di conseguenza, molte implementazioni tecniche, come l'[Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf), baseranno tutti i calcoli in wei.

Gwei, abbreviazione di giga-wei, è spesso usato per descrivere i costi del gas su Ethereum.

| Denominazione | Valore in ether  | Uso comune                              |
| ------------- | ---------------- | --------------------------------------- |
| Wei           | 10<sup>-18</sup> | Implementazioni tecniche                |
| Gwei          | 10<sup>-9</sup>  | Commissioni sul gas leggibili dall'uomo |

## Trasferire ether {#transferring-ether}

Ogni transazione su Ethereum contiene un campo `value`, che specifica la quantità di ether da trasferire, denominata in wei, da inviare dall'indirizzo del mittente all'indirizzo del destinatario.

Quando l'indirizzo del destinatario è uno [smart contract](/developers/docs/smart-contracts/), l'ether trasferito può essere usato per pagare il gas quando lo smart contract esegue il suo codice.

[Maggiori informazioni sulle transazioni](/developers/docs/transactions/)

## Interrogare l'ether {#querying-ether}

Gli utenti possono interrogare il saldo in ether di qualsiasi [conto](/developers/docs/accounts/) ispezionando il campo `balance` del conto, che mostra le posizioni in ether, denominate in wei.

[Etherscan](https://etherscan.io) e [Blockscout](https://eth.blockscout.com) sono strumenti popolari per ispezionare i saldi degli indirizzi tramite applicazioni basate sul web. Ad esempio, [questa pagina di Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) mostra il saldo della Ethereum Foundation. I saldi dei conti possono esser interrogati anche utilizzando i portafogli, o direttamente, effettuando richieste ai nodi.

## Letture consigliate {#further-reading}

- [Definire ether ed Ethereum](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _CME Group_
- [Ethereum Whitepaper](/whitepaper/): la proposta originale per Ethereum. Questo documento include una descrizione dell'ether e le motivazioni dietro alla sua creazione.
- [Gwei Calculator](https://www.alchemy.com/gwei-calculator): usa questo calcolatore di gwei per convertire facilmente wei, gwei ed ether. Basta inserire qualsiasi importo di wei, gwei o ETH e calcolare automaticamente la conversione.

_Conosci una risorsa della comunità che ti è stata utile? Modifica questa pagina e aggiungila!_
