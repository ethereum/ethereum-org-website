---
title: Estándar de tokens ERC-223
description: Descripción general del estándar de tokens fungibles ERC-223, cómo funciona y una comparación con ERC-20.
lang: es
---

## Introducción {#introduction}

### ¿Qué es ERC-223? {#what-is-erc223}

ERC-223 es un estándar para tokens fungibles, similar al estándar ERC-20. La principal diferencia es que el estándar ERC-223 no solamente define la API del token, sino también la lógica para transferir tokens del remitente al destinatario. Este estándar introduce un modelo de comunicación que permite que las transferencias de tokens sean manejadas desde el lado del destinatario.

### Diferencias con ERC-20 {#erc20-differences}

ERC-223 resuelve algunas de las limitaciones de ERC-20 e introduce un nuevo método de interacción entre el contrato de token y otro contrato que pueda recibir los tokens. Hay algunas cosas que son posibles con ERC-223, pero no lo son con ERC-20:

- El manejo de transferencias de tokens del lado del destinatario: Los destinatarios pueden detectar que un token ERC-223 está siendo depositado.
- El rechazo de tokens enviados incorrectamente: Si un usuario envía tokens ERC-223 a un contrato que no debe recibir tokens, el contrato puede rechazar la transaccion, evitando la pérdida de tokens.
- Metadatos en las transferencias: Los tokens ERC-223 pueden incluir metadatos, permitiendo que se adjunte información arbitraria a las transacciones de tokens.

## Requisitos previos {#prerequisites}

- [Cuentas](/developers/docs/accounts)
- [Contratos inteligentes](/developers/docs/smart-contracts/)
- [Estándares de tokens](/desarrolladores/documentos/estándares/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Cuerpo {#body}

ERC-223 es un estándar de token que implementa una API para tokens dentro de contratos inteligentes. También declara una API para contratos que deben recibir tokens ERC-223. Los contratos que no son compatibles con la Receiver API de ERC-223 no pueden recibir tokens ERC-223, impidiendo errores del usuario.

Si un contrato inteligente implementa los métodos y eventos mencionados a continuación, se puede decir que es un contrato compatible con tokens ERC-223. Una vez implementado, será responsable de mantener un registro de los tokens creados en Ethereum.

El contrato inteligente no está obligado a tener solo estas funciones, y el desarrollador puede agregar al contrato cualquier otra característica correspondiente a otro estándar de token. Por ejemplo, las funciones `approve` y `transferFrom` no son parte del estándar ERC-223, pero estas funciones podrían ser implementadas si fueran necesarias.

De [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### Métodos {#methods}

Los tokens ERC-223 deben implementar los siguientes métodos:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

Un contrato que debe recibir tokens del estándar ERC-223 tiene que implementar el método siguiente:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

Si los tokens ERC-223 son enviados a un contrato que no implementa la función `tokenReceived(..)`, la transferencia debe fallar y los tokens tienen que permanecer en el saldo del emisor.

### Eventos {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Ejemplos {#examples}

La API del token ERC-223 es similar a la API de ERC-20, por lo tanto, desde el punto de vista del desarrollo de la UI, no hay diferencia. La única excepción aquí es que los tokens ERC-223 pueden no incluir las funciones `approve` + `transferFrom` porque estas son opcionales para este estándar.

#### Ejemplos de Solidity {#solidity-example}

El ejemplo a continuación ilustra cómo opera un contrato de token ERC-223 básico:

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

Ahora queremos que otro contrato acepte depósitos del `tokenA`, asumiendo que dicho token es un token ERC-223. Los contratos deben aceptar únicamente tokenA y rechazar otros tipos de tokens. Cuando el contrato recibe un tokenA debe emitir un evento `Deposit()` y aumentar el valor de la variable interna `deposits`.

Este es el código:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // La única token que queremos aceptar.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // Es importante entender que dentro de esta función
        // msg.sender es la dirección de una token que está siendo recibida
        // msg.value es siempre 0 por lo que la token del contrato normalmente no tiene o envía Ether
        // _from es el remitente de la transferencia.
        // _value es la cantidad de tokens que fue depositada.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Preguntas frecuentes {#faq}

### ¿Qué pasaría si enviamos tokenB al contrato? {#sending-tokens}

La transacción va a fallar y la transferencia de tokens no va a suceder. Los tokens serán regresados a la dirección del remitente.

### ¿Cómo podríamos realizar un depósito a este contrato? {#contract-deposits}

Invocamos la función `transfer(address,uint256)` o a la función `transfer(address,uint256,bytes)` del token ERC-223 especificando la dirección del `RecipientContract`.

### ¿Qué ocurriría si transfiriéramos un token ERC-20 a este contrato? {#erc-20-transfers}

Si se envía un token ERC-20 al `RecipientContract`, los tokens se transferirán, pero la transferencia no se reconocerá (no se disparará un evento `Deposit()`, y el valor de los depósitos no cambiará). Los depósitos ERC-20 no reconocidos no pueden filtrarse ni evitarse.

### ¿Qué ocurre si queremos ejecutar una función luego de que el depósito haya sido completado? {#function-execution}

Existen varias formas de lograrlo. En este ejemplo, seguiremos el método que hace que las transferencias ERC-223 sean identicas a transferencias de Ether:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // La única token que queremos aceptar.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Maneja la transacción entrante  y realiza una llamada subsecuente.
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

Cuando el `RecipientContract` recibe un token ERC-223, el contrato ejecutará una función codificada con el parámetro `_data` que corresponde a la transacción del token. Esto es idéntico al modo en que las transacciones de Ether codifican las llamadas a funciones como `data` de transacción. Lea [el campo de datos](https://ethereum.org/en/developers/docs/transactions/#the-data-field) para obtener más información.

En el ejemplo anterior, se debe transferir un token ERC-223 a la dirección del `RecipientContract` con la función `transfer(address,uin256,bytes calldata _data)`. Si el parámetro de los datos será `0xc2985578` (la firma de una función `foo()`), la función foo() será invocada luego de que se reciba el depósito y se disparará el evento Foo().

Los parámetros pueden codificarse en los datos (`data`) de la transferencia de tokens, por ejemplo, podemos llamar a la función bar() con el valor 12345 para `_someNumber`. En este caso `data` debe ser `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2`, donde `0x0423a132` es la firma de la función `bar(uint256)` y `00000000000000000000000000000000000000000000000000000000000004d2` es 12345 como uint256.

## Limitaciones {#limitations}

Si bien ERC-20 aborda varios problemas encontrados en el estándar ERC-223, no dejan de existir otras limitaciones propias:

- Adopción y compatibilidad: El estándar ERC-223 no se encuentra ampliamente adoptado, lo cual limita su compatibilidad con herramientas y plataformas existentes.
- Compatibilidad hacia atrás: El estándar ERC-223 no tiene retrocompatibilidad con ERC-223. Esto significa que los contratos y las herramientas existentes no funcionarán con tokens ERC-223, sin previamente haber realizado modificaciones.
- Costos de gas: Los chequeos y funcionalidades adicionales brindadas por las transferencias del estándar-223 pueden resultar en costos de gas más elevados, en comparación con aquellos de transacciones ERC-20.

## Lecturas adicionales {#further-reading}

- [EIP-223: Estándar de token ERC-223](https://eips.ethereum.org/EIPS/eip-223)
- [Propuesta inicial de ERC-223](https://github.com/ethereum/eips/issues/223)
