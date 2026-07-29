---
title: Un Ethereum más seguro
description: La hoja de ruta de Ethereum refuerza la producción de bloques y la resistencia a la censura hoy en día, al tiempo que prepara el protocolo para la era cuántica y décadas de funcionamiento confiable.
lang: es
image: /images/roadmap/roadmap-security.png
alt: "Hoja de ruta de Ethereum"
template: roadmap
summaryPoints:
  - Las actualizaciones de refuerzo a corto plazo, como la separación proponente-constructor consagrada y las listas de inclusión, están en desarrollo activo
  - La preparación poscuántica está en marcha años antes de cualquier amenaza cuántica creíble
  - La simplificación del protocolo elimina la complejidad y reduce la superficie de ataque de Ethereum
---

Ethereum ya es una plataforma de [contratos inteligentes](/glossary/#smart-contract) muy segura y descentralizada. La hoja de ruta tiene como objetivo mantenerlo así durante décadas al **reforzar la red hoy en día mientras se prepara para amenazas que podrían aparecer solo dentro de unos años**. Las actualizaciones a corto plazo se rastrean en [forkcast.org](https://forkcast.org), y el borrador de la hoja de ruta a más largo plazo se publica en [strawmap.org](https://strawmap.org).

<ExpandableCard title="¿Es seguro Ethereum hoy?" eventCategory="/roadmap/security" eventName="clicked is ethereum secure today?">

Sí. Ethereum ha funcionado continuamente desde 2015 sin tiempo de inactividad. Las mejoras en esta página hacen que una red que ya es segura sea más difícil de atacar, censurar o interrumpir.

</ExpandableCard>

## Construcción de bloques sin necesidad de confianza {#trustless-block-building}

La mayoría de los bloques de Ethereum en la actualidad se ensamblan a través de una división del trabajo: constructores especializados construyen el bloque más valioso que pueden, y el [validador](/glossary/#validator) al que le toca el turno propone la mejor oferta. Esto evita que la construcción profesional de bloques concentre la [participación](/glossary/#staking) entre los operadores más grandes, pero desde 2022 ha dependido de software fuera del protocolo que la red no puede verificar.

La **separación proponente-constructor consagrada (ePBS, o EIP-7732)** traslada esta división al protocolo, eliminando la necesidad de confiar en los retransmisores (relays), los intermediarios externos que actualmente pasan los bloques entre los constructores y los validadores. ePBS es una de las características principales de la próxima actualización [Glamsterdam](/roadmap/glamsterdam/), prevista para 2026. No se ha establecido una fecha para la Red principal; los equipos de clientes la están probando en devnets (redes de prueba temporales).

<ButtonLink variant="outline" href="/roadmap/pbs/">Más sobre la separación proponente-constructor</ButtonLink>

## Resistencia a la censura {#censorship-resistance}

Una red resistente a la censura significa que nadie puede impedir que una transacción válida llegue a la cadena. Las **listas de inclusión aplicadas por elección de bifurcación (FOCIL, o EIP-7805)** dan a muchos validadores voz y voto sobre lo que debe incluir un bloque: publican listas de transacciones pendientes que el constructor de bloques está obligado a incluir. Ningún actor individual puede dejar fuera su transacción discretamente.

FOCIL es la característica principal de la capa de consenso de Hegotá, la actualización que sigue a Glamsterdam y está prevista para 2027. Se programó deliberadamente después de Glamsterdam para que ePBS y FOCIL nunca se lancen como una combinación no probada. Continúa la investigación sobre las mempools cifradas, que ocultarían el contenido de las transacciones en espera hasta que se incluyan de forma segura en un bloque.

## Finalidad más rápida {#faster-finality}

Para los usuarios, la [finalidad](/glossary/#finality) es el momento en que una transacción se vuelve permanente, cuando revertirla le costaría a un atacante una enorme cantidad de ETH en staking. Hoy en día, la finalidad tarda unos 15 minutos, y **los investigadores quieren reducir ese tiempo drásticamente**. El trabajo comenzó como finalidad de un solo slot, evolucionó a finalidad de tres slots y ahora continúa como Minimmit, un protocolo de consenso de una sola ronda en el programa Lean Ethereum presentado en julio de 2025. La finalidad en segundos es un objetivo a largo plazo en el borrador de la hoja de ruta, apuntando aproximadamente a 2029. Esto sigue siendo una investigación activa, y aún no se ha asignado ninguna actualización de finalidad a una bifurcación.

<ButtonLink variant="outline" href="/roadmap/single-slot-finality/">Más sobre la investigación de finalidad más rápida</ButtonLink>

## Validadores resilientes {#resilient-validators}

Un validador suele ser una máquina que contiene una clave de firma. La **tecnología de validador distribuido (DVT)** reemplaza esa única máquina con un comité de máquinas que comparten la clave y firman juntas, por lo que si una computadora falla o se roba una clave, el validador no se cae. DVT está en vivo en producción y es utilizado por operadores de staking a gran escala. En enero de 2026, Vitalik Buterin propuso una variante simplificada a nivel de protocolo llamada DVT-lite; es una propuesta temprana sin una bifurcación programada.

La red también se protege a sí misma a través de la [diversidad de clientes](/developers/docs/nodes-and-clients/client-diversity/): Ethereum se ejecuta en varias implementaciones de software construidas de forma independiente, por lo que un error en un cliente deja al resto de la red en pie.

Dos ideas de investigación anteriores, view-merge y la elección secreta de líder, ya no son elementos activos de la hoja de ruta.

<ButtonLink variant="outline" href="/staking/dvt/">Más sobre la tecnología de validador distribuido</ButtonLink>

## Resistencia cuántica {#quantum-resistance}

Ethereum utiliza la [criptografía](/glossary/#cryptography) para mantener la red segura y proteger los fondos de los usuarios. Con el tiempo, algunos de estos métodos criptográficos serán **vulnerables a las computadoras cuánticas**, que pueden resolver problemas matemáticos específicos exponencialmente más rápido que las máquinas clásicas.

**Ninguna computadora cuántica puede romper la criptografía de Ethereum hoy en día.** El hardware requerido aún no existe a gran escala. Pero investigaciones recientes sugieren que la brecha se está cerrando más rápido de lo esperado. En marzo de 2026, Google Quantum AI publicó un artículo estimando que romper la criptografía de curva elíptica de 256 bits (el tipo que Ethereum usa para las firmas de cuentas) podría requerir aproximadamente 1,200 cúbits lógicos, unas 20 veces menos que las estimaciones anteriores.

Las transiciones criptográficas tardan años en planificarse y ejecutarse de forma segura, por lo que la preparación se está llevando a cabo ahora, mucho antes de que exista el hardware. Se han identificado cuatro áreas que requieren actualizaciones poscuánticas: firmas de consenso de validadores (BLS), los esquemas de compromiso utilizados para la disponibilidad de datos (KZG), firmas de cuentas (ECDSA) y los sistemas de pruebas de conocimiento cero utilizados por los [rollups](/glossary/#rollups).

La Fundación Ethereum formó un **equipo de Seguridad Poscuántica** dedicado en enero de 2026, y su trabajo se rastrea públicamente en [pq.ethereum.org](https://pq.ethereum.org). El trabajo activo incluye firmas de validadores basadas en hash (leanXMSS) combinadas con una zkVM mínima (leanVM) que agrega las firmas más grandes seguras contra la computación cuántica de manera eficiente, y devnets de interoperabilidad semanales con más de 10 equipos de clientes.

Una parte clave de la estrategia de transición es **EIP-8141**, que introduce la [abstracción de cuentas](/roadmap/account-abstraction/) nativa. Esto permite a las cuentas individuales elegir su propia verificación de firma, lo que significa que los usuarios podrían cambiar a firmas seguras contra la computación cuántica sin esperar una única migración en todo el protocolo. EIP-8141 se está considerando para la actualización Hegotá. Los hitos de la infraestructura poscuántica central apuntan a completarse aproximadamente para 2029. Estos son objetivos de planificación y pueden cambiar.

<ExpandableCard title="¿Pueden las computadoras cuánticas robar mi ETH hoy?" eventCategory="/roadmap/security" eventName="clicked can quantum computers steal my ETH today?">

No. Ninguna computadora cuántica actual puede romper la criptografía de Ethereum. El trabajo descrito en esta página es una preparación temprana para una amenaza que aún está a años de distancia. Cuando las billeteras poscuánticas estén disponibles, el software de la billetera lo guiará a través de la migración. Por ahora, no hay nada que deba hacer.

</ExpandableCard>

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">Más sobre la resistencia cuántica</ButtonLink>

## Protocolo más simple y eficiente {#simpler-and-more-efficient-protocol}

La complejidad crea oportunidades para errores y vulnerabilidades. Parte de la hoja de ruta se centra en **simplificar Ethereum y eliminar la deuda técnica** para que el protocolo sea más fácil de mantener, auditar y analizar. Un protocolo más simple también ofrece a los atacantes menos superficie para explorar.

Entregado hasta ahora:

- **[Pectra (mayo de 2025)](/roadmap/pectra/)**: Introdujo EIP-7702, que permite a las cuentas de propiedad externa delegar temporalmente en el código de un contrato inteligente, un paso hacia la abstracción de cuentas completa.
- **[Fusaka (diciembre de 2025)](/roadmap/fusaka/)**: Implementó PeerDAS (EIP-7594), que distribuye la carga de trabajo de disponibilidad de datos a través de la red. También aumentó los parámetros de los blobs, expandiendo la capacidad de procesamiento de datos para los rollups.
- **[Dencun (marzo de 2024)](/roadmap/dencun/)**: Introdujo transacciones de blobs (EIP-4844) para datos de rollup más baratos y restringió `SELFDESTRUCT` (EIP-6780) para eliminar una fuente de complejidad de larga data.
- **[Shapella (abril de 2023)](/staking/withdrawals/)**: Permitió a los validadores retirar ETH en staking (EIP-4895), eliminando una restricción inicial del staking de [prueba de participación](/glossary/#pos).
- **London (agosto de 2021)**: Revisó los precios del gas con EIP-1559, introduciendo una tarifa base y un mecanismo para quemar con el fin de lograr costos de transacción más predecibles.

En progreso:

- **Glamsterdam (prevista para 2026)**: Las características principales son ePBS (EIP-7732) y las listas de acceso a nivel de bloque (EIP-7928), y también se está considerando la revisión de precios del gas.
- **Hegotá (prevista para 2027)**: FOCIL (EIP-7805) es la característica principal de la capa de consenso. Se está considerando para su inclusión: EIP-8141 (abstracción de cuentas nativa).
- **En curso**: Los esfuerzos para simplificar la [EVM](/developers/docs/evm/), armonizar las implementaciones de clientes y eliminar gradualmente las funciones obsoletas continúan en todos los equipos de clientes. El trabajo sobre la ausencia de estado (permitir a los participantes verificar la cadena sin almacenar todos sus datos) se está rediseñando en torno a árboles hash binarios seguros contra la computación cuántica, y el enfoque final aún está por confirmarse.

## Progreso actual {#current-progress}

A mediados de 2026:

- **Construcción de bloques y resistencia a la censura**: ePBS y las listas de acceso a nivel de bloque se están ejecutando en las devnets de Glamsterdam. FOCIL está planeado para Hegotá, previsto para 2027.
- **Finalidad**: Minimmit y el trabajo más amplio de consenso de Lean Ethereum siguen en investigación activa sin asignación de bifurcación todavía.
- **Resistencia cuántica**: Se están ejecutando devnets de interoperabilidad poscuántica semanales, y los hitos de la infraestructura central apuntan aproximadamente a 2029.
- **Simplificación**: Pectra y Fusaka se lanzaron; Glamsterdam y Hegotá llevan la siguiente ronda de limpiezas.

Ninguna parte de este trabajo está terminada, y todos los plazos son estimaciones que pueden cambiar.

## Lecturas adicionales {#further-reading}

- [Forkcast: Rastreador de actualizaciones de la red Ethereum](https://forkcast.org)
- [Strawmap: un borrador de la hoja de ruta de la capa 1 (l1) de Ethereum](https://strawmap.org) - _EF Architecture_
- [Ethereum poscuántico](https://pq.ethereum.org) - _Fundación Ethereum_
- [Rastreador de la hoja de ruta de Lean Ethereum](https://leanroadmap.org) - _ReamLabs_
- [Prueba de participación y finalidad](/developers/docs/consensus-mechanisms/pos/#finality)
- [La EVM](/developers/docs/evm/)