---
title: "¿Qué incluye la actualización Pectra?"
description: "Christine Kim habla sobre la actualización Pectra de Ethereum, cubriendo las EIP incluidas en la actualización, qué cambian en el protocolo y por qué son importantes para usuarios, desarrolladores y validadores."
lang: es
youtubeId: "ufIDBCgdGwY"
uploadDate: 2024-11-14
duration: "0:20:46"
educationLevel: intermediate
topic:
  - "hoja de ruta"
  - "pectra"
  - "actualizaciones"
format: presentation
author: Ethereum Foundation
breadcrumb: "Descripción general de Pectra"
---

Una presentación de **Christine Kim** en Devcon SEA que cubre las EIP incluidas en la actualización Pectra de Ethereum, qué cambian en el protocolo, cuándo se espera la activación en la Red principal y qué EIP se eliminaron del alcance.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=ufIDBCgdGwY) publicada por la Fundación Ethereum. Ha sido ligeramente editada para facilitar su lectura.*

#### Introducción (0:00) {#introduction-000}

Vamos a hablar sobre todas las EIP que se incluirán en la actualización Pectra. Un breve descargo de responsabilidad antes de comenzar: todo lo que voy a decir es puramente informativo —con fines informativos— y no debe interpretarse como asesoramiento financiero o de inversión.

#### Cuándo llega Pectra a la Red principal (0:23) {#when-is-pectra-mainnet-023}

Antes de entrar en lo que incluye Pectra, la pregunta que más me hacen es "¿cuándo llegará Pectra a la Red principal?". Así que voy a responder eso primero para que podamos pasar a los aspectos técnicos.

Este es un análisis de cronograma muy provisional. Cuando la gente me pregunta cuándo ocurrirá Pectra, digo que es demasiado pronto para saberlo, porque es verdad. Pectra todavía se encuentra en las primeras etapas de su desarrollo. Las especificaciones están cambiando y el alcance de Pectra aún no se ha finalizado realmente.

A través de este proceso, una de las cosas que puedes aprender es cómo se desarrollan las actualizaciones, cómo se prueban y, finalmente, cómo llegan a la Red principal. Inicialmente, los desarrolladores deciden un par de EIP para incluir en una actualización, y luego implementan esas EIP en redes de prueba privadas enfocadas en desarrolladores llamadas redes de desarrollo (devnets). Los desarrolladores ya han lanzado un par de redes de desarrollo para Pectra, por lo que estas EIP ya han pasado por un par de rondas de implementación. Los desarrolladores han notado casos extremos y errores que quieren solucionar, e iteran sobre estas EIP lanzando nuevas redes de desarrollo. La red de desarrollo 4 se lanzó el mes pasado, en octubre.

Esto no suele suceder, pero los desarrolladores —muy especialmente para toda esta conferencia y para todos en la audiencia— lanzaron la primera red de prueba pública de Pectra este mes. Se llama Mekong, así que puedes ir e interactuar con algunas de las EIP que estarán en Pectra desde el principio. Se basa en las especificaciones de la red de desarrollo 4, pero ten en cuenta que esas especificaciones están cambiando.

Hay una lista de cambios en las especificaciones de las EIP que los desarrolladores ya quieren incluir en la red de desarrollo 5 de Pectra: cosas como el reajuste de precios del precompilado BLS y una nueva EIP que no se ha implementado en la red de desarrollo 4, pero que los desarrolladores pretenden implementar para la red de desarrollo 5 o una actualización futura. Así que las especificaciones de Pectra están cambiando. Preveo que aún faltan varias redes de desarrollo más antes de que las especificaciones puedan congelarse realmente.

La otra parte que es realmente importante para la actualización Pectra en su progreso hacia la Red principal es que se finalice el alcance: que se decidan todas las EIP que se incluirán en Pectra. Hay una EIP —en realidad aún no es una EIP— que es el aumento de la capacidad de blobs que los desarrolladores aún no han incluido formalmente en Pectra, pero parece probable que incluyan algún tipo de aumento en la capacidad de blobs porque recientemente han incluido una EIP que introduce un mecanismo para actualizar el objetivo de gas de los blobs y el máximo de gas de los blobs de forma dinámica a través de la capa de consenso, en lugar de tener esos parámetros codificados de forma rígida en la capa de ejecución y la capa de consenso.

