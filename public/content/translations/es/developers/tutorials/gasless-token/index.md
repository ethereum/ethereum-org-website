---
title: "Permitir que tus usuarios sin gas posean tokens y llamen a contratos"
description: "Usando la abstracción de cuentas, podemos crear billeteras de contratos inteligentes que acepten transacciones enviadas por una EOA específica o firmadas por esa EOA. Estos contratos inteligentes pueden entonces poseer tokens, que están bajo el control de la EOA."
author: Ori Pomerantz
tags: ["sin gas", "erc-20", "abstracción de cuentas"]
skill: intermediate
breadcrumb: Token sin gas
lang: es
published: 2026-04-01
---

## Introducción {#introduction}

Un [artículo anterior](/developers/tutorials/gasless/) analizó el uso del acceso sin gas a tu propia aplicación mediante firmas EIP-712, pero está limitado a tus propios contratos inteligentes. Usando la [abstracción de cuentas](/roadmap/account-abstraction/), podemos crear billeteras de contratos inteligentes que acepten dos tipos de transacciones y las retransmitan a un destino solicitado:

- Transacciones enviadas por una cuenta de propiedad externa (EOA) específica (que requieren que esa EOA tenga ETH)
- Transacciones enviadas desde cualquier lugar, pero firmadas por la misma EOA.

De esta manera, podemos proporcionar una forma sin gas para que una cuenta posea activos (tokens, etc.) y realice todas las funciones que puede hacer una EOA con gas.

### ¿Por qué no podemos simplemente retransmitir la solicitud? {#why-no-tx-origin}

