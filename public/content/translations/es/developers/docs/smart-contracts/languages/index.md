---
title: Lenguajes de contrato inteligente
description: 'Descripción y comparación de los 2 lenguajes de contrato inteligente principales: Solidity y Vyper.'
lang: es
---

Un gran aspecto de Ethereum es que los contratos inteligentes pueden programarse utilizando lenguajes relativamente fáciles para el programador. Si tiene experiencia con Python u otro [lenguaje entre llaves](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), puede buscar un lenguaje con una sintaxis familiar.

Los dos lenguajes más activos y soportados son:

- Solidity
- Vyper

Remix IDE proporciona un entorno de desarrollo integral para crear y probar contratos tanto en Solidity como en Vyper. [Pruebe Remix IDE en el navegador](https://remix.ethereum.org) para empezar a programar.

Los desarrolladores más experimentados también podrían querer usar Yul, un lenguaje intermedio para la [máquina virtual de Ethereum](/developers/docs/evm/), o Yul+, una extensión de Yul.

Si es curioso y le gustaría ayudar a testear nuevos lenguajes que aún se encuentran en gran desarrollo, puede experimentar con Fe, un lenguaje emergente de contratos inteligentes que aún está en sus inicios.

## Requisitos previos {#prerequisites}

El conocimiento previo de lenguajes de programación, especialmente de JavaScript o Python, puede ayudarlo a entender las diferencias en los lenguajes de los contratos inteligentes. También recomendamos que entienda los lenguajes de los contratos inteligentes como concepto antes de profundizar en las comparaciones de lenguajes. Consulte esta [Introducción a los contratos inteligentes](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Lenguaje orientado a objeto de alto nivel para implementar contratos inteligentes.
- Lenguaje de llaves más influenciado por C++.
- Escrito estáticamente (el tipo de una variable se conoce en el momento de compilación).
- Admite:
  - Herencia (puede extende otros contratos).
  - Bibliotecas (puede crear código reutilizable que puede invocar de diferentes contratos, como funciones estáticas en una clase estática en otros lenguajes de programación orientados a objetos).
  - Tipos complejos definidos por el usuario.

### Enlaces importantes {#important-links}

- [Documentación](https://docs.soliditylang.org/en/latest/)
- [Portal de lenguaje de Solidity](https://soliditylang.org/)
- [Solidity by Example](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Sala de chat de Solidity (Glitter)](https://gitter.im/ethereum/solidity) enlazada con la [Sala de chat de Solidity (Matrix)](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Hoja de trampas](https://reference.auditless.com/cheatsheet)
- [Blog de Solidity](https://blog.soliditylang.org/)
- [Twitter de Solidity](https://twitter.com/solidity_lang)

### Ejemplo de contrato {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // The keyword "public" makes variables
    // accessible from other contracts
    address public minter;
    mapping (address => uint) public balances;

    // Events allow clients to react to specific
    // contract changes you declare
    event Sent(address from, address to, uint amount);

    // Constructor code is only run when the contract
    // is created
    constructor() {
        minter = msg.sender;
    }

    // Sends an amount of newly created coins to an address
    // Can only be called by the contract creator
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Sends an amount of existing coins
    // from any caller to an address
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Este ejemplo debería darle una idea de cómo es la sintaxis de un contrato Solidity. Para ver una descripción más detallada de las funciones y variables, [consulte los documentos](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Lenguaje de programación Pythonic
- Escritura fuerte
- Código de compilador pequeño y comprensible
- Generación eficiente de bytecode
- Deliberadamente tiene menos funciones que Solidity con el objetivo de hacer que los contratos sean más seguros y más fáciles de auditar. Vyper no admite:
  - Modificadores
  - Herencia
  - Ensamblado en línea
  - Sobrecarga de funciones
  - Sobrecarga de operadores
  - Llamadas recurrentes
  - Bucles de longitud infinita
  - Puntos fijos binarios

Para obtener más información, [lea los fundamentos de Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Enlaces importantes {#important-links-1}

- [Documentación](https://vyper.readthedocs.io)
- [Vyper por Example](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Más Vyper by Example](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Chat de Discord de la comunidad de Vyper](https://discord.gg/SdvKC79cJk)
- [Hoja de trampas](https://reference.auditless.com/cheatsheet)
- [Marcos para desarrollo de contratos inteligentes y herramientas para Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk: aprenda a asegurar y hackear contratos inteligentes de Vyper](https://github.com/SupremacyTeam/VyperPunk)
- [VyperExamples: ejemplos de vulnerabilidades en Vyper](https://www.vyperexamples.com/reentrancy)
- [Vyper Hub para desarrollo](https://github.com/zcor/vyper-dev)
- [Ejemplos de grandes éxitos de contratos inteligentes de Vyper](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Increíbles recursos seleccionados de Vyper](https://github.com/spadebuilders/awesome-vyper)

### Ejemplo {#example}

```python
# Open Auction

# Auction params
# Beneficiary receives money from the highest bidder
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Current state of auction
highestBidder: public(address)
highestBid: public(uint256)

# Set to true at the end, disallows any change
ended: public(bool)

# Keep track of refunded bids so we can follow the withdraw pattern
pendingReturns: public(HashMap[address, uint256])

# Create a simple auction with `_bidding_time`
# seconds bidding time on behalf of the
# beneficiary address `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Bid on the auction with the value sent
# together with this transaction.
# El valor solo será reembolsado si la subasta
# no es ganada.
@external
@payable
def bid():
    # Comprobar si el periodo de oferta ha terminado.
    assert block.timestamp < self.auctionEnd
    # Check if bid is high enough
    assert msg.value > self.highestBid
    # Track the refund for the previous high bidder
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Track new high bid
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Withdraw a previously refunded bid. El patrón de retirada se
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
@externo
def endAuction():
    # Es una buena guía para estructurar funciones que interactúan
    # con otros contratos (es decir, ellos llaman funciones o envían ether)
    # en tres frases:
    # 1. condiciones de comprobación
    # 2. realizar acciones (condiciones potencialmente cambiantes)
    # 3. interactuando con otros contratos
    # Si estas fases se mezclan, el otro contrato podría llamar a
    # de vuelta al contrato actual y modificar el estado o causar
    # efectos (pago ether) a ser realizados varias veces.
    # Si las funciones llamadas internamente incluyen interacción con contratos externos
    # también deben considerarse interacción con
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

Este ejemplo debería darle una idea de cómo es la sintaxis de contratos de Vyper. Para ver una descripción más detallada de las funciones y variables, [consulte los documentos](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul y Yul+ {#yul}

Si es nuevo en Ethereum y aún no ha hecho ninguna codificación con lenguajes de contrato inteligente, le recomendamos empezar con Solidity o Vyper. Solo póngase con Yul o Yul+ una vez que esté familiarizado con las prácticas recomendadas de seguridad de los contratos inteligentes y los detalles de trabajar con la EVM.

**Yul**

- Lenguaje intermedio para Ethereum.
- Es compatible con [EVM](/developers/docs/evm) y [Ewasm](https://github.com/ewasm), un WebAssembly parecido a Ethereum, y está diseñado para ser un denominador común utilizable de ambas plataformas.
- Buen objetivo para las etapas de optimización de alto nivel, que puede beneficiar a las plataformas de EVM y eWASM.

**Yul+**

- Una extensión de bajo nivel y alta eficiencia para Yul.
- Diseñado inicialmente para ser un contrato de [rollup optimista](/developers/docs/scaling/optimistic-rollups/).
- Yul+ se puede considerar una propuesta de actualización experimental de Yul, que le añade nuevas funciones.

### Enlaces importantes {#important-links-2}

- [Documentacíon de Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Documentación de Yul+](https://github.com/fuellabs/yulp)
- [Campo de juego de Yul+](https://yulp.fuel.sh/)
- [Post de introducción a Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Ejemplo de contrato {#example-contract-2}

El siguiente ejemplo sencillo implementa una power function. Puede compilarse mediante `solc --strict-assembly --bin input.yul`. El ejemplo debe almacenarse en el archivo input.yul.

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

Si ya tiene experiencia con contratos inteligentes, puede encontrar una implementación ERC20 completa en Yul [aquí](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Lenguaje escrito estáticamente para la Máquina Virtual de Ethereum (EVM).
- Inspirado en Python y Rust.
- Pretende ser fácil de aprender, incluso para desarrolladores que son nuevos en el ecosistema de Ethereum.
- El desarrollo de Fe se encuentra aún en sus inicios; el lenguaje tuvo su lanzamiento alpha en enero de 2021.

### Enlaces importantes {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Anuncio de Fe](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Hoja de ruta de Fe 2021](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Chat sobre Fe de Discord](https://discord.com/invite/ywpkAXFjZH)
- [Twitter de Fe](https://twitter.com/official_fe)

### Ejemplo de contrato {#example-contract-3}

El siguiente es un contrato simple implementado en Fe.

```
type BookMsg = bytes[100]

contract GuestBook:
    pub guest_book: map<address, BookMsg>

    event Signed:
        book_msg: BookMsg

    pub def sign(book_msg: BookMsg):
        self.guest_book[msg.sender] = book_msg

        emit Signed(book_msg=book_msg)

    pub def get_msg(addr: address) -> BookMsg:
        return self.guest_book[addr].to_mem()

```

## ¿Cómo escoger? {#how-to-choose}

Como sucede con cualquier otro lenguaje de programación, se trata principalmente de elegir la herramienta adecuada para el trabajo correcto, así como las preferencias personales.

Estas son algunas cosas que debe tener en cuenta si aún no ha probado ninguno de los lenguajes:

### ¿Qué tiene de genial Solidity? {#solidity-advantages}

- Si es principiante, encontrará muchos tutoriales y herramientas de aprendizaje por ahí. Obtenga más información al respecto en la sección [Aprender programando](/developers/learning-tools/).
- Buenas herramientas de desarrollador disponibles.
- Solidity tiene una gran comunidad de desarrolladores, lo que significa que muy probablemente encontrará rápidamente las respuestas a sus preguntas.

### ¿Qué tiene de genial Vyper? {#vyper-advatages}

- Es una fantástica forma de comenzar para aquellos desarrolladores de Python que deseen escribir contratos inteligentes.
- Vyper dispone de una menor cantidad de funciones que lo convierten en la opción ideal para elaborar prototipos de ideas rápidamente.
- Vyper pretende ser una herramienta fácil de auditar y ofrecer el nivel máximo de legibilidad para las personas.

### ¿Qué tienen de genial Yul y Yul+? {#yul-advantages}

- Lenguaje simple y funcional de bajo nivel.
- Le permite aproximarse mucho más a la EVM sin procesar, lo que puede ayudarlo a optimizar el uso de gas en los contratos.

## Comparación de lenguajes {#language-comparisons}

Si desea obtener comparaciones sobre la sintaxis básica, el ciclo de vida de los contratos, las interfaces, los operadores, las estructuras de datos, las funciones, el flujo de control, etc., eche un vistazo a esta [hoja de apuntes de Auditless](https://reference.auditless.com/cheatsheet/).

## Más información {#further-reading}

- [Biblioteca de contratos de Solidity de OpenZeppelin](https://docs.openzeppelin.com/contracts)
- [Solidity by Example](https://solidity-by-example.org)
