---
title: Como usar o Manticore para encontrar bugs em contratos inteligentes
description: Como usar o Manticore para encontrar bugs automaticamente em contratos inteligentes
author: Trailofbits
lang: pt-br
tags:
  ["Solidity", "contratos inteligentes", "segurança", "tes", "verificação formal"]
skill: advanced
breadcrumb: Manticore
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

O objetivo deste tutorial é mostrar como usar o Manticore para encontrar bugs automaticamente em contratos inteligentes.

## Instalação {#installation}

O Manticore requer >= python 3.6. Ele pode ser instalado através do pip ou usando o Docker.

### Manticore através do Docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_O último comando executa o eth-security-toolbox em um contêiner Docker que tem acesso ao seu diretório atual. Você pode alterar os arquivos do seu host e executar as ferramentas nos arquivos a partir do Docker_

Dentro do Docker, execute:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Manticore através do pip {#manticore-through-pip}

```bash
pip3 install --user manticore
```

Recomenda-se o solc 0.5.11.

### Executando um script {#running-a-script}

Para executar um script Python com Python 3:

```bash
python3 script.py
```

## Introdução à execução simbólica dinâmica {#introduction-to-dynamic-symbolic-execution}

### Execução Simbólica Dinâmica em Resumo {#dynamic-symbolic-execution-in-a-nutshell}

A execução simbólica dinâmica (DSE) é uma técnica de análise de programas que explora um espaço de estado com um alto grau de consciência semântica. Essa técnica baseia-se na descoberta de "caminhos de programa", representados como fórmulas matemáticas chamadas ``path predicates``. Conceitualmente, essa técnica opera em predicados de caminho em duas etapas:

1. Eles são construídos usando restrições na entrada do programa.
2. Eles são usados para gerar entradas de programa que farão com que os caminhos associados sejam executados.

Essa abordagem não produz falsos positivos no sentido de que todos os estados de programa identificados podem ser acionados durante a execução concreta. Por exemplo, se a análise encontrar um overflow de inteiro, é garantido que ele seja reprodutível.

### Exemplo de Predicado de Caminho {#path-predicate-example}

Para ter uma ideia de como a DSE funciona, considere o seguinte exemplo:

```solidity
function f(uint a){

  if (a == 65) {
      // Um bug está presente
  }

}
```

Como ``f()`` contém dois caminhos, uma DSE construirá dois predicados de caminho diferentes:

- Caminho 1: ``a == 65``
- Caminho 2: ``Not (a == 65)``

Cada predicado de caminho é uma fórmula matemática que pode ser fornecida a um chamado [solucionador SMT](https://wikipedia.org/wiki/Satisfiability_modulo_theories), que tentará resolver a equação. Para ``Path 1``, o solucionador dirá que o caminho pode ser explorado com ``a = 65``. Para ``Path 2``, o solucionador pode dar a ``a`` qualquer valor diferente de 65, por exemplo ``a = 0``.

### Verificando propriedades {#verifying-properties}

O Manticore permite um controle total sobre toda a execução de cada caminho. Como resultado, ele permite que você adicione restrições arbitrárias a quase tudo. Esse controle permite a criação de propriedades no contrato.

Considere o seguinte exemplo:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // sem proteção contra overflow
  return c;
}
```

Aqui há apenas um caminho para explorar na função:

- Caminho 1: ``c = a + b``

Usando o Manticore, você pode verificar se há overflow e adicionar restrições ao predicado de caminho:

- ``c = a + b AND (c < a OR c < b)``

Se for possível encontrar uma valoração de ``a`` e ``b`` para a qual o predicado de caminho acima seja viável, isso significa que você encontrou um overflow. Por exemplo, o solucionador pode gerar a entrada ``a = 10 , b = MAXUINT256``.

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

- ``c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)``

Essa fórmula não pode ser resolvida; em outras palavras, isso é uma **prova** de que em ``safe_add``, ``c`` sempre aumentará.

A DSE é, portanto, uma ferramenta poderosa, que pode verificar restrições arbitrárias em seu código.

## Executando sob o Manticore {#running-under-manticore}

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

### Executar uma exploração autônoma {#run-a-standalone-exploration}

Você pode executar o Manticore diretamente no contrato inteligente pelo seguinte comando (``project`` pode ser um arquivo Solidity ou um diretório de projeto):

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

Sem informações adicionais, o Manticore explorará o contrato com novas transações simbólicas até que não explore novos caminhos no contrato. O Manticore não executa novas transações após uma falha (por exemplo: após reverter).

O Manticore enviará as informações para um diretório ``mcore_*``. Entre outros, você encontrará neste diretório:

- ``global.summary``: cobertura e avisos do compilador
- ``test_XXXXX.summary``: cobertura, última instrução, saldos de conta por caso de teste
- ``test_XXXXX.tx``: lista detalhada de transações por caso de teste

Aqui o Manticore encontra 7 casos de teste, que correspondem a (a ordem dos nomes dos arquivos pode mudar):

|                      |    Transação 0    |    Transação 1    | Transação 2       | Resultado |
| :------------------: | :---------------: | :---------------: | ----------------- | :-------: |
| **test_00000000.tx** | Criação do contrato |      f(!=65)      | f(!=65)           |   STOP    |
| **test_00000001.tx** | Criação do contrato | função de fallback |                   |  REVERT   |
| **test_00000002.tx** | Criação do contrato |                   |                   |  RETURN   |
| **test_00000003.tx** | Criação do contrato |       f(65)       |                   |  REVERT   |
| **test_00000004.tx** | Criação do contrato |      f(!=65)      |                   |   STOP    |
| **test_00000005.tx** | Criação do contrato |      f(!=65)      | f(65)             |  REVERT   |
| **test_00000006.tx** | Criação do contrato |      f(!=65)      | função de fallback |  REVERT   |

_O resumo da exploração f(!=65) denota f chamado com qualquer valor diferente de 65._

Como você pode notar, o Manticore gera um caso de teste único para cada transação bem-sucedida ou revertida.

Use a flag ``--quick-mode`` se quiser uma exploração rápida do código (ela desativa detectores de bugs, cálculo de gás, ...)

### Manipular um contrato inteligente através da API {#manipulate-a-smart-contract-through-the-api}

Esta seção descreve detalhes de como manipular um contrato inteligente através da API Python do Manticore. Você pode criar um novo arquivo com a extensão Python ``*.py`` e escrever o código necessário adicionando os comandos da API (cujos conceitos básicos serão descritos abaixo) neste arquivo e, em seguida, executá-lo com o comando ``$ python3 *.py``. Você também pode executar os comandos abaixo diretamente no console Python; para executar o console, use o comando ``$ python3``.

### Criando Contas {#creating-accounts}

A primeira coisa que você deve fazer é iniciar uma nova blockchain com os seguintes comandos:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Uma conta que não é de contrato é criada usando [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

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
# Initiate the contract
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### Resumo {#summary}

- Você pode criar contas de usuário e de contrato com [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) e [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### Executando transações {#executing-transactions}

O Manticore suporta dois tipos de transação:

- Transação bruta (raw): todas as funções são exploradas
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
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) cria um array de bytes simbólico.

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

As funções podem ser executadas através de seus nomes.
Para executar ``f(uint var)`` com um valor simbólico, a partir de user_account, e com 0 ether, use:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Se o ``value`` da transação não for especificado, ele será 0 por padrão.

#### Resumo {#summary-1}

- Os argumentos de uma transação podem ser concretos ou simbólicos
- Uma transação bruta explorará todas as funções
- A função pode ser chamada pelo seu nome

### Espaço de trabalho {#workspace}

``m.workspace`` é o diretório usado como diretório de saída para todos os arquivos gerados:

```python
print("Results are in {}".format(m.workspace))
```

### Encerrar a Exploração {#terminate-the-exploration}

Para interromper a exploração, use [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). Nenhuma transação adicional deve ser enviada depois que este método for chamado e o Manticore gerar casos de teste para cada um dos caminhos explorados.

### Resumo: Executando sob o Manticore {#summary-running-under-manticore}

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

print("Results are in {}".format(m.workspace))
m.finalize() # parar a exploração
```

Todo o código acima você pode encontrar no [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Obtendo caminhos que lançam exceções {#getting-throwing-paths}

Agora geraremos entradas específicas para os caminhos que levantam uma exceção em ``f()``. O alvo ainda é o seguinte contrato inteligente [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

Cada caminho executado tem seu estado da blockchain. Um estado está pronto (ready) ou é morto (killed), o que significa que ele atinge uma instrução THROW ou REVERT:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): a lista de estados que estão prontos (eles não executaram um REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): a lista de estados que foram mortos
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): todos os estados

```python
for state in m.all_states:
    # fazer algo com o estado
```

Você pode acessar as informações de estado. Por exemplo:

- ``state.platform.get_balance(account.address)``: o saldo da conta
- ``state.platform.transactions``: a lista de transações
- ``state.platform.transactions[-1].return_data``: os dados retornados pela última transação

Os dados retornados pela última transação são um array, que pode ser convertido em um valor com ABI.deserialize, por exemplo:

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
- ``state.platform.get_balance(account.address)`` retorna o saldo da conta
- ``state.platform.transactions`` retorna a lista de transações
- ``transaction.return_data`` são os dados retornados
- ``m.generate_testcase(state, name)`` gera entradas para o estado

### Resumo: Obtendo Caminho de Lançamento de Exceção {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Verifica se uma execução termina com um REVERT ou INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Todo o código acima você pode encontrar no [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Observe que poderíamos ter gerado um script muito mais simples, pois todos os estados retornados por terminated_state têm REVERT ou INVALID em seus resultados: este exemplo serviu apenas para demonstrar como manipular a API._

## Adicionando restrições {#adding-constraints}

Veremos como restringir a exploração. Faremos a suposição de que a documentação de ``f()`` afirma que a função nunca é chamada com ``a == 65``, portanto, qualquer bug com ``a == 65`` não é um bug real. O alvo ainda é o seguinte contrato inteligente [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

O módulo [Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) facilita a manipulação de restrições, entre outros, ele fornece:

- Operators.AND,
- Operators.OR,
- Operators.UGT (maior que sem sinal),
- Operators.UGE (maior ou igual a sem sinal),
- Operators.ULT (menor que sem sinal),
- Operators.ULE (menor ou igual a sem sinal).

Para importar o módulo, use o seguinte:

```python
from manticore.core.smtlib import Operators
```

``Operators.CONCAT`` é usado para concatenar um array a um valor. Por exemplo, o return_data de uma transação precisa ser alterado para um valor a ser verificado em relação a outro valor:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Restrições {#state-constraint}

Você pode usar restrições globalmente ou para um estado específico.

#### Restrição global {#state-constraint-2}

Use ``m.constrain(constraint)`` para adicionar uma restrição global.
Por exemplo, você pode chamar um contrato a partir de um endereço simbólico e restringir esse endereço a valores específicos:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Restrição de estado {#state-constraint-3}

Use [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) para adicionar uma restrição a um estado específico.
Pode ser usado para restringir o estado após sua exploração para verificar alguma propriedade nele.

### Verificando Restrição {#checking-constraint}

Use ``solver.check(state.constraints)`` para saber se uma restrição ainda é viável.
Por exemplo, o seguinte restringirá symbolic_value para ser diferente de 65 e verificará se o estado ainda é viável:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # o estado é viável
```

### Resumo: Adicionando Restrições {#summary-adding-constraints}

Adicionando a restrição ao código anterior, obtemos:

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

## Verifica se uma execução termina com um REVERT ou INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # não consideramos o caminho onde a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

Todo o código acima você pode encontrar no [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)