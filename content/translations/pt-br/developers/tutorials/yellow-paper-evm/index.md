---
title: Entendendo as especificações do Yellow Paper da EVM
description: Entendendo a parte do Yellow Paper, a especificação formal do Ethereum, você entenderá a Máquina Virtual Ethereum (EVM).
author: "qbzzt"
tags:
  - "evm"
skill: intermediate
lang: pt-br
published: 2022-05-15
---

[O Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) é uma especificação formal do Ethereum. Exceto onde alterado pelo [processo EIP](/eips/), ele contém a descrição exata de como tudo funciona. Ele foi escrito como um documento matemático, que inclui terminologia que programadores podem não achar familiar. Nesse documento você aprende como lê-lo, e por extensão outros documentos matemáticos relacionados.

## Qual Yellow Paper? {#which-yellow-paper}

Como quase tudo mais no Ethereum, o Yellow Paper evolui com o tempo. Para ser capaz de se referir a uma versão específica, eu fiz o upload [da versão atual](yellow-paper-berlin.pdf). A seção, página e números de equação que eu uso irão se referir a esta versão. É uma boa ideia tê-lo aberto em uma janela diferente enquanto você lê esse documento.

### Por que a EVM? {#why-the-evm}

O yellow paper original foi escrito logo no começo do desenvolvimento do Ethereum. Ele descreve o mecanismo de consenso original baseado em proof-of-work que foi originalmente usado para proteger a rede. Entretanto, o Ethereum desligou o proof-of-work e começou a usar consenso baseado em proof-of-stake em setembro de 2022. Este tutorial focará nas partes do yellow paper que definem a Máquina Virtual Ethereum. A EVM ficou inalterada pela transição para proof-of-stake (exceto pelo valor de retorno do opcode DIFFICULTY).

## Modelo de execução 9 {#9-execution-model}

Esta seção (pág. 12.14) inclui a maioria da definição da EVM.

O termo _estado do sistema_ inclui tudo que você precisa saber sobre o sistema para rodá-lo. Em um computador comum, isto significa memória, conteúdo dos registradores, etc.

