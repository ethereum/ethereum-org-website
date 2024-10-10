---
title: Padrão de token ERC-223
description: Uma visão geral do padrão de token fungível ERC-223, como ele funciona e uma comparação com o ERC-20.
lang: pt-br
---

## Introdução {#introduction}

### O que é ERC-223? {#what-is-erc223}

O ERC-223 é um padrão para tokens fungíveis, semelhante ao padrão ERC-20. A principal diferença é que o ERC-223 define não apenas a API do token, mas também a lógica para transferir tokens do remetente para o destinatário. Ele introduz um modelo de comunicação que permite que transferências de tokens sejam manipuladas pelo lado do destinatário.

### Diferenças do ERC-20 {#erc20-differences}

O ERC-223 aborda algumas limitações do ERC-20 e introduz um novo método de interação entre o contrato de token e um contrato que pode receber os tokens. Há poucas coisas que são possíveis com ERC-223, mas não com ERC-20:

- Tratamento de transferência de tokens no lado do destinatário: os destinatários podem detectar que um token ERC-223 está sendo depositado.
- Rejeição de tokens enviados incorretamente: se um usuário enviar tokens ERC-223 para um contrato que não deveria receber tokens, o contrato pode rejeitar a transação, evitando a perda de tokens.
- Metadados em transferências: tokens ERC-223 podem incluir metadados, permitindo que informações arbitrárias sejam anexadas às transações de tokens.

## Pré-requisitos {#prerequisites}

