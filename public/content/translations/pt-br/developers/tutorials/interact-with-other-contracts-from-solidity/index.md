---
title: Interaja com outros contratos de Solidity
description: Como implantar um contrato inteligente a partir de um contrato existente e interagir com ele
author: "jdourlens"
tags:
  - "contratos Inteligentes"
  - "solidity"
  - "remix"
  - "implementação"
  - "componibilidade"
skill: advanced
lang: pt-br
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Nos tutoriais anteriores, aprendemos muito [como publicar seu primeiro contrato inteligente](/developers/tutorials/deploying-your-first-smart-contract/) e adicionar alguns recursos a ele, como [controlar o acesso com modificadores](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) ou [manipulação de erros no Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). Neste tutorial, aprenderemos como implantar um contrato inteligente a partir de um contrato existente e interagir com ele.

Faremos um contrato que permite a qualquer pessoa ter seu próprio contrato inteligente`Counter`, criando uma fábrica para ele. Seu nome será `CounterFactory`. De início, aqui está o código do nosso primeiro contrato inteligente `Counter`:

```solidity
pragma solidity 0.5.17;

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

     constructor(address owner) public {
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

Note que modificamos ligeiramente o código do contrato para manter um controle do endereço da fábrica e do endereço do proprietário. Quando você chamar um código de contrato de outro contrato, o msg.sender irá consultar o endereço da nossa fábrica de contratos. Este é **um ponto muito importante para entender** como usar um contrato para interagir com outros contratos é uma prática comum. Você deve, portanto, cuidar de quem é o remetente em casos complexos.

Para isso também adicionamos um modificador de `onlyFactory` que certifica-se de que a função de mudança de estado só pode ser chamada pela fábrica que passará o chamador original como um parâmetro.

Dentro de nossa nova `CounterFactory` que gerenciará todos os outros Counters, adicionaremos um mapeamento que associará o proprietário ao endereço de seu contrato:

```solidity
mapping(address => Counter) _counters;
```

Na Ethereum, o mapeamento é equivalente a objetos em Javascript. Eles permitem mapear uma chave do tipo A para um valor do tipo B. Neste caso, mapeamos o endereço de um proprietário com a instância de seu Counter.

Instanciar um novo Counter para alguém ficará assim:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Primeiro, verificamos se a pessoa já possui um Counter. Se ele não tem um Counter, instanciamos um novo Counter, passando seu endereço para o construtor `Counter` e atribuímos a instância recém-criada para o mapeamento.

Para obter a contagem de um Counter específico, fica assim:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

A primeira função verifica se o contrato do Counter existe para um determinado endereço e, em seguida, chama o método `getCount` a partir da instância. A segunda função: `getMyCount` é apenas um breve fim para passar a função msg.sender diretamente para a função `getCount`.

A função `increment` é bastante parecida, mas passa o remetente da transação original para o contrato `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Observe que, se for chamado várias vezes, nosso contador poderá ser vítima de um transbordamento ("overflow"). Você deve usar a [biblioteca SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) tanto quanto possível para se proteger deste possível caso.

Para implantar nosso contrato, você precisará fornecer tanto o código da `CounterFactory` quanto o `Counter`. Ao implantar, por exemplo, em Remix, você precisará selecionar a CounterFactory.

Aqui está o código completo:

```solidity
pragma solidity 0.5.17;

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

     constructor(address owner) public {
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
        require (_counters[msg.sender] == Counter(0));
        _counters[msg.sender] = new Counter(msg.sender);
    }

    function increment() public {
        require (_counters[msg.sender] != Counter(0));
        Counter(_counters[msg.sender]).increment(msg.sender);
    }

    function getCount(address account) public view returns (uint256) {
        require (_counters[account] != Counter(0));
        return (_counters[account].getCount());
    }

    function getMyCount() public view returns (uint256) {
        return (getCount(msg.sender));
    }

}
```

Depois de compilar, na seção de implante de Remix, você selecionará a fábrica a ser implantada:

![Selecionando a fábrica a ser implantada no Remix](./counterfactory-deploy.png)

Então você pode brincar com sua fábrica de contrato e verificar a mudança de valor. Se você prefere chamar o contrato inteligente a partir de um endereço diferente, altere o endereço na Conta selecionada do Remix.
