---
title: Árboles Verkle
description: Una descripción de alto nivel de los árboles Verkle y cómo se utilizarán para actualizar Ethereum
lang: es
summaryPoints:
  - Descubra qué son los árboles Verkle
  - Lea por qué los árboles Verkle son una actualización útil para Ethereum
---

Los árboles Verkle (un acrónimo de "compromiso de vector" y "árboles de Merkle") son una estructura de datos que se puede utilizar para actualizar los nodos de [Ethereum](/) para que puedan dejar de almacenar grandes cantidades de datos de estado sin perder la capacidad de validar bloques.

## Ausencia de estado {#statelessness}

Los árboles Verkle son un paso crítico en el camino hacia los clientes de Ethereum sin estado. Los clientes sin estado son aquellos que no tienen que almacenar toda la base de datos de estado para validar los bloques entrantes. En lugar de utilizar su propia copia local del estado de Ethereum para verificar los bloques, los clientes sin estado utilizan un "testigo" de los datos de estado que llega con el bloque. Un testigo es una colección de piezas individuales de los datos de estado que se requieren para ejecutar un conjunto particular de transacciones, y una prueba criptográfica de que el testigo es realmente parte de los datos completos. El testigo se utiliza _en lugar_ de la base de datos de estado. Para que esto funcione, los testigos deben ser muy pequeños, de modo que puedan transmitirse de forma segura a través de la red a tiempo para que los validadores los procesen dentro de un slot de 12 segundos. La estructura actual de datos de estado no es adecuada porque los testigos son demasiado grandes. Los árboles Verkle resuelven este problema al permitir testigos pequeños, eliminando una de las principales barreras para los clientes sin estado.

<ExpandableCard title="¿Por qué queremos clientes sin estado?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Los clientes de Ethereum utilizan actualmente una estructura de datos conocida como trie de Patricia Merkle para almacenar sus datos de estado. La información sobre las cuentas individuales se almacena como hojas en el trie y los pares de hojas se someten a hash repetidamente hasta que solo queda un único hash. Este hash final se conoce como la "raíz". Para verificar los bloques, los clientes de Ethereum ejecutan todas las transacciones en un bloque y actualizan su trie de estado local. El bloque se considera válido si la raíz del árbol local es idéntica a la proporcionada por el proponente de bloque, porque cualquier diferencia en el cálculo realizado por el proponente de bloque y el nodo validador haría que el hash raíz fuera completamente diferente. El problema con esto es que verificar la cadena de bloques requiere que cada cliente almacene todo el trie de estado para el bloque principal y varios bloques históricos (el valor predeterminado en Geth es mantener los datos de estado de 128 bloques detrás del principal). Esto requiere que los clientes tengan acceso a una gran cantidad de espacio en disco, lo que es una barrera para ejecutar nodos completos en hardware barato y de bajo consumo. Una solución a esto es actualizar el trie de estado a una estructura más eficiente (árbol Verkle) que se puede resumir utilizando un pequeño "testigo" de los datos que se puede compartir en lugar de los datos de estado completos. Reformatear los datos de estado en un árbol Verkle es un paso previo para pasar a clientes sin estado.

</ExpandableCard>

## ¿Qué es un testigo y por qué los necesitamos? {#what-is-a-witness}

Verificar un bloque significa volver a ejecutar las transacciones contenidas en el bloque, aplicar los cambios al trie de estado de Ethereum y calcular el nuevo hash raíz. Un bloque verificado es aquel cuyo hash raíz de estado calculado es el mismo que el proporcionado con el bloque (porque esto significa que el proponente de bloque realmente hizo el cálculo que dice haber hecho). En los clientes de Ethereum actuales, la actualización del estado requiere acceso a todo el trie de estado, que es una gran estructura de datos que debe almacenarse localmente. Un testigo solo contiene los fragmentos de los datos de estado que se requieren para ejecutar las transacciones en el bloque. Un validador entonces solo puede usar esos fragmentos para verificar que el proponente de bloque ha ejecutado las transacciones del bloque y actualizado el estado correctamente. Sin embargo, esto significa que el testigo debe transferirse entre pares en la red de Ethereum lo suficientemente rápido como para ser recibido y procesado por cada nodo de manera segura dentro de un slot de 12 segundos. Si el testigo es demasiado grande, a algunos nodos les podría tomar demasiado tiempo descargarlo y mantenerse al día con la cadena. Esta es una fuerza centralizadora porque significa que solo los nodos con conexiones rápidas a Internet pueden participar en la validación de bloques. Con los árboles Verkle no hay necesidad de tener el estado almacenado en su disco duro; _todo_ lo que necesita para verificar un bloque está contenido dentro del propio bloque. Desafortunadamente, los testigos que se pueden producir a partir de los tries de Merkle son demasiado grandes para admitir clientes sin estado.

