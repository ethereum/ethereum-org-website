---
title: Linguagens de contratos inteligentes
description: "Uma visão geral e comparação das duas principais linguagens de contratos inteligentes – Solidity e Vyper."
lang: pt-br
---

Um ótimo aspecto sobre o [Ethereum](/) é que os contratos inteligentes podem ser programados usando linguagens relativamente amigáveis para desenvolvedores. Se você tem experiência com Python ou qualquer [linguagem com chaves](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), poderá encontrar uma linguagem com sintaxe familiar.

As duas linguagens mais ativas e mantidas são:

- Solidity
- Vyper

O Remix IDE fornece um ambiente de desenvolvimento abrangente para criar e testar contratos tanto em Solidity quanto em Vyper. [Experimente o Remix IDE no navegador](https://remix.ethereum.org) para começar a programar.

Desenvolvedores mais experientes também podem querer usar Yul, uma linguagem intermediária para a [Máquina Virtual Ethereum (EVM)](/developers/docs/evm/), ou Yul+, uma extensão para Yul.

Se você é curioso e gosta de ajudar a testar novas linguagens que ainda estão em forte desenvolvimento, pode experimentar a Fe, uma linguagem emergente de contratos inteligentes que ainda está em sua infância.

## Pré-requisitos {#prerequisites}

O conhecimento prévio de linguagens de programação, especialmente JavaScript ou Python, pode ajudá-lo a entender as diferenças nas linguagens de contratos inteligentes. Também recomendamos que você entenda os contratos inteligentes como um conceito antes de se aprofundar muito nas comparações de linguagens. [Introdução aos contratos inteligentes](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Linguagem de alto nível orientada a objetos para a implementação de contratos inteligentes.
- Linguagem com chaves que foi mais profundamente influenciada pelo C++.
- Tipagem estática (o tipo de uma variável é conhecido em tempo de compilação).
- Suporta:
  - Herança (você pode estender outros contratos).
  - Bibliotecas (você pode criar código reutilizável que pode ser chamado de diferentes contratos – como funções estáticas em uma classe estática em outras linguagens de programação orientadas a objetos).
  - Tipos complexos definidos pelo usuário.

### Links importantes {#important-links}

- [Documentação](https://docs.soliditylang.org/en/latest/)
- [Portal da linguagem Solidity](https://soliditylang.org/)
- [Solidity by Example](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Sala de bate-papo do Solidity no Gitter](https://gitter.im/ethereum/solidity) conectada à [sala de bate-papo do Solidity no Matrix](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Folha de dicas](https://reference.auditless.com/cheatsheet)
- [Blog do Solidity](https://blog.soliditylang.org/)
- [Twitter do Solidity](https://twitter.com/solidity_lang)

### Exemplo de contrato {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // A palavra-chave "public" torna as variáveis
    // acessíveis a partir de outros contratos
    address public minter;
    mapping (address => uint) public balances;

    // Eventos permitem que os clientes reajam a alterações
    // específicas do contrato que você declarar
    event Sent(address from, address to, uint amount);

    // O código do construtor é executado apenas quando o contrato
    // é criado
    constructor() {
        minter = msg.sender;
    }

    // Envia uma quantidade de moedas recém-criadas para um endereço
    // Só pode ser chamado pelo criador do contrato
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Envia uma quantidade de moedas existentes
    // de qualquer chamador para um endereço
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Este exemplo deve lhe dar uma ideia de como é a sintaxe de um contrato em Solidity. Para uma descrição mais detalhada das funções e variáveis, [veja a documentação](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Linguagem de programação pythônica
- Tipagem forte
- Código de compilador pequeno e compreensível
- Geração eficiente de bytecode
- Deliberadamente tem menos recursos que o Solidity com o objetivo de tornar os contratos mais seguros e fáceis de auditar. Vyper não suporta:
  - Modificadores
  - Herança
  - Assembly embutido (inline)
  - Sobrecarga de função
  - Sobrecarga de operador
  - Chamada recursiva
  - Loops de comprimento infinito
  - Pontos fixos binários

Para mais informações, [leia a fundamentação do Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Links importantes {#important-links-1}

- [Documentação](https://vyper.readthedocs.io)
- [Vyper by Example](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Mais Vyper by Example](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Bate-papo da comunidade Vyper no Discord](https://discord.gg/SdvKC79cJk)
- [Folha de dicas](https://reference.auditless.com/cheatsheet)
- [Frameworks e ferramentas de desenvolvimento de contratos inteligentes para Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk - aprenda a proteger e hackear contratos inteligentes em Vyper](https://github.com/SupremacyTeam/VyperPunk)
- [Vyper Hub para desenvolvimento](https://github.com/zcor/vyper-dev)
- [Exemplos dos melhores contratos inteligentes em Vyper](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Recursos selecionados do Awesome Vyper](https://github.com/spadebuilders/awesome-vyper)

### Exemplo {#example}

```python
# Leilão Aberto

# Parâmetros do leilão
# O beneficiário recebe o dinheiro do maior licitante
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Estado atual do leilão
highestBidder: public(address)
highestBid: public(uint256)

# Definido como true no final, não permite nenhuma alteração
ended: public(bool)

# Acompanha os lances reembolsados para que possamos seguir o padrão de retirada
pendingReturns: public(HashMap[address, uint256])

# Cria um leilão simples com `_bidding_time`
# segundos de tempo de lance em nome do
# endereço do beneficiário `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Faça um lance no leilão com o valor enviado
# junto com esta transação.
# O valor só será reembolsado se o
# leilão não for ganho.
@external
@payable
def bid():
    # Verifica se o período de lances acabou.
    assert block.timestamp < self.auctionEnd
    # Verifica se o lance é alto o suficiente
    assert msg.value > self.highestBid
    # Rastreia o reembolso para o maior licitante anterior
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Rastreia o novo lance mais alto
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Retira um lance reembolsado anteriormente. O padrão de retirada é
# usado aqui para evitar um problema de segurança. Se os reembolsos fossem diretamente
# enviados como parte de bid(), um contrato de lance malicioso poderia bloquear
# esses reembolsos e, assim, bloquear a entrada de novos lances mais altos.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Encerra o leilão e envia o lance mais alto
# para o beneficiário.
@external
def endAuction():
    # É uma boa diretriz estruturar funções que interagem
    # com outros contratos (ou seja, chamam funções ou enviam ether)
    # em três fases:
    # 1. verificação de condições
    # 2. execução de ações (potencialmente alterando condições)
    # 3. interação com outros contratos
    # Se essas fases forem misturadas, o outro contrato pode chamar
    # de volta o contrato atual e modificar o estado ou fazer com que
    # efeitos (pagamento de ether) sejam executados várias vezes.
    # Se as funções chamadas internamente incluírem interação com
    # contratos externos, elas também devem ser consideradas interação com
    # contratos externos.

    # 1. Condições
    # Verifica se o tempo de término do leilão foi atingido
    assert block.timestamp >= self.auctionEnd
    # Verifica se esta função já foi chamada
    assert not self.ended

    # 2. Efeitos
    self.ended = True

    # 3. Interação
    send(self.beneficiary, self.highestBid)
```

Este exemplo deve lhe dar uma ideia de como é a sintaxe de um contrato em Vyper. Para uma descrição mais detalhada das funções e variáveis, [veja a documentação](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul e Yul+ {#yul}

Se você é novo no Ethereum e ainda não programou com linguagens de contratos inteligentes, recomendamos começar com Solidity ou Vyper. Só analise Yul ou Yul+ quando estiver familiarizado com as melhores práticas de segurança de contratos inteligentes e as especificidades de trabalhar com a EVM.

**Yul**

- Linguagem intermediária para Ethereum.
- Suporta a [EVM](/developers/docs/evm) e [Ewasm](https://github.com/ewasm), um WebAssembly adaptado para o Ethereum, e foi projetada para ser um denominador comum utilizável de ambas as plataformas.
- Bom alvo para estágios de otimização de alto nível que podem beneficiar igualmente as plataformas EVM e Ewasm.

**Yul+**

- Uma extensão de baixo nível e altamente eficiente para Yul.
- Inicialmente projetada para um contrato de [rollup otimista](/developers/docs/scaling/optimistic-rollups/).
- Yul+ pode ser vista como uma proposta de atualização experimental para Yul, adicionando novos recursos a ela.

### Links importantes {#important-links-2}

- [Documentação do Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Documentação do Yul+](https://github.com/fuellabs/yulp)
- [Postagem de introdução ao Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Exemplo de contrato {#example-contract-2}

O exemplo simples a seguir implementa uma função de potência. Ele pode ser compilado usando `solc --strict-assembly --bin input.yul`. O exemplo deve
ser armazenado no arquivo input.yul.

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

Se você já tem bastante experiência com contratos inteligentes, uma implementação completa de ERC-20 em Yul pode ser encontrada [aqui](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Linguagem de tipagem estática para a Máquina Virtual Ethereum (EVM).
- Inspirada em Python e Rust.
- Tem como objetivo ser fácil de aprender -- mesmo para desenvolvedores que são novos no ecossistema Ethereum.
- O desenvolvimento da Fe ainda está em seus estágios iniciais, a linguagem teve seu lançamento alfa em janeiro de 2021.

### Links importantes {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Anúncio da Fe](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Roteiro da Fe para 2021](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Bate-papo da Fe no Discord](https://discord.com/invite/ywpkAXFjZH)
- [Twitter da Fe](https://twitter.com/official_fe)

### Exemplo de contrato {#example-contract-3}

O seguinte é um contrato simples implementado em Fe.

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

## Como escolher {#how-to-choose}

Como em qualquer outra linguagem de programação, trata-se principalmente de escolher a ferramenta certa para o trabalho certo, bem como de preferências pessoais.

Aqui estão algumas coisas a considerar se você ainda não experimentou nenhuma das linguagens:

### O que há de bom no Solidity? {#solidity-advantages}

- Se você é iniciante, existem muitos tutoriais e ferramentas de aprendizado disponíveis. Veja mais sobre isso na seção [Aprenda programando](/developers/learning-tools/).
- Boas ferramentas de desenvolvedor disponíveis.
- O Solidity tem uma grande comunidade de desenvolvedores, o que significa que você provavelmente encontrará respostas para suas perguntas rapidamente.

### O que há de bom no Vyper? {#vyper-advatages}

- Ótima maneira de começar para desenvolvedores Python que desejam escrever contratos inteligentes.
- O Vyper tem um número menor de recursos, o que o torna ótimo para a prototipagem rápida de ideias.
- O Vyper tem como objetivo ser fácil de auditar e o mais legível possível para humanos.

### O que há de bom no Yul e Yul+? {#yul-advantages}

- Linguagem de baixo nível simplista e funcional.
- Permite chegar muito mais perto da EVM bruta, o que pode ajudar a otimizar o uso de gás dos seus contratos.

## Comparações de linguagens {#language-comparisons}

Para comparações de sintaxe básica, ciclo de vida do contrato, interfaces, operadores, estruturas de dados, funções, fluxo de controle e muito mais, confira esta [folha de dicas da Auditless](https://reference.auditless.com/cheatsheet/)

## Leitura adicional {#further-reading}

- [Biblioteca de contratos Solidity da OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity by Example](https://solidity-by-example.org)