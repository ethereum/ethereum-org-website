---
title: Nodos y clientes
description: Una visión general de los nodos de Ethereum y del software del cliente, además de cómo configurar un nodo y por qué deberías hacerlo.
lang: es
sidebarDepth: 2
---

Ethereum es una red distribuida de ordenadores (conocidos como "nodos") que ejecutan software capaz de verificar bloques y datos de transacciones. Necesitas una aplicación, conocida como cliente, para "ejecutar" un nodo en tu dispositivo.

## Requisitos previos {#prerequisites}

Debe estar familiarizado con el concepto de una red entre pares y [los aspectos básicos sobre la EVM](/developers/docs/evm/) antes de profundizar y ejecutar su propia instancia de un cliente de Ethereum. Eche un vistazo a nuestra [introducción a Ethereum](/developers/docs/intro-to-ethereum/).

Si eres nuevo en el tema de los nodos, te recomendamos primero revisar nuestra amigable introducción en [ejecutando un nodo Ethereum](/run-a-node).

## ¿Qué son los nodos y clientes? {#what-are-nodes-and-clients}

"Nodo" se refiere a una pieza de software cliente en ejecución. Un cliente es una implementación de Ethereum, que verifica todas las transacciones en cada bloque, manteniendo la red segura y la precisión de los datos.

