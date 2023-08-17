---
title: Contrato inteligente "Hello World" para iniciantes
description: Tutorial introdutório sobre como escrever e implementar um contrato inteligente simples no Ethereum.
author: "elanh"
tags:
  - "solidity"
  - "hardhat"
  - "alchemy"
  - "contratos inteligentes"
  - "primeiros passos"
  - "implementação"
skill: beginner
lang: pt-br
published: 2021-03-31
---

Se você é novo no desenvolvimento de blockchain e não sabe por onde começar, ou se apenas deseja entender como implementar ou interagir com contratos inteligentes, este guia é para você. Mostraremos a você como criar e implementar um simples contrato inteligente na rede de testes Ropsten usando uma carteira virtual ([MetaMask](https://metamask.io/)), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/) e [Alchemy](https://alchemyapi.io/eth). Não se preocupe caso não entenda ainda o que tudo isso significa. Vamos explicar).

Na segunda parte deste tutorial, analisaremos como podemos interagir com nosso contrato inteligente uma vez que ele esteja implementado e, já na terceira parte, abordaremos como publicá-lo no Etherscan.

Caso surjam perguntas em qualquer momento, sinta-se à vontade para falar no Discord da [Alchemy](https://discord.gg/gWuC7zB)!

## Passo 1: Conecte-se à rede de Ethereum {#step-1}

Existem muitas maneiras de fazer solicitações à cadeia de Ethereum. Por simplicidade, usaremos uma conta gratuita na Alchemy, uma API e plataforma de desenvolvedores de blockchain, a qual permite nos comunicar com a cadeia de Ethereum sem ter que executar nossos próprios nós. A plataforma também possui ferramentas de desenvolvedor para monitorar e analisar; ferramentas das quais vamos tirar proveito neste tutorial, para entender o que está acontecendo nos bastidores da implantação de nosso contrato inteligente. Se ainda não tiver uma conta na Alchemy, você pode se cadastrar gratuitamente [neste link](https://dashboard.alchemyapi.io/signup).

## Passo 2: Crie seu aplicativo (e chave de API) {#step-2}

Assim que você criar uma conta na Alchemy, você pode gerar uma chave de API criando um app. Isso nos permitirá fazer solicitações à rede de testes Ropsten. Se não estiver familiarizado com as redes de teste, confira [esta página](/developers/docs/networks/).

1.  Vá até a página "Create App" no painel da Alchemy, passe o mouse sobre a palavra "Apps" na barra de navegação e clique em "Create App"

![Criar um aplicativo Hello World](./hello-world-create-app.png)

2. Nomeie seu aplicativo "Hello World", ofereça uma breve descrição, selecione "Staging" para o ambiente (usado para a contabilidade de seu app) e escolha "Ropsten" para sua rede.

![criar uma visualização do app hello world](./create-app-view-hello-world.png)

3. Clique em "Create App", e é isso e tudo! Seu app deveria aparecer na tabela abaixo.

## Passo 3: Crie uma conta (endereço) de Ethereum {#step-3}

Precisamos de uma conta de Ethereum para enviar e receber transações. Para este tutorial, usaremos uma carteira virtual no navegador, a MetaMask, para gerenciar o endereço da sua conta Ethereum. Mais sobre [transações](/developers/docs/transactions/).

Você pode baixar e criar uma conta MetaMask gratuitamente [neste link](https://metamask.io/download.html). Quando estiver criando uma conta, ou se já tiver uma, certifique-se de mudar para a "Ropsten Test Network", no canto superior direito (para não precisar lidar com dinheiro de verdade).

![exemplo metamask ropsten](./metamask-ropsten-example.png)

## Passo 4: Adicione ether de um faucet {#step-4}

Para implementar nosso contrato inteligente na rede de teste, precisaremos de alguns ETHs de imitação. Para obter ETH você pode ir para o [faucet da Ropsten](https://faucet.dimensions.network/), inserir seu endereço de conta Ropsten e clicar em "Send Ropsten ETH". Devido ao tráfego de rede, pode levar algum tempo até receber o seu ETH de imitação. Você deveria ver o ETH na sua conta MetaMask logo depois!

## Passo 5: Verifique seu saldo {#step-5}

Para verificar novamente que temos saldo, vamos fazer uma solicitação através da ferramenta [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) fornecida pelo [compositor da Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Ele mostrará a quantidade de ETH em nossa carteira. Depois de inserir o endereço da sua conta da MetaMask e clicar em "Send Request", você verá uma resposta como esta:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **OBSERVAÇÃO:** este resultado é em wei não em ETH. Lembre-se de que o wei é a menor unidade do ether. A conversão de wei para ETH é 1 ETH = 10<sup>18</sup> wei. Desta maneira, se convertermos 0x2B5E3AF16B1880000 em decimal obteremos 5\*10¹⁸, o que equivale a 5 ETH.
>
> Ufa! Nosso dinheiro de imitação está todo aí <Emoji text=":money_mouth_face:" size={1} />.

## Passo 6: Inicialize nosso projeto {#step-6}

Primeiramente, precisaremos criar uma pasta para o nosso projeto. Navegue até sua linha de comando e digite:

```
mkdir hello-world
cd hello-world
```

Agora que estamos dentro da pasta do nosso projeto, vamos usar o comando `npm init `para inicializar o projeto. Se você ainda não tiver o npm instalado, siga [estas instruções](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm). Também vamos precisar do node.js, então baixe-o também!

```
npm init
```

Não importa muito como você responde às questões sobre a instalação. A modo de referência, aqui está o que nós fizemos:

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/.../.../.../hello-world/package.json:

{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "hello world smart contract",
  "main": "index.js",
  "scripts": {
     "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Aprove o package.json e estaremos prontos para começar!

## Passo 7: Baixe o [Hardhat](https://hardhat.org/getting-started/#overview){#step-7}

Hardhat é um ambiente de desenvolvimento para compilar, implementar, testar e depurar seu software de Ethereum. Ele ajuda os desenvolvedores na criação de contratos inteligentes e dApps localmente antes de serem implementados na cadeia online.

Dentro de nosso projeto `hello-world` execute:

```
npm install --save-dev hardhat
```

Para mais detalhes, confira esta página sobre as [instruções de instalação](https://hardhat.org/getting-started/#overview).

## Passo 8: Crie um projeto Hardhat {#step-8}

Dentro da nossa pasta do projeto, execute:

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

👷 Welcome to Hardhat v2.0.11 👷‍?

O que você deseja fazer? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Isso vai gerar um arquivo `hardhat.config.js` onde especificaremos todas as configurações para o nosso projeto (no passo 13).

## Passo 9: Adicione pastas do projeto {#step-9}

Para manter nosso projeto organizado vamos criar duas pastas novas. Navegue até o diretório raiz do seu projeto na sua linha de comando e digite:

```
mkdir contracts
mkdir scripts
```

- `contracts/` é onde nós vamos manter o arquivo de código do contrato inteligente "hello world"
- `scripts/` é onde nós vamos manter scripts para implantar e interagir com nosso contrato

## Passo 10: Escreva nosso contrato {#step-10}

Você pode estar se perguntando, quando é que nós vamos escrever códigos? Bem, aqui estamos, no passo 10.

Abra o projeto hello-world em seu editor favorito (nós preferimos o [VSCode](https://code.visualstudio.com/)). Os contratos inteligentes são escritos em uma linguagem chamada Solidity, que usaremos para escrever nosso contrato inteligente HelloWorld.sol

1.  Navegue até a pasta "contracts" e crie um novo arquivo chamado HelloWorld.sol
2.  Veja abaixo uma amostra de contrato inteligente "Hello World" da Ethereum Foundation, que usaremos neste tutorial. Copie e cole os itens abaixo em seu arquivo HelloWorld.sol e não se esqueça de ler os comentários para entender o que este contrato faz:

```solidity
// Especifica a versão do Solidity usando a versão semântica.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Defines a contract named `HelloWorld`.
// Um contrato é uma coleção de funções e dados (seu estado). Uma vez implantado, um contrato reside em um endereço específico na blockchain Ethereum. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Declares a state variable `message` of type `string`.
   // Variáveis de estado são variáveis cujos valores são permanentemente armazenados no armazenamento do contrato. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Os construtores são usados para inicializar os dados do contrato. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Este é um contrato inteligente muito simples, que armazena uma mensagem ao ser criado e pode ser atualizado através da função `update`.

## Passo 11: Vincule MetaMask e Alchemy a seu projeto {#step-11}

Nós já criamos uma carteira MetaMask, uma conta Alchemy e já escrevemos nosso contrato inteligente. Agora é hora de vincularmos os três.

Toda transação enviada da sua carteira virtual requer uma assinatura, usando sua chave privada única. Para fornecer essa permissão ao nosso programa, nós podemos armazenar com segurança nossa chave privada (e a chave Alchemy API) em um arquivo de ambiente.

> Para saber mais sobre o envio de transações, confira [este tutorial](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) sobre o envio de transações usando web3.

Primeiro, instale o pacote dotenv na pasta do seu projeto:

```
npm install dotenv --save
```

Depois, crie um arquivo `.env` no diretório raiz do seu projeto e adicione sua chave MetaMask privada e o URL da API HTTP Alchemy nele.

- Siga [estas instruções](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) para exportar sua chave privada
- Veja abaixo como obter o URL da API HTTP Alchemy

![obter chave da alchemy api](./get-alchemy-api-key.gif)

Copiar o URL da Alchemy API

Seu arquivo `.env` ficará assim:

```
API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Para realmente vinculá-los a nosso código, vamos fazer referência a essas variáveis em nosso arquivo `hardhat.config.js` no passo 13.

<InfoBanner isWarning>
Don't commit <code>.env</code>! Please make sure never to share or expose your <code>.env</code> file with anyone, as you are compromising your secrets in doing so. If you are using version control, add your <code>.env</code> to a <a href="https://git-scm.com/docs/gitignore">gitignore</a> file.
</InfoBanner>

## Passo 12: Instale o Ethers.js {#step-12-install-ethersjs}

Ethers.js é uma biblioteca que facilita a interação e o envio de solicitações ao Ethereum ao incorporar [métodos padrões JSON-RPC](/developers/docs/apis/json-rpc/) a outros métodos mais amigáveis ao usuário.

Hardhat torna muito fácil a integração de [plugins](https://hardhat.org/plugins/), para ferramentas adicionais e funcionalidades extendidas. Aproveitaremos o [plugin Ethers](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) para implantação de contratos. ([Ethers.js](https://github.com/ethers-io/ethers.js/) tem alguns métodos de implantação de contratos bastante claros).

No diretório do projeto, digite:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Também vamos precisar de ethers em nosso `hardhat.config.js` no próximo passo.

## Passo 13: Atualize o hardhat.config.js {#step-13-update-hardhatconfigjs}

Até aqui, já adicionamos diversas dependências e plugins. Agora precisamos atualizar o `hardhat.config.js` para que nosso projeto reconheça todos eles.

Atualize seu `hardhat.config.js` para ficar assim:

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "ropsten",
   networks: {
      hardhat: {},
      ropsten: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

## Passo 14: Compile nosso contrato {#step-14-compile-our-contracts}

Para ter certeza de que tudo está funcionando, vamos compilar nosso contrato. A tarefa `compile` é uma das tarefas integradas do Hardhat.

Na linha de comando, execute:

```
npx hardhat compile
```

Você pode receber o aviso `SPDX license identifier not provided in source file`, mas não há necessidade de se preocupar com isso. Esperemos que tudo mais esteja bem! Se não, você sempre pode enviar uma mensagem no [discord Alchemy](https://discord.gg/u72VCg3).

## Passo 15: Escreva nosso script de implantação {#step-15-write-our-deploy-scripts}

Agora que nosso contrato está escrito e nosso arquivo de configuração está pronto, é hora de escrever o script de implantação do contrato.

Navegue até a pasta `scripts/` e crie um novo arquivo chamado `deploy.js`, adicionando o seguinte conteúdo:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

A Hardhat fez um trabalho incrível ao explicar o que cada uma dessas linhas de código faz em seu [Tutorial sobre contratos](https://hardhat.org/tutorial/testing-contracts.html#writing-tests). Adotamos aqui as explicações deles.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Uma `ContractFactory` em ethers.js é uma abstração usada para implantar novos contratos inteligentes, então, aqui, `HelloWorld` representa uma fábrica para instâncias do nosso contrato Hello World. Ao usar o plug-in `hardhat-ethers`, as instâncias `ContractFactory` e `Contract` são conectadas ao primeiro signatário por padrão.

```
const hello_world = await HelloWorld.deploy();
```

Ao chamar `deploy()` em uma `ContractFactory`, a implantação se iniciará e retornará uma `Promise` que se resolve em um `Contract`. Este é o objeto que tem um método para cada uma de nossas funções de contrato inteligente.

## Passo 16: Implante nosso contrato {#step-16-deploy-our-contract}

Finalmente estamos prontos para implantar o nosso contrato inteligente! Navegue até a linha de comando e digite:

```
npx hardhat run scripts/deploy.js --network ropsten
```

Você deverá ver algo assim:

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Se formos para a [etherscan Ropsten](https://ropsten.etherscan.io/) e procurarmos o endereço de nosso contrato, poderemos ver se ele foi implantado com sucesso. A transação ficará parecida com isto:

![contrato etherscan](./etherscan-contract.png)

O endereço `From` deve corresponder ao endereço da sua conta MetaMask, e o endereço "Para" vai dizer "Criação de contrato", mas se clicarmos na transação veremos o endereço do nosso contrato no campo `To`:

![transação etherscan](./etherscan-transaction.png)

Parabéns! Você acaba de implantar um contrato inteligente para a cadeia Ethereum 🎉

Para entender o que está acontecendo nos bastidores, vamos navegar até a guia Explorer no [painel do Alchemy](https://dashboard.alchemyapi.io/explorer). Se você tem vários aplicativos Alchemy, certifique-se de filtrar por app e selecionar “Hello World”. ![explorador hello world](./hello-world-explorer.png)

Aqui você verá um punhado de chamadas JSON-RPC que Hardhat/Ethers fizeram em segundo plano para nós quando chamamos a função `.deploy() `. Duas importantes chamadas aqui são a [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), que é o pedido para realmente escrever nosso contrato inteligente na cadeia de Ropsten, e a [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), que é um pedido para ler informações sobre nossa transação, dado o hash (um padrão típico ao enviar transações). Para saber mais sobre o envio de transações, confira este tutorial em [ sobre como enviar transações usando a Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)

Isso é tudo para a parte 1 deste tutorial. Na parte 2, [interagiremos com nosso contrato inteligente](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#part-2-interact-with-your-smart-contract) atualizando nossa mensagem inicial e, na parte 3, [publicaremos nosso contrato inteligente no Etherscan](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#optional-part-3-publish-your-smart-contract-to-etherscan) para que todos aprendam como interagir com ele.

**Quer aprender mais sobre Alchemy? Confira nosso [site](https://alchemyapi.io/eth). Não quer perder nenhuma atualização? Assine o nosso boletim informativo [aqui](https://www.alchemyapi.io/newsletter)! Não se esqueça também de nos seguir no [Twitter](https://twitter.com/alchemyplatform) e participar do nosso [Discord](https://discord.com/invite/u72VCg3)**.
