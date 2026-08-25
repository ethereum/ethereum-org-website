---
title: "Jak umožnit uživatelům bez gasu držet tokeny a volat kontrakty"
description: "Pomocí abstrakce účtu můžeme vytvořit peněženky ve formě chytrých kontraktů, které přijímají transakce odeslané konkrétním EOA nebo jím podepsané. Tyto chytré kontrakty pak mohou vlastnit tokeny, které jsou pod kontrolou EOA."
author: Ori Pomerantz
tags: ["bez gasu", "ERC-20", "abstrakce účtu"]
skill: intermediate
breadcrumb: Token bez gasu
lang: cs
published: 2026-04-01
---

## Úvod {#introduction}

[Předchozí článek](/developers/tutorials/gasless/) se zabýval přístupem do vaší vlastní aplikace bez gasu pomocí podpisů EIP-712, ale ten je omezen pouze na vaše vlastní chytré kontrakty. Pomocí [abstrakce účtu](/roadmap/account-abstraction/) můžeme vytvořit peněženky ve formě chytrých kontraktů, které přijímají dva typy transakcí a předávají je do požadovaného cíle:

- Transakce odeslané konkrétním EOA (což vyžaduje, aby tento EOA měl ETH)
- Transakce odeslané odkudkoli, ale podepsané stejným EOA.

Tímto způsobem můžeme účtu poskytnout způsob bez gasu, jak držet aktiva (tokeny atd.) a provádět všechny funkce, které může provádět EOA s gasem.

### Proč nemůžeme požadavek jednoduše předat? {#why-no-tx-origin}

