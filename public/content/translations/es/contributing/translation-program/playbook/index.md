---
title: Manual de estrategias para programas de traducción
lang: es
description: Una recopilación de consejos y consideraciones importantes para implantar un programa de traducción
---

# Manual de estrategias para programas de traducción {#translation-program-playbook}

El inglés es uno de los idiomas más hablados del mundo y es, con diferencia, el idioma más estudiado del mundo. Dado que el inglés es el idioma más utilizado en internet —especialmente en las redes sociales— y que los lenguajes de programación multilingües son escasos, la mayor parte del contenido del ámbito de las cadenas de bloques está escrito originalmente en inglés.

Sin embargo, dado que más de 6.000 millones de personas en el mundo (más del 75 % de la población) no hablan inglés, esto supone un obstáculo enorme para el acceso a Ethereum para la gran mayoría de la población mundial.

Por este motivo, cada vez son más los proyectos en este ámbito que quieren traducir su contenido a diferentes idiomas y localizarlos para comunidades globales.

Ofrecer contenido multilingüe es una forma sencilla y eficaz de hacer crecer su comunidad global, proporcionar formación a personas que no hablan inglés, garantizar que su contenido y sus comunicaciones llegan a un público más amplio e introducir a más personas a este sector.

Esta guía tiene como objetivo abordar los retos y las ideas erróneas más comunes sobre la localización de contenidos. Proporciona una guía paso a paso para gestionar el contenido, el proceso de traducción y revisión, el control de calidad, la búsqueda de traductores y otros aspectos fundamentales del proceso de localización.

## Gestión del contenido {#content-management}

Por gestión de contenidos de traducción se entiende el proceso de automatización del flujo de trabajo de traducción, que elimina la necesidad de realizar tareas manuales repetitivas, mejora la eficiencia y la calidad, permite un mejor control y facilita la colaboración.

Existen muchos enfoques diferentes para la gestión de contenido en el proceso de localización, dependiendo del contenido y de sus necesidades.

La forma básica de gestionar el contenido es crear archivos bilingües que contengan el texto de origen y el texto de destino. Rara vez se utiliza esto en la traducción, ya que no ofrece ventajas significativas, aparte de la simplicidad.

Las agencias de traducción suelen utilizar programas de gestión de la traducción o herramientas de localización en su día a día, ya que proporcionan funciones para la gestión de proyectos y permiten un mayor control sobre los archivos, el contenido y los traductores.

Entérese de más cosas sobre la gestión de contenidos:

[Trados para la gestión de la traducción](https://www.trados.com/solutions/translation-management/)

[Phrase para la gestión de contenido multilingüe](https://phrase.com/blog/posts/multilingual-content-management/)

### Programas de gestión de la traducción {#translation-management-software}

Existen muchos programas de gestión de la traducción y herramientas de localización, y la elección del programa depende principalmente de sus necesidades.

Aunque algunos proyectos deciden no utilizar sistemas de traducción automátoca y prefieren gestionar las traducciones manualmente —ya sea directamente en archivos bilingües o en servicios de alojamiento, como GitHub—, esto reduce drásticamente el control, la productividad, la calidad, la escalabilidad y las posibilidades de colaboración. Este enfoque podría ser más beneficioso para proyectos de traducción a pequeña escala o puntuales.

Echemos un vistazo rápido a algunas de las herramientas de gestión de la traducción más potentes y ampliamente utilizadas:

**Las mejores para colaborar y externalizar tareas de forma abierta**

[Crowdin](https://crowdin.com/)

- Gratuito para proyectos de código abierto (número ilimitado de cadenas y proyectos)
- Memoria de traducción y glosario disponibles en todos los planes
- Más de 60 formatos de archivo admitidos, más de 70 integraciones de API

[Lokalise](https://lokalise.com/)

- Gratis para 2 miembros del equipo, planes de pago para más colaboradores (número limitado de cadenas en la mayoría de planes)
- Memoria de traducción y glosario disponibles en algunos planes de pago
- Más de 30 formatos de archivo admitidos, más de 40 integraciones de API

[Transifex](https://www.transifex.com/)

- Solo planes de pago (número de cadenas limitado para la mayoría de los planes)
- Memoria de traducción y glosario disponibles en todos los planes de pago
- Más de 30 formatos de archivo admitidos, más de 20 integraciones de API

[Phrase](https://phrase.com/)

- Solo planes de pago (número ilimitado de cadenas en todos los planes, número limitado de proyectos y miembros de equipo)
- Memoria de traducción y glosario disponibles en algunos planes de pago
- Más de 40 formatos de archivo soportados, más de 20 integraciones de API

[Smartcat](https://www.smartcat.com/)

- Plan básico gratuito con funciones avanzadas de pago (número ilimitado de cadenas y proyectos en todos los planes)
- Memoria de traducción y glosario disponibles en todos los planes
- Más de 60 formatos de archivo admitidos, más de 20 integraciones de API

[POEditor](https://poeditor.com/)

- Gratis para proyectos de código abierto (número limitado de cadenas para todos los proyectos, ilimitado para proyectos de código abierto)
- Memoria de traducción y glosario disponibles en planes de pago
- Más de 20 formatos de archivo admitidos, más de 10 integraciones de API

... por citar algunas.

**Herramientas de traducción profesionales**

[SDL Trados Studio](https://www.trados.com/products/trados-studio/)

- Planes de pago para traductores autónomos y equipos
- Herramienta de traducción asistida por ordenador muy eficiente y programa de productividad para traductores

[MemoQ](https://www.memoq.com/)

- Versión gratuita limitada disponible con varios planes de pago para funciones avanzadas
- Programa de gestión de traducciones para empresas, proveedores de servicios lingüísticos y traductores

[Memsource](https://www.memsource.com/)

- Gratis para traductores individuales con varios planes de pago para equipos
- Traducción asistida por ordenador basada en la nube y sistema de gestión de traducciones

... por citar algunas.

Conozca mejor los programas de gestión de la traducción:

[Definición de Wikipedia de sistemas de gestión de la traducción](https://en.wikipedia.org/wiki/Translation_management_system)

[Phrase sobre las 7 cosas que todo programa de gestión de traducciones debería tener](https://phrase.com/blog/posts/7-things-every-translation-management-software-should-have/)

[MemoQ sobre qué es un sistema de gestión de la traducción](https://www.memoq.com/tools/what-is-a-translation-management-system)

[La lista de Gengo de los 16 mejores sistemas de gestión de la traducción](https://gengo.com/translator-product-updates/16-best-translation-management-systems/)

## Flujo de trabajo {#workflow}

En el ámbito de la traducción, el flujo de trabajo de traducción puede tener dos significados diferentes, ambos en cierto modo relacionados entre sí, y puede requerir consideraciones importantes para su proyecto.

A continuación, explicaremos ambos.

**Significado n.º 1**

Probablemente, esta sea la forma más habitual de concebir los flujos de trabajo de traducción y lo primero que nos viene a la mente al oír la palabra «flujo de trabajo».

En sí, se concibe como «flujo de trabajo» desde que se empieza a pensar en traducciones hasta que utiliza el contenido traducido en su producto.

En este caso, un ejemplo de flujo de trabajo sería:

1. **Preparar los archivos para la traducción**. Parece sencillo, pero hay que tener en cuenta un par de cosas importantes. En este paso, debería tener un plan claro sobre cómo debería funcionar todo el proceso.

- _¿Qué tipo de archivos usará? ¿En qué formato quiere recibir sus archivos traducidos?_
  - Si su contenido está disponible en formato DOCX o MD, el proceso será mucho más sencillo que si traduce una versión en PDF de su documento técnico u otros documentos.
- _¿Qué herramientas de localización admiten este formato de archivo? ¿Puede traducirse el archivo de forma que conserve el formato original?_
  - No todos los tipos de archivo admiten la localización directa (por ejemplo, archivos PDF, archivos de imagen), y no todas las herramientas de localización admiten todos los tipos de archivo.
- _¿Quién traducirá el contenido? ¿Encargará traducciones profesionales o contará con voluntarios?_
  - Esto afecta a una serie de decisiones que debe tomar. Por ejemplo, los traductores profesionales se sienten más cómodos trabajando con herramientas de localización avanzadas que los voluntarios.
- _¿Qué espera de los profesionales de la lengua? Si utiliza los servicios de un proveedor de servicios lingüísticos, ¿qué espera este de usted?_
  - Este es el paso para asegurarse de que sus objetivos, expectativas y plazos estén alineados.
- _¿Es igual de importante todo el contenido por traducir? ¿Debería traducirse algún contenido antes que otro?_
  - Hay algunas formas de priorizar ciertos contenidos, que deberían traducirse e implementarse primero. Por ejemplo, si tiene mucho contenido que traducir, puede utilizar un control de versiones para asegurarse de que los traductores sepan qué deben priorizar.

2. **Compartir los archivos para su traducción**. Este paso también requiere una reflexión de todo el proceso, y no es tan sencillo como enviar los archivos de origen a un proveedor de servicios lingüísticos.

- _¿Quién traducirá el contenido? ¿Cuánta gente participará en este proceso?_
  - Si tiene previsto utilizar una herramienta de localización, este paso se simplifica, ya que puede cargar los archivos de origen directamente en la herramienta. Esto también es aplicable si el proceso de traducción se lleva a cabo en el servidor de alojamiento, ya que los archivos de origen no necesitan exportarse a ningún sitio.
- _¿Los archivos de origen se gestionarán manualmente o se puede automatizar este proceso?_
  - La mayoría de las herramientas de localización permiten algún tipo de integración o automatización del proceso de gestión de archivos. Por otro lado, si trabaja con traductores independientes y no utiliza una herramienta de localización, enviar manualmente los archivos de origen a cientos o miles de traductores no es un proceso escalable.
- _¿Qué herramientas se usarán para la localización?_
  - La respuesta a esta pregunta determinará cómo enfocará todo lo demás. Elegir la herramienta adecuada puede ayudarle a automatizar la gestión de contenidos, gestionar la memoria de la traducción y el glosario, gestionar a los traductores, realizar un seguimiento del progreso de la traducción/revisión, etc. Así que dedique tiempo a informarse antes sobre qué herramienta quiere utilizar. Si no tiene previsto utilizar una herramienta de localización, todo lo anterior deberá realizarse manualmente.
- _¿Cuánto tiempo durará el proceso de traducción? ¿Cuánto costará?_
  - A estas alturas, ya debería estar listo para compartir los archivos de origen con el proveedor de servicios lingüísticos o el grupo de traductores. El proveedor de servicios lingüísticos puede ayudarle a analizar el recuento de palabras y proporcionarle un presupuesto, incluyendo las tarifas y el plazo para el proceso de traducción.
- _¿Tiene pensado realizar cambios/actualizar el contenido de origen durante este proceso?_
  - Si su contenido es dinámico y cambia con frecuencia, cualquier cambio o actualización puede interrumpir el proceso de traducción. El uso de una memoria de traducción puede ayudar a paliar esto de manera significativa, aunque sigue siendo importante pensar en cómo funcionará el proceso y cómo puede evitar que el avance de los traductores se demore.

3. **Gestión del proceso de traducción**. Su trabajo no termina cuando el contenido de origen se le entrega al proveedor de servicios lingüísticos o a los traductores. Para garantizar unas traducciones de buena calidad, los creadores de contenido deben involucrarse lo máximo posible en el proceso de traducción.

- _¿Cómo tiene pensado comunicarse con los traductores?_
  - Si tiene previsto utilizar una herramienta de localización, la comunicación puede tener lugar directamente en la herramienta. También se recomienda establecer un canal de comunicación alternativo con los traductores, ya que es posible que se sientan más cómodos para comunicarse y las herramientas de mensajería permiten una comunicación más fluida.
- _¿Cómo gestionará las dudas y consultas de los traductores? ¿Quién debería responder a esas preguntas?_
  - Los traductores (tanto profesionales como no profesionales) suelen ponerse en contacto con preguntas y solicitudes de aclaración o de contexto adicional, así como aportar comentarios e ideas para mejorar el contenido. Responder a estas preguntas a menudo puede llevar a una mayor implicación y a una mejor calidad del contenido traducido. También es muy útil proporcionarles tantos recursos como sea posible (por ejemplo, guías, consejos, directrices terminológicas, listas de preguntas frecuentes, etc.).
- _¿Cómo gestionará el proceso de revisión? ¿Desea externalizarlo o tiene la capacidad de realizar revisiones internamente?_
  - Aunque no son siempre necesarias, las revisiones son una parte integral de un proceso de traducción óptimo. Normalmente, lo más fácil es externalizar el proceso de revisión mediante revisores profesionales. Sin embargo, si tiene cuenta con un equipo internacional grande, las revisiones o el control de la calidad también se pueden gestionar internamente.

4. **Implementar el contenido traducido**. La última parte del flujo de trabajo, aunque sigue siendo importante tenerla en cuenta con antelación.

- _¿Se completarán todas las traducciones al mismo tiempo?_
  - Si no es así, debería pensar qué traducciones deberían priorizarse, cómo realizar un seguimiento de las traducciones en curso y cómo gestionar la implementación mientras se realizan las traducciones.
- _¿Cómo se le entregará el contenido traducido? ¿En qué formato estará?_
  - Esta es una consideración importante, independientemente del enfoque que utilice. Las herramientas de localización le permiten mantener el control sobre el formato del archivo de destino y el proceso de exportación, y suelen permitir la automatización, por ejemplo, al posibilitar la integración con el servidor de alojamiento.
- _¿Cómo implementará las traducciones en su proyecto?_
  - En algunos casos, esto podría ser tan sencillo como subir el archivo traducido o añadirlo a sus documentos. Sin embargo, en proyectos más complejos, como traducciones de sitios web o aplicaciones, debe asegurarse de que el código admita varios idiomas y definir con antelación cómo se gestionará el proceso de implementación.
- _¿Qué ocurre si el formato es diferente al de origen?_
  - Análogamente a lo explicado anteriormente, si está traduciendo archivos de texto simple, probablemente el formato no tenga una importancia vital. Sin embargo, con archivos más complejos, como el contenido de un sitio web o una aplicación, el formato y el código deben ser idénticos al original para que puedan inmplementarse en su proyecto. De lo contrario, los archivos de destino deberán editarse, ya sea por los traductores o por sus desarrolladores.

**Significado n.º 2**

Un flujo de trabajo de traducción alternativo, que no tiene en cuenta las decisiones ni los enfoques internos. La consideración principal aquí es el flujo del contenido en sí mismo.

En este caso, un ejemplo de flujo de trabajo sería:

1. _Traducción → Implementación_

- Un flujo de trabajo más sencillo, en el que la traducción probablemente será realizada por humanos, ya que no hay ningún proceso de revisión o control de la calidad para evaluar la calidad y editar las traducciones antes de su implementación.
- En este flujo de trabajo es importante que los traductores puedan mantener un cierto nivel de calidad, lo que requerirá recursos adecuados y comunicación entre los gestores del proyecto y los traductores.

2. _Traducción → Revisión → Implementación_

- Un flujo de trabajo más avanzado, que incluye un proceso de revisión y edición, para garantizar que la calidad de las traducciones sea aceptable y sistemática.
- Existen varios enfoques para este flujo de trabajo, en el que las traducciones las podrían realizar traductores profesionales o voluntarios, mientras que el proceso de revisión probablemente correría a cargo de revisores profesionales, familiarizados con todas las reglas gramaticales y ortográficas que deben respetarse en la lengua de destino.

3. _Traducción → Revisión → Control de calidad → Implementación_

- El flujo de trabajo óptimo para garantizar el máximo nivel de calidad. Aunque el control de la calidad no siempre es necesario, podría resultar útil para que usted tenga una mejor idea de la calidad del texto traducido tras la traducción y la revisión.
- Con este flujo de trabajo, las traducciones podrían realizarlas exclusivamente voluntarios o incluso mediante traducción automática. El proceso de revisión corre a cargo de traductores profesionales, mientras que del control de la calidad puede encargarse un proveedor de servicios lingüísticos o hacerlo internamente, si cuenta con empleados que sean hablantes nativos de los idiomas de destino.

Conozca mejor los flujos de trabajo de traducción:

[Normas del contenido sobre las cinco fases del flujo de trabajo de traducción](https://contentrules.com/creating-translation-workflow/)

[Smartling sobre qué es la gestión del flujo de trabajo de traducción](https://www.smartling.com/resources/101/what-is-translation-workflow-management/)

[RixTrans sobre el flujo de trabajo de traducción](https://www.rixtrans.com/translation-workflow)

## Gestión de la terminología{#terminology-management}

Establecer un plan claro sobre cómo gestionar la terminología es uno de los pasos más importantes para garantizar la calidad y coherencia de sus traducciones, y así ahorrar tiempo a sus traductores.

En el ámbito de la traducción, esto se conoce como gestión de la terminología y es uno de los servicios clave que los proveedores de servicios lingüísticos ofrecen a sus clientes, además del acceso a su equipo de especialistas lingüísticos y de la gestión de contenidos.

Se entiende por gestión de la terminología el proceso de identificación, recopilación y gestión de la terminología que es importante para su proyecto y que siempre debe traducirse de forma correcta y coherente.

Hay una serie de pasos que se deben seguir a la hora de considerar la gestión terminológica:

- Identificar los términos clave que deben incluirse en la base terminológica.
- Crear un glosario de términos y su definición.
- Traducir los términos y añadirlos al glosario.
- Revisar y aprobar las traducciones.
- Gestionar el glosario y actualizarlo con nuevos términos, que sean relevantes para la traducción.

Conozca más a fondo la gestión de la terminología:

[Trados sobre la gestión terminológica](https://www.trados.com/solutions/terminology-management/translation-101-what-is-terminology-management.html)

[Language Scientific sobre por qué la gestión terminológica es importante](https://www.languagescientific.com/terminology-management-why-it-matters/#:~:text=Terminology%20management%20is%20the%20process,are%20related%20to%20each%20other.)

[Clear Words Translation sobre qué es la gestión terminológica y por qué es importante](http://clearwordstranslations.com/language/en/what-is-terminology-management/)

### Memorias de traducción y glosarios {#tm-and-glossary}

La memoria de traducción y el glosario son herramientas importantes en la industria de la traducción y algo en lo que se apoyan la mayoría de los proveedores de servicios lingüísticos.

Veamos qué significan estos términos y en qué se diferencian entre sí:

**Memoria de traducción**: una base de datos que almacena automáticamente segmentos o cadenas, incluyendo bloques de texto más largos, frases completas, párrafos y términos individuales, así como sus traducciones actuales y anteriores en cada idioma.

La mayoría de herramientas de localización, sistemas de gestión de la traducción y herramientas de traducción asistida por ordenador llevan memorias de traducción integradas, que normalmente pueden exportarse y también utilizarse con otras herramientas similares.

Entre las ventajas de utilizar una memoria de traducción destacan una mayor rapidez en la traducción, emparejado con una mejor calidad, la capacidad de conservar ciertas traducciones al actualizar o cambiar el contenido de origen y menores costes de traducción para contenidos repetitivos.

Las memorias de traducción funcionan basándose en un porcentaje de coincidencia entre diferentes segmentos y suelen ser de gran utilidad cuando dos segmentos contienen más del 50 % del contenido idéntico. También se utilizan para traducir automáticamente segmentos repetitivos, que coinciden al 100 %, eliminando así la necesidad de traducir contenido idéntico más de una vez.

Informarse más sobre las memorias de traducción:

[Memsource sobre las memorias de traducción](https://www.memsource.com/translation-memory/)

[Smartling explica lo que es una memoria de traducción](https://www.smartling.com/resources/101/what-is-translation-memory/)

**Glosario**: una lista de términos importantes o sensibles, su definición, sus funciones y traducciones generalizadas. La principal diferencia entre un glosario y una memoria de traducción es que el glosario no se crea automáticamente, ni contiene traducciones de frases completas.

La mayoría de las herramientas de localización, sistemas de gestión de la traducción y herramientas de traducción asistida por ordenador llevan glosarios integrados que se pueden actualizar para asegurarse de que contienen la terminología importante para su proyecto. Al igual que la memoria de traducción, el glosario normalmente puede exportarse y utilizarse en otras herramientas de localización.

Antes de empezar su proyecto de traducción, es muy recomendable dedicar algo de tiempo a crear un glosario para sus traductores y revisores. El uso de un glosario garantiza que los términos importantes se traduzcan correctamente, proporciona a los traductores el contexto necesario y garantiza la coherencia en las traducciones.

Aunque los glosarios suelen contener traducciones generalizadas en los idiomas de destino, también son útiles sin ellas. Incluso sin traducciones generalizadas, un glosario puede incluir definiciones de términos técnicos, resaltar términos que no deben traducirse e informar a los traductores de si un término específico se utiliza como sustantivo, verbo, nombre propio o cualquier otra categoría gramatical.

Leer más sobre glosarios:

[Lionbridge sobre lo que es un glosario de traducción](http://info.lionbridge.com/rs/lionbridge/images/Lionbridge%20FAQ_Glossary_2013.pdf)

[Transifex sobre glosarios](https://docs.transifex.com/glossary/glossary)

Si no tiene pensado utilizar una herramienta de localización para su proyecto, es probable que no pueda utilizar una memoria de traducción ni un glosario (podría crear un glosario o una base de datos terminológica en un archivo Excel; sin embargo, los glosarios automatizados evitan que los traductores tengan que buscar manualmente los términos y sus definiciones).

Esto significa que todo el contenido repetitivo y parecido tendría que traducirse manualmente una y otra vez. Además, los traductores tendrían que consultar si un determinado término debe traducirse o no, cómo se utiliza en el texto y si un término ya tiene una traducción generalizada.

_¿Quiere utilizar la memoria de traducción y el glosario de ethereum.org en su proyecto? Póngase en contacto con nosotros a través de translations@ethereum.org._

## Contacto con traductores {#translator-outreach}

**Trabajar con un proveedor de servicios lingüísticos**

Si trabaja con un proveedor de servicios lingüísticos y sus traductores profesionales, es posible que esta sección no sea demasiado relevante para usted.

En este caso, es importante elegir un proveedor de servicios lingüísticos con capacidad de proporcionar todos los servicios que necesita (por ejemplo, traducción, revisión, control de calidad) en muchos idiomas.

Aunque puede resultar tentador elegir un proveedor de servicios lingüísticos basándose únicamente en los precios que ofrece, es importante tener en cuenta que los proveedores de servicios lingüísticos más grandes tienen precios más elevados por una razón.

- Tienen decenas de miles de traductores en su base de datos, lo que significa que podrán encargarle su proyecto a traductores con la experiencia y los conocimientos necesarios en su sector específico (es decir, traductores especializados).
- Tienen una dilatada experiencia en la traducción de diferentes proyectos y en la satisfacción de las diversas necesidades de sus clientes. Esto significa que estarán más dispuestos a adaptarse a su flujo de trabajo particular, ofrecerán sugerencias valiosas y posibles mejoras para su proceso de traducción, y satisfacerán sus necesidades, requisitos y plazos.
- La mayoría de los proveedores de servicios lingüísticos más importantes también tienen sus propias herramientas de localización, memorias de traducción y glosarios que puede utilizar. Si no es así, al menos cuentan con suficientes profesionales en su equipo para garantizar que sus traductores estén familiarizados y sean capaces de trabajar con cualquier herramienta de localización que desee utilizar.

En el [informe Nimdzi 100 de 2021](https://www.nimdzi.com/nimdzi-100-top-lsp/) puede encontrar una comparación detallada de los mayores proveedores de servicios lingüísticos del mundo, algunos detalles sobre cada uno de ellos y análisis por categorías sobre los servicios que prestan, datos geográficos, etc.

**Trabajar con traductores no profesionales**

Puede que trabaje con traductores no profesionales y busque voluntarios que le ayuden a traducir.

Hay varias formas de contactar con personas e invitarlas a unirse a su proyecto. Esto dependerá en gran medida de su producto y del tamaño de la comunidad con la que ya cuente.

A continuación, enumeramos algunas formas de incorporar voluntarios:

**Captar el interés de los voluntarios**. Aunque este aspecto se trata en cierta medida en los siguientes puntos, ponerse en contacto con posibles voluntarios y asegurarse de que conocen su iniciativa de traducción puede ser efectivo de por sí.

Muchas gente quiere participar y contribuir a sus proyectos favoritos, pero a menudo no ven una forma clara de hacerlo sin ser un desarrollador o tener conocimientos técnicos especiales. Si consigue dar a conocer su proyecto, es probable que muchas personas bilingües se animen a participar.

**Buscar dentro de su comunidad**. La mayoría de los proyectos en este sector ya tienen comunidades grandes y activas. Probablemente, muchos miembros de su comunidad apreciarían la oportunidad de contribuir al proyecto de una manera sencilla.

Aunque contribuir a proyectos de código abierto suele obedecer a una motivación intrínseca, también es una experiencia de aprendizaje fantástica. Cualquier persona interesada en conocer mejor su proyecto probablemente estaría encantada de participar en un programa de traducción como voluntaria, ya que le permitiría combinar el hecho de haber contribuido a algo que le importa con una intensa experiencia de aprendizaje práctico.

**Mencionar la iniciativa en su producto**. Si su producto es popular y lo utiliza un gran número de personas, destacar su programa de traducción y animar a los usuarios a participar mientras utilizan el producto puede resultar muy eficaz.

Esto podría ser tan sencillo como añadir un anuncio o una ventana emergente con una llamada a la acción para su producto en aplicaciones y sitios web. Resulta ser tremendamente eficaz, porque su público objetivo es su comunidad, que está compuesta por las personas que es más probable que se involucren, en primer lugar.

**Redes sociales**. Las redes sociales pueden ser una forma eficaz de dar a conocer su programa de traducción y llegar a los miembros de su comunidad, así como a otras personas que aún no forman parte de ella.

Si tiene un servidor de Discord o un canal de Telegram, es fácil utilizarlo como canal de divulgación, de comunicación con sus traductores y de reconocimiento a sus colaboradores.

Plataformas como Twitter también pueden ser útiles para incorporar a nuevos miembros a la comunidad y reconocer públicamente a sus colaboradores.

Linux Foundation ha elaborado un extenso informe sobre la [encuesta de colaboradores de código libre y abierto de 2020](https://www.linuxfoundation.org/wp-content/uploads/2020FOSSContributorSurveyReport_121020.pdf), que analiza a colaboradores de código abierto y sus motivaciones.

## Conclusión {#conclusion}

Este documento contiene algunas consideraciones clave que todo programa de traducción debe tener en cuenta. No es en modo alguno una guía exhaustiva, aunque puede ayudar a cualquier persona sin experiencia en la industria de la traducción a organizar un programa de traducción para su proyecto.

Si está buscando instrucciones más detalladas, así como un análisis más concreto de las diferentes herramientas, procesos y aspectos críticos de la gestión de un programa de traducción, algunos de los proveedores de servicios lingüísticos más importantes mantienen blogs y suelen publicar artículos sobre diferentes aspectos del proceso de localización. Estos son los mejores recursos si desea profundizar en cualquiera de los temas anteriores y entender cómo funciona el proceso de localización a nivel profesional.

Al final de cada sección se incluyen algunos enlaces relevantes; sin embargo, puede encontrar muchos otros recursos en internet.

Para propuestas de colaboración o información adicional, enseñanzas y ver las buenas prácticas recomendadas, gracias al mantenimiento del programa de traducción de ethereum.org, no dude en contactarnos escribiéndonos a translations@ethereum.org.
