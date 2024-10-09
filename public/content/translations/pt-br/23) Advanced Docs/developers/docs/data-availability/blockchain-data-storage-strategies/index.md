---
title: Estratégias de armazenamento de dados em blockchain
description: Existem várias maneiras de armazenar dados usando o blockchain. Este artigo comparará as diferentes estratégias, seus custos e compensações, bem como os requisitos para usá-las com segurança.
lang: pt-br
---

Existem várias maneiras de armazenar informações diretamente na blockchain ou de uma maneira protegida pela blockchain:

- Blobs EIP-4844
- Calldata
- Offchain com mecanismos L1
- Contrato "code"
- Eventos
- Armazenamento EVM

A escolha do método a ser utilizado é baseada em vários critérios:

- A fonte da informação. As informações nos calldatas não podem vir diretamente da própria blockchain.
- O destino da informação. Calldata está disponível apenas na transação que ele inicia. Os eventos não são acessíveis onchain.
- Quanta complicação é aceitável? Computadores que executam um nó em grande escala podem executar mais processamento do que um cliente leve em um aplicativo executado em um navegador.
- É necessário facilitar o acesso às informações de cada nó?
- Os requisitos de segurança.

## Os requisitos de segurança {#security-requirements}

Em geral, a segurança da informação consiste em três atributos:

- _Confidentiality_, entidades não autorizadas não estão autorizadas a ler as informações. Isso é importante em muitos casos, mas não aqui. _Não há segredos na blockchain_. As blockchains funcionam porque qualquer pessoa pode verificar as transições de estado, então é impossível usá-los para armazenar segredos diretamente. Existem maneiras de armazenar informações confidenciais na blockchain, mas todas elas dependem de algum componente offchain para armazenar pelo menos uma chave.

