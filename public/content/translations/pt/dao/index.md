---
title: Organizações Autónomas Descentralizadas (DAO)
description: Uma visão geral de DAO na Ethereum
lang: pt
template: use-cases
emoji: ":handshake:"
sidebarDepth: 2
image: /images/use-cases/dao-2.png
alt: Representação da votação de uma proposta numa DAO.
summaryPoint1: Comunidades pertencentes aos membros, sem liderança centralizada.
summaryPoint2: Uma forma segura de colaborar com desconhecidos na internet.
summaryPoint3: Um local seguro para afetar fundos a uma causa específica.
---

## O que são DAO? {#what-are-daos}

Uma DAO é uma organização de propriedade coletiva, governada por uma blockchain (cadeia de blocos), que trabalha para uma missão partilhada.

As DAO permitem-nos trabalhar com pessoas que pensam da mesma forma em todo o mundo sem confiar num líder benevolente para gerir os fundos ou as operações. Não existe um Diretor Executivo (CEO) que possa gastar fundos por capricho ou um Diretor Financeiro que possa manipular os livros de contas. Em vez disso, as regras baseadas em blockchain inscritas no código definem como a organização funciona e como os fundos são gastos.

Têm tesourarias incorporadas às quais ninguém tem autoridade para aceder sem a aprovação do grupo. As decisões são regidas por propostas e votações para garantir que todos na organização têm voz ativa e tudo acontece de forma transparente na cadeia.

## Porque é que precisamos de DAO? {#why-dao}

Criar uma organização com alguém que envolve financiamento e dinheiro requer muita confiança nas pessoas com quem se está a trabalhar. Mas é complicado confiar em alguém com quem só interagimos na Internet. Com as DAO não é necessário confiar em mais ninguém do grupo, apenas no código da DAO, que é 100% transparente e verificável por qualquer um.

Isto abre muitas novas oportunidades de colaboração e coordenação a nível global.

### Uma comparação {#dao-comparison}

| DAO                                                                                                                              | Uma organização tradicional                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Geralmente plana e totalmente democratizada.                                                                                     | Normalmente hierárquica.                                                                                                    |
| É necessária a votação dos seus membros para que quaisquer alterações sejam implementadas.                                       | Dependendo da estrutura, podem ser exigidas alterações a uma única parte ou pode ser proposto um voto.                      |
| Os votos são contados e o resultado é aplicado automaticamente sem a intervenção de qualquer intermediário de confiança.         | Se a votação for permitida, os votos são contabilizados internamente e o resultado da votação deve ser tratado manualmente. |
| Os serviços oferecidos são geridos automaticamente de forma descentralizada (por exemplo, distribuição de fundos filantrópicos). | Requer manuseamento humano ou automatização controlada centralmente, propensos a manipulação.                               |
| Toda a atividade é transparente e totalmente pública.                                                                            | A atividade é tipicamente privada e limitada ao público.                                                                    |

### Exemplos DAO {#dao-examples}

Para que isto faça mais sentido, eis alguns exemplos de como se pode utilizar uma DAO:

- Uma instituição de caridade - pode aceitar donativos de qualquer pessoa no mundo e votar em que causas financiar.
- Propriedade coletiva - pode adquirir ativos físicos ou digitais e os membros podem votar sobre a forma de os utilizar.
- Empreendimentos e subvenções - pode criar um fundo de risco que reúna capital de investimento e vote em que empreendimentos apoiar. O dinheiro reembolsado pode mais tarde ser redistribuído entre os membros da DAO.

## Como funcionam as DAO? {#how-daos-work}

A espinha dorsal de uma DAO é o seu contrato inteligente, que define as regras da organização e detém a tesouraria do grupo. Assim que o contrato estiver ativo na Ethereum, ninguém pode alterar as suas regras, exceto através de uma votação. Se alguém tentar fazer algo que não esteja abrangido pelas regras e pela lógica do código, falhará. E como a tesouraria também é definida pelo contrato inteligente, isso significa que ninguém pode gastar dinheiro sem a aprovação do grupo. Isto significa que as DAO não precisam de uma autoridade central. Em vez disso, o grupo toma decisões coletivamente e os pagamentos são automaticamente autorizados quando as propostas são aprovadas.

