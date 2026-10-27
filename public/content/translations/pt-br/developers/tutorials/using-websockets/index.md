---
title: Usando WebSockets
description: "Guia para usar WebSockets para fazer solicitações JSON-RPC e assinar eventos, com qualquer provedor de nó do Ethereum."
author: "Elan Halpern"
lang: pt-br
tags: ["Alchemy", "websockets", "consultas", "JavaScript"]
skill: beginner
breadcrumb: WebSockets
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

Este é um guia de nível básico para usar WebSockets para fazer solicitações à blockchain do Ethereum. Os exemplos usam métodos JSON-RPC padrão, portanto, funcionam com qualquer nó ou provedor de nó que ofereça um endpoint WebSocket, incluindo o Alchemy.

## WebSockets vs. HTTP {#websockets-vs-http}

Diferente do HTTP, com WebSockets, você não precisa fazer solicitações continuamente quando deseja informações específicas. Os WebSockets mantêm uma conexão de rede para você (se feito corretamente) e escutam por alterações.

Como em qualquer conexão de rede, você não deve presumir que um WebSocket permanecerá aberto para sempre sem interrupção, mas lidar corretamente com conexões perdidas e reconexões manualmente pode ser um desafio para acertar. Outra desvantagem dos WebSockets é que você não obtém códigos de status HTTP na resposta, mas apenas a mensagem de erro.

