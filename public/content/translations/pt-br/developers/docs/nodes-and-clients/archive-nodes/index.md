---
title: Nó de arquivo Ethereum
description: Uma visão geral dos nós de arquivo
lang: pt-br
sidebarDepth: 2
---

Um nó de arquivo é uma instância de um cliente Ethereum configurado para construir um arquivo de todos os estados históricos. É uma ferramenta útil para certos casos de uso, mas pode ser mais complicado de executar do que um nó completo.

## Pré-requisitos {#prerequisites}

Você deve entender o conceito de um [nó Ethereum](/developers/docs/nodes-and-clients/), [a arquitetura deles, assim como suas](/developers/docs/nodes-and-clients/node-architecture/) [estratégias de sincronização](/developers/docs/nodes-and-clients/#sync-modes), práticas de [execução](/developers/docs/nodes-and-clients/run-a-node/), e como [usá-los](/developers/docs/apis/json-rpc/).

## O que é um nó de arquivo

Para compreender a importância de um nó de arquivo, vamos esclarecer o conceito de "estado". O Ethereum pode ser chamado de _máquina de estado baseada em transações_. Consiste em contas e aplicativos que executam transações que estão mudando o seu estado. Os dados globais com informações sobre cada conta e contrato são armazenados em uma árvore de banco de dados chamado estado. Isso é tratado pelo cliente da camada de execução (EL) e inclui:

- Saldos de conta e nonces
- Código do contrato e armazenamento
- Dados relacionados ao consenso, por exemplo, Contrato de Depósito de Staking

Para interagir com a rede, verificar e produzir novos blocos, os clientes Ethereum precisam acompanhar as mudanças mais recentes (a ponta da cadeia) e, portanto, o estado atual. Um cliente da camada de execução configurado como um nó completo verifica e segue o último estado da rede, mas apenas armazena em cache os últimos estados, por exemplo, o estado associado aos últimos 128 blocos, para ele que possa lidar com a reorganização da cadeia e fornecer acesso rápido a dados recentes. O estado recente é o que todos os clientes precisam para verificar as transações recebidas e usar a rede.

Você pode imaginar o estado como uma captura de rede em um determinado bloco e o arquivo como uma repetição do histórico.

Os estados históricos podem ser podados com segurança porque não são necessários para operar a rede e, seria inútil para o cliente manter todos os dados desatualizados. Os estados que existiam antes de algum bloco recente (por exemplo, 128 blocos antes da ponta) são efetivamente jogados fora. Os nós completos só mantêm dados históricos da blockchain (blocos e transações) e capturas históricas ocasionais, que eles podem usar para regenerar estados mais antigos mediante solicitação. Eles fazem isso reexecutando transações passadas no EVM, que podem ser computacionalmente rigorosos quando o estado desejado está longe da imagem instantânea mais próxima.

No entanto, isso significa que acessar um estado histórico em um nó completo consome muita computação. O cliente pode precisar executar todas as transações passadas e calcular um estado histórico desde a origem. Os nós de arquivo resolvem isso armazenando não apenas os estados mais recentes, mas cada estado histórico criado após cada bloco. Basicamente, isso implica um compromisso com um maior requisito de espaço em disco.

É importante notar que a rede não depende de nós de arquivo para manter e fornecer todos os dados históricos. Conforme mencionado acima, todos os estados históricos provisórios podem ser derivados de um nó completo. As transações são armazenadas por qualquer nó completo (atualmente com menos de 400G) e podem ser reproduzidas para construir todo o arquivo.

### Casos de uso

O uso regular do Ethereum, como envio de transações, implantação de contratos, verificação de consenso, etc., não requer acesso a estados históricos. Os usuários nunca precisam de um nó de arquivo para uma interação padrão com a rede.

O principal benefício do arquivo de estado é um acesso rápido a consultas sobre estados históricos. Por exemplo, o nó de arquivo retornaria prontamente resultados como:

- _Qual era o saldo da conta ETH 0x1337... no bloco 15537393?_
- _Qual é o saldo do token 0x no contrato 0x no bloco 1920000?_

Conforme explicado acima, um nó completo precisaria gerar esses dados pela execução do EVM, que usa a CPU e leva tempo. Os nós de arquivo os acessam no disco e fornecem respostas imediatamente. Esse recurso é útil para certas partes da infraestrutura, por exemplo:

- Provedores de serviços como exploradores de blocos
- Pesquisadores
- Analistas de segurança
- Desenvolvedores de Dapp
- Auditoria e conformidade

Existem vários [serviços](/developers/docs/nodes-and-clients/nodes-as-a-service/) gratuitos que também permitem acesso a dados históricos. Como é mais exigente administrar um nó de arquivo, esse acesso é, na maioria das vezes, limitado e funciona apenas para acesso ocasional. Se o seu projeto requer acesso constante a dados históricos, considere a possibilidade de executar um você mesmo.

## Implementações e uso

O nó de arquivo, neste contexto, significa dados servidos pelos clientes da camada de execução voltados para o usuário, enquanto eles lidam com o banco de dados de estado e fornecem pontos de extremidade JSON-RPC. As opções de configuração, tempo de sincronização e tamanho do banco de dados podem variar conforme o cliente. Para mais detalhes, consulte a documentação fornecida pelo seu cliente.

Antes de iniciar seu próprio nó de arquivo, aprenda sobre as diferenças entre os clientes e especialmente os vários [requisitos de hardware](/developers/docs/nodes-and-clients/run-a-node/#requirements). A maioria dos clientes não é otimizada para esse recurso e seus arquivos exigem mais de 12 TB de espaço. Por outro lado, implementações como Erigon podem armazenar os mesmos dados em menos de 3 TB, o que as torna a forma mais eficaz de executar um nó de arquivo.

## Práticas recomendadas

Além das [recomendações gerais para executar um nó](/developers/docs/nodes-and-clients/run-a-node/), um nó de arquivo pode exigir mais hardware e manutenção. Considerando as [principais funcionalidades](https://github.com/ledgerwatch/erigon#key-features) do Erigon, a abordagem mais prática é usar a implementação cliente do [Erigon](/developers/docs/nodes-and-clients/#erigon).

### Hardware

Sempre verifique os requisitos de hardware para um determinado modo na documentação de um cliente. O maior requisito para nós de arquivo é o espaço em disco. Dependendo do cliente, varia de 3 TB a 12 TB. Mesmo que o HDD possa ser considerado uma solução melhor para grandes quantidades de dados, sincronizá-lo e atualizar constantemente o topo da cadeia exigirá unidades SSD. As unidades [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) são boas o suficiente, mas devem ser de qualidade confiável, pelo menos [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences). Os discos podem ser inseridos em um computador ou servidor com slots suficientes. Esses dispositivos dedicados são ideais para executar um nó de alto tempo de atividade. É totalmente possível executá-lo em um laptop, mas a portabilidade virá com um custo adicional.

Todos os dados precisam se encaixar em um volume, portanto, os discos devem estar unidos, por exemplo, com [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) ou [LVM](https://web.mit.edu/rhel-doc/5/RHEL-5-manual/Deployment_Guide-en-US/ch-lvm.html). Também pode valer a pena considerar o uso de [ZFS](https://en.wikipedia.org/wiki/ZFS), pois ele suporta "Copy-on-write", que garante que os dados sejam gravados corretamente no disco sem quaisquer erros de baixo nível.

Para obter mais estabilidade e segurança na prevenção de corrupção acidental do banco de dados, especialmente em uma configuração profissional, considere usar [memória ECC](https://en.wikipedia.org/wiki/ECC_memory) se o seu sistema a suportar. O tamanho de RAM é geralmente recomendado para ser o mesmo de um nó completo, mas mais RAM pode ajudar a acelerar a sincronização.

Durante a sincronização inicial, os clientes no modo arquivo executarão todas as transações desde a origem. A velocidade de execução é limitada principalmente pela CPU, portanto, uma CPU mais rápida pode ajudar com o tempo de sincronização inicial. Em um computador de consumo médio, a sincronização inicial pode levar até um mês.

## Leitura adicional {#further-reading}

- [Nó completo Ethereum vs Nó de arquivo](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) — *QuickNode, setembro de 2022*
- [Construindo seu próprio nó de arquivo Ethereum](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) — _Thomas Jay Rush, agosto de 2021_
- [Como configurar Erigon, o RPC do Erigon e TrueBlocks (extração e API) como serviços](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, atualizado em setembro de 2022_

## Tópicos relacionados {#related-topics}

- [ Nós e clientes](/developers/docs/nodes-and-clients/)
- [Executando um nó](/developers/docs/nodes-and-clients/run-a-node/)
