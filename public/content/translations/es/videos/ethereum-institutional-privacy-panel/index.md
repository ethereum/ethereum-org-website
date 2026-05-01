---
title: "Privacidad institucional en Ethereum ahora"
description: "Un panel en el evento Web3Privacy Now durante Devconnect 2025, con expertos que debaten sobre las necesidades reales de privacidad institucional en Ethereum, desde el cumplimiento normativo hasta las pruebas de conocimiento cero."
lang: es
youtubeId: "cZqlg4W1Els"
uploadDate: 2025-11-22
duration: "0:30:50"
educationLevel: advanced
topic:
  - "privacy-and-security"
  - "privacy"
format: panel
author: Web3Privacy Now
breadcrumb: "Privacidad institucional"
---

Un panel en el evento Web3Privacy Now durante Devconnect 2025, moderado por **Oskar Thorin** (IPTF/EF), con la participación de **Zach Obront** (Etherealize), **Amzah** (ABN Amro), **Eugenio** (European Blockchain Association) y **François** (Polygon Miden), en el que se debaten las necesidades reales de privacidad institucional en Ethereum, desde el cumplimiento normativo hasta las pruebas de conocimiento cero para las finanzas descentralizadas (DeFi) institucionales.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=cZqlg4W1Els) publicada por Web3Privacy Now. Ha sido ligeramente editada para facilitar su lectura.*

#### Introducción al Grupo de Trabajo de Privacidad Institucional (0:03) {#introduction-to-institutional-privacy-task-force-003}

**Oskar Thorin:** Hola. ¿Me escuchan? Muy bien. Genial. Primero daremos una charla introductoria muy breve, de unos 3 a 5 minutos, y luego pasaremos al panel. Esta es una charla resumida. El panel anterior habló mucho sobre cumplimiento normativo, privacidad y demás. Di una charla anterior en el Cyban Congress que también abordó esto, y habrá una versión más larga de esta charla en el DeFi Day más tarde hoy. Pero de lo que quiero hablar es de la privacidad institucional en Ethereum.

Mi nombre es Oskar y soy el líder del IPTF en la Fundación Ethereum. Sus siglas significan Grupo de Trabajo de Privacidad Institucional (Institutional Privacy Task Force). ¿Y por qué importa la privacidad institucional? Importa por varias razones. Creo que una gran razón es que si observas estas enormes instituciones financieras que existen, estamos hablando de billones de dólares en flujo monetario. Antes, la regulación era el mayor obstáculo para que se movieran en cadena. Pero lo que ha sucedido en los últimos años es que, en realidad, la privacidad es su mayor obstáculo.

Entonces, ¿cuál es la ventaja y el impacto aquí? Creo que incluso mover solo el 1 % de los fondos de las finanzas tradicionales a Ethereum tendría un impacto masivo en términos del impacto que Ethereum puede tener en la privacidad. Y el simple hecho de tener una sola institución con su incorporación aquí también afecta a millones de usuarios, ¿verdad? Esto no es hipotético. Hay instituciones que ya están en cadena, y hay múltiples cosas sucediendo durante el próximo año más o menos aquí. El momento para esto es ahora, en términos de instituciones moviéndose en cadena con privacidad integrada.

Una sola gran institución aquí puede tener un impacto masivo en qué ecosistema gana finalmente, ya sea Ethereum o versiones más privadas. ¿Por qué quieren Ethereum? Hay varias razones. Cosas como la liquidez, la resistencia a la censura, 10 años de tiempo de actividad y que sea un punto de venta en términos de liquidación. También hay otras alternativas, pero tienen diferentes limitaciones. 

Para que Ethereum logre la incorporación de estas instituciones, necesitan abordar estas preocupaciones de privacidad. Lo que estamos intentando hacer en el Grupo de Trabajo de Privacidad Institucional es incorporar instituciones a Ethereum y asegurarnos de que se cumplan sus objetivos de privacidad. Hacemos cosas como talleres, intentando desmitificar el espacio y asegurarnos de que podemos abordar las necesidades institucionales en lo que respecta a la privacidad específicamente. El primer artefacto que tenemos es este mapa de privacidad institucional: hablamos con instituciones masivas, entendemos sus casos de uso comercial y requisitos, hacemos de código abierto todo lo posible y luego hablamos con proveedores en el espacio para conectar a las instituciones con el espacio de soluciones. 

