---
title: Elección secreta de líder
description: Explicación de cómo la elección secreta de líder puede ayudar a proteger a los validadores de ataques
lang: es
summaryPoints:
  - La dirección IP de los proponentes de bloque se puede conocer de antemano, lo que los hace vulnerables a ataques
  - La elección secreta de líder oculta la identidad de los validadores para que no se puedan conocer de antemano
  - Una extensión de esta idea es hacer que la selección de validadores sea aleatoria en cada slot.
---

En el mecanismo de consenso actual basado en [prueba de participación (PoS)](/developers/docs/consensus-mechanisms/pos), la lista de los próximos proponentes de bloque es pública y es posible rastrear sus direcciones IP. Esto significa que los atacantes podrían identificar qué validadores deben proponer un bloque y atacarlos con un ataque de denegación de servicio (DOS) que los deje incapaces de proponer su bloque a tiempo.

Esto podría crear oportunidades para que un atacante obtenga ganancias. Por ejemplo, un proponente de bloque seleccionado para el slot `n+1` podría hacer un ataque DOS al proponente en el slot `n` para que pierda su oportunidad de proponer un bloque. Esto permitiría al proponente de bloque atacante extraer el MEV de ambos slots, o tomar todas las transacciones que deberían haberse dividido en dos bloques y, en su lugar, incluirlas todas en uno, ganando todas las tarifas asociadas. Es probable que esto afecte a los validadores domésticos más que a los validadores institucionales sofisticados, quienes pueden usar métodos más avanzados para protegerse de los ataques DOS, y por lo tanto, podría ser una fuerza centralizadora.

Existen varias soluciones a este problema. Una es la [tecnología de validador distribuido (DVT)](https://github.com/ethereum/distributed-validator-specs), que tiene como objetivo distribuir las diversas tareas relacionadas con la ejecución de un validador en múltiples máquinas, con redundancia, para que sea mucho más difícil para un atacante evitar que se proponga un bloque en un slot en particular. Sin embargo, la solución más robusta es la **elección de un único líder secreto (SSLE)**.

## Elección de un único líder secreto {#secret-leader-election}

En SSLE, se utiliza criptografía inteligente para garantizar que solo el validador seleccionado sepa que ha sido seleccionado. Esto funciona haciendo que cada validador envíe un compromiso a un secreto que todos comparten. Los compromisos se mezclan y reconfiguran para que nadie pueda asignar compromisos a validadores, pero cada validador sabe qué compromiso le pertenece. Luego, se elige un compromiso al azar. Si un validador detecta que se eligió su compromiso, sabe que es su turno de proponer un bloque.

La implementación principal de esta idea se llama [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763). Funciona de la siguiente manera:

1. Los validadores se comprometen a un secreto compartido. El esquema de compromiso está diseñado de tal manera que puede vincularse a la identidad de un validador, pero también aleatorizarse para que ningún tercero pueda aplicar ingeniería inversa a la vinculación y relacionar un compromiso específico con un validador específico.
2. Al comienzo de una época, se elige un conjunto aleatorio de validadores para muestrear compromisos de 16.384 validadores, utilizando RANDAO.
3. Durante los siguientes 8182 slots (1 día), los proponentes de bloque mezclan y aleatorizan un subconjunto de los compromisos utilizando su propia entropía privada.
4. Una vez finalizada la mezcla, se utiliza RANDAO para crear una lista ordenada de los compromisos. Esta lista se asigna a los slots de Ethereum.
5. Los validadores ven que su compromiso está adjunto a un slot específico, y cuando llega ese slot, proponen un bloque.
6. Se repiten estos pasos para que la asignación de compromisos a los slots esté siempre muy por delante del slot actual.

Esto evita que los atacantes sepan de antemano qué validador específico propondrá el siguiente bloque, lo que impide la capacidad de realizar ataques DOS.

## Elección secreta de líder no único (SnSLE) {#secret-non-single-leader-election}

También existe una propuesta separada que tiene como objetivo crear un escenario en el que cada uno de los validadores tenga una probabilidad aleatoria de proponer un bloque en cada slot, de manera similar a cómo se decidía la propuesta de bloque bajo la prueba de trabajo (PoW), conocida como **elección secreta de líder no único (SnSLE)**. Una forma sencilla de hacer esto es utilizar la función RANDAO que se usa para seleccionar validadores aleatoriamente en el protocolo actual. La idea con RANDAO es que se genera un número suficientemente aleatorio mezclando hashes enviados por muchos validadores independientes. En SnSLE, estos hashes podrían usarse para elegir al siguiente proponente de bloque, por ejemplo, eligiendo el hash de menor valor. El rango de hashes válidos podría restringirse para ajustar la probabilidad de que se seleccionen validadores individuales en cada slot. Al afirmar que el hash debe ser menor que `2^256 * 5 / N` donde `N` = número de validadores activos, la probabilidad de que cualquier validador individual sea seleccionado en cada slot sería `5/N`. En este ejemplo, habría un 99,3 % de probabilidad de que al menos un proponente genere un hash válido en cada slot.

## Progreso actual {#current-progress}

Tanto SSLE como SnSLE se encuentran en fase de investigación. Todavía no hay una especificación finalizada para ninguna de las dos ideas. SSLE y SnSLE son propuestas en competencia que no podrían implementarse ambas. Antes de su lanzamiento, necesitan más investigación y desarrollo, creación de prototipos e implementación en redes de prueba públicas.

## Más información {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)