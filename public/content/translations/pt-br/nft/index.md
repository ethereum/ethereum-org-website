---
title: Tokens não fungíveis (NFT)
description: Uma visão geral de NFTs na Ethereum
lang: pt-br
template: use-cases
emoji: ":frame_with_picture:"
sidebarDepth: 2
image: /images/infrastructure_transparent.png
alt: Um logotipo Eth sendo exibido via holograma.
summaryPoint1: Uma forma de representar qualquer coisa única como um ativo baseado no Ethereum.
summaryPoint2: Os NFTs estão dando mais poder do que nunca aos criadores de conteúdo.
summaryPoint3: Desenvolvido por contratos inteligentes na blockchain Ethereum.
---

## O que são NFTs? {#what-are-nfts}

NFTs são tokens que são individualmente exclusivos. Cada NFT contém diferentes propriedades (não-fungíveis) e é comprovadamente escasso. Isto é diferente de tokens como ERC-20, em que cada token em um conjunto é idêntico e tem as mesmas propriedades ('fungível'). Você não se importa com a nota de dólar específica que tem em sua carteira, porque todas são idênticas e têm o mesmo valor. Entretanto, você _se importa_ com o NFT específico que tem, porque todos têm propriedades individuais que os distinguem dos demais ("não fungíveis").

A exclusividade de cada NFT permite a tokenização de itens como arte, colecionáveis ou inclusive imóveis, em que um NFT exclusivo específico representa um item real ou digital único específico. A propriedade de um ativo é garantida pelo blockchain Ethereum – ninguém pode alterar o registro de propriedade ou copiar/colar um novo NFT.

<YouTube id="Xdkkux6OxfM" />

## A Internet de ativos {#internet-of-assets}

Os NFTs e Ethereum resolvem alguns dos problemas que existem na internet atualmente. À medida que tudo se torna mais digital, há uma necessidade de replicar as propriedades de itens físicos, como escassez, exclusividade e prova de propriedade. de uma maneira não controlada por uma organização central. Por exemplo, com os NFTs, você pode ser titular de um mp3 de música que não é específico do aplicativo de música de uma empresa, ou pode ter um identificador de rede social que pode ser vendido ou trocado, mas que não pode ser arbitrariamente retirado de você por um provedor de plataforma.

Veja como é uma Internet de NFTs comparada à Internet que a maioria de nós usa atualmente...

### Uma comparação {#nft-comparison}

| Uma Internet NFT                                                                                                                                                 | A Internet hoje                                                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Você é proprietário dos seus ativos! Apenas você pode vender ou trocá-los.                                                                                       | Você aluga um ativo de uma organização.                                                                                                                                     |
| Os NFTs são digitalmente exclusivos e não há dois NFTs idênticos.                                                                                                | A cópia de uma entidade geralmente não pode ser distinguida da original.                                                                                                    |
| A propriedade de um NFT é armazenada no blockchain e qualquer pessoa pode verificar.                                                                             | Os registros de propriedade de itens digitais são armazenados em servidores controlados por instituições, e você precisa confiar nelas.                                     |
| NFTs são contratos inteligentes no Ethereum. Isso significa que eles podem facilmente ser utilizados em outros contratos inteligentes e aplicativos no Ethereum! | As empresas com itens digitais geralmente exigem uma infraestrutura exclusiva de "jardim murado".                                                                           |
| Os criadores de conteúdo podem vender o trabalho deles em qualquer lugar e acessar um mercado global.                                                            | Os criadores dependem da infraestrutura e da distribuição das plataformas que utilizam. Essas normalmente estão sujeitas a termos de utilização e a restrições geográficas. |
| Os criadores de NFT podem manter os direitos de propriedade sobre seu próprio trabalho e programar os royalties diretamente no contrato do NFT.                  | As plataformas, como os serviços de streaming de música, retêm a maior parte dos lucros das vendas.                                                                         |

## Como funcionam os NFTs? {#how-nfts-work}

Como qualquer token emitido no Ethereum, NFTs são emitidos por um contrato inteligente. O contrato inteligente está em conformidade com uma das diversas normas NFT (geralmente ERC-721 ou ERC-1155) que definem as funções do contrato. O contrato pode criar ("mintar") NFTs e atribuí-los a um proprietário específico. A propriedade é definida no contrato por meio do mapeamento de NFTs específicos a endereços específicos. O NFT tem um identificador (ID) e normalmente metadados associados que fazem com que o token específico seja exclusivo.