#### Presentaciones del panel y problemas institucionales (5:00) {#panel-introductions-and-institutional-problems-500}

**Oskar Thorin:** Siento que haya sido un poco rápido, pero espero que se haya entendido. Este panel cuenta con muchos expertos en investigación, políticas e ingeniería, y hablaremos sobre la privacidad institucional. 

Solo una breve introducción: Tenemos a Eugenio, quien es el Jefe de Crecimiento en la European Blockchain Association. Tenemos a Zach Obront, CEO de Etherealize, donde está construyendo productos institucionales y primitivas de privacidad subyacentes. Tenemos a Amzah, quien pasó la mayor parte de su carrera en la gestión de riesgos financieros antes de involucrarse profundamente en Ethereum, y ahora está sirviendo de puente entre los controles tradicionales y los mercados nativos de Ethereum. Y finalmente, tenemos a François, un ingeniero de protocolo de personal sénior en Polygon Miden, enfocado en sistemas de pruebas de conocimiento cero.

Para empezar, en una oración o tal vez en unas pocas, ¿en qué problemas institucionales están trabajando que realmente requieran privacidad en vías públicas en lugar de solo una base de datos tradicional o una cadena privada? Tal vez podamos empezar con François.

**François:** Sí, por supuesto, siempre puedes construir en una cadena de bloques privada, pero hoy creemos que las instituciones quieren acceder a la liquidez global que ofrece Ethereum mientras al mismo tiempo conservan lo que tienen del mundo de las finanzas tradicionales, que es un grado de privacidad que les permite operar con liquidez global sin hacer públicas la totalidad de sus operaciones. Para nosotros, por eso es importante tanto integrar la privacidad como construir sobre Ethereum.

**Eugenio:** Bueno, tal vez pueda abordar esto desde una perspectiva diferente: desde la perspectiva de los estándares. En el proceso de estándares, hay un concepto muy importante para las instituciones, que es el ancla de confianza. Esencialmente, cada institución tiene un gran entorno fuera de la cadena, hacia el cual anclan la responsabilidad en la sociedad para todos los que usan sus servicios. Una parte del gran problema al crear servicios basados en cadenas de bloques para instituciones es cómo crear un sistema eficiente para servir de puente del ancla de confianza hacia el mundo en cadena, y luego cómo integrar técnicas criptográficas para garantizar que los datos se procesen de manera mínima, pero auditable y verificable.

**Zach Obront:** Genial. En Etherealize, estamos enfocados en actualizar algunos de los funcionamientos internos profundos de los mercados financieros, específicamente los mercados de crédito. Así que lo abordaré desde dos direcciones. Una es *¿por qué la privacidad?* En este momento, todos estos mercados funcionan con acuerdos bilaterales. Hay dos partes. Están muy acostumbrados a la idea de que la información exacta que necesita filtrarse, se filtra, y nada más. Y por lo tanto, la única forma en que considerarían las cadenas de bloques públicas es si se cumple ese nivel de privacidad.

Desde la otra dirección, *¿por qué estar en una cadena de bloques pública?* Estos son mercados complejos con partes que no necesariamente confían entre sí y necesitan depender de la regulación en diferentes países. Tener una fuente de verdad en el centro de esos mercados es una gran ventaja que no se puede lograr sin una cadena de bloques pública. En este momento están en una especie de punto muerto diciendo: "Existe este potencial de actualización, pero no podemos hacerlo sin la privacidad que necesitamos". Estamos intentando unir esas cosas.

**Amzah:** Sí. Trabajo para ABN Amro, que es un gran banco holandés. Tenemos 5 millones de clientes minoristas. Así que en realidad no estamos construyendo algo en este momento específicamente en privacidad, pero lo que se avecina ahora es, por ejemplo, una billetera de identidad digital. Por lo general, cómo funciona eso es que los datos se almacenan en una base de datos centralizada y luego te conectas con un proveedor externo o un tercero, pero eso, por supuesto, no es realmente seguro. Así que ya estamos empezando a pensar en cómo podemos usar pruebas de conocimiento cero, por ejemplo, para poder tener una divulgación selectiva con partes externas. En ese sentido, podemos proteger la información de nuestros clientes y también permitirles conectarse con el entorno más amplio de la Web3.

#### Flujos de trabajo concretos y almacenamiento (10:07) {#concrete-workflows-and-storage-1007}

