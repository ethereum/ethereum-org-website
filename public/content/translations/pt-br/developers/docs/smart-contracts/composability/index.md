---
title: Composabilidade de contratos inteligentes
description: Aprenda como contratos inteligentes podem ser combinados como blocos de Lego para construir dapps complexos reutilizando componentes existentes.
lang: pt-br
incomplete: true
---

## Uma breve introdução {#a-brief-introduction}

Os contratos inteligentes são públicos no Ethereum e podem ser considerados como APIs abertas. Você não precisa escrever seu próprio contrato inteligente para se tornar um desenvolvedor de aplicativos descentralizados (dapps), você só precisa saber como interagir com eles. Por exemplo, você pode usar os contratos inteligentes existentes do [Uniswap](https://uniswap.exchange/swap), uma corretora descentralizada, para lidar com toda a lógica de troca de tokens no seu aplicativo – você não precisa começar do zero. Confira alguns de seus contratos [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) e [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts).

## O que é composabilidade? {#what-is-composability}

Composabilidade é a combinação de componentes distintos para criar novos sistemas ou resultados. No desenvolvimento de software, composabilidade significa que os desenvolvedores podem reutilizar componentes de software existentes para construir novos aplicativos. Uma boa maneira de entender a composabilidade é pensar em elementos compuníveis como blocos de Lego. Cada Lego pode ser combinado com outro, permitindo que você construa estruturas complexas combinando diferentes Legos.

No Ethereum, cada contrato inteligente é uma espécie de Lego — você pode usar contratos inteligentes de outros projetos como blocos de construção para o seu projeto. Isso significa que você não precisa perder tempo reinventando a roda ou construindo do zero.

## Como a composabilidade funciona? {#how-does-composability-work}

Os contratos inteligentes do Ethereum são como APIs públicas, então qualquer pessoa pode interagir com o contrato ou integrá-los em dapps para adicionar funcionalidades. A composabilidade de contratos inteligentes geralmente funciona com base em três princípios: modularidade, autonomia e descoberta:

**1. Modularidade**: Esta é a capacidade de componentes individuais executarem uma tarefa específica. No Ethereum, cada contrato inteligente tem um caso de uso específico (como mostrado no exemplo do Uniswap).

**2. Autonomia**: Componentes compuníveis devem ser capazes de operar de forma independente. Cada contrato inteligente no Ethereum é autoexecutável e pode funcionar sem depender de outras partes do sistema.

**3. Descoberta**: Os desenvolvedores não podem chamar contratos externos ou integrar bibliotecas de software em aplicativos se os primeiros não estiverem disponíveis publicamente. Por design, os contratos inteligentes são de código aberto; qualquer pessoa pode chamar um contrato inteligente ou fazer uma bifurcação (fork) de uma base de código.

## Benefícios da composabilidade {#benefits-of-composability}

### Ciclo de desenvolvimento mais curto {#shorter-development-cycle}

A composabilidade reduz o trabalho que os desenvolvedores têm ao criar [dapps](/apps/#what-are-dapps). [Como diz Naval Ravikant:](https://twitter.com/naval/status/1444366754650656770) "Código aberto significa que cada problema só precisa ser resolvido uma vez."

Se houver um contrato inteligente que resolva um problema, outros desenvolvedores poderão reutilizá-lo, para que não precisem resolver o mesmo problema. Dessa forma, os desenvolvedores podem pegar bibliotecas de software existentes e adicionar funcionalidades extras para criar novos dapps.

### Maior inovação {#greater-innovation}

A composabilidade incentiva a inovação e a experimentação porque os desenvolvedores são livres para reutilizar, modificar, duplicar ou integrar código de código aberto para criar os resultados desejados. Como resultado, as equipes de desenvolvimento gastam menos tempo em funcionalidades básicas e podem alocar mais tempo experimentando novos recursos.

### Melhor experiência do usuário {#better-user-experience}

A interoperabilidade entre os componentes do ecossistema Ethereum melhora a experiência do usuário. Os usuários podem acessar mais funcionalidades quando os dapps integram contratos inteligentes externos do que em um ecossistema fragmentado onde os aplicativos não podem se comunicar.

Usaremos um exemplo de negociação de arbitragem para ilustrar os benefícios da interoperabilidade:

Se um token estiver sendo negociado a um valor mais alto na `exchange A` do que na `exchange B`, você pode aproveitar a diferença de preço para obter lucro. No entanto, você só pode fazer isso se tiver capital suficiente para financiar a transação (ou seja, comprar o token na `exchange B` e vendê-lo na `exchange A`).

Em um cenário onde você não tem fundos suficientes para cobrir a negociação, um empréstimo relâmpago pode ser o ideal. Os [empréstimos relâmpago](/defi/#flash-loans) são altamente técnicos, mas a ideia básica é que você pode pegar ativos emprestados (sem colateral) e devolvê-los na _mesma_ transação.

Voltando ao nosso exemplo inicial, um negociador de arbitragem pode fazer um grande empréstimo relâmpago, comprar tokens na `exchange B`, vendê-los na `exchange A`, pagar o capital + juros e ficar com o lucro, tudo na mesma transação. Essa lógica complexa requer a combinação de chamadas para vários contratos, o que não seria possível se os contratos inteligentes não tivessem interoperabilidade.

## Exemplos de composabilidade no Ethereum {#composability-in-ethereum}

### Trocas de tokens {#token-swaps}

Se você criar um dapp que exija que as transações sejam pagas em ETH, você pode permitir que os usuários paguem em outros tokens ERC-20 integrando a lógica de troca de tokens. O código converterá automaticamente o token do usuário em ETH antes que o contrato execute a função chamada.

### Governança {#governance}

Construir sistemas de governança sob medida para uma [DAO](/dao/) pode ser caro e demorado. Em vez disso, você pode usar um kit de ferramentas de governança de código aberto, como o [Aragon Client](https://client.aragon.org/), para iniciar sua DAO e criar rapidamente uma estrutura de governança.

### Gerenciamento de identidade {#identity-management}

Em vez de construir um sistema de autenticação personalizado ou depender de provedores centralizados, você pode integrar ferramentas de identidade descentralizada (DID) para gerenciar a autenticação dos usuários. Um exemplo é o [SpruceID](https://www.spruceid.com/), um kit de ferramentas de código aberto que oferece a funcionalidade "Sign in with Ethereum" (Entrar com Ethereum), que permite aos usuários autenticar identidades com uma carteira Ethereum.

## Tutoriais relacionados {#related-tutorials}

- [Dê o pontapé inicial no desenvolvimento do frontend do seu dapp com o create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Uma visão geral de como usar o create-eth-app para criar aplicativos com contratos inteligentes populares prontos para uso._

## Leitura adicional {#further-reading}

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-o!_

- [Composabilidade é Inovação](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [Por que a Composabilidade é Importante para a Web3](https://hackernoon.com/why-composability-matters-for-web3)
- [O que é Composabilidade?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)