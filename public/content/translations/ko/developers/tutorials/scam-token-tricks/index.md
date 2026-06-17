---
title: "스캠 토큰이 사용하는 몇 가지 속임수와 이를 탐지하는 방법"
description: 이 튜토리얼에서는 스캠 토큰을 해부하여 스캐머들이 사용하는 속임수와 그 구현 방식, 그리고 이를 탐지하는 방법을 알아봅니다.
author: 오리 포메란츠
tags:
  - 스캠
  - solidity
  - erc-20
  - javascript
  - typescript
skill: intermediate
breadcrumb: 스캠 토큰 속임수
published: 2023-09-15
lang: ko
---

이 튜토리얼에서는 [스캠 토큰](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code)을 해부하여 스캐머들이 사용하는 속임수와 그 구현 방식을 알아봅니다. 튜토리얼을 마치면 ERC-20 토큰 컨트랙트와 그 기능, 그리고 왜 의심하는 태도가 필요한지에 대해 더 포괄적으로 이해하게 될 것입니다. 그런 다음 해당 스캠 토큰이 발생시키는 이벤트를 살펴보고, 이것이 합법적이지 않다는 것을 자동으로 식별하는 방법을 알아봅니다.

## 스캠 토큰 - 무엇이며, 왜 만들고, 어떻게 피할 수 있을까 {#scam-tokens}

이더리움의 가장 일반적인 용도 중 하나는 특정 그룹이 거래 가능한 토큰, 즉 일종의 자체 통화를 만드는 것입니다. 하지만 가치를 창출하는 합법적인 사용 사례가 있는 곳에는 항상 그 가치를 가로채려는 범죄자들도 존재합니다.

사용자 관점에서 이 주제에 대한 자세한 내용은 [ethereum.org의 다른 문서](/guides/how-to-id-scam-tokens/)에서 읽어볼 수 있습니다. 이 튜토리얼은 스캠 토큰을 해부하여 어떻게 만들어지고 어떻게 탐지할 수 있는지에 초점을 맞춥니다.

### wARB가 스캠인지 어떻게 알 수 있나요? {#warb-scam}

우리가 해부할 토큰은 합법적인 [ARB 토큰](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1)과 동일한 것처럼 위장한 [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code)입니다.

