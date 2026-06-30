---
title: "Ausencia de estado, caducidad del estado y expiración del historial"
description: "Explicación de la expiración del historial y el Ethereum sin estado"
lang: es
---

La capacidad de ejecutar nodos de [Ethereum](/) en hardware modesto es fundamental para una verdadera descentralización. Esto se debe a que ejecutar un nodo brinda a los usuarios la capacidad de verificar información realizando comprobaciones criptográficas de forma independiente en lugar de confiar en que un tercero les proporcione los datos. Ejecutar un nodo permite a los usuarios enviar transacciones directamente a la red entre pares de Ethereum en lugar de tener que confiar en un intermediario. La descentralización no es posible si estos beneficios solo están disponibles para usuarios con hardware costoso. En cambio, los nodos deberían poder ejecutarse con requisitos de procesamiento y memoria extremadamente modestos para que puedan funcionar en teléfonos móviles, microcomputadoras o de manera imperceptible en una computadora doméstica.

Hoy en día, los altos requisitos de espacio en disco son la principal barrera que impide el acceso universal a los nodos. Esto se debe principalmente a la necesidad de almacenar grandes porciones de los datos del estado de Ethereum. Estos datos del estado contienen información crítica requerida para procesar correctamente nuevos bloques y transacciones. Al momento de escribir este artículo, se recomienda un SSD rápido de 2 TB para ejecutar un nodo completo de Ethereum. Para un nodo que no poda ningún dato antiguo, el requisito de almacenamiento crece a unos 14 GB/semana, y los nodos de archivo que almacenan todos los datos desde el bloque génesis se acercan a los 12 TB (al momento de escribir este artículo, en febrero de 2023).

Se pueden usar discos duros más baratos para almacenar datos antiguos, pero son demasiado lentos para mantenerse al día con los bloques entrantes. Mantener los modelos de almacenamiento actuales para los clientes mientras se hace que los datos sean más baratos y fáciles de almacenar es solo una solución temporal y parcial al problema porque el crecimiento del estado de Ethereum es 'ilimitado', lo que significa que los requisitos de almacenamiento solo pueden aumentar, y las mejoras tecnológicas siempre tendrán que seguir el ritmo del crecimiento continuo del estado. En cambio, los clientes deben encontrar nuevas formas de verificar bloques y transacciones que no dependan de buscar datos en bases de datos locales.

## Reducción del almacenamiento para los nodos {#reducing-storage-for-nodes}

Hay varias formas de reducir la cantidad de datos que cada nodo tiene que almacenar, cada una de las cuales requiere que el protocolo central de Ethereum se actualice en diferente medida:

- **Expiración del historial**: permite a los nodos descartar datos del estado con una antigüedad mayor a X bloques, pero no cambia cómo los clientes de Ethereum manejan los datos del estado.
- **Caducidad del estado**: permite que los datos del estado que no se usan con frecuencia se vuelvan inactivos. Los clientes pueden ignorar los datos inactivos hasta que sean resucitados.
- **Ausencia de estado débil**: solo los productores de bloques necesitan acceso a los datos completos del estado, otros nodos pueden verificar bloques sin una base de datos de estado local.
- **Ausencia de estado fuerte**: ningún nodo necesita acceso a los datos completos del estado.

## Caducidad de los datos {#data-expiry}

### Expiración del historial {#history-expiry}