Uma [máquina de Turing](https://en.wikipedia.org/wiki/Turing_machine) é um modelo computacional. Essencialmente, é uma versão simplificada de um computador, que comprovadamente tem a mesma habilidade de executar computações que um computador normal tem (tudo que um computador pode calcular, uma máquina de Turing pode calcular, e vice-versa). Este modelo facilita provar vários teoremas sobre o que é e o que não é computável.

O termo [Turing-completo](https://en.wikipedia.org/wiki/Turing_completeness) significa um computador que pode rodar os mesmos cálculos que uma máquina de Turing. Máquinas de Turing pode entrar em laços infinitos, e a EVM não pode porque ela irá ficar sem gas, então é somente quase-Turing-completa.

## Básico 9.1 {#91-basics}

Esta seção fornece o básico sobre EVM e como ela se equipara a outros modelos computacionais.

A [máquina de pilha](https://en.wikipedia.org/wiki/Stack_machine) é um computador que armazena dados intermediários não em registros, mas em uma [**pilha**](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)). Esta é a arquitetura preferida para máquinas virtuais porque é fácil de implementar, significando que bugs e a vulnerabilidades de segurança são bem menos prováveis. A memória na pilha é dividida em palavras de 256-bit. Esta escolha foi tomada por ser a mais conveniente às operações criptográficas do núcleo do Ethereum, como as computações de hash Keccak-256 e curva elíptica. O tamanho máximo da pilha é 1.024 bytes. Quando opcodes são executados, eles geralmente estão pegando seus parâmetros da pilha. Há opcodes especificamente para reorganizar elementos na pilha, como `POP` (remove item do topo da pilha), `DUP_N` (N-ésimo item duplicado na pilha), etc.

A EVM também tem um espaço volátil chamado **memory** que é usado para armazenar dados durante execução. Esta memória é organizada em palavras de 32-byte. Todas as locações de memória são inicializadas em zero. Se você executar este código [Yul](https://docs.soliditylang.org/en/latest/yul.html) para adicionar uma palavra na memória, ele irá preencher 32 bytes de memória preenchendo o espaço vazio na palavra com zeros, ou seja, ele cria uma palavra - com zeros nos locais 0-29, 0x60 a 30, e 0xA7 a 31.

```yul
mstore(0, 0x60A7)
```

`mstore` é um dos três opcodes que a EVM fornece para interação com a memória - ele carrega uma palavra na memória. Os outros dois são `mstore8`, que carrega um único byte na memória, e `mload`, que move uma palavra da memória para a pilha.

A EVM também tem um modelo separado não volátil chamado **storage**, que é mantido como parte do estado do sistema - esta memória é organizada em arrays de palavras (ao contrário de arrays de byte endereçáveis por palavra na pilha). Esta storage é quando contratos mantém dados resistentes - um contrato pode somente interagir com o seu própria storage. Storage é organizado em mapeamentos chave-valor.

Apesar de não ser mencionado nessa seção do Yellow Paper, é útil também saber que há um quarto tipo de memória. **Calldata** é uma memória endereçável por byte, somente de leitura, usada para armazenar o valor passado com o parâmetro `data` da transação. A EVM tem opcodes específicos para gerenciamento de `calldata`. `calldatasize` retorna o tamanho dos dados. `calldataload` carrega os dados na pilha. `calldatacopy` copia os dados na memória.

A [arquitetura Von Neumann](https://en.wikipedia.org/wiki/Von_Neumann_architecture) armazena código e dados na mesma memória. A EVM não segue este padrão por razões de segurança - compartilhar memória volátil torna possível mudar o código do programa. Ao invés disso, o código é gravado na storage.

Há apenas dois casos em que o código é executado da memória:

- Quando um contrato cria outro contrato (usando [`CREATE`](https://www.evm.codes/#f0) ou [`CREATE2`](https://www.evm.codes/#f5)), o código do construtor do contrato vem da memória.
- Durante a criação de _qualquer_ contrato, o código do construtor roda e então retorna com o código do contrato real, também da memória.

O termo execução excepcional significa uma exceção que causa a interrupção da execução do contrato atual.

## 9.2 Visão geral de taxas {#92-fees-overview}

Esta seção explica como as taxas de gas são calculadas. Há três custos:

### Custo de opcode {#opcode-cost}

O custo herdado de um opcode específico. Para obter este valor, encontre o grupo de custo do opcode no apêndice H (p. 28, sob equação (327)), e encontre o grupo de custo na equação (324). Isto te dá uma função do custo, que na maioria dos casos usa parâmetros do apêndice G (p. 27).

Por exemplo, o opcode [`CALLDATACOPY`](https://www.evm.codes/#37) é um membro do grupo _W<sub>copy</sub>_. O custo de opcode para este grupo é _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉_. Olhando no apêndice G, nós vemos que ambas constantes são 3, o que nos dá _3+3×⌈μ<sub>s</sub>[2]÷32⌉_.

Nós ainda precisamos decifrar a expressão _⌈μ<sub>s</sub>[2]÷32⌉_. A parte mais de fora, _⌈ \<valor\> ⌉_ é a função ceiling, uma função em que é dado valor onde retorna o menor inteiro que ainda não é menor que o valor. Por exemplo, _⌈2.5⌉ = ⌈3⌉ = 3_. A parte mais interna é _μ<sub>s</sub>[2]÷32_. Olhando na seção 3 (Convenções) na p. 3, _μ_ é o estado da máquina. O estado da máquina é definido na seção 9.4.1 na p. 13. De acordo com essa seção, um dos parâmetros do estado da máquina é _s_ para a pilha. Colocando tudo junto, parece que _μ<sub>s</sub>[2]_ é a locação número 2 na pilha. Olhando o [opcode](https://www.evm.codes/#37), a locação número dois na pilha é o tamanho do dado em bytes. Olhando em outros opcodes do grupo W<sub>copy</sub>, [`CODECOPY`](https://www.evm.codes/#39) e [`RETURNDATACOPY`](https://www.evm.codes/#3e), eles também têm um tamanho de dado na mesma locação. Então,_⌈μ<sub>s</sub>[2]÷32⌉_ é o número de 32 byte necessário para armazenar o dado sendo copiado. Colocando tudo junto, o custo herdado de [`CALLDATACOPY`](https://www.evm.codes/#37) é 3 gas mais 3 por palavra de dado sendo copiada.

### Custo de execução {#running-cost}

O custo de rodar o código que nós estamos chamando.

- No caso do [`CREATE`](https://www.evm.codes/#f0) e [`CREATE2`](https://www.evm.codes/#f5), o construtor para o novo contrato.
- No caso do [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa), ou [`DELEGATECALL`](https://www.evm.codes/#f4), o contrato que nós chamamos.

### Expandindo o custo de memória {#expanding-memory-cost}

O custo de expandir a memória (se necessário).

Na equação 324, este valor é escrito como _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_. Olhando na seção 9.4.1 novamente, nós vemos que _μ<sub>i</sub>_ é o número de palavras na memória. Então, _μ<sub>i</sub>_ é o número de palavras na memória antes do opcode e _μ<sub>i</sub>'_ é o número de palavras na memória depois do opcode.

A função _C<sub>mem</sub>_ é definida na equação 326: _C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ é a função floor, uma função que dado um valor, retorna o maior inteiro que ainda não é maior que o valor. Por exemplo, _⌊2.5⌋ = ⌊2⌋ = 2._ Quando_ a < √512_, _a<sup>2</sup> < 512_, e o resultado da função floor é zero. Então para as primeiras 22 palavras (704 bytes), o custo sobe linearmente com o número de palavras na memória necessárias. Além desse ponto _⌊a<sup>2</sup> ÷ 512⌋_ é positivo. Quando a memória necessária é grande o suficiente, o custo de gas é proporcional ao quadrado da quantidade de memória.

**Note** que estes fatores somente influenciam o custo de gas _herdado_ - ele não leva em conta a taxa de mercado ou gorjetas aos validadores que determinam quanto um usuário final precisa pagar - isto é apenas o custo líquido de rodar uma operação particular na EVM.

[Leia mais sobre gas](/developers/docs/gas/).

## Ambiente de execução 9.3 {#93-execution-env}

O ambiente de execução é uma tupla, _I_, que inclui informações que não são parte do estado do blockchain ou da EVM.

| Parâmetro       | Opcode para acessar o dado                                                                                           | Código Solidity para acessar o dado      |
| --------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                               | `address(this)`                          |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                                | `tx.origin`                              |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                              | `tx.gasprice`                            |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35), etc.                                                                    | `msg.data`                               |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                                | `msg.sender`                             |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                             | `msg.value`                              |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                              | `address(this).code`                     |
| _I<sub>H</sub>_ | Campos do cabeçalho do bloco, como [`NUMBER`](https://www.evm.codes/#43) e [`DIFFICULTY`](https://www.evm.codes/#44) | `block.number`, `block.difficulty`, etc. |
| _I<sub>e</sub>_ | Profundidade da pilha de chamada para chamadas entre contratos (incluindo criação de contrato)                       |                                          |
| _I<sub>w</sub>_ | A EVM tem permissão de mudar de estado, ou está rodando estaticamente                                                |                                          |

Alguns outros poucos parâmetros são necessários para entender o resto da seção 9:

| Parâmetro | Definido na seção   | Significado                                                                                                                                                                                                                       |
| --------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _σ_       | 2 (p. 2, equação 1) | O estado do blockchain                                                                                                                                                                                                            |
| _g_       | 9.3 (p. 13)         | Gas remanescente                                                                                                                                                                                                                  |
| _A_       | 6.1 (p. 8)          | Substrato acumulado (muda agendado para quando a transação termina)                                                                                                                                                               |
| _o_       | 9.3 (p. 13)         | Saída - o resultado retornado no caso de transação interna (quando um contrato chama outro) e chamadas para funções view (quando você está apenas perguntando por informação, então não há necessidade de esperar pela transação) |

## Visão geral da execução 9.4 {#94-execution-overview}

Agora que temos todas as preliminares, nós podemos finalmente começar a trabalhar como a EVM trabalha.

Equações 137-142 nos dá as condições iniciais para rodar a EVM:

| Símbolo          | Valor inicial | Significado                                                                                                                                                                                                                                                               |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _μ<sub>g</sub>_  | _g_           | Gas remanescente                                                                                                                                                                                                                                                          |
| _μ<sub>pc</sub>_ | _0_           | Contador do programa, o endereço da próxima instrução para executar                                                                                                                                                                                                       |
| _μ<sub>m</sub>_  | _(0, 0, ...)_ | Memória, inicializada toda com zeros                                                                                                                                                                                                                                      |
| _μ<sub>i</sub>_  | _0_           | Maior locação de memória usada                                                                                                                                                                                                                                            |
| _μ<sub>s</sub>_  | _()_          | A pilha, inicialmente vazia                                                                                                                                                                                                                                               |
| _μ<sub>o</sub>_  | _∅_           | O resultado, conjunto vazio até e, a não ser que nós paremos ou com os dados de retorno ([`RETURN`](https://www.evm.codes/#f3) ou [`REVERT`](https://www.evm.codes/#fd)) ou sem ele ([`STOP`](https://www.evm.codes/#00) ou [`SELFDESTRUCT`](https://www.evm.codes/#ff)). |

A equação 143 nos conta que há quatro condições possíveis em cada ponto no tempo durante a execução, e o que fazer com elas:

1.  `Z(σ,μ,A,I)`. Z representa uma função que testa se uma operação cria uma transição de estado inválida (veja [parada excepcional](#942-exceptional-halting)). Se ele for avaliado para True, o novo estado é idêntico ao antigo (exceto o gas que foi queimado) porque as mudanças não foram implementadas.
2.  Se o the opcode sendo executado é [`REVERT`](https://www.evm.codes/#fd), o novo estado é o mesmo que o antigo estado, algum gas é perdido.
3.  Se a sequência de operações for finalizada, como significa um [`RETURN`](https://www.evm.codes/#f3)), o estado é atualizado para o novo estado.
4.  Se não estivermos em uma das condições finais 1-3, continua rodando.

## Estado da Máquina 9.4 {#941-machine-state}

Esta seção explica o estado da máquina em maiores detalhes. Ela especifica que _w_ é o opcode atual. Se _μ<sub>pc</sub>_ é menor que _||I<sub>b</sub>||_, o tamanho do código, então aquele byte (_I<sub>b</sub>[μ<sub>pc</sub>]_) é o opcode. Caso contrário, o opcode é definido como [`STOP`](https://www.evm.codes/#00).

Como esse é uma [máquina de pilha](https://en.wikipedia.org/wiki/Stack_machine), nós precisamos rastrear o número de itens que apareceram (_δ_) e empurraram em (_α_) por cada opcode.

## Interrupção excepcional 9.4.2 {#942-exceptional-halt}

Esta seção define a função _Z_, a qual especifica quando nós temos uma terminação anormal. Isto é uma função [booleana](https://en.wikipedia.org/wiki/Boolean_data_type), então ela usa [_∨_ para um ou lógico](https://en.wikipedia.org/wiki/Logical_disjunction) e [_∧_ para um e lógico](https://en.wikipedia.org/wiki/Logical_conjunction).

Nós temos uma parada excepcional se qualquer destas condições for verdadeira:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_** Como vimos na seção 9.2, _C_ é a função que especifica o custo de gas. Não há gas suficiente deixado para cobrir o próximo opcode.

- **_δ<sub>w</sub>=∅_** Se o número de itens que apareceram para um opcode é indefinido, então o opcode em si é indefinido.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_** Underflow de pilha, itens não suficientes na pilha para o opcode atual.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_** O opcode é [`JUMP`](https://www.evm.codes/#56) e o endereço não é um [`JUMPDEST`](https://www.evm.codes/#5b). Saltos são _somente_ válidos quando o destino é um [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_** O opcode é [`JUMPI`](https://www.evm.codes/#57), a condição é verdadeira (não zero) então o salto pode acontecer, e o endereço não é um [`JUMPDEST`](https://www.evm.codes/#5b). Saltos são _somente_ válidos quando o destino é um [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_** O opcode é [`RETURNDATACOPY`](https://www.evm.codes/#3e). Neste elemento da pilha de opcode _μ<sub>s</sub>[1]_ é o offset de onde se lê no buffer de retorno de dados, e elemento da pilha _μ<sub>s</sub>[2]_ é o tamanho do dado. A condição ocorre quando você tenta ler além do fim do buffer de dado de retorno. Note que não há uma condição similar para o calldata ou para o código ele mesmo. Quando você tentar ler além do fim destes buffers, você obtém somente zeros.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Overflow de pilha. Se rodando o opcode resultar em uma pilha com mais de 1.024 itens, aborte.

- **_¬I<sub>w</sub> ∧ W(w,μ)_** Estamos rodando estaticamente ([¬ é negação](https://en.wikipedia.org/wiki/Negation) e_I<sub>w</sub>_ é verdade quando nós somos permitidos mudar o estado do blockchain)? Se sim, e nós estamos tentando mudar o estado da operação, ela pode acontecer.

  A função _W(w,μ)_ é definida mais tarde na equação 150. _W(w,μ)_ é verdade se uma destas condições for verdadeira:

  - **_w ∈ {CREATE, CREATE2, SSTORE, SELFDESTRUCT}_** Estes opcodes mudando o estado, ou criando um novo contrato, armazenando valor, ou destruindo o contrato atual.

  - **_LOG0≤w ∧ w≤LOG4_** Se nãos formos chamados estaticamente, nós não podemos emitir entradas de log. Os opcodes de log estão todos na faixa entre [`LOG0` (A0)](https://www.evm.codes/#a0) e [`LOG4` (A4)](https://www.evm.codes/#a4). O número depois do opcode de log especifica quantos tópicos a entrada de log contém.
  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_** Você pode chamar um outro contrato quando você está estático, mas se você o fizer, você não pode transferir ETH para ele.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_** Você não pode rodar [`SSTORE`](https://www.evm.codes/#55) a não ser que você tenha mais que G<sub>callstipend</sub> (definido como 2300 no apêndice G) gas.

## Validade do Destino do Salto 9.4.3 {#943-jump-dest-valid}

Aqui nós definimos formalmente quais são os opcodes [`JUMPDEST`](https://www.evm.codes/#5b). Nós não podemos apenas procurar por valor de byte 0x5B, porque ele pode estar dentro de um PUSH (e, portanto, dado, não um opcode).

Na equação (153) nós definimos a função, _N(i,w)_. O primeiro parâmetro, _i_, é a localização do opcode. A segunda, _w_, é o próprio opcode. Se _w∈[PUSH1, PUSH32]_ que significa que o opcode é um PUSH (colchetes definem uma faixa que inclui os endpoints). Se esse caso, o próximo opcode é em _i+2+(w−PUSH1)_. Para [`PUSH1`](https://www.evm.codes/#60) nós precisamos avançar dois bytes (o PUSH propriamente dito e o valor de um byte), para [`PUSH2`](https://www.evm.codes/#61) nós precisamos avançar três bytes porque é um valor de dois bytes, etc. Todos os outros opcodes EVM são apenas um byte de comprimento, então em todos os outros casos _N(i,w)=i+1_.

Esta função é usada na equação (152) para definir _D<sub>J</sub>(c,i)_, o qual é o [conjunto](https://en.wikipedia.org/wiki/Set_(mathematics)) de todos as destinações válidas de salto no código _c_, começando com a localização do opcode _i_. Esta função é definida recursivamente. Se _i≥||c||_, isto significa que nós estamos no fim do código ou depois dele. Nós não vamos descobrir mais nenhuma destinação de salto, então apenas retorna um conjunto vazio.

Em todos os outros casos nós estamos olhando no resto do código indo para o próximo opcode e obtendo o conjunto iniciando dele. _c[i]_ é o opcode atual, então _N(i,c[i])_ é a localização do próximo opcode. _D<sub>J</sub>(c,N(i,c[i]))_ é portanto o conjunto de destinos válidos de jump que começa no próximo opcode. Se o opcode atual não é um`JUMPDEST`, apenas retorne aquele conjunto. Se ele é `JUMPDEST`, inclua-o no conjunto de resultado e retorne-o.

## Parada normal 9.4.4 {#944-normal-halt}

A função halting _H_, pode retornar três tipos de valores.

- Se nós não estivermos em um opcode halt, retorne _∅_, o conjunto vazio. Por convenção, este valor é interpretado como o falso booleano.
- Se nós temos um opcode halt que não produz saída (seja um [`STOP`](https://www.evm.codes/#00) ou [`SELFDESTRUCT`](https://www.evm.codes/#ff)), retorna uma sequência de tamanho zero bytes como valor de retorno. Note que isto é muito diferente do conjunto vazio. Este valor significa que a EVM realmente parou, apenas não há dados de retorno para ler.
- Se nós tivermos um opcode de halt que produz sim saída (seja [`RETURN`](https://www.evm.codes/#f3) ou [`REVERT`](https://www.evm.codes/#fd)), retorna a sequência de bytes especificada por este opcode. Esta sequência é pega da memória, o valor no topo da pilha (_μ<sub>s</sub>[0]_) é o primeiro byte, e o valor depois dele (_μ<sub>s</sub>[1]_) é o comprimento.

## Conjunto de instruções H.2 {#h2-instruction-set}

Antes de nós irmos para a subseção final da EVM, 9.5, vamos ver as instruções propriamente ditas. Elas estão definidas no apêndice H.2 que começa na página 29. Qualquer coisa que não esteja especificada como mudança com este específico opcode é esperada que continue o mesmo. Variáveis que realmente mudam são especificadas como \<algumacoisa\>′.

Por exemplo, vamos olhar o opcode [`ADD`](https://www.evm.codes/#01).

| Valor | Mnemônico | δ | α | Descrição                                                 |
| -----:| --------- | - | - | --------------------------------------------------------- |
|  0x01 | ADD       | 2 | 1 | Operação adição.                                          |
|       |           |   |   | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ é o número de valores que nós pegamos da pilha. Neste caso dois, porque nós estamos adicionando no topo dois valores.

_α_ é o número de valores que nós retrocedemos. Neste caso um, a soma.

Então o novo topo da pilha (_μ′<sub>s</sub>[0]_) é a soma do velho topo da pilha (_μ<sub>s</sub>[0]_) e o velho valor abaixo dele (_μ<sub>s</sub>[1]_).

Ao invés de passar por todos os opcodes com olhos vidrados na lista, este artigo explica somente aqueles opcodes que introduzem algo novo.

| Valor | Mnemônico | δ | α | Descrição                                                                                                  |
| -----:| --------- | - | - | ---------------------------------------------------------------------------------------------------------- |
|  0x20 | KECCAK256 | 2 | 1 | Computa o hash Keccak-256.                                                                                 |
|       |           |   |   | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|       |           |   |   | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                      |

Este é o primeiro opcode que acessa memória (nesse caso, somente leitura). Entretanto, ele pode expandir além dos limites atuais de memória, portanto nós precisamos atualizar _μ<sub>i</sub>._ Nós fazemos isso usando a função _M_ definida na equação 328 na pág. 29.

| Valor | Mnemônico | δ | α | Descrição                    |
| -----:| --------- | - | - | ---------------------------- |
|  0x31 | BALANCE   | 1 | 1 | Obtém o saldo de dada conta. |
|       |           |   |   | ...                          |

O endereço destes saldos que nós precisamos encontrar é _μ<sub>s</sub>[0] mod 2<sup>160</sup>_. O topo da pilha é o endereço, mas por endereços serem somente 160 bits, nós calculamos o valor [modulo](https://en.wikipedia.org/wiki/Modulo_operation) 2<sup>160</sup>.

Se _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_, isto significa que há informação sobre este endereço. Neste caso, _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ é o saldo para aquele endereço. Se _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_, significa que este endereço não está inicializado e que o saldo é zero. Você pode ver a lista de campos de informações de contas na seção 4.1 na página 4.

A segunda equação, _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ {μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, é relacionada com a diferença no custo entre acesso à warm storage (storage que foi recenteimente acessada e é provável que esteja em cache) e cold storage (storage que não tem sido acessada e provavelmente esteja em uma storage mais lenta, que é mais cara para se recuperar). _A<sub>a</sub>_ é a lista de endereços previamente acessados pela transação, que deveria, portanto ser de acesso mais barato, como definido na seção 6.1 na página 8. Você pode ler mais sobre este assunto em [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929).

| Valor | Mnemônico | δ  | α  | Descrição                               |
| -----:| --------- | -- | -- | --------------------------------------- |
|  0x8F | DUP16     | 16 | 17 | Duplica o 16o item da pilha.            |
|       |           |    |    | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

Note que para usar qualquer item da pilha, nós precisamos pegá-lo, o que significa que nós também precisamos pegar todos os itens da pilha acima dele. No caso de [`DUP<n>`](https://www.evm.codes/#8f) e [`SWAP<n>`](https://www.evm.codes/#9f), isto significa ter que pegar e então empurrar os dezesseis valores.

## O ciclo de execução 9.5 {#95-exec-cycle}

Agora que nós temos todas as partes, nós podemos finalmente entender como o ciclo de execução da EVM é documentado.

A equação (155) diz que dado o estado:

- _σ_ (estado global do blockchain)
- _μ_ (estado da EVM)
- _A_ (sub-estado, mudanças a acontecer quando a transação terminar)
- _I_ (ambiente de execução)

O novo estado é _(σ', μ', A', I')_.

Equações (156)-(158) definem a pilha e a mudança nela devido a um opcode (_μ<sub>s</sub>_). Equação (159) é a mudança em gas (_μ<sub>g</sub>_). Equação (160) é a mudança no contador do programa (_μ<sub>pc</sub>_). Finalmente, equações (161)-(164) especificam que os outros parâmetros continuam iguais, salvo explicitamente mudados pelo opcode.

Com isto, a EVM está totalmente definida.

## Conclusão {#conclusion}

Notação matemática é precisa e tem permitido o Yellow Paper especificar cada detalhe do Ethereum. Entretanto, ela tem realmente algumas desvantagens:

- Ela só pode ser entendida por humanos, o que significa que [testes de conformidade](https://github.com/ethereum/tests) devem ser escritos manualmente.
- Programadores entendem código de computador. Eles podem ou não entender notação matemática.

Talvez por estas razões, a mais nova [especificação da camada de consenso](https://github.com/ethereum/consensus-specs/blob/dev/tests/core/pyspec/README.md) seja escrita em Python. Estas são [especificações da camada de execução em Python](https://ethereum.github.io/execution-specs), mas elas não estão completas. Até que, ou a não ser que, o Yellow Paper inteiro esteja também traduzido para Python ou linguagem similar, o Yellow Paper continuará em serviço, e é útil ser capaz de lê-lo.
