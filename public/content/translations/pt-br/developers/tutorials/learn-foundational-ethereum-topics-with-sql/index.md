---
title: "Aprenda Tópicos Fundamentais do Ethereum com SQL"
description: "Este tutorial ajuda os leitores a entenderem os conceitos fundamentais do Ethereum, incluindo transações, blocos e gás, consultando dados em cadeia com a Linguagem de Consulta Estruturada (SQL)."
author: "Paul Apivat"
tags: [ "SQL", "Consulta", "Transações" ]
skill: beginner
lang: pt-br
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Muitos tutoriais do Ethereum são direcionados a desenvolvedores, mas há uma falta de recursos educacionais para analistas de dados ou para pessoas que desejam ver dados em cadeia sem executar um cliente ou um nó.

Este tutorial ajuda os leitores a entenderem os conceitos fundamentais do Ethereum, incluindo transações, blocos e gás, consultando dados em cadeia com a linguagem de consulta estruturada (SQL) por meio de uma interface fornecida pela [Dune Analytics](https://dune.com/).

Dados em cadeia podem nos ajudar a compreender o Ethereum, a rede, e como uma economia para poder computacional. Eles devem servir como base para entender os desafios que o Ethereum enfrenta hoje (ou seja, o aumento dos preços do gás) e, mais importante, as discussões sobre soluções de escalabilidade.

### Transações {#transactions}

A jornada de um usuário no Ethereum começa com a inicialização de uma conta controlada pelo usuário ou uma entidade com saldo de ETH. Existem dois tipos de conta: controlada pelo usuário ou um contrato inteligente (consulte [ethereum.org](/developers/docs/accounts/)).

Qualquer conta pode ser visualizada em um explorador de blocos como o [Etherscan](https://etherscan.io/) ou o [Blockscout](https://eth.blockscout.com/). Os exploradores de blocos são um portal para os dados do Ethereum. Eles exibem, em tempo real, dados sobre blocos, transações, mineradores, contas e outras atividades em cadeia (veja [aqui](/developers/docs/data-and-analytics/block-explorers/)).

No entanto, um usuário pode querer consultar os dados diretamente para reconciliar as informações fornecidas por exploradores de blocos externos. O [Dune Analytics](https://dune.com/) oferece essa capacidade a qualquer pessoa com algum conhecimento de SQL.

Para referência, a conta de contrato inteligente da Ethereum Foundation (EF) pode ser visualizada no [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe).

Uma coisa a se notar é que todas as contas, incluindo a da EF, têm um endereço público que pode ser usado para enviar e receber transações.

O saldo da conta no Etherscan compreende transações regulares e transações internas. Transações internas, apesar do nome, não são transações _reais_ que mudam o estado da cadeia. São transferências de valor iniciadas pela execução de um contrato ([fonte](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Como as transações internas não têm assinatura, elas **não** são incluídas na blockchain e não podem ser consultadas com o Dune Analytics.

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

Isso resultará na mesma informação fornecida na página de transações do Etherscan. Para comparação, aqui estão as duas fontes:

#### Etherscan {#etherscan}

![](./etherscan_view.png)

[Página do contrato da EF no Blockscout.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![](./dune_view.png)

Você pode encontrar o painel [aqui](https://dune.com/paulapivat/Learn-Ethereum). Clique na tabela para ver a consulta (veja também acima).

### Analisando as Transações {#breaking_down_transactions}

Uma transação enviada inclui várias informações, incluindo ([fonte](/developers/docs/transactions/)):

- **Destinatário**: O endereço de recebimento (consultado como "to")
- **Assinatura**: Embora as chaves privadas de um remetente assinem uma transação, o que podemos consultar com SQL é o endereço público de um remetente ("from").
- **Valor**: Esta é a quantidade de ETH transferida (veja a coluna `ether`).
- **Dados**: São dados arbitrários que sofreram hash (consulte a coluna `data`)
- **gasLimit** – a quantidade máxima de unidades de gás que podem ser consumidas pela transação. As unidades de gás representam etapas computacionais
- **maxPriorityFeePerGas** - a quantidade máxima de gás a ser incluída como gorjeta para o minerador
- **maxFeePerGas** - a quantidade máxima de gás que se está disposto a pagar pela transação (incluindo baseFeePerGas e maxPriorityFeePerGas)

Podemos consultar estas informações específicas para transações para o endereço público da Ethereum Foundation:

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

Cada transação mudará o estado da máquina virtual ethereum ([EVM](/developers/docs/evm/)) ([fonte](/developers/docs/transactions/)). As transações são transmitidas para a rede para serem verificadas e incluídas em um bloco. Cada transação está associada a um número de bloco. Para ver os dados, podemos consultar um número de bloco específico: 12396854 (o bloco mais recente entre as transações da Ethereum Foundation no momento da redação deste artigo, em 11/05/21).

Além disso, quando consultamos os dois blocos seguintes, podemos ver que cada bloco contém o hash do bloco anterior (ou seja, o hash pai), ilustrando como a blockchain é formada.

Cada bloco contém uma referência ao seu bloco pai. Isso é mostrado abaixo entre as colunas `hash` e `parent_hash` ([fonte](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Aqui está a [consulta](https://dune.com/queries/44856/88292) no Dune Analytics:

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

Podemos examinar um bloco consultando o tempo, o número do bloco, a dificuldade, o hash, o hash pai e o nonce.

A única coisa que esta consulta não cobre é a _lista de transações_, que requer uma consulta separada abaixo, e a _raiz do estado_. Um nó completo ou de arquivamento armazenará todas as transações e transições de estado, permitindo que os clientes consultem o estado da cadeia a qualquer momento. Como isso exige um grande espaço de armazenamento, podemos separar os dados da cadeia dos dados de estado:

- Dados da cadeia (lista de blocos, transações)
- Dados de estado (resultado da transição de estado de cada transação)

A raiz do estado se enquadra no último e são dados _implícitos_ (não armazenados em cadeia), enquanto os dados da cadeia são explícitos e armazenados na própria cadeia ([fonte](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Neste tutorial, vamos nos concentrar nos dados em cadeia que _podem_ ser consultados com SQL via Dune Analytics.

Conforme indicado acima, cada bloco contém uma lista de transações. Podemos consultar isso filtrando por um bloco específico. Vamos tentar o bloco mais recente, 12396854:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Aqui está a saída SQL no Dune:

![](./list_of_txn.png)

Este único bloco adicionado à cadeia altera o estado da máquina virtual ethereum ([EVM](/developers/docs/evm/)). Dezenas, às vezes centenas, de transações são verificadas de uma só vez. Neste caso específico, 222 transações foram incluídas.

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

![](./successful_txn.png)

As solicitações de transação ocorrem dezenas de vezes por segundo, mas os blocos são consolidados aproximadamente uma vez a cada 15 segundos ([fonte](/developers/docs/blocks/)).

Para ver que um bloco é produzido aproximadamente a cada 15 segundos, poderíamos pegar o número de segundos em um dia (86400) e dividi-lo por 15 para obter um número médio estimado de blocos por dia (~ 5760).

O gráfico de blocos do Ethereum produzidos por dia (2016 - presente) é:

![](./daily_blocks.png)

O número médio de blocos produzidos diariamente durante este período é de aproximadamente 5.874:

![](./avg_daily_blocks.png)

As consultas são:

```sql
# consulta para visualizar o número de blocos produzidos diariamente desde 2016

SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1

# número médio de blocos produzidos por dia

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

O número médio de blocos produzidos por dia desde 2016 é ligeiramente superior a esse número, em 5.874. Alternativamente, dividir 86400 segundos por uma média de 5874 blocos resulta em 14,7 segundos ou aproximadamente um bloco a cada 15 segundos.

### Gás {#gas}

Os blocos têm um tamanho limitado. O tamanho máximo do bloco é dinâmico e varia de acordo com a demanda da rede entre 12.500.000 e 25.000.000 unidades. São necessários limites para evitar que blocos de tamanho arbitrariamente grande sobrecarreguem os nós completos em termos de espaço em disco e requisitos de velocidade ([fonte](/developers/docs/blocks/)).

Uma forma de conceituar o limite de gás do bloco é pensar nele como a **oferta** de espaço de bloco disponível para transações em lote. O limite de gás do bloco pode ser consultado e visualizado de 2016 até os dias atuais:

![](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Depois, há o gás real usado diariamente para pagar pela computação feita na cadeia Ethereum (ou seja, enviar transações, chamar um contrato inteligente, mintar um NFT). Esta é a **demanda** por espaço de bloco disponível no Ethereum:

![](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Também podemos justapor estes dois gráficos para ver como a **demanda e a oferta** se alinham:

![gas_demand_supply](./gas_demand_supply.png)

Portanto, podemos entender os preços do gás como uma função da demanda por espaço de bloco do Ethereum, dada a oferta disponível.

Finalmente, podemos querer consultar os preços médios diários do gás para a cadeia Ethereum. No entanto, isso resultará em um tempo de consulta especialmente longo, por isso filtraremos nossa consulta para a quantidade média de gás paga por transação pela Ethereum Foundation.

![](./ef_daily_gas.png)

Podemos ver os preços do gás pagos por todas as transações feitas para o endereço da Ethereum Foundation ao longo dos anos. Aqui está a consulta:

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

Com este tutorial, entendemos os conceitos fundamentais do Ethereum e como a blockchain do Ethereum funciona, consultando e tendo uma noção dos dados em cadeia.

O painel que contém todo o código usado neste tutorial pode ser encontrado [aqui](https://dune.com/paulapivat/Learn-Ethereum).

Para mais usos de dados para explorar a web3, [encontre-me no Twitter](https://twitter.com/paulapivat).
