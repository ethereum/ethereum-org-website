---
title: Usando WebSockets
description: Guia para usar WebSockets e Alchemy para fazer solicitações JSON-RPC e assinar eventos.
author: "Elan Halpern"
lang: pt-br
tags: ["alchemy", "websockets", "consultas", "javascript"]
skill: beginner
breadcrumb: WebSockets
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

Este é um guia de nível básico para usar WebSockets e Alchemy para fazer solicitações à blockchain Ethereum.

## WebSockets vs. HTTP {#websockets-vs-http}

Diferente do HTTP, com WebSockets, você não precisa fazer solicitações continuamente quando deseja informações específicas. Os WebSockets mantêm uma conexão de rede para você (se feito corretamente) e escutam por mudanças.

Como em qualquer conexão de rede, você não deve presumir que um WebSocket permanecerá aberto para sempre sem interrupção, mas lidar corretamente com conexões perdidas e reconexões manualmente pode ser um desafio para acertar. Outra desvantagem dos WebSockets é que você não recebe códigos de status HTTP na resposta, mas apenas a mensagem de erro.

​[Alchemy Web3](https://docs.alchemy.com/reference/api-overview) adiciona automaticamente o tratamento de falhas e novas tentativas de WebSocket sem a necessidade de configuração.

## Experimente {#try-it-out}

A maneira mais fácil de testar WebSockets é instalar uma ferramenta de linha de comando para fazer solicitações de WebSocket, como o [wscat](https://github.com/websockets/wscat). Usando o wscat, você pode enviar solicitações da seguinte forma:

_Nota: se você tiver uma conta Alchemy, poderá substituir `demo` pela sua própria chave de API (Application Programming Interface). [Inscreva-se para uma conta gratuita da Alchemy aqui!](https://auth.alchemy.com/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}
```

## Como usar WebSockets {#how-to-use-websockets}

Para começar, abra um WebSocket usando a URL do WebSocket para o seu aplicativo. Você pode encontrar a URL do WebSocket do seu aplicativo abrindo a página do aplicativo em [seu painel](https://dashboard.alchemy.com/) e clicando em "View Key". Observe que a URL do seu aplicativo para WebSockets é diferente da URL para solicitações HTTP, mas ambas podem ser encontradas clicando em "View Key".

![Where to find your WebSocket URL in your Alchemy dashboard](./use-websockets.gif)

Qualquer uma das APIs listadas na [Referência de API da Alchemy](https://www.alchemy.com/docs/reference/api-overview) pode ser usada via WebSocket. Para fazer isso, use o mesmo payload que seria enviado como o corpo de uma solicitação HTTP POST, mas, em vez disso, envie esse payload através do WebSocket.

## Com Web3 {#with-web3}

A transição para WebSockets ao usar uma biblioteca de cliente como a Web3 é simples. Basta passar a URL do WebSocket em vez da HTTP ao instanciar seu cliente Web3. Por exemplo:

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## API de Assinatura {#subscription-api}

Quando conectado através de um WebSocket, você pode usar dois métodos adicionais: `eth_subscribe` e `eth_unsubscribe`. Esses métodos permitirão que você escute eventos específicos e seja notificado imediatamente.

### `eth_subscribe` {#eth-subscribe}

Cria uma nova assinatura para eventos especificados. [Saiba mais sobre `eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe).

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

1. `alchemy_newFullPendingTransactions`

Retorna as informações da transação para todas as transações que são adicionadas ao estado pendente. Este tipo de assinatura assina transações pendentes, semelhante à chamada padrão da Web3 `web3.eth.subscribe("pendingTransactions")`, mas difere no fato de que emite _informações completas da transação_ em vez de apenas hashes de transação.

Exemplo:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["alchemy_newFullPendingTransactions"]}

<  {"id":1,"result":"0x9a52eeddc2b289f985c0e23a7d8427c8","jsonrpc":"2.0"}
<  {
      "jsonrpc":"2.0",
      "method":"eth_subscription",
      "params":{
          "result":{
          "blockHash":null,
          "blockNumber":null,
          "from":"0xa36452fc31f6f482ad823cd1cf5515177d57667f",
          "gas":"0x1adb0",
          "gasPrice":"0x7735c4d40",
          "hash":"0x50bff0736c713458c92dd1848d12f3354149be1363123dae35e94e0f2a9d56bf",
"input":"0xa9059cbb0000000000000000000000000d0707963952f2fba59dd06f2b425ace40b492fe0000000000000000000000000000000000000000000015b1111266cfca100000",
          "nonce":"0x0",
          "to":"0xea38eaa3c86c8f9b751533ba2e562deb9acded40",
          "transactionIndex":null,
          "value":"0x0",
          "v":"0x26",
          "r":"0x195c2c1ed126088e12d290aa93541677d3e3b1d10f137e11f86b1b9227f01e3b",
          "s":"0x60fc4edbf1527832a2a36dbc1e63ed6193a6eee654472fbebbf88ef1750b5344"},
          "subscription":"0x9a52eeddc2b289f985c0e23a7d8427c8"
      }
  }

```

2. `newHeads`

Emite um evento sempre que um novo cabeçalho é adicionado à cadeia, incluindo durante uma reorg da cadeia.

Quando ocorre uma reorg da cadeia, esta assinatura emitirá um evento contendo todos os novos cabeçalhos para a nova cadeia. Em particular, isso significa que você pode ver vários cabeçalhos emitidos com a mesma altura e, quando isso acontece, o cabeçalho posterior deve ser considerado o correto após uma reorg.

Exemplo:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["newHeads"]}

<  {"jsonrpc":"2.0","id":2,"result":"0x9ce59a13059e417087c02d3236a0b1cc"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "result":  {
          "extraData":  "0xd983010305844765746887676f312e342e328777696e646f7773",
          "gasLimit":  "0x47e7c4",
          "gasUsed":  "0x38658",
          "logsBloom":
"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
          "nonce":  "0x084149998194cc5f",
          "number":  "0x1348c9",
          "parentHash":  "0x7736fab79e05dc611604d22470dadad26f56fe494421b5b333de816ce1f25701",
          "receiptRoot":  "0x2fab35823ad00c7bb388595cb46652fe7886e00660a01e867824d3dceb1c8d36",
          "sha3Uncles":  "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
          "stateRoot":  "0xb3346685172db67de536d8765c43c31009d0eb3bd9c501c9be3229203f15f378",
          "timestamp":  "0x56ffeff8",
          "transactionsRoot":  "0x0167ffa60e3ebc0b080cdb95f7c0087dd6c0e61413140e39d94d3468d7c9689f"
      },
  "subscription":  "0x9ce59a13059e417087c02d3236a0b1cc"
  }
}

```

3. `logs`

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

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["logs",  {"address":  "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",  "topics":  ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"]}]}

<  {"jsonrpc":"2.0","id":2,"result":"0x4a8a4c0517381924f9838102c5a4dcb7"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "subscription":  "0x4a8a4c0517381924f9838102c5a4dcb7",
      "result":  {
          "address":  "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",
          "blockHash":  "0x61cdb2a09ab99abf791d474f20c2ea89bf8de2923a2d42bb49944c8c993cbf04",
          "blockNumber":  "0x29e87",
          "data": "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003",
          "logIndex":"0x0",
          "topics":["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"],
          "transactionHash":  "0xe044554a0a55067caafd07f8020ab9f2af60bdfe337e395ecd84b4877a3d1ab4",
          "transactionIndex":  "0x0"
      }
  }
}

```

### `eth_unsubscribe` {#eth-unsubscribe}

Cancela uma assinatura existente para que nenhum outro evento seja enviado.

Parâmetros

1. ID da assinatura, conforme retornado anteriormente de uma chamada `eth_subscribe`.

Retornos

`true` se uma assinatura foi cancelada com sucesso, ou `false` se não existia nenhuma assinatura com o ID fornecido.

Exemplo:

**Solicitação**

```
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key
-X POST
-H "Content-Type: application/json"
-d '{"id": 1, "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"]}'
```

**Resultado**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

---

[Inscreva-se na Alchemy](https://auth.alchemy.com) gratuitamente, confira [nossa documentação](https://www.alchemy.com/docs/) e, para as últimas notícias, siga-nos no [Twitter](https://x.com/AlchemyPlatform).