---
title: Tokens não fungíveis (NFT)
description: Uma visão geral sobre NFTs na Ethereum
lang: pt
template: use-cases
emoji: ":frame_with_picture:"
sidebarDepth: 2
image: /images/infrastructure_transparent.png
alt: Um logótipo Eth exibido através de um holograma.
summaryPoint1: Uma forma de representar algo único como um ativo baseado na Ethereum.
summaryPoint2: Os NFT estão a dar mais poder do que nunca aos criadores de conteúdo.
summaryPoint3: Desenvolvido por contratos inteligentes na blockchain Ethereum.
---

## What are NFTs? {#what-are-nfts}

Os NFTs são tokens individualmente únicos. Cada NFT tem propriedades diferentes (não fungíveis) e é comprovadamente raro. Isto é diferente de tokens como os ERC-20, em que todos os tokens de um conjunto são idênticos e têm as mesmas propriedades ("fungíveis"). Não interessa que nota específica de dólar tem na sua carteira, porque são todas idênticas e valem o mesmo. No entanto, _não_ importa qual o NFT específico que possui, porque todos eles têm propriedades individuais que os distinguem uns dos outros ("não fungíveis").

A particularidade de cada NFT permite a tokenização de coisas como arte, objetos de coleção ou mesmo bens imobiliários, em que um NFT específico e único representa um item específico e único do mundo real ou digital. A propriedade de um ativo é garantida pela blockchain Ethereum – ninguém pode modificar o registo de propriedade ou copiar/colar um novo NFT.

<YouTube id="Xdkkux6OxfM" />

## A internet dos ativos {#internet-of-assets}

Os NFT e a Ethereum resolvem alguns dos problemas que existem atualmente na Internet. À medida que tudo se torna mais digital, existe a necessidade de replicar as propriedades dos itens físicos como escassez, singularidade, e prova de propriedade. De uma forma que não seja controlada por uma organização central. Por exemplo, com os NFT, pode ser proprietário de um mp3 de música que não seja específico da aplicação de música de uma empresa, ou pode ser proprietário de um identificador de rede social que pode vender ou trocar, mas que não lhe pode ser retirado arbitrariamente por um fornecedor de plataformas.

Veja como se parece uma internet de NFTs em comparação com a internet que a maioria usa hoje em dia...

### Uma comparação {#nft-comparison}

| Uma internet de NFT                                                                                                                                     | A internet atual                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Os ativos são seus! Só você pode vendê-los ou trocá-los.                                                                                                | Aluga um ativo a uma organização.                                                                                                                                           |
| Os NFT são digitalmente únicos, não existem dois NFT iguais.                                                                                            | Uma cópia de uma determinada entidade muitas vezes não pode ser diferenciada do original.                                                                                   |
| A propriedade de um NFT é registada no blockchain para que qualquer pessoa possa verificar.                                                             | Os registos de propriedade de itens digitais são armazenados em servidores controlados por instituições – devemos acreditar na palavra deles.                               |
| Os NFTs são contratos inteligentes na Ethereum. Isto significa que podem ser facilmente usados noutros contratos inteligentes e aplicações na Ethereum! | Geralmente, as empresas com objetos digitais necessitam da sua própria infraestrutura de "jardim amuralhado".                                                               |
| Os criadores de conteúdos podem vender o seu trabalho em qualquer lugar e aceder a um mercado global.                                                   | Os criadores dependem da infraestrutura e distribuição das plataformas que utilizam. Estes estão frequentemente sujeitos aos termos de utilização e restrições geográficas. |
| Os criadores de NFTs podem manter os direitos de propriedade sobre o seu próprio trabalho e programar os direitos de autor diretamente no contrato NFT. | As plataformas, como os serviços de streaming de música, mantêm a maioria dos lucros das vendas.                                                                            |

## Como funcionam os NFT? {#how-nfts-work}

Como qualquer token emitido no Ethereum, os NFTs são gerados por um contrato inteligente. O contrato inteligente está em conformidade com uma das várias normas NFT (geralmente ERC-721 ou ERC-1155) que definem as funções do contrato. O contrato pode criar ("cunhar") NFTs e atribuí-los a um proprietário específico. A propriedade é definida no contrato através do mapeamento de NFTs específicos para endereços específicos. O NFT tem um ID e, normalmente, metadados associados que tornam único o token específico.

Quando alguém cria ou cunha um NFT, está na realidade a executar uma função no contrato inteligente que atribui um NFT específico ao seu endereço. Esta informação é guardada no registo do contrato, que faz parte do blockchain. O criador do contrato pode introduzir lógica adicional no contrato, por exemplo, limitando o fornecimento total ou definindo um royalty a ser pago ao criador sempre que um token é transferido.

