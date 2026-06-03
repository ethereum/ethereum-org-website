---
title: "Por qué construir en Ethereum"
description: "La descentralización, la resistencia a la censura, el despliegue sin permisos y la composabilidad no son ventajas independientes. Se refuerzan mutuamente. Una guía práctica de por qué los constructores deberían elegir Ethereum."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "descentralización"
  - "resistencia a la censura"
  - "composabilidad"
published: 2026-05-12
image: /images/developers/blog/latest-post-header-1.png
breadcrumb: Por qué construir en Ethereum
lang: es
---

Los constructores eligen la infraestructura según las promesas que su aplicación debe cumplir.

La mayoría de las promesas de software dependen de un operador. Un proveedor de la nube mantiene el servidor en funcionamiento. Una plataforma mantiene la cuenta abierta. Un procesador de pagos mantiene habilitado al comerciante. Un proveedor de API mantiene válida la clave. Eso está bien para muchos productos. No es suficiente cuando el valor del producto depende del acceso neutral, el estado compartido y los compromisos que los usuarios y otros desarrolladores pueden verificar por sí mismos.

Ethereum está construido para el segundo caso, donde el acceso neutral y los compromisos verificables son el producto. Nadie es su dueño. La cadena se ejecuta en muchos países, con muchos operadores y múltiples implementaciones de clientes independientes, y ninguna empresa, validador o fundación por sí sola puede reescribir las reglas en secreto. Para un constructor, eso significa que no es solo un lugar para alojar código. Es un lugar para hacer compromisos públicos. Puedes lanzar productos sin pedirle permiso a nadie, los usuarios pueden seguir accediendo a lo que despliegas, otros desarrolladores pueden construir sobre ello sin tu permiso, y tu aplicación puede seguir funcionando incluso cuando cualquier parte, incluyéndote a ti, deje de cooperar.

## Descentralización {#decentralization}

La descentralización es la base sobre la que se asientan esas propiedades. Ethereum la ofrece a través de una red de computadoras, llamadas nodos, que almacenan cada una una copia de la cadena y verifican cada transacción. Cada nodo ejecuta un software de cliente. Un subconjunto de nodos, llamados validadores, se turnan para proponer y confirmar nuevos bloques a través de un proceso llamado consenso. Para participar, los validadores depositan ETH como colateral, llamado participación, que pierden si rompen las reglas. Se rastrearon alrededor de 13.700 a 14.000 nodos en el rastreador de nodos de Etherscan en abril de 2026, distribuidos en Estados Unidos, Alemania, China, el Reino Unido, Rusia, Japón y docenas de otros países.

La descentralización también es económica. Alrededor de 32 a 36 millones de ETH, cerca del 27 al 29 % del suministro, se depositan en garantía como colateral que el protocolo recorta cuando se demuestra que los validadores se comportan mal. Un atacante necesitaría adquirir y arriesgar una fracción significativa de esa participación para corromper la cadena. A los precios de ETH de abril de 2026, eso significa que decenas de miles de millones de dólares estarían en riesgo.

La otra dimensión es el software en sí. Cada nodo de Ethereum ejecuta dos piezas de software en paralelo. Un cliente de ejecución ejecuta la EVM y rastrea el estado del contrato. Un cliente de consenso maneja la prueba de participación (PoS). Rastrea qué validadores proponen bloques, qué bloques acepta la red y cuándo un bloque alcanza la finalidad. Una descentralización saludable necesita múltiples implementaciones independientes de cada uno, para que un error en un cliente no se convierta automáticamente en un error en Ethereum.

La capa de ejecución tiene cinco clientes principales en producción. Go Ethereum (Geth) se ejecuta en aproximadamente el 50 %, Nethermind alrededor del 25 %, Besu alrededor del 9 %, Reth alrededor del 8 % y Erigon alrededor del 7 %. La capa de consenso se ejecuta en Lighthouse, Prysm, Teku, Nimbus, Lodestar y otros clientes. Ethereum no es una cadena de un solo cliente en ninguna de las capas.

La participación cercana al 50 % de Geth es la verdadera fragilidad. Un error en un cliente minoritario es doloroso para sus operadores, pero el resto de la red puede continuar. Un error grave en un cliente mayoritario es más peligroso. Es por eso que la diversidad de clientes es una prioridad operativa activa.

