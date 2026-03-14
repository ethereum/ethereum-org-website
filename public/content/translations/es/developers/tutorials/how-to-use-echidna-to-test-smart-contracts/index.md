---
title: "Cómo utilizar Echidna para probar contratos inteligentes"
description: "Cómo utilizar Echidna para probar contratos inteligentes automáticamente"
author: "Trailofbits"
lang: es
tags:
  [
    "Solidity",
    "contratos Inteligentes",
    "seguridades",
    "pruebas",
    "fuzzing"
  ]
skill: advanced
breadcrumb: "Echidna"
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Instalación {#installation}

Echidna se puede instalar a través de docker o por medio del binario precompilado.

### Echidna a través de Docker {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_El comando anterior ejecuta eth-security-toolbox en un Docker que tiene acceso a su directorio actual. Puede cambiar los archivos desde su host y ejecutar las herramientas en los archivos desde el Docker_

Dentro de Docker, ejecute:

```bash
solc-select 0.5.11
cd /home/training
```

### Binario {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## Introducción al fuzzing basado en propiedades {#introduction-to-property-based-fuzzing}

Echidna es un fuzzer basado en propiedades, que describimos en nuestras entradas de blog anteriores ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

[Fuzzing](https://wikipedia.org/wiki/Fuzzing) es una técnica muy conocida en la comunidad de la seguridad. Consiste en generar entradas que son más o menos aleatorias para encontrar errores en el programa. Los fuzzers para software tradicional (como [AFL](http://lcamtuf.coredump.cx/afl/) o [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) son conocidos por ser herramientas eficientes para encontrar errores.

Más allá de la generación de entradas puramente aleatorias, existen muchas técnicas y estrategias para generar buenas entradas, que incluyen:

- Obtener feedback de cada ejecución y guiar la generación usándolo. Por ejemplo, si una entrada recién generada conduce al descubrimiento de una nueva ruta, puede tener sentido generar nuevas entradas cercanas a ella.
- Generar la entrada respetando una restricción estructural. Por ejemplo, si su entrada contiene una cabecera con una suma de verificación (checksum), tendrá sentido dejar que el fuzzer genere una entrada que valide la suma de verificación.
- Utilizar entradas conocidas para generar nuevas entradas: si tiene acceso a un gran conjunto de datos de entradas válidas, su fuzzer puede generar nuevas entradas a partir de ellas, en lugar de comenzar la generación desde cero. Estas se suelen llamar _seeds_.

### Fuzzing basado en propiedades {#property-based-fuzzing}

Echidna pertenece a una familia específica de fuzzer: el fuzzing basado en propiedades, muy inspirado en [QuickCheck](https://wikipedia.org/wiki/QuickCheck). A diferencia del fuzzer clásico, que intentará encontrar fallos, Echidna intentará romper las invariantes definidas por el usuario.

En los contratos inteligentes, las invariantes son funciones de Solidity, que pueden representar cualquier estado incorrecto o inválido que el contrato puede alcanzar, incluyendo:

- Control de acceso incorrecto: el atacante se convirtió en el propietario del contrato.
- Máquina de estado incorrecta: los tokens pueden transferirse mientras el contrato está en pausa.
- Aritmética incorrecta: el usuario puede provocar un subdesbordamiento en su saldo y obtener tokens gratis ilimitados.

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

Asumiremos que este token debe tener las siguientes propiedades:

- Cualquiera puede tener un máximo de 1000 tokens
- El token no se puede transferir (no es un token ERC20)

### Escribir una propiedad {#write-a-property}

Las propiedades de Echidna son funciones de Solidity. Una propiedad debe:

- No tener argumentos
- Devolver `true` si tiene éxito
- Tener un nombre que empiece con `echidna`

Echidna hará lo siguiente:

- Generar automáticamente transacciones arbitrarias para probar la propiedad.
- Informar de cualquier transacción que lleve a una propiedad a devolver `false` o a lanzar un error.
- Descartar los efectos secundarios al llamar a una propiedad (es decir, si la propiedad cambia una variable de estado, se descarta después de la prueba)

La siguiente propiedad comprueba que quien realiza la llamada no tiene más de 1000 tokens:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

Utilice la herencia para separar su contrato de sus propiedades:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) implementa la propiedad y hereda del token.

### Iniciar un contrato {#initiate-a-contract}

Echidna necesita un [constructor](/developers/docs/smart-contracts/anatomy/#constructor-functions) sin argumentos. Si su contrato necesita una inicialización específica, debe hacerlo en el constructor.

Hay algunas direcciones específicas en Echidna:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`, que llama al constructor.
- `0x10000`, `0x20000` y `0x00a329C0648769a73afAC7F9381e08fb43DBEA70`, que llaman aleatoriamente a las otras funciones.

No necesitamos ninguna inicialización particular en nuestro ejemplo actual; como resultado, nuestro constructor está vacío.

### Ejecutar Echidna {#run-echidna}

Echidna se inicia con:

```bash
echidna-test contract.sol
```

Si `contract.sol` contiene varios contratos, puede especificar el objetivo:

```bash
echidna-test contract.sol --contract MyContract
```

### Resumen: Probar una propiedad {#summary-testing-a-property}

A continuación se resume la ejecución de Echidna en nuestro ejemplo:

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

Echidna encontró que la propiedad se viola si se llama a `backdoor`.

## Filtrar funciones para llamar durante una campaña de fuzzing {#filtering-functions-to-call-during-a-fuzzing-campaign}

Veremos cómo filtrar las funciones a las que aplicar fuzzing.
El objetivo es el siguiente contrato inteligente:

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

Este pequeño ejemplo obliga a Echidna a encontrar una secuencia determinada de transacciones para cambiar una variable de estado.
Esto es difícil para un fuzzer (se recomienda usar una herramienta de ejecución simbólica como [Manticore](https://github.com/trailofbits/manticore)).
Podemos ejecutar Echidna para verificar esto:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### Filtrado de funciones {#filtering-functions}

Echidna tiene problemas para encontrar la secuencia correcta para probar este contrato porque las dos funciones de reseteo (`reset1` y `reset2`) establecerán todas las variables de estado a `false`.
Sin embargo, podemos usar una característica especial de Echidna para incluir en la lista negra la función de reseteo o para incluir en la lista blanca solo las funciones `f`, `g`,
`h` e `i`.

Para incluir funciones en la lista negra, podemos usar este archivo de configuración:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

Otro enfoque para filtrar funciones es listar las funciones incluidas en la lista blanca. Para ello, podemos usar este archivo de configuración:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` es `true` por defecto.
- El filtrado se realizará solo por nombre (sin parámetros). Si tiene `f()` y `f(uint256)`, el filtro `"f"` coincidirá con ambas funciones.

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

Echidna encontrará la secuencia de transacciones para falsear la propiedad casi de inmediato.

### Resumen: Filtrado de funciones {#summary-filtering-functions}

Echidna puede incluir funciones en una lista negra o en una lista blanca para llamar durante una campaña de fuzzing usando:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna inicia una campaña de fuzzing, ya sea incluyendo en la lista negra a `f1`, `f2` y `f3` o solo llamando a estas, según el valor del booleano `filterBlacklist`.

## Cómo probar el assert de Solidity con Echidna {#how-to-test-soliditys-assert-with-echidna}

En este breve tutorial, vamos a mostrar cómo usar Echidna para probar la comprobación de aserciones en los contratos. Supongamos que tenemos un contrato como este:

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

### Escribir una aserción {#write-an-assertion}

Queremos asegurarnos de que `tmp` es menor o igual que `counter` después de devolver su diferencia. Podríamos escribir una propiedad de Echidna, pero necesitaremos almacenar el valor `tmp` en algún lugar. En su lugar, podríamos usar una aserción como esta:

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

Para habilitar la prueba de fallos de aserción, cree un [archivo de configuración de Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
checkAsserts: true
```

Cuando ejecutamos este contrato en Echidna, obtenemos los resultados esperados:

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

Como puede ver, Echidna informa de un fallo de aserción en la función `inc`. Es posible añadir más de una aserción por función, pero Echidna no puede decir qué aserción ha fallado.

### Cuándo y cómo usar aserciones {#when-and-how-use-assertions}

Las aserciones se pueden utilizar como alternativas a las propiedades explícitas, especialmente si las condiciones a comprobar están directamente relacionadas con el uso correcto de alguna operación `f`. Añadir aserciones después de un código forzará que la comprobación se produzca inmediatamente después de que se haya ejecutado:

```solidity
function f(..) public {
    // some complex code
    ...
    assert (condition);
    ...
}

```

Por el contrario, usar una propiedad explícita de Echidna ejecutará transacciones aleatoriamente y no hay una forma fácil de forzar exactamente cuándo se comprobará. Aún es posible usar esta solución:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Sin embargo, hay algunos problemas:

- Falla si `f` se declara como `internal` o `external`.
- No está claro qué argumentos se deben usar para llamar a `f`.
- Si `f` se revierte, la propiedad fallará.

En general, recomendamos seguir la [recomendación de John Regehr](https://blog.regehr.org/archives/1091) sobre cómo usar las aserciones:

- No fuerce ningún efecto secundario durante la comprobación de la aserción. Por ejemplo: `assert(ChangeStateAndReturn() == 1)`
- No asegure declaraciones obvias. Por ejemplo, `assert(var >= 0)` donde `var` se declara como `uint`.

Finalmente, por favor, **no use** `require` en lugar de `assert`, ya que Echidna no podrá detectarlo (pero el contrato se revertirá de todos modos).

### Resumen: comprobación de aserciones {#summary-assertion-checking}

A continuación se resume la ejecución de Echidna en nuestro ejemplo:

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

Echidna encontró que la aserción en `inc` puede fallar si esta función se llama varias veces con argumentos grandes.

## Recopilar y modificar un corpus de Echidna {#collecting-and-modifying-an-echidna-corpus}

Veremos cómo recopilar y usar un corpus de transacciones con Echidna. El objetivo es el siguiente contrato inteligente [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

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

Este pequeño ejemplo obliga a Echidna a encontrar ciertos valores para cambiar una variable de estado. Esto es difícil para un fuzzer (se recomienda usar una herramienta de ejecución simbólica como [Manticore](https://github.com/trailofbits/manticore)).
Podemos ejecutar Echidna para verificar esto:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

Sin embargo, aún podemos usar Echidna para recopilar un corpus al ejecutar esta campaña de fuzzing.

### Recopilando un corpus {#collecting-a-corpus}

Para habilitar la recopilación del corpus, cree un directorio de corpus:

```bash
mkdir corpus-magic
```

Y un [archivo de configuración de Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

Ahora podemos ejecutar nuestra herramienta y comprobar el corpus recopilado:

```bash
echidna-test magic.sol --config config.yaml
```

Echidna todavía no puede encontrar los valores mágicos correctos, pero podemos echar un vistazo al corpus que ha recopilado.
Por ejemplo, uno de estos archivos era:

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

Claramente, esta entrada no activará el fallo en nuestra propiedad. Sin embargo, en el siguiente paso veremos cómo modificarlo para ello.

### Sembrar un corpus {#seeding-a-corpus}

Echidna necesita ayuda para lidiar con la función `magic`. Vamos a copiar y modificar la entrada para usar parámetros adecuados para ella:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

Modificaremos `new.txt` para llamar a `magic(42,129,333,0)`. Ahora, podemos volver a ejecutar Echidna:

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

Esta vez, encontró que la propiedad es violada inmediatamente.

## Encontrar transacciones con alto consumo de gas {#finding-transactions-with-high-gas-consumption}

Veremos cómo encontrar las transacciones con un alto consumo de gas utilizando Echidna. El objetivo es el siguiente contrato inteligente:

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

Aquí `expensive` puede tener un gran consumo de gas.

Actualmente, Echidna siempre necesita una propiedad para probar: aquí `echidna_test` siempre devuelve `true`.
Podemos ejecutar Echidna para verificar esto:

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### Medición del consumo de gas {#measuring-gas-consumption}

Para habilitar el consumo de gas con Echidna, cree un archivo de configuración `config.yaml`:

```yaml
estimateGas: true
```

En este ejemplo, también reduciremos el tamaño de la secuencia de transacciones para que los resultados sean más fáciles de entender:

```yaml
seqLen: 2
estimateGas: true
```

### Ejecutar Echidna {#run-echidna-3}

Una vez que hemos creado el archivo de configuración, podemos ejecutar Echidna de esta manera:

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

### Filtrar llamadas que reducen el gas {#filtering-out-gas-reducing-calls}

El tutorial anterior sobre el **filtrado de funciones a las que llamar durante una campaña de fuzzing** muestra cómo eliminar algunas funciones de sus pruebas.  
Esto puede ser fundamental para obtener una estimación precisa del gas.
Considere el siguiente ejemplo:

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

Si Echidna puede llamar a todas las funciones, no encontrará fácilmente transacciones con un alto coste de gas:

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

Esto se debe a que el coste depende del tamaño de `addrs` y las llamadas aleatorias tienden a dejar el array casi vacío.
Sin embargo, incluir en la lista negra `pop` y `clear` nos da resultados mucho mejores:

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

### Resumen: Encontrar transacciones con alto consumo de gas {#summary-finding-transactions-with-high-gas-consumption}

Echidna puede encontrar transacciones con un alto consumo de gas usando la opción de configuración `estimateGas`:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna informará de una secuencia con el consumo máximo de gas para cada función, una vez que la campaña de fuzzing haya terminado.
