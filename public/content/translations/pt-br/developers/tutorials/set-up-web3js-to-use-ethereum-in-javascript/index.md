---
title: Configure o web3.js para usar a Ethereum blockchain em JavaScript
description: Como usar um contrato inteligente para interagir com um token usando a linguagem Solidity
author: "jdourlens"
tags:
  - "web3.js"
  - "javascript"
skill: intermediate
lang: pt-br
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Neste tutorial, vamos ver como começar com [web3.js](https://web3js.readthedocs.io/) para interagir com a blockchain Ethereum. Web3.js podem ser usados em frontend e backends para ler dados da blockchain, fazer transações e até mesmo implantar contratos inteligentes.

O primeiro passo é incluir web3.js no seu projeto. Para usá-la em uma página da web, você pode importar a biblioteca diretamente usando um CDN como JSDeliver.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Se você preferir instalar a biblioteca para usar em seu backend ou um projeto do frontend que usa build, você pode instalá-la usando o npm:

```bash
npm install web3 --save
```

Em seguida, para importar o Web3.js em um script Node.js ou projeto front-end do Browserify, você pode usar a seguinte linha de JavaScript:

```js
const Web3 = require("web3")
```

Agora que incluímos a biblioteca no projeto, precisamos inicializá-la. Seu projeto precisa ser capaz de se comunicar com a blockchain. A maioria das bibliotecas Ethereum se comunicam com um [nó](/developers/docs/nodes-and-clients/) através de chamadas RPC. Para iniciar nosso provedor Web3, nós criaremos uma instância Web3 passando como construtor a URL do provedor. Se você tiver uma instância de um nó ou [ganache executando no seu computador](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/) será parecido com isto:

```js
const web3 = new Web3("http://localhost:8545")
```

Se você deseja acessar diretamente um nó hospedado, poderá encontrar opções em [nós como um serviço](/developers/docs/nodes-and-clients/nodes-as-a-service).

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Para testar se configuramos corretamente nossa instância Web3, tentaremos recuperar o número do último bloco usando a função `getBlockNumber`. Esta função aceita uma chamada de callback como parâmetro e retorna o número do bloco como um inteiro.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Se você executar este programa, ele simplesmente imprimirá o bloco mais recente: o topo do blockchain. Você também pode usar chamadas de função `await/async` para evitar aninhar (encadear por identação) chamadas de callback em seu código:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Você pode ver todas as funções disponíveis da instância Web3 na [documentação oficial do web3.js](https://docs.web3js.org/).

A maioria das bibliotecas Web3 são assíncronas porque em segundo plano a biblioteca faz chamadas JSON RPC para o nó que envia os resultados.

<Divider />

Se você estiver trabalhando no navegador, algumas carteiras injetam diretamente uma instância Web3, e você deveria tentar usá-la sempre que possível, especialmente se planeja interagir com o endereço Ethereum do usuário para fazer transações.

Aqui está o trecho de código para detectar se uma carteira MetaMask está disponível e tentar habilitá-la se estiver. Isso permitirá mais tarde você ler o saldo do usuário e permitir-lhe-á validar as transações que gostaria de fazer na blockchain Ethereum:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // Request account access if needed
    await window.ethereum.enable()
    // Accounts now exposed
  } catch (error) {
    // User denied account access...
  }
}
```

Alternativas para web3.js como [Ethers.js](https://docs.ethers.io/) existem e também são comumente usadas. No próximo tutorial, veremos [como escutar facilmente novos blocos recebidos na blockchain e ver o que eles contêm](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).
