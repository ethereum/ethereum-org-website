---
title: Vencimiento del estado, sin estado e historial
description: Explicación del historial de vencimiento y sin estado de Ethereum
lang: es
---

# Vencimiento del estado, sin estado e historial {#statelessness}

La capacidad de ejecutar nodos de Ethereum en un hardware modesto es fundamental para una verdadera descentralización. Esto se debe a que ejecutar un nodo da a los usuarios la capacidad de verificar la información mediante la realización de comprobaciones criptográficas de forma independiente en lugar de confiar en un tercero para que les facilite los datos. Ejecutar un nodo permite a los usuarios enviar transacciones directamente a la red entre pares de Ethereum en lugar de tener que confiar en un intermediario. La descentralización no es posible si estos beneficios solo están al alcance de aquellos usuarios que pueden disponer de costoso hardware. En su lugar, los nodos deberían poder ejecutarse con requisitos de procesamiento y memoria extremadamente modestos, para que puedan ejecutarse en teléfonos móviles, microordenadores o de fondo en un ordenador doméstico.

Hoy en día, los requisitos de espacio en el disco son la principal barrera que impide el acceso universal a los nodos. Esto se debe principalmente a la necesidad de almacenar grandes masas de datos sobre el estado de Ethereum. Los datos sobre el estado contienen información vital y necesaria para procesar correctamente nuevos bloques y transacciones. Al cierre de la edición de este documento, se recomienda un SSD rápido de 2 TB para ejecutar un nodo Ethereum completo. Para un nodo que no «poda» ningún dato más antiguo, el requisito de almacenamiento crece alrededor de 14 GB/semana, y los nodos de archivo que almacenan todos los datos desde el inicio se acercan a los 12 TB (al cierre de la edición de este artículo, en febrero de 2023).

Los discos duros más baratos se pueden usar para almacenar datos más antiguos, pero son demasiado lentos para mantenerse al día con los bloques entrantes. Mantener los modelos de almacenamiento actuales para los clientes, mientras se hace que los datos sean más baratos y fáciles de almacenar es solo una solución temporal y parcial al problema, porque el crecimiento del estado de Ethereum es «sin límites», lo que significa que los requisitos de almacenamiento solo pueden aumentar, y las mejoras tecnológicas siempre tendrán que seguir el ritmo del crecimiento continuo del estado. En su lugar, los clientes deben encontrar nuevas formas de verificar bloques y transacciones que no dependan de la búsqueda de datos en bases de datos locales.

## Reducción del almacenamiento para los nodos {#reducing-storage-for-nodes}

Hay varias formas de reducir la cantidad de datos que cada nodo tiene que almacenar, cada una de las cuales requiere que el protocolo principal de Ethereum se actualice en un grado diferente:

- **El vencimiento del historial**: permite que los nodos descarten los datos de estado más antiguos que los bloques X, pero no cambia la forma en que el cliente de Ethereum gestiona los datos de estado.
- **El vencimiento del estado**: permite que los datos de estado que no se utilizan con frecuencia se vuelvan inactivos. Los clientes pueden ignorar los datos inactivos hasta que se resuciten.
- **Sin estado débil**: solo los productores de bloques necesitan acceso a datos de estado completo, otros nodos pueden verificar bloques sin una base de datos de estado local.
- **Sin estado fuerte**: ningún nodo necesita acceso a los datos completos del estado.

## Vencimiento de datos {#data-expiry}

### Vencimiento del historial {#history-expiry}

El vencimiento del historial se refiere a los clientes que «podan» los datos más antiguos que es poco probable que necesiten, de modo que solo almacenen una pequeña cantidad de datos históricos, descartando los datos más antiguos en beneficio de datos nuevos cuando lleguen. Hay dos razones por las que los clientes requieren datos históricos: sincronizar y atender las solicitudes de datos. Originalmente, los clientes tenían que sincronizar desde el bloque inicial, verificando que cada bloque sucesivo fuera correcto hasta la cabeza de la cadena. Hoy en día, los clientes utilizan «puntos de control de subjetividad débiles» para abrirse camino hacia la cabeza de la cadena. Estos puntos de control son puntos de partida de confianza, como tener un bloque de génesis cerca del presente en lugar del comienzo mismo de Ethereum. Esto significa que los clientes pueden eliminar toda la información antes del punto de control de subjetividad débil más reciente sin perder la capacidad de sincronizarse con la cabeza de la cadena. Actualmente, los clientes atienden solicitudes (que llegan a través de JSON-RPC) de datos históricos al obtenerlos de sus bases de datos locales. Sin embargo, con el vencimiento del historial, ya no se podrá lograr si se han podado los datos solicitados. Para atender a estos datos históricos se necesitan algunas soluciones innovadoras.

