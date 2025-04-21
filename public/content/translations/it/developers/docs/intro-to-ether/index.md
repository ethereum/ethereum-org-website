---
title: Intro agli ether
description: Introduzione di uno sviluppatore alla criptovaluta ether.
lang: it
---

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, consigliamo innanzi tutto di leggere l'[Introduzione a Ethereum](/developers/docs/intro-to-ethereum/).

## Cos'è una criptovaluta? {#what-is-a-cryptocurrency}

Una criptovaluta è un mezzo di scambio protetto da un registro basato su blockchain.

Con mezzo di scambio si intende qualsiasi forma di pagamento ampiamente accettata per beni e servizi, mentre con registro si intende un archivio di dati che tiene traccia delle transazioni. La tecnologia Blockchain consente agli utenti di effettuare transazioni sul registro senza fare affidamento su una terza parte fidata per mantenere il registro.

La prima criptovaluta è stata Bitcoin, creata da Satoshi Nakamoto. Dal rilascio di Bitcoin nel 2009, sono state create migliaia di criptovalute su molte blockchain diverse.

## Cos'è un ether? {#what-is-ether}

**Ether (ETH)** è la criptovaluta impiegata per molti scopi sulla rete Ethereum. Fondamentalmente è l'unica forma di pagamento accettabile per le commissioni sulle transazioni, e dopo [La Fusione](/roadmap/merge) serviranno ether per convalidare e proporre blocchi sulla Rete Principale. L'ether è anche usato come una forma principale di garanzia nei mercati di prestito della [DeFi](/defi), come un'unità di conto nei mercati di NFT, come pagamento guadagnato per l'esecuzione di servizi o della vendita di beni del mondo reale e molto altro.

Ethereum consente agli sviluppatori di creare [**applicazioni decentralizzate (dapp)**](/developers/docs/dapps), che condividono tutte un pool di potenza di elaborazione. Questo pool condiviso è limitato, quindi Ethereum necessita di un meccanismo per determinare chi lo usa. In caso contrario, una dApp potrebbe consumare accidentalmente o malevolmente tutte le risorse della rete, impedendo ad altri di accedervi.

La criptovaluta ether supporta un meccanismo di determinazione dei prezzi per la potenza di calcolo di Ethereum. Quando vogliono effettuare una transazione, gli utenti devono pagare ether per far riconoscere la propria transazione sulla blockchain. Questi costi d'uso sono noti come [commissioni sul gas](/developers/docs/gas/), derivate dalla quantità di potenza di calcolo necessaria per eseguire la transazione e dalla domanda della rete per la potenza di calcolo in quel momento.

Pertanto, anche se una dApp malevola inviasse un ciclo infinito, a un certo punto la transazione terminerebbe gli ether e si arresterebbe, consentendo alla rete di tornare alla normalità.

È [comune confondere](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) Ethereum e gli ether: quando le persone si riferiscono al "prezzo di Ethereum", stanno descrivendo il prezzo degli ether.

## Coniare ether {#minting-ether}

La coniazione è il processo con vengono creati nuovi ether sul registro di Ethereum. Il protocollo sottostante di Ethereum crea i nuovi ether, cosa impossibile da fare per un utente.

L'ether è coniato come una ricompensa per ogni blocco proposto e al punto di controllo di ogni epoca per altre attività correlate al validatore per raggiungere il consenso. L'importo totale emesso dipende dal numero di validatori e da quanto ether hanno in staking. Quest'emissione totale è divisa equamente tra i validatori nel caso ideale in cui tutti i validatori siano onesti e online ma, in realtà, varia a seconda delle prestazioni del validatore. Circa 1/8 dell'emissione totale va al propositore del blocco; il resto è distribuito tra gli altri validatori. I propositori di blocchi, inoltre, ricevono mance dalle commissioni di transazione e dal reddito correlato alla MEV, ma provengono da ether riciclati, non appena emessi.

