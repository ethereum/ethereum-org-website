---
title: Linguagens de contratos inteligentes
description: Uma visão geral e comparação de duas línguagens de contratos inteligentes – Solidity e Vyper.
lang: pt-br
---

Um grande aspecto sobre a Ethereum é que os contratos inteligentes podem ser programados usando linguagens relativamente amigáveis para o desenvolvedor. Se você tem experiência com Python ou qualquer [linguagem de marcação](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), você pode encontrar uma linguagem com sintaxe familiar.

As duas linguagens mais ativas e mantidas são:

- Solidity
- Vyper

O Remix IDE oferece um ambiente de desenvolvimento abrangente para a criação e teste de contratos em Solidity e Vyper. [Experimente o Remix IDE no navegador](https://remix.ethereum.org) para começar a codificar.

Desenvolvedores mais experientes também podem querer usar o Yul, uma linguagem intermediária para a [Máquina Virtual Ethereum](/developers/docs/evm/), ou Yul+, uma extensão para Yul.

Se você está curioso e gosta de ajudar a testar novas linguagens que ainda estão em grande desenvolvimento, você pode experimentar com Fe, uma linguagem de contrato inteligente emergente que ainda está na sua infância.

## Pré-requisitos {#prerequisites}

Conhecimento anterior de linguagens de programação, especialmente de JavaScript ou Python, pode ajudá-lo a entender as diferenças nas linguagens de contratos inteligentes. Nós também recomendamos que você entenda os contratos inteligentes como um conceito, antes de se aprofundar nas comparações de linguagem. [Introdução aos contratos inteligentes](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Linguagem de alto nível orientada para objetos para a implementação de contratos inteligentes.
- Linguagem de marcações mais profundamente influenciada por C++.
- Tipada estaticamente (o tipo de variável é conhecido em tempo de compilação).
- Suporte:
  - Herança (você pode estender outros contratos).
  - Bibliotecas (você pode criar código reutilizável que pode ser chamado de diferentes contratos – como funções estáticas dentro de uma classe estática em outras linguagens de programação orientadas a objetos).
  - Tipos complexos definidos pelo usuário.

### Links importantes {#important-links}

- [Documentação](https://docs.soliditylang.org/en/latest/)
- [Portal da linguagem Solidity](https://soliditylang.org/)
- [Solidity como exemplo](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter Chatroom](https://gitter.im/ethereum/solidity) ponte para [Solidity Matrix Chatroom](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Dicas](https://reference.auditless.com/cheatsheet)
- [Blog da Solidity](https://blog.soliditylang.org/)
- [Solidity Twitter](https://twitter.com/solidity_lang)

### Exemplo de contrato {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // A palavra-chave "public" torna as variáveis
    // acessíveis a partir de outros contratos
    address public minter;
    mapping (address => uint) public balances;

    // Os eventos permitem que os clientes reajam a determinadas
    // alterações de contrato que você declara
    event Sent(address from, address to, uint amount);

    // O código constructor só é executado quando o contrato
    // é criado
    constructor() {
        minter = msg.sender;
    }

    // Envia uma quantidade de moedas recém criadas para um endereço
    // Só pode ser chamada pelo criador do contrato
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Envia uma quantidade de moedas existentes
    // de qualquer solicitador para um endereço
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Saldo insuficiente.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Esse exemplo deve dar a você, uma ideia de como é a sintaxe de um contrato na Solidity. Para uma descrição mais detalhada das funções e variáveis, [consulte a documentação](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Linguagem de programação Pythonic
- Digitação sólida
- Código de compilador pequeno e compreensível
- Geração de bytecode eficiente
- Deliberadamente, tem menos recursos do que Solidity, com o objetivo de tornar os contratos mais seguros e mais fáceis de auditar. Vyper não suporta:
  - Modificadores
  - Herança
  - Montagem embutida
  - Sobrecarga de função
  - Sobrecarga do operador
  - Chamada recursiva
  - Repetições com comprimento infinito
  - Pontos fixos binários

Para obter mais informações, [leia a lógica do Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Links importantes {#important-links-1}

- [Documentação](https://vyper.readthedocs.io)
- [Vyper como exemplo](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Mais Vyper por Exemplo](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Chat Discord da comunidade Vyper](https://discord.gg/SdvKC79cJk)
- [Dicas](https://reference.auditless.com/cheatsheet)
- [Ferramentas e frameworks de desenvolvimento de contratos inteligentes para Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk - Aprenda a proteger e hackear contratos inteligentes Vyper](https://github.com/SupremacyTeam/VyperPunk)
- [VyperExamples - Exemplos de vulnerabilidade Vyper](https://www.vyperexamples.com/reentrancy)
- [Vyper Hub para desenvolvimento](https://github.com/zcor/vyper-dev)
- [Exemplos de contratos inteligentes de maiores sucessos Vyper](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Recursos incríveis com curadoria do Vyper](https://github.com/spadebuilders/awesome-vyper)

### Exemplo {#example}

```python
# Leilão aberto

# Parâmetros do leilão
# Beneficiário recebe dinheiro do licitante com lance mais alto
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Estado atual do leilão
highestBidder: public(address)
highestBid: public(uint256)

# Definido como verdadeiro no final, não permite qualquer alteração
ended: public(bool)

# Acompanha os lances reembolsados para que possamos seguir o padrão de saque
pendingReturns: public(HashMap[address, uint256])

# Cria um leilão simples com `_bidding_time`
# segundos de tempo de licitação em nome do
# endereço do beneficiário `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Licita no leilão com o valor enviado
# junto com esta transação.
# O valor só será devolvido se o
# leilão não foi ganho.
@external
@payable
def bid():
    # Verifica se o período de licitação acabou.
    assert block.timestamp < self.auctionEnd
    # Verifica se o lance é alto o suficiente
    assert msg.value > self.highestBid
    # Rastreia o reembolso do licitante anterior
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Rastreia o mais recente lance mais alto
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Retira um lance previamente reembolsado. O padrão de retirada é
# usado aqui para evitar um problema de segurança. Se os reembolsos fossem diretamente
# enviados como parte do lance (bid()), um contrato de licitação malicioso poderia bloquear
# esses reembolsos e, assim, bloquear a entrada de novos lances mais altos.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Termina o leilão e envia o lance mais alto
# para o beneficiário.
@external
def endAuction():
    # É uma boa diretriz para estruturar funções que interagem
    # com outros contratos (ou seja, eles chamam funções ou enviam Ether)
    # em três fases:
    # 1. verificando as condições
    # 2. realizando ações (condições potencialmente mutáveis)
    # 3. interagindo com outros contratos
    # Se essas fases forem misturadas, o outro contrato poderia retornar ao
    # contrato atual e modificar o estado ou causar
    # efeitos (pagamento em ether) para serem realizados várias vezes.
    # Se as funções chamadas internamente incluem interações
    # com contratos externos, também devem ser consideradas interações com
    # contratos externos.

    # 1. Condições
    # Verifique se o horário de término do leilão foi atingido
    assert block.timestamp >= self.auctionEnd
    # Verifique se esta função já foi chamada
    assert not self.ended

    # 2. Efeitos
    self.ended = True

    # 3. Interação
    send(self.beneficiary, self.highestBid)
```

Esse exemplo deve dar-nos uma noção do que é a sintaxe do contrato Vyper. Para uma descrição mais detalhada das funções e variáveis, [consulte a documentação](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul e Yul+ {#yul}

Se você é novo na Ethereum e ainda não fez qualquer codificação com linguagens de contrato inteligentes, recomendamos começar com Solidity ou Vyper. Apenas olhe para Yul ou Yul+ quando estiver familiarizado com as melhores práticas de segurança inteligente do contrato e com as especificações de trabalho com a EVM.

**Yul**

- Linguagem intermediária para Ethereum.
- Suporta a [EVM](/developers/docs/evm) e [eWASM](https://github.com/ewasm), um WebAssembly com sabor de Ethereum e concebido para ser um denominador comum utilizável de ambas as plataformas.
- Alvo para fases de otimização de alto nível que podem beneficiar tanto as plataformas EVM como Ewasm de forma igual.

**Yul+**

- Uma extensão de baixo nível altamente eficiente para Yul.
- Inicialmente concebido para um [optimistic rollup](/developers/docs/scaling/optimistic-rollups/).
- Yul+ pode ser visto como uma proposta de atualização experimental para Yul, adicionando novos recursos.

### Links Importantes {#important-links-2}

- [Documentação](https://docs.soliditylang.org/en/latest/yul.html)
- [Documentação Yul+](https://github.com/fuellabs/yulp)
- [Yul+ Playground](https://yulp.fuel.sh/)
- [Yul+ Post de Introdução](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Exemplo de contrato {#example-contract-2}

O exemplo a seguir simples implementa uma função de energia. Ele pode ser compilado usando `solc --strict-assembly --bin input.yul`. O exemplo deve ser armazenado no arquivo input.yul.

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

Se você já é bem experiente com contratos inteligentes, uma implementação do ERC20 em Yul pode ser encontrada [aqui](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Linguagem estaticamente digitada para a Máquina Virtual Ethereum (EVM).
- Inspirado por Python e Rust.
- O objetivo é ser fácil de aprender -- mesmo para desenvolvedores que são novos no ecossistema Ethereum.
- Fe ainda está em seus estágios iniciais, a linguagem teve sua versão alfa em janeiro de 2021.

### Links importantes {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Anúncio da Fe](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021 Roadmap](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Chat de Discord Fe](https://discord.com/invite/ywpkAXFjZH)
- [Fe Twitter](https://twitter.com/official_fe)

### Exemplo de contrato {#example-contract-3}

O seguinte é um contrato simples implementado em Fe.

```
type BookMsg = bytes[100]

contrate GuestBook:
    pub guest_book: map<address, BookMsg>

    event Signed:
        book_msg: BookMsg

    pub def sign(book_msg: BookMsg):
        eu mesmo. uest_book[msg.sender] = book_msg

        emite Signed(book_msg=book_msg)

    pub def get_msg(addr: address) -> BookMsg:
        remeter. uest_book[addr].to_mem()

```

## Como escolher {#how-to-choose}

Como com qualquer outra linguagem de programação, trata-se principalmente de escolher a ferramenta certa para o trabalho certo, assim como preferências pessoais.

Aqui estão algumas coisas a considerar se você ainda não tentou nenhuma das linguagens:

### O que é que há de melhor em Solidity? {#solidity-advantages}

- Se você for um iniciante, há muitos tutoriais e ferramentas de aprendizagem disponíveis. Veja mais sobre isso na seção [Aprenda programando](/developers/learning-tools/).
- Ótima ferramenta de desenvolvedor disponível.
- Solidity tem uma grande comunidade de desenvolvedores, o que significa que você provavelmente encontrará respostas para as suas perguntas muito rapidamente.

### O que há de melhor em Vyper? {#vyper-advatages}

- Uma ótima maneira de começar para desenvolvedores de Python que querem escrever contratos inteligentes.
- O Vyper tem um número menor de características que o torna ótimo para a rápida reprodução de ideias.
- A Vyper visa ser fácil de controlar e o máximo legível ao ser humano.

### O que é ótimo sobre Yul e Yul+? {#yul-advantages}

- Uma linguagem de baixo nível simples e funcional.
- Permite aproximar-se muito mais da EVM bruta, o que pode ajudar a otimizar o uso de gás de seus contratos.

## Comparações de linguagens {#language-comparisons}

Para comparações de sintaxe básica, o ciclo de vida do contrato, interfaces, operadores, estruturas de dados, funções, fluxo de controle e mais confira esta [folha de crédito por auditoria](https://reference.auditless.com/cheatsheet/)

## Leitura adicional {#further-reading}

- [Biblioteca de Contratos da Solidity por OpenZeppelin](https://docs.openzeppelin.com/contracts)
- [Solidity como exemplo](https://solidity-by-example.org)
