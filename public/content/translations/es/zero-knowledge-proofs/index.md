---
title: ¿Qué son las pruebas de conocimiento cero?
metaTitle: Pruebas de conocimiento cero
description: Una introducción no técnica a las pruebas de conocimiento cero para principiantes.
lang: es
---

Una prueba de conocimiento cero es una forma de probar la validez de una afirmación sin revelar la afirmación en sí. El «probador» es la parte que intenta probar un reclamo, mientras que el «verificador» es responsable de validar el reclamo.

Las pruebas de conocimiento cero aparecieron por primera vez en un artículo de 1985, «[The knowledge complexity of interactive proof systems](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)» (La complejidad del conocimiento de los sistemas de prueba interactivos), que proporciona una definición de las pruebas de conocimiento cero ampliamente utilizada en la actualidad:

> Un protocolo de conocimiento cero es un método mediante el cual una parte (el probador) **puede probar** a otra parte (el verificador) **que algo es cierto, sin revelar ninguna información** aparte del hecho de que esta afirmación específica es cierta.

Las pruebas de conocimiento cero han mejorado a lo largo de los años y ahora se utilizan en varias aplicaciones del mundo real.

<VideoWatch slug="zero-knowledge-proofs-5-levels" />

## ¿Por qué necesitamos pruebas de conocimiento cero? {#why-zero-knowledge-proofs-are-important}

Las pruebas de conocimiento cero representaron un gran avance en la criptografía aplicada, ya que prometían mejorar la seguridad de la información para las personas. Considere cómo podría probar un reclamo (por ejemplo, «Soy ciudadano del país X») a otra parte (por ejemplo, un proveedor de servicios). Necesitaría proporcionar «evidencia» para respaldar su reclamo, como un pasaporte nacional o una licencia de conducir.

Pero hay problemas con este enfoque, principalmente la falta de privacidad. La información de identificación personal (PII) compartida con servicios de terceros se almacena en bases de datos centrales, que son vulnerables a los hackeos. Dado que el robo de identidad se está convirtiendo en un problema crítico, hay llamados a favor de medios que protejan más la privacidad al compartir información confidencial.

Las pruebas de conocimiento cero resuelven este problema al **eliminar la necesidad de revelar información para probar la validez de los reclamos**. El protocolo de conocimiento cero utiliza la afirmación (llamada «testigo») como entrada para generar una prueba sucinta de su validez. Esta prueba proporciona fuertes garantías de que una afirmación es cierta sin exponer la información utilizada para crearla.

Volviendo a nuestro ejemplo anterior, la única evidencia que necesita para probar su reclamo de ciudadanía es una prueba de conocimiento cero. El verificador solo tiene que comprobar si ciertas propiedades de la prueba son ciertas para convencerse de que la afirmación subyacente también lo es.

## Casos de uso para las pruebas de conocimiento cero {#use-cases-for-zero-knowledge-proofs}

### Pagos anónimos {#anonymous-payments}

Los pagos con tarjeta de crédito a menudo son visibles para múltiples partes, incluido el proveedor de pagos, los bancos y otras partes interesadas (por ejemplo, las autoridades gubernamentales). Si bien la vigilancia financiera tiene beneficios para identificar actividades ilegales, también socava la privacidad de los ciudadanos comunes.

Las criptomonedas tenían la intención de proporcionar un medio para que los usuarios realizaran transacciones privadas entre pares. Pero la mayoría de las transacciones de criptomonedas son abiertamente visibles en las cadenas de bloques públicas. Las identidades de los usuarios a menudo son seudónimas y están vinculadas voluntariamente a identidades del mundo real (por ejemplo, al incluir direcciones de ETH en perfiles de Twitter o GitHub) o pueden asociarse con identidades del mundo real utilizando análisis básicos de datos en cadena y fuera de la cadena.

Existen «monedas de privacidad» específicas diseñadas para transacciones completamente anónimas. Las cadenas de bloques centradas en la privacidad, como Zcash y Monero, ocultan los detalles de la transacción, incluidas las direcciones del remitente/receptor, el tipo de activo, la cantidad y la línea de tiempo de la transacción.

