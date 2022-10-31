---
title: Nós como serviço
description: Uma visão inicial dos nós como um serviço, os prós e contras e os provedores mais populares.
lang: pt-br
sidebarDepth: 2
---

## Introdução {#Introduction}

Executar o seu próprio [nó Ethereum](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) pode ser desafiador, especialmente quando for iniciado ou escalando rápido. Há [vários serviços](#popular-node-services) que executam a infraestrutura do nó otimizada para você, para que você possa se concentrar no desenvolvimento da sua aplicação ou produto. Vamos explicar como os serviços de nó funcionam, os prós e os contras para usá-los e listar provedores se você estiver interessado em começar.

## Pré-requisitos {#prerequisites}

Se você ainda não sabe o que são os nós e os clientes e como eles funcinam, veja em: [Nós e clientes](/developers/docs/nodes-and-clients/).

## Como funcionam os serviços de nós? {#how-do-node-services-work}

Os provedores de nós disponibilizam sua infraestrutura para você não precisar de uma.

Esses serviços são tipicamente disponibilizados via uma chave API que você pode usar para escrever e ler as informações dentro da cadeia de blocos. Muitas vezes, incluindo acesso a [redes de testes Ethereum](/developers/docs/networks/#ethereum-testnets) além da rede principal.

Alguns serviços oferecem a você o seu próprio nó dedicado que eles gerenciam para você, enquanto outros usam os balanceadores de carga para distribuir atividade entre nós.

Quase todos os serviços de nó são extremamente fáceis de integrar, envolvendo uma alteração de linha no seu código para trocar seu nó hospedado, ou até mesmo alternar entre os próprios serviços.

Muitas vezes os serviços de nó executam uma variedade de [clientes de nó](/developers/docs/nodes-and-clients/#execution-clients) e [tipos](/developers/docs/nodes-and-clients/#node-types), permitindo que você acesse nós completos e arquive, além dos métodos específicos do cliente, em uma API.

É importante notar que os serviços de nós não armazenam nem devem armazenar suas chaves ou informações privadas.

## Quais são os benefícios do uso do serviço de nós? {#benefits-of-using-a-node-service}

O principal benefício para usar um serviço de nós é não ter de gastar tempo de engenharia mantendo e gerenciando nós você mesmo. Isso permite que você se concentre na construção do seu produto em vez de se preocupar com a manutenção da infraestrutura.

Executar seus próprios nós pode ser muito caro, quer seja de armazenamento, largura de banda, quer de tempo de engenharia. Things like spinning up more nodes when scaling, upgrading nodes to the latest versions, and ensuring state consistency, can distract from building and spending resources on your desired web3 product.

## Quais são os benefícios do uso do serviço de nós? {#cons-of-using-a-node-service}

Usando um serviço nó você está centralizando o aspecto da infraestrutura do seu produto. Por este motivo, os projetos que possuem a descentralização a maior importância podem preferir nós de auto-hospedagem a terceirizar de terceiros.

Leia mais sobre os [benefícios de executar o seu próprio nó](/developers/docs/nodes-and-clients/#benefits-to-you).

## Serviços de nós populares {#popular-node-services}

Segue uma lista de alguns dos fornecedores de nós para Ethereum mais populares. Sinta-se à vontade para adicionar qualquer um que estiver faltando! Cada nó de serviço oferece diferentes benefícios e recursos, além de níveis gratuitos ou pagos. Você deve analisar quais deles melhor se adaptam às suas necessidades antes de tomar uma decisão.

- [**Alchemy**](https://www.alchemy.com/)
  - [Documentos](https://docs.alchemyapi.io/)
  - Recursos
    - Opção de nível livre
    - Escale conforme a demanda
    - Dados de arquivo grátis
    - Ferramentas de análise
    - Painel de controle
    - Terminais de API únicos
    - Webhooks
    - Suporte direto
- [**Ankr**](https://www.ankr.com/)
  - [Documentos](https://docs.ankr.com/)
  - Funcionalidades
    - Protocolo Ankr - Código livre para terminais API RPC públicos para mais de 8 cadeias
    - Carregar balanceamento e monitoramento de saúde dos nós para um gateway rápido e confiável para o nó disponível mais próximo
    - Nível premium que habilita o endpoint WSS e limite de taxa sem teto
    - Implementação de um nó completo em um clique e um nó validador para mais de 40 cadeias
    - Adapte conforme suas necessidades
    - Ferramentas de análise
    - Painel Administrativo
    - Endpoints RPC, HTTPS e WSS
    - Suporte direto
- [**BlockDaemon**](https://blockdaemon.com/)
  - [Documentação](https://ubiquity.docs.blockdaemon.com/)
  - Benefícios
    - Painel
    - Base por nó
    - Análises
- [**Chainstack**](https://chainstack.com/)
  - [Documentação](https://docs.chainstack.com/)
  - Recursos
    - Nós compartilhados gratuitos
    - Arquivos compartilhados de nós
    - Suporte a GraphQL
    - Endpoints RPC e WSS
    - Nós dedicados completos e arquivados
    - Tempo de sincronização rápido para implantações dedicadas
    - Traga sua própria nuvem
    - Valor do pagamento por hora
    - Suporte direto 24/7
- [**GetBlock**](https://getblock.io/)
  - [Documentação](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Recursos
    - Acesso a mais de 40 nós da blockchain
    - 40.000 solicitações diárias gratuitas
    - Número ilimitado de chaves de API
    - Alta velocidade de conexão em 1GB/seg
    - Rastrear+Arquivar
    - Análises avançadas
    - Atualizações automatizadas
    - Suporte técnico
- [**InfStones**](https://infstones.com/)
  - Recursos
    - Opção de nível gratuito
    - Adapte conforme suas necessidades
    - Estatísticas
    - Painel Administrativo
    - Terminais de API únicos
    - Nós completos dedicados
    - Tempo de sincronização rápido para implantações dedicadas
    - Suporte direto 24/7
    - Acesso a mais de 50 nós da blockchain
- [**Infura**](https://infura.io/)
  - [Documentação](https://infura.io/docs)
  - Recursos
    - Opção de nível gratuito
    - Adapte conforme suas necessidades
    - Dados de arquivos pagos
    - Suporte direto
    - Painel
- [**Kaleido**](https://kaleido.io/)
  - [Documentação](https://docs.kaleido.io/)
  - Recursos
    - Free startier tier
    - One-click Ethereum node deployment
    - Customizable clients and algorithms (Geth, Quorum & Besu || PoA, IBFT & Raft)
    - 500+ administrative and service APIs
    - RESTful interface for Ethereum transaction submission (Apache Kafka backed)
    - Outbound streams for event delivery (Apache Kafka backed)
    - Deep collection of "off-chain" and ancillary services (e.g. bilateral encrypted messaging transport)
    - Straightforward network onboarding with governance and role-based access control
    - Sophisticated user management for both administrators and end users
    - Highly scalable, resilient, enterprise-grade infrastructure
    - Cloud HSM private key management
    - Ethereum Mainnet Tethering
    - ISO 27k and SOC 2, Type 2 certifications
    - Dynamic runtime configuration (e.g. adding cloud integrations, altering node ingresses, etc.)
    - Support for multi-cloud, multi-region and hybrid deployment orchestrations
    - Simple hourly SaaS-based pricing
    - SLAs and 24x7 support
- [**Moralis**](https://moralis.io/)
  - [Documentação](https://docs.moralis.io/)
  - Recursos
    - Nós compartilhados gratuitos
    - Nós de arquivos compartilhados gratuitos
    - A privacidade focada (sem política de registros)
    - Suporte a cadeia cruzada
    - Escale conforme a demanda
    - Painel de controle
    - SDK único de Ethereum
    - Terminais de API únicos
    - Suporte técnico direto
- [**Rede Pocket**](https://www.pokt.network/)
  - [Documentação](https://docs.pokt.network/home/)
  - Recursos
    - Protocolo RPC e Mercado Descentralizados
    - 1M Solicitações por Nível Gratuito (por ponto de extremidade, max 2)
    - [Terminais Públicos](https://docs.pokt.network/home/resources/public-rpc-endpoints)
    - Programa Pre-Stake+ (se você precisar de mais de 1M pedidos por dia)
    - Mais de 15 Blockchains suportados
    - Mais de 6400 ganha o POKT por servir aplicativos
    - Nó de arquivamento, nó de arquivamento com rastreamento, & Suporte a Nó de Testnet
    - Diversidade do nó principal Ethereum
    - Nenhum Ponto Único de Falha
    - Zero Downtime
    - Cost-Eficaz Near-Zero Tokenomics (stake POKT uma vez para largura de banda da rede)
    - Sem custos afundados mensais, transforme sua infraestrutura em um ativo
    - Balanceamento de Carga incorporado no Protocolo
    - Escala infinitamente o número de solicitações por dia e nós por hora à medida que você avança
    - A opção mais privada e resistente à censura
    - Suporte ao desenvolvedor manual
    - [Portal de bolso](https://bit.ly/ETHorg_POKTportal) painel e análise
- [**QuikNode**](https://www.quiknode.io/)
  - Recursos
    - Teste por 7 dias de graça
    - Suporte variado
    - Webhooks
    - Painel de controle
    - Estatísticas
- [**Rivet**](https://rivet.cloud/)
  - [Documentação](https://rivet.readthedocs.io/en/latest/)
  - Recursos
    - Opção de nível livre
    - Adapte conforme suas necessidades
- [**SettleMint**](https://console.settlemint.com/)
  - [Documentação](https://docs.settlemint.com/)
  - Recursos
    - Avaliação gratuita
    - Escale conforme a demanda
    - Suporte a GraphQL
    - Pontos de extremidade RPC e WSS
    - Nós completos dedicados
    - Traga sua nuvem
    - Ferramentas de análise
    - Painel de controle
    - Preços dos salários por hora
    - Suporte direto
- [**Watchdata**](https://watchdata.io/)
  - [Documentação](https://docs.watchdata.io/)
  - Recursos
    - Data reliability
    - Uninterrupted connection with no downtime
    - Process automation
    - Free tariffs
    - High limits that suit any user
    - Support for various nodes
    - Resource scaling
    - High processing speeds

## Leitura adicional {#further-reading}

- [Lista dos serviços de nós Ethereum](https://ethereumnodes.com/)

## Tópicos relacionados {#related-topics}

- [Nós e clientes](/developers/docs/nodes-and-clients/)

## Tutoriais relacionados {#related-tutorials}

- [Introdução ao desenvolvimento de Ethereum usando Alquimia](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Guia para enviar transações usando web3 e Alquimia](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
