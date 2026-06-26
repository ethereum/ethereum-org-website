---
title: "Engenharia reversa de um contrato"
description: "Como entender um contrato quando você não tem o código-fonte"
author: Ori Pomerantz
lang: pt-br
tags: ["evm", "opcodes"]
skill: advanced
breadcrumb: Engenharia reversa
published: 2021-12-30
---
## Introdução {#introduction}

_Não há segredos na blockchain_, tudo o que acontece é consistente, verificável e publicamente disponível. Idealmente, [os contratos devem ter seu código-fonte publicado e verificado no Etherscan](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). No entanto, [nem sempre é esse o caso](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code). Neste artigo, você aprenderá como fazer engenharia reversa de contratos analisando um contrato sem código-fonte, [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f).

Existem compiladores reversos, mas eles nem sempre produzem [resultados utilizáveis](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f). Neste artigo, você aprenderá como fazer engenharia reversa manualmente e entender um contrato a partir [dos códigos de operação (opcodes)](https://github.com/wolflo/evm-opcodes), bem como a interpretar os resultados de um descompilador.

Para conseguir entender este artigo, você já deve conhecer os conceitos básicos da EVM e estar pelo menos um pouco familiarizado com a linguagem assembly da EVM. [Você pode ler sobre esses tópicos aqui](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e).

## Prepare o código executável {#prepare-the-executable-code}

Você pode obter os códigos de operação acessando o Etherscan para o contrato, clicando na aba **Contract** e depois em **Switch to Opcodes View**. Você terá uma visualização de um código de operação por linha.

![Opcode View from Etherscan](opcode-view.png)

Para conseguir entender os saltos, no entanto, você precisa saber onde cada código de operação está localizado no código. Para fazer isso, uma maneira é abrir uma Planilha do Google e colar os códigos de operação na coluna C. [Você pode pular as etapas a seguir fazendo uma cópia desta planilha já preparada](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

O próximo passo é obter as localizações corretas do código para que possamos entender os saltos. Colocaremos o tamanho do código de operação na coluna B e a localização (em hexadecimal) na coluna A. Digite esta função na célula `B1` e depois copie e cole para o restante da coluna B, até o final do código. Depois de fazer isso, você pode ocultar a coluna B.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

Primeiro, esta função adiciona um byte para o próprio código de operação e, em seguida, procura por `PUSH`. Os códigos de operação PUSH são especiais porque precisam ter bytes adicionais para o valor que está sendo empilhado. Se o código de operação for um `PUSH`, extraímos o número de bytes e o adicionamos.

Em `A1`, coloque o primeiro offset, zero. Em seguida, em `A2`, coloque esta função e, novamente, copie e cole para o restante da coluna A:

```
=dec2hex(hex2dec(A1)+B1)
```

Precisamos que esta função nos dê o valor hexadecimal porque os valores que são empilhados antes dos saltos (`JUMP` e `JUMPI`) nos são fornecidos em hexadecimal.

## O Ponto de Entrada (0x00) {#the-entry-point-0x00}

Os contratos são sempre executados a partir do primeiro byte. Esta é a parte inicial do código:

| Offset | Código de operação | Pilha (após o código de operação) |
| -----: | ------------------ | --------------------------------- |
|      0 | PUSH1 0x80         | 0x80                              |
|      2 | PUSH1 0x40         | 0x40, 0x80                        |
|      4 | MSTORE             | Vazia                             |
|      5 | PUSH1 0x04         | 0x04                              |
|      7 | CALLDATASIZE       | CALLDATASIZE 0x04                 |
|      8 | LT                 | CALLDATASIZE\<4                    |
|      9 | PUSH2 0x005e       | 0x5E CALLDATASIZE\<4               |
|      C | JUMPI              | Vazia                             |

Este código faz duas coisas:

1. Escreve 0x80 como um valor de 32 bytes nos locais de memória 0x40-0x5F (0x80 é armazenado em 0x5F, e 0x40-0x5E são todos zeros).
2. Lê o tamanho dos dados de chamada. Normalmente, os dados de chamada para um contrato Ethereum seguem [a ABI (interface binária de aplicativo)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html), que no mínimo requer quatro bytes para o seletor de função. Se o tamanho dos dados de chamada for menor que quatro, salta para 0x5E.

![Flowchart for this portion](flowchart-entry.png)

### O Manipulador em 0x5E (para dados de chamada não-ABI) {#the-handler-at-0x5e-for-non-abi-call-data}

| Offset | Código de operação |
| -----: | ------------------ |
|     5E | JUMPDEST           |
|     5F | CALLDATASIZE       |
|     60 | PUSH2 0x007c       |
|     63 | JUMPI              |

Este trecho começa com um `JUMPDEST`. Os programas da EVM (máquina virtual Ethereum) lançam uma exceção se você saltar para um código de operação que não seja `JUMPDEST`. Em seguida, ele analisa o CALLDATASIZE e, se for "verdadeiro" (ou seja, não zero), salta para 0x7C. Chegaremos a isso mais adiante.

| Offset | Código de operação | Pilha (após o código de operação)                                                                          |
| -----: | ------------------ | ---------------------------------------------------------------------------------------------------------- |
|     64 | CALLVALUE          | [Wei](/glossary/#wei) fornecido pela chamada. Chamado de `msg.value` em Solidity |
|     65 | PUSH1 0x06         | 6 CALLVALUE                                                                                                |
|     67 | PUSH1 0x00         | 0 6 CALLVALUE                                                                                              |
|     69 | DUP3               | CALLVALUE 0 6 CALLVALUE                                                                                    |
|     6A | DUP3               | 6 CALLVALUE 0 6 CALLVALUE                                                                                  |
|     6B | SLOAD              | Storage[6] CALLVALUE 0 6 CALLVALUE                                                                         |

Portanto, quando não há dados de chamada, lemos o valor de Storage[6]. Ainda não sabemos qual é esse valor, mas podemos procurar transações que o contrato recebeu sem dados de chamada. Transações que apenas transferem ETH sem nenhum dado de chamada (e, portanto, sem método) têm no Etherscan o método `Transfer`. De fato, [a primeira transação que o contrato recebeu](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7) é uma transferência.

Se olharmos para essa transação e clicarmos em **Click to see More** (Clique para ver mais), veremos que os dados de chamada, chamados de dados de entrada (input data), estão de fato vazios (`0x`). Observe também que o valor é 1,559 ETH, o que será relevante mais tarde.

![The call data is empty](calldata-empty.png)

Em seguida, clique na aba **State** (Estado) e expanda o contrato que estamos fazendo engenharia reversa (0x2510...). Você pode ver que `Storage[6]` mudou durante a transação e, se você alterar Hex para **Number** (Número), verá que se tornou 1.559.000.000.000.000.000, o valor transferido em wei (adicionei os pontos para maior clareza), correspondendo ao próximo valor do contrato.

![A mudança em Storage[6]](storage6.png)

Se olharmos para as mudanças de estado causadas por [outras transações `Transfer` do mesmo período](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange), veremos que `Storage[6]` rastreou o valor do contrato por um tempo. Por enquanto, vamos chamá-lo de `Value*`. O asterisco (`*`) nos lembra que ainda não _sabemos_ o que essa variável faz, mas não pode ser apenas para rastrear o valor do contrato porque não há necessidade de usar o armazenamento, que é muito caro, quando você pode obter o saldo de suas contas usando `ADDRESS BALANCE`. O primeiro código de operação empurra o próprio endereço do contrato. O segundo lê o endereço no topo da pilha e o substitui pelo saldo desse endereço.

| Offset | Código de operação | Pilha                                       |
| -----: | ------------------ | ------------------------------------------- |
|     6C | PUSH2 0x0075       | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|     6F | SWAP2              | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|     70 | SWAP1              | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|     71 | PUSH2 0x01a7       | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|     74 | JUMP               |

Continuaremos a rastrear este código no destino do salto.

| Offset | Código de operação | Pilha                                                       |
| -----: | ------------------ | ----------------------------------------------------------- |
|    1A7 | JUMPDEST           | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|    1A8 | PUSH1 0x00         | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|    1AA | DUP3               | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AB | NOT                | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

O `NOT` é bit a bit (bitwise), portanto, inverte o valor de cada bit no valor da chamada.

| Offset | Código de operação | Pilha                                                                        |
| -----: | ------------------ | ---------------------------------------------------------------------------- |
|    1AC | DUP3               | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE          |
|    1AD | GT                 | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE          |
|    1AE | ISZERO             | Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    1AF | PUSH2 0x01df       | 0x01DF Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1B2 | JUMPI              |

Saltamos se `Value*` for menor que 2^256-CALLVALUE-1 ou igual a ele. Isso parece uma lógica para evitar o transbordamento (overflow). E, de fato, vemos que após algumas operações sem sentido (escrever na memória está prestes a ser excluído, por exemplo) no offset 0x01DE, o contrato é revertido se o transbordamento for detectado, o que é um comportamento normal.

Observe que tal transbordamento é extremamente improvável, porque exigiria que o valor da chamada mais `Value*` fosse comparável a 2^256 wei, cerca de 10^59 ETH. [O fornecimento total de ETH, no momento da redação, é inferior a duzentos milhões](https://etherscan.io/stat/supply).

| Offset | Código de operação | Pilha                                     |
| -----: | ------------------ | ----------------------------------------- |
|    1DF | JUMPDEST           | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1E0 | POP                | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E1 | ADD                | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E2 | SWAP1              | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|    1E3 | JUMP               |

Se chegamos aqui, obtemos `Value* + CALLVALUE` e saltamos para o offset 0x75.

| Offset | Código de operação | Pilha                           |
| -----: | ------------------ | ------------------------------- |
|     75 | JUMPDEST           | Value\*+CALLVALUE 0 6 CALLVALUE |
|     76 | SWAP1              | 0 Value\*+CALLVALUE 6 CALLVALUE |
|     77 | SWAP2              | 6 Value\*+CALLVALUE 0 CALLVALUE |
|     78 | SSTORE             | 0 CALLVALUE                     |

Se chegarmos aqui (o que exige que os dados de chamada estejam vazios), adicionamos a `Value*` o valor da chamada. Isso é consistente com o que dizemos que as transações `Transfer` fazem.

| Offset | Código de operação |
| -----: | ------------------ |
|     79 | POP                |
|     7A | POP                |
|     7B | STOP               |

Por fim, limpa a pilha (o que não é necessário) e sinaliza o fim bem-sucedido da transação.

Para resumir tudo, aqui está um fluxograma para o código inicial.

![Entry point flowchart](flowchart-entry.png)

## O manipulador em 0x7C {#the-handler-at-0x7c}

Eu propositalmente não coloquei no título o que esse manipulador faz. O objetivo não é ensinar como esse contrato específico funciona, mas como fazer engenharia reversa de contratos. Você aprenderá o que ele faz da mesma forma que eu, seguindo o código.

Chegamos aqui de vários lugares:

- Se houver dados de chamada de 1, 2 ou 3 bytes (do deslocamento 0x63)
- Se a assinatura do método for desconhecida (dos deslocamentos 0x42 e 0x5D)

| Deslocamento | Código de operação | Pilha                |
| -----: | ------------ | -------------------- |
|     7C | JUMPDEST     |
|     7D | PUSH1 0x00   | 0x00                 |
|     7F | PUSH2 0x009d | 0x9D 0x00            |
|     82 | PUSH1 0x03   | 0x03 0x9D 0x00       |
|     84 | SLOAD        | Storage[3] 0x9D 0x00 |

Esta é outra célula de armazenamento, uma que não consegui encontrar em nenhuma transação, então é mais difícil saber o que significa. O código abaixo deixará isso mais claro.

| Deslocamento | Código de operação                                | Pilha                           |
| -----: | ------------------------------------------------- | ------------------------------- |
|     85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|     9A | AND                                               | Storage[3]-como-endereço 0x9D 0x00 |

Esses códigos de operação truncam o valor que lemos de Storage[3] para 160 bits, o comprimento de um endereço Ethereum.

| Deslocamento | Código de operação | Pilha                           |
| -----: | ------ | ------------------------------- |
|     9B | SWAP1  | 0x9D Storage[3]-como-endereço 0x00 |
|     9C | JUMP   | Storage[3]-como-endereço 0x00      |

Esse salto é supérfluo, já que estamos indo para o próximo código de operação. Este código não é tão eficiente em termos de gás quanto poderia ser.

| Deslocamento | Código de operação | Pilha                           |
| -----: | ---------- | ------------------------------- |
|     9D | JUMPDEST   | Storage[3]-como-endereço 0x00      |
|     9E | SWAP1      | 0x00 Storage[3]-como-endereço      |
|     9F | POP        | Storage[3]-como-endereço           |
|     A0 | PUSH1 0x40 | 0x40 Storage[3]-como-endereço      |
|     A2 | MLOAD      | Mem[0x40] Storage[3]-como-endereço |

Bem no início do código, definimos Mem[0x40] como 0x80. Se procurarmos por 0x40 mais tarde, veremos que não o alteramos - então podemos assumir que é 0x80.

| Deslocamento | Código de operação | Pilha                                             |
| -----: | ------------ | ------------------------------------------------- |
|     A3 | CALLDATASIZE | CALLDATASIZE 0x80 Storage[3]-como-endereço           |
|     A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Storage[3]-como-endereço      |
|     A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-como-endereço |
|     A7 | CALLDATACOPY | 0x80 Storage[3]-como-endereço                        |

Copia todos os dados de chamada para a memória, começando em 0x80.

| Deslocamento | Código de operação | Pilha                                                                            |
| -----: | ------------- | -------------------------------------------------------------------------------- |
|     A8 | PUSH1 0x00    | 0x00 0x80 Storage[3]-como-endereço                                                  |
|     AA | DUP1          | 0x00 0x00 0x80 Storage[3]-como-endereço                                             |
|     AB | CALLDATASIZE  | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-como-endereço                                |
|     AC | DUP4          | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-como-endereço                           |
|     AD | DUP6          | Storage[3]-como-endereço 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-como-endereço     |
|     AE | GAS           | GAS Storage[3]-como-endereço 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-como-endereço |
|     AF | DELEGATE_CALL |

Agora as coisas estão muito mais claras. Este contrato pode atuar como um [proxy](https://blog.openzeppelin.com/proxy-patterns/), chamando o endereço em Storage[3] para fazer o trabalho real. `DELEGATE_CALL` chama um contrato separado, mas permanece no mesmo armazenamento. Isso significa que o contrato delegado, para o qual somos um proxy, acessa o mesmo espaço de armazenamento. Os parâmetros para a chamada são:

- _Gás_: Todo o gás restante
- _Endereço chamado_: Storage[3]-como-endereço
- _Dados de chamada_: Os bytes CALLDATASIZE começando em 0x80, que é onde colocamos os dados de chamada originais
- _Dados de retorno_: Nenhum (0x00 - 0x00) Obteremos os dados de retorno por outros meios (veja abaixo)

| Deslocamento | Código de operação | Pilha                                                                                         |
| -----: | -------------- | --------------------------------------------------------------------------------------------- |
|     B0 | RETURNDATASIZE | RETURNDATASIZE (((sucesso/falha da chamada))) 0x80 Storage[3]-como-endereço                          |
|     B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((sucesso/falha da chamada))) 0x80 Storage[3]-como-endereço           |
|     B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((sucesso/falha da chamada))) 0x80 Storage[3]-como-endereço      |
|     B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((sucesso/falha da chamada))) 0x80 Storage[3]-como-endereço |
|     B5 | RETURNDATACOPY | RETURNDATASIZE (((sucesso/falha da chamada))) 0x80 Storage[3]-como-endereço                          |

Aqui copiamos todos os dados de retorno para o buffer de memória começando em 0x80.

| Deslocamento | Código de operação | Pilha                                                                                                                        |
| -----: | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
|     B6 | DUP2         | (((sucesso/falha da chamada))) RETURNDATASIZE (((sucesso/falha da chamada))) 0x80 Storage[3]-como-endereço                              |
|     B7 | DUP1         | (((sucesso/falha da chamada))) (((sucesso/falha da chamada))) RETURNDATASIZE (((sucesso/falha da chamada))) 0x80 Storage[3]-como-endereço   |
|     B8 | ISZERO       | (((a chamada falhou))) (((sucesso/falha da chamada))) RETURNDATASIZE (((sucesso/falha da chamada))) 0x80 Storage[3]-como-endereço      |
|     B9 | PUSH2 0x00c0 | 0xC0 (((a chamada falhou))) (((sucesso/falha da chamada))) RETURNDATASIZE (((sucesso/falha da chamada))) 0x80 Storage[3]-como-endereço |
|     BC | JUMPI        | (((sucesso/falha da chamada))) RETURNDATASIZE (((sucesso/falha da chamada))) 0x80 Storage[3]-como-endereço                              |
|     BD | DUP2         | RETURNDATASIZE (((sucesso/falha da chamada))) RETURNDATASIZE (((sucesso/falha da chamada))) 0x80 Storage[3]-como-endereço               |
|     BE | DUP5         | 0x80 RETURNDATASIZE (((sucesso/falha da chamada))) RETURNDATASIZE (((sucesso/falha da chamada))) 0x80 Storage[3]-como-endereço          |
|     BF | RETURN       |                                                                                                                              |

Então, após a chamada, copiamos os dados de retorno para o buffer 0x80 - 0x80+RETURNDATASIZE e, se a chamada for bem-sucedida, executamos `RETURN` com exatamente esse buffer.

### Falha no DELEGATECALL {#delegatecall-failed}

Se chegarmos aqui, em 0xC0, significa que o contrato que chamamos foi revertido. Como somos apenas um proxy para esse contrato, queremos retornar os mesmos dados e também reverter.

| Deslocamento | Código de operação | Pilha                                                                                                               |
| -----: | -------- | ------------------------------------------------------------------------------------------------------------------- |
|     C0 | JUMPDEST | (((sucesso/falha da chamada))) RETURNDATASIZE (((sucesso/falha da chamada))) 0x80 Storage[3]-como-endereço                     |
|     C1 | DUP2     | RETURNDATASIZE (((sucesso/falha da chamada))) RETURNDATASIZE (((sucesso/falha da chamada))) 0x80 Storage[3]-como-endereço      |
|     C2 | DUP5     | 0x80 RETURNDATASIZE (((sucesso/falha da chamada))) RETURNDATASIZE (((sucesso/falha da chamada))) 0x80 Storage[3]-como-endereço |
|     C3 | REVERT   |

Então executamos `REVERT` com o mesmo buffer que usamos para `RETURN` anteriormente: 0x80 - 0x80+RETURNDATASIZE

![Call to proxy flowchart](flowchart-proxy.png)

## Chamadas de ABI {#abi-calls}

Se o tamanho dos dados de chamada for de quatro bytes ou mais, isso pode ser uma chamada de ABI válida.

| Offset | Código de operação | Pilha                                             |
| -----: | ------------------ | ------------------------------------------------- |
|      D | PUSH1 0x00         | 0x00                                              |
|      F | CALLDATALOAD       | (((Primeira palavra (256 bits) dos dados de chamada)))      |
|     10 | PUSH1 0xe0         | 0xE0 (((Primeira palavra (256 bits) dos dados de chamada))) |
|     12 | SHR                | (((primeiros 32 bits (4 bytes) dos dados de chamada)))    |

O Etherscan nos diz que `1C` é um código de operação desconhecido, porque [ele foi adicionado depois que o Etherscan escreveu esse recurso](https://eips.ethereum.org/EIPS/eip-145) e eles não o atualizaram. Uma [tabela de códigos de operação atualizada](https://github.com/wolflo/evm-opcodes) nos mostra que isso é um deslocamento para a direita

| Offset | Código de operação | Pilha                                                                                                    |
| -----: | ------------------ | -------------------------------------------------------------------------------------------------------- |
|     13 | DUP1               | (((primeiros 32 bits (4 bytes) dos dados de chamada))) (((primeiros 32 bits (4 bytes) dos dados de chamada)))            |
|     14 | PUSH4 0x3cd8045e   | 0x3CD8045E (((primeiros 32 bits (4 bytes) dos dados de chamada))) (((primeiros 32 bits (4 bytes) dos dados de chamada))) |
|     19 | GT                 | 0x3CD8045E>primeiros-32-bits-dos-dados-de-chamada (((primeiros 32 bits (4 bytes) dos dados de chamada)))                 |
|     1A | PUSH2 0x0043       | 0x43 0x3CD8045E>primeiros-32-bits-dos-dados-de-chamada (((primeiros 32 bits (4 bytes) dos dados de chamada)))            |
|     1D | JUMPI              | (((primeiros 32 bits (4 bytes) dos dados de chamada)))                                                           |

Dividir os testes de correspondência de assinatura de método em dois dessa forma economiza metade dos testes, em média. O código que segue imediatamente a isso e o código em 0x43 seguem o mesmo padrão: `DUP1` os primeiros 32 bits dos dados de chamada, `PUSH4 (((method signature>`, executa `EQ` para verificar a igualdade e, em seguida, `JUMPI` se a assinatura do método corresponder. Aqui estão as assinaturas de método, seus endereços e, se conhecida, [a definição de método correspondente](https://www.4byte.directory/):

| Método                                                                                 | Assinatura do método | Offset para saltar |
| -------------------------------------------------------------------------------------- | -------------------- | ------------------ |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e           | 0x0103             |
| ???                                                                                    | 0x81e580d3           | 0x0138             |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4           | 0x0158             |
| ???                                                                                    | 0x1f135823           | 0x00C4             |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab           | 0x00ED             |

Se nenhuma correspondência for encontrada, o código salta para [o manipulador de proxy em 0x7C](#the-handler-at-0x7c), na esperança de que o contrato para o qual somos um proxy tenha uma correspondência.

![ABI calls flowchart](flowchart-abi.png)

## splitter() {#splitter}

| Offset | Código de operação | Pilha                         |
| -----: | ------------------ | ----------------------------- |
|    103 | JUMPDEST           |
|    104 | CALLVALUE          | CALLVALUE                     |
|    105 | DUP1               | CALLVALUE CALLVALUE           |
|    106 | ISZERO             | CALLVALUE==0 CALLVALUE        |
|    107 | PUSH2 0x010f       | 0x010F CALLVALUE==0 CALLVALUE |
|    10A | JUMPI              | CALLVALUE                     |
|    10B | PUSH1 0x00         | 0x00 CALLVALUE                |
|    10D | DUP1               | 0x00 0x00 CALLVALUE           |
|    10E | REVERT             |

A primeira coisa que esta função faz é verificar se a chamada não enviou nenhum ETH. Esta função não é [`payable`](https://solidity-by-example.org/payable/). Se alguém nos enviou ETH, isso deve ser um erro e queremos `REVERT` para evitar ter esse ETH onde eles não possam recuperá-lo.

| Offset | Código de operação                                | Pilha                                                                       |
| -----: | ------------------------------------------------- | --------------------------------------------------------------------------- |
|    10F | JUMPDEST                                          |
|    110 | POP                                               |
|    111 | PUSH1 0x03                                        | 0x03                                                                        |
|    113 | SLOAD                                             | (((Storage[3] também conhecido como o contrato para o qual somos um proxy))) |
|    114 | PUSH1 0x40                                        | 0x40 (((Storage[3] também conhecido como o contrato para o qual somos um proxy))) |
|    116 | MLOAD                                             | 0x80 (((Storage[3] também conhecido como o contrato para o qual somos um proxy))) |
|    117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] também conhecido como o contrato para o qual somos um proxy))) |
|    12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] também conhecido como o contrato para o qual somos um proxy))) |
|    12D | SWAP2                                             | (((Storage[3] também conhecido como o contrato para o qual somos um proxy))) 0xFF...FF 0x80 |
|    12E | AND                                               | ProxyAddr 0x80                                                              |
|    12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                         |
|    130 | MSTORE                                            | 0x80                                                                        |

