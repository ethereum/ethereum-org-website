---
title: Contrato inteligente "Hello World" para iniciantes - Fullstack
description: "Tutorial introdutório sobre como escrever e implantar um contrato inteligente simples no Ethereum."
author: "nstrike2"
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "smart contracts",
    "implantação",
    "explorador de blocos",
    "front-end",
    "transações"
  ]
skill: beginner
lang: pt-br
published: 2021-10-25
---

Este guia é para você que é iniciante em desenvolvimento de blockchain e não sabe por onde começar ou como implantar e interagir com contratos inteligentes. Vamos percorrer a criação e implantação de um contrato inteligente simples na rede de teste Goerli usando [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) e [Alchemy](https://alchemy.com/eth).

Você precisará de uma conta Alchemy para concluir este tutorial. [Cadastre-se para obter uma conta gratuita](https://www.alchemy.com/).

Se você tiver dúvidas a qualquer momento, sinta-se à vontade para entrar em contato no [Discord da Alchemy](https://discord.gg/gWuC7zB)!

## Parte 1 - Criar e implantar seu contrato inteligente usando Hardhat {#part-1}

### Conectar à rede Ethereum {#connect-to-the-ethereum-network}

Existem muitas maneiras de fazer solicitações para a cadeia Ethereum. Para simplificar, usaremos uma conta gratuita na Alchemy, uma plataforma de desenvolvedores de blockchain e API que nos permite comunicar com a cadeia Ethereum sem termos que executar nosso próprio nó. A Alchemy também possui ferramentas de desenvolvedor para monitoração e análise. Neste tutorial, vamos aproveitá-las para entender o que está acontecendo nos bastidores da implantação do nosso contrato inteligente.

### Crie seu aplicativo e sua chave de API {#create-your-app-and-api-key}

Assim que criar uma conta na Alchemy, você poderá gerar uma chave de API criando um aplicativo. Isso permitirá que você faça solicitações à rede de teste Goerli. Se você não está familiarizado com redes de teste, pode [ler o guia da Alchemy para escolher uma rede](https://www.alchemy.com/docs/choosing-a-web3-network).

No painel da Alchemy, encontre o menu suspenso **Apps** na barra de navegação e clique em **Criar App**.

![Hello world criar aplicativo](./hello-world-create-app.png)

Dê ao seu aplicativo o nome '_Hello World_' e escreva uma breve descrição. Selecione **Staging** como seu ambiente e **Goerli** como sua rede.

![visualização de criação de aplicativo hello world](./create-app-view-hello-world.png)

_Observação: certifique-se de selecionar **Goerli**, ou este tutorial não funcionará._

Clique em **Create app**. Seu aplicativo aparecerá na tabela abaixo.

### Crie uma conta Ethereum {#create-an-ethereum-account}

Você precisa de uma conta Ethereum para enviar e receber transações. Usaremos o MetaMask, uma carteira virtual no navegador que permite aos usuários gerenciar o endereço de sua conta Ethereum.

Você pode baixar e criar uma conta MetaMask gratuitamente [aqui](https://metamask.io/download). Quando você estiver criando uma conta, ou se já tiver uma, certifique-se de mudar para a “Rede de Teste Goerli” no canto superior direito (para não lidarmos com dinheiro real).

### Etapa 4: Adicione ether de um Faucet {#step-4-add-ether-from-a-faucet}

Para implantar nosso contrato inteligente na rede de teste, precisaremos de um pouco de ETH falso. Para obter ETH na rede Goerli, vá a um faucet da Goerli e insira o endereço de sua conta Goerli. Observe que as faucets da Goerli podem ser um pouco instáveis recentemente - consulte a [página de redes de teste](/developers/docs/networks/#goerli) para uma lista de opções para tentar:

_Observação: devido ao congestionamento da rede, isso pode demorar um pouco._
``

### Passo 5: Verifique seu saldo {#step-5-check-your-balance}

Para verificar se o ETH está em sua carteira, vamos fazer uma solicitação [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) usando a [ferramenta de composição da Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Ele mostrará a quantidade de ETH em nossa carteira. Para saber mais, confira o [breve tutorial da Alchemy sobre como usar a ferramenta de composição](https://youtu.be/r6sjRxBZJuU).

Insira o endereço da sua conta MetaMask e clique em **Send Request**. Você verá uma resposta que se parece com o trecho de código abaixo.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Observação: Este resultado está em wei, não em ETH. Wei é usado como a menor denominação de ether._

Ufa! O nosso dinheiro falso está todo lá.

### Passo 6: Inicialize nosso projeto {#step-6-initialize-our-project}

Primeiro, precisaremos criar uma pasta para o nosso projeto. Navegue para a sua linha de comando e insira o seguinte.

```
mkdir hello-world
cd hello-world
```

Agora que estamos dentro da pasta do nosso projeto, usaremos o `npm init` para inicializar o projeto.

> Se você ainda não tiver o npm instalado, siga [estas instruções para instalar o Node.js e o npm](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

Para a finalidade deste tutorial, não importa como você responde às perguntas de inicialização. Veja como fizemos isso para referência:

```
nome do pacote: (hello-world)
versão: (1.0.0)
descrição: contrato inteligente hello world
ponto de entrada: (index.js)
comando de teste:
repositório git:
palavras-chave:
autor:
licença: (ISC)

Prestes a escrever para /Users/.../.../.../hello-world/package.json:

{
   "name": "hello-world",
   "version": "1.0.0",
   "description": "contrato inteligente hello world",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Aprove o package.json e estamos prontos!

### Passo 7: Baixe o Hardhat {#step-7-download-hardhat}

Hardhat é um ambiente de desenvolvimento para compilar, implementar, testar e depurar seu software de Ethereum. Ele ajuda os desenvolvedores na criação de contratos inteligentes e dapps localmente antes de implantar na cadeia real.

Dentro do nosso projeto `hello-world`, execute:

```
npm install --save-dev hardhat
```

Confira esta página para mais detalhes sobre as [instruções de instalação](https://hardhat.org/getting-started/#overview).

### Passo 8: Crie um projeto Hardhat {#step-8-create-hardhat-project}

Dentro da pasta do nosso projeto `hello-world`, execute:

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

O que você quer fazer? …
Crie um projeto de exemplo
❯ Crie um arquivo hardhat.config.js vazio
Sair
```

Isso gerará um arquivo `hardhat.config.js` no projeto. Usaremos isso mais tarde no tutorial para especificar a configuração do nosso projeto.

### Passo 9: Adicione pastas de projeto {#step-9-add-project-folders}

Para manter o projeto organizado, vamos criar duas novas pastas. Na linha de comando, navegue para o diretório raiz do seu projeto `hello-world` e digite:

```
mkdir contracts
mkdir scripts
```

- `contracts/` é onde manteremos nosso arquivo de código do contrato inteligente hello world
- `scripts/` é onde manteremos os scripts para implantar e interagir com nosso contrato

### Passo 10: Escreva nosso contrato {#step-10-write-our-contract}

Você pode estar se perguntando: quando vamos escrever código? Está na hora!

Abra o projeto hello-world no seu editor favorito. Contratos inteligentes são mais comumente escritos em Solidity, que usaremos para escrever nosso contrato inteligente.‌

1. Navegue para a pasta `contracts` e crie um novo arquivo chamado `HelloWorld.sol`
2. Abaixo está um exemplo de contrato inteligente "Hello World" que usaremos neste tutorial. Copie o conteúdo abaixo no arquivo `HelloWorld.sol`.

_Observação: certifique-se de ler os comentários para entender o que este contrato faz._

```
// Especifica a versão do Solidity, usando versionamento semântico.
// Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Define um contrato chamado `HelloWorld`.
// Um contrato é uma coleção de funções e dados (seu estado). Depois de implantado, um contrato reside em um endereço específico na blockchain Ethereum. Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitido quando a função de atualização é chamada
   //Os eventos de contratos inteligentes são uma forma de o seu contrato comunicar que algo aconteceu na blockchain para o front-end do seu aplicativo, que pode estar 'ouvindo' certos eventos e agir quando eles acontecem.
   event UpdatedMessages(string oldStr, string newStr);

   // Declara uma variável de estado `message` do tipo `string`.
   // As variáveis de estado são variáveis cujos valores são permanentemente armazenados no armazenamento do contrato. A palavra-chave `public` torna as variáveis acessíveis de fora de um contrato e cria uma função que outros contratos ou clientes podem chamar para acessar o valor.
   string public message;

   // Semelhante a muitas linguagens orientadas a objetos baseadas em classes, um construtor é uma função especial que só é executada na criação do contrato.
   // Os construtores são usados para inicializar os dados do contrato. Saiba mais:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Aceita um argumento de string `initMessage` e define o valor na variável de armazenamento `message` do contrato.
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

Este é um contrato inteligente básico que armazena uma mensagem quando da sua criação. Ele pode ser atualizado chamando a função `update`.

### Passo 11: Conecte o MetaMask e o Alchemy ao seu projeto {#step-11-connect-metamask-alchemy-to-your-project}

Nós criamos uma carteira MetaMask, uma conta da Alchemy e escrevemos nosso contrato inteligente. Agora é hora de conectar os três.

Toda transação enviada da sua carteira requer uma assinatura usando sua chave privada única. Para fornecer essa permissão ao nosso programa, podemos armazenar nossa chave privada com segurança em um arquivo de ambiente. Também armazenaremos uma chave de API para o Alchemy aqui.

> Para saber mais sobre o envio de transações, confira [este tutorial](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) sobre como enviar transações usando web3.

Primeiro, instale o pacote dotenv na pasta do seu projeto:

```
npm install dotenv --save
```

Em seguida, crie um arquivo `.env` no diretório raiz do projeto. Adicione sua chave privada do MetaMask e o URL da API HTTP da Alchemy a ele.

Seu arquivo de ambiente deve ser nomeado `.env`, caso contrário, não será reconhecido como um arquivo de ambiente.

Não o nomeie como `process.env` ou `.env-custom` ou qualquer outra coisa.

- Siga [estas instruções](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) para exportar sua chave privada
- Veja abaixo para obter o URL da API HTTP da Alchemy

![Passo a passo animado para obter uma chave de API Alchemy](./get-alchemy-api-key.gif)

Seu `.env` deve ficar assim:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/sua-chave-de-api"
PRIVATE_KEY = "sua-chave-privada-metamask"
```

Para realmente conectar isso ao nosso código, faremos referência a essas variáveis em nosso arquivo `hardhat.config.js` na etapa 13.

### Etapa 12: Instalar o Ethers.js {#step-12-install-ethersjs}

Ethers.js é uma biblioteca que facilita a interação e o envio de solicitações ao Ethereum ao incorporar métodos padrões JSON-RPC a outros métodos mais amigáveis ao usuário.

O Hardhat nos permite integrar [plugins](https://hardhat.org/plugins/) para ferramentas adicionais e funcionalidades estendidas. Aproveitaremos o [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) para a implantação do contrato.

No diretório do seu projeto, digite:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Passo 13: Atualize o hardhat.config.js {#step-13-update-hardhat-configjs}

Adicionamos várias dependências e plugins até agora. Agora precisamos atualizar o `hardhat.config.js` para que nosso projeto saiba sobre todos eles.

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

### Passo 14: Compile nosso contrato {#step-14-compile-our-contract}

Para ter certeza de que tudo está funcionando, vamos compilar nosso contrato. A tarefa `compile` é uma das tarefas incorporadas do hardhat.

Na linha de comando, execute:

```bash
npx hardhat compile
```

Você pode receber um aviso sobre `identificador de licença SPDX não fornecido no arquivo de origem`, mas não precisa se preocupar com isso — esperamos que todo o resto esteja bem! Se não, você sempre pode enviar uma mensagem no [Discord da Alchemy](https://discord.gg/u72VCg3).

### Passo 15: Escreva nosso script de implantação {#step-15-write-our-deploy-script}

Agora que nosso contrato está escrito e nosso arquivo de configuração está pronto, é hora de escrever o script de implantação do contrato.

Navegue até a pasta `scripts/` e crie um novo arquivo chamado `deploy.js`, adicionando o seguinte conteúdo a ele:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // Iniciar a implantação, retornando uma promessa que resolve para um objeto de contrato
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contrato implantado no endereço:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

A Hardhat faz um trabalho incrível explicando o que cada uma dessas linhas de código faz em seu [tutorial de Contratos](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), nós adotamos as explicações deles aqui.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

Uma `ContractFactory` no ethers.js é uma abstração usada para implantar novos contratos inteligentes, então, `HelloWorld` aqui é uma [fábrica](https://en.wikipedia.org/wiki/Factory_\(object-oriented_programming\)) para instâncias do nosso contrato "olá, mundo". Ao usar o plugin `hardhat-ethers` `ContractFactory` e `Contract`, as instâncias são conectadas ao primeiro signatário (proprietário) por padrão.

```javascript
const hello_world = await HelloWorld.deploy()
```

Chamar `deploy()` em uma `ContractFactory` iniciará a implantação e retornará uma `Promise` que resolve para um objeto `Contract`. Este é o objeto que tem um método para cada uma de nossas funções de contrato inteligente.

### Etapa 16: Implantar nosso contrato {#step-16-deploy-our-contract}

Finalmente estamos prontos para implantar o nosso contrato inteligente! Navegue até a linha de comando e execute:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Você deverá ver algo assim:

```bash
Contrato implantado no endereço: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Por favor, salve este endereço**. Nós o usaremos mais tarde neste tutorial.

Se formos ao [etherscan da Goerli](https://goerli.etherscan.io) e procurarmos o endereço do nosso contrato, devemos conseguir ver que ele foi implantado com sucesso. A transação ficará parecida com isto:

![](./etherscan-contract.png)

O endereço `From` deve corresponder ao endereço da sua conta MetaMask e o endereço `To` dirá **Criação de Contrato**. Se clicarmos na transação, veremos o nosso endereço de contrato no campo `To`.

![](./etherscan-transaction.png)

Parabéns! Você acaba de implantar um contrato inteligente em uma rede de teste Ethereum.

Para entender o que está acontecendo nos bastidores, vamos navegar até a guia Explorer no nosso [painel da Alchemy](https://dashboard.alchemy.com/explorer). Se você tem vários aplicativos Alchemy, certifique-se de filtrar por aplicativo e selecionar **Hello World**.

![](./hello-world-explorer.png)

Aqui você verá alguns métodos JSON-RPC que Hardhat/Ethers fizeram nos bastidores para nós quando chamamos a função `.deploy()`. Dois métodos importantes aqui são [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), que é a solicitação para escrever nosso contrato na cadeia Goerli, e [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), que é uma solicitação para ler informações sobre nossa transação a partir do hash. Para saber mais sobre como enviar transações, confira [nosso tutorial sobre como enviar transações usando Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

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

Usaremos novas variáveis de ambiente, então precisamos defini-las no arquivo `.env` que [criamos anteriormente](#step-11-connect-metamask-&-alchemy-to-your-project).

Precisaremos adicionar uma definição para a nossa `API_KEY` da Alchemy e o `CONTRACT_ADDRESS` onde nosso contrato inteligente foi implantado.

Seu arquivo `.env` deve ter a seguinte aparência:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<sua-chave-de-api>"
API_KEY = "<sua-chave-de-api>"
PRIVATE_KEY = "<sua-chave-privada-metamask>"
CONTRACT_ADDRESS = "0x<seu endereço de contrato>"
```

### Obtenha a ABI do seu contrato {#grab-your-contract-ABI}

A [ABI (Application Binary Interface)](/glossary/#abi) do nosso contrato é a interface para interagir com nosso contrato inteligente. O Hardhat gera automaticamente uma ABI e a salva em `HelloWorld.json`. Para usar a ABI, precisaremos analisar o conteúdo adicionando as seguintes linhas de código ao nosso arquivo `interact.js`:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Se quiser ver a ABI, você pode imprimi-la no seu console:

```javascript
console.log(JSON.stringify(contract.abi))
```

Para ver sua ABI impressa no console, navegue até seu terminal e execute:

```bash
npx hardhat run scripts/interact.js
```

### Crie uma instância do seu contrato {#create-an-instance-of-your-contract}

Para interagir com nosso contrato, precisamos criar uma instância dele em nosso código. Para fazer isso com Ethers.js, precisaremos trabalhar com três conceitos:

1. Provedor - um provedor de nós que lhe dá acesso de leitura e escrita ao blockchain
2. Signatário - representa uma conta Ethereum que pode assinar transações
3. Contrato - um objeto Ethers.js representando um contrato específico implantado on-chain

Usaremos a ABI do contrato da etapa anterior para criar nossa instância do contrato:

```javascript
// interact.js

// Provedor
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Signatário
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contrato
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Saiba mais sobre Provedores, Signatários e Contratos na [documentação do ethers.js](https://docs.ethers.io/v5/).

### Leia a mensagem inicial {#read-the-init-message}

Lembra-se quando implantamos nosso contrato com a `initMessage = "Hello world!"`? Agora vamos ler essa mensagem armazenada em nosso contrato inteligente e imprimi-la no console.

Em JavaScript, funções assíncronas são usadas ao interagir com redes. Para saber mais sobre funções assíncronas, [leia este artigo do Medium](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Use o código abaixo para chamar a função `message` em nosso contrato inteligente e ler a mensagem inicial:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("A mensagem é: " + message)
}
main()
```

Depois de executar o arquivo usando `npx hardhat run scripts/interact.js` no terminal, devemos ver esta resposta:

```
A mensagem é: Hello world!
```

Parabéns! Você leu com sucesso os dados do contrato inteligente da blockchain Ethereum, parabéns!

### Atualize a mensagem {#update-the-message}

Em vez de apenas ler a mensagem, também podemos atualizar a mensagem salva em nosso contrato inteligente usando a função `update`! Muito legal, não é?

Para atualizar a mensagem, podemos chamar diretamente a função `update` em nosso objeto de Contrato instanciado:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("A mensagem é: " + message)

  console.log("Atualizando a mensagem...")
  const tx = await helloWorldContract.update("Esta é a nova mensagem.")
  await tx.wait()
}
main()
```

Note que na linha 11, fazemos uma chamada para `.wait()` no objeto da transação retornada. Isso garante que nosso script espere a transação ser minerada na blockchain antes de sair da função. Se a chamada `.wait()` não for incluída, o script pode não ver o valor da `message` atualizada no contrato.

### Leia a nova mensagem {#read-the-new-message}

Você deve ser capaz de repetir o [passo anterior](#read-the-init-message) para ler o valor atualizado da `message`. Tire um momento para ver se você consegue fazer as alterações necessárias para imprimir esse novo valor!

Se precisar de uma dica, veja como seu arquivo `interact.js` deve se parecer neste ponto:

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
  console.log("A mensagem é: " + message)

  console.log("Atualizando a mensagem...")
  const tx = await helloWorldContract.update("esta é a nova mensagem")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("A nova mensagem é: " + newMessage)
}

main()
```

Agora, apenas execute o script e você deverá ver a mensagem antiga, o status de atualização e a nova mensagem impressa em seu terminal!

`npx hardhat run scripts/interact.js --network goerli`

```
A mensagem é: Hello World!
Atualizando a mensagem...
A nova mensagem é: Esta é a nova mensagem.
```

Ao executar esse script, você pode perceber que a etapa `Atualizando a mensagem...` leva um tempo para carregar antes que a nova mensagem seja carregada. Isso se deve ao processo de mineração; se você tiver curiosidade em rastrear transações enquanto elas estão sendo mineradas, visite o [mempool da Alchemy](https://dashboard.alchemyapi.io/mempool) para ver o status de uma transação. Se a transação for descartada, também é útil verificar o [Goerli Etherscan](https://goerli.etherscan.io) e pesquisar pelo hash da sua transação.

## Parte 3: Publique seu contrato inteligente no Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Você fez todo o trabalho duro de dar vida ao seu contrato inteligente; agora é hora de compartilhá-lo com o mundo!

Ao verificar seu contrato inteligente no Etherscan, qualquer pessoa pode visualizar seu código-fonte e interagir com seu contrato inteligente. Vamos começar!

### Passo 1: Gere uma chave de API na sua conta Etherscan {#step-1-generate-an-api-key-on-your-etherscan-account}

Uma chave de API do Etherscan é necessária para verificar que você é o proprietário do contrato inteligente que está tentando publicar.

Se você ainda não tem uma conta no Etherscan, [cadastre-se para obter uma](https://etherscan.io/register).

Depois de fazer o login, encontre seu nome de usuário na barra de navegação, passe o mouse sobre ele e selecione o botão **My profile**.

Na página do seu perfil, você deverá ver uma barra de navegação lateral. Na barra de navegação lateral, selecione **API Keys**. Em seguida, pressione o botão "Add" para criar uma nova chave de API, nomeie seu aplicativo **hello-world** e pressione o botão **Create New API Key**.

Sua nova chave de API deve aparecer na tabela de chaves de API. Copie a chave de API para sua área de transferência.

Em seguida, precisamos adicionar a chave de API do Etherscan ao nosso arquivo `.env`.

Depois de adicioná-la, seu arquivo `.env` deve ter a seguinte aparência:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/sua-chave-de-api"
PUBLIC_KEY = "seu-endereco-de-conta-publica"
PRIVATE_KEY = "seu-endereco-de-conta-privada"
CONTRACT_ADDRESS = "seu-endereco-de-contrato"
ETHERSCAN_API_KEY = "sua-chave-etherscan"
```

### Contratos inteligentes implantados com Hardhat {#hardhat-deployed-smart-contracts}

#### Instale o hardhat-etherscan {#install-hardhat-etherscan}

Publicar seu contrato no Etherscan usando o Hardhat é simples. Você precisará primeiro instalar o plugin `hardhat-etherscan` para começar. `hardhat-etherscan` verificará automaticamente o código-fonte do contrato inteligente e a ABI no Etherscan. Para adicionar isso, no diretório `hello-world`, execute:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Uma vez instalado, inclua a seguinte declaração no topo do seu `hardhat.config.js` e adicione as opções de configuração do Etherscan:

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

Certifique-se de que todos os arquivos estão salvos e todas as variáveis `.env` estão configuradas corretamente.

Execute a tarefa `verify`, passando o endereço do contrato e a rede onde ele está implantado:

```text
npx hardhat verify --network goerli ENDERECO_DO_CONTRATO_IMPLANTADO 'Hello World!'
```

Certifique-se de que `DEPLOYED_CONTRACT_ADDRESS` é o endereço do seu contrato inteligente implantado na rede de teste Goerli. Além disso, o argumento final (`'Hello World!'`) deve ser o mesmo valor de string usado [durante a etapa de implantação na parte 1](#write-our-deploy-script).

Se tudo correr bem, você verá a seguinte mensagem no seu terminal:

```text
Código-fonte enviado com sucesso para o contrato
contracts/HelloWorld.sol:HelloWorld em 0xendereco-do-contrato-implantado
para verificação no Etherscan. Aguardando resultado da verificação...


Contrato HelloWorld verificado com sucesso no Etherscan.
https://goerli.etherscan.io/address/<endereco-do-contrato>#contracts
```

Parabéns! O código do seu contrato inteligente está no Etherscan!

### Confira seu contrato inteligente no Etherscan! {#check-out-your-smart-contract-on-etherscan}

Ao navegar para o link fornecido no seu terminal, você poderá ver o código do seu contrato inteligente e a ABI publicados no Etherscan!

**Uhuuuu - você conseguiu, campeão! Agora qualquer pessoa pode chamar ou escrever em seu contrato inteligente! Mal podemos esperar para ver o que você construirá em seguida!**

## Parte 4 - Integrando seu contrato inteligente com o frontend {#part-4-integrating-your-smart-contract-with-the-frontend}

Ao final deste tutorial, você saberá como:

- Conectar uma carteira MetaMask ao seu dapp
- Ler dados do seu contrato inteligente usando a API [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Assinar transações Ethereum usando o MetaMask

Para este dapp, usaremos o [React](https://react.dev/) como nosso framework de frontend; no entanto, é importante notar que não gastaremos muito tempo explicando seus fundamentos, pois estaremos focados principalmente em trazer funcionalidades da Web3 para o nosso projeto.

Como pré-requisito, você deve ter um nível de entendimento de iniciante em React. Caso contrário, recomendamos concluir o [tutorial oficial de Introdução ao React](https://react.dev/learn).

### Clone os arquivos iniciais {#clone-the-starter-files}

Primeiro, vá para o [repositório GitHub hello-world-part-four](https://github.com/alchemyplatform/hello-world-part-four-tutorial) para obter os arquivos iniciais deste projeto e clone este repositório em sua máquina local.

Abra o repositório clonado localmente. Observe que ele contém duas pastas: `starter-files` e `completed`.

- `starter-files`- **trabalharemos neste diretório**, conectaremos a UI à sua carteira Ethereum e ao contrato inteligente que publicamos no Etherscan na [Parte 3](#part-3).
- `completed` contém todo o tutorial concluído e deve ser usado apenas como referência se você ficar preso.

Em seguida, abra sua cópia de `starter-files` no seu editor de código favorito e navegue até a pasta `src`.

Todo o código que escrevermos ficará na pasta `src`. Editaremos o componente `HelloWorld.js` e os arquivos JavaScript `util/interact.js` para dar ao nosso projeto a funcionalidade da Web3.

### Confira os arquivos iniciais {#check-out-the-starter-files}

Antes de começarmos a codificar, vamos explorar o que nos é fornecido nos arquivos iniciais.

#### Coloque seu projeto react para funcionar {#get-your-react-project-running}

Vamos começar executando o projeto React em nosso navegador. A beleza do React é que uma vez que nosso projeto esteja sendo executado no nosso navegador, qualquer alteração que salvarmos será atualizada ao vivo em nosso navegador.

Para iniciar o projeto, navegue para o diretório raiz da pasta `starter-files` e execute `npm install` no seu terminal para instalar as dependências do projeto:

```bash
cd starter-files
npm install
```

Assim que a instalação for concluída, execute `npm start` em seu terminal:

```bash
npm start
```

Isso deve abrir [http://localhost:3000/](http://localhost:3000/) no seu navegador, onde você verá o frontend do nosso projeto. Ele deve consistir em um campo (um local para atualizar a mensagem armazenada em seu contrato inteligente), um botão "Conectar Carteira" e um botão "Atualizar".

Se você tentar clicar em qualquer um dos botões, notará que eles não funcionam — isso ocorre porque ainda precisamos programar sua funcionalidade.

#### O componente `HelloWorld.js` {#the-helloworld-js-component}

Vamos voltar para a pasta `src` em nosso editor e abrir o arquivo `HelloWorld.js`. É muito importante que entendamos tudo neste arquivo, pois é o principal componente do React no qual vamos trabalhar.

No topo deste arquivo, você notará que temos várias declarações de importação necessárias para fazer nosso projeto funcionar, incluindo a biblioteca React, os hooks useEffect e useState, alguns itens do `./util/interact.js` (descreveremos em mais detalhes em breve!) e o logotipo da Alchemy.

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
const [message, setMessage] = useState("Sem conexão com a rede.")
const [newMessage, setNewMessage] = useState("")
```

Veja aqui o que cada uma das variáveis representa:

- `walletAddress` - uma string que armazena o endereço da carteira do usuário
- `status`- uma string que armazena uma mensagem útil que guia o usuário sobre como interagir com o dapp
- `message` - uma string que armazena a mensagem atual no contrato inteligente
- `newMessage` - uma string que armazena a nova mensagem que será escrita no contrato inteligente

Após as variáveis de estado, você verá cinco funções não implementadas: `useEffect` ,`addSmartContractListener`, `addWalletListener` , `connectWalletPressed` e `onUpdatePressed`. Explicaremos o que elas fazem abaixo:

```javascript
// HelloWorld.js

//chamado apenas uma vez
useEffect(async () => {
  //TODO: implementar
}, [])

function addSmartContractListener() {
  //TODO: implementar
}

function addWalletListener() {
  //TODO: implementar
}

const connectWalletPressed = async () => {
  //TODO: implementar
}

const onUpdatePressed = async () => {
  //TODO: implementar
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html)- este é um hook do React que é chamado após a renderização do seu componente. Como ele tem um prop de array vazio `[]` passado para ele (veja a linha 4), ele só será chamado na _primeira_ renderização do componente. Aqui, carregaremos a mensagem atual armazenada em nosso contrato inteligente, chamaremos nossos ouvintes de contrato inteligente e de carteira e atualizaremos nossa interface do usuário para refletir se uma carteira já está conectada.
- `addSmartContractListener` - esta função configura um ouvinte que observará o evento `UpdatedMessages` do nosso contrato HelloWorld e atualizará nossa interface do usuário quando a mensagem for alterada em nosso contrato inteligente.
- `addWalletListener` - esta função configura um ouvinte que detecta alterações no estado da carteira MetaMask do usuário, como quando o usuário desconecta sua carteira ou troca de endereços.
- `connectWalletPressed`- esta função será chamada para conectar a carteira MetaMask do usuário ao nosso dapp.
- `onUpdatePressed` - essa função será chamada quando o usuário quiser atualizar a mensagem armazenada no contrato inteligente.

Perto do final desse arquivo, temos a interface de usuário do nosso componente.

```javascript
// HelloWorld.js

//a UI do nosso componente
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Conectado: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Conectar Carteira</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Mensagem Atual:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>Nova Mensagem:</h2>

    <div>
      <input
        type="text"
        placeholder="Atualize a mensagem no seu contrato inteligente."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Atualizar
      </button>
</div>
 
</div>
)
```

Se você examinar este código com atenção, notará onde usamos nossas várias variáveis de estado em nossa interface do usuário:

- Nas linhas 6-12, se a carteira do usuário estiver conectada (ou seja, `walletAddress.length > 0`), exibimos uma versão truncada do `walletAddress` do usuário no botão com o ID "walletButton;" caso contrário, ele simplesmente diz "Conectar Carteira".
- Na linha 17, exibimos a mensagem atual armazenada no contrato inteligente, que é capturada na string `message`.
- Nas linhas 23-26, usamos um [componente controlado](https://legacy.reactjs.org/docs/forms.html#controlled-components) para atualizar nossa variável de estado `newMessage` quando a entrada no campo de texto muda.

Além de nossas variáveis de estado, você também verá que as funções `connectWalletPressed` e `onUpdatePressed` são chamadas quando os botões com os IDs `publishButton` e `walletButton` são clicados, respectivamente.

Finalmente, vamos abordar onde este componente `HelloWorld.js` é adicionado.

Se você for ao arquivo `App.js`, que é o componente principal do React que atua como um contêiner para todos os outros componentes, você verá que nosso componente `HelloWorld.js` é injetado na linha 7.

Por último, mas não menos importante, vamos conferir mais um arquivo fornecido a você, o arquivo `interact.js`.

#### O arquivo `interact.js` {#the-interact-js-file}

Como queremos seguir o paradigma [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), queremos um arquivo separado que contenha todas as nossas funções para gerenciar a lógica, os dados e as regras do nosso dapp e, em seguida, exportar essas funções para o nosso frontend (nosso componente `HelloWorld.js`).

👆🏽Este é o propósito exato do nosso arquivo `interact.js`!

Navegue até a pasta `util` em seu diretório `src` e você notará que incluímos um arquivo chamado `interact.js` que conterá todas as nossas funções e variáveis de interação com o contrato inteligente e a carteira.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Você notará no topo do arquivo que comentamos o objeto `helloWorldContract`. Mais tarde neste tutorial, descomentaremos este objeto e instanciaremos nosso contrato inteligente nesta variável, que então exportaremos para nosso componente `HelloWorld.js`.

As quatro funções não implementadas após nosso objeto `helloWorldContract` fazem o seguinte:

- `loadCurrentMessage` - esta função lida com a lógica de carregar a mensagem atual armazenada no contrato inteligente. Ela fará uma chamada de _leitura_ para o contrato inteligente Hello World usando a [API Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet` - esta função conectará a MetaMask do usuário ao nosso dapp.
- `getCurrentWalletConnected` - esta função verificará se uma conta Ethereum já está conectada ao nosso dapp ao carregar a página e atualizará nossa interface do usuário de acordo.
- `updateMessage` - esta função atualizará a mensagem armazenada no contrato inteligente. Ela fará uma chamada de _escrita_ para o contrato inteligente Hello World, então a carteira MetaMask do usuário terá que assinar uma transação Ethereum para atualizar a mensagem.

Agora que entendemos com o que estamos trabalhando, vamos descobrir como ler do nosso contrato inteligente!

### Passo 3: Leia do seu contrato inteligente {#step-3-read-from-your-smart-contract}

Para ler do seu contrato inteligente, você precisará configurar com sucesso:

- Uma conexão de API com a cadeia Ethereum
- Uma instância carregada do seu contrato inteligente
- Uma função para chamar a função do seu contrato inteligente
- Um ouvinte para observar as atualizações quando os dados que você está lendo do contrato inteligente mudarem

Isso pode parecer muitos passos, mas não se preocupe! Vamos guiá-lo passo a passo sobre como fazer cada um deles! :\)

#### Estabeleça uma conexão de API com a cadeia Ethereum {#establish-an-api-connection-to-the-ethereum-chain}

Então, lembra como na Parte 2 deste tutorial, usamos nossa [chave Web3 da Alchemy para ler do nosso contrato inteligente](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)? Você também precisará de uma chave Web3 da Alchemy em seu dapp para ler da cadeia.

Se você ainda não tiver, primeiro instale o [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) navegando até o diretório raiz dos seus `starter-files` e executando o seguinte no seu terminal:

```text
npm install @alch/alchemy-web3
```

O [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) é um wrapper em torno do [Web3.js](https://docs.web3js.org/), fornecendo métodos de API aprimorados e outros benefícios cruciais para facilitar sua vida como desenvolvedor web3. Ele foi projetado para exigir uma configuração mínima, para que você possa começar a usá-la no seu aplicativo imediatamente!

Em seguida, instale o pacote [dotenv](https://www.npmjs.com/package/dotenv) no diretório do seu projeto, para termos um local seguro para armazenar nossa chave de API depois de buscá-la.

```text
npm install dotenv --save
```

Para nosso dapp, **usaremos nossa chave de API Websockets** em vez da nossa chave de API HTTP, pois ela nos permitirá configurar um ouvinte que detecta quando a mensagem armazenada no contrato inteligente muda.

Depois de ter sua chave de API, crie um arquivo `.env` no seu diretório raiz e adicione sua URL de Websockets da Alchemy a ele. Depois disso, seu arquivo `.env` deve ter a seguinte aparência:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<chave>
```

Agora, estamos prontos para configurar nosso ponto de extremidade Alchemy Web3 em nosso dapp! Vamos voltar ao nosso `interact.js`, que está aninhado dentro da nossa pasta `util`, e adicionar o seguinte código no topo do arquivo:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

Acima, primeiro importamos a chave da Alchemy do nosso arquivo `.env` e depois passamos nossa `alchemyKey` para `createAlchemyWeb3` para estabelecer nosso ponto de extremidade Alchemy Web3.

Com este ponto de extremidade pronto, é hora de carregar nosso contrato inteligente!

#### Carregando seu contrato inteligente Hello World {#loading-your-hello-world-smart-contract}

Para carregar seu contrato inteligente Hello World, você precisará do endereço do contrato e da ABI, ambos podem ser encontrados no Etherscan se você concluiu a [Parte 3 deste tutorial.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### Como obter a ABI do seu contrato no Etherscan {#how-to-get-your-contract-abi-from-etherscan}

Se você pulou a Parte 3 deste tutorial, pode usar o contrato HelloWorld com o endereço [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). Sua ABI pode ser encontrada [aqui](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

A ABI de um contrato é necessária para especificar qual função um contrato invocará, bem como para garantir que a função retorne dados no formato que você espera. Depois de copiar a ABI do nosso contrato, vamos salvá-la como um arquivo JSON chamado `contract-abi.json` em seu diretório `src`.

Seu contract-abi.json deve ser armazenado na sua pasta src.

Armados com o endereço do nosso contrato, ABI e o ponto de extremidade da Alchemy Web3, podemos usar o [método de contrato](https://docs.web3js.org/api/web3-eth-contract/class/Contract) para carregar uma instância do nosso contrato inteligente. Importe a ABI do seu contrato no arquivo `interact.js` e adicione o endereço do seu contrato.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Agora podemos finalmente descomentar nossa variável `helloWorldContract` e carregar o contrato inteligente usando nosso ponto de extremidade AlchemyWeb3:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Para recapitular, as primeiras 12 linhas do seu `interact.js` devem ter a seguinte aparência:

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

Agora que nosso contrato está carregado, podemos implementar nossa função `loadCurrentMessage`!

#### Implementando `loadCurrentMessage` no seu arquivo `interact.js` {#implementing-loadCurrentMessage-in-your-interact-js-file}

Esta função é super simples. Faremos uma chamada assíncrona simples da web3 para ler do nosso contrato. Nossa função retornará a mensagem armazenada no contrato inteligente:

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

//chamado apenas uma vez
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Observe que só queremos que nosso `loadCurrentMessage` seja chamado uma vez durante a primeira renderização do componente. Em breve, implementaremos o `addSmartContractListener` para atualizar automaticamente a interface do usuário após a alteração da mensagem no contrato inteligente.

Antes de mergulharmos em nosso ouvinte, vamos conferir o que temos até agora! Salve seus arquivos `HelloWorld.js` e `interact.js` e vá para [http://localhost:3000/](http://localhost:3000/)

Você notará que a mensagem atual não diz mais "Sem conexão com a rede". Em vez disso, ela reflete a mensagem armazenada no contrato inteligente. Incrível!

#### Sua interface do usuário agora deve refletir a mensagem armazenada no contrato inteligente {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

Agora, falando daquele ouvinte...

#### Implemente `addSmartContractListener` {#implement-addsmartcontractlistener}

Se você se lembrar do arquivo `HelloWorld.sol` que escrevemos na [Parte 1 desta série de tutoriais](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract), lembrará que há um evento de contrato inteligente chamado `UpdatedMessages` que é emitido após a invocação da função `update` do nosso contrato inteligente (veja as linhas 9 e 27):

```javascript
// HelloWorld.sol

// Especifica a versão do Solidity, usando versionamento semântico.
// Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Define um contrato chamado `HelloWorld`.
// Um contrato é uma coleção de funções e dados (seu estado). Depois de implantado, um contrato reside em um endereço específico na blockchain Ethereum. Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitido quando a função de atualização é chamada
   //Os eventos de contratos inteligentes são uma forma de o seu contrato comunicar que algo aconteceu na blockchain para o front-end do seu aplicativo, que pode estar 'ouvindo' certos eventos e agir quando eles acontecem.
   event UpdatedMessages(string oldStr, string newStr);

   // Declara uma variável de estado `message` do tipo `string`.
   // As variáveis de estado são variáveis cujos valores são permanentemente armazenados no armazenamento do contrato. A palavra-chave `public` torna as variáveis acessíveis de fora de um contrato e cria uma função que outros contratos ou clientes podem chamar para acessar o valor.
   string public message;

   // Semelhante a muitas linguagens orientadas a objetos baseadas em classes, um construtor é uma função especial que só é executada na criação do contrato.
   // Os construtores são usados para inicializar os dados do contrato. Saiba mais:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Aceita um argumento de string `initMessage` e define o valor na variável de armazenamento `message` do contrato.
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

Eventos de contratos inteligentes são uma forma de o seu contrato comunicar que algo aconteceu (ou seja, houve um _evento_) na blockchain para seu aplicativo de front-end, que pode estar 'ouvindo' eventos específicos e tomar uma ação quando eles acontecem.

A função `addSmartContractListener` irá ouvir especificamente o evento `UpdatedMessages` do nosso contrato inteligente Hello World e atualizará nossa interface do usuário para exibir a nova mensagem.

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
      setStatus("🎉 Sua mensagem foi atualizada!")
    }
  })
}
```

Vamos detalhar o que acontece quando o ouvinte detecta um evento:

- Se ocorrer um erro quando o evento for emitido, ele será refletido na interface do usuário por meio de nossa variável de estado `status`.
- Caso contrário, usaremos o objeto `data` retornado. O `data.returnValues` é um array indexado em zero onde o primeiro elemento no array armazena a mensagem anterior e o segundo elemento armazena a atualizada. No total, em um evento bem-sucedido, definiremos nossa string `message` para a mensagem atualizada, limparemos a string `newMessage` e atualizaremos nossa variável de estado `status` para refletir que uma nova mensagem foi publicada em nosso contrato inteligente.

Finalmente, vamos chamar nosso ouvinte em nossa função `useEffect` para que ele seja inicializado na primeira renderização do componente `HelloWorld.js`. No total, sua função `useEffect` deve ter a seguinte aparência:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Agora que podemos ler do nosso contrato inteligente, seria ótimo descobrir como escrever nele também! No entanto, para escrever em nosso dapp, primeiro devemos ter uma carteira Ethereum conectada a ele.

Então, a seguir, abordaremos a configuração de nossa carteira Ethereum (MetaMask) e, em seguida, a conexão dela ao nosso dapp!

### Passo 4: Configure sua carteira Ethereum {#step-4-set-up-your-ethereum-wallet}

Para escrever qualquer coisa na cadeia Ethereum, os usuários devem assinar transações usando as chaves privadas de suas carteiras virtuais. Para este tutorial, usaremos o [MetaMask](https://metamask.io/), uma carteira virtual no navegador usada para gerenciar o endereço da sua conta Ethereum, pois torna a assinatura de transações superfácil para o usuário final.

Se quiser entender mais sobre como as transações na Ethereum funcionam, confira [esta página](/developers/docs/transactions/) da Ethereum Foundation.

#### Baixe o MetaMask {#download-metamask}

Você pode baixar e criar uma conta MetaMask gratuitamente [aqui](https://metamask.io/download). Ao criar uma conta, ou se você já tiver uma, certifique-se de mudar para a “Rede de Teste Goerli” no canto superior direito (para não lidarmos com dinheiro real).

#### Adicione ether de uma Faucet {#add-ether-from-a-faucet}

Para assinar uma transação na blockchain Ethereum, precisaremos de um pouco de Eth falso. Para obter Eth, você pode ir para a [FaucETH](https://fauceth.komputing.org) e inserir o endereço da sua conta Goerli, clicar em “Solicitar fundos”, selecionar “Rede de Teste Ethereum Goerli” no menu suspenso e, finalmente, clicar no botão “Solicitar fundos” novamente. Em seguida, você deve ver Eth em sua conta MetaMask!

#### Verifique seu saldo {#check-your-balance}

Para verificar novamente se nosso saldo está lá, vamos fazer uma solicitação [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) usando a [ferramenta de composição da Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Ela mostrará a quantidade de Eth na sua carteira. Depois de inserir o endereço da sua conta da MetaMask e clicar em "Send Request", você verá uma resposta como esta:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**OBSERVAÇÃO:** Este resultado está em wei, não em eth. Lembre-se de que "Wei" é a menor unidade de ether. A conversão de wei para eth é: 1 eth = 10¹⁸ wei. Então, se convertemos 0xde0b6b3a7640000 para decimal, temos 1\*10¹⁸ wei, que é igual a 1 eth.

Ufa! Nosso dinheiro falso está todo lá! 🤑

### Passo 5: Conecte o MetaMask à sua interface do usuário {#step-5-connect-metamask-to-your-UI}

Agora que nossa carteira MetaMask está configurada, vamos conectar nosso dapp a ela!

#### A função `connectWallet` {#the-connectWallet-function}

Em nosso arquivo `interact.js`, vamos implementar a função `connectWallet`, que podemos chamar em nosso componente `HelloWorld.js`.

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
        status: "👆🏽 Escreva uma mensagem no campo de texto acima.",
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
              Você deve instalar o MetaMask, uma carteira virtual Ethereum, no seu navegador.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Então, o que esse bloco gigante de código faz exatamente?

Bem, primeiro, ele verifica se o `window.ethereum` está habilitado no seu navegador.

`window.ethereum` é uma API global injetada pelo MetaMask e outros provedores de carteira que permite que sites solicitem as contas Ethereum dos usuários. Se aprovado, ele pode ler dados das blockchains às quais o usuário está conectado e sugerir que o usuário assine mensagens e transações. Confira a [documentação do MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) para mais informações!

Se o `window.ethereum` _não estiver_ presente, isso significa que o MetaMask não está instalado. Isso resulta no retorno de um objeto JSON, onde o `address` retornado é uma string vazia, e o objeto JSX `status` informa que o usuário deve instalar o MetaMask.

Agora, se o `window.ethereum` _estiver_ presente, é aí que as coisas ficam interessantes.

Usando um loop try/catch, tentaremos nos conectar ao MetaMask chamando [`window.ethereum.request({ method: \"eth_requestAccounts\" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Chamando esta função o MetaMask irá abrir no navegador, onde o usuário será solicitado a conectar sua carteira ao seu dapp.

- Se o usuário optar por conectar, `method: "eth_requestAccounts"` retornará um array que contém todos os endereços de conta do usuário conectados ao dapp. No total, nossa função `connectWallet` retornará um objeto JSON que contém o _primeiro_ `address` neste array (veja a linha 9) e uma mensagem de `status` que solicita ao usuário que escreva uma mensagem para o contrato inteligente.
- Se o usuário rejeitar a conexão, o objeto JSON conterá uma string vazia para o `address` retornado e uma mensagem de `status` que reflete que o usuário rejeitou a conexão.

Agora que escrevemos esta função `connectWallet`, o próximo passo é chamá-la em nosso componente `HelloWorld.js`.

#### Adicione a função `connectWallet` ao seu componente de interface do usuário `HelloWorld.js` {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

Navegue para a função `connectWalletPressed` em `HelloWorld.js` e atualize-a para o seguinte:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Observe como a maior parte de nossa funcionalidade está abstraída de nosso componente `HelloWorld.js` do arquivo `interact.js`? É assim que respeitamos o paradigma M-V-C!

Em `connectWalletPressed`, nós simplesmente fazemos uma chamada `await` para a nossa função `connectWallet` importada e, usando sua resposta, atualizamos nossas variáveis `status` e `walletAddress` através de seus hooks de estado.

Agora, vamos salvar ambos os arquivos (`HelloWorld.js` e `interact.js`) e testar nossa interface do usuário até agora.

Abra seu navegador na página [http://localhost:3000/](http://localhost:3000/) e pressione o botão "Conectar Carteira" no canto superior direito da página.

Se você tiver o MetaMask instalado, você será solicitado a conectar sua carteira ao seu dapp. Aceite o convite para se conectar.

Você deve ver que o botão da carteira agora reflete que seu endereço está conectado! Demais! 🔥

Em seguida, tente atualizar a página... que estranho. Nosso botão de carteira está nos pedindo para conectar o MetaMask, mesmo que já esteja conectado...

No entanto, não tema! Podemos facilmente resolver isso (entendeu?) implementando `getCurrentWalletConnected`, que verificará se um endereço já está conectado ao nosso dapp e atualizará nossa interface do usuário de acordo!

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
          status: "👆🏽 Escreva uma mensagem no campo de texto acima.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Conecte-se ao MetaMask usando o botão superior direito.",
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
              Você deve instalar o MetaMask, uma carteira virtual Ethereum, no seu navegador.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Este código é _muito_ semelhante à função `connectWallet` que acabamos de escrever na etapa anterior.

A principal diferença é que, em vez de chamar o método `eth_requestAccounts`, que abre o MetaMask para o usuário conectar sua carteira, aqui chamamos o método `eth_accounts`, que simplesmente retorna uma matriz contendo os endereços do MetaMask atualmente conectados ao nosso dapp.

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

Ótimoooo! O botão deve dizer que você está conectado e mostrar uma visualização do endereço de sua carteira conectada - mesmo depois de atualizar!

#### Implemente `addWalletListener` {#implement-addwalletlistener}

O passo final na configuração da nossa carteira dapp é implementar o ouvinte de carteira, para que nossa interface atualize quando o estado mudar, como quando o usuário desconecta ou troca de contas.

No seu arquivo `HelloWorld.js`, modifique sua função `addWalletListener` para o seguinte:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Escreva uma mensagem no campo de texto acima.")
      } else {
        setWallet("")
        setStatus("🦊 Conecte-se ao MetaMask usando o botão superior direito.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          Você deve instalar o MetaMask, uma carteira virtual Ethereum, no seu navegador.
        </a>
      </p>
    )
  }
}
```

Aposto que você nem precisa da nossa ajuda para entender o que está acontecendo aqui neste ponto, mas, para fins de completude, vamos detalhar rapidamente:

- Primeiro, nossa função verifica se o `window.ethereum` está ativado (ou seja, se o MetaMask está instalado).
  - Se não estiver, simplesmente definimos nossa variável de estado `status` como uma string JSX que solicita ao usuário que instale o MetaMask.
  - Se estiver habilitado, configuramos o listener `window.ethereum.on("accountsChanged")` na linha 3 que escuta por mudanças de estado na carteira MetaMask, que incluem quando o usuário conecta uma conta adicional ao dapp, troca de contas ou desconecta uma conta. Se houver pelo menos uma conta conectada, a variável de estado `walletAddress` é atualizada como a primeira conta no array `accounts` retornado pelo listener. Caso contrário, o `walletAddress` é definido como uma string vazia.

Por último, mas não menos importante, devemos chamá-la em nossa função `useEffect`:

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

E é isso! Concluímos com sucesso a programação de toda a funcionalidade da nossa carteira! Agora para nossa última tarefa: atualizar a mensagem armazenada em nosso contrato inteligente!

### Passo 6: Implemente a função `updateMessage` {#step-6-implement-the-updateMessage-function}

Tudo bem, pessoal, chegamos à reta final! Na `updateMessage` do seu arquivo `interact.js`, faremos o seguinte:

1. Certificar-se de que a mensagem que desejamos publicar em nosso contrato inteligente é válida
2. Assinar nossa transação usando o MetaMask
3. Chamar esta função do nosso componente de frontend `HelloWorld.js`

Isso não levará muito tempo; vamos terminar este dapp!

#### Tratamento de erros de entrada {#input-error-handling}

Naturalmente, faz sentido ter algum tipo de tratamento de erro de entrada no início da função.

Queremos que nossa função retorne mais cedo se não houver extensão MetaMask instalada, se não houver carteira conectada (ou seja, o `address` passado é uma string vazia) ou se a `message` for uma string vazia. Vamos adicionar o seguinte tratamento de erro a `updateMessage`:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Conecte sua carteira MetaMask para atualizar a mensagem na blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Sua mensagem não pode ser uma string vazia.",
    }
  }
}
```

Agora que temos o tratamento de erro de entrada adequado, é hora de assinar a transação via MetaMask!

#### Assinando nossa transação {#signing-our-transaction}

Se você já está confortável com transações Ethereum da web3 tradicional, o código que escreveremos a seguir será muito familiar. Abaixo do seu código de tratamento de erro de entrada, adicione o seguinte a `updateMessage`:

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
          Veja o status da sua transação no Etherscan!
        </a>
        <br />
        ℹ️ Assim que a transação for verificada pela rede, a mensagem será atualizada automaticamente.
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

- `to` especifica o endereço do destinatário (nosso contrato inteligente)
- `from` especifica o signatário da transação, a variável `address` que passamos para nossa função
- `data` contém a chamada para o método `update` do nosso contrato inteligente Hello World, recebendo nossa variável de string `message` como entrada

Então, fazemos uma chamada de espera, `window.ethereum.request`, onde pedimos ao MetaMask para assinar a transação. Observe que, nas linhas 11 e 12, estamos especificando nosso método eth, `eth_sendTransaction`, e passando nossos `transactionParameters`.

Neste ponto, a MetaMask irá abrir no navegador e pedirá que o usuário assine ou rejeite a transação.

- Se a transação for bem-sucedida, a função retornará um objeto JSON onde a string JSX `status` solicita ao usuário que verifique o Etherscan para mais informações sobre sua transação.
- Se a transação falhar, a função retornará um objeto JSON onde a string `status` transmite a mensagem de erro.

No total, nossa função `updateMessage` deve ter a seguinte aparência:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //tratamento de erro de entrada
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Conecte sua carteira MetaMask para atualizar a mensagem na blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Sua mensagem não pode ser uma string vazia.",
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
            Veja o status da sua transação no Etherscan!
          </a>
          <br />
          ℹ️ Assim que a transação for verificada pela rede, a mensagem será atualizada automaticamente.
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

#### Conecte `updateMessage` ao frontend `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

Nossa função `onUpdatePressed` deve fazer uma chamada de espera para a função `updateMessage` importada e modificar a variável de estado `status` para refletir se nossa transação foi bem-sucedida ou falhou:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

É super limpo e simples. E adivinhe só... SEU DAPP ESTÁ COMPLETO!!!

Vá em frente e teste o botão **Atualizar**!

### Crie seu próprio dapp personalizado {#make-your-own-custom-dapp}

Uhuuu, você chegou ao final do tutorial! Para recapitular, você aprendeu como:

- Conectar uma carteira MetaMask ao seu projeto de dapp
- Ler dados do seu contrato inteligente usando a API [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Assinar transações Ethereum usando o MetaMask

Agora você está totalmente equipado para aplicar as habilidades deste tutorial para construir seu próprio projeto de dapp personalizado! Como sempre, se tiver alguma dúvida, não hesite em nos contatar para obter ajuda no [Discord da Alchemy](https://discord.gg/gWuC7zB). 🧙‍♂️

Depois de concluir este tutorial, conte-nos como foi sua experiência ou se você tem algum feedback, marcando-nos no Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform)!
