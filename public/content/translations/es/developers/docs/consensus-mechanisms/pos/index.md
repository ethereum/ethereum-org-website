---
title: "Prueba de participación (PoS)"
description: "Una explicación del protocolo de consenso de prueba de participación y su papel en Ethereum."
lang: es
---

La prueba de participación (PoS) es la base del [mecanismo de consenso](/developers/docs/consensus-mechanisms/) de Ethereum. Ethereum activó su mecanismo de prueba de participación en 2022 porque es más seguro, consume menos energía y es mejor para implementar nuevas soluciones de escalabilidad en comparación con la arquitectura anterior de [prueba de trabajo (PoW)](/developers/docs/consensus-mechanisms/pow).

## Requisitos previos {#prerequisites}

Para comprender mejor esta página, le recomendamos que primero lea sobre los [mecanismos de consenso](/developers/docs/consensus-mechanisms/).

## ¿Qué es la prueba de participación (PoS)? {#what-is-pos}

La prueba de participación es una forma de demostrar que los validadores han aportado algo de valor a la red que puede ser destruido si actúan de forma deshonesta. En la prueba de participación de [Ethereum](/), los validadores depositan explícitamente capital en garantía (hacen staking) en forma de ETH en un contrato inteligente en Ethereum. El validador es entonces responsable de comprobar que los nuevos bloques propagados por la red son válidos y, ocasionalmente, de crear y propagar nuevos bloques ellos mismos. Si intentan defraudar a la red (por ejemplo, proponiendo múltiples bloques cuando deberían enviar uno o enviando atestaciones conflictivas), parte o la totalidad de su ETH en staking puede ser destruido.

## Validadores {#validators}

Para participar como validador, un usuario debe depositar 32 ETH en el contrato de depósito y ejecutar tres piezas de software independientes: un cliente de ejecución, un cliente de consenso y un cliente de validador. Al depositar su ETH, el usuario se une a una cola de activación que limita la tasa de nuevos validadores que se unen a la red. Una vez activados, los validadores reciben nuevos bloques de sus pares en la red Ethereum. Las transacciones entregadas en el bloque se vuelven a ejecutar para comprobar que los cambios propuestos en el estado de Ethereum son válidos, y se comprueba la firma del bloque. A continuación, el validador envía un voto (llamado atestación) a favor de ese bloque a través de la red.

Mientras que en la prueba de trabajo, el tiempo de los bloques está determinado por la dificultad de minería, en la prueba de participación, el ritmo es fijo. El tiempo en la prueba de participación de Ethereum se divide en slots (12 segundos) y épocas (32 slots). Un validador es seleccionado aleatoriamente para ser un proponente de bloque en cada slot. Este validador es responsable de crear un nuevo bloque y enviarlo a otros nodos de la red. También en cada slot, se elige aleatoriamente un comité de validadores, cuyos votos se utilizan para determinar la validez del bloque que se propone. Dividir el conjunto de validadores en comités es importante para mantener la carga de la red manejable. Los comités dividen el conjunto de validadores para que cada validador activo realice una atestación en cada época, pero no en cada slot.

## Cómo se ejecuta una transacción en la prueba de participación de Ethereum {#transaction-execution-ethereum-pos}

A continuación se ofrece una explicación de principio a fin de cómo se ejecuta una transacción en la prueba de participación de Ethereum.

