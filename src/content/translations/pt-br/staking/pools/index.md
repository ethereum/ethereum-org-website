---
title: Staking em pool (combinado)
description: Uma visão geral de como começar com pools de staking de ETH
lang: pt-br
template: staking
emoji: ":money_with_wings:"
image: ../../../../../assets/staking/leslie-pool.png
alt: Leslie, o rinoceronte, nadando na piscina
sidebarDepth: 2
summaryPoints:
  - Faça staking e ganhe recompensas com qualquer quantia de ETH unindo forças com outros
  - Pule a parte difícil e delegue a operação de validação a terceiros
  - Retenha tokens de liquidez na sua própria carteira
---

## O que são pools de staking? {#what-are-staking-pools}

As pools de staking são uma abordagem colaborativa para permitir que muitos com quantidades menores de ETH obtenham os 32 ETH necessários para ativar um conjunto de chaves de validador. A funcionalidade de pooling não é nativamente suportada no protocolo, então soluções foram construídas separadamente para resolver essa necessidade.

Alguns pools operam usando contratos inteligentes, onde os fundos podem ser depositados em um contrato, que gerencia e controla com necessidade mínima de confiança seu stake, e lhe emite um token que representa esse valor. Outros pools podem não envolver contratos inteligentes e, em vez disso, são mediadas fora da cadeia.

## Por que fazer staking com um pool? {#why-stake-with-a-pool}

Além dos benefícios delineados em nossa [introdução ao staking](/staking/), fazer stake em um pool traz alguns benefícios distintos.

<CardGrid>
  <Card title="Limite baixo para entrada" emoji="🐟">
    Não é uma baleia? Sem problemas. A maioria dos pools de staking permite você colocar em stake virtualmente qualquer quantidade de ETH unindo forças com outros participantes, ao contrário de fazer staking sozinho, que exige 32 ETH.
  </Card>
  <Card title="Faça staking hoje" emoji=":stopwatch:">
    Fazer staking em um pool é tão fácil como uma troca de tokens. Não precisa se preocupar com configuração de computadores e manutenção de nós. Os pools permitem que você deposite seus ETH, que permite que os operadores de nós executem os validadores. Recompensas são então distribuídas para os colaboradores, menos uma taxa para as operações do nó.
  </Card>
  <Card title="Tokens de liquidez" emoji=":droplet:">
    Muitaos pools de staking fornecem um token que representa uma reivindicação no seu ETH em stake e as recompensas que ele gera. Isso permite que você use seu ETH em stake, por exemplo, como garantia em aplicações DeFi.
  </Card>
</CardGrid>

<StakingComparison page="pools" />

## O que considerar {#what-to-consider}

Staking delegado ou em pools não é nativamente suportado pelo protocolo Ethereum, mas dada a demanda para que os usuários façam staking com menos de 32 ETH, um número crescente de soluções para servir esta demanda foram construídas.

Cada pool e as ferramentas ou contratos inteligentes que elas utilizam foram construídos por diferentes equipes, cada um com os seus próprios riscos e benefícios.

Os indicadores de atributo são usados abaixo para sinalizar notáveis pontos fortes ou fracos que um staking pool listado pode ter. Utilize esta seção como referência de como definimos estes atributos enquanto você está escolhendo participar de um pool.

<StakingConsiderations page="pools" />

## Explore pools de staking {#explore-staking-pools}

Há uma variedade de opções disponíveis para ajudá-lo na sua configuração. Use os indicadores acima para guiá-lo pelas ferramentas abaixo.

<InfoBanner emoji="⚠️" isWarning>
Observe a importância de escolher um serviço que leve a <a href="/developers/docs/nodes-and-clients/client-diversity/">diversidade de cliente</a> a sério, à medida que melhora a segurança da rede e limita o seu risco. Serviços que possuem evidências de limitar a maioria do uso do cliente são marcados como <em style="text-transform: uppercase;">"clientes diversos".</em>
</InfoBanner>

<StakingProductsCardGrid category="pools" />

Alguma sugestão de ferramenta de staking que não mencionamos? Confira nossa [política de listagem de produtos](/contributing/adding-staking-products/) para ver se a sugestão é pertinente, e envie para análise.

## Perguntas frequentes {#faq}

<ExpandableCard title="Como ganho recompensas?">
Geralmente, tokens de liquidez ERC-20 são emitidos para os stakers, que representam o valor de seus ETH em stake mais as recompensas. Lembre-se de que diferentes pools distribuirão recompensas de staking para seus usuários por meio de métodos minimamente diferentes, mas esse é o assunto comum.
</ExpandableCard>

<ExpandableCard title="Quando posso sacar meu stake?">

Atualmente, não é possível retirar fundos de um validador Ethereum, o que limita a capacidade de realmente _resgatar_ seu token de liquidez para recompensas ETH bloqueadas na camada de consenso.

Alternativamente, pools que utilizam um token de liquidez ERC-20 permitem que os usuários negociem este token no mercado aberto, permitindo que você venda sua posição de staking, efetivamente "retirando" sem remover ETH atualmente do contrato de participação.
</ExpandableCard>

<ExpandableCard title="Isso é diferente de fazer staking com minha exchange (corretora)?">
Existem muitas semelhanças entre essas opções de staking em pools agrupadas e trocas centralizadas, como a capacidade de fazer entrega de pequenas quantidades de ETH e fazê-los juntar para ativar validadores.

Ao contrário das trocas centralizadas, muitas outras opções de staking em pools usam contratos inteligentes e/ou tokens de liquidez, que normalmente são tokens ERC-20 que podem ser mantidos em sua própria carteira, comprados ou vendidos como qualquer outro token. Isso oferece uma camada de soberania e segurança, dando-lhe controle sobre seus tokens, mas ainda não lhe dá controle direto sobre o cliente validador atestando em seu nome em segundo plano.

Algumas opções de pooling são mais descentralizadas do que outras quando se trata dos nós que os sustentam. Para promover o bom funcionamento e a descentralização da rede, stakers (participantes) são sempre incentivados a selecionar um serviço de pool que permite um conjunto de operadores de nó sem permissão e descentralizado.
</ExpandableCard>

## Leitura adicional {#further-reading}

- [Fazendo stake com a Rocket Pool – Visão global de staking](https://docs.rocketpool.net/guides/staking/overview.html) - _Documentação do Rocket Pool_
- [Staking Ethereum com Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Documentação de ajuda Lido_
