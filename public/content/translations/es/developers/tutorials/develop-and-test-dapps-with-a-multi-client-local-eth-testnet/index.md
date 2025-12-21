---
title: Cómo desarrollar y probar una dApp en una red de prueba local multicliente
description: Esta guía primero le guiará a través de cómo instanciar y configurar una red de prueba local multicliente de Ethereum antes de usar la red de prueba para desplegar y probar una dApp.
author: "Tedi Mitiku"
tags:
  [
    "clientes",
    "nodos",
    "contratos Inteligentes",
    "composabilidad",
    "capa de consenso",
    "capa de ejecución",
    "pruebas"
  ]
skill: intermediate
lang: es
published: 2023-04-11
---

## Introducción {#introduction}

Esta guía le guía a través del proceso de instanciación de una red de prueba local configurable de Ethereum, desplegando un contrato inteligente en ella y usando la red de prueba para ejecutar pruebas en su dApp. Esta guía está diseñada para desarrolladores de dApps que desean desarrollar y probar sus dApps localmente con diferentes configuraciones de red antes de desplegarlas en una red de prueba activa o en la red principal.

En esta guía, usted:

- Instanciar una red de prueba local de Ethereum con el [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) usando [Kurtosis](https://www.kurtosis.com/),
- Conectar su entorno de desarrollo de dApps Hardhat a la red de prueba local para compilar, desplegar y probar una dApp, y
- Configurar la red de prueba local, incluyendo parámetros como el número de nodos y emparejamientos específicos de clientes EL/CL, para permitir flujos de trabajo de desarrollo y prueba con varias configuraciones de red.

### ¿Qué es Kurtosis? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) es un sistema de compilación componible diseñado para configurar entornos de prueba de múltiples contenedores. Permite específicamente a los desarrolladores crear entornos reproducibles que requieren una lógica de configuración dinámica, como las redes de prueba de la cadena de bloques.

En esta guía, el paquete eth-network-package de Kurtosis pone en marcha una red de prueba local de Ethereum con soporte para el cliente de la capa de ejecución (EL) [`geth`](https://geth.ethereum.org/), así como para los clientes de la capa de consenso (CL) [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/) y [`lodestar`](https://lodestar.chainsafe.io/). Este paquete sirve como una alternativa configurable y componible a las redes en marcos como Hardhat Network, Ganache y Anvil. Kurtosis ofrece a los desarrolladores un mayor control y flexibilidad sobre las redes de prueba que utilizan, que es una razón importante por la que la [Ethereum Foundation utilizó Kurtosis para probar la Fusión](https://www.kurtosis.com/blog/testing-the-ethereum-merge) y continúa usándolo para probar las actualizaciones de la red.

## Configuración de Kurtosis {#setting-up-kurtosis}

Antes de continuar, asegúrese de que tiene:

- [Instalado e iniciado el motor Docker](https://docs.kurtosis.com/install/#i-install--start-docker) en su máquina local
- [Instalado el CLI de Kurtosis](https://docs.kurtosis.com/install#ii-install-the-cli) (o actualizado a la última versión, si ya tiene el CLI instalado)
- Instalado [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), y [npx](https://www.npmjs.com/package/npx) (para su entorno de dApp)

## Instanciar una red de prueba local de Ethereum {#instantiate-testnet}

Para poner en marcha una red de prueba local de Ethereum, ejecute:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

Nota: Este comando nombra su red como: "local-eth-testnet" usando la bandera `--enclave`.

Kurtosis imprimirá los pasos que está realizando internamente mientras trabaja para interpretar, validar y luego ejecutar las instrucciones. Al final, debería ver una salida que se parezca a la siguiente:

```python
INFO[2023-04-04T18:09:44-04:00] ======================================================
INFO[2023-04-04T18:09:44-04:00] ||          Created enclave: local-eth-testnet      ||
INFO[2023-04-04T18:09:44-04:00] ======================================================
Name:            local-eth-testnet
UUID:            39372d756ae8
Status:          RUNNING
Creation Time:   Tue, 04 Apr 2023 18:09:03 EDT

========================================= Files Artifacts =========================================
UUID           Name
d4085a064230   cl-genesis-data
1c62cb792e4c   el-genesis-data
bd60489b73a7   genesis-generation-config-cl
b2e593fe5228   genesis-generation-config-el
d552a54acf78   geth-prefunded-keys
5f7e661eb838   prysm-password
054e7338bb59   validator-keystore-0

========================================== User Services ==========================================
UUID           Name                                           Ports                                         Status
e20f129ee0c5   cl-client-0-beacon                             http: 4000/tcp -> <http://127.0.0.1:54261>    RUNNING
                                                              metrics: 5054/tcp -> <http://127.0.0.1:54262>
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:54263
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60470
a8b6c926cdb4   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:54267             RUNNING
                                                              metrics: 5064/tcp -> <http://127.0.0.1:54268>
d7b802f623e8   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:54253       RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:54251
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:54254
                                                              udp-discovery: 30303/udp -> 127.0.0.1:53834
                                                              ws: 8546/tcp -> 127.0.0.1:54252
514a829c0a84   prelaunch-data-generator-1680646157905431468   <none>                                        STOPPED
62bd62d0aa7a   prelaunch-data-generator-1680646157915424301   <none>                                        STOPPED
05e9619e0e90   prelaunch-data-generator-1680646157922872635   <none>                                        STOPPED

```

¡Felicitaciones! Ha utilizado Kurtosis para instanciar una red de prueba local de Ethereum, con un cliente de CL (`lighthouse`) y un cliente de EL (`geth`), sobre Docker.

### Revisión {#review-instantiate-testnet}

En esta sección, ejecutó un comando que ordenó a Kurtosis que utilizara el [`eth-network-package` alojado de forma remota en GitHub](https://github.com/kurtosis-tech/eth-network-package) para poner en marcha una red de prueba local de Ethereum dentro de un [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) de Kurtosis. Dentro de su enclave, encontrará tanto "artefactos de archivo" como "servicios de usuario".

Los [Artefactos de archivo](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) en su enclave incluyen todos los datos generados y utilizados para arrancar los clientes EL y CL. Los datos se crearon utilizando el servicio `prelaunch-data-generator` creado a partir de esta [imagen de Docker](https://github.com/ethpandaops/ethereum-genesis-generator)

Los servicios de usuario muestran todos los servicios en contenedores que operan en su enclave. Notará que se ha creado un único nodo, que cuenta con un cliente de EL y un cliente de CL.

## Conecte su entorno de desarrollo de dApp a la red de prueba local de Ethereum {#connect-your-dapp}

### Configurar el entorno de desarrollo de dApp {#set-up-dapp-env}

Ahora que tiene una red de prueba local en funcionamiento, puede conectar su entorno de desarrollo de dApp para usar su red de prueba local. El marco Hardhat se utilizará en esta guía para desplegar una dApp de blackjack en su red de prueba local.

Para configurar su entorno de desarrollo de dApp, clone el repositorio que contiene nuestra dApp de muestra e instale sus dependencias, ejecute:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

La carpeta [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) utilizada aquí contiene la configuración típica para un desarrollador de dApp que utiliza el marco [Hardhat](https://hardhat.org/):

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) contiene algunos contratos inteligentes simples para una dApp de Blackjack
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) contiene un script para desplegar un contrato de token en su red local de Ethereum
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) contiene una prueba simple .js para su contrato de token para confirmar que a cada jugador en nuestra dApp de Blackjack se le hayan acuñado 1000
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) configura su instalación de Hardhat

### Configurar Hardhat para usar la red de prueba local {#configure-hardhat}

Con su entorno de desarrollo de dApp configurado, ahora conectará Hardhat para usar la red de prueba local de Ethereum generada usando Kurtosis. Para lograr esto, reemplace `<$YOUR_PORT>` en la estructura `localnet` en su archivo de configuración `hardhat.config.ts` con el puerto de la salida del URI rpc de cualquier servicio `el-client-<num>`. En este caso de muestra, el puerto sería `64248`. Su puerto será diferente.

Ejemplo en `hardhat.config.ts`:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: REEMPLACE $YOUR_PORT CON EL PUERTO DE UN URI DE NODO PRODUCIDO POR EL PAQUETE DE RED ETH DE KURTOSIS

// Estas son claves privadas asociadas con cuentas de prueba prefinanciadas creadas por el paquete de red eth
// <https://github.com/kurtosis-tech/eth-network-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star>
accounts: [
    "ef5177cd0b6b21c87db5a0bf35d4084a8a57a9d6a064f86d51ac85f2b873a4e2",
    "48fcc39ae27a0e8bf0274021ae6ebd8fe4a0e12623d61464c498900b28feb567",
    "7988b3a148716ff800414935b305436493e1f25237a2a03e5eebc343735e2f31",
    "b3c409b6b0b3aa5e65ab2dc1930534608239a478106acf6f3d9178e9f9b00b35",
    "df9bb6de5d3dc59595bcaa676397d837ff49441d211878c024eabda2cd067c9f",
    "7da08f856b5956d40a72968f93396f6acff17193f013e8053f6fbb6c08c194d6",
  ],
},
```

Una vez que guarde el archivo, ¡su entorno de desarrollo de dApps Hardhat estará conectado a su red de prueba local de Ethereum! Puede verificar que su red de prueba funciona ejecutando:

```python
npx hardhat balances --network localnet
```

La salida debería parecerse a esto:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

Esto confirma que Hardhat está usando su red de prueba local y detecta las cuentas prefinanciadas creadas por el `eth-network-package`.

### Despliegue y pruebe su dApp localmente {#deploy-and-test-dapp}

Con el entorno de desarrollo de dApp totalmente conectado a la red de prueba local de Ethereum, ahora puede ejecutar flujos de trabajo de desarrollo y prueba en su dApp utilizando la red de prueba local.

Para compilar y desplegar el contrato inteligente `ChipToken.sol` para prototipos y desarrollo local, ejecute:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

La salida debería ser algo como:

```python
ChipToken desplegado en: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Ahora intente ejecutar la prueba `simple.js` en su dApp local para confirmar que a cada jugador de nuestra dApp de Blackjack se le hayan acuñado 1000:

La salida debería parecerse a esto:

```python
npx hardhat test --network localnet
```

La salida debería parecerse a esto:

```python
ChipToken
    mint
      ✔ debería acuñar 1000 fichas para PLAYER ONE

  1 aprobada (654ms)
```

### Revisión {#review-dapp-workflows}

En este punto, ya ha configurado un entorno de desarrollo de dApp, lo ha conectado a una red local de Ethereum creada por Kurtosis, y ha compilado, desplegado y ejecutado una prueba simple en su dApp.

Ahora exploremos cómo puede configurar la red subyacente para probar nuestras dApps bajo diversas configuraciones de red.

## Configuración de la red de prueba local de Ethereum {#configure-testnet}

### Cambio de las configuraciones del cliente y el número de nodos {#configure-client-config-and-num-nodes}

Su red de prueba local de Ethereum puede configurarse para usar diferentes pares de clientes EL y CL, así como un número variable de nodos, dependiendo del escenario y la configuración de red específica que desee desarrollar o probar. Esto significa que, una vez configurada, puede poner en marcha una red de prueba local personalizada y utilizarla para ejecutar los mismos flujos de trabajo (despliegue, pruebas, etc.) bajo varias configuraciones de red para garantizar que todo funcione como se espera. Para obtener más información sobre los otros parámetros que puede modificar, visite este enlace.

¡Pruébelo! Puede pasar varias opciones de configuración al `eth-network-package` a través de un archivo JSON. Este archivo JSON de parámetros de red proporciona las configuraciones específicas que Kurtosis utilizará para configurar la red local de Ethereum.

Tome el archivo de configuración predeterminado y edítelo para poner en marcha dos nodos con diferentes pares EL/CL:

- Nodo 1 con `geth`/`lighthouse`
- Nodo 2 con `geth`/`lodestar`
- Nodo 3 con `geth`/`teku`

Esta configuración crea una red heterogénea de implementaciones de nodos de Ethereum para probar su dApp. Su archivo de configuración debería tener este aspecto:

```yaml
{
  "participants":
    [
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lighthouse",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lodestar",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "teku",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
    ],
  "network_params":
    {
      "preregistered_validator_keys_mnemonic": "giant issue aisle success illegal bike spike question tent bar rely arctic volcano long crawl hungry vocal artwork sniff fantasy very lucky have athlete",
      "num_validator_keys_per_node": 64,
      "network_id": "3151908",
      "deposit_contract_address": "0x4242424242424242424242424242424242424242",
      "seconds_per_slot": 12,
      "genesis_delay": 120,
      "capella_fork_epoch": 5,
    },
}
```

Cada estructura de `participants` se corresponde con un nodo de la red, por lo que 3 estructuras de `participants` le indicarán a Kurtosis que ponga en marcha 3 nodos en su red. Cada estructura de `participants` le permitirá especificar el par EL y CL utilizado para ese nodo específico.

La estructura `network_params` configura los ajustes de red que se utilizan para crear los archivos de génesis para cada nodo, así como otros ajustes como los segundos por ranura de la red.

Guarde el archivo de parámetros editado en el directorio que desee (en el siguiente ejemplo, se guarda en el escritorio) y, a continuación, utilícelo para ejecutar su paquete Kurtosis ejecutando:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

Nota: el comando `kurtosis clean -a` se utiliza aquí para indicar a Kurtosis que destruya la antigua red de prueba y su contenido antes de iniciar una nueva.

De nuevo, Kurtosis funcionará durante un rato e imprimirá los pasos individuales que se están llevando a cabo. Finalmente, la salida debería ser algo como:

```python
Código Starlark ejecutado con éxito. No se devolvió ninguna salida.
INFO[2023-04-07T11:43:16-04:00] ==========================================================
INFO[2023-04-07T11:43:16-04:00] ||          Created enclave: local-eth-testnet          ||
INFO[2023-04-07T11:43:16-04:00] ==========================================================
Name:            local-eth-testnet
UUID:            bef8c192008e
Status:          RUNNING
Creation Time:   Fri, 07 Apr 2023 11:41:58 EDT

========================================= Files Artifacts =========================================
UUID           Name
cc495a8e364a   cl-genesis-data
7033fcdb5471   el-genesis-data
a3aef43fc738   genesis-generation-config-cl
8e968005fc9d   genesis-generation-config-el
3182cca9d3cd   geth-prefunded-keys
8421166e234f   prysm-password
d9e6e8d44d99   validator-keystore-0
23f5ba517394   validator-keystore-1
4d28dea40b5c   validator-keystore-2

========================================== User Services ==========================================
UUID           Name                                           Ports                                            Status
485e6fde55ae   cl-client-0-beacon                             http: 4000/tcp -> http://127.0.0.1:65010         RUNNING
                                                              metrics: 5054/tcp -> http://127.0.0.1:65011
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65012
                                                              udp-discovery: 9000/udp -> 127.0.0.1:54455
73739bd158b2   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:65016                RUNNING
                                                              metrics: 5064/tcp -> http://127.0.0.1:65017
1b0a233cd011   cl-client-1-beacon                             http: 4000/tcp -> 127.0.0.1:65021                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65023
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65024
                                                              udp-discovery: 9000/udp -> 127.0.0.1:56031
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65022
949b8220cd53   cl-client-1-validator                          http: 4000/tcp -> 127.0.0.1:65028                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65030
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65031
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60784
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65029
c34417bea5fa   cl-client-2                                    http: 4000/tcp -> 127.0.0.1:65037                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65035
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65036
                                                              udp-discovery: 9000/udp -> 127.0.0.1:63581
e19738e6329d   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:64986          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64988
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64987
                                                              udp-discovery: 30303/udp -> 127.0.0.1:55706
                                                              ws: 8546/tcp -> 127.0.0.1:64989
e904687449d9   el-client-1                                    engine-rpc: 8551/tcp -> 127.0.0.1:64993          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64995
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64994
                                                              udp-discovery: 30303/udp -> 127.0.0.1:58096
                                                              ws: 8546/tcp -> 127.0.0.1:64996
ad6f401126fa   el-client-2                                    engine-rpc: 8551/tcp -> 127.0.0.1:65003          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:65001
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:65000
                                                              udp-discovery: 30303/udp -> 127.0.0.1:57269
                                                              ws: 8546/tcp -> 127.0.0.1:65002
12d04a9dbb69   prelaunch-data-generator-1680882122181135513   <none>                                           STOPPED
5b45f9c0504b   prelaunch-data-generator-1680882122192182847   <none>                                           STOPPED
3d4aaa75e218   prelaunch-data-generator-1680882122201668972   <none>                                           STOPPED
```

¡Felicitaciones! Ha configurado correctamente su red de prueba local para que tenga 3 nodos en lugar de 1. Para ejecutar los mismos flujos de trabajo que antes en su dApp (despliegue y prueba), realice las mismas operaciones que hicimos antes reemplazando `<$YOUR_PORT>` en la estructura `localnet` en su archivo de configuración `hardhat.config.ts` con el puerto de la salida del URI rpc de cualquier servicio `el-client-<num>` en su nueva red de prueba local de 3 nodos.

## Conclusión {#conclusion}

¡Y eso es todo! Para recapitular esta breve guía, usted:

- Creó una red de prueba local de Ethereum sobre Docker usando Kurtosis
- Conectó su entorno de desarrollo de dApp local a la red local de Ethereum
- Desplegó una dApp y ejecutó una prueba simple en ella en la red local de Ethereum
- Configuró la red subyacente de Ethereum para tener 3 nodos

Nos encantaría saber qué le ha parecido, qué se podría mejorar o responder a cualquiera de sus preguntas. No dude en ponerse en contacto con nosotros a través de [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) o [envíenos un correo electrónico](mailto:feedback@kurtosistech.com).

### Otros ejemplos y guías {#other-examples-guides}

Le animamos a que consulte nuestro [inicio rápido](https://docs.kurtosis.com/quickstart) (donde creará una base de datos Postgres y una API sobre ella) y nuestros otros ejemplos en nuestro [repositorio awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis) donde encontrará algunos ejemplos geniales, incluyendo paquetes para:

- Poner en marcha la misma red de prueba local de Ethereum, pero con servicios adicionales conectados como un generador de spam de transacciones (para simular transacciones), un monitor de bifurcaciones y una instancia conectada de Grafana y Prometheus
- Realizar una [prueba de subredes](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) en la misma red local de Ethereum