어느 것이 합법적인 토큰인지 아는 가장 쉬운 방법은 발행 기관인 [아비트럼](https://arbitrum.foundation/)을 확인하는 것입니다. 합법적인 주소는 [공식 문서](https://docs.arbitrum.foundation/deployment-addresses#token)에 명시되어 있습니다.

### 왜 소스 코드가 공개되어 있나요? {#why-source}

보통 다른 사람을 속이려는 사람들은 비밀스럽게 행동할 것이라 예상하며, 실제로 많은 스캠 토큰은 코드를 공개하지 않습니다(예: [이 토큰](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) 및 [이 토큰](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

하지만 합법적인 토큰은 대개 소스 코드를 공개하기 때문에, 스캠 토큰 제작자들도 합법적으로 보이기 위해 코드를 공개하기도 합니다. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code)는 소스 코드가 공개된 토큰 중 하나이며, 덕분에 이를 이해하기가 더 쉽습니다.

컨트랙트 배포자는 소스 코드 공개 여부를 선택할 수 있지만, 잘못된 소스 코드를 공개할 수는 _없습니다_. 블록 탐색기는 제공된 소스 코드를 독립적으로 컴파일하며, 정확히 동일한 바이트코드를 얻지 못하면 해당 소스 코드를 거부합니다. [이에 대한 자세한 내용은 Etherscan 사이트에서 읽어볼 수 있습니다](https://etherscan.io/verifyContract).

## 합법적인 ERC-20 토큰과의 비교 {#compare-legit-erc20}

이 토큰을 합법적인 ERC-20 토큰과 비교해 보겠습니다. 합법적인 ERC-20 토큰이 일반적으로 어떻게 작성되는지 잘 모른다면 [이 튜토리얼을 참조하세요](/developers/tutorials/erc20-annotated-code/).

### 권한이 있는 주소를 위한 상수 {#constants-for-privileged-addresses}

컨트랙트에는 때때로 권한이 있는 주소가 필요합니다. 장기적인 사용을 위해 설계된 컨트랙트는 새로운 다중서명 컨트랙트 사용을 활성화하는 등, 특정 권한이 있는 주소가 이러한 주소들을 변경할 수 있도록 허용합니다. 이를 수행하는 방법에는 여러 가지가 있습니다.

[`HOP` 토큰 컨트랙트](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code)는 [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable) 패턴을 사용합니다. 권한이 있는 주소는 스토리지의 `_owner`라는 필드에 보관됩니다(세 번째 파일인 `Ownable.sol` 참조).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

[`ARB` 토큰 컨트랙트](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code)에는 직접적으로 권한이 있는 주소가 없습니다. 하지만 그럴 필요가 없습니다. 이 컨트랙트는 [주소 `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code)에 있는 [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) 뒤에 위치합니다. 해당 컨트랙트에는 업그레이드에 사용할 수 있는 권한이 있는 주소가 있습니다(네 번째 파일인 `ERC1967Upgrade.sol` 참조).

```solidity
    /**
     * @dev EIP1967 관리자 슬롯에 새 주소를 저장합니다.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

이와 대조적으로 `wARB` 컨트랙트에는 하드코딩된 `contract_owner`가 있습니다.

```solidity
contract WrappedArbitrum is Context, IERC20 {
    .
    .
    .
    address deployer = 0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1;
    address public contract_owner = 0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33;
    .
    .
    .
}
```

[이 컨트랙트 소유자](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33)는 시기에 따라 다른 계정이 제어할 수 있는 컨트랙트가 아니라 [외부 소유 계정](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)입니다. 이는 가치를 유지할 ERC-20을 제어하기 위한 장기적인 솔루션이라기보다는 개인이 단기적으로 사용하도록 설계되었을 가능성이 높음을 의미합니다.

실제로 Etherscan에서 확인해 보면, 스캐머가 2023년 5월 19일에 단 12시간 동안만 이 컨트랙트를 사용했음을 알 수 있습니다([첫 번째 트랜잭션](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2)부터 [마지막 트랜잭션](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)까지).

### 가짜 `_transfer` 함수 {#the-fake-transfer-function}

실제 전송은 [내부 `_transfer` 함수](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer)를 사용하여 발생하는 것이 표준입니다.

`wARB`에서 이 함수는 거의 합법적인 것처럼 보입니다.

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

의심스러운 부분은 다음과 같습니다.

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

컨트랙트 소유자가 토큰을 전송하는데, 왜 `Transfer` 이벤트는 토큰이 `deployer`에서 온 것으로 표시할까요?

하지만 더 중요한 문제가 있습니다. 누가 이 `_transfer` 함수를 호출할까요? 이 함수는 `internal`로 표시되어 있어 외부에서 호출할 수 없습니다. 그리고 우리가 가진 코드에는 `_transfer`에 대한 호출이 전혀 포함되어 있지 않습니다. 분명히 이것은 미끼로 여기에 있는 것입니다.

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

토큰을 전송하기 위해 호출되는 함수인 `transfer`와 `transferFrom`를 살펴보면, 완전히 다른 함수인 `_f_`를 호출하는 것을 볼 수 있습니다.

### 진짜 `_f_` 함수 {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

이 함수에는 두 가지 잠재적인 위험 신호가 있습니다.

- [함수 제어자(modifier)](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`의 사용입니다. 하지만 소스 코드를 살펴보면 `_mod_`는 실제로는 무해하다는 것을 알 수 있습니다.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- `_transfer`에서 본 것과 동일한 문제로, `contract_owner`가 토큰을 전송할 때 `deployer`에서 온 것처럼 보인다는 점입니다.

### 가짜 이벤트 함수 `dropNewTokens` {#the-fake-events-function-dropnewtokens}

이제 실제 스캠처럼 보이는 부분을 살펴보겠습니다. 가독성을 위해 함수를 약간 수정했지만 기능적으로는 동일합니다.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

이 함수에는 `auth()` 제어자가 있으며, 이는 컨트랙트 소유자만 호출할 수 있음을 의미합니다.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

임의의 계정이 토큰을 분배하는 것을 원치 않으므로 이러한 제한은 매우 타당합니다. 하지만 함수의 나머지 부분은 의심스럽습니다.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

풀 계정에서 수신자 배열로 금액 배열을 전송하는 함수는 매우 타당합니다. 급여 지급, 에어드롭 등 단일 출처에서 여러 목적지로 토큰을 분배해야 하는 사용 사례는 많습니다. 여러 트랜잭션을 발행하거나 동일한 트랜잭션의 일부로 다른 컨트랙트에서 ERC-20을 여러 번 호출하는 것보다 단일 트랜잭션으로 처리하는 것이 (가스 측면에서) 더 저렴합니다.

하지만 `dropNewTokens`는 그렇게 하지 않습니다. 이 함수는 [`Transfer` 이벤트](https://eips.ethereum.org/EIPS/eip-20#transfer-1)를 발생시키지만, 실제로는 어떤 토큰도 전송하지 않습니다. 실제로 일어나지 않은 전송을 알려 오프체인 애플리케이션을 혼란스럽게 할 합당한 이유는 없습니다.

### 소각하는 `Approve` 함수 {#the-burning-approve-function}

ERC-20 컨트랙트에는 허용량을 위한 [`approve` 함수](/developers/tutorials/erc20-annotated-code/#approve)가 있어야 하며, 실제로 이 스캠 토큰에도 해당 함수가 있고 심지어 올바르게 작성되어 있습니다. 하지만 Solidity는 C 언어에서 파생되었기 때문에 대소문자를 구분합니다. "Approve"와 "approve"는 다른 문자열입니다.

또한, 그 기능은 `approve`와 관련이 없습니다.

```solidity
    function Approve(
        address[] memory holders)
```

이 함수는 토큰 보유자의 주소 배열과 함께 호출됩니다.

```solidity
    public approver() {
```

`approver()` 제어자는 `contract_owner`만 이 함수를 호출할 수 있도록 보장합니다(아래 참조).

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: burn amount exceeds balance");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

이 함수는 모든 보유자 주소에 대해 보유자의 전체 잔액을 `0x00...01` 주소로 이동시켜 사실상 소각합니다(표준의 실제 `burn`는 총 공급량도 변경하고 토큰을 `0x00...00`로 전송합니다). 이는 `contract_owner`가 모든 사용자의 자산을 제거할 수 있음을 의미합니다. 거버넌스 토큰에서 원할 만한 기능은 아닌 것 같습니다.

### 코드 품질 문제 {#code-quality-issues}

이러한 코드 품질 문제가 이 코드가 스캠이라는 것을 _증명_하는 것은 아니지만, 의심스럽게 만듭니다. 아비트럼과 같이 체계적인 회사는 보통 이렇게 형편없는 코드를 배포하지 않습니다.

#### `mount` 함수 {#the-mount-function}

[표준](https://eips.ethereum.org/EIPS/eip-20)에 명시되어 있지는 않지만, 일반적으로 새로운 토큰을 생성하는 함수는 [`mint`](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn)라고 부릅니다.

`wARB` 생성자를 살펴보면, 어떤 이유에서인지 발행 함수가 `mount`로 이름이 변경되었으며, 효율성을 위해 전체 금액에 대해 한 번 호출하는 대신 초기 공급량의 5분의 1씩 다섯 번 호출되는 것을 볼 수 있습니다.

```solidity
    constructor () public {

        _name = "Wrapped Arbitrum";
        _symbol = "wARB";
        _decimals = 18;
        uint256 initialSupply = 1000000000000;

        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
    }
```

`mount` 함수 자체도 의심스럽습니다.

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

`require`를 보면 컨트랙트 소유자만 발행할 수 있음을 알 수 있습니다. 이는 합법적입니다. 하지만 오류 메시지는 _소유자만 발행할 수 있습니다(only owner is allowed to mint)_ 등과 같아야 합니다. 대신, 무관한 _ERC20: 제로 주소로 발행(ERC20: mint to the zero address)_이라는 메시지가 표시됩니다. 제로 주소로의 발행에 대한 올바른 테스트는 `require(account != address(0), "<error message>")`인데, 이 컨트랙트는 이를 전혀 확인하지 않습니다.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

발행과 직접적으로 관련된 두 가지 의심스러운 사실이 더 있습니다.

- `account` 매개변수가 있는데, 이는 아마도 발행된 금액을 받아야 할 계정일 것입니다. 하지만 실제로 증가하는 잔액은 `contract_owner`의 잔액입니다.

- 증가한 잔액은 `contract_owner`의 소유이지만, 발생한 이벤트는 `account`로의 전송을 보여줍니다.

### 왜 `auth`와 `approver`가 모두 있을까요? 아무것도 하지 않는 `mod`는 왜 있을까요? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

이 컨트랙트에는 `_mod_`, `auth`, `approver`라는 세 가지 제어자가 포함되어 있습니다.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_`는 세 개의 매개변수를 받지만 아무 작업도 수행하지 않습니다. 왜 이것이 있을까요?

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }
```

`auth`와 `approver`는 컨트랙트가 `contract_owner`에 의해 호출되었는지 확인하므로 더 타당합니다. 발행과 같은 특정 권한이 필요한 작업은 해당 계정으로 제한될 것으로 예상할 수 있습니다. 하지만 _정확히 동일한 작업_을 수행하는 두 개의 별도 함수를 두는 이유는 무엇일까요?

## 무엇을 자동으로 탐지할 수 있을까? {#what-can-we-detect-automatically}

Etherscan을 살펴보면 `wARB`가 스캠 토큰이라는 것을 알 수 있습니다. 하지만 이는 중앙화된 솔루션입니다. 이론적으로 Etherscan은 전복되거나 해킹될 수 있습니다. 토큰이 합법적인지 여부를 독립적으로 파악할 수 있는 것이 더 좋습니다.

ERC-20 토큰이 발생시키는 이벤트를 살펴봄으로써 해당 토큰이 의심스러운지(스캠이거나 매우 잘못 작성되었는지) 식별하는 데 사용할 수 있는 몇 가지 요령이 있습니다.

## 의심스러운 `Approval` 이벤트 {#suspicious-approval-events}

[`Approval` 이벤트](https://eips.ethereum.org/EIPS/eip-20#approval)는 직접적인 요청이 있을 때만 발생해야 합니다(허용량의 결과로 발생할 수 있는 [`Transfer` 이벤트](https://eips.ethereum.org/EIPS/eip-20#transfer-1)와 대조됨). 이 문제에 대한 자세한 설명과 요청이 컨트랙트를 통해 매개되는 것이 아니라 직접적이어야 하는 이유에 대해서는 [Solidity 문서](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin)를 참조하세요.

이는 [외부 소유 계정](/developers/docs/accounts/#types-of-account)의 지출을 승인하는 `Approval` 이벤트가 해당 계정에서 시작되고 목적지가 ERC-20 컨트랙트인 트랜잭션에서 발생해야 함을 의미합니다. 외부 소유 계정에서 발생하는 다른 종류의 승인은 모두 의심스럽습니다.

다음은 타입 안정성을 갖춘 JavaScript 변형인 [TypeScript](https://www.typescriptlang.org/docs/)와 [Viem](https://viem.sh/)을 사용하여 [이러한 종류의 이벤트를 식별하는 프로그램](https://github.com/qbzzt/20230915-scam-token-detection)입니다. 실행 방법은 다음과 같습니다.

1. `.env.example`를 `.env`로 복사합니다.
2. `.env`를 편집하여 이더리움 메인넷 노드의 URL을 제공합니다.
3. `pnpm install`를 실행하여 필요한 패키지를 설치합니다.
4. `pnpm susApproval`를 실행하여 의심스러운 승인을 찾습니다.

다음은 한 줄씩 설명한 내용입니다.

```typescript
import {
  Address,
  TransactionReceipt,
  createPublicClient,
  http,
  parseAbiItem,
} from "viem"
import { mainnet } from "viem/chains"
```

`viem`에서 타입 정의, 함수 및 체인 정의를 가져옵니다.

```typescript
import { config } from "dotenv"
config()
```

`.env`를 읽어 URL을 가져옵니다.

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

Viem 클라이언트를 생성합니다. 블록체인에서 읽기만 하면 되므로 이 클라이언트에는 개인 키가 필요하지 않습니다.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

의심스러운 ERC-20 컨트랙트의 주소와 이벤트를 찾을 블록 범위입니다. 노드 제공자는 대역폭 비용이 비싸질 수 있기 때문에 일반적으로 이벤트를 읽는 기능을 제한합니다. 다행히 `wARB`는 18시간 동안 사용되지 않았으므로 모든 이벤트를 찾을 수 있습니다(총 13개뿐이었습니다).

```typescript
const approvalEvents = await client.getLogs({
  address: testedAddress,
  fromBlock,
  toBlock,
  event: parseAbiItem(
    "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
  ),
})
```

이것은 Viem에 이벤트 정보를 요청하는 방법입니다. 필드 이름을 포함하여 정확한 이벤트 서명을 제공하면 Viem이 이벤트를 파싱해 줍니다.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

우리의 알고리즘은 외부 소유 계정에만 적용할 수 있습니다. `client.getBytecode`가 반환하는 바이트코드가 있다면 이는 컨트랙트라는 의미이므로 그냥 건너뛰어야 합니다.

TypeScript를 사용해 본 적이 없다면 함수 정의가 약간 이상해 보일 수 있습니다. 첫 번째(이자 유일한) 매개변수의 이름이 `addr`라는 것뿐만 아니라, 그 타입이 `Address`라는 것도 알려줍니다. 마찬가지로 `: boolean` 부분은 함수의 반환 값이 불리언(boolean)임을 TypeScript에 알려줍니다.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

이 함수는 이벤트에서 트랜잭션 영수증을 가져옵니다. 트랜잭션 목적지가 무엇인지 확실히 알기 위해 영수증이 필요합니다.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

이것은 이벤트가 의심스러운지 여부를 실제로 결정하는 가장 중요한 함수입니다. 반환 타입인 `(Event | null)`는 이 함수가 `Event` 또는 `null`를 반환할 수 있음을 TypeScript에 알려줍니다. 이벤트가 의심스럽지 않으면 `null`를 반환합니다.

```typescript
const owner = ev.args._owner
```

Viem은 필드 이름을 가지고 있으므로 이벤트를 파싱해 주었습니다. `_owner`는 지출할 토큰의 소유자입니다.

```typescript
// 컨트랙트에 의한 승인은 의심스럽지 않습니다
if (await isContract(owner)) return null
```

소유자가 컨트랙트인 경우 이 승인은 의심스럽지 않다고 가정합니다. 컨트랙트의 승인이 의심스러운지 여부를 확인하려면 트랜잭션의 전체 실행을 추적하여 소유자 컨트랙트에 도달했는지, 그리고 해당 컨트랙트가 ERC-20 컨트랙트를 직접 호출했는지 확인해야 합니다. 이는 우리가 원하는 것보다 훨씬 더 많은 리소스를 소모합니다.

```typescript
const txn = await getEventTxn(ev)
```

승인이 외부 소유 계정에서 온 경우, 이를 발생시킨 트랜잭션을 가져옵니다.

```typescript
// 트랜잭션의 `from`이 아닌 EOA 소유자로부터 승인이 발생한 경우 의심스럽습니다
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

주소는 16진수이므로 문자를 포함하고 있어 단순히 문자열이 같은지만 확인할 수는 없습니다. 예를 들어 `txn.from`와 같이 문자가 모두 소문자인 경우도 있습니다. `ev.args._owner`와 같은 다른 경우에는 주소가 [오류 식별을 위해 대소문자가 혼합](https://eips.ethereum.org/EIPS/eip-55)되어 있습니다.

하지만 트랜잭션이 소유자로부터 온 것이 아니고 해당 소유자가 외부 소유 계정이라면, 이는 의심스러운 트랜잭션입니다.

```typescript
// 또한 트랜잭션 목적지가 우리가 조사 중인 ERC-20 컨트랙트가
// 아닌 경우에도 의심스럽습니다
if (txn.to.toLowerCase() != testedAddress) return ev
```

마찬가지로 트랜잭션의 `to` 주소, 즉 처음 호출된 컨트랙트가 조사 중인 ERC-20 컨트랙트가 아니라면 의심스럽습니다.

```typescript
    // 의심할 만한 이유가 없다면 null을 반환합니다.
    return null
}
```

두 조건 모두 참이 아니면 `Approval` 이벤트는 의심스럽지 않습니다.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[`async` 함수](https://www.w3schools.com/js/js_async.asp)는 `Promise` 객체를 반환합니다. 일반적인 구문인 `await x()`를 사용하면 해당 `Promise`가 이행될 때까지 기다린 후 처리를 계속합니다. 이는 프로그래밍하고 따라가기 쉽지만 비효율적이기도 합니다. 특정 이벤트에 대한 `Promise`가 이행되기를 기다리는 동안 이미 다음 이벤트에 대한 작업을 시작할 수 있기 때문입니다.

여기서는 [`map`](https://www.w3schools.com/jsref/jsref_map.asp)를 사용하여 `Promise` 객체의 배열을 만듭니다. 그런 다음 [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/)를 사용하여 모든 프로미스가 해결될 때까지 기다립니다. 그런 다음 해당 결과를 [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp)하여 의심스럽지 않은 이벤트를 제거합니다.

### 의심스러운 `Transfer` 이벤트 {#suspicious-transfer-events}

스캠 토큰을 식별하는 또 다른 가능한 방법은 의심스러운 전송이 있는지 확인하는 것입니다. 예를 들어, 토큰을 많이 가지고 있지 않은 계정에서의 전송이 있습니다. [이 테스트를 구현하는 방법](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts)을 확인할 수 있지만, `wARB`에는 이 문제가 없습니다.

## 결론 {#conclusion}

ERC-20 스캠의 자동 탐지는 [거짓 음성(false negatives)](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error)의 문제를 겪습니다. 스캠이 실제로는 아무것도 나타내지 않는 지극히 정상적인 ERC-20 토큰 컨트랙트를 사용할 수 있기 때문입니다. 따라서 항상 _신뢰할 수 있는 출처에서 토큰 주소를 얻으려고_ 노력해야 합니다.

자동 탐지는 토큰이 많고 자동으로 처리해야 하는 탈중앙화 금융(DeFi) 요소와 같은 특정 경우에 도움이 될 수 있습니다. 하지만 항상 그렇듯 [매수자 위험 부담 원칙(caveat emptor)](https://www.investopedia.com/terms/c/caveatemptor.asp)에 따라 스스로 조사(DYOR)하고, 사용자들도 그렇게 하도록 권장하세요.

[제 작업물은 여기에서 더 볼 수 있습니다](https://cryptodocguy.pro/).