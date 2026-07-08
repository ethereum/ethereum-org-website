---
title: "Recompensas y penalizaciones de la prueba de participación"
description: "Aprenda sobre los incentivos dentro del protocolo en la prueba de participación de Ethereum."
lang: es
---

[Ethereum](/) está protegido mediante su criptomoneda nativa, el ether (ETH). Los operadores de nodos que deseen participar en la validación de bloques y en la identificación de la cabeza de la cadena, depositan ether en el [contrato de depósito](/staking/deposit-contract/) en Ethereum. Luego se les paga en ether por ejecutar el software del validador que comprueba la validez de los nuevos bloques recibidos a través de la red entre pares y aplica el algoritmo de elección de bifurcación para identificar la cabeza de la cadena.

Hay dos roles principales para un validador: 1) comprobar nuevos bloques y "atestiguar" sobre ellos si son válidos, 2) proponer nuevos bloques cuando se le selecciona al azar del grupo total de validadores. Si el validador no realiza ninguna de estas tareas cuando se le solicita, pierde un pago en ether. A los validadores también se les asigna a veces la tarea de agregación de firmas y la participación en comités de sincronización.

También hay algunas acciones que son muy difíciles de hacer accidentalmente y que denotan alguna intención maliciosa, como proponer múltiples bloques para el mismo slot o realizar atestaciones para múltiples bloques en el mismo slot. Estos son comportamientos "susceptibles de recorte" que dan como resultado que al validador se le queme cierta cantidad de ether (hasta 1 ETH) antes de que el validador sea eliminado de la red, lo cual toma 36 días. El ether del validador recortado se drena lentamente a lo largo del período de salida, pero en el día 18 recibe una "penalización por correlación" que es mayor cuando se recorta a más validadores casi al mismo tiempo. Por lo tanto, la estructura de incentivos del mecanismo de consenso paga por la honestidad y castiga a los malos actores.

Todas las recompensas y penalizaciones se aplican una vez por época.

Siga leyendo para obtener más detalles...

## Recompensas y penalizaciones {#rewards}

### Recompensas {#rewards-2}

Los validadores reciben recompensas cuando emiten votos que son consistentes con la mayoría de los demás validadores, cuando proponen bloques y cuando participan en comités de sincronización. El valor de las recompensas en cada época se calcula a partir de una `base_reward`. Esta es la unidad base a partir de la cual se calculan otras recompensas. La `base_reward` representa la recompensa promedio recibida por un validador en condiciones óptimas por época. Esto se calcula a partir del saldo efectivo del validador y el número total de validadores activos de la siguiente manera:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

donde `base_reward_factor` es 64, `base_rewards_per_epoch` es 4 y `sum(active balance)` es el total de ether en staking en todos los validadores activos.

