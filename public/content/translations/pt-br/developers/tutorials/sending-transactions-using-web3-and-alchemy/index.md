---
title: "Enviando transações usando Web3"
description: "Este é um guia para iniciantes sobre como enviar transações na Ethereum usando Web3. Existem três etapas principais para enviar uma transação para a blockchain da Ethereum: criar, assinar e transmitir. Vamos passar por todas as três."
author: "Elan Halpern"
tags: ["transações", "web3.js", "Alchemy"]
skill: beginner
breadcrumb: "Enviar transações"
lang: pt-br
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Este é um guia para iniciantes sobre como enviar transações na Ethereum usando Web3. Existem três etapas principais para enviar uma transação para a blockchain da Ethereum: criar, assinar e transmitir. Vamos passar por todas as três, com a esperança de responder a quaisquer perguntas que você possa ter! Neste tutorial, usaremos a [Alchemy](https://www.alchemy.com/) para enviar nossas transações para a cadeia da Ethereum. Você pode [criar uma conta gratuita na Alchemy aqui](https://auth.alchemy.com/signup).

**NOTA:** Este guia é para assinar suas transações no _backend_ do seu aplicativo. Se você quiser integrar a assinatura de suas transações no frontend, confira a integração da [Web3 com um provedor de navegador](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider).

## O básico {#the-basics}

Assim como a maioria dos desenvolvedores de blockchain quando estão começando, você pode ter feito algumas pesquisas sobre como enviar uma transação (algo que deveria ser bem simples) e se deparado com uma infinidade de guias, cada um dizendo coisas diferentes e deixando você um pouco sobrecarregado e confuso. Se você está nesse barco, não se preocupe; todos nós já estivemos lá em algum momento! Então, antes de começarmos, vamos esclarecer algumas coisas:

### 1\. A Alchemy não armazena suas chaves privadas {#alchemy-does-not-store-your-private-keys}

- Isso significa que a Alchemy não pode assinar e enviar transações em seu nome. O motivo disso são questões de segurança. A Alchemy nunca pedirá que você compartilhe sua chave privada, e você nunca deve compartilhar sua chave privada com um nó hospedado (ou com qualquer pessoa, na verdade).
- Você pode ler da blockchain usando a API principal da Alchemy, mas para escrever nela você precisará usar outra coisa para assinar suas transações antes de enviá-las através da Alchemy (isso é o mesmo para qualquer outro [serviço de nó](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2\. O que é um “signer”? {#what-is-a-signer}

- Os signers assinarão transações para você usando sua chave privada. Neste tutorial, usaremos a [Web3 da Alchemy](https://github.com/alchemyplatform/alchemy-web3) para assinar nossa transação, mas você também pode usar qualquer outra biblioteca Web3.
- No frontend, um bom exemplo de signer seria a [MetaMask](https://metamask.io/), que assinará e enviará transações em seu nome.
### 3\. Por que preciso assinar minhas transações? {#why-do-i-need-to-sign-my-transactions}

- Todo usuário que deseja enviar uma transação na rede Ethereum deve assinar a transação (usando sua chave privada), a fim de validar que a origem da transação é quem afirma ser.
- É super importante proteger essa chave privada, pois ter acesso a ela concede controle total sobre sua conta Ethereum, permitindo que você (ou qualquer pessoa com acesso) realize transações em seu nome.

### 4\. Como protejo minha chave privada? {#how-do-i-protect-my-private-key}

- Existem muitas maneiras de proteger sua chave privada e usá-la para enviar transações. Neste tutorial, usaremos um arquivo `.env`. No entanto, você também pode usar um provedor separado que armazena chaves privadas, usar um arquivo de repositório de chaves (keystore) ou outras opções.

### 5\. Qual é a diferença entre `eth_sendTransaction` e `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` e `eth_sendRawTransaction` são ambas funções da API da Ethereum que transmitem uma transação para a rede Ethereum para que ela seja adicionada a um bloco futuro. Elas diferem na forma como lidam com a assinatura das transações.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) é usado para enviar transações _não assinadas_, o que significa que o nó para o qual você está enviando deve gerenciar sua chave privada para que possa assinar a transação antes de transmiti-la para a cadeia. Como a Alchemy não guarda as chaves privadas dos usuários, ela não suporta esse método.
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction) é usado para transmitir transações que já foram assinadas. Isso significa que você primeiro precisa usar [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction), e então passar o resultado para `eth_sendRawTransaction`.

Ao usar a Web3, `eth_sendRawTransaction` é acessado chamando a função [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction).

É isso que usaremos neste tutorial.

### 6\. O que é a biblioteca Web3? {#what-is-the-web3-library}

- Web3.js é uma biblioteca wrapper em torno das chamadas JSON-RPC padrão que é bastante comum de usar no desenvolvimento da Ethereum.
- Existem muitas bibliotecas Web3 para diferentes linguagens. Neste tutorial, usaremos a [Web3 da Alchemy](https://github.com/alchemyplatform/alchemy-web3), que é escrita em JavaScript. Você pode conferir outras opções [aqui](/developers/docs/apis/javascript/), como a [Ethers.js](https://docs.ethers.org/v5/).

Certo, agora que tiramos algumas dessas dúvidas do caminho, vamos passar para o tutorial. Sinta-se à vontade para fazer perguntas a qualquer momento no [Discord](https://discord.gg/gWuC7zB) da Alchemy!

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

Siga as instruções no [faucet da Sepolia da Alchemy](https://www.sepoliafaucet.com/) para receber ETH. Certifique-se de incluir seu endereço Ethereum da **Sepolia** (da MetaMask) e não de outra rede. Depois de seguir as instruções, verifique novamente se você recebeu o ETH em sua carteira.

### 3\. Crie um novo diretório de projeto e use `cd` para entrar nele {#create-a-new-project-direction}

Crie um novo diretório de projeto a partir da linha de comando (terminal para Macs) e navegue até ele:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Instale a Web3 da Alchemy (ou qualquer biblioteca Web3) {#install-alchemy-web3}

Execute o seguinte comando no diretório do seu projeto para instalar a [Web3 da Alchemy](https://github.com/alchemyplatform/alchemy-web3):

Nota: se você quiser usar a biblioteca Ethers.js, [siga as instruções aqui](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5\. Instale o dotenv {#install-dotenv}

Usaremos um arquivo `.env` para armazenar com segurança nossa chave de API e chave privada.

```
npm install dotenv --save
```

### 6\. Crie o arquivo `.env` {#create-the-dotenv-file}

Crie um arquivo `.env` no diretório do seu projeto e adicione o seguinte (substituindo “`your-api-url`" e "`your-private-key`")

- Para encontrar a URL da sua API da Alchemy, navegue até a página de detalhes do aplicativo que você acabou de criar no seu painel, clique em “View Key” (Ver Chave) no canto superior direito e pegue a URL HTTP.
- Para encontrar sua chave privada usando a MetaMask, confira este [guia](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Não faça commit do <code>.env</code>! Certifique-se de nunca compartilhar ou expor seu arquivo <code>.env</code> com ninguém, pois você estará comprometendo seus segredos ao fazer isso. Se você estiver usando controle de versão, adicione seu <code>.env</code> a um arquivo <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. Crie o arquivo `sendTx.js` {#create-sendtx-js}

Ótimo, agora que temos nossos dados confidenciais protegidos em um arquivo `.env`, vamos começar a programar. Para o nosso exemplo de envio de transação, enviaremos ETH de volta para o faucet da Sepolia.

Crie um arquivo `sendTx.js`, que é onde configuraremos e enviaremos nossa transação de exemplo, e adicione as seguintes linhas de código a ele:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: substitua este endereço pelo seu próprio endereço público

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // o nonce começa a contar a partir de 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // endereço do faucet para devolver o eth
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // campo de dados opcional para enviar mensagem ou executar contrato inteligente
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 O hash da sua transação é: ", hash, "\n Verifique a Mempool da Alchemy para ver o status da sua transação!");
    } else {
      console.log("❗Algo deu errado ao enviar sua transação:", error)
    }
   });
}

main();
```

Certifique-se de substituir o endereço na **linha 6** pelo seu próprio endereço público.

Agora, antes de começarmos a executar este código, vamos falar sobre alguns dos componentes aqui.

- `nonce` : A especificação do nonce é usada para acompanhar o número de transações enviadas do seu endereço. Precisamos disso por motivos de segurança e para evitar ataques de repetição (replay attacks). Para obter o número de transações enviadas do seu endereço, usamos [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count).
- `transaction`: O objeto da transação tem alguns aspectos que precisamos especificar
  - `to`: Este é o endereço para o qual queremos enviar ETH. Neste caso, estamos enviando ETH de volta para o [faucet da Sepolia](https://sepoliafaucet.com/) do qual solicitamos inicialmente.
  - `value`: Este é o valor que desejamos enviar, especificado em Wei, onde 10^18 Wei = 1 ETH
  - `gas`: Existem muitas maneiras de determinar a quantidade certa de gás a ser incluída na sua transação. A Alchemy suporta [webhooks](https://www.alchemy.com/docs/reference/webhooks-overview) que podem notificá-lo sobre atividades onchain. Para transações na Mainnet, é uma boa prática verificar as condições atuais do gás para determinar a quantidade certa de gás a ser incluída. 21000 é a quantidade mínima de gás que uma operação na Ethereum usará, então, para garantir que nossa transação seja executada, colocamos 30000 aqui.
  - `nonce`: veja a definição de nonce acima. O nonce começa a contar a partir de zero.
  - [OPCIONAL] data: Usado para enviar informações adicionais com sua transferência ou chamar um contrato inteligente, não é necessário para transferências de saldo, confira a nota abaixo.
- `signedTx`: Para assinar nosso objeto de transação, usaremos o método `signTransaction` com nossa `PRIVATE_KEY`
- `sendSignedTransaction`: Depois de termos uma transação assinada, podemos enviá-la para ser incluída em um bloco subsequente usando `sendSignedTransaction`

**Uma nota sobre dados (data)**
Existem dois tipos principais de transações que podem ser enviadas na Ethereum.

- Transferência de saldo: Enviar ETH de um endereço para outro. Nenhum campo de dados é necessário, no entanto, se você quiser enviar informações adicionais junto com sua transação, você pode incluir essas informações no formato HEX neste campo.
  - Por exemplo, digamos que queríamos escrever o hash de um documento IPFS na cadeia da Ethereum para dar a ele um carimbo de data/hora imutável. Nosso campo de dados deve então se parecer com data: `web3.utils.toHex(‘IPFS hash‘)`. E agora qualquer um pode consultar a cadeia e ver quando esse documento foi adicionado.
- Transação de contrato inteligente: Executar algum código de contrato inteligente na cadeia. Neste caso, o campo de dados deve conter a função inteligente que você deseja executar, juntamente com quaisquer parâmetros.
  - Para um exemplo prático, confira o [tutorial de Contrato Inteligente Hello World](/developers/tutorials/hello-world-smart-contract/).
### 8\. Execute o código usando `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Navegue de volta para o seu terminal ou linha de comando e execute:

```
node sendTx.js
```

### 9\. Veja sua transação na Mempool {#see-your-transaction-in-the-mempool}

Abra a [página da Mempool](https://dashboard.alchemy.com/mempool) no seu painel da Alchemy e filtre pelo aplicativo que você criou para encontrar sua transação. É aqui que podemos observar a transição da nossa transação do estado pendente para o estado minerado (se for bem-sucedida) ou para o estado descartado (dropped) se não for bem-sucedida. Certifique-se de mantê-lo em “All” (Todos) para capturar as transações “mined” (mineradas), “pending” (pendentes) e “dropped” (descartadas). Você também pode pesquisar sua transação procurando por transações enviadas para o endereço `0x31b98d14007bdee637298086988a0bbd31184523` .

Para visualizar os detalhes da sua transação depois de encontrá-la, selecione o hash da transação (tx hash), o que deve levá-lo a uma visualização parecida com esta:

![Captura de tela do observador da Mempool](./mempool.png)

A partir daí, você pode visualizar sua transação no Etherscan clicando no ícone circulado em vermelho!

**Iupiiii! Você acabou de enviar sua primeira transação na Ethereum usando a Alchemy 🎉**

_Para comentários e sugestões sobre este guia, envie uma mensagem para Elan no [Discord](https://discord.gg/A39JVCM) da Alchemy!_

_Publicado originalmente pela Alchemy._