Esa prioridad ha sido puesta a prueba. Ethereum nunca ha tenido una detención completa de la cadena desde su génesis el 30 de julio de 2015. Lo más cerca que ha estado de un incidente grave fue del 11 al 12 de mayo de 2023, cuando la capa de consenso, llamada cadena de balizas, no logró alcanzar la finalidad durante unos 25 minutos y luego durante unos 64 minutos. La causa fue un error en el cliente Prysm. La finalidad requiere que más de dos tercios de los validadores den fe, y la participación de Prysm en ese momento era lo suficientemente alta como para que su problema arrastrara brevemente a la red por debajo de ese umbral.

Un estancamiento en la finalidad no es lo mismo que una detención de la cadena. Se siguieron produciendo nuevos bloques, se siguieron incluyendo transacciones y la mayoría de los usuarios y aplicaciones siguieron funcionando. Lo que se estancó fue la garantía de liquidación más fuerte de Ethereum. Bajo suposiciones normales de consenso, un bloque con una antigüedad superior a aproximadamente 13 minutos no puede revertirse. Los puentes, los intercambios y otros sistemas que esperan la finalidad antes de acreditar los depósitos habrían pausado esos flujos. La cadena en sí se recuperó automáticamente una vez que suficientes validadores se pusieron al día, sin intervención manual.

Para los constructores, esa historia importa. Si otras personas van a mantener activos en tus contratos, enrutar órdenes a través de tu mercado o construir sobre tu primitiva, necesitan que la base subyacente siga funcionando a pesar de los errores, las fallas de los clientes y la presión institucional.

## Resistencia a la censura {#censorship-resistance}

La descentralización es la estructura. La resistencia a la censura es una de las cosas prácticas que se obtienen con ella. Los usuarios no deberían necesitar permiso de una empresa, gobierno, retransmisor, validador, proveedor de RPC u operador de aplicaciones para enviar una transacción válida a tus contratos.

Eso no significa que cada transacción aterrice en el siguiente bloque. Significa que ninguna parte por sí sola puede mantener una transacción válida fuera de la cadena para siempre. Cada bloque es propuesto por un validador diferente, que trabaja con partes externas, llamadas constructores y retransmisores, para ensamblarlo. Si uno de ellos filtra tu transacción, el siguiente slot tiene un conjunto diferente, y eventualmente uno de ellos la incluye. La censura tiene que persistir en todo ese elenco rotativo, lo cual es mucho más difícil que un solo operador diciendo que no. El período posterior a Tornado Cash mostró cómo se ve eso bajo presión.

Tornado Cash es un contrato mezclador de privacidad que rompe el vínculo en cadena entre el depósito y el retiro. Después de que la OFAC lo sancionara en agosto de 2022, varios retransmisores importantes de MEV-Boost se negaron a reenviar bloques que contenían transacciones de direcciones sancionadas. La proporción de bloques construidos a través de esos retransmisores que cumplían con la OFAC alcanzó un máximo cercano al 79 % en noviembre de 2022. El otro 21 % provino de retransmisores y constructores que no filtraban, por lo que las transacciones de Tornado Cash seguían aterrizando, solo que más lento. La espera esperada aumentó de unos 12 segundos a aproximadamente un minuto.

Eso parecía alarmante, y lo era. Luego, la proporción cayó. Se lanzaron nuevos retransmisores explícitamente sin filtros, incluidos Ultra Sound y Agnostic, y los proponentes eran libres de agregarlos a su configuración de MEV-Boost. Nadie podía obligar a cada proponente a usar un retransmisor con filtros, por lo que la proporción no pudo mantenerse en su punto máximo. A principios de 2023 estaba por debajo del 50 %, y durante el resto de 2023 osciló entre el 27 % y el 47 %. La OFAC eliminó a Tornado Cash de la lista de sanciones en marzo de 2025. El episodio sigue siendo la prueba de estrés de resistencia a la censura más clara de Ethereum.

Ethereum también está trasladando una mayor parte de esta garantía al protocolo en sí. Una actualización planificada llamada FOCIL (EIP-7805) agrega listas de inclusión. Los validadores seleccionados al azar publican las transacciones que ven en la mempool pública, y se espera que el siguiente bloque satisfaga esas listas. Si un bloque las ignora, el resto de la red puede rechazarlo. Así que nadie puede impedir que tus usuarios utilicen tu aplicación.

## Sin permisos {#permissionless}

La resistencia a la censura se trata de si los usuarios pueden seguir accediendo a tu aplicación después de que la lanzas. La naturaleza sin permisos se trata de si puedes lanzarla en primer lugar.

