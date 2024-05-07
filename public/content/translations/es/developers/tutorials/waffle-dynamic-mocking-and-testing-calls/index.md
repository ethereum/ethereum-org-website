---
title: "Waffle: Llamadas dinámicas de simulación y prueba de contratos"
description: Tutorial avanzado de Waffle para el uso de simulaciones dinámicas y pruebas de llamadas a contratos
author: "Daniel Izdebski"
tags:
  - "waffle"
  - "contratos inteligentes"
  - "solidity"
  - "pruebas"
  - "simular"
skill: intermediate
lang: es
published: 2020-11-14
---

## ¿De qué trata este tutorial? {#what-is-this-tutorial-about}

En este tutorial aprenderás como:

- utilizar simulación dinámica
- comprobar las interacciones entre contratos inteligentes

Supuestos:

- ya sabes como escribir un contrato inteligente simple en `Solidity`
- ya sabes utilizar `JavaScript` y `TypeScript`
- ya has hecho otrod tutoriales de `Waffle` o sabes algunas cosas sobre él

## Simulación dinámica {#dynamic-mocking}

¿Por qué es útil la simulación dinámica? Bueno, porque nos permite escribir pruebas unitarias en lugar de pruebas de integración. ¿Y eso, qué significa? Significa que no tenemos que preocuparnos por las dependencias de los contratos inteligentes, por lo que podremos probarlos de forma aislada. Déjame mostrarte cómo puedes hacerlo.

### **1. Proyecto** {#1-project}

Antes de comenzar debemos preparar un proyecto simple node.js:

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# or if you're using npm
npm init
```

Comencemos agregando dependencias de typescript y prueba - mocha & chai:

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# or if you're using npm
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

Ahora agreguemos `Waffle` y `ethers`:

```bash
yarn add --dev ethereum-waffle ethers
# or if you're using npm
npm install ethereum-waffle ethers --save-dev
```

La estructura de tu proyecto debería verse así:

```
.
├── contracts
├── package.json
└── test
```

### **2. Contrato inteligente** {#2-smart-contract}

Para comenzar una simulación dinámica, necesitamos un contrato inteligente con dependencias. No te preocupes, ¡yo me encargo!

Aquí hay un contrato inteligente simple escrito en `Solidity` cuyo único proposito es comporbar si somos ricos. Utiliza el token ERC20 para comprobar si tenemos suficientes tokens. Ponlo en `./contracts/AmIRichAlready.sol`.

```solidity
pragma solidity ^0.6.2;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract AmIRichAlready {
    IERC20 private tokenContract;
    uint public richness = 1000000 * 10 ** 18;

    constructor (IERC20 _tokenContract) public {
        tokenContract = _tokenContract;
    }

    function check() public view returns (bool) {
        uint balance = tokenContract.balanceOf(msg.sender);
        return balance > richness;
    }
}
```

Como queremos utilizar la simulación dinámica no necesitamos el ERC20 completo, por eso estamos utilizando la interfaz de IERC20 con sólo una función.

¡Es hora de construir este contrato! Para ello utilizaremos `Waffle`. Primero, debemos crear un archivo de configuración simple `waffle.json` que especifique las opciones de compilación.

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

Ahora estamos listos para crear el contrato con Waffle:

```bash
npx waffle
```

Fácil, ¿verdad? En la carpeta `build/` aparecieron dos archivos correspondientes al contrato y la interfaz. Los utilizaremos luego para las pruebas.

### **3. Pruebas** {#3-testing}

Creemos un archivo llamado `AmIRichAlready.test.ts` para estas pruebas. Antes que nada, tenemos que gestionar las importaciones. Las necesitaremos luego:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"
```

Excepto para las dependencias JS, necesitaremos importar o crear el contrato y la interfaz:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

Waffle utiliza `chai` para las pruebas. Sin embargo, antes de utilizarlo, debemos insertar los emparejadores de Waffle en el propio chai:

```typescript
use(solidity)
```

Necesitamos implementar una función `beforeEach()` que restablezca el estado del contrato antes de cada prueba. Pensemos primero en lo que necesitamos allí. Para implementar un contrato necesitaremos dos cosas: un monedero y un contrato ERC20 ya implementado para utilizarlo como argumento del contrato `AmIRichAlready`.

Primero creamos el monedero:

```typescript
const [wallet] = new MockProvider().getWallets()
```