Esto significa que la recompensa base es proporcional al saldo efectivo del validador e inversamente proporcional al número de validadores en la red. Cuantos más validadores haya, mayor será la emisión general (ya que `sqrt(N)`), pero menor será la `base_reward` por validador (ya que `1/sqrt(N)`). Estos factores influyen en el APR de un nodo de staking. Lea la justificación de esto en las [notas de Vitalik](https://notes.ethereum.org/@vbuterin/serenity_design_rationale?type=view#Base-rewards).

La recompensa total se calcula entonces como la suma de cinco componentes que tienen cada uno una ponderación que determina cuánto añade cada componente a la recompensa total. Los componentes son:

```
1. voto de origen: el validador ha emitido un voto oportuno para el punto de control de origen correcto
2. voto de destino: el validador ha emitido un voto oportuno para el punto de control de destino correcto
3. voto de cabeza: el validador ha emitido un voto oportuno para el bloque de cabeza correcto
4. recompensa del comité de sincronización: el validador ha participado en un comité de sincronización
5. recompensa del proponente: el validador ha propuesto un bloque en el slot correcto
```

Las ponderaciones para cada componente son las siguientes:

```
TIMELY_SOURCE_WEIGHT	uint64(14)
TIMELY_TARGET_WEIGHT	uint64(26)
TIMELY_HEAD_WEIGHT	uint64(14)
SYNC_REWARD_WEIGHT	uint64(2)
PROPOSER_WEIGHT	uint64(8)
```

Estas ponderaciones suman 64. La recompensa se calcula como la suma de las ponderaciones aplicables dividida por 64. Un validador que haya emitido votos oportunos de origen, destino y cabeza, haya propuesto un bloque y haya participado en un comité de sincronización podría recibir `64/64 * base_reward == base_reward`. Sin embargo, un validador no suele ser un proponente de bloque, por lo que su recompensa máxima es `64-8 /64 * base_reward == 7/8 * base_reward`. Los validadores que no son proponentes de bloques ni están en un comité de sincronización pueden recibir `64-8-2 / 64 * base_reward == 6.75/8 * base_reward`.

Se añade una recompensa adicional para incentivar las atestaciones rápidas. Esta es la `inclusion_delay_reward`. Esta tiene un valor igual a la `base_reward` multiplicada por `1/delay` donde `delay` es el número de slots que separan la propuesta de bloque y la atestación. Por ejemplo, si la atestación se envía dentro de un slot de la propuesta de bloque, el atestador recibe `base_reward * 1/1 == base_reward`. Si la atestación llega en el siguiente slot, el atestador recibe `base_reward * 1/2` y así sucesivamente.

Los proponentes de bloques reciben `8 / 64 * base_reward` por **cada atestación válida** incluida en el bloque, por lo que el valor real de la recompensa aumenta proporcionalmente con el número de validadores que atestiguan. Los proponentes de bloques también pueden aumentar su recompensa al incluir evidencia de mal comportamiento por parte de otros validadores en su bloque propuesto. Estas recompensas son las "zanahorias" que fomentan la honestidad del validador. Un proponente de bloque que incluya un recorte será recompensado con la `slashed_validators_effective_balance / 512`.

### Penalizaciones {#penalties}

Hasta ahora hemos considerado validadores con un comportamiento perfecto, pero ¿qué pasa con los validadores que no emiten votos oportunos de cabeza, origen y destino o lo hacen lentamente?

Las penalizaciones por omitir los votos de destino y origen son iguales a las recompensas que el atestador habría recibido si los hubiera enviado. Esto significa que en lugar de que se añada la recompensa a su saldo, se les resta un valor igual de su saldo. No hay penalización por omitir el voto de cabeza (es decir, los votos de cabeza solo se recompensan, nunca se penalizan). No hay ninguna penalización asociada con la `inclusion_delay`: la recompensa simplemente no se añadirá al saldo del validador. Tampoco hay penalización por no proponer un bloque.

Lea más sobre recompensas y penalizaciones en las [especificaciones de consenso](https://github.com/ethereum/consensus-specs/blob/master/specs/altair/beacon-chain.md). Las recompensas y penalizaciones se ajustaron en la actualización Bellatrix; vea a Danny Ryan y Vitalik discutir esto en este [video de Peep an EIP](https://www.youtube.com/watch?v=iaAEGs1DMgQ).

## Recorte {#slashing}

El recorte es una acción más severa que da como resultado la eliminación forzosa de un validador de la red y una pérdida asociada de su ether en staking. Hay tres formas en las que un validador puede ser recortado, todas las cuales equivalen a la propuesta o atestación deshonesta de bloques:

- Al proponer y firmar dos bloques diferentes para el mismo slot
- Al realizar una atestación para un bloque que "rodea" a otro (cambiando efectivamente el historial)
- Al "votar doble" realizando una atestación para dos candidatos para el mismo bloque

Si se detectan estas acciones, el validador es recortado. Esto significa que se queman inmediatamente 0.0078125 para un validador de 32 ETH (escalado linealmente con el saldo activo), luego comienza un período de eliminación de 36 días. Durante este período de eliminación, la participación del validador se desangra gradualmente. En el punto medio (día 18) se aplica una penalización adicional cuya magnitud aumenta proporcionalmente con el ether total en staking de todos los validadores recortados en los 36 días anteriores al evento de recorte. Esto significa que cuando se recorta a más validadores, la magnitud del recorte aumenta. El recorte máximo es el saldo efectivo completo de todos los validadores recortados (es decir, si hay muchos validadores siendo recortados, podrían perder toda su participación). Por otro lado, un evento de recorte único y aislado solo quema una pequeña porción de la participación del validador. Esta penalización de punto medio que aumenta proporcionalmente con el número de validadores recortados se llama "penalización por correlación".

## Fuga por inactividad {#inactivity-leak}

Si la capa de consenso ha pasado más de cuatro épocas sin finalizar, se activa un protocolo de emergencia llamado "fuga por inactividad". El objetivo final de la fuga por inactividad es crear las condiciones necesarias para que la cadena recupere la finalidad. Como se explicó anteriormente, la finalidad requiere una mayoría de 2/3 del ether total en staking para acordar los puntos de control de origen y destino. Si los validadores que representan más de 1/3 del total de validadores se desconectan o no envían atestaciones correctas, entonces no es posible que una supermayoría de 2/3 finalice los puntos de control. La fuga por inactividad permite que la participación perteneciente a los validadores inactivos se desangre gradualmente hasta que controlen menos de 1/3 de la participación total, lo que permite a los validadores activos restantes finalizar la cadena. Por muy grande que sea el grupo de validadores inactivos, los validadores activos restantes eventualmente controlarán >2/3 de la participación. ¡La pérdida de participación es un fuerte incentivo para que los validadores inactivos se reactiven lo antes posible! Se encontró un escenario de fuga por inactividad en la red de prueba Medalla cuando < 66% de los validadores activos pudieron llegar a un consenso sobre la cabeza actual de la cadena de bloques. ¡Se activó la fuga por inactividad y finalmente se recuperó la finalidad!

El diseño de recompensas, penalizaciones y recortes del mecanismo de consenso anima a los validadores individuales a comportarse correctamente. Sin embargo, de estas opciones de diseño surge un sistema que incentiva fuertemente la distribución equitativa de validadores en múltiples clientes, y debería desincentivar fuertemente el dominio de un solo cliente.

## Lecturas adicionales {#further-reading}

- [Actualización de Ethereum: La capa de incentivos](https://eth2book.info/altair/part2/incentives)
- [Incentivos en el protocolo híbrido Casper de Ethereum](https://arxiv.org/pdf/1903.04205.pdf)
- [Especificación anotada de Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Consejos para la prevención de recortes en Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)
- [Análisis de las penalizaciones por recorte bajo la EIP-7251](https://ethresear.ch/t/slashing-penalty-analysis-eip-7251/16509)

_Fuentes_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_