---
title: Nodos y clientes
description: Una visión general de los nodos de Ethereum y del software del cliente, además de cómo configurar un nodo y por qué deberías hacerlo.
lang: es
sidebar: true
sidebarDepth: 2
isOutdated: true
---

Para que Ethereum funcione de forma descentralizada, necesita de una red de nodos distribuida que pueda verificar bloques e información de transacciones. Necesitas una aplicación, conocida como cliente, para "ejecutar" un nodo en tu dispositivo.

## Requisitos previos {#prerequisites}

Es recomendable que primero entiendas el concepto de red descentralizada antes de profundizar y ejecutar tu propia instancia de un cliente de Ethereum. Echa un vistazo a nuestra [introducción a Ethereum](/developers/docs/intro-to-ethereum/).

## ¿Qué son los nodos y clientes? {#what-are-nodes-and-clients}

Un "nodo" se refiere a una pieza de software conocida como cliente. Un cliente es una implementación de Ethereum, que verifica todas las transacciones en cada bloque, manteniendo la red segura y la precisión de los datos.

Puedes observar la red de Ethereum en tiempo real accediendo este [mapa de nodos](https://etherscan.io/nodetracker).

Varias [implementaciones de clientes de Ethereum](/developers/docs/nodes-and-clients/#execution-clients) existen en una variedad lenguajes de programación. Lo que estas implementaciones de clientes tienen en común es que todas siguen una especificación formal. Esta especificación determina cómo funcionan la red de Ethereum y las funciones de la blockchain.

![Cliente de Eth1x](../../../../../developers/docs/nodes-and-clients/client-diagram.png) Diagrama simplificado de las características del cliente de Ethereum.

## Tipos de nodos {#node-types}

    Si deseas ejecutar tu propio nodo, primero debes saber que hay diferentes tipos de nodos que consumen datos de forma diferente. De hecho, los clientes pueden ejecutar 3 diferentes tipos de nodos: ligero, completo y de almacenamiento. Además, hay opciones de diferentes estrategias de sincronización que permiten un tiempo de sincronización más rápido. La sincronización se refiere a la rapidez con que puede obtener la información más actualizada sobre el estado de Ethereum.

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

- Almacena todo lo que se guarda en el nodo completo y construye un archivo de estados históricos. Necesario si se desea consultar algo como el saldo de una cuenta en el bloque #4 000 000.
- Estos datos representan unidades de terabytes lo que hace que los nodos de archivo sean menos atractivos para los usuarios medios, pero pueden ser útiles para servicios como los exploradores de bloques, proveedores y análisis de cadena.

Sincronizar clientes en algún modo distinto al de almacenamiento (archivo) resultará en datos del blockchain truncados. Esto significa que no hay ningún archivo de todo el estado histórico, pero el nodo completo es capaz de construirlos bajo demanda.

## ¿Por qué debería ejecutar un nodo de Ethereum? {#why-should-i-run-an-ethereum-node}

Ejecutar un nodo te permite usar Ethereum de forma confiable y privada mientras das soporte al ecosistema.

### Beneficios para ti {#benefits-to-you}

Ejecutar tu propio nodo te permite utilizar Ethereum de una manera realmente privada, autosuficiente y sin confianza. No necesitas confiar en la red porque tú mismo puedes verificar los datos con tu cliente. "No confíes, verifica" es un mantra popular en blockchain.

- Tu nodo verifica todas las transacciones y bloquea aquellas que vayan en contra de las reglas del consenso por sí mismo. Esto significa que no tienes que depender de ningún otro nodo de la red o confiar plenamente en ellos.
- No tendrás que filtrar tus direcciones y saldos a nodos aleatorios. Todo puede ser verificado con tu propio cliente.
- Tu dapp puede ser más segura y privada si utilizas tu propio nodo. [Metamask](https://metamask.io), [MyEtherWallet](https://myetherwallet.com) y algunas otras carteras pueden ser configuradas fácilmente para apuntar a tu propio nodo local.

![Cómo accedes a Ethereum a través de tu aplicación y nodos](../../../../../developers/docs/nodes-and-clients/nodes.png)

### Beneficios de la red {#network-benefits}

Un conjunto diverso de nodos es importante para la salud, seguridad y resiliencia operativa de Ethereum.

- Proporcionan acceso a los datos de blockchain para clientes ligeros que dependen de ello. En picos de alto uso, es necesario que hayan suficientes nodos completos para ayudar a los nodos ligeros a sincronizarse. Los nodos ligeros no almacenan la blockchain completa, sino que verifican los datos usando [ los estados raíz en las cabeceras de los bloques](/developers/docs/blocks/#block-anatomy). Ellos pueden solicitar más información de los bloques si lo necesitan.
- Los nodos completos hacen cumplir las reglas de consenso de prueba de trabajo, de modo que no se les puede engañar para que acepten bloques que no siguen dichas reglas. Esto proporciona seguridad extra a la red porque, si todos los nodos fueran nodos ligeros y no realizaran la verificación completa, los mineros podrían atacar la red, y por ejemplo, crear bloques con mayores recompensas.

Si ejecuta un nodo completo, toda la red Ethereum se beneficia de él.

## Ejecución de tu propio nodo {#running-your-own-node}

### Proyectos {#projects}

[**Seleccionar un cliente y seguir sus instrucciones**](#clients)

**ethnode: \*\***_Ejecución de un nodo de Ethereum (Geth o Parity) en un entorno local._\*\*

- [GitHub](https://github.com/vrde/ethnode)

**DAppNode:** **_ Sistema de operación para ejecutar nodos web, incluyendo Ethereum, en una maquina exclusiva para ello._**

- [dappnode.io](https://dappnode.io)

### Recursos {#resources}

- [Ejecutando nodos completos de Ethereum: Una guía completa](https://medium.com/coinmonks/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _Nov 7, 2019 - Justin Leroux_
- [Hoja de características clave de la configuración de nodos](https://dev.to/5chdn/ethereum-node-configuration-modes-cheat-sheet-25l8), _5 de enero de 2019, Afri Schoeden_
- [Cómo instalar y ejecutar un nodo Geth](https://www.quiknode.io/guides/infrastructure/how-to-install-and-run-a-geth-node) _Oct 4, 2020 - Sahil Sen_
- [¿Como instalar, ejecutar y abrir Ethereum (fka. Parity) Nodo](https://www.quiknode.io/guides/infrastructure/how-to-run-a-openethereum-ex-parity-client-node) \_Septiembre 22, 2020 - Sahil Sen_ar

## Alternativas {#alternatives}

Ejecutar tu propio nodo puede ser difícil y no siempre necesitas ejecutar tu propia instancia. En estos casos, puedes usar un proveedor de API de terceros como [Infura](https://infura.io), [Alchemy](https://alchemyapi.io) o [QuikNode](https://www.quiknode.io). Alternativamente [ArchiveNode](https://archivenode.io/) es un nodo de archivo financiado por la comunidad que espera traer datos de archivo en la blockhain de Ethereum para desarrolladores independientes que de otra manera no puedan permitírselo.

Si alguien ejecuta un nodo de Ethereum con una API pública en tu comunidad, podrás apuntar tu cartera ligera (como MetaMask) o a un nodo comunitario [vía Custom RPC](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) y ganar más privacidad que con un tercero al azar.

Por otra parte, si administras un cliente, puedes compartirlo con tus amigos que lo necesiten.

## Clientes {#execution-clients}

Ethereum esta diseñado para ofrecer diferentes clientes, desarrollados por diferentes equipos que utilizan diferentes lenguajes de programación. Esto hace que la red sea mas fuerte y más diversa. El objetivo ideal es lograr la diversidad sin que ningún cliente tenga una posición dominante para reducir así los puntos de fracaso.

Esta tabla resume los diferentes clientes. En todos ellos se ha trabajado activamente para que mantengan y superen las [pruebas de cliente.](https://github.com/ethereum/tests)

| Cliente                                                      | Idioma   | Sistemas operativos   | Redes                                  | Estrategias de sincronización     | Lima de estado  |
| ------------------------------------------------------------ | -------- | --------------------- | -------------------------------------- | --------------------------------- | --------------- |
| [Geth](https://geth.ethereum.org/)                           | Ir       | Linux, Windows, macOS | Mainnet, Görli, Rinkeby, Ropsten       | Rápido, completo                  | Archivo, podado |
| [OpenEthereum](https://github.com/openethereum/openethereum) | Rust     | Linux, Windows, macOS | Mainnet, Kovan, Ropsten, etc.          | Warp, Completo                    | Archivo, podado |
| [Nethermind](http://nethermind.io/)                          | C#, .NET | Linux, Windows, macOS | Mainnet, Görli, Ropsten, Rinkeby, etc. | Rápido, completo                  | Archivo, podado |
| [Besu](https://pegasys.tech/solutions/hyperledger-besu/)     | Java     | Linux, Windows, macOS | Mainnet, Rinkeby, Ropsten, y Görli     | Rápido, completo                  | Archivo, podado |
| [Trinity](https://trinity.ethereum.org/)                     | Python   | Linux, macOS          | Mainnet, Görli, Ropsten, etc.          | Beam, Completo, Rápido/Encabezado | Archivo         |

Si deseas obtener más información sobre redes compatibles, puedes leer [Redes de Ethereum](/developers/docs/networks/).

### Ventajas de las diferentes implementaciones {#advantages-of-different-implementations}

Cada cliente tiene casos de uso y ventajas únicas, por lo que debe elegir basándose en sus propias preferencias. Esta diversidad permite que las implementaciones se centren en diferentes características y públicos. Puedes elegir un cliente basado en características, soporte, lenguaje de programación o licencias.

#### Go-Ethereum {#geth}

Go Ethereum (Geth para abreviar) es una de las implementaciones originales del protocolo de Ethereum. Actualmente, es el cliente más difundido con la mayor base de usuarios y variedad de herramientas para usuarios y desarrolladores. Está escrito en Go, completamente de código abierto y bajo licencia GNU LGPL v3.

#### OpenEthereum {#openethereum}

OpenEthereum es un cliente rápido y avanzado basado en CLI y en Ethereum. Está construido para proporcionar la infraestructura esencial para ofrecer servicios rápidos y fiables que requieren una rápida sincronización y un máximo de tiempo de actividad. El objetivo de OpenEthereum es ser el cliente de Ethereum más rápido, ligero y seguro. Proporciona un código base limpio y modular para:

- una personalización sencilla.
- una integración ligera en servicios o productos.
- una memoria y una huella de almacenamiento mínimas.

OpenEthereum se desarrolla utilizando el lenguaje de programación de vanguardia de Rust y está licenciado bajo GPLv3.

#### Nethermind {#nethermind}

Nethermind es una implementación de Ethereum hecha con la pila de C# .NET, y se ejecuta en todas las plataformas importantes, como ARM. Ofrece un gran rendimiento con:

- una máquina virtual optimizada
- acceso al estado
- networking y características importantes, como tableros de control Prometheus/Graphana, soporte de registro para empresas de seg, rastreo de JSON RPC y plugins de análisis.

Además, Nethermind dispone de [documentación detallada](https://docs.nethermind.io), un fuerte soporte para desarrolladores, una comunidad en línea y asistencia ininterrumpida disponible para usuarios prémium.

#### Besu {#besu}

Hyperledger Besu es un cliente de grado de prestigio Ethereum para redes públicas y autorizadas. Ejecuta todas las características de la red principal de Ethereum, desde seguimiento hasta GraphQL, tiene una amplia supervisión y es compatible con ConsenSys, tanto en canales comunitarios abiertos como a través de SLA comerciales para empresas. Está escrito en Java y dispone de licencia Apache 2.0.

### Modos de sincronización {#sync-modes}

- Completo: Descarga todos los bloques (incluyendo cabeceras, transacciones y recibos) y genera el estado de la blockchain incrementalmente al ejecutar cada bloque.
- Rápido (por defecto): Descarga todos los bloques (incluidas las cabeceras, las transacciones y los recibos), verifica todas las cabeceras y descarga el estado y lo verifica con las cabeceras.
- Ligero: Descarga todos los encabezados de bloques, datos de bloqueo y verifica algunos al azar.
- Sincronización de tipo Warp: Cada 5000 bloques, los nodos tomarán una instantánea crítica consensuada del estado de ese bloque. Cualquier nodo puede obtener estas instantáneas a través de la red, lo que permite una sincronización rápida. [Más información sobre Warp](https://openethereum.github.io/wiki/Warp-Sync-Snapshot-Format)
- Sincronización de tipo Beam: Un modo de sincronización que te permite ir más rápido. No necesita largas esperas para sincronizar, sino que rellena datos a lo largo del tiempo. [Más información sobre Beam](https://medium.com/@jason.carver/intro-to-beam-sync-a0fd168be14a)
- Sincronización de cabecera: Puedes usar un punto de control de confianza para comenzar a sincronizar desde una cabecera más reciente y, a continuación, dejarlo a un proceso de segundo plano para llenar los huecos eventualmente

Defines el tipo de sincronización cuando realizas la configuración. Sería algo así como esto:

**Configurando una sincronización ligera en [GETH](https://geth.ethereum.org/)**

`geth: modo de sincronización "ligero"`

**Configurando una sincronización de cabecera en Trinity**

`trinity: sincronización desde el punto de comprobación eth://block/byhash/0xa65877df954e1ff2012473efee8287252eee956c0d395a5791f1103a950a1e21?score=15,835,269,727,022,672,760,774`

## Hardware {#hardware}

Los requisitos de hardware difieren según el cliente, pero por lo general no son tan altos, ya que el nodo sólo necesita mantenerse sincronizado. No lo confundas con la minería, que necesita mucha más potencia computacional. Sin embargo, el tiempo de sincronización y el rendimiento mejoran si se dispone de hardware más potente. Según tus necesidades y deseos, Ethereum puede ejecutarse en tu ordenador, servidor de casa, ordenador de una sola placa o servidores privados virtuales en la nube.

Una forma fácil para ejecutar tu propio nodo es usando cajas de rápida instalación, como [DAppNode](https://dappnode.io/). Proporciona hardware para ejecutar clientes y aplicaciones que dependen de ellos con una interfaz de usuario simple.

### Requerimientos {#requirements}

Antes de instalar un cliente, asegúrate de que tu equipo tiene suficientes recursos para ejecutarlo. Los requisitos mínimos y recomendados se pueden encontrar a continuación, pero la parte clave es el espacio en disco. La sincronización de la blockchain de Ethereum es muy intensiva en la entrada/salida. Es mejor tener un disco de estado sólido (SSD). Para ejecutar un cliente Ethereum en HDD, necesitarás al menos 8 GB de RAM para usar como caché.

#### Requisitos mínimos {#recommended-specifications}

- CPU con 2 o más núcleos
- 4 GB de RAM mínimo con SSD, 8 GB+ si tienes un HDD
- 8 o más MBit/s de banda ancha

#### Especificaciones recomendadas {#recommended-specifications}

- CPU rápido con 4 o más núcleos
- 16 GB o más de RAM
- SSD rápido con al menos 500 GB de espacio libre
- 25 o más MBit/s de banda ancha

Dependiendo de qué software y modo de sincronización vas a usar, se necesitan cientos de GB de espacio en disco. Los números aproximados y el crecimiento se pueden encontrar a continuación.

| Cliente      | Tamaño del disco (sincronización rápida) | Tamaño del disco (archivo completo) |
| ------------ | ---------------------------------------- | ----------------------------------- |
| Geth         | 400 GB o más                             | 4,7 TB o más                        |
| OpenEthereum | 280 GB o más                             | 4,6 TB o más                        |
| Nethermind   | 200 GB o más                             | 3TB+                                |
| Besu         | 750GB+                                   | 4TB+                                |

![Un gráfico que muestra los GB necesarios para una sincronización completa tiene un tendencia hacia arriba](../../../../../developers/docs/nodes-and-clients/full-sync.png)

![Un gráfico que muestra los GB necesarios para una sincronización de archivo tiene un tendencia hacia arriba](../../../../../developers/docs/nodes-and-clients/archive-sync.png)

Estos gráficos muestran que los requisitos de almacenamiento siempre están cambiando. Para obtener los datos más actualizados para Geth and Parity, consulta los [datos de sincronización completa](https://etherscan.io/chartsync/chaindefault) y los [datos de sincronización de archivos](https://etherscan.io/chartsync/chainarchive).

### Ethereum en un ordenador de una sola placa {#ethereum-on-a-single-board-computer}

La manera más conveniente y barata de ejecutar un nodo de Ethereum es usar una computadora de placa única con arquitectura ARM como Raspberry Pi. [Ethereum en ARM](https://twitter.com/EthereumOnARM) proporciona imágenes de clientes de Geth, Parity y Besu. Aquí se incluye un simple tutorial sobre [cómo construir y configurar un cliente ARM](/developers/tutorials/run-node-raspberry-pi/).

Los dispositivos pequeños, económicos y eficientes como estos son ideales para ejecutar un nodo en casa.

## Clientes eth2 {#consensus-clients}

Hay nuevos clientes que soportan las [actualizaciones de Eth2](/upgrades/beacon-chain/). Ellos ejecutarán la cadena de baliza y apoyarán el nuevo mecanismo de consenso [a prueba de estaturas](/developers/docs/consensus-mechanisms/pos/).

[Ver clientes de Eth2](/upgrades/get-involved/#clients).

## Más lectura {#further-reading}

Hay muchas instrucciones e información sobre los clientes de Ethereum en Internet, aquí se incluyen algunas que puedan ser útiles.

- [Ethereum 101 - Parte 2 - Explicación de los nodos](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, 13 de Febrero de 2019_
- [Ejecución de los nodos completos de Ethereum: Una guía para los recién llegados ](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _Nov 7, 2019 - Justin Leroux_
- [Ejecución de un nodo Ethereum](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/)_: ETHHub, actualizado frecuentemente_
- [Análisis de los requisitos de hardware para ser un nodo validado y completo de Ethereum](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902)_: Albert Palau, 24 de Septiembre de 2018_
- [Ejecución de un Nodo Besu Hyperledger en el Mainnet de Ethereum: Beneficios, requerimientos y configuración](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _, Felipe Faraggi, 7 de Mayo de 2020_

## Temas relacionados {#related-topics}

- [Bloques](/developers/docs/blocks/)
- [Redes](/developers/docs/networks/)

## Tutoriales relacionados {#related-tutorials}

- [Ejecución de un nodo con Geth](/developers/tutorials/run-light-node-geth/)_: Cómo descargar, instalar y ejecutar Geth. Cubriendo los modos de sincronización, la consola JavaScript, etc._
- [Convierte tu Raspberry Pi 4 en un nodo de Eth 1.0 o Eth 2.0 simplemente flasheando la tarjeta MicroSD: Guía de instalación](/developers/tutorials/run-node-raspberry-pi/)_. Actualiza tu Raspberry Pi 4, conecta un cable de Ethernet, conecta el disco SSD y enciende el dispositivo para convertir el Raspberry Pi 4 en un nodo completo de Ethereum 1.0 o de Ethereum 2.0 (cadena de baliza/validador)._
