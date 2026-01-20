---
title: Compreendendo as especificações da EVM do Yellow Paper
description: Compreendendo a parte do Yellow Paper, as especificações formais do Ethereum, que explica a máquina virtual Ethereum (EVM).
author: "qbzzt"
tags: [ "evm" ]
skill: intermediate
lang: pt-br
published: 15-05-2022
---

[O Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) é a especificação formal para o Ethereum. Exceto onde alterado pelo [processo EIP](/eips/), ele contém a descrição exata de como tudo funciona. Ele é escrito como um artigo matemático, que inclui terminologia com a qual os programadores podem não estar familiarizados. Neste artigo, você aprenderá a lê-lo e, por extensão, outros artigos matemáticos relacionados.

## Qual Yellow Paper? {#which-yellow-paper}

Como quase tudo no Ethereum, o Yellow Paper evolui com o tempo. Para poder me referir a uma versão específica, fiz o upload da [versão atual no momento da escrita](yellow-paper-berlin.pdf). Os números de seção, página e equação que uso se referirão a essa versão. É uma boa ideia mantê-lo aberto em uma janela diferente enquanto lê este documento.

### Por que a EVM? {#why-the-evm}

O yellow paper original foi escrito logo no início do desenvolvimento do Ethereum. Ele descreve o mecanismo de consenso original baseado em prova de trabalho que foi originalmente usado para proteger a rede. No entanto, o Ethereum desativou a prova de trabalho e começou a usar o consenso baseado em prova de participação em setembro de 2022. Este tutorial se concentrará nas partes do yellow paper que definem a máquina virtual Ethereum. A EVM permaneceu inalterada com a transição para a prova de participação (exceto pelo valor de retorno do opcode DIFFICULTY).

## 9 Modelo de execução {#9-execution-model}

Esta seção (p. 12-14) inclui a maior parte da definição da EVM.

O termo _estado do sistema_ inclui tudo que você precisa saber sobre o sistema para executá-lo. Em um computador típico, isso significa a memória, o conteúdo dos registradores, etc.