Desplegar en Ethereum no requiere una asociación, cuenta, aprobación de listado, revisión de la tienda de aplicaciones o acuerdo comercial. Cualquiera puede desplegar código, llamar a un contrato, ejecutar un nodo, indexar datos, construir una billetera o publicar una interfaz. La capa base no sabe si eres una startup, un banco, un desarrollador independiente, un agente, una DAO o un usuario sin ninguna empresa en absoluto.

Eso cambia el modelo del constructor. En una plataforma, el propietario de la plataforma puede cambiar los términos, revocar claves, bloquear regiones, eliminar aplicaciones o condicionar el acceso a una relación comercial. En Ethereum, el protocolo evalúa las transacciones según las mismas reglas públicas para cualquier persona que llame. Un contrato desplegado hoy se ejecuta según esas reglas públicas para cada dirección mientras la cadena siga funcionando.

Esto no elimina todas las dependencias. La mayoría de los usuarios no acceden a tus contratos directamente. Pasan por un frontend, una billetera y un proveedor de RPC, y cualquiera de esas capas puede romperse o filtrar. Los frontends pueden ser dados de baja. Los proveedores de RPC, los servicios que enrutan la mayoría de las solicitudes de aplicaciones y billeteras a la cadena, pueden negarse a reenviar transacciones o bloquear regiones y direcciones específicas. Las billeteras pueden elegir lo que muestran.

El entorno de ejecución base permanece abierto por debajo. Si tu frontend se cae, un usuario aún puede llamar al contrato directamente, y otro desarrollador puede construir una nueva interfaz. Si una billetera deja de admitir tu token, el contrato sigue funcionando. Si un proveedor de RPC filtra, una aplicación puede enrutar a través de otro o ejecutar su propio nodo para llegar a la red.

## Composabilidad {#composability}

La naturaleza sin permisos lleva tu código a la cadena. Una vez que está allí, nadie puede eliminarlo, por lo que otros desarrolladores pueden construir sobre tus contratos, y tú puedes construir sobre los de ellos.

El ether envuelto (WETH) es el ejemplo más claro. Es un contrato que envuelve ETH para que pueda usarse como un token estándar en otros contratos. Se encuentra en una dirección fija de Ethereum, contiene alrededor de 1,8 millones de WETH a partir de mayo de 2026, tiene aproximadamente 3,25 millones de titulares y actúa como una unidad común en DEX, mercados de préstamos, bóvedas y puentes. Es código que miles de otros contratos y aplicaciones pueden usar directamente.

Ese patrón se repite en todo el ecosistema. Desde su génesis hasta principios de 2025, Ethereum vio decenas de millones de despliegues de contratos y aproximadamente 2,5 millones de códigos de bytes únicos según el recuento de Zellic. Estándares como ERC-20 para tokens fungibles y ERC-721 para tokens no fungibles (NFT) se convirtieron en capas de coordinación. Un token que emite tu contrato puede negociarse en un DEX, usarse como garantía para pedir prestado en un mercado monetario, ser indexado por herramientas de análisis, mostrarse en billeteras y ser puenteado o envuelto por otros sistemas sin que cada equipo negocie un acuerdo personalizado.

A partir de mayo de 2026, alrededor de 46 mil millones de dólares se encontraban en finanzas descentralizadas (DeFi) en Ethereum. Ese dinero está bloqueado dentro de miles de protocolos en funcionamiento, incluidos activos, mercados, oráculos, billeteras, sistemas de cuentas, contratos de gobernanza, puentes, análisis y herramientas para desarrolladores. Todo esto es código al que puedes llamar directamente desde el primer día, en lugar de construir desde cero o esperar asociaciones.

## La economía de los agentes {#the-agent-economy}

El acceso sin permisos y la resistencia a la censura, con la descentralización por debajo de ellos, importan aún más para la próxima ola de usuarios que ingresan a Ethereum. Los agentes de IA son esa ola, y pagan por servicios, mantienen capital y liquidan con otros agentes a través de transacciones y llamadas a contratos, todo sin un humano en el proceso. Un agente no tiene una tarjeta para cobrar, ni una cuenta de plataforma para suspender, ni un humano al que llamar cuando un retransmisor se niega a reenviar una transacción. Es por eso que ambos dejan de ser opcionales para ese tipo de software, y las propiedades de Ethereum coinciden directamente con lo que un agente realmente necesita. Ethereum es donde se espera que se desarrolle esa economía, y eso podría hacer crecer inmensamente la base de usuarios.

