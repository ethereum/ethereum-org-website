---
title: Introdução aos contratos inteligentes
description: Uma visão geral dos contratos inteligentes, com foco em suas características e limitações únicas.
lang: pt-br
---

## O que é um contrato inteligente? {#what-is-a-smart-contract}

Um "contrato inteligente" é simplesmente um programa que é executado na blockchain do [Ethereum](/). É uma coleção de código (suas funções) e dados (seu estado) que reside em um endereço específico na blockchain do Ethereum.

Os contratos inteligentes são um tipo de [conta Ethereum](/developers/docs/accounts/). Isso significa que eles têm um saldo e podem ser o alvo de transações. No entanto, eles não são controlados por um usuário; em vez disso, são implantados na rede e executados conforme programado. As contas de usuário podem então interagir com um contrato inteligente enviando transações que executam uma função definida no contrato inteligente. Os contratos inteligentes podem definir regras, como um contrato regular, e aplicá-las automaticamente por meio do código. Os contratos inteligentes não podem ser excluídos por padrão, e as interações com eles são irreversíveis.

## Pré-requisitos {#prerequisites}

Se você está apenas começando ou procurando uma introdução menos técnica, recomendamos nossa [introdução aos contratos inteligentes](/smart-contracts/).

Certifique-se de ter lido sobre [contas](/developers/docs/accounts/), [transações](/developers/docs/transactions/) e a [máquina virtual do Ethereum](/developers/docs/evm/) antes de mergulhar no mundo dos contratos inteligentes.

## Uma máquina de venda automática digital {#a-digital-vending-machine}

Talvez a melhor metáfora para um contrato inteligente seja uma máquina de venda automática, conforme descrito por [Nick Szabo](https://unenumerated.blogspot.com/). Com as entradas corretas, uma determinada saída é garantida.

Para pegar um lanche em uma máquina de venda automática:

```
dinheiro + seleção do lanche = lanche dispensado
```

Essa lógica é programada na máquina de venda automática.

Um contrato inteligente, assim como uma máquina de venda automática, tem uma lógica programada nele. Aqui está um exemplo simples de como essa máquina de venda automática seria se fosse um contrato inteligente escrito em Solidity:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Declarar as variáveis de estado do contrato
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Quando o contrato 'VendingMachine' é implantado:
    // 1. definir o endereço de implantação como o proprietário do contrato
    // 2. definir o saldo de cupcakes do contrato inteligente implantado como 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Permitir que o proprietário aumente o saldo de cupcakes do contrato inteligente
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Permitir que qualquer pessoa compre cupcakes
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Assim como uma máquina de venda automática elimina a necessidade de um funcionário vendedor, os contratos inteligentes podem substituir intermediários em muitos setores.

## Não permissionado {#permissionless}

Qualquer pessoa pode escrever um contrato inteligente e implantá-lo na rede. Você só precisa aprender a programar em uma [linguagem de contrato inteligente](/developers/docs/smart-contracts/languages/) e ter ETH suficiente para implantar seu contrato. Implantar um contrato inteligente é tecnicamente uma transação, então você precisa pagar [gás](/developers/docs/gas/) da mesma forma que precisa pagar gás por uma simples transferência de ETH. No entanto, os custos de gás para a implantação de contratos são muito mais altos.

O Ethereum possui linguagens amigáveis para desenvolvedores para escrever contratos inteligentes:

- Solidity
- Vyper

[Mais sobre linguagens](/developers/docs/smart-contracts/languages/)

No entanto, eles devem ser compilados antes de poderem ser implantados para que a máquina virtual do Ethereum possa interpretar e armazenar o contrato. [Mais sobre compilação](/developers/docs/smart-contracts/compiling/)

## Composabilidade {#composability}

Os contratos inteligentes são públicos no Ethereum e podem ser considerados como APIs abertas. Isso significa que você pode chamar outros contratos inteligentes em seu próprio contrato inteligente para expandir muito o que é possível. Os contratos podem até mesmo implantar outros contratos.

Saiba mais sobre a [composabilidade de contratos inteligentes](/developers/docs/smart-contracts/composability/).

## Limitações {#limitations}

Os contratos inteligentes sozinhos não podem obter informações sobre eventos do "mundo real" porque não podem recuperar dados de fontes offchain. Isso significa que eles não podem responder a eventos no mundo real. Isso é intencional. Depender de informações externas poderia prejudicar o consenso, o que é importante para a segurança e a descentralização.

No entanto, é importante que os aplicativos de blockchain possam usar dados offchain. A solução são os [oráculos](/developers/docs/oracles/), que são ferramentas que ingerem dados offchain e os disponibilizam para os contratos inteligentes.

Outra limitação dos contratos inteligentes é o tamanho máximo do contrato. Um contrato inteligente pode ter no máximo 24 KB ou ficará sem gás. Isso pode ser contornado usando [o Padrão Diamante](https://eips.ethereum.org/EIPS/eip-2535).

## Contratos multisig {#multisig}

Os contratos multisig (assinatura múltipla) são contas de contratos inteligentes que exigem várias assinaturas válidas para executar uma transação. Isso é muito útil para evitar pontos únicos de falha em contratos que mantêm quantias substanciais de ether ou outros tokens. As multisigs também dividem a responsabilidade pela execução do contrato e pelo gerenciamento de chaves entre várias partes e evitam que a perda de uma única chave privada leve à perda irreversível de fundos. Por esses motivos, os contratos multisig podem ser usados para a governança simples de uma DAO. As multisigs exigem N assinaturas de M assinaturas aceitáveis possíveis (onde N ≤ M e M > 1) para serem executadas. `N = 3, M = 5` e `N = 4, M = 7` são comumente usados. Uma multisig 4/7 exige quatro de sete assinaturas válidas possíveis. Isso significa que os fundos ainda podem ser recuperados mesmo se três assinaturas forem perdidas. Nesse caso, também significa que a maioria dos detentores de chaves deve concordar e assinar para que o contrato seja executado.

## Recursos de contratos inteligentes {#smart-contract-resources}

**Contratos OpenZeppelin -** **_Biblioteca para o desenvolvimento seguro de contratos inteligentes._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Fórum da comunidade](https://forum.openzeppelin.com/c/general/16)

## Leitura adicional {#further-reading}

- [Coinbase: O que é um contrato inteligente?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: O que é um contrato inteligente?](https://chain.link/education/smart-contracts)
- [Vídeo: Explicado de forma simples - Contratos inteligentes](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: Plataforma de aprendizado e auditoria Web3](https://updraft.cyfrin.io)

## Tutoriais: Assinaturas de contratos inteligentes (EIP-1271) no Ethereum {#tutorials}

- [EIP-1271: Assinando e verificando assinaturas de contratos inteligentes](/developers/tutorials/eip-1271-smart-contract-signatures/) _– Como a EIP-1271 permite que os contratos inteligentes verifiquem assinaturas, com um passo a passo da implementação do Safe._