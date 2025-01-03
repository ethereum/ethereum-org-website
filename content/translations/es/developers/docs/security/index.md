---
title: Seguridad
description: Consideraciones de seguridad para los desarrolladores de Ethereum
lang: es
---

Los contratos Inteligentes de Ethereum son extremadamente flexibles, capaces de contener grandes cantidades de tokens (A menudo más de $1B) y ejecutar una lógica inmutable basada en el código de contrato inteligente previamente desplegado. Aunque esto ha creado un ecosistema vibrante y creativo de contratos inteligentes sin confianza e interconectados, es también el ecosistema perfecto para atraer atacantes que buscan beneficios explotando las vulnerabilidades de los contratos inteligentes y los comportamientos inesperados en Ethereum. El código del contrato inteligente _normalmente_ no se puede modificar para "poner parches" a los fallos de seguridad, por lo que los activos robados de contratos inteligentes son irrecuperables, y los activos robados son extremadamente difíciles de rastrear. La cantidad total de valor robado o perdido debido a problemas de contratos inteligentes asciende fácilmente a $1B USD. Algunos de los mayores debido a errores de codificación de contrato inteligente incluyen:

- [Parity multi-sig issue #1: $30 M perdidos](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach)
- [Problema de paridad multi-sig #2: $300M bloqueados](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether)
- [TheDAO hack, 3.6M ETH! Más de $1B en los precios ETH de hoy](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/)

## Requisitos previos {#prerequisites}

Esto cubrirá la seguridad de los contratos inteligentes, así que asegúrate de que estás familiarizado con los [contratos inteligentes](/developers/docs/smart-contracts/) antes de abordar la seguridad.

## Cómo escribir un código de contrato inteligente más seguro {#how-to-write-more-secure-smart-contract-code}

Antes de lanzar cualquier código para la red principal, es importante tomar las precauciones suficientes para proteger cualquier recurso de valor que se confíe a su contrato inteligente. En este artículo abordaremos algunos ataques específicos, proporcionaremos recursos para aprender sobre más tipos de ataque y te informaremos acerca de algunas herramientas básicas y prácticas recomendadas para asegurarte de que tus contratos funcionen de forma correcta y segura.

## Las auditorías no siempre son milagrosas {#audits-are-not-a-silver-bullet}

Hace algunos años, las herramientas para escribir, compilar, probar e implementar contratos inteligentes eran muy nuevas, lo que llevó a muchos proyectos a escribir código de Solidity de maneras imprecisas. A continuación, se lo mostraban a un auditor para que investigase el código y garantizase que funcionaría con el nivel de seguridad esperado. En 2020, los procesos de desarrollo y las herramientas que apoyan la redacción con Solidity son significativamente mejores. Aprovechar estas prácticas recomendadas no solo asegura que tu proyecto sea más fácil de gestionar, sino que es una parte vital de la seguridad de tu proyecto. Una auditoría al final de la escritura de tu contrato inteligente ya no basta como única consideración de seguridad. La seguridad comienza antes de escribir la primera línea de código del contrato inteligente, **la seguridad comienza con el diseño y los procesos de desarrollo adecuados**.

## Proceso de desarrollo de contratos inteligentes {#smart-contract-development-process}

Como mínimo:

- Todo el código almacenado en un sistema de control de versiones, como git
- Todas las modificaciones de código hechas a través de solicitudes de pull
- Todas las solicitudes de pull tienen, al menos, un revisor. _Si tu proyecto es individual, plantéate encontrar a otro autor de proyecto individual para realizar revisiones de código._
- Un solo comando compila, implementa y ejecuta un conjunto de pruebas con respecto a tu código mediante un entorno de desarrollo Ethereum
- Has ejecutado tu código a través de herramientas de análisis de código básicas como Mythril y Slither, idealmente antes de que cada solicitud de pull se fusione, comparando diferencias en la salida
- Solidity no emite ninguna advertencia del compilador
- Tu código está bien documentado

Hay mucho más que decir sobre el proceso de desarrollo, pero estos puntos conforman un buen punto de partida. Para obtener más artículos y explicaciones detalladas, consulta la [lista de verificación de calidad de proceso proporcionada por DeFiSafety](https://docs.defisafety.com/audit-process-documentation/process-quality-audit-process). [DefiSafety](https://defisafety.com/) es un servicio público no oficial que publica reseñas de varias dapps de Ethereum grandes y públicas. Parte del sistema de calificación de DeFiSafety incluye cómo se adhiere el proyecto a esta lista de verificación de calidad de proceso. Siguiendo estos procesos:

- Producirás un código más seguro, mediante pruebas automatizadas reproducibles
- Los clientes podrán revisar tu proyecto de forma más eficaz
- Incorporación más fácil de nuevos desarrolladores
- Permite a los desarrolladores iterar, probar y obtener comentarios sobre las modificaciones
- Es menos probable que tu proyecto experimente regresiones

## Ataques y vulnerabilidades {#attacks-and-vulnerabilities}

Ahora que estás escribiendo código de Solidity mediante un proceso de desarrollo eficiente, veamos algunas vulnerabilidades comunes de Solidity para ver qué puede fallar.

### Re-entrancy {#re-entrancy}

El ''Re-entrancy'' es uno de los mayores y más importantes problemas de seguridad a tener en cuenta al desarrollar contratos inteligentes. Mientras que la EVM no puede ejecutar varios contratos al mismo tiempo, un contrato que llama a un contrato diferente pausa el estado de ejecución y memoria del contrato de llamada hasta que la llamada regrese, en cuyo punto la ejecución continúa normalmente. Esta pausa y el consiguiente reinicio puede crear una vulnerabilidad conocida como "Re-entrancy".

Esta es una versión simple de un contrato que es vulnerable a la "Re-entrancy":

```solidity
// ESTE CONTRATO TIENE VULNERABILIDAD INTENCIONAL, NO COPIAR
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

Para permitir a un usuario retirar ETH que ha almacenado previamente en el contrato, esta función

1. Lee cuánto saldo tiene un usuario
2. Envía la cantidad del saldo en ETH
3. Reinicia su saldo a 0, para que no puedan retirar su saldo de nuevo.

Si se llama desde una cuenta normal (como tu propia cuenta MetaMask), esta función, como se esperaba, msg.sender.call.value() simplemente envía su cuenta ETH. Sin embargo, los contratos inteligentes también pueden realizar llamadas. Si un contrato malicioso es el que llama a `retiro ()`, msg.sender.call. alue() no sólo enviará una `cantidad` de ETH, sino que también llamará implícitamente al contrato para comenzar a ejecutar el código. Imaginemos este contrato malicioso:

```solidity
contract Attacker {
    function beginAttack() external payable {
        Victim(VICTIM_ADDRESS).deposit.value(1 ether)();
        Victim(VICTIM_ADDRESS).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(VICTIM_ADDRESS).withdraw();
        }
    }
}
```

Al llamar a Attacker.beginAttack(), se iniciará un ciclo que se parecerá a lo siguiente:

```
0.) La EOA del atacante llama a Attacker.beginAttack() con 1 ETH
0.) Attacker.beginAttack() le deposita 1 ETH a la Víctima

  1.) Atacante -> Victim.withdraw()
  1.) La víctima lee el balanceOf[msg.sender]
  1.) La víctima envía ETH al Atacante (lo que ejecuta la función predeterminada)
    2.) Atacante -> Victim.withdraw()
    2.) La Víctima lee el balanceOf[msg.sender]
    2.) La Víctima envía ETH al Atacante (lo que ejecuta la función predeterminada)
      3.) Atacante -> Victim.withdraw()
      3.) La Víctima lee el balanceOf[msg.sender]
      3.) La Víctima envía ETH al Atacante (lo que ejecuta la función predeterminada)
        4.) El Atacante ya no tiene el combustible necesario, regresa sin llamar de nuevo
      3.) balances[msg.sender] = 0;
    2.) balances[msg.sender] = 0; (ya era 0)
  1.) balances[msg.sender] = 0; (ya era 0)
