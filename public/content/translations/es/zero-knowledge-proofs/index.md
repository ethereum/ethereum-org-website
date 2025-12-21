---
title: Pruebas de conocimiento cero
description: Una introducción no técnica a las pruebas de conocimiento cero para principiantes.
lang: es
---

# ¿Qué son las pruebas de conocimiento cero? {#what-are-zk-proofs}

Una prueba de conocimiento cero es una forma de probar la validez de una sentencia sin revelar la sentencia en sí. El "probador" (también conocido como tirador de pruebas) es la parte que intenta probar o demostrar una afirmación, mientras que el "verificador" es el responsable de validarla.

Las pruebas de conocimiento cero aparecieron por primera vez en un artículo de 1985, «[La complejidad del conocimiento de los sistemas de prueba interactivos](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)», que proporciona una definición de las pruebas de conocimiento cero ampliamente utilizada en la actualidad:

> Un protocolo de conocimiento cero es un método por el cual una parte (el probador) **puede demostrar** a otra parte (el verificador) **que algo es verdadero, sin revelar ninguna información** aparte del hecho de que esta afirmación específica es verdadera.

Las pruebas de conocimiento cero han mejorado con los años y ahora se están utilizando en varias aplicaciones del mundo real.

<YouTube id="fOGdb1CTu5c" />

## ¿Por qué necesitamos pruebas de conocimiento cero? {#why-zero-knowledge-proofs-are-important}

Las pruebas de conocimiento cero representaron un gran avance en la criptografía aplicada, ya que prometieron mejorar la seguridad de la información para las personas. Considere cómo podría demostrar una afirmación (por ejemplo, “Soy ciudadano de un país X”) a otra parte (por ejemplo, un proveedor de servicios). Tendría que proporcionar evidencia para respaldar su afirmación, como un pasaporte nacional o una licencia de conducir.

Pero hay problemas con este enfoque, principalmente la falta de privacidad. La Información Personal Identificable (PII) compartida con servicios de terceros se almacena en bases de datos centrales, las cuales son vulnerables a los hackeos. Teniendo en cuenta que el robo de identidad se está convirtiendo en un problema crítico, surge la necesidad de más medios de protección de la privacidad para compartir información confidencial.

Las pruebas de conocimiento cero resuelven este problema al **eliminar la necesidad de revelar información para probar la validez de las afirmaciones**. El protocolo de conocimiento cero utiliza la declaración (llamada "testigo") como entrada para generar una prueba sucinta de su validez. Esta prueba proporciona garantías sólidas de que una declaración es cierta sin exponer la información utilizada en su creación.

Volviendo a nuestro ejemplo anterior, la única evidencia que usted necesita para probar su declaración de ciudadanía es una prueba de conocimiento cero. El verificador solo tiene que comprobar si ciertas propiedades de la prueba son verdaderas para estar convencido de que la sentencia subyacente también es verdadera.

## Casos de uso para las pruebas de conocimiento cero {#use-cases-for-zero-knowledge-proofs}

### Pagos anónimos {#anonymous-payments}

Los pagos con tarjeta de crédito a menudo son visibles para varias partes, incluyendo el proveedor de pagos, los bancos y otras partes interesadas (por ejemplo, las autoridades gubernamentales). Si bien la vigilancia financiera tiene beneficios para identificar la actividad ilegal, también quebranta la privacidad de los ciudadanos ordinarios.

Las criptomonedas tuvieron por objetivo proporcionar un medio para que los usuarios realizaran transacciones privadas entre pares. Pero la mayoría de las transacciones de criptomonedas son abiertamente visibles en las cadenas de bloques públicas. Las identidades de los usuarios suelen ser seudónimas y, o bien se vinculan deliberadamente a identidades del mundo real (p. ej., al incluir direcciones de ETH en perfiles de Twitter o GitHub), o bien pueden asociarse a ellas mediante un análisis de datos básico dentro y fuera de la cadena.

Existen "monedas de privacidad" específicas diseñadas para transacciones completamente anónimas. Las cadenas de bloques centradas en la privacidad, como Zcash y Monero, protegen los detalles de las transacciones, lo que incluye direcciones de remitente/receptor, tipo de activo, cantidad y cronograma de la transacción.

