---
title: Introducción técnica a las dapps
description:
lang: es
---

Una aplicación descentralizada (dapp) es una aplicación construida sobre una red descentralizada que combina un [contrato inteligente](/developers/docs/smart-contracts/) y una interfaz de usuario frontend. En [Ethereum](/), los contratos inteligentes son accesibles y transparentes (como las API abiertas), por lo que su dapp puede incluso incluir un contrato inteligente que otra persona haya escrito.

## Requisitos previos {#prerequisites}

Antes de aprender sobre las dapps, debería repasar los [conceptos básicos de la cadena de bloques](/developers/docs/intro-to-ethereum/) y leer sobre la red Ethereum y cómo está descentralizada.

## Definición de una dapp {#definition-of-a-dapp}

Una dapp tiene su código backend ejecutándose en una red descentralizada entre pares. Contraste esto con una aplicación donde el código backend se ejecuta en servidores centralizados.

Una dapp puede tener código frontend e interfaces de usuario escritas en cualquier lenguaje (al igual que una aplicación) para realizar llamadas a su backend. Además, su frontend puede alojarse en un almacenamiento descentralizado como [IPFS](https://ipfs.io/).

- **Descentralizada**: las dapps operan en Ethereum, una plataforma pública abierta y descentralizada donde ninguna persona o grupo tiene el control.
- **Determinista**: las dapps realizan la misma función independientemente del entorno en el que se ejecuten.
- **Turing completo**: las dapps pueden realizar cualquier acción dados los recursos necesarios.
- **Aislada**: las dapps se ejecutan en un entorno virtual conocido como la Máquina Virtual de Ethereum (EVM), de modo que si el contrato inteligente tiene un error, no obstaculizará el funcionamiento normal de la red de la cadena de bloques.

### Sobre los contratos inteligentes {#on-smart-contracts}

Para presentar las dapps, necesitamos presentar los contratos inteligentes: el backend de una dapp, a falta de un término mejor. Para obtener una descripción detallada, diríjase a nuestra sección sobre [contratos inteligentes](/developers/docs/smart-contracts/).

Un contrato inteligente es un código que vive en la cadena de bloques de Ethereum y se ejecuta exactamente como fue programado. Una vez que los contratos inteligentes se despliegan en la red, no se pueden cambiar. Las dapps pueden ser descentralizadas porque están controladas por la lógica escrita en el contrato, no por un individuo o empresa. Esto también significa que debe diseñar sus contratos con mucho cuidado y probarlos a fondo.

## Beneficios del desarrollo de dapps {#benefits-of-dapp-development}

- **Cero tiempo de inactividad**: una vez que el contrato inteligente se despliega en la cadena de bloques, la red en su conjunto siempre podrá atender a los clientes que busquen interactuar con el contrato. Por lo tanto, los actores malintencionados no pueden lanzar ataques de denegación de servicio dirigidos a dapps individuales.
- **Privacidad**: no necesita proporcionar una identidad del mundo real para desplegar o interactuar con una dapp.
- **Resistencia a la censura**: ninguna entidad en la red puede impedir que los usuarios envíen transacciones, desplieguen dapps o lean datos de la cadena de bloques.
- **Integridad completa de los datos**: los datos almacenados en la cadena de bloques son inmutables e indiscutibles, gracias a las primitivas criptográficas. Los actores malintencionados no pueden falsificar transacciones u otros datos que ya se han hecho públicos.
- **Computación sin necesidad de confianza/comportamiento verificable**: los contratos inteligentes se pueden analizar y se garantiza que se ejecutarán de manera predecible, sin la necesidad de confiar en una autoridad central. Esto no es cierto en los modelos tradicionales; por ejemplo, cuando usamos sistemas bancarios en línea, debemos confiar en que las instituciones financieras no harán un mal uso de nuestros datos financieros, no alterarán los registros ni serán hackeadas.

## Inconvenientes del desarrollo de dapps {#drawbacks-of-dapp-development}

- **Mantenimiento**: las dapps pueden ser más difíciles de mantener porque el código y los datos publicados en la cadena de bloques son más difíciles de modificar. Es difícil para los desarrolladores realizar actualizaciones en sus dapps (o en los datos subyacentes almacenados por una dapp) una vez que se despliegan, incluso si se identifican errores o riesgos de seguridad en una versión antigua.
- **Sobrecarga de rendimiento**: existe una enorme sobrecarga de rendimiento y el escalado es realmente difícil. Para lograr el nivel de seguridad, integridad, transparencia y confiabilidad al que aspira Ethereum, cada nodo ejecuta y almacena cada transacción. Además de esto, el consenso de prueba de participación (PoS) también lleva tiempo.
- **Congestión de la red**: cuando una dapp utiliza demasiados recursos computacionales, toda la red se atasca. Actualmente, la red solo puede procesar entre 10 y 15 transacciones por segundo; si las transacciones se envían más rápido que esto, el grupo de transacciones no confirmadas puede aumentar rápidamente.
- **Experiencia de usuario**: puede ser más difícil diseñar experiencias fáciles de usar porque al usuario final promedio le puede resultar demasiado difícil configurar un conjunto de herramientas necesario para interactuar con la cadena de bloques de una manera verdaderamente segura.
- **Centralización**: las soluciones fáciles de usar y amigables para los desarrolladores construidas sobre la capa base de Ethereum podrían terminar pareciendo servicios centralizados de todos modos. Por ejemplo, dichos servicios pueden almacenar claves u otra información confidencial en el lado del servidor, servir un frontend utilizando un servidor centralizado o ejecutar una lógica de negocio importante en un servidor centralizado antes de escribir en la cadena de bloques. La centralización elimina muchas (si no todas) las ventajas de la cadena de bloques sobre el modelo tradicional.

## ¿Aprende mejor de forma visual? {#visual-learner}

<VideoWatch slug="what-is-a-dapp" />

## Herramientas para crear dapps {#dapp-tools}

**Scaffold-ETH _- Experimente rápidamente con Solidity utilizando un frontend que se adapta a su contrato inteligente._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Dapp de ejemplo](https://punkwallet.io/)

**Create Eth App _- Cree aplicaciones impulsadas por Ethereum con un solo comando._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- Herramienta FOSS para generar frontends de dapps a partir de una [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- Herramienta FOSS para que los desarrolladores de Ethereum prueben su nodo, y compongan y depuren llamadas RPC desde el navegador._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- SDK en todos los lenguajes, contratos inteligentes, herramientas e infraestructura para el desarrollo de la Web3._**

- [Página principal](https://thirdweb.com/)
- [Documentación](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _- Plataforma de desarrollo Web3 de nivel empresarial para desplegar contratos inteligentes, habilitar pagos con tarjeta de crédito y entre cadenas, y usar API para crear, distribuir, vender, almacenar y editar NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Documentación](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Lecturas adicionales {#further-reading}

- [Explorar dapps](/apps)
- [La arquitectura de una aplicación Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [Una guía de 2021 sobre aplicaciones descentralizadas](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [¿Qué son las aplicaciones descentralizadas?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [Dapps populares](https://www.alchemy.com/dapps) - _Alchemy_

_¿Conoce algún recurso de la comunidad que le haya ayudado? ¡Edite esta página y agréguelo!_

## Temas relacionados {#related-topics}

- [Introducción a la pila de Ethereum](/developers/docs/ethereum-stack/)
- [Entornos de desarrollo](/developers/docs/frameworks/)

## Tutoriales: Construir aplicaciones y frontends en Ethereum {#tutorials}

- [Recorrido por el contrato de Uniswap-v2](/developers/tutorials/uniswap-v2-annotated-code/) _– Un recorrido anotado por los contratos principales de Uniswap v2 que explica cómo funciona el creador de mercado automatizado (AMM)._
- [Construir una interfaz de usuario para su contrato](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) _– Cómo construir un frontend moderno con React + Wagmi que se conecte a su contrato inteligente._
- [Contrato inteligente "Hola Mundo" para principiantes – Fullstack](/developers/tutorials/hello-world-smart-contract-fullstack/) _– Tutorial de principio a fin: escriba, despliegue y construya un frontend para un contrato inteligente simple._
- [Componentes de servidor y agentes para aplicaciones Web3](/developers/tutorials/server-components/) _– Cómo escribir componentes de servidor en TypeScript que escuchen eventos de la cadena de bloques y respondan con transacciones._
- [IPFS para interfaces de usuario descentralizadas](/developers/tutorials/ipfs-decentralized-ui/) _– Cómo alojar el frontend de su dapp en IPFS para obtener resistencia a la censura._