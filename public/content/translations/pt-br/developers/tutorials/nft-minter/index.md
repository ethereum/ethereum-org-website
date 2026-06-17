---
title: Tutorial de Cunhador de NFT
description: Neste tutorial, você construirá um cunhador de NFT e aprenderá a criar um aplicativo descentralizado (dapp) full stack conectando seu contrato inteligente a um frontend React usando MetaMask e ferramentas Web3.
author: "smudgil"
tags: ["solidity", "NFT", "alchemy", "contratos inteligentes", "frontend", "Pinata", "erc-721"]
skill: intermediate
breadcrumb: Dapp cunhador de NFT
lang: pt-br
published: 2021-10-06
---

Um dos maiores desafios para desenvolvedores com experiência em Web2 é descobrir como conectar seu contrato inteligente a um projeto frontend e interagir com ele.

Ao construir um cunhador de NFT — uma interface de usuário (UI) simples onde você pode inserir um link para o seu ativo digital, um título e uma descrição — você aprenderá a:

- Conectar-se à MetaMask através do seu projeto frontend
- Chamar métodos de contrato inteligente a partir do seu frontend
- Assinar transações usando a MetaMask

Neste tutorial, usaremos o [React](https://react.dev/) como nosso framework frontend. Como este tutorial é focado principalmente no desenvolvimento Web3, não passaremos muito tempo detalhando os fundamentos do React. Em vez disso, focaremos em trazer funcionalidade ao nosso projeto.

Como pré-requisito, você deve ter um entendimento de nível iniciante sobre React — saber como funcionam componentes, props, useState/useEffect e chamadas básicas de função. Se você nunca ouviu falar de nenhum desses termos antes, pode ser interessante conferir este [tutorial de Introdução ao React](https://react.dev/learn/tutorial-tic-tac-toe). Para os que aprendem melhor visualmente, recomendamos fortemente esta excelente série de vídeos [Full Modern React Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) do Net Ninja.

E se você ainda não tem, definitivamente precisará de uma conta na Alchemy para concluir este tutorial, bem como para construir qualquer coisa na blockchain. Inscreva-se para uma conta gratuita [aqui](https://alchemy.com/).

Sem mais delongas, vamos começar!

## O básico sobre a criação de NFTs {#making-nfts-101}

Antes mesmo de começarmos a olhar para qualquer código, é importante entender como funciona a criação de um NFT. Isso envolve duas etapas:

### Implantar um contrato inteligente de NFT na blockchain Ethereum {#publish-nft}

A maior diferença entre os dois padrões de contrato inteligente de NFT é que o ERC-1155 é um padrão de múltiplos tokens e inclui funcionalidade em lote, enquanto o ERC-721 é um padrão de token único e, portanto, suporta apenas a transferência de um token por vez.

### Chamar a função de cunhagem {#minting-function}

Geralmente, essa função de cunhagem exige que você passe duas variáveis como parâmetros: primeiro o `recipient`, que especifica o endereço que receberá seu NFT recém-cunhado, e segundo o `tokenURI` do NFT, uma string que resolve para um documento JSON descrevendo os metadados do NFT.

Os metadados de um NFT são realmente o que lhe dão vida, permitindo que ele tenha propriedades, como nome, descrição, imagem (ou um ativo digital diferente) e outros atributos. Aqui está [um exemplo de um tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2), que contém os metadados de um NFT.

Neste tutorial, vamos focar na parte 2, chamando a função de cunhagem de um contrato inteligente de NFT existente usando nossa UI em React.

[Aqui está um link](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) para o contrato inteligente de NFT ERC-721 que chamaremos neste tutorial. Se você quiser aprender como o criamos, recomendamos fortemente que confira nosso outro tutorial, ["Como criar um NFT"](https://www.alchemy.com/docs/how-to-create-an-nft).

Legal, agora que entendemos como funciona a criação de um NFT, vamos clonar nossos arquivos iniciais!

## Clonar os arquivos iniciais {#clone-the-starter-files}

Primeiro, vá para o [repositório do GitHub nft-minter-tutorial](https://github.com/alchemyplatform/nft-minter-tutorial) para obter os arquivos iniciais deste projeto. Clone este repositório em seu ambiente local.

Ao abrir este repositório `nft-minter-tutorial` clonado, você notará que ele contém duas pastas: `minter-starter-files` e `nft-minter`.

- `minter-starter-files` contém os arquivos iniciais (essencialmente a UI em React) para este projeto. Neste tutorial, **trabalharemos neste diretório**, enquanto você aprende a dar vida a essa UI conectando-a à sua carteira Ethereum e a um contrato inteligente de NFT.
- `nft-minter` contém todo o tutorial concluído e está lá para você como uma **referência** **caso você fique travado.**

Em seguida, abra sua cópia de `minter-starter-files` no seu editor de código e navegue até a pasta `src`.

Todo o código que escreveremos ficará na pasta `src`. Editaremos o componente `Minter.js` e escreveremos arquivos JavaScript adicionais para dar funcionalidade Web3 ao nosso projeto.

## Passo 2: Verifique nossos arquivos iniciais {#step-2-check-out-our-starter-files}

Antes de começarmos a programar, é importante verificar o que já nos foi fornecido nos arquivos iniciais.

### Execute seu projeto React {#get-your-react-project-running}

Vamos começar executando o projeto React em nosso navegador. A beleza do React é que, uma vez que temos nosso projeto rodando no navegador, quaisquer alterações que salvarmos serão atualizadas ao vivo no navegador.

Para executar o projeto, navegue até o diretório raiz da pasta `minter-starter-files` e execute `npm install` no seu terminal para instalar as dependências do projeto:

```bash
cd minter-starter-files
npm install
```

Assim que a instalação terminar, execute `npm start` no seu terminal:

```bash
npm start
```

Fazer isso deve abrir http://localhost:3000/ no seu navegador, onde você verá o frontend do nosso projeto. Ele deve consistir em 3 campos: um lugar para inserir um link para o ativo do seu NFT, inserir o nome do seu NFT e fornecer uma descrição.

Se você tentar clicar nos botões "Connect Wallet" (Conectar Carteira) ou "Mint NFT" (Cunhar NFT), notará que eles não funcionam — isso porque ainda precisamos programar a funcionalidade deles! :\)

### O componente Minter.js {#minter-js}

**NOTA:** Certifique-se de estar na pasta `minter-starter-files` e não na pasta `nft-minter`!

Vamos voltar para a pasta `src` no nosso editor e abrir o arquivo `Minter.js`. É super importante que entendamos tudo neste arquivo, pois é o principal componente React no qual trabalharemos.

No topo deste arquivo, temos nossas variáveis de estado que atualizaremos após eventos específicos.

```javascript
//Variáveis de estado
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

Nunca ouviu falar de variáveis de estado ou hooks de estado do React? Confira [esta](https://legacy.reactjs.org/docs/hooks-state.html) documentação.

Aqui está o que cada uma das variáveis representa:

- `walletAddress` - uma string que armazena o endereço da carteira do usuário
- `status` - uma string que contém uma mensagem para exibir na parte inferior da UI
- `name` - uma string que armazena o nome do NFT
- `description` - uma string que armazena a descrição do NFT
- `url` - uma string que é um link para o ativo digital do NFT

Após as variáveis de estado, você verá três funções não implementadas: `useEffect`, `connectWalletPressed` e `onMintPressed`. Você notará que todas essas funções são `async`, isso porque faremos chamadas de API assíncronas nelas! Seus nomes são epônimos com suas funcionalidades:

```javascript
useEffect(async () => {
  //TODO: implementararar
}, [])

const connectWalletPressed = async () => {
  //TODO: implement
}

const onMintPressed = async () => {
  //TODO: implement
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - este é um hook do React que é chamado após a renderização do seu componente. Como ele tem uma prop de array vazio `[]` passada para ele (veja a linha 3), ele só será chamado na _primeira_ renderização do componente. Aqui chamaremos nosso ouvinte de carteira e outra função de carteira para atualizar nossa UI para refletir se uma carteira já está conectada.
- `connectWalletPressed` - esta função será chamada para conectar a carteira MetaMask do usuário ao nosso aplicativo descentralizado (dapp).
- `onMintPressed` - esta função será chamada para cunhar o NFT do usuário.

Perto do final deste arquivo, temos a UI do nosso componente. Se você analisar este código com cuidado, notará que atualizamos nossas variáveis de estado `url`, `name` e `description` quando a entrada em seus campos de texto correspondentes muda.

Você também verá que `connectWalletPressed` e `onMintPressed` são chamadas quando os botões com IDs `mintButton` e `walletButton` são clicados, respectivamente.

```javascript
//a UI do nosso componente
return (
  <div className="Minter">
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

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
    <p>
      Simply add your asset's link, name, and description, then press "Mint."
    </p>
    <form>
      <h2>🖼 Link to asset: </h2>
      <input
        type="text"
        placeholder="e.g., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Name: </h2>
      <input
        type="text"
        placeholder="e.g., My first NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Description: </h2>
      <input
        type="text"
        placeholder="e.g., Even cooler than cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Mint NFT
    </button>
    <p id="status">{status}</p>
  </div>
)
```

Finalmente, vamos abordar onde este componente Minter é adicionado.

Se você for ao arquivo `App.js`, que é o componente principal no React que atua como um contêiner para todos os outros componentes, verá que nosso componente Minter é injetado na linha 7.

**Neste tutorial, editaremos apenas o `Minter.js file` e adicionaremos arquivos na nossa pasta `src`.**

Agora que entendemos com o que estamos trabalhando, vamos configurar nossa carteira Ethereum!

## Configure sua carteira Ethereum {#set-up-your-ethereum-wallet}

Para que os usuários possam interagir com seu contrato inteligente, eles precisarão conectar sua carteira Ethereum ao seu dapp.

### Baixe a MetaMask {#download-metamask}

Para este tutorial, usaremos a MetaMask, uma carteira virtual no navegador usada para gerenciar o endereço da sua conta Ethereum. Se você quiser entender mais sobre como as transações na Ethereum funcionam, confira [esta página](/developers/docs/transactions/).

Você pode baixar e criar uma conta na MetaMask gratuitamente [aqui](https://metamask.io/download). Ao criar uma conta, ou se você já tiver uma, certifique-se de mudar para a "Ropsten Test Network" (Rede de Teste Ropsten) no canto superior direito \(para não lidarmos com dinheiro real\).

### Adicione ether de um Faucet {#add-ether-from-faucet}

Para cunhar nossos NFTs (ou assinar quaisquer transações na blockchain Ethereum), precisaremos de algum ETH falso. Para obter ETH, você pode ir ao [faucet da Ropsten](https://faucet.ropsten.be/) e inserir o endereço da sua conta Ropsten, depois clicar em "Send Ropsten Eth". Você deve ver o ETH na sua conta MetaMask logo em seguida!

### Verifique seu saldo {#check-your-balance}

Para verificar se o nosso saldo está lá, vamos fazer uma solicitação [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) usando a [ferramenta composer da Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Isso retornará a quantidade de ETH em nossa carteira. Depois de inserir o endereço da sua conta MetaMask e clicar em "Send Request" (Enviar Solicitação), você deve ver uma resposta como esta:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**NOTA:** Este resultado está em Wei, não em ETH. Wei é usado como a menor denominação de ether. A conversão de Wei para ETH é: 1 ETH = 10¹⁸ Wei. Portanto, se convertermos 0xde0b6b3a7640000 para decimal, obtemos 1\*10¹⁸, o que equivale a 1 ETH.

Ufa! Nosso dinheiro falso está todo lá! <Emoji text=":money_mouth_face:" size={1} />

## Conecte a MetaMask à sua UI {#connect-metamask-to-your-ui}

Agora que nossa carteira MetaMask está configurada, vamos conectar nosso dapp a ela!

Como queremos seguir o paradigma [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), vamos criar um arquivo separado que contém nossas funções para gerenciar a lógica, os dados e as regras do nosso dapp, e então passar essas funções para o nosso frontend (nosso componente Minter.js).

### A função `connectWallet` {#connect-wallet-function}

Para fazer isso, vamos criar uma nova pasta chamada `utils` no seu diretório `src` e adicionar um arquivo chamado `interact.js` dentro dela, que conterá todas as nossas funções de interação com a carteira e o contrato inteligente.

No nosso arquivo `interact.js`, escreveremos uma função `connectWallet`, que então importaremos e chamaremos no nosso componente `Minter.js`.

No seu arquivo `interact.js`, adicione o seguinte:

```javascript
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

Vamos detalhar o que este código faz:

Primeiro, nossa função verifica se o `window.ethereum` está ativado no seu navegador.

O `window.ethereum` é uma API global injetada pela MetaMask e outros provedores de carteira que permite que sites solicitem as contas Ethereum dos usuários. Se aprovado, ele pode ler dados das blockchains às quais o usuário está conectado e sugerir que o usuário assine mensagens e transações. Confira a [documentação da MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) para mais informações!

Se o `window.ethereum` _não estiver_ presente, isso significa que a MetaMask não está instalada. Isso resulta no retorno de um objeto JSON, onde o `address` retornado é uma string vazia, e o objeto JSX `status` informa que o usuário deve instalar a MetaMask.

**A maioria das funções que escreveremos retornará objetos JSON que podemos usar para atualizar nossas variáveis de estado e a UI.**

Agora, se o `window.ethereum` _estiver_ presente, é aí que as coisas ficam interessantes.

Usando um bloco try/catch, tentaremos nos conectar à MetaMask chamando [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Chamar esta função abrirá a MetaMask no navegador, onde o usuário será solicitado a conectar sua carteira ao seu dapp.

- Se o usuário optar por se conectar, `method: "eth_requestAccounts"` retornará um array que contém todos os endereços de conta do usuário que estão conectados ao dapp. No geral, nossa função `connectWallet` retornará um objeto JSON que contém o _primeiro_ `address` neste array \(veja a linha 9\) e uma `status` (mensagem) que solicita ao usuário que escreva uma mensagem para o contrato inteligente.
- Se o usuário rejeitar a conexão, o objeto JSON conterá uma string vazia para o `address` retornado e uma `status` (mensagem) que reflete que o usuário rejeitou a conexão.

### Adicione a função connectWallet ao seu componente de UI Minter.js {#add-connect-wallet}

Agora que escrevemos esta função `connectWallet`, vamos conectá-la ao nosso componente `Minter.js.`.

Primeiro, teremos que importar nossa função para o nosso arquivo `Minter.js` adicionando `import { connectWallet } from "./utils/interact.js";` no topo do arquivo `Minter.js`. Suas primeiras 11 linhas de `Minter.js` agora devem ficar assim:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //Variáveis de estado
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

Então, dentro da nossa função `connectWalletPressed`, chamaremos nossa função `connectWallet` importada, assim:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Notou como a maior parte da nossa funcionalidade é abstraída do nosso componente `Minter.js` a partir do arquivo `interact.js`? Isso é para estarmos em conformidade com o paradigma M-V-C!

Em `connectWalletPressed`, simplesmente fazemos uma chamada await para nossa função `connectWallet` importada e, usando sua resposta, atualizamos nossas variáveis `status` e `walletAddress` por meio de seus hooks de estado.

Agora, vamos salvar ambos os arquivos `Minter.js` e `interact.js` e testar nossa UI até agora.

Abra seu navegador em localhost:3000 e pressione o botão "Connect Wallet" (Conectar Carteira) no canto superior direito da página.

Se você tiver a MetaMask instalada, será solicitado a conectar sua carteira ao seu dapp. Aceite o convite para se conectar.

Você deve ver que o botão da carteira agora reflete que seu endereço está conectado.

Em seguida, tente atualizar a página... isso é estranho. Nosso botão de carteira está nos solicitando a conectar a MetaMask, mesmo que ela já esteja conectada...

Mas não se preocupe! Podemos consertar isso facilmente implementando uma função chamada `getCurrentWalletConnected`, que verificará se um endereço já está conectado ao nosso dapp e atualizará nossa UI de acordo!

### A função getCurrentWalletConnected {#get-current-wallet}

No seu arquivo `interact.js`, adicione a seguinte função `getCurrentWalletConnected`:

```javascript
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

Este código é _muito_ semelhante à função `connectWallet` que acabamos de escrever anteriormente.

A principal diferença é que, em vez de chamar o método `eth_requestAccounts`, que abre a MetaMask para o usuário conectar sua carteira, aqui chamamos o método `eth_accounts`, que simplesmente retorna um array contendo os endereços da MetaMask atualmente conectados ao nosso dapp.

Para ver esta função em ação, vamos chamá-la na função `useEffect` do nosso componente `Minter.js`.

Como fizemos para `connectWallet`, devemos importar esta função do nosso arquivo `interact.js` para o nosso arquivo `Minter.js` assim:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //importar aqui
} from "./utils/interact.js"
```

Agora, simplesmente a chamamos na nossa função `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Observe que usamos a resposta da nossa chamada para `getCurrentWalletConnected` para atualizar nossas variáveis de estado `walletAddress` e `status`.

Depois de adicionar este código, tente atualizar a janela do nosso navegador. O botão deve dizer que você está conectado e mostrar uma prévia do endereço da sua carteira conectada - mesmo após a atualização!

### Implemente addWalletListener {#implement-add-wallet-listener}

O passo final na configuração da carteira do nosso dapp é implementar o ouvinte de carteira para que nossa UI seja atualizada quando o estado da nossa carteira mudar, como quando o usuário se desconecta ou troca de conta.

No seu arquivo `Minter.js`, adicione uma função `addWalletListener` que se pareça com o seguinte:

```javascript
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

Vamos detalhar rapidamente o que está acontecendo aqui:

- Primeiro, nossa função verifica se o `window.ethereum` está ativado \(ou seja, a MetaMask está instalada\).
  - Se não estiver, simplesmente definimos nossa variável de estado `status` para uma string JSX que solicita ao usuário que instale a MetaMask.
  - Se estiver ativado, configuramos o ouvinte `window.ethereum.on("accountsChanged")` na linha 3 que escuta as mudanças de estado na carteira MetaMask, o que inclui quando o usuário conecta uma conta adicional ao dapp, troca de conta ou desconecta uma conta. Se houver pelo menos uma conta conectada, a variável de estado `walletAddress` é atualizada como a primeira conta no array `accounts` retornado pelo ouvinte. Caso contrário, `walletAddress` é definida como uma string vazia.

Finalmente, devemos chamá-la na nossa função `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

E voilà! Concluímos a programação de toda a funcionalidade da nossa carteira! Agora que nossa carteira está configurada, vamos descobrir como cunhar nosso NFT!

## O básico sobre metadados de NFT {#nft-metadata-101}

Então, lembra dos metadados de NFT sobre os quais acabamos de falar no Passo 0 deste tutorial — eles dão vida a um NFT, permitindo que ele tenha propriedades, como um ativo digital, nome, descrição e outros atributos.

Precisaremos configurar esses metadados como um objeto JSON e armazená-los, para que possamos passá-los como o parâmetro `tokenURI` ao chamar a função `mintNFT` do nosso contrato inteligente.

O texto nos campos "Link to Asset" (Link para o Ativo), "Name" (Nome) e "Description" (Descrição) compreenderá as diferentes propriedades dos metadados do nosso NFT. Formataremos esses metadados como um objeto JSON, mas há algumas opções de onde podemos armazenar esse objeto JSON:

- Poderíamos armazená-lo na blockchain Ethereum; no entanto, fazer isso seria muito caro.
- Poderíamos armazená-lo em um servidor centralizado, como AWS ou Firebase. Mas isso iria contra o nosso ethos de descentralização.
- Poderíamos usar o IPFS, um protocolo descentralizado e rede ponto a ponto para armazenar e compartilhar dados em um sistema de arquivos distribuído. Como este protocolo é descentralizado e gratuito, é a nossa melhor opção!

Para armazenar nossos metadados no IPFS, usaremos o [Pinata](https://pinata.cloud/), uma API e kit de ferramentas IPFS conveniente. No próximo passo, explicaremos exatamente como fazer isso!

## Use o Pinata para fixar seus metadados no IPFS {#use-pinata-to-pin-your-metadata-to-ipfs}

Se você não tem uma conta no [Pinata](https://pinata.cloud/), inscreva-se para uma conta gratuita [aqui](https://app.pinata.cloud/auth/signup) e conclua as etapas para verificar seu e-mail e conta.

### Crie sua chave de API do Pinata {#create-pinata-api-key}

Navegue até a página [https://pinata.cloud/keys](https://pinata.cloud/keys), selecione o botão "New Key" (Nova Chave) na parte superior, defina o widget Admin como ativado e dê um nome à sua chave.

Você verá um pop-up com as informações da sua API. Certifique-se de guardar isso em um lugar seguro.

Agora que nossa chave está configurada, vamos adicioná-la ao nosso projeto para que possamos usá-la.

### Crie um arquivo .env {#create-a-env}

Podemos armazenar com segurança nossa chave e segredo do Pinata em um arquivo de ambiente. Vamos instalar o [pacote dotenv](https://www.npmjs.com/package/dotenv) no diretório do seu projeto.

Abra uma nova aba no seu terminal \(separada daquela que está executando o localhost\) e certifique-se de estar na pasta `minter-starter-files`, depois execute o seguinte comando no seu terminal:

```text
npm install dotenv --save
```

Em seguida, crie um arquivo `.env` no diretório raiz do seu `minter-starter-files` inserindo o seguinte na sua linha de comando:

```javascript
vim.env
```

Isso abrirá seu arquivo `.env` no vim \(um editor de texto\). Para salvá-lo, pressione "esc" + ":" + "q" no seu teclado, nessa ordem.

Em seguida, no VSCode, navegue até o seu arquivo `.env` e adicione sua chave de API e segredo de API do Pinata a ele, assim:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

Salve o arquivo e então você estará pronto para começar a escrever a função para fazer o upload dos seus metadados JSON para o IPFS!

### Implemente pinJSONToIPFS {#pin-json-to-ipfs}

Felizmente para nós, o Pinata tem uma [API especificamente para fazer upload de dados JSON para o IPFS](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) e um exemplo conveniente em JavaScript com axios que podemos usar, com algumas pequenas modificações.

Na sua pasta `utils`, vamos criar outro arquivo chamado `pinata.js` e então importar nosso segredo e chave do Pinata do arquivo .env assim:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

Em seguida, cole o código adicional abaixo no seu arquivo `pinata.js`. Não se preocupe, vamos detalhar o que tudo significa!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //fazendo requisição POST do axios para o Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}
```

Então, o que este código faz exatamente?

Primeiro, ele importa o [axios](https://www.npmjs.com/package/axios), um cliente HTTP baseado em promises para o navegador e Node.js, que usaremos para fazer uma solicitação ao Pinata.

Em seguida, temos nossa função assíncrona `pinJSONToIPFS`, que recebe um `JSONBody` como entrada e a chave e o segredo da API do Pinata em seu cabeçalho, tudo para fazer uma solicitação POST para a API `pinJSONToIPFS` deles.

- Se esta solicitação POST for bem-sucedida, nossa função retornará um objeto JSON com o booleano `success` como verdadeiro e o `pinataUrl` onde nossos metadados foram fixados. Usaremos este `pinataUrl` retornado como a entrada `tokenURI` para a função de cunhagem do nosso contrato inteligente.
- Se esta solicitação POST falhar, nossa função retornará um objeto JSON com o booleano `success` como falso e uma string `message` que transmite nosso erro.

Assim como com os tipos de retorno da nossa função `connectWallet`, estamos retornando objetos JSON para que possamos usar seus parâmetros para atualizar nossas variáveis de estado e a UI.

## Carregue seu contrato inteligente {#load-your-smart-contract}

Agora que temos uma maneira de fazer o upload dos metadados do nosso NFT para o IPFS por meio da nossa função `pinJSONToIPFS`, precisaremos de uma maneira de carregar uma instância do nosso contrato inteligente para que possamos chamar sua função `mintNFT`.

Como mencionamos anteriormente, neste tutorial usaremos [este contrato inteligente de NFT existente](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE); no entanto, se você quiser aprender como o criamos, ou criar um você mesmo, recomendamos fortemente que confira nosso outro tutorial, ["Como criar um NFT"](https://www.alchemy.com/docs/how-to-create-an-nft).

### A ABI do contrato {#contract-abi}

Se você examinou nossos arquivos de perto, deve ter notado que no nosso diretório `src`, há um arquivo `contract-abi.json`. Uma ABI é necessária para especificar qual função um contrato invocará, bem como para garantir que a função retornará dados no formato que você espera.

Também precisaremos de uma chave de API da Alchemy e da API Alchemy Web3 para nos conectarmos à blockchain Ethereum e carregarmos nosso contrato inteligente.

### Crie sua chave de API da Alchemy {#create-alchemy-api}

Se você ainda não tem uma conta na Alchemy, [inscreva-se gratuitamente aqui.](https://alchemy.com/?a=eth-org-nft-minter)

Depois de criar uma conta na Alchemy, você pode gerar uma chave de API criando um aplicativo. Isso nos permitirá fazer solicitações à rede de teste Ropsten.

Navegue até a página "Create App" (Criar Aplicativo) no seu Painel da Alchemy passando o mouse sobre "Apps" na barra de navegação e clicando em "Create App".

Dê um nome ao seu aplicativo (nós escolhemos "My First NFT!"), ofereça uma breve descrição, selecione "Staging" para o Ambiente usado para a contabilidade do seu aplicativo e escolha "Ropsten" para a sua rede.

Clique em "Create app" e pronto! Seu aplicativo deve aparecer na tabela abaixo.

Incrível, então agora que criamos nossa URL da API HTTP da Alchemy, copie-a para a sua área de transferência...

…e então vamos adicioná-la ao nosso arquivo `.env`. No geral, seu arquivo .env deve ficar assim:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

Agora que temos a ABI do nosso contrato e nossa chave de API da Alchemy, estamos prontos para carregar nosso contrato inteligente usando a [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).

### Configure seu endpoint e contrato da Alchemy Web3 {#setup-alchemy-endpoint}

Primeiro, se você ainda não a tem, precisará instalar a [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) navegando até o diretório inicial: `nft-minter-tutorial` no terminal:

```text
cd ..
npm install @alch/alchemy-web3
```

Em seguida, vamos voltar ao nosso arquivo `interact.js`. No topo do arquivo, adicione o seguinte código para importar sua chave da Alchemy do seu arquivo .env e configurar seu endpoint da Alchemy Web3:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

A [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) é um wrapper em torno da [Web3.js](https://docs.web3js.org/), fornecendo métodos de API aprimorados e outros benefícios cruciais para facilitar sua vida como desenvolvedor Web3. Ela foi projetada para exigir configuração mínima para que você possa começar a usá-la no seu aplicativo imediatamente!

Em seguida, vamos adicionar a ABI do nosso contrato e o endereço do contrato ao nosso arquivo.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Assim que tivermos ambos, estaremos prontos para começar a programar nossa função de cunhagem!

## Implemente a função mintNFT {#implement-the-mintnft-function}

Dentro do seu arquivo `interact.js`, vamos definir nossa função, `mintNFT`, que epônimamente cunhará nosso NFT.

Como faremos inúmeras chamadas assíncronas \(para o Pinata para fixar nossos metadados no IPFS, para a Alchemy Web3 para carregar nosso contrato inteligente e para a MetaMask para assinar nossas transações\), nossa função também será assíncrona.

As três entradas para nossa função serão o `url` do nosso ativo digital, `name` e `description`. Adicione a seguinte assinatura de função abaixo da função `connectWallet`:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Tratamento de erros de entrada {#input-error-handling}

Naturalmente, faz sentido ter algum tipo de tratamento de erros de entrada no início da função, para sairmos desta função se nossos parâmetros de entrada não estiverem corretos. Dentro da nossa função, vamos adicionar o seguinte código:

```javascript
export const mintNFT = async (url, name, description) => {
  //tratamento de erros
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

Essencialmente, se algum dos parâmetros de entrada for uma string vazia, retornamos um objeto JSON onde o booleano `success` é falso, e a string `status` transmite que todos os campos na nossa UI devem estar completos.

### Faça o upload dos metadados para o IPFS {#upload-metadata-to-ipfs}

Assim que soubermos que nossos metadados estão formatados corretamente, o próximo passo é envolvê-los em um objeto JSON e fazer o upload para o IPFS por meio da função `pinJSONToIPFS` que escrevemos!

Para fazer isso, primeiro precisamos importar a função `pinJSONToIPFS` para o nosso arquivo `interact.js`. Bem no topo do `interact.js`, vamos adicionar:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

Lembre-se de que `pinJSONToIPFS` recebe um corpo JSON. Portanto, antes de fazermos uma chamada para ela, precisaremos formatar nossos parâmetros `url`, `name` e `description` em um objeto JSON.

Vamos atualizar nosso código para criar um objeto JSON chamado `metadata` e então fazer uma chamada para `pinJSONToIPFS` com este parâmetro `metadata`:

```javascript
export const mintNFT = async (url, name, description) => {
  //tratamento de erros
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //criar metadados
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //fazer chamada ao Pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

Observe que armazenamos a resposta da nossa chamada para `pinJSONToIPFS(metadata)` no objeto `pinataResponse`. Em seguida, analisamos este objeto em busca de quaisquer erros.

Se houver um erro, retornamos um objeto JSON onde o booleano `success` é falso e nossa string `status` transmite que nossa chamada falhou. Caso contrário, extraímos o `pinataURL` do `pinataResponse` e o armazenamos como nossa variável `tokenURI`.

Agora é hora de carregar nosso contrato inteligente usando a API Alchemy Web3 que inicializamos no topo do nosso arquivo. Adicione a seguinte linha de código na parte inferior da função `mintNFT` para definir o contrato na variável global `window.contract`:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

A última coisa a adicionar na nossa função `mintNFT` é a nossa transação Ethereum:

```javascript
//configurar sua transação na Ethereum
const transactionParameters = {
  to: contractAddress, // Obrigatório, exceto durante publicações de contrato.
  from: window.ethereum.selectedAddress, // deve corresponder ao endereço ativo do usuário.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //fazer chamada ao contrato inteligente de NFT
}

//assinar a transação via MetaMask
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Something went wrong: " + error.message,
  }
}
```

Se você já está familiarizado com as transações da Ethereum, notará que a estrutura é bem semelhante ao que você já viu.

- Primeiro, configuramos os parâmetros das nossas transações.
  - `to` especifica o endereço do destinatário \(nosso contrato inteligente\)
  - `from` especifica o signatário da transação \(o endereço do usuário conectado à MetaMask: `window.ethereum.selectedAddress`\)
  - `data` contém a chamada para o método `mintNFT` do nosso contrato inteligente, que recebe nosso `tokenURI` e o endereço da carteira do usuário, `window.ethereum.selectedAddress`, como entradas
- Em seguida, fazemos uma chamada await, `window.ethereum.request,` onde pedimos à MetaMask para assinar a transação. Observe que, nesta solicitação, estamos especificando nosso método eth \(eth_SentTransaction\) e passando nosso `transactionParameters`. Neste ponto, a MetaMask será aberta no navegador e solicitará ao usuário que assine ou rejeite a transação.
  - Se a transação for bem-sucedida, a função retornará um objeto JSON onde o booleano `success` é definido como verdadeiro e a string `status` solicita ao usuário que verifique o Etherscan para obter mais informações sobre sua transação.
  - Se a transação falhar, a função retornará um objeto JSON onde o booleano `success` é definido como falso e a string `status` transmite a mensagem de erro.

No geral, nossa função `mintNFT` deve ficar assim:

```javascript
export const mintNFT = async (url, name, description) => {
  //tratamento de erros
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //criar metadados
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //requisição de pin do Pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //carregar contrato inteligente
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //configurar sua transação na Ethereum
  const transactionParameters = {
    to: contractAddress, // Obrigatório, exceto durante publicações de contrato.
    from: window.ethereum.selectedAddress, // deve corresponder ao endereço ativo do usuário.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //fazer chamada ao contrato inteligente de NFT
  }

  //assinar transação via MetaMask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}
```

Essa é uma função gigante! Agora, só precisamos conectar nossa função `mintNFT` ao nosso componente `Minter.js`...

## Conecte mintNFT ao nosso frontend Minter.js {#connect-our-frontend}

Abra seu arquivo `Minter.js` e atualize a linha `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` no topo para ser:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Finalmente, implemente a função `onMintPressed` para fazer uma chamada await para sua função `mintNFT` importada e atualize a variável de estado `status` para refletir se nossa transação foi bem-sucedida ou falhou:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## Implante seu NFT em um site ativo {#deploy-your-nft}

Pronto para colocar seu projeto no ar para os usuários interagirem? Confira [este tutorial](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) para implantar seu Minter em um site ativo.

Um último passo...

## Conquiste o mundo da blockchain {#take-the-blockchain-world-by-storm}

Brincadeira, você chegou ao fim do tutorial!

Para recapitular, ao construir um cunhador de NFT, você aprendeu com sucesso a:

- Conectar-se à MetaMask através do seu projeto frontend
- Chamar métodos de contrato inteligente a partir do seu frontend
- Assinar transações usando a MetaMask

Presumivelmente, você gostaria de poder exibir os NFTs cunhados por meio do seu dapp na sua carteira — então não deixe de conferir nosso tutorial rápido [Como visualizar seu NFT na sua carteira](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet)!

E, como sempre, se você tiver alguma dúvida, estamos aqui para ajudar no [Discord da Alchemy](https://discord.gg/gWuC7zB). Mal podemos esperar para ver como você aplicará os conceitos deste tutorial aos seus projetos futuros!