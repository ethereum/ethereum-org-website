---
title: "Engenharia reversa de um contrato"
description: Como entender um contrato quando você não tem o código-fonte
author: Ori Pomerantz
lang: pt-br
tags:
  - "evm"
  - "códigos de operação"
skill: advanced
published: 2021-12-30
---

## Introdução {#introduction}

_Não há segredos no blockchain_. Tudo o que acontece é consistente, verificável e está disponível publicamente. O ideal é que os contratos [tenham seu código-fonte publicado e verificado na Etherscan](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). No entanto, [nem sempre isso acontece](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code). Neste artigo, você aprenderá a usar engenharia reversa em contratos analisando um contrato sem código-fonte, [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f).

Existem compiladores reversos, mas eles nem sempre produzem [resultados utilizáveis](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f). Neste artigo, você aprenderá como usar engenharia reversa manualmente e entender um contrato dos [opcodes](https://github.com/wolflo/evm-opcodes), além de interpretar os resultados de um descompilador.

Para entender este artigo, é preciso saber o básico de EVM e pelo menos estar um pouco familiarizado com a montagem de EVM. [Você pode ler sobre estes tópicos aqui](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e).

## Preparar o Código Executável {#prepare-the-executable-code}

Você pode obter os opcodes acessando o contrato no Etherscan clicando na guia **Contrato** e depois em **Alternar para a Visualização de Opcodes**. Você poderá visualizar um opcode por linha.

![Visualização do Opcode no Etherscan](opcode-view.png)

Para entender os saltos, no entanto, você precisa saber onde no código cada opcode está localizado. Uma maneira de fazer isso é abrir uma planilha do Google e colar os opcodes na coluna C. [Você pode pular as seguintes etapas ao fazer uma cópia desta planilha já preparada](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

O próximo passo é obter os locais de código corretos para que possamos entender os saltos. Colocaremos o tamanho do opcode na coluna B e o local (em hexadecimal) na coluna A. Digite esta função na célula `B1` e então copie e cole para o resto da coluna B, até o final do código. Depois de fazer isso, você pode ocultar a coluna B.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

Primeiro essa função adiciona um byte no opcode em si e depois procura por `PUSH`. Opcodes de push são especiais porque eles precisam ter bytes adicionais para o valor que está sendo enviado. Se o opcode é um `PUSH`, extraímos o número de bytes e adicionamos isso.

Em `A1` coloque o primeiro offset (descolamento de bits), para zero. Depois, em `A2`, insira esta função e copie e cole novamente para o resto da coluna A:

```
=dec2hex(hex2dec(A1)+B1)
```

Nós precisamos desta função, para nos dar o valor hexadecimal, porque os valores que são enviados antes dos saltos (`JUMP` e `JUMPI`) são dados a nós em hexadecimal.

## O Ponto de Entrada (0x00) {#the-entry-point-0x00}

Os contratos são sempre executados a partir do primeiro byte. Essa é a parte inicial do código:

| Deslocamento | Código de Operação | Montante (depois do opcode) |
| ------------:| ------------------ | --------------------------- |
|            0 | PUSH1 0x80         | 0x80                        |
|            2 | PUSH1 0x40         | 0x40, 0x80                  |
|            4 | MSTORE             | Vazio                       |
|            5 | PUSH1 0x04         | 0x04                        |
|            7 | CALLDATASIZE       | CALLDATASIZE 0x04           |
|            8 | LT                 | CALLDATASIZE<4              |
|            9 | PUSH2 0x005e       | 0x5E CALLDATASIZE<4         |
|            C | JUMPI              | Vazio                       |

Esse código faz duas coisas:

1. Escreva 0x80 como um valor de 32 bytes para locais da memória 0x40-0x5F (0x80 é armazenado em 0x5F, e 0x40-0x5E são todos zeros).
2. Leia o tamanho dos dados de chamada. Normalmente, os dados de chamada para um contrato Ethereum seguem [a ABI (interface binária do aplicativo)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html), o qual requer no mínimo quatro bytes para o seletor de função. Se o tamanho dos dados da chamada for menor que quatro, pule para 0x5E.

![Fluxograma para esta parte](flowchart-entry.png)

### O controlador em 0x5E (para dados de chamada não ABI) {#the-handler-at-0x5e-for-non-abi-call-data}

| Deslocamento | Código de Operação |
| ------------:| ------------------ |
|           5E | JUMPDEST           |
|           5F | CALLDATASIZE       |
|           60 | PUSH2 0x007c       |
|           63 | JUMPI              |

Este trecho começa com um `JUMPDEST`. Os programas EVM (Máquina Virtual Ethereum) lançam uma exceção se você pular para um opcode que não for `JUMPDEST`. Então, ele examina o CALLDATASIZE e, se for "verdadeiro" (ou seja, não for zero), pula para 0x7C. Veremos isso abaixo.

| Deslocamento | Código de Operação | Montante (depois do opcode)                                                   |
| ------------:| ------------------ | ----------------------------------------------------------------------------- |
|           64 | CALLVALUE          | [Wei](/glossary/#wei) fornecido pela chamada. Chamado `msg.value` no Solidity |
|           65 | PUSH1 0x06         | 6 CALLVALUE                                                                   |
|           67 | PUSH1 0x00         | 0 6 CALLVALUE                                                                 |
|           69 | DUP3               | CALLVALUE 0 6 CALLVALUE                                                       |
|           6A | DUP3               | 6 CALLVALUE 0 6 CALLVALUE                                                     |
|           6B | SLOAD              | Storage[6] CALLVALUE 0 6 CALLVALUE                                            |

Portanto, quando não há dados de chamada, nós lemos o valor de Storage[6]. Ainda não sabemos que valor é esse, mas podemos buscar as transações que o contrato recebeu sem nenhum dado de chamada. Transações que apenas transferem ETH sem nenhum dado de chamada (e, portanto, nenhum método) têm no Etherscan o método `Transfer`. De fato, [a primeira transação que o contrato recebeu](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7) é uma transferência.

Se nós olharmos nessa transação e clicarmos em **Clique para ver mais**, veremos que os dados da chamada, chamados de dados de entrada, estão de fato vazios (`0x`). Observe também que o valor é 1.559 ETH, que será relevante mais tarde.

![Os dados da chamada estão vazios](calldata-empty.png)

Em seguida, clique na guia o **Estado** e expanda o contrato que estamos fazendo engenharia reversa (0x2510...). Você pode ver que `Storage[6]` (armazenamento) mudou durante a transação e, se você alterar Hex para **Número**, verá que se tornou 1.559.000.000.000.000.000, o valor transferido em wei (adicionei as vírgulas para maior clareza), que corresponde ao próximo valor do contrato.

![A mudança no Armazenamento[6]](storage6.png)

Se observarmos as mudanças de estado causadas por [outras transações de `Transfer` (transferência) do mesmo período](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange), vemos que `Storage[6]` rastreou o valor do contrato por um tempo. Por enquanto, vamos chamá-lo de `Value*` (valor). O asterisco (`*`) nos lembra que não _sabemos_ o que esta variável faz, ainda, mas não pode ser apenas para rastrear o valor do contrato porque não há necessidade de usar armazenamento, o que é muito caro, quando você pode obter o saldo de suas contas usando `ADDRESS BALANCE`. O primeiro opcode envia o próprio endereço do contrato. O segundo lê o endereço no topo da pilha e o substitui com o saldo desse endereço.

| Deslocamento | Código de Operação | Pilha                                         |
| ------------:| ------------------ | --------------------------------------------- |
|           6C | PUSH2 0x0075       | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|           6F | SWAP2              | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|           70 | SWAP1              | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|           71 | PUSH2 0x01a7       | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|           74 | JUMP               |                                               |

Nós continuaremos a rastrear esse código no destino do salto (desvio).

| Deslocamento | Código de Operação | Pilha                                                         |
| ------------:| ------------------ | ------------------------------------------------------------- |
|          1A7 | JUMPDEST           | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|          1A8 | PUSH1 0x00         | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|          1AA | DUP3               | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|          1AB | NOT                | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

O `NOT` é bit a bit, portanto, ele inverte o valor de cada bit no valor da chamada.

| Deslocamento | Código de Operação | Pilha                                                                           |
| ------------:| ------------------ | ------------------------------------------------------------------------------- |
|          1AC | DUP3               | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|          1AD | GT                 | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|          1AE | ISZERO             | Value\*<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|          1AF | PUSH2 0x01df       | 0x01DF Value\*<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|          1B2 | JUMPI              |                                                                                 |

Nós pulamos se `Value*` (o valor) for menor que 2^256-CALLVALUE-1 ou igual a ele. Isso parece lógico para evitar vazamento (overflow). E, de fato, vemos que depois de algumas operações sem sentido (escrever na memória que está prestes a ser excluída, por exemplo) no deslocamento 0x01DE, o contrato é revertido se o vazamento for detectado, o que é um comportamento normal.

Note que esse vazamento é extremamente improvável, porque exigiria que o valor da chamada mais o `Value*` fosse comparável a 2^256 wei, em torno de 10^59 ETH. [O suprimento total de ETH, no momento desta redação, é inferior a duzentos milhões](https://etherscan.io/stat/supply).

| Deslocamento | Código de Operação | Pilha                                       |
| ------------:| ------------------ | ------------------------------------------- |
|          1DF | JUMPDEST           | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|          1E0 | POP                | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|          1E1 | ADD                | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|          1E2 | SWAP1              | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|          1E3 | JUMP               |                                             |

Se chegamos aqui, pegue `Value* + CALLVALUE` e salte para o offset 0x75.

| Deslocamento | Código de Operação | Pilha                             |
| ------------:| ------------------ | --------------------------------- |
|           75 | JUMPDEST           | Value\*+CALLVALUE 0 6 CALLVALUE |
|           76 | SWAP1              | 0 Value\*+CALLVALUE 6 CALLVALUE |
|           77 | SWAP2              | 6 Value\*+CALLVALUE 0 CALLVALUE |
|           78 | SSTORE             | 0 CALLVALUE                       |

Se nós chegarmos aqui (o que requer que os dados da chamada estejam vazios), adicionamos o `Value*` ao valor da chamada. Isso é consistente com o que dizemos que as transações de `Transfer` fazem.

| Deslocamento | Código de Operação |
| ------------:| ------------------ |
|           79 | POP                |
|           7A | POP                |
|           7B | STOP               |

Finalmente, limpe a pilha (o que não é necessário) e sinalize o fim bem-sucedido da transação.

Para simplificar tudo, aqui está um fluxograma para o código inicial.

![Fluxograma do ponto de entrada](flowchart-entry.png)

## O Controlador em 0x7C {#the-handler-at-0x7c}

Eu propositalmente não coloquei no cabeçalho o que esse controlador faz. O propósito não é ensinar como esse contrato específico funciona, mas como fazer engenharia reversa de contratos. Você irá aprender o que ele faz da mesma forma que eu, seguindo o código.

Nós chegamos aqui a partir de vários locais:

- Se houver dados de chamada de 1, 2 ou 3 bytes (a partir do deslocamento 0x63)
- Se a assinatura do método for desconhecida (dos offsets 0x42 e 0x5D)

| Deslocamento | Código de Operação | Pilha                |
| ------------:| ------------------ | -------------------- |
|           7C | JUMPDEST           |                      |
|           7D | PUSH1 0x00         | 0x00                 |
|           7F | PUSH2 0x009d       | 0x9D 0x00            |
|           82 | PUSH1 0x03         | 0x03 0x9D 0x00       |
|           84 | SLOAD              | Storage[3] 0x9D 0x00 |

Esta é outra célula de armazenamento, que não poderia encontrar em nenhuma transação, portanto, é mais difícil saber o que significa. O código abaixo deixará isso mais claro.

| Deslocamento | Código de Operação                                | Pilha                           |
| ------------:| ------------------------------------------------- | ------------------------------- |
|           85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|           9A | AND                                               | Storage[3]-as-address 0x9D 0x00 |

Esses opcodes truncam o valor que lemos do Armazenamento[3] para 160 bits, o tamanho de um endereço Ethereum.

| Deslocamento | Código de Operação | Pilha                           |
| ------------:| ------------------ | ------------------------------- |
|           9B | SWAP1              | 0x9D Storage[3]-as-address 0x00 |
|           9C | JUMP               | Storage[3]-as-address 0x00      |

Este salto é supérfluo, pois estamos indo para o próximo opcode. Esse código não é tão eficiente em relação ao consumo de gás quanto ele poderia ser.

| Deslocamento | Código de Operação | Pilha                           |
| ------------:| ------------------ | ------------------------------- |
|           9D | JUMPDEST           | Storage[3]-as-address 0x00      |
|           9E | SWAP1              | 0x00 Storage[3]-as-address      |
|           9F | POP                | Storage[3]-as-address           |
|           A0 | PUSH1 0x40         | 0x40 Storage[3]-as-address      |
|           A2 | MLOAD              | Mem[0x40] Storage[3]-as-address |

Bem no início do código, definimos Mem[0x40] como 0x80. Se procurarmos 0x40 posteriormente, veremos que nós não o alteramos - então podemos assumir que é 0x80.

| Deslocamento | Código de Operação | Pilha                                             |
| ------------:| ------------------ | ------------------------------------------------- |
|           A3 | CALLDATASIZE       | CALLDATASIZE 0x80 Storage[3]-as-address           |
|           A4 | PUSH1 0x00         | 0x00 CALLDATASIZE 0x80 Storage[3]-as-address      |
|           A6 | DUP3               | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-as-address |
|           A7 | CALLDATACOPY       | 0x80 Storage[3]-as-address                        |

Copie todos os dados da chamada para a memória, começando por 0x80.

| Deslocamento | Código de Operação | Pilha                                                                            |
| ------------:| ------------------ | -------------------------------------------------------------------------------- |
|           A8 | PUSH1 0x00         | 0x00 0x80 Storage[3]-as-address                                                  |
|           AA | DUP1               | 0x00 0x00 0x80 Storage[3]-as-address                                             |
|           AB | CALLDATASIZE       | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                |
|           AC | DUP4               | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                           |
|           AD | DUP6               | Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address     |
|           AE | GAS                | GAS Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address |
|           AF | DELEGATE_CALL      |                                                                                  |

Agora as coisas estão muito mais claras. Este contrato pode atuar como um [proxy](https://blog.openzeppelin.com/proxy-patterns/), chamando o endereço no Armazenamento[3] para fazer o trabalho real. `DELEGATE_CALL` chama um contrato separado, mas permanece no mesmo armazenamento. Isto significa que o contrato delegado, aquele para o qual somos proxy, acessa o mesmo espaço de armazenamento. Os parâmetros para a chamada são:

- _Gas_: Todo o gas restante
- _Endereço chamado_: Armazenamento[3] como endereço
- _Dados da chamada_: Os bytes CALLDATASIZE começando em 0x80, que é onde colocamos os dados originais da chamada
- _Dados de retorno_: Nenhum (0x00 - 0x00) Nós vamos obter os dados de retorno por outros meios (veja abaixo)

| Deslocamento | Código de Operação | Pilha                                                                                         |
| ------------:| ------------------ | --------------------------------------------------------------------------------------------- |
|           B0 | RETURNDATASIZE     | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |
|           B1 | DUP1               | RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address           |
|           B2 | PUSH1 0x00         | 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|           B4 | DUP5               | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|           B5 | RETURNDATACOPY     | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |

Aqui copiamos todos os dados de retorno para o buffer de memória começando em 0x80.

| Deslocamento | Código de Operação | Pilha                                                                                                                        |
| ------------:| ------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
|           B6 | DUP2               | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                              |
|           B7 | DUP1               | (((call success/failure))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address   |
|           B8 | ISZERO             | (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|           B9 | PUSH2 0x00c0       | 0xC0 (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|           BC | JUMPI              | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                              |
|           BD | DUP2               | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address               |
|           BE | DUP5               | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address          |
|           BF | RETURN             |                                                                                                                              |

Então, após a chamada, nós copiamos os dados de retorno para o buffer 0x80 - 0x80+RETURNDATASIZE e, se a chamada for bem-sucedida, nós então fazemos o `RETURN` com exatamente este buffer.

### DELEGATECALL falhou {#delegatecall-failed}

Se chegarmos aqui, para 0xC0, significa que o contrato que chamamos foi revertido. Como somos apenas um proxy para esse contrato, queremos retornar os mesmos dados e também reverter.

| Deslocamento | Código de Operação | Pilha                                                                                                               |
| ------------:| ------------------ | ------------------------------------------------------------------------------------------------------------------- |
|           C0 | JUMPDEST           | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                     |
|           C1 | DUP2               | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|           C2 | DUP5               | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|           C3 | REVERT             |                                                                                                                     |

Portanto, fazemos o `REVERT` com o mesmo buffer que usamos para o `RETURN` anteriormente: 0x80 - 0x80+RETURNDATASIZE

![Fluxograma de chamada ao proxy](flowchart-proxy.png)

## Chamadas da ABI {#abi-calls}

Se o tamanho dos dados da chamada for quatro bytes ou mais, pode ser uma chamada ABI válida.

| Deslocamento | Código de Operação | Pilha                                             |
| ------------:| ------------------ | ------------------------------------------------- |
|            D | PUSH1 0x00         | 0x00                                              |
|            F | CALLDATALOAD       | (((First word (256 bits) of the call data)))      |
|           10 | PUSH1 0xe0         | 0xE0 (((First word (256 bits) of the call data))) |
|           12 | SHR                | (((first 32 bits (4 bytes) of the call data)))    |

O Etherscan nos conta que `1C` é um opcode desconhecido, porque [ele foi adicionado depois que o Etherscan escreveu essa funcionalidade](https://eips.ethereum.org/EIPS/eip-145) e eles não o atualizaram. An [up to date opcode table](https://github.com/wolflo/evm-opcodes) shows us that this is shift right

| Deslocamento | Código de Operação | Pilha                                                                                                    |
| ------------:| ------------------ | -------------------------------------------------------------------------------------------------------- |
|           13 | DUP1               | (((first 32 bits (4 bytes) of the call data))) (((first 32 bits (4 bytes) of the call data)))            |
|           14 | PUSH4 0x3cd8045e   | 0x3CD8045E (((first 32 bits (4 bytes) of the call data))) (((first 32 bits (4 bytes) of the call data))) |
|           19 | GT                 | 0x3CD8045E>first-32-bits-of-the-call-data (((first 32 bits (4 bytes) of the call data)))                 |
|           1A | PUSH2 0x0043       | 0x43 0x3CD8045E>first-32-bits-of-the-call-data (((first 32 bits (4 bytes) of the call data)))            |
|           1D | JUMPI              | (((first 32 bits (4 bytes) of the call data)))                                                           |

Ao dividir os testes de correspondência da assinatura do método em dois, dessa forma, economiza metade dos testes, em média. O código que segue imediatamente e o código em 0x43 seguem o mesmo padrão: `DUP1` os primeiros 32 bits dos dados da chamada, `PUSH4 (((method signature>`, executa `EQ` para verificar a igualdade e, então, fazer o `JUMPI` se a assinatura do método corresponder. Aqui estão as assinaturas de método, seus endereços e, se conhecido [a definição de método correspondente](https://www.4byte.directory/):

| Método                                                                                 | Assinatura do método | Deslocamento por salto |
| -------------------------------------------------------------------------------------- | -------------------- | ---------------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e           | 0x0103                 |
| ???                                                                                    | 0x81e580d3           | 0x0138                 |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4           | 0x0158                 |
| ???                                                                                    | 0x1f135823           | 0x00C4                 |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab           | 0x00ED                 |

Se nenhuma combinação for encontrada, o código pula para [o controlador do proxy em 0x7C](#the-handler-at-0x7c), na esperança de que o contrato para o qual somos um proxy tenha uma correspondência.

![Fluxograma de chamadas ABI](flowchart-abi.png)

## splitter() {#splitter}

| Deslocamento | Código de Operação | Pilha                         |
| ------------:| ------------------ | ----------------------------- |
|          103 | JUMPDEST           |                               |
|          104 | CALLVALUE          | CALLVALUE                     |
|          105 | DUP1               | CALLVALUE CALLVALUE           |
|          106 | ISZERO             | CALLVALUE==0 CALLVALUE        |
|          107 | PUSH2 0x010f       | 0x010F CALLVALUE==0 CALLVALUE |
|          10A | JUMPI              | CALLVALUE                     |
|          10B | PUSH1 0x00         | 0x00 CALLVALUE                |
|          10D | DUP1               | 0x00 0x00 CALLVALUE           |
|          10E | REVERT             |                               |

A primeira coisa que esta função faz é verificar que a chamada não enviou nenhum ETH. Esta função não é [`payable`](https://solidity-by-example.org/payable/) pagável. Se alguém nos enviou ETH, isso deve ser um erro, e queremos fazer o `REVERT` para evitar ter esse ETH que eles não possam recuperá-lo.

| Deslocamento | Código de Operação                                | Pilha                                                                       |
| ------------:| ------------------------------------------------- | --------------------------------------------------------------------------- |
|          10F | JUMPDEST                                          |                                                                             |
|          110 | POP                                               |                                                                             |
|          111 | PUSH1 0x03                                        | 0x03                                                                        |
|          113 | SLOAD                                             | (((Storage[3] a.k.a the contract for which we are a proxy)))                |
|          114 | PUSH1 0x40                                        | 0x40 (((Storage[3] a.k.a the contract for which we are a proxy)))           |
|          116 | MLOAD                                             | 0x80 (((Storage[3] a.k.a the contract for which we are a proxy)))           |
|          117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] a.k.a the contract for which we are a proxy))) |
|          12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] a.k.a the contract for which we are a proxy))) |
|          12D | SWAP2                                             | (((Storage[3] a.k.a the contract for which we are a proxy))) 0xFF...FF 0x80 |
|          12E | AND                                               | ProxyAddr 0x80                                                              |
|          12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                         |
|          130 | MSTORE                                            | 0x80                                                                        |

E 0x80 agora contém o endereço do proxy

| Deslocamento | Código de Operação | Pilha     |
| ------------:| ------------------ | --------- |
|          131 | PUSH1 0x20         | 0x20 0x80 |
|          133 | ADD                | 0xA0      |
|          134 | PUSH2 0x00e4       | 0xE4 0xA0 |
|          137 | JUMP               | 0xA0      |

### O código E4 {#the-e4-code}

Essa é a primeira vez que vemos essas linhas, mas elas são compartilhadas com outros métodos (veja abaixo). Então, vamos chamar o valor na pilha de X, e lembre-se que em `splitter()` o valor desse X é 0xA0.

| Deslocamento | Código de Operação | Pilha       |
| ------------:| ------------------ | ----------- |
|           E4 | JUMPDEST           | X           |
|           E5 | PUSH1 0x40         | 0x40 X      |
|           E7 | MLOAD              | 0x80 X      |
|           E8 | DUP1               | 0x80 0x80 X |
|           E9 | SWAP2              | X 0x80 0x80 |
|           EA | SUB                | X-0x80 0x80 |
|           EB | SWAP1              | 0x80 X-0x80 |
|           EC | RETURN             |             |

Portanto, esse código recebe um ponteiro de memória no montante (X) e faz com que o contrato faça o `RETURN` com um buffer que é 0x80 - X.

No caso do `splitter()`, isto retorna o endereço do qual somos um proxy. O `RETURN` devolve o buffer em 0x80-0x9F, que é onde escrevemos esses dados (offset 0x130 acima).

## currentWindow() {#currentwindow}

O código nos deslocamentos 0x158-0x163 é idêntico ao que vimos em 0x103-0x10E em `splitter()` (que não seja o destino `JUMPI`), então sabemos que `currentWindow()` também não é `payable` (pagável).

| Deslocamento | Código de Operação | Pilha                |
| ------------:| ------------------ | -------------------- |
|          164 | JUMPDEST           |                      |
|          165 | POP                |                      |
|          166 | PUSH2 0x00da       | 0xDA                 |
|          169 | PUSH1 0x01         | 0x01 0xDA            |
|          16B | SLOAD              | Storage[1] 0xDA      |
|          16C | DUP2               | 0xDA Storage[1] 0xDA |
|          16D | JUMP               | Storage[1] 0xDA      |

### O código DA {#the-da-code}

Esse código também é compartilhado com outros métodos. Então, chamaremos o valor na pilha de Y e lembre-se de que em `currentWindow()` o valor desse Y é o Armazenamento[1].

| Deslocamento | Código de Operação | Pilha            |
| ------------:| ------------------ | ---------------- |
|           DA | JUMPDEST           | Y 0xDA           |
|           DB | PUSH1 0x40         | 0x40 Y 0xDA      |
|           DD | MLOAD              | 0x80 Y 0xDA      |
|           DE | SWAP1              | Y 0x80 0xDA      |
|           DF | DUP2               | 0x80 Y 0x80 0xDA |
|           E0 | MSTORE             | 0x80 0xDA        |

Escreva Y em 0x80-0x9F.

| Deslocamento | Código de Operação | Pilha          |
| ------------:| ------------------ | -------------- |
|           E1 | PUSH1 0x20         | 0x20 0x80 0xDA |
|           E3 | ADD                | 0xA0 0xDA      |

E o resto já está explicado conforme [acima](#the-e4-code). Portanto, salte para 0xDA, escreva no topo da pilha (Y) para 0x80-0x9F e retorne esse valor. No caso de `currentWindow()`, retorne o Armazenamento[1].

## merkleRoot() {#merkleroot}

O código nos deslocamentos 0xED-0xF8 é idêntico ao que vimos em 0x103-0x10E em `splitter()` (além do alvo `JUMPI`), então sabemos `merkleRoot()` também não é `payable`.

| Deslocamento | Código de Operação | Pilha                |
| ------------:| ------------------ | -------------------- |
|           F9 | JUMPDEST           |                      |
|           FA | POP                |                      |
|           FB | PUSH2 0x00da       | 0xDA                 |
|           FE | PUSH1 0x00         | 0x00 0xDA            |
|          100 | SLOAD              | Storage[0] 0xDA      |
|          101 | DUP2               | 0xDA Storage[0] 0xDA |
|          102 | JUMP               | Storage[0] 0xDA      |

O que acontece após o salto [já descobrimos](#the-da-code). Portanto, `merkleRoot()` retorna o Armazenamento[0].

## 0x81e580d3 {#0x81e580d3}

O código nos deslocamentos 0x138-0x143 é idêntico ao que vimos em 0x103-0x10E em `splitter()` (além do alvo `JUMPI`), então sabemos que esta função também é não `payable`.

| Deslocamento | Código de Operação | Pilha                                                        |
| ------------:| ------------------ | ------------------------------------------------------------ |
|          144 | JUMPDEST           |                                                              |
|          145 | POP                |                                                              |
|          146 | PUSH2 0x00da       | 0xDA                                                         |
|          149 | PUSH2 0x0153       | 0x0153 0xDA                                                  |
|          14C | CALLDATASIZE       | CALLDATASIZE 0x0153 0xDA                                     |
|          14D | PUSH1 0x04         | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|          14F | PUSH2 0x018f       | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                         |
|          152 | JUMP               | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|          18F | JUMPDEST           | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|          190 | PUSH1 0x00         | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|          192 | PUSH1 0x20         | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                      |
|          194 | DUP3               | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                 |
|          195 | DUP5               | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA    |
|          196 | SUB                | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|          197 | SLT                | CALLDATASIZE-4<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|          198 | ISZERO             | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|          199 | PUSH2 0x01a0       | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|          19C | JUMPI              | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

Parece que esta função leva ao menos 32 bytes (uma palavra) de dados da chamada.

| Deslocamento | Código de Operação | Pilha                                        |
| ------------:| ------------------ | -------------------------------------------- |
|          19D | DUP1               | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|          19E | DUP2               | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|          19F | REVERT             |                                              |

Se não obtiver os dados da chamada, a transação é revertida sem nenhum dado de retorno.

Vamos ver o que acontece se a função _obtiver_ os dados de chamada necessários.

| Deslocamento | Código de Operação | Pilha                                    |
| ------------:| ------------------ | ---------------------------------------- |
|          1A0 | JUMPDEST           | 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|          1A1 | POP                | 0x04 CALLDATASIZE 0x0153 0xDA            |
|          1A2 | CALLDATALOAD       | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` é a primeira palavra dos dados da chamada _após_ a assinatura do método

| Deslocamento | Código de Operação | Pilha                                                                        |
| ------------:| ------------------ | ---------------------------------------------------------------------------- |
|          1A3 | SWAP2              | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                     |
|          1A4 | SWAP1              | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                     |
|          1A5 | POP                | 0x0153 calldataload(4) 0xDA                                                  |
|          1A6 | JUMP               | calldataload(4) 0xDA                                                         |
|          153 | JUMPDEST           | calldataload(4) 0xDA                                                         |
|          154 | PUSH2 0x016e       | 0x016E calldataload(4) 0xDA                                                  |
|          157 | JUMP               | calldataload(4) 0xDA                                                         |
|          16E | JUMPDEST           | calldataload(4) 0xDA                                                         |
|          16F | PUSH1 0x04         | 0x04 calldataload(4) 0xDA                                                    |
|          171 | DUP2               | calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|          172 | DUP2               | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                               |
|          173 | SLOAD              | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                         |
|          174 | DUP2               | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|          175 | LT                 | calldataload(4)<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|          176 | PUSH2 0x017e       | 0x017EC calldataload(4)<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|          179 | JUMPI              | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

Se a primeira palavra não for menor que Armazenamento[4], a função falhará. Ele reverte sem nenhum valor retornado:

| Deslocamento | Código de Operação | Pilha         |
| ------------:| ------------------ | ------------- |
|          17A | PUSH1 0x00         | 0x00 ...      |
|          17C | DUP1               | 0x00 0x00 ... |
|          17D | REVERT             |               |

Se o calldataload(4) for menor que Armazenamento[4], obtemos este código:

| Deslocamento | Código de Operação | Pilha                                               |
| ------------:| ------------------ | --------------------------------------------------- |
|          17E | JUMPDEST           | calldataload(4) 0x04 calldataload(4) 0xDA           |
|          17F | PUSH1 0x00         | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|          181 | SWAP2              | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|          182 | DUP3               | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|          183 | MSTORE             | calldataload(4) 0x00 calldataload(4) 0xDA           |

E os locais de memória 0x00-0x1F agora contêm os dados 0x04 (0x00-0x1E são todos zeros, 0x1F é quatro)

| Deslocamento | Código de Operação | Pilha                                                                   |
| ------------:| ------------------ | ----------------------------------------------------------------------- |
|          184 | PUSH1 0x20         | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|          186 | SWAP1              | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|          187 | SWAP2              | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|          188 | SHA3               | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA            |
|          189 | ADD                | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA            |
|          18A | SLOAD              | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

Portanto, há uma tabela de pesquisa no armazenamento, que começa no SHA3 de 0x000...0004 e tem uma entrada para cada valor de dados da chamada legítima (valor abaixo do Armazenamento[4]).

| Deslocamento | Código de Operação | Pilha                                                                   |
| ------------:| ------------------ | ----------------------------------------------------------------------- |
|          18B | SWAP1              | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
|          18C | POP                | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |
|          18D | DUP2               | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA            |
|          18E | JUMP               | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |

Nós já sabemos o que [o código no deslocamento 0xDA](#the-da-code) faz, ele retorna o valor do topo da pilha para o chamador. Logo, esta função retorna o valor da tabela de pesquisa para o chamador.

## 0x1f135823 {#0x1f135823}

O código nos deslocamentos 0xC4-0xCF é idêntico ao que vimos em 0x103-0x10E em `splitter()` (além do alvo `JUMPI`), então sabemos que esta função também é não `payable`.

| Deslocamento | Código de Operação | Pilha               |
| ------------:| ------------------ | ------------------- |
|           D0 | JUMPDEST           |                     |
|           D1 | POP                |                     |
|           D2 | PUSH2 0x00da       | 0xDA                |
|           D5 | PUSH1 0x06         | 0x06 0xDA           |
|           D7 | SLOAD              | Value\* 0xDA      |
|           D8 | DUP2               | 0xDA Value\* 0xDA |
|           D9 | JUMP               | Value\* 0xDA      |

Nós já sabemos o que [o código no deslocamento 0xDA](#the-da-code) faz, ele retorna o valor do topo da pilha para o chamador. Portanto, esta função retorna o `Value*` (valor).

### Resumo do método {#method-summary}

Você sente que entende o contrato até este ponto? Não. Até o momento, temos esses métodos:

| Método                            | Significado                                                                                        |
| --------------------------------- | -------------------------------------------------------------------------------------------------- |
| Transfer                          | Aceite o valor fornecido pela chamada e incremente o `Value*` nesse valor                          |
| [splitter()](#splitter)           | Return Storage[3], the proxy address                                                               |
| [currentWindow()](#currentwindow) | Return Storage[1]                                                                                  |
| [merkleRoot()](#merkeroot)        | Return Storage[0]                                                                                  |
| [0x81e580d3](#0x81e580d3)         | Retorna o valor de uma tabela de pesquisa, desde que o parâmetro seja menor que o Armazenamento[4] |
| [0x1f135823](#0x1f135823)         | Return Storage[6], a.k.a. Value\*                                                                |

Mas nós sabemos que qualquer outra funcionalidade é fornecida pelo contrato no Armazenamento[3]. Talvez se soubéssemos qual o contrato, isso nos daria uma pista. Felizmente, isto é blockchain e tudo é conhecido, ao menos em teoria. Não vimos nenhum método que defina Armazenamento[3], então deve ter sido definido pelo construtor.

## O Constructor {#the-constructor}

Quando nós [observamos um contrato](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f), também podemos ver a transação que o criou.

![Clique em criar transação](create-tx.png)

Se clicarmos nessa transação e depois na guia **Estado**, podemos ver os valores iniciais dos parâmetros. Especificamente, podemos ver que o Armazenamento[3] contém [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761). Esse contrato deve conter a funcionalidade ausente. Podemos entendê-lo usando as mesmas ferramentas que utilizamos para o contrato que estamos investigando.

## O Contrato Proxy {#the-proxy-contract}

Utilizando as mesmas técnicas que usamos para o contrato original acima, podemos ver que o contrato reverte se:

- Existe algum ETH anexado à chamada (0x05-0x0F)
- O tamanho dos dados da chamada é menor que quatro (0x10-0x19 e 0xBE-0xC2)

E os métodos que ele suporta são:

| Método                                                                                                          | Assinatura do método         | Deslocamento por salto |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---------------------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/x/?bytes4_signature=0x8ffb5c97)          | 0x8ffb5c97                   | 0x0135                 |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | 0xd2ef0795                   | 0x0151                 |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4                 |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | 0x338b1d31                   | 0x0110                 |
| ???                                                                                                             | 0x3f26479e                   | 0x0118                 |
| ???                                                                                                             | 0x1e7df9d3                   | 0x00C3                 |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [0xba0bafb4](#currentwindow) | 0x0148                 |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [0x2eb4a7ab](#merkleroot)    | 0x0107                 |
| ???                                                                                                             | [0x81e580d3](#0x81e580d3)    | 0x0122                 |
| ???                                                                                                             | [0x1f135823](#0x1f135823)    | 0x00D8                 |

Nós podemos ignorar os quatro métodos inferiores porque nunca chegaremos a eles. Suas assinaturas são tais que nosso contrato original cuida delas por si só (você pode clicar nas assinaturas para ver os detalhes acima), por isso elas devem ser [métodos que são substituídos](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf).

Um dos métodos restantes é `claim(<params>)`, e outro é `isClaimed(<params>)`, então parece como um contrato airdrop. Em vez de passar pelo restante opcode por opcode, podemos [tentar o descompilador](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761), que produz resultados uteis para três funções deste contrato. A engenharia reversa dos outros é deixada como um exercício para o leitor.

### scaleAmountByPercentage {#scaleamountbypercentage}

Isso é o que o descompilador nos fornece para essa função:

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

O primeiro `require` testa que os dados da chamada tenham, além dos quatro bytes da assinatura da função, ao menos 64 bytes, suficientes para os dois parâmetros. Do contrário, obviamente, há algo errado.

A instrução `if` da sentença parece verificar que `_param1` não é zero e que `_param1 * _param2` não é negativo. Provavelmente, isso é para evitar casos de desvios.

Finalmente, a função retorna um valor em escala.

### Reivindicação {#claim}

O código que o descompilador cria é complexo, e nem todo ele é relevante para nós. Vou pular algumas partes para focar nas linhas que acredito fornecerem informações úteis

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

Vemos aqui duas coisas importantes:

- `_param2`, embora esteja declarado como um `uint256`, é na verdade um endereço
- `_param1` é a janela que está sendo reivindicada, o qual tem de ser `currentWindow` ou a anterior.

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

Ou seja, agora sabemos que Armazenamento[5] é uma matriz de janelas e endereços e se o endereço reivindicou a recompensa por essa janela.

```python
  ...
  idx = 0
  s = 0
  while idx < _param4.length:
  ...
      if s + sha3(mem[(32 * _param4.length) + 328 len mem[(32 * _param4.length) + 296]]) > mem[(32 * idx) + 296]:
          mem[mem[64] + 32] = mem[(32 * idx) + 296]
          ...
          s = sha3(mem[_62 + 32 len mem[_62]])
          continue
      ...
      s = sha3(mem[_66 + 32 len mem[_66]])
      continue
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
```

Sabemos que `unknown2eb4a7ab` é na verdade a função `merkleRoot()`, então este código parece estar verificando um [prova de merkle](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5). Isso significa que `_param4` é uma prova de merkle.

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

É assim que um contrato transfere seu próprio ETH para outro endereço (de contrato ou de propriedade externa). Ele o chama com um valor que é a quantidade a ser transferida. Logo, parece que isso é um airdrop do ETH.

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

As duas linhas mais abaixo nos dizem que o Armazenamento[2] também é um contrato que chamamos. Se nós [olharmos a transação do construtor](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange), veremos que este contrato é o [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), um contrato de Ether encapsulado [cujo código-fonte foi carregado no Etherscan](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code).

Assim, parece que os contratos tentam enviar ETH para `_param2`. Se puder fazer isso, ótimo. Se não, ele tenta enviar [WETH](https://weth.tkn.eth.limo/). Se `_param2` for uma conta de propriedade externa (EOA), então ele sempre pode receber ETH, mas os contratos podem se recusar a receber ETH. No entanto, WETH é ERC-20 e os contratos não podem se recusar a aceitar isso.

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

No final da função, nós vemos uma entrada de log sendo gerada. [Veja as entradas de log geradas](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) e filtre pelo tópico que começa com `0xdbd5...`. Se nós [clicarmos em uma das transações que gerou tal entrada](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274), veremos que realmente parece uma reivindicação - a conta enviou uma mensagem para o contrato, que estamos fazendo engenharia reversa e, em troca, recebemos ETH.

![Uma transação de reivindicação](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

Esta função é muito semelhante à [`claim`](#claim) (reinvidicação) acima. Ela também verifica uma prova de merkle, que tenta transferir ETH para o primeiro e produz o mesmo tipo de entrada de log.

```python
def unknown1e7df9d3(uint256 _param1, uint256 _param2, array _param3) payable:
  ...
  idx = 0
  s = 0
  while idx < _param3.length:
      if idx >= mem[96]:
          revert with 0, 50
      _55 = mem[(32 * idx) + 128]
      if s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]]) > mem[(32 * idx) + 128]:
          ...
          s = sha3(mem[_58 + 32 len mem[_58]])
          continue
      mem[mem[64] + 32] = s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]])
  ...
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
  ...
  call addr(_param1) with:
     value s wei
       gas 30000 wei
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value s wei
               gas gas_remaining wei
  ...
  log 0xdbd5389f: addr(_param1), s, bool(ext_call.success)