Uma [máquina de Turing](https://en.wikipedia.org/wiki/Turing_machine) é um modelo computacional. Essencialmente, é uma versão simplificada de um computador, que comprovadamente tem a mesma capacidade de executar computações que um computador normal pode (tudo o que um computador pode calcular, uma máquina de Turing também pode, e vice-versa). Este modelo facilita a prova de vários teoremas sobre o que é e o que não é computável.

O termo [Turing-completo](https://en.wikipedia.org/wiki/Turing_completeness) significa um computador que pode executar os mesmos cálculos que uma máquina de Turing. As máquinas de Turing podem entrar em loops infinitos, mas a EVM não pode porque ficaria sem gás, então ela é apenas quasi-Turing-completa.

## 9.1 Conceitos básicos {#91-basics}

Esta seção apresenta os conceitos básicos da EVM e como ela se compara a outros modelos computacionais.

Uma [máquina de pilha](https://en.wikipedia.org/wiki/Stack_machine) é um computador que armazena dados intermediários não em registradores, mas em uma [**pilha**](https://en.wikipedia.org/wiki/Stack_\(abstract_data_type\)). Essa é a arquitetura preferida para máquinas virtuais porque é fácil de implementar, o que significa que bugs e vulnerabilidades de segurança são muito menos prováveis. A memória na pilha é dividida em palavras de 256 bits. Isso foi escolhido por ser conveniente para as principais operações criptográficas do Ethereum, como o hashing Keccak-256 e os cálculos de curva elíptica. O tamanho máximo da pilha é de 1024 itens (1024 x 256 bits). Quando os códigos de operação são executados, eles geralmente obtêm seus parâmetros da pilha. Existem códigos de operação especificamente para reorganizar elementos na pilha, como `POP` (remove o item do topo da pilha), `DUP_N` (duplica o N-ésimo item na pilha), etc.

A EVM também tem um espaço volátil chamado **memória** que é usado para armazenar dados durante a execução. Esta memória é organizada em palavras de 32 bytes. Todas as posições de memória são inicializadas com zero. Se você executar este código [Yul](https://docs.soliditylang.org/en/latest/yul.html) para adicionar uma palavra à memória, ele preencherá 32 bytes de memória preenchendo o espaço vazio na palavra com zeros, ou seja, ele cria uma palavra - com zeros nas posições 0-29, 0x60 na 30, e 0xA7 na 31.

```yul
mstore(0, 0x60A7)
```

`mstore` é um dos três códigos de operação que a EVM fornece para interagir com a memória - ele carrega uma palavra na memória. Os outros dois são `mstore8`, que carrega um único byte na memória, e `mload`, que move uma palavra da memória para a pilha.

A EVM também tem um modelo de **armazenamento** não volátil separado que é mantido como parte do estado do sistema - essa memória é organizada em matrizes de palavras (em oposição a matrizes de bytes endereçáveis por palavra na pilha). Este armazenamento é onde os contratos mantêm dados persistentes - um contrato só pode interagir com seu próprio armazenamento. O armazenamento é organizado em mapeamentos de chave-valor.

Embora não seja mencionado nesta seção do Yellow Paper, também é útil saber que existe um quarto tipo de memória. **Calldata** é uma memória somente de leitura endereçável por byte, usada para armazenar o valor passado com o parâmetro `data` de uma transação. A EVM tem códigos de operação específicos para gerenciar `calldata`. `calldatasize` retorna o tamanho dos dados. `calldataload` carrega os dados na pilha. `calldatacopy` copia os dados para a memória.

A [arquitetura de Von Neumann](https://en.wikipedia.org/wiki/Von_Neumann_architecture) padrão armazena código e dados na mesma memória. A EVM não segue este padrão por razões de segurança - o compartilhamento de memória volátil torna possível alterar o código do programa. Em vez disso, o código é salvo no armazenamento.

Há apenas dois casos em que o código é executado a partir da memória:

- Quando um contrato cria outro contrato (usando [`CREATE`](https://www.evm.codes/#f0) ou [`CREATE2`](https://www.evm.codes/#f5)), o código para o construtor do contrato vem da memória.
- Durante a criação de _qualquer_ contrato, o código do construtor é executado e, em seguida, retorna com o código do contrato real, também da memória.

O termo execução excepcional significa uma exceção que faz com que a execução do contrato atual seja interrompida.

## 9.2 Visão geral das taxas {#92-fees-overview}

Esta seção explica como as taxas de gás são calculadas. Existem três custos:

### Custo do opcode {#opcode-cost}

O custo inerente do opcode específico. Para obter este valor, encontre o grupo de custo do opcode no Apêndice H (p. 28, sob a equação (327)) e encontre o grupo de custo na equação (324). Isso fornece uma função de custo que, na maioria dos casos, usa parâmetros do Apêndice G (p. 27).

Por exemplo, o opcode [`CALLDATACOPY`](https://www.evm.codes/#37) é um membro do grupo _W<sub>copy</sub>_. O custo do opcode para esse grupo é _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉_. Olhando para o Apêndice G, vemos que ambas as constantes são 3, o que nos dá _3+3×⌈μ<sub>s</sub>[2]÷32⌉_.

Ainda precisamos decifrar a expressão _⌈μ<sub>s</sub>[2]÷32⌉_. A parte mais externa, _⌈ \<value\> ⌉_, é a função teto, uma função que, dado um valor, retorna o menor inteiro que não seja menor que o valor. Por exemplo, _⌈2.5⌉ = ⌈3⌉ = 3_. A parte interna é _μ<sub>s</sub>[2]÷32_. Observando a seção 3 (Convenções) na p. 3, _μ_ é o estado da máquina. O estado da máquina é definido na seção 9.4.1 na p. 13. De acordo com essa seção, um dos parâmetros do estado da máquina é _s_ para a pilha. Juntando tudo, parece que _μ<sub>s</sub>[2]_ é a posição nº 2 na pilha. Olhando para o [opcode](https://www.evm.codes/#37), a posição nº 2 na pilha é o tamanho dos dados em bytes. Olhando para os outros códigos de operação no grupo W<sub>copy</sub>, [`CODECOPY`](https://www.evm.codes/#39) e [`RETURNDATACOPY`](https://www.evm.codes/#3e), eles também têm um tamanho de dados na mesma posição. Portanto, _⌈μ<sub>s</sub>[2]÷32⌉_ é o número de palavras de 32 bytes necessárias para armazenar os dados que estão sendo copiados. Juntando tudo, o custo inerente do [`CALLDATACOPY`](https://www.evm.codes/#37) é de 3 de gás mais 3 por palavra de dados sendo copiada.

### Custo de execução {#running-cost}

O custo de executar o código que estamos chamando.

- No caso de [`CREATE`](https://www.evm.codes/#f0) e [`CREATE2`](https://www.evm.codes/#f5), o construtor do novo contrato.
- No caso de [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa) ou [`DELEGATECALL`](https://www.evm.codes/#f4), o contrato que chamamos.

### Custo de expansão da memória {#expanding-memory-cost}

O custo de expandir a memória (se necessário).

Na equação 324, esse valor é escrito como _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_. Olhando novamente para a seção 9.4.1, vemos que _μ<sub>i</sub>_ é o número de palavras na memória. Portanto, _μ<sub>i</sub>_ é o número de palavras na memória antes do opcode e _μ<sub>i</sub>'_ é o número de palavras na memória depois do opcode.

A função _C<sub>mem</sub>_ é definida na equação 326: _C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ é a função piso, uma função que, dado um valor, retorna o maior inteiro que não seja maior que o valor. Por exemplo, _⌊2.5⌋ = ⌊2⌋ = 2._ Quando _a < √512_, _a<sup>2</sup> < 512_, e o resultado da função piso é zero. Portanto, para as primeiras 22 palavras (704 bytes), o custo aumenta linearmente com o número de palavras de memória necessárias. Além desse ponto, _⌊a<sup>2</sup> ÷ 512⌋_ é positivo. Quando a memória necessária é alta o suficiente, o custo do gás é proporcional ao quadrado da quantidade de memória.

**Observação**: esses fatores influenciam apenas o custo de gás _inerente_ - não leva em conta o mercado de taxas ou gorjetas para validadores que determinam quanto um usuário final deve pagar - este é apenas o custo bruto de executar uma operação específica na EVM.

[Leia mais sobre gás](/developers/docs/gas/).

## 9.3 Ambiente de execução {#93-execution-env}

O ambiente de execução é uma tupla, _I_, que inclui informações que não fazem parte do estado da blockchain ou da EVM.

| Parâmetro       | Opcode para acessar os dados                                                                                          | Código Solidity para acessar os dados                    |
| --------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                                | `address(this)`                                          |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                                 | `tx.origin`                                              |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                               | `tx.gasprice`                                            |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35), etc.                                                     | `msg.data`                                               |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                                 | `msg.sender`                                             |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                              | `msg.value`                                              |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                               | `address(this).code`                                     |
| _I<sub>H</sub>_ | Campos do cabeçalho do bloco, como [`NUMBER`](https://www.evm.codes/#43) e [`DIFFICULTY`](https://www.evm.codes/#44)  | `block.number`, `block.difficulty`, etc. |
| _I<sub>e</sub>_ | Profundidade da pilha de chamadas para chamadas entre contratos (incluindo a criação de contratos) |                                                          |
| _I<sub>w</sub>_ | A EVM tem permissão para alterar o estado ou está sendo executada estaticamente                                       |                                                          |

Alguns outros parâmetros são necessários para entender o resto da seção 9:

| Parâmetro | Definido na seção                                              | Significado                                                                                                                                                                                                                                                                        |
| --------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _σ_       | 2 (p. 2, equação 1)         | O estado da blockchain                                                                                                                                                                                                                                                             |
| _g_       | 9.3 (p. 13) | Gás restante                                                                                                                                                                                                                                                                       |
| _A_       | 6.1 (p. 8)  | Sub-estado acumulado (alterações agendadas para quando a transação terminar)                                                                                                                                                                                    |
| _o_       | 9.3 (p. 13) | Saída - o resultado retornado no caso de transação interna (quando um contrato chama outro) e chamadas para funções de visualização (quando você está apenas solicitando informações, então não há necessidade de esperar por uma transação) |

## 9.4 Visão geral da execução {#94-execution-overview}

Agora que temos todos os preliminares, podemos finalmente começar a trabalhar em como a EVM funciona.

As equações 137-142 nos dão as condições iniciais para executar a EVM:

| Símbolo          | Valor inicial                                                                    | Significado                                                                                                                                                                                                                                                                                        |
| ---------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _μ<sub>g</sub>_  | _g_                                                                              | Gás restante                                                                                                                                                                                                                                                                                       |
| _μ<sub>pc</sub>_ | _0_                                                                              | Contador de programa, o endereço da próxima instrução a ser executada                                                                                                                                                                                                                              |
| _μ<sub>m</sub>_  | _(0, 0, ...)_ | Memória, inicializada com todos os zeros                                                                                                                                                                                                                                                           |
| _μ<sub>i</sub>_  | _0_                                                                              | Local de memória mais alto usado                                                                                                                                                                                                                                                                   |
| _μ<sub>s</sub>_  | _()_                                                          | A pilha, inicialmente vazia                                                                                                                                                                                                                                                                        |
| _μ<sub>o</sub>_  | _∅_                                                                              | A saída, conjunto vazio até pararmos com dados de retorno ([`RETURN`](https://www.evm.codes/#f3) ou [`REVERT`](https://www.evm.codes/#fd)) ou sem eles ([`STOP`](https://www.evm.codes/#00) ou [`SELFDESTRUCT`](https://www.evm.codes/#ff)). |

A equação 143 nos diz que existem quatro condições possíveis em cada ponto no tempo durante a execução e o que fazer com elas:

1. `Z(σ,μ,A,I)`. Z representa uma função que testa se uma operação cria uma transição de estado inválida (consulte a [interrupção excepcional](#942-exceptional-halting)). Se for avaliado como True, o novo estado é idêntico ao antigo (exceto que o gás é queimado) porque as alterações não foram implementadas.
2. Se o opcode que está sendo executado for [`REVERT`](https://www.evm.codes/#fd), o novo estado é o mesmo que o estado antigo, e um pouco de gás é perdido.
3. Se a sequência de operações terminar, conforme sinalizado por um [`RETURN`](https://www.evm.codes/#f3)), o estado é atualizado para o novo estado.
4. Se não estivermos em uma das condições finais 1-3, continue a execução.

## 9.4.1 Estado da máquina {#941-machine-state}

Esta seção explica o estado da máquina com mais detalhes. Isso especifica que _w_ é o opcode atual. Se _μ<sub>pc</sub>_ for menor que _||I<sub>b</sub>||_, o comprimento do código, então esse byte (_I<sub>b</sub>[μ<sub>pc</sub>]_) é o opcode. Caso contrário, o opcode é definido como [`STOP`](https://www.evm.codes/#00).

Como esta é uma [máquina de pilha](https://en.wikipedia.org/wiki/Stack_machine), precisamos rastrear o número de itens retirados (_δ_) e inseridos (_α_) por cada opcode.

## 9.4.2 Interrupção Excepcional {#942-exceptional-halt}

Esta seção define a função _Z_, que especifica quando temos uma terminação anormal. Esta é uma função [booleana](https://en.wikipedia.org/wiki/Boolean_data_type), então ela usa [_∨_ para um ou lógico](https://en.wikipedia.org/wiki/Logical_disjunction) e [_∧_ para um e lógico](https://en.wikipedia.org/wiki/Logical_conjunction).

Temos uma interrupção excepcional se qualquer uma dessas condições for verdadeira:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_**
  Como vimos na seção 9.2, _C_ é a função que especifica o custo do gás. Não há gás suficiente para cobrir o próximo opcode.

- **_δ<sub>w</sub>=∅_**
  Se o número de itens removidos para um opcode for indefinido, o próprio opcode será indefinido.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_**
  Stack underflow, não há itens suficientes na pilha para o opcode atual.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_**
  O opcode é [`JUMP`](https://www.evm.codes/#56) e o endereço não é um [`JUMPDEST`](https://www.evm.codes/#5b). Os saltos são válidos _apenas_ quando o destino é um [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_**
  O opcode é [`JUMPI`](https://www.evm.codes/#57), a condição é verdadeira (diferente de zero), então o salto deve acontecer, e o endereço não é um [`JUMPDEST`](https://www.evm.codes/#5b). Os saltos são válidos _apenas_ quando o destino é um [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_**
  O opcode é [`RETURNDATACOPY`](https://www.evm.codes/#3e). Neste elemento da pilha do opcode _μ<sub>s</sub>[1]_ está o deslocamento para ler no buffer de dados de retorno, e o elemento da pilha _μ<sub>s</sub>[2]_ é o comprimento dos dados. Essa condição ocorre quando você tenta ler além do final do buffer de dados de retorno. Observe que não há uma condição semelhante para os calldata ou para o próprio código. Quando você tenta ler além do final desses buffers, você obtém apenas zeros.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Estouro de pilha. Se a execução do opcode resultar em uma pilha de mais de 1024 itens, aborte.

- **_¬I<sub>w</sub> ∧ W(w,μ)_**
  Estamos executando estaticamente ([¬ é negação](https://en.wikipedia.org/wiki/Negation) e _I<sub>w</sub>_ é verdadeiro quando temos permissão para alterar o estado da blockchain)? Em caso afirmativo, e se estivermos tentando uma operação de alteração de estado, ela não poderá acontecer.

  A função _W(w,μ)_ é definida posteriormente na equação 150. _W(w,μ)_ é verdadeiro se uma dessas condições for verdadeira:

  - **_w ∈ \{CREATE, CREATE2, SSTORE, SELFDESTRUCT}_**
    Esses códigos de operação alteram o estado, seja criando um novo contrato, armazenando um valor ou destruindo o contrato atual.

  - **_LOG0≤w ∧ w≤LOG4_**
    Se formos chamados estaticamente, não poderemos emitir entradas de log.
    Os códigos de operação de log estão todos no intervalo entre [`LOG0` (A0)](https://www.evm.codes/#a0) e [`LOG4` (A4)](https://www.evm.codes/#a4).
    O número após o opcode de log especifica quantos tópicos a entrada de log contém.

  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_**
    Você pode chamar outro contrato quando estiver estático, mas se o fizer, não poderá transferir ETH para ele.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_**
  Você não pode executar [`SSTORE`](https://www.evm.codes/#55) a menos que tenha mais do que G<sub>callstipend</sub> (definido como 2300 no Apêndice G) de gás.

## 9.4.3 Validade do destino do salto {#943-jump-dest-valid}

Aqui definimos formalmente quais são os opcodes [`JUMPDEST`](https://www.evm.codes/#5b). Não podemos apenas procurar pelo valor de byte 0x5B, porque ele pode estar dentro de um PUSH (e, portanto, ser um dado e não um opcode).

Na equação (153), definimos uma função, _N(i,w)_. O primeiro parâmetro, _i_, é a localização do opcode. O segundo, _w_, é o próprio opcode. Se _w∈[PUSH1, PUSH32]_, isso significa que o opcode é um PUSH (colchetes definem um intervalo que inclui os pontos de extremidade). Nesse caso, o próximo opcode está em _i+2+(w−PUSH1)_. Para [`PUSH1`](https://www.evm.codes/#60) precisamos avançar dois bytes (o próprio PUSH e o valor de um byte), para [`PUSH2`](https://www.evm.codes/#61) precisamos avançar três bytes porque é um valor de dois bytes, etc. Todos os outros opcodes da EVM têm apenas um byte de comprimento, então, em todos os outros casos, _N(i,w)=i+1_.

Esta função é usada na equação (152) para definir _D<sub>J</sub>(c,i)_, que é o [conjunto](https://en.wikipedia.org/wiki/Set_\(mathematics\)) de todos os destinos de salto válidos no código _c_, começando com a localização do opcode _i_. Esta função é definida recursivamente. Se _i≥||c||_, isso significa que estamos no final do código ou depois dele. Não vamos encontrar mais nenhum destino de salto, então apenas retorne o conjunto vazio.

Em todos os outros casos, olhamos para o resto do código, indo para o próximo opcode e obtendo o conjunto a partir dele. _c[i]_ é o opcode atual, portanto _N(i,c[i])_ é a localização do próximo opcode. _D<sub>J</sub>(c,N(i,c[i]))_ é, portanto, o conjunto de destinos de salto válidos que começa no próximo opcode. Se o opcode atual não for um `JUMPDEST`, apenas retorne esse conjunto. Se for `JUMPDEST`, inclua-o no conjunto de resultados e retorne-o.

## 9.4.4 Parada normal {#944-normal-halt}

A função de parada _H_ pode retornar três tipos de valores.

- Se não estivermos em um opcode de parada, retorne _∅_, o conjunto vazio. Por convenção, este valor é interpretado como booleano falso.
- Se tivermos um opcode de parada que não produz saída (seja [`STOP`](https://www.evm.codes/#00) ou [`SELFDESTRUCT`](https://www.evm.codes/#ff)), retorne uma sequência de bytes de tamanho zero como o valor de retorno. Note que isso é muito diferente do conjunto vazio. Esse valor significa que a EVM realmente parou, apenas não há dados de retorno para ler.
- Se tivermos um opcode de parada que produz saída (seja [`RETURN`](https://www.evm.codes/#f3) ou [`REVERT`](https://www.evm.codes/#fd)), retorne a sequência de bytes especificada por esse opcode. Esta sequência é retirada da memória, o valor no topo da pilha (_μ<sub>s</sub>[0]_) é o primeiro byte e o valor depois dele (_μ<sub>s</sub>[1]_) é o comprimento.

## H.2 Conjunto de instruções {#h2-instruction-set}

Antes de irmos para a subseção final da EVM, 9.5, vamos olhar para as próprias instruções. Elas são definidas no Apêndice H.2, que começa na p. 29. Qualquer coisa que não for especificada como alterada por esse opcode específico deverá permanecer a mesma. As variáveis que mudam são especificadas com \<algo\>′.

Por exemplo, vamos olhar para o opcode [`ADD`](https://www.evm.codes/#01).

| Valor | Mnemônico | δ | α | Descrição                                                                                                                                                                                                             |
| ----: | --------- | - | - | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  0x01 | ADD       | 2 | 1 | Operação de adição.                                                                                                                                                                                   |
|       |           |   |   | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ é o número de valores que retiramos da pilha. Nesse caso, dois, porque estamos adicionando os dois valores superiores.

_α_ é o número de valores que empurramos de volta. Nesse caso, um, a soma.

Portanto, o novo topo da pilha (_μ′<sub>s</sub>[0]_) é a soma do topo da pilha antigo (_μ<sub>s</sub>[0]_) e o valor antigo abaixo dele (_μ<sub>s</sub>[1]_).

Em vez de percorrer todos os códigos de operação com uma lista "de deixar os olhos vidrados", este artigo explica apenas os códigos de operação que introduzem algo novo.

| Valor | Mnemônico | δ | α | Descrição                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----: | --------- | - | - | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  0x20 | KECCAK256 | 2 | 1 | Computa o hash Keccak-256.                                                                                                                                                                                                                                                                                                                                                                                                                           |
|       |           |   |   | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|       |           |   |   | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                                                                                                                                                                                                                                                     |

Este é o primeiro opcode que acessa a memória (neste caso, apenas para leitura). No entanto, ele pode se expandir para além dos limites atuais da memória, portanto, precisamos atualizar _μ<sub>i</sub>_. Fazemos isso usando a função _M_ definida na equação 328 na p. 29.

| Valor | Mnemônico | δ | α | Descrição                                           |
| ----: | --------- | - | - | --------------------------------------------------- |
|  0x31 | BALANCE   | 1 | 1 | Obtenha o saldo da conta informada. |
|       |           |   |   | ... |

O endereço cujo saldo precisamos encontrar é _μ<sub>s</sub>[0] mod 2<sup>160</sup>_. O topo da pilha é o endereço, mas como os endereços têm apenas 160 bits, calculamos o valor [módulo](https://en.wikipedia.org/wiki/Modulo_operation) 2<sup>160</sup>.

Se _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_, isso significa que há informações sobre este endereço. Nesse caso, _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ é o saldo para esse endereço. Se _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_, isso significa que este endereço não foi inicializado e o saldo é zero. Você pode ver a lista de campos de informações da conta na seção 4.1 na p. 4.

A segunda equação, _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ \{μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, está relacionada à diferença de custo entre o acesso ao armazenamento quente (armazenamento que foi acessado recentemente e provavelmente está em cache) e o armazenamento frio (armazenamento que não foi acessado e provavelmente está em um armazenamento mais lento que é mais caro para recuperar). _A<sub>a</sub>_ é a lista de endereços acessados anteriormente pela transação, que, portanto, deve ser mais barata para acessar, conforme definido na seção 6.1 na p. 8. Você pode ler mais sobre este assunto em [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929).

| Valor | Mnemônico | δ  | α  | Descrição                                                                                                                                       |
| ----: | --------- | -- | -- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
|  0x8F | DUP16     | 16 | 17 | Duplicar o 16º item da pilha.                                                                                                   |
|       |           |    |    | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

Observe que para usar qualquer item da pilha, precisamos retirá-lo, o que significa que também precisamos retirar todos os itens da pilha sobre ele. No caso de [`DUP<n>`](https://www.evm.codes/#8f) e [`SWAP<n>`](https://www.evm.codes/#9f), isso significa ter que remover e, em seguida, empurrar até dezesseis valores.

## 9.5 O ciclo de execução {#95-exec-cycle}

Agora que temos todas as partes, podemos finalmente entender como o ciclo de execução da EVM é documentado.

A equação (155) diz que, dado o estado:

- _σ_ (estado global da blockchain)
- _μ_ (estado da EVM)
- _A_ (subestado, alterações que ocorrerão quando a transação terminar)
- _I_ (ambiente de execução)

O novo estado é _(σ', μ', A', I')_.

As equações (156)-(158) definem a pilha e a mudança nela devido a um opcode (_μ<sub>s</sub>_). A equação (159) é a alteração no gás (_μ<sub>g</sub>_). A equação (160) é a alteração no contador do programa (_μ<sub>pc</sub>_). Finalmente, as equações (161)-(164) especificam que os outros parâmetros permanecem os mesmos, a menos que explicitamente alterados pelo opcode.

Com isso, a EVM está totalmente definida.

## Conclusão {#conclusion}

A notação matemática é precisa e permitiu que o Yellow Paper especificasse cada detalhe do Ethereum. No entanto, ela tem algumas desvantagens:

- Ela só pode ser entendida por humanos, o que significa que os [testes de conformidade](https://github.com/ethereum/tests) devem ser escritos manualmente.
- Programadores entendem código de computador.
  Eles podem ou não entender a notação matemática.

Talvez por essas razões, as mais recentes [especificações da camada de consenso](https://github.com/ethereum/consensus-specs/blob/dev/tests/core/pyspec/README.md) são escritas em Python. Existem [especificações da camada de execução em Python](https://ethereum.github.io/execution-specs), mas elas não estão completas. Até que todo o Yellow Paper seja também traduzido para Python ou uma linguagem semelhante, o Yellow Paper continuará em serviço, e é útil ser capaz de lê-lo.
