---
title: "El hackeo de The DAO: la historia de Ethereum Classic"
description: "La historia del hackeo de The DAO en 2016 y cómo la respuesta de la comunidad llevó a la creación de Ethereum Classic como una cadena separada."
lang: es
youtubeId: "rNeLuBOVe8A"
uploadDate: 2021-12-15
duration: "0:09:48"
educationLevel: beginner
topic:
  - "gobernanza"
  - "historia"
  - "dao"
format: explainer
author: Junion
breadcrumb: "El hackeo de The DAO"
---

Un video explicativo de **Junion** que cuenta la historia del hackeo de The DAO en 2016, uno de los mayores robos digitales en la historia cripto, y cómo la controvertida decisión de la comunidad de Ethereum de bifurcar la cadena de bloques llevó a la creación de Ethereum Classic.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=rNeLuBOVe8A) publicada por Junion. Ha sido ligeramente editada para facilitar su lectura.*

#### El descubrimiento (0:00) {#the-discovery-000}

Es lunes, 13 de junio de 2016. Un profesor de informática en Cornell está examinando el código de The DAO, uno de los proyectos más ambiciosos en el espacio cripto. Durante meses había estado abogando por que el proyecto se pusiera en pausa, ya que creía que había ciertos fallos que podrían poner todo en peligro. Pero hoy encuentra una vulnerabilidad grave: un error en la línea 666.

Teme que este error pueda permitir a un hacker realizar retiros ilimitados, como si fuera un cajero automático. Incluso si el atacante solo tuviera 10 dólares en su cuenta, podría retirarlos una y otra y otra vez hasta que todo el dinero desapareciera. Había 250 millones de dólares invertidos en The DAO, y cada centavo estaba en riesgo.

Slock.it, la empresa detrás de The DAO, reconoce la posible vulnerabilidad, pero declara que cualquier ataque sería inviable, por lo que todos los fondos siguen estando seguros. Hacen un commit en GitHub intercambiando dos líneas de código: una corrección que se incluirá como parte de la versión 1.1 del marco de trabajo de The DAO.

Pero justo cuando el equipo cantaba victoria, un hacker seguía en secreto sus pasos, desarrollando un exploit que aprovechaba exactamente este error. Ahora es viernes, cuatro días después, y The DAO acaba de ser hackeado por una suma de 55 millones de dólares.

Al igual que el hackeo de 81 millones de dólares a SWIFT hizo públicos los agujeros en la industria bancaria centralizada, y el ataque de ransomware WannaCry reveló vulnerabilidades críticas en los sistemas operativos de las computadoras, el hackeo de The DAO expuso la fragilidad temprana de la seguridad de los contratos inteligentes en un mundo donde el código dicta todo. Dejó a la comunidad de Ethereum devastada mientras se apresuraban a intentar recuperar el control de la cadena de bloques.

Esta es la historia de uno de los mayores robos digitales de la historia y el audaz intento de reescribir la historia para que nunca hubiera sucedido.

#### ¿Qué era The DAO? (2:00) {#what-was-the-dao-200}

Entra en escena The DAO, abreviatura de organización autónoma descentralizada (DAO, por sus siglas en inglés). La idea se inspiró en el micromecenazgo (crowdfunding). En lugar de múltiples fondos para diferentes proyectos, habría un solo fondo para gobernarlos a todos, y no había mejor manera de hacerlo que con una DAO.

En el lanzamiento, los inversores recibirían 100 tokens DAO por cada ether depositado. Estos tokens les daban gobernanza sobre el protocolo y representaban su participación en The DAO. Los poseedores de tokens podían enviar propuestas; por ejemplo, se podía proponer invertir un millón de dólares a cambio de una participación del 10 % en la empresa XYZ.

Una vez que una propuesta pasaba la verificación inicial, sería sometida a voto por todos los demás inversores. Durante este período, los poseedores de tokens podían votar que sí si creían que la inversión generaba un valor esperado positivo, o que no si creían que generaba un valor esperado negativo. También podían usar el foro para expresar sus opiniones y leer las de los demás.

