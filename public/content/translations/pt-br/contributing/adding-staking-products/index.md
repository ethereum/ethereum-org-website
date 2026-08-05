---
title: Adicionando produtos ou serviços de staking
description: A política que usamos ao adicionar produtos ou serviços de staking no ethereum.org
lang: pt-br
---

Queremos garantir que listamos os melhores recursos possíveis, mantendo os usuários seguros e confiantes.

Qualquer pessoa é livre para sugerir a adição de um produto ou serviço de staking no ethereum.org. Se houver algum que deixamos passar, **[por favor, sugira-o](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml)!**

Atualmente, listamos produtos e serviços de staking nas seguintes páginas:

- [Staking solo](/staking/solo/)
- [Staking como serviço](/staking/saas/)
- [Pools de staking](/staking/pools/)

A Prova de Participação (PoS) na Beacon Chain está ativa desde 1º de dezembro de 2020. Embora o staking ainda seja relativamente novo, tentamos criar uma estrutura justa e transparente para consideração no ethereum.org, mas os critérios de listagem mudarão e evoluirão com o tempo, e, em última análise, ficam a critério da equipe do site ethereum.org.

## A estrutura de decisão {#the-decision-framework}

A decisão de listar um produto no ethereum.org não depende de um único fator. Vários critérios são considerados em conjunto ao decidir listar um produto ou serviço. Quanto mais desses critérios forem atendidos, maior a probabilidade de ser listado.

**Primeiro, qual é a categoria do produto ou serviço?**

- Ferramentas de nó ou cliente
- Gerenciamento de chaves
- Staking como serviço (SaaS)
- Pool de staking

Atualmente, estamos listando apenas produtos ou serviços nessas categorias.

### Critérios de inclusão {#criteria-for-inclusion}

As submissões de produtos ou serviços de staking serão avaliadas pelos seguintes critérios:

**Quando o projeto ou serviço foi lançado?**

- Há evidências de quando o produto ou serviço se tornou disponível ao público?
- Isso é usado para determinar a pontuação de "testado em batalha" (battle tested) do produto.

**O projeto está sendo mantido ativamente?**

- Existe uma equipe ativa desenvolvendo o projeto? Quem está envolvido?
- Apenas produtos mantidos ativamente serão considerados.

**O produto ou serviço é livre de intermediários humanos/de confiança?**

- Quais etapas na jornada do usuário exigem confiar em humanos para manter as chaves de seus fundos ou para distribuir adequadamente as recompensas?
- Isso é usado para determinar a pontuação "sem necessidade de confiança" (trustless) do produto ou serviço.

**O projeto fornece informações precisas e confiáveis?**

- É crucial que o site do produto apresente informações atualizadas, precisas e não enganosas, especialmente se for referente ao protocolo Ethereum ou outras tecnologias relacionadas.
- Submissões contendo desinformação, detalhes desatualizados ou declarações potencialmente enganosas sobre o Ethereum ou outros assuntos relevantes não serão listadas ou serão removidas se já estiverem listadas.

**Quais plataformas são suportadas?**

- ex.: Linux, macOS, Windows, iOS, Android

#### Software e contratos inteligentes {#software-and-smart-contracts}

Para qualquer software personalizado ou contratos inteligentes envolvidos:

**Tudo é de código aberto?**

- Projetos de código aberto devem ter um repositório de código-fonte disponível publicamente
- Isso é usado para determinar a pontuação de "código aberto" (open source) do produto.

**O produto já saiu do desenvolvimento _beta_?**

- Em que ponto do ciclo de desenvolvimento o produto está?
- Produtos em fase beta não são considerados para inclusão no ethereum.org

**O software passou por uma auditoria de segurança externa?**

- Se não, há planos para realizar uma auditoria externa?
- Isso é usado para determinar a pontuação de "auditado" (audited) do produto.

**O projeto tem um programa de recompensa por bugs (bug bounty)?**

- Se não, há planos para criar uma recompensa por bugs de segurança?
- Isso é usado para determinar a pontuação de "recompensa por bugs" (bug bounty) do produto.

#### Ferramentas de nó ou cliente {#node-or-client-tooling}

Para produtos de software relacionados à configuração, gerenciamento ou migração de nó ou cliente:

**Quais clientes da camada de consenso (ex.: Lighthouse, Teku, Nimbus, Prysm, Grandine) são suportados?**

