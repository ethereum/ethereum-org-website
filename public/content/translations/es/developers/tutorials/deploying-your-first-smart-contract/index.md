---
title: "Implementación de su primer contrato inteligente"
description: "Una introducción a la implementación de su primer contrato inteligente en una red de prueba de Ethereum"
author: "jdourlens"
tags:
  [
    "contratos Inteligentes",
    "remix",
    "Solidity",
    "implementación"
  ]
skill: beginner
lang: es
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Supongo que está tan emocionado como nosotros por [implementar](/developers/docs/smart-contracts/deploying/) e interactuar con su primer [contrato inteligente](/developers/docs/smart-contracts/) en la cadena de bloques de Ethereum.

No se preocupe, como es nuestro primer contrato inteligente, lo implementaremos en una [red de prueba local](/developers/docs/networks/) para que no le cueste nada implementarlo y jugar con él todo lo que quiera.

## Escribir nuestro contrato {#writing-our-contract}

El primer paso es [visitar Remix](https://remix.ethereum.org/) y crear un archivo nuevo. En la parte superior izquierda de la interfaz de Remix, agregue un archivo nuevo e introduzca el nombre de archivo que desee.

![Agregando un archivo nuevo en la interfaz de Remix](./remix.png)

En el nuevo archivo, pegaremos el siguiente código.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Variable pública de tipo entero sin signo para mantener el número de cuentas
    uint256 public count = 0;

    // Función que incrementa nuestro contador
    function increment() public {
        count += 1;
    }

    // Getter no necesario para obtener el valor del contador
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Si está acostumbrado a programar, puede adivinar fácilmente lo que hace este programa. Aquí tiene una explicación línea por línea:

- Línea 4: Definimos un contrato con el nombre `Counter`.
- Línea 7: Nuestro contrato almacena un entero sin signo llamado `count` que empieza en 0.
- Línea 10: La primera función modificará el estado del contrato e incrementará nuestra variable `count`.
- Línea 15: La segunda función es solo un getter para poder leer el valor de la variable `count` fuera del contrato inteligente. Tenga en cuenta que, como definimos nuestra variable `count` como pública, esto no es necesario, pero se muestra como ejemplo.

Esto es todo para nuestro primer contrato inteligente simple. Como sabrá, se parece a una clase de lenguajes de POO (programación orientada a objetos) como Java o C++. Ahora es el momento de jugar con nuestro contrato.

## Implementación de nuestro contrato {#deploying-our-contract}

Ahora que hemos escrito nuestro primer contrato inteligente, lo implementaremos en la cadena de bloques para poder jugar con él.

[Implementar el contrato inteligente en la cadena de bloques](/developers/docs/smart-contracts/deploying/) es en realidad solo enviar una transacción que contiene el código del contrato inteligente compilado sin especificar ningún destinatario.

Primero [compilaremos el contrato](/developers/docs/smart-contracts/compiling/) haciendo clic en el icono de compilación del lado izquierdo:

![El icono de compilación en la barra de herramientas de Remix](./remix-compile-button.png)

Luego, haga clic en el botón de compilar:

![El botón de compilar en el compilador de Solidity de Remix](./remix-compile.png)

Puede elegir la opción «Compilación automática» para que el contrato se compile siempre que guarde el contenido en el editor de texto.

Luego, vaya a la pantalla «Implementar y ejecutar transacciones»:

![El icono de implementación en la barra de herramientas de Remix](./remix-deploy.png)

Una vez que esté en la pantalla «Implementar y ejecutar transacciones», verifique que aparezca el nombre de su contrato y haga clic en Implementar. Como puede ver en la parte superior de la página, el entorno actual es «JavaScript VM», lo que significa que implementaremos e interactuaremos con nuestro contrato inteligente en una cadena de bloques de prueba local para poder probar más rápido y sin coste alguno.

![El botón de implementar en el compilador de Solidity de Remix](./remix-deploy-button.png)

Una vez que haya hecho clic en el botón «Implementar», verá que su contrato aparece en la parte inferior. Haga clic en la flecha de la izquierda para expandirlo y así veremos el contenido de nuestro contrato. Esta es nuestra variable `count`, nuestra función `increment()` y el getter `getCounter()`.

Si hace clic en el botón `count` o `getCount`, recuperará el contenido de la variable `count` del contrato y lo mostrará. Como todavía no hemos llamado a la función `increment`, debería mostrar 0.

![El botón de función en el compilador de Solidity de Remix](./remix-function-button.png)

Ahora llamemos a la función `increment` haciendo clic en el botón. Verá los registros de las transacciones que se realizan aparecer en la parte inferior de la ventana. Verá que los registros son diferentes cuando pulsa el botón para recuperar los datos en lugar del botón `increment`. Esto se debe a que la lectura de datos en la cadena de bloques no necesita ninguna transacción (escritura) ni tarifa. Porque solo la modificación del estado de la cadena de bloques requiere realizar una transacción:

![Un registro de transacciones](./transaction-log.png)

Después de pulsar el botón de incremento, que generará una transacción para llamar a nuestra función `increment()`, si volvemos a hacer clic en los botones `count` o `getCount`, leeremos el estado recién actualizado de nuestro contrato inteligente con la variable `count` siendo mayor que 0.

![Estado recién actualizado del contrato inteligente](./updated-state.png)

En el siguiente tutorial, cubriremos [cómo puede añadir eventos a sus contratos inteligentes](/developers/tutorials/logging-events-smart-contracts/). El registro de eventos es una forma conveniente de depurar su contrato inteligente y entender qué está sucediendo mientras se llama a una función.
