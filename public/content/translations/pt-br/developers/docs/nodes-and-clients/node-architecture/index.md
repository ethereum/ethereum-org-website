---
title: Arquitetura do nó
description: Introdução de como os nós Ethereum são organizados.
lang: pt-br
---

Um nó Ethereum é composto por dois clientes: um [cliente de execução](/developers/docs/nodes-and-clients/#execution-clients) e um [cliente de consenso](/developers/docs/nodes-and-clients/#consensus-clients).

Quando o Ethereum estava usando [prova de trabalho](/developers/docs/consensus-mechanisms/pow/), um cliente de execução era suficiente para executar um nó completo Ethereum. No entanto, desde a implementação da [prova de participação](/developers/docs/consensus-mechanisms/pow/), o cliente de execução precisa ser usado com outro software, chamado [“cliente de consenso”](/developers/docs/nodes-and-clients/#consensus-clients).

O diagrama abaixo mostra a relação entre os dois clientes Ethereum. Os dois clientes se conectam às suas respectivas redes ponto a ponto (P2P). As redes P2P separadas são necessárias à medida que os clientes de execução espalham transações em sua rede P2P, permitindo que eles gerenciem seu pool de transações local, enquanto os clientes de consenso distribuem blocos em sua rede P2P, permitindo consenso e crescimento da cadeia.

![](node-architecture-text-background.png)

Para que essa estrutura de dois clientes funcione, os clientes de consenso devem ser capazes de passar pacotes de transações para o cliente de execução. Executar transações localmente é como o cliente valida que as transações não violam nenhuma regra do Ethereum e que a atualização proposta para o estado do Ethereum está correta. Da mesma forma, quando o nó é selecionado para ser um produtor de bloco, o cliente de consenso deve ser capaz de solicitar pacotes de transações ao Geth para incluir no novo bloco e executá-los para atualizar o estado global. Essa comunicação entre clientes é tratada por uma conexão RPC local usando a [API engine](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## O que o cliente de execução faz? {#execution-client}

O cliente de execução é responsável pelo tratamento de transações, transmissão de transações, gerenciamento de estado e suporte à Máquina Virtual Ethereum ([EVM](/developers/docs/evm/)). No entanto, ele **não** é responsável pela construção de blocos, transmissão de blocos ou tratamento da lógica de consenso. Eles estão no âmbito do cliente de consenso.

O cliente de execução cria payloads (cargas) de execução — a lista de transações, triagem de estado atualizada e outros dados relacionados à execução. Os clientes de consenso incluem o payload em cada bloco. O cliente de execução também é responsável por reexecutar transações em novos blocos, para garantir que eles sejam válidos. A execução das transações é feita no computador embutido do cliente de execução, conhecido como [Máquina Virtual Ethereum (EVM)](/developers/docs/evm).

O cliente de execução também oferece uma interface de usuário para Ethereum por meio de [métodos RPC](/developers/docs/apis/json-rpc), que permitem aos usuários consultar a blockchain Ethereum, enviar transações e implantar contratos inteligentes. É comum que as chamadas RPC sejam tratadas por uma biblioteca como [Web3js](https://docs.web3js.org/), [Web3py](https://web3py.readthedocs.io/en/v5/) ou por uma interface de usuário, como uma carteira de navegador.

Em resumo, o cliente de execução é:

- um gateway de usuário no Ethereum
- o local da Máquina Virtual Ethereum, do estado e do pool de transações do Ethereum.

## O que o cliente de consenso faz? {#consensus-client}

O cliente de consenso lida com toda a lógica que permite que um nó permaneça sincronizado com a rede Ethereum. Isso inclui receber blocos de pares e executar um algoritmo de escolha de um fork, para garantir que o nó sempre siga a cadeia com o maior acúmulo de atestações (ponderados pelos saldos efetivos do validador). Semelhante ao cliente de execução, os clientes de consenso têm sua própria rede P2P, através da qual eles compartilham blocos e atestações.

O cliente de consenso não participa do atestado ou da proposta de blocos — isso é feito por um validador, um complemento opcional para um cliente de consenso. Um cliente de consenso sem um validador acompanha apenas a ponta da cadeia, permitindo que o nó permaneça sincronizado. Isso permite que um usuário faça transações com o Ethereum usando seu cliente de execução, confiante de que está na cadeia correta.

## Validadores {#validators}

Os operadores de nó podem adicionar um validador aos seus clientes de consenso depositando 32 ETH no contrato de depósito. O cliente validador vem em conjunto com o cliente de consenso e pode ser adicionado a um nó a qualquer momento. O validador trata atestações e propostas de blocos. Eles permitem que um nó acumule recompensas ou perca ETH por meio de penalidades ou remoções. Executar o software do validador também torna um nó qualificado para propor um novo bloco.

[Mais sobre staking](/staking/).

## Comparação de componentes de um nó {#node-comparison}

| Cliente de execução                                | Cliente de consenso                                                     | Validador                              |
| -------------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------- |
| Transmissão de transações em sua rede p2p          | Transmissão de blocos e atestações em sua rede p2p                      | Propõe blocos                          |
| Executa/reexecuta transações                       | Executa o algoritmo de escolha do fork                                  | Acumula recompensas/penalizações       |
| Verifica mudanças de estado recebidas              | Mantém o controle da ponta da cadeia                                    | Faz atestações                         |
| Gerencia tentativas de estado e recibos            | Gerencia o estado do Beacon (contém informações de consenso e execução) | Requer 32 ETH para participar em stake |
| Cria payload de execução                           | Mantém o rastreamento da aleatoriedade acumulada no RANDAO              | Pode ser removido                      |
| Expõe a API JSON-RPC para interagir com o Ethereum | Mantém o rastreamento de justificativa e finalização                    |                                        |

## Leitura adicional {#further-reading}

- [Prova de participação](/developers/docs/consensus-mechanisms/pos)
- [Proposta de bloqueio](/developers/docs/consensus-mechanisms/pos/block-proposal)
- [Recompensas e penalidades do validador](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)
