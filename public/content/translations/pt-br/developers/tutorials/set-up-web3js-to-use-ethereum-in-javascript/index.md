---
title: Configurar o web3.js para usar a blockchain Ethereum em JavaScript
description: Aprenda a configurar a biblioteca web3.js para interagir com a blockchain Ethereum a partir de aplicativos JavaScript.
author: "jdourlens"
tags: ["web3.js", "javascript"]
skill: beginner
breadcrumb: Configuração do web3.js
lang: pt-br
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Neste tutorial, veremos como começar a usar o [web3.js](https://web3js.readthedocs.io/) para interagir com a blockchain Ethereum. O Web3.js pode ser usado tanto em frontends quanto em backends para ler dados da blockchain ou fazer transações e até mesmo implantar contratos inteligentes.

O primeiro passo é incluir o web3.js no seu projeto. Para usá-lo em uma página da web, você pode importar a biblioteca diretamente usando uma CDN como o JSDeliver.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Se você preferir instalar a biblioteca para usar no seu backend ou em um projeto frontend que usa build, você pode instalá-la usando o npm:

```bash
npm install web3 --save
```

Em seguida, para importar o Web3.js em um script Node.js ou projeto frontend Browserify, você pode usar a seguinte linha de JavaScript:

```js
const Web3 = require("web3")
```

Agora que incluímos a biblioteca no projeto, precisamos inicializá-la. Seu projeto precisa ser capaz de se comunicar com a blockchain. A maioria das bibliotecas Ethereum se comunica com um [nó](/developers/docs/nodes-and-clients/) por meio de chamadas RPC. Para iniciar nosso provedor Web3, instanciaremos uma instância Web3 passando como construtor a URL do provedor. Se você tiver um nó ou uma [instância do ganache rodando no seu computador](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/), ficará assim:

```js
const web3 = new Web3("http://localhost:8545")
```

Se você quiser acessar diretamente um nó hospedado, pode encontrar opções em [nós como serviço](/developers/docs/nodes-and-clients/nodes-as-a-service).

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Para testar se configuramos corretamente nossa instância Web3, tentaremos recuperar o número do último bloco usando a função `getBlockNumber`. Esta função aceita um callback como parâmetro e retorna o número do bloco como um número inteiro.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Se você executar este programa, ele simplesmente imprimirá o número do último bloco: o topo da blockchain. Você também pode usar chamadas de função `await/async` para evitar o aninhamento de callbacks no seu código:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Você pode ver todas as funções disponíveis na instância Web3 na [documentação oficial do web3.js](https://docs.web3js.org/).

A maioria das bibliotecas Web3 é assíncrona porque, em segundo plano, a biblioteca faz chamadas JSON-RPC para o nó, que envia de volta o resultado.

<Divider />

Se você estiver trabalhando no navegador, algumas carteiras injetam diretamente uma instância Web3 e você deve tentar usá-la sempre que possível, especialmente se planeja interagir com o endereço Ethereum do usuário para fazer transações.

Aqui está o trecho para detectar se uma carteira MetaMask está disponível e tentar ativá-la, se estiver. Mais tarde, isso permitirá que você leia o saldo do usuário e permita que ele valide as transações que você gostaria que ele fizesse na blockchain Ethereum:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // Solicitar acesso à conta se necessário
    await window.ethereum.enable()
    // Contas agora expostas
  } catch (error) {
    // Usuário negou acesso à conta...
  }
}
```

Existem alternativas ao web3.js, como o [Ethers.js](https://docs.ethers.io/), que também são comumente usadas. No próximo tutorial, veremos [como ouvir facilmente novos blocos recebidos na blockchain e ver o que eles contêm](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).