---
title: Contrato inteligente de Hola, mundo para principiantes
description: Tutorial introductorio para redactar e implementar un contrato inteligente sencillo en Ethereum.
author: "elanh"
tags:
  - "solidity"
  - "Hardhat"
  - "alchemy"
  - "contratos inteligentes"
  - "empezar"
  - "implementación"
skill: beginner
lang: es
published: 2021-03-31
---

Si es nuevo en el desarrollo de cadena de bloques y no sabe por dónde empezar, o si solo quiere entender cómo implementar e interactuar con contratos inteligentes, esta es su guía. Abordaremos cómo crear e implementar un contrato inteligente sencillo en la red de prueba Ropsten usando una billetera virtual ([MetaMask](https://metamask.io/)), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/) y [Alchemy](https://alchemyapi.io/eth) (no se preocupe si aún no entiende lo que significa todo esto, lo explicaremos).

En la parte 2 de este tutorial veremos cómo interactuar con nuestro contrato inteligente una vez implementado y en la parte 3 trataremos cómo publicarlo en Etherscan.

Si tiene alguna pregunta, no dude en consultar [Alchemy Discord](https://discord.gg/gWuC7zB)!

## Paso 1: Conectarse a la red Ethereum {#step-1}

Hay muchas maneras de hacer solicitudes a la cadena Ethereum. Por simplicidad, usaremos una cuenta gratis en Alchemy, una plataforma de desarrolladores de cadenas de bloques y una API que nos permitirá comunicarnos con la cadena Ethereum sin tener que ejecutar nuestros propios nodos. La plataforma también tiene herramientas de desarrollo para el monitoreo y analíticas que nos darán ventaja en este tutorial para entender lo que está sucediendo en el desarrollo de nuestro contrato inteligente. Si aún no tiene cuenta en Alchemy, [puede registrarse gratis aquí](https://dashboard.alchemyapi.io/signup).

## Paso 2: Crear su aplicación (y llave API) {#step-2}

Una vez que haya creado una cuenta de Alchemy, puede generar una clave de API creando una aplicación. Esto nos permitirá hacer peticiones a la red de pruebas de Ropsten. Si no está familiarizado con las redes de pruebas, revise la página [](/developers/docs/networks/).

1.  Navegue a la página «Crear App» en su tablero Alchemy pasando el cursor sobre «Apps» en la barra de navegación y haciendo clic en «Crear App».

![Crear la aplicación Hola, mundo](./hello-world-create-app.png)

2. Designe a su aplicación «Hola, mundo», y escriba una breve descripción, seleccione «Staging» para el ambiente (usado para la contabilidad de tu aplicación), y escoja «Ropsten» para su red.

![Crear App visualizar Hola, mundo](./create-app-view-hello-world.png)

3. ¡Haga clic en «Crear app» y ya está! Su aplicación debería aparecer en la siguiente tabla.

## Paso 3: Crear una cuenta Ethereum (dirección) {#step-3}

Necesitamos tener una cuenta Ethereum para enviar y recibir transacciones. Para este tutorial, usaremos MetaMask, una cartera virtual en el navegador usada para manejar la dirección de su cuenta Ethereum. Más información en [transacciones](/developers/docs/transactions/).

Puede descargar y crear una cuenta MetaMask gratis [aquí](https://metamask.io/download.html). Cuando esté creando una cuenta, o ya tenga una, asegúrese de cambiar a la «Red de pruebas de Robsten» en la parte superior derecha ( para que no tratemos con dinero real).

![ejemplo de MetaMask Ropsten](./metamask-ropsten-example.png)

## Paso 4: Agregar ether de un Faucet {#step-4}

Para desarrollar nuestro contrato inteligente en la red de prueba, necesitaremos ETH de prueba. Para obtener sus ETH de prueba, puede ir a [Ropsten faucet](https://faucet.dimensions.network/) e introducir la dirección de su cuenta de Ropsten, y hacer click en «Enviar Ropsten ETH». Puede llevar algo de tiempo recibir su ETH de prueba debido a la congestión de la red. ¡Deberían aparecer los ETH en su cuenta de MetaMask poco después!

## Paso 5: Comprobar su balance {#step-5}

Para comprobar que nuestro balance este ahí, hagamos una solicitud de [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance)usando [la herramienta de composición de Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Esto hará que aparezca la cantidad de ETH en nuestra billetera. Después de introducir la dirección de su cuenta de MetaMask y hacer click en «Enviar Solicitud», debería ver una respuesta como esta:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **NOTA:**Este resultado es en wei no en ETH. Wei se usa como la denominación más pequeña de ether. La conversión de Wei a ETH es: 1 ETH = 10<sup>18</sup>wei. Entonces si queremos convertir 0x2B5E3AF16B1880000 a decimales obtenemos 5\*10¹⁸, que es igual a 5 ETH.
>
> ¡Fiu! Nuestro dinero de prueba esta todo ahí <Emoji text=":money_mouth_face:" size={1} />.

## Paso 6: Iniciar nuestro proyecto {#step-6}

Primero, necesitaremos crear un a carpeta para nuestro proyecto. Vaya a su línea de comando y teclee:

```
mkdir hello-world
cd hello-world
```

Ahora que estamos dentro de nuestra carpeta de proyecto, utulizaremos `npm init` a fin de inicializar el proyecto. Si no tiene instalado npm, siga [estas instrucciones](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (también necesitaremos Node.js así que ¡descárgueselo también!).

```
npm init
```

Realmente no importa la respuesta que dé a las preguntas de instalación, aquí le mostramos cómo lo hicimos nosotros:

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/.../.../.../hello-world/package.json:

{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "hello world smart contract",
  "main": "index.js",
  "scripts": {
     "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Aprueba el paquete.json y ¡estamos listos para comenzar!

## Paso 7: Descargar [Hardhat](https://hardhat.org/getting-started/#overview){#step-7}

Hardhat es un entorno de desarrollo para compilar, desplegar, probar y depurar su software Ethereum. Ayuda a los desarrolladores para construir contratos inteligentes y dApps localmente antes de desplegarlos en la cadena en vivo.

Dentro de nuestro proyecto `hello-world` ejecuta:

```
npm install --save-dev hardhat
```

Revise esta página para obtener más información acerca de las [intrucciones de instalación](https://hardhat.org/getting-started/#overview).

## Paso 8: Crear un proyecto en Hardhat {#step-8}

Dentro de la carpeta de nuestro proyecto, ejecute:

```
npx hardhat
```

Debería aparecer un mensaje de bienvenida y la opción de seleccionar lo que desee hacer. Seleccione «create an empty hardhat.config.js»:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍?

¿Qué es lo que quieres hacer? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Esto generará un archivo `hardhat.config.js` por nosotros, que es donde especificaremos todos los ajustes para nuestro proyecto (en el paso 13).

## Paso 9: Añadir carpetas de proyecto {#step-9}

Para mantener nuestro proyecto organizado, crearemos dos nuevas carpetas. Navegue al directorio raíz de su proyecto en su línea de comandos y escriba:

```
mkdir contracts
mkdir scripts
```

- `contratos/` es donde mantendremos nuestro archivo de código del contrato inteligente Hola, mundo
- `scripts/` es donde mantendremos los scripts para implementar e interactuar con nuestro contrato

## Paso 10: Escribir nuestro contrato {#step-10}

Tal vez se esté preguntando, ¿¿cuándo diablos escribiremos el código?? Bueno, aquí estamos, en el paso 10.

Abra el proyecto Hola, mundo en su editor favorito (nosotros preferimos [VSCode](https://code.visualstudio.com/)). Los contratos inteligentes están escritos en un lenguaje llamado Solidity, que es el que usaremos para escribir nuestro contrato inteligente HelloWorld.sol

1.  Navegue hasta la carpeta «contratos» y cree un nuevo archivo llamado HelloWorld.sol
2.  A continuación, se muestra un ejemplo de un contrato inteligente Hola, mundo de Ethereum Foundation, que utilizaremos para este tutorial. Copie y pegue el siguiente contenido en sus archivos HelloWorld.sol y asegúrese de leer los comentarios para enterarse de qué es lo que hace este contrato:

```solidity
// Especifica la versión de Solidity, utilizando la versión semántica.
// Más información: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragmma
pragma solidity ^0.5.10;

// Define un contrato llamado `HelloWorld`.
// Un contrato es una colección de funciones y datos (su estado). Una vez desplegado, un contrato reside en una dirección específica en la blockchain de Ethereum. Más información: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Declara una variable de estado `message` del tipo `string`.
   // Las variables de estado son variables cuyos valores se almacenan permanentemente en el almacenamiento del contrato. La palabra clave `public` hace que las variables sean accesibles desde fuera de un contrato y crea una función que otros contratos o clientes pueden llamar para acceder al valor.
   string public message;

    // Similar a muchos idiomas orientados a objetos basados en clases, un constructor es una función especial que sólo se ejecuta cuando se crea un contrato.
   // Los constructores se utilizan para inicializar los datos del contrato. Más información: https://solidity.readthedocs.io/es/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {

        // Acepta un argumento de cadena `initMessage` y establece el valor en la variable de almacenamiento `message` del contrato).
      message = initMessage;
    }

    // Una función pública que acepta un argumento de cadena y actualiza la variable de almacenamiento `message`.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Es un contrato inteligente muy sencillo que almacena un mensaje al momento de la creación y puede actualizarse con la función `update`.

## Paso 11: Conectar MetaMask & Alchemy a su proyecto {#step-11}

Hemos creado una billetera de MetaMask, una cuenta de Alchemy y escrito nuestro contrato inteligente, ahora es momento de conectarlos entre sí.

Cada transacción enviada desde su billetera virtual requiere una firma utilizando su clave privada única. Para proporcionar este permiso a nuestro programa, podemos almacenar de manera segura nuestra clave privada (y clave Alchemy API) en un archivo de entorno.

> Para saber más sobre el envío de transacciones, consulte[este tutorial](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) sobre el envío de transacciones usando web3.

Primero, instale el paquete dotenv en su directorio de proyecto:

```
npm install dotenv --save
```

Después, cree un archivo `.env` en el directorio raíz de nuestro proyecto, y añádale la llave inteligente de MetaMask y la API URL de HTTP Alchemy.

- Siga [estas instrucciones](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) para exportar su llave privada
- Abajo se le indica cómo obtener la API URL de HTTP Alchemy

![Obtener la llave alchemy api](./get-alchemy-api-key.gif)

Copie la API URL Alchemy

Su `.env` debería verse así:

```
API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Para conectarlos efectivamente a nuestro código, vincularemos estas variables en nuestro `hardhat.config.js` en el paso 13.

<InfoBanner isWarning={true}>
¡No exponga su <code>.env</code>! Asegúrese de que nunca comparte ni expone su archivo <code>.env</code> con nadie, ya que ello conlleva revelar sus secretos. Si está haciendo un control de la versión, añada <code>.env</code> a un archivo <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</InfoBanner>

## Paso 12: Instalar Ethers.js {#step-12-install-ethersjs}

Ethers.js es una biblioteca que facilita la interacción y la realización de solicitudes a Ethereum agrupando [métodos JSON-RPC estándar](/developers/docs/apis/json-rpc/) con métodos más fáciles para el usuario.

Hardhat hace que integrar [plugins](https://hardhat.org/plugins/) sea ultrafácil para herramientas adicionales y funcionalidades ampliadas. Aprovecharemos el [plugin Ethers](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) para la implementación de contratos ([Ethers.js](https://github.com/ethers-io/ethers.js/) tiene algunos métodos de implementación de contratos ultralimpios).

En el directorio de su proyecto, teclee:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

También necesitaremos ethers en nuestro `hardhat.config.js` en el próximo paso.

## Paso 13: Actualizar hardhat.config.js {#step-13-update-hardhatconfigjs}

Hasta ahora hemos añadido varias dependencias y plugins, por lo que ahora necesitamos actualizar `hardhat.config.js` para que nuestro proyecto sepa de todas ellas.

Actualice su `hardhat.config.js` para que muestre el siguiente texto:

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "ropsten",
   networks: {
      hardhat: {},
      ropsten: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

## Paso 14: Compilar nuestro contrato {#step-14-compile-our-contracts}

Para asegurarnos de que todo funciona correctamente hasta ahora, compilemos nuestro contrato. La función `compile` está incluida dentro de las funciones por defecto de hardhat.

Desde la linea de comandos, ejecute:

```
npx hardhat compile
```

Puede que reciba una advertencia sobre `SPDX license identifier not provided in source file` , pero no se preocupe por eso. ¡Con suerte, todo lo demás habrá ido bien! Si no es así, siempre puede escribir un mensaje en [Alchemy discord](https://discord.gg/u72VCg3).

## Paso 15: Escribir nuestro script de despliegue {#step-15-write-our-deploy-scripts}

Ahora que nuestro contrato está escrito y nuestro archivo de configuración está listo, es momento de escribir nuestro script de implementación del contrato.

Vaya a la carpeta `scripts/` y cree un nuevo archivo llamado `deploy.js`, agregando los siguientes contenidos:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat hace un trabajo increíble al explicar lo que hace cada una de estas líneas de código en su [tutorial de contratos](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), aquí hemos asumido sus explicaciones.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Un `ContractFactory` en ethers.js es una abstracción utilizada para desplegar nuevos contratos inteligentes, por lo que aquí, `HelloWorld` es una fábrica de instancias de nuestro contrato Hola, mundo. Al usar el plugin `hardhat-ethers`, las instancias `ContractFactory` y `Contract` están conectadas por defecto al primer firmante.

```
const hello_world = await HelloWorld.deploy();
```

Ejecutar `deploy()` en una `ContractFactory` iniciará el despliegue, y obtendrá un `Promise` que determina un `Contract`. Este es el objeto que tiene un método para cada una de nuestras funciones de contrato inteligente.

## Paso 16: Desplegar nuestro contrato {#step-16-deploy-our-contract}

¡Por fin estamos listos para desplegar nuestro contrato inteligente! Desde la linea de comandos, ejecute:

```
npx hardhat run scripts/deploy.js --network ropsten
```

Debería mostrarse algo parecido a esto:

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Si vamos a la dirección [Ropsten etherscan](https://ropsten.etherscan.io/) y buscamos la dirección de nuestro contrato, podremos comprobar que se ha desplegado correctamente. El objeto de la transacción tendrá un aspecto parecido a esto:

![contrato etherscan](./etherscan-contract.png)

La dirección `From` debe coincidir con su cuenta de MetaMask y la dirección de envío especificará «creación de contrato», pero al hacer click en la transacción veremos nuestra dirección en el campo `To`:

![transacción etherscan](./etherscan-transaction.png)

¡Enhorabuena! Acaba de desplegar un contrato inteligente en la cadena de Ethereum

Para entender lo que está pasando internamente, vayamos a la pestaña de Explorer en nuestro [panel Alchemy](https://dashboard.alchemyapi.io/explorer). Si tiene varias aplicaciones de Alchemy, asegúrese de filtrar por aplicación y seleccionar «Hola, mundo». ![Explorador Hola, mundo](./hello-world-explorer.png)

Aquí verá un puñado de ejecuciones JSON-RPC que Hardhat/Ethers hizo internamente por nosotros cuando ejecutamos a la función `.deploy()`. Dos solicitudes importantes a tener en cuenta aquí son [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), que es la solicitud de escribir nuestro contrato en la cadena Ropsten, y [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash) que es una solicitud para leer información sobre nuestra transacción a partir de un hash (un patrón típico cuando realizamos transacciones). Para saber más sobre el envío de transacciones, consulte el siguiente tutorial [Enviar transacciones usando Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)

Aquí acaba la parte 1 de este tutorial, en la parte 2, [Interacción con nuestro contrato inteligente](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#part-2-interact-with-your-smart-contract), actualizaremos nuestro mensaje inicial, y en la parte 3 [Publicación de nuestro contrato inteligente en Etherscan](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#optional-part-3-publish-your-smart-contract-to-etherscan), veremos como publicar para que todo el mundo sepa cómo interactuar con él.

**¿Quiere saber más sobre Alchemy? Eche un vistazo a nuestra página web [](https://alchemyapi.io/eth). ¿No quiere perderse ninguna actualización? Suscríbase [aquí](https://www.alchemyapi.io/newsletter) a nuestro boletín de noticias. Asegúrese de seguir también nuestro [Twitter](https://twitter.com/alchemyplatform) y unirse a nuestro [Discord](https://discord.com/invite/u72VCg3)**.
