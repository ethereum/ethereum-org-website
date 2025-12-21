---
title: "Cómo usar Manticore para encontrar errores en contratos inteligentes"
description: "Cómo usar Manticore para encontrar automáticamente errores en contratos inteligentes"
author: Trailofbits
lang: es
tags:
  [
    "Solidity",
    "contratos Inteligentes",
    "seguridades",
    "pruebas",
    "verificación formal"
  ]
skill: advanced
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

El objetivo de este tutorial es mostrar cómo se usa Manticore para encontrar errores automáticamente en los contratos inteligentes.

## Instalación {#installation}

Manticore requiere >= python 3.6. Se puede instalar a través de pip o usando Docker.

### Manticore a través de Docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_El comando anterior ejecuta eth-security-toolbox en un Docker que tiene acceso a su directorio actual. Puede cambiar los archivos desde su host y ejecutar las herramientas en los archivos desde el Docker_

Dentro de Docker, ejecute:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Manticore a través de pip {#manticore-through-pip}

```bash
pip3 install --user manticore
```

Se recomienda solc 0.5.11.

### Ejecutar un script {#running-a-script}

Para ejecutar un script de Python con Python 3:

```bash
python3 script.py
```

## Introducción a la ejecución simbólica dinámica {#introduction-to-dynamic-symbolic-execution}

### Ejecución simbólica dinámica en pocas palabras {#dynamic-symbolic-execution-in-a-nutshell}

La ejecución simbólica dinámica (DSE) es una técnica de análisis de programas que explora un espacio de estados con un alto grado de conciencia semántica. Esta técnica se basa en el descubrimiento de «rutas del programa», representadas como fórmulas matemáticas llamadas `path predicates`. Conceptualmente, esta técnica opera en predicados de ruta en dos pasos:

1. Se construyen usando restricciones en la entrada del programa.
2. Se usan para generar entradas de programa que harán que se ejecuten las rutas asociadas.

Este enfoque no produce falsos positivos, en el sentido de que todos los estados del programa identificados pueden activarse durante la ejecución concreta. Por ejemplo, si el análisis encuentra un desbordamiento de enteros, se garantiza que es reproducible.

### Ejemplo de predicado de ruta {#path-predicate-example}

Para hacerse una idea de cómo funciona la DSE, considere el siguiente ejemplo:

```solidity
function f(uint a){

  if (a == 65) {
      // Hay un error
  }

}
```

Como `f()` contiene dos rutas, una DSE construirá dos predicados de ruta diferentes:

- Ruta 1: `a == 65`
- Ruta 2: `Not (a == 65)`

Cada predicado de ruta es una fórmula matemática que puede darse a un llamado [resolutor SMT](https://wikipedia.org/wiki/Satisfiability_modulo_theories), que intentará resolver la ecuación. Para la `Ruta 1`, el resolutor dirá que la ruta se puede explorar con `a = 65`. Para la `Ruta 2`, el resolutor puede dar a `a` cualquier valor que no sea 65, por ejemplo, `a = 0`.

### Verificación de propiedades {#verifying-properties}

Manticore permite un control total sobre toda la ejecución de cada ruta. Como resultado, le permite añadir restricciones arbitrarias a casi cualquier cosa. Este control permite la creación de propiedades en el contrato.

Considere el siguiente ejemplo:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // sin protección contra desbordamientos
  return c;
}
```

Aquí solo hay una ruta para explorar en la función:

- Ruta 1: `c = a + b`

Con Manticore, puede comprobar si hay desbordamiento y añadir restricciones al predicado de ruta:

- `c = a + b AND (c < a OR c < b)`

Si es posible encontrar una valoración de `a` y `b` para la cual el predicado de ruta anterior sea factible, significa que ha encontrado un desbordamiento. Por ejemplo, el resolutor puede generar la entrada `a = 10, b = MAXUINT256`.

Si considera una versión corregida:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

La fórmula asociada con la comprobación de desbordamiento sería:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

Esta fórmula no puede resolverse; en otras palabras, es una **prueba** de que en `safe_add`, `c` siempre aumentará.

Por lo tanto, la DSE es una potente herramienta que puede verificar restricciones arbitrarias en su código.

## Ejecución en Manticore {#running-under-manticore}

Veremos cómo explorar un contrato inteligente con la API de Manticore. El objetivo es el siguiente contrato inteligente [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;

contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Ejecutar una exploración independiente {#run-a-standalone-exploration}

Puede ejecutar Manticore directamente en el contrato inteligente con el siguiente comando (`project` puede ser un archivo de Solidity o un directorio de proyecto):

```bash
$ manticore project
```

Obtendrá una salida de casos de prueba como esta (el orden puede cambiar):

```
...
... m.c.manticore:INFO: Generated testcase No. 0 - STOP
... m.c.manticore:INFO: Generated testcase No. 1 - REVERT
... m.c.manticore:INFO: Generated testcase No. 2 - RETURN
... m.c.manticore:INFO: Generated testcase No. 3 - REVERT
... m.c.manticore:INFO: Generated testcase No. 4 - STOP
... m.c.manticore:INFO: Generated testcase No. 5 - REVERT
... m.c.manticore:INFO: Generated testcase No. 6 - REVERT
... m.c.manticore:INFO: Results in /home/ethsec/workshops/Automated Smart Contracts Audit - TruffleCon 2018/manticore/examples/mcore_t6vi6ij3
...
```

Sin información adicional, Manticore explorará el contrato con nuevas transacciones simbólicas
hasta que ya no explore nuevas rutas en el contrato. Manticore no ejecuta nuevas transacciones después de una que falle (p. ej., después de una reversión).

Manticore enviará la información a un directorio `mcore_*`. Entre otras cosas, encontrará en este directorio:

- `global.summary`: cobertura y advertencias del compilador
- `test_XXXXX.summary`: cobertura, última instrucción, saldos de cuenta por caso de prueba
- `test_XXXXX.tx`: lista detallada de transacciones por caso de prueba

Aquí Manticore encuentra 7 casos de prueba, que corresponden a (el orden de los nombres de archivo puede cambiar):

|                                                           |     Transacción 0     |        Transacción 1       | Transacción 2              | Resultado |
| :-------------------------------------------------------: | :-------------------: | :------------------------: | -------------------------- | :-------: |
| **test_00000000.tx** | Creación del contrato | f(!=65) | f(!=65) |  DETENER  |
| **test_00000001.tx** | Creación del contrato |      función fallback      |                            |   REVERT  |
| **test_00000002.tx** | Creación del contrato |                            |                            |   RETURN  |
| **test_00000003.tx** | Creación del contrato |  f(65)  |                            |   REVERT  |
| **test_00000004.tx** | Creación del contrato | f(!=65) |                            |  DETENER  |
| **test_00000005.tx** | Creación del contrato | f(!=65) | f(65)   |   REVERT  |
| **test_00000006.tx** | Creación del contrato | f(!=65) | función fallback           |   REVERT  |

_Resumen de exploración: f(!=65) denota que se llamó a f con cualquier valor distinto de 65._

Como puede observar, Manticore genera un caso de prueba único para cada transacción exitosa o revertida.

Use el indicador `--quick-mode` si desea una exploración rápida del código (desactiva los detectores de errores, el cómputo de gas, etc.).

### Manipular un contrato inteligente a través de la API {#manipulate-a-smart-contract-through-the-api}

Esta sección describe los detalles para manipular un contrato inteligente a través de la API de Python de Manticore. Puede crear un nuevo archivo con la extensión de Python `*.py` y escribir el código necesario agregando los comandos de la API (cuyos fundamentos se describirán a continuación) en este archivo y luego ejecutarlo con el comando `$ python3 *.py`. También puede ejecutar los comandos siguientes directamente en la consola de Python; para ejecutar la consola, use el comando `$ python3`.

### Creación de cuentas {#creating-accounts}

Lo primero que debe hacer es iniciar una nueva cadena de bloques con los siguientes comandos:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Se crea una cuenta que no es de contrato mediante [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

```python
user_account = m.create_account(balance=1000)
```

Se puede desplegar un contrato de Solidity mediante [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract):

```solidity
source_code = '''
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
'''
# Iniciar el contrato
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### Resumen {#summary}

- Puede crear cuentas de usuario y de contrato con [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) y [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### Ejecución de transacciones {#executing-transactions}

Manticore admite dos tipos de transacción:

- Transacción sin procesar: se exploran todas las funciones
- Transacción con nombre: solo se explora una función

#### Transacción sin procesar {#raw-transaction}

Una transacción sin formato se ejecuta usando [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction):

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

El llamador, la dirección, los datos o el valor de la transacción pueden ser concretos o simbólicos:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) crea un valor simbólico.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) crea una matriz de bytes simbólica.

