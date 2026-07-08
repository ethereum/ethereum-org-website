---
title: "7 heurísticas para el diseño de interfaces de Web3"
description: Principios para mejorar la usabilidad de Web3
lang: es
---

Las heurísticas de usabilidad son «reglas generales» amplias que puedes utilizar para medir la usabilidad de tu sitio.
Las 7 heurísticas que se presentan aquí están adaptadas específicamente para Web3 y deben usarse junto con los [10 principios generales para el diseño de interacción](https://www.nngroup.com/articles/ten-usability-heuristics/) de Jakob Nielsen.

## Siete heurísticas de usabilidad para Web3 {#seven-usability-heuristics-for-web3}

1. La retroalimentación sigue a la acción
2. Seguridad y confianza
3. La información más importante es obvia
4. Terminología comprensible
5. Las acciones son lo más cortas posible
6. Las conexiones de red son visibles y flexibles
7. Control desde la aplicación, no desde la billetera


## Definiciones y ejemplos {#definitions-and-examples}

### 1. La retroalimentación sigue a la acción {#feedback-follows-action}

**Debe ser obvio cuando algo ha sucedido o está sucediendo.**

Los usuarios deciden sus próximos pasos en función del resultado de sus pasos anteriores. Por lo tanto, es esencial que se mantengan informados sobre el estado del sistema. Esto es especialmente importante en Web3, ya que las transacciones a veces pueden tardar un poco en confirmarse en la cadena de bloques. Si no hay retroalimentación que les informe que deben esperar, los usuarios no estarán seguros de si ha sucedido algo.

**Consejos:** 
- Informa al usuario mediante mensajes, notificaciones y otras alertas.
- Comunica los tiempos de espera de forma clara.
- Si una acción va a tardar más de unos segundos, tranquiliza al usuario con un temporizador o una animación para que sienta que algo está sucediendo.
- Si hay varios pasos en un proceso, muestra cada uno de ellos.

**Ejemplo:**
Mostrar cada paso involucrado en una transacción ayuda a los usuarios a saber en qué parte del proceso se encuentran. Los iconos adecuados permiten al usuario conocer el estado de sus acciones.

![Informing the user about each step when swapping tokens](./Image1.png)

### 2. La seguridad y la confianza están integradas {#security-and-trust-are-backed-in}

Se debe priorizar la seguridad, y esto debe enfatizarse para el usuario. 
Las personas se preocupan profundamente por sus datos. La seguridad suele ser una preocupación principal para los usuarios, por lo que debe considerarse en todos los niveles del diseño. Siempre debes buscar ganarte la confianza de tus usuarios, pero la forma de hacerlo puede significar cosas diferentes en distintas aplicaciones. No debe ser una idea de último momento, sino que debe diseñarse conscientemente en todo momento. Construye confianza a lo largo de la experiencia del usuario, incluyendo los canales sociales y la documentación, así como en la interfaz de usuario final. Aspectos como el nivel de descentralización, el estado multifirma de la tesorería y si el equipo es público (doxxed), afectan la confianza de los usuarios.

**Consejos:**
- Enumera tus auditorías con orgullo
- Obtén múltiples auditorías
- Anuncia cualquier característica de seguridad que hayas diseñado
- Destaca los posibles riesgos, incluidas las integraciones subyacentes
- Comunica la complejidad de las estrategias
- Considera los problemas ajenos a la interfaz de usuario que podrían afectar la percepción de seguridad de tus usuarios

**Ejemplo:** 
Incluye tus auditorías en el pie de página, con un tamaño destacado.

![Audits referenced in the website footer](./Image2.png)

### 3. La información más importante es obvia {#the-most-important-info-is-obvious}

Para sistemas complejos, muestra solo los datos más relevantes. Determina qué es lo más importante y prioriza su visualización. 
Demasiada información resulta abrumadora y los usuarios suelen anclarse en un solo dato a la hora de tomar decisiones. En las finanzas descentralizadas (DeFi), esto probablemente será el APR en las aplicaciones de rendimiento y el LTV en las aplicaciones de préstamos.

**Consejos:**
- La investigación de usuarios revelará la métrica más importante
- Haz que la información clave sea grande y que los demás detalles sean pequeños y discretos
- Las personas no leen, escanean; asegúrate de que tu diseño sea fácil de escanear

**Ejemplo:** Los tokens grandes a todo color son fáciles de encontrar al escanear. El APR es grande y está resaltado con un color de acento.

![The token and APR are easy to find](./Image3.png)

### 4. Terminología clara {#clear-terminology}

La terminología debe ser comprensible y adecuada.
La jerga técnica puede ser un gran obstáculo, porque requiere la construcción de un modelo mental completamente nuevo. Los usuarios no pueden relacionar el diseño con palabras, frases y conceptos que ya conocen. Todo parece confuso y desconocido, y hay una curva de aprendizaje pronunciada antes de que puedan siquiera intentar usarlo. Un usuario podría acercarse a DeFi queriendo ahorrar algo de dinero, y lo que encuentra es: minería, farming, staking, emisiones, sobornos, bóvedas, bloqueadores, veTokens, adquisición de derechos, épocas, algoritmos descentralizados, liquidez propiedad del protocolo...
Intenta usar términos simples que sean entendidos por el grupo más amplio de personas. No inventes términos completamente nuevos solo para tu proyecto.

**Consejos:**
- Usa una terminología simple y coherente
- Usa el lenguaje existente tanto como sea posible
- No inventes tus propios términos
- Sigue las convenciones a medida que aparezcan
- Educa a los usuarios tanto como sea posible

**Ejemplo:**
«Tus recompensas» es un término neutral y ampliamente comprendido; no es una palabra nueva inventada para este proyecto. Las recompensas están denominadas en USD para coincidir con los modelos mentales del mundo real, incluso si las recompensas en sí están en otro token.

![Token rewards, displayed in U.S. dollars](./Image4.png)

### 5. Las acciones son lo más cortas posible {#actions-are-as-short-as-possible}

Acelera las interacciones del usuario agrupando subacciones. 
Esto se puede hacer a nivel del contrato inteligente, así como en la interfaz de usuario. El usuario no debería tener que moverse de una parte del sistema a otra (o abandonar el sistema por completo) para completar una acción común. 

**Consejos:**
- Combina «Aprobar» con otras acciones siempre que sea posible
- Agrupa los pasos de firma lo más cerca posible

**Ejemplo:** Combinar «añadir liquidez» y «hacer staking» es un ejemplo sencillo de un acelerador que le ahorra al usuario tanto tiempo como gas.

![Modal showing a switch to combine the deposit and stake actions](./Image5.png)

### 6. Las conexiones de red son visibles y flexibles {#network-connections-are-visible-and-flexible}

Informa al usuario sobre a qué red está conectado y proporciona atajos claros para cambiar de red. 
Esto es especialmente importante en aplicaciones multicadena. Las funciones principales de la aplicación deben seguir siendo visibles mientras se está desconectado o conectado a una red no compatible.

**Consejos:**
- Muestra la mayor parte posible de la aplicación mientras esté desconectada
- Muestra a qué red está conectado actualmente el usuario
- No obligues al usuario a ir a la billetera para cambiar de red
- Si la aplicación requiere que el usuario cambie de red, solicita la acción desde la llamada a la acción principal
- Si la aplicación contiene mercados o bóvedas para múltiples redes, indica claramente qué conjunto está viendo el usuario actualmente

**Ejemplo:** Muestra al usuario a qué red está conectado y permítele cambiarla en la barra de la aplicación.

![Dropdown button showing the connected network](./Image6.png)

### 7. Control desde la aplicación, no desde la billetera {#control-from-the-app-not-the-wallet}

La interfaz de usuario debe decirle al usuario todo lo que necesita saber y darle control sobre todo lo que necesita hacer. 
En Web3, hay acciones que realizas en la interfaz de usuario y acciones que realizas en la billetera. Por lo general, inicias una acción en la interfaz de usuario y luego la confirmas en la billetera. Los usuarios pueden sentirse incómodos si estas dos vertientes no se integran cuidadosamente.

**Consejos:**
- Comunica el estado del sistema a través de retroalimentación en la interfaz de usuario
- Mantén un registro de su historial
- Proporciona enlaces a exploradores de bloques para transacciones antiguas
- Proporciona atajos para cambiar de red. 

**Ejemplo:** Un contenedor sutil muestra al usuario qué tokens relevantes tiene en su billetera, y la llamada a la acción (CTA) principal proporciona un atajo para cambiar la red.

![Main CTA is prompting the user to switch network](./Image7.png)