**Oskar Thorin:** De acuerdo, genial. Si eliges un flujo concreto que te pueda importar, como tal vez algunas emisiones de bonos, operaciones o pagos de tesorería, ¿quién puede ver qué exactamente en qué paso, y qué se almacena en cadena frente a fuera de la cadena? Tal vez empezando con François.

**François:** Una excelente manera de abordar esto es hacerlo desde el punto de vista de querer operar con un DEX en Uniswap. Lo bueno es que podemos ofrecer en Miden algo que brinda anonimato total. Tenemos cuentas anónimas que operan entre sí a través de notas. Es una mezcla del modelo de cuenta y el modelo UTXO. 

Si estás operando con una plataforma, esa plataforma querrá ser pública. Como DEX, quieres volver a publicar los precios cada vez que has interactuado con alguien. Así que estás emitiendo notas en un lote. Como usuario, no hay nada en cadena excepto lo que la plataforma pueda descifrar. La plataforma realiza tu operación y emite notas en la salida. Esas notas luego pueden ser reclamadas por cuentas que pueden ser totalmente privadas. Así que conservas el anonimato total en lo que respecta a los usuarios, con la excepción de la plataforma que ha decidido revelar cierta información públicamente. Además de eso, construimos flujos de cumplimiento normativo, que incluyen flujos de trabajo de auditabilidad y políticas de claves de visualización que permiten la ingeniería de mercado a nivel local.

**Eugenio:** Bueno, tal vez pueda abordarlo más desde una perspectiva funcional. Generalmente, cada flujo de emisión o distribución para servicios institucionales tiene tres pilares clave. El primero es la identidad y la confianza, que está conectado al flujo de incorporación para inversores, procesos KYC/KYB, y demás.

El segundo es la aplicación de políticas. La cuenta recopila toda la información de este entorno fuera de la cadena y genera un activador para una declaración de ejecuciones en la cadena de bloques. En este contexto, las técnicas de preservación de la privacidad pueden lograr una distribución eficiente. Por ejemplo, una oferta que solo se puede distribuir a ciertos tipos de inversores asociados con ciertos tipos de cuentas.

El tercer pilar es la presentación de informes. Esto está asociado con la incorporación y las operaciones comerciales en cadena. El pegamento de todos estos servicios es cómo extraemos de las atestaciones de datos en cadena los puntos de datos que realmente necesitamos fuera de la cadena para proporcionar informes tradicionales a nuestros clientes al final.

**Zach Obront:** La respuesta a esto es muy diferente dependiendo de qué flujo, ¿verdad? Este es uno de los desafíos en este espacio: es difícil tener principios generales. Un ejemplo de un flujo es un gran préstamo donde se realiza un pago de intereses y se divide entre un montón de prestamistas. La expectativa es que nadie debería saber sobre eso. No hay regulación al respecto. Se permite que sea totalmente privado, y queremos poder respaldar ese extremo del espectro. 

En el otro extremo, tal vez haya un intercambio de posiciones entre prestamistas, y hay expectativas de que ciertas partes administrativas puedan ver que la operación ocurrió, pero no el precio. Tal vez otros puedan ver todos los detalles. Hemos construido todo en torno a este modelo flexible donde no queremos codificar de forma rígida las reglas de cumplimiento normativo. Queremos decir que un usuario o aplicación puede determinar eso por sí mismo. Tenemos la capacidad de hacer cumplir reglas en torno a que los reguladores o cuerpos administrativos puedan ver cosas, o incluso proporcionar datos agregados a asociaciones.

**Amzah:** Sí. Estoy mayormente de acuerdo con lo que dijo Zach. En el pasado, cuando las instituciones pensaban en la privacidad, simplemente iniciaban una cadena privada donde tal vez participaban 20 bancos y solo ellos podían ver lo que había allí. Pero en realidad, es mucho más matizado. Depende del caso de uso, qué tipo de flujos y qué necesita saber el regulador. Puedes poner información de saldo en cadena de una forma más agregada usando pruebas de reservas, por ejemplo.

#### Requisitos no negociables (15:26) {#non-negotiable-requirements-1526}

**Oskar Thorin:** Eugenio y Amzah, desde los bancos, plataformas y reguladores, ¿cuáles son algunos requisitos no negociables que siguen escuchando una y otra vez? ¿Como pistas de auditoría, reglas KYC o requisitos de presentación de informes?

