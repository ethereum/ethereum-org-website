---
title: "Introdução à stack do Ethereum"
description: Um passo a passo das diferentes camadas da stack do Ethereum e como elas se encaixam.
lang: pt-br
---

Como qualquer stack de software, a "stack do Ethereum" completa variará de projeto para projeto, dependendo de seus objetivos.

Existem, no entanto, componentes principais do Ethereum que ajudam a fornecer um modelo mental de como os aplicativos de software interagem com a blockchain do Ethereum. Entender as camadas da stack ajudará você a entender as diferentes maneiras pelas quais o Ethereum pode ser integrado a projetos de software.

## Nível 1: Máquina Virtual Ethereum (EVM) {#ethereum-virtual-machine}

A [Máquina Virtual Ethereum (EVM)](/developers/docs/evm/) é o ambiente de tempo de execução para contratos inteligentes no Ethereum. Todos os contratos inteligentes e mudanças de estado na blockchain do Ethereum são executados por [transações](/developers/docs/transactions/). A EVM lida com todo o processamento de transações na rede Ethereum.

Como em qualquer máquina virtual, a EVM cria um nível de abstração entre o código em execução e a máquina em execução (um nó do Ethereum). Atualmente, a EVM está sendo executada em milhares de nós distribuídos pelo mundo.

Internamente, a EVM usa um conjunto de instruções de código de operação (opcode) para executar tarefas específicas. Esses (140 exclusivos) códigos de operação permitem que a EVM seja [Turing completa](https://en.wikipedia.org/wiki/Turing_completeness), o que significa que a EVM é capaz de computar quase qualquer coisa, desde que haja recursos suficientes.

Como desenvolvedor de um aplicativo descentralizado (dapp), você não precisa saber muito sobre a EVM, além de que ela existe e que alimenta de forma confiável todos os aplicativos no Ethereum sem tempo de inatividade.

## Nível 2: Contratos inteligentes {#smart-contracts}

[Contratos inteligentes](/developers/docs/smart-contracts/) são os programas executáveis que rodam na blockchain do Ethereum.

Contratos inteligentes são escritos usando [linguagens de programação](/developers/docs/smart-contracts/languages/) específicas que são compiladas para bytecode da EVM (instruções de máquina de baixo nível chamadas códigos de operação).

Os contratos inteligentes não servem apenas como bibliotecas de código aberto, eles são essencialmente serviços de API abertos que estão sempre em execução e não podem ser desativados. Os contratos inteligentes fornecem funções públicas com as quais usuários e aplicativos ([dapps](/developers/docs/dapps/)) podem interagir, sem precisar de permissão. Qualquer aplicativo pode se integrar a contratos inteligentes implantados para compor funcionalidades, como adicionar [feeds de dados](/developers/docs/oracles/) ou para dar suporte a trocas de tokens. Além disso, qualquer pessoa pode implantar novos contratos inteligentes no Ethereum para adicionar funcionalidades personalizadas e atender às necessidades de seu aplicativo.

Como desenvolvedor de dapps, você precisará escrever contratos inteligentes apenas se quiser adicionar funcionalidades personalizadas na blockchain do Ethereum. Você pode descobrir que consegue atingir a maioria ou todas as necessidades do seu projeto apenas integrando-se a contratos inteligentes existentes, por exemplo, se quiser dar suporte a pagamentos em stablecoins ou permitir a troca descentralizada de tokens.

## Nível 3: Nós do Ethereum {#ethereum-nodes}

Para que um aplicativo interaja com a blockchain do Ethereum, ele deve se conectar a um [nó do Ethereum](/developers/docs/nodes-and-clients/). Conectar-se a um nó permite que você leia dados da blockchain e/ou envie transações para a rede.

Nós do Ethereum são computadores executando um software - um cliente Ethereum. Um cliente é uma implementação do Ethereum que verifica todas as transações em cada bloco, mantendo a rede segura e os dados precisos. **Os nós do Ethereum são a blockchain do Ethereum**. Eles armazenam coletivamente o estado da blockchain do Ethereum e chegam a um consenso sobre as transações para alterar o estado da blockchain.

Ao conectar seu aplicativo a um nó do Ethereum (por meio da [API JSON-RPC](/developers/docs/apis/json-rpc/)), seu aplicativo é capaz de ler dados da blockchain (como saldos de contas de usuários), bem como transmitir novas transações para a rede (como transferir ETH entre contas de usuários ou executar funções de contratos inteligentes).

## Nível 4: APIs de cliente Ethereum {#ethereum-client-apis}

Muitas bibliotecas de conveniência (construídas e mantidas pela comunidade de código aberto do Ethereum) permitem que seus aplicativos se conectem e se comuniquem com a blockchain do Ethereum.

Se o seu aplicativo voltado para o usuário for um aplicativo da web, você pode optar por `npm install` uma [API JavaScript](/developers/docs/apis/javascript/) diretamente no seu frontend. Ou talvez você escolha implementar essa funcionalidade no lado do servidor, usando uma API [Python](/developers/docs/programming-languages/python/) ou [Java](/developers/docs/programming-languages/java/).

Embora essas APIs não sejam uma peça necessária da stack, elas abstraem grande parte da complexidade de interagir diretamente com um nó do Ethereum. Elas também fornecem funções utilitárias (por exemplo, converter ETH para gwei) para que, como desenvolvedor, você possa gastar menos tempo lidando com as complexidades dos clientes Ethereum e mais tempo focado na funcionalidade específica do seu aplicativo.

## Nível 5: Aplicativos para o usuário final {#end-user-applications}

No nível superior da stack estão os aplicativos voltados para o usuário. Estes são os aplicativos padrão que você usa e constrói regularmente hoje: principalmente aplicativos da web e móveis.

A maneira como você desenvolve essas interfaces de usuário permanece essencialmente inalterada. Muitas vezes, os usuários não precisarão saber que o aplicativo que estão usando é construído usando uma blockchain.

## Pronto para escolher sua stack? {#ready-to-choose-your-stack}

Confira nosso guia para [configurar um ambiente de desenvolvimento local](/developers/local-environment/) para o seu aplicativo Ethereum.

## Leitura adicional {#further-reading}

- [A arquitetura de um aplicativo da Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-o!_