---
title: "Como Escrever e Implantar um NFT (Parte 1/3 da Série de Tutoriais sobre NFT)"
description: "Este tutorial é a parte 1 de uma série sobre NFTs que o guiará passo a passo sobre como escrever e implantar um contrato inteligente não fungível (token ERC-721) usando Ethereum e o sistema de arquivos do Inter Planetary (IPFS)."
author: "Sumi Mudgil"
tags: [ "ERC-721", "Alchemy", "Solidity", "smart contracts" ]
skill: beginner
lang: pt-br
published: 2021-04-22
---

Com os NFTs trazendo a blockchain aos olhos do público, agora é uma excelente oportunidade para entender a tendência publicando seu próprio contrato NFT (ERC-721 Token) na blockchain Ethereum!

A Alchemy se orgulha imensamente de impulsionar os maiores nomes no espaço de NFT, incluindo a Makersplace (que recentemente estabeleceu um recorde de venda de arte digital na Christie's por 69 milhões de dólares), Dapper Labs (criadores do NBA Top Shot & Crypto Kitties), OpenSea (o maior marketplace de NFT do mundo), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable e muito mais.

Neste tutorial, vamos percorrer a criação e implantação de um contrato inteligente ERC-721 na rede de teste Sepolia usando [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) e [Alchemy](https://alchemy.com/signup/eth) (não se preocupe se você ainda não entende o que tudo isso significa — nós explicaremos!).

Na parte 2 deste tutorial, veremos como podemos usar nosso contrato inteligente para gerar NFT, e na Parte 3, explicaremos como ver seu NFT no MetaMask.

E, claro, se você tiver dúvidas a qualquer momento, não hesite em nos contatar no [Discord da Alchemy](https://discord.gg/gWuC7zB) ou visite a [documentação da API de NFT da Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)!

## Etapa 1: Conecte-se à rede Ethereum {#connect-to-ethereum}

Há várias maneiras de fazer solicitações para a blockchain Ethereum, mas, para facilitar, usaremos uma conta gratuita na [Alchemy](https://alchemy.com/signup/eth), uma plataforma de desenvolvimento de blockchain e API que nos permite comunicar com a blockchain Ethereum sem ter que executar nossos próprios nós.

Neste tutorial, também aproveitaremos as ferramentas de desenvolvedor da Alchemy para fins de monitoramento e análise, para entender o que está acontecendo nos bastidores da nossa implantação de contrato inteligente. Se você ainda não tem uma conta na Alchemy, pode se inscrever gratuitamente [aqui](https://alchemy.com/signup/eth).

## Etapa 2: Crie seu aplicativo (e chave de API) {#make-api-key}

Assim que criar uma conta na Alchemy, você pode gerar uma chave de API criando um "app". Isso nos permitirá fazer solicitações à rede de teste Sepolia. Confira [este guia](https://docs.alchemyapi.io/guides/choosing-a-network) se tiver curiosidade em aprender mais sobre redes de teste.

1. Vá até a página "Create App" no painel da Alchemy, passe o mouse sobre a palavra "Apps" na barra de navegação e clique em "Create App"

![Crie seu aplicativo](./create-your-app.png)

2. Nomeie seu app (nós escolhemos “Meu primeiro NFT!”), ofereça uma breve descrição, selecione “Ethereum” para a rede e escolha “Sepolia” para sua rede. Desde a fusão, as outras redes de teste foram descontinuadas.

![Configure e publique seu aplicativo](./alchemy-explorer-sepolia.png)

3. Clique em "Create App", e é isso e tudo! Seu app deveria aparecer na tabela abaixo.

## Etapa 3: Crie uma conta Ethereum (endereço) {#create-eth-address}

Precisamos de uma conta Ethereum para enviar e receber transações. Para este tutorial, usaremos uma carteira virtual no navegador, a MetaMask, para gerenciar o endereço da sua conta Ethereum. Se quiser entender mais sobre como as transações na Ethereum funcionam, confira [esta página](/developers/docs/transactions/) da Ethereum Foundation.

Você pode baixar e criar uma conta MetaMask gratuitamente [aqui](https://metamask.io/download). Quando você estiver criando uma conta, ou se você já tiver uma, certifique-se de mudar para a “Sepolia Test Network” no canto superior direito (para que não lidemos com dinheiro real).

![Defina Sepolia como sua rede](./metamask-goerli.png)

## Etapa 4: Adicione ether de um Faucet {#step-4-add-ether-from-a-faucet}

Para implementar nosso contrato inteligente na rede de teste, precisaremos de alguns ETHs de imitação. Para obter ETH, você pode ir para o [Sepolia Faucet](https://sepoliafaucet.com/) hospedado pela Alchemy, fazer login, inserir o endereço da sua conta e clicar em “Envie-me ETH”. Você deveria ver o ETH na sua conta MetaMask logo depois!

## Etapa 5: Verifique seu saldo {#check-balance}

Para conferir nosso saldo, vamos fazer uma solicitação [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) usando a [ferramenta de composição da Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Ele mostrará a quantidade de ETH em nossa carteira. Depois de inserir o endereço da sua conta da MetaMask e clicar em "Send Request", você verá uma resposta como esta:

    ```
    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`
    ```

> **Observação**: este resultado está em wei, não em ETH. Lembre-se de que "Wei" é a menor unidade de ether. A conversão de wei para ETH é 1 eth = 10<sup>18</sup> wei. Então, se convertemos 0xde0b6b3a7640000 para decimal, temos 1\*10<sup>18</sup> wei, que é igual a 1 ETH.

Ufa! O nosso dinheiro falso está todo lá.

## Etapa 6: Inicialize nosso projeto {#initialize-project}

Primeiro, precisamos criar uma pasta para o nosso projeto. Navegue até sua linha de comando e digite:

    ```
    mkdir my-nft
    cd my-nft
    ```

Agora que estamos dentro da pasta do nosso projeto, vamos usar npm init para inicializá-lo. Se você ainda não tem o npm instalado, siga [estas instruções](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (também vamos precisar do [Node.js](https://nodejs.org/en/download/), então baixe-o também!).

    ```
    npm init
    ```

Não importa realmente como você responde às questões de instalação; aqui está o que utilizamos de referência:

```json
    nome do pacote: (my-nft)
    versão: (1.0.0)
    descrição: Meu primeiro NFT!
    ponto de entrada: (index.js)
    comando de teste:
    repositório git:
    palavras-chave:
    autor:
    licença: (ISC)
    Prestes a escrever em /Users/thesuperb1/Desktop/my-nft/package.json:

    {
      "name": "my-nft",
      "version": "1.0.0",
      "description": "Meu primeiro NFT!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Erro: nenhum teste especificado\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
```

Aprove o package.json e estamos prontos para começar!

## Etapa 7: Instale o [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat é um ambiente de desenvolvimento para compilar, implementar, testar e depurar seu software de Ethereum. Ele ajuda os desenvolvedores na criação de contratos inteligentes e dapps localmente antes de implantar na cadeia real.

Dentro do nosso projeto my-nft execute:

    ```
    npm install --save-dev hardhat
    ```

Confira esta página para mais detalhes sobre as [instruções de instalação](https://hardhat.org/getting-started/#overview).

## Etapa 8: Crie um projeto Hardhat {#create-hardhat-project}

Dentro da nossa pasta de projeto, execute:

    ```
    npx hardhat
    ```

Você deve então ver uma mensagem de boas-vindas e a opção de selecionar o que quer fazer. Selecione "criar uma hardhat.config.js vazia":

    ```
    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Bem-vindo ao Hardhat v2.0.11 👷‍
    ? O que você quer fazer? …
    Criar um projeto de exemplo
    ❯ Criar um hardhat.config.js vazio
    Sair
    ```

Isso vai gerar um arquivo hardhat.config.js, no qual especificaremos todas as configurações para o nosso projeto (no passo 13).

## Etapa 9: Adicione pastas ao projeto {#add-project-folders}

Para manter a organização do nosso projeto, vamos criar duas novas pastas. Navegue até o diretório raiz do seu projeto na sua linha de comando e digite:

    ```
    mkdir contracts
    mkdir scripts
    ```

- contracts/ é onde manteremos o nosso código de contrato inteligente para o NFT

- scripts/ é onde manteremos scripts para implantar e interagir com nosso contrato inteligente

## Etapa 10: Escreva nosso contrato {#write-contract}

Agora que nosso ambiente está configurado, vamos para a parte mais empolgante: _escrever o código do nosso contrato inteligente!_

Abra o projeto my-nft em seu editor favorito (gostamos do [VSCode](https://code.visualstudio.com/)). Os contratos inteligentes são escritos em uma linguagem chamada Solidity, que usaremos para escrever nosso contrato inteligente MyNFT.sol.

1. Navegue para a pasta `contracts` e crie um novo arquivo chamado MyNFT.sol

2. Abaixo está nosso código de contrato inteligente NFT, que baseamos na implementação ERC-721 da biblioteca [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721). Copie e cole o conteúdo abaixo no seu arquivo MyNFT.sol.

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

3. Como estamos herdando classes da biblioteca de contratos OpenZeppelin, na sua linha de comando execute `npm install @openzeppelin/contracts^4.0.0` para instalar a biblioteca em nossa pasta.

Então, o que este código _faz_ exatamente? Vamos por partes, linha por linha.

No topo do nosso contrato inteligente, importamos três classes de contrato inteligente [OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol contém a implementação do padrão ERC-721, que nosso contrato inteligente NFT herdará. (Para ser um NFT válido, seu contrato inteligente deve implementar todos os métodos do padrão ERC-721.) Para saber mais sobre as funções ERC-721 herdadas, confira a definição da interface [aqui](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/utils/Counters.sol fornece contadores que só podem ser incrementados ou diminuídos por um. Nosso contrato inteligente usa um contador para acompanhar o número total de NFTs impressos e definir o ID exclusivo em nosso novo NFT. (Cada NFT cunhado usando um contrato inteligente deve ter um ID único – aqui nosso ID exclusivo é determinado pelo número total de NFTs existentes. Por exemplo, o primeiro NFT que cunhamos com o nosso contrato inteligente tem um ID igual a "1," nosso segundo NFT tem um ID igual a "2," etc.)

- @openzeppelin/contracts/access/Ownable.sol configura o [controle de acesso](https://docs.openzeppelin.com/contracts/3.x/access-control) em nosso contrato inteligente, de modo que apenas o proprietário do contrato inteligente (você) pode cunhar NFTs. (Observação, incluir controle de acesso é inteiramente uma preferência. Se você quer que qualquer pessoa consiga gerar um NFT usando seu contrato inteligente, remove a palavra "Ownable" na linha 10 e "onlyOwner" na linha 17.)

Depois de seguir nossas instruções de importação, temos o nosso contrato inteligente de NFT, que é surpreendentemente curto – contém apenas um contador, um construtor e uma única função! Isso é graças aos nossos contratos OpenZeppelin herdados, que implementam a maioria dos métodos que precisamos para criar um NFT, como `ownerOf`, que retorna o proprietário do NFT, e `transferFrom`, que transfere a propriedade do NFT de uma conta para outra.

No nosso construtor ERC-721, você notará que transmitimos duas cadeias de caracteres: "MyNFT" e "NFT" A primeira variável é o nome do contrato inteligente e a segunda é símbolo dele. Você pode nomear cada uma dessas variáveis como quiser!

Finalmente, temos nossa função `mintNFT(address recipient, string memory tokenURI)` que nos permite cunhar um NFT! Você vai notar que essa função recebe duas variáveis:

- `address recipient` especifica o endereço que receberá seu NFT recém-cunhado

- `string memory tokenURI` é uma string que deve ser resolvida para um documento JSON que descreve os metadados do NFT. Os metadados de um NFT são o que realmente o torna realidade, permitindo que tenha propriedades configuráveis, como um nome, descrição, imagem e outros atributos. Na parte 2 deste tutorial, descreveremos como configurar este metadado.

`mintNFT` chama alguns métodos da biblioteca ERC-721 herdada e, por fim, retorna um número que representa o ID do NFT recém-cunhado.

## Etapa 11: Conecte o MetaMask e a Alchemy ao seu projeto {#connect-metamask-and-alchemy}

Agora que criamos uma carteira MetaMask, uma conta Alchemy, e escrevemos o nosso contrato inteligente, é hora de vincular os três.

Toda transação enviada da sua carteira virtual requer uma assinatura, usando sua chave privada única. Para fornecer esta permissão a nosso programa, podemos armazenar nossa chave privada (e a chave Alchemy API) em um arquivo de ambiente.

Para saber mais sobre o envio de transações, confira [este tutorial](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) sobre o envio de transações usando web3.

Primeiro, instale o pacote dotenv na pasta do seu projeto:

    ```
    npm install dotenv --save
    ```

Em seguida, crie um arquivo `.env` no diretório raiz do nosso projeto e adicione sua chave privada do MetaMask e o URL da API HTTP da Alchemy a ele.

- Siga [estas instruções](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) para exportar sua chave privada do MetaMask

- Veja abaixo como obter o URL da API HTTP Alchemy e copiá-la para a área de transferência

![Copie a URL da sua API da Alchemy](./copy-alchemy-api-url.gif)

Seu `.env` deve agora se parecer com isto:

    ```
    API_URL="https://eth-sepolia.g.alchemy.com/v2/sua-chave-de-api"
    PRIVATE_KEY="sua-chave-privada-metamask"
    ```

Para realmente conectá-las ao nosso código, referenciaremos essas variáveis em nosso arquivo hardhat.config.js na etapa 13.

<EnvWarningBanner />

## Etapa 12: Instale o Ethers.js {#install-ethers}

Ethers.js é uma biblioteca que facilita a interação e a realização de solicitações à Ethereum, envolvendo os [métodos JSON-RPC padrão](/developers/docs/apis/json-rpc/) com métodos mais amigáveis ao usuário.

O Hardhat torna muito fácil a integração de [Plugins](https://hardhat.org/plugins/) para ferramentas adicionais e funcionalidades estendidas. Aproveitaremos o [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) para a implantação de contratos ([Ethers.js](https://github.com/ethers-io/ethers.js/) has some super clean contract deployment methods).

No diretório do seu projeto, digite:

    ```
    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0
    ```

Também precisaremos de ethers em nosso hardhat.config.js na próxima etapa.

## Etapa 13: Atualize o hardhat.config.js {#update-hardhat-config}

Até aqui, já adicionamos diversas dependências e plugins. Agora precisamos atualizar o hardhat.config.js para que nosso projeto reconheça todos eles.

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

## Etapa 14: Compile nosso contrato {#compile-contract}

Para ter certeza de que tudo está funcionando, vamos compilar nosso contrato. A tarefa de compilação é uma das tarefas integradas do Hardhat.

Na linha de comando, execute:

    ```
    npx hardhat compile
    ```

Você pode receber o aviso do identificador de licença SPDX não fornecido no arquivo fonte, mas não há necessidade de se preocupar com isso. Esperemos que tudo mais esteja bem! Se não, você sempre pode enviar uma mensagem no [Discord da Alchemy](https://discord.gg/u72VCg3).

## Etapa 15: Escreva nosso script de implantação {#write-deploy}

Agora que nosso contrato está escrito e nosso arquivo de configuração está pronto, é hora de escrever o script de implantação do contrato.

Navegue até a pasta `scripts/` e crie um novo arquivo chamado `deploy.js`, adicionando o seguinte conteúdo a ele:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Inicia a implantação, retornando uma promessa que se resolve em um objeto de contrato
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Contrato implantado para o endereço:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

A Hardhat faz um trabalho incrível explicando o que cada uma dessas linhas de código faz em seu [tutorial de Contratos](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), nós adotamos as explicações deles aqui.

    ```
    const MyNFT = await ethers.getContractFactory("MyNFT");
    ```

Uma ContractFactory em ethers.js é uma abstração usada para implantar novos contratos inteligentes, então a MyNFT aqui representa uma fábrica para instâncias do nosso contrato NFT. Ao usar o plug-in hardhat-ethers, as instâncias ContractFactory e Contract são conectadas ao primeiro signatário por padrão.

    ```
    const myNFT = await MyNFT.deploy();
    ```

Ao chamar deploy() em uma ContractFactory, a implantação se iniciará e retornará uma Promise que se resolve em um Contract. Este é o objeto que tem um método para cada uma de nossas funções de contrato inteligente.

## Etapa 16: Implante nosso contrato {#deploy-contract}

Finalmente estamos prontos para implantar o nosso contrato inteligente! Navegue de volta para a raiz do diretório do seu projeto e, na linha de comando, execute:

    ```
    npx hardhat --network sepo lia run scripts/deploy.js
    ```

Você deverá ver algo assim:

    ```
    Contrato implantado no endereço: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
    ```

Se formos ao [Etherscan da Sepolia](https://sepolia.etherscan.io/) e pesquisarmos o endereço do nosso contrato, poderemos ver que ele foi implantado com sucesso. Se você não puder ver o endereço imediatamente, por favor, aguarde um momento, pois pode levar algum tempo. A transação ficará parecida com isto:

![Veja o endereço da sua transação no Etherscan](./etherscan-sepoila-contract-creation.png)

O endereço do remetente (From) deve corresponder ao endereço da sua conta MetaMask e o endereço do destinatário (To) indicará “Criação de Contrato”. Se clicarmos na transação, veremos o nosso endereço de contrato no campo "To":

![Veja o endereço do seu contrato no Etherscan](./etherscan-sepolia-tx-details.png)

Sim! Você acabou de implantar seu contrato inteligente NFT na cadeia Ethereum (testnet)!

Para entender o que está acontecendo nos bastidores, vamos navegar para a guia Explorer em nosso [painel da Alchemy](https://dashboard.alchemyapi.io/explorer). Se você tem vários aplicativos Alchemy, certifique-se de filtrar por app e selecionar "MyNFT".

![Veja as chamadas feitas “nos bastidores” com o painel do Explorer da Alchemy](./alchemy-explorer-goerli.png)

Aqui você verá um punhado de chamadas JSON-RPC que Hardhat/Ethers fizeram em segundo plano para nós quando chamamos a função .deploy() . Dois pontos importantes a serem mencionados aqui são [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), que é a solicitação para realmente escrever nosso contrato inteligente na blockchain Sepolia, e [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash), que é uma solicitação para ler informações sobre nossa transação, dado o hash (um padrão típico ao enviar transações). Para saber mais sobre o envio de transações, confira este tutorial sobre o [envio de transações usando Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

Isso é tudo para a Parte 1 deste tutorial. Na [Parte 2, vamos interagir de fato com nosso contrato inteligente cunhando um NFT](/developers/tutorials/how-to-mint-an-nft/), e na [Parte 3, mostraremos como visualizar seu NFT em sua carteira Ethereum](/developers/tutorials/how-to-view-nft-in-metamask/)!