Isto é possível porque os contratos inteligentes são à prova de adulteração quando entram em funcionamento na Ethereum. Não se pode simplesmente editar o código (as regras das DAO) sem que as pessoas se apercebam, porque tudo é público.

<DocLink href="/smart-contracts/">
  Mais sobre contratos inteligentes
</DocLink>

## Ethereum e DAO {#ethereum-and-daos}

A Ethereum é a base perfeita para DAO por uma série de razões:

- O próprio consenso da Ethereum é distribuído e estabelecido o suficiente para que as organizações confiem na rede.
- O código do contrato inteligente não pode ser modificado uma vez ativo, nem mesmo pelos seus proprietários. Isto permite que a DAO funcione de acordo com as regras com que foi programado.
- Os contratos inteligentes podem enviar e receber fundos. Sem isso, seria necessário um intermediário de confiança para gerir os fundos do grupo.
- A comunidade Ethereum provou ser mais colaborativa do que competitiva, permitindo que as melhores práticas e sistemas de apoio surjam rapidamente.

## Governança DAO {#dao-governance}

Há muitas considerações a ter em conta quando se governa uma DAO, tais como o modo de funcionamento da votação e das propostas.

### Delegação {#governance-delegation}

A delegação é a versão DAO da democracia representativa. Os detentores de tokens delegam os votos em utilizadores que se nomeiam a si próprios e se comprometem a gerir o protocolo e a manterem-se informados.

#### Um exemplo famoso {#governance-example}

