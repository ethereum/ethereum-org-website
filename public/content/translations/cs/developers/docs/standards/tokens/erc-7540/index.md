---
title: Standard asynchronního tokenizovaného trezoru ERC-7540
description: Rozšíření ERC-4626, které přidává asynchronní toky vkladů a výběrů pro tokenizované trezory.
lang: cs
---

## Úvod {#introduction}

ERC-7540 rozšiřuje [standard tokenizovaného trezoru ERC-4626](/developers/docs/standards/tokens/erc-4626/) přidáním podpory pro asynchronní toky vkladů a výběrů. Zavádí vzor žádost-poté-nárok (request-then-claim): uživatelé nejprve podají žádost (uzamknou svá aktiva nebo podíly) a poté si nárokují výsledek poté, co jej trezor zpracuje.

To je potřeba, když trezor nemůže provést vypořádání okamžitě v jedné transakci, například:

- Protokoly pro aktiva reálného světa (RWA), jako jsou tokenizované státní dluhopisy, soukromé úvěry a další aktiva s cykly vypořádání T+1 nebo T+2
- Nedostatečně zajištěné půjčování, kde hodnocení úvěruschopnosti probíhá offchain
- Meziřetězcové strategie trezorů, kde přemostění (bridging) vnáší zpoždění
- Tokeny likvidního stakingu (LST) s obdobím pro uvolnění (unbonding)

Trezory si mohou vybrat, zda budou asynchronní pouze pro vklady, pouze pro výběry, nebo pro obojí. Tato flexibilita umožňuje vývojářům trezorů přidat asynchronní toky pouze tam, kde to podkladová strategie vyžaduje, a zároveň ponechat druhou stranu synchronní.

## Předpoklady {#prerequisites}

Pro lepší pochopení této stránky doporučujeme nejprve si přečíst o [standardech tokenů](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) a [ERC-4626](/developers/docs/standards/tokens/erc-4626/).

## ERC-4626 vs ERC-7540 {#comparison}

V ERC-4626 se vklad vypořádá atomicky: investor odešle aktiva a obdrží zpět podíly v jediné transakci.

![ERC-4626 synchronous deposit flow](./erc-4626-sync-flow.svg)

ERC-7540 to rozděluje do dvou kroků. Investor nejprve zavolá `requestDeposit()` pro uzamčení aktiv, poté čeká, až správce trezoru žádost zpracuje. Po splnění investor zavolá `deposit()`, aby si nárokoval své podíly. Směnné kurzy se určují v době splnění, nikoli v době žádosti.

![ERC-7540 asynchronous deposit flow](./erc-7540-async-flow.svg)

Tok výběru funguje stejným způsobem: `requestRedeem()` uzamkne podíly a po splnění investor zavolá `redeem()`, aby si nárokoval aktiva.

## Funkce a vlastnosti ERC-7540 {#body}

ERC-7540 dědí celé rozhraní ERC-4626, ale mění účel `deposit`/`mint`/`withdraw`/`redeem` na funkce pro nárokování. Nové funkce `requestDeposit` a `requestRedeem` zpracovávají počáteční krok žádosti.

Každá žádost prochází třemi stavy: čekající (pending - podaná, čeká na zpracování), nárokovatelná (claimable - splněná a oceněná) a nárokovaná (claimed - investor si vyzvedl své podíly nebo aktiva).

![Request lifecycle: Pending, Claimable, Claimed](./request-lifecycle.svg)

### Tok žádosti o vklad {#deposit-request-flow}

#### requestDeposit {#requestdeposit}

```solidity
function requestDeposit(uint256 assets, address controller, address owner) external returns (uint256 requestId)
```

Převede `assets` z `owner` do trezoru a podá žádost o vklad. Adresa `controller` získá kontrolu nad žádostí. Vrací `requestId` identifikující dávku žádostí.

#### pendingDepositRequest {#pendingdepositrequest}

```solidity
function pendingDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Vrací množství `assets` v čekající (dosud nenárokovatelné) žádosti o vklad pro daného `controller` a `requestId`.

#### claimableDepositRequest {#claimabledepositrequest}

```solidity
function claimableDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Vrací množství `assets` v nárokovatelné (splněné, ale dosud nenárokované) žádosti o vklad pro daného `controller` a `requestId`.

#### Nárokování vkladů {#claiming-deposits}

