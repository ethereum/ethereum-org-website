---
title: Configure o web3.js para usar a blockchain da Ethereum em JavaScript
description: Aprenda como instalar e configurar a biblioteca web3.js para interagir com a blockchain da Ethereum a partir de aplicações JavaScript.
author: "jdourlens"
tags: [ "web3.js", "javascript" ]
skill: beginner
lang: pt-br
published: 11/04/2020
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Neste tutorial, veremos como começar a usar o [web3.js](https://web3js.readthedocs.io/) para interagir com a blockchain da Ethereum. O Web3.js pode ser usado tanto em front-ends quanto em back-ends para ler dados da blockchain, realizar transações e até mesmo implantar contratos inteligentes.

O primeiro passo é incluir o web3.js em seu projeto. Para usá-la em uma página da web, você pode importar a biblioteca diretamente usando um CDN como o JSDeliver.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Se preferir instalar a biblioteca para usar no seu back-end ou em um projeto de front-end que use um processo de build, você pode instalá-la usando o npm:

```bash
npm install web3 --save
```

Em seguida, para importar o Web3.js em um script Node.js ou projeto de front-end do Browserify, você pode usar a seguinte linha de JavaScript:

```js
const Web3 = require("web3")
```

Agora que incluímos a biblioteca no projeto, precisamos inicializá-la. Seu projeto precisa ser capaz de se comunicar com a blockchain. A maioria das bibliotecas Ethereum se comunica com um [nó](/developers/docs/nodes-and-clients/) por meio de chamadas RPC. Para iniciar nosso provedor Web3, vamos instanciar o Web3 passando a URL do provedor para o construtor. Se você tiver um nó ou uma [instância do ganache em execução em seu computador](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/), o código será parecido com este:

```js
const web3 = new Web3("http://localhost:8545")
```

Se quiser acessar diretamente um nó hospedado, você pode encontrar opções em [nós como serviço](/developers/docs/nodes-and-clients/nodes-as-a-service).

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Para testar se configuramos nossa instância do Web3 corretamente, vamos tentar recuperar o número do bloco mais recente usando a função `getBlockNumber`. Essa função aceita um callback como parâmetro e retorna o número do bloco como um inteiro.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Se você executar este programa, ele simplesmente imprimirá o número do bloco mais recente: o topo da blockchain. Você também pode usar chamadas de função `async/await` para evitar o aninhamento de callbacks em seu código:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Você pode ver todas as funções disponíveis na instância do Web3 na [documentação oficial do web3.js](https://docs.web3js.org/).

A maioria das bibliotecas Web3 é assíncrona porque, em segundo plano, a biblioteca faz chamadas JSON-RPC para o nó, que envia o resultado de volta.

<Divider />

Se você estiver trabalhando no navegador, algumas carteiras injetam diretamente uma instância do Web3, e você deve tentar usá-la sempre que possível, especialmente se planeja interagir com o endereço Ethereum do usuário para realizar transações.

Aqui está o trecho de código para detectar se uma carteira MetaMask está disponível e tentar habilitá-la, se for o caso. Isso permitirá que você leia o saldo do usuário e que ele valide as transações que você deseja que ele realize na blockchain da Ethereum:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // Solicita acesso à conta, se necessário
    await window.ethereum.enable()
    // Contas agora expostas
  } catch (error) {
    // O usuário negou o acesso à conta...
  }
}
```

Existem alternativas ao web3.js, como o [Ethers.js](https://docs.ethers.io/), que também são comumente usadas. No próximo tutorial, veremos [como escutar facilmente os novos blocos que chegam na blockchain e ver o que eles contêm](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).