Ya sea que lances el agente o lances los contratos a los que llama el agente, aparecen los mismos problemas. En una pila alojada típica, la identidad del agente se alquila de una cuenta de plataforma que puede ser revocada. Sus pagos dependen de la tarjeta o clave de API de un humano. Sus reglas se ejecutan en un servidor que controla un operador. Su continuidad depende de un host que puede desaparecer. Cada una de esas dependencias es lo que la capa base de Ethereum está diseñada para eliminar.

En Ethereum, nada de eso depende de un operador. Las claves del agente son suyas, y las reglas bajo las que firma no pueden reescribirse unilateralmente. Sus transacciones pasan por el mismo elenco rotativo de validadores, constructores y retransmisores que protege a cualquier otra dirección del bloqueo dirigido. Las transiciones de estado ocurren en público, por lo que los contratos al otro lado de la llamada no tienen que confiar en un operador para informar lo que sucedió.

Los rieles ya están en su lugar. Los contratos inteligentes, las monedas estables y la abstracción de cuentas le dan a un actor autónomo una dirección funcional, un saldo funcional y límites de gasto programables hoy en día. Los estándares para la identidad de los agentes y los pagos nativos de máquinas se están poniendo al día. ERC-8004 define registros en cadena para la identidad, reputación y validación de agentes. x402 utiliza el código de estado HTTP 402 para permitir que los clientes, incluidos los agentes, paguen las API y los servicios digitales en monedas estables sin cuentas tradicionales. La adopción es temprana pero avanza, y la superficie de integración es pequeña. Acepta pagos x402 en tus puntos finales, registra o verifica la identidad a través de ERC-8004 y trata las direcciones de los agentes como usuarios de primera clase en tus contratos.

Para cualquier constructor que elija una cadena en la que lanzar, los agentes son la próxima clase de usuarios en formación, y los rieles ya están activos. Los contratos que lanzas hoy pueden servirles mañana sin esperar a un protocolo futuro.

## Conclusión {#conclusion}

La descentralización, la resistencia a la censura, el despliegue sin permisos y la composabilidad no son ventajas independientes. Se refuerzan mutuamente. La descentralización hace que la resistencia a la censura sea creíble y permite a los usuarios seguir accediendo a lo que se lanza. El despliegue sin permisos permite a los constructores lanzar productos. La composabilidad convierte esas aplicaciones en infraestructura compartida. Los agentes autónomos pueden realizar transacciones a través de ella y nadie puede detenerlos. Lo que lanzas es un compromiso público. Sigue funcionando sin ti.

## Lecturas adicionales {#further-reading}

- [Punto de control n.º 9 de la Fundación Ethereum (abril de 2026)](https://blog.ethereum.org/2026/04/10/checkpoint-9)
- [clientdiversity.org](https://clientdiversity.org/)
- [Rastreador de nodos de Etherscan](https://etherscan.io/nodetracker)
- [Validadores de beaconcha.in](https://beaconcha.in/charts/validators)
- [Análisis posterior: finalidad de la Red principal en mayo de 2023](https://medium.com/offchainlabs/post-mortem-report-ethereum-mainnet-finality-05-11-2023-95e271dfd8b2)
- [mevwatch.info](https://www.mevwatch.info/)
- [The Block: los bloques que cumplen con la OFAC caen al 27 %](https://www.theblock.co/post/230179/ethereums-ofac-compliant-blocks-fall-to-27-marking-a-drop-in-protocol-level-censorship)
- [Propuesta principal de Hegotá: FOCIL (EIP-7805)](https://ethereum-magicians.org/t/hegota-headliner-proposal-focil-eip-7805/27604)
- [EIP-7805: Listas de inclusión aplicadas por elección de bifurcación (FOCIL)](https://eips.ethereum.org/EIPS/eip-7805)
- [EIP-8004: Identidad de agente en cadena](https://eips.ethereum.org/EIPS/eip-8004)
- [GitHub de coinbase/x402](https://github.com/coinbase/x402)
- [CoinDesk: la demanda de x402 no se ha materializado](https://www.coindesk.com/markets/2026/03/11/coinbase-backed-ai-payments-protocol-wants-to-fix-micropayment-but-demand-is-just-not-there-yet)
- [WETH en Etherscan](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
- [Zellic: Todos los contratos de Ethereum](https://www.zellic.io/blog/all-ethereum-contracts/)
- [DefiLlama: cadena Ethereum](https://defillama.com/chain/ethereum)
- [OpenZeppelin: Evaluación de riesgos técnicos en redes de cadenas de bloques (abril de 2026)](https://openzeppelin.com/hubfs/OpenZeppelin%20%7C%20Technical%20Risk%20Assessment%20on%20Blockchain%20Networks.pdf)