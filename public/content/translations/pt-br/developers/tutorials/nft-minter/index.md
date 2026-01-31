---
title: "Tutorial de criação de uma NFT"
description: "Neste tutorial, você irá construir um minter NFT e, também, aprender a como criar um full stack dapp conectando seu contrato inteligente a um React frontend usando MetaMask e ferramentas Web3."
author: "smudgil"
tags:
  [
    "solidez",
    "NFT",
    "alchemy",
    "smart contracts",
    "front-end",
    "Pinata"
  ]
skill: intermediate
lang: pt-br
published: 2021-10-06
---

Um dos maiores desafios para desenvolvedores vindos de um background Web2 é descobrir como conectar seu contrato inteligente a um projeto frontend e interagir com ele.

Ao criar um minter NFT — uma simples UI onde você pode inserir um link para seu ativo digital, um título e uma descrição — você aprenderá a:

- Conectar ao MetaMask através do seu projeto frontend
- Chamar métodos de contrato inteligentes no seu frontend
- Assine transações usando MetaMask

Neste tutorial, usaremos o [React](https://react.dev/) como nossa estrutura de frontend. Como este tutorial está focado principalmente no desenvolvimento da Web3, nós não passaremos muito tempo detalhando os fundamentos do React. Em vez disso, nós focaremos em trazer funcionalidade para o nosso projeto.

Como pré-requisito, você deve ter uma compreensão mínima do React – saber como funcionam componentes, props, useState/useEffect e chamadas de funções básicas. Se você nunca ouviu falar de nenhum desses termos antes, talvez queira conferir este [tutorial de Introdução ao React](https://react.dev/learn/tutorial-tic-tac-toe). Para os alunos mais visuais, recomendamos fortemente esta excelente série de vídeos [Full Modern React Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) do Net Ninja.

E se você ainda não fez, você definitivamente precisará criar uma conta Alchemy para concluir este tutorial, bem como construir qualquer coisa no blockchain. Cadastre-se para uma conta gratuita [aqui](https://alchemy.com/).

Sem mais delongas, vamos começar!

## Criando NFTs 101 {#making-nfts-101}

Antes de começarmos a olhar para qualquer código, é importante entender como funciona fazer uma NFT. Envolve duas etapas:

### Publique um contrato inteligente de NFT na blockchain da Ethereum {#publish-nft}

A maior diferença entre os dois padrões de contrato inteligente NFT é que o ERC-1155 é um padrão multi-token e inclui a funcionalidade de lote, enquanto o ERC-721 é um padrão de token único, portanto, suporta apenas a transferência de um token por vez.

### Chame a função de mintagem {#minting-function}

Normalmente, esta função de mintagem exige que você passe duas variáveis como parâmetros: primeiro o `recipient`, que especifica o endereço que receberá seu NFT recém-mintado, e segundo o `tokenURI` do NFT, uma string que resolve para um documento JSON descrevendo os metadados do NFT.

Os metadados de uma NFT são o que realmente a torna realidade, permitindo que tenha propriedades configuráveis, como um nome, descrição, imagem (ou diferentes ativos digitais), e outros atributos. Aqui está [um exemplo de um tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2), que contém os metadados de um NFT.

Neste tutorial, vamos nos concentrar na parte 2, chamando a função mint de contrato inteligente de uma NFT existente usando nossa interface do React.

[Aqui está um link](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) para o contrato inteligente de NFT ERC-721 que chamaremos neste tutorial. Se você quiser saber como o fizemos, recomendamos que confira nosso outro tutorial, ["Como Criar um NFT"](https://www.alchemy.com/docs/how-to-create-an-nft).

Legal, agora que entendemos como fazer uma NFT funcionar, vamos clonar nossos arquivos iniciais!

## Clone os arquivos iniciais {#clone-the-starter-files}

Primeiro, acesse o [repositório do GitHub nft-minter-tutorial](https://github.com/alchemyplatform/nft-minter-tutorial) para obter os arquivos iniciais deste projeto. Clone este repositório para o seu ambiente local.

Ao abrir este repositório `nft-minter-tutorial` clonado, você notará que ele contém duas pastas: `minter-starter-files` e `nft-minter`.

- `minter-starter-files` contém os arquivos iniciais (essencialmente a UI do React) para este projeto. Neste tutorial, **estaremos trabalhando neste diretório**, à medida que você aprende como dar vida a esta UI, conectando-a à sua carteira Ethereum e a um contrato inteligente de NFT.
- `nft-minter` contém o tutorial completo e está lá para você como uma **referência** **caso você trave.**

Em seguida, abra sua cópia de `minter-starter-files` em seu editor de código e navegue até a pasta `src`.

Todo o código que escrevermos ficará na pasta `src`. Estaremos editando o componente `Minter.js` e escrevendo arquivos javascript adicionais para dar ao nosso projeto a funcionalidade Web3.

## Passo 2: Confira nossos arquivos iniciais {#step-2-check-out-our-starter-files}

Antes de começarmos a codificar, é importante verificar o que já está fornecido para nós nos arquivos iniciais.

### Coloque seu projeto react para funcionar {#get-your-react-project-running}

Vamos começar executando o projeto React em nosso navegador. A beleza do React é que uma vez que nosso projeto esteja sendo executado no nosso navegador, qualquer alteração que salvarmos será atualizada ao vivo em nosso navegador.

Para colocar o projeto para funcionar, navegue até o diretório raiz da pasta `minter-starter-files` e execute `npm install` em seu terminal para instalar as dependências do projeto:

```bash
cd minter-starter-files
npm install
```

Assim que a instalação for concluída, execute `npm start` em seu terminal:

```bash
npm start
```

Feito isso, você deve abrir http://localhost:3000/ no seu navegador, onde você verá o frontend do nosso projeto. Ele deve consistir de 3 campos: um local para inserir um link para o ativo do seu NFT, digite o nome da sua NFT e forneça uma descrição.

Se você tentar clicar nos botões "Connectar Wallet" ou "Mint NFT", você notará que eles não funcionam — isso porque ainda precisamos programar a funcionalidade deles! :\)

### O componente Minter.js {#minter-js}

**OBSERVAÇÃO:** Certifique-se de que você está na pasta `minter-starter-files` e não na pasta `nft-minter`!

Vamos voltar para a pasta `src` em nosso editor e abrir o arquivo `Minter.js`. É muito importante que entendamos tudo neste arquivo, pois é o principal componente do React no qual vamos trabalhar.

No topo do nosso arquivo, temos nossas variáveis de estado que serão atualizadas após eventos específicos.

```javascript
//Variáveis de estado
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

Nunca ouviu falar de variáveis de estado do React ou State Hooks? Confira [esta](https://legacy.reactjs.org/docs/hooks-state.html) documentação.

Veja aqui o que cada uma das variáveis representa:

- `walletAddress` - uma string que armazena o endereço da carteira do usuário
- `status` - uma string que contém uma mensagem para exibir na parte inferior da UI
- `name` - uma string que armazena o nome do NFT
- `description` - uma string que armazena a descrição do NFT
- `url` - uma string que é um link para o ativo digital do NFT

Após as variáveis de estado, você verá três funções não implementadas: `useEffect`, `connectWalletPressed` e `onMintPressed`. Você notará que todas essas funções são `async`, porque faremos chamadas de API assíncronas nelas! Os nomes delas são relacionadas com sua funcionalidade:

```javascript
useEffect(async () => {
  //TODO: implementar
}, [])

const connectWalletPressed = async () => {
  //TODO: implementar
}

const onMintPressed = async () => {
  //TODO: implementar
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - este é um hook do React que é chamado depois que seu componente é renderizado. Como ele tem uma `prop` de array vazio `[]` passada para ele (veja a linha 3), ele só será chamado na _primeira_ renderização do componente. Aqui vamos chamar nosso ouvinte de carteira e outra função de carteira para atualizar nossa interface de usuário para refletir se uma carteira já está conectada.
- `connectWalletPressed` - esta função será chamada para conectar a carteira MetaMask do usuário ao nosso dapp.
- `onMintPressed` - esta função será chamada para mintar o NFT do usuário.

Perto do final desse arquivo, temos a interface de usuário do nosso componente. Se você analisar este código com atenção, notará que atualizamos nossas variáveis de estado `url`, `name` e `description` quando a entrada em seus campos de texto correspondentes muda.

Você também verá que `connectWalletPressed` e `onMintPressed` são chamadas quando os botões com os IDs `mintButton` e `walletButton` são clicados, respectivamente.

```javascript
//a UI do nosso componente
return (
  <div className="Minter">
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

    <br></br>
    <h1 id="title">🧙‍♂️ Mintador de NFT da Alchemy</h1>
    <p>
      Basta adicionar o link, nome e descrição do seu ativo e, em seguida, pressione "Mintar".
    </p>
    <form>
      <h2>🖼 Link para o ativo: </h2>
      <input
        type="text"
        placeholder="ex: https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Nome: </h2>
      <input
        type="text"
        placeholder="ex: Meu primeiro NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Descrição: </h2>
      <input
        type="text"
        placeholder="ex: Ainda mais legal que os cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Mintar NFT
    </button>
    <p id="status">{status}</p>
</div>
)
```

Finalmente, vamos endereçar onde esse componente Minter será adicionado.

Se você for ao arquivo `App.js`, que é o componente principal no React que atua como um contêiner para todos os outros componentes, você verá que nosso componente Minter é injetado na linha 7.

**Neste tutorial, editaremos apenas o arquivo `Minter.js` e adicionaremos arquivos em nossa pasta `src`.**

Agora que entendemos com o que estamos trabalhando, vamos configurar a nossa carteira Ethereum!

## Configure sua carteira Ethereum {#set-up-your-ethereum-wallet}

Para que os usuários possam interagir com o seu contrato inteligente, eles precisarão conectar a sua carteira Ethereum ao seu dapp.

### Baixe o MetaMask {#download-metamask}

Para este tutorial, usaremos uma carteira virtual no navegador, a MetaMask, para gerenciar o endereço da sua conta Ethereum. Se você quiser entender mais sobre como as transações na Ethereum funcionam, confira [esta página](/developers/docs/transactions/).

Você pode baixar e criar uma conta MetaMask gratuitamente [aqui](https://metamask.io/download). Quando estiver criando uma conta, ou se já tiver uma, certifique-se de mudar para a "Ropsten Test Network", no canto superior direito (para não precisar lidar com dinheiro de verdade\).

### Adicione ether de um Faucet {#add-ether-from-faucet}

Para mintar as nossas NFT (ou assinar quaisquer transações no blockchain Ethereum), precisaremos de alguns Eth falsos. Para obter Eth, você pode ir ao [Ropsten faucet](https://faucet.ropsten.be/) e inserir o endereço da sua conta Ropsten, depois clicar em “Send Ropsten Eth.” Em seguida, você deve ver Eth em sua conta Metamask!

### Verifique seu saldo {#check-your-balance}

Para verificar novamente se nosso saldo está lá, vamos fazer uma solicitação [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) usando a [ferramenta de composição da Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Ela mostrará a quantidade de Eth na sua carteira. Depois de inserir o endereço da sua conta da MetaMask e clicar em "Send Request", você verá uma resposta como esta:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**OBSERVAÇÃO:** Este resultado está em wei, não em eth. Lembre-se de que "Wei" é a menor unidade de ether. A conversão de wei para eth é: 1 eth = 10¹⁸ wei. Então, se convertemos 0xde0b6b3a7640000 para decimal, temos 1\*10¹⁸ wei, que é igual a 1 eth.

Ufa! Nosso dinheiro falso está todo lá! <Emoji text=":money_mouth_face:" size={1} />

## Conecte o MetaMask à sua UI {#connect-metamask-to-your-UI}

Agora que nossa carteira MetaMask está configurada, vamos conectar nosso dapp a ela!

Como queremos aderir ao paradigma [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), vamos criar um arquivo separado que contém nossas funções para gerenciar a lógica, os dados e as regras do nosso dapp e, em seguida, passar essas funções para o nosso frontend (nosso componente Minter.js).

### A função `connectWallet` {#connect-wallet-function}

Para fazer isso, vamos criar uma nova pasta chamada `utils` em seu diretório `src` e adicionar um arquivo chamado `interact.js` dentro dela, que conterá todas as nossas funções de interação com a carteira e o contrato inteligente.

Em nosso arquivo `interact.js`, escreveremos uma função `connectWallet`, que então importaremos e chamaremos em nosso componente `Minter.js`.

No seu arquivo `interact.js`, adicione o seguinte

```javascript
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
              Você deve instalar o MetaMask, uma carteira virtual Ethereum, em seu navegador.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Vamos dividir o que este código faz:

Primeiro, nossa função verifica se o `window.ethereum` está ativado em seu navegador.

`window.ethereum` é uma API global injetada pelo MetaMask e outros provedores de carteira que permite que sites solicitem as contas Ethereum dos usuários. Se aprovada, ela pode ler dados das blockchains ao qual o usuário está conectado e sugerir que o usuário assine mensagens e transações. Confira a [documentação do MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) para mais informações!

Se o `window.ethereum` _não estiver_ presente, isso significa que o MetaMask não está instalado. Isso resulta no retorno de um objeto JSON, onde o `address` retornado é uma string vazia, e o objeto JSX `status` informa que o usuário deve instalar o MetaMask.

**A maioria das funções que escrevermos retornará objetos JSON que podemos usar para atualizar nossas variáveis de estado e UI.**

Agora, se o `window.ethereum` _estiver_ presente, é aí que as coisas ficam interessantes.

Usando um loop try/catch, tentaremos nos conectar ao MetaMask chamando [`window.ethereum.request({ method: \"eth_requestAccounts\" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Chamando esta função o MetaMask irá abrir no navegador, onde o usuário será solicitado a conectar sua carteira ao seu dapp.

- Se o usuário optar por se conectar, o `method: \"eth_requestAccounts\"` retornará um array que contém todos os endereços de conta do usuário que estão conectados ao dapp. No total, nossa função `connectWallet` retornará um objeto JSON que contém o _primeiro_ `address` neste array (veja a linha 9) e uma mensagem de `status` que solicita ao usuário que escreva uma mensagem para o contrato inteligente.
- Se o usuário rejeitar a conexão, o objeto JSON conterá uma string vazia para o `address` retornado e uma mensagem de `status` que reflete que o usuário rejeitou a conexão.

### Adicione a função connectWallet ao seu Componente de UI Minter.js {#add-connect-wallet}

Agora que escrevemos esta função `connectWallet`, vamos conectá-la ao nosso componente `Minter.js`.

Primeiro, teremos que importar nossa função para o nosso arquivo `Minter.js`, adicionando `import { connectWallet } from "./utils/interact.js";` no topo do arquivo `Minter.js`. Suas primeiras 11 linhas de `Minter.js` agora devem se parecer com isto:

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

Então, dentro da nossa função `connectWalletPressed`, vamos chamar nossa função importada `connectWallet`, assim:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Observe como a maior parte da nossa funcionalidade é abstraída do nosso componente `Minter.js` a partir do arquivo `interact.js`? É assim que respeitamos o paradigma M-V-C!

Em `connectWalletPressed`, nós simplesmente fazemos uma chamada `await` para a nossa função `connectWallet` importada e, usando sua resposta, atualizamos nossas variáveis `status` e `walletAddress` através de seus hooks de estado.

Agora, vamos salvar os dois arquivos `Minter.js` e `interact.js` e testar nossa UI até agora.

Abra seu navegador em localhost:3000, e pressione o botão "Conectar Carteira" no canto superior direito da página.

Se você tiver o MetaMask instalado, você será solicitado a conectar sua carteira ao seu dapp. Aceite o convite para se conectar.

Você verá que o botão da carteira agora reflete que seu endereço está conectado.

Em seguida, tente atualizar a página... que estranho. Nosso botão de carteira está nos pedindo para conectar o MetaMask, mesmo que já esteja conectado...

Mas não se preocupe! Podemos corrigir isso facilmente implementando uma função chamada `getCurrentWalletConnected`, que verificará se um endereço já está conectado ao nosso dapp e atualizará nossa UI de acordo!

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
          status: "👆🏽 Escreva uma mensagem no campo de texto acima.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Conecte-se ao MetaMask usando o botão no canto superior direito.",
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
              Você deve instalar o MetaMask, uma carteira virtual Ethereum, em seu navegador.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Este código é _muito_ semelhante à função `connectWallet` que escrevemos anteriormente.

A principal diferença é que, em vez de chamar o método `eth_requestAccounts`, que abre o MetaMask para o usuário conectar sua carteira, aqui chamamos o método `eth_accounts`, que simplesmente retorna uma matriz contendo os endereços do MetaMask atualmente conectados ao nosso dapp.

Para ver essa função em ação, vamos chamá-la na função `useEffect` do nosso componente `Minter.js`.

Como fizemos para `connectWallet`, devemos importar essa função do nosso arquivo `interact.js` para o nosso arquivo `Minter.js` da seguinte forma:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //importar aqui
} from "./utils/interact.js"
```

Agora, nós simplesmente a chamamos em nossa função `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Observe que usamos a resposta da nossa chamada para `getCurrentWalletConnected` para atualizar nossas variáveis de estado `walletAddress` e `status`.

Depois de adicionar este código, tente atualizar a janela do navegador. O botão deve dizer que você está conectado e mostrar uma visualização do endereço de sua carteira conectada - mesmo depois de atualizar!

### Implemente addWalletListener {#implement-add-wallet-listener}

O passo final na configuração da nossa carteira dapp é implementar o ouvinte de carteira, para que nossa interface atualize quando o estado mudar, como quando o usuário desconecta ou troca de contas.

No seu arquivo `Minter.js`, adicione uma função `addWalletListener` que se pareça com o seguinte:

```javascript
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
          Você deve instalar o MetaMask, uma carteira virtual Ethereum, em seu navegador.
        </a>
      </p>
    )
  }
}
```

Vamos dividir rapidamente o que está acontecendo aqui:

- Primeiro, nossa função verifica se o `window.ethereum` está ativado (ou seja, se o MetaMask está instalado).
  - Se não estiver, simplesmente definimos nossa variável de estado `status` como uma string JSX que solicita ao usuário que instale o MetaMask.
  - Se estiver habilitado, configuramos o listener `window.ethereum.on("accountsChanged")` na linha 3 que escuta por mudanças de estado na carteira MetaMask, que incluem quando o usuário conecta uma conta adicional ao dapp, troca de contas ou desconecta uma conta. Se houver pelo menos uma conta conectada, a variável de estado `walletAddress` é atualizada como a primeira conta no array `accounts` retornado pelo listener. Caso contrário, o `walletAddress` é definido como uma string vazia.

Finalmente, nós devemos chamá-la em nossa função `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

E Voila! Concluímos a programação de toda a funcionalidade da nossa carteira! Agora que a nossa carteira está pronta, vamos descobrir como mintar nossa NFT!

## Metadados de NFT 101 {#nft-metadata-101}

Lembra dos metadados da NFT que acabamos de falar no Passo 0 deste tutorial - ele dá vida a uma NFT, permitindo que tenha propriedades, como um ativo digital, nome, descrição e outros atributos.

Vamos precisar configurar esses metadados como um objeto JSON e armazená-lo, para que possamos passá-lo como o parâmetro `tokenURI` ao chamar a função `mintNFT` do nosso contrato inteligente.

No campo texto "Link to Asset", "Name", "Description" inclui as diferentes propriedades dos metadados de nosso NFT. Nós vamos formatar estes metadados como um objeto JSON, mas há algumas opções para onde podemos armazenar este objeto JSON:

- Poderíamos armazená-lo no blockchain Ethereum; no entanto, fazê-lo seria muito caro.
- Nós poderíamos armazená-lo em um servidor centralizado, como AWS ou Firebase. Mas isso iria contra nossa ética de descentralização.
- Poderíamos usar o IPFS, um protocolo descentralizado e uma rede peer-to-peer para armazenar e compartilhar dados em um sistema de arquivos distribuído. Como este protocolo é descentralizado e gratuito, essa é a melhor opção!

Para armazenar nossos metadados no IPFS, usaremos o [Pinata](https://pinata.cloud/), uma API e um kit de ferramentas IPFS convenientes. Na próxima etapa, vamos explicar exatamente como fazer isso!

## Use o Pinata para fixar seus metadados no IPFS {#use-pinata-to-pin-your-metadata-to-IPFS}

Se você não tiver uma conta no [Pinata](https://pinata.cloud/), cadastre-se para obter uma conta gratuita [aqui](https://app.pinata.cloud/auth/signup) e conclua as etapas para verificar seu e-mail e conta.

### Crie sua chave de API do Pinata {#create-pinata-api-key}

Navegue até a página [https://pinata.cloud/keys](https://pinata.cloud/keys), selecione o botão "Nova Chave" na parte superior, defina o widget Admin como ativado e nomeie sua chave.

Será mostrado a você um pop-up com as informações da sua API. Certifique-se de colocar isto num lugar seguro.

Agora que a nossa chave está configurada, vamos adicioná-la ao nosso projeto para que possamos usá-la.

### Crie um arquivo .env {#create-a-env}

Podemos armazenar com segurança nossa chave e segredo do Pinata em um arquivo de ambiente. Vamos instalar o [pacote dotenv](https://www.npmjs.com/package/dotenv) no diretório do seu projeto.

Abra uma nova aba em seu terminal (separada da que está executando o host local) e certifique-se de estar na pasta `minter-starter-files`. Em seguida, execute o seguinte comando em seu terminal:

```text
npm install dotenv --save
```

Em seguida, crie um arquivo `.env` no diretório raiz de seus `minter-starter-files` inserindo o seguinte na sua linha de comando:

```javascript
vim.env
```

Isso abrirá seu arquivo `.env` no vim (um editor de texto). Para salvar, aperte "esc" + ":" + "q" no seu teclado nesta ordem.

Em seguida, no VSCode, navegue até o seu arquivo .env e adicione sua chave de API e segredo de API da Pinata a ele, da seguinte forma:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

Salve o arquivo e então você estará pronto para começar a escrever a função de enviar seus metadados JSON para IPFS!

### Implemente pinJSONToIPFS {#pin-json-to-ipfs}

Felizmente para nós, a Pinata tem uma [API especificamente para carregar dados JSON para o IPFS](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) e um exemplo conveniente em JavaScript com axios que podemos usar, com algumas pequenas modificações.

Na sua pasta `utils`, vamos criar outro arquivo chamado `pinata.js` e então importar nosso segredo e chave do Pinata do arquivo .env da seguinte forma:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

Em seguida, cole o código adicional abaixo no seu arquivo `pinata.js`. Não se preocupe, nós iremos clarificar o que tudo isso significa!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //fazendo a requisição axios POST para o Pinata ⬇️
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

Então, o que esse código faz exatamente?

Primeiro, ele importa o [axios](https://www.npmjs.com/package/axios), um cliente HTTP baseado em promessas para o navegador e node.js, que usaremos para fazer uma requisição para o Pinata.

Em seguida, temos nossa função assíncrona `pinJSONToIPFS`, que recebe um `JSONBody` como entrada e a chave e segredo da API da Pinata em seu cabeçalho, tudo para fazer uma requisição POST para sua API `pinJSONToIPFS`.

- Se esta requisição POST for bem-sucedida, nossa função retornará um objeto JSON com o booleano `success` como verdadeiro e o `pinataUrl` onde nossos metadados foram fixados. Usaremos este `pinataUrl` retornado como a entrada `tokenURI` para a função de mintagem do nosso contrato inteligente.
- Se esta solicitação de post falhar, nossa função retornará um objeto JSON com o booleano de `success` como falso e uma string `message` que transmite nosso erro.

Assim como nos tipos de retorno da nossa função `connectWallet`, estamos retornando objetos JSON para que possamos usar seus parâmetros para atualizar nossas variáveis de estado e a UI.

## Carregue seu contrato inteligente {#load-your-smart-contract}

Agora que temos uma maneira de enviar nossos metadados de NFT para o IPFS através de nossa função `pinJSONToIPFS`, vamos precisar de uma forma de carregar uma instância do nosso contrato inteligente para que possamos chamar sua função `mintNFT`.

Como mencionamos anteriormente, neste tutorial usaremos [este contrato inteligente de NFT existente](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE); no entanto, se você quiser aprender como o fizemos ou criar um você mesmo, recomendamos fortemente que você confira nosso outro tutorial, ["Como Criar um NFT."](https://www.alchemy.com/docs/how-to-create-an-nft).

### A ABI do contrato {#contract-abi}

Se você examinou nossos arquivos de perto, deve ter notado que em nosso diretório `src`, há um arquivo `contract-abi.json`. Um ABI é necessário para especificar qual função um contrato irá invocar, como também garantir que a função retornará dados no formato que você espera.

Também precisaremos de uma chave API Alchemy e da API Alchemy Web3 para conectar ao blockchain Ethereum e carregar o nosso contrato inteligente.

### Crie sua chave de API da Alchemy {#create-alchemy-api}

Se você ainda não tem uma conta na Alchemy, [inscreva-se gratuitamente aqui.](https://alchemy.com/?a=eth-org-nft-minter)

Assim que criar uma conta na Alchemy, você pode gerar uma chave de API criando um "app". Isso nos permitirá fazer solicitações à rede de testes Ropsten.

Navegue até a pagina "Create App" no seu "Dashboard da Alchemy", passe o cursor sob "Apps" na barra de navegação e clique em “Create App”.

Nomeie seu aplicativo; nós escolhemos "Minha primeira NFT!", faça uma breve descrição, selecione "Staging" para o ambiente (usado para a contabilidade do seu ‘app’) e escolha "Ropsten" para sua rede.

Clique em "Create App", e é isso e tudo! Seu app deveria aparecer na tabela abaixo.

Incrível agora que criamos a nossa URL de API Alchemy HTTP, copie-a para a sua área de transferência...

…e então vamos adicioná-lo ao nosso arquivo `.env`. Ao todo, seu arquivo .env deve se parecer com isto:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

Agora que temos nossa ABI de contrato e nossa chave de API da Alchemy, estamos prontos para carregar nosso contrato inteligente usando o [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).

### Configure seu endpoint e contrato do Alchemy Web3 {#setup-alchemy-endpoint}

Primeiro, se você ainda não o tiver, precisará instalar o [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) navegando até o diretório inicial: `nft-minter-tutorial` no terminal:

```text
cd ..
npm install @alch/alchemy-web3
```

Em seguida, vamos voltar ao nosso arquivo `interact.js`. No topo do arquivo, adicione o seguinte código para importar a chave de Alchemy do seu arquivo .env e configure seu Alchemy Web3 endpoint:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

O [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) é um wrapper em torno do [Web3.js](https://docs.web3js.org/), fornecendo métodos de API aprimorados e outros benefícios cruciais para facilitar sua vida como desenvolvedor web3. Ele foi projetado para exigir uma configuração mínima, para que você possa começar a usá-la no seu aplicativo imediatamente!

Em seguida, vamos adicionar nosso contrato ABI e endereço do contrato ao nosso arquivo.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Assim que tivermos ambas as coisas, estaremos prontos para começar a codificar a nossa função "mint"!

## Implemente a função mintNFT {#implement-the-mintnft-function}

Dentro do seu arquivo `interact.js`, vamos definir nossa função, `mintNFT`, que, de forma homônima, irá mintar nosso NFT.

Porque vamos fazer numerosas chamadas assíncronas \(para o Pinata fixar nossos metadados para IPFS, Alchemy Web3 para carregar o nosso contrato inteligente, e MetaMask para assinar nossas transações\), nossa função também será assíncrona.

As três entradas para nossa função serão a `url` do nosso ativo digital, o `name` e a `description`. Adicione a seguinte assinatura da função abaixo da função `connectWallet`:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Tratamento de erros de entrada {#input-error-handling}

Naturalmente, faz sentido ter algum tipo de tratamento de erro de entrada no início da função, então vamos sair desta função se nossos parâmetros de entrada não estiverem corretos. Dentro da nossa função, vamos adicionar o seguinte código:

```javascript
export const mintNFT = async (url, name, description) => {
  //tratamento de erros
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Certifique-se de que todos os campos estão preenchidos antes de mintar.",
    }
  }
}
```

Essencialmente, se algum dos parâmetros de entrada for uma string vazia, retornamos um objeto JSON onde o booleano `success` é falso, e a string `status` informa que todos os campos em nossa UI devem ser preenchidos.

### Envie os metadados para o IPFS {#upload-metadata-to-ipfs}

Assim que soubermos que nossos metadados estão formatados corretamente, o próximo passo é envolvê-lo em um objeto JSON e enviá-lo para o IPFS através do `pinJSONToIPFS` que escrevemos!

Para fazer isso, primeiro precisamos importar a função `pinJSONToIPFS` para nosso arquivo `interact.js`. No topo do `interact.js`, vamos adicionar:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

Lembre-se que o `pinJSONToIPFS` recebe um corpo JSON. Então, antes de fazer uma chamada para ele, precisaremos formatar nossos parâmetros `url`, `name` e `description` em um objeto JSON.

Vamos atualizar nosso código para criar um objeto JSON chamado `metadata` e então fazer uma chamada para `pinJSONToIPFS` com este parâmetro `metadata`:

```javascript
export const mintNFT = async (url, name, description) => {
  //tratamento de erros
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Certifique-se de que todos os campos estão preenchidos antes de mintar.",
    }
  }

  //criar metadados
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //fazer chamada ao pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Algo deu errado durante o upload do seu tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

Observe que armazenamos a resposta da nossa chamada para `pinJSONToIPFS(metadata)` no objeto `pinataResponse`. Então, analisamos esse objeto para quaisquer erros.

Se houver um erro, retornamos um objeto JSON onde o booleano `success` é falso e nossa string `status` informa que nossa chamada falhou. Caso contrário, extraímos o `pinataURL` da `pinataResponse` e o armazenamos como nossa variável `tokenURI`.

Agora é hora de carregar o nosso contrato inteligente usando a API da Alchemy Web3 que inicializamos no topo do nosso arquivo. Adicione a seguinte linha de código na parte inferior da função `mintNFT` para definir o contrato na variável global `window.contract`:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

A última coisa a adicionar em nossa função `mintNFT` é a nossa transação Ethereum:

```javascript
//configure sua transação Ethereum
const transactionParameters = {
  to: contractAddress, // Obrigatório, exceto durante a publicação de contratos.
  from: window.ethereum.selectedAddress, // deve corresponder ao endereço ativo do usuário.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //faz uma chamada para o contrato inteligente de NFT
}

//assine a transação via MetaMask
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Confira sua transação no Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Algo deu errado: " + error.message,
  }
}
```

Se você já está familiarizado com as transações na Ethereum, perceberá que a estrutura é bem parecida com a que você já viu.

- Primeiro, nós configuramos nossos parâmetros de transações.
  - `to` especifica o endereço do destinatário (nosso contrato inteligente)
  - `from` especifica o assinante da transação (o endereço conectado do usuário ao MetaMask: `window.ethereum.selectedAddress`)
  - `data` contém a chamada para o nosso método `mintNFT` de contrato inteligente, que recebe o nosso `tokenURI` e o endereço da carteira do usuário, `window.ethereum.selectedAddress`, como entradas
- Então, fazemos uma chamada de `await`, `window.ethereum.request`, onde pedimos ao MetaMask para assinar a transação. Observe que, nesta solicitação, estamos especificando nosso método eth (`eth_SentTransaction`) e passando nossos `transactionParameters`. Neste ponto, a MetaMask irá abrir no navegador e pedirá que o usuário assine ou rejeite a transação.
  - Se a transação for bem-sucedida, a função retornará um objeto JSON onde o booleano `success` é definido como verdadeiro e a string `status` solicita que o usuário verifique o Etherscan para obter mais informações sobre sua transação.
  - Se a transação falhar, a função retornará um objeto JSON onde o booleano `success` é definido como falso, e a string `status` retransmite a mensagem de erro.

No total, nossa função `mintNFT` deve se parecer com isto:

```javascript
export const mintNFT = async (url, name, description) => {
  //tratamento de erros
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Certifique-se de que todos os campos estão preenchidos antes de mintar.",
    }
  }

  //criar metadados
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //solicitação de fixação do pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Algo deu errado durante o upload do seu tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //carregar contrato inteligente
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //configure sua transação Ethereum
  const transactionParameters = {
    to: contractAddress, // Obrigatório, exceto durante a publicação de contratos.
    from: window.ethereum.selectedAddress, // deve corresponder ao endereço ativo do usuário.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //faz uma chamada para o contrato inteligente de NFT
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
        "✅ Confira sua transação no Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Algo deu errado: " + error.message,
    }
  }
}
```

Essa é uma função gigante! Agora, só precisamos conectar nossa função `mintNFT` ao nosso componente `Minter.js`...

## Conecte o mintNFT ao nosso frontend Minter.js {#connect-our-frontend}

Abra seu arquivo `Minter.js` e atualize a linha `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` no topo para ser:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Finalmente, implemente a função `onMintPressed` para fazer a chamada `await` para a sua função `mintNFT` importada e atualize a variável de estado `status` para refletir se nossa transação foi bem-sucedida ou falhou:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## Implante seu NFT em um site ativo {#deploy-your-NFT}

Pronto para deixar seu projeto ao vivo para que usuários interajam? Confira [este tutorial](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) para implantar seu Mintador em um site ativo.

Um último passo...

## Conquiste o mundo da blockchain {#take-the-blockchain-world-by-storm}

Só uma brincadeira, você chegou ao fim do tutorial!

Para recapitular, construindo um minter NFT, você aprendeu com sucesso como:

- Conectar ao MetaMask através do seu projeto frontend
- Chamar métodos de contrato inteligentes no seu frontend
- Assine transações usando MetaMask

Presumivelmente, você gostaria de poder exibir os NFTs mintados através do seu dapp em sua carteira — então, certifique-se de conferir nosso rápido tutorial [Como Visualizar seu NFT em sua Carteira](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet)!

E, como sempre, se você tiver alguma dúvida, estamos aqui para ajudar no [Discord da Alchemy](https://discord.gg/gWuC7zB). Mal podemos esperar para ver como você aplicará os conceitos deste tutorial em seus projetos futuros!
