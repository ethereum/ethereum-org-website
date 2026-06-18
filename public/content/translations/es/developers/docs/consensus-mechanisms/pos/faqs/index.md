---
title: Preguntas frecuentes
description: "Preguntas frecuentes sobre la prueba de participación (PoS) de Ethereum."
lang: es
---

## ¿Qué es la prueba de participación (PoS)? {#what-is-proof-of-stake}

La prueba de participación (PoS) es una clase de algoritmo que puede proporcionar seguridad a las cadenas de bloques al garantizar que los atacantes que actúan de manera deshonesta pierdan activos de valor. Los sistemas de prueba de participación requieren que un conjunto de validadores ponga a disposición algún activo que pueda ser destruido si el validador se involucra en algún comportamiento demostrablemente deshonesto. Ethereum utiliza un mecanismo de prueba de participación para asegurar la cadena de bloques.

## ¿Cómo se compara la prueba de participación con la prueba de trabajo? {#comparison-to-proof-of-work}

Tanto la prueba de trabajo (PoW) como la prueba de participación son mecanismos que desincentivan económicamente a los actores maliciosos de enviar spam o defraudar a la red. En ambos casos, los nodos que participan activamente en el consenso ponen algún activo "en la red" que perderán si se comportan mal.

En la prueba de trabajo, este activo es la energía. El nodo, conocido como minero, ejecuta un algoritmo que tiene como objetivo calcular un valor más rápido que cualquier otro nodo. El nodo más rápido tiene el derecho de proponer un bloque a la cadena. Para cambiar el historial de la cadena o dominar la propuesta de bloques, un minero tendría que tener tanto poder de cómputo que siempre gane la carrera. Esto es prohibitivamente caro y difícil de ejecutar, lo que protege a la cadena de ataques. La energía requerida para la "minería" utilizando la prueba de trabajo es un activo del mundo real por el que pagan los mineros.

La prueba de participación requiere que los nodos, conocidos como validadores, envíen explícitamente un activo cripto a un contrato inteligente. Si un validador se comporta mal, estas cripto pueden ser destruidas porque están haciendo "staking" de sus activos directamente en la cadena en lugar de hacerlo indirectamente a través del gasto de energía.

La prueba de trabajo consume mucha más energía porque la electricidad se quema en el proceso de minería. La prueba de participación, por otro lado, requiere solo una cantidad muy pequeña de energía: los validadores de Ethereum pueden incluso ejecutarse en un dispositivo de baja potencia como una Raspberry Pi. Se considera que el mecanismo de prueba de participación de Ethereum es más seguro que la prueba de trabajo porque el costo de atacar es mayor y las consecuencias para un atacante son más severas.

El debate entre la prueba de trabajo y la prueba de participación es un tema polémico. [El blog de Vitalik Buterin](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-are-the-benefits-of-proof-of-stake-as-opposed-to-proof-of-work) y el debate entre Justin Drake y Lyn Alden ofrecen un buen resumen de los argumentos.

<VideoWatch slug="pow-vs-pos" />

## ¿Es eficiente energéticamente la prueba de participación? {#is-pos-energy-efficient}

Sí. Los nodos en una red de prueba de participación utilizan una cantidad minúscula de energía. Un estudio de terceros concluyó que toda la red de prueba de participación de Ethereum consume alrededor de 0,0026 TWh/año, aproximadamente 13.000 veces menos que los videojuegos solo en los EE. UU.

[Más sobre el consumo de energía de Ethereum](/energy-consumption/).

## ¿Es segura la prueba de participación? {#is-pos-secure}