```

Llamar al Attacker.beginAttack con 1 ETH hará que vuelva a entrar el ataque a la Víctima, extrayendo más ETH del proporcionado (tomado de los balances de otros usuarios, causando que el contrato de la Víctima sea sub-colateralizado)

### Cómo lidiar con la reentrada (la forma incorrecta) {#how-to-deal-with-re-entrancy-the-wrong-way}

Uno podría considerar derrotar la reentrada simplemente impidiendo que cualquier contrato inteligente interactúe con tu código. Si buscas stackoverflow, encuentras el segmento de código con muchos votos positivos:

```solidity
function isContract(address addr) internal returns (bool) {
  uint size;
  assembly { size := extcodesize(addr) }
  return size > 0;
}
```

Parece tener sentido: Los contratos tienen código, si la persona que llama tiene algún código, no permite que deposite. Vamos a añadirlo:

```solidity
// ESTE CONTRATO TIENE VULNERABILIDAD INTENCIONAL, NO COPIAR
contract ContractCheckVictim {
    mapping (address => uint256) public balances;

    function isContract(address addr) internal returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }

    function deposit() external payable {
        require(!isContract(msg.sender)); // <- NEW LINE
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

Ahora, para poder depositar ETH, no necesitas tener un contrato inteligente en tu dirección. Sin embargo, esto se contradice fácilmente con el siguiente contrato de Atacante:

```solidity
contract ContractCheckAttacker {
    constructor() public payable {
        ContractCheckVictim(VICTIM_ADDRESS).deposit(1 ether); // <- Nueva línea
    }

    function beginAttack() external payable {
        ContractCheckVictim(VICTIM_ADDRESS).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(VICTIM_ADDRESS).withdraw();
        }
   }
}
```

Mientras que el primer ataque fue un ataque a la lógica contractual, este es un ataque al comportamiento de distribución del contrato de Ethereum. Durante la construcción, un contrato aún no ha devuelto su código para ser implementado en su dirección, pero conserva el control completo de EVM DURANTE este proceso.

Es técnicamente posible evitar que los contratos inteligentes llamen a su código utilizando esta línea:

```solidity
require(tx.origin == msg.sender)
```

Sin embargo, esta todavía no es una buena solución. Uno de los aspectos más emocionantes de Ethereum es su composición, los contratos inteligentes se integran y construyen entre sí. Al usar la línea de arriba, estás limitando la utilidad de tu proyecto.

### Cómo lidiar con la re-entrada (la forma correcta) {#how-to-deal-with-re-entrancy-the-right-way}

Simplemente cambiando el orden de la actualización de almacenamiento y llamada externa, prevenimos la condición de re-entrada que permitió el ataque. Pedir de nuevo el retiro, si es posible, no beneficiaría al atacante, ya que el almacenamiento de `balances` estará establecido en 0.

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

El código anterior sigue el patrón de diseño "Chequeo-Efectos-Interacciones", el cual ayuda a proteger contra re-entrada. Puedes [leer más acerca de Chequeo-Efectos-Interacciones aquí](https://fravoll.github.io/solidity-patterns/checks_effects_interactions.html)

### Cómo lidiar con la re-entrada (la forma incorrecta) {#how-to-deal-with-re-entrancy-the-nuclear-option}

Cada vez que estás enviando ETH a una dirección no confiable, o interactuando con un contrato desconocido (tal como llamar a `transferir()` de una dirección de token provista por un usuario), te abres a ti mismo a la posibilidad de re-entrada. **Al diseñar contratos que no envían ETH ni llaman contratos no confiables, previenes la posibilidad de que se produzca una re-entrada.**

## Más tipos de ataques {#more-attack-types}

Los tipos de ataques anteriores cubren problemas de codificación de contrato inteligente (de re-entrada) y las peculiaridades de Ethereum (ejecutar códigos dentro de constructores de contratos, antes de que el código esté disponible en la dirección del contrato). Existen muchos más ataques a los que se debe prestar atención, por ejemplo:

- Inicio de ejecución
- ETH enviar rechazo
- Desbordamiento/bajo flujo entero

Más información:

- [Ataques conocidos del contrato inteligente Consensys](https://consensys.github.io/smart-contract-best-practices/attacks/): Una explicación bastante legible de las más significativas vulnerabilidades, con código de ejemplo para muchos.
- [Registro SWC](https://swcregistry.io/docs/SWC-128): Lista curada de los CWE que aplican para Ethereum y los contratos inteligentes

## Herramientas de seguridad {#security-tools}

Aunque no hay sustituto para entender los conceptos básicos de seguridad de Ethereum y comprometer a una empresa de auditoría profesional para revisar su código, hay muchas herramientas disponibles para ayudarte a diagnosticar los posibles problemas de tu código.

### Seguridad de contratos inteligentes {#smart-contract-security}

**Slither:** **_Entorno de trabajo de análisis estático de Solidity escrito en Python 3._**

- [GitHub](https://github.com/crytic/slither)

**MythX:** **_API de análisis de seguridad para contratos inteligentes de Ethereum._**

- [mythx.io](https://mythx.io/)
- [Documentación](https://docs.mythx.io/en/latest/)

**Mythril:** **_Herramienta de análisis de seguridad para el bytecode de la EVM._**

- [mythril](https://github.com/ConsenSys/mythril)
- [Documentación](https://mythril-classic.readthedocs.io/en/master/about.html)

**Manticore:** **_ Una interfaz de línea de comandos que utiliza una herramienta de ejecución simbólica en contratos inteligentes y binarios._**

- [GitHub](https://github.com/trailofbits/manticore)
- [Documentación](https://github.com/trailofbits/manticore/wiki)

**Securify: ** **_Escáner de seguridad para contratos inteligentes de Ethereum._**

- [securify.chainsecurity.com](https://securify.chainsecurity.com/)
- [Discord](https://discordapp.com/invite/nN77ckb)

**ERC20 Verifier: ** **_Una herramienta de verificación utilizada para comprobar si un contrato cumple con el estándar ERC20._**

- [erc20-verifier.openzeppelin.com](https://erc20-verifier.openzeppelin.com)
- [Foro](https://forum.openzeppelin.com/t/online-erc20-contract-verifier/1575)

### Verificación formal {#formal-verification}

**Información sobre la verificación formal**

- [Cómo funciona la verificación formal en los contratos inteligentes](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/), _20 de julio 2018, Brian Marick_
- [Cómo puede la verificación formal garantizar la perfección de los contratos inteligentes](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1), _29 de enero 2018, Bernard Mueller_

### Uso de herramientas {#using-tools}

Dos de las herramientas más populares para el análisis de seguridad de contratos inteligentes son:

- [Slither](https://github.com/crytic/slither) por [Trail of Bits](https://www.trailofbits.com/) (versión alojada: [Crytic](https://crytic.io/))
- [Mythril](https://github.com/ConsenSys/mythril) por [ConsenSys](https://consensys.net/) (versión alojada: [MythX](https://mythx.io/))

Ambas son herramientas útiles que analizan tu código e informan sobre problemas. Cada una tiene una versión alojada [commercial], pero también están disponibles de forma gratuita para ejecutarse localmente. El siguiente es un ejemplo rápido de cómo ejecutar Slither, que está disponible en una imagen Docker conveniente `trailofbits/eth-security-toolbox`. Necesitarás [instalar Docker si aún no lo tienes instalado](https://docs.docker.com/get-docker/).

```bash
$ mkdir test-slither
$ curl https://gist.githubusercontent.com/epheph/460e6ff4f02c4ac582794a41e1f103bf/raw/9e761af793d4414c39370f063a46a3f71686b579/gistfile1.txt > bad-contract.sol
$ docker run -v `pwd`:/share  -it --rm trailofbits/eth-security-toolbox
docker$ cd /share
docker$ solc-select 0.5.11
docker$ slither bad-contract.sol
```

Generará esta salida:

```bash
ethsec@1435b241ca60:/share$ slither bad-contract.sol
INFO:Detectors:
Reentrancy in Victim.withdraw() (bad-contract.sol#11-16):
    External calls:
    - (success) = msg.sender.call.value(amount)() (bad-contract.sol#13)
    State variables written after the call(s):
    - balances[msg.sender] = 0 (bad-contract.sol#15)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities
INFO:Detectors:
Low level call in Victim.withdraw() (bad-contract.sol#11-16):
    - (success) = msg.sender.call.value(amount)() (bad-contract.sol#13)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#low-level-calls
INFO:Slither:bad-contract.sol analyzed (1 contracts with 46 detectors), 2 result(s) found
INFO:Slither:Use https://crytic.io/ to get access to additional detectors and GitHub integration
```

Slither ha identificado la re-entrada potencial aquí, mediante la identificación de las líneas clave donde el problema podría ocurrir y proporcionando un enlace con más información acerca del problema:

> Referencia: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities

permitiéndote conocer rápidamente los posibles problemas de tu código. Al igual que todas las herramientas de pruebas automatizadas, Slither no es perfecta y peca de informar demasiado. Puede advertir sobre una posible reentrada, incluso cuando no existe una vulnerabilidad explotable. A menudo, revisar la DIFERENCIA en la salida de Slither entre los cambios de código es extremadamente esclarecedor, ya que contribuye a descubrir las vulnerabilidades que se introdujeron mucho antes sin tener que esperar hasta que el código de tu proyecto esté completo.

## Más lectura {#further-reading}

**Guía de prácticas recomendadas de seguridad para contratos inteligentes**

- [consensys.github.io/smart-contract-best-practices/](https://consensys.github.io/smart-contract-best-practices/)
- [GitHub](https://github.com/ConsenSys/smart-contract-best-practices/)
- [Colección acumulativa de recomendaciones de seguridad y prácticas recomendadas](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)

**Estándar de verificación de seguridad de contrato inteligente (SCSVS)**

- [securing.github.io/SCSVS/](https://securing.github.io/SCSVS/)

_¿Conoces algún recurso en la comunidad que te haya servido de ayuda? Edita esta página y añádelo._

## Tutoriales relacionados {#related-tutorials}

- [Flujo de trabajo de desarrollo seguro](/developers/tutorials/secure-development-workflow/)
- [Cómo utilizar Slither para encontrar errores en contratos inteligentes](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Cómo utilizar Manticore para encontrar errores en contratos inteligentes](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Guías de seguridad](/developers/tutorials/smart-contract-security-guidelines/)
- [Seguridad del token](/developers/tutorials/token-integration-checklist/)
