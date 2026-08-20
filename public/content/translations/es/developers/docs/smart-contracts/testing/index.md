---
title: Pruebas de contratos inteligentes
description: "Una descripción general de las técnicas y consideraciones para probar contratos inteligentes de Ethereum."
lang: es
---

Las cadenas de bloques públicas como Ethereum son inmutables, lo que dificulta cambiar el código de un contrato inteligente después del despliegue. Existen [patrones de actualización de contratos](/developers/docs/smart-contracts/upgrading/) para realizar "actualizaciones virtuales", pero son difíciles de implementar y requieren consenso social. Además, una actualización solo puede corregir un error _después_ de que se descubre; si un atacante descubre la vulnerabilidad primero, su contrato inteligente corre el riesgo de ser explotado.

Por estas razones, probar los contratos inteligentes antes de [desplegarlos](/developers/docs/smart-contracts/deploying/) en la Red principal es un requisito mínimo de [seguridad](/developers/docs/smart-contracts/security/). Existen muchas técnicas para probar contratos y evaluar la corrección del código; la que elija dependerá de sus necesidades. Sin embargo, un conjunto de pruebas compuesto por diferentes herramientas y enfoques es ideal para detectar fallas de seguridad tanto menores como mayores en el código del contrato.

## Requisitos previos {#prerequisites}

Esta página explica cómo probar contratos inteligentes antes de desplegarlos en la red Ethereum. Asume que está familiarizado con los [contratos inteligentes](/developers/docs/smart-contracts/).

## ¿Qué son las pruebas de contratos inteligentes? {#what-is-smart-contract-testing}

Las pruebas de contratos inteligentes son el proceso de verificar que el código de un contrato inteligente funcione como se espera. Las pruebas son útiles para comprobar si un contrato inteligente en particular cumple con los requisitos de confiabilidad, usabilidad y seguridad.