La prueba de participación de Ethereum es muy segura. El mecanismo fue investigado, desarrollado y probado rigurosamente durante ocho años antes de su lanzamiento. Las garantías de seguridad son diferentes a las de las cadenas de bloques de prueba de trabajo. En la prueba de participación, los validadores maliciosos pueden ser castigados activamente (mediante un "recorte") y expulsados del conjunto de validadores, lo que les cuesta una cantidad sustancial de ETH. Bajo la prueba de trabajo, un atacante puede seguir repitiendo su ataque mientras tenga suficiente poder de hash. También es más costoso montar ataques equivalentes en la prueba de participación de Ethereum que bajo la prueba de trabajo. Para afectar la vitalidad de la cadena, se requiere al menos el 33% del total de ether en staking en la red (excepto en los casos de ataques muy sofisticados con una probabilidad de éxito extremadamente baja). Para controlar el contenido de los bloques futuros, se requiere al menos el 51% del total de ETH en staking, y para reescribir el historial, se necesita más del 66% de la participación total. El protocolo de Ethereum destruiría estos activos en los escenarios de ataque del 33% o 51% y por consenso social en el escenario de ataque del 66%.

- [Más sobre cómo defender la prueba de participación de Ethereum de los atacantes](/developers/docs/consensus-mechanisms/pos/attack-and-defense)
- [Más sobre el diseño de la prueba de participación](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)

## ¿La prueba de participación hace que Ethereum sea más barato? {#does-pos-make-ethereum-cheaper}

No. El costo de enviar una transacción (tarifa de gas) está determinado por un mercado de tarifas dinámico que aumenta con una mayor demanda de la red. El mecanismo de consenso no influye directamente en esto.

[Más sobre el gas](/developers/docs/gas).

## ¿Qué son los nodos, clientes y validadores? {#what-are-nodes-clients-and-validators}

Los nodos son computadoras conectadas a la red Ethereum. Los clientes son el software que ejecutan y que convierte a la computadora en un nodo. Hay dos tipos de clientes: clientes de ejecución y clientes de consenso. Ambos son necesarios para crear un nodo. Un validador es un complemento opcional para un cliente de consenso que permite al nodo participar en el consenso de prueba de participación. Esto significa crear y proponer bloques cuando son seleccionados y dar fe de los bloques de los que tienen conocimiento en la red. Para ejecutar un validador, el operador del nodo debe depositar 32 ETH en el contrato de depósito.

- [Más sobre nodos y clientes](/developers/docs/nodes-and-clients)
- [Más sobre el staking](/staking)

## ¿Es la prueba de participación una idea nueva? {#is-pos-new}

