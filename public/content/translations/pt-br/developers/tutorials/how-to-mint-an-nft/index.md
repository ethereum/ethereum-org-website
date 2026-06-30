---
title: "Como cunhar um NFT (Parte 2/3 da série de tutoriais sobre NFT)"
description: Este tutorial descreve como cunhar um NFT na blockchain Ethereum usando nosso contrato inteligente e a Web3.
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "contratos inteligentes"]
skill: beginner
breadcrumb: Cunhar um NFT
lang: pt-br
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): US$ 69 milhões
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): US$ 11 milhões
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): US$ 6 milhões

Todos eles cunharam seus NFTs usando a poderosa API da Alchemy. Neste tutorial, ensinaremos como fazer o mesmo em \<10 minutos.

“Cunhar um NFT” é o ato de publicar uma instância única do seu token ERC-721 na blockchain. Usando nosso contrato inteligente da [Parte 1 desta série de tutoriais sobre NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), vamos exercitar nossas habilidades em Web3 e cunhar um NFT. Ao final deste tutorial, você será capaz de cunhar quantos NFTs seu coração (e carteira) desejar!

Vamos começar!

## Passo 1: Instalar a Web3 {#install-web3}

Se você acompanhou o primeiro tutorial sobre como criar seu contrato inteligente de NFT, já tem experiência com o Ethers.js. A Web3 é semelhante ao Ethers, pois é uma biblioteca usada para facilitar a criação de solicitações para a blockchain [Ethereum](/). Neste tutorial, usaremos a [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), que é uma biblioteca Web3 aprimorada que oferece novas tentativas automáticas e suporte robusto a WebSocket.

No diretório inicial do seu projeto, execute:

```
npm install @alch/alchemy-web3
```

## Passo 2: Criar um arquivo `mint-nft.js` {#create-mintnftjs}

