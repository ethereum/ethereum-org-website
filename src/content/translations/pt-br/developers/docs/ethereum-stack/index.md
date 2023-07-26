---
title: Introdução à pilha de Ethereum
description: Um passo a passo de diferentes camadas de pilha de Ethereum e como elas se encaixam.
lang: pt-br
---

Como qualquer pilha de software, a "pilha de Ethereum" completa varia de projeto a projeto dependendo do seu objetivo de negócios.

Entretanto, existem tecnologias centrais da Ethereum que ajudam a fornecer um modelo mental sobre como aplicativos de software interagem com a cadeia de blocos Ethereum. Compreender as camadas da pilha ajudará você a entender as diferentes maneiras como o Ethereum pode ser integrado nos projetos de software.

## Nível 1: Máquina Virtual Ethereum {#ethereum-virtual-machine}

A [Ethereum Virtual Machine (EVM)](/developers/docs/evm/) é o ambiente de execução para contratos inteligentes na Ethereum. Todos os contratos inteligentes e alterações de estado na blockchain Ethereum são executados por [transações](/developers/docs/transactions/). A EVM controla todo o processamento de transações na rede Ethereum.

Como em qualquer máquina virtual, a EVM cria um nível de abstração entre o código de execução e a máquina de execução (um nó Ethereum). Atualmente, a EVM está executando em milhares de nós distribuídos pelo mundo.

Por trás das cortinas, a EVM utiliza um conjunto de instruções opcode para executar tarefas específicas. Esses opcodes (140 exclusivos) permitem que a EVM seja [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness), o que significa que a EVM é capaz de computar praticamente qualquer coisa, com recursos suficientes.

Como um desenvolvedor dapp, você não precisa saber muito sobre a EVM que não existe e isso alimenta de forma confiável todos os aplicativos na Ethereum sem interrupções.

## Nível 2: Contratos Inteligentes {#smart-contracts}

[Contratos inteligentes](/developers/docs/smart-contracts/) são os programas executáveis que funcionam na blockchain Ethereum.

Os contratos inteligentes são escritos usando [linguagens de programação](/developers/docs/smart-contracts/languages/) que compilam para bytecode EVM (instruções de máquina de baixo nível chamadas códigos de operação).

Não só os contratos inteligentes servem como bibliotecas de código aberto, eles são essencialmente serviços de API abertos que rodam 24/7 e não podem ser derrubados. Os contratos inteligentes fornecem funções públicas com as quais os aplicativos ([dapps](/developers/docs/dapps/)) podem interagir sem precisar de permissão. Qualquer aplicativo pode se integrar com contratos inteligentes implantados para compor funcionalidade, como adicionar [feeds de dados](/developers/docs/oracles/) ou suportar trocas de token. Qualquer um pode implantar novos contratos inteligentes para a Ethereum, a fim de adicionar funcionalidade personalizada para atender às necessidades do aplicativo.

Como um desenvolvedor dapp, você só precisará escrever contratos inteligentes se desejar adicionar funcionalidade personalizada na blockchain Ethereum. Você pode encontrar que pode alcançar a maior parte ou todas as necessidades do seu projeto simplesmente integrando com contratos inteligentes existentes, por exemplo, se você deseja apoiar pagamentos em stablecoins ou habilitar o câmbio descentralizado de tokens.

## Nível 3: Nós Ethereum {#ethereum-nodes}

Para um aplicativo interagir com a blockchain Ethereum, ele deve se conectar a um [nó Ethereum](/developers/docs/nodes-and-clients/). Conectar-se a um nó permite que você leia dados da blockchain (cadeia de blocos) e/ou envie transações para a rede.

Os nós Ethereum são computadores executando um software - um cliente Ethereum. Um cliente é uma implementação da Ethereum que verifica todas as transações em cada bloco, mantendo a rede segura e os dados precisos. **Os nós Ethereum são a blockchain (cadeia de blocos) Ethereum**. Eles armazenam coletivamente o estado da blockchain Ethereum e alcançam consenso sobre transações para alterar o estado da blockchain.

Conectando seu aplicativo a um nó Ethereum (via [JSON-RPC API](/developers/docs/apis/json-rpc/)), sua aplicação é capaz de ler dados da blockchain (como os saldos das contas de usuários) bem como transmitir novas transações para a rede (como a transferência do ETH entre as contas de usuários ou a execução de funções de contratos inteligentes).

## Nível 4: API de Cliente Ethereum {#ethereum-client-apis}

Muitas bibliotecas de conveniência (desenvolvidas e mantidas pela comunidade de código aberto da Ethereum) permitem que seus aplicativos de usuário finais se conectem e se comuniquem com a blockchain Ethereum.

Se seu aplicativo voltado para o usuário for um aplicativo web, você pode optar por `instalar o npm` uma [API JavaScript](/developers/docs/apis/javascript/) diretamente no seu frontend. Ou talvez você escolha implementar esta funcionalidade do lado do servidor usando uma API [Python](/developers/docs/programming-languages/python/) ou [Java](/developers/docs/programming-languages/java/).

Embora essas APIs não sejam uma parte necessária da pilha, elas abstraem muito da complexidade de interagir diretamente com um nó Ethereum. Eles também fornecem funções de utilidade (por exemplo, Convertendo ETH para Gwei) para que como desenvolvedor você possa passar menos tempo lidando com as complexidades de clientes da Ethereum e mais tempo focado na funcionalidade única do seu aplicativo.

## Nível 5: Aplicativos para o usuário final {#end-user-applications}

No nível superior da pilha estão as aplicações voltadas para o usuário. Esses são os aplicativos padrão que você regularmente usa e constrói hoje: principalmente web e mobile apps.

A forma como você desenvolve essas interfaces de usuário permanece essencialmente inalterada. Frequentemente, os usuários não precisam saber que o aplicativo que estão usando é construído usando uma cadeia de blocos.

## Pronto para escolher sua pilha? {#ready-to-choose-your-stack}

Confira o nosso guia para [configurar um ambiente de desenvolvimento local](/developers/local-environment/) para o seu aplicativo Ethereum.

## Leitura adicional {#further-reading}

- [A Arquitetura de uma aplicação Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_

_Conhece um recurso da comunidade que ajudou você? Edite essa página e adicione!_