Aunque los enfoques varían, la mayoría de los métodos de prueba requieren ejecutar un contrato inteligente con una pequeña muestra de los datos que se espera que maneje. Si el contrato produce resultados correctos para los datos de muestra, se asume que funciona correctamente. La mayoría de las herramientas de prueba proporcionan recursos para escribir y ejecutar [casos de prueba](https://en.m.wikipedia.org/wiki/Test_case) para comprobar si la ejecución de un contrato coincide con los resultados esperados.

### ¿Por qué es importante probar los contratos inteligentes? {#importance-of-testing-smart-contracts}

Dado que los contratos inteligentes a menudo gestionan activos financieros de alto valor, los errores de programación menores pueden provocar, y a menudo lo hacen, [pérdidas masivas para los usuarios](https://rekt.news/leaderboard/). Sin embargo, las pruebas rigurosas pueden ayudarle a descubrir defectos y problemas en el código de un contrato inteligente de forma temprana y solucionarlos antes de su lanzamiento en la Red principal.

Si bien es posible actualizar un contrato si se descubre un error, las actualizaciones son complejas y pueden [provocar errores](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) si se manejan de manera incorrecta. La actualización de un contrato anula aún más el principio de inmutabilidad y sobrecarga a los usuarios con supuestos de confianza adicionales. Por el contrario, un plan integral para probar su contrato mitiga los riesgos de seguridad de los contratos inteligentes y reduce la necesidad de realizar actualizaciones lógicas complejas después del despliegue.

## Métodos para probar contratos inteligentes {#methods-for-testing-smart-contracts}

Los métodos para probar contratos inteligentes de Ethereum se dividen en dos categorías amplias: **pruebas automatizadas** y **pruebas manuales**. Las pruebas automatizadas y las pruebas manuales ofrecen beneficios y compensaciones únicos, pero puede combinar ambos para crear un plan sólido para analizar sus contratos.

### Pruebas automatizadas {#automated-testing}

Las pruebas automatizadas utilizan herramientas que comprueban automáticamente el código de un contrato inteligente en busca de errores en la ejecución. El beneficio de las pruebas automatizadas proviene del uso de [scripts](https://www.techtarget.com/whatis/definition/script?amp=1) para guiar la evaluación de las funcionalidades del contrato. Las pruebas programadas se pueden programar para que se ejecuten repetidamente con una intervención humana mínima, lo que hace que las pruebas automatizadas sean más eficientes que los enfoques manuales de prueba.

Las pruebas automatizadas son particularmente útiles cuando las pruebas son repetitivas y consumen mucho tiempo; difíciles de llevar a cabo manualmente; susceptibles a errores humanos; o implican la evaluación de funciones críticas del contrato. Pero las herramientas de pruebas automatizadas pueden tener inconvenientes: pueden pasar por alto ciertos errores y producir muchos [falsos positivos](https://www.contrastsecurity.com/glossary/false-positive). Por lo tanto, combinar pruebas automatizadas con pruebas manuales para contratos inteligentes es ideal.

### Pruebas manuales {#manual-testing}

Las pruebas manuales cuentan con ayuda humana e implican la ejecución de cada caso de prueba en su conjunto de pruebas uno tras otro al analizar la corrección de un contrato inteligente. Esto es diferente a las pruebas automatizadas, donde puede ejecutar simultáneamente múltiples pruebas aisladas en un contrato y obtener un informe que muestre todas las pruebas fallidas y aprobadas.

Las pruebas manuales pueden ser llevadas a cabo por un solo individuo siguiendo un plan de prueba escrito que cubra diferentes escenarios de prueba. También podría hacer que varios individuos o grupos interactúen con un contrato inteligente durante un período específico como parte de las pruebas manuales. Los evaluadores compararán el comportamiento real del contrato con el comportamiento esperado, marcando cualquier diferencia como un error.

Las pruebas manuales efectivas requieren recursos considerables (habilidad, tiempo, dinero y esfuerzo), y es posible, debido a un error humano, pasar por alto ciertos errores al ejecutar las pruebas. Pero las pruebas manuales también pueden ser beneficiosas; por ejemplo, un evaluador humano (por ejemplo, un auditor) puede usar la intuición para detectar casos extremos que una herramienta de prueba automatizada pasaría por alto.

## Pruebas automatizadas para contratos inteligentes {#automated-testing-for-smart-contracts}

### Pruebas unitarias {#unit-testing-for-smart-contracts}

Las pruebas unitarias evalúan las funciones del contrato por separado y comprueban que cada componente funcione correctamente. Las buenas pruebas unitarias deben ser simples, rápidas de ejecutar y proporcionar una idea clara de lo que salió mal si las pruebas fallan.

Las pruebas unitarias son útiles para comprobar que las funciones devuelven los valores esperados y que el almacenamiento del contrato se actualiza correctamente después de la ejecución de la función. Además, la ejecución de pruebas unitarias después de realizar cambios en la base de código de un contrato garantiza que la adición de nueva lógica no introduzca errores. A continuación se presentan algunas pautas para ejecutar pruebas unitarias efectivas:

#### Pautas para realizar pruebas unitarias de contratos inteligentes {#unit-testing-guidelines}

##### 1. Comprenda la lógica de negocio y el flujo de trabajo de su contrato

Antes de escribir pruebas unitarias, es útil saber qué funcionalidades ofrece un contrato inteligente y cómo los usuarios accederán y utilizarán esas funciones. Esto es particularmente útil para ejecutar [pruebas de ruta feliz](https://en.m.wikipedia.org/wiki/Happy_path) que determinan si las funciones en un contrato devuelven la salida correcta para entradas de usuario válidas. Explicaremos este concepto utilizando este ejemplo (abreviado) de [un contrato de subasta](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)

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

Este es un contrato de subasta simple diseñado para recibir ofertas durante el período de licitación. Si la `highestBid` aumenta, el postor más alto anterior recibe su dinero; una vez que termina el período de licitación, el `beneficiary` llama al contrato para obtener su dinero.

Las pruebas unitarias para un contrato como este cubrirían diferentes funciones que un usuario podría llamar al interactuar con el contrato. Un ejemplo sería una prueba unitaria que comprueba si un usuario puede realizar una oferta mientras la subasta está en curso (es decir, las llamadas a `bid()` tienen éxito) o una que comprueba si un usuario puede realizar una oferta más alta que la `highestBid` actual.

Comprender el flujo de trabajo operativo de un contrato también ayuda a escribir pruebas unitarias que comprueban si la ejecución cumple con los requisitos. Por ejemplo, el contrato de subasta especifica que los usuarios no pueden realizar ofertas cuando la subasta ha terminado (es decir, cuando `auctionEndTime` es menor que `block.timestamp`). Por lo tanto, un desarrollador podría ejecutar una prueba unitaria que compruebe si las llamadas a la función `bid()` tienen éxito o fallan cuando la subasta ha terminado (es decir, cuando `auctionEndTime` > `block.timestamp`).

##### 2. Evalúe todos los supuestos relacionados con la ejecución del contrato

Es importante documentar cualquier supuesto sobre la ejecución de un contrato y escribir pruebas unitarias para verificar la validez de esos supuestos. Además de ofrecer protección contra la ejecución inesperada, probar aserciones le obliga a pensar en operaciones que podrían romper el modelo de seguridad de un contrato inteligente. Un consejo útil es ir más allá de las "pruebas de usuario feliz" y escribir pruebas negativas que comprueben si una función falla con las entradas incorrectas.

Muchos marcos de pruebas unitarias le permiten crear aserciones (declaraciones simples que establecen lo que un contrato puede y no puede hacer) y ejecutar pruebas para ver si esas aserciones se mantienen durante la ejecución. Un desarrollador que trabaje en el contrato de subasta descrito anteriormente podría hacer las siguientes aserciones sobre su comportamiento antes de ejecutar pruebas negativas:

- Los usuarios no pueden realizar ofertas cuando la subasta ha terminado o no ha comenzado.

- El contrato de subasta se revierte si una oferta está por debajo del umbral aceptable.

- A los usuarios que no logran ganar la oferta se les acreditan sus fondos.

**Nota**: Otra forma de probar supuestos es escribir pruebas que activen [modificadores de función](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) en un contrato, especialmente las declaraciones `require`, `assert` y `if…else`.

##### 3. Mida la cobertura del código

La [cobertura de código](https://en.m.wikipedia.org/wiki/Code_coverage) es una métrica de prueba que rastrea el número de ramas, líneas y declaraciones en su código ejecutadas durante las pruebas. Las pruebas deben tener una buena cobertura de código para minimizar el riesgo de vulnerabilidades no probadas. Sin suficiente cobertura, podría asumir falsamente que su contrato es seguro porque todas las pruebas pasan, mientras que las vulnerabilidades aún existen en rutas de código no probadas. Sin embargo, registrar una alta cobertura de código da la seguridad de que todas las declaraciones/funciones en un contrato inteligente se probaron suficientemente para verificar su corrección.

##### 4. Utilice marcos de prueba bien desarrollados

La calidad de las herramientas utilizadas para ejecutar pruebas unitarias para sus contratos inteligentes es crucial. Un marco de prueba ideal es aquel que se mantiene regularmente; proporciona características útiles (por ejemplo, capacidades de registro e informes); y debe haber sido ampliamente utilizado y examinado por otros desarrolladores.

Los marcos de pruebas unitarias para contratos inteligentes de Solidity vienen en diferentes lenguajes (principalmente JavaScript, Python y Rust). Consulte algunas de las guías a continuación para obtener información sobre cómo comenzar a ejecutar pruebas unitarias con diferentes marcos de prueba:

- **[Ejecución de pruebas unitarias con Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Ejecución de pruebas unitarias con Foundry](https://book.getfoundry.sh/forge/writing-tests)**
- **[Ejecución de pruebas unitarias con Waffle](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Ejecución de pruebas unitarias con Remix](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Ejecución de pruebas unitarias con Ape](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Ejecución de pruebas unitarias con Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Ejecución de pruebas unitarias con Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**
- **[Ejecución de pruebas unitarias con Moccasin](https://github.com/Cyfrin/moccasin)**

### Pruebas de integración {#integration-testing-for-smart-contracts}

Mientras que las pruebas unitarias depuran las funciones del contrato de forma aislada, las pruebas de integración evalúan los componentes de un contrato inteligente en su conjunto. Las pruebas de integración pueden detectar problemas que surgen de llamadas entre contratos o interacciones entre diferentes funciones en el mismo contrato inteligente. Por ejemplo, las pruebas de integración pueden ayudar a comprobar si cosas como la [herencia](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) y la inyección de dependencias funcionan correctamente.

Las pruebas de integración son útiles si su contrato adopta una arquitectura modular o interactúa con otros contratos en cadena durante la ejecución. Una forma de ejecutar pruebas de integración es realizar una [bifurcación de la cadena de bloques](/glossary/#fork) a una altura específica (utilizando una herramienta como [Forge](https://book.getfoundry.sh/forge/fork-testing) o [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks)) y simular interacciones entre su contrato y los contratos desplegados.

La cadena de bloques bifurcada se comportará de manera similar a la Red principal y tendrá cuentas con estados y saldos asociados. Pero solo actúa como un entorno de desarrollo local aislado, lo que significa que no necesitará ETH real para las transacciones, por ejemplo, ni sus cambios afectarán el protocolo real de Ethereum.

### Pruebas basadas en propiedades {#property-based-testing-for-smart-contracts}

Las pruebas basadas en propiedades son el proceso de comprobar que un contrato inteligente satisface alguna propiedad definida. Las propiedades afirman hechos sobre el comportamiento de un contrato que se espera que sigan siendo ciertos en diferentes escenarios; un ejemplo de una propiedad de contrato inteligente podría ser "Las operaciones aritméticas en el contrato nunca sufren desbordamiento por exceso o por defecto".

El **análisis estático** y el **análisis dinámico** son dos técnicas comunes para ejecutar pruebas basadas en propiedades, y ambas pueden verificar que el código de un programa (un contrato inteligente en este caso) satisface alguna propiedad predefinida. Algunas herramientas de pruebas basadas en propiedades vienen con reglas predefinidas sobre las propiedades esperadas del contrato y comprueban el código con esas reglas, mientras que otras le permiten crear propiedades personalizadas para un contrato inteligente.

#### Análisis estático {#static-analysis}

Un analizador estático toma como entrada el código fuente de un contrato inteligente y genera resultados que declaran si un contrato satisface una propiedad o no. A diferencia del análisis dinámico, el análisis estático no implica ejecutar un contrato para analizar su corrección. En cambio, el análisis estático razona sobre todas las rutas posibles que un contrato inteligente podría tomar durante la ejecución (es decir, examinando la estructura del código fuente para determinar qué significaría para la operación del contrato en tiempo de ejecución).

El [linting](https://www.perforce.com/blog/qac/what-is-linting) y las [pruebas estáticas](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) son métodos comunes para ejecutar análisis estáticos en contratos. Ambos requieren analizar representaciones de bajo nivel de la ejecución de un contrato, como [árboles de sintaxis abstracta](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) y [gráficos de flujo de control](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/) generados por el compilador.

En la mayoría de los casos, el análisis estático es útil para detectar problemas de seguridad como el uso de construcciones inseguras, errores de sintaxis o violaciones de los estándares de codificación en el código de un contrato. Sin embargo, se sabe que los analizadores estáticos son generalmente poco fiables para detectar vulnerabilidades más profundas y pueden producir excesivos falsos positivos.

#### Análisis dinámico {#dynamic-analysis}

El análisis dinámico genera entradas simbólicas (por ejemplo, en la [ejecución simbólica](https://en.m.wikipedia.org/wiki/Symbolic_execution)) o entradas concretas (por ejemplo, en el [fuzzing](https://owasp.org/www-community/Fuzzing)) a las funciones de un contrato inteligente para ver si alguna traza de ejecución viola propiedades específicas. Esta forma de prueba basada en propiedades difiere de las pruebas unitarias en que los casos de prueba cubren múltiples escenarios y un programa maneja la generación de casos de prueba.

El [fuzzing](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing) es un ejemplo de una técnica de análisis dinámico para verificar propiedades arbitrarias en contratos inteligentes. Un fuzzer invoca funciones en un contrato objetivo con variaciones aleatorias o malformadas de un valor de entrada definido. Si el contrato inteligente entra en un estado de error (por ejemplo, uno donde falla una aserción), el problema se marca y las entradas que dirigen la ejecución hacia la ruta vulnerable se producen en un informe.

El fuzzing es útil para evaluar el mecanismo de validación de entrada de un contrato inteligente, ya que el manejo inadecuado de entradas inesperadas podría resultar en una ejecución no deseada y producir efectos peligrosos. Esta forma de prueba basada en propiedades puede ser ideal por muchas razones:

1. **Escribir casos de prueba para cubrir muchos escenarios es difícil.** Una prueba de propiedad solo requiere que defina un comportamiento y un rango de datos para probar el comportamiento; el programa genera automáticamente casos de prueba basados en la propiedad definida.

2. **Es posible que su conjunto de pruebas no cubra suficientemente todas las rutas posibles dentro del programa.** Incluso con una cobertura del 100%, es posible pasar por alto casos extremos.

3. **Las pruebas unitarias demuestran que un contrato se ejecuta correctamente para datos de muestra, pero se desconoce si el contrato se ejecuta correctamente para entradas fuera de la muestra.** Las pruebas de propiedad ejecutan un contrato objetivo con múltiples variaciones de un valor de entrada dado para encontrar trazas de ejecución que causen fallas de aserción. Por lo tanto, una prueba de propiedad proporciona más garantías de que un contrato se ejecuta correctamente para una amplia clase de datos de entrada.

### Pautas para ejecutar pruebas basadas en propiedades para contratos inteligentes {#running-property-based-tests}

La ejecución de pruebas basadas en propiedades generalmente comienza con la definición de una propiedad (por ejemplo, la ausencia de [desbordamientos de enteros](https://github.com/ConsenSysDiligence/mythril/wiki/Integer-Overflow)) o una colección de propiedades que desea verificar en un contrato inteligente. También es posible que deba definir un rango de valores dentro del cual el programa puede generar datos para las entradas de transacciones al escribir pruebas de propiedad.

Una vez configurada correctamente, la herramienta de prueba de propiedades ejecutará las funciones de sus contratos inteligentes con entradas generadas aleatoriamente. Si hay alguna violación de aserción, debería obtener un informe con datos de entrada concretos que violen la propiedad bajo evaluación. Consulte algunas de las guías a continuación para comenzar a ejecutar pruebas basadas en propiedades con diferentes herramientas:

- **[Análisis estático de contratos inteligentes con Slither](https://github.com/crytic/slither)**
- **[Análisis estático de contratos inteligentes con Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Pruebas basadas en propiedades con Brownie](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Fuzzing de contratos con Foundry](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Fuzzing de contratos con Echidna](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Fuzzing de contratos con Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Ejecución simbólica de contratos inteligentes con Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Ejecución simbólica de contratos inteligentes con Mythril](https://github.com/ConsenSysDiligence/mythril/blob/develop/docs/source/tutorial.rst)**

## Pruebas manuales para contratos inteligentes {#manual-testing-for-smart-contracts}

Las pruebas manuales de contratos inteligentes a menudo se realizan más adelante en el ciclo de desarrollo después de ejecutar pruebas automatizadas. Esta forma de prueba evalúa el contrato inteligente como un producto totalmente integrado para ver si funciona según lo especificado en los requisitos técnicos.

### Pruebas de contratos en una cadena de bloques local {#testing-on-local-blockchain}

Si bien las pruebas automatizadas realizadas en un entorno de desarrollo local pueden proporcionar información de depuración útil, querrá saber cómo se comporta su contrato inteligente en un entorno de producción. Sin embargo, el despliegue en la cadena principal de Ethereum incurre en tarifas de gas, sin mencionar que usted o sus usuarios pueden perder dinero real si su contrato inteligente aún tiene errores.

Probar su contrato en una cadena de bloques local (también conocida como [red de desarrollo](/developers/docs/development-networks/)) es una alternativa recomendada a las pruebas en la Red principal. Una cadena de bloques local es una copia de la cadena de bloques de Ethereum que se ejecuta localmente en su computadora y que simula el comportamiento de la capa de ejecución de Ethereum. Como tal, puede programar transacciones para interactuar con un contrato sin incurrir en gastos generales significativos.

La ejecución de contratos en una cadena de bloques local podría ser útil como una forma de prueba de integración manual. [Los contratos inteligentes son altamente componibles](/developers/docs/smart-contracts/composability/), lo que le permite integrarse con protocolos existentes, pero aún deberá asegurarse de que interacciones en cadena tan complejas produzcan los resultados correctos.

[Más sobre redes de desarrollo.](/developers/docs/development-networks/)

### Pruebas de contratos en redes de prueba {#testing-contracts-on-testnets}

Una red de prueba o testnet funciona exactamente como la red principal de Ethereum, excepto que utiliza ether (ETH) sin valor en el mundo real. Desplegar su contrato en una [red de prueba](/developers/docs/networks/#ethereum-testnets) significa que cualquiera puede interactuar con él (por ejemplo, a través del frontend de la dapp) sin poner en riesgo los fondos.

Esta forma de prueba manual es útil para evaluar el flujo de extremo a extremo de su aplicación desde el punto de vista del usuario. Aquí, los probadores beta también pueden realizar pruebas y reportar cualquier problema con la lógica de negocio del contrato y la funcionalidad general.

Desplegar en una red de prueba después de probar en una cadena de bloques local es ideal, ya que la primera se acerca más al comportamiento de la Máquina Virtual de Ethereum. Por lo tanto, es común que muchos proyectos nativos de Ethereum desplieguen dapps en redes de prueba para evaluar la operación de un contrato inteligente en condiciones del mundo real.

[Más sobre las redes de prueba de Ethereum.](/developers/docs/development-networks/#public-beacon-testchains)

## Pruebas frente a verificación formal {#testing-vs-formal-verification}

Si bien las pruebas ayudan a confirmar que un contrato devuelve los resultados esperados para algunas entradas de datos, no pueden probar de manera concluyente lo mismo para las entradas no utilizadas durante las pruebas. Por lo tanto, probar un contrato inteligente no puede garantizar la "corrección funcional" (es decir, no puede demostrar que un programa se comporta como se requiere para _todos_ los conjuntos de valores de entrada).

La verificación formal es un enfoque para evaluar la corrección del software comprobando si un modelo formal del programa coincide con la especificación formal. Un modelo formal es una representación matemática abstracta de un programa, mientras que una especificación formal define las propiedades de un programa (es decir, aserciones lógicas sobre la ejecución del programa).

Debido a que las propiedades están escritas en términos matemáticos, es posible verificar que un modelo formal (matemático) del sistema satisface una especificación utilizando reglas lógicas de inferencia. Por lo tanto, se dice que las herramientas de verificación formal producen una 'prueba matemática' de la corrección de un sistema.

A diferencia de las pruebas, la verificación formal se puede utilizar para verificar que la ejecución de un contrato inteligente satisface una especificación formal para _todas_ las ejecuciones (es decir, no tiene errores) sin necesidad de ejecutarlo con datos de muestra. Esto no solo reduce el tiempo dedicado a ejecutar docenas de pruebas unitarias, sino que también es más efectivo para detectar vulnerabilidades ocultas. Dicho esto, las técnicas de verificación formal se encuentran en un espectro dependiendo de su dificultad de implementación y utilidad.

[Más sobre la verificación formal para contratos inteligentes.](/developers/docs/smart-contracts/formal-verification)

## Pruebas frente a auditorías y recompensas por errores {#testing-vs-audits-bug-bounties}

Como se mencionó, las pruebas rigurosas rara vez pueden garantizar la ausencia de errores en un contrato; los enfoques de verificación formal pueden proporcionar garantías más sólidas de corrección, pero actualmente son difíciles de usar e incurren en costos considerables.

Aún así, puede aumentar aún más la posibilidad de detectar vulnerabilidades en los contratos obteniendo una revisión de código independiente. Las [auditorías de contratos inteligentes](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) y las [recompensas por errores](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) son dos formas de hacer que otros analicen sus contratos.

Las auditorías son realizadas por auditores con experiencia en encontrar casos de fallas de seguridad y malas prácticas de desarrollo en contratos inteligentes. Una auditoría generalmente incluirá pruebas (y posiblemente verificación formal), así como una revisión manual de toda la base de código.

Por el contrario, un programa de recompensas por errores generalmente implica ofrecer una recompensa financiera a un individuo (comúnmente descrito como [hackers de sombrero blanco](<https://en.wikipedia.org/wiki/White_hat_(computer_security)>) que descubre una vulnerabilidad en un contrato inteligente y la revela a los desarrolladores. Las recompensas por errores son similares a las auditorías, ya que implican pedir a otros que ayuden a encontrar defectos en los contratos inteligentes.

La principal diferencia es que los programas de recompensas por errores están abiertos a la comunidad más amplia de desarrolladores/hackers y atraen a una amplia clase de hackers éticos y profesionales de seguridad independientes con habilidades y experiencia únicas. Esto puede ser una ventaja sobre las auditorías de contratos inteligentes que dependen principalmente de equipos que pueden poseer una experiencia limitada o estrecha.

## Herramientas y bibliotecas de prueba {#testing-tools-and-libraries}

### Herramientas de pruebas unitarias {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)**: _Herramienta de cobertura de código para contratos inteligentes escritos en Solidity._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)**: _Marco para el desarrollo y prueba avanzados de contratos inteligentes (basado en Ethers.js)_.

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)**: _Herramienta para probar contratos inteligentes de Solidity. Funciona debajo del complemento "Solidity Unit Testing" del IDE de Remix, que se utiliza para escribir y ejecutar casos de prueba para un contrato._

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)**: _Biblioteca de aserciones para pruebas de contratos inteligentes de Ethereum. ¡Asegúrese de que sus contratos se comporten como se espera!_

- **[Marco de pruebas unitarias de Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**: _Brownie utiliza Pytest, un marco de prueba rico en funciones que le permite escribir pruebas pequeñas con un código mínimo, se escala bien para proyectos grandes y es altamente extensible._

- **[Foundry Tests](https://github.com/foundry-rs/foundry/tree/master/crates/forge)**: _Foundry ofrece Forge, un marco de prueba de Ethereum rápido y flexible capaz de ejecutar pruebas unitarias simples, comprobaciones de optimización de gas y fuzzing de contratos._

- **[Hardhat Tests](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**: _Marco para probar contratos inteligentes basado en Ethers.js, Mocha y Chai._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)**: _Marco de desarrollo y prueba basado en Python para contratos inteligentes dirigidos a la Máquina Virtual de Ethereum._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**: _Marco basado en Python para pruebas unitarias y fuzzing con sólidas capacidades de depuración y soporte de pruebas intercadena, utilizando pytest y Anvil para la mejor experiencia de usuario y rendimiento._

### Herramientas de pruebas basadas en propiedades {#property-based-testing-tools}

#### Herramientas de análisis estático {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)**: _Marco de análisis estático de Solidity basado en Python para encontrar vulnerabilidades, mejorar la comprensión del código y escribir análisis personalizados para contratos inteligentes._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)**: _Linter para hacer cumplir las mejores prácticas de estilo y seguridad para el lenguaje de programación de contratos inteligentes Solidity._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)**: _Analizador estático basado en Rust diseñado específicamente para la seguridad y el desarrollo de contratos inteligentes de Web3._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**: _Marco de análisis estático basado en Python con detectores de vulnerabilidad y calidad de código, impresoras para extraer información útil del código y soporte para escribir submódulos personalizados._

- **[Slippy](https://github.com/fvictorio/slippy)**: _Un linter simple y potente para Solidity._

#### Herramientas de análisis dinámico {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)**: _Fuzzer de contratos rápido para detectar vulnerabilidades en contratos inteligentes a través de pruebas basadas en propiedades._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)**: _Herramienta de fuzzing automatizada útil para detectar violaciones de propiedades en el código de contratos inteligentes._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)**: _Marco de ejecución simbólica dinámica para analizar el código de bytes de la EVM._

- **[Mythril](https://github.com/ConsenSysDiligence/mythril)**: _Herramienta de evaluación de código de bytes de la EVM para detectar vulnerabilidades de contratos utilizando análisis de contaminación, análisis concólico y comprobación de flujo de control._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)**: _Scribble es un lenguaje de especificación y una herramienta de verificación en tiempo de ejecución que le permite anotar contratos inteligentes con propiedades que le permiten probar automáticamente los contratos con herramientas como Diligence Fuzzing o MythX._

## Tutoriales relacionados {#related-tutorials}

- [Una descripción general y comparación de diferentes productos de prueba](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Cómo usar Echidna para probar contratos inteligentes](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Cómo usar Manticore para encontrar errores en contratos inteligentes](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Cómo usar Slither para encontrar errores en contratos inteligentes](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Cómo simular contratos de Solidity para pruebas](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Cómo ejecutar pruebas unitarias en Solidity usando Foundry](https://www.rareskills.io/post/foundry-testing-solidity)

## Lecturas adicionales {#further-reading}

- [Una guía detallada para probar contratos inteligentes de Ethereum](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Cómo probar contratos inteligentes de Ethereum](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [Guía de pruebas unitarias de MolochDAO para desarrolladores](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Cómo probar contratos inteligentes como una estrella de rock](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)

## Tutoriales: Pruebas de contratos inteligentes en Ethereum {#tutorials}

- [Cómo desarrollar y probar una dapp en una red de prueba local multicliente](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– Tutorial sobre el despliegue de un contrato inteligente en una red de prueba local y la realización de pruebas._
- [Cómo simular contratos inteligentes de Solidity para pruebas](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/) _– Tutorial intermedio sobre cómo usar datos simulados e implementar pruebas unitarias._
- [Cómo usar Echidna para probar contratos inteligentes](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/) _– Enfoques avanzados para el fuzzing y las pruebas de contratos inteligentes._