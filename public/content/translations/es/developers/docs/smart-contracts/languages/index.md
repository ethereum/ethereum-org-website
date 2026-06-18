---
title: Lenguajes de los contratos inteligentes
description: Una descripción general y comparación de los dos principales lenguajes de contratos inteligentes: Solidity y Vyper.
lang: es
---

Un gran aspecto de [Ethereum](/) es que los contratos inteligentes se pueden programar utilizando lenguajes relativamente fáciles de usar para los desarrolladores. Si tiene experiencia con Python o cualquier [lenguaje de llaves](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), puede encontrar un lenguaje con una sintaxis familiar.

Los dos lenguajes más activos y mantenidos son:

- Solidity
- Vyper

Remix IDE proporciona un entorno de desarrollo integral para crear y probar contratos tanto en Solidity como en Vyper. [Pruebe el IDE de Remix en el navegador](https://remix.ethereum.org) para comenzar a programar.

Los desarrolladores más experimentados también podrían querer usar Yul, un lenguaje intermedio para la [Máquina Virtual de Ethereum](/developers/docs/evm/), o Yul+, una extensión de Yul.

Si tiene curiosidad y le gusta ayudar a probar nuevos lenguajes que aún están en pleno desarrollo, puede experimentar con Fe, un lenguaje emergente de contratos inteligentes que actualmente se encuentra en sus primeras etapas.

## Requisitos previos {#prerequisites}

El conocimiento previo de lenguajes de programación, especialmente de JavaScript o Python, puede ayudarle a comprender las diferencias en los lenguajes de contratos inteligentes. También le recomendamos que entienda los contratos inteligentes como concepto antes de profundizar demasiado en las comparaciones de lenguajes. [Introducción a los contratos inteligentes](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Lenguaje de alto nivel orientado a objetos para implementar contratos inteligentes.
- Lenguaje de llaves que ha sido profundamente influenciado por C++.
- De tipado estático (el tipo de una variable se conoce en el momento de la compilación).
- Soporta:
  - Herencia (puede extender otros contratos).
  - Bibliotecas (puede crear código reutilizable que puede llamar desde diferentes contratos, como funciones estáticas en una clase estática en otros lenguajes de programación orientados a objetos).
  - Tipos complejos definidos por el usuario.

### Enlaces importantes {#important-links}

- [Documentación](https://docs.soliditylang.org/en/latest/)
- [Portal del lenguaje Solidity](https://soliditylang.org/)
- [Solidity mediante ejemplos](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Sala de chat de Gitter de Solidity](https://gitter.im/ethereum/solidity) conectada a la [Sala de chat de Matrix de Solidity](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Hoja de referencia](https://reference.auditless.com/cheatsheet)
- [Blog de Solidity](https://blog.soliditylang.org/)
- [Twitter de Solidity](https://twitter.com/solidity_lang)

### Contrato de ejemplo {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // La palabra clave "public" hace que las variables
    // sean accesibles desde otros contratos
    address public minter;
    mapping (address => uint) public balances;

    // Los eventos permiten a los clientes reaccionar a
    // cambios específicos del contrato que declares
    event Sent(address from, address to, uint amount);

    // El código del constructor solo se ejecuta cuando el contrato
    // es creado
    constructor() {
        minter = msg.sender;
    }

    // Envía una cantidad de monedas recién creadas a una dirección
    // Solo puede ser llamado por el creador del contrato
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Envía una cantidad de monedas existentes
    // desde cualquier remitente a una dirección
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Este ejemplo debería darle una idea de cómo es la sintaxis de un contrato en Solidity. Para obtener una descripción más detallada de las funciones y variables, [consulte la documentación](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Lenguaje de programación pitónico (estilo Python)
- Tipado fuerte
- Código de compilador pequeño y comprensible
- Generación eficiente de código de bytes
- Deliberadamente tiene menos características que Solidity con el objetivo de hacer que los contratos sean más seguros y fáciles de auditar. Vyper no soporta:
  - Modificadores
  - Herencia
  - Ensamblador en línea (inline assembly)
  - Sobrecarga de funciones
  - Sobrecarga de operadores
  - Llamadas recursivas
  - Bucles de longitud infinita
  - Puntos fijos binarios

Para obtener más información, [lea los fundamentos de Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Enlaces importantes {#important-links-1}

- [Documentación](https://vyper.readthedocs.io)
- [Vyper mediante ejemplos](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Más de Vyper mediante ejemplos](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Chat de Discord de la comunidad de Vyper](https://discord.gg/SdvKC79cJk)
- [Hoja de referencia](https://reference.auditless.com/cheatsheet)
- [Entornos de desarrollo y herramientas de contratos inteligentes para Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk: aprenda a proteger y hackear contratos inteligentes de Vyper](https://github.com/SupremacyTeam/VyperPunk)
- [Vyper Hub para el desarrollo](https://github.com/zcor/vyper-dev)
- [Ejemplos de los mejores contratos inteligentes de Vyper](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Recursos seleccionados de Awesome Vyper](https://github.com/spadebuilders/awesome-vyper)

### Ejemplo {#example}

```python
# Subasta Abierta

# Parámetros de la subasta
# El beneficiario recibe dinero del postor más alto
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Estado actual de la subasta
highestBidder: public(address)
highestBid: public(uint256)

# Se establece en true al final, no permite ningún cambio
ended: public(bool)

# Realiza un seguimiento de las pujas reembolsadas para que podamos seguir el patrón de retiro
pendingReturns: public(HashMap[address, uint256])

# Crea una subasta simple con `_bidding_time`
# segundos de tiempo de puja en nombre de la
# dirección beneficiaria `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Puja en la subasta con el valor enviado
# junto con esta transacción.
# El valor solo será reembolsado si la
# subasta no se gana.
@external
@payable
def bid():
    # Comprueba si el período de puja ha terminado.
    assert block.timestamp < self.auctionEnd
    # Comprueba si la puja es lo suficientemente alta
    assert msg.value > self.highestBid
    # Rastrea el reembolso para el postor más alto anterior
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Rastrea la nueva puja más alta
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Retira una puja previamente reembolsada. El patrón de retiro se
# usa aquí para evitar un problema de seguridad. Si los reembolsos fueran directamente
# enviados como parte de bid(), un contrato de puja malicioso podría bloquear
# esos reembolsos y, por lo tanto, bloquear la entrada de nuevas pujas más altas.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Finaliza la subasta y envía la puja más alta
# al beneficiario.
@external
def endAuction():
    # Es una buena pauta estructurar las funciones que interactúan
    # con otros contratos (es decir, llaman a funciones o envían ether)
    # en tres fases:
    # 1. comprobar condiciones
    # 2. realizar acciones (potencialmente cambiando condiciones)
    # 3. interactuar con otros contratos
    # Si estas fases se mezclan, el otro contrato podría llamar
    # de vuelta al contrato actual y modificar el estado o causar
    # que los efectos (pago de ether) se realicen múltiples veces.
    # Si las funciones llamadas internamente incluyen interacción con
    # contratos externos, también deben considerarse interacción con
    # contratos externos.

    # 1. Condiciones
    # Comprueba si se ha alcanzado la hora de finalización de la subasta
    assert block.timestamp >= self.auctionEnd
    # Comprueba si esta función ya ha sido llamada
    assert not self.ended

    # 2. Efectos
    self.ended = True

    # 3. Interacción
    send(self.beneficiary, self.highestBid)
```

Este ejemplo debería darle una idea de cómo es la sintaxis de un contrato en Vyper. Para obtener una descripción más detallada de las funciones y variables, [consulte la documentación](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul y Yul+ {#yul}

Si es nuevo en Ethereum y aún no ha programado con lenguajes de contratos inteligentes, le recomendamos que comience con Solidity o Vyper. Solo investigue Yul o Yul+ una vez que esté familiarizado con las mejores prácticas de seguridad de los contratos inteligentes y los detalles específicos de trabajar con la EVM.

**Yul**

- Lenguaje intermedio para Ethereum.
- Soporta la [EVM](/developers/docs/evm) y [Ewasm](https://github.com/ewasm), un WebAssembly adaptado a Ethereum, y está diseñado para ser un denominador común utilizable en ambas plataformas.
- Buen objetivo para las etapas de optimización de alto nivel que pueden beneficiar a las plataformas EVM y Ewasm por igual.

**Yul+**

- Una extensión de bajo nivel y altamente eficiente para Yul.
- Diseñado inicialmente para un contrato de [rollup optimista](/developers/docs/scaling/optimistic-rollups/).
- Yul+ puede considerarse como una propuesta de actualización experimental para Yul, añadiéndole nuevas características.

### Enlaces importantes {#important-links-2}

- [Documentación de Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Documentación de Yul+](https://github.com/fuellabs/yulp)
- [Publicación de introducción a Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Contrato de ejemplo {#example-contract-2}

El siguiente ejemplo sencillo implementa una función de potencia. Se puede compilar utilizando `solc --strict-assembly --bin input.yul`. El ejemplo debe
almacenarse en el archivo input.yul.

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

Si ya tiene mucha experiencia con los contratos inteligentes, puede encontrar una implementación completa de ERC-20 en Yul [aquí](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Lenguaje de tipado estático para la Máquina Virtual de Ethereum (EVM).
- Inspirado en Python y Rust.
- Su objetivo es ser fácil de aprender, incluso para los desarrolladores que son nuevos en el ecosistema de Ethereum.
- El desarrollo de Fe aún se encuentra en sus primeras etapas; el lenguaje tuvo su lanzamiento alfa en enero de 2021.

### Enlaces importantes {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Anuncio de Fe](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Hoja de ruta de Fe para 2021](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Chat de Discord de Fe](https://discord.com/invite/ywpkAXFjZH)
- [Twitter de Fe](https://twitter.com/official_fe)

### Contrato de ejemplo {#example-contract-3}

El siguiente es un contrato sencillo implementado en Fe.

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

## Cómo elegir {#how-to-choose}

Al igual que con cualquier otro lenguaje de programación, se trata principalmente de elegir la herramienta adecuada para el trabajo adecuado, así como de las preferencias personales.

Aquí hay algunas cosas a considerar si aún no ha probado ninguno de los lenguajes:

### ¿Qué tiene de bueno Solidity? {#solidity-advantages}

- Si es principiante, hay muchos tutoriales y herramientas de aprendizaje disponibles. Vea más sobre esto en la sección [Aprender programando](/developers/learning-tools/).
- Buenas herramientas para desarrolladores disponibles.
- Solidity tiene una gran comunidad de desarrolladores, lo que significa que lo más probable es que encuentre respuestas a sus preguntas con bastante rapidez.

### ¿Qué tiene de bueno Vyper? {#vyper-advatages}

- Excelente manera de comenzar para los desarrolladores de Python que desean escribir contratos inteligentes.
- Vyper tiene un menor número de características, lo que lo hace ideal para la creación rápida de prototipos de ideas.
- Vyper tiene como objetivo ser fácil de auditar y lo más legible posible para los humanos.

### ¿Qué tienen de bueno Yul y Yul+? {#yul-advantages}

- Lenguaje de bajo nivel simplista y funcional.
- Permite acercarse mucho más a la EVM pura, lo que puede ayudar a optimizar el uso de gas de sus contratos.

## Comparaciones de lenguajes {#language-comparisons}

Para ver comparaciones de sintaxis básica, el ciclo de vida del contrato, interfaces, operadores, estructuras de datos, funciones, flujo de control y más, consulte esta [hoja de referencia de Auditless](https://reference.auditless.com/cheatsheet/)

## Lecturas adicionales {#further-reading}

- [Biblioteca de contratos de Solidity de OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity mediante ejemplos](https://solidity-by-example.org)