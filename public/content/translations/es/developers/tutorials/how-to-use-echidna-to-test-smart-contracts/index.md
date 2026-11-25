---
title: "Cómo usar Echidna para probar contratos inteligentes"
description: "Cómo usar Echidna para probar contratos inteligentes automáticamente"
author: "Trailofbits"
lang: es
tags: ["Solidity", "contratos inteligentes", "seguridad", "pruebas", "fuzzing"]
skill: advanced
breadcrumb: Echidna
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Instalación {#installation}

Echidna se puede instalar a través de Docker, Homebrew o usando el binario precompilado. Los ejemplos de este tutorial se probaron con Echidna 2.3.3 y solc 0.8.37.

### Echidna a través de Docker {#echidna-through-docker}

```sh
docker pull ghcr.io/crytic/echidna/echidna:latest
docker run --rm -it -v "$PWD":/src ghcr.io/crytic/echidna/echidna:latest
```

_El último comando ejecuta la imagen de Echidna en un contenedor de Docker que tiene acceso a su directorio actual. Puede cambiar los archivos desde su host y ejecutar las herramientas en los archivos desde Docker. La imagen también incluye [Slither](https://github.com/crytic/slither), [crytic-compile](https://github.com/crytic/crytic-compile) y [solc-select](https://github.com/crytic/solc-select)._

Dentro de Docker, ejecute:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
cd /src
```

### Binario {#binary}

Descargue la última versión para su plataforma desde [https://github.com/crytic/echidna/releases/latest](https://github.com/crytic/echidna/releases/latest). En macOS o Linux también puede ejecutar `brew install echidna`, que instala Slither y crytic-compile junto con él.

Al usar el binario de la versión, instale [Slither](https://github.com/crytic/slither) y [solc-select](https://github.com/crytic/solc-select) usted mismo (por ejemplo, `pip3 install slither-analyzer solc-select` en un entorno virtual de Python) y seleccione una versión del compilador:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
```

Echidna se ejecuta sin Slither, pero Slither extrae constantes como los números mágicos utilizados en las declaraciones `require`, y varios ejemplos a continuación dependen de él para encontrar errores rápidamente.

## Introducción al fuzzing basado en propiedades {#introduction-to-property-based-fuzzing}

Echidna es un fuzzer basado en propiedades, que describimos en nuestras publicaciones de blog anteriores ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

El [fuzzing](https://wikipedia.org/wiki/Fuzzing) es una técnica muy conocida en la comunidad de seguridad. Consiste en generar entradas que son más o menos aleatorias para encontrar errores en el programa. Los fuzzers para software tradicional (como [AFL](http://lcamtuf.coredump.cx/afl/) o [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) son conocidos por ser herramientas eficientes para encontrar errores.

Más allá de la generación puramente aleatoria de entradas, existen muchas técnicas y estrategias para generar buenas entradas, que incluyen:

- Obtener retroalimentación de cada ejecución y guiar la generación usándola. Por ejemplo, si una entrada recién generada conduce al descubrimiento de una nueva ruta, puede tener sentido generar nuevas entradas cercanas a ella.
- Generar la entrada respetando una restricción estructural. Por ejemplo, si su entrada contiene un encabezado con una suma de comprobación (checksum), tendrá sentido dejar que el fuzzer genere entradas que validen la suma de comprobación.
- Usar entradas conocidas para generar nuevas entradas: si tiene acceso a un gran conjunto de datos de entradas válidas, su fuzzer puede generar nuevas entradas a partir de ellas, en lugar de comenzar su generación desde cero. Estas generalmente se denominan _semillas_ (seeds).

### Fuzzing basado en propiedades {#property-based-fuzzing}

Echidna pertenece a una familia específica de fuzzers: el fuzzing basado en propiedades, fuertemente inspirado en [QuickCheck](https://wikipedia.org/wiki/QuickCheck). A diferencia de los fuzzers clásicos que intentarán encontrar fallos (crashes), Echidna intentará romper invariantes definidos por el usuario.

En los contratos inteligentes, los invariantes son funciones de Solidity que pueden representar cualquier estado incorrecto o inválido que el contrato pueda alcanzar, incluyendo:

- Control de acceso incorrecto: el atacante se convirtió en el propietario del contrato.
- Máquina de estado incorrecta: los tokens se pueden transferir mientras el contrato está en pausa.
- Aritmética incorrecta: el usuario puede causar un desbordamiento negativo (underflow) en su saldo y obtener tokens gratis ilimitados.

### Probar una propiedad con Echidna {#testing-a-property-with-echidna}

Veremos cómo probar un contrato inteligente con Echidna. El objetivo es el siguiente contrato inteligente [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) public balances;

    function airdrop() public {
        balances[msg.sender] = 1000;
    }

    function consume() public {
        require(balances[msg.sender] > 0);
        balances[msg.sender] -= 1;
    }

    function backdoor() public {
        balances[msg.sender] += 1;
    }
}
```

Asumiremos que este token debe tener las siguientes propiedades:

- Cualquiera puede tener como máximo 1000 tokens
- El token no se puede transferir (no es un token ERC-20)

### Escribir una propiedad {#write-a-property}

Las propiedades de Echidna son funciones de Solidity. Una propiedad debe:

- No tener argumentos
- Devolver `true` si tiene éxito
- Tener un nombre que comience con `echidna`

Echidna hará lo siguiente:

- Generar automáticamente transacciones arbitrarias para probar la propiedad.
- Informar sobre cualquier transacción que lleve a una propiedad a devolver `false` o lanzar un error.
- Descartar los efectos secundarios al llamar a una propiedad (es decir, si la propiedad cambia una variable de estado, se descarta después de la prueba)

La siguiente propiedad comprueba que el llamador no tiene más de 1000 tokens:

```solidity
function echidna_balance_under_1000() public view returns (bool) {
    return balances[msg.sender] <= 1000;
}
```

Use la herencia para separar su contrato de sus propiedades:

```solidity
contract TestToken is Token {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

[`testtoken.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/testtoken.sol) implementa la propiedad y hereda del token.

### Iniciar un contrato {#initiate-a-contract}

Echidna necesita un [constructor](/developers/docs/smart-contracts/anatomy/#constructor-functions) sin argumentos. Si su contrato necesita una inicialización específica, debe hacerlo en el constructor.

Hay algunas direcciones específicas en Echidna:

- `0x30000` que llama al constructor.
- `0x10000`, `0x20000` y `0x30000` que llaman aleatoriamente a las otras funciones.
- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` donde se despliega el contrato bajo prueba.

No necesitamos ninguna inicialización particular en nuestro ejemplo actual, como resultado, nuestro constructor está vacío.

### Ejecutar Echidna {#run-echidna}

Echidna se inicia con:

```sh
echidna contract.sol
```

Si contract.sol contiene múltiples contratos, puede especificar el objetivo:

```sh
echidna contract.sol --contract MyContract
```

Cuando se ejecuta en una terminal, Echidna muestra una interfaz de usuario interactiva. Agregue `--format text` para obtener una salida de texto sin formato como en los ejemplos a continuación.

### Resumen: Probar una propiedad {#summary-testing-a-property}

Lo siguiente resume la ejecución de Echidna en nuestro ejemplo:

```solidity
contract TestToken is Token {
    constructor() {}

    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

```sh
echidna testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence:
    TestToken.airdrop()
    TestToken.backdoor()

...
```

Echidna descubrió que la propiedad se viola si se llama a `backdoor`.

## Filtrar funciones a llamar durante una campaña de fuzzing {#filtering-functions-to-call-during-a-fuzzing-campaign}

Veremos cómo filtrar las funciones a las que se les aplicará fuzzing.
El objetivo es el siguiente contrato inteligente:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool state1 = false;
    bool state2 = false;
    bool state3 = false;
    bool state4 = false;

    function f(uint256 x) public {
        require(x == 12);
        state1 = true;
    }

    function g(uint256 x) public {
        require(state1);
        require(x == 8);
        state2 = true;
    }

    function h(uint256 x) public {
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

    function echidna_state4() public view returns (bool) {
        return (!state4);
    }
}
```

Este pequeño ejemplo obliga a Echidna a encontrar una cierta secuencia de transacciones para cambiar una variable de estado.
Esto es difícil para un fuzzer.
Podemos ejecutar Echidna para verificar esto:

```sh
echidna multi.sol
...
echidna_state4: passing
...
```

### Filtrar funciones {#filtering-functions}

Echidna tiene problemas para encontrar la secuencia correcta para probar este contrato porque las dos funciones de reinicio (`reset1` y `reset2`) establecerán todas las variables de estado en `false`.
Sin embargo, podemos usar una característica especial de Echidna para poner en la lista negra la función de reinicio o para poner en la lista blanca solo las funciones `f`, `g`,
`h` y `i`.

Para poner funciones en la lista negra, podemos usar este archivo de configuración:

```yaml
filterBlacklist: true
filterFunctions: ["C.reset1()", "C.reset2()"]
```

Otro enfoque para filtrar funciones es enumerar las funciones en la lista blanca. Para hacer eso, podemos usar este archivo de configuración:

```yaml
filterBlacklist: false
filterFunctions: ["C.f(uint256)", "C.g(uint256)", "C.h(uint256)", "C.i()"]
```

- `filterBlacklist` es `true` por defecto.
- El filtrado se realiza en el nombre completo de la función: el nombre del contrato, un `.` y la firma de la interfaz binaria de aplicación (ABI) (por ejemplo, `C.f(uint256)`). Si tiene `f()` y `f(uint256)`, puede elegir exactamente cuál filtrar. Un nombre simple como `"reset1"` no coincide con nada.

### Ejecutar Echidna {#run-echidna-1}

Para ejecutar Echidna con un archivo de configuración `blacklist.yaml`:

```sh
echidna multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    C.f(12)
    C.g(8)
    C.h(42)
    C.i()
```

Echidna encontrará la secuencia de transacciones para falsificar la propiedad casi de inmediato.

### Resumen: Filtrar funciones {#summary-filtering-functions}

Echidna puede poner en la lista negra o en la lista blanca las funciones a llamar durante una campaña de fuzzing usando:

```yaml
filterBlacklist: true
filterFunctions: ["C.f1()", "C.f2()", "C.f3()"]
```

```sh
echidna contract.sol --config config.yaml
...
```

Echidna inicia una campaña de fuzzing ya sea poniendo en la lista negra `C.f1()`, `C.f2()` y `C.f3()` o solo llamando a estas, según
el valor del booleano `filterBlacklist`.

## Cómo probar la aserción de Solidity con Echidna {#how-to-test-soliditys-assert-with-echidna}

En este breve tutorial, vamos a mostrar cómo usar Echidna para probar la comprobación de aserciones en contratos. Supongamos que tenemos un contrato como este:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        // tmp <= counter
        return (counter - tmp);
    }
}
```

Desde Solidity 0.8, los desbordamientos aritméticos se revierten por defecto. El bloque `unchecked` restaura el comportamiento de envoltura (wrapping) para que `counter` pueda sufrir un desbordamiento, que es el error que queremos que Echidna encuentre.

### Escribir una aserción {#write-an-assertion}

Queremos asegurarnos de que `tmp` sea menor o igual que `counter` después de devolver su diferencia. Podríamos escribir una
propiedad de Echidna, pero necesitaremos almacenar el valor de `tmp` en algún lugar. En su lugar, podríamos usar una aserción como esta:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

### Ejecutar Echidna {#run-echidna-2}

Para habilitar la prueba de fallo de aserción, pase `--test-mode assertion` en la línea de comandos, o cree un [archivo de configuración de Echidna](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
testMode: assertion
```

Cuando ejecutamos este contrato en Echidna, obtenemos los resultados esperados:

```sh
echidna assert.sol --config config.yaml
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

Como puede ver, Echidna informa de algún fallo de aserción en la función `inc`. Es posible agregar más de una aserción por función, pero Echidna no puede decir qué aserción falló.

### Cuándo y cómo usar aserciones {#when-and-how-use-assertions}

Las aserciones se pueden usar como alternativas a las propiedades explícitas, especialmente si las condiciones a comprobar están directamente relacionadas con el uso correcto de alguna operación `f`. Agregar aserciones después de algún código obligará a que la comprobación ocurra inmediatamente después de que se ejecutó:

```solidity
function f(..) public {
    // algo de código complejo
    ...
    assert (condition);
    ...
}

```

Por el contrario, usar una propiedad explícita de Echidna ejecutará transacciones aleatoriamente y no hay una manera fácil de forzar exactamente cuándo se comprobará. Todavía es posible hacer esta solución alternativa:

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

En general, recomendamos seguir la [recomendación de John Regehr](https://blog.regehr.org/archives/1091) sobre cómo usar aserciones:

- No fuerce ningún efecto secundario durante la comprobación de la aserción. Por ejemplo: `assert(ChangeStateAndReturn() == 1)`
- No afirme declaraciones obvias. Por ejemplo, `assert(var >= 0)` donde `var` se declara como `uint`.

Finalmente, por favor **no use** `require` en lugar de `assert`, ya que Echidna no podrá detectarlo (pero el contrato se revertirá de todos modos).

### Resumen: Comprobación de aserciones {#summary-assertion-checking}

Lo siguiente resume la ejecución de Echidna en nuestro ejemplo:

```solidity
contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

```sh
echidna assert.sol --test-mode assertion
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

Echidna descubrió que la aserción en `inc` puede fallar si esta función se llama varias veces con argumentos grandes.

## Recopilar y modificar un corpus de Echidna {#collecting-and-modifying-an-echidna-corpus}

Veremos cómo recopilar y usar un corpus de transacciones con Echidna. El objetivo es el siguiente contrato inteligente [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool value_found = false;

    function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
        require(magic_1 == 42);
        require(magic_2 == 129);
        require(magic_3 == magic_4 + 333);
        value_found = true;
        return;
    }

    function echidna_magic_values() public view returns (bool) {
        return !value_found;
    }
}
```

Este pequeño ejemplo obliga a Echidna a encontrar ciertos valores para cambiar una variable de estado. Esto es difícil para un fuzzer.
Podemos ejecutar Echidna para verificar esto:

```sh
echidna magic.sol
...

echidna_magic_values: passing
...
```

Sin embargo, todavía podemos usar Echidna para recopilar un corpus al ejecutar esta campaña de fuzzing.

### Recopilar un corpus {#collecting-a-corpus}

Para habilitar la recopilación del corpus, cree un directorio de corpus:

```sh
mkdir corpus-magic
```

Y un [archivo de configuración de Echidna](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
corpusDir: "corpus-magic"
```

Ahora podemos ejecutar nuestra herramienta y comprobar el corpus recopilado:

```sh
echidna magic.sol --config config.yaml
```

Echidna todavía no puede encontrar los valores mágicos correctos. Para ver dónde se atasca, mire el informe de cobertura de `corpus-magic/covered.*.txt`:

```text
7 | *   |     function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
  8 | *r  |         require(magic_1 == 42);
  9 | *r  |         require(magic_2 == 129);
 10 | *r  |         require(magic_3 == magic_4 + 333);
 11 |     |         value_found = true;
 12 |     |         return;
```

La etiqueta `r` significa que Echidna alcanzó la línea pero la ejecución se revirtió allí, y las líneas después del último `require` nunca se ejecutan.

Las secuencias de transacciones que Echidna recopiló se almacenan como archivos JSON en `corpus-magic/coverage/`. Por ejemplo, la primera transacción de uno de estos archivos fue:

```json
[
  {
    "call": {
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639806"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "761"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "91238239174727894896282446013839801776340298206661877345279631871841712965531"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639804"
            ],
            "tag": "AbiUInt"
          }
        ]
      ],
      "tag": "SolCall"
    },
    "delay": [
      "0x00000000000000000000000000000000000000000000000000000000000103ef",
      "0x000000000000000000000000000000000000000000000000000000000000d38b"
    ],
    "dst": "0x00a329c0648769A73afAc7F9381E08FB43dBEA72",
    "gas": 12500000,
    "gasprice": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "src": "0x0000000000000000000000000000000000020000",
    "value": "0x0000000000000000000000000000000000000000000000000000000000000000"
  }
]
```

Claramente, esta entrada no desencadenará el fallo en nuestra propiedad. Sin embargo, en el siguiente paso, veremos cómo modificarla para eso.

### Sembrar un corpus {#seeding-a-corpus}

Echidna necesita algo de ayuda para lidiar con la función `magic`. Vamos a copiar y modificar la entrada para usar parámetros adecuados
para ella (los nombres de los archivos son aleatorios, así que use uno de su propio directorio `corpus-magic/coverage/`):

```sh
cp corpus-magic/coverage/249425678654647553.txt corpus-magic/coverage/new.txt
```

Modificaremos `new.txt` para que contenga una sola transacción que llame a `magic(42,129,333,0)`. Ahora, podemos volver a ejecutar Echidna:

```sh
echidna magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    C.magic(42,129,333,0)

