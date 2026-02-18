---
title: "Máquina virtual Ethereum (EVM)"
description: "Uma introdução à máquina virtual do Ethereum e como ela se relaciona com o estado, as transações e os contratos inteligentes."
lang: pt-br
---

A Máquina Virtual Ethereum (EVM, em inglês) é um ambiente virtual descentralizado que executa códigos de forma consistente e segura em todos os nós do Ethereum. Os nós executam a EVM para executar contratos inteligentes, usando "[gás](/developers/docs/gas/)" para medir o esforço computacional necessário para [operações](/developers/docs/evm/opcodes/), garantindo a alocação eficiente de recursos e a segurança da rede.

## Pré-requisitos {#prerequisites}

É necessária uma familiaridade básica com a terminologia comum da ciência da computação, como [bytes](https://wikipedia.org/wiki/Byte), [memória](https://wikipedia.org/wiki/Computer_memory) e [pilha](https://wikipedia.org/wiki/Stack_\(abstract_data_type\)) para entender a EVM. Também seria útil estar familiarizado com conceitos de criptografia/blockchain, como [funções de hash](https://wikipedia.org/wiki/Cryptographic_hash_function) e a [árvore de Merkle](https://wikipedia.org/wiki/Merkle_tree).

## Do livro-razão à máquina de estado {#from-ledger-to-state-machine}

A analogia de um 'livro-razão distribuído' é muitas vezes usada para descrever blockchains como o Bitcoin, que permite uma moeda descentralizada usando ferramentas fundamentais de criptografia. O livro-razão mantém um registro de atividades que deve aderir a um conjunto de regras que regem o que alguém pode e não pode fazer para modificar o livro-razão. Por exemplo, um endereço de Bitcoin não pode gastar mais Bitcoin do que o recebido previamente. Essas regras sustentam todas as transações em Bitcoin e em muitas outras blockchains.

Embora o Ethereum tenha sua própria criptomoeda nativa (ether) que segue quase exatamente as mesmas regras intuitivas, ele também permite uma função muito mais poderosa: [contratos inteligentes](/developers/docs/smart-contracts/). Para este recurso mais complexo, uma analogia mais sofisticada é necessária. Em vez de um livro-razão distribuído, o Ethereum é uma [máquina de estado](https://wikipedia.org/wiki/Finite-state_machine) distribuída. O estado do Ethereum é uma grande estrutura de dados que contém não apenas todas as contas e saldos, mas também um _estado da máquina_, que pode mudar de bloco para bloco de acordo com um conjunto predefinido de regras e que pode executar um código de máquina arbitrário. As regras específicas para mudar o estado de bloco em bloco são definidas pela EVM.

![Um diagrama que mostra a composição da EVM](./evm.png)
_Diagrama adaptado de [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## A função de transição de estado do Ethereum {#the-ethereum-state-transition-function}

A EVM se comporta como uma função matemática seria: de acordo com a entrada, ele produz uma saída determinística. Portanto, é muito útil descrever mais formalmente o Ethereum como tendo uma **função de transição de estado**:

```
Y(S, T)= S'
```

Dado um estado válido antigo `(S)` e um novo conjunto de transações válidas `(T)`, a função de transição de estado do Ethereum `Y(S, T)` produz um novo estado de saída válido `S'`

### Estado {#state}

No contexto do Ethereum, o estado é uma enorme estrutura de dados chamada de [árvore de Merkle Patricia modificada](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/), que mantém todas as [contas](/developers/docs/accounts/) vinculadas por hashes e redutíveis a um único hash raiz armazenado na cadeia de blocos.

### Transações {#transactions}

Transações são instruções assinadas criptograficamente de contas. Existem dois tipos de transações: as que resultam em chamadas de mensagem e as que resultam na criação de contratos.

A criação de contrato resulta na criação de uma nova conta de contrato contendo o bytecode compilado do [contrato inteligente](/developers/docs/smart-contracts/anatomy/). Sempre que outra conta faz uma mensagem de chamada a esse contrato, ele executa seu bytecode.

## Instruções da EVM {#evm-instructions}

A EVM é executada como uma [máquina de pilha](https://wikipedia.org/wiki/Stack_machine) com uma profundidade de 1024 itens. Cada item é uma palavra de 256 bits, que foi escolhida para facilitar o uso com criptografia de 256 bits (como hashes Keccak-256 ou assinaturas secp256k1).

Durante a execução, a EVM mantém uma _memória_ transiente (como um array de bytes endereçado por palavra), que não persiste entre transações.

### Armazenamento transitório

O armazenamento transitório é um repositório de chave-valor por transação, acessado através dos opcodes `TSTORE` e `TLOAD`. Ele persiste em todas as chamadas internas durante a mesma transação, mas é apagado no final da transação. Diferentemente da memória, o armazenamento transitório é modelado como parte do estado da EVM, e não do quadro de execução, e ainda assim não é confirmado no estado global. O armazenamento transitório permite o compartilhamento temporário de estado com uso eficiente de gás entre as chamadas internas durante uma transação.

### Armazenamento

Os contratos contêm uma trie de _armazenamento_ Merkle Patricia (como um array de palavras endereçável por palavra), associada à conta em questão e parte do estado global. Este armazenamento persistente difere do armazenamento transitório, que está disponível apenas durante uma única transação e não faz parte da trie de armazenamento persistente da conta.

### OpCodes

O bytecode de contrato inteligente compilado é executado como uma série de [opcodes](/developers/docs/evm/opcodes) da EVM, que realizam operações de pilha padrão como `XOR`, `AND`, `ADD`, `SUB`, etc. A EVM também implementa várias operações de pilha específicas da blockchain, como `ADDRESS`, `BALANCE`, `BLOCKHASH`, etc. O conjunto de opcodes também inclui `TSTORE` e `TLOAD`, que fornecem acesso ao armazenamento transitório.

![Um diagrama mostrando onde o gás é necessário para as operações da EVM](../gas/gas.png)
_Diagramas adaptados de [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Implementações da EVM {#evm-implementations}

Todas as implementações da EVM devem aderir à especificação descrita no Ethereum Yellowpaper.

Ao longo dos dez anos de história do Ethereum, a EVM passou por diversas revisões, e existem várias implementações da EVM em diversas linguagens de programação.

Os [clientes de execução do Ethereum](/developers/docs/nodes-and-clients/#execution-clients) incluem uma implementação da EVM. Além disso, existem várias implementações independentes, incluindo:

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## Leitura adicional {#further-reading}

- [Yellowpaper do Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper, também conhecido como KEVM: Semântica da EVM em K](https://jellopaper.org/)
- [The Beigepaper](https://github.com/chronaeon/beigepaper)
- [Opcodes da Máquina Virtual do Ethereum](https://www.ethervm.io/)
- [Referência interativa dos opcodes da Máquina Virtual Ethereum](https://www.evm.codes/)
- [Uma breve introdução na documentação do Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [Mastering Ethereum – A Máquina Virtual do Ethereum](https://github.com/ethereumbook/ethereumbook/blob/openedition/13evm.asciidoc)

## Tópicos relacionados {#related-topics}

- [Gás](/developers/docs/gas/)
