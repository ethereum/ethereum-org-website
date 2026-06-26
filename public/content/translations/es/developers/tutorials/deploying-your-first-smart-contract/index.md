---
title: Desplegando tu primer contrato inteligente
description: "Una introducción al despliegue de tu primer contrato inteligente en una red de pruebas de Ethereum"
author: "jdourlens"
tags: ["contratos inteligentes", "Remix", "Solidity", "despliegue"]
skill: beginner
breadcrumb: Desplegar primer contrato
lang: es
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Supongo que estás tan emocionado como nosotros por [desplegar](/developers/docs/smart-contracts/deploying/) e interactuar con tu primer [contrato inteligente](/developers/docs/smart-contracts/) en la cadena de bloques de Ethereum.

No te preocupes, como es nuestro primer contrato inteligente, lo desplegaremos en una [red de pruebas local](/developers/docs/networks/) para que no te cueste nada desplegarlo y jugar con él todo lo que quieras.

## Escribiendo nuestro contrato {#writing-our-contract}

El primer paso es [visitar Remix](https://remix.ethereum.org/) y crear un nuevo archivo. En la parte superior izquierda de la interfaz de Remix, añade un nuevo archivo e introduce el nombre de archivo que desees.

![Adding a new file in the Remix interface](./remix.png)

En el nuevo archivo, pegaremos el siguiente código.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Variable pública de tipo entero sin signo para mantener el número de conteos
    uint256 public count = 0;

    // Función que incrementa nuestro contador
    function increment() public {
        count += 1;
    }

    // Getter innecesario para obtener el valor del conteo
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Si estás acostumbrado a programar, puedes adivinar fácilmente lo que hace este programa. Aquí tienes una explicación línea por línea:

- Línea 4: Definimos un contrato con el nombre `Counter`.
- Línea 7: Nuestro contrato almacena un número entero sin signo llamado `count` que empieza en 0.
- Línea 10: La primera función modificará el estado del contrato y aplicará `increment()` a nuestra variable `count`.
- Línea 15: La segunda función es solo un captador (getter) para poder leer el valor de la variable `count` fuera del contrato inteligente. Ten en cuenta que, como definimos nuestra variable `count` como pública, esto no es necesario, pero se muestra como ejemplo.

Esto es todo para nuestro primer contrato inteligente simple. Como sabrás, se parece a una clase de lenguajes de POO (Programación Orientada a Objetos) como Java o C++. Ahora es el momento de jugar con nuestro contrato.

## Desplegando nuestro contrato {#deploying-our-contract}

Como ya escribimos nuestro primer contrato inteligente, ahora lo desplegaremos en la cadena de bloques para poder jugar con él.

[Desplegar el contrato inteligente en la cadena de bloques](/developers/docs/smart-contracts/deploying/) es en realidad solo enviar una transacción que contiene el código del contrato inteligente compilado sin especificar ningún destinatario.

Primero [compilaremos el contrato](/developers/docs/smart-contracts/compiling/) haciendo clic en el icono de compilar en el lado izquierdo:

![The compile icon in the Remix toolbar](./remix-compile-button.png)

Luego haz clic en el botón de compilar:

![The compile button in the Remix solidity compiler](./remix-compile.png)

Puedes elegir seleccionar la opción «Auto compile» (Autocompilar) para que el contrato siempre se compile cuando guardes el contenido en el editor de texto.

Luego navega a la pantalla «deploy and run transactions» (desplegar y ejecutar transacciones):

![The deploy icon in the Remix toolbar](./remix-deploy.png)

Una vez que estés en la pantalla «deploy and run transactions», verifica que aparezca el nombre de tu contrato y haz clic en «Deploy» (Desplegar). Como puedes ver en la parte superior de la página, el entorno actual es «JavaScript VM», lo que significa que desplegaremos e interactuaremos con nuestro contrato inteligente en una cadena de bloques de pruebas local para poder probar más rápido y sin comisiones.

![The deploy button in the Remix solidity compiler](./remix-deploy-button.png)

Una vez que hayas hecho clic en el botón «Deploy», verás que tu contrato aparece en la parte inferior. Haz clic en la flecha de la izquierda para expandirlo y así veremos el contenido de nuestro contrato. Esta es nuestra variable `counter`, nuestra función `increment()` y el captador `getCounter()`.

Si haces clic en el botón `count` o `getCount`, en realidad recuperará el contenido de la variable `count` del contrato y lo mostrará. Como aún no hemos llamado a la función `increment`, debería mostrar 0.

![The function button in the Remix solidity compiler](./remix-function-button.png)

Llamemos ahora a la función `increment` haciendo clic en el botón. Verás que los registros de las transacciones que se realizan aparecen en la parte inferior de la ventana. Verás que los registros son diferentes cuando presionas el botón para recuperar los datos en lugar del botón `increment`. Esto se debe a que leer datos en la cadena de bloques no necesita ninguna transacción (escritura) ni comisiones. Porque solo modificar el estado de la cadena de bloques requiere hacer una transacción:

![A log of transactions](./transaction-log.png)

Después de presionar el botón de incremento que generará una transacción para llamar a nuestra función `increment()`, si volvemos a hacer clic en los botones count o getCount, leeremos el estado recién actualizado de nuestro contrato inteligente con la variable count siendo mayor que 0.

![Newly updated state of the smart contract](./updated-state.png)

En el próximo tutorial, cubriremos [cómo puedes añadir eventos a tus contratos inteligentes](/developers/tutorials/logging-events-smart-contracts/). Registrar eventos es una forma conveniente de depurar tu contrato inteligente y entender qué está sucediendo mientras llamas a una función.