- Quais clientes são suportados? O usuário pode escolher?
- Isso é usado para determinar a pontuação "multicliente" (multi-client) do produto.

#### Staking como serviço {#staking-as-a-service}

Para [listagens de staking como serviço](/staking/saas/) (ex.: operação de nó delegada):

**Quais são as taxas associadas ao uso do serviço?**

- Qual é a estrutura de taxas, ex.: há uma taxa mensal para o serviço?
- Alguma exigência adicional de staking?

**Os usuários são obrigados a se inscrever para uma conta?**

- Alguém pode usar o serviço sem permissão ou KYC?
- Isso é usado para determinar a pontuação "não permissionado" (permissionless) do produto.

**Quem detém as chaves de assinatura e as chaves de saque?**

- A quais chaves o usuário mantém acesso? A quais chaves o serviço ganha acesso?
- Isso é usado para determinar a pontuação "sem necessidade de confiança" (trustless) do produto.

**Qual é a diversidade de clientes dos nós sendo operados?**

- Qual porcentagem de chaves de validador está sendo executada por um cliente majoritário da camada de consenso (CL)?
- Até a última edição, o Prysm é o cliente da camada de consenso sendo executado pela maioria dos operadores de nó, o que é perigoso para a rede. Se algum cliente CL estiver sendo usado atualmente por mais de 33% da rede, solicitamos dados relacionados ao seu uso.
- Isso é usado para determinar a pontuação de "clientes diversos" (diverse clients) do produto.

#### Pool de staking {#staking-pool}

Para [serviços de staking em pool](/staking/pools/):

**Qual é o mínimo de ETH exigido para fazer stake?**

- ex.: 0,01 ETH

**Quais são as taxas ou exigências de staking envolvidas?**

- Qual porcentagem das recompensas é removida como taxas?
- Alguma exigência adicional de staking?

**Existe um token de liquidez?**

- Quais são os tokens envolvidos? Como eles funcionam? Quais são os endereços de contrato?
- Isso é usado para determinar a pontuação de "token de liquidez" (liquidity token) do produto.

**Os usuários podem participar como um operador de nó?**

- O que é exigido para executar clientes de validador usando os fundos em pool?
- Isso exige permissão de um indivíduo, empresa ou DAO?
- Isso é usado para determinar a pontuação de "nós não permissionados" (permissionless nodes) do produto.

**Qual é a diversidade de clientes dos operadores de nó do pool?**

- Qual porcentagem de operadores de nó está executando um cliente majoritário da camada de consenso (CL)?
- Até a última edição, o Prysm é o cliente da camada de consenso sendo executado pela maioria dos operadores de nó, o que é perigoso para a rede. Se algum cliente CL estiver sendo usado atualmente por mais de 33% da rede, solicitamos dados relacionados ao seu uso.
- Isso é usado para determinar a pontuação de "clientes diversos" (diverse clients) do produto.

### Outros critérios: os diferenciais (nice-to-haves) {#other-criteria}

**Quais interfaces de usuário são suportadas?**

- ex.: Aplicativo de navegador, aplicativo de desktop, aplicativo móvel, CLI

**Para ferramentas de nó, o software fornece uma maneira fácil de alternar entre clientes?**

- O usuário pode alterar clientes de forma fácil e segura usando a ferramenta?

**Para SaaS, quantos validadores estão sendo operados atualmente pelo serviço?**

- Isso nos dá uma ideia do alcance do seu serviço até agora.

## Como exibimos os resultados {#product-ordering}

Os [critérios de inclusão](#criteria-for-inclusion) acima são usados para calcular uma pontuação cumulativa para cada produto ou serviço. Isso é usado como um meio de classificar e exibir produtos que atendem a certos critérios objetivos. Quanto mais critérios tiverem evidências fornecidas, mais alto um produto será classificado, com empates sendo randomizados no carregamento.

A lógica de código e os pesos para esses critérios estão contidos atualmente [neste componente JavaScript](https://github.com/ethereum/ethereum-org-website/blob/dev/src/components/Staking/StakingProductsCardGrid/index.tsx#L350) em nosso repositório.

## Adicione seu produto ou serviço {#add-product}

Se você quiser adicionar um produto ou serviço de staking ao ethereum.org, crie uma issue no GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml">
  Criar uma issue
</ButtonLink>