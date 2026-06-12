---
title: Guía del programa de traducción
metaTitle: Guía del programa de traducción
lang: es
description: Una colección de consejos y consideraciones importantes para establecer un programa de traducción
---

El inglés es uno de los idiomas más hablados del mundo y es, con diferencia, el idioma más estudiado a nivel mundial. Dado que el inglés es el idioma más utilizado en Internet (especialmente en las redes sociales) y los lenguajes de programación multilingües son escasos, la mayor parte del contenido en el espacio de la cadena de bloques está escrito de forma nativa en inglés.

Sin embargo, dado que más de 6000 millones de personas en el mundo (más del 75 % de la población) no hablan inglés en absoluto, esto representa una enorme barrera de entrada a Ethereum para la gran mayoría de la población mundial.

Por esta razón, un número cada vez mayor de proyectos en el espacio buscan que su contenido sea traducido a diferentes idiomas y localizado para comunidades globales.

Proporcionar contenido multilingüe es una forma sencilla y eficaz de hacer crecer su comunidad global, brindar educación a personas que no hablan inglés, asegurarse de que su contenido y comunicaciones lleguen a un público más amplio y lograr la incorporación de más personas al espacio.

Esta guía tiene como objetivo abordar los desafíos y conceptos erróneos comunes sobre la localización de contenido. Proporciona una guía paso a paso para la gestión de contenido, el proceso de traducción y revisión, el control de calidad, la captación de traductores y otros aspectos vitales del proceso de localización.

## Gestión de contenido {#content-management}

La gestión de contenido de traducción se refiere al proceso de automatización del flujo de trabajo de traducción, lo que elimina la necesidad de realizar trabajos manuales repetitivos, mejora la eficiencia y la calidad, permite un mejor control y facilita la colaboración.

Existen muchos enfoques diferentes para la gestión de contenido en el proceso de localización, dependiendo del contenido y de sus necesidades.

La forma fundamental de gestionar el contenido es crear archivos bilingües que contengan el texto de origen y el de destino. Esto rara vez se utiliza en la traducción, ya que no ofrece ventajas significativas, aparte de la simplicidad.

Las agencias de traducción suelen abordar la gestión de la traducción mediante el uso de software de gestión de traducción o herramientas de localización, que proporcionan capacidades de gestión de proyectos y permiten un control mucho mayor sobre los archivos, el contenido y los lingüistas.

Lea más sobre la gestión de contenido:

