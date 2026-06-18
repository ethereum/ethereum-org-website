---
title: "Como escrever e implantar um NFT (Parte 1/3 da série de tutoriais sobre NFT)"
description: "Este tutorial é a Parte 1 de uma série sobre NFTs que o guiará passo a passo sobre como escrever e implantar um contrato inteligente de Token Não Fungível (token ERC-721) usando Ethereum e o Inter Planetary File System (IPFS)."
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "contratos inteligentes"]
skill: beginner
breadcrumb: Escrever e implantar NFT
lang: pt-br
published: 2021-04-22
---

Com os NFTs trazendo a blockchain para os olhos do público, agora é uma excelente oportunidade para entender o hype por si mesmo, publicando seu próprio contrato de NFT (Token ERC-721) na blockchain Ethereum!

A Alchemy tem muito orgulho de impulsionar os maiores nomes no espaço de NFTs, incluindo Makersplace (que recentemente estabeleceu um recorde de venda de arte digital na Christie's por US$ 69 milhões), Dapper Labs (criadores do NBA Top Shot e Crypto Kitties), OpenSea (o maior mercado de NFTs do mundo), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable e muito mais.

Neste tutorial, vamos orientá-lo na criação e implantação de um contrato inteligente ERC-721 na rede de teste Sepolia usando [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) e [Alchemy](https://alchemy.com/signup/eth) (não se preocupe se você ainda não entende o que nada disso significa — nós explicaremos!).

Na Parte 2 deste tutorial, veremos como podemos usar nosso contrato inteligente para cunhar um NFT, e na Parte 3 explicaremos como visualizar seu NFT na MetaMask.

E, claro, se você tiver dúvidas em qualquer momento, não hesite em entrar em contato no [Discord da Alchemy](https://discord.gg/gWuC7zB) ou visite a [documentação da API de NFT da Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)!

## Passo 1: Conectar-se à rede Ethereum {#connect-to-ethereum}

Existem várias maneiras de fazer solicitações à blockchain Ethereum, mas para facilitar as coisas, usaremos uma conta gratuita na [Alchemy](https://alchemy.com/signup/eth), uma plataforma de desenvolvedores de blockchain e API que nos permite nos comunicar com a cadeia Ethereum sem ter que executar nossos próprios nós.

Neste tutorial, também aproveitaremos as ferramentas de desenvolvedor da Alchemy para monitoramento e análise para entender o que está acontecendo internamente na implantação do nosso contrato inteligente. Se você ainda não tem uma conta na Alchemy, pode se inscrever gratuitamente [aqui](https://alchemy.com/signup/eth).

## Passo 2: Criar seu aplicativo (e chave de API) {#make-api-key}

Depois de criar uma conta na Alchemy, você pode gerar uma chave de API criando um aplicativo. Isso nos permitirá fazer solicitações à rede de teste Sepolia. Confira [este guia](https://docs.alchemyapi.io/guides/choosing-a-network) se estiver curioso para saber mais sobre redes de teste.

1. Navegue até a página "Create App" (Criar aplicativo) no seu Painel da Alchemy passando o mouse sobre "Apps" na barra de navegação e clicando em "Create App"

![Create your app](./create-your-app.png)

2. Dê um nome ao seu aplicativo (escolhemos "My First NFT!"), ofereça uma breve descrição, selecione "Ethereum" para a Cadeia (Chain) e escolha "Sepolia" para sua rede. Desde o The Merge, as outras redes de teste foram descontinuadas.

![Configure and publish your app](./alchemy-explorer-sepolia.png)

3. Clique em "Create app" e pronto! Seu aplicativo deve aparecer na tabela abaixo.

## Passo 3: Criar uma conta Ethereum (endereço) {#create-eth-address}

Precisamos de uma conta Ethereum para enviar e receber transações. Para este tutorial, usaremos a MetaMask, uma carteira virtual no navegador usada para gerenciar o endereço da sua conta Ethereum. Se você quiser entender mais sobre como as transações na Ethereum funcionam, confira [esta página](/developers/docs/transactions/) da Fundação Ethereum.

Você pode baixar e criar uma conta na MetaMask gratuitamente [aqui](https://metamask.io/download). Ao criar uma conta, ou se você já tiver uma, certifique-se de mudar para a "Sepolia Test Network" (Rede de Teste Sepolia) no canto superior direito (para não lidarmos com dinheiro real).

![Set Sepolia as your network](./metamask-goerli.png)

## Passo 4: Adicionar ether de um Faucet {#step-4-add-ether-from-a-faucet}

Para implantar nosso contrato inteligente na rede de teste, precisaremos de um pouco de ETH falso. Para obter ETH, você pode ir ao [Sepolia Faucet](https://sepoliafaucet.com/) hospedado pela Alchemy, fazer login, inserir o endereço da sua conta e clicar em "Send Me ETH" (Envie-me ETH). Você deve ver o ETH na sua conta da MetaMask logo em seguida!

## Passo 5: Verificar seu saldo {#check-balance}

Para confirmar que nosso saldo está lá, vamos fazer uma solicitação [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) usando a [ferramenta composer da Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Isso retornará a quantidade de ETH em nossa carteira. Depois de inserir o endereço da sua conta da MetaMask e clicar em "Send Request" (Enviar solicitação), você deve ver uma resposta como esta:

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **Nota** Este resultado está em Wei, não em ETH. Wei é usado como a menor denominação de ether. A conversão de Wei para ETH é 1 eth = 10<sup>18</sup> Wei. Portanto, se convertermos 0xde0b6b3a7640000 para decimal, obteremos 1\*10<sup>18</sup> Wei, o que equivale a 1 ETH.

Ufa! Nosso dinheiro falso está todo lá.

## Passo 6: Inicializar nosso projeto {#initialize-project}

Primeiro, precisaremos criar uma pasta para o nosso projeto. Navegue até a sua linha de comando e digite:

    mkdir my-nft
    cd my-nft

Agora que estamos dentro da pasta do nosso projeto, usaremos npm init para inicializar o projeto. Se você ainda não tem o npm instalado, siga [estas instruções](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (também precisaremos do [Node.js](https://nodejs.org/en/download/), então baixe-o também!).

    npm init

Não importa muito como você responde às perguntas de instalação; aqui está como fizemos para referência:

```json
    package name: (my-nft)
    version: (1.0.0)
    description: My first NFT!
    entry point: (index.js)
    test command:
    git repository:
    keywords:
    author:
    license: (ISC)
    About to write to /Users/thesuperb1/Desktop/my-nft/package.json:

    {
      "name": "my-nft",
      "version": "1.0.0",
      "description": "My first NFT!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
```

Aprove o package.json e estamos prontos para prosseguir!

## Passo 7: Instalar o [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

O Hardhat é um ambiente de desenvolvimento para compilar, implantar, testar e depurar seu software Ethereum. Ele ajuda os desenvolvedores na construção de contratos inteligentes e aplicativos descentralizados (dapps) localmente antes de implantar na cadeia ativa.

Dentro do nosso projeto my-nft, execute:

    npm install --save-dev hardhat

Confira esta página para mais detalhes sobre as [instruções de instalação](https://hardhat.org/getting-started/#overview).

## Passo 8: Criar o projeto Hardhat {#create-hardhat-project}

Dentro da pasta do nosso projeto, execute:

    npx hardhat

Você deverá ver uma mensagem de boas-vindas e a opção de selecionar o que deseja fazer. Selecione "create an empty hardhat.config.js":

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? What do you want to do? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

Isso gerará um arquivo hardhat.config.js para nós, que é onde especificaremos toda a configuração do nosso projeto (no passo 13).

## Passo 9: Adicionar pastas do projeto {#add-project-folders}

Para manter nosso projeto organizado, criaremos duas novas pastas. Navegue até o diretório raiz do seu projeto na linha de comando e digite:

    mkdir contracts
    mkdir scripts

- contracts/ é onde manteremos o código do nosso contrato inteligente de NFT

- scripts/ é onde manteremos os scripts para implantar e interagir com nosso contrato inteligente

## Passo 10: Escrever nosso contrato {#write-contract}

Agora que nosso ambiente está configurado, vamos para a parte mais emocionante: _escrever o código do nosso contrato inteligente!_

Abra o projeto my-nft no seu editor favorito (nós gostamos do [VSCode](https://code.visualstudio.com/)). Os contratos inteligentes são escritos em uma linguagem chamada Solidity, que é o que usaremos para escrever nosso contrato inteligente MyNFT.sol.‌

1. Navegue até a pasta `contracts` e crie um novo arquivo chamado MyNFT.sol

2. Abaixo está o código do nosso contrato inteligente de NFT, que baseamos na implementação ERC-721 da biblioteca [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721). Copie e cole o conteúdo abaixo no seu arquivo MyNFT.sol.

   ```solidity
   //Contrato baseado em [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/utils/Counters.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       using Counters for Counters.Counter;
       Counters.Counter private _tokenIds;

       constructor() ERC721("MyNFT", "NFT") {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           _tokenIds.increment();

           uint256 newItemId = _tokenIds.current();
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. Como estamos herdando classes da biblioteca de contratos da OpenZeppelin, na sua linha de comando execute `npm install @openzeppelin/contracts^4.0.0` para instalar a biblioteca em nossa pasta.

Então, o que esse código _faz_ exatamente? Vamos detalhá-lo, linha por linha.

No topo do nosso contrato inteligente, importamos três classes de contratos inteligentes da [OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol contém a implementação do padrão ERC-721, que nosso contrato inteligente de NFT herdará. (Para ser um NFT válido, seu contrato inteligente deve implementar todos os métodos do padrão ERC-721.) Para saber mais sobre as funções ERC-721 herdadas, confira a definição da interface [aqui](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/utils/Counters.sol fornece contadores que só podem ser incrementados ou decrementados em um. Nosso contrato inteligente usa um contador para rastrear o número total de NFTs cunhados e definir o ID exclusivo em nosso novo NFT. (Cada NFT cunhado usando um contrato inteligente deve receber um ID exclusivo — aqui, nosso ID exclusivo é determinado apenas pelo número total de NFTs existentes. Por exemplo, o primeiro NFT que cunhamos com nosso contrato inteligente tem um ID de "1", nosso segundo NFT tem um ID de "2", etc.)

- @openzeppelin/contracts/access/Ownable.sol configura o [controle de acesso](https://docs.openzeppelin.com/contracts/3.x/access-control) em nosso contrato inteligente, para que apenas o proprietário do contrato inteligente (você) possa cunhar NFTs. (Nota: incluir o controle de acesso é inteiramente uma preferência. Se você quiser que qualquer pessoa possa cunhar um NFT usando seu contrato inteligente, remova a palavra Ownable na linha 10 e onlyOwner na linha 17.)

Após nossas declarações de importação, temos nosso contrato inteligente de NFT personalizado, que é surpreendentemente curto — ele contém apenas um contador, um construtor e uma única função! Isso se deve aos nossos contratos herdados da OpenZeppelin, que implementam a maioria dos métodos que precisamos para criar um NFT, como `ownerOf` que retorna o proprietário do NFT, e `transferFrom`, que transfere a propriedade do NFT de uma conta para outra.

Em nosso construtor ERC-721, você notará que passamos 2 strings, "MyNFT" e "NFT". A primeira variável é o nome do contrato inteligente e a segunda é o seu símbolo. Você pode nomear cada uma dessas variáveis como desejar!

Finalmente, temos nossa função `mintNFT(address recipient, string memory tokenURI)` que nos permite cunhar um NFT! Você notará que esta função recebe duas variáveis:

- `address recipient` especifica o endereço que receberá seu NFT recém-cunhado

- `string memory tokenURI` é uma string que deve ser resolvida em um documento JSON que descreve os metadados do NFT. Os metadados de um NFT são realmente o que lhe dá vida, permitindo que ele tenha propriedades configuráveis, como nome, descrição, imagem e outros atributos. Na parte 2 deste tutorial, descreveremos como configurar esses metadados.

`mintNFT` chama alguns métodos da biblioteca ERC-721 herdada e, por fim, retorna um número que representa o ID do NFT recém-cunhado.

## Passo 11: Conectar a MetaMask e a Alchemy ao seu projeto {#connect-metamask-and-alchemy}

Agora que criamos uma carteira MetaMask, uma conta na Alchemy e escrevemos nosso contrato inteligente, é hora de conectar os três.

Toda transação enviada da sua carteira virtual exige uma assinatura usando sua chave privada exclusiva. Para fornecer essa permissão ao nosso programa, podemos armazenar com segurança nossa chave privada (e a chave de API da Alchemy) em um arquivo de ambiente.

Para saber mais sobre o envio de transações, confira [este tutorial](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) sobre como enviar transações usando a Web3.

Primeiro, instale o pacote dotenv no diretório do seu projeto:

    npm install dotenv --save

Em seguida, crie um arquivo `.env` no diretório raiz do nosso projeto e adicione sua chave privada da MetaMask e a URL HTTP da API da Alchemy a ele.

- Siga [estas instruções](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) para exportar sua chave privada da MetaMask

- Veja abaixo como obter a URL HTTP da API da Alchemy e copiá-la para a sua área de transferência

![Copy your Alchemy API URL](./copy-alchemy-api-url.gif)

Seu `.env` agora deve ficar assim:

    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

Para realmente conectá-los ao nosso código, faremos referência a essas variáveis em nosso arquivo hardhat.config.js no passo 13.

<EnvWarningBanner />

## Passo 12: Instalar o Ethers.js {#install-ethers}

O Ethers.js é uma biblioteca que facilita a interação e a realização de solicitações à Ethereum, envolvendo [métodos JSON-RPC padrão](/developers/docs/apis/json-rpc/) com métodos mais amigáveis.

O Hardhat torna super fácil integrar [Plugins](https://hardhat.org/plugins/) para ferramentas adicionais e funcionalidade estendida. Aproveitaremos o [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) para a implantação de contratos (o [Ethers.js](https://github.com/ethers-io/ethers.js/) tem alguns métodos de implantação de contratos muito limpos).

No diretório do seu projeto, digite:

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

Também exigiremos o ethers em nosso hardhat.config.js no próximo passo.

## Passo 13: Atualizar o hardhat.config.js {#update-hardhat-config}

Adicionamos várias dependências e plugins até agora, agora precisamos atualizar o hardhat.config.js para que nosso projeto saiba sobre todos eles.

Atualize seu hardhat.config.js para ficar assim:

```js
    /**
    * @type import('hardhat/config').HardhatUserConfig
    */
    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
       defaultNetwork: "sepolia",
       networks: {
          hardhat: {},
          sepolia: {
             url: API_URL,
             accounts: [`0x${PRIVATE_KEY}`]
          }
       },
    }
```

## Passo 14: Compilar nosso contrato {#compile-contract}

Para garantir que tudo esteja funcionando até agora, vamos compilar nosso contrato. A tarefa de compilação é uma das tarefas integradas do Hardhat.

Na linha de comando, execute:

    npx hardhat compile

Você pode receber um aviso sobre o identificador de licença SPDX não fornecido no arquivo de origem, mas não precisa se preocupar com isso — esperamos que todo o resto pareça bem! Se não, você sempre pode enviar uma mensagem no [Discord da Alchemy](https://discord.gg/u72VCg3).

## Passo 15: Escrever nosso script de implantação {#write-deploy}

Agora que nosso contrato está escrito e nosso arquivo de configuração está pronto, é hora de escrever nosso script de implantação de contrato.

Navegue até a pasta `scripts/` e crie um novo arquivo chamado `deploy.js`, adicionando o seguinte conteúdo a ele:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Inicia a implantação, retornando uma promise que resolve em um objeto de contrato
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Contract deployed to address:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

O Hardhat faz um trabalho incrível ao explicar o que cada uma dessas linhas de código faz em seu [tutorial de Contratos](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), adotamos as explicações deles aqui.

    const MyNFT = await ethers.getContractFactory("MyNFT");

Um ContractFactory no ethers.js é uma abstração usada para implantar novos contratos inteligentes, então MyNFT aqui é uma fábrica para instâncias do nosso contrato de NFT. Ao usar o plugin hardhat-ethers, as instâncias de ContractFactory e Contract são conectadas ao primeiro signatário por padrão.

    const myNFT = await MyNFT.deploy();

Chamar deploy() em um ContractFactory iniciará a implantação e retornará uma Promise que é resolvida em um Contract. Este é o objeto que tem um método para cada uma das funções do nosso contrato inteligente.

## Passo 16: Implantar nosso contrato {#deploy-contract}

Finalmente estamos prontos para implantar nosso contrato inteligente! Navegue de volta para a raiz do diretório do seu projeto e, na linha de comando, execute:

    npx hardhat --network sepolia run scripts/deploy.js

Você deverá ver algo como:

    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650

Se formos ao [Etherscan da Sepolia](https://sepolia.etherscan.io/) e pesquisarmos o endereço do nosso contrato, deveremos ver que ele foi implantado com sucesso. Se você não conseguir vê-lo imediatamente, aguarde um pouco, pois pode levar algum tempo. A transação será parecida com esta:

![View your transaction address on Etherscan](./etherscan-sepoila-contract-creation.png)

O endereço "From" (De) deve corresponder ao endereço da sua conta da MetaMask e o endereço "To" (Para) dirá "Contract Creation" (Criação de Contrato). Se clicarmos na transação, veremos o endereço do nosso contrato no campo "To":

![View your contract address on Etherscan](./etherscan-sepolia-tx-details.png)

Isso aí! Você acabou de implantar seu contrato inteligente de NFT na cadeia (rede de teste) Ethereum!

Para entender o que está acontecendo internamente, vamos navegar até a guia Explorer no nosso [painel da Alchemy](https://dashboard.alchemyapi.io/explorer). Se você tiver vários aplicativos na Alchemy, certifique-se de filtrar por aplicativo e selecionar "MyNFT".

![View calls made “under the hood” with Alchemy’s Explorer Dashboard](./alchemy-explorer-goerli.png)

Aqui você verá algumas chamadas JSON-RPC que o Hardhat/Ethers fez internamente para nós quando chamamos a função .deploy(). Duas importantes a destacar aqui são [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), que é a solicitação para realmente escrever nosso contrato inteligente na cadeia Sepolia, e [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash), que é uma solicitação para ler informações sobre nossa transação dado o hash (um padrão típico ao enviar transações). Para saber mais sobre o envio de transações, confira este tutorial sobre [como enviar transações usando a Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

Isso é tudo para a Parte 1 deste tutorial. Na [Parte 2, nós realmente interagiremos com nosso contrato inteligente cunhando um NFT](/developers/tutorials/how-to-mint-an-nft/), e na [Parte 3 mostraremos como visualizar seu NFT na sua carteira Ethereum](/developers/tutorials/how-to-view-nft-in-metamask/)!