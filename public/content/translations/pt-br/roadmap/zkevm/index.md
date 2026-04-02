---
title: zkEVM para verificação de bloco da L1
description: Aprenda como as provas de conhecimento zero podem verificar a execução de blocos do Ethereum, permitindo maior rendimento e menores requisitos de validador.
lang: pt-br
---

# zkEVM para verificação de bloco da L1 {#zkevm-l1}

A zkEVM é uma tecnologia que usa [provas de conhecimento zero](/zero-knowledge-proofs/) para verificar a execução de blocos do Ethereum. Em vez de exigir que cada [validador](/glossary/#validator) reexecute todas as transações em um bloco, um único ator especializado (chamado de "provador") executa o bloco e gera uma prova criptográfica de que a execução foi correta. Qualquer nó pode então verificar essa prova — um processo que é ordens de magnitude mais barato do que reexecutar todas as transações.

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>Não deve ser confundido com zkEVM rollups</AlertTitle>
<AlertDescription>
Esta página discute o uso da zkEVM para verificar a execução de blocos da L1 do Ethereum. Para zkEVM rollups que usam provas ZK para escalar o Ethereum como soluções de camada 2, consulte [zero-knowledge rollups](/developers/docs/scaling/zk-rollups/).
</AlertDescription>
</AlertContent>
</Alert>

## O problema da reexecução {#reexecution-problem}

Hoje, o Ethereum usa um modelo de verificação "N-de-N": cada validador deve reexecutar de forma independente cada transação em cada bloco para verificar se as mudanças de estado propostas estão corretas. Embora essa abordagem seja maximamente sem confiança (trustless), ela cria um gargalo fundamental.

O problema é que o rendimento do Ethereum é limitado pelo que o validador médio pode processar. Aumentar o [limite de gás](/glossary/#gas-limit) permitiria mais transações por bloco, mas também aumentaria os requisitos de hardware para os validadores. Isso ameaça a descentralização — se a execução de um validador exigir hardware caro, menos pessoas poderão participar da segurança da rede.

A zkEVM oferece uma saída para esse dilema. Ao mudar de "todos reexecutam" para "um prova, todos verificam", o Ethereum pode aumentar com segurança o limite de gás sem aumentar os requisitos de hardware do validador.

## Como funciona a verificação da zkEVM na L1 {#how-it-works}

A verificação da zkEVM transforma a validação de blocos em um modelo "1-de-N":

1. **Execução**: Um provador executa todas as transações em um bloco, rastreando cada mudança de estado
2. **Prova**: O provador gera uma prova criptográfica (um [SNARK ou STARK](/zero-knowledge-proofs/#types-of-zero-knowledge-proofs)) que atesta a correção da execução
3. **Verificação**: Os validadores verificam a prova em vez de reexecutar as transações — isso é drasticamente mais barato do que a reexecução completa

A garantia de segurança permanece a mesma: se a execução foi incorreta, nenhuma prova válida pode ser gerada. Mas agora, em vez de cada nó fazer computação cara, apenas o provador faz — e a verificação é barata o suficiente para não restringir o limite de gás.

### zkEVMs do Tipo 1 {#type-1-zkevm}

As zkEVMs são classificadas em tipos com base em sua compatibilidade com o Ethereum:

- **Tipo 1**: Totalmente equivalente ao Ethereum. Sem modificações na EVM, então qualquer bloco do Ethereum pode ser provado exatamente como é
- **Tipos 2-4**: Fazem várias concessões, modificando o comportamento da EVM para facilitar a prova

Para a verificação na L1, o Tipo 1 é essencial. A zkEVM deve ser capaz de provar qualquer bloco válido do Ethereum, incluindo casos extremos e blocos históricos. Qualquer desvio do comportamento exato do Ethereum criaria problemas de consenso.

A pesquisa de zkEVM da Ethereum Foundation se concentra em implementações do Tipo 1 que são totalmente compatíveis com a execução existente do Ethereum.

## Benefícios para o Ethereum {#benefits}

### Maior rendimento {#higher-throughput}

Quando a verificação é barata, o limite de gás pode aumentar com segurança. Isso expande a capacidade da rede e ajuda a estabilizar as taxas durante períodos de alta demanda. O limite de gás atual é parcialmente restrito pelo hardware do validador — a zkEVM remove essa restrição.

### Descentralização mais forte {#stronger-decentralization}

Com a verificação da zkEVM, os validadores só precisam verificar as provas em vez de executar as transações. Isso reduz drasticamente os requisitos de hardware para executar um validador, permitindo que mais pessoas participem da segurança da rede. Uma maior diversidade de validadores fortalece a resistência à censura e a resiliência do Ethereum.

Observe que a própria prova requer recursos computacionais significativos, maiores do que os do hardware atual do validador. No entanto, ao contrário da validação, a prova não precisa ser descentralizada da mesma maneira: apenas uma prova correta é necessária por bloco, e qualquer um pode verificá-la rapidamente. A pesquisa em mercados de provadores, agregação de provas e aceleração de hardware visa garantir que a prova permaneça competitiva e acessível, em vez de concentrada entre alguns grandes operadores.

### Finalidade previsível {#predictable-finality}

A verificação de provas opera em tempo constante, independentemente da complexidade do bloco. Isso torna o tempo de atestado mais previsível e reduz os atestados perdidos que podem ocorrer quando os validadores lutam para processar blocos complexos a tempo.

## Desafios da prova em tempo real {#realtime-proving}

O principal desafio para a verificação da zkEVM na L1 é a velocidade. Os blocos do Ethereum são produzidos a cada 12 segundos, o que significa que as provas precisam ser geradas em um período semelhante para serem úteis para o consenso.

As implementações atuais da zkEVM podem levar de minutos a horas para provar um único bloco. A pesquisa se concentra em fechar essa lacuna por meio de:

- **Paralelização**: Distribuição do trabalho de prova em várias máquinas
- **Hardware especializado**: Projetar circuitos e hardware otimizados para provas ZK
- **Melhorias algorítmicas**: Sistemas de prova e designs de circuitos mais eficientes
- **Prova incremental**: Geração de provas à medida que as transações são executadas, em vez de depois

## Pesquisa e implementações atuais {#current-research}

A Ethereum Foundation financia a pesquisa de zkEVM por meio da equipe [Privacy Stewards of Ethereum (PSE)](https://pse.dev/). As principais linhas de pesquisa incluem:

- **Prova em tempo real**: Geração de provas de bloco completas em slots de 12 segundos
- **Integração de cliente**: Padronização de interfaces entre clientes de execução e provadores
- **Incentivos econômicos**: Projetar mercados de provadores sustentáveis e estruturas de taxas

### Status de implementação {#implementations}

Várias implementações de zkVM estão sendo desenvolvidas e testadas para a prova de blocos do Ethereum:

| Implementação | Arquitetura |
|----------------|--------------|
| [OpenVM](https://github.com/openvm-org/openvm) | rv32im |
| [RISC Zero](https://github.com/risc0/risc0) | rv32im |
| [Airbender](https://github.com/matter-labs/zksync-airbender) | rv32im |
| [Jolt](https://github.com/a16z/jolt) | rv32im |
| [Zisk](https://github.com/0xPolygonHermez/zisk) | rv64ima |

Elas usam máquinas virtuais baseadas em RISC-V para executar o bytecode da EVM e, em seguida, geram provas ZK de execução correta. Os resultados de testes atualizados e o progresso são rastreados no [rastreador de zkVM da Ethereum Foundation](https://zkevm.ethereum.foundation/zkvm-tracker).

## Como a zkEVM se encaixa com outras atualizações {#related-upgrades}

A verificação da zkEVM na L1 se conecta com vários outros itens do roadmap do Ethereum:

- **[Árvores Verkle](/roadmap/verkle-trees/)**: Permitem testemunhas menores para verificação sem estado, reduzindo os dados com os quais os provadores precisam trabalhar
- **[Ausência de estado (Statelessness)](/roadmap/statelessness/)**: A zkEVM é um facilitador fundamental — com provas ZK de execução, os nós não precisam do estado completo para verificar os blocos
- **[PBS](/roadmap/pbs/)**: Os construtores de blocos poderiam potencialmente integrar a geração de provas, ou um mercado de provadores separado poderia surgir
- **[Finalidade de slot único](/roadmap/single-slot-finality/)**: A geração de provas mais rápida poderia permitir a finalidade de slot único com garantias criptográficas

<Alert variant="warning">
<AlertEmoji text="🧪" />
<AlertContent>
<AlertDescription>
A verificação da zkEVM na L1 está em pesquisa ativa e ainda não foi integrada aos clientes de produção do Ethereum.
</AlertDescription>
</AlertContent>
</Alert>

## Leitura adicional {#further-reading}

- [zkEVM Foundation](https://zkevm.ethereum.foundation) - Hub oficial de pesquisa de zkEVM da Ethereum Foundation
- [Ethproofs](https://ethproofs.org/) - Acompanhe a corrida para provar o Ethereum em tempo real
- [zkevm.fyi](https://zkevm.fyi) - Livro técnico sobre zkEVM para a L1
- [Especificações da zkEVM da PSE](https://github.com/privacy-scaling-explorations/zkevm-specs) - Especificações técnicas
- [The Verge](https://vitalik.eth.limo/general/2024/10/23/futures4.html) - Visão geral de Vitalik sobre melhorias de verificação
- [Blog da zkEVM da EF](https://zkevm.ethereum.foundation/blog) - Análise de desempenho da equipe da EF