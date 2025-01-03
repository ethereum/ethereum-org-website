---
title: Prueba de participación (PoS)
description: Una explicación del protocolo de consenso de la prueba de participación y su papel en Ethereum.
lang: es
---

La prueba de participación (PoS) subyace al [mecanismo de consenso](/developers/docs/consensus-mechanisms/) de Ethereum. Ethereum cambió su mecanismo de prueba de participación en 2022 porque es más seguro, consume menos energía y resulta más apropiado para implementar nuevas soluciones de escalabilidad en comparación con la arquitectura anterior de la [prueba de trabajo](/developers/docs/consensus-mechanisms/pow).

## Requisitos previos {#prerequisites}

Para comprender mejor esta página, te recomendamos que primero leas los [mecanismos de consenso](/developers/docs/consensus-mechanisms/).

## ¿Qué es la prueba de participación (PoS)? {#what-is-pos}

La prueba de participación es la manera de probar que los validadores han puesto algo de valor en la red y que puede destruirse si actúan deshonestamente. En la prueba de participación de Ethereum, los validadores explícitamente apuestan capital en forma de ETH en un contrato inteligente en Ethereum. Así pues, el validador es responsable de verificar la validez de los nuevos bloques propagados por la red y, en ciertas circunstancias, de crear y propagar nuevos bloques. Si ellos intentan estafar a la red (por ejemplo al proponer múltiples bloques cuando deberían enviar uno o enviar certificaciones contradictorias), algunas o todas sus apuestas en ETH se pueden destruir.

## Validadores {#validators}

Para participar como validador, un usuario debe de depositar 32 ETH en el contrato de depósito y ejecutar tres piezas de software de manera separada: un cliente de ejecución, un cliente de consenso y un cliente validador. Al depositar sus ETH, el usuario se une a una cola de activación que limita el número de nuevos validadores que se unen a la red. Una vez habilitados, los validadores reciben nuevos bloques de sus pares en la red de Ethereum. Las transacciones entregadas en el bloque se vuelven a ejecutar para comprobar que los cambios propuestos en los estados de Ethereum sean válidos, y se compruebe la firma del bloque. Luego, el validador envía un voto (denominado certificación) a favor de dicho bloque en la red.

En la prueba de trabajo (PoW) el tiempo de los bloques se determinaba por la dificultad de minado, mientras que en la prueba de participación (PoS) el tiempo es predeterminado. En la prueba de participación (PoS) de Ethereum, el tiempo se divide en ranuras (12 segundos) y épocas (32 ranuras). Se selecciona de manera aleatoria a un validador para que proponga un bloque en cada ranura. Este validador será responsable de crear un nuevo bloque y de enviarlo a otro nodo de la red. Por otra parte, se escoge de manera aleatoria a un comité de validadores para cada ranura, cuyos votos se utilizarán para determinar la validez del bloque propuesto. Dividir la configuración del validador en comités es importante para mantener la carga de la red manejable. Los comités dividen el conjunto de validadores para que todos los validadores activos certifiquen en cada época, pero no en todas las ranuras.

## Cómo se ejecutan las transacciones en la PoS de Ethereum {#transaction-execution-ethereum-pos}

La siguiente explicación detalla íntegramente cómo se ejecuta una transacción en la prueba de participación de Ethereum.

