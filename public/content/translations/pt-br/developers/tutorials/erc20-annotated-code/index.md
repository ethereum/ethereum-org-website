---
title: "Demonstração do Contrato ERC-20"
description: O que é o contrato OpenZeppelin ERC-20 e por que está lá?
author: Ori Pomerantz
lang: pt-br
tags:
  - "solidez"
  - "erc-20"
skill: beginner
published: 2021-03-09
---

## Introdução {#introduction}

Um dos usos mais comuns do Ethereum é a criação por um grupo de pessoas de um token negociável que, de certa forma, criam sua própria moeda. Essas moedas seguem a norma [ERC-20](/developers/docs/standards/tokens/erc-20/). Essa norma possibilita a criação de ferramentas, como os pools de liquidez e carteiras, que funcionam com todos os tokens ERC-20. Neste artigo, analisaremos a [Implementação do OpenZeppelin Solidity ERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol), assim como a [definição de interface](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol).

Este é o código-fonte anotado. Se você deseja implementar ERC-20, [leia este tutorial](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## A 'Interface' {#the-interface}

O objetivo de uma norma como a ERC-20 é permitir que as implementações das várias moedas sejam interoperáveis entre aplicativos, como carteiras e corretoras descentralizadas. Para atingirmos tal objetivo, criamos uma ['interface'](https://www.geeksforgeeks.org/solidity-basics-of-interface/). Qualquer código que necessite utilizar o contrato pode usar as mesmas definições de interface e ser compatível com todos os contratos de token que o usem, seja uma carteira de criptomoedas como a MetaMask, um aplicativo descentralizado como o Etherscan.io, ou um contrato diferente como um pool de liquidez.

![Ilustração da interface ERC-20](erc20_interface.png)

Se você é um programador experiente, provavelmente se lembra de ver constructos semelhantes em [Java](https://www.w3schools.com/java/java_interface.asp) ou mesmo em [arquivos de cabeçalho em C](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html).

Essa é a definição da [interface ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) do OpenZeppelin. Ela é uma tradução do [padrão legível para humanos](https://eips.ethereum.org/EIPS/eip-20) em código Solidity. Obviamente, a interface por si só não define _como_ fazer algo. Isso é explicado no código-fonte do contrato abaixo.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Os arquivos Solidity devem incluir um identificador de licença. [Você pode ver a lista de licenças aqui](https://spdx.org/licenses/). Se você necessitar de uma licença diferente, explique nos comentários.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

A linguagem Solidity continua evoluindo rapidamente, e novas versões podem não ser compatíveis com o código antigo. ([confira aqui](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Portanto, é uma boa ideia especificar não apenas uma versão mínima da linguagem, mas também uma versão máxima com a qual você testou o código.

&nbsp;

```solidity
/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
```

O `@dev` no comentário faz parte do [formato NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html), usado para produzir a documentação a partir de um código-fonte.

&nbsp;

```solidity
interface IERC20 {
```

Convenientemente, nomes de Interface começam com `I`.

&nbsp;

```solidity
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);
```

Essa função é `external`, ou seja, [só pode ser chamada de fora do contrato](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2). Ela retorna o fornecimento total de tokens no contrato. Esse valor é retornado usando o tipo mais comum no Ethereum, 256 bits não assinado (256 bits é o tamanho de fonte nativo da EVM). Essa função também é uma `view`, ou seja, ela não pode alterar o estado, portanto, ela pode ser executada em apenas um nó em vez de fazer com que todos os nós da blockchain a executem. Esse tipo de função não gera transação e não custa [gás](/developers/docs/Gas/).

**Observação:** Em teoria, pode-se ter a impressão de que o criador do contrato conseguiria trapacear retornando uma quantia menor do fornecimento total do que a quantia real, fazendo com que cada moeda valha mais do que realmente vale. De qualquer forma, este medo ignora a verdadeira natureza da blockchain. Tudo que acontece na blockchain pode ser verificado em cada nó. Para conseguir isso, cada contrato da linguagem de código e armazenamento esta disponível em cada nó. Embora não seja obrigatório publicar o código Solidity, mas ninguém confiará em você a menos que publique o código-fonte e a versão do Solidity usados na compilação, para que ele possa ser comparado com o código de linguagem da máquina que você forneceu. Por exemplo, confira [este contrato](https://etherscan.io/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD#code).

&nbsp;

```solidity
    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);
```

Como o próprio nome já diz, `balanceOf` retorna o saldo de uma conta. Contas de Ethereum são identificadas em Solidity usando `address`, que contem 160 bits. Também são `external` e `view`.

&nbsp;

```solidity
    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

A função `transfer` transfere as moedas de um chamador para outro endereço. Isso envolve uma mudança de estado, então não é um `view`. Quando um usuário chama essa função, ele cria uma transação a um custo cobrada em gás. Ele também emite um evento, `Transfer`, para informar a todos na blockchain sobre esse evento.

Essa função possui duas saídas para dois chamadores diferentes:

- Os usuários que chamam a função diretamente de uma interface de usuário. Normalmente o usuário envia uma transação e não espera por uma resposta, que pode demorar uma quantidade indefinida de tempo. O usuário pode ver o que ocorreu procurando pelo recibo da transação (identificado pela transação hash) ou procurando pelo evento `transfer`.
- Outros contratos, nos quais chamam a função como parte de uma transação inteira. Esses contratos obtêm o resultado imediatamente, pois eles executam a mesma transação, para usar o valor de retorno da função.

O mesmo tipo de saída é criado por outras funções que mudam o estado do contrato.

&nbsp;

As provisões permitem que uma conta gaste tokens que pertencem a um proprietário diferente. Isso é útil, por exemplo, para contratos que agem como vendedores. Contratos não podem monitorar eventos, portanto, se um comprador quiser transferir diretamente, tokens para o contrato do vendedor, esse contrato não saberá se foi pago. Em vez disso, o comprador permite que o contrato do vendedor gaste uma certa quantia, e o vendedor transfere essa quantia. Isso é feito por meio de uma função do contrato do vendedor, para que o contrato do vendedor possa saber se a operação foi bem-sucedida.

```solidity
    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. Isso é
     * zero por padrão.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

A função `allowance` permite que qualquer pessoa consulte qual é a provisão que um endereço (`owner`) permite que outro endereço (`spender`) gaste.

&nbsp;

```solidity
    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. Uma solução possível para mitigar esta corrida
     * é primeiramente reduzir a tolerância do remetente para 0 e definir o
     * valor desejado depois:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emite um evento de {Approval}.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

A função `approve` cria uma provisão. Certifique-se de ler a mensagem sobre como ela pode ser usada indevidamente. No Ethereum, você controla a ordem de suas próprias transações, mas não é possível controlar a ordem na qual as transações de outras pessoas serão executadas, a menos que você não envie sua própria transação até ver a transação de outro lado ser executada.

&nbsp;

```solidity
    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. O valor é então deduzido do rendimento do chamador.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Por fim, `transferFrom` é utilizado pelo cliente para realmente gastar a provisão.

&nbsp;

```solidity

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `Valor` é a nova permissão.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Esses eventos são emitidos quando o estado do contrato ERC-20 é alterado.

## O contrato real {#the-actual-contract}

Este é o contrato que implementa o padrão ERC-20, [retirado daqui](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol). Ele não é destinado a ser usado tal como é, mas você pode [herdar](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm) dele para estendê-lo para algo utilizável.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### Importar declarações {#import-statements}

Além das definições de interface acima, o contrato de definição importa outros dois arquivos:

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` são as definições necessárias para usar [OpenGSN](https://www.opengsn.org/), um sistema que permite que usuários sem ether possam usar a blockchain. Observe que esta é uma versão antiga. Se você quiser integrá-la com o OpenGSN [use este tutorial](https://docs.opengsn.org/javascript-client/tutorial.html).
- [A biblioteca SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-‘overflows’/), que é usada para fazer adições e subtrações sem estouros. Isso é necessário, pois, do contrário, uma pessoa pode ter um token, dois tokens, e então ter 2^256-1 tokens.

&nbsp;

Este comentário explica o propósito do contrato.

```solidity
/**
 * @dev Implementation of the {IERC20} interface.
 *
 * This implementation is agnostic to the way tokens are created. Isto significa 
* que um mecanismo de oferta deve ser adicionado em um contrato derivado usando {_mint}.
 * For a generic mechanism see {ERC20PresetMinterPauser}.
 *
 * TIP: For a detailed writeup see our guide
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How
 * to implement supply mechanisms].
 *
 * We have followed general OpenZeppelin guidelines: functions revert instead
 * of returning `false` on failure. Esse comportamento é, no entanto, convencional
 * e não entra em conflito com as expectativas das aplicações do ERC20.
 *
 * Additionally, an {Approval} event is emitted on calls to {transferFrom}.
 * This allows applications to reconstruct the allowance for all accounts just
 * by listening to said events. Outras implementações do EIP podem não emitir
 * esses eventos, pois não é exigido pela especificação.
 *
 * Finally, the non-standard {decreaseAllowance} and {increaseAllowance}
 * functions have been added to mitigate the well-known issues around setting
 * allowances. Veja {IERC20-approve}.
 */

```

### Definição de contrato {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Esta linha especifica a herança, neste caso de `IERC20` acima e `Context`, para OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Essa linha anexa a biblioteca `SafeMath` ao tipo `uint256`. Você pode encontrar essa biblioteca [aqui](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol).

### Definições de variáveis {#variable-definitions}

Essas definições especificam as variáveis de estado do contrato. Existem variáveis declaradas como `private`, mas isso apenas significa que outros contratos na blockchain não as podem ler. _Não há segredos na blockchain_, o software em cada nó possui o estado de cada contrato em cada bloco. Por convenção, as variáveis de estado são denominadas `_<something>`.

As duas primeiras variáveis são [mapeamentos](https://www.tutorialspoint.com/solidity/solidity_mappings.html), ou seja, se comportam mais ou menos da mesma forma que [matrizes associativas](https://wikipedia.org/wiki/Associative_array), com exceção das chaves, que são valores numéricos. O armazenamento é alocado apenas para as entradas que possuem valores diferentes do padrão (zero).

```solidity
    mapping (address => uint256) private _balances;
```

O primeiro mapeamento, `_balances`, é composta por endereços e seus respectivos saldos desse token. Para acessar o saldo, utilize a sintaxe: `_balances[<address>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Esta variável, `_allowances`, armazena as margens explicadas anteriormente. O primeiro índice é o proprietário das moedas, e o segundo é o contrato com a provisão. Para acessar a quantia que o endereço A pode gastar na conta do endereço B, use `_allowances[B][A]`.

&nbsp;

```solidity
    uint256 private _totalSupply;
```

Como o nome sugere, essa variável mantém registro do fornecimento total de tokens.

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

Essas três variáveis são usadas para melhorar a legibilidade. As duas primeiras são autoexplicativas, mas `_decimals` não.

De um lado, o Ethereum não possui ponto flutuante ou variáveis fracionadas. De outro, as pessoas gostam de poder dividir tokens. Uma das razões pelas quais as pessoas estabeleceram o uso do ouro como moeda foi devido à dificuldade de trocá-lo quando alguém queria, por exemplo, comprar vaca pelo valor de um pato.

A solução é manter o registro dos inteiros, mas em vez de contar o token real, contar o token fracionário, que praticamente não tem valor. No caso do ether, a moeda fracionária é chamada de wei, e 10^18 WEI é igual a um ETH. No momento da criação deste artigo, 10.000.000.000.000 WEI equivalem a cerca de um centavo de Dólar ou Euro.

Os aplicativos precisam saber como exibir o saldo do token. Se um usuário tiver 3.141.000.000.000.000.000 WEI, seria equivalente a 3,14 ETH? 31,41 ETH? 3,141 ETH? No caso do ETH, é definido 10^18 WEI para o ETH, mas para sua moeda, você pode escolher um valor diferente. Se dividir uma moeda não fizer sentido, você pode usar um valor `_decimals` de zero. Se você quiser utilizar o mesmo padrão utilizado em ETH, use o valor **18**.

### O Constructor {#the-constructor}

```solidity
    /**
     * @dev Sets the values for {name} and {symbol}, initializes {decimals} with
     * a default value of 18.
     *
     * To select a different value for {decimals}, use {_setupDecimals}.
     *
     * All three of these values are immutable: they can only be set once during
     * construction.
     */
    constructor (string memory name_, string memory symbol_) public {
        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

O construtor é chamado quando o contrato é criado pela primeira vez. Por convenção, os parâmetros da função são denominados `<something>_`.

### Funções da interface do usuário {#user-interface-functions}

```solidity
    /**
     * @dev Returns the name of the token.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5,05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * ether and wei. Esse é o valor {ERC20} usado, a menos que {_setupDecimals} seja
     * chamado.
     *
     * NOTE: This information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * {IERC20-balanceOf} and {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Essas funções, `nome`, `symbol` e `decimals`, ajudam as interfaces do usuário a conhecer o seu contrato para poderem exibi-lo corretamente.

O tipo do retorno é `string memory`, o que significa que retorna uma string que é armazenada na memória. Variáveis, como ‘strings’, podem ser armazenadas em três locais:

|               | Tempo de vida     | Acesso ao contrato | Custo em gás                                                             |
| ------------- | ----------------- | ------------------ | ------------------------------------------------------------------------ |
| Memória       | Chamada da função | Leitura/gravação   | Dezenas ou centenas (maior para locais mais altos)                       |
| Calldata      | Chamar Função     | Somente leitura    | Não pode ser usada como retorno, apenas como tipo de parâmetro de função |
| Armazenamento | Até ser alterado  | Ler/Escrever       | Alto (800 para leitura, 20 mil para gravação)                            |

Neste caso, `memory` é a melhor escolha.

### Informação de leitura do token {#read-token-information}

Essas funções fornecem informações sobre o token, seja o fornecimento total ou o saldo de uma conta.

```solidity
    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

A função `totalSupply` retorna o fornecimento total de tokens.

&nbsp;

```solidity
    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

Leia o saldo de uma conta. Observe que qualquer um pode obter o saldo da conta de outra pessoa. Não há motivo para esconder essa informação, pois ela está disponível em todos os nós. _Não há segredos na blockchain._

### Transferência de tokens {#transfer-tokens}

```solidity
    /**
     * @dev See {IERC20-transfer}.
     *
     * Requirements:
     *
     * - `recipient` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

A função `transfer` é chamada para transferir os tokens do remetente para um destinatário. Observe que mesmo que ela retorne um valor booleano, o valor é sempre **true**. Se a transferência falhar, o contrato anulará a chamada.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

A função `_transfer` faz o trabalho real. Ela é uma função privada que só pode ser chamada por outras funções de contrato. Por convenção, funções privadas são denominadas `_<something>`, assim como as variáveis de estado.

Normalmente, usamos `msg.sender` no Solidity para o remetente de mensagens. No entanto, isso rompe a [OpenGSN](http://opengsn.org/). Caso queiramos permitir transações sem Eth com nosso token, precisamos usar `_msgSender()`. Ela retornará `msg.sender` para transações normais, mas para transações sem Eth, ela indicará o signatário original e não o contrato que repassou a mensagem.

### Funções de margem {#allowance-functions}

Estas são as funções que implementam a funcionalidade da margem: `allowance`, `approve`, `transferFrom`, e `_approve`. Além disso, a implementação do OpenZeppelin vai além do padrão básico, para poder incluir alguns recursos que melhoram a segurança: `increaseAllowance`, e `decreaseAllowance`.

#### A função allowance {#allowance}

```solidity
    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

A função `allowance` permite que todo mundo confira qualquer margem.

#### A função approve {#approve}

```solidity
    /**
     * @dev See {IERC20-approve}.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Essa função é chamada para criar uma provisão. Ela é semelhante à função `transfer` acima:

- A função apenas chama uma função interna (neste caso, `_approve`) que realmente faz o trabalho.
- A função retorna `true` (se for bem-sucedida) ou é revertida (se falhar).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return tu;
}
```

Usamos funções internas para minimizar a quantidade de lugares onde as mudanças de estado ocorrem. _Qualquer_ função que mude o estado constitui um risco de segurança em potencial que precisa ser auditado para segurança. Dessa forma, temos menos chances de errar.

#### A função transferFrom {#transferFrom}

Essa é a função que um gastador chama para gastar uma margem. Isso requer duas operações: transfira o valor sendo gasto e reduza a margem nesse valor.

```solidity
    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. Isso não é
     * necessário para o EIP. Veja a nota no início do {ERC20}.
     *
     * Requirements:
     *
     * - `sender` and `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     * - the caller must have allowance for ``sender``'s tokens of at least
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

A chamada da função `a.sub(b, "message")` faz duas coisas. Primeiro, ela calcula `a-b`, que é a nova margem. Em seguida, ela verifica se esse resultado não é negativo. Se for negativo, a chamada é revertida com a mensagem fornecida. Observe que, quando uma chamada reverte qualquer processamento feito anteriormente a essa chamada, ela é ignorada para não precisarmos desfazer a `_transfer`.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### Adições de segurança do OpenZeppelin {#openzeppelin-safety-additions}

É perigoso definir uma margem que não seja zero como outro valor que não seja zero, porque você só controla a ordem de suas próprias transações, mas não as de outras pessoas. Imagine que você tenha dois usuários: Alice, que é ingênua, e Bill, que é desonesto. Alice quer solicitar um serviço de Bill que, segundo ela, custa cinco tokens — então, ela dá a Bill uma provisão de cinco tokens.

Então, algo muda e o preço de Bill aumenta para dez tokens. Alice, que ainda quer o serviço, envia uma transação que define a provisão de Bill para dez. No momento em que Bill vê essa nova transação no pool de transações, ele envia uma transação que gasta os cinco tokens de Alice e com uma tarifa de gás muito mais alta que, portanto, será minerada mais rápido. Dessa forma, Bill pode gastar os cinco primeiros tokens e, quando a nova provisão de Alice for minerada, pode gastar mais dez por um preço total de quinze tokens, mais do que Alice queria autorizar. Essa técnica é chamada de [front-running](https://consensys.github.io/smart-contract-best-practices/attacks/#front-running)

| Transação de Alice | Nonce de Alice | Transação de Bill             | Nonce de Bill | A provisão de Bill | Total faturado por Bill de Alice |
| ------------------ | -------------- | ----------------------------- | ------------- | ------------------ | -------------------------------- |
| approve(Bill, 5)   | 10             |                               |               | 5                  | 0                                |
|                    |                | transferFrom(Alice, Bill, 5)  | 10.123        | 0                  | 5                                |
| approve(Bill, 10)  | 11             |                               |               | 10                 | 5                                |
|                    |                | transferFrom(Alice, Bill, 10) | 10.124        | 0                  | 15                               |

Para evitar esse problema, essas duas funções (`increaseAllowance` e `reduaseAllowance`) permitem que você modifique a provisão por um valor específico. Então, se Bill já tinha gastado cinco tokens, ele só poderá gastar mais cinco tokens. Dependendo do tempo disponível, há duas maneiras de proceder, sendo que as duas acabam com Bill obtendo os dez tokens:

A:

| Transação de Alice         | Nonce de Alice | Transação de Bill            | Nonce de Bill | Permissão de Bill | Cobrança Total de Alice |
| -------------------------- | --------------:| ---------------------------- | -------------:| -----------------:| ----------------------- |
| approve(Bill, 5)           |             10 |                              |               |                 5 | 0                       |
|                            |                | transferFrom(Alice, Bill, 5) |        10,123 |                 0 | 5                       |
| increaseAllowance(Bill, 5) |             11 |                              |               |           0+5 = 5 | 5                       |
|                            |                | transferFrom(Alice, Bill, 5) |        10,124 |                 0 | 10                      |

B:

| Transação de Alice         | Nonce de Alice | Transação de Bill             | Nonce de Bill | Permissão de Bill | Cobrança Total de Alice |
| -------------------------- | --------------:| ----------------------------- | -------------:| -----------------:| -----------------------:|
| approve(Bill, 5)           |             10 |                               |               |                 5 |                       0 |
| increaseAllowance(Bill, 5) |             11 |                               |               |          5+5 = 10 |                       0 |
|                            |                | transferFrom(Alice, Bill, 10) |        10,124 |                 0 |                      10 |

```solidity
    /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

A função `a.add(b)` é uma adição segura. No caso improvável de `um`+`b`>=`2^256`, ele não é contornado da mesma maneira que uma adição normal.

```solidity

    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### Funções que modificam informações do token {#functions-that-modify-token-information}

Essas são as quatro funções que realmente funcionam: `_transfer`, `_mint`, `_burn`, e `_appro`.

#### A função \_transfer {#\_transfer}

```solidity
    /**
     * @dev Moves tokens `amount` from `sender` to `recipient`.
     *
     * This is internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a {Transfer} event.
     *
     * Requirements:
     *
     * - `sender` cannot be the zero address.
     * - `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Esta função, `_transfer`, transfere moedas de uma conta para outra. Ela é chamada por `transfer` (para transferências da própria conta do remetente) e `transferFrom` (para usar as provisões a serem transferidas da conta de outra pessoa).

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

Na verdade, ninguém possui o endereço zero no Ethereum (ou seja, ninguém conhece uma chave privada cuja chave pública correspondente tenha sido transformada no endereço zero). Quando as pessoas usam esse endereço, geralmente se trata de um bug de software, portanto, falhamos se o endereço zero é usado como o remetente ou o destinatário.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Existem duas maneiras de usar esse contrato:

1. Use-o como um modelo para o seu próprio código
1. [Herde a partir daqui](https://www.bitdegree.org/learn/solidity-inheritance) e substitua apenas as funções que você precisa modificar

O segundo método é muito melhor, porque o código OpenZeppelin ERC-20 já foi auditado e comprovado como seguro. Ao usar a herança, é fácil distinguir quais são as funções que você modificou e, para confiar nos seus contratos, as pessoas só precisam auditar essas funções específicas.

Geralmente, é útil executar uma função toda vez que os tokens mudam de mãos. No entanto,`_transfer` é uma função muito importante e é possível escrevê-la de forma não segura (veja abaixo). Portanto, é melhor não substituí-la. A solução é `_beforeTokenTransfer`, uma [função hook](https://wikipedia.org/wiki/Hooking). Você pode substituir essa função e ela será chamada em cada transferência.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

Essas são as linhas que realmente executam a transferência. Observe que não há **nada** entre elas, e que subtraímos o valor transferido do remetente antes de adicioná-lo ao destinatário. Isso é importante, pois se tivesse ocorrido uma chamada para um contrato diferente nesse meio tempo, ela poderia ter sido utilizada para enganar esse contrato. Dessa forma, a transferência é atômica, ou seja, nada pode acontecer enquanto ela está em execução.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Essa função emite o evento `Transfer`. Os eventos não são acessíveis para contratos inteligentes, mas o código executado fora da blockchain pode ouvir os eventos e reagir a eles. Por exemplo, uma carteira pode monitorar quando o proprietário obtém mais tokens.

#### As funções \_mint e \_burn {#\_mint-and-\_burn}

Essas duas funções (`_mint` e `_burn`) modificam o fornecimento total de moedas. Elas são internas e não há nenhuma função que as chame nesse contrato, portanto, elas só são úteis se você herdar do contrato e adicionar sua própria lógica para decidir em que condições gerar novos tokens ou usar os tokens já existentes.

**OBSERVAÇÃO:** Todos os tokens ERC-20 têm sua própria lógica comercial que dita o gerenciamento de tokens. Por exemplo, um contrato de fornecimento fixo só pode chamar `_mint` no construtor e nunca chamar `_burn`. Um contrato que vende tokens chamará `_mint` quando for pago, e provavelmente chamará `_burn` em algum momento para evitar hiperinflação.

```solidity
    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Certifique-se de atualizar o `_totalSupply` quando o número total de tokens mudar.

&nbsp;

```
    /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

A função `_burn` é quase idêntica à `_mint`, exceto que ela funciona na direção inversa.

#### A função \_approve {#\_approve}

Essa é a função que especifica as provisões. Observe que ela permite que um proprietário especifique uma provisão superior ao saldo atual do proprietário. Isso não tem problema, pois o saldo é verificado no momento da transferência, quando ele poderia diferir do saldo no momento da criação da provisão.

```solidity
    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner` s tokens.
     *
     * This internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

Emita um evento `Approval`. Dependendo de como o aplicativo é escrito, o contrato do gastador pode ser informado sobre a aprovação, seja pelo proprietário, seja pelo servidor que realiza esses eventos.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Modificando as variáveis decimais {#modify-the-decimals-variable}

```solidity


    /**
     * @dev Sets {decimals} to a value other than the default one of 18.
     *
     * WARNING: This function should only be called from the constructor. A maioria dos
     * aplicativos que interagem com contratos das moedas não esperarão que
     * {decimals} altere, e pode funcionar incorretamente se ele o fizer.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Essa função modifica a variável `_decimals` utilizada para dizer às ‘interfaces’ de usuário como interpretar o valor. Você deve chamá-la a partir do construtor. Seria desonesto chamá-la em qualquer ponto subsequente, ainda mais que aplicativos não são projetados para lidar com isso.

### Ganchos {#hooks}

```solidity

    /**
     * @dev Hook that is called before any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * will be to transferred to `to`.
     * - when `from` is zero, `amount` tokens will be minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Essa é a função hook a ser chamada durante as transferências. Ela está vazia, mas se precisar dela para fazer algo, basta sobrescrevê-la.

# Conclusão {#conclusion}

Resumindo, aqui estão algumas das ideias mais importantes neste contrato (na minha opinião, pode ser que as suas não sejam as mesmas):

- _Não há segredos na blockchain_. Qualquer informação que um contrato inteligente possa acessar está disponível para o mundo inteiro.
- Você pode controlar a ordem de suas transações, mas não quando transações de outras pessoas estão em andamento. É por isso que alterar uma provisão pode ser perigoso, porque permite que o gastador gaste a soma das duas provisões.
- Valores do tipo `uint256` aproximados. Em outras palavras, _0-1=2^256-1_. Se esse não for o comportamento desejado, você precisa verificá-lo (ou usar a biblioteca SafeMath que faz isso por você). Observe que isso foi alterado em [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html).
- Faça todas as mudanças de estado de um tipo específico e em um local específico, pois isso facilita a auditoria. Esse é o motivo pelo qual temos, por exemplo, `_approve`, chamado por `approve`, `transferFrom`, `increaseAllowance` e `decreaseAllowance`
- Mudanças de estado devem ser atômicas, sem qualquer outra ação no meio (como se pode ver em `_transfer`). Isso ocorre, pois, durante a mudança de estado, o estado é inconsistente. Por exemplo, entre o tempo que você deduz do saldo do remetente e o tempo de adicionar ao saldo do beneficiário, há menos tokens existentes do que deveria haver. Isto pode ser potencialmente explorado mal-intencionadamente se houver operações entre eles, especialmente chamadas para um contrato diferente.

Agora que você já viu como o contrato do OpenZeppelin ERC-20 é escrito, e especialmente como ele se tornou mais seguro, escreva seus próprios contratos e aplicativos seguros.
