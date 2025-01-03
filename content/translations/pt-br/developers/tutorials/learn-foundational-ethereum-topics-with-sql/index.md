---
title: Aprenda Tópicos fundamentais de Ethereum com SQL
description: Este tutorial ajuda os leitores a entender os conceitos fundamentais de Ethereum, incluindo transações, blocos e gas, consultando dados on-chain com linguagem de consulta estruturada (SQL).
author: "Paul Apivat"
tags:
  - "SQL"
  - "Querying"
  - "Transações"
skill: intermediate
lang: pt-br
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Muitos tutorias da Ethereum são direcionadas para desenvolvedores, mas há uma falta de recursos educacionais para analistas de dados ou pessoas que desejam ver dados on-chain sem executar um cliente ou um nó.

Esse tutorial ajuda os leitores a entenderem os conceitos fundamentais da Ethereum, incluindo transações, blocos e gás, consultando dados on-chain com a linguagem SQL por meio de uma interface fornecida por [Dune Analytics](https://dune.xyz/home).

Dados on-chain podem nos ajudar a compreender a rede Ethereum como uma economia para capacidade computacional, e deve servir como base para entender os desafios enfrentados pela Ethereum hoje (por exemplo, o aumento dos preços do gas) e, o mais importante, discussões sobre soluções de escalabilidade.

### Transações {#transactions}

A jornada do usuário no Ethereum começa com a inicialização de uma conta controlada ou uma entidade com saldo ETH. Há duas categorias de contas: controlada pelo usuário ou um contrato inteligente (veja em: [ethereum.org](/developers/docs/accounts/)).

Qualquer conta pode ser visualizada em um explorador de bloco como a [Etherscan](https://etherscan.io/). Exploradores de bloco são um portal para os dados da Ethereum. Eles exibem, em tempo real, dados em blocos, transações, mineiradores, contas, e outras atividades on-chain (veja [aqui](/developers/docs/data-and-analytics/block-explorers/)).

No entanto, um usuário pode desejar consultar um dado diretamente para reconciliar as informações fornecidas por exploradores de bloco externos. O [Dune Analytics](https://duneanalytics.com/) fornece esse recurso para qualquer pessoa com algum conhecimento em SQL.

Como referência, a conta de contrato inteligente da Fundação Ethereum (EF) pode ser visualizada na [Etherscan](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae).

Uma coisa a ser observada é que todas as contas, incluindo as EF's, têm um endereço público que pode ser utilizado para enviar e receber transações.

O saldo da conta na Etherscan inclui transações regulare e transações internas. As transações internas, apesar do nome, não são _realmente_ transações que alteram o estado da cadeia. Elas são transferências de valores iniciadas pela execução de um contrato ([fonte](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Visto que as transações internas não têm assinatura, elas **não** são incluídas na blockchain e não podem ser consultadas com o Dune Analytics.

Portanto, este tutorial irá focar em transações regulares. Isso pode ser consultado como:

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

Isso irá gerar as mesmas informações fornecidas na página de transações do Etherscan. Para você comparar, aqui estão duas fontes:

#### Etherscan {#etherscan}

![](./etherscan_view.png)

[Visualizar página de contratos de EF's no Etherscan.](https://etherscan.io/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![](./dune_view.png)

Você pode encontrar o painel [aqui](https://duneanalytics.com/paulapivat/Learn-Ethereum). Clique na tabela para visualizar a consulta (veja também acima).

### Decompondo Transações {#breaking_down_transactions}

Uma transação enviada inclui várias informações, incluindo ([fonte](/developers/docs/transactions/)):

- **Destinatário**: O endereço de recebimento (chamado como "para")
- **Assinatura**: Enquanto as chaves privadas de um remetente assinam uma transação, o que podemos consultar com o SQL é o endereço público de um remetente ("de").
- **Valor**: Esta é a quantidade de ETH transferido (veja a coluna `ether`).
- **Dados**: Estes são dados arbitrários misturados (veja a coluna `dados`).
- **gasLimit**: a quantidade máxima de gas que pode ser consumida pela transação. As unidades de gas representam etapas computacionais
- **maxPriorityFeePerGas**: a quantidade máxima de gas a ser incluída como dica para o minerador
- **maxFeePerGas** - a quantidade máxima de gas disposta a ser paga pela transação (incluindo baseFeePerGas e maxPriorityFeePerGas)

Podemos consultar essas informações específicas sobre transações no endereço público da Fundação Ethereum:

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

Cada transação irá alterar o estado da máquina virtual da Ethereum ([EVM](/developers/docs/evm/)) ([fonte](/developers/docs/transactions/)). As transações são transmitidas à rede para serem verificadas e incluídas em um bloco. Cada transação está associada a um número de bloco. Para ver os dados, nós podemos consultar um número de bloco específico: 12396854 (o bloco mais recente entre as transações da Fundação Ethereum a partir desta escrita, 11/05/21).

Além disso, quando consultarmos os próximos dois blocos, podemos observar que cada bloco contém o hash do bloco anterior (i.., hash pai), ilustrando como a blockchain é formada.

Cada bloco contém uma referência ao bloco pai. Isso é mostrado abaixo entre as colunas `hash` e `parent_hash` (fonte[](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Aqui está a [consulta](https://duneanalytics.com/queries/44856/88292) no Dune Analytics:

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

Podemos examinar um bloco consultando o horário, o número de bloco, a dificuldade (quantidade de computação necessária), o hash, o hash pai e a nonce.

A única coisa que esta consulta não cobre é a _lista de transações_ que requer uma consulta separada abaixo e _raiz do estado_. Um nó completo ou de arquivamento irá armazenar todas as transações e transições de estado, permitindo que os clientes consultem o estado da cadeia a qualquer momento. Como isso requer um grande espaço de armazenamento, nós podemos separar os dados em cadeia dos dados de estado:

- Dados em cadeia (lista de blocos, transações)
- Dados de estado (resultado da transição de estado de cada transação)

A raiz de estado cai na última e são _ dados implícitos_ (não armazenados na cadeia), enquanto os dados em cadeia são explícitos e armazenados na própria cadeia ([fonte](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Para este tutorial, estaremos focando em dados on-chain que _podem_ ser consultados com SQL via Dune Analytics.

Como mencionado acima, cada bloco contém uma lista de transações, podemos consultar isso filtrando por um bloco específico. Vamos tentar o bloco mais recente, 12396854:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Segue o SQL output no Dune:

![](./list_of_txn.png)

Este único bloco sendo adicionado à cadeia altera o estado da máquina virtual Ethereum ([EVM](/developers/docs/evm/)). Dezenas, às vezes centenas, de transações são verificadas de uma só vez. Neste caso específico, foram incluídas 222 transações.

Para ver quantas foram realmente bem-sucedidas, nós adicionaríamos outro filtro para contar transações bem-sucedidas:

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

Para o bloco 12396854, do total de 222 transações, 204 foram verificadas com sucesso:

![](./successful_txn.png)

As solicitações de transações ocorrem dezenas de vezes por segundo, mas os blocos são confirmados aproximadamente uma vez a cada 15 segundos ([source](/developers/docs/blocks/)).

Para ver que há um bloco produzido aproximadamente a cada 15 segundos, poderíamos pegar o número de segundos em um dia (86400) por 15, para obter um número médio estimado de blocos por dia (~ 5760).

O gráfico de blocos Ethereum produzidos por dia (2016 - presente) é:

![](./daily_blocks.png)

O número médio de blocos produzidos diariamente durante esse período de tempo é de aproximadamente ~5.874:

![](./avg_daily_blocks.png)

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

O número médio de blocos produzidos por dia desde 2016 está um pouco acima desse número em 5.874. Alternativamente, dividindo 86400 segundos por 5874 blocos médios resultam em 14,7 segundos ou aproximadamente um bloco a cada 15 segundos.

### Gás {#gas}

Blocos são limitados em tamanho. O tamanho máximo do bloco é dinâmico e varia de acordo com a demanda de rede entre 12.500.000 e 25.000.000 unidades. Limites são necessários para evitar que, blocos de tamanho arbitrariamente grandes coloquem tensão em nós completos, em termos de espaço em disco e requisitos de velocidade ([source](/developers/docs/blocks/)).

Uma maneira de conceitualizar o limite de gas do bloco é pensar nele como o **suprimento** de espaço de bloco disponível para as transações em lote. O limite de gas do bloco pode ser consultado e visualizado a partir de 2016 até o presente dia:

![](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Depois, há o gas real usado diariamente para pagar pela computação realizada na cadeia Ethereum (ou seja, enviar transações, chamar um contrato inteligente, cunhar um NFT). Esta é a **demanda** por espaço de bloco disponível no Ethereum:

![](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Também podemos justapor esses dois gráficos para ver como a **demanda e oferta** se alinham:

![gas_demand_supply](./gas_demand_supply.png)

Portanto, podemos entender os preços do gas em função da demanda por espaço no bloco Ethereum, dada a oferta disponível.

Finalmente, podemos querer consultar os preços médios diários do gas para a cadeia Ethereum, no entanto, fazê-lo resultará em um tempo de consulta especialmente longo, então, filtraremos a nossa consulta pela quantidade média de gas paga por transação pela Fundação Ethereum.

![](./ef_daily_gas.png)

Podemos ver os preços do gas pagos por todas as transações feitas para o endereço da Ethereum Foundation ao longo dos anos. Aqui está a consulta:

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

Com este tutorial, entendemos os conceitos fundamentais do Ethereum e como a blockchain do Ethereum funciona consultando e obtendo uma ideia dos dados on-chain.

O painel que contém todo o código usado neste tutorial pode ser encontrado [aqui](https://duneanalytics.com/paulapivat/Learn-Ethereum).

Para mais uso de dados para explorar a web3 [siga-me no Twitter](https://twitter.com/paulapivat).