**Eugenio:** Yo diría que la responsabilidad en lo que respecta al proceso de incorporación, y el cumplimiento normativo asociado con la presentación de informes. Para mí, se trata de enmarcar requisitos comerciales concretos en estructuras técnicas. El diablo está en los detalles: si tu usuario es una aplicación o un inversor crea un flujo de proceso diferente para tu ecosistema. El objetivo debería ser construir este sistema de manera eficiente, de lo contrario, estaremos bloqueados para la adopción. Es por eso que la infraestructura de cuentas en Ethereum está evolucionando de una manera muy genial.

**Amzah:** Sí, no tengo nada que añadir a eso. 

**François:** Nuestro cofundador pasa semanas con clientes en el espacio institucional, y la demanda de más alto nivel que surge es el "control". Quién ve qué, cuándo y por qué motivo. Y luego desglosas esas conversaciones en detalles y se vuelven increíblemente personalizadas. Para nosotros, esto es genial porque el mundo de las finanzas tradicionales ha pasado décadas construyendo sus prácticas contables y flujos ALD/CFT. Son muy específicos sobre ese control. Así que estamos construyendo esas capacidades en la capa del protocolo y apoyando a los clientes en su viaje.

#### Compensaciones y liquidez global (18:10) {#trade-offs-and-global-liquidity-1810}

**Oskar Thorin:** ¿Cuáles son las principales compensaciones con las que viven actualmente? ¿Rendimiento frente a privacidad, o liquidez global frente a controles estrictos, o transparencia en cadena frente a registros fuera de la cadena? Empezando con Zach.

**Zach Obront:** Afortunadamente, estamos en un mercado donde la velocidad no es la mayor prioridad. Muchos mercados de crédito se liquidan en semanas, por lo que los segundos no son lo más importante en sus mentes. Pero la experiencia de usuario (UX) de la privacidad es muy difícil. Las cadenas de bloques son muy buenas para mantener este concepto de estado en cola, manejar si las cosas cambian y asegurarse de que las transacciones se ordenen correctamente. A medida que comenzamos a poner en cola transacciones privadas, las cosas se complican. Tenemos que descubrir la mejor experiencia de usuario que se integre con la privacidad, especialmente porque la gente espera que los sistemas sean tanto privados como fáciles de usar.

**François:** Quería destacar las compensaciones que *no* tenemos, gracias a Ethereum. Las instituciones realmente solo quieren ingresar a los mercados si vale la pena su tiempo, lo que significa que quieren un mercado global con efectos de red, liquidez profunda y muchas contrapartes. Ser un rollup en Ethereum, en lugar de una cadena privada u otra capa 1 (l1), nos da acceso a ese mercado profundo.

Por supuesto, hay complejidades. Nos importa mucho esa experiencia de guante blanco para una institución que ingresa a ese mercado, para que puedan tener sus propias condiciones. Uno de los desafíos es el equilibrio entre la privacidad y la resistencia a las amenazas. Existen actores de amenazas en el mundo de la Web3, y queremos tener un mejor control sobre eso para ofrecer una experiencia fantástica. Nos estamos acercando a la descentralización con cuidado: sabemos cómo hacerlo, pero lo haremos en el momento en que mejor sirva a los clientes.

#### Confianza del sistema e impulsores de adopción (20:47) {#system-trust-and-adoption-drivers-2047}

**Oskar Thorin:** Eugenio, ¿cómo haces que estas soluciones sean confiables y utilizables por instituciones y gobiernos?

**Eugenio:** Todo comienza por intentar considerar los servicios institucionales como sistemas integrados, donde cada parte del sistema tiene su propia regla de acceso específica. Desde la originación de datos hasta la compresión de datos en la capa 2 (l2) y la descentralización de datos en la capa 1 (l1). Si combinamos este sistema donde el entorno fuera de la cadena mantiene la suposición de confianza de la institución, podemos asignar diferentes procesos a la capa 2 (l2) y a la capa 1 (l1).

**Oskar Thorin:** Amzah, ¿cómo ves el hacer que los sistemas sean confiables y utilizables?

**Amzah:** Para nosotros, es realmente importante que sea personalizable. La cadena de bloques ya no es solo un caso de uso donde todo es totalmente público o totalmente privado. No es una talla única para todos. Lo que también es más importante para nosotros es cumplir con las normativas. El sector bancario en Europa está fuertemente regulado, y si algo no es correcto con respecto a la privacidad, simplemente no es aceptado por los reguladores.

