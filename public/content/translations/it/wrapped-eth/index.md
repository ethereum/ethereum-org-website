---
title: Ether incapsulato (WETH)
metaTitle: Cos'è l'ether incapsulato (WETH)
description: Un'introduzione all'ether incapsulato (WETH), un wrapper compatibile con ERC-20 per l'ether (ETH). 
lang: it
---

<Alert variant="update">
<Emoji text="🎁" />
<div>Connetti il tuo portafoglio per incapsulare o decapsulare ETH su qualsiasi catena su [WrapETH.com](https://www.wrapeth.com/)</div>
</Alert>

L'ether (ETH) è la valuta principale di Ethereum. È utilizzato per diversi scopi come lo staking, come valuta e per pagare le commissioni del gas per il calcolo. **Il WETH è a tutti gli effetti una forma aggiornata di ETH con alcune funzionalità aggiuntive richieste da molte applicazioni e dai [token ERC-20](/glossary/#erc-20)**, che sono altri tipi di risorse digitali su Ethereum. Per funzionare con questi token, l'ETH deve seguire le loro stesse regole, note come standard ERC-20.

Per colmare questa lacuna, è stato creato l'ether incapsulato (WETH). **L'ether incapsulato è uno smart contract che ti consente di depositare qualsiasi importo di ETH nel contratto e ricevere lo stesso importo in WETH coniato** conforme allo standard dei token ERC-20. Il WETH è una rappresentazione dell'ETH che ti consente di interagirvi come token ERC-20, non come risorsa nativa ETH. Avrai comunque bisogno di ETH nativo per pagare le commissioni del gas, quindi assicurati di conservarne un po' quando effettui il deposito. 

Puoi decapsulare il WETH in ETH utilizzando lo smart contract del WETH. Puoi riscattare qualsiasi importo di WETH con lo smart contract del WETH e riceverai lo stesso importo in ETH. Il WETH depositato viene quindi bruciato e rimosso dall'offerta circolante di WETH.

**Circa il 3% dell'offerta circolante di ETH è bloccato nel contratto del token WETH**, rendendolo uno degli [smart contract](/glossary/#smart-contract) più utilizzati. Il WETH è particolarmente importante per gli utenti che interagiscono con le applicazioni della finanza decentralizzata (DeFi).

## Perché dobbiamo incapsulare l'ETH come ERC-20? {#why-do-we-need-to-wrap-eth}

L'[ERC-20](/developers/docs/standards/tokens/erc-20/) definisce un'interfaccia standard per i token trasferibili, in modo che chiunque possa creare token che interagiscono senza problemi con le applicazioni e i token che utilizzano questo standard nell'ecosistema di Ethereum. Poiché **l'ETH precede lo standard ERC-20**, l'ETH non è conforme a questa specifica. Ciò significa che **non puoi facilmente** scambiare ETH con altri token ERC-20 o **utilizzare l'ETH nelle app che utilizzano lo standard ERC-20**. L'incapsulamento dell'ETH ti offre l'opportunità di fare quanto segue:

- **Scambiare ETH con token ERC-20**: non puoi scambiare direttamente l'ETH con altri token ERC-20. Il WETH è una rappresentazione dell'ether conforme allo standard dei token fungibili ERC-20 e può essere scambiato con altri token ERC-20. 

- **Utilizzare l'ETH nelle dapp**: poiché l'ETH non è compatibile con l'ERC-20, gli sviluppatori dovrebbero creare interfacce separate (una per l'ETH e un'altra per i token ERC-20) nelle applicazioni decentralizzate (dapp). L'incapsulamento dell'ETH rimuove questo ostacolo e consente agli sviluppatori di gestire l'ETH e altri token all'interno della stessa dapp. Molte applicazioni di finanza decentralizzata utilizzano questo standard e creano mercati per lo scambio di questi token.

## Ether incapsulato (WETH) vs ether (ETH): qual è la differenza? {#weth-vs-eth-differences}


|            | **Ether (ETH)**                                                                                                                                                                                                                 | **Ether incapsulato (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Offerta     | L'[offerta di ETH](/eth/supply/) è gestita dal protocollo [Ethereum](/). L'[emissione](/roadmap/merge/issuance) di ETH è gestita dai validatori di Ethereum durante l'elaborazione delle transazioni e la creazione dei blocchi.                           | Il WETH è un token ERC-20 la cui offerta è gestita da uno smart contract. Nuove unità di WETH vengono emesse dal contratto dopo aver ricevuto depositi in ETH dagli utenti, oppure le unità di WETH vengono bruciate quando un utente desidera riscattare WETH in ETH.                                                                                                                                        |
| Proprietà  | La proprietà è gestita dal protocollo Ethereum tramite il saldo del tuo account.  | La proprietà del WETH è gestita dallo smart contract del token WETH, protetto dal protocollo Ethereum.                                                                                                                                         |
| Gas        | L'ether (ETH) è l'unità di pagamento accettata per il calcolo sulla rete Ethereum. Le commissioni del gas sono denominate in Gwei (un'unità di ether).                                                                                    | Il pagamento del gas con i token WETH non è supportato nativamente.                                                                                                                                                                                              |

## Domande frequenti {#faq}
 
<ExpandableCard title="Si paga per incapsulare/spacchettare ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

Paghi le commissioni del gas per incapsulare o decapsulare l'ETH utilizzando il contratto del WETH.

</ExpandableCard>

<ExpandableCard title="WETH è sicuro?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

Il WETH è generalmente considerato sicuro perché si basa su uno smart contract semplice e collaudato. Il contratto del WETH è stato anche sottoposto a verifica formale, che rappresenta il più alto standard di sicurezza per gli smart contract su Ethereum.

</ExpandableCard>

<ExpandableCard title="Perché vedo diversi token WETH?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Oltre all'[implementazione canonica del WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) descritta in questa pagina, ci sono altre varianti in circolazione. Queste potrebbero essere token personalizzati creati dagli sviluppatori di app o versioni emesse su altre blockchain, e potrebbero comportarsi diversamente o avere proprietà di sicurezza differenti. **Controlla sempre due volte le informazioni del token per sapere con quale implementazione del WETH stai interagendo.**

</ExpandableCard>

<ExpandableCard title="Quali sono i contratti WETH su altre reti?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Mainnet di Ethereum](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)

</ExpandableCard>

## Letture consigliate {#further-reading}

- [WTF is WETH?](https://weth.tkn.eth.limo/)
- [Informazioni sul token WETH su Blockscout](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Verifica formale del WETH](https://zellic.io/blog/formal-verification-weth)