- [Contas](/developers/docs/accounts)
- [Contratos inteligentes](/developers/docs/smart-contracts/)
- [Padrões de token](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Body {#body}

ERC-223 é um padrão de token que implementa uma API para tokens dentro de contratos inteligentes. Ele também declara uma API para contratos que devem receber tokens ERC-223. Contratos que não suportam a API do Receptor ERC-223 não podem receber tokens ERC-223, evitando erros do usuário.

Se um contrato inteligente implementar os seguintes métodos e eventos, ele pode ser chamado de contrato de token compatível com ERC-223. Uma vez implantado, ele
será responsável por manter o controle dos tokens criados no Ethereum.

O contrato não é obrigado a ter apenas essas funções e um desenvolvedor pode adicionar qualquer outro recurso de diferentes padrões de token a este contrato. Por exemplo, as funções `approve` e `transferFrom` não fazem parte do padrão ERC-223, mas essas funções podem ser implementadas caso seja necessário.

De [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### Métodos {#métodos}

O token ERC-223 deve implementar os seguintes métodos:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

Um contrato que deve receber tokens ERC-223 deve implementar o seguinte método:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

Se os tokens ERC-223 forem enviados para um contrato que não implementa a função `tokenReceived(..)`, a transferência deverá falhar e os tokens não deverão ser movidos do saldo do remetente.

### Eventos {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Exemplos {#exemplos}

A API do token ERC-223 é semelhante à do ERC-20, portanto, do ponto de vista do desenvolvimento da interface do usuário, não há diferença. A única exceção aqui é que os tokens ERC-223 não podem ter as funções `approve` + `transferFrom`, pois elas são opcionais para este padrão.

#### Exemplos de Solidity {#solidity-example}

O exemplo a seguir ilustra como um contrato básico de token ERC-223 opera:

```solidity
pragma solidity ^0.8.19;
abstract contract IERC223Recipient {
    function tokenReceived(address _from, uint _value, bytes memory _data) public virtual;
}
contract VeryBasicERC223Token {
    event Transfer(address indexed from, address indexed to, uint value, bytes data);
    string  private _name;
    string  private _symbol;
    uint8   private _decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private balances;
    function name() public view returns (string memory) { return _name; }
    function symbol() public view returns (string memory) {return _symbol; }
    function decimals() public view returns (uint8) { return _decimals; }
    function totalSupply() public view returns (uint256) { return _totalSupply; }
    function balanceOf(address _owner) public view returns (uint256) { return balances[_owner]; }
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
    }
    function transfer(address _to, uint _value, bytes calldata _data) public returns (bool success){
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }
    function transfer(address _to, uint _value) public returns (bool success){
        bytes memory _empty = hex"00000000";
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _empty);
        }
        emit Transfer(msg.sender, _to, _value, _empty);
        return true;
    }
}
```

Agora queremos outro contrato para aceitar depósitos de `tokenA`, assumindo que o tokenA é um token ERC-223. O contrato deve aceitar apenas o tokenA e rejeitar quaisquer outros tokens. Quando o contrato recebe o tokenA, ele deve emitir um evento `Deposit()` e aumentar o valor da variável interna `deposits`.

Aqui está o código:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // The only token that we want to accept.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // It is important to understand that within this function
        // msg.sender is the address of a token that is being received,
        // msg.value  is always 0 as the token contract does not own or send Ether in most cases,
        // _from      is the sender of the token transfer,
        // _value     is the amount of tokens that was deposited.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Perguntas mais frequentes {#faq}

### O que acontecerá se enviarmos algum tokenB para o contrato? {#sending-tokens}

A transação falhará e a transferência de tokens não acontecerá. Os tokens serão devolvidos ao endereço do remetente.

### Como podemos fazer um depósito neste contrato? {#contract-deposits}

Chame a função `transfer(address,uint256)` ou `transfer(address,uint256,bytes)` do token ERC-223, especificando o endereço do `RecipientContract`.

### O que acontecerá se transferirmos um token ERC-20 para este contrato? {#erc-20-transfers}

Se um token ERC-20 for enviado para o `RecipientContract`, os tokens serão transferidos, mas a transferência não será reconhecida (nenhum evento `Deposit()` será disparado e o valor dos depósitos não será alterado). Depósitos indesejados de ERC-20 não podem ser filtrados ou evitados.

### E se quisermos executar alguma função após a conclusão do depósito do token? {#function-execution}

Há várias maneiras de fazer isso. Neste exemplo, seguiremos o método que torna as transferências ERC-223 idênticas às transferências Ether:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // The only token that we want to accept.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Handle incoming transaction and perform a subsequent function call.
    }
    function foo() public
    {
        emit Foo();
    }
    function bar(uint256 _someNumber) public
    {
        emit Bar(_someNumber);
    }
}
```

Quando o `RecipientContract` receber um token ERC-223, o contrato executará uma função codificada como parâmetro `_data` da transação do token, idêntico a como as transações Ether codificam chamadas de função como transação `data`. Leia [o campo de dados](https://ethereum.org/en/developers/docs/transactions/#the-data-field) para obter mais informações.

No exemplo acima, um token ERC-223 deve ser transferido para o endereço do `RecipientContract` com a função `transfer(address,uin256,bytes calldata _data)`. Se o parâmetro de dados for `0xc2985578` (a assinatura de uma função `foo()`), então a função foo() será invocada após o depósito do token ser recebido e o evento Foo() será disparado.

Os parâmetros também podem ser codificados nos `data` da transferência do token, por exemplo, podemos chamar a função bar() com o valor 12345 para `_someNumber`. Neste caso, o `data` deve ser `0x0423a13200000000000000000000000000000000000000000000000000000000000000000000004d2` onde `0x0423a132` é a assinatura da função `bar(uint256)` e `000000000000000000000000000000000000000000000000000000000000000000000004d2` é 12345 como uint256.

## Limitações {#limitations}

Embora o ERC-223 aborde vários problemas encontrados no padrão ERC-20, ele não está isento de limitações:

- Adoção e compatibilidade: o ERC-223 ainda não foi amplamente adotado, o que pode limitar sua compatibilidade com ferramentas e plataformas existentes.
- Compatibilidade com versões anteriores: O ERC-223 não é compatível com versões anteriores do ERC-20, o que significa que os contratos e ferramentas ERC-20 existentes não funcionarão com tokens ERC-223 sem modificações.
- Custos de gás: as verificações e funcionalidades adicionais nas transferências ERC-223 podem resultar em custos de gás mais altos em comparação às transações ERC-20.

## Leitura adicional {#further-reading}

- [EIP-223: Padrão de Token ERC-223](https://eips.ethereum.org/EIPS/eip-223)
- [Proposta inicial ERC-223](https://github.com/ethereum/eips/issues/223)