Una vez que el alcance esté finalizado, se comienza a probar cualquier nueva EIP que se haya implementado —el alcance completo de la actualización Pectra— y se somete a pruebas rigurosas en un par de redes de desarrollo más. Me imagino que tal vez hasta la red de desarrollo 6 o 7. Y luego, una vez que las especificaciones de Pectra estén congeladas y listas para funcionar —y se hayan encontrado todos los casos extremos que los desarrolladores pueden encontrar en las redes de desarrollo—, lanzarán la actualización Pectra en las redes de prueba públicas de Ethereum. Hay dos en este momento: Sepolia y Holesky.

Históricamente, los desarrolladores han presupuestado unas dos semanas entre las actualizaciones de las redes de prueba públicas. En raras ocasiones, los desarrolladores redujeron ese plazo a solo una semana entre redes de prueba, pero debido al tamaño de Pectra, imagino que los desarrolladores querrán tomarse todo el tiempo. Estoy calculando aproximadamente un mes para Sepolia y Holesky, y después de eso es cuando finalmente se puede tener la activación en la Red principal.

Dada toda la información que conozco en este momento y el progreso que los desarrolladores han logrado hasta ahora en Pectra, mi mejor análisis y suposición es que la llegada de Pectra a la Red principal ocurrirá de manera realista el próximo abril de 2025. Nuevamente, esto es muy provisional porque muchas cosas pueden cambiar. El desarrollo ocurre semana a semana: los desarrolladores están en estas llamadas ACD hablando sobre este error que no esperaban en esta EIP o esta nueva EIP que quieren agregar a Pectra.

#### EIP de la capa de ejecución (6:23) {#execution-layer-eips-623}

Pasemos al plato fuerte de esta charla: qué se incluye en la actualización Pectra. Hay diez EIP que entrarán en Pectra, y cuatro de ellas se centran en la capa de ejecución.

**EIP-2537** es un nuevo precompilado en la EVM: operaciones de curva BLS12-381. Este es un nuevo esquema de firma criptográfica que los desarrolladores de contratos inteligentes han estado pidiendo durante mucho tiempo. Esta EIP se creó en 2020, y en ese momento los desarrolladores de aplicaciones descentralizadas (dapps) decían que realmente la querían porque daría a ciertas dapps que dependen de la criptografía de conocimiento cero garantías de privacidad más sólidas, y potencialmente mayor seguridad y escalabilidad. Las firmas BLS también son la agregación que ocurre en la capa de consenso para las atestaciones de los validadores. Esta EIP se ha hecho esperar mucho. Una de las preocupaciones es: ¿todavía hay aplicaciones esperando el precompilado BLS, y lo van a usar cuando se lance? Pero si estás en esta audiencia y no sabías que el precompilado BLS finalmente está en camino, ya viene.

**EIP-2935**: servir hashes de bloques históricos desde el estado. Esta introduce un cambio en la capa de ejecución de modo que las pruebas de bloques históricos se puedan generar a partir del estado. Tiene algunos beneficios a corto plazo para la sincronización de clientes ligeros y para los contratos inteligentes que puedan querer utilizar datos sobre el estado de un bloque anterior directamente a través de la EVM (actualmente no se puede hacer eso). Pero esos beneficios a corto plazo no son la razón principal por la que esta EIP se incluyó en Pectra. La razón principal es que es un requisito previo para Verkle, la gran revisión de la estructura de datos del estado de Ethereum. Los desarrolladores habían pensado que esa transición iba a ocurrir justo después de Pectra, pero Verkle no se incluirá en Fusaka. Lo han pospuesto para otra actualización, pero este paso previo ya se ha tachado de la lista.

**EIP-7685**: solicitudes de propósito general de la capa de ejecución. Esta EIP realmente no introduce nuevas características en Ethereum; es una EIP para respaldar otras EIP en Pectra. En Pectra, hay un par de EIP donde la capa de ejecución podrá pasar muchos más mensajes —diferentes tipos de mensajes— a la capa de consenso que antes no podía. Los contratos inteligentes en la capa de ejecución podrán desencadenar retiros, consolidaciones y depósitos de validadores. En lugar de implementar estos nuevos canales de comunicación de forma separada y única, esta EIP crea una estructura generalizada —un bus generalizado— para albergar estas solicitudes. Será más fácil de probar, más fácil de implementar en todos los clientes y más fácil de estandarizar, especialmente si los desarrolladores quieren introducir nuevos tipos de solicitudes que se puedan desencadenar desde la capa de ejecución.

