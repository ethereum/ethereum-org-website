---
title: Contrato inteligente "Hello World" para iniciantes - Fullstack
description: Tutorial introdutório sobre como escrever e implementar um contrato inteligente simples no Ethereum.
author: "nstrike2"
tags:
  - "solidity"
  - "hardhat"
  - "alchemy"
  - "contratos inteligentes"
  - "implementação"
  - "blockexplorer"
  - "front-end"
  - "transações"
skill: beginner
lang: pt-br
published: 2021-10-25
---

Este guia é para você que é iniciante em desenvolvimento de blockchain e não sabe por onde começar ou como implantar e interagir com contratos inteligentes. Nós iremos passar por criação e implantação de um contrato inteligente simples na rede de teste Goerli, usando [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org), e [Alchemy](https://alchemyapi.io/eth).

Você irá precisar de uma conta Alchemy para completar este tutorial. [Registre-se para uma conta grátis](https://www.alchemy.com/).

E claro, se você tiver alguma dúvida em qualquer momento, não hesite em entrar no [Discord da Alchemy](https://discord.gg/gWuC7zB)!

## Parte 1 - Criando e Implantando seu Contrato Inteligente usando Hardhat {#part-1}

### Conectar-se à rede Ethereum {#connect-to-the-ethereum-network}

Existem muitas maneiras de fazer solicitações à cadeia de Ethereum. Para simplificar, usaremos uma conta gratuita na Alchemy, uma plataforma de desenvolvedores de blockchain e API que nos permite comunicar com a cadeia Ethereum sem termos que executar nosso próprio nó. A Alchemy também possui ferramentas de desenvolvedor para monitoração e análise. Neste tutorial, vamos aproveitá-las para entender o que está acontecendo nos bastidores da implantação do nosso contrato inteligente.

### Crie o seu app e sua chave API {#create-your-app-and-api-key}

Assim que criar uma conta na Alchemy, você poderá gerar uma chave API criando um app. Isso nos permitirá fazer solicitações na rede de teste Goerli. Se você não estiver familiarizado com redes de teste, você pode [ler o guia da Alchemy para escolher uma rede](https://docs.alchemyapi.io/guides/choosing-a-network).

No painel da Alchemy, encontre o item **Apps** no menu suspenso na barra de navegação e selecione **Criar aplicativo**.

![Criar um aplicativo Hello World](./hello-world-create-app.png)

Dê ao seu app o nome “_Olá, Mundo_” e escreva uma breve descrição. Selecione **Staging** como o seu ambiente, e **Goerli** como a sua rede.

![criar uma visualização do app hello world](./create-app-view-hello-world.png)

_Observação: certifique-se de selecionar **Goerli**, ou este tutorial não funcionará._

Clique em **Criar app**. Seu app aparecerá na tabela abaixo.

### Cria uma conta Ethereum {#create-an-ethereum-account}

Você precisa de uma conta Ethereum para enviar e receber transações. Nós usaremos MetaMask, a carteira virtual no navegador que permite usuários gerenciarem o endereço da sua conta Ethereum.

Você pode baixar e criar uma conta MetaMask gratuitamente [neste link](https://metamask.io/download.html). Quando você estiver criando uma conta, ou se já tiver uma conta, certifique-se de mudar para a “Rede de teste Goerli”, no canto superior direito (para que não estejamos lidando com dinheiro real).

### Etapa 4: Adicionar ether de um faucet {#step-4-add-ether-from-a-faucet}

Para implantar nosso contrato inteligente na rede de teste, precisaremos de alguns ETHs falsos. Para conseguir ETH da rede Goerli, vá para o Goerli faucet e entre o endereço da sua conta Goerli. Note that Goerli faucets can be a bit unreliable recently - see the [test networks page](/developers/docs/networks/#goerli) for a list of options to try:

_Nota: devido a tráfego de rede, isto pode demorar um pouco._

### Etapa 5: Verificar seu saldo {#step-5-check-your-balance}

Para garantir que o ETH está na sua carteira, vamos fazer uma chamada [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) usando a [ferramenta de composição da Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Ele mostrará a quantidade de ETH em nossa carteira. Para saber mais, confira o [Breve tutorial da Alchemy sobre como usar a ferramenta de composição](https://youtu.be/r6sjRxBZJuU).

Insira o endereço da sua conta MetaMask e clique em **Send Request**. Você verá a resposta que se parece com o pedação de código abaixo.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Nota: Este resultado é em wei, não ETH. Lembre-se de que "Wei" é a menor unidade de ether._

Ufa! O nosso dinheiro falso está todo lá.

### Etapa 6: Dar início a nosso projeto {#step-6-initialize-our-project}

Primeiro, precisamos criar uma pasta para o nosso projeto. Navegue para a sua linha de comando e entre o seguinte.

```
mkdir hello-world
cd hello-world
```

Agora que estamos dentro da pasta do nosso projeto, vamos usar o comando `npm init `para inicializar o projeto.

> Se você não tem npm instalado ainda, siga [essas instruções para instalar o Node.js e o npm](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

Para finalidade deste tutorial, não importa como você responde às questões de inicialização. Aqui está como nós fizemos para referência:

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
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Aprove o package.json e estaremos prontos para começar!

### Passo 7: Baixar Hardhat {#step-7-download-hardhat}

Hardhat é um ambiente de desenvolvimento para compilar, implementar, testar e depurar seu software de Ethereum. Ele ajuda os desenvolvedores na criação de contratos inteligentes e dapps localmente antes de implantar na cadeia real.

Dentro de nosso projeto `hello-world` execute:

```
npm install --save-dev hardhat
```

Para mais detalhes, confira esta página sobre as [instruções de instalação](https://hardhat.org/getting-started/#overview).

### Etapa 8: Criar o projeto Hardhat {#step-8-create-hardhat-project}

Dentro da pasta do nosso projeto `hello-world`, rode:

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

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Isto irá gerar um arquivo `hardhat.config.js` no projeto. Usaremos isso mais tarde neste tutorial para especificar a configuração do nosso projeto.

### Etapa 9: Adicionar as pastas do projeto {#step-9-add-project-folders}

Para manter a organização do nosso projeto, vamos criar duas novas pastas. No comando de linha, navegue para o diretório raiz do nosso projeto `hello-world` e digite:

```
mkdir contracts
mkdir scripts
```

- `contracts/` é onde nós vamos manter o arquivo de código do contrato inteligente "hello world"
- `scripts/` é onde nós vamos manter scripts para implantar e interagir com nosso contrato

### Etapa 10: Escrever nosso contrato {#step-10-write-our-contract}

Você pode estar se perguntando, quando é que nós vamos escrever código? Está na hora!

Abra o projeto hello-world no seu editor favorito. Contratos inteligentes são mais comumente escritos em Solidity, o que nós usaremos para escrever o nosso contrato inteligente.

1. Navegue para a pasta `contracts` e crie um novo arquivo chamado `HelloWorld.sol`
2. Veja abaixo uma amostra de contrato inteligente “Hello World”, que usaremos neste tutorial. Copie o conteúdo abaixo no arquivo `HelloWorld.sol`.

_Nota: Certifique-se de ler os comentários para entender o que o contrato faz._

```
// Especifica a versão do Solidity usando a versão semântica.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Defines a contract named `HelloWorld`.
// Um contrato é uma coleção de funções e dados (seu estado). Uma vez implantado, um contrato reside em um endereço específico na blockchain Ethereum. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

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
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Este é um contrato inteligente básico que armazena uma mensagem quando da sua criação. Ele pode ser atualizado chamando-se a função `update`.

### Etapa 11: Vincular as contas MetaMask e Alchemy a seu projeto {#step-11-connect-metamask-alchemy-to-your-project}

Nós já criamos uma carteira Metamask, uma conta Alchemy e já escrevemos nosso contrato inteligente. Agora é hora de vincularmos os três.

Toda transação enviada da sua carteira requer uma assinatura, usando sua chave privada única. Para fornecer esta permissão ao nosso programa, podemos armazenar seguramente nossa chave privada em um arquivo de ambiente. Nós armazenaremos também uma chave de API da Alchemy aqui.

> Para saber mais sobre o envio de transações, confira [este tutorial](https://docs.alchemyapi.io/alchemy/tutorials/sending-transactions-using-web3-and-alchemy) sobre o envio de transações usando web3.

Primeiro, instale o pacote dotenv na pasta do seu projeto:

```
npm install dotenv --save
```

Então, crie um arquivo `.env` no diretório raiz do projeto. Adicione sua chave privada MetaMask e URL da API HTTP Alchemy a ele.

Seu arquivo de ambiente deve ser nomeado `.env` or ele não será reconhecido como arquivo de ambiente.

Não o nomeie como `process.env` ou `.env-custom` ou qualquer outra coisa.

- Siga [estas instruções](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) para exportar sua chave privada
- Veja abaixo como obter o URL da API HTTP Alchemy

![](./get-alchemy-api-key.gif)

Seu arquivo `.env` ficará assim:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Para realmente vinculá-los a nosso código, vamos fazer referência a essas variáveis em nosso arquivo `hardhat.config.js` no passo 13.

### Etapa 12: Instalar o Ethers.js {#step-12-install-ethersjs}

Ethers.js é uma biblioteca que facilita a interação e o envio de solicitações ao Ethereum ao incorporar [métodos padrões JSON-RPC](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) a outros métodos mais amigáveis ao usuário.

O Hardhat nos permite integrar [plugins](https://hardhat.org/plugins/) para ferramentas adicionais e funcionalidade estendida. Aproveitaremos o [plugin Ethers](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) para implantar o contrato.

No diretório do projeto, digite:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Etapa 13: Atualizar hardhat.config.js {#step-13-update-hardhat.configjs}

Até aqui, já adicionamos diversas dependências e plugins. Agora precisamos atualizar o `hardhat.config.js` para que nosso projeto reconheça todos eles.

Atualize seu `hardhat.config.js` para ficar assim:

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
```

### Etapa 14: Compilar nosso contrato {#step-14-compile-our-contract}

Para ter certeza de que tudo está funcionando, vamos compilar nosso contrato. A tarefa `compile` é uma das tarefas integradas do Hardhat.

Na linha de comando, execute:

```bash
npx hardhat compile
```

Você pode receber o aviso `SPDX license identifier not provided in source file`, mas não há necessidade de se preocupar com isso. Esperemos que tudo mais esteja bem! Se não, você sempre pode enviar uma mensagem no [discord Alchemy](https://discord.gg/u72VCg3).

### Etapa 15: Escrever nosso script de implantação {#step-15-write-our-deploy-script}

Agora que nosso contrato está escrito e nosso arquivo de configuração está pronto, é hora de escrever o script de implantação do contrato.

Navegue até a pasta `scripts/` e crie um novo arquivo chamado `deploy.js`, adicionando o seguinte conteúdo:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // Start deployment, returning a promise that resolves to a contract object
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contract deployed to address:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

A Hardhat fez um trabalho incrível ao explicar o que cada uma dessas linhas de código faz em seu [Tutorial sobre contratos](https://hardhat.org/tutorial/testing-contracts.html#writing-tests). Adotamos aqui as explicações deles.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

Uma `ContractFactory` em ethers.js é uma abstração usada para implantar novos contratos inteligentes, então, aqui, `HelloWorld` representa uma [fábrica](https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)) para instâncias do nosso contrato Hello World. Quando usar o plugin `hardhat-ethers` `ContractFactory` e `Contract`, as instâncias estão conectadas ao primeiro assinante (proprietário) por padrão.

```javascript
const hello_world = await HelloWorld.deploy()
```

Chamar `deploy()` em uma `ContractFactory`, irá iniciar a implantação, e retornará uma `Promise` que se resolve em um objeto `Contract`. Este é o objeto que tem um método para cada uma de nossas funções de contrato inteligente.

### Etapa 16: Implantar nosso contrato {#step-16-deploy-our-contract}

Finalmente estamos prontos para implantar o nosso contrato inteligente! Navegue até a linha de comando e digite:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Você deverá ver algo assim:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Por favor, grave este endereço**. Nós o usaremos mais tarde neste tutorial.

Se formos ao [etherscan da Goerli](https://goerli.etherscan.io) e procurarmos nosso endereço de contrato, devemos ser capazes de ver que ele foi implantado com sucesso. A transação ficará parecida com isto:

![](./etherscan-contract.png)

O endereço `From` deve combinar com o endereço da sua conta MetaMask, e o endereço `To` conterá **Contract Creation**. Se clicarmos na transação, veremos o nosso endereço de contrato no campo `To`.

![](./etherscan-transaction.png)

Parabéns! Você acaba de implantar um contrato inteligente em uma rede de teste Ethereum.

Para entender o que está acontecendo nos bastidores, vamos navegar até a guia Explorer no [painel do Alchemy](https://dashboard.alchemyapi.io/explorer). Se você tem vários aplicativos Alchemy, certifique-se de filtrar por app e selecionar **Hello World**.

![](./hello-world-explorer.png)

Aqui você verá um punhado de métodos JSON-RPC que Hardhat/Ethers fizeram em segundo plano para nós quando chamamos a função `.deploy() `. Dois importantes métodos aqui são [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), que é a requisição para escrever nosso contrato na cadeia Goerli, e [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash) que é uma requisição para ler informações sobre nossa transação, dado o hash. Para saber mais sobre o envio de transações, confira [este tutorial sobre o envio de transações usando web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## Parte 2: Interaja com o seu Contrato Inteligente {#part-2-interact-with-your-smart-contract}

Agora que você implantou com sucesso um contrato inteligente na rede Goerli, vamos aprender como interagir com ele.

### Crie um arquivo interact.js {#create-a-interactjs-file}

Este é o arquivo onde nós iremos escrever nosso script de interação. Nós usaremos a biblioteca Ether.js que você instalou anteriormente na Parte1.

Dentro da pasta `scripts/` crie um novo arquivo chamado `interact.js`, adicionando o seguinte código:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Atualize seu arquivo .env {#update-your-env-file}

Nós usaremos novas variáveis de ambiente, portanto nós precisamos defini-las no arquivo `.env` que [ nós criamos antes](#step-11-connect-metamask-&-alchemy-to-your-project).

Nós precisaremos adicionar uma definição para a nossa `API_KEY` Alchemy e o `CONTRACT_ADDRESS` onde o nosso contrato inteligente foi implantado.

Seu arquivo `.env` deverá se parecer com isto:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### Pegue a ABI do seu contrato {#grab-your-contract-ABI}

O [ABI (Interface binária da aplicação)](/glossary/#abi) do nosso contrato é a interface para interagir com o nosso contrato inteligente. O Hardhat automaticamente gera uma ABI e a salva no arquivo `HelloWorld.json`. Para usar a ABI, precisaremos analisar o conteúdo adicionando as seguintes linhas de código ao nosso arquivo `interact.js`:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Se quiser ver a ABI, pode imprimi-la no console:

```javascript
console.log(JSON.stringify(contract.abi))
```

Para ver o seu ABI impresso no console, navegue até seu terminal e execute:

```bash
npx hardhat run scripts/interact.js
```

### Criar uma instância do seu contrato {#create-an-instance-of-your-contract}

Para interagir com o nosso contrato, precisamos criar uma instância dele em nosso código. Para fazer isso com Ether.js, nós precisaremos trabalhar com três conceitos:

1. Provedor — um nó fornecedor que lhe dá acesso de leitura e escrita ao blockchain
2. Signatário — representa uma conta Ethereum que pode assinar transações
3. Contrato — um objeto Ether.js representando um contrato específico implantado on-chain

Usaremos a ABI do contrato da etapa anterior para criar nossa instância do contrato:

```javascript
// interact.js

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Aprenda mais sobre Provedores, Signatários e Contratos na [documentação ethers.js](https://docs.ethers.io/v5/).

### Leia a mensagem init {#read-the-init-message}

Lembra-se de quando implantamos nosso contrato com o `initMessage = "Hello world!"`? Nós vamos agora ler a mensagem armazenada no nosso contrato inteligente e imprimi-la no console.

Em JavaScript, funções assíncronas são usadas quando interagindo com redes. Para aprender mais sobre funções assíncronas, [leia este artigo](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Use o código abaixo para chamar a função `message` no nosso contrato inteligente e ler a mensagem init:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

Depois de rodar o arquivo usando `npx hardhat run scripts/interact.js` no terminal, nós devemos ver esta resposta:

```
The message is: Hello world!
```

Parabéns! Você acabou de ler com sucesso dados de contrato inteligente do blockchain Ethereum, continue assim!

### Atualize a mensagem {#update-the-message}

Ao invés de só ler a mensagem, nós podemos também atualizar a mensagem salva no nosso contrato inteligente usando a função `update`! Muito bacana, não?

Para atualizar a mensagem, nós podemos chamar diretamente a função `update` no nosso objeto Contract instanciado:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("This is the new message.")
  await tx.wait()
}
main()
```

Note que na linha 11, nós fazemos uma chamada para `.wait()` no objeto da transação retornada. Isso garante que nosso script espere pela transação ser minerada no blockchain antes de sair da função. Se a chamada `.wait()` não estiver incluída, o script pode não ver o valor da `message` atualizada no contrato.

### Leia a nova mensagem {#read-the-new-message}

Você deve ser capaz de repetir o [passo anterior](#read-the-init-message) para ler o valor atualizado da `message`. Pegue um momento e veja se você pode fazer as mudanças necessárias para imprimir o novo valor!

Se você precisar de uma dica, aqui está o que o seu arquivo `interact.js` deve se parecer neste ponto:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// contract instance
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("The new message is: " + newMessage)
}

main()
```

Agora apenas rode o script e você deve ser capaz de ver a mensagem antiga, o estado atualizado, e a nova mensagem impressa no seu terminal!

`npx hardhat run scripts/interact.js --network goerli`

```
The message is: Hello World!
Updating the message...
The new message is: This is the new message.
```

Enquanto estiver rodando este script, você pode perceber que o passo `Updating the message...` leva um tempo para carregar antes da nova mensagem carregar. Isto é por causa do processo de mineração; se você é curioso sobre rastrear transações enquanto elas estão sendo mineradas, visite o [Alchemy mempool](https://dashboard.alchemyapi.io/mempool) para ver o estado da transação. Se a transação for derrubada, também é útil checar o [Goerli Etherscan](https://goerli.etherscan.io) e procurar pelo hash da sua transação.

## Parte 3: Publique seu Contrato Inteligente no Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Você fez todo o trabalho duro dar vida ao seu contrato inteligente; agora é hora de compartilhá-lo com o mundo!

Verificando seu contrato inteligente no Etherscan, qualquer um pode ver seu código-fonte e interagir com o seu contrato inteligente. Vamos começar!

### Passo 1: Gere a Chave API na sua conta Etherscan {#step-1-generate-an-api-key-on-your-etherscan-account}

Uma Chave API Etherscan é necessária para verificar que você possui o contrato inteligente que você está tentando publicar.

Se você não tem uma conta Etherscan ainda, [se inscreva para uma conta](https://etherscan.io/register).

Uma vez conectado, encontre seu nome de usuário na barra de navegação, passe o mouse em cima dele, e selecione o botão **My profile**.

Na página do seu perfil, você deve ver uma barra de navegação lateral. Da barra de navegação lateral, selecione **API Keys**. Em seguida, pressione o botão "Add" para criar uma nova chave API, nomeie seu app **hello-world**e pressione o botão **Create New API Key**.

Sua nova chave API deve aparecer na tabela de chaves API. Copie a chave API na sua área de transferência.

Agora nós precisamos adicionar a chave API Etherscan no seu arquivo `.env`.

Depois de adicionar isso, seu arquivo `.env` deve se parecer com isso:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Contratos inteligentes implantados pelo Hardhat {#hardhat-deployed-smart-contracts}

#### Instale o hardhat-etherscan {#install-hardhat-etherscan}

Publicar o seu contrato no Etherscan usando Hardhat é uma tarefa direta. Você primeiro precisa instalar o plugin `hardhat-etherscan` para começar. `hardhat-etherscan` verificará automaticamente o código-fonte do contrato inteligente e da ABI no Etherscan. Para adicionar isso, no diretório `hello-world` rode:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Uma vez instalado, inclua o seguinte comando no topo do seu `hardhat.config.js`, e adicione as opções de configuração Etherscan:

```javascript
// hardhat.config.js

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Verifique seu contrato inteligente no Etherscan {#verify-your-smart-contract-on-etherscan}

Certifique-se que todos os arquivos foram salvos e todas as variáveis `.env` estão corretamente configuradas.

Rode a tarefa `verify`, passando o endereço do contrato, e a rede onde ele foi implantado:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

Certifique-se que `DEPLOYED_CONTRACT_ADDRESS` é o endereço do seu contrato inteligente implantado na rede de teste Goerli. Além disso, o argumento final (`'Hello World!'`) tem de ser o mesmo valor de string usado [durante o passo de implantação na parte 1](#write-our-deploy-script).

Se tudo der certo, você verá a seguinte mensagem no seu terminal:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

Parabéns! O código do seu contrato inteligente está no Etherscan!

### Cheque seu contrato inteligente no Etherscan! {#check-out-your-smart-contract-on-etherscan}

Quando você navegar para o link fornecido no seu terminal, você deve ser capaz de ver o código do seu contrato inteligente e ABI publicados no Etherscan!

**Parabéns, você conseguiu, campeão! Agora qualquer um pode chamar ou escrever no seu contrato inteligente! Nós mal conseguimos esperar o que você vai construir em seguida!**

## Parte 4 - Integrando seu contrato inteligente com o front-end {#part-4-integrating-your-smart-contract-with-the-frontend}

No fim deste tutorial você saberá como:

- Conectar uma carteira MetaMask no seu dapp
- Ler dados do seu contrato inteligente usando a API [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Assinar transações Ethereum usando MetaMask

Para este dapp, estaremos usando [React](https://reactjs.org/) como nosso framework de front-end; entretanto, é importante notar que nós não gastaremos muito tempo explicando seus fundamentos, já que estaremos principalmente focados em trazer funcionalidade Web3 para o nosso projeto.

Como um pré-requisito, você deve ter um nível iniciante de entendimento de React. Caso contrário, recomendamos concluir o tutorial oficial [Introdução ao React](https://reactjs.org/tutorial/tutorial.html).

### Clonar os arquivos iniciais {#clone-the-starter-files}

Primeiro, vá até o [repositório GitHub hello-world-part-four](https://github.com/alchemyplatform/hello-world-part-four-tutorial) para obter os arquivos iniciais para esse projeto e clone o repositório no seu computador local.

Abra o repositório clonado localmente. Note que ele contém duas pastas: `starter-files` e `completed`.

- `starter-files`- **nós trabalharemos neste diretório**, nós conectaremos a UI à nossa carteira Ethereum e o contrato inteligente que nós publicamos no Etherscan na [Parte 3](#part-3).
- `completed` contém o tutorial inteiro completado e deve ser somente usado como referência se você estiver empacado.

Em seguida, abra sua cópia de `starter-files` no seu editor de código favorito, e então navegue na pasta `src`.

Todo o código que vamos escrever será exibido na pasta `src`. Nós estaremos editando o componente `HelloWorld.js` e os arquivos JavaScript `util/interact.js` para dar ao seu projeto funcionalidade Web3.

### Cheque os arquivos iniciais {#check-out-the-starter-files}

Antes de começar a codificar, vamos explorar o que nos é fornecido nos arquivos iniciais.

#### Tenha seu projeto React em execução {#get-your-react-project-running}

Vamos começar executando o projeto React em nosso navegador. A beleza do React é que uma vez que nosso projeto esteja sendo executado no nosso navegador, qualquer alteração que salvarmos será atualizada ao vivo em nosso navegador.

Para fazer com que o projeto funcione, navegue até o diretório raiz da pasta `starter-files`, e execute`npm install` no seu terminal para instalar as dependências do projeto:

```bash
cd starter-files
npm install
```

Uma vez terminada a instalação, execute `npm start` em seu terminal:

```bash
npm start
```

Ao fazê-lo, deve abrir [http://localhost:3000/](http://localhost:3000/) no seu navegador, onde você verá o front-end do nosso projeto. Ele deve consistir em um campo \ (um lugar para atualizar a mensagem armazenada no seu contrato inteligente\), um botão “Conectar Carteira”, e um botão “Atualizar”.

Se você tentar clicar em qualquer dos botões você notará que eles não funcionam — isso porque ainda precisamos programar a funcionalidade deles.

#### O componente `HelloWorld.js` {#the-helloworld-js-component}

Vamos voltar à pasta `src` no nosso editor e abrir o arquivo `HelloWorld.js`. É muito importante que entendamos tudo neste arquivo, pois é o principal componente do React no qual vamos trabalhar.

No começo deste arquivo você irá notar que nós temos diversas declarações importantes que são necessárias para termos nosso projeto rodando, incluindo a biblioteca React, os hooks useEffect e UseState, alguns itens do `./util/interact.js` (nós os descreveremos em mais detalhes em breve!), e o logo Alchemy.

```javascript
// HelloWorld.js

import React from "react"
import { useEffect, useState } from "react"
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js"

import alchemylogo from "./alchemylogo.svg"
```

Em seguida, temos nossas variáveis de estado que serão atualizadas após eventos específicos.

```javascript
// HelloWorld.js

//State variables
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

Veja aqui o que cada uma das variáveis representa:

- `walletAddress` - uma string que armazena o endereço da carteira do usuário
- `status` uma string que armazena uma mensagem útil que guia o usuário em como interagir com o dapp
- `message` - uma string que armazena a mensagem atual no contrato inteligente
- `newMessage` -uma string que armazena a nova mensagem que será escrita no contrato inteligente

Depois das variáveis de estado, você verá cinco funções não implementadas: `useEffect` ,`addSmartContractListener`, `addWalletListener` , `connectWalletPressed`, e `onUpdatePressed`. Nós explicaremos o que elas fazem abaixo:

```javascript
// HelloWorld.js

//called only once
useEffect(async () => {
  //TODO: implement
}, [])

function addSmartContractListener() {
  //TODO: implement
}

function addWalletListener() {
  //TODO: implement
}

const connectWalletPressed = async () => {
  //TODO: implement
}

const onUpdatePressed = async () => {
  //TODO: implement
}
```

- [`useEffect`](https://reactjs.org/docs/hooks-effect.html)- isto é um hook React hook que é chamado depois que o seu componente é renderizado. Por ele ter um array vazio `[]` prop passada por ele \(veja linha 4\), ele só será chamado na _primeira_ renderização do componente. Aqui nós vamos carregar a mensagem atual armazenada no nosso contrato inteligente, chamar nosso contrato inteligente e listeners da carteira, e atualizar nos UI para refletir se a carteira já está conectada.
- `addSmartContractListener`- esta função configura um listener que irá aguardar o evento `UpdatedMessages` do nosso contrato HelloWorld e atualizar nossa UI quando a mensagem é alterada em nosso contrato inteligente.
- `addWalletListener`- esta função configura um listener que detecta mudanças no estado da carteira MetaMask do usuário, como quando o usuário desconecta sua carteira ou muda endereços.
- `connectWalletPressed`- esta função será chamada para conectar a carteira MetaMask do usuário no nosso dapp.
- `onUpdatePressed` - essa função será chamada quando o usuário quiser atualizar a mensagem armazenada no contrato inteligente.

Perto do final desse arquivo, temos a interface de usuário do nosso componente.

```javascript
// HelloWorld.js

//the UI of our component
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

    <div>
      <input
        type="text"
        placeholder="Update the message in your smart contract."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Update
      </button>
    </div>
  </div>
)
```

Se você procurar com cuidado no código, você notará quando nós usamos nossas várias variáveis de estado na nossa UI:

- Nas linhas 6 a 12, se a carteira do usuário estiver conectada \(ou seja. `walletAddress.length > 0`\), mostraremos uma versão truncada da `walletAddress` do usuário no botão com a ID "walletButton;", caso contrário, ele simplesmente dirá "Connect Wallet."
- Na linha 17, nós mostramos a mensagem atual armazenada no contrato inteligente, que é capturada na string `message`.
- Nas linhas 23-26, nós usamos um [componente controlado](https://reactjs.org/docs/forms.html#controlled-components) para atualizar nossa variável de estado `newMessage` quando a entrada no campo texto muda.

Em adição às nossas variáveis de estado, você também verá que as funções `connectWalletPressed` e `onUpdatePressed` são chamadas quando os botões com IDs `publishButton` e `walletButton` são respectivamente clicados.

Finalmente, vamos endereçar onde esse componente `HelloWorld.js` será adicionado.

Se você for ao arquivo `App.js`, que é o componente principal do React, que atua como um contêiner para todos os outros componentes, você verá que o nosso componente `HelloWorld.js` é injetado na linha 7.

Finalmente, mas não menos importante, vamos checar mais um arquivo fornecido para você, o arquivo `interact.js`.

#### O arquivo `interact.js` {#the-interact-js-file}

Como queremos respeitar o paradigma [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), queremos um arquivo separado que contém todas as nossas funções para gerenciar a lógica, dados e regras do nosso dapp, para então conseguirmos exportar essas funções para o nosso front-end \(nosso componente `HelloWorld.js` component\).

👆🏽Esta é a exata finalidade do nosso arquivo `interact.js`!

Navegue para a pasta `util` no seu diretório `src`, e você notará que nós incluimos um arquivo chamado `interact.js` que irá conter todas as nossas interações com o contrato inteligente, funções de carteira, e variáveis.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Você pode notar no topo do arquivo que nós transformamos o objeto `helloWorldContract` em um comentário. Mais tarde neste tutorial nós vamos descomentar este objeto e instanciar nosso contrato inteligente nesta variável, que irá então exportar no nosso componente `HelloWorld.js`.

As quatro funções não implementadas depois do nosso objeto `helloWorldContract` fazem o seguinte:

- `loadCurrentMessage`: esta função manipula a lógica de carregamento da mensagem atual armazenada no contrato inteligente. Ela fará uma chamada _read_ para o contrato inteligente Olá, Mundo usando a [API Web3 da Alchemy](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet`: essa função conectará a MetaMask do usuário ao nosso dapp.
- `getCurrentWalletConnected` - essa função irá checar se uma conta Ethereum já está conectada no nosso dapp no carregamento da página e atualização da nossa UI devidamente.
- `updateMessage` - esta função atualizará a mensagem armazenada no contrato inteligente. Ela fará uma chamada _write_ para o contrato inteligente Hello World, para que a carteira do usuário MetaMask tenha que assinar uma transação Ethereum para atualizar a mensagem.

Agora que você entende no que estamos trabalhando, vamos entender como ler do nosso contrato inteligente!

### Passo 3: Leia do seu Contrato Inteligente {#step-3-read-from-your-smart-contract}

Para ler do seu contrato inteligente, você irá precisar configurar com sucesso:

- Uma conexão API com a cadeia Ethereum
- Uma instância carregada para o seu contrato inteligente
- Uma função para chamar para a sua função de contrato inteligente
- Um ouvinte para observar as atualizações quando os dados de contrato inteligente que você está lendo mudem

Isto pode parecer que são muitos passos, mas não se preocupe! Nós vamos acompanhá-lo como fazer cada um deles passo a passo! :\)

#### Estabeleça uma conexão API com a cadeia Ethereum {#establish-an-api-connection-to-the-ethereum-chain}

Você se lembra como na Parte 2 deste tutorial usamos a nossa chave [Alchemy Web3 para ler do nosso contrato inteligente](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)? Você também irá precisar de uma chave Alchemy Web3 em seu dapp para ler da cadeia.

Se você ainda não tem, primeiro instale [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) navegando até o diretório raiz do seu `starter-files` e executando o seguinte em seu terminal:

```text
yarn add @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) é um invólucro em torno do [Web3.js](https://docs.web3js.org/), fornecendo métodos aprimorados da API e outros benefícios cruciais para tornar a sua vida de desenvolvedor da Web3 mais fácil. Ele foi projetado para exigir uma configuração mínima, para que você possa começar a usá-la no seu aplicativo imediatamente!

Então, instale o pacote [dotenv](https://www.npmjs.com/package/dotenv) no seu diretório do projeto, para termos um lugar seguro para armazenar nossa chave API depois de pegarmos ela.

```text
npm install dotenv --save
```

Para o nosso dapp, **nós usaremos nossa chave API Websockets** ao invés de nossa chave API HTTP, já que nos garante configurar um listener que detecta quando a mensagem, armazenada no contrato inteligente, muda.

Uma vez que você tem a chave API, crie um arquivo `.env` no seu diretório raiz e adicione sua url Alchemy Websockets a ele. Depois disso, seu arquivo `.env` deve se parecer com isso:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

Agora estamos prontos para configurar nosso ponto de extremidade Web3 da Alchemy no nosso dapp! Vamos voltar para o nosso `interact.js`, que é aninhado dentro da nossa pasta `util` e adicionar o seguinte código no topo do arquivo:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

Acima, nós primeiro importamos a chave Alchemy do nosso arquivo `.env` e então passamos nosso `alchemyKey` para `createAlchemyWeb3` estabelecer nosso endpoint Alchemy Web3.

Com este endpoint pronto, é hora de carregar nosso contrato inteligente!

#### Carregando o seu contrato inteligente Hello World {#loading-your-hello-world-smart-contract}

Para carregar o seu contrato inteligente Hello World, você precisará do seu endereço de contrato e ABI, ambos os quais podem ser encontrados no Etherscan se você completou a [Parte 3 deste tutorial.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### Como obter a ABI do seu contrato no Etherscan {#how-to-get-your-contract-abi-from-etherscan}

Se você pulou a Parte 3 deste tutorial, você pode usar o contrato Olá, Mundo com o endereço [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). Sua ABI pode ser encontrada [aqui](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

A ABI de um contrato é necessária para especificar qual função um contrato irá invocar, assim como garantir que a função irá retornar dados no formato que você está esperando. Uma vez que nós copiamos nosso contrato ABI, vamos salvá-lo como um arquivo JSON chamado `contract-abi.json` no seu diretório `src`.

O seu contract-abi.json deve ser armazenado na sua pasta src.

Armados com nosso endereço de contrato, ABI, e endpoint Alchemy Web3, nós podemos usar o [método do contrato](https://docs.web3js.org/api/web3-eth-contract/class/Contract) para carregar uma instância do nosso contrato inteligente. Importe a ABI do seu contrato no arquivo `interact.js` e adicione o seu endereço de contrato.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Nós podemos agora finalmente descomentar nossa variável `helloWorldContract`, e carregar o contrato inteligente usando nosso endpoint AlchemyWeb3:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Para recapitular, as primeiras 12 linhas do seu `interact.js` deve agora se parecer com isso:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Agora que nós temos nosso contrato carregado, nós podemos implementar nossa função `loadCurrentMessage`!

#### Implementando `loadCurrentMessage` no nosso arquivo `interact.js` {#implementing-loadCurrentMessage-in-your-interact-js-file}

Esta função é super simples. Nós vamos fazer uma simples chamada async web3 para ler do nosso contrato. Nossa função irá retornar a mensagem armazenada no contrato inteligente:

Atualize o `loadCurrentMessage` no seu arquivo `interact.js` para o seguinte:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Já que nós queremos exibir este contrato inteligente na nossa UI, vamos atualizar a função `useEffect` no nosso componente `HelloWorld.js` com o seguinte:

```javascript
// HelloWorld.js

//called only once
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Note que nós somente queremos nosso `loadCurrentMessage` ser chamado uma vez durante a primeira renderização do componente. Logo implementaremos `addSmartContractListener` para atualizar automaticamente a interface do usuário depois que a mensagem no contrato inteligente mudar.

Antes que nós mergulhemos no nosso listener, vamos checar o que nós temos até aqui! Salve seus arquivos `HelloWorld.js` e `interact.js`, e então vá para [http://localhost:3000/](http://localhost:3000/)

Você notará que a mensagem atual não diz mais "No connection to the network." Ao invés disso, ela reflete a mensagem armazenada no contrato inteligente. Ótimo!

#### Sua UI poderia agora refletir a mensagem armazenada no contrato inteligente {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

Agora falando daquele listener...

#### Implementar `addSmartContractListener` {#implement-addsmartcontractlistener}

Se você voltar para pensar no arquivo `HelloWorld.sol` que escrevemos na [Parte 1 desta série de tutoriais](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract), você se lembrará que há um evento de contrato inteligente chamado `UpdatedMessages` que é emitido depois da função `update` do nosso contrato inteligente ser invocada \(ver linhas 9 e 27\):

```javascript
// HelloWorld.sol

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Defines a contract named `HelloWorld`.
// Um contrato é uma coleção de funções e dados (seu estado). Uma vez implantado, um contrato reside em um endereço específico na blockchain Ethereum. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

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
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Eventos de contratos inteligentes são uma maneira do seu contrato comunicar que alguma coisa aconteceu \(ou seja, houve um _event_\) na blockchain no seu aplicativo de front-end, que pode “escutar” eventos específicos e tomar uma ação quando eles acontecem.

A função `addSmartContractListener` escutará especificamente o evento `UpdatedMessages` do nosso contrato inteligente Olá, Mundo e atualizar nossa interface do usuário para mostrar a nova mensagem.

Modifique `addSmartContractListener` da seguinte maneira:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Your message has been updated!")
    }
  })
}
```

Vamos quebrar em partes o que acontece quando o listener detecta um evento:

- Se um erro ocorre quando o evento é emitido, ele será refletido na UI via nossa variável de estado `status`.
- Caso contrário, nós usaremos o objeto `data` retornado. O `data.returnValues` é uma array indexada no zero onde o primeiro elemento da array armazena a mensagem anterior e o segundo elemento armazena o atualizado. Ao todo, em um evento bem-sucedido, iremos configurar nossa cadeia de caracteres `message` com a mensagem atualizada, limpar a cadeia de caracteres `newMessage` e atualizar nossa variável de estado `status` para refletir que uma nova mensagem foi publicada no nosso contrato inteligente.

Finalmente, vamos chamar nosso listener em nossa função `useEffect` para que seja inicializada na primeira renderização do componente `HelloWorld.js`. Tudo junto, sua função `useEffect` deve se parecer com:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Agora que nós somos capazes de ler do nosso contrato inteligente, seria ótimo descobrir como escrever nele também! Entretanto, para escrever no nosso dapp, nós precisamos primeiro uma carteira Ethereum conectada nele.

Então, em seguida vamos configurar nossa carteira Ethereum \(MetaMask\) e então conectá-la ao nosso dapp!

### Passo 4: Configurar sua carteira Ethereum {#step-4-set-up-your-ethereum-wallet}

Para escrever qualquer coisa na cadeia Ethereum, usuários devem assinar transações usando as chaves privadas das suas carteiras virtuais. Para este tutorial, usaremos o [MetaMask](https://metamask.io/), uma carteira virtual no navegador usada para gerenciar o seu endereço de conta do Ethereum, pois ele torna esta assinatura de transação superfácil para o usuário final.

Se você quiser entender mais sobre como as transações no Ethereum funcionam, confira [esta página](/developers/docs/transactions/) na Fundação Ethereum.

#### Baixar MetaMask {#download-metamask}

Você pode baixar e criar uma conta MetaMask gratuitamente [neste link](https://metamask.io/download.html). Ao criar uma conta, ou mesmo se você já tiver uma conta, certifique-se de mudar para "Goerli Test Network” na parte superior direita \(para não lidarmos com dinheiro real\).

#### Etapa: Adicionar Faucet ether {#add-ether-from-a-faucet}

Para assinar a transação no blockchain Ethereum, nós precisamos de alguns Eth falsos. Para obter Eth você pode ir em[FaucETH](https://fauceth.komputing.org) e entrar seu endereço de conta Goerli, clicar em “Request funds”, e então selecionar “Ethereum Testnet Goerli” no menu, e finalmente clicar no botão "Request funds" novamente. Em seguida, você deve ver Eth em sua conta Metamask!

#### Cheque seu Saldo {#check-your-balance}

Para verificar novamente que tem saldo, vamos fazer uma solicitação através da ferramenta [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) fornecida pelo [compositor da Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Ela mostrará a quantidade de Eth na sua carteira. Depois de inserir o endereço da sua conta da MetaMask e clicar em "Send Request", você verá uma resposta como esta:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**NOTA:** Este resultado está em wei, não em ETH. Lembre-se de que "Wei" é a menor unidade de ether. A conversão de wei para eth é: 1 eth = 10¹⁸ wei. Então, se convertemos 0xde0b6b3a7640000 para decimal, temos 1\*10¹⁸ wei, que é igual a 1 eth.

Ufa! Nosso dinheiro falso está todo lá! 🤑

### Passo 5: Conecte o MetaMask na sua UI {#step-5-connect-metamask-to-your-UI}

Agora que nossa carteira MetaMask está configurada, vamos conectar nosso dapp a ela!

#### Função `connectWallet` {#the-connectWallet-function}

No nosso arquivo `interact.js`, vamos implementar a função `connectWallet`, a qual podemos então chamar no nosso componente `HelloWorld.js`.

Vamos modificar `connectWallet` para o seguinte:

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Então, o que esse bloco gigante de código faz exatamente?

Bem, primeiro, ele checar se a `window.ethereum` está habilitada no seu navegador.

`window.ethereum` é uma API global injetada pela MetaMask e outros provedores de carteira que permitem que sites solicitem contas Ethereum dos usuários. Se aprovado, ele pode ler dados dos blockchains que o usuário está conectado, e sugerir que o usuário assine mensagens e transações. Confira a [documentação da MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) para obter mais informações!

Se `window.ethereum` _não está_ presente, então isso significa que o MetaMask não está instalado. Isso resulta em um objeto JSON sendo retornado, onde o `endereço` retornado é uma string vazia, e o `status` do objeto JSX repassa que o usuário deve instalar o MetaMask.

Agora se `window.ethereum` _estiver_ presente, e é aí que as coisas ficam interessantes.

Usando um laço try/catch, nós vamos tentar conectar ao MetaMask chamando[`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Chamando esta função o MetaMask irá abrir no navegador, onde o usuário será solicitado a conectar sua carteira ao seu dapp.

- Se o usuário escolher conectar, `method: "eth_requestAccounts"` irá retornar uma array que contém todos os endereços de contas de usuário que conectaram ao dapp. No total, nossa função `connectWallet` retornará um objeto JSON que contém o _primeiro_ `address` desta matriz \(ver linha 9\) e uma mensagem `status` que pede que o usuário escreva uma mensagem para o contrato inteligente.
- Se o usuário rejeitar a conexão, então o objeto JSON vai conter uma string vazia para o `address` retornado e uma mensagem de `status` que reflete que o usuário rejeitou a conexão.

Agora que nós escrevemos esta função `connectWallet`, o próximo passo é chamar ele para o nosso componente `HelloWorld.js`.

#### Adicione a função `connectWallet` ao seu componente de interface do usuário `HelloWorld.js` {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

Navegue para a função `connectWalletPressed` em `HelloWorld.js`, e atualize-o para o seguinte:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Observe como a maior parte das nossas funcionalidades está abstraída do nosso componente `HelloWorld.js` do arquivo `interact.js`? É assim que respeitamos o paradigma M-V-C!

Em `connectWalletPressed`, simplesmente fazemos uma chamada de espera (await) para a função `connectWallet`, importada, e usando sua resposta, nós atualizaremos nossas variáveis `status` e `walletAddress` através de seus state hooks.

Agora, vamos salvar os dois arquivos `HelloWorld.js` e `interact.js` e testar nossa UI até agora.

Abra seu navegador na página [http://localhost:3000/](http://localhost:3000/) e clique no botão “Connect Wallet” na parte superior direita da página.

Se você tiver o MetaMask instalado, você será solicitado a conectar sua carteira ao seu dapp. Aceite o convite para se conectar.

Observe que o botão de carteira agora mostra que o seu endereço está conectado! Ótimo!!🔥

Em seguida, tente atualizar a página... isso é estranho. Nosso botão de carteira está nos pedindo para conectar o MetaMask, mesmo que já esteja conectado...

Entretanto, não tenha medo! Nós podemos endereçar (entendeu?) facilmente isso implementando `getCurrentWalletConnected`, o qual irá checar se um endereço já está conectado no nosso dapp e atualizar nossa UI de acordo!

#### A função `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

Atualize a sua função `getCurrentWalletConnected` no arquivo `interact.js` como mostrado abaixo:

```javascript
// interact.js

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Este código é _muito_ similar à função `connectWallet` que nós acabamos de escrever no passo anterior.

A diferença principal é que, em vez de chamar o método `eth_requestAccounts`, que abre o MetaMask para o usuário conectar sua carteira, aqui chamamos o método `eth_accounts`, que simplesmente retorna uma matriz que contém os endereços MetaMask atualmente conectados ao nosso dapp.

Para ver esta função em ação, vamos chamar nossa função `useEffect` do nosso componente `HelloWorld.js`:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Note que nós usamos a resposta da nossa chamada a `getCurrentWalletConnected` para atualizar nossa `walletAddress` e nossa variável de estado `status`.

Agora que você adicionou este código, tente atualizar a janela do navegador.

Ótimo!!!! O botão deve dizer que você está conectado e mostrar uma visualização do endereço de sua carteira conectada - mesmo depois de atualizar!

#### Implemente `addWalletListener` {#implement-addwalletlistener}

O passo final na configuração da nossa carteira dapp é implementar o ouvinte de carteira, para que nossa interface atualize quando o estado mudar, como quando o usuário desconecta ou troca de contas.

No seu arquivo `HelloWorld.js`, modifique a sua função `addWalletListener` para o seguinte:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Eu aposto que você nem mesmo precisou da nossa ajuda para entender o que está acontecendo aqui neste ponto, mas por finalidade de clareza, vamos quebrá-lo em partes:

- Primeiro, nossa função verifica se o `window.ethereum` está habilitado no seu navegador \(ex. MetaMask instalado\).
  - Caso contrário, nós simplesmente configuramos a variável de estado `status` para uma JSX string que solicita o usuário instalar a MetaMask.
  - Se estiver habilitado, configuramos o ouvinte `window.ethereum.on("accountsChanged")` na linha 3 que houve mudança de estado na carteira MetaMask, inclusive quando o usuário conecta uma conta adicional ao dapp, troca de conta ou desconecta uma conta. Se houver pelo menos uma conta conectada, a variável de estado `walletAddress` é atualizada como a primeira conta no array `accounts` retornada pelo ouvinte. Caso contrário, `walletAddress` é definida como uma string vazia.

Por último, mas não menos importante, nós devemos chamá-la em nossa função `useEffect`:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

E é isso! Concluímos com sucesso a programação de toda a nossa carteira! Agora, a nossa última tarefa: atualizar a mensagem armazenada no nosso contrato inteligente!

### Passo 6: Implemente a função `updateMessage` {#step-6-implement-the-updateMessage-function}

Tudo bem, nós chegamos ao trecho caseiro! No `updateMessage` do seu arquivo `interact.js`, façamos o seguinte:

1. Certifique-se que a mensagem que nós queremos publicar no nosso contrato inteligente é válida
2. Assine nossa transação usando MetaMask
3. Chame esta função do nosso componente de frontend `HelloWorld.js`

Isso não vai demorar muito; vamos terminar este dapp!

#### Manipulação de erros de script {#input-error-handling}

Naturalmente, faz sentido ter alguns tipos de gerencialmente de erros de entrada no início da função.

Queremos que nossa função retorne rapidamente. Se não houver uma extensão MetaMask instalada, não haverá carteiras conectadas \(ou seja, o `address` transmitido é uma cadeira de caracteres vazia\) ou a `message` será uma cadeira de caracteres vazia. Vamos adicionar o seguinte gerencialmente de erro em `updateMessage`:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }
}
```

Agora que ele tem o devido gerenciamento de erro de entrada, é hora de assinar a transação via MetaMask!

#### Assinando a nossa transação {#signing-our-transaction}

Se você já está confortável com as transações tradicionais Web3 do Ethereum, o código que vamos escrever em seguida será bastante familiar. Abaixo, nosso código de manipulação de erro de entrada, adicione o seguinte a `updateMessage`:

```javascript
// interact.js

//set up transaction parameters
const transactionParameters = {
  to: contractAddress, // Required except during contract publications.
  from: address, // must match user's active address.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//sign the transaction
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    status: (
      <span>
        ✅{" "}
        <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
          View the status of your transaction on Etherscan!
        </a>
        <br />
        ℹ️ Once the transaction is verified by the network, the message will be
        updated automatically.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

Vamos quebrar em partes o que está acontecendo. Primeiro, configuramos nossos parâmetros de transações, em que:

- `to` especificar o endereço do destinatário \(nosso contrato inteligente\)
- `from` especifica o signatário da transação, a variável `address` que transmitimos para a nossa função
- `data` contém a chamada para o método `update` do nosso contrato inteligente Olá, Mundo, recebendo nossa variável de cadeia de caracteres `message` como entrada

Então, nós fazemos uma chamada await, `window.ethereum.request`, onde nós pedimos ao MetaMask para assinar a transação. Observe que nas linhas 11 e 12, estamos especificando nosso método eth `eth_sendTransaction` e passando os nossos `transactionParameters`.

Neste ponto, a MetaMask irá abrir no navegador e pedirá que o usuário assine ou rejeite a transação.

- Se a transação tiver sucesso, a função retornará um objeto JSON no qual a cadeia de caracteres JSX `status` pede ao usuário para verificar o Etherscan para mais informações sobre suas transações.
- Se a transação falha, a função irá retornar um objeto JSON onde a string `status` retransmite a mensagem de erro.

Tudo junto, nossa função `updateMessage` deve se parecer com isso:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }

  //set up transaction parameters
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    }
  } catch (error) {
    return {
      status: "😥 " + error.message,
    }
  }
}
```

Por último, mas não menos importante, nós precisamos conectar nossa função `updateMessage` ao componente `HelloWorld.js`.

#### Conecte `updateMessage` ao front-end `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

Nossa função `onUpdatePressed` deve fazer uma chamada await para a função `updateMessage` importada e modificar a variável de estado `status` para refletir se a nossa transação teve sucesso ou falhou:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

É super limpo e simples. E advinhe... SEU DAPP ESTÁ COMPLETO!!!

Vá em frente e teste com o botão **Update**!

### Faça o seu próprio dapp customizado {#make-your-own-custom-dapp}

Ebaaaaa, você chegou até o fim deste tutorial! Para recapitular, você aprendeu como:

- Conectar a carteira MetaMask no seu projeto dapp
- Ler dados do seu contrato inteligente usando a API [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Assinar transações Ethereum usando MetaMask

Agora você está totalmente equipado para aplicar suas habilidades deste tutorial para construir seu próprio projeto dapp customizado! Como sempre, se você tiver questões, não hesite em nos contatar para pedir ajuda no[Discord da Alchemy](https://discord.gg/gWuC7zB). 🧙‍♂️

Uma vez que você terminou este tutorial, nos diga como foi sua experiência ou se você tem alguma opinião, nos marcando no Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform)!
