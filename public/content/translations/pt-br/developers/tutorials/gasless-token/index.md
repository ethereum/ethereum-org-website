---
title: "Permitindo que seus usuários sem gás mantenham tokens e chamem contratos"
description: "Usando a abstração de conta, podemos criar carteiras de contratos inteligentes que aceitam transações enviadas por uma EOA específica ou assinadas por essa EOA. Esses contratos inteligentes podem então possuir tokens, que estão sob o controle da EOA."
author: Ori Pomerantz
tags: ["sem gás", "erc-20", "abstração de conta"]
skill: intermediate
breadcrumb: "Token sem gás"
lang: pt-br
published: 2026-04-01
---

## Introdução {#introduction}

Um [artigo anterior](/developers/tutorials/gasless/) discutiu o uso de acesso sem gás à sua própria aplicação usando assinaturas EIP-712, mas isso é limitado aos seus próprios contratos inteligentes. Usando a [abstração de conta](/roadmap/account-abstraction/), podemos criar carteiras de contratos inteligentes que aceitam dois tipos de transações e as retransmitem para um destino solicitado:

- Transações enviadas por uma conta de propriedade externa (EOA) específica (o que exige que essa EOA tenha ETH)
- Transações enviadas de qualquer lugar, mas assinadas pela mesma EOA.

Dessa forma, podemos fornecer uma maneira sem gás para uma conta manter ativos (tokens, etc.) e executar todas as funções que uma EOA com gás pode.

### Por que não podemos simplesmente retransmitir a solicitação? {#why-no-tx-origin}