Jakmile se žádost o vklad stane nárokovatelnou, uživatel zavolá standardní funkci ERC-4626 [`deposit`](/developers/docs/standards/tokens/erc-4626/#deposit) nebo [`mint`](/developers/docs/standards/tokens/erc-4626/#mint), aby si nárokoval své podíly. V ERC-7540 tyto funkce již nepřevádějí aktiva (to se stalo již v době žádosti). Pouze razí podíly pro příjemce.

### Tok žádosti o výběr {#redemption-request-flow}

#### requestRedeem {#requestredeem}

```solidity
function requestRedeem(uint256 shares, address controller, address owner) external returns (uint256 requestId)
```

Uzamkne `shares` z `owner` a podá žádost o výběr. Adresa `controller` získá kontrolu nad žádostí.

#### pendingRedeemRequest {#pendingredeemrequest}

```solidity
function pendingRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Vrací množství `shares` v čekající žádosti o výběr pro daného `controller` a `requestId`.

#### claimableRedeemRequest {#claimableredeemrequest}

```solidity
function claimableRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Vrací množství `shares` v nárokovatelné žádosti o výběr pro daného `controller` a `requestId`.

#### Nárokování výběrů {#claiming-redemptions}

Jakmile se žádost o výběr stane nárokovatelnou, uživatel zavolá standardní funkci ERC-4626 [`redeem`](/developers/docs/standards/tokens/erc-4626/#redeem) nebo [`withdraw`](/developers/docs/standards/tokens/erc-4626/#withdraw), aby si nárokoval svá aktiva.

### Správa operátorů {#operator-management}

ERC-7540 zahrnuje vzor operátora (z [ERC-6909](https://eips.ethereum.org/EIPS/eip-6909)), který umožňuje třetím stranám spravovat žádosti jménem uživatele.

#### setOperator {#setoperator}

```solidity
function setOperator(address operator, bool approved) external returns (bool)
```

Schvaluje nebo odvolává `operator` k jednání jménem `msg.sender` pro žádosti o vklad/výběr a nároky.

#### isOperator {#isoperator}

```solidity
function isOperator(address controller, address operator) external view returns (bool)
```

Vrací, zda je `operator` schválen k jednání jménem `controller`.

### ID žádostí {#request-ids}

ID žádostí rozlišují mezi různými dávkami žádostí. Všechny žádosti sdílející stejné `requestId` jsou zastupitelné (fungible): přecházejí mezi stavy společně a získávají stejný směnný kurz.

Když trezor vrací `requestId = 0` pro všechny žádosti, pouze adresa `controller` rozlišuje stav žádosti. Více žádostí od stejného kontrolora se agreguje.

### Události {#events}

#### Událost DepositRequest {#depositrequest-event}

MUSÍ být vyvolána, když je podána žádost o vklad prostřednictvím [`requestDeposit`](#requestdeposit).

```solidity
event DepositRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 assets
)
```

#### Událost RedeemRequest {#redeemrequest-event}

MUSÍ být vyvolána, když je podána žádost o výběr prostřednictvím [`requestRedeem`](#requestredeem).

```solidity
event RedeemRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 shares
)
```

#### Událost OperatorSet {#operatorset-event}

MUSÍ být vyvolána, když je operátor schválen nebo odvolán prostřednictvím [`setOperator`](#setoperator).

```solidity
event OperatorSet(
    address indexed controller,
    address indexed operator,
    bool approved
)
```

### Funkce náhledu (Preview) {#preview-functions}

Funkce náhledu se musí zvrátit pouze pro toky, které jsou asynchronní, protože směnný kurz není znám, dokud není žádost splněna. V trezoru s asynchronním vkladem se `previewDeposit` a `previewMint` MUSÍ zvrátit, zatímco `previewRedeem` a `previewWithdraw` nadále fungují jako v ERC-4626 (a naopak pro trezor s asynchronním výběrem). Toto je klíčový rozdíl v chování oproti ERC-4626.

## Další čtení {#further-reading}

- [EIP-7540: Asynchronní tokenizované trezory ERC-4626](https://eips.ethereum.org/EIPS/eip-7540)
- [EIP-4626: Standard tokenizovaného trezoru](https://eips.ethereum.org/EIPS/eip-4626)
- [Implementace ERC-7540 od OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-community-contracts/blob/master/contracts/token/ERC20/extensions/ERC7540.sol)