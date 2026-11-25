---
title: Como usar o Echidna para testar contratos inteligentes
description: Como usar o Echidna para testar contratos inteligentes automaticamente
author: "Trailofbits"
lang: pt-br
tags: ["Solidity", "contratos inteligentes", "segurança", "tes", "fuzzing"]
skill: advanced
breadcrumb: Echidna
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Instalação {#installation}

O Echidna pode ser instalado através do Docker, Homebrew ou usando o binário pré-compilado. Os exemplos neste tutorial foram testados com o Echidna 2.3.3 e solc 0.8.37.

### Echidna através do Docker {#echidna-through-docker}

```sh
docker pull ghcr.io/crytic/echidna/echidna:latest
docker run --rm -it -v "$PWD":/src ghcr.io/crytic/echidna/echidna:latest
```

_O último comando executa a imagem do Echidna em um Docker que tem acesso ao seu diretório atual. Você pode alterar os arquivos do seu host e executar as ferramentas nos arquivos a partir do Docker. A imagem também vem com o [Slither](https://github.com/crytic/slither), [crytic-compile](https://github.com/crytic/crytic-compile) e [solc-select](https://github.com/crytic/solc-select)._

Dentro do Docker, execute:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
cd /src
```

### Binário {#binary}

Baixe a versão mais recente para a sua plataforma em [https://github.com/crytic/echidna/releases/latest](https://github.com/crytic/echidna/releases/latest). No macOS ou Linux, você também pode executar `brew install echidna`, que instala o Slither e o crytic-compile junto com ele.

Ao usar o binário de lançamento, instale o [Slither](https://github.com/crytic/slither) e o [solc-select](https://github.com/crytic/solc-select) por conta própria (por exemplo, `pip3 install slither-analyzer solc-select` em um ambiente virtual Python) e selecione uma versão do compilador:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
```

O Echidna funciona sem o Slither, mas o Slither extrai constantes, como os números mágicos usados em instruções `require`, e vários exemplos abaixo dependem dele para encontrar bugs rapidamente.

## Introdução ao fuzzing baseado em propriedades {#introduction-to-property-based-fuzzing}

O Echidna é um fuzzer baseado em propriedades, que descrevemos em nossas postagens anteriores no blog ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

O [Fuzzing](https://wikipedia.org/wiki/Fuzzing) é uma técnica bem conhecida na comunidade de segurança. Consiste em gerar entradas que são mais ou menos aleatórias para encontrar bugs no programa. Fuzzers para softwares tradicionais (como [AFL](http://lcamtuf.coredump.cx/afl/) ou [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) são conhecidos por serem ferramentas eficientes para encontrar bugs.

Além da geração puramente aleatória de entradas, existem muitas técnicas e estratégias para gerar boas entradas, incluindo:

- Obter feedback de cada execução e guiar a geração usando-o. Por exemplo, se uma entrada recém-gerada levar à descoberta de um novo caminho, pode fazer sentido gerar novas entradas próximas a ela.
- Gerar a entrada respeitando uma restrição estrutural. Por exemplo, se a sua entrada contiver um cabeçalho com um checksum, fará sentido deixar o fuzzer gerar entradas que validem o checksum.
- Usar entradas conhecidas para gerar novas entradas: se você tiver acesso a um grande conjunto de dados de entradas válidas, seu fuzzer poderá gerar novas entradas a partir delas, em vez de iniciar sua geração do zero. Estas são geralmente chamadas de _seeds_ (sementes).

### Fuzzing baseado em propriedades {#property-based-fuzzing}

O Echidna pertence a uma família específica de fuzzer: o fuzzing baseado em propriedades, fortemente inspirado no [QuickCheck](https://wikipedia.org/wiki/QuickCheck). Em contraste com o fuzzer clássico que tentará encontrar falhas (crashes), o Echidna tentará quebrar invariantes definidos pelo usuário.

Em contratos inteligentes, os invariantes são funções Solidity que podem representar qualquer estado incorreto ou inválido que o contrato possa alcançar, incluindo:

- Controle de acesso incorreto: o invasor se tornou o proprietário do contrato.
- Máquina de estado incorreta: os tokens podem ser transferidos enquanto o contrato está pausado.
- Aritmética incorreta: o usuário pode causar um underflow em seu saldo e obter tokens gratuitos ilimitados.

### Testando uma propriedade com o Echidna {#testing-a-property-with-echidna}

Veremos como testar um contrato inteligente com o Echidna. O alvo é o seguinte contrato inteligente [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) public balances;

    function airdrop() public {
        balances[msg.sender] = 1000;
    }

    function consume() public {
        require(balances[msg.sender] > 0);
        balances[msg.sender] -= 1;
    }

    function backdoor() public {
        balances[msg.sender] += 1;
    }
}
```

Faremos a suposição de que este token deve ter as seguintes propriedades:

- Qualquer pessoa pode ter no máximo 1000 tokens
- O token não pode ser transferido (não é um token ERC-20)

### Escrevendo uma propriedade {#write-a-property}

As propriedades do Echidna são funções Solidity. Uma propriedade deve:

- Não ter argumentos
- Retornar `true` se for bem-sucedida
- Ter seu nome começando com `echidna`

O Echidna irá:

- Gerar automaticamente transações arbitrárias para testar a propriedade.
- Relatar quaisquer transações que levem uma propriedade a retornar `false` ou lançar um erro.
- Descartar efeitos colaterais ao chamar uma propriedade (ou seja, se a propriedade alterar uma variável de estado, ela será descartada após o teste)

A propriedade a seguir verifica se o chamador não tem mais de 1000 tokens:

```solidity
function echidna_balance_under_1000() public view returns (bool) {
    return balances[msg.sender] <= 1000;
}
```

Use herança para separar seu contrato de suas propriedades:

```solidity
contract TestToken is Token {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

[`testtoken.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/testtoken.sol) implementa a propriedade e herda do token.

### Iniciando um contrato {#initiate-a-contract}

O Echidna precisa de um [construtor](/developers/docs/smart-contracts/anatomy/#constructor-functions) sem argumentos. Se o seu contrato precisar de uma inicialização específica, você precisará fazê-la no construtor.

Existem alguns endereços específicos no Echidna:

- `0x30000` que chama o construtor.
- `0x10000`, `0x20000` e `0x30000` que chamam aleatoriamente as outras funções.
- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` onde o contrato em teste é implantado.

Não precisamos de nenhuma inicialização específica em nosso exemplo atual, como resultado, nosso construtor está vazio.

### Executando o Echidna {#run-echidna}

O Echidna é iniciado com:

```sh
echidna contract.sol
```

Se contract.sol contiver vários contratos, você poderá especificar o alvo:

```sh
echidna contract.sol --contract MyContract
```

Quando executado em um terminal, o Echidna mostra uma interface de usuário interativa. Adicione `--format text` para obter a saída em texto simples, como nos exemplos abaixo.

### Resumo: Testando uma propriedade {#summary-testing-a-property}

O seguinte resume a execução do Echidna em nosso exemplo:

```solidity
contract TestToken is Token {
    constructor() {}

    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

```sh
echidna testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence:
    TestToken.airdrop()
    TestToken.backdoor()

...
```

O Echidna descobriu que a propriedade é violada se `backdoor` for chamado.

## Filtrando funções para chamar durante uma campanha de fuzzing {#filtering-functions-to-call-during-a-fuzzing-campaign}

Veremos como filtrar as funções a serem submetidas ao fuzzing.
O alvo é o seguinte contrato inteligente:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool state1 = false;
    bool state2 = false;
    bool state3 = false;
    bool state4 = false;

    function f(uint256 x) public {
        require(x == 12);
        state1 = true;
    }

    function g(uint256 x) public {
        require(state1);
        require(x == 8);
        state2 = true;
    }

    function h(uint256 x) public {
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

    function echidna_state4() public view returns (bool) {
        return (!state4);
    }
}
```

Este pequeno exemplo força o Echidna a encontrar uma certa sequência de transações para alterar uma variável de estado.
Isso é difícil para um fuzzer.
Podemos executar o Echidna para verificar isso:

```sh
echidna multi.sol
...
echidna_state4: passing
...
```

### Filtrando funções {#filtering-functions}

O Echidna tem problemas para encontrar a sequência correta para testar este contrato porque as duas funções de redefinição (`reset1` e `reset2`) definirão todas as variáveis de estado como `false`.
No entanto, podemos usar um recurso especial do Echidna para colocar a função de redefinição em uma lista de bloqueio (blacklist) ou colocar em uma lista de permissões (whitelist) apenas as funções `f`, `g`,
`h` e `i`.

Para colocar funções na lista de bloqueio, podemos usar este arquivo de configuração:

```yaml
filterBlacklist: true
filterFunctions: ["C.reset1()", "C.reset2()"]
```

Outra abordagem para filtrar funções é listar as funções permitidas. Para fazer isso, podemos usar este arquivo de configuração:

```yaml
filterBlacklist: false
filterFunctions: ["C.f(uint256)", "C.g(uint256)", "C.h(uint256)", "C.i()"]
```

- `filterBlacklist` é `true` por padrão.
- A filtragem é realizada no nome completo da função: o nome do contrato, um `.` e a assinatura da Interface Binária de Aplicação (ABI) (por exemplo, `C.f(uint256)`). Se você tiver `f()` e `f(uint256)`, poderá escolher exatamente qual delas filtrar. Um nome simples como `"reset1"` não corresponde a nada.

### Executando o Echidna {#run-echidna-1}

Para executar o Echidna com um arquivo de configuração `blacklist.yaml`:

```sh
echidna multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    C.f(12)
    C.g(8)
    C.h(42)
    C.i()
```

O Echidna encontrará a sequência de transações para falsificar a propriedade quase imediatamente.

### Resumo: Filtrando funções {#summary-filtering-functions}

O Echidna pode colocar funções em uma lista de bloqueio ou de permissões para chamar durante uma campanha de fuzzing usando:

```yaml
filterBlacklist: true
filterFunctions: ["C.f1()", "C.f2()", "C.f3()"]
```

```sh
echidna contract.sol --config config.yaml
...
```

O Echidna inicia uma campanha de fuzzing bloqueando `C.f1()`, `C.f2()` e `C.f3()` ou chamando apenas estas, de acordo
com o valor do booleano `filterBlacklist`.

## Como testar a asserção do Solidity com o Echidna {#how-to-test-soliditys-assert-with-echidna}

Neste breve tutorial, mostraremos como usar o Echidna para testar a verificação de asserção em contratos. Vamos supor que temos um contrato como este:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        // tmp <= counter
        return (counter - tmp);
    }
}
```

Desde o Solidity 0.8, os overflows aritméticos revertem por padrão. O bloco `unchecked` restaura o comportamento de wrapping para que `counter` possa sofrer overflow, que é o bug que queremos que o Echidna encontre.

### Escrevendo uma asserção {#write-an-assertion}

Queremos ter certeza de que `tmp` é menor ou igual a `counter` após retornar sua diferença. Poderíamos escrever uma
propriedade do Echidna, mas precisaremos armazenar o valor de `tmp` em algum lugar. Em vez disso, poderíamos usar uma asserção como esta:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

### Executando o Echidna {#run-echidna-2}

Para habilitar o teste de falha de asserção, passe `--test-mode assertion` na linha de comando ou crie um [arquivo de configuração do Echidna](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
testMode: assertion
```

Quando executamos este contrato no Echidna, obtemos os resultados esperados:

```sh
echidna assert.sol --config config.yaml
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

Como você pode ver, o Echidna relata alguma falha de asserção na função `inc`. É possível adicionar mais de uma asserção por função, mas o Echidna não consegue dizer qual asserção falhou.

### Quando e como usar asserções {#when-and-how-use-assertions}

As asserções podem ser usadas como alternativas a propriedades explícitas, especialmente se as condições a serem verificadas estiverem diretamente relacionadas ao uso correto de alguma operação `f`. Adicionar asserções após algum código garantirá que a verificação ocorra imediatamente após sua execução:

```solidity
function f(..) public {
    // algum código complexo
    ...
    assert (condition);
    ...
}

```

Pelo contrário, usar uma propriedade explícita do Echidna executará transações aleatoriamente e não há uma maneira fácil de impor exatamente quando ela será verificada. Ainda é possível fazer esta solução alternativa:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

No entanto, existem alguns problemas:

- Falha se `f` for declarado como `internal` ou `external`.
- Não está claro quais argumentos devem ser usados para chamar `f`.
- Se `f` reverter, a propriedade falhará.

Em geral, recomendamos seguir a [recomendação de John Regehr](https://blog.regehr.org/archives/1091) sobre como usar asserções:

- Não force nenhum efeito colateral durante a verificação da asserção. Por exemplo: `assert(ChangeStateAndReturn() == 1)`
- Não faça asserções de declarações óbvias. Por exemplo, `assert(var >= 0)` onde `var` é declarado como `uint`.

Por fim, por favor **não use** `require` em vez de `assert`, pois o Echidna não será capaz de detectá-lo (mas o contrato será revertido de qualquer maneira).

### Resumo: Verificação de asserção {#summary-assertion-checking}

O seguinte resume a execução do Echidna em nosso exemplo:

```solidity
contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

```sh
echidna assert.sol --test-mode assertion
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

O Echidna descobriu que a asserção em `inc` pode falhar se esta função for chamada várias vezes com argumentos grandes.

## Coletando e modificando um corpus do Echidna {#collecting-and-modifying-an-echidna-corpus}

Veremos como coletar e usar um corpus de transações com o Echidna. O alvo é o seguinte contrato inteligente [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool value_found = false;

    function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
        require(magic_1 == 42);
        require(magic_2 == 129);
        require(magic_3 == magic_4 + 333);
        value_found = true;
        return;
    }

    function echidna_magic_values() public view returns (bool) {
        return !value_found;
    }
}
```

Este pequeno exemplo força o Echidna a encontrar certos valores para alterar uma variável de estado. Isso é difícil para um fuzzer.
Podemos executar o Echidna para verificar isso:

```sh
echidna magic.sol
...

echidna_magic_values: passing
...
```

No entanto, ainda podemos usar o Echidna para coletar o corpus ao executar esta campanha de fuzzing.

### Coletando um corpus {#collecting-a-corpus}

Para habilitar a coleta de corpus, crie um diretório de corpus:

```sh
mkdir corpus-magic
```

E um [arquivo de configuração do Echidna](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
corpusDir: "corpus-magic"
```

Agora podemos executar nossa ferramenta e verificar o corpus coletado:

```sh
echidna magic.sol --config config.yaml
```

O Echidna ainda não consegue encontrar os valores mágicos corretos. Para ver onde ele fica preso, observe o relatório de cobertura `corpus-magic/covered.*.txt`:

```text
7 | *   |     function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
  8 | *r  |         require(magic_1 == 42);
  9 | *r  |         require(magic_2 == 129);
 10 | *r  |         require(magic_3 == magic_4 + 333);
 11 |     |         value_found = true;
 12 |     |         return;
```

O rótulo `r` significa que o Echidna alcançou a linha, mas a execução foi revertida lá, e as linhas após o último `require` nunca são executadas.

As sequências de transações que o Echidna coletou são armazenadas como arquivos JSON em `corpus-magic/coverage/`. Por exemplo, a primeira transação de um desses arquivos foi:

```json
[
  {
    "call": {
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639806"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "761"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "91238239174727894896282446013839801776340298206661877345279631871841712965531"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639804"
            ],
            "tag": "AbiUInt"
          }
        ]
      ],
      "tag": "SolCall"
    },
    "delay": [
      "0x00000000000000000000000000000000000000000000000000000000000103ef",
      "0x000000000000000000000000000000000000000000000000000000000000d38b"
    ],
    "dst": "0x00a329c0648769A73afAc7F9381E08FB43dBEA72",
    "gas": 12500000,
    "gasprice": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "src": "0x0000000000000000000000000000000000020000",
    "value": "0x0000000000000000000000000000000000000000000000000000000000000000"
  }
]
```

Claramente, esta entrada não acionará a falha em nossa propriedade. No entanto, na próxima etapa, veremos como modificá-la para isso.

### Semeando um corpus {#seeding-a-corpus}

O Echidna precisa de alguma ajuda para lidar com a função `magic`. Vamos copiar e modificar a entrada para usar parâmetros
adequados para ela (os nomes dos arquivos são aleatórios, então use um do seu próprio diretório `corpus-magic/coverage/`):

```sh
cp corpus-magic/coverage/249425678654647553.txt corpus-magic/coverage/new.txt
```

Modificaremos `new.txt` para que contenha uma única transação chamando `magic(42,129,333,0)`. Agora, podemos executar o Echidna novamente:

```sh
echidna magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    C.magic(42,129,333,0)

