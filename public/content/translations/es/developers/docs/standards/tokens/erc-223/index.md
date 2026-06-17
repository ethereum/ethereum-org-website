---
title: "Estándar de token ERC-223"
description: "Una descripción general del estándar de token fungible ERC-223, cómo funciona y una comparación con ERC-20."
lang: es
---

## Introducción {#introduction}

### ¿Qué es ERC-223? {#what-is-erc223}

ERC-223 es un estándar para tokens fungibles, similar al estándar ERC-20. La diferencia clave es que ERC-223 define no solo la API del token, sino también la lógica para la transferencia de tokens del remitente al destinatario. Introduce un modelo de comunicación que permite que las transferencias de tokens se manejen en el lado del destinatario.

### Diferencias con ERC-20 {#erc20-differences}

ERC-223 aborda algunas limitaciones de ERC-20 e introduce un nuevo método de interacción entre el contrato del token y un contrato que puede recibir los tokens. Hay algunas cosas que son posibles con ERC-223 pero no con ERC-20:

- Manejo de la transferencia de tokens en el lado del destinatario: los destinatarios pueden detectar que se está depositando un token ERC-223.
- Rechazo de tokens enviados incorrectamente: si un usuario envía tokens ERC-223 a un contrato que no debe recibir tokens, el contrato puede rechazar la transacción, evitando la pérdida de tokens.
- Metadatos en las transferencias: los tokens ERC-223 pueden incluir metadatos, lo que permite adjuntar información arbitraria a las transacciones de tokens.

## Requisitos previos {#prerequisites}

- [Cuentas](/developers/docs/accounts)
- [Contratos inteligentes](/developers/docs/smart-contracts/)
- [Estándares de tokens](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Cuerpo {#body}

ERC-223 es un estándar de token que implementa una API para tokens dentro de contratos inteligentes. También declara una API para contratos que deben recibir tokens ERC-223. Los contratos que no admiten la API del receptor ERC-223 no pueden recibir tokens ERC-223, lo que evita errores del usuario.

Si un contrato inteligente implementa los siguientes métodos y eventos, se le puede llamar contrato de token compatible con ERC-223. Una vez implementado, será responsable de realizar un seguimiento de los tokens creados en Ethereum.

El contrato no está obligado a tener solo estas funciones y un desarrollador puede agregar cualquier otra característica de diferentes estándares de tokens a este contrato. Por ejemplo, las funciones `approve` y `transferFrom` no forman parte del estándar ERC-223, pero estas funciones podrían implementarse si fuera necesario.

De [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### Métodos {#methods}

El token ERC-223 debe implementar los siguientes métodos:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

Un contrato que debe recibir tokens ERC-223 debe implementar el siguiente método:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

Si se envían tokens ERC-223 a un contrato que no implementa la función `tokenReceived(..)`, entonces la transferencia debe fallar y los tokens no deben moverse del saldo del remitente.

### Eventos {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Ejemplos {#examples}

La API del token ERC-223 es similar a la de ERC-20, por lo que desde el punto de vista del desarrollo de la interfaz de usuario no hay diferencia. La única excepción aquí es que los tokens ERC-223 pueden no tener las funciones `approve` + `transferFrom`, ya que estas son opcionales para este estándar.

#### Ejemplos en Solidity {#solidity-example}

El siguiente ejemplo ilustra cómo opera un contrato de token ERC-223 básico:

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

Ahora queremos que otro contrato acepte depósitos de `tokenA` asumiendo que tokenA es un token ERC-223. El contrato debe aceptar solo tokenA y rechazar cualquier otro token. Cuando el contrato recibe tokenA, debe emitir un evento `Deposit()` y aumentar el valor de la variable interna `deposits`.

Aquí está el código:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // El único token que queremos aceptar.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // Es importante entender que dentro de esta función
        // msg.sender es la dirección de un token que se está recibiendo,
        // msg.value  es siempre 0 ya que el contrato del token no posee ni envía ether en la mayoría de los casos,
        // _from      es el remitente de la transferencia del token,
        // _value     es la cantidad de tokens que se depositó.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Preguntas frecuentes {#faq}

### ¿Qué sucederá si enviamos algún tokenB al contrato? {#sending-tokens}

La transacción fallará y la transferencia de tokens no se realizará. Los tokens se devolverán a la dirección del remitente.

### ¿Cómo podemos hacer un depósito en este contrato? {#contract-deposits}

Llame a la función `transfer(address,uint256)` o `transfer(address,uint256,bytes)` del token ERC-223, especificando la dirección del `RecipientContract`.

### ¿Qué sucederá si transferimos un token ERC-20 a este contrato? {#erc-20-transfers}

Si se envía un token ERC-20 al `RecipientContract`, los tokens se transferirán, pero la transferencia no será reconocida (no se emitirá ningún evento `Deposit()` y el valor de los depósitos no cambiará). Los depósitos ERC-20 no deseados no se pueden filtrar ni prevenir.

### ¿Qué pasa si queremos ejecutar alguna función después de que se complete el depósito del token? {#function-execution}

Hay múltiples formas de hacerlo. En este ejemplo, seguiremos el método que hace que las transferencias ERC-223 sean idénticas a las transferencias de ether:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // El único token que queremos aceptar.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Manejar la transacción entrante y realizar una llamada de función posterior.
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

Cuando el `RecipientContract` reciba un token ERC-223, el contrato ejecutará una función codificada como parámetro `_data` de la transacción del token, de manera idéntica a cómo las transacciones de ether codifican las llamadas a funciones como el `data` de la transacción. Lea [el campo de datos](/developers/docs/transactions/#the-data-field) para obtener más información.

En el ejemplo anterior, se debe transferir un token ERC-223 a la dirección del `RecipientContract` con la función `transfer(address,uin256,bytes calldata _data)`. Si el parámetro de datos es `0xc2985578` (la firma de una función `foo()`), entonces la función foo() se invocará después de recibir el depósito del token y se emitirá el evento Foo().

Los parámetros también se pueden codificar en el `data` de la transferencia del token, por ejemplo, podemos llamar a la función bar() con el valor 12345 para `_someNumber`. En este caso, el `data` debe ser `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` donde `0x0423a132` es la firma de la función `bar(uint256)` y `00000000000000000000000000000000000000000000000000000000000004d2` es 12345 como uint256.

## Limitaciones {#limitations}

Si bien ERC-223 aborda varios problemas encontrados en el estándar ERC-20, no está exento de sus propias limitaciones:

- Adopción y compatibilidad: ERC-223 aún no se ha adoptado ampliamente, lo que puede limitar su compatibilidad con las herramientas y plataformas existentes.
- Compatibilidad con versiones anteriores: ERC-223 no es compatible con versiones anteriores de ERC-20, lo que significa que los contratos y herramientas ERC-20 existentes no funcionarán con tokens ERC-223 sin modificaciones.
- Costos de gas: las comprobaciones y funcionalidades adicionales en las transferencias ERC-223 pueden resultar en costos de gas más altos en comparación con las transacciones ERC-20.

## Lecturas adicionales {#further-reading}

- [EIP-223: Estándar de token ERC-223](https://eips.ethereum.org/EIPS/eip-223)
- [Propuesta inicial de ERC-223](https://github.com/ethereum/eips/issues/223)