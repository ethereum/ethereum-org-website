---
title: Un Ethereum más seguro
description: Ethereum es la plataforma de contratos inteligentes más segura y descentralizada que existe. Sin embargo, todavía se pueden hacer mejoras para que Ethereum siga resistiendo a cualquier tipo de ataque en el futuro.
lang: es
image: /images/roadmap/roadmap-security.png
alt: "Hoja de ruta de Ethereum"
template: roadmap
---

Ethereum ya es una plataforma de contratos inteligentes muy segura y descentralizada. Sin embargo, todavía se pueden hacer mejoras para que Ethereum siga resistiendo a cualquier tipo de ataque en el futuro. Esto incluye cambios sutiles en la forma en que los clientes de Ethereum gestionan los bloques en conflicto, así como aumentar la velocidad a la que la red considera que los bloques están ["finalizados"](/developers/docs/consensus-mechanisms/pos/#finality) (lo que significa que no pueden cambiarse sin pérdidas económicas extremas para un atacante).

También hay mejoras que dificultan mucho más la censura de transacciones al hacer que los proponentes de bloques desconozcan el contenido real de sus bloques, y nuevos métodos para identificar cuándo un cliente está censurando. Juntas, estas mejoras actualizarán el protocolo de la prueba de participación, de manera que los usuarios, desde individuos hasta corporaciones, tengan confianza instantánea en sus aplicaciones, datos y activos en Ethereum.

## Retiradas de participaciones {#staking-withdrawals}

La actualización de prueba de trabajo a prueba de participación comenzó con los pioneros de Ethereum apostando su ETH en un contrato de depósito. Ese ETH se usó para proteger la red. Sin embargo, ese ETH no se puede desbloquear y devolver a los usuarios. Permitir la retirada de ETH es una parte crítica de la mejora de la prueba de participación. Además de que las retiradas son un componente crítico de un protocolo de prueba de participación completamente funcional, permitir las retiradas también es beneficioso para la seguridad de Ethereum, ya que permite a los participantes usar sus recompensas de ETH para otros fines que no sea la participación. Esto significa que los usuarios que desean liquidez no tienen que depender de los derivados de participación líquida (LSD) que pueden ser una fuerza centralizadora en Ethereum. Está previsto que se complete esta actualización el 12 de abril de 2023.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Descubra más cosas sobre las retiradas.</ButtonLink>

## Defenderse contra ataques {#defending-against-attacks}

Incluso después de las retiradas, hay mejoras que se pueden hacer en el protocolo [de prueba de participación](/developers/docs/consensus-mechanisms/pos/) de Ethereum. Uno se lo conoce como [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739): un algoritmo de elección de bifurcación más seguro que dificulta ciertos ataques sofisticados.

Reducir el tiempo que Ethereum tarda en finalizar bloques podría proveer una mejor experiencia de usuario y evitar ataques sofisticados «reorg», en los que los atacantes intentan reordenar bloques muy recientes para obtener beneficios o para censurar ciertas transacciones. [**Finalidad de ranura única (SSF)**](/roadmap/single-slot-finality/) es una forma de minimizar el retraso de finalización. En la actualidad hay 15 minutos de bloques en los que un atacante puede, en teoría, convencer a los otros validadores para reconfigurar. Con SSF, hay 0. Los usuarios, desde individuos hasta aplicaciones e intercambios, se benefician de una rápida garantía de que sus transacciones no se revertirán y de que la red se beneficia al cerrar toda una categoría de ataques.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Más información sobre la finalidad de ranura única.</ButtonLink>

## Defenderse contra la censura {#defending-against-censorship}

La descentralización evita que los individuos o pequeños grupos de validadores se vuelvan demasiado influyentes. Las nuevas tecnologías de participación pueden ayudar a garantizar que los validadores de Ethereum se mantengan lo más descentralizados posible, al tiempo que los defienden contra fallos de hardware, software y red. Esto incluye el software que comparte las responsabilidades del validador a través de múltiples nodos. Esto se conoce como **tecnología de validador distribuido (DVT)**. Las participaciones agrupadas tienen incentivos a usar DVT, porque permite que múltiples ordenadores participen colectivamente en la validación, añadiendo redundancia y tolerancia a fallos. También divide las claves del validador en varios sistemas, en lugar de tener operadores individuales que ejecuten múltiples validadores. Esto hace que a los operadores deshonestos les resulte más difícil coordinar los ataques a Ethereum. En conjunto, la idea es obtener beneficios de seguridad ejecutando validadores como _comunidades_ en lugar de como individuos.

<ButtonLink variant="outline-color" href="/staking/dvt/">Lea acerca de la tecnología de validación distribuida</ButtonLink>

La implementación de la **separación proponente-constructor (PBS)** mejorará drásticamente la defensa integrada de Ethereum contra la censura. PBS permite a un validador crear un bloque y a otro transmitirlo a través de la red Ethereum. Esto asegura que las ganancias de los algoritmos de maximización de ganancias profesionales de construcción de bloques se compartan de manera más justa en toda la red, **evitando que la participación se concentre** con los participantes institucionales de mejor rendimiento a lo largo del tiempo. El proponente de bloques puede seleccionar el bloque más rentable que le ofrece un mercado de constructores de bloques. Para censurar, un proponente de bloques a menudo tendría que elegir un bloque menos rentable, que sería **económicamente irracional y también obvio para el resto de los validadores** en la red.

Hay posibles complementos para PBS, como transacciones cifradas y listas de inclusión, que podrían mejorar aún más la resistencia a la censura de Ethereum. Esto hace que el constructor de bloques y el proponente no vean las transacciones reales incluidas en sus bloques.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Más información acerca de la separación entre proponentes y constructores.</ButtonLink>

## Proteger a los validadores {#protecting-validators}

Es posible que un atacante sofisticado pueda identificar a los próximos validadores y enviarles correo basura para evitar que propongan bloques; esto se conoce como un ataque de **denegación de servicio (DoS)**. La implementación de [**elección de líder secreto (SLE)**](/roadmap/secret-leader-election) protegerá contra este tipo de ataque al evitar que los proponentes de bloques sean conocidos de antemano. Esto funciona mezclando continuamente un conjunto de compromisos criptográficos que representan a los proponentes de bloques candidatos y utilizando su orden para determinar qué validador se selecciona, de tal manera que solo los propios validadores conozcan su pedido por adelantado.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Más información acerca de la elección del líder secreto.</ButtonLink>

## Progreso actual {#current-progress}

Las actualizaciones de seguridad en la hoja de ruta se encuentran en etapas avanzadas de investigación, aunque no se espera que se implementen aún próximamente. Los siguientes pasos para view-merge, PBS, SSF y SLE consisten en finalizar una especificación y comenzar a construir prototipos.
