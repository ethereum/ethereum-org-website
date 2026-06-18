---
title: "Kuruhusu watumiaji wako wasio na gesi kushikilia tokeni na kuita mikataba"
description: Kwa kutumia udhanifu wa akaunti, tunaweza kuunda mikoba ya mkataba mahiri inayokubali miamala iliyotumwa na EOA mahususi au iliyosainiwa na EOA hiyo. Mikataba hii mahiri inaweza kumiliki tokeni, ambazo ziko chini ya udhibiti wa EOA.
author: Ori Pomerantz
tags:
  - bila gesi
  - erc-20
  - udhanifu wa akaunti
skill: intermediate
breadcrumb: Tokeni isiyo na gesi
lang: sw
published: 2026-04-01
---

## Utangulizi {#introduction}

[Makala iliyopita](/developers/tutorials/gasless/) ilijadili kutumia ufikiaji usio na gesi kwenye programu yako mwenyewe kwa kutumia sahihi za EIP-712, lakini inakomea kwenye mikataba yako mahiri pekee. Kwa kutumia [udhanifu wa akaunti](/roadmap/account-abstraction/), tunaweza kuunda mikoba ya mkataba mahiri inayokubali aina mbili za miamala na kuipeleka kwenye kituo kilichoombwa:

- Miamala iliyotumwa na EOA mahususi (ambayo inahitaji EOA hiyo kuwa na ETH)
- Miamala iliyotumwa kutoka popote, lakini iliyosainiwa na EOA hiyo hiyo.

Kwa njia hii, tunaweza kutoa njia isiyo na gesi kwa akaunti kushikilia rasilimali (tokeni, n.k.) na kufanya kazi zote ambazo EOA yenye gesi inaweza kufanya.

### Kwa nini hatuwezi tu kupeleka ombi? {#why-no-tx-origin}

