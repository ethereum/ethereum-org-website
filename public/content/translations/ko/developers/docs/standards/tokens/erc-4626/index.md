---
title: "ERC-4626 토큰화된 볼트 표준"
description: "수익 창출 볼트를 위한 표준입니다."
lang: ko
---

## 소개 {#introduction}

ERC-4626은 수익 창출 볼트(yield-bearing vault)의 기술적 매개변수를 최적화하고 통합하기 위한 표준입니다. 단일 기초 ERC-20 토큰의 지분을 나타내는 토큰화된 수익 창출 볼트를 위한 표준 API를 제공합니다. 또한 ERC-4626은 ERC-20을 활용하는 토큰화된 볼트를 위한 선택적 확장 기능을 간략히 설명하며, 토큰 예치, 인출 및 잔액 조회와 같은 기본 기능을 제공합니다.

**수익 창출 볼트에서 ERC-4626의 역할**

대출 시장, 애그리게이터(aggregator), 그리고 본질적으로 이자를 발생시키는 토큰은 다양한 전략을 실행하여 사용자가 암호화폐 토큰에서 최고의 수익을 찾을 수 있도록 돕습니다. 이러한 전략들은 약간의 변형을 거쳐 실행되는데, 이는 오류가 발생하기 쉽거나 개발 리소스를 낭비할 수 있습니다.

수익 창출 볼트에 ERC-4626을 적용하면 통합에 드는 노력을 줄이고, 보다 일관되고 강력한 구현 패턴을 생성하여 개발자의 특별한 노력 없이도 다양한 애플리케이션에서 수익에 접근할 수 있게 됩니다.

ERC-4626 토큰은 [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626)에 자세히 설명되어 있습니다.

**비동기 볼트 확장 (ERC-7540)**

ERC-4626은 한도 내에서의 원자적(atomic) 예치 및 상환에 최적화되어 있습니다. 한도에 도달하면 새로운 예치나 상환을 제출할 수 없습니다. 이러한 제한은 볼트와 상호 작용하기 위한 전제 조건으로 비동기 작업이나 지연이 있는 스마트 컨트랙트 시스템(예: 실물 자산 프로토콜, 과소담보 대출 프로토콜, 크로스체인 대출 프로토콜, 유동성 스테이킹 토큰 (LST) 또는 보험 안전 모듈)에는 잘 작동하지 않습니다.

ERC-7540은 비동기 사용 사례를 위해 ERC-4626 볼트의 활용도를 확장합니다. 기존 볼트 인터페이스(`deposit`/`withdraw`/`mint`/`redeem`)는 비동기 요청을 청구하는 데 완전히 활용됩니다.

ERC-7540 확장은 [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540)에 자세히 설명되어 있습니다.

**다중 자산 볼트 확장 (ERC-7575)**

ERC-4626에서 지원하지 않는 누락된 사용 사례 중 하나는 유동성 공급자(LP) 토큰과 같이 여러 자산이나 진입점을 가진 볼트입니다. ERC-4626 자체가 ERC-20이어야 한다는 요구 사항 때문에 이러한 볼트는 일반적으로 다루기 어렵거나 규정을 준수하지 않습니다.

ERC-7575는 ERC-4626 구현에서 ERC-20 토큰 구현을 외부화하여 다중 자산을 가진 볼트에 대한 지원을 추가합니다.

ERC-7575 확장은 [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575)에 자세히 설명되어 있습니다.

## 전제 조건 {#prerequisites}

이 페이지를 더 잘 이해하려면 먼저 [토큰 표준](/developers/docs/standards/tokens/)과 [ERC-20](/developers/docs/standards/tokens/erc-20/)에 대해 읽어보는 것을 권장합니다.

## ERC-4626 함수 및 기능: {#body}

### 메서드 {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

이 함수는 회계, 예치, 인출을 위해 볼트에서 사용되는 기초 토큰의 주소를 반환합니다.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

이 함수는 볼트가 보유한 기초 자산의 총량을 반환합니다.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

이 함수는 제공된 `assets`의 양에 대해 볼트가 교환해 줄 `shares`의 양을 반환합니다.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

이 함수는 제공된 `shares`의 양에 대해 볼트가 교환해 줄 `assets`의 양을 반환합니다.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

이 함수는 단일 [`deposit`](#deposit) 호출로 예치할 수 있는 기초 자산의 최대량을 반환하며, 지분은 `receiver`를 위해 발행됩니다.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

이 함수는 사용자가 현재 블록에서 예치의 효과를 시뮬레이션할 수 있게 해줍니다.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

이 함수는 `assets`만큼의 기초 토큰을 볼트에 예치하고 `receiver`에게 `shares`의 소유권을 부여합니다.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

이 함수는 단일 [`mint`](#mint) 호출로 발행할 수 있는 지분의 최대량을 반환하며, 지분은 `receiver`를 위해 발행됩니다.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

이 함수는 사용자가 현재 블록에서 발행의 효과를 시뮬레이션할 수 있게 해줍니다.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

이 함수는 `assets`만큼의 기초 토큰을 예치하여 `receiver`에게 정확히 `shares`만큼의 볼트 지분을 발행합니다.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

이 함수는 단일 [`withdraw`](#withdraw) 호출로 `owner` 잔액에서 인출할 수 있는 기초 자산의 최대량을 반환합니다.

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

이 함수는 사용자가 현재 블록에서 인출의 효과를 시뮬레이션할 수 있게 해줍니다.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

이 함수는 `owner`에서 `shares`를 소각하고 볼트에서 `receiver`에게 정확히 `assets` 토큰을 보냅니다.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

이 함수는 [`redeem`](#redeem) 호출을 통해 `owner` 잔액에서 상환할 수 있는 지분의 최대량을 반환합니다.

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

이 함수는 사용자가 현재 블록에서 상환의 효과를 시뮬레이션할 수 있게 해줍니다.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

이 함수는 `owner`에서 특정 수량의 `shares`를 상환하고 볼트에서 `receiver`에게 `assets`만큼의 기초 토큰을 보냅니다.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

유통 중인 상환되지 않은 볼트 지분의 총 개수를 반환합니다.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

`owner`가 현재 보유하고 있는 볼트 지분의 총량을 반환합니다.

### 인터페이스 맵 {#mapoftheinterface}

![Map of the ERC-4626 interface](./map-of-erc-4626.png)

### 이벤트 {#events}

#### Deposit 이벤트 {#deposit-event}

[`mint`](#mint) 및 [`deposit`](#deposit) 메서드를 통해 토큰이 볼트에 예치될 때 **반드시** 발생해야 합니다.

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

여기서 `sender`는 `assets`를 `shares`로 교환하고, 해당 `shares`를 `owner`에게 전송한 사용자입니다.

#### Withdraw 이벤트 {#withdraw-event}

예치자가 [`redeem`](#redeem) 또는 [`withdraw`](#withdraw) 메서드를 통해 볼트에서 지분을 인출할 때 **반드시** 발생해야 합니다.

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

여기서 `sender`는 인출을 트리거하고 `owner`가 소유한 `shares`를 `assets`로 교환한 사용자입니다. `receiver`는 인출된 `assets`를 받은 사용자입니다.

## 더 읽어보기 {#further-reading}

- [EIP-4626: 토큰화된 볼트 표준](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub 저장소](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)