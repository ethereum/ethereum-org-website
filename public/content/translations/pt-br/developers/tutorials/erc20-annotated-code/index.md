---
title: "Passo a passo do contrato ERC-20"
description: O que está no contrato ERC-20 da OpenZeppelin e por que está lá?
author: |
  Ori Pomerantz
lang: pt-br
tags: [ "solidez", "erc-20" ]
skill: beginner
published: 09-03-2021
---

## Introdução {#introduction}

Um dos usos mais comuns do Ethereum é a criação por um grupo de pessoas de um token negociável que, de certa forma, criam sua própria moeda. Esses tokens geralmente seguem um padrão,
o [ERC-20](/developers/docs/standards/tokens/erc-20/). Esse padrão possibilita escrever ferramentas, como pools de liquidez e carteiras, que funcionam com todos os tokens
ERC-20. Neste artigo, analisaremos a
implementação [ERC20 em Solidity da OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol), bem como a
[definição da interface](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol).

Este é um código-fonte anotado. Se você quiser implementar o ERC-20,
[leia este tutorial](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## A interface {#the-interface}

O objetivo de um padrão como o ERC-20 é permitir que muitas implementações de tokens sejam interoperáveis entre aplicativos, como carteiras e corretoras descentralizadas. Para conseguir isso, criamos uma
[interface](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/). Qualquer código que precise usar o contrato de token
pode usar as mesmas definições na interface e ser compatível com todos os contratos de token que a utilizam, seja uma carteira como a
MetaMask, um dapp como o etherscan.io ou um contrato diferente, como um pool de liquidez.

![Ilustração da interface ERC-20](erc20_interface.png)

Se você é um programador experiente, provavelmente se lembra de ter visto construções semelhantes em [Java](https://www.w3schools.com/java/java_interface.asp)
ou até mesmo em [arquivos de cabeçalho C](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html).

Esta é uma definição da [Interface ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)
da OpenZeppelin. É uma tradução do [padrão legível por humanos](https://eips.ethereum.org/EIPS/eip-20) para o código Solidity. Claro, a
interface em si não define _como_ fazer nada. Isso é explicado no código-fonte do contrato abaixo.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Os arquivos Solidity devem incluir um identificador de licença. [Você pode ver a lista de licenças aqui](https://spdx.org/licenses/). Se você precisar de uma licença
diferente, basta explicá-la nos comentários.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

A linguagem Solidity ainda está evoluindo rapidamente, e novas versões podem não ser compatíveis com códigos antigos
([veja aqui](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Portanto, é uma boa ideia especificar não apenas uma versão mínima
da linguagem, mas também uma versão máxima, a mais recente com a qual você testou o código.

&nbsp;

```solidity
/**
 * @dev Interface do padrão ERC20, conforme definido na EIP.
 */
```

O `@dev` no comentário faz parte do [formato NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html), usado para produzir
documentação a partir do código-fonte.

&nbsp;

```solidity
interface IERC20 {
```

Por convenção, os nomes de interface começam com `I`.

&nbsp;

```solidity
    /**
     * @dev Retorna a quantidade de tokens existentes.
     */
    function totalSupply() external view returns (uint256);
```

Esta função é `external`, o que significa que [só pode ser chamada de fora do contrato](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2).
Ela retorna o fornecimento total de tokens no contrato. Este valor é retornado usando o tipo mais comum no Ethereum, 256 bits sem sinal (256 bits é o
tamanho nativo da palavra da EVM). Essa função também é uma `view`, o que significa que ela não altera o estado, portanto, pode ser executada em um único nó, em vez de fazer com que
todos os nós da blockchain a executem. Esse tipo de função não gera uma transação e não custa [gás](/developers/docs/gas/).

**Observação:** em teoria, pode parecer que o criador de um contrato poderia trapacear retornando um fornecimento total menor que o valor real, fazendo com que cada token pareça
mais valioso do que realmente é. No entanto, esse medo ignora a verdadeira natureza da blockchain. Tudo o que acontece na blockchain pode ser verificado por
todos os nós. Para conseguir isso, o código de linguagem de máquina e o armazenamento de cada contrato estão disponíveis em todos os nós. Embora você não seja obrigado a publicar o código Solidity
do seu contrato, ninguém o levaria a sério, a menos que você publique o código-fonte e a versão do Solidity com a qual ele foi compilado, para que possa
ser verificado com o código de linguagem de máquina que você forneceu.
Por exemplo, veja [este contrato](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract).

&nbsp;

```solidity
    /**
     * @dev Retorna a quantidade de tokens de propriedade de `account`.
     */
    function balanceOf(address account) external view returns (uint256);
```

Como o nome diz, `balanceOf` retorna o saldo de uma conta. As contas Ethereum são identificadas no Solidity usando o tipo `address`, que contém 160 bits.
Ela também é `external` e `view`.

&nbsp;

```solidity
    /**
     * @dev Move a quantidade `amount` de tokens da conta do chamador para o `recipient`.
     *
     * Retorna um valor booleano que indica se a operação foi bem-sucedida.
     *
     * Emite um evento {Transfer}.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

A função `transfer` transfere tokens do chamador para um endereço diferente. Isso envolve uma mudança de estado, então não é uma `view`.
Quando um usuário chama essa função, ela cria uma transação e custa gás. Ela também emite um evento, `Transfer`, para informar a todos na
blockchain sobre o evento.

A função tem dois tipos de saída para dois tipos diferentes de chamadores:

- Usuários que chamam a função diretamente de uma interface de usuário. Normalmente, o usuário envia uma transação
  e não espera por uma resposta, que pode levar um tempo indefinido. O usuário pode ver o que aconteceu
  procurando o recibo da transação (que é identificado pelo hash da transação) ou procurando pelo
  evento `Transfer`.
- Outros contratos, que chamam a função como parte de uma transação geral. Esses contratos obtêm o resultado imediatamente,
  porque são executados na mesma transação, para que possam usar o valor de retorno da função.

O mesmo tipo de saída é criado pelas outras funções que alteram o estado do contrato.

&nbsp;

As permissões (allowances) permitem que uma conta gaste alguns tokens que pertencem a um proprietário diferente.
Isso é útil, por exemplo, para contratos que atuam como vendedores. Os contratos não podem
monitorar eventos; portanto, se um comprador transferisse tokens para o contrato do vendedor
diretamente, esse contrato não saberia que foi pago. Em vez disso, o comprador permite que o contrato do
vendedor gaste uma certa quantia, e o vendedor transfere essa quantia.
Isso é feito por meio de uma função que o contrato do vendedor chama, para que o contrato do vendedor
possa saber se foi bem-sucedido.

```solidity
    /**
     * @dev Retorna o número restante de tokens que o `spender` terá
     * permissão para gastar em nome do `owner` por meio de {transferFrom}. O padrão
     * é zero.
     *
     * Esse valor muda quando {approve} ou {transferFrom} são chamados.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

A função `allowance` permite que qualquer pessoa consulte para ver qual é a permissão que um
endereço (`owner`) permite que outro endereço (`spender`) gaste.

&nbsp;

```solidity
    /**
     * @dev Define `amount` como a permissão de `spender` sobre os tokens do chamador.
     *
     * Retorna um valor booleano que indica se a operação foi bem-sucedida.
     *
     * IMPORTANTE: Cuidado, pois alterar uma permissão com este método traz o risco
     * de que alguém possa usar tanto a permissão antiga quanto a nova por meio de uma
     * ordem de transação infeliz. Uma solução possível para mitigar essa condição
     * de corrida é primeiro reduzir a permissão do gastador para 0 e depois definir o
     * valor desejado:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emite um evento {Approval}.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

A função `approve` cria uma permissão. Certifique-se de ler a mensagem sobre
como ela pode ser usada indevidamente. No Ethereum, você controla a ordem de suas próprias transações,
mas não pode controlar a ordem em que as transações de outras pessoas serão
executadas, a menos que você não envie sua própria transação até ver que a
transação da outra parte aconteceu.

&nbsp;

```solidity
    /**
     * @dev Move `amount` tokens de `sender` para `recipient` usando o
     * mecanismo de permissão. `amount` é então deduzido da
     * permissão do chamador.
     *
     * Retorna um valor booleano que indica se a operação foi bem-sucedida.
     *
     * Emite um evento {Transfer}.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Finalmente, `transferFrom` é usado pelo gastador para realmente gastar a permissão.

&nbsp;

```solidity

    /**
     * @dev Emitido quando `value` tokens são movidos de uma conta (`from`) para
     * outra (`to`).
     *
     * Note que `value` pode ser zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitido quando a permissão de um `spender` para um `owner` é definida por
     * uma chamada para {approve}. `value` é a nova permissão.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Esses eventos são emitidos quando o estado do contrato ERC-20 muda.

## O contrato real {#the-actual-contract}

Este é o contrato real que implementa o padrão ERC-20,
[retirado daqui](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Ele não se destina a ser usado como está, mas você pode
[herdar](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm) dele para estendê-lo para algo utilizável.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### Declarações de importação {#import-statements}

Além das definições de interface acima, a definição do contrato importa dois outros arquivos:

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` são as definições necessárias para usar o [OpenGSN](https://www.opengsn.org/), um sistema que permite que usuários sem ether
  usem a blockchain. Observe que esta é uma versão antiga; se você quiser integrar com o OpenGSN,
  [use este tutorial](https://docs.opengsn.org/javascript-client/tutorial.html).
- [A biblioteca SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), que impede
  estouros/subfluxos aritméticos para versões do Solidity **<0.8.0**. No Solidity ≥0.8.0, as operações aritméticas revertem
  automaticamente em caso de estouro/subfluxo, tornando o SafeMath desnecessário. Este contrato usa o SafeMath para compatibilidade com versões anteriores
  de compiladores mais antigos.

&nbsp;

Este comentário explica o propósito do contrato.

```solidity
/**
 * @dev Implementação da interface {IERC20}.
 *
 * Esta implementação é agnóstica à forma como os tokens são criados. Isso significa
 * que um mecanismo de fornecimento deve ser adicionado em um contrato derivado usando {_mint}.
 * Para um mecanismo genérico, veja {ERC20PresetMinterPauser}.
 *
 * DICA: Para um artigo detalhado, consulte nosso guia
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[Como
 * implementar mecanismos de fornecimento].
 *
 * Seguimos as diretrizes gerais da OpenZeppelin: as funções são revertidas em vez
 * de retornar `false` em caso de falha. Esse comportamento, no entanto, é convencional
 * e não entra em conflito com as expectativas dos aplicativos ERC20.
 *
 * Além disso, um evento {Approval} é emitido em chamadas para {transferFrom}.
 * Isso permite que os aplicativos reconstruam a permissão para todas as contas apenas
 * ouvindo esses eventos. Outras implementações da EIP podem não emitir
 * esses eventos, pois não é exigido pela especificação.
 *
 * Finalmente, as funções não padrão {decreaseAllowance} e {increaseAllowance}
 * foram adicionadas para mitigar os problemas conhecidos em torno da definição
 * de permissões. Veja {IERC20-approve}.
 */

```

### Definição do Contrato {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Esta linha especifica a herança, neste caso de `IERC20` acima e `Context`, para OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Essa linha anexa a biblioteca `SafeMath` ao tipo `uint256`. Você pode encontrar esta biblioteca
[aqui](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol).

### Definições de Variáveis {#variable-definitions}

Essas definições especificam as variáveis de estado do contrato. Essas variáveis são declaradas como `private`, mas
isso significa apenas que outros contratos na blockchain não podem lê-las. _Não há
segredos na blockchain_, o software em cada nó tem o estado de cada contrato
em cada bloco. Por convenção, as variáveis de estado são nomeadas `_<algo>`.

As duas primeiras variáveis são [mapeamentos](https://www.tutorialspoint.com/solidity/solidity_mappings.htm),
, o que significa que elas se comportam de forma semelhante a [matrizes associativas](https://wikipedia.org/wiki/Associative_array),
, exceto que as chaves são valores numéricos. O armazenamento só é alocado para entradas que têm valores diferentes
do padrão (zero).

```solidity
    mapping (address => uint256) private _balances;
```

O primeiro mapeamento, `_balances`, são os endereços e seus respectivos saldos deste token. Para acessar
o saldo, use esta sintaxe: `_balances[<endereço>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Essa variável, `_allowances`, armazena as permissões explicadas anteriormente. O primeiro índice é o proprietário
dos tokens, e o segundo é o contrato com a permissão. Para acessar a quantia que o endereço A pode
gastar da conta do endereço B, use `_allowances[B][A]`.

&nbsp;

```solidity
    uint256 private _totalSupply;
```

Como o nome sugere, essa variável acompanha o fornecimento total de tokens.

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

Essas três variáveis são usadas para melhorar a legibilidade. As duas primeiras são autoexplicativas, mas `_decimals`
não é.

Por um lado, o Ethereum não tem variáveis de ponto flutuante ou fracionárias. Por outro lado,
os humanos gostam de poder dividir tokens. Uma das razões pelas quais as pessoas optaram pelo ouro como moeda foi porque
era difícil dar troco quando alguém queria comprar o equivalente a um pato em uma vaca.

A solução é manter o controle de números inteiros, mas contar, em vez do token real, um token fracionário que é
quase sem valor. No caso do ether, o token fracionário é chamado de wei, e 10^18 wei é igual a um
ETH. No momento em que este artigo foi escrito, 10.000.000.000.000 wei equivalem a aproximadamente um centavo de dólar americano ou euro.

Os aplicativos precisam saber como exibir o saldo do token. Se um usuário tiver 3.141.000.000.000.000.000 wei, isso é
3,14 ETH? 31,41 ETH? 3.141 ETH? No caso do ether, é definido 10^18 wei para o ETH, mas para o seu
token você pode selecionar um valor diferente. Se a divisão do token não fizer sentido, você pode usar um
valor `_decimals` de zero. Se você quiser usar o mesmo padrão do ETH, use o valor **18**.

### O construtor {#the-constructor}

```solidity
    /**
     * @dev Define os valores para {name} e {symbol}, inicializa {decimals} com
     * um valor padrão de 18.
     *
     * Para selecionar um valor diferente para {decimals}, use {_setupDecimals}.
     *
     * Todos esses três valores são imutáveis: eles só podem ser definidos uma vez durante
     * a construção.
     */
    constructor (string memory name_, string memory symbol_) public {
        // No Solidity ≥0.7.0, 'public' é implícito e pode ser omitido.

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

O construtor é chamado quando o contrato é criado pela primeira vez. Por convenção, os parâmetros da função são nomeados `<algo>_`.

### Funções da Interface do Usuário {#user-interface-functions}

```solidity
    /**
     * @dev Retorna o nome do token.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Retorna o símbolo do token, geralmente uma versão mais curta do
     * nome.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Retorna o número de casas decimais usadas para obter sua representação de usuário.
     * Por exemplo, se `decimals` for igual a `2`, um saldo de `505` tokens deve
     * ser exibido para um usuário como `5,05` (`505 / 10 ** 2`).
     *
     * Geralmente, os tokens optam por um valor de 18, imitando a relação entre
     * ether e wei. Este é o valor que {ERC20} usa, a menos que {_setupDecimals} seja
     * chamado.
     *
     * OBSERVAÇÃO: esta informação é usada apenas para fins de _exibição_: ela
     * não afeta de forma alguma a aritmética do contrato, incluindo
     * {IERC20-balanceOf} e {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Essas funções, `name`, `symbol` e `decimals` ajudam as interfaces de usuário a saber sobre o seu contrato para que possam exibi-lo corretamente.

O tipo de retorno é `string memory`, o que significa retornar uma string que é armazenada na memória. Variáveis, como
strings, podem ser armazenadas em três locais:

|               | Tempo de vida     | Acesso ao contrato | Custo de gás                                                                      |
| ------------- | ----------------- | ------------------ | --------------------------------------------------------------------------------- |
| Memória       | Chamada de função | Leitura/Escrita    | Dezenas ou centenas (maior para locais mais altos)             |
| Calldata      | Chamada de função | Somente leitura    | Não pode ser usado como um tipo de retorno, apenas um tipo de parâmetro de função |
| Armazenamento | Até ser alterado  | Leitura/Escrita    | Alto (800 para leitura, 20 mil para escrita)                   |

Neste caso, `memory` é a melhor escolha.

### Ler informações do token {#read-token-information}

Estas são funções que fornecem informações sobre o token, seja o fornecimento total ou o
saldo de uma conta.

```solidity
    /**
     * @dev Ver {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

A função `totalSupply` retorna o fornecimento total de tokens.

&nbsp;

```solidity
    /**
     * @dev Ver {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

Leia o saldo de uma conta. Observe que qualquer um pode obter o saldo da conta
de qualquer outra pessoa. Não faz sentido tentar esconder essa informação, porque ela está disponível em todos os
nós de qualquer maneira. _Não há segredos na blockchain._

### Transferir Tokens {#transfer-tokens}

```solidity
    /**
     * @dev Ver {IERC20-transfer}.
     *
     * Requisitos:
     *
     * - `recipient` não pode ser o endereço zero.
     * - o chamador deve ter um saldo de pelo menos `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

A função `transfer` é chamada para transferir tokens da conta do remetente para uma diferente. Observe
que, embora retorne um valor booleano, esse valor é sempre **verdadeiro**. Se a transferência
falhar, o contrato reverte a chamada.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

A função `_transfer` faz o trabalho real. É uma função privada que só pode ser chamada por
outras funções do contrato. Por convenção, as funções privadas são nomeadas como `_<algo>`, da mesma forma que as variáveis
de estado.

Normalmente no Solidity, usamos `msg.sender` para o remetente da mensagem. No entanto, isso quebra o
[OpenGSN](http://opengsn.org/). Se quisermos permitir transações sem ether com nosso token, precisamos
usar `_msgSender()`. Ele retorna `msg.sender` para transações normais, mas para as sem ether
retorna o assinante original e não o contrato que retransmitiu a mensagem.

### Funções de Permissão {#allowance-functions}

Estas são as funções que implementam a funcionalidade de permissão: `allowance`, `approve`, `transferFrom`
e `_approve`. Além disso, a implementação do OpenZeppelin vai além do padrão básico para incluir alguns recursos que melhoram
a segurança: `increaseAllowance` e `decreaseAllowance`.

#### A função allowance {#allowance}

```solidity
    /**
     * @dev Ver {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

A função `allowance` permite que todos verifiquem qualquer permissão.

#### A função approve {#approve}

```solidity
    /**
     * @dev Ver {IERC20-approve}.
     *
     * Requisitos:
     *
     * - `spender` não pode ser o endereço zero.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Esta função é chamada para criar uma permissão. É semelhante à função `transfer` acima:

- A função apenas chama uma função interna (neste caso, `_approve`) que faz o trabalho real.
- A função ou retorna `true` (se for bem-sucedida) ou reverte (se não for).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Usamos funções internas para minimizar o número de locais onde ocorrem mudanças de estado. Qualquer função que altere o
estado é um risco potencial de segurança que precisa ser auditado para segurança. Dessa forma, temos menos chances de errar.

#### A função transferFrom {#transferFrom}

Esta é a função que um gastador chama para gastar uma permissão. Isso requer duas operações: transferir o valor
gasto e reduzir a permissão por esse valor.

```solidity
    /**
     * @dev Ver {IERC20-transferFrom}.
     *
     * Emite um evento {Approval} indicando a permissão atualizada. Isso não
     * é exigido pela EIP. Veja a nota no início de {ERC20}.
     *
     * Requisitos:
     *
     * - `sender` e `recipient` não podem ser o endereço zero.
     * - `sender` deve ter um saldo de pelo menos `amount`.
     * - o chamador deve ter permissão para os tokens de ``sender`` de pelo menos
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

A chamada da função `a.sub(b, "mensagem")` faz duas coisas. Primeiro, calcula `a-b`, que é a nova permissão.
Segundo, verifica se esse resultado não é negativo. Se for negativo, a chamada reverte com a mensagem fornecida. Observe que, quando uma chamada reverte, qualquer processamento feito anteriormente durante essa chamada é ignorado, então não precisamos
desfazer a `_transfer`.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### Adições de segurança da OpenZeppelin {#openzeppelin-safety-additions}

É perigoso definir uma permissão diferente de zero para outro valor diferente de zero,
porque você só controla a ordem de suas próprias transações, não a de mais ninguém. Imagine que você
tenha dois usuários, Alice, que é ingênua, e Bill, que é desonesto. Alice quer algum serviço de
Bill, que ela acha que custa cinco tokens — então ela dá a Bill uma permissão de cinco tokens.

Então algo muda e o preço de Bill sobe para dez tokens. Alice, que ainda quer o serviço,
envia uma transação que define a permissão de Bill para dez. No momento em que Bill vê essa nova transação
no pool de transações, ele envia uma transação que gasta os cinco tokens de Alice e tem um
preço de gás muito mais alto para que seja minerado mais rápido. Dessa forma, Bill pode gastar primeiro cinco tokens e, em seguida,
uma vez que a nova permissão de Alice seja minerada, gastar mais dez por um preço total de quinze tokens, mais do que
Alice pretendia autorizar. Essa técnica é chamada de
[front-running](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)

| Transação de Alice                   | Nonce de Alice | Transação de Bill                                | Nonce de Bill          | Permissão de Bill | Renda Total de Bill vinda de Alice |
| ------------------------------------ | -------------- | ------------------------------------------------ | ---------------------- | ----------------- | ---------------------------------- |
| approve(Bill, 5)  | 10             |                                                  |                        | 5                 | 0                                  |
|                                      |                | transferFrom(Alice, Bill, 5)  | 10.123 | 0                 | 5                                  |
| approve(Bill, 10) | 11             |                                                  |                        | 10                | 5                                  |
|                                      |                | transferFrom(Alice, Bill, 10) | 10.124 | 0                 | 15                                 |

Para evitar esse problema, essas duas funções (`increaseAllowance` e `decreaseAllowance`) permitem que você
modifique a permissão por um valor específico. Então, se Bill já gastou cinco tokens, ele só
conseguirá gastar mais cinco. Dependendo do tempo, existem duas maneiras de isso funcionar, ambas
terminando com Bill recebendo apenas dez tokens:

A:

| Transação de Alice                            | Nonce de Alice | Transação de Bill                               |          Nonce de Bill | Permissão de Bill | Renda Total de Bill vinda de Alice |
| --------------------------------------------- | -------------: | ----------------------------------------------- | ---------------------: | ----------------: | ---------------------------------- |
| approve(Bill, 5)           |             10 |                                                 |                        |                 5 | 0                                  |
|                                               |                | transferFrom(Alice, Bill, 5) | 10.123 |                 0 | 5                                  |
| increaseAllowance(Bill, 5) |             11 |                                                 |                        |           0+5 = 5 | 5                                  |
|                                               |                | transferFrom(Alice, Bill, 5) | 10.124 |                 0 | 10                                 |

B:

| Transação de Alice                            | Nonce de Alice | Transação de Bill                                |          Nonce de Bill | Permissão de Bill | Renda Total de Bill vinda de Alice |
| --------------------------------------------- | -------------: | ------------------------------------------------ | ---------------------: | ----------------: | ---------------------------------: |
| approve(Bill, 5)           |             10 |                                                  |                        |                 5 |                                  0 |
| increaseAllowance(Bill, 5) |             11 |                                                  |                        |          5+5 = 10 |                                  0 |
|                                               |                | transferFrom(Alice, Bill, 10) | 10.124 |                 0 |                                 10 |

```solidity
    /**
     * @dev Aumenta atomicamente a permissão concedida ao `spender` pelo chamador.
     *
     * Esta é uma alternativa para {approve} que pode ser usada como uma mitigação para
     * os problemas descritos em {IERC20-approve}.
     *
     * Emite um evento {Approval} indicando a permissão atualizada.
     *
     * Requisitos:
     *
     * - `spender` não pode ser o endereço zero.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

A função `a.add(b)` é uma adição segura. No caso improvável de `a`+`b`>=`2^256`, ele não dá a volta
como a adição normal faz.

```solidity

    /**
     * @dev Diminui atomicamente a permissão concedida ao `spender` pelo chamador.
     *
     * Esta é uma alternativa para {approve} que pode ser usada como uma mitigação para
     * os problemas descritos em {IERC20-approve}.
     *
     * Emite um evento {Approval} indicando a permissão atualizada.
     *
     * Requisitos:
     *
     * - `spender` não pode ser o endereço zero.
     * - `spender` deve ter uma permissão para o chamador de pelo menos
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### Funções que modificam as informações do token {#functions-that-modify-token-information}

Estas são as quatro funções que fazem o trabalho real: `_transfer`, `_mint`, `_burn` e `_approve`.

#### A função _transfer {#_transfer}

```solidity
    /**
     * @dev Move `amount` de tokens de `sender` para `recipient`.
     *
     * Esta função interna é equivalente a {transfer} e pode ser usada para
     * implementar, por exemplo, taxas automáticas de tokens, mecanismos de slashing, etc.
     *
     * Emite um evento {Transfer}.
     *
     * Requisitos:
     *
     * - `sender` não pode ser o endereço zero.
     * - `recipient` não pode ser o endereço zero.
     * - `sender` deve ter um saldo de pelo menos `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Esta função, `_transfer`, transfere tokens de uma conta para outra. Ela é chamada tanto por
`transfer` (para transferências da própria conta do remetente) quanto por `transferFrom` (para usar permissões
para transferir da conta de outra pessoa).

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

Ninguém realmente possui o endereço zero no Ethereum (ou seja, ninguém conhece uma chave privada cuja chave pública correspondente
seja transformada no endereço zero). Quando as pessoas usam esse endereço, geralmente é um bug de software — então,
falhamos se o endereço zero for usado como remetente ou destinatário.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Existem duas maneiras de usar esse contrato:

1. Use-o como um modelo para o seu próprio código
2. [Herdar dele](https://www.bitdegree.org/learn/solidity-inheritance), e substituir apenas as funções que você precisa modificar

O segundo método é muito melhor porque o código ERC-20 da OpenZeppelin já foi auditado e demonstrou ser seguro. Quando você usa herança,
fica claro quais são as funções que você modifica, e para confiar em seu contrato, as pessoas só precisam auditar essas funções específicas.

Muitas vezes, é útil executar uma função cada vez que os tokens trocam de mãos. No entanto, `_transfer` é uma função muito importante e é
possível escrevê-la de forma insegura (veja abaixo), então é melhor não substituí-la. A solução é `_beforeTokenTransfer`, uma
[função de gancho (hook)](https://wikipedia.org/wiki/Hooking). Você pode substituir essa função e ela será chamada em cada transferência.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

Estas são as linhas que realmente fazem a transferência. Note que não há **nada** entre elas, e que subtraímos
o valor transferido do remetente antes de adicioná-lo ao destinatário. Isso é importante porque, se houvesse uma
chamada para um contrato diferente no meio, isso poderia ter sido usado para enganar este contrato. Desta forma, a transferência
é atômica, nada pode acontecer no meio dela.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Finalmente, emita um evento `Transfer`. Eventos não são acessíveis a contratos inteligentes, mas o código executado fora da blockchain
pode ouvir eventos e reagir a eles. Por exemplo, uma carteira pode acompanhar quando o proprietário recebe mais tokens.

#### As funções _mint e _burn {#_mint-and-_burn}

Essas duas funções (`_mint` e `_burn`) modificam o fornecimento total de tokens.
Elas são internas e não há nenhuma função que as chame neste contrato,
então elas só são úteis se você herdar do contrato e adicionar sua própria
lógica para decidir sob quais condições criar (mint) novos tokens ou queimar (burn) os existentes.

**NOTA:** todo token ERC-20 tem sua própria lógica de negócios que dita o gerenciamento de tokens.
Por exemplo, um contrato de fornecimento fixo pode chamar `_mint` apenas
no construtor e nunca chamar `_burn`. Um contrato que vende tokens
chamará `_mint` quando for pago e, presumivelmente, chamará `_burn` em algum momento
para evitar uma inflação descontrolada.

```solidity
    /** @dev Cria `amount` de tokens e os atribui a `account`, aumentando
     * o fornecimento total.
     *
     * Emite um evento {Transfer} com `from` definido para o endereço zero.
     *
     * Requisitos:
     *
     * - `to` não pode ser o endereço zero.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Certifique-se de atualizar `_totalSupply` quando o número total de tokens mudar.

&nbsp;

```solidity
    /**
     * @dev Destrói `amount` de tokens da `account`, reduzindo o
     * fornecimento total.
     *
     * Emite um evento {Transfer} com `to` definido para o endereço zero.
     *
     * Requisitos:
     *
     * - `account` não pode ser o endereço zero.
     * - `account` deve ter pelo menos `amount` de tokens.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

A função `_burn` é quase idêntica a `_mint`, exceto que vai na outra direção.

#### A função _approve {#_approve}

Esta é a função que realmente especifica as permissões. Observe que ela permite que um proprietário especifique
uma permissão que é maior que o saldo atual do proprietário. Isso não é um problema, porque o saldo é
verificado no momento da transferência, quando poderia ser diferente do saldo quando a permissão foi
criada.

```solidity
    /**
     * @dev Define `amount` como a permissão de `spender` sobre os tokens do `owner`.
     *
     * Essa função interna é equivalente a `approve` e pode ser usada para
     * por exemplo, definir permissões automáticas para certos subsistemas, etc.
     *
     * Emite um evento {Approval}.
     *
     * Requisitos:
     *
     * - `owner` não pode ser o endereço zero.
     * - `spender` não pode ser o endereço zero.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

Emita um evento `Approval`. Dependendo de como o aplicativo é escrito, o contrato do gastador pode ser informado sobre a
aprovação pelo proprietário ou por um servidor que escuta esses eventos.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Modificar a variável Decimals {#modify-the-decimals-variable}

```solidity


    /**
     * @dev Define {decimals} para um valor diferente do padrão de 18.
     *
     * AVISO: Esta função só deve ser chamada a partir do construtor. A maioria dos
     * aplicativos que interagem com contratos de token não esperam que
     * {decimals} mude, e podem funcionar incorretamente se isso acontecer.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Esta função modifica a variável `_decimals`, que é usada para dizer às interfaces de usuário como interpretar o valor.
Você deve chamá-la a partir do construtor. Seria desonesto chamá-la em qualquer ponto subsequente, e os aplicativos
não são projetados para lidar com isso.

### Ganchos {#hooks}

```solidity

    /**
     * @dev Gancho (hook) que é chamado antes de qualquer transferência de tokens. Isso inclui
     * criação (minting) e queima (burning).
     *
     * Condições de chamada:
     *
     * - quando `from` e `to` são ambos diferentes de zero, `amount` dos tokens de `from`
     * serão transferidos para `to`.
     * - quando `from` é zero, `amount` de tokens serão criados (minted) para `to`.
     * - quando `to` é zero, `amount` dos tokens de `from` serão queimados (burned).
     * - `from` e `to` nunca são ambos zero.
     *
     * Para saber mais sobre ganchos (hooks), acesse xref:ROOT:extending-contracts.adoc#using-hooks[Usando Ganchos (Hooks)].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Esta é a função de gancho (hook) a ser chamada durante as transferências. Está vazia aqui, mas se você precisar
que ela faça algo, basta substituí-la.

## Conclusão {#conclusion}

Para revisar, aqui estão algumas das ideias mais importantes neste contrato (na minha opinião, a sua provavelmente irá variar):

- _Não há segredos na blockchain_. Qualquer informação que um contrato inteligente possa acessar
  está disponível para o mundo todo.
- Você pode controlar a ordem de suas próprias transações, mas não quando as transações de outras pessoas
  acontecem. Esta é a razão pela qual alterar uma permissão pode ser perigoso, porque permite
  que o gastador gaste a soma de ambas as permissões.
- Valores do tipo `uint256` dão a volta (wrap around). Em outras palavras, _0-1=2^256-1_. Se esse não for o comportamento
  desejado, você deve verificá-lo (ou usar a biblioteca SafeMath que faz isso por você). Observe que isso mudou no
  [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html).
- Faça todas as mudanças de estado de um tipo específico em um local específico, porque isso facilita a auditoria.
  Esta é a razão pela qual temos, por exemplo, `_approve`, que é chamado por `approve`, `transferFrom`,
  `increaseAllowance` e `decreaseAllowance`
- As mudanças de estado devem ser atômicas, sem qualquer outra ação no meio delas (como você pode ver
  em `_transfer`). Isso ocorre porque, durante a mudança de estado, você tem um estado inconsistente. Por exemplo,
  entre o momento em que você deduz do saldo do remetente e o momento em que adiciona ao saldo do
  destinatário, existem menos tokens em existência do que deveria haver. Isso poderia ser potencialmente explorado se houver
  operações entre eles, especialmente chamadas para um contrato diferente.

Agora que você viu como o contrato ERC-20 da OpenZeppelin é escrito, e especialmente como ele é
tornado mais seguro, vá e escreva seus próprios contratos e aplicativos seguros.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).
