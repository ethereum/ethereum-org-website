---
title: "Introdução ao Desenvolvimento na Ethereum"
description: "Este é um guia para iniciantes no desenvolvimento na Ethereum. Vamos guiar você desde a criação de um ponto de extremidade de API, passando pela criação de uma solicitação de linha de comando, até a escrita de seu primeiro script web3! Não é necessária experiência em desenvolvimento de cadeia de blocos!"
author: "Elan Halpern"
tags:
  [
    "javascript",
    "ethers.js",
    "nós",
    "consultando",
    "alchemy"
  ]
skill: beginner
lang: pt-br
published: 2020-10-30
source: "Médio"
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Logos do Ethereum e da Alchemy](./ethereum-alchemy.png)

Este é um guia para iniciantes para começar o desenvolvimento na Ethereum. Para este tutorial, usaremos a [Alchemy](https://alchemyapi.io/), a plataforma líder para desenvolvedores de cadeia de blocos que atende a milhões de usuários de 70% dos principais aplicativos de cadeia de blocos, incluindo Maker, 0x, MyEtherWallet, Dharma e Kyber. A Alchemy nos dará acesso a um ponto de extremidade de API na cadeia Ethereum para que possamos ler e escrever transações.

Vamos guiar você desde a inscrição na Alchemy até a escrita do seu primeiro script web3! Não é necessária experiência em desenvolvimento de cadeia de blocos!

## 1. Inscreva-se para obter uma conta gratuita da Alchemy {#sign-up-for-a-free-alchemy-account}

Criar uma conta na Alchemy é fácil, [inscreva-se gratuitamente aqui](https://auth.alchemy.com/).

## 2. Crie um aplicativo da Alchemy {#create-an-alchemy-app}

Para se comunicar com a cadeia Ethereum e usar os produtos da Alchemy, você precisa de uma chave de API para autenticar suas solicitações.

Você pode [criar chaves de API a partir do painel](https://dashboard.alchemy.com/). Para criar uma nova chave, navegue até "Create App", como mostrado abaixo:

Agradecimentos especiais à [_ShapeShift_](https://shapeshift.com/) _por nos permitir mostrar o painel deles!_

![Painel da Alchemy](./alchemy-dashboard.png)

Preencha os detalhes em "Create App" para obter sua nova chave. Você também pode ver aqui os aplicativos que criou anteriormente e os que foram feitos pela sua equipe. Obtenha chaves existentes clicando em "View Key" para qualquer aplicativo.

![Captura de tela da criação de um aplicativo com a Alchemy](./create-app.png)

Você também pode obter chaves de API existentes passando o mouse sobre "Apps" e selecionando uma. Você pode usar o "View Key" aqui, bem como o "Edit App" para adicionar domínios específicos à lista de permissões, ver várias ferramentas de desenvolvedor e visualizar as análises.

![Gif mostrando um usuário obtendo chaves de API](./pull-api-keys.gif)

## 3. Faça uma solicitação a partir da linha de comando {#make-a-request-from-the-command-line}

Interaja com a cadeia de blocos Ethereum através da Alchemy usando JSON-RPC e curl.

Para solicitações manuais, recomendamos interagir com o `JSON-RPC` por meio de solicitações `POST`. Basta passar o cabeçalho `Content-Type: application/json` e sua consulta como o corpo do `POST` com os seguintes campos:

- `jsonrpc`: a versão do JSON-RPC — atualmente, apenas a `2.0` é suportada.
- `method`: o método da API ETH. [Consulte a referência da API.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: uma lista de parâmetros a serem passados para o método.
- `id`: o ID da sua solicitação. Ele será retornado pela resposta para que você possa rastrear a qual solicitação uma resposta pertence.

Aqui está um exemplo que você pode executar na linha de comando para obter o preço atual do gás:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**OBSERVAÇÃO:** substitua [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) pela sua própria chave de API `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`._

**Resultados:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Configure seu cliente Web3 {#set-up-your-web3-client}

**Se você já tiver um cliente,** altere o URL do provedor do nó atual para um URL da Alchemy com sua chave de API: `"https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_OBSERVAÇÃO:_** os scripts abaixo precisam ser executados em um **contexto de nó** ou **salvos em um arquivo**, e não executados a partir da linha de comando. Se você ainda não tiver o Node ou o npm instalado, confira este [guia de configuração rápida para Macs](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs).

Existem inúmeras [bibliotecas Web3](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) que você pode integrar com a Alchemy. No entanto, recomendamos o uso da [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), um substituto direto para web3.js, criado e configurado para funcionar perfeitamente com a Alchemy. Isso oferece várias vantagens, como novas tentativas automáticas e suporte robusto a WebSocket.

Para instalar o AlchemyWeb3.js, **navegue até o diretório do seu projeto** e execute:

**Com Yarn:**

```
yarn add @alch/alchemy-web3
```

**Com NPM:**

```
npm install @alch/alchemy-web3
```

Para interagir com a infraestrutura de nós da Alchemy, execute no NodeJS ou adicione isto a um arquivo JavaScript:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. Escreva seu primeiro Script Web3! {#write-your-first-web3-script}

Agora, para pôr a mão na massa com um pouco de programação web3, escreveremos um script simples que imprime o número do bloco mais recente da Mainnet do Ethereum.

**1. Se ainda não o fez, crie um novo diretório de projeto em seu terminal e acesse-o com o comando cd:**

```
mkdir web3-example
cd web3-example
```

**2. Instale a dependência do Alchemy web3 (ou qualquer web3) em seu projeto, caso ainda não o tenha feito:**

```
npm install @alch/alchemy-web3
```

**3. Crie um arquivo chamado `index.js` e adicione o seguinte conteúdo:**

> Você deve, por fim, substituir `demo` por sua chave de API HTTP da Alchemy.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("O número do bloco mais recente é " + blockNumber)
}
main()
```

Não está familiarizado com programação assíncrona? Confira esta [publicação no Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

\*\*4. Execute-o no seu terminal usando **node**

```
node index.js
```

**5. Agora você deve ver o número do bloco mais recente exibido em seu console!**

```
O número do bloco mais recente é 11043912
```

**Eba!** Parabéns! Você acabou de escrever seu primeiro script web3 usando a Alchemy 🎉\*\*

Não sabe o que fazer a seguir? Tente implantar seu primeiro contrato inteligente e se aventurar um pouco na programação em Solidity com nosso [Guia de Contrato Inteligente Hello World](https://www.alchemy.com/docs/hello-world-smart-contract), ou teste seus conhecimentos sobre o painel com o [Aplicativo de Demonstração do Painel](https://docs.alchemyapi.io/tutorials/demo-app)!

_[Inscreva-se na Alchemy gratuitamente](https://auth.alchemy.com/), confira nossa [documentação](https://www.alchemy.com/docs/) e, para receber as notícias mais recentes, siga-nos no [Twitter](https://twitter.com/AlchemyPlatform)_.