Dentro do seu diretório de scripts, crie um arquivo `mint-nft.js` e adicione as seguintes linhas de código:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Passo 3: Obter a ABI do seu contrato {#contract-abi}

A ABI (Interface Binária de Aplicação) do nosso contrato é a interface para interagir com o nosso contrato inteligente. Você pode aprender mais sobre [ABIs de contrato](/glossary/#abi). O Hardhat gera automaticamente uma ABI para nós e a salva no arquivo `MyNFT.json`. Para usar isso, precisaremos extrair o conteúdo adicionando as seguintes linhas de código ao nosso arquivo `mint-nft.js`:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Se você quiser ver a ABI, pode imprimi-la no seu console:

```js
console.log(JSON.stringify(contract.abi))
```

Para executar o `mint-nft.js` e ver sua ABI impressa no console, navegue até o seu terminal e execute:

```js
node scripts/mint-nft.js
```
## Passo 4: Configurar os metadados do seu NFT usando IPFS {#config-meta}

Se você se lembra do nosso tutorial na Parte 1, a função do nosso contrato inteligente `mintNFT` recebe um parâmetro tokenURI que deve ser resolvido para um documento JSON descrevendo os metadados do NFT — que é realmente o que dá vida ao NFT, permitindo que ele tenha propriedades configuráveis, como nome, descrição, imagem e outros atributos.

> _O Interplanetary File System (IPFS) é um protocolo descentralizado e uma rede ponto a ponto para armazenar e compartilhar dados em um sistema de arquivos distribuído._

Usaremos o Pinata, uma API e kit de ferramentas IPFS conveniente, para armazenar nosso ativo NFT e metadados para garantir que nosso NFT seja verdadeiramente descentralizado. Se você não tem uma conta no Pinata, inscreva-se para uma conta gratuita [aqui](https://app.pinata.cloud) e conclua os passos para verificar seu e-mail.

Depois de criar uma conta:

- Navegue até a página “Files” (Arquivos) e clique no botão azul "Upload" no canto superior esquerdo da página.

- Faça o upload de uma imagem para o Pinata — este será o ativo de imagem para o seu NFT. Sinta-se à vontade para nomear o ativo como desejar.

- Após o upload, você verá as informações do arquivo na tabela na página "Files". Você também verá uma coluna CID. Você pode copiar o CID clicando no botão de copiar ao lado dele. Você pode visualizar seu upload em: `https://gateway.pinata.cloud/ipfs/<CID>`. Você pode encontrar a imagem que usamos no IPFS [aqui](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5), por exemplo.

Para os aprendizes mais visuais, os passos acima estão resumidos aqui:

![How to upload your image to Pinata](./instructionsPinata.gif)

Agora, vamos querer fazer o upload de mais um documento para o Pinata. Mas antes de fazermos isso, precisamos criá-lo!

No seu diretório raiz, crie um novo arquivo chamado `nft-metadata.json` e adicione o seguinte código json:

```json
{
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Eye color",
      "value": "Mocha"
    }
  ],
  "description": "The world's most adorable and sensitive pup.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

Sinta-se à vontade para alterar os dados no json. Você pode remover ou adicionar à seção de atributos. O mais importante é certificar-se de que o campo de imagem aponte para o local da sua imagem no IPFS — caso contrário, seu NFT incluirá uma foto de um cachorro (muito fofo!).

Quando terminar de editar o arquivo JSON, salve-o e faça o upload para o Pinata, seguindo os mesmos passos que fizemos para o upload da imagem.

![How to upload your nft-metadata.json to Pinata](./uploadPinata.gif)

## Passo 5: Criar uma instância do seu contrato {#instance-contract}

Agora, para interagir com nosso contrato, precisamos criar uma instância dele em nosso código. Para fazer isso, precisaremos do endereço do nosso contrato, que podemos obter da implantação ou do [Blockscout](https://eth-sepolia.blockscout.com/) pesquisando o endereço que você usou para implantar o contrato.

![View your contract address on Etherscan](./view-contract-etherscan.png)

No exemplo acima, o endereço do nosso contrato é 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Em seguida, usaremos o [método de contrato](https://docs.web3js.org/api/web3-eth-contract/class/Contract) da Web3 para criar nosso contrato usando a ABI e o endereço. No seu arquivo `mint-nft.js`, adicione o seguinte:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Passo 6: Atualizar o arquivo `.env` {#update-env}

Agora, para criar e enviar transações para a cadeia Ethereum, usaremos o endereço público da sua conta Ethereum para obter o nonce da conta (explicaremos abaixo).

Adicione sua chave pública ao seu arquivo `.env` — se você concluiu a parte 1 do tutorial, nosso arquivo `.env` agora deve ficar assim:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Passo 7: Criar sua transação {#create-txn}

Primeiro, vamos definir uma função chamada `mintNFT(tokenData)` e criar nossa transação fazendo o seguinte:

1. Pegue sua _PRIVATE_KEY_ e _PUBLIC_KEY_ do arquivo `.env`.

1. Em seguida, precisaremos descobrir o nonce da conta. A especificação do nonce é usada para acompanhar o número de transações enviadas do seu endereço — o que precisamos por motivos de segurança e para evitar ataques de repetição. Para obter o número de transações enviadas do seu endereço, usamos [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count).

1. Finalmente, configuraremos nossa transação com as seguintes informações:

- `'from': PUBLIC_KEY` — A origem da nossa transação é o nosso endereço público

- `'to': contractAddress` — O contrato com o qual desejamos interagir e enviar a transação

- `'nonce': nonce` — O nonce da conta com o número de transações enviadas do nosso endereço

- `'gas': estimatedGas` — O gás estimado necessário para concluir a transação

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — O cálculo que desejamos realizar nesta transação — que neste caso é cunhar um NFT

Seu arquivo `mint-nft.js` deve ficar assim agora:

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //obter o último nonce

   //a transação
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```
## Passo 8: Assinar a transação {#sign-txn}

Agora que criamos nossa transação, precisamos assiná-la para enviá-la. É aqui que usaremos nossa chave privada.

`web3.eth.sendSignedTransaction` nos dará o hash da transação, que podemos usar para garantir que nossa transação foi minerada e não foi descartada pela rede. Você notará que na seção de assinatura da transação, adicionamos algumas verificações de erro para sabermos se nossa transação foi concluída com sucesso.

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //obter o último nonce

  //a transação
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}
```

## Passo 9: Chamar `mintNFT` e executar node `mint-nft.js` {#call-mintnft-fn}

Lembra do `metadata.json` que você fez upload para o Pinata? Obtenha seu código hash do Pinata e passe o seguinte como parâmetro para a função `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Veja como obter o código hash:

![How to get your nft metadata hashcode on Pinata](./metadataPinata.gif)_Como obter o código hash dos metadados do seu nft no Pinata_

> Verifique novamente se o código hash que você copiou vincula ao seu **metadata.json** carregando `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` em uma janela separada. A página deve ser semelhante à captura de tela abaixo:

![Your page should display the json metadata](./metadataJSON.png)_Sua página deve exibir os metadados json_

No geral, seu código deve ficar parecido com isto:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //obter o último nonce

  //a transação
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Agora, execute `node scripts/mint-nft.js` para implantar seu NFT. Após alguns segundos, você deverá ver uma resposta como esta no seu terminal:

    The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Check Alchemy's Mempool to view the status of your transaction!

Em seguida, visite sua [mempool da Alchemy](https://dashboard.alchemy.com/mempool) para ver o status da sua transação (se está pendente, minerada ou foi descartada pela rede). Se sua transação foi descartada, também é útil verificar o [Blockscout](https://eth-sepolia.blockscout.com/) e pesquisar pelo hash da transação.

![View your NFT transaction hash on Etherscan](./view-nft-etherscan.png)_Visualize o hash da transação do seu NFT no Etherscan_

E é isso! Você agora implantou E cunhou um NFT na blockchain Ethereum <Emoji text=":money_mouth_face:" size={1} />

Usando o `mint-nft.js` você pode cunhar quantos NFTs seu coração (e carteira) desejar! Apenas certifique-se de passar um novo tokenURI descrevendo os metadados do NFT (caso contrário, você acabará fazendo um monte de NFTs idênticos com IDs diferentes).

Presumivelmente, você gostaria de poder exibir seu NFT em sua carteira — então não deixe de conferir a [Parte 3: Como visualizar seu NFT em sua carteira](/developers/tutorials/how-to-view-nft-in-metamask/)!
