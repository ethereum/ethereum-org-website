---
title: Introducción técnica a las DApps
description:
lang: es
---

Una aplicación descentralizada (dapp) es una aplicación construida sobre una red descentralizada que combina un [contrato inteligente](/developers/docs/smart-contracts/) y una interfaz de usuario frontend. Nota: En Ethereum, los contratos inteligentes son accesibles y transparentes (como las API abiertas), para que su DApp pueda incluir un contrato inteligente que haya escrito otra persona.

## Requisitos previos {#prerequisites}

Antes de aprender sobre las dapps, debe repasar los [conceptos básicos de la blockchain](/developers/docs/intro-to-ethereum/) y leer sobre la red Ethereum y cómo está descentralizada.

## Definición de una dapp {#definition-of-a-dapp}

Una DApp dispone de un código backend ejecutándose en una red descentralizada punto a punto. Compare esto con una aplicación, en la que el código backend se ejecuta en servidores centralizados.

Una DApp puede tener un código frontend y una interfaz de usuario escrita en cualquier lenguaje (al igual que una aplicación), que puede hacer llamadas a su backend. Además, su frontend puede alojarse en un almacenamiento descentralizado como [IPFS](https://ipfs.io/).

- **Descentralizadas**: las dapps operan en Ethereum, una plataforma pública, abierta y descentralizada en la que ninguna persona o grupo tiene el control.
- **Deterministas**: las dapps realizan la misma función independientemente del entorno en el que se ejecuten.
- **Turing complete**: las dapps pueden realizar cualquier acción si se les proporcionan los recursos necesarios.
- **Aisladas**: las dapps se ejecutan en un entorno virtual conocido como la máquina virtual de ethereum, de modo que si el contrato inteligente tiene un error, no obstaculizará el funcionamiento normal de la red de la blockchain.

### Sobre los contratos inteligentes {#on-smart-contracts}

Para presentar las DApps, necesitamos hablar de los contratos inteligentes, un backend de una DApp, a falta de un mejor término. Para una descripción detallada, diríjase a nuestra sección sobre [contratos inteligentes](/developers/docs/smart-contracts/).

Un contrato inteligente es un código que reside en la blockchain de Ethereum y se ejecuta exactamente como ha sido programado. Una vez que estos se implementan en la red, ya no pueden modificarse. Las DApps pueden ser descentralizadas debido a que están controladas por la lógica escrita dentro del contrato, no por una persona o compañía. Esto también significa que necesitas diseñar tus contratos cuidadosamente y probarlos minuciosamente.

## Ventajas del desarrollo de dapps {#benefits-of-dapp-development}

- **Cero tiempo de inactividad**: una vez que el contrato inteligente se despliega en la blockchain, la red en su conjunto siempre podrá atender a los clientes que busquen interactuar con el contrato. Por lo tanto, los actores maliciosos no pueden lanzar ataques de denegación de servicio dirigidos hacia las DApps individuales.
- **Privacidad**: no necesita proporcionar una identidad del mundo real para desplegar una dapp o interactuar con ella.
- **Resistencia a la censura**: ninguna entidad de la red puede impedir que los usuarios envíen transacciones, desplieguen dapps o lean datos de la blockchain.
- **Integridad total de los datos**: los datos almacenados en la cadena de bloques son inmutables e indiscutibles gracias a las primitivas criptográficas. Los actores maliciosos no pueden falsificar transacciones u otros datos que ya se hayan hecho públicos.
- **Computación sin confianza/comportamiento verificable**: los contratos inteligentes pueden analizarse y se garantiza que se ejecutarán de forma predecible, sin necesidad de confiar en una autoridad central. Esto no es así en los modelos tradicionales; por ejemplo, cuando usamos sistemas de banca en línea, debemos confiar en que las instituciones financieras no harán un uso indebido de nuestros datos financieros, no manipularán los registros ni serán hackeadas.

## Inconvenientes del desarrollo de dapps {#drawbacks-of-dapp-development}

- **Mantenimiento**: las dapps pueden ser más difíciles de mantener porque el código y los datos publicados en la cadena de bloques son más difíciles de modificar. A los desarrolladores les resulta complicado realizar actualizaciones de sus DApps (o de los datos subyacentes almacenados por una DApp) una vez que se implementan, incluso si se identifican errores o riesgos de seguridad en una versión anterior.
- **Sobrecarga de rendimiento**: hay una enorme sobrecarga de rendimiento y el escalado es realmente difícil. Para conseguir el nivel de seguridad, de integridad, de transparencia y de fiabilidad al que Ethereum aspira, cada nodo ejecuta y almacena cada transacción. Además de esto, el consenso de prueba de participación también lleva tiempo.
- **Congestión de la red**: cuando una dapp utiliza demasiados recursos computacionales, toda la red se congestiona. Actualmente, la red solo puede procesar entre 10 y 15 transacciones por segundo; si las transacciones se envían más rápido que eso, el grupo de transacciones sin confirmar puede crecer rápidamente.
- **Experiencia de usuario**: puede ser más difícil diseñar experiencias fáciles de usar porque al usuario final medio podría resultarle demasiado difícil configurar la pila de herramientas necesaria para interactuar con la cadena de bloques de una forma realmente segura.
- **Centralización**: las soluciones fáciles de usar para el usuario y el desarrollador, creadas sobre la capa base de Ethereum, podrían terminar pareciendo servicios centralizados de todos modos. Por ejemplo, dichos servicios permiten almacenar claves u otra información confidencial en el servidor, estar a disposición de la interfaz de usuario mediante el uso de un servidor centralizado o ejecutar una lógica comercial importante en un servidor centralizado antes de escribirlo en la cadena de bloques. La centralización elimina muchas (si no todas) las ventajas de la cadena de bloques frente al modelo tradicional.

## ¿Retiene usted mejor las cosas cuando las ve? {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## Herramientas para crear dapps {#dapp-tools}

**Scaffold-ETH**: _experimente rápidamente con Solidity utilizando un frontend que se adapta a su contrato inteligente._

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Ejemplo de dapp](https://punkwallet.io/)

**Create Eth App**: _cree aplicaciones basadas en Ethereum con un solo comando._

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp**: _herramienta FOSS para generar frontends de dapps a partir de una [ABI](/glossary/#abi)._

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow**: _herramienta FOSS para que los desarrolladores de Ethereum prueben su nodo, y compongan y depuren llamadas RPC desde el navegador._

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb**: _SDK en todos los idiomas, contratos inteligentes, herramientas e infraestructura para el desarrollo de web3._

- [Página de inicio](https://thirdweb.com/)
- [Documentación](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint**: _plataforma de desarrollo web3 de nivel empresarial para desplegar contratos inteligentes, permitir pagos con tarjeta de crédito y entre cadenas, y utilizar las API para crear, distribuir, vender, almacenar y editar NFT._

- [crossmint.com](https://www.crossmint.com)
- [Documentación](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Lecturas adicionales {#further-reading}

- [Explorar dapps](/apps)
- [La arquitectura de una aplicación Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [Una guía de 2021 sobre aplicaciones descentralizadas](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [¿Qué son las aplicaciones descentralizadas?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [Dapps populares](https://www.alchemy.com/dapps) - _Alchemy_

_¿Conoce algún recurso de la comunidad que le haya sido de ayuda? ¡Edite esta página y agréguela!_

## Temas relacionados {#related-topics}

- [Introducción a la pila de Ethereum](/developers/docs/ethereum-stack/)
- [Marcos de desarrollo](/developers/docs/frameworks/)
