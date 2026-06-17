---
title: Crea tu propio agente de IA de trading en Ethereum
description: En este tutorial aprenderás a crear un agente de IA de trading sencillo. Este agente lee información de la cadena de bloques, pide a un LLM una recomendación basada en esa información, realiza el intercambio que el LLM recomienda, y luego espera y repite.
author: Ori Pomerantz
tags: ["IA", "trading", "agente", "python"]
skill: intermediate
breadcrumb: Agente de IA de trading
published: 2026-02-13
lang: es
sidebarDepth: 3
---

En este tutorial aprenderás a construir un agente de IA de trading sencillo. Este agente funciona siguiendo estos pasos:

1. Leer los precios actuales y pasados de un token, así como otra información potencialmente relevante
2. Construir una consulta con esta información, junto con información de contexto para explicar cómo podría ser relevante
3. Enviar la consulta y recibir a cambio un precio proyectado
4. Operar basándose en la recomendación
5. Esperar y repetir

Este agente demuestra cómo leer información, traducirla en una consulta que produzca una respuesta utilizable y usar esa respuesta. Todos estos son pasos necesarios para un agente de IA. Este agente está implementado en Python porque es el lenguaje más común utilizado en IA.

## ¿Por qué hacer esto? {#why-do-this}

Los agentes de trading automatizados permiten a los desarrolladores seleccionar y ejecutar una estrategia de trading. Los [agentes de IA](/ai-agents) permiten estrategias de trading más complejas y dinámicas, utilizando potencialmente información y algoritmos que el desarrollador ni siquiera ha considerado usar.

## Las herramientas {#tools}

