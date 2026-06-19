---
title: ERC-20 com barreiras de proteção
description: Como ajudar as pessoas a evitar erros bobos
author: Ori Pomerantz
lang: pt-br
tags: ["erc-20"]
skill: beginner
breadcrumb: Segurança de ERC-20
published: 2022-08-15
---

## Introdução {#introduction}

Uma das grandes vantagens do Ethereum é que não há uma autoridade central que possa modificar ou desfazer suas transações. Um dos grandes problemas do Ethereum é que não há uma autoridade central com o poder de desfazer erros de usuários ou transações ilícitas. Neste artigo, você aprenderá sobre alguns dos erros comuns que os usuários cometem com tokens [ERC-20](/developers/docs/standards/tokens/erc-20/), bem como a criar contratos ERC-20 que ajudam os usuários a evitar esses erros, ou que dão a uma autoridade central algum poder (por exemplo, para congelar contas).

Observe que, embora usemos o [contrato de token ERC-20 da OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), este artigo não o explica em grandes detalhes. Você pode encontrar essas informações [aqui](/developers/tutorials/erc20-annotated-code).

Se você quiser ver o código-fonte completo:

1. Abra a [IDE Remix](https://remix.ethereum.org/).
2. Clique no ícone de clonar do GitHub (![clone github icon](icon-clone.png)).
3. Clone o repositório do GitHub `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Abra **contracts > erc20-safety-rails.sol**.

## Criando um contrato ERC-20 {#creating-an-erc-20-contract}

Antes de podermos adicionar a funcionalidade de barreira de proteção, precisamos de um contrato ERC-20. Neste artigo, usaremos [o Assistente de Contratos da OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/wizard). Abra-o em outro navegador e siga estas instruções:

1. Selecione **ERC20**.
2. Insira estas configurações:

   | Parâmetro              | Valor            |
   | ---------------------- | ---------------- |
   | Nome                   | SafetyRailsToken |
   | Símbolo                | SAFE             |
   | Pré-cunhagem           | 1000             |
   | Recursos               | Nenhum           |
   | Controle de Acesso     | Ownable          |
   | Capacidade de atualização | Nenhum           |

3. Role para cima e clique em **Open in Remix** (para o Remix) ou **Download** para usar um ambiente diferente. Vou presumir que você está usando o Remix; se usar outra coisa, basta fazer as alterações apropriadas.
4. Agora temos um contrato ERC-20 totalmente funcional. Você pode expandir `.deps` > `npm` para ver o código importado.
5. Compile, implante e brinque com o contrato para ver que ele funciona como um contrato ERC-20. Se você precisar aprender a usar o Remix, [use este tutorial](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Erros comuns {#common-mistakes}

### Os erros {#the-mistakes}

Às vezes, os usuários enviam tokens para o endereço errado. Embora não possamos ler suas mentes para saber o que eles queriam fazer, existem dois tipos de erros que acontecem muito e são fáceis de detectar:

1. Enviar os tokens para o próprio endereço do contrato. Por exemplo, o [token OP da Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) conseguiu acumular [mais de 120.000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) tokens OP em menos de dois meses. Isso representa uma quantidade significativa de riqueza que presumivelmente as pessoas simplesmente perderam.

2. Enviar os tokens para um endereço vazio, um que não corresponde a uma [conta de propriedade externa (EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) ou a um [contrato inteligente](/developers/docs/smart-contracts). Embora eu não tenha estatísticas sobre a frequência com que isso acontece, [um incidente poderia ter custado 20.000.000 de tokens](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Prevenindo transferências {#preventing-transfers}

O contrato ERC-20 da OpenZeppelin inclui [um gancho (hook), `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368), que é chamado antes que um token seja transferido. Por padrão, esse gancho não faz nada, mas podemos pendurar nossa própria funcionalidade nele, como verificações que revertem se houver um problema.

Para usar o gancho, adicione esta função após o construtor:

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
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

Temos que especificar explicitamente que estamos [substituindo (overriding)](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) a definição do token ERC20 de `_beforeTokenTransfer`. Em geral, definições explícitas são muito melhores, do ponto de vista da segurança, do que as implícitas - você não pode esquecer que fez algo se estiver bem na sua frente. Essa também é a razão pela qual precisamos especificar qual `_beforeTokenTransfer` da superclasse estamos substituindo.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

Esta linha chama a função `_beforeTokenTransfer` do contrato ou contratos dos quais herdamos que a possuem. Neste caso, é apenas `ERC20`, `Ownable` não tem esse gancho. Mesmo que atualmente `ERC20._beforeTokenTransfer` não faça nada, nós a chamamos caso alguma funcionalidade seja adicionada no futuro (e então decidamos reimplantar o contrato, porque os contratos não mudam após a implantação).

### Codificando os requisitos {#coding-the-requirements}

