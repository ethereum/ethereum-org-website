---
title: Prueba de contratos inteligentes
description: Descripción general de las técnicas y consideraciones para probar contratos inteligentes de Ethereum.
lang: es
---

Las cadenas de bloques públicas como Ethereum son inmutables, lo que dificulta cambiar el código de un contrato inteligente después de su implementación. Existen [patrones de actualización de contratos](/developers/docs/smart-contracts/upgrading/) para realizar "actualizaciones virtuales", pero son difíciles de implementar y requieren consenso social. Además, una actualización solo puede corregir un error _después_ de que se descubre: si un atacante descubre la vulnerabilidad primero, su contrato inteligente corre el riesgo de sufrir una explotación.

Por estas razones, probar los contratos inteligentes antes de [desplegarlos](/developers/docs/smart-contracts/deploying/) en la Red principal es un requisito mínimo para la [seguridad](/developers/docs/smart-contracts/security/). Hay muchas técnicas para probar contratos y evaluar que el código sea correcto; lo que elija depende de sus necesidades. Sin embargo, un paquete de pruebas compuesto por diferentes herramientas y enfoques es ideal para detectar fallas de seguridad mayores y menores en el código de un contrato.

## Requisitos previos {#prerequisites}

Esta página explica cómo probar contratos inteligentes antes de implementarlos en la red Ethereum. Se asume que está familiarizado con los [contratos inteligentes](/developers/docs/smart-contracts/).

## ¿Qué son las pruebas de contratos inteligentes? ¿Qué son las pruebas de contratos inteligentes? {#what-is-smart-contract-testing}

La prueba o evaluación de contratos inteligentes es el proceso de verificar que el código de un contrato inteligente funcione como se espera. Las pruebas son útiles para comprobar si un contrato inteligente en particular cumple con los requisitos de confiabilidad, usabilidad y seguridad.