No ERC-20 e em padrões relacionados, o proprietário da conta é [`msg.sender`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties), o endereço que chamou o contrato do token, que não é necessariamente o originador da transação, [`tx.origin`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties). Isso é exigido por [motivos de segurança](https://docs.soliditylang.org/en/v0.8.35-pre.1/security-considerations.html#tx-origin). Isso significa que, se retransmitirmos solicitações de transferência de tokens, elas tentarão transferir tokens do endereço do retransmissor em vez de um endereço controlado pelo usuário.

Existe uma solução que permite usar o endereço da EOA via [EIP-7702](https://eip7702.io/), mas ela exige a assinatura de uma delegação potencialmente perigosa, então você só pode usá-la para delegar a um contrato inteligente que o provedor da carteira aprova. Para este tutorial, prefiro o método muito mais simples de criar um contrato inteligente como um proxy para o usuário.

## Vendo em ação {#in-action}

1. Certifique-se de ter tanto o [Node](https://nodejs.org/en/download) quanto o [Foundry](https://www.getfoundry.sh/introduction/installation).

2. Clone a aplicação e instale o software necessário.

   ```sh
   git clone https://github.com/qbzzt/260315-gasless-tokens.git
   cd 260315-gasless-tokens
   forge build
   cd server
   npm install
   ```

3. Edite `.env` para definir `SEPOLIA_PRIVATE_KEY` para uma carteira que tenha ETH na Sepolia. Se você precisar de ETH da Sepolia, [use um faucet](/developers/docs/networks/#sepolia) para obtê-lo. Idealmente, essa chave privada deve ser diferente daquela que você tem na carteira do seu navegador.

4. Inicie o servidor.

   ```sh
   npm run dev
   ```

5. Navegue até a aplicação na URL [`http://localhost:5173`](http://localhost:5173).

6. Clique em **Connect with Injected** para se conectar a uma carteira. Aprove na carteira e aprove a mudança para a Sepolia, se necessário.

7. Role para baixo e clique em **Deploy UserProxy (slow process)**.

8. Você pode ver quando o proxy do usuário é implantado porque há um endereço ao lado de **UserProxy access**. Se você esperou 24 segundos (2 blocos) e isso ainda não aconteceu, pode haver um problema com a detecção de alterações.

   Se for esse o caso, vá para o [explorador de blocos da Sepolia](https://eth-sepolia.blockscout.com/) e insira o hash da transação de implantação que você vê na saída do servidor em `npm run dev`. Clique no contrato criado para ver seu endereço e, em seguida, copie-o. Cole o endereço no campo _Or enter existing proxy address_ e clique em **Set proxy address**.

9. Clique em **Request more tokens for proxy** para enviar uma chamada à função [`faucet`](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=read_write_contract#0xde5f72fd) do contrato ERC-20 para obter tokens. **Confirme** a assinatura na carteira. Obviamente, os tokens chegam ao endereço do proxy, não ao do usuário.

10. Role para baixo e clique no link em _Last transaction:_. Isso abrirá o navegador para mostrar a transação `faucet`.

11. Em _amount to transfer_, insira um número entre um e mil. Clique em **Transfer** para transferir os tokens para o seu próprio endereço. Antes de clicar em **Confirm** para a solicitação, observe que os dados sendo assinados são opacos. Os usuários teriam dificuldade em entender o que estão assinando. Lembre-se de que discutiremos isso [abaixo](#vulnerabilities).

12. Após a transação ser confirmada, espere para ver a mudança tanto em _your balance_ quanto em _proxy balance_. Observe que isso também levará algum tempo, porque a Sepolia tem um tempo de bloco de 12 segundos.

## Como funciona {#how-work}

Para uma experiência sem gás, precisamos de uma interface de usuário para o usuário, um servidor para rotear mensagens da interface de usuário para a cadeia e um contrato inteligente para recebê-las e verificá-las.

### O contrato inteligente da carteira {#wallet-smart-contract}

Este é [o contrato inteligente](https://github.com/qbzzt/260315-gasless-tokens/blob/main/contracts/src/UserProxy.sol). Seu objetivo é fazer o que o verdadeiro proprietário solicitar, independentemente do canal usado para solicitá-lo, e ignorar todo o resto. Para fazer isso, suas funções recebem um endereço de destino para chamar e os dados a serem usados para chamá-lo.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract UserProxy {
    address immutable OWNER;
    uint public nonce = 0;
```

A identidade do proprietário e um [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) para evitar que as mensagens sejam repetidas. Como o nonce é uma variável `public`, o compilador Solidity também cria uma função de visualização (view), [`nonce()`](https://eth-sepolia.blockscout.com/address/0x9Ba259C15B46ee4b72dEf7b93D85Ec18f5f6e50E?tab=read_write_contract#0xaffed0e0), que permite que o código offchain leia seu valor.

```solidity
    bytes32 private constant SIGNED_ACCESS_TYPEHASH =
        keccak256("SignedAccess(address target,bytes data,uint256 nonce)");

    bytes32 private constant SIGNED_ACCESS_PAYABLE_TYPEHASH =
        keccak256("SignedAccessPayable(address target,bytes data,uint256 nonce,uint256 value)");

    bytes32 immutable DOMAIN_SEPARATOR;
```

As informações necessárias para verificar as [assinaturas EIP-712](https://eips.ethereum.org/EIPS/eip-712).

```solidity
    constructor(address owner_) {
        OWNER = owner_;
```

Um `UserProxy` está vinculado a um único endereço de proprietário. Isso é necessário porque ele pode possuir ativos (tokens ERC-20, NFTs, etc.). Não queremos misturar ativos pertencentes a proprietários diferentes.

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("UserProxy")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

O [separador de domínio](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). Ele não pode ser calculado em tempo de compilação, porque depende do ID da cadeia e do endereço do contrato. Isso torna impossível que um UserProxy seja enganado por uma mensagem preparada para outro.

```solidity
    event CallResult(address target, bytes returnData);
```

Fazer o log dos resultados de uma chamada.

```solidity
    function directAccess(address target, bytes calldata data)
            external returns (bytes memory) {
```

Esta função pode ser chamada diretamente pelo proprietário. Se não houver retransmissores disponíveis, o proprietário ainda poderá acessar os ativos diretamente na blockchain (se o usuário tiver ETH).

```solidity
        require(msg.sender == OWNER, "Only owner can call");
        (bool success, bytes memory returnData) = target.call(data);
        require(success, "Call failed");

        emit CallResult(target, returnData);

        return returnData;
    }
```

Se formos chamados _diretamente_ pelo proprietário, chame o destino com os dados de chamada (calldata) fornecidos.

```solidity
    function signedAccess(
        address target,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s)
```

Esta é a função principal do `UserProxy`. Ela obtém `target` e `data`, bem como uma assinatura.

```solidity
    external returns (bytes memory) {
        // Calcular o digest EIP-712
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        SIGNED_ACCESS_TYPEHASH,
                        target,
                        keccak256(data),
                        nonce
                    )
                )
            )
        );
```

O resumo (digest) também inclui o nonce, mas não precisamos recebê-lo da transação; já sabemos o valor correto. Uma assinatura com o nonce errado será rejeitada.

```solidity

    // Recuperar signatário
    address signer = ecrecover(digest, v, r, s);
    require(signer == OWNER, "Signature invalid or not by owner");
```

Se a assinatura for inválida, `ecrecover` geralmente retornará um endereço diferente e não será aceita.

```solidity
    (bool success, bytes memory returnData) = target.call(data);
    require(success, "Call failed");
```

Chame o contrato que o usuário nos disse para chamar e reverta se não for bem-sucedido.

```solidity
    emit CallResult(target, returnData);

    nonce++; // Incrementar o nonce para evitar repetição

    return returnData;
}
```

Se for bem-sucedido, emita um evento de log e incremente o nonce.

```solidity
    function directAccessPayable(address target, uint value, bytes calldata data)
            external payable returns (bytes memory) {
        .
        .
        .
    }

    function signedAccessPayable(
        .
        .
        .
    }
}
```

Estas são variantes quase idênticas que permitem que você também transfira ETH para fora do contrato.

### O retransmissor {#relayer}

O retransmissor é um [componente de servidor](/developers/tutorials/server-components/). Ele é escrito em JavaScript; você pode ver o código-fonte [aqui](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/index.js).

```js
import express from "express";
import { createServer as createViteServer } from "vite";
import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import dotenv from 'dotenv'
```

As bibliotecas de que precisamos. Este é um servidor [Express](https://expressjs.com/), que usa o [Vite](https://vite.dev/) para servir o código da interface de usuário. Usamos o [Viem](https://viem.sh/) para nos comunicarmos com a blockchain e o [dotenv](https://www.dotenv.org/) para ler a chave privada do endereço que envia a transação.

```js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const UserProxy = require('../contracts/out/UserProxy.sol/UserProxy.json')
```

Esta é uma maneira simples de ler o `UserProxy` compilado. Precisamos da ABI para poder chamar o `UserProxy` e do código compilado para poder implantá-lo para um usuário.

```js
dotenv.config()
const sepoliaAccount = privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY)
console.log("Using account:", sepoliaAccount.address)
```

Leia o arquivo `.env`, extraia o endereço e imprima-o no console.

```js
const sepoliaClient = createWalletClient({
  account: sepoliaAccount,
  chain: sepolia,
  transport: http("https://rpc.sentio.xyz/sepolia"),
})

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})
```

Os clientes Viem que se comunicam com a blockchain.

```js
const start = async () => {
  const app = express()
```

Execute um servidor Express.

```js
  app.use(express.json())
```

Diga ao Express para ler o corpo da solicitação e, se for JSON, analisá-lo.

```js
  app.post("/server/deploy", async (req, res) => {
```

Este é o código que lida com as solicitações para implantar o proxy. Observe que somos vulneráveis a ataques de [negação de serviço](https://en.wikipedia.org/wiki/Denial-of-service_attack) aqui porque um invasor pode nos enviar spam com solicitações para implantar o proxy até que nosso ETH se esgote. Em um sistema de produção, provavelmente exigiríamos que a solicitação para implantar o proxy fosse assinada e que o signatário fosse um cliente existente.

```js
    try {
      const ownerAddress = req.body.ownerAddress
```

Obtenha o endereço do proprietário a partir da solicitação.

```js
      const txHash = await sepoliaClient.deployContract({
        abi: UserProxy.abi,
        bytecode: UserProxy.bytecode.object,
        args: [ownerAddress],
        account: sepoliaAccount,
      })

      console.log("Deployment transaction hash:", txHash)

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      })
```

[Implante o contrato](https://viem.sh/docs/contract/deployContract#deploycontract) e [espere até que ele seja implantado](https://viem.sh/docs/actions/public/waitForTransactionReceipt).

```js
      res.json({ contractAddress: receipt.contractAddress })
```

Se tudo estiver bem, retorne o endereço do proxy para a interface de usuário.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

Se houver um problema, relate-o.

```js
  app.post("/server/message", async (req, res) => {
```

Este é o código que processa as mensagens do usuário para o contrato `UserProxy`. Este é outro ponto vulnerável a um ataque de negação de serviço.

```js
    try {
      const { proxy, target, data, v, r, s } = req.body

      const txHash = await sepoliaClient.writeContract({
        address: proxy,
        abi: UserProxy.abi,
        functionName: 'signedAccess',
        args: [target, data, v, r, s],
        account: sepoliaAccount,
      })
```

Obtenha os dados da solicitação e use-os para chamar `signedAccess` no proxy.

```js
      console.log("Message transaction hash:", txHash)

      res.json({ txHash })
```

Relate o hash da transação. Isso permite que a interface de usuário exiba uma URL para o usuário verificar a transação.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

Novamente, se houver um problema, relate-o.

```js
  // Deixe o Vite lidar com todo o resto
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)

  app.listen(5173, () => {
    console.log("Dev server running on http://localhost:5173");
  })
}

start()
```

Para todo o resto, use o Vite, que cuida de servir a interface de usuário para nós.

### Interface de usuário {#user-interface}

[Este é o código da interface de usuário](https://github.com/qbzzt/260315-gasless-tokens/tree/main/server/src). A maior parte do código é quase idêntica à documentada [neste artigo](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/#file-walk-through), com exceção de [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx).

Partes de [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) são semelhantes a [`Greeter.jsx`](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx) [neste artigo](/developers/tutorials/gasless/#ui-changes). Aqui estão as partes novas.

```js
import {
   encodeFunctionData
       } from 'viem'
```

[Esta função](https://viem.sh/docs/contract/encodeFunctionData) cria os dados de chamada (calldata) para uma chamada de função da EVM. Isso é necessário para que o usuário possa assinar os dados de chamada.

```js
import UserProxy from '../../contracts/out/UserProxy.sol/UserProxy.json'
```

O `UserProxy`, explicado acima.

```js
import Erc20 from '../../contracts/out/Faucet.sol/FaucetToken.json'
```

[Este contrato](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=contract) é em grande parte um contrato ERC-20 normal, com a adição de uma função importante, `faucet()`. Esta função concede tokens a qualquer pessoa que os solicite para fins de teste.

```js
const erc20Addrs = {
  // Sepolia
    11155111: '0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78'
}
```

O endereço para `FaucetToken`.

```js
const Address = ({ address }) => {
   if (!address) return null
   return (
      <a href={`https://eth-sepolia.blockscout.com/address/${address}?tab=read_write_contract`} target="_blank">{address}</a>
   )
}
```

Este componente gera um endereço com um link para o contrato em um explorador de blocos.

```js
const Token = () => {
    ...
```

Este é o componente principal que faz a maior parte do trabalho.

```js
  const [ balanceAmount, setBalanceAmount ] = useState("Loading...")
```

O saldo de tokens do endereço do usuário.

```js
  const [ proxyAddr, setProxyAddr ] = useState(null)
```

O endereço de um proxy de propriedade do usuário.

```js
  const [ proxyBalanceAmount, setProxyBalanceAmount ] = useState("Loading...")
```

O saldo de tokens do proxy.

```js
  const [ newProxyAddr, setNewProxyAddr ] = useState("")
```

Este campo é usado quando o usuário define manualmente o endereço do proxy. Ter a capacidade de definir o endereço do proxy manualmente permite que o usuário use um proxy existente em vez de implantar um novo a cada vez (e perder todos os tokens de propriedade do proxy antigo).

```js
  const [ txHash, setTxHash ] = useState(null)
```

O hash da última transação, usado para mostrar um link para o explorador para que o usuário possa verificar essa transação.

```js
  const [ transferToken, setTransferToken ] = useState("")
  const [ transferAmount, setTransferAmount ] = useState("")
  const [ transferTo, setTransferTo ] = useState("")
```

Todos esses campos são usados para enviar comandos de transferência de tokens para um contrato ERC-20. Este pode ser o `FaucetToken`, mas não precisa ser. A função [`transfer`](/developers/tutorials/erc20-annotated-code/#transfer-tokens) faz parte do padrão ERC-20.

```js
  const balance = useReadContract({
    ...
  })


  const proxyBalance = useReadContract({
    ...
  })
```

Leia os dois saldos de tokens nos quais estamos interessados: quanto o usuário possui e quanto o proxy possui.

```js
  const nonce = useReadContract({
      address: proxyAddr,
      abi: UserProxy.abi,
      functionName: 'nonce',
      args: [],
  })
```

Para evitar ataques de repetição (por exemplo, um vendedor repetindo uma transação que lhe dá dinheiro), usamos um [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Precisamos saber o valor atual para adicioná-lo aos dados que assinamos.

```js
  useEffect(() => {
    if (balance?.status === "success")
      setBalanceAmount(balance.data / 10n**18n)
    else
      setBalanceAmount("Loading...")
  }, [balance])

  useEffect(() => {
    if (proxyBalance?.status === "success")
      setProxyBalanceAmount(proxyBalance.data / 10n**18n)
    else
      setProxyBalanceAmount("Loading...")
  }, [proxyBalance])
```

Use [`useEffect`](https://react.dev/reference/react/useEffect) para atualizar o saldo exibido ao usuário quando as informações lidas da blockchain mudarem.

```js
  useEffect(() => {
    setTransferToken(faucetAddr)
  }, [faucetAddr])

  useEffect(() => {
    setTransferTo(account.address)
  }, [account.address])
```

O padrão é transferir tokens `FaucetToken` para a própria conta do usuário. Aqui definimos esses valores quando os recebemos do Viem.

```js
  const proxyAddressChange = (evt) => setNewProxyAddr(evt.target.value)
  const transferTokenChange = (evt) => setTransferToken(evt.target.value)
  const transferToChange = (evt) => setTransferTo(evt.target.value)
  const transferAmountChange = (evt) => setTransferAmount(evt.target.value)
```

Manipuladores de eventos para quando os campos de texto mudam.

```js
  const deployUserProxy = async () => {
    try {
      const response = await fetch("/server/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerAddress: account.address })
      })

      const data = await response.json()
      setProxyAddr(data.contractAddress)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Peça ao servidor para implantar um proxy para este usuário.

```js
  const signMessage = async(proxyAddr, target, calldata) => {
```

Assine uma mensagem antes de enviá-la ao servidor para enviar ao `UserProxy` onchain. Isso é explicado [aqui](/developers/tutorials/gasless/#ui-changes). Precisamos assinar uma mensagem com o endereço de destino (o endereço do token que estamos chamando) e os dados de chamada a serem enviados.

```js
    const domain = {
      .
      .
      .
    return {v, r, s}
  }

  const messageUserProxy = async (proxy, target, data, v, r, s) => {
```

Envie uma mensagem assinada para o `UserProxy`, que verificará a assinatura e, em seguida, a enviará para o `target`.

```js
    try {
      const response = await fetch("/server/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxy, target,  // ambos os endereços
          data,           // dados de chamada para enviar ao alvo
          v, r, s         // assinatura
        })
      })
      const serverResponse = await response.json()
      setTxHash(serverResponse.txHash)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Envie uma solicitação ao servidor e, ao receber a resposta, obtenha o hash da transação.

```js
  const faucetSimulation = useSimulateContract({
    address: faucetAddr,
    abi: Erc20.abi,
    functionName: 'faucet',
    account: account.address
  })
```

Simule a chamada da função `faucet`. Só habilitamos o botão do faucet se isso for bem-sucedido.

```js
  const proxyFaucet = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'faucet',
      args: [],
    })

    const {v, r, s} = await signMessage(proxyAddr, calldata)
    messageUserProxy(proxyAddr, faucetAddr, calldata, v, r, s)
  }

  const proxyTransfer = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'transfer',
      args: [transferTo, BigInt(transferAmount) * 10n**18n],
    })

    const {v, r, s} = await signMessage(proxyAddr, transferToken, calldata)
    messageUserProxy(proxyAddr, transferToken, calldata, v, r, s)
  }
```

Para chamar uma função através do servidor e do `UserProxy`, seguimos três etapas:

1. Crie os dados de chamada para assinar e enviar usando [`encodeFunctionData`](https://viem.sh/docs/contract/encodeFunctionData).

2. Assine a mensagem (endereço de destino, dados de chamada e nonce).

3. Envie a mensagem para o servidor.

```js
  return (
    <>
      <div align="left">
         <h2>Token</h2>
         <h4>Token contract address <Address address={faucetAddr} /></h4>
         <hr />
         <h4>Direct access (as <Address address={account?.address} />)</h4>
         Your balance: {balanceAmount}
         <br />
         <button disabled={!faucetSimulation.data}
               onClick={() => writeContract(
                  faucetSimulation.data.request
               )}
         >
         Request more tokens
         </button>
         <hr />
```

Esta parte do componente permite que você use o `FaucetToken` diretamente do navegador. Seu objetivo principal é facilitar a depuração.

```js
         <h4>UserProxy access <Address address={proxyAddr} /></h4>
         <button onClick={deployUserProxy}>
         Deploy UserProxy (slow process)
         </button>
```

Permita que o usuário implante um novo `UserProxy`.

```js
         <br /><br />
         <input type="text" placeholder="Ou insira um endereço de proxy existente" value={newProxyAddr} onChange={proxyAddressChange} />
         <br /><br />
         <button
            onClick={() => setProxyAddr(newProxyAddr)}
            disabled={newProxyAddr.match(/^0x[a-fA-F0-9]{40}$/) === null}
         >
            Set proxy address
         </button>
```

Só permita que os usuários cliquem em **Set proxy address** quando inserirem um endereço legítimo. Observe que isso não garante que o endereço em questão seja de fato um contrato `UserProxy`. É possível adicionar essa verificação, mas ela será muito mais lenta (pior experiência do usuário) e não melhorará a segurança (os invasores sempre podem usar seu próprio código para a interface de usuário).

```js
         <br /><br />
         { proxyAddr && (
```

Mostre o restante _apenas_ se houver um endereço de proxy legítimo.

```js
            <>
               Proxy balance: {proxyBalanceAmount}
               <br />
               Proxy nonce: {nonce?.data?.toString() ?? "Loading..."}
```

O usuário não precisa saber o nonce; isso é apenas para fins de depuração.

```js
               <br />
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyFaucet}
               >
                  Request more tokens for proxy
               </button>
```

Não podemos simular uma chamada para `faucet()` através do proxy. No entanto, podemos pelo menos garantir que temos um proxy e que o proxy nos relatou um nonce.

```js
               <hr />
               <h4>Transfer tokens from proxy</h4>
               <ul>
                  <li> Token to transfer: <input type="text" placeholder="Token to transfer" value={transferToken} onChange={transferTokenChange} /> </li>
                  <li> Recipient address: <input type="text" placeholder="Recipient address" value={transferTo} onChange={transferToChange} /> </li>
                  <li> Amount to transfer: <input type="number" placeholder="Amount to transfer" value={transferAmount} onChange={transferAmountChange} /> </li>
               </ul>
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyTransfer}
               >
                  Transfer
               </button>
            </>
         )}
```

Permita que o usuário emita transações de transferência ERC-20.

```js
         <hr />
         { txHash && (
            <>
               <h4>Last transaction:</h4>
               <a href={`https://eth-sepolia.blockscout.com/tx/${txHash}`} target="_blank">
                 {txHash}
               </a>
            </>
         )}
```

Se houver um hash da última transação, mostre um link para que o usuário possa visualizá-lo em um explorador de blocos.

```js
 
</div>
    </>
  )
}

