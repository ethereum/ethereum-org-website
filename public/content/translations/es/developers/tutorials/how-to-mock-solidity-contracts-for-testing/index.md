---
title: Cómo simular contratos inteligentes de Solidity para probarlos
description: ¿Por qué debería burlarse de sus contratos al probarlos?
author: Markus Waas
lang: es
tags:
  [
    "Solidity",
    "contratos Inteligentes",
    "pruebas",
    "simular"
  ]
skill: intermediate
published: 02-05-2020
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

Los [objetos simulados](https://wikipedia.org/wiki/Mock_object) son un patrón de diseño común en la programación orientada a objetos. Viene de la antigua palabra francesa «mocquer» con el significado de «reírse de algo» y evolucionó a «imitar a algo real» que es, en realidad, lo que hacemos en programación. Por tanto, ríase todo lo que quiera de sus contratos inteligentes si quieres, pero simúlelos siempre que pueda. ¡Le simplifica la vida!

## Pruebas unitarias de contratos con simulaciones {#unit-testing-contracts-with-mocks}

Simular un contrato significa básicamente crear una segunda versión del contrato que se comporta de manera muy similar al original, pero de una forma que el desarrollador puede controlar fácilmente. A menudo acaba con contratos complejos donde solo desea [probar unidades pequeñas del contrato](/developers/docs/smart-contracts/testing/). El problema es: ¿qué sucedería si esta pequeña parte requiere un estado de contrato muy específico que es complicado para comenzar?

Puede escribir una lógica de configuración de prueba compleja cada vez que el contrato se encuentre en el estado requerido, o escriba una simulación. Simular un contrato es fácil con herencia. Simplemente crea un segundo contrato simulado que hereda del original. Ahora puede sobrescribir funciones a su imitación. Veámoslo mejor poniendo un ejemplo.

## Ejemplo: ERC20 privado {#example-private-erc20}

Usamos el ejemplo de un contrato ERC-20 que tiene un tiempo inicial privado. El propietario puede administrar usuarios privados y solo ellos estarán autorizados a recibir tókenes al principio. Una vez transcurrido un periodo específico, cualquiera podrá usar los tókenes. Si tiene curiosidad, estamos usando el hook [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) de los nuevos contratos OpenZeppelin v3.

```solidity
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateERC20 is ERC20, Ownable {
    mapping (address => bool) public isPrivateUser;
    uint256 private publicAfterTime;

    constructor(uint256 privateERC20timeInSec) ERC20("PrivateERC20", "PRIV") public {
        publicAfterTime = now + privateERC20timeInSec;
    }

    function addUser(address user) external onlyOwner {
        isPrivateUser[user] = true;
    }

    function isPublic() public view returns (bool) {
        return now >= publicAfterTime;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        require(_validRecipient(to), "PrivateERC20: invalid recipient");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

Y ahora vamos a simularlo.

```solidity
pragma solidity ^0.6.0;
import "../PrivateERC20.sol";

contract PrivateERC20Mock is PrivateERC20 {
    bool isPublicConfig;

    constructor() public PrivateERC20(0) {}

    function setIsPublic(bool isPublic) external {
        isPublicConfig = isPublic;
    }

    function isPublic() public view returns (bool) {
        return isPublicConfig;
    }
}
```

Recibirás uno de los siguientes mensajes de error:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. ¿Olvidó añadir "virtual"?.`

Como estamos usando la nueva versión 0.6 de Solidity, debemos añadir la palabra clave `virtual` a las funciones que pueden ser sobrescritas y `override` en la función que sobrescribe. Así que añadamos esos modificadores a ambas funciones `isPublic`.

Ahora en sus pruebas unitarias, puede usar `PrivateERC20Mock` en su lugar. Cuando desee probar el comportamiento durante el tiempo de uso privado, use `setIsPublic(false)` y de igual manera `setIsPublic(true)` para probar el tiempo de uso público. Por supuesto, en nuestro ejemplo, también podríamos usar [time helpers](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) para ajustar los tiempos según corresponda. Esperamos que la idea de simular le haya quedado ahora clara y puede imaginar situaciones en las que todo no es tan sencillo como simplemente hacer avanzar el tiempo.

## Simulando muchos contratos {#mocking-many-contracts}

Puede volverse un tanto caótico si tiene que crear otro contrato para cada imitación única. Si esto le incomoda, puede consultar la biblioteca [MockContract](https://github.com/gnosis/mock-contract). Le permite sobrescribir y cambiar los comportamientos de los contratos sobre la marcha. Sin embargo, esto solo funciona para simular la activación de otro contrato, por lo que no funcionará para nuestro ejemplo.

## La simulación puede ser aún más potente {#mocking-can-be-even-more-powerful}

Los poderes de la simulación no terminan aquí.

- Añadir funciones: no solo sobrescribir una función específica es útil, también lo es añadir funciones adicionales. Un buen ejemplo para los tokens es añadir una función `mint` adicional que permita a cualquier usuario obtener nuevos tokens de forma gratuita.
- Uso en redes de prueba: cuando implemente y pruebe sus contratos en redes de pruebas junto con su DApp, considere el usar una versión simulada. Evita el tener que sobreescribir las funciones, a menos que sea realmente necesario. Al fin y al cabo, se trata de probar la lógica real. Pero agregar, por ejemplo, una función de reinicio puede ser útil para simplemente restablecer el contrato a su estado inicial, sin requerir un nuevo despliegue. Obviamente, no haría eso en un contrato de red principal.