#### Mirando hacia el 2026 (23:15) {#looking-ahead-to-2026-2315}

**Oskar Thorin:** Muy bien, ya casi llegamos al final. ¿Cuál es un bloque de construcción (técnico, operativo o de políticas) que creen que aceleraría significativamente la adopción institucional? Y si nos volvemos a encontrar en 2026, ¿qué creen que es realista que haya sucedido este año?

**Zach Obront:** Creo que "institucional" y "privacidad" son actualmente términos muy amplios, y se cruzan de manera diferente en los distintos casos de uso. A algunos les importa conectarse a mercados líquidos, mientras que otros solo quieren una mejor infraestructura interna. Nos haría avanzar el obtener claridad sobre las situaciones específicas que estamos intentando resolver. No ha habido una categorización profunda de los requisitos de cumplimiento normativo. Impulsar el mapeo de esos requisitos y convertirlos en un protocolo que los respalde elevaría nuestra capacidad de construir, en lugar de depender de un mundo fragmentado dirigido por abogados.

**Amzah:** La tecnología ha avanzado mucho con las pruebas de conocimiento cero y el cifrado totalmente homomórfico. Creo que una de las cosas más importantes a mejorar es la educación para los reguladores y las instituciones. Puede que hayan oído hablar de las pruebas de conocimiento cero, pero realmente no saben cómo funcionan. La mayoría de los reguladores todavía piensan desde un punto de vista legal: si algo se rompe, ¿a quién podemos llamar? Y si no hay a quién llamar, esa es una percepción difícil para ellos.

**Eugenio:** En el lado tecnológico, la prueba y agregación en tiempo real de conocimiento cero realmente nos permitirá construir casos de uso complejos combinando aplicaciones, clientes institucionales y la capa 1 (l1). También apoyo lo que dijo Amzah sobre la educación. Para 2026, me gustaría ver un compromiso más colaborativo entre proyectos para que las aplicaciones realmente puedan comenzar a tener acceso a la liquidez global y a las redes globales.

**François:** Si nos reunimos en un año, me gustaría haber lanzado la Red principal de Miden en la primavera, para que podamos celebrarlo. Más allá de esto, me gustaría que estuviéramos en camino hacia la descentralización total. Requerirá el esfuerzo de todos. Lo principal que quiero que suceda es un mayor compromiso. La idea de que la privacidad está reñida con el cumplimiento normativo no es realmente cierta, pero unir ambos requiere trabajo. Queremos que las instituciones ayuden a dar forma al tipo de mercados que quieren ver, porque sabemos que esto va a ser complicado y peculiar a sus necesidades.

#### Reflexiones finales (28:05) {#closing-thoughts-2805}

**Oskar Thorin:** Solo quiero darles a cada uno de ustedes de 10 a 20 segundos para mencionar algo que haya sucedido esta semana o hacer una rápida promoción antes de terminar.

**Amzah:** Hace tres años, fui voluntario ayudando en uno de los primeros Devconnects. Ver cómo la gente mira a las instituciones ahora en comparación con entonces es una mejora masiva.

**Zach Obront:** Es simplemente asombroso cuánta privacidad se respira en el ambiente este año. Mi experiencia es en seguridad, y hay una falta de investigadores de seguridad que entiendan estas cosas. A cualquiera en esa intersección, lo animo a que se dedique de lleno.

**Eugenio:** Elegiré la organización regulatoria de datos: creo que hay mucha esperanza para las pruebas de conocimiento cero (ZKP) en un dominio de datos que cumpla con las normativas, y la capa de interoperabilidad de Ethereum ayudará a llevar a las instituciones en cadena.

**François:** Es muy difícil como ingeniero; por lo general, escuchas sobre un tema especializado. Recientemente hemos implementado precompilados en Miden, lo que abre la verificación de flujos que involucran aprendizaje automático. Si eres un nerd extremo como yo, realmente quieres hacer aprendizaje automático y pruebas de aprendizaje automático, y eso es algo que ahora podemos hacer.

**Oskar Thorin:** Quiero agradecer a todos los panelistas. Escuchamos algunas perspectivas muy interesantes en tecnología, políticas e ingeniería. Solo rascamos la superficie, pero les recomiendo que hablen más si están interesados en este tema. Gracias.