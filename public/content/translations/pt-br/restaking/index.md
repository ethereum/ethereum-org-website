---
title: Restaking
metaTitle: "O que é restaking? | Benefícios e uso do restaking"
description: "Use ETH em stake para proteger outros serviços descentralizados e ganhar recompensas extras."
lang: pt-br
template: use-cases
image: /images/use-cases/restaking.png
alt: "Uma representação visual do restaking no Ethereum."
sidebarDepth: 2
summaryPoints:
  - "Use ETH em stake para proteger outros serviços descentralizados e ganhar recompensas extras."
buttons:
  - content: O que é restaking?
    toId: what-is-restaking
  - content: Como funciona?
    toId: how-does-restaking-work
    isSecondary: false
---

A rede Ethereum protege bilhões de dólares em valor 24 horas por dia, 7 dias por semana, 365 dias por ano. Como?

Pessoas de todo o mundo bloqueiam (ou fazem "stake" de) [ether (ETH)](/what-is-ether/) em contratos inteligentes para executar o software que processa as transações do Ethereum e protege a rede Ethereum. Em troca, elas são recompensadas com mais ETH.

O restaking é uma tecnologia desenvolvida para [stakers](/staking/) estenderem essa segurança a outros serviços, aplicativos ou redes. Em troca, eles ganham recompensas adicionais de restaking. No entanto, eles também colocam seu ETH em stake em maior risco.

**Restaking explicado em 18 minutos**

<VideoWatch slug="restaking-explained" />

## O que é restaking? {#what-is-restaking}

Restaking é quando os stakers usam seu ETH já em stake para proteger outros serviços descentralizados. Em troca, os restakers podem obter recompensas adicionais desses outros serviços, além de suas recompensas regulares de staking de ETH.

Os serviços descentralizados protegidos por restaking são conhecidos como "Serviços Validados Ativamente" (AVSs - Actively Validated Services).
Da mesma forma que muitos stakers de ETH executam software de validação do Ethereum, muitos restakers executam software especializado de AVS.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Bom saber</strong>
  <p className="mt-2">Embora "Serviços Validados Ativamente" (AVSs) seja o mais comum, diferentes plataformas de restaking podem usar outros nomes para os serviços descentralizados que ajudam a proteger, como "Serviços Validados Autonomamente", "Serviços Seguros Distribuídos" ou "Redes".</p>
</AlertDescription>
</AlertContent>
</Alert>

## Staking vs restaking {#staking-vs-restaking}

| Staking | Restaking |
| ------------------------------ | ------------------------------------------------- |
| Ganha recompensas em ETH | Ganha recompensas em ETH + recompensas de AVS |
| Protege a rede Ethereum | Protege a rede Ethereum + AVSs |
| Sem mínimo de ETH | Sem mínimo de ETH |
| Nível de risco baixo | Nível de risco de baixo a alto |
| O tempo de saque depende da fila | O tempo de saque depende da fila + período de desvinculação |

## Por que precisamos de restaking? {#why-do-we-need-restaking}

Imagine dois mundos; um com restaking e outro sem.

 <TabbedSection />

