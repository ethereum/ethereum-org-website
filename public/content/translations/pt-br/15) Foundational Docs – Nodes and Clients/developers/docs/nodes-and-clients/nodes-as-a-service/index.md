---
title: Nós como serviço
description: Uma visão inicial dos nós como um serviço, os prós e contras e os provedores mais populares.
lang: pt-br
sidebarDepth: 2
---

## Introdução {#Introduction}

Executar o seu próprio [nó Ethereum](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) pode ser desafiador, especialmente quando for iniciado ou escalando rápido. Há [vários serviços](#popular-node-services) que executam a infraestrutura do nó otimizada para você, para que você possa se concentrar no desenvolvimento da sua aplicação ou produto. Vamos explicar como os serviços de nó funcionam, os prós e os contras para usá-los e listar provedores se você estiver interessado em começar.

## Pré-requisitos {#prerequisites}

Se você ainda não sabe o que são os nós e os clientes e como eles funcionam, confira [Nós e clientes](/developers/docs/nodes-and-clients/).

## Participantes {#stakoooooooooooooors}

Os participantes individuais devem executar sua própria infraestrutura, em vez de depender de provedores de terceiros. Isso significa executar um cliente de execução acoplado a um cliente de consenso. Antes da [Fusão](/roadmap/merge) (The Merge), era possível executar apenas um cliente de consenso e usar um provedor centralizado para dados de execução. Porém, isso não é mais possível: um participante individual deve executar ambos os clientes. No entanto, há serviços disponíveis para facilitar este processo.

[Leia mais sobre execução de um nó](/developers/docs/nodes-and-clients/run-a-node/).

Os serviços descritos nesta página são para nós não participantes.

## Como funcionam os serviços de nós? {#how-do-node-services-work}

Os provedores de nós disponibilizam sua infraestrutura para você não precisar de uma.

Esses serviços são geralmente fornecem uma chave API que você pode usar para gravar e ler as informações dentro da cadeia de blocos. Muitas vezes, incluindo acesso a [redes de testes Ethereum](/developers/docs/networks/#ethereum-testnets) além da rede principal.

Alguns serviços oferecem a você o seu próprio nó dedicado que eles gerenciam para você, enquanto outros usam os balanceadores de carga para distribuir atividade entre nós.

Quase todos os serviços de nó são extremamente fáceis de integrar, envolvendo uma alteração de linha no seu código para trocar seu nó hospedado, ou até mesmo alternar entre os próprios serviços.

Muitas vezes os serviços de nó executam uma variedade de [clientes de nó](/developers/docs/nodes-and-clients/#execution-clients) e [tipos](/developers/docs/nodes-and-clients/#node-types), permitindo que você acesse nós completos e arquive, além dos métodos específicos do cliente em uma API.

É importante notar que os serviços de nós não armazenam nem devem armazenar suas chaves ou informações privadas.

## Quais são os benefícios do uso do serviço de nós? {#benefits-of-using-a-node-service}

O principal benefício para usar um serviço de nós é não ter de gastar tempo de engenharia mantendo e gerenciando nós você mesmo. Isso permite que você se concentre na construção do seu produto em vez de se preocupar com a manutenção da infraestrutura.

Executar seus próprios nós pode ser muito caro, quer seja de armazenamento, largura de banda, quer de tempo de engenharia. Dispor de mais nós ao dimensionar, atualizar nós para as versões mais recentes e garantir a consistência dos estados pode roubar tempo para criar e usar recursos no seu produto web3 desejado.

## Quais são os contras do uso do serviço de nós? {#cons-of-using-a-node-service}

Usando um serviço nó você está centralizando o aspecto da infraestrutura do seu produto. Por esse motivo, os projetos que dão à descentralização a maior importância podem preferir nós de auto-hospedagem a terceirizar o serviço a terceiros.

Leia mais sobre os [benefícios de executar o seu próprio nó](/developers/docs/nodes-and-clients/#benefits-to-you).

## Serviços de nós populares {#popular-node-services}

Segue uma lista de alguns dos fornecedores de nós para Ethereum mais populares. Sinta-se à vontade para adicionar qualquer um que estiver faltando! Cada nó de serviço oferece diferentes benefícios e recursos, além de níveis gratuitos ou pagos. Você deve analisar quais deles melhor se adaptam às suas necessidades antes de tomar uma decisão.

- [**Alchemy**](https://alchemy.com/)
  - [Documentos](https://docs.alchemyapi.io/)
  - Recursos
    - Maior camada gratuita com 300M unidades de computação por mês (aproximadamente 30M solicitações getLatestBlock)
    - Suporte multicadeia para Polygon, Starknet, Otimizm, Arbitrum
    - Atingindo cerca de 70% do maior volume de transações DeFi e dapps Ethereum
    - Webhooks em tempo real via Alchemy Notify
    - O melhor suporte e confiabilidade / estabilidade
    - API NFT da Alchemy
    - Painel com Request Explorer, Mempool Watcher e Composer
    - Acesso à torneira para testes integrados
    - Comunidade ativa de construtores do Discord com 18 mil usuários

- [**Todo esse nó**](https://allthatnode.com/)
  - [Documentos](https://docs.allthatnode.com/)
  - Funcionalidades
    - 50.000 solicitações por dia com o nível gratuito
    - Suporte para mais de 40 protocolos
    - APIs JSON-RPC (EVM, Tendermint), REST e Websocket suportadas
    - Acesso ilimitado por data do arquivo
    - Suporte técnico 24/7 e 99,9% de tempo de atividade
    - Faucet disponível em múltiplas cadeias
    - Acesso ilimitado a endpoints com um número ilimitado de chaves de API
    - API de rastreamento/depuração suportada
    - Atualizações automatizadas

- [**Amazon Managed Blockchain**](https://aws.amazon.com/managed-blockchain/)
  - [Documentação](https://aws.amazon.com/managed-blockchain/resources/)
  - Recursos
    - Os nós de Ethereum são completamente gerenciados
    - Disponíveis em seis regiões
    - JSON-RPC sobre HTTP e WebSockets seguros
    - Suporta 3 cadeias
    - SLA, Suporte AWS 24/7
    - Go-ethereum and Lighthouse

- [**Ankr**](https://www.ankr.com/)
  - [Documentação](https://docs.ankr.com/)
  - Recursos
    - Protocolo Ankr – Código livre para pontos de extremidade de API RPC públicos para mais de 8 cadeias
    - Monitoramento da integridade do nó e balanceamento de carga para um gateway rápido de confiável até o nó mais próximo disponível
    - Nível premium que habilita o ponto de extremidade WSS e o limite de taxa sem teto
    - Implementação de um nó completo em um clique e um nó validador para mais de 40 cadeias
    - Dimensione conforme suas necessidades
    - Ferramentas de análise
    - Painel
    - Pontos de extremidade RPC, HTTPS e WSS
    - Suporte direto

- [**Blast**](https://blastapi.io/)
  - [Documentação](https://docs.blastapi.io/)
  - Recursos
    - Suporte a RPC e WSS
    - Hospedagem de nós multirregiões
    - Infraestrutura descentralizada
    - API pública
    - Plano Gratuito Dedicado
    - Suporte a multicadeias (mais de 17 cadeias de blocos)
    - Nós de arquivo
    - Suporte ao Discord 24/7
    - Monitoramento e alertas 24/7
    - Um SLA geral de 99,9%
    - Pague em criptomoedas

- [**BlockDaemon**](https://blockdaemon.com/)
  - [Documentação](https://ubiquity.docs.blockdaemon.com/)
  - Benefícios
    - Painel
    - Base por nó
    - Análise

- [**BlockPI**](https://blockpi.io/)
  - [Documentação](https://docs.blockpi.io/)
  - Recursos
    - Estrutura de nós robusta & distribuída
    - Até 40 pontos de extremidade HTTPS e WSS
    - Pacote gratuito de inscrição e pacote mensal
    - Método de rastreamento + suporte aos dados de arquivos
    - Validade dos pacotes até 90 dias,
    - Plano personalizado e pagamento conforme o uso
    - Pague em criptomoedas
    - Suporte direto & Suporte técnico

- [**Chainbase**](https://www.chainbase.com/)
  - [Documentação](https://docs.chainbase.com)
  - Recursos
    - Serviço RPC altamente disponível, rápido e escalável
    - Suporte multicadeia
    - Tarifas gratuitas
    - Painel amigável
    - Fornece serviços de dados blockchain além do RPC

- [**Chainstack**](https://chainstack.com/)
  - [Documentação](https://docs.chainstack.com/)
  - Recursos
    - Nós compartilhados gratuitos
    - Arquivos compartilhados de nós
    - Suporte ao GraphQL
    - Pontos de extremidade RPC e WSS
    - Nós dedicados completos e arquivados
    - Tempo de sincronização rápido para implantações dedicadas
    - Traga sua própria nuvem
    - Valor do pagamento por hora
    - Suporte direto 24/7

- [**DataHub**](https://datahub.figment.io)
  - [Documentos](https://docs.figment.io/)
  - Recursos
    - Opção de camada gratuita com 3.000.000 pedidos/mês
    - Pontos de extremidade RPC e WSS
    - Nós dedicados completos e arquivados
    - Escalonamento automático (Descontos de volume)
    - Dados de arquivamento grátis
    - Análise do Serviço
    - Painel
    - Suporte Direto 24/7
    - Pague em criptomoedas (Enterprise)

- [**DRPC**](https://drpc.org/)
  - [Documentação](https://docs.drpc.org/)
  - Recursos
    - Nós RPC descentralizados
    - Mais de 15 provedores de nós
    - Balanceamento de nós
    - Unidades de computação ilimitadas por mês na camada gratuita
    - Verificação de dados
    - Pontos de extremidade personalizados
    - Endpoints HTTP e WSS
    - Chaves ilimitadas (camada paga e gratuita)
    - Opções de fallback flexíveis
    - [Endpoint público](https://eth.drpc.org)
    - Nós de arquivos compartilhados gratuitos

- [**GetBlock**](https://getblock.io/)
  - [Documentação](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Recursos
    - Acesso a mais de 40 nós de blockchain
    - 40.000 solicitações diárias gratuitas
    - Número ilimitado de chaves de API
    - Alta velocidade de conexão em 1GB/segundo
    - Rastrear+Arquivar
    - Análises avançadas
    - Atualizações automatizadas
    - Suporte técnico

- [**InfStones**](https://infstones.com/)
  - Recursos
    - Opção de nível gratuito
    - Dimensione conforme suas necessidades
    - Análise
    - Painel
    - Terminais de API únicos
    - Nós completos dedicados
    - Tempo de sincronização rápido para implantações dedicadas
    - Suporte direto 24/7
    - Acesso a mais de 50 nós da blockchain

- [**Infura**](https://infura.io/)
  - [Documentação](https://infura.io/docs)
  - Recursos
    - Opção de nível gratuito
    - Dimensione conforme suas necessidades
    - Dados de arquivos pagos
    - Suporte direto
    - Painel

- [**Kaleido**](https://kaleido.io/)
  - [Documentação](https://docs.kaleido.io/)
  - Recursos
    - Nível inicial gratuito
    - Implementação do nó Ethereum em um clique
    - Clientes e algoritmos personalizáveis (Geth, Quorum e Besu || PoA, IBFT e Raft)
    - Mais de 500 APIs administrativas e de serviço
    - Interface RESTful para envio de transação Ethereum (com Apache Kafka)
    - Fluxos de saída para entrega de eventos (com Apache Kafka)
    - Profunda coleção de serviços “fora da cadeia” e auxiliares (por exemplo, transporte de mensagens criptografadas bilaterais)
    - Integração de rede direta com controle de governança e acesso baseado em funções
    - Gerenciamento de usuários sofisticado para administradores e usuários finais
    - Infraestrutura altamente escalonável, resiliente e de nível empresarial
    - Gerenciamento de chaves privadas HSM
    - Compartilhamento de Internet da Mainnet (Rede principal) Ethereum
    - Certificações de tipo 2, ISO 27k e SOC 2
    - Configuração dinâmica de execução (por exemplo, adicionar integrações na nuvem, alterar entradas do nó, etc.)
    - Suporte a orquestrações multinuvem, multirregião e de implantação híbrida
    - Preços simples baseados em SaaS por hora
    - SLAs e suporte 24x7

- [**Lava Network**](https://www.lavanet.xyz/)
  - [Documentação](https://docs.lavanet.xyz/)
  - Recursos
    - Utilização gratuita da Testnet
    - Redundância descentralizada para um tempo de atividade elevado
    - Código aberto
    - SDK totalmente descentralizado
    - Integração Ethers.js
    - Interface intuitiva de gestão de projetos
    - Integridade dos dados baseada em consenso
    - Suporte multicadeia

- [**Moralis**](https://moralis.io/)
  - [Documentação](https://docs.moralis.io/)
  - Recursos
    - Nós compartilhados gratuitos
    - Nós de arquivos compartilhados gratuitos
    - Focado na privacidade (sem política de registros)
    - Suporte entre cadeias
    - Dimensione conforme suas necessidades
    - Painel
    - SDK único do Ethereum
    - Terminais de API únicos
    - Suporte técnico direto

- [**NodeReal MegaNode**](https://nodereal.io/)
  - [Documentação](https://docs.nodereal.io/nodereal/meganode/introduction)
  - Recursos
    - Serviços confiáveis, rápidos e dimensionáveis da API RPC
    - API aprimorada para desenvolvedores Web3
    - Suporte multicadeia
    - Comece gratuitamente

- [**NOWNodes**](https://nownodes.io/)
  - [Documentos](https://documenter.getpostman.com/view/13630829/TVmFkLwy)
  - Recursos
    - Acesso a mais de 50 nós da blockchain
    - Chave de API gratuita
    - Exploradores de bloco
    - Tempo de resposta da API ⩽ 1 segundo
    - Equipe de suporte 24/7
    - Gerente de conta pessoal
    - Nós compartilhados, de arquivo, de cópia de segurança e dedicados

- [**Pocket Network**](https://www.pokt.network/)
  - [Documentos](https://docs.pokt.network/home/)
  - Recursos
    - Protocolo RPC descentralizado e mercado
    - 1 milhão de solicitações gratuitas por dia (por ponto de extremidade, máx. 2)
    - [Pontos de extremidade públicos](https://docs.pokt.network/developers/public-endpoints)
    - Programa Pre-Stake+ (se você precisar de mais de 1 milhão de solicitações por dia)
    - Mais de 15 blockchains compatíveis
    - Mais de 6.400 nós com ganhos de POKT a serviço dos aplicativos
    - Nó de arquivamento, nó de arquivamento com rastreamento e suporte a nós na rede de teste
    - Diversidade do cliente do nó da rede principal Ethereum
    - Nenhum ponto único de falha
    - Sem tempo de inatividade
    - Tokenomics rentáveis e perto de zero (participação de POKT uma vez para a largura de banda da rede)
    - Sem custos irrecuperáveis mensais. Transforme sua infraestrutura em um ativo
    - Balanceamento de carga incorporado ao protocolo
    - Dimensione infinitamente o número de solicitações por dia e nós por hora conforme o uso
    - A opção mais particular e resistente à censura
    - Suporte prático para desenvolvedores
    - Painel e ferramentas de análise do [Pocket Portal](https://bit.ly/ETHorg_POKTportal)

- [**QuickNode**](https://www.quicknode.com)
  - [Documentos](https://www.quicknode.com/docs/)
  - Recursos
    - Suporte técnico 24/7 e comunidade de desenvolvedores do Discord
    - Rede de baixa latência, geograficamente equilibrada e multinuvem/metal
    - Suporte multicadeia (Optimism, Arbitrum, Polygon + 11 outros)
    - Camadas intermediárias para velocidade e estabilidade (roteamento de chamadas, cache, indexação)
    - Monitoramento de contratos inteligentes via Webhooks
    - Painel intuitivo, conjunto de análises, compositor RPC
    - Funcionalidades avançadas de segurança (JWT, mascaramento, lista de permissões)
    - Dados e API de análise de NFT
    - [Certificação SOC2](https://www.quicknode.com/security)
    - Adequado para desenvolvedores e empresas

- [**Rivet**](https://rivet.cloud/)
  - [Documentos](https://rivet.readthedocs.io/en/latest/)
  - Recursos
    - Opção de nível gratuito
    - Dimensione conforme suas necessidades

- [**SenseiNode**](https://senseinode.com)
  - [Documentos](https://docs.senseinode.com/)
  - Recursos
    - Nós dedicados e compartilhados
    - Painel
    - Hospedagem fora da AWS em vários provedores de hospedagem em diferentes locais da América Latina
    - Clientes Prysm e Lighthouse

- [**SettleMint**](https://console.settlemint.com/)
  - [Documentos](https://docs.settlemint.com/)
  - Recursos
    - Avaliação gratuita
    - Dimensione conforme suas necessidades
    - Suporte ao GraphQL
    - Pontos de extremidade RPC e WSS
    - Nós completos dedicados
    - Traga sua própria nuvem
    - Ferramentas de análise
    - Painel
    - Valor do pagamento por hora
    - Suporte direto

- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [Documentos](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - Recursos
    - Nível gratuito, incluindo 25 milhões de unidades Tenderly por mês
    - Acesso gratuito aos dados históricos
    - Cargas de trabalho de leitura pesada até 8 vezes mais rápidas
    - Acesso de leitura 100% consistente
    - Endpoints JSON-RPC
    - Construtor de solicitações RPC baseado em interface de usuário e pré-visualização de solicitações
    - Integração rigorosa com as ferramentas de desenvolvimento, depuração e teste do Tenderly
    - Simulações de transação
    - Análise de uso e filtragem
    - Gerenciamento fácil de chaves de acesso
    - Suporte técnico dedicado via chat, e-mail e Discord

- [**Tokenview**](https://services.tokenview.io/)
  - [Documentos](https://services.tokenview.io/docs?type=nodeService)
  - Recursos
    - Suporte técnico 24/7 & comunidade Telegram de desenvolvedores
    - Suporte multichain (Bitcoin, Ethereum, Tron, BNB Smart Chain, Ethereum Classic)
    - Ambos endpoints RPC e WSS estão disponíveis para uso
    - Acesso ilimitado para a API de dados de arquivo
    - Painel com Request Explorer e Mempool Watcher
    - API de dados NFT e notificador Webhook
    - Pagamento em Cripto
    - Suporte externo para requisitos extras de comportamento

- [**Watchdata**](https://watchdata.io/)
  - [Documentos](https://docs.watchdata.io/)
  - Recursos
    - Confiabilidade dos dados
    - Conexão ininterrupta sem tempo de inatividade
    - Automação do processo
    - Tarifas gratuitas
    - Limites altos que se adaptam a qualquer usuário
    - Suporte a vários nós
    - Dimensionamento de recursos
    - Velocidades de processamento altas

- [**ZMOK**](https://zmok.io/)
  - [Documentos](https://docs.zmok.io/)
  - Recursos
    - Front-running como serviço
    - Mempool de transações globais com métodos de pesquisa/filtragem
    - Taxa TX ilimitada e Gás infinito para envio de transações
    - O máximo de velocidade na obtenção do novo bloco e leitura da blockchain
    - O melhor preço garantido por chamada de API

- [**Zeeve**](https://www.zeeve.io/)
  - [Documentos](https://www.zeeve.io/docs/)
  - Recursos
    - Plataforma de automação sem código de nível empresarial que fornece implantação, monitoramento e gerenciamento de nós e redes da Blockchain
    - Mais de 30 protocolos e integrações, e adicionando mais
    - Valor adicionado à infraestrutura de serviços web3 como armazenamento decentralizado, identidade decentralizada e APIs de dados do Blockchain Ledger para casos reais
    - Suporte 24/7 e monitoramento proativo garantem a saúde dos nós o tempo todo.
    - Os endpoints RPC oferecem acesso autenticado às APIs, gerenciamento sem complicações com painel intuitivo e análise.
    - Fornece nuvem gerenciada e traz suas próprias opções de nuvem para escolher, além de oferecer suporte a todos os maiores provedores de nuvem como AWS, Azure, Google Cloud, Digital Ocean e local.
    - Usamos roteamento inteligente para sempre atingir o nó mais próximo de seu usuário


## Leitura adicional {#further-reading}

- [Lista dos serviços de nós Ethereum](https://ethereumnodes.com/)

## Tópicos relacionados {#related-topics}

- [ Nós e clientes](/developers/docs/nodes-and-clients/)

## Tutoriais relacionados {#related-tutorials}

- [Introdução ao desenvolvimento de Ethereum usando Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Guia para enviar transações usando web3 e Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
