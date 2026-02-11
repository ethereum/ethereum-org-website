---
title: "Crie seu próprio agente de negociação de IA no Ethereum"
description: "Neste tutorial, você aprenderá a criar um agente simples de negociação de IA. Este agente lê informações da cadeia de blocos, solicita uma recomendação a um LLM com base nessas informações, executa a negociação que o LLM recomenda e, em seguida, aguarda e repete."
author: |
  Ori Pomerantz
tags: [ "IA", "negociação", "agente", "python" ]
skill: intermediate
published: 2026-02-13
lang: pt-br
sidebarDepth: 3
---

Neste tutorial, você aprenderá a criar um agente simples de negociação de IA. Este agente funciona seguindo estas etapas:

1. Ler os preços atuais e passados de um token, bem como outras informações potencialmente relevantes
2. Criar uma consulta com essas informações, juntamente com informações de fundo para explicar como elas podem ser relevantes
3. Enviar a consulta e receber de volta um preço projetado
4. Negociar com base na recomendação
5. Aguardar e repetir

Este agente demonstra como ler informações, traduzi-las em uma consulta que produz uma resposta utilizável e usar essa resposta. Todas essas são etapas necessárias para um agente de IA. Este agente é implementado em Python porque é a linguagem mais comum usada em IA.

## Por que fazer isso? {#why-do-this}

Agentes de negociação automatizados permitem que os desenvolvedores selecionem e executem uma estratégia de negociação. [agentes de IA](/ai-agents) permitem estratégias de negociação mais complexas e dinâmicas, usando potencialmente informações e algoritmos que o desenvolvedor nem considerou usar.

## As ferramentas {#tools}