Por ejemplo:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

Si los datos son simbólicos, Manticore explorará todas las funciones del contrato durante la ejecución de la transacción. Será útil ver la explicación de la función fallback en el artículo [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) para comprender cómo funciona la selección de funciones.

#### Transacción con nombre {#named-transaction}

Las funciones pueden ejecutarse a través de su nombre.
Para ejecutar `f(uint var)` con un valor simbólico, desde `user_account` y con 0 ether, use:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Si el `valor` de la transacción no se especifica, es 0 por defecto.

#### Resumen {#summary-1}

- Los argumentos de una transacción pueden ser concretos o simbólicos
- Una transacción sin formato explorará todas las funciones
- La función puede ser llamada por su nombre

### Espacio de trabajo {#workspace}

`m.workspace` es el directorio utilizado como directorio de salida para todos los archivos generados:

```python
print("Results are in {}".format(m.workspace))
```

### Finalizar la exploración {#terminate-the-exploration}

Para detener la exploración, use [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). No se deben enviar más transacciones cuando se llama a este método, y Manticore genera casos de prueba para cada una de las rutas exploradas.

### Resumen: Ejecución en Manticore {#summary-running-under-manticore}

Reuniendo los pasos previos, obtenemos:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("Results are in {}".format(m.workspace))
m.finalize() # detener la exploración
```

Puede encontrar todo el código anterior en [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Obtención de las rutas que fallan {#getting-throwing-paths}

Ahora generaremos entradas específicas para las rutas que generan una excepción en `f()`. El objetivo es el siguiente contrato inteligente [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Uso de la información de estado {#using-state-information}

Cada ruta ejecutada tiene su estado de la cadena de bloques. Un estado está listo o está terminado, lo que significa que llega a una instrucción THROW o REVERT:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): la lista de estados que están listos (no ejecutaron una REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): la lista de estados que están terminados
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): todos los estados

```python
for state in m.all_states:
    # hacer algo con el estado
