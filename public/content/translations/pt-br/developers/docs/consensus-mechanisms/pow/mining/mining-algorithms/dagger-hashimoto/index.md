---
title: Dagger-Hashimoto
description: O algoritmo Dagger-Hashimoto em detalhes
lang: pt-br
---

Dagger-Hashimoto foi a implementação original de pesquisa e especificação para o algoritmo de mineração do Ethereum. Dagger-Hashimoto foi substituído por [Ethash](#ethash). A mineração foi completamente desligada na [Fusão](/roadmap/merge/) no dia 15 de setembro de 2022. Desde então, o Ethereum foi protegido usando um mecanismo [prova de participação](/developers/docs/consensus-mechanisms/pos). Esta página é para fins históricos. As informações aqui não são mais relevantes para o Ethereum posterior à Fusão.

## Pré-Requisitos {#prerequisites}

Para melhor entender esta página, recomendamos que você leia primeiro o[ consenso de prova de trabalho, ](/developers/docs/consensus-mechanisms/pow)[mineração](/developers/docs/consensus-mechanisms/pow/mining) e [algoritmos de mineração](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms).

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto pretende satisfazer dois objetivos:

1.  **Resistência a ASIC**: o benefício de criar hardware especializado para o algoritmo deve ser o menor possível.
2.  **Cliente leve verificável**: um bloco deve ser verificável eficientemente por um cliente leve.

Com uma modificação adicional, também especificamos como atingir um terceiro objetivo se desejado, mas à custa de uma complexidade adicional:

**Armazenamento completo da cadeia**: a mineração deveria exigir o armazenamento do estado completo da blockchain (devido à estrutura irregular da árvore de estado Ethereum, esperamos que haja um pouco de perda, especialmente de alguns contratos muitas vezes usados, mas queremos minimizar isso).

## Geração do DAG {#dag-generation}

O código do algoritmo será definido em Python abaixo. Primeiro, damos `encode_int` para combinar inteiros sem sinal de precisão especificada em strings. Sua inversa também é dada:

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

Em seguida assumimos que `sha3` é uma função que recebe um inteiro e retorna um inteiro, e `dbl_sha3` é uma função double-sha3, se converter este código de referência em uma implementação de uso:

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

### Parâmetros {#parameters}

Os parâmetros usados para o algoritmo são:

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

`P` neste caso é uma primeira escolha tal que `log(P)` é apenas ligeiramente menor que 512, que corresponde aos 512 bits que temos usado para representar nossos números. Observe que apenas a última metade do DAG precisa realmente ser armazenado, assim o requisito de RAM de-facto começa em 1 GB e cresce 441 MB por ano.

### Construção de gráfico Dagger {#dagger-graph-building}

A construção primitiva de gráfico dagger é definida da seguinte forma:

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

Essencialmente, ele começa um gráfico como um único nó, `sha3(seed)`, e de lá começa a adicionar sequencialmente outros nós com base em nós aleatórios anteriores. Quando um novo nó é criado, uma potência modular da semente é computada para aleatoriamente selecionar alguns índices menores que `i` (usando `x % i` acima), e os valores dos nós desses índices são usados em um cálculo para gerar um novo valor para `x`, que é então alimentada em uma pequena função de prova de trabalho (baseada em XOR) para finalmente gerar o valor do gráfico no índice `i`. A lógica por trás deste design específico é forçar o acesso sequencial do DAG; o próximo valor do DAG que será acessado não pode ser determinado até que o valor atual seja conhecido. Finalmente, a exponenciação modular faz o hash do resultado ainda mais.

Este algoritmo depende de vários resultados da teoria numérica. Veja o apêndice abaixo para uma discussão.

## Avaliação de cliente leve {#light-client-evaluation}

A construção do gráfico acima pretende permitir que cada nó no gráfico seja reconstruído computando uma subárvore com apenas um pequeno número de nós e exigindo uma pequena quantidade de memória auxiliar. Note que com k=1, a subárvore é apenas uma cadeia de valores que vai subindo até o primeiro elemento do DAG.

A função de computação do cliente leve para o DAG funciona da seguinte forma:

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

Essencialmente, é simplesmente uma reescrita do algoritmo acima que remove o loop de computação dos valores de todo o DAG e substitui a pesquisa anterior de nó por uma chamada recursiva ou uma pesquisa de cache. Observe que para `k=1` o cache é desnecessário, embora uma otimização maior na verdade pré-calcula os primeiros poucos milhares de valores do DAG e o mantém como um cache estático para computações; ver o apêndice para uma implementação de código disso.

## Buffer duplo de DAGs {#double-buffer}

Em um cliente completo, é usado um [_buffer duplo_](https://wikipedia.org/wiki/Multiple_buffering) de 2 DAGs produzidos pela fórmula acima. A ideia é que DAGs são produzidos a cada `epochtime` número de blocos de acordo com os parâmetros acima. Em vez do cliente usar o último DAG produzido, ele usa o anterior. A vantagem disto é permitir que os DAG sejam substituídos com o passar do tempo, sem necessidade de incorporar um passo em que os mineradores devem, de repente, recriar todos os dados. Caso contrário, existe o potencial para um abrandamento abrupto temporário do processamento da cadeia a intervalos regulares e um aumento dramático da centralização. Assim, existe o risco de ataques de 51% dentro desses poucos minutos antes de todos os dados serem recomputados.

O algoritmo usado para gerar o conjunto de DAGs usados para computar o trabalho de um bloco é o seguinte:

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

A ideia por trás do Hashimoto original é usar a blockchain como um conjunto de dados, executando um cálculo que seleciona N índices da blockchain, reúne as transações nesses índices, executa um XOR desses dados e retorna o hash do resultado. O algoritmo original de Thaddeus Dryja, convertido para Python para consistência, é o seguinte:

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

Infelizmente, enquanto Hashimoto é considerado de uso intenso de RAM, ele depende da aritmética de 256 bits, o que tem uma sobrecarga computacional considerável. No entanto, Dagger-Hashimoto usa apenas os 64 bits menos significativos ao indexar seu conjunto de dados para resolver esta questão.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

O uso duplo do SHA3 permite uma forma de zero dados, pré-verificação quase instantânea, verificando apenas se foi fornecido um valor intermediário correto. Esta camada exterior de prova de trabalho é altamente favorável a ASIC e razoavelmente fraca, mas existe para tornar a DDoS ainda mais difícil, uma vez que essa pequena quantidade de trabalho tem de ser feita para produzir um bloco que não seja imediatamente rejeitado. Aqui está a versão de cliente leve:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## Mineração e verificação {#mining-and-verifying}

Agora, vamos colocar tudo junto no algoritmo de mineração:

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

Aqui está o algoritmo de verificação:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Verificação amigável do cliente leve:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Além disso, note que Dagger-Hashimoto impõe requisitos adicionais no cabeçalho do bloco:

- Para que a verificação em duas camadas funcione, um cabeçalho de bloco deve ter ambos o nonce e o valor do meio pre-sha3
- Um cabeçalho de bloco deve armazenar o sha3 do seedset atual em algum lugar

## Leitura adicional {#further-reading}

_Conhece algum recurso da comunidade que o ajudou? Edite essa página e adicione!_

## Apêndice {#appendix}

Como mencionado acima, o RNG usado para geração de DAGs depende de alguns resultados da teoria de números. Primeiro, nós fornecemos garantias de que o Lehmer RNG, que é a base para a variável `picker`, tenha um longo período. Segundo, mostramos que `pow(x,3,P)` não vai correlacionar `x` para `1` ou `P-1` fornecer `x ∈ [2,P-2]` para começar. Finalmente, mostramos que `pow(x,3,P)` tem uma baixa taxa de colisão quando tratado como uma função de hashing.

### Gerador de números aleatórios Lehmer {#lehmer-random-number}

Enquanto a função `produce_dag` não precisa produzir números aleatórios sem viés, uma ameaça potencial é que `seed**i % P` só absorve um punhado de valores. Isto poderia proporcionar uma vantagem aos mineradores reconhecendo o padrão em relação aos que não o fazem.

Para evitar isso, apela-se a um resultado da teoria dos números. Um [_número primo seguro_](https://en.wikipedia.org/wiki/Safe_prime) é definido como sendo um `P` primo tal que `(P-1)/2` também é primo. A _ordem_ de um membro `x` do [grupo multiplicativo](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `Z/nZ` é definido como o mínimo de `m` tal que <pre>xᵐ mod P ≡ 1</pre>
Dadas essas definições, temos:

> Observação 1. Deixe `x` ser um membro do grupo multiplicador `Z/PZ` para um `P` primo seguro. Se `x mod P ≠ 1 mod P` e `x mod P ≠ P-1 mod P`, então a ordem de `x` é `P-1` ou `(P-1)/2`.

_Prova_. Já que `P` é um primo seguro, então pelo \[Teorema de Lagrange\]\[lagrange\] temos que a ordem de `x` é `1`, `2`, `(P-1)/2` ou `P-1`.

A ordem de `x` não pode ser `1`, já que pelo Pequeno Teorema de Fermat, nós temos:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

Daí `x` deve ser uma identidade multiplicadora de `Z/nZ`, que é única. Como partimos do princípio de que `x ≠ 1` por suposição, isso não é possível.

A ordem de `x` não pode ser `2` a menos que `x = P-1`, já que isso violaria o princípio de que `P` é primo.

A partir da proposta acima, podemos reconhecer que a iteração `(picker * init) % P` terá um ciclo de comprimento de pelo menos `(P-1)/2`. Isso acontece porque selecionamos `P` para ser um primo seguro aproximadamente igual a uma potência de dois mais alta, e `init` está no intervalo `[2,2**256+1]`. Dada a magnitude de `P`, nunca devemos esperar um ciclo da exponenciação modular.

Quando estamos atribuindo a primeira célula no DAG (a variável rotulada como `init`), nós computamos `pow (sha3(seed) + 2, 3, P)`. À primeira vista, isso não garante que o resultado não é `1` nem `P-1`. No entanto, como `P-1` é um primo seguro, temos a seguinte garantia adicional, que é uma afirmação deduzida da Observação 1:

> Observação 2. Deixe `x` ser um membro do grupo multiplicador `Z/PZ` para um `P` primo seguro, e deixe `w` ser um número natural. Se `x mod P ≠ 1 mod P` e `x mod P ≠ P-1 mod P`, assim como `w mod P ≠ P-1 mod P` e `w mod P ≠ 0 mod P`, então `xʷ mod P ≠ 1 mod P` e `xʷ mod P ≠ P-1 mod P`

### Exponenciação modular como uma função hash {#modular-exponentiation}

Para certos valores de `P` e `w`, a função `pow(x, w, P)` pode ter muitas colisões. Por exemplo, `pow(x,9,19)` recebe apenas valores `{1,18}`.

Dado que `P` é primo, então um `w` apropriado para uma função hash de exponenciação modular pode ser escolhida usando o seguinte resultado:

> Observação 3. Considere `P` um primo; `w` e `P-1` são relativamente primos, se e somente se para todos `a` e `b` em `Z/PZ`:
> 
> <center>
>   `aʷ mod P ≡ bʷ mod P` se e somente se `a mod P ≡ b mod P`
> </center>

Assim, dado que `P` é primo e `w` é relativamente primo de `P-1`, temos que `|{pow(x, w, P) : x ∈ ℤ}| = P`, implicando que a função tem a taxa mínima de colisão possível.

No caso especial que `P` é um primo seguro como selecionamos, então `P-1` só tem fatores 1, 2, `(P-1)/2` e `P-1`. Como `P` > 7, sabemos que 3 é relativamente primo de `P-1`, daí `w=3` satisfaz a proposta acima.

## Algoritmo de avaliação baseado em cache mais eficiente {#cache-based-evaluation}

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
