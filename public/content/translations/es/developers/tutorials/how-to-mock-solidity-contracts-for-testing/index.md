---
title: Cómo simular contratos inteligentes de Solidity para probarlos
description: '¿Por qué debería burlarse de sus contratos al probarlos?'
author: Markus Waas
lang: es
tags:
  - "solidity"
  - "contratos inteligentes"
  - "pruebas"
  - "simular"
skill: intermediate
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Los objetos simulados](https://wikipedia.org/wiki/Mock_object) son un patrón de diseño común en la programación orientada a objetos. Viene de la antigua palabra francesa «mocquer» con el significado de «reírse de algo» y evolucionó a «imitar a algo real» que es, en realidad, lo que hacemos en programación. Por tanto, ríase todo lo que quiera de sus contratos inteligentes si quieres, pero simúlelos siempre que pueda. ¡Le simplifica la vida!

## Pruebas unitarias de contratos con simulaciones {#unit-testing-contracts-with-mocks}

Simular un contrato significa básicamente crear una segunda versión del contrato que se comporta de manera muy similar al original, pero de una forma que el desarrollador puede controlar fácilmente. A menudo suele uno acabar con contratos complejos cuando lo único que quiere es [ hacer pruebas unitarias en partes pequeñas del contrato.](/developers/docs/smart-contracts/testing/). El problema es: ¿qué sucedería si esta pequeña parte requiere un estado de contrato muy específico que es complicado para comenzar?

Puede escribir una lógica de configuración de prueba compleja cada vez que el contrato se encuentre en el estado requerido, o escriba una simulación. Simular un contrato es fácil con herencia. Simplemente crea un segundo contrato simulado que hereda del original. Ahora puede sobrescribir funciones a su imitación. Veámoslo mejor poniendo un ejemplo.

## Ejemplo: ERC20 privado {#example-private-erc20}

Usamos el ejemplo de un contrato ERC-20 que tiene un tiempo inicial privado. El propietario puede administrar usuarios privados y solo ellos estarán autorizados a recibir tókenes al principio. Una vez transcurrido un periodo específico, cualquiera podrá usar los tókenes. Si le pica la curiosidad, estamos usando el gancho [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/3.x/extending-contracts#using-hooks) de los nuevos contratos v3 de OpenZeppelin.

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
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

Ya que estamos usando la nueva versión 0.6 de Solidity, tenemos que añadir la palabra clave `virtual` para funciones que puedan ser sobrescritas y sobrescribir para la función de sobrescribir. Entonces, añadámoslas a ambas funciones `isPublic`.

Ahora, en sus pruebas unitarias, puede usar `PrivateERC20Mock` en su lugar. Cuando quiera probar el comportamiento durante un tiempo privado de uso, utilice `setIsPublic(false)` al igual que `setIsPublic(true)` para probar el tiempo público de uso. Por supuesto, en nuestro ejemplo también podemos usar únicamente [ayudas de tiempo](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) para cambiar los tiempos según corresponda. Esperamos que la idea de simular le haya quedado ahora clara y puede imaginar situaciones en las que todo no es tan sencillo como simplemente hacer avanzar el tiempo.

## Simular varios contratos {#mocking-many-contracts}

Puede volverse un tanto caótico si tiene que crear otro contrato para cada imitación única. Si esto le preocupa, puede revisar la biblioteca [MockContract](https://github.com/gnosis/mock-contract). Le permite sobrescribir y cambiar los comportamientos de los contratos sobre la marcha. Sin embargo, esto solo funciona para simular la activación de otro contrato, por lo que no funcionará para nuestro ejemplo.

## Simular puede ser aún más eficaz {#mocking-can-be-even-more-powerful}

Los poderes de la simulación no terminan aquí.

- Añadir funciones: no solo sobrescribir una función específica es útil, también lo es añadir funciones adicionales. Un buen ejemplo para los tókenes es contar con una función adicional `mint` para permitir a cualquier usuario consiga los nuevos tókenes sin coste.
- Uso en redes de prueba: cuando implemente y pruebe sus contratos en redes de pruebas junto con su DApp, considere el usar una versión simulada. Evita el tener que sobreescribir las funciones, a menos que sea realmente necesario. Al fin y al cabo, se trata de probar la lógica real. Pero agregar, por ejemplo, una función de reinicio puede ser útil para simplemente restablecer el contrato a su estado inicial, sin requerir un nuevo despliegue. Obviamente, no haría eso en un contrato de red principal.
