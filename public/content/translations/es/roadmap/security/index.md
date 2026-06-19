---
title: Un Ethereum más seguro
description: Ethereum es la plataforma de contratos inteligentes más segura y descentralizada que existe. Sin embargo, aún se pueden realizar mejoras para que Ethereum siga siendo resistente a cualquier nivel de ataque en el futuro.
lang: es
image: /images/roadmap/roadmap-security.png
alt: "Hoja de ruta de Ethereum"
template: roadmap
---

**Ethereum ya es una plataforma muy segura** y descentralizada de [contratos inteligentes](/glossary/#smart-contract). Sin embargo, aún se pueden realizar mejoras para que Ethereum siga siendo resistente a todo tipo de ataques en el futuro. Estas incluyen cambios sutiles en la forma en que los [clientes de Ethereum](/glossary/#consensus-client) manejan los [bloques](/glossary/#block) en competencia, así como el aumento de la velocidad a la que la red considera que los bloques están ["finalizados"](/developers/docs/consensus-mechanisms/pos/#finality) (lo que significa que no se pueden cambiar sin pérdidas económicas extremas para un atacante).

También hay mejoras que hacen que la censura de transacciones sea mucho más difícil al hacer que los proponentes de bloques no puedan ver el contenido real de sus bloques, y nuevas formas de identificar cuándo un cliente está censurando. En conjunto, estas mejoras actualizarán el protocolo de [prueba de participación (PoS)](/glossary/#pos) para que los usuarios, desde individuos hasta corporaciones, tengan confianza instantánea en sus aplicaciones, datos y activos en Ethereum.

## Retiros de staking {#staking-withdrawals}

La actualización de [prueba de trabajo (PoW)](/glossary/#pow) a prueba de participación (PoS) comenzó con los pioneros de Ethereum haciendo "staking" de su ETH en un contrato de depósito. Ese ETH se utiliza para proteger la red. Hubo una segunda actualización el 12 de abril de 2023 para permitir a los validadores retirar el ETH en staking. Desde entonces, los validadores pueden hacer staking o retirar ETH libremente.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Leer sobre los retiros</ButtonLink>

## Defensa contra ataques {#defending-against-attacks}

Se pueden realizar mejoras en el protocolo de prueba de participación de Ethereum. Una de ellas se conoce como [fusión de vistas (view-merge)](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739): un algoritmo de elección de [bifurcación](/glossary/#fork) más seguro que dificulta ciertos tipos de ataques sofisticados.

Reducir el tiempo que tarda Ethereum en [finalizar](/glossary/#finality) los bloques proporcionaría una mejor experiencia de usuario y evitaría ataques sofisticados de "reorganización" en los que los atacantes intentan reordenar bloques muy recientes para extraer ganancias o censurar ciertas transacciones. La [**finalidad de un solo slot (SSF)**](/roadmap/single-slot-finality/) es una **forma de minimizar el retraso de finalización**. En este momento, hay 15 minutos de bloques que un atacante teóricamente podría convencer a otros validadores de reconfigurar. Con SSF, hay 0. Los usuarios, desde individuos hasta aplicaciones y exchanges, se benefician de la rápida garantía de que sus transacciones no se revertirán, y la red se beneficia al neutralizar toda una clase de ataques.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Leer sobre la finalidad de un solo slot</ButtonLink>

## Defensa contra la censura {#defending-against-censorship}

La descentralización evita que individuos o pequeños grupos de [validadores](/glossary/#validator) se vuelvan demasiado influyentes. Las nuevas tecnologías de staking pueden ayudar a garantizar que los validadores de Ethereum se mantengan lo más descentralizados posible, al mismo tiempo que los defienden contra fallas de hardware, software y de la red. Esto incluye software que comparte las responsabilidades del validador a través de múltiples [nodos](/glossary/#node). Esto se conoce como **tecnología de validador distribuido (DVT)**. Los [fondos de staking](/glossary/#staking-pool) tienen incentivos para usar DVT porque permite que varias computadoras participen colectivamente en la validación, lo que agrega redundancia y tolerancia a fallas. También divide las claves de los validadores en varios sistemas, en lugar de tener operadores individuales ejecutando múltiples validadores. Esto hace que sea más difícil para los operadores deshonestos coordinar ataques en Ethereum. En general, la idea es obtener beneficios de seguridad al ejecutar validadores como _comunidades_ en lugar de como individuos.

<ButtonLink variant="outline-color" href="/staking/dvt/">Leer sobre la tecnología de validador distribuido</ButtonLink>

La implementación de la **separación proponente-constructor (PBS)** mejorará drásticamente las defensas integradas de Ethereum contra la censura. La PBS permite que un validador cree un bloque y otro lo transmita a través de la red Ethereum. Esto garantiza que las ganancias de los algoritmos profesionales de construcción de bloques que maximizan los beneficios se compartan de manera más justa en toda la red, **evitando que la participación se concentre** en los participantes institucionales con mejor rendimiento a lo largo del tiempo. El proponente de bloque puede seleccionar el bloque más rentable que le ofrezca un mercado de constructores de bloques. Para censurar, un proponente de bloque a menudo tendría que elegir un bloque menos rentable, lo que sería **económicamente irracional y también obvio para el resto de los validadores** de la red.

Existen posibles complementos para la PBS, como transacciones cifradas y listas de inclusión, que podrían mejorar aún más la resistencia a la censura de Ethereum. Estos hacen que el constructor y el proponente de bloques no puedan ver las transacciones reales incluidas en sus bloques.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Leer sobre la separación proponente-constructor</ButtonLink>

## Protección de los validadores {#protecting-validators}

Es posible que un atacante sofisticado pueda identificar a los próximos validadores y enviarles spam para evitar que propongan bloques; esto se conoce como un ataque de **denegación de servicio (DoS)**. La implementación de la [**elección secreta de líder (SLE)**](/roadmap/secret-leader-election) protegerá contra este tipo de ataque al evitar que los proponentes de bloques se puedan conocer de antemano. Esto funciona mezclando continuamente un conjunto de compromisos criptográficos que representan a los candidatos a proponentes de bloques y utilizando su orden para determinar qué validador es seleccionado, de tal manera que solo los propios validadores conocen su orden de antemano.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Leer sobre la elección secreta de líder</ButtonLink>

## Progreso actual {#current-progress}

**Las actualizaciones de seguridad en la hoja de ruta se encuentran en etapas avanzadas de investigación**, pero no se espera que se implementen por un tiempo. Los próximos pasos para la fusión de vistas (view-merge), PBS, SSF y SLE son finalizar una especificación y comenzar a construir prototipos.