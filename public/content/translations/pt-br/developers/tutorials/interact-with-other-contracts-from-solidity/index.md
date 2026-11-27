---
title: Interagir com outros contratos a partir do Solidity
description: Como implantar um contrato inteligente a partir de um contrato existente e interagir com ele
author: "jdourlens"
tags: ["contratos inteligentes", "Solidity", "Remix", "implantação", "composabilidade"]
skill: advanced
breadcrumb: "Interações de contrato"
lang: pt-br
published: 2020-04-05
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Nos tutoriais anteriores, aprendemos muito sobre [como implantar seu primeiro contrato inteligente](/developers/tutorials/deploying-your-first-smart-contract/) e adicionar alguns recursos a ele, como [controlar o acesso com modificadores](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) ou [tratamento de erros em Solidity](https://docs.soliditylang.org/en/latest/control-structures.html#error-handling-assert-require-revert-and-exceptions). Neste tutorial, aprenderemos como implantar um contrato inteligente a partir de um contrato existente e interagir com ele.

Faremos um contrato que permite que qualquer pessoa tenha seu próprio contrato inteligente `Counter` criando uma fábrica (factory) para ele, seu nome será `CounterFactory`. Primeiro, aqui está o código do nosso contrato inteligente `Counter` inicial:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
        _;
    }

     constructor(address owner) {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}
```

Observe que modificamos um pouco o código do contrato para manter um registro do endereço da fábrica e do endereço do proprietário do contrato. Quando você chama um código de contrato a partir de outro contrato, o msg.sender se referirá ao endereço da nossa fábrica de contratos. Este é **um ponto muito importante para entender**, pois usar um contrato para interagir com outros contratos é uma prática comum. Portanto, você deve tomar cuidado com quem é o remetente em casos complexos.

Para isso, também adicionamos um modificador `onlyFactory` que garante que a função de alteração de estado só possa ser chamada pela fábrica que passará o chamador original como parâmetro.

Dentro do nosso novo `CounterFactory` que gerenciará todos os outros Counters, adicionaremos um mapeamento (mapping) que associará um proprietário ao endereço do seu contrato de contador:

```solidity
mapping(address => Counter) _counters;
```

Em Solidity, os [mapeamentos](https://docs.soliditylang.org/en/latest/types.html#mapping-types) são semelhantes aos objetos em JavaScript: eles mapeiam uma chave do tipo A para um valor do tipo B. Neste caso, mapeamos o endereço de um proprietário com a instância do seu Counter.

Instanciar um novo Counter para alguém será parecido com isto:

```solidity
  function createCounter() public {
      require(address(_counters[msg.sender]) == address(0), "You already have a counter");
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Primeiro, verificamos se a pessoa já possui um contador. Um mapeamento retorna o valor padrão para chaves que nunca foram definidas, o que para um tipo de contrato é o endereço zero, então comparamos o endereço do contrato armazenado com `address(0)`. Se ele não possuir um contador, instanciamos um novo contador passando seu endereço para o construtor do `Counter` e atribuímos a instância recém-criada ao mapeamento.

Para obter a contagem de um Counter específico, será parecido com isto:

```solidity
function getCount(address account) public view returns (uint256) {
    require(address(_counters[account]) != address(0), "This account has no counter");
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

A primeira função verifica se o contrato Counter existe para um determinado endereço e, em seguida, chama o método `getCount` da instância. A segunda função: `getMyCount` é apenas um atalho para passar o msg.sender diretamente para a função `getCount`.

A função `increment` é bastante semelhante, mas passa o remetente original da transação para o contrato `Counter`:

```solidity
function increment() public {
      require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
      _counters[msg.sender].increment(msg.sender);
  }
```

Desde o Solidity 0.8, a aritmética é [verificada por padrão](https://docs.soliditylang.org/en/latest/control-structures.html#checked-or-unchecked-arithmetic): se `_count` transbordasse (overflow), `_count++` reverteria a transação em vez de reiniciar silenciosamente, portanto, nenhuma biblioteca extra como SafeMath é necessária.

Para implantar nosso contrato, você precisará fornecer tanto o código do `CounterFactory` quanto o do `Counter`. Ao implantar, por exemplo, no Remix, você precisará selecionar CounterFactory.

Aqui está o código completo:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
        _;
    }

     constructor(address owner) {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}

contract CounterFactory {

    mapping(address => Counter) _counters;

    function createCounter() public {
        require(address(_counters[msg.sender]) == address(0), "You already have a counter");
        _counters[msg.sender] = new Counter(msg.sender);
    }

    function increment() public {
        require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
        _counters[msg.sender].increment(msg.sender);
    }

    function getCount(address account) public view returns (uint256) {
        require(address(_counters[account]) != address(0), "This account has no counter");
        return (_counters[account].getCount());
    }

    function getMyCount() public view returns (uint256) {
        return (getCount(msg.sender));
    }

}
```

Após a compilação, na seção de implantação do Remix, você selecionará a fábrica a ser implantada:

![Selecionando a fábrica a ser implantada no Remix](./counterfactory-deploy.png)

Então você pode brincar com sua fábrica de contratos e verificar a mudança de valor. Se você quiser chamar o contrato inteligente a partir de um endereço diferente, precisará alterar o endereço na seleção de Conta (Account) do Remix.