- _Integrity_, as informações estão corretas, não podem ser alteradas por entidades não autorizadas ou de maneiras não autorizadas (por exemplo, transferindo [tokens ERC-20](https://eips.ethereum.org/EIPS/eip-20#events) sem um evento `Transfer`). Na blockchain, cada nó verifica cada mudança de estado, o que garante integridade.

- _Availability_, a informação está disponível para qualquer entidade autorizada. Na blockchain, isso geralmente é obtido ao ter as informações disponíveis em cada [nó completo](https://ethereum.org/developers/docs/nodes-and-clients#full-node).

Todas as diferentes soluções aqui têm excelente integridade, porque os hashes são postados no L1. No entanto, eles têm diferentes garantias de disponibilidade.

## Pré-requisitos {#prerequisites}

Você deve ter um bom entendimento dos [fundamentos da blockchain](/developers/docs/intro-to-ethereum/). Esta página também pressupõe que o leitor esteja familiarizado com [blocos](/developers/docs/blocks/), [transações](/developers/docs/transactions/) e outros tópicos relevantes.

## Blobs EIP-4844 {#eip-4844-blobs}

Começando com [o hardfork Dencun](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/beacon-chain.md), a blockchain Ethereum inclui [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), que adiciona blobs de dados Ethereum com uma vida útil limitada (inicialmente cerca de [18 dias](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration)). Esses blobs têm preços separados do [gás de execução](/developers/docs/gas), embora usem um mecanismo semelhante. Elas são uma maneira barata de postar dados temporários.

O principal caso de uso dos blobs EIP-4844 é para rollups publicarem suas transações. [Rollups otimistas](/developers/docs/scaling/optimistic-rollups) precisam publicar as transações em suas blockchains. Essas transações precisam estar disponíveis para qualquer pessoa durante o [período do desafio](https://docs.optimism.io/connect/resources/glossary#challenge-period) para permitir que os [validadores](https://docs.optimism.io/connect/resources/glossary#validator) corrijam o erro se o [sequenciador](https://docs.optimism.io/connect/resources/glossary#sequencer) do rollup publicar uma raiz de estado incorreta.

Entretanto, uma vez que o período de desafio tenha passado e a raiz do estado tenha sido finalizada, o propósito restante para conhecer essas transações é replicar o estado atual da cadeia. Esse estado também está disponível nos nós da cadeia, exigindo muito menos processamento. Portanto, as informações de transações ainda devem ser preservadas em alguns lugares, como [block explorers](/developers/docs/data-and-analytics/block-explorers), mas não há necessidade de pagar pelo nível de resistência à censura que o Ethereum oferece.

[Rollups de conhecimento zero](/developers/docs/scaling/zk-rollups/#data-availability) também publicam seus dados de transações para permitir que outros nós repliquem o estado existente e verifiquem provas de validade, mas, novamente, esse é um requisito de curto prazo.

No momento em que escrevo, postar no EIP-4844 custa um wei (10<sup>-18</sup> ETH) por byte, o que é insignificante comparado aos [21.000 gases de execução que qualquer transação, incluindo uma que publica blobs, custa](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index). Você pode ver o preço atual do EIP-4844 em [blobscan.com](https://blobscan.com/blocks).

Aqui estão os endereços para ver os blobs postados por alguns rollups famosos.

| Rolar                                | Endereço da caixa de correio                                                                                            |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Calldata {#calldata}

Calldata refere-se aos bytes enviados como parte da transação. Ele é armazenado como parte do registro permanente da blockchain no bloco que inclui essa transação.

Este é o método mais barato para colocar dados permanentemente no blockchain. O custo por byte é de 4 gás de execução (se o byte for zero) ou 16 gás (qualquer outro valor). Se os dados forem compactados, o que é uma prática padrão, cada valor de byte será igualmente provável, então o custo médio será de aproximadamente 15,95 gás por byte.

No momento em que este artigo foi escrito, os preços eram 12 gwei/gás e 2.300 $/ETH, o que significa que o custo é de aproximadamente 45 centavos por kilobyte. Como esse era o método mais barato antes do EIP-4844, esse é o método usado pelos rollups para armazenar informações de transações, que precisam estar disponíveis para [desafios de falhas](https://docs.optimism.io/stack/protocol/overview#fault-proofs), mas não precisam ser acessíveis diretamente na cadeia.

Aqui estão os endereços para ver as transações publicadas por alguns rollups famosos.

| Rolar                                | Endereço da caixa de correio                                                                                                  |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Offchain com mecanismos L1 {#offchain-with-l1-mechs}

Dependendo das suas compensações de segurança, pode ser aceitável colocar as informações em outro lugar e usar um mecanismo que garanta que os dados estejam disponíveis quando necessário. Há dois requisitos para que isso funcione:

1. Publique um [hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) dos dados na blockchain, chamado de _input commitment_. Pode ser uma única palavra de 32 bytes, portanto não é caro. Enquanto o comprometimento de entrada estiver disponível, a integridade estará garantida porque não é possível encontrar outros dados que tenham o mesmo valor. Portanto, se dados incorretos forem fornecidos, eles poderão ser detectados.

2. Tenha um mecanismo que garanta a disponibilidade. Por exemplo, em [Redstone](https://redstone.xyz/docs/what-is-redstone) qualquer nó pode enviar um desafio de disponibilidade. Se o sequenciador não responder onchain dentro do prazo, o comprometimento de entrada será descartado, então a informação será considerada como nunca tendo sido publicada.

Isso é aceitável para um rollup otimista porque já estamos contando com pelo menos um verificador honesto para a raiz do estado. Um verificador honesto também garantirá que possui os dados para processar blocos e emitirá um desafio de disponibilidade se as informações não estiverem disponíveis off-chain. Esse tipo de rollup otimista é chamado de [plasma](/developers/docs/scaling/plasma/).

## Código do contrato {#contract-code}

Informações que só precisam ser escritas uma vez, nunca são substituídas e precisam estar disponíveis na cadeia podem ser armazenadas como código de contrato. Isso significa que criamos um "contrato inteligente" com os dados e então usamos [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) para ler as informações. A vantagem é que copiar código é relativamente barato.

Além do custo de expansão de memória, `EXTCODECOPY` custa 2.600 de gás para o primeiro acesso a um contrato (quando ele está "frio") e 100 de gás para cópias subsequentes do mesmo contrato, mais 3 de gás por palavra de 32 bytes. Comparado com o calldata, que custa 15,95 por byte, este é mais barato a partir de cerca de 200 bytes. Com base na [fórmula para custos de expansão de memória](https://www.evm.codes/about#memoryexpansion), desde que você não precise de mais de 4 Mb de memória, o custo de expansão de memória é menor que o custo de adicionar dados de chamada.

Claro, esse é apenas o custo para _read_ os dados. A criação do contrato custa aproximadamente 32.000 gás + 200 gás/byte. Este método só é econômico quando a mesma informação precisa ser lida muitas vezes em transações diferentes.

O código do contrato pode ser absurdo, desde que não comece com `0xEF`. Contratos que começam com `0xEF` são interpretados como [formato de objeto ethereum](https://notes.ethereum.org/@ipsilon/evm-object-format-overview), que tem requisitos muito mais rigorosos.

## Eventos {#events}

[Eventos](https://docs.alchemy.com/docs/solidity-events) são emitidos por contratos inteligentes e lidos por software offchain.
A vantagem é que o código offchain pode escutar eventos. O custo é [gás](https://www.evm.codes/#a0?fork=cancun), 375 mais 8 gás por byte de dados. A 12 gwei/gás e 2.300 $/ETH, isso se traduz em um centavo mais 22 centavos por kilobyte.

## Armazenamento {#storage}

Contratos inteligentes têm acesso a [armazenamento persistente](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory). Porém, é muito caro. Escrever uma palavra de 32 bytes em um slot de armazenamento previamente vazio pode [custar 22.100 de gás](https://www.evm.codes/#55?fork=cancun). A 12 gwei/gás e 2.300 $/ETH, isso é cerca de 61 centavos por operação de gravação, ou US$ 19,5 por kilobyte.

Esta é a forma mais cara de armazenamento no Ethereum.

## Resumo {#summary}

Esta tabela resume as diferentes opções, suas vantagens e desvantagens.

| Tipo de armazenamento      | Fonte de dados      | Garantia de disponibilidade                                                                                                                       | Disponibilidade onchain                                        | Limitações adicionais                                                    |
| -------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Blobs EIP-4844             | Offchain            | Garantia Ethereum por [~18 dias](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration) | Apenas hash está disponível                                    |                                                                          |
| Calldata                   | Offchain            | Garantia Ethereum para sempre (parte da blockchain)                                                                            | Disponível somente se escrito em um contrato e nessa transação |                                                                          |
| Offchain com mecanismos L1 | Offchain            | Garantia de "Um verificador honesto" durante o período de desafio                                                                                 | Somente hash                                                   | Garantido pelo mecanismo de desafio, apenas durante o período de desafio |
| Código do contrato         | Onchain ou offchain | Garantia Ethereum para sempre (parte da blockchain)                                                                            | Sim                                                            | Escrito em um endereço "aleatório", não pode começar com `0xEF`          |
| Eventos                    | Onchain             | Garantia Ethereum para sempre (parte da blockchain)                                                                            | Não                                                            |                                                                          |
| Armazenamento              | Onchain             | Garantia Ethereum para sempre (parte da blockchain e o estado atual até ser substituído)                                       | Sim                                                            |                                                                          |