Este tutorial utiliza [Python](https://www.python.org/), la [biblioteca Web3](https://web3py.readthedocs.io/en/stable/) y [Uniswap v3](https://github.com/Uniswap/v3-periphery) para cotizaciones y operaciones.

### ¿Por qué Python? {#python}

El lenguaje más utilizado para la IA es [Python](https://www.python.org/), así que lo usaremos aquí. No te preocupes si no sabes Python. El lenguaje es muy claro y explicaré exactamente qué hace.

La [biblioteca Web3](https://web3py.readthedocs.io/en/stable/) es la API de Ethereum para Python más común. Es bastante fácil de usar.

### Operar en la cadena de bloques {#trading-on-blockchain}

Hay [muchos intercambios descentralizados (DEX)](/apps/categories/defi/) que te permiten intercambiar tokens en Ethereum. Sin embargo, tienden a tener tasas de cambio similares debido al [arbitraje](/developers/docs/smart-contracts/composability/#better-user-experience).

[Uniswap](https://app.uniswap.org/) es un DEX muy utilizado que podemos usar tanto para cotizaciones (para ver los valores relativos de los tokens) como para operaciones.

### OpenAI {#openai}

Para un modelo de lenguaje grande, elegí empezar con [OpenAI](https://openai.com/). Para ejecutar la aplicación en este tutorial tendrás que pagar por el acceso a la API. El pago mínimo de 5 $ es más que suficiente.

## Desarrollo, paso a paso {#step-by-step}

Para simplificar el desarrollo, procederemos por etapas. Cada paso es una rama en GitHub.

### Primeros pasos {#getting-started}

Hay pasos para empezar en UNIX o Linux (incluyendo [WSL](https://learn.microsoft.com/en-us/windows/wsl/install))

1. Si aún no lo tienes, descarga e instala [Python](https://www.python.org/downloads/).

2. Clona el repositorio de GitHub.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. Instala [`uv`](https://docs.astral.sh/uv/getting-started/installation/). El comando en tu sistema podría ser diferente.

   ```sh
   pipx install uv
   ```

4. Descarga las bibliotecas.

   ```sh
   uv sync
   ```

5. Activa el entorno virtual.

   ```sh
   source .venv/bin/activate
   ```

6. Para verificar que Python y Web3 funcionan correctamente, ejecuta `python3` y proporciónale este programa. Puedes introducirlo en el prompt `>>>`; no hay necesidad de crear un archivo.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### Leer de la cadena de bloques {#read-blockchain}

El siguiente paso es leer de la cadena de bloques. Para hacerlo, necesitas cambiar a la rama `02-read-quote` y luego usar `uv` para ejecutar el programa.

```sh
git checkout 02-read-quote
uv run agent.py
```

Deberías recibir una lista de objetos `Quote`, cada uno con una marca de tiempo, un precio y el activo (actualmente siempre `WETH/USDC`).

Aquí tienes una explicación línea por línea.

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

Importa las bibliotecas que necesitamos. Se explican a continuación cuando se utilizan.

```python
print = functools.partial(print, flush=True)
```

Reemplaza el `print` de Python con una versión que siempre vacía la salida inmediatamente. Esto es útil en un script de larga duración porque no queremos esperar a las actualizaciones de estado o a la salida de depuración.

```python
MAINNET_URL = "https://eth.drpc.org"
```

Una URL para llegar a la Red principal. Puedes obtener una de un [Nodo como servicio](/developers/docs/nodes-and-clients/nodes-as-a-service/) o usar una de las anunciadas en [Chainlist](https://chainlist.org/chain/1).

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

Un bloque de la red principal de Ethereum suele ocurrir cada doce segundos, así que este es el número de bloques que esperaríamos que ocurrieran en un período de tiempo. Ten en cuenta que esta no es una cifra exacta. Cuando el [proponente de bloque](/developers/docs/consensus-mechanisms/pos/block-proposal/) está inactivo, ese bloque se omite y el tiempo para el siguiente bloque es de 24 segundos. Si quisiéramos obtener el bloque exacto para una marca de tiempo, usaríamos una [búsqueda binaria](https://en.wikipedia.org/wiki/Binary_search). Sin embargo, esto es lo suficientemente cercano para nuestros propósitos. Predecir el futuro no es una ciencia exacta.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

El tamaño del ciclo. Revisamos las cotizaciones una vez por ciclo e intentamos estimar el valor al final del siguiente ciclo.

```python
# La dirección del pool que estamos leyendo
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

Los valores de cotización se toman del pool USDC/WETH de Uniswap 3 en la dirección [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract). Esta dirección ya está en formato de suma de comprobación (checksum), pero es mejor usar [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) para hacer que el código sea reutilizable.

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

Estas son las [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) para los dos contratos con los que necesitamos contactar. Para mantener el código conciso, incluimos solo las funciones que necesitamos llamar.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

Inicia la biblioteca [`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) y conéctate a un nodo de Ethereum.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

Esta es una forma de crear una clase de datos en Python. El tipo de datos [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) se utiliza para conectarse al contrato. Fíjate en el `(frozen=True)`. En Python, los [booleanos](https://en.wikipedia.org/wiki/Boolean_data_type) se definen como `True` o `False`, en mayúsculas. Esta clase de datos es `frozen`, lo que significa que los campos no se pueden modificar.

Fíjate en la sangría. A diferencia de los [lenguajes derivados de C](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages), Python utiliza la sangría para denotar bloques. El intérprete de Python sabe que la siguiente definición no es parte de esta clase de datos porque no comienza con la misma sangría que los campos de la clase de datos.

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

El tipo [`Decimal`](https://docs.python.org/3/library/decimal.html) se utiliza para manejar con precisión las fracciones decimales.

```python
    def get_price(self, block: int) -> Decimal:
```

Esta es la forma de definir una función en Python. La definición está sangrada para mostrar que todavía es parte de `PoolInfo`.

En una función que es parte de una clase de datos, el primer parámetro siempre es `self`, la instancia de la clase de datos que se llamó aquí. Aquí hay otro parámetro, el número de bloque.

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

Si pudiéramos leer el futuro, no necesitaríamos IA para el trading.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

La sintaxis para llamar a una función en la EVM desde Web3 es esta: `<contract object>.functions.<function name>().call(<parameters>)`. Los parámetros pueden ser los parámetros de la función de la EVM (si los hay; aquí no los hay) o [parámetros con nombre](https://en.wikipedia.org/wiki/Named_parameter) para modificar el comportamiento de la cadena de bloques. Aquí usamos uno, `block_identifier`, para especificar [el número de bloque](/developers/docs/apis/json-rpc/#default-block) en el que deseamos ejecutar.

El resultado es [esta estructura, en forma de matriz](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). El primer valor es una función de la tasa de cambio entre los dos tokens.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

Para reducir los cálculos en cadena, Uniswap v3 no almacena el factor de intercambio real, sino su raíz cuadrada. Debido a que la EVM no admite matemáticas de punto flotante ni fracciones, en lugar del valor real, la respuesta es <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5;</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (token1 por token0)
        return 1/(raw_price * self.decimal_factor)
```

El precio bruto que obtenemos es el número de `token0` que obtenemos por cada `token1`. En nuestro pool, `token0` es USDC (moneda estable con el mismo valor que un dólar estadounidense) y `token1` es [WETH](https://opensea.io/learn/blockchain/what-is-weth). El valor que realmente queremos es el número de dólares por WETH, no a la inversa.

El factor decimal es la proporción entre los [factores decimales](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) de los dos tokens.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

Esta clase de datos representa una cotización: el precio de un activo específico en un momento dado. En este punto, el campo `asset` es irrelevante porque usamos un solo pool y, por lo tanto, tenemos un solo activo. Sin embargo, añadiremos más activos más adelante.

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

Esta función toma una dirección y devuelve información sobre el contrato del token en esa dirección. Para crear un nuevo [`Contract` de Web3](https://web3py.readthedocs.io/en/stable/web3.contract.html), proporcionamos la dirección y la ABI a `w3.eth.contract`.

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

Esta función devuelve todo lo que necesitamos sobre [un pool específico](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol). La sintaxis `f"<string>"` es una [cadena formateada](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

Obtén un objeto `Quote`. El valor predeterminado para `block_number` es `None` (sin valor).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

Si no se especificó un número de bloque, usa `w3.eth.block_number`, que es el último número de bloque. Esta es la sintaxis para [una declaración `if`](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement).

Podría parecer que habría sido mejor simplemente establecer el valor predeterminado en `w3.eth.block_number`, pero eso no funciona bien porque sería el número de bloque en el momento en que se define la función. En un agente de larga duración, esto sería un problema.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

Usa [la biblioteca `datetime`](https://docs.python.org/3/library/datetime.html) para formatearlo a un formato legible para humanos y modelos de lenguaje grandes (LLM). Usa [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) para redondear el valor a dos decimales.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

En Python defines una [lista](https://docs.python.org/3/library/stdtypes.html#typesseq-list) que solo puede contener un tipo específico usando `list[<type>]`.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

En Python, un [bucle `for`](https://docs.python.org/3/tutorial/controlflow.html#for-statements) normalmente itera sobre una lista. La lista de números de bloque en los que encontrar cotizaciones proviene de [`range`](https://docs.python.org/3/library/stdtypes.html#range).

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

Para cada número de bloque, obtén un objeto `Quote` y añádelo a la lista `quotes`. Luego devuelve esa lista.

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

Este es el código principal del script. Lee la información del pool, obtén doce cotizaciones y [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint) (imprímelas).

### Crear un prompt {#prompt}

A continuación, necesitamos convertir esta lista de cotizaciones en un prompt para un LLM y obtener un valor futuro esperado.

```sh
git checkout 03-create-prompt
uv run agent.py
```

La salida ahora va a ser un prompt para un LLM, similar a:

```
Dadas estas cotizaciones:
Activo: WETH/USDC
        2026-01-20T16:34 3016.21
        .
        .
        .
        2026-02-01T17:49 2299.10

Activo: WBTC/WETH
        2026-01-20T16:34 29.84
        .
        .
        .
        2026-02-01T17:50 33.46


¿Cuál esperarías que fuera el valor de WETH/USDC en el momento 2026-02-02T17:56?

Proporciona tu respuesta como un solo número redondeado a dos decimales,
sin ningún otro texto.
```

Ten en cuenta que aquí hay cotizaciones para dos activos, `WETH/USDC` y `WBTC/WETH`. Añadir cotizaciones de otro activo podría mejorar la precisión de la predicción.

#### Cómo se ve un prompt {#prompt-explanation}

Este prompt contiene tres secciones, que son bastante comunes en los prompts de LLM.

1. Información. Los LLM tienen mucha información de su entrenamiento, pero normalmente no tienen la más reciente. Esta es la razón por la que necesitamos recuperar las últimas cotizaciones aquí. Añadir información a un prompt se llama [generación aumentada por recuperación (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation).

2. La pregunta real. Esto es lo que queremos saber.

3. Instrucciones de formato de salida. Normalmente, un LLM nos dará una estimación con una explicación de cómo llegó a ella. Esto es mejor para los humanos, pero un programa informático solo necesita el resultado final.

#### Explicación del código {#prompt-code}

Aquí está el nuevo código.

```python
from datetime import datetime, timezone, timedelta
```

Necesitamos proporcionar al LLM el tiempo para el cual queremos una estimación. Para obtener un tiempo de "n minutos/horas/días" en el futuro, usamos [la clase `timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta).

```python
# Las direcciones de los pools que estamos leyendo
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

Tenemos dos pools que necesitamos leer.

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
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (token1 por token0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

En el pool WETH/USDC, queremos saber cuántos `token0` (USDC) necesitamos para comprar un `token1` (WETH). En el pool WETH/WBTC, queremos saber cuántos `token1` (WETH) necesitamos para comprar un `token0` (WBTC, que es Bitcoin envuelto). Necesitamos hacer un seguimiento de si la proporción del pool debe invertirse.

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

Para saber si un pool necesita ser invertido, tenemos que obtener eso como entrada para `read_pool`. Además, el símbolo del activo debe configurarse correctamente.

La sintaxis `<a> if <b> else <c>` es el equivalente en Python del [operador condicional ternario](https://en.wikipedia.org/wiki/Ternary_conditional_operator), que en un lenguaje derivado de C sería `<b> ? <a> : <c>`.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

Esta función construye una cadena que formatea una lista de objetos `Quote`, asumiendo que todos se aplican al mismo activo.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

En Python, los [literales de cadena de varias líneas](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) se escriben como `"""` .... `"""`.

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

Aquí, usamos el patrón [MapReduce](https://en.wikipedia.org/wiki/MapReduce) para generar una cadena para cada lista de cotizaciones con `format_quotes`, y luego las reducimos a una sola cadena para usarla en el prompt.

```python
What would you expect the value for {asset} to be at time {expected_time}?

Provide your answer as a single number rounded to two decimal places,
without any other text.
    """
```

El resto del prompt es como se esperaba.

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

Revisa los dos pools y obtén cotizaciones de ambos.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

Determina el punto de tiempo futuro para el cual queremos la estimación y crea el prompt.

### Interactuar con un LLM {#interface-llm}

A continuación, enviamos un prompt a un LLM real y recibimos un valor futuro esperado. Escribí este programa usando OpenAI, así que si quieres usar un proveedor diferente, tendrás que ajustarlo.

1. Obtén una [cuenta de OpenAI](https://auth.openai.com/create-account)
2. [Añade fondos a la cuenta](https://platform.openai.com/settings/organization/billing/overview): la cantidad mínima en el momento de escribir esto es de 5 $
3. [Crea una clave de API](https://platform.openai.com/settings/organization/api-keys)
4. En la línea de comandos, exporta la clave de API para que tu programa pueda usarla

   ```sh
   export OPENAI_API_KEY=sk-<the rest of the key goes here>
   ```

5. Cambia de rama (checkout) y ejecuta el agente

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

Aquí está el nuevo código.

```python
from openai import OpenAI

open_ai = OpenAI()  # El cliente lee la variable de entorno OPENAI_API_KEY
```

Importa e instancia la API de OpenAI.

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

Llama a la API de OpenAI (`open_ai.chat.completions.create`) para crear la respuesta.

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

Muestra el precio y proporciona una recomendación de compra o venta.

#### Probar las predicciones {#testing-the-predictions}

Ahora que podemos generar predicciones, también podemos usar datos históricos para evaluar si producimos predicciones útiles.

```sh
uv run test-predictor.py
```

El resultado esperado es similar a:

```
Predicción para 2026-01-05T19:50: predicho 3138.93 USD, real 3218.92 USD, error 79.99 USD
Predicción para 2026-01-06T19:56: predicho 3243.39 USD, real 3221.08 USD, error 22.31 USD
Predicción para 2026-01-07T20:02: predicho 3223.24 USD, real 3146.89 USD, error 76.35 USD
Predicción para 2026-01-08T20:11: predicho 3150.47 USD, real 3092.04 USD, error 58.43 USD
.
.
.
Predicción para 2026-01-31T22:33: predicho 2637.73 USD, real 2417.77 USD, error 219.96 USD
Predicción para 2026-02-01T22:41: predicho 2381.70 USD, real 2318.84 USD, error 62.86 USD
Predicción para 2026-02-02T22:49: predicho 2234.91 USD, real 2349.28 USD, error 114.37 USD
Error medio de predicción en 29 predicciones: 83.87103448275862068965517241 USD
Cambio medio por recomendación: 4.787931034482758620689655172 USD
Varianza estándar de los cambios: 104.42 USD
Días rentables: 51.72%
Días con pérdidas: 48.28%
```

La mayor parte del probador es idéntica al agente, pero aquí están las partes que son nuevas o modificadas.

```python
CYCLES_FOR_TEST = 40 # Para el backtest, sobre cuántos ciclos probamos

# Obtener muchas cotizaciones
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

Miramos `CYCLES_FOR_TEST` (especificado como 40 aquí) días atrás.

```python
# Crear predicciones y verificarlas contra el historial real

total_error = Decimal(0)
changes = []
```

Hay dos tipos de errores que nos interesan. El primero, `total_error`, es simplemente la suma de los errores que cometió el predictor.

Para entender el segundo, `changes`, necesitamos recordar el propósito del agente. No es predecir la proporción WETH/USDC (precio de ETH). Es emitir recomendaciones de venta y compra. Si el precio actual es de 2000 $ y predice 2010 $ para mañana, no nos importa si el resultado real es 2020 $ y ganamos dinero extra. Pero _sí_ nos importa si predijo 2010 $, y compró ETH basándose en esa recomendación, y el precio cae a 1990 $.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

Solo podemos observar los casos en los que el historial completo (los valores utilizados para la predicción y el valor del mundo real con el que compararlo) está disponible. Esto significa que el caso más reciente debe ser el que comenzó hace `CYCLES_BACK`.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

Usa [segmentos (slices)](https://www.w3schools.com/python/ref_func_slice.asp) para obtener el mismo número de muestras que el número que usa el agente. El código entre aquí y el siguiente segmento es el mismo código de obtener una predicción que tenemos en el agente.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

Obtén el precio predicho, el precio real y el precio en el momento de la predicción. Necesitamos el precio en el momento de la predicción para determinar si la recomendación fue comprar o vender.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

Calcula el error y añádelo al total.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

Para `changes`, queremos el impacto monetario de comprar o vender un ETH. Así que primero, necesitamos determinar la recomendación, luego evaluar cómo cambió el precio real, y si la recomendación ganó dinero (cambio positivo) o costó dinero (cambio negativo).

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

Informa de los resultados.

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

Usa [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) para contar el número de días rentables y el número de días con pérdidas. El resultado es un objeto de filtro, que necesitamos convertir en una lista para obtener la longitud.

### Enviar transacciones {#submit-txn}

Ahora necesitamos enviar transacciones realmente. Sin embargo, no quiero gastar dinero real en este punto, antes de que el sistema esté probado. En su lugar, crearemos una bifurcación local de la Red principal y "operaremos" en esa red.

Aquí están los pasos para crear una bifurcación local y habilitar el trading.

1. Instala [Foundry](https://getfoundry.sh/introduction/installation)

2. Inicia [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` está escuchando en la URL predeterminada para Foundry, http://localhost:8545, por lo que no necesitamos especificar la URL para [el comando `cast`](https://getfoundry.sh/cast/overview) que usamos para manipular la cadena de bloques.

3. Al ejecutar en `anvil`, hay diez cuentas de prueba que tienen ETH: establece las variables de entorno para la primera

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. Estos son los contratos que necesitamos usar. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) es el contrato de Uniswap v3 que usamos para operar realmente. Podríamos operar directamente a través del pool, pero esto es mucho más fácil.

   Las dos variables inferiores son las rutas de Uniswap v3 necesarias para intercambiar entre WETH y USDC.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. Cada una de las cuentas de prueba tiene 10.000 ETH. Usa el contrato WETH para envolver 1000 ETH y obtener 1000 WETH para operar.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. Usa `SwapRouter` para intercambiar 500 WETH por USDC.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   La llamada `approve` crea una asignación que permite a `SwapRouter` gastar algunos de nuestros tokens. Los contratos no pueden monitorizar eventos, por lo que si transferimos tokens directamente al contrato `SwapRouter`, no sabría que se le pagó. En su lugar, permitimos que el contrato `SwapRouter` gaste una cierta cantidad, y luego `SwapRouter` lo hace. Esto se hace a través de una función llamada por `SwapRouter`, por lo que sabe si tuvo éxito.

7. Verifica que tienes suficientes de ambos tokens.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

Ahora que tenemos WETH y USDC, podemos ejecutar realmente el agente.

```sh
git checkout 05-trade
uv run agent.py
```

La salida se verá similar a:

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
Precio actual: 1843.16
En 2026-02-06T23:07, precio esperado: 1724.41 USD
Saldos de la cuenta antes de la operación:
Saldo de USDC: 927301.578272
Saldo de WETH: 500
Vender, espero que el precio baje 118.75 USD
Transacción de aprobación enviada: 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
Transacción de aprobación minada.
Transacción de venta enviada: fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
Transacción de venta minada.
Saldos de la cuenta después de la operación:
Saldo de USDC: 929143.797116
Saldo de WETH: 499
```

Para usarlo realmente, necesitas algunos cambios menores.

- En la línea 14, cambia `MAINNET_URL` a un punto de acceso real, como `https://eth.drpc.org`
- En la línea 28, cambia `PRIVATE_KEY` a tu propia clave privada
- A menos que seas muy rico y puedas comprar o vender 1 ETH cada día para un agente no probado, es posible que quieras cambiar la línea 29 para disminuir `WETH_TRADE_AMOUNT`

#### Explicación del código {#trading-code}

Aquí está el nuevo código.

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

Las mismas variables que usamos en el paso 4.

```python
WETH_TRADE_AMOUNT=1
```

La cantidad a operar.

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

Para operar realmente, necesitamos la función `approve`. También queremos mostrar los saldos antes y después, así que también necesitamos `balanceOf`.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

En la ABI de `SwapRouter` solo necesitamos `exactInput`. Hay una función relacionada, `exactOutput`, que podríamos usar para comprar exactamente un WETH, pero por simplicidad solo usamos `exactInput` en ambos casos.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

Las definiciones de Web3 para el [`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) y el contrato `SwapRouter`.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

Los parámetros de la transacción. Necesitamos una función aquí porque [el nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) debe cambiar cada vez.

```python
def approve_token(contract: Contract, amount: int):
```

Aprueba una asignación de tokens para `SwapRouter`.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

Así es como enviamos una transacción en Web3. Primero usamos [el objeto `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) para construir la transacción. Luego usamos [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) para firmar la transacción, usando `PRIVATE_KEY`. Finalmente, usamos [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) para enviar la transacción.

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) espera hasta que la transacción sea minada. Devuelve el recibo si es necesario.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

Estos son los parámetros al vender WETH.

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

A diferencia de `SELL_PARAMS`, los parámetros de compra pueden cambiar. La cantidad de entrada es el coste de 1 WETH, tal como está disponible en `quote`.

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

Las funciones `buy()` y `sell()` son casi idénticas. Primero aprobamos una asignación suficiente para `SwapRouter`, y luego lo llamamos con la ruta y la cantidad correctas.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

Informa de los saldos del usuario en ambas monedas.

```python
print("Account balances before trade:")
balances()

if (expected_price > current_price):
    print(f"Buy, I expect the price to go up by {expected_price - current_price} USD")
    buy(wethusdc_quotes[-1])
else:
    print(f"Sell, I expect the price to go down by {current_price - expected_price} USD")
    sell()

print("Account balances after trade:")
balances()
```

Este agente actualmente solo funciona una vez. Sin embargo, puedes cambiarlo para que funcione continuamente, ya sea ejecutándolo desde [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) o envolviendo las líneas 368-400 en un bucle y usando [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) para esperar hasta que sea el momento del siguiente ciclo.

## Posibles mejoras {#improvements}

Esta no es una versión de producción completa; es simplemente un ejemplo para enseñar los conceptos básicos. Aquí hay algunas ideas para mejoras.

### Trading más inteligente {#smart-trading}

Hay dos hechos importantes que el agente ignora al decidir qué hacer.

- _La magnitud del cambio anticipado_. El agente vende una cantidad fija de `WETH` si se espera que el precio baje, independientemente de la magnitud de la caída.
  Podría decirse que sería mejor ignorar los cambios menores y vender en función de cuánto esperamos que baje el precio.
- _El portafolio actual_. Si el 10 % de tu portafolio está en WETH y crees que el precio subirá, probablemente tenga sentido comprar más. Pero si el 90 % de tu portafolio está en WETH, es posible que estés suficientemente expuesto y no haya necesidad de comprar más. Lo contrario es cierto si esperas que el precio baje.

### ¿Qué pasa si quieres mantener tu estrategia de trading en secreto? {#secret}

Los proveedores de IA pueden ver las consultas que envías a sus LLM, lo que podría exponer el genial sistema de trading que desarrollaste con tu agente. Un sistema de trading que demasiada gente usa no vale nada porque demasiada gente intenta comprar cuando tú quieres comprar (y el precio sube) e intenta vender cuando tú quieres vender (y el precio baja).

Puedes ejecutar un LLM localmente, por ejemplo, usando [LM-Studio](https://lmstudio.ai/), para evitar este problema.

### De bot de IA a agente de IA {#bot-to-agent}

Puedes argumentar con razón que este es [un bot de IA, no un agente de IA](/ai-agents/#ai-agents-vs-ai-bots). Implementa una estrategia relativamente simple que se basa en información predefinida. Podemos habilitar la automejora, por ejemplo, proporcionando una lista de pools de Uniswap v3 y sus últimos valores y preguntando qué combinación tiene el mejor valor predictivo.

### Protección contra el deslizamiento {#slippage-protection}

Actualmente no hay [protección contra el deslizamiento](https://uniswapv3book.com/milestone_3/slippage-protection.html). Si la cotización actual es de 2000 $ y el precio esperado es de 2100 $, el agente comprará. Sin embargo, si antes de que el agente compre el coste sube a 2200 $, ya no tiene sentido comprar.

Para implementar la protección contra el deslizamiento, especifica un valor `amountOutMinimum` en las líneas 325 y 334 de [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325).

## Conclusión {#conclusion}

Con suerte, ahora sabes lo suficiente para empezar con los agentes de IA. Esta no es una descripción general exhaustiva del tema; hay libros enteros dedicados a eso, pero esto es suficiente para empezar. ¡Buena suerte!

[Mira aquí para ver más de mi trabajo](https://cryptodocguy.pro/).