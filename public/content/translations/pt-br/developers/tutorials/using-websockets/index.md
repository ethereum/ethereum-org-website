---
title: Usando WebSockets
description: Guia para usar WebSockets e Alchemy para fazer solicitações JSON-RPC e escutar eventos.
author: "Elan Halpern"
lang: pt-br
tags:
  - "alchemy"
  - "websocket"
  - "consultando"
  - "javascript"
skill: intermediate
source: Docs Alchemy
sourceUrl: https://docs.alchemyapi.io/guides/using-websockets
published: 2020-12-01
---

Este é um guia de nível de entrada para usar WebSockets e Alchemy para fazer solicitações para a blockchain Ethereum.

## WebSockets vs. HTTP {#websockets-vs-http}

Ao contrário da HTTP, com WebSockets, você não precisa continuamente fazer solicitações quando quiser informações específicas. WebSockets mantêm uma conexão de rede para você (se for feito corretamente) e ouvem por mudanças.

Como em qualquer conexão de rede, você não deve assumir que um WebSocket permanecerá aberto para sempre sem interrupção, mas o processamento correto de conexões descartadas e reconexão à mão podem ser desafiadores pra acertar. Outro lado negativo dos WebSockets é que você não obtém códigos de status HTTP na resposta, mas apenas a mensagem de erro.

£[Alquimia Web3](https://docs.alchemy.com/reference/api-overview) adiciona automaticamente manipulação em falhas de WebSocket e obtém sem a configuração necessária.

## Experimente {#try-it-out}

A maneira mais fácil de testar WebSockets é instalar uma ferramenta de linha de comando para fazer solicitações de WebSocket como [wscat](https://github.com/websockets/wscat). Usando o wscat, você pode enviar solicitações da seguinte forma:

_Nota: se você tem uma conta da Alchemy, você pode substituir `demo` com sua própria chave de API. [Cadastre-se para uma conta de Alquimia gratuita aqui!](https://auth.alchemyapi.io/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}

```

## Como usar WebSockets {#how-to-use-websockets}

Para começar, abra um WebSocket usando a URL de WebSocket para seu aplicativo. Você pode encontrar a URL de WebSocket do seu aplicativo abrindo a página do aplicativo no [seu painel](https://dashboard.alchemyapi.io/) e clicando em "Visualizar chave". Note que a URL do seu aplicativo para WebSockets é diferente da URL para solicitações HTTP, mas ambos podem ser encontrados clicando em "Ver Chave".

![Onde encontrar a sua URL de WebSocket no seu painel Alchemy](./use-websockets.gif)

Qualquer uma das APIs listadas na [Referência API do Alquimia](https://docs.alchemyapi.io/documentation/alchemy-api-reference/) pode ser usada via WebSocket. Para fazer isso, use o mesmo payload que seria enviado como corpo de uma solicitação HTTP POST, mas ao invés disso, envie esse payload através do WebSocket.

## Com Web3 {#with-web3}

A transição para WebSockets enquanto se usa uma biblioteca de clientes como a Web3 é simples. Simplesmente passe a URL de WebSocket em vez da URL HTTP ao instanciar seu cliente Web3. Por exemplo:

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## Assinatura {#subscription-api}

Quando conectado através de um WebSocket, você pode usar dois métodos adicionais: `eth_subscribe` e `eth_unsubscribe`. Esses métodos permitirão que você ouça eventos específicos e seja notificado imediatamente.

### `eth_subscribe` {#eth-subscribe}

Cria uma nova assinatura para eventos específicos. [Saiba mais sobre `eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe).

#### Parâmetros {#parameters}

1. Tipos de assinatura
2. Parâmetros opcionais

O primeiro argumento especifica o tipo de evento para o qual ouvir. O segundo argumento contém opções adicionais que dependem do primeiro argumento. Os diferentes tipos de descrição, suas opções e suas cargas de evento são descritos abaixo.

#### Retorna {#returns}

O ID de subscrição: Este ID será anexado a qualquer evento recebido, e também pode ser usado para cancelar a assinatura usando `eth_unsubscribe`.

#### Eventos de assinatura {#subscription-events}

Enquanto a assinatura estiver ativa, você receberá eventos que são objetos com os seguintes campos:

- `jsonrpc`: Sempre "2.0"
- `método`: Sempre "eth_subscription"
- `params`: Um objeto com os seguintes campos:
  - `subscription`: O ID de assinatura retornado pela chamada `eth_subscription` que criou essa assinatura.
  - `resultado`: Um objeto cujo conteúdo varia dependendo do tipo de assinatura.

#### Tipos de assinatura {#subscription-types}

1. `alchemy_newFullPendingTransactions`

Retorna as informações de transação para todas as transações que são adicionadas ao estado pendente. Este tipo de assinatura se inscreve em transações pendentes, similar à chamada Web3 padrão `web3.eth. ubscribe("pendingTransações")`, mas difere do que emite _informações completas de transação_ ao invés de apenas hashes de transação.

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

Emite um evento a qualquer momento que um novo cabeçalho seja adicionado à cadeia, incluindo durante uma reorganização em cadeia.

Quando ocorre uma reorganização da cadeia, esta assinatura emitirá um evento contendo todos os novos cabeçalhos da nova cadeia. Em particular, isso significa que você pode ver vários cabeçalhos emitidos com a mesma altura, e quando isso acontecer, o cabeçalho mais recente deve ser tomado como o correto após uma reorganização.

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

Emite logs que fazem parte dos blocos recém-adicionados que correspondem aos critérios de filtro especificado.

Quando ocorre uma reorganização da cadeia, logs que fazem parte dos blocos da cadeia antiga serão emitidos novamente com a propriedade `removido` definido como `verdadeiro`. Além disso, são emitidos registros que fazem parte dos blocos da nova cadeia, significando que é possível ver logs para a mesma transação várias vezes no caso de uma reorganização.

Parâmetros

1. Um objeto com os seguintes campos:
   - `endereço` (opcional): ou uma string representanda por um endereço, ou um array de tais strings.
     - Somente logs criados a partir de um desses endereços serão emitidos.
   - `Tópicos`: um array de especificadores de tópicos.
     - Cada especialista de tópico é `null` uma string que representa um tópico, ou uma matriz de strings.
     - Cada posição no array que não é `nulo` restringe os logs emitidos para apenas aqueles que têm um dos tópicos indicados nessa posição.

Alguns exemplos de especificações de tópico:

- `[]`: Qualquer tópico permitido.
- `[A]`: A na primeira posição (e qualquer coisa depois).
- `[null, B]`: Qualquer coisa na primeira posição e B na segunda posição (e qualquer coisa depois).
- `[null, B]`: Qualquer coisa na primeira posição e B na segunda posição (e qualquer coisa depois).
- .`[[A, B], [A, B]]`: (A or B) na primeira posição e (A or B) na segunda posição (e nada depois).

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

Cancela uma assinatura existente para que não sejam enviados mais eventos.

Parâmetros

1. Inscrição ID, como retornado anteriormente de uma chamada de `eth_subscribe`.

Retornos

`true` se uma assinatura foi cancelada com sucesso, ou `false` se não existir nenhuma assinatura com o ID fornecido.

Exemplo:

**Requisição**

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

[Cadastre-se com o Alchemy](https://auth.alchemyapi.io/signup) gratuitamente, confira [a nossa documentação](https://docs.alchemyapi.io/), e para receber as últimas notícias, siga-nos no [Twitter](https://twitter.com/AlchemyPlatform).
