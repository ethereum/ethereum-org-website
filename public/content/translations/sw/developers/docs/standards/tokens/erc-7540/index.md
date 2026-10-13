---
title: Kiwango cha Hifadhi Iliyowekwa Tokeni Isiyosawazishwa ya ERC-7540
description: Kiendelezi cha ERC-4626 kinachoongeza mtiririko wa uwekaji na ukombozi usiosawazishwa kwa hifadhi zilizowekwa tokeni.
lang: sw
---

## Utangulizi {#introduction}

ERC-7540 inapanua [Kiwango cha Hifadhi Iliyowekwa Tokeni cha ERC-4626](/developers/docs/standards/tokens/erc-4626/) kwa kuongeza usaidizi wa mtiririko wa uwekaji na ukombozi usiosawazishwa. Inaleta muundo wa omba-kisha-udai: watumiaji kwanza huwasilisha ombi (kufunga rasilimali au hisa zao), kisha kudai matokeo baada ya hifadhi kuyachakata.

Hili linahitajika wakati hifadhi haiwezi kufanya ukamilishaji papo hapo katika muamala mmoja, kwa mfano:

- Itifaki za rasilimali za ulimwengu halisi (RWA) kama vile hazina zilizowekwa tokeni, mikopo ya kibinafsi, na rasilimali nyingine zenye mizunguko ya ukamilishaji ya T+1 au T+2
- Ukopeshaji usio na dhamana ya kutosha ambapo tathmini za mikopo hufanyika nje ya mnyororo
- Mikakati ya hifadhi ya mtambuko-mnyororo ambapo uunganishaji huleta ucheleweshaji
- Tokani za uwekaji amana wenye ukwasi (lst) zenye vipindi vya kuondoa ufungaji

Hifadhi zinaweza kuchagua kutokuwa zilizosawazishwa kwenye uwekaji pekee, ukombozi pekee, au yote mawili. Unyumbufu huu unawaruhusu wasanidi wa hifadhi kuongeza mtiririko usiosawazishwa tu pale ambapo mkakati wa msingi unauhitaji, huku wakiweka upande mwingine ukiwa umesawazishwa.

## Sharti za Awali {#prerequisites}

Ili kuelewa vyema ukurasa huu, tunapendekeza usome kwanza kuhusu [viwango vya tokeni](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/), na [ERC-4626](/developers/docs/standards/tokens/erc-4626/).

## ERC-4626 dhidi ya ERC-7540 {#comparison}

Katika ERC-4626, uwekaji hufanya ukamilishaji kwa pamoja: mwekezaji hutuma rasilimali na kupokea hisa katika muamala mmoja.

![ERC-4626 synchronous deposit flow](./erc-4626-sync-flow.svg)

ERC-7540 inagawanya hili katika hatua mbili. Mwekezaji kwanza huita `requestDeposit()` ili kufunga rasilimali, kisha anasubiri meneja wa hifadhi kuchakata ombi. Baada ya kutimizwa, mwekezaji huita `deposit()` ili kudai hisa zao. Viwango vya ubadilishaji huamuliwa wakati wa utimizaji, si wakati wa ombi.

![ERC-7540 asynchronous deposit flow](./erc-7540-async-flow.svg)

Mtiririko wa ukombozi hufanya kazi kwa njia sawa: `requestRedeem()` hufunga hisa, na baada ya kutimizwa mwekezaji huita `redeem()` ili kudai rasilimali.

## Kazi na Vipengele vya ERC-7540 {#body}

ERC-7540 inarithi kiolesura kamili cha ERC-4626 lakini inabadilisha matumizi ya `deposit`/`mint`/`withdraw`/`redeem` kuwa kazi za dai. Kazi mpya za `requestDeposit` na `requestRedeem` hushughulikia hatua ya awali ya ombi.

Kila ombi hupitia hali tatu: inasubiri (imewasilishwa, inasubiri kuchakatwa), inayoweza kudaiwa (imetimizwa na kupangiwa bei), na iliyodaiwa (mwekezaji amekusanya hisa au rasilimali zake).

![Request lifecycle: Pending, Claimable, Claimed](./request-lifecycle.svg)

### Mtiririko wa ombi la uwekaji {#deposit-request-flow}

#### requestDeposit {#requestdeposit}

```solidity
function requestDeposit(uint256 assets, address controller, address owner) external returns (uint256 requestId)
```

Hufanya hamisho la `assets` kutoka `owner` hadi kwenye hifadhi na kuwasilisha ombi la kuweka. Anwani ya `controller` hupokea udhibiti wa ombi. Hurejesha `requestId` inayotambulisha kundi la ombi.

#### pendingDepositRequest {#pendingdepositrequest}

```solidity
function pendingDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Hurejesha kiasi cha `assets` katika ombi la uwekaji linalosubiri (ambalo bado haliwezi kudaiwa) kwa anwani ya `controller` na `requestId` iliyotolewa.

#### claimableDepositRequest {#claimabledepositrequest}

```solidity
function claimableDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Hurejesha kiasi cha `assets` katika ombi la uwekaji linaloweza kudaiwa (lililotimizwa lakini bado halijadaiwa) kwa anwani ya `controller` na `requestId` iliyotolewa.

