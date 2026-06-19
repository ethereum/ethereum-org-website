---
title: Bibliotecas de contratos inteligentes
description: Descubra bibliotecas de contratos inteligentes y bloques de construcción reutilizables para acelerar sus proyectos de desarrollo en Ethereum.
lang: es
---

No es necesario escribir cada contrato inteligente de su proyecto desde cero. Hay muchas bibliotecas de contratos inteligentes de código abierto disponibles que proporcionan bloques de construcción reutilizables para su proyecto, lo que puede evitarle tener que reinventar la rueda.

## Requisitos previos {#prerequisites}

Antes de adentrarse en las bibliotecas de contratos inteligentes, es una buena idea tener una buena comprensión de la estructura de un contrato inteligente. Diríjase a la [anatomía de los contratos inteligentes](/developers/docs/smart-contracts/anatomy/) si aún no lo ha hecho.

## Qué hay en una biblioteca {#whats-in-a-library}

Por lo general, puede encontrar dos tipos de bloques de construcción en las bibliotecas de contratos inteligentes: comportamientos reutilizables que puede agregar a sus contratos e implementaciones de varios estándares.

### Comportamientos {#behaviors}

Al escribir contratos inteligentes, es muy probable que se encuentre escribiendo patrones similares una y otra vez, como asignar una dirección de _administrador_ para llevar a cabo operaciones protegidas en un contrato, o agregar un botón de _pausa_ de emergencia en caso de un problema inesperado.

Las bibliotecas de contratos inteligentes suelen proporcionar implementaciones reutilizables de estos comportamientos como [bibliotecas](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) o mediante [herencia](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) en Solidity.

Como ejemplo, a continuación se muestra una versión simplificada del [contrato `Ownable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) de la [biblioteca de contratos de OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts), que designa una dirección como propietaria de un contrato y proporciona un modificador para restringir el acceso a un método solo a ese propietario.

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
}
```

Para usar un bloque de construcción como este en su contrato, primero tendría que importarlo y luego extenderlo en sus propios contratos. Esto le permitirá usar el modificador proporcionado por el contrato base `Ownable` para asegurar sus propias funciones.

```solidity
import ".../Ownable.sol"; // Ruta a la biblioteca importada

contract MyContract is Ownable {
    // La siguiente función solo puede ser llamada por el propietario
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Otro ejemplo popular es [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) o [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Estas son bibliotecas (a diferencia de los contratos base) que proporcionan funciones aritméticas con comprobaciones de desbordamiento, las cuales no son proporcionadas por el lenguaje. ¡Es una buena práctica usar cualquiera de estas bibliotecas en lugar de operaciones aritméticas nativas para proteger su contrato contra desbordamientos, que pueden tener consecuencias desastrosas!

### Estándares {#standards}

Para facilitar la [composabilidad e interoperabilidad](/developers/docs/smart-contracts/composability/), la comunidad de Ethereum ha definido varios estándares en forma de **ERC**. Puede leer más sobre ellos en la sección de [estándares](/developers/docs/standards/).

Al incluir un ERC como parte de sus contratos, es una buena idea buscar implementaciones estándar en lugar de intentar desarrollar la suya propia. Muchas bibliotecas de contratos inteligentes incluyen implementaciones para los ERC más populares. Por ejemplo, el omnipresente [estándar de token fungible ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) se puede encontrar en [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) y [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20). Además, algunos ERC también proporcionan implementaciones canónicas como parte del propio ERC.

Vale la pena mencionar que algunos ERC no son independientes, sino que son adiciones a otros ERC. Por ejemplo, [ERC-2612](https://eips.ethereum.org/EIPS/eip-2612) añade una extensión a ERC-20 para mejorar su usabilidad.

## Cómo añadir una biblioteca {#how-to}

Consulte siempre la documentación de la biblioteca que está incluyendo para obtener instrucciones específicas sobre cómo incluirla en su proyecto. Varias bibliotecas de contratos de Solidity se empaquetan usando `npm`, por lo que simplemente puede hacer `npm install` con ellas. La mayoría de las herramientas para la [compilación](/developers/docs/smart-contracts/compiling/) de contratos buscarán en su `node_modules` las bibliotecas de contratos inteligentes, por lo que puede hacer lo siguiente:

```solidity
// Esto cargará la biblioteca @openzeppelin/contracts de tus node_modules
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Independientemente del método que utilice, al incluir una biblioteca, preste siempre atención a la versión del [lenguaje](/developers/docs/smart-contracts/languages/). Por ejemplo, no puede usar una biblioteca para Solidity 0.6 si está escribiendo sus contratos en Solidity 0.5.

## Cuándo usarlas {#when-to-use}

El uso de una biblioteca de contratos inteligentes para su proyecto tiene varios beneficios. En primer lugar, le ahorra tiempo al proporcionarle bloques de construcción listos para usar que puede incluir en su sistema, en lugar de tener que programarlos usted mismo.

La seguridad también es una gran ventaja. Las bibliotecas de contratos inteligentes de código abierto también suelen ser examinadas minuciosamente. Dado que muchos proyectos dependen de ellas, existe un fuerte incentivo por parte de la comunidad para mantenerlas bajo revisión constante. Es mucho más común encontrar errores en el código de la aplicación que en las bibliotecas de contratos reutilizables. Algunas bibliotecas también se someten a [auditorías externas](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) para mayor seguridad.

Sin embargo, el uso de bibliotecas de contratos inteligentes conlleva el riesgo de incluir código con el que no está familiarizado en su proyecto. Es tentador importar un contrato e incluirlo directamente en su proyecto, pero sin una buena comprensión de lo que hace ese contrato, puede estar introduciendo inadvertidamente un problema en su sistema debido a un comportamiento inesperado. ¡Asegúrese siempre de leer la documentación del código que está importando y luego revise el código en sí antes de hacerlo parte de su proyecto!

Por último, al decidir si incluir una biblioteca, considere su uso general. Una que sea ampliamente adoptada tiene los beneficios de tener una comunidad más grande y más ojos buscando problemas. ¡La seguridad debe ser su enfoque principal al construir con contratos inteligentes!

## Herramientas relacionadas {#related-tools}

**Contratos de OpenZeppelin:** **_La biblioteca más popular para el desarrollo seguro de contratos inteligentes._**

- [Documentación](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Foro de la comunidad](https://forum.openzeppelin.com/c/general/16)

**DappSys:** **_Bloques de construcción seguros, simples y flexibles para contratos inteligentes._**

- [Documentación](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20:** **_Un proyecto de Solidity con contratos, bibliotecas y ejemplos para ayudarle a construir aplicaciones distribuidas con todas las funciones para el mundo real._**

- [GitHub](https://github.com/HQ20/contracts)

**SDK de Solidity de thirdweb:** **_Proporciona las herramientas necesarias para construir contratos inteligentes personalizados de manera eficiente._**

- [Documentación](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## Tutoriales relacionados {#related-tutorials}

- [Consideraciones de seguridad para desarrolladores de Ethereum](/developers/docs/smart-contracts/security/) _– Un tutorial sobre consideraciones de seguridad al construir contratos inteligentes, incluido el uso de bibliotecas._
- [Comprender el contrato inteligente del token ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _- Tutorial sobre el estándar ERC-20, proporcionado por múltiples bibliotecas._

## Lecturas adicionales {#further-reading}

_¿Conoce algún recurso de la comunidad que le haya ayudado? ¡Edite esta página y añádalo!_