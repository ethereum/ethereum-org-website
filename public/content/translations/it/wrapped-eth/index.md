---
title: "Cos'è il Wrapped Ether (WETH)"
description: Un'introduzione al Wrapped ether (WETH), un token avvolto compatibile con lo standard ERC-20 per l'ether (ETH). 
lang: it
---

# Wrapped ether (WETH) {#intro-to-weth}

<Alert variant="update">
<Emoji text="🎁" />
<div>Connetti il tuo portafoglio per avvolgere o svolgere ETH su qualsiasi catena su [WrapETH.com](https://www.wrapeth.com/)</div>
</Alert>

L'Ether (ETH) è la valuta principale di Ethereum. È utilizzato per diversi scopi come lo staking, come valuta e per pagare le commissioni del gas per il calcolo. **Il WETH è di fatto una forma aggiornata di ETH con alcune funzionalità aggiuntive richieste da molte applicazioni e dai [token ERC-20](/glossary/#erc-20)**, che sono altri tipi di risorse digitali su Ethereum. Per funzionare con questi token, l'ETH deve seguire le loro stesse regole, note come standard ERC-20.

Per colmare questa lacuna, è stato creato il wrapped ETH (WETH). **Il Wrapped ETH è un contratto intelligente che ti consente di depositare qualsiasi importo di ETH nel contratto e ricevere lo stesso importo in WETH coniato** che è conforme allo standard dei token ERC-20. Il WETH è una rappresentazione dell'ETH che ti consente di interagirvi come un token ERC-20, non come la risorsa nativa ETH. Avrai comunque bisogno di ETH nativo per pagare le commissioni del gas, quindi assicurati di conservarne un po' quando effettui un deposito. 

È possibile svolgere il WETH in ETH utilizzando il contratto intelligente del WETH. Puoi riscattare qualsiasi importo di WETH con il contratto intelligente del WETH e riceverai lo stesso importo in ETH. Il WETH depositato viene quindi bruciato e rimosso dall'offerta circolante di WETH.

**Circa il 3% dell'offerta circolante di ETH è bloccato nel contratto del token WETH**, rendendolo uno dei [contratti intelligenti](/glossary/#smart-contract) più utilizzati. Il WETH è particolarmente importante per gli utenti che interagiscono con le applicazioni della finanza decentralizzata (DeFi).

## Perché dobbiamo avvolgere l'ETH come un ERC-20? {#why-do-we-need-to-wrap-eth}

L'[ERC-20](/developers/docs/standards/tokens/erc-20/) definisce un'interfaccia standard per i token trasferibili, in modo che chiunque possa creare token che interagiscono senza problemi con le applicazioni e i token che utilizzano questo standard nell'ecosistema di Ethereum. Poiché **l'ETH precede lo standard ERC-20**, l'ETH non è conforme a questa specifica. Ciò significa che **non puoi facilmente** scambiare ETH con altri token ERC-20 o **utilizzare ETH nelle app che usano lo standard ERC-20**. Avvolgere l'ETH ti offre l'opportunità di fare quanto segue:

- **Scambiare ETH con token ERC-20**: non puoi scambiare direttamente ETH con altri token ERC-20. Il WETH è una rappresentazione dell'ether conforme allo standard dei token fungibili ERC-20 e può essere scambiato con altri token ERC-20. 

- **Utilizzare ETH nelle dApp**: poiché l'ETH non è compatibile con l'ERC-20, gli sviluppatori dovrebbero creare interfacce separate (una per l'ETH e un'altra per i token ERC-20) nelle dApp. Avvolgere l'ETH rimuove questo ostacolo e consente agli sviluppatori di gestire l'ETH e altri token all'interno della stessa dApp. Molte applicazioni di finanza decentralizzata utilizzano questo standard e creano mercati per lo scambio di questi token.

## Wrapped ether (WETH) vs ether (ETH): qual è la differenza? {#weth-vs-eth-differences}


|            | **Ether (ETH)**                                                                                                                                                                                                                 | **Wrapped Ether (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Offerta     | L'[offerta di ETH](/eth/supply/) è gestita dal protocollo [Ethereum](/). L'[emissione](/roadmap/merge/issuance) di ETH è gestita dai validatori di Ethereum durante l'elaborazione delle transazioni e la creazione dei blocchi.                           | Il WETH è un token ERC-20 la cui offerta è gestita da un contratto intelligente. Nuove unità di WETH vengono emesse dal contratto dopo aver ricevuto depositi in ETH dagli utenti, oppure le unità di WETH vengono bruciate quando un utente desidera riscattare WETH in ETH.                                                                                                                                        |
| Proprietà  | La proprietà è gestita dal protocollo Ethereum tramite il saldo del tuo account.  | La proprietà del WETH è gestita dal contratto intelligente del token WETH, protetto dal protocollo Ethereum.                                                                                                                                         |
| Gas        | L'Ether (ETH) è l'unità di pagamento accettata per il calcolo sulla rete Ethereum. Le commissioni del gas sono denominate in gwei (un'unità di ether).                                                                                    | Il pagamento del gas con i token WETH non è supportato nativamente.                                                                                                                                                                                              |

## Domande frequenti {#faq}
 
<ExpandableCard title="Si paga per avvolgere/svolgere l'ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

Paghi le commissioni del gas per avvolgere o svolgere l'ETH utilizzando il contratto del WETH.
</ExpandableCard>

<ExpandableCard title="Il WETH è sicuro?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

Il WETH è generalmente considerato sicuro perché si basa su un contratto intelligente semplice e collaudato. Il contratto del WETH è stato anche verificato formalmente, il che rappresenta il più alto standard di sicurezza per i contratti intelligenti su Ethereum.
</ExpandableCard>

<ExpandableCard title="Perché vedo diversi token WETH?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Oltre all'[implementazione canonica del WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) descritta in questa pagina, esistono altre varianti in circolazione. Questi potrebbero essere token personalizzati creati dagli sviluppatori di app o versioni emesse su altre blockchain, e potrebbero comportarsi in modo diverso o avere proprietà di sicurezza differenti. **Controlla sempre due volte le informazioni del token per sapere con quale implementazione del WETH stai interagendo.**
</ExpandableCard>

<ExpandableCard title="Quali sono i contratti del WETH su altre reti?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Rete principale di Ethereum](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)
</ExpandableCard>

## Letture di approfondimento {#further-reading}

- [Cos'è il WETH?](https://weth.tkn.eth.limo/)
- [Informazioni sul token WETH su Blockscout](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Verifica formale del WETH](https://zellic.io/blog/formal-verification-weth)