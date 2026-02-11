---
title: Crea tu propio agente de negociación con IA en Ethereum
description: En este tutorial, aprenderás a crear un agente de negociación con IA simple. Este agente lee información de la cadena de bloques, solicita a un LLM una recomendación basada en esa información, realiza la operación que el LLM recomienda, luego espera y repite el proceso.
author: Ori Pomerantz
tags: [ "IA", "negociación", "agente", "python" ]
skill: intermediate
published: 13-02-2026
lang: es
sidebarDepth: 3
---

En este tutorial, aprenderás a crear un agente de negociación con IA simple. Este agente funciona siguiendo estos pasos:

1. Lee los precios actuales y pasados de un token, así como otra información potencialmente relevante
2. Crea una consulta con esta información, junto con información de fondo para explicar cómo podría ser relevante
3. Envía la consulta y recibe un precio proyectado
4. Opera en función de la recomendación
5. Espera y repite

Este agente demuestra cómo leer información, traducirla en una consulta que produzca una respuesta útil y utilizar esa respuesta. Todos estos son pasos necesarios para un agente de IA. Este agente está implementado en Python porque es el lenguaje más común utilizado en IA.

## ¿Por qué hacer esto? {#why-do-this}

Los agentes de negociación automatizados permiten a los desarrolladores seleccionar y ejecutar una estrategia de negociación. [Agentes de IA](/ai-agents) permiten estrategias de negociación más complejas y dinámicas, utilizando potencialmente información y algoritmos que el desarrollador ni siquiera ha considerado usar.

## Las herramientas {#tools}

