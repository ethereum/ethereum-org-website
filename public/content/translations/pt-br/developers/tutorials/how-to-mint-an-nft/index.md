---
title: Como Cunhar um NFT (Parte 2/3 da Série de Tutoriais sobre NFT)
description: Este tutorial descreve como cunhar um NFT na blockchain Ethereum usando nosso contrato inteligente e Web3.
author: "Sumi Mudgil"
tags: [ "ERC-721", "alchemy", "solidez", "smart contracts" ]
skill: beginner
lang: pt-br
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): $69 Milhões
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): $11 Milhões
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): $6 Milhões

Todos eles cunharam seus NFTs usando a poderosa API da Alchemy. Neste tutorial, vamos te ensinar a fazer o mesmo em \<10 minutos.

“Cunhar um NFT” é o ato de publicar uma instância única de seu token ERC-721 na blockchain. Usando nosso contrato inteligente da [Parte 1 desta série de tutoriais sobre NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), vamos usar nossas habilidades de Web3 e cunhar um NFT. No final deste tutorial, você será capaz de cunhar tantos NFTs quanto seu coração (e sua carteira) desejar!

Vamos começar!

## Etapa 1: Instalar o Web3 {#install-web3}

Se você seguiu o primeiro tutorial sobre a criação do seu contrato inteligente NFT, você já tem experiência usando a Ethers.js. Web3 é semelhante ao Ethers, pois é uma biblioteca usada para facilitar a criação de solicitações para a blockchain Ethereum. Neste tutorial, usaremos o [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), que é uma biblioteca Web3 aprimorada que oferece novas tentativas automáticas e suporte robusto a WebSocket.

No diretório inicial do seu projeto, execute:

```
npm install @alch/alchemy-web3
```

## Etapa 2: Criar um arquivo `mint-nft.js` {#create-mintnftjs}

