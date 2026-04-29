---
title: "Comprender los mecanismos de consenso de la cadena de bloques"
description: "Una explicación que cubre los mecanismos de consenso principales utilizados en las cadenas de bloques, y cómo permiten a las redes descentralizadas acordar el estado de las transacciones sin una autoridad central."
lang: es
youtubeId: "ojxfbN78WFQ"
uploadDate: 2018-11-29
duration: "0:09:33"
educationLevel: beginner
topic:
  - "consenso"
  - "cadena de bloques"
format: explainer
author: Tech in Asia
breadcrumb: "Mecanismos de consenso"
---

Una explicación de **Tech in Asia** que cubre los tres principales mecanismos de consenso utilizados en los sistemas de cadena de bloques: prueba de trabajo (PoW), prueba de participación (PoS) y prueba de autoridad (PoA), y cómo permiten a las redes descentralizadas acordar el estado de las transacciones.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=ojxfbN78WFQ) publicada por Tech in Asia. Ha sido ligeramente editada para facilitar su lectura.*

#### ¿Qué son los mecanismos de consenso? (0:00) {#what-are-consensus-mechanisms-000}

Cadena de bloques: la palabra de moda de 2018. Pero, ¿sabe cómo toma decisiones un sistema descentralizado entre pares sin una figura de autoridad? La respuesta se encuentra en los mecanismos de consenso. Existen varios mecanismos de consenso, pero todos tienen el mismo propósito: garantizar que los registros sean verdaderos y honestos. La diferencia radica en la forma en que se alcanza el consenso. Aquí exploraremos tres tipos de mecanismos de consenso.

#### Prueba de trabajo (PoW) (0:23) {#proof-of-work-023}

En un sistema de prueba de trabajo (PoW), los datos de la transacción se almacenan en bloques, validados al hacer que las personas resuelvan un problema matemático complicado adjunto a él. Esto generalmente lo hacen computadoras potentes y se conoce como "minería". Se emite una recompensa en forma de criptomoneda al primer minero que resuelve el problema.

Imagine a un grupo de cazadores de tesoros intentando abrir un cofre con un candado complicado. Averiguar la combinación correcta es tedioso, pero la primera persona en hacerlo recibe una recompensa. En pocas palabras, la prueba de trabajo (PoW) es una carrera para descubrir la combinación correcta de un cofre del tesoro. Criptomonedas como Bitcoin y Ethereum utilizan un mecanismo de prueba de trabajo (PoW).

#### Prueba de participación (PoS) (1:04) {#proof-of-stake-104}

A continuación, tenemos la prueba de participación (PoS). Aquí, el creador de un nuevo bloque, también conocido como validador, se elige al azar en función de la cantidad de participación que compromete con la red. Cuanto mayor sea la participación depositada, mayor será la probabilidad de ser seleccionado como validador.

Apliquemos esto al escenario del cofre del tesoro. Imagine a un grupo de cazadores de tesoros compitiendo por un cofre. El cofre se recompensa mediante un sistema de lotería. Para participar, cada cazador debe comprar boletos de lotería. Cuantos más compre cada cazador, mayor será la probabilidad de ganar. Protocolos de cadena de bloques como Ouroboros de Cardano y EOS adoptan el consenso de prueba de participación (PoS).

#### Prueba de autoridad (PoA) (1:42) {#proof-of-authority-142}

Por último, la prueba de autoridad (PoA): una forma modificada de la prueba de participación (PoS). Aquí, solo las partes aprobadas seleccionadas en función de su reputación pueden convertirse en validadores.

Volvamos al escenario del cofre del tesoro. El grupo de cazadores de tesoros forma un sindicato y junta sus tesoros. Según su nivel de confiabilidad, el grupo designa a unos pocos elegidos para garantizar la validez del contenido del cofre. Hyperledger Fabric de IBM y la red de prueba Kovan de Ethereum son algunos ejemplos de sistemas de cadena de bloques que utilizan la prueba de autoridad (PoA).

#### Modelos de consenso híbridos (2:14) {#hybrid-consensus-models-214}

Mientras que las empresas tradicionales de cadena de bloques existen en un solo mecanismo de consenso, algunas innovadoras están adoptando múltiples protocolos de consenso. Tomemos como ejemplo a la Fundación Opet, que está construyendo una cadena de bloques única para almacenar los datos recopilados en su aplicación de chatbot de acompañamiento de matrícula mediante la aplicación de protocolos tanto de prueba de autoridad (PoA) como de prueba de trabajo (PoW).

Datos como los registros académicos, extracurriculares y de perfiles de personalidad de los estudiantes se almacenan en la cadena de bloques y se validan potencialmente a través de un marco de prueba de autoridad (PoA) impulsado por Hyperledger Fabric. Los validadores, en este caso, son instituciones educativas de renombre o incluso registradores nacionales y sus respectivos ministerios de educación. Esto ayuda a garantizar que todos los datos de los estudiantes sean confiables.

Pero, ¿quién trabajará gratis? El consenso de prueba de trabajo (PoW) entra en juego para dar una recompensa a los validadores que han realizado el trabajo.

#### Privacidad y datos de los estudiantes (3:02) {#privacy-and-student-data-302}

Con Hyperledger Fabric, cada registro de estudiante está protegido con una clave hash privada propiedad del estudiante. Solo se puede acceder a los datos cuando el estudiante proporciona la clave única. Esto significa que la privacidad del estudiante es preservada y controlada por el propio estudiante.

Por ejemplo, cuando los estudiantes solicitan ingreso a la universidad a través de la plataforma de Opet, proporcionan la clave única de sus registros a la universidad. Con eso, la universidad puede acceder a sus últimos registros académicos. Los estudiantes también podrán ver si sus registros han sido desbloqueados o al menos considerados para la solicitud. Esto aumenta la eficiencia y la transparencia en comparación con los métodos tradicionales.

#### Cierre (3:37) {#closing-337}

Al combinar los modelos de prueba de trabajo (PoW) y prueba de autoridad (PoA), la solución de cadena de bloques de la Fundación Opet garantiza la privacidad de los datos de los estudiantes al tiempo que incentiva tanto a las instituciones educativas como a los estudiantes cuando contribuyen a la plataforma. Con las cadenas de bloques ganando popularidad, es solo cuestión de tiempo antes de que veamos la creación de sistemas híbridos aún más únicos.