V ERC-20 a souvisejících standardech je vlastníkem účtu [`msg.sender`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties), adresa, která zavolala kontrakt tokenu, což nemusí být nutně původce transakce, [`tx.origin`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties). To je vyžadováno z [bezpečnostních důvodů](https://docs.soliditylang.org/en/v0.8.35-pre.1/security-considerations.html#tx-origin). To znamená, že pokud předáme požadavky na převod tokenů, pokusí se převést tokeny z adresy předávajícího (relayer) spíše než z adresy ovládané uživatelem.

Existuje řešení, které vám umožňuje použít adresu EOA prostřednictvím [EIP-7702](https://eip7702.io/), ale vyžaduje podepsání potenciálně nebezpečné delegace, takže jej můžete použít pouze k delegování na chytrý kontrakt, který poskytovatel peněženky schválí. Pro tento tutoriál preferuji mnohem jednodušší metodu vytvoření chytrého kontraktu jako proxy pro uživatele.

## Ukázka v praxi {#in-action}

1. Ujistěte se, že máte [Node](https://nodejs.org/en/download) i [Foundry](https://www.getfoundry.sh/introduction/installation).

2. Naklonujte aplikaci a nainstalujte potřebný software.

   ```sh
   git clone https://github.com/qbzzt/260315-gasless-tokens.git
   cd 260315-gasless-tokens
   forge build
   cd server
   npm install
   ```

3. Upravte `.env` a nastavte `SEPOLIA_PRIVATE_KEY` na peněženku, která má ETH na síti Sepolia. Pokud potřebujete Sepolia ETH, [použijte faucet](/developers/docs/networks/#sepolia), abyste jej získali. V ideálním případě by se tento soukromý klíč měl lišit od toho, který máte v peněžence v prohlížeči.

4. Spusťte server.

   ```sh
   npm run dev
   ```

5. Přejděte do aplikace na URL [`http://localhost:5173`](http://localhost:5173).

6. Klikněte na **Connect with Injected** pro připojení k peněžence. Schvalte to v peněžence a v případě potřeby schvalte změnu na síť Sepolia.

7. Sjeďte dolů a klikněte na **Deploy UserProxy (slow process)**.

8. Kdy je uživatelská proxy nasazena, poznáte podle toho, že se vedle **UserProxy access** objeví adresa. Pokud jste čekali 24 sekund (2 bloky) a stále se tak nestalo, může být problém s detekcí změn.

   Pokud k tomu dojde, přejděte do [prohlížeče bloků Sepolia](https://eth-sepolia.blockscout.com/) a zadejte hash transakce nasazení, který vidíte ve výstupu serveru u `npm run dev`. Kliknutím na vytvořený kontrakt zobrazíte jeho adresu a poté ji zkopírujte. Vložte adresu do pole _Or enter existing proxy address_ a klikněte na **Set proxy address**.

9. Kliknutím na **Request more tokens for proxy** odešlete volání funkce [`faucet`](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=read_write_contract#0xde5f72fd) kontraktu ERC-20 pro získání tokenů. **Potvrďte** podpis v peněžence. Tokeny samozřejmě dorazí na adresu proxy, nikoli na adresu uživatele.

10. Sjeďte dolů a klikněte na odkaz pod _Last transaction:_. Tím se otevře prohlížeč, který vám ukáže transakci `faucet`.

11. Do pole _amount to transfer_ zadejte číslo od jedné do tisíce. Kliknutím na **Transfer** provedete převod tokenů na svou vlastní adresu. Než kliknete na **Confirm** pro požadavek, všimněte si, že podepisovaná data jsou neprůhledná. Uživatelé by jen těžko chápali, co podepisují. Pamatujte, že o tom budeme diskutovat [níže](#vulnerabilities).

12. Po potvrzení transakce počkejte, až uvidíte změnu jak v _your balance_, tak v _proxy balance_. Všimněte si, že to také nějakou dobu potrvá, protože Sepolia má čas bloku 12 sekund.

## Jak to funguje {#how-work}

Pro zážitek bez gasu potřebujeme uživatelské rozhraní pro uživatele, server pro směrování zpráv z uživatelského rozhraní do řetězce a chytrý kontrakt, který je přijme a ověří.

### Chytrý kontrakt peněženky {#wallet-smart-contract}

Toto je [chytrý kontrakt](https://github.com/qbzzt/260315-gasless-tokens/blob/main/contracts/src/UserProxy.sol). Jeho účelem je udělat cokoli, co skutečný vlastník požaduje, bez ohledu na kanál použitý k požadavku, a ignorovat vše ostatní. K tomu jeho funkce přijímají cílovou adresu, kterou mají zavolat, a data, která se k jejímu zavolání mají použít.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract UserProxy {
    address immutable OWNER;
    uint public nonce = 0;
```

Identita vlastníka a [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce), aby se zabránilo opakování zpráv. Protože nonce je proměnná `public`, kompilátor Solidity také vytvoří view funkci [`nonce()`](https://eth-sepolia.blockscout.com/address/0x9Ba259C15B46ee4b72dEf7b93D85Ec18f5f6e50E?tab=read_write_contract#0xaffed0e0), která umožňuje offchain kódu číst její hodnotu.

```solidity
    bytes32 private constant SIGNED_ACCESS_TYPEHASH =
        keccak256("SignedAccess(address target,bytes data,uint256 nonce)");

    bytes32 private constant SIGNED_ACCESS_PAYABLE_TYPEHASH =
        keccak256("SignedAccessPayable(address target,bytes data,uint256 nonce,uint256 value)");

    bytes32 immutable DOMAIN_SEPARATOR;
```

Informace potřebné k ověření [podpisů EIP-712](https://eips.ethereum.org/EIPS/eip-712).

```solidity
    constructor(address owner_) {
        OWNER = owner_;
```

`UserProxy` je vázán na jedinou adresu vlastníka. To je nutné, protože může vlastnit aktiva (tokeny ERC-20, NFT atd.). Nechceme míchat aktiva patřící různým vlastníkům.

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

[Oddělovač domény (domain separator)](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). Nelze jej vypočítat v době kompilace, protože závisí na ID řetězce a adrese kontraktu. To znemožňuje, aby byl UserProxy oklamán zprávou připravenou pro jiný.

```solidity
    event CallResult(address target, bytes returnData);
```

Zalogování výsledků volání.

```solidity
    function directAccess(address target, bytes calldata data)
            external returns (bytes memory) {
```

Tuto funkci může volat přímo vlastník. Pokud nejsou k dispozici žádné relayery, vlastník může stále přistupovat k aktivům přímo na blockchainu (pokud má uživatel ETH).

```solidity
        require(msg.sender == OWNER, "Only owner can call");
        (bool success, bytes memory returnData) = target.call(data);
        require(success, "Call failed");

        emit CallResult(target, returnData);

        return returnData;
    }
```

Pokud jsme voláni _přímo_ vlastníkem, zavoláme cíl s poskytnutými daty volání (calldata).

```solidity
    function signedAccess(
        address target,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s)
```

Toto je hlavní funkce `UserProxy`. Získá `target` a `data`, stejně jako podpis.

```solidity
    external returns (bytes memory) {
        // Vypočítat EIP-712 digest
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

Digest také obsahuje nonce, ale nepotřebujeme jej přijímat z transakce; správnou hodnotu již známe. Podpis s nesprávným nonce bude odmítnut.

```solidity

    // Obnovit podepisujícího
    address signer = ecrecover(digest, v, r, s);
    require(signer == OWNER, "Signature invalid or not by owner");
```

Pokud je podpis neplatný, `ecrecover` obvykle vrátí jinou adresu a nebude přijat.

```solidity
    (bool success, bytes memory returnData) = target.call(data);
    require(success, "Call failed");
```

Zavoláme kontrakt, který nám uživatel řekl, abychom zavolali, a pokud to nebude úspěšné, transakci zvrátíme (revert).

```solidity
    emit CallResult(target, returnData);

    nonce++; // Zvýšit nonce pro zabránění opakování

    return returnData;
}
```

V případě úspěchu vygenerujeme událost logu a zvýšíme nonce.

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

Toto jsou téměř identické varianty, které vám také umožňují převést ETH z kontraktu.

### Relayer {#relayer}

Relayer je [serverová komponenta](/developers/tutorials/server-components/). Je napsán v JavaScriptu; zdrojový kód si můžete prohlédnout [zde](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/index.js).

```js
import express from "express";
import { createServer as createViteServer } from "vite";
import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import dotenv from 'dotenv'
```

Knihovny, které potřebujeme. Toto je server [Express](https://expressjs.com/), který používá [Vite](https://vite.dev/) k obsluze kódu uživatelského rozhraní. Používáme [Viem](https://viem.sh/) ke komunikaci s blockchainem a [dotenv](https://www.dotenv.org/) ke čtení soukromého klíče pro adresu, která odesílá transakci.

```js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const UserProxy = require('../contracts/out/UserProxy.sol/UserProxy.json')
```

Toto je jednoduchý způsob, jak přečíst zkompilovaný `UserProxy`. Potřebujeme ABI, abychom mohli volat `UserProxy`, a zkompilovaný kód, abychom jej mohli nasadit pro uživatele.

```js
dotenv.config()
const sepoliaAccount = privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY)
console.log("Using account:", sepoliaAccount.address)
```

Přečteme soubor `.env`, extrahujeme adresu a vypíšeme ji do konzole.

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

Klienti Viem, kteří komunikují s blockchainem.

```js
const start = async () => {
  const app = express()
```

Spuštění serveru Express.

```js
  app.use(express.json())
```

Řekneme Expressu, aby přečetl tělo požadavku, a pokud je to JSON, aby jej analyzoval.

```js
  app.post("/server/deploy", async (req, res) => {
```

Toto je kód, který zpracovává požadavky na nasazení proxy. Všimněte si, že jsme zde zranitelní vůči útokům [denial-of-service](https://en.wikipedia.org/wiki/Denial-of-service_attack), protože útočník nás může spamovat požadavky na nasazení proxy, dokud se naše ETH nevyčerpá. V produkčním systému bychom pravděpodobně vyžadovali, aby byl požadavek na nasazení proxy podepsán a aby podepisující byl stávajícím zákazníkem.

```js
    try {
      const ownerAddress = req.body.ownerAddress
```

Získání adresy vlastníka z požadavku.

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

[Nasadíme kontrakt](https://viem.sh/docs/contract/deployContract#deploycontract) a [počkáme, dokud nebude nasazen](https://viem.sh/docs/actions/public/waitForTransactionReceipt).

```js
      res.json({ contractAddress: receipt.contractAddress })
```

Pokud je vše v pořádku, vrátíme adresu proxy do uživatelského rozhraní.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

Pokud nastane problém, nahlásíme ho.

```js
  app.post("/server/message", async (req, res) => {
```

Toto je kód, který zpracovává uživatelské zprávy pro kontrakt `UserProxy`. Toto je další bod zranitelný vůči útoku denial-of-service.

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

Získáme data požadavku a použijeme je k volání `signedAccess` na proxy.

```js
      console.log("Message transaction hash:", txHash)

      res.json({ txHash })
```

Nahlásíme zpět hash transakce. To umožňuje uživatelskému rozhraní zobrazit URL, aby si uživatel mohl transakci zkontrolovat.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

Opět, pokud nastane problém, nahlásíme ho.

```js
  // Nechat Vite zpracovat vše ostatní
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

Na vše ostatní použijeme Vite, které za nás obstará servírování uživatelského rozhraní.

### Uživatelské rozhraní {#user-interface}

[Toto je kód uživatelského rozhraní](https://github.com/qbzzt/260315-gasless-tokens/tree/main/server/src). Většina kódu je téměř identická s tím, který je zdokumentován v [tomto článku](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/#file-walk-through), s výjimkou [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx).

Části [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) jsou podobné [`Greeter.jsx`](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx) v [tomto článku](/developers/tutorials/gasless/#ui-changes). Zde jsou nové části.

```js
import {
   encodeFunctionData
       } from 'viem'
```

[Tato funkce](https://viem.sh/docs/contract/encodeFunctionData) vytváří data volání (calldata) pro volání funkce EVM. To je nutné, aby uživatel mohl data volání podepsat.

```js
import UserProxy from '../../contracts/out/UserProxy.sol/UserProxy.json'
```

`UserProxy`, vysvětlený výše.

```js
import Erc20 from '../../contracts/out/Faucet.sol/FaucetToken.json'
```

[Tento kontrakt](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=contract) je z větší části normální kontrakt ERC-20, s přidáním jedné důležité funkce, `faucet()`. Tato funkce uděluje tokeny každému, kdo o ně požádá pro testovací účely.

```js
const erc20Addrs = {
  // Sepolia
    11155111: '0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78'
}
```

Adresa pro `FaucetToken`.

```js
const Address = ({ address }) => {
   if (!address) return null
   return (
      <a href={`https://eth-sepolia.blockscout.com/address/${address}?tab=read_write_contract`} target="_blank">{address}</a>
   )
}
```

Tato komponenta vypisuje adresu s odkazem na kontrakt v prohlížeči bloků.

```js
const Token = () => {
    ...
```

Toto je hlavní komponenta, která odvádí většinu práce.

```js
  const [ balanceAmount, setBalanceAmount ] = useState("Loading...")
```

Zůstatek tokenů na adrese uživatele.

```js
  const [ proxyAddr, setProxyAddr ] = useState(null)
```

Adresa proxy vlastněné uživatelem.

```js
  const [ proxyBalanceAmount, setProxyBalanceAmount ] = useState("Loading...")
```

Zůstatek tokenů na proxy.

```js
  const [ newProxyAddr, setNewProxyAddr ] = useState("")
```

Toto pole se používá, když uživatel ručně nastaví adresu proxy. Možnost ručně nastavit adresu proxy umožňuje uživateli použít existující proxy místo toho, aby pokaždé nasazoval novou (a ztratil všechny tokeny vlastněné starou proxy).

```js
  const [ txHash, setTxHash ] = useState(null)
```

Hash poslední transakce, který se používá k zobrazení odkazu do prohlížeče bloků, aby si uživatel mohl tuto transakci zkontrolovat.

```js
  const [ transferToken, setTransferToken ] = useState("")
  const [ transferAmount, setTransferAmount ] = useState("")
  const [ transferTo, setTransferTo ] = useState("")
```

Všechna tato pole se používají k odesílání příkazů k převodu tokenů do kontraktu ERC-20. Může to být `FaucetToken`, ale nemusí. Funkce [`transfer`](/developers/tutorials/erc20-annotated-code/#transfer-tokens) je součástí standardu ERC-20.

```js
  const balance = useReadContract({
    ...
  })


  const proxyBalance = useReadContract({
    ...
  })
```

Přečteme dva zůstatky tokenů, které nás zajímají: kolik vlastní uživatel a kolik vlastní proxy.

```js
  const nonce = useReadContract({
      address: proxyAddr,
      abi: UserProxy.abi,
      functionName: 'nonce',
      args: [],
  })
```

Abychom zabránili útokům typu replay (například když prodejce zopakuje transakci, která mu dává peníze), používáme [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Potřebujeme znát aktuální hodnotu, abychom ji mohli přidat k datům, která podepisujeme.

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

Použijeme [`useEffect`](https://react.dev/reference/react/useEffect) k aktualizaci zůstatku zobrazeného uživateli, když se změní informace přečtené z blockchainu.

```js
  useEffect(() => {
    setTransferToken(faucetAddr)
  }, [faucetAddr])

  useEffect(() => {
    setTransferTo(account.address)
  }, [account.address])
```

Výchozí nastavení je převést tokeny `FaucetToken` na vlastní účet uživatele. Zde tyto hodnoty nastavíme, když je obdržíme z Viem.

```js
  const proxyAddressChange = (evt) => setNewProxyAddr(evt.target.value)
  const transferTokenChange = (evt) => setTransferToken(evt.target.value)
  const transferToChange = (evt) => setTransferTo(evt.target.value)
  const transferAmountChange = (evt) => setTransferAmount(evt.target.value)
```

Obslužné rutiny událostí pro případ, kdy se změní textová pole.

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

Požádáme server o nasazení proxy pro tohoto uživatele.

```js
  const signMessage = async(proxyAddr, target, calldata) => {
```

Podepíšeme zprávu před jejím odesláním na server, aby ji odeslal do `UserProxy` onchain. To je vysvětleno [zde](/developers/tutorials/gasless/#ui-changes). Musíme podepsat zprávu s cílovou adresou (adresou tokenu, který voláme) a daty volání (calldata), která se mají odeslat.

```js
    const domain = {
      .
      .
      .
    return {v, r, s}
  }

  const messageUserProxy = async (proxy, target, data, v, r, s) => {
```

Odešleme podepsanou zprávu do `UserProxy`, který ověří podpis a poté ji odešle na `target`.

```js
    try {
      const response = await fetch("/server/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxy, target,  // obě adresy
          data,           // data volání k odeslání na cíl
          v, r, s         // podpis
        })
      })
      const serverResponse = await response.json()
      setTxHash(serverResponse.txHash)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Odešleme požadavek na server, a když obdržíme odpověď, získáme hash transakce.

```js
  const faucetSimulation = useSimulateContract({
    address: faucetAddr,
    abi: Erc20.abi,
    functionName: 'faucet',
    account: account.address
  })
```

Simulujeme volání funkce `faucet`. Tlačítko faucet povolíme pouze v případě, že je to úspěšné.

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

K volání funkce přes server a `UserProxy` postupujeme ve třech krocích:

1. Vytvoříme data volání (calldata) k podepsání a odeslání pomocí [`encodeFunctionData`](https://viem.sh/docs/contract/encodeFunctionData).

2. Podepíšeme zprávu (cílová adresa, data volání a nonce).

3. Odešleme zprávu na server.

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

Tato část komponenty vám umožňuje používat `FaucetToken` přímo z prohlížeče. Jejím hlavním účelem je usnadnit ladění.

```js
         <h4>UserProxy access <Address address={proxyAddr} /></h4>
         <button onClick={deployUserProxy}>
         Deploy UserProxy (slow process)
         </button>
```

Umožníme uživateli nasadit nový `UserProxy`.

```js
         <br /><br />
         <input type="text" placeholder="Nebo zadejte existující proxy adresu" value={newProxyAddr} onChange={proxyAddressChange} />
         <br /><br />
         <button
            onClick={() => setProxyAddr(newProxyAddr)}
            disabled={newProxyAddr.match(/^0x[a-fA-F0-9]{40}$/) === null}
         >
            Set proxy address
         </button>
```

Uživatelům umožníme kliknout na **Set proxy address** pouze tehdy, když zadají legitimní adresu. Všimněte si, že to nezaručuje, že dotyčná adresa je skutečně kontrakt `UserProxy`. Je možné takovou kontrolu přidat, ale bude to mnohem pomalejší (horší uživatelský zážitek) a nezlepší to bezpečnost (útočníci mohou vždy použít svůj vlastní kód pro uživatelské rozhraní).

```js
         <br /><br />
         { proxyAddr && (
```

Zbytek zobrazíme _pouze_ v případě, že existuje legitimní adresa proxy.

```js
            <>
               Proxy balance: {proxyBalanceAmount}
               <br />
               Proxy nonce: {nonce?.data?.toString() ?? "Loading..."}
```

Uživatel nepotřebuje znát nonce; to je pouze pro účely ladění.

```js
               <br />
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyFaucet}
               >
                  Request more tokens for proxy
               </button>
```

Nemůžeme simulovat volání `faucet()` přes proxy. Můžeme však alespoň zajistit, že máme proxy a že nám proxy nahlásila nonce.

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

Umožníme uživateli vydávat transakce převodu ERC-20.

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

Pokud existuje hash poslední transakce, zobrazíme odkaz, aby si jej uživatel mohl prohlédnout v prohlížeči bloků.

```js
 
</div>
    </>
  )
}

export {Token}
```

Toto je jen standardní kód (boilerplate) Reactu.

## Zranitelnosti {#vulnerabilities}

Náš server je zranitelný vůči útokům denial-of-service. Tento útok je vysvětlen [v předchozím článku série](/developers/tutorials/gasless/#dos-on-server).

Navíc podporujeme špatné chování uživatelů. Toto je to, co po uživateli žádáme, aby podepsal:

![Screen capture with opaque calldata](./fig-1-opaque-calldata.png)

_My_ víme, že se jedná o legitimní převod ERC-20 pro token, částku a cílovou adresu, kterou chce uživatel převést. Většina uživatelů ale neví, jak interpretovat data volání (calldata), a nemá tušení, co podepisuje. To je špatný návrh ze dvou důvodů:

- Někteří uživatelé nás nebudou používat, protože nedůvěřují datům, která jim říkáme, aby podepsali.
- Jiní uživatelé nám _budou_ důvěřovat a naučí se, že by měli prostě podepisovat data volání, aniž by chápali, o co jde. To znamená, že pokud se útočníkovi Adamovi podaří přesměrovat je na svůj web, může je nechat podepsat transakci, která mu udělí všechny USDC (nebo DAI, nebo jakékoli jiné ERC-20), které uživatel vlastní.

Řešením je mít v `UserProxy` samostatné funkce pro běžně používané funkce, jako je převod. Pak mohou uživatelé podepsat něco, čemu rozumí.

![Screen capture with transfer details](./fig-2-transparent-signature.png)

**Poznámka:** Ačkoli uživatelé mohou používat jakoukoli peněženku chtějí, důrazně se doporučuje, aby je aplikace používající EIP-712 povzbuzovaly k používání peněženky, která [zobrazuje celá data podpisu](https://rabby.io/). Některé peněženky adresu zkracují, což je nebezpečné. Útočník může vytvořit adresu, která má stejné počáteční a koncové znaky, ale liší se uprostřed.

![Screen capture with truncated addresses](./fig-3-truncated-addresses.png)

## Závěr {#conclusion}

Kromě výše uvedených zranitelností má řešení v tomto tutoriálu několik nevýhod, které nám Ethereum může pomoci vyřešit.

- _Odolnost vůči cenzuře_. V současné době mohou uživatelé používat váš server, konkurenční server nastavený někým jiným, nebo se připojit k Ethereu přímo, což s sebou nese náklady na gas. Použití [ERC-4337](https://docs.erc4337.io/#what-is-erc-4337) umožňuje uživatelům nabídnout svou transakci velké skupině serverů, což snižuje pravděpodobnost, že jejich transakce budou cenzurovány.
- _Aktiva vlastněná EOA_. Jak bylo uvedeno výše, [EIP-7702](https://eip7702.io/) lze použít ke správě aktiv, která již vlastní adresa EOA. To má své potíže, ale někdy je to nutné.

Doufám, že v blízké budoucnosti zveřejním tutoriály o přidání těchto funkcí.

[Zde najdete další mou práci](https://cryptodocguy.pro/).
