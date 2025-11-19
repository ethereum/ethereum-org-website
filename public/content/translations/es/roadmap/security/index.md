---
title: Un Ethereum más seguro
description: Ethereum es la plataforma de contratos inteligentes más segura y descentralizada que existe. Sin embargo, todavía se pueden hacer mejoras para que Ethereum siga resistiendo a cualquier tipo de ataque en el futuro.
lang: es
image: /images/roadmap/roadmap-security.png
alt: "Hoja de ruta de Ethereum"
template: roadmap
---

**Ethereum ya es una plataforma de [contratos inteligentes](/glossary/#smart-contract) muy segura** y descentralizada. Sin embargo, aún pueden implementarse mejoras para que Ethereum siga siendo resistente a todo tipo de ataques en el futuro. Esto incluye cambios sutiles en la forma en que los [clientes de Ethereum](/glossary/#consensus-client) gestionan bloques [competidores](/glossary/#block), así como también el aumento de la velocidad con la que la red considera los bloques como ["finalizados"](/developers/docs/consensus-mechanisms/pos/#finality) (es decir, que no pueden modificarse sin pérdidas económicas extremas para un atacante).

También hay mejoras que dificultan mucho más la censura de transacciones al hacer que los proponentes de bloques desconozcan el contenido real de sus bloques, y nuevos métodos para identificar cuándo un cliente está censurando. En conjunto, estas mejoras actualizarán el protocolo de [prueba de participación](/glossary/#pos) para que los usuarios, desde individuos hasta empresas, tengan confianza instantánea en sus aplicaciones, datos y activos en Ethereum.

## Retiros de staking {#staking-withdrawals}

La actualización de [prueba de trabajo](/glossary/#pow) a prueba de participación comenzó con los pioneros de Ethereum "stakeando" su ETH en un contrato de depósito. Ese ETH se utiliza para proteger la red. Ha habido una segunda actualización el 12 de abril de 2023 para permitir la retirada del ETH apostado. Desde entonces, los validadores pueden participar o retirar libremente ETH.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Leer sobre los retiros</ButtonLink>

## Defendiendo contra ataques {#defending-against-attacks}

Hay mejoras que se pueden hacer en el protocolo de prueba de participación de Ethereum. Una de ellas se conoce como [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739), un algoritmo de elección de [bifurcación](/glossary/#fork) más seguro que dificulta ciertos tipos sofisticados de ataque.

Reducir el tiempo que Ethereum tarda en [finalizar](/glossary/#finality) los bloques proporcionaría una mejor experiencia para el usuario y evitaría ataques sofisticados de "reorganización" ("reorg") en los que los atacantes intentan reordenar bloques muy recientes para obtener ganancias o censurar determinadas transacciones. [**Finalización por único intervalo (SSF)**](/roadmap/single-slot-finality/) es una **forma de minimizar el retraso en la finalización**. En la actualidad hay 15 minutos de bloques que, en teoría, un atacante podría convencer a otros validadores de que reconfiguren. Con SSF, hay 0. Los usuarios, desde individuos hasta aplicaciones e intercambios, se benefician de una rápida garantía de que sus transacciones no se revertirán, y la red se beneficia al acabar con toda clase de ataques.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Leer sobre la finalización por único intervalo</ButtonLink>

## Defendiendo contra la censura {#defending-against-censorship}

La descentralización evita que individuos o pequeños grupos de [validadores](/glossary/#validator) sean demasiado influyentes. Las nuevas tecnologías de participación pueden ayudar a garantizar que los validadores de Ethereum se mantengan lo más descentralizados posible, al tiempo que los defienden contra fallos de hardware, software y red. Esto incluye software que distribuye las responsabilidades del validador entre múltiples [nodos](/glossary/#node). Esto se conoce como **tecnología de validador distribuido (DVT)**. Los [pools de staking](/glossary/#staking-pool) están incentivados a usar DVT porque permite que varias computadoras participen colectivamente en la validación, agregando redundancia y tolerancia a fallos. También divide las claves del validador en varios sistemas, en lugar de tener operadores individuales que ejecuten múltiples validadores. Esto hace que a los operadores deshonestos les resulte más difícil coordinar los ataques a Ethereum. En general, la idea es obtener beneficios de seguridad al ejecutar validadores como _comunidades_ y no como individuos.

<ButtonLink variant="outline-color" href="/staking/dvt/">Leer sobre la tecnología de validador distribuido</ButtonLink>

Implementar la **separación de proponentes y constructores (PBS)** mejorará drásticamente las defensas internas de Ethereum contra la censura. PBS permite a un validador crear un bloque y a otro transmitirlo a través de la red Ethereum. Esto asegura que las ganancias de los algoritmos profesionales de construcción de bloques que maximizan beneficios se compartan de manera más justa en toda la red, **evitando que el stake se concentre** en validadores institucionales de alto rendimiento con el tiempo. El proponente de bloques puede seleccionar el bloque más rentable que le ofrece un mercado de constructores de bloques. Para censurar, un proponente de bloque a menudo tendría que elegir un bloque menos rentable, lo cual sería **irracional económicamente y también obvio para el resto de los validadores** en la red.

Hay posibles complementos para PBS, como transacciones cifradas y listas de inclusión, que podrían mejorar aún más la resistencia a la censura de Ethereum. Esto hace que el constructor de bloques y el proponente no vean las transacciones reales incluidas en sus bloques.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Leer sobre la separación de proponentes y constructores</ButtonLink>

## Protegiendo a los validadores {#protecting-validators}

Es posible que un atacante sofisticado pueda identificar los próximos validadores y bombardearlos para impedir que propongan bloques; esto se conoce como un ataque de **denegación de servicio (DoS)**. Implementar [**elección secreta de líder (SLE)**](/roadmap/secret-leader-election) protegerá contra este tipo de ataques al evitar que los proponentes de bloques sean identificables con anticipación. Esto funciona mezclando continuamente un conjunto de compromisos criptográficos que representan a los proponentes de bloques candidatos y utilizando su orden para determinar qué validador se selecciona, de tal manera que solo los propios validadores conozcan su pedido por adelantado.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Leer sobre la elección secreta de líder</ButtonLink>

## Progreso actual {#current-progress}

**Las mejoras de seguridad en la hoja de ruta están en etapas avanzadas de investigación**, pero no se espera que se implementen en breve. Los siguientes pasos para view-merge, PBS, SSF y SLE consisten en finalizar una especificación y comenzar a construir prototipos.