export {Token}
```

Isso é apenas código clichê (boilerplate) do React.

## Vulnerabilidades {#vulnerabilities}

Nosso servidor é vulnerável a ataques de negação de serviço. Esse ataque é explicado [no artigo anterior da série](/developers/tutorials/gasless/#dos-on-server).

Além disso, estamos incentivando o mau comportamento do usuário. Isto é o que pedimos ao usuário para assinar:

![Screen capture with opaque calldata](./fig-1-opaque-calldata.png)

_Nós_ sabemos que esta é uma transferência ERC-20 legítima para o token, valor e endereço de destino que o usuário deseja transferir. Mas a maioria dos usuários não sabe como interpretar dados de chamada e não tem ideia do que está assinando. Isso é um design ruim, por dois motivos:

- Alguns usuários não nos usarão porque não confiam nos dados que pedimos para eles assinarem.
- Outros usuários _vão_ confiar em nós e aprender que devem apenas assinar os dados de chamada sem entender o que são. Isso significa que, se um invasor conseguir redirecioná-los para o site dele, ele poderá fazer com que assinem uma transação que lhe conceda todo o USDC (ou DAI, ou qualquer outro ERC-20) que o usuário possui.

A solução é ter funções separadas no `UserProxy` para funções comumente usadas, como transferência. Assim, os usuários podem assinar algo que entendem.

![Screen capture with transfer details](./fig-2-transparent-signature.png)

**Nota:** Embora os usuários possam usar qualquer carteira que desejarem, é altamente recomendável que as aplicações que usam o EIP-712 os incentivem a usar uma carteira que [mostre todos os dados da assinatura](https://rabby.io/). Algumas carteiras truncam o endereço, o que é inseguro. Um invasor pode criar um endereço que tenha os mesmos caracteres iniciais e finais, mas que seja diferente no meio.

![Screen capture with truncated addresses](./fig-3-truncated-addresses.png)

## Conclusão {#conclusion}

Além das vulnerabilidades acima, a solução neste tutorial tem várias desvantagens que o Ethereum pode nos ajudar a resolver.

- _Resistência à censura_. Atualmente, os usuários podem usar seu servidor, um servidor concorrente configurado por outra pessoa ou se conectar diretamente ao Ethereum, o que incorre em custos de gás. O uso do [ERC-4337](https://docs.erc4337.io/#what-is-erc-4337) permite que os usuários ofereçam suas transações a um grande pool de servidores, reduzindo a probabilidade de que suas transações sejam censuradas.
- _Ativos de propriedade de EOA_. Como observado acima, o [EIP-7702](https://eip7702.io/) pode ser usado para gerenciar ativos que já são de propriedade de um endereço de EOA. Isso tem suas dificuldades, mas às vezes é necessário.

Espero publicar tutoriais sobre como adicionar esses recursos em um futuro próximo.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).
