---
title: Como usar o Echidna para testar contratos inteligentes
description: Como usar o Echidna para testar automaticamente contratos inteligentes
author: "Trailofbits"
lang: pt-br
tags:
  [
    "solidez",
    "smart contracts",
    "segurança",
    "testando",
    "fuzzing"
  ]
skill: advanced
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Instalação {#installation}

O Echidna pode ser instalado através do docker ou usando o binário pré-compilado.

### Echidna através do docker {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_O último comando executa o eth-security-toolbox em um docker que tem acesso ao seu diretório atual. Você pode alterar os arquivos do seu host e executar as ferramentas nos arquivos do docker_

Dentro do docker, execute:

```bash
solc-select 0.5.11
cd /home/training
```

### Binário {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## Introdução ao fuzzing baseado em propriedade {#introduction-to-property-based-fuzzing}

O Echidna é um fuzzer baseado em propriedade, que descrevemos em nossas postagens de blog anteriores ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

[Fuzzing](https://wikipedia.org/wiki/Fuzzing) é uma técnica bem conhecida na comunidade de segurança. Consiste em gerar entradas que são mais ou menos aleatórias para encontrar bugs no programa. Fuzzers para software tradicional (como [AFL](http://lcamtuf.coredump.cx/afl/) ou [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) são conhecidos por serem ferramentas eficientes para encontrar bugs.

Além da geração puramente aleatória de entradas, existem muitas técnicas e estratégias para gerar boas entradas, incluindo:

- Obter feedback de cada execução e usá-lo para guiar a geração. Por exemplo, se uma entrada recém-gerada levar à descoberta de um novo caminho, pode fazer sentido gerar novas entradas próximas a ela.
- Gerar a entrada respeitando uma restrição estrutural. Por exemplo, se sua entrada contiver um cabeçalho com um checksum, fará sentido deixar que o fuzzer gere uma entrada que valide o checksum.
- Usar entradas conhecidas para gerar novas entradas: se você tiver acesso a um grande conjunto de dados de entrada válida, seu fuzzer pode gerar novas entradas a partir deles, em vez de iniciar sua geração do zero. Normalmente, são chamadas de _seeds_.

### Fuzzing baseado em propriedade {#property-based-fuzzing}

O Echidna pertence a uma família específica de fuzzer: fuzzing baseado em propriedade, fortemente inspirado pelo [QuickCheck](https://wikipedia.org/wiki/QuickCheck). Em contraste com o fuzzer clássico, que tentará encontrar falhas, o Echidna tentará quebrar invariantes definidos pelo usuário.

Em contratos inteligentes, as invariantes são funções do Solidity que podem representar qualquer estado incorreto ou inválido que o contrato possa alcançar, incluindo:

- Controle de acesso incorreto: o invasor tornou-se o proprietário do contrato.
- Máquina de estado incorreta: os tokens podem ser transferidos enquanto o contrato está pausado.
- Aritmética incorreta: o usuário pode causar um underflow em seu saldo e obter tokens gratuitos ilimitados.

### Testando uma propriedade com o Echidna {#testing-a-property-with-echidna}

Veremos como testar um contrato inteligente com o Echidna. O alvo é o seguinte contrato inteligente [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
contract Token{
  mapping(address => uint) public balances;
  function airdrop() public{
      balances[msg.sender] = 1000;
  }
  function consume() public{
      require(balances[msg.sender]>0);
      balances[msg.sender] -= 1;
  }
  function backdoor() public{
      balances[msg.sender] += 1;
  }
}
```

Vamos supor que este token deva ter as seguintes propriedades:

- Qualquer pessoa pode ter no máximo 1.000 tokens
- O token não pode ser transferido (não é um token ERC20)

### Escreva uma propriedade {#write-a-property}

As propriedades do Echidna são funções do Solidity. Uma propriedade deve:

- Não ter argumentos
- Retornar `true` se for bem-sucedida
- Ter seu nome começando com `echidna`

O Echidna irá:

- Gerar automaticamente transações arbitrárias para testar a propriedade.
- Relatar quaisquer transações que levem uma propriedade a retornar `false` ou a lançar um erro.
- Descartar o efeito colateral ao chamar uma propriedade (ou seja, se a propriedade alterar uma variável de estado, ela será descartada após o teste)

A propriedade a seguir verifica se o chamador não tem mais de 1.000 tokens:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

Use herança para separar seu contrato de suas propriedades:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

O [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) implementa a propriedade e herda do token.

### Iniciar um contrato {#initiate-a-contract}

O Echidna precisa de um [construtor](/developers/docs/smart-contracts/anatomy/#constructor-functions) sem argumentos. Se seu contrato precisar de uma inicialização específica, você precisará fazê-la no construtor.

Existem alguns endereços específicos no Echidna:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`, que chama o construtor.
- `0x10000`, `0x20000` e `0x00a329C0648769a73afAC7F9381e08fb43DBEA70`, que chamam aleatoriamente as outras funções.

Não precisamos de nenhuma inicialização específica em nosso exemplo atual, como resultado, nosso construtor está vazio.

### Executar o Echidna {#run-echidna}

O Echidna é iniciado com:

```bash
echidna-test contract.sol
```

Se contract.sol contiver vários contratos, você pode especificar o alvo:

```bash
echidna-test contract.sol --contract MyContract
```

### Resumo: testando uma propriedade {#summary-testing-a-property}

O texto a seguir resume a execução do Echidna em nosso exemplo:

```solidity
contract TestToken is Token{
    constructor() public {}
        function echidna_balance_under_1000() public view returns(bool){
          return balances[msg.sender] <= 1000;
        }
  }
```

```bash
echidna-test testtoken.sol --contract TestToken
...

echidna_balance_under_1000: falhou!💥
  Sequência de chamadas, encolhendo (1205/5000):
    airdrop()
    backdoor()

...
```

O Echidna descobriu que a propriedade é violada se `backdoor` for chamado.

## Filtrando funções para chamar durante uma campanha de fuzzing {#filtering-functions-to-call-during-a-fuzzing-campaign}

Veremos como filtrar as funções que sofrerão fuzzing.
O alvo é o seguinte contrato inteligente:

```solidity
contract C {
  bool state1 = false;
  bool state2 = false;
  bool state3 = false;
  bool state4 = false;

  function f(uint x) public {
    require(x == 12);
    state1 = true;
  }

  function g(uint x) public {
    require(state1);
    require(x == 8);
    state2 = true;
  }

  function h(uint x) public {
    require(state2);
    require(x == 42);
    state3 = true;
  }

 function i() public {
    require(state3);
    state4 = true;
  }

  function reset1() public {
    state1 = false;
    state2 = false;
    state3 = false;
    return;
  }

  function reset2() public {
    state1 = false;
    state2 = false;
    state3 = false;
    return;
  }

  function echidna_state4() public returns (bool) {
    return (!state4);
  }
}
```

Este pequeno exemplo força o Echidna a encontrar uma determinada sequência de transações para alterar uma variável de estado.
Isso é difícil para um fuzzer (recomenda-se usar uma ferramenta de execução simbólica como o [Manticore](https://github.com/trailofbits/manticore)).
Podemos executar o Echidna para verificar isso:

```bash
echidna-test multi.sol
...
echidna_state4: passou! 🎉
Seed: -3684648582249875403
```

### Funções de filtragem {#filtering-functions}

O Echidna tem dificuldade em encontrar a sequência correta para testar este contrato porque as duas funções de redefinição (`reset1` e `reset2`) definirão todas as variáveis de estado como `false`.
No entanto, podemos usar um recurso especial do Echidna para adicionar as funções de redefinição à lista de bloqueio ou para adicionar apenas as funções `f`, `g`,
`h` e `i` à lista de permissões.

Para adicionar funções à lista de bloqueio, podemos usar este arquivo de configuração:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

Outra abordagem para filtrar funções é listar as funções permitidas. Para fazer isso, podemos usar este arquivo de configuração:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` é `true` por padrão.
- A filtragem será realizada apenas por nome (sem parâmetros). Se você tiver `f()` e `f(uint256)`, o filtro `"f"` corresponderá a ambas as funções.

### Executar o Echidna {#run-echidna-1}

Para executar o Echidna com um arquivo de configuração `blacklist.yaml`:

```bash
echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: falhou!💥
  Sequência de chamadas:
    f(12)
    g(8)
    h(42)
    i()
```

O Echidna encontrará a sequência de transações para falsear a propriedade quase imediatamente.

### Resumo: funções de filtragem {#summary-filtering-functions}

O Echidna pode adicionar funções a uma lista de bloqueio ou a uma lista de permissões para chamar durante uma campanha de fuzzing usando:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

O Echidna inicia uma campanha de fuzzing adicionando `f1`, `f2` e `f3` à lista de bloqueio ou chamando apenas essas funções, de acordo com o valor do booleano `filterBlacklist`.

## Como testar a asserção do Solidity com o Echidna {#how-to-test-soliditys-assert-with-echidna}

Neste breve tutorial, vamos mostrar como usar o Echidna para testar a verificação de asserções em contratos. Vamos supor que tenhamos um contrato como este:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    // tmp <= counter
    return (counter - tmp);
  }
}
```

### Escrever uma asserção {#write-an-assertion}

Queremos ter certeza de que `tmp` é menor ou igual a `counter` depois de retornar sua diferença. Poderíamos escrever uma
propriedade do Echidna, mas precisaríamos armazenar o valor `tmp` em algum lugar. Em vez disso, poderíamos usar uma asserção como esta:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

### Executar o Echidna {#run-echidna-2}

Para habilitar o teste de falha de asserção, crie um [arquivo de configuração do Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
checkAsserts: true
```

Quando executamos este contrato no Echidna, obtemos os resultados esperados:

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Como você pode ver, o Echidna relata alguma falha de asserção na função `inc`. Adicionar mais de uma asserção por função é possível, mas o Echidna não consegue dizer qual asserção falhou.

### Quando e como usar asserções {#when-and-how-use-assertions}

As asserções podem ser usadas como alternativas a propriedades explícitas, especialmente se as condições a serem verificadas estiverem diretamente relacionadas ao uso correto de alguma operação `f`. Adicionar asserções após algum código garantirá que a verificação ocorra imediatamente após sua execução:

```solidity
function f(..) public {
    // some complex code
    ...
    assert (condition);
    ...
}

```

Pelo contrário, o uso de uma propriedade explícita do Echidna executará transações aleatoriamente e não há uma maneira fácil de forçar exatamente quando ela será verificada. Ainda é possível fazer esta solução alternativa:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

No entanto, há alguns problemas:

- Falha se `f` for declarada como `internal` ou `external`.
- Não está claro quais argumentos devem ser usados para chamar `f`.
- Se `f` reverter, a propriedade falhará.

Em geral, recomendamos seguir a [recomendação de John Regehr](https://blog.regehr.org/archives/1091) sobre como usar asserções:

- Não force nenhum efeito colateral durante a verificação de asserção. Por exemplo: `assert(ChangeStateAndReturn() == 1)`
- Não faça asserções óbvias. Por exemplo, `assert(var >= 0)` onde `var` é declarado como `uint`.

Finalmente, **não use** `require` em vez de `assert`, pois o Echidna não será capaz de detectá-lo (mas o contrato será revertido de qualquer maneira).

### Resumo: verificação de asserção {#summary-assertion-checking}

O texto a seguir resume a execução do Echidna em nosso exemplo:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

O Echidna descobriu que a asserção em `inc` pode falhar se essa função for chamada várias vezes com argumentos grandes.

## Coletando e modificando um corpus do Echidna {#collecting-and-modifying-an-echidna-corpus}

Veremos como coletar e usar um corpus de transações com o Echidna. O alvo é o seguinte contrato inteligente [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
contract C {
  bool value_found = false;
  function magic(uint magic_1, uint magic_2, uint magic_3, uint magic_4) public {
    require(magic_1 == 42);
    require(magic_2 == 129);
    require(magic_3 == magic_4+333);
    value_found = true;
    return;
  }

  function echidna_magic_values() public returns (bool) {
    return !value_found;
  }

}
```

Este pequeno exemplo força o Echidna a encontrar determinados valores para alterar uma variável de estado. Isso é difícil para um fuzzer
(recomenda-se usar uma ferramenta de execução simbólica como o [Manticore](https://github.com/trailofbits/manticore)).
Podemos executar o Echidna para verificar isso:

```bash
echidna-test magic.sol
...

echidna_magic_values: passou! 🎉

Seed: 2221503356319272685
```

No entanto, ainda podemos usar o Echidna para coletar o corpus ao executar esta campanha de fuzzing.

### Coletando um corpus {#collecting-a-corpus}

Para habilitar a coleta de corpus, crie um diretório de corpus:

```bash
mkdir corpus-magic
```

E um [arquivo de configuração do Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

Agora podemos executar nossa ferramenta e verificar o corpus coletado:

```bash
echidna-test magic.sol --config config.yaml
```

O Echidna ainda não consegue encontrar os valores mágicos corretos, mas podemos dar uma olhada no corpus que ele coletou.
Por exemplo, um desses arquivos era:

```json
[
  {
    "_gas'": "0xffffffff",
    "_delay": ["0x13647", "0xccf6"],
    "_src": "00a329c0648769a73afac7f9381e08fb43dbea70",
    "_dst": "00a329c0648769a73afac7f9381e08fb43dbea72",
    "_value": "0x0",
    "_call": {
      "tag": "SolCall",
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "93723985220345906694500679277863898678726808528711107336895287282192244575836"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "334"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "68093943901352437066264791224433559271778087297543421781073458233697135179558"
            ],
            "tag": "AbiUInt"
          },
          {
            "tag": "AbiUInt",
            "contents": [256, "332"]
          }
        ]
      ]
    },
    "_gasprice'": "0xa904461f1"
  }
]
```

Claramente, essa entrada não acionará a falha em nossa propriedade. No entanto, na próxima etapa, veremos como modificá-lo para isso.

### Semeando um corpus {#seeding-a-corpus}

O Echidna precisa de ajuda para lidar com a função `magic`. Vamos copiar e modificar a entrada para usar parâmetros
adequados para ela:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

Modificaremos o `new.txt` para chamar `magic(42,129,333,0)`. Agora, podemos executar novamente o Echidna:

```bash
echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

Desta vez, descobriu que a propriedade é violada imediatamente.

## Encontrando transações com alto consumo de gás {#finding-transactions-with-high-gas-consumption}

Veremos como encontrar as transações com alto consumo de gás com o Echidna. O alvo é o seguinte contrato inteligente:

```solidity
contract C {
  uint state;

  function expensive(uint8 times) internal {
    for(uint8 i=0; i < times; i++)
      state = state + i;
  }

  function f(uint x, uint y, uint8 times) public {
    if (x == 42 && y == 123)
      expensive(times);
    else
      state = 0;
  }

  function echidna_test() public returns (bool) {
    return true;
  }

}
```

Aqui, `expensive` pode ter um grande consumo de gás.

Atualmente, o Echidna sempre precisa de uma propriedade para testar: aqui, `echidna_test` sempre retorna `true`.
Podemos executar o Echidna para verificar isso:

```
echidna-test gas.sol
...
echidna_test: passou! 🎉

Seed: 2320549945714142710
```

### Medindo o consumo de gás {#measuring-gas-consumption}

Para habilitar o consumo de gás com o Echidna, crie um arquivo de configuração `config.yaml`:

```yaml
estimateGas: true
```

Neste exemplo, também reduziremos o tamanho da sequência de transações para facilitar a compreensão dos resultados:

```yaml
seqLen: 2
estimateGas: true
```

### Executar o Echidna {#run-echidna-3}

Depois que o arquivo de configuração for criado, podemos executar o Echidna desta forma:

```bash
echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

f used a maximum of 1333608 gas
  Call sequence:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- O gás mostrado é uma estimativa fornecida pelo [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-).

### Filtrando chamadas que reduzem o gás {#filtering-out-gas-reducing-calls}

O tutorial sobre **como filtrar funções a serem chamadas durante uma campanha de fuzzing**, acima, mostra como
remover algumas funções do seu teste.  
Isso pode ser crítico para obter uma estimativa de gás precisa.
Considere o seguinte exemplo:

```solidity
contract C {
  address [] addrs;
  function push(address a) public {
    addrs.push(a);
  }
  function pop() public {
    addrs.pop();
  }
  function clear() public{
    addrs.length = 0;
  }
  function check() public{
    for(uint256 i = 0; i < addrs.length; i++)
      for(uint256 j = i+1; j < addrs.length; j++)
        if (addrs[i] == addrs[j])
          addrs[j] = address(0x0);
  }
  function echidna_test() public returns (bool) {
      return true;
  }
}
```

Se o Echidna puder chamar todas as funções, ele não encontrará facilmente transações com alto custo de gás:

```
echidna-test pushpop.sol --config config.yaml
...
pop used a maximum of 10746 gas
...
check used a maximum of 23730 gas
...
clear used a maximum of 35916 gas
...
push used a maximum of 40839 gas
```

Isso porque o custo depende do tamanho de `addrs` e chamadas aleatórias tendem a deixar o array quase vazio.
Isso ocorre porque o custo depende do tamanho de `addrs` e as chamadas aleatórias tendem a deixar o array quase vazio. Adicionar `pop` e `clear` à lista de bloqueio, no entanto, nos dá resultados muito melhores:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
echidna-test pushpop.sol --config config.yaml
...
push used a maximum of 40839 gas
...
check used a maximum of 1484472 gas
```

### Resumo: encontrando transações com alto consumo de gás {#summary-finding-transactions-with-high-gas-consumption}

O Echidna pode encontrar transações com alto consumo de gás usando a opção de configuração `estimateGas`:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

O Echidna relatará uma sequência com o consumo máximo de gás para cada função, uma vez que a campanha de fuzzing tenha terminado.
