---
title: API JSON-RPC
description: Um protocolo de chamada de procedimento remoto (RPC) leve e sem Estado para clientes Ethereum.
lang: pt-br
---

Para que um aplicativo de software interaja com a blockchain Ethereum - lendo os dados da blockchain ou enviando transações para a rede - ele deve se conectar na Ethereum.

Para esse fim, todos os [clientes Ethereum](/developers/docs/nodes-and-clients/#execution-clients) implementam uma [especificação JSON-RPC](https://github.com/ethereum/execution-apis) para que exista um conjunto uniforme de métodos nos quais os aplicativos podem confiar, independentemente do nó específico ou da implementação do cliente.

[JSON-RPC](https://www.jsonrpc.org/specification) é um protocolo de chamada de procedimento remoto (RPC) leve e sem estado. Ele define várias estruturas de dados e as regras em torno de seu processamento. É agnóstico de transporte no sentido de que os conceitos podem ser usados dentro do mesmo processo, sobre sockets, HTTP ou em vários ambientes de passagem de mensagens. Usa o formato de dados JSON (RFC 4627).

## Implementações do cliente {#client-implementations}

Cada cliente Ethereum pode utilizar linguagens de programação diferentes ao implementar a especificação JSON-RPC. Consulte a [documentação individual do cliente](/developers/docs/nodes-and-clients/#execution-clients) para mais detalhes relacionados a linguagens de programação específicas. Recomendamos verificar a documentação de cada cliente para as informações mais recentes de suporte à API.

## Bibliotecas de Conveniência {#convenience-libraries}

Embora você possa optar por interagir diretamente com clientes da Ethereum usando a API JSON-RPC, muitas vezes existem opções mais fáceis para desenvolvedores de dapps. Muitas [bibliotecas de](/developers/docs/apis/javascript/#available-libraries) e [de backend API](/developers/docs/apis/backend/#available-libraries) existem para fornecer wrappers além de API JSON-RPC. Com essas bibliotecas, os desenvolvedores podem escrever intuitivamente métodos de uma linha para inicializar requisições JSON RPC (sob os capôs) que interagem com a Ethereum.

## APIs de cliente de consenso {#consensus-clients}

Esta página trata principalmente da API JSON-RPC usada pelos clientes de execução Ethereum. No entanto, os clientes de consenso também têm uma API RPC que permite aos usuários consultar informações sobre o nó, solicitar blocos Beacon, estado do Beacon, e outras informações relacionadas ao consenso diretamente de um nó. Essa API está documentada na [página da Web da API Beacon](https://ethereum.github.io/beacon-APIs/#/).

Uma API interna também é usada para comunicação entre clientes dentro de um nó - ou seja, permite que o cliente de consenso e o cliente de execução troquem dados. Ela é chamada de “API Engine” e suas especificações estão disponíveis no [Github](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Especificação do cliente de execução {#spec}

[Leia a especificação completa da API JSON-RPC no GitHub](https://github.com/ethereum/execution-apis). Esta API está documentada na [página da Web da API de execução](https://ethereum.github.io/execution-apis/api-documentation/) e inclui um Inspetor para testar todos os métodos disponíveis.

## Convenções {#conventions}

### Codificação de valor hexadecimal {#hex-encoding}

Dois tipos de dados-chave são passados pelo JSON: arrays (matrizes) e quantidade de bytes não formatados. Ambos são passados com uma codificação hexadecimal, mas com diferentes requisitos de formatação.

#### Quantidades {#quantities-encoding}

Ao codificar quantidades (inteiros, números): codifique como hexadecimal, prefixe com "0x", a representação mais compacta (pequena exceção: zero deve ser representado como "0x0").

Veja aqui alguns exemplos:

- 0x41 (65 em decimal)
- 0x400 (1024 em decimal)
- ERRADO: 0x (deve sempre ter pelo menos um dígito - zero é "0x0")
- ERRADO: 0x0400 (sem zeros à esquerda permitidos)
- ERRADO: ff (deve ser prefixado 0x)

### Dados não formatados {#unformatted-data-encoding}

Ao codificar dados não formatados (arrays de bytes, endereços de contas, hashes, matrizes de bytecodes): codifique como hexadecimal, prefixe com "0x", dois dígitos hexadecimais por byte.

Aqui estão alguns exemplos:

- 0x41 (tamanho 1, "A")
- 0x004200 (tamanho 3, "0B0")
- 0x (tamanho 0, "")
- ERRADO: 0xf0f0f (deve ser um número par de dígitos)
- ERRADO: 004200 (deve ser prefixado 0x)

### O parâmetro de bloco padrão {#default-block}

Os métodos a seguir têm um parâmetro de bloco padrão extra:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

Quando são feitas requisições que atuam no estado da Ethereum, o último parâmetro de bloco padrão determina a altura do bloco.

As seguintes opções são possíveis para o parâmetro defaultBlock:

- `String HEX` - um número de bloco inteiro
- `String "earliest"` para o bloco mais antigo/de início
- `String "latest"` - para o último bloco proposto
- `String "safe"` – para o último bloco de cabeçalho seguro
- `String "finalized"` – para o último bloco finalizado
- `String "pendente"` – para o estado/transações pendentes

## Exemplos

Nesta página, fornecemos exemplos de como usar endpoints de API JSON_RPC individuais usando a ferramenta de linha de comando [curl](https://curl.se). Esses exemplos de endpoints individuais são encontrados abaixo na seção [Exemplos Curl](#curl-examples). Mais abaixo na página, também fornecemos um [exemplo de ponta a ponta](#usage-example) para compilar e implantar um contrato inteligente usando um nó Geth, a API JSON_RPC e curl.

## Exemplos Curl {#curl-examples}

Exemplos de uso da API JSON_RPC fazendo pedidos [curl](https://curl.se) para um nó Ethereum são fornecidos abaixo. Cada exemplo inclui uma descrição do endpoint específico, seus parâmetros, tipo de retorno e um exemplo funcional de como ele deve ser usado.

Os pedidos curl podem retornar uma mensagem de erro relacionada ao tipo de conteúdo. Isso ocorre porque a opção `--data` define o tipo de conteúdo como `application/x-www-form-urlencoded`. Se o seu nó reclamar sobre isso, defina manualmente o cabeçalho colocando `-H "Content-Type: application/json"` no início da chamada. Os exemplos também não incluem a URL/IP & combinação de porta que deve ser o último argumento dado para curl (por exemplo, `127.0.0.1:8545`). Uma solicitação de curl completa, incluindo esses dados adicionais, tem o seguinte formato:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Gossip, Estado, Histórico {#gossip-state-history}

Alguns dos métodos JSON-RPC principais exigem dados da rede Ethereum, se enquadram perfeitamente em três categorias principais: _Gossip, Estado e Histórico_. Use os links nestas seções para pular para cada método ou use a tabela de conteúdos para explorar toda a lista de métodos.

### Métodos Gossip {#gossip-methods}

> Esses métodos rastreiam o cabeçalho da cadeia. É assim que as transações se deslocam pela rede, encontram o caminho para os blocos e como os clientes descobrem novos blocos.

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### Métodos de Estado {#state_methods}

> Métodos que relatam o estado atual de todos os dados armazenados. O "estado" é como um grande pedaço compartilhado de RAM e inclui saldos de contas, dados de contratos e estimativas de gás.

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### Métodos de Histórico {#history_methods}

> Busca o histórico de registros de cada bloco até à gênesis (início). Isso é como um arquivo grande que apenas insere e inclui todos os cabeçalhos de bloco, corpos de bloco, blocos de tio e recibos de transação.

- [eth_getBlockTransactionCountByHash](#eth_getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth_getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth_getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth_getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth_getblockbyhash)
- [eth_getBlockByNumber](#eth_getblockbynumber)
- [eth_getTransactionByHash](#eth_gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth_gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth_getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth_getunclebyblocknumberandindex)

## Playground da API JSON-RPC

Você pode usar a [ferramenta de playground](https://ethereum-json-rpc.com) para descobrir e testar os métodos da API. Ele também mostra quais métodos e redes são suportados por vários provedores de nós.

## Métodos de API JSON-RPC {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

Retorna a versão atual do cliente.

**Parâmetros**

Nenhum

**Returnos**

`String` - A versão atual do cliente

**Exemplo**

```js
// Solicitação
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Resultado
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3_sha3}

Retorna Keccak-256 (_não_ o SHA3-256 padronizado) dos dados fornecidos.

**Parâmetros**

1. `DATA` - Os dados a serem convertidos em um hash SHA3

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Retorna**

`DATA` - O resultado SHA3 da string fornecida.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net_version}

Retorna a id da rede atual.

**Parâmetros**

Nenhum

**Retorna**

`String` - A id da rede atual.

A lista completa das IDs da rede atual está disponível em [chainlist.org](https://chainlist.org). Alguns exemplos comuns são:

- `1`: Ethereum Mainnet
- `11155111`: Sepolia testnet
- `560048` : Hoodi testnet

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net_listening}

Retorna `true` se o cliente estiver escutando ativamente as conexões de rede.

**Parâmetros**

Nenhum

**Retorna**

`Boolean` - `true` quando escuta, do contrário `false`.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net_peercount}

Retorna o número de pares atualmente conectados ao cliente.

**Parâmetros**

Nenhum

**Retorna**

`QUANTITY` - número inteiro do número de pares conectados.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Result
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth_protocolversion}

Retorna a versão atual do protocolo Ethereum. Note que este método [não está disponível no Geth](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**Parâmetros**

Nenhum

**Retorna**

`String` - A versão atual do protocolo Ethereum

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth_syncing}

Retorna um objeto com dados sobre o status da sincronização ou `false`.

**Parâmetros**

Nenhum

**Retorna**

Os dados de retorno precisos variam entre as implementações do cliente. Todos os clientes retornam `False` quando o nó não está sincronizando, e todos os clientes retornam os seguintes campos.

`Object|Boolean`, um objeto com dados de status da sincronização ou `FALSE`, quando não está sincronizando:

- `startingBlock`: `QUANTITY` — O bloco no qual a importação começou (só será reiniciado após a sincronização atingir seu cabeçalho)
- `currentBlock`: `QUANTITY` — O bloco atual, o mesmo que eth_blockNumber
- `highestBlock`: `QUANTITY` — O bloco mais alto estimado

No entanto, os clientes individuais também podem fornecer dados adicionais. Por exemplo, Geth retorna o seguinte:

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

Enquanto Besu retorna:

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
// Request
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
// Or when not syncing
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth_coinbase}

Retorna o endereço de coinbase do cliente.

> **Nota:** Este método foi descontinuado a partir da versão **v1.14.0** e não é mais suportado. Tentar usar este método resultará em um erro de "Método não suportado".

**Parâmetros**

Nenhum

**Returnos**

`DATA`, 20 bytes - O endereço atual da coinbase.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth_chainId}

Retorna a ID da cadeia usada para assinar transações protegidas contra reprodução.

**Parâmetros**

Nenhum

**Returnos**

`chainId`, valor hexadecimal como uma cadeia de caracteres representando o inteiro da ID da cadeia atual.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth_mining}

Retorna `true` se o cliente estiver minerando novos blocos de maneira ativa. Isso só pode retornar `true` para redes de prova de trabalho e pode não estar disponível em alguns clientes desde a [Fusão](/roadmap/merge/).

**Parâmetros**

Nenhum

**Returnos**

`Boolean` — retorna `true` do cliente que está minerando, caso contrário, `false`.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth_hashrate}

Retorna o número de hashes por segundo do nó que está minerando. Isso só pode retornar `true` para redes de prova de trabalho e pode não estar disponível em alguns clientes desde a [Fusão](/roadmap/merge/).

**Parâmetros**

Nenhum

**Returnos**

`QUANTITY` — número de hashes por segundo.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Result
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth_gasprice}

Retorna uma estimativa do preço atual por unidade de gás em wei. Por exemplo, o cliente Besu examina os últimos 100 blocos e retorna o preço unitário médio do gás por padrão.

**Parâmetros**

Nenhum

**Returnos**

`QUANTITY` — Número inteiro do preço atual do gás em Wei.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Result
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth_accounts}

Retorna uma lista de endereços de propriedade do cliente.

**Parâmetros**

Nenhum

**Returnos**

`Array of DATA`, 20 Bytes — endereços de propriedade do cliente.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth_blocknumber}

Retorna o número do bloco mais recente.

**Parâmetros**

Nenhum

**Returnos**

`QUANTITY` — Inteiro do número do bloco atual no qual o cliente está.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Result
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth_getbalance}

Retorna o saldo da conta do endereço fornecido.

**Parâmetros**

1. `DATA`, 20 Bytes - Endereço para verificar o saldo.
2. `QUANTITY|TAG` - número de bloco inteiro ou a string `"latest"`, `"earliest"`, `"pending"`, `"safe"` ou `"finalized"`. Consulte o [parâmetro de bloco padrão](/developers/docs/apis/json-rpc/#default-block)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Returnos**

`QUANTITY` — Inteiro do saldo atual em Wei.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth_getstorageat}

Retorna o valor de uma posição de armazenamento em um determinado endereço.

**Parâmetros**

1. `DATA`, 20 Bytes - Endereço do armazenamento.
2. `QUANTITY` - Número inteiro da posição no armazenamento.
3. `QUANTITY|TAG` - número de bloco inteiro ou a string `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"`. Veja o [parâmetro de bloco padrão](/developers/docs/apis/json-rpc/#default-block)

**Returnos**

`DATA` — O valor nessa posição de armazenamento.

**Exemplo** O cálculo da posição correta depende do armazenamento a ser recuperado. Considere o seguinte contrato implementado em `0x295a70b2de5e3953354a6a8344e616ed314d7251` pelo endereço `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;
    function Storage() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

Recuperar o valor da pos0 é simples:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Recuperar um elemento do mapa é mais difícil. A posição de um elemento no mapa é calculada com:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

Isso significa que para recuperar o armazenamento na pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] precisamos calcular a posição com:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

O console geth fornecido com a biblioteca Web3 pode ser usado para fazer o cálculo:

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

### eth_getTransactionCount {#eth_gettransactioncount}

Retorna o número de transações _enviadas_ a partir de um endereço.

**Parâmetros**

1. `DATA`, 20 Bytes - Endereço.
2. `QUANTITY|TAG` - número de bloco inteiro ou a string `"latest"`, `"earliest"`, `"pending"`, `"safe"` ou `"finalized"`. Consulte o [parâmetro de bloco padrão](/developers/docs/apis/json-rpc/#default-block)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // state at the latest block
]
```

**Returnos**

`QUANTITY` — Inteiro do número de transações enviadas a partir desse endereço.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

Retorna o número de transações em um bloco a partir de um bloco que corresponde ao hash de bloco fornecido.

**Parâmetros**

1. `DATA`, 32 bytes - Hash de um bloco

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**Returnos**

`QUANTITY` — Inteiro do número de transações nesse bloco.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

Retorna o número de transações em um bloco a partir de um bloco que corresponde ao hash de bloco fornecido.

**Parâmetros**

1. `QUANTITY|TAG` - inteiro de um número de bloco, ou a string `"earliest"`, `"latest"`, `"pending"`, `"safe"` ou `"finalized"`, como no [parâmetro de bloco padrão](/developers/docs/apis/json-rpc/#default-block).

```js
params: [
  "0x13738ca", // 20396234
]
```

**Returnos**

`QUANTITY` — Inteiro do número de transações nesse bloco.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

Retorna o número de transações em um bloco a partir de um bloco que corresponde ao hash de bloco fornecido.

**Parâmetros**

1. `DADOS`, 32 bytes - hash de um bloco

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**Returnos**

`QUANTITY` — Inteiro do número de transações nesse bloco.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

Retorna o número de transações em um bloco a partir de um bloco que corresponde ao hash de bloco fornecido.

**Parâmetros**

1. `QUANTITY|TAG` - inteiro de um número de bloco, ou a string `"latest"`, `"earliest"`, `"pending"`, `"safe"` ou `"finalized"`. Veja o [parâmetro de bloco padrão](/developers/docs/apis/json-rpc/#default-block)

```js
params: [
  "0xe8", // 232
]
```

**Returnos**

`QUANTITY` — Inteiro do número de transações nesse bloco.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth_getcode}

Retorna o código em um endereço fornecido.

**Parâmetros**

1. `DATA`, 20 Bytes - Endereço
2. `QUANTITY|TAG` - número de bloco inteiro ou a string `"latest"`, `"earliest"`, `"pending"`, `"safe"` ou `"finalized"`. Consulte o [parâmetro de bloco padrão](/developers/docs/apis/json-rpc/#default-block)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**Returnos**

`DATA` — O código do endereço fornecido.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth_sign}

O método de assinatura calcula uma assinatura específica do Ethereum com: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

Ao adicionar um prefixo à mensagem, a assinatura calculada é reconhecível como uma assinatura específica do Ethereum. Isso evita o uso indevido por parte de um dapp malicioso, que pode assinar dados arbitrários (por exemplo, de transação) e usar a assinatura para usar a identidade da vítima.

Observação: o endereço de assinatura deve estar desbloqueado.

**Parâmetros**

1. `DADOS`, 20 Bytes - endereço
2. `DATA`, N Bytes - Mensagem para assinar

**Returnos**

`DATA`: assinatura

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth_signtransaction}

Assina uma transação que pode ser enviada à rede posteriormente usando [eth_sendRawTransaction](#eth_sendrawtransaction).

**Parâmetros**

1. `Objeto` - O objeto da transação

- `type`:
- `from`: `DATA`, 20 Bytes — Endereço de onde a transação é enviada.
- `to`: `DATA`, 20 Bytes — (opcional ao criar um novo contrato) O endereço para o qual a transação é direcionada.
- `gas`: `QUANTITY` — (opcional, padrão: 90000) Inteiro do gás fornecido para a execução da transação. Retornará o gás não utilizado.
- `gasPrice`: `QUANTITY` — (opcional, padrão: a ser determinado) Inteiro do gasPrice usado para cada gás pago, em Wei.
- `valor`: `QUANTITY` — (opcional) Inteiro do valor enviado com esta transação, em Wei.
- `data`: `DATA` — Código compilado de um contrato OU do hash da assinatura do método invocado e parâmetros codificados.
- `nonce`: `QUANTITY` — (opcional) Inteiro de um nonce. Isso permite substituir suas próprias transações pendentes que usam o mesmo nonce.

**Returnos**

`DATA`: o objeto de transação codificado em RLP assinado pela conta especificada.

**Exemplo**

```js
// Request
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth_sendtransaction}

Cria uma nova transação de chamada de mensagem ou uma criação de contrato, se o campo de dados contiver código, e o assina usando a conta especificada `em`.

**Parâmetros**

1. `Object` - O objeto da transação

- `from`: `DATA`, 20 Bytes — Endereço de onde a transação é enviada.
- `to`: `DATA`, 20 Bytes — (opcional ao criar um novo contrato) O endereço para o qual a transação é direcionada.
- `gas`: `QUANTITY` — (opcional, padrão: 90000) Inteiro do gás fornecido para a execução da transação. Retornará o gás não utilizado.
- `gasPrice`: `QUANTITY` — (opcional, padrão: a ser determinado) Inteiro do gasPrice usado para cada gás pago.
- `valor`: `QUANTITY` — (opcional) Inteiro do valor enviado com esta transação.
- `input`: `DATA` - O código compilado de um contrato OU o hash da assinatura do método invocado e dos parâmetros codificados.
- `nonce`: `QUANTITY` — (opcional) Inteiro de um nonce. Isso permite substituir suas próprias transações pendentes que usam o mesmo nonce.

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

**Returnos**

`DATA`, 32 Bytes — O hash da transação ou o hash zero se a transação ainda não estiver disponível.

Use [eth_getTransactionReceipt](#eth_gettransactionreceipt) para obter o endereço do contrato, depois de a transação ter sido proposta em um bloco, quando você criou um contrato.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth_sendrawtransaction}

Cria uma nova transação de chamada de mensagem ou um contrato para transações assinadas.

**Parâmetros**

1. `DATA`, O objeto de transação assinada.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Returnos**

`DATA`, 32 Bytes — O hash da transação ou o hash zero se a transação ainda não estiver disponível.

Use [eth_getTransactionReceipt](#eth_gettransactionreceipt) para obter o endereço do contrato, depois de a transação ter sido proposta em um bloco, quando você criou um contrato.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth_call}

Executa uma nova chamada de mensagem imediatamente sem criar uma transação na blockchain. Frequentemente usado para executar funções de contrato inteligente somente leitura, por exemplo, o `balanceOf` para um contrato ERC-20.

**Parâmetros**

1. `Object` - O objeto de chamada de transação

- `from`: `DATA`, 20 Bytes — (opcional) O endereço a partir do qual a transação é enviada.
- `to`: `DATA`, 20 Bytes — O endereço para o qual a transação é direcionada.
- `gas`: `QUANTITY` — (opcional) Inteiro do gás fornecido para a execução da transação. eth_call consome zero gás, mas este parâmetro pode ser necessário para algumas execuções.
- `gasPrice`: `QUANTITY` — (opcional) Inteiro do gasPrice usado para cada gás pago
- `valor`: `QUANTITY` — (opcional) Inteiro do valor enviado com esta transação
- `input`: `DATA` - (opcional) Hash da assinatura do método e parâmetros codificados. Para obter mais detalhes, consulte o [Contrato Ethereum ABI na documentação do Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG` - número de bloco inteiro ou a string `"latest"`, `"earliest"`, `"pending"`, `"safe"` ou `"finalized"`. Consulte o [parâmetro de bloco padrão](/developers/docs/apis/json-rpc/#default-block)

**Returnos**

`DATA` — O valor de retorno do contrato executado.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth_estimategas}

Gera e retorna uma estimativa de quantas unidades de gás são necessárias para permitir que a transação seja concluída. A transação não será adicionada à blockchain. Observe que a estimativa pode ser significativamente maior do que a quantidade de gás realmente usada pela transação, por vários motivos, incluindo a mecânica do EVM e o desempenho do nó.

**Parâmetros**

Veja os parâmetros do [eth_call](#eth_call), a menos que todas as propriedades sejam opcionais. Se nenhum limite de gás é especificado, o geth usa o limite de gás do bloco pendente como um limite superior. Consequentemente, a estimativa retornada poderá não ser suficiente para executar a chamada/transação quando a quantidade de gás for maior que o limite de gás do bloco pendente.

**Returnos**

`QUANTITY` — A quantidade de gás usada.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth_getblockbyhash}

Retorna informações sobre um bloco por hash.

**Parâmetros**

1. `DATA`, 32 Bytes - Hash de um bloco.
2. `Boolean` - Se `true` retorna os objetos de transação completos, se `false` apenas os hashes das transações.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**Returnos**

`Object` — Um objeto de bloco, ou `null` quando nenhum bloco foi encontrado:

- `number`: `QUANTITY` — O número do bloco. `null` quando o bloco está pendente.
- `hash`: `DATA`, 32 Bytes — Hash do bloco. `null` quando o bloco está pendente.
- `parentHash`: `DATA`, 32 Bytes — Hash do bloco pai.
- `nonce`: `DATA`, 8 Bytes — Hash da prova de trabalho gerada. `null` quando o bloco está pendente.
- `sha3Uncles`: `DATA`, 32 Bytes — SHA3 dos dados tios no bloco.
- `logsBloom`: `DATA`, 256 Bytes — O filtro bloom para os logs do bloco. `null` quando o bloco está pendente.
- `transactionsRoot`: `DATA`, 32 Bytes — A raiz da árvore de transação do bloco.
- `stateRoot`: `DATA`, 32 Bytes — A raiz da árvore do estado final do bloco.
- `receiptsRoot`: `DATA`, 32 Bytes — A raiz da árvore de itens recebidos do bloco.
- `miner`: `DATA`, 20 Bytes — O endereço do beneficiário a quem as recompensas de mineração foram dadas.
- `dificuldade`: `QUANTITY` — Inteiro da dificuldade para este bloco.
- `totalDifficulty`: `QUANTITY` — Inteiro da dificuldade total da cadeia até este bloco.
- `extraData`: `DATA` — O campo “dados extras” deste bloco.
- `size`: `QUANTITY` — Inteiro do tamanho deste bloco em bytes.
- `gasLimit`: `QUANTITY` — O gás máximo permitido neste bloco.
- `gasUsed`: `QUANTITY` — O total de gás usado por todas as transações neste bloco.
- `timestamp`: `QUANTITY` — O carimbo de data/hora unix no momento em que o bloco foi agrupado.
- `transactions`: `Array` — Matriz de objetos de transação ou hashes de transação de 32 bytes, dependendo do último parâmetro fornecido.
- `uncles`: `Array` — Matriz de hashes tio.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// Result
{
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

### eth_getBlockByNumber {#eth_getblockbynumber}

Retorna informações sobre um bloco por número de bloco.

**Parâmetros**

1. `QUANTITY|TAG` - inteiro de um número de bloco, ou a string `"earliest"`, `"latest"`, `"pending"`, `"safe"` ou `"finalized"`, como no [parâmetro de bloco padrão](/developers/docs/apis/json-rpc/#default-block).
2. `Boolean` - Se `true` retorna os objetos de transação completos, se `false` apenas os hashes das transações.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**Retorna** Consulte [eth_getBlockByHash](#eth_getblockbyhash)

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Veja o resultado [eth_getBlockByHash](#eth_getblockbyhash)

### eth_getTransactionByHash {#eth_gettransactionbyhash}

Retorna as informações sobre uma transação solicitada pelo hash de transação.

**Parâmetros**

1. `DATA`, 32 Bytes - hash de uma transação

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**Returnos**

`Object` — Um objeto de transação ou `null` quando nenhuma transação foi encontrada:

- `blockHash`: `DATA`, 32 Bytes — Hash do bloco onde esta transação estava localizada. `null` quando está pendente.
- `blockNumber`: `QUANTITY` — Número do bloco onde esta transação estava localizada. `null` quando está pendente.
- `from`: `DATA`, 20 Bytes — Endereço do remetente.
- `gás`: `QUANTITY` — Gás fornecido pelo remetente.
- `gasPrice`: `QUANTITY` — Preço do gás fornecido pelo remetente em Wei.
- `hash`: `DATA`, 32 Bytes — Hash da transação.
- `input`: `DATA` — Os dados enviados com a transação.
- `nonce`: `QUANTITY` — O número de transações feitas pelo remetente antes desta.
- `to`: `DATA`, 20 Bytes — Endereço do destinatário. `null` quando for uma transação de criação de contrato.
- `transactionIndex`: `QUANTITY` — Inteiro da posição do índice de transações no bloco. `null` quando está pendente.
- `valor`: `QUANTITY` — Valor transferido em Wei.
- `v`: `QUANTITY` — ID de recuperação ECDSA
- `r`: `QUANTITY` — Assinatura ECDSA r
- `s`: `QUANTITY` — Assinatura ECDSA s

**Exemplo**

```js
// Request
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

### eth_getTransactionByBlockHashAndIndex {#eth_gettransactionbyblockhashandindex}

Retorna informações sobre uma transação por hash de bloco e a posição do índice de transação.

**Parâmetros**

1. `DATA`, 32 Bytes - Hash de um bloco.
2. `QUANTITY` - Inteiro da posição do índice da transação.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Retorna** Consulte [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Resultado. Veja [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

Retorna informações sobre uma transação pelo número do bloco e posição do índice da transação.

**Parâmetros**

1. `QUANTITY|TAG` - um número de bloco ou a string `"earliest"`, `"latest"`, `"pending"`, `"safe"` ou `"finalized"`, como no [parâmetro de bloco padrão](/developers/docs/apis/json-rpc/#default-block).
2. `QUANTITY` - A posição do índice da transação.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Retorna** Consulte [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Resultado. Veja [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

Retorna o recebimento de uma transação pelo hash de transação.

**Observe** que o recibo não está disponível para transações pendentes.

**Parâmetros**

1. `DADOS`, 32 bytes - hash de um bloco

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Retorna** `Object` — Um objeto de recebimento de transação, ou `null` quando nenhum recebimento foi encontrado:

- `transactionHash`: `DATA`, 32 Bytes — Hash da transação.
- `transactionIndex`: `QUANTITY` — Inteiro da posição do índice de transações no bloco.
- `blockHash`: `DATA`, 32 Bytes — Hash do bloco onde esta transação estava localizada.
- `blockNumber`: `QUANTITY` — Número do bloco onde esta transação estava localizada.
- `from`: `DATA`, 20 Bytes — Endereço do remetente.
- `to`: `DATA`, 20 Bytes — Endereço do destinatário. null quando for uma transação de criação de contrato.
- `cumulativeGasUsed` : `QUANTITY` — A quantidade total de gás utilizada quando esta transação foi executada no bloco.
- `effectiveGasPrice` : `QUANTITY` — A soma da taxa base e gorjeta pagas por unidade de gás.
- `gasUsed`: `QUANTITY` — A quantidade de gás usada apenas por esta transação específica.
- `contractAddress`: `DATA`, 20 Bytes — O endereço do contrato criado, se a transação era uma criação do contrato, caso contrário `null`.
- `logs`: `Array` — Matriz de objetos de log gerados por esta transação.
- `logsBloom`: `DATA`, 256 Bytes — Filtro Bloom para clientes leves para recuperar rapidamente os logs relacionados.
- `type`: `QUANTITY` — Inteiro do tipo de transação, `0x0` para transações herdadas, `0x1` para tipos de lista de acesso, `0x2` para taxas dinâmicas.

Ele também retorna _seja_ :

- `root` : `DATA` 32 bytes de stateRoot pós-transação (anterior à atualização Byzantium)
- `status`: `QUANTITY` seja `1` (êxito) ou `0` (falha)

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // string of the address if it was created
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // logs as returned by getFilterLogs, etc.
    }],
    "logsBloom": "0x00...0", // 256 byte bloom filter
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth_getunclebyblockhashandindex}

Retorna informações sobre o tio de um bloco por hash e a posição do índice de um tio.

**Parâmetros**

1. `DATA`, 32 Bytes - O hash de um bloco.
2. `QUANTITY` - A posição do índice tio.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Retorna** Consulte [eth_getBlockByHash](#eth_getblockbyhash)

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Veja o resultado [eth_getBlockByHash](#eth_getblockbyhash)

**Observação**: um tio (bloco) não contém transações individuais.

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

Retorna informações sobre um tio de um bloco por número e posição do índice tio.

**Parâmetros**

1. `QUANTITY|TAG` - um número de bloco ou a string `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"`, como no [parâmetro de bloco padrão](/developers/docs/apis/json-rpc/#default-block).
2. `QUANTITY` - A posição do índice tio.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**Retorna** Consulte [eth_getBlockByHash](#eth_getblockbyhash)

**Observação**: um tio (bloco) não contém transações individuais.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Veja o resultado [eth_getBlockByHash](#eth_getblockbyhash)

### eth_newFilter {#eth_newfilter}

Cria um objeto de filtro, com base nas opções de filtro, para notificar quando o estado é alterado (logs). Para verificar se o estado mudou, chame [eth_getFilterChanges](#eth_getfilterchanges).

**Observação sobre a especificação de filtros de tópicos:** Os tópicos são dependentes da ordem. Uma transação com um log com tópicos [A, B] será combinada pelos seguintes filtros de tópicos:

- `[]` “qualquer coisa”
- `[A]` “A na primeira posição (e qualquer coisa depois)”
- `[null, B]` “qualquer coisa na primeira posição E B na segunda posição (e qualquer coisa depois)”
- `[A, B]` “A na primeira posição E B na segunda posição (e qualquer coisa depois)”
- `[[A, B], [A, B]]` “(A OU B) na primeira posição E (A OU B) na segunda posição (e qualquer coisa depois)”
- **Parâmetros**

1. `Object` - As opções de filtro:

- `fromBlock`: `QUANTITY|TAG` - (opcional, padrão: `"latest"`) Número de bloco inteiro ou `"latest"` para o último bloco proposto, `"safe"` para o último bloco seguro, `"finalized"` para o último bloco finalizado ou `"pending"`, `"earliest"` para transações que ainda não estão em um bloco.
- `toBlock`: `QUANTITY|TAG` - (opcional, padrão: `"latest"`) Número de bloco inteiro, ou `"latest"` para o último bloco proposto, `"safe"` para o último bloco seguro, `"finalized"` para o último bloco finalizado, ou `"pending"`, `"earliest"` para transações que ainda não estão em um bloco.
- `endereço`: `DATA|Array`, 20 Bytes - (opcional) Endereço do contrato ou uma lista de endereços dos quais os logs devem se originar.
- `topics`: `Array of DATA`, - (opcional) Array de tópicos de `DATA` de 32 Bytes. Os tópicos são dependentes da ordem. Cada tópico também pode ser uma matriz de DADOS com opções "ou".

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

**Retorna** `QUANTITY` — Uma ID de filtro.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth_newblockfilter}

Cria um filtro no nó para notificar quando um novo bloco chega. Para verificar se o estado mudou, chame [eth_getFilterChanges](#eth_getfilterchanges).

**Parâmetros** Nenhum

**Retorna** `QUANTITY` — Uma ID de filtro.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

Cria um filtro no nó para notificar quando chegam novas transações pendentes. Para verificar se o estado mudou, chame [eth_getFilterChanges](#eth_getfilterchanges).

**Parâmetros** Nenhum

**Retorna** `QUANTITY` — Uma ID de filtro.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth_uninstallfilter}

Desinstala um filtro com a ID fornecida. Deve ser sempre chamado quando nenhum tipo de observação é necessária. Além disso, os filtros expiram quando não são solicitados com [eth_getFilterChanges](#eth_getfilterchanges) por um período de tempo.

**Parâmetros**

1. `QUANTITY` - A ID do filtro.

```js
params: [
  "0xb", // 11
]
```

**Retorna** `Boolean` — `true` se o filtro foi desinstalado com sucesso, caso contrário `false`.

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth_getfilterchanges}

Método de sondagem para um filtro, que retorna uma matriz de logs produzidos desde a última sondagem.

**Parâmetros**

1. `QUANTITY` - A ID do filtro.

```js
params: [
  "0x16", // 22
]
```

**Retorna** `Array` — Matriz de objetos de log ou uma matriz vazia se nada mudou desde a última sondagem.

- Para filtros criados com `eth_newBlockFilter`, o retorno são hashes de bloco (`DATA`, 32 Bytes), por exemplo, `["0x3454645634534..."]`.
- Para filtros criados com `eth_newPendingTransactionFilter`, o retorno são hashes de transação (`DATA`, 32 Bytes), por exemplo, `["0x6345343454645..."]`.
- Para filtros criados com `eth_newFilter`, os logs são objetos com os seguintes parâmetros:
  - `removed`: `TAG` — `true` quando o log foi removido devido a uma reorganização da cadeia. `false` se for um log válido.
  - `logIndex`: `QUANTITY` — Inteiro da posição do índice de log no bloco. `null` quando o log estiver pendente.
  - `transactionIndex`: `QUANTITY` — Inteiro a partir do qual o log de posição do índice foi criado. `null` quando o log estiver pendente.
  - `transactionHash`: `DATA`, 32 Bytes — Hash das transações a partir das quais este log foi criado. `null` quando o log estiver pendente.
  - `blockHash`: `DATA`, 32 Bytes — Hash do bloco onde este log estava localizado. `null` quando está pendente. `null` quando o log estiver pendente.
  - `blockNumber`: `QUANTITY` — O número do bloco onde este log estava localizado. `null` quando está pendente. `null` quando o log estiver pendente.
  - `endereço`: `DADOS`, 20 Bytes — Endereço de origem deste log.
  - `data`: `DATA` - contém zero ou mais argumentos não indexados de 32 bytes do log.
  - `topics`: `Array of DATA` — Matriz de 0 a 4 32 Bytes `DATA` de argumentos de log indexados. (No _Solidity_: O primeiro tópico é o _hash_ da assinatura do evento (por exemplo, ` Deposit(address,bytes32,uint256)`), exceto se você declarou o evento com o especificador `anonymous`.)
- **Exemplo**

```js
// Request
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

### eth_getFilterLogs {#eth_getfilterlogs}

Retorna uma matriz de todos os logs correspondentes ao filtro com a ID fornecida.

**Parâmetros**

1. `QUANTITY` - A ID do filtro.

```js
params: [
  "0x16", // 22
]
```

**Retorna** Consulte [eth_getFilterChanges](#eth_getfilterchanges)

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Resultado. Veja [eth_getFilterChanges](#eth_getfilterchanges)

### eth_getLogs {#eth_getlogs}

Retorna uma matriz de todos os logs que correspondem a um determinado objeto de filtro.

**Parâmetros**

1. `Object` - As opções de filtro:

- `fromBlock`: `QUANTITY|TAG` - (opcional, padrão: `"latest"`) Número de bloco inteiro ou `"latest"` para o último bloco proposto, `"safe"` para o último bloco seguro, `"finalized"` para o último bloco finalizado ou `"pending"`, `"earliest"` para transações que ainda não estão em um bloco.
- `toBlock`: `QUANTITY|TAG` - (opcional, padrão: `"latest"`) Número de bloco inteiro, ou `"latest"` para o último bloco proposto, `"safe"` para o último bloco seguro, `"finalized"` para o último bloco finalizado, ou `"pending"`, `"earliest"` para transações que ainda não estão em um bloco.
- `endereço`: `DATA|Array`, 20 Bytes - (opcional) Endereço do contrato ou uma lista de endereços dos quais os logs devem se originar.
- `topics`: `Array of DATA`, - (opcional) Array de tópicos de `DATA` de 32 Bytes. Os tópicos são dependentes da ordem. Cada tópico também pode ser uma matriz de DADOS com opções "ou".
- `blockHash`: `DATA`, 32 Bytes — (opcional, **futuro**) Com a adição do EIP-234, `blockHash` será uma nova opção de filtro, que restringe os logs retornados ao bloco único com o hash de 32 bytes `blockHash`. Usar `blockHash` é equivalente a `fromBlock` = `toBlock` = o número do bloco com hash `blockHash`. Se `blockHash` estiver presente nos critérios de filtro, nem `fromBlock`, nem `toBlock` serão permitidos.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**Retorna** Consulte [eth_getFilterChanges](#eth_getfilterchanges)

**Exemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Resultado. Veja [eth_getFilterChanges](#eth_getfilterchanges)

## Exemplos de uso {#usage-example}

### Implementando um contrato usando JSON_RPC {#deploying-contract}

Esta seção inclui uma demonstração de como implantar um contrato usando apenas a interface RPC. Existem rotas alternativas para a implantação de contratos nos quais essa complexidade é abstraída, por exemplo, usando bibliotecas criadas sobre a interface RPC, como [web3.js](https://web3js.readthedocs.io/) e [web3.py](https://github.com/ethereum/web3.py). Essas abstrações são geralmente mais fáceis de entender e menos propensas a erros, mas ainda é útil entender o que está acontecendo internamente, ou seja, sem que o usuário perceba.

Veja a seguir um contrato inteligente simples chamado `Multiply7` que será implantado usando a interface JSON-RPC em um nó Ethereum. Este tutorial pressupõe que o leitor já esteja executando um nó Geth. Mais informações sobre nós e clientes estão disponíveis [aqui](/developers/docs/nodes-and-clients/run-a-node). Consulte a documentação específica de cada [cliente](/developers/docs/nodes-and-clients/) para ver como iniciar o JSON-RPC HTTP para clientes não Geth. A maioria dos clientes atende por padrão no `localhost:8545`.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

A primeira coisa a fazer é verificar se a interface HTTP RPC está habilitada. Isso significa que fornecemos ao Geth o sinalizador `--http` na inicialização. Neste exemplo, usamos o nó Geth em uma cadeia de desenvolvimento privada. Usando essa abordagem, não precisamos de ether na rede real.

```bash
geth --http --dev console 2>>geth.log
```

Isso iniciará a interface HTTP RPC em `http://localhost:8545`.

Podemos verificar se a interface está em execução recuperando o endereço da coinbase (obtendo o primeiro endereço da matriz de contas) e o saldo usando [curl](https://curl.se). Observe que os dados nesses exemplos serão diferentes no seu nó local. Se você quiser tentar esses comandos, substitua os parâmetros de solicitação na segunda solicitação curl pelo resultado retornado da primeira.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[]", "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Como os números são codificados em hexa, o saldo é retornado em Wei como uma cadeia de caracteres hexadecimal. Se quisermos ter o saldo em ether como um número, podemos usar a Web3 do console Geth.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Agora que já temos alguns Ether em nossa cadeia de desenvolvimento privada, podemos implantar o contrato. O primeiro passo é compilar o contrato Multiply7 em byte code, que pode ser enviado para a EVM. Para instalar o solc, o compilador do Solidity, confira a [documentação do Solidity](https://docs.soliditylang.org/en/latest/installing-solidity.html). (Você pode usar uma versão do `solc` mais antiga que corresponda [à versão do compilador usada em nosso exemplo](https://github.com/ethereum/solidity/releases/tag/v0.4.20).)

O próximo passo é compilar o contrato Multiply7 em byte code, que pode ser enviado para a EVM.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Agora que temos o código compilado, precisamos determinar o quanto a sua implantação custará em gás. A interface RPC tem um método `eth_estimateGas`, que nos dará uma estimativa.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

Finalmente, implante o contrato.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

A transação é aceita pelo nó e um hash de transação é retornado. Esse hash pode ser usado para rastrear a transação. O próximo passo é determinar o endereço onde nosso contrato está implantado. Cada transação executada criará uma confirmação de recebimento. Essa confirmação de recebimento contém várias informações sobre a transação, como em qual bloco a transação foi incluída e quanto gás foi usado pela EVM. Se uma transação criar um contrato, ela também conterá o endereço do contrato. Podemos recuperar a confirmação de recebimento com o método RPC `eth_getTransactionReceipt`.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

Nosso contrato foi criado em `0x4d03d617d700cf81935d7f797f4e2ae719648262`. Um resultado nulo em vez de um recibo significa que a transação ainda não foi incluída em um bloco. Espere um momento e verifique se o termo de consentimento do cliente está ativo e tente novamente.

#### Interagindo com contratos inteligentes {#interacting-with-smart-contract}

Neste exemplo, enviaremos uma transação usando `eth_sendTransaction` para o método `multiply` do contrato.

`eth_sendTransaction` requer vários argumentos, especificamente `from`, `to` e `data`. `From` é o endereço público de nossa conta, e `to` é o endereço do contrato. O argumento `data` contém uma carga que define qual método deve ser chamado e com quais argumentos. É aqui que a [interface binária do aplicativo (ABI, na sigla em inglês)](https://docs.soliditylang.org/en/latest/abi-spec.html) entra em ação. A ABI é um arquivo JSON que estabelece como definir e codificar dados para a EVM.

Os bytes da carga definem qual método no contrato é chamado. Esses são os primeiros 4 bytes do hash Keccak sobre o nome da função e seus tipos de argumento, com codificação hexadecimal. A função multiplicar aceita um uint, que é um alias de uint256. Isso nos deixa com:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

O próximo passo é codificar os argumentos. Existe apenas um uint256, por exemplo, o valor 6. A ABI tem uma seção que especifica como codificar os tipos uint256.

`int<M>: enc(X)` é a codificação Big Endian do complemento de dois de X, preenchida no lado superior (esquerdo) com 0xff para X negativo e com zero > bytes para X positivo, de modo que o tamanho seja um múltiplo de 32 bytes.

Isso codifica em `0000000000000000000000000000000000000000000000000000000000000006`.

Combinando o seletor de função e o argumento codificado, nossos dados serão `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`.

Isso agora pode ser enviado para o nó:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Como uma transação foi enviada, um hash de transação foi retornado. A recuperação do recibo:

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

O recibo contém um log. Esse log foi gerado pela EVM na execução da transação e incluído no recibo. A função `multiply` mostra que o evento `Print` foi gerado com a entrada 7 vezes. Como o argumento do evento `Print` era um uint256, podemos decodificá-lo conforme as regras da ABI, o que nos deixará com a decimal 42 esperada. Além dos dados, vale ressaltar que os tópicos podem ser usados para determinar qual evento criou o log:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

Esta foi apenas uma breve introdução a algumas das tarefas mais comuns, demonstrando o uso direto do JSON-RPC.

## Tópicos relacionados {#related-topics}

- [Especificações do JSON-RPC](http://www.jsonrpc.org/specification)
- [ Nós e clientes](/developers/docs/nodes-and-clients/)
- [APIs JavaScript](/developers/docs/apis/javascript/)
- [APIs de back-end](/developers/docs/apis/backend/)
- [Clientes de execução](/developers/docs/nodes-and-clients/#execution-clients)
