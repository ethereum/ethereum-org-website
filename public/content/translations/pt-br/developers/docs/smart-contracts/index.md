---
title: "Introdução aos contratos inteligentes"
description: "Uma visão geral dos contratos inteligentes, centrada em suas características e limitações únicas."
lang: pt-br
---

## O que é um contrato inteligente? {#what-is-a-smart-contract}

Um "contrato inteligente" é simplesmente um programa executado na blockchain Ethereum. É uma coleção de código (suas funções) e dados (seu estado) que reside em um endereço específico na blockchain Ethereum.

Contratos inteligentes são um tipo de [conta Ethereum](/developers/docs/accounts/). Isso significa que eles têm saldo e podem ser alvo de transações. No entanto, eles não são controlados por um usuário, em vez disso, eles são implantados na rede e são executados como programados. Contas de usuários podem então interagir com um contrato inteligente enviando transações que executam uma função definida no contrato inteligente. Os contratos inteligentes podem definir regras, como um contrato regular, e aplicá-los automaticamente através do código. Os contratos inteligentes não podem ser excluídos por padrão, e as interações com eles são irreversíveis.

## Pré-requisitos {#prerequisites}

Se você está apenas começando ou procurando uma introdução menos técnica, recomendamos nossa [introdução aos contratos inteligentes](/smart-contracts/).

Certifique-se de que leu sobre [contas](/developers/docs/accounts/), [transações](/developers/docs/transactions/) e a [máquina virtual Ethereum](/developers/docs/evm/) antes de mergulhar no mundo dos contratos inteligentes.

## Uma máquina de venda automática digital {#a-digital-vending-machine}

Talvez a melhor metáfora para um contrato inteligente seja uma máquina de venda automática, conforme descrito por [Nick Szabo](https://unenumerated.blogspot.com/). Com as entradas certas, uma saída segura é garantida.

Para obter um snack de uma máquina de venda automática:

```
dinheiro +seleção de snack = snack dispensado
```

Esta lógica está programada para a máquina de venda automática.

Um contrato inteligente, como uma máquina de venda automática, tem lógica programada dentro dele. Aqui está um exemplo simples de como essa máquina de venda automática ficaria se fosse um contrato inteligente escrito em Solidity:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Declarar variáveis de estado do contrato
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Quando o contrato 'VendingMachine' for implantado:
    // 1. defina o endereço de implantação como o proprietário do contrato
    // 2. defina o saldo de cupcakes do contrato inteligente implantado como 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Permitir que o proprietário aumente o saldo de cupcakes do contrato inteligente
    function refill(uint amount) public {
        require(msg.sender == owner, "Apenas o proprietário pode reabastecer.");
        cupcakeBalances[address(this)] += amount;
    }

    // Permitir que qualquer pessoa compre cupcakes
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "Você deve pagar pelo menos 1 ETH por cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Não há cupcakes suficientes em estoque para concluir esta compra");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

De maneira similar a como uma máquina de venda automática elimina a necessidade de um funcionário fornecedor, os contratos inteligentes podem substituir intermediários em muitos setores.

## Sem permissão {#permissionless}

Qualquer um pode escrever um contrato inteligente e implantá-lo na rede. Você só precisa aprender a codificar em uma [linguagem de contrato inteligente](/developers/docs/smart-contracts/languages/) e ter ETH suficiente para implantar seu contrato. Implantar um contrato inteligente é tecnicamente uma transação, então você precisa pagar [gás](/developers/docs/gas/) da mesma forma que precisa pagar gás por uma simples transferência de ETH. No entanto, os custos de gás para implantação de contrato são muito mais altos.

A Ethereum tem linguagens que o desenvolvedor terá facilidade de usar para escrever contratos inteligentes:

- Solidity
- Vyper

[Mais sobre linguagens](/developers/docs/smart-contracts/languages/)

Contudo, elas devem ser compiladas antes de poderem ser implantadas para que a máquina virtual da Ethereum possa interpretar e armazenar o contrato. [Mais sobre compilação](/developers/docs/smart-contracts/compiling/)

## Componibilidade {#composability}

Os contratos inteligentes são públicos na Ethereum e podem ser considerados como APIs abertas. Isso significa que você pode chamar outros contratos inteligentes em seu próprio contrato inteligente para estender muito o que é possível. Os contratos podem mesmo implantar outros contratos.

Saiba mais sobre a [componibilidade de contratos inteligentes](/developers/docs/smart-contracts/composability/).

## Limitações {#limitations}

Os contratos inteligentes sozinhos não podem obter informações sobre eventos do "mundo real", porque não podem recuperar dados de fontes off-chain. Isso significa que eles não podem responder a eventos no mundo real. Isto é, por concepção. A sua concepção é a de que as informações externas podem pôr em causa o consenso, que é importante para a segurança e a descentralização.

No entanto, é importante que aplicações blockchain possam usar dados off-chain. A solução são [oráculos](/developers/docs/oracles/), que são ferramentas que ingerem dados fora da cadeia e os disponibilizam para contratos inteligentes.

Outra limitação de contratos inteligentes é o tamanho máximo do contrato. Um contrato inteligente pode ser um máximo de 24KB ou ficará sem gás. Isso pode ser contornado usando o [Padrão Diamante (The Diamond Pattern)](https://eips.ethereum.org/EIPS/eip-2535).

## Contratos Multisig {#multisig}

Os contratos multisig (com múltiplas assinaturas) são contas de contrato inteligente que exigem várias assinaturas válidas para executar uma transação. Isso é muito útil para evitar pontos únicos de falha para contratos com quantidades substanciais de ether ou outros tokens. Os Multisigs também dividem a responsabilidade pela execução do contrato e gerenciamento das chaves entre vários participantes e evitam que a perda de uma única chave privada leve à perda irreversível de fundos. Por esses motivos, os contratos multisig podem ser usados para governança DAO simples. Multisigs exigem N de M assinaturas possíveis (onde N ≤ M e M > 1) para serem executados. `N = 3, M = 5` e `N = 4, M = 7` são comumente usados. Um multisig 4/7 requer quatro das sete assinaturas válidas possíveis. Isso significa que os fundos ainda podem ser recuperados, mesmo que três assinaturas sejam perdidas. Nesse caso, também significa que a maioria dos detentores de chaves deve concordar e assinar para que o contrato seja executado.

## Recursos de contratos inteligentes {#smart-contract-resources}

**OpenZeppelin Contracts -** **_Biblioteca para desenvolvimento seguro de contratos inteligentes._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Fórum da Comunidade](https://forum.openzeppelin.com/c/general/16)

## Leitura adicional {#further-reading}

- [Coinbase: O que é um contrato inteligente?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: O que é um contrato inteligente?](https://chain.link/education/smart-contracts)
- [Vídeo: Explicando de forma simples - Contratos Inteligentes](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: plataforma de aprendizado e auditoria da Web3](https://updraft.cyfrin.io)