Una opción es que los clientes soliciten datos históricos de sus pares utilizando una solución como Portal Network. Portal Network es una red entre pares en desarrollo para atender a datos históricos, donde cada nodo almacena una pequeña parte del historial de Ethereum, de tal manera que todo el historial existe distribuido a través de la red. Las solicitudes se atienden buscando pares que almacenen los datos relevantes y solicitándoselo. Alternativamente, dado que generalmente son aplicaciones las que requieren acceso a datos históricos, puede convertirse en su responsabilidad almacenarlos. También puede haber suficientes actores altruistas en el espacio de Ethereum que estén dispuestos a mantener archivos históricos. Podría ser un DAO que gire para gestionar el almacenamiento de datos históricos, o idealmente será una combinación de todas estas opciones. Estos proveedores podrían servir los datos de muchas maneras, como en un torrente, FTP, Filecoin o IPFS.

La caducidad de la historia es algo controvertida porque hasta ahora Ethereum siempre ha garantizado implícitamente la disponibilidad de cualquier dato histórico. Siempre ha existido la posibilidad de hacer una sincronización completa desde el inicio, incluso si se basa en la reconstrucción de algunos datos más antiguos a partir de instantáneas. El vencimiento del historial impulsa el deber de proporcionar esta garantía fuera del protocolo central de Ethereum. Esto podría introducir nuevos riesgos de censura si se trata de organizaciones centralizadas que terminan interviniendo para proporcionar datos históricos.

EIP-4444 aún no está aún listo para enviarse, pero es un tema sobre el que se está hablando. Curiosamente, los desafíos con EIP-4444 no son tanto técnicos, sino sobre todo de gestión comunitaria. Para que se envíe, debe haber una aceptación por parte de la comunidad que incluya no solo el acuerdo, sino también los compromisos de almacenar y servir datos históricos de entidades de confianza.

Esta actualización no cambia fundamentalmente la forma en que los nodos de Ethereum manejan los datos de estado, solo cambia la forma en que se accede a los datos históricos.

### Vencimiento del estado {#state-expiry}

Por vencimiento del estado se refiere a la eliminación del estado de los nodos individuales si no se ha accedido recientemente. Hay varias formas en las que esto podría implementarse, incluyendo:

- **Vencimiento por alquiler**: cobrar un «alquiler» a las cuentas y que venzan cuando su alquiler llegue a cero.
- **Vencimiento por tiempo**: hacer que las cuentas estén inactivas si no hay lectura/escritura en esa cuenta durante algún tiempo.

El vencimiento por alquiler podría ser un alquiler directo que se cobra a las cuentas para mantenerlas en la base de datos de estado activo. La expiración por tiempo podría ser por cuenta regresiva desde la última interacción de la cuenta, o podría ser el vencimiento periódico de todas las cuentas. También podría haber mecanismos que combinen elementos de los modelos basados en el tiempo y el alquiler, por ejemplo, las cuentas individuales persisten en el estado activo si pagan una pequeña tarifa antes del vencimiento en función del tiempo. Con el vencimiento del estado, es importante tener en cuenta que el estado inactivo **no se elimina**, solo se almacena por separado del estado activo. El estado inactivo puede resucirarse en el estado activo.

Una forma factible de hacerlo sería probablemente tener un árbol de estado para períodos de tiempo específicos (tal vez ~1 año). Cada vez que comienza un nuevo período, también lo hace un árbol estatal completamente nuevo. Solo se puede modificar el árbol de estado actual, todos los demás son inmutables. Solo se espera que los nodos de Ethereum retengan el árbol de estado actual y el siguiente más reciente. Esto requiere una forma de marcar la hora de una dirección con el período en el que existe. Hay [varias formas posibles](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607) de hacerlo, pero la opción principal requiere que [las direcciones se alarguen](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485) para acomodar la información adicional con el beneficio añadido de que las direcciones más largas son mucho más seguras. El elemento de la hoja de ruta que hace esto se llama [extensión de espacio de direcciones](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485).

De manera similar al vencimiento del historial, la responsabilidad del vencimiento del estado para almacenar datos antiguos de estado se exime de los usuarios individuales y se delega a otras entidades, como proveedores centralizados, miembros de la comunidad altruistas o soluciones descentralizadas más futuristas, como Portal Network.

El vencimiento del estado todavía está en la fase de investigación y aún no está lista para enviarla. El vencimiento del estado puede ocurrir más tarde que los clientes sin estado y el vencimiento del historial, porque esas actualizaciones hacen que la mayoría de los validadores puedan gestionar fácilmente los grandes tamaños de estado.

## Sin estado {#statelessness}

El término sin estado no es del todo preciso, ya que no significa que se elimine el concepto de «estado», sino que implica cambios en la forma en que los nodos de Ethereum gestionan los datos de estado. Un estado sin estado en sí mismo tiene dos vertientes: el sin estado débil y el fuerte. La apátrida débil permite que la mayoría de los nodos se quede sin estado al poner la responsabilidad del almacenamiento estatal en unos pocos. La apátrida fuerte elimina por completo la necesidad de que cualquier nodo almacene los datos completos del estado. Tanto el sin estado debil como el fuerte ofrecen los siguientes beneficios a los validadores normales:

