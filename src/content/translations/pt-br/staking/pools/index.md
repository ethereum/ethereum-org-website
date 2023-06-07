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
  <Card title="Limite baixo para entrada" emoji="🐟" description="Not a whale? No problem. Most staking pools let you stake virtually any amount of ETH by joining forces with other stakers, unlike staking solo which requires 32 ETH." />
  <Card title="Faça staking hoje" emoji=":stopwatch:" description="Staking with a pool is as easy as a token swap. No need to worry about hardware setup and node maintenance. Pools allow you to deposit your ETH which enables node operators to run validators. Rewards are then distributed to contributors minus a fee for node operations." />
  <Card title="Tokens de liquidez" emoji=":droplet:" description="Many staking pools provide a token that represents a claim on your staked ETH and the rewards it generates. This allows you to make use of your staked ETH, e.g. as collateral in DeFi applications." />
</CardGrid>

<StakingComparison page="pools" />

## O que considerar {#what-to-consider}

Staking delegado ou em pools não é nativamente suportado pelo protocolo Ethereum, mas dada a demanda para que os usuários façam staking com menos de 32 ETH, um número crescente de soluções para servir esta demanda foram construídas.

Cada pool, assim como as ferramentas ou contratos inteligentes que eles usam, foram construídos por diferentes times, e cada um tem seus benefícios e riscos. Os pools permitem que os usuários troquem ETH por um token representativo do ETH em depósito. O token é conhecido como um "derivativo líquido em depósito"; isso é útil porque permite que os usuários troquem qualquer quantidade de ETH por uma quantidade equivalente de tokens com rendimento-produtivo, os quais geram retorno a partir dos prêmios do depósito aplicado ao ETH subjacente (e vice-versa) em câmbios descentralizados, mesmo que o ETH real esteja depositado na Beacon Chain. Isso significa que a troca de um produto ETH com rendimento em participação e “ETH bruto” é rápido, fácil e não apenas disponível em múltiplos de 32 ETH.

No entanto, esses derivativos líquidos em depósitos tendem a criar comportamentos semelhantes a cartéis, nos quais uma grande quantidade de ETH depositado acaba sob o controle de algumas organizações centralizadas, ao invés de se espalhar por muitos indivíduos independentes. Isso cria condições para censura ou extração de valor. O padrão ouro para participação deveria sempre ser indivíduos executando validadores em seu próprio hardware sempre que possível.

[Mais sobre os riscos de tokens em participação](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

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
Agora mesmo! A atualização da rede Shanghai/Capella ocorreu em abril de 2023 e introduziu saques de staking. As contas dos validadores que dão suporte aos pools de staking agora têm a capacidade de sair e sacar ETH para o endereço de saque designado. Isso permite resgatar sua parte do stake para o ETH subjacente. Verifique com o seu provedor para ver como eles dão suporte a essa funcionalidade.

Alternativamente, pools que utilizam um token de liquidez ERC-20 permitem que os usuários negociem este token no mercado aberto, permitindo que você venda sua posição de staking, efetivamente "retirando" sem remover ETH atualmente do contrato de participação.

<ButtonLink to="/staking/withdrawals/">Mais sobre retirada de participação</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Isso é diferente de fazer staking com minha exchange (corretora)?">
Existem muitas semelhanças entre essas opções de staking em pools agrupadas e trocas centralizadas, como a capacidade de fazer entrega de pequenas quantidades de ETH e fazê-los juntar para ativar validadores.

Ao contrário das trocas centralizadas, muitas outras opções de staking em pools usam contratos inteligentes e/ou tokens de liquidez, que normalmente são tokens ERC-20 que podem ser mantidos em sua própria carteira, comprados ou vendidos como qualquer outro token. Isso oferece uma camada de soberania e segurança, dando-lhe controle sobre seus tokens, mas ainda não lhe dá controle direto sobre o cliente validador atestando em seu nome em segundo plano.

Algumas opções de pooling são mais descentralizadas do que outras quando se trata dos nós que os sustentam. Para promover a saúde e a descentralização da rede, os participantes são sempre encorajados a selecionar um serviço de pooling (compartilhamento) que ofereça um conjunto descentralizado de operadores de nós sem permissão.
</ExpandableCard>

## Leitura adicional {#further-reading}

- [Fazendo stake com a Rocket Pool – Visão global de staking](https://docs.rocketpool.net/guides/staking/overview.html) - _Documentação do Rocket Pool_
- [Staking Ethereum com Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Documentação de ajuda Lido_