1. Un usuario crea y firma una [transacción](/developers/docs/transactions/) con su clave privada. Esto suele ser gestionado por una billetera o una biblioteca como [ethers.js](https://docs.ethers.org/v6/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/), etc., pero internamente el usuario está haciendo una solicitud a un nodo utilizando la [API JSON-RPC](/developers/docs/apis/json-rpc/) de Ethereum. El usuario define la cantidad de gas que está dispuesto a pagar como tarifa de prioridad a un validador para animarle a incluir la transacción en un bloque. Las [tarifas de prioridad](/developers/docs/gas/#priority-fee) se pagan al validador mientras que la [tarifa base](/developers/docs/gas/#base-fee) se quema.
2. La transacción se envía a un [cliente de ejecución](/developers/docs/nodes-and-clients/#execution-client) de Ethereum que verifica su validez. Esto significa asegurarse de que el remitente tiene suficiente ETH para cumplir con la transacción y que la ha firmado con la clave correcta.
3. Si la transacción es válida, el cliente de ejecución la añade a su mempool local (lista de transacciones pendientes) y también la transmite a otros nodos a través de la red de chismes (gossip network) de la capa de ejecución. Cuando otros nodos se enteran de la transacción, también la añaden a su mempool local. Los usuarios avanzados pueden abstenerse de transmitir su transacción y, en su lugar, enviarla a constructores de bloques especializados como [Flashbots Auction](https://docs.flashbots.net/flashbots-auction/overview). Esto les permite organizar las transacciones en los próximos bloques para obtener el máximo beneficio ([MEV](/developers/docs/mev/#mev-extraction)).
4. Uno de los nodos validadores de la red es el proponente de bloque para el slot actual, habiendo sido seleccionado previamente de forma pseudoaleatoria utilizando RANDAO. Este nodo es responsable de construir y transmitir el siguiente bloque que se añadirá a la cadena de bloques de Ethereum y de actualizar el estado global. El nodo se compone de tres partes: un cliente de ejecución, un cliente de consenso y un cliente de validador. El cliente de ejecución agrupa las transacciones de la mempool local en una "carga útil de ejecución" y las ejecuta localmente para generar un cambio de estado. Esta información se pasa al cliente de consenso, donde la carga útil de ejecución se envuelve como parte de un "bloque baliza" que también contiene información sobre recompensas, penalizaciones, recortes, atestaciones, etc., que permiten a la red acordar la secuencia de bloques en la cabeza de la cadena. La comunicación entre los clientes de ejecución y consenso se describe con más detalle en [Conexión de los clientes de consenso y ejecución](/developers/docs/networking-layer/#connecting-clients).
5. Otros nodos reciben el nuevo bloque baliza en la red de chismes de la capa de consenso. Lo pasan a su cliente de ejecución, donde las transacciones se vuelven a ejecutar localmente para garantizar que el cambio de estado propuesto sea válido. A continuación, el cliente de validador atestigua que el bloque es válido y es el siguiente bloque lógico en su visión de la cadena (lo que significa que se basa en la cadena con el mayor peso de atestaciones, tal y como se define en las [reglas de elección de bifurcación](/developers/docs/consensus-mechanisms/pos/#fork-choice)). El bloque se añade a la base de datos local en cada nodo que lo atestigua.
6. La transacción puede considerarse "finalizada" si ha pasado a formar parte de una cadena con un "enlace de supermayoría" entre dos puntos de control. Los puntos de control se producen al principio de cada época y existen para tener en cuenta el hecho de que solo un subconjunto de validadores activos realiza atestaciones en cada slot, pero todos los validadores activos realizan atestaciones a lo largo de cada época. Por lo tanto, solo entre épocas se puede demostrar un 'enlace de supermayoría' (aquí es donde el 66% del total de ETH en staking en la red está de acuerdo en dos puntos de control).

A continuación encontrará más detalles sobre la finalidad.

## Finalidad {#finality}

Una transacción tiene "finalidad" en las redes distribuidas cuando forma parte de un bloque que no puede cambiar sin que se queme una gran cantidad de ETH. En la prueba de participación de Ethereum, esto se gestiona mediante bloques de "punto de control". El primer bloque de cada época es un punto de control. Los validadores votan por pares de puntos de control que consideran válidos. Si un par de puntos de control atrae votos que representan al menos dos tercios del total de ETH en staking, los puntos de control se actualizan. El más reciente de los dos (objetivo) pasa a estar "justificado". El anterior de los dos ya está justificado porque era el "objetivo" en la época anterior. Ahora se actualiza a "finalizado". Este proceso de actualización de los puntos de control es gestionado por **[Casper the Friendly Finality Gadget (Casper FFG)](https://arxiv.org/pdf/1710.09437)**. Casper FFG es una herramienta de finalidad de bloques para el consenso. Una vez que un bloque está finalizado, no puede ser revertido o cambiado sin un recorte mayoritario de los participantes (stakers), lo que lo hace económicamente inviable.

Para revertir un bloque finalizado, un atacante se comprometería a perder al menos un tercio del suministro total de ETH en staking. La razón exacta de esto se explica en esta [publicación del blog de la Fundación Ethereum](https://blog.ethereum.org/2016/05/09/on-settlement-finality). Dado que la finalidad requiere una mayoría de dos tercios, un atacante podría evitar que la red alcance la finalidad votando con un tercio de la participación total. Existe un mecanismo para defenderse de esto: la [fuga por inactividad](https://eth2book.info/bellatrix/part2/incentives/inactivity). Esto se activa siempre que la cadena no logra finalizar durante más de cuatro épocas. La fuga por inactividad drena el ETH en staking de los validadores que votan en contra de la mayoría, lo que permite a la mayoría recuperar una mayoría de dos tercios y finalizar la cadena.

## Seguridad criptoeconómica {#crypto-economic-security}

Ejecutar un validador es un compromiso. Se espera que el validador mantenga suficiente hardware y conectividad para participar en la validación de bloques y en la propuesta. A cambio, el validador recibe un pago en ETH (su saldo en staking aumenta). Por otro lado, participar como validador también abre nuevas vías para que los usuarios ataquen la red para beneficio personal o sabotaje. Para evitar esto, los validadores pierden las recompensas de ETH si no participan cuando se les solicita, y su participación existente puede ser destruida si se comportan de forma deshonesta. Dos comportamientos principales pueden considerarse deshonestos: proponer múltiples bloques en un solo slot (equivocación) y enviar atestaciones contradictorias.

La cantidad de ETH recortado depende de cuántos validadores también estén sufriendo un recorte casi al mismo tiempo. Esto se conoce como la ["penalización por correlación"](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty), y puede ser menor (\~1% de la participación para un solo validador recortado por su cuenta) o puede resultar en la destrucción del 100% de la participación del validador (evento de recorte masivo). Se impone a la mitad de un período de salida forzada que comienza con una penalización inmediata (hasta 1 ETH) en el Día 1, la penalización por correlación en el Día 18 y, finalmente, la expulsión de la red en el Día 36. Reciben penalizaciones menores de atestación todos los días porque están presentes en la red pero no envían votos. Todo esto significa que un ataque coordinado sería muy costoso para el atacante.

## Elección de bifurcación {#fork-choice}

Cuando la red funciona de manera óptima y honesta, solo hay un nuevo bloque en la cabeza de la cadena, y todos los validadores lo atestiguan. Sin embargo, es posible que los validadores tengan diferentes visiones de la cabeza de la cadena debido a la latencia de la red o porque un proponente de bloque se ha equivocado. Por lo tanto, los clientes de consenso requieren un algoritmo para decidir a cuál favorecer. El algoritmo utilizado en la prueba de participación de Ethereum se llama [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf), y funciona identificando la bifurcación que tiene el mayor peso de atestaciones en su historial.

## Prueba de participación y seguridad {#pos-and-security}

La amenaza de un [ataque del 51%](https://www.investopedia.com/terms/1/51-attack.asp) sigue existiendo en la prueba de participación al igual que en la prueba de trabajo, pero es aún más arriesgado para los atacantes. Un atacante necesitaría el 51% del ETH en staking. Entonces podrían usar sus propias atestaciones para asegurarse de que su bifurcación preferida fuera la que tuviera más atestaciones acumuladas. El 'peso' de las atestaciones acumuladas es lo que utilizan los clientes de consenso para determinar la cadena correcta, por lo que este atacante podría hacer que su bifurcación fuera la canónica. Sin embargo, una ventaja de la prueba de participación sobre la prueba de trabajo es que la comunidad tiene flexibilidad para montar un contraataque. Por ejemplo, los validadores honestos podrían decidir seguir construyendo sobre la cadena minoritaria e ignorar la bifurcación del atacante mientras animan a las aplicaciones, los exchanges y los pools a hacer lo mismo. También podrían decidir expulsar por la fuerza al atacante de la red y destruir su ETH en staking. Estas son fuertes defensas económicas contra un ataque del 51%.

Más allá de los ataques del 51%, los malos actores también podrían intentar otros tipos de actividades maliciosas, como:

- ataques de largo alcance (aunque la herramienta de finalidad neutraliza este vector de ataque)
- 'reorganizaciones' de corto alcance (aunque el impulso del proponente y los plazos de atestación mitigan esto)
- ataques de rebote y equilibrio (también mitigados por el impulso del proponente, y estos ataques de todos modos solo se han demostrado en condiciones de red idealizadas)
- ataques de avalancha (neutralizados por la regla de los algoritmos de elección de bifurcación de considerar solo el último mensaje)

En general, se ha demostrado que la prueba de participación, tal y como está implementada en Ethereum, es económicamente más segura que la prueba de trabajo.

## Pros y contras {#pros-and-cons}

| Pros                                                                                                                                                                                                                | Contras                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| El staking facilita que las personas participen en la seguridad de la red, promoviendo la descentralización. Un nodo validador se puede ejecutar en una computadora portátil normal. Los pools de staking permiten a los usuarios hacer staking sin tener 32 ETH. | La prueba de participación es más reciente y está menos probada en batalla en comparación con la prueba de trabajo              |
| El staking está más descentralizado. Las economías de escala no se aplican de la misma manera que en la minería PoW.                                                                                                         | La prueba de participación es más compleja de implementar que la prueba de trabajo                          |
| La prueba de participación ofrece una mayor seguridad criptoeconómica que la prueba de trabajo                                                                                                                                           | Los usuarios necesitan ejecutar tres piezas de software para participar en la prueba de participación de Ethereum. |
| Se requiere una menor emisión de nuevo ETH para incentivar a los participantes de la red                                                                                                                                            |                                                                                         |

### Comparación con la prueba de trabajo {#comparison-to-proof-of-work}

Ethereum utilizaba originalmente la prueba de trabajo, pero cambió a la prueba de participación en septiembre de 2022. PoS ofrece varias ventajas sobre PoW, tales como:

- mejor eficiencia energética: no hay necesidad de usar mucha energía en los cálculos de la prueba de trabajo
- menores barreras de entrada, requisitos de hardware reducidos: no hay necesidad de hardware de élite para tener la oportunidad de crear nuevos bloques
- menor riesgo de centralización: la prueba de participación debería llevar a que más nodos aseguren la red
- debido al bajo requerimiento de energía, se requiere una menor emisión de ETH para incentivar la participación
- las penalizaciones económicas por mal comportamiento hacen que los ataques del estilo del 51% sean más costosos para un atacante en comparación con la prueba de trabajo
- la comunidad puede recurrir a la recuperación social de una cadena honesta si un ataque del 51% superara las defensas criptoeconómicas.

## Lecturas adicionales {#further-reading}

- [Preguntas frecuentes sobre la prueba de participación](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Qué es la prueba de participación](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Qué es la prueba de participación y por qué es importante](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Por qué la prueba de participación (noviembre de 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Prueba de participación: cómo aprendí a amar la subjetividad débil](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity) _Vitalik Buterin_
- [Ataque y defensa de la prueba de participación de Ethereum](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [Una filosofía de diseño de la prueba de participación](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_
- [Video: Vitalik Buterin explica la prueba de participación a Lex Fridman](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## Temas relacionados {#related-topics}

- [Prueba de trabajo (PoW)](/developers/docs/consensus-mechanisms/pow/)
- [Prueba de autoridad (PoA)](/developers/docs/consensus-mechanisms/poa/)