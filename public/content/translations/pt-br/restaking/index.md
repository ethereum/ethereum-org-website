---
title: Restaking
metaTitle: "O que é restaking? | Benefícios e uso de restaking"
description: "Use ETH em stake para proteger outros serviços descentralizados e ganhar recompensas extras."
lang: pt-br
template: use-cases
emoji: ":recycle:"
image: /images/use-cases/restaking.png

  /images/use-cases/prediction-markets.png
alt: "Uma representação visual do restaking na Ethereum."
sidebarDepth: 2
summaryPoint1: "Use ETH em stake para proteger outros serviços descentralizados e ganhar recompensas extras."
buttons:
  - content: O que é restaking?
    toId: o-que-e-restaking
  - content: Como isso funciona?
    toId: como-o-restaking-funciona
    isSecondary: false
---

A rede Ethereum protege bilhões de dólares em valor 24/7, 365 dias por ano. Como?

Pessoas do mundo todo bloqueiam (ou fazem “stake”) de [ether (ETH)](/eth/) em contratos inteligentes para executar o software que processa as transações da Ethereum e protege a rede Ethereum. Em troca, eles são recompensados com mais ETH.

Restaking é uma tecnologia criada para que os [stakers](/staking/) estendam essa segurança a outros serviços, aplicativos ou redes. Em troca, eles ganham recompensas de restaking adicionais. No entanto, eles também colocam seu ETH em stake em maior risco.

**Restaking explicado em 18 minutos**

<YouTube id="rOJo7VwPh7I" />

## O que é restaking? {#what-is-restaking}

Restaking é quando os stakers usam seu ETH já em stake para proteger outros serviços descentralizados. Em troca, os restakers podem obter recompensas adicionais desses outros serviços, além de suas recompensas regulares de staking de ETH.

Os serviços descentralizados protegidos por restaking são conhecidos como "Actively Validated Services" (AVSs).
Da mesma forma que muitos stakers de ETH executam software de validação da Ethereum, muitos restakers executam software AVS especializado.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Bom saber</strong></p>
  <p className="mt-2">Embora "Actively Validated Services" (AVSs) seja o mais comum, diferentes plataformas de restaking podem usar outros nomes para os serviços descentralizados que ajudam a proteger, como "Autonomously Validated Services", "Distributed Secure Services" ou "Networks".</p>
</AlertDescription>
</AlertContent>
</Alert>

## Staking vs. restaking {#staking-vs-restaking}

| Staking (participação) | Restaking                                               |
| ----------------------------------------- | ------------------------------------------------------- |
| Ganhe recompensas de ETH                  | Ganhe recompensas de ETH + recompensas de AVS           |
| Protege a rede Ethereum                   | Protege a rede Ethereum + AVSs                          |
| Sem ETH mínimo                            | Sem ETH mínimo                                          |
| Baixo nível de risco                      | Nível de risco de baixo a alto                          |
| O tempo de saque depende da fila          | O tempo de saque depende da fila + período de unbonding |

## Por que precisamos de restaking? {#why-do-we-need-restaking}

Imagine dois mundos: um com restaking e outro sem.

 <TabbedSection />

