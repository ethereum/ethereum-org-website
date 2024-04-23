---
title: Prueba de contratos inteligentes
description: Descripción general de las técnicas y consideraciones para probar contratos inteligentes de Ethereum.
lang: es
---

Las cadenas de bloques públicas como Ethereum son inmutables, lo que dificulta cambiar el código de un contrato inteligente después de su implementación. Existen [patrones de actualización de contratos](/developers/docs/smart-contracts/upgrading/) para realizar "actualizaciones virtuales", pero son difíciles de implementar y requieren consenso social. Además, una actualización solo puede corregir un error _después_ de que se descubre: si un atacante descubre la vulnerabilidad primero, su contrato inteligente corre el riesgo de sufrir una explotación.

Por estos motivos, probar los contratos inteligentes antes de [implementarlos](/developers/docs/smart-contracts/deploying/) en la Red principal es un requisito mínimo de [seguridad](/developers/docs/smart-contracts/security/). Hay muchas técnicas para probar contratos y evaluar que el código sea correcto; lo que elija depende de sus necesidades. Sin embargo, un paquete de pruebas compuesto por diferentes herramientas y enfoques es ideal para detectar fallas de seguridad mayores y menores en el código de un contrato.

## Requisitos previos {#prerequisites}

Esta página explica cómo probar contratos inteligentes antes de implementarlos en la red Ethereum. Supone que está familiarizado con los [contratos inteligentes](/developers/docs/smart-contracts/).

## ¿Qué son las pruebas de contratos inteligentes? {#what-is-smart-contract-testing}

La prueba o evaluación de contratos inteligentes es el proceso de verificar que el código de un contrato inteligente funcione como se espera. Las pruebas son útiles para comprobar si un contrato inteligente en particular cumple con los requisitos de confiabilidad, usabilidad y seguridad.

