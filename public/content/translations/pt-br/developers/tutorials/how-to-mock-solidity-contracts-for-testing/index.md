---
title: Como fazer mock de contratos inteligentes em Solidity para testes
description: "Por que você deve fazer mock dos seus contratos ao testar"
author: Markus Waas
lang: pt-br
tags: ["Solidity", "contratos inteligentes", "tes", "mocking"]
skill: intermediate
breadcrumb: Mocking de contratos
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Objetos mock](https://wikipedia.org/wiki/Mock_object) são um padrão de projeto comum na programação orientada a objetos. Vindo da antiga palavra francesa 'mocquer' com o significado de 'zombar', evoluiu para 'imitar algo real', que é exatamente o que estamos fazendo na programação. Por favor, só zombe dos seus contratos inteligentes se você quiser, mas faça mock deles sempre que puder. Isso facilita a sua vida.

## Testes unitários de contratos com mocks {#unit-testing-contracts-with-mocks}

Fazer mock de um contrato significa essencialmente criar uma segunda versão desse contrato que se comporta de maneira muito semelhante à original, mas de uma forma que pode ser facilmente controlada pelo desenvolvedor. Muitas vezes você acaba com contratos complexos onde você só quer [testar unitariamente pequenas partes do contrato](/developers/docs/smart-contracts/testing/). O problema é: e se testar essa pequena parte exigir um estado de contrato muito específico que é difícil de alcançar?

Você poderia escrever uma lógica complexa de configuração de teste toda vez para colocar o contrato no estado necessário, ou você escreve um mock. Fazer mock de um contrato é fácil com herança. Basta criar um segundo contrato mock que herda do original. Agora você pode substituir (override) funções no seu mock. Vamos ver isso com um exemplo.

Os exemplos abaixo usam [Foundry](https://www.getfoundry.sh/introduction/installation) e OpenZeppelin Contracts 5.x. Para acompanhar, crie um projeto e instale a OpenZeppelin:

```sh
forge init private-erc20
cd private-erc20
forge install OpenZeppelin/openzeppelin-contracts
```

O Foundry reconhece o remapeamento de importação `@openzeppelin/contracts/` da biblioteca instalada automaticamente.

## Exemplo: ERC-20 Privado {#example-private-erc20}

Usamos um contrato ERC-20 de exemplo que tem um tempo privado inicial. O proprietário pode gerenciar usuários privados e apenas esses terão permissão para receber tokens no início. Depois que um certo tempo passar, todos terão permissão para usar os tokens. Se você estiver curioso, estamos substituindo a função [`_update`](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20-_update-address-address-uint256-) da OpenZeppelin Contracts 5.x, pela qual toda cunhagem, queima e transferência passa.

Salve isso como `src/PrivateERC20.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateERC20 is ERC20, Ownable {
    mapping (address => bool) public isPrivateUser;
    uint256 private publicAfterTime;

    constructor(uint256 privateERC20timeInSec) ERC20("PrivateERC20", "PRIV") Ownable(msg.sender) {
        publicAfterTime = block.timestamp + privateERC20timeInSec;
    }

    function addUser(address user) external onlyOwner {
        isPrivateUser[user] = true;
    }

    function isPublic() public view returns (bool) {
        return block.timestamp >= publicAfterTime;
    }

    function _update(address from, address to, uint256 value) internal virtual override {
        require(_validRecipient(to), "PrivateERC20: invalid recipient");

        super._update(from, to, value);
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

E agora vamos fazer o mock dele. Salve isso como `src/mocks/PrivateERC20Mock.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {PrivateERC20} from "../PrivateERC20.sol";

contract PrivateERC20Mock is PrivateERC20 {
    bool isPublicConfig;

    constructor() PrivateERC20(0) {}

    function setIsPublic(bool isPublic_) external {
        isPublicConfig = isPublic_;
    }

    function isPublic() public view returns (bool) {
        return isPublicConfig;
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
```

Quando você executar `forge build`, você receberá as seguintes mensagens de erro:

- `Error (9456): Overriding function is missing "override" specifier.`
- `Error (4334): Trying to override non-virtual function. Did you forget to add "virtual"?`

Desde a Solidity 0.6, você tem que adicionar a palavra-chave `virtual` para funções que podem ser substituídas e `override` para a função que a substitui. Então vamos adicioná-las a ambas as funções `isPublic`:

```solidity
// Em PrivateERC20.sol
function isPublic() public view virtual returns (bool) {

// Em PrivateERC20Mock.sol
function isPublic() public view override returns (bool) {
```

Agora, em seus testes unitários, você pode usar `PrivateERC20Mock` em vez disso. Quando você quiser testar o comportamento durante o tempo de uso privado, use `setIsPublic(false)` e, da mesma forma, `setIsPublic(true)` para testar o tempo de uso público. O mock também tem uma função `mint`, para que os testes possam criar saldos sem nenhuma configuração extra. Salve isso como `test/PrivateERC20.t.sol` e execute `forge test`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {PrivateERC20} from "../src/PrivateERC20.sol";
import {PrivateERC20Mock} from "../src/mocks/PrivateERC20Mock.sol";

contract PrivateERC20Test is Test {
    PrivateERC20Mock token;
    address alice = makeAddr("alice");

    function setUp() public {
        token = new PrivateERC20Mock();
    }

    function test_PrivatePhaseRejectsUnknownRecipient() public {
        token.setIsPublic(false);

        vm.expectRevert("PrivateERC20: invalid recipient");
        token.mint(alice, 1 ether);
    }

    function test_PrivatePhaseAcceptsPrivateUser() public {
        token.setIsPublic(false);
        token.addUser(alice);

        token.mint(alice, 1 ether);
        assertEq(token.balanceOf(alice), 1 ether);
    }

    function test_PublicPhaseAcceptsAnyRecipient() public {
        token.setIsPublic(true);

        token.mint(alice, 1 ether);
        assertEq(token.balanceOf(alice), 1 ether);
    }

    function test_BecomesPublicAfterTime() public {
        PrivateERC20 realToken = new PrivateERC20(1 days);
        assertFalse(realToken.isPublic());

        vm.warp(block.timestamp + 1 days);
        assertTrue(realToken.isPublic());
    }
}
```

Claro que no nosso exemplo, poderíamos apenas alterar o tempo de bloco em vez disso, como o último teste faz com o cheatcode [`vm.warp`](https://www.getfoundry.sh/reference/cheatcodes/warp) do Foundry (no Hardhat, use os [ajudantes de rede `time`](https://hardhat.org/docs/plugins/hardhat-network-helpers#increase)). Mas a ideia de fazer mock deve estar clara agora e você pode imaginar cenários onde não é tão fácil quanto simplesmente avançar o tempo.

## Fazendo mock de muitos contratos {#mocking-many-contracts}

Pode ficar confuso se você tiver que criar outro contrato para cada mock. Se isso incomoda você, os cheatcodes [`vm.mockCall`](https://www.getfoundry.sh/reference/cheatcodes/mock-call) e [`vm.mockCallRevert`](https://www.getfoundry.sh/reference/cheatcodes/mock-call-revert) do Foundry permitem que você altere o que um contrato retorna em tempo real, mesmo para um endereço que não tem nenhum código:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MockCallTest is Test {
    function test_MockedBalance() public {
        address someToken = makeAddr("someToken");
        address alice = makeAddr("alice");

        vm.mockCall(
            someToken,
            abi.encodeCall(IERC20.balanceOf, (alice)),
            abi.encode(100 ether)
        );

        assertEq(IERC20(someToken).balanceOf(alice), 100 ether);
    }
}
```

No entanto, funciona apenas para fazer mock de chamadas para outro contrato. `PrivateERC20` chama `isPublic()` internamente, o que nunca passa por uma chamada externa, então não funcionaria para o nosso exemplo.

## Fazer mock pode ser ainda mais poderoso {#mocking-can-be-even-more-powerful}

Os poderes de fazer mock não terminam aí.

- Adicionando funções: Não apenas substituir uma função específica é útil, mas também apenas adicionar funções adicionais. Um bom exemplo para tokens é apenas ter uma função `mint` adicional para permitir que qualquer usuário obtenha novos tokens gratuitamente, como a do `PrivateERC20Mock` acima.
- Uso em redes de teste: Quando você implantar e testar seus contratos em redes de teste junto com seu dapp, considere usar uma versão mock. Evite substituir funções a menos que você realmente precise. Afinal, você quer testar a lógica real. Mas adicionar, por exemplo, uma função de redefinição pode ser útil, que simplesmente redefine o estado do contrato para o início, sem necessidade de nova implantação. Obviamente, você não gostaria de ter isso em um contrato na Mainnet.
