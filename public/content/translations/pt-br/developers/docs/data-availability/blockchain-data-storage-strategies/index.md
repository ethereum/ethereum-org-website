---
title: "Estratégias de armazenamento de dados na blockchain"
description: "Existem várias maneiras de armazenar dados usando a blockchain. Este artigo comparará as diferentes estratégias, seus custos e compensações, bem como os requisitos para usá-las com segurança."
lang: pt-br
---

Existem várias maneiras de armazenar informações diretamente na blockchain ou de uma maneira que seja protegida pela blockchain:

- Blobs da EIP-4844
- Dados de chamada (calldata)
- Offchain com mecanismos da camada 1 (l1)
- "Código" do contrato
- Eventos
- Armazenamento da EVM

A escolha de qual método usar baseia-se em vários critérios:

- A fonte da informação. As informações nos dados de chamada não podem vir diretamente da própria blockchain.
- O destino da informação. Os dados de chamada estão disponíveis apenas na transação que os inclui. Os eventos não são acessíveis onchain de forma alguma.
- Quanto incômodo é aceitável? Computadores que executam um nó completo podem realizar mais processamento do que um cliente leve em um aplicativo executado em um navegador.
- É necessário facilitar o acesso fácil à informação a partir de cada nó?
- Os requisitos de segurança.

## Os requisitos de segurança {#security-requirements}

Em geral, a segurança da informação consiste em três atributos:

- _Confidencialidade_, entidades não autorizadas não têm permissão para ler as informações. Isso é importante em muitos casos, mas não aqui. _Não há segredos na blockchain_. As blockchains funcionam porque qualquer pessoa pode verificar as transições de estado, portanto, é impossível usá-las para armazenar segredos diretamente. Existem maneiras de armazenar informações confidenciais na blockchain, mas todas dependem de algum componente offchain para armazenar pelo menos uma chave.

