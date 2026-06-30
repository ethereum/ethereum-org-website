---
title: "Preparación de Ethereum para el futuro y seguridad cuántica de la criptografía"
description: Estas actualizaciones consolidan a Ethereum como la capa base resiliente y descentralizada para el futuro, depare lo que depare.
lang: es
image: /images/roadmap/roadmap-future.png
alt: "Hoja de ruta de Ethereum"
template: roadmap
summaryPoints:
  - La criptografía poscuántica garantiza que Ethereum pueda sobrevivir a amenazas de hardware avanzado a medida que avanza la computación cuántica
  - La simplificación del protocolo hace que Ethereum sea más fácil de mantener, auditar y asegurar
  - Las actualizaciones recientes ya han aportado mejoras significativas en la eficiencia
---

Algunas partes de la hoja de ruta no tratan sobre escalar o asegurar Ethereum en este momento. Tratan sobre hacer que Ethereum sea **estable y confiable en el futuro lejano**. Esto significa prepararse para nuevos tipos de amenazas y eliminar la complejidad innecesaria del protocolo.

## Resistencia cuántica {#quantum-resistance}

Ethereum utiliza la [criptografía](/glossary/#cryptography) para mantener la red segura y proteger los fondos de los usuarios. Con el tiempo, algunos de estos métodos criptográficos serán **vulnerables a las computadoras cuánticas**, las cuales pueden resolver problemas matemáticos específicos exponencialmente más rápido que las máquinas clásicas.

**Ninguna computadora cuántica puede romper la criptografía de Ethereum hoy en día.** El hardware necesario aún no existe a gran escala. Pero investigaciones recientes sugieren que la brecha se está cerrando más rápido de lo esperado. En marzo de 2026, Google Quantum AI publicó un artículo estimando que romper la criptografía de curva elíptica de 256 bits (el tipo que Ethereum usa para las firmas de cuentas) podría requerir aproximadamente 1,200 cúbits lógicos, unas 20 veces menos que las estimaciones anteriores. Google ha establecido una fecha límite interna en 2029 para migrar sus propios sistemas a una criptografía segura contra ataques cuánticos.

Las transiciones criptográficas tardan años en planificarse y ejecutarse de manera segura. Debido a que el modelo de seguridad de Ethereum está diseñado para durar décadas, la preparación poscuántica estaba en la hoja de ruta de Ethereum antes de que apareciera en los titulares principales. La preparación de la red está ocurriendo ahora para garantizar una transición fluida, no como una reacción a una emergencia.

### ¿Qué está en riesgo? {#what-is-at-risk}

Se han identificado cuatro áreas principales de la criptografía de Ethereum que requieren actualizaciones poscuánticas:

1. **Firmas de consenso (BLS)**: Los [validadores](/glossary/#validator) usan firmas BLS para votar sobre [bloques](/glossary/#block) válidos. Una computadora cuántica podría falsificar estas firmas.
2. **Disponibilidad de datos (compromisos KZG)**: Los [esquemas de compromiso](/roadmap/danksharding/#what-is-kzg) que ayudan a Ethereum a escalar dependen de matemáticas (específicamente, el emparejamiento de curva elíptica) que son vulnerables a ataques cuánticos.
3. **Firmas de cuentas (ECDSA)**: El esquema de firma que protege las cuentas individuales de Ethereum. Cuando una cuenta envía una transacción, su clave pública queda expuesta en cadena. Una computadora cuántica podría derivar la clave privada a partir de esta clave pública expuesta, lo que potencialmente permitiría el robo de fondos.
4. **Pruebas ZK en la capa de aplicación**: Los sistemas de prueba de conocimiento cero utilizados por los rollups y otras aplicaciones dependen de suposiciones criptográficas que las computadoras cuánticas podrían socavar.

<ExpandableCard title="¿Pueden las computadoras cuánticas robar mi ETH hoy?" eventCategory="/roadmap/future-proofing" eventName="clicked can quantum computers steal my ETH today?">

No. Ninguna computadora cuántica actual puede romper la criptografía de Ethereum. El trabajo descrito en esta página es una preparación para el futuro, no una respuesta a una amenaza activa. Cuando las billeteras poscuánticas estén disponibles, el software de la billetera lo guiará a través de la migración. Por ahora, no hay nada que deba hacer.

</ExpandableCard>

### ¿Qué se está haciendo?

Ethereum es actualmente el defensor más proactivo contra las amenazas cuánticas en el ecosistema de la cadena de bloques. La Fundación Ethereum formó un **equipo de Seguridad Poscuántica** dedicado en enero de 2026, y el trabajo activo abarca múltiples equipos de clientes y grupos de investigación. El trabajo del equipo Poscuántico de la EF se rastrea públicamente en [pq.ethereum.org](https://pq.ethereum.org).

El trabajo activo incluye:

- **Firmas basadas en hash (leanXMSS)**: Un reemplazo seguro contra ataques cuánticos para las firmas de los validadores, construido sobre funciones hash que las computadoras cuánticas no pueden romper de manera eficiente.
- **zkVM mínima (leanVM)**: Debido a que las firmas seguras contra ataques cuánticos son más grandes que las firmas utilizadas actualmente, leanXMSS se combina con una zkVM mínima (leanVM). Este motor agrega firmas seguras contra ataques cuánticos de manera eficiente, comprimiendo los datos 250 veces, para que la red siga siendo rápida después de la transición.
- **Pruebas de interoperabilidad semanales**: Más de 10 equipos de clientes participan en redes de desarrollo (devnets) poscuánticas regulares.
- **Disponibilidad de datos:** Actualizar la criptografía subyacente utilizada para manejar grandes cantidades de datos de la red garantizará que Ethereum siga siendo rápido y asequible de usar sin arriesgar futuras vulnerabilidades cuánticas.
- **Premio Poseidon**: Un premio de investigación de 1 millón de dólares dirigido a mejoras en las primitivas criptográficas basadas en hash.
- **Estándares del NIST**: El Instituto Nacional de Estándares y Tecnología de EE. UU. finalizó tres estándares de criptografía poscuántica en agosto de 2024 (ML-KEM, ML-DSA, SLH-DSA). El trabajo de Ethereum se basa en estos cimientos.

Una parte clave de la estrategia de transición es la **EIP-8141**, que introduce la [abstracción de cuentas](/roadmap/account-abstraction/) nativa. Esto permite a las cuentas individuales elegir su propia verificación de firma, lo que significa que los usuarios podrían cambiar a firmas seguras contra ataques cuánticos **sin esperar una única migración en todo el protocolo**. La EIP-8141 se está considerando para la bifurcación dura Hegotá (planeada para la segunda mitad de 2026).

La Fundación Ethereum ha delineado hitos estructurados de bifurcación con el objetivo de completar la infraestructura poscuántica central para aproximadamente 2029. Estos son objetivos de planificación, no compromisos garantizados.

<ButtonLink variant="outline" href="/roadmap/future-proofing/quantum-resistance/">Más sobre la resistencia cuántica</ButtonLink>
## Un Ethereum más simple y eficiente {#simpler-more-efficient-ethereum}

La complejidad crea oportunidades para errores y vulnerabilidades. Parte de la hoja de ruta se centra en **simplificar Ethereum y eliminar la deuda técnica** para que el protocolo sea más fácil de mantener, auditar y analizar.

### Qué se ha entregado {#what-has-been-delivered}

Varias actualizaciones recientes han hecho que Ethereum sea más simple y eficiente:

- **[Pectra (mayo de 2025)](/roadmap/pectra/)**: Introdujo la EIP-7702, que permite a las cuentas de propiedad externa delegar temporalmente en el código de un contrato inteligente, un paso hacia la [abstracción de cuentas](/roadmap/account-abstraction/) completa. También agregó el precompilado BLS12-381 (EIP-2537), el manejo de depósitos en cadena (EIP-6110), el acceso al hash de bloques históricos en la EVM (EIP-2935) y aumentó el saldo efectivo máximo para los validadores (EIP-7251).
- **[Fusaka (diciembre de 2025)](/roadmap/fusaka/)**: Implementó PeerDAS (EIP-7594), un sistema de muestreo de disponibilidad de datos entre pares que distribuye la carga de trabajo de disponibilidad de datos a través de la red. También aumentó los parámetros de los blobs, expandiendo la capacidad de procesamiento de datos para los [rollups](/glossary/#rollups).
- **[Dencun (marzo de 2024)](/roadmap/dencun/)**: Introdujo las transacciones de blob (EIP-4844) para obtener datos de rollup más baratos y restringió `SELFDESTRUCT` (EIP-6780) para eliminar una fuente de complejidad de larga data.
- **[London (agosto de 2021)](/ethereum-forks/#london)**: Reformó los precios del [gas](/glossary/#gas) con la EIP-1559, introduciendo una tarifa base y un mecanismo para quemar con el fin de lograr costos de transacción más predecibles.

### Qué está en progreso {#what-is-in-progress}

- **[Glamsterdam (planeada para la primera mitad de 2026)](/roadmap/glamsterdam/)**: Se está considerando para su inclusión: la separación proponente-constructor (PBS) consagrada (EIP-7732), listas de acceso a nivel de bloque (EIP-7928) y la reevaluación de precios del gas para alinear mejor los costos con el uso real de los recursos.
- **Hegotá (planeada para la segunda mitad de 2026)**: Se está considerando para su inclusión: los [árboles Verkle](/roadmap/verkle-trees/), reemplazando la estructura de datos actual por una más eficiente que permite clientes sin estado. También está contemplada la EIP-8141 (abstracción de cuentas nativa).
- **En curso**: Los esfuerzos para simplificar la [EVM](/developers/docs/evm/), armonizar las implementaciones de clientes y eliminar gradualmente las funciones obsoletas continúan en toda la comunidad de desarrollo de Ethereum.

## Progreso actual {#current-progress}

A principios de 2026:

**Simplificación y eficiencia**: Pectra y Fusaka aportaron mejoras reales en la flexibilidad de las cuentas, la disponibilidad de datos y las operaciones de los validadores. Glamsterdam y Hegotá están en desarrollo activo con objetivos claros para hacer que la red sea más resiliente y eficiente, al tiempo que se eliminan las dependencias externas.

**Criptografía poscuántica**: La investigación activa y la implementación temprana están en marcha. El ecosistema ha financiado premios de investigación y ejecuta redes de desarrollo (devnets) de interoperabilidad semanales en múltiples clientes, además de la investigación realizada por el equipo Poscuántico dedicado de la Fundación Ethereum. Si bien los hitos estructurados de bifurcación apuntan a aproximadamente 2029 para su finalización, la investigación temprana está produciendo puntos de prueba tangibles que demuestran que la ejecución poscuántica es viable hoy en día.

**Abstracción de cuentas y agilidad de firmas**: La EIP-7702 se lanzó en Pectra. La EIP-8141, que se está considerando para Hegotá, permitirá a las cuentas usar cualquier esquema de firma, brindando a los usuarios un camino para adoptar firmas seguras contra ataques cuánticos antes de que se complete la transición total del protocolo.

Ninguna parte de este trabajo está terminada. Los plazos son objetivos, no garantías. Pero el alcance y el ritmo del desarrollo activo representan un claro compromiso para mantener a Ethereum seguro y eficiente a largo plazo.

**Lecturas adicionales**

- [Criptografía poscuántica en Ethereum](/roadmap/future-proofing/quantum-resistance/)
- [strawmap.org](https://strawmap.org/) - _Arquitectura de la EF_
- [pq.ethereum.org](https://pq.ethereum.org)
- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Estructuras de datos](/developers/docs/data-structures-and-encoding/)
