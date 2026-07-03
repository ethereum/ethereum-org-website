---
title: API JSON-RPC
description: Um protocolo de chamada de procedimento remoto (RPC) leve e sem estado para clientes Ethereum.
lang: pt-br
---

Para que um aplicativo de software interaja com a blockchain do [Ethereum](/) - seja lendo dados da blockchain ou enviando transações para a rede - ele deve se conectar a um nó Ethereum.

Para esse propósito, todo [cliente Ethereum](/developers/docs/nodes-and-clients/#execution-clients) implementa uma [especificação JSON-RPC](https://github.com/ethereum/execution-apis), para que haja um conjunto uniforme de métodos nos quais os aplicativos possam confiar, independentemente do nó específico ou da implementação do cliente.

O [JSON-RPC](https://www.jsonrpc.org/specification) é um protocolo de chamada de procedimento remoto (RPC) leve e sem estado. Ele define várias estruturas de dados e as regras em torno de seu processamento. Ele é independente de transporte, pois os conceitos podem ser usados dentro do mesmo processo, por meio de soquetes, por HTTP ou em vários ambientes de passagem de mensagens. Ele usa JSON (RFC 4627) como formato de dados.

## Implementações de clientes {#client-implementations}

Cada cliente Ethereum pode utilizar diferentes linguagens de programação ao implementar a especificação JSON-RPC. Consulte a [documentação do cliente](/developers/docs/nodes-and-clients/#execution-clients) individual para obter mais detalhes relacionados a linguagens de programação específicas. Recomendamos verificar a documentação de cada cliente para obter as informações mais recentes sobre o suporte à API.

## Bibliotecas de conveniência {#convenience-libraries}

Embora você possa escolher interagir diretamente com os clientes Ethereum por meio da API JSON-RPC, muitas vezes existem opções mais fáceis para desenvolvedores de aplicativos descentralizados (dapps). Existem muitas bibliotecas [JavaScript](/developers/docs/apis/javascript/#available-libraries) e de [API de backend](/developers/docs/apis/backend/#available-libraries) para fornecer wrappers sobre a API JSON-RPC. Com essas bibliotecas, os desenvolvedores podem escrever métodos intuitivos de uma linha na linguagem de programação de sua escolha para inicializar solicitações JSON-RPC (internamente) que interagem com o Ethereum.

## APIs de cliente de consenso {#consensus-clients}

Esta página trata principalmente da API JSON-RPC usada por clientes de execução do Ethereum. No entanto, os clientes de consenso também têm uma API RPC que permite aos usuários consultar informações sobre o nó, solicitar blocos do Beacon, estado do Beacon e outras informações relacionadas ao consenso diretamente de um nó. Esta API está documentada na [página da API do Beacon](https://ethereum.github.io/beacon-APIs/#/).

Uma API interna também é usada para comunicação entre clientes dentro de um nó - ou seja, ela permite que o cliente de consenso e o cliente de execução troquem dados. Isso é chamado de 'Engine API' e as especificações estão disponíveis no [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Especificação do cliente de execução {#spec}

[Leia a especificação completa da API JSON-RPC no GitHub](https://github.com/ethereum/execution-apis). Esta API está documentada na [página da API de Execução](https://ethereum.github.io/execution-apis/) e inclui um Inspetor para testar todos os métodos disponíveis.

## Convenções {#conventions}

### Codificação de valor hexadecimal {#hex-encoding}

Dois tipos de dados principais são passados via JSON: arrays de bytes não formatados e quantidades. Ambos são passados com uma codificação hexadecimal, mas com requisitos diferentes para formatação.

#### Quantidades {#quantities-encoding}

Ao codificar quantidades (inteiros, números): codifique como hexadecimal, prefixe com "0x", a representação mais compacta (pequena exceção: zero deve ser representado como "0x0").

Aqui estão alguns exemplos:

- 0x41 (65 em decimal)
- 0x400 (1024 em decimal)
- ERRADO: 0x (deve sempre ter pelo menos um dígito - zero é "0x0")
- ERRADO: 0x0400 (não são permitidos zeros à esquerda)
- ERRADO: ff (deve ser prefixado com 0x)

### Dados não formatados {#unformatted-data-encoding}

Ao codificar dados não formatados (arrays de bytes, endereços de conta, hashes, arrays de bytecode): codifique como hexadecimal, prefixe com "0x", dois dígitos hexadecimais por byte.

Aqui estão alguns exemplos:

- 0x41 (tamanho 1, "A")
- 0x004200 (tamanho 3, "0B0")
- 0x (tamanho 0, "")
- ERRADO: 0xf0f0f (deve ser um número par de dígitos)
- ERRADO: 004200 (deve ser prefixado com 0x)

### O parâmetro de bloco {#block-parameter}

Os seguintes métodos têm um parâmetro de bloco:

- [eth_getBalance](#eth-getbalance)
- [eth_getCode](#eth-getcode)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_call](#eth-call)

Quando são feitas solicitações que consultam o estado do Ethereum, o parâmetro de bloco fornecido determina a altura do bloco.

As seguintes opções são possíveis para o parâmetro de bloco:

- `HEX String` - um número de bloco inteiro
- `String "earliest"` para o bloco mais antigo/bloco gênesis
- `String "latest"` - para o último bloco proposto
- `String "safe"` - para o último bloco seguro (safe head)
- `String "finalized"` - para o último bloco finalizado
- `String "pending"` - para o estado/transações pendentes

## Exemplos {#examples}

Nesta página, fornecemos exemplos de como usar endpoints individuais da API JSON_RPC usando a ferramenta de linha de comando, [curl](https://curl.se). Esses exemplos de endpoints individuais são encontrados abaixo na seção [Exemplos de Curl](#curl-examples). Mais abaixo na página, também fornecemos um [exemplo de ponta a ponta](#usage-example) para compilar e implantar um contrato inteligente usando um nó Geth, a API JSON_RPC e o curl.

## Exemplos com curl {#curl-examples}

Abaixo são fornecidos exemplos de uso da API JSON-RPC fazendo requisições [curl](https://curl.se) para um nó Ethereum. Cada exemplo inclui uma descrição do endpoint específico, seus parâmetros, tipo de retorno e um exemplo prático de como ele deve ser usado.

As requisições curl podem retornar uma mensagem de erro relacionada ao tipo de conteúdo. Isso ocorre porque a opção `--data` define o tipo de conteúdo como `application/x-www-form-urlencoded`. Se o seu nó reclamar disso, defina manualmente o cabeçalho colocando `-H "Content-Type: application/json"` no início da chamada. Os exemplos também não incluem a combinação de URL/IP e porta, que deve ser o último argumento fornecido ao curl (por exemplo, `127.0.0.1:8545`). Uma requisição curl completa incluindo esses dados adicionais tem o seguinte formato:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Gossip, Estado, Histórico {#gossip-state-history}

Alguns métodos principais JSON-RPC exigem dados da rede Ethereum e se dividem perfeitamente em três categorias principais: _Gossip, Estado e Histórico_. Use os links nestas seções para ir direto a cada método ou use o índice para explorar a lista completa de métodos.

### Métodos de Gossip {#gossip-methods}

> Esses métodos rastreiam o topo da cadeia. É assim que as transações circulam pela rede, encontram seu caminho para os blocos e como os clientes descobrem novos blocos.

- [eth_blockNumber](#eth-blocknumber)
- [eth_sendRawTransaction](#eth-sendrawtransaction)

### Métodos de Estado {#state-methods}

> Métodos que relatam o estado atual de todos os dados armazenados. O "estado" é como um grande pedaço de memória RAM compartilhada e inclui saldos de contas, dados de contratos e estimativas de gás.

- [eth_getBalance](#eth-getbalance)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getCode](#eth-getcode)
- [eth_call](#eth-call)
- [eth_estimateGas](#eth-estimategas)

### Métodos de Histórico {#history-methods}

> Busca registros históricos de todos os blocos até o gênesis. Isso é como um grande arquivo somente de acréscimo e inclui todos os cabeçalhos de bloco, corpos de bloco, blocos uncle e recibos de transação.

- [eth_getBlockTransactionCountByHash](#eth-getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth-getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth-getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth-getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth-getblockbyhash)
- [eth_getBlockByNumber](#eth-getblockbynumber)
- [eth_getTransactionByHash](#eth-gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth-gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth-gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth-gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth-getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth-getunclebyblocknumberandindex)

## Playground da API JSON-RPC {#json-rpc-api-playground}

Você pode usar a [ferramenta de playground](https://ethereum-json-rpc.com) para descobrir e testar os métodos da API. Ela também mostra quais métodos e redes são suportados por vários provedores de nós.

## Métodos da API JSON-RPC {#json-rpc-methods}

### web3_clientVersion {#web3-clientversion}

Retorna a versão atual do cliente.

**Parâmetros**

Nenhum

**Retornos**

`String` - A versão atual do cliente

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Resultadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoado
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3-sha3}

Retorna o Keccak-256 (_não_ o SHA3-256 padronizado) dos dados fornecidos.

**Parâmetros**

1. `DATA` - Os dados para converter em um hash SHA3

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Retorno**

`DATA` - O resultado SHA3 da string fornecida.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net-version}

Retorna o ID da rede atual.

**Parâmetros**

Nenhum

**Retornos**

`String` - O ID da rede atual.

A lista completa de IDs de rede atuais está disponível em [chainlist.org](https://chainlist.org). Alguns dos mais comuns são:

- `1`: Rede Principal do Ethereum
- `11155111`: rede de teste Sepolia
- `560048` : rede de teste Hoodi

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net-listening}

Retorna `true` se o cliente estiver escutando ativamente por conexões de rede.

**Parâmetros**

Nenhum

**Retornos**

`Boolean` - `true` quando estiver escutando, caso contrário, `false`.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net-peercount}

Retorna o número de pares atualmente conectados ao cliente.

**Parâmetros**

Nenhum

**Retorno**

`QUANTITY` - inteiro do número de pares conectados.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Result
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth-protocolversion}

Retorna a versão atual do protocolo Ethereum. Note que este método [não está disponível no Geth](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**Parâmetros**

Nenhum

**Retornos**

`String` - A versão atual do protocolo Ethereum

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth-syncing}

Retorna um objeto com dados sobre o status de sincronização ou `false`.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  Testar endpoint no playground
</ButtonLink>

**Parâmetros**

Nenhum

**Retornos**

Os dados exatos de retorno variam entre as implementações de clientes. Todos os clientes retornam `False` quando o nó não está sincronizando, e todos os clientes retornam os seguintes campos.

`Object|Boolean`, Um objeto com dados de status de sincronização ou `FALSE`, quando não estiver sincronizando:

- `startingBlock`: `QUANTITY` - O bloco no qual a importação começou (só será redefinido depois que a sincronização atingir seu topo)
- `currentBlock`: `QUANTITY` - O bloco atual, o mesmo que eth_blockNumber
- `highestBlock`: `QUANTITY` - O bloco mais alto estimado

No entanto, os clientes individuais também podem fornecer dados adicionais. Por exemplo, o Geth retorna o seguinte:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x3cf522",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x3e0e41",
    "startingBlock": "0x3cbed5",
    "syncedAccountBytes": "0x0",
    "syncedAccounts": "0x0",
    "syncedBytecodeBytes": "0x0",
    "syncedBytecodes": "0x0",
    "syncedStorage": "0x0",
    "syncedStorageBytes": "0x0"
  }
}
```

Enquanto o Besu retorna:

```json
{
  "jsonrpc": "2.0",
  "id": 51,
  "result": {
    "startingBlock": "0x0",
    "currentBlock": "0x1518",
    "highestBlock": "0x9567a3",
    "pulledStates": "0x203ca",
    "knownStates": "0x200636"
  }
}
```

Consulte a documentação do seu cliente específico para obter mais detalhes.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// Ou quando não estiver sincronizando
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth-coinbase}

Retorna o endereço coinbase do cliente.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  Testar endpoint no playground
</ButtonLink>

> **Nota:** Este método foi descontinuado a partir da **v1.14.0** e não é mais suportado. Tentar usar este método resultará em um erro "Method not supported".

**Parâmetros**

Nenhum

**Retorno**

`DATA`, 20 bytes - o endereço coinbase atual.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth-chainid}

Retorna o ID da cadeia usado para assinar transações protegidas contra repetição.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  Testar endpoint no playground
</ButtonLink>

**Parâmetros**

Nenhum

**Retornos**

`chainId`, valor hexadecimal como uma string representando o número inteiro do ID da cadeia atual.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth-mining}

Retorna `true` se o cliente estiver ativamente minerando novos blocos. Isso só pode retornar `true` para redes de Prova de Trabalho (PoW) e pode não estar disponível em alguns clientes desde [The Merge](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  Testar endpoint no playground
</ButtonLink>

**Parâmetros**

Nenhum

**Retorno**

`Boolean` - retorna `true` se o cliente estiver minerando, caso contrário, `false`.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth-hashrate}

Retorna o número de hashes por segundo com os quais o nó está minerando. Isso só pode retornar `true` para redes de Prova de Trabalho (PoW) e pode não estar disponível em alguns clientes desde [The Merge](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  Testar endpoint no playground
</ButtonLink>

**Parâmetros**

Nenhum

**Retorno**

`QUANTITY` - número de hashes por segundo.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Result
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth-gasprice}

Retorna uma estimativa do preço atual por gás em Wei. Por exemplo, o cliente Besu examina os últimos 100 blocos e retorna o preço mediano da unidade de gás por padrão.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  Experimente o endpoint no playground
</ButtonLink>

**Parâmetros**

Nenhum

**Retorno**

`QUANTITY` - número inteiro do preço atual do gás em Wei.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Result
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth-accounts}

Retorna uma lista de endereços de propriedade do cliente.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  Testar endpoint no playground
</ButtonLink>

**Parâmetros**

Nenhum

**Retorno**

`Array of DATA`, 20 Bytes - endereços de propriedade do cliente.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth-blocknumber}

Retorna o número do bloco mais recente.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  Testar endpoint no playground
</ButtonLink>

**Parâmetros**

Nenhum

**Retornos**

`QUANTITY` - inteiro do número do bloco atual em que o cliente está.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Result
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth-getbalance}

Retorna o saldo da conta em um determinado endereço.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  Testar endpoint no playground
</ButtonLink>

**Parâmetros**

1. `DATA`, 20 Bytes - endereço para verificar o saldo.
2. `QUANTITY|TAG` - número inteiro do bloco, ou a string `"latest"`, `"earliest"`, `"pending"`, `"safe"` ou `"finalized"`, consulte o [parâmetro de bloco](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Retorno**

`QUANTITY` - número inteiro do saldo atual em Wei.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth-getstorageat}

Retorna o valor de uma posição de armazenamento em um determinado endereço.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  Testar endpoint no playground
</ButtonLink>

**Parâmetros**

1. `DATA`, 20 Bytes - endereço do armazenamento.
2. `QUANTITY` - número inteiro da posição no armazenamento.
3. `QUANTITY|TAG` - número inteiro do bloco, ou a string `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"`, consulte o [parâmetro de bloco](/developers/docs/apis/json-rpc/#block-parameter)

**Retornos**

`DATA` - o valor nesta posição de armazenamento.

**Exemplo**
Calcular a posição correta depende do armazenamento a ser recuperado. Considere o seguinte contrato implantado em `0x295a70b2de5e3953354a6a8344e616ed314d7251` pelo endereço `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;
    constructor() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

Recuperar o valor de pos0 é simples:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Recuperar um elemento do mapa é mais difícil. A posição de um elemento no mapa é calculada com:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

Isso significa que para recuperar o armazenamento em pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] precisamos calcular a posição com:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

O console do geth que vem com a biblioteca Web3 pode ser usado para fazer o cálculo:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Agora, para buscar o armazenamento:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth-gettransactioncount}

Retorna o número de transações _enviadas_ de um endereço.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  Testar endpoint no playground
</ButtonLink>

**Parâmetros**

1. `DATA`, 20 Bytes - endereço.
2. `QUANTITY|TAG` - número inteiro do bloco, ou a string `"latest"`, `"earliest"`, `"pending"`, `"safe"` ou `"finalized"`, consulte o [parâmetro de bloco](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // estado no último bloco
]
```

**Retorno**

`QUANTITY` - número inteiro de transações enviadas a partir deste endereço.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth-getblocktransactioncountbyhash}

Retorna o número de transações em um bloco a partir de um bloco que corresponda ao hash do bloco fornecido.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  Testar endpoint no playground
</ButtonLink>

**Parâmetros**

1. `DATA`, 32 Bytes - hash de um bloco

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**Retorno**

`QUANTITY` - inteiro com o número de transações neste bloco.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth-getblocktransactioncountbynumber}

Retorna o número de transações em um bloco correspondente ao número do bloco fornecido.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  Testar endpoint no playground
</ButtonLink>

**Parâmetros**

1. `QUANTITY|TAG` - inteiro de um número de bloco, ou a string `"earliest"`, `"latest"`, `"pending"`, `"safe"` ou `"finalized"`, como no [parâmetro de bloco](/developers/docs/apis/json-rpc/#block-parameter).

```js
params: [
  "0x13738ca", // 20396234
]
```

**Retorno**

`QUANTITY` - inteiro do número de transações neste bloco.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth-getunclecountbyblockhash}

Retorna o número de uncles em um bloco a partir de um bloco correspondente ao hash de bloco fornecido.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  Testar endpoint no playground
</ButtonLink>

**Parâmetros**

1. `DATA`, 32 Bytes - hash de um bloco

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**Retorno**

`QUANTITY` - inteiro com o número de uncles neste bloco.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth-getunclecountbyblocknumber}

Retorna o número de uncles em um bloco a partir de um bloco correspondente ao número do bloco fornecido.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  Testar endpoint no playground
</ButtonLink>

**Parâmetros**

1. `QUANTITY|TAG` - número inteiro de um número de bloco, ou a string `"latest"`, `"earliest"`, `"pending"`, `"safe"` ou `"finalized"`, consulte o [parâmetro de bloco](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xe8", // 232
]
```

**Retorno**

`QUANTITY` - número inteiro do número de uncles neste bloco.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth-getcode}

Retorna o código em um determinado endereço.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  Testar endpoint no playground
</ButtonLink>

**Parâmetros**

1. `DATA`, 20 Bytes - endereço
2. `QUANTITY|TAG` - número inteiro do bloco, ou a string `"latest"`, `"earliest"`, `"pending"`, `"safe"` ou `"finalized"`, consulte o [parâmetro de bloco](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**Retorno**

`DATA` - o código do endereço fornecido.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth-sign}

O método sign calcula uma assinatura específica do Ethereum com: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

Adicionar um prefixo à mensagem torna a assinatura calculada reconhecível como uma assinatura específica do Ethereum. Isso evita o uso indevido onde um aplicativo descentralizado (dapp) malicioso pode assinar dados arbitrários (por exemplo, uma transação) e usar a assinatura para se passar pela vítima.

Nota: o endereço usado para assinar deve estar desbloqueado.

**Parâmetros**

1. `DATA`, 20 Bytes - endereço
2. `DATA`, N Bytes - mensagem para assinar

**Retorno**

`DATA`: Assinatura

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth-signtransaction}

Assina uma transação que pode ser enviada para a rede posteriormente usando [eth_sendRawTransaction](#eth-sendrawtransaction).

**Parâmetros**

1. `Object` - O objeto da transação

- `type`:
- `from`: `DATA`, 20 Bytes - O endereço de onde a transação é enviada.
- `to`: `DATA`, 20 Bytes - (opcional ao criar um novo contrato) O endereço para o qual a transação é direcionada.
- `gas`: `QUANTITY` - (opcional, padrão: 90000) Inteiro do gás fornecido para a execução da transação. Ele retornará o gás não utilizado.
- `gasPrice`: `QUANTITY` - (opcional, padrão: A ser determinado) Inteiro do gasPrice usado para cada gás pago, em Wei.
- `value`: `QUANTITY` - (opcional) Inteiro do valor enviado com esta transação, em Wei.
- `data`: `DATA` - O código compilado de um contrato OU o hash da assinatura do método invocado e os parâmetros codificados.
- `nonce`: `QUANTITY` - (opcional) Inteiro de um nonce. Isso permite substituir suas próprias transações pendentes que usam o mesmo nonce.

**Retornos**

`DATA`, O objeto da transação codificado em RLP assinado pela conta especificada.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth-sendtransaction}

Cria uma nova transação de chamada de mensagem ou uma criação de contrato, se o campo de dados contiver código, e a assina usando a conta especificada em `from`.

**Parâmetros**

1. `Object` - O objeto da transação

- `from`: `DATA`, 20 Bytes - O endereço de onde a transação é enviada.
- `to`: `DATA`, 20 Bytes - (opcional ao criar um novo contrato) O endereço para o qual a transação é direcionada.
- `gas`: `QUANTITY` - (opcional, padrão: 90000) Número inteiro do gás fornecido para a execução da transação. Ele retornará o gás não utilizado.
- `gasPrice`: `QUANTITY` - (opcional, padrão: A ser determinado) Número inteiro do gasPrice usado para cada gás pago.
- `value`: `QUANTITY` - (opcional) Número inteiro do valor enviado com esta transação.
- `input`: `DATA` - O código compilado de um contrato OU o hash da assinatura do método invocado e dos parâmetros codificados.
- `nonce`: `QUANTITY` - (opcional) Número inteiro de um nonce. Isso permite substituir suas próprias transações pendentes que usam o mesmo nonce.

```js
params: [
  {
    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    input:
      "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]
```

**Retornos**

`DATA`, 32 Bytes - o hash da transação, ou o hash zero se a transação ainda não estiver disponível.

Use [eth_getTransactionReceipt](#eth-gettransactionreceipt) para obter o endereço do contrato, após a transação ter sido proposta em um bloco, quando você criou um contrato.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth-sendrawtransaction}

Cria uma nova transação de chamada de mensagem ou uma criação de contrato para transações assinadas.

**Parâmetros**

1. `DATA`, Os dados da transação assinada.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Retorno**

`DATA`, 32 Bytes - o hash da transação, ou o hash zero se a transação ainda não estiver disponível.

Use [eth_getTransactionReceipt](#eth-gettransactionreceipt) para obter o endereço do contrato, após a transação ser proposta em um bloco, quando você criar um contrato.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth-call}

Executa uma nova chamada de mensagem imediatamente sem criar uma transação na blockchain. Frequentemente usado para executar funções de contrato inteligente de leitura, por exemplo, o `balanceOf` para um contrato ERC-20.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  Testar endpoint no playground
</ButtonLink>

**Parâmetros**

1. `Object` - O objeto de chamada de transação

- `from`: `DATA`, 20 Bytes - (opcional) O endereço de onde a transação é enviada.
- `to`: `DATA`, 20 Bytes - O endereço para o qual a transação é direcionada.
- `gas`: `QUANTITY` - (opcional) Inteiro do gás fornecido para a execução da transação. eth_call consome zero gás, mas este parâmetro pode ser necessário para algumas execuções.
- `gasPrice`: `QUANTITY` - (opcional) Inteiro do gasPrice usado para cada gás pago
- `value`: `QUANTITY` - (opcional) Inteiro do valor enviado com esta transação
- `input`: `DATA` - (opcional) Hash da assinatura do método e parâmetros codificados. Para obter detalhes, consulte a [ABI de Contrato Ethereum na documentação da Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG` - número inteiro do bloco, ou a string `"latest"`, `"earliest"`, `"pending"`, `"safe"` ou `"finalized"`, consulte o [parâmetro de bloco](/developers/docs/apis/json-rpc/#block-parameter)

**Retornos**

`DATA` - o valor de retorno do contrato executado.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth-estimategas}

Gera e retorna uma estimativa de quanto gás é necessário para permitir que a transação seja concluída. A transação não será adicionada à blockchain. Note que a estimativa pode ser significativamente maior do que a quantidade de gás realmente usada pela transação, por vários motivos, incluindo a mecânica da EVM e o desempenho do nó.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  Testar endpoint no playground
</ButtonLink>

**Parâmetros**

Consulte os parâmetros de [eth_call](#eth-call), exceto que todas as propriedades são opcionais. Se nenhum limite de gas for especificado, o Geth usará o limite de gas do bloco pendente como um limite superior. Como resultado, a estimativa retornada pode não ser suficiente para executar a chamada/transação quando a quantidade de gás for maior que o limite de gas do bloco pendente.

**Retornos**

`QUANTITY` - a quantidade de gás usada.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth-getblockbyhash}

Retorna informações sobre um bloco por hash.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  Testar endpoint no playground
</ButtonLink>

**Parâmetros**

1. `DATA`, 32 Bytes - Hash de um bloco.
2. `Boolean` - Se `true` retorna os objetos de transação completos, se `false` apenas os hashes das transações.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**Retornos**

`Object` - Um objeto de bloco, ou `null` quando nenhum bloco for encontrado:

- `number`: `QUANTITY` - o número do bloco. `null` quando for um bloco pendente.
- `hash`: `DATA`, 32 Bytes - hash do bloco. `null` quando for um bloco pendente.
- `parentHash`: `DATA`, 32 Bytes - hash do bloco pai.
- `nonce`: `DATA`, 8 Bytes - hash da Prova de Trabalho (PoW) gerada. `null` quando for um bloco pendente, `0x0` para blocos de Prova de Participação (PoS) (desde The Merge)
- `sha3Uncles`: `DATA`, 32 Bytes - SHA3 dos dados dos uncles no bloco.
- `logsBloom`: `DATA`, 256 Bytes - o filtro de bloom para os logs do bloco. `null` quando for um bloco pendente.
- `transactionsRoot`: `DATA`, 32 Bytes - a raiz da trie de transações do bloco.
- `stateRoot`: `DATA`, 32 Bytes - a raiz da trie de estado final do bloco.
- `receiptsRoot`: `DATA`, 32 Bytes - a raiz da trie de recibos do bloco.
- `miner`: `DATA`, 20 Bytes - o endereço do beneficiário a quem as recompensas do bloco foram dadas.
- `difficulty`: `QUANTITY` - inteiro da dificuldade para este bloco.
- `totalDifficulty`: `QUANTITY` - inteiro da dificuldade total da cadeia até este bloco.
- `extraData`: `DATA` - o campo "extra data" (dados extras) deste bloco.
- `size`: `QUANTITY` - inteiro do tamanho deste bloco em bytes.
- `gasLimit`: `QUANTITY` - o gás máximo permitido neste bloco.
- `gasUsed`: `QUANTITY` - o gás total usado por todas as transações neste bloco.
- `timestamp`: `QUANTITY` - o timestamp unix de quando o bloco foi agrupado.
- `transactions`: `Array` - Matriz (array) de objetos de transação, ou hashes de transação de 32 Bytes dependendo do último parâmetro fornecido.
- `uncles`: `Array` - Matriz (array) de hashes de uncles.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "difficulty": "0x4ea3f27bc",
    "extraData": "0x476574682f4c5649562f76312e302e302f6c696e75782f676f312e342e32",
    "gasLimit": "0x1388",
    "gasUsed": "0x0",
    "hash": "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0xbb7b8287f3f0a933474a79eae42cbca977791171",
    "mixHash": "0x4fffe9ae21f1c9e15207b1f472d5bbdd68c9595d461666602f2be20daf5e7843",
    "nonce": "0x689056015818adbe",
    "number": "0x1b4",
    "parentHash": "0xe99e022112df268087ea7eafaf4790497fd21dbeeb6bd7a1721df161a6657a54",
    "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x220",
    "stateRoot": "0xddc8b0234c2e0cad087c8b389aa7ef01f7d79b2570bccb77ce48648aa61c904d",
    "timestamp": "0x55ba467c",
    "totalDifficulty": "0x78ed983323d",
    "transactions": [
    ],
    "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "uncles": [
    ]
  }
}
```

### eth_getBlockByNumber {#eth-getblockbynumber}

Retorna informações sobre um bloco pelo número do bloco.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  Testar endpoint no playground
</ButtonLink>

**Parâmetros**

1. `QUANTITY|TAG` - número inteiro de um bloco, ou a string `"earliest"`, `"latest"`, `"pending"`, `"safe"` ou `"finalized"`, como no [parâmetro de bloco](/developers/docs/apis/json-rpc/#block-parameter).
2. `Boolean` - Se `true` retorna os objetos de transação completos, se `false` apenas os hashes das transações.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**Retornos**
Consulte [eth_getBlockByHash](#eth-getblockbyhash)

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Resultado, consulte [eth_getBlockByHash](#eth-getblockbyhash)

### eth_getTransactionByHash {#eth-gettransactionbyhash}

Retorna as informações sobre uma transação solicitada pelo hash da transação.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  Testar o endpoint no playground
</ButtonLink>

**Parâmetros**

1. `DATA`, 32 Bytes - hash de uma transação

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**Retorno**

`Object` - Um objeto de transação, ou `null` quando nenhuma transação for encontrada:

- `blockHash`: `DATA`, 32 Bytes - hash do bloco em que esta transação estava. `null` quando estiver pendente.
- `blockNumber`: `QUANTITY` - número do bloco em que esta transação estava. `null` quando estiver pendente.
- `from`: `DATA`, 20 Bytes - endereço do remetente.
- `gas`: `QUANTITY` - gás fornecido pelo remetente.
- `gasPrice`: `QUANTITY` - preço do gás fornecido pelo remetente em Wei.
- `hash`: `DATA`, 32 Bytes - hash da transação.
- `input`: `DATA` - os dados enviados junto com a transação.
- `nonce`: `QUANTITY` - o número de transações feitas pelo remetente antes desta.
- `to`: `DATA`, 20 Bytes - endereço do destinatário. `null` quando for uma transação de criação de contrato.
- `transactionIndex`: `QUANTITY` - número inteiro da posição do índice da transação no bloco. `null` quando estiver pendente.
- `value`: `QUANTITY` - valor transferido em Wei.
- `v`: `QUANTITY` - ID de recuperação ECDSA
- `r`: `QUANTITY` - assinatura ECDSA r
- `s`: `QUANTITY` - assinatura ECDSA s

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
    "blockNumber":"0x5daf3b", // 6139707
    "from":"0xa7d9ddbe1f17865597fbd27ec712455208b6b76d",
    "gas":"0xc350", // 50000
    "gasPrice":"0x4a817c800", // 20000000000
    "hash":"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b",
    "input":"0x68656c6c6f21",
    "nonce":"0x15", // 21
    "to":"0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb",
    "transactionIndex":"0x41", // 65
    "value":"0xf3dbb76162000", // 4290000000000000
    "v":"0x25", // 37
    "r":"0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea",
    "s":"0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c"
  }
}
```

### eth_getTransactionByBlockHashAndIndex {#eth-gettransactionbyblockhashandindex}

Retorna informações sobre uma transação pelo hash do bloco e pela posição do índice da transação.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  Testar endpoint no playground
</ButtonLink>

**Parâmetros**

1. `DATA`, 32 Bytes - hash de um bloco.
2. `QUANTITY` - número inteiro da posição do índice da transação.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Retorno**
Consulte [eth_getTransactionByHash](#eth-gettransactionbyhash)

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Para o resultado, consulte [eth_getTransactionByHash](#eth-gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth-gettransactionbyblocknumberandindex}

Retorna informações sobre uma transação pelo número do bloco e pela posição do índice da transação.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  Testar endpoint no playground
</ButtonLink>

**Parâmetros**

1. `QUANTITY|TAG` - um número de bloco, ou a string `"earliest"`, `"latest"`, `"pending"`, `"safe"` ou `"finalized"`, como no [parâmetro de bloco](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - a posição do índice da transação.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Retorno**
Veja [eth_getTransactionByHash](#eth-gettransactionbyhash)

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Para o resultado, veja [eth_getTransactionByHash](#eth-gettransactionbyhash)

### eth_getTransactionReceipt {#eth-gettransactionreceipt}

Retorna o recibo de uma transação pelo hash da transação.

**Nota** O recibo não está disponível para transações pendentes.

**Parâmetros**

1. `DATA`, 32 Bytes - hash de uma transação

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Retornos**
`Object` - Um objeto de recibo de transação, ou `null` quando nenhum recibo for encontrado:

- `transactionHash `: `DATA`, 32 Bytes - hash da transação.
- `transactionIndex`: `QUANTITY` - inteiro da posição do índice da transação no bloco.
- `blockHash`: `DATA`, 32 Bytes - hash do bloco onde esta transação estava.
- `blockNumber`: `QUANTITY` - número do bloco onde esta transação estava.
- `from`: `DATA`, 20 Bytes - endereço do remetente.
- `to`: `DATA`, 20 Bytes - endereço do destinatário. null quando for uma transação de criação de contrato.
- `cumulativeGasUsed` : `QUANTITY ` - A quantidade total de gás usada quando esta transação foi executada no bloco.
- `effectiveGasPrice` : `QUANTITY` - A soma da taxa básica e da taxa de prioridade pagas por unidade de gás.
- `gasUsed `: `QUANTITY ` - A quantidade de gás usada apenas por esta transação específica.
- `contractAddress `: `DATA`, 20 Bytes - O endereço do contrato criado, se a transação for uma criação de contrato, caso contrário, `null`.
- `logs`: `Array` - Array de objetos de log, que esta transação gerou.
- `logsBloom`: `DATA`, 256 Bytes - Filtro de Bloom para clientes leves recuperarem rapidamente logs relacionados.
- `type`: `QUANTITY` - inteiro do tipo de transação, `0x0` para transações legadas, `0x1` para tipos de lista de acesso, `0x2` para taxas dinâmicas.

Também retorna _um dos seguintes_:

- `root` : `DATA` 32 bytes da raiz de estado pós-transação (pré-Bizâncio)
- `status`: `QUANTITY` sendo `1` (sucesso) ou `0` (falha)

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // string do endereço se ele foi criado
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // logs conforme retornados por getFilterLogs, etc.
    }],
    "logsBloom": "0x00...0", // filtro bloom de 256 bytes
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth-getunclebyblockhashandindex}

Retorna informações sobre um tio de um bloco pelo hash e pela posição do índice do tio.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  Testar endpoint no playground
</ButtonLink>

**Parâmetros**

1. `DATA`, 32 Bytes - O hash de um bloco.
2. `QUANTITY` - A posição do índice do tio.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Retorno**
Consulte [eth_getBlockByHash](#eth-getblockbyhash)

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Resultado: veja [eth_getBlockByHash](#eth-getblockbyhash)

**Nota**: Um tio não contém transações individuais.

### eth_getUncleByBlockNumberAndIndex {#eth-getunclebyblocknumberandindex}

Retorna informações sobre um tio de um bloco por número e posição do índice do tio.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  Testar endpoint no playground
</ButtonLink>

**Parâmetros**

1. `QUANTITY|TAG` - um número de bloco, ou a string `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"`, como no [parâmetro de bloco](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - a posição do índice do tio.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**Retorno**
Consulte [eth_getBlockByHash](#eth-getblockbyhash)

**Nota**: Um tio não contém transações individuais.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Resultado, consulte [eth_getBlockByHash](#eth-getblockbyhash)

### eth_newFilter {#eth-newfilter}

Cria um objeto de filtro, com base nas opções de filtro, para notificar quando o estado muda (logs).
Para verificar se o estado mudou, chame [eth_getFilterChanges](#eth-getfilterchanges).

**Uma observação sobre a especificação de filtros de tópicos:**
Os tópicos dependem da ordem. Uma transação com um log com os tópicos [A, B] corresponderá aos seguintes filtros de tópicos:

- `[]` "qualquer coisa"
- `[A]` "A na primeira posição (e qualquer coisa depois)"
- `[null, B]` "qualquer coisa na primeira posição E B na segunda posição (e qualquer coisa depois)"
- `[A, B]` "A na primeira posição E B na segunda posição (e qualquer coisa depois)"
- `[[A, B], [A, B]]` "(A OU B) na primeira posição E (A OU B) na segunda posição (e qualquer coisa depois)"
- **Parâmetros**

1. `Object` - As opções de filtro:

- `fromBlock`: `QUANTITY|TAG` - (opcional, padrão: `"latest"`) Número inteiro do bloco, ou `"latest"` para o último bloco proposto, `"safe"` para o bloco seguro mais recente, `"finalized"` para o bloco finalizado mais recente, ou `"pending"`, `"earliest"` para transações que ainda não estão em um bloco.
- `toBlock`: `QUANTITY|TAG` - (opcional, padrão: `"latest"`) Número inteiro do bloco, ou `"latest"` para o último bloco proposto, `"safe"` para o bloco seguro mais recente, `"finalized"` para o bloco finalizado mais recente, ou `"pending"`, `"earliest"` para transações que ainda não estão em um bloco.
- `address`: `DATA|Array`, 20 Bytes - (opcional) Endereço do contrato ou uma lista de endereços dos quais os logs devem se originar.
- `topics`: `Array of DATA`, - (opcional) Matriz de tópicos de `DATA` de 32 Bytes. Os tópicos dependem da ordem. Cada tópico também pode ser uma matriz de DATA com opções "ou".

```js
params: [
  {
    fromBlock: "0x1",
    toBlock: "0x2",
    address: "0x8888f1f195afa192cfee860698584c030f4c9db1",
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
      null,
      [
        "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
        "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc",
      ],
    ],
  },
]
```

**Retorno**
`QUANTITY` - Um id de filtro.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth-newblockfilter}

Cria um filtro no nó para notificar quando um novo bloco chegar.
Para verificar se o estado mudou, chame [eth_getFilterChanges](#eth-getfilterchanges).

**Parâmetros**
Nenhum

**Retornos**
`QUANTITY` - Um id de filtro.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth-newpendingtransactionfilter}

Cria um filtro no nó para notificar quando novas transações pendentes chegam.
Para verificar se o estado mudou, chame [eth_getFilterChanges](#eth-getfilterchanges).

**Parâmetros**
Nenhum

**Retorno**
`QUANTITY` - Um ID de filtro.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth-uninstallfilter}

Desinstala um filtro com o id fornecido. Deve sempre ser chamado quando o monitoramento não for mais necessário.
Além disso, os filtros expiram quando não são solicitados com [eth_getFilterChanges](#eth-getfilterchanges) por um período de tempo.

**Parâmetros**

1. `QUANTITY` - O id do filtro.

```js
params: [
  "0xb", // 11
]
```

**Retorno**
`Boolean` - `true` se o filtro foi desinstalado com sucesso, caso contrário, `false`.

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth-getfilterchanges}

Método de sondagem para um filtro, que retorna um array de logs que ocorreram desde a última sondagem.

**Parâmetros**

1. `QUANTITY` - o id do filtro.

```js
params: [
  "0x16", // 22
]
```

**Retorno**
`Array` - Array de objetos de log, ou um array vazio se nada mudou desde a última sondagem.

- Para filtros criados com `eth_newBlockFilter` o retorno são hashes de bloco (`DATA`, 32 Bytes), ex., `["0x3454645634534..."]`.
- Para filtros criados com `eth_newPendingTransactionFilter ` o retorno são hashes de transação (`DATA`, 32 Bytes), ex., `["0x6345343454645..."]`.
- Para filtros criados com `eth_newFilter` os logs são objetos com os seguintes parâmetros:
  - `removed`: `TAG` - `true` quando o log foi removido, devido a uma reorganização da cadeia. `false` se for um log válido.
  - `logIndex`: `QUANTITY` - inteiro da posição do índice do log no bloco. `null` quando for um log pendente.
  - `transactionIndex`: `QUANTITY` - inteiro da posição do índice da transação a partir da qual o log foi criado. `null` quando for um log pendente.
  - `transactionHash`: `DATA`, 32 Bytes - hash da transação a partir da qual este log foi criado. `null` quando for um log pendente.
  - `blockHash`: `DATA`, 32 Bytes - hash do bloco onde este log estava. `null` quando estiver pendente. `null` quando for um log pendente.
  - `blockNumber`: `QUANTITY` - o número do bloco onde este log estava. `null` quando estiver pendente. `null` quando for um log pendente.
  - `address`: `DATA`, 20 Bytes - endereço do qual este log se originou.
  - `data`: `DATA` - dados de log não indexados de comprimento variável. (Em _Solidity_: zero ou mais argumentos de log não indexados de 32 Bytes.)
  - `topics`: `Array of DATA` - Array de 0 a 4 `DATA` de 32 Bytes de argumentos de log indexados. (Em _Solidity_: O primeiro tópico é o _hash_ da assinatura do evento (ex., `Deposit(address,bytes32,uint256)`), exceto se você declarou o evento com o especificador `anonymous`.)

- **Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x1b4", // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
      ...
    }]
}
```

### eth_getFilterLogs {#eth-getfilterlogs}

Retorna um array de todos os logs que correspondem ao filtro com o id fornecido.

**Parâmetros**

1. `QUANTITY` - O id do filtro.

```js
params: [
  "0x16", // 22
]
```

**Retorno**
Veja [eth_getFilterChanges](#eth-getfilterchanges)

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Para o resultado, veja [eth_getFilterChanges](#eth-getfilterchanges)

### eth_getLogs {#eth-getlogs}

Retorna um array de todos os logs que correspondem a um determinado objeto de filtro.

**Parâmetros**

1. `Object` - As opções de filtro:

- `fromBlock`: `QUANTITY|TAG` - (opcional, padrão: `"latest"`) Número inteiro do bloco, ou `"latest"` para o último bloco proposto, `"safe"` para o bloco seguro mais recente, `"finalized"` para o bloco finalizado mais recente, ou `"pending"`, `"earliest"` para transações que ainda não estão em um bloco.
- `toBlock`: `QUANTITY|TAG` - (opcional, padrão: `"latest"`) Número inteiro do bloco, ou `"latest"` para o último bloco proposto, `"safe"` para o bloco seguro mais recente, `"finalized"` para o bloco finalizado mais recente, ou `"pending"`, `"earliest"` para transações que ainda não estão em um bloco.
- `address`: `DATA|Array`, 20 Bytes - (opcional) Endereço do contrato ou uma lista de endereços dos quais os logs devem se originar.
- `topics`: `Array of DATA`, - (opcional) Array de 32 Bytes de tópicos `DATA`. Os tópicos são dependentes da ordem. Cada tópico também pode ser um array de DATA com opções "ou" ("or").
- `blockHash`: `DATA`, 32 Bytes - (opcional, **futuro**) Com a adição do EIP-234, `blockHash` será uma nova opção de filtro que restringe os logs retornados ao único bloco com o hash de 32 bytes `blockHash`. Usar `blockHash` é equivalente a `fromBlock` = `toBlock` = o número do bloco com o hash `blockHash`. Se `blockHash` estiver presente nos critérios de filtro, então nem `fromBlock` nem `toBlock` serão permitidos.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**Retornos**
Consulte [eth_getFilterChanges](#eth-getfilterchanges)

**Exemplo**

```js
// Requisição
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Para o resultado, consulte [eth_getFilterChanges](#eth-getfilterchanges)

## Exemplo de uso {#usage-example}

### Implantando um contrato usando JSON_RPC {#deploying-contract}

Esta seção inclui uma demonstração de como implantar um contrato usando apenas a interface RPC. Existem rotas alternativas para implantar contratos onde essa complexidade é abstraída — por exemplo, usando bibliotecas construídas sobre a interface RPC, como [Web3.js](https://web3js.readthedocs.io/) e [Web3.py](https://github.com/ethereum/web3.py). Essas abstrações são geralmente mais fáceis de entender e menos propensas a erros, mas ainda é útil entender como as coisas funcionam internamente.

A seguir, há um contrato inteligente simples chamado `Multiply7` que será implantado usando a interface JSON-RPC em um nó Ethereum. Este tutorial pressupõe que o leitor já esteja executando um nó Geth. Mais informações sobre nós e clientes estão disponíveis [aqui](/developers/docs/nodes-and-clients/run-a-node). Consulte a documentação individual do [cliente](/developers/docs/nodes-and-clients/) para ver como iniciar o HTTP JSON-RPC para clientes que não sejam Geth. A maioria dos clientes serve por padrão em `localhost:8545`.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

A primeira coisa a fazer é garantir que a interface HTTP RPC esteja ativada. Isso significa que fornecemos ao Geth a flag `--http` na inicialização. Neste exemplo, usamos o nó Geth em uma cadeia de desenvolvimento privada. Usando essa abordagem, não precisamos de ether na rede real.

```bash
geth --http --dev console 2>>geth.log
```

Isso iniciará a interface HTTP RPC em `http://localhost:8545`.

Podemos verificar se a interface está em execução recuperando o endereço da Coinbase (obtendo o primeiro endereço do array de contas) e o saldo usando [curl](https://curl.se). Observe que os dados nestes exemplos serão diferentes no seu nó local. Se você quiser testar esses comandos, substitua os parâmetros de solicitação na segunda solicitação curl pelo resultado retornado da primeira.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Como os números são codificados em hexadecimal, o saldo é retornado em Wei como uma string hexadecimal. Se quisermos ter o saldo em ether como um número, podemos usar o web3 no console do Geth.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Agora que há algum ether em nossa cadeia de desenvolvimento privada, podemos implantar o contrato. O primeiro passo é compilar o contrato Multiply7 para bytecode que pode ser enviado para a EVM. Para instalar o solc, o compilador Solidity, siga a [documentação da Solidity](https://docs.soliditylang.org/en/latest/installing-solidity.html). (Você pode querer usar uma versão mais antiga do `solc` para corresponder [à versão do compilador usada para o nosso exemplo](https://github.com/ethereum/solidity/releases/tag/v0.4.20).)

O próximo passo é compilar o contrato Multiply7 para bytecode que pode ser enviado para a EVM.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Agora que temos o código compilado, precisamos determinar quanto gás custa para implantá-lo. A interface RPC tem um método `eth_estimateGas` que nos dará uma estimativa.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

E, finalmente, implantar o contrato.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

A transação é aceita pelo nó e um hash da transação é retornado. Esse hash pode ser usado para rastrear a transação. O próximo passo é determinar o endereço onde nosso contrato foi implantado. Cada transação executada criará um recibo. Esse recibo contém várias informações sobre a transação, como em qual bloco a transação foi incluída e quanto gás foi usado pela EVM. Se uma transação criar um contrato, ela também conterá o endereço do contrato. Podemos recuperar o recibo com o método RPC `eth_getTransactionReceipt`.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

Nosso contrato foi criado em `0x4d03d617d700cf81935d7f797f4e2ae719648262`. Um resultado nulo em vez de um recibo significa que a transação ainda não foi incluída em um bloco. Aguarde um momento, verifique se o seu cliente de consenso está em execução e tente novamente.

#### Interagindo com contratos inteligentes {#interacting-with-smart-contract}

Neste exemplo, enviaremos uma transação usando `eth_sendTransaction` para o método `multiply` do contrato.

`eth_sendTransaction` exige vários argumentos, especificamente `from`, `to` e `data`. `From` é o endereço público da nossa conta, e `to` é o endereço do contrato. O argumento `data` contém um payload que define qual método deve ser chamado e com quais argumentos. É aqui que a [ABI (interface binária de aplicativo)](https://docs.soliditylang.org/en/latest/abi-spec.html) entra em jogo. A ABI é um arquivo JSON que define como definir e codificar dados para a EVM.

Os bytes do payload definem qual método no contrato é chamado. Estes são os primeiros 4 bytes do hash Keccak sobre o nome da função e seus tipos de argumento, codificados em hexadecimal. A função multiply aceita um uint, que é um alias para uint256. Isso nos deixa com:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

O próximo passo é codificar os argumentos. Há apenas um uint256, digamos, o valor 6. A ABI tem uma seção que especifica como codificar tipos uint256.

`int<M>: enc(X)` é a codificação em complemento de dois big-endian de X, preenchida no lado de ordem superior (esquerdo) com 0xff para X negativo e com bytes zero para X positivo, de modo que o comprimento seja um múltiplo de 32 bytes.

Isso é codificado para `0000000000000000000000000000000000000000000000000000000000000006`.

Combinando o seletor de função e o argumento codificado, nossos dados serão `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`.

Isso agora pode ser enviado para o nó:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Como uma transação foi enviada, um hash da transação foi retornado. A recuperação do recibo fornece:

```javascript
{
   blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
   blockNumber: 268,
   contractAddress: null,
   cumulativeGasUsed: 22631,
   gasUsed: 22631,
   logs: [{
      address: "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d",
      blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
      blockNumber: 268,
      data: "0x000000000000000000000000000000000000000000000000000000000000002a",
      logIndex: 0,
      topics: ["0x24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"],
      transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
      transactionIndex: 0
  }],
  transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
  transactionIndex: 0
}
```

O recibo contém um log. Esse log foi gerado pela EVM na execução da transação e incluído no recibo. A função `multiply` mostra que o evento `Print` foi acionado com a entrada multiplicada por 7. Como o argumento para o evento `Print` era um uint256, podemos decodificá-lo de acordo com as regras da ABI, o que nos deixará com o decimal 42 esperado. Além dos dados, vale a pena notar que os tópicos podem ser usados para determinar qual evento criou o log:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

Esta foi apenas uma breve introdução a algumas das tarefas mais comuns, demonstrando o uso direto do JSON-RPC.

## Tópicos relacionados {#related-topics}

- [Especificação JSON-RPC](https://www.jsonrpc.org/specification)
- [Nós e clientes](/developers/docs/nodes-and-clients/)
- [APIs JavaScript](/developers/docs/apis/javascript/)
- [APIs de backend](/developers/docs/apis/backend/)
- [Clientes de execução](/developers/docs/nodes-and-clients/#execution-clients)