Neste mundo com restaking, tanto o AVS quanto o staker se beneficiam por poderem se encontrar e trocar segurança por recompensas extras.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Benefício adicional do restaking</strong>
  <p className="mt-2">Os AVSs podem concentrar todos os seus recursos na construção e no marketing de seus serviços, em vez de se distraírem com a descentralização e a segurança.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Como o restaking funciona? {#how-does-restaking-work}

Existem várias entidades envolvidas no restaking — cada uma delas desempenha um papel importante.

| **Termo** | **Descrição** |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Plataformas de restaking** | Uma plataforma de restaking é um serviço que conecta AVSs, stakers de ETH e operadores. Elas constroem aplicativos descentralizados para os stakers fazerem restaking de seu ETH, e mercados onde stakers, AVSs e operadores podem se encontrar. |
| **Restakers nativos** | Pessoas que fazem stake de seu ETH executando seus próprios validadores do Ethereum podem conectar seu ETH em stake a uma plataforma de restaking, incluindo a EigenLayer e outras, para ganhar recompensas de restaking além das recompensas do validador de ETH. |
| **Restakers líquidos** | Pessoas que fazem stake de seu ETH por meio de um provedor de staking líquido terceirizado, como Lido ou Rocket Pool, recebem tokens de staking líquido (LSTs) que representam seu ETH em stake. Elas podem fazer restaking desses LSTs para ganhar recompensas de restaking enquanto mantêm seu ETH original em stake. |
| **Operadores** | Os operadores executam o software de restaking dos AVSs, realizando as tarefas de validação que cada AVS exige. Os operadores geralmente são provedores de serviços profissionais que garantem coisas como tempo de atividade e desempenho. Assim como os restakers não operadores, os operadores usam ETH em stake para proteger os AVSs, mas os operadores também recebem recompensas extras em troca de seu trabalho. |
| **AVSs** | Estes são os serviços descentralizados — como oráculos de preços, pontes de tokens e sistemas de dados — que recebem segurança dos restakers e oferecem recompensas em tokens em troca. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Bom saber</strong>
  <p className="mt-2">Restakers nativos e líquidos frequentemente delegam seu ETH em stake a um operador, em vez de executarem eles mesmos o software para proteger os AVSs.</p>
  <p className="mt-2">Dessa forma, eles não precisam se preocupar com os complicados requisitos técnicos dos AVSs, embora recebam uma taxa de recompensa menor do que os operadores.</p>
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
 <p className="mt-0"><strong>Alerta de termo incorreto</strong>
  <p className="mt-2">Algumas pessoas confundem "restaking" com empréstimo de LSTs em finanças descentralizadas (DeFi). Ambos colocam o ETH em stake para trabalhar, mas restaking significa proteger AVSs, não apenas ganhar rendimento sobre LSTs.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Quanto posso ganhar com o restaking? {#how-much-can-i-make-from-restaking}

Embora os AVSs ofereçam taxas diferentes, os Tokens de Restaking Líquido (LRTs - Liquid Restaking Tokens) como o eETH dão uma ideia de quanto você pode ganhar. Da mesma forma que você obtém LSTs como o stETH por fazer staking do seu ETH, você pode obter LRTs como o eETH por fazer restaking do stETH. Esses tokens ganham recompensas de staking de ETH e de restaking.

**É importante reconhecer os riscos do restaking. As recompensas potenciais podem ser atraentes, mas não são isentas de riscos.**

## Quais são os riscos do restaking? {#what-are-the-risks-of-restaking}

| **Riscos** | **Descrição** |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Penalidades (ou "penalização")** | Assim como no staking de ETH, se os restakers/operadores ficarem offline, censurarem mensagens ou tentarem corromper a rede, seu stake pode sofrer penalização (ser queimado) parcial ou totalmente. |
| **Centralização** | Se poucos operadores dominarem a maior parte do restaking, eles poderão ter uma grande influência sobre os restakers, AVSs e até mesmo plataformas de restaking. |
| **Reações em cadeia** | Se um restaker sofrer penalização enquanto protege vários AVSs, isso pode diminuir a segurança dos outros AVSs, tornando-os vulneráveis. |
| **Acesso imediato aos fundos** | Há um tempo de espera (ou "período de desvinculação") para sacar o ETH em restaking, portanto, você pode não ter acesso imediato sempre. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>O cofundador do Ethereum está digitando…</strong>
  <p className="mt-2">
    Vitalik, o cofundador do Ethereum, alertou sobre os riscos potenciais do restaking em uma postagem de blog de 2021 chamada <a href="https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">Don't Overload Consensus.</a>

</AlertDescription>
</AlertContent>
</Alert>

## Como começar com o restaking? {#how-to-get-started-with-restaking}

| 🫡 Iniciantes | 🤓 Usuários avançados |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1. Faça stake de ETH em plataformas como Lido ou Rocket Pool para obter LSTs. | 1. Faça stake do seu ETH como um validador no Ethereum. |
| 2. Use esses LSTs para começar a fazer restaking em um serviço de restaking. | 2. Compare serviços de restaking como EigenLayer, Symbiotic e outros. |
| | 3. Siga as instruções para conectar seu validador ao contrato inteligente de restaking. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Staking de Ethereum:</strong> Como funciona?
  <ButtonLink href="/staking/">
    Saiba mais
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## Avançado {#advanced}

<VideoWatch slug="eigenlayer-permissionless-features" />

## Leitura adicional {#further-reading}

1. [ethereum.org - Guia de staking de ETH](/staking/)
2. [Ledger Academy - O que é o restaking de Ethereum?](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [ConsenSys - EigenLayer: Protocolo de restaking descentralizado do Ethereum explicado](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [Vitalik Buterin - Não sobrecarregue o consenso do Ethereum](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - O que é EigenLayer? O protocolo de restaking do Ethereum explicado](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer: Adição de recursos não permissionados ao Ethereum com Sreeram Kannan](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - EigenLayer explicado: O que é restaking?](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - Painel de dados de restaking](https://www.theblock.co/data/decentralized-finance/restaking)