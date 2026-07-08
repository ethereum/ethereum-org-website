---
title: Contrato inteligente Hello World para iniciantes - Fullstack
description: "Tutorial introdutório sobre como escrever e implantar um contrato inteligente simples no Ethereum."
author: "nstrike2"
breadcrumb: Hello World fullstack
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "contratos inteligentes",
    "implantação",
    "explorador de blocos",
    "frontend",
    "transações",
    "framework",
  ]
skill: beginner
lang: pt-br
published: 2021-10-25
---

Este guia é para você se você é novo no desenvolvimento de blockchain e não sabe por onde começar ou como implantar e interagir com contratos inteligentes. Vamos percorrer a criação e implantação de um contrato inteligente simples na rede de teste Goerli usando [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) e [Alchemy](https://alchemy.com/eth).

Você precisará de uma conta no Alchemy para concluir este tutorial. [Inscreva-se para obter uma conta gratuita](https://www.alchemy.com/).

Se você tiver dúvidas em qualquer momento, sinta-se à vontade para entrar em contato no [Discord do Alchemy](https://discord.gg/gWuC7zB)!

## Parte 1 - Criar e implantar seu contrato inteligente usando Hardhat {#part-1}

### Conectar-se à rede Ethereum {#connect-to-the-ethereum-network}

Existem muitas maneiras de fazer solicitações à cadeia Ethereum. Por simplicidade, usaremos uma conta gratuita no Alchemy, uma plataforma de desenvolvedores de blockchain e API que nos permite nos comunicar com a cadeia Ethereum sem executar um nó nós mesmos. O Alchemy também possui ferramentas de desenvolvedor para monitoramento e análise; aproveitaremos essas ferramentas neste tutorial para entender o que está acontecendo internamente na implantação do nosso contrato inteligente.

### Criar seu aplicativo e chave de API {#create-your-app-and-api-key}

Depois de criar uma conta no Alchemy, você pode gerar uma chave de API criando um aplicativo. Isso permitirá que você faça solicitações à rede de teste Goerli. Se você não estiver familiarizado com redes de teste, pode [ler o guia do Alchemy sobre como escolher uma rede](https://www.alchemy.com/docs/choosing-a-web3-network).

No painel do Alchemy, encontre o menu suspenso **Apps** na barra de navegação e clique em **Create App** (Criar aplicativo).

![Hello world create app](./hello-world-create-app.png)

Dê ao seu aplicativo o nome '_Hello World_' e escreva uma breve descrição. Selecione **Staging** como seu ambiente e **Goerli** como sua rede.

![create app view hello world](./create-app-view-hello-world.png)

_Nota: certifique-se de selecionar **Goerli**, ou este tutorial não funcionará._

Clique em **Create app** (Criar aplicativo). Seu aplicativo aparecerá na tabela abaixo.

### Criar uma conta Ethereum {#create-an-ethereum-account}

Você precisa de uma conta Ethereum para enviar e receber transações. Usaremos a MetaMask, uma carteira virtual no navegador que permite aos usuários gerenciar o endereço de sua conta Ethereum.

Você pode baixar e criar uma conta na MetaMask gratuitamente [aqui](https://metamask.io/download). Ao criar uma conta, ou se você já tiver uma, certifique-se de mudar para a "Goerli Test Network" (Rede de Teste Goerli) no canto superior direito (para não lidarmos com dinheiro real).

### Passo 4: Adicionar ether de um Faucet {#step-4-add-ether-from-a-faucet}

Para implantar seu contrato inteligente na rede de teste, você precisará de algum ETH falso. Para obter ETH na rede Goerli, vá a um faucet Goerli e insira o endereço da sua conta Goerli. Observe que os faucets Goerli podem estar um pouco instáveis recentemente - consulte a [página de redes de teste](/developers/docs/networks/#goerli) para obter uma lista de opções para tentar:

_Nota: devido ao congestionamento da rede, isso pode demorar um pouco._
``

### Passo 5: Verificar seu saldo {#step-5-check-your-balance}

Para verificar novamente se o ETH está na sua carteira, vamos fazer uma solicitação [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) usando a [ferramenta sandbox do Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Isso retornará a quantidade de ETH em nossa carteira. Para saber mais, confira o [breve tutorial do Alchemy sobre como usar a ferramenta composer](https://youtu.be/r6sjRxBZJuU).

Insira o endereço da sua conta MetaMask e clique em **Send Request**. Você verá uma resposta parecida com o trecho de código abaixo.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Nota: Este resultado está em wei, não em ETH. Wei é usado como a menor denominação de ether._

Ufa! Nosso dinheiro falso está todo lá.
### Passo 6: Inicializar nosso projeto {#step-6-initialize-our-project}

Primeiro, precisaremos criar uma pasta para o nosso projeto. Navegue até a sua linha de comando e insira o seguinte.

```
mkdir hello-world
cd hello-world
```

Agora que estamos dentro da pasta do nosso projeto, usaremos `npm init` para inicializar o projeto.

> Se você ainda não tem o npm instalado, siga [as instruções de instalação do Node.js](https://nodejs.org/en/download/) para instalar o Node.js e o npm.

Para o propósito deste tutorial, não importa como você responde às perguntas de inicialização. Aqui está como fizemos para referência:

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

Aprove o package.json e estamos prontos para continuar!
### Passo 7: Baixar o Hardhat {#step-7-download-hardhat}

O Hardhat é um ambiente de desenvolvimento para compilar, implantar, testar e depurar seu software Ethereum. Ele ajuda os desenvolvedores a criar contratos inteligentes e aplicativos descentralizados (dapps) localmente antes de implantá-los na cadeia ativa.

Dentro do nosso projeto `hello-world`, execute:

```
npm install --save-dev hardhat
```

Confira esta página para obter mais detalhes sobre as [instruções de instalação](https://hardhat.org/getting-started/#overview).

### Passo 8: Criar o projeto Hardhat {#step-8-create-hardhat-project}

Dentro da pasta do nosso projeto `hello-world`, execute:

```
npx hardhat
```

Você deverá ver uma mensagem de boas-vindas e a opção de selecionar o que deseja fazer. Selecione "create an empty hardhat.config.js":

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

Isso gerará um arquivo `hardhat.config.js` no projeto. Usaremos isso mais adiante no tutorial para especificar a configuração do nosso projeto.

### Passo 9: Adicionar pastas do projeto {#step-9-add-project-folders}

Para manter o projeto organizado, vamos criar duas novas pastas. Na linha de comando, navegue até o diretório raiz do seu projeto `hello-world` e digite:

```
mkdir contracts
mkdir scripts
```

- `contracts/` é onde manteremos o arquivo de código do nosso contrato inteligente hello world
- `scripts/` é onde manteremos os scripts para implantar e interagir com nosso contrato

### Passo 10: Escrever nosso contrato {#step-10-write-our-contract}

Você deve estar se perguntando: quando vamos escrever código? Chegou a hora!

Abra o projeto hello-world no seu editor favorito. Os contratos inteligentes são mais comumente escritos em Solidity, que usaremos para escrever nosso contrato inteligente.‌

1. Navegue até a pasta `contracts` e crie um novo arquivo chamado `HelloWorld.sol`
2. Abaixo está um exemplo de contrato inteligente Hello World que usaremos para este tutorial. Copie o conteúdo abaixo para o arquivo `HelloWorld.sol`.

_Nota: Certifique-se de ler os comentários para entender o que este contrato faz._

```
// Especifica a versão do Solidity, usando versionamento semântico.
// Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Define um contrato chamado `HelloWorld`.
// Um contrato é uma coleção de funções e dados (seu estado). Uma vez implantado, um contrato reside em um endereço específico na blockchain Ethereum. Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Emitido quando a função update é chamada
   // Os eventos de contratos inteligentes são uma maneira de o seu contrato comunicar que algo aconteceu na blockchain para o front-end do seu aplicativo, que pode estar 'ouvindo' certos eventos e agir quando eles acontecerem.
   event UpdatedMessages(string oldStr, string newStr);

   // Declara uma variável de estado `message` do tipo `string`.
   // Variáveis de estado são variáveis cujos valores são armazenados permanentemente no armazenamento do contrato. A palavra-chave `public` torna as variáveis acessíveis de fora de um contrato e cria uma função que outros contratos ou clientes podem chamar para acessar o valor.
   string public message;

   // Semelhante a muitas linguagens orientadas a objetos baseadas em classes, um construtor é uma função especial que só é executada na criação do contrato.
   // Construtores são usados para inicializar os dados do contrato. Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Aceita um argumento de string `initMessage` e define o valor na variável de armazenamento `message` do contrato).
      message = initMessage;
   }

   // Uma função pública que aceita um argumento de string e atualiza a variável de armazenamento `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Este é um contrato inteligente básico que armazena uma mensagem no momento da criação. Ele pode ser atualizado chamando a função `update`.

### Passo 11: Conectar a MetaMask e o Alchemy ao seu projeto {#step-11-connect-metamask-alchemy-to-your-project}

Criamos uma carteira MetaMask, uma conta no Alchemy e escrevemos nosso contrato inteligente, agora é hora de conectar os três.

Toda transação enviada da sua carteira requer uma assinatura usando sua chave privada exclusiva. Para fornecer essa permissão ao nosso programa, podemos armazenar nossa chave privada com segurança em um arquivo de ambiente. Também armazenaremos uma chave de API para o Alchemy aqui.

> Para saber mais sobre o envio de transações, confira [este tutorial](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) sobre como enviar transações usando a Web3.

Primeiro, instale o pacote dotenv no diretório do seu projeto:

```
npm install dotenv --save
```

Em seguida, crie um arquivo `.env` no diretório raiz do projeto. Adicione sua chave privada da MetaMask e a URL da API HTTP do Alchemy a ele.

Seu arquivo de ambiente deve ser nomeado `.env` ou não será reconhecido como um arquivo de ambiente.

Não o nomeie como `process.env` ou `.env-custom` ou qualquer outra coisa.

- Siga [estas instruções](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) para exportar sua chave privada
- Veja abaixo como obter a URL da API HTTP do Alchemy

![Animated walkthrough of getting an Alchemy API key](./get-alchemy-api-key.gif)

Seu `.env` deve ficar assim:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Para realmente conectá-los ao nosso código, faremos referência a essas variáveis em nosso arquivo `hardhat.config.js` no passo 13.

### Passo 12: Instalar o Ethers.js {#step-12-install-ethersjs}

O Ethers.js é uma biblioteca que facilita a interação e a realização de solicitações ao Ethereum, envolvendo [métodos JSON-RPC padrão](/developers/docs/apis/json-rpc/) com métodos mais amigáveis.

O Hardhat nos permite integrar [plugins](https://hardhat.org/plugins/) para ferramentas adicionais e funcionalidade estendida. Aproveitaremos o [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) para a implantação do contrato.

No diretório do seu projeto, digite:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Passo 13: Atualizar o hardhat.config.js {#step-13-update-hardhat-configjs}

Adicionamos várias dependências e plugins até agora, agora precisamos atualizar o `hardhat.config.js` para que nosso projeto saiba sobre todos eles.

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

### Passo 14: Compilar nosso contrato {#step-14-compile-our-contract}

Para garantir que tudo esteja funcionando até agora, vamos compilar nosso contrato. A tarefa `compile` é uma das tarefas integradas do Hardhat.

Na linha de comando, execute:

```bash
npx hardhat compile
```

Você pode receber um aviso sobre `SPDX license identifier not provided in source file`, mas não precisa se preocupar com isso — esperançosamente, todo o resto parece bom! Se não, você sempre pode enviar uma mensagem no [Discord do Alchemy](https://discord.gg/u72VCg3).

### Passo 15: Escrever nosso script de implantação {#step-15-write-our-deploy-script}

Agora que nosso contrato está escrito e nosso arquivo de configuração está pronto, é hora de escrever nosso script de implantação de contrato.

Navegue até a pasta `scripts/` e crie um novo arquivo chamado `deploy.js`, adicionando o seguinte conteúdo a ele:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // Iniciar a implantação, retornando uma promise que é resolvida em um objeto de contrato
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

O Hardhat faz um trabalho incrível ao explicar o que cada uma dessas linhas de código faz em seu [tutorial de Contratos](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), adotamos as explicações deles aqui.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

Um `ContractFactory` no ethers.js é uma abstração usada para implantar novos contratos inteligentes, então `HelloWorld` aqui é uma [fábrica (factory)](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>) para instâncias do nosso contrato hello world. Ao usar o plugin `hardhat-ethers`, `ContractFactory` e `Contract`, as instâncias são conectadas ao primeiro signatário (proprietário) por padrão.

```javascript
const hello_world = await HelloWorld.deploy()
```

Chamar `deploy()` em um `ContractFactory` iniciará a implantação e retornará uma `Promise` que é resolvida em um objeto `Contract`. Este é o objeto que possui um método para cada uma das funções do nosso contrato inteligente.

### Passo 16: Implantar nosso contrato {#step-16-deploy-our-contract}

Finalmente estamos prontos para implantar nosso contrato inteligente! Navegue até a linha de comando e execute:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Você deverá ver algo como:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Por favor, salve este endereço**. Nós o usaremos mais adiante no tutorial.

Se formos ao [Etherscan da Goerli](https://goerli.etherscan.io) e pesquisarmos o endereço do nosso contrato, deveremos ver que ele foi implantado com sucesso. A transação será parecida com esta:

![](./etherscan-contract.png)

O endereço `From` deve corresponder ao endereço da sua conta MetaMask e o endereço `To` dirá **Contract Creation** (Criação de Contrato). Se clicarmos na transação, veremos o endereço do nosso contrato no campo `To`.

![](./etherscan-transaction.png)

Parabéns! Você acabou de implantar um contrato inteligente em uma rede de teste Ethereum.

Para entender o que está acontecendo internamente, vamos navegar até a guia Explorer no nosso [painel do Alchemy](https://dashboard.alchemy.com/explorer). Se você tiver vários aplicativos no Alchemy, certifique-se de filtrar por aplicativo e selecionar **Hello World**.

![](./hello-world-explorer.png)

Aqui você verá alguns métodos JSON-RPC que o Hardhat/Ethers fez internamente para nós quando chamamos a função `.deploy()`. Dois métodos importantes aqui são [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction), que é a solicitação para gravar nosso contrato na cadeia Goerli, e [`eth_getTransactionByHash`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-by-hash), que é uma solicitação para ler informações sobre nossa transação dado o hash. Para saber mais sobre o envio de transações, confira [nosso tutorial sobre como enviar transações usando a Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## Parte 2: Interaja com seu contrato inteligente {#part-2-interact-with-your-smart-contract}

Agora que implantamos com sucesso um contrato inteligente na rede Goerli, vamos aprender como interagir com ele.

### Crie um arquivo interact.js {#create-a-interactjs-file}

Este é o arquivo onde escreveremos nosso script de interação. Usaremos a biblioteca Ethers.js que você instalou anteriormente na Parte 1.

Dentro da pasta `scripts/`, crie um novo arquivo chamado `interact.js` e adicione o seguinte código:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Atualize seu arquivo .env {#update-your-env-file}

Usaremos novas variáveis de ambiente, então precisamos defini-las no arquivo `.env` que [criamos anteriormente](#step-11-connect-metamask-alchemy-to-your-project).

Precisaremos adicionar uma definição para nossa `API_KEY` do Alchemy e o `CONTRACT_ADDRESS` onde seu contrato inteligente foi implantado.

Seu arquivo `.env` deve ficar parecido com isto:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### Obtenha a ABI do seu contrato {#grab-your-contract-abi}

A [ABI (Application Binary Interface)](/glossary/#abi) do nosso contrato é a interface para interagir com nosso contrato inteligente. O Hardhat gera automaticamente uma ABI e a salva em `HelloWorld.json`. Para usar a ABI, precisaremos analisar o conteúdo adicionando as seguintes linhas de código ao nosso arquivo `interact.js`:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Se você quiser ver a ABI, pode imprimi-la no seu console:

```javascript
console.log(JSON.stringify(contract.abi))
```

Para ver sua ABI impressa no console, navegue até o seu terminal e execute:

```bash
npx hardhat run scripts/interact.js
```

### Crie uma instância do seu contrato {#create-an-instance-of-your-contract}

Para interagir com nosso contrato, precisamos criar uma instância do contrato em nosso código. Para fazer isso com o Ethers.js, precisaremos trabalhar com três conceitos:

1. Provedor (Provedor) - um provedor de nó que lhe dá acesso de leitura e gravação à blockchain
2. Signatário (Signatário) - representa uma conta Ethereum que pode assinar transações
3. Contract (Contrato) - um objeto Ethers.js representando um contrato específico implantado na cadeia (onchain)

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

Saiba mais sobre Providers, Signers e Contracts na [documentação do ethers.js](https://docs.ethers.io/v5/).

### Leia a mensagem de inicialização {#read-the-init-message}

Lembra quando implantamos nosso contrato com a `initMessage = "Hello world!"`? Agora vamos ler essa mensagem armazenada em nosso contrato inteligente e imprimi-la no console.

Em JavaScript, funções assíncronas são usadas ao interagir com redes. Para saber mais sobre funções assíncronas, [leia este artigo no Medium](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Use o código abaixo para chamar a função `message` em nosso contrato inteligente e ler a mensagem de inicialização:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

Após executar o arquivo usando `npx hardhat run scripts/interact.js` no terminal, devemos ver esta resposta:

```
The message is: Hello world!
```

Parabéns! Você acabou de ler com sucesso os dados do contrato inteligente da blockchain do Ethereum, muito bem!

### Atualize a mensagem {#update-the-message}

Em vez de apenas ler a mensagem, também podemos atualizar a mensagem salva em nosso contrato inteligente usando a função `update`! Muito legal, não é?

Para atualizar a mensagem, podemos chamar diretamente a função `update` em nosso objeto Contract instanciado:

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

Observe que na linha 11, fazemos uma chamada para `.wait()` no objeto de transação retornado. Isso garante que nosso script aguarde a transação ser minerada na blockchain antes de sair da função. Se a chamada `.wait()` não for incluída, o script pode não ver o valor atualizado de `message` no contrato.

### Leia a nova mensagem {#read-the-new-message}

Você deve ser capaz de repetir a [etapa anterior](#read-the-init-message) para ler o valor atualizado de `message`. Reserve um momento e veja se você consegue fazer as alterações necessárias para imprimir esse novo valor!

Se precisar de uma dica, veja como seu arquivo `interact.js` deve ficar neste ponto:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// provedor - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// signatário - você
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// instância do contrato
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

Agora é só executar o script e você deverá ver a mensagem antiga, o status de atualização e a nova mensagem impressos no seu terminal!

`npx hardhat run scripts/interact.js --network goerli`

```
The message is: Hello World!
Updating the message...
The new message is: This is the new message.
```

Ao executar esse script, você pode notar que a etapa `Updating the message...` demora um pouco para carregar antes que a nova mensagem seja carregada. Isso se deve ao processo de mineração; se você estiver curioso sobre o rastreamento de transações enquanto elas estão sendo mineradas, visite o [mempool do Alchemy](https://dashboard.alchemy.com/mempool) para ver o status de uma transação. Se a transação for descartada, também é útil verificar o [Etherscan da Goerli](https://goerli.etherscan.io) e pesquisar pelo hash da sua transação.

## Parte 3: Publique seu contrato inteligente no Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Você fez todo o trabalho duro de dar vida ao seu contrato inteligente; agora é hora de compartilhá-lo com o mundo!

Ao verificar seu contrato inteligente no Etherscan, qualquer pessoa pode visualizar seu código-fonte e interagir com seu contrato inteligente. Vamos começar!

### Passo 1: Gere uma chave de API na sua conta do Etherscan {#step-1-generate-an-api-key-on-your-etherscan-account}

Uma chave de API do Etherscan é necessária para verificar se você é o proprietário do contrato inteligente que está tentando publicar.

Se você ainda não tem uma conta no Etherscan, [inscreva-se para criar uma conta](https://etherscan.io/register).

Após fazer o login, encontre seu nome de usuário na barra de navegação, passe o mouse sobre ele e selecione o botão **My profile**.

Na sua página de perfil, você deve ver uma barra de navegação lateral. Na barra de navegação lateral, selecione **API Keys**. Em seguida, pressione o botão "Add" para criar uma nova chave de API, nomeie seu aplicativo como **hello-world** e pressione o botão **Create New API Key**.

Sua nova chave de API deve aparecer na tabela de chaves de API. Copie a chave de API para a sua área de transferência.

Em seguida, precisamos adicionar a chave de API do Etherscan ao nosso arquivo `.env`.

Depois de adicioná-la, seu arquivo `.env` deve ficar assim:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Contratos inteligentes implantados com Hardhat {#hardhat-deployed-smart-contracts}

#### Instale o hardhat-etherscan {#install-hardhat-etherscan}

Publicar seu contrato no Etherscan usando o Hardhat é simples. Primeiro, você precisará instalar o plugin `hardhat-etherscan` para começar. O `hardhat-etherscan` verificará automaticamente o código-fonte e a ABI do contrato inteligente no Etherscan. Para adicionar isso, no diretório `hello-world`, execute:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Uma vez instalado, inclua a seguinte instrução no topo do seu `hardhat.config.js` e adicione as opções de configuração do Etherscan:

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
    // Sua chave de API para o Etherscan
    // Obtenha uma em https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Verifique seu contrato inteligente no Etherscan {#verify-your-smart-contract-on-etherscan}

Certifique-se de que todos os arquivos estejam salvos e todas as variáveis `.env` estejam configuradas corretamente.

Execute a tarefa `verify`, passando o endereço do contrato e a rede onde ele foi implantado:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

Certifique-se de que `DEPLOYED_CONTRACT_ADDRESS` seja o endereço do seu contrato inteligente implantado na rede de teste Goerli. Além disso, o argumento final (`'Hello World!'`) deve ser o mesmo valor de string usado [durante a etapa de implantação na parte 1](#step-15-write-our-deploy-script).

Se tudo correr bem, você verá a seguinte mensagem no seu terminal:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

Parabéns! O código do seu contrato inteligente está no Etherscan!

### Confira seu contrato inteligente no Etherscan! {#check-out-your-smart-contract-on-etherscan}

Ao navegar para o link fornecido no seu terminal, você deverá ser capaz de ver o código do seu contrato inteligente e a ABI publicados no Etherscan!

**Uhuuu - você conseguiu, campeão! Agora qualquer pessoa pode chamar ou escrever no seu contrato inteligente! Mal podemos esperar para ver o que você vai construir a seguir!**

## Parte 4 - Integrando seu contrato inteligente com o frontend {#part-4-integrating-your-smart-contract-with-the-frontend}

Ao final deste tutorial, você saberá como:

- Conectar uma carteira MetaMask ao seu dapp
- Ler dados do seu contrato inteligente usando a API [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)
- Assinar transações Ethereum usando o MetaMask

Para este dapp, usaremos o [React](https://react.dev/) como nosso framework de frontend; no entanto, é importante notar que não passaremos muito tempo detalhando seus fundamentos, pois focaremos principalmente em trazer a funcionalidade Web3 para o nosso projeto.

Como pré-requisito, você deve ter um entendimento de nível iniciante de React. Caso contrário, recomendamos concluir o [tutorial oficial de Introdução ao React](https://react.dev/learn).

### Clonar os arquivos iniciais {#clone-the-starter-files}

Primeiro, acesse o [repositório do GitHub hello-world-part-four](https://github.com/alchemyplatform/hello-world-part-four-tutorial) para obter os arquivos iniciais deste projeto e clone este repositório em sua máquina local.

Abra o repositório clonado localmente. Observe que ele contém duas pastas: `starter-files` e `completed`.

- `starter-files`- **trabalharemos neste diretório**, conectaremos a interface do usuário à sua carteira Ethereum e ao contrato inteligente que publicamos no Etherscan na [Parte 3](#part-3-publish-your-smart-contract-to-etherscan).
- `completed` contém todo o tutorial concluído e deve ser usado apenas como referência se você ficar travado.

Em seguida, abra sua cópia de `starter-files` no seu editor de código favorito e navegue até a pasta `src`.

Todo o código que escreveremos ficará na pasta `src`. Editaremos o componente `HelloWorld.js` e os arquivos JavaScript `util/interact.js` para dar funcionalidade Web3 ao nosso projeto.

### Conferir os arquivos iniciais {#check-out-the-starter-files}

Antes de começarmos a programar, vamos explorar o que nos é fornecido nos arquivos iniciais.

#### Executar seu projeto React {#get-your-react-project-running}

Vamos começar executando o projeto React em nosso navegador. A beleza do React é que, uma vez que nosso projeto esteja rodando no navegador, quaisquer alterações que salvarmos serão atualizadas ao vivo no navegador.

Para executar o projeto, navegue até o diretório raiz da pasta `starter-files` e execute `npm install` no seu terminal para instalar as dependências do projeto:

```bash
cd starter-files
npm install
```

Assim que a instalação terminar, execute `npm start` no seu terminal:

```bash
npm start
```

Fazer isso deve abrir [http://localhost:3000/](http://localhost:3000/) no seu navegador, onde você verá o frontend do nosso projeto. Ele deve consistir em um campo \(um lugar para atualizar a mensagem armazenada no seu contrato inteligente\), um botão "Connect Wallet" (Conectar Carteira) e um botão "Update" (Atualizar).

Se você tentar clicar em qualquer um dos botões, notará que eles não funcionam — isso ocorre porque ainda precisamos programar a funcionalidade deles.

#### O componente `HelloWorld.js` {#the-helloworld-js-component}

Vamos voltar para a pasta `src` no nosso editor e abrir o arquivo `HelloWorld.js`. É super importante que entendamos tudo neste arquivo, pois é o principal componente React no qual trabalharemos.

No topo deste arquivo, você notará que temos várias declarações de importação que são necessárias para fazer nosso projeto rodar, incluindo a biblioteca React, os hooks useEffect e useState, alguns itens do `./util/interact.js` (vamos descrevê-los com mais detalhes em breve!) e o logotipo da Alchemy.

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

Em seguida, temos nossas variáveis de estado que atualizaremos após eventos específicos.

```javascript
// HelloWorld.js

//Variáveis de estado
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

Aqui está o que cada uma das variáveis representa:

- `walletAddress` - uma string que armazena o endereço da carteira do usuário
- `status` - uma string que armazena uma mensagem útil que orienta o usuário sobre como interagir com o dapp
- `message` - uma string que armazena a mensagem atual no contrato inteligente
- `newMessage` - uma string que armazena a nova mensagem que será gravada no contrato inteligente

Após as variáveis de estado, você verá cinco funções não implementadas: `useEffect` ,`addSmartContractListener`, `addWalletListener` , `connectWalletPressed` e `onUpdatePressed`. Explicaremos o que elas fazem abaixo:

```javascript
// HelloWorld.js

//chamada apenas uma vez
useEffect(async () => {
  //TODO: implementararararar
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

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - este é um hook do React que é chamado após a renderização do seu componente. Como ele tem uma propriedade de array vazio `[]` passada para ele \(veja a linha 4\), ele só será chamado na _primeira_ renderização do componente. Aqui carregaremos a mensagem atual armazenada em nosso contrato inteligente, chamaremos nossos ouvintes (listeners) de contrato inteligente e carteira, e atualizaremos nossa interface do usuário para refletir se uma carteira já está conectada.
- `addSmartContractListener` - esta função configura um ouvinte que observará o evento `UpdatedMessages` do nosso contrato HelloWorld e atualizará nossa interface do usuário quando a mensagem for alterada em nosso contrato inteligente.
- `addWalletListener` - esta função configura um ouvinte que detecta alterações no estado da carteira MetaMask do usuário, como quando o usuário desconecta sua carteira ou troca de endereços.
- `connectWalletPressed` - esta função será chamada para conectar a carteira MetaMask do usuário ao nosso dapp.
- `onUpdatePressed` - esta função será chamada quando o usuário quiser atualizar a mensagem armazenada no contrato inteligente.

Perto do final deste arquivo, temos a interface do usuário do nosso componente.

```javascript
// HelloWorld.js

//a interface de usuário do nosso componente
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

Se você analisar este código com cuidado, notará onde usamos nossas várias variáveis de estado em nossa interface do usuário:

- Nas linhas 6-12, se a carteira do usuário estiver conectada \(ou seja, `walletAddress.length > 0`\), exibimos uma versão truncada do `walletAddress` do usuário no botão com o ID "walletButton"; caso contrário, ele simplesmente diz "Connect Wallet".
- Na linha 17, exibimos a mensagem atual armazenada no contrato inteligente, que é capturada na string `message`.
- Nas linhas 23-26, usamos um [componente controlado](https://legacy.reactjs.org/docs/forms.html#controlled-components) para atualizar nossa variável de estado `newMessage` quando a entrada no campo de texto muda.

Além de nossas variáveis de estado, você também verá que as funções `connectWalletPressed` e `onUpdatePressed` são chamadas quando os botões com os IDs `publishButton` e `walletButton` são clicados, respectivamente.

Por fim, vamos abordar onde este componente `HelloWorld.js` é adicionado.

Se você for ao arquivo `App.js`, que é o componente principal no React que atua como um contêiner para todos os outros componentes, verá que nosso componente `HelloWorld.js` é injetado na linha 7.

Por último, mas não menos importante, vamos conferir mais um arquivo fornecido para você, o arquivo `interact.js`.

#### O arquivo `interact.js` {#the-interact-js-file}

Como queremos seguir o paradigma [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), precisaremos de um arquivo separado que contenha todas as nossas funções para gerenciar a lógica, os dados e as regras do nosso dapp, e então poder exportar essas funções para o nosso frontend \(nosso componente `HelloWorld.js`\).

👆🏽Este é o propósito exato do nosso arquivo `interact.js`!

Navegue até a pasta `util` no seu diretório `src` e você notará que incluímos um arquivo chamado `interact.js` que conterá todas as nossas funções e variáveis de interação com o contrato inteligente e a carteira.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Você notará no topo do arquivo que comentamos o objeto `helloWorldContract`. Mais adiante neste tutorial, vamos descomentar este objeto e instanciar nosso contrato inteligente nesta variável, que então exportaremos para o nosso componente `HelloWorld.js`.

As quatro funções não implementadas após o nosso objeto `helloWorldContract` fazem o seguinte:

- `loadCurrentMessage` - esta função lida com a lógica de carregar a mensagem atual armazenada no contrato inteligente. Ela fará uma chamada de _leitura_ para o contrato inteligente Hello World usando a [API Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet` - esta função conectará o MetaMask do usuário ao nosso dapp.
- `getCurrentWalletConnected` - esta função verificará se uma conta Ethereum já está conectada ao nosso dapp no carregamento da página e atualizará nossa interface do usuário de acordo.
- `updateMessage` - esta função atualizará a mensagem armazenada no contrato inteligente. Ela fará uma chamada de _gravação_ para o contrato inteligente Hello World, então a carteira MetaMask do usuário terá que assinar uma transação Ethereum para atualizar a mensagem.

Agora que entendemos com o que estamos trabalhando, vamos descobrir como ler do nosso contrato inteligente!

### Passo 3: Ler do seu contrato inteligente {#step-3-read-from-your-smart-contract}

Para ler do seu contrato inteligente, você precisará configurar com sucesso:

- Uma conexão de API com a cadeia Ethereum
- Uma instância carregada do seu contrato inteligente
- Uma função para chamar a função do seu contrato inteligente
- Um ouvinte para observar atualizações quando os dados que você está lendo do contrato inteligente mudarem

Isso pode parecer muitos passos, mas não se preocupe! Vamos orientá-lo sobre como fazer cada um deles passo a passo! :\)

#### Estabelecer uma conexão de API com a cadeia Ethereum {#establish-an-api-connection-to-the-ethereum-chain}

Então, lembra como na Parte 2 deste tutorial, usamos nossa chave Alchemy Web3 para ler do nosso contrato inteligente? Você também precisará de uma chave Alchemy Web3 no seu aplicativo descentralizado (dapp) para ler da cadeia.

Se você ainda não a tem, primeiro instale o [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) navegando até o diretório raiz dos seus `starter-files` e executando o seguinte no seu terminal:

```text
npm install @alch/alchemy-web3
```

O [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) é um wrapper em torno do [Web3.js](https://docs.web3js.org/), fornecendo métodos de API aprimorados e outros benefícios cruciais para facilitar sua vida como desenvolvedor Web3. Ele foi projetado para exigir configuração mínima, para que você possa começar a usá-lo em seu aplicativo imediatamente!

Em seguida, instale o pacote [dotenv](https://www.npmjs.com/package/dotenv) no diretório do seu projeto, para que tenhamos um local seguro para armazenar nossa chave de API depois de buscá-la.

```text
npm install dotenv --save
```

Para o nosso dapp, **usaremos nossa chave de API de Websockets** em vez da nossa chave de API HTTP, pois isso nos permitirá configurar um ouvinte que detecta quando a mensagem armazenada no contrato inteligente muda.

Assim que você tiver sua chave de API, crie um arquivo `.env` no seu diretório raiz e adicione a URL de Websockets do Alchemy a ele. Depois disso, seu arquivo `.env` deve ficar assim:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

Agora, estamos prontos para configurar nosso endpoint Alchemy Web3 no nosso dapp! Vamos voltar ao nosso `interact.js`, que está aninhado dentro da nossa pasta `util`, e adicionar o seguinte código no topo do arquivo:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

Acima, primeiro importamos a chave do Alchemy do nosso arquivo `.env` e depois passamos nossa `alchemyKey` para `createAlchemyWeb3` para estabelecer nosso endpoint Alchemy Web3.

Com este endpoint pronto, é hora de carregar nosso contrato inteligente!
#### Carregando seu contrato inteligente Hello World {#loading-your-hello-world-smart-contract}

Para carregar seu contrato inteligente Hello World, você precisará do endereço do contrato e da ABI, ambos os quais podem ser encontrados no Etherscan se você concluiu a [Parte 3 deste tutorial.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### Como obter a ABI do seu contrato no Etherscan {#how-to-get-your-contract-abi-from-etherscan}

Se você pulou a Parte 3 deste tutorial, pode usar o contrato HelloWorld com o endereço [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). Sua ABI pode ser encontrada [aqui](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

A ABI de um contrato é necessária para especificar qual função um contrato invocará, bem como garantir que a função retornará dados no formato que você espera. Depois de copiarmos a ABI do nosso contrato, vamos salvá-la como um arquivo JSON chamado `contract-abi.json` no seu diretório `src`.

Seu contract-abi.json deve ser armazenado na sua pasta src.

Armados com o endereço do nosso contrato, a ABI e o endpoint Alchemy Web3, podemos usar o [método contract](https://docs.web3js.org/api/web3-eth-contract/class/Contract) para carregar uma instância do nosso contrato inteligente. Importe a ABI do seu contrato para o arquivo `interact.js` e adicione o endereço do seu contrato.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Agora podemos finalmente descomentar nossa variável `helloWorldContract` e carregar o contrato inteligente usando nosso endpoint AlchemyWeb3:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Para recapitular, as primeiras 12 linhas do seu `interact.js` agora devem ficar assim:

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

Agora que temos nosso contrato carregado, podemos implementar nossa função `loadCurrentMessage`!

#### Implementando `loadCurrentMessage` no seu arquivo `interact.js` {#implementing-loadcurrentmessage-in-your-interact-js-file}

Esta função é super simples. Faremos uma chamada web3 assíncrona simples para ler do nosso contrato. Nossa função retornará a mensagem armazenada no contrato inteligente:

Atualize o `loadCurrentMessage` no seu arquivo `interact.js` para o seguinte:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Como queremos exibir este contrato inteligente em nossa interface do usuário, vamos atualizar a função `useEffect` em nosso componente `HelloWorld.js` para o seguinte:

```javascript
// HelloWorld.js

//chamada apenas uma vez
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Observe que queremos que nosso `loadCurrentMessage` seja chamado apenas uma vez durante a primeira renderização do componente. Em breve implementaremos `addSmartContractListener` para atualizar automaticamente a interface do usuário após a alteração da mensagem no contrato inteligente.

Antes de mergulharmos em nosso ouvinte, vamos conferir o que temos até agora! Salve seus arquivos `HelloWorld.js` e `interact.js` e, em seguida, acesse [http://localhost:3000/](http://localhost:3000/)

Você notará que a mensagem atual não diz mais "No connection to the network" (Sem conexão com a rede). Em vez disso, ela reflete a mensagem armazenada no contrato inteligente. Irado!

#### Sua interface do usuário agora deve refletir a mensagem armazenada no contrato inteligente {#your-ui-should-now-reflect-the-message-stored-in-the-smart-contract}

Agora, falando sobre esse ouvinte...

#### Implementar `addSmartContractListener` {#implement-addsmartcontractlistener}

Se você se lembrar do arquivo `HelloWorld.sol` que escrevemos na [Parte 1 desta série de tutoriais](#step-10-write-our-contract), lembrará que há um evento de contrato inteligente chamado `UpdatedMessages` que é emitido após a função `update` do nosso contrato inteligente ser invocada \(veja as linhas 9 e 27\):

```javascript
// HelloWorld.sol

// Especifica a versão da Solidity, usando versionamento semântico.
// Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Define um contrato chamado `HelloWorld`.
// Um contrato é uma coleção de funções e dados (seu estado). Uma vez implantado, um contrato reside em um endereço específico na blockchain Ethereum. Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitido quando a função de atualização é chamada
   //Eventos de contrato inteligente são uma maneira de o seu contrato comunicar que algo aconteceu na blockchain para o front-end do seu aplicativo, que pode estar 'ouvindo' certos eventos e tomar medidas quando eles acontecerem.
   event UpdatedMessages(string oldStr, string newStr);

   // Declara uma variável de estado `message` do tipo `string`.
   // Variáveis de estado são variáveis cujos valores são armazenados permanentemente no armazenamento do contrato. A palavra-chave `public` torna as variáveis acessíveis de fora de um contrato e cria uma função que outros contratos ou clientes podem chamar para acessar o valor.
   string public message;

   // Semelhante a muitas linguagens orientadas a objetos baseadas em classes, um construtor é uma função especial que é executada apenas na criação do contrato.
   // Construtores são usados para inicializar os dados do contrato. Saiba mais:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Aceita um argumento de string `initMessage` e define o valor na variável de armazenamento `message` do contrato).
      message = initMessage;
   }

   // Uma função pública que aceita um argumento de string e atualiza a variável de armazenamento `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Os eventos de contrato inteligente são uma maneira de o seu contrato comunicar que algo aconteceu \(ou seja, houve um _evento_\) na blockchain para o seu aplicativo front-end, que pode estar 'ouvindo' eventos específicos e tomar medidas quando eles acontecerem.

A função `addSmartContractListener` ouvirá especificamente o evento `UpdatedMessages` do nosso contrato inteligente Hello World e atualizará nossa interface do usuário para exibir a nova mensagem.

Modifique `addSmartContractListener` para o seguinte:

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

Vamos detalhar o que acontece quando o ouvinte detecta um evento:

- Se ocorrer um erro quando o evento for emitido, ele será refletido na interface do usuário por meio da nossa variável de estado `status`.
- Caso contrário, usaremos o objeto `data` retornado. O `data.returnValues` é um array indexado em zero onde o primeiro elemento no array armazena a mensagem anterior e o segundo elemento armazena a atualizada. Ao todo, em um evento bem-sucedido, definiremos nossa string `message` para a mensagem atualizada, limparemos a string `newMessage` e atualizaremos nossa variável de estado `status` para refletir que uma nova mensagem foi publicada em nosso contrato inteligente.

Por fim, vamos chamar nosso ouvinte em nossa função `useEffect` para que ele seja inicializado na primeira renderização do componente `HelloWorld.js`. Ao todo, sua função `useEffect` deve ficar assim:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Agora que somos capazes de ler do nosso contrato inteligente, seria ótimo descobrir como gravar nele também! No entanto, para gravar em nosso dapp, primeiro devemos ter uma carteira Ethereum conectada a ele.

Então, a seguir, abordaremos a configuração da nossa carteira Ethereum \(MetaMask\) e, em seguida, a conectaremos ao nosso dapp!

### Passo 4: Configurar sua carteira Ethereum {#step-4-set-up-your-ethereum-wallet}

Para gravar qualquer coisa na cadeia Ethereum, os usuários devem assinar transações usando as chaves privadas de sua carteira virtual. Para este tutorial, usaremos o [MetaMask](https://metamask.io/), uma carteira virtual no navegador usada para gerenciar o endereço da sua conta Ethereum, pois torna essa assinatura de transação super fácil para o usuário final.

Se você quiser entender mais sobre como as transações no Ethereum funcionam, confira [esta página](/developers/docs/transactions/) da fundação Ethereum.

#### Baixar o MetaMask {#download-metamask}

Você pode baixar e criar uma conta MetaMask gratuitamente [aqui](https://metamask.io/download). Ao criar uma conta, ou se você já tiver uma, certifique-se de mudar para a “Goerli Test Network” no canto superior direito \(para que não estejamos lidando com dinheiro real\).

#### Adicionar ether de um Faucet {#add-ether-from-a-faucet}

Para assinar uma transação na blockchain Ethereum, precisaremos de algum ETH falso. Para obter ETH, você pode ir ao [FaucETH](https://fauceth.komputing.org) e inserir o endereço da sua conta Goerli, clicar em “Request funds” (Solicitar fundos), selecionar “Ethereum Testnet Goerli” no menu suspenso e, finalmente, clicar no botão “Request funds” novamente. Você deve ver ETH na sua conta MetaMask logo depois!

#### Verifique seu saldo {#check-your-balance}

Para verificar se o nosso saldo está lá, vamos fazer uma solicitação [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) usando a [ferramenta sandbox do Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Isso retornará a quantidade de ETH na nossa carteira. Depois de inserir o endereço da sua conta MetaMask e clicar em “Send Request”, você deverá ver uma resposta como esta:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**NOTA:** Este resultado está em wei, não em ETH. Wei é usado como a menor denominação de ether. A conversão de wei para ETH é: 1 ETH = 10¹⁸ wei. Portanto, se convertermos 0xde0b6b3a7640000 para decimal, obteremos 1\*10¹⁸, o que equivale a 1 ETH.

Ufa! Nosso dinheiro falso está todo lá! 🤑
### Passo 5: Conectar o MetaMask à sua interface do usuário {#step-5-connect-metamask-to-your-ui}

Agora que nossa carteira MetaMask está configurada, vamos conectar nosso dapp a ela!

#### A função `connectWallet` {#the-connectwallet-function}

No nosso arquivo `interact.js`, vamos implementar a função `connectWallet`, que podemos então chamar no nosso componente `HelloWorld.js`.

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
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
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

Bem, primeiro, ele verifica se o `window.ethereum` está ativado no seu navegador.

O `window.ethereum` é uma API global injetada pelo MetaMask e outros provedores de carteira que permite que sites solicitem as contas Ethereum dos usuários. Se aprovado, ele pode ler dados das blockchains às quais o usuário está conectado e sugerir que o usuário assine mensagens e transações. Confira a [documentação do MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) para mais informações!

Se o `window.ethereum` _não estiver_ presente, isso significa que o MetaMask não está instalado. Isso resulta no retorno de um objeto JSON, onde o `address` retornado é uma string vazia, e o objeto JSX `status` transmite que o usuário deve instalar o MetaMask.

Agora, se o `window.ethereum` _estiver_ presente, é aí que as coisas ficam interessantes.

Usando um loop try/catch, tentaremos nos conectar ao MetaMask chamando [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Chamar esta função abrirá o MetaMask no navegador, por meio do qual o usuário será solicitado a conectar sua carteira ao seu dapp.

- Se o usuário optar por se conectar, `method: "eth_requestAccounts"` retornará um array que contém todos os endereços de conta do usuário que se conectaram ao dapp. Ao todo, nossa função `connectWallet` retornará um objeto JSON que contém o _primeiro_ `address` neste array \(veja a linha 9\) e uma mensagem `status` que solicita ao usuário que escreva uma mensagem para o contrato inteligente.
- Se o usuário rejeitar a conexão, o objeto JSON conterá uma string vazia para o `address` retornado e uma mensagem `status` que reflete que o usuário rejeitou a conexão.

Agora que escrevemos esta função `connectWallet`, o próximo passo é chamá-la em nosso componente `HelloWorld.js`.

#### Adicionar a função `connectWallet` ao seu Componente de Interface do Usuário `HelloWorld.js` {#add-the-connectwallet-function-to-your-helloworld-js-ui-component}

Navegue até a função `connectWalletPressed` em `HelloWorld.js` e atualize-a para o seguinte:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Notou como a maior parte da nossa funcionalidade é abstraída do nosso componente `HelloWorld.js` a partir do arquivo `interact.js`? Isso é para estarmos em conformidade com o paradigma M-V-C!

Em `connectWalletPressed`, simplesmente fazemos uma chamada await para nossa função `connectWallet` importada e, usando sua resposta, atualizamos nossas variáveis `status` e `walletAddress` por meio de seus hooks de estado.

Agora, vamos salvar ambos os arquivos \(`HelloWorld.js` e `interact.js`\) e testar nossa interface do usuário até agora.

Abra seu navegador na página [http://localhost:3000/](http://localhost:3000/) e pressione o botão "Connect Wallet" no canto superior direito da página.

Se você tiver o MetaMask instalado, será solicitado a conectar sua carteira ao seu dapp. Aceite o convite para se conectar.

Você deve ver que o botão da carteira agora reflete que seu endereço está conectado! Isso aê 🔥

Em seguida, tente atualizar a página... isso é estranho. Nosso botão de carteira está nos solicitando a conectar o MetaMask, mesmo que ele já esteja conectado...

No entanto, não tenha medo! Podemos facilmente resolver isso implementando `getCurrentWalletConnected`, que verificará se um endereço já está conectado ao nosso dapp e atualizará nossa interface do usuário de acordo!

#### A função `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

Atualize sua função `getCurrentWalletConnected` no arquivo `interact.js` para o seguinte:

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
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
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

Este código é _muito_ semelhante à função `connectWallet` que acabamos de escrever no passo anterior.

A principal diferença é que, em vez de chamar o método `eth_requestAccounts`, que abre o MetaMask para o usuário conectar sua carteira, aqui chamamos o método `eth_accounts`, que simplesmente retorna um array contendo os endereços do MetaMask atualmente conectados ao nosso dapp.

Para ver esta função em ação, vamos chamá-la em nossa função `useEffect` do nosso componente `HelloWorld.js`:

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

Observe que usamos a resposta da nossa chamada para `getCurrentWalletConnected` para atualizar nossas variáveis de estado `walletAddress` e `status`.

Agora que você adicionou este código, vamos tentar atualizar a janela do nosso navegador.

Maneiro! O botão deve dizer que você está conectado e mostrar uma prévia do endereço da sua carteira conectada - mesmo depois de atualizar!

#### Implementar `addWalletListener` {#implement-addwalletlistener}

O passo final na configuração da carteira do nosso dapp é implementar o ouvinte da carteira para que nossa interface do usuário seja atualizada quando o estado da nossa carteira mudar, como quando o usuário se desconecta ou troca de contas.

No seu arquivo `HelloWorld.js`, modifique sua função `addWalletListener` para o seguinte:

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
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Aposto que você nem precisa da nossa ajuda para entender o que está acontecendo aqui neste ponto, mas por uma questão de rigor, vamos detalhar rapidamente:

- Primeiro, nossa função verifica se o `window.ethereum` está ativado \(ou seja, o MetaMask está instalado\).
  - Se não estiver, simplesmente definimos nossa variável de estado `status` para uma string JSX que solicita ao usuário que instale o MetaMask.
  - Se estiver ativado, configuramos o ouvinte `window.ethereum.on("accountsChanged")` na linha 3 que ouve as alterações de estado na carteira MetaMask, que incluem quando o usuário conecta uma conta adicional ao dapp, troca de contas ou desconecta uma conta. Se houver pelo menos uma conta conectada, a variável de estado `walletAddress` é atualizada como a primeira conta no array `accounts` retornado pelo ouvinte. Caso contrário, `walletAddress` é definido como uma string vazia.

Por último, mas não menos importante, devemos chamá-lo em nossa função `useEffect`:

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

E é isso! Concluímos com sucesso a programação de toda a funcionalidade da nossa carteira! Agora vamos para a nossa última tarefa: atualizar a mensagem armazenada em nosso contrato inteligente!

### Passo 6: Implementar a função `updateMessage` {#step-6-implement-the-updatemessage-function}

Muito bem pessoal, chegamos à reta final! No `updateMessage` do seu arquivo `interact.js`, faremos o seguinte:

1. Certificar-se de que a mensagem que desejamos publicar em nosso contrato inteligente é válida
2. Assinar nossa transação usando o MetaMask
3. Chamar esta função do nosso componente de frontend `HelloWorld.js`

Isso não vai demorar muito; vamos terminar este dapp!

#### Tratamento de erros de entrada {#input-error-handling}

Naturalmente, faz sentido ter algum tipo de tratamento de erros de entrada no início da função.

Queremos que nossa função retorne antecipadamente se não houver extensão do MetaMask instalada, se não houver carteira conectada \(ou seja, o `address` passado é uma string vazia\) ou se o `message` for uma string vazia. Vamos adicionar o seguinte tratamento de erros a `updateMessage`:

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

Agora que ele tem o tratamento adequado de erros de entrada, é hora de assinar a transação via MetaMask!

#### Assinando nossa transação {#signing-our-transaction}

Se você já está confortável com as transações tradicionais do Ethereum na Web3, o código que escreveremos a seguir será muito familiar. Abaixo do seu código de tratamento de erros de entrada, adicione o seguinte a `updateMessage`:

```javascript
// interact.js

//configurar parâmetros da transação
const transactionParameters = {
  to: contractAddress, // Obrigatório, exceto durante publicações de contrato.
  from: address, // deve corresponder ao endereço ativo do usuário.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//assinar a transação
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

Vamos detalhar o que está acontecendo. Primeiro, configuramos nossos parâmetros de transações, onde:

- `to` especifica o endereço do destinatário \(nosso contrato inteligente\)
- `from` especifica o signatário da transação, a variável `address` que passamos para nossa função
- `data` contém a chamada para o método `update` do nosso contrato inteligente Hello World, recebendo nossa variável de string `message` como entrada

Em seguida, fazemos uma chamada await, `window.ethereum.request`, onde pedimos ao MetaMask para assinar a transação. Observe que, nas linhas 11 e 12, estamos especificando nosso método eth, `eth_sendTransaction` e passando nosso `transactionParameters`.

Neste ponto, o MetaMask será aberto no navegador e solicitará ao usuário que assine ou rejeite a transação.

- Se a transação for bem-sucedida, a função retornará um objeto JSON onde a string JSX `status` solicita ao usuário que verifique o Etherscan para obter mais informações sobre sua transação.
- Se a transação falhar, a função retornará um objeto JSON onde a string `status` transmite a mensagem de erro.

Ao todo, nossa função `updateMessage` deve ficar assim:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //tratamento de erros de entrada
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

  //configurar parâmetros da transação
  const transactionParameters = {
    to: contractAddress, // Obrigatório, exceto durante publicações de contrato.
    from: address, // deve corresponder ao endereço ativo do usuário.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //assinar a transação
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

Por último, mas não menos importante, precisamos conectar nossa função `updateMessage` ao nosso componente `HelloWorld.js`.

#### Conectar `updateMessage` ao frontend `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

Nossa função `onUpdatePressed` deve fazer uma chamada await para a função `updateMessage` importada e modificar a variável de estado `status` para refletir se nossa transação foi bem-sucedida ou falhou:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

É super limpo e simples. E adivinha... SEU DAPP ESTÁ COMPLETO!!!

Vá em frente e teste o botão **Update**!

### Crie seu próprio dapp personalizado {#make-your-own-custom-dapp}

Uhuuu, você chegou ao final do tutorial! Para recapitular, você aprendeu como:

- Conectar uma carteira MetaMask ao seu projeto de dapp
- Ler dados do seu contrato inteligente usando a API [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)
- Assinar transações Ethereum usando o MetaMask

Agora você está totalmente equipado para aplicar as habilidades deste tutorial para construir seu próprio projeto de dapp personalizado! Como sempre, se você tiver alguma dúvida, não hesite em nos contatar para obter ajuda no [Discord do Alchemy](https://discord.gg/gWuC7zB). 🧙‍♂️

Depois de concluir este tutorial, conte-nos como foi sua experiência ou se você tem algum feedback nos marcando no Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform)!
