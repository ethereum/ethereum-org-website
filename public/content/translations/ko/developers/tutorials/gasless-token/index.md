---
title: "가스 없는 사용자가 토큰을 보유하고 컨트랙트를 호출할 수 있도록 하기"
description: 계정 추상화를 사용하면 특정 EOA가 전송하거나 해당 EOA가 서명한 트랜잭션을 수락하는 스마트 컨트랙트 지갑을 만들 수 있습니다. 그런 다음 이 스마트 컨트랙트는 EOA의 통제하에 있는 토큰을 소유할 수 있습니다.
author: 오리 포메란츠
tags: ["가스리스", "erc-20", "계정 추상화"]
skill: intermediate
breadcrumb: 가스리스 토큰
lang: ko
published: 2026-04-01
---

## 소개 {#introduction}

[이전 글](/developers/tutorials/gasless/)에서는 EIP-712 서명을 사용하여 자체 애플리케이션에 가스 없이 접근하는 방법을 논의했지만, 이는 자체 스마트 컨트랙트에만 국한됩니다. [계정 추상화](/roadmap/account-abstraction/)를 사용하면 두 가지 유형의 트랜잭션을 수락하고 요청된 목적지로 중계하는 스마트 컨트랙트 지갑을 만들 수 있습니다.

- 특정 EOA가 전송한 트랜잭션(해당 EOA에 ETH가 있어야 함)
- 어디서든 전송되지만 동일한 EOA가 서명한 트랜잭션

이러한 방식으로 계정이 자산(토큰 등)을 보유하고 가스가 있는 EOA가 할 수 있는 모든 기능을 수행할 수 있는 가스 없는 방법을 제공할 수 있습니다.

### 왜 요청을 그냥 중계할 수 없을까요? {#why-no-tx-origin}