As bibliotecas de cliente podem lidar com isso para você. Por exemplo, o [transporte WebSocket do Viem](https://viem.sh/docs/clients/transports/websocket) se reconecta em caso de falha no soquete e envia pings de keep-alive por padrão.

## Experimente {#try-it-out}

Você precisa de uma URL de WebSocket para um nó do Ethereum. Os provedores de nó fornecem uma quando você cria uma chave de Interface de Programação de Aplicações (API), geralmente no formato `wss://<provider-host>/<your-api-key>`. Por exemplo, uma URL da Rede Principal do Ethereum no Alchemy se parece com `wss://eth-mainnet.g.alchemy.com/v2/<your-api-key>` ([inscreva-se para uma conta gratuita no Alchemy](https://auth.alchemy.com/signup)). Consulte [nós como serviço](/developers/docs/nodes-and-clients/nodes-as-a-service/) para outros provedores, ou use o endpoint WebSocket do [seu próprio nó](/developers/docs/nodes-and-clients/run-a-node/). Endpoints públicos como `wss://ethereum-rpc.publicnode.com` também funcionam para experimentos rápidos, mas eles têm limite de taxa e podem não suportar todos os tipos de assinatura.

A maneira mais fácil de testar WebSockets é instalar uma ferramenta de linha de comando para fazer solicitações WebSocket, como o [wscat](https://github.com/websockets/wscat). Usando o wscat, você pode enviar solicitações da seguinte forma:

```sh
npx wscat -c wss://<provider-host>/<your-api-key>

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}

< {"jsonrpc": "2.0", "result": "0x41f9de2", "id": 0}
```

As linhas que começam com `>` são o que você digita, e as linhas que começam com `<` são o que o nó envia de volta.

## Como usar WebSockets {#how-to-use-websockets}

Para começar, abra um WebSocket usando a URL de WebSocket do seu provedor. Com o Alchemy, você pode encontrá-la abrindo seu aplicativo no [painel](https://dashboard.alchemy.com/) e visualizando sua chave de Interface de Programação de Aplicações (API). Observe que a URL para WebSockets (`wss://`) é diferente da URL para solicitações HTTP (`https://`), embora a maioria dos provedores use a mesma chave de API para ambos.

![Onde encontrar sua URL de WebSocket no seu painel do Alchemy](./use-websockets.mp4#602x280)

Qualquer um dos [métodos JSON-RPC](/developers/docs/apis/json-rpc/) que seu provedor suporta pode ser usado via WebSocket. Para fazer isso, use o mesmo payload que seria enviado como o corpo de uma solicitação HTTP POST, mas, em vez disso, envie esse payload através do WebSocket.

## Com a Web3 {#with-web3}

A transição para WebSockets ao usar uma biblioteca de cliente como o [Viem](https://viem.sh/) é simples. Use o transporte `webSocket` com sua URL de WebSocket em vez do transporte `http`. Por exemplo, após `npm install viem`, salve isso como `index.mjs` e execute `node index.mjs`:

```js
import { createPublicClient, webSocket } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket("wss://<provider-host>/<your-api-key>"),
})

console.log(await client.getBlockNumber()) // -> 26243602n

// Inscreva-se em novos blocos pelo mesmo WebSocket
const unwatch = client.watchBlocks({
  onBlock: (block) => {
    console.log(block.number, block.hash)
    unwatch()
    process.exit(0)
  },
})
```

## API de Assinatura {#subscription-api}

Quando conectado através de um WebSocket, você pode usar dois métodos adicionais: `eth_subscribe` e `eth_unsubscribe`. Esses métodos permitirão que você escute eventos específicos e seja notificado imediatamente.

### `eth_subscribe` {#eth-subscribe}

Cria uma nova assinatura para eventos especificados. [Saiba mais sobre `eth_subscribe`](https://geth.ethereum.org/docs/interacting-with-geth/rpc/pubsub).

#### Parâmetros {#parameters}

1. Tipos de assinatura
2. Parâmetros opcionais

O primeiro argumento especifica o tipo de evento a ser escutado. O segundo argumento contém opções adicionais que dependem do primeiro argumento. Os diferentes tipos de descrição, suas opções e seus payloads de eventos são descritos abaixo.

#### Retornos {#returns}

O ID da assinatura: Este ID será anexado a quaisquer eventos recebidos e também pode ser usado para cancelar a assinatura usando `eth_unsubscribe`.

#### Eventos de assinatura {#subscription-events}

Enquanto a assinatura estiver ativa, você receberá eventos que são objetos com os seguintes campos:

- `jsonrpc`: Sempre "2.0"
- `method`: Sempre "eth_subscription"
- `params`: Um objeto com os seguintes campos:
  - `subscription`: O ID da assinatura retornado pela chamada `eth_subscribe` que criou esta assinatura.
  - `result`: Um objeto cujo conteúdo varia dependendo do tipo de assinatura.

#### Tipos de assinatura {#subscription-types}

1. `newHeads`

Emite um evento sempre que um novo cabeçalho é adicionado à cadeia, inclusive durante uma reorg da cadeia.

Quando ocorre uma reorg da cadeia, esta assinatura emitirá um evento contendo todos os novos cabeçalhos para a nova cadeia. Em particular, isso significa que você pode ver vários cabeçalhos emitidos com a mesma altura e, quando isso acontece, o cabeçalho posterior deve ser considerado o correto após uma reorg.

Exemplo:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newHeads"]}

< {"jsonrpc":"2.0","result":"0xe0d4abf5caf333fbf94c5f02182e6469","id":1}
< {
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "baseFeePerGas": "0x41f9de2",
      "blobGasUsed": "0xc0000",
      "difficulty": "0x0",
      "excessBlobGas": "0xa88af38",
      "extraData": "0xe29ca82051756173617220287175617361722e77696e2920e29ca8",
      "gasLimit": "0x3938700",
      "gasUsed": "0x1a17224",
      "hash": "0xedc43a71b7ff13880bdbe7b748a225b91a11a91e79173fe28011363c10acaea5",
      "logsBloom": "0x4beaef4e7dbb1bfdb3df673fab6cdf1cf9fc0e7f743d672c761551767b7dad953d79cf86e56e6195ae1b57dff20a0fd46e57c545af166ff49394df3839e269a6ff877b6baf9d899fd9666c58b7dfa7add4febf78b466e7f71af2dcbad53fdcfa3f7277d2fbfffcff953f9ef37b3af8fffb296a3adb94dc463ff0d6d5173f1beda0fd662d77eaedb34ff99f3eeed38a77e7d0cd63e917d4efbdfcb7d0d19437f98ff60773d0effbfbdfdbef9ebbf6a2c35efedd677a795d3ccd777e127eeb657f6a8dffaf64f3b8d998b516c78e661ef77fded57fb66d687fab17739b3ef5aa2765777d8cce0ef59a9ceebeceabbb7f76ed7fc65df7e8bccf7938eb3fb7de57f7",
      "miner": "0x396343362be2a4da1ce0c1c210945346fb82aa49",
      "mixHash": "0xa72c9201f502df607d0d7551ccc171ce37a5146747f04c6c495b0aebecb045c7",
      "nonce": "0x0000000000000000",
      "number": "0x1907212",
      "parentBeaconBlockRoot": "0x34f3f289459913dd80ec9c20aa535866cd2bd310ac26e47570601e263d593735",
      "parentHash": "0xe62c150ffbbd04e95343f945b70fa53756aba6c0bf96c0440d1ae354fa007a7c",
      "receiptsRoot": "0x94951d882544da76e30b145b26a39b126e8acfba9db929351b84b2f4c847e3ed",
      "requestsHash": "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size": "0x1f4bc",
      "stateRoot": "0x12771ea73858277034cf6604aee0abbf889c15091ab8ef9be81bf7258458a036",
      "timestamp": "0x6ad92b47",
      "transactionsRoot": "0xbd58ebe5c8c5519e458266a7db3ad049a7bffa106dc9a14f2fe6edb3f8ad5d70",
      "withdrawalsRoot": "0x56a083b6140663c9e98c30167ee90a1ffb157505ba89cb584583b71cba100d2a"
    },
    "subscription": "0xe0d4abf5caf333fbf94c5f02182e6469"
  }
}
```

2. `logs`

Emite logs que fazem parte de blocos recém-adicionados que correspondem aos critérios de filtro especificados.

Quando ocorre uma reorg da cadeia, os logs que fazem parte dos blocos na cadeia antiga serão emitidos novamente com a propriedade `removed` definida como `true`. Além disso, os logs que fazem parte dos blocos na nova cadeia são emitidos, o que significa que é possível ver logs para a mesma transação várias vezes no caso de uma reorg.

Parâmetros

1. Um objeto com os seguintes campos:
   - `address` (opcional): uma string representando um endereço ou um array dessas strings.
     - Apenas logs criados a partir de um desses endereços serão emitidos.
   - `topics`: um array de especificadores de tópico.
     - Cada especificador de tópico é `null`, uma string representando um tópico ou um array de strings.
     - Cada posição no array que não é `null` restringe os logs emitidos apenas àqueles que têm um dos tópicos fornecidos nessa posição.

Alguns exemplos de especificações de tópicos:

- `[]`: Quaisquer tópicos permitidos.
- `[A]`: A na primeira posição (e qualquer coisa depois).
- `[null, B]`: Qualquer coisa na primeira posição e B na segunda posição (e qualquer coisa depois).
- `[A, B]`: A na primeira posição e B na segunda posição (e qualquer coisa depois).
- `[[A, B], [A, B]]`: (A ou B) na primeira posição e (A ou B) na segunda posição (e qualquer coisa depois).

Exemplo:

Este exemplo escuta eventos `Deposit` do [contrato de ether empacotado (WETH)](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) na Rede Principal do Ethereum:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["logs", {"address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "topics": ["0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c"]}]}

< {"jsonrpc":"2.0","result":"0x69a0e61ae8e3d61a93479858e8f1b43a","id":1}
< {
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "blockHash": "0x168e06e5733df993078bb635cb9925f80ff39d12a36bd301052c44d7bf6b6068",
      "blockNumber": "0x190720e",
      "blockTimestamp": "0x6ad92b17",
      "data": "0x000000000000000000000000000000000000000000000000039ed0c3d7848a1c",
      "logIndex": "0x11",
      "removed": false,
      "topics": [
        "0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c",
        "0x00000000000000000000000023617e59a5925b2a4bf75d73ff6711cd0b29de85"
      ],
      "transactionHash": "0xc956e7012c2af8ff87db88e059336842ee872bfc93de1eac9760510d0bd801be",
      "transactionIndex": "0xb"
    },
    "subscription": "0x69a0e61ae8e3d61a93479858e8f1b43a"
  }
}
```

3. `newPendingTransactions`

Emite o hash de cada transação que é adicionada ao estado pendente do nó (sua mempool).

Exemplo:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}

< {"jsonrpc":"2.0","result":"0x1c2365b029179adf1e84b9e327315249","id":1}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"result":"0x4a62d0ad7c8868fbbfa10604e68638e637c6fc6f64fd1fb4ca042dcd0158c992","subscription":"0x1c2365b029179adf1e84b9e327315249"}}
```

Alguns provedores também oferecem seus próprios tipos de assinatura. Por exemplo, o [`alchemy_pendingTransactions`](https://www.alchemy.com/docs/reference/alchemy-pendingtransactions) do Alchemy emite _objetos de transação completos_ em vez de apenas hashes, e aceita filtros opcionais `fromAddress`, `toAddress` e `hashesOnly`. Estes não fazem parte da Interface de Programação de Aplicações (API) JSON-RPC padrão, portanto, funcionam apenas com esse provedor.

### `eth_unsubscribe` {#eth-unsubscribe}

Cancela uma assinatura existente para que nenhum outro evento seja enviado.

Parâmetros

1. ID da assinatura, conforme retornado anteriormente de uma chamada `eth_subscribe`.

Retornos

`true` se uma assinatura foi cancelada com sucesso, ou `false` se nenhuma assinatura existia com o ID fornecido.

Uma assinatura só existe na conexão WebSocket que a criou, portanto, `eth_unsubscribe` deve ser enviado por essa mesma conexão. Não pode ser enviado como uma solicitação HTTP separada. Fechar a conexão também cancela todas as suas assinaturas.

Exemplo:

```json
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["0xe0d4abf5caf333fbf94c5f02182e6469"]}

< {"jsonrpc":"2.0","result":true,"id":2}
```

---

[Inscreva-se no Alchemy](https://auth.alchemy.com) gratuitamente, confira a [documentação do Alchemy](https://www.alchemy.com/docs/) e, para as últimas notícias, siga o Alchemy no [Twitter](https://x.com/Alchemy).
