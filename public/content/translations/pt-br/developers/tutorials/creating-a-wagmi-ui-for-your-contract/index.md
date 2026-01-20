---
title: "Construindo uma interface de usuário para seu contrato"
description: Usando componentes modernos como TypeScript, React, Vite e Wagmi, vamos abordar uma interface de usuário moderna, mas minimalista, e aprender como conectar uma carteira à interface do usuário, chamar um contrato inteligente para ler informações, enviar uma transação para um contrato inteligente e monitorar eventos de um contrato inteligente para identificar alterações.
author: |
  Ori Pomerantz
tags: [ "typescript", "react", "vite", "wagmi", "front-end" ]
skill: beginner
published: 01/11/2023
lang: pt-br
sidebarDepth: 3
---

Você encontrou um recurso que precisamos no ecossistema Ethereum. Você escreveu os contratos inteligentes para implementá-lo, e talvez até algum código relacionado que é executado fora da cadeia. Isso é ótimo! Infelizmente, sem uma interface de usuário, você não terá nenhum usuário, e da última vez que você escreveu um site, as pessoas usavam modems de discagem e o JavaScript era novo.

Este artigo é para você. Presumo que você saiba programar, e talvez um pouco de JavaScript e HTML, mas que suas habilidades de interface de usuário estejam enferrujadas e desatualizadas. Juntos, vamos analisar uma aplicação moderna simples para que você veja como isso é feito hoje em dia.

## Por que isso é importante {#why-important}

Na teoria, você poderia simplesmente fazer com que as pessoas usassem o [Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract) ou o [Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract) para interagir com seus contratos. Isso será ótimo para os Ethereans experientes. Mas estamos tentando servir a [mais um bilhão de pessoas](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). Isso não acontecerá sem uma ótima experiência do usuário, e uma interface de usuário amigável é uma grande parte disso.

## Aplicação Greeter {#greeter-app}