```

Puede acceder a la información de estado. Por ejemplo:

- `state.platform.get_balance(account.address)`: el saldo de la cuenta
- `state.platform.transactions`: la lista de transacciones
- `state.platform.transactions[-1].return_data`: los datos devueltos por la última transacción

Los datos devueltos por la última transacción son una matriz, que se puede convertir en un valor con `ABI.deserialize`, por ejemplo:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### Cómo generar un caso de prueba {#how-to-generate-testcase}

Use [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) para generar el caso de prueba:

```python
m.generate_testcase(state, 'BugFound')
```

### Resumen {#summary-2}

- Puede iterar sobre el estado con `m.all_states`
- `state.platform.get_balance(account.address)` devuelve el saldo de la cuenta
- `state.platform.transactions` devuelve la lista de transacciones
- `transaction.return_data` son los datos devueltos
- `m.generate_testcase(state, name)` genera entradas para el estado

### Resumen: Obtención de la ruta de lanzamiento {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Comprobar si una ejecución finaliza con REVERT o INVALID

for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Puede encontrar todo el código anterior en [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Tenga en cuenta que podríamos haber generado un script mucho más simple, ya que todos los estados devueltos por `terminated_states` tienen REVERT o INVALID en su resultado: este ejemplo solo tenía la intención de demostrar cómo manipular la API._

## Adición de restricciones {#adding-constraints}

Veremos cómo restringir la exploración. Asumiremos que la
documentación de `f()` establece que la función nunca se llama con `a == 65`, por lo que cualquier error con `a == 65` no es un error real. El objetivo es el siguiente contrato inteligente [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Operadores {#operators}

El módulo [Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) facilita la manipulación de restricciones; entre otros, proporciona:

- Operators.AND,
- Operators.OR,
- Operators.UGT (mayor que sin signo),
- Operators.UGE (mayor o igual que sin signo),
- Operators.ULT (menor que sin signo),
- Operators.ULE (menor o igual que sin signo).

Para importar el módulo, use lo siguiente:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` se usa para concatenar una matriz a un valor. Por ejemplo, el `return_data` de una transacción necesita cambiarse a un valor para ser comprobado contra otro valor:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Restricciones {#state-constraint}

Puede usar restricciones globalmente o para un estado específico.

#### Restricción global {#state-constraint}

Use `m.constrain(constraint)` para agregar una restricción global.
Por ejemplo, puede llamar a un contrato desde una dirección simbólica y restringir esta dirección a valores específicos:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Restricción de estado {#state-constraint}

Use [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) para añadir una restricción a un estado específico.
Se puede usar para restringir el estado después de su exploración para comprobar alguna propiedad en él.

### Comprobación de restricciones {#checking-constraint}

Use `solver.check(state.constraints)` para saber si una restricción sigue siendo factible.
Por ejemplo, lo siguiente restringirá `symbolic_value` para que sea diferente de 65 y comprobará si el estado sigue siendo factible:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # el estado es factible
```

### Resumen: Adición de restricciones {#summary-adding-constraints}

Al añadir una restricción al código anterior, se obtiene:

```python
from manticore.ethereum import ManticoreEVM
from manticore.core.smtlib.solver import Z3Solver

solver = Z3Solver.instance()

m = ManticoreEVM()

with open("example.sol") as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

no_bug_found = True

## Comprobar si una ejecución finaliza con REVERT o INVALID

for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # no consideramos la ruta donde a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Error encontrado, los resultados están en {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No se encontró ningún error')
```

Puede encontrar todo el código anterior en [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)
