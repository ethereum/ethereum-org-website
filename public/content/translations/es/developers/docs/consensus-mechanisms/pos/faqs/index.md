---
title: Preguntas frecuentes
description: Preguntas más frecuentes sobre la prueba de participación (PoS).
lang: es
---

## ¿Qué es la prueba de participación (PoS)? {#what-is-proof-of-stake}

La prueba de participación es una clase de algoritmo que puede proporcionar seguridad a las cadenas de bloques garantizando que los usuarios que actúen de forma deshonesta pierdan activos de valor. Los sistemas de prueba de participación requieren que un conjunto de validadores pongan a disposición algún activo que pueda ser destruido si el validador incurre en algún comportamiento probadamente deshonesto. Ethereum utiliza un mecanismo de prueba de participación para proteger la cadena de bloques.

## ¿Que tiene en común la prueba de participación con la prueba de trabajo? {#comparison-to-proof-of-work}

Tanto la prueba de trabajo como la prueba de participación son mecanismos que frenan económicamente a los opeadores maliciosos que quieran enviar correos basura o hacer estafas en la red. En ambos casos, los nodos que participan activamente en el consenso ponen algún activo «en la red» que perderán si se comportan mal.

En la prueba de trabajo, este activo es la energía. El nodo, conocido como minero, ejecuta un algoritmo que tiene como objetivo calcular un valor más rápido que cualquier otro nodo. El nodo más rápido tiene derecho a proponer un bloque a la cadena. Para cambiar la historia de la cadena o dominar la propuesta de bloques, un minero tendría que tener tanta potencia computacional que siempre ganaría la carrera. Esto es prohibitivamente caro y difícil de ejecutar, protegiendo la cadena de ataques. La energía necesaria para «minar» utilizando pruebas de trabajo es un activo del mundo real por el que pagan los mineros.

La prueba de participación requiere que los nodos, conocidos como validadores, envíen explícitamente un activo criptográfico a un contrato inteligente. Si un validador exhibe un mal comportamiento, esta criptomoneda puede destruirse al estar «participando» sus activos directamente en la cadena, en lugar de indirectamente a través del gasto energético.

La prueba de trabajo consume mucha más energía, porque la actividad de minería conlleva el consumo de electricidad. La prueba de participación, por otro lado, requiere solo una cantidad muy pequeña de energía: los validadores de Ethereum incluso pueden ejecutarse en un dispositivo de baja potencia como Raspberry Pi. Se cree que el mecanismo de prueba de participación de Ethereum es más seguro que la prueba de trabajo, porque el coste del ataque es mayor y las consecuencias para un atacante son más severas.

La prueba de trabajo frente a la prueba de participación es un tema polémico. [El blog de Vitalik Buterin](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-are-the-benefits-of-proof-of-stake-as-opposed-to-proof-of-work)y el debate entre Justin Drake y Lyn Alden ofrecen un buen resumen de los argumentos.

<YouTube id="1m12zgJ42dI" />

## ¿La prueba de participación es eficiente desde el punto de vista energético? {#is-pos-energy-efficient}

Sí. Los nodos de una red de prueba de participación utilizan una pequeña cantidad de energía. Un estudio de terceros concluyó que toda la red Ethereum de prueba de participación consume alrededor de 0,0026 TWh/año (alrededor de 13.000 veces menos que los videojuegos, solo en los Estados Unidos).

[Más sobre el consumo de energía de Ethereum](/energy-consumption/).

## ¿Es segura la prueba de participación? {#is-pos-secure}

