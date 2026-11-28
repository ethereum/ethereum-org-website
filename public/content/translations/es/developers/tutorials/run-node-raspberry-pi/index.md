---
title: Ejecutar un nodo de Ethereum en una Raspberry Pi 5
description: Flashee su Raspberry Pi 5, conecte un cable ethernet, conecte el disco NVMe y encienda el dispositivo para convertir la Raspberry Pi 5 en un nodo completo de Ethereum + validador
author: "EthereumOnArm"
tags: ["clientes", "capa de ejecución", "capa de consenso", "nodos"]
lang: es
skill: intermediate
breadcrumb: Nodo en Rasp Pi
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm es una imagen de Linux personalizada que puede convertir una Raspberry Pi en un nodo de Ethereum.**

Para usar Ethereum on Arm para convertir una Raspberry Pi en un nodo de Ethereum, se recomienda el siguiente hardware:

- Raspberry Pi 5 con 16 GB de RAM
- Un HAT NVMe para la Raspberry Pi 5, para conectar un disco NVMe
- SSD NVMe (M.2 2280), 4 TB mínimo. Evite los discos con un controlador Phison, que tienen problemas de compatibilidad conocidos.
- Tarjeta MicroSD (16 GB Clase 10 mínimo)
- Fuente de alimentación
- Cable ethernet
- Reenvío de puertos (consulte los clientes para obtener más información)
- Una carcasa con disipador de calor
- Teclado USB, monitor y cable HDMI (micro-HDMI) (Opcional)

Ethereum on Arm también es compatible con otras placas ARM, como NanoPC T6, Rock 5B y Orange Pi 5 Plus. Estas placas tienen soporte NVMe nativo, por lo que el equipo de Ethereum on Arm las recomienda sobre la Raspberry Pi 5 si está comprando hardware nuevo. Consulte la [lista de hardware recomendado](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/overview/supported-hardware.html) para obtener más detalles. El resto de este tutorial es el mismo para todas las placas compatibles, excepto por el archivo de imagen que descargue.

## ¿Por qué ejecutar Ethereum en ARM? {#why-run-ethereum-on-arm}

Las placas ARM son computadoras pequeñas, flexibles y muy asequibles. Son buenas opciones para ejecutar nodos de Ethereum porque se pueden comprar a bajo costo, configurar para que todos sus recursos se centren solo en el nodo, lo que las hace eficientes, consumen poca energía y son físicamente pequeñas, por lo que pueden caber discretamente en cualquier hogar. También es muy fácil poner en marcha nodos porque la MicroSD de la Raspberry Pi simplemente se puede flashear con una imagen precompilada, sin necesidad de descargar ni compilar software.

## ¿Cómo funciona? {#how-does-it-work}

La tarjeta de memoria de la Raspberry Pi se flashea con una imagen precompilada. Esta imagen contiene todo lo necesario para ejecutar un nodo de Ethereum. Con una tarjeta flasheada, todo lo que el usuario debe hacer es encender la Raspberry Pi. Todos los procesos necesarios para ejecutar el nodo se inician automáticamente. Esto funciona porque la tarjeta de memoria contiene un sistema operativo (SO) basado en Linux sobre el cual se ejecutan automáticamente procesos a nivel de sistema que convierten la unidad en un nodo de Ethereum.

Las imágenes de Ethereum on Arm se basan en una distribución de Linux de 64 bits que está optimizada para ejecutar un nodo de Ethereum, e incluyen clientes de Ethereum precompilados.

**Las imágenes se encargan de todos los pasos necesarios**, desde la configuración del entorno y el formateo del disco NVMe hasta la instalación del software de Ethereum.

## Nota sobre los clientes de ejecución y consenso {#note-on-execution-and-consensus-clients}

La imagen de Ethereum on Arm incluye clientes de ejecución y de consenso precompilados como servicios. Un nodo de Ethereum requiere que ambos clientes estén sincronizados y en ejecución. Solo se le requiere descargar y flashear la imagen y luego iniciar los servicios. La imagen está precargada con varios clientes de ejecución (como Geth, Nethermind, Besu, Erigon y Reth) y clientes de consenso (como Lighthouse, Prysm, Teku, Nimbus y Lodestar). Consulte la [documentación de Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/running-a-node/managing-clients.html) para ver la lista actual.

