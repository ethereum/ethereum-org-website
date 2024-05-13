---
title: Cómo convertir su Raspberry Pi 4 en un nodo simplemente con la tarjeta MicroSD
description: Flashee su Raspberry Pi 4, conecte un cable Ethernet, conecte el disco SSD y encienda el dispositivo para convertir la Raspberry Pi 4 en un nodo Ethereum completo + validador
author: "EthereumOnArm"
tags:
  - "clientes"
  - "capa de ejecución"
  - "capa de consenso"
  - "nodos"
lang: es
skill: intermediate
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm es una imagen personalizada de Linux que puede convertir una Raspberry Pi en un nodo de Ethereum.**

Para usar Ethereum on Arm para convertir una Raspberry Pi en un nodo de Ethereum, se recomienda el siguiente hardware:

- Raspberry 4 (modelo B 8 GB), Odroid M1 o Rock 5B (8 GB/16 GB de RAM)
- Tarjeta MicroSD (16 GB clase 10 como mínimo)
- Disco USB 3.0 mínimo SSD de 2 TB o un SSD con una carcasa USB a SATA
- Alimentación eléctrica
- Cable de Ethernet
- Reenvío de puertos (consulte los clientes para obtener más información)
- Una carcasa con disipador de calor y ventilador
- Teclado USB, monitor y cable HDMI (micro-HDMI) (Opcional)

## ¿Por qué ejecutar Ethereum on ARM? {#why-run-ethereum-on-arm}

Las placas ARM son computadoras pequeños y flexibles y muy asequibles. Son buenas opciones para ejecutar nodos de Ethereum porque son baratos, pueden configurarse para que todos sus recursos se centren solo en el nodo, lo que los hace eficientes, consumen bajas cantidades de energía y son físicamente pequeños para encajar discretamente en cualquier hogar. También es muy fácil hacer funcionar los nodos porque la MicroSD de la Raspberry Pi simplemente se puede flashear con una imagen preconstruida, sin necesidad de descargar o crear software.

## ¿Cómo funciona? {#how-does-it-work}

La tarjeta de memoria de la Raspberry Pi se flashea con una imagen preconstruida. Esta imagen contiene todo lo necesario para ejecutar un nodo Ethereum. Con una tarjeta flasheada, todo lo que el usuario tiene que hacer es encender la Raspberry Pi. Todos los procesos necesarios para ejecutar el nodo se inician automáticamente. Esto funciona porque la tarjeta de memoria contiene un sistema operativo (SO) basado en Linux sobre el cual se ejecutan automáticamente procesos a nivel de sistema que convierten la unidad en un nodo Ethereum.

Ethereum no se puede ejecutar usando el popular sistema operativo Linux Raspberry Pi "Raspbian" porque Raspbian todavía utiliza una arquitectura de 32 bits que lleva a los usuarios de Ethereum a tener problemas de memoria y los clientes de consenso no admiten binarios de 32 bits. Para resolver esto, el equipo de Ethereum on Arm migró a un sistema operativo nativo de 64 bits llamado "Armbian".

**Las imágenes se encargan de todos los pasos necesarios**, desde la configuración del entorno y el formato del disco SSD hasta la instalación y ejecución del software de Ethereum, así como del inicio de la sincronización de la cadena de bloques.

## Nota sobre los clientes de ejecución y de consenso {#note-on-execution-and-consensus-clients}

La imagen de Ethereum on Arm incluye clientes de ejecución y consenso precreados como servicios. Un nodo Ethereum requiere que ambos clientes estén sincronizados y ejecutándose. Solo tiene que descargar y flashear la imagen y luego iniciar los servicios. La imagen está precargada con los siguientes clientes de ejecución:

- Geth
- Nethermind
- Besu

y los siguientes clientes de consenso:

- Lighthouse
- Nimbus
- Prysm
- Teku

Debe elegir uno de cada uno para ejecutar: todos los clientes de ejecución son compatibles con todos los clientes de consenso. Si no selecciona explícitamente un cliente, el nodo volverá a sus valores predeterminados, Geth y Lighthouse, y los ejecutará automáticamente al encender la placa. Debe abrir el puerto 30303 en su router para que Geth pueda encontrar y conectarse a los pares, o peers.

## Descargar la imagen {#downloading-the-image}

La imagen de Raspberry Pi 4 Ethereum es una imagen "plug and play" que instala y configura automáticamente tanto los clientes de ejecución como los de consenso, configurándolos para que interactúen entre sí y se conecten a la red Ethereum. El usuario solo debe iniciar sus procesos con un simple comando.

Descargar la imagen de Raspberry Pi de [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) y verificar el hash SHA256:

```sh
# From directory containing the downloaded image
shasum -a 256 ethonarm_22.04.00.img.zip
# Hash should output: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Tenga en cuenta que las imágenes de las placas Rock 5B y Odroid M1 están disponibles en la [página de descargas](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/quick-guide/download-and-install.html) de Ethereum on Arm.

## Flashear la MicroSD {#flashing-the-microsd}

La tarjeta MicroSD que se utilizará para la Raspberry Pi debe insertarse primero en una computadora de escritorio o portátil para flashearla. Luego, los siguientes comandos de terminal flasherán la imagen descargada en la tarjeta SD:

```shell
# check the MicroSD card name
sudo fdisk -l

>> sdxxx
```

Es muy importante que el nombre sea correcto porque el siguiente comando incluye `dd`, que borra completamente el contenido existente de la tarjeta antes de grabar la imagen en ella. Para continuar, vaya al directorio que contiene la imagen comprimida:

```shell
# unzip and flash image
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

La tarjeta ahora está flasheada, por lo que se puede insertar en la Raspberry Pi.

