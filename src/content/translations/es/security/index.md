---
title: SEGURIDAD EN CONTRATOS INTELIGENTES
description: Consideraciones de Seguridad para Desarrolladores Ethereum
lang: es
sidebar: true
---

Los contratos inteligentes en Ethereum son extremadamente flexibles, capaces tanto de almacenar grandes cantidades de tokens (a menudo por encima de $ 1B) como de ejecutar una lógica inmutable basada en un código de contrato inteligente implementado previamente. Si bien esto ha creado un ecosistema vibrante y creativo de contratos inteligentes interconectados y sin confianza, también es el ecosistema perfecto para atraer a los atacantes que buscan obtener ganancias al explotar las vulnerabilidades en los contratos inteligentes y el comportamiento inesperado en Ethereum. El código de contrato inteligente generalmente no se puede cambiar para parchear fallas de seguridad, los activos que han sido robados de contratos inteligentes son irrecuperables y los activos robados son extremadamente difíciles de rastrear. El monto total de valor robado o perdido debido a problemas de contratos inteligentes es fácilmente de $ 1B. Algunos de los más importantes debido a errores de codificación de contratos inteligentes incluyen:

- [Problema de paridad multi-sig # 1 - $ 30 millones perdidos](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach)
- [Problema de paridad multi-sig # 2 - $ 300M bloqueados](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether)
- [¡Hack de TheDAO, 3.6M ETH! Más de $ 1B en los precios ETH de hoy](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/)

## PREREQUISITOS {#prerequisites}

Esto cubrirá la seguridad de los contratos inteligentes, así que asegúrese de estar familiarizado con los [contratos inteligentes](/developers/docs/smart-contracts/) antes de abordar la seguridad.

## CÓMO ESCRIBIR UN CÓDIGO DE CONTRATO INTELIGENTE MÁS SEGURO{#how-to-write-more-secure-smart-contract-code}

Antes de lanzar cualquier código a Mainnet, es importante tomar las precauciones suficientes para proteger cualquier cosa de valor que se le haya confiado a su contrato inteligente. En este artículo, analizaremos algunos ataques específicos, brindaremos recursos para conocer más tipos de ataques y lo dejaremos con algunas herramientas básicas y mejores prácticas para garantizar que sus contratos funcionen de manera correcta y segura.

## LAS AUDITORÍAS NO SON UNA "BALA DE PLATA" {#audits-are-not-a-silver-bullet}

Años atrás, las herramientas para escribir, compilar, probar e implementar contratos inteligentes eran muy inmaduras, lo que llevó a muchos proyectos a escribir código de Solidity de manera desordenada, arrojarlo por encima de la pared a un auditor que investigaría el código para asegurarse de que funciona de forma segura y como se esperaba. En 2020, los procesos de desarrollo y las herramientas que respaldan la escritura de Solidity son significativamente mejores; Aprovechar estas mejores prácticas no solo garantiza que su proyecto sea más fácil de administrar, sino que es una parte vital de la seguridad de su proyecto. Una auditoría al final de la redacción de su contrato inteligente ya no es suficiente como la única consideración de seguridad que hace su proyecto. La seguridad comienza antes de que escriba su primera línea de código de contrato inteligente, ** la seguridad comienza con los procesos de diseño y desarrollo adecuados **. 

## PROCESO DE DESARROLLO DE CONTRATOS INTELIGENTES {#smart-contract-development-process}

Como mínimo:

- Todo el código almacenado en un sistema de control de versiones, como git
- Todas las modificaciones de código realizadas a través de Pull Request
- Todas las Pull Request tienen al menos un revisor. _Si eres un proyecto en solitario, ¡considera buscar otro autor en solitario y reseñas de códigos comerciales!_
- Un solo comando compila, implementa y ejecuta un conjunto de pruebas contra su código utilizando un entorno de desarrollo Ethereum (Ver: Truffle)
- Ha ejecutado su código a través de herramientas básicas de análisis de código como Mythril y Slither, idealmente antes de fusionar cada Pull Request, comparando las diferencias en la salida
- Solidity no emite NINGUNA advertencia del compilador
- Tu código está bien documentado

Hay mucho más que decir sobre el proceso de desarrollo, pero estos elementos son un buen punto de partida. Para obtener más elementos y explicaciones detalladas, consulte la [lista de verificación de calidad del proceso proporcionada por DeFiSafety](https://docs.defisafety.com/review-process-documentation/process-quality-audit-process). [DefiSafety](https://defisafety.com/) es un servicio público no oficial que publica reseñas de varias grandes aplicaciones públicas de Ethereum. Parte del sistema de calificación DeFiSafety incluye qué tan bien el proyecto se adhiere a esta lista de verificación de la calidad del proceso. Siguiendo estos procesos:

- Producirá un código más seguro mediante pruebas automatizadas y reproducibles.
- Los auditores podrán revisar su proyecto de manera más efectiva
- Incorporación más fácil de nuevos desarrolladores
- Permite a los desarrolladores iterar, probar y obtener comentarios sobre las modificaciones rápidamente
- Es menos probable que su proyecto experimente regresiones

## ATAQUES Y VULNERABILIDADES {#attacks-and-vulnerabilities}

Ahora que está escribiendo código de Solidity mediante un proceso de desarrollo eficiente, veamos algunas vulnerabilidades comunes de Solidity para ver qué puede salir mal.

### Reentrada (Re-entrancy) {#re-entrancy}

La Reentrada es uno de los problemas de seguridad más grandes y más importantes a considerar al desarrollar contratos inteligentes. Si bien el EVM no puede ejecutar varios contratos al mismo tiempo, un contrato que llama a un contrato diferente pausa la ejecución del contrato de llamada y el estado de la memoria hasta que la llamada regresa, momento en el que la ejecución procede normalmente. Esta pausa y reinicio puede crear una vulnerabilidad conocida como "reentrada".

Aquí hay una versión simple de un contrato que es vulnerable a la reentrada:

```solidity
// ESTE CONTRATO TIENE VULNERABILIDADES INTENCIONALES, NO COPIAR

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

Para permitir que un usuario retire ETH que haya almacenado previamente en el contrato, esta función

1. Lee cuánto saldo tiene un usuario
2. Les envía ese saldo en ETH
3. Restablece su saldo a 0, por lo que no pueden volver a retirar su saldo.

Si se llama desde una cuenta normal (como su propia cuenta de Metamask), esto funciona como se esperaba: msg.sender.call.value () simplemente envía su cuenta ETH. Sin embargo, los contratos inteligentes también pueden realizar llamadas. Si un contrato malicioso y personalizado es el que llama a `withdraw()`, msg.sender.call.value () no solo enviará la `cantidad` de ETH, sino que también llamará implícitamente al contrato para comenzar a ejecutar el código. Imagina este contrato malicioso:

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

Llamar a Attacker.beginAttack () iniciará un ciclo que se parece a:

```
0.) El EOA del atacante llama a Attacker.beginAttack () con 1 ETH
0.) Attacker.beginAttack () deposita 1 ETH en Victim

   1.) Atacante -> Victim.withdraw ()
   1.) La víctima lee los saldos [msg.sender]
   1.) La víctima envía ETH al atacante (que ejecuta la función predeterminada)
     2.) Atacante -> Victim.withdraw ()
     2.) La víctima lee los saldos [msg.sender]
     2.) La víctima envía ETH al atacante (que ejecuta la función predeterminada)
       3.) Atacante -> Victim.withdraw ()
       3.) La víctima lee los saldos [msg.sender]
       3.) La víctima envía ETH al atacante (que ejecuta la función predeterminada)
         4.) El atacante ya no tiene suficiente gasolina, regresa sin llamar de nuevo
       3.) saldos [msg.sender] = 0;
     2.) saldos [msg.sender] = 0; (ya era 0)
   1.) saldos [msg.sender] = 0; (ya era 0)
