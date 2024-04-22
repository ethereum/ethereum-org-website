---
title: Dagger Hashimoto
description: Un examen detallado del algoritmo Dagger-Hashimoto.
lang: es
---

Dagger Hashimoto fue la implementación y especificación de investigación original para el algoritmo de minería de Ethereum. Dagger Hashimoto fue reemplazado por [Ethash](#ethash). La minería se apagó por completo en [La Fusión](/updates/merge) el 15 de septiembre de 2022. Desde entonces, Ethereum se ha asegurado a través de un mecanismo [de prueba de participación](/developers/docs/consensus-mechanisms/pos) en su lugar. Esta página es de interés histórico: la información que contiene ya no es relevante para Ethereum después de La Fusión.

## Pre-requisitos: {#prerequisites}

Para entender mejor está página, le recomendamos leer primero acerca del [consenso de prueba de trabajo](/developers/docs/consensus-mechanisms/pow), [la minería](/developers/docs/consensus-mechanisms/pow/mining), y [los algoritmos de minado](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms).

## Dagger Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto tiene como objetivo satisfacer dos objetivos:

1.  **Resistencia ASIC**: El beneficio de crear hardware especializado para el algoritmo debe ser lo más pequeño posible
2.  **Verificabilidad para clientes ligeros**: Un bloque debe ser verificable de forma eficiente por un cliente ligero.

Con una modificación adicional, también especificamos cómo cumplir un tercer objetivo si se desea, pero a costa de una complejidad adicional:

**Almacenamiento de la cadena completa**: La minería debería requerir el almacenamiento del estado completo de la cadena de bloques (debido a la estructura irregular de la triada de estados de Ethereum, anticipamos que será posible realizar alguna poda, en particular de algunos contratos utilizados con frecuencia, pero queremos minimizarla).

## Generación de grafos acíclicos dirigidos (o DAG) {#dag-generation}

El código del algoritmo se define en Python a continuación. Primero, damos `encode_int` para organizar ints sin firmar de precisión especificada a las cadenas. También se da su inverso:

```python
NUM_BITS = 512

def encode_int(x):
    "Encode an integer x as a string of 64 characters using a big-endian scheme"
    o = ''
    for _ in range(NUM_BITS / 8):
        o = chr(x % 256) + o
        x //= 256
    return o

def decode_int(s):
    "Unencode an integer x from a string using a big-endian scheme"
    x = 0
    for c in s:
        x *= 256
        x += ord(c)
    return x
```

A continuación, asumimos que `sha3` es una función que toma un entero y genera un entero, y `dbl_sha3` es una función de doble SHA3; si se convierte este código de referencia en una implementación, use:

```python
from pyethereum import utils
def sha3(x):
    if isinstance(x, (int, long)):
        x = encode_int(x)
    return decode_int(utils.sha3(x))

def dbl_sha3(x):
    if isinstance(x, (int, long)):
        x = encode_int(x)
    return decode_int(utils.sha3(utils.sha3(x)))
```

### Parámetros {#parameters}

Los parámetros utilizados para el algoritmo son:

```python
SAFE_PRIME_512 = 2**512 - 38117     # Largest Safe Prime less than 2**512

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # Size of the dataset (4 Gigabytes); MUST BE MULTIPLE OF 65536
      "n_inc": 65536,                   # Increment in value of n per period; MUST BE MULTIPLE OF 65536
                                        # with epochtime=20000 gives 882 MB growth per year
      "cache_size": 2500,               # Size of the light client's cache (can be chosen by light
                                        # client; not part of the algo spec)
      "diff": 2**14,                    # Difficulty (adjusted during block evaluation)
      "epochtime": 100000,              # Length of an epoch in blocks (how often the dataset is updated)
      "k": 1,                           # Number of parents of a node
      "w": w,                          # Used for modular exponentiation hashing
      "accesses": 200,                  # Number of dataset accesses during hashimoto
      "P": SAFE_PRIME_512               # Safe Prime for hashing and random number generation
}
```

`P` En este caso es un número primo elegido de tal manera que `log2(P)` es solo un poco menos de 512, lo que corresponde a los 512 bits que hemos estado usando para representar nuestros números. Tenga en cuenta que solo necesita almacenarse la segunda mitad del DAG, por lo que el requisito de RAM de facto comienza en 1 GB y crece 441 MB por año.

### Construcción del grafo de Dagger {#dagger-graph-building}

La primitiva de construcción del grafo de Dagger se define de la siguiente manera:

```python
def produce_dag(params, seed, length):
    P = params["P"]
    picker = init = pow(sha3(seed), params["w"], P)
    o = [init]
    for i in range(1, length):
        x = picker = (picker * init) % P
        for _ in range(params["k"]):
            x ^= o[x % i]
        o.append(pow(x, params["w"], P))
    return o
```

Esencialmente, comienza con un grafo como un único nodo, `SHA3 (semilla)`, y a partir de ahí comienza a agregar secuencialmente otros nodos basados en nodos anteriores aleatorios. Cuando se crea un nuevo nodo, se calcula una potencia modular de la semilla para seleccionar aleatoriamente algunos índices menores de `i` (using `x % i` above), y los valores de los nodos en esos índices se utilizan en un cálculo para generar un nuevo valor para `x`, que luego se introduce en una pequeña función de prueba de trabajo (basada en XOR) para generar finalmente el valor del grafo en el índice `i`. La explicación detrás de este diseño en particular es forzar el acceso secuencial del DAG; el siguiente valor del DAG al que se accederá no se puede determinar hasta que se conozca el valor actual. Por último, la exponenciación modular codifica aún más el resultado.

Este algoritmo se basa en varios resultados de la teoría de números. Consulte el Apéndice a continuación para ver la explicación.

## Evaluación del cliente ligero {#light-client-evaluation}

La construcción del grafo anterior tiene la intención de permitir que cada nodo del grafo se reconstruya calculando un subárbol de solo un pequeño número de nodos y que requiere solo una pequeña cantidad de memoria auxiliar. Tenga en cuenta que con k=1, el subárbol es solo una cadena de valores que sube hasta el primer elemento del DAG.

La función de computación de cliente ligero para el DAG funciona de la siguiente manera:

```python
def quick_calc(params, seed, p):
    w, P = params["w"], params["P"]
    cache = {}

    def quick_calc_cached(p):
        if p in cache:
            pass
        elif p == 0:
            cache[p] = pow(sha3(seed), w, P)
        else:
            x = pow(sha3(seed), (p + 1) * w, P)
            for _ in range(params["k"]):
                x ^= quick_calc_cached(x % p)
            cache[p] = pow(x, w, P)
        return cache[p]

    return quick_calc_cached(p)
```

Esencialmente, consiste sencillamente en reescribir el algoritmo anterior que elimina el bucle de cálculo de los valores de todo el DAG y reemplaza la búsqueda de nodo anterior con una llamada recursiva o una búsqueda de caché. Tenga en cuenta que para `k=1` la caché es innecesaria, aunque una optimización adicional en realidad precalcula los primeros miles de valores del DAG y los mantiene como una caché estática para los cálculos; consulte el apéndice para una implementación de código relacionado.

## Doble búfer de DAG {#double-buffer}

En un cliente completo, se utiliza un [_búfer doble_](https://wikipedia.org/wiki/Multiple_buffering) de 2 DAG producido por la fórmula anterior. La idea es que los DAG se produzcan cada `época` número de bloques de acuerdo con los parámetros anteriores. En lugar de que el cliente use el último DAG producido, usa el anterior. El beneficio de esto es que permite que los DAG se reemplacen con el tiempo sin necesidad de incorporar un paso en el que los mineros de repente tengan que volver a calcular todos los datos. De lo contrario, existe el potencial de una desaceleración temporal abrupta en el procesamiento de la cadena a intervalos regulares y un aumento notable de la centralización. Por lo tanto, el ataque de 51 % se arriesga dentro de esos pocos minutos, antes de que se vuelvan a calcular todos los datos.

El algoritmo utilizado para generar el conjunto de DAG usado para calcular el trabajo de un bloque es el siguiente:

```python
def get_prevhash(n):
    from pyethereum.blocks import GENESIS_PREVHASH
    from pyethereum import chain_manager
    if n <= 0:
        return hash_to_int(GENESIS_PREVHASH)
    else:
        prevhash = chain_manager.index.get_block_by_number(n - 1)
        return decode_int(prevhash)

def get_seedset(params, block):
    seedset = {}
    seedset["back_number"] = block.number - (block.number % params["epochtime"])
    seedset["back_hash"] = get_prevhash(seedset["back_number"])
    seedset["front_number"] = max(seedset["back_number"] - params["epochtime"], 0)
    seedset["front_hash"] = get_prevhash(seedset["front_number"])
    return seedset

def get_dagsize(params, block):
    return params["n"] + (block.number // params["epochtime"]) * params["n_inc"]

def get_daggerset(params, block):
    dagsz = get_dagsize(params, block)
    seedset = get_seedset(params, block)
    if seedset["front_hash"] <= 0:
        # No back buffer is possible, just make front buffer
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

La idea detrás del Hashimoto original es usar la cadena de bloques como un conjunto de datos, realizando un cálculo que seleccione N índices de la cadena de bloques, recopile las transacciones en esos índices, realice un XOR de estos datos y devuelva el hash del resultado. El algoritmo original de Thaddeus Dryja, traducido a Python para mayor coherencia, es el siguiente:

```python
def orig_hashimoto(prev_hash, merkle_root, list_of_transactions, nonce):
    hash_output_A = sha256(prev_hash + merkle_root + nonce)
    txid_mix = 0
    for i in range(64):
        shifted_A = hash_output_A >> i
        transaction = shifted_A % len(list_of_transactions)
        txid_mix ^= list_of_transactions[transaction] << i
    return txid_mix ^ (nonce << 192)
```

Desafortunadamente, aunque Hashimoto se considera de RAM difícil, se basa en la aritmética de 256 bits, que tiene una sobrecarga computacional considerable. Sin embargo, Dagger-Hashimoto solo utiliza los 64 bits menos significativos al indexar su conjunto de datos para abordar este problema.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

El uso de doble SHA3 permite una forma de cero datos, preverificación casi instantánea, asegurándose solo de que se proporcionó un valor intermedio correcto. Esta capa externa de prueba de trabajo es de fácil interfaz con ASIC y bastante débil, pero existe para hacer que DDoS sea aún más difícil, ya que se requiere esa pequeña cantidad de trabajo para producir un bloque que no se rechace de inmediato. He aquí la versión de cliente ligero:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## Minería y verificación {#mining-and-verifying}

Ahora, vamos a juntarlo todo en el algoritmo de minería:

```python
def mine(daggerset, params, block):
    from random import randint
    nonce = randint(0, 2**64)
    while 1:
        result = hashimoto(daggerset, get_dagsize(params, block),
                           params, decode_int(block.prevhash), nonce)
        if result * params["diff"] < 2**256:
            break
        nonce += 1
        if nonce >= 2**64:
            nonce = 0
    return nonce
```

He aquí el algoritmo de verificación:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Verificación ligera y fácil para el cliente:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Además, tenga en cuenta que Dagger-Hashimoto impone requisitos adicionales en el encabezado del bloque:

- Para que la verificación de dos capas funcione, un encabezado de bloque debe tener tanto el nonce como el valor medio previo a SHA3.
- En algún lugar, un encabezado de bloque debe almacenar el SHA3 del conjunto de semillas actual.

## Más información {#further-reading}

_¿Conoce algún recurso en la comunidad que le haya servido de ayuda? Edite esta página y añádalo._

## Apéndice {#appendix}

Como se señaló anteriormente, el RNG utilizado para la generación de DAG se basa en algunos resultados de la teoría de números. En primer lugar, nos aseguramos de que el RNG de Lehmer que es la base de la variable `picker` tenga un período amplio. En segundo lugar, mostramos que `pow(x,3,P)` no asignará `x` a `1` ni `P-1` siempre que `x ∈ [2,P-2]` para comenzar. Por último, mostramos que `pow(x,3,P)` tiene una baja tasa de colisión cuando se trata como una función de hashing.

### Generador de números aleatorios Lehmer {#lehmer-random-number}

Si bien la función `produce_dag` no necesita producir números aleatorios imparciales, una amenaza potencial es que `seed**i % P` solo toma un puñado de valores. Esto podría proporcionar una ventaja para que los mineros reconozcan el patrón sobre aquellos que no lo hacen.

Para evitarlo, se apela a un resultado de la teoría de los números. Un [_Safe Prime_](https://en.wikipedia.org/wiki/Safe_prime) se define como un primo `P` de tal manera que `(P-1)/2` también es primo. El _order_ de un miembro `x` del [multiplicative group](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` se define como el `m` mínimo, de tal manera que <pre>xᵐ mod P ≡ 1</pre>
Dadas estas definiciones, tenemos:

> Observación n.º 1 Deje que `x` sea miembro del grupo multiplicativo `ℤ/Pℤ` para un primo seguro `P`. Si `x mod P ≠ 1 mod P` y `x mod P ≠ P-1 mod P`, entonces el orden de `x` es bien `P-1` o `(P-1)/2`.

_Prueba_. Dado que `P` es un primo seguro, entonces por \[Teorema de Lagrange\]\[lagrange\] tenemos que el orden de `x` es bien `1`, `2`, `(P-1)/2`, o `P-1`.

El orden de `x` no puede ser `1`, ya que según el pequeño teorema de Fermat tenemos:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

Por lo tanto, `x` debe ser una identidad multiplicadora de `ℤ/nℤ`, que es única. Dado que asumimos que `x ≠ 1` por suposición, esto no es posible.

El orden de `x` no puede ser `2` a menos que `x = P-1`, ya que esto violaría que `P` sea primo.

A partir de la proposición anterior, podemos reconocer que la iteración de `(picker * init) % P` tendrá una longitud de ciclo de al menos `(P-1)/2`. Esto se debe a que seleccionamos `P` para ser un número primo seguro aproximadamente igual a una potencia más alta de dos, y `init` está en el intervalo `[2,2**256+1]`. Dada la magnitud de `P`, nunca deberíamos esperar un ciclo de exponenciación modular.

Cuando asignamos la primera celda del DAG (la variable etiquetada `init`), calculamos `pow(sha3(seed) + 2, 3, P)`. A primera vista, esto no garantiza que el resultado no sea ni `1` ni `P-1`. Sin embargo, dado que `P-1` es un primo seguro, tenemos la siguiente garantía adicional, que es una consecuencia de la Observación 1:

> Observación n.º 2 Deje que `x` sea miembro del grupo multiplidor `ℤ/Pℤ` para un número primo seguro `P`, y deje que `w` sea un número natural. Si `x mod P ≠ 1 mod P` y `x mod P ≠ P-1 mod P`, así como `w mod P ≠ P-1 mod P` y `w mod P ≠ 0 mod P`, entonces `xw mod`

### La exponenciación modular como función hash {#modular-exponentiation}

Para ciertos valores de `P` y `w`, la función `pow (x, w, P)` puede tener muchas colisiones. Por ejemplo, `pow (x,9,19)` solo toma valores `{1,18}`.

Dado que `P` es primo, entonces se puede elegir un `w apropiado` para una función de hashing de exponenciación modular usando el siguiente resultado:

> Observación n.º 3 Deje que `P` sea primo; `w` y `P-1` son relativamente primos si y solo si para ambos `a` y `b` en `ℤ/Pℤ`:
> 
> <center>
>   `aw mod P ≡ bw mod P` si y solo si `a mod P ≡ b mod P`
> </center>

Por lo tanto, dado que `P` es primo y `w` es relativamente primo a `P-1`, tenemos que `|{pow (x, w, P) : x ∈ ℤ}| = P`, lo que implica que la función de hashing tiene la tasa de colisión mínima posible.

En el caso especial de que `P` sea un primo seguro como hemos seleccionado, entonces `P-1` solo tiene los factores 1, 2, `(P-1)/2` y `P-1`. Dado que `P` > 7, sabemos que 3 es relativamente primo para `P-1`, por lo que `w=3` satisface la propuesta anterior.

## Algoritmo de evaluación basado en caché más eficiente {#cache-based-evaluation}

```python
def quick_calc(params, seed, p):
    cache = produce_dag(params, seed, params["cache_size"])
    return quick_calc_cached(cache, params, p)

def quick_calc_cached(cache, params, p):
    P = params["P"]
    if p < len(cache):
        return cache[p]
    else:
        x = pow(cache[0], p + 1, P)
        for _ in range(params["k"]):
            x ^= quick_calc_cached(cache, params, x % p)
        return pow(x, params["w"], P)

def quick_hashimoto(seed, dagsize, params, header, nonce):
    cache = produce_dag(params, seed, params["cache_size"])
    return quick_hashimoto_cached(cache, dagsize, params, header, nonce)

def quick_hashimoto_cached(cache, dagsize, params, header, nonce):
    m = dagsize // 2
    mask = 2**64 - 1
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc_cached(cache, params, m + (mix & mask) % m)
    return dbl_sha3(mix)
```
