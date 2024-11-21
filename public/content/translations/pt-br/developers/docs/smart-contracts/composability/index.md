---
title: Composição de contrato inteligente
description:
lang: pt-br
incomplete: true
---

## Uma breve introdução {#a-brief-introduction}

Os contratos inteligentes são públicos na Ethereum e podem ser considerados como APIs abertas. Você não precisa escrever o seu próprio contrato inteligente para se tornar um desenvolvedor dapp, você só precisa saber como interagir com eles. Por exemplo, você pode usar os contratos inteligentes existentes do [Uniswap](https://uniswap.exchange/swap), uma troca descentralizada, para lidar com toda a lógica de troca de token em seu aplicativo - você não precisa começar do zero. Confira alguns de seus contratos [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) e [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts).

## O que é composabilidade? {#what-is-composability}

Composabilidade é combinar componentes distintos para criar novos sistemas ou saídas. No desenvolvimento de software, a composabilidade significa que os desenvolvedores podem reutilizar os componentes de software existentes para criar novos aplicativos. Uma boa maneira de entender a composabilidade é pensar em elementos componíveis como blocos de Lego. Cada Lego pode ser combinado com outro, permitindo que você construa estruturas complexas combinando diferentes Legos.

Na Ethereum, todo contrato inteligente é uma espécie de Lego – você pode usar contratos inteligentes de outros projetos como blocos de construção para seu projeto. Isso significa que você não precisa perder tempo reinventando a roda ou construindo do zero.

## Como funciona a composabilidade? {#how-does-composability-work}

Os contratos inteligentes Ethereum são como APIs públicas, para que qualquer pessoa possa interagir com o contrato ou integrá-los em dapps para funcionalidade adicional. A composição de contrato inteligente geralmente funciona com três princípios: modularidade, autonomia e descoberta:

**1. Modularidade**: Esta é a capacidade de componentes individuais para executar uma tarefa específica. Na Ethereum, cada contrato inteligente tem um caso de uso específico (como mostrado no exemplo Uniswap).

**2. Autonomia**: Componentes compostos devem ser capazes de operar independentemente. Cada contrato inteligente na Ethereum é autoexecutável e pode funcionar sem depender de outras partes do sistema.

**3. Capacidade de descoberta**: Desenvolvedores não podem chamar contratos externos ou integrar bibliotecas de software em aplicativos, se o primeiro não estiver disponível publicamente. Por concepção, os contratos inteligentes são de código aberto; qualquer um pode chamar um contrato inteligente ou copiar uma base de código.

## Benefícios da composabilidade {#benefits-of-composability}

### Ciclo de desenvolvimento curto {#shorter-development-cycle}

A composabilidade reduz o trabalho que os desenvolvedores têm de fazer ao criar [dapps](/dapps/#what-are-dapps). [Como Naval Ravikant coloca:](https://twitter.com/naval/status/1444366754650656770) "O código aberto significa que todo problema deve ser resolvido uma vez."

Se houver um contrato inteligente que resolva um problema, outros desenvolvedores podem reutilizá-lo, para que não precisem resolver o mesmo problema. Dessa forma, os desenvolvedores podem usar bibliotecas de software existentes e adicionar funcionalidades extras para criar novos dapps.

### Maior inovação {#greater-innovation}

A composabilidade incentiva a inovação e a experimentação porque os desenvolvedores são livres para reusar, modificar, duplicar ou integrar código-fonte aberto para criar os resultados desejados. Como resultado, as equipes de desenvolvimento gastam menos tempo em funcionalidades básicas e podem alocar mais tempo experimentando novos recursos.

### Melhor experiência do usuário {#better-user-experience}

A interoperabilidade entre os componentes do ecossistema Ethereum melhora a experiência do usuário. Os usuários podem acessar maiores funcionalidades quando os dapps integram contratos inteligentes externos do que em um ecossistema fragmentado onde os aplicativos não podem se comunicar.

Usaremos um exemplo de negociação de arbitragem para ilustrar os benefícios da interoperabilidade:

Se um token estiver sendo negociado mais alto na `troca A` do que na `troca B`, você pode aproveitar a diferença de preço para obter lucro. No entanto, você só pode fazer isso se tiver capital suficiente para financiar a transação (ou seja, comprar o token da `troca B` e vendê-lo na `troca A`).

Em um cenário em que você não tem fundos suficientes para cobrir a negociação, um empréstimo rápido pode ser o ideal. Os [empréstimos relâmpagos](/defi/#flash-loans) são altamente técnicos, mas a ideia básica é que você pode emprestar ativos (sem garantias) e devolvê-los dentro de *uma* transação.

Voltando ao nosso exemplo inicial, um trader de arbitragem pode fazer um grande empréstimo relâmpago, comprar tokens da `troca B`, vendê-los na `troca A`, pagar o capital + juros, e manter o lucro, dentro da mesma transação. Essa lógica complexa requer a combinação de chamadas para vários contratos, o que não seria possível se os contratos inteligentes não tivessem interoperabilidade.

## Exemplos de composabilidade na Ethereum {#composability-in-ethereum}

### Trocas de tokens {#token-swaps}

Se você criar um dapp que exige que as transações sejam pagas em ETH, você pode permitir que os usuários paguem em outros tokens ERC-20 integrando a lógica de troca de token. O código converterá automaticamente o token do usuário em ETH antes que o contrato execute a função chamada.

### Governança {#governance}

Construir sistemas de governança sob medida para um [DAO](/dao/) pode ser caro e demorado. Em vez disso, você pode usar um kit de ferramentas de governança de código aberto, como [Aragon Client](https://client.aragon.org/), para inicializar seu DAO e criar rapidamente um framework de governança.

### Gerenciamento de identidade {#identity-management}

Em vez de criar um sistema de autenticação personalizado ou depender de provedores centralizados, você pode integrar ferramentas de identidade descentralizada (DID) para gerenciar a autenticação de usuários. Um exemplo é o [SpruceID](https://www.spruceid.com/), um kit de ferramentas de código aberto que oferece uma funcionalidade "Entrar com Ethereum" que permite aos usuários autenticar identidades com uma carteira Ethereum.

## Tutoriais relacionados {#related-tutorials}

- [Comece seu desenvolvimento de front-end dapp com create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Uma visão geral de como usar o create-eth-app para criar apps com contratos inteligentes populares prontos para uso._

## Leitura adicional {#further-reading}

_Conhece algum recurso da comunidade que o ajudou? Edite essa página e adicione!_

- [Composição é Inovação](https://future.a16z.com/how-composability-unlocks-crypto-and-everything-else/)
- [Porque a Composabilidade é importante para a Web3](https://hackernoon.com/why-composability-matters-for-web3)
- [O que é Composabilidade?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)