Aunque los enfoques varían, la mayoría de los métodos de prueba requieren la ejecución de un contrato inteligente con una pequeña muestra de los datos que se espera que maneje. Si el contrato produce resultados correctos para los datos de muestra, se supone que funciona correctamente. La mayoría de las herramientas de prueba proporcionan recursos para escribir y ejecutar [casos de prueba](https://en.m.wikipedia.org/wiki/Test_case) para comprobar si la ejecución de un contrato coincide con los resultados esperados.

### ¿Por qué es importante probar contratos inteligentes? {#importance-of-testing-smart-contracts}

Como los contratos inteligentes a menudo gestionan activos financieros de alto valor, los errores menores de programación pueden y a menudo llevan a [pérdidas masivas para los usuarios](https://rekt.news/leaderboard/). No obstante, las pruebas rigurosas pueden ayudarle a descubrir defectos y problemas en el código de un contrato inteligente de forma temprana y solucionarlos antes de lanzarlos en la red principal.

Aunque es posible actualizar un contrato si se descubre un error, las actualizaciones son complejas y pueden [provocar errores](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) si se manejan incorrectamente. Actualizar un contrato invalida aún más el principio de inmutabilidad y carga a los usuarios con supuestos de confianza adicionales. Por el contrario, un plan integral para probar su contrato mitiga los riesgos de seguridad de los contratos inteligentes y reduce la necesidad de realizar actualizaciones complejas en la lógica después de su implementación.

## Métodos para probar contratos inteligentes {#methods-for-testing-smart-contracts}

Los métodos para probar los contratos inteligentes de Ethereum se dividen en dos grandes categorías: **pruebas automatizadas** y **pruebas manuales**. Las pruebas automáticas y las pruebas manuales ofrecen beneficios y compensaciones únicos, pero usted puede combinar ambas para crear un plan sólido para analizar sus contratos.

### Prueba automatizada {#automated-testing}

Las pruebas automatizadas utilizan herramientas que comprueban automáticamente el código de un contrato inteligente para detectar errores en la ejecución. El beneficio de las pruebas automatizadas proviene del uso de [scripts](https://www.techtarget.com/whatis/definition/script?amp=1) para guiar la evaluación de las funcionalidades del contrato. Las pruebas con scripts pueden programarse para ejecutarse repetidamente con intervención humana mínima, lo que hace que sean más eficientes que los métodos manuales de prueba.

Las pruebas automatizadas son particularmente útiles cuando las pruebas son repetitivas y consumen mucho tiempo, son difíciles de llevar a cabo manualmente, son susceptibles a errores humanos o implican la evaluación de funciones contractuales críticas. Pero las herramientas de pruebas automatizadas pueden tener inconvenientes: pueden pasar por alto ciertos errores y producir muchos [falsos positivos](https://www.contrastsecurity.com/glossary/false-positive). Por lo tanto, combinar las pruebas automatizadas con pruebas manuales para contratos inteligentes es el enfoque ideal.

### Pruebas manuales {#manual-testing}

Las pruebas manuales son asistidas por las personas e implican ejecutar cada caso de prueba en su paquete de herramientas de prueba uno tras otro al analizar la corrección de un contrato inteligente. Esto se diferencia de las pruebas automatizadas, donde usted puede ejecutar varias pruebas aisladas simultáneamente en un contrato y obtener un informe que muestre todas las pruebas fallidas y aprobadas.

Las pruebas manuales pueden ser llevadas a cabo por un solo individuo siguiendo un plan de prueba escrito que cubra diferentes escenarios de prueba. También puede hacer que múltiples individuos o grupos interactúen con un contrato inteligente durante un período especificado como parte de la prueba manual. Los verificadores compararán el comportamiento real del contrato contra el comportamiento esperado, marcando cualquier diferencia como bug o error.

Las pruebas manuales efectivas requieren recursos considerables (habilidad, tiempo, dinero y esfuerzo), y es posible –debido al error humano– perder ciertos errores mientras se ejecutan las verificaciones. Pero las pruebas manuales también pueden ser beneficiosas, por ejemplo, un verificador humano (p. ej., un auditor) puede utilizar la intuición para detectar casos extremos que una herramienta de pruebas automatizadas pasaría por alto.

## Pruebas automatizadas para contratos inteligentes {#automated-testing-for-smart-contracts}

### Pruebas unitarias {#unit-testing-for-smart-contracts}

Las pruebas unitarias evalúan las funciones del contrato por separado y comprueban que cada componente funcione correctamente. Las pruebas unitarias bien hechas deben ser sencillas, rápidas de ejecutar y proporcionar una idea clara de lo que salió mal si fallan.

Las pruebas unitarias son útiles para comprobar que las funciones devuelvan valores esperados y que el almacenamiento del contrato se actualice correctamente después de la ejecución de la función. Además, ejecutar pruebas unitarias después de hacer cambios en la base de código de los contratos asegura que añadir una nueva lógica no introduzca errores. A continuación hay algunas pautas para ejecutar pruebas unitarias eficaces:

#### Directrices para las pruebas unitarias en contratos inteligentes {#unit-testing-guidelines}

##### 1. Comprender la lógica de negocio y el flujo de trabajo de sus contratos

Antes de escribir pruebas unitarias, debe saber qué funcionalidades ofrece un contrato inteligente y cómo los usuarios accederán y utilizarán esas funciones. Esto es particularmente útil para ejecutar [pruebas de ruta feliz](https://en.m.wikipedia.org/wiki/Happy_path) que determinan si las funciones en un contrato devuelven el resultado esperado para entradas de usuario válidas. Explicaremos este concepto usando este ejemplo (abreviado) de [un contrato de subasta](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction).

```
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

Se trata de un simple contrato de subasta diseñado para recibir ofertas durante el periodo de oferta. Si la `highestBid` (oferta más alta) aumenta, la oferta más alta anterior recibe su dinero; una vez finalizado el período de oferta, el `beneficiary` (beneficiario) llama al contrato para obtener su dinero.

Pruebas unitarias para un contrato como este cubrirían diferentes funciones que un usuario podría invocar al interactuar con el contrato. Un ejemplo sería hacer una prueba unitaria que compruebe si un usuario puede hacer una oferta mientras la subasta está en curso (es decir, las llamadas a `bid()` son exitosas) o una que compruebe si un usuario puede hacer una oferta más alta que la actual `highestBid`.

Entender el flujo de trabajo operacional de un contrato también ayuda a escribir pruebas unitarias que comprueben si la ejecución cumple los requisitos. Por ejemplo, el contrato de subasta especifica que los usuarios no puedan realizar ofertas cuando la subasta haya finalizado (es decir, cuando `auctionEndTime` sea inferior a `block.timestamp`). Así, un desarrollador podría ejecutar una prueba unitaria que compruebe si las llamadas a la función `bid()` tienen éxito o fallan cuando la subasta ha terminado (a saber, cuando `auctionEndTime` > `block.timestamp`).

##### 2. Evaluar todas las suposiciones relacionadas con la ejecución del contrato

Es importante documentar cualquier suposición sobre la ejecución de un contrato y escribir pruebas unitarias para verificar la validez de esos supuestos. Aparte de ofrecer protección contra la ejecución inesperada, probar las afirmaciones lo obligan a pensar en operaciones que podrían romper el modelo de seguridad de un contrato inteligente. Un consejo útil es ir más allá de "pruebas de usuarios felices" y escribir pruebas negativas que comprueben si una función falla para las entradas incorrectas.

Muchos marcos de pruebas unitarias le permiten crear aserciones, que son declaraciones simples que indican lo que un contrato puede o no puede hacer, y ejecutar pruebas para verificar si esas aserciones se cumplen durante la ejecución. Un desarrollador que trabaje en el contrato de subasta descrito anteriormente podría hacer las siguientes afirmaciones sobre su comportamiento antes de ejecutar pruebas negativas:

- Los usuarios no pueden realizar ofertas cuando la subasta haya finalizado o aún no haya comenzado.

- El contrato de subasta se revertirá si una oferta cae por debajo del límite aceptable o del monto mínimo.

- A los usuarios que no logren ganar la oferta se les acreditarán sus fondos

**Nota**: Otra forma de probar suposiciones es escribir pruebas que activen [modificadores de funciones](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) en un contrato, especialmente declaraciones `require`, `assert` y `if...else`.

##### 3. Medir la cobertura de código

La [cobertura de código](https://en.m.wikipedia.org/wiki/Code_coverage) es una métrica de prueba que realiza un seguimiento del número de ramificaciones, líneas y declaraciones ejecutadas en su código ejecuado durante las pruebas. Las pruebas deben tener una buena cobertura de código; de lo contrario, puede obtener "falsos negativos" que hagan que el contrato pase todas las pruebas cuando en realidad existen vulnerabilidades. Registrar una alta cobertura de código, sin embargo, brinda la garantía de que todas las declaraciones y funciones en un contrato inteligente fueron suficientemente probadas para verificar que son correctas.

##### 4. Utilizar marcos de pruebas bien desarrollados

La calidad de las herramientas utilizadas para ejecutar pruebas unitarias en sus contratos inteligentes es crucial. Un marco de pruebas ideal es aquel que se mantiene regularmente, proporciona funciones útiles (por ejemplo, capacidades de registro e informes) y ha sido ampliamente utilizado y evaluado por otros desarrolladores.

Los marcos de pruebas unitarias para contratos inteligentes de Solidity están disponibles en diferentes lenguajes (principalmente JavaScript, Python y Rust). A continuación, puede encontrar algunas guías para obtener información sobre cómo comenzar a ejecutar pruebas unitarias con diferentes marcos de pruebas:

- **[Ejecutar pruebas unitarias con Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Ejecutar pruebas unitarias con Foundry](https://book.getfoundry.sh/forge/writing-tests)**
- **[Ejecutar pruebas unitarias con Waffle](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Ejecutar pruebas unitarias con Remix](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Ejecutar pruebas unitarias con Ape](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Ejecutar pruebas unitarias con Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**

### Pruebas de integración {#integration-testing-for-smart-contracts}

Mientras que las pruebas unitarias depuran las funciones de un contrato de forma aislada, las pruebas de integración evalúan los componentes de un contrato inteligente en su conjunto. Las pruebas de integración pueden detectar problemas que surjan de llamadas a múltiples contratos o interacciones entre diferentes funciones en un mismo contrato inteligente. Por ejemplo, pueden ayudar a comprobar si cosas como la [herencia](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) e inyección de dependencias funcionan correctamente.

Las pruebas de integración son útiles si su contrato adopta una arquitectura modular o interactúa con otros contratos en cadena durante la ejecución. Una forma de ejecutar pruebas de integración es [ bifurcar la cadena de bloques](/glossary/#fork) a una altura específica (usando una herramienta como [Forge](https://book.getfoundry.sh/forge/fork-testing) o [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks) y simular las interacciones entre su contrato y los contratos desplegados.

La cadena de bloques bifurcada se comportará de manera similar a la Red principal y tendrá cuentas con estados y saldos asociados. Pero solo actúa como un entorno de desarrollo local sandbox (aislado), lo que significa que no necesitará ETH real para las transacciones, por ejemplo, ni sus cambios afectarán el protocolo de Ethereum real.

### Prueba basada en propiedades {#property-based-testing-for-smart-contracts}

Las pruebas basadas en propiedades son el proceso de verificar que un contrato inteligente satisfaga alguna propiedad definida. Las propiedades aseveran hechos sobre el comportamiento de un contrato que se esperan que sean verdaderos en diferentes escenarios: un ejemplo de una propiedad de contrato inteligente podría ser "Las operaciones aritméticas en el contrato nunca se desbordan o caen por debajo de los valores aceptables".

El **análisis estático** y el **análisis dinámico** son dos técnicas comunes para ejecutar pruebas basadas en propiedades, y ambos pueden verificar que el código de un programa (un contrato inteligente en este caso) satisfaga alguna propiedad predefinida. Algunas herramientas de pruebas basadas en propiedades vienen con reglas predefinidas sobre las propiedades de contrato esperadas y verifican el código contra esas reglas, mientras que otras le permiten crear propiedades personalizadas para un contrato inteligente.

#### Análisis estático {#static-analysis}

Un analizador estático toma como entrada el código fuente de un contrato inteligente y produce resultados declarando si un contrato satisface una propiedad o no. A diferencia del análisis dinámico, el análisis estático no implica la ejecución de un contrato para analizar si funciona correctmente. En su lugar, razona sobre todas las posibles rutas que un contrato inteligente podría tomar durante la ejecución (es decir, examinando la estructura del código fuente para determinar lo que significaría para la operación de los contratos en tiempo de ejecución).

[Linting](https://www.perforce.com/blog/qac/what-lint-code-and-why-linting-important) y las [pruebas estáticas](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) son métodos comunes para ejecutar un análisis estático en los contratos. Ambos requieren analizar representaciones de bajo nivel de la ejecución de un contrato, como [árboles de sintaxis abstracta](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) y [gráficos de flujo de control](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/) generados por el compilador.

En la mayoría de los casos, el análisis estático es útil para detectar problemas de seguridad como el uso de construcciones inseguras, errores de sintaxis o violaciones de los estándares de codificación en el código de contratos. Sin embargo, los analizadores estáticos son conocidos generalmente por ser poco efectivos al detectar vulnerabilidades más profundas, y pueden producir demasiados falsos positivos.

#### Análisis dinámico {#dynamic-analysis}

El análisis dinámico genera entradas simbólicas (por ejemplo, en [ejecución simbólica](https://en.m.wikipedia.org/wiki/Symbolic_execution)) o entradas concretas (p. ej., en [fuzzing](https://owasp.org/www-community/Fuzzing)) a las funciones de contratos inteligentes para ver si algún rastro de ejecución viola propiedades específicas. Esta forma de pruebas basadas en propiedades difiere de las pruebas unitarias en que los casos de prueba cubren múltiples escenarios y un programa maneja la generación de casos de prueba.

El [fuzzing](https://halborn.com/what-is-fuzz-testing-fuzzing/) es un ejemplo de una técnica de análisis dinámico para verificar propiedades arbitrarias en contratos inteligentes. Un fuzzer invoca funciones en un contrato objetivo con variaciones aleatorias o mal formadas de un valor de entrada definido. Si el contrato inteligente entra en un estado de error (p. ej., donde falle una afirmación), el problema se reporta y las entradas que impulsan la ejecución hacia la ruta vulnerable se producen en un informe.

El fuzzing es útil para evaluar el mecanismo de validación de entrada de un contrato inteligente, ya que un manejo inadecuado de entradas inesperadas podría resultar en una ejecución no intencionada y producir efectos peligrosos. Esta forma de pruebas basadas en propiedades puede ser ideal por varias razones:

1. **Escribir casos de prueba para abordar muchos escenarios es difícil.** Una prueba de propiedad solo requiere que defina un comportamiento y un rango de datos con los que probar el comportamiento; el programa genera automáticamente casos de prueba basados en la propiedad definida.

2. **Es posible que su paquete de herramientas de prueba no cubra suficientemente todas las rutas posibles dentro del programa.** Incluso con una cobertura del 100 %, es posible pasar por alto casos extremos.

3. **Las pruebas unitarias prueban que un contrato se ejecute correctamente para los datos de muestra, pero no se sabe si el contrato se ejecutará correctamente para entradas fuera de la muestra.** Las pruebas basadas en propiedades ejecutan un contrato objetivo con múltiples variaciones de un valor de entrada dado para encontrar rastros de ejecución que causen fallas de afirmación. Así, una prueba de propiedad proporciona más garantías de que un contrato se ejecutará correctamente para una amplia clase de datos de entrada.

### Directrices para ejecutar pruebas basadas en propiedades en contratos inteligentes {#running-property-based-tests}

Ejecutar pruebas basadas en propiedades típicamente comienza con la definición de una propiedad (p. ej., ausencia de [desbordamientos de enteros](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)) o una colección de propiedades que desee verificar en un contrato inteligente. También puede ser necesario definir un rango de valores dentro del cual el programa pueda generar datos para entradas de transacción al escribir pruebas de propiedad.

Una vez configurada correctamente, la herramienta de prueba basada en propiedades ejecutará las funciones del contrato inteligente con entradas generadas al azar. Si hay alguna violación de afirmación, obtendrá un informe con datos de entrada concretos que violan la propiedad en evaluación. Vea algunas de las siguientes guías para comenzar a ejecutar pruebas basadas en propiedades con diferentes herramientas:

- **[Análisis estático de contratos inteligentes con Slither](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither#slither)**
- **[Pruebas basadas en propiedades con Brownie](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Contratos de fuzzing con Foundry](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Contratos de fuzzing con Echidna](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Ejecución simbólica de contratos inteligentes con Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Ejecución simbólica de contratos inteligentes con Mythril](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## Pruebas manuales para contratos inteligentes {#manual-testing-for-smart-contracts}

Las pruebas manuales de contratos inteligentes a menudo vienen más tarde en el ciclo de desarrollo después de ejecutar pruebas automatizadas. Esta forma de verificación evalúa el contrato inteligente como un producto totalmente integrado para ver si se comporta como se especifica en los requisitos técnicos.

### Probar contratos en una cadena de bloques local {#testing-on-local-blockchain}

Si bien las pruebas automatizadas realizadas en un entorno de desarrollo local pueden proporcionar información útil de depuración, querrá saber cómo se comporta su contrato inteligente en un entorno de producción. Sin embargo, la implementación en la cadena principal de Ethereum incurre en tarifas de gas —por no mencionar que usted o sus usuarios pueden perder dinero real si su contrato inteligente todavía tiene errores—.

Probar su contrato en una cadena de bloques local (también conocida como una [red de desarrollo](/developers/docs/development-networks/)) es una alternativa recomendada a las pruebas en la Red principal. Una cadena de bloques local es una copia de la cadena de bloques de Ethereum que se ejecuta localmente en su computadora y simula el comportamiento de la capa de ejecución de Ethereum. Como tal, puede programar transacciones para interactuar con un contrato sin incurrir en gastos significativos.

Ejecutar contratos en una cadena de bloques local podría ser útil como una forma de prueba de integración manual. Los [contratos inteligentes son altamente componibles](/developers/docs/smart-contracts/composability/), lo que permite la integración con protocolos existentes —pero aun así necesitará asegurarse de que estas complejas interacciones en cadena produzcan los resultados correctos—.

[Más información sobre las redes de desarrollo.](/developers/docs/development-networks/)

### Pruebas de contratos en redes de pruebas {#testing-contracts-on-testnets}

Una red de pruebas o testnet funciona exactamente como la Red principal de Ethereum, excepto que usa Ether (ETH) sin valor real. Implementar su contrato en una [red de pruebas](/developers/docs/networks/#ethereum-testnets) significa que cualquiera puede interactuar con él (por ejemplo, a través del frontend de la dapp) sin poner fondos en riesgo.

Esta forma de prueba manual es útil para evaluar el flujo de extremo a extremo de la aplicación desde el punto de vista del usuario. Aquí, los beta testers también pueden realizar ejecuciones de prueba y reportar cualquier problema en la lógica de negocio del contrato y su funcionalidad general.

Implementar en una red de pruebas después de probar en una cadena de bloques local es ideal, ya que la primera está más cerca del comportamiento de la Máquina virtual de Ethereum. Por lo tanto, es común que muchos proyectos nativos de Ethereum implementen dapps en redes de prueba para evaluar la operación de contratos inteligentes en condiciones reales.

[Más información sobre las redes de prueba de Ethereum.](/developers/docs/development-networks/#public-beacon-testchains)

## Pruebas vs. verificación formal {#testing-vs-formal-verification}

Si bien las pruebas ayudan a confirmar que un contrato devuelva los resultados esperados para algunas entradas de datos, no puede probar de manera concluyente lo mismo para las entradas no utilizadas durante las pruebas. La verificación de un contrato inteligente, por lo tanto, no puede garantizar la "corrección funcional" (o sea, no puede mostrar que un programa se comporte como se espera para _todos_ los conjuntos de valores de entrada).

La verificación formal es un método para evaluar que un software funcione como se espera comprobando si un modelo formal del programa coincide con la especificación formal. Un modelo formal es una representación matemática abstracta de un programa, mientras que una especificación formal define las propiedades de un programa (a saber, afirmaciones lógicas sobre la ejecución del programa).

Dado que las propiedades están escritas en términos matemáticos, es posible verificar que un modelo formal (matemático) del sistema satisfaga una especificación utilizando reglas lógicas de inferencia. Por lo tanto, se dice que las herramientas de verificación formal producen una "prueba matemática" del funcionamiento adecuado de un sistema.

A diferencia de las pruebas, la verificación formal puede utilizarse para verificar si una ejecución de contrato inteligente satisface una especificación formal para _todas_ las ejecuciones (es decir, no tiene errores) sin necesidad de ejecutarlo con datos de muestra. Esto no solo reduce el tiempo dedicado a ejecutar cientos de pruebas unitarias, sino que también es más eficaz para detectar vulnerabilidades ocultas. Dicho esto, las técnicas de verificación formal están en un espectro que depende de su dificultad de aplicación y utilidad.

[Más información sobre la verificación formal de contratos inteligentes.](/developers/docs/smart-contracts/formal-verification)

## Pruebas vs. auditorías y recompensas por errores {#testing-vs-audits-bug-bounties}

Como se ha mencionado, las pruebas rigurosas rara vez pueden garantizar la ausencia de errores en un contrato; los enfoques de verificación formal pueden proporcionar mayores garantías de corrección, pero actualmente son difíciles de usar y suponen costes considerables.

Aun así, puede aumentar aún más la posibilidad de captar vulnerabilidades en un contrato obteniendo una revisión de código independiente. Las [auditorías de contratos inteligentes](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) y [recompensas por detectar errores](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) son dos formas de hacer que otros analicen sus contratos.

Las auditorías son realizadas por auditores con experiencia en encontrar casos de fallas de seguridad y malas prácticas de desarrollo en contratos inteligentes. Una auditoría generalmente incluirá pruebas (y posiblemente verificación formal), así como una revisión manual de toda la base de código.

Por su parte, un programa de recompensa por errores generalmente involucra ofrecer una recompensa financiera a un individuo (comúnmente descrito como [hackers de sombrero blanco](https://en.wikipedia.org/wiki/White_hat_(computer_security))) que descubra una vulnerabilidad en un contrato inteligente y lo divulgue a los desarrolladores. Las recompensas por detectar errores son similares a las auditorías, ya que implican pedir a otros que ayuden a encontrar defectos en los contratos inteligentes.

La diferencia principal es que los programas de recompensas por errores están abiertos a la comunidad de desarrolladores y hackers más amplia y atraen a una amplia clase de hackers éticos y profesionales de seguridad independientes con habilidades y experiencia únicas. Esto puede ser una ventaja con respecto a las auditorías de contratos inteligentes, que dependen principalmente de equipos que pueden poseer conocimientos limitados o acotados.

## Herramientas y bibliotecas de prueba {#testing-tools-and-libraries}

### Herramientas de pruebas unitarias {#unit-testing-tools}

- **[solidity-coverage:](https://github.com/sc-forks/solidity-coverage)** _Herramienta de cobertura de código para contratos inteligentes escritos en Solidity._

- **Waffle:[ ](https://ethereum-waffle.readthedocs.io/en/latest/)**Un marco de trabajo para desarrollar y realizar pruebas de contratos inteligentes con nivel avanzado (basado en ethers.js)__.

- **[Remix Tests:](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** _Herramienta para probar contratos inteligentes de Solidity. Funciona debajo del plugin de Remix IDE "Solidity Unit Testing", que se utiliza para escribir y ejecutar casos de prueba para un contrato._

- **[OpenZeppelin Test Helpers:](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** _Biblioteca de afirmaciones para pruebas de contratos inteligentes de Ethereum. Asegúrese de que sus contratos se comporten como esperaba._

- **[Marco de pruebas unitarias de Brownie:](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** _Brownie utiliza Pytest, un marco de pruebas rico en funciones que le permite escribir pequeñas pruebas con código mínimo, escala bien para proyectos grandes y es altamente extendible._

- **[Foundry Tests:](https://github.com/foundry-rs/foundry/tree/master/forge)** _Foundry ofrece Forge, un marco de pruebas de Ethereum rápido y flexible capaz de ejecutar pruebas unitarias simples, comprobaciones de optimización de gas y fuzzing de contratos._

- **[Hardhat Tests:](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** _Marco para probar contratos inteligentes basado en ethers.js, Mocha y Chai._

- **[ApeWorx:](https://docs.apeworx.io/ape/stable/userguides/testing.html)** _Marco de desarrollo y pruebas basado en Python para contratos inteligentes dirigidos a la Máquina virtual de Ethereum._

### Herramientas de pruebas basadas en propiedades {#property-based-testing-tools}

#### Herramientas de análisis estático {#static-analysis-tools}

- **[Slither:](https://github.com/crytic/slither)** _Marco de análisis estático de Solidity basado en Python para encontrar vulnerabilidades, mejorar el funcionamiento del código y escribir análisis personalizados para contratos inteligentes._

- **[Ethlint:](https://ethlint.readthedocs.io/en/latest/)** _Linter para hacer cumplir las mejores prácticas de estilo y seguridad para el lenguaje de programación de contratos inteligentes Solidity._

#### Herramientas de análisis dinámico {#dynamic-analysis-tools}

- **[Echidna:](https://github.com/crytic/echidna/)** _Fuzzer rápido de contratos para detectar vulnerabilidades en contratos inteligentes a través de pruebas basadas en propiedades._

- **[Diligence Fuzzing:](https://consensys.net/diligence/fuzzing/)** _Herramienta automatizada de fuzzing útil para detectar violaciones de propiedades en el código de un contrato inteligente._

- **[Manticore:](https://manticore.readthedocs.io/en/latest/index.html)** _Marco de ejecución simbólica dinámico para analizar bytecode de EVM._

- **[Mythril:](https://github.com/ConsenSys/mythril-classic)** _Herramienta de evaluación de bytecode de EVM para detectar vulnerabilidades en los contratos utilizando taint analysis, concolic analysis y verificación de flujo de control._

- **[Diligence Scribble:](https://consensys.net/diligence/scribble/)** _Scribble es una herramienta de verificación de tiempo de ejecución y lenguaje de especificación que le permite anotar contratos inteligentes con propiedades que le permiten probar automáticamente los contratos con herramientas como Diligence Fuzzing o MythX._

## Tutoriales relacionados {#related-tutorials}

- [Visión general y comparación de productos de pruebas](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Cómo utilizar Echidna para probar contratos inteligentes](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Cómo utilizar Manticore para encontrar errores en contratos inteligentes](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Cómo usar Slither para encontrar errores en contratos inteligentes](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Cómo simular contratos de Solidity para pruebas](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Cómo ejecutar pruebas unitarias en Solidity usando Foundry](https://www.rareskills.io/post/foundry-testing-solidity)

## Más información {#further-reading}

- [Guía detallada para probar contratos inteligentes de Ethereum](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Cómo probar los contratos inteligentes de Ethereum](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [Guía de pruebas unitarias de MolochDAO para desarrolladores](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Cómo probar contratos inteligentes como una estrella de rock](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)