Há muita teoria por trás do funcionamento de uma UI moderna, e [muitos sites bons](https://react.dev/learn/thinking-in-react) [que explicam isso](https://wagmi.sh/core/getting-started). Em vez de repetir o bom trabalho feito por esses sites, vou presumir que você prefere aprender fazendo e começar com uma aplicação com a qual possa interagir. Você ainda precisa da teoria para fazer as coisas, e chegaremos lá — vamos apenas passar de arquivo fonte por arquivo fonte e discutir as coisas à medida que as encontrarmos.

### Instalação {#installation}

1. Se necessário, adicione a [cadeia de blocos Holesky](https://chainlist.org/?search=holesky&testnets=true) à sua carteira e [obtenha ETH de teste](https://www.holeskyfaucet.io/).

2. Clone o repositório do github.

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

3. Instale os pacotes necessários.

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

4. Inicie a aplicação.

   ```sh
   pnpm dev
   ```

5. Navegue até o URL mostrado pela aplicação. Na maioria dos casos, é [http://localhost:5173/](http://localhost:5173/).

6. Você pode ver o código-fonte do contrato, uma versão ligeiramente modificada do Greeter da Hardhat, [em um explorador de blockchain](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract).

### Passo a passo dos arquivos {#file-walk-through}

#### `index.html` {#index-html}

Este arquivo é um boilerplate HTML padrão, exceto por esta linha, que importa o arquivo de script.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

A extensão do arquivo nos diz que este arquivo é um [componente React](https://www.w3schools.com/react/react_components.asp) escrito em [TypeScript](https://www.typescriptlang.org/), uma extensão do JavaScript que suporta [verificação de tipo](https://en.wikipedia.org/wiki/Type_system#Type_checking). O TypeScript é compilado para JavaScript, então podemos usá-lo para execução do lado do cliente.

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

Importe o código da biblioteca que precisamos.

```tsx
import { App } from './App'
```

Importe o componente React que implementa a aplicação (veja abaixo).

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Crie o componente React raiz. O parâmetro para `render` é [JSX](https://www.w3schools.com/react/react_jsx.asp), uma linguagem de extensão que usa tanto HTML quanto JavaScript/TypeScript. O ponto de exclamação aqui diz ao componente TypeScript: "você não sabe que `document.getElementById('root')` será um parâmetro válido para `ReactDOM.createRoot`, mas não se preocupe - eu sou o desenvolvedor e estou lhe dizendo que haverá".

```tsx
  <React.StrictMode>
```

A aplicação está dentro de um [componente `React.StrictMode`](https://react.dev/reference/react/StrictMode). Este componente diz à biblioteca React para inserir verificações de depuração adicionais, o que é útil durante o desenvolvimento.

```tsx
    <WagmiConfig config={config}>
```

A aplicação também está dentro de um [componente `WagmiConfig`](https://wagmi.sh/react/api/WagmiProvider). [A biblioteca wagmi (we are going to make it)](https://wagmi.sh/) conecta as definições da UI do React com [a biblioteca viem](https://viem.sh/) para escrever um aplicativo descentralizado da Ethereum.

```tsx
      <RainbowKitProvider chains={chains}>
```

E, finalmente, [um componente `RainbowKitProvider`](https://www.rainbowkit.com/). Este componente lida com o login e a comunicação entre a carteira e a aplicação.

```tsx
        <App />
```

Agora podemos ter o componente para a aplicação, que realmente implementa a UI. O `/>` no final do componente diz ao React que este componente não tem nenhuma definição dentro dele, conforme o padrão XML.

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

Claro, temos que fechar os outros componentes.

#### `src/App.tsx` {#app-tsx}

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

Esta é a maneira padrão de criar um componente React - definir uma função que é chamada toda vez que precisa ser renderizada. Esta função normalmente tem algum código TypeScript ou JavaScript no início, seguido por uma declaração `return` que retorna o código JSX.

```tsx
  const { isConnected } = useAccount()
```

Aqui usamos [`useAccount`](https://wagmi.sh/react/api/hooks/useAccount) para verificar se estamos conectados a uma cadeia de blocos através de uma carteira ou não.

Por convenção, em React, funções chamadas `use...` são [hooks](https://www.w3schools.com/react/react_hooks.asp) que retornam algum tipo de dado. Quando você usa esses hooks, não apenas seu componente obtém os dados, mas quando esses dados mudam, o componente é renderizado novamente com as informações atualizadas.

```tsx
  return (
    <>
```

O JSX de um componente React _tem_ que retornar um componente. Quando temos múltiplos componentes e não temos nada que os envolva "naturalmente", usamos um componente vazio (`<> ... </>`) para transformá-los em um único componente.

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

Obtemos o [componente `ConnectButton`](https://www.rainbowkit.com/docs/connect-button) do RainbowKit. Quando não estamos conectados, ele nos dá um botão `Conectar Carteira` que abre um modal que explica sobre carteiras e permite que você escolha qual usar. Quando estamos conectados, ele exibe a cadeia de blocos que usamos, o endereço da nossa conta e nosso saldo de ETH. Podemos usar essas exibições para trocar de rede ou para desconectar.

```tsx
      {isConnected && (
```

Quando precisamos inserir JavaScript real (ou TypeScript que será compilado para JavaScript) em um JSX, usamos chaves (`{}`).

A sintaxe `a && b` é uma abreviação de [`a ?` b : a`](https://www.w3schools.com/react/react_es6_ternary.asp). Ou seja, se `a`for verdadeiro, ele avalia para`b`, caso contrário, avalia para `a`(que pode ser`falso`, `0\`, etc.). Esta é uma maneira fácil de dizer ao React que um componente só deve ser exibido se uma determinada condição for satisfeita.

Neste caso, só queremos mostrar `Greeter` ao usuário se o usuário estiver conectado a uma cadeia de blocos.

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

Este arquivo contém a maior parte da funcionalidade da UI. Ele inclui definições que normalmente estariam em vários arquivos, mas como este é um tutorial, o programa é otimizado para ser fácil de entender na primeira vez, em vez de desempenho ou facilidade de manutenção.

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork,
          useReadContract,
          usePrepareContractWrite,
          useContractWrite,
          useContractEvent
        } from 'wagmi'
```

Usamos estas funções de biblioteca. Novamente, elas são explicadas abaixo onde são usadas.

```tsx
import { AddressType } from 'abitype'
```

[A biblioteca `abitype`](https://abitype.dev/) nos fornece definições TypeScript para vários tipos de dados do Ethereum, como [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

A ABI para o contrato `Greeter`.
Se você estiver desenvolvendo os contratos e a UI ao mesmo tempo, normalmente os colocaria no mesmo repositório e usaria a ABI gerada pelo compilador Solidity como um arquivo em sua aplicação. No entanto, isso não é necessário aqui porque o contrato já está desenvolvido e não vai mudar.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

O TypeScript é fortemente tipado. Usamos essa definição para especificar o endereço em que o contrato `Greeter` é implantado em diferentes cadeias. A chave é um número (o chainId), e o valor é um `AddressType` (um endereço).

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // Holesky
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // Sepolia
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

O endereço do contrato nas duas redes suportadas: [Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code) e [Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code).

Nota: Existe na verdade uma terceira definição, para Redstone Holesky, que será explicada abaixo.

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

Este tipo é usado como um parâmetro para o componente `ShowObject` (explicado mais adiante). Ele inclui o nome do objeto e seu valor, que são exibidos para fins de depuração.

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

A qualquer momento, podemos saber qual é a saudação (porque a lemos da cadeia de blocos) ou não saber (porque ainda não a recebemos). Portanto, é útil ter um tipo que pode ser uma string ou nada.

##### Componente `Greeter` {#greeter-component}

```tsx
const Greeter = () => {
```

Finalmente, chegamos à definição do componente.

```tsx
  const { chain } = useNetwork()
```

Informações sobre a cadeia que estamos usando, cortesia de [wagmi](https://wagmi.sh/react/hooks/useNetwork).
Como isso é um hook (`use...`), toda vez que essa informação muda, o componente é redesenhado.

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

O endereço do contrato Greeter, que varia por cadeia (e que é `undefined` se não tivermos informações da cadeia ou estivermos em uma cadeia sem esse contrato).

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // Sem argumentos
    watch: true
  })
```

[O hook `useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) lê informações de um contrato. Você pode ver exatamente quais informações ele retorna expandindo `readResults` na UI. Neste caso, queremos que ele continue verificando para sermos informados quando a saudação mudar.

**Nota:** Poderíamos escutar os [eventos `setGreeting`](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs) para saber quando a saudação muda e atualizar dessa forma. No entanto, embora possa ser mais eficiente, não se aplicará em todos os casos. Quando o usuário muda para uma cadeia diferente, a saudação também muda, mas essa mudança não é acompanhada por um evento. Poderíamos ter uma parte do código escutando eventos e outra para identificar mudanças de cadeia, mas isso seria mais complicado do que apenas definir [o parâmetro `watch`](https://wagmi.sh/react/api/hooks/useReadContract#watch-optional).

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

O [hook `useState`](https://www.w3schools.com/react/react_usestate.asp) do React nos permite especificar uma variável de estado, cujo valor persiste de uma renderização do componente para outra. O valor inicial é o parâmetro, neste caso, a string vazia.

O hook `useState` retorna uma lista com dois valores:

1. O valor atual da variável de estado.
2. Uma função para modificar a variável de estado quando necessário. Como este é um hook, toda vez que ele é chamado, o componente é renderizado novamente.

Neste caso, estamos usando uma variável de estado para a nova saudação que o usuário deseja definir.

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) =>
    setNewGreeting(evt.target.value)
```

Este é o manipulador de eventos para quando o campo de entrada da nova saudação muda. O tipo, [`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/), especifica que este é um manipulador para uma mudança de valor de um elemento de entrada HTML. A parte `<HTMLInputElement>` é usada porque este é um [tipo genérico](https://www.w3schools.com/typescript/typescript_basic_generics.php).

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)
```

Este é o processo para enviar uma transação de blockchain da perspectiva do cliente:

1. Envie a transação para um nó na cadeia de blocos usando [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Aguarde uma resposta do nó.
3. Quando a resposta for recebida, peça ao usuário para assinar a transação através da carteira. Esta etapa _tem_ que acontecer depois que a resposta do nó for recebida, porque o custo do gás da transação é mostrado ao usuário antes que ele a assine.
4. Aguarde a aprovação do usuário.
5. Envie a transação novamente, desta vez usando [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

A etapa 2 provavelmente levará um tempo perceptível, durante o qual os usuários se perguntariam se seu comando foi realmente recebido pela interface do usuário e por que ainda não lhes foi pedido para assinar a transação. Isso gera uma má experiência do usuário (UX).

A solução é usar [hooks de preparação](https://wagmi.sh/react/prepare-hooks). Toda vez que um parâmetro muda, envie imediatamente ao nó a solicitação `eth_estimateGas`. Então, quando o usuário realmente quer enviar a transação (neste caso, pressionando **Atualizar saudação**), o custo do gás é conhecido e o usuário pode ver a página da carteira imediatamente.

```tsx
  return (
```

Agora podemos finalmente criar o HTML real para retornar.

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

Crie um componente `ShowGreeting` (explicado abaixo), mas somente se a saudação for lida com sucesso da cadeia de blocos.

```tsx
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
```

Este é o campo de texto de entrada onde o usuário pode definir uma nova saudação. Toda vez que o usuário pressiona uma tecla, chamamos `greetingChange`, que chama `setNewGreeting`. Como `setNewGreeting` vem do hook `useState`, ele faz com que o componente `Greeter` seja renderizado novamente. Isso significa que:

- Precisamos especificar `value` para manter o valor da nova saudação, porque, caso contrário, ele voltaria ao padrão, a string vazia.
- `usePrepareContractWrite` é chamado toda vez que `newGreeting` muda, o que significa que ele sempre terá o `newGreeting` mais recente na transação preparada.

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        Atualizar saudação
      </button>
```

Se não houver `workingTx.write`, ainda estamos aguardando as informações necessárias para enviar a atualização da saudação, então o botão está desabilitado. Se houver um valor `workingTx.write`, essa é a função a ser chamada para enviar a transação.

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
}
```

Finalmente, para ajudar você a ver o que estamos fazendo, mostramos os três objetos que usamos:

- `readResults`
- `preparedTx`
- `workingTx`

##### Componente `ShowGreeting` {#showgreeting-component}

Este componente mostra

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

A função de um componente recebe um parâmetro com todos os atributos do componente.

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### Componente `ShowObject` {#showobject-component}

Para fins informativos, usamos o componente `ShowObject` para mostrar os objetos importantes (`readResults` para ler a saudação e `preparedTx` e `workingTx` para as transações que criamos).

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

Não queremos poluir a UI com todas as informações, então para tornar possível visualizá-las ou fechá-las, usamos uma tag [`details`](https://www.w3schools.com/tags/tag_details.asp).

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

A maioria dos campos é exibida usando [`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp).

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          Functions:
          <ul>
```

A exceção são as funções, que não fazem parte do [padrão JSON](https://www.json.org/json-en.html), então elas têm que ser exibidas separadamente.

```tsx
          {funs.map((f, i) =>
```

Dentro do JSX, o código dentro de chaves `{` `}` é interpretado como JavaScript. Então, o código dentro dos parênteses `(` `)`, é interpretado novamente como JSX.

```tsx
           (<li key={i}>{f}</li>)
                )}
```

O React requer que as tags na [Árvore DOM](https://www.w3schools.com/js/js_htmldom.asp) tenham identificadores distintos. Isso significa que os filhos da mesma tag (neste caso, [a lista não ordenada](https://www.w3schools.com/tags/tag_ul.asp)), precisam de atributos `key` diferentes.

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

Finalize as várias tags HTML.

##### O `export` final {#the-final-export}

```tsx
export { Greeter }
```

O componente `Greeter` é o que precisamos exportar para a aplicação.

#### `src/wagmi.ts` {#wagmi-ts}

Finalmente, várias definições relacionadas ao WAGMI estão em `src/wagmi.ts`. Não vou explicar tudo aqui, porque a maior parte é boilerplate que você provavelmente não precisará mudar.

O código aqui não é exatamente o mesmo que [no github](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts) porque mais adiante no artigo adicionamos outra cadeia ([Redstone Holesky](https://redstone.xyz/docs/network-info)).

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

Importe as blockchains que a aplicação suporta. Você pode ver a lista de cadeias suportadas [no github do viem](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions).

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

Para poder usar o [WalletConnect](https://walletconnect.com/), você precisa de um ID de projeto para sua aplicação. Você pode obtê-lo em [cloud.walletconnect.com](https://cloud.walletconnect.com/sign-in).

```ts
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ holesky, sepolia ],
  [
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'My wagmi + RainbowKit App',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
```

### Adicionando outra blockchain {#add-blockchain}

Hoje em dia há muitas [soluções de escalabilidade L2](/layer-2/), e você pode querer suportar algumas que o viem ainda não suporta. Para fazer isso, você modifica `src/wagmi.ts`. Estas instruções explicam como adicionar a [Redstone Holesky](https://redstone.xyz/docs/network-info).

1. Importe o tipo `defineChain` do viem.

   ```ts
   import { defineChain } from 'viem'
   ```

2. Adicione a definição de rede.

   ```ts
   const redstoneHolesky = defineChain({
      id: 17_001,
      name: 'Redstone Holesky',
      network: 'redstone-holesky',
      nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
      },
      rpcUrls: {
        default: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
      },
      public: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
        },
      },
      blockExplorers: {
        default: { name: 'Explorer', url: 'https://explorer.holesky.redstone.xyz' },
      },
   })
   ```

3. Adicione a nova cadeia à chamada `configureChains`.

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    )
   ```

4. Certifique-se de que a aplicação saiba o endereço para seus contratos na nova rede. Neste caso, modificamos `src/components/Greeter.tsx`:

    ```ts
    const contractAddrs : AddressPerBlockchainType = {
      // Holesky
      17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',
    
      // Redstone Holesky
      17001: '0x4919517f82a1B89a32392E1BF72ec827ba9986D3',
    
      // Sepolia
      11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
    }
    ```

## Conclusão {#conclusion}

Claro, você não se importa realmente em fornecer uma interface de usuário para o `Greeter`. Você quer criar uma interface de usuário para seus próprios contratos. Para criar sua própria aplicação, siga estes passos:

1. Especifique para criar uma aplicação wagmi.

   ```sh copy
   pnpm create wagmi
   ```

2. Nomeie a aplicação.

3. Selecione a estrutura **React**.

4. Selecione a variante **Vite**.

5. Você pode [adicionar o kit Rainbow](https://www.rainbowkit.com/docs/installation#manual-setup).

Agora vá e torne seus contratos utilizáveis para o mundo inteiro.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).

