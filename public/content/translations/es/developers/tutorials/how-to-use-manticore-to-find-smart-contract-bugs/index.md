---
title: Cómo usar Manticore para encontrar errores en contratos inteligentes
description: Cómo usar Manticore para encontrar automáticamente errores en contratos inteligentes
author: Trailofbits
lang: es
tags:
  - "solidity"
  - "contratos inteligentes"
  - "seguridad"
  - "pruebas"
  - "verificación formal"
skill: advanced
published: 2020-01-13
source: Desarrollar contratos seguros
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

El objetivo de este tutorial es mostrar cómo se usa Manticore para encontrar errores automáticamente en los contratos inteligentes.

## Instalación {#installation}

Manticore requiere >= python 3.6. Se puede instalar a través de pip o usando docker.

### Manticore a través de docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_El comando de arriba ejecuta eth-security-toolbox en un docker que tiene acceso a su directorio actual. Puede cambiar los archivos desde su host y correr las herramientas dentro de los archivos desde el docker._

Dentro del docker, ejecute:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Manticore a través de pip {#manticore-through-pip}

```bash
pip3 install --user manticore
```

Se recomienda solc 0.5.11.

### Ejecución de un script {#running-a-script}

Para ejecutar un script de python con python 3:

```bash
python3 script.py
```

## Introducción a la ejecución simbólica dinámica {#introduction-to-dynamic-symbolic-execution}

### Descripción breve de la ejecución simbólica dinámica {#dynamic-symbolic-execution-in-a-nutshell}

La ejecución simbólica dinámica (DSE) es una técnica de análisis de programas que explora un espacio de estados con un alto grado de conciencia semántica. Esta técnica se basa en el descubrimiento de "rutas del programa" representadas con fórmulas matemáticas denominadas `path predicates`. Conceptualmente, esta técnica opera en predicados de ruta en dos pasos:

1. Contruyéndolos con restricciones sobre la entrada del programa.
2. Usándolos para generar entradas del programa para ejecutar las rutas asociadas.

Este enfoque previene falsos positivos porque todos los estados de programa identificados se pueden activar durante la ejecución concreta. Por ejemplo, si el análisis encuentra un desbordamiento de enteros, se garantiza que sea reproducible.

### Ejemplo de predicado de ruta {#path-predicate-example}

Para conocer el funcionamiento de la DSE, considere el siguiente ejemplo:

```solidity
function f(uint a){

  if (a == 65) {
      // A bug is present
  }

}
```

Como `f()` contiene dos rutas, una DSE construirá dos predicados de ruta diferentes:

- Ruta 1: `a == 65`
- Ruta 2: `Not (a == 65)`

Cada predicado de ruta es una fórmula matemática que puede ser dada a un [resolutor de SMT](https://wikipedia.org/wiki/Satisfiability_modulo_theories), que intentará resolver la ecuación. En `Path 1`, el resolutor dirá que la ruta puede ser explorada con `a = 65`. En `Path 2`, el resolutor puede dar a `a` cualquier valor distinto de 65, por ejemplo, `a = 0`.

### Verificación de propiedades {#verifying-properties}

Manticore permite control pleno sobre toda la ejecución de cada ruta. Como resultado, permite añadir restricciones arbitrarias a casi cualquier cosa. Este control permite la creación de propiedades en el contrato.

Considere el siguiente ejemplo:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // no overflow protection
  return c;
}
```

Aquí solo hay un camino para explorar en la función:

- Ruta 1: `c = a + b`

Usando Manticore se puede comprobar si hay desbordamiento y añadir restricciones al predicado de ruta:

- `c = a + b AND (c < a OR c < b)`

Si es posible encontrar un valor de `a` y `b` donde el predicado de ruta de arriba sea factible, significa que se ha encontrado un desbordamiento. Por ejemplo, el solucionador puede generar la entrada `a = 10 , b = MAXUINT256`.

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

Esta fórmula no se puede resolver; en otro estadio esto es una **prueba** de que en `safe_add`, `c` siempre aumentará.

DSE es por consiguiente una potente herramienta que puede verificar restricciones arbitrarias en el código.

## Ejecutar con Manticore {#running-under-manticore}

Veamos cómo explorar un contrato inteligente con la API de Manticore. El objetivo es el siguiente contrato inteligente [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

Puede ejecutar Manticore directamente en el contrato inteligente con el siguiente comando (`project` puede ser un Solidity File o un directorio de proyecto):

```bash
$ manticore project
```

Obtendrá la salida o resultado de casos de prueba como este (el orden puede cambiar):

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

Sin información adicional, Manticore explorará el contrato con nuevas transacciones simbólicas hasta que no explore nuevas rutas en el contrato. Manticore no ejecuta nuevas transacciones después de una fallida (por ejemplo: después de una reversión).

Manticore mostrará la información en un directorio `mcore_*`. Entre otras cosas, encontrará en este directorio:

- `global.summary`: cobertura y advertencias del compilador
- `test_XXXX.summary`: cobertura, última instrucción, saldos de cuenta por caso de prueba
- `test_XXXX.tx`: lista detallada de transacciones por caso de prueba

Aquí Manticore encontró 7 casos de prueba que corresponden a (el orden de nombres de archivo puede cambiar):

|                      |    Transacción 0     |  Transacción 1   | Transacción 2    | Resultado |
|:--------------------:|:--------------------:|:----------------:| ---------------- |:---------:|
| **test_00000000.tx** | Creación de contrato |     f(!=65)      | f(!=65)          |  DETENER  |
| **test_00000001.tx** | Creación de contrato | función fallback |                  |  REVERT   |
| **test_00000002.tx** | Creación de contrato |                  |                  |  RETURN   |
| **test_00000003.tx** | Creación de contrato |      f(65)       |                  |  REVERT   |
| **test_00000004.tx** | Creación de contrato |     f(!=65)      |                  |  DETENER  |
| **test_00000005.tx** | Creación de contrato |     f(!=65)      | f(65)            |  REVERT   |
| **test_00000006.tx** | Creación de contrato |     f(!=65)      | función fallback |  REVERT   |

_Resumen de exploración f(!=65) muestra que f llamó con cualquier valor diferente a 65._

Como se ve, Manticore genera un caso de prueba único para cada transacción exitosa o revertida.

Use la marca `--quick-mode` si desea una exploración rápida de código (deshabilita los detectores de errores, el cálculo de gas, etc.).

### Manipular un contrato inteligente a través de la API {#manipulate-a-smart-contract-through-the-api}

Esta sección describe los detalles para manipular un contrato inteligente a través de la API de Python de Manticore. Puede crear un nuevo archivo con la extensión de python `*.py` y escribir el código necesario agregando los comandos de la API (los aspectos básicos se describen a continuación) en este archivo y luego ejecutarlo con el comando `$ python3 *.py`. También puede ejecutar los siguientes comandos directamente en la consola de python; para ejecutar la consola use el comando `$ python3`.

### Creación de cuentas {#creating-accounts}

Lo primero que debe hacer es iniciar una nueva cadena de bloques con los siguientes comandos:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Se crea una cuenta sin contrato con [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

```python
user_account = m.create_account(balance=1000)
```

Se puede implementar un contrato de Solidity usando [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract):

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
# Initiate the contract
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### Resumen {#summary}

- Puede crear cuentas de usuario y contratos con [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) y [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### Ejecución de transacciones {#executing-transactions}

Manticore admite dos tipos de transacción:

- Transacción en bruto (raw): se exploran todas las funciones
- Transacción con nombre: solo se explora una función

#### Transacción en bruto {#raw-transaction}

La transacción en bruto se ejecuta usando [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction):

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

El invocante, la dirección, los datos o el valor de la transacción pueden ser tanto concretos como simbólicos:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) crea un valor simbólico.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) crea un array de bytes simbólico.

Por ejemplo:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

Si los datos son simbólicos, Manticore explorará todas las funciones del contrato durante la ejecución de la transacción. Es útil ver la explicación de la función Fallback en el artículo [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) para entender cómo funciona la selección de funciones.

#### Transacción con nombre {#named-transaction}

Las funciones pueden ejecutarse a través de su nombre. Para ejecutar `f(uint var)` con un valor simbólico, de user_account y con 0 ether, use:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Si `value` de la transacción no se especifica, es 0 por defecto.

#### Resumen {#summary-1}

- Los argumentos de una transacción pueden ser concretos o simbólicos
- Una transacción en bruto explorará todas las funciones
- La función puede ser llamada por su nombre

### Workspace {#workspace}

`m.workspace` es el directorio usado como directorio de salida para todos los archivos generados:

```python
print("Results are in {}".format(m.workspace))
```

### Terminar la exploración {#terminate-the-exploration}

Para detener la exploración, use [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). No se deben enviar más transacciones cuando se llama a este método, y Manticore genera casos de prueba para cada una de las rutas exploradas.

### Resumen: ejecutar con Manticore {#summary-running-under-manticore}

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
m.finalize() # stop the exploration
```

Todo el código de arriba que encuentra en [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Obtener throwing paths {#getting-throwing-paths}

Ahora generaremos entradas específicas para las rutas que plantean una excepción en `f()`. El objetivo sigue siendo el contrato inteligente [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Uso de información de estado {#using-state-information}

Cada ruta ejecutada tiene un estado en la cadena de bloques. Un estado está listo o es aniquilado, lo que significa que alcanza una instrucción THROW o REVERT:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): la lista de estados que están listos (no ejecutaron un REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): lista de estados aniquilados
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): todos los estados

```python
for state in m.all_states:
    # do something with state
```

Puede acceder a la información de estado. Por ejemplo:

- `state.platform.get_balance(account.address)`: el saldo de la cuenta
- `state.platform.transactions`: la lista de transacciones
- `state.platform.transactions[-1].return_data`: los datos devueltos por la última transacción

Los datos devueltos por la última transacción son un array que puede convertirse en un valor con ABI.deserialize, por ejemplo:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### Cómo generar testcase {#how-to-generate-testcase}

Use [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) para generar el testcase:

```python
m.generate_testcase(state, 'BugFound')
```

### Resumen {#summary-2}

- Se puede iterar sobre el estado con m.all_state
- `state.platform.get_balance(account.address)` devuelve el saldo de la cuenta
- `state.platform.transactions` devuelve la lista de transacciones
- `transaction.return_data` corresponde a los datos devueltos
- `m.generate_testcase(state, name)` genera entradas para el estado

### Resumen: obtener Throwing Path {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Check if an execution ends with a REVERT or INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Todo el código anterior que puede encontrar en el [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Note que podríamos haber generado un script mucho más simple, ya que todos los estados devueltos por terminated_state tienen REVERT o INVALID en su resultado: este ejemplo solo estaba destinado a demostrar cómo manipular la API._

## Adición de restricciones {#adding-constraints}

Veremos cómo restringir la exploración. Supondremos que la documentación de `f()` indica que la función nunca es llamada con `a == 65`, así que cualquier error con `a == 65` no es un error real. El objetivo sigue siendo el contrato inteligente [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

El módulo sobre [Operadores](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) facilita la manipulación de restricciones y provee, entre otras cosas:

- Operators.AND,
- Operators.OR,
- Operators.UGT (sin firma mayores que),
- Operators.UGE (sin firma mayores que o iguales a),
- Operators.ULT (sin firma menores que),
- Operators.ULE (sin firma menores o iguales a).

Para importar el módulo, use:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` se usa para concatenar un array a un valor. Por ejemplo, el return_data de una transacción necesita cambiarse a un valor para ser comprobado contra otro valor:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Restricciones {#state-constraint}

Puede usar restricciones globalmente o para un estado específico.

#### Restricción global {#state-constraint}

Use `m.constran(constraint)` para agregar una restricción global. Por ejemplo, puede llamar a un contrato desde una dirección simbólica y restringir esta dirección para que sean valores específicos:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Restricción de estado {#state-constraint}

Use [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) para añadir una restricción a un estado específico. Se puede usar para restringir el estado después de su exploración para verificar alguna propiedad en él.

### Restricción de verificación {#checking-constraint}

Use `solver.check(state.restricints)` para saber si una restricción todavía es viable. Por ejemplo, esto restringirá symbolic_value para que sea diferente de 65 y comprobará si el estado es todavía viable:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # state is feasible
```

### Resumen: adición de restricciones {#summary-adding-constraints}

Al añadir restricción al código anterior, se obtiene:

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

## Check if an execution ends with a REVERT or INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # we do not consider the path were a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

Todo el código anterior que puede encontrar en el [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)
