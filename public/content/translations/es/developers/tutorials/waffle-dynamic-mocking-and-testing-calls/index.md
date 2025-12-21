---
title: "Waffle: simulación dinámica y pruebas de llamadas a contratos"
description: Tutorial avanzado de Waffle para el uso de simulaciones dinámicas y pruebas de llamadas a contratos
author: "Daniel Izdebski"
tags:
  [
    "waffle",
    "contratos Inteligentes",
    "Solidity",
    "pruebas",
    "simular"
  ]
skill: intermediate
lang: es
published: 14-11-2020
---

## ¿De qué trata este tutorial? {#what-is-this-tutorial-about}

En este tutorial aprenderás cómo:

- utilizar simulación dinámica
- comprobar las interacciones entre contratos inteligentes

Suposiciones:

- ya sabes cómo escribir un contrato inteligente simple en `Solidity`
- ya sabes utilizar `JavaScript` y `TypeScript`
- ya has hecho otros tutoriales de `Waffle` o sabes algunas cosas sobre él

## Simulación dinámica {#dynamic-mocking}

¿Por qué es útil la simulación dinámica? Bueno, nos permite escribir pruebas unitarias en lugar de pruebas de integración. ¿Y eso, qué significa? Significa que no tenemos que preocuparnos por las dependencias de los contratos inteligentes, por lo que podremos probarlos de forma aislada. Déjame mostrarte cómo puedes hacerlo.

### **1. Proyecto** {#1-project}

Antes de comenzar debemos preparar un proyecto simple node.js:

```bash
mkdir simulacion-dinamica
cd simulacion-dinamica
mkdir contracts src

yarn init
# o si estás usando npm
npm init
```

Comencemos agregando dependencias de typescript y prueba: mocha y chai:

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# o si estás usando npm
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

Ahora agreguemos `Waffle` y `ethers`:

```bash
yarn add --dev ethereum-waffle ethers
# o si estás usando npm
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

Aquí hay un contrato inteligente simple escrito en `Solidity` cuyo único propósito es comprobar si somos ricos. Utiliza el token ERC20 para comprobar si tenemos suficientes tokens. Ponlo en `./contracts/AmIRichAlready.sol`.

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

¡Es hora de construir este contrato! Para ello utilizaremos `Waffle`. Primero, vamos a crear un archivo de configuración simple `waffle.json` que especifica las opciones de compilación.

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

Aparte de las dependencias de JS, necesitamos importar nuestro contrato compilado y la interfaz:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

Waffle utiliza `chai` para las pruebas. Sin embargo, antes de utilizarlo, debemos insertar los emparejadores de Waffle en el propio chai:

```typescript
use(solidity)
```

Necesitamos implementar una función `beforeEach()` que restablezca el estado del contrato antes de cada prueba. Pensemos primero en lo que necesitamos allí. Para desplegar un contrato, necesitamos dos cosas: una billetera y un contrato ERC20 desplegado para pasarlo como argumento del contrato `AmIRichAlready`.

Primero, creamos la billetera:

```typescript
const [wallet] = new MockProvider().getWallets()
```

Luego debemos desplegar un contrato ERC20. Aquí está la parte difícil: sólo tenemos una interfaz. Esta es la parte en que Waffle viene a salvarnos. Waffle tiene una función mágica `deployMockContract()` que crea un contrato usando únicamente el _abi_ de la interfaz:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

Ahora con la billetera y el ERC20 desplegado, podemos continuar e implementar el contrato `AmIRichAlready`:

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

Pero espera un segundo. ¿Cómo sabrá nuestro contrato simulado qué valores devolver? No hemos implementado ninguna lógica para la función `balanceOf()`. Nuevamente, Waffle nos puede ayudar. Nuestro contrato simulado tiene algunas cosas nuevas:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

Con este conocimiento podemos, finalmente, escribir nuestra primera prueba:

```typescript
it("devuelve «false» si la billetera tiene menos de 1000000 tokens", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Separemos esta prueba en partes:

1. Establecimos nuestro contrato ERC20 simulado para devolver siempre un saldo de 999999 tokens.
2. Comprobar si el método `contract.check()` devuelve `false`.

Estamos listos para liberar a la bestia:

![Una prueba superada](./test-one.png)

Así que la prueba funciona, pero... todavía hay margen de mejora. La función `balanceOf()` siempre devolverá 999999. Podemos mejorarla especificando una billetera para la que la función devolverá algo, como un contrato real:

```typescript
it("devuelve «false» si la billetera tiene menos de 1000001 tokens", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Hasta el momento, sólo probamos el caso donde aún no somos suficientemente ricos. Probemos el opuesto esta vez:

```typescript
it("devuelve «true» si la billetera tiene al menos 1000001 tokens", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

Ejecutas las pruebas...

![Dos pruebas superadas](./test-two.png)

... ¡y aquí está! Nuestro contrato parece funcionar según lo previsto :)

## Prueba de llamadas a contratos {#testing-contract-calls}

Veamos lo que hicimos hasta ahora. Hemos probado la funcionalidad de nuestro contrato `AmIRichAlready` y parece que funciona correctamente. Esto significa que terminamos, ¿verdad? ¡No exactamente! Waffle nos permite probar nuestro contrato aún más. ¿Pero cómo? Bueno, en el arsenal de Waffle están los emparejadores `calledOnContract()` y `calledOnContractWith()`. Nos permitirán comprobar si nuestro contrato llamó al contrato simulado de ERC20. Aquí hay una prueba básica con uno de estos emparejadores:

```typescript
it("comprueba si el contrato llamó a balanceOf en el token ERC20", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

Podemos ir aún más lejos y mejorar esta prueba con el otro emparejador del que te hablé:

```typescript
it("comprueba si el contrato llamó a balanceOf con una billetera determinada en el token ERC20", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

Vamos a comprobar si las pruebas fueron correctas:

![Tres pruebas superadas](./test-three.png)

Genial, todas las pruebas están verdes.

Probar las llamadas de contrato con Waffle es muy fácil. Y aquí está la mejor parte. ¡Estos emparejadores funcionan tanto con contratos normales como simulados! Esto se debe a que Waffle registra y filtra las llamadas de la EVM en lugar de inyectar código, como es el caso de las librerías de prueba populares para otras tecnologías.

## La recta final {#the-finish-line}

¡Enhorabuena! Ahora sabes cómo usar Waffle para probar las llamadas de contrato y contratos simulados de forma dinámica. Hay características mucho más interesantes que descubrir. Recomiendo revisar la documentación de Waffle.

La documentación de Waffle está disponible [aquí](https://ethereum-waffle.readthedocs.io/).

El código fuente de este tutorial se puede encontrar [aquí](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls).

Otros tutoriales que podrían interesarte:

- [Prueba de contratos inteligentes con Waffle](/developers/tutorials/waffle-test-simple-smart-contract/)