La expiración del historial se refiere a que los clientes podan los datos más antiguos que es poco probable que necesiten, de modo que solo almacenan una pequeña cantidad de datos históricos, descartando los datos más antiguos cuando llegan datos nuevos. Hay dos razones por las que los clientes requieren datos históricos: la sincronización y la atención de solicitudes de datos. Originalmente, los clientes tenían que sincronizar desde el bloque génesis, verificando que cada bloque sucesivo fuera correcto hasta la cabeza de la cadena. Hoy en día, los clientes utilizan "puntos de control de subjetividad débil" para arrancar su camino hacia la cabeza de la cadena. Estos puntos de control son puntos de inicio confiables, como tener un bloque génesis cerca del presente en lugar del comienzo mismo de Ethereum. Esto significa que los clientes pueden descartar toda la información anterior al punto de control de subjetividad débil más reciente sin perder la capacidad de sincronizar con la cabeza de la cadena. Actualmente, los clientes atienden las solicitudes (que llegan a través de JSON-RPC) de datos históricos tomándolos de sus bases de datos locales. Sin embargo, con la expiración del historial esto no será posible si los datos solicitados han sido podados. Servir estos datos históricos es donde se requieren algunas soluciones innovadoras.

Una opción es que los clientes soliciten datos históricos a sus pares utilizando una solución como la Portal Network. La Portal Network es una red entre pares en desarrollo para servir datos históricos donde cada nodo almacena una pequeña parte del historial de Ethereum de tal manera que todo el historial existe distribuido a través de la red. Las solicitudes se atienden buscando pares que almacenen los datos relevantes y solicitándoselos. Alternativamente, dado que generalmente son las aplicaciones las que requieren acceso a datos históricos, puede convertirse en su responsabilidad almacenarlos. También puede haber suficientes actores altruistas en el espacio de Ethereum que estarían dispuestos a mantener archivos históricos. Podría ser una DAO que se cree para gestionar el almacenamiento de datos históricos o, idealmente, será una combinación de todas estas opciones. Estos proveedores podrían servir los datos de muchas maneras, como en un torrent, FTP, Filecoin o IPFS.

La expiración del historial es algo controvertida porque hasta ahora Ethereum siempre ha garantizado implícitamente la disponibilidad de cualquier dato histórico. Una sincronización completa desde el bloque génesis siempre ha sido posible como estándar, incluso si depende de la reconstrucción de algunos datos antiguos a partir de instantáneas. La expiración del historial traslada la responsabilidad de proporcionar esta garantía fuera del protocolo central de Ethereum. Esto podría introducir nuevos riesgos de censura si son organizaciones centralizadas las que terminan interviniendo para proporcionar datos históricos.

EIP-4444 aún no está listo para su lanzamiento, pero está bajo discusión activa. Curiosamente, los desafíos con EIP-4444 no son tanto técnicos, sino principalmente de gestión de la comunidad. Para que esto se lance, debe haber aceptación de la comunidad que incluya no solo un acuerdo, sino también compromisos para almacenar y servir datos históricos de entidades confiables.

Esta actualización no cambia fundamentalmente cómo los nodos de Ethereum manejan los datos del estado, solo cambia cómo se accede a los datos históricos.

### Caducidad del estado {#state-expiry}

La caducidad del estado se refiere a eliminar el estado de los nodos individuales si no se ha accedido a él recientemente. Hay varias formas en que esto podría implementarse, incluyendo:

- **Caducidad por alquiler**: cobrar un "alquiler" a las cuentas y hacerlas caducar cuando su alquiler llegue a cero
- **Caducidad por tiempo**: hacer que las cuentas queden inactivas si no hay lectura/escritura en esa cuenta durante un período de tiempo

La caducidad por alquiler podría ser un alquiler directo cobrado a las cuentas para mantenerlas en la base de datos de estado activo. La caducidad por tiempo podría ser mediante una cuenta regresiva desde la última interacción de la cuenta, o podría ser una caducidad periódica de todas las cuentas. También podría haber mecanismos que combinen elementos de los modelos basados tanto en el tiempo como en el alquiler, por ejemplo, las cuentas individuales persisten en el estado activo si pagan una pequeña tarifa antes de la caducidad basada en el tiempo. Con la caducidad del estado, es importante tener en cuenta que el estado inactivo **no se elimina**, solo se almacena por separado del estado activo. El estado inactivo puede ser resucitado al estado activo.

