---
title: Carburante e commissioni
description:
lang: it
sidebar: true
incomplete: true
---

Il carburante è un elemento essenziale per la rete Ethereum. Cconsente di far funzionare la rete, così come un'automobile ha bisogno di benzina per funzionare.

## Prerequisiti {#prerequisites}

Per capire meglio questa pagina, consigliamo di leggere gli argomenti su [transazioni](/en/developers/docs/transactions/) ed [EVM](/en/developers/docs/evm/).

## Cos'è il carburante? {#what-is-gas}

Con il termine carburante ci si riferisce ad un'unità di misura che indica la quantità di sforzo di calcolo necessaria per eseguire operazioni specifiche sulla rete Ethereum.

Dato che ogni transazione Ethereum necessita di risorse di calcolo per essere eseguita, richiede una commissione. Il carburante si riferisce alla commissione richiesta per far sì che una transazione su Ethereum vada a buon fine.

![Diagramma che mostra dove serve il carburante nelle operazioni dell'EVM](./gas.png) _Diagramma adattato da [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

In sostanza, le commissioni sul carburante sono pagate nella valuta nativa di Ethereum, l'ether (ETH). I prezzi del carburante sono indicati in Gwei, che è a sua volta un taglio dell'ETH: ogni Gwei equivale a 0,000000001 ETH (10<sup>-9</sup> ETH). Per esempio, invece di dire che il carburante costa 0,000000001 Ether, puoi dire che costa 1 Gwei.

Questo video offre una panoramica concisa del carburante, con i motivi della sua esistenza: <iframe width="100%" height="315" src="https://www.youtube.com/embed/AJvzNICwcwc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

## Perché esistono le commissioni sul carburante? {#why-do-gas-fees-exist}

In breve, le commissioni sul carburante contribuiscono a mantenere la rete di Ethereum sicura. Richiedendo una commissione per ogni calcolo eseguito sulla rete, si impedisce ad attori malevoli di inviare spam in rete. Per prevenire cicli infiniti accidentali o ostili oppure altri sprechi di calcolo nel codice, ogni transazione deve definire un limite del numero di di quanti passaggi di calcolo dell'esecuzione di codice che può utilizzare. Questa unità di calcolo fondamentale è il "carburante".

Sebbene una transazione includa un limite, il carburante non utilizzato in una transazione viene restituito all'utente.

![Diagramma che mostra come viene rimborsato il carburante inutilizzato](../transactions/gas-tx.png) _Diagramma adattato da [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Letture consigliate {#further-reading}

- [Understanding Ethereum Gas, Blocks and the Fee Market](https://medium.com/@eric.conner/understanding-ethereum-gas-blocks-and-the-fee-market-d5e268bf0a0e)
- [Ethereum Gas Explained](https://defiprime.com/gas)

## Strumenti correlati {#related-tools}

- [ETH Gas Station](https://ethgasstation.info/) _Metriche per il mercato del carburante dedicate ai consumatori_
- [Etherscan Gas Tracker](https://etherscan.io/gastracker) _Stima del prezzo del carburante_
- [Bloxy Gas Analytics](https://stat.bloxy.info/superset/dashboard/gas/?standalone=true) _Statistiche sul carburante nella rete Ethereum_

## Argomenti correlati {#related-topics}

- [Mining](/en/developers/docs/consensus-mechanisms/pow/mining/)
