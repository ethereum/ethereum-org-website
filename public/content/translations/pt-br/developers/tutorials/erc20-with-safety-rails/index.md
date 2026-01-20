---
title: ERC-20 com Trilhos de Segurança
description: Como ajudar as pessoas a evitar erros bobos
author: |
  Ori Pomerantz
lang: pt-br
tags: [ "erc-20" ]
skill: beginner
published: 15-08-2022
---

## Introdução {#introduction}

Uma das grandes vantagens do Ethereum é que não existe uma autoridade central que possa modificar ou desfazer suas transações. Um dos maiores problemas do Ethereum é que não há autoridade central com o poder de desfazer erros de usuário ou transações ilícitas. Neste artigo, você aprenderá sobre alguns dos erros comuns que os usuários cometem com tokens [ERC-20](/developers/docs/standards/tokens/erc-20/), bem como a criar contratos ERC-20 que ajudam os usuários a evitar esses erros ou que dão a uma autoridade central algum poder (por exemplo, para congelar contas).

Observe que, embora usemos o [contrato de token ERC-20 da OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), este artigo não o explica em grandes detalhes. Você pode encontrar esta informação [aqui](/developers/tutorials/erc20-annotated-code).

Se você quiser ver o código-fonte completo:

1. Abra o [Remix IDE](https://remix.ethereum.org/).
2. Clique no ícone de clonagem do GitHub (![clone github icon](icon-clone.png)).
3. Clone o repositório do GitHub `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Abra **contracts > erc20-safety-rails.sol**.

## Criando um contrato ERC-20 {#creating-an-erc-20-contract}

Antes de podermos adicionar a funcionalidade de trilhos de segurança, precisamos de um contrato ERC-20. Neste artigo, usaremos o [Assistente de Contratos da OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/wizard). Abra-o em outro navegador e siga estas instruções:

1. Selecione **ERC20**.

2. Insira estas configurações:

   | Parâmetro                 | Valor            |
   | ------------------------- | ---------------- |
   | Nome                      | SafetyRailsToken |
   | Símbolo                   | SAFE             |
   | Pré-cunhagem              | 1000             |
   | Recursos                  | Nenhum           |
   | Controle de acesso        | Ownable          |
   | Capacidade de atualização | Nenhum           |

3. Role para cima e clique em **Abrir no Remix** (para o Remix) ou **Download** para usar um ambiente diferente. Vou presumir que você está usando o Remix. Se estiver usando algo diferente, faça as alterações apropriadas.

4. Agora, temos um contrato ERC-20 totalmente funcional. Você pode expandir `.deps` > `npm` para ver o código importado.

5. Compile, implante e interaja com o contrato para ver que ele funciona como um contrato ERC-20. Se precisar aprender a usar o Remix, [use este tutorial](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Erros comuns {#common-mistakes}

### Os erros {#the-mistakes}

Às vezes, os usuários enviam tokens para o endereço errado. Embora não possamos ler suas mentes para saber o que eles pretendiam fazer, existem dois tipos de erro que acontecem com frequência e são fáceis de detectar:

1. Enviar os tokens para o próprio endereço do contrato. Por exemplo, o [token OP da Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) conseguiu acumular [mais de 120.000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) tokens OP em menos de dois meses. Isso representa uma quantia significativa de riqueza que, presumivelmente, as pessoas simplesmente perderam.

2. Enviar os tokens para um endereço vazio, um que não corresponde a uma [conta de propriedade externa](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) ou a um [contrato inteligente](/developers/docs/smart-contracts). Embora eu não tenha estatísticas sobre a frequência com que isso acontece, [um incidente poderia ter custado 20.000.000 de tokens](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Impedindo transferências {#preventing-transfers}

O contrato ERC-20 da OpenZeppelin inclui [um hook, `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368), que é chamado antes da transferência de um token. Por padrão, este hook não faz nada, mas podemos vincular nossa própria funcionalidade a ele, como verificações que revertem a transação se houver um problema.

Para usar o hook, adicione esta função após o construtor:

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

A palavra-chave `virtual` significa que, assim como herdamos a funcionalidade do `ERC20` e substituímos essa função, outros contratos podem herdar de nós e substituir essa função.

```solidity
        override(ERC20)
```

Temos que especificar explicitamente que estamos [substituindo](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) a definição do token ERC20 de `_beforeTokenTransfer`. Em geral, definições explícitas são muito melhores, do ponto de vista da segurança, do que as implícitas — você não pode se esquecer de que fez algo se estiver bem na sua frente. Essa também é a razão pela qual precisamos especificar qual `_beforeTokenTransfer` da superclasse estamos substituindo.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

Esta linha chama a função `_beforeTokenTransfer` do contrato ou contratos dos quais herdamos que a possuem. Neste caso, é apenas o `ERC20`, o `Ownable` não tem este hook. Mesmo que atualmente o `ERC20._beforeTokenTransfer` não faça nada, nós o chamamos caso uma funcionalidade seja adicionada no futuro (e então decidirmos reimplantar o contrato, porque os contratos não mudam após a implantação).

### Codificando os requisitos {#coding-the-requirements}

Queremos adicionar estes requisitos à função:

- O endereço `to` não pode ser igual a `address(this)`, o endereço do próprio contrato ERC-20.
- O endereço `to` não pode ser vazio, tem que ser:
  - Uma conta de propriedade externa (EOA). Não podemos verificar diretamente se um endereço é uma EOA, mas podemos verificar o saldo em ETH de um endereço. As EOAs quase sempre têm um saldo, mesmo que não sejam mais usadas — é difícil limpá-las até o último wei.
  - Um contrato inteligente. Testar se um endereço é um contrato inteligente é um pouco mais difícil. Existe um opcode que verifica o tamanho do código externo, chamado [`EXTCODESIZE`](https://www.evm.codes/#3b), mas ele não está disponível diretamente no Solidity. Temos que usar o [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html), que é o assembly da EVM, para isso. Existem outros valores que poderíamos usar do Solidity ([`<address>.code` e `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)), mas eles custam mais.

Vamos analisar o novo código linha por linha:

```solidity
        require(to != address(this), "Não é possível enviar tokens para o endereço do contrato");
```

Este é o primeiro requisito, verificar que `to` e `this(address)` não são a mesma coisa.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

É assim que verificamos se um endereço é um contrato. Não podemos receber saídas diretamente do Yul, então, em vez disso, definimos uma variável para manter o resultado (`isToContract` neste caso). A maneira como o Yul funciona é que cada opcode é considerado uma função. Então, primeiro chamamos o [`EXTCODESIZE`](https://www.evm.codes/#3b) para obter o tamanho do contrato e, em seguida, usamos o [`GT`](https://www.evm.codes/#11) para verificar se não é zero (estamos lidando com inteiros sem sinal, então, claro, ele não pode ser negativo). Em seguida, escrevemos o resultado em `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Não é possível enviar tokens para um endereço vazio");
```

E, finalmente, temos a verificação real para endereços vazios.

## Acesso administrativo {#admin-access}

Às vezes, é útil ter um administrador que possa desfazer erros. Para reduzir o potencial de abuso, este administrador pode ser uma [multisig](https://blog.logrocket.com/security-choices-multi-signature-wallets/) para que várias pessoas tenham que concordar com uma ação. Neste artigo, teremos dois recursos administrativos:

1. Congelar e descongelar contas. Isso pode ser útil, por exemplo, quando uma conta pode ser comprometida.
2. Limpeza de ativos.

   Às vezes, fraudadores enviam tokens fraudulentos para o contrato do token real para ganhar legitimidade. Por exemplo, [veja aqui](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). O contrato ERC-20 legítimo é [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). O golpe que finge ser ele é [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   Também é possível que as pessoas enviem tokens ERC-20 legítimos para nosso contrato por engano, que é outra razão para querer ter uma maneira de retirá-los.

O OpenZeppelin fornece dois mecanismos para habilitar o acesso administrativo:

- Contratos [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) têm um único proprietário. Funções que têm o [modificador](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `onlyOwner` só podem ser chamadas por esse proprietário. Os proprietários podem transferir a propriedade para outra pessoa ou renunciá-la completamente. Os direitos de todas as outras contas são normalmente idênticos.
- Contratos [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) têm [controle de acesso baseado em função (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Por uma questão de simplicidade, neste artigo usamos o `Ownable`.

### Congelando e descongelando contratos {#freezing-and-thawing-contracts}

Congelar e descongelar contratos requer várias mudanças:

- Um [mapeamento](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) de endereços para [booleanos](https://en.wikipedia.org/wiki/Boolean_data_type) para rastrear quais endereços estão congelados. Todos os valores são inicialmente zero, o que para valores booleanos é interpretado como falso. É isso que queremos, porque, por padrão, as contas não são congeladas.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [Eventos](https://www.tutorialspoint.com/solidity/solidity_events.htm) para informar a qualquer pessoa interessada quando uma conta é congelada ou descongelada. Tecnicamente falando, eventos não são necessários para essas ações, mas ajuda o código off-chain a ser capaz de escutar esses eventos e saber o que está acontecendo. É considerado uma boa prática que um contrato inteligente os emita quando algo que possa ser relevante para outra pessoa acontecer.

  Os eventos são indexados, portanto, será possível pesquisar todas as vezes que uma conta foi congelada ou descongelada.

  ```solidity
    // Quando as contas são congeladas ou descongeladas
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Funções para congelar e descongelar contas. Essas duas funções são quase idênticas, então analisaremos apenas a função de congelamento.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  Funções marcadas como [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) podem ser chamadas de outros contratos inteligentes ou diretamente por uma transação.

  ```solidity
    {
        require(!frozenAccounts[addr], "Conta já congelada");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  Se a conta já estiver congelada, a transação será revertida. Caso contrário, congele-a e emita um evento com `emit`.

- Altere o `_beforeTokenTransfer` para impedir que o dinheiro seja movido de uma conta congelada. Observe que o dinheiro ainda pode ser transferido para a conta congelada.

  ```solidity
       require(!frozenAccounts[from], "A conta está congelada");
  ```

### Limpeza de ativos {#asset-cleanup}

Para liberar os tokens ERC-20 mantidos por este contrato, precisamos chamar uma função no contrato do token ao qual eles pertencem, seja [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) ou [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). Não faz sentido desperdiçar gás neste caso com aprovações; é melhor transferir diretamente.

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

Essa é a sintaxe para criar um objeto para um contrato quando recebemos o endereço. Podemos fazer isso porque temos a definição para tokens ERC-20 como parte do código-fonte (consulte a linha 4), e esse arquivo inclui [a definição para IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), a interface para um contrato ERC-20 da OpenZeppelin.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Esta é uma função de limpeza, portanto, presumivelmente não queremos deixar nenhum token. Em vez de obter o saldo do usuário manually, podemos também automatizar o processo.

## Conclusão {#conclusion}

Esta não é uma solução perfeita — não há solução perfeita para o problema do "usuário cometeu um erro". No entanto, o uso desses tipos de verificação pode, pelo menos, evitar alguns erros. A capacidade de congelar contas, embora perigosa, pode ser usada para limitar os danos de certos hacks, negando ao hacker os fundos roubados.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).
