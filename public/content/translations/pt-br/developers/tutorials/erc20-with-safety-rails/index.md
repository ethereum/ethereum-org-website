---
title: ERC-20 com Trilhos de Segurança
description: Como ajudar pessoas para evitar erros tolos
author: Ori Pomerantz
lang: pt-br
tags:
  - "erc-20"
skill: intermediate
published: 2022-08-15
---

## Introdução {#introduction}

Uma das melhores coisas sobre o Ethereum é que não há autoridade central que possa modificar ou desfazer transações. Um dos maiores problemas do Ethereum é que não há autoridade central com o poder de desfazer erros de usuário ou transações ilícitas. Neste artigo, você aprenderá sobre alguns dos erros comuns que usuários cometem com tokens [ERC-20](/developers/docs/standards/tokens/erc-20/), assim como criar contratos ERC-20 que ajudam usuários a evitar esses erros, ou que dão a uma autoridade central algum poder (por exemplo, congelar contas).

Observe que, apesar de usarmos o [contrato de token ERC-20 da OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), este artigo não o explica em maiores detalhes. Você pode encontrar esta informação [aqui](/developers/tutorials/erc20-annotated-code).

Se você quiser ver o código-fonte completo:

1. Abra o [Remix IDE](https://remix.ethereum.org/).
2. Clique o ícone de clonar o github (![clone github icon](icon-clone.png)).
3. Clone o repositório github `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Abra **contracts > erc20-safety-rails.sol**.

## Criando um contrato ERC-20 {#creating-an-erc-20-contract}

Antes que nós possamos adicionar funcionalidade de trilhos de segurança, nós precisamos de um contrato ERC-20. Neste artigo, usaremos o [o Assistente de contratos da OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/wizard). Abra-o em outro navegador e siga estas instruções:

1. Selecione **ERC20**.
2. Entre estas configurações:

   | Parâmetro                 | Valor            |
   | ------------------------- | ---------------- |
   | Nome                      | SafetyRailsToken |
   | Símbolo                   | SAFE             |
   | Pré-cunhagem              | 1.000            |
   | Recursos                  | Nenhum           |
   | Controle de acesso        | Proprietário     |
   | Capacidade de atualização | Nenhum           |

3. Suba e clique **Open in Remix** (para o Remix) ou **Download** para usar um ambiente diferente. Vou presumir que você está usando o Remix. Se você estiver usando algo diferente, faça as mudanças apropriadas.
4. Agora, temos um contrato ERC-20 totalmente funcional. Você pode expandir `.deps` e `npm` para ver o código importado.
5. Compile, implante e brinque com o contrato para ver se ele funciona como um contrato ERC-20. Se você precisar aprender como usar o Remix, [use este tutorial](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Erros comuns {#common-mistakes}

### Os erros {#the-mistakes}

Às vezes, os usuários enviam tokens para o endereço errado. Embora não consigamos ler a mente dos usuários para saber o que querem fazer, há dois tipos de erros que ocorrem muitas vezes e são fáceis de detectar:

1. Enviar os tokens para o próprio endereço do contrato. Por exemplo, [token Optimism's OP](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) acabou acumulando [mais de 120.000](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000042#tokentxns) tokens OP em menos de dois meses. Isso representa uma quantia de dinheiro significativa, que presumimos que as pessoas tenham simplesmente perdido.

2. Enviar os tokens para um endereço vazio, um que não corresponde a uma [conta de propriedade externa](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) ou um [contrato inteligente](/developers/docs/smart-contracts). Enquanto eu não tenho estatísticas de quão frequente isso acontece, [um incidente poderia ter custado 20.000.000 de tokens](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Evitando transferências {#preventing-transfers}

O contrato OpenZeppelin ERC-20 inclui [um hook, `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368), que é chamado antes de um token ser transferido. Por padrão, esse hook não faz nada, mas podemos pendurar nossas próprias funcionalidades, como verificações que são anuladas se houver um problema.

Para usar o hook, adicione esta função depois do construtor:

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Algumas partes desta função podem ser novas se você não estiver muito familiarizado com o Solidity:

```solidity
        internal virtual
```

A palavra-chave `virtual` significa que conforme herdamos funcionalidades do `ERC20` e substituímos essa função, outros contratos podem herdar de nós e substituir essa função.

```solidity
        override(ERC20)
```

Temos que especificar explicitamente que estamos [substituindo](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) a definição de token ERC20 de `_beforeTokenTransfer`. Em geral, definições explícitas são muito melhores, do ponto de vista da segurança, do que as implícitas — você não pode se esquecer de que fez algo se isso estive bem na sua frente. Esta também é a razão que nós precisamos para especificar que superclasses `_beforeTokenTransfer` nós estamos sobrepondo.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

Esta linha chama a função `_beforeTokenTransfer` do contrato ou contratos que herdamos e que a possui. Neste caso, isto é somente `ERC20`, `Ownable` não tem esse hook. Mesmo que, atualmente, o `ERC20._beforeTokenTransfer` não faça nada, nós o chamamos caso a funcionalidade seja adicionada no futuro (e nós então decidimos reimplantar o contrato, porque contratos não mudam depois da implantação).

### Codificando os requisitos {#coding-the-requirements}

Nós queremos adicionar estes requisitos para a função:

