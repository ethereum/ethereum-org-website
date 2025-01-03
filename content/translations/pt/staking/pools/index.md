---
title: Participação agrupada
description: Uma visão global de como começar a utilizar o staking de ETH em pool
lang: pt
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: Leslie, o rinoceronte, a nadar na piscina.
sidebarDepth: 2
summaryPoints:
  - Participe e ganhe recompensas com qualquer quantidade de ETH unindo forças com outros
  - Salte a parte mais complicada e confiar o funcionamento do validador a um terceiro
  - Mantenha os tokens de staking na sua carteira pessoal
---

## O que são pools de staking (apostas)? {#what-are-staking-pools}

As staking pools são uma abordagem colaborativa para permitir que muitos com pequenas quantidades de ETH obtenham as 32 ETH necessárias para ativar um conjunto de chaves de validação. A funcionalidade de pooling não é suportada nativamente pelo protocolo, pelo que foram criadas soluções separadamente para responder a esta necessidade.

Algumas pools funcionam com contratos inteligentes, em que os fundos podem ser depositados num contrato, que gere e acompanha a sua participação de forma fiável e emite um token que representa esse valor. Outras pools podem não envolver contratos inteligentes e em vez disso, são geridas fora da cadeia.

## Porquê arriscar numa pool? {#why-stake-with-a-pool}

Para além dos benefícios que delineámos na nossa [introdução ao staking](/staking/), o staking com uma pool tem uma série de benefícios distintos.

<CardGrid>
  <Card title="Barreira de entrada reduzida" emoji="🐟" description="Not a whale? No problem. Most staking pools let you stake virtually any amount of ETH by joining forces with other stakers, unlike staking solo which requires 32 ETH." />
  <Card title="Comece hoje a investir em Staking" emoji=":stopwatch:" description="Staking with a pool is as easy as a token swap. No need to worry about hardware setup and node maintenance. Pools allow you to deposit your ETH which enables node operators to run validators. Rewards are then distributed to contributors minus a fee for node operations." />
  <Card title="Tokens de staking" emoji=":droplet:" description="Many staking pools provide a token that represents a claim on your staked ETH and the rewards it generates. This allows you to make use of your staked ETH, e.g. as collateral in DeFi applications." />
</CardGrid>

<StakingComparison page="pools" />

## Considerações a ter {#what-to-consider}

O staking directamente em pool ou delegado não é suportado nativamente pelo protocolo Ethereum, mas dada a procura de utilizadores para fazer staking com menos de 32 ETH, foi criado um número crescente de soluções para satisfazer esta procura.

Cada pool e as ferramentas ou contratos inteligentes que estas utilizam foram desenvolvidos por equipas diferentes, e cada um deles apresenta vantagens e riscos. As pools permitem aos utilizadores trocar as suas ETH por um token que representa a ETH aplicada. O token é útil porque permite que os utilizadores troquem qualquer montante de ETH por um montante equivalente de um token com rendimento que gera um retorno das recompensas de staking aplicadas ao ETH subjacente staked (e vice-versa) em trocas descentralizadas, embora o ETH real permaneça staked na camada de consenso. Isso significa que as trocas entre um produto de ETH com rendimento e o "ETH original" são rápidas, fáceis e não estão disponíveis apenas em múltiplos de 32 ETH.

No entanto, estes tokens ETH staked tendem a criar comportamentos do tipo cartel, em que um grande montante de ETH staked acaba por ficar sob o controlo de algumas organizações centralizadas, em vez de ser distribuído por muitos indivíduos independentes. Isto cria condições para a censura ou a diminuição de valor. O critério de excelência para o staking deve ser sempre, se possível, o facto de os validadores serem executados por indivíduos no seu próprio hardware.

[Mais informações sobre os riscos de staking de tokens](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Os indicadores de atributo são utilizados abaixo para assinalar pontos fortes ou fracos assinaláveis que um conjunto de staking listado possa ter. Utilize esta secção como referência para saber como definimos estes atributos enquanto escolhe uma pool para aderir.

<StakingConsiderations page="pools" />

## Explorar as pools de staking {#explore-staking-pools}

Há uma vasta gama de opções disponíveis para o ajudar na sua configuração. Utilize os indicadores acima referidos para o orientar através das ferramentas que se seguem.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Note-se a importância de escolher um serviço que leve a sério a [diversidade de clientes](/developers/docs/nodes-and-clients/client-diversity/), uma vez que melhora a segurança da rede e limita o seu risco. Os serviços que apresentam indícios de limitação da utilização por parte da maioria dos clientes são indicados com <em style={{ textTransform: "uppercase" }}>"execution client diversity"</em> e <em style={{ textTransform: "uppercase" }}>"consensus client diversity."</em>

Tem alguma sugestão para uma ferramenta de staking que nos tenha escapado? Consulte a nossa [política de listagem de ferramentas](/contributing/adding-staking-products/) para ver se é adequado e para o submeter a análise.

## Frequently asked questions {#faq}

<ExpandableCard title="Como é que ganho recompensas?">
Normalmente, os tokens ERC-20 de staking são emitidos para os stakers, representando o valor do seu ETH staked mais recompensas. Não se esqueça que diferentes pools distribuirão as recompensas de staking aos seus utilizadores através de métodos ligeiramente diferentes, mas este é o tema em comum.
</ExpandableCard>

<ExpandableCard title="Quando é que posso levantar o valor em staking?">
Agora mesmo! A atualização da rede Xangai/Capella ocorreu em abril de 2023 e introduziu os saques de staking. As contas de validador que apoiam as pools de staking têm agora a capacidade de sair e retirar ETH para o endereço de levantamento designado. Isso permite a capacidade de resgatar a sua parte da participação para o ETH base. Consulte o seu operador para saber como é que suporta esta funcionalidade.

Alternativamente, as pools que utilizam um tokens ETH staked ERC-20 permitem aos utilizadores negociar este token no mercado aberto, permitindo-lhe vender a sua posição de staking, efetivamente "retirando" sem realmente remover ETH do contrato de staking.

<ButtonLink href="/staking/withdrawals/">Mais informações sobre levantamentos de staking</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Isto é diferente de fazer staking no meu Exchange?">
Existem muitas semelhanças entre essas opções de staking em pool e as trocas centralizadas, como a capacidade de apostar pequenas quantidades de ETH e agrupá-las para ativar validadores.

Ao contrário das trocas centralizadas, muitas outras opções de staking em pool utilizam contratos inteligentes e/ou tokens de staking, que são normalmente tokens ERC-20 que podem ser mantidos na sua própria carteira e comprados ou vendidos como qualquer outro token. Isto oferece uma camada de autonomia e segurança, dando-lhe controlo sobre os seus tokens, mas ainda não lhe dá controlo direto sobre o cliente validador que atesta em seu nome em background.

Algumas opções de pooling são mais descentralizadas do que outras no que diz respeito aos nós que as suportam. Para promover a solidez e a descentralização da rede, os stakers são sempre encorajados a selecionar um serviço de pooling que permita um conjunto descentralizado e sem permissões de operadores de nós.
</ExpandableCard>

## Leitura adicional {#further-reading}

- [O diretório de staking Ethereum](https://www.staking.directory/) - _Eridian e Spacesider_
- [Visão geral do staking com o Rocket Pool](https://docs.rocketpool.net/guides/staking/overview.html) - _Docs do RocketPool_
- [Staking Ethereum em Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Docs de ajud do Lido_