Al incorporar la tecnología de conocimiento cero en el protocolo, las redes de [cadenas de bloques](/glossary/#blockchain) centradas en la privacidad permiten a los [nodos](/glossary/#node) validar transacciones sin necesidad de acceder a los datos de las mismas. [EIP-7503](https://eips.ethereum.org/EIPS/eip-7503) es un ejemplo de un diseño propuesto que permitirá transferencias de valor privadas y nativas en la cadena de bloques de Ethereum. Estas propuestas son, sin embargo, difíciles de aplicar debido a una conjunción de factores de seguridad, reglamentación y experiencia de usuario.

**Las pruebas de conocimiento cero también se están aplicando a la anonimización de transacciones en las cadenas de bloques públicas**. Un ejemplo es Tornado Cash, un servicio descentralizado y no custodiado que permite a los usuarios realizar transacciones privadas en Ethereum. Tornado Cash utiliza pruebas de conocimiento cero para ocultar los detalles de la transacción y garantizar la privacidad financiera. Desafortunadamente, debido a que se trata de herramientas de privacidad "opt-in", se asocian con actividades ilícitas. Para superar esto, la privacidad eventualmente debe convertirse en la opción predeterminada en las cadenas de bloques públicas. Obtenga más información sobre [la privacidad en Ethereum](/privacy/).

### Protección de la identidad {#identity-protection}

Los sistemas actuales de gestión de identidad ponen en peligro la información personal. Las pruebas de conocimiento cero pueden ayudar a los individuos a validar la identidad al tiempo que protegen los detalles sensibles.

Las pruebas de conocimiento cero son particularmente útiles en el contexto de la [identidad descentralizada](/decentralized-identity/). La identidad descentralizada (también descrita como "identidad autosoberana") da al individuo la capacidad de controlar el acceso a los identificadores personales. La demostración de su ciudadanía sin revelar su identificación fiscal o los datos de su pasaporte es un buen ejemplo de cómo la tecnología de conocimiento cero permite la identidad descentralizada.

<Alert variant="info">
  <AlertEmoji text="💡" />
  <AlertContent>
    <AlertTitle className="mb-2">
      ZKP + Identidad en acción: ID digital nacional (NDI) de Bután en Ethereum
    </AlertTitle>
    <AlertDescription>
      <p>
        Un ejemplo del mundo real del uso de ZKP para sistemas de gestión de identidad es el sistema de identificación digital nacional (NDI) del Reino de Bután, construido sobre Ethereum. El NDI de Bután utiliza ZKP para permitir a los ciudadanos demostrar criptográficamente hechos sobre sí mismos, como "soy ciudadano" o "soy mayor de 18 años", sin revelar los datos personales sensibles de su identificación.
      </p>
      <p>
        Obtenga más información sobre el NDI de Bután en el <a href="/decentralized-identity/#national-and-government-id">caso de estudio sobre identidad descentralizada</a>.
      </p>
</AlertDescription>
</AlertContent>
</Alert>

### Prueba de humanidad {#proof-of-humanity}

Uno de los ejemplos más utilizados de las pruebas de conocimiento cero en acción hoy en día es el [protocolo World ID](https://world.org/blog/world/world-id-faqs), que puede considerarse como «un pasaporte digital global para la era de la IA». Este protocolo permite a las personas demostrar que son individuos únicos sin revelar información personal. Para ello se utiliza un dispositivo denominado Orb, que escanea el iris de una persona y genera un código de iris. El código del iris se consulta y verifica para confirmar que la persona es un ser humano biológicamente único. Después de la verificación, un compromiso de identidad generado en el dispositivo del usuario (que no está vinculado o deriva de los datos biométricos) se añade a una lista segura en la cadena de bloques. A partir de entonces, cada vez que el usuario quiera demostrar que es un humano verificado –ya sea para iniciar sesión, votar o realizar otras acciones– podrá generar una prueba de conocimiento cero que confirme su pertenencia en la lista. La ventaja de utilizar una prueba de conocimiento cero es que solo se pone en evidencia una afirmación: esta persona es única. Todo lo demás sigue siendo privado.

World ID se basa en el [protocolo Semaphore](https://docs.semaphore.pse.dev/) desarrollado por el [equipo de PSE](https://pse.dev/) de la Fundación Ethereum. Semaphore está diseñado para ser una forma ligera pero potente de generar y verificar pruebas de conocimiento cero. Permite a los usuarios demostrar que forman parte de un grupo (en este caso, humanos verificados) sin mostrar qué miembro del grupo son. Semaphore también es muy flexible, ya que permite crear grupos basados en una amplia gama de criterios, como la verificación de la identidad, la participación en eventos o la propiedad de credenciales.

### Autenticación {#authentication}

Usar servicios en línea requiere probar su identidad y el derecho a acceder a esas plataformas. Esto requiere a menudo proporcionar información personal, como nombres, direcciones de correo electrónico, fechas de nacimiento, etc. También puede que necesite memorizar contraseñas largas o arriesgarse a perder acceso.

Las pruebas de conocimiento cero, sin embargo, pueden simplificar la autenticación tanto para plataformas como para usuarios. Una vez que se ha generado una prueba de conocimiento cero utilizando entradas públicas (por ejemplo, datos que certifiquen la membresía del usuario en la plataforma) y entradas privadas (por ejemplo, los datos del usuario), el usuario puede simplemente presentarla para autenticar su identidad cuando necesite acceder al servicio. Esto mejora la experiencia de los usuarios y libera a las organizaciones de la necesidad de almacenar grandes cantidades de información de los usuarios.

### Computación verificable {#verifiable-computation}

El cómputo o cálculo verificable es otra aplicación de tecnología de conocimiento cero para mejorar los diseños de las cadenas de bloques. El cómputo verificable nos permite externalizar el cálculo a otra entidad manteniendo al mismo tiempo resultados verificables. La entidad envía el resultado junto con una prueba que verifica que el programa se ejecutó correctamente.

La computación verificable es **fundamental para mejorar la velocidad de procesamiento en las cadenas de bloques** sin reducir la seguridad. Entender esto requiere conocer las diferencias en las soluciones propuestas para el escalamiento de Ethereum.

Las [soluciones de escalado en la cadena](/developers/docs/scaling/#onchain-scaling), como el sharding, requieren una modificación extensa de la capa base de la cadena de bloques. Sin embargo, este enfoque es muy complejo, y los errores en la aplicación pueden socavar el modelo de seguridad de Ethereum.

Las [soluciones de escalado fuera de la cadena](/developers/docs/scaling/#offchain-scaling) no requieren rediseñar el protocolo principal de Ethereum. En cambio, se basan en un modelo de cálculo externalizado para mejorar el rendimiento en la capa base de Ethereum.

Así es como funciona esto en la práctica:

- En lugar de procesar cada transacción, Ethereum descarga la ejecución a una cadena separada.

- Después de procesar las transacciones, la otra cadena devuelve los resultados que deben aplicarse al estado de Ethereum.

El beneficio aquí es que Ethereum no tiene que realizar ninguna ejecución y solo necesita aplicar los resultados del cálculo externalizado a su estado. Esto reduce la congestión de red y también mejora la velocidad de transacción (los protocolos fuera de la cadena se optimizan para una ejecución más rápida).

La cadena necesita una forma de validar las transacciones fuera de la cadena sin volver a ejecutarlas, o de lo contrario se pierde el valor de la ejecución fuera de la cadena.

Aquí es donde entra en juego el cálculo verificable. Cuando un nodo ejecuta una transacción fuera de Ethereum, presenta una prueba de conocimiento cero para demostrar si la ejecución fuera de la cadena es correcta. Esta prueba (llamada [prueba de validez](/glossary/#validity-proof)) garantiza que una transacción es válida, lo que permite a Ethereum aplicar el resultado a su estado, sin esperar a que nadie lo refute.

Los [rollups de conocimiento cero](/developers/docs/scaling/zk-rollups) y los [validiums](/developers/docs/scaling/validium/) son dos soluciones de escalado fuera de la cadena que utilizan pruebas de validez para proporcionar una escalabilidad segura. Estos protocolos ejecutan miles de transacciones fuera de la cadena y presentan pruebas para su verificación en Ethereum. Estos resultados se pueden aplicar inmediatamente una vez verificada la prueba, lo que permite a Ethereum procesar más transacciones sin aumentar el cálculo en la capa base.

### Reducción del soborno y la colusión en la votación en cadena {#secure-blockchain-voting}

Los esquemas de votación de la cadena de bloques tienen muchas características favorables: son totalmente auditables, son seguros contra los ataques, son resistentes a la censura y están libres de restricciones geográficas. Pero incluso los esquemas de votación en cadena no son inmunes al problema de la **colusión**.

El complot, colusión o conspiración, que se define como la "coordinación para limitar la competencia abierta engañando, defraudando y estafando a los demás", puede adoptar la forma de un actor malicioso que influye en el voto ofreciendo sobornos. Por ejemplo, Alicia podría recibir un soborno de Roberto para votar por la `opción B` en una papeleta, aunque prefiera la `opción A`.

El soborno y el complot limitan la efectividad de cualquier proceso que utilice el voto como mecanismo de señalización (especialmente donde los usuarios pueden demostrar cómo votaron). Esto puede tener consecuencias importantes, especialmente cuando las votaciones están destinadas a asignar recursos escasos.

Por ejemplo, los [mecanismos de financiación cuadrática](https://www.radicalxchange.org/wiki/plural-funding/) se basan en donaciones para medir la preferencia por ciertas opciones entre diferentes proyectos de bienes públicos. Cada donación cuenta como un "voto" para un proyecto específico, y los proyectos que reciben más votos obtienen más fondos del fondo correspondiente.

El uso de la votación en cadena hace que la financiación cuadrática sea susceptible a la confabulación: las transacciones de la cadena de bloques son públicas, por lo que sobornadores puedan inspeccionar la actividad en cadena de un sobornado para ver cómo «votó». De esta manera, la financiación cuadrática deja de ser un medio eficaz para asignar fondos en función de las preferencias agregadas de la comunidad.

Afortunadamente, soluciones más recientes como MACI (Minimum Anti-Collusion Infrastructure) utilizan pruebas de conocimiento cero para que las votaciones en cadena (p. ej., mecanismos de financiación cuadrática) sean resistentes al soborno y a la colusión. MACI es un conjunto de contratos inteligentes y scripts que permiten a un administrador central (llamado «coordinador») agregar votos y contar los resultados _sin_ revelar detalles sobre cómo votó cada individuo. Aun así, todavía es posible verificar que las votaciones se contabilizaron correctamente o confirmar que un individuo en particular participó en la ronda de votaciones.

#### ¿Cómo funciona la MACI con las pruebas de conocimiento cero? {#how-maci-works-with-zk-proofs}

Al principio, el coordinador implementa el contrato de MACI en Ethereum, después de lo cual los usuarios pueden registrarse para votar (registrando su clave pública en el contrato inteligente). Los usuarios votan enviando mensajes cifrados con su clave pública al contrato inteligente (un voto válido debe estar firmado con la clave pública más reciente asociada a la identidad del usuario, entre otros criterios). Después, el coordinador procesa todos los mensajes una vez finalizado el período de votación, cuenta los votos y verifica los resultados en cadena.

En la MACI, las pruebas de conocimiento cero se utilizan para garantizar que el cálculo sea correcto haciendo imposible que el coordinador procese los votos y cuente los resultados incorrectamente. Esto se logra al exigir que el coordinador genere pruebas ZK-SNARK que verifiquen que a) todos los mensajes se procesaron correctamente b) el resultado final corresponde a la suma de todos los votos _válidos_.

Por lo tanto, incluso sin compartir un desglose de los votos por usuario (como suele suceder), la MACI garantiza la integridad de los resultados calculados durante el proceso de recuento. Esta característica es útil para reducir la efectividad de los esquemas de colusión básicos. Podemos explorar esta posibilidad utilizando el ejemplo anterior de Bob sobornando a Alice para que vote a favor de una opción:

- Alice se registra para votar enviando su clave pública a un contrato inteligente.
- Alicia acepta votar por la `opción B` a cambio de un soborno de Roberto.
- Alicia vota por la `opción B`.
- Alice envía secretamente una transacción cifrada para cambiar la clave pública asociada a su identidad.
- Alicia envía otro mensaje (cifrado) al contrato inteligente votando por la `opción A` usando la nueva clave pública.
- Alicia le muestra a Roberto una transacción que demuestra que votó por la `opción B` (que no es válida, ya que la clave pública ya no está asociada con la identidad de Alicia en el sistema).
- Mientras procesa los mensajes, el coordinador omite el voto de Alicia por la `opción B` y solo cuenta el voto por la `opción A`. Por lo tanto, un intento cualquiera de confabulación con Alice y de manipular el voto en cadena fracasaría.

Usar MACI _requiere_ confiar en que el coordinador no se pondrá de acuerdo con los sobornadores ni intentará sobornar a los votantes. El coordinador puede descifrar los mensajes de usuario (necesarios para crear la prueba) y así verificar con precisión cómo votó cada persona.

Pero en los casos en que el coordinador sea honesto, la MACI representa una herramienta potente para garantizar la legalidad de la votación en cadena. Esto explica su popularidad entre las aplicaciones de financiación cuadrática (p. ej., [clr.fund](https://clr.fund/#/about/maci)) que dependen en gran medida de la integridad de las opciones de voto de cada individuo.

[Obtenga más información sobre MACI](https://maci.pse.dev/).

## ¿Cómo funcionan las pruebas de conocimiento cero? {#how-do-zero-knowledge-proofs-work}

Una prueba de conocimiento cero le permite probar la validez de una declaración sin compartir el contenido de la declaración o revelar cómo descubrió la verdad. Para que esto sea posible, los protocolos de conocimiento cero se basan en algoritmos que toman algunos datos como entrada y devuelven como resultado "true" (verdadero) o "false" (falso).

Un protocolo de conocimiento cero debe satisfacer el siguiente criterio:

1. **Completitud**: si la entrada es válida, el protocolo de conocimiento cero siempre devuelve «verdadero». Por lo tanto, si la declaración subyacente es verdadera y el probador y el verificador actúan honestamente, la prueba puede ser aceptada.

2. **Solidez**: si la entrada no es válida, es teóricamente imposible engañar al protocolo de conocimiento cero para que devuelva «verdadero». Por lo tanto, un probador que mienta no puede engañar a un verificador honesto para que crea que una declaración no válida es válida (excepto con un pequeño margen de probabilidad).

3. **Conocimiento cero**: el verificador no aprende nada sobre una declaración más allá de su validez o falsedad (tiene «conocimiento cero» de la declaración). Este requisito también evita que el verificador derive la entrada original (el contenido de la declaración) de la prueba.

En su forma básica, una prueba de conocimiento cero se compone de tres elementos: **testigo**, **desafío** y **respuesta**.

- **Testigo**: con una prueba de conocimiento cero, el probador quiere probar el conocimiento de alguna información oculta. La información secreta es el "testigo" de la prueba, y el conocimiento asumido por el probador del testigo establece un conjunto de preguntas que solo pueden ser respondidas por alguien/una parte con conocimiento de la información. Así, el probador inicia el proceso de prueba eligiendo aleatoriamente una pregunta, calculando la respuesta y enviándola al verificador.

- **Desafío**: el verificador elige al azar otra pregunta del conjunto y le pide al probador que la responda.

- **Respuesta**: el probador acepta la pregunta, calcula la respuesta y se la devuelve al verificador. La respuesta del probador permite al verificador comprobar si el primero realmente tiene acceso al testigo. Para asegurar que el probador no esté adivinando ciegamente y obteniendo las respuestas correctas por casualidad, el verificador elige más preguntas que hacer. Al repetir esta interacción muchas veces, la posibilidad de que el probador falsee el conocimiento del testigo caerá significativamente hasta que el verificador esté satisfecho.

Lo anterior describe la estructura de una "prueba interactiva de conocimiento cero". Los primeros protocolos de conocimiento cero usaban pruebas interactivas en las que la verificación de la validez de una declaración requería comunicación de ida y vuelta entre los probadores y los verificadores.

Un buen ejemplo que ilustra cómo funcionan las pruebas interactivas es la famosa [historia de la cueva de Alí Babá](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) de Jean-Jacques Quisquater. En la historia, Peggy (el probador) quiere demostrar a Victor (el verificador) que conoce la frase secreta para abrir una puerta mágica sin revelar la frase.

### Pruebas de conocimiento cero no interactivas {#non-interactive-zero-knowledge-proofs}

Si bien las pruebas interactivas fueron revolucionarias, tenían una utilidad limitada, ya que exigían que las dos partes estuvieran disponibles e interactuaran repetidamente. Incluso si un verificador estuviera convencido de la honestidad de un probador, la prueba no estaría disponible para la verificación independiente (calcular una nueva prueba implica un nuevo conjunto de mensajes entre el probador y el verificador).

Para resolver este problema, Manuel Blum, Paul Feldman y Silvio Micali sugirieron las primeras [pruebas no interactivas de conocimiento cero](https://dl.acm.org/doi/10.1145/62212.62222) en las que el probador y el verificador tienen una clave compartida. Esto permite que el probador demuestre su conocimiento de cierta información (esto es, testigo) sin proporcionar la información misma.

A diferencia de las pruebas interactivas, las pruebas no interactivas solo requerían una ronda de comunicación entre los participantes (probador y verificador). El probador pasa la información secreta a un algoritmo especial para procesar una prueba de conocimiento cero. Esta prueba es enviada al verificador, quien comprueba que el probador conozca la información secreta usando otro algoritmo.

La demostración no interactiva reduce la comunicación entre el probador y el verificador, lo que hace que las pruebas de conocimiento cero sean más eficientes. Además, una vez que se genera una prueba, esta está disponible para cualquier otra persona (con acceso a la clave compartida y el algoritmo de verificación) para la verificación.

Las pruebas no interactivas representaron un avance para la tecnología de conocimiento cero e impulsaron el desarrollo de los sistemas de prueba que se usan en la actualidad. Analizaremos estos tipos de prueba a continuación:

### Tipos de pruebas de conocimiento cero {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

ZK-SNARK es un acrónimo de **Argumento de Conocimiento Sucinto No Interactivo de Conocimiento Cero**. El protocolo ZK-SNARK tiene las siguientes cualidades:

- **Conocimiento cero**: un verificador puede validar la integridad de una declaración sin saber nada más sobre la declaración. El único conocimiento que el verificador tiene de la declaración es si es verdadera o falsa.

- **Sucinto**: la prueba de conocimiento cero es más pequeña que el testigo y se puede verificar rápidamente.

- **No interactivo**: la prueba es «no interactiva» porque el probador y el verificador solo interactúan una vez, a diferencia de las pruebas interactivas que requieren varias rondas de comunicación.

- **Argumento**: la prueba satisface el requisito de «solidez», por lo que hacer trampa es extremadamente improbable.

- **(De) Conocimiento**: la prueba de conocimiento cero no se puede construir sin acceso a la información secreta (testigo). Es difícil, si no imposible, para un probador que no tenga el testigo calcular una prueba de conocimiento cero válida.

La "clave compartida" mencionada anteriormente se refiere a parámetros públicos que el probador y el verificador acuerdan utilizar en la generación y verificación de pruebas. La generación de parámetros públicos (conocidos colectivamente como la Cadena Común de Referencia [CRS]) es una operación sensible por su importancia en la seguridad del protocolo. Si la entropía (aleatoriedad) utilizada para generar el CRS entra en manos de un probador deshonesto, pueden calcular pruebas falsas.

La [computación multipartita (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) es una forma de reducir los riesgos en la generación de parámetros públicos. Varias partes participan en una [ceremonia de configuración de confianza](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), donde cada persona contribuye con algunos valores aleatorios para generar el CRS. Siempre y cuando una parte honesta destruya su porción de la entropía, el protocolo ZK-SNARK conservará la solidez de cálculo o computacional.

Las configuraciones de confianza requieren que los usuarios confíen en los participantes en la generación de parámetros. Sin embargo, el desarrollo de ZK-STARK ha permitido protocolos de prueba que funcionen con una configuración sin confianza.

#### ZK-STARKs {#zk-starks}

ZK-STARK es un acrónimo de **Argumento de Conocimiento Transparente Escalable de Conocimiento Cero**. Los ZK-STARK son similares a los ZK-SNARK, salvo que son:

- **Escalable**: ZK-STARK es más rápido que ZK-SNARK en la generación y verificación de pruebas cuando el tamaño del testigo es mayor. Con las pruebas STARK, los tiempos del probador y el verificador solo aumentan ligeramente a medida que crece el testigo (los tiempos de probador y el verificador de SNARK aumentan linealmente con el tamaño del testigo).

- **Transparente**: ZK-STARK se basa en la aleatoriedad verificable públicamente para generar parámetros públicos para la prueba y la verificación en lugar de una configuración de confianza. Por lo tanto, son más transparentes en comparación con los ZK-SNARK.

Los ZK-STARK producen pruebas más grandes que los ZK-SNARK, lo que significa que generalmente tienen gastos de verificación más altos. Sin embargo, hay casos (como probar grandes conjuntos de datos) en los que los ZK-STARK pueden ser más rentables que los ZK-SNARK.

## Inconvenientes del uso de pruebas de conocimiento cero {#drawbacks-of-using-zero-knowledge-proofs}

### Costes de hardware {#hardware-costs}

Generar pruebas de conocimiento cero implica cálculos muy complejos que se realizan mejor en máquinas especializadas. Como estas máquinas son caras, a menudo están fuera del alcance de las personas comunes. Además, las aplicaciones que quieran utilizar tecnología de conocimiento cero deben tener en cuenta los costos de hardware, lo cual puede aumentar los costos para los usuarios finales.

### Costes de verificación de pruebas {#proof-verification-costs}

La verificación de pruebas también requiere un cálculo complejo e incrementa los costos de la implementación de tecnología de conocimiento cero en las aplicaciones. Este costo es particularmente relevante en el contexto del cómputo de pruebas. Por ejemplo, los rollups de conocimiento cero pagan ~500.000 gas para verificar una única prueba ZK-SNARK en Ethereum (los ZK-STARK tienen tarifas aún más altas).

### Suposiciones de confianza {#trust-assumptions}

En ZK-SNARK, la Cadena de Referencia Común (parámetros públicos) se genera una vez y está disponible para reutilizarla para las partes que deseen participar en el protocolo de conocimiento cero. Los parámetros públicos se crean a través de una ceremonia de establecimiento de confianza, donde se supone que los participantes son honestos.

Pero en realidad no hay forma de que los usuarios evalúen la honestidad de los participantes y los usuarios tienen que creer en los desarrolladores. Los ZK-STARK están libres de presunciones de confianza, ya que la aleatoriedad utilizada en la generación de la cadena es verificable públicamente. Entretanto, los investigadores están trabajando en la creación de configuraciones sin confianza para los ZK-SNARK con el fin de aumentar la seguridad de los mecanismos de prueba.

### Amenazas de la computación cuántica {#quantum-computing-threats}

ZK-SNARK utiliza criptografía de curva elíptica para el cifrado. Si bien se supone que el problema del logaritmo discreto de la curva elíptica es intrincado por ahora, el desarrollo de ordenadores cuánticos podría romper este modelo de seguridad en el futuro.

ZK-STARK se considera inmune a la amenaza de la computación cuántica, ya que solo depende de funciones hash resistentes a las colisiones para su seguridad. A diferencia de los pares de claves públicas-privadas utilizados en la criptografía de curva elíptica, el hashing resistente a la colisión es más difícil de romper para los algoritmos de informática cuántica.

## Lecturas adicionales {#further-reading}

- [Resumen de los casos de uso para las pruebas de conocimiento cero](https://pse.dev/projects) — _Equipo de exploraciones de privacidad y escalado_
- [SNARKs vs. STARKs vs. SNARKs recursivos](https://www.alchemy.com/overviews/snarks-vs-starks) — _Resúmenes de Alchemy_
- [Una prueba de conocimiento cero: mejorando la privacidad en una cadena de bloques](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARK: un ejemplo realista de conocimiento cero y análisis en profundidad](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARK: crear confianza verificable, incluso contra computadoras cuánticas](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [Una introducción aproximada de cómo son posibles los zk-SNARK](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Por qué las pruebas de conocimiento cero (ZKP) son un punto de inflexión para la identidad autosoberana](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_
- [Explicación de EIP-7503: habilitación de transferencias privadas en Ethereum con pruebas ZK](https://research.2077.xyz/eip-7503-zero-knowledge-wormholes-for-private-ethereum-transactions#introduction) — _Emmanuel Awosika_
- [Juego de cartas ZK: un juego para aprender los fundamentos de ZK y casos de uso de la vida real](https://github.com/ZK-card/zk-cards) - _ZK-Cards_