Queremos adicionar estes requisitos à função:

- O endereço `to` não pode ser igual a `address(this)`, o endereço do próprio contrato ERC-20.
- O endereço `to` não pode estar vazio, ele tem que ser:
  - Uma conta de propriedade externa (EOA). Não podemos verificar se um endereço é uma EOA diretamente, mas podemos verificar o saldo de ETH de um endereço. As EOAs quase sempre têm um saldo, mesmo que não sejam mais usadas - é difícil limpá-las até o último Wei.
  - Um contrato inteligente. Testar se um endereço é um contrato inteligente é um pouco mais difícil. Existe um código de operação que verifica o comprimento do código externo, chamado [`EXTCODESIZE`](https://www.evm.codes/#3b), mas não está disponível diretamente na Solidity. Temos que usar [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html), que é o assembly da EVM, para isso. Existem outros valores que poderíamos usar da Solidity ([`<address>.code` e `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)), mas eles custam mais gás.

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

É assim que verificamos se um endereço é um contrato. Não podemos receber a saída diretamente de Yul, então, em vez disso, definimos uma variável para armazenar o resultado (`isToContract` neste caso). A maneira como Yul funciona é que cada código de operação é considerado uma função. Então, primeiro chamamos [`EXTCODESIZE`](https://www.evm.codes/#3b) para obter o tamanho do contrato e, em seguida, usamos [`GT`](https://www.evm.codes/#11) para verificar se não é zero (estamos lidando com inteiros sem sinal, então, é claro, não pode ser negativo). Em seguida, escrevemos o resultado em `isToContract`.

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

- Os contratos [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) têm um único proprietário. As funções que têm o [modificador](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `onlyOwner` só podem ser chamadas por esse proprietário. Os proprietários podem transferir a propriedade para outra pessoa ou renunciar a ela completamente. Os direitos de todas as outras contas são tipicamente idênticos.
- Os contratos [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) têm [controle de acesso baseado em função (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Por uma questão de simplicidade, neste artigo usamos `Ownable`.

### Congelando e descongelando contratos {#freezing-and-thawing-contracts}

Congelar e descongelar contratos requer várias alterações:

- Um [mapeamento (mapping)](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) de endereços para [booleanos](https://en.wikipedia.org/wiki/Boolean_data_type) para acompanhar quais endereços estão congelados. Todos os valores são inicialmente zero, o que para valores booleanos é interpretado como falso. É isso que queremos porque, por padrão, as contas não estão congeladas.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [Eventos](https://www.tutorialspoint.com/solidity/solidity_events.htm) para informar a qualquer interessado quando uma conta é congelada ou descongelada. Tecnicamente falando, os eventos não são necessários para essas ações, mas ajudam o código offchain a ser capaz de ouvir esses eventos e saber o que está acontecendo. É considerado de bom tom que um contrato inteligente os emita quando algo que possa ser relevante para outra pessoa acontece.

  Os eventos são indexados, portanto, será possível pesquisar todas as vezes que uma conta foi congelada ou descongelada.

  ```solidity
    // Quando as contas são congeladas ou descongeladas
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Funções para congelar e descongelar contas. Essas duas funções são quase idênticas, então abordaremos apenas a função de congelamento.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  As funções marcadas como [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) podem ser chamadas de outros contratos inteligentes ou diretamente por uma transação.

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  Se a conta já estiver congelada, reverta. Caso contrário, congele-a e emita (`emit`) um evento.

- Altere `_beforeTokenTransfer` para evitar que o dinheiro seja movido de uma conta congelada. Observe que o dinheiro ainda pode ser transferido para a conta congelada.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### Limpeza de ativos {#asset-cleanup}

Para liberar os tokens ERC-20 mantidos por este contrato, precisamos chamar uma função no contrato do token ao qual eles pertencem, seja [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) ou [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). Não faz sentido desperdiçar gás neste caso com permissões (allowances), podemos muito bem transferir diretamente.

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

Esta é a sintaxe para criar um objeto para um contrato quando recebemos o endereço. Podemos fazer isso porque temos a definição para tokens ERC20 como parte do código-fonte (veja a linha 4), e esse arquivo inclui [a definição para IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), a interface para um contrato ERC-20 da OpenZeppelin.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Esta é uma função de limpeza, então presumivelmente não queremos deixar nenhum token. Em vez de obter o saldo do usuário manualmente, podemos muito bem automatizar o processo.

## Conclusão {#conclusion}

Esta não é uma solução perfeita - não há solução perfeita para o problema "o usuário cometeu um erro". No entanto, o uso desses tipos de verificações pode pelo menos evitar alguns erros. A capacidade de congelar contas, embora perigosa, pode ser usada para limitar os danos de certos ataques, negando ao hacker os fundos roubados.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).