La prueba de participación de Ethereum es muy segura. El mecanismo se investigó, desarrolló y probó rigurosamente durante ocho años antes de entrar en funcionamiento. Las garantías de seguridad son diferentes de las cadenas de bloques de prueba de trabajo. En la prueba de participación, los validadores maliciosos pueden castigarse activamente («recortarse») y ser expulsados del grupo de validadores, lo que cuesta una cantidad sustancial de ETH. Bajo prueba de trabajo, un atacante puede seguir repitiendo su ataque mientras tiene suficiente poder de hash. También es más costoso montar ataques equivalentes en la de prueba de participación de Ethereum que en la prueba de trabajo. Para que repercuta en la vivacidad de la cadena, se requiere al menos el 33 % del total de ether en participación en la red (excepto en casos de ataques muy sofisticados con una probabilidad de éxito extremadamente baja). Para controlar el contenido de futuros bloques, se requiere al menos el 51 % del total de ETH apostado, y para reescribir el historial, se necesita más del 66 % de la participación total. El protocolo Ethereum destruiría estos activos en los casos de ataque del 33 % o 51 % y por consenso social en el caso de ataque del 66 %.

- [Más información sobre la defensa de la prueba de participación de Ethereum de atacantes](/developers/docs/consensus-mechanisms/pos/attack-and-defense)
- [Más información sobre el diseño de prueba de participación](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)

## ¿La prueba de participación hace que Ethereum sea más barato? {#does-pos-make-ethereum-cheaper}

No. El costo de enviar una transacción (tarifa de gas) está determinado por un mercado de tarifas dinámicas que aumenta con más demanda de la red. El mecanismo de consenso no influye directamente en esto.

[Más sobre el gas](/developers/docs/gas).

## ¿Qué son los nodos, los clientes y los validadores? {#what-are-nodes-clients-and-validators}

Los nodos son ordenadores conectados a la red Ethereum. Los clientes son el software que ejecutan y convierten al ordenador en un nodo. Hay dos tipos de clientes: clientes de ejecución y clientes de consenso. Ambos son necesarios para crear un nodo. Un validador es un complemento opcional para un cliente de consenso que permite al nodo participar en el consenso de prueba de participación. Esto significa crear y proponer bloques cuando se seleccionan y certificar los bloques de los que se oye hablar en la red. Para ejecutar un validador, el operador del nodo debe depositar 32 ETH en el contrato de depósito.

- [Más información sobre nodos y clientes](/developers/docs/nodes-and-clients)
- [Más información sobre las participaciones](/staking)

## ¿La prueba de participación es una idea nueva? {#is-pos-new}

