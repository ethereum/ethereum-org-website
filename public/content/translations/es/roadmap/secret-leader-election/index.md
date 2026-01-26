---
title: "Elección secreta del líder"
description: "Explicación de cómo la elección secreta de líder puede ayudar a proteger a los validadores contra ataques."
lang: es
summaryPoints:
  - La dirección IP de los proponentes del bloque se puede conocer de antemano, lo que los hace vulnerables a ataques.
  - "La elección secreta del líder oculta la identidad de los validadores para que no se puedan conocer de antemano. "
  - Una extensión de esta idea es hacer que la selección del validador sea aleatoria en cada ranura.
---

# Elección de líder secreta {#single-secret-leader-election}

En el actual mecanismo de consenso basado en la [prueba de participación](/developers/docs/consensus-mechanisms/pos), la lista de los próximos proponentes de bloque es pública y es posible mapear sus direcciones IP. Esto significa que los atacantes podrían identificar qué validadores deben proponer un bloque y perjudicarles con un ataque de negación de servicio (DOS) que les imposibilite proponer su bloque a tiempo.

Esto podría crear oportunidades para que un atacante se beneficie. Por ejemplo, un proponente de bloque seleccionado para la ranura `n+1` podría realizar un ataque de denegación de servicio (DoS) al proponente de la ranura `n` para que este pierda la oportunidad de proponer un bloque. Esto permitiría al proponente de bloque atacante extraer el MEV de ambas ranuras; o reunir todas las transacciones que se deberían dividido en dos bloques y en lugar de eso incluirlas todas en una, ahorrándose las tarifas asociadas. Es probable que esto afecte más a los validadores domésticos que a los validadores institucionales sofisticados que pueden usar métodos más avanzados para protegerse de ataques DOS y podría entonces ser una fuerza centralizadora.

Hay varias soluciones para este problema. Una es la [tecnología de validador distribuido](https://github.com/ethereum/distributed-validator-specs), que tiene como objetivo repartir las diversas tareas relacionadas con la ejecución de un validador en varias máquinas, con redundancia, para que a un atacante le resulte mucho más difícil impedir que se proponga un bloque en una ranura concreta. Sin embargo, la solución más robusta es la **elección de líder única y secreta (SSLE)**.

## Elección de líder única y secreta {#secret-leader-election}

En SSLE, la criptografía inteligente se usa para asegurar que solo el validador seleccionado sepa que ha sido seleccionado. Esto funciona al hacer que cada validador envíe un compromiso a un secreto que todos comparten. Los compromisos se mezclan y reconfiguran para que nadie pueda asociar los compromisos a los validadores, aunque cada validador sabe qué compromiso le pertenece. Después, se elige un compromiso aleatoriamente. Si un validador detecta que se ha elegido su compromiso, saben que es su turno de proponer un bloque.

La principal implementación de esta idea se llama [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763). Que trabaja de la siguiente forma:

1. Los validadores se comprometen a un secreto compartido. El esquema de compromiso está diseñado para que pueda enlazarse a la identidad de un validador, aunque también es aleatorio para que ningún tercero pueda hacer una ingeniería inversa de los enlaces y asociar un compromiso específico con un validador específico.
2. Al principio de una época, se elige un conjunto aleatorio de validadores para enviar muestras de compromisos de 16.384 validadores, usando RANDAO.
3. Para las siguientes 8.182 ranuras (1 día), los proponentes de bloques mezclan y aleatorizan un subconjunto de los compromisos usando su propia entropía privada.
4. Una vez mezclados, se utiliza RANDAO para crear una lista ordenada de los compromisos. Esta lista se asocia a las ranuras de Ethereum.
5. Los validadores ven que su compromiso está asociado a una ranura específica, y cuando las ranuras llegan pueden proponer un bloque.
6. Repita estos pasos para que la asignación de compromisos a ranuras esté siempre por delante de la ranura actual.

Esto le impide a los atacantes saber de antemano qué validador específico propondrá el siguiente bloque, lo que inhabilita los ataques DOS.

## Elección de líder secreta no única (SnSLE) {#secret-non-single-leader-election}

También existe una propuesta independiente que pretende crear un escenario en el que cada validador tenga una probabilidad aleatoria de proponer un bloque en cada ranura, de forma similar a como se decidía la propuesta de bloque en la prueba de trabajo, lo que se conoce como **elección de líder secreta no única (SnSLE)**. Una forma sencilla de hacer esto es usando la función RANDAO para seleccionar validadores de manera aleatoria en el protocolo del día. La idea con RANDAO es que se genere un número suficientemente aleatorio al mezclar pedazos enviados por múltiples validadores independientes. En SnSLE, estos pedazos pueden usarse para elegir el siguiente proponente de bloque, por ejemplo al elegir el pedazo de menor valor. El margen de pedazos válidos puede limitarse para ajustar la probabilidad de selección de validadores independientes en cada ranura. Al afirmar que el hash debe ser inferior a `2^256 * 5 / N`, donde `N` = número de validadores activos, la probabilidad de que se seleccione un validador individual en cada ranura sería de `5/N`. En este ejemplo, habría solo un 99,3 % de probabilidad de que al menos un proponente generara un pedazo válido en cada ranura.

## Progreso actual {#current-progress}

Tanto SSLE como SnSLE están en fase de investigación. Todavía no hay especificación lista para ninguna de las dos. SSLE y SnSLE son propuestas que compiten entre sí, ya que no pueden implementarse juntas. Necesitan una investigación y un desarrollo más en profundidad antes de lanzarse, así como la creación de prototipos e implementación en las redes de prueba pública.

## Lecturas adicionales {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)