Katika viwango vya ERC-20 na vinavyohusiana, mmiliki wa akaunti ni [`msg.sender`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties), anwani iliyoita mkataba wa tokeni, ambayo si lazima iwe mwanzilishi wa muamala, [`tx.origin`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties). Hili linahitajika kwa [sababu za kiusalama](https://docs.soliditylang.org/en/v0.8.35-pre.1/security-considerations.html#tx-origin). Hii inamaanisha kuwa ikiwa tutapeleka maombi ya hamisho la tokeni, yatajaribu kuhamisha tokeni kutoka kwenye anwani ya mpelekaji badala ya anwani inayodhibitiwa na mtumiaji.

Kuna suluhisho linalokuruhusu kutumia anwani ya EOA kupitia [EIP-7702](https://eip7702.io/), lakini inahitaji kusaini ukaimishaji unaoweza kuwa hatari, kwa hivyo unaweza kuitumia tu kukaimisha kwa mkataba mahiri ambao mtoa huduma wa mkoba anauidhinisha. Kwa mafunzo haya ninapendelea njia rahisi zaidi ya kuunda mkataba mahiri kama proksi kwa mtumiaji.

## Kuiona ikifanya kazi {#in-action}

1. Hakikisha una [Node](https://nodejs.org/en/download) na [Foundry](https://www.getfoundry.sh/introduction/installation).

2. Nakili programu na usakinishe programu muhimu.

   ```sh
   git clone https://github.com/qbzzt/260315-gasless-tokens.git
   cd 260315-gasless-tokens
   forge build
   cd server
   npm install
   ```

3. Hariri `.env` ili kuweka `SEPOLIA_PRIVATE_KEY` kwenye mkoba ulio na ETH kwenye Sepolia. Ikiwa unahitaji ETH ya Sepolia, [tumia bomba](/developers/docs/networks/#sepolia) kuipata. Kimsingi, ufunguo wa siri huu unapaswa kuwa tofauti na ule ulio nao kwenye mkoba wa kivinjari chako.

4. Anzisha seva.

   ```sh
   npm run dev
   ```

5. Vinjari kwenye programu kwenye URL [`http://localhost:5173`](http://localhost:5173).

6. Bofya **Connect with Injected** ili kuunganisha kwenye mkoba. Idhinisha kwenye mkoba, na uidhinishe mabadiliko kwenda Sepolia ikiwa ni lazima.

7. Shuka chini na ubofye **Deploy UserProxy (slow process)**.

8. Unaweza kuona wakati proksi ya mtumiaji inaposambazwa kwa sababu kuna anwani karibu na **UserProxy access**. Ikiwa ulisubiri sekunde 24 (vitalu 2) na bado haijafanyika, kunaweza kuwa na tatizo la kutambua mabadiliko.

   Ikiwa ndivyo ilivyo, nenda kwenye [Kichunguzi cha Bloku cha Sepolia](https://eth-sepolia.blockscout.com/) na uweke heshi ya muamala wa usambazaji unayoiona kwenye matokeo ya seva kwenye `npm run dev`. Bofya mkataba ulioundwa ili kutazama anwani yake, kisha uinakili. Bandika anwani kwenye sehemu ya _Or enter existing proxy address_, kisha ubofye **Set proxy address**.

9. Bofya **Request more tokens for proxy** ili kuwasilisha mwito kwenye kipengele cha [`faucet`](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=read_write_contract#0xde5f72fd) cha mkataba wa ERC-20 ili kupata tokeni. **Thibitisha** sahihi kwenye mkoba. Bila shaka, tokeni zinafika kwenye anwani ya proksi, si ya mtumiaji.

10. Shuka chini na ubofye kiungo kilicho chini ya _Last transaction:_. Hii itafungua kivinjari ili kukuonyesha muamala wa `faucet`.

11. Kwenye _amount to transfer_, weka nambari kati ya moja na elfu moja. Bofya **Transfer** ili kuhamisha tokeni kwenye anwani yako mwenyewe. Kabla hujabofya **Confirm** kwa ajili ya ombi, ona kwamba data inayosainiwa haieleweki. Watumiaji wangekuwa na wakati mgumu kuelewa wanachosaini. Kumbuka kwamba tutaijadili [hapa chini](#vulnerabilities).

12. Baada ya muamala kuthibitishwa, subiri kuona mabadiliko katika _your balance_ na _proxy balance_. Kumbuka kwamba hii pia itachukua muda, kwa sababu Sepolia ina muda wa kitalu wa sekunde 12.

## Jinsi inavyofanya kazi {#how-work}

Kwa matumizi yasiyo na gesi, tunahitaji kiolesura cha mtumiaji kwa ajili ya mtumiaji, seva ya kuelekeza jumbe kutoka kwenye kiolesura cha mtumiaji hadi kwenye mnyororo, na mkataba mahiri wa kuzipokea na kuzithibitisha.

### Mkataba mahiri wa mkoba {#wallet-smart-contract}

Huu ni [mkataba mahiri](https://github.com/qbzzt/260315-gasless-tokens/blob/main/contracts/src/UserProxy.sol). Lengo lake ni kufanya chochote ambacho mmiliki halisi anaomba, bila kujali njia iliyotumika kukiomba, na kupuuza kila kitu kingine. Ili kufanya hivi, vipengele vyake hupokea anwani lengwa ya kuita na data ya kutumia kuiita.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract UserProxy {
    address immutable OWNER;
    uint public nonce = 0;
```

Utambulisho wa mmiliki na [nonsi](https://en.wikipedia.org/wiki/Cryptographic_nonce) ili kuzuia jumbe zisirudiwe. Kwa sababu nonsi ni kigezo cha `public`, kikusanyaji cha Solidity pia huunda kipengele cha kutazama, [`nonce()`](https://eth-sepolia.blockscout.com/address/0x9Ba259C15B46ee4b72dEf7b93D85Ec18f5f6e50E?tab=read_write_contract#0xaffed0e0), kinachoruhusu msimbo ulio nje ya mnyororo kusoma thamani yake.

```solidity
    bytes32 private constant SIGNED_ACCESS_TYPEHASH =
        keccak256("SignedAccess(address target,bytes data,uint256 nonce)");

    bytes32 private constant SIGNED_ACCESS_PAYABLE_TYPEHASH =
        keccak256("SignedAccessPayable(address target,bytes data,uint256 nonce,uint256 value)");

    bytes32 immutable DOMAIN_SEPARATOR;
```

Taarifa zinazohitajika ili kuthibitisha [sahihi za EIP-712](https://eips.ethereum.org/EIPS/eip-712).

```solidity
    constructor(address owner_) {
        OWNER = owner_;
```

`UserProxy` inafungamanishwa na anwani moja ya mmiliki. Hili ni muhimu kwa sababu inaweza kumiliki rasilimali (tokeni za ERC-20, NFT, n.k.). Hatutaki kuchanganya rasilimali zinazomilikiwa na wamiliki tofauti.

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

[Kitenganishi cha kikoa](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). Hakiwezi kukokotolewa wakati wa kukusanya, kwa sababu inategemea kitambulisho cha mnyororo na anwani ya mkataba. Hii inafanya iwezekane kwa UserProxy kudanganywa na ujumbe ulioandaliwa kwa ajili ya mwingine.

```solidity
    event CallResult(address target, bytes returnData);
```

Weka logi ya matokeo ya mwito.

```solidity
    function directAccess(address target, bytes calldata data)
            external returns (bytes memory) {
```

Kipengele hiki kinaweza kuitwa moja kwa moja na mmiliki. Ikiwa hakuna wapelekaji wanaopatikana, mmiliki bado anaweza kufikia rasilimali moja kwa moja kwenye mnyororo wa vitalu (ikiwa mtumiaji ana ETH).

```solidity
        require(msg.sender == OWNER, "Only owner can call");
        (bool success, bytes memory returnData) = target.call(data);
        require(success, "Call failed");

        emit CallResult(target, returnData);

        return returnData;
    }
```

Ikiwa tunaitwa _moja kwa moja_ na mmiliki, ita lengwa kwa kutumia data za mwito zilizotolewa.

```solidity
    function signedAccess(
        address target,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s)
```

Hiki ni kipengele kikuu cha `UserProxy`. Inapata `target` na `data`, pamoja na sahihi.

```solidity
    external returns (bytes memory) {
        // Kokotoa muhtasari wa EIP-712
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

Muhtasari pia unajumuisha nonsi, lakini hatuhitaji kuipokea kutoka kwenye muamala; tayari tunajua thamani sahihi. Sahihi yenye nonsi isiyo sahihi itakataliwa.

```solidity

    // Rejesha msaini
    address signer = ecrecover(digest, v, r, s);
    require(signer == OWNER, "Signature invalid or not by owner");
```

Ikiwa sahihi ni batili, `ecrecover` kwa kawaida itarudisha anwani tofauti, na haitakubaliwa.

```solidity
    (bool success, bytes memory returnData) = target.call(data);
    require(success, "Call failed");
```

Ita mkataba ambao mtumiaji alituambia tuuite, na tengua ikiwa haujafanikiwa.

```solidity
    emit CallResult(target, returnData);

    nonce++; // Ongeza nonsi ili kuzuia marudio

    return returnData;
}
```

Ikiwa imefanikiwa, toa tukio la logi na uongeze nonsi.

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

Hizi ni tofauti zinazokaribia kufanana ambazo zinakuruhusu pia kuhamisha ETH nje ya mkataba.

### Mpelekaji {#relayer}

Mpelekaji ni [sehemu ya seva](/developers/tutorials/server-components/). Imeandikwa kwa JavaScript; unaweza kuona msimbo chanzo [hapa](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/index.js).

```js
import express from "express";
import { createServer as createViteServer } from "vite";
import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import dotenv from 'dotenv'
```

Maktaba tunazohitaji. Hii ni seva ya [Express](https://expressjs.com/), ambayo inatumia [Vite](https://vite.dev/) kutoa msimbo wa kiolesura cha mtumiaji. Tunatumia [Viem](https://viem.sh/) kuwasiliana na mnyororo wa vitalu, na [dotenv](https://www.dotenv.org/) kusoma ufunguo wa siri kwa ajili ya anwani inayotuma muamala.

```js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const UserProxy = require('../contracts/out/UserProxy.sol/UserProxy.json')
```

Hii ni njia rahisi ya kusoma `UserProxy` iliyokusanywa. Tunahitaji ABI ili kuweza kuita `UserProxy`, na msimbo uliokusanywa ili kuweza kuisambaza kwa ajili ya mtumiaji.

```js
dotenv.config()
const sepoliaAccount = privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY)
console.log("Using account:", sepoliaAccount.address)
```

Soma faili la `.env`, toa anwani, na uichapishe kwenye kiweko.

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

Wateja wa Viem wanaozungumza na mnyororo wa vitalu.

```js
const start = async () => {
  const app = express()
```

Endesha seva ya Express.

```js
  app.use(express.json())
```

Iambie Express isome kiini cha ombi, na ikiwa ni JSON iichanganue.

```js
  app.post("/server/deploy", async (req, res) => {
```

Huu ni msimbo unaoshughulikia maombi ya kusambaza proksi. Kumbuka kwamba tuko hatarini kwa mashambulizi ya [kunyimwa huduma](https://en.wikipedia.org/wiki/Denial-of-service_attack) hapa kwa sababu mshambuliaji anaweza kututumia maombi mengi ya kusambaza proksi hadi ETH yetu iishe. Kwenye mfumo wa uzalishaji, labda tungehitaji kwamba ombi la kusambaza proksi lisainiwe na kwamba msaini awe mteja aliyepo.

```js
    try {
      const ownerAddress = req.body.ownerAddress
```

Pata anwani ya mmiliki kutoka kwenye ombi.

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

[Sambaza mkataba](https://viem.sh/docs/contract/deployContract#deploycontract) na [usubiri hadi usambazwe](https://viem.sh/docs/actions/public/waitForTransactionReceipt).

```js
      res.json({ contractAddress: receipt.contractAddress })
```

Ikiwa kila kitu kiko sawa, rudisha anwani ya proksi kwenye kiolesura cha mtumiaji.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

Ikiwa kuna tatizo, liripoti.

```js
  app.post("/server/message", async (req, res) => {
```

Huu ni msimbo unaochakata jumbe za mtumiaji kwa ajili ya mkataba wa `UserProxy`. Hili ni eneo lingine lililo hatarini kwa shambulio la kunyimwa huduma.

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

Pata data ya ombi na uitumie kuita `signedAccess` kwenye proksi.

```js
      console.log("Message transaction hash:", txHash)

      res.json({ txHash })
```

Ripoti heshi ya muamala. Hii inaruhusu UI kuonyesha URL ili mtumiaji akague muamala.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

Tena, ikiwa kuna tatizo, liripoti.

```js
  // Acha Vite ishughulikie kila kitu kingine
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

Kwa kila kitu kingine, tumia Vite, ambayo inashughulikia kutoa kiolesura cha mtumiaji kwa ajili yetu.

### Kiolesura cha mtumiaji {#user-interface}

[Huu ni msimbo wa kiolesura cha mtumiaji](https://github.com/qbzzt/260315-gasless-tokens/tree/main/server/src). Sehemu kubwa ya msimbo inakaribia kufanana na ule ulioandikwa kwenye [makala hii](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/#file-walk-through), isipokuwa [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx).

Sehemu za [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) zinafanana na [`Greeter.jsx`](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx) katika [makala hii](/developers/tutorials/gasless/#ui-changes). Hizi hapa ni sehemu mpya.

```js
import {
   encodeFunctionData
       } from 'viem'
```

[Kipengele hiki](https://viem.sh/docs/contract/encodeFunctionData) kinaunda data za mwito kwa ajili ya mwito wa kipengele cha EVM. Hili ni muhimu ili mtumiaji aweze kusaini data za mwito.

```js
import UserProxy from '../../contracts/out/UserProxy.sol/UserProxy.json'
```

`UserProxy`, iliyoelezwa hapo juu.

```js
import Erc20 from '../../contracts/out/Faucet.sol/FaucetToken.json'
```

[Mkataba huu](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=contract) kwa kiasi kikubwa ni mkataba wa kawaida wa ERC-20, pamoja na nyongeza ya kipengele kimoja muhimu, `faucet()`. Kipengele hiki kinatoa tokeni kwa yeyote anayeziomba kwa madhumuni ya majaribio.

```js
const erc20Addrs = {
  // Sepolia
    11155111: '0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78'
}
```

Anwani ya `FaucetToken`.

```js
const Address = ({ address }) => {
   if (!address) return null
   return (
      <a href={`https://eth-sepolia.blockscout.com/address/${address}?tab=read_write_contract`} target="_blank">{address}</a>
   )
}
```

Kijenzi hiki kinatoa anwani yenye kiungo cha mkataba kwenye kichunguzi cha bloku.

```js
const Token = () => {
    ...
```

Hiki ndicho kijenzi kikuu kinachofanya kazi kubwa.

```js
  const [ balanceAmount, setBalanceAmount ] = useState("Loading...")
```

Salio la tokeni la anwani ya mtumiaji.

```js
  const [ proxyAddr, setProxyAddr ] = useState(null)
```

Anwani ya proksi inayomilikiwa na mtumiaji.

```js
  const [ proxyBalanceAmount, setProxyBalanceAmount ] = useState("Loading...")
```

Salio la tokeni la proksi.

```js
  const [ newProxyAddr, setNewProxyAddr ] = useState("")
```

Sehemu hii inatumika wakati mtumiaji anaweka anwani ya proksi yeye mwenyewe. Kuwa na uwezo wa kuweka anwani ya proksi wewe mwenyewe kunamruhusu mtumiaji kutumia proksi iliyopo badala ya kusambaza mpya kila wakati (na kupoteza tokeni zote zinazomilikiwa na proksi ya zamani).

```js
  const [ txHash, setTxHash ] = useState(null)
```

Heshi ya muamala wa mwisho, inayotumika kuonyesha kiungo cha kichunguzi ili mtumiaji aweze kukagua muamala huo.

```js
  const [ transferToken, setTransferToken ] = useState("")
  const [ transferAmount, setTransferAmount ] = useState("")
  const [ transferTo, setTransferTo ] = useState("")
```

Sehemu hizi zote zinatumika kutuma amri za hamisho la tokeni kwenye mkataba wa ERC-20. Hii inaweza kuwa `FaucetToken`, lakini si lazima iwe hivyo. Kipengele cha [`transfer`](/developers/tutorials/erc20-annotated-code/#transfer-tokens) ni sehemu ya kiwango cha ERC-20.

```js
  const balance = useReadContract({
    ...
  })


  const proxyBalance = useReadContract({
    ...
  })
```

Soma masalio mawili ya tokeni tunayovutiwa nayo, kiasi ambacho mtumiaji anamiliki, na kiasi ambacho proksi inamiliki.

```js
  const nonce = useReadContract({
      address: proxyAddr,
      abi: UserProxy.abi,
      functionName: 'nonce',
      args: [],
  })
```

Ili kuzuia mashambulizi ya kurudia (kwa mfano, muuzaji kurudia muamala unaompa pesa), tunatumia [nonsi](https://en.wikipedia.org/wiki/Cryptographic_nonce). Tunahitaji kujua thamani ya sasa ili kuiongeza kwenye data tunayosaini.

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

Tumia [`useEffect`](https://react.dev/reference/react/useEffect) kusasisha salio linaloonyeshwa kwa mtumiaji wakati taarifa iliyosomwa kutoka kwenye mnyororo wa vitalu inapobadilika.

```js
  useEffect(() => {
    setTransferToken(faucetAddr)
  }, [faucetAddr])

  useEffect(() => {
    setTransferTo(account.address)
  }, [account.address])
```

Chaguo-msingi ni kuhamisha tokeni za `FaucetToken` kwenye akaunti ya mtumiaji mwenyewe. Hapa tunaweka thamani hizi tunapozipokea kutoka kwa Viem.

```js
  const proxyAddressChange = (evt) => setNewProxyAddr(evt.target.value)
  const transferTokenChange = (evt) => setTransferToken(evt.target.value)
  const transferToChange = (evt) => setTransferTo(evt.target.value)
  const transferAmountChange = (evt) => setTransferAmount(evt.target.value)
```

Vishughulikiaji vya matukio kwa wakati sehemu za maandishi zinapobadilika.

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

Omba seva isambaze proksi kwa ajili ya mtumiaji huyu.

```js
  const signMessage = async(proxyAddr, target, calldata) => {
```

Saini ujumbe kabla ya kuutuma kwenye seva ili upelekwe kwenye `UserProxy` mnyororoni. Hili limeelezwa [hapa](/developers/tutorials/gasless/#ui-changes). Tunahitaji kusaini ujumbe wenye anwani lengwa (anwani ya tokeni tunayoita na) na data za mwito za kutuma.

```js
    const domain = {
      .
      .
      .
    return {v, r, s}
  }

  const messageUserProxy = async (proxy, target, data, v, r, s) => {
```

Tuma ujumbe uliosainiwa kwenye `UserProxy`, ambayo itathibitisha sahihi na kisha kuutuma kwenye `target`.

```js
    try {
      const response = await fetch("/server/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxy, target,  // anwani zote mbili
          data,           // data za mwito za kutuma kwa lengwa
          v, r, s         // sahihi
        })
      })
      const serverResponse = await response.json()
      setTxHash(serverResponse.txHash)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Tuma ombi kwenye seva, na unapopokea jibu, pata heshi ya muamala.

```js
  const faucetSimulation = useSimulateContract({
    address: faucetAddr,
    abi: Erc20.abi,
    functionName: 'faucet',
    account: account.address
  })
```

Iga kuita kipengele cha `faucet`. Tunawezesha kitufe cha bomba tu ikiwa hili litafanikiwa.

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

Ili kuita kipengele kupitia seva na `UserProxy`, tunafuata hatua tatu:

1. Unda data za mwito za kusaini na kutuma kwa kutumia [`encodeFunctionData`](https://viem.sh/docs/contract/encodeFunctionData).

2. Saini ujumbe (anwani lengwa, data za mwito, na nonsi).

3. Tuma ujumbe kwenye seva.

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

Sehemu hii ya kijenzi inakuruhusu kutumia `FaucetToken` moja kwa moja kutoka kwenye kivinjari. Lengo lake kuu ni kuwezesha utatuzi.

```js
         <h4>UserProxy access <Address address={proxyAddr} /></h4>
         <button onClick={deployUserProxy}>
         Deploy UserProxy (slow process)
         </button>
```

Ruhusu mtumiaji kusambaza `UserProxy` mpya.

```js
         <br /><br />
         <input type="text" placeholder="Au weka anwani ya proksi iliyopo" value={newProxyAddr} onChange={proxyAddressChange} />
         <br /><br />
         <button
            onClick={() => setProxyAddr(newProxyAddr)}
            disabled={newProxyAddr.match(/^0x[a-fA-F0-9]{40}$/) === null}
         >
            Set proxy address
         </button>
```

Ruhusu watumiaji kubofya **Set proxy address** tu wanapoingiza anwani halali. Kumbuka kwamba hii haihakikishi kwamba anwani inayohusika ni mkataba wa `UserProxy` kweli. Inawezekana kuongeza ukaguzi kama huo, lakini itakuwa polepole sana (uzoefu mbaya zaidi wa mtumiaji) na haitaboresha usalama (washambuliaji wanaweza kutumia msimbo wao wenyewe kwa kiolesura cha mtumiaji kila wakati).

```js
         <br /><br />
         { proxyAddr && (
```

Onyesha yaliyosalia _tu_ ikiwa kuna anwani halali ya proksi.

```js
            <>
               Proxy balance: {proxyBalanceAmount}
               <br />
               Proxy nonce: {nonce?.data?.toString() ?? "Loading..."}
```

Mtumiaji hahitaji kujua nonsi; hii ni kwa madhumuni ya utatuzi tu.

```js
               <br />
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyFaucet}
               >
                  Request more tokens for proxy
               </button>
```

Hatuwezi kuiga mwito kwenye `faucet()` kupitia proksi. Hata hivyo, tunaweza angalau kuhakikisha kwamba tuna proksi na kwamba proksi ilituripoti nonsi.

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

Ruhusu mtumiaji kutoa miamala ya hamisho la ERC-20.

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

Ikiwa kuna heshi ya muamala wa mwisho, onyesha kiungo ili mtumiaji aweze kuitazama kwenye kichunguzi cha bloku.

```js
      </div>
    </>
  )
}

export {Token}
```

Hii ni msimbo wa msingi tu wa React.

## Udhaifu {#vulnerabilities}

Seva yetu iko hatarini kwa mashambulizi ya kunyimwa huduma. Shambulio hili limeelezwa [katika makala iliyopita ya mfululizo huu](/developers/tutorials/gasless/#dos-on-server).

Zaidi ya hayo, tunahimiza tabia mbaya ya mtumiaji. Hiki ndicho tunachomwomba mtumiaji asaini:

![Screen capture with opaque calldata](./fig-1-opaque-calldata.png)

_Sisi_ tunajua hili ni hamisho halali la ERC-20 kwa ajili ya tokeni, kiasi, na anwani lengwa ambayo mtumiaji anataka kuhamisha. Lakini watumiaji wengi hawajui jinsi ya kufasiri data za mwito, na hawana wazo wanasaini nini. Huo ni muundo mbaya, kwa sababu mbili:

- Baadhi ya watumiaji hawatatutumia kwa sababu hawaamini data tunayowaambia wasaini.
- Watumiaji wengine _watatuamini_ na kujifunza kwamba wanapaswa tu kusaini data za mwito bila kuelewa ni nini. Hii inamaanisha kwamba ikiwa Adam Mshambuliaji atafanikiwa kuwaelekeza kwenye tovuti yake, anaweza kuwafanya wasaini muamala unaompa USDC zote (au DAI, au ERC-20 nyingine yoyote) anazomiliki mtumiaji.

Suluhisho ni kuwa na vipengele tofauti katika `UserProxy` kwa ajili ya vipengele vinavyotumika sana, kama vile hamisho. Kisha watumiaji wanaweza kusaini kitu wanachokielewa.

![Screen capture with transfer details](./fig-2-transparent-signature.png)

**Kumbuka:** Ingawa watumiaji wanaweza kutumia mkoba wowote wanaotaka, inapendekezwa sana kwamba programu zinazotumia EIP-712 ziwahimize kutumia mkoba ambao [unaonyesha data yote ya sahihi](https://rabby.io/). Baadhi ya mikoba hukata anwani, jambo ambalo si salama. Mshambuliaji anaweza kuunda anwani yenye herufi zinazofanana mwanzoni na mwishoni, lakini inatofautiana katikati.

![Screen capture with truncated addresses](./fig-3-truncated-addresses.png)

## Hitimisho {#conclusion}

Mbali na udhaifu ulio hapo juu, suluhisho katika mafunzo haya lina mapungufu kadhaa ambayo Ethereum inaweza kutusaidia kuyashughulikia.

- _Ukinzani wa udhibiti_. Kwa sasa, watumiaji wanaweza kutumia seva yako, seva shindani iliyowekwa na mtu mwingine, au kuunganisha kwenye Ethereum moja kwa moja, jambo ambalo linagharimu gesi. Kutumia [ERC-4337](https://docs.erc4337.io/#what-is-erc-4337) kunaruhusu watumiaji kutoa muamala wao kwenye kundi kubwa la seva, na kupunguza uwezekano wa miamala yao kudhibitiwa.
- _Rasilimali zinazomilikiwa na EOA_. Kama ilivyoelezwa hapo juu, [EIP-7702](https://eip7702.io/) inaweza kutumika kudhibiti rasilimali ambazo tayari zinamilikiwa na anwani ya EOA. Hili lina ugumu wake, lakini wakati mwingine ni muhimu.

Natumai kuchapisha mafunzo kuhusu kuongeza vipengele hivi katika siku za usoni.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).