No. Un usuario de BitcoinTalk [ propuso la idea básica de prueba de participación](https://bitcointalk.org/index.php?topic=27787.0) como una actualización a Bitcoin en 2011. Eso fue once años antes de que estuviera listo para implementarse en la red principal de Ethereum. Otras cadenas implementaron la prueba de participación antes que Ethereum, pero no el mecanismo específico de Ethereum (conocido como Gasper).

## ¿Qué tiene de especial la prueba de participación de Ethereum? {#why-is-ethereum-pos-special}

El mecanismo de prueba de participación de Ethereum es único en su diseño. No ha sido el primer mecanismo de prueba de participación en ser diseñado e implementado, pero sí es el más robusto. El mecanismo de prueba de participación se conoce como «Casper». Casper define cómo se seleccionan los validadores para proponer bloques, cómo y cuándo se hacen las certificaciones, cómo se cuentan las mismas, las recompensas y penalizaciones otorgadas a los validadores, las condiciones de recorte, los mecanismos a prueba de fallos, como la pérdida de inactividad y las condiciones para la «finalidad». La finalidad es la condición de que para que un bloque se considere una parte permanente de la cadena predilecta, debe haber sido votado por al menos el 66 % del total de ETH en participación en la red. Los investigadores desarrollaron Casper específicamente para Ethereum, y Ethereum es la primera y única cadena de bloques que lo ha implementado.

Además de Casper, la prueba de participación de Ethereum utiliza un algoritmo de elección de bifurcación llamado LMD-GHOST. Esto es necesario en caso de que surja una condición cuando existan dos bloques para la misma ranura. Esto crea dos bifurcaciones de la cadena de bloques. LMD-GHOST elige la que tiene el mayor «peso» de certificaciones. El peso es el número de certificaciones ponderadas por el balance efectivo de los validadores. LMD-GHOST es exclusivo de Ethereum.

La combinación de Casper y LMD_GHOST se conoce como Gasper.

[Más sobre Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)

## ¿Qué son los recortes? {#what-is-slashing}

Recorte es el término dado a la destrucción de parte de la participación de un validador y la expulsión de este de la red. La cantidad de ETH perdida en una escala de recortes con el número de validadores recortados significa que se castiga a los validadores confabulados más severamente que a los individuales.

[Más información sobre los recortes](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties#slashing)

## ¿Por qué los validadores necesitan 32 ETH? {#why-32-eth}

Los validadores tienen que participar con ETH para tener algo que perder si se comportan indebidamente. La razón por la que tienen que participar con 32 ETH específicamente es para permitir que los nodos se ejecuten en un hardware modesto. Si el ETH mínimo por validador fuera menor, entonces el número de validadores y, por lo tanto, el número de mensajes que deben procesarse en cada ranura aumentarían, lo que significa que se requeriría un hardware más potente para ejecutar un nodo.

## ¿Cómo se selecciona a los validadores? {#how-are-validators-selected}

Se elige de forma pseudoaleatoria a un solo validador para proponer un bloque en cada ranura utilizando un algoritmo llamado RANDAO, que mezcla un hash del proponente de bloques con una semilla que se actualiza a cada bloque. Este valor sirve para seleccionar un validador específico del conjunto de validadores totales. La selección del validador se fija con una antelación de dos épocas.

[Más información sobre la selección del validador](/developers/docs/consensus-mechanisms/pos/block-proposal)

## ¿Qué es el «grinding» de participación? {#what-is-stake-grinding}

El «griding» de participación es una categoría de ataque a las redes de prueba de participación en la que el atacante intenta sesgar el algoritmo de selección del validador a favor de sus propios validadores. Los ataques de «grinding» de participación en RANDAO requieren aproximadamente la mitad del total de ETH apostado.

[Más información sobre el «grinding» de participación](https://eth2book.info/altair/part2/building_blocks/randomness/#randao-biasability)

## ¿Qué son los recortes sociales? {#what-is-social-slashing}

El recorte social es la capacidad que la comunidad tiene para coordinar una bifurcación de la cadena de bloques en respuesta a un ataque. Permite a la comunidad recuperarse de un atacante que finaliza una cadena deshonesta. El acuchillamiento social también se puede utilizar contra los ataques de censura.

- [Más sobre los recortes sociales](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7)
- [Vitalik Buterin sobre los recortes sociales](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)

## ¿Me recortarán? {#will-i-get-slashed}

Como validador, es muy difícil que le recorten a menos que tenga una mala conducta deliberadamente. El recorte sólo se implementa en casos muy específicos en los que los validadores proponen múltiples bloques para la misma ranura, o se contradicen con sus certificaciones, es muy poco probable que surjan accidentalmente.

[Más sobre las condiciones de recorte](https://eth2book.info/altair/part2/incentives/slashing)

## ¿Cuál es el problema de no arriesgar nada? {#what-is-nothing-at-stake-problem}

El problema de nada-en-participación es un problema conceptual con algunos mecanismos de prueba de participación en los que solo hay recompensas y no hay penalizaciones. Si no hay nada que arriesgar, un validador pragmático está igualmente feliz de certificar cualquiera, o incluso múltiples, bifurcaciones de la cadena de bloques, ya que esto aumenta sus recompensas. Ethereum puede evitar esto usando condiciones de finalidad y recortando para asegurar una cadena predilecta.

[Más información sobre el problema de nada que arriesgar](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)

## ¿Qué es un algoritmo de elección de bifurcación? {#what-is-a-fork-choice-algorithm}

Un algoritmo de elección de bifurcación implementa reglas que determinan cuál es la cadena predilecta. En condiciones óptimas, no hay necesidad de una regla de elección de bifurcación, porque sólo hay un proponente de bloque por ranura y un bloque para elegir. Sin embargo, ocasionalmente, múltiples bloques para la misma ranura o la información que llega tarde conduce a múltiples opciones sobre cómo se organizan los bloques cerca de la cabeza de la cadena. En estos casos, todos los clientes deben implementar algunas reglas de manera idéntica para asegurarse de que todos elijan la secuencia correcta de bloques. El algoritmo de elección de bifurcación codifica estas reglas.

El algoritmo de elección de bifurcación de Ethereum se llama LMD-GHOST. Elige la bifurcación con el mayor peso de certificaciones, es decir, el más votado por el ETH apostado.

[Más información sobre LMD-GHOST](/developers/docs/consensus-mechanisms/pos/gasper/#fork-choice)

## ¿Cuál es la finalidad de la prueba de participación? {#what-is-finality}

La finalidad en la prueba de participación es la garantía de que un bloque dado es una parte permanente de la cadena predilecta y no se puede revertir a menos que haya un fallo de consenso en el que un atacante queme el 33 % del total de ether en participación. Esta es la finalidad «criptoeconómica», a diferencia de la «finalidad probabilística», que es relevante para las cadenas de bloques de prueba de trabajo. En la finalidad probabilística, no hay estados explícitos finalizados/no finalizados para los bloques: simplemente es cada vez menos probable que un bloque se elimine de la cadena a medida que envejece, y los usuarios determinan por sí mismos cuándo están lo suficientemente seguros de que un bloque es «seguro». Con la finalidad criptoeconómica, los pares de bloques de puntos de control tienen que ser votados por el 66 % del ether en participación. Si se cumple esta condición, los bloques entre esos puntos de control se «finalizan» explícitamente.

[Más información sobre la finalidad](/developers/docs/consensus-mechanisms/pos/#finality)

## ¿Qué es la «subjetividad débil»? {#what-is-weak-subjectivity}

La subjetividad débil es una característica de las redes de prueba de participación en las que se utiliza información social para confirmar el estado actual de la cadena de bloques. A los nuevos nodos o nodos que se reincorporan a la red después de estar fuera de línea durante mucho tiempo se les puede dar un estado reciente para que el nodo pueda ver inmediatamente si están en la cadena correcta. Estos estados se conocen como «puntos de control de subjetividad débiles» y se pueden obtener de otros operadores de nodos fuera de banda, o de exploradores de bloques, o de varios puntos finales públicos.

[Más información sobre la subjetividad débil](/developers/docs/consensus-mechanisms/pos/weak-subjectivity)

## ¿Es resistente a la censura la prueba de participación? {#is-pos-censorship-resistant}

Actualmente es difícil probar la resistencia a la censura. Sin embargo, a diferencia de la prueba de trabajo, la prueba de participación ofrece la opción de coordinar recortes para castigar a los validadores de censura. Hay próximos cambios en el protocolo que separan a los constructores de bloques de los proponentes de bloques e implementan listas de transacciones que los constructores deben incluir en cada bloque. Esta propuesta se conoce como separación del constructor adecuado y ayuda a evitar que los validadores censuren las transacciones.

[Más información sobre la separación del constructor adecuado](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Original-basic-scheme)

## ¿Puede el sistema de prueba de participación de Ethereum ser atacado con un 51%? {#pos-51-attack}

Sí. La prueba de participación es vulnerable a los ataques del 51 %, al igual que la prueba de trabajo. En lugar de que el atacante requiera el 51 % de la potencia de hash de la red, el atacante requiere el 51 % del total de ETH apostado. Un atacante que acumule el 51 % de la participación total puede controlar el algoritmo de elección de bifurcación. Esto permite que el atacante censure ciertas transacciones, haga reposiciones a corto plazo y extraigar MEV reordenando los bloques a su favor.

[Más sobre los ataques de prueba de participación](/developers/docs/consensus-mechanisms/pos/attack-and-defense)

## ¿Qué es la coordinación social y por qué es necesaria? {#what-is-social-coordination}

La coordinación social es una última línea de defensa para Ethereum que permitiría recuperar una cadena honesta de un ataque que finalizó bloqueos deshonestos. En este caso, la comunidad de Ethereum tendría que coordinar «fuera de banda» y aceptar el uso de una bifurcación minoritaria honesta, recortando los validadores del atacante en el proceso. Esto requeriría que las aplicaciones e intercambios también reconocieran la bifurcación honesta.

[Más información sobre la coordinación social](/developers/docs/consensus-mechanisms/pos/attack-and-defense#people-the-last-line-of-defense)

## ¿Los ricos se hacen más ricos en la prueba de participación? {#do-rich-get-richer}

Cuantos más ETH tenga alguien en participación, más validadores puede ejecutar y más recompensas puede acumular. Las recompensas se escalan linealmente con la cantidad de ETH en participación, y todos obtienen el mismo porcentaje de rendimiento. La prueba de trabajo enriquece a los ricos más que la prueba de participación porque los mineros más ricos que compran hardware a escala se benefician de las economías de escala, lo que significa que la relación entre la riqueza y la recompensa no es lineal.

## ¿La prueba de participación está más centralizada que la prueba de trabajo? {#is-pos-decentralized}

No, la prueba de trabajo tiende a la centralización, porque los costes de la minería aumentan y fijan el precio de los particulares y luego del precio de las pequeñas empresas, y así sucesivamente. El problema actual con la prueba de participación es la influencia de los derivados de participación líquidos (LSD). Estos son tókenes que representan el ETH en participación por algún proveedor que cualquiera puede intercambiar en los mercados secundarios sin que se dejen de apostar los ETH reales. Los LSD permiten a los usuarios participar con menos de 32 ETH, pero también crean un riesgo de centralización en el que algunas grandes organizaciones pueden terminar controlando gran parte de la participación. Por esta razón [la participación en solitario](/staking/solo) es la mejor opción para Ethereum.

[Más información sobre la centralización de la participación en los LSD](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## ¿Por qué solo puedo participar con ETH? {#why-can-i-only-stake-eth}

ETH es la moneda nativa de Ethereum. Es esencial tener una moneda única en la que todas las participaciones estén denominadas, tanto para contabilizar los saldos efectivos para la ponderación de los votos como para la seguridad. El ETH en sí es un componente fundamental de Ethereum en lugar de un contrato inteligente. La incorporación de otras monedas aumentaría significativamente la complejidad y disminuiría la seguridad de la participación.

## ¿Es Ethereum la única cadena de bloques de prueba de participación? {#is-ethereum-the-only-pos-blockchain}

No, hay varias cadenas de bloques de prueba de participación. Ninguna es idéntico a Ethereum; el mecanismo de prueba de participación de Ethereum es único.

## ¿Qué es La Fusión? {#what-is-the-merge}

La Fusión fue el momento en que Ethereum apagó su mecanismo de consenso basado en la prueba de trabajo y encendió su mecanismo de consenso basado en la prueba de participación. La Fusión tuvo lugar el 15 de septiembre de 2022.

[Más sobre la fusión](/roadmap/merge)

## ¿Qué son la vivacidad y la seguridad? {#what-are-liveness-and-safety}

La vivacidad y la seguridad son las dos preocupaciones fundamentales de seguridad para una cadena de bloques. La vivacidad es la disponibilidad de una cadena de finalización. Si la cadena deja de finalizar o los usuarios no pueden acceder a ella fácilmente, son fallos de vivacidad. El coste excesivamente alto también podría considerarse como un fracaso de vivacidad. La seguridad se refiere a lo difícil que es atacar la cadena, es decir, finalizar los puntos de control en conflicto.

[Más información sobre la función Casper](https://arxiv.org/pdf/1710.09437.pdf)