- O endereço `to` não pode ser igual a `address(this)`, o endereço do contrato ERC-20 propriamente dito.
- O endereço `to` não pode ser vazio, ele tem de ser:
  - Uma conta de propriedade externa (EOA). Nós não podemos checar se um endereço é um EOA diretamente, mas nós podemos checar o saldo em ETH de um endereço. EOAs quase sempre têm um saldo, mesmo que não estejam mais sendo usados — é difícil esvaziá-los até o último wei.
  - Um contrato inteligente. Testar se um endereço é um contrato inteligente é um pouco mais difícil. Há um opcode que checa o tamanho do código externo, chamado [`EXTCODESIZE`](https://www.evm.codes/#3b), mas ele não é disponível diretamente em Solidity. Para isso, temos que usar [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html), que é um assembly da EVM. Há outros valores do Solidity que poderíamos usar ([`<address>.code` e `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)), mas eles são mais caros.

Vamos passar sobre o código novo, linha a linha:

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

É assim que verificamos se um endereço é um contrato. Não podemos receber saídas diretamente do Yul, então, em vez disso, definimos uma variável para manter o resultado (`isToContract` neste caso). A maneira como o Yul trabalha é considerando cada opcode como uma função. Então, primeiro chamamos [`EXTCODESIZE`](https://www.evm.codes/#3b) para obter o tamanho do contrato e, em seguida, usamos [`GT`](https://www.evm.codes/#11) para verificar se não é zero (estamos lidando com inteiros sem sinal, então claro que ele não pode ser negativo). Então, escrevemos o resultado em `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

Por fim, temos a verificação real de endereços vazios.

## Acesso administrativo {#admin-access}

Algumas vezes é útil ter um administrador que pode desfazer erros. Para reduzir o potencial de abuso, esse administrador pode ser um [multisig](https://blog.logrocket.com/security-choices-multi-signature-wallets/) para que várias pessoas tenham que concordar com uma ação. Neste artigo, teremos dois recursos administrativos:

1. Congelar e descongelar contas. Isto pode ser útil, por exemplo, quando uma conta for comprometida.
2. Limpeza de ativos.

   Às vezes, fraudadores enviam tokens fraudulentos para o contrato do token real para ganhar legitimidade. Por exemplo, [veja aqui](https://optimistic.etherscan.io/token/0x2348b1a1228ddcd2db668c3d30207c3e1852fbbe?a=0x4200000000000000000000000000000000000042). O contrato ERC-20 legítimo é [0x4200....0042](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000042). A fraude que finge ser o contrato é [0x234....bbe](https://optimistic.etherscan.io/address/0x2348b1a1228ddcd2db668c3d30207c3e1852fbbe).

   Também é possível que pessoas enviem tokens ERC-20 legítimos para nosso contrato por erro, que é outra razão para querer ter uma maneira de tirá-los de lá.

OpenZeppelin fornece dois mecanismos para habilitar acesso administrativo:

- [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/access-control#ownership-and-ownable) contratos tem um único priprietário. Funções que tem o [modifier](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `onlyOwner` só podem ser chamadas por este proprietário. Os proprietários podem transferir a propriedade para outra pessoa ou renunciar a ela completamente. Os direitos de todas as outras contas são geralmente idênticas.
- Os contratos [`AccessControl`](https://docs.openzeppelin.com/contracts/4.x/access-control#role-based-access-control) têm [controle de acesso baseado em função (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Por simplicidade, neste artigo usamos `Ownable`.

### Congelando e descongelando contratos {#freezing-and-thawing-contracts}

Congelar e descongelar contratos requer várias mudanças:

- Um [mapeamento](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) de endereços em [booleanos](https://en.wikipedia.org/wiki/Boolean_data_type) para manter o controle de quais endereços estão congelados. Todos os valores são inicialmente zero, o que, para valores booleanos, é interpretado como falso. Isto é o que queremos porque, por padrão, as contas não são congeladas.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [Eventos](https://www.tutorialspoint.com/solidity/solidity_events.htm) para informar qualquer pessoa interessada, quando uma conta é congelada ou descongelada. Tecnicamente falando, os eventos não são necessários para essas ações, mas ajuda o código fora da cadeia a ser capaz de ouvir esses eventos e saber o que está acontecendo. É considerado uma boa conduta para um contrato inteligente emiti-los quando acontece algo que pode ser relevante para outra pessoa.

  Os eventos são indexados, então, será possível pesquisar todas as vezes que uma conta foi congelada ou descongelada.

  ```solidity
    // When accounts are frozen or unfrozen
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Funções para congelar e descongelar contas. Essas duas funções são praticamente idênticas, por isso, analisaremos apenas a função de congelamento.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  As funções marcadas como [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) podem ser chamadas a partir de outros contratos inteligentes ou diretamente por uma transação.

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  Se a conta já estiver congelada, reverta-a. Caso contrário, congele-a e envie um evento `emit`.

- Mude o `_beforeTokenTransfer` para evitar que o dinheiro seja movido de uma conta congelada. Note que o dinheiro ainda pode ser transferido para a conta congelada.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### Limpeza de ativos {#asset-cleanup}

Para liberar os tokens ERC-20 mantidos por este contrato, precisamos chamar uma função no contrato do token ao qual eles fazem parte, [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) ou [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). Nesse caso, não faz sentido desperdiçar gás em provisões. Vale mais a pena transferir diretamente.

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

Essa é a sintaxe para criar um objeto para um contrato quando recebemos o endereço. Podemos fazer isso porque temos a definição de tokens ERC20 como parte do código-fonte (veja a linha 4) e esse arquivo inclui [a definição para IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), a interface para um contrato OpenZeppelin ERC-20.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Esta é uma função de limpeza, portanto, provavelmente não queremos deixar nenhum token. Em vez de obter o saldo do usuário manualmente, podemos também automatizar o processo.

## Conclusão {#conclusion}

Esta não é uma solução perfeita — não há solução perfeita para o problema do “usuário que cometeu um erro”. No entanto, usar esses tipos de verificações pode, pelo menos, evitar alguns erros. A capacidade de congelar contas, embora seja perigosa, pode ser usada para limitar os danos de certos ataques ao negar ao hacker os fundos roubados.
