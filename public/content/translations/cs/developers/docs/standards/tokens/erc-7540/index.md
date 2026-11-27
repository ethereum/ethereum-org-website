---
title: "Standard asynchronního tokenizovaného trezoru ERC-7540"
description: "Rozšíření ERC-4626, které přidává asynchronní toky vkladů a výběrů pro tokenizované trezory."
lang: cs
---

## Úvod {#introduction}

ERC-7540 rozšiřuje [standard tokenizovaného trezoru ERC-4626](/developers/docs/standards/tokens/erc-4626/) o podporu asynchronních toků vkladů a výběrů. Zavádí vzor žádost-poté-nárok (request-then-claim): uživatelé nejprve podají žádost (předají svá aktiva nebo podíly do trezoru) a poté si nárokují výsledek, jakmile jej trezor zpracuje.

To je potřeba, když trezor nemůže provést vypořádání okamžitě v jedné transakci, například:

- Protokoly pro aktiva reálného světa (RWA), jako jsou tokenizované státní dluhopisy, soukromé úvěry a další aktiva s cykly vypořádání T+1 nebo T+2
- Půjčování s nedostatečným zajištěním (undercollateralized lending), kde hodnocení úvěrového rizika probíhá offchain
- Meziřetězcové strategie trezorů, kde přemostění (bridging) vnáší zpoždění
- Tokeny likvidního stakingu (LST) s obdobími pro uvolnění (unbonding periods)

Trezory si mohou vybrat, zda budou asynchronní pouze pro vklady, pouze pro výběry, nebo pro obojí. Tato flexibilita umožňuje vývojářům trezorů přidat asynchronní toky pouze tam, kde to podkladová strategie vyžaduje, a zároveň zachovat druhou stranu synchronní.

## Předpoklady {#prerequisites}

Pro lepší pochopení této stránky doporučujeme nejprve si přečíst o [standardech tokenů](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) a [ERC-4626](/developers/docs/standards/tokens/erc-4626/).

## ERC-4626 vs ERC-7540 {#comparison}

V ERC-4626 se vklad vypořádává atomicky: investor odešle aktiva a obdrží zpět podíly v jediné transakci.

<VaultDepositDiagram />

ERC-7540 to rozděluje do dvou kroků. Investor nejprve zavolá `requestDeposit()`, což převede jeho aktiva do trezoru, a poté čeká, až trezor žádost zpracuje. Jak a kdy se tak stane, závisí na trezoru, například když se dokončí offchain vypořádání. Jakmile je žádost splněna, investor zavolá `deposit()`, aby si nárokoval své podíly. Směnný kurz není v době žádosti pevně stanoven: trezor jej nastavuje, obvykle při splnění žádosti, takže obdržené podíly se mohou lišit od toho, co vrátilo `convertToShares()` v době podání žádosti.

<AsyncVaultDiagram />

Tok výběru funguje stejným způsobem: `requestRedeem()` převezme podíly od investora a jakmile je žádost splněna, investor zavolá `redeem()`, aby si nárokoval aktiva.

## Funkce a vlastnosti ERC-7540 {#body}

ERC-7540 dědí celé rozhraní ERC-4626, ale mění účel `deposit`/`mint`/`withdraw`/`redeem` na funkce pro nárokování. Nové funkce `requestDeposit` a `requestRedeem` zpracovávají počáteční krok žádosti.

Každá žádost prochází třemi stavy: čekající (pending - podána, čeká na zpracování), nárokovatelná (claimable - splněna a oceněna) a nárokovaná (claimed - investor si vyzvedl své podíly nebo aktiva). Trezor může učinit žádost nárokovatelnou okamžitě a přeskočit stav čekání, ale nárokování je vždy samostatné volání. Standard nedefinuje žádnou událost pro okamžik, kdy se žádost stane nárokovatelnou.

<VaultRequestDiagram />

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

Převezme kontrolu nad `shares` od `owner` a podá žádost o výběr. Trezor může držet podíly, dokud není žádost nárokována, nebo je může rovnou spálit. Adresa `controller` získá kontrolu nad žádostí.

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