Cuando terminaba el período de votación y se alcanzaba un cuórum del 20 % de todos los tokens, The DAO transfería automáticamente el ether especificado al contrato inteligente que representaba la propuesta. Cualquier ether generado a partir de estas propuestas sería devuelto a la tesorería. Era como un gran fondo de cobertura descentralizado, diseñado para obtener ganancias. La idea era que la sabiduría de la multitud ayudaría a crear las mejores oportunidades de inversión.

Sin embargo, todavía se necesitaba una forma de proteger a la minoría de ser oprimida por la mayoría. Si un grupo minoritario estaba en fuerte desacuerdo con una propuesta que no podían superar en votos, en lugar de votar que no, podían llamar a una función de división (split) y mover su ether de la DAO principal a una DAO secundaria, dividiendo esencialmente la DAO en dos. Esta función de división será muy importante más adelante.

#### El micromecenazgo (4:01) {#the-crowdfund-401}

The DAO fue el proyecto de micromecenazgo más grande de la historia, recaudando 12,7 millones de ether, con un valor de 150 millones de dólares en ese momento. Tuvo lugar durante la era temprana de Ethereum, donde el proyecto estuvo sujeto a una gran cantidad de entusiasmo y FOMO (miedo a quedarse fuera) por parte de los inversores.

Antes de esto, los proyectos de Ethereum habían sido principalmente pruebas de concepto arbitrarias, pero este era un proyecto completamente funcional con un enorme potencial. Era completamente seguro contra cualquier hackeo, protegido por los millones de mineros en todo el mundo, y era descentralizado: todo el proyecto estaba compuesto por una serie de contratos inteligentes en Ethereum.

Este era un código inmutable alojado en la computadora más segura del mundo, lo que garantizaba las propiedades clave de una DAO: una organización que es completamente descentralizada y autónoma. Una vez que los contratos se implementaron el 30 de abril, ninguna entidad individual, ni siquiera Slock.it, podía realizar cambios en el protocolo o detener su existencia. Su código había sido auditado innumerables veces por varios desarrolladores de Ethereum y estaba visible para que todos lo revisaran.

#### El hackeo (5:02) {#the-hack-502}

"Lonely, so lonely" (Solo, tan solo): el nombre de la Propuesta #59 de The DAO. Es solo una propuesta de división normal, pero en realidad es donde comienza el hackeo. Después de que el hacker enviara la propuesta, hay un período de debate estándar de siete días en el que cualquiera es libre de unirse. Sin embargo, nadie se une a esta división.

Es un procedimiento estándar que alguien llame a una división por sí mismo, cree una DAO secundaria y luego cree una propuesta que envíe todo el ether de vuelta a su billetera. Esto permite a un usuario reclamar su dinero respaldado por sus tokens DAO. Ya han pasado siete días, y ahora se le permite al hacker llamar a la función de división. Nadie sospecha nada.

Sin embargo, a medida que se llama a la función de división, la comunidad se da cuenta de algo alarmante. El ether está siendo drenado de The DAO a un ritmo de ocho millones de dólares por hora. La comunidad se apresura a descubrir qué está sucediendo. Parece que el atacante está llamando recursivamente a la función de división: una y otra y otra vez, cientos de veces.

¿Recuerdas esa corrección de error que tuvo lugar hace cuatro días? Es una lástima que no haya forma de editar el código de un contrato inteligente después de que se implementa, por lo que esta corrección solo existía en GitHub como parte de The DAO 1.1, una DAO completamente diferente que estaba en proceso de creación. Esta pequeña corrección podría haber evitado todo el asunto: todo lo que hacía era intercambiar dos líneas de código para que el saldo se actualizara antes del pago real.

Pero sin esta corrección, cualquiera podía llamar repetidamente a la función para retirar ether antes de que el contrato actualizara su saldo. Es como un cajero automático que no cambia tu saldo hasta que te ha dado el dinero. "¿Puedo retirar diez dólares? Espera, antes de eso, ¿puedo retirar diez dólares? Espera, antes de eso...".

