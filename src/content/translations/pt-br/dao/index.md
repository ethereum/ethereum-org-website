---
title: Organizações autônomas descentralizadas (DAOs)
description: Uma visão geral de DAOs no Ethereum
lang: pt-br
template: use-cases
emoji: ":handshake:"
sidebarDepth: 2
image: ../../../../assets/use-cases/dao-2.png
alt: Uma representação de uma votação DAO em uma proposta.
summaryPoint1: Comunidades de membros sem liderança centralizada.
summaryPoint2: Uma maneira segura de colaborar com desconhecidos na Internet.
summaryPoint3: Um local seguro para destinar fundos para uma causa específica.
---

## O que são DAOs? {#what-are-daos}

As Organizações Autônomas Descentralizadas (DAOs, pela sigla em inglês) são uma forma eficaz e segura de trabalhar com pessoas que pensam da mesma maneira em todo o mundo.

Pense nelas como um negócio de Internet nativo que é de propriedade coletiva e gerenciado por seus membros. Elas possuem valores que ninguém tem autoridade para aceder sem a aprovação do grupo. As decisões são regidas por propostas e votações que garantem que todos os membros da organização tenham voz.

Não há um CEO que possa autorizar gastos com base em seus próprios caprichos e nenhuma chance de um CFO espertalhão manipular os livros. Tudo é transparente, e as regras relativas aos gastos são incorporadas na DAO através do seu código.

## Por que precisamos de DAOs? {#why-dao}

Começar uma organização com alguém que envolva financiamento e dinheiro requer muita confiança nas pessoas com as quais você está trabalhando. Mas é difícil confiar em alguém que você só interagiu pela Internet. Com DAOs você não precisa confiar em mais ninguém no grupo, apenas no código da DAO, que é 100% transparente e verificável por todos.

Isto abre muitas novas oportunidades para a colaboração e coordenação globais.

### Uma comparação {#dao-comparison}

| DAO                                                                                                                               | Uma empresa tradicional                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Hierarquia horizontal e totalmente democratizada.                                                                                 | Hierarquia vertical.                                                                                                     |
| Votação exigida pelos membros para que quaisquer alterações sejam implementadas.                                                  | Dependendo da estrutura, as mudanças podem ser requeridas por uma única parte, ou ter opção de voto.                     |
| Votos conhecidos e resultados implementados automaticamente sem intermediário confiável.                                          | Se a votação é permitida, os votos são homologados internamente e o resultado da votação tem de ser tratado manualmente. |
| Os serviços oferecidos são tratados automaticamente de forma descentralizada (por exemplo, distribuição de fundos filantrópicos). | Requer manipulação humana, ou automação controlada centralmente, propensa a manipulação.                                 |
| Toda a atividade é transparente e totalmente pública.                                                                             | A atividade é tipicamente privada e limitada ao público.                                                                 |

### Exemplos de DAOs {#dao-examples}

Para dar um pouco de contexto, veja alguns exemplos de como você poderia usar uma DAO:

- Uma instituição de caridade: pode-se aceitar a adesão e as doações de qualquer pessoa no mundo, e o grupo pode decidir como quer gastar as doações.
- Uma rede freelancer: você poderia criar uma rede de prestadores de serviços que reunissem seus fundos para escritórios e assinaturas de software.
- Venture de capital e recompensas: você pode criar um fundo de investimento capitalizado que reúne e vota em quais ventures apoiar. O rendimento do dinheiro aplicado poderia mais tarde ser redistribuído entre os membros da DAO.

## Adesão à DAO {#dao-membership}

Existem diferentes modelos para a adesão à DAO. A adesão pode determinar como funciona a votação e outras partes fundamentais da DAO.

### Adesão baseada em Token {#token-based-membership}

Normalmente sem necessidade de permissão para utilizar, dependendo do token usado. A maioria desses tokens de governança pode ser negociada de maneira pública em uma exchange descentralizada. Há outros que têm de ser ganhos através do fornecimento de liquidez ou qualquer outra "prova de trabalho". De qualquer forma, a simples detenção do token permite o acesso à votação.

_Normalmente usado para governar amplos protocolos descentralizados e/ou tokens._

#### Um exemplo famoso {#token-example}