- sincronización casi instantánea
- capacidad de validar bloques fuera de orden
- nodos capaces de ejecutarse con requisitos de hardware muy bajos (por ejemplo, en teléfonos)
- los nodos pueden ejecutarse en discos duros baratos porque no se requiere lectura/escritura de disco
- compatible con futuras actualizaciones de la criptografía de Ethereum

### Sin estado débil {#weak-statelessness}

El sin estado débil implica cambios en la forma en que los nodos de Ethereum verifican los cambios de estado, pero no elimina por completo la necesidad de almacenamiento de estado en todos los nodos de la red. En cambio, la apátrida débil pone la responsabilidad del almacenamiento de estado en los proponentes de bloques, mientras que todos los demás nodos de la red verifican los bloques sin almacenar los datos de estado completos.

**En un sin estado débil, proponer bloques requiere acceso a datos de estado completos, sin embargo verificar los bloques no requiere datos de estado.**

Para que esto suceda, deben haberse implementado en los clientes de Ethereum los [árboles de Verkle](/roadmap/verkle-trees/). Los árboles de Verkle son una estructura de datos de sustitución para almacenar datos de estado de Ethereum que permiten que los «testigos» pequeños y de tamaño fijo de los datos se pasen entre pares y se utilicen para verificar bloques, en lugar de verificar bloques contra bases de datos locales. [La separación entre proponentes y constructores](/roadmap/pbs/) también es necesaria, porque esto permite que los constructores de bloques sean nodos especializados con hardware más potente, y esos son los que requieren acceso a los datos de estado completo.

<ExpandableCard title="¿Por qué está bien confiar en menos proponentes de bloques?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

El sin estado depende de que los constructores de bloques mantengan una copia de los datos del estado completos para que puedan generar testigos y que sirvan para verificar el bloque. Otros nodos no necesitan acceso a los datos del estado, toda la información necesaria para verificar el bloque está disponible en el testigo. Esto crea una situación en la que proponer un bloque es caro, pero verificar el bloque es barato, lo que implica que menos operadores ejecutarán un nodo de propuesta de bloque. Sin embargo, la descentralización de los proponentes de bloques no es crítica, siempre y cuando el mayor número posible de participantes puedan verificar de forma independiente que los bloques que proponen son válidos.

<ButtonLink variant="outline-color" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Más información sobre las notas de Dankrad.</ButtonLink>
</ExpandableCard>

Los proponentes de bloques utilizan los datos del estado para crear «testigos», el conjunto mínimo de datos que prueban los valores del estado que las transacciones están cambiando en un bloque. Otros validadores no mantienen el estado, solo almacenan la raíz del estado (un hash de todo el estado). Reciben un bloqueo y un testigo y los usan para actualizar su raíz de estado. Esto hace que un nodo de validación sea extremadamente ligero.

El sin estado débil se encuentra en un estado avanzado de investigación, pero depende de la separación proponente-constructor y de que se hayan implementado los árboles de Verkle para que se puedan pasar pequeños testigos entre pares. Esto significa que el sin estado débil todavía tardará probablemente unos años en integrarse en la red principal de Ethereum.

### Sin estado fuerte {#strong-statelessness}

La fuerte falta de estado elimina la necesidad de que cualquier nodo almacene datos de estado. En su lugar, las transacciones se envían con testigos que pueden añadir los productores de bloques. Los productores de bloques son entonces responsables de almacenar solo ese estado que se necesita para generar testigos para las cuentas pertinentes. La responsabilidad del estado se traslada casi en su totalidad a los usuarios, ya que envían testigos y «listas de acceso» para declarar con qué cuentas y claves de almacenamiento están interactuando. Esto permitiría nodos extremadamente ligeros, no obstante acarrea contrapartidas que pueden dificultar las transacciones con contratos inteligentes.

Los investigadores han estudiado el sin estado fuerte, aunque actualmente no se espera que forme parte de la hoja de ruta de Ethereum; es más probable que con el sin estado débil sea suficiente para las necesidades de escalabilidad de Ethereum.

## Progreso actual {#current-progress}

El sin estado débil, el vencimiento del historial y el vencimiento del estado están en la fase de investigación y se espera que se envíen dentro de varios años. No hay garantía de que todas estas propuestas se implementen, por ejemplo, si el vencimiento del estado se implementa primero, es posible que ya no sea necesario implementar también el vencimiento del historial. También hay otros elementos de la hoja de ruta, como los [árboles de Verkle](/roadmap/verkle-trees) y [la separación entre proponentes y constructores](/roadmap/pbs) que deben completarse primero.

## Más información {#further-reading}

- [Vitalik comenta el sin estado en AMA](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Una teoría de la gestión del tamaño del estado](https://hackmd.io/@vbuterin/state_size_management)
- [Limitación del estado: resurrección-conflicto-minimizado](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [En rumbo hacia el sin estado y el vencimiento del estado](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Especificación EIP-4444](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes habla sobre EIP-4444](https://youtu.be/SfDC_qUZaos)
- [¿Por qué es tan importante acabar sin estado?](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [Las notas conceptuales originales del cliente sin estado](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Más información sobre el vencimiento del estado](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Aún más información sobre el vencimiento del estado](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