**EIP-7702**: establecer código para cuentas de propiedad externa (EOA). Un nuevo tipo de transacción está llegando a Ethereum. Este tipo de transacción permitirá temporalmente que una EOA tenga mayor flexibilidad, habilitando características como el procesamiento por lotes de transacciones, transacciones patrocinadas, transacciones condicionales y seguridad delegada. Podrías estar pensando: "¿es esta la visión de la abstracción de cuentas cobrando vida en Ethereum?". No, no lo es; es un pequeño paso. Es un paso inicial para ver cómo podría ser la verdadera hoja de ruta hacia una abstracción de cuentas nativa real en Ethereum. Hubo bastante debate sobre cómo los desarrolladores deberían dar ese primer paso, y mucha controversia en torno a la inclusión de esta EIP y su diseño, pero ya está adentro.

#### EIP de la capa de consenso (12:00) {#consensus-layer-eips-1200}

Hay otras seis: estas son EIP de la capa de consenso.

**EIP-7742**: desacoplar el recuento de blobs entre la capa de consenso y la capa de ejecución. Esta es la EIP más reciente en incluirse en Pectra. Actualmente, la capacidad de blobs está codificada de forma rígida en la capa de ejecución y la capa de consenso en todos los diferentes clientes. Actualizar esa codificación rígida no es tan fácil como algunos podrían pensar. Crear un mecanismo para establecer dinámicamente la capacidad de blobs a través de la capa de consenso garantizará que en el futuro los desarrolladores puedan cambiar fácilmente la capacidad de blobs de Ethereum, y que dicha actualización solo requiera cambios en la capa de consenso, no cambios en ambas capas.

**EIP-6110**: suministrar depósitos de validadores en cadena. La Fusión ocurrió y Ethereum es más maduro como una cadena de bloques de prueba de participación (PoS). Ciertas suposiciones de seguridad pueden relajarse ahora. Esta EIP elimina una ronda adicional de votación que ocurre en el lado de la capa de consenso cada vez que depositas 32 ETH en el contrato de depósito, asegurando que toda la validación de depósitos ocurra en la capa de ejecución. Esto tiene beneficios para la experiencia de usuario (UX) del validador: reducirá el tiempo entre el momento en que depositas tus 32 ETH y cuando ves al validador realmente activado en la cadena de balizas.

**EIP-7002**: retiros que se pueden desencadenar desde la capa de ejecución. Esto es muy bueno para los grupos de staking. En este momento, si deseas retirar completamente un validador, el operador del nodo que opera ese validador necesita usar su clave de retiro para realizar la salida completa del validador. A través de esta EIP, los contratos inteligentes podrán iniciar esos retiros completos. Es una suposición de confianza que ahora puedes eliminar de los grupos de staking: grupos como Lido, Rocket Pool y otros grupos de staking basados en contratos inteligentes ahora pueden desencadenar retiros completos de validadores si lo desean.

**EIP-7251**: aumentar el saldo efectivo máximo. Esto es realmente un problema. Cuando los desarrolladores estaban pensando en la cadena de balizas, no esperaban que el conjunto de validadores creciera tan rápido: estamos en alrededor de 1,2 o 1,3 millones de validadores. Hay muchos validadores activos, muchos mensajes circulando en la capa de red, y es demasiado. Está sobrecargando los nodos y, si no se controla, sería un problema importante para la salud de Ethereum. La EIP-7251 está diseñada para alentar a los validadores a consolidar sus ETH y tener un saldo efectivo máximo superior a 32 ETH, reduciendo el número de validadores activos en Ethereum.

**EIP-7549**: mover el índice del comité fuera de la atestación. Esta es una reestructuración y refactorización de la forma en que se agregan las atestaciones para reducir la carga de red en Ethereum y ahorrar ancho de banda del nodo. Cuando los desarrolladores incluyeron esto en Pectra, pensaron que era un gran cambio con beneficios maravillosos y fácil de hacer, pero en la práctica, resultó ser mucho más difícil de implementar de lo esperado.

#### Resumen (17:19) {#summary-1719}

Pectra es una mezcla de actualizaciones. Va a hacer tres cosas: primero, solucionar deficiencias críticas de Ethereum como una cadena de bloques de prueba de participación (PoS) (piensa en MaxEB, esa es una solución crítica porque el tamaño del conjunto de validadores puede seguir creciendo sin control). Segundo, mejorar la experiencia del usuario: el nuevo tipo de transacción, diseños más flexibles, algunas mejoras para diseños sin necesidad de confianza para los grupos de staking. Y tercero, aumentar la capacidad de disponibilidad de datos de Ethereum, lo cual no se ha incluido formalmente en Pectra pero parece probable.