[MakerDAO](https://makerdao.com) – O token MKR da MakerDAO está amplamente disponível em exchanges descentralizadas. Então, qualquer um pode comprar poder de voto no futuro do protocolo Maker.

### Adesão compartilhada {#share-based-membership}

As DAOs compartilhadas são mais restritas, mas ainda bem abertas. Qualquer membro potencial pode apresentar uma proposta para participar da DAO, geralmente com uma contribuição sob a forma de tokens ou trabalho. Cotas representam o poder de voto e a propriedade. Os membros podem sair a qualquer momento, com a sua cota-parte proporcional.

_Normalmente utilizado em organizações mais coesas e com abordagem humanitária, como instituições de caridade, cooperativas e clubes de investimento. Também podem controlar protocolos e tokens._

#### Um exemplo famoso {#share-example}

[MolochDAO](http://molochdao.com/) – MolochDAO foca no financiamento dos projetos Ethereum. Exigem uma proposta de adesão para que o grupo possa avaliar se você dispõe dos conhecimentos especializados e do capital necessários para fazer considerações fundamentadas sobre potenciais donatários. Não se pode simplesmente comprar acesso à DAO no mercado aberto.

### Adesão baseada em reputação {#reputation-based-membership}

A reputação representa a prova de participação e concede poder de voto na DAO. Diferentemente de adesões baseadas em ações ou tokens, as DAOs baseadas em reputação não transferem a propriedade para seus colaboradores. Reputação não pode ser comprada, transferida ou delegada; os membros da DAO devem ganhar reputação por meio de participação. A votação em cadeia não requer permissão e os potenciais membros podem apresentar propostas livremente para ingressar na DAO e solicitar o recebimento de reputação e tokens como recompensa em troca de suas contribuições.

_Normalmente usado para desenvolvimento descentralizado e governança de protocolos e dapps, mas também adequado para um conjunto diversificado de organizações como instituições de caridade, coletivos de trabalhadores, clubes de investimento etc._

#### Um exemplo famoso {#reputation-example}

[DXdao](https://DXdao.eth.link) – O DXdao é um coletivo soberano global que cria e governa protocolos e aplicativos descentralizados desde 2019. Ela alavanca a governança baseada na reputação e o consenso holográfico para coordenar e gerenciar fundos, o que significa que ninguém pode comprar seu caminho para influenciar seu futuro.

## Como funcionam as DAOs? {#how-daos-work}

A espinha dorsal de uma DAO é seu contrato inteligente. O contrato define as regras da organização e detém a tesouraria do grupo. Dado que o contrato é publicado no Ethereum, ninguém poderá alterar as regras, exceto por votação. Se alguém tentar fazer algo que não esteja coberto pelas regras e lógica do código, não terá sucesso. E como a tesouraria é definida pelo contrato inteligente, também significa que ninguém pode gastar o dinheiro sem a aprovação do grupo. Isso significa que as DAOs não precisam de uma autoridade central. Em vez disso, o grupo toma decisões coletivas e os pagamentos são autorizados automaticamente quando os votos são aprovados.

Isso é possível porque os contratos inteligentes são imunes à adulteração, visto que entram em funcionamento no Ethereum. Você não pode simplesmente editar o código (as regras das DAOs) sem que as pessoas percebam porque tudo é público.

<DocLink to="/smart-contracts/">
  Mais sobre contratos inteligentes
</DocLink>

## Ethereum e DAOs {#ethereum-and-daos}

O Ethereum é a base perfeita para DAOs por várias razões:

- O próprio consenso do Ethereum é distribuído e estabelecido o suficiente para que as organizações confiem na rede.
- O código do contrato inteligente não pode ser modificado uma vez lançado, nem mesmo por seus proprietários. Isto permite que a DAO funcione segundo as regras com que foi programada.
- Os contratos inteligentes podem enviar/receber fundos. Sem isso, você precisaria de um intermediário confiável para gerenciar os fundos do grupo.
- A comunidade Ethereum provou ser mais colaborativa do que competitiva, permitindo que as melhores práticas e sistemas de suporte surjam rapidamente.

## Iniciar/participar de uma DAO {#join-start-a-dao}

### Participe de uma DAO {#join-a-dao}

- [DAOs da comunidade Ethereum](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [Lista DAOHaus's de DAOs](https://app.daohaus.club/explore)

### Inicie uma DAO {#start-a-dao}

- [Comece uma DAO com DAOHaus](https://app.daohaus.club/summon)
- [Criar uma DAO apoiada por Aragon](https://aragon.org/product)
- [Inicie sua colônia](https://colony.io/)
- [Crie um DAO com o consenso holográfico de DAOstack](https://alchemy.daostack.io/daos/create)

## Leitura adicional {#further-reading}

### Artigos sobre DAOs {#dao-articles}

- [O que é uma DAO?](https://aragon.org/dao) – [Aragon](https://aragon.org/)
- [Casa de DAOs](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) – [Metagame](https://wiki.metagame.wtf/)
- [O que é uma DAO e para que serve?](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for) – [DAOhaus](https://daohaus.club/)
- [Como começar uma comunidade digital alimentada por DAO](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) – [DAOhaus](https://daohaus.club/)
- [O que é uma DAO?](https://coinmarketcap.com/alexandria/article/what-is-a-dao) – [Coinmarketcap](https://coinmarketcap.com)
- [O que é Consenso Holográfico?](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c) - [DAOstack](https://daostack.io/)

### Vídeos {#videos}

- [O que é uma DAO em cripto?](https://youtu.be/KHm0uUPqmVE)
