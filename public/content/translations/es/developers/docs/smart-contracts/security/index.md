---
title: Seguridad de los contratos inteligentes
description: Una descripción general de las pautas para crear contratos inteligentes seguros en Ethereum
lang: es
---

Los contratos inteligentes son extremadamente flexibles y capaces de controlar grandes cantidades de valor y datos, al tiempo que ejecutan una lógica inmutable basada en código desplegado en la cadena de bloques. Esto ha creado un ecosistema vibrante de aplicaciones descentralizadas y sin necesidad de confianza que ofrecen muchas ventajas sobre los sistemas heredados. También representan oportunidades para los atacantes que buscan lucrarse explotando vulnerabilidades en los contratos inteligentes.

Las cadenas de bloques públicas, como [Ethereum](/), complican aún más el problema de asegurar los contratos inteligentes. El código del contrato desplegado _generalmente_ no se puede cambiar para parchear fallos de seguridad, mientras que los activos robados de los contratos inteligentes son extremadamente difíciles de rastrear y en su mayoría irrecuperables debido a la inmutabilidad.

Aunque las cifras varían, se estima que la cantidad total de valor robado o perdido debido a defectos de seguridad en los contratos inteligentes supera fácilmente los 1000 millones de dólares. Esto incluye incidentes de alto perfil, como el [hackeo de The DAO](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (3,6 millones de ETH robados, con un valor de más de 1000 millones de dólares a precios actuales), el [hackeo de la billetera multifirma de Parity](https://www.coindesk.com/markets/2017/07/19/30-million-ether-reported-stolen-due-to-parity-wallet-breach) (30 millones de dólares perdidos a manos de hackers) y el [problema de la billetera congelada de Parity](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (más de 300 millones de dólares en ETH bloqueados para siempre).

Los problemas mencionados anteriormente hacen que sea imperativo para los desarrolladores invertir esfuerzo en la creación de contratos inteligentes seguros, robustos y resilientes. La seguridad de los contratos inteligentes es un asunto serio, y uno que todo desarrollador hará bien en aprender. Esta guía cubrirá las consideraciones de seguridad para los desarrolladores de Ethereum y explorará recursos para mejorar la seguridad de los contratos inteligentes.

## Requisitos previos {#prerequisites}

Asegúrate de estar familiarizado con [los fundamentos del desarrollo de contratos inteligentes](/developers/docs/smart-contracts/) antes de abordar la seguridad.

## Pautas para construir contratos inteligentes seguros en Ethereum {#smart-contract-security-guidelines}

### 1. Diseñar controles de acceso adecuados {#design-proper-access-controls}

En los contratos inteligentes, las funciones marcadas como `public` o `external` pueden ser llamadas por cualquier cuenta de propiedad externa (EOA) o cuentas de contrato. Especificar la visibilidad pública de las funciones es necesario si desea que otros interactúen con su contrato. Sin embargo, las funciones marcadas como `private` solo pueden ser llamadas por funciones dentro del contrato inteligente, y no por cuentas externas. Dar a cada participante de la red acceso a las funciones del contrato puede causar problemas, especialmente si significa que cualquiera puede realizar operaciones sensibles (por ejemplo, la acuñación de nuevos tokens).

Para evitar el uso no autorizado de las funciones de los contratos inteligentes, es necesario implementar controles de acceso seguros. Los mecanismos de control de acceso restringen la capacidad de usar ciertas funciones en un contrato inteligente a entidades aprobadas, como las cuentas responsables de administrar el contrato. El **patrón Ownable** y el **control basado en roles** son dos patrones útiles para implementar el control de acceso en los contratos inteligentes:

#### Patrón Ownable {#ownable-pattern}

En el patrón Ownable, se establece una dirección como el "propietario" del contrato durante el proceso de creación del contrato. A las funciones protegidas se les asigna un modificador `OnlyOwner`, que asegura que el contrato autentique la identidad de la dirección que llama antes de ejecutar la función. Las llamadas a funciones protegidas desde otras direcciones que no sean el propietario del contrato siempre se revierten, evitando el acceso no deseado.

#### Control de acceso basado en roles {#role-based-access-control}

Registrar una sola dirección como `Owner` en un contrato inteligente introduce el riesgo de centralización y representa un único punto de falla. Si las claves de la cuenta del propietario se ven comprometidas, los atacantes pueden atacar el contrato en propiedad. Es por esto que usar un patrón de control de acceso basado en roles con múltiples cuentas administrativas puede ser una mejor opción.

En el control de acceso basado en roles, el acceso a funciones sensibles se distribuye entre un conjunto de participantes de confianza. Por ejemplo, una cuenta puede ser responsable de la acuñación de tokens, mientras que otra cuenta realiza actualizaciones o pausa el contrato. Descentralizar el control de acceso de esta manera elimina los puntos únicos de falla y reduce los supuestos de confianza para los usuarios.

##### Uso de billeteras multifirma {#use-require-assert-revert}

Otro enfoque para implementar un control de acceso seguro es usar una [cuenta multifirma](/developers/docs/smart-contracts/#multisig) para administrar un contrato. A diferencia de una EOA normal, las cuentas multifirma son propiedad de múltiples entidades y requieren firmas de un número mínimo de cuentas (por ejemplo, 3 de 5) para ejecutar transacciones.

El uso de una multifirma para el control de acceso introduce una capa adicional de seguridad, ya que las acciones en el contrato objetivo requieren el consentimiento de múltiples partes. Esto es particularmente útil si es necesario usar el patrón Ownable, ya que hace que sea más difícil para un atacante o un infiltrado malicioso manipular funciones sensibles del contrato con fines maliciosos.

### 2. Usar declaraciones require(), assert() y revert() para proteger las operaciones del contrato {#test-smart-contracts-and-verify-code-correctness}

Como se mencionó, cualquiera puede llamar a funciones públicas en su contrato inteligente una vez que se despliega en la cadena de bloques. Dado que no puede saber de antemano cómo interactuarán las cuentas externas con un contrato, es ideal implementar salvaguardas internas contra operaciones problemáticas antes del despliegue. Puede imponer un comportamiento correcto en los contratos inteligentes utilizando las declaraciones `require()`, `assert()` y `revert()` para desencadenar excepciones y revertir los cambios de estado si la ejecución no cumple con ciertos requisitos.

**`require()`**: `require` se definen al inicio de las funciones y aseguran que se cumplan las condiciones predefinidas antes de que se ejecute la función llamada. Una declaración `require` se puede usar para validar las entradas del usuario, verificar las variables de estado o autenticar la identidad de la cuenta que llama antes de avanzar con una función.

**`assert()`**: `assert()` se usa para detectar errores internos y verificar violaciones de "invariantes" en su código. Un invariante es una aserción lógica sobre el estado de un contrato que debería ser cierta para todas las ejecuciones de funciones. Un ejemplo de invariante es el suministro total máximo o el saldo de un contrato de token. El uso de `assert()` asegura que su contrato nunca alcance un estado vulnerable y, si lo hace, todos los cambios en las variables de estado se revierten.

**`revert()`**: `revert()` se puede usar en una declaración if-else que desencadena una excepción si no se cumple la condición requerida. El contrato de muestra a continuación usa `revert()` para proteger la ejecución de las funciones:

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // Realizar la compra.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Probar los contratos inteligentes y verificar la corrección del código {#get-independent-code-reviews}

La inmutabilidad del código que se ejecuta en la [Máquina Virtual de Ethereum](/developers/docs/evm/) significa que los contratos inteligentes exigen un mayor nivel de evaluación de calidad durante la fase de desarrollo. Probar su contrato exhaustivamente y observarlo en busca de resultados inesperados mejorará en gran medida la seguridad y protegerá a sus usuarios a largo plazo.

El método habitual es escribir pequeñas pruebas unitarias utilizando datos simulados que se espera que el contrato reciba de los usuarios. Las [pruebas unitarias](/developers/docs/smart-contracts/testing/#unit-testing) son buenas para probar la funcionalidad de ciertas funciones y asegurar que un contrato inteligente funcione como se espera.

Desafortunadamente, las pruebas unitarias son mínimamente efectivas para mejorar la seguridad de los contratos inteligentes cuando se usan de forma aislada. Una prueba unitaria podría demostrar que una función se ejecuta correctamente para datos simulados, pero las pruebas unitarias solo son tan efectivas como las pruebas que se escriben. Esto dificulta la detección de casos extremos omitidos y vulnerabilidades que podrían romper la seguridad de su contrato inteligente.

Un mejor enfoque es combinar las pruebas unitarias con pruebas basadas en propiedades realizadas mediante [análisis estático y dinámico](/developers/docs/smart-contracts/testing/#static-dynamic-analysis). El análisis estático se basa en representaciones de bajo nivel, como [gráficos de flujo de control](https://en.wikipedia.org/wiki/Control-flow_graph) y [árboles de sintaxis abstracta](https://deepsource.io/glossary/ast/) para analizar los estados del programa y las rutas de ejecución alcanzables. Mientras tanto, las técnicas de análisis dinámico, como el [fuzzing de contratos inteligentes](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), ejecutan el código del contrato con valores de entrada aleatorios para detectar operaciones que violan las propiedades de seguridad.

La [verificación formal](/developers/docs/smart-contracts/formal-verification) es otra técnica para verificar las propiedades de seguridad en los contratos inteligentes. A diferencia de las pruebas regulares, la verificación formal puede probar de manera concluyente la ausencia de errores en un contrato inteligente. Esto se logra creando una especificación formal que captura las propiedades de seguridad deseadas y demostrando que un modelo formal de los contratos se adhiere a esta especificación.

### 4. Solicitar una revisión independiente de su código {#audits}

Después de probar su contrato, es bueno pedir a otros que revisen el código fuente en busca de problemas de seguridad. Las pruebas no descubrirán todas las fallas en un contrato inteligente, pero obtener una revisión independiente aumenta la posibilidad de detectar vulnerabilidades.

#### Auditorías {#bug-bounties}

Encargar una auditoría de contrato inteligente es una forma de realizar una revisión de código independiente. Los auditores desempeñan un papel importante para garantizar que los contratos inteligentes sean seguros y estén libres de defectos de calidad y errores de diseño.

Dicho esto, debe evitar tratar las auditorías como una solución mágica. Las auditorías de contratos inteligentes no detectarán todos los errores y están diseñadas principalmente para proporcionar una ronda adicional de revisiones, lo que puede ayudar a detectar problemas que los desarrolladores pasaron por alto durante el desarrollo y las pruebas iniciales. También debe seguir las mejores prácticas para trabajar con auditores, como documentar el código correctamente y agregar comentarios en línea, para maximizar el beneficio de una auditoría de contrato inteligente.

- [Consejos y trucos para la auditoría de contratos inteligentes](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [Aproveche al máximo su auditoría](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### Recompensas por errores {#follow-smart-contract-development-best-practices}

Establecer un programa de recompensas por errores es otro enfoque para implementar revisiones de código externas. Una recompensa por errores es una recompensa financiera que se otorga a las personas (generalmente hackers de sombrero blanco) que descubren vulnerabilidades en una aplicación.

Cuando se usan correctamente, las recompensas por errores brindan a los miembros de la comunidad de hackers un incentivo para inspeccionar su código en busca de fallas críticas. Un ejemplo de la vida real es el "error de dinero infinito" que habría permitido a un atacante crear una cantidad ilimitada de ether en [Optimism](https://www.optimism.io/), un protocolo de [capa 2 (l2)](/layer-2/) que se ejecuta en Ethereum. Afortunadamente, un hacker de sombrero blanco [descubrió la falla](https://www.saurik.com/optimism.html) y notificó al equipo, [ganando un gran pago en el proceso](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Una estrategia útil es establecer el pago de un programa de recompensas por errores en proporción a la cantidad de fondos en juego. Descrito como la "[recompensa por errores escalable](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)", este enfoque proporciona incentivos financieros para que las personas divulguen las vulnerabilidades de manera responsable en lugar de explotarlas.

### 5. Seguir las mejores prácticas durante el desarrollo de contratos inteligentes {#implement-disaster-recovery-plans}

La existencia de auditorías y recompensas por errores no excusa su responsabilidad de escribir código de alta calidad. Una buena seguridad de los contratos inteligentes comienza con seguir los procesos de diseño y desarrollo adecuados:

- Almacene todo el código en un sistema de control de versiones, como git

- Realice todas las modificaciones de código a través de solicitudes de extracción (pull requests)

- Asegúrese de que las solicitudes de extracción tengan al menos un revisor independiente; si trabaja solo en un proyecto, considere buscar a otros desarrolladores e intercambiar revisiones de código

- Use un [entorno de desarrollo](/developers/docs/frameworks/) para probar, compilar y desplegar contratos inteligentes

- Ejecute su código a través de herramientas básicas de análisis de código, como [Cyfrin Aderyn](https://github.com/Cyfrin/aderyn), Mythril y Slither. Idealmente, debería hacer esto antes de que se fusione cada solicitud de extracción y comparar las diferencias en el resultado

- Asegúrese de que su código se compile sin errores y que el compilador de Solidity no emita advertencias

- Documente adecuadamente su código (usando [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) y describa los detalles sobre la arquitectura del contrato en un lenguaje fácil de entender. Esto facilitará que otros auditen y revisen su código.

### 6. Implementar planes sólidos de recuperación ante desastres {#contract-upgrades}

Diseñar controles de acceso seguros, implementar modificadores de funciones y otras sugerencias pueden mejorar la seguridad de los contratos inteligentes, pero no pueden descartar la posibilidad de exploits maliciosos. Construir contratos inteligentes seguros requiere "prepararse para el fracaso" y tener un plan de respaldo para responder de manera efectiva a los ataques. Un plan de recuperación ante desastres adecuado incorporará algunos o todos los siguientes componentes:

#### Actualizaciones de contratos {#emergency-stops}

Si bien los contratos inteligentes de Ethereum son inmutables por defecto, es posible lograr cierto grado de mutabilidad mediante el uso de patrones de actualización. La actualización de contratos es necesaria en los casos en que una falla crítica hace que su antiguo contrato sea inutilizable y el despliegue de una nueva lógica es la opción más factible.

Los mecanismos de actualización de contratos funcionan de manera diferente, pero el "patrón proxy" es uno de los enfoques más populares para actualizar contratos inteligentes. Los [patrones proxy](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) dividen el estado y la lógica de una aplicación entre _dos_ contratos. El primer contrato (llamado 'contrato proxy') almacena variables de estado (por ejemplo, saldos de usuarios), mientras que el segundo contrato (llamado 'contrato lógico') contiene el código para ejecutar las funciones del contrato.

Las cuentas interactúan con el contrato proxy, que envía todas las llamadas de función al contrato lógico utilizando la llamada de bajo nivel [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries). A diferencia de una llamada de mensaje normal, `delegatecall()` asegura que el código que se ejecuta en la dirección del contrato lógico se ejecute en el contexto del contrato que llama. Esto significa que el contrato lógico siempre escribirá en el almacenamiento del proxy (en lugar de en su propio almacenamiento) y se preservarán los valores originales de `msg.sender` y `msg.value`.

Delegar llamadas al contrato lógico requiere almacenar su dirección en el almacenamiento del contrato proxy. Por lo tanto, actualizar la lógica del contrato es solo cuestión de desplegar otro contrato lógico y almacenar la nueva dirección en el contrato proxy. Como las llamadas posteriores al contrato proxy se enrutan automáticamente al nuevo contrato lógico, habría "actualizado" el contrato sin modificar realmente el código.

[Más sobre la actualización de contratos](/developers/docs/smart-contracts/upgrading/).

#### Paradas de emergencia {#event-monitoring}

Como se mencionó, las auditorías y pruebas exhaustivas no pueden descubrir todos los errores en un contrato inteligente. Si aparece una vulnerabilidad en su código después del despliegue, parchearla es imposible ya que no puede cambiar el código que se ejecuta en la dirección del contrato. Además, los mecanismos de actualización (por ejemplo, los patrones proxy) pueden tardar en implementarse (a menudo requieren la aprobación de diferentes partes), lo que solo les da a los atacantes más tiempo para causar más daño.

La opción nuclear es implementar una función de "parada de emergencia" que bloquee las llamadas a funciones vulnerables en un contrato. Las paradas de emergencia suelen comprender los siguientes componentes:

1. Una variable booleana global que indica si el contrato inteligente está en un estado detenido o no. Esta variable se establece en `false` al configurar el contrato, pero se revertirá a `true` una vez que el contrato se detenga.

2. Funciones que hacen referencia a la variable booleana en su ejecución. Dichas funciones son accesibles cuando el contrato inteligente no está detenido y se vuelven inaccesibles cuando se activa la función de parada de emergencia.

3. Una entidad que tiene acceso a la función de parada de emergencia, que establece la variable booleana en `true`. Para evitar acciones maliciosas, las llamadas a esta función se pueden restringir a una dirección de confianza (por ejemplo, el propietario del contrato).

Una vez que el contrato activa la parada de emergencia, ciertas funciones no se podrán llamar. Esto se logra envolviendo funciones seleccionadas en un modificador que hace referencia a la variable global. A continuación se muestra [un ejemplo](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) que describe una implementación de este patrón en los contratos:

```solidity
// Este código no ha sido auditado profesionalmente y no ofrece garantías sobre su seguridad o corrección. Úselo bajo su propio riesgo.

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
        // Verificar la autorización de msg.sender aquí
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // La lógica de depósito ocurre aquí
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // El retiro de emergencia ocurre aquí
    }
}
```

Este ejemplo muestra las características básicas de las paradas de emergencia:

- `isStopped` es un booleano que se evalúa como `false` al principio y `true` cuando el contrato entra en modo de emergencia.

- Los modificadores de función `onlyWhenStopped` y `stoppedInEmergency` verifican la variable `isStopped`. `stoppedInEmergency` se usa para controlar funciones que deberían ser inaccesibles cuando el contrato es vulnerable (por ejemplo, `deposit()`). Las llamadas a estas funciones simplemente se revertirán.

`onlyWhenStopped` se usa para funciones que deberían poder llamarse durante una emergencia (por ejemplo, `emergencyWithdraw()`). Dichas funciones pueden ayudar a resolver la situación, de ahí su exclusión de la lista de "funciones restringidas".

El uso de una funcionalidad de parada de emergencia proporciona una medida provisional eficaz para hacer frente a vulnerabilidades graves en su contrato inteligente. Sin embargo, aumenta la necesidad de que los usuarios confíen en que los desarrolladores no la activarán por razones egoístas. Con este fin, descentralizar el control de la parada de emergencia, ya sea sometiéndola a un mecanismo de voto en cadena, un bloqueo de tiempo (timelock) o la aprobación de una billetera multifirma, son posibles soluciones.

#### Monitoreo de eventos {#design-secure-governance-systems}

Los [eventos](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) le permiten rastrear llamadas a funciones de contratos inteligentes y monitorear cambios en las variables de estado. Es ideal programar su contrato inteligente para que emita un evento cada vez que alguna parte realice una acción crítica para la seguridad (por ejemplo, el retiro de fondos).

Registrar eventos y monitorearlos fuera de la cadena proporciona información sobre las operaciones del contrato y ayuda a un descubrimiento más rápido de acciones maliciosas. Esto significa que su equipo puede responder más rápido a los hackeos y tomar medidas para mitigar el impacto en los usuarios, como pausar funciones o realizar una actualización.

También puede optar por una herramienta de monitoreo lista para usar que reenvíe alertas automáticamente cada vez que alguien interactúe con sus contratos. Estas herramientas le permitirán crear alertas personalizadas basadas en diferentes desencadenantes, como el volumen de transacciones, la frecuencia de las llamadas a funciones o las funciones específicas involucradas. Por ejemplo, podría programar una alerta que llegue cuando la cantidad retirada en una sola transacción cruce un umbral particular.

### 7. Diseñar sistemas de gobernanza seguros {#reduce-code-complexity}

Es posible que desee descentralizar su aplicación cediendo el control de los contratos inteligentes principales a los miembros de la comunidad. En este caso, el sistema de contratos inteligentes incluirá un módulo de gobernanza: un mecanismo que permite a los miembros de la comunidad aprobar acciones administrativas a través de un sistema de gobernanza en cadena. Por ejemplo, una propuesta para actualizar un contrato proxy a una nueva implementación puede ser sometida a voto por los titulares de tokens.

La gobernanza descentralizada puede ser beneficiosa, especialmente porque alinea los intereses de los desarrolladores y los usuarios finales. Sin embargo, los mecanismos de gobernanza de los contratos inteligentes pueden introducir nuevos riesgos si se implementan incorrectamente. Un escenario plausible es si un atacante adquiere un enorme poder de voto (medido en la cantidad de tokens que posee) al obtener un [préstamo relámpago](/defi/#flash-loans) y aprueba una propuesta maliciosa.

Una forma de prevenir problemas relacionados con la gobernanza en cadena es [usar un bloqueo de tiempo (timelock)](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Un bloqueo de tiempo evita que un contrato inteligente ejecute ciertas acciones hasta que pase una cantidad de tiempo específica. Otras estrategias incluyen asignar un "peso de voto" a cada token en función de cuánto tiempo ha estado bloqueado, o medir el poder de voto de una dirección en un período histórico (por ejemplo, 2-3 bloques en el pasado) en lugar del bloque actual. Ambos métodos reducen la posibilidad de acumular rápidamente poder de voto para influir en los votos en cadena.

Más sobre el [diseño de sistemas de gobernanza seguros](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), los [diferentes mecanismos de voto en las DAO](https://hackernoon.com/governance-is-the-holy-grail-for-daos) y [los vectores de ataque comunes a las DAO que aprovechan las DeFi](https://dacian.me/dao-governance-defi-attacks) en los enlaces compartidos.

### 8. Reducir la complejidad del código al mínimo {#mitigate-common-smart-contract-vulnerabilities}

Los desarrolladores de software tradicionales están familiarizados con el principio KISS ("mantenlo simple, estúpido"), que desaconseja introducir una complejidad innecesaria en el diseño de software. Esto sigue el pensamiento arraigado de que "los sistemas complejos fallan de formas complejas" y son más susceptibles a errores costosos.

Mantener las cosas simples es de particular importancia al escribir contratos inteligentes, dado que los contratos inteligentes controlan potencialmente grandes cantidades de valor. Un consejo para lograr la simplicidad al escribir contratos inteligentes es reutilizar bibliotecas existentes, como [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/), siempre que sea posible. Debido a que estas bibliotecas han sido auditadas y probadas exhaustivamente por los desarrolladores, su uso reduce las posibilidades de introducir errores al escribir nuevas funcionalidades desde cero.

Otro consejo común es escribir funciones pequeñas y mantener los contratos modulares dividiendo la lógica de negocio en múltiples contratos. Escribir un código más simple no solo reduce la superficie de ataque en un contrato inteligente, sino que también facilita el razonamiento sobre la corrección del sistema en general y la detección temprana de posibles errores de diseño.

### 9. Defenderse contra las vulnerabilidades comunes de los contratos inteligentes {#reentrancy}

#### Reentrada {#integer-underflows-and-overflows}

La EVM no permite la concurrencia, lo que significa que dos contratos involucrados en una llamada de mensaje no pueden ejecutarse simultáneamente. Una llamada externa pausa la ejecución y la memoria del contrato que llama hasta que la llamada regresa, momento en el cual la ejecución continúa normalmente. Este proceso se puede describir formalmente como la transferencia del [flujo de control](https://www.computerhope.com/jargon/c/contflow.htm) a otro contrato.

Aunque en su mayoría es inofensivo, transferir el flujo de control a contratos no confiables puede causar problemas, como la reentrada. Un ataque de reentrada ocurre cuando un contrato malicioso vuelve a llamar a un contrato vulnerable antes de que se complete la invocación de la función original. Este tipo de ataque se explica mejor con un ejemplo.

Considere un contrato inteligente simple ('Victim') que permite a cualquiera depositar y retirar ether:

```solidity
// Este contrato es vulnerable. No lo use en producción

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

Este contrato expone una función `withdraw()` para permitir a los usuarios retirar ETH depositado previamente en el contrato. Al procesar un retiro, el contrato realiza las siguientes operaciones:

1. Verifica el saldo de ETH del usuario
2. Envía fondos a la dirección que llama
3. Restablece su saldo a 0, evitando retiros adicionales del usuario

La función `withdraw()` en el contrato `Victim` sigue un patrón de "verificaciones-interacciones-efectos" (checks-interactions-effects). _Verifica_ si se cumplen las condiciones necesarias para la ejecución (es decir, el usuario tiene un saldo de ETH positivo) y realiza la _interacción_ enviando ETH a la dirección de la persona que llama, antes de aplicar los _efectos_ de la transacción (es decir, reducir el saldo del usuario).

Si se llama a `withdraw()` desde una cuenta de propiedad externa (EOA), la función se ejecuta como se espera: `msg.sender.call.value()` envía ETH a la persona que llama. Sin embargo, si `msg.sender` es una cuenta de contrato inteligente que llama a `withdraw()`, el envío de fondos mediante `msg.sender.call.value()` también activará la ejecución del código almacenado en esa dirección.

Imagine que este es el código desplegado en la dirección del contrato:

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
2. Depositar 1 ETH en el contrato Victim
3. Retirar el 1 ETH almacenado en el contrato inteligente

No hay nada de malo aquí, excepto que `Attacker` tiene otra función que llama a `withdraw()` en `Victim` nuevamente si el gas sobrante del `msg.sender.call.value` entrante es superior a 40,000. Esto le da a `Attacker` la capacidad de reentrar en `Victim` y retirar más fondos _antes_ de que se complete la primera invocación de `withdraw`. El ciclo se ve así:

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

El resumen es que debido a que el saldo de la persona que llama no se establece en 0 hasta que se completa la ejecución de la función, las invocaciones posteriores tendrán éxito y permitirán a la persona que llama retirar su saldo varias veces. Este tipo de ataque se puede usar para drenar los fondos de un contrato inteligente, como lo que sucedió en el [hackeo de la DAO de 2016](https://www.coindesk.com/learn/understanding-the-dao-attack). Los ataques de reentrada siguen siendo un problema crítico para los contratos inteligentes en la actualidad, como muestran las [listas públicas de exploits de reentrada](https://github.com/pcaversaccio/reentrancy-attacks).

##### Cómo prevenir los ataques de reentrada {#oracle-manipulation}

Un enfoque para lidiar con la reentrada es seguir el [patrón de verificaciones-efectos-interacciones](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern). Este patrón ordena la ejecución de las funciones de manera que el código que realiza las verificaciones necesarias antes de avanzar con la ejecución va primero, seguido del código que manipula el estado del contrato, y el código que interactúa con otros contratos o EOA llega al final.

El patrón de verificaciones-efectos-interacciones se usa en una versión revisada del contrato `Victim` que se muestra a continuación:

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

Este contrato realiza una _verificación_ del saldo del usuario, aplica los _efectos_ de la función `withdraw()` (restableciendo el saldo del usuario a 0) y procede a realizar la _interacción_ (enviando ETH a la dirección del usuario). Esto asegura que el contrato actualice su almacenamiento antes de la llamada externa, eliminando la condición de reentrada que permitió el primer ataque. El contrato `Attacker` aún podría volver a llamar a `NoLongerAVictim`, pero dado que `balances[msg.sender]` se ha establecido en 0, los retiros adicionales arrojarán un error.

Otra opción es usar un bloqueo de exclusión mutua (comúnmente descrito como un "mutex") que bloquea una parte del estado de un contrato hasta que se completa la invocación de una función. Esto se implementa utilizando una variable booleana que se establece en `true` antes de que se ejecute la función y se revierte a `false` después de que se realiza la invocación. Como se ve en el ejemplo a continuación, el uso de un mutex protege una función contra llamadas recursivas mientras la invocación original aún se está procesando, deteniendo efectivamente la reentrada.

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
    // Esta función está protegida por un mutex, por lo que las llamadas reentrantes desde dentro de `msg.sender.call` no pueden volver a llamar a `withdraw`.
    //  La declaración `return` se evalúa como `true` pero aún evalúa la declaración `locked = false` en el modificador
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

También puede usar un sistema de [pagos de extracción (pull payments)](https://docs.openzeppelin.com/contracts/5.x/api/utils#security#PullPayment) que requiere que los usuarios retiren fondos de los contratos inteligentes, en lugar de un sistema de "pagos de inserción (push payments)" que envía fondos a las cuentas. Esto elimina la posibilidad de activar inadvertidamente código en direcciones desconocidas (y también puede prevenir ciertos ataques de denegación de servicio).

#### Desbordamientos de enteros (underflows y overflows) {#smart-contract-security-resources-for-developers}

Un desbordamiento de enteros (overflow) ocurre cuando los resultados de una operación aritmética caen fuera del rango aceptable de valores, lo que hace que "dé la vuelta" al valor representable más bajo. Por ejemplo, un `uint8` solo puede almacenar valores de hasta 2^8-1=255. Las operaciones aritméticas que dan como resultado valores superiores a `255` se desbordarán y restablecerán `uint` a `0`, de manera similar a cómo el odómetro de un automóvil se restablece a 0 una vez que alcanza el kilometraje máximo (999999).

Los desbordamientos por debajo (underflows) de enteros ocurren por razones similares: los resultados de una operación aritmética caen por debajo del rango aceptable. Supongamos que intentó decrementar `0` en un `uint8`, el resultado simplemente daría la vuelta al valor representable máximo (`255`).

Tanto los desbordamientos por encima como por debajo de enteros pueden provocar cambios inesperados en las variables de estado de un contrato y dar como resultado una ejecución no planificada. A continuación se muestra un ejemplo que muestra cómo un atacante puede explotar el desbordamiento aritmético en un contrato inteligente para realizar una operación no válida:

```
pragma solidity ^0.7.6;

// Este contrato está diseñado para actuar como una bóveda de tiempo.
// El usuario puede depositar en este contrato pero no puede retirar durante al menos una semana.
// El usuario también puede extender el tiempo de espera más allá del período de espera de 1 semana.

/*
1. Desplegar TimeLock
2. Desplegar Attack con la dirección de TimeLock
3. Llamar a Attack.attack enviando 1 ether. Inmediatamente podrá
   retirar su ether.

¿Qué pasó?
Attack causó que TimeLock.lockTime se desbordara y pudo retirar
antes del período de espera de 1 semana.
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
        si t = tiempo de bloqueo actual, entonces necesitamos encontrar x tal que
        x + t = 2**256 = 0
        entonces x = -t
        2**256 = type(uint).max + 1
        entonces x = type(uint).max + 1 - t
        */
        timeLock.increaseLockTime(
            type(uint).max + 1 - timeLock.lockTime(address(this))
        );
        timeLock.withdraw();
    }
}
```

##### Cómo prevenir los desbordamientos de enteros (underflows y overflows) {#code-analysis-tools}

A partir de la versión 0.8.0, el compilador de Solidity rechaza el código que da como resultado desbordamientos de enteros (underflows y overflows). Sin embargo, los contratos compilados con una versión de compilador inferior deben realizar verificaciones en funciones que involucren operaciones aritméticas o usar una biblioteca (por ejemplo, [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)) que verifique el desbordamiento (underflow/overflow).

#### Manipulación de oráculos {#smart-contract-monitoring-tools}

Los [oráculos](/developers/docs/oracles/) obtienen información fuera de la cadena y la envían en cadena para que la usen los contratos inteligentes. Con los oráculos, puede diseñar contratos inteligentes que interoperen con sistemas fuera de la cadena, como los mercados de capitales, ampliando enormemente su aplicación.

Pero si el oráculo se corrompe y envía información incorrecta en cadena, los contratos inteligentes se ejecutarán en función de entradas erróneas, lo que puede causar problemas. Esta es la base del "problema del oráculo", que se refiere a la tarea de asegurarse de que la información de un oráculo de blockchain sea precisa, esté actualizada y sea oportuna.

Una preocupación de seguridad relacionada es el uso de un oráculo en cadena, como un intercambio descentralizado, para obtener el precio al contado de un activo. Las plataformas de préstamos en la industria de las [finanzas descentralizadas (DeFi)](/defi/) a menudo hacen esto para determinar el valor del colateral de un usuario para determinar cuánto pueden pedir prestado.

Los precios de los DEX a menudo son precisos, en gran parte debido a que los arbitrajistas restauran la paridad en los mercados. Sin embargo, están abiertos a la manipulación, particularmente si el oráculo en cadena calcula los precios de los activos en función de patrones de negociación históricos (como suele ser el caso).

Por ejemplo, un atacante podría inflar artificialmente el precio al contado de un activo obteniendo un préstamo relámpago justo antes de interactuar con su contrato de préstamo. Consultar el DEX por el precio del activo devolvería un valor más alto de lo normal (debido a la gran "orden de compra" del atacante que sesga la demanda del activo), lo que le permitiría pedir prestado más de lo que debería. Tales "ataques de préstamos relámpago" se han utilizado para explotar la dependencia de los oráculos de precios entre las aplicaciones DeFi, costando a los protocolos millones en fondos perdidos.

##### Cómo prevenir la manipulación de oráculos {#smart-contract-administration-tools}

El requisito mínimo para [evitar la manipulación de oráculos](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) es usar una red de oráculos descentralizada que consulte información de múltiples fuentes para evitar puntos únicos de falla. En la mayoría de los casos, los oráculos descentralizados tienen incentivos criptoeconómicos incorporados para alentar a los nodos del oráculo a informar información correcta, haciéndolos más seguros que los oráculos centralizados.

Si planea consultar un oráculo en cadena para conocer los precios de los activos, considere usar uno que implemente un mecanismo de precio promedio ponderado en el tiempo (TWAP). Un [oráculo TWAP](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) consulta el precio de un activo en dos puntos diferentes en el tiempo (que puede modificar) y calcula el precio al contado en función del promedio obtenido. Elegir períodos de tiempo más largos protege su protocolo contra la manipulación de precios, ya que las grandes órdenes ejecutadas recientemente no pueden afectar los precios de los activos.

## Recursos de seguridad de contratos inteligentes para desarrolladores {#smart-contract-auditing-services}

### Herramientas para analizar contratos inteligentes y verificar la corrección del código {#bug-bounty-platforms}

- **[Herramientas y bibliotecas de prueba](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _Colección de herramientas y bibliotecas estándar de la industria para realizar pruebas unitarias, análisis estático y análisis dinámico en contratos inteligentes._

- **[Herramientas de verificación formal](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _Herramientas para verificar la corrección funcional en contratos inteligentes y comprobar invariantes._

- **[Servicios de auditoría de contratos inteligentes](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _Lista de organizaciones que proporcionan servicios de auditoría de contratos inteligentes para proyectos de desarrollo de Ethereum._

- **[Plataformas de recompensas por errores](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _Plataformas para coordinar recompensas por errores y recompensar la divulgación responsable de vulnerabilidades críticas en contratos inteligentes._

- **[Fork Checker](https://forkchecker.hashex.org/)** - _Una herramienta en línea gratuita para comprobar toda la información disponible sobre un contrato bifurcado._

- **[ABI Encoder](https://abi.hashex.org/)** - _Un servicio en línea gratuito para codificar las funciones de su contrato de Solidity y los argumentos del constructor._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _Analizador estático de Solidity, que recorre los árboles de sintaxis abstracta (AST) para identificar vulnerabilidades sospechosas e imprimir los problemas en un formato markdown fácil de consumir._

### Herramientas para monitorear contratos inteligentes {#common-smart-contract-vulnerabilities-and-exploits}

- **[Tenderly Real-Time Alerting](https://tenderly.co/monitoring)** - _Una herramienta para recibir notificaciones en tiempo real cuando ocurren eventos inusuales o inesperados en sus contratos inteligentes o billeteras._

### Herramientas para la administración segura de contratos inteligentes {#challenges-for-learning-smart-contract-security}

- **[Safe](https://safe.global/)** - _Billetera de contrato inteligente que se ejecuta en Ethereum y que requiere que un número mínimo de personas apruebe una transacción antes de que pueda ocurrir (M de N)._

- **[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)** - _Bibliotecas de contratos para implementar características administrativas, incluyendo la propiedad del contrato, actualizaciones, controles de acceso, gobernanza, capacidad de pausa y más._

### Servicios de auditoría de contratos inteligentes {#smart-contract-security-best-practices}

- **[ConsenSys Diligence](https://diligence.consensys.io/)** - _Servicio de auditoría de contratos inteligentes que ayuda a los proyectos en todo el ecosistema de la cadena de bloques a garantizar que sus protocolos estén listos para el lanzamiento y construidos para proteger a los usuarios._

- **[CertiK](https://www.certik.com/)** - _Firma de seguridad de cadena de bloques pionera en el uso de tecnología de verificación formal de vanguardia en contratos inteligentes y redes de cadena de bloques._

- **[Trail of Bits](https://www.trailofbits.com/)** - _Empresa de ciberseguridad que combina la investigación de seguridad con una mentalidad de atacante para reducir el riesgo y fortalecer el código._

- **[PeckShield](https://peckshield.com/)** - _Empresa de seguridad de cadena de bloques que ofrece productos y servicios para la seguridad, privacidad y usabilidad de todo el ecosistema de la cadena de bloques._

- **[QuantStamp](https://quantstamp.com/)** - _Servicio de auditoría que facilita la adopción generalizada de la tecnología de cadena de bloques a través de servicios de evaluación de seguridad y riesgos._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _Empresa de seguridad de contratos inteligentes que proporciona auditorías de seguridad para sistemas distribuidos._

- **[Runtime Verification](https://runtimeverification.com/)** - _Empresa de seguridad especializada en el modelado y la verificación formal de contratos inteligentes._

- **[Hacken](https://hacken.io)** - _Auditor de ciberseguridad de Web3 que aporta un enfoque de 360 grados a la seguridad de la cadena de bloques._

- **[Nethermind](https://www.nethermind.io/smart-contract-audits)** - _Servicios de auditoría de Solidity y Cairo, que garantizan la integridad de los contratos inteligentes y la seguridad de los usuarios en Ethereum y Starknet._

- **[HashEx](https://hashex.org/)** - _HashEx se centra en la auditoría de cadenas de bloques y contratos inteligentes para garantizar la seguridad de las criptomonedas, proporcionando servicios como el desarrollo de contratos inteligentes, pruebas de penetración y consultoría de cadenas de bloques._

- **[Code4rena](https://code4rena.com/)** - _Plataforma de auditoría competitiva que incentiva a los expertos en seguridad de contratos inteligentes a encontrar vulnerabilidades y ayudar a hacer que Web3 sea más segura._

- **[CodeHawks](https://codehawks.com/)** - _Plataforma de auditorías competitivas que organiza competiciones de auditoría de contratos inteligentes para investigadores de seguridad._

- **[Cyfrin](https://cyfrin.io)** - _Potencia de seguridad de Web3, que incuba la seguridad cripto a través de productos y servicios de auditoría de contratos inteligentes._

- **[ImmuneBytes](https://immunebytes.com/smart-contract-audit/)** - _Firma de seguridad de Web3 que ofrece auditorías de seguridad para sistemas de cadena de bloques a través de un equipo de auditores experimentados y las mejores herramientas de su clase._

- **[Oxorio](https://oxor.io/)** - _Auditorías de contratos inteligentes y servicios de seguridad de cadena de bloques con experiencia en EVM, Solidity, ZK y tecnología intercadena para empresas cripto y proyectos de finanzas descentralizadas (DeFi)._

- **[Inference](https://inference.ag/)** - _Empresa de auditoría de seguridad, especializada en la auditoría de contratos inteligentes para cadenas de bloques basadas en EVM. Gracias a sus auditores expertos, identifican problemas potenciales y sugieren soluciones viables para solucionarlos antes del despliegue._

### Plataformas de recompensas por errores {#tutorials-on-smart-contract-security}

- **[Immunefi](https://immunefi.com/)** - _Plataforma de recompensas por errores para contratos inteligentes y proyectos DeFi, donde los investigadores de seguridad revisan el código, divulgan vulnerabilidades, reciben pagos y hacen que las cripto sean más seguras._

- **[HackerOne](https://www.hackerone.com/)** - _Plataforma de coordinación de vulnerabilidades y recompensas por errores que conecta a las empresas con probadores de penetración e investigadores de ciberseguridad._

- **[HackenProof](https://hackenproof.com/)** - _Plataforma experta de recompensas por errores para proyectos cripto (DeFi, contratos inteligentes, billeteras, CEX y más), donde los profesionales de seguridad brindan servicios de clasificación y los investigadores reciben pagos por informes de errores relevantes y verificados._

-  **[Sherlock](https://www.sherlock.xyz/)** - _Asegurador en Web3 para la seguridad de contratos inteligentes, con pagos para auditores gestionados a través de contratos inteligentes para garantizar que los errores relevantes se paguen de manera justa._

-  **[CodeHawks](https://www.codehawks.com/)** - _Plataforma competitiva de recompensas por errores donde los auditores participan en concursos y desafíos de seguridad, y (pronto) en sus propias auditorías privadas._

### Publicaciones de vulnerabilidades y exploits conocidos de contratos inteligentes

- **[ConsenSys: Ataques conocidos a contratos inteligentes](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/)** - _Explicación amigable para principiantes de las vulnerabilidades de contratos más significativas, con código de muestra para la mayoría de los casos._

- **[Registro SWC](https://swcregistry.io/)** - _Lista seleccionada de elementos de Enumeración de Debilidades Comunes (CWE) que se aplican a los contratos inteligentes de Ethereum._

- **[Rekt](https://rekt.news/)** - _Publicación actualizada regularmente de hackeos y exploits cripto de alto perfil, junto con informes post-mortem detallados._

### Desafíos para aprender sobre la seguridad de los contratos inteligentes

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _Lista seleccionada de juegos de guerra de seguridad de cadena de bloques, desafíos y competiciones de [Captura la bandera (Capture The Flag)](https://www.webopedia.com/definitions/ctf-event/amp/) y artículos de soluciones._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _Juego de guerra para aprender la seguridad ofensiva de los contratos inteligentes DeFi y desarrollar habilidades en la búsqueda de errores y la auditoría de seguridad._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _Juego de guerra basado en Web3/Solidity donde cada nivel es un contrato inteligente que necesita ser 'hackeado'._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _Desafío de hackeo de contratos inteligentes, ambientado en una aventura de fantasía. La finalización exitosa del desafío también da acceso a un programa privado de recompensas por errores._

### Mejores prácticas para asegurar contratos inteligentes

- **[ConsenSys: Mejores prácticas de seguridad de contratos inteligentes de Ethereum](https://consensys.github.io/smart-contract-best-practices/)** - _Lista completa de pautas para asegurar los contratos inteligentes de Ethereum._

- **[Nascent: Kit de herramientas de seguridad simple](https://github.com/nascentxyz/simple-security-toolkit)** - _Colección de guías prácticas centradas en la seguridad y listas de verificación para el desarrollo de contratos inteligentes._

- **[Patrones de Solidity](https://fravoll.github.io/solidity-patterns/)** - _Útil recopilación de patrones seguros y mejores prácticas para el lenguaje de programación de contratos inteligentes Solidity._

- **[Documentación de Solidity: Consideraciones de seguridad](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Pautas para escribir contratos inteligentes seguros con Solidity._

- **[Estándar de verificación de seguridad de contratos inteligentes](https://github.com/securing/SCSVS)** - _Lista de verificación de catorce partes creada para estandarizar la seguridad de los contratos inteligentes para desarrolladores, arquitectos, revisores de seguridad y proveedores._

- **[Aprenda sobre seguridad y auditoría de contratos inteligentes](https://updraft.cyfrin.io/courses/security)** - _El curso definitivo de seguridad y auditoría de contratos inteligentes, creado para desarrolladores de contratos inteligentes que buscan mejorar sus mejores prácticas de seguridad y convertirse en investigadores de seguridad._

### Tutoriales sobre seguridad de contratos inteligentes

- [Cómo escribir contratos inteligentes seguros](/developers/tutorials/secure-development-workflow/)

- [Cómo usar Slither para encontrar errores en contratos inteligentes](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Cómo usar Manticore para encontrar errores en contratos inteligentes](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Pautas de seguridad de contratos inteligentes](/developers/tutorials/smart-contract-security-guidelines/)

- [Cómo integrar de forma segura su contrato de token con tokens arbitrarios](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - Curso completo de seguridad y auditoría de contratos inteligentes](https://updraft.cyfrin.io/courses/security)