...
```

Desta vez, ele descobriu que a propriedade é violada imediatamente.

## Encontrando transações com alto consumo de gás {#finding-transactions-with-high-gas-consumption}

Veremos como encontrar as transações com alto consumo de gás com o Echidna. Versões mais antigas do Echidna tinham uma opção `estimateGas` para isso; ela foi removida no Echidna 2.3.0. Em vez disso, medimos o gás com `gasleft()` e deixamos o [modo de otimização](https://secure-contracts.com/program-analysis/echidna/advanced/optimization_mode.html) do Echidna maximizá-lo. O alvo é o seguinte contrato inteligente:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    uint256 state;

    function expensive(uint8 times) internal {
        for (uint8 i = 0; i < times; i++) {
            state = state + i;
        }
    }

    function f(uint256 x, uint256 y, uint8 times) public {
        if (x == 42 && y == 123) {
            expensive(times);
        } else {
            state = 0;
        }
    }
}
```

Aqui `expensive` pode ter um grande consumo de gás.

### Medindo o consumo de gás {#measuring-gas-consumption}

No modo de otimização, o Echidna procura funções que começam com `echidna_` que não recebem argumentos e retornam um `int256`, e tenta encontrar a sequência de transações que maximiza o valor retornado. Adicionamos um contrato de teste que chama `f`, registra o gás que usou e expõe o máximo (salve ambos os contratos em `gas.sol`):