ERC-20 및 관련 표준에서 계정 소유자는 토큰 컨트랙트를 호출한 주소인 [`msg.sender`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties)이며, 이는 반드시 트랜잭션의 발신자인 [`tx.origin`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties)와 일치하지는 않습니다. 이는 [보안상의 이유](https://docs.soliditylang.org/en/v0.8.35-pre.1/security-considerations.html#tx-origin)로 필요합니다. 즉, 토큰 전송 요청을 중계하면 사용자가 제어하는 주소가 아닌 중계자의 주소에서 토큰을 전송하려고 시도하게 됩니다.

[EIP-7702](https://eip7702.io/)를 통해 EOA 주소를 사용할 수 있는 해결책이 있지만, 잠재적으로 위험한 위임에 서명해야 하므로 지갑 제공자가 승인하는 스마트 컨트랙트에 위임할 때만 사용할 수 있습니다. 이 튜토리얼에서는 사용자의 프록시 역할을 하는 스마트 컨트랙트를 생성하는 훨씬 간단한 방법을 선호합니다.

## 실제 작동 확인하기 {#in-action}

1. [Node](https://nodejs.org/en/download)와 [Foundry](https://www.getfoundry.sh/introduction/installation)가 모두 설치되어 있는지 확인합니다.

2. 애플리케이션을 클론하고 필요한 소프트웨어를 설치합니다.

   ```sh
   git clone https://github.com/qbzzt/260315-gasless-tokens.git
   cd 260315-gasless-tokens
   forge build
   cd server
   npm install
   ```

3. `.env` 파일을 편집하여 `SEPOLIA_PRIVATE_KEY`를 Sepolia에 ETH가 있는 지갑으로 설정합니다. Sepolia ETH가 필요하다면 [퍼싯을 사용](/developers/docs/networks/#sepolia)하여 얻으세요. 이상적으로 이 개인 키는 브라우저 지갑에 있는 것과 달라야 합니다.

4. 서버를 시작합니다.

   ```sh
   npm run dev
   ```

5. URL [`http://localhost:5173`](http://localhost:5173)에서 애플리케이션에 접속합니다.

6. **Connect with Injected**를 클릭하여 지갑에 연결합니다. 지갑에서 승인하고, 필요한 경우 Sepolia로의 변경을 승인합니다.

7. 아래로 스크롤하여 **Deploy UserProxy (slow process)**를 클릭합니다.

8. **UserProxy access** 옆에 주소가 표시되므로 사용자 프록시가 언제 배포되었는지 확인할 수 있습니다. 24초(2 블록)를 기다렸는데도 여전히 표시되지 않는다면 변경 사항 감지에 문제가 있을 수 있습니다.

   이 경우 [Sepolia 블록 탐색기](https://eth-sepolia.blockscout.com/)로 이동하여 `npm run dev`의 서버 출력에 표시된 배포 트랜잭션 해시를 입력합니다. 생성된 컨트랙트를 클릭하여 주소를 확인한 다음 복사합니다. _Or enter existing proxy address_ 필드에 주소를 붙여넣고 **Set proxy address**를 클릭합니다.

9. **Request more tokens for proxy**를 클릭하여 ERC-20 컨트랙트의 [`faucet`](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=read_write_contract#0xde5f72fd) 함수에 대한 호출을 제출하여 토큰을 받습니다. 지갑에서 서명을 **Confirm(확인)**합니다. 물론 토큰은 사용자의 주소가 아닌 프록시의 주소로 도착합니다.

10. 아래로 스크롤하여 _Last transaction:_ 아래의 링크를 클릭합니다. 그러면 브라우저가 열리고 `faucet` 트랜잭션이 표시됩니다.

11. _amount to transfer_에 1에서 1,000 사이의 숫자를 입력합니다. **Transfer**를 클릭하여 토큰을 자신의 주소로 전송합니다. 요청에 대해 **Confirm(확인)**을 클릭하기 전에 서명되는 데이터가 불투명한지 확인하세요. 사용자는 자신이 무엇에 서명하고 있는지 이해하기 어려울 것입니다. 이에 대해서는 [아래](#vulnerabilities)에서 논의할 것임을 기억하세요.

12. 트랜잭션이 확인된 후 _your balance_와 _proxy balance_ 모두에서 변경 사항이 나타날 때까지 기다립니다. Sepolia의 블록 타임은 12초이므로 이 작업에도 약간의 시간이 걸립니다.

## 작동 방식 {#how-work}

가스 없는 경험을 위해서는 사용자를 위한 사용자 인터페이스, 사용자 인터페이스에서 체인으로 메시지를 라우팅하는 서버, 그리고 이를 수신하고 검증하는 스마트 컨트랙트가 필요합니다.

### 지갑 스마트 컨트랙트 {#wallet-smart-contract}

이것이 [스마트 컨트랙트](https://github.com/qbzzt/260315-gasless-tokens/blob/main/contracts/src/UserProxy.sol)입니다. 이 컨트랙트의 목적은 요청에 사용된 채널과 관계없이 실제 소유자가 요청하는 모든 작업을 수행하고 다른 모든 것은 무시하는 것입니다. 이를 위해 해당 함수는 호출할 대상 주소와 호출에 사용할 데이터를 수신합니다.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract UserProxy {
    address immutable OWNER;
    uint public nonce = 0;
```

소유자의 신원과 메시지가 반복되는 것을 방지하기 위한 [논스](https://en.wikipedia.org/wiki/Cryptographic_nonce)입니다. 논스는 `public` 변수이므로 Solidity 컴파일러는 오프체인 코드가 그 값을 읽을 수 있도록 하는 뷰(view) 함수인 [`nonce()`](https://eth-sepolia.blockscout.com/address/0x9Ba259C15B46ee4b72dEf7b93D85Ec18f5f6e50E?tab=read_write_contract#0xaffed0e0)도 생성합니다.

```solidity
    bytes32 private constant SIGNED_ACCESS_TYPEHASH =
        keccak256("SignedAccess(address target,bytes data,uint256 nonce)");

    bytes32 private constant SIGNED_ACCESS_PAYABLE_TYPEHASH =
        keccak256("SignedAccessPayable(address target,bytes data,uint256 nonce,uint256 value)");

    bytes32 immutable DOMAIN_SEPARATOR;
```

[EIP-712 서명](https://eips.ethereum.org/EIPS/eip-712)을 검증하는 데 필요한 정보입니다.

```solidity
    constructor(address owner_) {
        OWNER = owner_;
```

`UserProxy`는 단일 소유자 주소에 연결됩니다. 자산(ERC-20 토큰, NFT 등)을 소유할 수 있기 때문에 이는 필수적입니다. 서로 다른 소유자에게 속한 자산이 섞이는 것을 원하지 않기 때문입니다.

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

[도메인 구분자(domain separator)](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator)입니다. 체인 ID와 컨트랙트 주소에 따라 달라지므로 컴파일 타임에 계산할 수 없습니다. 이로 인해 UserProxy가 다른 프록시를 위해 준비된 메시지에 속는 것을 불가능하게 만듭니다.

```solidity
    event CallResult(address target, bytes returnData);
```

호출 결과를 로그로 남깁니다.

```solidity
    function directAccess(address target, bytes calldata data)
            external returns (bytes memory) {
```

이 함수는 소유자가 직접 호출할 수 있습니다. 사용 가능한 중계자가 없더라도 소유자는 블록체인에서 직접 자산에 접근할 수 있습니다(사용자에게 ETH가 있는 경우).

```solidity
        require(msg.sender == OWNER, "Only owner can call");
        (bool success, bytes memory returnData) = target.call(data);
        require(success, "Call failed");

        emit CallResult(target, returnData);

        return returnData;
    }
```

소유자가 _직접_ 호출한 경우, 제공된 콜 데이터로 대상을 호출합니다.

```solidity
    function signedAccess(
        address target,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s)
```

이것은 `UserProxy`의 주요 함수입니다. `target`와 `data`, 그리고 서명을 받습니다.

```solidity
    external returns (bytes memory) {
        // EIP-712 다이제스트 계산
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

다이제스트(digest)에는 논스도 포함되지만, 트랜잭션에서 이를 받을 필요는 없습니다. 우리는 이미 올바른 값을 알고 있기 때문입니다. 잘못된 논스가 포함된 서명은 거부됩니다.

```solidity

    // 서명자 복구
    address signer = ecrecover(digest, v, r, s);
    require(signer == OWNER, "Signature invalid or not by owner");
```

서명이 유효하지 않으면 `ecrecover`는 일반적으로 다른 주소를 반환하며, 이는 수락되지 않습니다.

```solidity
    (bool success, bytes memory returnData) = target.call(data);
    require(success, "Call failed");
```

사용자가 호출하라고 지시한 컨트랙트를 호출하고, 성공하지 못하면 되돌리기(revert)를 수행합니다.

```solidity
    emit CallResult(target, returnData);

    nonce++; // 재전송 방지를 위해 논스 증가

    return returnData;
}
```

성공하면 로그 이벤트를 발생시키고 논스를 증가시킵니다.

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

이들은 컨트랙트에서 ETH를 전송할 수 있게 해주는 거의 동일한 변형입니다.

### 중계자(Relayer) {#relayer}

중계자는 [서버 컴포넌트](/developers/tutorials/server-components/)입니다. JavaScript로 작성되었으며, 소스 코드는 [여기](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/index.js)에서 확인할 수 있습니다.

```js
import express from "express";
import { createServer as createViteServer } from "vite";
import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import dotenv from 'dotenv'
```

필요한 라이브러리입니다. 이것은 [Express](https://expressjs.com/) 서버이며, [Vite](https://vite.dev/)를 사용하여 사용자 인터페이스 코드를 제공합니다. 블록체인과 통신하기 위해 [Viem](https://viem.sh/)을 사용하고, 트랜잭션을 전송하는 주소의 개인 키를 읽기 위해 [dotenv](https://www.dotenv.org/)를 사용합니다.

```js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const UserProxy = require('../contracts/out/UserProxy.sol/UserProxy.json')
```

이것은 컴파일된 `UserProxy`를 읽는 간단한 방법입니다. `UserProxy`를 호출하려면 ABI가 필요하고, 사용자를 위해 배포하려면 컴파일된 코드가 필요합니다.

```js
dotenv.config()
const sepoliaAccount = privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY)
console.log("Using account:", sepoliaAccount.address)
```

`.env` 파일을 읽고 주소를 추출하여 콘솔에 출력합니다.

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

블록체인과 통신하는 Viem 클라이언트입니다.

```js
const start = async () => {
  const app = express()
```

Express 서버를 실행합니다.

```js
  app.use(express.json())
```

Express에 요청 본문을 읽고, JSON인 경우 파싱하도록 지시합니다.

```js
  app.post("/server/deploy", async (req, res) => {
```

이것은 프록시 배포 요청을 처리하는 코드입니다. 공격자가 우리의 ETH가 고갈될 때까지 프록시 배포 요청을 스팸으로 보낼 수 있기 때문에 여기서 [서비스 거부(denial-of-service)](https://en.wikipedia.org/wiki/Denial-of-service_attack) 공격에 취약하다는 점에 유의하세요. 프로덕션 시스템에서는 프록시 배포 요청에 서명해야 하고 서명자가 기존 고객이어야 한다는 요구 사항을 추가할 것입니다.

```js
    try {
      const ownerAddress = req.body.ownerAddress
```

요청에서 소유자의 주소를 가져옵니다.

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

[컨트랙트를 배포](https://viem.sh/docs/contract/deployContract#deploycontract)하고 [배포될 때까지 기다립니다](https://viem.sh/docs/actions/public/waitForTransactionReceipt).

```js
      res.json({ contractAddress: receipt.contractAddress })
```

모든 것이 정상이면 프록시 주소를 사용자 인터페이스로 반환합니다.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

문제가 있으면 보고합니다.

```js
  app.post("/server/message", async (req, res) => {
```

이것은 `UserProxy` 컨트랙트에 대한 사용자 메시지를 처리하는 코드입니다. 이 역시 서비스 거부 공격에 취약한 또 다른 지점입니다.

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

요청 데이터를 가져와서 프록시에서 `signedAccess`를 호출하는 데 사용합니다.

```js
      console.log("Message transaction hash:", txHash)

      res.json({ txHash })
```

트랜잭션 해시를 다시 보고합니다. 이를 통해 UI는 사용자가 트랜잭션을 확인할 수 있는 URL을 표시할 수 있습니다.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

마찬가지로 문제가 있으면 보고합니다.

```js
  // 나머지는 Vite가 처리하도록 함
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

그 외의 모든 작업에는 사용자 인터페이스 제공을 처리하는 Vite를 사용합니다.

### 사용자 인터페이스 {#user-interface}

[이것은 사용자 인터페이스 코드입니다](https://github.com/qbzzt/260315-gasless-tokens/tree/main/server/src). 대부분의 코드는 [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx)를 제외하고 [이 글](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/#file-walk-through)에 문서화된 내용과 거의 동일합니다.

[`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx)의 일부는 [이 글](/developers/tutorials/gasless/#ui-changes)의 [`Greeter.jsx`](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx)와 유사합니다. 다음은 새로운 부분입니다.

```js
import {
   encodeFunctionData
       } from 'viem'
```

[이 함수](https://viem.sh/docs/contract/encodeFunctionData)는 EVM 함수 호출을 위한 콜 데이터를 생성합니다. 사용자가 콜 데이터에 서명할 수 있도록 하기 위해 필요합니다.

```js
import UserProxy from '../../contracts/out/UserProxy.sol/UserProxy.json'
```

위에서 설명한 `UserProxy`입니다.

```js
import Erc20 from '../../contracts/out/Faucet.sol/FaucetToken.json'
```

[이 컨트랙트](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=contract)는 대부분 일반적인 ERC-20 컨트랙트이며, 중요한 함수인 `faucet()`가 하나 추가되었습니다. 이 함수는 테스트 목적으로 토큰을 요청하는 모든 사람에게 토큰을 부여합니다.

```js
const erc20Addrs = {
  // Sepolia
    11155111: '0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78'
}
```

`FaucetToken`의 주소입니다.

```js
const Address = ({ address }) => {
   if (!address) return null
   return (
      <a href={`https://eth-sepolia.blockscout.com/address/${address}?tab=read_write_contract`} target="_blank">{address}</a>
   )
}
```

이 컴포넌트는 블록 탐색기의 컨트랙트 링크와 함께 주소를 출력합니다.

```js
const Token = () => {
    ...
```

대부분의 작업을 수행하는 메인 컴포넌트입니다.

```js
  const [ balanceAmount, setBalanceAmount ] = useState("Loading...")
```

사용자 주소의 토큰 잔액입니다.

```js
  const [ proxyAddr, setProxyAddr ] = useState(null)
```

사용자가 소유한 프록시의 주소입니다.

```js
  const [ proxyBalanceAmount, setProxyBalanceAmount ] = useState("Loading...")
```

프록시의 토큰 잔액입니다.

```js
  const [ newProxyAddr, setNewProxyAddr ] = useState("")
```

이 필드는 사용자가 프록시 주소를 수동으로 설정할 때 사용됩니다. 프록시 주소를 수동으로 설정하는 기능이 있으면 사용자는 매번 새 프록시를 배포하는(그리고 이전 프록시가 소유한 모든 토큰을 잃는) 대신 기존 프록시를 사용할 수 있습니다.

```js
  const [ txHash, setTxHash ] = useState(null)
```

사용자가 해당 트랜잭션을 확인할 수 있도록 탐색기 링크를 표시하는 데 사용되는 마지막 트랜잭션의 해시입니다.

```js
  const [ transferToken, setTransferToken ] = useState("")
  const [ transferAmount, setTransferAmount ] = useState("")
  const [ transferTo, setTransferTo ] = useState("")
```

이 필드들은 모두 ERC-20 컨트랙트에 토큰 전송 명령을 보내는 데 사용됩니다. 이는 `FaucetToken`일 수 있지만 반드시 그럴 필요는 없습니다. [`transfer`](/developers/tutorials/erc20-annotated-code/#transfer-tokens) 함수는 ERC-20 표준의 일부입니다.

```js
  const balance = useReadContract({
    ...
  })


  const proxyBalance = useReadContract({
    ...
  })
```

우리가 관심 있는 두 가지 토큰 잔액, 즉 사용자가 소유한 양과 프록시가 소유한 양을 읽습니다.

```js
  const nonce = useReadContract({
      address: proxyAddr,
      abi: UserProxy.abi,
      functionName: 'nonce',
      args: [],
  })
```

재전송 공격(예: 판매자가 자신에게 돈을 주는 트랜잭션을 재전송하는 것)을 방지하기 위해 [논스](https://en.wikipedia.org/wiki/Cryptographic_nonce)를 사용합니다. 서명할 데이터에 추가하려면 현재 값을 알아야 합니다.

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

블록체인에서 읽은 정보가 변경될 때 사용자에게 표시되는 잔액을 업데이트하려면 [`useEffect`](https://react.dev/reference/react/useEffect)를 사용합니다.

```js
  useEffect(() => {
    setTransferToken(faucetAddr)
  }, [faucetAddr])

  useEffect(() => {
    setTransferTo(account.address)
  }, [account.address])
```

기본값은 `FaucetToken` 토큰을 사용자의 자체 계정으로 전송하는 것입니다. 여기서는 Viem에서 값을 받을 때 이 값들을 설정합니다.

```js
  const proxyAddressChange = (evt) => setNewProxyAddr(evt.target.value)
  const transferTokenChange = (evt) => setTransferToken(evt.target.value)
  const transferToChange = (evt) => setTransferTo(evt.target.value)
  const transferAmountChange = (evt) => setTransferAmount(evt.target.value)
```

텍스트 필드가 변경될 때의 이벤트 핸들러입니다.

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

서버에 이 사용자를 위한 프록시를 배포하도록 요청합니다.

```js
  const signMessage = async(proxyAddr, target, calldata) => {
```

온체인의 `UserProxy`로 전송하기 위해 서버에 보내기 전에 메시지에 서명합니다. 이에 대해서는 [여기](/developers/tutorials/gasless/#ui-changes)에 설명되어 있습니다. 대상 주소(호출하는 토큰의 주소)와 전송할 콜 데이터가 모두 포함된 메시지에 서명해야 합니다.

```js
    const domain = {
      .
      .
      .
    return {v, r, s}
  }

  const messageUserProxy = async (proxy, target, data, v, r, s) => {
```

서명된 메시지를 `UserProxy`로 전송하면, 서명을 검증한 후 `target`로 전송합니다.

```js
    try {
      const response = await fetch("/server/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxy, target,  // 두 주소 모두
          data,           // 대상에게 보낼 콜 데이터
          v, r, s         // 서명
        })
      })
      const serverResponse = await response.json()
      setTxHash(serverResponse.txHash)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

서버에 요청을 보내고 응답을 받으면 트랜잭션 해시를 가져옵니다.

```js
  const faucetSimulation = useSimulateContract({
    address: faucetAddr,
    abi: Erc20.abi,
    functionName: 'faucet',
    account: account.address
  })
```

`faucet` 함수 호출을 시뮬레이션합니다. 이것이 성공할 경우에만 퍼싯 버튼을 활성화합니다.

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

서버와 `UserProxy`를 통해 함수를 호출하려면 다음 세 단계를 따릅니다.

1. [`encodeFunctionData`](https://viem.sh/docs/contract/encodeFunctionData)를 사용하여 서명하고 전송할 콜 데이터를 생성합니다.

2. 메시지(대상 주소, 콜 데이터, 논스)에 서명합니다.

3. 서버에 메시지를 전송합니다.

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

컴포넌트의 이 부분은 브라우저에서 직접 `FaucetToken`를 사용할 수 있게 해줍니다. 주요 목적은 디버깅을 용이하게 하는 것입니다.

```js
         <h4>UserProxy access <Address address={proxyAddr} /></h4>
         <button onClick={deployUserProxy}>
         Deploy UserProxy (slow process)
         </button>
```

사용자가 새로운 `UserProxy`를 배포할 수 있도록 합니다.

```js
         <br /><br />
         <input type="text" placeholder="또는 기존 프록시 주소를 입력하세요" value={newProxyAddr} onChange={proxyAddressChange} />
         <br /><br />
         <button
            onClick={() => setProxyAddr(newProxyAddr)}
            disabled={newProxyAddr.match(/^0x[a-fA-F0-9]{40}$/) === null}
         >
            Set proxy address
         </button>
```

사용자가 합법적인 주소를 입력할 때만 **Set proxy address**를 클릭할 수 있도록 합니다. 이것이 해당 주소가 실제로 `UserProxy` 컨트랙트임을 보장하지는 않는다는 점에 유의하세요. 이러한 검사를 추가할 수는 있지만, 속도가 훨씬 느려지고(사용자 경험 악화) 보안이 향상되지도 않습니다(공격자는 항상 사용자 인터페이스에 자신의 코드를 사용할 수 있습니다).

```js
         <br /><br />
         { proxyAddr && (
```

합법적인 프록시 주소가 있는 경우에_만_ 나머지를 표시합니다.

```js
            <>
               Proxy balance: {proxyBalanceAmount}
               <br />
               Proxy nonce: {nonce?.data?.toString() ?? "Loading..."}
```

사용자는 논스를 알 필요가 없습니다. 이것은 단지 디버깅 목적입니다.

```js
               <br />
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyFaucet}
               >
                  Request more tokens for proxy
               </button>
```

프록시를 통한 `faucet()` 호출을 시뮬레이션할 수는 없습니다. 하지만 최소한 프록시가 있고 프록시가 우리에게 논스를 보고했는지 확인할 수는 있습니다.

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

사용자가 ERC-20 전송 트랜잭션을 발행할 수 있도록 합니다.

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

마지막 트랜잭션 해시가 있는 경우 사용자가 블록 탐색기에서 볼 수 있도록 링크를 표시합니다.

```js
      </div>
    </>
  )
}

export {Token}
```

이것은 단순한 React 보일러플레이트입니다.

## 취약점 {#vulnerabilities}

우리 서버는 서비스 거부 공격에 취약합니다. 이 공격은 [시리즈의 이전 글](/developers/tutorials/gasless/#dos-on-server)에 설명되어 있습니다.

또한, 우리는 사용자의 잘못된 행동을 조장하고 있습니다. 다음은 우리가 사용자에게 서명하도록 요청하는 내용입니다.

![Screen capture with opaque calldata](./fig-1-opaque-calldata.png)

_우리_는 이것이 사용자가 전송하고자 하는 토큰, 금액, 목적지 주소에 대한 합법적인 ERC-20 전송이라는 것을 알고 있습니다. 하지만 대부분의 사용자는 콜 데이터를 해석하는 방법을 모르며, 자신이 무엇에 서명하고 있는지 전혀 알지 못합니다. 이는 두 가지 이유에서 잘못된 설계입니다.

- 일부 사용자는 우리가 서명하라고 지시하는 데이터를 신뢰하지 않기 때문에 우리 서비스를 사용하지 않을 것입니다.
- 다른 사용자들은 우리를 신뢰_할 것이며_, 콜 데이터가 무엇인지 이해하지 못한 채 그냥 서명해야 한다고 학습하게 될 것입니다. 즉, 공격자 아담(Adam Attacker)이 그들을 자신의 웹사이트로 리디렉션하는 데 성공하면, 사용자가 소유한 모든 USDC(또는 DAI나 기타 ERC-20)를 자신에게 부여하는 트랜잭션에 서명하도록 만들 수 있습니다.

해결책은 전송과 같이 자주 사용되는 함수를 위해 `UserProxy`에 별도의 함수를 두는 것입니다. 그러면 사용자는 자신이 이해하는 내용에 서명할 수 있습니다.

![Screen capture with transfer details](./fig-2-transparent-signature.png)

**참고:** 사용자는 원하는 지갑을 사용할 수 있지만, EIP-712를 사용하는 애플리케이션은 [전체 서명 데이터를 보여주는](https://rabby.io/) 지갑을 사용하도록 권장하는 것이 좋습니다. 일부 지갑은 주소를 잘라서 표시하는데, 이는 안전하지 않습니다. 공격자는 시작과 끝 문자는 같지만 중간이 다른 주소를 생성할 수 있습니다.

![Screen capture with truncated addresses](./fig-3-truncated-addresses.png)

## 결론 {#conclusion}

위의 취약점 외에도 이 튜토리얼의 솔루션에는 이더리움이 해결하는 데 도움을 줄 수 있는 몇 가지 단점이 있습니다.

- _검열 저항성(Censorship resistance)_. 현재 사용자는 여러분의 서버나 다른 사람이 설정한 경쟁 서버를 사용하거나, 가스 비용이 발생하는 이더리움에 직접 연결할 수 있습니다. [ERC-4337](https://docs.erc4337.io/#what-is-erc-4337)을 사용하면 사용자가 대규모 서버 풀에 트랜잭션을 제공할 수 있어 트랜잭션이 검열될 가능성이 줄어듭니다.
- _EOA 소유 자산_. 위에서 언급했듯이 [EIP-7702](https://eip7702.io/)는 EOA 주소가 이미 소유한 자산을 관리하는 데 사용할 수 있습니다. 여기에는 어려움이 따르지만 때로는 필요합니다.

가까운 시일 내에 이러한 기능을 추가하는 방법에 대한 튜토리얼을 게시할 수 있기를 바랍니다.

[제 작업물은 여기에서 더 확인하실 수 있습니다](https://cryptodocguy.pro/).