No. Un usuario en BitcoinTalk [propuso la idea básica de la prueba de participación](https://bitcointalk.org/index.php?topic=27787.0) como una actualización para Bitcoin en 2011. Pasaron once años antes de que estuviera lista para implementarse en la red principal de Ethereum. Algunas otras cadenas implementaron la prueba de participación antes que Ethereum, pero no el mecanismo específico de Ethereum (conocido como Gasper).

## ¿Qué tiene de especial la prueba de participación de Ethereum? {#why-is-ethereum-pos-special}

El mecanismo de prueba de participación de Ethereum es único en su diseño. No fue el primer mecanismo de prueba de participación en ser diseñado e implementado, pero es el más robusto. El mecanismo de prueba de participación se conoce como "Casper". Casper define cómo se seleccionan los validadores para proponer bloques, cómo y cuándo se realizan las atestaciones, cómo se cuentan las atestaciones, las recompensas y penalizaciones otorgadas a los validadores, las condiciones de recorte, los mecanismos de seguridad como la fuga por inactividad y las condiciones para la "finalidad". La finalidad es la condición de que para que un bloque se considere una parte permanente de la cadena canónica, debe haber sido votado por al menos el 66% del total de ETH en staking en la red. Los investigadores desarrollaron Casper específicamente para Ethereum, y Ethereum es la primera y única cadena de bloques que lo ha implementado.

Además de Casper, la prueba de participación de Ethereum utiliza un algoritmo de elección de bifurcación llamado LMD-GHOST. Esto es necesario en caso de que surja una condición en la que existan dos bloques para el mismo slot. Esto crea dos bifurcaciones de la cadena de bloques. LMD-GHOST elige la que tiene el mayor "peso" de atestaciones. El peso es el número de atestaciones ponderadas por el saldo efectivo de los validadores. LMD-GHOST es exclusivo de Ethereum.

La combinación de Casper y LMD-GHOST se conoce como Gasper.

[Más sobre Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)

## ¿Qué es el recorte (slashing)? {#what-is-slashing}

El recorte es el término que se le da a la destrucción de parte de la participación de un validador y la expulsión del validador de la red. La cantidad de ETH que se pierde en un recorte aumenta proporcionalmente con el número de validadores que son recortados; esto significa que los validadores que se confabulan son castigados más severamente que los individuos.

[Más sobre el recorte](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties#slashing)

## ¿Por qué los validadores necesitan 32 ETH? {#why-32-eth}

Los validadores tienen que hacer staking de ETH para tener algo que perder si se comportan mal. La razón por la que tienen que hacer staking de 32 ETH específicamente es para permitir que los nodos se ejecuten en hardware modesto. Si el mínimo de ETH por validador fuera menor, entonces el número de validadores y, por lo tanto, el número de mensajes que deben procesarse en cada slot aumentaría, lo que significa que se requeriría hardware más potente para ejecutar un nodo.

## ¿Cómo se seleccionan los validadores? {#how-are-validators-selected}

Se elige pseudoaleatoriamente a un único validador para proponer un bloque en cada slot utilizando un algoritmo llamado RANDAO que mezcla un hash del proponente de bloque con una semilla que se actualiza en cada bloque. Este valor se utiliza para seleccionar un validador específico del conjunto total de validadores. La selección de validadores se fija con dos épocas de antelación.

[Más sobre la selección de validadores](/developers/docs/consensus-mechanisms/pos/block-proposal)

## ¿Qué es la manipulación de participación? {#what-is-stake-grinding}

La manipulación de participación es una categoría de ataque en las redes de prueba de participación donde el atacante intenta sesgar el algoritmo de selección de validadores a favor de sus propios validadores. Los ataques de manipulación de participación en RANDAO requieren aproximadamente la mitad del total de ETH en staking.

[Más sobre la manipulación de participación](https://eth2book.info/altair/part2/building_blocks/randomness/#randao-biasability)

## ¿Qué es la penalización social? {#what-is-social-slashing}

La penalización social es la capacidad de la comunidad para coordinar una bifurcación de la cadena de bloques en respuesta a un ataque. Permite a la comunidad recuperarse de un atacante que finaliza una cadena deshonesta. La penalización social también se puede utilizar contra ataques de censura.

- [Más sobre la penalización social](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7)
- [Vitalik Buterin sobre la penalización social](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)

## ¿Sufriré un recorte? {#will-i-get-slashed}

Como validador, es muy difícil sufrir un recorte a menos que te involucres deliberadamente en un comportamiento malicioso. El recorte solo se implementa en escenarios muy específicos donde los validadores proponen múltiples bloques para el mismo slot o se contradicen con sus atestaciones; es muy poco probable que esto ocurra accidentalmente.

[Más sobre las condiciones de recorte](https://eth2book.info/altair/part2/incentives/slashing)

## ¿Qué es el problema de nada en juego? {#what-is-nothing-at-stake-problem}

El problema de nada en juego es un problema conceptual con algunos mecanismos de prueba de participación donde solo hay recompensas y no hay penalizaciones. Si no hay nada en juego, un validador pragmático está igualmente feliz de dar fe de cualquier bifurcación de la cadena de bloques, o incluso de múltiples bifurcaciones, ya que esto aumenta sus recompensas. Ethereum soluciona esto utilizando condiciones de finalidad y recortes para garantizar una única cadena canónica.

[Más sobre el problema de nada en juego](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)

## ¿Qué es un algoritmo de elección de bifurcación? {#what-is-a-fork-choice-algorithm}

Un algoritmo de elección de bifurcación implementa reglas que determinan qué cadena es la canónica. En condiciones óptimas, no hay necesidad de una regla de elección de bifurcación porque solo hay un proponente de bloque por slot y un bloque para elegir. Sin embargo, ocasionalmente, múltiples bloques para el mismo slot o información que llega tarde conducen a múltiples opciones sobre cómo se organizan los bloques cerca de la cabeza de la cadena. En estos casos, todos los clientes deben implementar algunas reglas de manera idéntica para asegurarse de que todos elijan la secuencia correcta de bloques. El algoritmo de elección de bifurcación codifica estas reglas.

El algoritmo de elección de bifurcación de Ethereum se llama LMD-GHOST. Elige la bifurcación con el mayor peso de atestaciones, lo que significa aquella por la que ha votado la mayor cantidad de ETH en staking.

[Más sobre LMD-GHOST](/developers/docs/consensus-mechanisms/pos/gasper/#fork-choice)

## ¿Qué es la finalidad en la prueba de participación? {#what-is-finality}

La finalidad en la prueba de participación es la garantía de que un bloque determinado es una parte permanente de la cadena canónica y no se puede revertir a menos que haya una falla de consenso en la que un atacante queme el 33% del total de ether en staking. Esta es una finalidad "criptoeconómica", a diferencia de la "finalidad probabilística" que es relevante para las cadenas de bloques de prueba de trabajo. En la finalidad probabilística, no hay estados explícitos de finalizado/no finalizado para los bloques: simplemente se vuelve cada vez menos probable que un bloque pueda ser eliminado de la cadena a medida que envejece, y los usuarios determinan por sí mismos cuándo están lo suficientemente seguros de que un bloque es "seguro". Con la finalidad criptoeconómica, los pares de bloques de punto de control deben ser votados por el 66% del ether en staking. Si se cumple esta condición, los bloques entre esos puntos de control se consideran explícitamente "finalizados".

[Más sobre la finalidad](/developers/docs/consensus-mechanisms/pos/#finality)

## ¿Qué es la "subjetividad débil"? {#what-is-weak-subjectivity}

La subjetividad débil es una característica de las redes de prueba de participación donde se utiliza información social para confirmar el estado actual de la cadena de bloques. A los nodos nuevos o a los nodos que se reincorporan a la red después de estar desconectados durante mucho tiempo se les puede dar un estado reciente para que el nodo pueda ver de inmediato si están en la cadena correcta. Estos estados se conocen como "puntos de control de subjetividad débil" y se pueden obtener de otros operadores de nodos fuera de banda, de exploradores de bloques o de varios puntos finales públicos.

[Más sobre la subjetividad débil](/developers/docs/consensus-mechanisms/pos/weak-subjectivity)

## ¿Es la prueba de participación resistente a la censura? {#is-pos-censorship-resistant}

La resistencia a la censura es actualmente difícil de probar. Sin embargo, a diferencia de la prueba de trabajo, la prueba de participación ofrece la opción de coordinar recortes para castigar a los validadores que censuran. Hay próximos cambios en el protocolo que separan a los constructores de bloques de los proponentes de bloques e implementan listas de transacciones que los constructores deben incluir en cada bloque. Esta propuesta se conoce como separación proponente-constructor (PBS) y ayuda a evitar que los validadores censuren transacciones.

[Más sobre la separación proponente-constructor (PBS)](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Original-basic-scheme)

## ¿Puede el sistema de prueba de participación de Ethereum sufrir un ataque del 51%? {#pos-51-attack}

Sí. La prueba de participación es vulnerable a los ataques del 51%, al igual que la prueba de trabajo. En lugar de que el atacante requiera el 51% del poder de hash de la red, el atacante requiere el 51% del total de ETH en staking. Un atacante que acumula el 51% de la participación total llega a controlar el algoritmo de elección de bifurcación. Esto permite al atacante censurar ciertas transacciones, hacer reorganizaciones de corto alcance y extraer MEV reordenando los bloques a su favor.

[Más sobre ataques a la prueba de participación](/developers/docs/consensus-mechanisms/pos/attack-and-defense)

## ¿Qué es la coordinación social y por qué es necesaria? {#what-is-social-coordination}

La coordinación social es una última línea de defensa para Ethereum que permitiría recuperar una cadena honesta de un ataque que finalizó bloques deshonestos. En este caso, la comunidad de Ethereum tendría que coordinarse "fuera de banda" y acordar el uso de una bifurcación minoritaria honesta, recortando a los validadores del atacante en el proceso. Esto requeriría que las aplicaciones y los intercambios también reconozcan la bifurcación honesta.

[Lee más sobre la coordinación social](/developers/docs/consensus-mechanisms/pos/attack-and-defense#people-the-last-line-of-defense)

## ¿Los ricos se hacen más ricos en la prueba de participación? {#do-rich-get-richer}

Cuanto más ETH tiene alguien para hacer staking, más validadores puede ejecutar y más recompensas puede acumular. Las recompensas aumentan linealmente con la cantidad de ETH en staking, y todos obtienen el mismo porcentaje de rendimiento. La prueba de trabajo enriquece a los ricos más que la prueba de participación porque los mineros más ricos que compran hardware a gran escala se benefician de las economías de escala, lo que significa que la relación entre la riqueza y la recompensa no es lineal.

## ¿Es la prueba de participación más centralizada que la prueba de trabajo? {#is-pos-decentralized}

No, la prueba de trabajo tiende hacia la centralización porque los costos de minería aumentan y excluyen a los individuos, luego excluyen a las pequeñas empresas, y así sucesivamente. El problema actual con la prueba de participación es la influencia de los derivados de staking líquido (LSD). Estos son tokens que representan ETH en staking por algún proveedor que cualquiera puede intercambiar en mercados secundarios sin que el ETH real se retire del staking. Los LSD permiten a los usuarios hacer staking con menos de 32 ETH, pero también crean un riesgo de centralización donde unas pocas organizaciones grandes pueden terminar controlando gran parte de la participación. Es por esto que el [staking en solitario](/staking/solo) es la mejor opción para Ethereum.

[Más sobre la centralización de la participación en los LSD](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## ¿Por qué solo puedo hacer staking de ETH? {#why-can-i-only-stake-eth}

ETH es la moneda nativa de Ethereum. Es esencial tener una moneda única en la que se denominen todas las participaciones, tanto para contabilizar los saldos efectivos para ponderar los votos como por seguridad. El propio ETH es un componente fundamental de Ethereum en lugar de un contrato inteligente. Incorporar otras monedas aumentaría significativamente la complejidad y disminuiría la seguridad del staking.

## ¿Es Ethereum la única cadena de bloques de prueba de participación? {#is-ethereum-the-only-pos-blockchain}

No, hay varias cadenas de bloques de prueba de participación. Ninguna es idéntica a Ethereum; el mecanismo de prueba de participación de Ethereum es único.

## ¿Qué es La Fusión? {#what-is-the-merge}

La Fusión fue el momento en que Ethereum apagó su mecanismo de consenso basado en la prueba de trabajo y encendió su mecanismo de consenso basado en la prueba de participación. La Fusión ocurrió el 15 de septiembre de 2022.

[Más sobre La Fusión](/roadmap/merge)

## ¿Qué son la vitalidad y la seguridad? {#what-are-liveness-and-safety}

La vitalidad (liveness) y la seguridad (safety) son las dos preocupaciones de seguridad fundamentales para una cadena de bloques. La vitalidad es la disponibilidad de una cadena que finaliza. Si la cadena deja de finalizar o los usuarios no pueden acceder a ella fácilmente, se trata de fallas de vitalidad. Un costo de acceso extremadamente alto también podría considerarse una falla de vitalidad. La seguridad se refiere a lo difícil que es atacar la cadena, es decir, finalizar puntos de control conflictivos.

[Lee más en el documento de Casper](https://arxiv.org/pdf/1710.09437.pdf)