```solidity
contract TestGas is C {
    int256 maxGasUsed;

    function measureF(uint256 x, uint256 y, uint8 times) public {
        uint256 start = gasleft();
        f(x, y, times);
        int256 used = int256(start - gasleft());
        if (used > maxGasUsed) {
            maxGasUsed = used;
        }
    }

    function echidna_opt_gas_f() public view returns (int256) {
        return maxGasUsed;
    }
}
```

Para habilitar o modo de otimização, crie um arquivo de configuração `config.yaml`. Neste exemplo, também reduziremos o tamanho da sequência de transações para tornar os resultados mais fáceis de entender:

```yaml
testMode: optimization
seqLen: 2
```

### Executando o Echidna {#run-echidna-3}

Depois de criarmos o arquivo de configuração, podemos executar o Echidna assim:

```sh
echidna gas.sol --contract TestGas --config config.yaml
...
echidna_opt_gas_f: max value: 127128

  Call sequence:
    TestGas.measureF(42,123,223)

...
```

- O gás mostrado é medido pela implementação da Máquina Virtual Ethereum (EVM) na qual o Echidna é executado, [hevm](https://github.com/argotorg/hevm), e inclui a sobrecarga da chamada interna de `measureF`.
- O máximo não é único: cada campanha é aleatória e campanhas mais longas (por exemplo, `--test-limit 200000`) tendem a encontrar valores maiores.

### Filtrando chamadas que reduzem o gás {#filtering-out-gas-reducing-calls}

O tutorial sobre **filtrando funções para chamar durante uma campanha de fuzzing** acima mostra como
remover algumas funções de seus testes.  
Isso pode ser crítico para obter uma estimativa precisa de gás.
Considere o seguinte exemplo:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    address[] addrs;

    function push(address a) public {
        addrs.push(a);
    }

    function pop() public {
        addrs.pop();
    }

    function clear() public {
        delete addrs;
    }

    function check() public {
        for (uint256 i = 0; i < addrs.length; i++)
            for (uint256 j = i + 1; j < addrs.length; j++)
                if (addrs[i] == addrs[j]) addrs[j] = address(0x0);
    }

    function echidna_opt_gas_check() public returns (int256) {
        uint256 start = gasleft();
        check();
        return int256(start - gasleft());
    }
}
```

`echidna_opt_gas_check` chama `check` e retorna seu custo de gás. Como toda função de teste do Echidna, suas alterações de estado são descartadas posteriormente.

Se o Echidna puder chamar todas as funções, ele não encontrará facilmente transações com alto custo de gás:

```sh
echidna pushpop.sol --test-mode optimization
...
echidna_opt_gas_check: max value: 265706
...
```

Isso ocorre porque o custo depende do tamanho de `addrs` e chamadas aleatórias tendem a deixar o array quase vazio.
Colocar `pop` e `clear` na lista de bloqueio, no entanto, nos dá resultados muito melhores:

```yaml
testMode: optimization
filterBlacklist: true
filterFunctions: ["C.pop()", "C.clear()"]
```

```sh
echidna pushpop.sol --config config.yaml
...
echidna_opt_gas_check: max value: 2446228
...
```

Reduzir a sequência de chamadas para este resultado leva vários minutos, porque cada repetição chama a custosa função `check`.

### Resumo: Encontrando transações com alto consumo de gás {#summary-finding-transactions-with-high-gas-consumption}

O Echidna pode encontrar transações com alto consumo de gás medindo o gás com `gasleft()` em uma função `echidna_` que retorna um `int256` e executando no modo de otimização:

```yaml
testMode: optimization
```

```sh
echidna contract.sol --config config.yaml
...
```

O Echidna relatará o valor máximo encontrado e a sequência de transações que o produziu, assim que a campanha de fuzzing terminar.