Nesse mundo com restaking, tanto o AVS quanto o staker se beneficiam por poderem se encontrar e trocar segurança por recompensas extras.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Benefício adicional do restaking</strong></p>
  <p className="mt-2">Os AVSs podem dedicar todos os seus recursos para construir e comercializar seus serviços, em vez de se distraírem com a descentralização e a segurança.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Como o restaking funciona? {#how-does-restaking-work}

Existem várias entidades envolvidas no restaking — cada uma delas desempenha um papel importante.

| **Termo**                    | **Descrição**                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Plataformas de restaking** | Uma plataforma de restaking é um serviço que conecta AVSs, stakers de ETH e operadores. Elas constroem aplicativos descentralizados para que os stakers façam o restake de seu ETH e marketplaces onde stakers, AVSs e operadores podem se encontrar.                                                                                                                                                                              |
| **Restakers nativos**        | Pessoas que fazem stake de seu ETH executando seus próprios validadores da Ethereum podem conectar seu ETH em stake a uma plataforma de restaking, incluindo EigenLayer e outras, para ganhar recompensas de restaking além das recompensas de validador de ETH.                                                                                                                                                                                   |
|                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Restakers líquidos**       | As pessoas que fazem stake de seu ETH por meio de um provedor terceirizado de staking líquido, como Lido ou Rocket Pool, recebem Liquid Staking Tokens (LSTs) que representam seu ETH em stake. Eles podem fazer o restake desses LSTs para ganhar recompensas de restaking enquanto mantêm seu ETH original em stake.                                                                                          |
|                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Operadores**               | Os operadores executam o software de restaking dos AVSs, realizando as tarefas de validação que cada AVS exige. Os operadores geralmente são provedores de serviços profissionais que garantem coisas como tempo de atividade e desempenho. Assim como os restakers que não são operadores, os operadores usam ETH em stake para proteger os AVSs, mas também recebem recompensas extras em troca de seu trabalho. |
|                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **AVSs**                     | Esses são os serviços descentralizados — como oráculos de preços, pontes de tokens e sistemas de dados — que recebem segurança dos restakers e oferecem recompensas em tokens em troca.                                                                                                                                                                                                                                                            |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Bom saber</strong></p>
  <p className="mt-2">Restakers nativos e líquidos geralmente delegam seu ETH em stake a um operador, em vez de executarem eles mesmos o software para proteger os AVSs.</p>
  <p className="mt-2">Dessa forma, eles não precisam se preocupar com requisitos técnicos complicados dos AVSs, embora recebam uma taxa de recompensa menor do que os operadores.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Quais são alguns exemplos de restaking? {#what-are-some-examples-of-restaking}

Embora seja uma ideia nova, alguns projetos surgiram para explorar as possibilidades do restaking.

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Alerta de termo impróprio</strong></p>
  <p className="mt-2">Algumas pessoas confundem "restaking" com o empréstimo e a tomada de empréstimo de LSTs em DeFi. Ambos colocam o ETH em stake para trabalhar, mas restaking significa proteger AVSs, não apenas obter rendimento com LSTs.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Quanto posso ganhar com o restaking? {#how-much-can-i-make-from-restaking}

Embora os AVSs ofereçam taxas diferentes, os Liquid Restaking Tokens (LRTs) como o eETH dão uma ideia de quanto você pode ganhar. Da mesma forma que você obtém LSTs como o stETH por fazer stake do seu ETH, você pode obter LRTs como o eETH por fazer restake do stETH. Esses tokens ganham recompensas de staking de ETH e de restaking.

**É importante reconhecer os riscos do restaking. As recompensas potenciais podem ser atraentes, mas não são isentas de riscos.**

## Quais são os riscos do restaking? {#what-are-the-risks-of-restaking}

| **Riscos**                                        | **Descrição**                                                                                                                                                                                                                 |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Penalidades (ou “remoção”)** | Assim como no staking de ETH, se os restakers/operadores ficarem offline, censurarem mensagens ou tentarem corromper a rede, seu stake pode ser removido (queimado) parcial ou totalmente. |
| **Centralização**                                 | Se poucos operadores dominarem a maior parte do restaking, eles poderiam ter uma grande influência sobre os restakers, AVSs e até mesmo sobre as plataformas de restaking.                                    |
| **Reações em cadeia**                             | Se um restaker sofrer remoção enquanto protege vários AVSs, isso poderia diminuir a segurança dos outros AVSs, tornando-os vulneráveis.                                                                       |
| **Acesso imediato aos fundos**                    | Há um tempo de espera (ou “período de unbonding”) para sacar o ETH em restake, portanto, você pode não ter acesso imediato sempre.                                                         |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>O cofundador do Ethereum está digitando…</strong></p>
  <p className="mt-2">
    Vitalik, o cofundador do Ethereum, alertou sobre os riscos potenciais do restaking em uma postagem de blog de 2021 chamada <a href="https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">Don't Overload Consensus.</a>
</p>
</AlertDescription>
</AlertContent>
</Alert>

## Como começar com o restaking? {#how-to-get-started-with-restaking}

| 🫡 Principiantes                                                                                                     | 🤓 Usuários avançados                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 1. Faça stake de ETH em plataformas como Lido ou Rocket Pool para obter LSTs. | 1. Faça stake do seu ETH como um validador na Ethereum.                                 |
| 2. Use esses LSTs para começar a fazer restake em um serviço de restaking.    | 2. Compare serviços de restaking como EigenLayer, Symbiotic e outros.                   |
|                                                                                                                      | 3. Siga as instruções para conectar seu validador ao contrato inteligente de restaking. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Staking de Ethereum:</strong> como funciona?</p>
  <ButtonLink href="/staking/">
    Saiba mais
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## Avançado {#advanced}

<YouTube id="-V-fG4J1N_M" />

## Leitura adicional {#further-reading}

1. [ethereum.org - guia de staking de ETH](https://ethereum.org/en/staking/)
2. [Ledger Academy - O que é o Restaking de Ethereum?](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [Consensys - EigenLayer: protocolo descentralizado de Restaking da Ethereum explicado](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [Vitalik Buterin - Don't overload Ethereum's consensus](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - O que é a EigenLayer? Protocolo de restaking da Ethereum explicado](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer: Permissionless Feature Addition to Ethereum with Sreeram Kannan](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - EigenLayer Explicado: O que é Restaking?](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - Painel de Dados de Restaking](https://www.theblock.co/data/decentralized-finance/restaking)
