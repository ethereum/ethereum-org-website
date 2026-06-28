---
title: "Cómo crear mocks de contratos inteligentes de Solidity para pruebas"
description: "Por qué deberías burlarte de tus contratos al hacer pruebas"
author: Markus Waas
lang: es
tags: ["Solidity", "contratos inteligentes", "pruebas", "mocking"]
skill: intermediate
breadcrumb: "Creación de mocks de contratos"
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Los objetos simulados (mock)](https://wikipedia.org/wiki/Mock_object) son un patrón de diseño común en la programación orientada a objetos. Proveniente de la antigua palabra francesa 'mocquer' con el significado de 'burlarse de', evolucionó a 'imitar algo real', que es exactamente lo que hacemos en programación. Por favor, búrlate de tus contratos inteligentes solo si quieres, pero crea mocks de ellos siempre que puedas. Te hará la vida más fácil.

## Pruebas unitarias de contratos con mocks {#unit-testing-contracts-with-mocks}

Crear un mock de un contrato significa esencialmente crear una segunda versión de ese contrato que se comporta de manera muy similar al original, pero de una forma que el desarrollador puede controlar fácilmente. A menudo terminas con contratos complejos en los que solo quieres [hacer pruebas unitarias de pequeñas partes del contrato](/developers/docs/smart-contracts/testing/). El problema es: ¿qué pasa si probar esta pequeña parte requiere un estado del contrato muy específico al que es difícil llegar?

Podrías escribir una lógica de configuración de pruebas compleja cada vez que lleve al contrato al estado requerido, o puedes escribir un mock. Crear un mock de un contrato es fácil con la herencia. Simplemente crea un segundo contrato mock que herede del original. Ahora puedes sobrescribir funciones en tu mock. Veámoslo con un ejemplo.

## Ejemplo: ERC-20 privado {#example-private-erc20}

Usamos un contrato ERC-20 de ejemplo que tiene un tiempo privado inicial. El propietario puede gestionar usuarios privados y solo a ellos se les permitirá recibir tokens al principio. Una vez que haya pasado cierto tiempo, a todos se les permitirá usar los tokens. Si tienes curiosidad, estamos usando el gancho (hook) [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) de los nuevos contratos v3 de OpenZeppelin.

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

Y ahora vamos a crear su mock.

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

Obtendrás uno de los siguientes mensajes de error:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

Dado que estamos usando la nueva versión 0.6 de Solidity, tenemos que añadir la palabra clave `virtual` para las funciones que pueden ser sobrescritas y override para la función que sobrescribe. Así que vamos a añadirlas a ambas funciones `isPublic`.

Ahora, en tus pruebas unitarias, puedes usar `PrivateERC20Mock` en su lugar. Cuando quieras probar el comportamiento durante el tiempo de uso privado, usa `setIsPublic(false)` y de la misma manera `setIsPublic(true)` para probar el tiempo de uso público. Por supuesto, en nuestro ejemplo, también podríamos usar simplemente [ayudantes de tiempo (time helpers)](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) para cambiar los tiempos en consecuencia. Pero la idea de crear mocks debería estar clara ahora y puedes imaginar escenarios donde no es tan fácil como simplemente avanzar el tiempo.

## Crear mocks de muchos contratos {#mocking-many-contracts}

Puede volverse un desastre si tienes que crear otro contrato para cada mock individual. Si esto te molesta, puedes echar un vistazo a la biblioteca [MockContract](https://github.com/gnosis/mock-contract). Te permite sobrescribir y cambiar los comportamientos de los contratos sobre la marcha. Sin embargo, solo funciona para simular llamadas a otro contrato, por lo que no funcionaría para nuestro ejemplo.

## Los mocks pueden ser aún más poderosos {#mocking-can-be-even-more-powerful}

El poder de los mocks no termina ahí.

- Añadir funciones: No solo es útil sobrescribir una función específica, sino también simplemente añadir funciones adicionales. Un buen ejemplo para los tokens es tener una función adicional `mint` para permitir a cualquier usuario obtener nuevos tokens de forma gratuita.
- Uso en redes de prueba (testnets): Cuando despliegas y pruebas tus contratos en redes de prueba junto con tu aplicación descentralizada (dapp), considera usar una versión simulada (mock). Evita sobrescribir funciones a menos que realmente tengas que hacerlo. Después de todo, quieres probar la lógica real. Pero añadir, por ejemplo, una función de reinicio puede ser útil para simplemente restablecer el estado del contrato al principio, sin requerir un nuevo despliegue. Obviamente, no querrías tener eso en un contrato de la Red principal.