Dentro do seu diretório de scripts, crie um arquivo `mint-nft.js` e adicione as seguintes linhas de código:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Etapa 3: Obter a ABI do seu contrato {#contract-abi}

A ABI (Application Binary Interface) do nosso contrato é a interface para interagir com o nosso contrato inteligente. Você pode saber mais sobre ABIs de Contrato [aqui](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). O Hardhat gera automaticamente uma ABI para nós e a salva no arquivo `MyNFT.json`. Para usar isso, precisaremos analisar o conteúdo, adicionando as seguintes linhas de código ao nosso arquivo `mint-nft.js`:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Se quiser ver a ABI, você pode imprimi-la no seu console:

```js
console.log(JSON.stringify(contract.abi))
```

Para executar o `mint-nft.js` e ver sua ABI impressa no console, navegue até seu terminal e execute:

```js
node scripts/mint-nft.js
```

## Etapa 4: Configurar os metadados do seu NFT usando o IPFS {#config-meta}

Se você se lembra do nosso tutorial da Parte 1, nossa função de contrato inteligente `mintNFT` recebe um parâmetro tokenURI que deve ser resolvido em um documento JSON que descreve os metadados do NFT — que é o que realmente dá vida ao NFT, permitindo que ele tenha propriedades configuráveis, como nome, descrição, imagem e outros atributos.

> _O Interplanetary File System (IPFS) é um protocolo descentralizado e uma rede ponto a ponto para armazenar e compartilhar dados em um sistema de arquivos distribuído._

Usaremos o Pinata, uma API e um kit de ferramentas IPFS convenientes, para armazenar o ativo e os metadados do nosso NFT para garantir que nosso NFT seja verdadeiramente descentralizado. Se você não tiver uma conta no Pinata, crie uma conta gratuita [aqui](https://app.pinata.cloud) e siga as etapas para verificar seu e-mail.

Assim que tiver criado uma conta:

- Navegue até a página “Arquivos” e clique no botão azul "Fazer Upload" no canto superior esquerdo da página.

- Faça o upload de uma imagem para o Pinata — esta será a imagem do seu NFT. Sinta-se à vontade para nomear o ativo como quiser

- Após o upload, você verá as informações do arquivo na tabela na página "Arquivos". Você também verá uma coluna CID. Você pode copiar o CID clicando no botão de cópia ao lado dele. Você pode visualizar seu upload em: `https://gateway.pinata.cloud/ipfs/<CID>`. Por exemplo, você pode encontrar a imagem que usamos no IPFS [aqui](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5).

Para aqueles que aprendem melhor visualmente, as etapas acima estão resumidas aqui:

![Como fazer o upload da sua imagem para o Pinata](./instructionsPinata.gif)

Agora, vamos querer fazer o upload de mais um documento para o Pinata. Mas antes disso, precisamos criá-lo!

No seu diretório raiz, crie um novo arquivo chamado `nft-metadata.json` e adicione o seguinte código json:

```json
{
  "attributes": [
    {
      "trait_type": "Raça",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Cor dos olhos",
      "value": "Mocha"
    }
  ],
  "description": "O cachorrinho mais adorável e sensível do mundo.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

Sinta-se à vontade para alterar os dados no json. Você pode remover ou adicionar itens à seção de atributos. O mais importante é se certificar de que o campo da imagem aponte para a localização da sua imagem IPFS — caso contrário, seu NFT incluirá a foto de um (muito fofo!) cachorro.

Quando terminar de editar o arquivo JSON, salve-o e faça o upload para o Pinata, seguindo os mesmos passos que fizemos para o upload da imagem.

![Como fazer o upload do seu nft-metadata.json para o Pinata](./uploadPinata.gif)

## Etapa 5: Criar uma instância do seu contrato {#instance-contract}

Agora, para interagir com o nosso contrato, precisamos criar uma instância dele em nosso código. Para fazer isso, precisaremos do endereço do nosso contrato, que podemos obter na implantação ou no [Blockscout](https://eth-sepolia.blockscout.com/), pesquisando o endereço que você usou para implantar o contrato.

![Veja o endereço do seu contrato no Etherscan](./view-contract-etherscan.png)

No exemplo acima, o endereço do nosso contrato é 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

A seguir, usaremos o [método de contrato](https://docs.web3js.org/api/web3-eth-contract/class/Contract) do Web3 para criar nosso contrato usando a ABI e o endereço. No seu arquivo `mint-nft.js`, adicione o seguinte:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Etapa 6: Atualizar o arquivo `.env` {#update-env}

Agora, para criar e enviar transações para a rede Ethereum, usaremos o endereço da sua conta pública do Ethereum para obter o nonce da conta (explicaremos abaixo).

Adicione sua chave pública ao seu arquivo `.env` — se você concluiu a parte 1 do tutorial, nosso arquivo `.env` deve estar assim agora:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Etapa 7: Criar sua transação {#create-txn}

Primeiro, vamos definir uma função chamada `mintNFT(tokenData)` e criar nossa transação fazendo o seguinte:

1. Obtenha suas _PRIVATE_KEY_ e _PUBLIC_KEY_ do arquivo `.env`.

2. Em seguida, precisaremos descobrir qual é o nonce da conta. A especificação nonce é usada para acompanhar o número de transações enviadas a partir do seu endereço — o que precisamos para fins de segurança e para prevenir [ataques de replay](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Para obter o número de transações enviadas a partir do seu endereço, usamos o [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

3. Finalmente, vamos configurar nossa transação com as seguintes informações:

- `'from': PUBLIC_KEY` — A origem da nossa transação é o nosso endereço público

- `'to': contractAddress` — O contrato com o qual desejamos interagir e para o qual enviar a transação

- `'nonce': nonce` — O nonce da conta com o número de transações enviadas do nosso endereço

- `'gas': estimatedGas` — O gás estimado necessário para concluir a transação

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — A computação que desejamos realizar nesta transação, que neste caso é cunhar um NFT

Seu arquivo `mint-nft.js` deve estar assim agora:

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
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //obter o nonce mais recente

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

## Etapa 8: Assinar a transação {#sign-txn}

Agora que criamos a nossa transação, precisamos assiná-la para poder enviá-la. É aqui que usaremos nossa chave privada.

`web3.eth.sendSignedTransaction` nos dará o hash da transação, que podemos usar para garantir que nossa transação foi minerada e não foi descartada pela rede. Você notará que, na seção de assinatura da transação, adicionamos uma verificação de erros para que saibamos se a nossa transação foi concluída com sucesso.

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //obter o nonce mais recente

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
              "O hash de sua transação é: ",
              hash,
              "\nVerifique o Mempool da Alchemy para ver o status da sua transação!"
            )
          } else {
            console.log(
              "Algo deu errado ao enviar sua transação:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Falha na promessa:", err)
    })
}
```

## Etapa 9: Chamar `mintNFT` e executar node `mint-nft.js` {#call-mintnft-fn}

Lembra do arquivo `metadata.json` que você enviou para o Pinata? Obtenha seu hashcode do Pinata e passe o seguinte como parâmetro para a função `mintNFT`: `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Veja como obter o hashcode:

![Como obter o hashcode dos metadados do seu nft no Pinata](./metadataPinata.gif)_Como obter o hashcode dos metadados do seu nft no Pinata_

> Verifique se o hashcode que você copiou leva ao seu **metadata.json** carregando `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` em uma janela separada. A página deve ser parecida com a captura de tela abaixo:

![Sua página deve exibir os metadados json](./metadataJSON.png)_Sua página deve exibir os metadados json_

No total, seu código deve se parecer com isto:

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //obter o nonce mais recente

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
              "O hash de sua transação é: ",
              hash,
              "\nVerifique o Mempool da Alchemy para ver o status da sua transação!"
            )
          } else {
            console.log(
              "Algo deu errado ao enviar sua transação:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Falha na promessa:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Agora, execute `node scripts/mint-nft.js` para implantar seu NFT. Depois de alguns segundos, você deverá ver uma resposta como essa no seu terminal:

    ```
    O hash da sua transação é: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
    
    Verifique o Mempool da Alchemy para ver o status da sua transação!
    ```

Em seguida, visite o [mempool da Alchemy](https://dashboard.alchemyapi.io/mempool) para ver o status da sua transação (se está pendente, minerada ou foi descartada pela rede). Se sua transação for descartada, também é útil verificar o [Blockscout](https://eth-sepolia.blockscout.com/) e pesquisar pelo hash da sua transação.

![Veja o hash da transação do seu NFT no Etherscan](./view-nft-etherscan.png)_Veja o hash da transação do seu NFT no Etherscan_

E é isso! Você implantou E cunhou um NFT na blockchain Ethereum <Emoji text=":money_mouth_face:" size={1} />

Usando o `mint-nft.js`, você pode cunhar quantos NFTs seu coração (e sua carteira) desejar! Apenas certifique-se de passar um novo tokenURI descrevendo os metadados do NFT (caso contrário, você acabará criando um monte de NFTs idênticos com IDs diferentes).

Provavelmente, você gostaria de poder exibir seu NFT em sua carteira — então não deixe de conferir a [Parte 3: Como visualizar seu NFT em sua carteira](/developers/tutorials/how-to-view-nft-in-metamask/)!
