---
title: Staking em pool
description: Aprenda sobre pools de staking
lang: pt-br
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: Rinoceronte Leslie nadando na piscina.
sidebarDepth: 2
summaryPoints:
  - Faça stake e ganhe recompensas com qualquer quantia de ETH unindo forças com outras pessoas
  - Pule a parte difícil e confie a operação do validador a terceiros
  - Mantenha tokens de staking em sua própria carteira
---

## O que são pools de staking? {#what-are-staking-pools}

Os pools de staking são uma abordagem colaborativa para permitir que muitos com quantias menores de ETH obtenham os 32 ETH necessários para ativar um conjunto de chaves de validador. A funcionalidade de pool não é suportada nativamente no protocolo, portanto, soluções foram criadas separadamente para atender a essa necessidade.

Alguns pools operam usando contratos inteligentes, onde os fundos podem ser depositados em um contrato, que gerencia e rastreia seu stake sem necessidade de confiança, e emite um token que representa esse valor. Outros pools podem não envolver contratos inteligentes e, em vez disso, são mediados offchain.

## Por que fazer stake com um pool? {#why-stake-with-a-pool}

Além dos benefícios que descrevemos em nossa [introdução ao staking](/staking/), fazer stake com um pool traz uma série de benefícios distintos.

<Grid>
  <Card title="Baixa barreira de entrada" emoji="🐟" description="Não é uma baleia? Sem problemas. A maioria das pools de staking permite que você faça stake de praticamente qualquer quantia de ETH unindo forças com outros stakers, ao contrário do staking solo, que exige 32 ETH." />
  <Card title="Faça stake hoje" emoji=":stopwatch:" description="Fazer staking com uma pool é tão fácil quanto uma troca de tokens. Não é preciso se preocupar com a configuração de hardware e a manutenção de nós. As pools permitem que você deposite seu ETH, o que possibilita que os operadores de nós executem validadores. As recompensas são então distribuídas aos contribuidores, descontando uma taxa para as operações do nó." />
  <Card title="Tokens de staking" emoji=":droplet:" description="Muitas pools de staking fornecem um token que representa um direito sobre o seu ETH em stake e as recompensas que ele gera. Isso permite que você faça uso do seu ETH em stake, por exemplo, como garantia em aplicativos DeFi." />
</Grid>

<StakingComparison page="pools" />

## O que considerar {#what-to-consider}

O staking em pool ou delegado não é suportado nativamente pelo protocolo [Ethereum](/), mas dada a demanda de usuários para fazer stake de menos de 32 ETH, um número crescente de soluções foi criado para atender a essa demanda.

Cada pool e as ferramentas ou contratos inteligentes que eles usam foram criados por equipes diferentes, e cada um vem com benefícios e riscos. Os pools permitem que os usuários façam a troca de seus ETH por um token que representa o ETH em stake. O token é útil porque permite que os usuários façam a troca de qualquer quantia de ETH por uma quantia equivalente de um token com rendimento que gera um retorno das recompensas de staking aplicadas ao ETH em stake subjacente (e vice-versa) em exchanges descentralizadas, mesmo que o ETH real permaneça em stake na camada de consenso. Isso significa que as trocas de ida e volta de um produto de ETH em stake com rendimento e "ETH bruto" são rápidas, fáceis e não estão disponíveis apenas em múltiplos de 32 ETH.

No entanto, esses tokens de ETH em stake tendem a criar comportamentos semelhantes a cartéis, onde uma grande quantidade de ETH em stake acaba sob o controle de algumas organizações centralizadas, em vez de se espalhar por muitos indivíduos independentes. Isso cria condições para censura ou extração de valor. O padrão ouro para staking deve ser sempre indivíduos executando validadores em seu próprio hardware, sempre que possível.

[Mais sobre os riscos dos tokens de staking](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Os indicadores de atributos são usados abaixo para sinalizar pontos fortes ou fracos notáveis que um pool de staking listado pode ter. Use esta seção como referência de como definimos esses atributos enquanto você escolhe um pool para participar.

<StakingConsiderations page="pools" />

## Explorar pools de staking {#explore-staking-pools}

Há uma variedade de opções disponíveis para ajudá-lo com sua configuração. Use os indicadores acima para ajudar a guiá-lo pelas ferramentas abaixo.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Observe a importância de escolher um serviço que leve a [diversidade de clientes](/developers/docs/nodes-and-clients/client-diversity/) a sério, pois isso melhora a segurança da rede e limita seu risco. Serviços que apresentam evidências de limitar o uso do cliente majoritário são indicados com <em style={{ textTransform: "uppercase" }}>"diversidade de clientes de execução"</em> e <em style={{ textTransform: "uppercase" }}>"diversidade de clientes de consenso".</em>

Tem uma sugestão de uma ferramenta de staking que deixamos passar? Confira nossa [política de listagem de produtos](/contributing/adding-staking-products/) para ver se ela se encaixaria bem e para enviá-la para análise.

## Perguntas frequentes {#faq}

<ExpandableCard title="Como eu ganho recompensas?">
Normalmente, os tokens de staking ERC-20 são emitidos para os stakers e representam o valor de seus ETH em stake mais as recompensas. Lembre-se de que diferentes pools distribuirão recompensas de staking para seus usuários por meio de métodos ligeiramente diferentes, mas esse é o tema comum.
</ExpandableCard>

<ExpandableCard title="Quando posso sacar o meu stake?">
Agora mesmo! A atualização da rede Shanghai/Capella ocorreu em abril de 2023 e introduziu os saques de staking. As contas de validador que apoiam os pools de staking agora têm a capacidade de realizar a saída e o saque de ETH para seu endereço de saque designado. Isso permite a capacidade de resgatar sua parte do stake pelo ETH subjacente. Verifique com seu provedor para ver como eles suportam essa funcionalidade.

Alternativamente, os pools que utilizam um token de staking ERC-20 permitem que os usuários negociem esse token no mercado aberto, permitindo que você venda sua posição de staking, efetivamente "sacando" sem realmente remover o ETH do contrato de staking.

<ButtonLink href="/staking/withdrawals/">Mais sobre saques de staking</ButtonLink>
</ButtonLink>

<ExpandableCard title="Isso é diferente de fazer staking com a minha exchange?">
Existem muitas semelhanças entre essas opções de staking em pool e exchanges centralizadas, como a capacidade de fazer stake de pequenas quantias de ETH e agrupá-las para ativar validadores.

Ao contrário das exchanges centralizadas, muitas outras opções de staking em pool utilizam contratos inteligentes e/ou tokens de staking, que geralmente são tokens ERC-20 que podem ser mantidos em sua própria carteira e comprados ou vendidos como qualquer outro token. Isso oferece uma camada de soberania e segurança, dando a você controle sobre seus tokens, mas ainda não lhe dá controle direto sobre o cliente do validador atestando em seu nome em segundo plano.

Algumas opções de pool são mais descentralizadas do que outras quando se trata dos nós que as apoiam. Para promover a saúde e a descentralização da rede, os stakers são sempre incentivados a selecionar um serviço de pool que permita um conjunto descentralizado e não permissionado de operadores de nó.
</ExpandableCard>

## Leitura adicional {#further-reading}

- [O Diretório de Staking do Ethereum](https://www.staking.directory/) - _Eridian e Spacesider_
- [Staking com Rocket Pool - Visão Geral do Staking](https://docs.rocketpool.net/guides/staking/overview.html) - _Documentação do Rocket Pool_
- [Fazendo Staking de Ethereum com Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Documentação de ajuda do Lido_