---
title: Ethereum para desarrolladores
description: Guías, recursos y herramientas para desarrolladores que crean con Ethereum.
lang: es
sidebar: true
sidebarDepth: 2
---

# Recursos para desarrolladores {#developer-resources}

<div class="featured">Guías, recursos y herramientas para desarrolladores en Ethereum.</div>

## Introducción {#getting-started}

**Si eres nuevo en lo relacionado con el desarrollo con Ethereum, estás en el lugar indicado.** Estas guías escritas por la comunidad de Ethereum te presentarán lo básico del stack de Ethereum y los conceptos centrales que pueden ser distintos de cualquier otro desarrollo de apps que conozcas.

¿Quieres empezar a programar inmediatamente? [Empieza a crear aquí](/build/).

¿Necesitas una introducción más básica para empezar? Échale un vistazo a nuestros [recursos de aprendizaje](/learn/).

**Recursos útiles**

- [Cómo aprovechar Ethereum al máximo](https://medium.com/@mattcondon/getting-up-to-speed-on-ethereum-63ed28821bbe) _7 de agosto de 2017 - Matt Condon_
- [Ethereum en profundidad, parte 1](https://blog.zeppelin.solutions/ethereum-in-depth-part-1-968981e6f833) _11 de mayo de 2018 - Facu Spagnuolo_
- [Ethereum en profundidad, parte 2 ](https://blog.zeppelin.solutions/ethereum-in-depth-part-2-6339cf6bddb9) _24 de julio de 2018 - Facu Spagnuolo_
- [Guía de desarrollo de Ethereum, partes 1 a 5](https://hackernoon.com/ethereum-development-walkthrough-part-1-smart-contracts-b3979e6e573e) _14 de enero de 2018 - dev_zl_
- [Ethereum 101, partes 1 a 7](https://kauri.io/collection/5bb65f0f4f34080001731dc2/ethereum-101) _13 de febrero de 2019 - Wil Barnes_
- [Tutorial completo de la votación de "Hola, mundo" en la dapp de Ethereum](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2) _18 de enero de 2017 - Mahesh Murthy_
- [Mastering Ethereum: un completo libro de texto disponible online de manera gratuita](https://github.com/ethereumbook/ethereumbook) _1 de diciembre de 2018 - Andreas Antonopoulos & Gavin Wood_
- [Ethereum Developer Portal - Everything you need to get started building on Ethereum](https://ethereum.consensys.net/ethereum-dev-portal) _Updated often - ConsenSys_
- [Deconstrucción de un contrato de Solidity](https://blog.openzeppelin.com/deconstructing-a-solidity-contract-part-i-introduction-832efd2d7737/) _13 de agosto de 2018 - Alejandro Santander & Leo Arias_
- [Serie de tutoriales completos de dapp ](https://kauri.io/collection/5b8e401ee727370001c942e3) _Actualizado con frecuencia - Joshua Cassidy_

## Lenguajes de los contratos inteligentes {#smart-contract-languages}

Cualquier programa que se ejecuta en la máquina virtual de Ethereum (EVM, por sus siglas en inglés) se conoce comúnmente como "contrato inteligente". Los lenguajes más populares para escribir contratos inteligentes en Ethereum son **Solidity** y **Vyper**, aunque existen [otros en proceso de desarrollo](https://github.com/ConsenSys/ethereum-developer-tools-list#smart-contract-languages).

**Solidity, ** **_el lenguaje más popular en Ethereum, está inspirado en C++, Python y Javascript._**

- [Documentación](https://solidity.readthedocs.io)
- [Github](https://github.com/ethereum/solidity/)
- [Sala de chat de Gitter sobre Solidity](https://gitter.im/ethereum/solidity/)

**Vyper ** **_es el lenguaje centrado en la seguridad para Ethereum y basado en Python._**

- [Documentación](https://vyper.readthedocs.io)
- [Github](https://github.com/ethereum/vyper)
- [Sala de chat de Gitter sobre Vyper](https://gitter.im/ethereum/vyper)

**¿Buscas otras opciones?**

- [Lista de herramientas de desarrollo para Ethereum: lenguajes de contratos inteligentes](https://github.com/ConsenSys/ethereum-developer-tools-list#smart-contract-languages)

## Recursos específicos del lenguaje {#language-specific-resources}

Estamos creando un conjunto de páginas de destino específicas de cada lenguaje, para que el desarrollador aprenda a utilizar Ethereum con el lenguaje de programación que prefiera.

- [Ethereum para desarrolladores Java](/java/)
- [Ethereum para desarrolladores de Python](/python/)
- [Ethereum para desarrolladores de JavaScript](/javascript/)
- [Ethereum para desarrolladores de Go](/golang/)
- [Ethereum para desarrolladores de Rust](/rust/)
- [Ethereum para desarrolladores de .NET](/dot-net/)
- ¡Más próximamente! ¿Tu lenguaje no está entre estas opciones? [Indícalo mediante una incidencia](https://github.com/ethereum/ethereum-org-website/issues/new/choose).

## Herramientas para desarrolladores {#developer-tools}

Ethereum dispone de un gran y creciente número de herramientas para ayudar a los desarrolladores a crear, probar e implementar sus aplicaciones. A continuación encontrarás las herramientas más populares para comenzar. Si quieres información más detallada, consulta esta [lista exhaustiva](https://github.com/ConsenSys/ethereum-developer-tools-list).

### Entornos de trabajo {#frameworks}

**Truffle:** **_un entorno de desarrollo y de pruebas, un pipeline de creación y otras herramientas._**

- [trufflesuite.com](https://www.trufflesuite.com/)
- [GitHub](https://github.com/trufflesuite/truffle)

**Embark: ** **_un entorno de desarrollo que incluye un espacio para pruebas y otras herramientas integradas con Ethereum, IPFS y Whisper._**

- [Documentación](https://embark.status.im/docs/)
- [GitHub](https://github.com/embark-framework/embark)

**Waffle: ** **_un entorno de trabajo para desarrollar y realizar pruebas de contratos inteligentes avanzados (basado en ethers.js)._**

- [getwaffle.io](https://getwaffle.io/)
- [GitHub](https://github.com/EthWorks/Waffle)

**Etherlime: ** **_un entorno de trabajo basado en Ethers.js para el desarrollo de dapps (Solidity y Vyper), así como para su implementación, depuración, pruebas, etc._**

- [Documentación](https://etherlime.readthedocs.io/en/latest/)
- [GitHub](https://github.com/LimeChain/etherlime)

### Otras herramientas {#other-tools}

**Hardhat:\*\*\***un ejecutor de tareas para desarrolladores de contratos inteligentes de Ethereum.\*\*\*

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**OpenZeppelin SDK: \*\*\***el kit definitivo de herramientas para contratos inteligentes; una serie de herramientas para ayudarte a desarrollar, compilar, actualizar, implementar e interactuar con contratos inteligentes.\*\*\*

- [SDK de OpenZeppelin](https://openzeppelin.com/sdk/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [Foro de la comunidad](https://forum.openzeppelin.com/c/sdk)

**The Graph:** **_un protocolo para indexar los datos de Ethereum e IPFS, así como para consultarlos mediante GraphQL._**

- [The Graph](https://thegraph.com/)
- [Graph Explorer](https://thegraph.com/explorer/)
- [Documentación](https://thegraph.com/docs/)
- [GitHub](https://github.com/graphprotocol/)
- [Discord](https://thegraph.com/discord)

**Tenderly: \*\*\***una plataforma para supervisar los contratos inteligentes de manera sencilla, con seguimiento de errores, alertas, métricas de rendimiento y análisis detallados de contratos.\*\*\*

- [tenderly.dev](https://tenderly.dev/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Python Tooling: \*\*\***varias bibliotecas para la interacción de Ethereum a través de Python.\*\*\*

- [py.ethereum.org](http://python.ethereum.org/)
- [Github de web3.py](https://github.com/ethereum/web3.py)
- [Chat de web3.py](https://gitter.im/ethereum/web3.py)

**Brownie: \*\*\***un entorno de desarrollo basado en Python y un entorno de trabajo de pruebas.\*\*\*

- [Documentación](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/iamdefinitelyahuman/brownie)

**web3j:** **_una biblioteca de integración de Java/Android/Kotlin/Scala para Ethereum._**

- [web3j.io](https://web3j.io)
- [GitHub](https://github.com/web3j/web3j)
- [Documentación](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

**One Click Dapp: ** **_genera un front-end directamente desde ABI para disfrutar de fases de desarrollo y prueba rápidas._**

- [OneClickDapp.com](https://oneclickdapp.com)
- [Complemento de Truffle](https://npmjs.org/package/oneclick)
- [Complemento de Remix](https://github.com/pi0neerpat/remix-plugin-one-click-dapp)
- [GitHub](https://github.com/pi0neerpat/one-click-dapp)

**¿Buscas otras opciones?**

- [Lista de herramientas de desarrollo para Ethereum #entornos_de_trabajo](https://github.com/ConsenSys/ethereum-developer-tools-list#frameworks)

## Entornos de desarrollo integrados (IDE) {#integrated-development-environments-ides}

**Ethereum Studio:** **_entorno de desarrollo integrado (IDE, por sus siglas en inglés) basado en web, ideal para nuevos desarrolladores que buscan experimentar con contratos inteligentes. Ethereum Studio incluye varias plantillas, integración de MetaMask, registrador de transacciones y una máquina virtual (EVM) incorporada en el navegador para ayudarte a comenzar a crear con Ethereum lo más rápido posible._**

- [studio.ethereum.org](/en/studio/)
- [superblocks.com/ethereum-studio](https://superblocks.com/ethereum-studio)
- [GitHub](https://github.com/SuperblocksHQ/ethereum-studio)

**Visual Studio Code:** **_IDE multiplataforma profesional con compatibilidad oficial con Ethereum._**

- [Código de Visual Studio](https://code.visualstudio.com/)
- [Kit de desarrollo de Azure Blockchain para Ethereum](https://marketplace.visualstudio.com/items?itemName=AzBlockchain.azure-blockchain)
- [Complemento de Azure Blockchain Workbench](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/microsoft-azure-blockchain.azure-blockchain-workbench?tab=Overview)
- [Códigos de muestra](https://github.com/Azure-Samples/blockchain/blob/master/blockchain-workbench/application-and-smart-contract-samples/readme.md)
- [GitHub](https://github.com/microsoft/vscode)

**Remix:** **_IDE basado en web con análisis estático integrado y una máquina virtual para pruebas de blockchain._**

- [remix.ethereum.org](https://remix.ethereum.org/)

**EthFiddle:** **_IDE basado en web, que permite escribir, compilar y depurar contratos inteligentes._**

- [ethfiddle.com](https://ethfiddle.com/)
- [Gitter](https://gitter.im/loomnetwork/ethfiddle)

**¿Buscas otras opciones?**

- [Lista de herramientas de desarrollo para Ethereum #IDE](https://github.com/ConsenSys/ethereum-developer-tools-list#ides)

## API de front-end de JavaScript {#frontend-javascript-apis}

**Web3.js:** **_API de Javascript de Ethereum._**

- [Documentación](https://web3js.readthedocs.io/en/1.0/)
- [GitHub](https://github.com/ethereum/web3.js/)

**Ethers.js:** **_implementación completa de la cartera de Ethereum y utilidades en JavaScript y TypeScript._**

- [Documentación](https://docs.ethers.io/ethers.js/html/)
- [GitHub](https://github.com/ethers-io/ethers.js/)

**light.js:** **_una biblioteca de JS de alto nivel, optimizada para clientes ligeros._**

- [Documentación](https://paritytech.github.io/js-libs/light.js/)
- [GitHub](https://github.com/paritytech/js-libs/tree/master/packages/light.js)

**Web3-wrapper:** **_alternativa de Typescript a Web3.js._**

- [Documentación](https://0x.org/docs/web3-wrapper#introduction)
- [GitHub](https://github.com/0xProject/0x-monorepo/tree/development/packages/web3-wrapper)

**¿Buscas otras opciones?**

- [Lista de herramientas de desarrollo para Ethereum #API_de_front-end_de_Ethereum](https://github.com/ConsenSys/ethereum-developer-tools-list#frontend-ethereum-apis)

## API de back-end {#backend-apis}

**Infura: ** **_la API de Ethereum como servicio._**

- [infura.io](https://infura.io)
- [Documentación](https://infura.io/docs)
- [GitHub](https://github.com/INFURA)

**La puerta de enlace de Cloudflare Ethereum.**

- [cloudflare-eth.com](https://cloudflare-eth.com)

**Nodesmith:** **_acceso de la API de JSON-RPC a la red principal de Ethereum y a redes de prueba._**

- [nodesmith.io](https://nodesmith.io/network/ethereum/)
- [Documentación](https://nodesmith.io/docs/#/ethereum/apiRef)

**Chainstack:** **_nodos Ethereum compartidos y exclusivos como servicio._**

- [chainstack.com](https://chainstack.com)
- [Documentación](https://docs.chainstack.com)

## Almacenamiento {#storage}

**IPFS:** **_el sistema de archivos InterPlanetary es un sistema de almacenamiento descentralizado y de referencia de archivos para Ethereum._**

- [ipfs.io](https://ipfs.io/)
- [Documentación](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Swarm:** **_una plataforma de almacenamiento distribuida y un servicio de distribución de contenido para Web3 Stack de Ethereum._**

- [Swarm](https://ethersphere.github.io/swarm-home/)
- [GitHub](https://github.com/ethersphere/swarm)

**OrbitDB: ** **_una base de datos de punto a punto acerca de IPFS._**

- [Documentación](https://github.com/orbitdb/field-manual)
- [GitHub](https://github.com/orbitdb/orbit-db)

## Herramientas de seguridad {#security-tools}

### Seguridad de contratos inteligentes {#smart-contract-security}

**Slither: \*\*\***entorno de trabajo de análisis estático de Solidity escrito en Python 3.\*\*\*

- [GitHub](https://github.com/crytic/slither)

**MythX: \*\*\***API de análisis de seguridad para contratos inteligentes de Ethereum.\*\*\*

- [mitox.io](https://mythx.io/)
- [Documentación](https://docs.mythx.io/en/latest/)

**Mythril:** **_herramienta de análisis de seguridad para el bytecode de la EVM._**

- [mythril](https://github.com/ConsenSys/mythril)
- [Documentación](https://mythril-classic.readthedocs.io/en/master/about.html)

**SmartContract.Codes: ** **_motor de búsqueda para códigos fuente verificados de Solidity._**

- [smartcontract.codes (alpha)](https://smartcontract.codes/)
- [Documentación](https://github.com/ethereum-play/smartcontract.codes/blob/master/README.md)

**Manticore:** **_ una interfaz de línea de comandos que utiliza una herramienta de ejecución simbólica en contratos inteligentes y binarios._**

- [GitHub](https://github.com/trailofbits/manticore)
- [Documentación](https://github.com/trailofbits/manticore/wiki)

**Securify: ** **_escáner de seguridad para contratos inteligentes de Ethereum._**

- [securify.chainsecurity.com](https://securify.chainsecurity.com/)
- [Discord](https://discordapp.com/invite/nN77ckb)

**ERC20 Verifier: ** **_una herramienta de verificación utilizada para comprobar si un contrato cumple con el estándar ERC20._**

- [erc20-verifier.openzeppelin.com](https://erc20-verifier.openzeppelin.com)
- [Foro](https://forum.openzeppelin.com/t/online-erc20-contract-verifier/1575)

### Verificación formal {#formal-verification}

**Información sobre la verificación formal**

- [Cómo funciona la verificación formal en los contratos inteligentes](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/), _20 de julio 2018, Brian Marick_
- [Cómo puede la verificación formal garantizar la perfección de los contratos inteligentes](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1), _29 de enero 2018, Bernard Mueller_

**¿Buscas otras opciones?**

- [Lista de herramientas de desarrollo para Ethereum #Herramientas_de_seguridad](https://github.com/ConsenSys/ethereum-developer-tools-list#security-tools)

## Herramientas de testeo {#testing-tools}

**Solidity-Coverage: \*\*\***herramienta alternativa de cobertura de código de Solidity.\*\*\*

- [GitHub](https://github.com/sc-forks/solidity-coverage)

**hevm: \*\*\***implementación del EVM creada específicamente para pruebas unitarias y depuración de contratos inteligentes.\*\*\*

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)
- [Chat de DappHub](https://dapphub.chat/)

**Whiteblock Genesis: ** **_una plataforma de desarrollo de extremo a extremo y pruebas para blockchain._**

- [Whiteblock.io](https://whiteblock.io)
- [Documentación](https://docs.whiteblock.io)
- [GitHub](https://github.com/whiteblock/genesis)

**¿Buscas otras opciones?**

- [Lista de herramientas de desarrollo para Ethereum #Herramientas_de_pruebas](https://github.com/ConsenSys/ethereum-developer-tools-list#testing-tools)

## Exploradores de bloques {#block-explorers}

Los exploradores de bloques son servicios que permiten navegar por el blockchain de Ethereum (y sus redes de prueba) mediante la búsqueda de información sobre transacciones específicas, bloques, contratos y otras actividades en la cadena.

- [Etherscan](https://etherscan.io/)
- [Blockscout](https://blockscout.com/)
- [Etherchain](https://www.etherchain.org/)

## Redes de prueba y faucets {#testnets-and-faucets}

La comunidad de Ethereum mantiene varias redes de prueba. Los desarrolladores las utilizan para probar sus aplicaciones en condiciones distintas, antes de implementarlas en la red principal de Ethereum.

**Ropsten: ** **_prueba de blockchain de trabajo, se puede extraer el ether de prueba._**

- [Faucet del ether de prueba](https://faucet.ropsten.be/)

**Rinkeby:** **_prueba de blockchain de autoridad, que se mantiene mediante el equipo de desarrollo de Geth._**

- [Faucet del ether de prueba](https://faucet.rinkeby.io/)
- [Faucet universal](https://faucets.blockxlabs.com)

**Goerli:\*\*\***prueba de blockchain de autoridad multicliente, que se crea y se mantiene mediante la comunidad de Goerli\*\*\*

- [Faucet del ether de prueba](https://faucet.goerli.mudit.blog/)
- [goerli.net](https://goerli.net/)
- [Faucet universal](https://faucets.blockxlabs.com)

## Los clientes y la ejecución de tu propio nodo {#clients--running-your-own-node}

La red de Ethereum está compuesta por muchos nodos, que ejecutan un cliente de software compatible. La mayoría de estos nodos ejecutan [Geth](https://geth.ethereum.org/) o [Parity](https://www.parity.io/ethereum/), que, a su vez, puede configurarse de diferente manera según tus necesidades.

### Clientes {#clients}

**Geth: ** **_cliente de Ethereum escrito en Go._**

- [GitHub](https://github.com/ethereum/go-ethereum)
- [Chat de Discord](https://discordapp.com/invite/nthXNEv)

**Parity: ** **_cliente de Ethereum escrito en Rust._**

- [parity.io](https://www.parity.io/)
- [GitHub](https://github.com/paritytech/parity-ethereum)

**Pantheon:** **_cliente de Ethereum escrito en Java._**

- [pegasys.tech](http://pegasys.tech)
- [GitHub](https://github.com/PegaSysEng/pantheon/)

**Nethermind:** **_cliente de Ethereum escrito en C# .NET Core._**

- [Nethermind.io](http://nethermind.io/)
- [GitHub](https://github.com/NethermindEth/nethermind)
- [Gitter](https://gitter.im/nethermindeth/nethermind)

### Ejecución de tu propio nodo {#running-your-own-node}

**Ethnode: \*\*\***ejecución de un nodo de Ethereum (Geth o Parity) en un entorno local.\*\*\*

- [GitHub](https://github.com/vrde/ethnode)

**Recursos sobre nodos de Ethereum**

- [Hoja de características clave de la configuración de nodos](https://dev.to/5chdn/ethereum-node-configuration-modes-cheat-sheet-25l8), _5 de enero de 2019, Afri Schoeden_

**¿Buscas otras opciones?**

- [Lista de herramientas de desarrollo para Ethereum #clientes_de_Ethereum](https://github.com/ConsenSys/ethereum-developer-tools-list#ethereum-clients)

## Prácticas recomendadas, patrones y antipatrones {#best-practices-patterns-and-anti-patterns}

### Contratos inteligentes {#smart-contracts}

**DappSys: \*\*\***bloques de creación simples, flexibles y seguros para contratos inteligentes. \*\*\*

- [dapp.tools/dappsys](https://dapp.tools/dappsys/)
- [GitHub](https://github.com/dapphub/dappsys)

**Contratos de OpenZeppelin: \*\*\***biblioteca para el desarrollo seguro de contratos inteligentes.\*\*\*

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Foro de la comunidad](https://forum.openzeppelin.com/c/contracts)

**aragonOS: \*\*\***patrones de actualización y control de permisos. \*\*\*

- [hack.aragon.org](https://hack.aragon.org/docs/aragonos-intro.html#aragonos-provides-the-following-functionality)
- [Documentación](https://wiki.aragon.org/)

**Registro de puntos débiles de los contratos inteligentes**

- [Registro de SWC](https://smartcontractsecurity.github.io/SWC-registry/)
- [GitHub](https://github.com/SmartContractSecurity/SWC-registry)

### Seguridad {#security}

**Guía de prácticas recomendadas de seguridad para contratos inteligentes**

- [consensys.github.io/smart-contract-best-practices/](https://consensys.github.io/smart-contract-best-practices/)
- [GitHub](https://github.com/ConsenSys/smart-contract-best-practices/)
- [Colección acumulativa de recomendaciones de seguridad y prácticas recomendadas](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)

**Estándar de verificación de seguridad de contrato inteligente (SCSVS)**

- [securing.github.io/SCSVS/](https://securing.github.io/SCSVS/)

**¿Buscas otras opciones?**

- [Lista de herramientas de desarrollo para Ethereum #patrones_y_prácticas_recomendadas](https://github.com/ConsenSys/ethereum-developer-tools-list#patterns--best-practices)

## Soporte y formación para desarrolladores {#developer-support--training}

### Aprendizaje general {#general-learning}

**Stackexchange de Ethereum**

- [ethereum.stackexchange.com](https://ethereum.stackexchange.com/)

**ConsenSys Academy: \*\*\***un curso de desarrollador de Ethereum de cobertura completa, que puedes completar cuando quieras y que está disponible durante todo el año.\*\*\*

- [consensys.academy](https://consensys.net/academy/ondemand/)

**Sala de chat de Gitter sobre Solidity**

- [gitter.im/ethereum/solidity](https://gitter.im/ethereum/solidity/)

**Todas las salas de chat de Gitter sobre Ethereum**

- [gitter.im/ethereum/home](https://gitter.im/ethereum/home)

**Chainshot: ** **_tutoriales de codificación dapp basados en web._**

- [chainshot.com](https://www.chainshot.com/)

**Blockgeeks: ** **_cursos en línea sobre tecnología de blockchain._**

- [courses.blockgeeks.com](https://courses.blockgeeks.com/)

**DappUniversity: \*\*\***aprende a crear aplicaciones decentralizadas en el blockchain de Ethereum.\*\*\*

- [DappUniversity.com](http://www.dappuniversity.com/)

**B9lab Academy: ** **_sitio del curso de desarrollador profesional de dapp de Ethereum más antiguo, y aprendizaje adicional para cuestiones de auditoría y calidad. Incl. revisión de código y mentoría._**

- [academy.b9lab.com](https://academy.b9lab.com)

### Aprendizaje basado en juegos {#game-based-learning}

**Cryptozombies: ** **_aprende a programar juegos en Ethereum._**

- [Cryptozombies.io](https://cryptozombies.io/)

**Ethernaut: \*\*\***juego de guerra escrito en Solidity, donde cada nivel es un contrato que hay que hackear.\*\*\*

- [ethernaut.openzeppelin.com](https://ethernaut.openzeppelin.com/)

**Capture the Ether: ** **_el juego de seguridad del contrato inteligente de Ethereum._**

- [capturetheether.com](https://capturetheether.com/)

## Diseño de UI/UX {#uiux-design}

- [El desafío de la UX en Ethereum](https://medium.com/ecf-review/challenge-of-ux-in-ethereum-122e1a33688d), _25 de junio de 2018, Anna Rose_
- [Diseño para blockchains: cuáles son las diferencias y qué es una stake](https://media.consensys.net/designing-for-blockchain-whats-different-and-what-s-at-stake-b867eeade1c9), _22 de marzo de 2018, Sarah Baker Mills_

**UI Rimble:** **_ componentes adaptables y estándares de diseño para aplicaciones descentralizadas_**

- [rimble.consensys.design](https://rimble.consensys.design)
- [GitHub](https://github.com/ConsenSys/rimble-ui)

## Estándares {#standards}

La comunidad de Ethereum ha adoptado muchos estándares que son útiles para los desarrolladores. Normalmente se presentan como [Propuestas de mejora de Ethereum](http://eips.ethereum.org/) (EIP por sus siglas en inglés), que discuten los miembros de la comunidad a través de un proceso estándar[](http://eips.ethereum.org/EIPS/eip-1).

- [Lista de EIP](http://eips.ethereum.org/)
- [Repositorio de github de EIP](https://github.com/ethereum/EIPs)
- [Tablón de discusión de EIP](https://ethereum-magicians.org/c/eips)
- [Resumen de gobernanza de Ethereum](https://blog.bmannconsulting.com/ethereum-governance/), _31 de marzo de 2019, Mann Boris_
- [Lista de reproducción de todas las reuniones de Ethereum Core Dev](https://www.youtube.com/playlist?list=PLaM7G4Llrb7zfMXCZVEXEABT8OSnd4-7w) _(lista de reproducción de YouTube)_

Algunos EIP hacen referencia a estándares de nivel aplicación (por ejemplo, un estándar sobre el formato de un contrato inteligente), los cuales se presentan como [Solicitudes de comentarios de Ethereum (ERC por sus siglas en inglés)](https://eips.ethereum.org/erc). Muchos ERC son estándares críticos utilizados ampliamente en todo el ecosistema de Ethereum.

- [Lista de ERC](http://eips.ethereum.org/erc)
- [ERC20: una interfaz estándar para tokens](https://eips.ethereum.org/EIPS/eip-20)
- [ERC721: una interfaz estándar para tokens no fungibles](https://eips.ethereum.org/EIPS/eip-721)
