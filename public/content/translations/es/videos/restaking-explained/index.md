---
title: "Explicación del restaking"
description: "Una explicación sobre el restaking, que utiliza ETH que ya está en staking para proporcionar seguridad a protocolos y servicios adicionales más allá de la capa base de Ethereum."
lang: es
youtubeId: "rOJo7VwPh7I"
uploadDate: 2024-02-05
duration: "0:12:33"
educationLevel: intermediate
topic:
  - "restaking"
  - "security"
format: explainer
author: CBER Forum
breadcrumb: "Restaking"
---

Una presentación de **Mike Neuder** en un evento del CBER Forum que cubre cómo funciona el restaking. La presentación define el staking propio, el staking delegado, el restaking nativo y no nativo, la mecánica del staking líquido y los tokens de restaking líquido, y cómo el recorte interactúa con las posiciones en restaking.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=rOJo7VwPh7I) publicada por CBER Forum. Ha sido ligeramente editada para facilitar su lectura.*

#### Introducción (0:00) {#introduction-000}

Hola a todos, soy Mike. Voy a hablar sobre los LRT y los LST. LRT: ¿es el restaking el nuevo staking? Voy a empezar con una segunda pregunta y usarla para motivar la discusión sobre los LST y los LRT, definiendo qué son. Esta es principalmente una presentación gráfica, así que espero que podamos empezar desde el principio y avanzar juntos.

Un resumen rápido: empezando desde el principio, vamos a definir dos modos de staking. El primero es el staking propio, el segundo es el staking delegado. Luego entraremos en el concepto de restaking y lo definiremos. Hay cuatro modelos diferentes que quiero explorar: usando la separación entre propio y delegado, y luego centrándonos en el restaking nativo frente al restaking no nativo. Después entraremos en la liquidificación, hablando de tokens líquidos: tokens de staking líquido (LST) y tokens de restaking líquido (LRT). Motivaremos esto analizando el recorte y el restaking, y luego ambos tipos de tokens. Por último, terminaremos con algunos datos sobre el staking tal como existe hoy en Ethereum.

#### Staking propio (0:48) {#self-staking-048}

Empezando desde el principio, tenemos el staking donde Alice lo hace ella misma. Interactúa directamente con el protocolo, deposita su participación en el protocolo y es recompensada por hacerlo mediante la emisión del token nativo. En el caso de Ethereum, Alice hace staking de 32 ETH y es recompensada en términos de ETH por participar en el consenso.

Hay dos cosas en las que centrarse aquí. Primero, el staking sirve como este mecanismo anti-Sybil: no puedes engañar a la red diciendo que tienes muchas identidades porque cada identidad cuesta una cierta cantidad de este suministro fijo de tokens. Lo segundo es el colateral en riesgo: estas son las reglas del protocolo en términos de recorte. Si Alice se comporta mal de acuerdo con una especificación muy bien definida, el protocolo le quitará su capital y la castigará por hacerlo.

#### Staking delegado (2:52) {#delegated-staking-252}

El staking delegado añade otra capa en el medio entre Alice y el protocolo. Alice ahora delega en Bob, quien hace staking en el protocolo Ethereum. Las recompensas se envían a Bob, y las recompensas menos las comisiones se reenvían a Alice. Esta es la versión más simple del staking delegado: Alice no quiere ejecutar el software ella misma, tal vez no tiene los 32 ETH completos, o no tiene el hardware o la experiencia técnica para ejecutar un validador.

Hay muchos modos diferentes de esta delegación con varios niveles de confianza. La versión de mayor confianza es con custodia: envías tus ETH a Coinbase y dices "hagan staking en mi nombre". Efectivamente confías en ellos por completo porque custodian el activo a tu nombre. Hay una versión sin custodia pero gobernada por una DAO donde delegas tu participación a alguien determinado por una DAO que vota sobre quién puede ejecutar los nodos; este es el staking al estilo Lido. La tercera es una versión de confianza minimizada donde tanto Alice como Bob aportan algo de colateral. Alice subsidia el resto del colateral de Bob, y si Bob se comporta mal y sufre un recorte, su colateral es el primer tramo que se elimina. Digo "de confianza minimizada" y no "sin necesidad de confianza" porque, pase lo que pase, hay escenarios en los que el colateral de Alice se elimina por completo dependiendo de lo que haga Bob.

#### Restaking propio con ETH nativo (4:42) {#self-restaking-with-native-eth-442}

Ahora podemos hablar de qué es el restaking. Este es un concepto totalmente nuevo; ha existido desde que Sreeram y EigenLayer introdujeron el término hace tal vez un año y medio o dos años.

En este modelo, Alice hace lo mismo que hacía antes: envía su participación al protocolo Ethereum y obtiene recompensas por participar en el consenso. Ahora tenemos un nuevo protocolo, llamémoslo "Retheum", en el que Alice hace restaking. Lo importante aquí es que está usando los mismos tokens que tiene en staking en el protocolo Ethereum para asegurar este segundo protocolo.