1. Un usuario crea y firma una [transacción](/developers/docs/transactions/) con su clave privada. De esto suele encargarse una cartera o una biblioteca como [ether. s](https://docs.ethers.io/v5/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/), etc., pero realmente, es el usuario quien hace una solicitud a un nodo usando la API de Ethereum [JSON-RPC](/developers/docs/apis/json-rpc/). El usuario define la cantidad de gas que está dispuesto a pagar como propina a un validador para animarle a incluir la transacción en un bloque. Las[propinas](/developers/docs/gas/#priority-fee)se pagan al validador, mientras que las[tarifas de base](/developers/docs/gas/#base-fee) se queman.
2. La transacción se envía a un [cliente de ejecución](/developers/docs/nodes-and-clients/#execution-client) de Ethereum que verifica su validez. Esto implica asegurarse de que el emisor tenga suficientes ETH para realizar la transacción y firmarla con la clave correcta.
3. Si la transacción es válida, el cliente de ejecución la añade a su zona de espera local (lista de transacciones pendientes) y también la difunde a otros nodos a través de la red de intercambio de información (o Gossip) de la capa de ejecución. Cuando otros nodos se enteran de la transacción, la añaden también a su zona de espera local. Los usuarios avanzados podrían abstenerse de transmitir su transacción y, en su lugar, redirigirla a constructores de bloques especializados como las [subastas de Flashbots](https://docs.flashbots.net/flashbots-auction/overview). Esto les permite organizar las transacciones en los próximos bloques para obtener la máxima ganancia ([MEV](/developers/docs/mev/#mev-extraction)).
4. Uno de los nodos validadores de la red es el proponente de bloques para la vacante actual, habiendo sido seleccionado previamente de forma pseudoaleatoria utilizando RANDAO. Este nodo es responsable de construir y difundir el siguiente bloque que se añadirá a la cadena de bloques de Ethereum y de actualizar el estado global. El nodo se compone de tres partes: un cliente de ejecución, un cliente de consenso y un cliente validador. El cliente de ejecución agrupa las transacciones de la zona de espera local en una «carga útil de ejecución» y las ejecuta localmente para generar un cambio de estado. Esta información se transmite al cliente de consenso donde la carga útil de ejecución se recoge como parte de un «bloque de baliza» que también contiene información sobre recompensas, penalizaciones, recortes, certificaciones y demás que permiten a la red acordar la secuencia de bloques en la cabeza de la cadena. La comunicación entre los clientes de ejecución y consenso se describe con más detalle en [Cómo conectar a los clientes de consenso y ejecución](/developers/docs/networking-layer/#connecting-clients).
5. Otros nodos reciben el nuevo bloque de baliza en la red de intercambio de información de la capa de consenso. Lo pasan a su cliente de ejecución, donde las transacciones se vuelven a ejecutar localmente para garantizar que el cambio de estado propuesto es válido. El cliente validador certifica que el bloque es válido y es el siguiente bloque lógico en su visión de la cadena (lo que significa que se construye sobre la cadena con el mayor peso de certificaciones según se define en las [reglas de elección de bifurcación](/developers/docs/consensus-mechanisms/pos/#fork-choice)). El bloque se añade a la base de datos local de cada nodo que lo certifica.
6. La transacción puede considerarse «finalizada» si se ha convertido en parte de una cadena con un enlace «supermayoritario» entre dos puntos de control. Los puntos de control ocurren al comienzo de cada época y existen para dar cuenta del hecho de que solo un subconjunto de validadores activos certifique en cada ranura, pero todos los validadores activos certifican en cada época. Por lo tanto, sólo se puede demostrar un «enlace supermayoritario» entre épocas (el 66 % del total del ETH apostado en la red tiene que estar de acuerdo en dos puntos de control).

En la siguiente sección se detalla la finalidad.

## Finalidad {#finality}

Una transacción tiene la «finalidad» de distribuir redes cuando no se puede cambiar una parte del bloque sin que se queme una gran cantidad de ETH. Con la prueba de participación de Ethereum, esto se resuelve utilizando bloques de «puntos de control». El primer bloque de cada época será un punto de control. Los validadores votan por los pares de puntos que consideran válidos. Si un par de puntos de control atrae votos que representan al menos dos tercios del total de ETH apostado, los puntos de control se actualizan. El más reciente entre ambos (objetivo) se convierte en «justificado». El primero de los dos de por sí ya está justificado al ser el «objetivo» de la época anterior. Ahora se ha clasificado como «finalizado».

Para revertir un bloque finalizado, un atacante se comprometería a perder al menos un tercio del total de ETH apostado. La razón exacta de esto se explica en esta [publicación del blog de Ethereum Fondation](https://blog.ethereum.org/2016/05/09/on-settlement-finality/). Ya que la finalización requiere una mayoría de dos tercios, un atacante podría evitar que se alcance la finalización en la red al votar con un tercio de la apuesta total. Existe un mecanismo de defensa contra esto: el [filtro de inactividad](https://eth2book.info/bellatrix/part2/incentives/inactivity). Este se activa cada vez que la cadena no logra finalizar tras más de cuatro épocas. El filtro de inactividad diluye el ETH en reserva de los validadores que han votado contra la mayoría, permitiendo así que la mayoría logre recuperar los dos tercios para finalizar la cadena.

## Seguridad criptoeconómica {#crypto-economic-security}

Hacer de validador significa adoptar un firme compromiso. Se espera que el validador cuente con el hardware y la conectividad suficientes para participar en la validación y propuesta de bloques. A cambio, el validador recibirá un pago en ETH (haciendo que su saldo de participación aumente). Por otra parte, al participar como validador también se abren nuevos caminos para que ciertos usuarios ataquen la red en busca de beneficios propios o sabotajes. Para evitarlo, los validadores perderán las recompensas en ETH cuando no participen tras haber sido asignados, así como también se podrá destruir el ETH de sus participaciones ante malas conductas. Dos principales comportamientos pueden considerarse deshonestos: proponer múltiples bloques en un solo espacio (equivocación) y presentar certificaciones contradictorias.

La cantidad de ETH recortados dependerá del número de validadores que se vean afectados en ese preciso momento. Esto se conoce como [«penalización por correlación»](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty), que podrá ser inferior (~1% de reducción del fondo de garantía para un solo validador) o incluso puede resultar en la destrucción del 100 % de la garantía del validador (evento masivo de recortes). Se podrá imponer a mitad del proceso un período de salida forzosa con una penalización inmediata (de hasta 1 ETH) el primer día, la penalización por correlación el 18.º día y, por último, la expulsión de la red el 36.º día. Recibirán multas por certificaciones menores a diario al estar presentes en la red sin participar en las votaciones. Esto significaría que un ataque coordinado podría resultar muy costoso para el atacante.

## Selección de bifurcación {#fork-choice}

Cuando la red opera de manera óptima y honesta, solo habrá un nuevo bloque en la cabeza de la cadena y todos los validadores lo certifican. A pesar de ello, existe la posibilidad de que los validadores tengan diferentes puntos de vista en relación con la cabeza de la cadena debido a latencias en la red o ante la equivocación de un proponente de bloque. Por este motivo, se requiere de un algoritmo para que los clientes de consenso puedan decidir a cuál favorecer. El algoritmo empleado en la prueba de participación de Ethereum se llama [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf), y opera identificando la bifurcación que tenga la mayor cantidad de certificaciones en su historial.

## Prueba de participación y seguridad {#pos-and-security}

La amenaza de un [ataque del 51 %](https://www.investopedia.com/terms/1/51-attack.asp) aún está presente en la prueba de participación, al igual que en la prueba de trabajo, solo que ahora es incluso más peligroso para los atacantes. Un atacante necesitará el 51 % del ETH apostado como garantía. Luego podrían hacer uso de sus certificaciones para asegurar que la bifurcación que han elegido sea la que acumula la mayor cantidad de certificaciones. El «peso» de las certificaciones acumuladas lo utilizan los clientes de consenso para determinar cuál es la cadena correcta, por lo que este atacante podría ser capaz de convertir su bifurcación en la predilecta. Sin embargo, una ventaja que la prueba de participación (PoS) tiene frente a la prueba de trabajo (PoW) es que la comunidad cuenta con la flexibilidad de perpetrar un contraataque. Por ejemplo, los validadores honestos podrán optar por seguir construyendo en la cadena minoritaria, ignorando la bifurcación del atacante e invitando a las aplicaciones, intercambios y reservas de liquidez a actuar en consecuencia. También tendrían la posibilidad de eliminar de la red al atacante de manera forzosa, así como destruir su ETH apostado. Estas son defensas económicas sólidas contra un ataque del 51 %.

Más allá del 51% de los ataques, los malos actores también podrían intentar otros tipos de actividades maliciosas, como:

- ataques de largo alcance (aunque el artilugio de finalidad neutraliza este vector de ataque)
- reorganizaciones de corto alcance (aunque el impulso del proponente [proposer boosting] y los plazos de certificación mitigan esto)
- ataques de rebote y equilibrio (también mitigados por el impulso del proponente; estos ataques de todos modos solo se han demostrado en condiciones de red idealizadas)
- ataques de avalancha (neutralizados por la regla de los algoritmos de elección de bifurcación de solo considerar el último mensaje)

En conjunto, la prueba de participación, tal como ha sido implementada en Ethereum, demuestra tener mayor seguridad económica que la prueba de trabajo.

## Ventajas y desventajas {#pros-and-cons}

| Ventajas                                                                                                                                                                                                                                                                                    | Desventajas                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Apostar facilita la participación de las personas en la protección de la seguridad de la red, promoviendo así la descentralización. el nodo de validación puede ejecutarse en un portátil convencional. Las reservas de apuestas permiten que los usuarios puedan apostar sin tener 32 ETH. | La prueba de participación es reciente y con menos pruebas de resistencia que la prueba de trabajo                             |
| La participación es más descentralizada. Las economías de escala no son aplicables en la misma medida en que se hacía con el minado en PoW.                                                                                                                                                 | La implementación de la prueba de participación es mucho más compleja que con la prueba de trabajo.                            |
| La prueba de participación ofrece mayor seguridad criptoeconómica en comparación con la prueba de trabajo.                                                                                                                                                                                  | Los usuarios deben ejecutar tres piezas de software distintas para poder participar en la prueba de participación de Ethereum. |
| Se requiere una menor emisión de nuevos ETH para incentivar a los participantes de la red.                                                                                                                                                                                                  |                                                                                                                                |

### Comparación con la prueba de trabajo {#comparison-to-proof-of-work}

Ethereum originalmente utilizaba prueba de trabajo (PoW), pero cambió a prueba de participación (PoS) en septiembre de 2022. La PoS ofrece varias ventajas sobre la PoW, a saber:

- Mayor eficiencia energética: no hay necesidad de emplear las grandes cantidades de energía requeridas para computar que se usaban con la prueba de trabajo (PoW).
- Menos barreras para entrar al reducir los requisitos de hardware: no es necesario emplear hardware de primera clase para tener las posibilidades de crear nuevos bloques.
- Un reducido riesgo de centralización: la prueba de participación debería traer consigo una mayor cantidad de nodos que protejan la red.
- Debido al bajo consumo energético, se requiere de una menor emisión de ETH para incentivar la participación.
- Las sanciones económicas por mala conducta hacen que los ataques, como el del 51 % por ejemplo, sean más costosos para un atacante en comparación con la prueba de trabajo.
- La comunidad puede recurrir al rescate social de una cadena honesta ante un ataque del 51 % realizado para superar las defensas criptoeconómicas.

## Más información {#further-reading}

- [Prueba de participación PF](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Qué es la prueba de participación](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Qué es la prueba de participación y por qué es importante](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Por qué existe la prueba de participación (noviembre de 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Prueba de participación: cómo aprendí a amar la subjetividad débil](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/) _Vitalik Buterin_
- [Ataque y defensa en la prueba de participación (PoS) de Ethereum](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [Filosofía de diseño de las pruebas de participación](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_
- [Video: Vitalik Buterin explica la prueba de participación a Lex Fridman](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## Temas relacionados {#related-topics}

- [Prueba de trabajo](/developers/docs/consensus-mechanisms/pow/)
- [Prueba de autoridad](/developers/docs/consensus-mechanisms/poa/)