```

Llamar a Attacker.beginAttack con 1 ETH volverá a atacar a la Víctima, retirando más ETH de lo que proporcionó (tomado de los saldos de otros usuarios, lo que provocará que el contrato de la Víctima tenga una garantía insuficiente)

### Cómo lidiar con la reentrada (de la manera incorrecta){#how-to-deal-with-re-entrancy-the-wrong-way}

Uno podría considerar derrotar el reentrada simplemente evitando que los contratos inteligentes interactúen con su código. Busca stackoverflow, y encontrarás este fragmento de código con toneladas de votos positivos:

```solidity
function isContract(address addr) internal returns (bool) {
  uint size;
  assembly { size := extcodesize(addr) }
  return size > 0;
}
```

Parece tener sentido: los contratos tienen código, si la persona que llama tiene algún código, no permita que lo deposite. Vamos a agregarlo:

```solidity
// ESTE CONTRATO TIENE VULNERABILIDADES INTENCIONALES, NO COPIAR
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

Ahora, para depositar ETH, no debe tener un código de contrato inteligente en su dirección. Sin embargo, esto se vence fácilmente con el siguiente contrato de atacante:

```solidity
contract ContractCheckAttacker {
    constructor() public payable {
        ContractCheckVictim(VICTIM_ADDRESS).deposit(1 ether); // <- New line
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

Mientras que el primer ataque fue un ataque a la lógica del contrato, este es un ataque al comportamiento de implementación del contrato de Ethereum. Durante la construcción, un contrato aún no ha devuelto su código para ser implementado en su dirección, pero retiene el control total de EVM DURANTE este proceso.

Es técnicamente posible evitar que los contratos inteligentes llamen a su código, usando esta línea:

```solidity
require(tx.origin == msg.sender)
```

Sin embargo, esta todavía no es una buena solución. Uno de los aspectos más emocionantes de Ethereum es su capacidad de compilación, los contratos inteligentes se integran y se construyen entre sí. Al usar la línea anterior, está limitando la utilidad de su proyecto. 

### Cómo lidiar con la reentrada (de la manera correcta){#how-to-deal-with-re-entrancy-the-right-way}

Simplemente cambiando el orden de la actualización del almacenamiento y la llamada externa, evitamos la condición de reentrada que permitió el ataque. Volver a llamar para retirar, aunque sea posible, no beneficiará al atacante, ya que el almacenamiento de `balances` ya se establecerá en 0.

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

El código anterior sigue el patrón de diseño "Checks-Effects-Interactions", que ayuda a proteger contra el reentrada. Puede [leer más sobre Checks-Effects-Interactions aquí](https://fravoll.github.io/solidity-patterns/checks_effects_interactions.html)

### Cómo lidiar con la reentrada (la opción nuclear) {#cómo-lidiar-con-reentrada-la-opción-nuclear}

Cada vez que envía ETH a una dirección que no es de confianza o interactúa con un contrato desconocido (como llamar a `transfer()` de una dirección de token proporcionada por el usuario), se abre a la posibilidad de volver a entrar. **¡Al diseñar contratos que no envían ETH ni llaman a contratos no confiables, evita la posibilidad de reentrada!**

## Más tipos de ataques {#more-attack-types}

Los tipos de ataque anteriores cubren problemas de codificación de contratos inteligentes (reentrada) y rarezas de Ethereum (código que se ejecuta dentro de los constructores del contrato, antes de que el código esté disponible en la dirección del contrato). Hay muchos, muchos más tipos de ataques a tener en cuenta, como:

- Inversión Ventajista (Front running)
- ETH enviar rechazo (ETH send rejection)
- Desbordamiento / subdesbordamiento de enteros

Otras lecturas:

- [Consensys Smart Contract Known Attacks](https://consensys.github.io/smart-contract-best-practices/known_attacks/) - Una explicación muy legible de las vulnerabilidades más importantes, con código de muestra para la mayoría.
- [Registro SWC](https://swcregistry.io/docs/SWC-128) - Lista seleccionada de CWE que se aplican a Ethereum y contratos inteligentes

## HERRAMIENTAS DE SEGURIDAD{#security-tools}

Si bien no hay sustituto para comprender los conceptos básicos de seguridad de Ethereum y contratar a una empresa de auditoría profesional para que revise su código, existen muchas herramientas disponibles para ayudar a resaltar los problemas potenciales en su código.

### Seguridad de contrato inteligente {#smart-contract-security}

**Slither -** **_ Marco de análisis estático de solidez escrito en Python 3._**

- [GitHub](https://github.com/crytic/slither)

**MythX -** **_API de análisis de seguridad para contratos inteligentes de Ethereum._**

- [mythx.io](https://mythx.io/)
- [Documentación](https://docs.mythx.io/)

**Mythril -** **_Herramienta de análisis de seguridad para código de bytes EVM._**

- [mythril](https://github.com/ConsenSys/mythril)
- [Documentación](https://mythril-classic.readthedocs.io/en/master/about.html)

**Manticore -** **_Una interfaz de línea de comandos que utiliza una herramienta de ejecución simbólica en contratos inteligentes y binarios._**

- [GitHub](https://github.com/trailofbits/manticore)
- [Documentación](https://github.com/trailofbits/manticore/wiki)

**Securify -** **_ Escáner de seguridad para contratos inteligentes de Ethereum._**

- [securify.chainsecurity.com](https://securify.chainsecurity.com/)
- [Discord](https://discordapp.com/invite/nN77ckb)

**Verificador ERC20 -** **_Una herramienta de verificación utilizada para verificar si un contrato cumple con el estándar ERC20._**

- [erc20-verifier.openzeppelin.com](https://erc20-verifier.openzeppelin.com)
- [Foro](https://forum.openzeppelin.com/t/online-erc20-contract-verifier/1575)

### Verificación formal {#verificación-formal}

**Información sobre verificación formal**

- [Cómo funciona la verificación formal de contactos inteligentes](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/) _20 de julio de 2018 - Brian Marick_
- [Cómo la verificación formal puede garantizar contratos inteligentes impecables](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1) _29 de enero de 2018 - Bernard Mueller_

### Uso de herramientas {#using-tools}

Dos de las herramientas más populares para el análisis de seguridad de contratos inteligentes son:

- [Slither](https://github.com/crytic/slither) por [Trail of Bits](https://www.trailofbits.com/)(versión alojada: [Crytic](https://crytic.io /))
- [Mythril](https://github.com/ConsenSys/mythril) por [ConsenSys](https://consensys.net/)(versión alojada: [MythX](https://mythx.io/))

Ambas son herramientas útiles que analizan su código e informan problemas. Cada uno tiene una versión alojada [comercial], pero también están disponibles de forma gratuita para ejecutarse localmente. El siguiente es un ejemplo rápido de cómo ejecutar Slither, que está disponible en una imagen conveniente de Docker `trailofbits/eth-security-toolbox`. Deberá [instalar Docker si aún no lo tiene instalado](https://docs.docker.com/get-docker/).

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

Slither ha identificado el potencial de reentrada aquí, identificando las líneas clave donde podría ocurrir el problema y brindándonos un enlace para obtener más detalles sobre el problema:

> Referencia: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities

lo que le permite aprender rápidamente sobre posibles problemas con su código. Como todas las herramientas de prueba automatizadas, Slither no es perfecto y se equivoca al informar demasiado. Puede advertir sobre una posible reentrada, incluso cuando no existe una vulnerabilidad explotable. A menudo, revisar la DIFERENCIA en la salida de Slither entre los cambios de código es extremadamente esclarecedor, lo que ayuda a descubrir vulnerabilidades que se introdujeron mucho antes de esperar hasta que su proyecto esté completo con el código.

## Lectura adicional {#further-reading}

**Guías de mejores prácticas de seguridad de contratos inteligentes**

- [consensys.github.io/smart-contract-best-practices/](https://consensys.github.io/smart-contract-best-practices/)
- [GitHub](https://github.com/ConsenSys/smart-contract-best-practices/)
- [Colección agregada de recomendaciones de seguridad y mejores prácticas](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)

**Estándar de verificación de seguridad de contrato inteligente (SCSVS)**

- [securing.github.io/SCSVS/](https://securing.github.io/SCSVS/)

_¿Conoce algún recurso comunitario que le haya ayudado? ¡Edita esta página y agrégala!_

## Tutoriales relacionados {#related-tutorials}

- [Flujo de trabajo de desarrollo seguro](/developers/tutorials/secure-development-workflow/)
- [Cómo usar Slither para encontrar errores de contratos inteligentes](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Cómo usar Manticore para encontrar errores de contratos inteligentes](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Pautas de seguridad](/developers/tutorials/smart-contract-security-Guidelines/)
- [Seguridad del token](/developers/tutorials/token-integration-checklist/)