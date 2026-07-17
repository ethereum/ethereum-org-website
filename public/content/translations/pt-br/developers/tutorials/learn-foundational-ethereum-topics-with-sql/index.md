---
title: "Aprenda os Tópicos Fundamentais do Ethereum com SQL"
description: "Este tutorial ajuda os leitores a entender os conceitos fundamentais do Ethereum, incluindo transações, blocos e gas, consultando dados onchain com a Structured Query Language (SQL)."
author: "Paul Apivat"
tags: ["SQL", "Consultas", "Transações", "dados-e-analise"]
skill: beginner
breadcrumb: Ethereum com SQL
lang: pt-br
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Muitos tutoriais do Ethereum são voltados para desenvolvedores, mas há uma falta de recursos educacionais para analistas de dados ou para pessoas que desejam ver dados onchain sem executar um cliente ou nó.

Este tutorial ajuda os leitores a entender os conceitos fundamentais do Ethereum, incluindo transações, blocos e gas, consultando dados onchain com a linguagem de consulta estruturada (SQL) por meio de uma interface fornecida pela [Dune Analytics](https://dune.com/).

Os dados onchain podem nos ajudar a entender o Ethereum, a rede e como uma economia para poder de computação, e devem servir como base para entender os desafios que o Ethereum enfrenta hoje (ou seja, o aumento dos preços do gas) e, mais importante, as discussões em torno de soluções de escalabilidade.

### Transações {#transactions}

A jornada de um usuário no Ethereum começa com a inicialização de uma conta controlada pelo usuário ou uma entidade com um saldo em ETH. Existem dois tipos de conta - controlada pelo usuário ou um contrato inteligente (veja [ethereum.org](/developers/docs/accounts/)).

Qualquer conta pode ser visualizada em um explorador de blocos como o [Etherscan](https://etherscan.io/) ou o [Blockscout](https://eth.blockscout.com/). Os exploradores de blocos são um portal para os dados do Ethereum. Eles exibem, em tempo real, dados sobre blocos, transações, mineradores, contas e outras atividades onchain (veja [aqui](/developers/docs/data-and-analytics/block-explorers/)).

No entanto, um usuário pode desejar consultar os dados diretamente para reconciliar as informações fornecidas por exploradores de blocos externos. A [Dune Analytics](https://dune.com/) fornece essa capacidade para qualquer pessoa com algum conhecimento de SQL.

Para referência, a conta de contrato inteligente da Fundação Ethereum (EF) pode ser visualizada no [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe).

Uma coisa a notar é que todas as contas, incluindo a da EF, têm um endereço público que pode ser usado para enviar e receber transações.

O saldo da conta no Etherscan compreende transações regulares e transações internas. As transações internas, apesar do nome, não são transações _reais_ que alteram o estado da cadeia. Elas são transferências de valor iniciadas pela execução de um contrato ([fonte](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Como as transações internas não têm assinatura, elas **não** são incluídas na blockchain e não podem ser consultadas com a Dune Analytics.

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
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
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

Isso produzirá as mesmas informações fornecidas na página de transações do Etherscan. Para comparação, aqui estão as duas fontes:

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[Página do contrato da EF no Blockscout.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![Screenshot of a Dune Analytics query dashboard](./dune_view.png)

Você pode encontrar o painel [aqui](https://dune.com/paulapivat/Learn-Ethereum). Clique na tabela para ver a consulta (veja também acima).

### Detalhando as Transações {#breaking-down-transactions}

Uma transação enviada inclui várias informações, incluindo ([fonte](/developers/docs/transactions/)):

- **Destinatário**: O endereço de recebimento (consultado como "to")
- **Assinatura**: Embora as chaves privadas de um remetente assinem uma transação, o que podemos consultar com SQL é o endereço público de um remetente ("from").
- **Valor**: Esta é a quantidade de ETH transferida (veja a coluna `ether`).
- **Dados**: São dados arbitrários que passaram por hash (veja a coluna `data`)
- **gasLimit** – o limite de gas, ou seja, a quantidade máxima de unidades de gas que podem ser consumidas pela transação. Unidades de gas representam etapas computacionais
- **maxPriorityFeePerGas** - a quantidade máxima de gas a ser incluída como uma taxa de prioridade para o minerador
- **maxFeePerGas** - a quantidade máxima de gas que se está disposto a pagar pela transação (incluindo baseFeePerGas e maxPriorityFeePerGas)

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
    ROUND(((gas_used / gas_limit) * 100),2) AS gas_used_pct
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### Blocos {#blocks}

Cada transação mudará o estado da Máquina Virtual Ethereum ([EVM](/developers/docs/evm/)) ([fonte](/developers/docs/transactions/)). As transações são transmitidas para a rede para serem verificadas e incluídas em um bloco. Cada transação está associada a um número de bloco. Para ver os dados, poderíamos consultar um número de bloco específico: 12396854 (o bloco mais recente entre as transações da Fundação Ethereum no momento em que este artigo foi escrito, 11/05/21).

Além disso, quando consultamos os próximos dois blocos, podemos ver que cada bloco contém o hash do bloco anterior (ou seja, o hash pai), ilustrando como a blockchain é formada.

Cada bloco contém uma referência ao seu bloco pai. Isso é mostrado abaixo entre as colunas `hash` e `parent_hash` ([fonte](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Aqui está a [consulta](https://dune.com/queries/44856/88292) na Dune Analytics:

```sql
SELECT
   time,
   number,
   hash,
   parent_hash,
   nonce
FROM ethereum."blocks"
WHERE "number" = 12396854 OR "number" = 12396855 OR "number" = 12396856
LIMIT 10
```

Podemos examinar um bloco consultando o tempo, número do bloco, dificuldade, hash, hash pai e nonce.

A única coisa que esta consulta não cobre é a _lista de transações_, que requer uma consulta separada abaixo, e a _raiz de estado_ (state root). Um nó completo ou de arquivo armazenará todas as transações e transições de estado, permitindo que os clientes consultem o estado da cadeia a qualquer momento. Como isso requer um grande espaço de armazenamento, podemos separar os dados da cadeia dos dados de estado:

- Dados da cadeia (lista de blocos, transações)
- Dados de estado (resultado da transição de estado de cada transação)

A raiz de estado se enquadra no último e é um dado _implícito_ (não armazenado onchain), enquanto os dados da cadeia são explícitos e armazenados na própria cadeia ([fonte](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Para este tutorial, vamos nos concentrar em dados onchain que _podem_ ser consultados com SQL via Dune Analytics.

Como afirmado acima, cada bloco contém uma lista de transações, podemos consultar isso filtrando por um bloco específico. Vamos tentar o bloco mais recente, 12396854:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Aqui está a saída SQL na Dune:

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

Este único bloco sendo adicionado à cadeia altera o estado da Máquina Virtual Ethereum ([EVM](/developers/docs/evm/)). Dezenas, às vezes centenas de transações são verificadas de uma só vez. Neste caso específico, 222 transações foram incluídas.

Para ver quantas foram realmente bem-sucedidas, adicionaríamos outro filtro para contar as transações bem-sucedidas:

```sql
WITH temp_table AS (
    SELECT * FROM ethereum."transactions"
    WHERE block_number = 12396854 AND success = true
    ORDER BY block_time DESC
)
SELECT
    COUNT(success) AS num_successful_txn
FROM temp_table
```

Para o bloco 12396854, de um total de 222 transações, 204 foram verificadas com sucesso:

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

As solicitações de transações ocorrem dezenas de vezes por segundo, mas os blocos são confirmados aproximadamente uma vez a cada 15 segundos ([fonte](/developers/docs/blocks/)).

Para ver que há um bloco produzido aproximadamente a cada 15 segundos, poderíamos pegar o número de segundos em um dia (86400) dividido por 15 para obter um número médio estimado de blocos por dia (~ 5760).

O gráfico de blocos do Ethereum produzidos por dia (2016 - presente) é:

![Chart showing daily Ethereum block production](./daily_blocks.png)

O número médio de blocos produzidos diariamente durante este período é de ~5.874:

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

As consultas são:

```sql
# query to visualize number of blocks produced daily since 2016

SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1

# average number of blocks produced per day

WITH temp_table AS (
SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
)
SELECT
    AVG(block_count) AS avg_block_count
FROM temp_table
```

O número médio de blocos produzidos por dia desde 2016 está um pouco acima desse número, em 5.874. Alternativamente, dividir 86400 segundos por 5874 blocos em média resulta em 14,7 segundos ou aproximadamente um bloco a cada 15 segundos.

### Gas {#gas}

Os blocos têm tamanho limitado. O tamanho máximo do bloco é dinâmico e varia de acordo com a demanda da rede entre 12.500.000 e 25.000.000 unidades. Os limites são necessários para evitar que tamanhos de bloco arbitrariamente grandes sobrecarreguem os nós completos em termos de espaço em disco e requisitos de velocidade ([fonte](/developers/docs/blocks/)).

Uma maneira de conceituar o limite de gas do bloco é pensar nele como a **oferta** de espaço de bloco disponível no qual agrupar transações. O limite de gas do bloco pode ser consultado e visualizado de 2016 até os dias atuais:

![Chart showing average Ethereum gas limit over time](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Depois, há o gas real usado diariamente para pagar pela computação feita na cadeia Ethereum (ou seja, enviar transações, chamar um contrato inteligente, fazer a cunhagem de um NFT). Esta é a **demanda** por espaço de bloco disponível no Ethereum:

![Chart showing daily Ethereum gas used](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Também podemos justapor esses dois gráficos para ver como a **demanda e a oferta** se alinham:

![gas_demand_supply](./gas_demand_supply.png)

Portanto, podemos entender os preços do gas como uma função da demanda por espaço de bloco no Ethereum, dada a oferta disponível.

Finalmente, podemos querer consultar os preços médios diários do gas para a cadeia Ethereum, no entanto, fazer isso resultará em um tempo de consulta especialmente longo, então filtraremos nossa consulta para a quantidade média de gas paga por transação pela Fundação Ethereum.

![Chart showing Ethereum Foundation daily gas usage](./ef_daily_gas.png)

Podemos ver os preços do gas pagos por todas as transações feitas para o endereço da Fundação Ethereum ao longo dos anos. Aqui está a consulta:

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### Resumo {#summary}

Com este tutorial, entendemos os conceitos fundamentais do Ethereum e como a blockchain do Ethereum funciona consultando e nos familiarizando com os dados onchain.

O painel que contém todo o código usado neste tutorial pode ser encontrado [aqui](https://dune.com/paulapivat/Learn-Ethereum).

Para mais uso de dados para explorar a Web3, [encontre-me no Twitter](https://twitter.com/paulapivat).