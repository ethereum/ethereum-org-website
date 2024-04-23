---
title: Como usar o Manticore para encontrar bugs em contratos inteligentes
description: Como usar o Manticore para encontrar bugs automaticamente em contratos inteligentes
author: Trailofbits
lang: pt-br
tags:
  - "solidez"
  - "smart contracts"
  - "segurança"
  - "testando"
  - "verificação formal"
skill: advanced
published: 2020-01-13
source: Construindo contratos seguros
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

O objetivo deste tutorial é mostrar como usar o Manticore para encontrar bugs em contratos inteligentes automaticamente.

## Instalação {#installation}

Manticore requer >= python 3.6. Pode ser instalado pelo pip ou usando o docker.

### Manticore através do Docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_O último comando roda a eth-security-toolbox em um docker que tem acesso ao seu diretório atual. Você pode alterar os arquivos do seu host e executar as ferramentas nos arquivos através do docker_

Dentro do docker, execute:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Manticore através do pip {#manticore-through-pip}

```bash
pip3 install --user manticore
```

solc 0.5.11 é recomendado.

### Executando um script {#running-a-script}

Para executar um script python com python 3:

```bash
python3 script.py
```

## Introdução à execução simbólica dinâmica {#introduction-to-dynamic-symbolic-execution}

### Execução Simbólica Dinâmica em uma Nutshell {#dynamic-symbolic-execution-in-a-nutshell}

A execução simbólica dinâmica (DSE) é uma técnica de análise de programa que explora um espaço de estado com um alto grau de consciência semântica. Esta técnica baseia-se na descoberta de "caminhos do programa", representados como fórmulas matemáticas chamadas de `predicados de caminho`. Conceitualmente, esta técnica opera em predicados de caminho em dois passos:

1. Eles são construídos usando restrições na entrada de dados do programa.
2. Eles são usados para gerar entradas no programa que farão com que os caminhos associados sejam executados.

Esta abordagem não produz falsos positivos no sentido de que todos os estados identificados do programa podem ser acionados durante a execução concreta. Por exemplo, se a análise encontrar um integer overflow, é certo que será reproduzível.

### Exemplo de Predicado do Caminho {#path-predicate-example}

Para se ter uma idéia de como o DSE funciona, considere o seguinte exemplo:

```solidity
function f(uint a){

  if (a == 65) {
      // Um bug está presente
  }

}
```

Como `f()` contém dois caminhos, uma DSE construirá dois caminhos diferentes atribuídos:

- Caminho 1: `a == 65`
- Caminho 2: `Not (a == 65)`

Cada caminho atribuido é uma fórmula matemática que pode ser dada a uma chamada [SMT solver](https://wikipedia.org/wiki/Satisfiability_modulo_theories), que tentará resolver a equação. Para o `Caminho 1`, o solver dirá que o caminho pode ser explorado com `a = 65`. Para o `Caminho 2`, o solver pode dar para `a` qualquer valor diferente de 65, por exemplo, `a = 0`.

### Verificando propriedades {#verifying-properties}

A Manticore permite um controle total sobre toda a execução de cada caminho. Como resultado, permite que você adicione restrições arbitrárias a quase qualquer coisa. Este controle permite a criação de propriedades no contrato.

Considere o seguinte exemplo:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // no overflow protection
  return c;
}
```

Aqui há apenas um caminho para explorar na função:

- Caminho 1: `c = a + b`

Usando o Manticore, você pode verificar se há overflow, e adicionar restrições à previsão do caminho:

- `c = a + b AND (c < a OR c < b)`

Se é possível encontrar uma avaliação de `um` e `b` para a qual o caminho predicado acima é viável, significa que encontrou um transbordamento ("overflow"). Por exemplo, o solver pode gerar a entrada `a = 10 , b = MAXUINT256`.

Se você considerar uma versão fixa:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

A fórmula associada com verificação de overflow seria:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

Esta fórmula não pode ser resolvida; em outras palavras, esta é uma **prova** que em `safe_add`, `c` irá sempre aumentar.

DSE é assim uma ferramenta poderosa, que pode verificar restrições arbitrárias no seu código.

## Executando sob Manticore {#running-under-manticore}

Veremos como explorar um contrato inteligente com a API Manticore. O alvo é o seguinte contrato inteligente [`exemplo.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;

contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Executar uma exploração independente {#run-a-standalone-exploration}

Você pode executar a Manticore diretamente no contrato inteligente pelo seguinte comando (`projeto` pode ser um Arquivo Solidity, ou um diretório de projeto):

```bash
$ manticore project
```

Você obterá a saída de casos de teste como este (a ordem pode mudar):

```
...
... m.c.manticore:INFO: Generated testcase No. 0 - STOP
... m.c.manticore:INFO: Generated testcase No. 1 - REVERT
... m.c.manticore:INFO: Generated testcase No. 2 - RETURN
... m.c.manticore:INFO: Generated testcase No. 3 - REVERT
... m.c.manticore:INFO: Generated testcase No. 4 - STOP
... m.c.manticore:INFO: Generated testcase No. 5 - REVERT
... m.c.manticore:INFO: Generated testcase No. 6 - REVERT
... m.c.manticore:INFO: Results in /home/ethsec/workshops/Automated Smart Contracts Audit - TruffleCon 2018/manticore/examples/mcore_t6vi6ij3
...
```

Sem informações adicionais, Manticore explorará o contrato com novas transações simbólicas até que não explore novos caminhos do contrato. Manticore não executa novas transações após uma falha (por exemplo: após um reversão).

Manticore irá gerar as informações em um diretório `mcore_*`. Entre outros, você encontrará nesse diretório:

- `global.summary`: cobertura e avisos do compilador
- `test_XXXXX.summary`: cobertura, última instrução, saldos de conta por caso de teste
- `test_XXXXX.tx`: lista detalhada de transações por caso de teste

Aqui, Manticore encontrou 7 casos de teste, que correspondem à (a ordem do nome do arquivo pode mudar):

|                      |     Transação 0     |      Transação 1       | Transação 2            | Resultado |
|:--------------------:|:-------------------:|:----------------------:| ---------------------- |:---------:|
| **test_00000000.tx** | Criação de contrato |        f(!=65)         | f(!=65)                |   STOP    |
| **test_00000001.tx** | Criação de contrato | função de contingência |                        |  REVERT   |
| **test_00000002.tx** | Criação de contrato |                        |                        |  RETURN   |
| **test_00000003.tx** | Criação de contrato |         f(65)          |                        |  REVERT   |
| **test_00000004.tx** | Criação de contrato |        f(!=65)         |                        |   STOP    |
| **test_00000005.tx** | Criação de contrato |        f(!=65)         | f(65)                  |  REVERT   |
| **test_00000006.tx** | Criação de contrato |        f(!=65)         | função de contingência |  REVERT   |

_Resumo da exploração f(!=65) denota f chamado com qualquer valor diferente de 65._

Como você pode perceber, Manticore gera um caso de teste único para cada transação bem sucedida ou revertida.

Use a flag `--quick-mode` se você quiser uma exploração rápida de código (ele desativa detectores de bugs, cálculo de gas, ...)

### Manipule um contrato inteligente através da API {#manipulate-a-smart-contract-through-the-api}

Esta seção descreve detalhes sobre como manipular um contrato inteligente através da API Manticore Python. Você pode criar um novo arquivo com a extensão python `*. y` e escreva o código necessário adicionando os comandos da API (básicos dos quais serão descritos abaixo) neste arquivo e então execute-o com o comando `$ python3 *. a`. Também você pode executar os comandos abaixo diretamente no console python, para executar o console use o comando `$ python3`.

### Criando Contas {#creating-accounts}

A primeira coisa que você deve fazer é iniciar uma nova blockchain com os seguintes comandos:

```python
from manticore.ethereum import ManticoreEVM
```

Uma conta de não-contrato é criada usando [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

```python
user_account = m.create_account(balance=1000)
```

Um contrato de Solidity pode ser implantado usando [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract):

```solidity
source_code = '''
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
'''
# Iniciar o contrato
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### Resumo {#summary}

- Você pode criar contas de usuário e contratos com [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) and [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### Executando transações {#executing-transactions}

Manticore suporta dois tipos de transação:

- Transação bruta: todas as funções são exploradas
- Transação nomeada: apenas uma função é explorada

#### Transação bruta {#raw-transaction}

Uma transação bruta é executada usando [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction):

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

O chamador, o endereço, os dados ou o valor da transação pode ser concreto ou simbólico:

- [m.make_symbollic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) cria um valor simbólico.
- [m.make_symbollic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) cria um valor simbólico "byte array".

Por exemplo:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value
```

Se os dados forem simbólicos, Manticore irá explorar todas as funções do contrato durante a execução da transação. Será útil ver a explicação de Função de Fallback nas [Mãos do CTF Ethernaut](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/), artigo para entender como a seleção de função funciona.

#### Transação nomeada {#named-transaction}

Funções podem ser executadas através de seu nome. Para executar `f(uint var)` com um valor simbólico, do user_account, e com 0 ether, use:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Se `valor` da transação não for especificado, ela é 0 por padrão.

#### Resumo {#summary-1}

- Os argumentos de uma transação podem ser concretos ou simbólicos
- Uma transação bruta irá explorar todas as funções
- A função pode ser chamada pelo nome

### Espaço de trabalho {#workspace}

`m.workspace` é o diretório usado como diretório de saída para todos os arquivos gerados:

```python
print("Results are in {}".format(m.workspace))
```

### Terminar a Exploração {#terminate-the-exploration}

Para parar a exploração, use [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). Nenhuma transação adicional deve ser enviada quando este método for chamado e a Manticore gerar casos de teste para cada caminho explorado.

### Resumo: Executando sob Manticore {#summary-running-under-manticore}

Juntando todos os passos anteriores, obtemos:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("Results are in {}".format(m.workspace))
m.finalize() # stop the exploration
```

Todo o código acima você pode encontrar no [`exemple_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Obtendo caminhos {#getting-throwing-paths}

Agora vamos gerar entradas específicas para os caminhos levantando uma exceção em `f()`. O alvo é ainda o seguinte contrato inteligente [`exemplo.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Usando informações do estado {#using-state-information}

Cada caminho executado tem seu estado de blockchain. Um estado ou está pronto ou é morto, o que significa que atinge um caminho de THROW ou REVERT:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): a lista de estados que estão prontos (não executaram um REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): a lista de estados que estão mortos
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): todos os estados

```python
for state in m.all_statees:
    # faz algo com estado
```

Você pode acessar informações de estado. Por exemplo:

- `state.platform.get_balance(account.address)`: o saldo da conta
- `state.platform.transactions`: a lista de transações
- `state.platform.transactions[-1].return_data`: os dados retornados pela última transação

Os dados retornados pela última transação são um array, que pode ser convertido para um valor com ABI.deserialize, por exemplo:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### Como gerar caixa de teste {#how-to-generate-testcase}

Use [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) para gerar a caixa de teste:

```python
m.generate_testcase(estado, 'BugFound')
```

### Resumo {#summary-2}

- Você pode iterar sobre o estado com m.all_states
- `state.platform.get_balance(account.address)` retorna o saldo da conta
- `state.platform.transactions` retorna a lista de transações
- `Transtion.return_data` são os dados retornados
- `m.generate_testcase(state, name)` gera entradas para o estado

### Resumo: Obtendo o caminho de lançamento {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Verificando se a execução termina com um REVERT ou INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Todo o código acima você pode encontrar no [`exemple_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Note que poderíamos ter gerado um script muito mais simples, como todos os estados retornados por terminated_state REVERT ou INVALID no seu resultado: este exemplo foi destinado apenas para demonstrar como manipular a API._

## Adicionar Restrições {#adding-constraints}

Veremos como restringir a exploração. Vamos fazer a suposição de que a documentação de `f()` que afirma que a função nunca é chamada com `a == 65`, então qualquer erro com `a == 65` não é um bug de verdade. O alvo é o seguinte contrato inteligente [`exemplo.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Operadores {#operators}

O módulo [Operadores](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) facilita a manipulação de restrições, entre outras que fornece:

- Operadores.AND,
- Operadores.OR,
- Operators.UGT (não assinado maior que),
- Operators.UGE (não assinado maior ou igual a),
- Operators.UGT (não assinado menor que),
- Operators.ULE (menor que ou igual a).

Para importar o módulo use o seguinte:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` é usado para concatenar uma matriz a um valor. Por exemplo, o return_data de uma transação precisa ser alterado para um valor a ser verificado contra outro valor:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Restrições {#state-constraint}

Você pode usar restrições globalmente ou para um estado específico.

#### Restrição global {#state-constraint}

Use `m.constrain(constraint)` para adicionar um constraint ("restrição") global. Por exemplo, você pode chamar um contrato de um endereço simbólico e restringir este endereço para serem valores específicos:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Restrição de estado {#state-constraint}

Use o estado de [. onstrain(restrição)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) para adicionar uma restrição a um estado específico. Ele pode ser usado para restringir o estado após sua exploração para verificar alguma propriedade nele.

### Verificando a constraint ("restrição") {#checking-constraint}

Use `solver.check(state.constraints)` para saber se uma restrição ainda é viável. Por exemplo, o seguinte irá restringir o simbolic_valor para ser diferente do 65 e verificar se o estado ainda é viável:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # estado é viável
```

### Resumo: Adicionando constraints ("restrições") {#summary-adding-constraints}

Adicionando constraints ("restrições") ao código anterior, obtemos:

```python
from manticore.ethereum import ManticoreEVM
from manticore.core.smtlib.solver import Z3Solver

solver = Z3Solver.instance()

m = ManticoreEVM()

with open("example.sol") as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

no_bug_found = True

## Verificar se a execução termina com um REVERT ou INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # we do not consider the path were a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

Todo o código acima você pode encontrar no [`exemple_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)
