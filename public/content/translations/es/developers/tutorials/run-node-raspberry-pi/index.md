---
title: Ejecutar un nodo de Ethereum en Raspberry Pi 4
description: Flashea tu Raspberry Pi 4, conecta un cable ethernet, conecta el disco SSD y enciende el dispositivo para convertir la Raspberry Pi 4 en un nodo completo de Ethereum + validador
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

Para usar Ethereum on Arm y convertir una Raspberry Pi en un nodo de Ethereum, se recomienda el siguiente hardware:

- Placa Raspberry 4 (modelo B 8GB), Odroid M1 o Rock 5B (8GB/16GB RAM)
- Tarjeta MicroSD (mínimo 16 GB Clase 10)
- Disco SSD USB 3.0 de mínimo 2 TB o un SSD con carcasa USB a SATA.
- Fuente de alimentación
- Cable ethernet
- Redirección de puertos (consulte los clientes para obtener más información)
- Una carcasa con disipador de calor y ventilador
- Teclado USB, monitor y cable HDMI (micro-HDMI) (Opcional)

## ¿Por qué ejecutar Ethereum en ARM? {#why-run-ethereum-on-arm}

Las placas ARM son computadoras pequeñas, flexibles y muy asequibles. Son buenas opciones para ejecutar nodos de Ethereum porque se pueden comprar a bajo costo, configurar para que todos sus recursos se centren solo en el nodo, lo que las hace eficientes, consumen poca energía y son físicamente pequeñas, por lo que pueden caber discretamente en cualquier hogar. También es muy fácil poner en marcha nodos porque la MicroSD de la Raspberry Pi simplemente se puede flashear con una imagen precompilada, sin necesidad de descargar ni compilar software.

## ¿Cómo funciona? {#how-does-it-work}

La tarjeta de memoria de la Raspberry Pi se flashea con una imagen precompilada. Esta imagen contiene todo lo necesario para ejecutar un nodo de Ethereum. Con una tarjeta flasheada, todo lo que el usuario debe hacer es encender la Raspberry Pi. Todos los procesos necesarios para ejecutar el nodo se inician automáticamente. Esto funciona porque la tarjeta de memoria contiene un sistema operativo (OS) basado en Linux sobre el cual se ejecutan automáticamente procesos a nivel de sistema que convierten la unidad en un nodo de Ethereum.

Ethereum no se puede ejecutar utilizando el popular sistema operativo Linux de Raspberry Pi "Raspbian" porque Raspbian todavía usa una arquitectura de 32 bits, lo que lleva a los usuarios de Ethereum a tener problemas de memoria y los clientes de consenso no admiten binarios de 32 bits. Para superar esto, el equipo de Ethereum on Arm migró a un sistema operativo nativo de 64 bits llamado "Armbian".

**Las imágenes se encargan de todos los pasos necesarios**, desde la configuración del entorno y el formateo del disco SSD hasta la instalación y ejecución del software de Ethereum, así como el inicio de la sincronización de la cadena de bloques.

## Nota sobre los clientes de ejecución y consenso {#note-on-execution-and-consensus-clients}

La imagen de Ethereum on Arm incluye clientes de ejecución y consenso precompilados como servicios. Un nodo de Ethereum requiere que ambos clientes estén sincronizados y en ejecución. Solo necesita descargar y flashear la imagen y luego iniciar los servicios. La imagen está precargada con los siguientes clientes de ejecución:

- Geth
- Nethermind
- Besu

y los siguientes clientes de consenso:

- Lighthouse
- Nimbus
- Prysm
- Teku

Debe elegir uno de cada uno para ejecutar: todos los clientes de ejecución son compatibles con todos los clientes de consenso. Si no selecciona explícitamente un cliente, el nodo recurrirá a sus valores predeterminados (Geth y Lighthouse) y los ejecutará automáticamente cuando se encienda la placa. Debe abrir el puerto 30303 en su enrutador para que Geth pueda encontrar y conectarse a sus pares.

## Descarga de la imagen {#downloading-the-image}

La imagen de Ethereum para Raspberry Pi 4 es una imagen "plug and play" que instala y configura automáticamente tanto el cliente de ejecución como el de consenso, configurándolos para que se comuniquen entre sí y se conecten a la red Ethereum. Todo lo que el usuario debe hacer es iniciar sus procesos mediante un simple comando.

Descargue la imagen de Raspberry Pi desde [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) y verifique el hash SHA256:

```sh
# Desde el directorio que contiene la imagen descargada
shasum -a 256 ethonarm_22.04.00.img.zip
# El hash debería mostrar: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Tenga en cuenta que las imágenes para las placas Rock 5B y Odroid M1 están disponibles en la [página de descargas](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) de Ethereum-on-Arm.

## Flasheo de la MicroSD {#flashing-the-microsd}

La tarjeta MicroSD que se utilizará para la Raspberry Pi debe insertarse primero en una computadora de escritorio o portátil para que pueda ser flasheada. Luego, los siguientes comandos de terminal flashearán la imagen descargada en la tarjeta SD:

```shell
# verificar el nombre de la tarjeta MicroSD
sudo fdisk -l

>> sdxxx
```

Es muy importante escribir el nombre correctamente porque el siguiente comando incluye `dd` que borra por completo el contenido existente de la tarjeta antes de introducir la imagen en ella. Para continuar, navegue hasta el directorio que contiene la imagen comprimida:

```shell
# descomprimir y grabar la imagen
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