E 0x80 agora contém o endereço do proxy

| Offset | Código de operação | Pilha     |
| -----: | ------------------ | --------- |
|    131 | PUSH1 0x20         | 0x20 0x80 |
|    133 | ADD                | 0xA0      |
|    134 | PUSH2 0x00e4       | 0xE4 0xA0 |
|    137 | JUMP               | 0xA0      |

### O código E4 {#the-e4-code}

Esta é a primeira vez que vemos essas linhas, mas elas são compartilhadas com outros métodos (veja abaixo). Então, chamaremos o valor na pilha de X, e apenas lembre-se de que em `splitter()` o valor deste X é 0xA0.

| Offset | Código de operação | Pilha       |
| -----: | ------------------ | ----------- |
|     E4 | JUMPDEST           | X           |
|     E5 | PUSH1 0x40         | 0x40 X      |
|     E7 | MLOAD              | 0x80 X      |
|     E8 | DUP1               | 0x80 0x80 X |
|     E9 | SWAP2              | X 0x80 0x80 |
|     EA | SUB                | X-0x80 0x80 |
|     EB | SWAP1              | 0x80 X-0x80 |
|     EC | RETURN             |

Portanto, este código recebe um ponteiro de memória na pilha (X) e faz com que o contrato `RETURN` com um buffer que é 0x80 - X.