En ERC-20 y estándares relacionados, el propietario de la cuenta es [`msg.sender`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties), la dirección que llamó al contrato del token, que no es necesariamente el originador de la transacción, [`tx.origin`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties). Esto es necesario por [razones de seguridad](https://docs.soliditylang.org/en/v0.8.35-pre.1/security-considerations.html#tx-origin). Esto significa que si retransmitimos solicitudes de transferencia de tokens, intentarán transferir tokens desde la dirección del retransmisor en lugar de una dirección controlada por el usuario.

Existe una solución que te permite usar la dirección de la EOA a través de [EIP-7702](https://eip7702.io/), pero requiere firmar una delegación potencialmente peligrosa, por lo que solo puedes usarla para delegar a un contrato inteligente que el proveedor de la billetera apruebe. Para este tutorial, prefiero el método mucho más simple de crear un contrato inteligente como proxy para el usuario.

## Viéndolo en acción {#in-action}

1. Asegúrate de tener tanto [Node](https://nodejs.org/en/download) como [Foundry](https://www.getfoundry.sh/introduction/installation).

2. Clona la aplicación e instala el software necesario.

   ```sh
   git clone https://github.com/qbzzt/260315-gasless-tokens.git
   cd 260315-gasless-tokens
   forge build
   cd server
   npm install
   ```

3. Edita `.env` para configurar `SEPOLIA_PRIVATE_KEY` con una billetera que tenga ETH en Sepolia. Si necesitas ETH de Sepolia, [usa un faucet](/developers/docs/networks/#sepolia) para obtenerlo. Idealmente, esta clave privada debería ser diferente de la que tienes en la billetera de tu navegador.

4. Inicia el servidor.

   ```sh
   npm run dev
   ```

5. Navega a la aplicación en la URL [`http://localhost:5173`](http://localhost:5173).

6. Haz clic en **Connect with Injected** para conectarte a una billetera. Aprueba en la billetera y aprueba el cambio a Sepolia si es necesario.

7. Desplázate hacia abajo y haz clic en **Deploy UserProxy (slow process)**.

8. Puedes ver cuándo se despliega el proxy de usuario porque hay una dirección junto a **UserProxy access**. Si esperaste 24 segundos (2 bloques) y todavía no ha sucedido, podría haber un problema con la detección de cambios.

   Si ese es el caso, ve al [explorador de bloques de Sepolia](https://eth-sepolia.blockscout.com/) e ingresa el hash de transacción de despliegue que ves en la salida del servidor en `npm run dev`. Haz clic en el contrato creado para ver su dirección y luego cópiala. Pega la dirección en el campo _Or enter existing proxy address_, luego haz clic en **Set proxy address**.

9. Haz clic en **Request more tokens for proxy** para enviar una llamada a la función [`faucet`](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=read_write_contract#0xde5f72fd) del contrato ERC-20 para obtener tokens. **Confirma** la firma en la billetera. Por supuesto, los tokens llegan a la dirección del proxy, no a la del usuario.

10. Desplázate hacia abajo y haz clic en el enlace debajo de _Last transaction:_. Esto abrirá el navegador para mostrarte la transacción `faucet`.

11. En _amount to transfer_, ingresa un número entre uno y mil. Haz clic en **Transfer** para transferir los tokens a tu propia dirección. Antes de hacer clic en **Confirm** para la solicitud, observa que los datos que se están firmando son opacos. A los usuarios les resultaría difícil entender qué están firmando. Recuerda que lo discutiremos [a continuación](#vulnerabilities).

12. Después de que se confirme la transacción, espera a ver el cambio tanto en _your balance_ como en _proxy balance_. Ten en cuenta que esto también tomará algún tiempo, porque Sepolia tiene un tiempo de bloque de 12 segundos.

## Cómo funciona {#how-work}

Para una experiencia sin gas, necesitamos una interfaz de usuario para el usuario, un servidor para enrutar mensajes desde la interfaz de usuario a la cadena, y un contrato inteligente para recibirlos y verificarlos.

### El contrato inteligente de la billetera {#wallet-smart-contract}

Este es [el contrato inteligente](https://github.com/qbzzt/260315-gasless-tokens/blob/main/contracts/src/UserProxy.sol). Su propósito es hacer lo que el propietario real solicite, independientemente del canal utilizado para solicitarlo, e ignorar todo lo demás. Para hacer esto, sus funciones reciben una dirección de destino a la que llamar y los datos que se usarán para llamarla.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract UserProxy {
    address immutable OWNER;
    uint public nonce = 0;
```

La identidad del propietario y un [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) para evitar que los mensajes se repitan. Debido a que el nonce es una variable `public`, el compilador de Solidity también crea una función de vista, [`nonce()`](https://eth-sepolia.blockscout.com/address/0x9Ba259C15B46ee4b72dEf7b93D85Ec18f5f6e50E?tab=read_write_contract#0xaffed0e0), que permite que el código fuera de la cadena lea su valor.

```solidity
    bytes32 private constant SIGNED_ACCESS_TYPEHASH =
        keccak256("SignedAccess(address target,bytes data,uint256 nonce)");

    bytes32 private constant SIGNED_ACCESS_PAYABLE_TYPEHASH =
        keccak256("SignedAccessPayable(address target,bytes data,uint256 nonce,uint256 value)");

    bytes32 immutable DOMAIN_SEPARATOR;
```

La información requerida para verificar las [firmas EIP-712](https://eips.ethereum.org/EIPS/eip-712).

```solidity
    constructor(address owner_) {
        OWNER = owner_;
```

Un `UserProxy` está vinculado a una única dirección de propietario. Esto es necesario porque puede poseer activos (tokens ERC-20, NFT, etc.). No queremos mezclar activos que pertenecen a diferentes propietarios.

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

El [separador de dominio](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). No se puede calcular en el momento de la compilación, porque depende del ID de la cadena y de la dirección del contrato. Esto hace que sea imposible que un UserProxy sea engañado por un mensaje preparado para otro.

```solidity
    event CallResult(address target, bytes returnData);
```

Registra los resultados de una llamada.

```solidity
    function directAccess(address target, bytes calldata data)
            external returns (bytes memory) {
```

Esta función puede ser llamada directamente por el propietario. Si no hay retransmisores disponibles, el propietario aún puede acceder a los activos directamente en la cadena de bloques (si el usuario tiene ETH).

```solidity
        require(msg.sender == OWNER, "Only owner can call");
        (bool success, bytes memory returnData) = target.call(data);
        require(success, "Call failed");

        emit CallResult(target, returnData);

        return returnData;
    }
```

Si somos llamados _directamente_ por el propietario, llama al destino con los datos de llamada proporcionados.

```solidity
    function signedAccess(
        address target,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s)
```

Esta es la función principal de `UserProxy`. Obtiene `target` y `data`, así como una firma.

```solidity
    external returns (bytes memory) {
        // Calcular el resumen EIP-712
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

El resumen (digest) también incluye el nonce, pero no necesitamos recibirlo de la transacción; ya conocemos el valor correcto. Una firma con el nonce incorrecto será rechazada.

```solidity

    // Recuperar firmante
    address signer = ecrecover(digest, v, r, s);
    require(signer == OWNER, "Signature invalid or not by owner");
```

Si la firma no es válida, `ecrecover` generalmente devolverá una dirección diferente y no será aceptada.

```solidity
    (bool success, bytes memory returnData) = target.call(data);
    require(success, "Call failed");
```

Llama al contrato que el usuario nos indicó llamar y revierte si no tiene éxito.

```solidity
    emit CallResult(target, returnData);

    nonce++; // Incrementar el nonce para evitar repeticiones

    return returnData;
}
```

Si tiene éxito, emite un evento de registro e incrementa el nonce.

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

Estas son variantes casi idénticas que también te permiten transferir ETH fuera del contrato.

### El retransmisor {#relayer}

El retransmisor es un [componente del servidor](/developers/tutorials/server-components/). Está escrito en JavaScript; puedes ver el código fuente [aquí](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/index.js).

```js
import express from "express";
import { createServer as createViteServer } from "vite";
import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import dotenv from 'dotenv'
```

Las bibliotecas que necesitamos. Este es un servidor [Express](https://expressjs.com/), que usa [Vite](https://vite.dev/) para servir el código de la interfaz de usuario. Usamos [Viem](https://viem.sh/) para comunicarnos con la cadena de bloques, y [dotenv](https://www.dotenv.org/) para leer la clave privada de la dirección que envía la transacción.

```js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const UserProxy = require('../contracts/out/UserProxy.sol/UserProxy.json')
```

Esta es una forma sencilla de leer el `UserProxy` compilado. Necesitamos el ABI para poder llamar a `UserProxy`, y el código compilado para poder desplegarlo para un usuario.

```js
dotenv.config()
const sepoliaAccount = privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY)
console.log("Using account:", sepoliaAccount.address)
```

Lee el archivo `.env`, extrae la dirección y la imprime en la consola.

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

Los clientes de Viem que se comunican con la cadena de bloques.

```js
const start = async () => {
  const app = express()
```

Ejecuta un servidor Express.

```js
  app.use(express.json())
```

Indica a Express que lea el cuerpo de la solicitud y, si es JSON, que lo analice.

```js
  app.post("/server/deploy", async (req, res) => {
```

Este es el código que maneja las solicitudes para desplegar el proxy. Ten en cuenta que aquí somos vulnerables a ataques de [denegación de servicio](https://en.wikipedia.org/wiki/Denial-of-service_attack) porque un atacante puede enviarnos spam con solicitudes para desplegar el proxy hasta que se agote nuestro ETH. En un sistema de producción, probablemente requeriríamos que la solicitud para desplegar el proxy esté firmada y que el firmante sea un cliente existente.

```js
    try {
      const ownerAddress = req.body.ownerAddress
```

Obtiene la dirección del propietario de la solicitud.

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

[Despliega el contrato](https://viem.sh/docs/contract/deployContract#deploycontract) y [espera hasta que se despliegue](https://viem.sh/docs/actions/public/waitForTransactionReceipt).

```js
      res.json({ contractAddress: receipt.contractAddress })
```

Si todo está bien, devuelve la dirección del proxy a la interfaz de usuario.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

Si hay un problema, repórtalo.

```js
  app.post("/server/message", async (req, res) => {
```

Este es el código que procesa los mensajes del usuario para el contrato `UserProxy`. Este es otro punto vulnerable a un ataque de denegación de servicio.

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

Obtiene los datos de la solicitud y los usa para llamar a `signedAccess` en el proxy.

```js
      console.log("Message transaction hash:", txHash)

      res.json({ txHash })
```

Informa el hash de transacción. Esto permite que la interfaz de usuario muestre una URL para que el usuario verifique la transacción.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

Nuevamente, si hay un problema, repórtalo.

```js
  // Dejar que Vite se encargue de todo lo demás
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

Para todo lo demás, usa Vite, que se encarga de servir la interfaz de usuario por nosotros.

### Interfaz de usuario {#user-interface}

[Este es el código de la interfaz de usuario](https://github.com/qbzzt/260315-gasless-tokens/tree/main/server/src). La mayor parte del código es casi idéntica a la documentada en [este artículo](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/#file-walk-through), con la excepción de [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx).

Partes de [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) son similares a [`Greeter.jsx`](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx) en [este artículo](/developers/tutorials/gasless/#ui-changes). Aquí están las partes nuevas.

```js
import {
   encodeFunctionData
       } from 'viem'
```

[Esta función](https://viem.sh/docs/contract/encodeFunctionData) crea los datos de llamada para una llamada a función de la EVM. Esto es necesario para que el usuario pueda firmar los datos de llamada.

```js
import UserProxy from '../../contracts/out/UserProxy.sol/UserProxy.json'
```

El `UserProxy`, explicado anteriormente.

```js
import Erc20 from '../../contracts/out/Faucet.sol/FaucetToken.json'
```

[Este contrato](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=contract) es en su mayoría un contrato ERC-20 normal, con la adición de una función importante, `faucet()`. Esta función otorga tokens a cualquiera que los solicite con fines de prueba.

```js
const erc20Addrs = {
  // Sepolia
    11155111: '0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78'
}
```

La dirección para `FaucetToken`.

```js
const Address = ({ address }) => {
   if (!address) return null
   return (
      <a href={`https://eth-sepolia.blockscout.com/address/${address}?tab=read_write_contract`} target="_blank">{address}</a>
   )
}
```

Este componente genera una dirección con un enlace al contrato en un explorador de bloques.

```js
const Token = () => {
    ...
```

Este es el componente principal que hace la mayor parte del trabajo.

```js
  const [ balanceAmount, setBalanceAmount ] = useState("Loading...")
```

El saldo de tokens de la dirección del usuario.

```js
  const [ proxyAddr, setProxyAddr ] = useState(null)
```

La dirección de un proxy propiedad del usuario.

```js
  const [ proxyBalanceAmount, setProxyBalanceAmount ] = useState("Loading...")
```

El saldo de tokens del proxy.

```js
  const [ newProxyAddr, setNewProxyAddr ] = useState("")
```

Este campo se usa cuando el usuario configura manualmente la dirección del proxy. Tener la capacidad de configurar la dirección del proxy manualmente permite al usuario usar un proxy existente en lugar de desplegar uno nuevo cada vez (y perder todos los tokens propiedad del proxy antiguo).

```js
  const [ txHash, setTxHash ] = useState(null)
```

El hash de la última transacción, utilizado para mostrar un enlace al explorador para que el usuario pueda verificar esa transacción.

```js
  const [ transferToken, setTransferToken ] = useState("")
  const [ transferAmount, setTransferAmount ] = useState("")
  const [ transferTo, setTransferTo ] = useState("")
```

Todos estos campos se utilizan para enviar comandos de transferencia de tokens a un contrato ERC-20. Este puede ser `FaucetToken`, pero no tiene por qué serlo. La función [`transfer`](/developers/tutorials/erc20-annotated-code/#transfer-tokens) es parte del estándar ERC-20.

```js
  const balance = useReadContract({
    ...
  })


  const proxyBalance = useReadContract({
    ...
  })
```

Lee los dos saldos de tokens que nos interesan, cuánto posee el usuario y cuánto posee el proxy.

```js
  const nonce = useReadContract({
      address: proxyAddr,
      abi: UserProxy.abi,
      functionName: 'nonce',
      args: [],
  })
```

Para prevenir ataques de repetición (por ejemplo, un vendedor que repite una transacción que le da dinero), usamos un [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Necesitamos conocer el valor actual para agregarlo a los datos que firmamos.

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

Usa [`useEffect`](https://react.dev/reference/react/useEffect) para actualizar el saldo que se muestra al usuario cuando cambia la información leída de la cadena de bloques.

```js
  useEffect(() => {
    setTransferToken(faucetAddr)
  }, [faucetAddr])

  useEffect(() => {
    setTransferTo(account.address)
  }, [account.address])
```

El valor predeterminado es transferir tokens `FaucetToken` a la propia cuenta del usuario. Aquí configuramos estos valores cuando los recibimos de Viem.

```js
  const proxyAddressChange = (evt) => setNewProxyAddr(evt.target.value)
  const transferTokenChange = (evt) => setTransferToken(evt.target.value)
  const transferToChange = (evt) => setTransferTo(evt.target.value)
  const transferAmountChange = (evt) => setTransferAmount(evt.target.value)
```

Manejadores de eventos para cuando cambian los campos de texto.

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

Pide al servidor que despliegue un proxy para este usuario.

```js
  const signMessage = async(proxyAddr, target, calldata) => {
```

Firma un mensaje antes de enviarlo al servidor para que lo envíe a `UserProxy` en cadena. Esto se explica [aquí](/developers/tutorials/gasless/#ui-changes). Necesitamos firmar un mensaje tanto con la dirección de destino (la dirección del token al que estamos llamando) como con los datos de llamada a enviar.

```js
    const domain = {
      .
      .
      .
    return {v, r, s}
  }

  const messageUserProxy = async (proxy, target, data, v, r, s) => {
```

Envía un mensaje firmado a `UserProxy`, que verificará la firma y luego lo enviará al `target`.

```js
    try {
      const response = await fetch("/server/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxy, target,  // ambas direcciones
          data,           // datos de llamada para enviar al objetivo
          v, r, s         // firma
        })
      })
      const serverResponse = await response.json()
      setTxHash(serverResponse.txHash)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Envía una solicitud al servidor y, cuando recibas la respuesta, obtén el hash de transacción.

```js
  const faucetSimulation = useSimulateContract({
    address: faucetAddr,
    abi: Erc20.abi,
    functionName: 'faucet',
    account: account.address
  })
```

Simula llamar a la función `faucet`. Solo habilitamos el botón del faucet si esto tiene éxito.

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

Para llamar a una función a través del servidor y `UserProxy`, seguimos tres pasos:

1. Crea los datos de llamada para firmar y enviar usando [`encodeFunctionData`](https://viem.sh/docs/contract/encodeFunctionData).

2. Firma el mensaje (dirección de destino, datos de llamada y nonce).

3. Envía el mensaje al servidor.

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

Esta parte del componente te permite usar `FaucetToken` directamente desde el navegador. Su propósito principal es facilitar la depuración.

```js
         <h4>UserProxy access <Address address={proxyAddr} /></h4>
         <button onClick={deployUserProxy}>
         Deploy UserProxy (slow process)
         </button>
```

Permite al usuario desplegar un nuevo `UserProxy`.

```js
         <br /><br />
         <input type="text" placeholder="O ingresa una dirección de proxy existente" value={newProxyAddr} onChange={proxyAddressChange} />
         <br /><br />
         <button
            onClick={() => setProxyAddr(newProxyAddr)}
            disabled={newProxyAddr.match(/^0x[a-fA-F0-9]{40}$/) === null}
         >
            Set proxy address
         </button>
```

Solo permite a los usuarios hacer clic en **Set proxy address** cuando ingresan una dirección legítima. Ten en cuenta que esto no garantiza que la dirección en cuestión sea de hecho un contrato `UserProxy`. Es posible agregar tal verificación, pero será mucho más lenta (peor experiencia de usuario) y no mejorará la seguridad (los atacantes siempre pueden usar su propio código para la interfaz de usuario).

```js
         <br /><br />
         { proxyAddr && (
```

Muestra el resto _solo_ si hay una dirección de proxy legítima.

```js
            <>
               Proxy balance: {proxyBalanceAmount}
               <br />
               Proxy nonce: {nonce?.data?.toString() ?? "Loading..."}
```

El usuario no necesita conocer el nonce; esto es solo para fines de depuración.

```js
               <br />
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyFaucet}
               >
                  Request more tokens for proxy
               </button>
```

No podemos simular una llamada a `faucet()` a través del proxy. Sin embargo, al menos podemos asegurarnos de que tenemos un proxy y de que el proxy nos reportó un nonce.

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

Permite al usuario emitir transacciones de transferencia ERC-20.

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

Si hay un hash de la última transacción, muestra un enlace para que el usuario pueda verlo en un explorador de bloques.

```js
 
</div>
    </>
  )
}

export {Token}
```

Esto es solo código repetitivo (boilerplate) de React.

## Vulnerabilidades {#vulnerabilities}

Nuestro servidor es vulnerable a ataques de denegación de servicio. Este ataque se explica [en el artículo anterior de la serie](/developers/tutorials/gasless/#dos-on-server).

Además, estamos fomentando un mal comportamiento del usuario. Esto es lo que le pedimos al usuario que firme:

![Screen capture with opaque calldata](./fig-1-opaque-calldata.png)

_Nosotros_ sabemos que esta es una transferencia ERC-20 legítima para el token, la cantidad y la dirección de destino que el usuario quiere transferir. Pero la mayoría de los usuarios no saben cómo interpretar los datos de llamada y no tienen idea de qué están firmando. Ese es un mal diseño, por dos razones:

- Algunos usuarios no nos usarán porque no confían en los datos que les decimos que firmen.
- Otros usuarios _sí_ confiarán en nosotros y aprenderán que simplemente deben firmar los datos de llamada sin entender qué son. Esto significa que si Adam el Atacante logra redirigirlos a su sitio web, puede hacer que firmen una transacción que le otorgue todos los USDC (o DAI, o cualquier otro ERC-20) que posee el usuario.

La solución es tener funciones separadas en `UserProxy` para funciones de uso común, como la transferencia. Entonces los usuarios pueden firmar algo que entiendan.

![Screen capture with transfer details](./fig-2-transparent-signature.png)

**Nota:** Aunque los usuarios pueden usar cualquier billetera que deseen, es muy recomendable que las aplicaciones que usan EIP-712 los animen a usar una billetera que [muestre todos los datos de la firma](https://rabby.io/). Algunas billeteras truncan la dirección, lo cual es inseguro. Un atacante puede crear una dirección que tenga los mismos caracteres iniciales y finales, pero que difiera en el medio.

![Screen capture with truncated addresses](./fig-3-truncated-addresses.png)

## Conclusión {#conclusion}

Además de las vulnerabilidades anteriores, la solución en este tutorial tiene varios inconvenientes que Ethereum puede ayudarnos a abordar.

- _Resistencia a la censura_. Actualmente, los usuarios pueden usar tu servidor, un servidor de la competencia configurado por otra persona, o conectarse a Ethereum directamente, lo que incurre en costos de gas. El uso de [ERC-4337](https://docs.erc4337.io/#what-is-erc-4337) permite a los usuarios ofrecer su transacción a un gran grupo de servidores, reduciendo la probabilidad de que sus transacciones sean censuradas.
- _Activos propiedad de EOA_. Como se señaló anteriormente, [EIP-7702](https://eip7702.io/) se puede usar para administrar activos que ya son propiedad de una dirección de EOA. Esto tiene sus dificultades, pero a veces es necesario.

Espero publicar tutoriales sobre cómo agregar estas características en un futuro cercano.

[Mira aquí para ver más de mi trabajo](https://cryptodocguy.pro/).
