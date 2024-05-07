---
title: Implementación de su primer contrato inteligente
description: Una introducción para ejecutar su primer contrato inteligente en la red de prueba de Ethereum
author: "jdourlens"
tags:
  - "contratos inteligentes"
  - "remezcla"
  - "solidity"
  - "implementación"
skill: beginner
lang: es
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Supongo que está tan emocionado como nosotros de [implementar](/developers/docs/smart-contracts/deploying/) e interactuar con su primer [contrato inteligente](/developers/docs/smart-contracts/) en la cadena de bloques de Ethereum.

No se preocupe; como es nuestro primer contrato inteligente, lo implementaremos en una [red de prueba local](/developers/docs/networks/), de modo que no cueste nada publicarlo y pueda experimentar tanto cuanto quiera.

## Escribir nuestro contrato {#writing-our-contract}

El primer paso es [visitar Remix](https://remix.ethereum.org/) y crear un nuevo archivo. En la parte superior izquierda de la interfaz de Remix, añada un nuevo archivo e introduzca el nombre de archivo que quiera.

![Añadir un nuevo archivo en la interfaz de Remix](./remix.png)

En el nuevo archivo, vamos a pegar el siguiente código:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Public variable of type unsigned int to keep the number of counts
    uint256 public count = 0;

    // Function that increments our counter
    function increment() public {
        count += 1;
    }

    // Not necessary getter to get the count value
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Si está acostumbrado a programar, puede adivinar fácilmente lo que hace este programa. Aquí hay una explicación línea por línea:

- Línea 4: Definimos un contrato con el nombre `Counter`.
- Línea 7: Nuestro contrato almacena un entero sin firma llamado `count` que empieza con 0.
- Línea 10: La primera función modificará el estado del contrato e incrementará (`increment()`) nuestra variable `count`.
- Línea 15: La segunda función es solo un getter para poder leer el valor de nuestra variable `count` fuera de nuestro contrato inteligente. Nótese que, como definimos la variable `count` como pública, esto no es necesario, sino que se muestra como ejemplo.

Esto es todo para nuestro primer y simple contrato inteligente. Como es sabido, parece una clase de lenguajes OOP (programación orientada a objetos) como Java o C++. Ahora es momento de experimentar con nuestro contrato.

## Implementación del contrato {#deploying-our-contract}

Como escribimos nuestro primer contrato inteligente, vamos a implementarlo en la cadena de bloques para poder experimentar con él.

[Implementar nuestro contrato inteligente en la cadena de bloques](/developers/docs/smart-contracts/deploying/) consiste simplemente en enviar una transacción que incluya el código del contrato inteligente compilado sin especificar ningún destinatario.

Primero [compilaremos el contrato](/developers/docs/smart-contracts/compiling/) haciendo clic en el ícono Compile situado en la parte izquierda:

![El ícono Compile en la barra de herramientas de Remix](./remix-compile-button.png)

Luego haga clic en el botón Compile:

![El botón Compile en el compilador de solidity de Remix](./remix-compile.png)

Puede optar por seleccionar la opción "Auto Compile" para que el contrato siempre se compile cuando guarde el contenido en el editor de texto.

Luego, navegue a la pantalla de implementación y ejecución de transacciones:

![El ícono Implementar en la barra de herramientas de Remix](./remix-deploy.png)

Una vez que esté en la pantalla de "Deploy and run", compruebe que el nombre del contrato aparezca y haga clic en Deploy. Como puede ver en la parte superior de la página, el entorno actual es "JavaScript VM", lo que significa que desplegaremos e interactuaremos con nuestro contrato inteligente en una cadena de bloques de prueba local para poder probar más rápido y sin ningún costo.

![El botón Deploy en el compilador de solidity de Remix](./remix-deploy-button.png)

Una vez que haya pulsado el botón “Deploy”, verá que su contrato aparece en la parte inferior. Haga clic en la flecha de la izquierda para expandir y ver el contenido de nuestro contrato. Esta es nuestra variable `counter`, nuestra función `increment()` y el getter `getCounter()`.

Si hace clic en el botón `count` o `getCount`, se recuperará el contenido de la variable `count` del contrato y se mostrará. Como aún no hemos invocado la función `increment`, debería mostrarse 0.

![El botón Function en el compilador de solidity de Remix](./remix-function-button.png)

Llamemos ahora a la función `increment` haciendo clic en el botón. Verá los registros de las transacciones que se realizan, en la parte inferior de la ventana. Verá que los registros son diferentes cuando pulsa el botón para recuperar los datos en lugar del botón `increment`. Es porque leer datos en la cadena de bloques no necesita ninguna transacción (escritura) o tarifa. Porque solo modificar el estado de la cadena de bloques requiere hacer una transacción:

![Un registro de transacciones](./transaction-log.png)

Después de presionar el botón de incremento que generará una transacción para llamar a nuestra función `increment()`, si volvemos a hacer clic en los botones de conteo o getCount, leeremos el estado recién actualizado de nuestro contrato inteligente con la variable de conteo siendo mayor que 0.

![Nuevo estado actualizado del contrato inteligente](./updated-state.png)

En el siguiente tutorial, veremos [cómo puede añadir eventos a sus contratos inteligentes](/developers/tutorials/logging-events-smart-contracts/). El registro de eventos es una forma conveniente de depurar su contrato inteligente y entender lo que sucede al llamar a una función.