No caso de `splitter()`, isso retorna o endereço para o qual somos um proxy. `RETURN` retorna o buffer em 0x80-0x9F, que é onde escrevemos esses dados (offset 0x130 acima).

## currentWindow() {#currentwindow}

O código nos offsets 0x158-0x163 é idêntico ao que vimos em 0x103-0x10E em `splitter()` (exceto pelo destino `JUMPI`), então sabemos que `currentWindow()` também não é `payable`.

| Offset | Código de operação | Pilha                |
| -----: | ------------------ | -------------------- |
|    164 | JUMPDEST           |
|    165 | POP                |
|    166 | PUSH2 0x00da       | 0xDA                 |
|    169 | PUSH1 0x01         | 0x01 0xDA            |
|    16B | SLOAD              | Storage[1] 0xDA      |
|    16C | DUP2               | 0xDA Storage[1] 0xDA |
|    16D | JUMP               | Storage[1] 0xDA      |

### O código DA {#the-da-code}

Este código também é compartilhado com outros métodos. Portanto, chamaremos o valor na pilha de Y e apenas lembraremos que em `currentWindow()` o valor deste Y é Storage[1].

| Offset | Código de operação | Pilha            |
| -----: | ------------------ | ---------------- |
|     DA | JUMPDEST           | Y 0xDA           |
|     DB | PUSH1 0x40         | 0x40 Y 0xDA      |
|     DD | MLOAD              | 0x80 Y 0xDA      |
|     DE | SWAP1              | Y 0x80 0xDA      |
|     DF | DUP2               | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE             | 0x80 0xDA        |

