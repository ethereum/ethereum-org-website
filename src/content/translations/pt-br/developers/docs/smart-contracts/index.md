---
title: Introdução aos contratos inteligentes
description: Uma visão geral dos contratos inteligentes, centrada em suas características e limitações únicas.
lang: pt-br
---

## O que é um contrato inteligente? {#what-is-a-smart-contract}

Um "contrato inteligente" é simplesmente um programa que é executado na cadeia de blocos Ethereum. É uma coleção de código (suas funções) e dados (seu estado) que reside em um endereço específico na blockchain Ethereum.

Os contratos inteligentes são um tipo de [conta Ethereum](/developers/docs/accounts/). Isso significa que eles têm um saldo e podem enviar transações através da rede. No entanto, eles não são controlados por um usuário, em vez disso, eles são implantados na rede e são executados como programados. Contas de usuários podem então interagir com um contrato inteligente enviando transações que executam uma função definida no contrato inteligente. Os contratos inteligentes podem definir regras, como um contrato regular, e aplicá-los automaticamente através do código. Os contratos inteligentes não podem ser excluídos por padrão, e as interações com eles são irreversíveis.

## Pré-requisitos {#prerequisites}

Verifique se você leu as [contas](/developers/docs/accounts/), [transações](/developers/docs/transactions/) e a [máquina virtual Ethereum](/developers/docs/evm/) antes de entrar no mundo dos contratos inteligentes.

## Uma máquina de vendas digitais {#a-digital-vending-machine}

Talvez a melhor metáfora para um contrato inteligente seja uma máquina de venda automática, descrita por [Nick Szabo](https://unenumerated.blogspot.com/). Com as entradas certas, uma certa saída é garantida.

Para obter um snack de uma máquina de venda automática:

```
dinheiro +seleção de snack = snack dispensado
```

Esta lógica está programada para a máquina de venda automática.

Um contrato inteligente, como uma máquina de venda automática, tem lógica programada dentro dele. Aqui há um exemplo simples de como uma máquina de venda automática pareceria, atuando como um contrato inteligente:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Declarar variáveis de estado do endereço público do proprietário do contrato;
    mapping (address => uint) public cupcakeBalances;

    // Quando o contrato 'VendingMachine' é implantado:
    // 1. defina o endereço de implantação como proprietário do contrato
    // 2. defina o saldo de cupcake do contrato inteligente para 100
    constructor() public {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Permite que o proprietário aumente o saldo de cupcake no contrato inteligente
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Permite que qualquer pessoa adquira cupcakes
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

De maneira similar a como uma máquina de venda automática elimina a necessidade de um funcionário fornecedor, os contratos inteligentes podem substituir intermediários em muitos setores.

## Sem necessidade de permissão {#permissionless}

Qualquer um pode escrever um contrato inteligente e implantá-lo na rede. Você só precisa aprender a codificar em um [idioma de contrato inteligente](/developers/docs/smart-contracts/languages/) e ter ETH suficiente para implantar seu contrato. A implantação de um contrato inteligente é tecnicamente uma transação, então você precisa pagar as suas [Gás](/developers/docs/gas/) da mesma forma que você precisa pagar gás por uma transferência de ETH simples. No entanto, os custos do gás para a implantação contratual são muito mais elevados.

O Ethereum tem linguagens amigáveis ao desenvolvedor para escrever contratos inteligentes:

- Solidity
- Vyper

[Mais sobre linguagens](/developers/docs/smart-contracts/languages/)

No entanto, eles devem ser compilados antes de poderem ser implantados para que a máquina virtual da Ethereum possa interpretar e armazenar o contrato. [Mais sobre compilação](/developers/docs/smart-contracts/compiling/)

## Componibilidade {#composability}

Os contratos inteligentes são públicos na Ethereum e podem ser considerados como APIs abertas. Isso significa que você pode chamar outros contratos inteligentes em seu próprio contrato inteligente para ampliar muito o que é possível. Os contratos podem mesmo implantar outros contratos.

Saiba mais sobre a [composição do contrato inteligente](/developers/docs/smart-contracts/composability/).

## Limitações {#limitations}

Os contratos inteligentes, por si só, não conseguem obter informações sobre eventos "mundo-real" porque não podem enviar solicitações HTTP. Isto é por design. A sua concepção é a de que a informação externa pode pôr em causa o consenso, que é importante para a segurança e a descentralização.

Há maneiras de contornar isso usando [oráculos](/developers/docs/oracles/).

Outra limitação de contratos inteligentes é o tamanho máximo do contrato. Um contrato inteligente pode ser um máximo de 24KB ou ficará sem gás. Isso pode ser contornado usando [O Padrão de Diamante](https://eips.ethereum.org/EIPS/eip-2535).

## Recursos para contratos inteligentes {#smart-contract-resources}

**OpenZeppelin Contracts -** **_Biblioteca para o desenvolvimento de contratos inteligentes seguros._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Fórum da Comunidade](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Blocos de código seguros, simples e flexíveis para smart contracts._**

- [Dappsys](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

## Leitura Adicional {#further-reading}

- [Contratos Inteligentes: A Tecnologia Blockchain que substituirá Advogados](https://blockgeeks.com/guides/smart-contracts/) _– Blockgeeks_
- [Melhores Práticas para Desenvolvimento de Contrato Inteligente](https://yos.io/2019/11/10/smart-contract-development-best-practices/) _– 10 de Novembro de 2019 - Yos Riady_
- [Contratos claros - um guia sobre padrões de contrato inteligente & práticas](https://www.wslyvh.com/clean-contracts/) _– Jul 30 2020 - wslyvh_
