---
title: "Nó de arquivo do Ethereum"
description: "Uma visão geral dos nós de arquivo"
lang: pt-br
sidebarDepth: 2
---

Um nó de arquivo é uma instância de um cliente [Ethereum](/) configurado para construir um arquivo de todos os estados históricos. É uma ferramenta útil para certos casos de uso, mas pode ser mais complicado de executar do que um nó completo.

## Pré-requisitos {#prerequisites}

Você deve entender o conceito de um [nó do Ethereum](/developers/docs/nodes-and-clients/), [sua arquitetura](/developers/docs/nodes-and-clients/node-architecture/), [estratégias de sincronização](/developers/docs/nodes-and-clients/#sync-modes), práticas de [execução](/developers/docs/nodes-and-clients/run-a-node/) e [uso deles](/developers/docs/apis/json-rpc/).

## O que é um nó de arquivo {#what-is-an-archive-node}

Para compreender a importância de um nó de arquivo, vamos esclarecer o conceito de "estado". O Ethereum pode ser chamado de _máquina de estado baseada em transações_. Ele consiste em contas e aplicativos executando transações que estão mudando seu estado. Os dados globais com informações sobre cada conta e contrato são armazenados em um banco de dados trie chamado estado. Isso é tratado pelo cliente da camada de execução (EL) e inclui:

- Saldos de contas e nonces
- Código e armazenamento de contratos
- Dados relacionados ao consenso, por exemplo, Contrato de depósito de staking (Staking Deposit Contract)

Para interagir com a rede, verificar e produzir novos blocos, os clientes Ethereum precisam acompanhar as mudanças mais recentes (a ponta da cadeia) e, portanto, o estado atual. Um cliente da camada de execução configurado como um nó completo verifica e segue o estado mais recente da rede, mas armazena em cache apenas os últimos estados, por exemplo, o estado associado aos últimos 128 blocos, para que possa lidar com reorganizações da cadeia e fornecer acesso rápido a dados recentes. O estado recente é o que todos os clientes precisam para verificar as transações recebidas e usar a rede.

Você pode imaginar o estado como um snapshot momentâneo da rede em um determinado bloco e o arquivo como uma repetição do histórico.

Os estados históricos podem ser podados com segurança porque não são necessários para a operação da rede e seria inutilmente redundante para o cliente manter todos os dados desatualizados. Os estados que existiam antes de algum bloco recente (por exemplo, 128 blocos antes do topo) são efetivamente descartados. Os nós completos mantêm apenas dados históricos da blockchain (blocos e transações) e snapshots históricos ocasionais que podem usar para regenerar estados mais antigos sob demanda. Eles fazem isso reexecutando transações passadas na EVM, o que pode ser computacionalmente exigente quando o estado desejado está longe do snapshot mais próximo.

No entanto, isso significa que acessar um estado histórico em um nó completo consome muita computação. O cliente pode precisar executar todas as transações passadas e computar um estado histórico desde o bloco gênese. Os nós de arquivo resolvem isso armazenando não apenas os estados mais recentes, mas todos os estados históricos criados após cada bloco. Basicamente, ele faz uma troca por um requisito maior de espaço em disco.

É importante notar que a rede não depende de nós de arquivo para manter e fornecer todos os dados históricos. Como mencionado acima, todos os estados intermediários históricos podem ser derivados em um nó completo. As transações são armazenadas por qualquer nó completo (atualmente menos de 400 GB) e podem ser repetidas para construir todo o arquivo.

### Casos de uso {#use-cases}

O uso regular do Ethereum, como enviar transações, implantar contratos, verificar o consenso, etc., não exige acesso a estados históricos. Os usuários nunca precisam de um nó de arquivo para uma interação padrão com a rede.

O principal benefício do arquivo de estado é o acesso rápido a consultas sobre estados históricos. Por exemplo, o nó de arquivo retornaria prontamente resultados como:

- _Qual era o saldo de ETH da conta 0x1337... no bloco 15537393?_
- _Qual é o saldo do token 0x no contrato 0x no bloco 1920000?_

Como explicado acima, um nó completo precisaria gerar esses dados pela execução da EVM, o que usa a CPU e leva tempo. Os nós de arquivo os acessam no disco e fornecem respostas imediatamente. Este é um recurso útil para certas partes da infraestrutura, por exemplo:

- Provedores de serviços como exploradores de blocos
- Pesquisadores
- Analistas de segurança
- Desenvolvedores de dapps
- Auditoria e conformidade

Existem vários [serviços](/developers/docs/nodes-and-clients/nodes-as-a-service/) gratuitos que também permitem acesso a dados históricos. Como é mais exigente executar um nó de arquivo, esse acesso é em grande parte limitado e funciona apenas para acesso ocasional. Se o seu projeto exige acesso constante a dados históricos, você deve considerar executar um você mesmo.

## Implementações e uso {#implementations-and-usage}

Nó de arquivo neste contexto significa dados servidos por clientes da camada de execução voltados para o usuário, pois eles lidam com o banco de dados de estado e fornecem endpoints JSON-RPC. As opções de configuração, o tempo de sincronização e o tamanho do banco de dados podem variar de acordo com o cliente. Para obter detalhes, consulte a documentação fornecida pelo seu cliente.

Antes de iniciar seu próprio nó de arquivo, aprenda sobre as diferenças entre os clientes e, especialmente, os vários [requisitos de hardware](/developers/docs/nodes-and-clients/run-a-node/#requirements). A maioria dos clientes não é otimizada para esse recurso e seus arquivos exigem mais de 12 TB de espaço. Em contraste, implementações como o Erigon podem armazenar os mesmos dados em menos de 3 TB, o que os torna a maneira mais eficaz de executar um nó de arquivo.

## Práticas recomendadas {#recommended-practices}

Além das [recomendações gerais para executar um nó](/developers/docs/nodes-and-clients/run-a-node/), um nó de arquivo pode ser mais exigente em hardware e manutenção. Considerando os [principais recursos](https://github.com/ledgerwatch/erigon#key-features) do Erigon, a abordagem mais prática é usar a implementação do cliente [Erigon](/developers/docs/nodes-and-clients/#erigon).

### Hardware {#hardware}

Certifique-se sempre de verificar os requisitos de hardware para um determinado modo na documentação de um cliente.
O maior requisito para nós de arquivo é o espaço em disco. Dependendo do cliente, varia de 3 TB a 12 TB. Mesmo que o HDD possa ser considerado uma solução melhor para grandes quantidades de dados, sincronizá-lo e atualizar constantemente o topo da cadeia exigirá unidades SSD. Unidades [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) são boas o suficiente, mas devem ser de qualidade confiável, pelo menos [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences). Os discos podem ser instalados em um computador desktop ou em um servidor com slots suficientes. Tais dispositivos dedicados são ideais para executar um nó de alto tempo de atividade. É totalmente possível executá-lo em um laptop, mas a portabilidade terá um custo adicional.

Todos os dados precisam caber em um volume, portanto, os discos devem ser unidos, por exemplo, com [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) ou LVM. Também pode valer a pena considerar o uso do [ZFS](https://en.wikipedia.org/wiki/ZFS), pois ele suporta "Copy-on-write" (cópia na gravação), o que garante que os dados sejam gravados corretamente no disco sem erros de baixo nível.

Para maior estabilidade e segurança na prevenção de corrupção acidental do banco de dados, especialmente em uma configuração profissional, considere usar [memória ECC](https://en.wikipedia.org/wiki/ECC_memory) se o seu sistema a suportar. O tamanho da RAM geralmente é aconselhado a ser o mesmo que para um nó completo, mas mais RAM pode ajudar a acelerar a sincronização.

Durante a sincronização inicial, os clientes no modo de arquivo executarão todas as transações desde o bloco gênese. A velocidade de execução é limitada principalmente pela CPU, portanto, uma CPU mais rápida pode ajudar com o tempo de sincronização inicial. Em um computador de consumidor médio, a sincronização inicial pode levar até um mês.

## Leitura adicional {#further-reading}

- [Nó completo do Ethereum vs Nó de arquivo](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) - _QuickNode, setembro de 2022_
- [Construindo seu próprio nó de arquivo do Ethereum](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) - _Thomas Jay Rush, agosto de 2021_
- [Como configurar o Erigon, o RPC do Erigon e o TrueBlocks (raspagem e API) como serviços](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, atualizado em setembro de 2022_

## Tópicos relacionados {#related-topics}

- [Nós e clientes](/developers/docs/nodes-and-clients/)
- [Executando um nó](/developers/docs/nodes-and-clients/run-a-node/)