Quando alguém cria ou minta um NFT, o que a pessoa está fazendo é executar uma função do contrato inteligente que atribui um NFT específico ao respectivo endereço. Essas informações são armazenadas no armazenamento do contrato, que faz parte do blockchain. O criador do contrato pode escrever lógica adicional no contrato, por exemplo, para limitar o fornecimento total ou definir um royalty a ser pago ao criador sempre que um token é transferido.

## Para que servem os NFTs? {#nft-use-cases}

NFTs são utilizados para diversos fins, inclusive:

- comprovar que você participou de um evento
- certificar que você concluiu um curso
- itens que podem ser adquiridos em jogos
- arte digital
- tokenização de ativos reais
- comprovar a sua identidade online
- obter acesso a conteúdo
- emissão de ingressos
- nomes de domínios de internet descentralizados
- garantia colateral em DeFi

Você pode ser um artista que quer compartilhar o seu trabalho utilizando NFTs, sem perder o controle ou sacrificar os seus lucros porque precisa pagar intermediários. Você pode criar um novo contrato e especificar o número de NFTs, as propriedades e um link para um trabalho artístico específico. Como artista, você pode programar, no contrato inteligente, os royalties que deverá receber (por exemplo, transferir 5% do preço de venda ao proprietário do contrato sempre que um NFT é transferido). Além disso, você pode sempre comprovar que criou os NFTs, pois é o titular da carteira que implantou o contrato. Os seus compradores podem facilmente comprovar que são titulares de um NFT autêntico da sua coleção porque o endereço da carteira deles está associado a um token no seu contrato inteligente. Eles podem usá-lo em todo o ecossistema Ethereum, com certeza da autenticidade.

Ou, por exemplo, considere um ingresso para um evento esportivo. Assim como o organizador de um evento pode escolher quantos ingressos vender, o criador de um NFT pode decidir quantas réplicas existem. Às vezes, são réplicas exatas, como 5 mil ingressos de acesso geral. Por vezes, são mintados diversos ingressos muito semelhantes, mas cada um ligeiramente diferente, como um ingresso com um assento designado. Eles podem ser comprados e vendidos ponto a ponto, sem precisar pagar processadores de ingressos, e o comprador tem sempre a garantia da autenticidade do ingresso ao verificar o endereço do contrato.

No site ethereum.org, os NFTs são utilizados para demonstrar que as pessoas contribuíram com o nosso repositório Github ou participaram de reuniões, e temos inclusive o nosso próprio nome de domínio NFT. Se você contribuir no ethereum.org, poderá reivindicar um NFT tipo POAP, protocolo de comprovação de presença. Alguns meetups de cripto usam POAPs como ingresso. [Mais sobre contribuição](/contributing/#poap).

![blog ethereum.org](./poap.png)

Este site também tem um nome de domínio alternativo fornecido por NFTs, **ethereum.eth**. Nosso endereço `.org` é gerenciado centralmente por um provedor de nomes de domínio (DNS), enquanto ethereum`. eth` está registrado na Ethereum por meio do Serviço de Nome Ethereum (ENS). Nós somos os titulares e responsáveis pela administração do site. [Confira nosso registro ENS](https://app.ens.domains/name/ethereum.eth)

[Mais sobre ENS](https://app.ens.domains)

<Divider />

### Segurança do NFT {#nft-security}

A segurança do Ethereum vem da prova de participação. O sistema foi projetado para desincentivar economicamente ações maliciosas, o que faz com que o Ethereum seja à prova de adulteração. É isso que possibilita a existência dos NFTs. Assim que o bloco que contém a sua transação de NFT é finalizado, um invasor teria que gastar milhões de ETH para alterá-lo. Qualquer pessoa que execute o software Ethereum poderá detectar imediatamente a adulteração desonesta de um NFT, e o agente mal-intencionado será penalizado economicamente e expulso.

Os problemas de segurança relacionados aos NFTs são, na maioria das vezes, relacionados a golpes de phishing, vulnerabilidades de contratos inteligentes ou erros do usuário (como a exposição inadvertida de chaves privadas), o que faz com que a segurança adequada da carteira seja essencial para os proprietários de NFTs.

<ButtonLink href="/security/">
  Mais sobre segurança
</ButtonLink>

## Leitura adicional {#further-reading}

- [Um guia sobre NFTs para iniciantes](https://linda.mirror.xyz/df649d61efb92c910464a4e74ae213c4cab150b9cbcc4b7fb6090fc77881a95d) – _Linda Xie, janeiro de 2020_
- [Rastreador de NFT Etherscan](https://etherscan.io/nft-top-contracts)
- [Padrão de token ERC-721](/developers/docs/standards/tokens/erc-721/)
- [Padrão de token ERC-1155](/developers/docs/standards/tokens/erc-1155/)

<Divider />

<QuizWidget quizKey="nfts" />