## ¿Por qué los árboles Verkle permiten testigos más pequeños? {#why-do-verkle-trees-enable-smaller-witnesses}

La estructura de un trie de Merkle hace que los tamaños de los testigos sean muy grandes: demasiado grandes para transmitirlos de forma segura entre pares dentro de un slot de 12 segundos. Esto se debe a que el testigo es una ruta que conecta los datos, que se encuentran en las hojas, con el hash raíz. Para verificar los datos es necesario tener no solo todos los hashes intermedios que conectan cada hoja con la raíz, sino también todos los nodos "hermanos". Cada nodo en la prueba tiene un hermano con el que se somete a hash para crear el siguiente hash en el trie. Esto es una gran cantidad de datos. Los árboles Verkle reducen el tamaño del testigo al acortar la distancia entre las hojas del árbol y su raíz y también al eliminar la necesidad de proporcionar nodos hermanos para verificar el hash raíz. Se obtendrá aún más eficiencia de espacio mediante el uso de un potente esquema de compromiso polinómico en lugar del compromiso de vector de estilo hash. El compromiso polinómico permite que el testigo tenga un tamaño fijo independientemente del número de hojas que pruebe.

Bajo el esquema de compromiso polinómico, los testigos tienen tamaños manejables que se pueden transferir fácilmente en la red entre pares. Esto permite a los clientes verificar los cambios de estado en cada bloque con una cantidad mínima de datos.

<ExpandableCard title="¿Exactamente cuánto pueden reducir los árboles Verkle el tamaño del testigo?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

El tamaño del testigo varía según la cantidad de hojas que incluya. Suponiendo que el testigo cubra 1000 hojas, un testigo para un trie de Merkle sería de aproximadamente 3,5 MB (suponiendo 7 niveles en el trie). Un testigo para los mismos datos en un árbol Verkle (suponiendo 4 niveles en el árbol) sería de aproximadamente 150 kB: **aproximadamente 23 veces más pequeño**. Esta reducción en el tamaño del testigo permitirá que los testigos de clientes sin estado sean aceptablemente pequeños. Los testigos polinómicos son de 0,128 a 1 kB, dependiendo de qué compromiso polinómico específico se utilice.

</ExpandableCard>

## ¿Cuál es la estructura de un árbol Verkle? {#what-is-the-structure-of-a-verkle-tree}

Los árboles Verkle son pares `(key,value)` donde las claves son elementos de 32 bytes compuestos por un _tallo_ (stem) de 31 bytes y un _sufijo_ de un solo byte. Estas claves se organizan en nodos de _extensión_ y nodos _internos_. Los nodos de extensión representan un solo tallo para 256 hijos con diferentes sufijos. Los nodos internos también tienen 256 hijos, pero pueden ser otros nodos de extensión. La principal diferencia entre la estructura del árbol Verkle y el árbol de Merkle es que el árbol Verkle es mucho más plano, lo que significa que hay menos nodos intermedios que vinculan una hoja a la raíz y, por lo tanto, se requieren menos datos para generar una prueba.

![Diagram of a Verkle tree data structure](./verkle.png)

[Lea más sobre la estructura de los árboles Verkle](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Progreso actual {#current-progress}

Las redes de prueba de árboles Verkle ya están en funcionamiento, pero todavía hay actualizaciones pendientes sustanciales para los clientes que se requieren para admitir los árboles Verkle. Puede ayudar a acelerar el progreso implementando contratos en las redes de prueba o ejecutando clientes de redes de prueba.

[Vea a Guillaume Ballet explicar la red de prueba Condrieu Verkle](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (tenga en cuenta que la red de prueba Condrieu era de prueba de trabajo y ahora ha sido reemplazada por la red de prueba Verkle Gen Devnet 6).

## Lecturas adicionales {#further-reading}

- [Árboles Verkle para la ausencia de estado](https://verkle.info/)
- [Dankrad Feist explica los árboles Verkle en PEEPanEIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Árboles Verkle para el resto de nosotros](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Anatomía de una prueba Verkle](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
- [Guillaume Ballet explica los árboles Verkle en ETHGlobal](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- ["Cómo los árboles Verkle hacen que Ethereum sea ágil y eficiente" por Guillaume Ballet en Devcon 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam sobre clientes sin estado en ETHDenver 2020](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Fiest explica los árboles Verkle y la ausencia de estado en el podcast Zero Knowledge](https://zeroknowledge.fm/podcast/202/)
- [Vitalik Buterin sobre los árboles Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist sobre los árboles Verkle](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Documentación de EIP sobre árboles Verkle](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)