Este tutorial utiliza [Python](https://www.python.org/), la [biblioteca Web3](https://web3py.readthedocs.io/en/stable/) y [Uniswap v3](https://github.com/Uniswap/v3-periphery) para cotizaciones y negociación.

### ¿Por qué Python? {#python}

El lenguaje más utilizado para la IA es [Python](https://www.python.org/), por lo que lo usamos aquí. No te preocupes si no sabes Python. El lenguaje es muy claro y explicaré exactamente lo que hace.

La [biblioteca Web3](https://web3py.readthedocs.io/en/stable/) es la API de Python para Ethereum más común. Es bastante fácil de usar.

### Operar en la cadena de bloques {#trading-on-blockchain}

Existen [muchos intercambios descentralizados (DEX)](/apps/categories/defi/) que te permiten operar con tokens en Ethereum. Sin embargo, tienden a tener tasas de cambio similares debido al [arbitraje](/developers/docs/smart-contracts/composability/#better-user-experience).

[Uniswap](https://app.uniswap.org/) es un DEX muy utilizado que podemos usar tanto para cotizaciones (para ver los valores relativos de los tokens) como para operaciones.

### OpenAI {#openai}

Para un modelo de lenguaje grande, elegí empezar con [OpenAI](https://openai.com/). Para ejecutar la aplicación de este tutorial, necesitarás pagar por el acceso a la API. El pago mínimo de 5 $ es más que suficiente.

## Desarrollo, paso a paso {#step-by-step}

Para simplificar el desarrollo, procederemos por etapas. Cada paso es una rama en GitHub.

### Primeros pasos {#getting-started}

Estos son los pasos para empezar en UNIX o Linux (incluido [WSL](https://learn.microsoft.com/en-us/windows/wsl/install))

1. Si aún no lo tienes, descarga e instala [Python](https://www.python.org/downloads/).

2. Clone el repositorio de GitHub.

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

6. Para verificar que Python y Web3 funcionan correctamente, ejecuta `python3` y proporciónale este programa. Puedes introducirlo en el indicador `>>>`; no es necesario crear un archivo.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### Lectura desde la cadena de bloques {#read-blockchain}

El siguiente paso es leer desde la cadena de bloques. Para ello, debes cambiar a la rama `02-read-quote` y luego usar `uv` para ejecutar el programa.

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

Importe las librerías que necesitamos. Se explican a continuación cuando se utilizan.

```python
print = functools.partial(print, flush=True)
```

Reemplaza el `print` de Python con una versión que siempre vacía la salida inmediatamente. Esto es útil en un script de larga duración porque no queremos esperar a las actualizaciones de estado ni a la salida de depuración.

```python
MAINNET_URL = "https://eth.drpc.org"
```

Una URL para acceder a la red principal. Puedes obtener una de [Nodo como servicio](/developers/docs/nodes-and-clients/nodes-as-a-service/) o usar una de las anunciadas en [Chainlist](https://chainlist.org/chain/1).

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

Un bloque de la red principal de Ethereum normalmente se produce cada doce segundos, así que este es el número de bloques que esperaríamos que se produjeran en un período de tiempo. Ten en cuenta que esta no es una cifra exacta. Cuando el [proponente de bloque](/developers/docs/consensus-mechanisms/pos/block-proposal/) está inactivo, ese bloque se salta y el tiempo para el siguiente bloque es de 24 segundos. Si quisiéramos obtener el bloque exacto para una marca de tiempo, usaríamos la [búsqueda binaria](https://en.wikipedia.org/wiki/Binary_search). Sin embargo, esto es lo suficientemente aproximado para nuestros propósitos. Predecir el futuro no es una ciencia exacta.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

El tamaño del ciclo. Revisamos las cotizaciones una vez por ciclo e intentamos estimar el valor al final del siguiente ciclo.

```python
# La dirección del fondo de liquidez que estamos leyendo
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

Los valores de cotización se toman del fondo de liquidez Uniswap 3 USDC/WETH en la dirección [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract). Esta dirección ya está en formato de suma de verificación, pero es mejor usar [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) para que el código sea reutilizable.

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

Estas son las [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) para los dos contratos que necesitamos contactar. Para mantener el código conciso, incluimos solo las funciones que necesitamos llamar.

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

Esta es una forma de crear una clase de datos en Python. El tipo de datos [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) se usa para conectarse al contrato. Observa el `(frozen=True)`. En Python, los [booleanos](https://en.wikipedia.org/wiki/Boolean_data_type) se definen como `True` o `False`, con mayúscula inicial. Esta clase de datos es `frozen` (congelada), lo que significa que los campos no se pueden modificar.

Observa la sangría. A diferencia de los [lenguajes derivados de C](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages), Python utiliza la sangría para denotar bloques. El intérprete de Python sabe que la siguiente definición no forma parte de esta clase de datos porque no comienza con la misma sangría que los campos de la clase de datos.

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

En una función que forma parte de una clase de datos, el primer parámetro es siempre `self`, la instancia de la clase de datos que la llamó. Aquí hay otro parámetro, el número de bloque.

```python
        assert block <= w3.eth.block_number, "El bloque está en el futuro"
```

Si pudiéramos leer el futuro, no necesitaríamos IA para operar.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

La sintaxis para llamar a una función en la EVM desde Web3 es esta: `<objeto de contrato>.functions.<nombre de función>"().call(<parámetros>)`. Los parámetros pueden ser los parámetros de la función de la EVM (si los hay; aquí no hay) o [parámetros con nombre](https://en.wikipedia.org/wiki/Named_parameter) para modificar el comportamiento de la cadena de bloques. Aquí usamos uno, `block_identifier`, para especificar [el número de bloque](/developers/docs/apis/json-rpc/#default-block) en el que deseamos ejecutar.

El resultado es [esta estructura, en forma de matriz](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). El primer valor es una función de la tasa de cambio entre los dos tokens.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

Para reducir los cálculos en la cadena, Uniswap v3 no almacena el factor de cambio real, sino su raíz cuadrada. Debido a que la EVM no admite matemáticas de punto flotante ni fracciones, en lugar del valor real, la respuesta es <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (token1 por token0)
        return 1/(raw_price * self.decimal_factor)
```

El precio bruto que obtenemos es el número de `token0` que obtenemos por cada `token1`. En nuestro fondo de liquidez, `token0` es USDC (una moneda estable con el mismo valor que un dólar estadounidense) y `token1` es [WETH](https://opensea.io/learn/blockchain/what-is-weth). El valor que realmente queremos es el número de dólares por WETH, no el inverso.

El factor decimal es la relación entre los [factores decimales](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) de los dos tokens.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

Esta clase de datos representa una cotización: el precio de un activo específico en un momento dado. En este punto, el campo `asset` es irrelevante porque usamos un único fondo de liquidez y, por lo tanto, tenemos un único activo. Sin embargo, añadiremos más activos más adelante.

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

Esta función toma una dirección y devuelve información sobre el contrato del token en esa dirección. Para crear un nuevo [`Contrato` de Web3](https://web3py.readthedocs.io/en/stable/web3.contract.html), proporcionamos la dirección y la ABI a `w3.eth.contract`.

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

Esta función devuelve todo lo que necesitamos sobre [un fondo de liquidez específico](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol). La sintaxis `f"<string>"` es una [cadena formateada](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

Obtiene un objeto `Quote`. El valor predeterminado para `block_number` es `None` (sin valor).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

Si no se especificó un número de bloque, usa `w3.eth.block_number`, que es el último número de bloque. Esta es la sintaxis para [una instrucción `if`](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement).

Podría parecer que hubiera sido mejor simplemente establecer el valor predeterminado en `w3.eth.block_number`, pero eso no funciona bien porque sería el número de bloque en el momento en que se define la función. En un agente de larga duración, esto sería un problema.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

Usa [la biblioteca `datetime`](https://docs.python.org/3/library/datetime.html) para darle un formato legible para humanos y modelos de lenguaje grandes (LLM). Usa [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) para redondear el valor a dos decimales.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

En Python, se define una [lista](https://docs.python.org/3/library/stdtypes.html#typesseq-list) que solo puede contener un tipo específico usando `list[<tipo>]`.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

En Python, un [bucle `for`](https://docs.python.org/3/tutorial/controlflow.html#for-statements) normalmente itera sobre una lista. La lista de números de bloque en los que buscar cotizaciones proviene de [`range`](https://docs.python.org/3/library/stdtypes.html#range).

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

Para cada número de bloque, obtén un objeto `Quote` y añádelo a la lista `quotes`. Luego, devuelve esa lista.

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

Este es el código principal del script. Lee la información del fondo de liquidez, obtén doce cotizaciones y usa [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint) para imprimirlas.

### Crear una indicación {#prompt}

A continuación, necesitamos convertir esta lista de cotizaciones en una indicación para un LLM y obtener un valor futuro esperado.

```sh
git checkout 03-create-prompt
uv run agent.py
```

La salida ahora será una indicación para un LLM, similar a:

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


¿Qué valor esperarías que tuviera WETH/USDC en la fecha 2026-02-02T17:56?

Proporciona tu respuesta como un único número redondeado a dos decimales,
sin ningún otro texto.
```

Observa que aquí hay cotizaciones para dos activos, `WETH/USDC` y `WBTC/WETH`. Añadir cotizaciones de otro activo podría mejorar la precisión de la predicción.

#### Cómo es una indicación {#prompt-explanation}

Esta indicación contiene tres secciones, que son bastante comunes en las indicaciones para LLM.

1. Información. Los LLM tienen mucha información de su entrenamiento, pero generalmente no tienen la más reciente. Esta es la razón por la que necesitamos recuperar las últimas cotizaciones aquí. Añadir información a una indicación se llama [generación aumentada por recuperación (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation).

2. La pregunta real. Esto es lo que queremos saber.

3. Instrucciones de formato de salida. Normalmente, un LLM nos dará una estimación con una explicación de cómo llegó a ella. Esto es mejor para los humanos, pero un programa informático solo necesita el resultado final.

#### Explicación del código {#prompt-code}

Este es el nuevo código.

```python
from datetime import datetime, timezone, timedelta
```

Necesitamos proporcionar al LLM la hora para la que queremos una estimación. Para obtener una hora "n minutos/horas/días" en el futuro, usamos [la clase `timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta).

```python
# Las direcciones de los fondos de liquidez que estamos leyendo
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

Tenemos dos fondos de liquidez que necesitamos leer.

```python
@dataclass(frozen=True)
class PoolInfo:
    .
    .
    .
    reverse: bool = False

    def get_price(self, block: int) -> Decimal:
        assert block <= w3.eth.block_number, "El bloque está en el futuro"
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (token1 por token0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

En el fondo de liquidez WETH/USDC, queremos saber cuántos de `token0` (USDC) necesitamos para comprar uno de `token1` (WETH). En el fondo de liquidez WETH/WBTC, queremos saber cuántos `token1` (WETH) necesitamos para comprar un `token0` (WBTC, que es Bitcoin envuelto). Necesitamos hacer un seguimiento de si la proporción del fondo de liquidez debe invertirse.

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

Para saber si un fondo de liquidez debe invertirse, debemos obtener eso como entrada para `read_pool`. Además, el símbolo del activo debe configurarse correctamente.

La sintaxis `<a> if <b> else <c>` es el equivalente en Python del [operador condicional ternario](https://en.wikipedia.org/wiki/Ternary_conditional_operator), que en un lenguaje derivado de C sería `<b> ?` <a> : <c>\`.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

Esta función crea una cadena que formatea una lista de objetos `Quote`, asumiendo que todos se aplican al mismo activo.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

En Python, los [literales de cadena multilínea](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) se escriben como `"""` .... `"""`.

```python
Dadas estas cotizaciones:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

Aquí, usamos el patrón [MapReduce](https://en.wikipedia.org/wiki/MapReduce) para generar una cadena para cada lista de cotizaciones con `format_quotes`, y luego las reducimos a una sola cadena para usarla en la indicación.

```python
¿Qué valor esperarías que tuviera {asset} en la fecha {expected_time}?

Proporciona tu respuesta como un único número redondeado a dos decimales,
sin ningún otro texto.
    """
```

El resto de la indicación es como se esperaba.

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

Revisa los dos fondos de liquidez y obtén cotizaciones de ambos.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

Determina el punto de tiempo futuro para el que queremos la estimación y crea la indicación.

### Interfaz con un LLM {#interface-llm}

A continuación, le daremos una indicación a un LLM real y recibiremos un valor futuro esperado. Escribí este programa usando OpenAI, así que si quieres usar un proveedor diferente, tendrás que ajustarlo.

1. Obtén una [cuenta de OpenAI](https://auth.openai.com/create-account)

2. [Financia la cuenta](https://platform.openai.com/settings/organization/billing/overview): la cantidad mínima en el momento de escribir este artículo es de 5 $

3. [Crea una clave de API](https://platform.openai.com/settings/organization/api-keys)

4. En la línea de comandos, exporta la clave de API para que tu programa pueda usarla

   ```sh
   export OPENAI_API_KEY=sk-<el resto de la clave va aquí>
   ```

5. Haz un «checkout» y ejecuta el agente

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

Este es el nuevo código.

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

print ("Precio actual:", wethusdc_quotes[-1].price)
print(f"En {future_time}, precio esperado: {expected_price} USD")

if (expected_price > current_price):
    print(f"Comprar, espero que el precio suba en {expected_price - current_price} USD")
else:
    print(f"Vender, espero que el precio baje en {current_price - expected_price} USD")
```

Muestra el precio y proporciona una recomendación de compra o venta.

#### Prueba de las predicciones {#testing-the-predictions}

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
Error de predicción medio en 29 predicciones: 83.87103448275862068965517241 USD
Cambio medio por recomendación: 4.787931034482758620689655172 USD
Varianza estándar de los cambios: 104.42 USD
Días rentables: 51.72%
Días con pérdidas: 48.28%
```

La mayor parte del probador es idéntica al agente, pero aquí están las partes que son nuevas o modificadas.

```python
CYCLES_FOR_TEST = 40 # Para la prueba retrospectiva, cuántos ciclos probamos

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

Miramos hacia atrás `CYCLES_FOR_TEST` (especificado como 40 aquí) días.

```python
# Crear predicciones y verificarlas con el historial real

total_error = Decimal(0)
changes = []
```

Hay dos tipos de errores que nos interesan. El primero, `total_error`, es simplemente la suma de los errores que cometió el predictor.

Para entender el segundo, `changes`, debemos recordar el propósito del agente. No es para predecir la relación WETH/USDC (precio de ETH). Es para emitir recomendaciones de compra y venta. Si el precio es actualmente de 2000 $ y predice 2010 $ para mañana, no nos importa si el resultado real es 2020 $ y ganamos dinero extra. Pero _sí_ nos importa si predijo 2010 $, y compramos ETH basándonos en esa recomendación, y el precio baja a 1990 $.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

Solo podemos ver los casos en los que el historial completo (los valores utilizados para la predicción y el valor del mundo real para compararlo) está disponible. Esto significa que el caso más reciente debe ser el que comenzó hace `CYCLES_BACK`.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

Usa [divisiones](https://www.w3schools.com/python/ref_func_slice.asp) para obtener el mismo número de muestras que el número que usa el agente. El código entre aquí y el siguiente segmento es el mismo código para obtener una predicción que tenemos en el agente.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

Obtén el precio previsto, el precio real y el precio en el momento de la predicción. Necesitamos el precio en el momento de la predicción para determinar si la recomendación era comprar o vender.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Predicción para {prediction_time}: predicho {predicted_price} USD, real {real_price} USD, error {error} USD")
```

Calcula el error y súmalo al total.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

Para `changes`, queremos el impacto monetario de comprar o vender un ETH. Así que primero, necesitamos determinar la recomendación, luego evaluar cómo cambió el precio real y si la recomendación generó ganancias (cambio positivo) o pérdidas (cambio negativo).

```python
print (f"Error de predicción medio en {len(wethusdc_quotes)-CYCLES_BACK} predicciones: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Cambio medio por recomendación: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Varianza estándar de los cambios: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

Informa de los resultados.

```python
print (f"Días rentables: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Días con pérdidas: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

Usa [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) para contar el número de días rentables y el número de días con pérdidas. El resultado es un objeto de filtro, que debemos convertir en una lista para obtener la longitud.

### Envío de transacciones {#submit-txn}

Ahora necesitamos enviar transacciones reales. Sin embargo, no quiero gastar dinero real en este punto, antes de que el sistema esté probado. En su lugar, crearemos una bifurcación local de la red principal y «operaremos» en esa red.

Aquí están los pasos para crear una bifurcación local y habilitar la negociación.

1. Instala [Foundry](https://getfoundry.sh/introduction/installation)

2. Inicia [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` está escuchando en la URL predeterminada de Foundry, http://localhost:8545, por lo que no necesitamos especificar la URL para [el comando `cast`](https://getfoundry.sh/cast/overview) que usamos para manipular la cadena de bloques.

3. Cuando se ejecuta en `anvil`, hay diez cuentas de prueba que tienen ETH: establece las variables de entorno para la primera

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. Estos son los contratos que necesitamos usar. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) es el contrato de Uniswap v3 que usamos para operar realmente. Podríamos operar directamente a través del fondo de liquidez, pero esto es mucho más fácil.

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

   La llamada `approve` crea una asignación que permite a `SwapRouter` gastar algunos de nuestros tokens. Los contratos no pueden supervisar eventos, por lo que si transferimos tokens directamente al contrato `SwapRouter`, no sabría que se le ha pagado. En cambio, permitimos que el contrato `SwapRouter` gaste una cierta cantidad, y luego `SwapRouter` lo hace. Esto se hace a través de una función llamada por `SwapRouter`, para que sepa si tuvo éxito.

7. Verifica que tienes suficientes de ambos tokens.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

Ahora que tenemos WETH y USDC, podemos ejecutar el agente.

```sh
git checkout 05-trade
uv run agent.py
```

La salida será similar a:

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
Precio actual: 1843.16
En 2026-02-06T23:07, precio esperado: 1724.41 USD
Saldos de la cuenta antes de la operación:
Saldo de USDC: 927301.578272
Saldo de WETH: 500
Vender, espero que el precio baje en 118.75 USD
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

Este es el nuevo código.

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

En la ABI `SwapRouter`, solo necesitamos `exactInput`. Hay una función relacionada, `exactOutput`, que podríamos usar para comprar exactamente un WETH, pero por simplicidad solo usamos `exactInput` en ambos casos.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

Las definiciones de Web3 para la [`cuenta`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) y el contrato `SwapRouter`.

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

Aprobar una asignación de token para `SwapRouter`.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

Así es como enviamos una transacción en Web3. Primero usamos [el objeto `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) para construir la transacción. Luego usamos [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) para firmar la transacción, usando `PRIVATE_KEY`. Finalmente, usamos [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) para enviar la transacción.

```python
    print(f"Transacción de aprobación enviada: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Transacción de aprobación minada.")
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

A diferencia de `SELL_PARAMS`, los parámetros de compra pueden cambiar. La cantidad de entrada es el costo de 1 WETH, como está disponible en `quote`.

```python
def buy(quote: Quote):
    buy_params = make_buy_params(quote)
    approve_token(wethusdc_pool.token0.contract, buy_params["amountIn"])
    txn = swap_router.functions.exactInput(buy_params).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Transacción de compra enviada: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Transacción de compra minada.")


def sell():
    approve_token(wethusdc_pool.token1.contract,
                  WETH_TRADE_AMOUNT * 10**wethusdc_pool.token1.decimals)
    txn = swap_router.functions.exactInput(SELL_PARAMS).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Transacción de venta enviada: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Transacción de venta minada.")
```

Las funciones `buy()` y `sell()` son casi idénticas. Primero aprobamos una asignación suficiente para `SwapRouter` y luego lo llamamos con la ruta y la cantidad correctas.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Saldo: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Saldo: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

Informa de los saldos de los usuarios en ambas monedas.

```python
print("Saldos de la cuenta antes de la operación:")
balances()

if (expected_price > current_price):
    print(f"Comprar, espero que el precio suba en {expected_price - current_price} USD")
    buy(wethusdc_quotes[-1])
else:
    print(f"Vender, espero que el precio baje en {current_price - expected_price} USD")
    sell()

print("Saldos de la cuenta después de la operación:")
balances()
```

Este agente actualmente solo funciona una vez. Sin embargo, puedes cambiarlo para que funcione continuamente, ya sea ejecutándolo desde [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) o envolviendo las líneas 368-400 en un bucle y usando [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) para esperar hasta que sea el momento del siguiente ciclo.

## Posibles mejoras {#improvements}

Esta no es una versión de producción completa; es simplemente un ejemplo para enseñar los conceptos básicos. Aquí hay algunas ideas para mejoras.

### Negociación más inteligente {#smart-trading}

Hay dos hechos importantes que el agente ignora al decidir qué hacer.

- _La magnitud del cambio anticipado_. El agente vende una cantidad fija de `WETH` si se espera que el precio baje, independientemente de la magnitud de la caída.
  Podría decirse que sería mejor ignorar los cambios menores y vender en función de cuánto esperamos que baje el precio.
- _La cartera actual_. Si el 10 % de tu cartera está en WETH y crees que el precio subirá, probablemente tenga sentido comprar más. Pero si el 90 % de tu cartera está en WETH, es posible que ya estés suficientemente expuesto y no haya necesidad de comprar más. Lo contrario es cierto si esperas que el precio baje.

### ¿Y si quieres mantener tu estrategia de negociación en secreto? {#secret}

Los proveedores de IA pueden ver las consultas que envías a sus LLM, lo que podría exponer el genial sistema de negociación que desarrollaste con tu agente. Un sistema de negociación que demasiada gente usa no tiene valor porque demasiada gente intenta comprar cuando tú quieres comprar (y el precio sube) e intenta vender cuando tú quieres vender (y el precio baja).

Puedes ejecutar un LLM localmente, por ejemplo, usando [LM-Studio](https://lmstudio.ai/), para evitar este problema.

### De bot de IA a agente de IA {#bot-to-agent}

Se puede argumentar que este es [un bot de IA, no un agente de IA](/ai-agents/#ai-agents-vs-ai-bots). Implementa una estrategia relativamente simple que se basa en información predefinida. Podemos habilitar la automejora, por ejemplo, proporcionando una lista de fondos de liquidez de Uniswap v3 y sus últimos valores y preguntando qué combinación tiene el mejor valor predictivo.

### Protección contra el deslizamiento {#slippage-protection}

Actualmente no hay [protección contra el deslizamiento](https://uniswapv3book.com/milestone_3/slippage-protection.html). Si la cotización actual es de 2000 $ y el precio esperado es de 2100 $, el agente comprará. Sin embargo, si antes de que el agente compre el costo sube a 2200 $, ya no tiene sentido comprar.

Para implementar la protección contra el deslizamiento, especifica un valor de `amountOutMinimum` en las líneas 325 y 334 de [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325).

## Conclusión {#conclusion}

Con suerte, ahora sabes lo suficiente para empezar con los agentes de IA. Esta no es una descripción exhaustiva del tema; hay libros enteros dedicados a eso, pero esto es suficiente para que empieces. ¡Buena suerte!

[Vea aquí más de mi trabajo](https://cryptodocguy.pro/).