#### EIP eliminadas de Pectra (18:02) {#eips-removed-from-pectra-1802}

Aquí están todas las EIP que se eliminaron de Pectra. Es la primera vez que se eliminan tantas EIP de una actualización.

**PeerDAS**: inicialmente iba a haber un aumento mucho mayor en la capacidad de disponibilidad de datos en Pectra. PeerDAS permitiría a los desarrolladores aumentar el objetivo de blobs de Ethereum en múltiples veces más sin afectar en gran medida el consumo de ancho de banda y los requisitos computacionales de ejecutar un nodo de Ethereum. Pero todavía está en fase de investigación y desarrollo.

**EOF**: el formato de objeto de la EVM (EVM Object Format). Estos once cambios de código en conjunto son una actualización importante para la EVM de Ethereum. Tanto PeerDAS como EOF se incluyeron inicialmente en Pectra, pero se estaban probando en redes de desarrollo separadas. Los desarrolladores pensaron que requerirían mucho más tiempo para estar listos para la activación en la Red principal, y no querían retrasar las otras EIP de Pectra. Así que dijeron que PeerDAS y EOF claramente necesitan más tiempo: los pospondrán para otra actualización y no retrasarán la llegada de las otras EIP de Pectra a la Red principal.

Estos ahora se han trasladado a Fusaka. Verkle estaba programado inicialmente para Fusaka, pero desde entonces se ha retrasado aún más. EOF y PeerDAS están en Fusaka por ahora. Hay otras EIP que los desarrolladores reconsiderarán para su inclusión en Fusaka: la transición a SSZ, las listas de inclusión, los cambios en la emisión, la expiración del historial, ePBS y la dirección de la abstracción de cuentas.

#### Preguntas y respuestas (22:02) {#qa-2202}

**Anfitrión:** ¿Cuándo llega EOF?

**Christine Kim:** Literalmente acabo de decir que los desarrolladores van a intentar incluirlo en Fusaka. ¿Creo que es probable? Probablemente no. ¿Creo que Fusaka va a ocurrir en 2025? Absolutamente no. La cantidad de tiempo que ha llevado preparar Pectra... Fusaka tomará un tiempo similar, si no más largo.

**Anfitrión:** ¿Existe una vía de emergencia para aumentar el objetivo de blobs entre ahora y la activación de Pectra?

**Christine Kim:** No. El objetivo de blobs es un parámetro codificado de forma rígida en la capa de ejecución y la capa de consenso. Para que la capacidad de blobs cambie, los desarrolladores deben realizar una bifurcación dura. No creo que haya ninguna forma de que la capacidad de blobs aumente entre ahora y Pectra sin una bifurcación dura.

**Anfitrión:** ¿La propuesta es cambiar solo el límite de blobs o también el objetivo de blobs?

**Christine Kim:** Gran pregunta. El aumento más conservador es de tres a cuatro: solo cambiar el objetivo, sin cambiar el máximo en absoluto. Pero eso no es lo que han pedido los desarrolladores de la capa 2 (l2). Hay un representante del equipo de Base —el equipo de Base de Coinbase— y ha estado compitiendo por aumentos más agresivos. Ha mostrado datos que sugieren que el aumento no afectaría negativamente la descentralización de Ethereum. Hay una propuesta conservadora para cambiar solo el objetivo, y luego hay una propuesta más ambiciosa para cambiar tanto el máximo como el objetivo, como ocho y cuatro, o seis y doce. Hay diferentes gradientes.

**Anfitrión:** Instaste a la gente a involucrarse más en la gobernanza. ¿Cómo puede la comunidad involucrarse más?

**Christine Kim:** ETH Research y ETH Magicians son dos foros de discusión realmente excelentes para votar a favor de ciertas EIP y mostrar tu apoyo. Las llamadas ACD son probablemente el lugar con mayor relevancia: todo lo que tienes que hacer es dejar un comentario en la agenda de la llamada ACD en GitHub y decir que esta es una EIP de la que te gustaría hablar o presentar. El moderador de la llamada suele estar muy dispuesto a darte el tiempo. Sin embargo, no ocupes demasiado tiempo: tal vez cinco minutos para dar tu opinión.