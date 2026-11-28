---
title: "ERC-20 com barreiras de proteção"
description: Como ajudar as pessoas a evitar erros bobos
author: Ori Pomerantz
lang: pt-br
tags: ["erc-20"]
skill: beginner
breadcrumb: "Segurança de ERC-20"
published: 2022-08-15
---

## Introdução {#introduction}

Uma das grandes coisas sobre o Ethereum é que não há autoridade central que possa modificar ou desfazer suas transações. Um dos grandes problemas com o Ethereum é que não há autoridade central com o poder de desfazer erros de usuários ou transações ilícitas. Neste artigo, você aprenderá sobre alguns dos erros comuns que os usuários cometem com tokens [ERC-20](/developers/docs/standards/tokens/erc-20/), bem como a criar contratos ERC-20 que ajudam os usuários a evitar esses erros, ou que dão a uma autoridade central algum poder (por exemplo, para congelar contas).

Observe que, embora usemos o [contrato de token ERC-20 da OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), este artigo não o explica em grandes detalhes. Você pode encontrar essas informações [aqui](/developers/tutorials/erc20-annotated-code).

Se você quiser ver o código-fonte completo:

1. Abra a [Remix IDE](https://remix.ethereum.org/).
2. Clique no ícone de clonar do GitHub (![ícone de clonar do GitHub](icon-clone.png)).
3. Clone o repositório do GitHub `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Abra **contracts > erc20-safety-rails.sol**.

Observe que o repositório foi escrito para a OpenZeppelin Contracts 4.7.2, onde a função que este artigo substitui é chamada `_beforeTokenTransfer`. Este artigo usa a atual OpenZeppelin Contracts 5.x, onde você substitui `_update` em vez disso, então o código neste artigo difere ligeiramente do código no repositório.

## Criando um contrato ERC-20 {#creating-an-erc-20-contract}

Antes de podermos adicionar a funcionalidade de barreira de proteção, precisamos de um contrato ERC-20. Neste artigo, usaremos [o OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/5.x/wizard). Abra-o em outro navegador e siga estas instruções:

1. Selecione **ERC20**.
2. Insira estas configurações:

   | Parâmetro      | Valor                     |
   | -------------- | ------------------------- |
   | Name           | SafetyRailsToken          |
   | Symbol         | SAFE                      |
   | Premint        | 1000                      |
   | Features       | None (desmarque **Permit**) |
   | Access Control | Ownable                   |
   | Upgradability  | None                      |

3. Role para cima e clique em **Open in Remix** (para o Remix) ou **Download** para usar um ambiente diferente. Vou presumir que você está usando o Remix, se você usar outra coisa, basta fazer as alterações apropriadas.
4. Agora temos um contrato ERC-20 totalmente funcional. Você pode expandir `.deps` > `npm` para ver o código importado.
5. Compile, implante e brinque com o contrato para ver que ele funciona como um contrato ERC-20. Se você precisar aprender a usar o Remix, [use este tutorial](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Erros comuns {#common-mistakes}

### Os erros {#the-mistakes}

Às vezes, os usuários enviam tokens para o endereço errado. Embora não possamos ler suas mentes para saber o que eles queriam fazer, existem dois tipos de erros que acontecem muito e são fáceis de detectar:

1. Enviar os tokens para o próprio endereço do contrato. Por exemplo, o [token OP da Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) conseguiu acumular [mais de 120.000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) tokens OP em menos de dois meses. Isso representa uma quantidade significativa de riqueza que presumivelmente as pessoas simplesmente perderam.

2. Enviar os tokens para um endereço vazio, um que não corresponde a uma [conta de propriedade externa (EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) ou a um [contrato inteligente](/developers/docs/smart-contracts). Embora eu não tenha estatísticas sobre a frequência com que isso acontece, [um incidente poderia ter custado 20.000.000 de tokens](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Prevenindo transferências {#preventing-transfers}

No contrato ERC-20 da OpenZeppelin, cada alteração nos saldos, seja uma transferência, uma cunhagem ou uma queima, passa por [uma função interna, `_update`](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20-_update-address-address-uint256-). Podemos substituí-la para anexar nossa própria funcionalidade a ela, como verificações que revertem se houver um problema.

Para fazer isso, adicione esta função após o construtor:

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        super._update(from, to, value);
    }
```

Algumas partes desta função podem ser novas se você não estiver muito familiarizado com a Solidity:

```solidity
        internal virtual
```

A palavra-chave `virtual` significa que, assim como herdamos a funcionalidade de `ERC20` e substituímos esta função, outros contratos podem herdar de nós e substituir esta função.

```solidity
        override(ERC20)
```

Temos que especificar explicitamente que estamos [substituindo](https://docs.soliditylang.org/en/latest/contracts.html#function-overriding) a definição do token ERC20 de `_update`. Em geral, definições explícitas são muito melhores, do ponto de vista da segurança, do que as implícitas - você não pode esquecer que fez algo se estiver bem na sua frente. Essa também é a razão pela qual precisamos especificar qual `_update` da superclasse estamos substituindo.

```solidity
        super._update(from, to, value);
```

Esta linha chama a função `_update` do contrato ou contratos dos quais herdamos que a possuem. Neste caso, é apenas `ERC20`, `Ownable` não tem esta função. Ao contrário de um gancho vazio, `ERC20._update` é o que realmente move os tokens, por isso é essencial chamá-lo. Nossas verificações vêm antes desta chamada, para que possam reverter antes de quaisquer alterações de saldo.

### Codificando os requisitos {#coding-the-requirements}

Queremos adicionar esses requisitos à função. Como `_update` também é chamado quando os tokens são queimados, com `to` definido como `address(0)`, só verificamos `to` quando não for `address(0)`:

- O endereço `to` não pode ser igual a `address(this)`, o endereço do próprio contrato ERC-20.
- O endereço `to` não pode estar vazio, ele deve ser:
  - Uma conta de propriedade externa (EOA). Não podemos verificar se um endereço é uma EOA diretamente, mas podemos verificar o saldo de ETH de um endereço. As EOAs quase sempre têm um saldo, mesmo que não sejam mais usadas - é difícil limpá-las até o último Wei.
  - Um contrato inteligente. Testar se um endereço é um contrato inteligente é um pouco mais difícil. Existe um código de operação que verifica o comprimento do código externo, chamado [`EXTCODESIZE`](https://www.evm.codes/#3b). Na Solidity, você pode obtê-lo com [`<address>.code.length`](https://docs.soliditylang.org/en/latest/units-and-global-variables.html#members-of-address-types), que o compilador transforma em `EXTCODESIZE`. Aqui usamos [Yul](https://docs.soliditylang.org/en/latest/yul.html), que é o assembly da EVM, para mostrar como chamar o código de operação diretamente. Observe que, desde a [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702), uma EOA também pode ter código (uma delegação para um contrato), portanto, essa verificação identifica contas com código, não estritamente contratos. Para o nosso propósito, rejeitar endereços vazios, isso é bom.

Aqui está a função completa:

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        // A queima envia tokens para o endereço(0), não bloqueie
        if (to != address(0)) {
            require(to != address(this), "Can't send tokens to the contract address");

            bool isToContract;
            assembly {
               isToContract := gt(extcodesize(to), 0)
            }

            require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
        }

        super._update(from, to, value);
    }
```

Vamos analisar o novo código linha por linha:

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

Este é o primeiro requisito, verificar se `to` e `this(address)` não são a mesma coisa.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

É assim que verificamos se um endereço é um contrato. Não podemos receber a saída diretamente do Yul, então, em vez disso, definimos uma variável para armazenar o resultado (`isToContract` neste caso). A maneira como o Yul funciona é que cada código de operação é considerado uma função. Então, primeiro chamamos [`EXTCODESIZE`](https://www.evm.codes/#3b) para obter o tamanho do contrato e, em seguida, usamos [`GT`](https://www.evm.codes/#11) para verificar se não é zero (estamos lidando com números inteiros sem sinal, então, é claro, não pode ser negativo). Em seguida, escrevemos o resultado em `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

E, finalmente, temos a verificação real para endereços vazios.

## Acesso administrativo {#admin-access}

Às vezes, é útil ter um administrador que possa desfazer erros. Para reduzir o potencial de abuso, esse administrador pode ser uma [multisig](https://blog.logrocket.com/security-choices-multi-signature-wallets/) para que várias pessoas tenham que concordar com uma ação. Neste artigo, teremos dois recursos administrativos:

1. Congelar e descongelar contas. Isso pode ser útil, por exemplo, quando uma conta pode estar comprometida.
2. Limpeza de ativos.

   Às vezes, fraudadores enviam tokens fraudulentos para o contrato do token real para ganhar legitimidade. Por exemplo, [veja aqui](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). O contrato ERC-20 legítimo é [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). O golpe que finge ser ele é [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   Também é possível que as pessoas enviem tokens ERC-20 legítimos para o nosso contrato por engano, o que é outro motivo para querer ter uma maneira de retirá-los.

A OpenZeppelin fornece dois mecanismos para habilitar o acesso administrativo:

- Os contratos [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) têm um único proprietário. As funções que têm o [modificador](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) `onlyOwner` só podem ser chamadas por esse proprietário. Os proprietários podem transferir a propriedade para outra pessoa ou renunciar a ela completamente. Os direitos de todas as outras contas são tipicamente idênticos.
- Os contratos [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) têm [controle de acesso baseado em função (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Por uma questão de simplicidade, neste artigo usamos `Ownable`.

### Congelando e descongelando contratos {#freezing-and-thawing-contracts}

Congelar e descongelar contratos requer várias alterações:

- Um [mapeamento](https://docs.soliditylang.org/en/latest/types.html#mapping-types) de endereços para [booleanos](https://en.wikipedia.org/wiki/Boolean_data_type) para acompanhar quais endereços estão congelados. Todos os valores são inicialmente zero, o que para valores booleanos é interpretado como falso. É isso que queremos porque, por padrão, as contas não estão congeladas.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [Eventos](https://docs.soliditylang.org/en/latest/contracts.html#events) para informar a qualquer pessoa interessada quando uma conta for congelada ou descongelada. Tecnicamente falando, os eventos não são necessários para essas ações, mas ajudam o código offchain a poder ouvir esses eventos e saber o que está acontecendo. É considerado de bom tom que um contrato inteligente os emita quando algo que possa ser relevante para outra pessoa acontecer.

  Os eventos são indexados para que seja possível pesquisar todas as vezes que uma conta foi congelada ou descongelada.

  ```solidity
    // Quando as contas são congeladas ou descongeladas
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Funções para congelar e descongelar contas. Essas duas funções são quase idênticas, então vamos analisar apenas a função de congelamento.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  As funções marcadas como [`public`](https://docs.soliditylang.org/en/latest/contracts.html#function-visibility) podem ser chamadas de outros contratos inteligentes ou diretamente por uma transação.

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  Se a conta já estiver congelada, reverta. Caso contrário, congele-a e emita (`emit`) um evento.

- Altere `_update` para evitar que o dinheiro seja movido de uma conta congelada. Observe que o dinheiro ainda pode ser transferido para a conta congelada. Coloque esta linha no início da função, fora do bloco `if`, para que também evite a queima de tokens de uma conta congelada.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### Limpeza de ativos {#asset-cleanup}

Para liberar os tokens ERC-20 mantidos por este contrato, precisamos chamar uma função no contrato de token ao qual eles pertencem, seja [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) ou [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). Não faz sentido desperdiçar gás neste caso com permissões, podemos muito bem transferir diretamente.

```solidity
    function cleanupERC20(
        address erc20,
        address dest
    )
        public
        onlyOwner
    {
        IERC20 token = IERC20(erc20);
```

Esta é a sintaxe para criar um objeto para um contrato quando recebemos o endereço. Para usá-lo, precisamos [da definição para IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), a interface para um contrato ERC-20 da OpenZeppelin. A linha `import {ERC20} from ...` do Wizard traz apenas `ERC20`, então adicione esta linha ao lado das outras importações no topo do arquivo:

```solidity
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Esta é uma função de limpeza, então presumivelmente não queremos deixar nenhum token. Em vez de obter o saldo do usuário manualmente, podemos muito bem automatizar o processo.

## Conclusão {#conclusion}

Esta não é uma solução perfeita - não há solução perfeita para o problema "o usuário cometeu um erro". No entanto, o uso desses tipos de verificações pode pelo menos evitar alguns erros. A capacidade de congelar contas, embora perigosa, pode ser usada para limitar os danos de certos ataques, negando ao hacker os fundos roubados.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).
