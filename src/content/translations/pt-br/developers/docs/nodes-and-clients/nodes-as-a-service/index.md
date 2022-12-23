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

Os participantes individuais devem executar sua própria infraestrutura, em vez de depender de provedores de terceiros. Isso significa executar um cliente de execução acoplado a um cliente de consenso. Antes da [Fusão](/upgrades/merge), era possível executar apenas um cliente de consenso e usar um provedor centralizado para dados de execução; isso não é mais possível: um participante solo deve executar ambos os clientes. No entanto, há serviços disponíveis para facilitar este processo.

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

## Quais são os benefícios do uso do serviço de nós? {#cons-of-using-a-node-service}

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
- [**DataHub**](https://datahub.figment.io)
  - [Documentação](https://docs.figment.io/)
  - Recursos
    - Opção de camada gratuita com 3.000.000 qs/mês
    - Pontos de extremidade RPC e WSS
    - Nós dedicados e arquivados
    - Escalonamento auromático (Descontos de volume)
    - Dados de arquivamento grátis
    - Análise do Serviço
    - Painel
    - Suporte Direto 24/7
    - Pague em Crypto (Enterprise)
- [**GetBlock**](https://getblock.io/)
  - [Documentação](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Recursos
    - Acesso a mais de 40 nós da blockchain
    - 40K solicitações diárias grátis
    - Número ilimitado de chaves de API
    - Alta velocidade de conexão em 1GB/seg
    - Rastreamento+Arquivar
    - Análises avançadas
    - Atualizações automatizadas
    - Suporte técnico
- [**InfStones**](https://infstones.com/)
  - Recursos
    - Opção de nível livre
    - Escale conforme a demanda
    - Estatísticas
    - Painel
    - Pontos de extremidade de API únicos
    - Nós completos dedicados
    - Tempo de sincronização rápido para implantações dedicadas
    - Suporte direto 24/7
    - Acesso a mais de 50 nós da cadeia de blocos
- [**Infura**](https://infura.io/)
  - [Documentação](https://infura.io/docs)
  - Recursos
    - Opção de nível livre
    - Escale conforme a demanda
    - Dados de arquivos pagos
    - Suporte direto
    - Painel
- [**Kaleido**](https://kaleido.io/)
  - [Documentação](https://docs.kaleido.io/)
  - Recursos
    - Nível inicial gratuito
    - Implementação de nó Ethereum um clique
    - Clientes e algoritmos personalizáveis (Geth, Quorum & Besu ├PoA, IBFT & Raft)
    - Mais de 500 APIs administrativas e de serviço
    - Interface RESTful para envio de transação Ethereum (suporte Apache Kafka)
    - Fluxos de saída para entrega de eventos (suporte Apache Kafka)
    - Profunda coleção de serviços "fora da cadeia" e auxiliares (por exemplo, transporte de mensagens criptografadas bilaterais)
    - Encaminhamento de rede com controle de governança e acesso baseado em papéis
    - Sofisticado gerenciamento de usuários para ambos administradores e usuários finais
    - Infraestrutura altamente escalonável, resiliente, de nível empresarial
    - Gerenciamento de chaves privadas HSM
    - Tethering de rede principal Ethereum
    - Certificações de tipo 2, ISO 27k e SOC 2
    - Configuração dinâmica de execução (por exemplo, adicionar integrações na nuvem, alterar entradas do nó, etc.)
    - Suporte para orquestrações multi-nuvem, multi-região e de implantação híbrida
    - Preços simples por hora do SaaS
    - SLAs e suporte 24x7
- [**Moralis**](https://moralis.io/)
  - [Documentação](https://docs.moralis.io/)
  - Recursos
    - Nós compartilhados gratuitos
    - Nós de arquivos compartilhados gratuitos
    - Privacidade focada (sem política de registros)
    - Suporte a cadeia cruzada
    - Escale conforme a demanda
    - Painel
    - SDK único do Ethereum
    - Terminais de API únicos
    - Suporte técnico direto
- [**NOWNodes**](https://nownodes.io/)
  - [Documentação](https://documenter.getpostman.com/view/13630829/TVmFkLwy)
  - Recursos
    - Acesso a mais de 50 nós da cadeia de blocos
    - Chave de API Gratuita
    - Exploradores de Bloco
    - Tempo de Resposta da API ⩽1 seg
    - Equipe de suporte 24/7
    - Gerente de Conta Pessoal
    - Nós compartilhados, arquivo, cópia de segurança e dedicados
- [**Rede Pocket**](https://www.pokt.network/)
  - [Documentação](https://docs.pokt.network/home/)
  - Recursos
    - Protocolo RPC e mercado descentralizados
    - 1 milhão de solicitações gratuitas por dia (por ponto de extremidade, máx. 2)
    - [Pontos de extremidade públicos](https://docs.pokt.network/home/resources/public-rpc-endpoints)
    - Programa Pre-Stake+ (se você precisar de mais de 1 milhão de solicitações por dia)
    - Mais de 15 cadeias de blocos suportadas
    - Mais de 6.400 nós com ganhos de POKT por atender a aplicativos
    - Nó de arquivamento, nó de arquivamento com rastreamento e suporte a nó de rede de testes
    - Diversidade do nó da rede principal Ethereum
    - Nenhum ponto único de falha
    - Sem tempo de inatividade
    - Tokenomics rentáveis e perto de zero (aposta de POKT uma vez para a largura de banda da rede)
    - Sem custos irrecuperáveis mensais. Transforme sua infraestrutura em um ativo
    - Balanceamento de carga incorporado ao protocolo
    - Adapta infinitamente o número de solicitações por dia e nós por hora à medida que você avança
    - A opção mais privada e resistente à censura
    - Suporte prático para os desenvolvedores
    - Painel e ferramentas de análise [Pocket Portal](https://bit.ly/ETHorg_POKTportal)
- [**QuickNode**](https://www.quicknode.com)
  - [Documentação](https://www.quicknode.com/docs/)
  - Recursos
    - Desempenho e confiabilidade líder do setor
    - Suporte técnico 24/7& Comunidade Discord de desenvolvedores
    - Balanceado geograficamente, multi-nuvem/metal, rede de baixa latência
    - Suporte de múltiplas cadeias (Optimism, Arbitrum, Polygon + 11 outros)
    - Camadas intermediárias para velocidade e estabilidade (roteamento de chamadas, cache, indexação)
    - Monitoramento de contratos inteligentes via Webhooks
    - Painel intuitivo, conjunto de análises, compositor RPC
    - Funcionalidades avançadas de segurança (JWT, mascaramento, lista de permissões)
    - Dados e API de análise da NFT
    - [Certificado SOC2](https://www.quicknode.com/security)
    - Adequado para desenvolvedores e empresas
- [**Rivet**](https://rivet.cloud/)
  - [Documentação](https://rivet.readthedocs.io/en/latest/)
  - Recursos
    - Opção de nível gratuito
    - Redimensione conforme suas necessidades
- [**SenseiNode**](https://senseinode.com)
  - [Documentação](https://docs.senseinode.com/)
  - Recursos
    - Nós dedicados e compartilhados
    - Painel
    - Hospedagem fora da AWS em vários provedores de hospedagem em diferentes locais da América Latina
    - Clientes Prysm e Lighthouse
- [**SettleMint**](https://console.settlemint.com/)
  - [Documentação](https://docs.settlemint.com/)
  - Recursos
    - Avaliação gratuita
    - Redimensione conforme suas necessidades
    - Suporte a GraphQL
    - Pontos de extremidade RPC e WSS
    - Nós completos dedicados
    - Traga sua própria nuvem
    - Ferramentas de análise
    - Painel
    - Valor do pagamento por hora
    - Suporte direto
- [**Watchdata**](https://watchdata.io/)
  - [Documentação](https://docs.watchdata.io/)
  - Recursos
    - Confiabilidade de dados
    - Conexão ininterrupta sem tempo de inatividade
    - Automação do processo
    - Tarifas gratuitas
    - Altos limites que se adaptam a qualquer usuário
    - Suporte para vários nós
    - Escala de recursos
    - Alta velocidade de processamento
- [**ZMOK**](https://zmok.io/)
  - [Documentação](https://docs.zmok.io/)
  - Recursos
    - Executando como serviço Front-running
    - Banco de transações global com métodos de pesquisa/filtragem
    - Taxa TX ilimitada e Gás infinita para envio de transações
    - O máximo de velocidade na obtenção do novo bloco e leitura da cadeia de blocos
    - O melhor preço por garantia de chamada de API

## Leitura adicional {#further-reading}

- [Lista dos serviços de nós Ethereum](https://ethereumnodes.com/)

## Tópicos relacionados {#related-topics}

- [Nós e clientes](/developers/docs/nodes-and-clients/)

## Tutoriais relacionados {#related-tutorials}

- [Introdução ao desenvolvimento de Ethereum usando Alquimia](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Guia para enviar transações usando web3 e Alquimia](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