La forma en que esto funcionaría probablemente sea tener un árbol de estado para períodos de tiempo específicos (quizás ~1 año). Cada vez que comienza un nuevo período, también lo hace un árbol de estado completamente nuevo. Solo se puede modificar el árbol de estado actual, todos los demás son inmutables. Solo se espera que los nodos de Ethereum mantengan el árbol de estado actual y el siguiente más reciente. Esto requiere una forma de marcar el tiempo de una dirección con el período en el que existe. Hay [varias formas posibles](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607) de hacer esto, pero la opción principal requiere que [las direcciones se alarguen](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485) para acomodar la información adicional con el beneficio añadido de que las direcciones más largas son mucho más seguras. El elemento de la hoja de ruta que hace esto se llama [extensión del espacio de direcciones](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485).

De manera similar a la expiración del historial, bajo la caducidad del estado, la responsabilidad de almacenar datos de estado antiguos se elimina de los usuarios individuales y se transfiere a otras entidades, como proveedores centralizados, miembros altruistas de la comunidad o soluciones descentralizadas más futuristas como la Portal Network.

La caducidad del estado todavía está en fase de investigación y aún no está lista para su lanzamiento. La caducidad del estado bien podría ocurrir más tarde que los clientes sin estado y la expiración del historial porque esas actualizaciones hacen que los grandes tamaños de estado sean fácilmente manejables para la mayoría de los validadores.

## Ausencia de estado {#statelessness-2}

La ausencia de estado es un nombre un poco inapropiado porque no significa que se elimine el concepto de "estado", pero sí implica cambios en cómo los nodos de Ethereum manejan los datos del estado. La ausencia de estado en sí viene en dos variantes: ausencia de estado débil y ausencia de estado fuerte. La ausencia de estado débil permite que la mayoría de los nodos no tengan estado al poner la responsabilidad del almacenamiento del estado en unos pocos. La ausencia de estado fuerte elimina por completo la necesidad de que cualquier nodo almacene los datos completos del estado. Tanto la ausencia de estado débil como la fuerte ofrecen los siguientes beneficios a los validadores normales:

- sincronización casi instantánea
- capacidad de validar bloques fuera de orden
- nodos capaces de ejecutarse con requisitos de hardware muy bajos (por ejemplo, en teléfonos)
- los nodos pueden ejecutarse en discos duros baratos porque no se requiere lectura/escritura en disco
- compatible con futuras actualizaciones de la criptografía de Ethereum

### Ausencia de estado débil {#weak-statelessness}

La ausencia de estado débil implica cambios en la forma en que los nodos de Ethereum verifican los cambios de estado, pero no elimina por completo la necesidad de almacenamiento de estado en todos los nodos de la red. En cambio, la ausencia de estado débil pone la responsabilidad del almacenamiento del estado en los proponentes de bloques, mientras que todos los demás nodos de la red verifican los bloques sin almacenar los datos completos del estado.

**En la ausencia de estado débil, proponer bloques requiere acceso a los datos completos del estado, pero verificar bloques no requiere datos del estado**

Para que esto suceda, los [árboles Verkle](/roadmap/verkle-trees/) ya deben haberse implementado en los clientes de Ethereum. Los árboles Verkle son una estructura de datos de reemplazo para almacenar datos del estado de Ethereum que permiten que pequeños "testigos" de tamaño fijo de los datos se pasen entre pares y se utilicen para verificar bloques en lugar de verificar bloques contra bases de datos locales. También se requiere la [separación proponente-constructor (PBS)](/roadmap/pbs/) porque esto permite que los constructores de bloques sean nodos especializados con hardware más potente, y esos son los que requieren acceso a los datos completos del estado.

<ExpandableCard title="¿Por qué está bien depender de menos proponentes de bloques?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

