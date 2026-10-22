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

Com os tokens não fungíveis (NFTs) trazendo a blockchain para os holofotes do público, agora é uma excelente oportunidade para entender o entusiasmo por si mesmo, publicando seu próprio contrato de NFT (token ERC-721) na blockchain Ethereum!

Neste tutorial, vamos orientá-lo na criação e implantação de um contrato inteligente ERC-721 na rede de teste Sepolia usando [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) e [Alchemy](https://alchemy.com/signup/eth) (não se preocupe se você ainda não entende o que nada disso significa — nós explicaremos!).

Na Parte 2 deste tutorial, veremos como podemos usar nosso contrato inteligente para cunhar um NFT, e na Parte 3 explicaremos como visualizar seu NFT na MetaMask.

E, claro, se você tiver dúvidas em qualquer momento, não hesite em entrar em contato no [Discord da Alchemy](https://discord.gg/gWuC7zB) ou visite a [documentação da API de NFT da Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)!

## Passo 1: Conectar-se à rede Ethereum {#connect-to-ethereum}

Existem várias maneiras de fazer solicitações à blockchain Ethereum, mas para facilitar as coisas, usaremos uma conta gratuita na [Alchemy](https://alchemy.com/signup/eth), uma plataforma de desenvolvedores de blockchain e API que nos permite nos comunicar com a cadeia Ethereum sem ter que executar nossos próprios nós.

Neste tutorial, também aproveitaremos as ferramentas de desenvolvedor da Alchemy para monitoramento e análise para entender o que está acontecendo internamente na implantação do nosso contrato inteligente. Se você ainda não tem uma conta na Alchemy, pode se inscrever gratuitamente [aqui](https://alchemy.com/signup/eth).

## Passo 2: Crie seu aplicativo (e chave de API) {#make-api-key}

Depois de criar uma conta na Alchemy, você pode gerar uma chave de Interface de Programação de Aplicações (API) criando um aplicativo. Isso nos permitirá fazer solicitações à rede de teste Sepolia. Confira [este guia](https://www.alchemy.com/docs/choosing-a-web3-network) se você estiver curioso para saber mais sobre redes de teste.

1. Navegue até a página "Create new app" (Criar novo aplicativo) no seu Painel da Alchemy selecionando "Select an app" (Selecionar um aplicativo) na barra de navegação e clicando em "Create new app"

![Crie seu aplicativo](./alchemy-create-new-app.png)

2. Dê um nome ao seu aplicativo (escolhemos "My First NFT!"), ofereça uma breve descrição e escolha um caso de uso. Em seguida, pesquise por "Ethereum" e selecione a rede. Usaremos a Sepolia, a rede de teste recomendada para o desenvolvimento de aplicativos (consulte [Redes Ethereum](/developers/docs/networks/#ethereum-testnets)).

3. Clique em "Next" (Avançar) para prosseguir, depois em "Create app" (Criar aplicativo) e pronto! Seu aplicativo deve aparecer no menu suspenso da barra de navegação, com uma chave de API disponível para cópia.

## Passo 3: Crie uma conta (endereço) Ethereum {#create-eth-address}

Precisamos de uma conta Ethereum para enviar e receber transações. Para este tutorial, usaremos a MetaMask, uma carteira virtual no navegador usada para gerenciar o endereço da sua conta Ethereum. Se você quiser entender mais sobre como as transações na Ethereum funcionam, confira [esta página](/developers/docs/transactions/) da Fundação Ethereum.

Você pode baixar e criar uma conta na MetaMask gratuitamente [aqui](https://metamask.io/download). Ao criar uma conta, ou se você já tiver uma, certifique-se de mudar para a rede de teste "Sepolia" usando o menu de seleção de rede (para que não estejamos lidando com dinheiro real). Se você não vir a Sepolia listada, abra o menu no canto superior direito, selecione "Networks" (Redes) e ative "Show test networks" (Mostrar redes de teste) (consulte o [guia da MetaMask para visualizar redes de teste](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)).

![Defina a Sepolia como sua rede](./metamask-sepolia.png)

## Passo 4: Adicione ether de um Faucet {#step-4-add-ether-from-a-faucet}

Para implantar nosso contrato inteligente na rede de teste, precisaremos de alguns ETH falsos. Para obter ETH da Sepolia, escolha um dos faucets listados nos [detalhes da rede Sepolia](/developers/docs/networks/#sepolia) e insira o endereço da sua conta. Se um não funcionar, tente outro, pois às vezes eles podem secar, e alguns têm regras de elegibilidade: por exemplo, o [faucet Sepolia da Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia) exige que o endereço de recebimento tenha pelo menos 0.001 ETH na Rede Principal do Ethereum. Você deve ver o ETH na sua conta da MetaMask logo em seguida!

## Passo 5: Verificar seu saldo {#check-balance}

Para confirmar que nosso saldo está lá, vamos fazer uma solicitação [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) usando a [ferramenta sandbox da Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Isso retornará a quantidade de ETH em nossa carteira. Depois de inserir o endereço da sua conta da MetaMask e clicar em "Send Request" (Enviar solicitação), você deverá ver uma resposta como esta:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```

> **Nota** Este resultado está em Wei, não em ETH. Wei é usado como a menor denominação de ether. A conversão de Wei para ETH é 1 eth = 10<sup>18</sup> Wei. Portanto, se convertermos 0xde0b6b3a7640000 para decimal, obteremos 1\*10<sup>18</sup> Wei, o que equivale a 1 ETH.

Ufa! Nosso dinheiro falso está todo lá.

## Passo 6: Inicialize nosso projeto {#initialize-project}

Primeiro, precisaremos criar uma pasta para o nosso projeto. Navegue até a sua linha de comando e digite:

```sh
mkdir my-nft
cd my-nft
```

Agora que estamos dentro da pasta do nosso projeto, usaremos o npm init para inicializar o projeto. Se você ainda não tem o npm instalado, siga [as instruções de instalação do Node.js](https://nodejs.org/en/download/) (precisaremos do Node.js e do npm para este tutorial).

```sh
npm init
```

Não importa muito como você responde às perguntas de instalação; aqui está como fizemos para referência:

```text
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

Aprove o package.json. O Hardhat 3, que instalaremos a seguir, suporta apenas projetos de módulo ES, então marque o projeto como um:

```sh
npm pkg set type=module
```

E estamos prontos para começar!

## Passo 7: Instale o [Hardhat](https://hardhat.org/docs/getting-started) {#install-hardhat}

O Hardhat é um ambiente de desenvolvimento para compilar, implantar, testar e depurar seu software Ethereum. Ele ajuda os desenvolvedores na construção de contratos inteligentes e aplicativos descentralizados (dapps) localmente antes de implantar na cadeia ativa.

O Hardhat 3 requer o Node.js v22.13.0 ou posterior. Dentro do nosso projeto my-nft, execute:

```sh
npm install --save-dev hardhat
```

Confira esta página para mais detalhes sobre as [instruções de instalação](https://hardhat.org/docs/getting-started).

## Passo 8: Crie o projeto Hardhat {#create-hardhat-project}

Executar `npx hardhat --init` geraria um projeto de exemplo completo, mas para este tutorial configuraremos as coisas manualmente para que você possa ver cada parte. Na raiz da pasta do seu projeto, crie um arquivo chamado `hardhat.config.js` com o seguinte conteúdo:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

É aqui que especificaremos toda a configuração do nosso projeto (no passo 13). Por enquanto, ele apenas diz ao Hardhat qual versão do compilador Solidity usar.

## Passo 9: Adicione as pastas do projeto {#add-project-folders}

Para manter nosso projeto organizado, criaremos duas novas pastas. Navegue até o diretório raiz do seu projeto na sua linha de comando e digite:

```sh
mkdir contracts
mkdir scripts
```

- contracts/ é onde manteremos o código do nosso contrato inteligente de NFT

- scripts/ é onde manteremos os scripts para implantar e interagir com nosso contrato inteligente

## Passo 10: Escreva nosso contrato {#write-contract}

Agora que nosso ambiente está configurado, vamos para a parte mais emocionante: _escrever o código do nosso contrato inteligente!_

Abra o projeto my-nft no seu editor favorito (nós gostamos do [VSCode](https://code.visualstudio.com/)). Os contratos inteligentes são escritos em uma linguagem chamada Solidity, que é o que usaremos para escrever nosso contrato inteligente MyNFT.sol.‌

1. Navegue até a pasta `contracts` e crie um novo arquivo chamado MyNFT.sol

2. Abaixo está o código do nosso contrato inteligente de NFT, que baseamos na implementação ERC-721 da biblioteca [OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc721). Copie e cole o conteúdo abaixo no seu arquivo MyNFT.sol.

   ```solidity
   // Contrato baseado em https://docs.openzeppelin.com/contracts/5.x/erc721
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.24;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       uint256 private _nextTokenId;

       constructor(address initialOwner)
           ERC721("MyNFT", "NFT")
           Ownable(initialOwner)
       {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           uint256 newItemId = ++_nextTokenId;
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. Como estamos herdando classes da biblioteca de contratos da OpenZeppelin, na sua linha de comando execute `npm install @openzeppelin/contracts` para instalar a biblioteca na nossa pasta. Este tutorial usa a OpenZeppelin Contracts 5.x, que requer Solidity 0.8.24 ou posterior.

Então, o que esse código _faz_ exatamente? Vamos analisá-lo, linha por linha.

No topo do nosso contrato inteligente, importamos três classes de contratos inteligentes da [OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol contém a implementação do padrão ERC-721, que nosso contrato inteligente de NFT herdará. (Para ser um NFT válido, seu contrato inteligente deve implementar todos os métodos do padrão ERC-721.) Para saber mais sobre as funções herdadas do ERC-721, confira a definição da interface [aqui](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/access/Ownable.sol configura o [controle de acesso](https://docs.openzeppelin.com/contracts/5.x/access-control) no nosso contrato inteligente, para que apenas o proprietário do contrato inteligente (você) possa cunhar NFTs. O proprietário é o endereço `initialOwner` passado para o construtor. (Nota: incluir o controle de acesso é inteiramente uma preferência. Se você quiser que qualquer pessoa possa cunhar um NFT usando seu contrato inteligente, remova `Ownable` e `Ownable(initialOwner)` da definição do contrato e do construtor, e `onlyOwner` da função `mintNFT`.)

- @openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol estende o ERC-721 para que cada token possa armazenar seu próprio URI de metadados, que definimos durante a cunhagem.

Após nossas declarações de importação, temos nosso contrato inteligente de NFT personalizado, que é surpreendentemente curto — ele contém apenas um contador, um construtor e uma única função! Isso se deve aos nossos contratos herdados da OpenZeppelin, que implementam a maioria dos métodos que precisamos para criar um NFT, como `ownerOf`, que retorna o proprietário do NFT, e `transferFrom`, que transfere a propriedade do NFT de uma conta para outra.

O contador, `_nextTokenId`, acompanha o número total de NFTs cunhados e define o ID exclusivo no nosso novo NFT. (Cada NFT cunhado usando um contrato inteligente deve receber um ID exclusivo — aqui, nosso ID exclusivo é determinado apenas pelo número total de NFTs existentes. `++_nextTokenId` aumenta o contador antes de ser usado, então o primeiro NFT que cunhamos com nosso contrato inteligente tem um ID de "1", nosso segundo NFT tem um ID de "2", etc.)

No nosso construtor ERC-721, você notará que passamos 2 strings, "MyNFT" e "NFT". A primeira variável é o nome do contrato inteligente e a segunda é o seu símbolo. Você pode nomear cada uma dessas variáveis como desejar!

Finalmente, temos nossa função `mintNFT(address recipient, string memory tokenURI)` que nos permite cunhar um NFT! Você notará que esta função recebe duas variáveis:

- `address recipient` especifica o endereço que receberá seu NFT recém-cunhado

- `string memory tokenURI` é uma string que deve resolver para um documento JSON que descreve os metadados do NFT. Os metadados de um NFT são realmente o que lhe dá vida, permitindo que ele tenha propriedades configuráveis, como nome, descrição, imagem e outros atributos. Na parte 2 deste tutorial, descreveremos como configurar esses metadados.

`mintNFT` chama alguns métodos da biblioteca ERC-721 herdada e, por fim, retorna um número que representa o ID do NFT recém-cunhado.

## Passo 11: Conecte a MetaMask e a Alchemy ao seu projeto {#connect-metamask-and-alchemy}

Agora que criamos uma carteira MetaMask, uma conta na Alchemy e escrevemos nosso contrato inteligente, é hora de conectar os três.

Toda transação enviada da sua carteira virtual requer uma assinatura usando sua chave privada exclusiva. Para fornecer essa permissão ao nosso programa, podemos armazenar com segurança nossa chave privada (e a chave de API da Alchemy) em um arquivo de ambiente.

Para saber mais sobre o envio de transações, confira a [documentação de transações](/developers/docs/transactions/).

Crie um arquivo `.env` no diretório raiz do nosso projeto e adicione sua chave privada da MetaMask e a URL da API HTTP da Alchemy a ele.

- Siga [estas instruções](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) para exportar sua chave privada da MetaMask

- Veja abaixo como obter a URL da API HTTP da Alchemy e copiá-la para a sua área de transferência

![Copie a URL da sua API da Alchemy](./copy-alchemy-api-url.mp4#842x480)

Seu `.env` agora deve ficar assim:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Para realmente conectá-los ao nosso código, faremos referência a essas variáveis no nosso arquivo hardhat.config.js no passo 13. O Node.js pode ler arquivos `.env` por conta própria, então não há nenhum pacote extra para instalar.

<EnvWarningBanner />

## Passo 12: Instale o Ethers.js {#install-ethers}

O Ethers.js é uma biblioteca que facilita a interação e a realização de solicitações à Ethereum, envolvendo [métodos JSON-RPC padrão](/developers/docs/apis/json-rpc/) com métodos mais amigáveis.

O Hardhat torna super fácil integrar [Plugins](https://hardhat.org/docs/plugins/official-plugins) para ferramentas adicionais e funcionalidade estendida. Aproveitaremos o [plugin Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) para a implantação de contratos (o [Ethers.js](https://docs.ethers.org/v6/) tem alguns métodos de implantação de contratos super limpos).

No diretório do seu projeto, digite:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

Também adicionaremos o plugin ao nosso hardhat.config.js no próximo passo.

## Passo 13: Atualize o hardhat.config.js {#update-hardhat-config}

Adicionamos várias dependências e plugins até agora, agora precisamos atualizar o hardhat.config.js para que nosso projeto saiba sobre todos eles.

Atualize seu hardhat.config.js para ficar assim:

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

## Passo 14: Compile nosso contrato {#compile-contract}

Para garantir que tudo esteja funcionando até agora, vamos compilar nosso contrato. A tarefa de compilação é uma das tarefas integradas do Hardhat.

Na linha de comando, execute:

```sh
npx hardhat compile
```

Na primeira vez que você compilar, o Hardhat fará o download do compilador Solidity. Você deve então ver algo como `Compiled 1 Solidity file with solc 0.8.34`. Se não, você sempre pode enviar uma mensagem no [Discord da Alchemy](https://discord.gg/gWuC7zB).

## Passo 15: Escreva nosso script de implantação {#write-deploy}

Agora que nosso contrato está escrito e nosso arquivo de configuração está pronto, é hora de escrever nosso script de implantação de contrato.

Navegue até a pasta `scripts/` e crie um novo arquivo chamado `deploy.js`, adicionando o seguinte conteúdo a ele:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const [deployer] = await ethers.getSigners()
const MyNFT = await ethers.getContractFactory("MyNFT")

// Inicia a implantação, retornando uma promise que resolve para um objeto de contrato
const myNFT = await MyNFT.deploy(deployer.address)
await myNFT.waitForDeployment()
console.log("Contract deployed to address:", await myNFT.getAddress())
```

Vamos analisar o que cada uma dessas linhas de código faz.

```js
const { ethers } = await network.create()
```

No Hardhat 3, um script abre uma conexão com uma rede explicitamente. `network.create()` conecta-se à rede que você escolhe com a opção `--network` ao executar o script, e o plugin `hardhat-ethers` adiciona um objeto `ethers` a essa conexão.

```js
const [deployer] = await ethers.getSigners()
```

`getSigners()` retorna as contas configuradas para a rede. Na Sepolia, essa é a conta cuja chave privada você colocou no `.env`. Passamos seu endereço para o construtor para que você se torne o proprietário do contrato.

```js
const MyNFT = await ethers.getContractFactory("MyNFT")
```

Uma ContractFactory no ethers.js é uma abstração usada para implantar novos contratos inteligentes, então MyNFT aqui é uma fábrica para instâncias do nosso contrato de NFT. Ao usar o plugin hardhat-ethers, as instâncias de ContractFactory e Contract são conectadas ao primeiro signatário por padrão.

```js
const myNFT = await MyNFT.deploy(deployer.address)
```

Chamar deploy() em uma ContractFactory iniciará a implantação e retornará uma Promise que é resolvida em um Contract. Este é o objeto que tem um método para cada uma das funções do nosso contrato inteligente. Os argumentos que você passa para deploy() vão para o construtor do contrato, aqui o endereço `initialOwner`.

`waitForDeployment()` aguarda até que a transação de implantação seja incluída em um bloco, e `getAddress()` retorna o endereço do novo contrato. Consulte a [documentação de contratos do ethers.js](https://docs.ethers.org/v6/api/contract/) para mais detalhes.

## Passo 16: Implante nosso contrato {#deploy-contract}

Finalmente estamos prontos para implantar nosso contrato inteligente! Navegue de volta para a raiz do diretório do seu projeto e, na linha de comando, execute:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

Você deve então ver algo como:

```text
Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
```

Se formos ao [Etherscan da Sepolia](https://sepolia.etherscan.io/) e pesquisarmos o endereço do nosso contrato, deveremos ser capazes de ver que ele foi implantado com sucesso. Se você não conseguir vê-lo imediatamente, aguarde um pouco, pois pode levar algum tempo. A transação será parecida com esta:

![Visualize o endereço da sua transação no Etherscan](./etherscan-sepoila-contract-creation.png)

O endereço "From" (De) deve corresponder ao endereço da sua conta da MetaMask e o endereço "To" (Para) dirá "Contract Creation" (Criação de Contrato). Se clicarmos na transação, veremos o endereço do nosso contrato no campo "To":

![Visualize o endereço do seu contrato no Etherscan](./etherscan-sepolia-tx-details.png)

Isso aí! Você acabou de implantar seu contrato inteligente de NFT na cadeia (rede de teste) Ethereum!

Para entender o que está acontecendo internamente, você pode observar as solicitações que seu aplicativo recebeu no seu [painel da Alchemy](https://dashboard.alchemy.com/).

Lá você verá um punhado de chamadas JSON-RPC que o Hardhat/Ethers fez internamente para nós quando chamamos a função .deploy(). Duas importantes a serem destacadas aqui são [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth-sendrawtransaction), que é a solicitação para realmente escrever nosso contrato inteligente na cadeia Sepolia, e [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash), que é uma solicitação para ler informações sobre nossa transação dado o hash (um padrão típico ao enviar transações). Para saber mais sobre o envio de transações, confira a [documentação de transações](/developers/docs/transactions/).

Isso é tudo para a Parte 1 deste tutorial. Na [Parte 2, nós realmente interagiremos com nosso contrato inteligente cunhando um NFT](/developers/tutorials/how-to-mint-an-nft/), e na [Parte 3 mostraremos como visualizar seu NFT na sua carteira Ethereum](/developers/tutorials/how-to-view-nft-in-metamask/)!
