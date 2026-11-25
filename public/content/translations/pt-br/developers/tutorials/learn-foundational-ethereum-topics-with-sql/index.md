---
title: "Aprenda Tópicos Fundamentais do Ethereum com SQL"
description: "Este tutorial ajuda os leitores a entender conceitos fundamentais do Ethereum, incluindo transações, blocos e gás, consultando dados onchain com a Linguagem de Consulta Estruturada (SQL)."
author: "Paul Apivat"
tags: ["SQL", "Consultas", "Transações", "dados-e-análises"]
skill: beginner
breadcrumb: Ethereum com SQL
lang: pt-br
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://web.archive.org/web/20260516182620/https://paulapivat.com/post/query_ethereum/
---

Muitos tutoriais do Ethereum são voltados para desenvolvedores, mas há uma falta de recursos educacionais para analistas de dados ou para pessoas que desejam ver dados onchain sem executar um cliente ou nó.

Este tutorial ajuda os leitores a entender conceitos fundamentais do Ethereum, incluindo transações, blocos e gás, consultando dados onchain com a linguagem de consulta estruturada (SQL) por meio de uma interface fornecida pela [Dune](https://dune.com/). As consultas usam [DuneSQL](https://docs.dune.com/query-engine/overview), o dialeto SQL da Dune.

Os dados onchain podem nos ajudar a entender o Ethereum, a rede, e como uma economia para poder de computação, e devem servir como base para entender os desafios que o Ethereum enfrenta hoje (ou seja, o aumento dos preços do gás) e, mais importante, as discussões em torno de soluções de escalabilidade.

### Transações {#transactions}

A jornada de um usuário no Ethereum começa com a inicialização de uma conta controlada pelo usuário ou uma entidade com um saldo em ETH. Existem dois tipos de conta - controlada pelo usuário ou um contrato inteligente (veja [ethereum.org](/developers/docs/accounts/)).

Qualquer conta pode ser visualizada em um explorador de blocos como o [Etherscan](https://etherscan.io/) ou o [Blockscout](https://eth.blockscout.com/). Os exploradores de blocos são um portal para os dados do Ethereum. Eles exibem, em tempo real, dados sobre blocos, transações, validadores, contas e outras atividades onchain (veja [aqui](/developers/docs/data-and-analytics/block-explorers/)).

No entanto, um usuário pode desejar consultar os dados diretamente para reconciliar as informações fornecidas por exploradores de blocos externos. A [Dune](https://dune.com/) fornece essa capacidade para qualquer pessoa com algum conhecimento de SQL.

Para referência, a conta de contrato inteligente da Fundação Ethereum (EF) pode ser visualizada no [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe).

Uma coisa a notar é que todas as contas, incluindo a da EF, têm um endereço público que pode ser usado para enviar e receber transações.

O saldo da conta no Etherscan compreende transações regulares e transações internas. As transações internas, apesar do nome, não são transações _reais_ que alteram o estado da cadeia. Elas são transferências de valor iniciadas pela execução de um contrato ([fonte](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Como as transações internas não têm assinatura, elas **não** são incluídas na blockchain como transações. A Dune as registra separadamente, na tabela `ethereum.traces`.

Portanto, este tutorial se concentrará em transações regulares. Isso pode ser consultado da seguinte forma:

```sql
WITH temp_table AS (
SELECT
    hash,
    block_number,
    block_time,
    "from",
    "to",
    value / 1e18 AS ether,
    gas_used,
    gas_price / 1e9 AS gas_price_gwei
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
ORDER BY block_time DESC
)
SELECT
    hash,
    block_number,
    block_time,
    "from",
    "to",
    ether,
    (gas_used * gas_price_gwei) / 1e9 AS txn_fee
FROM temp_table
```

Note que os endereços são escritos como literais `0x...` sem aspas. No DuneSQL, endereços e hashes são valores binários, não strings.

Isso produzirá as mesmas informações fornecidas na página de transações do Etherscan. Para comparação, aqui estão as duas fontes:

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[Página do contrato da EF no Blockscout.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune {#dune-analytics}

![Screenshot of a Dune query dashboard](./dune_view.png)

Você pode encontrar o painel [aqui](https://dune.com/paulapivat/Learn-Ethereum). Clique na tabela para ver a consulta (veja também acima).

### Detalhando as Transações {#breaking-down-transactions}

Uma transação enviada inclui várias informações, incluindo ([fonte](/developers/docs/transactions/)):

- **Destinatário**: O endereço de recebimento (consultado como "to")
- **Assinatura**: Embora as chaves privadas de um remetente assinem uma transação, o que podemos consultar com SQL é o endereço público de um remetente ("from").
- **Valor**: Esta é a quantidade de ETH transferida (veja a coluna `ether`).
- **Dados**: São dados arbitrários que passaram por hash (veja a coluna `data`)
- **gasLimit** – a quantidade máxima de unidades de gás que pode ser consumida pela transação. Unidades de gás representam etapas computacionais
- **maxPriorityFeePerGas** - a quantidade máxima de gás a ser incluída como uma taxa de prioridade para o validador
- **maxFeePerGas** - a quantidade máxima de gás que se está disposto a pagar pela transação (incluindo baseFeePerGas e maxPriorityFeePerGas)

Podemos consultar essas informações específicas para transações para o endereço público da Fundação Ethereum:

```sql
SELECT
    "to",
    "from",
    value / 1e18 AS ether,
    data,
    gas_limit,
    gas_price / 1e9 AS gas_price_gwei,
    gas_used,
    ROUND(CAST(gas_used AS DOUBLE) / gas_limit * 100, 2) AS gas_used_pct
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
ORDER BY block_time DESC
```

O `CAST` é necessário porque dividir um número inteiro por outro no DuneSQL fornece um resultado inteiro, o que arredondaria quase todas as porcentagens para baixo, para zero.

### Blocos {#blocks}

Cada transação mudará o estado da Máquina Virtual Ethereum ([EVM](/developers/docs/evm/)) ([fonte](/developers/docs/transactions/)). As transações são transmitidas para a rede para serem verificadas e incluídas em um bloco. Cada transação está associada a um número de bloco. Para ver os dados, poderíamos consultar um número de bloco específico: 12396854 (o bloco mais recente entre as transações da Fundação Ethereum no momento da redação, em maio de 2021).

Além disso, quando consultamos os próximos dois blocos, podemos ver que cada bloco contém o hash do bloco anterior (ou seja, o hash pai), ilustrando como a blockchain é formada.

Cada bloco contém uma referência ao seu bloco pai. Isso é mostrado abaixo entre as colunas `hash` e `parent_hash` ([fonte](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Aqui está a consulta:

```sql
SELECT
   time,
   number,
   hash,
   parent_hash,
   nonce
FROM ethereum.blocks
WHERE number IN (12396854, 12396855, 12396856)
```

Podemos examinar um bloco consultando o tempo, o número do bloco, o hash, o hash pai e o nonce. O bloco 12396854 foi produzido antes do [The Merge](/roadmap/merge/), quando os blocos eram minerados com Prova de Trabalho (PoW) e o nonce era significativo. Em blocos de Prova de Participação (PoS), o nonce é sempre zero.

A única coisa que esta consulta não cobre é a _lista de transações_, que requer uma consulta separada abaixo, e a _raiz de estado_. Um nó completo ou de arquivo armazenará todas as transações e transições de estado, permitindo que os clientes consultem o estado da cadeia a qualquer momento. Como isso requer um grande espaço de armazenamento, podemos separar os dados da cadeia dos dados de estado:

- Dados da cadeia (lista de blocos, transações)
- Dados de estado (resultado da transição de estado de cada transação)

A raiz de estado se enquadra no último e é um dado _implícito_ (não armazenado onchain), enquanto os dados da cadeia são explícitos e armazenados na própria cadeia ([fonte](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Para este tutorial, vamos nos concentrar em dados onchain que _podem_ ser consultados com SQL via Dune.

Como afirmado acima, cada bloco contém uma lista de transações, podemos consultar isso filtrando por um bloco específico. Vamos tentar o bloco 12396854:

```sql
SELECT * FROM ethereum.transactions
WHERE block_number = 12396854
```

Aqui está a saída SQL na Dune:

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

Este único bloco sendo adicionado à cadeia altera o estado da Máquina Virtual Ethereum ([EVM](/developers/docs/evm/)). Dezenas, às vezes centenas de transações são verificadas de uma só vez. Neste caso específico, 222 transações foram incluídas.

Para ver quantas foram realmente bem-sucedidas, adicionaríamos outro filtro para contar as transações bem-sucedidas:

```sql
SELECT
    COUNT(*) AS num_successful_txn
FROM ethereum.transactions
WHERE block_number = 12396854 AND success = true
```

Para o bloco 12396854, de um total de 222 transações, 204 foram verificadas com sucesso:

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

As solicitações de transação ocorrem dezenas de vezes por segundo, mas os blocos são adicionados apenas periodicamente ([fonte](/developers/docs/blocks/)). Sob a Prova de Trabalho (PoW), um bloco era minerado em média a cada 13 a 15 segundos, com muita variação. Desde o [The Merge](/roadmap/merge/) em setembro de 2022, a Prova de Participação (PoS) divide o tempo em slots de 12 segundos, e cada slot pode ter no máximo um bloco.

Então, hoje pode haver no máximo 86400 / 12 = 7200 blocos por dia. Na prática, há um pouco menos, porque um validador ocasionalmente perde seu slot.

O gráfico de blocos do Ethereum produzidos por dia (2016 - 2021) é:

![Chart showing daily Ethereum block production](./daily_blocks.png)

O número médio de blocos produzidos diariamente durante este período é de ~5.874:

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

As consultas são:

Aqui está a consulta para visualizar o número de blocos produzidos diariamente. A cláusula `WHERE` exclui o dia atual, que ainda não terminou.

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum.blocks
WHERE time < DATE_TRUNC('day', NOW())
GROUP BY 1
ORDER BY 1
```

E esta consulta calcula o número médio de blocos produzidos por dia, antes e depois do The Merge. O bloco 15537394 é o primeiro bloco de Prova de Participação (PoS).

```sql
WITH daily AS (
    SELECT
        DATE_TRUNC('day', time) AS dt,
        MIN(number) >= 15537394 AS after_merge,
        COUNT(*) AS block_count
    FROM ethereum.blocks
    WHERE time < DATE_TRUNC('day', NOW())
    GROUP BY 1
)
SELECT
    after_merge,
    AVG(block_count) AS avg_block_count,
    86400 / AVG(block_count) AS avg_seconds_per_block
FROM daily
GROUP BY 1
```

Quando este tutorial foi escrito pela primeira vez em maio de 2021, a média era de 5.874 blocos por dia, ou um bloco a cada 14,7 segundos. Após o The Merge, a média fica um pouco abaixo do máximo de 7200, cerca de um bloco a cada 12 segundos.

### Gás {#gas}

Os blocos têm tamanho limitado. Cada bloco tem um limite de gas, e desde a [EIP-1559](/developers/docs/gas/#base-fee) cada bloco também tem uma meta de gás, que é a metade do limite. Quando os blocos usam mais gás do que a meta, a taxa básica sobe, e quando usam menos, ela desce. O próprio limite de gas é ajustado pelos validadores e foi aumentado várias vezes ao longo dos anos. Os limites são necessários para evitar que tamanhos de bloco arbitrariamente grandes sobrecarreguem os nós completos em termos de espaço em disco e requisitos de velocidade ([fonte](/developers/docs/blocks/)).

Uma maneira de conceituar o limite de gas do bloco é pensar nele como a **oferta** de espaço de bloco disponível no qual agrupar transações. O limite de gas do bloco pode ser consultado e visualizado de 2016 até os dias atuais:

![Chart showing average Ethereum gas limit over time](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum.blocks
WHERE time < DATE_TRUNC('day', NOW())
GROUP BY 1
ORDER BY 1
```

Depois, há o gás real usado diariamente para pagar pela computação feita na cadeia Ethereum (ou seja, enviar transação, chamar um contrato inteligente, fazer a cunhagem de um token não fungível (NFT)). Esta é a **demanda** por espaço de bloco Ethereum disponível:

![Chart showing daily Ethereum gas used](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum.blocks
WHERE time < DATE_TRUNC('day', NOW())
GROUP BY 1
ORDER BY 1
```

Também podemos justapor esses dois gráficos para ver como a **demanda e a oferta** se alinham:

![gas_demand_supply](./gas_demand_supply.png)

Portanto, podemos entender os preços do gás como uma função da demanda por espaço de bloco Ethereum, dada a oferta disponível.

Por fim, podemos querer consultar os preços médios diários do gás para a cadeia Ethereum, no entanto, fazer isso resultará em um tempo de consulta especialmente longo, então filtraremos nossa consulta para a quantidade média de gás paga por transação pela Fundação Ethereum.

![Chart showing Ethereum Foundation daily gas usage](./ef_daily_gas.png)

Podemos ver os preços do gás pagos por todas as transações feitas para o endereço da Fundação Ethereum ao longo dos anos. Aqui está a consulta:

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
ORDER BY block_time DESC
```

### Resumo {#summary}

Com este tutorial, entendemos os conceitos fundamentais do Ethereum e como a blockchain do Ethereum funciona consultando e tendo uma noção dos dados onchain.

O painel que contém todo o código usado neste tutorial pode ser encontrado [aqui](https://dune.com/paulapivat/Learn-Ethereum).

Para mais uso de dados para explorar a Web3, [encontre-me no Twitter](https://twitter.com/paulapivat).
