---
title: "Como cunhar um NFT (Parte 2/3 da série de tutoriais sobre NFT)"
description: Este tutorial descreve como cunhar um NFT na blockchain Ethereum usando nosso contrato inteligente, Hardhat e ethers.js.
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "contratos inteligentes"]
skill: beginner
breadcrumb: Cunhar um NFT
lang: pt-br
published: 2021-04-22
---

"Cunhar um NFT" é o ato de publicar uma instância única do seu token ERC-721 na blockchain. Usando nosso contrato inteligente da [Parte 1 desta série de tutoriais sobre NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), vamos exercitar nossas habilidades em Web3 e cunhar um NFT. Ao final deste tutorial, você será capaz de cunhar quantos NFTs seu coração (e carteira) desejar!

Vamos começar!

## Passo 1: Verifique sua configuração {#install-web3}

Se você seguiu o primeiro tutorial sobre como criar seu contrato inteligente de NFT, você já tem tudo o que precisa: um projeto Hardhat 3 com o [plugin Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) e o [ethers.js](https://docs.ethers.org/v6/), uma biblioteca usada para facilitar a criação de solicitações para a blockchain [Ethereum](/). Escreveremos nosso código de cunhagem como um script do Hardhat, para que ele reutilize as configurações da rede Sepolia e os valores `API_URL` e `PRIVATE_KEY` da Parte 1 — não há nada novo para instalar.

## Passo 2: Crie um arquivo `mint-nft.js` {#create-mintnftjs}

Dentro do seu diretório de scripts, crie um arquivo `mint-nft.js` e adicione as seguintes linhas de código:

```js
import { network } from "hardhat"

const { ethers } = await network.create()
```

Assim como no nosso script de implantação, `network.create()` se conecta à rede que você escolher com `--network` ao executar o script, e nos fornece um objeto `ethers` para ela.

## Passo 3: Obtenha a ABI do seu contrato {#contract-abi}

A Interface Binária de Aplicação (ABI) do nosso contrato é a interface para interagir com nosso contrato inteligente. Você pode aprender mais sobre [ABIs de contrato](/glossary/#abi). O Hardhat gera automaticamente uma ABI para nós quando compila o contrato e a salva no arquivo `artifacts/contracts/MyNFT.sol/MyNFT.json`. O plugin Ethers do Hardhat a lê de lá para nós quando criamos a instância do nosso contrato no passo 5, então não precisamos carregá-la nós mesmos.

Se você quiser ver a ABI, pode imprimi-la no seu console. A partir do diretório raiz do seu projeto, execute:

```sh
node -p "JSON.stringify(require('./artifacts/contracts/MyNFT.sol/MyNFT.json').abi)"
```

## Passo 4: Configure os metadados para o seu NFT usando IPFS {#config-meta}

Se você se lembra do nosso tutorial na Parte 1, a função `mintNFT` do nosso contrato inteligente recebe um parâmetro tokenURI que deve ser resolvido para um documento JSON descrevendo os metadados do NFT — que é realmente o que dá vida ao NFT, permitindo que ele tenha propriedades configuráveis, como nome, descrição, imagem e outros atributos.

> _O Interplanetary File System (IPFS) é um protocolo descentralizado e uma rede ponto a ponto para armazenar e compartilhar dados em um sistema de arquivos distribuído._

Usaremos o Pinata, uma Interface de Programação de Aplicações (API) e kit de ferramentas IPFS conveniente, para armazenar o ativo e os metadados do nosso NFT para garantir que nosso NFT seja verdadeiramente descentralizado. Se você não tem uma conta no Pinata, inscreva-se para uma conta gratuita [aqui](https://app.pinata.cloud) e conclua os passos para verificar seu e-mail.

Depois de criar uma conta:

- Navegue até a [página de Arquivos](https://app.pinata.cloud/ipfs/files) e clique no botão "Add" (Adicionar) no canto superior direito da página.

- Faça o upload de uma imagem para o Pinata — este será o ativo de imagem para o seu NFT. Sinta-se à vontade para nomear o ativo como desejar. Certifique-se de fazer o upload para o IPFS público: arquivos no [IPFS Privado](https://docs.pinata.cloud/files/private-ipfs) não podem ser buscados por carteiras e mercados que exibem seu NFT.

- Após o upload, você verá o arquivo listado na página de Arquivos junto com seu CID (identificador de conteúdo). Copie o CID. Você pode visualizar seu upload em: `https://gateway.pinata.cloud/ipfs/<CID>`, ou através do gateway dedicado listado em "Gateways" na barra lateral do Pinata. Você pode encontrar a imagem que usamos no IPFS [aqui](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5), por exemplo.

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

Sinta-se à vontade para alterar os dados no json. Você pode remover ou adicionar à seção de atributos. O mais importante é garantir que o campo de imagem aponte para a localização da sua imagem no IPFS, no formato `ipfs://<image-CID>` — caso contrário, seu NFT incluirá uma foto de um cachorro (muito fofo!).

Quando terminar de editar o arquivo JSON, salve-o e faça o upload para o Pinata, seguindo os mesmos passos que fizemos para o upload da imagem. Copie o CID do `nft-metadata.json` também; precisaremos dele no passo 9.

## Passo 5: Crie uma instância do seu contrato {#instance-contract}

Agora, para interagir com nosso contrato, precisamos criar uma instância dele em nosso código. Para fazer isso, precisaremos do endereço do nosso contrato, que nosso script de implantação imprimiu na Parte 1. Você também pode encontrá-lo no [Etherscan](https://sepolia.etherscan.io/) ou no [Blockscout](https://eth-sepolia.blockscout.com/) procurando pelo endereço que você usou para implantar o contrato.

![Visualize o endereço do seu contrato no Etherscan](./view-contract-etherscan.png)

No exemplo acima, o endereço do nosso contrato é 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Em seguida, usaremos o método `getContractAt` do plugin Ethers do Hardhat para criar nosso contrato usando seu nome (que diz a ele qual ABI usar) e seu endereço. No seu arquivo `mint-nft.js`, adicione o seguinte, substituindo o endereço pelo seu próprio:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)
```

## Passo 6: Verifique o arquivo `.env` {#update-env}

Toda transação que enviamos tem que ser assinada com a chave privada da sua conta. Se você concluiu a parte 1 do tutorial, nosso arquivo `.env` já deve estar assim:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Não há necessidade de adicionar seu endereço público: o ethers o descobre a partir da chave privada.

## Passo 7: Crie sua transação {#create-txn}

Primeiro, vamos definir uma função chamada `mintNFT(tokenURI)` e criar nossa transação fazendo o seguinte:

1. Obtenha a conta da qual enviamos a transação. `ethers.getSigners()` retorna as contas configuradas para a rede, que na Sepolia é a conta cuja chave privada está no `.env`. Como `mintNFT` é `onlyOwner`, esta deve ser a mesma conta que implantou o contrato.

1. Chame a função `mintNFT` na instância do nosso contrato, com nosso próprio endereço como destinatário e o URI dos metadados. Esta é a computação que desejamos realizar nesta transação — que neste caso é cunhar um NFT.

Você não precisa calcular o nonce (o número de transações enviadas do seu endereço, o que previne ataques de repetição), o limite de gas ou as taxas por conta própria: o ethers os busca ou estima antes de enviar a transação.

Seu arquivo `mint-nft.js` deve estar assim agora:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  // Envie a transação. O ethers preenche o nonce, o limite de gas e as taxas para nós.
  const tx = await nftContract.mintNFT(signer.address, tokenURI)
}
```

## Passo 8: Assine a transação {#sign-txn}

Como a rede está configurada com nossa chave privada, o ethers assina a transação com ela automaticamente antes de enviá-la.

Chamar `mintNFT` retorna assim que a transação for enviada, e nos dá o hash da transação, que podemos usar para garantir que nossa transação foi minerada e não foi descartada pela rede. `tx.wait()` então aguarda até que a transação seja incluída em um bloco. Também adicionamos algumas verificações de erro para sabermos se nossa transação foi concluída com sucesso.

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // Envie a transação. O ethers preenche o nonce, o limite de gas e as taxas para nós.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // Aguarde até que a transação seja incluída em um bloco
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}
```

## Passo 9: Chame `mintNFT` e execute `mint-nft.js` {#call-mintnft-fn}

Lembra do `nft-metadata.json` que você fez o upload para o Pinata? Obtenha o CID dele no Pinata e passe `ipfs://<metadata-CID>` como o parâmetro para a função `mintNFT`. Carteiras e mercados resolvem URIs `ipfs://` através de um gateway IPFS de sua escolha, para que seu NFT não dependa de nenhum gateway único.

> Verifique novamente se o CID que você copiou vincula ao seu **nft-metadata.json** carregando `https://gateway.pinata.cloud/ipfs/<metadata-CID>` em uma janela separada. A página deve ser semelhante à captura de tela abaixo:

![Sua página deve exibir os metadados json](./metadataJSON.png)_Sua página deve exibir os metadados json_

No geral, seu código deve ficar parecido com isto:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // Envie a transação. O ethers preenche o nonce, o limite de gas e as taxas para nós.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // Aguarde até que a transação seja incluída em um bloco
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}

await mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Agora, execute o script na Sepolia para cunhar seu NFT:

```sh
npx hardhat run scripts/mint-nft.js --network sepolia
```

Após alguns segundos, você deve ver uma resposta como esta no seu terminal:

```text
The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
Your NFT was minted in block <block number>
```

Para ver os detalhes da sua transação, pesquise pelo hash da transação no [Etherscan](https://sepolia.etherscan.io/) ou no [Blockscout](https://eth-sepolia.blockscout.com/).

![Visualize o hash da transação do seu NFT no Etherscan](./view-nft-etherscan.png)_Visualize o hash da transação do seu NFT no Etherscan_

E é isso! Você agora implantou E cunhou um NFT na blockchain Ethereum <Emoji text=":money_mouth_face:" size={1} />

Usando o `mint-nft.js` você pode cunhar quantos NFTs seu coração (e carteira) desejar! Apenas certifique-se de passar um novo tokenURI descrevendo os metadados do NFT (caso contrário, você acabará fazendo um monte de NFTs idênticos com IDs diferentes).

Presumivelmente, você gostaria de poder exibir seu NFT na sua carteira — então não deixe de conferir a [Parte 3: Como visualizar seu NFT na sua carteira](/developers/tutorials/how-to-view-nft-in-metamask/)!
