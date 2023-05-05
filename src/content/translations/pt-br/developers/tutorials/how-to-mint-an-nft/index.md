---
title: Como criar um NFT (Segunda parte da série de tutoriais sobre NFT)
description: Este tutorial descreve como criar um NFT na blockchain Ethereum usando nosso contrato inteligente e Web3.
author: "Sumi Mudgil"
tags:
  - "ERC-721"
  - "Solidity"
  - "contratos inteligentes"
skill: beginner
lang: pt-br
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 69 milhões de doláres [3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 11 milhões de doláres [Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 6 milhões de doláres

Estes NFTs foram criados usando a poderosa API da Alchemy. Neste tutorial, vamos te ensinar a fazer o mesmo em < 10 minutos.

"Cunhar um NFT" é o ato de publicar uma instância única do seu token ERC-721 na blockchain. Usando nosso contrato inteligente da [Parte 1 desta série de tutoriais NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), vamos usar nossas habilidades Web3 e criar um NFT. No final deste tutorial, você será capaz de cunhar tantos NFTs quanto seu coração (e sua carteira) desejar!

Vamos começar!

## Etapa 1: Instalar a Web3 {#install-web3}

Se você seguiu o primeiro tutorial sobre a criação do seu contrato inteligente NFT, você já tem experiência usando a Ethers.js. Web3 é semelhante a Ethers, uma vez que é uma biblioteca usada para facilitar a criação de solicitações para a blockchain Ethereum. Neste tutorial, usaremos a [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), que é uma biblioteca Web3 aprimorada que oferece novas tentativas automáticas e um suporte WebSocket sólido.

No diretório inicial do seu projeto execute:

```
yarn add @alch/alchemy-web3
```

## Etapa 2: Criar um arquivo `mint-nft.js` {#create-mintnftjs}

Dentro do seu diretório de scripts, crie um arquivo `mint-nft.js` e adicione as seguintes linhas de código:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Etapa 3: Conseguir sua ABI de contrato {#contract-abi}

Nossa ABI (Interface binária de aplicativo) de contrato é a interface para interagir com nosso contrato inteligente. Você pode aprender mais sobre ABIs de contratos [aqui](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). O Hardhat automaticamente gera uma ABI para nós e a salva no arquivo `MyNFT.json`. Para usar isso, precisaremos distribuir o conteúdo adicionando as seguintes linhas de código ao nosso arquivo `mint-nft.js`:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Se quiser ver a ABI, pode imprimi-la no console:

```js
console.log(JSON.stringify(contract.abi))
```

Para executar o `mint-nft.js` e ver seu ABI impresso no console, navegue até seu terminal e execute:

```js
node scripts/mint-nft.js
```

## Etapa 4: Configurar os metadados para seu NFT usando IPFS {#config-meta}

Se você se lembra do nosso tutorial na Parte 1, nossa função do contrato inteligente `mintNFT` assume um parâmetro tokenURI que deve resolver em um documento JSON, descrevendo os metadados do NFT, o que realmente dá vida ao NFT, permitindo que ele tenha propriedades configuráveis, tais como: nome, descrição, imagem e outros atributos.

> _Interplanetary File System (IPFS) é um protocolo descentralizado e uma rede peer-to-peer para armazenar e compartilhar dados em um sistema de arquivos distribuído._

Usaremos o Pinata, uma API IPFS e um kit de ferramentas práticos, para armazenar nossos ativos e metadados NFT para garantir que nosso NFT seja realmente descentralizado. Se você não tem uma conta em Pinata, cadastre-se [aqui](https://app.pinata.cloud) gratuitamente e conclua as etapas de confirmação de seu e-mail.

Assim que você tiver criado sua conta:

- Navegue até a página "Files" e clique no botão azul "Upload" no canto superior esquerdo da página.

- Faça o upload de uma imagem no Pinata — este será o recurso de imagem para o seu NFT. Sinta-se à vontade para nomear o ativo da forma que quiser

- Após o upload, você verá as informações do arquivo na tabela da página "Arquivos". Você também verá a coluna CID. Você pode copiar o CID clicando no botão de cópia ao lado dele. Você pode ver seu ‘upload’ em: `https://gateway.pinata.cloud/ipfs/<CID>`. Você pode encontrar a imagem que usamos no IPFS [aqui](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5), por exemplo.

Para os que aprendem de maneira mais visual, os passos acima são resumidos aqui:

![Como fazer o upload de sua imagem para Pinata](./instructionsPinata.gif)

Agora, nós queremos enviar mais um documento para o Pinata. Mas antes, precisamos criá-lo!

Em seu diretório raiz, faça um novo arquivo chamado `nft-metadata.json` e adicione o seguinte código json:

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

Sinta-se à vontade para mudar os dados no json. Você pode remover ou adicionar na seção de atributos. O mais importante é se certificar de que o campo de imagem aponta para a localização da sua imagem IPFS — caso contrário, seu NFT incluirá uma foto de um cachorro (bem bonito, por sinal).

Uma vez terminada a edição do arquivo JSON, salve-o e faça o upload para o Pinata, seguindo os mesmos passos que fizemos para o upload da imagem.

![Como fazer o upload de seu nft-metadata.json para Pinata](./uploadPinata.gif)

## Etapa 5: Criar uma instância de seu contrato {#instance-contract}

Agora, para interagir com o nosso contrato, precisamos criar uma instância dele em nosso código. Para fazer isso, precisaremos do nosso endereço de contrato, obtido na implantação ou no [Etherscan](https://goerli.etherscan.io/), procurando o endereço que você usou para implantar o contrato.

![Veja o seu endereço de contrato no Etherscan](./viewContractEtherscan.png)

No exemplo acima, o endereço do contrato é 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Em seguida, usaremos o [método do contrato](https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html?highlight=constructor#web3-eth-contract) Web3 para criar nosso contrato usando a ABI e o endereço. Em seu arquivo `mint-nft.js`, adicione o seguinte:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Etapa 6: Atualize o arquivo `.env` {#update-env}

Agora, para criar e enviar transações para a cadeia Ethereum, usaremos seu endereço de conta Ethereum para obter o nonce da conta (explicaremos abaixo).

Adicione sua chave pública ao seu arquivo `.env` — se você concluiu a parte 1 do tutorial, nosso arquivo `.env` deve ficar assim:

```js
API_URL = "https://eth-goerli.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Etapa 7: Criar sua transação {#create-txn}

Primeiro, vamos definir a função nomeada `mintNFT(tokenData)` e criar nossa transação através do seguinte:

1. Pegue a _PRIVATE_KEY_ e a _PUBLIC_KEY_ do arquivo `.env`.

1. Em seguida, precisaremos descobrir qual é o nonce da conta. A especificação nonce é usada para acompanhar o número de transações enviadas a partir do seu endereço — que precisamos para fins de segurança e evitar [ataques de replay](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Para obter o número de transações enviadas a partir do seu endereço, usamos [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

1. Finalmente, vamos configurar nossa transação com as seguintes informações:

- `'from': PUBLIC_KEY`: a origem da nossa transação é nosso endereço público

- `'to': contractAddress`: o contrato com o qual queremos interagir e ao qual enviar a transação

- `'nonce': nonce` — O nonce da conta com o número de transações enviadas do nosso endereço

- `'gas': estimatedGas`: o gás estimado necessário para completar a transação

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()`: o cálculo que queremos realizar nesta transação que, neste caso, é cunhar um NFT

Seu arquivo `mint-nft.js` deverá ficar assim:

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
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

   //the transaction
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## Etapa 8: Assinar a transação {#sign-txn}

Agora que criamos a nossa transação, precisamos assiná-la para poder enviá-la. É aqui que usaremos nossa chave privada.

`web3.eth.sendSignedTransaction` nos dará o hash da transação, que podemos usar para ter certeza de que nossa transação foi minerada e não foi descartada pela rede. Você vai notar na seção de assinatura de transações que adicionamos alguma verificação de erro para saber se nossa transação foi processada com sucesso.

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
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

## Etapa 9: Chame `mintNFT` e execute o nó `mint-nft.js` {#call-mintnft-fn}

Lembra do `metadata.json` que você carregou no Pinata? Obtenha o seu hashcode no Pinata e transmita o seguinte como parâmetro para a função `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Veja como obter o hashcode:

![Como obter seu hashcode de metadados do nft no Pinata](./metadataPinata.gif)_Como obter seu hashcode de metadados do nft no Pinata_

> Verifique se o hashcode que você copiou se vincula ao **metadata.json** ao carregar `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` em uma janela separada. A página deve parecer semelhante à imagem abaixo:

![Sua página deve exibir os metadados json](./metadataJSON.png)_Sua página deve exibir os metadados json_

O código deve parecer com isso:

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
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

Agora, execute `node scripts/mint-nft.js` para implantar seu NFT. Depois de alguns segundos, você deverá ver uma resposta como essa no seu terminal:

    O hash de sua transação é: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Verifique o Mempool da Alquemy para ver o estado da sua transação!

Em seguida, acesse a [mempool (área de espera) da Alchemy](https://dashboard.alchemyapi.io/mempool) para ver o estado da sua transação (se pendente, minerada ou recusada pela rede). Se a sua transação foi descartada, também é útil verificar o [Goerli Etherscan](https://goerli.etherscan.io/) e procurar pelo hash da transação.

![Veja seu hash de transação NFT no Etherscan](./viewNFTEtherscan.png)_Veja seu hash de transação NFT no Etherscan_

E pronto! Você agora implantou E cunhou um NFT na blockchain Ethereum <Emoji text=":money_mouth_face:" size={1} />

Usando o `mint-nft.js`, você pode cunhar quantos NFTs você (e sua carteira) desejar! Apenas certifique-se de transmitir um novo tokenURI descrevendo os metadados do NFT (caso contrário, você acaba criando um monte de identificações idênticas, com IDs diferentes).

Provavelmente você gostaria de poder exibir seu NFT na sua carteira — então certifique-se de conferir [Parte 3: Como ver seu NFT na sua carteira](/developers/tutorials/how-to-view-nft-in-metamask/)!