Luego debemos desplegar un contrato ERC20. Aquí está la parte difícil - sólo tenemos una interfaz. Esta es la parte en que Waffle viene a salvarnos. Waffle tiene una función mágica `deployMockContract()` que crea un contrato usando únicamente el _abi_ de la interfaz:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

Ahora con el monedero y el ERC20 desplegado, podemos continuar con la implementación del contrato `AmIRichAlready`:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

Con todo eso, nuestra función `beforeEach()` está terminada. Hasta aquí, tu archivo `AmIRichAlready.test.ts` debería verse así:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"

import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"

use(solidity)

describe("Am I Rich Already", () => {
  let mockERC20: Contract
  let contract: Contract
  let wallet: Wallet

  beforeEach(async () => {
    ;[wallet] = new MockProvider().getWallets()
    mockERC20 = await deployMockContract(wallet, IERC20.abi)
    contract = await deployContract(wallet, AmIRichAlready, [mockERC20.address])
  })
})
```

Escribamos la primera prueba para el contrato `AmIRichAlready`. ¿De qué crees que debería ser nuestra prueba? ¡Sí, tienes razón! Deberíamos comprobar si ya somos ricos :)

Pero espera un segundo. ¿Cómo sabrá nuestro contrato simulado que valores devolver? No hemos implementado ninguna lógica para la función `balanceOf()`. Nuevamente, Waffle nos puede ayudar. Nuestro contrato simulado tiene algunas cosas nuevas:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

Con este conocimiento podemos, finalmente, escribir nuestra primera prueba:

```typescript
it("returns false if the wallet has less than 1000000 tokens", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Separemos esta prueba en partes:

1. Establecimos nuestro contrato ERC20 para devolver siempre un balance de 999999 tokens.
2. Comprobar si el método`contract.check()` devuelve `false`.

Estamos listos para liberar a la bestia:

![Pasando una prueba](./test-one.png)

Así que la prueba funciona, pero... todavía hay margen de mejora. La función `balanceOf()` siempre devolverá 999999. Podemos mejorarla especificando un monedero para el cual la función devolverá algo, como un contrato real:

```typescript
it("returns false if the wallet has less than 1000001 tokens", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Hasta el momento, sólo probamos el caso donde aún no somos suficientemente ricos. Probemos el opuesto esta vez:

```typescript
it("returns true if the wallet has at least 1000001 tokens", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

Ejecutas las pruebas...

![Pasando dos pruebas](test-two.png)

... ¡y aquí está! Nuestro contrato parece funcionar según lo previsto :)

## Probando llamadas de contrato {#testing-contract-calls}

Veamos lo que hicimos hasta ahora. Probamos la funcionalidad de nuestro contrato `AmIRichAlready` y parece estar funcionando correctamente. Esto significa que terminamos, ¿verdad? ¡No exactamente! Waffle nos permite probar nuestro contrato aún más. ¿Pero cómo? Bueno, en el arsenal de Waffle tenemos `calledOnContract()` y los matchers `calledOnContractWith()`. Siempre nos permitirán corroborar si nuestro contrato llamó al contrato simulado ERC20. Aquí hay una prueba básica con uno de estos matchers:

```typescript
it("checks if contract called balanceOf on the ERC20 token", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

Incluso podemos ir más allá y mejorar esta prueba con los otros matchers de los que te hablé:

```typescript
it("checks if contract called balanceOf with certain wallet on the ERC20 token", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

Vamos a comprobar si las pruebas fueron correctas:

![Pasando tres pruebas](test-three.png)

Genial, todas las pruebas están verdes.

Probar las llamadas de contrato con Waffle es muy fácil. Y aquí está la mejor parte. ¡Estos emparejadores trabajan tanto con contratos normales como simulados! Esto se debe a que Waffle registra y filtra las llamadas EVM en lugar de introducir código, como en el caso de las librerías de prueba populares para otras tecnologías.

## La Línea de Llegada {#the-finish-line}

¡Felicidades! Ahora sabes como usar Waffle para probar las llamadas de contrato y contratos simulados de forma dinámica. Hay características mucho más interesantes que descubrir. Recomiendo revisar la documentación de Waffle.

La documentación de Waffle está disponible [aquí](https://ethereum-waffle.readthedocs.io/).

El código fuente de este tutorial puedes econtrarlo [aquí](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls).

Otros tutoriales que podrían interesarte:

- [Probar contratos inteligentes con Waffle](/developers/tutorials/testing-smart-contract-with-waffle/)
