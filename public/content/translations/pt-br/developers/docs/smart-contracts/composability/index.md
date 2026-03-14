---
title: "Composição de contrato inteligente"
description: Aprenda como os contratos inteligentes podem ser combinados como blocos de Lego para construir dapps complexos reutilizando componentes existentes.
lang: pt-br
incomplete: true
---

## Uma breve introdução {#a-brief-introduction}

Os contratos inteligentes são públicos na Ethereum e podem ser considerados como APIs abertas. Você não precisa escrever o seu próprio contrato inteligente para se tornar um desenvolvedor dapp, você só precisa saber como interagir com eles. Por exemplo, você pode usar os contratos inteligentes existentes da [Uniswap](https://uniswap.exchange/swap), uma corretora descentralizada, para lidar com toda a lógica de troca de token em seu aplicativo – você não precisa começar do zero. Confira alguns de seus contratos [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) e [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts).

## O que é composabilidade? {#what-is-composability}

Composabilidade é combinar componentes distintos para criar novos sistemas ou saídas. No desenvolvimento de software, a composabilidade significa que os desenvolvedores podem reutilizar os componentes de software existentes para criar novos aplicativos. Uma boa maneira de entender a composabilidade é pensar em elementos componíveis como blocos de Lego. Cada Lego pode ser combinado com outro, permitindo que você construa estruturas complexas combinando diferentes Legos.

Na Ethereum, todo contrato inteligente é uma espécie de Lego – você pode usar contratos inteligentes de outros projetos como blocos de construção para seu projeto. Isso significa que você não precisa perder tempo reinventando a roda ou construindo do zero.

## Como funciona a composabilidade? {#how-does-composability-work}

Os contratos inteligentes Ethereum são como APIs públicas, para que qualquer pessoa possa interagir com o contrato ou integrá-los em dapps para funcionalidade adicional. A composição de contrato inteligente geralmente funciona com três princípios: modularidade, autonomia e descoberta:

\*\*1. **Modularidade**: Esta é a capacidade de componentes individuais de realizar uma tarefa específica. Na Ethereum, cada contrato inteligente tem um caso de uso específico (como mostrado no exemplo Uniswap).

\*\*2. **Autonomia**: Componentes componíveis devem ser capazes de operar de forma independente. Cada contrato inteligente na Ethereum é autoexecutável e pode funcionar sem depender de outras partes do sistema.

\*\*3. **Capacidade de descoberta**: Desenvolvedores não podem chamar contratos externos ou integrar bibliotecas de software em aplicativos se os primeiros não estiverem disponíveis publicamente. Por concepção, os contratos inteligentes são de código aberto; qualquer um pode chamar um contrato inteligente ou copiar uma base de código.

## Benefícios da componibilidade {#benefits-of-composability}

### Ciclo de desenvolvimento mais curto {#shorter-development-cycle}

A componibilidade reduz o trabalho que os desenvolvedores precisam fazer ao criar [dapps](/apps/#what-are-dapps). [Como diz Naval Ravikant:](https://twitter.com/naval/status/1444366754650656770) "Código aberto significa que cada problema precisa ser resolvido apenas uma vez."

Se houver um contrato inteligente que resolva um problema, outros desenvolvedores podem reutilizá-lo, para que não precisem resolver o mesmo problema. Dessa forma, os desenvolvedores podem usar bibliotecas de software existentes e adicionar funcionalidades extras para criar novos dapps.

### Maior inovação {#greater-innovation}

A composabilidade incentiva a inovação e a experimentação porque os desenvolvedores são livres para reusar, modificar, duplicar ou integrar código-fonte aberto para criar os resultados desejados. Como resultado, as equipes de desenvolvimento gastam menos tempo em funcionalidades básicas e podem alocar mais tempo experimentando novos recursos.

### Melhor experiência do usuário {#better-user-experience}

A interoperabilidade entre os componentes do ecossistema Ethereum melhora a experiência do usuário. Os usuários podem acessar maiores funcionalidades quando os dapps integram contratos inteligentes externos do que em um ecossistema fragmentado onde os aplicativos não podem se comunicar.

Usaremos um exemplo de negociação de arbitragem para ilustrar os benefícios da interoperabilidade:

Se um token está sendo negociado a um preço mais alto na `corretora A` do que na `corretora B`, você pode aproveitar a diferença de preço para obter lucro. No entanto, você só pode fazer isso se tiver capital suficiente para financiar a transação (ou seja, comprar o token da `corretora B` e vendê-lo na `corretora A`).

Em um cenário em que você não tem fundos suficientes para cobrir a negociação, um empréstimo rápido pode ser o ideal. [Empréstimos-relâmpago](/defi/#flash-loans) são altamente técnicos, mas a ideia básica é que você pode tomar ativos emprestados (sem colateral) e devolvê-los dentro de _uma_ única transação.

Voltando ao nosso exemplo inicial, um trader de arbitragem pode fazer um grande empréstimo-relâmpago, comprar tokens da `corretora B`, vendê-los na `corretora A`, pagar o capital + juros e ficar com o lucro, tudo na mesma transação. Essa lógica complexa requer a combinação de chamadas para vários contratos, o que não seria possível se os contratos inteligentes não tivessem interoperabilidade.

## Exemplos de componibilidade na Ethereum {#composability-in-ethereum}

### Trocas de tokens {#token-swaps}

Se você criar um dapp que exige que as transações sejam pagas em ETH, você pode permitir que os usuários paguem em outros tokens ERC-20 integrando a lógica de troca de token. O código converterá automaticamente o token do usuário em ETH antes que o contrato execute a função chamada.

### Governança {#governance}

Construir sistemas de governança personalizados para uma [DAO](/dao/) pode ser caro e demorado. Em vez disso, você pode usar um kit de ferramentas de governança de código aberto, como o [Aragon Client](https://client.aragon.org/), para inicializar sua DAO e criar rapidamente uma estrutura de governança.

### Gerenciamento de identidade {#identity-management}

Em vez de criar um sistema de autenticação personalizado ou depender de provedores centralizados, você pode integrar ferramentas de identidade descentralizada (DID) para gerenciar a autenticação de usuários. Um exemplo é o [SpruceID](https://www.spruceid.com/), um kit de ferramentas de código aberto que oferece a funcionalidade "Sign in with Ethereum", que permite que os usuários autentiquem identidades com uma carteira Ethereum.

## Tutoriais relacionados {#related-tutorials}

- [Dê um pontapé inicial no desenvolvimento de frontend do seu dapp com o create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Uma visão geral de como usar o create-eth-app para criar aplicativos com contratos inteligentes populares prontos para uso._

## Leitura adicional {#further-reading}

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-a!_

- [Componibilidade é Inovação](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [Por que a componibilidade é importante para a Web3](https://hackernoon.com/why-composability-matters-for-web3)
- [O que é componibilidade?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)
