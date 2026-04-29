---
title: "Criptoeconomía: prueba de autoridad"
description: "Una clase de criptoeconomía que explica el mecanismo de consenso de prueba de autoridad (PoA), cubriendo cómo funciona, sus ventajas y desventajas en comparación con la prueba de trabajo y la prueba de participación, y dónde se utiliza en la práctica."
lang: es
youtubeId: "Mj10HSEM5_8"
uploadDate: 2018-10-19
duration: "0:09:18"
educationLevel: intermediate
topic:
  - "consenso"
  - "prueba de autoridad"
format: presentation
author: Cryptoeconomics Study
breadcrumb: "Prueba de autoridad"
---

Una clase de criptoeconomía de **Cryptoeconomics Study** que explica el mecanismo de consenso de prueba de autoridad (PoA), incluyendo cómo una autoridad central determina el orden de las transacciones, los problemas de doble gasto y censura que introduce, y el enfoque de mitigación mediante multifirma.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=Mj10HSEM5_8) publicada por Cryptoeconomics Study. Ha sido ligeramente editada para facilitar su lectura.*

#### Cómo funciona la prueba de autoridad (0:00) {#how-proof-of-authority-works-000}

Bienvenidos a la sección 2.4 — prueba de autoridad (PoA) — donde restablecemos esa autoridad central para determinar el orden de las transacciones y resolver ese molesto problemita del doble gasto.

Érase una vez una autoridad central que a todos les caía bastante bien. Todos aprobaban a esta gran autoridad y decían: "¿Por qué no simplemente la escuchamos? Teníamos estos problemas y no nos ponemos de acuerdo sobre el estado correcto, así que dejemos que ella nos diga cuál es el estado".

Nuestra autoridad central ejecuta su gran nodo, y ahora las personas firman transacciones y, en lugar de enviárselas directamente entre sí, se las envían a la autoridad central. La autoridad central aplica cada transacción y la firma ella misma, diciendo: "Sí, lo apruebo; esta es la transacción cero". Luego, la autoridad central la envía a todos, y todos reciben la transacción y la aceptan como una verdad absoluta.

#### El problema del doble gasto (1:05) {#the-double-spend-problem-105}

Ahora intentemos el doble gasto. ¿Qué va a pasar? Mallory va a enviar dos transacciones conflictivas a la autoridad central. La autoridad central recibe la primera y firma que esta es la segunda transacción que ha visto, luego firma que esta es la tercera transacción que ha visto, y después propaga esos mensajes.

¿Qué sucede? Todos reciben los mismos mensajes y todos observan el orden de la autoridad central. Eso significa que todos terminan con los mismos historiales. Si observamos los estados, vamos bien: Alice le envía a Jing, luego Mallory le envía a Alice, después Mallory intenta enviarle a Jing, pero esa no se procesa porque Mallory no tiene suficiente dinero. Sus saldos van a ser todos iguales. Todos están en consenso. La autoridad central... genial, lo hemos logrado.

#### Cuando la autoridad se ve comprometida (2:09) {#when-the-authority-is-compromised-209}

Pero el problema es que tenemos que confiar en la autoridad central para proporcionar este orden de transacciones. Entonces, ¿qué sucede si la autoridad central es expulsada y resulta que ella era Mallory todo el tiempo?

Volvemos a los mismos problemas que teníamos antes. Primero, los dobles gastos: Mallory simplemente firma ambas transacciones conflictivas diciendo que ambas ocurren al mismo tiempo. No sabemos cuál va primero. Mallory las propaga selectivamente y confunde a los nodos, y estos pierden el acuerdo.

El otro problema es la censura. Este es un problema nuevo con nuestra cadena de prueba de autoridad (PoA). ¿Qué pasa si a Mallory no le agrada Alice? Alice intenta enviar una transacción y la autoridad central simplemente la mira, nota que es Alice y la desecha. Alice intenta enviarla de nuevo, y es desechada otra vez. Alice no sabe qué está pasando: sus transacciones no se procesan. Censura exitosa, y volvemos a sufrir.

#### Mitigación con multifirma (3:21) {#mitigating-with-multi-signature-321}

No te preocupes demasiado: existe una posible mitigación. Podemos descentralizar políticamente la autoridad. En teoría, esto hará que sea más difícil para Mallory tomar el control. Así que, en lugar de una autoridad central, tenemos cuatro autoridades diferentes. Tal vez todas representen diferentes intereses de distintas partes, y todas tienen que reunirse para aprobar las transacciones.

A esto se le llama multifirma. Reciben una transacción de Alice para Jing, y la primera firma diciendo: "Vi este mensaje y lo apruebo". Luego la segunda firma, y la tercera. Podemos decir que aceptamos una multifirma de dos de cuatro, o tres de cuatro, o tal vez requerimos a todas las partes: cuatro de cuatro. Depende de ti cuando estés diseñando tu multifirma.

Esto significa que la transacción se procesa y ha sido aprobada por las autoridades.

#### Limitaciones de la prueba de autoridad (4:32) {#limitations-of-proof-of-authority-432}

Pero, ¿qué sucede si todas estas autoridades se convierten en Mallorys? Tenemos exactamente los mismos problemas: dobles gastos y censura. Así que no es perfecto. Sin embargo, es mejor en algunos aspectos que un procesador de pagos centralizado porque al menos los usuarios están ejecutando todas las transacciones ellos mismos. Eventualmente pueden detectar un doble gasto, pero seguimos teniendo nuestros problemas. Técnicamente, todavía podemos hacer un doble gasto y técnicamente todavía podemos censurar.

No hay acceso abierto: puede ser difícil convertirse en una de estas autoridades. Y no hay penalizaciones en el protocolo si ocurren dobles gastos o censura. No hay nada en el protocolo que penalice a estas figuras de autoridad.

#### Qué sigue (5:19) {#what-comes-next-519}

Así que nuestra sabia Alice decide que hay otra manera: deshacerse de la autoridad. ¿Quién la necesita? En su lugar, permitimos que cualquiera se convierta en minero y participe en el protocolo de consenso. Esto otorga acceso abierto para participar, proporciona recompensas económicas por el buen comportamiento (formar consenso de una manera que funcione) y proporciona penalizaciones económicas por el mal comportamiento, donde lo detectamos y quemamos las monedas de las personas.

Pero eso viene a continuación en la prueba de trabajo (PoW): diseño de mecanismos para el capítulo 3.