#### El grupo Robin Hood (6:55) {#the-robin-hood-group-655}

Los poseedores de tokens DAO observaban cómo sus inversiones se drenaban lentamente de la DAO principal a la DAO secundaria, también conocida como la DAO oscura (dark DAO). Además, el precio de Ethereum sufrió una caída repentina de 20 a 15 dólares tras las noticias. Había que hacer algo, y la única forma era drenar el resto antes de que lo hiciera el hacker. Y así comenzó la carrera por vaciarla.

Al otro lado del mundo, en su apartamento en el barrio de Copacabana en Río de Janeiro, Alex Van de Sande se despierta con su teléfono inundado de mensajes de Skype. Se vuelve hacia su esposa y le dice: "¿Recuerdas cuando te hablaba de esa enorme pila de dinero imposible de hackear? Ha sido hackeada".

Alex se puso en contacto con otros desarrolladores no revelados y formaron un grupo al que apodaron Robin Hood: hackers de sombrero blanco que drenarían los fondos restantes y los devolverían a sus legítimos dueños. Sin embargo, no tenían tiempo para proponer una nueva división, ya que eso requeriría un período de votación de siete días.

En su lugar, fijaron su atención en la Propuesta #71, que estaba a punto de terminar en unas pocas horas. Se unirían a esa división y usarían el mismo hackeo para desviar todos los fondos restantes a esta DAO secundaria. Habían pasado seis horas desde que comenzó el ataque, y el ladrón había logrado robar el 30 % del ether de The DAO. Pero por alguna razón desconocida, el ataque dejó de funcionar. Las transacciones fallaron y todo llegó a su fin.

Mientras tanto, Alex se estaba preparando para lanzar el ataque de sombrero blanco para asegurar el 70 % restante de los fondos. Pero de repente perdió su conexión a internet. Con solo 30 minutos restantes, llamó frenéticamente a NET, su proveedor de servicios de internet brasileño, pero solo obtuvo una respuesta de una voz robótica: "Vemos que hay un problema de internet en su vecindario". La propuesta de división terminó y acababa de perder la oportunidad de ejecutar el ataque de Robin Hood.

A la mañana siguiente, Alex intentó reunir al grupo para infiltrarse en otra propuesta de división, pero los demás estaban ocupados. "Nos sentimos como los peores hackers de la historia. Fuimos frustrados por un mal internet y compromisos familiares".

#### La carrera por vaciarla (9:10) {#the-race-to-empty-910}

Cuatro días después del ataque inicial, The DAO estaba bajo ataque nuevamente. Se estaba drenando lentamente (unos pocos ether por ronda), pero ya había acumulado unos miles de dólares. Parecía ser de un atacante tanteando el terreno. En este punto, Robin Hood necesitaba hacer algo.

Eligieron infiltrarse en la División #78 porque habían identificado al curador de la propuesta y estaba terminando pronto. Se pusieron en contacto con algunas ballenas que estuvieron felices de donar sus tokens DAO, lo que permitió al equipo asegurar seis millones de tokens. Cuantos más tokens tuviera el contrato de Robin, más rápido podría desviar ether. El atacante aceleró el ritmo y otros atacantes se unieron. Pero gracias a las donaciones, Robin Hood pudo superarlos. Esto les permitió asegurar 7,2 millones de ether: el 55 % de The DAO.

#### La bifurcación (10:08) {#the-fork-1008}

La DAO principal ahora había sido drenada y todos los fondos estaban distribuidos en varias DAO secundarias, siendo las dos principales la DAO de sombrero blanco y la DAO oscura. Pero todo el dinero estaba bloqueado por tiempo. No se podía presentar ninguna propuesta bajo una DAO secundaria hasta que terminara un período de espera de 27 días. E incluso después de eso, enviar fondos a una dirección externa requería enviar una propuesta y esperar dos semanas. Esencialmente, todavía faltaban 41 días para que el hacker pudiera retirar lo que equivalía al 5 % del suministro total de Ethereum.

