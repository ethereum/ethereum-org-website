---
title: "Enviando transações usando Web3"
description: "Este é um guia amigável para iniciantes para enviar transações do Ethereum usando Web3. Existem três etapas principais para enviar uma transação para a blockchain Ethereum: criar, assinar e transmitir. Analisaremos todas as três."
author: "Elan Halpern"
tags: [ "transações", "web3.js", "alchemy" ]
skill: beginner
lang: pt-br
published: 2020-11-04
source: "Documentação do Alchemy"
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Este é um guia amigável para iniciantes para enviar transações do Ethereum usando Web3. Existem três etapas principais para enviar uma transação para a blockchain Ethereum: criar, assinar e transmitir. Analisaremos todas as três, esperando responder a quaisquer perguntas que você possa ter! Neste tutorial, usaremos a [Alchemy](https://www.alchemy.com/) para enviar nossas transações para a cadeia Ethereum. Você pode [criar uma conta gratuita da Alchemy aqui](https://auth.alchemyapi.io/signup).

**NOTA:** Este guia é para assinar suas transações no _backend_ do seu aplicativo. Se você quiser integrar a assinatura de suas transações no frontend, confira a integração do [Web3 com um provedor de navegador](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider).

## O Básico {#the-basics}

Como a maioria dos desenvolvedores de blockchain quando começam, você pode ter pesquisado sobre como enviar uma transação (algo que deveria ser bem simples) e se deparado com uma infinidade de guias, cada um dizendo coisas diferentes e deixando você um pouco sobrecarregado e confuso. Se você está nesse barco, não se preocupe; todos nós já estivemos em algum momento! Então, antes de começarmos, vamos esclarecer algumas coisas:

### 1. A Alchemy não armazena suas chaves privadas {#alchemy-does-not-store-your-private-keys}

- Isso significa que a Alchemy não pode assinar e enviar transações em seu nome. Isso ocorre por motivos de segurança. A Alchemy nunca pedirá que você compartilhe sua chave privada, e você nunca deve compartilhar sua chave privada com um nó hospedado (ou com qualquer pessoa).
- Você pode ler da blockchain usando a API principal da Alchemy, mas para escrever nela, você precisará usar outra coisa para assinar suas transações antes de enviá-las através da Alchemy (o mesmo vale para qualquer outro [serviço de nó](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2. O que é um “assinador”? {#what-is-a-signer}

- Assinadores assinarão transações para você usando sua chave privada. Neste tutorial, usaremos o [Alchemy web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) para assinar nossa transação, mas você também pode usar qualquer outra biblioteca web3.
- No frontend, um bom exemplo de um assinador seria o [MetaMask](https://metamask.io/), que assinará e enviará transações em seu nome.

### 3. Por que preciso assinar minhas transações? {#why-do-i-need-to-sign-my-transactions}

- Todo usuário que queira enviar uma transação na rede Ethereum deve assinar a transação (usando sua chave privada), a fim de validar que a origem da transação é quem ela afirma ser.
- É super importante proteger esta chave privada, pois ter acesso a ela concede controle total sobre sua conta Ethereum, permitindo que você (ou qualquer pessoa com acesso) realize transações em seu nome.

### 4. Como eu protejo minha chave privada? {#how-do-i-protect-my-private-key}

- Há muitas maneiras de proteger sua chave privada e usá-la para enviar transações. Neste tutorial, usaremos um arquivo `.env`. No entanto, você também pode usar um provedor separado que armazena chaves privadas, usar um arquivo keystore ou outras opções.

### 5. Qual é a diferença entre `eth_sendTransaction` e `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` e `eth_sendRawTransaction` são ambas funções da API do Ethereum que transmitem uma transação para a rede Ethereum para que ela seja adicionada a um bloco futuro. Elas diferem na forma como lidam com a assinatura das transações.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) é usado para enviar transações _não assinadas_, o que significa que o nó para o qual você está enviando deve gerenciar sua chave privada para que possa assinar a transação antes de transmiti-la para a cadeia. Como a Alchemy não armazena as chaves privadas dos usuários, ela não oferece suporte a este método.
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) é usado para transmitir transações que já foram assinadas. Isso significa que primeiro você precisa usar [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction), e então passar o resultado para `eth_sendRawTransaction`.

Ao usar web3, `eth_sendRawTransaction` é acessado chamando a função [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction).

É isso que usaremos neste tutorial.

### 6. O que é a biblioteca web3? {#what-is-the-web3-library}

- Web3.js é uma biblioteca wrapper em torno das chamadas JSON-RPC padrão que é bastante comum de usar no desenvolvimento Ethereum.
- Existem muitas bibliotecas web3 para diferentes linguagens. Neste tutorial, usaremos o [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) que é escrito em JavaScript. Você pode conferir outras opções [aqui](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) como o [ethers.js](https://docs.ethers.org/v5/).

Ok, agora que esclarecemos algumas dessas questões, vamos para o tutorial. Sinta-se à vontade para fazer perguntas a qualquer momento no [discord](https://discord.gg/gWuC7zB) da Alchemy!

### 7. Como enviar transações seguras, com gás otimizado e privadas? {#how-to-send-secure-gas-optimized-and-private-transactions}

- A [Alchemy tem um conjunto de APIs Transact](https://docs.alchemy.com/reference/transact-api-quickstart). Você pode usá-las para enviar transações reforçadas, simular transações antes que elas aconteçam, enviar transações privadas e enviar transações com gás otimizado.
- Você também pode usar a [API Notify](https://docs.alchemy.com/docs/alchemy-notify) para ser alertado quando sua transação for retirada da mempool e adicionada à cadeia.

**NOTA:** Este guia requer uma conta Alchemy, um endereço Ethereum ou carteira MetaMask, NodeJs e npm instalados. Caso contrário, siga estas etapas:

1. [Crie uma conta gratuita da Alchemy](https://auth.alchemyapi.io/signup)
2. [Crie uma conta MetaMask](https://metamask.io/) (ou obtenha um endereço Ethereum)
3. [Siga estes passos para instalar o NodeJs e o NPM](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## Etapas para enviar sua transação {#steps-to-sending-your-transaction}

### 1. Crie um aplicativo da Alchemy na rede de teste Sepolia {#create-an-alchemy-app-on-the-sepolia-testnet}

Navegue até o seu [Painel da Alchemy](https://dashboard.alchemyapi.io/) e crie um novo aplicativo, escolhendo Sepolia (ou qualquer outra rede de teste) como sua rede.

### 2. Solicite ETH do faucet da Sepolia {#request-eth-from-sepolia-faucet}

Siga as instruções no [faucet Sepolia da Alchemy](https://www.sepoliafaucet.com/) para receber ETH. Certifique-se de incluir seu endereço Ethereum da **Sepolia** (da MetaMask) e não de outra rede. Após seguir as instruções, verifique novamente se você recebeu o ETH em sua carteira.

### 3. Crie um novo diretório de projeto e entre nele com `cd` {#create-a-new-project-direction}

Crie um novo diretório de projeto na linha de comando (terminal para Macs) e navegue para dentro dele:

```
mkdir sendtx-example
cd sendtx-example
```

### 4. Instale o Alchemy Web3 (ou qualquer biblioteca web3) {#install-alchemy-web3}

Execute o seguinte comando em seu diretório de projeto para instalar o [Alchemy Web3](https://docs.alchemy.com/reference/api-overview):

Observação: se você quiser usar a biblioteca ethers.js, [siga as instruções aqui](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5. Instale o dotenv {#install-dotenv}

Usaremos um arquivo `.env` para armazenar com segurança nossa chave de API e chave privada.

```
npm install dotenv --save
```

### 6. Crie o arquivo `.env` {#create-the-dotenv-file}

Crie um arquivo `.env` em seu diretório de projeto e adicione o seguinte (substituindo "`your-api-url`" e "`your-private-key`")

- Para encontrar sua URL da API da Alchemy, navegue até a página de detalhes do aplicativo que você acabou de criar em seu painel, clique em “Ver Chave” no canto superior direito e pegue a URL HTTP.
- Para encontrar sua chave privada usando o MetaMask, confira este [guia](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Não faça commit do <code>.env</code>! Por favor, certifique-se de nunca compartilhar ou expor seu arquivo <code>.env</code> com ninguém, pois você está comprometendo seus segredos ao fazer isso. Se você estiver usando controle de versão, adicione seu <code>.env</code> a um arquivo <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7. Crie o arquivo `sendTx.js` {#create-sendtx-js}

Ótimo, agora que temos nossos dados confidenciais protegidos em um arquivo `.env`, vamos começar a programar. Para nosso exemplo de envio de transação, enviaremos ETH de volta para o faucet da Sepolia.

Crie um arquivo `sendTx.js`, que é onde vamos configurar e enviar nossa transação de exemplo, e adicione as seguintes linhas de código a ele:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: substitua este endereço pelo seu próprio endereço público

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // o nonce começa a contagem em 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // endereço do faucet para devolver o ETH
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

Agora, antes de executarmos este código, vamos falar sobre alguns dos componentes aqui.

- `nonce`: A especificação do nonce é usada para rastrear o número de transações enviadas do seu endereço. Precisamos disso para fins de segurança e para evitar [ataques de repetição (replay attacks)](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Para obter o número de transações enviadas do seu endereço, usamos [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).
- `transaction`: O objeto da transação tem alguns aspectos que precisamos especificar
  - `to`: Este é o endereço para o qual queremos enviar ETH. Neste caso, estamos enviando ETH de volta para o [faucet da Sepolia](https://sepoliafaucet.com/) do qual solicitamos inicialmente.
  - `value`: Esta é a quantia que desejamos enviar, especificada em Wei, onde 10^18 Wei = 1 ETH
  - `gas`: Há muitas maneiras de determinar a quantidade certa de gás a ser incluída em sua transação. A Alchemy tem até um [webhook de preço de gás](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1) para notificá-lo quando o preço do gás cair para dentro de um certo limite. Para transações na Mainnet, é uma boa prática verificar um estimador de gás como a [ETH Gas Station](https://ethgasstation.info/) para determinar a quantidade certa de gás a incluir. 21000 é a quantidade mínima de gás que uma operação no Ethereum usará; portanto, para garantir que nossa transação seja executada, colocamos 30000 aqui.
  - `nonce`: veja a definição de nonce acima. A contagem do Nonce começa do zero.
  - [OPCIONAL] data: Usado para enviar informações adicionais com sua transferência, ou para chamar um contrato inteligente, não é necessário para transferências de saldo, confira a nota abaixo.
- `signedTx`: Para assinar nosso objeto de transação, usaremos o método `signTransaction` com nossa `PRIVATE_KEY`
- `sendSignedTransaction`: Depois que tivermos uma transação assinada, podemos enviá-la para ser incluída em um bloco subsequente usando `sendSignedTransaction`

**Uma observação sobre dados**
Existem dois tipos principais de transações que podem ser enviadas no Ethereum.

- Transferência de saldo: Envie ETH de um endereço para outro. Nenhum campo de dados é necessário; no entanto, se você quiser enviar informações adicionais junto com sua transação, poderá incluir essas informações no formato HEX neste campo.
  - Por exemplo, digamos que quiséssemos escrever o hash de um documento IPFS na blockchain Ethereum para dar a ele um carimbo de data/hora (timestamp) imutável. Nosso campo de dados ficaria então como: `web3.utils.toHex(‘hash IPFS‘)`. E agora qualquer pessoa pode consultar a cadeia e ver quando esse documento foi adicionado.
- Transação de contrato inteligente: Execute algum código de contrato inteligente na cadeia. Neste caso, o campo de dados deve conter a função inteligente que você deseja executar, juntamente com quaisquer parâmetros.
  - Para um exemplo prático, confira o Passo 8 neste [Tutorial Olá Mundo](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction).

### 8. Execute o código usando `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Volte para o seu terminal ou linha de comando e execute:

```
node sendTx.js
```

### 9. Veja sua transação na Mempool {#see-your-transaction-in-the-mempool}

Abra a [página da Mempool](https://dashboard.alchemyapi.io/mempool) em seu painel da Alchemy e filtre pelo aplicativo que você criou para encontrar sua transação. É aqui que podemos observar a transição de nossa transação do estado pendente para o estado minerado (se bem-sucedida) ou para o estado descartado, se malsucedida. Certifique-se de mantê-lo em “Todos” para que você capture transações “mineradas”, “pendentes” e “descartadas”. Você também pode pesquisar sua transação procurando por transações enviadas para o endereço `0x31b98d14007bdee637298086988a0bbd31184523`.

Para ver os detalhes da sua transação assim que a encontrar, selecione o hash da tx, que o levará a uma visualização como esta:

![Captura de tela do observador da Mempool](./mempool.png)

De lá, você pode visualizar sua transação no Etherscan clicando no ícone circulado em vermelho!

**Eba!** Você acabou de enviar sua primeira transação Ethereum usando a Alchemy 🎉\*\*

_Para feedback e sugestões sobre este guia, envie uma mensagem para Elan no [Discord](https://discord.gg/A39JVCM) da Alchemy!_

_Originalmente publicado em [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_
