---
title: Como fazer mock de contratos inteligentes em Solidity para testes
description: Por que você deve fazer mock dos seus contratos ao testar
author: Markus Waas
lang: pt-br
tags: ["solidity", "contratos inteligentes", "testes", "mocking"]
skill: intermediate
breadcrumb: Mocking de contratos
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Objetos mock](https://wikipedia.org/wiki/Mock_object) são um padrão de projeto comum na programação orientada a objetos. Vindo da antiga palavra francesa 'mocquer' com o significado de 'zombar', evoluiu para 'imitar algo real', que é exatamente o que estamos fazendo na programação. Por favor, só zombe dos seus contratos inteligentes se você quiser, mas faça mock deles sempre que puder. Isso facilita a sua vida.

## Testes unitários de contratos com mocks {#unit-testing-contracts-with-mocks}

Fazer o mock de um contrato significa essencialmente criar uma segunda versão desse contrato que se comporta de maneira muito semelhante à original, mas de uma forma que pode ser facilmente controlada pelo desenvolvedor. Muitas vezes você acaba com contratos complexos onde você só quer [fazer testes unitários de pequenas partes do contrato](/developers/docs/smart-contracts/testing/). O problema é: e se testar essa pequena parte exigir um estado de contrato muito específico que é difícil de alcançar?

Você poderia escrever uma lógica complexa de configuração de teste toda vez que colocar o contrato no estado necessário ou você escreve um mock. Fazer mock de um contrato é fácil com herança. Basta criar um segundo contrato mock que herda do original. Agora você pode sobrescrever funções para o seu mock. Vamos ver isso com um exemplo.

## Exemplo: ERC-20 Privado {#example-private-erc20}

Usamos um contrato ERC-20 de exemplo que tem um tempo privado inicial. O proprietário pode gerenciar usuários privados e apenas esses terão permissão para receber tokens no início. Uma vez que um certo tempo tenha passado, todos terão permissão para usar os tokens. Se você estiver curioso, estamos usando o hook [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) dos novos contratos v3 da OpenZeppelin.

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

E agora vamos fazer o mock dele.

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

Como estamos usando a nova versão 0.6 da Solidity, temos que adicionar a palavra-chave `virtual` para funções que podem ser sobrescritas e override para a função que está sobrescrevendo. Então, vamos adicioná-las a ambas as funções `isPublic`.

Agora, em seus testes unitários, você pode usar `PrivateERC20Mock` em vez disso. Quando você quiser testar o comportamento durante o tempo de uso privado, use `setIsPublic(false)` e da mesma forma `setIsPublic(true)` para testar o tempo de uso público. Claro que em nosso exemplo, poderíamos apenas usar [ajudantes de tempo (time helpers)](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) para alterar os tempos de acordo também. Mas a ideia de fazer mock deve estar clara agora e você pode imaginar cenários onde não é tão fácil quanto simplesmente avançar o tempo.

## Fazendo mock de muitos contratos {#mocking-many-contracts}

Pode se tornar uma bagunça se você tiver que criar outro contrato para cada mock. Se isso te incomoda, você pode dar uma olhada na biblioteca [MockContract](https://github.com/gnosis/mock-contract). Ela permite que você sobrescreva e altere os comportamentos dos contratos dinamicamente (on-the-fly). No entanto, ela funciona apenas para fazer mock de chamadas para outro contrato, então não funcionaria para o nosso exemplo.

## Fazer mock pode ser ainda mais poderoso {#mocking-can-be-even-more-powerful}

Os poderes do mock não terminam aí.

- Adicionando funções: Não apenas sobrescrever uma função específica é útil, mas também apenas adicionar funções adicionais. Um bom exemplo para tokens é apenas ter uma função `mint` adicional para permitir que qualquer usuário obtenha novos tokens gratuitamente.
- Uso em testnets: Quando você implantar e testar seus contratos em testnets junto com seu aplicativo descentralizado (dapp), considere usar uma versão mock. Evite sobrescrever funções a menos que você realmente precise. Afinal, você quer testar a lógica real. Mas adicionar, por exemplo, uma função de redefinição (reset) pode ser útil, pois simplesmente redefine o estado do contrato para o início, sem a necessidade de uma nova implantação. Obviamente, você não gostaria de ter isso em um contrato na Mainnet.