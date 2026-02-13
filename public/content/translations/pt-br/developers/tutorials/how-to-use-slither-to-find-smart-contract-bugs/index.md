---
title: Como usar o Slither para encontrar bugs em contratos inteligentes
description: Como usar o Slither para encontrar automaticamente bugs em contratos inteligentes
author: Trailofbits
lang: pt-br
tags: [ "solidez", "smart contracts", "segurança", "testando" ]
skill: advanced
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Como usar o Slither {#how-to-use-slither}

O objetivo deste tutorial é mostrar como usar o Slither para localizar automaticamente bugs em contratos inteligentes.

- [Instalação](#installation)
- [Uso da linha de comando](#command-line)
- [Introdução à análise estática](#static-analysis): Breve introdução à análise estática
- [API](#api-basics): Descrição da API Python

## Instalação {#installation}

O Slither requer a versão 3.6 do Python ou superior. Pode ser instalado via pip ou usando o docker.

Slither via pip:

```bash
pip3 install --user slither-analyzer
```

Slither via docker:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_O último comando executa o eth-security-toolbox em um docker que tem acesso ao seu diretório atual. Você pode alterar os arquivos do seu host e executar as ferramentas nos arquivos do docker_

Dentro do docker, execute:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Executando um script {#running-a-script}

Para executar um script python com python 3:

```bash
python3 script.py
```

### Linha de comando {#command-line}

**Linha de comando versus scripts definidos pelo usuário.** O Slither vem com um conjunto de detectores predefinidos que encontram muitos bugs comuns. Chamar o Slither pela linha de comando executará todos os detectores, não é necessário conhecimento detalhado de análise estática:

```bash
slither project_paths
```

Além dos detectores, o Slither tem recursos de revisão de código por meio de seus [printers](https://github.com/crytic/slither#printers) e [ferramentas](https://github.com/crytic/slither#tools).

Use o [crytic.io](https://github.com/crytic) para obter acesso a detectores privados e integração com o GitHub.

## Análise estática {#static-analysis}

As capacidades e o design da estrutura de análise estática Slither foram descritos em posts de blog ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) e em um [artigo acadêmico](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

A análise estática existe em diferentes "sabores". Você provavelmente percebe que compiladores como [clang](https://clang-analyzer.llvm.org/) e [gcc](https://lwn.net/Articles/806099/) dependem dessas técnicas de pesquisa, mas elas também são a base para ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/)) e ferramentas baseadas em métodos formais como [Frama-C](https://frama-c.com/) e [Polyspace](https://www.mathworks.com/products/polyspace.html).

Não faremos uma revisão exaustiva das técnicas de análise estática e dos pesquisadores aqui. Em vez disso, vamos nos concentrar no que é necessário para entender como o Slither funciona para que você possa usá-lo com mais eficácia para encontrar bugs e entender o código.

- [Representação de código](#code-representation)
- [Análise de código](#analysis)
- [Representação intermediária](#intermediate-representation)

### Representação de código {#code-representation}

Em contraste com uma análise dinâmica, que analisa um único caminho de execução, a análise estática analisa todos os caminhos de uma só vez. Para isso, ela se baseia em uma representação de código diferente. As duas mais comuns são a árvore de sintaxe abstrata (AST) e o grafo de fluxo de controle (CFG).

### Árvores de Sintaxe Abstrata (AST) {#abstract-syntax-trees-ast}

As ASTs são usadas sempre que o compilador analisa o código. É provavelmente a estrutura mais básica sobre a qual a análise estática pode ser realizada.

Em resumo, uma AST é uma árvore estruturada onde, geralmente, cada folha contém uma variável ou uma constante, e os nós internos são operandos ou operações de fluxo de controle. Considere o seguinte código:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

A AST correspondente é mostrada em:

![AST](./ast.png)

O Slither usa a AST exportada pelo solc.

Embora seja simples de construir, a AST é uma estrutura aninhada. Às vezes, essa não é a forma mais direta de analisar. Por exemplo, para identificar as operações usadas pela expressão `a + b <= a`, você deve primeiro analisar `<=` e depois `+`. Uma abordagem comum é usar o chamado padrão de visitante, que navega pela árvore recursivamente. O Slither contém um visitante genérico em [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

O código a seguir usa o `ExpressionVisitor` para detectar se a expressão contém uma adição:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression is the expression to be tested
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### Grafo de Fluxo de Controle (CFG) {#control-flow-graph-cfg}

A segunda representação de código mais comum é o grafo de fluxo de controle (CFG). Como o nome sugere, é uma representação baseada em grafo que expõe todos os caminhos de execução. Cada nó contém uma ou várias instruções. As arestas no grafo representam as operações de fluxo de controle (if/then/else, loop, etc). O CFG do nosso exemplo anterior é:

![CFG](./cfg.png)

O CFG é a representação sobre a qual a maioria das análises é construída.

Existem muitas outras representações de código. Cada representação tem vantagens e desvantagens, dependendo da análise que você deseja realizar.

### Análise {#analysis}

O tipo mais simples de análise que você pode realizar com o Slither é a análise sintática.

### Análise de sintaxe {#syntax-analysis}

O Slither pode navegar pelos diferentes componentes do código e sua representação para encontrar inconsistências e falhas usando uma abordagem do tipo correspondência de padrões.

Por exemplo, os seguintes detectores procuram por problemas relacionados à sintaxe:

- [Sombreamento de variável de estado](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): itera sobre todas as variáveis de estado e verifica se alguma sombreia uma variável de um contrato herdado ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Interface ERC20 incorreta](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): procura por assinaturas de função ERC20 incorretas ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Análise semântica {#semantic-analysis}

Em contraste com a análise de sintaxe, uma análise semântica irá mais a fundo e analisará o "significado" do código. Esta família inclui alguns tipos abrangentes de análises. Elas levam a resultados mais poderosos e úteis, mas também são mais complexas de escrever.

As análises semânticas são usadas para as detecções de vulnerabilidades mais avançadas.

#### Análise de dependência de dados {#fixed-point-computation}

Diz-se que uma variável `variable_a` tem dependência de dados de `variable_b` se houver um caminho no qual o valor de `variable_a` é influenciado por `variable_b`.

No código a seguir, `variable_a` depende de `variable_b`:

```solidity
// ...
variable_a = variable_b + 1;
```

O Slither vem com recursos integrados de [dependência de dados](https://github.com/crytic/slither/wiki/data-dependency), graças à sua representação intermediária (discutida em uma seção posterior).

Um exemplo de uso de dependência de dados pode ser encontrado no [detector de igualdades estritas perigosas](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). Aqui, o Slither procurará por uma comparação de igualdade estrita com um valor perigoso ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)), e informará ao usuário que deve usar `>=` ou `<=` em vez de `==`, para evitar que um invasor prenda o contrato em uma armadilha. Entre outras coisas, o detector considerará perigoso o valor de retorno de uma chamada para `balanceOf(address)` ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)) e usará o mecanismo de dependência de dados para rastrear seu uso.

#### Computação de ponto fixo {#fixed-point-computation}

Se sua análise navegar pelo CFG e seguir as arestas, você provavelmente verá nós já visitados. Por exemplo, se um loop for apresentado como mostrado abaixo:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

Sua análise precisará saber quando parar. Existem duas estratégias principais aqui: (1) iterar em cada nó um número finito de vezes, (2) computar um chamado _ponto fixo_. Um ponto fixo basicamente significa que analisar este nó não fornece nenhuma informação significativa.

Um exemplo de uso de ponto fixo pode ser encontrado nos detectores de reentrância: o Slither explora os nós e procura por chamadas externas, escrita e leitura no armazenamento. Depois de atingir um ponto fixo ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), ele interrompe a exploração e analisa os resultados para ver se há uma reentrância, por meio de diferentes padrões de reentrância ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

Escrever análises usando computação de ponto fixo eficiente requer uma boa compreensão de como a análise propaga suas informações.

### Representação intermediária {#intermediate-representation}

Uma representação intermediária (RI) é uma linguagem destinada a ser mais adequada à análise estática do que a original. O Slither traduz Solidity para sua própria RI: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Entender o SlithIR não é necessário se você quiser apenas escrever verificações básicas. No entanto, será útil se você planeja escrever análises semânticas avançadas. Os printers [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) e [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) ajudarão você a entender como o código é traduzido.

## Conceitos básicos da API {#api-basics}

O Slither tem uma API que permite explorar atributos básicos do contrato e suas funções.

Para carregar uma base de código:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Explorando contratos e funções {#exploring-contracts-and-functions}

Um objeto `Slither` tem:

- `contracts (list(Contract)`: lista de contratos
- `contracts_derived (list(Contract)`: lista de contratos que não são herdados por outro contrato (subconjunto de contratos)
- `get_contract_from_name (str)`: retorna um contrato a partir do seu nome

Um objeto `Contract` tem:

- `name (str)`: nome do contrato
- `functions (list(Function))`: lista de funções
- `modifiers (list(Modifier))`: lista de modificadores
- `all_functions_called (list(Function/Modifier))`: lista de todas as funções internas alcançáveis pelo contrato
- `inheritance (list(Contract))`: lista de contratos herdados
- `get_function_from_signature (str)`: retorna uma função a partir de sua assinatura
- `get_modifier_from_signature (str)`: retorna um modificador a partir de sua assinatura
- `get_state_variable_from_name (str)`: retorna uma StateVariable a partir do seu nome

Um objeto `Function` ou `Modifier` tem:

- `name (str)`: nome da função
- `contract (contract)`: o contrato onde a função é declarada
- `nodes (list(Node))`: lista dos nós que compõem o CFG da função/modificador
- `entry_point (Node)`: ponto de entrada do CFG
- `variables_read (list(Variable))`: lista de variáveis lidas
- `variables_written (list(Variable))`: lista de variáveis escritas
- `state_variables_read (list(StateVariable))`: lista de variáveis de estado lidas (subconjunto de `variables_read`)
- `state_variables_written (list(StateVariable))`: lista de variáveis de estado escritas (subconjunto de `variables_written`)
