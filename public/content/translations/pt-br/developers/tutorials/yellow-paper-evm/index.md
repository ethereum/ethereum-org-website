---
title: "Entendendo as especificações da EVM no yellow paper"
description: "Entendendo a parte do yellow paper, as especificações formais do Ethereum, que explica a Máquina Virtual Ethereum (EVM)."
author: "qbzzt"
tags: ["evm"]
skill: intermediate
breadcrumb: EVM no Yellow Paper
lang: pt-br
published: 2022-05-15
---

[O yellow paper](https://ethereum.github.io/yellowpaper/paper.pdf) é a especificação formal do Ethereum. Exceto onde alterado pelo [processo de EIP](/eips/), ele contém a descrição exata de como tudo funciona. Ele é escrito como um artigo matemático, o que inclui terminologia com a qual os programadores podem não estar familiarizados. Neste artigo, você aprenderá como lê-lo e, por extensão, outros artigos matemáticos relacionados.

## Qual yellow paper? {#which-yellow-paper}

Como quase tudo no Ethereum, o yellow paper evolui com o tempo. Para poder me referir a uma versão específica, fiz o upload da [versão atual no momento da escrita](yellow-paper-berlin.pdf). Os números de seção, página e equação que uso se referirão a essa versão. É uma boa ideia mantê-lo aberto em uma janela diferente enquanto lê este documento.

### Por que a EVM? {#why-the-evm}

O yellow paper original foi escrito logo no início do desenvolvimento do Ethereum. Ele descreve o mecanismo de consenso original baseado em Prova de Trabalho (PoW) que foi usado inicialmente para proteger a rede. No entanto, o Ethereum desativou a Prova de Trabalho e começou a usar o consenso baseado em Prova de Participação (PoS) em setembro de 2022. Este tutorial se concentrará nas partes do yellow paper que definem a Máquina Virtual Ethereum. A EVM não foi alterada pela transição para a Prova de Participação (exceto pelo valor de retorno do opcode DIFFICULTY).

## 9 Modelo de execução {#9-execution-model}

Esta seção (p. 12-14) inclui a maior parte da definição da EVM.

O termo _estado do sistema_ inclui tudo o que você precisa saber sobre o sistema para executá-lo. Em um computador típico, isso significa a memória, o conteúdo dos registradores, etc.

Uma [máquina de Turing](https://en.wikipedia.org/wiki/Turing_machine) é um modelo computacional. Essencialmente, é uma versão simplificada de um computador, que provou ter a mesma capacidade de executar cálculos que um computador normal tem (tudo o que um computador pode calcular, uma máquina de Turing pode calcular e vice-versa). Esse modelo torna mais fácil provar vários teoremas sobre o que é e o que não é computável.

O termo [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness) (Turing completo) significa um computador que pode executar os mesmos cálculos que uma máquina de Turing. As máquinas de Turing podem entrar em loops infinitos, e a EVM não pode porque ficaria sem gás, então ela é apenas quase Turing completa.

## 9.1 Conceitos básicos {#91-basics}

Esta seção apresenta os conceitos básicos da EVM e como ela se compara a outros modelos computacionais.

Uma [máquina de pilha](https://en.wikipedia.org/wiki/Stack_machine) é um computador que armazena dados intermediários não em registradores, mas em uma [**pilha**](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>). Esta é a arquitetura preferida para máquinas virtuais porque é fácil de implementar, o que significa que bugs e vulnerabilidades de segurança são muito menos prováveis. A memória na pilha é dividida em palavras de 256 bits. Isso foi escolhido porque é conveniente para as principais operações criptográficas do Ethereum, como a geração de hash Keccak-256 e cálculos de curva elíptica. O tamanho máximo da pilha é de 1024 itens (1024 x 256 bits). Quando os opcodes são executados, eles geralmente obtêm seus parâmetros da pilha. Existem opcodes especificamente para reorganizar elementos na pilha, como `POP` (remove o item do topo da pilha), `DUP_N` (duplica o enésimo item na pilha), etc.

A EVM também tem um espaço volátil chamado **memória**, que é usado para armazenar dados durante a execução. Essa memória é organizada em palavras de 32 bytes. Todos os locais de memória são inicializados com zero. Se você executar este código [Yul](https://docs.soliditylang.org/en/latest/yul.html) para adicionar uma palavra à memória, ele preencherá 32 bytes de memória preenchendo o espaço vazio na palavra com zeros, ou seja, ele cria uma palavra - com zeros nos locais 0-29, 0x60 no 30 e 0xA7 no 31.

```yul
mstore(0, 0x60A7)
```

`mstore` é um dos três opcodes que a EVM fornece para interagir com a memória - ele carrega uma palavra na memória. Os outros dois são `mstore8`, que carrega um único byte na memória, e `mload`, que move uma palavra da memória para a pilha.

A EVM também tem um modelo de **armazenamento** (storage) não volátil separado que é mantido como parte do estado do sistema - essa memória é organizada em matrizes de palavras (em oposição a matrizes de bytes endereçáveis por palavra na pilha). Esse armazenamento é onde os contratos mantêm dados persistentes - um contrato só pode interagir com seu próprio armazenamento. O armazenamento é organizado em mapeamentos de chave-valor.

Embora não seja mencionado nesta seção do yellow paper, também é útil saber que existe um quarto tipo de memória. **Calldata** (dados de chamada) é uma memória somente leitura endereçável por byte usada para armazenar o valor passado com o parâmetro `data` de uma transação. A EVM tem opcodes específicos para gerenciar `calldata`. `calldatasize` retorna o tamanho dos dados. `calldataload` carrega os dados na pilha. `calldatacopy` copia os dados para a memória.

A [arquitetura de Von Neumann](https://en.wikipedia.org/wiki/Von_Neumann_architecture) padrão armazena código e dados na mesma memória. A EVM não segue esse padrão por motivos de segurança - compartilhar memória volátil torna possível alterar o código do programa. Em vez disso, o código é salvo no armazenamento.

Existem apenas dois casos em que o código é executado a partir da memória:

- Quando um contrato cria outro contrato (usando [`CREATE`](https://www.evm.codes/#f0) ou [`CREATE2`](https://www.evm.codes/#f5)), o código para o construtor do contrato vem da memória.
- Durante a criação de _qualquer_ contrato, o código do construtor é executado e, em seguida, retorna com o código do contrato real, também da memória.

O termo execução excepcional significa uma exceção que faz com que a execução do contrato atual seja interrompida.

## 9.2 Visão geral das taxas {#92-fees-overview}

Esta seção explica como as taxas de gás são calculadas. Existem três custos:

### Custo do opcode {#opcode-cost}

O custo inerente do opcode específico. Para obter esse valor, encontre o grupo de custo do opcode no Apêndice H (p. 28, sob a equação (327)) e encontre o grupo de custo na equação (324). Isso fornece uma função de custo, que na maioria dos casos usa parâmetros do Apêndice G (p. 27).

Por exemplo, o opcode [`CALLDATACOPY`](https://www.evm.codes/#37) é um membro do grupo _W<sub>copy</sub>_. O custo do opcode para esse grupo é _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉_. Olhando para o Apêndice G, vemos que ambas as constantes são 3, o que nos dá _3+3×⌈μ<sub>s</sub>[2]÷32⌉_.

Ainda precisamos decifrar a expressão _⌈μ<sub>s</sub>[2]÷32⌉_. A parte mais externa, _⌈ \<value\> ⌉_ é a função teto, uma função que, dado um valor, retorna o menor número inteiro que ainda não é menor que o valor. Por exemplo, _⌈2.5⌉ = ⌈3⌉ = 3_. A parte interna é _μ<sub>s</sub>[2]÷32_. Olhando para a seção 3 (Convenções) na p. 3, _μ_ é o estado da máquina. O estado da máquina é definido na seção 9.4.1 na p. 13. De acordo com essa seção, um dos parâmetros de estado da máquina é _s_ para a pilha. Juntando tudo, parece que _μ<sub>s</sub>[2]_ é o local nº 2 na pilha. Olhando para [o opcode](https://www.evm.codes/#37), o local nº 2 na pilha é o tamanho dos dados em bytes. Olhando para os outros opcodes no grupo W<sub>copy</sub>, [`CODECOPY`](https://www.evm.codes/#39) e [`RETURNDATACOPY`](https://www.evm.codes/#3e), eles também têm um tamanho de dados no mesmo local. Portanto, _⌈μ<sub>s</sub>[2]÷32⌉_ é o número de palavras de 32 bytes necessárias para armazenar os dados sendo copiados. Juntando tudo, o custo inerente de [`CALLDATACOPY`](https://www.evm.codes/#37) é de 3 de gás mais 3 por palavra de dados sendo copiada.

### Custo de execução {#running-cost}

O custo de executar o código que estamos chamando.

- No caso de [`CREATE`](https://www.evm.codes/#f0) e [`CREATE2`](https://www.evm.codes/#f5), o construtor para o novo contrato.
- No caso de [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa) ou [`DELEGATECALL`](https://www.evm.codes/#f4), o contrato que chamamos.

### Custo de expansão de memória {#expanding-memory-cost}

O custo de expandir a memória (se necessário).

Na equação 324, esse valor é escrito como _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_. Olhando para a seção 9.4.1 novamente, vemos que _μ<sub>i</sub>_ é o número de palavras na memória. Portanto, _μ<sub>i</sub>_ é o número de palavras na memória antes do opcode e _μ<sub>i</sub>'_ é o número de palavras na memória após o opcode.

A função _C<sub>mem</sub>_ é definida na equação 326: _C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ é a função piso, uma função que, dado um valor, retorna o maior número inteiro que ainda não é maior que o valor. Por exemplo, _⌊2.5⌋ = ⌊2⌋ = 2._ Quando _a < √512_, _a<sup>2</sup> < 512_, e o resultado da função piso é zero. Portanto, para as primeiras 22 palavras (704 bytes), o custo aumenta linearmente com o número de palavras de memória necessárias. Além desse ponto, _⌊a<sup>2</sup> ÷ 512⌋_ é positivo. Quando a memória necessária é alta o suficiente, o custo do gás é proporcional ao quadrado da quantidade de memória.

**Observação:** esses fatores influenciam apenas o custo _inerente_ do gás - não levam em consideração o mercado de taxas ou gorjetas para validadores que determinam quanto um usuário final deve pagar - este é apenas o custo bruto de executar uma operação específica na EVM.

[Leia mais sobre gás](/developers/docs/gas/).

## 9.3 Ambiente de execução {#93-execution-env}

O ambiente de execução é uma tupla, _I_, que inclui informações que não fazem parte do estado da blockchain ou da EVM.

| Parâmetro       | Opcode para acessar os dados                                                                                        | Código Solidity para acessar os dados         |
| --------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                           | `address(this)`                          |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                            | `tx.origin`                              |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                          | `tx.gasprice`                            |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35), etc.                                                                | `msg.data`                               |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                            | `msg.sender`                             |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                         | `msg.value`                              |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                          | `address(this).code`                     |
| _I<sub>H</sub>_ | Campos do cabeçalho do bloco, como [`NUMBER`](https://www.evm.codes/#43) e [`DIFFICULTY`](https://www.evm.codes/#44) | `block.number`, `block.difficulty`, etc. |
| _I<sub>e</sub>_ | Profundidade da pilha de chamadas para chamadas entre contratos (incluindo a criação de contratos)                                |
| _I<sub>w</sub>_ | A EVM tem permissão para alterar o estado ou está sendo executada estaticamente                                                  |

Alguns outros parâmetros são necessários para entender o restante da seção 9:

| Parâmetro | Definido na seção   | Significado                                                                                                                                                                                                                  |
| --------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _σ_       | 2 (p. 2, equação 1) | O estado da blockchain                                                                                                                                                                                              |
| _g_       | 9.3 (p. 13)          | Gás restante                                                                                                                                                                                                            |
| _A_       | 6.1 (p. 8)           | Subestado acumulado (alterações programadas para quando a transação terminar)                                                                                                                                                       |
| _o_       | 9.3 (p. 13)          | Saída - o resultado retornado no caso de transação interna (quando um contrato chama outro) e chamadas para funções de visualização (quando você está apenas pedindo informações, então não há necessidade de esperar por uma transação) |

## 9.4 Visão geral da execução {#94-execution-overview}

Agora que temos todas as preliminares, podemos finalmente começar a trabalhar em como a EVM funciona.

As equações 137-142 nos dão as condições iniciais para executar a EVM:

| Símbolo           | Valor inicial | Significado                                                                                                                                                                                                                                                     |
| ---------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _μ<sub>g</sub>_  | _g_           | Gás restante                                                                                                                                                                                                                                               |
| _μ<sub>pc</sub>_ | _0_           | Contador de programa, o endereço da próxima instrução a ser executada                                                                                                                                                                                             |
| _μ<sub>m</sub>_  | _(0, 0, ...)_ | Memória, inicializada com todos os zeros                                                                                                                                                                                                                            |
| _μ<sub>i</sub>_  | _0_           | Local de memória mais alto usado                                                                                                                                                                                                                                |
| _μ<sub>s</sub>_  | _()_          | A pilha, inicialmente vazia                                                                                                                                                                                                                                  |
| _μ<sub>o</sub>_  | _∅_           | A saída, conjunto vazio até e a menos que paremos com dados de retorno ([`RETURN`](https://www.evm.codes/#f3) ou [`REVERT`](https://www.evm.codes/#fd)) ou sem eles ([`STOP`](https://www.evm.codes/#00) ou [`SELFDESTRUCT`](https://www.evm.codes/#ff)). |

A equação 143 nos diz que existem quatro condições possíveis em cada ponto no tempo durante a execução e o que fazer com elas:

1.  `Z(σ,μ,A,I)`. Z representa uma função que testa se uma operação cria uma transição de estado inválida (consulte [parada excepcional](#942-exceptional-halt)). Se for avaliada como Verdadeira, o novo estado será idêntico ao antigo (exceto que o gás é queimado) porque as alterações não foram implementadas.
2.  Se o opcode sendo executado for [`REVERT`](https://www.evm.codes/#fd), o novo estado será o mesmo que o estado antigo, algum gás será perdido.
3.  Se a sequência de operações for concluída, conforme indicado por um [`RETURN`](https://www.evm.codes/#f3)), o estado será atualizado para o novo estado.
4.  Se não estivermos em uma das condições finais 1-3, continue a execução.

## 9.4.1 Estado da máquina {#941-machine-state}

Esta seção explica o estado da máquina com mais detalhes. Ela especifica que _w_ é o opcode atual. Se _μ<sub>pc</sub>_ for menor que _||I<sub>b</sub>||_, o comprimento do código, então esse byte (_I<sub>b</sub>[μ<sub>pc</sub>]_) é o opcode. Caso contrário, o opcode é definido como [`STOP`](https://www.evm.codes/#00).

Como esta é uma [máquina de pilha](https://en.wikipedia.org/wiki/Stack_machine), precisamos acompanhar o número de itens retirados (_δ_) e inseridos (_α_) por cada opcode.

## 9.4.2 Parada excepcional {#942-exceptional-halt}

Esta seção define a função _Z_, que especifica quando temos um término anormal. Esta é uma função [booleana](https://en.wikipedia.org/wiki/Boolean_data_type), portanto, usa [_∨_ para um OU lógico](https://en.wikipedia.org/wiki/Logical_disjunction) e [_∧_ para um E lógico](https://en.wikipedia.org/wiki/Logical_conjunction).

Temos uma parada excepcional se alguma destas condições for verdadeira:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_**
  Como vimos na seção 9.2, _C_ é a função que especifica o custo do gás. Não há gás suficiente para cobrir o próximo opcode.

- **_δ<sub>w</sub>=∅_**
  Se o número de itens retirados para um opcode for indefinido, o próprio opcode será indefinido.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_**
  Underflow da pilha, não há itens suficientes na pilha para o opcode atual.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_**
  O opcode é [`JUMP`](https://www.evm.codes/#56) e o endereço não é um [`JUMPDEST`](https://www.evm.codes/#5b). Os saltos (jumps) são válidos _apenas_ quando o destino é um [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_**
  O opcode é [`JUMPI`](https://www.evm.codes/#57), a condição é verdadeira (diferente de zero), então o salto deve acontecer, e o endereço não é um [`JUMPDEST`](https://www.evm.codes/#5b). Os saltos são válidos _apenas_ quando o destino é um [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_**
  O opcode é [`RETURNDATACOPY`](https://www.evm.codes/#3e). Neste opcode, o elemento da pilha _μ<sub>s</sub>[1]_ é o deslocamento (offset) para ler no buffer de dados de retorno, e o elemento da pilha _μ<sub>s</sub>[2]_ é o comprimento dos dados. Essa condição ocorre quando você tenta ler além do final do buffer de dados de retorno. Observe que não há uma condição semelhante para os dados de chamada (calldata) ou para o próprio código. Quando você tenta ler além do final desses buffers, você obtém apenas zeros.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Overflow da pilha. Se a execução do opcode resultar em uma pilha de mais de 1024 itens, aborte.

- **_¬I<sub>w</sub> ∧ W(w,μ)_**
  Estamos executando estaticamente ([¬ é negação](https://en.wikipedia.org/wiki/Negation) e _I<sub>w</sub>_ é verdadeiro quando temos permissão para alterar o estado da blockchain)? Se sim, e estamos tentando uma operação de alteração de estado, isso não pode acontecer.

  A função _W(w,μ)_ é definida posteriormente na equação 150. _W(w,μ)_ é verdadeira se uma destas condições for verdadeira:

  - **_w ∈ \{CREATE, CREATE2, SSTORE, SELFDESTRUCT}_**
    Esses opcodes alteram o estado, seja criando um novo contrato, armazenando um valor ou destruindo o contrato atual.

  - **_LOG0≤w ∧ w≤LOG4_**
    Se formos chamados estaticamente, não poderemos emitir entradas de log.
    Os opcodes de log estão todos no intervalo entre [`LOG0` (A0)](https://www.evm.codes/#a0) e [`LOG4` (A4)](https://www.evm.codes/#a4).
    O número após o opcode de log especifica quantos tópicos a entrada de log contém.
  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_**
    Você pode chamar outro contrato quando estiver estático, mas se o fizer, não poderá transferir ETH para ele.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_**
  Você não pode executar [`SSTORE`](https://www.evm.codes/#55) a menos que tenha mais de G<sub>callstipend</sub> (definido como 2300 no Apêndice G) de gás.

## 9.4.3 Validade do destino do salto {#943-jump-dest-valid}

Aqui definimos formalmente o que são os opcodes [`JUMPDEST`](https://www.evm.codes/#5b). Não podemos apenas procurar o valor do byte 0x5B, porque ele pode estar dentro de um PUSH (e, portanto, ser um dado e não um opcode).

Na equação (153), definimos uma função, _N(i,w)_. O primeiro parâmetro, _i_, é a localização do opcode. O segundo, _w_, é o próprio opcode. Se _w∈[PUSH1, PUSH32]_, isso significa que o opcode é um PUSH (colchetes definem um intervalo que inclui as extremidades). Nesse caso, o próximo opcode está em _i+2+(w−PUSH1)_. Para [`PUSH1`](https://www.evm.codes/#60), precisamos avançar dois bytes (o próprio PUSH e o valor de um byte), para [`PUSH2`](https://www.evm.codes/#61), precisamos avançar três bytes porque é um valor de dois bytes, etc. Todos os outros opcodes da EVM têm apenas um byte de comprimento, portanto, em todos os outros casos, _N(i,w)=i+1_.

Essa função é usada na equação (152) para definir _D<sub>J</sub>(c,i)_, que é o [conjunto](<https://en.wikipedia.org/wiki/Set_(mathematics)>) de todos os destinos de salto válidos no código _c_, começando com a localização do opcode _i_. Essa função é definida recursivamente. Se _i≥||c||_, isso significa que estamos no final ou após o final do código. Não vamos encontrar mais nenhum destino de salto, então basta retornar o conjunto vazio.

Em todos os outros casos, olhamos para o resto do código indo para o próximo opcode e obtendo o conjunto a partir dele. _c[i]_ é o opcode atual, então _N(i,c[i])_ é a localização do próximo opcode. _D<sub>J</sub>(c,N(i,c[i]))_ é, portanto, o conjunto de destinos de salto válidos que começa no próximo opcode. Se o opcode atual não for um `JUMPDEST`, basta retornar esse conjunto. Se for `JUMPDEST`, inclua-o no conjunto de resultados e retorne-o.

## 9.4.4 Parada normal {#944-normal-halt}

A função de parada _H_ pode retornar três tipos de valores.

- Se não estivermos em um opcode de parada, retorne _∅_, o conjunto vazio. Por convenção, esse valor é interpretado como falso booleano.
- Se tivermos um opcode de parada que não produz saída (seja [`STOP`](https://www.evm.codes/#00) ou [`SELFDESTRUCT`](https://www.evm.codes/#ff)), retorne uma sequência de bytes de tamanho zero como valor de retorno. Observe que isso é muito diferente do conjunto vazio. Esse valor significa que a EVM realmente parou, apenas não há dados de retorno para ler.
- Se tivermos um opcode de parada que produz saída (seja [`RETURN`](https://www.evm.codes/#f3) ou [`REVERT`](https://www.evm.codes/#fd)), retorne a sequência de bytes especificada por esse opcode. Essa sequência é retirada da memória, o valor no topo da pilha (_μ<sub>s</sub>[0]_) é o primeiro byte e o valor depois dele (_μ<sub>s</sub>[1]_) é o comprimento.

## H.2 Conjunto de instruções {#h2-instruction-set}

Antes de irmos para a subseção final da EVM, 9.5, vamos dar uma olhada nas próprias instruções. Elas são definidas no Apêndice H.2, que começa na p. 29. Espera-se que qualquer coisa que não seja especificada como alterada com esse opcode específico permaneça a mesma. As variáveis que mudam são especificadas como \<something\>′.

Por exemplo, vamos dar uma olhada no opcode [`ADD`](https://www.evm.codes/#01).

| Valor | Mnemônico | δ   | α   | Descrição                                               |
| ----: | -------- | --- | --- | --------------------------------------------------------- |
|  0x01 | ADD      | 2   | 1   | Operação de adição.                                       |
|       |          |     |     | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ é o número de valores que retiramos da pilha. Neste caso, dois, porque estamos adicionando os dois valores do topo.

_α_ é o número de valores que inserimos de volta. Neste caso, um, a soma.

Portanto, o novo topo da pilha (_μ′<sub>s</sub>[0]_) é a soma do antigo topo da pilha (_μ<sub>s</sub>[0]_) e o valor antigo abaixo dele (_μ<sub>s</sub>[1]_).

Em vez de repassar todos os opcodes com uma "lista entediante", este artigo explica apenas os opcodes que introduzem algo novo.

| Valor | Mnemônico  | δ   | α   | Descrição                                                                                                |
| ----: | --------- | --- | --- | ---------------------------------------------------------------------------------------------------------- |
|  0x20 | KECCAK256 | 2   | 1   | Calcular o hash Keccak-256.                                                                                   |
|       |           |     |     | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|       |           |     |     | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                      |

Este é o primeiro opcode que acessa a memória (neste caso, somente leitura). No entanto, ele pode se expandir além dos limites atuais da memória, portanto, precisamos atualizar _μ<sub>i</sub>._ Fazemos isso usando a função _M_ definida na equação 328 na p. 29.

| Valor | Mnemônico | δ   | α   | Descrição                       |
| ----: | -------- | --- | --- | --------------------------------- |
|  0x31 | BALANCE  | 1   | 1   | Obter o saldo da conta fornecida. |
|       |          |     |     | ...                               |

O endereço cujo saldo precisamos encontrar é _μ<sub>s</sub>[0] mod 2<sup>160</sup>_. O topo da pilha é o endereço, mas como os endereços têm apenas 160 bits, calculamos o valor [módulo](https://en.wikipedia.org/wiki/Modulo_operation) 2<sup>160</sup>.

Se _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_, isso significa que há informações sobre esse endereço. Nesse caso, _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ é o saldo para esse endereço. Se _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_, isso significa que esse endereço não foi inicializado e o saldo é zero. Você pode ver a lista de campos de informações da conta na seção 4.1 na p. 4.

A segunda equação, _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ \{μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, está relacionada à diferença de custo entre o acesso ao armazenamento quente (armazenamento que foi acessado recentemente e provavelmente está em cache) e armazenamento frio (armazenamento que não foi acessado e provavelmente está em um armazenamento mais lento que é mais caro para recuperar). _A<sub>a</sub>_ é a lista de endereços acessados anteriormente pela transação, que, portanto, devem ser mais baratos de acessar, conforme definido na seção 6.1 na p. 8. Você pode ler mais sobre esse assunto na [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929).

| Valor | Mnemônico | δ   | α   | Descrição                             |
| ----: | -------- | --- | --- | --------------------------------------- |
|  0x8F | DUP16    | 16  | 17  | Duplicar o 16º item da pilha.              |
|       |          |     |     | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

Observe que, para usar qualquer item da pilha, precisamos retirá-lo, o que significa que também precisamos retirar todos os itens da pilha em cima dele. No caso de [`DUP<n>`](https://www.evm.codes/#8f) e [`SWAP<n>`](https://www.evm.codes/#9f), isso significa ter que retirar e depois inserir até dezesseis valores.

## 9.5 O ciclo de execução {#95-exec-cycle}

Agora que temos todas as partes, podemos finalmente entender como o ciclo de execução da EVM é documentado.

A equação (155) diz que, dado o estado:

- _σ_ (estado global da blockchain)
- _μ_ (estado da EVM)
- _A_ (subestado, alterações que ocorrerão quando a transação terminar)
- _I_ (ambiente de execução)

O novo estado é _(σ', μ', A', I')_.

As equações (156)-(158) definem a pilha e a alteração nela devido a um opcode (_μ<sub>s</sub>_). A equação (159) é a alteração no gás (_μ<sub>g</sub>_). A equação (160) é a alteração no contador de programa (_μ<sub>pc</sub>_). Por fim, as equações (161)-(164) especificam que os outros parâmetros permanecem os mesmos, a menos que sejam explicitamente alterados pelo opcode.

Com isso, a EVM está totalmente definida.

## Conclusão {#conclusion}

A notação matemática é precisa e permitiu que o yellow paper especificasse todos os detalhes do Ethereum. No entanto, ela tem algumas desvantagens:

- Ela só pode ser entendida por humanos, o que significa que os [testes de conformidade](https://github.com/ethereum/tests) devem ser escritos manualmente.
- Os programadores entendem código de computador.
  Eles podem ou não entender a notação matemática.

Talvez por esses motivos, as [especificações da camada de consenso](https://github.com/ethereum/consensus-specs/blob/master/tests/core/pyspec/README.md) mais recentes sejam escritas em Python. Existem [especificações da camada de execução em Python](https://ethereum.github.io/execution-specs), mas elas não estão completas. Até e a menos que todo o yellow paper também seja traduzido para Python ou uma linguagem semelhante, o yellow paper continuará em serviço, e é útil poder lê-lo.