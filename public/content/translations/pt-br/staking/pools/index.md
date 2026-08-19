---
title: Staking líquido e em pool
description: Uma visão geral do staking líquido e em pool no Ethereum
lang: pt-br
template: staking
image: /images/staking/leslie-pool.png
sidebarDepth: 2
summaryPoints:
  - Faça stake e ganhe recompensas com qualquer quantia de ETH unindo forças com outras pessoas
  - Pule a parte difícil e confie a operação do validador a terceiros
  - Mantenha tokens de staking líquido na sua própria carteira
---

## O que são pools de staking? {#what-are-staking-pools}

Pools de staking são uma abordagem colaborativa para permitir que muitas pessoas com quantias menores de ETH obtenham o mínimo de 32 ETH exigido para ativar um validador no [Ethereum](/). A funcionalidade de pool não é suportada nativamente dentro do protocolo, então soluções foram construídas separadamente para atender à necessidade de participar com quantias menores.

Alguns pools de staking operam usando contratos inteligentes, onde os fundos são depositados em um contrato que gerencia e rastreia o seu stake, e emite um token de recibo (token de staking líquido) que representa esse valor. Outros pools podem não envolver contratos inteligentes e, em vez disso, são mediados offchain.

As opções em pool diferem enormemente no quanto você pode verificar sobre elas. Pools transparentes e governados por protocolo são contratos inteligentes de código aberto no Ethereum que mantêm depósitos, publicam seus conjuntos de operadores de nó e emitem um token resgatável; tudo o que apoia sua posição é visível onchain. Produtos em pool opacos, como alguns programas de rendimento de corretoras centralizadas, assumem a custódia do seu ETH, e você não pode verificar de forma independente o que é feito em stake em seu nome, se houver algo. A maior parte desta página cobre o primeiro tipo; veja [produtos em pool opacos](#opaque-pooled-products) para saber como diferenciá-los.

Toda opção em pool resolve o problema real de acesso ao staking com menos de 32 ETH, ou sem executar hardware. Mas cada uma também coloca um intermediário entre o staker e o protocolo principal do Ethereum. Apenas o [staking solo](/staking/solo/) oferece a você um relacionamento direto e sem mediação com o Ethereum.

## Por que fazer stake com um pool? {#why-stake-with-a-pool}

Além dos benefícios de [participar do staking](/staking/), fazer stake com um pool traz uma série de benefícios exclusivos.

<Grid>
  <Card title="Low barrier to entry" icon={<Fish />} description="Não é uma baleia? Sem problemas. A maioria dos pools de staking permite que você faça stake de praticamente qualquer quantia de ETH unindo forças com outros stakers, ao contrário do staking solo, que exige 32 ETH." />
  <Card title="Stake today" icon={<Clock />} description="Fazer stake com um pool é tão fácil quanto uma troca de tokens. Não há necessidade de se preocupar com a configuração de hardware e manutenção de nós. Os pools permitem que você deposite seu ETH, o que possibilita que os operadores de nó executem validadores. As recompensas são então distribuídas aos contribuidores, menos uma taxa para as operações do nó." />
  <Card title="Liquid staking tokens" icon={<Droplets />} description="Muitos pools de staking fornecem um token que representa uma reivindicação sobre o seu ETH em stake e as recompensas que ele gera. Isso permite que você faça uso do seu ETH em stake, por exemplo, como colateral em aplicativos DeFi." />
</Grid>

## Comparação das opções de staking {#comparison-of-staking-options}

<StakingComparison page="pools" />

## Tokens de staking líquido {#liquid-staking-tokens}

A maioria dos pools de staking transparentes emite um **token de staking líquido (LST)**, um token ERC-20 que representa uma reivindicação sobre o ETH em stake e as recompensas que ele ganha. Quando você deposita ETH, o protocolo faz o stake com seus operadores de nó e cunha um token de recibo (LST) para a sua carteira. Você mesmo pode manter o token ou custodiá-lo com um provedor terceirizado, e pode transferir ou vender o token a qualquer momento. O ETH subjacente permanece em stake na camada de consenso. Os protocolos de staking líquido representam cerca de um terço de todo o ETH em stake, tornando os LSTs uma das formas mais comuns de fazer stake hoje.

### Como as recompensas aparecem no token {#how-rewards-show-up-in-the-token}

Os LSTs refletem as recompensas de staking de uma destas duas maneiras:

- **Tokens de rebase** (como o stETH da Lido): o saldo do seu token aumenta à medida que as recompensas se acumulam, de modo que um token permanece com valor aproximadamente igual a um ETH.
- **Tokens de taxa de câmbio** (como o rETH da Rocket Pool): o saldo do seu token permanece o mesmo, mas cada token se torna resgatável por uma quantia crescente de ETH ao longo do tempo.

Ambos os designs entregam recompensas líquidas da taxa do protocolo de staking. Nenhum é inerentemente melhor, mas eles se comportam de maneira diferente em carteiras e aplicativos de finanças descentralizadas (DeFi), e são tratados de forma diferente para fins fiscais em algumas jurisdições. Tokens de rebase frequentemente têm versões "empacotadas" (wrapped) sem rebase para compatibilidade com aplicativos [DeFi](/glossary/#defi).

### Resgate e negociação {#redeeming-and-trading}

Existem duas maneiras de sair de uma posição de LST:

- **Resgatar através do protocolo** pelo ETH subjacente. O resgate depende de o protocolo ter liquidez disponível, seja um buffer de ETH sem stake ou validadores saindo através da fila de saída da camada de consenso, o que pode levar tempo.
- **Vender em mercados secundários** a qualquer momento. Como o token é negociado livremente, seu preço de mercado pode se desviar do valor do ETH que o apoia, particularmente durante períodos de estresse no mercado.

Desde a atualização Pectra, os [saques acionados pela camada de execução (EIP-7002)](https://eips.ethereum.org/EIPS/eip-7002) permitem que as saídas de validadores sejam acionadas diretamente da camada de execução pelo titular do endereço de saque. Os protocolos de staking podem usar esse recurso para garantir que seus validadores possam sair sem depender da cooperação dos operadores de nó, de modo que os resgates dependem menos de confiar nos operadores de nó do que costumavam.

### Manter um LST não é o mesmo que fazer staking {#holding-an-lst-is-not-the-same-as-staking}

O protocolo Ethereum paga recompensas aos validadores; ele não sabe que o seu token existe. Quando você mantém um LST, você não é um staker do ponto de vista do protocolo. Em vez disso, você mantém uma reivindicação sobre um serviço ou contrato inteligente que faz stake em seu nome. Isso funciona bem em condições normais, mas vem com dependências de confiança adicionais. O seu ETH em stake depende de os contratos, a governança e os operadores do pool funcionarem corretamente, não apenas do próprio Ethereum.

## Riscos dos tokens de staking líquido {#risks-of-liquid-staking-tokens}

Os LSTs herdam os riscos subjacentes do staking (como penalização e penalidades por tempo de inatividade nos validadores do pool) e adicionam suas próprias camadas:

- **Risco de contrato inteligente** - seu ETH é mantido por contratos que podem conter bugs ou ser explorados. Dê preferência a protocolos com código de código aberto, auditado e testado em batalha.
- **Risco de mercado e liquidez** - o preço do token no mercado secundário pode cair abaixo do valor do ETH que o apoia ("depegging"). Se os resgates do protocolo estiverem lentos ou congestionados quando você quiser sair, vender com desconto pode ser sua única saída rápida.
- **Risco de governança e atualização** - taxas, conjuntos de operadores de nó e até mesmo como o token funciona podem ser alterados através da governança do protocolo e atualizações de contrato. Como detentor do token, você normalmente não tem voto nessa governança.
- **Centralização do conjunto de operadores** - alguns pools concentram o stake com seus operadores de nó escolhidos. Grandes quantias de ETH em stake sob o controle de algumas poucas organizações criam condições para censura, extração de valor e pontos únicos de falha. Prefira pools com conjuntos de operadores distribuídos e não permissionados.
- **Repasse de penalização** - se os validadores do pool sofrerem penalização ou forem penalizados, a perda é tipicamente socializada entre todos os detentores de tokens de acordo com as regras do protocolo.

<Alert variant="update">
<AlertIcon size="xl"><Split /></AlertIcon>
<AlertContent>
<AlertDescription>
Muitos pools reduzem o risco do operador usando a **tecnologia de validador distribuído (DVT)**, um middleware que divide a chave de um validador em várias máquinas e operadores para que nenhuma falha ou comprometimento único derrube o validador. [Mais sobre a tecnologia de validador distribuído](/staking/dvt/)
</AlertDescription>
</AlertContent>
</Alert>

## Produtos em pool opacos {#opaque-pooled-products}

Nem tudo o que é comercializado como "staking" é staking de protocolo. Programas de "ganhos" ou "recompensas" de corretoras centralizadas, e alguns produtos de rendimento construídos sobre tokens de staking, agrupam o ETH dos clientes de maneiras que você não pode inspecionar:

- **Custodial** - o provedor mantém as chaves de saque e o ETH.
- **Os termos podem mudar** - taxas, bloqueios e elegibilidade são definidos pela política da empresa e podem ser revisados a qualquer momento, ao contrário das regras aplicadas por contratos onchain.
- **Pode não ser staking de forma alguma** - internamente, o rendimento pode vir de empréstimos, negociações ou outras atividades em vez de validadores. Você geralmente não tem como verificar.
- **Risco de contraparte** - se o provedor se tornar insolvente ou congelar os saques, não há nada onchain para você resgatar.

Para diferenciar um pool transparente de um produto opaco, pergunte:

1. Você pode verificar onchain para onde vai o seu ETH, em contratos de código aberto e auditados?
2. O conjunto de operadores de nó é publicado?
3. Você recebe um token mantido na sua própria carteira que é resgatável pelo ETH subjacente?
4. As regras são aplicadas por contratos inteligentes e governança pública, ou pelos termos de serviço de uma empresa?

Quanto mais dessas perguntas um provedor só puder responder com "confie em nós", mais opaco será o produto.

<Alert variant="warning">
<AlertIcon size="lg"><TriangleAlert /></AlertIcon>
<AlertContent>
<AlertDescription>
Alguns produtos anunciam rendimento "aprimorado" ou "impulsionado" combinando staking com **restaking**, um caso de uso para LSTs que compromete o ETH em stake para proteger protocolos adicionais sob condições adicionais de penalização. O restaking é uma categoria de risco separada e uma aplicação inovadora construída sobre LSTs, não uma forma de participação direta no staking. Se um valor de rendimento for significativamente maior do que a taxa de staking da rede principal, você deve perguntar exatamente de onde vem o rendimento extra. [O que é restaking?](/restaking/)
</AlertDescription>
</AlertContent>
</Alert>

## Execute um nó para um pool {#run-a-node-for-a-pool}

Tornar-se um operador de nó vinculado para um pool de staking é um caminho intermediário entre manter um token e o staking solo. Alguns protocolos de staking permitem que indivíduos executem validadores usando ETH em pool de outros usuários. Você deposita um vínculo do seu próprio ETH como colateral, executa o hardware e as chaves, e ganha uma comissão sobre o stake correspondente a você.

Por exemplo, os validadores de megapool da Rocket Pool exigem um vínculo de 4 ETH por validador, e o Módulo de Staking da Comunidade da Lido exige cerca de 2,4 ETH para uma primeira chave de validador (1,5 ETH para Stakers da Comunidade Identificados). Isso oferece às pessoas com menos de 32 ETH uma maneira de executar seu próprio hardware e fortalecer o conjunto de operadores da rede, ao mesmo tempo em que aceitam as regras, os requisitos de desempenho e as condições de penalidade do pool.

## O que considerar {#what-to-consider}

Cada pool e as ferramentas ou contratos inteligentes que eles usam foram construídos por equipes diferentes, e cada um vem com benefícios e riscos. O staking em pool ou delegado não é suportado nativamente pelo protocolo Ethereum, e o padrão ouro para o staking deve ser sempre indivíduos executando validadores em seu próprio hardware sempre que possível.

Indicadores de atributos são usados abaixo para sinalizar pontos fortes ou fracos notáveis que um pool de staking listado pode ter. Use esta seção como referência de como definimos esses atributos enquanto você escolhe um pool para participar.

<StakingConsiderations page="pools" />

## Explore pools de staking {#explore-staking-pools}

Há uma variedade de opções disponíveis para ajudá-lo com sua configuração. Use os indicadores acima para ajudar a guiá-lo pelas ferramentas abaixo.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Observe a importância de escolher um serviço que leve a [diversidade de clientes](/developers/docs/nodes-and-clients/client-diversity/) a sério, pois isso melhora a segurança da rede e limita o seu risco. Serviços que têm evidências de limitar o uso do cliente majoritário são indicados com <em style={{ textTransform: "uppercase" }}>"diversidade de clientes de execução"</em> e <em style={{ textTransform: "uppercase" }}>"diversidade de clientes de consenso".</em>

Tem uma sugestão de uma ferramenta de staking que deixamos passar? Confira nossa [política de listagem de produtos](/contributing/adding-staking-products/) para ver se ela seria adequada e para enviá-la para análise.

<StakingCommunityCallout className="my-16" />

## Perguntas frequentes {#faq}

<ExpandableCard title="Como ganho recompensas?">
Normalmente, os tokens de staking líquido ERC-20 são emitidos para os stakers e representam o valor do seu ETH em stake mais as recompensas. As recompensas chegam até você de uma destas duas maneiras, dependendo do design do token: tokens de rebase aumentam o saldo do seu token à medida que as recompensas se acumulam, enquanto tokens de taxa de câmbio mantêm seu saldo fixo e se tornam resgatáveis por mais ETH ao longo do tempo. De qualquer forma, as recompensas são distribuídas líquidas da taxa do pool.
</ExpandableCard>

<ExpandableCard title="Quando posso sacar meu stake?">
Os saques de staking foram ativados desde a atualização Shanghai/Capella em abril de 2023. As contas de validador que apoiam os pools de staking podem sair e sacar ETH para o seu endereço de saque designado, o que permite que você resgate sua parte do stake pelo ETH subjacente. A velocidade de resgate depende da liquidez disponível do seu pool e da fila de saída da camada de consenso. Verifique com o seu provedor para ver como eles suportam essa funcionalidade.

Desde a atualização Pectra, os pools também podem usar saques acionados pela camada de execução (EIP-7002) para sair de validadores diretamente do endereço de saque, sem depender das chaves de assinatura dos operadores de nó, reduzindo a confiança necessária para que os resgates sejam honrados.

Alternativamente, os pools que utilizam um token de staking líquido ERC-20 permitem que os usuários negociem esse token no mercado aberto, permitindo que você venda sua posição de staking, efetivamente "sacando" sem realmente remover o ETH do contrato de staking. Observe que o preço de mercado pode diferir do valor de resgate do token.

<ButtonLink href="/staking/withdrawals/">Mais sobre saques de staking</ButtonLink>
</ButtonLink>

<ExpandableCard title="Isso é diferente de fazer staking na minha exchange?">
Existem muitas semelhanças entre essas opções de staking em pool e as corretoras centralizadas, como a capacidade de fazer stake de pequenas quantias de ETH e tê-las agrupadas para ativar validadores.

Ao contrário das corretoras centralizadas, muitas outras opções de staking em pool utilizam contratos inteligentes e/ou tokens de staking líquido, que geralmente são tokens ERC-20 que podem ser mantidos na sua própria carteira e comprados ou vendidos como qualquer outro token. Isso oferece uma camada de soberania e segurança ao dar a você o controle sobre seus tokens, mas ainda não lhe dá controle direto sobre o cliente validador atestando em seu nome em segundo plano.

Os programas de "ganhos" de corretoras também são custodiais e governados por termos da empresa em vez de regras onchain, e seu rendimento pode não vir do staking de protocolo de forma alguma. Veja [produtos em pool opacos](#opaque-pooled-products) para saber como diferenciá-los.

Algumas opções de pool são mais descentralizadas do que outras quando se trata dos nós que as apoiam. Para promover a saúde e a descentralização da rede, os stakers são sempre encorajados a selecionar um serviço de pool que permita um conjunto descentralizado e não permissionado de operadores de nó.
</ExpandableCard>

## Leitura adicional {#further-reading}

- [O Diretório de Staking do Ethereum](https://www.staking.directory/) - _Eridian e Spacesider_
- [Os riscos dos derivativos de staking líquido](https://notes.ethereum.org/@djrtwo/risks-of-lsd) - _Danny Ryan_
- [O que é staking líquido?](https://chain.link/education-hub/liquid-staking) - _Chainlink_
- [EIP-7002: Saques acionáveis pela camada de execução](https://eips.ethereum.org/EIPS/eip-7002) - _Propostas de Melhoria do Ethereum_
- [Classificações de Pools de Staking do Ethereum](https://explorer.rated.network/) - _Rated Network Explorer_
- [Qual é a diferença entre um token de restaking líquido (LRT) e um token de staking líquido (LST)?](https://liquidcollective.io/lst-vs-lrt/) - _Liquid Collective_