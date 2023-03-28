---
title: Lenguajes de contrato inteligente
description: "Descripción y comparación de los 2 lenguajes de contrato inteligente principales: Solidity y Vyper."
lang: es
---

Un gran aspecto de Ethereum es que los contratos inteligentes pueden programarse utilizando lenguajes relativamente fáciles para el programador. Si tienes experiencia con Python o JavaScript, puedes encontrar un lenguaje con una sintaxis familiar.

Los dos lenguajes más activos y soportados son:

- Solidity
- Vyper

Los desarrolladores más experimentados también podrían querer usar Yul, un lenguaje intermedio para la [máquina virtual Ethereum](/developers/docs/evm/), o Yul+, una extensión de Yul.

## Requisitos previos {#prerequisites}

El conocimiento previo de lenguajes de programación, especialmente de JavaScript o Python, puede ayudarte a encontrar diferencias en los lenguajes de los contratos inteligentes. También recomendamos que entiendas los lenguajes de los contratos inteligentes como concepto antes de profundizar demasiado en las comparaciones de lenguajes. Más información sobre [contratos inteligentes](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Influenciado por C++, Python y JavaScript.
- Escrito estáticamente (el tipo de variable se conoce durante el tiempo de compilación).
- Compatibilidad:
  - Herencia (puedes ampliar otros contratos).
  - Bibliotecas (puedes crear código reutilizable que puedes solicitar desde diferentes contratos, p. ej., como funciones estáticas en una clase estática en otros lenguajes de programación orientados a objetos).
  - Tipos complejos definidos por el usuario.

### Enlaces importantes {#important-links}

- [Documentación](https://docs.soliditylang.org/en/latest/)
- [Portal de lenguaje de Solidity](https://soliditylang.org/)
- [Solidity by Example](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Sala de chat de Gitter sobre Solidity](https://gitter.im/ethereum/solidity/)
- [Hoja de trampas](https://reference.auditless.com/cheatsheet)
- [Blog de Solidity](https://blog.soliditylang.org/)

### Ejemplo de contrato {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
Solidez pragmática >= 0.7.0;

contract Coin {
    // La palabra clave "public" hace variables
    // accesibles desde otros contratos
    address public minter;
    mapping (address => uint) public balances;

    // Eventos permiten a los clientes reaccionar a cambios específicos
    // del contrato que declaras
    event Sent(address from, address to, uint amount);

    // El código del instructor solo se ejecuta cuando se crea el contrato
    //
    constructor() {
        minter = msg.sender;
    }

    // Envía una cantidad de monedas recién creadas a una dirección
    // Sólo puede ser llamada por el creador del contrato
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Envía una cantidad de monedas existentes
    // desde cualquier llamada a una dirección
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Este ejemplo debería darte una idea de cómo es la sintaxis de de un contrato Solidity. Para ver una descripción más detallada de las funciones y variables, [consulta los documentos](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Lenguaje de programación Pythonic
- Escritura fuerte
- Código de compilador pequeño y comprensible
- Deliberadamente tiene menos características que Solidity con el objetivo de hacer que los contratos sean más seguros y más fáciles de auditar. Vyper no es compatible con:
  - Modificadores
  - Herencia
  - Ensamblado en línea
  - Sobrecarga de función
  - Sobrecarga del operador
  - Llamada recurrente
  - Bucles de longitud infinita
  - Puntos fijos binarios

Para obtener más información, [lee la información básica de Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Enlaces importantes {#important-links-1}

- [Documentación](https://vyper.readthedocs.io)
- [Vyper por Example](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [GitHub](https://github.com/vyperlang/vyper)
- [Sala de chat de Gitter sobre Vyper](https://gitter.im/vyperlang/community)
- [Hoja de trampas](https://reference.auditless.com/cheatsheet)
- [Actualización del 8 de enero de 2020](https://blog.ethereum.org/2020/01/08/update-on-the-vyper-compiler)

### Ejemplo {#example}

```python
# Subastas Abiertas

# Params de subastas
# Beneficiario recibe dinero de la oferta más alta
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Estado actual de subasta
highestBidder: public(address)
highestBid: public(uint256)

# Establecer a verdadero al final, deshabilita cualquier cambio
ended: public(bool)

# Mantener un seguimiento de las ofertas reembolsadas para que podamos seguir el patrón de retirada
pendingReturns: public(HashMap[address, uint256])

# Crea una subasta simple con `_bidding_time`
# segundos de tiempo de oferta en nombre de la
# dirección beneficiaria `_beneficiary`.

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# El valor solo será reembolsado si la subasta
# no es ganada.
@external
@payable
def bid():
    # Comprobar si el periodo de oferta ha terminado.
    assert block.timestamp < self.auctionEnd
    # Comprobar si la oferta es suficientemente alta
    assert msg.value > self.highestBid
    # Registrar el reembolso de la oferta alta anterior
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Seguimiento de la nueva oferta alta.
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Retira una oferta previamente reembolsada. El patrón de retirada se
# utiliza aquí para evitar un problema de seguridad. Si los reembolsos fueron directamente
# enviados como parte de la oferta(), un contrato de licitación malicioso podría bloquear
# esos reembolsos y así bloquear la entrada de nuevas ofertas más altas.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Finalizar la subasta y enviar la oferta más alta
# al beneficiario.
@external
def endAuction():
    # Es una buena guía para las funciones de estructura que interactúan con
    # con otros contratos (es decir, llaman funciones o envían Ether)
    # en tres fases:
    # 1. condiciones de comprobación
    # 2. realizar acciones (condiciones potencialmente cambiantes)
    # 3. interactuando con otros contratos
    # Si estas fases se mezclan, el otro contrato podría llamar a
    # de vuelta al contrato actual y modificar el estado o causar
    # efectos (pago ether) a ser realizados varias veces.
    # Si las funciones llamadas internamente incluyen interacción con contratos externos
    #, también deben considerarse interacción con
    # contratos externos.

    # 1. Condiciones
    # Comprueba si se ha alcanzado el fin de la subasta
    assert block.timestamp >= self.auctionEnd
    # Comprueba si esta función ya ha sido llamada
    assert not self.ended

    # 2. Efectos
    self.ended = True

    # 3. Interacción
    send(self.beneficiary, self.highestBid)
```

Este ejemplo debería darte una idea de cómo es la sintaxis de contrato de Vyper. Para ver una descripción más detallada de las funciones y variables, [consulta los documentos](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul y Yul+ {#yul}

Si eres nuevo en Ethereum y aún no has hecho ninguna codificación con lenguajes de contrato inteligente, te recomendamos empezar con Solidity o Vyper. Basta con echar un vistazo a Yul o Yul+ una vez que estés familiarizado con las prácticas recomendadas de seguridad de los contratos inteligentes y los detalles de trabajar con la EVM.

**Yul**

- Lenguaje intermedio para Ethereum.
- Es compatible con la [EVM](/developers/docs/evm) y [eWASM](https://github.com/ewasm), un Ethereum con características de WebAssembly, y se ha diseñado para ser un denominador común útil de ambas plataformas.
- Buen objetivo para las etapas de optimización de alto nivel, que puede beneficiar a las plataformas de EVM y eWASM.

**Yul+**

- Una extensión de bajo nivel y alta eficiencia para Yul.
- Diseñada inicialmente para un contrato de [Optimistic Rollup](/developers/docs/layer-2-scaling/#rollups-and-sidechains).
- Yul+ se puede considerar una propuesta de actualización experimental de Yul, que le añade nuevas funciones.

### Enlaces importantes {#important-links-2}

- [Documentacíon de Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Documentación de Yul+](https://github.com/fuellabs/yulp)
- [Campo de juego de Yul+](https://yulp.fuel.sh/)
- [Post de introducción a Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Ejemplo de contrato {#example-contract-2}

El siguiente ejemplo sencillo implementa una potente función. Puede compilarse mediante `solc --strict-assembly --bin input.yul`. El ejemplo debe almacenarse en el archivo input.yul.

```
{
    function power(base, exponent) -> result
    {
        switch exponent
        case 0 { result := 1 }
        case 1 { result := base }
        default
        {
            result := power(mul(base, base), div(exponent, 2))
            if mod(exponent, 2) { result := mul(base, result) }
        }
    }
    let res := power(calldataload(0), calldataload(32))
    mstore(0, res)
    return(0, 32)
}
```

Si ya tienes experiencia con contratos inteligentes, puedes encontrar una implementación ERC20 completa en Yul [aquí](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## ¿Cómo escoger? {#how-to-choose}

Como en cualquier otro lenguaje de programación, se trata principalmente de elegir la herramienta adecuada para el trabajo correcto así como para las preferencias personales.

Estas son algunas cosas que debes tener en cuenta si aún no has probado ninguno de los lenguajes:

### ¿Qué tiene de genial Solidity? {#solidity-advantages}

- Si eres un principiante, encontrarás muchos tutoriales y herramientas de aprendizaje por ahí. Obtén más información al respecto en la sección [Aprender programando](/developers/learning-tools/).
- Buenas herramientas de desarrollador disponibles.
- Solidity tiene una gran comunidad de desarrolladores, lo que significa que muy probablemente encontrarás rápidamente las respuestas a tus preguntas.

### ¿Qué tiene de genial Vyper? {#vyper-advatages}

- Es una fantástica forma de comenzar para aquellos desarrolladores de Python que deseen escribir contratos inteligentes.
- Vyper dispone de un pequeño número de funciones que lo convierten en la opción ideal para elaborar prototipos de ideas rápidamente.
- Vyper pretende ser una herramienta fácil de auditar y ofrecer el nivel máximo de legibilidad para las personas.

### ¿Qué tienen de genial Yul y Yul+? {#yul-advantages}

- Lenguaje simple y funcional de bajo nivel.
- Te permite aproximarte mucho más a la EVM sin procesar, lo que puede ayudarte a optimizar el uso de gas de los contratos.

## Comparación de lenguajes {#language-comparisons}

Si deseas realizar comparaciones sobre la sintaxis básica, el ciclo de vida del contrato, las interfaces, los operadores, las estructuras de datos, las funciones, el flujo de control, etc., echa un vistazo a esta [hoja de apuntes de Auditless](https://reference.auditless.com/cheatsheet/)

## Más información {#further-reading}

- [Biblioteca de contratos de Solidity de OpenZeppelin](https://docs.openzeppelin.com/contracts)
- [Solidity by Example](https://solidity-by-example.org)