Ella obtiene recompensas por eso. Esto parece genial: Alice ahora tiene potencialmente el doble de recompensa por la misma cantidad de participación. Pero el riesgo es que el capital que ha depositado en garantía en ambos protocolos ahora está sujeto a las reglas de ambos protocolos. Si Alice se comporta mal en Ethereum, puede perder su capital al sufrir un recorte. Si se comporta mal en "Retheum", también puede sufrir un recorte. Con un rendimiento adicional vienen responsabilidades adicionales: comportamientos del protocolo que son obligatorios y castigables de otras maneras si comprometes tu token de staking en muchos protocolos diferentes.

#### Restaking nativo delegado (8:28) {#delegated-native-restaking-828}

La segunda versión es el restaking delegado con ETH nativo. Alice está haciendo staking con Ethereum, y ahora quiere usar a Bob para delegar su participación al protocolo "Retheum". Ella delega en Bob, Bob hace restaking, el protocolo emite recompensas a Bob, y Bob emite las recompensas menos las comisiones a Alice.

Bajo este modelo, los 32 ETH en el protocolo Ethereum son responsables de las acciones tanto de Alice como de Bob, dos personas que potencialmente podrían hacer que estos ETH sufran un recorte. El token está sujeto a dos conjuntos diferentes de reglas de protocolo.

**Pregunta del público:** Cuando haces staking de ETH en el protocolo Ethereum, el protocolo tiene que darte algo que luego presentas, ¿qué es ese algo?

En esta versión nativa, Alice hace staking y tiene lo que se llama una credencial de retiro del ecosistema de Ethereum. Esa credencial de retiro puede apuntar a un contrato en Ethereum que maneja la segunda capa de staking. Es un contrato que controla los activos cuando los retiras de Ethereum; es como una custodia sin necesidad de confianza en el contrato inteligente que aplica la segunda capa de penalizaciones por recorte.

¿Por qué se llama "nativo"? Porque Alice sigue interactuando directamente con Ethereum: su participación son los 32 ETH que posee, utilizados para asegurar la capa de consenso de Ethereum.

#### Restaking no nativo (10:57) {#non-native-restaking-1057}

Restaking propio en el entorno no nativo: Alice interactúa solo con el protocolo "Retheum". No está ejecutando un nodo en Ethereum. Ella hace restaking (aunque pongo "re" entre comillas porque en realidad no está haciendo restaking, es staking en primer lugar). La única razón por la que se llama restaking es porque esto se lleva a cabo a través de un protocolo que también facilita otros tipos de restaking.

Ella toma tokens no nativos (esto podría ser USDC, una moneda estable en euros, Bitcoin envuelto, lo que sea), los proporciona como seguridad económica y resistencia anti-Sybil al protocolo y gana recompensas. Esto está redefiniendo el restaking como un mercado para la confianza descentralizada, donde la confianza se refiere al valor económico del capital en riesgo.

El restaking delegado con tokens no nativos sigue el mismo patrón: Alice delega a través de Bob y recibe recompensas menos las comisiones.

#### Recorte y restaking (13:55) {#slashing-and-restaking-1355}

Antes de entrar en la liquidez, hablemos del recorte. En el modo de recorte normal, Alice está haciendo staking en el protocolo Ethereum. Si hace algo que el protocolo considera incorrecto (por ejemplo, una equivocación, donde usa su clave criptográfica para firmar dos piezas de información que están en conflicto entre sí), eso es una falta objetiva. Todos pueden verificar que ambas firmas fueron hechas por Alice, y eso es prueba suficiente para recortar sus tokens.

¿Cómo interactúan el restaking y el recorte? En la versión más simple (restaking propio con el activo nativo), Alice hace staking en Ethereum y también hace restaking a través de "Retheum". Si Alice continúa haciendo su trabajo en el protocolo "Retheum" pero comete una equivocación en Ethereum, ahora tenemos un problema: sufre un recorte en Ethereum, pero "Retheum" no ha visto nada atribuible a ella que esté mal según sus reglas. Tiene que haber alguna comunicación entre los dos protocolos.

Esta dirección de comunicación es en realidad bastante fácil porque "Retheum" es un contrato inteligente en Ethereum: puede leer del estado de Ethereum y decir "este validador ha sufrido un recorte según Ethereum", por lo que en el protocolo de segundo orden, Alice también sufre un recorte.

La otra dirección es más difícil. Si Alice sufre un recorte en la plataforma de restaking, Ethereum tendría que ser informado. Pero Ethereum es intencionalmente ajeno a todo lo que sucede en su capa de contratos en términos del mecanismo de consenso.

**Pregunta del público:** ¿Por qué importaría eso? Ethereum necesita la participación para lo que hace, pero la cantidad en restaking es un derivado de la original.

El problema es que si Alice sufre un recorte en la plataforma de restaking, en realidad ya no es dueña de esa participación. Puede hacer lo que quiera en el protocolo Ethereum sin capital real en riesgo, que es el propósito principal de tener una participación en primer lugar. Es como si estuvieras usando dinero para dos cosas, desapareciera en una cosa, y la otra cosa tiene que darse cuenta de que el dinero ya no es tuyo. Todavía tiene valor económico en cierto sentido, pero no lo controlas, así que no te importa lo que le pase porque ya se ha ido.