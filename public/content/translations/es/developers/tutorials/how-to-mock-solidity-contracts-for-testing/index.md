---
title: Cómo simular contratos inteligentes de Solidity para pruebas.
description: Por qué debe simular sus contratos al realizar pruebas.
author: Markus Waas
lang: es
tags:
  [
    "solidity",
    "smart contracts",
    "pruebas",
    "simulación"
  ]
skill: intermedio
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

Los [objetos simulados](https://wikipedia.org/wiki/Mock_object) son un patrón de diseño común en la programación orientada a objetos. Proviniendo del antiguo término francés 'mocquer', que significa 'burlarse de', evolucionó hacia 'imitar algo real', que es efectivamente lo que hacemos en programación. Por favor, sólo búrlese de sus smart contracts si le apetece, pero simúlelos siempre que sea posible. Le facilitará la vida.

## Pruebas unitarias de contratos con simulaciones {#unit-testing-contracts-with-mocks}

Simular un contrato esencialmente significa crear una segunda versión de ese contrato que se comporta de forma muy similar al original, pero de una manera fácilmente controlable por el desarrollador. A menudo acaba con contratos complejos donde solo desea [probar unidades pequeñas del contrato](/developers/docs/smart-contracts/testing/). El problema es: ¿qué pasa si probar esa pequeña parte requiere un estado del contrato muy específico que es difícil de alcanzar?

Podría escribir una lógica de configuración de pruebas compleja cada vez que lleve el contrato al estado requerido, o escribir una simulación. Simular un contrato es fácil utilizando herencia. Simplemente cree un segundo contrato simulado que herede del contrato original. Ahora puede sobrescribir funciones en su simulación. Veámoslo con un ejemplo.

## Ejemplo: ERC20 privado {#example-private-erc20}

Utilizamos un ejemplo de contrato ERC-20 que tiene un tiempo inicial privado. El propietario puede gestionar los usuarios privados y solo estos podrán recibir tokens al principio. Una vez transcurrido cierto tiempo, todos podrán usar los tokens. Si tiene curiosidad, estamos usando el hook [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) de los nuevos contratos OpenZeppelin v3.

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

Recibirá uno de los siguientes mensajes de error:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. ¿Olvidó añadir "virtual"?.`

Como estamos usando la nueva versión 0.6 de Solidity, debemos añadir la palabra clave `virtual` a las funciones que pueden ser sobrescritas y `override` en la función que sobrescribe. Así que añadamos esos modificadores a ambas funciones `isPublic`.

Ahora en sus pruebas unitarias, puede usar `PrivateERC20Mock` en su lugar. Cuando desee probar el comportamiento durante el tiempo de uso privado, use `setIsPublic(false)` y de igual manera `setIsPublic(true)` para probar el tiempo de uso público. Por supuesto, en nuestro ejemplo, también podríamos usar [time helpers](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) para ajustar los tiempos según corresponda. Pero la idea de la simulación debería estar clara ahora y puede imaginar escenarios donde no es tan fácil como simplemente adelantar el tiempo.

## Simulando muchos contratos {#mocking-many-contracts}

Puede volverse complicado si tiene que crear otro contrato para cada simulación. Si esto le incomoda, puede consultar la biblioteca [MockContract](https://github.com/gnosis/mock-contract). Le permite sobrescribir y cambiar el comportamiento de los contratos al instante. Sin embargo, solo funciona para simular llamadas a otro contrato, por lo que no sería útil en nuestro ejemplo.

## La simulación puede ser aún más potente {#mocking-can-be-even-more-powerful}

Los beneficios de la simulación no terminan ahí.

- Agregar funciones: No solo es útil sobrescribir una función específica, sino que también se pueden añadir funciones adicionales. Un buen ejemplo para los tokens es añadir una función `mint` adicional que permita a cualquier usuario obtener nuevos tokens de forma gratuita.
- Uso en testnets: Cuando implemente y pruebe sus contratos en testnets junto a su dapp, considere usar una versión simulada. Evite sobrescribir funciones a menos que sea realmente necesario. Después de todo, querrá probar la lógica real. Pero agregar, por ejemplo, una función de reinicio puede ser útil, la cual simplemente restablece el estado del contrato al inicio, sin necesidad de una nueva implementación. Obviamente, no querría tener eso en un contrato en Mainnet.
