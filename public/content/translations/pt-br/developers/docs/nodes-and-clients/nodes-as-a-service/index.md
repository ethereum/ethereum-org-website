---
title: "Nós como serviço"
description: "Uma visão geral de nível básico sobre serviços de nó, os prós e contras e provedores populares."
lang: pt-br
sidebarDepth: 2
---

## Introdução {#introduction}

Executar o seu próprio [nó do Ethereum](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) pode ser desafiador, especialmente ao começar ou ao escalar rapidamente. Existem [vários serviços](#popular-node-services) que executam infraestruturas de nó otimizadas para você, para que você possa se concentrar no desenvolvimento do seu aplicativo ou produto. Explicaremos como os serviços de nó funcionam, os prós e contras de usá-los e listaremos provedores caso você tenha interesse em começar.

## Pré-requisitos {#prerequisites}

Se você ainda não entende o que são nós e clientes, confira [Nós e clientes](/developers/docs/nodes-and-clients/).

## Stakers {#stakoooooooooooooors}

Stakers individuais devem executar sua própria infraestrutura em vez de depender de provedores terceirizados. Isso significa executar um cliente de execução acoplado a um cliente de consenso. Antes do [The Merge](/roadmap/merge), era possível executar apenas um cliente de consenso e usar um provedor centralizado para dados de execução; isso não é mais possível - um staker individual deve executar ambos os clientes. No entanto, existem serviços disponíveis para facilitar esse processo.

[Leia mais sobre como executar um nó](/developers/docs/nodes-and-clients/run-a-node/).

Os serviços descritos nesta página são para nós que não fazem staking.

## Como funcionam os serviços de nó? {#how-do-node-services-work}

Os provedores de serviços de nó executam clientes de nó distribuídos nos bastidores para você, para que você não precise fazer isso.

Esses serviços geralmente fornecem uma chave de API que você pode usar para gravar e ler na blockchain. Eles frequentemente incluem acesso a [redes de teste do Ethereum](/developers/docs/networks/#ethereum-testnets) além da Mainnet.

Alguns serviços oferecem seu próprio nó dedicado que eles gerenciam para você, enquanto outros usam balanceadores de carga para distribuir a atividade entre os nós.

Quase todos os serviços de nó são extremamente fáceis de integrar, envolvendo alterações de uma linha no seu código para trocar o seu nó auto-hospedado, ou até mesmo alternar entre os próprios serviços.

Muitas vezes, os serviços de nó executarão uma variedade de [clientes de nó](/developers/docs/nodes-and-clients/#execution-clients) e [tipos](/developers/docs/nodes-and-clients/#node-types), permitindo que você acesse nós completos e de arquivo, além de métodos específicos do cliente em uma única API.

É importante notar que os serviços de nó não armazenam e não devem armazenar suas chaves privadas ou informações.

## Quais são os benefícios de usar um serviço de nó? {#benefits-of-using-a-node-service}

O principal benefício de usar um serviço de nó é não ter que gastar tempo de engenharia mantendo e gerenciando nós você mesmo. Isso permite que você se concentre na construção do seu produto em vez de ter que se preocupar com a manutenção da infraestrutura.

Executar seus próprios nós pode ser muito caro, desde armazenamento até largura de banda e tempo valioso de engenharia. Coisas como ativar mais nós ao escalar, atualizar nós para as versões mais recentes e garantir a consistência do estado podem distrair da construção e do gasto de recursos no seu produto Web3 desejado.

## Quais são os contras de usar um serviço de nó? {#cons-of-using-a-node-service}

Ao usar um serviço de nó, você está centralizando o aspecto de infraestrutura do seu produto. Por esse motivo, projetos que consideram a descentralização de extrema importância podem preferir nós auto-hospedados em vez de terceirizar para terceiros.

Leia mais sobre os [benefícios de executar o seu próprio nó](/developers/docs/nodes-and-clients/#benefits-to-you).

## Serviços de nó populares {#popular-node-services}

Aqui está uma lista de alguns dos provedores de nó do Ethereum mais populares, sinta-se à vontade para adicionar os que estiverem faltando! Cada serviço de nó oferece diferentes benefícios e recursos, além de níveis gratuitos ou pagos, você deve investigar quais se adequam melhor às suas necessidades antes de tomar uma decisão.

- [**Alchemy**](https://alchemy.com/)
  - [Documentação](https://www.alchemy.com/docs/)
  - Recursos
    - Maior nível gratuito com 300 milhões de unidades de computação por mês (\~30 milhões de solicitações getLatestBlock)
    - Suporte multichain para Polygon, Starknet, Optimism, Arbitrum
    - Alimentando ~70% dos maiores aplicativos descentralizados (dapps) do Ethereum e volume de transações de finanças descentralizadas (DeFi)
    - Alertas de webhook em tempo real via Alchemy Notify
    - Melhor suporte e confiabilidade/estabilidade da categoria
    - API de NFT da Alchemy
    - Painel com Request Explorer, Mempool Watcher e Composer
    - Acesso integrado a faucet de testnet
    - Comunidade ativa de construtores no Discord com 18 mil usuários

- [**Allnodes**](https://www.allnodes.com/)
  - [Documentação](https://docs.allnodes.com/)
  - Recursos
    - Sem limites de taxa com o token PublicNode criado na página de portfólio da Allnodes.
    - Endpoints RPC gratuitos focados em privacidade (mais de 100 blockchains) no [PublicNode](https://www.publicnode.com)
    - Nós dedicados sem limites de taxa para mais de 90 blockchains
    - Nós de arquivo dedicados para mais de 30 blockchains
    - Disponível em 3 regiões (EUA, UE, Ásia)
    - Snapshots para mais de 100 blockchains no [PublicNode](https://www.publicnode.com/snapshots)
    - Suporte técnico 24/7 com SLA de tempo de atividade de 99,90%-99,98% (depende do plano).
    - Preço por hora
    - Pague com cartão de crédito, PayPal ou cripto

- [**All That Node**](https://allthatnode.com/)
  - [Documentação](https://docs.allthatnode.com/)
  - Recursos
    - 50.000 solicitações por dia com nível gratuito
    - Suporte para mais de 40 protocolos
    - APIs JSON-RPC (EVM, Tendermint), REST e Websocket suportadas
    - Acesso ilimitado a dados de arquivo
    - Suporte técnico 24/7 e mais de 99,9% de tempo de atividade
    - Faucet disponível em várias cadeias
    - Acesso ilimitado a endpoints com um número ilimitado de chaves de API
    - API de Trace/Debug suportada
    - Atualizações automatizadas

- [**Amazon Managed Blockchain**](https://aws.amazon.com/managed-blockchain/)
  - [Documentação](https://aws.amazon.com/managed-blockchain/resources/)
  - Recursos
    - Nós do Ethereum totalmente gerenciados
    - Disponível em seis regiões
    - JSON-RPC sobre HTTP e WebSockets seguros
    - Suporta 3 cadeias
    - SLAs, Suporte AWS 24/7
    - Go-ethereum e Lighthouse

- [**Ankr**](https://www.ankr.com/)
  - [Documentação](https://docs.ankr.com/)
  - Recursos
    - Protocolo Ankr - acesso aberto a endpoints de API RPC públicos para mais de 8 cadeias
    - Balanceamento de carga e monitoramento da integridade do nó para um gateway rápido e confiável para o nó disponível mais próximo
    - Nível premium habilitando endpoint WSS e limite de taxa sem teto
    - Implantação de nó completo e nó validador com um clique para mais de 40 cadeias
    - Escale conforme o uso
    - Ferramentas de análise
    - Painel
    - Endpoints RPC, HTTPS e WSS
    - Suporte direto

- [**Blast**](https://blastapi.io/)
  - [Documentação](https://docs.blastapi.io/)
  - Recursos
    - Suporte a RPC e WSS
    - Hospedagem de nó em várias regiões
    - Infraestrutura descentralizada
    - API pública
    - Plano gratuito dedicado
    - Suporte multichain (mais de 17 blockchains)
    - Nós de arquivo
    - Suporte 24/7 no Discord
    - Monitoramento e alertas 24/7
    - Um SLA geral de 99,9%
    - Pague em cripto

- [**BlockDaemon**](https://blockdaemon.com/)
  - [Documentação](https://ubiquity.docs.blockdaemon.com/)
  - Benefícios
    - Painel
    - Base por nó
    - Análise

- [**BlockPI**](https://blockpi.io/)
  - [Documentação](https://docs.blockpi.io/)
  - Recursos
    - Estrutura de nó robusta e distribuída
    - Até 40 endpoints HTTPS e WSS
    - Pacote de inscrição gratuito e pacote mensal
    - Método Trace + suporte a dados de arquivo
    - Pacotes com validade de até 90 dias
    - Plano personalizado e pagamento conforme o uso
    - Pague em cripto
    - Suporte direto e suporte técnico

- [**Chainbase**](https://www.chainbase.com/)
  - [Documentação](https://docs.chainbase.com)
  - Recursos
    - Serviço RPC altamente disponível, rápido e escalável
    - Suporte multichain
    - Tarifas gratuitas
    - Painel amigável
    - Fornece serviços de dados de blockchain além do RPC

- [**Chainstack**](https://chainstack.com/)
  - [Documentação](https://docs.chainstack.com/)
  - Recursos
    - Nós compartilhados gratuitos
    - Nós de arquivo compartilhados
    - Suporte a GraphQL
    - Endpoints RPC e WSS
    - Nós completos e de arquivo dedicados
    - Tempo de sincronização rápido para implantações dedicadas
    - Traga sua nuvem
    - Preço por hora
    - Suporte direto 24/7

- [**dRPC**](https://drpc.org/)
  - [Documentação](https://drpc.org/docs)
  - NodeCloud: Infraestrutura RPC plug-n-play a partir de US$ 10 — velocidade total, sem limites
  - Recursos do NodeCloud:
    - Suporte de API para 185 redes
    - Pool distribuído de mais de 40 provedores
    - Cobertura global com nove (9) geo-clusters
    - Sistema de balanceamento de carga alimentado por IA
    - Preço fixo conforme o uso — sem aumentos, sem expiração, sem fidelidade
    - Chaves ilimitadas, ajustes granulares de chaves, funções de equipe, proteção de front-end
    - Taxa fixa de métodos em 20 unidades de computação (CUs) por método
    - [Lista de cadeias de endpoints públicos](https://drpc.org/chainlist)
    - [Calculadora de preços](https://drpc.org/pricing#calculator)
  - NodeCore: pilha de código aberto para organizações que desejam controle total

- [**GetBlock**](https://getblock.io/)
  - [Documentação](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Recursos
    - Acesso a mais de 40 nós de blockchain
    - 40 mil solicitações diárias gratuitas
    - Número ilimitado de chaves de API
    - Alta velocidade de conexão a 1 GB/s
    - Trace+Archive
    - Análise avançada
    - Atualizações automatizadas
    - Suporte técnico

- [**InfStones**](https://infstones.com/)
  - Recursos
    - Opção de nível gratuito
    - Escale conforme o uso
    - Análise
    - Painel
    - Endpoints de API exclusivos
    - Nós completos dedicados
    - Tempo de sincronização rápido para implantações dedicadas
    - Suporte direto 24/7
    - Acesso a mais de 50 nós de blockchain

- [**Infura**](https://infura.io/)
  - [Documentação](https://infura.io/docs)
  - Recursos
    - Opção de nível gratuito
    - Escale conforme o uso
    - Dados de arquivo pagos
    - Suporte direto
    - Painel

- [**Kaleido**](https://kaleido.io/)
  - [Documentação](https://docs.kaleido.io/)
  - Recursos
    - Nível inicial gratuito
    - Implantação de nó do Ethereum com um clique
    - Clientes e algoritmos personalizáveis (Geth, Quorum e Besu || PoA, IBFT e Raft)
    - Mais de 500 APIs administrativas e de serviço
    - Interface RESTful para envio de transação do Ethereum (apoiada pelo Apache Kafka)
    - Fluxos de saída para entrega de eventos (apoiados pelo Apache Kafka)
    - Coleção profunda de serviços offchain e auxiliares (por exemplo, transporte de mensagens criptografadas bilaterais)
    - Integração de rede direta com governança e controle de acesso baseado em função
    - Gerenciamento de usuários sofisticado para administradores e usuários finais
    - Infraestrutura de nível empresarial altamente escalável e resiliente
    - Gerenciamento de chave privada Cloud HSM
    - Tethering da Rede Principal do Ethereum
    - Certificações ISO 27k e SOC 2, Tipo 2
    - Configuração de tempo de execução dinâmica (por exemplo, adicionar integrações de nuvem, alterar ingressos de nó, etc.)
    - Suporte para orquestrações de implantação multinuvem, multirregião e híbridas
    - Preço simples baseado em SaaS por hora
    - SLAs e suporte 24x7

- [**Lava Network**](https://www.lavanet.xyz/)
  - [Documentação](https://docs.lavanet.xyz/)
  - Recursos
    - Uso gratuito de rede de teste
    - Redundância descentralizada para alto tempo de atividade
    - Código aberto
    - SDK totalmente descentralizado
    - Integração com Ethers.js
    - Interface intuitiva de gerenciamento de projetos
    - Integridade de dados baseada em consenso
    - Suporte multichain

- [**Moralis**](https://moralis.io/)
  - [Documentação](https://docs.moralis.io/)
  - Recursos
    - Nós compartilhados gratuitos
    - Nós de arquivo compartilhados gratuitos
    - Focado em privacidade (política de não registro)
    - Suporte cross-chain
    - Escale conforme o uso
    - Painel
    - SDK exclusivo do Ethereum
    - Endpoints de API exclusivos
    - Suporte técnico direto

- [**NodeReal MegaNode**](https://nodereal.io/)
  - [Documentação](https://docs.nodereal.io/docs/introduction)
  - Recursos
    - Serviços de API RPC confiáveis, rápidos e escaláveis
    - API aprimorada para desenvolvedores Web3
    - Suporte multichain
    - Comece gratuitamente

- [**NodeFlare**](https://nodeflare.app/)
  - [Documentação](https://nodeflare.app/docs/quick-start)
  - Recursos
    - 8 cadeias EVM, incluindo Ethereum, Base, Arbitrum One e Optimism
    - 4 regiões (Europa, Ásia, América do Norte) com failover automático para o nó saudável mais próximo
    - Endpoint público gratuito (sem chave de API) + plano gratuito com 3 milhões de unidades de computação/mês
    - Faturamento por unidade de computação — pague apenas pelo que usar, chamadas mais pesadas custam mais
    - Sem limitação em planos pagos

- [**NOWNodes**](https://nownodes.io/)
  - Recursos
    - Acesso a mais de 50 nós de blockchain
    - Chave de API gratuita
    - Exploradores de blocos
    - Tempo de resposta da API ⩽ 1 seg
    - Equipe de suporte 24/7
    - Gerente de conta pessoal
    - Nós compartilhados, de arquivo, de backup e dedicados

- [**Pocket Network**](https://www.pokt.network/)
  - [Documentação](https://docs.pokt.network/)
  - Recursos
    - Protocolo RPC descentralizado e Marketplace
    - Nível gratuito de 1 milhão de solicitações por dia (por endpoint, máximo de 2)
    - Programa Pre-Stake+ (se você precisar de mais de 1 milhão de solicitações por dia)
    - Mais de 15 blockchains suportadas
    - Mais de 6.400 nós ganhando POKT por servir aplicativos
    - Suporte a nó de arquivo, nó de arquivo com rastreamento e nó de rede de teste
    - Diversidade de clientes de nó da Rede Principal do Ethereum
    - Nenhum ponto único de falha
    - Zero tempo de inatividade
    - Tokenomics econômico quase zero (faça stake de POKT uma vez para largura de banda da rede)
    - Sem custos irrecuperáveis mensais, transforme sua infraestrutura em um ativo
    - Balanceamento de carga integrado ao protocolo
    - Escale infinitamente o número de solicitações por dia e nós por hora conforme o uso
    - A opção mais privada e resistente à censura
    - Suporte prático ao desenvolvedor
    - Painel e análise do [Pocket Portal](https://bit.ly/ETHorg_POKTportal)

- [**QuickNode**](https://www.quicknode.com)
  - [Documentação](https://www.quicknode.com/docs/)
  - Recursos
    - Suporte técnico 24/7 e comunidade de desenvolvedores no Discord
    - Rede de baixa latência, multinuvem/metal e geo-balanceada
    - Suporte multichain (Optimism, Arbitrum, Polygon + 11 outras)
    - Camadas intermediárias para velocidade e estabilidade (roteamento de chamadas, cache, indexação)
    - Monitoramento de contrato inteligente via Webhooks
    - Painel intuitivo, pacote de análise, compositor RPC
    - Recursos avançados de segurança (JWT, mascaramento, lista de permissões)
    - API de dados e análise de NFT
    - [Certificado SOC2](https://www.quicknode.com/security)
    - Adequado para desenvolvedores a empresas

- [**Rivet**](https://rivet.cloud/)
  - [Documentação](https://rivet.readthedocs.io/en/latest/)
  - Recursos
    - Opção de nível gratuito
    - Escale conforme o uso

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
    - Teste gratuito
    - Escale conforme o uso
    - Suporte a GraphQL
    - Endpoints RPC e WSS
    - Nós completos dedicados
    - Traga sua nuvem
    - Ferramentas de análise
    - Painel
    - Preço por hora
    - Suporte direto

- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [Documentação](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - Recursos
    - Nível gratuito incluindo 25 milhões de Unidades Tenderly por mês
    - Acesso gratuito a dados históricos
    - Cargas de trabalho com uso intenso de leitura até 8x mais rápidas
    - Acesso de leitura 100% consistente
    - Endpoints JSON-RPC
    - Construtor de solicitação RPC baseado em interface do usuário e visualização de solicitação
    - Estreitamente integrado com as ferramentas de desenvolvimento, depuração e teste do Tenderly
    - Simulações de transação
    - Análise e filtragem de uso
    - Gerenciamento de chaves de fácil acesso
    - Suporte de engenharia dedicado via chat, e-mail e Discord

- [**Tokenview**](https://services.tokenview.io/)
  - [Documentação](https://services.tokenview.io/docs?type=nodeService)
  - Recursos
    - Suporte técnico 24/7 e comunidade de desenvolvedores no Telegram
    - Suporte multichain (Bitcoin, Ethereum, Tron, BNB Smart Chain, Ethereum Classic)
    - Ambos os endpoints RPC e WSS estão abertos para uso
    - Acesso ilimitado à API de dados de arquivo
    - Painel com Request Explorer e Mempool Watcher
    - API de dados de NFT e notificação de Webhook
    - Pague em cripto
    - Suporte externo para requisitos de comportamento extra

- [**Watchdata**](https://watchdata.io/)
  - [Documentação](https://docs.watchdata.io/)
  - Recursos
    - Confiabilidade de dados
    - Conexão ininterrupta sem tempo de inatividade
    - Automação de processos
    - Tarifas gratuitas
    - Limites altos que se adequam a qualquer usuário
    - Suporte para vários nós
    - Escalonamento de recursos
    - Altas velocidades de processamento

- [**ZMOK**](https://zmok.io/)
  - [Documentação](https://docs.zmok.io/)
  - Recursos
    - Front-running como serviço
    - Mempool de transações globais com métodos de pesquisa/filtragem
    - Taxa de transação ilimitada e gás infinito para envio de transações
    - Obtenção mais rápida do novo bloco e leitura da blockchain
    - A garantia do melhor preço por chamada de API

- [**Zeeve**](https://www.zeeve.io/)
  - [Documentação](https://www.zeeve.io/docs/)
  - Recursos
    - Plataforma de automação sem código de nível empresarial que fornece implantação, monitoramento e gerenciamento de nós e redes de blockchain
    - Mais de 30 protocolos e integrações suportados, e adicionando mais
    - Serviços de infraestrutura Web3 de valor agregado, como armazenamento descentralizado, identidade descentralizada e APIs de dados de Blockchain Ledger para casos de uso do mundo real
    - Suporte 24/7 e monitoramento proativo garantem a integridade dos nós o tempo todo.
    - Os endpoints RPC oferecem acesso autenticado a APIs, gerenciamento sem complicações com painel intuitivo e análise.
    - Fornece opções de nuvem gerenciada e traga sua própria nuvem para escolher e oferece suporte a todos os principais provedores de nuvem, como AWS, Azure, Google Cloud, Digital Ocean e local.
    - Usamos roteamento inteligente para atingir o nó mais próximo do seu usuário todas as vezes


## Leitura adicional {#further-reading}

- [Lista de serviços de nó do Ethereum](https://ethereumnodes.com/)

## Tópicos relacionados {#related-topics}

- [Nós e clientes](/developers/docs/nodes-and-clients/)

## Tutoriais relacionados {#related-tutorials}

- [Introdução ao desenvolvimento no Ethereum usando Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Guia para enviar transações usando Web3 e Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)