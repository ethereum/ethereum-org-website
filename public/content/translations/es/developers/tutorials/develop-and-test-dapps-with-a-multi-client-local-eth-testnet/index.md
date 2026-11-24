---
title: "Cómo desarrollar y probar una dapp en una red de prueba local multicliente"
description: "Esta guía le mostrará primero cómo instanciar y configurar una red de prueba local multicliente de Ethereum antes de usarla para desplegar y probar una dapp."
author: "Tedi Mitiku"
tags:
  [
    "clientes",
    "nodos",
    "contratos inteligentes",
    "componibilidad",
    "capa de consenso",
    "capa de ejecución",
    "pruebas",
  ]
skill: intermediate
breadcrumb: Red de prueba multicliente
lang: es
published: 2023-04-11
---

## Introducción {#introduction}

Esta guía le muestra el proceso de instanciar una red de prueba local y configurable de Ethereum, desplegar un contrato inteligente en ella y usar la red de prueba para ejecutar pruebas en su aplicación descentralizada (dapp). Esta guía está diseñada para desarrolladores de dapps que desean desarrollar y probar sus dapps localmente en diferentes configuraciones de red antes de desplegarlas en una red de prueba en vivo o en la Red principal.

En esta guía, usted:

- Instanciará una red de prueba local de Ethereum con el [`ethereum-package`](https://github.com/ethpandaops/ethereum-package) usando [Kurtosis](https://www.kurtosis.com/),
- Conectará su entorno de desarrollo de dapps Hardhat a la red de prueba local para compilar, desplegar y probar una dapp, y
- Configurará la red de prueba local, incluyendo parámetros como el número de nodos y emparejamientos específicos de clientes de la capa de ejecución (EL) y la capa de consenso (CL), para habilitar flujos de trabajo de desarrollo y pruebas en varias configuraciones de red.

### ¿Qué es Kurtosis? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) es un sistema de construcción componible diseñado para configurar entornos de prueba multicontenedor. Permite específicamente a los desarrolladores crear entornos reproducibles que requieren una lógica de configuración dinámica, como las redes de prueba de cadenas de bloques.

En esta guía, el `ethereum-package` de Kurtosis, mantenido por [ethPandaOps](https://ethpandaops.io/), pone en marcha una red de prueba local de Ethereum. Es compatible con todos los principales clientes de la capa de ejecución (EL), como [`geth`](https://geth.ethereum.org/), y clientes de la capa de consenso (CL), como [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/) y [`lodestar`](https://lodestar.chainsafe.io/). Este paquete sirve como una alternativa configurable y componible a las redes en marcos de trabajo como Hardhat Network y Anvil. Kurtosis ofrece a los desarrolladores un mayor control y flexibilidad sobre las redes de prueba que utilizan, lo cual es una de las principales razones por las que los equipos de clientes de Ethereum lo usan para probar las actualizaciones de la red.

## Configuración de Kurtosis {#setting-up-kurtosis}

Antes de continuar, asegúrese de haber:

- [Instalado e iniciado el motor de Docker](https://docs.kurtosis.com/install/#i-install--start-docker) en su máquina local
- [Instalado la CLI de Kurtosis](https://docs.kurtosis.com/install#ii-install-the-cli) (o haberla actualizado a la última versión, si ya la tiene instalada)
- Instalado [Node.js](https://nodejs.org/en) (para su entorno de dapp)

## Instanciación de una red de prueba local de Ethereum {#instantiate-testnet}

Para poner en marcha una red de prueba local de Ethereum, ejecute:

```sh
kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package
```

Nota: Este comando nombra a su red "local-eth-testnet" usando la bandera `--enclave`.

Kurtosis imprimirá los pasos que está realizando internamente mientras trabaja para interpretar, validar y luego ejecutar las instrucciones. Al final, imprime un resumen del enclave que creó. El resumen incluye una lista de **artefactos de archivos** y una lista de **servicios de usuario**. Con la configuración predeterminada, los servicios de usuario incluyen un solo nodo:

- `el-1-geth-lighthouse`, el cliente de ejecución `geth`
- `cl-1-lighthouse-geth`, el nodo baliza `lighthouse`
- `vc-1-geth-lighthouse`, el cliente validador `lighthouse`

Cada servicio se enumera con los puertos que expone y el puerto local al que está mapeado cada uno. Por ejemplo, el puerto `rpc` del servicio `el-1-geth-lighthouse` es el punto de conexión JSON-RPC que usarán sus herramientas de dapp. Los servicios exactos y los números de puerto serán diferentes en su máquina.

Puede ver este resumen de nuevo en cualquier momento ejecutando:

```sh
kurtosis enclave inspect local-eth-testnet
```

¡Felicidades! Ha usado Kurtosis para instanciar una red de prueba local de Ethereum, con un cliente de la capa de consenso (`lighthouse`) y un cliente de la capa de ejecución (`geth`), sobre Docker.

### Repaso {#review-instantiate-testnet}

En esta sección, ejecutó un comando que indicó a Kurtosis que usara el [`ethereum-package` alojado de forma remota en GitHub](https://github.com/ethpandaops/ethereum-package) para poner en marcha una red de prueba local de Ethereum dentro de un [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) de Kurtosis. Dentro de su enclave, encontrará tanto "artefactos de archivos" como "servicios de usuario".

Los [Artefactos de archivos](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) en su enclave incluyen todos los datos generados y utilizados para arrancar los clientes de la capa de ejecución y la capa de consenso, como los archivos génesis y las claves del validador. Los datos génesis se crearon usando el [ethereum-genesis-generator](https://github.com/ethpandaops/ethereum-genesis-generator).

Los servicios de usuario muestran todos los servicios en contenedores que operan en su enclave. Notará que se ha creado un solo nodo, que cuenta tanto con un cliente de la capa de ejecución como con un cliente de la capa de consenso.

## Conecte su entorno de desarrollo de dapps a la red de prueba local de Ethereum {#connect-your-dapp}

### Configuración del entorno de desarrollo de dapps {#set-up-dapp-env}

Ahora que tiene una red de prueba local en funcionamiento, puede conectar su entorno de desarrollo de dapps para usar su red de prueba local. En esta guía se usará el marco de trabajo Hardhat para desplegar una dapp de blackjack en su red de prueba local.

Para configurar su entorno de desarrollo de dapps, clone el repositorio que contiene nuestra dapp de muestra e instale sus dependencias, ejecute:

```sh
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git
cd awesome-kurtosis/smart-contract-example
npm install --legacy-peer-deps
```

La bandera `--legacy-peer-deps` es necesaria porque algunos de los complementos de Hardhat del proyecto de muestra declaran versiones de dependencias de pares conflictivas.

La carpeta [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) usada aquí contiene la configuración típica para un desarrollador de dapps que usa el marco de trabajo [Hardhat](https://hardhat.org/):

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) contiene algunos contratos inteligentes simples para una dapp de Blackjack
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) contiene un script para desplegar un contrato de token en su red local de Ethereum
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) contiene una prueba simple en .js para su contrato de token para confirmar que a cada jugador en nuestra dapp de Blackjack se le han acuñado 1000
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) configura su entorno de Hardhat

### Configuración de Hardhat para usar la red de prueba local {#configure-hardhat}

Con su entorno de desarrollo de dapps configurado, ahora conectará Hardhat para usar la red de prueba local de Ethereum generada usando Kurtosis. Primero, encuentre la dirección local del punto de conexión JSON-RPC del cliente de ejecución:

```sh
kurtosis port print local-eth-testnet el-1-geth-lighthouse rpc
```

La salida es una URL como `http://127.0.0.1:32769`. Su puerto será diferente. Reemplace `<PORT>` en la estructura `localnet` en su archivo de configuración `hardhat.config.ts` con este puerto.

Ejemplo en `hardhat.config.ts`:

```js
localnet: {
  url: 'http://127.0.0.1:<PORT>',//TODO: REEMPLAZAR <PORT> CON EL PUERTO DE UN URI DE NODO PRODUCIDO POR EL PAQUETE KURTOSIS DE LA RED ETH
  // Estas son claves privadas asociadas con cuentas de prueba prefinanciadas creadas por el eth-network-package
  //https://github.com/ethpandaops/ethereum-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star
  accounts: [
    "bcdf20249abf0ed6d944c0288fad489e33f66b3960d9e6229c1cd214ed3bbe31",
    "53321db7c1e331d93a11a41d16f004d7ff63972ec8ec7c25db329728ceeb1710",
    "ab63b23eb7941c1251757e24b3d2350d2bc05c3c388d06f8fe6feafefb1e8c70",
    "5d2344259f42259f82d2c140aa66102ba89b57b4883ee441a8b312622bd42491",
    "27515f805127bebad2fb9b183508bdacb8c763da16f54e0678b16e8f28ef3fff",
    "7ff1a4c1d57e5e784d327c4c7651e952350bc271f156afb3d00d20f5ef924856",
  ],
},
```

Estas claves privadas son claves de prueba conocidas públicamente. Nunca las use en la Red principal ni en ninguna red pública.

Una vez que guarde su archivo, ¡su entorno de desarrollo de dapps Hardhat estará conectado a su red de prueba local de Ethereum! Puede verificar que su red de prueba está funcionando ejecutando:

```sh
npx hardhat balances --network localnet
```

La salida enumera la dirección y el saldo de cada una de las cuentas anteriores. Por ejemplo, la primera línea debería verse así:

```
0x8943545177806ED17B9F23F0a21ee5948eCaa776 has balance <a large balance>
```

Esto confirma que Hardhat está usando su red de prueba local y detecta las cuentas prefinanciadas creadas por el `ethereum-package`.

### Despliegue y prueba de su dapp localmente {#deploy-and-test-dapp}

Con el entorno de desarrollo de dapps completamente conectado a la red de prueba local de Ethereum, ahora puede ejecutar flujos de trabajo de desarrollo y pruebas en su dapp usando la red de prueba local.

Para compilar y desplegar el contrato inteligente `ChipToken.sol` para la creación de prototipos y el desarrollo local, ejecute:

```sh
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

La salida debería verse algo así:

```
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Ahora intente ejecutar la prueba `ChipToken.js` en su dapp local para confirmar que a cada jugador en nuestra dapp de Blackjack se le han acuñado 1000. La prueba de muestra todavía usa la función `deployed()` de ethers v5, que ethers v6 reemplazó con `waitForDeployment()`, así que actualícela primero:

```sh
sed -i.bak 's/\.deployed()/.waitForDeployment()/' test/ChipToken.js
```

Luego ejecute la prueba:

```sh
npx hardhat test --network localnet
```

La salida debería verse algo así:

```
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### Repaso {#review-dapp-workflows}

En este punto, ya ha configurado un entorno de desarrollo de dapps, lo ha conectado a una red local de Ethereum creada por Kurtosis, y ha compilado, desplegado y ejecutado una prueba simple en su dapp.

Ahora exploremos cómo puede configurar la red subyacente para probar nuestras dapps bajo diferentes configuraciones de red.

## Configuración de la red de prueba local de Ethereum {#configure-testnet}

### Cambio de las configuraciones de los clientes y el número de nodos {#configure-client-config-and-num-nodes}

Su red de prueba local de Ethereum se puede configurar para usar diferentes pares de clientes de la capa de ejecución y la capa de consenso, así como un número variable de nodos, dependiendo del escenario y la configuración de red específica que desee desarrollar o probar. Esto significa que, una vez configurada, puede poner en marcha una red de prueba local personalizada y usarla para ejecutar los mismos flujos de trabajo (despliegue, pruebas, etc.) bajo varias configuraciones de red para asegurarse de que todo funcione como se espera. Para obtener más información sobre los otros parámetros que puede modificar, consulte [la documentación de configuración del `ethereum-package`](https://github.com/ethpandaops/ethereum-package#configuration).

¡Pruébelo! Puede pasar varias opciones de configuración al `ethereum-package` a través de un archivo YAML. Este archivo de parámetros de red proporciona las configuraciones específicas que Kurtosis usará para configurar la red local de Ethereum.

Cree un archivo llamado `network_params.yaml` que ponga en marcha tres nodos con diferentes pares de clientes de la capa de ejecución y la capa de consenso:

- Nodo 1 con `geth`/`lighthouse`
- Nodo 2 con `geth`/`lodestar`
- Nodo 3 con `geth`/`teku`

Esta configuración crea una red heterogénea de implementaciones de nodos de Ethereum para probar su dapp. Su archivo de configuración debería verse así:

```yaml
participants:
  - el_type: geth
    cl_type: lighthouse
  - el_type: geth
    cl_type: lodestar
  - el_type: geth
    cl_type: teku
network_params:
  seconds_per_slot: 12
```

Cada entrada en `participants` se mapea a un nodo en la red, por lo que 3 entradas de `participants` le dirán a Kurtosis que ponga en marcha 3 nodos en su red. Cada entrada le permite especificar el par de clientes de la capa de ejecución y la capa de consenso usado para ese nodo específico. Cualquier parámetro que no especifique mantendrá sus valores predeterminados.

La estructura `network_params` configura los ajustes de red que se usan para crear los archivos génesis para cada nodo, así como otros ajustes como los segundos por slot de la red.

Guarde su archivo de parámetros y luego úselo para ejecutar su paquete de Kurtosis ejecutando:

```sh
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package --args-file ./network_params.yaml
```

Nota: el comando `kurtosis clean -a` se usa aquí para indicar a Kurtosis que destruya la antigua red de prueba y su contenido antes de iniciar una nueva.

De nuevo, Kurtosis trabajará un poco e imprimirá los pasos individuales que se están llevando a cabo. Eventualmente, imprime el resumen del enclave. Esta vez, los servicios de usuario incluyen tres nodos, por ejemplo `el-1-geth-lighthouse`, `el-2-geth-lodestar` y `el-3-geth-teku` para los clientes de ejecución, junto con los clientes de consenso y validadores correspondientes.

¡Felicidades! Ha configurado con éxito su red de prueba local para tener 3 nodos en lugar de 1. Para ejecutar los mismos flujos de trabajo que hizo antes en su dapp (desplegar y probar), realice las mismas operaciones que hicimos antes reemplazando el `<PORT>` en la estructura `localnet` en su archivo de configuración `hardhat.config.ts` con el puerto `rpc` de cualquier servicio `el-<num>-...` en su nueva red de prueba local de 3 nodos.

## Conclusión {#conclusion}

¡Y eso es todo! Para recapitular esta breve guía, usted:

- Creó una red de prueba local de Ethereum sobre Docker usando Kurtosis
- Conectó su entorno de desarrollo de dapps local a la red local de Ethereum
- Desplegó una dapp y ejecutó una prueba simple en ella en la red local de Ethereum
- Configuró la red subyacente de Ethereum para tener 3 nodos

Nos encantaría saber de usted sobre qué le funcionó bien, qué se podría mejorar o responder a cualquiera de sus preguntas. ¡No dude en comunicarse a través de [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose)!

### Otros ejemplos y guías {#other-examples-guides}

Le animamos a consultar nuestro [inicio rápido](https://docs.kurtosis.com/quickstart) y nuestros otros ejemplos en nuestro [repositorio awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis).

El `ethereum-package` también puede iniciar servicios adicionales junto a su red, como un generador de spam de transacciones (para simular transacciones), un explorador de bloques e instancias conectadas de Grafana y Prometheus. Para habilitarlos, enumérelos bajo `additional_services` en su archivo de parámetros, como se describe en [la documentación del paquete](https://github.com/ethpandaops/ethereum-package#configuration).
