---
title: "Enviando transações usando Viem"
description: "Este é um guia amigável para iniciantes sobre como enviar transações na Ethereum usando a biblioteca Viem. Existem três etapas principais para enviar uma transação para a blockchain da Ethereum: criar, assinar e transmitir. Passaremos por todas as três."
author: "Elan Halpern"
tags: ["transações", "Viem", "Alchemy"]
skill: beginner
breadcrumb: "Enviar transações"
lang: pt-br
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Este é um guia amigável para iniciantes sobre como enviar transações na Ethereum usando a biblioteca [Viem](https://viem.sh/). Existem três etapas principais para enviar uma transação para a blockchain da Ethereum: criar, assinar e transmitir. Passaremos por todas as três, com a esperança de responder a quaisquer perguntas que você possa ter! Neste tutorial, usaremos a [Alchemy](https://www.alchemy.com/) para enviar nossas transações para a cadeia da Ethereum. Você pode [criar uma conta gratuita na Alchemy aqui](https://auth.alchemy.com/signup).

**NOTA:** Este guia é para assinar suas transações no _backend_ do seu aplicativo. Se você quiser integrar a assinatura de suas transações no frontend, confira a [API do provedor da MetaMask](https://docs.metamask.io/wallet/reference/provider-api/).

## O básico {#the-basics}

Assim como a maioria dos desenvolvedores de blockchain quando estão começando, você pode ter feito algumas pesquisas sobre como enviar uma transação (algo que deveria ser bem simples) e se deparado com uma infinidade de guias, cada um dizendo coisas diferentes e deixando você um pouco sobrecarregado e confuso. Se você está nesse barco, não se preocupe; todos nós já estivemos lá em algum momento! Então, antes de começarmos, vamos esclarecer algumas coisas:

### 1\. A Alchemy não armazena suas chaves privadas {#alchemy-does-not-store-your-private-keys}

- Isso significa que a Alchemy não pode assinar e enviar transações em seu nome. O motivo disso são questões de segurança. A Alchemy nunca pedirá que você compartilhe sua chave privada, e você nunca deve compartilhar sua chave privada com um nó hospedado (ou com qualquer pessoa, na verdade).
- Você pode ler da blockchain usando a API principal da Alchemy, mas para escrever nela você precisará usar outra coisa para assinar suas transações antes de enviá-las através da Alchemy (isso é o mesmo para qualquer outro [serviço de nó](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2\. O que é um "assinante" (signer)? {#what-is-a-signer}

- Os assinantes (signers) assinarão transações para você usando sua chave privada. Neste tutorial, usaremos a [Viem](https://viem.sh/) para assinar nossa transação, mas você também pode usar qualquer outra biblioteca Web3.
- No frontend, um bom exemplo de assinante seria a [MetaMask](https://metamask.io/), que assinará e enviará transações em seu nome.

### 3\. Por que preciso assinar minhas transações? {#why-do-i-need-to-sign-my-transactions}

- Todo usuário que deseja enviar uma transação na rede Ethereum deve assinar a transação (usando sua chave privada), a fim de validar que a origem da transação é quem afirma ser.
- É super importante proteger essa chave privada, pois ter acesso a ela concede controle total sobre sua conta Ethereum, permitindo que você (ou qualquer pessoa com acesso) realize transações em seu nome.

### 4\. Como protejo minha chave privada? {#how-do-i-protect-my-private-key}

- Existem muitas maneiras de proteger sua chave privada e usá-la para enviar transações. Neste tutorial, usaremos um arquivo `.env`. No entanto, você também pode usar um provedor separado que armazena chaves privadas, usar um arquivo de repositório de chaves (keystore) ou outras opções.

### 5\. Qual é a diferença entre `eth_sendTransaction` e `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` e `eth_sendRawTransaction` são ambas funções da API da Ethereum que transmitem uma transação para a rede Ethereum para que ela seja adicionada a um bloco futuro. Elas diferem na forma como lidam com a assinatura das transações.

- [`eth_sendTransaction`](/developers/docs/apis/json-rpc/#eth-sendtransaction) é usada para enviar transações _não assinadas_, o que significa que o nó para o qual você está enviando deve gerenciar sua chave privada para que possa assinar a transação antes de transmiti-la para a cadeia. Como a Alchemy não retém as chaves privadas dos usuários, eles não oferecem suporte a esse método.
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction) é usada para transmitir transações que já foram assinadas. Isso significa que você primeiro precisa assinar a transação com sua chave privada (na Viem, usando [`signTransaction`](https://viem.sh/docs/actions/wallet/signTransaction) com uma [conta local](https://viem.sh/docs/accounts/local/privateKeyToAccount)), e então passar o resultado para `eth_sendRawTransaction`.

Ao usar a Viem, `eth_sendRawTransaction` é acessada chamando a função [`sendRawTransaction`](https://viem.sh/docs/actions/wallet/sendRawTransaction).

É isso que usaremos neste tutorial.

### 6\. O que é a biblioteca Web3? {#what-is-the-web3-library}

- Uma biblioteca Web3 é um invólucro (wrapper) em torno das chamadas [JSON-RPC](/developers/docs/apis/json-rpc/) padrão que é bastante comum de usar no desenvolvimento na Ethereum.
- Existem muitas bibliotecas Web3 para diferentes linguagens. Neste tutorial, usaremos a [Viem](https://viem.sh/), que é escrita em TypeScript e funciona em qualquer projeto JavaScript. Você pode conferir outras opções [aqui](/developers/docs/apis/javascript/), como a [Ethers.js](https://docs.ethers.org/v6/).

Certo, agora que tiramos algumas dessas dúvidas do caminho, vamos prosseguir para o tutorial. Sinta-se à vontade para fazer perguntas a qualquer momento no [Discord](https://discord.gg/gWuC7zB) da Alchemy!

### 7\. Como enviar transações seguras, com gás otimizado e privadas? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [A Alchemy possui um conjunto de recursos de transação](https://www.alchemy.com/docs/sending-transactions). Você pode usá-los para enviar transações, simular transações antes que elas aconteçam, enviar transações privadas e enviar transações com gás otimizado.
- Você também pode usar os [webhooks da Alchemy](https://www.alchemy.com/docs/reference/webhooks-overview) para receber alertas quando sua transação for retirada da mempool e adicionada à cadeia.

**NOTA:** Este guia requer uma conta da Alchemy, um endereço Ethereum ou uma carteira MetaMask, Node.js e npm instalados. Caso não tenha, siga estas etapas:

1.  [Crie uma conta gratuita na Alchemy](https://auth.alchemy.com/signup)
2.  [Crie uma conta na MetaMask](https://metamask.io/) (ou obtenha um endereço Ethereum)
3.  [Instale o Node.js e o npm](https://nodejs.org/en/download/)
## Etapas para enviar sua transação {#steps-to-sending-your-transaction}

### 1\. Crie um aplicativo da Alchemy na rede de teste Sepolia {#create-an-alchemy-app-on-the-sepolia-testnet}

Navegue até o seu [Painel da Alchemy](https://dashboard.alchemy.com/) e crie um novo aplicativo, escolhendo Sepolia (ou qualquer outra rede de teste) para sua rede.

### 2\. Solicite ETH do faucet da Sepolia {#request-eth-from-sepolia-faucet}

Siga as instruções no [faucet da Sepolia da Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia) para receber ETH, ou use um dos outros [faucets da Sepolia](/developers/docs/networks/#sepolia). Os faucets distribuem pequenas quantias (o faucet da Alchemy fornece 0,1 ETH por dia), o que é suficiente para este tutorial. Certifique-se de incluir seu endereço Ethereum da **Sepolia** (da MetaMask) e não de outra rede. Depois de seguir as instruções, verifique novamente se você recebeu o ETH em sua carteira.

### 3\. Crie um novo diretório de projeto e use `cd` para entrar nele {#create-a-new-project-direction}

Crie um novo diretório de projeto a partir da linha de comando (terminal para Macs) e navegue até ele:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Instale a Viem (ou qualquer biblioteca Web3) {#install-alchemy-web3}

Execute o seguinte comando no diretório do seu projeto para instalar a [Viem](https://viem.sh/):

Observe que, se você quiser usar a biblioteca Ethers.js, [siga as instruções aqui](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```sh
npm init -y
npm install viem
```

### 5\. Instale o dotenv {#install-dotenv}

Usaremos um arquivo `.env` para armazenar com segurança nossa chave de API e chave privada.

```
npm install dotenv --save
```

### 6\. Crie o arquivo `.env` {#create-the-dotenv-file}

Crie um arquivo `.env` no diretório do seu projeto e adicione o seguinte (substituindo "`your-api-url`" e "`your-private-key`")

- Para encontrar a URL da sua API da Alchemy, navegue até a página de detalhes do aplicativo que você acabou de criar no seu painel, clique em "View Key" (Ver Chave) no canto superior direito e pegue a URL HTTP.
- Para encontrar sua chave privada usando a MetaMask, confira este [guia](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/). Use uma conta que contenha apenas ETH de rede de teste.

```sh
API_URL="your-api-url"
PRIVATE_KEY="your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Não faça commit do <code>.env</code>! Certifique-se de nunca compartilhar ou expor seu arquivo <code>.env</code> com ninguém, pois você estará comprometendo seus segredos ao fazer isso. Se você estiver usando controle de versão, adicione seu <code>.env</code> a um arquivo <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. Crie o arquivo `sendTx.js` {#create-sendtx-js}

Ótimo, agora que temos nossos dados confidenciais protegidos em um arquivo `.env`, vamos começar a programar. Para o nosso exemplo de envio de transação, enviaremos 0,001 ETH para outro endereço que você controla, como uma segunda conta na MetaMask.

Crie um arquivo `sendTx.js`, que é onde configuraremos e enviaremos nossa transação de exemplo, e adicione as seguintes linhas de código a ele:

```js
require("dotenv").config({ quiet: true })
const { createPublicClient, createWalletClient, http, parseEther } = require("viem")
const { privateKeyToAccount } = require("viem/accounts")
const { sepolia } = require("viem/chains")

async function main() {
  const { API_URL, PRIVATE_KEY } = process.env
  const account = privateKeyToAccount(
    PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`
  )
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(API_URL),
  })
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(API_URL),
  })

  const nonce = await publicClient.getTransactionCount({
    address: account.address,
    blockTag: "pending",
  }) // nonce começa a contar a partir de 0

  const transaction = await walletClient.prepareTransactionRequest({
    to: "0xYourSecondAddress", // TODO: substitua pelo endereço para o qual você deseja enviar ETH
    value: parseEther("0.001"), // 0.001 ETH
    gas: 21000n,
    nonce,
    // campo de dados opcional para enviar mensagem ou executar contrato inteligente
  })

  const signedTx = await walletClient.signTransaction(transaction)

  try {
    const hash = await walletClient.sendRawTransaction({
      serializedTransaction: signedTx,
    })
    console.log("🎉 The hash of your transaction is:", hash)

    const receipt = await publicClient.waitForTransactionReceipt({ hash })
    console.log(`Transaction ${receipt.status} in block ${receipt.blockNumber}`)
  } catch (error) {
    console.log(
      "❗Something went wrong while submitting your transaction:",
      error.details ?? error.message
    )
  }
}

main()
```

Certifique-se de substituir `0xYourSecondAddress` pelo endereço para o qual você deseja enviar ETH. O script deriva seu próprio endereço (de envio) a partir de `PRIVATE_KEY`, então você não precisa inseri-lo.

Agora, antes de começarmos a executar este código, vamos falar sobre alguns dos componentes aqui.

- `account`: Uma conta local criada a partir da sua chave privada com [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount). A assinatura acontece na sua máquina, e a chave privada nunca é enviada para a Alchemy.
- `publicClient` e `walletClient`: clientes da Viem que enviam solicitações JSON-RPC para a sua URL da Alchemy. O cliente público (public client) lê da cadeia, e o cliente de carteira (wallet client) prepara e assina transações para a sua conta.
- `nonce`: A especificação do nonce é usada para rastrear o número de transações enviadas do seu endereço. Precisamos disso por motivos de segurança e para evitar ataques de repetição (replay attacks). Para obter o número de transações enviadas do seu endereço, usamos [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count). A Viem também preencheria isso para você, mas nós o buscamos explicitamente aqui para mostrar de onde ele vem.
- `transaction`: O objeto da transação tem alguns aspectos que precisamos especificar. [`prepareTransactionRequest`](https://viem.sh/docs/actions/wallet/prepareTransactionRequest) preenche o resto para nós, incluindo o `chainId` e os campos de taxa da [EIP-1559](/developers/docs/gas/) `maxFeePerGas` e `maxPriorityFeePerGas`, com base nas condições atuais da rede.
  - `to`: Este é o endereço para o qual queremos enviar ETH.
  - `value`: Este é o valor que desejamos enviar, especificado em Wei, onde 10^18 Wei = 1 ETH. [`parseEther`](https://viem.sh/docs/utilities/parseEther) converte um valor em ETH para Wei para nós. Sua conta precisa de um pouco mais do que isso, pois também paga pelo gás.
  - `gas`: Existem muitas maneiras de determinar a quantidade certa de gás a ser incluída na sua transação. A Alchemy oferece suporte a [webhooks](https://www.alchemy.com/docs/reference/webhooks-overview) que podem notificá-lo sobre atividades onchain. Para transações na Mainnet, é uma boa prática verificar as condições atuais do gás para determinar a quantidade certa de gás a ser incluída. Uma transferência simples de ETH para um endereço comum sempre usa exatamente 21.000 de gás, que é o mínimo para qualquer transação, então colocamos 21000 aqui. Se você omitir o `gas`, a Viem o estimará para você.
  - `nonce`: veja a definição de nonce acima. O nonce começa a contar a partir de zero.
  - [OPCIONAL] data: Usado para enviar informações adicionais com sua transferência ou chamar um contrato inteligente, não é necessário para transferências de saldo, confira a nota abaixo.
- `signedTx`: Para assinar nosso objeto de transação, usaremos o método `signTransaction`, que o assina localmente com a conta criada a partir da nossa `PRIVATE_KEY`.
- `sendRawTransaction`: Assim que tivermos uma transação assinada, podemos enviá-la para ser incluída em um bloco subsequente usando `sendRawTransaction`, que chama `eth_sendRawTransaction`.
- `waitForTransactionReceipt`: Aguarda até que a transação seja incluída em um bloco e retorna seu recibo.

**Uma nota sobre dados (data)**
Existem dois tipos principais de transações que podem ser enviadas na Ethereum.

- Transferência de saldo: Enviar ETH de um endereço para outro. Nenhum campo de dados é necessário, no entanto, se você quiser enviar informações adicionais junto com sua transação, você pode incluir essas informações no formato HEX neste campo.
  - Por exemplo, digamos que queríamos escrever o hash de um documento IPFS na cadeia da Ethereum para dar a ele um carimbo de data/hora imutável. Nosso campo de dados deveria então se parecer com `data: toHex("IPFS hash")`, usando o [`toHex`](https://viem.sh/docs/utilities/toHex) da Viem. E agora qualquer pessoa pode consultar a cadeia e ver quando esse documento foi adicionado.
- Transação de contrato inteligente: Executar algum código de contrato inteligente na cadeia. Neste caso, o campo de dados deve conter a função inteligente que você deseja executar, juntamente com quaisquer parâmetros.
  - Para um exemplo prático, confira o [tutorial de Contrato Inteligente Hello World](/developers/tutorials/hello-world-smart-contract/).

### 8\. Execute o código usando `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Navegue de volta para o seu terminal ou linha de comando e execute:

```
node sendTx.js
```

### 9\. Veja sua transação em um explorador de blocos {#see-your-transaction-in-the-mempool}

O script imprime o hash da transação assim que o nó aceita a transação, depois aguarda até que ela seja incluída em um bloco (geralmente em alguns segundos) e imprime o resultado. Para ver os detalhes, cole o hash em um explorador de blocos da Sepolia, como o [Sepolia Etherscan](https://sepolia.etherscan.io/) ou o [Blockscout](https://eth-sepolia.blockscout.com/). Lá você pode observar a transação passar de pendente para incluída e ver o valor, as taxas e o bloco em que ela foi parar.

Se você vir um erro de `insufficient funds` (fundos insuficientes), sua conta não tem ETH da Sepolia suficiente para cobrir o valor mais o gás. Volte para a etapa 2 e solicite mais de um faucet.

**Iupiiii! Você acabou de enviar sua primeira transação na Ethereum usando a Alchemy 🎉**

_Para comentários e sugestões sobre este guia, envie uma mensagem para Elan no [Discord](https://discord.gg/gWuC7zB) da Alchemy!_

_Publicado originalmente pela Alchemy._
