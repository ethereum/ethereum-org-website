---
title: Árboles Verkle
description: Una descripción de alto nivel de los árboles Verkle y cómo se utilizarán para actualizar Ethereum
lang: es
summaryPoints:
  - Descubra qué son los árboles de Verkle
  - Descubra por qué los árboles de Verkle son una actualización útil para Ethereum
---

# Árboles Verkle {#verkle-trees}

Los árboles de Verkle (una palabra combinada de «Vector commitment» o compromiso vectorial y «Merkle Trees») son una estructura de datos que se puede utilizar para actualizar los nodos de Ethereum y así dejen de almacenar grandes cantidades de datos de estado sin perder la capacidad de validar bloques.

## Sin estado {#statelessness}

Los árboles de Verkle son un paso crítico en el rumbo hacia los clientes de Ethereum sin estado. Los clientes sin estado son aquellos que no tienen que almacenar toda la base de datos estatal para validar los bloques entrantes. En lugar de usar su propia copia local del estado de Ethereum para verificar los bloques, los clientes sin estado usan un «testigo» de los datos del estado que llegan con el bloque. Un testigo es una colección de piezas individuales de los datos estatales que se requieren para ejecutar un conjunto particular de transacciones, y una prueba criptográfica de que el testigo es realmente parte de los datos completos. El testigo se utiliza _en lugar de_ de la base de datos de estado. Para que esto funcione, los testigos deben ser muy pequeños, para que puedan transmitirse de forma segura a través de la red a tiempo para que los validadores los procesen en un plazo de 12 segundos. La estructura de datos del estado actual no es adecuada, porque los testigos son demasiado grandes. Los árboles de Verkle resuelven el problema al habilitar pequeños testigos, eliminando una de las principales barreras de clientes sin estado.

<ExpandableCard title="¿Por qué queremos clientes sin estado?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Actualmente, los clientes de Ethereum utilizan una estructura de datos conocida como «Patricia Merkle Trie» para almacenar sus datos de estado. La información sobre las cuentas individuales se almacena como hojas en el trie y los pares de hojas se agrupan repetidamente hasta que solo queda un hash. A este hash final se le conoce como la «raíz». Para verificar los bloques, los clientes de Ethereum ejecutan todas las transacciones en un bloque y actualizan su estado local. El bloque se considera válido si la raíz del árbol local es idéntica a la proporcionada por el proponente del bloque, porque cualquier diferencia en el cálculo realizado por el proponente del bloque y el nodo de validación haría que el hash raíz fuera completamente diferente. El problema con esto es que la verificación de la cadena de bloques requiere que cada cliente almacene todo el estado trie para el bloque de cabeza y varios bloques históricos (el valor predeterminado en Geth es mantener los datos de estado para 128 bloques detrás de la cabeza). Esto requiere que los clientes tengan acceso a una gran cantidad de espacio en disco, lo que es una barrera para ejecutar nodos completos en hardware barato y de bajo consumo. Una solución a esto es actualizar el trie de estado a una estructura más eficiente (árbol de Verkle) que se pueda resumir utilizando un pequeño «testigo» de los datos que se pueden compartir en lugar de los datos de estado completos. El cambio de formato de los datos del estado a un árbol de Verkle es un trampolín para pasar a los clientes sin estado.

</ExpandableCard>

## ¿Qué es un testigo y por qué lo necesitamos? {#what-is-a-witness}

Verificar un bloque significa volver a ejecutar las transacciones contenidas en el bloque, aplicar los cambios a la prueba de estado trie de Ethereum y calcular el nuevo hash raíz. Un bloque verificado es aquel cuyo hash raíz de estado calculado es el mismo que el proporcionado con el bloque (porque esto significa que el proponente de bloques realmente hizo el cálculo que dice que hizo). En los clientes de Ethereum de hoy en día, la actualización del estado requiere acceso a todo el estado trie, que es una gran estructura de datos que debe almacenarse localmente. Un testigo solo contiene los fragmentos de los datos de estado que se requieren para ejecutar las transacciones en el bloque. Un validador solo puede usar esos fragmentos para verificar que el proponente de bloques haya ejecutado las transacciones de bloque y actualizado el estado correctamente. Sin embargo, esto significa que el testigo debe transferirse entre pares en la red Ethereum lo suficientemente rápido como para que cada nodo lo reciba y procese de forma segura dentro de una ranura de 12 segundos. Si el testigo es demasiado grande, algunos nodos podrían tardar demasiado en descargarlo y mantenerlo sincronizado con la cadena. Esta es una fuerza de centralización porque significa que solo los nodos con conexiones rápidas a Internet pueden participar en la validación de bloques. Con los árboles de Verkle no es necesario almacenar el estado en su disco duro; _solo_ necesita comprobar que un bloque esté contenido dentro del propio bloque. Por desgracia, los testigos que se pueden producir a partir de los tries de Merkle son demasiado grandes para apoyar a los clientes sin estado.

