---
title: Cómo utilizar Echidna para probar contratos inteligentes
description: Cómo utilizar Echidna para probar contratos inteligentes automáticamente
author: "Trailofbits"
lang: es
tags:
  - "solidity"
  - "contratos inteligentes"
  - "seguridad"
  - "pruebas"
  - "fuzzing"
skill: advanced
published: 2020-04-10
source: Desarrollar contratos seguros
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Instalación {#installation}

Echidna se puede instalar a través de docker o por medio del binario precompilado.

### Echidna a través de docker {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_El comando de arriba ejecuta eth-security-toolbox en un docker que tiene acceso a su directorio actual. Puede cambiar los archivos desde su host y correr las herramientas dentro de los archivos desde el docker._

Dentro de docker, ejecute:

```bash
solc-select 0.5.11
cd /home/training
```

### Binario {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## Introducción al fuzzing basado en propiedades {#introduction-to-property-based-fuzzing}

Echidna es un fuzzer basado en propiedades; está descrito en nuestras entradas de blog anteriores ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

El [fuzzing](https://wikipedia.org/wiki/Fuzzing) es una técnica conocida en la comunidad de la seguridad. Consiste en la generación de entradas que son más o menos aleatorias para encontrar errores en el programa. Los fuzzers para software tradicional (como [AFL](http://lcamtuf.coredump.cx/afl/) o [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) son herramientas eficaces para encontrar errores.

Más allá de la generación de entradas puramente aleatorias, existen muchas técnicas y estrategias para generar buenas entradas, que incluyen:

- Obtener feedback de cada ejecución y guiar la generación usándolo. Por ejemplo, si una entrada recién generada conduce al descubrimiento de una nueva ruta, puede tener sentido generar nuevas entradas cercanas a ella.
- Generar la entrada respetando una restricción estructural. Por ejemplo, si su entrada contiene un encabezado con una suma de control o checksum, tendrá sentido dejar que el fuzzer genere una entrada que valide la suma de control.
- Usar entradas conocidas para generar nuevas entradas: si tiene acceso a un gran conjunto de datos de entrada válidos, el fuzzer puede generar nuevas entradas a partir de ellos, en lugar de comenzar la generación desde cero. Estas se conocen usualmente como _seeds_.

### Fuzzing basado en propiedades {#property-based-fuzzing}

Echidna pertenece a una familia específica de fuzzer: fuzzing basado en propiedades inspirado en gran medida en [QuickCheck](https://wikipedia.org/wiki/QuickCheck). En contraste a un fuzzer clásico que intentará encontrar crashes, Echidna intentará romper invariantes definidas por el usuario.

En los contratos inteligentes, las invariantes son funciones de Solidity que pueden representar cualquier estado incorrecto o inválido al que pueda llegar el contrato, incluyendo:

- Control de acceso incorrecto: el atacante se convirtió en el propietario del contrato.
- Máquina de estado incorrecta: los tokens se pueden transferir mientras el contrato está en pausa.
- Aritmética incorrecta: el usuario puede desbordar su saldo y obtener tokens gratis ilimitados.

### Probar una propiedad con Echidna {#testing-a-property-with-echidna}

Veremos cómo probar un contrato inteligente con Echidna. El objetivo es el siguiente contrato inteligente [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
contract Token{
  mapping(address => uint) public balances;
  function airdrop() public{
      balances[msg.sender] = 1000;
  }
  function consume() public{
      require(balances[msg.sender]>0);
      balances[msg.sender] -= 1;
  }
  function backdoor() public{
      balances[msg.sender] += 1;
  }
}
```

Supondremos que este token debe tener las siguientes propiedades:

- Cualquier persona puede tener como máximo 1000 tokens
- El token no puede transferirse (no es un token ERC20)

### Escribir una propiedad {#write-a-property}

Las propiedades de Echidna son funciones de Solidity. Una propiedad:

- No debe tener ningún argumento.
- Devolver `true` si hay éxito.
- Su nombre debe comenzar con `echidna`.

Echidna:

- Generará automáticamente transacciones arbitrarias para probar la propiedad.
- Reportará cualquier transacción que haga que una propiedad devuelva `false` o arroje un error.
- Descartará efectos secundarios al llamar a una propiedad (es decir, si la propiedad cambia una variable de estado, se descarta después de la prueba).

La siguiente propiedad comprueba que el invocante no tenga más de 1000 tokens:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

Use herencia para separar su contrato de sus propiedades:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) implementa la propiedad y hereda del contrato.

### Iniciar un contrato {#initiate-a-contract}

Echidna necesita un [constructor](/developers/docs/smart-contracts/anatomy/#constructor-functions) sin argumento. Si su contrato necesita una inicialización específica, debe hacerlo en el constructor.

Hay algunas direcciones específicas en Echidna:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`, que llama al constructor.
- `0x10000`, `0x20000` y `0x00a329C0648769a73afAC7F9381e08fb43DBEA70`, que llama de forma aleatoria a las otras funciones.

No necesitamos ninguna inicialización en particular en nuestro ejemplo actual; como resultado, nuestro constructor está vacío.

### Ejecutar Echidna {#run-echidna}

Echidna se inicia con:

```bash
echidna-test contract.sol
```

Si contract.sol contiene varios contratos, puede especificar el objetivo:

```bash
echidna-test contract.sol --contract MyContract
```

### Resumen: probar una propiedad {#summary-testing-a-property}

A continuación se resume la ejecución de echidna en nuestro ejemplo:

```solidity
contract TestToken is Token{
    constructor() public {}
        function echidna_balance_under_1000() public view returns(bool){
          return balances[msg.sender] <= 1000;
        }
  }
```

```bash
echidna-test testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence, shrinking (1205/5000):
    airdrop()
    backdoor()

...
```

Echidna descubrió que la propiedad se viola si se llama a `backdoor`.

## Filtrado de funciones para llamar durante una campaña de fuzzing {#filtering-functions-to-call-during-a-fuzzing-campaign}

Veremos cómo filtrar las funciones a fuzzear. El objetivo es el siguiente contrato inteligente.

```solidity
contract C {
  bool state1 = false;
  bool state2 = false;
  bool state3 = false;
  bool state4 = false;

  function f(uint x) public {
    require(x == 12);
    state1 = true;
  }

  function g(uint x) public {
    require(state1);
    require(x == 8);
    state2 = true;
  }

  function h(uint x) public {
    require(state2);
    require(x == 42);
    state3 = true;
  }

 function i() public {
    require(state3);
    state4 = true;
  }

  function reset1() public {
    state1 = false;
    state2 = false;
    state3 = false;
    return;
  }

  function reset2() public {
    state1 = false;
    state2 = false;
    state3 = false;
    return;
  }

  function echidna_state4() public returns (bool) {
    return (!state4);
  }
}
```

Este pequeño ejemplo obliga a Echidna a encontrar una secuencia determinada de transacciones para cambiar una variable de estado. Esto es difícil para un fuzzer (se recomienda utilizar una herramienta de ejecución simbólica como [Manticore](https://github.com/trailofbits/manticore)). Podemos ejecutar Echidna para verificar esto:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### Filtrar funciones {#filtering-functions}

Echidna tiene problemas para encontrar la secuencia correcta para probar este contrato porque las dos funciones de restablecimiento (`reset1` y `reset2`) establecerán todas las variables de estado a `false`. Sin embargo, podemos usar una función especial de Echidna para poner en la lista negra la función de restablecimiento o para poner en la lista blanca solo las funciones `f`, `g`, `h` e `i`.

Para incluir funciones en la lista negra, podemos usar este archivo de configuración:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

Otro enfoque para filtrar funciones es incluir funciones en la lista blanca. Para ello, podemos utilizar este archivo de configuración:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` es `true` de forma predeterminada.
- El filtrado se realizará únicamente por nombre (sin parámetros). Si tiene `f()` y `f(uint256)`, el filtro `"f"` coincidirá con ambas funciones.

### Ejecutar Echidna {#run-echidna-1}

Para ejecutar Echidna con un archivo de configuración `blacklist.yaml`:

```bash
echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    f(12)
    g(8)
    h(42)
    i()
```

Echidna encontrará la secuencia de transacciones para falsificar la propiedad casi de inmediato.

### Resumen: filtrado de funciones {#summary-filtering-functions}

Echidna puede incluir funciones en una lista negra o lista blanca para llamar durante una campaña de fuzzing utilizando:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna comienza una campaña de fuzzing, ya sea colocando en la lista negra `f1`, `f2` y `f3` o solo los invocándolas según el valor del booleano `filterBlacklist`.

## Cómo probar la afirmación de Solidity con Echidna {#how-to-test-soliditys-assert-with-echidna}

En este breve tutorial, mostraremos cómo usar Echidna para probar la verificación de afirmaciones en contratos. Supongamos que tenemos un contrato como este:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    // tmp <= counter
    return (counter - tmp);
  }
}
```

### Escriba una afirmación {#write-an-assertion}

Queremos asegurarnos de que `tmp` sea menor o igual que `counter` después de devolver su diferencia. Podríamos escribir una propiedad de Echidna, pero tendremos que almacenar el valor `tmp` en algún lugar. En su lugar, podríamos usar una afirmación como esta:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

### Ejecutar Echidna {#run-echidna-2}

Para habilitar la prueba de falla de afirmaciones, cree un [archivo de configuración de Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
checkAsserts: true
```

Al ejecutar este contrato en Echidna, obtenemos los resultados esperados:

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Como puede ver, Echidna informa de un error de afirmación en la función `inc`. Es posible agregar más de una afirmación por función, pero Echidna no puede distinguir qué afirmación falló.

### Cómo y cuándo utilizar afirmaciones {#when-and-how-use-assertions}

Las afirmaciones pueden usarse como alternativas a las propiedades explícitas, especialmente si las condiciones a verificar están directamente relacionadas con el uso correcto de alguna operación `f`. Agregar afirmaciones luego de algo de código hará que la verificación suceda inmediatamente después de la ejecución:

```solidity
function f(..) public {
    // some complex code
    ...
    assert (condition);
    ...
}

```

Por el contrario, el uso de una propiedad explícita de Echidna ejecutará transacciones de forma aleatoria y no hay una manera fácil de asegurar exactamente cuándo habrá una verificación. Es posible utilizar esta alternativa:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Sin embargo, existen algunos problemas:

- Falla si `f` se declara como `internal` o `external`.
- No está claro qué argumentos deben usarse para llamar a `f`.
- Si `f` se revierte, la propiedad fallará.

En general, recomendamos seguir la [recomendación de John Regehr](https://blog.regehr.org/archives/1091) sobre cómo utilizar las afirmaciones:

- No fuerce ningún efecto secundario durante la verificación de afirmaciones. Por ejemplo: `assert(ChangeStateAndReturn() == 1)`
- No haga afirmaciones obvias. Por ejemplo `assert(var >= 0)`, donde `var` se declara como `uint`.

Por último, **no utilice** `require` en lugar de `assert`, ya que Echidna no podrá detectarlo (el contrato se revertirá de todos modos).

### Resumen: verificación de afirmaciones {#summary-assertion-checking}

A continuación se resume la ejecución de echidna en nuestro ejemplo:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Echidna descubrió que la afirmación en `inc` puede fallar si se llama a esta función varias veces con argumentos grandes.

## Recolectar y modificar un corpus de Echidna {#collecting-and-modifying-an-echidna-corpus}

Veremos cómo recopilar y utilizar un corpus de transacciones con Echidna. El objetivo es el siguiente contrato inteligente [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
contract C {
  bool value_found = false;
  function magic(uint magic_1, uint magic_2, uint magic_3, uint magic_4) public {
    require(magic_1 == 42);
    require(magic_2 == 129);
    require(magic_3 == magic_4+333);
    value_found = true;
    return;
  }

  function echidna_magic_values() public returns (bool) {
    return !value_found;
  }

}
```

Este pequeño ejemplo obliga a Echidna a encontrar ciertos valores para cambiar una variable de estado. Esto es difícil para un fuzzer (se recomienda utilizar una herramienta de ejecución simbólica como [Manticore](https://github.com/trailofbits/manticore)). Podemos ejecutar Echidna para verificar esto:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

Sin embargo, aún podemos usar Echidna para recolectar el corpus al ejecutar esta campaña de fuzzing.

### Recolección de un corpus {#collecting-a-corpus}

Para habilitar la recolección de un corpus, cree un directorio de corpus:

```bash
mkdir corpus-magic
```

Y un [archivo de configuración de Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

Ahora podemos ejecutar nuestra herramienta y verificar el corpus recopilado:

```bash
echidna-test magic.sol --config config.yaml
```

Echidna aún no puede encontrar los valores mágicos correctos, pero podemos ver el corpus recopilado. Por ejemplo, uno de estos archivos era:

```json
[
  {
    "_gas'": "0xffffffff",
    "_delay": ["0x13647", "0xccf6"],
    "_src": "00a329c0648769a73afac7f9381e08fb43dbea70",
    "_dst": "00a329c0648769a73afac7f9381e08fb43dbea72",
    "_value": "0x0",
    "_call": {
      "tag": "SolCall",
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "93723985220345906694500679277863898678726808528711107336895287282192244575836"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "334"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "68093943901352437066264791224433559271778087297543421781073458233697135179558"
            ],
            "tag": "AbiUInt"
          },
          {
            "tag": "AbiUInt",
            "contents": [256, "332"]
          }
        ]
      ]
    },
    "_gasprice'": "0xa904461f1"
  }
]
```

Claramente, esta entrada no provocará la falla en nuestra propiedad. Sin embargo, en el siguiente paso veremos cómo modificarla para ello.

### Sembrar un corpus {#seeding-a-corpus}

Echidna necesita ayuda para lidiar con la función `magic`. Vamos a copiar y modificar la entrada para usar parámetros adecuados para ella:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

Modificaremos `new.txt` para llamar a `magic (42,129,333,0)`. Ahora, podemos volver a ejecutar Echidna:

```bash
echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

En esta ocasión, encontró que la propiedad es violada inmediatamente.

## Buscar transacciones con alto consumo de gas {#finding-transactions-with-high-gas-consumption}

Veremos cómo encontrar las transacciones con un alto consumo de gas utilizando Echidna. El objetivo es el siguiente contrato inteligente.

```solidity
contract C {
  uint state;

  function expensive(uint8 times) internal {
    for(uint8 i=0; i < times; i++)
      state = state + i;
  }

  function f(uint x, uint y, uint8 times) public {
    if (x == 42 && y == 123)
      expensive(times);
    else
      state = 0;
  }

  function echidna_test() public returns (bool) {
    return true;
  }

}
```

Aquí `expensive` puede tener un alto consumo de gas.

Actualmente, Echidna siempre necesita una propiedad para probar: aquí `echidna_test` siempre devuelve `true`. Podemos ejecutar Echidna para verificar esto:

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### Medir el consumo de gas {#measuring-gas-consumption}

Para habilitar el consumo de gas con Echidna, cree un archivo de configuración `config.yaml`:

```yaml
estimateGas: true
```

En este ejemplo, también reduciremos el tamaño de la secuencia de la transacción para que los resultados sean más fáciles de entender:

```yaml
seqLen: 2
estimateGas: true
```

### Ejecutar Echidna {#run-echidna-3}

Una vez que tenemos el archivo de configuración creado, podemos ejecutar Echidna así:

```bash
echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

f used a maximum of 1333608 gas
  Call sequence:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- El gas que se muestra es una estimación proporcionada por [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-).

### Filtrar llamadas de reducción de gas {#filtering-out-gas-reducing-calls}

El tutorial sobre **filtrado de funciones para llamar durante una campaña de fuzzing** anterior muestra cómo eliminar algunas funciones de sus pruebas.  
Esto puede ser fundamental para obtener una estimación precisa del gas. Considere el siguiente ejemplo:

```solidity
contract C {
  address [] addrs;
  function push(address a) public {
    addrs.push(a);
  }
  function pop() public {
    addrs.pop();
  }
  function clear() public{
    addrs.length = 0;
  }
  function check() public{
    for(uint256 i = 0; i < addrs.length; i++)
      for(uint256 j = i+1; j < addrs.length; j++)
        if (addrs[i] == addrs[j])
          addrs[j] = address(0x0);
  }
  function echidna_test() public returns (bool) {
      return true;
  }
}
```

Si Echidna puede llamar a todas las funciones, no encontrará fácilmente transacciones con un alto costo de gas:

```
echidna-test pushpop.sol --config config.yaml
...
pop used a maximum of 10746 gas
...
check used a maximum of 23730 gas
...
clear used a maximum of 35916 gas
...
push used a maximum of 40839 gas
```

Eso es porque el costo depende del tamaño de `addrs` y las llamadas aleatorias tienden a dejar el array casi vacío. Sin embargo, incluir `pop` y `clear` en una lista negra nos da mejores resultados:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
echidna-test pushpop.sol --config config.yaml
...
push used a maximum of 40839 gas
...
check used a maximum of 1484472 gas
```

### Resumen: buscar transacciones con alto consumo de gas {#summary-finding-transactions-with-high-gas-consumption}

Echidna puede encontrar transacciones con un alto consumo de gas utilizando la opción de configuración `estimateGas`:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna reportará una secuencia con el consumo máximo de gas para cada función una vez finalizada la campaña de fuzzing.
