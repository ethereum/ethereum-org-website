---
title: 7 principios heurísticos para el diseño de interfaces web3
description: Principios para mejorar la usabilidad en Web3
lang: es
---

Los principios heurísticos de usabilidad son reglas generales que pueden utilizarse para medir cuán fácil de usar es su sitio.
Estos principios heurísticos están diseñadas específicamente para la Web3 y deben usarse junto con los [10 principios generales de diseño de interacción de Jacob Nielsen](https://www.nngroup.com/articles/ten-usability-heuristics/).

## Siete principios heurísticos de usabilidad para la Web3 {#seven-usability-heuristics-for-web3}

1. La retroalimentación precede a la acción
2. Seguridad y confianza
3. La información más importante es obvia
4. Terminología comprensible
5. Las acciones son lo más breves posible
6. Las conexiones de red son visibles y flexibles
7. Control desde la aplicación, no desde la billetera

## Definiciones y ejemplos {#definitions-and-examples}

### 1. La retroalimentación precede a la acción {#feedback-follows-action}

**Si algo ha ocurrido o está ocurriendo, debe ser evidente**

Quienes usan el sitio deciden sus próximos pasos en función del resultado de los pasos previos. Por lo que resulta vital mantenerlos informados sobre el estado del sistema. En la Web3 esto es especialmente importante, ya que las transacciones a veces pueden tardar un poco en confirmarse en la cadena de bloques. Si no reciben retroalimentación informándoles que deben esperar, los usuarios no tendrán la seguridad de si algo ha ocurrido.

**Recomendaciones**

- Informar a quienes usan el sistema mediante mensajería, notificaciones u otro tipo de alertas.
- Comunicar claramente los tiempos de espera.
- Si una acción va a tomar más de un par de segundos, tranquilice al usuario con un temporizador o animación para que sepa que algo está ocurriendo.
- Si un proceso tiene varios pasos, muestre cada uno de ellos.

**Ejemplo**
Mostrar cada uno de los pasos de una transacción ayuda a los usuarios a saber en qué momento del proceso se encuentran. Una iconografía adecuada le permite al usuario conocer el estado de sus acciones.

![Informar al usuario el paso a paso a la hora de intercambiar tokens](./Image1.png)

### 2. La seguridad y la confianza están integradas {#security-and-trust-are-backed-in}

La seguridad debe ser prioritaria, y esto debe resaltarse para el usuario.
Las personas se preocupan mucho por sus datos. La seguridad es una de las preocupaciones primordiales y, como tal, debe ser considerada en todos los niveles del diseño. Siempre debe tratar de ganarse la confianza de los usuarios, pero la forma de lograrlo varía en cada aplicación. No debe ser una consideración secundaria, sino algo diseñado de manera consciente en cada etapa. La confianza debe generarse en toda la experiencia del usuario, incluyendo los canales sociales, la documentación, así como la interfaz final. Dentro de los aspectos que afectan dicha confianza están el nivel de descentralización, el estado multifirma de la tesorería y si la identidad del equipo es conocida púbicamente o no (doxada).

**Recomendaciones**

- Enumere sus auditorías con orgullo.
- Obtenga múltiples auditorías.
- Anuncie las características de seguridad que haya diseñado.
- Resalte los posibles riesgos, incluidas las integraciones subyacentes.
- Comunique la complejidad de las estrategias.
- Tome en cuenta aspectos no relacionados a la interfaz que puedan afectar la percepción de seguridad de los usuarios.

**Ejemplo:**
Incluya sus auditorías en el pie de página, en un tamaño que destaque.

![Referencia a las auditorías en el pie de página del sitio](./Image2.png)

### 3. La información más importante es obvia {#the-most-important-info-is-obvious}

Para sistemas complejos, muestre solo los datos más relevantes. Determine qué es lo más importante y priorice su exposición.
Demasiada información es abrumadora y los usuarios suelen basarse en un solo dato al tomar decisiones. En las Finanzas Descentralizadas (DeFi), probablemente será la Tasa de Porcentaje Anual (APR) en las aplicaciones de rendimiento y la proporción entre el préstamo y el valor (LTV) en las aplicaciones de préstamo.

**Recomendaciones**

- La investigación de los usuarios revelará la métrica más importante.
- Haga que la información clave sea de tamaño grande, y mantenga los detalles pequeños y discretos.
- La gente no lee, da un vistazo general; asegúrese de que el diseño contribuya a ello.

**Ejemplo:** Los tokens grandes resultan fáciles de encontrar cuando da un vistazo. La Tasa de Porcentaje Anual (APR) es grande y se resalta con un color de acento.

![El token y la APR son fáciles de encontrar](./Image3.png)

### 4. Terminología clara {#clear-terminology}

La terminología debe ser comprensible y adecuada.
El uso de jerga técnica puede ser un gran obstáculo, ya que exige la construcción de un modelo mental completamente nuevo. Los usuarios no pueden relacionar el diseño con palabras, frases y conceptos que ya conocen. Todo les parece confuso y desconocido, y antes de que puedan siquiera intentar utilizar la aplicación, ya existe una curva de aprendizaje en extremo pronunciada. Una persona puede acercarse a una aplicación de Finanzas Descentralizadas (DeFi) queriendo ahorrar algo de dinero, y de repente lo que encuentra es: minería, farming, staking, emisiones, sobornos, bóvedas, bloqueadores, veTokens, vesting, épocas, algoritmos descentralizados, liquidez propiedad del protocolo…
Intente siempre utilizar términos que sean sencillos y comprensibles para la mayor cantidad de personas posible. No invente términos completamente nuevos solamente para su proyecto.

**Recomendaciones**

- Use terminología simple y consistente.
- Use palabras existentes siempre que sea posible.
- No invente sus propios términos.
- Siga las convenciones tal cual son.
- Eduque lo más posible a los usuarios.

**Ejemplo:**
“Sus recompensas” es un término neutral muy entendido por todos; no una nueva palabra creada para este proyecto. Las recomepensas se denominan en dólares americanos para alinearse con los modelos mentales del mundo real, incluso cuando las recompensas en sí estén en otro token.

![Recompensas de tokens mostradas en dólares americanos. ](./Image4.png)

### 5. Las acciones son lo más breves posible {#actions-are-as-short-as-possible}

Acelere las interacciones de los usuarios agrupando acciones menores.
Esto puede hacerse tanto a nivel del contrato inteligente como de la interfaz del usuario. El usuario no debería tener que desplazarse de una parte a otra del sistema, o abandonarlo por completo, para completar una acción habitual.

**Recomendaciones**

- Combine "Aprobar" con otras acciones donde sea posible.
- Agrupe los pasos de firma lo más cerca posible.

**Ejemplo:** Combinar “agregar liquidez” y “hacer staking” es un ejemplo sencillo de un acelerador que le ahorra tanto tiempo como gas al usuario.

![Modal que muestra un interrumptor para combinar las acciones de depositar y hacer staking](./Image5.png)

### 6. Las conexiones de red son visibles y flexibles {#network-connections-are-visible-and-flexible}

Informe al usuario a qué red está conectado y proporcione accesos directos claros para cambiar de red.
Esto es especialmente importante en aplicaciones multicadena. Las funciones principales de la aplicación deben mantenerse visibles independientemente de que dicha aplicación esté desconectada o conectada a una red no compatible.

**Recomendaciones**

- Muestre lo más posible de la aplicación cuando esté desconectada.
- Muestre a qué red está conectado el usuario.
- No haga que el usuario tenga quer ir a su billetera para cambiar de red.
- Si la aplicación requiere que el usuario cambie de red, solicite esa acción desde el botón principal de llamada a la acción.
- Si la aplicación contiene mercados o bóvedas para múltiples redes, indique claramente cuál está visualizando el usuario en ese momento.

**Ejemplo:** Muestre al usuario a qué red está conectado y permítale cambiarla desde la barra de la aplicación.

![Botón desplegable que muestra la red a la que el usuario está conectado](./Image6.png)

### 7. Control desde la aplicación, no desde la billetera {#control-from-the-app-not-the-wallet}

La interfaz debe informar al usuario sobre todo lo que necesita saber y darle control sobre todo lo que necesita hacer.
En la Web3, existen acciones que se realizan en la interfaz y acciones que realizan en la billetera. Generalmente, usted inicia una acción en la interfaz y seguidamente la confirma en la billetera. Los usuarios pueden sentirse incómodos si estos dos espacios no se integran cuidadosamente.

**Recomendaciones**

- Comunique el estado del sistema mediante comentarios en la interfaz de usuario.
- Mantenga un historial.
- Proporcione enlaces hacia exploradores de bloques para transacciones anteriores.
- Provea accesos directos para cambiar de red.

**Ejemplo:** Un contenedor discreto muestra al usuario los tokens relevantes que tiene en su billetera, y el CTA principal ofrece un acceso directo para cambiar la red.

![CTA principal solicita al usuario cambiar de red](./Image7.png)
