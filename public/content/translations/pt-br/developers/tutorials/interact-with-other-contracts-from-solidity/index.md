---
title: Interaja com outros contratos de Solidity
description: Como implantar um contrato inteligente a partir de um contrato existente e interagir com ele
author: "jdourlens"
tags:
  [
    "smart contracts",
    "solidez",
    "remix",
    "implantação",
    "componibilidade"
  ]
skill: advanced
lang: pt-br
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Nos tutoriais anteriores, aprendemos muito sobre [como implantar seu primeiro contrato inteligente](/developers/tutorials/deploying-your-first-smart-contract/) e adicionar alguns recursos a ele, como [controle de acesso com modificadores](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) ou [tratamento de erros no Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). Neste tutorial, aprenderemos como implantar um contrato inteligente a partir de um contrato existente e interagir com ele.

Faremos um contrato que permite a qualquer pessoa ter seu próprio contrato inteligente `Counter`, criando uma fábrica para ele. Seu nome será `CounterFactory`. Primeiro, aqui está o código do nosso contrato inteligente `Counter` inicial:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "Você não é o proprietário do contrato");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "Você precisa usar a fábrica");
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

Observe que modificamos ligeiramente o código do contrato para manter um registro do endereço da fábrica e do endereço do proprietário do contrato. Quando você chama o código de um contrato a partir de outro, o `msg.sender` se referirá ao endereço da nossa fábrica de contratos. Este é **um ponto muito importante a ser entendido**, pois usar um contrato para interagir com outros é uma prática comum. Portanto, você deve ter cuidado com quem é o remetente em casos complexos.

Para isso, também adicionamos um modificador `onlyFactory` que garante que a função que altera o estado só possa ser chamada pela fábrica, que passará o chamador original como um parâmetro.

Dentro de nossa nova `CounterFactory`, que gerenciará todos os outros `Counters`, adicionaremos um mapeamento que associará um proprietário ao endereço de seu contrato `Counter`:

```solidity
mapping(address => Counter) _counters;
```

No Ethereum, mapeamentos são o equivalente a objetos em JavaScript; eles permitem mapear uma chave do tipo A para um valor do tipo B. Nesse caso, mapeamos o endereço de um proprietário com a instância de seu `Counter`.

Instanciar um novo `Counter` para alguém ficará assim:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Primeiro, verificamos se a pessoa já possui um `Counter`. Se a pessoa não possuir um `Counter`, nós instanciamos um novo, passando o endereço dela para o construtor `Counter`, e atribuímos a instância recém-criada ao mapeamento.

Para obter a contagem de um `Counter` específico, o código será assim:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

A primeira função verifica se o contrato `Counter` existe para um determinado endereço e, em seguida, chama o método `getCount` da instância. A segunda função, `getMyCount`, é apenas um atalho para passar o `msg.sender` diretamente para a função `getCount`.

A função `increment` é bem parecida, mas passa o remetente da transação original para o contrato `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Observe que, se chamada muitas vezes, nosso contador poderia ser vítima de um estouro (overflow). Você deve usar a [biblioteca SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) o máximo possível para se proteger desse possível caso.

Para implantar nosso contrato, você precisará fornecer tanto o código da `CounterFactory` quanto o do `Counter`. Ao implantar, por exemplo, no Remix, você precisará selecionar `CounterFactory`.

Aqui está o código completo:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "Você não é o proprietário do contrato");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "Você precisa usar a fábrica");
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

Após a compilação, na seção de implantação do Remix, você selecionará a fábrica a ser implantada:

![Selecionando a fábrica a ser implantada no Remix](./counterfactory-deploy.png)

Então você pode experimentar sua fábrica de contratos e verificar a alteração de valor. Se você quiser chamar o contrato inteligente de um endereço diferente, precisará alterar o endereço no seletor de Contas do Remix.
