---
title: Recompensas y penalizaciones de la prueba de participación
description: Descubra más detalles sobre los incentivos en el protocolo en la prueba de participación de Ethereum.
lang: es
---

Ethereum está protegido gracias al uso de su criptomoneda nativa, el ether (ETH). Los operadores de nodos que deseen participar en la validación de los bloques e identificar al jefe de la cadena depositan ether en el [contrato de depósito](/staking/deposit-contract/) en Ethereum. Luego se les paga en ether para ejecutar un software de validación que compruebe la validez de los nuevos bloques recibidos a través de la red entre pares y aplicar el algoritmo de elección de bifurcación para identificar la cabeza de la cadena.

Hay dos funciones principales para un validador: 1) comprobar los nuevos bloques y «certificar» si son válidos, 2) proponer nuevos bloques cuando se seleccionan al azar del grupo total de validadores. Si el validador no realiza ninguna de estas tareas cuando se le pide, pierde un pago de ether. A veces, los validadores también tienen la tarea de agregar firmas y participar en comités de sincronización.

Hay algunas acciones que son muy difíciles de acometer accidentalmente y indican alguna intención maliciosa, como proponer múltiples bloques para la misma ranura o certificar múltiples bloques para la misma ranura. Se trata de comportamientos «recortables» que hacen que el validador tenga cierta cantidad de ether (hasta 1 ETH) quemado antes de que el validador se elimine de la red, lo que lleva 36 días. El ether del validador recortado se drena lentamente a lo largo del período de salida, pero en el 18.º día recibe una «penalización de correlación» que es mayor cuantos más validadores se recortan aproximadamente al mismo tiempo. Por lo tanto, la estructura de incentivos del mecanismo de consenso paga por la honestidad y castiga las malas conductas.

Todas las recompensas y penalizaciones se aplican una vez por época.

Siga leyendo si desea ahondar más al respecto...

## Penalizaciones y recompensas {#rewards}

### Recompensas {#rewards}

Los validadores reciben recompensas cuando hacen votos que son consistentes con la mayoría de otros validadores, cuando proponen bloques y cuando participan en comités de sincronización. El valor de las recompensas en cada época se calcula a partir de una `base_reward`. Esta es la unidad de base a partir de la cual se calculan otras recompensas. La `base_reward` representa la recompensa media recibida por un validador en condiciones óptimas por época. Esto se calcula a partir del saldo efectivo del validador y el número total de validadores activos de la siguiente manera:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

donde `base_reward_factor` es 64, `base_rewards_per_epoch` es 4 y `suma (balance activo)` es el ether total en participación en todos los validadores activos.

