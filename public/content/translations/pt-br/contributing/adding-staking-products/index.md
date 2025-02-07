---
title: Adicionando participação em produtos e serviços
description: A política que usamos ao adicionar participações em produtos e serviços no ethereum.org
lang: pt-br
---

# Adicionando participação em produtos e serviços {#adding-staking-products-or-services}

Queremos ter certeza de que listamos os melhores recursos possíveis, mantendo os usuários seguros e confiantes.

Qualquer pessoa é livre para sugerir a adição de participações em produtos ou serviços no ethereum.org. Se houver algum de que esquecemos, **[sugira aqui](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml)!**

Atualmente, listamos participações em produtos e serviços nas seguintes páginas:

- [Participação Individual](/staking/solo/)
- [Participação sobre Serviço](/staking/saas/)
- [Pools de participação (staking)](/staking/pools/)

A prova de participação na Beacon Chain está ativa desde 1 de dezembro de 2020. Embora fazer participações (staking) seja algo relativamente novo, tentamos criar uma estrutura justa e transparente a ser considerada no ethereum.org, porém, os critérios de listagem vão mudar e evoluir com o tempo e, em última análise, ficarão a critério da equipe do ethereum.org.

## O framework de decisão {#the-decision-framework}

A decisão de listar um produto no ethereum.org não depende de um único fator. Vários critérios são considerados em conjunto ao decidir listar um produto ou serviço. Quanto mais desses critérios forem atendidos, maior será a probabilidade de eles serem listados.

**Primeiro, de qual categoria de produto ou serviço isso se trata?**

- Ferramenta de nó ou cliente
- Gerenciamento de chaves
- Participação como Serviço (SaaS)
- Pool de participação (staking)

Atualmente, estamos apenas listando produtos ou serviços nessas categorias.

### Critérios para inclusão {#criteria-for-inclusion}

As submissões de produtos ou serviços de participação serão avaliadas pelos seguintes critérios:

**Quando o projeto ou serviço foi lançado?**

- Há evidências de quando o produto ou serviço se tornou disponível ao público?
- Isto é usado para determinar a pontuação dos produtos testados e comprovados.

**O projeto está sendo mantido ativamente?**

- Há um time ativo desenvolvendo o projeto? Quem está envolvido?
- Somente produtos mantidos ativamente serão considerados.

**O produto ou serviço está livre de intermediários confiáveis/humanos?**

- Quais etapas na jornada dos usuários exigem que humanos de confiança tenham as chaves de seus fundos ou distribuam recompensas adequadamente?
- Isso é usado para determinar a pontuação de produtos e serviços "sem confiança".

**O projeto fornece informação precisa e confiável?**

- É crucial que o website do produto exiba informações atualizadas, precisas e que não induzam a erro, particularmente se ele pertence ao protocolo Ethereum ou outras tecnologias relacionadas.
- Envios contendo informações incorretas, detalhes desatualizados, afirmações potencialmente confusas sobre o Ethereum ou outros assuntos relevantes não serão listadas, ou serão removidas se já estiverem listadas.

**Quais plataformas são suportadas?**

- ou seja, Linux, macOS, Windows, iOS, Android

#### Sistemas e contratos Inteligentes {#software-and-smart-contracts}

Para qualquer sistema personalizado ou contrato inteligente envolvido:

**Tudo é código aberto?**

- Projetos de código aberto devem ter um repositório de código-fonte disponível publicamente
- Isso é usado para determinar a pontuação de "código aberto" dos produtos.

**O produto está fora do desenvolvimento de uma versão _beta_?**

- Onde se encontra o produto em seu ciclo de desenvolvimento?
- Os produtos na fase beta não são considerados para inclusão no ethereum.org

**O software passou por uma auditoria de segurança externa?**

- Caso contrário, há planos para realizar uma auditoria externa?
- Isso é usado para determinar a pontuação "auditada" dos produtos.

**O projeto tem um programa de recompensas por bugs encontrados?**

- Caso contrário, há planos para criar uma recompensa por bugs na segurança?
- Isso é usado para determinar a pontuação de "recompensa por bugs encontrados" dos produtos.

#### Ferramenta de nó ou cliente {#node-or-client-tooling}

Para produtos de software relacionados à configuração de nó ou cliente, gerenciamento ou migração:

**Quais clientes da camada de consenso (como Lighthouse, Teku, Nimbus, Prysm, Grandine) são suportados?**

- Quais clientes são suportados? O usuário pode escolher?
- Isso é usado para determinar a pontuação dos produtos "multicliente".

#### Participação sobre Serviço {#staking-as-a-service}

Para [listagens de staking-as-a-service](/staking/saas/) (ou seja, operação de nó delegada):

**Quais são as taxas associadas ao uso do serviço?**

- Qual é a estrutura de taxas, por exemplo, há uma taxa mensal para o serviço?
- Você tem requisitos adicionais de participação (staking)?

**Os usuários são obrigados a se inscrever em uma conta?**

- Alguém pode usar o serviço sem permissão ou KYC?
- Isso é usado para determinar a pontuação de produtos “sem permissão”.

**Quem detém as chaves de assinatura e as chaves de saque?**

- O usuário mantém acesso a quais chaves? O serviço tem acesso a quais chaves?
- Isso é usado para determinar a pontuação de produtos “sem confiança”.

**Qual é a diversidade de clientes dos nós que estão sendo operados?**

- Que percentual de chaves validadoras estão sendo rodadas pela por uma maioria de clientes de camada de consenso (CL)?
- Na última edição, o Prysm é o cliente da camada de consenso executado pela maioria dos nós operadores, o que é perigoso para a rede. Se um cliente atualmente estiver usando mais de 33% da rede, solicitamos os dados relacionados a esse uso.
- Isso é usado para determinar a pontuação de “diversidade de clientes” dos produtos.

#### Pool de Participação {#staking-pool}

Para [serviços de participação (stake) em pool](/staking/pools/):

**Qual é o mínimo de ETH necessário para colocar em participação (stake)?**

- por exemplo, 0,01 ETH

**Quais são as taxas ou requisitos de participação (stake) envolvidos?**

- Qual é o percentual de recompensas removidas como taxas?
- Você tem requisitos adicionais de participação (staking)?

**Há um token de liquidez?**

- Quais são os tokens envolvidos? Como eles funcionam? Quais são os endereços do contrato?
- Isso é usado para determinar a pontuação do “token de liquidez” dos produtos.

**Os usuários podem participar como um operador de nó?**

- O que é necessário para executar clientes validadores usando fundos em pool?
- Isso requer permissão de um indivíduo, empresa ou DAO?
- Isso é usado para determinar a pontuação de “nós sem permissão” dos produtos.

**Qual é a diversidade de clientes dos operadores de nós em pool?**

- Qual é a porcentagem de operadores de nós que usam um cliente da camada de consenso?
- Na última edição, o Prysm é o cliente da camada de consenso executado pela maioria dos nós operadores, o que é perigoso para a rede. Se um cliente atualmente estiver usando mais de 33% da rede, solicitamos os dados relacionados a esse uso.
- Isso é usado para determinar a pontuação de “diversidade de clientes” dos produtos.

### Outros critérios: os bons para ter {#other-criteria}

**Quais interfaces de usuário são suportadas?**

- ou seja, Aplicativos de navegador, desktop, mobile ou CLI

**Para ferramentas de nós, o software fornece uma maneira fácil de alternar entre clientes?**

- O usuário pode trocar de cliente com facilidade e segurança usando a ferramenta?

**Para SaaS, quantos validadores estão sendo operados atualmente pelo serviço?**

- Isso nos dá uma ideia do alcance do seu serviço até agora.

## Como exibimos os resultados {#product-ordering}

Os [critérios de inclusão](#criteria-for-inclusion) acima são usados para calcular a pontuação acumulada para cada produto ou serviço. Isso é usado como meio de classificação e apresentação de produtos que atendem a determinados critérios objetivos. Quanto mais critérios forem fornecidos para essa evidência, maior será a classificação de um produto, com ligações exibidas aleatoriamente durante o carregamento.

Atualmente, a lógica e os valores do código para esses critérios estão contidos [neste componente JavaScript](https://github.com/ethereum/ethereum-org-website/blob/dev/src/components/Staking/StakingProductsCardGrid.js#L350) em nosso repositório.

## Adicione seu produto ou serviço {#add-product}

Se você quiser adicionar uma participação (stake) de produto ou serviço ao ethereum.org, crie um tíquete no Github.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml">
  Crie um ticket
</ButtonLink>