Este tutorial usa [Python](https://www.python.org/), a [biblioteca Web3](https://web3py.readthedocs.io/en/stable/) e o [Uniswap v3](https://github.com/Uniswap/v3-periphery) para cotações e negociações.

### Por que Python? {#python}

A linguagem mais utilizada para IA é o [Python](https://www.python.org/), por isso a usamos aqui. Não se preocupe se você não conhece Python. A linguagem é muito clara e explicarei exatamente o que ela faz.

A [biblioteca Web3](https://web3py.readthedocs.io/en/stable/) é a API Python Ethereum mais comum. É bem fácil de usar.

### Negociando na cadeia de blocos {#trading-on-blockchain}

Existem [muitas corretoras distribuídas (DEX)](/apps/categories/defi/) que permitem negociar tokens no Ethereum. No entanto, elas tendem a ter taxas de câmbio semelhantes devido à [arbitragem](/developers/docs/smart-contracts/composability/#better-user-experience).

O [Uniswap](https://app.uniswap.org/) é uma DEX amplamente utilizada que podemos usar tanto para cotações (para ver os valores relativos dos tokens) quanto para negociações.

### OpenAI {#openai}

Para um modelo de linguagem grande, escolhi começar com o [OpenAI](https://openai.com/). Para executar a aplicação neste tutorial, você precisará pagar pelo acesso à API. O pagamento mínimo de US$ 5 é mais do que suficiente.

## Desenvolvimento, passo a passo {#step-by-step}

Para simplificar o desenvolvimento, prosseguimos em etapas. Cada etapa é um branch no GitHub.

### Primeiros passos {#getting-started}

Existem etapas para começar no UNIX ou Linux (incluindo o [WSL](https://learn.microsoft.com/en-us/windows/wsl/install))

1. Se ainda não tiver, baixe e instale o [Python](https://www.python.org/downloads/).

2. Clone o repositório do GitHub.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. Instale o [`uv`](https://docs.astral.sh/uv/getting-started/installation/). O comando em seu sistema pode ser diferente.

   ```sh
   pipx install uv
   ```

4. Baixe as bibliotecas.

   ```sh
   uv sync
   ```

5. Ative o ambiente virtual.

   ```sh
   source .venv/bin/activate
   ```

6. Para verificar se o Python e o Web3 estão funcionando corretamente, execute o `python3` e forneça a ele este programa. Você pode inseri-lo no prompt `>>>`; não é necessário criar um arquivo.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### Lendo da cadeia de blocos {#read-blockchain}

O próximo passo é ler da cadeia de blocos. Para fazer isso, você precisa mudar para o branch `02-read-quote` e usar o `uv` para executar o programa.

```sh
git checkout 02-read-quote
uv run agent.py
```

Você deve receber uma lista de objetos `Quote`, cada um com um timestamp, um preço e o ativo (atualmente sempre `WETH/USDC`).

Aqui está uma explicação linha por linha.

```python
from web3 import Web3
from web3.contract import Contract
from decimal import Decimal, ROUND_HALF_UP
from dataclasses import dataclass
from datetime import datetime, timezone
from pprint import pprint
import time
import functools
import sys
```

Importe as bibliotecas que precisamos. Eles são explicados abaixo quando usados.

```python
print = functools.partial(print, flush=True)
```

Substitui o `print` do Python por uma versão que sempre descarrega a saída imediatamente. Isso é útil em um script de longa duração, porque não queremos esperar por atualizações de status ou saídas de depuração.

```python
MAINNET_URL = "https://eth.drpc.org"
```

Uma URL para chegar à rede principal. Você pode obter uma de um [Nó como serviço](/developers/docs/nodes-and-clients/nodes-as-a-service/) ou usar uma das anunciadas na [Chainlist](https://chainlist.org/chain/1).

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

Um bloco da rede principal do Ethereum geralmente acontece a cada doze segundos, então este é o número de blocos que esperamos que aconteçam em um período de tempo. Observe que este não é um número exato. Quando o [propositor de bloco](/developers/docs/consensus-mechanisms/pos/block-proposal/) está inativo, esse bloco é pulado e o tempo para o próximo bloco é de 24 segundos. Se quiséssemos obter o bloco exato para um timestamp, usaríamos a [busca binária](https://en.wikipedia.org/wiki/Binary_search). No entanto, isso é próximo o suficiente para nossos propósitos. Prever o futuro não é uma ciência exata.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

O tamanho do ciclo. Revisamos as cotações uma vez por ciclo e tentamos estimar o valor no final do próximo ciclo.

```python
# O endereço do pool que estamos lendo
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

Os valores da cotação são retirados do pool USDC/WETH do Uniswap 3 no endereço [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract). Este endereço já está no formato checksum, mas é melhor usar [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) para tornar o código reutilizável.

```python
POOL_ABI = [
    { "name": "slot0", ... },
    { "name": "token0", ... },
    { "name": "token1", ... },
]

ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... }
]
```

Estas são as [IABs](https://docs.soliditylang.org/en/latest/abi-spec.html) para os dois contratos que precisamos contatar. Para manter o código conciso, incluímos apenas as funções que precisamos chamar.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

Inicie a biblioteca [`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) e conecte-se a um nó Ethereum.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

Esta é uma maneira de criar uma classe de dados em Python. O tipo de dados [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) é usado para se conectar ao contrato. Observe o `(frozen=True)`. Em Python, os [booleanos](https://en.wikipedia.org/wiki/Boolean_data_type) são definidos como `True` ou `False`, com letra maiúscula. Esta classe de dados é `frozen` (congelada), o que significa que os campos não podem ser modificados.

Observe a indentação. Em contraste com as [linguagens derivadas de C](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages), o Python usa indentação para denotar blocos. O interpretador Python sabe que a definição a seguir não faz parte desta classe de dados porque não começa na mesma indentação que os campos da classe de dados.

```python
@dataclass(frozen=True)
class PoolInfo:
    address: str
    token0: ERC20Token
    token1: ERC20Token
    contract: Contract
    asset: str
    decimal_factor: Decimal = 1
```

O tipo [`Decimal`](https://docs.python.org/3/library/decimal.html) é usado para lidar com precisão com frações decimais.

```python
    def get_price(self, block: int) -> Decimal:
```

Esta é a maneira de definir uma função em Python. A definição é indentada para mostrar que ainda faz parte de `PoolInfo`.

Em uma função que faz parte de uma classe de dados, o primeiro parâmetro é sempre `self`, a instância da classe de dados que a chamou. Aqui há outro parâmetro, o número do bloco.

```python
        assert block <= w3.eth.block_number, "O bloco está no futuro"
```

Se pudéssemos ler o futuro, não precisaríamos de IA para negociação.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

A sintaxe para chamar uma função na EVM a partir do Web3 é esta: `<objeto de contrato>.functions.<nome da função>`().call(<parâmetros>)`. Os parâmetros podem ser os parâmetros da função da EVM (se houver; aqui não há) ou [parâmetros nomeados](https://en.wikipedia.org/wiki/Named_parameter) para modificar o comportamento da cadeia de blocos. Aqui usamos um, `block_identifier`, para especificar [o número do bloco](/developers/docs/apis/json-rpc/#default-block) no qual desejamos executar.

O resultado é [esta struct, em formato de array](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). O primeiro valor é uma função da taxa de câmbio entre os dois tokens.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

Para reduzir os cálculos na cadeia, o Uniswap v3 não armazena o fator de câmbio real, mas sim sua raiz quadrada. Como a EVM não suporta matemática de ponto flutuante ou frações, em vez do valor real, a resposta é <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (token1 por token0)
        return 1/(raw_price * self.decimal_factor)
```

O preço bruto que obtemos é o número de `token0` que obtemos para cada `token1`. Em nosso pool, o `token0` é USDC (moeda estável com o mesmo valor de um dólar americano) e o `token1` é [WETH](https://opensea.io/learn/blockchain/what-is-weth). O valor que realmente queremos é o número de dólares por WETH, não o inverso.

O fator decimal é a proporção entre os [fatores decimais](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) para os dois tokens.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

Essa classe de dados representa uma cotação: o preço de um ativo específico em um determinado momento. Neste ponto, o campo `asset` é irrelevante, porque usamos um único pool e, portanto, temos um único ativo. No entanto, adicionaremos mais ativos posteriormente.

```python
def read_token(address: str) -> ERC20Token:
    token = w3.eth.contract(address=address, abi=ERC20_ABI)
    symbol = token.functions.symbol().call()
    decimals = token.functions.decimals().call()

    return ERC20Token(
        address=address,
        symbol=symbol,
        decimals=decimals,
        contract=token
    )
```

Esta função recebe um endereço e retorna informações sobre o contrato do token nesse endereço. Para criar um novo [`Contrato` Web3](https://web3py.readthedocs.io/en/stable/web3.contract.html), fornecemos o endereço e a IAB para `w3.eth.contract`.

```python
def read_pool(address: str) -> PoolInfo:
    pool_contract = w3.eth.contract(address=address, abi=POOL_ABI)
    token0Address = pool_contract.functions.token0().call()
    token1Address = pool_contract.functions.token1().call()
    token0 = read_token(token0Address)
    token1 = read_token(token1Address)

    return PoolInfo(
        address=address,
        asset=f"{token1.symbol}/{token0.symbol}",
        token0=token0,
        token1=token1,
        contract=pool_contract,
        decimal_factor=Decimal(10) ** Decimal(token0.decimals - token1.decimals)
    )
```

Esta função retorna tudo o que precisamos sobre [um pool específico](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol). A sintaxe `f"<string>"` é uma [string formatada](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

Obtenha um objeto `Quote`. O valor padrão para `block_number` é `None` (sem valor).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

Se um número de bloco não foi especificado, use `w3.eth.block_number`, que é o número do bloco mais recente. Essa é a sintaxe para [uma instrução `if`](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement).

Pode parecer que seria melhor apenas definir o padrão como `w3.eth.block_number`, mas isso não funciona bem porque seria o número do bloco no momento em que a função é definida. Em um agente de longa duração, isso seria um problema.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

Use [a biblioteca `datetime`](https://docs.python.org/3/library/datetime.html) para formatá-lo em um formato legível para humanos e modelos de linguagem grandes (LLMs). Use [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) para arredondar o valor para duas casas decimais.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

Em Python, você define uma [lista](https://docs.python.org/3/library/stdtypes.html#typesseq-list) que só pode conter um tipo específico usando `list[<type>]`.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

Em Python, um [loop `for`](https://docs.python.org/3/tutorial/controlflow.html#for-statements) normalmente itera sobre uma lista. A lista de números de bloco para encontrar cotações vem de [`range`](https://docs.python.org/3/library/stdtypes.html#range).

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

Para cada número de bloco, obtenha um objeto `Quote` e anexe-o à lista `quotes`. Em seguida, retorne essa lista.

```python
pool = read_pool(WETHUSDC_ADDRESS)
quotes = get_quotes(
    pool,
    w3.eth.block_number - 12*CYCLE_BLOCKS,
    w3.eth.block_number,
    CYCLE_BLOCKS
)

pprint(quotes)
```

Este é o código principal do script. Leia as informações do pool, obtenha doze cotações e use [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint) para exibi-las.

### Criando um prompt {#prompt}

Em seguida, precisamos converter essa lista de cotações em um prompt para um LLM e obter um valor futuro esperado.

```sh
git checkout 03-create-prompt
uv run agent.py
```

A saída agora será um prompt para um LLM, semelhante a:

```
Dadas estas cotações:
Ativo: WETH/USDC
        2026-01-20T16:34 3016.21
        .
        .
        .
        2026-02-01T17:49 2299.10

Ativo: WBTC/WETH
        2026-01-20T16:34 29.84
        .
        .
        .
        2026-02-01T17:50 33.46


Qual você esperaria que fosse o valor para WETH/USDC no momento 2026-02-02T17:56?

Forneça sua resposta como um único número arredondado para duas casas decimais,
sem nenhum outro texto.
```

Observe que há cotações para dois ativos aqui, `WETH/USDC` e `WBTC/WETH`. Adicionar cotações de outro ativo pode melhorar a precisão da previsão.

#### Como é um prompt {#prompt-explanation}

Este prompt contém três seções, que são bastante comuns em prompts de LLM.

1. Informação. Os LLMs têm muitas informações de seu treinamento, mas geralmente não têm as mais recentes. É por isso que precisamos recuperar as cotações mais recentes aqui. Adicionar informações a um prompt é chamado de [geração aumentada por recuperação (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation).

2. A pergunta real. É isso que queremos saber.

3. Instruções de formatação de saída. Normalmente, um LLM nos dará uma estimativa com uma explicação de como chegou a ela. Isso é melhor para humanos, mas um programa de computador só precisa do resultado final.

#### Explicação do código {#prompt-code}

Aqui está o novo código.

```python
from datetime import datetime, timezone, timedelta
```

Precisamos fornecer ao LLM o tempo para o qual queremos uma estimativa. Para obter um tempo "n minutos/horas/dias" no futuro, usamos [a classe `timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta).

```python
# Os endereços dos pools que estamos lendo
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

Temos dois pools que precisamos ler.

```python
@dataclass(frozen=True)
class PoolInfo:
    .
    .
    .
    reverse: bool = False

    def get_price(self, block: int) -> Decimal:
        assert block <= w3.eth.block_number, "Block is in the future"
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (token1 per token0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

No pool WETH/USDC, queremos saber quantos `token0` (USDC) precisamos para comprar um `token1` (WETH). No pool WETH/WBTC, queremos saber quantos `token1` (WETH) precisamos para comprar um `token0` (WBTC, que é Bitcoin embrulhado). Precisamos rastrear se a proporção do pool precisa ser invertida.

```python
def read_pool(address: str, reverse: bool = False) -> PoolInfo:
    .
    .
    .

    return PoolInfo(
        .
        .
        .

        asset= f"{token1.symbol}/{token0.symbol}" if reverse else f"{token0.symbol}/{token1.symbol}",
        reverse=reverse
    )
```

Para saber se um pool precisa ser revertido, precisamos obter isso como entrada para `read_pool`. Além disso, o símbolo do ativo precisa ser configurado corretamente.

A sintaxe `<a> if <b> else <c>` é o equivalente em Python do [operador condicional ternário](https://en.wikipedia.org/wiki/Ternary_conditional_operator), que em uma linguagem derivada de C seria `<b> ?` <a> : <c>`.`

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

Esta função cria uma string que formata uma lista de objetos `Quote`, supondo que todos se apliquem ao mesmo ativo.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

Em Python, os [literais de string de várias linhas](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) são escritos como `"""` .... `"""`.

```python
Dadas estas cotações:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

Aqui, usamos o padrão [MapReduce](https://en.wikipedia.org/wiki/MapReduce) para gerar uma string para cada lista de cotações com `format_quotes` e, em seguida, reduzi-las a uma única string para uso no prompt.

```python
Qual você esperaria que fosse o valor para {asset} no momento {expected_time}?

Forneça sua resposta como um único número arredondado para duas casas decimais,
sem nenhum outro texto.
    """
```

O resto do prompt é como esperado.

```python
wethusdc_pool = read_pool(WETHUSDC_ADDRESS, True)
wethusdc_quotes = get_quotes(
    wethusdc_pool,
    w3.eth.block_number - 12*CYCLE_BLOCKS,
    w3.eth.block_number,
    CYCLE_BLOCKS,
)

wethwbtc_pool = read_pool(WETHWBTC_ADDRESS)
wethwbtc_quotes = get_quotes(
    wethwbtc_pool,
    w3.eth.block_number - 12*CYCLE_BLOCKS,
    w3.eth.block_number,
    CYCLE_BLOCKS
)
```

Revise os dois pools e obtenha cotações de ambos.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

Determine o ponto de tempo futuro para o qual queremos a estimativa e crie o prompt.

### Interface com um LLM {#interface-llm}

Em seguida, solicitamos um LLM real e recebemos um valor futuro esperado. Eu escrevi este programa usando OpenAI, então se você quiser usar um provedor diferente, precisará ajustá-lo.

1. Obtenha uma [conta OpenAI](https://auth.openai.com/create-account)

2. [Financie a conta](https://platform.openai.com/settings/organization/billing/overview) — o valor mínimo no momento da escrita é de US$ 5

3. [Crie uma chave de API](https://platform.openai.com/settings/organization/api-keys)

4. Na linha de comando, exporte a chave de API para que seu programa possa usá-la

   ```sh
   export OPENAI_API_KEY=sk-<o restante da chave vai aqui>
   ```

5. Faça o checkout e execute o agente

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

Aqui está o novo código.

```python
from openai import OpenAI

open_ai = OpenAI()  # O cliente lê a variável de ambiente OPENAI_API_KEY
```

Importe e instancie a API OpenAI.

```python
response = open_ai.chat.completions.create(
    model="gpt-4-turbo",
    messages=[
        {"role": "user", "content": prompt}
    ],
    temperature=0.0,
    max_tokens=16,
)
```

Chame a API OpenAI (`open_ai.chat.completions.create`) para criar a resposta.

```python
expected_price = Decimal(response.choices[0].message.content.strip())
current_price = wethusdc_quotes[-1].price

print ("Current price:", wethusdc_quotes[-1].price)
print(f"In {future_time}, expected price: {expected_price} USD")

if (expected_price > current_price):
    print(f"Buy, I expect the price to go up by {expected_price - current_price} USD")
else:
    print(f"Sell, I expect the price to go down by {current_price - expected_price} USD")
```

Mostre o preço e forneça uma recomendação de compra ou venda.

#### Testando as previsões {#testing-the-predictions}

Agora que podemos gerar previsões, também podemos usar dados históricos para avaliar se produzimos previsões úteis.

```sh
uv run test-predictor.py
```

O resultado esperado é semelhante a:

```
Previsão para 2026-01-05T19:50: previsto 3138.93 USD, real 3218.92 USD, erro 79.99 USD
Previsão para 2026-01-06T19:56: previsto 3243.39 USD, real 3221.08 USD, erro 22.31 USD
Previsão para 2026-01-07T20:02: previsto 3223.24 USD, real 3146.89 USD, erro 76.35 USD
Previsão para 2026-01-08T20:11: previsto 3150.47 USD, real 3092.04 USD, erro 58.43 USD
.
.
.
Previsão para 2026-01-31T22:33: previsto 2637.73 USD, real 2417.77 USD, erro 219.96 USD
Previsão para 2026-02-01T22:41: previsto 2381.70 USD, real 2318.84 USD, erro 62.86 USD
Previsão para 2026-02-02T22:49: previsto 2234.91 USD, real 2349.28 USD, erro 114.37 USD
Erro médio de previsão em 29 previsões: 83.87103448275862068965517241 USD
Mudança média por recomendação: 4.787931034482758620689655172 USD
Variância padrão das mudanças: 104.42 USD
Dias lucrativos: 51.72%
Dias com perdas: 48.28%
```

A maior parte do testador é idêntica ao agente, mas aqui estão as partes que são novas ou modificadas.

```python
CYCLES_FOR_TEST = 40 # Para o backtest, quantos ciclos testamos

# Obtenha muitas cotações
wethusdc_pool = read_pool(WETHUSDC_ADDRESS, True)
wethusdc_quotes = get_quotes(
    wethusdc_pool,
    w3.eth.block_number - CYCLE_BLOCKS*CYCLES_FOR_TEST,
    w3.eth.block_number,
    CYCLE_BLOCKS,
)

wethwbtc_pool = read_pool(WETHWBTC_ADDRESS)
wethwbtc_quotes = get_quotes(
    wethwbtc_pool,
    w3.eth.block_number - CYCLE_BLOCKS*CYCLES_FOR_TEST,
    w3.eth.block_number,
    CYCLE_BLOCKS
)
```

Analisamos `CYCLES_FOR_TEST` (especificado como 40 aqui) dias para trás.

```python
# Crie previsões e verifique-as em relação ao histórico real

total_error = Decimal(0)
changes = []
```

Existem dois tipos de erros nos quais estamos interessados. O primeiro, `total_error`, é simplesmente a soma dos erros que o previsor cometeu.

Para entender o segundo, `changes`, precisamos nos lembrar do propósito do agente. Não é prever a proporção WETH/USDC (preço do ETH). É para emitir recomendações de venda e compra. Se o preço atual for US$ 2.000 e ele prever US$ 2.010 para amanhã, não nos importamos se o resultado real for US$ 2.020 e ganharmos dinheiro extra. Mas nós nos importamos se ele previu US$ 2.010 e comprou ETH com base nessa recomendação, e o preço cair para US$ 1.990.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

Só podemos analisar os casos em que o histórico completo (os valores usados para a previsão e o valor do mundo real para compará-lo) está disponível. Isso significa que o caso mais recente deve ser aquele que começou há `CYCLES_BACK`.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

Use [fatias (slices)](https://www.w3schools.com/python/ref_func_slice.asp) para obter o mesmo número de amostras que o número que o agente usa. O código entre aqui e o próximo segmento é o mesmo código para obter uma previsão que temos no agente.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

Obtenha o preço previsto, o preço real e o preço no momento da previsão. Precisamos do preço no momento da previsão para determinar se a recomendação foi de compra ou de venda.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

Calcule o erro e adicione-o ao total.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

Para `changes`, queremos o impacto monetário da compra ou venda de um ETH. Então, primeiro, precisamos determinar a recomendação, depois avaliar como o preço real mudou e se a recomendação gerou lucro (mudança positiva) ou prejuízo (mudança negativa).

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

Relate os resultados.

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

Use o [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) para contar o número de dias lucrativos e o número de dias com prejuízo. O resultado é um objeto de filtro, que precisamos converter em uma lista para obter o comprimento.

### Envio de transações {#submit-txn}

Agora precisamos realmente enviar as transações. No entanto, não quero gastar dinheiro de verdade neste momento, antes que o sistema seja comprovado. Em vez disso, criaremos uma bifurcação local da rede principal e "negociaremos" nessa rede.

Aqui estão as etapas para criar uma bifurcação local e habilitar a negociação.

1. Instale o [Foundry](https://getfoundry.sh/introduction/installation)

2. Inicie o [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` está escutando na URL padrão para o Foundry, http://localhost:8545, então não precisamos especificar a URL para o [comando `cast`](https://getfoundry.sh/cast/overview) que usamos para manipular a cadeia de blocos.

3. Ao executar no `anvil`, há dez contas de teste que têm ETH — defina as variáveis de ambiente para a primeira

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. Estes são os contratos que precisamos usar. O [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) é o contrato Uniswap v3 que usamos para negociar de fato. Poderíamos negociar diretamente através do pool, mas isso é muito mais fácil.

   As duas variáveis inferiores são os caminhos do Uniswap v3 necessários para trocar entre WETH e USDC.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. Cada uma das contas de teste tem 10.000 ETH. Use o contrato WETH para embrulhar 1000 ETH e obter 1000 WETH para negociação.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. Use o `SwapRouter` para negociar 500 WETH por USDC.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   A chamada `approve` cria uma permissão que permite que o `SwapRouter` gaste alguns dos nossos tokens. Contratos não podem monitorar eventos, portanto, se transferirmos tokens diretamente para o contrato `SwapRouter`, ele não saberia que foi pago. Em vez disso, permitimos que o contrato `SwapRouter` gaste uma certa quantia, e então o `SwapRouter` o faz. Isso é feito através de uma função chamada pelo `SwapRouter`, para que ele saiba se foi bem-sucedido.

7. Verifique se você tem o suficiente de ambos os tokens.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

Agora que temos WETH e USDC, podemos realmente executar o agente.

```sh
git checkout 05-trade
uv run agent.py
```

A saída será semelhante a:

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
Preço atual: 1843.16
Em 2026-02-06T23:07, preço esperado: 1724.41 USD
Saldos da conta antes da negociação:
Saldo de USDC: 927301.578272
Saldo de WETH: 500
Vender, espero que o preço caia 118,75 USD
Transação de aprovação enviada: 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
Transação de aprovação minerada.
Transação de venda enviada: fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
Transação de venda minerada.
Saldos da conta após a negociação:
Saldo de USDC: 929143.797116
Saldo de WETH: 499
```

Para realmente usá-lo, você precisa de algumas pequenas alterações.

- Na linha 14, altere `MAINNET_URL` para um ponto de acesso real, como `https://eth.drpc.org`
- Na linha 28, altere `PRIVATE_KEY` para sua própria chave privada
- A menos que você seja muito rico e possa comprar ou vender 1 ETH por dia para um agente não comprovado, você pode querer alterar a linha 29 para diminuir o `WETH_TRADE_AMOUNT`

#### Explicação do código {#trading-code}

Aqui está o novo código.

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

As mesmas variáveis que usamos na etapa 4.

```python
WETH_TRADE_AMOUNT=1
```

A quantia a ser negociada.

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

Para realmente negociar, precisamos da função `approve`. Também queremos mostrar os saldos antes e depois, então também precisamos de `balanceOf`.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

Na IAB do `SwapRouter`, só precisamos de `exactInput`. Existe uma função relacionada, `exactOutput`, que poderíamos usar para comprar exatamente um WETH, mas para simplificar, usamos apenas `exactInput` em ambos os casos.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

As definições do Web3 para a [`conta`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) e o contrato `SwapRouter`.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

Os parâmetros da transação. Precisamos de uma função aqui porque [o nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) deve mudar a cada vez.

```python
def approve_token(contract: Contract, amount: int):
```

Aprove uma permissão de token para o `SwapRouter`.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

É assim que enviamos uma transação no Web3. Primeiro, usamos [o objeto `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) para construir a transação. Em seguida, usamos [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) para assinar a transação, usando `PRIVATE_KEY`. Finalmente, usamos [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) para enviar a transação.

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) espera até que a transação seja minerada. Ele retorna o recibo, se necessário.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

Estes são os parâmetros ao vender WETH.

```python
def make_buy_params(quote: Quote) -> dict:
    return {
        "path": USDC_TO_WETH,
        "recipient": account.address,
        "deadline": 2**256 - 1,
        "amountIn": int(quote.price*WETH_TRADE_AMOUNT) * 10**wethusdc_pool.token0.decimals,
        "amountOutMinimum": 0,
    }
```

Em contraste com `SELL_PARAMS`, os parâmetros de compra podem mudar. O valor de entrada é o custo de 1 WETH, conforme disponível em `quote`.

```python
def buy(quote: Quote):
    buy_params = make_buy_params(quote)
    approve_token(wethusdc_pool.token0.contract, buy_params["amountIn"])
    txn = swap_router.functions.exactInput(buy_params).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Buy transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Buy transaction mined.")


def sell():
    approve_token(wethusdc_pool.token1.contract,
                  WETH_TRADE_AMOUNT * 10**wethusdc_pool.token1.decimals)
    txn = swap_router.functions.exactInput(SELL_PARAMS).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Sell transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Sell transaction mined.")
```

As funções `buy()` e `sell()` são quase idênticas. Primeiro, aprovamos uma permissão suficiente para o `SwapRouter` e, em seguida, o chamamos com o caminho e a quantia corretos.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

Relate os saldos do usuário em ambas as moedas.

```python
print("Saldos da conta antes da negociação:")
balances()

if (expected_price > current_price):
    print(f"Comprar, espero que o preço suba em {expected_price - current_price} USD")
    buy(wethusdc_quotes[-1])
else:
    print(f"Vender, espero que o preço caia em {current_price - expected_price} USD")
    sell()

print("Saldos da conta após a negociação:")
balances()
```

Este agente atualmente só funciona uma vez. No entanto, você pode alterá-lo para funcionar continuamente, executando-o a partir do [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) ou envolvendo as linhas 368-400 em um loop e usando [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) para esperar até a hora do próximo ciclo.

## Possíveis melhorias {#improvements}

Esta não é uma versão de produção completa; é apenas um exemplo para ensinar o básico. Aqui estão algumas ideias de melhorias.

### Negociação mais inteligente {#smart-trading}

Há dois fatos importantes que o agente ignora ao decidir o que fazer.

- _A magnitude da mudança antecipada_. O agente vende uma quantia fixa de `WETH` se o preço for esperado para diminuir, independentemente da magnitude do declínio.
  Pode-se argumentar que seria melhor ignorar pequenas alterações e vender com base no quanto esperamos que o preço caia.
- _O portfólio atual_. Se 10% do seu portfólio estiver em WETH e você achar que o preço vai subir, provavelmente faz sentido comprar mais. Mas se 90% do seu portfólio estiver em WETH, você pode estar suficientemente exposto e não há necessidade de comprar mais. O inverso é verdadeiro se você espera que o preço caia.

### E se você quiser manter sua estratégia de negociação em segredo? {#secret}

Os fornecedores de IA podem ver as consultas que você envia para seus LLMs, o que poderia expor o sistema de negociação genial que você desenvolveu com seu agente. Um sistema de negociação que muitas pessoas usam não tem valor, porque muitas pessoas tentam comprar quando você quer comprar (e o preço sobe) e tentam vender quando você quer vender (e o preço cai).

Você pode executar um LLM localmente, por exemplo, usando o [LM-Studio](https://lmstudio.ai/), para evitar este problema.

### De bot de IA para agente de IA {#bot-to-agent}

Você pode argumentar que este é [um bot de IA, não um agente de IA](/ai-agents/#ai-agents-vs-ai-bots). Ele implementa uma estratégia relativamente simples que depende de informações predefinidas. Podemos habilitar a auto-melhoria, por exemplo, fornecendo uma lista de pools do Uniswap v3 e seus valores mais recentes e perguntando qual combinação tem o melhor valor preditivo.

### Proteção contra slippage {#slippage-protection}

Atualmente não há [proteção contra slippage](https://uniswapv3book.com/milestone_3/slippage-protection.html). Se a cotação atual for de US$ 2.000 e o preço esperado for de US$ 2.100, o agente comprará. No entanto, se antes de o agente comprar o custo subir para US$ 2.200, não faz mais sentido comprar.

Para implementar a proteção contra slippage, especifique um valor de `amountOutMinimum` nas linhas 325 e 334 de [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325).

## Conclusão {#conclusion}

Esperamos que agora você saiba o suficiente para começar a usar agentes de IA. Esta não é uma visão geral abrangente do assunto; existem livros inteiros dedicados a isso, mas isso é suficiente para você começar. Boa sorte!

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).
