---
title: Prueba de un contrato inteligente simple con la biblioteca Waffle
description: Tutorial para principiantes
author: Ewa Kowalska
tags:
  [
    "contratos Inteligentes",
    "Solidity",
    "Waffle",
    "pruebas"
  ]
skill: beginner
lang: es
published: 2021-02-26
---

## En este tutorial aprenderá a {#in-this-tutorial-youll-learn-how-to}

- Probar los cambios en el saldo de la billetera
- Probar la emisión de eventos con argumentos específicos
- Afirmar que una transacción ha sido revertida

## Supuestos {#assumptions}

- Puede crear un nuevo proyecto de JavaScript o TypeScript
- Tiene algo de experiencia básica con pruebas en JavaScript
- Ha usado algunos administradores de paquetes como yarn o npm
- Posee conocimientos muy básicos sobre contratos inteligentes y Solidity

## Primeros pasos {#getting-started}

El tutorial demuestra la configuración y ejecución de la prueba usando yarn, pero no hay problema si prefiere npm. Proporcionaré las referencias adecuadas a la [documentación](https://ethereum-waffle.readthedocs.io/en/latest/index.html) oficial de Waffle.

## Instalar dependencias {#install-dependencies}

[Añada](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation) las dependencias ethereum-waffle y typescript a las dependencias de desarrollo de su proyecto.

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## Ejemplo de contrato inteligente {#example-smart-contract}

Durante el tutorial trabajaremos en un ejemplo de contrato inteligente simple: EtherSplitter. No hace mucho más que permitir que cualquiera envíe wei y los divida en partes iguales entre dos receptores predefinidos.
La función `split` requiere que la cantidad de wei sea par; de lo contrario, se revertirá. Para ambos receptores, realiza una transferencia de wei seguida de la emisión del evento `Transfer`.

Coloque el fragmento de código de EtherSplitter en `src/EtherSplitter.sol`.

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
        require(msg.value % 2 == 0, 'No se permite una cantidad impar de wei');
        receiver1.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver1, msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver2, msg.value / 2);
    }
}
```

## Compilar el contrato {#compile-the-contract}

Para [compilar](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract) el contrato, añada la siguiente entrada al archivo package.json:

```json
"scripts": {
    "build": "waffle"
  }
```

A continuación, cree el archivo de configuración de Waffle en el directorio raíz del proyecto, `waffle.json`, y pegue allí la siguiente configuración:

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

Ejecute `yarn build`. Como resultado, aparecerá el directorio `build` con el contrato EtherSplitter compilado en formato JSON.

## Configuración de la prueba {#test-setup}

Probar con Waffle requiere el uso de los matchers de Chai y Mocha, por lo que necesita [añadirlos](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests) a su proyecto. Actualice su archivo package.json y añada la entrada `test` en la parte de scripts:

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

Si desea [ejecutar](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests) sus pruebas, simplemente ejecute `yarn test`.

## Pruebas {#testing}

Ahora cree el directorio `test` y el nuevo archivo `test\EtherSplitter.test.ts`.
Copie el siguiente fragmento y péguelo en nuestro archivo de prueba.

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

  // añada las pruebas aquí
})
```

Unas palabras antes de empezar.
`MockProvider` viene con una versión de simulación de la cadena de bloques. También proporciona billeteras de simulación que nos servirán para probar el contrato EtherSplitter. Podemos obtener hasta diez billeteras llamando al método `getWallets()` en el proveedor. En el ejemplo, obtenemos tres billeteras: para el emisor y para dos receptores.

A continuación, declaramos una variable llamada «splitter», que es nuestro contrato de simulación EtherSplitter. Se crea antes de cada ejecución de una única prueba mediante el método `deployContract`. Este método simula la implementación de un contrato desde la billetera pasada como primer parámetro (la billetera del emisor en nuestro caso). El segundo parámetro es la ABI y el bytecode del contrato probado. Allí pasamos el archivo json del contrato EtherSplitter compilado desde el directorio `build`. El tercer parámetro es un array con los argumentos del constructor del contrato, que en nuestro caso son las dos direcciones de los receptores.

## changeBalances {#changebalances}

Primero, comprobaremos si el método `split` cambia realmente los saldos de las billeteras de los receptores. Si dividimos 50 wei de la cuenta del emisor, esperaríamos que los saldos de ambos receptores aumentaran en 25 wei. Usaremos el matcher `changeBalances` de Waffle:

```ts
it("Cambia los saldos de las cuentas", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

Como primer parámetro del matcher, pasamos un array de las billeteras de los receptores y, como segundo, un array de los aumentos esperados en las cuentas correspondientes.
Si quisiéramos comprobar el saldo de una billetera específica, también podríamos usar el matcher `changeBalance`, que no requiere pasar arrays, como en el siguiente ejemplo:

```ts
it("Cambia el saldo de la cuenta", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

Tenga en cuenta que en ambos casos de `changeBalance` y `changeBalances` pasamos la función `split` como un callback porque el matcher necesita acceder al estado de los saldos antes y después de la llamada.

A continuación, probaremos si el evento `Transfer` se emitió después de cada transferencia de wei. Pasaremos a otro matcher de Waffle:

## Emit {#emit}

```ts
it("Emite un evento en la transferencia al primer receptor", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("Emite un evento en la transferencia al segundo receptor", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

El matcher `emit` nos permite comprobar si un contrato emitió un evento al llamar a un método. Como parámetros para el matcher `emit`, proporcionamos el contrato de simulación que predecimos que emitirá el evento, junto con el nombre de ese evento. En nuestro caso, el contrato de simulación es `splitter` y el nombre del evento es `Transfer`. También podemos verificar los valores precisos de los argumentos con los que se emitió el evento: pasamos tantos argumentos al matcher `withArgs` como espera nuestra declaración de evento. En el caso del contrato EtherSplitter, pasamos las direcciones del emisor y del receptor junto con la cantidad de wei transferida.

## revertedWith {#revertedwith}

Como último ejemplo, comprobaremos si la transacción fue revertida en caso de una cantidad impar de wei. Usaremos el matcher `revertedWith`:

```ts
it("Se revierte cuando la cantidad de wei es impar", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "No se permite una cantidad impar de wei"
  )
})
```

La prueba, si se supera, nos asegurará que la transacción fue revertida. Sin embargo, también debe haber una coincidencia exacta entre los mensajes que pasamos en la declaración `require` y el mensaje que esperamos en `revertedWith`. Si volvemos al código del contrato EtherSplitter, en la declaración `require` para la cantidad de wei, proporcionamos el mensaje: «No se permite una cantidad impar de wei». Esto coincide con el mensaje que esperamos en nuestra prueba. Si no fueran iguales, la prueba fallaría.

## ¡Felicitaciones! {#congratulations}

¡Ha dado su primer gran paso hacia la prueba de contratos inteligentes con Waffle!