```

A principal diferença é que o primeiro parâmetro, a janela para retirada, não está lá. Em vez disso, há um loop em todas as janelas que podem ser reivindicadas.

```python
  idx = 0
  s = 0
  while idx < currentWindow:
      ...
      if stor5[mem[0]]:
          if idx == -1:
              revert with 0, 17
          idx = idx + 1
          s = s
          continue
      ...
      stor5[idx][addr(_param1)] = 1
      if idx >= unknown81e580d3.length:
          revert with 0, 50
      mem[0] = 4
      if unknown81e580d3[idx] and _param2 > -1 / unknown81e580d3[idx]:
          revert with 0, 17
      if s > !(unknown81e580d3[idx] * _param2 / 100 * 10^6):
          revert with 0, 17
      if idx == -1:
          revert with 0, 17
      idx = idx + 1
      s = s + (unknown81e580d3[idx] * _param2 / 100 * 10^6)
      continue
```

Portanto, parece uma variante da `claim` que reivindica todas as janelas.

## Conclusão {#conclusion}

A esta altura, você já deveria saber como entender os contratos cujo código-fonte não está disponível, usando os opcodes ou (quando funciona) o descompilador. Como é evidente na extensão deste artigo, a engenharia reversa de um contrato não é trivial, mas em um sistema em que a segurança é essencial, é uma habilidade importante ser capaz de verificar se os contratos funcionam como prometido.
