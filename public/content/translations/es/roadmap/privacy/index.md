---
title: La hoja de ruta de privacidad para Ethereum
description: Ethereum está trabajando para hacer de la privacidad una propiedad de primer nivel de la red a través de actualizaciones que protegen la privacidad de las transacciones, aseguran el acceso a los datos del usuario y permiten una identidad verificable pero privada.
lang: es
image: /images/roadmap/roadmap-security.png
alt: "Hoja de ruta de Ethereum"
template: roadmap
---

**La privacidad en Ethereum está pasando de ser un complemento opcional a un valor predeterminado a nivel de red.** Las hojas de ruta de privacidad propuestas para Ethereum apuntan a puntos de conexión vulnerables específicos donde los datos de los usuarios pueden filtrarse hoy en día. La investigación en todo el ecosistema tiene como objetivo hacer de Ethereum una plataforma donde la privacidad sea estructural en lugar de opcional.

Los investigadores de la Fundación Ethereum han [agregado tres prioridades principales de la hoja de ruta](https://pse.dev/blog/pse-roadmap-2025) a partir de la investigación distribuida del ecosistema:

- **Lecturas privadas**: consultar y navegar por Ethereum sin revelar a qué direcciones, contratos o datos accede un usuario. Proteger las lecturas evita que se recopilen datos incluso antes de que se firme una transacción.
- **Escrituras privadas**: enviar transacciones que sean resistentes a la censura y a la filtración de metadatos, desde la inclusión en la mempool hasta la liquidación final. Proteger las escrituras garantiza que las transacciones privadas no sean censuradas ni vinculadas a su origen.
- **Pruebas privadas**: verificar la identidad, la elegibilidad o los datos sin divulgar la información personal subyacente, utilizando pruebas de conocimiento cero eficientes. Las pruebas privadas permiten a los usuarios participar en la red mientras optan por revelar solo la información mínima necesaria (divulgación selectiva).

Juntas, estas tres áreas forman un modelo de privacidad de extremo a extremo. El objetivo es la **soberanía computacional**, asegurando que Ethereum sea una plataforma donde las personas y las instituciones puedan interactuar, coordinarse y realizar transacciones a nivel mundial sin la recopilación de datos no aprobada, la vigilancia o la censura centralizada.

**¿Por qué es importante la privacidad?** Aprenda sobre la privacidad, cómo proteger su privacidad en línea y cómo proteger su privacidad en Ethereum hoy en día.

<ButtonLink variant="outline" href="/privacy/">Más sobre privacidad</ButtonLink>

## Las lecturas privadas protegen las consultas de los usuarios y los datos de acceso {#private-reads}

Antes de que se firme una transacción, un usuario necesita leer datos de la cadena de bloques. Para comprobar un saldo, estimar el gas o verificar el estado de un contrato inteligente, el software de la billetera envía consultas a un proveedor de nodos. Estas consultas estándar de **Llamada a Procedimiento Remoto (RPC)** exponen una inmensa cantidad de metadatos.

El proveedor de nodos puede ver la dirección IP del usuario, la huella digital del dispositivo, las direcciones específicas consultadas y el momento y la frecuencia de su actividad. Incluso si un usuario envía luego una transacción privada, el proveedor de infraestructura ya tiene acceso a un mapa detallado de sus intenciones.

<VideoWatch slug="ethereum-privacy-stack-andy-guzman" />

La filtración de metadatos en la capa de acceso es uno de los problemas de privacidad más persistentes en todos los sistemas de cadenas de bloques. Ethereum tiene como objetivo abordar la filtración de metadatos a través de la privacidad en el origen, u ocultar quién preguntó, la privacidad en el contenido, u ocultar qué se preguntó, y verificar la exactitud de la información devuelta.

La **privacidad de origen** utiliza [RPC anónimo](https://privreads.ethereum.foundation/feed/anon-rpc/) y soluciones de red anónimas para ocultar la entidad que solicita los datos, la **privacidad de contenido** utiliza tácticas como la recuperación de información privada y la [RAM ajena (oblivious RAM)](https://en.wikipedia.org/wiki/Oblivious_RAM) para ocultar los datos que se consultan, mientras que la **verificación de exactitud** utiliza clientes ligeros para demostrar que los datos devueltos son precisos.

El bloque de construcción criptográfico detrás de la privacidad del contenido es la [**Recuperación de Información Privada (PIR)**](https://en.wikipedia.org/wiki/Private_information_retrieval), una técnica criptográfica que permite a un cliente consultar una base de datos y recuperar una pieza de información específica sin revelar al servidor a qué elemento se accedió. El servidor procesa la solicitud a ciegas y devuelve una respuesta cifrada que solo la billetera que realiza la consulta puede descifrar.

PIR opera en la capa de acceso, situándose entre el software de la billetera y los proveedores de nodos. A medida que maduren las implementaciones de PIR, se integrarán en los kits de desarrollo de software (SDK) de las billeteras y en los proveedores de infraestructura, lo que permitirá a los usuarios consultar la red sin exponer su actividad a intermediarios centralizados.

Las lecturas privadas también reducen la exposición al front-running y a los ataques de ordenamiento de transacciones. Si un proveedor de infraestructura no puede ver qué contrato inteligente o dirección está consultando un usuario, no puede vender esa información a actores que se benefician de anticipar la actividad en cadena.

## Las escrituras privadas previenen la censura y la filtración de transacciones {#private-writes}

Una vez que se envía una transacción, pasa a través de la infraestructura de la red que puede observarla o bloquearla antes de que se registre en cadena. Aquí es donde muchos protocolos de privacidad fallan en la práctica. Los grandes constructores de bloques centralizados monitorean la mempool y pueden marginar o censurar silenciosamente las transacciones que se originan en herramientas de privacidad. Incluso si la criptografía subyacente es sólida, una transacción que nunca se incluye en un bloque no proporciona ninguna protección.

Dos actualizaciones a nivel de protocolo abordan este problema en conjunto:

[**EIP-8141 (Transacciones de marco)**](https://eips.ethereum.org/EIPS/eip-8141) introduce un nuevo tipo de transacción que divide las transacciones en segmentos para la validación de firmas y la autorización de tarifas, y para las instrucciones reales de la transacción. Las transacciones de marco permiten a las [cuentas inteligentes](/roadmap/account-abstraction/) definir sus propios esquemas de firma y utilizar contratos externos para cubrir las tarifas de gas. Las estrictas reglas de aislamiento (sandboxing) en la mempool evitan que estas transacciones abran la red a ataques de denegación de servicio.

Las transacciones de marco se están considerando para la [actualización Hegotá](https://forkcast.org/upgrade/hegota/) de Ethereum, la próxima actualización de la red después de la inminente [actualización Glamsterdam](/roadmap/glamsterdam/). La misma actualización también permitirá a las cuentas inteligentes adoptar [firmas seguras contra ataques cuánticos](/roadmap/security/quantum-resistance/) antes de que se complete la transición total de la red poscuántica.

<ExpandableCard title="¿Cómo permiten la privacidad las transacciones frame (EIP-8141)?" eventCategory="/roadmap/privacy" eventName="clicked how do frame transactions enable privacy?">

Las transacciones de marco permiten a las cuentas elegir su propio método de verificación de firmas. Para la privacidad, esto significa que los usuarios pueden adoptar esquemas de firma que preservan la privacidad sin esperar a una migración a gran escala en toda la red. Las transacciones de marco también permiten la abstracción de las tarifas de gas, lo que permite a las herramientas de privacidad cubrir los costos de las transacciones sin exponer las direcciones de los usuarios en cadena.

</ExpandableCard>

[**EIP-7805 (Listas de inclusión forzadas por elección de bifurcación, o FOCIL)**](https://eips.ethereum.org/EIPS/eip-7805) proporciona el mecanismo de aplicación para las escrituras privadas. Las reglas de consenso exigen a los proponentes de bloques que incluyan transacciones en sus bloques a partir de listas de inclusión locales agregadas, que recopilan transacciones de múltiples fuentes. Si un constructor de bloques intenta censurar una transacción que apareció en las listas de inclusión, los nodos que dan fe rechazan el bloque propuesto por completo. FOCIL se está considerando actualmente para la [actualización Hegotá](https://forkcast.org/upgrade/hegota/).

Las transacciones de marco brindan a los usuarios la flexibilidad de construir transacciones que preservan la privacidad con esquemas de firma personalizados, mientras que FOCIL garantiza que esas transacciones no puedan ser censuradas selectivamente una vez que ingresan a la mempool. Juntos abordan dos puntos de falla diferentes: uno habilita el formato de las transacciones privadas, el otro garantiza su inclusión. Ningún actor central puede bloquear una transferencia privada válida.

<VideoWatch slug="eip-7805-focil-explained" />

Un segundo punto vulnerable para la privacidad del usuario es cómo Ethereum rastrea el orden de las transacciones, llamado el sistema de nonce secuencial. En el modelo de cuenta estándar de Ethereum, cada cuenta utiliza un único contador que se incrementa linealmente. Si una transacción privada se retrasa en la mempool, todas las transacciones posteriores de esa cuenta se estancan detrás de ella. La secuencia de nonce también permite a los observadores de la red vincular múltiples transacciones a la misma cuenta de origen, socavando la privacidad.

[**EIP-8250 (Nonces con clave para transacciones de marco)**](https://eips.ethereum.org/EIPS/eip-8250), que actualmente se está considerando para Hegotá, resuelve esto al permitir que una sola cuenta administre múltiples secuencias de transacciones paralelas simultáneamente. Los usuarios pueden ejecutar muchas transacciones privadas en diferentes contextos al mismo tiempo, y los observadores ya no pueden correlacionar de manera confiable distintas actividades con la misma cuenta principal.

### Pagos privados y transferencia de valor {#private-payments}

Más allá del enrutamiento de transacciones y la gestión de nonces, proteger las escrituras requiere resguardar las identidades y los activos involucrados en una transferencia. Incluso cuando un usuario consulta de forma privada y transmite una transacción sin censura, los datos de la transacción registrados en cadena siguen siendo visibles públicamente. Cualquiera puede ver quién envió cuánto a quién, y las empresas de análisis de cadenas agregan estos datos en perfiles que se pueden buscar y que persisten indefinidamente.

[**EIP-8182 (Transferencias privadas de ETH y ERC-20)**](https://eips.ethereum.org/EIPS/eip-8182), propuesto para la actualización Hegotá, introduce un fondo (pool) blindado compartido y nativo directamente en el protocolo de Ethereum para transferencias de ETH y ERC-20. Los fondos de privacidad utilizan la mezcla criptográfica para cortar el vínculo entre el depósito y el retiro, pero hoy en día solo están disponibles a través de aplicaciones de privacidad, billeteras y redes de capa 2 (l2).

Históricamente, las soluciones de privacidad a nivel de aplicación han fracturado la liquidez y han sufrido de conjuntos de anonimato bajos. EIP-8182 consolida las transferencias blindadas a nivel de protocolo, lo que permite a los usuarios enrutar fondos a través de claves de entrega ocultas sin requerir arquitecturas de billetera especializadas ni interactuar con aplicaciones fragmentadas y opcionales.

Otros enfoques de investigación que se están promoviendo para la privacidad de las transacciones incluyen pruebas que permiten a los usuarios demostrar que los montos de las transacciones son válidos sin revelar los valores reales (como las pruebas de rango y las bulletproofs). La investigación sobre **transacciones confidenciales** tiene como objetivo ocultar los montos y, al mismo tiempo, permitir que la red verifique que no se crea ni se destruye ningún valor.

Estas soluciones de la capa de pago se basan en la infraestructura descrita anteriormente en esta sección. PIR protege la fase de preparación, las transacciones de marco y FOCIL garantizan que los pagos privados lleguen a la mempool sin censura, y las zkVMs permiten la criptografía compleja requerida para ocultar el valor mientras se mantienen las garantías de seguridad de la red.

## Pruebas privadas y protección de identidad {#private-proving}

La privacidad no se trata de un ocultamiento total. Se trata de la **divulgación selectiva**, o elegir qué información revelar, a quién y en qué términos. Ethereum admite la divulgación selectiva a través de [**pruebas de conocimiento cero (ZKP)**](/zero-knowledge-proofs/), que permiten a una parte demostrar que una afirmación es verdadera sin revelar los datos subyacentes. Por ejemplo, demostrar la ciudadanía sin revelar los detalles del pasaporte, o demostrar un umbral de edad sin revelar una fecha de nacimiento exacta.

Las pruebas privadas se conectan a la hoja de ruta de privacidad al permitir una identidad verificable sin exposición de datos a nivel de protocolo. Mientras que las lecturas y escrituras privadas protegen los metadatos de las transacciones, las pruebas privadas garantizan que las verificaciones de identidad y elegibilidad requeridas para la participación en el mundo real no requieran entregar datos personales a sistemas de verificación centralizados.

En la hoja de ruta de privacidad de Ethereum, las pruebas privadas están respaldadas por vías de infraestructura complementarias, una en la capa de ejecución para hacer posible la computación privada a nivel de protocolo, y otra en la capa de acceso, que hace que la computación privada sea práctica en los dispositivos de los consumidores.

Las **máquinas virtuales de conocimiento cero (zkVMs)** permiten que los contratos inteligentes ejecuten su lógica y generen una prueba criptográfica de que el trabajo se realizó correctamente. Cuando esa prueba es verdaderamente de conocimiento cero, no revela nada sobre las entradas, el estado intermedio o las salidas, desbloqueando la computación privada a nivel de red.

El nombre "zkVM" conlleva un matiz; la mayoría de los sistemas llamados zkVMs hoy en día son sucintos en lugar de ser de conocimiento cero. Sus pruebas son pequeñas y rápidas de verificar, pero no necesariamente ocultan los datos utilizados para generarlas. Hoy en día, solo un puñado de sistemas de prueba proporcionan la propiedad de ocultamiento de la que dependen las aplicaciones de privacidad. Los [puntos de referencia de pruebas del lado del cliente (Client-Side Proving benchmarks)](https://ethproofs.org/csp-benchmarks) rastrean qué zkVMs han sido analizadas para determinar si tienen un conocimiento cero real en las propiedades de su sistema. Cerrar esa brecha es parte del trabajo de pruebas privadas de la hoja de ruta.

Las transacciones de marco (EIP-8141) también están conectadas a la implementación de zkVMs. Pueden utilizar esquemas de verificación personalizados para enviar transiciones de estado verificadas por pruebas, lo que permite a las aplicaciones ofrecer entornos de ejecución privados y enviar la prueba criptográfica a la red pública de Ethereum de que la acción se realizó correctamente, sin exponer los datos de la transacción en sí.

Las pruebas de conocimiento cero son excelentes para permitir que las personas demuestren que sus datos son válidos mientras los mantienen privados, pero no pueden administrar fácilmente contratos inteligentes donde múltiples usuarios necesitan interactuar con un grupo compartido de datos secretos al mismo tiempo.

Para cerrar esta brecha, la hoja de ruta de Ethereum incorpora el **Cifrado Totalmente Homomórfico (FHE)**. El FHE permite que los contratos inteligentes ejecuten cálculos directamente sobre datos cifrados sin tener que descifrar o exponer la información subyacente. La integración de bloques de construcción de FHE y coprocesadores criptográficos especializados en Ethereum es esencial para las aplicaciones descentralizadas que dependen de un "estado oculto" compartido, como los creadores de mercado automatizados (AMM) privados, los fondos de préstamos confidenciales o las subastas de ofertas cerradas donde las entradas de todos deben interactuar mientras permanecen completamente en secreto.

Las **pruebas del lado del cliente** hacen que la generación de estas pruebas de privacidad sea práctica en los dispositivos cotidianos. El proyecto Client-Side Proving mantiene un conjunto de puntos de referencia públicos que compara sistemas de prueba y zkVMs en hardware de consumo, publicando los resultados en [ethproofs.org](https://ethproofs.org). La investigación técnica apunta a pruebas transparentes y [poscuánticas](/roadmap/security/quantum-resistance/) con verificación directa en cadena, lo que hace que la computación privada sea más rápida, más fácil de verificar directamente en la red Ethereum y viable en dispositivos móviles.

La [**iniciativa zkID**](https://pse.dev/projects/zk-id) ha producido una infraestructura de código abierto alineada con los marcos de identidad globales, incluida la billetera de Identidad Digital Europea (EUDI). El sistema de Credenciales Anónimas Abiertas (OpenAC) proporciona la imposibilidad de vinculación para las credenciales emitidas, lo que garantiza que múltiples pruebas generadas por el mismo usuario en diferentes plataformas no se puedan correlacionar con un solo perfil.

En el espacio de la gobernanza, el protocolo de [**Infraestructura Mínima Anticolusión (MACI)**](https://maci.pse.dev/) proporciona **ausencia de recibos**, lo que hace que sea criptográficamente imposible demostrar cómo votó una cuenta. Debido a que los votantes no pueden presentar un recibo que muestre su elección, la compra de votos y la coerción pierden su incentivo económico. MACI ha asegurado decisiones de financiamiento en el mundo real desde 2020 a través de [clr.fund](https://clr.fund/), que ha distribuido millones de dólares en financiamiento cuadrático para bienes públicos de Ethereum.

La votación que preserva la privacidad ya está protegiendo a votantes reales en entornos de alto riesgo. La [Freedom Tool de Rarimo](https://docs.rarimo.com/freedom-tool/) utiliza la verificación de pasaportes de conocimiento cero para permitir que los ciudadanos demuestren que son elegibles para votar sin revelar quiénes son. Ha impulsado elecciones en la sombra anónimas y encuestas de la oposición en países como Rusia (el voto de la oposición [Russia2024](https://rarimo.medium.com/russian-opposition-use-rarimos-freedom-tool-to-launch-surveillance-free-voting-app-0d73ebea5e8a)), Georgia (la aplicación de encuestas United Space) e Irán (el proyecto Iranians Vote), donde la seguridad de los votantes depende del secreto criptográfico de las boletas.

Las pruebas privadas también permiten la **privacidad consciente del cumplimiento**. Las soluciones de privacidad, como los fondos de privacidad, aceptan depósitos libremente, pero requieren que los usuarios generen pruebas de conocimiento cero de que sus fondos no se cruzan con direcciones maliciosas conocidas antes de retirarlos. El modelo de cumplimiento programable separa el acto de blindar las transacciones del acto de demostrar el cumplimiento normativo, lo que permite a los usuarios cotidianos realizar transacciones de forma privada mientras cumplen con los requisitos institucionales.

Las zkEVMs pueden ejecutar estas verificaciones de cumplimiento de forma privada, verificando el estado regulatorio sin exponer los detalles de la transacción ni las identidades de los usuarios.

## Progreso actual de la hoja de ruta {#current-progress}

La dirección del desarrollo de la privacidad en Ethereum está moldeada por la alineación de todo el ecosistema en lugar de por una sola organización. La hoja de ruta de [strawmap.org](https://strawmap.org/) recopila las actualizaciones propuestas de todo el ecosistema para rastrear y proponer dónde la comunidad ha alcanzado un consenso. Los investigadores de la Fundación Ethereum ayudan a administrar una hoja de ruta paralela de investigación y desarrollo en todo el ecosistema de investigación, centrada en el avance de las herramientas de privacidad de la capa de acceso, la infraestructura de identidad y los sistemas conscientes del cumplimiento. Ambos ejemplos reflejan la misma prioridad subyacente de hacer que la privacidad en Ethereum sea estructural en lugar de opcional.

La investigación y el desarrollo de la privacidad en Ethereum abarcan docenas de equipos en todo el ecosistema. El trabajo avanza en actualizaciones del protocolo, soluciones de la capa de acceso, infraestructura de identidad y herramientas conscientes del cumplimiento.

**Actualizaciones del protocolo**: EIP-8141 (Transacciones de marco), EIP-7805 (FOCIL), EIP-8250 (Nonces con clave) y EIP-8182 (Fondos blindados a nivel de protocolo) están en desarrollo activo y se están considerando para la [actualización Hegotá](https://forkcast.org/upgrade/hegota/), la próxima actualización de la red después de [Glamsterdam](/roadmap/glamsterdam/). EIP-8025 (pruebas de ejecución opcionales) y los árboles Verkle también están previstos para Hegotá, proporcionando la base para la computación privada basada en zkEVM en la red principal de Ethereum. En paralelo, la investigación está madurando en torno a los coprocesadores FHE para permitir contratos inteligentes cifrados multipartitos.

**Capa de acceso**: La investigación de PIR está progresando con implementaciones activas que están siendo probadas por los equipos de infraestructura. El SDK de la billetera Kohaku está en desarrollo como una referencia de código abierto para billeteras que preservan la privacidad.

**Pruebas del lado del cliente**: Los equipos están utilizando activamente los resultados de las pruebas basadas en puntos de referencia para optimizar cómo se ejecutan las pruebas de conocimiento cero en dispositivos estándar. Proyectos como Spartan-WHIR están avanzando en pruebas seguras y resistentes a los ataques cuánticos que se pueden verificar fácilmente de forma directa en la red Ethereum. Las iniciativas de investigación como leanVM proporcionan una zkVM ligera diseñada para agrupar múltiples firmas criptográficas, reduciendo el tamaño de los datos de las firmas seguras contra ataques cuánticos en 250 veces para ahorrar espacio y reducir los costos de la red.

**Identidad y pruebas**: La iniciativa zkID está produciendo esquemas de prueba optimizados para dispositivos móviles. MACI continúa asegurando rondas de financiamiento cuadrático y la gobernanza de las DAO, herramientas como la Freedom Tool de Rarimo están llevando la votación de conocimiento cero a las elecciones del mundo real, y la investigación en curso continúa sobre los estándares de identidad que preservan la privacidad.

Ninguna parte de este trabajo está terminada. Los plazos son objetivos, no garantías, y el [proceso de gobernanza basado en el consenso](/governance/) de Ethereum significa que la hoja de ruta puede cambiar a medida que avanza la investigación. Pero el alcance del desarrollo activo y la cantidad de equipos que trabajan en la privacidad representan un claro compromiso para hacer que Ethereum sea resistente a la extracción de forma predeterminada.

## Lecturas adicionales {#further-reading}

- [Privacidad en Ethereum](/privacy/)
- [Hoja de ruta de PSE: 2025 y más allá](https://pse.dev/blog/pse-roadmap-2025)
- [El mandato de la Fundación Ethereum](/foundation/mandate/)
- [strawmap.org](https://strawmap.org/)
- [Pruebas de conocimiento cero](/zero-knowledge-proofs/)
- [Identidad descentralizada](/decentralized-identity/)
- [Hoja de ruta de Kohaku](https://notes.ethereum.org/@niard/KohakuRoadmap)
- [Puntos de referencia de pruebas del lado del cliente](https://ethproofs.org/csp-benchmarks)
- [zkEVM en números](https://zkevm.ethereum.foundation/)