---
title: Probar el contrato inteligente de forma sencilla con la biblioteca Waffle
description: Tutorial para principiantes
author: Ewa Kowalska
tags:
  - "contratos inteligentes"
  - "solidity"
  - "Waffle"
  - "pruebas"
skill: beginner
lang: es
published: 2021-02-26
---

## En este tutorial aprenderá a: {#in-this-tutorial-youll-learn-how-to}

- Evalúa los cambios en el saldo de la billetera
- Probar la emisión de eventos con argumentos especificos.
- Verificar que una transacción se ha revertido.

## Supuestos {#assumptions}

- Puede crear un nuevo proyecto JavaScript o TypeScript.
- Tiene experiencia básica con las pruebas en JavaScript.
- Ha utilizado algunos gestores de paquetes como yarn o npm.
- Posee conocimientos muy básicos de contratos inteligentes y Solidity.

# Introducción {#getting-started}

Este tutorial explica una configuración de prueba y se ejecuta utilizando yarn, pero no pasa nada si prefiere hacerlo con npm, ya proporcionaré las indicaciones apropiadas a la documentación oficial de Waffle[](https://ethereum-waffle.readthedocs.io/en/latest/index.html).

## Instalar las dependencias {#install-dependencies}

[Añada](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation) las dependencias ethereum-waffle y de typescript a las dependencias de desarrollo de su proyecto.

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## Ejemplo de contrato inteligente {#example-smart-contract}

Durante el tutorial trabajaremos con un sencillo ejemplo de contrato inteligente: EtherSplitter. Permite casi se manera similar que cualquiera envíe algunos wei y, eventualmente, los divida entre dos receptores por defecto. La función dividida requiere que la cantidad de wei sea un número entero, de lo contario se revertirá. Para ambos receptores realiza una transferencia de wei, seguida a la emisión de un evento de transferencia.

Añada el fragmento de código de EtherSplitter en `src/EtherSplitter.sol`.

```solidity
pragma solidity ^0.6.0;

contract EtherSplitter {
    address payable receiver1;
    address payable receiver2;

    event Transfer(address from, address to, uint256 amount);

    constructor(address payable _address1, address payable _address2) public {
        receiver1 = _address1;
        receiver2 = _address2;
    }

    function split() public payable {
        require(msg.value % 2 == 0, 'Uneven wei amount not allowed');
        receiver1.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver1, msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver2, msg.value / 2);
    }
}
```

## Compilar el contrato {#compile-the-contract}

Para [compilar](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract) el contrato, añada las siguientes líneas al archivo de package.json:

```json
"scripts": {
    "build": "waffle"
  }
```

A continuación, cree el archivo de configuración de Waffle en el directorio de raíz del proyecto `waffle.json` y después pegue ahí la siguiente configuración:

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

Ejecute `yarn build`. Como resultado, el directorio `build` aparecerá con el contrato compilado de EtherSplitter en formato JSON.

## Configuración de la prueba {#test-setup}

Para hacer pruebas con Waffle se tienen que utilizar los emparejadores de Chai y Mocha, por lo que necesita [añadirlos](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests) a su proyecto. Actualice su archivo package.json y añada la línea de `test` en la parte de scripts:

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

Si quiere [ejecutar](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests) sus pruebas, simplemente ejecute `yarn test` .

# Pruebas {#testing}

Seguidamente cree el directorio `test` y un nuevo archivo `test\EtherSplitter.test.ts`. Copie el fragmento de abajo y péguelo en nuestro archivo de prueba.

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import EtherSplitter from "../build/EtherSplitter.json"

use(solidity)

describe("Ether Splitter", () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [
      receiver1.address,
      receiver2.address,
    ])
  })

  // add the tests here
})
```

Unas breves aclaraciones antes de que empecemos. El `MockProvider` incluye una simulación de la cadena de bloques. También permite que las carteras simuladas funcionen para hacer la prueba del contrato EtherSplitter. Podemos obtener hasta diez carteras aplicando el método de `getWallet()` en el proveedor. En el ejemplo, obtendremos tres carteras para el emisor y dos receptores.

A continuación, declaramos una variable llamada «splitter»: este es nuestro contrato simulado EtherSplitter. Se crea antes de la ejecución de una única prueba a través del método `deployContract`. Este método simula la implementación de un contrato desde la cartera pasado como el primer parámetro (en nuestro caso, la cartera del emisor). El segundo parámetro es el ABI y el código de bytes del contrato de prueba: aquí pasamos el archivo json o el contrato EtherSplitter compilado desde el directorio `build`. El tercer parámetro es una matriz con los argumentos del constructor del contrato, que en nuestro caso, son las dos direcciones de los receptores.

## ChangeBalances {#changebalances}

Primero, revisamos si el método dividido realmente cambia el saldo de las carteras de los receptores. Si dividimos 50 wei desde las cuentas de los emisores, esperaríamos que los saldos de ambos receptores aumentaran 25 wei. Usaremos el comparador `changeBalances` de Waffle:

```ts
it("Changes accounts balances", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

Como primer parámetro del emparejador, enviamos una matriz de carteras receptoras; y como segundo parámetro, una matriz de aumentos esperados en las cuentas correspondientes. Si queremos revisar el balance de una billetera en específico, también podemos usar el comparador `changeBalance`, que no requiere el envío de matrices como en el ejemplo anterior:

```ts
it("Changes account balance", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

Tenga en cuenta que en ambos casos `changeBalance` y `changeBalances`, enviamos la función dividida como devolución de llamada, porque el emparejador necesita acceder al estado de saldos antes y después de la llamada.

A continuación, probaremos si el evento de transferencia se emitió después de cada transferencia de wei. Cambiaremos a otra máquina desde Waffle:

## Emit {#emit}

```ts
it("Emits event on the transfer to the first receiver", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("Emits event on the transfer to the second receiver", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

El emparejador `emit` nos permite revisar si un contrato ha emitido un evento al recurrir a un método. Como parámetros del emparejador `emit`, proporcionamos el simulacro de contrato que predecimos para emitir el evento, junto al nombre de ese evento. En nuestro caso, el simulacro de contrato es `splitter` y el nombre del evento: `Transfer`. También podemos verificar los valores precisos de los argumentos con los que se emitió el evento: enviamos tantos argumentos al emparejador `withArgs` como lo espera nuestra declaración de evento. En el caso del contrato EtherSplitter, enviamos las direcciones del emisor y del receptor, junto a la cantidad de wei transferida.

## revertedWith {#revertedwith}

Como último ejemplo, comprobaremos si se revirtió la transacción en caso de número impar de wei. Usaremos el emparejador `revertedWith`:

```ts
it("Reverts when Vei amount uneven", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "Uneven wei amount not allowed"
  )
})
```

Si la prueba sale bien, nos garantizará que se ha revertido la transacción. Sin embargo, también debe haber una coincidencia exacta entre los mensajes que hemos enviado en la declaración `require` y el mensaje que esperamos en `revertedWith`. Si regresamos al código del contrato EtherSplitter, en la declaración `require` para la cantidad de wei, proporcionamos el mensaje: «no se permite una cantidad impar de wei». Esto coincide con el mensaje que esperamos en nuestra prueba. Si no coinciden, será que la prueba ha salido mal.

# ¡Felicitaciones! {#congratulations}

¡Acabas de dar tu primer gran paso para probar los contratos inteligentes con Waffle! Puede que también te interesen otros tutoriales de Waffle:

- [Probar ERC20 con Waffle](/developers/tutorials/testing-erc-20-tokens-with-waffle/)
- [Waffle: Llamadas dinámicas de simulación y prueba de contratos](/developers/tutorials/waffle-dynamic-mocking-and-testing-calls/#gatsby-focus-wrapper)
- [Tutorial de Waffle "Hola, Mundo" con hardhat y ethers](/developers/tutorials/waffle-hello-world-with-buidler-tutorial/)