La tarjeta ahora está flasheada, por lo que se puede insertar en la Raspberry Pi.

## Iniciar el nodo {#start-the-node}

Con la tarjeta SD insertada en la Raspberry Pi, conecte el cable ethernet y el SSD, luego encienda la alimentación. El sistema operativo se iniciará y comenzará a realizar automáticamente las tareas preconfiguradas que convierten la Raspberry Pi en un nodo de Ethereum, incluida la instalación y compilación del software del cliente. Esto probablemente tomará de 10 a 15 minutos.

Una vez que todo esté instalado y configurado, inicie sesión en el dispositivo a través de una conexión ssh o usando la terminal directamente si hay un monitor y un teclado conectados a la placa. Use la cuenta `ethereum` para iniciar sesión, ya que tiene los permisos necesarios para iniciar el nodo.

```shell
User: ethereum
Password: ethereum
```

El cliente de ejecución predeterminado, Geth, se iniciará automáticamente. Puede confirmar esto verificando los registros usando el siguiente comando de terminal:

```sh
sudo journalctl -u geth -f
```

El cliente de consenso sí necesita iniciarse explícitamente. Para hacer esto, primero abra el puerto 9000 en su enrutador para que Lighthouse pueda encontrar y conectarse a sus pares. Luego habilite e inicie el servicio de Lighthouse:

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Verifique el cliente usando los registros:

```sh
sudo journalctl -u lighthouse-beacon
```

Tenga en cuenta que el cliente de consenso se sincronizará en unos minutos porque utiliza la sincronización de punto de control. El cliente de ejecución tardará más (potencialmente varias horas) y no se iniciará hasta que el cliente de consenso ya haya terminado de sincronizarse (esto se debe a que el cliente de ejecución necesita un objetivo con el cual sincronizarse, el cual es proporcionado por el cliente de consenso sincronizado).

Con los servicios de Geth y Lighthouse en ejecución y sincronizados, ¡su Raspberry Pi ahora es un nodo de Ethereum! Lo más común es interactuar con la red Ethereum utilizando la consola JavaScript de Geth, que se puede adjuntar al cliente Geth en el puerto 8545. También es posible enviar comandos formateados como objetos JSON utilizando una herramienta de solicitud como Curl. Vea más en la [documentación de Geth](https://geth.ethereum.org/).

Geth está preconfigurado para informar métricas a un panel de Grafana que se puede ver en el navegador. Los usuarios más avanzados pueden desear usar esta función para monitorear el estado de su nodo navegando a `ipaddress:3000`, pasando `user: admin` y `passwd: ethereum`.

## Validadores {#validators}

También se puede agregar opcionalmente un validador al cliente de consenso. El software del validador permite que su nodo participe activamente en el consenso y proporciona a la red seguridad criptoeconómica. Usted es recompensado por este trabajo en ETH. Para ejecutar un validador, primero debe tener 32 ETH, que deben depositarse en el contrato de depósito. El depósito se puede realizar siguiendo la guía paso a paso en el [Launchpad](https://launchpad.ethereum.org/). Haga esto en una computadora de escritorio/portátil, pero no genere claves; esto se puede hacer directamente en la Raspberry Pi.

Abra una terminal en la Raspberry Pi y ejecute el siguiente comando para generar las claves de depósito:

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(O descargue el [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) para ejecutarlo en una máquina aislada de la red (airgapped), y ejecute el comando `deposit new-mnemnonic`)

¡Mantenga segura la frase mnemotécnica! El comando anterior generó dos archivos en el almacén de claves del nodo: las claves del validador y un archivo de datos de depósito. Los datos de depósito deben cargarse en el launchpad, por lo que deben copiarse de la Raspberry Pi a la computadora de escritorio/portátil. Esto se puede hacer usando una conexión ssh o cualquier otro método de copiar/pegar.

Una vez que el archivo de datos de depósito esté disponible en la computadora que ejecuta el launchpad, se puede arrastrar y soltar en el `+` en la pantalla del launchpad. Siga las instrucciones en la pantalla para enviar una transacción al contrato de depósito.

De vuelta en la Raspberry Pi, se puede iniciar un validador. Esto requiere importar las claves del validador, configurar la dirección para recolectar recompensas y luego iniciar el proceso del validador preconfigurado. El siguiente ejemplo es para Lighthouse; las instrucciones para otros clientes de consenso están disponibles en la [documentación de Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/):

```shell
# importar las claves del validador
lighthouse account validator import --directory=/home/ethereum/validator_keys

# configurar la dirección de recompensa
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# iniciar el validador
sudo systemctl start lighthouse-validator
```

¡Felicidades, ahora tiene un nodo completo de Ethereum y un validador ejecutándose en una Raspberry Pi!

## Más detalles {#more-details}

Esta página ofreció una descripción general de cómo configurar un nodo Geth-Lighthouse y un validador usando Raspberry Pi. Hay instrucciones más detalladas disponibles en el [sitio web de Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/).

## Se agradecen los comentarios {#feedback-appreciated}

Sabemos que la Raspberry Pi tiene una base de usuarios masiva que podría tener un impacto muy positivo en la salud de la red Ethereum.
¡Profundice en los detalles de este tutorial, intente ejecutarlo en redes de prueba, consulte el GitHub de Ethereum on Arm, envíe comentarios, plantee problemas (issues) y solicitudes de extracción (pull requests) y ayude a avanzar en la tecnología y la documentación!

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
11. https://docs.ethswarm.org/
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org