## Bruciare ether {#burning-ether}

Oltre a creare ether tramite le ricompense del blocco, l'ether può essere distrutto tramite un processo detto 'bruciatura'. L'ether bruciato viene rimosso dalla circolazione in via permanente.

La bruciatura di ether ha luogo in ogni transazione su Ethereum. Quando gli utenti pagano per le proprie transazioni, una commissione di base sul gas, impostata dalla rete secondo la domanda di transazioni, viene distrutta. Questo, insieme a dimensioni variabili dei blocchi e una commissione sul gas massima, semplifica la stima della commissione della transazione su Ethereum. Quando la domanda della rete è elevata, i [blocchi](https://etherscan.io/block/12965263) possono bruciare più ether di quanto ne sia coniato, compensando efficacemente l'emissione di ether.

Bruciare la commissione di base ostacola la capacità dei produttori di blocchi di manipolare le transazioni. Ad esempio, se i produttori del blocco hanno ricevuto la commissione di base, potrebbero includere le proprie transazioni gratuitamente e aumentare la commissione di base per tutti gli altri. In caso contrario, potrebbero rimborsare la commissione di base ad alcuni utenti al di fuori della catena, creando così un mercato delle commissioni sulle transazioni più opaco e complesso.

## Denominazioni dell'ether {#denominations}

Poiché il valore di molte transazioni su Ethereum è ridotto, l'ether ha svariate denominazioni che possono essere utilizzate per fare riferimento a unità di conto inferiori. Tra queste denominazioni, Wei e gwei sono particolarmente importanti.

Wei è la quantità più piccola possibile di ether. Di conseguenza, molte implementazioni tecniche, come l'[Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf), effettuano tutti i loro calcoli in Wei.

Gwei, abbreviazione di giga-wei, è spesso usato per descrivere i costi del gas su Ethereum.

| Denominazione | Valore in ether  | Uso comune                              |
| ------------- | ---------------- | --------------------------------------- |
| Wei           | 10<sup>-18</sup> | Implementazioni tecniche                |
| Gwei          | 10<sup>-9</sup>  | Commissioni sul gas leggibili dall'uomo |

## Trasferire ether {#transferring-ether}

Ogni transazione su Ethereum contiene un campo di `valore`, che specifica l'importo di ether da trasferire, denominato in wei, e da inviare dall'indirizzo del mittente all'indirizzo del destinatario.

Quando l'indirizzo del destinatario è un [contratto intelligente](/developers/docs/smart-contracts/), questo ether trasferito potrebbe essere usato per pagare il gas quando il contratto intelligente esegue il proprio codice.

[Maggiori informazioni sulle transazioni](/developers/docs/transactions/)

## Interrogare l'ether {#querying-ether}

Gli utenti possono interrogare il saldo di ether di qualsiasi [conto](/developers/docs/accounts/), ispezionando il campo `balance` del conto, che mostra le posizioni in ether, denominate in wei.

[Etherscan](https://etherscan.io) è uno strumento popolare per consultare i saldi dell'indirizzo attraverso un'applicazione basata sul web. Per esempio, [questa pagina di Etherscan](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae) mostra il saldo per la Ethereum Foundation. I saldi dei conti possono esser interrogati anche utilizzando i portafogli, o direttamente, effettuando richieste ai nodi.

## Letture consigliate {#further-reading}

- [Definire Ether ed Ethereum](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _CME Group_
- [Ethereum Whitepaper](/whitepaper/): La proposta originale per Ethereum. Questo documento include una descrizione dell'ether e le motivazioni dietro alla sua creazione.
- [Gwei Calculator](https://www.alchemy.com/gwei-calculator): Usa questa calcolatrice di gwei per convertire facilmente wei, gwei ed ether. Basta inserire qualsiasi importo di wei, gwei o ETH e calcolare automaticamente la conversione.

_Conosci una risorsa pubblica che ti è stata utile? Modifica questa pagina e aggiungila!_
