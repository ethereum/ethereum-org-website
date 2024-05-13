---
title: Cómo usar Slither para encontrar errores en contratos inteligentes
description: Cómo usar Manticore para encontrar errores automáticamente en contratos inteligentes
author: Trailofbits
lang: es
tags:
  - "solidity"
  - "contratos inteligentes"
  - "seguridad"
  - "pruebas"
  - "análisis estático"
skill: advanced
published: 2020-06-09
source: Desarrollar contratos seguros
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Cómo usar Slither {#how-to-use-slither}

El objetivo de este tutorial es mostrar cómo usar Slither para encontrar errores de manera automática en los contratos inteligentes.

- [Instalación](#installation)
- [Uso de línea de comandos](#command-line)
- [Introducción al análisis estático](#static-analysis): breve introducción al análisis estático
- [API](#api-basics): descripción de la API de Python

## Instalación {#installation}

Slither usa Python >= 3.6. Puede ser instalado a traves de pip o usando docker.

Slither a través de pip:

```bash
pip3 install --user slither-analyzer
```

Slither a través de docker:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_El comando de arriba ejecuta eth-security-toolbox en un docker que tiene acceso a su directorio actual. Puede cambiar los archivos desde su host y correr las herramientas dentro de los archivos desde el docker._

Dentro del docker, ejecute:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Ejecución de un script {#running-a-script}

Para ejecutar un script de python con python 3:

```bash
python3 script.py
```

### Línea de comandos {#command-line}

**Línea de comandos vs. scripts definidos por el usuario.** Slither viene con un conjunto de detectores predefinidos que encuentran muchos errores comunes. Al llamar a Slither desde la línea de comandos, se ejecutarán todos los detectores sin necesidad de tener conocimientos detallados de análisis estático:

```bash
slither project_paths
```

Además de los detectores, Slither tiene capacidades de revisión de código por medio de [impresoras](https://github.com/crytic/slither#printers) y [herramientas](https://github.com/crytic/slither#tools).

Use [crytic.io](https://github.com/crytic) para acceder a los detectores privados y a la integración con GitHub.

## Análisis estático {#static-analysis}

Las capacidades y el diseño del framework de análisis estático de Slither han sido descritos en entradas de blog ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) y en un [documento académico](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

El análisis estático existe en distintas formas. Lo más probable es que se dé cuenta de que compiladores como [clang](https://clang-analyzer.llvm.org/) y [gcc](https://lwn.net/Articles/806099/) dependen de estas técnicas de investigación, pero también sustenta ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) y herramientas basadas en métodos formales como [Frama-C](https://frama-c.com/) y [Polyspace](https://www.mathworks.com/products/polyspace.html).

No vamos a repasar aquí en detalle las técnicas de análisis estático y el investigador. En cambio, nos centraremos en lo necesario para entender cómo funciona Slither y así poder utilizarlo de forma más eficaz para encontrar errores y entender el código.

- [Representación del código](#code-representation)
- [Análisis de código](#analysis)
- [Representación intermedia](#intermediate-representation)

### Representación del código {#code-representation}

A diferencia del análisis dinámico, que se basa en una única ruta de ejecución, el análisis estático se basa en todas las rutas a la vez. Para ello, se basa en una representación de código diferente. Los dos más comunes son el árbol de sintaxis abstracta (AST) y el gráfico de flujo de control (CFG).

### Árboles de sintaxis abstracta (AST) {#abstract-syntax-trees-ast}

Los AST se utilizan cada vez que el compilador analiza el código. Es probablemente la estructura más básica sobre la que se puede realizar un análisis estático.

En pocas palabras, un AST es un árbol estructurado en el que, normalmente, cada hoja contiene una variable o una constante, y los nodos internos son operadores u operaciones de flujo de control. Considere el siguiente código:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

El AST correspondiente se muestra en:

![AST](./ast.png)

Slither utiliza el AST exportado por solc.

Si bien es sencillo de construir, el AST es una estructura anidada. A veces, esto no es lo más sencillo de analizar. Por ejemplo, para identificar las operaciones usadas por la expresión `a + b <= a`, primero debe analizarla `<=` y luego `+`. Un enfoque común es utilizar el llamado patrón de visitantes, que navega por el árbol recursivamente. Slither contiene un visitante genérico en [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

El siguiente código utiliza `ExpressionVisitor` para detectar si la expresión contiene una adición:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression is the expression to be tested
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### Gráfico de flujo de control (CFG) {#control-flow-graph-cfg}

La segunda representación de código más común es el gráfico de flujo de control (CFG). Como su nombre indica, es una representación basada en un gráfico que expone todas las rutas de ejecución. Cada nodo contiene una o varias instrucciones. Los bordes en el gráfico representan las operaciones de flujo de control (if/then/else, loop, etc). El CFG de nuestro ejemplo anterior es:

![CFG](./cfg.png)

El CFG es la representación sobre la que se construye la mayoría de los análisis.

Existen muchas otras representaciones de código. Cada representación tiene ventajas y desventajas según el análisis que se quiera realizar.

### Análisis {#analysis}

El tipo de análisis más sencillo que se puede realizar con Slither es el análisis sintáctico.

### Análisis de sintaxis {#syntax-analysis}

Slither puede explorar los diferentes componentes del código y su representación para encontrar inconsistencias y defectos usando un enfoque del tipo coincidencia de patrones.

Por ejemplo, los siguientes detectores buscan problemas relacionados con la sintaxis:

- [Sombreado (shadowing) de variable de estado](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): itera sobre todas las variables de estado y verifica si hay sombra de una variable de un contrato heredado ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Interfaz ERC20 incorrecta](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): busca firmas de funciones ERC20 incorrectas ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Análisis semántico {#semantic-analysis}

En contraste con el análisis de sintaxis, un análisis semántico profundizará y analizará el “significado” del código. Esta familia incluye algunos amplios tipos de análisis. Conducen a resultados más potentes y útiles, pero también son más complejos de escribir.

Los análisis semánticos se usan para las detecciones de vulnerabilidad más avanzadas.

#### Análisis de dependencias de datos {#fixed-point-computation}

Se dice que una variable `variable_a` tiene una dependencia de datos de `variable_b` si hay una ruta para la cual el valor de `variable_a` está influenciado por `variable_b`.

En el siguiente código, `variable_a` depende de `variable_b`:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither viene con capacidades de [dependencia de datos](https://github.com/crytic/slither/wiki/data-dependency), gracias a su representación intermedia (se verá en una sección posterior).

Se puede encontrar un ejemplo de uso de dependencia de datos en [detector de equidad estricta peligrosa](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). Aquí Slither buscará una comparación estricta de equidad con un valor peligroso ([incorrec_strict_equality. y#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)) e informará al usuario que debe usar `>=` o `<=` en lugar de `==` para impedir que un atacante atrape el contrato. Entre otros, el detector considerará peligroso el valor de retorno de una llamada a `balanceOf(address)` ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)) y usará el motor de dependencias de datos para rastrear su uso.

#### Cómputo de punto fijo {#fixed-point-computation}

Si su análisis explora el CFG y sigue las aristas, o bordes, es probable que vea nodos ya visitados. Por ejemplo, si un bucle se presenta como se muestra a continuación:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

Su análisis necesitará saber cuándo detenerse. Hay dos estrategias principales aquí: (1) iterar en cada nodo un número finito de veces, (2) calcular un _punto de fijación_. Un punto fijo, o fixpoint, básicamente significa que el análisis de este nodo no proporciona ninguna información significativa.

Un ejemplo de punto fijo puede estar en los detectores de reentrada: Slither explora los nodos y busca llamadas externas, escribir y leer para almacenar. Una vez que haya alcanzado un punto fijo ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), detiene la exploración y analiza los resultados para ver si una reentrada está presente a través de diferentes patrones de reentrada ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

Escribir análisis utilizando un cálculo de punto fijo eficiente requiere una buena comprensión de cómo el análisis propaga su información.

### Representación intermedia {#intermediate-representation}

Una representación intermedia (IR) es un lenguaje que pretende ser más susceptible al análisis estático que el original. Slither traduce Solidity a su propio IR: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Entender SlithIR no es necesario si solo desea escribir comprobaciones básicas. Sin embargo, será útil si tiene pensado escribir análisis semánticos avanzados. Los resultados de [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) y [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) le ayudarán a entender cómo se traduce el código.

## Aspectos básicos de la API {#api-basics}

Slither tiene una API que le permite explorar los atributos básicos del contrato y sus funciones.

Para cargar una base de código:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Exploración de contratos y funciones {#exploring-contracts-and-functions}

Un objeto de `Slither` tiene:

- `contracts (list(Contract)`: lista de contratos
- `contracts_derived (list(Contract)`: lista de contratos que no son heredados por otro contrato (subconjunto de contratos)
- `get_contract_from_name (str)`: retorna un contrato a partir de su nombre

Un objeto `Contract` tiene:

- `name (str)`: nombre del contrato
- `functions (list(Function))`: lista de funciones
- `modifiers (list(Modifier))`: lista de funciones
- `all_functions_called (list(Function/Modifier))`: lista de todas las funciones internas accesibles para el contrato
- `inheritance (list(Contract))`: lista de los contratos heredados
- `get_function_from_signature (str)`: retorna una función desde su firma
- `get_modifier_from_signature (str)`: retorna un modificador desde su firma
- `get_state_variable_from_name (str)`: retorna una StateVariable desde su nombre

Una `Function` o un objeto `Modifier` tiene:

- `name (str)`: nombre de la función
- `contract (contract)`: el contrato donde se declara la función
- `nodes (list(Node))`: lista de los nodos que componen el CFG de la función/modificador
- `entry_point (Node)`: punto de entrada del CFG
- `variables_read (list(Variable))`: lista de variables a leer
- `variables_written (list(Variable))`: lista de variables escritas
- `state_variables_read (list(StateVariable))`: lista de variables de estado a leer (subconjunto de variables a leer)
- `state_variables_written (list(StateVariable))`: lista de variables de estado escritas (subconjunto de variables escritas)