Aunque los enfoques varían, la mayoría de los métodos de prueba requieren la ejecución de un contrato inteligente con una pequeña muestra de los datos que se espera que maneje. Si el contrato produce resultados correctos para los datos de muestra, se supone que funciona correctamente. La mayoría de las herramientas de prueba proporcionan recursos para escribir y ejecutar [casos de prueba](https://en.m.wikipedia.org/wiki/Test_case) para comprobar si la ejecución de un contrato coincide con los resultados esperados.

### ¿Por qué es importante probar contratos inteligentes? Importancia de las pruebas de contratos inteligentes {#importance-of-testing-smart-contracts}

Como los contratos inteligentes a menudo gestionan activos financieros de alto valor, los errores de programación menores pueden ocasionar, y a menudo lo hacen, [pérdidas masivas para los usuarios](https://rekt.news/leaderboard/). No obstante, las pruebas rigurosas pueden ayudarle a descubrir defectos y problemas en el código de un contrato inteligente de forma temprana y solucionarlos antes de lanzarlos en la red principal.

Aunque es posible actualizar un contrato si se descubre un error, las actualizaciones son complejas y pueden [provocar errores](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) si se manejan incorrectamente. Actualizar un contrato invalida aún más el principio de inmutabilidad y carga a los usuarios con supuestos de confianza adicionales. Por el contrario, un plan integral para probar su contrato mitiga los riesgos de seguridad de los contratos inteligentes y reduce la necesidad de realizar actualizaciones complejas en la lógica después de su implementación.

## Métodos para probar contratos inteligentes {#methods-for-testing-smart-contracts}

Los métodos para probar los contratos inteligentes de Ethereum se dividen en dos grandes categorías: **pruebas automatizadas** y **pruebas manuales**. Las pruebas automáticas y las pruebas manuales ofrecen beneficios y compensaciones únicos, pero usted puede combinar ambas para crear un plan sólido para analizar sus contratos.

### Pruebas automatizadas {#automated-testing}

Las pruebas automatizadas utilizan herramientas que comprueban automáticamente el código de un contrato inteligente para detectar errores en la ejecución. El beneficio de las pruebas automatizadas proviene del uso de [scripts](https://www.techtarget.com/whatis/definition/script?amp=1) para guiar la evaluación de las funcionalidades del contrato. Las pruebas con scripts pueden programarse para ejecutarse repetidamente con intervención humana mínima, lo que hace que sean más eficientes que los métodos manuales de prueba.

Las pruebas automatizadas son particularmente útiles cuando las pruebas son repetitivas y consumen mucho tiempo, son difíciles de llevar a cabo manualmente, son susceptibles a errores humanos o implican la evaluación de funciones contractuales críticas. Pero las herramientas de pruebas automatizadas pueden tener inconvenientes: pueden pasar por alto ciertos errores y producir muchos [falsos positivos](https://www.contrastsecurity.com/glossary/false-positive). Por lo tanto, combinar las pruebas automatizadas con pruebas manuales para contratos inteligentes es el enfoque ideal.

### Pruebas manuales {#manual-testing}

Las pruebas manuales son asistidas por las personas e implican ejecutar cada caso de prueba en su paquete de herramientas de prueba uno tras otro al analizar la corrección de un contrato inteligente. Esto se diferencia de las pruebas automatizadas, donde usted puede ejecutar varias pruebas aisladas simultáneamente en un contrato y obtener un informe que muestre todas las pruebas fallidas y aprobadas.

Las pruebas manuales pueden ser llevadas a cabo por un solo individuo siguiendo un plan de prueba escrito que cubra diferentes escenarios de prueba. También puede hacer que múltiples individuos o grupos interactúen con un contrato inteligente durante un período especificado como parte de la prueba manual. Los verificadores compararán el comportamiento real del contrato contra el comportamiento esperado, marcando cualquier diferencia como bug o error.

Las pruebas manuales efectivas requieren recursos considerables (habilidad, tiempo, dinero y esfuerzo), y es posible –debido al error humano– perder ciertos errores mientras se ejecutan las verificaciones. Pero las pruebas manuales también pueden ser beneficiosas, por ejemplo, un verificador humano (p. ej., un auditor) puede utilizar la intuición para detectar casos extremos que una herramienta de pruebas automatizadas pasaría por alto.

## Pruebas automatizadas de contratos inteligentes {#automated-testing-for-smart-contracts}

### Pruebas unitarias {#unit-testing-for-smart-contracts}

Las pruebas unitarias evalúan las funciones del contrato por separado y comprueban que cada componente funcione correctamente. Las pruebas unitarias bien hechas deben ser sencillas, rápidas de ejecutar y proporcionar una idea clara de lo que salió mal si fallan.

Las pruebas unitarias son útiles para comprobar que las funciones devuelvan valores esperados y que el almacenamiento del contrato se actualice correctamente después de la ejecución de la función. Además, ejecutar pruebas unitarias después de hacer cambios en la base de código de los contratos asegura que añadir una nueva lógica no introduzca errores. A continuación hay algunas pautas para ejecutar pruebas unitarias eficaces:

#### Directrices para las pruebas unitarias de contratos inteligentes {#unit-testing-guidelines}

##### 1. Comprender la lógica de negocio y el flujo de trabajo de sus contratos

Antes de escribir pruebas unitarias, debe saber qué funcionalidades ofrece un contrato inteligente y cómo los usuarios accederán y utilizarán esas funciones. Esto es particularmente útil para ejecutar [pruebas de ruta feliz](https://en.m.wikipedia.org/wiki/Happy_path) que determinan si las funciones en un contrato devuelven el resultado correcto para entradas de usuario válidas. Explicaremos este concepto utilizando este ejemplo (abreviado) de [un contrato de subasta](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)

```solidity
constructor(
        uint biddingTime,
        address payable beneficiaryAddress
    ) {
        beneficiary = beneficiaryAddress;
        auctionEndTime = block.timestamp + biddingTime;
    }

function bid() external payable {

      if (block.timestamp > auctionEndTime)
            revert AuctionAlreadyEnded();

      if (msg.value <= highestBid)
            revert BidNotHighEnough(highestBid);

 if (highestBid != 0) {
    pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

 function withdraw() external returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
           pendingReturns[msg.sender] = 0;

        if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

function auctionEnd() external {
       if (block.timestamp < auctionEndTime)
            revert AuctionNotYetEnded();
        if (ended)
            revert AuctionEndAlreadyCalled();

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        beneficiary.transfer(highestBid);
    }
}
```

Se trata de un simple contrato de subasta diseñado para recibir ofertas durante el periodo de oferta. Si la `highestBid` (la puja más alta) aumenta, el pujador anterior más alto recibe su dinero; una vez que el período de pujas ha terminado, el `beneficiary` (beneficiario) llama al contrato para obtener su dinero.

Pruebas unitarias para un contrato como este cubrirían diferentes funciones que un usuario podría invocar al interactuar con el contrato. Un ejemplo sería una prueba unitaria que comprueba si un usuario puede pujar mientras la subasta está en curso (es decir, las llamadas a `bid()` tienen éxito) o una que comprueba si un usuario puede realizar una puja más alta que la `highestBid` actual.

Entender el flujo de trabajo operacional de un contrato también ayuda a escribir pruebas unitarias que comprueben si la ejecución cumple los requisitos. Por ejemplo, el contrato de subasta especifica que los usuarios no pueden pujar cuando la subasta ha finalizado (es decir, cuando `auctionEndTime` es inferior a `block.timestamp`). Por lo tanto, un desarrollador podría ejecutar una prueba unitaria que compruebe si las llamadas a la función `bid()` tienen éxito o fallan cuando la subasta ha terminado (es decir, cuando `auctionEndTime` > `block.timestamp`).

##### 2. Evaluar todas las suposiciones relacionadas con la ejecución del contrato

Es importante documentar cualquier suposición sobre la ejecución de un contrato y escribir pruebas unitarias para verificar la validez de esos supuestos. Aparte de ofrecer protección contra la ejecución inesperada, probar las afirmaciones lo obligan a pensar en operaciones que podrían romper el modelo de seguridad de un contrato inteligente. Un consejo útil es ir más allá de "pruebas de usuarios felices" y escribir pruebas negativas que comprueben si una función falla para las entradas incorrectas.

Muchos marcos de pruebas unitarias le permiten crear aserciones, que son declaraciones simples que indican lo que un contrato puede o no puede hacer, y ejecutar pruebas para verificar si esas aserciones se cumplen durante la ejecución. Un desarrollador que trabaje en el contrato de subasta descrito anteriormente podría hacer las siguientes afirmaciones sobre su comportamiento antes de ejecutar pruebas negativas:

- Los usuarios no pueden realizar ofertas cuando la subasta haya finalizado o aún no haya comenzado.

- El contrato de subasta se revertirá si una oferta cae por debajo del límite aceptable o del monto mínimo.

- A los usuarios que no logren ganar la oferta se les acreditarán sus fondos

**Nota**: Otra forma de probar suposiciones es escribir pruebas que activen [modificadores de función](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) en un contrato, especialmente las sentencias `require`, `assert` e `if…else`.

##### 3. Medir la cobertura de código

La [cobertura de código](https://en.m.wikipedia.org/wiki/Code_coverage) es una métrica de prueba que realiza un seguimiento del número de bifurcaciones, líneas y sentencias de su código ejecutadas durante las pruebas. Las pruebas deben tener buena cobertura del código para minimizar el riesgo de vulnerabilidades no probadas. Sin contar con la cobertura suficiente podría asumir falsamente que su contrato es seguro, ya que todas las pruebas se aprueban, mientras que aún existen vulnerabilidades en las rutas de código no probadas. Registrar una alta cobertura de código, sin embargo, brinda la garantía de que todas las declaraciones y funciones en un contrato inteligente fueron suficientemente probadas para verificar que son correctas.

##### 4. Utilizar marcos de pruebas bien desarrollados

La calidad de las herramientas utilizadas para ejecutar pruebas unitarias en sus contratos inteligentes es crucial. Un marco de pruebas ideal es aquel que se mantiene regularmente, proporciona funciones útiles (por ejemplo, capacidades de registro e informes) y ha sido ampliamente utilizado y evaluado por otros desarrolladores.

Los marcos de pruebas unitarias para contratos inteligentes de Solidity están disponibles en diferentes lenguajes (principalmente JavaScript, Python y Rust). A continuación, puede encontrar algunas guías para obtener información sobre cómo comenzar a ejecutar pruebas unitarias con diferentes marcos de pruebas:

- **[Ejecución de pruebas unitarias con Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Ejecución de pruebas unitarias con Foundry](https://book.getfoundry.sh/forge/writing-tests)**
- **[Ejecución de pruebas unitarias con Waffle](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Ejecución de pruebas unitarias con Remix](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Ejecución de pruebas unitarias con Ape](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Ejecución de pruebas unitarias con Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Ejecución de pruebas unitarias con Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### Pruebas de integración {#integration-testing-for-smart-contracts}

Mientras que las pruebas unitarias depuran las funciones de un contrato de forma aislada, las pruebas de integración evalúan los componentes de un contrato inteligente en su conjunto. Las pruebas de integración pueden detectar problemas que surjan de llamadas a múltiples contratos o interacciones entre diferentes funciones en un mismo contrato inteligente. Por ejemplo, las pruebas de integración pueden ayudar a comprobar si elementos como la [herencia](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) y la inyección de dependencias funcionan correctamente.

Las pruebas de integración son útiles si su contrato adopta una arquitectura modular o interactúa con otros contratos en cadena durante la ejecución. Una forma de ejecutar pruebas de integración es [bifurcar la cadena de bloques](/glossary/#fork) a una altura específica (utilizando una herramienta como [Forge](https://book.getfoundry.sh/forge/fork-testing) o [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks)) y simular las interacciones entre su contrato y los contratos desplegados.

La cadena de bloques bifurcada se comportará de manera similar a la Red principal y tendrá cuentas con estados y saldos asociados. Pero solo actúa como un entorno de desarrollo local sandbox (aislado), lo que significa que no necesitará ETH real para las transacciones, por ejemplo, ni sus cambios afectarán el protocolo de Ethereum real.

### Pruebas basadas en propiedades {#property-based-testing-for-smart-contracts}

Las pruebas basadas en propiedades son el proceso de verificar que un contrato inteligente satisfaga alguna propiedad definida. Las propiedades aseveran hechos sobre el comportamiento de un contrato que se esperan que sean verdaderos en diferentes escenarios: un ejemplo de una propiedad de contrato inteligente podría ser "Las operaciones aritméticas en el contrato nunca se desbordan o caen por debajo de los valores aceptables".

El **análisis estático** y el **análisis dinámico** son dos técnicas comunes para ejecutar pruebas basadas en propiedades, y ambas pueden verificar que el código de un programa (un contrato inteligente en este caso) satisface alguna propiedad predefinida. Algunas herramientas de pruebas basadas en propiedades vienen con reglas predefinidas sobre las propiedades de contrato esperadas y verifican el código contra esas reglas, mientras que otras le permiten crear propiedades personalizadas para un contrato inteligente.

#### Análisis estático {#static-analysis}

Un analizador estático toma como entrada el código fuente de un contrato inteligente y produce resultados declarando si un contrato satisface una propiedad o no. A diferencia del análisis dinámico, el análisis estático no implica la ejecución de un contrato para analizar si funciona correctmente. En su lugar, razona sobre todas las posibles rutas que un contrato inteligente podría tomar durante la ejecución (es decir, examinando la estructura del código fuente para determinar lo que significaría para la operación de los contratos en tiempo de ejecución).

El [linting](https://www.perforce.com/blog/qac/what-is-linting) y las [pruebas estáticas](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) son métodos comunes para ejecutar análisis estáticos en los contratos. Ambos requieren analizar representaciones de bajo nivel de la ejecución de un contrato, como los [árboles de sintaxis abstracta](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) y los [grafos de flujo de control](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/) que genera el compilador.

En la mayoría de los casos, el análisis estático es útil para detectar problemas de seguridad como el uso de construcciones inseguras, errores de sintaxis o violaciones de los estándares de codificación en el código de contratos. Sin embargo, los analizadores estáticos son conocidos generalmente por ser poco efectivos al detectar vulnerabilidades más profundas, y pueden producir demasiados falsos positivos.

#### Análisis dinámico {#dynamic-analysis}

El análisis dinámico genera entradas simbólicas (p. ej., en la [ejecución simbólica](https://en.m.wikipedia.org/wiki/Symbolic_execution)) o entradas concretas (p. ej., en el [fuzzing](https://owasp.org/www-community/Fuzzing)) para las funciones de un contrato inteligente, para ver si algún rastro de ejecución viola propiedades específicas. Esta forma de pruebas basadas en propiedades difiere de las pruebas unitarias en que los casos de prueba cubren múltiples escenarios y un programa maneja la generación de casos de prueba.

El [fuzzing](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing) es un ejemplo de una técnica de análisis dinámico para verificar propiedades arbitrarias en contratos inteligentes. Un fuzzer invoca funciones en un contrato objetivo con variaciones aleatorias o mal formadas de un valor de entrada definido. Si el contrato inteligente entra en un estado de error (p. ej., donde falle una afirmación), el problema se reporta y las entradas que impulsan la ejecución hacia la ruta vulnerable se producen en un informe.

El fuzzing es útil para evaluar el mecanismo de validación de entrada de un contrato inteligente, ya que un manejo inadecuado de entradas inesperadas podría resultar en una ejecución no intencionada y producir efectos peligrosos. Esta forma de pruebas basadas en propiedades puede ser ideal por varias razones:

1. **Escribir casos de prueba para cubrir muchos escenarios es difícil.** Una prueba de propiedad solo requiere que usted defina un comportamiento y un rango de datos con los que probar el comportamiento; el programa genera automáticamente casos de prueba basados en la propiedad definida.

2. **Es posible que su suite de pruebas no cubra suficientemente todas las rutas posibles dentro del programa.** Incluso con una cobertura del 100 %, es posible que se omitan casos extremos.

3. **Las pruebas unitarias demuestran que un contrato se ejecuta correctamente para los datos de muestra, pero se desconoce si el contrato se ejecuta correctamente para entradas fuera de la muestra.** Las pruebas de propiedades ejecutan un contrato objetivo con múltiples variaciones de un valor de entrada determinado para encontrar rastros de ejecución que causen fallos de aserción. Así, una prueba de propiedad proporciona más garantías de que un contrato se ejecutará correctamente para una amplia clase de datos de entrada.

### Directrices para ejecutar pruebas basadas en propiedades para contratos inteligentes {#running-property-based-tests}

La ejecución de pruebas basadas en propiedades suele comenzar con la definición de una propiedad (p. ej., la ausencia de [desbordamientos de enteros](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)) o una colección de propiedades que se desea verificar en un contrato inteligente. También puede ser necesario definir un rango de valores dentro del cual el programa pueda generar datos para entradas de transacción al escribir pruebas de propiedad.

Una vez configurada correctamente, la herramienta de prueba basada en propiedades ejecutará las funciones del contrato inteligente con entradas generadas al azar. Si hay alguna violación de afirmación, obtendrá un informe con datos de entrada concretos que violan la propiedad en evaluación. Vea algunas de las siguientes guías para comenzar a ejecutar pruebas basadas en propiedades con diferentes herramientas:

- **[Análisis estático de contratos inteligentes con Slither](https://github.com/crytic/slither)**
- **[Análisis estático de contratos inteligentes con Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Pruebas basadas en propiedades con Brownie](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Fuzzing de contratos con Foundry](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Fuzzing de contratos con Echidna](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Fuzzing de contratos con Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Ejecución simbólica de contratos inteligentes con Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Ejecución simbólica de contratos inteligentes con Mythril](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## Pruebas manuales de contratos inteligentes {#manual-testing-for-smart-contracts}

Las pruebas manuales de contratos inteligentes a menudo vienen más tarde en el ciclo de desarrollo después de ejecutar pruebas automatizadas. Esta forma de verificación evalúa el contrato inteligente como un producto totalmente integrado para ver si se comporta como se especifica en los requisitos técnicos.

### Prueba de contratos en una cadena de bloques local {#testing-on-local-blockchain}

Si bien las pruebas automatizadas realizadas en un entorno de desarrollo local pueden proporcionar información útil de depuración, querrá saber cómo se comporta su contrato inteligente en un entorno de producción. Sin embargo, la implementación en la cadena principal de Ethereum incurre en tarifas de gas —por no mencionar que usted o sus usuarios pueden perder dinero real si su contrato inteligente todavía tiene errores—.

Probar su contrato en una cadena de bloques local (también conocida como una [red de desarrollo](/developers/docs/development-networks/)) es una alternativa recomendada a las pruebas en la Red principal. Una cadena de bloques local es una copia de la cadena de bloques de Ethereum que se ejecuta localmente en su computadora y simula el comportamiento de la capa de ejecución de Ethereum. Como tal, puede programar transacciones para interactuar con un contrato sin incurrir en gastos significativos.

Ejecutar contratos en una cadena de bloques local podría ser útil como una forma de prueba de integración manual. Los [contratos inteligentes son altamente componibles](/developers/docs/smart-contracts/composability/), lo que le permite integrarse con los protocolos existentes, pero aún así tendrá que asegurarse de que estas interacciones complejas en la cadena produzcan los resultados correctos.

[Más sobre las redes de desarrollo.](/developers/docs/development-networks/)

### Prueba de contratos en redes de prueba {#testing-contracts-on-testnets}

Una prueba en la red o una ed de prueba funciona exactamente como la red principal de Ethereum, excepto que utiliza ether (ETH) sin valor en el mundo real. Desplegar su contrato en una [red de prueba](/developers/docs/networks/#ethereum-testnets) significa que cualquiera puede interactuar con él (p. ej., a través de la interfaz de la dapp) sin poner fondos en riesgo.

Esta forma de prueba manual es útil para evaluar el flujo de extremo a extremo de la aplicación desde el punto de vista del usuario. Aquí, los beta testers también pueden realizar ejecuciones de prueba y reportar cualquier problema en la lógica de negocio del contrato y su funcionalidad general.

Implementar en una red de pruebas después de probar en una cadena de bloques local es ideal, ya que la primera está más cerca del comportamiento de la Máquina virtual de Ethereum. Por lo tanto, es común que muchos proyectos nativos de Ethereum implementen dapps en redes de prueba para evaluar la operación de contratos inteligentes en condiciones reales.

[Más sobre las redes de prueba de Ethereum.](/developers/docs/development-networks/#public-beacon-testchains)

## Pruebas frente a verificación formal {#testing-vs-formal-verification}

Si bien las pruebas ayudan a confirmar que un contrato devuelva los resultados esperados para algunas entradas de datos, no puede probar de manera concluyente lo mismo para las entradas no utilizadas durante las pruebas. Probar un contrato inteligente, por lo tanto, no puede garantizar la "corrección funcional" (es decir, no puede demostrar que un programa se comporta como es debido para _todos_ los conjuntos de valores de entrada).

La verificación formal es un método para evaluar que un software funcione como se espera comprobando si un modelo formal del programa coincide con la especificación formal. Un modelo formal es una representación matemática abstracta de un programa, mientras que una especificación formal define las propiedades de un programa (a saber, afirmaciones lógicas sobre la ejecución del programa).

Dado que las propiedades están escritas en términos matemáticos, es posible verificar que un modelo formal (matemático) del sistema satisfaga una especificación utilizando reglas lógicas de inferencia. Por lo tanto, se dice que las herramientas de verificación formal producen una "prueba matemática" del funcionamiento adecuado de un sistema.

A diferencia de las pruebas, la verificación formal se puede utilizar para comprobar que la ejecución de un contrato inteligente satisface una especificación formal para _todas_ las ejecuciones (es decir, que no tiene errores) sin necesidad de ejecutarlo con datos de muestra. Esto no solo reduce el tiempo dedicado a ejecutar cientos de pruebas unitarias, sino que también es más eficaz para detectar vulnerabilidades ocultas. Dicho esto, las técnicas de verificación formal están en un espectro que depende de su dificultad de aplicación y utilidad.

[Más información sobre la verificación formal de contratos inteligentes.](/developers/docs/smart-contracts/formal-verification)

## Pruebas frente a auditorías y recompensas por errores {#testing-vs-audits-bug-bounties}

Como se ha mencionado, las pruebas rigurosas rara vez pueden garantizar la ausencia de errores en un contrato; los enfoques de verificación formal pueden proporcionar mayores garantías de corrección, pero actualmente son difíciles de usar y suponen costes considerables.

Aun así, puede aumentar aún más la posibilidad de captar vulnerabilidades en un contrato obteniendo una revisión de código independiente. Las [auditorías de contratos inteligentes](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) y las [recompensas por errores](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) son dos formas de conseguir que otros analicen sus contratos.

Las auditorías son realizadas por auditores con experiencia en encontrar casos de fallas de seguridad y malas prácticas de desarrollo en contratos inteligentes. Una auditoría generalmente incluirá pruebas (y posiblemente verificación formal), así como una revisión manual de toda la base de código.

Por el contrario, un programa de recompensas por errores suele implicar ofrecer una recompensa económica a un individuo (comúnmente descrito como [hackers de sombrero blanco](https://en.wikipedia.org/wiki/White_hat_\(computer_security\))) que descubre una vulnerabilidad en un contrato inteligente y la revela a los desarrolladores. Las recompensas por detectar errores son similares a las auditorías, ya que implican pedir a otros que ayuden a encontrar defectos en los contratos inteligentes.

La diferencia principal es que los programas de recompensas por errores están abiertos a la comunidad de desarrolladores y hackers más amplia y atraen a una amplia clase de hackers éticos y profesionales de seguridad independientes con habilidades y experiencia únicas. Esto puede ser una ventaja con respecto a las auditorías de contratos inteligentes, que dependen principalmente de equipos que pueden poseer conocimientos limitados o acotados.

## Herramientas y librerías de prueba {#testing-tools-and-libraries}

### Herramientas de prueba unitaria {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _Herramienta de cobertura de código para contratos inteligentes escritos en Solidity._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _Framework para el desarrollo y la prueba avanzados de contratos inteligentes (basado en ethers.js)_.

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Herramienta para probar contratos inteligentes de Solidity._ Funciona debajo del plugin de Remix IDE "Solidity Unit Testing", que se utiliza para escribir y ejecutar casos de prueba para un contrato._

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _Librería de aserciones para probar contratos inteligentes de Ethereum._ ¡Asegúrese de que sus contratos se comporten como se espera!_

- **[Marco de pruebas unitarias de Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _Brownie utiliza Pytest, un marco de pruebas rico en funciones que le permite escribir pruebas pequeñas con un código mínimo, se escala bien para proyectos grandes y es altamente extensible._

- **[Pruebas de Foundry](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** - _Foundry ofrece Forge, un marco de pruebas de Ethereum rápido y flexible capaz de ejecutar pruebas unitarias sencillas, comprobaciones de optimización de gas y fuzzing de contratos._

- **[Pruebas de Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _Framework para probar contratos inteligentes basado en ethers.js, Mocha y Chai._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _Framework de desarrollo y pruebas basado en Python para contratos inteligentes dirigidos a la máquina virtual de Ethereum._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _Framework basado en Python para pruebas unitarias y fuzzing con potentes capacidades de depuración y soporte de pruebas entre cadenas, que utiliza pytest y Anvil para obtener la mejor experiencia de usuario y el mejor rendimiento._

### Herramientas de prueba basadas en propiedades {#property-based-testing-tools}

#### Herramientas de análisis estático {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** - _Framework de análisis estático de Solidity basado en Python para encontrar vulnerabilidades, mejorar la comprensión del código y escribir análisis personalizados para contratos inteligentes._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _Linter para aplicar las mejores prácticas de estilo y seguridad para el lenguaje de programación de contratos inteligentes Solidity._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _Analizador estático basado en Rust diseñado específicamente para la seguridad y el desarrollo de contratos inteligentes de Web3._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _Framework de análisis estático basado en Python con detectores de vulnerabilidades y de calidad de código, impresores para extraer información útil del código y soporte para escribir submódulos personalizados._

- **[Slippy](https://github.com/fvictorio/slippy)** - _Un linter sencillo y potente para Solidity._

#### Herramientas de análisis dinámico {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** - _Fuzzer de contratos rápido para detectar vulnerabilidades en contratos inteligentes mediante pruebas basadas en propiedades._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _Herramienta de fuzzing automatizada útil para detectar violaciones de propiedades en el código de los contratos inteligentes._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _Framework de ejecución simbólica dinámica para analizar el bytecode de la EVM._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - _Herramienta de evaluación de bytecode de la EVM para detectar vulnerabilidades de contratos mediante taint analysis, análisis concolic y comprobación del flujo de control._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble es un lenguaje de especificación y una herramienta de verificación en tiempo de ejecución que le permite anotar contratos inteligentes con propiedades que le permiten probar automáticamente los contratos con herramientas como Diligence Fuzzing o MythX._

## Tutoriales relacionados {#related-tutorials}

- [Una descripción general y comparación de diferentes productos de prueba](/developers/tutorials/guide-to-smart-contract-security-tools/) _
- [Cómo usar Echidna para probar contratos inteligentes](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Cómo usar Manticore para encontrar errores en los contratos inteligentes](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Cómo usar Slither para encontrar errores en los contratos inteligentes](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Cómo simular contratos de Solidity para realizar pruebas](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Cómo ejecutar pruebas unitarias en Solidity con Foundry](https://www.rareskills.io/post/foundry-testing-solidity)

## Lecturas adicionales {#further-reading}

- [Una guía detallada para probar contratos inteligentes de Ethereum](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Cómo probar los contratos inteligentes de Ethereum](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [Guía de pruebas unitarias para desarrolladores de MolochDAO](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Cómo probar contratos inteligentes como una estrella de rock](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)
