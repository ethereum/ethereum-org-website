---
title: "Começando com o desenvolvimento na Ethereum"
description: "Este é um guia para iniciantes sobre como começar a desenvolver na Ethereum. Vamos levá-lo desde a criação de um endpoint de API, passando por uma solicitação de linha de comando, até escrever seu primeiro script Web3! Nenhuma experiência em desenvolvimento de blockchain é necessária!"
author: "Elan Halpern"
tags: ["JavaScript", "ethers.js", "nós", "consultas", "Alchemy"]
skill: beginner
breadcrumb: "Começando"
lang: pt-br
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum and Alchemy logos](./ethereum-alchemy.png)

Este é um guia para iniciantes sobre como começar a desenvolver na Ethereum. Para este tutorial, usaremos a [Alchemy](https://alchemyapi.io/), a principal plataforma de desenvolvedores de blockchain que capacita milhões de usuários de 70% dos principais aplicativos de blockchain, incluindo Maker, 0x, MyEtherWallet, Dharma e Kyber. A Alchemy nos dará acesso a um endpoint de API na cadeia da Ethereum para que possamos ler e escrever transações.

Vamos levá-lo desde a inscrição na Alchemy até escrever seu primeiro script Web3! Nenhuma experiência em desenvolvimento de blockchain é necessária!

## 1. Inscreva-se para uma conta gratuita na Alchemy {#sign-up-for-a-free-alchemy-account}

Criar uma conta na Alchemy é fácil, [inscreva-se gratuitamente aqui](https://auth.alchemy.com/).

## 2. Crie um aplicativo na Alchemy {#create-an-alchemy-app}

Para se comunicar com a cadeia da Ethereum e usar os produtos da Alchemy, você precisa de uma chave de API para autenticar suas solicitações.

Você pode [criar chaves de API a partir do painel](https://dashboard.alchemy.com/). Para criar uma nova chave, navegue até “Create App” (Criar aplicativo), conforme mostrado abaixo:

Agradecimentos especiais à [_ShapeShift_](https://shapeshift.com/) _por nos permitir mostrar o painel deles!_

![Alchemy dashboard](./alchemy-dashboard.png)

Preencha os detalhes em “Create App” para obter sua nova chave. Você também pode ver os aplicativos que criou anteriormente e os criados por sua equipe aqui. Obtenha as chaves existentes clicando em “View Key” (Ver chave) para qualquer aplicativo.

![Create app with Alchemy screenshot](./create-app.png)

Você também pode obter chaves de API existentes passando o mouse sobre “Apps” e selecionando um. Você pode clicar em “View Key” aqui, bem como em “Edit App” (Editar aplicativo) para colocar domínios específicos na lista de permissões, ver várias ferramentas de desenvolvedor e visualizar análises.

![Gif showing a user how to pull API keys](./pull-api-keys.gif)

## 3. Faça uma solicitação a partir da linha de comando {#make-a-request-from-the-command-line}

Interaja com a blockchain da Ethereum através da Alchemy usando JSON-RPC e curl.

Para solicitações manuais, recomendamos interagir com o `JSON-RPC` via solicitações `POST`. Basta passar o cabeçalho `Content-Type: application/json` e sua consulta como o corpo do `POST` com os seguintes campos:

- `jsonrpc`: A versão do JSON-RPC — atualmente, apenas `2.0` é suportada.
- `method`: O método da API ETH. [Veja a referência da API.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: Uma lista de parâmetros para passar para o método.
- `id`: O ID da sua solicitação. Será retornado pela resposta para que você possa acompanhar a qual solicitação uma resposta pertence.

Aqui está um exemplo que você pode executar a partir da linha de comando para recuperar o preço do gás atual:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**NOTA:** Substitua [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) pela sua própria chave de API `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`._

**Resultados:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Configure seu cliente Web3 {#set-up-your-web3-client}

**Se você tiver um cliente existente,** altere a URL do seu provedor de nó atual para uma URL da Alchemy com sua chave de API: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_NOTA:_** Os scripts abaixo precisam ser executados em um **contexto de nó** ou **salvos em um arquivo**, e não executados a partir da linha de comando. Se você ainda não tem o Node ou o npm instalados, confira este rápido [guia de configuração para Macs](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs).

Existem várias [bibliotecas Web3](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) que você pode integrar com a Alchemy, no entanto, recomendamos o uso da [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), um substituto direto para a Web3.js, construído e configurado para funcionar perfeitamente com a Alchemy. Isso oferece várias vantagens, como novas tentativas automáticas e suporte robusto a WebSocket.

Para instalar a AlchemyWeb3.js, **navegue até o diretório do seu projeto** e execute:

**Com Yarn:**

```
yarn add @alch/alchemy-web3
```

**Com NPM:**

```
npm install @alch/alchemy-web3
```

Para interagir com a infraestrutura de nó da Alchemy, execute no NodeJS ou adicione isto a um arquivo JavaScript:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. Escreva seu primeiro script Web3! {#write-your-first-web3-script}

Agora, para colocar a mão na massa com um pouco de programação Web3, escreveremos um script simples que imprime o número do bloco mais recente da Rede Principal do Ethereum.

**1. Se você ainda não o fez, no seu terminal crie um novo diretório de projeto e entre nele com cd:**

```
mkdir web3-example
cd web3-example
```

**2. Instale a dependência Web3 da Alchemy (ou qualquer Web3) em seu projeto, se ainda não o fez:**

```
npm install @alch/alchemy-web3
```

**3. Crie um arquivo chamado `index.js` e adicione o seguinte conteúdo:**

> Você deve, em última análise, substituir `demo` pela sua chave de API HTTP da Alchemy.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

Não está familiarizado com coisas assíncronas? Confira esta [postagem no Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

**4. Execute-o em seu terminal usando o node**

```
node index.js
```

**5. Agora você deve ver a saída do número do bloco mais recente em seu console!**

```
O número do bloco mais recente é 11043912
```

**Uau! Parabéns! Você acabou de escrever seu primeiro script Web3 usando a Alchemy 🎉**

Não sabe o que fazer a seguir? Tente implantar seu primeiro contrato inteligente e coloque a mão na massa com um pouco de programação em Solidity em nosso [Guia de Contrato Inteligente Hello World](https://www.alchemy.com/docs/hello-world-smart-contract), ou teste seu conhecimento do painel com o [Aplicativo de Demonstração do Painel](https://docs.alchemyapi.io/tutorials/demo-app)!

_[Inscreva-se gratuitamente na Alchemy](https://auth.alchemy.com/), confira nossa [documentação](https://www.alchemy.com/docs/) e, para as últimas notícias, siga-nos no [Twitter](https://twitter.com/AlchemyPlatform)_.