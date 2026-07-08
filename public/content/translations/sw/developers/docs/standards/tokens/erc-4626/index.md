---
title: Kiwango cha Hifadhi Iliyowekwa Tokeni cha ERC-4626
description: Kiwango cha hifadhi zinazozalisha faida.
lang: sw
---

## Utangulizi {#introduction}

ERC-4626 ni kiwango cha kuboresha na kuunganisha vigezo vya kiufundi vya hifadhi zinazozalisha faida. Inatoa API ya kiwango kwa hifadhi zinazozalisha faida zilizowekwa tokeni ambazo zinawakilisha hisa za tokeni moja ya msingi ya ERC-20. ERC-4626 pia inaelezea kiendelezi cha hiari kwa hifadhi zilizowekwa tokeni zinazotumia ERC-20, ikitoa utendaji wa kimsingi wa kuweka amana, utoaji wa tokeni na kusoma salio.

**Jukumu la ERC-4626 katika hifadhi zinazozalisha faida**

Masoko ya ukopeshaji, vijumlishi, na tokeni zinazozalisha riba kiasili huwasaidia watumiaji kupata faida bora kwenye tokeni zao za kripto kwa kutekeleza mikakati tofauti. Mikakati hii inafanywa kwa tofauti ndogo, ambayo inaweza kuwa na makosa au kupoteza rasilimali za maendeleo.

ERC-4626 katika hifadhi zinazozalisha faida itapunguza juhudi za ujumuishaji na kufungua ufikiaji wa faida katika programu mbalimbali kwa juhudi kidogo maalum kutoka kwa wasanidi programu kwa kuunda mifumo thabiti zaidi na imara ya utekelezaji.

