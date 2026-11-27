---
title: "Árboles Verkle"
description: "Una descripción de alto nivel de los árboles Verkle y por qué los planes del árbol de estado de Ethereum pasaron a un árbol binario"
lang: es
template: roadmap
summaryPoints:
  - Descubra qué son los árboles Verkle
  - Lea por qué los árboles Verkle se dejaron de lado a favor de un árbol binario
---

Los árboles Verkle (un acrónimo de "compromiso de vector" y "árboles de Merkle") son una estructura de datos que se puede utilizar para actualizar los nodos de [Ethereum](/) para que puedan dejar de almacenar grandes cantidades de datos de estado sin perder la capacidad de validar bloques.

Los árboles Verkle se propusieron como el próximo árbol de estado de Ethereum en la [EIP-6800](https://eips.ethereum.org/EIPS/eip-6800), pero esa propuesta ahora está estancada y se ha dejado de lado a favor de un árbol binario unificado ([EIP-7864](https://eips.ethereum.org/EIPS/eip-7864)). El árbol binario persigue el mismo objetivo de testigos pequeños para clientes sin estado. Esta página explica cómo funcionan los árboles Verkle y por qué la investigación pasó a un árbol binario.

## Ausencia de estado {#statelessness}

Los árboles Verkle se diseñaron como un paso en el camino hacia los clientes de Ethereum sin estado. Los clientes sin estado son aquellos que no tienen que almacenar toda la base de datos de estado para validar los bloques entrantes. En lugar de usar su propia copia local del estado de Ethereum para verificar bloques, los clientes sin estado usan un "testigo" de los datos de estado que llega con el bloque. Un testigo es una colección de piezas individuales de los datos de estado que se requieren para ejecutar un conjunto particular de transacciones, y una prueba criptográfica de que el testigo es realmente parte de los datos completos. El testigo se usa _en lugar_ de la base de datos de estado. Para que esto funcione, los testigos deben ser muy pequeños, de modo que puedan transmitirse de manera segura a través de la red a tiempo para que los validadores los procesen dentro de un slot de 12 segundos. La estructura de datos de estado actual no es adecuada porque los testigos son demasiado grandes. Los árboles Verkle resuelven este problema al permitir testigos pequeños, eliminando una de las principales barreras para los clientes sin estado.

<ExpandableCard title="¿Por qué queremos clientes sin estado?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Los clientes de Ethereum actualmente usan una estructura de datos conocida como trie de Patricia Merkle para almacenar sus datos de estado. La información sobre las cuentas individuales se almacena en las hojas del trie, y cada nodo de rama, que puede tener hasta 16 hijos, se somete a hash junto con los hashes de sus hijos, nivel por nivel, hasta que solo queda un único hash. Este hash final se conoce como la "raíz". Para verificar bloques, los clientes de Ethereum ejecutan todas las transacciones en un bloque y actualizan su trie de estado local. El bloque se considera válido si la raíz del árbol local es idéntica a la proporcionada por el proponente de bloque, porque cualquier diferencia en el cálculo realizado por el proponente de bloque y el nodo validador haría que el hash raíz fuera completamente diferente. El problema con esto es que verificar la cadena de bloques requiere que cada cliente almacene todo el trie de estado para el bloque principal y varios bloques históricos (el valor predeterminado en Geth es mantener los datos de estado de 128 bloques detrás del principal). Esto requiere que los clientes tengan acceso a una gran cantidad de espacio en disco, lo que es una barrera para ejecutar nodos completos en hardware económico y de bajo consumo. Una solución a esto es actualizar el trie de estado a una estructura más eficiente (como un árbol Verkle o un árbol binario) que se pueda resumir usando un pequeño "testigo" de los datos que se pueda compartir en lugar de los datos de estado completos. Reformatear los datos de estado en una nueva estructura de árbol es un trampolín para pasar a clientes sin estado.

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

Los árboles Verkle son pares `(key,value)` donde las claves son elementos de 32 bytes compuestos por un _tallo_ de 31 bytes y un _sufijo_ de un solo byte. Estas claves se organizan en nodos de _extensión_ y nodos _internos_. Los nodos de extensión representan un solo tallo para 256 hijos con diferentes sufijos. Los nodos internos también tienen 256 hijos, pero pueden ser otros nodos de extensión. La principal diferencia entre la estructura del árbol Verkle y la del árbol de Merkle es que el árbol Verkle es mucho más plano, lo que significa que hay menos nodos intermedios que unen una hoja con la raíz y, por lo tanto, se requieren menos datos para generar una prueba.

<VerkleTreeDiagram />

[Lea más sobre la estructura de los árboles Verkle](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Progreso actual {#current-progress}

La [EIP-6800](https://eips.ethereum.org/EIPS/eip-6800), la propuesta para mover el estado de Ethereum a un árbol Verkle unificado, ahora está estancada. La investigación ha pasado a la [EIP-7864](https://eips.ethereum.org/EIPS/eip-7864), que propone un árbol binario unificado en su lugar. La EIP-7864 es un borrador y no se ha programado ninguna actualización de la red para ella.

La EIP-7864 da dos razones principales para el cambio. Los árboles Verkle dependen de la criptografía de curva elíptica que no es segura contra computadoras cuánticas, por lo que eventualmente tendrían que ser reemplazados, mientras que un árbol binario depende solo de funciones hash. El progreso en los sistemas de prueba también reduce la necesidad de pruebas pequeñas y rápidas de generar que eran la principal ventaja de los árboles Verkle. Debido a que cada nodo en un árbol binario tiene solo dos hijos, sus pruebas también son mucho más pequeñas que las pruebas del trie hexario actual.

## Lecturas adicionales {#further-reading}

- [Árboles Verkle para la ausencia de estado](https://verkle.info/)
- [Dankrad Feist explica los árboles Verkle en PEEPanEIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Árboles Verkle para el resto de nosotros](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Anatomía de una prueba Verkle](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
- [Guillaume Ballet explica los árboles Verkle en ETHGlobal](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- ["Cómo los árboles Verkle hacen que Ethereum sea ágil y eficiente" por Guillaume Ballet en Devcon 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam sobre clientes sin estado en ETHDenver 2020](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Feist explica los árboles Verkle y la ausencia de estado en el podcast Zero Knowledge](https://zeroknowledge.fm/podcast/202/)
- [Vitalik Buterin sobre los árboles Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist sobre los árboles Verkle](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Documentación de la EIP del árbol Verkle](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)
- [EIP-6800: Estado de Ethereum usando un árbol Verkle unificado](https://eips.ethereum.org/EIPS/eip-6800)
- [EIP-7864: Estado de Ethereum usando un árbol binario unificado](https://eips.ethereum.org/EIPS/eip-7864)