Escreve Y em 0x80-0x9F.

| Offset | Código de operação | Pilha          |
| -----: | ------------------ | -------------- |
|     E1 | PUSH1 0x20         | 0x20 0x80 0xDA |
|     E3 | ADD                | 0xA0 0xDA      |

E o restante já foi explicado [acima](#the-e4-code). Portanto, os saltos para 0xDA escrevem o topo da pilha (Y) em 0x80-0x9F e retornam esse valor. No caso de `currentWindow()`, ele retorna Storage[1].

## merkleRoot() {#merkleroot}

O código nos offsets 0xED-0xF8 é idêntico ao que vimos em 0x103-0x10E em `splitter()` (exceto pelo destino `JUMPI`), então sabemos que `merkleRoot()` também não é `payable`.

| Offset | Código de operação | Pilha                |
| -----: | ------------ | -------------------- |
|     F9 | JUMPDEST     |
|     FA | POP          |
|     FB | PUSH2 0x00da | 0xDA                 |
|     FE | PUSH1 0x00   | 0x00 0xDA            |
|    100 | SLOAD        | Storage[0] 0xDA      |
|    101 | DUP2         | 0xDA Storage[0] 0xDA |
|    102 | JUMP         | Storage[0] 0xDA      |

O que acontece após o salto [nós já descobrimos](#the-da-code). Portanto, `merkleRoot()` retorna Storage[0].

## 0x81e580d3 {#0x81e580d3}

O código nos offsets 0x138-0x143 é idêntico ao que vimos em 0x103-0x10E em `splitter()` (exceto pelo destino `JUMPI`), então sabemos que esta função também não é `payable`.

| Offset | Código de operação | Pilha                                                        |
| -----: | ------------------ | ------------------------------------------------------------ |
|    144 | JUMPDEST           |
|    145 | POP                |
|    146 | PUSH2 0x00da       | 0xDA                                                         |
|    149 | PUSH2 0x0153       | 0x0153 0xDA                                                  |
|    14C | CALLDATASIZE       | CALLDATASIZE 0x0153 0xDA                                     |
|    14D | PUSH1 0x04         | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    14F | PUSH2 0x018f       | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                         |
|    152 | JUMP               | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    18F | JUMPDEST           | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    190 | PUSH1 0x00         | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|    192 | PUSH1 0x20         | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                      |
|    194 | DUP3               | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                 |
|    195 | DUP5               | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA    |
|    196 | SUB                | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    197 | SLT                | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|    198 | ISZERO             | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|    199 | PUSH2 0x01a0       | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19C | JUMPI              | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

Parece que esta função recebe pelo menos 32 bytes (uma palavra) de dados de chamada.

| Offset | Código de operação | Pilha                                        |
| -----: | ------------------ | -------------------------------------------- |
|    19D | DUP1               | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2               | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERT             |

Se ela não receber os dados de chamada, a transação é revertida sem nenhum dado de retorno.

Vamos ver o que acontece se a função _receber_ os dados de chamada de que precisa.

| Offset | Código de operação | Pilha                                    |
| -----: | ------------------ | ---------------------------------------- |
|    1A0 | JUMPDEST           | 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    1A1 | POP                | 0x04 CALLDATASIZE 0x0153 0xDA            |
|    1A2 | CALLDATALOAD       | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` é a primeira palavra dos dados de chamada _após_ a assinatura do método

| Offset | Código de operação | Pilha                                                                        |
| -----: | ------------------ | ---------------------------------------------------------------------------- |
|    1A3 | SWAP2              | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                     |
|    1A4 | SWAP1              | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                     |
|    1A5 | POP                | 0x0153 calldataload(4) 0xDA                                                  |
|    1A6 | JUMP               | calldataload(4) 0xDA                                                         |
|    153 | JUMPDEST           | calldataload(4) 0xDA                                                         |
|    154 | PUSH2 0x016e       | 0x016E calldataload(4) 0xDA                                                  |
|    157 | JUMP               | calldataload(4) 0xDA                                                         |
|    16E | JUMPDEST           | calldataload(4) 0xDA                                                         |
|    16F | PUSH1 0x04         | 0x04 calldataload(4) 0xDA                                                    |
|    171 | DUP2               | calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|    172 | DUP2               | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                               |
|    173 | SLOAD              | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                         |
|    174 | DUP2               | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    175 | LT                 | calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e       | 0x017EC calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI              | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

Se a primeira palavra não for menor que Storage[4], a função falha. Ela é revertida sem nenhum valor retornado:

| Offset | Código de operação | Pilha         |
| -----: | ------------------ | ------------- |
|    17A | PUSH1 0x00         | 0x00 ...      |
|    17C | DUP1               | 0x00 0x00 ... |
|    17D | REVERT             |

Se o calldataload(4) for menor que Storage[4], obtemos este código:

| Offset | Código de operação | Pilha                                               |
| -----: | ------------------ | --------------------------------------------------- |
|    17E | JUMPDEST           | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00         | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2              | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3               | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE             | calldataload(4) 0x00 calldataload(4) 0xDA           |

E os locais de memória 0x00-0x1F agora contêm os dados 0x04 (0x00-0x1E são todos zeros, 0x1F é quatro)

| Offset | Código de operação | Pilha                                                                   |
| -----: | ------------------ | ----------------------------------------------------------------------- |
|    184 | PUSH1 0x20         | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|    186 | SWAP1              | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|    187 | SWAP2              | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|    188 | SHA3               | (((SHA3 de 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA            |
|    189 | ADD                | (((SHA3 de 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA            |
|    18A | SLOAD              | Storage[(((SHA3 de 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

Portanto, há uma tabela de pesquisa (lookup table) no armazenamento, que começa no SHA3 de 0x000...0004 e tem uma entrada para cada valor legítimo de dados de chamada (valor abaixo de Storage[4]).

| Offset | Código de operação | Pilha                                                                   |
| -----: | ------------------ | ----------------------------------------------------------------------- |
|    18B | SWAP1              | calldataload(4) Storage[(((SHA3 de 0x00-0x1F))) + calldataload(4)] 0xDA |
|    18C | POP                | Storage[(((SHA3 de 0x00-0x1F))) + calldataload(4)] 0xDA                 |
|    18D | DUP2               | 0xDA Storage[(((SHA3 de 0x00-0x1F))) + calldataload(4)] 0xDA            |
|    18E | JUMP               | Storage[(((SHA3 de 0x00-0x1F))) + calldataload(4)] 0xDA                 |

Já sabemos o que [o código no offset 0xDA](#the-da-code) faz, ele retorna o valor do topo da pilha para o chamador. Portanto, esta função retorna o valor da tabela de pesquisa para o chamador.

## 0x1f135823 {#0x1f135823}

O código nos deslocamentos 0xC4-0xCF é idêntico ao que vimos em 0x103-0x10E em `splitter()` (exceto pelo destino `JUMPI`), então sabemos que esta função também não é `payable`.

| Deslocamento | Código de operação | Pilha             |
| -----------: | ------------------ | ----------------- |
|           D0 | JUMPDEST           |
|           D1 | POP                |
|           D2 | PUSH2 0x00da       | 0xDA              |
|           D5 | PUSH1 0x06         | 0x06 0xDA         |
|           D7 | SLOAD              | Value\* 0xDA      |
|           D8 | DUP2               | 0xDA Value\* 0xDA |
|           D9 | JUMP               | Value\* 0xDA      |

Já sabemos o que [o código no deslocamento 0xDA](#the-da-code) faz, ele retorna o valor no topo da pilha para o chamador. Portanto, esta função retorna `Value*`.

### Resumo dos métodos {#method-summary}

Você sente que entende o contrato neste momento? Eu não. Até agora, temos estes métodos:

| Método                            | Significado                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| Transferência                     | Aceita o valor fornecido pela chamada e aumenta `Value*` nesse valor |
| [splitter()](#splitter)           | Retorna Storage[3], o endereço do proxy                                              |
| [currentWindow()](#currentwindow) | Retorna Storage[1]                                                                   |
| [merkleRoot()](#merkleroot)        | Retorna Storage[0]                                                                   |
| [0x81e580d3](#0x81e580d3)         | Retorna o valor de uma tabela de busca, desde que o parâmetro seja menor que Storage[4] |
| [0x1f135823](#0x1f135823)         | Retorna Storage[6], também conhecido como Value\*                                    |

Mas sabemos que qualquer outra funcionalidade é fornecida pelo contrato em Storage[3]. Talvez se soubéssemos qual é esse contrato, isso nos daria uma pista. Felizmente, esta é a blockchain e tudo é conhecido, pelo menos em teoria. Não vimos nenhum método que defina Storage[3], então ele deve ter sido definido pelo construtor.

## O Construtor {#the-constructor}

Quando [analisamos um contrato](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f), também podemos ver a transação que o criou.

![Click the create transaction](create-tx.png)

Se clicarmos nessa transação, e depois na aba **Estado**, podemos ver os valores iniciais dos parâmetros. Especificamente, podemos ver que Storage[3] contém [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761). Esse contrato deve conter a funcionalidade ausente. Podemos entendê-lo usando as mesmas ferramentas que usamos para o contrato que estamos investigando.

## O contrato proxy {#the-proxy-contract}

Usando as mesmas técnicas que usamos para o contrato original acima, podemos ver que o contrato reverte se:

- Houver qualquer ETH anexado à chamada (0x05-0x0F)
- O tamanho dos dados de chamada for menor que quatro (0x10-0x19 e 0xBE-0xC2)

E que os métodos que ele suporta são:

| Método                                                                                                          | Assinatura do método         | Deslocamento para salto |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | ----------------------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)          | 0x8ffb5c97                   | 0x0135                  |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | 0xd2ef0795                   | 0x0151                  |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4                  |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | 0x338b1d31                   | 0x0110                  |
| ???                                                                                                             | 0x3f26479e                   | 0x0118                  |
| ???                                                                                                             | 0x1e7df9d3                   | 0x00C3                  |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [0xba0bafb4](#currentwindow) | 0x0148                  |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [0x2eb4a7ab](#merkleroot)    | 0x0107                  |
| ???                                                                                                             | [0x81e580d3](#0x81e580d3)    | 0x0122                  |
| ???                                                                                                             | [0x1f135823](#0x1f135823)    | 0x00D8                  |

Podemos ignorar os quatro métodos inferiores porque nunca chegaremos a eles. Suas assinaturas são tais que nosso contrato original cuida deles por si só (você pode clicar nas assinaturas para ver os detalhes acima), então eles devem ser [métodos que foram substituídos](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf).

Um dos métodos restantes é `claim(<params>)` e outro é `isClaimed(<params>)`, então parece ser um contrato de airdrop. Em vez de passar pelo resto código de operação por código de operação, podemos [tentar o descompilador](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761), que produz resultados utilizáveis para três funções deste contrato. A engenharia reversa das outras é deixada como um exercício para o leitor.

### scaleAmountByPercentage {#scaleamountbypercentage}

Isto é o que o descompilador nos dá para esta função:

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

O primeiro `require` testa se os dados de chamada têm, além dos quatro bytes da assinatura da função, pelo menos 64 bytes, o suficiente para os dois parâmetros. Se não, então obviamente há algo errado.

A instrução `if` parece verificar se `_param1` não é zero e se `_param1 * _param2` não é negativo. Provavelmente é para evitar casos de estouro de limite (wrap around).

Por fim, a função retorna um valor dimensionado.

### claim {#claim}

O código que o descompilador cria é complexo e nem tudo é relevante para nós. Vou pular parte dele para focar nas linhas que acredito fornecerem informações úteis

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

Vemos aqui duas coisas importantes:

- `_param2`, embora seja declarado como um `uint256`, na verdade é um endereço
- `_param1` é a janela sendo reivindicada, que deve ser `currentWindow` ou anterior.

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

Então agora sabemos que Storage[5] é um array de janelas e endereços, e se o endereço reivindicou a recompensa para aquela janela.

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

Sabemos que `unknown2eb4a7ab` é na verdade a função `merkleRoot()`, então este código parece estar verificando uma [prova de Merkle](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5). Isso significa que `_param4` é uma prova de Merkle.

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

É assim que um contrato transfere seu próprio ETH para outro endereço (contrato ou de propriedade externa). Ele o chama com um valor que é a quantia a ser transferida. Então parece que este é um airdrop de ETH.

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

As duas linhas inferiores nos dizem que Storage[2] também é um contrato que chamamos. Se [olharmos para a transação do construtor](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange), veremos que este contrato é [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), um contrato de ether empacotado (weth) [cujo código-fonte foi enviado para o Etherscan](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code).

Então parece que o contrato tenta enviar ETH para `_param2`. Se conseguir, ótimo. Se não, ele tenta enviar [WETH](https://weth.tkn.eth.limo/). Se `_param2` for uma conta de propriedade externa (EOA), então ela sempre pode receber ETH, mas contratos podem se recusar a receber ETH. No entanto, WETH é ERC-20 e os contratos não podem se recusar a aceitá-lo.

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

No final da função, vemos um log sendo gerado. [Observe os logs gerados](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) e filtre pelo tópico que começa com `0xdbd5...`. Se [clicarmos em uma das transações que gerou tal entrada](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274), veremos que de fato parece uma reivindicação - a conta enviou uma mensagem para o contrato que estamos fazendo engenharia reversa e, em troca, recebeu ETH.

![A claim transaction](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

Esta função é muito semelhante a [`claim`](#claim) acima. Ela também verifica uma prova de Merkle, tenta transferir ETH para o primeiro e produz o mesmo tipo de log.

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

A principal diferença é que o primeiro parâmetro, a janela para sacar, não está lá. Em vez disso, há um loop sobre todas as janelas que poderiam ser reivindicadas.

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

Então parece uma variante de `claim` que reivindica todas as janelas.

## Conclusão {#conclusion}

A esta altura, você já deve saber como entender contratos cujo código-fonte não está disponível, usando os códigos de operação ou (quando funciona) o descompilador. Como é evidente pela extensão deste artigo, a engenharia reversa de um contrato não é trivial, mas em um sistema onde a segurança é essencial, é uma habilidade importante ser capaz de verificar se os contratos funcionam conforme o prometido.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).