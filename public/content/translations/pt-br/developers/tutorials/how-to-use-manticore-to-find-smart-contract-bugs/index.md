---
title: Como usar o Manticore para encontrar bugs em contratos inteligentes
description: Como usar o Manticore para encontrar bugs em contratos inteligentes automaticamente
author: Trailofbits
lang: pt-br
tags:
  [
    "solidez",
    "smart contracts",
    "segurança",
    "testando",
    "verificação formal"
  ]
skill: advanced
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

O objetivo deste tutorial é mostrar como usar o Manticore para encontrar bugs em contratos inteligentes automaticamente.

## Instalação {#installation}

Manticore requer >= python 3.6. Pode ser instalado via pip ou usando o docker.

### Manticore via docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_O último comando executa o eth-security-toolbox em um docker que tem acesso ao seu diretório atual. Você pode alterar os arquivos do seu host e executar as ferramentas nos arquivos do docker_

Dentro do docker, execute:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Manticore via pip {#manticore-through-pip}

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

### Execução Simbólica Dinâmica em poucas palavras {#dynamic-symbolic-execution-in-a-nutshell}

A execução simbólica dinâmica (DSE) é uma técnica de análise de programa que explora um espaço de estado com um alto grau de consciência semântica. Esta técnica é baseada na descoberta de "caminhos de programa", representados como fórmulas matemáticas chamadas de `predicados de caminho`. Conceitualmente, esta técnica opera em predicados de caminho em duas etapas:

1. Eles são construídos usando restrições na entrada do programa.
2. Eles são usados para gerar entradas de programa que farão com que os caminhos associados sejam executados.

Esta abordagem não produz falsos positivos, no sentido de que todos os estados de programa identificados podem ser acionados durante a execução concreta. Por exemplo, se a análise encontrar um integer overflow, é garantido que será reproduzível.

### Exemplo de Predicado de Caminho {#path-predicate-example}

Para ter uma ideia de como o DSE funciona, considere o seguinte exemplo:

```solidity
function f(uint a){

  if (a == 65) {
      // Um bug está presente
  }

}
```

Como `f()` contém dois caminhos, um DSE construirá dois predicados de caminho diferentes:

- Caminho 1: `a == 65`
- Caminho 2: `Not (a == 65)`

Cada predicado de caminho é uma fórmula matemática que pode ser fornecida a um chamado [solucionador SMT](https://wikipedia.org/wiki/Satisfiability_modulo_theories), que tentará resolver a equação. Para o `Caminho 1`, o solucionador dirá que o caminho pode ser explorado com `a = 65`. Para o `Caminho 2`, o solucionador pode atribuir a `a` qualquer valor diferente de 65, por exemplo `a = 0`.

### Verificando propriedades {#verifying-properties}

O Manticore permite controle total sobre toda a execução de cada caminho. Como resultado, ele permite que você adicione restrições arbitrárias a quase tudo. Este controle permite a criação de propriedades no contrato.

Considere o seguinte exemplo:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // sem proteção contra overflow
  return c;
}
```

Aqui, há apenas um caminho a ser explorado na função:

- Caminho 1: `c = a + b`

Usando o Manticore, você pode verificar se há overflow e adicionar restrições ao predicado de caminho:

- `c = a + b AND (c < a OR c < b)`

Se for possível encontrar uma valoração de `a` e `b` para a qual o predicado de caminho acima seja viável, significa que você encontrou um overflow. Por exemplo, o solucionador pode gerar a entrada `a = 10, b = MAXUINT256`.

Se você considerar uma versão corrigida:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

A fórmula associada com a verificação de overflow seria:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

Esta fórmula não pode ser resolvida; em outras palavras, esta é uma **prova** de que em `safe_add`, `c` sempre aumentará.

O DSE é, portanto, uma ferramenta poderosa que pode verificar restrições arbitrárias em seu código.

## Executando no Manticore {#running-under-manticore}

Veremos como explorar um contrato inteligente com a API do Manticore. O alvo é o seguinte contrato inteligente [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Execute uma exploração autônoma {#run-a-standalone-exploration}

Você pode executar o Manticore diretamente no contrato inteligente com o seguinte comando (`project` pode ser um arquivo Solidity ou um diretório de projeto):

```bash
$ manticore project
```

Você receberá a saída de casos de teste como este (a ordem pode mudar):

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

Sem informações adicionais, o Manticore explorará o contrato com novas transações
simbólicas até que não explore novos caminhos no contrato. O Manticore não executa novas transações após uma que falhou (ex: após uma reversão).

O Manticore produzirá a informação em um diretório `mcore_*`. Entre outras coisas, você encontrará neste diretório:

- `global.summary`: cobertura e avisos do compilador
- `test_XXXXX.summary`: cobertura, última instrução, saldos da conta por caso de teste
- `test_XXXXX.tx`: lista detalhada de transações por caso de teste

Aqui o Manticore encontra 7 casos de teste, que correspondem a (a ordem do nome do arquivo pode mudar):

|                                                           |     Transação 0     |         Transação 1        | Transação 2                | Resultado |
| :-------------------------------------------------------: | :-----------------: | :------------------------: | -------------------------- | :-------: |
| **test_00000000.tx** | Criação de contrato | f(!=65) | f(!=65) |    STOP   |
| **test_00000001.tx** | Criação de contrato |     função de fallback     |                            |   REVERT  |
| **test_00000002.tx** | Criação de contrato |                            |                            |   RETURN  |
| **test_00000003.tx** | Criação de contrato |  f(65)  |                            |   REVERT  |
| **test_00000004.tx** | Criação de contrato | f(!=65) |                            |    STOP   |
| **test_00000005.tx** | Criação de contrato | f(!=65) | f(65)   |   REVERT  |
| **test_00000006.tx** | Criação de contrato | f(!=65) | função de fallback         |   REVERT  |

_Resumo da exploração f(!=65) denota f chamado com qualquer valor diferente de 65._

Como você pode perceber, o Manticore gera um caso de teste único para cada transação bem-sucedida ou revertida.

Use a flag `--quick-mode` se você quiser uma exploração rápida de código (ela desativa detectores de bugs, computação de gás, ...)

### Manipular um contrato inteligente através da API {#manipulate-a-smart-contract-through-the-api}

Esta seção descreve em detalhes como manipular um contrato inteligente através da API Python do Manticore. Você pode criar um novo arquivo com a extensão python `*.py` e escrever o código necessário adicionando os comandos da API (cujos fundamentos serão descritos abaixo) neste arquivo e, em seguida, executá-lo com o comando `$ python3 *.py`. Você também pode executar os comandos abaixo diretamente no console do python; para executar o console, use o comando `$ python3`.

### Criando Contas {#creating-accounts}

A primeira coisa que você deve fazer é iniciar uma nova cadeia de blocos com os seguintes comandos:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Uma conta que não seja de contrato é criada usando [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

```python
user_account = m.create_account(balance=1000)
```

Um contrato Solidity pode ser implantado usando [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract):

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

- Você pode criar contas de usuário e de contrato com [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) e [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### Executando transações {#executing-transactions}

O Manticore suporta dois tipos de transação:

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

O chamador, o endereço, os dados ou o valor da transação podem ser concretos ou simbólicos:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) cria um valor simbólico.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) cria uma matriz de bytes simbólica.

Por exemplo:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

Se os dados forem simbólicos, o Manticore explorará todas as funções do contrato durante a execução da transação. Será útil ver a explicação da Função de Fallback no artigo [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) para entender como a seleção de funções funciona.

#### Transação nomeada {#named-transaction}

As funções podem ser executadas pelo nome.
Para executar `f(uint var)` com um valor simbólico, de user_account, e com 0 ether, use:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Se o `value` da transação não for especificado, ele será 0 por padrão.

#### Resumo {#summary-1}

- Argumentos de uma transação podem ser concretos ou simbólicos
- Uma transação bruta explorará todas as funções
- A função pode ser chamada pelo seu nome

### Espaço de trabalho {#workspace}

`m.workspace` é o diretório usado como diretório de saída para todos os arquivos gerados:

```python
print("Os resultados estão em {}".format(m.workspace))
```

### Encerrar a exploração {#terminate-the-exploration}

Para parar a exploração, use [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). Nenhuma transação adicional deve ser enviada depois que este método for chamado e o Manticore gerará casos de teste para cada caminho explorado.

### Resumo: Executando no Manticore {#summary-running-under-manticore}

Juntando todas as etapas anteriores, obtemos:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("Os resultados estão em {}".format(m.workspace))
m.finalize() # para a exploração
```

Todo o código acima pode ser encontrado em [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Obtendo caminhos que lançam exceções {#getting-throwing-paths}

Agora, vamos gerar entradas específicas para os caminhos que levantam uma exceção em `f()`. O alvo ainda é o seguinte contrato inteligente [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Usando informações de estado {#using-state-information}

Cada caminho executado tem seu estado da cadeia de blocos. Um estado está pronto ou é encerrado, o que significa que ele atinge uma instrução THROW ou REVERT:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): a lista de estados que estão prontos (não executaram um REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): a lista de estados que são encerrados
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): todos os estados

```python
for state in m.all_states:
    # faça algo com o estado
```

Você pode acessar as informações de estado. Por exemplo:

- `state.platform.get_balance(account.address)`: o saldo da conta
- `state.platform.transactions`: a lista de transações
- `state.platform.transactions[-1].return_data`: os dados retornados pela última transação

Os dados retornados pela última transação são uma matriz, que pode ser convertida em um valor com ABI.deserialize, por exemplo:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### Como gerar um caso de teste {#how-to-generate-testcase}

Use [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) para gerar um caso de teste:

```python
m.generate_testcase(state, 'BugFound')
```

### Resumo {#summary-2}

- Você pode iterar sobre o estado com m.all_states
- `state.platform.get_balance(account.address)` retorna o saldo da conta
- `state.platform.transactions` retorna a lista de transações
- `transaction.return_data` são os dados retornados
- `m.generate_testcase(state, name)` gera entradas para o estado

### Resumo: Obtendo caminhos que lançam exceções {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Verifique se uma execução termina com um REVERT ou INVALID

for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Exceção encontrada {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Todo o código acima pode ser encontrado em [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Observe que poderíamos ter gerado um script muito mais simples, pois todos os estados retornados por terminated_state têm REVERT ou INVALID em seu resultado: este exemplo teve como objetivo apenas demonstrar como manipular a API._

## Adicionando restrições {#adding-constraints}

Veremos como restringir a exploração. Vamos assumir que a
documentação de `f()` afirma que a função nunca é chamada com `a == 65`, então qualquer bug com `a == 65` não é um bug real. O alvo ainda é o seguinte contrato inteligente [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

O módulo [Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) facilita a manipulação de restrições, entre outras coisas, ele fornece:

- Operators.AND,
- Operators.OR,
- Operators.UGT (maior que sem sinal),
- Operators.UGE (maior ou igual que sem sinal),
- Operators.ULT (menor que sem sinal),
- Operators.ULE (menor ou igual que sem sinal).

Para importar o módulo, use o seguinte:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` é usado para concatenar uma matriz a um valor. Por exemplo, o return_data de uma transação precisa ser alterado para um valor para ser verificado em relação a outro valor:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Restrições {#state-constraint}

Você pode usar restrições globalmente ou para um estado específico.

#### Restrição global {#state-constraint}

Use `m.constrain(constraint)` para adicionar uma restrição global.
Por exemplo, você pode chamar um contrato a partir de um endereço simbólico e restringir esse endereço a valores específicos:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Restrição de estado {#state-constraint}

Use [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) para adicionar uma restrição a um estado específico.
Pode ser usado para restringir o estado após sua exploração para verificar alguma propriedade nele.

### Verificando a restrição {#checking-constraint}

Use `solver.check(state.constraints)` para saber se uma restrição ainda é viável.
Por exemplo, o seguinte irá restringir o symbolic_value a ser diferente de 65 e verificar se o estado ainda é viável:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # o estado é viável
```

### Resumo: Adicionando restrições {#summary-adding-constraints}

Adicionando restrição ao código anterior, obtemos:

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

## Verifique se uma execução termina com um REVERT ou INVALID

for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # não consideramos o caminho onde a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug encontrado, os resultados estão em {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'Nenhum bug encontrado')
```

Todo o código acima pode ser encontrado em [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)