- _Integridade_, a informação está correta, não pode ser alterada por entidades não autorizadas ou de maneiras não autorizadas (por exemplo, transferir [tokens ERC-20](https://eips.ethereum.org/EIPS/eip-20#events) sem um evento `Transfer`). Na blockchain, cada nó verifica cada mudança de estado, o que garante a integridade.

- _Disponibilidade_, a informação está disponível para qualquer entidade autorizada. Na blockchain, isso geralmente é alcançado tendo a informação disponível em cada [nó completo](https://ethereum.org/developers/docs/nodes-and-clients/#full-node).

As diferentes soluções aqui têm todas uma excelente integridade, porque os hashes são publicados na camada 1 (l1). No entanto, elas têm diferentes garantias de disponibilidade.

## Pré-requisitos {#prerequisites}

Você deve ter um bom entendimento dos [fundamentos da blockchain](/developers/docs/intro-to-ethereum/). Esta página também pressupõe que o leitor esteja familiarizado com [blocos](/developers/docs/blocks/), [transações](/developers/docs/transactions/) e outros tópicos relevantes.

## Blobs da EIP-4844 {#eip-4844-blobs}

A partir do [hardfork Dencun](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/beacon-chain.md), a blockchain Ethereum inclui a [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), que adiciona ao Ethereum blobs de dados com uma vida útil limitada (inicialmente cerca de [18 dias](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration)). Esses blobs são precificados separadamente do [gás de execução](/developers/docs/gas), embora usem um mecanismo semelhante. Eles são uma maneira barata de publicar dados temporários.

O principal caso de uso para os blobs da EIP-4844 é para os rollups publicarem suas transações. Os [rollups otimistas](/developers/docs/scaling/optimistic-rollups) precisam publicar as transações em suas blockchains. Essas transações devem estar disponíveis para qualquer pessoa durante o [período de desafio](https://docs.optimism.io/connect/resources/glossary#challenge-period) para permitir que os [validadores](https://docs.optimism.io/connect/resources/glossary#validator) corrijam o erro se o [sequenciador](https://docs.optimism.io/connect/resources/glossary#sequencer) do rollup publicar uma raiz de estado incorreta.

No entanto, uma vez que o período de desafio tenha passado e a raiz de estado seja finalizada, o propósito restante para conhecer essas transações é replicar o estado atual da cadeia. Esse estado também está disponível a partir dos nós da cadeia, com muito menos processamento necessário. Portanto, as informações da transação ainda devem ser preservadas em alguns lugares, como [exploradores de blocos](/developers/docs/data-and-analytics/block-explorers), mas não há necessidade de pagar pelo nível de resistência à censura que o Ethereum fornece.

Os [rollups de conhecimento zero](/developers/docs/scaling/zk-rollups/#data-availability) também publicam seus dados de transação para permitir que outros nós repliquem o estado existente e verifiquem as provas de validade, mas, novamente, esse é um requisito de curto prazo.

No momento da redação, a publicação na EIP-4844 custa um Wei (10<sup>-18</sup> ETH) por byte, o que é insignificante em comparação com [os 21.000 de gás de execução que qualquer transação, incluindo uma que publica blobs, custa](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index). Você pode ver o preço atual da EIP-4844 em [blobscan.com](https://blobscan.com/blocks).

Aqui estão os endereços para ver os blobs publicados por alguns rollups famosos.

| Rollup                               | Endereço da caixa de correio                                                                                                         |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Dados de chamada {#calldata}

Os dados de chamada referem-se aos bytes enviados como parte da transação. Eles são armazenados como parte do registro permanente da blockchain no bloco que inclui essa transação.

Este é o método mais barato para colocar dados permanentemente na blockchain. O custo por byte é de 4 de gás de execução (se o byte for zero) ou 16 de gás (qualquer outro valor). Se os dados forem compactados, o que é uma prática padrão, então cada valor de byte é igualmente provável, de modo que o custo médio é de aproximadamente 15,95 de gás por byte.

No momento da redação, os preços são 12 gwei/gás e 2300 $/ETH, o que significa que o custo é de aproximadamente 45 centavos por kilobyte. Como esse era o método mais barato antes da EIP-4844, este é o método que os rollups usavam para armazenar informações de transação, que precisam estar disponíveis para [desafios de falha](https://docs.optimism.io/stack/protocol/overview#fault-proofs), mas não precisam ser acessíveis diretamente onchain.

Aqui estão os endereços para ver as transações publicadas por alguns rollups famosos.

| Rollup                               | Endereço da caixa de correio                                                                                                               |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Offchain com mecanismos da camada 1 (l1) {#offchain-with-l1-mechs}

Dependendo de suas compensações de segurança, pode ser aceitável colocar as informações em outro lugar e usar um mecanismo que garanta que os dados estejam disponíveis quando necessário. Existem dois requisitos para que isso funcione:

1. Publicar um [hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) dos dados na blockchain, chamado de _compromisso de entrada_ (_input commitment_). Isso pode ser uma única palavra de 32 bytes, portanto, não é caro. Desde que o compromisso de entrada esteja disponível, a integridade é garantida porque não é viável encontrar quaisquer outros dados que resultariam no mesmo valor de hash. Portanto, se dados incorretos forem fornecidos, isso poderá ser detectado.

2. Ter um mecanismo que garanta a disponibilidade. Por exemplo, na [Redstone](https://redstone.xyz/docs/what-is-redstone), qualquer nó pode enviar um desafio de disponibilidade. Se o sequenciador não responder onchain até o prazo, o compromisso de entrada será descartado, de modo que a informação será considerada como nunca tendo sido publicada.

Isso é aceitável para um rollup otimista porque já estamos confiando em ter pelo menos um verificador honesto para a raiz de estado. Esse verificador honesto também se certificará de que possui os dados para processar blocos e emitirá um desafio de disponibilidade se as informações não estiverem disponíveis offchain. Esse tipo de rollup otimista é chamado de [Plasma](/developers/docs/scaling/plasma/).

## Código do contrato {#contract-code}

As informações que só precisam ser gravadas uma vez, nunca são substituídas e precisam estar disponíveis onchain podem ser armazenadas como código de contrato. Isso significa que criamos um "contrato inteligente" com os dados e, em seguida, usamos [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) para ler as informações. A vantagem é que copiar código é relativamente barato.

Além do custo de expansão de memória, `EXTCODECOPY` custa 2600 de gás para o primeiro acesso a um contrato (quando está "frio") e 100 de gás para cópias subsequentes do mesmo contrato, mais 3 de gás por palavra de 32 bytes. Em comparação com os dados de chamada, que custam 15,95 por byte, isso é mais barato a partir de cerca de 200 bytes. Com base na [fórmula para custos de expansão de memória](https://www.evm.codes/about#memoryexpansion), desde que você não precise de mais de 4 MB de memória, o custo de expansão de memória é menor do que o custo de adicionar dados de chamada.

Claro, este é apenas o custo para _ler_ os dados. Criar o contrato custa aproximadamente 32.000 de gás + 200 de gás/byte. Este método só é econômico quando a mesma informação precisa ser lida muitas vezes em transações diferentes.

O código do contrato pode não fazer sentido, desde que não comece com `0xEF`. Os contratos que começam com `0xEF` são interpretados como [formato de objeto ethereum](https://notes.ethereum.org/@ipsilon/evm-object-format-overview), que tem requisitos muito mais rigorosos.

## Eventos {#events}

Os [eventos](https://docs.alchemy.com/docs/solidity-events) são emitidos por contratos inteligentes e lidos por software offchain.
A vantagem deles é que o código offchain pode escutar eventos. O custo é em [gás](https://www.evm.codes/#a0?fork=cancun), 375 mais 8 de gás por byte de dados. A 12 gwei/gás e 2300 $/ETH, isso se traduz em um centavo mais 22 centavos por kilobyte.

## Armazenamento {#storage}

Os contratos inteligentes têm acesso ao [armazenamento persistente](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory). No entanto, é muito caro. Gravar uma palavra de 32 bytes em um slot de armazenamento anteriormente vazio pode [custar 22.100 de gás](https://www.evm.codes/#55?fork=cancun). A 12 gwei/gás e 2300 $/ETH, isso é cerca de 61 centavos por operação de gravação, ou US$ 19,5 por kilobyte.

Esta é a forma mais cara de armazenamento no Ethereum.

## Resumo {#summary}

Esta tabela resume as diferentes opções, suas vantagens e desvantagens.

| Tipo de armazenamento                | Fonte de dados      | Garantia de disponibilidade                                                                                                             | Disponibilidade onchain                                             | Limitações adicionais                                                  |
| --------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Blobs da EIP-4844              | Offchain            | Garantia do Ethereum por [\~18 dias](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration) | Apenas o hash está disponível                                           |                                                                         |
| Dados de chamada                    | Offchain            | Garantia do Ethereum para sempre (parte da blockchain)                                                                                | Disponível apenas se gravado em um contrato e nessa transação |
| Offchain com mecanismos da camada 1 (l1) | Offchain            | Garantia de "um verificador honesto" durante o período de desafio                                                                        | Apenas hash                                                        | Garantido pelo mecanismo de desafio, apenas durante o período de desafio |
| Código do contrato               | Onchain ou offchain | Garantia do Ethereum para sempre (parte da blockchain)                                                                                | Sim                                                              | Gravado em um endereço "aleatório", não pode começar com `0xEF`                 |
| Eventos                      | Onchain             | Garantia do Ethereum para sempre (parte da blockchain)                                                                                | Não                                                               |
| Armazenamento                     | Onchain             | Garantia do Ethereum para sempre (parte da blockchain e do estado atual até ser substituído)                                        | Sim                                                              |