---
title: "O que é Wrapped Ether (WETH)"
description: "Uma introdução ao Wrapped ether (WETH), um wrapper compatível com ERC20 para ether (ETH)."
lang: pt-br
---

# Wrapped ether (WETH) {#intro-to-weth}

<Alert variant="update">
<Emoji text="🎁" />
<div>Conecte sua carteira para converter ou desconverter ETH em qualquer cadeia em [WrapETH.com](https://www.wrapeth.com/)
</div>
</Alert>

Ether (ETH) é a principal moeda do Ethereum. É usado para várias finalidades, como staking, como moeda e pagamento de taxas de gás para computação. O **WETH é efetivamente uma forma atualizada do ETH com algumas funcionalidades adicionais exigidas por muitos aplicativos e [tokens ERC-20](/glossary/#erc-20)**, que são outros tipos de ativos digitais no Ethereum. Para trabalhar com esses tokens, o ETH deve seguir as mesmas regras que eles, conhecidas como padrão ERC-20.

Para preencher essa lacuna, foi criado o wrapped ETH (WETH). O **Wrapped ETH é um contrato inteligente que permite que você deposite qualquer quantia de ETH no contrato e receba a mesma quantia em WETH cunhado**, em conformidade com o padrão de token ERC-20. O WETH é uma representação do ETH que permite que você interaja com ele como um token ERC-20, e não como o ativo nativo ETH. Você ainda precisará de ETH nativo para pagar as taxas de gás, portanto, certifique-se de guardar um pouco ao depositar.

Você pode trocar WETH por ETH usando o contrato inteligente WETH. Você pode resgatar qualquer quantia de WETH com o contrato inteligente WETH, e receberá a mesma quantia em ETH. O WETH depositado é então queimado e retirado do suprimento circulante de WETH.

**Cerca de 3% do suprimento de ETH em circulação está bloqueado no contrato do token WETH**, o que o torna um dos [contratos inteligentes] mais usados (/glossary/#smart-contract). O WETH é especialmente importante para usuários que interagem com aplicativos em finanças descentralizadas (DeFi).

## Por que precisamos empacotar o ETH como um ERC-20? {#why-do-we-need-to-wrap-eth}

O [ERC-20](/developers/docs/standards/tokens/erc-20/) define uma interface padrão para tokens transferíveis, de modo que qualquer pessoa pode criar tokens que interajam perfeitamente com aplicativos e tokens que usam esse padrão no ecossistema do Ethereum. Como o **ETH é anterior ao padrão ERC-20**, o ETH não está em conformidade com essa especificação. Isso significa que **você não pode trocar facilmente** ETH por outros tokens ERC-20 ou **usar ETH em aplicativos que usam o padrão ERC-20**. O empacotamento de ETH dá a você oportunidade de fazer o seguinte:

- **Trocar ETH por tokens ERC-20**: você não pode trocar ETH diretamente por outros tokens ERC-20. O WETH é uma representação do ether que está em conformidade com o padrão de token fungível ERC-20 e pode ser trocado por outros tokens ERC-20.

- **Usar ETH em dapps**: como o ETH não é compatível com o ERC20, os desenvolvedores precisariam criar interfaces separadas (uma para ETH e outra para tokens ERC-20) nos dapps. O empacotamento de ETH elimina esse obstáculo e permite que os desenvolvedores lidem com ETH e outros tokens no mesmo dapp. Muitos aplicativos financeiros descentralizados usam esse padrão e criam mercados para a troca desses tokens.

## Wrapped ether (WETH) vs. ether (ETH): qual é a diferença? {#weth-vs-eth-differences}

|               | **Ether (ETH)**                                                                                                                                                                                       | **Wrapped Ether (WETH)**                                                                                                                                                                                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Abastecimento | O abastecimento de ETH é gerenciado pelo protocolo Ethereum. A [emissão](/roadmap/merge/issuance) de ETH é tratada pelos validadores do Ethereum ao processar transações e criar blocos. | O WETH é um token ERC-20 cujo abastecimento é gerenciado por um contrato inteligente. Novas unidades de WETH são emitidas pelo contrato depois que ele recebe depósitos de ETH dos usuários, ou unidades de WETH são queimadas quando um usuário deseja resgatar WETH por ETH. |
| Propriedade   | A propriedade é gerenciada pelo protocolo Ethereum por meio do saldo de sua conta.                                                                                                                       | A propriedade do WETH é gerenciada pelo contrato inteligente do token WETH, protegido pelo protocolo Ethereum.                                                                                                                                                                                 |
| Gás           | Ether (ETH) é a unidade de pagamento aceita para computação na rede Ethereum. As tarifas de gás são denominadas em gwei (uma unidade de ether).    | O pagamento de gás com tokens WETH não é suportado nativamente.                                                                                                                                                                                                                                |

## Perguntas mais frequentes {#faq}

<ExpandableCard title="É preciso pagar para empacotar/desempacotar ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

Você paga taxas de gás para empacotar ou desempacotar ETH usando o contrato WETH.
</ExpandableCard>

<ExpandableCard title="O WETH é seguro?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

O WETH é geralmente considerado seguro porque é baseado em um contrato inteligente simples e de eficiência comprovada. O contrato WETH também foi formalmente verificado, que é o mais alto padrão de segurança para contratos inteligentes no Ethereum.
</ExpandableCard>

<ExpandableCard title="Por que estou vendo diferentes tokens WETH?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Além da [implementação canônica do WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) descrita nesta página, há outras variantes disponíveis. Eles podem ser tokens personalizados criados por desenvolvedores de aplicativos ou versões emitidas em outras blockchains e podem se comportar de forma diferente ou ter propriedades de segurança diferentes. \*\*Sempre verifique novamente as informações do token para saber com qual implementação do WETH você está interagindo
</ExpandableCard>

<ExpandableCard title="Quais são os contratos WETH em outras redes?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Rede principal do Ethereum](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)
</ExpandableCard>

## Leitura adicional {#further-reading}

- [O que é WETH?](https://weth.tkn.eth.limo/)
- [Informações sobre o token WETH no Blockscout](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Verificação formal do WETH](https://zellic.io/blog/formal-verification-weth)
