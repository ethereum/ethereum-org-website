---
title: Ejecute un nodo de Ethereum en una Raspberry Pi 4
description: Flashee su Raspberry Pi 4, conecte un cable Ethernet, conecte el disco SSD y encienda el dispositivo para convertir la Raspberry Pi 4 en un nodo de Ethereum completo y un validador
author: "EthereumOnArm"
tags:
  [
    "clientes",
    "capa de ejecución",
    "capa de consenso",
    "nodos"
  ]
lang: es
skill: intermediate
published: 2022-06-10
source: Ethereum en ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on ARM es una imagen personalizada de Linux que puede convertir una Raspberry Pi en un nodo de Ethereum.**

Para usar Ethereum on ARM para convertir una Raspberry Pi en un nodo de Ethereum, se recomienda el siguiente hardware:

- Placa Raspberry 4 (modelo B de 8 GB), Odroid M1 o Rock 5B (8 GB/16 GB de RAM)
- Tarjeta MicroSD (16 GB Clase 10 como mínimo)
- Disco SSD USB 3.0 de 2 TB como mínimo o un SSD con una carcasa de USB a SATA.
- Fuente de alimentación
- Cable de Ethernet
- Reenvío de puertos (consulte a los clientes para obtener más información)
- Una carcasa con disipador y ventilador
- Teclado USB, monitor y cable HDMI (micro-HDMI) (opcional)

## ¿Por qué ejecutar Ethereum en ARM? {#why-run-ethereum-on-arm}

Las placas ARM son ordenadores pequeños, flexibles y muy asequibles. Son una buena opción para ejecutar nodos de Ethereum porque son económicos, se pueden configurar para que todos sus recursos se centren solo en el nodo, haciéndolos eficientes, consumen poca energía y son físicamente pequeños, por lo que caben discretamente en cualquier hogar. También es muy fácil poner en marcha los nodos porque la tarjeta MicroSD de la Raspberry Pi simplemente se puede flashear con una imagen precompilada, sin necesidad de descargar o compilar software.

## ¿Cómo funciona? {#how-does-it-work}

La tarjeta de memoria de la Raspberry Pi se flashea con una imagen precompilada. Esta imagen contiene todo lo necesario para ejecutar un nodo de Ethereum. Con una tarjeta flasheada, todo lo que el usuario tiene que hacer es encender la Raspberry Pi. Todos los procesos necesarios para ejecutar el nodo se inician automáticamente. Esto funciona porque la tarjeta de memoria contiene un sistema operativo (SO) basado en Linux sobre el cual se ejecutan automáticamente los procesos a nivel del sistema que convierten la unidad en un nodo de Ethereum.

Ethereum no se puede ejecutar utilizando el popular sistema operativo de Linux para Raspberry Pi "Raspbian" porque Raspbian todavía utiliza una arquitectura de 32 bits, lo que provoca que los usuarios de Ethereum tengan problemas de memoria, y los clientes de consenso no admiten binarios de 32 bits. Para solucionar esto, el equipo de Ethereum on ARM migró a un sistema operativo nativo de 64 bits llamado "Armbian".

**Las imágenes se encargan de todos los pasos necesarios**, desde la configuración del entorno y el formateo del disco SSD hasta la instalación y ejecución del software de Ethereum, así como el inicio de la sincronización de la cadena de bloques.

## Nota sobre los clientes de ejecución y de consenso {#note-on-execution-and-consensus-clients}

La imagen de Ethereum on ARM incluye clientes de ejecución y de consenso precompilados como servicios. Un nodo de Ethereum requiere que ambos clientes estén sincronizados y en ejecución. Solo necesita descargar y flashear la imagen y, a continuación, iniciar los servicios. La imagen está precargada con los siguientes clientes de ejecución:

- Geth
- Nethermind
- Besu

y los siguientes clientes de consenso:

- Lighthouse
- Nimbus
- Prysm
- Teku

Debe elegir uno de cada para ejecutarlo: todos los clientes de ejecución son compatibles con todos los clientes de consenso. Si no selecciona un cliente de forma explícita, el nodo volverá a sus valores predeterminados (Geth y Lighthouse) y los ejecutará automáticamente cuando la placa se encienda. Debe abrir el puerto 30303 en su rúter para que Geth pueda encontrar y conectarse a pares.

## Descargar la imagen {#downloading-the-image}

La imagen de Ethereum para Raspberry Pi 4 es una imagen de tipo «plug and play» que instala y configura automáticamente los clientes de ejecución y de consenso, configurándolos para que se comuniquen entre sí y se conecten a la red Ethereum. Todo lo que el usuario debe hacer es iniciar sus procesos con un simple comando.

Descargue la imagen de Raspberry Pi desde [Ethereum on ARM](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) y verifique el hash SHA256:

```sh
# Desde el directorio que contiene la imagen descargada
shasum -a 256 ethonarm_22.04.00.img.zip
# El hash de salida debe ser: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Tenga en cuenta que las imágenes para las placas Rock 5B y Odroid M1 están disponibles en la [página de descargas](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/quick-guide/download-and-install.html) de Ethereum-on-ARM.

## Flashear la MicroSD {#flashing-the-microsd}

La tarjeta MicroSD que se utilizará para la Raspberry Pi debe insertarse primero en un ordenador de sobremesa o portátil para poder flashearla. A continuación, los siguientes comandos de terminal flashearán la imagen descargada en la tarjeta SD:

```shell
# compruebe el nombre de la tarjeta MicroSD
sudo fdisk -l

>> sdxxx
```

Es muy importante que el nombre sea correcto, ya que el siguiente comando incluye `dd`, que borra por completo el contenido existente de la tarjeta antes de grabar la imagen en ella. Para continuar, vaya al directorio que contiene la imagen comprimida:

```shell
# descomprimir y flashear la imagen
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