Pero el hacker nunca llegaría a tocar su Ethereum. Lo que sucedió a continuación es uno de los episodios más audaces y controvertidos en la historia de la cadena de bloques. La comunidad decidió que no iban a dejar que el hacker ganara. Querían reescribir la historia para que cada transacción involucrada en el hackeo se deshiciera, y todos recuperaran su dinero. Eligieron bifurcar Ethereum.

Una cadena de bloques es como una lista de transacciones que sigue creciendo con cada bloque minado. Cada transacción queda arraigada en la cadena de bloques para siempre. Pero si más del 50 % de los mineros se confabulan, pueden alterar falsamente la cadena de bloques, reescribiendo la historia como quieran. Por lo general, esto se llama un ataque del 51%. Pero no había nada malicioso en esta bifurcación: la comunidad solo estaba reclamando el dinero que les había sido robado.

#### El código es la ley (11:48) {#code-is-law-1148}

Aun así, no todos estaban de acuerdo con la bifurcación propuesta. Argumentaban que el código es la ley. Desde este punto de vista, el atacante era menos un hacker y más un abogado inteligente que leyó cuidadosamente los términos de un contrato. Por lo tanto, en realidad no se robaron fondos y deberían tener derecho legítimo al ether de la DAO oscura.

Es importante tener en cuenta que Ethereum en sí nunca fue realmente hackeado: fue solo un contrato inteligente mal escrito que fue explotado. Dos cosas diferentes. Además, creían que las cosas que suceden en la cadena de bloques son inmutables y nunca deberían ser alteradas independientemente de la situación.

Un día después del ataque inicial, el atacante envió una carta abierta en el chat grupal de Slack de The DAO, firmada con su clave privada:

"A The DAO y a la comunidad de Ethereum: He examinado cuidadosamente el código de The DAO y he reclamado legítimamente 3 millones de ether, y me gustaría agradecer a The DAO por esta recompensa. Estoy decepcionado por aquellos que caracterizan el uso de esta característica intencional como 'robo'. Estoy haciendo uso de esta característica codificada explícitamente según los términos del contrato inteligente. Una bifurcación suave o una bifurcación dura equivaldría a la incautación de mi ether legítimo y legal. Tal bifurcación arruinaría de manera permanente e irrevocable toda la confianza no solo en Ethereum, sino también en el campo de los contratos inteligentes y la tecnología de cadena de bloques. No se equivoquen: cualquier bifurcación, suave o dura, dañará aún más a Ethereum y destruirá su reputación y atractivo".

Tras una inspección más profunda, la gente se dio cuenta de que la firma era inválida, por lo que esta carta solo fue escrita por alguien que afirmaba ser el atacante.

Por otro lado, los defensores argumentaban que "el código es la ley" es una declaración demasiado drástica y que los humanos deberían tener la última palabra a través del consenso social. No se le debería permitir al hacker beneficiarse del exploit, ya que es éticamente incorrecto y muy probablemente ilegal. Pero lo más importante, The DAO era simplemente demasiado grande para caer. Poseía alrededor del 15 % del suministro total de ether.

#### Ethereum Classic (14:34) {#ethereum-classic-1434}

En un evento que se hizo eco de la crisis financiera de 2008, los desarrolladores de Ethereum rescataron a The DAO. Vitalik Buterin, el creador y desarrollador principal de Ethereum, no se disculpó por presionar a favor de una bifurcación. En una entrevista, dijo más tarde: "Algunos usuarios de Bitcoin ven la bifurcación dura como una violación de sus valores más fundamentales de alguna manera. Personalmente, creo que estos valores fundamentales, llevados a tales extremos, son una tontería".

