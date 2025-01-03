---
title: Como utilizar o Slither para encontrar bugs nos contratos inteligentes
description: Como usar o Slither para encontrar automaticamente bugs em contratos inteligentes
author: Trailofbits
lang: pt-br
tags:
  - "solidity"
  - "smart contracts"
  - "segurança"
  - "testando"
  - "análise estática"
skill: advanced
published: 2020-06-09
source: Construindo contratos seguros
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Como usar o Slither {#how-to-use-slither}

O objetivo deste tutorial é mostrar como usar o Slither para localizar automaticamente bugs em contratos inteligentes.

- [Instalação](#installation)
- [Uso da linha de comando](#command-line)
- [Introdução à análise estática](#static-analysis): Breve introdução à análise estática
- [API](#api-basics): Descrição da API Python

## Instalação {#installation}

O Slither requer a versão 3.6 do Python ou superior. Pode ser instalado pelo pip ou usando o docker.

Slither via pip:

```bash
pip3 install --user slither-analyzer
```

Slither através de docker:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_O último comando roda a eth-security-toolbox em um docker que tem acesso ao seu diretório atual. Você pode alterar os arquivos do seu host e executar as ferramentas nos arquivos através do docker_

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

**Linha de comando versus scripts definidos pelo usuário.** O Slither vem com um conjunto de detectores predefinidos que encontram muitos bugs comuns. Chamar o Slither na linha de comando irá executar todos os detectores. Nenhum conhecimento detalhado da análise estática é necessária:

```bash
slither project_paths
```

Além de detectadores, o Slither possui recursos de revisão de código através de suas [printers](https://github.com/crytic/slither#printers) e [ferramentas](https://github.com/crytic/slither#tools).

Use [crytic.io](https://github.com/crytic) para obter acesso a detectadores privados e integração GitHub.

## Análise estática {#static-analysis}

Os recursos e design do framework estático de análise do Slither foram descritos nos posts de blog ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/)), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) e em um [documento acadêmico](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

A análise estática existe em diferentes "flavors". Você provavelmente percebe que compiladores como [clang](https://clang-analyzer.llvm.org/) e [gcc](https://lwn.net/Articles/806099/) dependem destas técnicas de pesquisa, mas também sustenta ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) e ferramentas baseadas em métodos formais como [Frama-C](https://frama-c.com/) e [Polyspace](https://www.mathworks.com/products/polyspace.html).

Nós não analisaremos exaustivamente técnicas de análise estática e pesquisador aqui. Em vez disso, vamos focar no que é necessário para entender como o Slither funciona para que você possa usá-lo de forma mais eficiente para encontrar bugs e entender códigos.

- [Representação de código](#code-representation)
- [Análise de código](#analysis)
- [Representação intermediária](#intermediate-representation)

### Representação de código {#code-representation}

Em contraste com uma análise dinâmica, que justifica um único caminho de execução, razões de análise estática sobre todos os caminhos ao mesmo tempo. Para isso, ele depende de uma representação diferente do código. As duas mais comuns são a árvore de sintaxe abstrata (AST) e o gráfico de fluxo de controle (CFG).

### Árvores de sintaxe abstratas (AST) {#abstract-syntax-trees-ast}

AST é usado toda vez que o compilador analisa o código. É provavelmente a estrutura mais básica sobre a qual se pode efetuar a análise estática.

Em poucas palavras, a AST é uma árvore estruturada onde, normalmente, cada folha contém uma variável ou uma constante e os nós internos são operações ou operações de fluxo de controle. Considere o seguinte código:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

O AST correspondente é mostrado em:

![AST](./ast.png)

O Slither usa o AST exportado pelo solc.

Enquanto for simples construir, o AST é uma estrutura aninhada. Por vezes, esta não é a mais simples de analisar. Por exemplo, para identificar as operações usadas pela expressão `a + b <= a`,, primeiro você deve analisar `<=` e, em seguida, `+`. Uma abordagem comum é usar o chamado padrão de visitantes, que navega pela árvore recursivamente. O Slither contém um visitante genérico em [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

O código a seguir usa `ExpressionVisitor` para detectar se a expressão contém uma adição:

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

### Controlar Gráfico de Fluxos (CFG) {#control-flow-graph-cfg}

A segunda representação de código mais comum é o gráfico de fluxo de controle (CFG). Como seu nome sugere, é uma representação baseada em gráficos que expõe todos os caminhos de execução. Cada nó contém uma ou várias instruções. Bordas no gráfico representam as operações de fluxo de controle (se/então/outra vez, loop, etc). O nosso exemplo anterior é o do CFG:

![CFG](./cfg.png)

O CFG é a representação que está por cima da qual se constrói a maioria das análises.

Existem muitas outras representações de código. Cada representação tem vantagens e desvantagens de acordo com a análise que você deseja realizar.

### Análise {#analysis}

O tipo mais simples de análises que você pode realizar com o Slither são análises sintáticas.

### Análises de sintaxe {#syntax-analysis}

O Slither pode navegar através dos diferentes componentes do código e sua representação para encontrar inconsistências e falhas usando uma abordagem semelhante a padrões de correspondência.

Por exemplo, os seguintes detectores procuram por problemas relacionados à sintaxe:

- [State variable shadowing](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): itera sobre todas as variáveis de estado e verifica se tem alguma variável "shadow" de um contrato herdado ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Interface ERC20 incorreta](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): procurar por assinaturas de função ERC20 incorretas ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Análise semântica {#semantic-analysis}

Em contraste com a análise de sintaxe, uma análise semântica vai aprofundar e analisar o "significado" do código. Esta família inclui vários tipos de análises. Conduzem a resultados mais poderosos e úteis, mas são também mais complexos de escrever.

Análises semânticas são usadas para detecções de vulnerabilidades mais avançadas.

#### Análise de dependência de dados {#fixed-point-computation}

Uma variável `variable_a` diz ser dependente de dados `variable_b` se houver um caminho para o qual o valor de `variable_a` seja influenciado pela `variable_b`.

No código a seguir, `variable_a` depende de `variable_b`:

```solidity
// ...
variable_a = variable_b + 1;
```

O Slither vem com capacidades embutidas de [dependência de dados,](https://github.com/crytic/slither/wiki/data-dependency) graças à sua representação intermediária (discutida em uma seção posterior).

Um exemplo de uso de dependência de dados pode ser encontrado em ["dangerous strict equality detector"](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). Aqui o Slither procurará por uma comparação rigorosa de igualdade com um valor perigoso ([incorrect_strict_equality. y#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)), e informará o usuário que deve usar `>=` ou `<=` ao invés de `==`para evitar um invasor para prender o contrato. Entre outros, o detector considerará como perigoso o valor de retorno de uma chamada para o `balanceOf(endereço)` ([incorrect_strict_equality. y#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)), e usará o mecanismo de dependência de dados para rastrear seu uso.

#### Cálculo de ponto fixo {#fixed-point-computation}

Se a sua análise navegar através do CFG e seguir as bordas, é provável que você veja os nós já visitados. Por exemplo, se um loop é apresentado como mostrado abaixo:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

A sua análise terá de saber quando parar. Existem duas estratégias principais aqui: (1) iterar em cada nó um número finito de vezes, (2) calcular um chamado _fixpoint_. Um ponto de acesso basicamente significa que a análise deste nó não fornece nenhuma informação significativa.

Um exemplo de fixpoint usado pode ser encontrado nos detectadores de reentrância: Slither explora os nós, e procurar por chamadas externas, escrever e ler para armazenar. Uma vez que chegou a um ponto de correção ("fixpoint") ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), interrompe a exploração e analisa os resultados para ver se uma reentrância está presente, através de diferentes padrões de reentrada ([reentrancy_benign. y](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

Escrever análises usando um cálculo de ponto fixo eficiente requer um bom entendimento de como a análise propaga sua informação.

### Representação intermediária {#intermediate-representation}

Uma representação intermediária (IR) é uma linguagem que deve ser mais acessível à análise estática do que a original. Slither traduz Solidity para seu próprio IR: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Compreender o SlithIR não é necessário se você quiser apenas escrever verificações básicas. No entanto, será útil se você planejar escrever análises semânticas avançadas. As [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) e [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa)printers irão ajudá-lo a entender como o código é traduzido.

## API Básica {#api-basics}

Slither tem uma API que permite explorar os atributos básicos do contrato e suas funções.

Carregando um codebase:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Explorando contratos e funções {#exploring-contracts-and-functions}

Um objeto `Slither` contém:

- contracts`contracts (list(Contract)`: lista de contratos
- `contracts_derived (list(Contract)`: lista de contratos que não são herdados por outro contrato (subconjunto de contratos)
- `get_contract_from_name (str)`: Retorna um contrato a partir de seu nome

Um objeto `Slither` contém:

- `name (str)`: Nome do contrato
- `functions (list(Function))`: Lista de funções
- `modifiers (list(Modifier))`: Lista de funções
- `all_functions_called (list(Função/Modificador))`: Lista de todas as funções internas acessíveis pelo contrato
- `herança (lista(contrato))`: Lista de contratos herdados
- `get_function_from_signature (str)`: Retorna uma função a partir de sua assinatura
- `get_function_from_signature (str)`: Retorna uma função a partir de sua assinatura
- `get_contract_from_name (str)`: Retorna um contrato a partir de seu nome

Um objeto `Function` ou `Modifier` têm:

- `name (str)`: Nome da função
- `contract (contract)`: o contrato onde a função é declarada
- `nodes (list(Node))`: Lista dos nós que compõem o CFG da função/modificador
- `entry_point (Node)`: Ponto de entrada do CFG
- `variables_read (list(variável))`: Lista de variáveis lidas
- `variables_written (list(variável))`: Lista de variáveis escritas
- `state_variables_read (list(StateVariable))`: Lista de variáveis de estado lidas (subconjunto de variáveis lidas)
- `state_variables_written (list(StateVariable))`: Lista de variáveis de estado escritas (subconjunto de variáveis escritas)