...
```

Esta vez, descubrió que la propiedad se viola de inmediato.

## Encontrar transacciones con alto consumo de gas {#finding-transactions-with-high-gas-consumption}

Veremos cómo encontrar las transacciones con alto consumo de gas con Echidna. Las versiones anteriores de Echidna tenían una opción `estimateGas` para esto; se eliminó en Echidna 2.3.0. En su lugar, medimos el gas con `gasleft()` y dejamos que el [modo de optimización](https://secure-contracts.com/program-analysis/echidna/advanced/optimization_mode.html) de Echidna lo maximice. El objetivo es el siguiente contrato inteligente:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    uint256 state;

    function expensive(uint8 times) internal {
        for (uint8 i = 0; i < times; i++) {
            state = state + i;
        }
    }

    function f(uint256 x, uint256 y, uint8 times) public {
        if (x == 42 && y == 123) {
            expensive(times);
        } else {
            state = 0;
        }
    }
}
```

Aquí `expensive` puede tener un gran consumo de gas.

### Medir el consumo de gas {#measuring-gas-consumption}

En el modo de optimización, Echidna busca funciones que comiencen con `echidna_` que no tomen argumentos y devuelvan un `int256`, e intenta encontrar la secuencia de transacciones que maximice el valor devuelto. Agregamos un contrato de prueba que llama a `f`, registra el gas que usó y expone el máximo (guarde ambos contratos en `gas.sol`):

