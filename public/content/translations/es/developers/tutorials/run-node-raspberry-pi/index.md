---
title: Cómo convertir su Raspberry Pi 4 en un nodo simplemente con la tarjeta MicroSD
description: Actualice su Raspberry Pi 4, a través de un cable de ethernet, conecte el disco SSD y encienda el dispositivo para convertir la Raspberry Pi en un nodo Ethereum completo ejecutando la capa de ejecución, o la capa de consenso (cadena de baliza / validador)
author: "EthereumOnArm"
tags:
  - "clients"
  - "capa de ejecución"
  - "capa de consenso"
  - "nodos"
lang: es
skill: intermediate
published: 2020-05-07
source: r/ethereum
sourceUrl: https://www.reddit.com/r/ethereum/comments/gf3nhg/ethereum_on_arm_raspberry_pi_4_images_release/
---

**TL;DR**: Actualice su Raspberry Pi 4, a través de un cable de ethernet, conecte el disco SSD y encienda el dispositivo para convertir la Raspberry Pi en un nodo Ethereum completo ejecutando la capa de ejecución, o la capa de consenso (cadena de baliza / validador)

[Más información acerca de las actualizaciones de Ethereum](/roadmap/)

Primero, veamos un poco de contexto. Como saben, nos hemos encontrado con algunos problemas de memoria [[1]](/developers/tutorials/run-node-raspberry-pi/#references) con la imagen de Raspberry Pi 4 ya que Raspbian OS todavía está en 32 bits [[2]](/developers/tutorials/run-node-raspberry-pi/#references) (al menos a nivel de usuario). Si bien preferimos seguir con el sistema operativo oficial, llegamos a la conclusión de que, para resolver estos problemas, debemos migrar a un sistema operativo nativo de 64 bits

Además, los clientes de consenso no admiten binarios de 32 bits, por lo que el uso de Raspbian excluiría a Raspberry Pi 4 de ejecutar un nodo de capa de consenso (y la posibilidad de apuesta).

De modo que, tras varias pruebas, ahora lanzamos 2 imágenes diferentes basadas en Ubuntu 20.04 de 64bits las ediciones de [[3]](/developers/tutorials/run-node-raspberry-pi/#references): capa de ejecución y de capa de consenso.

Básicamente, ambas son la misma imagen e incluyen las mismas características que las imágenes basadas en Raspbian. Pero están configuradas para ejecutar el programa de capa de ejecución o programa de capa de consenso por defecto.

**Las imágenes se encargan de todos los pasos necesarios**, desde la configuración del entorno y el formato del disco SSD hasta la instalación y ejecución del software Ethereum, así como del inicio de la sincronización de la cadena de bloques.

## Características principales {#main-features}

- Basado en Ubuntu 20.04 64bit
- Fragmentación y formato automático del disco USB
- Añade memoria de intercambio (módulo del núcleo ZRAM + un archivo de intercambio) basada en el trabajo Armbian [[7]](/developers/tutorials/run-node-raspberry-pi/#references)
- Cambia el nombre de host a uno parecido a «ethnode-e2a3e6fe» basado en hash MAC
- Ejecuta el software como un servicio de sistema y comienza a sincronizar la cadena de bloques
- Incluye un repositorio APT para instalar y actualizar el software Ethereum
- Incluye un panel de control basado en Grafana / Prometeo

## Software incluido {#software-included}

Ambas imágenes incluyen los mismos paquetes, la única diferencia entre ellas es que la versión de ejecución ejecuta Geth por defecto y la versión de consenso ejecuta la cadena de baliza Prysn por defecto.

### Clientes de ejecución {#execution-clients}

- Geth [[8]](/developers/tutorials/run-node-raspberry-pi/#references): 1.9.13 (binario oficial)
- Parity [[9]](/developers/tutorials/run-node-raspberry-pi/#references): 2.7.2 (binario oficial)
- Nethermind [[10]](/developers/tutorials/run-node-raspberry-pi/#references): 1.8.28 (compilación cruzada)
- Hyperledger Besu [[11]](/developers/tutorials/run-node-raspberry-pi/#references): 1.4.4 (compilado)

### Clientes de consenso {#consensus-clients}

- Prysm [[12]](/developers/tutorials/run-node-raspberry-pi/#references): 1.0.0-alpha6 (binario oficial)
- Lighthouse [[13]](/developers/tutorials/run-node-raspberry-pi/#references): 0.1.1 (compilado)

### Entorno de desarrollo Ethereum {#ethereum-framework}

- Swarm [[14]](/developers/tutorials/run-node-raspberry-pi/#references): 0.5.7 (oficial binario)
- Raiden Network [[15]](/developers/tutorials/run-node-raspberry-pi/#references): 0.200.0~rc1 (oficial binanrio)
- IPFS [[16]](/developers/tutorials/run-node-raspberry-pi/#references): 0.5.0 (oficial binario)
- Statusd [[17]](/developers/tutorials/run-node-raspberry-pi/#references): 0.52.3 (compilado)
- Vipnode [[18]](/developers/tutorials/run-node-raspberry-pi/#references): 2.3.3 (binario oficial)

## Guía de instalación y uso {#installation-guide-and-usage}

### Hardware y configuración recomendados {#recommended-hardware-and-setup}

- Raspberry 4 (modelo B) - 4GB
- Tarjeta MicroSD (16 GB clase 10 mínimo)
- Disco SSD USB 3.0 (ver sección de almacenamiento)
- Alimentación eléctrica
- Cable de Ethernet
- Redirección del puerto 30303 (capa de ejecución) y redirección de puerto 13000 (capa de consenso) [[4]](/developers/tutorials/run-node-raspberry-pi/#references)
- Una caja con disipador y ventilador (opcional pero encarecidamente recomendado)
- Teclado USB, pantalla y cable HDMI (microHDMI) (opcional)

## Almacenamiento {#storage}

Necesitará un disco SSD para ejecutar los clientes de Ethereum (sin una unidad SSD no hay ninguna posibilidad de sincronizar la cadena de bloques de Ethereum). Hay 2 opciones:

- Utilice un disco SSD portátil USB como el Samsung T5 Portable SSD.
- Use una caja de disco duro externo USB 3.0 con un disco SSD. En nuestro caso usamos un Inateck 2.5 Hard Drive Enclosure FE2011. Asegúrese de comprar una caja con un chip compatible con UAS, en particular, uno de estos: JMicron (JMS567 o JMS578) o ASMedia (ASM1153E).

En ambos casos, evite obtener discos SSD de baja calidad ya que es un componente clave del nodo y puede afectar drásticamente al rendimiento (y tiempos de sincronización).

Tenga en cuenta que necesita conectar el disco a un puerto USB 3.0 (azul)

## Descarga e instalación de las imágenes {#image-download-and-installation}

### 1. Descargue las imágenes de ejecución y capa de consenso {#1-download-execution-or-consensus-images}

<ButtonLink to="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip">
  Descargue la imagen de la capa de ejecución
</ButtonLink>

sha256 7fa9370d13857dd6abcc8fde637c7a9a7e3a66b307d5c28b0c0d29a09c73c55c

<ButtonLink to="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth2.img.zip">
  Descargue la imagen de la capa de consenso
</ButtonLink>

sha256 74c0c15b708720e5ae5cac324f1afded6316537fb17166109326755232cd316e

### 2. Actualice la imagen {#2-flash-the-image}

Inserte la tarjeta microSD en su ordenador de sobremesa / portátil y descargue el archivo (por ejemplo, la capa de ejecución):

```bash
wget https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip
```

Nota: Si no se siente cómodo con la línea de comandos o si está ejecutando Windows, puede usar [Etcher](https://etcher.io)

Abra un terminal y compruebe el nombre del dispositivo MicroSD en ejecución:

```bash
sudo fdisk -l
```

Debería ver un dispositivo llamado mmcblk0 o sdd. Descomprima y actualice la imagen:

```bash
unzip ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip
sudo dd bs=1M if=ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img of=/dev/mmcblk0 && sync
```

### 3. Inserte la MicroSD en la Raspberry Pi 4. Conecte un cable Ethernet y el disco SSD vía USB (asegúrese de que está usando un puerto azul). {#3-insert-the-microsd-into-the-raspberry-pi-4-connect-an-ethernet-cable-and-attach-the-usb-ssd-disk-make-sure-you-are-using-a-blue-port}

### 4. Encienda el dispositivo {#4-power-on-the-device}

El sistema operativo Ubuntu arrancará en menos de un minuto, pero **tendrá que esperar aproximadamente 10 minutos** para permitir que el script realice las tareas necesarias para convertir el dispositivo en un nodo de Ethereum y reiniciar el Raspberry.

Dependiendo de la imagen que use, se ejecutará:

- Cliente de ejecución: Geth como cliente predeterminado de sincronización de la cadena de bloques
- Cliente de consenso: Prysm como cliente predeterminado de sincronización de la cadena de baliza (red de prueba Goerli)

### 5. Inicio de sesión {#5-log-in}

Puede iniciar sesión a través de SSH o usando la consola (si tiene una pantalla y un teclado conectados)

```bash
User: ethereum
Password: ethereum
```

La primera vez que inicie sesión, se le pedirá que cambie la contraseña, por lo tanto, tendrá que iniciar sesión dos veces.

### 6. Abra el puerto 30303 para Geth y 13000 si está ejecutando la cadena de baliza de Prysm. Si no sabe cómo hacerlo, teclee en Google «reenvío de puertos» seguido de su modelo de router. {#6-open-30303-port-for-geth-and-13000-if-you-are-running-prysm-beacon-chain-if-you-dont-know-how-to-do-this-google-port-forwarding-followed-by-your-router-model}

### 7. Obtenga la salida de la consola {#7-get-console-output}

Puede ver lo que está pasando en segundo plano escribiendo:

```bash
sudo tail -f /var/log/syslog
```

**Enhorabuena. Ahora está ejecutando un nodo completo en su Raspberry Pi 4.**

## Sincronización de la cadena de bloques {#syncing-the-blockchain}

Seguidamente tendrá que esperar a que la cadena de bloques se sincronice por completo. En el caso de la capa de ejecución, llevará varios días en función de factores concretos, pero puede esperar aproximadamente 5-7 días.

Si está ejecutando la capa de consenso en la red de prueba Goerli la sincronización con la cadena de la baliza puede llevar entre 1 y 2 días. Recuerde que necesitará configurar el validador más adelante para poder iniciar el proceso de apuesta. [Cómo ejecutar el validador de la capa de consenso](/developers/tutorials/run-node-raspberry-pi/#validator)

## Paneles de control {#monitoring-dashboards}

En esta primera versión, hemos incluido 3 paneles de control basados en Prometheus [[5]](/developers/tutorials/run-node-raspberry-pi/#references) / Grafana [[6]](/developers/tutorials/run-node-raspberry-pi/#references) para controlar el nodo y los datos de los clientes (Geth y Besu). Puede acceder a través de su navegador web:

```bash
URL: http://your_raspberrypi_IP:3000
User: admin
Password: ethereum
```

## Cambiar de cliente {#switching-clients}

Todos los clientes se ejecutan como un servicio de sistema. Esto es importante, porque si surge un problema, el sistema iniciará el proceso automáticamente.

Las cadenas de baliza Geth y Prysm se ejecutan por defecto (en función de lo que esté sincronizando, de la capa de ejecución o de consenso) por lo tanto, si quiere pasar a otros clientes (de Geth a Nethermind, por ejemplo), tendrá que parar y desactivar primero Geth y activar e iniciar el otro cliente:

```bash
sudo systemctl stop geth && sudo systemctl disable geth
```

Comandos para activar e iniciar cada cliente de ejecución:

```bash
sudo systemctl enable besu && sudo systemctl start besu
sudo systemctl enable nethermind && sudo systemctl start nethermind
sudo systemctl enable parity && sudo systemctl start parity
```

Clientes de consenso:

```bash
sudo systemctl stop prysm-beacon && sudo systemctl disable prysm-beacon
sudo systemctl start lighthouse && sudo systemctl enable lighthouse
```

## Cambiar parámetros {#changing-parameters}

Los archivos de configuración de los clientes están ubicados en el directorio /etc/ethereum/. Puede editar estos archivos y reiniciar el servicio systemd para guardar cambios. La única excepción es Nethermind que, además, tiene un archivo de configuración de Mainnet ubicado aquí:

```bash
/etc/nethermind/configs/mainnet.cfg
```

Los datos de los clientes de la cadena de bloques se almacenan en la cuenta principal de Ethereum de la siguiente manera (no se olvide de incluir el punto antes del nombre del directorio):

### Capa de ejecución {#execution-layer}

```bash
/home/ethereum/.geth
/home/ethereum/.parity
/home/ethereum/.besu
/home/ethereum/.nethermind
```

### Capa de consenso {#consensus-layer}

```bash
/home/ethereum/.eth2
/home/ethereum/.eth2validators
/home/ethereum/.lighthouse
```

## Nethermind y Hyperledger Besu {#nethermind-and-hyperledger-besu}

Estos 2 excelentes clientes de ejecución han terminando por ser buenas alternativas a Geth y Parity. Cuanta más diversidad haya en la red, mejor, probándolos contribuye a mejorar la salud de la red.

Ambos necesitan más pruebas, así que experimente a sus anchas con ellos e informe de su opinión.

## Cómo ejecutar el validador de consenso (apuestas) {#validator}

Una vez que la cadena de baliza de la red de pruebas Goerli está sincronizada, puede ejecutar un validador en el mismo dispositivo. Necesitará seguir [estos pasos de participación](https://prylabs.net/participate).

La primera vez, necesita crear manualmente una cuenta ejecutando el binario «validador» y configurando una contraseña. Una vez que haya completado este paso, puede agregar la contraseña a `/etc/ethereum/prysm-validator.conf` e iniciar el validador como un servicio systemd.

## Apreciamos sus comentarios {#feedback-appreciated}

Hemos puesto mucho trabajo en la configuración del Raspberry Pi 4 como un nodo completo de Ethereum ya que sabemos que la base de usuario masiva de este dispositivo puede tener un impacto muy positivo en la red.

Por favor, tenga en cuenta que esta es la primera imagen basada en Ubuntu 20.04 por lo que puede que haya algunos errores. Si es así, abra un problema en [GitHub](https://github.com/diglos/ethereumonarm) o contáctenos en [Twitter](https://twitter.com/EthereumOnARM).

## Referencias {#references}

1. [geth se bloquea repetidamente con SIGSEGV](https://github.com/ethereum/go-ethereum/issues/20190)
2. [https://github.com/diglos/ethereumonarm](https://github.com/diglos/ethereumonarm)
3. https://ubuntu.com/download/raspberry-pi
4. https://wikipedia.org/wiki/Port_forwarding
5. https://prometheus.io
6. https://grafana.com
7. https://forum.armbian.com/topic/5565-zram-vs-swap/
8. https://geth.ethereum.org
9. https://github.com/openethereum/openethereum \* **Tenga en cuenta que OpenEthereum [ha quedado obsoleto](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) y no tiene mantenimiento.** Úselo con precaución y, preferiblemente, cambie a otra implementación de cliente.
10. https://nethermind.io
11. https://www.hyperledger.org/projects/besu
12. https://github.com/prysmaticlabs/prysm
13. https://lighthouse.sigmaprime.io
14. https://ethersphere.github.io/swarm-home
15. https://raiden.network
16. https://ipfs.io
17. https://status.im
18. https://vipnode.org
