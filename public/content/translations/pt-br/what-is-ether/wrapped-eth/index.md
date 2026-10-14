---
title: Ether empacotado (WETH)
metaTitle: O que é o Ether Empacotado (WETH)
description: Uma introdução ao ether empacotado (WETH) — um invólucro compatível com ERC-20 para o ether (ETH). 
lang: pt-br
---

<Alert variant="update">
<Emoji text="🎁" />
<div>Conecte sua carteira para empacotar ou desempacotar ETH em qualquer cadeia em [WrapETH.com](https://www.wrapeth.com/)</div>
</Alert>

O ether (ETH) é a moeda principal do Ethereum. Ele é usado para vários propósitos, como staking, como moeda e para pagar taxas de gás por computação. **O WETH é efetivamente uma forma atualizada do ETH com algumas funcionalidades adicionais exigidas por muitos aplicativos e [tokens ERC-20](/glossary/#erc-20)**, que são outros tipos de ativos digitais no Ethereum. Para funcionar com esses tokens, o ETH deve seguir as mesmas regras que eles, conhecidas como o padrão ERC-20.

Para preencher essa lacuna, o ETH empacotado (WETH) foi criado. **O ETH empacotado é um contrato inteligente que permite depositar qualquer quantia de ETH no contrato e receber a mesma quantia em WETH cunhado** que está em conformidade com o padrão de token ERC-20. O WETH é uma representação do ETH que permite interagir com ele como um token ERC-20, não como o ativo nativo ETH. Você ainda precisará de ETH nativo para pagar as taxas de gás, portanto, certifique-se de guardar um pouco ao depositar. 

Você pode desempacotar WETH por ETH usando o contrato inteligente do WETH. Você pode resgatar qualquer quantia de WETH com o contrato inteligente do WETH e receberá a mesma quantia em ETH. O WETH depositado é então queimado e retirado do suprimento circulante de WETH.

**Aproximadamente ~3% do suprimento circulante de ETH está bloqueado no contrato de token WETH**, tornando-o um dos [contratos inteligentes](/glossary/#smart-contract) mais usados. O WETH é especialmente importante para usuários que interagem com aplicativos em finanças descentralizadas (DeFi).

## Por que precisamos empacotar o ETH como um ERC-20? {#why-do-we-need-to-wrap-eth}

O [ERC-20](/developers/docs/standards/tokens/erc-20/) define uma interface padrão para tokens transferíveis, para que qualquer pessoa possa criar tokens que interajam perfeitamente com aplicativos e tokens que usam esse padrão no ecossistema do Ethereum. Como **o ETH é anterior ao padrão ERC-20**, o ETH não está em conformidade com essa especificação. Isso significa que **você não pode facilmente** trocar ETH por outros tokens ERC-20 ou **usar ETH em aplicativos que usam o padrão ERC-20**. Empacotar o ETH oferece a oportunidade de fazer o seguinte:

- **Trocar ETH por tokens ERC-20**: Você não pode trocar ETH diretamente por outros tokens ERC-20. O WETH é uma representação do ether que está em conformidade com o padrão de token fungível ERC-20 e pode ser trocado por outros tokens ERC-20. 

- **Usar ETH em aplicativos descentralizados (dapps)**: Como o ETH não é compatível com ERC-20, os desenvolvedores precisariam criar interfaces separadas (uma para ETH e outra para tokens ERC-20) em dapps. Empacotar o ETH remove esse obstáculo e permite que os desenvolvedores lidem com ETH e outros tokens dentro do mesmo dapp. Muitos aplicativos de finanças descentralizadas usam esse padrão e criam mercados para a troca desses tokens.

## Ether empacotado (WETH) vs ether (ETH): Qual é a diferença? {#weth-vs-eth-differences}


|            | **Ether (ETH)**                                                                                                                                                                                                                 | **Ether Empacotado (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Suprimento | O [suprimento de ETH](/eth/supply/) é gerenciado pelo protocolo [Ethereum](/). A [emissão](/roadmap/merge/issuance) de ETH é tratada pelos validadores do Ethereum ao processar transações e criar blocos. | O WETH é um token ERC-20 cujo suprimento é gerenciado por um contrato inteligente. Novas unidades de WETH são emitidas pelo contrato após receber depósitos de ETH dos usuários, ou unidades de WETH são queimadas quando um usuário deseja resgatar WETH por ETH. |
| Propriedade | A propriedade é gerenciada pelo protocolo Ethereum por meio do saldo da sua conta. | A propriedade do WETH é gerenciada pelo contrato inteligente do token WETH, protegido pelo protocolo Ethereum. |
| Gás | O ether (ETH) é a unidade de pagamento aceita para computação na rede Ethereum. As taxas de gás são denominadas em gwei (uma unidade de ether). | O pagamento de gás com tokens WETH não é suportado nativamente. |

## Perguntas frequentes {#faq}
 
<ExpandableCard title="Você paga para empacotar/desempacotar ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

Você paga taxas de gás para empacotar ou desempacotar ETH usando o contrato WETH.

</ExpandableCard>

<ExpandableCard title="O WETH é seguro?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

O WETH é geralmente considerado seguro porque é baseado em um contrato inteligente simples e amplamente testado. O contrato WETH também passou por verificação formal, que é o mais alto padrão de segurança para contratos inteligentes no Ethereum.

</ExpandableCard>

<ExpandableCard title="Por que estou vendo diferentes tokens WETH?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Além da [implementação canônica do WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) descrita nesta página, existem outras variantes em uso. Podem ser tokens personalizados criados por desenvolvedores de aplicativos ou versões emitidas em outras blockchains, e podem se comportar de maneira diferente ou ter propriedades de segurança diferentes. **Sempre verifique as informações do token para saber com qual implementação do WETH você está interagindo.**

</ExpandableCard>

<ExpandableCard title="Quais são os contratos de WETH em outras redes?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Rede Principal do Ethereum](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)

</ExpandableCard>

## Leitura adicional {#further-reading}

- [O que é WETH?](https://weth.tkn.eth.limo/)
- [Informações do token WETH no Blockscout](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Verificação formal do WETH](https://zellic.io/blog/formal-verification-weth)