Debe elegir uno de cada uno para ejecutar: todos los clientes de ejecución son compatibles con todos los clientes de consenso. Este tutorial utiliza Geth y Lighthouse.

## Descarga de la imagen {#downloading-the-image}

La imagen de Ethereum on Arm es una imagen "plug and play" que instala y configura automáticamente tanto el cliente de ejecución como el de consenso, configurándolos para que se comuniquen entre sí y se conecten a la red de Ethereum. Todo lo que el usuario debe hacer es iniciar sus procesos usando un comando simple.

Descargue la última imagen para su placa desde la [página de descargas de Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/getting-started/installation.html#image-downloads). La página de descargas también enumera la suma de comprobación SHA256 de cada imagen. Verifique el archivo descargado con ella:

```sh
# Desde el directorio que contiene la imagen descargada
sha256sum ethonarm_rpi5_<version>.img.zip
# Compara la salida con el checksum en la página de descarga
```

## Flasheo de la MicroSD {#flashing-the-microsd}

La tarjeta MicroSD que se utilizará para la Raspberry Pi debe insertarse primero en una computadora de escritorio o portátil para que pueda ser flasheada. Luego, los siguientes comandos de terminal flashearán la imagen descargada en la tarjeta SD:

```shell
# verifica el nombre de la tarjeta MicroSD
sudo fdisk -l

>> sdxxx
```

Es muy importante escribir el nombre correctamente porque el siguiente comando incluye `dd` que borra por completo el contenido existente de la tarjeta antes de introducir la imagen en ella. Para continuar, navegue hasta el directorio que contiene la imagen comprimida:

```shell
# descomprime y flashea la imagen
unzip ethonarm_rpi5_<version>.img.zip
sudo dd bs=1M if=ethonarm_rpi5_<version>.img of=/dev/<sdxx> conv=fdatasync status=progress
```

La tarjeta ahora está flasheada, por lo que se puede insertar en la Raspberry Pi.

## Iniciar el nodo {#start-the-node}

Con la tarjeta SD insertada en la Raspberry Pi, conecte el cable ethernet y el disco NVMe, luego encienda la alimentación. El SO se iniciará y comenzará a realizar automáticamente las tareas preconfiguradas que convierten la Raspberry Pi en un nodo de Ethereum, incluido el formateo del disco NVMe y la instalación del software del cliente. Esto probablemente tomará de 10 a 15 minutos, y la placa se reinicia automáticamente cuando termina. No interrumpa la fuente de alimentación durante este tiempo.

Una vez que todo esté instalado y configurado, inicie sesión en el dispositivo a través de una conexión ssh o usando la terminal directamente si hay un monitor y un teclado conectados a la placa. Use la cuenta `ethereum` para iniciar sesión, ya que tiene los permisos necesarios para iniciar el nodo.

```shell
User: ethereum
Password: ethereum
```

Se le pedirá que cambie la contraseña predeterminada en su primer inicio de sesión. Hágalo, porque de lo contrario, cualquiera que pueda acceder a su nodo podría iniciar sesión con la contraseña predeterminada. El firewall del sistema está deshabilitado de forma predeterminada, por lo que si su nodo tiene una dirección IP pública, consulte la [guía de seguridad de Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/system/security.html) para habilitarlo.

Inicie primero el cliente de consenso. Abra el puerto 9000 (TCP y UDP) en su enrutador para que Lighthouse pueda encontrar y conectarse a sus pares. Luego habilite e inicie el servicio lighthouse, para que también se reinicie después de un reinicio:

```sh
sudo systemctl enable --now lighthouse-beacon
```

Verifique el cliente usando los registros:

```sh
sudo journalctl -u lighthouse-beacon -f
```

A continuación, inicie el cliente de ejecución. Abra el puerto 30303 (TCP y UDP) en su enrutador para que Geth pueda encontrar y conectarse a sus pares. Luego habilite e inicie el servicio geth:

```sh
sudo systemctl enable --now geth
```

Puede confirmar que se está ejecutando verificando los registros:

```sh
sudo journalctl -u geth -f
```

Tenga en cuenta que el cliente de consenso se sincronizará en unos minutos porque utiliza la sincronización de punto de control. El cliente de ejecución tardará más, potencialmente varias horas. Ambos clientes se ejecutan al mismo tiempo: el cliente de consenso le dice al cliente de ejecución qué bloque es la cabeza de la cadena, y el cliente de ejecución descarga y verifica los bloques hasta él.

¡Con los servicios de Geth y Lighthouse en ejecución y sincronizados, su Raspberry Pi ahora es un nodo de Ethereum! Lo más común es interactuar con la red de Ethereum usando la consola JavaScript de Geth, que se puede adjuntar al cliente Geth en el puerto 8545. También es posible enviar comandos formateados como objetos JSON usando una herramienta de solicitud como Curl. Vea más en la [documentación de Geth](https://geth.ethereum.org/).

La imagen también incluye un panel de Grafana que los usuarios más avanzados pueden usar para monitorear el estado de su nodo, navegando a `ipaddress:3000` en un navegador.

## Validadores {#validators}

Opcionalmente, también se puede agregar un validador al cliente de consenso. El software del validador permite que su nodo participe activamente en el consenso y proporciona a la red seguridad criptoeconómica. Usted es recompensado por este trabajo en ETH. Para ejecutar un validador, primero debe tener 32 ETH, que deben depositarse en el contrato de depósito. El depósito se puede realizar siguiendo la guía paso a paso en el [Launchpad](https://launchpad.ethereum.org/). Haga esto en una computadora de escritorio/portátil, pero no genere claves; esto se puede hacer directamente en la Raspberry Pi.

La herramienta [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) genera claves de validador. Las imágenes actuales la incluyen; si está ejecutando una imagen anterior, instálela primero. Luego genere las claves de depósito, reemplazando `<YOUR_ETH_ADDRESS>` con la dirección que debería recibir sus retiros:

```sh
sudo apt-get update
sudo apt-get install ethstaker-deposit-cli
cd && deposit new-mnemonic --num_validators 1 --execution_address <YOUR_ETH_ADDRESS> --chain mainnet
```

(O descargue [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) para ejecutarlo en una máquina aislada de la red (airgapped), y ejecute el comando `deposit new-mnemonic` allí)

¡Mantenga segura la frase mnemotécnica! El comando anterior generó dos archivos en el directorio `validator_keys`: las claves del validador y un archivo de datos de depósito. Los datos de depósito deben cargarse en el launchpad, por lo que deben copiarse de la Raspberry Pi a la computadora de escritorio/portátil. Esto se puede hacer usando una conexión ssh o cualquier otro método de copiar/pegar.

Una vez que el archivo de datos de depósito esté disponible en la computadora que ejecuta el launchpad, se puede arrastrar y soltar en `+` en la pantalla del launchpad. Siga las instrucciones en la pantalla para enviar una transacción al contrato de depósito.

De vuelta en la Raspberry Pi, se puede iniciar un validador. Esto requiere importar las claves del validador, configurar la dirección para cobrar las recompensas y luego iniciar el proceso del validador preconfigurado. El siguiente ejemplo es para Lighthouse; las instrucciones para otros clientes de consenso están disponibles en la [documentación de Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/staking/solo-staking.html):

```shell
# importa las claves del validador
lighthouse account validator import --directory=/home/ethereum/validator_keys

# configura la dirección de recompensa (reemplaza <YOUR_ETH_ADDRESS> con tu dirección)
sudo sed -i 's/changeme/<YOUR_ETH_ADDRESS>/' /etc/ethereum/lighthouse-validator.conf

# inicia el validador
sudo systemctl enable --now lighthouse-validator
```

¡Felicidades, ahora tiene un nodo completo de Ethereum y un validador ejecutándose en una Raspberry Pi!

## Más detalles {#more-details}

Esta página ofreció una descripción general de cómo configurar un nodo Geth-Lighthouse y un validador usando Raspberry Pi. Hay instrucciones más detalladas disponibles en el [sitio web de Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/).

## Se agradecen los comentarios {#feedback-appreciated}

Sabemos que la Raspberry Pi tiene una base de usuarios masiva que podría tener un impacto muy positivo en la salud de la red de Ethereum.
¡Profundice en los detalles de este tutorial, intente ejecutarlo en redes de prueba, consulte el [GitHub de Ethereum on Arm](https://github.com/EOA-Blockchain-Labs/ethereumonarm), envíe comentarios, plantee problemas (issues) y solicitudes de extracción (pull requests) y ayude a avanzar en la tecnología y la documentación!

## Referencias {#references}

1. https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://geth.ethereum.org
6. https://lighthouse.sigmaprime.io
7. https://github.com/ethstaker/ethstaker-deposit-cli