Tokeni ya ERC-4626 imeelezewa kikamilifu katika [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Kiendelezi cha hifadhi isiyosawazishwa (ERC-7540)**

ERC-4626 imeboreshwa kwa amana na ukombozi wa atomiki hadi kikomo. Ikiwa kikomo kinafikiwa, hakuna amana mpya au ukombozi unaoweza kuwasilishwa. Kizuizi hiki hakifanyi kazi vizuri kwa mfumo wowote wa mkataba mahiri wenye vitendo visivyosawazishwa au ucheleweshaji kama sharti la kuingiliana na Hifadhi (k.m., itifaki za mali za ulimwengu halisi, itifaki za ukopeshaji zisizo na dhamana ya kutosha, itifaki za ukopeshaji za mtambuko-mnyororo, tokani za uwekaji amana wenye ukwasi (lst), au moduli za usalama wa bima).

ERC-7540 inapanua matumizi ya Hifadhi za ERC-4626 kwa matukio ya matumizi yasiyosawazishwa. Kiolesura kilichopo cha Hifadhi (`deposit`/`withdraw`/`mint`/`redeem`) kinatumika kikamilifu kudai Maombi yasiyosawazishwa.

Kiendelezi cha ERC-7540 kimeelezewa kikamilifu katika [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Kiendelezi cha hifadhi ya mali nyingi (ERC-7575)**

Tukio moja la matumizi linalokosekana ambalo halitumiki na ERC-4626 ni Hifadhi ambazo zina mali nyingi au sehemu za kuingilia kama vile Tokeni za mtoa ukwasi (LP). Hizi kwa ujumla ni ngumu au hazitii kutokana na hitaji la ERC-4626 yenyewe kuwa ERC-20.

ERC-7575 inaongeza usaidizi kwa Hifadhi zenye mali nyingi kwa kuweka nje utekelezaji wa tokeni ya ERC-20 kutoka kwa utekelezaji wa ERC-4626.

Kiendelezi cha ERC-7575 kimeelezewa kikamilifu katika [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## Mahitaji ya Awali {#prerequisites}

Ili kuelewa vyema ukurasa huu, tunapendekeza usome kwanza kuhusu [viwango vya tokeni](/developers/docs/standards/tokens/) na [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Kazi na Vipengele vya ERC-4626: {#body}

### Mbinu {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Kazi hii inarejesha anwani ya tokeni ya msingi inayotumika kwa hifadhi kwa uhasibu, kuweka amana, na utoaji.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Kazi hii inarejesha jumla ya kiasi cha mali za msingi zinazoshikiliwa na hifadhi.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Kazi hii inarejesha kiasi cha `shares` ambacho kingebadilishwa na hifadhi kwa kiasi cha `assets` kilichotolewa.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Kazi hii inarejesha kiasi cha `assets` ambacho kingebadilishwa na hifadhi kwa kiasi cha `shares` kilichotolewa.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Kazi hii inarejesha kiasi cha juu zaidi cha mali za msingi zinazoweza kuwekwa katika wito mmoja wa [`deposit`](#deposit), huku hisa zikifuwa kwa ajili ya `receiver`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Kazi hii inaruhusu watumiaji kuiga athari za amana yao kwenye kitalu cha sasa.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Kazi hii inaweka amana ya `assets` ya tokeni za msingi kwenye hifadhi na kutoa umiliki wa `shares` kwa `receiver`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Kazi hii inarejesha kiasi cha juu zaidi cha hisa zinazoweza kufua katika wito mmoja wa [`mint`](#mint), huku hisa zikifuwa kwa ajili ya `receiver`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Kazi hii inaruhusu watumiaji kuiga athari za ufufuaji wao kwenye kitalu cha sasa.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Kazi hii inafua hisa za hifadhi `shares` haswa kwa `receiver` kwa kuweka amana ya `assets` ya tokeni za msingi.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Kazi hii inarejesha kiasi cha juu zaidi cha mali za msingi zinazoweza kutolewa kutoka kwa salio la `owner` kwa wito mmoja wa [`withdraw`](#withdraw).

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Kazi hii inaruhusu watumiaji kuiga athari za utoaji wao kwenye kitalu cha sasa.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Kazi hii inateketeza `shares` kutoka kwa `owner` na kutuma tokeni `assets` haswa kutoka kwenye hifadhi kwenda kwa `receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Kazi hii inarejesha kiasi cha juu zaidi cha hisa zinazoweza kukombolewa kutoka kwa salio la `owner` kupitia wito wa [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Kazi hii inaruhusu watumiaji kuiga athari za ukombozi wao kwenye kitalu cha sasa.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Kazi hii inakomboa idadi maalum ya `shares` kutoka kwa `owner` na kutuma `assets` ya tokeni ya msingi kutoka kwenye hifadhi kwenda kwa `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Inarejesha jumla ya idadi ya hisa za hifadhi ambazo hazijakombolewa katika mzunguko.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Inarejesha jumla ya kiasi cha hisa za hifadhi ambazo `owner` anazo kwa sasa.

### Ramani ya kiolesura {#mapoftheinterface}

![Map of the ERC-4626 interface](./map-of-erc-4626.png)

### Matukio {#events}

#### Tukio la Kuweka Amana {#deposit-event}

**LAZIMA** itolewe wakati tokeni zinawekwa kwenye hifadhi kupitia mbinu za [`mint`](#mint) na [`deposit`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Ambapo `sender` ni mtumiaji aliyebadilisha `assets` kwa `shares`, na kuhamisha hizo `shares` kwa `owner`.

#### Tukio la Utoaji {#withdraw-event}

**LAZIMA** itolewe wakati hisa zinatolewa kutoka kwenye hifadhi na mweka amana katika mbinu za [`redeem`](#redeem) au [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Ambapo `sender` ni mtumiaji aliyeanzisha utoaji na kubadilisha `shares`, inayomilikiwa na `owner`, kwa `assets`. `receiver` ni mtumiaji aliyepokea `assets` iliyotolewa.

## Usomaji zaidi {#further-reading}

- [EIP-4626: Kiwango cha hifadhi Iliyowekwa Tokeni](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: Repo ya GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)