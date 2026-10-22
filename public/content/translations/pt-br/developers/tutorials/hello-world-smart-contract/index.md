---
title: Contrato inteligente Hello World para iniciantes
description: "Tutorial introdutório sobre como escrever e implantar um contrato inteligente simples no Ethereum."
author: "elanh"
tags: ["Solidity", "Hardhat", "Alchemy", "contratos inteligentes", "implantação"]
skill: beginner
breadcrumb: Contrato Hello World
lang: pt-br
published: 2021-03-31
---

Se você é novo no desenvolvimento de blockchain e não sabe por onde começar, ou se apenas quer entender como implantar e interagir com contratos inteligentes, este guia é para você. Vamos orientá-lo na criação e implantação de um contrato inteligente simples na rede de teste Sepolia usando uma carteira virtual [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/) e [Alchemy](https://www.alchemy.com/eth) (não se preocupe se você ainda não entende o que nada disso significa, nós explicaremos).

Depois que seu contrato for implantado, você poderá [construir uma interface de usuário para ele](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Se você tiver dúvidas em qualquer momento, sinta-se à vontade para entrar em contato no [Discord da Alchemy](https://discord.gg/gWuC7zB)!

## Passo 1: Conecte-se à rede Ethereum {#step-1}

Existem muitas maneiras de fazer solicitações à cadeia Ethereum. Por simplicidade, usaremos uma conta gratuita na Alchemy, uma plataforma de desenvolvedores de blockchain e API que nos permite nos comunicar com a cadeia Ethereum sem ter que executar nossos próprios nós. A plataforma também possui ferramentas de desenvolvedor para monitoramento e análise que aproveitaremos neste tutorial para entender o que está acontecendo internamente na implantação do nosso contrato inteligente. Se você ainda não tem uma conta na Alchemy, [pode se inscrever gratuitamente aqui](https://dashboard.alchemy.com/signup).

## Passo 2: Crie seu aplicativo (e chave de API) {#step-2}

Depois de criar uma conta na Alchemy, você pode gerar uma chave de API criando um aplicativo. Isso nos permitirá fazer solicitações à rede de teste Sepolia. Se você não está familiarizado com redes de teste (testnets), confira [esta página](/developers/docs/networks/).

1.  Navegue até a página "Create new app" (Criar novo aplicativo) no seu Painel da Alchemy selecionando "Select an app" (Selecionar um aplicativo) na barra de navegação e clicando em "Create new app"

![Hello world create app](./hello-world-create-app.png)

2. Dê ao seu aplicativo o nome "Hello World", ofereça uma breve descrição e escolha um caso de uso, por exemplo, "Infra & Tooling" (Infraestrutura e Ferramentas). Em seguida, pesquise por "Ethereum" e selecione a rede.

![create app view hello world](./create-app-view-hello-world.png)

3. Clique em "Next" (Avançar) para prosseguir, depois em "Create app" (Criar aplicativo) e pronto! Seu aplicativo deve aparecer no menu suspenso da barra de navegação, com uma chave de API disponível para copiar.

## Passo 3: Crie uma conta Ethereum (endereço) {#step-3}

Precisamos de uma conta Ethereum para enviar e receber transações. Para este tutorial, usaremos a MetaMask, uma carteira virtual no navegador usada para gerenciar o endereço da sua conta Ethereum. Mais sobre [transações](/developers/docs/transactions/).

Você pode baixar a MetaMask e criar uma conta Ethereum gratuitamente [aqui](https://metamask.io/download). Ao criar uma conta, ou se você já tiver uma, certifique-se de mudar para a rede de teste "Sepolia" usando o menu suspenso de rede (para que não estejamos lidando com dinheiro real).

Se você não vir a Sepolia listada, abra o menu no canto superior direito, selecione "Networks" (Redes) e ative "Show test networks" (Mostrar redes de teste) na parte inferior da lista de redes (consulte o [guia da MetaMask para visualizar redes de teste](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)). Em seguida, selecione "Sepolia" no menu de seleção de rede.

![metamask sepolia example](./metamask-sepolia-example.png)

## Passo 4: Adicione ether de um faucet {#step-4}

Para implantar nosso contrato inteligente na rede de teste, precisaremos de alguns ETH falsos. Para obter ETH da Sepolia, você pode acessar os [detalhes da rede Sepolia](/developers/docs/networks/#sepolia) para ver uma lista de vários faucets. Se um não funcionar, tente outro, pois às vezes eles podem secar. Alguns faucets têm regras de elegibilidade; por exemplo, o faucet Sepolia da Alchemy exige que o endereço de recebimento tenha pelo menos 0.001 ETH na Rede Principal do Ethereum. Pode levar algum tempo para receber seus ETH falsos devido ao tráfego da rede. Você deverá ver os ETH na sua conta MetaMask logo em seguida!

## Passo 5: Verifique seu saldo {#step-5}

Para verificar se o nosso saldo está lá, vamos fazer uma solicitação [eth_getBalance](/developers/docs/apis/json-rpc/#eth-getbalance) usando a [ferramenta composer da Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Isso retornará a quantidade de ETH em nossa carteira. Depois de inserir o endereço da sua conta MetaMask e clicar em "Send Request" (Enviar solicitação), você deverá ver uma resposta como esta:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **NOTA:** Este resultado está em Wei, não em ETH. Wei é usado como a menor denominação de ether. A conversão de Wei para ETH é: 1 eth = 10<sup>18</sup> Wei. Portanto, se convertermos 0x2B5E3AF16B1880000 para decimal, obteremos 5\*10¹⁸, o que equivale a 5 ETH.
>
> Ufa! Nosso dinheiro falso está todo lá <Emoji text=":money_mouth_face:" size={1} />.

## Passo 6: Inicialize nosso projeto {#step-6}

Primeiro, precisaremos criar uma pasta para o nosso projeto. Navegue até a sua linha de comando e digite:

```sh
mkdir hello-world
cd hello-world
```

Agora que estamos dentro da pasta do nosso projeto, usaremos `npm init` para inicializar o projeto. Se você ainda não tem o npm instalado, siga [as instruções de instalação do Node.js](https://nodejs.org/en/download/) (precisaremos do Node.js e do npm para este tutorial).

```sh
npm init
```

Não importa muito como você responde às perguntas de instalação, aqui está como fizemos para referência:

```text
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

Aprove o package.json. O Hardhat 3, que instalaremos a seguir, suporta apenas projetos de módulo ES, então marque o projeto como um:

```sh
npm pkg set type=module
```

E estamos prontos para continuar!

## Passo 7: Baixe o [Hardhat](https://hardhat.org/docs/getting-started) {#step-7}

O Hardhat é um ambiente de desenvolvimento para compilar, implantar, testar e depurar seu software Ethereum. Ele ajuda os desenvolvedores a construir contratos inteligentes e aplicativos descentralizados (dapps) localmente antes de implantá-los na cadeia ativa.

O Hardhat 3 requer o Node.js v22.13.0 ou posterior. Dentro do nosso projeto `hello-world`, execute:

```sh
npm install --save-dev hardhat
```

Confira esta página para mais detalhes sobre as [instruções de instalação](https://hardhat.org/docs/getting-started).

## Passo 8: Crie o projeto Hardhat {#step-8}

Executar `npx hardhat --init` geraria um projeto de exemplo completo, mas para este tutorial configuraremos as coisas manualmente para que você possa ver cada parte. Na raiz da pasta do seu projeto, crie um arquivo chamado `hardhat.config.js` com o seguinte conteúdo:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

É aqui que especificaremos toda a configuração do nosso projeto (no passo 13). Por enquanto, ele apenas diz ao Hardhat qual versão do compilador Solidity usar.

## Passo 9: Adicione as pastas do projeto {#step-9}

Para manter nosso projeto organizado, criaremos duas novas pastas. Navegue até o diretório raiz do seu projeto na sua linha de comando e digite:

```
mkdir contracts
mkdir scripts
```

- `contracts/` é onde manteremos o arquivo de código do nosso contrato inteligente hello world
- `scripts/` é onde manteremos os scripts para implantar e interagir com nosso contrato

## Passo 10: Escreva nosso contrato {#step-10}

Você pode estar se perguntando: quando diabos vamos escrever código?? Bem, aqui estamos, no passo 10.

Abra o projeto hello-world no seu editor favorito (nós gostamos do [VSCode](https://code.visualstudio.com/)). Os contratos inteligentes são escritos em uma linguagem chamada Solidity, que é o que usaremos para escrever nosso contrato inteligente HelloWorld.sol.‌

1.  Navegue até a pasta "contracts" e crie um novo arquivo chamado HelloWorld.sol
2.  Abaixo está um exemplo de contrato inteligente Hello World da Fundação Ethereum que usaremos para este tutorial. Copie e cole o conteúdo abaixo no seu arquivo HelloWorld.sol e certifique-se de ler os comentários para entender o que este contrato faz:

```solidity
// SPDX-License-Identifier: MIT
// Especifica a versão da Solidity, usando versionamento semântico.
// Saiba mais: https://docs.soliditylang.org/en/latest/layout-of-source-files.html#pragma
pragma solidity ^0.8.24;

// Define um contrato chamado `HelloWorld`.
// Um contrato é uma coleção de funções e dados (seu estado). Uma vez implantado, um contrato reside em um endereço específico na blockchain Ethereum. Saiba mais: https://docs.soliditylang.org/en/latest/structure-of-a-contract.html
contract HelloWorld {

   // Declara uma variável de estado `message` do tipo `string`.
   // Variáveis de estado são variáveis cujos valores são armazenados permanentemente no armazenamento do contrato. A palavra-chave `public` torna as variáveis acessíveis de fora de um contrato e cria uma função que outros contratos ou clientes podem chamar para acessar o valor.
   string public message;

   // Semelhante a muitas linguagens orientadas a objetos baseadas em classes, um construtor é uma função especial que é executada apenas na criação do contrato.
   // Construtores são usados para inicializar os dados do contrato. Saiba mais: https://docs.soliditylang.org/en/latest/contracts.html#constructors
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

## Passo 11: Conecte a MetaMask e a Alchemy ao seu projeto {#step-11}

Criamos uma carteira MetaMask, uma conta na Alchemy e escrevemos nosso contrato inteligente, agora é hora de conectar os três.

Toda transação enviada da sua carteira virtual requer uma assinatura usando sua chave privada exclusiva. Para fornecer essa permissão ao nosso programa, podemos armazenar com segurança nossa chave privada (e a chave de API da Alchemy) em um arquivo de ambiente.

> Para saber mais sobre o envio de transações, confira a [documentação de transações](/developers/docs/transactions/).

Crie um arquivo `.env` no diretório raiz do nosso projeto e adicione sua chave privada da MetaMask e a URL da API HTTP da Alchemy a ele.

- Siga [estas instruções](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) para exportar sua chave privada
- Veja abaixo como obter a URL da API HTTP da Alchemy

![get alchemy api key](./get-alchemy-api-key.png)

Copie a URL da API da Alchemy

Seu `.env` deve ficar assim:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Para realmente conectá-los ao nosso código, faremos referência a essas variáveis no nosso arquivo `hardhat.config.js` no passo 13. O Node.js pode ler arquivos `.env` por conta própria, então não há pacote extra para instalar.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Não faça commit do <code>.env</code>! Certifique-se de nunca compartilhar ou expor seu arquivo <code>.env</code> com ninguém, pois você estará comprometendo seus segredos ao fazer isso. Se você estiver usando controle de versão, adicione seu <code>.env</code> a um arquivo <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Passo 12: Instale o Ethers.js {#step-12-install-ethersjs}

O Ethers.js é uma biblioteca que facilita a interação e a realização de solicitações ao Ethereum, envolvendo [métodos JSON-RPC padrão](/developers/docs/apis/json-rpc/) com métodos mais amigáveis.

O Hardhat torna super fácil integrar [Plugins](https://hardhat.org/docs/plugins/official-plugins) para ferramentas adicionais e funcionalidade estendida. Aproveitaremos o [plugin Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) para a implantação de contratos (o [Ethers.js](https://docs.ethers.org/v6/) tem alguns métodos de implantação de contratos super limpos).

No diretório do seu projeto, digite:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

Também adicionaremos o plugin ao nosso `hardhat.config.js` no próximo passo.

## Passo 13: Atualize o hardhat.config.js {#step-13-update-hardhatconfigjs}

Adicionamos várias dependências e plugins até agora, agora precisamos atualizar o `hardhat.config.js` para que nosso projeto saiba sobre todos eles.

Atualize seu `hardhat.config.js` para ficar assim:

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// Carrega API_URL e PRIVATE_KEY do arquivo .env para o process.env, se existir
if (existsSync(".env")) process.loadEnvFile()

export default defineConfig({
  plugins: [hardhatEthers],
  solidity: "0.8.34",
  networks: {
    sepolia: {
      type: "http",
      url: configVariable("API_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
})
```

`configVariable` diz ao Hardhat para ler cada valor de uma variável de ambiente apenas quando for necessário, para que comandos como `compile` funcionem mesmo antes de os valores serem definidos. Se você preferir não manter sua chave privada em um arquivo de texto simples, o Hardhat também pode ler [variáveis de configuração de um repositório de chaves criptografado](https://hardhat.org/docs/guides/configuration-variables).

## Passo 14: Compile nosso contrato {#step-14-compile-our-contracts}

Para garantir que tudo esteja funcionando até agora, vamos compilar nosso contrato. A tarefa `compile` é uma das tarefas integradas do Hardhat.

Na linha de comando, execute:

```sh
npx hardhat compile
```

Na primeira vez que você compilar, o Hardhat fará o download do compilador Solidity. Você deverá ver algo como `Compiled 1 Solidity file with solc 0.8.34`. Se não, você sempre pode enviar uma mensagem no [Discord da Alchemy](https://discord.gg/gWuC7zB).

## Passo 15: Escreva nosso script de implantação {#step-15-write-our-deploy-scripts}

Agora que nosso contrato está escrito e nosso arquivo de configuração está pronto, é hora de escrever nosso script de implantação de contrato.

Navegue até a pasta `scripts/` e crie um novo arquivo chamado `deploy.js`, adicionando o seguinte conteúdo a ele:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const HelloWorld = await ethers.getContractFactory("HelloWorld")

// Inicia a implantação, retornando uma promise que resolve para um objeto de contrato
const hello_world = await HelloWorld.deploy("Hello World!")
await hello_world.waitForDeployment()
console.log("Contract deployed to address:", await hello_world.getAddress())
```

Vamos analisar o que cada uma dessas linhas de código faz.

```js
const { ethers } = await network.create()
```

No Hardhat 3, um script abre uma conexão com uma rede explicitamente. `network.create()` conecta-se à rede que você escolher com a opção `--network` ao executar o script, e o plugin `hardhat-ethers` adiciona um objeto `ethers` a essa conexão.

```js
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

Um `ContractFactory` no ethers.js é uma abstração usada para implantar novos contratos inteligentes, então `HelloWorld` aqui é uma fábrica para instâncias do nosso contrato hello world. Ao usar o plugin `hardhat-ethers`, as instâncias de `ContractFactory` e `Contract` são conectadas ao primeiro signatário por padrão.

```js
const hello_world = await HelloWorld.deploy("Hello World!")
```

Chamar `deploy()` em um `ContractFactory` iniciará a implantação e retornará uma `Promise` que é resolvida em um `Contract`. Este é o objeto que tem um método para cada uma das funções do nosso contrato inteligente. Os argumentos que você passa para `deploy()` vão para o construtor do contrato, aqui a mensagem inicial.

`waitForDeployment()` aguarda até que a transação de implantação seja incluída em um bloco, e `getAddress()` retorna o endereço do novo contrato. Consulte a [documentação de contratos do ethers.js](https://docs.ethers.org/v6/api/contract/) para mais detalhes.

## Passo 16: Implante nosso contrato {#step-16-deploy-our-contract}

Finalmente estamos prontos para implantar nosso contrato inteligente! Navegue até a linha de comando e execute:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

Você deverá ver algo como:

```text
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Se formos ao [Etherscan da Sepolia](https://sepolia.etherscan.io/) e pesquisarmos pelo endereço do nosso contrato, deveremos ver que ele foi implantado com sucesso. A transação será parecida com esta:

![etherscan contract](./etherscan-contract.png)

O endereço `From` (De) deve corresponder ao endereço da sua conta MetaMask e o endereço `To` (Para) dirá "Contract Creation" (Criação de Contrato), mas se clicarmos na transação, veremos o endereço do nosso contrato no campo `To`:

![etherscan transaction](./etherscan-transaction.png)

Parabéns! Você acabou de implantar um contrato inteligente na cadeia Ethereum 🎉

Para entender o que está acontecendo internamente, você pode observar as solicitações que seu aplicativo "Hello World" recebeu no seu [painel da Alchemy](https://dashboard.alchemy.com/).

Lá você verá algumas chamadas JSON-RPC que o Hardhat/Ethers fez internamente para nós quando chamamos a função `.deploy()`. Duas importantes a serem destacadas aqui são [`eth_sendRawTransaction`](/developers/docs/apis/json-rpc/#eth-sendrawtransaction), que é a solicitação para realmente escrever nosso contrato na cadeia Sepolia, e [`eth_getTransactionByHash`](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash), que é uma solicitação para ler informações sobre nossa transação dado o hash (um padrão típico ao enviar transações). Para saber mais sobre o envio de transações, confira a [documentação de transações](/developers/docs/transactions/).

Isso é tudo para este tutorial. A seguir, você pode [construir uma interface de usuário para o seu contrato](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).