La tarjeta ya está flasheada, por lo que se puede insertar en la Raspberry Pi.

## Iniciar el nodo {#start-the-node}

Con la tarjeta SD insertada en la Raspberry Pi, conecte el cable Ethernet y la SSD y, a continuación, encienda la alimentación. El sistema operativo arrancará y comenzará a realizar automáticamente las tareas preconfiguradas que convierten la Raspberry Pi en un nodo de Ethereum, incluida la instalación y compilación del software del cliente. Esto probablemente tardará entre 10 y 15 minutos.

Una vez que todo esté instalado y configurado, inicie sesión en el dispositivo a través de una conexión SSH o usando el terminal directamente si hay un monitor y un teclado conectados a la placa. Use la cuenta `ethereum` para iniciar sesión, ya que tiene los permisos necesarios para iniciar el nodo.

```shell
Usuario: ethereum
Contraseña: ethereum
```

El cliente de ejecución predeterminado, Geth, se iniciará automáticamente. Puede confirmar esto comprobando los registros con el siguiente comando de terminal:

```sh
sudo journalctl -u geth -f
```

El cliente de consenso sí que debe iniciarse explícitamente. Para ello, primero abra el puerto 9000 de su rúter para que Lighthouse pueda encontrar y conectarse a otros pares. A continuación, habilite e inicie el servicio de Lighthouse:

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Compruebe el cliente a través de los registros:

```sh
sudo journalctl -u lighthouse-beacon
```

Tenga en cuenta que el cliente de consenso se sincronizará en pocos minutos porque utiliza la sincronización de punto de control. El cliente de ejecución tardará más, posiblemente varias horas, y no se iniciará hasta que el cliente de consenso haya terminado de sincronizarse (esto se debe a que el cliente de ejecución necesita un objetivo con el que sincronizarse, que lo proporciona el cliente de consenso sincronizado).

Con los servicios de Geth y Lighthouse en funcionamiento y sincronizados, ¡su Raspberry Pi es ahora un nodo de Ethereum! La forma más común de interactuar con la red Ethereum es usando la consola de JavaScript de Geth, que se puede conectar al cliente de Geth en el puerto 8545. También es posible enviar comandos con formato de objetos JSON utilizando una herramienta de solicitud como cURL. Puede encontrar más información en la [documentación de Geth](https://geth.ethereum.org/).

Geth está preconfigurado para notificar las métricas a un panel de control de Grafana que se puede ver en el navegador. Los usuarios más avanzados pueden usar esta función para supervisar el estado de su nodo navegando a `ipaddress:3000`, e introduciendo `user: admin` y `passwd: ethereum`.

## Validadores {#validators}

Opcionalmente, también se puede añadir un validador al cliente de consenso. El software del validador permite que su nodo participe activamente en el consenso y proporciona a la red seguridad criptoeconómica. Recibirá una recompensa en ETH por este trabajo. Para ejecutar un validador, primero debe tener 32 ETH, que deben depositarse en el contrato de depósito. El depósito se puede realizar siguiendo la guía paso a paso en el [Launchpad](https://launchpad.ethereum.org/). Haga esto en un ordenador de sobremesa o portátil, pero no genere claves; esto se puede hacer directamente en la Raspberry Pi.

Abra un terminal en la Raspberry Pi y ejecute el siguiente comando para generar las claves de depósito:

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(O descargue el [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) para ejecutarlo en un equipo aislado y ejecute el comando `deposit new-mnemnonic`)

¡Guarde la frase mnemotécnica en un lugar seguro! El comando anterior generó dos archivos en el almacén de claves del nodo: las claves del validador y un archivo de datos de depósito. Los datos de depósito deben cargarse en el Launchpad, por lo que deben copiarse de la Raspberry Pi al ordenador de sobremesa o portátil. Esto se puede hacer a través de una conexión SSH o cualquier otro método de copiar y pegar.

Una vez que el archivo de datos de depósito esté disponible en el ordenador que ejecuta el Launchpad, se puede arrastrar y soltar en el signo `+` de la pantalla del Launchpad. Siga las instrucciones en pantalla para enviar una transacción al contrato de depósito.

De vuelta en la Raspberry Pi, se puede iniciar un validador. Esto requiere importar las claves del validador, establecer la dirección para cobrar las recompensas y, a continuación, iniciar el proceso de validador preconfigurado. El siguiente ejemplo es para Lighthouse; las instrucciones para otros clientes de consenso están disponibles en los [documentos de Ethereum on ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/):

```shell
# importar las claves del validador
lighthouse account validator import --directory=/home/ethereum/validator_keys

# establecer la dirección de la recompensa
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# iniciar el validador
sudo systemctl start lighthouse-validator
```

¡Enhorabuena! Ya tiene un nodo y un validador de Ethereum completos funcionando en una Raspberry Pi.

## Más detalles {#more-details}

Esta página ofrece una descripción general de cómo configurar un nodo y un validador de Geth-Lighthouse utilizando una Raspberry Pi. Hay instrucciones más detalladas disponibles en el [sitio web de Ethereum-on-ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/index.html).

## Agradecemos sus comentarios {#feedback-appreciated}

Sabemos que la Raspberry Pi tiene una enorme base de usuarios que podría tener un impacto muy positivo en la salud de la red Ethereum.
Le animamos a que profundice en los detalles de este tutorial, intente ejecutarlo en las redes de prueba, consulte el GitHub de Ethereum on ARM, envíe sus comentarios, informe de problemas, realice solicitudes de extracción y ayude a mejorar la tecnología y la documentación.

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