```solidity
contract TestGas is C {
    int256 maxGasUsed;

    function measureF(uint256 x, uint256 y, uint8 times) public {
        uint256 start = gasleft();
        f(x, y, times);
        int256 used = int256(start - gasleft());
        if (used > maxGasUsed) {
            maxGasUsed = used;
        }
    }

    function echidna_opt_gas_f() public view returns (int256) {
        return maxGasUsed;
    }
}
```

Para habilitar el modo de optimización, cree un archivo de configuración `config.yaml`. En este ejemplo, también reduciremos el tamaño de la secuencia de transacciones para que los resultados sean más fáciles de entender:

```yaml
testMode: optimization
seqLen: 2
```

### Ejecutar Echidna {#run-echidna-3}

Una vez que tengamos creado el archivo de configuración, podemos ejecutar Echidna de esta manera:

```sh
echidna gas.sol --contract TestGas --config config.yaml
...
echidna_opt_gas_f: max value: 127128

  Call sequence:
    TestGas.measureF(42,123,223)

...
```

- El gas mostrado es medido por la implementación de la Máquina Virtual de Ethereum (EVM) en la que se ejecuta Echidna, [hevm](https://github.com/argotorg/hevm), e incluye la sobrecarga de la llamada interna desde `measureF`.
- El máximo no es único: cada campaña es aleatoria, y las campañas más largas (por ejemplo, `--test-limit 200000`) tienden a encontrar valores más grandes.

### Filtrar llamadas que reducen el gas {#filtering-out-gas-reducing-calls}

El tutorial sobre **filtrar funciones a llamar durante una campaña de fuzzing** anterior muestra cómo
eliminar algunas funciones de sus pruebas.  
Esto puede ser crítico para obtener una estimación precisa del gas.
Considere el siguiente ejemplo:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    address[] addrs;

    function push(address a) public {
        addrs.push(a);
    }

    function pop() public {
        addrs.pop();
    }

    function clear() public {
        delete addrs;
    }

    function check() public {
        for (uint256 i = 0; i < addrs.length; i++)
            for (uint256 j = i + 1; j < addrs.length; j++)
                if (addrs[i] == addrs[j]) addrs[j] = address(0x0);
    }

    function echidna_opt_gas_check() public returns (int256) {
        uint256 start = gasleft();
        check();
        return int256(start - gasleft());
    }
}
```

`echidna_opt_gas_check` llama a `check` y devuelve su costo de gas. Como toda función de prueba de Echidna, sus cambios de estado se descartan después.

Si Echidna puede llamar a todas las funciones, no encontrará fácilmente transacciones con un alto costo de gas:

```sh
echidna pushpop.sol --test-mode optimization
...
echidna_opt_gas_check: max value: 265706
...
```

Eso es porque el costo depende del tamaño de `addrs` y las llamadas aleatorias tienden a dejar la matriz casi vacía.
Sin embargo, poner en la lista negra `pop` y `clear` nos da resultados mucho mejores:

```yaml
testMode: optimization
filterBlacklist: true
filterFunctions: ["C.pop()", "C.clear()"]
```

```sh
echidna pushpop.sol --config config.yaml
...
echidna_opt_gas_check: max value: 2446228
...
```

Reducir la secuencia de llamadas para este resultado lleva varios minutos, porque cada repetición llama a la costosa función `check`.

### Resumen: Encontrar transacciones con alto consumo de gas {#summary-finding-transactions-with-high-gas-consumption}

Echidna puede encontrar transacciones con alto consumo de gas midiendo el gas con `gasleft()` en una función `echidna_` que devuelve un `int256`, y ejecutándose en modo de optimización:

```yaml
testMode: optimization
```

```sh
echidna contract.sol --config config.yaml
...
```

Echidna informará el valor máximo encontrado y la secuencia de transacciones que lo produjo, una vez que termine la campaña de fuzzing.
