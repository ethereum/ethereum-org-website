---
title: Anatomia dos contratos inteligentes
description: Uma análise aprofundada na anatomia de um contrato inteligente - funções, dados e variáveis.
lang: pt-br
---

Um contrato inteligente (smart contract) é um programa executado em um endereço na Ethereum. Eles são compostos por dados e funções que podem ser executadas ao receber uma transação. Veja aqui uma visão geral do que compõe um contrato inteligente.

## Pré-requisitos {#prerequisites}

Não deixe de ler sobre [contratos inteligentes](/developers/docs/smart-contracts/). Este documento presume que você já está familiarizado com linguagens de programação como JavaScript ou Python.

## Dados {#data}

Quaisquer dados de contrato devem ser atribuídos a um local: seja para `armazenamento` ou `memória`. É caro modificar o armazenamento em um contrato inteligente, então você precisa considerar onde seus dados devem estar no ar.

### Armazenamento {#storage}

Dados persistentes são referidos como armazenamento e são representados por variáveis de estado. Esses valores são armazenados permanentemente na blockchain. É necessário declarar o tipo para que o contrato possa manter um registro de quanto espaço na blockchain será necessário quando ele compilar.

```solidity
// Exemplo Solidity
contract SimpleStorage {
    uint storedData; // State variable
    // ...
}
```

```python
# Exemplo Vyper
storedData: int128
```

Se você já programou linguagens orientadas a objetos, provavelmente você estará familiarizado com a maioria dos tipos. Entretanto, `address` (endereço) deve ser novo para você se você for novo no desenvolvimento com Ethereum.

Um tipo `address` pode conter um endereço Ethereum que equivale a 20 bytes ou 160 bits. Ele retorna em hexadecimal com um 0 à frente.

Outros tipos incluem:

- booleano
- inteiro
- números de ponto fixo
- arrays de bytes de tamanho fixo
- arrays de bytes de tamanho dinâmico
- Literais racionais e inteiros
- Literais de strings
- Literais hexadecimais
- Enumeradores

Para mais explicação, dê uma olhada na documentação:

- [Veja tipos de Vyper](https://vyper.readthedocs.io/en/v0.1.0-beta.6/types.html#value-types)
- [Veja tipos de Solidity](https://solidity.readthedocs.io/en/latest/types.html#value-types)

### Memória {#memory}

Valores que são armazenados apenas para a duração da execução da função de contratos são chamadas de variáveis de memória. Como estes não são armazenados permanentemente na blockchain, são muito mais baratos de usar.

Saiba mais sobre como a EVM armazena dados (Storage, Memória e Stack) em [Solidity docs](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html?highlight=memory#storage-memory-and-the-stack).

### Variáveis de ambiente {#environment-variables}

Além das variáveis definidas no seu contrato, existem algumas variáveis globais especiais. Elas são usadas principalmente para fornecer informações sobre a blockchain (cadeia de blocos) ou transação atual.

Exemplos:

| **Prop**          | **Variável de estado** | **Descrição**                         |
| ----------------- | ---------------------- | ------------------------------------- |
| `block.timestamp` | uint256                | Data/hora de início do bloco atual    |
| `msg.sender`      | endereço               | Remetente da mensagem (chamada atual) |

## Funções {#functions}

Da forma mais simplista, funções podem obter informação ou um conjunto de informações em resposta a entrada de transações.

Existem dois tipos de chamadas de função:

- `internal` - estas não criam uma chamada EVM
  - Funções internas e variáveis de estado só podem ser acessadas internamente (ou seja, de dentro do contrato atual ou de contratos derivados do mesmo)
- `external` - estas criam uma chamada EVM
  - Funções externas fazem parte da interface do contrato, o que significa que elas podem ser chamadas a partir de outros contratos e através de transações. Uma função externa `f` não pode ser chamada internamente (ou seja, `f()` não funciona, mas `this.f()` funciona).

Também podem ser `públicas` ou `privadas`

- `funções públicas` podem ser chamadas internamente a partir de dentro do contrato ou externamente por meio de mensagens
- `funções privadas` são visíveis apenas para o contrato no qual elas estão definidas e não nos contratos derivados

Tanto funções quanto variáveis de estado podem ser tornadas públicas ou privadas

Aqui está uma função para atualizar uma variável de estado em um contrato:

```solidity
// Exemplo de Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- O parâmetro `valor` do tipo `string` é passado para a função: `update_name`
- É declarado `público`, o que significa que qualquer um pode acessá-lo
- Não é declarada a `visão`, então ela pode modificar o estado do contrato

### Ver funções {#view-functions}

Essas funções prometem não modificar o estado dos dados do contrato. Exemplos comuns são funções "obter" – você pode usar isso para receber o saldo de um usuário, por exemplo.

```solidity
// Exemplo
function balanceOf(address _owner) public view return (uint256 _balance) {
    return ownerPizzaCount[_owner];
}
```

```python
dappName: public(string)

@view
@public
def readName() -> string:
  return dappName
```

O que é considerado como modificar estado:

1. Escrevendo variáveis de estado.
2. [Emitir eventos](https://solidity.readthedocs.io/en/v0.7.0/contracts.html#events).
3. [Criação de outros contratos](https://solidity.readthedocs.io/en/v0.7.0/control-structures.html#creating-contracts).
4. Usando `autodestruct`.
5. Enviando ether por chamadas.
6. Chamar qualquer função não marcada como`view`ou`puro`.
7. Usando chamadas de baixo nível.
8. Usando montagem em linha que contém certos códigos.

### Funções de "construtor" {#constructor-functions}

`construtor` funções são executadas apenas uma vez quando o contrato é implantado pela primeira vez. Como o `construtor` em muitas linguagens de programação baseadas em classe, essas funções geralmente inicializam variáveis de estado para seus valores especificados.

```solidity
// Exemplo Solidity
// Inicializa os dados do contrato, definindo o `owner`
// como endereço do criador do contrato.
constructor() public {
    // Todos os contratos inteligentes dependem de transações externas para acionar suas funções.
    // `msg` é uma variável global que inclui dados relevantes sobre a transação em questão,
    // como o endereço do remetente e o valor ETH incluído na transação.
    // Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Exemplo Vyper

@external
def __init__(_beneficiary: endereço, _bidding_time: uint256):
    mesmo. eneficiário = _beneficiário
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### Funções integradas {#built-in-functions}

Além das variáveis definidas no seu contrato, existem algumas variáveis globais especiais. O exemplo mais óbvio é:

- `address.send()` – Solidity
- `Enviar(endereço)` – Vyper

Estes permitem contratos para enviar ETH para outras contas.

## Como escrever funções {#writing-functions}

Sua função precisa:

- variável e tipo de parâmetro (se aceitar parâmetros)
- declaração de interno/externo
- declaração de puro/visualização/pagável
- tipo de retorno (se ele retornar um valor)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // state variable

    // Called when the contract is deployed and initializes the value
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Get Function
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Set Function
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Um contrato completo pode parecer algo assim. Aqui a função `construtor` fornece um valor inicial para a variável `dapp_name`.

## Eventos e registros {#events-and-logs}

Os eventos permitem que seu contrato inteligente se comunique com seu front-end ou outros aplicativos que se inscrevem para recebê-los. Uma vez que uma transação é validada e adicionada a um bloco, os contratos inteligentes podem emitir eventos e registrar informações, que o front-end pode processar e utilizar.

## Exemplos anotados {#annotated-examples}

Estes são alguns exemplos escritos em Solidity. Se você quiser brincar com o código, pode interagir com eles no [Remix](http://remix.ethereum.org).

### Hello World {#hello-world}

```solidity
// Especifica a versão do Solidity usando a versão semântica.
// Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Define um contrato chamado `HelloWorld`.
// Um contrato é uma coleção de funções e dados (seu estado).
// Uma vez implantado, um contrato reside em um endereço específico na blockchain Ethereum.
// Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Declita uma variável `message` de tipo `string`.
    // Variáveis de estado são variáveis cujos valores são permanentemente armazenados no armazenamento do contrato.
    // A palavra-chave 'público' torna variáveis acessíveis fora de um contrato
    // e cria uma função que outros contratos ou clientes podem chamar para acessar o valor.
    mensagem pública de cadeia;

    // Semelhante a muitas linguagens de objeto, baseadas em classes, um construtor é
    // uma função especial que é executada somente após a criação do contrato.
    // Os construtores são usados para inicializar os dados do contrato.
    // Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/contracts. tml#constructors
    constructor(string memory initMessage) public {
        // Aceita um argumento de string `initMessage` e define o valor
        // na variável de armazenamento `message` do contrato).
        message = initMessage;
    }

    // Uma função pública que aceita um argumento de string
    // e atualiza a variável de armazenamento `message`.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Token {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // Um "endereço" é comparável a um endereço de e-mail - é usado para comparar uma conta no Ethereum.
    // Endereços podem representar uma conta de contrato inteligente ou uma conta externa (usuário).
    // Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // Um `mapping` é essencialmente uma estrutura de dados de tabela de hash.
    // Este `mapeamento` atribui um inteiro não assinado (o saldo do token) a um endereço (o titular do token).
    // Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Eventos permitem registro de atividade no blockchain.
    // Clientes Ethereum podem ouvir eventos para reagir às alterações do estado do contrato.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Initializes the contract's data, setting the `owner`
    // to the address of the contract creator.
    constructor() public {
    // Todos os contratos inteligentes dependem de transações externas para acionar suas funções.
        // `msg` é uma variável global que inclui dados relevantes sobre a transação em questão,
    // como o endereço do remetente e o valor ETH incluído na transação.
        // Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Cria uma quantidade de novos tokens e os envia para um endereço.
    function mint(address receiver, uint amount) public {
        // `require` é uma estrutura de controle usada para aplicar certas condições.
        // Se um comando `require` for avaliado como `false`, uma exceção é acionada,
        // que reverte todas as alterações feitas ao estado durante a chamada atual.
        // Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/control-structures. tml#error-handling-assert-require-revert-and-exceptions

        // Somente o proprietário do contrato pode chamar esta função
        require(msg. remetente == dono, "Você não é o dono. );

        // Reforça uma quantidade máxima de tokens
        require(amount < 1e60, "Emissão máxima excedida");

        // Aumenta o saldo de `receiver` em `amount`
        saldos[receiver] += amount;
    }

    // Envia uma quantidade de tokens existentes de qualquer chamada para um endereço.
    function transfer(address receiver, uint amount) public {
        // O remetente deve ter tokens suficientes para enviar
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Ajusta os saldos do token dos dois endereços
        balances[msg.sender] -= quantidade;
        balances[receiver] += quantidade;

        // Emite um evendo definido anteriormente
        emite Transfer(msg.sender, receiver, amount);
    }
}
```

### Ativo digital único {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10.
// Neste caso, uma série de contratos auxiliares de OpenZeppelin.
// Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver. ol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// A palavra-chave `is` é usada para herdar funções e palavras-chave de contratos externos.
// Neste caso, o `CryptoPizza` herda dos contratos `IERC721` e `ERC165`.
// Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Usa a biblioteca OpenZeppelin para executar operações aritméticas de forma segura.
    // Saiba mais: https://docs.openzeppelin.com/contracts/2. /api/math#SafeMath
    usando SafeMath para uint256;

    // Variáveis de estado constantes em Solidity são semelhantes a outros idiomas
    // mas você deve atribuir a partir de uma expressão que é constante na hora de compilação.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Struct types let you define your own type
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Creates an empty array of Pizza structs
    Pizza[] public pizzas;

    // Mapping from pizza ID to its owner's address
    mapping(uint256 => address) public pizzaToOwner;

    // Mapping from owner's address to number of owned token
    mapping(address => uint256) public ownerPizzaCount;

    // Mapping from token ID to approved address
    mapping(uint256 => address) pizzaApprovals;

    // You can nest mappings, this example maps owner to operator approvals
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Internal function to create a random Pizza from string (name) and DNA
    function _createPizza(string memory _name, uint256 _dna)
        // The `internal` keyword means this function is only visible
        // within this contract and contracts that derive this contract
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` is a function modifier that checks if the pizza already exists
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Adds Pizza to array of Pizzas and get id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Checks that Pizza owner is the same as current user
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // note that address(0) is the zero address,
        // indicating that pizza[id] is not yet allocated to a particular user.

        assert(pizzaToOwner[id] == address(0));

        // Maps the Pizza to the owner
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Creates a random Pizza from string (name)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Generates random DNA from string (name) and address of the owner (creator)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Functions marked as `pure` promise not to read from or modify the state
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Generates random uint from string (name) + address (owner)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Returns array of Pizzas found by owner
    function getPizzasByOwner(address _owner)
        public
        // Functions marked as `view` promise not to modify state
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Uses the `memory` storage location to store values only for the
        // lifecycle of this function call.
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
        uint256[] memory result = new uint256[](ownerPizzaCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (pizzaToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    // Transfers Pizza and ownership to other address
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Emits event defined in the imported IERC721 contract
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Safely transfers the ownership of a given token ID to another address
     * If the target address is a contract, it must implement `onERC721Received`,
     * which is called upon a safe transfer, and return the magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * otherwise, the transfer is reverted.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Safely transfers the ownership of a given token ID to another address
     * If the target address is a contract, it must implement `onERC721Received`,
     * which is called upon a safe transfer, and return the magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * otherwise, the transfer is reverted.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Must implement onERC721Received.");
    }

    /**
     * Internal function to invoke `onERC721Received` on a target address
     * The call is not executed if the target address is not a contract
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) internal returns (bool) {
        if (!isContract(to)) {
            return true;
        }

        bytes4 retval = IERC721Receiver(to).onERC721Received(
            msg.sender,
            from,
            pizzaId,
            _data
        );
        return (retval == _ERC721_RECEIVED);
    }

    // Burns a Pizza - destroys Token completely
    // The `external` function modifier means this function is
    // part of the contract interface and other contracts can call it
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // Returns count of Pizzas by address
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Returns owner of the Pizza found by id
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Approves other address to transfer ownership of Pizza
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Returns approved address for specific Pizza
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Private function to clear current approval of a given token ID
     * Reverts if the given address is not indeed the owner of the token
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Sets or unsets the approval of a given operator
     * An operator is allowed to transfer all tokens of the sender on their behalf
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Tells whether an operator is approved by a given owner
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Takes ownership of Pizza - only for approved users
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Checks if Pizza exists
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Checks if address is owner or is approved to transfer Pizza
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Disable solium check because of
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Check if Pizza is unique and doesn't exist yet
    modifier isUnique(string memory _name, uint256 _dna) {
        bool result = true;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (
                keccak256(abi.encodePacked(pizzas[i].name)) ==
                keccak256(abi.encodePacked(_name)) &&
                pizzas[i].dna == _dna
            ) {
                result = false;
            }
        }
        require(result, "Pizza with such name already exists.");
        _;
    }

    // Returns whether the target address is a contract
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Currently there is no better way to check if there is a contract in an address
        // than to check the size of the code at that address.
        // See https://ethereum.stackexchange.com/a/14016/36603
        // for more details about how this works.
        // TODO Check this again before the Serenity release, because all addresses will be
        // contracts then.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Leitura adicional {#further-reading}

Confira a documentação sobre Solidity e Vyper para ter uma visão geral mais completa dos contratos inteligentes:

- [Solidity](https://solidity.readthedocs.io/)
- [Vyper](https://vyper.readthedocs.io/)

## Tópicos relacionados {#related-topics}

- [Smart Contracts](/developers/docs/smart-contracts/)
- [Máquina Virtual Ethereum](/developers/docs/evm/)

## Tutoriais relacionados {#related-tutorials}

- [Diminuir contratos para enfrentar o limite de tamanho do contrato](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Algumas dicas práticas para reduzir o tamanho de seu contrato inteligente._
- [Registrando dados de contratos inteligentes com eventos](/developers/tutorials/logging-events-smart-contracts/) _– Uma introdução aos eventos de contratos inteligentes e como você pode usá-los para registrar dados._
- [Interaja com outros contratos Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Como implantar um contrato inteligente a partir de um contrato existente e interagir com ele._
