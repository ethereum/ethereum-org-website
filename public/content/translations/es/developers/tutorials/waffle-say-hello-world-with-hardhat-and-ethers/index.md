---
title: "Tutorial de Waffle «Hola, mundo» con Hardhat y ethers"
description: Cree su primer proyecto de Waffle con Hardhat y ethers.js
author: "MiZiet"
tags:
  [
    "waffle",
    "contratos Inteligentes",
    "Solidity",
    "pruebas",
    "hardhat",
    "ethers.js"
  ]
skill: beginner
lang: es
published: 2020-10-16
---

En este tutorial de [Waffle](https://ethereum-waffle.readthedocs.io), aprenderemos a configurar un proyecto simple de contrato inteligente «Hola, mundo», utilizando [hardhat](https://hardhat.org/) y [ethers.js](https://docs.ethers.io/v5/). Luego aprenderemos cómo añadir una nueva funcionalidad a nuestro contrato inteligente y cómo probarlo con Waffle.

Empecemos creando un nuevo proyecto:

```bash
yarn init
```

o

```bash
npm init
```

y la instalación de los paquetes necesarios:

```bash
yarn add -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

o

```bash
npm install -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

El siguiente paso es crear un proyecto de muestra de Hardhat ejecutando `npx hardhat`.

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.3 👷‍

? What do you want to do? …
❯ Create a sample project
Create an empty hardhat.config.js
Quit
```

Seleccione `Create a sample project`

La estructura de nuestro proyecto debería verse así:

```
MyWaffleProject
├── contracts
│   └── Greeter.sol
├── node_modules
├── scripts
│   └── sample-script.js
├── test
│   └── sample-test.js
├── .gitattributes
├── .gitignore
├── hardhat.config.js
└── package.json
```

### Ahora hablemos de algunos de estos archivos: {#now-lets-talk}

- Greeter.sol: nuestro contrato inteligente escrito en Solidity;

```solidity
contract Greeter {
string greeting;

constructor(string memory _greeting) public {
console.log("Desplegando un Greeter con el saludo:", _greeting);
greeting = _greeting;
}

function greet() public view returns (string memory) {
return greeting;
}

function setGreeting(string memory _greeting) public {
console.log("Cambiando el saludo de '%s' a '%s'", greeting, _greeting);
greeting = _greeting;
}
}
```

Nuestro contrato inteligente se puede dividir en tres partes:

1. constructor: donde declaramos una variable de tipo cadena llamada `greeting`,
2. función greet: una función que devolverá el `greeting` al ser invocada,
3. función setGreeting: una función que nos permite cambiar el valor de `greeting`.

- sample-test.js: nuestro archivo de pruebas

```js
describe("Greeter", function () {
  it("Debería devolver el nuevo saludo una vez que se ha cambiado", async function () {
    const Greeter = await ethers.getContractFactory("Greeter")
    const greeter = await Greeter.deploy("Hello, world!")

    await greeter.deployed()
    expect(await greeter.greet()).to.equal("Hello, world!")

    await greeter.setGreeting("Hola, mundo!")
    expect(await greeter.greet()).to.equal("Hola, mundo!")
  })
})
```

### El siguiente paso consiste en compilar nuestro contrato y ejecutar las pruebas: {#compiling-and-testing}

Las pruebas de Waffle utilizan Mocha (un marco de pruebas) con Chai (una biblioteca de aserciones). Todo lo que tiene que hacer es ejecutar `npx hardhat test` y esperar a que aparezca el siguiente mensaje.

```bash
✓ Should return the new greeting once it's changed
```

### Todo parece ir bien hasta ahora. Añadamos un poco más de complejidad a nuestro proyecto <Emoji text=":slightly_smiling_face:" size={1}/> {#adding-complexity}

Imagine una situación en la que alguien añade una cadena vacía como saludo. No sería un saludo muy cálido, ¿verdad?  
Asegurémonos de que eso no ocurra:

Queremos usar el `revert` de Solidity cuando alguien pase una cadena vacía. Lo bueno es que podemos probar fácilmente esta funcionalidad con el comparador de Chai de Waffle `to.be.revertedWith()`.

```js
it("Debería revertir al pasar una cadena vacía", async () => {
  const Greeter = await ethers.getContractFactory("Greeter")
  const greeter = await Greeter.deploy("Hello, world!")

  await greeter.deployed()
  await expect(greeter.setGreeting("")).to.be.revertedWith(
    "El saludo no debe estar vacío"
  )
})
```

Parece que nuestra nueva prueba no ha pasado:

```bash
Deploying a Greeter with greeting: Hello, world!
Changing greeting from 'Hello, world!' to 'Hola, mundo!'
    ✓ Should return the new greeting once it's changed (1514ms)
Deploying a Greeter with greeting: Hello, world!
Changing greeting from 'Hello, world!' to ''
    1) Should revert when passing an empty string


  1 passing (2s)
  1 failing
```

Implementemos esta funcionalidad en nuestro contrato inteligente:

```solidity
require(bytes(_greeting).length > 0, "El saludo no debe estar vacío");
```

Ahora, nuestra función setGreeting se ve así:

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "El saludo no debe estar vacío");
console.log("Cambiando el saludo de '%s' a '%s'", greeting, _greeting);
greeting = _greeting;
}
```

Ejecutemos las pruebas de nuevo:

```bash
✓ Should return the new greeting once it's changed (1467ms)
✓ Should revert when passing an empty string (276ms)

2 passing (2s)
```

¡Enhorabuena! ¡Lo ha conseguido! :)

### Conclusión {#conclusion}

Hemos creado un proyecto sencillo con Waffle, Hardhat y ethers.js. Hemos aprendido a configurar un proyecto, añadir una prueba e implementar una nueva funcionalidad.

Para ver más comparadores de Chai excelentes con los que probar sus contratos inteligentes, consulte la [documentación oficial de Waffle](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html).
