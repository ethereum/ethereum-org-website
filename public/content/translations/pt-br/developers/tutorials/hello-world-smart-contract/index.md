---
title: Contrato inteligente "Hello World" para iniciantes
description: "Tutorial introdutório sobre como escrever e implantar um contrato inteligente simples no Ethereum."
author: "elanh"
tags:
  [
    "solidez",
    "hardhat",
    "alchemy",
    "smart contracts",
    "implantação"
  ]
skill: beginner
lang: pt-br
published: 2021-03-31
---

Se você é novo no desenvolvimento de blockchain e não sabe por onde começar, ou se apenas deseja entender como implantar ou interagir com contratos inteligentes, este guia é para você. Vamos criar e implantar um contrato inteligente simples na rede de teste Sepolia usando uma carteira virtual [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/) e [Alchemy](https://www.alchemy.com/eth) (não se preocupe se você ainda não entendeu o que isso significa, nós explicaremos).

Na [parte 2](https://docs.alchemy.com/docs/interacting-with-a-smart-contract) deste tutorial, vamos ver como podemos interagir com nosso contrato inteligente depois de implantado aqui, e na [parte 3](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) vamos cobrir como publicá-lo no Etherscan.

Se você tiver alguma dúvida, sinta-se à vontade para entrar em contato no [Discord da Alchemy](https://discord.gg/gWuC7zB)!

## Etapa 1: Conectar-se à rede Ethereum {#step-1}

Existem muitas maneiras de fazer solicitações para a cadeia Ethereum. Para simplificar, usaremos uma conta gratuita no Alchemy, uma plataforma de desenvolvimento de blockchain e API que nos permite comunicar com a cadeia Ethereum sem ter que executar nossos próprios nós. A plataforma também possui ferramentas de desenvolvedor para monitoramento e análise das quais tiraremos proveito neste tutorial para entender o que está acontecendo nos bastidores na implantação do nosso contrato inteligente. Se você ainda não tem uma conta da Alchemy, [pode se inscrever gratuitamente aqui](https://dashboard.alchemy.com/signup).

## Etapa 2: Criar seu aplicativo (e chave de API) {#step-2}

Assim que criar uma conta na Alchemy, você pode gerar uma chave de API criando um "app". Isso nos permitirá fazer solicitações à rede de teste Sepolia. Se você não está familiarizado com redes de teste, confira [esta página](/developers/docs/networks/).

1. Navegue até a página "Create new app" em seu Painel de Controle da Alchemy, selecionando "Select an app" na barra de navegação e clicando em "Create new app"

![Hello world criar aplicativo](./hello-world-create-app.png)

2. Dê um nome ao seu aplicativo, como “Hello World”, ofereça uma breve descrição e escolha um caso de uso, por exemplo, "Infra & Tooling." Em seguida, pesquise por "Ethereum" e selecione a rede.

![visualização de criação de aplicativo hello world](./create-app-view-hello-world.png)

3. Clique em "Next" para prosseguir, depois em “Create app” e pronto! Seu aplicativo deve aparecer no menu suspenso da barra de navegação, com uma chave de API disponível para cópia.

## Etapa 3: Criar uma conta Ethereum (endereço) {#step-3}

Precisamos de uma conta Ethereum para enviar e receber transações. Para este tutorial, usaremos uma carteira virtual no navegador, a MetaMask, para gerenciar o endereço da sua conta Ethereum. Mais sobre [transações](/developers/docs/transactions/).

Você pode baixar o MetaMask e criar uma conta Ethereum gratuitamente [aqui](https://metamask.io/download). Ao criar uma conta, ou se você já tiver uma, certifique-se de mudar para a rede de teste "Sepolia" usando o menu suspenso de rede (para que não estejamos lidando com dinheiro de verdade).

Se você não vir a Sepolia listada, vá ao menu, depois em Advanced e role para baixo para ativar a opção "Show test networks". No menu de seleção de rede, escolha a aba "Custom" para encontrar uma lista de redes de teste e selecione "Sepolia."

![exemplo metamask sepolia](./metamask-sepolia-example.png)

## Etapa 4: Adicionar ether de um faucet {#step-4}

Para implantar nosso contrato inteligente na rede de teste, precisaremos de um pouco de ETH falso. Para obter Sepolia ETH, você pode ir para os [detalhes da rede Sepolia](/developers/docs/networks/#sepolia) para ver uma lista de vários faucets. Se um não funcionar, tente outro, pois eles podem, às vezes, ficar sem fundos. Pode levar algum tempo para receber seu ETH falso devido ao tráfego da rede. Você deverá ver o ETH em sua conta MetaMask logo em seguida!

## Etapa 5: Verificar seu saldo {#step-5}

Para verificar se nosso saldo está lá, vamos fazer uma solicitação [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) usando a [ferramenta composer da Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Ele mostrará a quantidade de ETH em nossa carteira. Depois de inserir o endereço da sua conta da MetaMask e clicar em "Send Request", você verá uma resposta como esta:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **OBSERVAÇÃO:** Este resultado está em wei, não em ETH. Lembre-se de que "Wei" é a menor unidade de ether. A conversão de wei para ETH é: 1 eth = 10<sup>18</sup> wei. Então, se convertermos 0x2B5E3AF16B1880000 para decimal, teremos 5\*10¹⁸, o que equivale a 5 ETH.
>
> Ufa! Nosso dinheiro falso está todo lá <Emoji text=":money_mouth_face:" size={1} />.

## Etapa 6: Inicializar nosso projeto {#step-6}

Primeiro, precisamos criar uma pasta para o nosso projeto. Navegue até sua linha de comando e digite:

```
mkdir hello-world
cd hello-world
```

Agora que estamos dentro da pasta do nosso projeto, usaremos o `npm init` para inicializar o projeto. Se você ainda não tiver o npm instalado, siga [estas instruções](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (também precisaremos do Node.js, então baixe-o também!).

```
npm init
```

Não importa muito como você responde às perguntas da instalação, aqui está como fizemos para referência:

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

Aprove o package.json e estamos prontos!

## Etapa 7: Baixar o [Hardhat](https://hardhat.org/getting-started/#overview) {#step-7}

Hardhat é um ambiente de desenvolvimento para compilar, implementar, testar e depurar seu software de Ethereum. Ele ajuda os desenvolvedores na criação de contratos inteligentes e dapps localmente antes de implantar na cadeia real.

Dentro do nosso projeto `hello-world`, execute:

```
npm install --save-dev hardhat
```

Confira esta página para mais detalhes sobre as [instruções de instalação](https://hardhat.org/getting-started/#overview).

## Etapa 8: Criar projeto Hardhat {#step-8}

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

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Isso gerará um arquivo `hardhat.config.js` para nós, que é onde especificaremos toda a configuração do nosso projeto (na etapa 13).

## Etapa 9: Adicionar pastas do projeto {#step-9}

Para manter nosso projeto organizado, criaremos duas novas pastas. Navegue até o diretório raiz do seu projeto na sua linha de comando e digite:

```
mkdir contracts
mkdir scripts
```

- `contracts/` é onde manteremos nosso arquivo de código do contrato inteligente hello world
- `scripts/` é onde manteremos os scripts para implantar e interagir com nosso contrato

## Etapa 10: Escrever nosso contrato {#step-10}

Você pode estar se perguntando, quando diabos vamos escrever código?? Bem, aqui estamos, na etapa 10.

Abra o projeto hello-world em seu editor favorito (nós gostamos do [VSCode](https://code.visualstudio.com/)). Os contratos inteligentes são escritos em uma linguagem chamada Solidity, que é o que usaremos para escrever nosso contrato inteligente HelloWorld.sol.‌

1. Navegue até a pasta “contracts” e crie um novo arquivo chamado HelloWorld.sol
2. Abaixo está um exemplo de contrato inteligente Hello World da Ethereum Foundation que usaremos neste tutorial. Copie e cole o conteúdo abaixo em seu arquivo HelloWorld.sol e certifique-se de ler os comentários para entender o que este contrato faz:

```solidity
// Especifica a versão do Solidity, usando o versionamento semântico.
// Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Define um contrato chamado `HelloWorld`.
// Um contrato é uma coleção de funções e dados (seu estado). Uma vez implantado, um contrato reside em um endereço específico na blockchain Ethereum. Saiba mais: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Declara uma variável de estado `message` do tipo `string`.
   // As variáveis de estado são variáveis cujos valores são armazenados permanentemente no armazenamento do contrato. A palavra-chave `public` torna as variáveis acessíveis de fora de um contrato e cria uma função que outros contratos ou clientes podem chamar para acessar o valor.
   string public message;

   // Semelhante a muitas linguagens orientadas a objetos baseadas em classes, um construtor é uma função especial que só é executada na criação do contrato.
   // Os construtores são usados para inicializar os dados do contrato. Saiba mais:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Aceita um argumento de string `initMessage` e define o valor na variável de armazenamento `message` do contrato).
      message = initMessage;
   }

   // Uma função pública que aceita um argumento de string e atualiza a variável de armazenamento `message`.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Este é um contrato inteligente super simples que armazena uma mensagem na criação e pode ser atualizado chamando a função `update`.

## Etapa 11: Conectar o MetaMask e o Alchemy ao seu projeto {#step-11}

Nós criamos uma carteira MetaMask, uma conta da Alchemy e escrevemos nosso contrato inteligente. Agora é hora de conectar os três.

Toda transação enviada da sua carteira virtual requer uma assinatura, usando sua chave privada única. Para fornecer esta permissão a nosso programa, podemos armazenar nossa chave privada (e a chave Alchemy API) em um arquivo de ambiente.

> Para saber mais sobre o envio de transações, confira [este tutorial](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) sobre o envio de transações usando web3.

Primeiro, instale o pacote dotenv na pasta do seu projeto:

```
npm install dotenv --save
```

Em seguida, crie um arquivo `.env` no diretório raiz do nosso projeto e adicione sua chave privada do MetaMask e o URL da API HTTP da Alchemy a ele.

- Siga [estas instruções](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) para exportar sua chave privada
- Veja abaixo para obter o URL da API HTTP da Alchemy

![obter chave de api da alchemy](./get-alchemy-api-key.png)

Copiar URL da API da Alchemy

Seu `.env` deve ficar assim:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/sua-chave-de-api"
PRIVATE_KEY = "sua-chave-privada-metamask"
```

Para realmente conectar isso ao nosso código, faremos referência a essas variáveis em nosso arquivo `hardhat.config.js` na etapa 13.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Não faça commit do <code>.env</code>! Por favor, certifique-se de nunca compartilhar ou expor seu arquivo <code>.env</code> com ninguém, pois você está comprometendo seus segredos ao fazer isso. Se você estiver usando controle de versão, adicione seu <code>.env</code> a um arquivo <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Etapa 12: Instalar o Ethers.js {#step-12-install-ethersjs}

Ethers.js é uma biblioteca que facilita a interação e a realização de solicitações à Ethereum, envolvendo os [métodos JSON-RPC padrão](/developers/docs/apis/json-rpc/) com métodos mais amigáveis ao usuário.

O Hardhat torna muito fácil a integração de [Plugins](https://hardhat.org/plugins/) para ferramentas adicionais e funcionalidades estendidas. Aproveitaremos o [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) para a implantação de contratos ([Ethers.js](https://github.com/ethers-io/ethers.js/) has some super clean contract deployment methods).

No diretório do seu projeto, digite:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Também vamos precisar do ethers em nosso `hardhat.config.js` na próxima etapa.

## Etapa 13: Atualizar o hardhat.config.js {#step-13-update-hardhatconfigjs}

Adicionamos várias dependências e plugins até agora. Agora precisamos atualizar o `hardhat.config.js` para que nosso projeto saiba sobre todos eles.

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

## Etapa 14: Compilar nosso contrato {#step-14-compile-our-contracts}

Para ter certeza de que tudo está funcionando, vamos compilar nosso contrato. A tarefa `compile` é uma das tarefas incorporadas do hardhat.

Na linha de comando, execute:

```
npx hardhat compile
```

Você pode receber um aviso sobre `SPDX license identifier not provided in source file`, mas não precisa se preocupar com isso — esperamos que todo o resto pareça bom! Se não, você sempre pode enviar uma mensagem no [Discord da Alchemy](https://discord.gg/u72VCg3).

## Etapa 15: Escrever nosso script de implantação {#step-15-write-our-deploy-scripts}

Agora que nosso contrato está escrito e nosso arquivo de configuração está pronto, é hora de escrever o script de implantação do contrato.

Navegue até a pasta `scripts/` e crie um novo arquivo chamado `deploy.js`, adicionando o seguinte conteúdo a ele:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Inicia a implantação, retornando uma promessa que resolve para um objeto de contrato
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contrato implantado no endereço:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

A Hardhat faz um trabalho incrível explicando o que cada uma dessas linhas de código faz em seu [tutorial de Contratos](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), nós adotamos as explicações deles aqui.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Uma `ContractFactory` em ethers.js é uma abstração usada para implantar novos contratos inteligentes. Portanto, `HelloWorld` aqui é uma fábrica para instâncias do nosso contrato hello world. Ao usar o plugin `hardhat-ethers`, as instâncias `ContractFactory` e `Contract` são conectadas ao primeiro signatário por padrão.

```
const hello_world = await HelloWorld.deploy();
```

Chamar `deploy()` em uma `ContractFactory` iniciará a implantação e retornará uma `Promise` que resolve para um `Contrato`. Este é o objeto que tem um método para cada uma de nossas funções de contrato inteligente.

## Etapa 16: Implantar nosso contrato {#step-16-deploy-our-contract}

Finalmente estamos prontos para implantar o nosso contrato inteligente! Navegue até a linha de comando e execute:

```
npx hardhat run scripts/deploy.js --network sepolia
```

Você deverá ver algo assim:

```
Contrato implantado no endereço: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Se formos ao [Etherscan da Sepolia](https://sepolia.etherscan.io/) e pesquisarmos o endereço do nosso contrato, poderemos ver que ele foi implantado com sucesso. A transação ficará parecida com isto:

![contrato no etherscan](./etherscan-contract.png)

O endereço `From` deve corresponder ao endereço da sua conta MetaMask e o endereço To dirá “Contract Creation”, mas se clicarmos na transação, veremos o endereço do nosso contrato no campo `To`:

![transação no etherscan](./etherscan-transaction.png)

Parabéns! Você acabou de implantar um contrato inteligente na cadeia Ethereum 🎉

Para entender o que está acontecendo nos bastidores, vamos navegar para a guia Explorer em nosso [painel da Alchemy](https://dashboard.alchemyapi.io/explorer). Se você tiver vários aplicativos Alchemy, certifique-se de filtrar por aplicativo e selecionar “Hello World”.
![explorador hello world](./hello-world-explorer.png)

Aqui você verá uma série de chamadas JSON-RPC que o Hardhat/Ethers fizeram nos bastidores para nós quando chamamos a função `.deploy()`. Duas chamadas importantes a serem destacadas aqui são [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction), que é a solicitação para realmente escrever nosso contrato na cadeia Sepolia, e [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash), que é uma solicitação para ler informações sobre nossa transação, dado o hash (um padrão típico ao lidar com
transações). Para saber mais sobre o envio de transações, confira este tutorial sobre [o envio de transações usando Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)

Isso é tudo para a parte 1 deste tutorial. Na parte 2, vamos [interagir com nosso contrato inteligente](https://www.alchemy.com/docs/interacting-with-a-smart-contract) atualizando nossa mensagem inicial e, na parte 3, vamos [publicar nosso contrato inteligente no Etherscan](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) para que todos saibam como interagir com ele.

**Quer saber mais sobre o Alchemy? Confira nosso [site](https://www.alchemy.com/eth). Não quer perder nenhuma atualização? Assine nossa newsletter [aqui](https://www.alchemy.com/newsletter)! Não se esqueça de entrar também no nosso [Discord](https://discord.gg/u72VCg3).**.