## ¿Por qué los árboles de Verkle permiten testigos más pequeños? {#why-do-verkle-trees-enable-smaller-witnesses}

La estructura de un Merkle Trie hace que los tamaños de los testigos sean muy grandes, demasiado grandes para transmitir de forma segura entre pares dentro de un espacio de 12 segundos. Esto se debe a que el testigo es una ruta que conecta los datos, que se mantienen en las hojas, con el hash raíz. Para verificar los datos, es necesario tener no solo todos los hashes intermedios que conectan cada hoja con la raíz, sino también todos los nodos «de los hermanos». Cada nodo de la prueba tiene un hermano con el que se hace un hash para crear el siguiente hash hasta el trie. Y eso supone una gran cantidad de datos. Los árboles Verkle reducen el tamaño del testigo al acortar la distancia entre las hojas del árbol y su raíz, además de eliminar la necesidad de proporcionar nodos hermanos para verificar el hash raíz. Se obtendrá aún más eficiencia de espacio mediante el uso de un potente esquema de compromiso polinómico en lugar del compromiso vectorial de estilo hash. El compromiso polinómico permite que el testigo tenga un tamaño fijo, independientemente del número de hojas que demuestre.

Bajo el esquema de compromiso polinómico, los testigos tienen tamaños manejables que se pueden transferir fácilmente en la red entre pares. Esto permite a los clientes verificar los cambios de estado en cada bloque con una cantidad mínima de datos.

<ExpandableCard title="¿Cuánto pueden reducir exactamente los árboles de Verkle el tamaño de los testigos?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

El tamaño del testigo varía dependiendo del número de hojas que incluya. Suponiendo que el testigo cubre 1.000 hojas, un testigo para un trie de Merkle sería de aproximadamente 3,5 Mb (suponiendo 7 niveles para el trie). Un testigo de los mismos datos en un árbol de Verkle (suponiendo 4 niveles para el árbol) sería de unos 150 kB - **aproximadamente 23 veces más pequeño**. Esta reducción en el tamaño de los testigos permitirá que los testigos clientes sin estado sean aceptablemente pequeños. Los testigos polinómicos van de 0,128 a 1 kB dependiendo del compromiso polinómico específico que se utilice.

</ExpandableCard>

## ¿Cuál es la estructura de un árbol de Verkle? {#what-is-the-structure-of-a-verkle-tree}

Los árboles de Verkle son `(llave, valor)` pares donde las llaves son elementos de 32 bytes compuestos por un _tallo de 31 bytes_ y un solo byte _sufijo_. Estas claves están organizadas en nodos de _extensión_ y nodos _internos_. Los nodos de extensión representan una sola raíz para 256 hijos con diferentes sufijos. Los nodos internos también tienen 256 hijos, pero pueden ser otros nodos de extensión. La principal diferencia entre el árbol Verkle y la estructura del árbol Merkle es que el árbol Verkle es mucho más plano, lo que significa que hay menos nodos intermedios que conectan una hoja con la raíz y, por lo tanto, menos datos necesarios para generar una prueba.

![](./verkle.png)

[Bibliografía para profundizar sobre la estructura de los árboles Verkle.](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Progreso actual {#current-progress}

Las redes de prueba del árbol de Verkle ya están en funcionamiento, pero todavía se requieren sustanciales actualizaciones pendientes para los clientes en apoyo de los árboles de Verkle. Puede ayudar a acelerar el progreso implementando contratos en las redes de prueba o ejecutando clientes de la red de prueba.

[Explore la red de prueba Verkle Gen Devnet 2](https://verkle-gen-devnet-2.ethpandaops.io/)

[Vea a Guillaume Ballet explicar la red de prueba Condrieu Verkle](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (tenga en cuenta que la red de prueba Condrieu era de prueba de trabajo y ahora se ha sustituido por la red de prueba Verkle Gen Devnet 2).

## Más información {#further-reading}

- [Árboles Verkle para la falta de estado](https://verkle.info/)
- [Dankrad Feist explica los árboles Verkle en PEEPanEIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Guillaume Ballet explica los árboles de Verkle en ETHGlobal](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- [«Cómo los árboles de Verkle hacen que Ethereum sean claro y directo» por Guillaume Ballet en Devcon 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam sobre clientes sin estado en ETHDenver 2020](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Fiest explica los árboles de Verkle y la falta de estado en el podcast Zero Knowledge](https://zeroknowledge.fm/episode-202-stateless-ethereum-verkle-tries-with-dankrad-feist/)
- [Vitalik Buterin comenta los árboles de Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist habla de los árboles de Verkle](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Documentación EIP de los árboles de Verkle](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)