## Iniciar el nodo {#start-the-node}

Con la tarjeta SD insertada en la Raspberry Pi, conecte el cable Ethernet y el SSD, y luego encienda las unidades. El sistema operativo arrancará y comenzará a realizar automáticamente las tareas preconfiguradas que convierten a la Raspberry Pi en un nodo Ethereum, incluida la instalación y creación del software del cliente. Esto probablemente tardará de 10 a 15 minutos.

Una vez que todo esté instalado y configurado, inicie sesión en el dispositivo a través de una conexión ssh o utilizando el terminal directamente si hay un monitor y un teclado conectados a la placa. Utilice la cuenta `ethereum` para iniciar sesión, ya que tiene los permisos necesarios para iniciar el nodo.

```shell
User: ethereum
Password: ethereum
```

El cliente de ejecución predeterminado, Geth, se iniciará automáticamente. Puede confirmar esto comprobando los registros utilizando el siguiente comando de terminal:

```sh
sudo journalctl -u geth -f
```

El cliente de consenso debe iniciarse explícitamente. Para hacer esto, primero abra el puerto 9000 en su enrutador para que Lighthouse pueda encontrar y conectarse a otros pares. A continuación, habilite e inicie el servicio Lighthouse:

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Compruebe el cliente utilizando los registros:

```sh
sudo journalctl -u lighthouse-beacon
```

Tenga en cuenta que el cliente de consenso se sincronizará en unos minutos porque utiliza la sincronización de puntos de control. El cliente de ejecución tardará más, posiblemente varias horas, y no se iniciará hasta que el cliente de consenso haya terminado la sincronización (esto se debe a que el cliente de ejecución necesita un objetivo con el que sincronizarse, que proporciona el cliente de consenso sincronizado).

Con los servicios de Geth y Lighthouse funcionando y sincronizados, ¡su Raspberry Pi es ahora un nodo de Ethereum! Es más común interactuar con la red Ethereum utilizando la consola Javascript de Geth, que se puede conectar al cliente de Geth en el puerto 8545. También es posible enviar comandos con formato de objetos JSON utilizando una herramienta de solicitud como Curl. Vea más detalles en la [documentación de Geth](https://geth.ethereum.org/).

Geth está preconfigurado para informar métricas a un panel de control de Grafana que se puede ver en el navegador. Los usuarios más avanzados podrían querer usar esta función para controlar el estado de su nodo navegando a `ipaddress:3000`, pasando `user: admin` y `passwd: ethereum`.

## Validadores {#validators}

También se puede añadir opcionalmente un validador al cliente de consenso. El software validador permite que su nodo participe activamente en el consenso y proporciona a la red seguridad criptoeconómica. Obtendrá una recompensa por este trabajo en ETH. Para ejecutar un validador, primero debe tener 32 ETH, que deben depositarse en el contrato de depósito. **Este es un compromiso a largo plazo; todavía no es posible retirar este ETH**. El depósito se puede hacer siguiendo la guía paso a paso en el [Launchpad](https://launchpad.ethereum.org/). Haga esto en una computadora de escritorio/portátil, pero no genere claves; esto se puede hacer directamente en la Raspberry Pi.

Abra un terminal en la Raspberry Pi y ejecute el siguiente comando para generar las claves de depósito:

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

¡Guarde la frase mnemotécnica de manera segura! El comando anterior generó dos archivos en el almacén de claves del nodo: las claves del validador y un archivo de datos de depósito. Los datos de depósito deben subirse a la plataforma de lanzamiento, o lanzador, por lo que deben copiarse desde la Raspberry Pi al escritorio/portátil. Esto se puede hacer utilizando una conexión ssh o cualquier otro método de copiar/pegar.

Una vez que el archivo de datos de depósito esté disponible en el ordenador que ejecuta la plataforma de lanzamiento, se puede arrastrar y soltar en el `+` en la pantalla de la plataforma de lanzamiento. Siga las instrucciones de la pantalla para enviar una transacción al contrato de depósito.

De vuelta en la Raspberry Pi, se puede iniciar un validador. Esto requiere importar las claves del validador, establecer la dirección para recopilar recompensas y luego iniciar el proceso del validador preconfigurado. El siguiente ejemplo es para Lighthouse: las instrucciones para otros clientes de consenso están disponibles en los documentos de [Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/):

```shell
# import the validator keys
lighthouse account validator import --directory=/home/ethereum/validator_keys

# set the reward address
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# start the validator
sudo systemctl start lighthouse-validator
```

¡Muy bien, ahora tiene un nodo y un validador de Ethereum completos ejecutándose en una Raspberry Pi!

## Más detalles {#more-details}

Esta página le brindó una descripción general de cómo configurar un nodo y un validador de Geth-Lighthouse usando Raspberry Pi. Hay instrucciones más detalladas disponibles en el sitio web [Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/index.html).

## Agradecemos sus comentarios {#feedback-appreciated}

Sabemos que la Raspberry Pi tiene una enorme base de usuarios que podría tener un impacto muy positivo en la salud de la red Ethereum. Profundice en este tutorial, intente ejecutar en redes de prueba, eche un vistazo a Ethereum on Arm GitHub, dé su opinión, plantee problemas y solicitudes de pull, y ayude a avanzar en la tecnología y la documentación.

## Referencias {#references}

1. https://ubuntu.com/download/raspberry-pi
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://forum.armbian.com/topic/5565-zram-vs-swap/
6. https://geth.ethereum.org
7. https://nethermind.io
8. https://www.hyperledger.org/projects/besu
9. https://github.com/prysmaticlabs/prysm
10. https://lighthouse.sigmaprime.io
11. https://ethersphere.github.io/swarm-home
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org