[ENS](https://claim.ens.domains/delegate-ranking) - Os titulares de ENS podem delegar os seus votos em membros da comunidade empenhados em representá-los.

### Governação automática de transações {#governance-example}

Em muitas DAO, as transações serão automaticamente executadas se um quórum de membros votar favoravelmente.

#### Um exemplo famoso {#governance-example}

[Nouns](https://nouns.wtf) - Na Nouns DAO, uma transação é automaticamente executada se houver quórum de votos e a maioria votar afirmativamente, desde que não seja vetada pelos fundadores.

### Governança Multisig {#governance-example}

Enquanto as DAO podem ter milhares de membros votantes, os fundos podem viver numa carteira partilhada por 5 a 20 membros ativos da comunidade que são de confiança e geralmente doxxed (identidades públicas conhecidas pela comunidade). Após uma votação, os signatários multisig executam a vontade da comunidade.

## Leis DAO {#dao-laws}

Em 1977, o estado Americano de Wyoming inventou a LLC, que protege os empresários e limita a sua responsabilidade. Mais recentemente, foram os pioneiros da lei DAO, que estabelece o estatuto jurídico das DAO. Atualmente, os estados Americanos do Wyoming, Vermont e as Ilhas Virgens têm leis equivalentes à lei DAO.

### Um exemplo famoso {#law-example}

[CityDAO](https://citydao.io) - A CityDAO utilizou a lei DAO do Wyoming para comprar 40 acres de terreno perto do Parque Nacional de Yellowstone.

## Adesão à DAO {#dao-membership}

Existem diferentes modelos de adesão à DAO. Os membros podem determinar como funciona a votação e outras áreas importantes do DAO.

### Adesão baseada em tokens {#token-based-membership}

Normalmente sem permissões, dependendo do token utilizado. Na sua maioria, estes tokens de governação podem ser negociados sem autorização, numa bolsa descentralizada. Outros devem ser ganhos através do fornecimento de liquidez ou de alguma outra "prova de trabalho". De qualquer forma, a simples posse do token dá acesso às votações.

_Tipicamente utilizado para gerir protocolos descentralizados alargados e/ou os próprios tokens._

#### Um exemplo famoso {#token-example}

[MakerDAO](https://makerdao.com) - O token MKR da MakerDAO está amplamente disponível em bolsas descentralizadas e qualquer pessoa pode comprar para ter poder de voto no futuro do protocolo Maker.

### Participação com base em ações {#share-based-membership}

As DAO baseadas em ações são mais controladas, mas ainda assim bastante abertas. Todos os potenciais membros podem apresentar uma proposta de adesão à DAO, oferecendo normalmente um tributo de algum valor sob a forma de tokens ou trabalho. As ações representam o poder de voto direto e a propriedade. Os membros podem sair a qualquer momento com a sua parte proporcional da tesouraria.

_Tipicamente utilizado para organizações mais unidas e centradas no ser humano, como instituições de caridade, coletivos de trabalhadores e clubes de investimento. Podem também gerir protocolos e tokens._

#### Um exemplo famoso {#share-example}

[MolochDAO](http://molochdao.com/) - A MolochDAO está focada no financiamento de projetos Ethereum. É necessária uma proposta de adesão para que o grupo possa avaliar se o proponente tem os conhecimentos e o capital necessários para fazer juízos informados sobre potenciais beneficiários. Não se pode simplesmente comprar o acesso ao DAO no mercado aberto.

### Adesão com base na reputação {#reputation-based-membership}

A reputação representa uma prova de participação e concede poder de voto na DAO. Ao contrário da adesão baseada em tokens ou acções, as DAO baseadas na reputação não transferem a propriedade para os seus contribuintes. A reputação não pode ser comprada, transferida ou delegada; os membros da DAO devem ganhar reputação através da sua participação. A votação em cadeia não tem permissões e os potenciais membros podem apresentar livremente propostas de adesão à DAO e pedir para receber reputação e tokens como recompensa em troca das suas contribuições.

_Tipicamente utilizado para o desenvolvimento descentralizado e governação de protocolos e dapps, mas também adequado a um conjunto diversificado de organizações como instituições de caridade, coletivos de trabalhadores, clubes de investimento, etc._

#### Um exemplo famoso {#reputation-example}

[DXdao](https://DXdao.eth.link) - DXdao é um coletivo soberano global que constrói e governa protocolos e aplicações descentralizadas desde 2019. Utiliza a governação baseada na reputação e o consenso holográfico para coordenar e gerir fundos, o que significa que ninguém pode comprar o seu caminho para influenciar o seu futuro.

## Aderir / criar uma DAO {#join-start-a-dao}

### Join a DAO {#join-a-dao}

- [DAO da comunidade Ethereum](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [Lista DAOHaus de DAO](https://app.daohaus.club/explore)
- [Lista de DAO da Tally.xyz](https://www.tally.xyz)

### Criar uma DAO {#start-a-dao}

- [Invocar uma DAO com DAOHaus](https://app.daohaus.club/summon)
- [Iniciar uma DAO governamental com o Tally](https://www.tally.xyz/add-a-dao)
- [Criar uma DAO com tecnologia Aragon](https://aragon.org/product)
- [Criar uma colónia](https://colony.io/)
- [Criar uma DAO com o consenso holográfico da DAOstack](https://alchemy.daostack.io/daos/create)

## Leitura adicional {#further-reading}

### Artigos DAO {#dao-articles}

- [O que é uma DAO?](https://aragon.org/dao) - [Aragon](https://aragon.org/)
- [O manual da DAO](https://daohandbook.xyz)
- [A Casa das DAO](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) - [Metagame](https://wiki.metagame.wtf/)
- [O que é e para que serve uma DAO?](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for) - [DAOhaus](https://daohaus.club/)
- [Como iniciar uma comunidade digital potenciada por DAO](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) - [DAOhaus](https://daohaus.club/)
- [O que é uma DAO?](https://coinmarketcap.com/alexandria/article/what-is-a-dao) - [Coinmarketcap](https://coinmarketcap.com)
- [O que é o Consenso Holográfico?](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c) - [DAOstack](https://daostack.io/)
- [As DAO não são empresas: onde é importante a descentralização em organizações autónomas, por Vitalik](https://vitalik.eth.limo/general/2022/09/20/daos.html)
- [DAO, DAC, DA e mais: Um Guia de Terminologia Incompleto](https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide) - [Blog do Ethereum](https://blog.ethereum.org)

### Vídeos {#videos}

- [O que é uma DAO em criptografia?](https://youtu.be/KHm0uUPqmVE)
- [Uma DAO pode construir uma cidade?](https://www.ted.com/talks/scott_fitsimones_could_a_dao_build_the_next_great_city) - [TED](https://www.ted.com/)
