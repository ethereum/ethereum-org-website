---
title: Lenguajes de contrato inteligente
description: "Descripción y comparación de los 2 lenguajes de contrato inteligente principales: Solidity y Vyper."
lang: es
---

Un gran aspecto de Ethereum es que los contratos inteligentes pueden programarse utilizando lenguajes relativamente fáciles para el programador. Si tienes experiencia con Python o con cualquier [lenguaje de llaves](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), puedes encontrar un lenguaje con una sintaxis familiar.

Los dos lenguajes más activos y soportados son:

- Solidez
- Vyper

Remix IDE proporciona un entorno de desarrollo integral para crear y probar contratos tanto en Solidity como en Vyper. [Prueba el IDE Remix en el navegador](https://remix.ethereum.org) para empezar a programar.

Es posible que los desarrolladores con más experiencia quieran utilizar Yul, un lenguaje intermedio para la [Máquina Virtual de Ethereum](/developers/docs/evm/), o Yul+, una extensión de Yul.

Si es curioso y le gustaría ayudar a testear nuevos lenguajes que aún se encuentran en gran desarrollo, puede experimentar con Fe, un lenguaje emergente de contratos inteligentes que aún está en sus inicios.

## Requisitos previos {#prerequisites}

El conocimiento previo de lenguajes de programación, especialmente de JavaScript o Python, puede ayudarlo a entender las diferencias en los lenguajes de los contratos inteligentes. También recomendamos que entienda los lenguajes de los contratos inteligentes como concepto antes de profundizar en las comparaciones de lenguajes. [Introducción a los contratos inteligentes](/developers/docs/smart-contracts/).

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
- [Portal del lenguaje Solidity](https://soliditylang.org/)
- [Solidity by Example](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Sala de chat de Gitter sobre Solidity](https://gitter.im/ethereum/solidity) conectada a la [sala de chat de Matrix sobre Solidity](https://matrix.to/#/#ethereum_solidity:gitter.im)
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

    // Los eventos permiten a los clientes reaccionar a los cambios específicos
    // del contrato que declares
    event Sent(address from, address to, uint amount);

    // El código del constructor solo se ejecuta cuando se crea
    // el contrato
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
    // desde cualquier persona que llame a una dirección
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Saldo insuficiente.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Este ejemplo debería darle una idea de cómo es la sintaxis de un contrato Solidity. Para una descripción más detallada de las funciones y variables, [consulta la documentación](https://docs.soliditylang.org/en/latest/contracts.html).

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

Para obtener más información, [lee los fundamentos de Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Enlaces importantes {#important-links-1}

- [Documentación](https://vyper.readthedocs.io)
- [Vyper by Example](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [More Vyper by Example](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Chat de Discord de la comunidad de Vyper](https://discord.gg/SdvKC79cJk)
- [Hoja de referencia](https://reference.auditless.com/cheatsheet)
- [Marcos de desarrollo y herramientas para contratos inteligentes de Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk: aprende a proteger y hackear contratos inteligentes de Vyper](https://github.com/SupremacyTeam/VyperPunk)
- [Vyper Hub para el desarrollo](https://github.com/zcor/vyper-dev)
- [Ejemplos de contratos inteligentes de grandes éxitos de Vyper](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Recursos seleccionados de Awesome Vyper](https://github.com/spadebuilders/awesome-vyper)

### Ejemplo {#example}

```python
# Subasta abierta

# Parámetros de la subasta
# El beneficiario recibe el dinero del mejor postor
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Estado actual de la subasta
highestBidder: public(address)
highestBid: public(uint256)

# Se establece en «true» al final, no permite ningún cambio
ended: public(bool)

# Realiza un seguimiento de las pujas reembolsadas para que podamos seguir el patrón de retirada
pendingReturns: public(HashMap[address, uint256])

# Crea una subasta simple con un tiempo de puja de `_bidding_time`
# segundos en nombre de
# la dirección del beneficiario `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Puja en la subasta con el valor enviado
# junto con esta transacción.
# El valor solo se reembolsará si
# no se gana la subasta.
@external
@payable
def bid():
    # Comprueba si el período de pujas ha terminado.
    assert block.timestamp < self.auctionEnd
    # Comprueba si la puja es lo suficientemente alta
    assert msg.value > self.highestBid
    # Realiza un seguimiento del reembolso para el anterior mejor postor
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Realiza un seguimiento de la nueva puja más alta
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Retira una puja previamente reembolsada. El patrón de retirada se utiliza
# aquí para evitar un problema de seguridad. Si los reembolsos se enviaran
# directamente como parte de la puja, un contrato de puja malicioso podría bloquear
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
    # Es una buena guía para estructurar las funciones que interactúan
    # con otros contratos (es decir, llaman a funciones o envían ether)
    # en tres fases:
    # 1. Comprobación de condiciones
    # 2. Realización de acciones (que pueden cambiar las condiciones)
    # 3. Interacción con otros contratos
    # Si estas fases se mezclan, el otro contrato podría volver a llamar
    # al contrato actual y modificar el estado o causar
    # que los efectos (pago de ether) se realicen varias veces.
    # Si las funciones llamadas internamente incluyen interacción con
    # contratos externos, también deben considerarse interacción con
    # contratos externos.

    # 1. Condiciones
    # Comprueba si se ha alcanzado el tiempo de finalización de la subasta
    assert block.timestamp >= self.auctionEnd
    # Comprueba si esta función ya ha sido llamada
    assert not self.ended

    # 2. Efectos
    self.ended = True

    # 3. Interacción
    send(self.beneficiary, self.highestBid)
```

Este ejemplo debería darle una idea de cómo es la sintaxis de contratos de Vyper. Para una descripción más detallada de las funciones y variables, [consulta la documentación](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul y Yul+ {#yul}

Si es nuevo en Ethereum y aún no ha hecho ninguna codificación con lenguajes de contrato inteligente, le recomendamos empezar con Solidity o Vyper. Solo póngase con Yul o Yul+ una vez que esté familiarizado con las prácticas recomendadas de seguridad de los contratos inteligentes y los detalles de trabajar con la EVM.

**Yul**

- Lenguaje intermedio para Ethereum.
- Admite la [EVM](/developers/docs/evm) y [Ewasm](https://github.com/ewasm), un WebAssembly con sabor a Ethereum, y está diseñado para ser un denominador común utilizable de ambas plataformas.
- Buen objetivo para etapas de optimización de alto nivel que pueden beneficiar a las plataformas EVM y Ewasm por igual.

**Yul+**

- Una extensión de bajo nivel y alta eficiencia para Yul.
- Diseñado inicialmente para un contrato de [paquetes acumulativos optimistas](/developers/docs/scaling/optimistic-rollups/).
- Yul+ se puede considerar una propuesta de actualización experimental de Yul, que le añade nuevas funciones.

### Enlaces importantes {#important-links-2}

- [Documentación de Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Documentación de Yul+](https://github.com/fuellabs/yulp)
- [Publicación de introducción a Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Contrato de ejemplo {#example-contract-2}

El siguiente ejemplo sencillo implementa una power function. Se puede compilar usando `solc --strict-assembly --bin input.yul`. El ejemplo debe
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

Si ya tiene mucha experiencia con los contratos inteligentes, puede encontrar una implementación completa de ERC20 en Yul [aquí](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Lenguaje escrito estáticamente para la Máquina Virtual de Ethereum (EVM).
- Inspirado en Python y Rust.
- Pretende ser fácil de aprender, incluso para desarrolladores que son nuevos en el ecosistema de Ethereum.
- El desarrollo de Fe se encuentra aún en sus inicios; el lenguaje tuvo su lanzamiento alpha en enero de 2021.

### Enlaces importantes {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Anuncio de Fe](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Hoja de ruta de Fe para 2021](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Chat de Discord de Fe](https://discord.com/invite/ywpkAXFjZH)
- [Twitter de Fe](https://twitter.com/official_fe)

### Contrato de ejemplo {#example-contract-3}

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

## Cómo elegir {#how-to-choose}

Como sucede con cualquier otro lenguaje de programación, se trata principalmente de elegir la herramienta adecuada para el trabajo correcto, así como las preferencias personales.

Estas son algunas cosas que debe tener en cuenta si aún no ha probado ninguno de los lenguajes:

### ¿Qué tiene de genial Solidity? {#solidity-advantages}

- Si es principiante, encontrará muchos tutoriales y herramientas de aprendizaje por ahí. Obtén más información sobre esto en la sección [Aprende programando](/developers/learning-tools/).
- Buenas herramientas de desarrollador disponibles.
- Solidity tiene una gran comunidad de desarrolladores, lo que significa que muy probablemente encontrará rápidamente las respuestas a sus preguntas.

### ¿Qué tiene de genial Vyper? {#vyper-advatages}

- Es una fantástica forma de comenzar para aquellos desarrolladores de Python que deseen escribir contratos inteligentes.
- Vyper dispone de una menor cantidad de funciones que lo convierten en la opción ideal para elaborar prototipos de ideas rápidamente.
- Vyper pretende ser una herramienta fácil de auditar y ofrecer el nivel máximo de legibilidad para las personas.

### ¿Qué tienen de genial Yul y Yul+? {#yul-advantages}

- Lenguaje simple y funcional de bajo nivel.
- Le permite aproximarse mucho más a la EVM sin procesar, lo que puede ayudarlo a optimizar el uso de gas en los contratos.

## Comparaciones de lenguajes {#language-comparisons}

Para comparaciones de sintaxis básica, el ciclo de vida del contrato, interfaces, operadores, estructuras de datos, funciones, flujo de control y más, consulta esta [hoja de referencia de Auditless](https://reference.auditless.com/cheatsheet/)

## Lecturas adicionales {#further-reading}

- [Biblioteca de contratos de Solidity de OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity by Example](https://solidity-by-example.org)