Estos puntos de vista dominaron a la mayoría de la comunidad de Ethereum. Un controvertido voto de la comunidad, donde un ether equivale a un voto, mostró un 87 % de apoyo a la bifurcación. Así que en el bloque 1.920.000, los nodos informáticos de todo el mundo actualizaron su software y aceptaron la bifurcación. Todo el ether de The DAO y las DAO secundarias se trasladó a un contrato de reembolso.

Pero no termina ahí. La cadena de bloques original de Ethereum, la que tenía el hackeo de The DAO, siguió adelante. De hecho, estaba creciendo. Los mineros que se oponían a la bifurcación continuaron minando bloques y todavía se estaban realizando transacciones. Al día siguiente, Poloniex incluyó la moneda y comenzó a cotizar a 2 dólares cada una. Esta cadena se conoció como Ethereum Classic: la cadena de bloques original e inalterada.

Si tenías ether antes de la bifurcación, ahora tendrías un Ethereum y un Ethereum Classic. Si tenías un ether en The DAO, podrías retirar un Ethereum del contrato de reembolso. Y si acababas de hackear The DAO, habrías hecho una fortuna decente en Ethereum Classic: alrededor de siete millones de dólares.

#### El legado de The DAO (16:14) {#legacy-of-the-dao-1614}

Inicialmente, Ethereum Classic ganó impulso como una alternativa, con una fuerte comunidad de fundamentalistas de la cadena de bloques que no estaban de acuerdo con el rescate. Pero desde entonces, Ethereum Classic no ha logrado ganar tracción y solo existe realmente como una idea con poca utilidad. Mientras que Ethereum alberga miles de protocolos, Ethereum Classic solo tiene unos pocos básicos. Está claro que la bifurcación había ganado.

Dos meses después, Robin Hood transfirió 2,9 millones de su Ethereum Classic a Poloniex y lo vendió todo por Ethereum en un intento de hundir el precio. El 14 % se convirtió con éxito, pero el 86 % fue congelado por Poloniex y devuelto al grupo. Robin Hood estableció un contrato de reembolso en la red de Ethereum Classic para los usuarios afectados por el hackeo de The DAO.

En cuanto al hacker, se fue con 3,6 millones de Ethereum Classic, con un valor de 150 millones de dólares en la actualidad. Pero si no hubiera habido una bifurcación, esos 3,6 millones de Ethereum valdrían más de siete mil millones de dólares en la actualidad.

#### El impacto duradero de The DAO (17:26) {#the-daos-lasting-impact-1726}

Es importante tener en cuenta que The DAO ahora se conoce comúnmente como Genesis DAO para evitar confusiones, porque fue la primera DAO, pero definitivamente no la última. A pesar de los contratiempos iniciales, las DAO solo se han vuelto más populares. MakerDAO gobierna la moneda estable DAI, y los protocolos de finanzas descentralizadas (DeFi) como Uniswap con su token UNI generalmente tienen una DAO de gobernanza. Todas estas DAO se construyeron a partir de las experiencias de proyectos anteriores para crear organizaciones aún más versátiles y exitosas.

Pero la Genesis DAO fue la primera de su tipo, creada como un experimento (uno costoso) que controlaba 250 millones de dólares en su punto máximo, o el 15 % del suministro total de Ethereum. Christoph Jentzsch, el desarrollador principal, solo esperaba que recaudara cinco millones de dólares y luego dijo que se arrepiente de no haberle puesto un límite. Para un experimento tan grande, era demasiado pronto y ciertamente demasiado grande para caer.

Crear un contrato inteligente es como desarrollar un automóvil autónomo: es una gran responsabilidad que requiere pruebas exhaustivas para evitar accidentes. Incluso con esta nueva precaución, los protocolos DeFi todavía son hackeados por más de 50 millones de dólares, algunos incluso después de ser auditados por firmas de auditoría profesionales. Pero desde el hackeo de The DAO, no ha habido más rescates. La comunidad de Ethereum es más fuerte ahora y está lista para pasar a proyectos aún más grandes y ambiciosos, construyendo la próxima generación de aplicaciones digitales.