## Para que servem os NFT? {#nft-use-cases}

Os NFTs são utilizados para muitas coisas, incluindo:

- prova de que participou num evento
- certificação da conclusão de um curso
- objetos que podem ser adquiridos para jogos
- arte digital
- tokenização de ativos do mundo real
- comprovação da sua identidade online
- acesso condicionado a conteúdos
- bilhete de acesso
- nomes de domínio de internet descentralizados
- garantia em DeFi

Talvez seja um artista que queira partilhar o seu trabalho usando NFTs, sem perder o controlo nem dividir os lucros com intermediários. Pode criar um novo contrato e especificar o número de NFTs, as suas propriedades e uma associação a um trabalho artístico específico. Como artista, pode programar no contrato inteligente os royalties que lhe devem ser pagos (por exemplo, transferir 5% do preço de venda para o proprietário do contrato sempre que um NFT é transferido). Também pode sempre provar que criou os NFTs porque é o proprietário da carteira que desenvolveu o contrato. Os seus clientes podem facilmente provar que possuem um NFT autêntico da sua coleção porque o endereço da sua carteira está associado a um token no seu contrato inteligente. Podem utilizá-lo em todo o ecossistema Ethereum, confiantes na sua autenticidade.

Ou considere um bilhete para um evento desportivo. Tal como o organizador do evento escolhe quantos bilhetes existem para venda, o criador de um NFT pode decidir quantas réplicas existem. Por vezes, tratam-se de réplicas exatas, tal como 5000 bilhetes de acesso geral ao evento. Outras vezes, vários bilhetes cunhados são muito semelhantes, mas com ligeiras diferenças, tal como um bilhete com lugar marcado. Estes bilhetes podem ser comprados e vendidos entre pares sem pagar a quem os distribui e o comprador tem sempre a garantia da autenticidade do bilhete, verificando o endereço do contrato.

Em ethereum.org, os NFTs são usados para demonstrar que as pessoas contribuíram para o nosso repositório GitHub ou participaram em reuniões, e até temos o nosso próprio nome de domínio em NFT. Se é um colaborador de ethereum.org, pode pedir um NFT POAP. Alguns encontros relacionados com as criptomoedas utilizaram POAPs como bilhetes. [Saiba mais sobre como contribuir](/contributing/#poap).

![POAP ethereum.org](./poap.png)

Este site também tem um nome de domínio alternativo alimentado por NFTs, **ethereum.eth**. O nosso endereço `.org` é gerido centralmente por um fornecedor de nomes de domínio (DNS), ao passo que o ethereum`.eth` está registado na Ethereum através do Serviço de Nome Ethereum (ENS). E pertence-nos e é gerido por nós. [Consulte o nosso registo ENS](https://app.ens.domains/name/ethereum.eth)

[Mais sobre ENS](https://app.ens.domains)

<Divider />

### Segurança de NFT {#nft-security}

A segurança da Ethereum provém da prova de participação. O sistema foi concebido para desincentivar economicamente as ações maliciosas, tornando a Ethereum à prova de adulteração. É isto que torna possível a existência dos NFT. Assim que o bloco contendo a sua transação NFT estiver finalizado, custará a um invasor milhões de ETH para o alterar. Qualquer pessoa que execute o software Ethereum seria imediatamente capaz de detetar adulteração desonesta de um NFT e o autor desse feito seria economicamente penalizado e expulso.

As questões de segurança relacionadas com os NFT estão mais frequentemente relacionadas com esquemas de phishing, vulnerabilidades de contratos inteligentes ou erros do utilizador (como a exposição inadvertida de chaves privadas), o que torna a boa segurança da carteira crítica para os proprietários de NFT.

<ButtonLink href="/security/">
  Mais informações sobre segurança
</ButtonLink>

## Leitura adicional {#further-reading}

- [Guia para principiantes sobre NFT](https://linda.mirror.xyz/df649d61efb92c910464a4e74ae213c4cab150b9cbcc4b7fb6090fc77881a95d) - _Linda Xie, janeiro de 2020_
- [Analisador EtherscanNFT](https://etherscan.io/nft-top-contracts)
- [Norma ERC-721 para tokens](/developers/docs/standards/tokens/erc-721/)
- [Norma ERC-1155 para tokens](/developers/docs/standards/tokens/erc-1155/)

<Divider />

<QuizWidget quizKey="nfts" />