#### Kudai uwekaji {#claiming-deposits}

Pindi ombi la uwekaji linapoweza kudaiwa, mtumiaji huita kazi ya kawaida ya ERC-4626 ya [`deposit`](/developers/docs/standards/tokens/erc-4626/#deposit) au [`mint`](/developers/docs/standards/tokens/erc-4626/#mint) ili kudai hisa zao. Katika ERC-7540, kazi hizi hazifanyi tena hamisho la rasilimali (hilo tayari lilifanyika wakati wa ombi). Zinafua tu hisa kwa mpokeaji.

### Mtiririko wa ombi la ukombozi {#redemption-request-flow}

#### requestRedeem {#requestredeem}

```solidity
function requestRedeem(uint256 shares, address controller, address owner) external returns (uint256 requestId)
```

Hufunga `shares` kutoka `owner` na kuwasilisha ombi la kukomboa. Anwani ya `controller` hupokea udhibiti wa ombi.

#### pendingRedeemRequest {#pendingredeemrequest}

```solidity
function pendingRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Hurejesha kiasi cha `shares` katika ombi la ukombozi linalosubiri kwa anwani ya `controller` na `requestId` iliyotolewa.

#### claimableRedeemRequest {#claimableredeemrequest}

```solidity
function claimableRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Hurejesha kiasi cha `shares` katika ombi la ukombozi linaloweza kudaiwa kwa anwani ya `controller` na `requestId` iliyotolewa.

#### Kudai ukombozi {#claiming-redemptions}

Pindi ombi la ukombozi linapoweza kudaiwa, mtumiaji huita kazi ya kawaida ya ERC-4626 ya [`redeem`](/developers/docs/standards/tokens/erc-4626/#redeem) au [`withdraw`](/developers/docs/standards/tokens/erc-4626/#withdraw) ili kudai rasilimali zao.

### Usimamizi wa mwendeshaji {#operator-management}

ERC-7540 inajumuisha muundo wa mwendeshaji (kutoka [ERC-6909](https://eips.ethereum.org/EIPS/eip-6909)) unaoruhusu wahusika wengine kusimamia maombi kwa niaba ya mtumiaji.

#### setOperator {#setoperator}

```solidity
function setOperator(address operator, bool approved) external returns (bool)
```

Huidhinisha au kubatilisha `operator` kutenda kwa niaba ya `msg.sender` kwa maombi ya uwekaji/ukombozi na madai.

#### isOperator {#isoperator}

```solidity
function isOperator(address controller, address operator) external view returns (bool)
```

Hurejesha iwapo `operator` imeidhinishwa kutenda kwa niaba ya `controller`.

### Vitambulisho vya Ombi {#request-ids}

Vitambulisho vya Ombi hutofautisha kati ya makundi tofauti ya maombi. Maombi yote yanayoshiriki `requestId` sawa yanaweza kubadilishana: yanabadilika kati ya hali kwa pamoja na kupokea kiwango sawa cha ubadilishaji.

Wakati hifadhi inarejesha `requestId = 0` kwa maombi yote, anwani ya `controller` pekee ndiyo inayotofautisha hali ya ombi. Maombi mengi kutoka kwa kidhibiti kimoja hujumuishwa.

### Matukio {#events}

#### Tukio la DepositRequest {#depositrequest-event}

LAZIMA litolewe wakati ombi la uwekaji linawasilishwa kupitia [`requestDeposit`](#requestdeposit).

```solidity
event DepositRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 assets
)
```

#### Tukio la RedeemRequest {#redeemrequest-event}

LAZIMA litolewe wakati ombi la ukombozi linawasilishwa kupitia [`requestRedeem`](#requestredeem).

```solidity
event RedeemRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 shares
)
```

#### Tukio la OperatorSet {#operatorset-event}

LAZIMA litolewe wakati mwendeshaji anaidhinishwa au kubatilishwa kupitia [`setOperator`](#setoperator).

```solidity
event OperatorSet(
    address indexed controller,
    address indexed operator,
    bool approved
)
```

### Kazi za onyesho la awali {#preview-functions}

Kazi za onyesho la awali lazima zitengue tu kwa mtiririko ambao haujasawazishwa, kwa sababu kiwango cha ubadilishaji hakijulikani hadi ombi litimizwe. Katika hifadhi ya uwekaji isiyosawazishwa, `previewDeposit` na `previewMint` LAZIMA zitengue, huku `previewRedeem` na `previewWithdraw` zikiendelea kufanya kazi kama katika ERC-4626 (na kinyume chake kwa hifadhi ya ukombozi isiyosawazishwa). Hii ni tofauti kuu ya kitabia kutoka kwa ERC-4626.

## Usomaji zaidi {#further-reading}

- [EIP-7540: Hifadhi Zilizowekwa Tokeni Zisizosawazishwa za ERC-4626](https://eips.ethereum.org/EIPS/eip-7540)
- [EIP-4626: Kiwango cha Hifadhi Iliyowekwa Tokeni](https://eips.ethereum.org/EIPS/eip-4626)
- [Utekelezaji wa ERC-7540 wa OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-community-contracts/blob/master/contracts/token/ERC20/extensions/ERC7540.sol)