Puedes observar la red de Ethereum en tiempo real accediendo este [mapa de nodos](https://etherscan.io/nodetracker).

Existen varios [clientes de Ethereum](/developers/docs/nodes-and-clients/#execution-clients), en una variedad de lenguajes de programación como Go, Rust, JavaScript, Typescript, Python, C# .NET, Nim y Java. Lo que estas implementaciones tienen en común es que todas siguen una especificación formal (originalmente, el [libro amarillo de Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)). Esta especificación determina cómo funcionan la red de Ethereum y las funciones de la blockchain.

![Cliente de ejecución](./client-diagram.png) Diagrama simplificado de las características del cliente de Ethereum.

## Tipos de nodos {#node-types}

Si desea [ejecutar su propio nodo](/developers/docs/nodes-and-clients/run-a-node/), debe entender que existen diferentes tipos de nodos que consumen datos de forma diferente. De hecho, los clientes pueden ejecutar 3 diferentes tipos de nodos: ligero, completo y de almacenamiento. Además, hay opciones de diferentes estrategias de sincronización que permiten un tiempo de sincronización más rápido. La sincronización se refiere a la rapidez con que puede obtener la información más actualizada sobre el estado de Ethereum.

### Nodo completo {#full-node}

- Almacena datos completos de la cadena de bloques.
- Participa en la validación de bloques, verifica todos los bloques y estados.
- Todos los estados pueden derivarse de un nodo completo.
- Sirve a la red y proporciona datos si se le solicita.

### Nodo ligero {#light-node}

- Almacena la cadena de cabecera y solicita todo lo demás.
- Puede verificar la validez de los datos contra las raíces del estado en las cabeceras de bloques.
- Es útil para dispositivos de baja capacidad, como dispositivos embebidos o teléfonos móviles, que no pueden permitirse almacenar gigabytes de datos de blockchain.

### Nodo de almacenamiento {#archive-node}

- Almacena todo lo que se guarda en el nodo completo y construye un archivo de estados históricos. Esto es necesario si quieres consultar algún elementos como el saldo de una cuenta en el bloque número 4.000.000 o simplemente [probar sus propias transacciones sin minarlas usando OpenEthereum](https://openethereum.github.io/JSONRPC-trace-module#trace_callmany).
- Estos datos representan unidades de terabytes lo que hace que los nodos de archivo sean menos atractivos para los usuarios medios, pero pueden ser útiles para servicios como los exploradores de bloques, proveedores y análisis de cadena.

Sincronizar clientes en algún modo distinto al de almacenamiento (archivo) resultará en datos del blockchain truncados. Esto significa que no hay un archivo de todo el histórico de estados, pero el nodo es capaz de construirlo bajo demanda.

## ¿Por qué debería ejecutar un nodo de Ethereum? {#why-should-i-run-an-ethereum-node}

Ejecutar un nodo te permite usar Ethereum de forma confiable y privada mientras das soporte al ecosistema.

### Beneficios para ti {#benefits-to-you}

Ejecutar tu propio nodo te permite utilizar Ethereum de una manera realmente privada, autosuficiente y sin confianza. No necesitas confiar en la red porque tú mismo puedes verificar los datos con tu cliente. "No confíes, verifica" es un mantra popular en blockchain.

- Tu nodo verifica todas las transacciones y bloquea aquellas que vayan en contra de las reglas del consenso por sí mismo. Esto significa que no tienes que depender de ningún otro nodo de la red o confiar plenamente en ellos.
- No tendrás que filtrar tus direcciones y saldos a nodos aleatorios. Todo puede ser verificado con tu propio cliente.
- Tu dapp puede ser más segura y privada si utilizas tu propio nodo. [MetaMask](https://metamask.io), [MyEtherWallet](https://myetherwallet.com) y otras carteras pueden ser configuradas fácilmente para apuntar a tu nodo local.
- Puede programar sus propios puntos de conexión RPC.
- Puede conectarse a su nodo usando la **comunicación entre procesos (IPC)** o reescribiendo el nodo para cargar su programa como un complemento. Esto otorga poca latencia, lo que es necesario para reemplazar sus transacciones tan rápido como sea posible (es decir, ejecución frontal).

![Cómo accedes a Ethereum a través de tu aplicación y nodos](./nodes.png)

### Beneficios de la red {#network-benefits}

Un conjunto diverso de nodos es importante para la salud, seguridad y resiliencia operativa de Ethereum.

- Proporcionan acceso a los datos de blockchain para clientes ligeros que dependen de ello. En picos de alto uso, es necesario que hayan suficientes nodos completos para ayudar a los nodos ligeros a sincronizarse. Los nodos ligeros no almacenan la cadena de bloques completa, sino que verifican los datos usando [ los estados raíz en las cabeceras de los bloques](/developers/docs/blocks/#block-anatomy). Ellos pueden solicitar más información de los bloques si lo necesitan.
- Los nodos completos hacen cumplir las reglas de consenso de prueba de trabajo, de modo que no se les puede engañar para que acepten bloques que no siguen dichas reglas. Esto proporciona seguridad extra a la red porque, si todos los nodos fueran nodos ligeros y no realizaran la verificación completa, los mineros podrían atacar la red, y por ejemplo, crear bloques con mayores recompensas.

Si ejecuta un nodo completo, toda la red Ethereum se beneficia de él.

## Ejecución de tu propio nodo {#running-your-own-node}

¿Está interesado/a en ejecutar su propio cliente de Ethereum?

Para una introducción para principiantes, visita nuestra página de [ejecuta un nodo](/run-a-node) para obtener más información.

If you're more of a technical user, learn how to [spin up your own node](/developers/docs/nodes-and-clients/run-a-node/) with the command line!

### Proyectos {#projects}

[**Seleccionar un cliente y seguir sus instrucciones**](#clients)

**ethnode -** **_Ejecución de un nodo de Ethereum (Geth u OpenEthereum) en un entorno local_**

- [GitHub](https://github.com/vrde/ethnode)

**DAppNode -** **_Una GUI del sistema operativo para ejecutar nodos Web3, incluidos Ethereum y la cadena de baliza, en una máquina dedicada_**

- [dappnode.io](https://dappnode.io)

### Recursos {#resources}

- [Ejecutando nodos completos de Ethereum: Una guía completa](https://medium.com/coinmonks/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _Nov 7, 2019 - Justin Leroux_
- [Hoja de características clave de la configuración de nodos](https://dev.to/5chdn/ethereum-node-configuration-modes-cheat-sheet-25l8), _5 de enero de 2019, Afri Schoeden_
- [Cómo instalar y ejecutar un nodo Geth](https://www.quiknode.io/guides/infrastructure/how-to-install-and-run-a-geth-node) _Oct 4, 2020 - Sahil Sen_
- [¿Como instalar, ejecutar y abrir Ethereum (fka. Parity) Nodo](https://www.quiknode.io/guides/infrastructure/how-to-run-a-openethereum-ex-parity-client-node) \_Septiembre 22, 2020 - Sahil Sen_ar

## Alternativas {#alternatives}

Ejecutar su propio nodo puede resultar complicado y no siempre necesita ejecutar su propia instancia. En estos casos, puede usar un proveedor de API de terceros como [Infura](https://infura.io), [Alchemy](https://alchemyapi.io) o [QuikNode](https://www.quiknode.io). De forma alternativa, [ArchiveNode](https://archivenode.io/) es un nodo de archivo financiado por la comunidad que pretende reunir datos de archivo en la cadena de bloques de Ethereum para desarrolladores independientes que de otra manera no puedan permitírselo. Para obtener una visión general sobre el uso de estos servicios, consulta la página [nodos como un servicio](/developers/docs/nodes-and-clients/nodes-as-a-service/).

Si alguien ejecuta un nodo de Ethereum con una API pública en su comunidad, podrá vincular su cartera (como MetaMask) a un nodo de la comunidad [a través de Custom RPC](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) y obtener una mayor privacidad que con un tercero aleatorio.

Por otra parte, si ejecuta un cliente, puede compartirlo con sus amigos que lo necesiten.

## Cliente de ejecución (anteriormente, «clientes Eth1») {#execution-clients}

La comunidad de Ethereum tiene múltiples clientes de ejecución de código abierto (antes conocidos como «clientes Eth1», o simplemente «clientes de Ethereum»), desarrollados por diferentes equipos mediante el uso de diferentes lenguajes de programación. Esto hace que la red sea mas sólida y más diversa. El objetivo ideal es lograr la diversidad sin que ningún cliente tenga una posición dominante para reducir así los puntos únicos de error.

En esta tabla se resumen los diferentes clientes. Todos ellos pasan [pruebas de cliente](https://github.com/ethereum/tests) y se gestionan de manera activa para mantenerse actualizados con actualizaciones de red.

| Cliente                                                                   | Idioma   | Sistemas operativos   | Redes                                      | Estrategias de sincronización | Lima de estado     |
| ------------------------------------------------------------------------- | -------- | --------------------- | ------------------------------------------ | ----------------------------- | ------------------ |
| [Geth](https://geth.ethereum.org/)                                        | Go       | Linux, Windows, macOS | Mainnet, Görli, Rinkeby, Ropsten           | Snap, Full                    | Archivo, podado    |
| [Nethermind](http://nethermind.io/)                                       | C#, .NET | Linux, Windows, macOS | Mainnet, Görli, Ropsten, Rinkeby, etc.     | Fast, Beam, Archive           | Archivo, podado    |
| [Besu](https://besu.hyperledger.org/en/stable/)                           | Java     | Linux, Windows, macOS | Mainnet, Rinkeby, Ropsten, Görli, and more | Rápido, completo              | Archivo, podado    |
| [Erigon](https://github.com/ledgerwatch/erigon)                           | Go       | Linux, Windows, macOS | Mainnet, Görli, Rinkeby, Ropsten           | Full                          | Archivo, podado    |
| [OpenEthereum (Deprecated)](https://github.com/openethereum/openethereum) | Rust     | Linux, Windows, macOS | Mainnet, Kovan, Ropsten, etc.              | Warp, Completo                | Archivo, eliminado |

**Tenga en cuenta que OpenEthereum[ha quedado obsoleta](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd)y no tiene mantenimiento.** Debe usarla con precaución y, preferiblemente, cambiar de cliente.

Si desea obtener más información sobre redes compatibles, puede leer el apartado de [Redes de Ethereum](/developers/docs/networks/).

### Ventajas de las diferentes implementaciones {#advantages-of-different-implementations}

Cada cliente tiene casos de uso y ventajas únicas, por lo que debe elegir basándose en sus propias preferencias. La diversidad permite que las implementaciones se centren en diferentes características y públicos. Puede elegir un cliente en función de las características, la asistencia, el lenguaje de programación o las licencias.

#### Go-Ethereum {#geth}

Go Ethereum (Geth, para abreviar) es una de las implementaciones originales del protocolo de Ethereum. Actualmente, es el cliente más difundido con la mayor base de usuarios y variedad de herramientas para usuarios y desarrolladores. Está escrito en Go, es de código totalmente abierto y se comercializa con la licencia GNU LGPL v3.

#### OpenEthereum {#openethereum}

OpenEthereum es un cliente de Ethereum rápido, rico en recursos y avanzado en CLI. Está construido para proporcionar la infraestructura esencial para ofrecer servicios rápidos y fiables que requieren una rápida sincronización y un máximo de tiempo de actividad. El objetivo de OpenEthereum es ser el cliente de Ethereum más rápido, ligero y seguro. Proporciona un código base limpio y modular para:

- una personalización sencilla.
- una integración ligera en servicios o productos.
- una memoria y una huella de almacenamiento mínimas.

OpenEthereum se desarrolla mediante el uso del lenguaje de programación de vanguardia de Rust y se comercializa con la licencia GPLv3.

**Tenga en cuenta que OpenEthereum[ha quedado obsoleta](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd)y no tiene mantenimiento.** Debe usarla con precaución y, preferiblemente, cambiar de cliente.

#### Nethermind {#nethermind}

Nethermind es una implementación de Ethereum diseñada con la pila de C# .NET, y se ejecuta en todas las plataformas importantes, como ARM. Ofrece un gran rendimiento con:

- una máquina virtual optimizada
- acceso al estado
- redes y características importantes, como paneles de control Prometheus/Graphana, asistencia de registro para empresas de seg, rastreo de JSON RPC y complementos de análisis.

Además, Nethermind dispone de [documentación detallada](https://docs.nethermind.io), una sólida asistencia para desarrolladores, una comunidad en línea y asistencia ininterrumpida disponible para usuarios prémium.

#### Besu {#besu}

Hyperledger Besu es un cliente empresarial de Ethereum para redes públicas y autorizadas. Ejecuta todas las características de la red principal de Ethereum, desde el seguimiento hasta GraphQL, ejerce una amplia supervisión y es compatible con ConsenSys, tanto en canales comunitarios abiertos como a través de SLA comerciales para empresas. Está escrito en Java y dispone de licencia Apache 2.0.

#### Erigon {#erigon}

Erigon, antiguamente conocido como Turbo Geth, es una variante de Go Ethereum orientada hacia la velocidad y la eficiencia del espacio en el disco. Erigon es una implementación completamente rediseñada de Ethereum, actualmente escrita en Go pero con implementaciones planeadas en otros idiomas. El objetivo de Erigon es proporcionar una implementación más rápida, modular y optimizada de Ethereum. Puede realizar una sincronización completa de nodos de archivo usando menos de 2 TB de espacio en disco, en menos de 3 días

### Modos de sincronización {#sync-modes}

Para seguir y verificar los datos actuales en la red, el cliente Ethereum debe sincronizarse con el último estado de red. Para ello, es necesario descargar datos de pares, comprobar criptográficamente su integridad y construir una base de datos local de cadenas de bloques.

Los modos de sincronización representan diferentes enfoques de este proceso con diferentes compensaciones. Los clientes también varían en su implementación de algoritmos de sincronización. Consulte siempre la documentación oficial del cliente elegido para obtener información específica sobre su implementación.

#### Resumen de las estrategias {#overview-of-strategies}

Resumen general de los enfoques de sincronización utilizados en clientes listos para la red principal:

##### Sincronización total {#full-sync}

La sincronización total descarga todos los bloques (incluidos los encabezados, las transacciones y los recibos) y va generando de manera creciente el estado del la cadena de bloques al ejecutar cada bloque desde el principio.

- Minimiza la confianza y ofrece la máxima seguridad al verificar cada transacción.
- Debido al número creciente de transacciones, puede llevar de días a semanas procesar todas las transacciones.

##### Sincronización rápida

La sincronización rápida descarga todos los bloques (incluidos los encabezados, las transacciones y los recibos), comprueba todos los encabezados, descarga el estado y lo compara con los encabezados.

- Se basa en la seguridad del mecanismo de consenso.
- La sincronización tarda solo algunas horas.

##### Sincronización ligera

El modo ligero del cliente descarga todos los encabezados de los bloques, la información de los bloques y luego verifica algunos de manera aleatoria. Solamente sincroniza un extremo de la cadena desde el punto de control de confianza.

- Obtiene solamente el último estado mientras confía en los desarrolladores y en el mecanismo de consenso.
- Cliente listo para usar con el estado actual de la red en pocos minutos.

[Más sobre clientes ligeros](https://www.parity.io/blog/what-is-a-light-client/)

##### Sincronización instantánea

Implementado por Geth. El uso de instantáneas dinámicas entregadas por pares recupera todos los datos de la cuenta y el almacenamiento sin descargar los nodos de prueba intermedios y, a continuación, reconstruye dichos nodos de prueba Merkle localmente.

- La estrategia de sincronización más rápida desarrollada por Geth, actualmente es su valor predeterminado
- Ahorra mucho uso de espacio en disco y ancho de banda de red sin sacrificar la seguridad.

[Más sobre la sincronización instantánea](https://github.com/ethereum/devp2p/blob/master/caps/snap.md)

##### Sincronización Warp

Implementado por OpenEthereum. Los nodos generan de manera regular una instantánea crítica de estado de consenso y cualquier par puede obtener estas instantáneas a través de la red, lo que permite llevar a cabo una rápida sincronización desde este punto.

- El modo de sincronización más rápido y predeterminado de OpenEthereum depende de las instantáneas estáticas entregadas por los pares.
- Estrategia similar a la sincronización instantánea pero sin algunos beneficios de seguridad.

[Más información sobre la sincronización Warp](https://openethereum.github.io/Beginner-Introduction#warping---no-warp)

##### Sincronización Beam

Implementado por Nethermind y Trinity. Funciona como una sincronización rápida, pero, además, descarga los datos necesarios para ejecutar los bloques más recientes, lo que permite realizar consultas en la cadena poco después de la inicialización.

- Sincroniza el estado primero y le permite realizar consultas RPC en pocos minutos.
- Al estar todavía en desarrollo y no ser totalmente fiable, la sincronización en segundo plano se ralentiza y las respuestas RPC podrían fallar.

[Más información sobre la sincronización Beam](https://medium.com/@jason.carver/intro-to-beam-sync-a0fd168be14a)

#### Configuración en cliente {#client-setup}

Los clientes ofrecen múltiples opciones de configuración para satisfacer sus necesidades. Escoja el más apropiado para usted según el nivel de seguridad, los datos disponibles y el coste. Además del algoritmo de sincronización, también puede configurar la limpieza de datos desactualizados. La limpieza permite eliminar datos desactualizados, p. ej., eliminar nodos de prueba de estado ya inaccesibles desde los últimos bloques.

Lea con atención la documentación del cliente o la página de ayuda para descubrir cuál es el modo de sincronización predeterminado. Puede definir el tipo de sincronización que prefiera de la siguiente manera:

**Configuración de la sincronización ligera [GETH](https://geth.ethereum.org/) o [ERIGON](https://github.com/ledgerwatch/erigon)**

`geth: modo de sincronización «ligero»`

Para obtener más información, visite el tutorial sobre [cómo ejecutar un nodo ligero Geth](/developers/tutorials/run-light-node-geth/).

**Configuración de la sincronización completa con archivado en [Besu](https://besu.hyperledger.org/)**

`besu --sync-mode=FULL`

Como cualquier otra configuración, puede establecerse con un parámetro de inicialización o en el archivo de configuración. Otro ejemplo es [Nethermind](https://docs.nethermind.io/nethermind/), que le pide que elija la configuración durante la inicialización y crea un archivo de configuración.

## Clientes de consenso (anteriormente, clientes Eth2) {#consensus-clients}

Existen múltiples clientes de consenso (antes conocidos como clientes "Eth2") que respaldan las [actualizaciones de conseso](/upgrades/beacon-chain/). They are running the Beacon Chain and will provide proof-of-stake consensus mechanism to execution clients after [The Merge](/upgrades/merge/).

[Ver clientes de consenso](/upgrades/get-involved/#clients).

| Cliente                                                     | Idioma     | Sistemas operativos   | Redes                                     |
| ----------------------------------------------------------- | ---------- | --------------------- | ----------------------------------------- |
| [Teku](https://pegasys.tech/teku)                           | Java       | Linux, Windows, macOS | Cadena de baliza, Prater                  |
| [Nimbus](https://nimbus.team/)                              | Nim        | Linux, Windows, macOS | Cadena de baliza, Prater                  |
| [Lighthouse](https://lighthouse-book.sigmaprime.io/)        | Rust       | Linux, Windows, macOS | Cadena de baliza, Prater, Pyrmont         |
| [Lodestar](https://lodestar.chainsafe.io/)                  | TypeScript | Linux, Windows, macOS | Cadena de baliza, Prater                  |
| [Prysm](https://docs.prylabs.network/docs/getting-started/) | Go         | Linux, Windows, macOS | Cadena de baliza, Gnosis, Prater, Pyrmont |

## Hardware {#hardware}

Los requisitos de hardware difieren según el cliente, pero por lo general no son tan altos, ya que el nodo sólo necesita mantenerse sincronizado. No lo confundas con la minería, que necesita mucha más potencia computacional. Sin embargo, el tiempo de sincronización y el rendimiento mejoran si se dispone de hardware más potente. Según tus necesidades y deseos, Ethereum puede ejecutarse en tu ordenador, servidor de casa, ordenador de una sola placa o servidores privados virtuales en la nube.

Una forma fácil para ejecutar tu propio nodo es usando cajas de rápida instalación, como [DAppNode](https://dappnode.io/). Proporciona hardware para ejecutar clientes y aplicaciones que dependen de ellos con una interfaz de usuario simple.

### Requerimientos {#requirements}

Antes de instalar un cliente, asegúrate de que tu equipo tiene suficientes recursos para ejecutarlo. Los requisitos mínimos y recomendados se pueden encontrar a continuación, pero la parte clave es el espacio en disco. La sincronización de la cadena de Ethereum conlleva una carga intensiva de input/output (entrada y salida de datos). Se recomienda usar una unidad de estado sólido (SSD). Para ejecutar un cliente Ethereum en HDD, necesitarás al menos 8 GB de RAM para usar como caché.

#### Requisitos mínimos {#recommended-specifications}

- CPU con dos o más núcleos
- 4 GB de RAM mínimo con SSD, 8 GB o más si tiene un HDD
- 8 o más MBit/s de banda ancha

#### Especificaciones recomendadas {#recommended-specifications}

- CPU rápida con cuatro o más núcleos
- 16 GB o más de RAM
- SSD rápido con al menos 500 GB de espacio libre
- 25 o más MBit/s de banda ancha

El modo de sincronización que elijas afectará a los requerimientos de espacio, pero hemos estimado el espacio en disco que necesitarás para cada cliente a continuación.

| Cliente      | Tamaño del disco (sincronización rápida) | Tamaño del disco (archivo completo) |
| ------------ | ---------------------------------------- | ----------------------------------- |
| Geth         | 400 GB o más                             | 6 TB o más                          |
| OpenEthereum | 280 GB o más                             | 6 TB o más                          |
| Nethermind   | 200 GB o más                             | 5 TB o más                          |
| Besu         | 750 GB o más                             | 5 TB o más                          |
| Erigon       | N/A                                      | +1 TB                               |

- Nota: Erigon no realiza la sincronización rápida, pero permite llevar a cabo la limpieza completa (~500 GB)

![Una gráfica que muestra que los GB necesarios para la sincronización completa tiene un tendencia alcista](./full-sync.png)

![Una gráfica que muestra que los GB necesarios para la sincronización de archivado tiene un tendencia alcista](./archive-sync.png)

Esta gráfica muestra que los requisitos de almacenamiento están en constante cambio. Para obtener la información más reciente para Geth y OpenEthereum, consulta las secciones sobre los [datos de sincronización completa](https://etherscan.io/chartsync/chaindefault) y los [datos de sincronización de archivo](https://etherscan.io/chartsync/chainarchive).

### Ethereum en un ordenador de una sola placa {#ethereum-on-a-single-board-computer}

La manera más conveniente y barata de ejecutar un nodo de Ethereum es usar un ordenador de placa única con arquitectura ARM, como Raspberry Pi. [Ethereum en ARM](https://twitter.com/EthereumOnARM) proporciona imágenes de clientes de Geth, Parity y Besu. Aquí podrás encontrar un simple tutorial sobre [cómo construir y configurar un cliente ARM](/developers/tutorials/run-node-raspberry-pi/).

Los dispositivos pequeños, económicos y eficientes como estos son ideales para ejecutar un nodo desde casa.

## Más lectura {#further-reading}

Existe mucha información acerca de los clientes de Ethereum en internet. Estos son algunos de los recursos que le pueden resultar útiles.

- [Ethereum 101 - Parte 2 - Explicación de los nodos](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, 13 de febrero de 2019_
- [Ejecución de los nodos completos de Ethereum: una guía para aquellas personas que se encuentren desmotivadas](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 de noviembre de 2019_
- [Ejecución de un nodo Ethereum](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/)_: ETHHub, actualizado frecuentemente_
- [Análisis de los requisitos de hardware para crear un nodo validado y completo de Ethereum](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902)_: Albert Palau, 24 de Septiembre de 2018_
- [Ejecución de un nodo Besu Hyperledger en la red principal de Ethereum: beneficios, requisitos y configuración](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _, Felipe Faraggi, 7 de mayo de 2020_

## Temas relacionados {#related-topics}

- [Bloques](/developers/docs/blocks/)
- [Redes](/developers/docs/networks/)

## Tutoriales relacionados {#related-tutorials}

- [Ejecución de un nodo con Geth](/developers/tutorials/run-light-node-geth/) _: cómo descargar, instalar y ejecutar Geth. Covering syncmodes, the JavaScript console, and more._
- [Convierta su Raspberry Pi 4 en un nodo validador con solo intercambiar su tarjeta MicroSD - Guía de instalación](/developers/tutorials/run-node-raspberry-pi/) _Intercambie su Raspberry Pi 4, conecte un cable ethernet, conecte el disco SSD y encienda el dispositivo para convertir el Raspberry Pi 4 en un nodo completo de Ethereum mediante la activación de la capa de ejecución (red principal) o la capa de consenso (cadena de baliza/validador)._