La ausencia de estado depende de que los constructores de bloques mantengan una copia de los datos completos del estado para que puedan generar testigos que se puedan usar para verificar el bloque. Otros nodos no necesitan acceso a los datos del estado, toda la información requerida para verificar el bloque está disponible en el testigo. Esto crea una situación en la que proponer un bloque es costoso, pero verificar el bloque es barato, lo que implica que menos operadores ejecutarán un nodo proponente de bloques. Sin embargo, la descentralización de los proponentes de bloques no es crítica siempre y cuando la mayor cantidad posible de participantes pueda verificar de forma independiente que los bloques que proponen son válidos.

<ButtonLink variant="outline-color" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Leer más en las notas de Dankrad</ButtonLink>
</ExpandableCard>

Los proponentes de bloques utilizan los datos del estado para crear "testigos": el conjunto mínimo de datos que prueban los valores del estado que están siendo cambiados por las transacciones en un bloque. Otros validadores no mantienen el estado, solo almacenan la raíz del estado (un hash de todo el estado). Reciben un bloque y un testigo y los utilizan para actualizar su raíz del estado. Esto hace que un nodo validador sea extremadamente ligero.

La ausencia de estado débil se encuentra en un estado avanzado de investigación, pero depende de que se hayan implementado la separación proponente-constructor y los árboles Verkle para que se puedan pasar pequeños testigos entre pares. Esto significa que la ausencia de estado débil probablemente esté a unos años de distancia de la red principal de Ethereum.

La [zkEVM para la verificación de la capa 1 (L1)](/roadmap/zkevm/) es una tecnología complementaria que podría mejorar aún más la verificación sin estado. En lugar de solo comprobar testigos, los validadores podrían verificar una prueba de conocimiento cero de que todo el bloque se ejecutó correctamente, proporcionando certeza criptográfica sin volver a ejecutar las transacciones.

### Ausencia de estado fuerte {#strong-statelessness}

La ausencia de estado fuerte elimina la necesidad de que cualquier nodo almacene datos del estado. En cambio, las transacciones se envían con testigos que pueden ser agregados por los productores de bloques. Los productores de bloques son entonces responsables de almacenar solo el estado que se necesita para generar testigos para las cuentas relevantes. La responsabilidad del estado se traslada casi por completo a los usuarios, ya que envían testigos y 'listas de acceso' para declarar con qué cuentas y claves de almacenamiento están interactuando. Esto permitiría nodos extremadamente ligeros, pero hay compensaciones que incluyen hacer más difícil realizar transacciones con contratos inteligentes.

La ausencia de estado fuerte ha sido investigada por investigadores, pero actualmente no se espera que forme parte de la hoja de ruta de Ethereum; es más probable que la ausencia de estado débil sea suficiente para las necesidades de escalado de Ethereum.

## Progreso actual {#current-progress}

La ausencia de estado débil, la expiración del historial y la caducidad del estado se encuentran en fase de investigación y se espera que se lancen dentro de varios años. No hay garantía de que todas estas propuestas se implementen; por ejemplo, si la caducidad del estado se implementa primero, puede que no haya necesidad de implementar también la expiración del historial. También hay otros elementos de la hoja de ruta, como los [árboles Verkle](/roadmap/verkle-trees) y la [separación proponente-constructor](/roadmap/pbs) que deben completarse primero.

## Lecturas adicionales {#further-reading}

- [¿Qué es el Ethereum sin estado?](https://stateless.fyi/)
- [AMA de Vitalik sobre la ausencia de estado](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Una teoría de la gestión del tamaño del estado](https://hackmd.io/@vbuterin/state_size_management)
- [Limitación del estado con minimización de conflictos de resurrección](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [Caminos hacia la ausencia de estado y la caducidad del estado](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Especificación de EIP-4444](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes sobre EIP-4444](https://youtu.be/SfDC_qUZaos)
- [Por qué es tan importante pasar a la ausencia de estado](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [Notas originales del concepto de cliente sin estado](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Más sobre la caducidad del estado](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Aún más sobre la caducidad del estado](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
- [Página de información sobre el Ethereum sin estado](https://stateless.fyi)