Al integrar la tecnología de conocimiento cero en el protocolo, las redes de [cadena de bloques](/glossary/#blockchain) centradas en la privacidad permiten a los [nodos](/glossary/#node) validar transacciones sin necesidad de acceder a los datos de la transacción. [EIP-7503](https://eips.ethereum.org/EIPS/eip-7503) es un ejemplo de un diseño propuesto que permitirá transferencias privadas nativas de valor en la cadena de bloques de [Ethereum](/). Sin embargo, tales propuestas son difíciles de implementar debido a una mezcla de preocupaciones de seguridad, regulatorias y de experiencia del usuario (UX).  

**Las pruebas de conocimiento cero también se están aplicando para anonimizar transacciones en cadenas de bloques públicas**. Un ejemplo es Tornado Cash, un servicio descentralizado y sin custodia que permite a los usuarios realizar transacciones privadas en Ethereum. Tornado Cash utiliza pruebas de conocimiento cero para ofuscar los detalles de la transacción y garantizar la privacidad financiera. Desafortunadamente, debido a que estas son herramientas de privacidad «opcionales», están asociadas con actividades ilícitas. Para superar esto, la privacidad eventualmente tiene que convertirse en la opción predeterminada en las cadenas de bloques públicas. Obtenga más información sobre la [privacidad en Ethereum](/privacy/).

### Protección de identidad {#identity-protection}

Los sistemas actuales de gestión de identidad ponen en riesgo la información personal. Las pruebas de conocimiento cero pueden ayudar a las personas a validar su identidad mientras protegen los detalles confidenciales.

Las pruebas de conocimiento cero son particularmente útiles en el contexto de la [identidad descentralizada](/decentralized-identity/). La identidad descentralizada (también descrita como «identidad autosoberana») le da al individuo la capacidad de controlar el acceso a los identificadores personales. Probar su ciudadanía sin revelar su identificación fiscal o los detalles de su pasaporte es un buen ejemplo de cómo la tecnología de conocimiento cero permite la identidad descentralizada.

<Alert variant="info">
  <AlertEmoji text="💡" />
  <AlertContent>
    <AlertTitle className="mb-2">
      ZKP + Identidad en acción: Identidad Digital Nacional (NDI) de Bután en Ethereum
    </AlertTitle>
    <AlertDescription>
      <p>
        Un ejemplo del mundo real del uso de ZKP (pruebas de conocimiento cero) para sistemas de gestión de identidad es el sistema de Identidad Digital Nacional (NDI) del Reino de Bután, construido en Ethereum. El NDI de Bután utiliza ZKP para permitir a los ciudadanos probar criptográficamente hechos sobre sí mismos, como «Soy ciudadano» o «Tengo más de 18 años», sin revelar los datos personales confidenciales de su identificación.
      </p>
      <p>
        Obtenga más información sobre el NDI de Bután en el <a href="/decentralized-identity/#national-and-government-id">estudio de caso de Identidad Descentralizada</a>.
      </p>
    </AlertDescription>
  </AlertContent>
</Alert>

### Prueba de humanidad {#proof-of-humanity}

Uno de los ejemplos más utilizados de pruebas de conocimiento cero en acción en la actualidad es el [protocolo World ID](https://world.org/blog/world/world-id-faqs), que puede considerarse como «un pasaporte digital global para la era de la IA». Permite a las personas probar que son individuos únicos sin revelar información personal. Esto se logra a través de un dispositivo llamado Orb, que escanea el iris de una persona y genera un código de iris. El código de iris se comprueba y verifica para confirmar que la persona es un ser humano biológicamente único. Después de la verificación, un compromiso de identidad generado en el dispositivo del usuario (y no vinculado ni derivado de los datos biométricos) se agrega a una lista segura en la cadena de bloques. Luego, cada vez que el usuario quiera probar que es un humano verificado, ya sea para iniciar sesión, emitir un voto o realizar otras acciones, puede generar una prueba de conocimiento cero que confirme su membresía en la lista. La belleza de usar una prueba de conocimiento cero es que solo se revela una afirmación: esta persona es única. Todo lo demás se mantiene en privacidad.

World ID se basa en el [protocolo Semaphore](https://docs.semaphore.pse.dev/) desarrollado por el [equipo de PSE](https://pse.dev/) en la Fundación Ethereum. Semaphore está diseñado para ser una forma ligera pero poderosa de generar y verificar pruebas de conocimiento cero. Permite a los usuarios probar que son parte de un grupo (en este caso, humanos verificados) sin mostrar qué miembro del grupo son. Semaphore también es muy flexible, lo que permite crear grupos basados en una amplia gama de criterios, como la verificación de identidad, la participación en eventos o la propiedad de credenciales.

### Autenticación {#authentication}

El uso de servicios en línea requiere probar su identidad y derecho a acceder a esas plataformas. Esto a menudo requiere proporcionar información personal, como nombres, direcciones de correo electrónico, fechas de nacimiento, etc. También es posible que deba memorizar contraseñas largas o arriesgarse a perder el acceso.

Las pruebas de conocimiento cero, sin embargo, pueden simplificar la autenticación tanto para las plataformas como para los usuarios. Una vez que se ha generado una prueba ZK utilizando entradas públicas (por ejemplo, datos que atestiguan la membresía del usuario en la plataforma) y entradas privadas (por ejemplo, los detalles del usuario), el usuario simplemente puede presentarla para autenticar su identidad cuando necesite acceder al servicio. Esto mejora la experiencia de los usuarios y libera a las organizaciones de la necesidad de almacenar grandes cantidades de información de los usuarios.

### Computación verificable {#verifiable-computation}

La computación verificable es otra aplicación de la tecnología de conocimiento cero para mejorar los diseños de las cadenas de bloques. La computación verificable nos permite subcontratar la computación a otra entidad mientras mantenemos resultados verificables. La entidad envía el resultado junto con una prueba que verifica que el programa se ejecutó correctamente.

La computación verificable es **crítica para mejorar las velocidades de procesamiento en las cadenas de bloques** sin reducir la seguridad. Entender esto requiere conocer las diferencias en las soluciones propuestas para escalar Ethereum.

Las [soluciones de escalado en cadena](/developers/docs/scaling/#onchain-scaling), como la cadena de fragmentos (sharding), requieren una modificación extensa de la capa base de la cadena de bloques. Sin embargo, este enfoque es muy complejo y los errores en la implementación pueden socavar el modelo de seguridad de Ethereum.

Las [soluciones de escalado fuera de la cadena](/developers/docs/scaling/#offchain-scaling) no requieren rediseñar el protocolo central de Ethereum. En su lugar, se basan en un modelo de computación subcontratada para mejorar la capacidad de procesamiento en la capa base de Ethereum.

Así es como funciona en la práctica:

- En lugar de procesar cada transacción, Ethereum descarga la ejecución a una cadena separada.

- Después de procesar las transacciones, la otra cadena devuelve los resultados para que se apliquen al estado de Ethereum.

El beneficio aquí es que Ethereum no tiene que realizar ninguna ejecución y solo necesita aplicar los resultados de la computación subcontratada a su estado. Esto reduce la congestión de la red y también mejora las velocidades de transacción (los protocolos fuera de la cadena se optimizan para una ejecución más rápida).

La cadena necesita una forma de validar las transacciones fuera de la cadena sin volver a ejecutarlas, o de lo contrario se pierde el valor de la ejecución fuera de la cadena.

Aquí es donde entra en juego la computación verificable. Cuando un nodo ejecuta una transacción fuera de Ethereum, envía una prueba de conocimiento cero para probar la corrección de la ejecución fuera de la cadena. Esta prueba (llamada [prueba de validez](/glossary/#validity-proof)) garantiza que una transacción es válida, lo que permite a Ethereum aplicar el resultado a su estado, sin esperar a que nadie lo dispute.

Los [rollups de conocimiento cero](/developers/docs/scaling/zk-rollups) y los [validiums](/developers/docs/scaling/validium/) son dos soluciones de escalado fuera de la cadena que utilizan pruebas de validez para proporcionar una escalabilidad segura. Estos protocolos ejecutan miles de transacciones fuera de la cadena y envían pruebas para su verificación en Ethereum. Esos resultados se pueden aplicar inmediatamente una vez que se verifica la prueba, lo que permite a Ethereum procesar más transacciones sin aumentar la computación en la capa base.

Más allá del escalado de la capa 2 (l2), las pruebas de conocimiento cero también pueden verificar la ejecución del bloque de la capa 1 (l1) de Ethereum en sí. La [zkEVM para la verificación de l1](/roadmap/zkevm/) permitiría a los validadores verificar bloques comprobando una prueba en lugar de volver a ejecutar todas las transacciones, lo que permitiría límites de gas más altos sin aumentar los requisitos de hardware del validador.

### Reducción del soborno y la colusión en la votación en cadena {#secure-blockchain-voting}

Los esquemas de votación en cadenas de bloques tienen muchas características favorables: son totalmente auditables, seguros contra ataques, resistentes a la censura y libres de restricciones geográficas. Pero incluso los esquemas de votación en cadena no son inmunes al problema de la **colusión**.

Definida como «coordinarse para limitar la competencia abierta engañando, defraudando y confundiendo a otros», la colusión puede tomar la forma de un actor malicioso que influye en la votación ofreciendo sobornos. Por ejemplo, Alice podría recibir un soborno de Bob para emitir un voto por `option B` en una boleta, incluso si prefiere `option A`.

El soborno y la colusión limitan la eficacia de cualquier proceso que utilice la votación como mecanismo de señalización (especialmente cuando los usuarios pueden probar cómo emitieron su voto). Esto puede tener consecuencias significativas, especialmente cuando los votos son responsables de asignar recursos escasos.

Por ejemplo, los [mecanismos de financiamiento cuadrático](https://www.radicalxchange.org/wiki/plural-funding/) se basan en donaciones para medir la preferencia por ciertas opciones entre diferentes proyectos de bien público. Cada donación cuenta como un «voto» para un proyecto específico, y los proyectos que reciben más votos obtienen más fondos del fondo de contrapartida.

El uso de la votación en cadena hace que el financiamiento cuadrático sea susceptible a la colusión: las transacciones de la cadena de bloques son públicas, por lo que los sobornadores pueden inspeccionar la actividad en cadena de un sobornado para ver cómo «votó». De esta manera, el financiamiento cuadrático deja de ser un medio eficaz para asignar fondos en función de las preferencias agregadas de la comunidad.

Afortunadamente, las soluciones más nuevas como MACI (Infraestructura Mínima Anticolusión) están utilizando pruebas de conocimiento cero para hacer que la votación en cadena (por ejemplo, los mecanismos de financiamiento cuadrático) sea resistente al soborno y la colusión. MACI es un conjunto de contratos inteligentes y scripts que permiten a un administrador central (llamado «coordinador») agregar votos y contar los resultados _sin_ revelar detalles sobre cómo votó cada individuo. Aun así, todavía es posible verificar que los votos se contaron correctamente o confirmar que un individuo en particular participó en la ronda de votación.

#### ¿Cómo funciona MACI con las pruebas de conocimiento cero? {#how-maci-works-with-zk-proofs}

Al principio, el coordinador implementa el contrato MACI en Ethereum, después de lo cual los usuarios pueden registrarse para la votación (registrando su clave pública en el contrato inteligente). Los usuarios emiten votos enviando mensajes cifrados con su clave pública al contrato inteligente (un voto válido debe estar firmado con la clave pública más reciente asociada con la identidad del usuario, entre otros criterios). Posteriormente, el coordinador procesa todos los mensajes una vez que finaliza el período de votación, cuenta los votos y verifica los resultados en cadena.

En MACI, las pruebas de conocimiento cero se utilizan para garantizar la corrección de la computación al hacer imposible que el coordinador procese incorrectamente los votos y cuente los resultados. Esto se logra al requerir que el coordinador genere pruebas ZK-SNARK verificando que a) todos los mensajes se procesaron correctamente b) el resultado final corresponde a la suma de todos los votos _válidos_.

Por lo tanto, incluso sin compartir un desglose de los votos por usuario (como suele ser el caso), MACI garantiza la integridad de los resultados calculados durante el proceso de recuento. Esta característica es útil para reducir la eficacia de los esquemas básicos de colusión. Podemos explorar esta posibilidad utilizando el ejemplo anterior de Bob sobornando a Alice para que emita un voto por una opción:

- Alice se registra para la votación enviando su clave pública a un contrato inteligente.
- Alice acepta emitir un voto por `option B` a cambio de un soborno de Bob.
- Alice emite un voto por `option B`.
- Alice envía en secreto una transacción cifrada para cambiar la clave pública asociada con su identidad.
- Alice envía otro mensaje (cifrado) al contrato inteligente emitiendo un voto por `option A` utilizando la nueva clave pública.
- Alice le muestra a Bob una transacción que demuestra que emitió un voto por `option B` (lo cual es inválido ya que la clave pública ya no está asociada con la identidad de Alice en el sistema).
- Al procesar los mensajes, el coordinador omite el voto de Alice por `option B` y cuenta solo el voto por `option A`. Por lo tanto, el intento de Bob de coludir con Alice y manipular el voto en cadena fracasa.

El uso de MACI _sí_ requiere confiar en que el coordinador no coludirá con los sobornadores ni intentará sobornar a los votantes por sí mismo. El coordinador puede descifrar los mensajes de los usuarios (necesario para crear la prueba), por lo que puede verificar con precisión cómo votó cada persona.

Pero en los casos en que el coordinador sigue siendo honesto, MACI representa una herramienta poderosa para garantizar la santidad de la votación en cadena. Esto explica su popularidad entre las aplicaciones de financiamiento cuadrático (por ejemplo, [clr.fund](https://clr.fund/#/about/maci)) que dependen en gran medida de la integridad de las opciones de votación de cada individuo.

[Obtenga más información sobre MACI](https://maci.pse.dev/).

## ¿Cómo funcionan las pruebas de conocimiento cero? {#how-do-zero-knowledge-proofs-work}

Una prueba de conocimiento cero le permite probar la verdad de una afirmación sin compartir el contenido de la afirmación ni revelar cómo descubrió la verdad. Para hacer esto posible, los protocolos de conocimiento cero se basan en algoritmos que toman algunos datos como entrada y devuelven «verdadero» o «falso» como salida.

Un protocolo de conocimiento cero debe cumplir con los siguientes criterios:

1. **Integridad**: Si la entrada es válida, el protocolo de conocimiento cero siempre devuelve «verdadero». Por lo tanto, si la afirmación subyacente es cierta, y el probador y el verificador actúan honestamente, la prueba puede ser aceptada.

2. **Solidez**: Si la entrada es inválida, es teóricamente imposible engañar al protocolo de conocimiento cero para que devuelva «verdadero». Por lo tanto, un probador mentiroso no puede engañar a un verificador honesto para que crea que una afirmación inválida es válida (excepto con un margen de probabilidad minúsculo).

3. **Conocimiento cero**: El verificador no aprende nada sobre una afirmación más allá de su validez o falsedad (tienen «conocimiento cero» de la afirmación). Este requisito también evita que el verificador derive la entrada original (el contenido de la afirmación) a partir de la prueba.

En su forma básica, una prueba de conocimiento cero se compone de tres elementos: **testigo**, **desafío** y **respuesta**.

- **Testigo**: Con una prueba de conocimiento cero, el probador quiere probar el conocimiento de alguna información oculta. La información secreta es el «testigo» de la prueba, y el conocimiento asumido del testigo por parte del probador establece un conjunto de preguntas que solo pueden ser respondidas por una parte con conocimiento de la información. Por lo tanto, el probador inicia el proceso de prueba eligiendo aleatoriamente una pregunta, calculando la respuesta y enviándola al verificador.

- **Desafío**: El verificador elige aleatoriamente otra pregunta del conjunto y le pide al probador que la responda.

- **Respuesta**: El probador acepta la pregunta, calcula la respuesta y se la devuelve al verificador. La respuesta del probador permite al verificador comprobar si el primero realmente tiene acceso al testigo. Para asegurarse de que el probador no esté adivinando a ciegas y obteniendo las respuestas correctas por casualidad, el verificador elige más preguntas para hacer. Al repetir esta interacción muchas veces, la posibilidad de que el probador finja el conocimiento del testigo disminuye significativamente hasta que el verificador esté satisfecho.

Lo anterior describe la estructura de una «prueba de conocimiento cero interactiva». Los primeros protocolos de conocimiento cero utilizaban pruebas interactivas, donde la verificación de la validez de una afirmación requería una comunicación de ida y vuelta entre probadores y verificadores.

Un buen ejemplo que ilustra cómo funcionan las pruebas interactivas es la famosa [historia de la cueva de Alí Babá](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) de Jean-Jacques Quisquater. En la historia, Peggy (la probadora) quiere probarle a Victor (el verificador) que conoce la frase secreta para abrir una puerta mágica sin revelar la frase.

### Pruebas de conocimiento cero no interactivas {#non-interactive-zero-knowledge-proofs}

Si bien fue revolucionaria, la prueba interactiva tuvo una utilidad limitada, ya que requería que las dos partes estuvieran disponibles e interactuaran repetidamente. Incluso si un verificador estaba convencido de la honestidad de un probador, la prueba no estaría disponible para una verificación independiente (calcular una nueva prueba requería un nuevo conjunto de mensajes entre el probador y el verificador).

Para resolver este problema, Manuel Blum, Paul Feldman y Silvio Micali sugirieron las primeras [pruebas de conocimiento cero no interactivas](https://dl.acm.org/doi/10.1145/62212.62222) donde el probador y el verificador tienen una clave compartida. Esto permite al probador demostrar su conocimiento de alguna información (es decir, el testigo) sin proporcionar la información en sí.

A diferencia de las pruebas interactivas, las pruebas no interactivas requerían solo una ronda de comunicación entre los participantes (probador y verificador). El probador pasa la información secreta a un algoritmo especial para calcular una prueba de conocimiento cero. Esta prueba se envía al verificador, quien comprueba que el probador conoce la información secreta utilizando otro algoritmo.

La prueba no interactiva reduce la comunicación entre el probador y el verificador, lo que hace que las pruebas ZK sean más eficientes. Además, una vez que se genera una prueba, está disponible para que cualquier otra persona (con acceso a la clave compartida y al algoritmo de verificación) la verifique.

Las pruebas no interactivas representaron un gran avance para la tecnología de conocimiento cero y estimularon el desarrollo de los sistemas de prueba que se utilizan en la actualidad. A continuación, analizamos estos tipos de pruebas:

### Tipos de pruebas de conocimiento cero {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

ZK-SNARK es un acrónimo de **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge** (Argumento de conocimiento no interactivo, sucinto y de conocimiento cero). El protocolo ZK-SNARK tiene las siguientes cualidades:

- **Conocimiento cero**: Un verificador puede validar la integridad de una afirmación sin saber nada más sobre la afirmación. El único conocimiento que tiene el verificador de la afirmación es si es verdadera o falsa.

- **Sucinto**: La prueba de conocimiento cero es más pequeña que el testigo y se puede verificar rápidamente.

- **No interactivo**: La prueba es «no interactiva» porque el probador y el verificador solo interactúan una vez, a diferencia de las pruebas interactivas que requieren múltiples rondas de comunicación.

- **Argumento**: La prueba satisface el requisito de «solidez», por lo que hacer trampa es extremadamente improbable.

- **(De) Conocimiento**: La prueba de conocimiento cero no se puede construir sin acceso a la información secreta (testigo). Es difícil, si no imposible, que un probador que no tiene el testigo calcule una prueba de conocimiento cero válida.

La «clave compartida» mencionada anteriormente se refiere a los parámetros públicos que el probador y el verificador acuerdan utilizar para generar y verificar pruebas. La generación de los parámetros públicos (conocidos colectivamente como Cadena de Referencia Común o CRS) es una operación delicada debido a su importancia en la seguridad del protocolo. Si la entropía (aleatoriedad) utilizada para generar el CRS cae en manos de un probador deshonesto, este puede calcular pruebas falsas.

La [computación multipartita (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) es una forma de reducir los riesgos en la generación de parámetros públicos. Múltiples partes participan en una [ceremonia de configuración confiable](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), donde cada persona aporta algunos valores aleatorios para generar el CRS. Siempre que una parte honesta destruya su porción de la entropía, el protocolo ZK-SNARK conserva la solidez computacional.

Las configuraciones confiables requieren que los usuarios confíen en los participantes en la generación de parámetros. Sin embargo, el desarrollo de los ZK-STARK ha permitido protocolos de prueba que funcionan con una configuración no confiable.

#### ZK-STARKs {#zk-starks}

ZK-STARK es un acrónimo de **Zero-Knowledge Scalable Transparent Argument of Knowledge** (Argumento de conocimiento transparente, escalable y de conocimiento cero). Los ZK-STARK son similares a los ZK-SNARK, excepto que son:

- **Escalables**: ZK-STARK es más rápido que ZK-SNARK en la generación y verificación de pruebas cuando el tamaño del testigo es mayor. Con las pruebas STARK, los tiempos del probador y de verificación solo aumentan ligeramente a medida que crece el testigo (los tiempos del probador y verificador de SNARK aumentan linealmente con el tamaño del testigo).

- **Transparentes**: ZK-STARK se basa en la aleatoriedad verificable públicamente para generar parámetros públicos para la prueba y la verificación en lugar de una configuración confiable. Por lo tanto, son más transparentes en comparación con los ZK-SNARK.

Los ZK-STARK producen pruebas más grandes que los ZK-SNARK, lo que significa que generalmente tienen mayores gastos generales de verificación. Sin embargo, hay casos (como la prueba de grandes conjuntos de datos) en los que los ZK-STARK pueden ser más rentables que los ZK-SNARK.

## Inconvenientes del uso de pruebas de conocimiento cero {#drawbacks-of-using-zero-knowledge-proofs}

### Costos de hardware {#hardware-costs}

La generación de pruebas de conocimiento cero implica cálculos muy complejos que se realizan mejor en máquinas especializadas. Como estas máquinas son caras, a menudo están fuera del alcance de las personas comunes. Además, las aplicaciones que desean utilizar la tecnología de conocimiento cero deben tener en cuenta los costos de hardware, lo que puede aumentar los costos para los usuarios finales.

### Costos de verificación de pruebas {#proof-verification-costs}

La verificación de pruebas también requiere una computación compleja y aumenta los costos de implementación de la tecnología de conocimiento cero en las aplicaciones. Este costo es particularmente relevante en el contexto de la prueba de computación. Por ejemplo, los rollups de conocimiento cero pagan ~ 500.000 de gas para verificar una sola prueba ZK-SNARK en Ethereum, y los ZK-STARK requieren tarifas aún más altas.

### Supuestos de confianza {#trust-assumptions}

En ZK-SNARK, la Cadena de Referencia Común (parámetros públicos) se genera una vez y está disponible para su reutilización por las partes que deseen participar en el protocolo de conocimiento cero. Los parámetros públicos se crean a través de una ceremonia de configuración confiable, donde se asume que los participantes son honestos.

Pero en realidad no hay forma de que los usuarios evalúen la honestidad de los participantes y los usuarios tienen que confiar en la palabra de los desarrolladores. Los ZK-STARK están libres de supuestos de confianza, ya que la aleatoriedad utilizada para generar la cadena es verificable públicamente. Mientras tanto, los investigadores están trabajando en configuraciones no confiables para los ZK-SNARK para aumentar la seguridad de los mecanismos de prueba.

### Amenazas de la computación cuántica {#quantum-computing-threats}

ZK-SNARK utiliza la criptografía de curva elíptica para el cifrado. Si bien se asume que el problema del logaritmo discreto de curva elíptica es intratable por ahora, el desarrollo de computadoras cuánticas podría romper este modelo de seguridad en el futuro.

ZK-STARK se considera inmune a la amenaza de la computación cuántica, ya que solo se basa en funciones hash resistentes a colisiones para su seguridad. A diferencia de los emparejamientos de claves pública-privada utilizados en la criptografía de curva elíptica, el hashing resistente a colisiones es más difícil de romper para los algoritmos de computación cuántica.

## Más información {#further-reading}

- [Descripción general de los casos de uso de las pruebas de conocimiento cero](https://pse.dev/projects) — _Equipo de Exploraciones de Privacidad y Escalado_
- [SNARK vs. STARK vs. SNARK recursivos](https://www.alchemy.com/overviews/snarks-vs-starks) — _Descripciones generales de Alchemy_
- [Una prueba de conocimiento cero: mejora de la privacidad en una cadena de bloques](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARK: un ejemplo realista de conocimiento cero y una inmersión profunda](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARK: cree confianza verificable, incluso contra computadoras cuánticas](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [Una introducción aproximada a cómo son posibles los zk-SNARK](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Por qué las pruebas de conocimiento cero (ZKP) cambian las reglas del juego para la identidad autosoberana](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_
- [Explicación de EIP-7503: habilitación de transferencias privadas en Ethereum con pruebas ZK](https://research.2077.xyz/eip-7503-zero-knowledge-wormholes-for-private-ethereum-transactions#introduction) — _Emmanuel Awosika_
- [Juego de cartas ZK: juego para aprender los fundamentos de ZK y casos de uso de la vida real](https://github.com/ZK-card/zk-cards) - _ZK-Cards_
