---
title: Como escrever e implantar um NFT (Primeira parte da série de tutoriais sobre NFT)
description: Este tutorial é a parte 1 de uma série sobre NFTs que o guiará passo a passo sobre como escrever e implantar um contrato inteligente não fungível (token ERC-721) usando Ethereum e o sistema de arquivos do Inter Planetary (IPFS).
author: "Sumi Mudgil"
tags:
  - "ERC-721"
  - "Alchemy"
  - "Solidity"
  - "contratos inteligentes"
skill: beginner
lang: pt-br
published: 2021-04-22
---

Com os NFTs trazendo a blockchain aos olhos do público, agora é uma excelente oportunidade para entender a tendência publicando seu próprio contrato NFT (ERC-721 Token) na blockchain Ethereum!

A Alchemy tem muito orgulho por estar no espaço NFT com os maiores nomes incluindo Makersplace (recentemente atingiu a marca de 69 milhões de doláres em vendas de artes digitais), Dapper Labs (criadores do NBA Top Shot e Crypto Kitties), OpenSea (o maior mercado de NFT do mundo), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable e muito mais.

Neste tutorial, veremos como criar e implantar um contrato inteligente ERC-721 na rede de teste Goerli usando [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) e [Alchemy](https://alchemy.com/signup/eth) (não se preocupe se você não entender o que isso significa — vamos explicar!).

Na parte 2 deste tutorial, veremos como podemos usar nosso contrato inteligente para gerar NFT, e na Parte 3, explicaremos como ver seu NFT no MetaMask.

E claro, se você tiver dúvidas a qualquer momento, acesso o [Alchemy Discord](https://discord.gg/gWuC7zB) ou visite a página de [Documentação sobre a API NFT da Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)!

## Etapa 1: Se conectar à rede Ethereum {#connect-to-ethereum}

Existem várias maneiras de fazer solicitações para a blockchain Ethereum, mas para facilitar as coisas, usaremos uma conta gratuita na [Alchemy](https://alchemy.com/signup/eth), uma plataforma e API de desenvolvedores de blockchain que nos permite nos comunicar com a cadeia Ethereum sem ter que executar os nossos próprios nós.

Neste tutorial, também aproveitaremos as ferramentas de desenvolvedor da Alchemy para fins de monitoramento e análise, para entender o que está acontecendo nos bastidores da nossa implantação de contrato inteligente. Se você ainda não tiver uma conta da Alchemy, inscreva-se gratuitamente [aqui](https://alchemy.com/signup/eth).

## Etapa 2: Criar seu aplicativo (e chave de API) {#make-api-key}

Assim que criar uma conta na Alchemy, você pode gerar uma chave de API criando um "app". Isso nos permitirá fazer solicitações na rede de teste Goerli. Confira [este guia](https://docs.alchemyapi.io/guides/choosing-a-network) se você está curioso para aprender mais sobre as redes de teste.

1. Vá até a página "Create App" no painel da Alchemy, passe o mouse sobre a palavra "Apps" na barra de navegação e clique em "Create App"

![Crie seu aplicativo](./create-your-app.png)

2. Nomeie seu aplicativo (escolhemos “Meu primeiro NFT!”), faça uma breve descrição dele, selecione “Ethereum” para a cadeia e escolha “Goerli” para sua rede. Desde a fusão, as outras redes de teste foram descontinuadas.

![Configure e publique seu aplicativo](./configure-and-publish-your-app.png)

3. Clique em "Create App", e é isso e tudo! Seu app deveria aparecer na tabela abaixo.

## Etapa 3: Criar uma conta Ethereum (endereço) {#create-eth-address}

Precisamos de uma conta Ethereum para enviar e receber transações. Para este tutorial, usaremos uma carteira virtual no navegador, a MetaMask, para gerenciar o endereço da sua conta Ethereum. Se você quiser entender mais sobre como as transações no Ethereum funcionam, confira [esta página](/developers/docs/transactions/) na Fundação Ethereum.

Você pode baixar e criar uma conta MetaMask gratuitamente [neste link](https://metamask.io/download.html). Quando você estiver criando uma conta, ou se já tiver uma conta, certifique-se de mudar para a “Rede de teste Goerli”, no canto superior direito (para que não estejamos lidando com dinheiro real).

![Defina Goerli como sua rede](./metamask-goerli.png)

## Etapa 4: Adicionar ether de um faucet {#step-4-add-ether-from-a-faucet}

Para implementar nosso contrato inteligente na rede de teste, precisaremos de alguns ETHs de imitação. Para obter ETH, você pode acessar [Goerli Faucet](https://goerlifaucet.com/) hospedado pela Alchemy, fazer login e inserir o endereço da sua conta, clicar em "Send Me ETH". Você deveria ver o ETH na sua conta MetaMask logo depois!

## Etapa 5: Verificar seu saldo {#check-balance}

Para verificar novamente que temos saldo, vamos fazer uma solicitação através da ferramenta [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) fornecida pelo [compositor da Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Ele mostrará a quantidade de ETH em nossa carteira. Depois de inserir o endereço da sua conta da MetaMask e clicar em "Send Request", você verá uma resposta como esta:

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **Nota** Este resultado está em wei, não em ETH. Lembre-se de que o wei é a menor unidade do ether. A conversão de wei para ETH é 1 eth = 10<sup>18</sup> wei. Então, se convertemos 0xde0b6b3a7640000 para decimal, temos 1\*10<sup>18</sup> wei, que é igual a 1 ETH.

Ufa! O nosso dinheiro falso está todo lá.

## Etapa 6: Dar início a nosso projeto {#initialize-project}

Primeiro, precisamos criar uma pasta para o nosso projeto. Navegue até sua linha de comando e digite:

    mkdir my-nft
    cd my-nft

Agora que estamos dentro da pasta do nosso projeto, vamos usar npm init para inicializá-lo. Se você ainda não tiver o npm instalado, siga [estas instruções](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (nós também vamos precisar do [Node.js](https://nodejs.org/en/download/), então baixe isso também!).

    npm init

Não importa realmente como você responde às questões de instalação; aqui está o que utilizamos de referência:

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

Aprove o package.json e estamos prontos para começar!

## Etapa 7: Instalar o [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat é um ambiente de desenvolvimento para compilar, implementar, testar e depurar seu software de Ethereum. Ele ajuda os desenvolvedores na criação de contratos inteligentes e dapps localmente antes de implantar na cadeia real.

Dentro do nosso projeto my-nft execute:

    npm install --save-dev hardhat

Para mais detalhes, confira esta página sobre as [instruções de instalação](https://hardhat.org/getting-started/#overview).

## Etapa 8: Criar o projeto Hardhat {#create-hardhat-project}

Dentro da nossa pasta de projeto, execute:

    npx hardhat

Você deve então ver uma mensagem de boas-vindas e a opção de selecionar o que quer fazer. Selecione "criar uma hardhat.config.js vazia":

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? O que você deseja fazer? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

Isso vai gerar um arquivo hardhat.config.js, no qual especificaremos todas as configurações para o nosso projeto (no passo 13).

## Etapa 9: Adicionar as pastas do projeto {#add-project-folders}

Para manter a organização do nosso projeto, vamos criar duas novas pastas. Navegue até o diretório raiz do seu projeto na sua linha de comando e digite:

    mkdir contracts
    mkdir scripts

- contracts/ é onde manteremos o nosso código de contrato inteligente para o NFT

- scripts/ é onde manteremos scripts para implantar e interagir com nosso contrato inteligente

## Etapa 10: Escrever nosso contrato {#write-contract}

Agora que nosso ambiente de trabalho está configurado, iremos para a parte mais emocionante: _escrever nosso contrato de código inteligente!_

Abra o projeto my-nft no seu editor favorito (nós gostamos do [VSCode](https://code.visualstudio.com/)). Os contratos inteligentes são escritos em uma linguagem chamada Solidity, que usaremos para escrever nosso contrato inteligente MyNFT.sol.

1. Navegue até a pasta de `contracts` e crie um novo arquivo chamado MyNFT.sol

2. Abaixo está o nosso código de contrato inteligente NFT, nossa base para a implementação do ERC-721 da biblioteca [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721). Copie e cole o conteúdo abaixo no seu arquivo MyNFT.sol.

   ```solidity
   //Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
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

3. Como estamos herdando classes da biblioteca de contratos OpenZeppelin, na linha de comando execute `npm install @openzeppelin/contracts` para instalar a biblioteca em nossa pasta.

Então, o que esse código _faz_ exatamente? Vamos por partes, linha por linha.

No topo do nosso contrato inteligente, importamos três [classes de contrato inteligente OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol contém a implementação do padrão ERC-721, que nosso contrato inteligente NFT herdará. (Para ser um NFT válido, seu contrato inteligente deve implementar todos os métodos do padrão ERC-721.) Para saber mais sobre as funções herdadas do ERC-721, confira a definição da interface [aqui](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/utils/Counters.sol fornece contadores que só podem ser incrementados ou diminuídos por um. Nosso contrato inteligente usa um contador para acompanhar o número total de NFTs impressos e definir o ID exclusivo em nosso novo NFT. (Cada NFT cunhado usando um contrato inteligente deve ter um ID único – aqui nosso ID exclusivo é determinado pelo número total de NFTs existentes. Por exemplo, o primeiro NFT que cunhamos com o nosso contrato inteligente tem um ID igual a "1," nosso segundo NFT tem um ID igual a "2," etc.)

- @openzeppelin/contratos/access/Ownable.sol configura [controle de acesso](https://docs.openzeppelin.com/contracts/3.x/access-control) em nosso contrato inteligente, então apenas o proprietário do contrato inteligente (você) pode 'cunhar' NFTs. (Observação, incluir controle de acesso é inteiramente uma preferência. Se você quer que qualquer pessoa consiga gerar um NFT usando seu contrato inteligente, remove a palavra "Ownable" na linha 10 e "onlyOwner" na linha 17.)

Depois de seguir nossas instruções de importação, temos o nosso contrato inteligente de NFT, que é surpreendentemente curto – contém apenas um contador, um construtor e uma única função! Isso se deve aos nossos contratos OpenZeppelin herdados, que implementam a maioria dos métodos de que precisamos para criar um NFT, tal como `ownerOf`, que retorna o proprietário do NFT, e `transferFrom`, que transfere a propriedade do NFT de uma conta para outra.

No nosso construtor ERC-721, você notará que transmitimos duas cadeias de caracteres: "MyNFT" e "NFT" A primeira variável é o nome do contrato inteligente e a segunda é símbolo dele. Você pode nomear cada uma dessas variáveis como quiser!

Finalmente, temos nossa função `mintNFT(destinatário de endereço, string memory tokenURI)`, que nos permite cunhar um NFT! Você vai notar que essa função recebe duas variáveis:

- `address recipient` especifica o endereço que receberá o seu NFT recém-cunhado

- `string memory tokenURI` é uma string que deve ser resolvida em um documento JSON que descreve os metadados do NFT. Os metadados de um NFT são o que realmente o torna realidade, permitindo que tenha propriedades configuráveis, como um nome, descrição, imagem e outros atributos. Na parte 2 deste tutorial, descreveremos como configurar este metadado.

`mintNFT` chama alguns métodos da biblioteca ERC-721 herdada, e retorna um número que representa a ID do NFT recém-cunhado.

## Etapa 11: Vincular as contas MetaMask e Alchemy a seu projeto {#connect-metamask-and-alchemy}

Agora que criamos uma carteira MetaMask, uma conta Alchemy, e escrevemos o nosso contrato inteligente, é hora de vincular os três.

Toda transação enviada da sua carteira virtual requer uma assinatura, usando sua chave privada única. Para fornecer esta permissão a nosso programa, podemos armazenar nossa chave privada (e a chave Alchemy API) em um arquivo de ambiente.

Para saber mais sobre o envio de transações, confira [este tutorial](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) sobre o envio de transações usando web3.

Primeiro, instale o pacote dotenv na pasta do seu projeto:

    npm install dotenv --save

Então crie um arquivo `.env` no diretório raiz do nosso projeto e adicione sua chave privada do MetaMask e sua URL HTTP da API Alchemy a ele.

- Siga [estas instruções](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) para exportar sua chave privada do MetaMask

- Veja abaixo como obter o URL da API HTTP Alchemy e copiá-la para a área de transferência

![Copie o URL da API Alchemy](./copy-alchemy-api-url.gif)

Seu arquivo `.env` ficará assim:

    API_URL="https://eth-goerli.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

Para realmente conectá-las ao nosso código, referenciaremos essas variáveis em nosso arquivo hardhat.config.js na etapa 13.

<InfoBanner isWarning={true}>
No faça commit do <code>.env</code>! Por favor, tenha certeza de nunca compartilhar ou expor seu arquivo <code>.env</code> com ninguém, pois estará comprometendo suas partes secretas ao fazê-lo. Se estiver usando um controle de versão, adicione seu <code>.env</code> ao arquivo <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</InfoBanner>

## Etapa 12: Instalar o Ethers.js {#install-ethers}

Ethers.js é uma biblioteca que facilita a interação e o envio de solicitações ao Ethereum ao incorporar [métodos padrões JSON-RPC](/developers/docs/apis/json-rpc/) a outros métodos mais amigáveis ao usuário.

Hardhat torna muito fácil a integração de [plugins](https://hardhat.org/plugins/), para ferramentas adicionais e funcionalidades extendidas. Aproveitaremos o [plugin Ethers](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) para implantação de contratos. ([Ethers.js](https://github.com/ethers-io/ethers.js/) tem alguns métodos de implantação de contratos bastante claros).

No diretório do seu projeto, digite:

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

Também precisaremos de ethers em nosso hardhat.config.js na próxima etapa.

## Etapa 13: Atualizar hardhat.config.js {#update-hardhat-config}

Até aqui, já adicionamos diversas dependências e plugins. Agora precisamos atualizar o hardhat.config.js para que nosso projeto reconheça todos eles.

Atualize seu hardhat.config.js para ficar assim:

    /**
    * @type import('hardhat/config').HardhatUserConfig
    */
    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
       defaultNetwork: "goerli",
       networks: {
          hardhat: {},
          goerli: {
             url: API_URL,
             accounts: [`0x${PRIVATE_KEY}`]
          }
       },
    }

## Etapa 14: Compilar nosso contrato {#compile-contract}

Para ter certeza de que tudo está funcionando, vamos compilar nosso contrato. A tarefa de compilação é uma das tarefas integradas do Hardhat.

Na linha de comando, execute:

    npx hardhat compile

Você pode receber o aviso "SPDX license identifier not provided in source file", mas não há necessidade de se preocupar com isso. Esperamos que tudo mais esteja bem! Se não, você sempre pode enviar uma mensagem no [discord Alchemy](https://discord.gg/u72VCg3).

## Etapa 15: Escrever nosso script de implantação {#write-deploy}

Agora que nosso contrato está escrito e nosso arquivo de configuração está pronto, é hora de escrever o script de implantação do contrato.

Navegue até a pasta `scripts/` e crie um novo arquivo chamado `deploy.js`, adicionando o seguinte conteúdo:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Start deployment, returning a promise that resolves to a contract object
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

A Hardhat fez um trabalho incrível ao explicar o que cada uma dessas linhas de código faz em seu [Tutorial sobre contratos](https://hardhat.org/tutorial/testing-contracts.html#writing-tests). Adotamos aqui as explicações deles.

    const MyNFT = await ethers.getContractFactory("MyNFT");

Uma ContractFactory em ethers.js é uma abstração usada para implantar novos contratos inteligentes, então, MyNFT aqui representa uma fábrica para instâncias do nosso contrato NFT. Ao usar o plug-in hardhat-ethers, as instâncias ContractFactory e Contract são conectadas ao primeiro signatário por padrão.

    const myNFT = await MyNFT.deploy();

Ao chamar deploy() em uma ContractFactory, a implantação se iniciará e retornará uma Promise que se resolve em um Contract. Este é o objeto que tem um método para cada uma de nossas funções de contrato inteligente.

## Etapa 16: Implantar nosso contrato {#deploy-contract}

Finalmente estamos prontos para implantar o nosso contrato inteligente! Navegue de volta para a raiz do diretório do seu projeto e, na linha de comando, execute:

    npx hardhat --network goerli run scripts/deploy.js

Você deverá ver algo assim:

    Contrato implantado no endereço: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650

Se nós formos ao [Goerli etherscan](https://goerli.etherscan.io/) e procurarmos pelo endereço do nosso contrato, conseguiremos ver que ele foi implantado com sucesso. Se você não conseguir ver o endereço imediatamente, aguarde um momento, pois pode demorar algum tempo. A transação ficará parecida com isto:

![Veja o seu endereço de transação no Etherscan](./etherscan-goerli-contract-creation.png)

O endereço do remetente (From) deve corresponder ao seu endereço da conta MetaMask e o endereço do destinatário (To) deve dizer "Contract Creation". Se clicarmos na transação, veremos o nosso endereço de contrato no campo "To":

![Veja o seu endereço de contrato no Etherscan](./etherscan-goerli-tx-details.png)

Sim! Você acabou de implantar seu contrato inteligente NFT na cadeia Ethereum (testnet)!

Para entender o que está acontecendo nos bastidores, vamos navegar até a guia Explorer no [painel do Alchemy](https://dashboard.alchemyapi.io/explorer). Se você tem vários aplicativos Alchemy, certifique-se de filtrar por app e selecionar "MyNFT".

![Exibir chamadas feitas "em segundo plano" com o Explorer Dashboard do Alquimia](./alchemy-explorer-goerli.png)

Aqui você verá um punhado de chamadas JSON-RPC que Hardhat/Ethers fizeram em segundo plano para nós quando chamamos a função .deploy() . Duas chamadas importantes aqui são [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), que é o pedido para realmente escrever nosso contrato inteligente na cadeia Goerli e [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash) que é um pedido para ler informações sobre nossa transação, conforme o hash (um padrão típico ao enviar transações). Para saber mais sobre o envio de transações, confira [este tutorial](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) sobre como enviar transações usando a Web3.

Isso é tudo para a Parte 1 deste tutorial. Na [Parte 2, interagiremos com o nosso contrato inteligente cunhando um NFT](/developers/tutorials/how-to-mint-an-nft/), e na [Parte 3, mostraremos como ver o seu NFT na sua carteira Ethereum](/developers/tutorials/how-to-view-nft-in-metamask/)!
