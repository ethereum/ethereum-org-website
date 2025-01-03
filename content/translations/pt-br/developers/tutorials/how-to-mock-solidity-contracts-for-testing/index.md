---
title: Como simular contratos inteligentes em Solidity para teste
description: Por que você deve aproveitar os seus contratos ao testar
author: Markus Waas
lang: pt-br
tags:
  - "solidez"
  - "contratos inteligentes"
  - "testando"
  - "simulando"
skill: intermediate
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Mock de objetos ](https://wikipedia.org/wiki/Mock_object) são um padrão de design comum na programação orientada a objetos. Vindo da velha palavra francesa "mocquer" com o significado de "diversão de", evoluiu para a "imitação de algo real", que é na realidade, o que estamos fazendo na programação. Por favor, só se divirta de seus contratos inteligentes se você quiser, mas faça o mock deles sempre que puder. Isso torna sua vida mais fácil.

## Testes de unidade de contratos com simulações {#unit-testing-contracts-with-mocks}

Simular um contrato (mocking) significa essencialmente criar uma segunda versão desse contrato que se comporta de maneira muito semelhante ao original, mas de uma maneira que pode ser facilmente controlada pelo desenvolvedor. Muitas vezes, você acaba com contratos complexos nos quais você só quer [fazer testes de unidade de pequenas partes do contrato](/developers/docs/smart-contracts/testing/). O problema é: e se o teste desta pequena parte exigir um estado de contrato muito específico que seja difícil de alcançar?

Você poderia escrever uma lógica de configuração de testes complexa toda vez que apresentasse o contrato no estado necessário ou você escreveria uma simulação (mock, em inglês). Simular um contrato é fácil com herança. Basta criar um segundo contrato mock que herda do original. Agora você pode substituir funções de seu mock. Vejamos com um exemplo.

## Exemplo: ERC20 Privado {#example-private-erc20}

Usamos um exemplo de contrato ERC-20 que tem um tempo privado inicial. O proprietário pode gerenciar usuários privados e apenas esses terão permissão para receber tokens no início. Uma vez que um certo tempo tenha passado, todos poderão utilizar os tokens. Se você estiver curioso, estamos usando o hook (código modificado) [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/3.x/extending-contracts#using-hooks) dos novos contratos OpenZeppelin v3.

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

E agora vamos fazer o mock disso.

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

Você receberá uma das seguintes mensagens de erro:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

Como estamos usando a nova versão 0.6 do Solidity, temos que adicionar a palavra-chave `virtual` para funções que podem ser sobrescritas e substituídas pela função substituta. Então vamos adicioná-los para ambas as funções `isPublic`.

Agora você pode usar `PrivateERC20Mock` nos seus testes de unidade. Quando você quiser testar o comportamento durante o tempo de uso privado, use `setIsPublic(false)` e, da mesma forma, `setIsPublic(true)` para testar o tempo de uso público. É claro que em nosso exemplo, poderíamos usar simplesmente [auxiliares de tempo](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) para alterar os tempos de acordo também. Mas a ideia de mocking deve estar clara agora e você pode imaginar cenários em que não é tão fácil quanto simplesmente avançar no tempo.

## Mocking em muitos contratos {#mocking-many-contracts}

Pode ficar confuso se você tiver que criar outro contrato para cada mock. Se isso incomoda você, dê uma olhada na biblioteca [MockContract](https://github.com/gnosis/mock-contract). Ele permite que você sobrescreva e modifique comportamentos de contratos em tempo real. No entanto, ele só funciona para chamadas mocking para outro contrato, portanto, não funcionaria para o nosso exemplo.

## Mocking podem ser ainda mais poderosas {#mocking-can-be-even-more-powerful}

Os poderes de mocking não terminam aí.

- Adicionando funções: sobrescrever uma função específica é útil, mas apenas acrescentar funções adicionais também poderá ser. Um bom exemplo para tokens é ter apenas uma função adicional `mint` para permitir que qualquer usuário obtenha novos tokens gratuitamente.
- Uso em testnets: ao implantar e testar seus contratos em testnets juntamente com seu Dapp, considere usar uma versão mock. Evite sobrescrever funções, a menos que você realmente precise. Afinal, você quer testar a lógica real. Mas adicionar, por exemplo, uma função de redefinição pode ser útil que simplesmente redefine o estado do contrato para o início, sem necessidade de nova implantação. Obviamente, você não gostaria de ter isso em um contrato na mainnet (rede principal).
