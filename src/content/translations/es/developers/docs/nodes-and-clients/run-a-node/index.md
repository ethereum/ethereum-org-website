---
title: Ejecute su propio nodo de Ethereum
description: Introducción general para ejecutar su propia instancia de un cliente de Ethereum.
lang: es
sidebarDepth: 2
---

Ejecutar tu propio nodo le aporta diferentes beneficios, le abre nuevas posibilidades y le ayuda a apoyar el ecosistema. Esta página le guiará durante la ejecución de su propio nodo y durante la participación en la validación de las transacciones de Ethereum.

## Requisitos previos {#prerequisites}

Debería entender qué es un nodo de Ethereum y por qué debería ejecutar un cliente. Este tema se trata en la sección [Nodos y clientes](/developers/docs/nodes-and-clients/).

If you're new to the topic of running a node, or looking for a less technical path, we recommend first checking out our user-friendly introduction on [running an Ethereum node](/run-a-node).

## Elección de un enfoque {#choosing-approach}

El primer paso para ejecutar el nodo es elegir su enfoque. Tiene que escoger el cliente (el software), el entorno y los parámetros con los que quiere comenzar. Consulte toda la información disponible en [Clientes de la red principal](/developers/docs/nodes-and-clients/#advantages-of-different-implementations).

#### Ajustes del cliente {#client-settings}

Las implementaciones de clientes permiten el uso de diferentes modos de sincronización y otras opciones diferentes. [Los modos de sincronización](/developers/docs/nodes-and-clients/#sync-modes) representan diferentes métodos de descarga y validación de datos de cadenas de bloques. Antes de empezar el nodo, debería decidir qué red y modo de sincronización usar. Los aspectos más importantes que se deben tener en cuenta son el espacio del disco y el tiempo de sincronización que necesitará el cliente.

Todas las características y opciones pueden encontrarse en la documentación para clientes. Se pueden establecer distintas configuraciones de clientes mediante la ejecución del cliente con los parámetros correspondientes. Puede obtener más información sobre los parámetros desde [EthHub](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/#client-settings) o la documentación para clientes. Con fines de prueba, puede preferir ejecutar un cliente en una de las redes de prueba. [Ver resumen de las redes compatibles](/developers/docs/nodes-and-clients/#execution-clients).

### Entorno y hardware {#environment-and-hardware}

#### Local o en la nube {#local-vs-cloud}

Los clientes de Ethereum pueden ejecutarse en ordenadores de nivel usuario y no requieren hardware especial, como, por ejemplo, el minado. Por eso, tiene varias opciones de implementación según sus necesidades. Para simplificar, vamos a pensar en ejecutar un nodo en una máquina física local y en un servidor en la nube:

- En la nube
  - Los proveedores ofrecen un alto tiempo de actividad del servidor, direcciones IP públicas estáticas
  - Obtener un servidor dedicado o virtual puede ser más cómodo que construir el suyo propio
  - La contrapartida es confiar en un tercero: el proveedor del servidor
  - Debido al tamaño de almacenamiento requerido para el nodo completo, el precio de un servidor alquilado podría llegar a ser alto
- Hardware propio
  - Un enfoque más soberano y fiable
  - Inversión única
  - Una opción para comprar máquinas preconfiguradas
  - Tiene que llevar a cabo la preparación física, el mantenimiento y la posible solución de problemas de la máquina

Ambas opciones tienen diferentes ventajas, resumidas arriba. Si está buscando una solución en la nube, además de muchos proveedores tradicionales de computación en la nube, también existen servicios enfocados en el despliegue de nodos. Por ejemplo:

- [QuikNode](https://www.quiknode.io/)
- [Blockdaemon](https://blockdaemon.com)
- [LunaNode](https://www.lunanode.com/)
- [Alchemy](https://www.alchemy.com/)

#### Hardware {#hardware}

Sin embargo, una red descentralizada, resistente a la censura, no debería depender de proveedores en la nube. Es más seguro para el ecosistema si usted ejecuta su propio nodo en hardware. Las opciones más fáciles son máquinas preconfiguradas como:

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

Compruebe el espacio en disco mínimo y recomendado [para cada cliente y modo de sincronización](/developers/docs/nodes-and-clients/#requirements). Generalmente, una potencia computacional moderada debería ser suficiente. El problema suele ser la velocidad de la unidad. Durante la sincronización inicial, los clientes de Ethereum llevan a cabo muchas operaciones de lectura/escritura. Por eso, se recomienda usar una SSD. Un cliente podría ni siquiera [ser capaz de sincronizar el estado actual en el disco de almacenamiento](https://github.com/ethereum/go-ethereum/issues/16796#issuecomment-391649278) y quedarse atascado unos bloques por detrás de la red. Puede ejecutar la mayoría de los clientes en un [ ordenador de una sola placa con ARM](/developers/docs/nodes-and-clients/#ethereum-on-a-single-board-computer/). También puede usar [Ethbian](https://ethbian.org/index.html), el sistema operativo para Raspberry Pi 4. This lets you [run a client by flashing the SD card](/developers/tutorials/run-node-raspberry-pi/). Según el software y el hardware que haya elegido, el tiempo de sincronización inicial y los requisitos de almacenamiento pueden variar. Asegúrese de [comprobar los tiempos de sincronización y los requisitos de almacenamiento](/developers/docs/nodes-and-clients/#recommended-specifications). Asegúrese además de que su conexión a internet no esté limitada por un [límite de ancho de banda](https://wikipedia.org/wiki/Data_cap). Se recomienda utilizar una conexión ilimitada, ya que la sincronización inicial y los datos transmitidos a la red podrían superar su límite.

#### Sistema operativo {#operating-system}

Todos los clientes son compatibles con los principales sistemas operativos: Linux, MacOS y Windows. Esto implica que puede ejecutar nodos en equipos de escritorio o servidores normales con el sistema operativo (SO) que mejor le convenga. Asegúrese de que su sistema operativo está actualizado para evitar posibles problemas y vulnerabilidades de seguridad.

## Despliegue del nodo {#spinning-up-node}

### Obtener el software del cliente {#getting-the-client}

Primero, descargue su [cliente de sofware](/developers/docs/nodes-and-clients/#execution-clients) preferido

Puede simplemente descargar una aplicación ejecutable o instalar un paquete que se adapte a su arquitectura y sistema operativo. Compruebe siempre las firmas y sumas de verificación de los paquetes descargados. Algunos clientes también ofrecen repositorios para una instalación y actualizaciones más sencillas. Si lo prefiere, puede crear a partir de la fuente. Todos los clientes son de código abierto, así que puede crearlos a partir del código fuente con el compilador adecuado.

Los binarios ejecutables para las implementaciones estables de clientes de la red principal se pueden descargar desde sus páginas de publicación:

- [Geth](https://geth.ethereum.org/downloads/)
- [OpenEthereum,](https://github.com/openethereum/openethereum/releases)
- [Nethermind](https://downloads.nethermind.io/)
- [Besu](https://besu.hyperledger.org/en/stable/)
- [Erigon](https://github.com/ledgerwatch/erigon)

**Tenga en cuenta que OpenEthereum[ha quedado obsoleta](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd)y no tiene mantenimiento.** Debe usarla con precaución y, preferiblemente, cambiar de cliente.

### Inicio del cliente {#starting-the-client}

Antes de iniciar el software del cliente de Ethereum, realice una última comprobación para verificar que su entorno está listo. Por ejemplo, asegúrese de que:

- Hay suficiente espacio en el disco teniendo en cuenta la red elegida y el modo de sincronización.
- La memoria y la CPU no están interrumpidas por otros programas.
- El sistema operativo está actualizado a la última versión.
- El sistema tiene la hora y fecha correctos.
- Su enrutador y su firewall aceptan conexiones en puertos de escucha. Por defecto, los clientes de Ethereum usan un puerto de escucha (TCP) y un puerto de descubrimiento (UDP), ambos en 30303 por defecto.

Ejecutar un cliente primero en una red de prueba ayuda a garantizar que todo funciona correctamente. Ejecutar un [nodo ligero Geth](/developers/tutorials/run-light-node-geth/) debería ayudar. Debe declarar cualquier configuración de cliente que no esté predeterminada al inicio. Puede usar indicadores o el archivo de configuración para declarar su configuración preferida. Revise la documentación de su cliente para ver las especificaciones La ejecución del cliente iniciará sus funciones principales, sus puntos de conexión elegidos y comenzará a buscar pares. Al encontrar pares correctamente, el cliente inicia la sincronización. Los datos actuales de la cadena de bloques estarán disponibles una vez que el cliente se sincronice correctamente al estado actual.

### Uso del cliente {#using-the-client}

El cliente ofrece puntos de conexión RCP API que puede usar para controlar el cliente e interactuar con la red de Ethereum de diferentes formas:

- Llamándolos manualmente con un protocolo adecuado (por ejemplo, usando `curl`)
- Adjuntando una consola suministrada (por ejemplo, `geth attach`)
- Implementándolos en aplicaciones

Según el tipo de cliente, existen diferentes implementaciones de puntos de conexión RPC. Pero existe un modelo estándar JSON-RPC que puede usar con todos los clientes. Para obtener un resumen, [ lea los documentos sobre JSON-RPC](https://eth.wiki/json-rpc/API). Las aplicaciones que necesitan información de la red de Ethereum pueden usar este RPC. Por ejemplo, la popular cartera MetaMask le permite [ejecutar una instancia local de cadena de bloques y conectarse a ella](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node).

#### Comunicación con RPC {#reaching-rpc}

El puerto predeterminado de JSON-RPC es `8545`, pero puede modificar los puertos de los puntos de conexión locales en el archivo de configuración. Por defecto, la interfaz de RPC solamente es accesible en el servidor local de su ordenador. Para hacerlo accesible de manera remota, deberá exponerlo al público cambiando la dirección a `0.0.0.0`. Así, será accesible desde direcciones IP locales y públicas. En la mayoría de los casos, también deberá establecer un puerto de reenvío en su enrutador.

Debería proceder con precaución, ya que esto le permitirá a cualquier persona conectada a Internet controlar su nodo. Los actores maliciosos podrían acceder a su nodo para atacar su sistema o robar sus fondos si está usando su cliente como cartera.

Una forma de evitarlo es prevenir que los métodos RPC potencialmente dañinos sean modificables. Por ejemplo, con `geth`, puede declarar métodos modificables con un indicador: `--http.api web3,eth,txpool`.

También puede alojar el acceso a su interfaz RPC orientando el servicio de servidor web, como Nginx, a la dirección y puerto locales de su cliente.

La forma más sencilla de preservar la privacidad y configurar un punto de conexión accesible públicamente es alojarlo en su propio servicio onion [Tor](https://www.torproject.org/). Esto le permitirá acceder al RPC fuera de su red local sin una dirección IP pública estática o puertos abiertos. Para ello:

- Instale `tor`
- Edite la configuración de `torrc` para habilitar el servicio oculto con la dirección del RPC y el puerto de su cliente
- Reinicie el servicio `tor`

Una vez que reinicie Tor, obtendrá las claves de servicio ocultas y un nombre de host en el directorio deseado. A partir de entonces, su RPC será accesible en un nombre de host `.onion`.

### Funcionamiento del nodo {#operating-the-node}

Deberá supervisar regularmente su nodo para asegurarse de que está funcionando de manera apropiada. Puede que necesite realizar un mantenimiento ocasional.

#### Mantenimiento del nodo en línea {#keeping-node-online}

Su nodo no necesita estar en línea todo el tiempo, pero debería mantenerlo en línea tanto tiempo como sea posible para que esté sincronizado con la red. Puede apagarlo para reiniciarlo, pero debe tener en cuenta que:

- El apagado puede tardar hasta unos minutos si el último estado se sigue grabando en el disco.
- Los apagados forzados pueden dañar la base de datos.
- Su cliente no sincronizará con la red y tendrá que resincronizar cuando lo reinicie.

Esto _no aplica a los nodos validadores en la capa de consenso._ La desconexión de su nodo afectará a todos los servicios que dependen de él. Si está ejecutando un nodo con fines de _apuesta_, debería tratar de minimizar tanto como sea posible el tiempo de inactividad.

#### Creación del servicio de cliente {#creating-client-service}

Considere la opción de crear un servicio para ejecutar su cliente automáticamente al iniciar. Por ejemplo, en servidores Linux, una buena práctica sería crear un servicio que ejecute el cliente con la configuración adecuada, con un usuario con privilegios limitados y reinicios automáticos.

#### Actualización del cliente {#updating-client}

Debe mantener actualizado el software de su cliente con los últimos parches de seguridad, características y [EIP](/eips/). Especialmente antes de las [bifurcaciones duras](/history/), asegúrese de que está ejecutando la versión de cliente correcta.

#### Ejecución de servicios adicionales {#running-additional-services}

Ejecutar tu propio nodo le permite usar servicios que requieren acceso directo al cliente RCP de Ethereum. Estos son servicios que se crean sobre Ethereum, como [soluciones de capa 2](/developers/docs/scaling/#layer-2-scaling), [clientes de consenso](/upgrades/get-involved/#clients) y otra infraestructura de Ethereum.

#### Supervisión del nodo {#monitoring-the-node}

Para poder supervisar adecuadamente su nodo, considere la opción de recopilar métricas. Los clientes proporcionan puntos de conexión de métricas para que pueda obtener datos completos acerca de su nodo. Use herramientas como [InfluxDB](https://www.influxdata.com/get-influxdb/) o [Prometheus](https://prometheus.io/) para crear bases de datos que pueda convertir en visualizaciones y gráficas en softwares como [Grafana](https://grafana.com/). Existen muchas configuraciones para usar este software y diferentes paneles Grafana para que visualice su nodo y la red en su conjunto. Como parte de la supervisión, asegúrese de comprobar el rendimiento de sus máquinas. Durante la sincronización inicial de su nodo, el software del cliente puede ser muy pesado para la CPU y la RAM. Además de Grafana, puede usar las herramientas que ofrece su sistema operativo como `htop` o `uptime` para llevar a cabo esta operación.

## Más información {#further-reading}

- [Análisis de los requisitos de hardware para crear un nodo validado y completo de Ethereum](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902)_: Albert Palau, 24 de septiembre de 2018_
- [Ejecución de los nodos completos de Ethereum: una guía para aquellas personas que se encuentren desmotivadas](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 de noviembre de 2019_
- [Ejecución de un nodo Ethereum](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/)_: ETHHub, actualizado frecuentemente_
- [Ejecución de un nodo Besu Hyperledger en la red principal de Ethereum: beneficios, requisitos y configuración](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _, Felipe Faraggi, 7 de Mayo de 2020_
- [Despliegue del cliente Ethereum Nethermind con pila de supervisión](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, 8 de julio de 2020_

## Temas relacionados {#related-topics}

- [Nodos y clientes](/developers/docs/nodes-and-clients/)
- [Bloques](/developers/docs/blocks/)
- [Redes](/developers/docs/networks/)
