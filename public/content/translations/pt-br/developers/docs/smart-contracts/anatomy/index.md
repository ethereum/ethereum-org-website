---
title: Anatomia dos contratos inteligentes
description: "Um olhar aprofundado sobre a anatomia de um contrato inteligente – as funções, dados e variáveis."
lang: pt-br
---

Um contrato inteligente é um programa que roda em um endereço na Ethereum. Eles são compostos por dados e funções que podem ser executados ao receber uma transação. Aqui está uma visão geral do que compõe um contrato inteligente.

## Pré-requisitos {#prerequisites}

Certifique-se de ter lido sobre [contratos inteligentes](/developers/docs/smart-contracts/) primeiro. Este documento pressupõe que você já esteja familiarizado com linguagens de programação como JavaScript ou Python.

## Dados {#data}

Quaisquer dados do contrato devem ser atribuídos a um local: seja para `storage` ou `memory`. É custoso modificar o armazenamento em um contrato inteligente, então você precisa considerar onde seus dados devem residir.

### Armazenamento {#storage}

Dados persistentes são chamados de armazenamento (storage) e são representados por variáveis de estado. Esses valores são armazenados permanentemente na blockchain. Você precisa declarar o tipo para que o contrato possa rastrear quanto armazenamento na blockchain ele precisa quando for compilado.

```solidity
// Exemplo em Solidity
contract SimpleStorage {
    uint storedData; // Variável de estado
    // ...
}
```

```python
# Exemplo em Vyper
storedData: int128
```

Se você já programou em linguagens orientadas a objetos, provavelmente estará familiarizado com a maioria dos tipos. No entanto, `address` deve ser novo para você se for iniciante no desenvolvimento na [Ethereum](/).

Um tipo `address` pode conter um endereço Ethereum, o que equivale a 20 bytes ou 160 bits. Ele retorna em notação hexadecimal com um 0x inicial.

Outros tipos incluem:

- booleano
- inteiro
- números de ponto fixo
- matrizes de bytes de tamanho fixo
- matrizes de bytes de tamanho dinâmico
- literais racionais e inteiros
- literais de string
- literais hexadecimais
- enums

Para mais explicações, dê uma olhada na documentação:

- [Veja os tipos em Vyper](https://docs.vyperlang.org/en/stable/types.html#value-types)
- [Veja os tipos em Solidity](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Memória {#memory}

Valores que são armazenados apenas durante o tempo de vida da execução de uma função do contrato são chamados de variáveis de memória. Como não são armazenados permanentemente na blockchain, eles são muito mais baratos de usar.

Aprenda mais sobre como a Máquina Virtual Ethereum (EVM) armazena dados (Armazenamento, Memória e a Pilha) na [documentação da Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

### Variáveis de ambiente {#environment-variables}

Além das variáveis que você define no seu contrato, existem algumas variáveis globais especiais. Elas são usadas principalmente para fornecer informações sobre a blockchain ou a transação atual.

Exemplos:

| **Propriedade**          | **Variável de estado** | **Descrição**                      |
| ----------------- | ------------------ | ------------------------------------ |
| `block.timestamp` | uint256            | Timestamp da época do bloco atual        |
| `msg.sender`      | address            | Remetente da mensagem (chamada atual) |

## Funções {#functions}

Nos termos mais simples, as funções podem obter informações ou definir informações em resposta a transações recebidas.

Existem dois tipos de chamadas de função:

- `internal` – estas não criam uma chamada na EVM
  - Funções internas e variáveis de estado só podem ser acessadas internamente (ou seja, de dentro do contrato atual ou de contratos derivados dele)
- `external` – estas criam uma chamada na EVM
  - Funções externas fazem parte da interface do contrato, o que significa que podem ser chamadas de outros contratos e por meio de transações. Uma função externa `f` não pode ser chamada internamente (ou seja, `f()` não funciona, mas `this.f()` funciona).

Elas também podem ser `public` ou `private`

- Funções `public` podem ser chamadas internamente de dentro do contrato ou externamente por meio de mensagens
- Funções `private` são visíveis apenas para o contrato em que estão definidas e não em contratos derivados

Tanto as funções quanto as variáveis de estado podem ser tornadas públicas ou privadas

Aqui está uma função para atualizar uma variável de estado em um contrato:

```solidity
// Exemplo em Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- O parâmetro `value` do tipo `string` é passado para a função: `update_name`
- É declarada como `public`, o que significa que qualquer um pode acessá-la
- Não é declarada como `view`, então pode modificar o estado do contrato

### Funções de visualização {#view-functions}

Essas funções prometem não modificar o estado dos dados do contrato. Exemplos comuns são funções "getter" – você pode usar isso para receber o saldo de um usuário, por exemplo.

```solidity
// Exemplo em Solidity
function balanceOf(address _owner) public view returns (uint256 _balance) {
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

O que é considerado modificar o estado:

1. Escrever em variáveis de estado.
2. [Emitir eventos](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [Criar outros contratos](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. Usar `selfdestruct`.
5. Enviar ether por meio de chamadas.
6. Chamar qualquer função não marcada como `view` ou `pure`.
7. Usar chamadas de baixo nível.
8. Usar assembly inline que contém certos opcodes.

### Funções construtoras {#constructor-functions}

As funções `constructor` são executadas apenas uma vez quando o contrato é implantado pela primeira vez. Como o `constructor` em muitas linguagens de programação baseadas em classes, essas funções geralmente inicializam variáveis de estado com seus valores especificados.

```solidity
// Exemplo em Solidity
// Inicializa os dados do contrato, definindo o `owner`
// para o endereço do criador do contrato.
constructor() public {
    // Todos os contratos inteligentes dependem de transações externas para acionar suas funções.
    // `msg` é uma variável global que inclui dados relevantes sobre a transação fornecida,
    // como o endereço do remetente e o valor em ETH incluído na transação.
    // Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Exemplo em Vyper

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### Funções integradas {#built-in-functions}

Além das variáveis e funções que você define no seu contrato, existem algumas funções integradas especiais. O exemplo mais óbvio é:

- `address.send()` – Solidity
- `send(address)` – Vyper

Elas permitem que os contratos enviem ETH para outras contas.

## Escrevendo funções {#writing-functions}

Sua função precisa de:

- variável de parâmetro e tipo (se aceitar parâmetros)
- declaração de internal/external
- declaração de pure/view/payable
- tipo de retorno (se retornar um valor)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // variável de estado

    // Chamado quando é feito o deploy do contrato e inicializa o valor
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Função Get
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Função Set
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Um contrato completo pode ser parecido com isto. Aqui, a função `constructor` fornece um valor inicial para a variável `dapp_name`.

## Eventos e logs {#events-and-logs}

Os eventos permitem que seu contrato inteligente se comunique com seu frontend ou outros aplicativos inscritos. Uma vez que uma transação é validada e adicionada a um bloco, os contratos inteligentes podem emitir eventos e registrar informações em log, que o frontend pode então processar e utilizar.

## Exemplos comentados {#annotated-examples}

Estes são alguns exemplos escritos em Solidity. Se você quiser brincar com o código, pode interagir com eles no [Remix](https://remix.ethereum.org).

### Olá, mundo {#hello-world}

```solidity
// Especifica a versão da Solidity, usando versionamento semântico.
// Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Define um contrato chamado `HelloWorld`.
// Um contrato é uma coleção de funções e dados (seu estado).
// Uma vez feito o deploy, um contrato reside em um endereço específico na blockchain Ethereum.
// Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Declara uma variável de estado `message` do tipo `string`.
    // Variáveis de estado são variáveis cujos valores são armazenados permanentemente no armazenamento do contrato.
    // A palavra-chave `public` torna as variáveis acessíveis de fora de um contrato
    // e cria uma função que outros contratos ou clientes podem chamar para acessar o valor.
    string public message;

    // Semelhante a muitas linguagens orientadas a objetos baseadas em classes, um construtor é
    // uma função especial que é executada apenas na criação do contrato.
    // Construtores são usados para inicializar os dados do contrato.
    // Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
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
    // Um endereço é comparável a um endereço de e-mail - é usado para identificar uma conta na Ethereum.
    // Endereços podem representar um contrato inteligente ou contas externas (de usuário).
    // Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // Um `mapping` é essencialmente uma estrutura de dados de tabela hash.
    // Este `mapping` atribui um inteiro sem sinal (o saldo do token) a um endereço (o detentor do token).
    // Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Eventos permitem o log de atividades na blockchain.
    // Clientes Ethereum podem escutar eventos para reagir a mudanças de estado do contrato.
    // Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Inicializa os dados do contrato, definindo o `owner`
    // para o endereço do criador do contrato.
    constructor() public {
        // Todos os contratos inteligentes dependem de transações externas para acionar suas funções.
        // `msg` é uma variável global que inclui dados relevantes sobre a transação fornecida,
        // como o endereço do remetente e o valor em ETH incluído na transação.
        // Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Cria uma quantidade de novos tokens e os envia para um endereço.
    function mint(address receiver, uint amount) public {
        // `require` é uma estrutura de controle usada para impor certas condições.
        // Se uma instrução `require` for avaliada como `false`, uma exceção é acionada,
        // o que reverte todas as alterações feitas no estado durante a chamada atual.
        // Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Apenas o proprietário do contrato pode chamar esta função
        require(msg.sender == owner, "You are not the owner.");

        // Impõe uma quantidade máxima de tokens
        require(amount < 1e60, "Maximum issuance exceeded");

        // Aumenta o saldo de `receiver` em `amount`
        balances[receiver] += amount;
    }

    // Envia uma quantidade de tokens existentes de qualquer chamador para um endereço.
    function transfer(address receiver, uint amount) public {
        // O remetente deve ter tokens suficientes para enviar
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Ajusta os saldos de tokens dos dois endereços
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Emite o evento definido anteriormente
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Ativo digital único {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Importa símbolos de outros arquivos para o contrato atual.
// Neste caso, uma série de contratos auxiliares do OpenZeppelin.
// Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// A palavra-chave `is` é usada para herdar funções e palavras-chave de contratos externos.
// Neste caso, `CryptoPizza` herda dos contratos `IERC721` e `ERC165`.
// Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Usa a biblioteca SafeMath do OpenZeppelin para realizar operações aritméticas com segurança.
    // Saiba mais: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Variáveis de estado constantes na Solidity são semelhantes a outras linguagens
    // mas você deve atribuir a partir de uma expressão que seja constante em tempo de compilação.
    // Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Tipos Struct permitem que você defina seu próprio tipo
    // Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Cria um array vazio de structs Pizza
    Pizza[] public pizzas;

    // Mapping do ID da pizza para o endereço do seu proprietário
    mapping(uint256 => address) public pizzaToOwner;

    // Mapping do endereço do proprietário para o número de tokens possuídos
    mapping(address => uint256) public ownerPizzaCount;

    // Mapping do ID do token para o endereço aprovado
    mapping(uint256 => address) pizzaApprovals;

    // Você pode aninhar mappings, este exemplo mapeia o proprietário para aprovações de operador
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Função interna para criar uma Pizza aleatória a partir de uma string (nome) e DNA
    function _createPizza(string memory _name, uint256 _dna)
        // A palavra-chave `internal` significa que esta função é visível apenas
        // dentro deste contrato e de contratos que derivam deste contrato
        // Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` é um modificador de função que verifica se a pizza já existe
        // Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Adiciona a Pizza ao array de Pizzas e obtém o id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Verifica se o proprietário da Pizza é o mesmo que o usuário atual
        // Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // note que address(0) é o endereço zero,
        // indicando que pizza[id] ainda não está alocada a um usuário específico.

        assert(pizzaToOwner[id] == address(0));

        // Mapeia a Pizza para o proprietário
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Cria uma Pizza aleatória a partir de uma string (nome)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Gera um DNA aleatório a partir da string (nome) e do endereço do proprietário (criador)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Funções marcadas como `pure` prometem não ler ou modificar o estado
        // Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Gera um uint aleatório a partir da string (nome) + endereço (proprietário)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Retorna um array de Pizzas encontradas pelo proprietário
    function getPizzasByOwner(address _owner)
        public
        // Funções marcadas como `view` prometem não modificar o estado
        // Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Usa o local de armazenamento `memory` para armazenar valores apenas para o
        // ciclo de vida desta chamada de função.
        // Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // Transfere a Pizza e a propriedade para outro endereço
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Emite o evento definido no contrato IERC721 importado
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Transfere com segurança a propriedade de um determinado ID de token para outro endereço
     * Se o endereço de destino for um contrato, ele deve implementar `onERC721Received`,
     * que é chamado em uma transferência segura, e retornar o valor mágico
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * caso contrário, a transferência é revertida.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Transfere com segurança a propriedade de um determinado ID de token para outro endereço
     * Se o endereço de destino for um contrato, ele deve implementar `onERC721Received`,
     * que é chamado em uma transferência segura, e retornar o valor mágico
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * caso contrário, a transferência é revertida.
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
     * Função interna para invocar `onERC721Received` em um endereço de destino
     * A chamada não é executada se o endereço de destino não for um contrato
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

    // Queima uma Pizza - destrói o Token completamente
    // O modificador de função `external` significa que esta função é
    // parte da interface do contrato e outros contratos podem chamá-la
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

    // Retorna a contagem de Pizzas por endereço
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Retorna o proprietário da Pizza encontrada pelo id
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Aprova outro endereço para transferir a propriedade da Pizza
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Retorna o endereço aprovado para uma Pizza específica
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Função privada para limpar a aprovação atual de um determinado ID de token
     * Reverte se o endereço fornecido não for de fato o proprietário do token
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Define ou remove a aprovação de um determinado operador
     * Um operador tem permissão para transferir todos os tokens do remetente em seu nome
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Informa se um operador é aprovado por um determinado proprietário
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Assume a propriedade da Pizza - apenas para usuários aprovados
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Verifica se a Pizza existe
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Verifica se o endereço é o proprietário ou está aprovado para transferir a Pizza
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Desativa a verificação do solium por causa de
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Verifica se a Pizza é única e ainda não existe
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

    // Retorna se o endereço de destino é um contrato
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Atualmente não há uma maneira melhor de verificar se há um contrato em um endereço
        // do que verificar o tamanho do código naquele endereço.
        // Veja https://ethereum.stackexchange.com/a/14016/36603
        // para mais detalhes sobre como isso funciona.
        // TODO Verificar isso novamente antes do lançamento da Serenity, porque todos os endereços serão
        // contratos então.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Leitura adicional {#further-reading}

Confira a documentação da Solidity e do Vyper para uma visão geral mais completa dos contratos inteligentes:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## Tópicos relacionados {#related-topics}

- [Contratos inteligentes](/developers/docs/smart-contracts/)
- [Máquina Virtual Ethereum](/developers/docs/evm/)

## Tutoriais relacionados {#related-tutorials}

- [Reduzindo contratos para combater o limite de tamanho do contrato](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Algumas dicas práticas para reduzir o tamanho do seu contrato inteligente._
- [Registrando dados de contratos inteligentes com eventos](/developers/tutorials/logging-events-smart-contracts/) _– Uma introdução aos eventos de contratos inteligentes e como você pode usá-los para registrar dados em log._
- [Interaja com outros contratos a partir da Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Como implantar um contrato inteligente a partir de um contrato existente e interagir com ele._