Esto significa que la recompensa de base es proporcional al saldo efectivo del validador e inversamente proporcional al número de validadores en la red. Cuantos más validadores, mayor es la emisión general (como `sqrt(N)`, pero cuanto menor es la `base_reward` por validador (como `1/sqrt(N)`). Estos factores influyen en la APR de un nodo de participación. Lea la argumentación de esto en [Notas de Vitalik](https://notes.ethereum.org/@vbuterin/rkhCgQteN?type=view#Base-rewards).

La recompensa total se calcula entonces como la suma de cinco componentes, cada uno de los cuales tiene una ponderación que determina cuánto suma cada componente a la recompensa total. Los componentes son:

```
1. source vote: the validator has made a timely vote for the correct source checkpoint
2. target vote: the validator has made a timely vote for the correct target checkpoint
3. head vote: the validator has made a timely vote for the correct head block
4. sync committee reward: the validator has participated in a sync committee
5. proposer reward: the validator has proposed a block in the correct slot
```

Las ponderaciones para cada componente son las siguientes:

```
TIMELY_SOURCE_WEIGHT    uint64(14)
TIMELY_TARGET_WEIGHT    uint64(26)
TIMELY_HEAD_WEIGHT  uint64(14)
SYNC_REWARD_WEIGHT  uint64(2)
PROPOSER_WEIGHT uint64(8)
```

Estos pesos suman 64. La recompensa se calcula como la suma de los pesos aplicables divididos entre 64. Un validador que haya hecho votos oportunos de fuente, destino y cabeza, propuesto un bloqueo y participado en un comité de sincronización podría recibir `64/64 * base_reward == base_reward`. Sin embargo, un validador no suele ser un proponente de bloques, por lo que su recompensa máxima es `64-8 /64 * base_reward == 7/8 * base_reward`. Los validadores que no son proponentes de bloques ni están en un comité de sincronización pueden recibir `64-8-2 / 64 * base_reward == 6.75/8 * base_reward`.

Se añade una recompensa adicional para incentivar las certificaciones rápidas. Es el `inclusion_delay_reward`. Tiene un valor igual al `base_reward` multiplicado por `1/retraso` donde `retraso` es el número de ranuras que separan la propuesta de bloque y la certificación. Por ejemplo, si la certificación se presenta dentro de una ranura de la propuesta de bloque, el certificador recibe `base_reward * 1/1 == base_reward`. Si la certificación llega en la siguiente ranura, el certificador recibe`base_reward * 1/2`y así sucesivamente.

Los proponentes de bloques reciben `8 / 64 * base_reward` por **cada certificación válida** incluida en el bloque, por lo que el valor real de la recompensa se escala con el número de validadores de certificación. Los proponentes de bloques también pueden aumentar su recompensa al incluir evidencia de mal comportamiento por parte de otros validadores en su bloque propuesto. Estas recompensas son los alicientes que fomentan la honestidad del validador. Un proponente de bloques que incluya la reducción será recompensado con `slashed_validators_effective_balance / 512`.

### Penalizaciones {#penalties}

Hasta ahora hemos considerado validadores con un comportamiento ejemplar, pero ¿qué pasa con los validadores que no hacen votos portunamente de cabeza, fuente y destino, o se toman demasiado tiempo en hacerlos?

Las penalizaciones por no alcanzar el objetivo y los votos de la fuente son iguales a las recompensas que el certificador habría recibido si las hubiera presentado. Esto significa que en lugar de tener la recompensa añadida a su saldo, tienen un valor igual eliminado de su saldo. No hay penalización por perder el voto de la cabeza (es decir, los votos de la cabeza solo son recompensados, nunca penalizados). No hay ninguna penalización asociada con el `inclusion_delay`: la recompensa simplemente no se añadirá al saldo del validador. Tampoco hay penalización por fallar en proponer un bloque.

Lea más sobre recompensas y penalizaciones en las [especificaciones de consenso](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/beacon-chain.md). Las recompensas y las penalizaciones se ajustaron en la actualización de Bellatrix, vea a Danny Ryan y Vitalik comentarlo en este [vídeo Eche un vistazo a una propuesta de mejora de Ethereum](https://www.youtube.com/watch?v=iaAEGs1DMgQ).

## Recortes {#slashing}

Los recortes son una acción más grave que resulta en la eliminación forzada de un validador de la red y una pérdida asociada de su ether apostado. Hay tres formas en las que se puede recortar un validador, todas ellas equivalen a la propuesta deshonesta o la certificación de bloques:

- Proponer y firmar dos bloques diferentes para el mismo espacio.
- Certificar un bloque que «rodea» a otro (cambiando completamente la historia).
- Por «doble votación» al certificar a dos candidatos para el mismo bloque.

Si se detectan estas acciones, el validador se recorta. Esto significa que 1/32 de su ether apostado (hasta un máximo de 1 ether) se quema inmediatamente, luego comienza un período de eliminación de 36 días. Durante este período de eliminación, la participación del validador se desvanece gradualmente. En el punto medio (18.º día) se aplica una penalización adicional cuya magnitud se prorratea con el ether total en participación de todos los validadores recortados en los 36 días anteriores al evento de recorte. Esto significa que cuando se recortan más validadores, la magnitud del recorte aumenta. El recorte máximo es el balance efectivo completo de todos los validadores recortados (es decir, si hay muchos validadores que se recortan, podrían perder toda su participación). Por otro lado, un solo evento de recorte aislado solo quema una pequeña parte de la participación del validador. Esta penalización de punto medio que se prorratea con el número de validadores recortados se llama «pena de correlación».

## Pérdida por inactividad {#inactivity-leak}

Si la capa de consenso ha pasado más de cuatro épocas sin finalizar, se activa un protocolo de emergencia llamado «pérdida por inactividad». El objetivo final de la pérdida por inactividad es crear las condiciones necesarias para que la cadena recupere la finalidad. Como se explicó anteriormente, la finalidad requiere una mayoría de 2/3 del ether en participación para acordar los puntos de control de origen y destino. Si los validadores que representan más de 1/3 del total de validadores se desconectan o no envían las certificaciones correctas, entonces no es posible que una supermayoría de 2/3 finalice los puntos de control. La pérdida por inactividad permite que la participación relativa a los validadores inactivos se desvanezca gradualmente hasta que controlen menos de 1/3 de la participación total, lo que permite que los validadores activos restantes finalicen la cadena. Por grande que sea el grupo de validadores inactivos, los validadores activos restantes eventualmente controlarán >2/3 de la participación. ¡La pérdida de participación es un fuerte incentivo para que los validadores inactivos se reactiven lo antes posible! Se encontró un caso de pérdida por inactividad en la red de pruebas de Medalla, cuando < 66 % de los validadores activos pudieron llegar a un consenso sobre la cabeza actual de la cadena de bloques. ¡La pérdida por inactividad se activó y finalmente se recuperó la finalidad!

El diseño de recompensa, penalización y recorte del mecanismo de consenso anima a los validadores individuales a comportarse correctamente. No obstante, de estas opciones de diseño surge un sistema que incentiva poderosamente la distribución equitativa de validadores entre múltiples clientes, y debería desincentivar con ahínco el dominio de un solo cliente.

## Leer más {#further-reading}

- [Actualización de Ethereum: la capa de incentivos](https://eth2book.info/altair/part2/incentives)
- [Incentivos en el protocolo híbrido Casper de Ethereum](https://arxiv.org/pdf/1903.04205.pdf)
- [Especificaciones anotadas de Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Consejos para la prevención de recortes en Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)

_Fuentes_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_