[Trados sobre qué es la gestión de traducción](https://www.trados.com/solutions/translation-management/)

[Phrase sobre la gestión de contenido multilingüe](https://phrase.com/blog/posts/multilingual-content-management/)

### Software de gestión de traducción {#translation-management-software}

Existen muchos sistemas de gestión de traducción y herramientas de localización, y la elección del software depende principalmente de sus necesidades.

Si bien algunos proyectos deciden no utilizar sistemas de gestión de traducción y prefieren manejar las traducciones manualmente (ya sea directamente en archivos bilingües o en servicios de alojamiento, como GitHub), esto reduce drásticamente el control, la productividad, la calidad, la escalabilidad y las capacidades de colaboración. Dicho enfoque podría ser más beneficioso para proyectos de traducción a pequeña escala o puntuales.

Un vistazo rápido a algunas de las herramientas de gestión de traducción más potentes y utilizadas:

**Las mejores para el crowdsourcing y la colaboración**

[Crowdin](https://crowdin.com/)

- Gratuito para proyectos de código abierto (número ilimitado de cadenas y proyectos)
- Memoria de traducción (TM) y glosario disponibles en todos los planes
- Más de 60 formatos de archivo compatibles, más de 70 integraciones de API

[Lokalise](https://lokalise.com/)

- Gratuito para 2 miembros del equipo, planes de pago para más colaboradores (número limitado de cadenas en la mayoría de los planes)
- Memoria de traducción (TM) y glosario disponibles en algunos planes de pago
- Más de 30 formatos de archivo compatibles, más de 40 integraciones de API

[Transifex](https://www.transifex.com/)

- Solo planes de pago (número limitado de cadenas en la mayoría de los planes)
- Memoria de traducción (TM) y glosario disponibles en todos los planes de pago
- Más de 30 formatos de archivo compatibles, más de 20 integraciones de API

[Phrase](https://phrase.com/)

- Solo planes de pago (número ilimitado de cadenas en todos los planes, número limitado de proyectos y miembros del equipo)
- Memoria de traducción (TM) y glosario disponibles en algunos planes de pago
- Más de 40 formatos de archivo compatibles, más de 20 integraciones de API

[Smartcat](https://www.smartcat.com/)

- Plan básico gratuito con funciones avanzadas de pago (número ilimitado de cadenas y proyectos en todos los planes)
- Memoria de traducción (TM) y glosario disponibles en todos los planes
- Más de 60 formatos de archivo compatibles, más de 20 integraciones de API

[POEditor](https://poeditor.com/)

- Gratuito para proyectos de código abierto (número limitado de cadenas para todos los proyectos, ilimitado para proyectos de código abierto)
- Memoria de traducción (TM) y glosario disponibles en los planes de pago
- Más de 20 formatos de archivo compatibles, más de 10 integraciones de API

y muchas otras...

**Herramientas de traducción profesional**

[SDL Trados Studio](https://www.trados.com/products/trados-studio/)

- Planes de pago para traductores autónomos y equipos
- Herramienta de traducción asistida por ordenador (TAO) y software de productividad para traductores muy potente

[MemoQ](https://www.memoq.com/)

- Versión gratuita limitada disponible con varios planes de pago para funciones avanzadas
- Software de gestión de traducción para empresas, proveedores de servicios lingüísticos y traductores

[Memsource](https://www.memsource.com/)

- Gratuito para traductores individuales con varios planes de pago para equipos
- Sistema de gestión de traducción y traducción asistida por ordenador basado en la nube

y muchas otras...

Lea más sobre el software de gestión de traducción:

[Definición de Wikipedia de los sistemas de gestión de traducción](https://en.wikipedia.org/wiki/Translation_management_system)

[Phrase sobre 7 cosas que todo software de gestión de traducción debería tener](https://phrase.com/blog/posts/7-things-every-translation-management-software-should-have/)

[MemoQ sobre qué es un sistema de gestión de traducción](https://www.memoq.com/tools/what-is-a-translation-management-system)

[Lista de Gengo de los 16 mejores sistemas de gestión de traducción](https://gengo.com/translator-product-updates/16-best-translation-management-systems/)

## Flujo de trabajo {#workflow}

En el espacio de la traducción, el flujo de trabajo de traducción puede significar un par de cosas diferentes, ambas algo interrelacionadas, y son consideraciones importantes para su proyecto.

Exploraremos ambas a continuación.

**Significado 1**

Esta es probablemente la forma más común de pensar en los flujos de trabajo de traducción y algo que suele venir a la mente al escuchar la palabra flujo de trabajo.

En su esencia, es el "flujo de trabajo" desde que se empieza a pensar en las traducciones hasta que se utiliza el contenido traducido en su producto.

Un ejemplo de flujo de trabajo en este caso sería:

1. **Preparación de los archivos para la traducción**: Suena sencillo; sin embargo, debe considerar un par de cosas importantes. En este paso, debe tener un plan claro sobre cómo debería funcionar todo el proceso.

- _¿Qué tipos de archivos utilizará? ¿En qué formato desea recibir sus archivos traducidos?_
  - Si su contenido está disponible en formato DOCX o MD, el enfoque será mucho más sencillo que si está traduciendo una versión en PDF de su documento técnico u otros documentos.
- _¿Qué herramientas de localización son compatibles con este tipo de archivo? ¿Se puede traducir el archivo de manera que conserve el formato original?_
  - No todos los tipos de archivos admiten la localización directa (por ejemplo, archivos PDF, archivos de imagen), y no todas las herramientas de localización admiten todos los tipos de archivos.
- _¿Quién traducirá el contenido? ¿Solicitará traducciones profesionales o dependerá de voluntarios?_
  - Esto afecta a una serie de otras decisiones que debe tomar. Por ejemplo, los traductores profesionales se sienten más cómodos trabajando con herramientas de localización avanzadas que los voluntarios.
- _¿Cuáles son sus expectativas para los lingüistas? Si utiliza un proveedor de servicios lingüísticos, ¿qué esperan ellos de usted?_
  - Este es el paso para asegurarse de que sus objetivos, expectativas y plazos estén alineados.
- _¿Todo el contenido a traducir es igual de importante? ¿Debería traducirse algún contenido primero?_
  - Existen algunas formas de priorizar cierto contenido, que debería traducirse e implementarse primero. Por ejemplo, si tiene mucho contenido para traducir, puede utilizar el control de versiones para asegurarse de que los traductores sepan cuál deben priorizar.

2. **Compartir los archivos para su traducción**: Este paso también requiere pensar a largo plazo y no es tan sencillo como enviar los archivos de origen a un proveedor de servicios lingüísticos.

- _¿Quién traducirá el contenido? ¿Cuántas personas participarán en este proceso?_
  - Si planea utilizar una herramienta de localización, este paso se simplifica, ya que puede cargar los archivos de origen directamente en la herramienta. Esto también se aplica si el proceso de traducción se lleva a cabo en el servicio de alojamiento, ya que los archivos de origen no necesitan exportarse a ningún lado.
- _¿Los archivos de origen se manejarán manualmente o se puede automatizar este proceso?_
  - La mayoría de las herramientas de localización permiten algún tipo de integración o automatización del proceso de gestión de archivos. Por otro lado, si trabaja con traductores individuales y no utiliza una herramienta de localización, enviar manualmente los archivos de origen a cientos o miles de traductores no es un proceso escalable.
- _¿Qué herramientas se utilizarán para la localización?_
  - La respuesta a esta pregunta determinará cómo abordará todo lo demás. Seleccionar la herramienta adecuada puede ayudarle a automatizar la gestión de contenido, la gestión de la memoria de traducción y el glosario, la gestión de traductores, el seguimiento del progreso de la traducción/revisión, etc., así que tómese un tiempo e investigue qué herramienta desea utilizar. Si no planea utilizar una herramienta de localización, todo lo anterior deberá hacerse manualmente.
- _¿Cuánto tiempo llevará el proceso de traducción? ¿Cuánto costará?_
  - En este punto, debería estar listo para compartir los archivos de origen con el proveedor de servicios lingüísticos o el grupo de traductores. El proveedor de servicios lingüísticos puede ayudarle a analizar el recuento de palabras y proporcionarle un presupuesto, que incluya las tarifas y el plazo para el proceso de traducción.
- _¿Planea realizar cambios o actualizar el contenido de origen durante este proceso?_
  - Si su contenido es dinámico y cambia a menudo, cualquier cambio o actualización puede interrumpir el progreso de la traducción. El uso de una memoria de traducción puede ayudar a mitigar esto significativamente, aunque sigue siendo importante pensar en cómo funcionará el proceso y cómo puede evitar retrasar el progreso que están logrando los traductores.

3. **Gestión del proceso de traducción**: Su trabajo no termina una vez que el contenido de origen se entrega al proveedor de servicios lingüísticos o a los traductores. Para garantizar una calidad óptima de las traducciones, los creadores de contenido deben involucrarse lo más posible en el proceso de traducción.

- _¿Cómo planea comunicarse con los traductores?_
  - Si planea utilizar una herramienta de localización, la comunicación puede tener lugar directamente en la herramienta. También se recomienda establecer un canal de comunicación alternativo con los traductores, ya que podrían dudar menos en comunicarse, y las herramientas de mensajería permiten una comunicación más fluida.
- _¿Cómo manejar las preguntas de los traductores? ¿Quién debería responder a estas preguntas?_
  - Los traductores (tanto profesionales como no profesionales) a menudo se comunicarán con preguntas y solicitudes de aclaración o contexto adicional, así como con comentarios e ideas de mejora. Responder a estas consultas a menudo puede conducir a un mayor compromiso y calidad del contenido traducido. También es valioso proporcionarles tantos recursos como sea posible (por ejemplo, guías, consejos, pautas de terminología, preguntas frecuentes, etc.).
- _¿Cómo manejar el proceso de revisión? ¿Desea subcontratarlo o tiene la capacidad de realizar revisiones internamente?_
  - Aunque no siempre son necesarias, las revisiones son una parte integral de un proceso de traducción óptimo. Por lo general, es más fácil subcontratar el proceso de revisión a revisores profesionales. Sin embargo, si cuenta con un gran equipo internacional, las revisiones o el control de calidad (QA) también se pueden manejar internamente.

4. **Implementación del contenido traducido**: La última parte del flujo de trabajo, aunque sigue siendo importante considerarla con anticipación.

- _¿Se completarán todas las traducciones al mismo tiempo?_
  - Si no es así, debe pensar qué traducciones deben priorizarse, cómo realizar un seguimiento de las traducciones en curso y cómo se maneja la implementación mientras se realizan las traducciones.
- _¿Cómo se le entregará el contenido traducido? ¿En qué formato estará?_
  - Esta es una consideración importante, independientemente del enfoque que utilice. Las herramientas de localización le permiten mantener el control sobre el formato del archivo de destino y el proceso de exportación, y generalmente admiten la automatización, por ejemplo, al permitir la integración con el servicio de alojamiento.
- _¿Cómo implementará las traducciones en su proyecto?_
  - En algunos casos, esto podría ser tan simple como cargar el archivo traducido o agregarlo a sus documentos. Sin embargo, con proyectos más complejos, como traducciones de sitios web o aplicaciones, debe asegurarse de que el código admita la internacionalización y establecer cómo se manejará el proceso de implementación con anticipación.
- _¿Qué sucede si el formato es diferente al de origen?_
  - De manera similar a lo anterior, si está traduciendo archivos de texto simples, el formato probablemente no sea de vital importancia. Sin embargo, con archivos más complejos, como el contenido de un sitio web o una aplicación, el formato y el código deben ser idénticos a los de origen para poder implementarse en su proyecto. De lo contrario, los archivos de destino deberán ser editados, ya sea por los traductores o por sus desarrolladores.

**Significado 2**

Un flujo de trabajo de traducción alternativo, que no tiene en cuenta las decisiones y enfoques internos. La consideración principal aquí es el flujo del contenido en sí.

Un ejemplo de flujo de trabajo en este caso sería:

1. _Traducción → Implementación_

- El flujo de trabajo más simple, donde la traducción probablemente será humana, ya que no hay un proceso de revisión o control de calidad para evaluar la calidad y editar las traducciones antes de la implementación.
- Con este flujo de trabajo, es importante que los traductores puedan mantener un cierto nivel de calidad, lo que requerirá recursos adecuados y comunicación entre los gerentes de proyecto y los traductores.

2. _Traducción → Revisión → Implementación_

- Un flujo de trabajo más avanzado, que incluye un proceso de revisión y edición, para garantizar que la calidad de las traducciones sea aceptable y coherente.
- Existen varios enfoques para este flujo de trabajo, donde las traducciones podrían ser realizadas por traductores profesionales o voluntarios, mientras que el proceso de revisión probablemente será manejado por revisores profesionales, que están familiarizados con todas las reglas gramaticales y ortográficas que deben observarse en el idioma de destino.

3. _Traducción → Revisión → Control de calidad (QA) → Implementación_

- El flujo de trabajo óptimo para garantizar el más alto nivel de calidad. Si bien el control de calidad no siempre es necesario, podría ser útil para darle una mejor idea de la calidad del texto traducido después de la traducción y la revisión.
- Con este flujo de trabajo, las traducciones podrían ser realizadas exclusivamente por voluntarios o incluso mediante traducción automática. El proceso de revisión debe ser realizado por traductores profesionales, mientras que el control de calidad puede ser realizado por un proveedor de servicios lingüísticos o internamente, si tiene empleados que sean hablantes nativos de los idiomas de destino.

Lea más sobre los flujos de trabajo de traducción:

[Reglas de contenido sobre las cinco fases del flujo de trabajo de traducción](https://contentrules.com/creating-translation-workflow/)

[Smartling sobre qué es la gestión del flujo de trabajo de traducción](https://www.smartling.com/resources/101/what-is-translation-workflow-management/)

[RixTrans sobre el flujo de trabajo de traducción](https://www.rixtrans.com/translation-workflow)

## Gestión de terminología {#terminology-management}

Establecer un plan claro sobre cómo manejar la terminología es uno de los pasos más importantes para garantizar la calidad y coherencia de sus traducciones y ahorrar tiempo a sus traductores.

En el espacio de la traducción, esto se conoce como gestión de terminología y es uno de los servicios clave que los proveedores de servicios lingüísticos ofrecen a sus clientes, además del acceso a su grupo de lingüistas y la gestión de contenido.

La gestión de terminología se refiere al proceso de identificar, recopilar y gestionar la terminología que es importante para su proyecto y que siempre debe traducirse de forma correcta y coherente.

Hay un par de pasos a seguir cuando se empieza a pensar en la gestión de terminología:

- Identificar los términos clave que deben incluirse en la base terminológica.
- Crear un glosario de términos y sus definiciones.
- Traducir los términos y añadirlos al glosario.
- Comprobar y aprobar las traducciones.
- Mantener el glosario y actualizarlo con nuevos términos, a medida que se vuelvan importantes.

Lea más sobre la gestión de terminología:

[Trados sobre qué es la gestión de terminología](https://www.trados.com/solutions/terminology-management/translation-101-what-is-terminology-management.html)

[Language Scientific sobre por qué es importante la gestión de terminología](https://www.languagescientific.com/terminology-management-why-it-matters/#:~:text=Terminology%20management%20is%20the%20process,are%20related%20to%20each%20other.)

[Clear Words Translation sobre qué es la gestión de terminología y por qué es importante](http://clearwordstranslations.com/language/en/what-is-terminology-management/)

### Memoria de traducción y glosario {#tm-and-glossary}

La memoria de traducción y el glosario son herramientas importantes en la industria de la traducción y algo en lo que confían la mayoría de los proveedores de servicios lingüísticos.

Veamos qué significan estos términos y en qué se diferencian entre sí:

**Memoria de traducción (TM)**: Una base de datos que almacena automáticamente segmentos o cadenas, incluidos bloques de texto más largos, oraciones completas, párrafos y términos individuales, así como sus traducciones actuales y anteriores en todos los idiomas.

La mayoría de las herramientas de localización, los sistemas de gestión de traducción y las herramientas de traducción asistida por ordenador tienen memorias de traducción integradas, que generalmente también se pueden exportar y utilizar en otras herramientas similares.

Los beneficios de utilizar una memoria de traducción incluyen traducciones más rápidas, mejor calidad de traducción, la capacidad de conservar ciertas traducciones al actualizar o cambiar el contenido de origen y costos de traducción más económicos para el contenido repetitivo.

Las memorias de traducción funcionan en base a un porcentaje de coincidencia entre diferentes segmentos y suelen ser más útiles cuando dos segmentos contienen más del 50 % del mismo contenido. También se utilizan para traducir automáticamente segmentos repetitivos, que son coincidencias del 100 %, eliminando así la necesidad de traducir el contenido repetitivo más de una vez.

Lea más sobre las memorias de traducción:

[Memsource sobre las memorias de traducción](https://www.memsource.com/translation-memory/)

[Smartling sobre qué es una memoria de traducción](https://www.smartling.com/resources/101/what-is-translation-memory/)

**Glosario**: Una lista de términos importantes o delicados, sus definiciones, funciones y traducciones establecidas. La principal diferencia entre un glosario y una memoria de traducción es que un glosario no se crea automáticamente y no contiene traducciones de oraciones completas.

La mayoría de las herramientas de localización, los sistemas de gestión de traducción y las herramientas de traducción asistida por ordenador tienen glosarios integrados que puede mantener para asegurarse de que contengan terminología importante para su proyecto. Al igual que la TM, el glosario generalmente se puede exportar y utilizar en otras herramientas de localización.

Antes de comenzar su proyecto de traducción, es muy recomendable tomarse un tiempo y crear un glosario para sus traductores y revisores. El uso de un glosario garantiza que los términos importantes se traduzcan correctamente, proporciona a los traductores el contexto que tanto necesitan y garantiza la coherencia en las traducciones.

Si bien los glosarios suelen contener traducciones establecidas en los idiomas de destino, también son útiles sin esto. Incluso sin traducciones establecidas, un glosario puede tener definiciones de términos técnicos, resaltar términos que no deben traducirse e informar a los traductores si un término específico se utiliza como sustantivo, verbo, nombre propio o cualquier otra categoría gramatical.

Lea más sobre los glosarios:

[Lionbridge sobre qué es un glosario de traducción](http://info.lionbridge.com/rs/lionbridge/images/Lionbridge%20FAQ_Glossary_2013.pdf)

[Transifex sobre los glosarios](https://docs.transifex.com/glossary/glossary)

Si no planea utilizar una herramienta de localización para su proyecto, es probable que no pueda utilizar una memoria de traducción y un glosario (podría crear un glosario o una base terminológica en un archivo de Excel; sin embargo, los glosarios automatizados eliminan la necesidad de que los traductores busquen manualmente los términos y sus definiciones).

Esto significa que todo el contenido repetitivo y similar tendría que traducirse manualmente cada vez. Además, los traductores tendrían que comunicarse con preguntas sobre si un determinado término debe traducirse o no, cómo se utiliza en el texto y si un término ya tiene una traducción establecida.

_¿Desea utilizar la memoria de traducción y el glosario de ethereum.org en su proyecto? Comuníquese con nosotros a translations@ethereum.org._

## Captación de traductores {#translator-outreach}

**Trabajar con un proveedor de servicios lingüísticos**

Si trabaja con un proveedor de servicios lingüísticos y sus traductores profesionales, es posible que esta sección no sea muy relevante para usted.

En este caso, es importante seleccionar un proveedor de servicios lingüísticos con la capacidad de proporcionar todos los servicios que necesita (por ejemplo, traducción, revisión, control de calidad) en muchos idiomas.

Si bien puede resultar tentador seleccionar un proveedor de servicios lingüísticos basándose únicamente en las tarifas que ofrecen, es importante tener en cuenta que los proveedores de servicios lingüísticos más grandes tienen tarifas más altas por una razón.

- Tienen decenas de miles de lingüistas en su base de datos, lo que significa que podrán asignar a su proyecto traductores con suficiente experiencia y conocimiento de su sector en particular (es decir, traductores técnicos).
- Tienen una gran experiencia trabajando en diferentes proyectos y satisfaciendo las diversas necesidades de sus clientes. Esto significa que será más probable que se adapten a su flujo de trabajo particular, ofrezcan sugerencias valiosas y posibles mejoras para su proceso de traducción, y satisfagan sus necesidades, requisitos y plazos.
- La mayoría de los proveedores de servicios lingüísticos más grandes también tienen sus propias herramientas de localización, memorias de traducción y glosarios que puede utilizar. De lo contrario, al menos tienen suficientes lingüistas en su grupo para asegurarse de que sus traductores estén familiarizados y puedan trabajar con cualquier herramienta de localización que desee utilizar.

Puede encontrar una comparación detallada de los proveedores de servicios lingüísticos más grandes del mundo, algunos detalles sobre cada uno de ellos y desgloses por los servicios que brindan, datos geográficos, etc. en el [informe Nimdzi 100 de 2021](https://www.nimdzi.com/nimdzi-100-top-lsp/).

**Trabajar con traductores no profesionales**

Es posible que esté trabajando con traductores no profesionales y buscando voluntarios que le ayuden a traducir.

Hay varias formas de llegar a las personas e invitarlas a unirse a su proyecto. Esto dependerá en gran medida de su producto y de lo grande que sea la comunidad que ya tenga.

A continuación se describen algunas formas de lograr la incorporación de voluntarios:

**Captación**: Si bien esto se cubre en cierta medida en los puntos a continuación, comunicarse con posibles voluntarios y asegurarse de que conozcan su iniciativa de traducción puede ser eficaz en sí mismo.

Muchas personas quieren involucrarse y contribuir a sus proyectos favoritos, pero a menudo no ven una forma clara de hacerlo sin ser desarrolladores o tener habilidades técnicas especiales. Si puede dar a conocer su proyecto, es probable que muchas personas bilingües estén dispuestas a participar.

**Búsqueda dentro de su comunidad**: La mayoría de los proyectos en el espacio ya tienen comunidades grandes y activas. Muchos de los miembros de su comunidad probablemente apreciarían la oportunidad de contribuir al proyecto de una manera sencilla.

Si bien la contribución a proyectos de código abierto a menudo se basa en la motivación intrínseca, también es una experiencia de aprendizaje fantástica. Cualquier persona interesada en aprender más sobre su proyecto probablemente estaría feliz de participar en un programa de traducción como voluntario, ya que le permitiría combinar el hecho de haber contribuido a algo que le importa con una experiencia de aprendizaje práctica e intensiva.

**Mención de la iniciativa en su producto**: Si su producto es popular y lo utiliza una gran cantidad de personas, destacar su programa de traducción y hacer un llamado a la acción a los usuarios mientras utilizan el producto puede ser extremadamente eficaz.

Esto podría ser tan simple como agregar un banner o una ventana emergente con una llamada a la acción (CTA) a su producto para aplicaciones y sitios web. Esto es eficaz porque su público objetivo es su comunidad: las personas que tienen más probabilidades de involucrarse en primer lugar.

**Redes sociales**: Las redes sociales pueden ser una forma eficaz de dar a conocer su programa de traducción y llegar a los miembros de su comunidad, así como a otras personas que aún no son miembros de su comunidad.

Si tiene un servidor de Discord o un canal de Telegram, es fácil utilizarlo para la captación, la comunicación con sus traductores y el reconocimiento a sus colaboradores.

Plataformas como X (anteriormente Twitter) también pueden ser útiles para la incorporación de nuevos miembros a la comunidad y para reconocer públicamente a sus colaboradores.

La Fundación Linux ha creado un extenso [Informe sobre la encuesta de colaboradores de FOSS de 2020](https://www.linuxfoundation.org/wp-content/uploads/2020FOSSContributorSurveyReport_121020.pdf), que analiza a los colaboradores de código abierto y sus motivaciones.

## Conclusión {#conclusion}

Este documento contiene algunas consideraciones clave que todo programa de traducción debe conocer. De ninguna manera es una guía exhaustiva, aunque puede ayudar a cualquier persona sin experiencia en la industria de la traducción a organizar un programa de traducción para su proyecto.

Si busca instrucciones más detalladas y desgloses de diferentes herramientas, procesos y aspectos críticos de la gestión de un programa de traducción, algunos de los proveedores de servicios lingüísticos más grandes mantienen blogs y a menudo publican artículos sobre diferentes aspectos del proceso de localización. Estos son los mejores recursos si desea profundizar en cualquiera de los temas anteriores y comprender cómo funciona el proceso de localización a nivel profesional.

Se incluyen algunos enlaces relevantes al final de cada sección; sin embargo, puede encontrar muchos otros recursos en línea.

Para propuestas de cooperación o información adicional, aprendizajes y mejores prácticas que hemos adquirido al mantener el Programa de traducción de ethereum.org, no dude en comunicarse con nosotros a translations@ethereum.org.