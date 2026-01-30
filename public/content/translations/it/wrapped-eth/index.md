---
title: "Che cos'è il Wrapped Ether (WETH)"
description: "Un'introduzione al Wrapped ether (WETH)—un wrapper per ether (ETH) compatibile con ERC20."
lang: it
---

# Wrapped Ether (WETH) {#intro-to-weth}

<Alert variant="update">
<Emoji text="🎁" />
<div>Connetti il tuo portafoglio per incapsulare o scapsulare ETH su qualsiasi catena su [WrapETH.com](https://www.wrapeth.com/)
</div>
</Alert>

Ether (ETH) è la valuta principale di Ethereum. Viene utilizzato per diversi scopi, ad esempio lo staking, come valuta e per il pagamento delle commissioni per la computazione. **WETH è essenzialmente una forma aggiornata di ETH con alcune funzionalità aggiuntive richieste da molte applicazioni e [token ERC-20](/glossary/#erc-20)**, che sono altri tipi di risorse digitali su Ethereum. Per funzionare con questi token, ETH deve seguire le stesse regole, note come standard ERC-20.

Per colmare questo divario, è stato creato l'ETH "avvolto", chiamato wrapped ETH (WETH). **Wrapped ETH è un contratto intelligente che consente di depositare qualsiasi importo di ETH nel contratto e ricevere lo stesso importo in WETH coniato** che rispetta lo standard token ERC-20. WETH è una rappresentazione di ETH che consente di interagire con esso come un token ERC-20, non come la risorsa nativa ETH. Saranno comunque necessari ETH nativi per pagare le commissioni del gas, quindi assicurati di tenerne un po' da parte quando depositi.

Puoi "scartare" (ovvero unwrap) WETH per ETH utilizzando il contratto intelligente WETH. Con il contratto intelligente WETH puoi riscattare qualsiasi importo di WETH e ricevere lo stesso importo in ETH. Il WETH depositato viene quindi bruciato ed eliminato dalla quantità di WETH in circolazione.

**Circa il 3% della quantità di ETH in circolazione è bloccato nel contratto token WETH**, il che lo rende uno dei [contratti intelligenti](/glossary/#smart-contract) più utilizzati. WETH è particolarmente importante per gli utenti che interagiscono con le applicazioni nella finanza decentralizzata (DeFi).

## Perché dobbiamo avvolgere l'ETH come ERC-20? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) definisce un'interfaccia standard per i token trasferibili, quindi chiunque può creare token che interagiscono perfettamente con applicazioni e token che utilizzano questo standard nell'ecosistema di Ethereum. Poiché **ETH è antecedente allo standard ERC-20**, ETH non è conforme a questa specifica. Questo significa che **non puoi facilmente** scambiare ETH con altri token ERC-20 o **utilizzare ETH nelle applicazioni che utilizzano lo standard ERC-20**. Avvolgere l'ETH ti dà l'opportunità di fare quanto segue:

- **Scambiare ETH con token ERC-20**: non puoi scambiare ETH direttamente con altri token ERC-20. WETH è una rappresentazione di ether conforme allo standard di token fungibile ERC-20 e può essere scambiato con altri token ERC-20.

- **Utilizzare ETH nelle dApp**: poiché ETH non è compatibile con ERC20, gli sviluppatori dovrebbero creare interfacce separate (una per ETH e un'altra per i token ERC-20) nelle dApp. L'ETH avvolto rimuove questo ostacolo e consente agli sviluppatori di gestire ETH e altri token all'interno della stessa dApp. Molte applicazioni di finanza decentralizzata utilizzano questo standard e creano mercati per lo scambio di questi token.

## Wrapped Ether (WETH) vs Ether (ETH): qual è la differenza? {#weth-vs-eth-differences}

|           | **Ether (ETH)**                                                                                                                                                                                                                 | **Wrapped Ether (WETH)**                                                                                                                                                                                                                                                                  |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Fornitura | La fornitura di ETH è gestita dal protocollo Ethereum. L'[emissione](/roadmap/merge/issuance) di ETH viene gestita dai validatori di Ethereum durante l'elaborazione delle transazioni e la creazione dei blocchi. | WETH è un token ERC-20 la cui quantità è gestita da un contratto intelligente. Nuove unità di WETH vengono emesse dal contratto dopo aver ricevuto depositi di ETH dagli utenti, oppure le unità di WETH vengono bruciate quando un utente desidera riscattare WETH per ETH. |
| Proprietà | La proprietà è gestita dal protocollo Ethereum attraverso il saldo del tuo conto.                                                                                                                                                  | Il possesso di WETH è gestito dal contratto intelligente del token WETH, garantito dal protocollo Ethereum.                                                                                                                                                                                  |
| Gas       | Ether (ETH) è l'unità di pagamento accettata per la computazione sulla rete Ethereum. Le commissioni del gas sono denominate in gwei (un'unità di ether).                    | Il pagamento di gas con i token WETH non è supportato nativamente.                                                                                                                                                                                                                           |

## Domande frequenti {#faq}

<ExpandableCard title="Si paga per avvolgere/scartare ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

Devi pagare delle commissioni del gas per avvolgere o scartare ETH utilizzando il contratto WETH.
</ExpandableCard>

<ExpandableCard title="WETH è sicuro?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH è generalmente considerato sicuro perché si basa su un contratto intelligente semplice e testato sul campo. Anche il contratto WETH è stato formalmente verificato, che è lo standard di sicurezza più elevato per i contratti intelligenti su Ethereum.
</ExpandableCard>

<ExpandableCard title="Perché vedo diversi token WETH?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Oltre all'[implementazione canonica di WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) descritta in questa pagina, ci sono altre varianti in giro. Queste possono essere token personalizzati creati dagli sviluppatori di applicazioni o versioni emesse su altre blockchain, e potrebbero comportarsi diversamente o avere proprietà di sicurezza diverse. **Ricontrolla sempre le informazioni sui token per sapere con quale implementazione di WETH stai interagendo.**
</ExpandableCard>

<ExpandableCard title="Quali sono i contratti WETH su altre reti?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Rete Principale di Ethereum](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)
</ExpandableCard>

## Letture consigliate {#further-reading}

- [WTF is WETH?](https://weth.tkn.eth.limo/)
- [Informazioni sul token WETH su Blockscout](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Verifica Formale di WETH](https://zellic.io/blog/formal-verification-weth)
