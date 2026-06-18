---
title: Standard pro více tokenů ERC-1155
description: Přečtěte si o ERC-1155, standardu pro více tokenů, který kombinuje zaměnitelné a nezaměnitelné tokeny v jediném kontraktu.
lang: cs
---

## Úvod {#introduction}

Standardní rozhraní pro kontrakty, které spravují více typů tokenů. Jediný nasazený kontrakt může obsahovat libovolnou kombinaci zaměnitelných tokenů, nezaměnitelných tokenů nebo jiných konfigurací (např. částečně zaměnitelných tokenů).

**Co se myslí standardem pro více tokenů?**

Myšlenka je jednoduchá a snaží se vytvořit rozhraní chytrého kontraktu, které dokáže reprezentovat a ovládat libovolný počet typů zaměnitelných a nezaměnitelných tokenů. Tímto způsobem může token ERC-1155 plnit stejné funkce jako token [ERC-20](/developers/docs/standards/tokens/erc-20/) a [ERC-721](/developers/docs/standards/tokens/erc-721/), a dokonce i obojí současně. Zlepšuje funkčnost standardů ERC-20 i ERC-721, čímž je činí efektivnějšími a opravuje zjevné chyby v implementaci.

Token ERC-1155 je plně popsán v [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155).

## Předpoklady {#prerequisites}

Pro lepší pochopení této stránky doporučujeme nejprve si přečíst o [standardech tokenů](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) a [ERC-721](/developers/docs/standards/tokens/erc-721/).

## Funkce a vlastnosti ERC-1155: {#body}

- [Dávkový převod](#batch-transfers): Převod více aktiv v jediném volání.
- [Dávkový zůstatek](#batch-balance): Získání zůstatků více aktiv v jediném volání.
- [Dávkové schválení](#batch-approval): Schválit všechny tokeny pro danou adresu.
- [Hooky](#receive-hook): Hook pro příjem tokenů.
- [Podpora NFT](#nft-support): Pokud je nabídka pouze 1, zachází se s ním jako s NFT.
- [Pravidla pro bezpečný převod](#safe-transfer-rule): Soubor pravidel pro bezpečný převod.

### Dávkové převody {#batch-transfers}

Dávkový převod funguje velmi podobně jako běžné převody ERC-20. Podívejme se na běžnou funkci ERC-20 `transferFrom`:

```solidity
// ERC-20
function transferFrom(address from, address to, uint256 value) external returns (bool);

// ERC-1155
function safeBatchTransferFrom(
    address _from,
    address _to,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external;
```

Jediný rozdíl u ERC-1155 je ten, že hodnoty předáváme jako pole a také předáváme pole ID. Například při zadání `ids=[3, 6, 13]` a `values=[100, 200, 5]` budou výsledné převody následující:

1. Převod 100 tokenů s ID 3 z `_from` na `_to`.
2. Převod 200 tokenů s ID 6 z `_from` na `_to`.
3. Převod 5 tokenů s ID 13 z `_from` na `_to`.

V ERC-1155 máme pouze `transferFrom`, nikoli `transfer`. Chcete-li ji použít jako běžnou funkci `transfer`, stačí nastavit adresu odesílatele (from) na adresu, která funkci volá.

### Dávkový zůstatek {#batch-balance}

Příslušné volání ERC-20 `balanceOf` má rovněž svou partnerskou funkci s podporou dávek. Pro připomenutí, toto je verze ERC-20:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

Ještě jednodušší je to u volání zůstatku, kde můžeme získat více zůstatků v jediném volání. Předáme pole vlastníků následované polem ID tokenů.

Například při zadání `_ids=[3, 6, 13]` a `_owners=[0xbeef..., 0x1337..., 0x1111...]` bude návratová hodnota

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Dávkové schválení {#batch-approval}

```solidity
// ERC-1155
function setApprovalForAll(
    address _operator,
    bool _approved
) external;

function isApprovedForAll(
    address _owner,
    address _operator
) external view returns (bool);
```

Schválení se mírně liší od ERC-20. Místo schvalování konkrétních částek nastavíte operátora jako schváleného nebo neschváleného pomocí `setApprovalForAll`.

Čtení aktuálního stavu lze provést pomocí `isApprovedForAll`. Jak vidíte, jde o operaci typu všechno nebo nic. Nemůžete definovat, kolik tokenů schválit, ani o jakou třídu tokenů se jedná.

Toto je záměrně navrženo s ohledem na jednoduchost. Můžete schválit pouze vše pro jednu adresu.

### Hook pro příjem {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

Vzhledem k podpoře [EIP-165](https://eips.ethereum.org/EIPS/eip-165) podporuje ERC-1155 hooky pro příjem pouze pro chytré kontrakty. Funkce hooku musí vrátit magickou předdefinovanou hodnotu bytes4, která je dána jako:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Když přijímající kontrakt vrátí tuto hodnotu, předpokládá se, že kontrakt přijímá převod a ví, jak s tokeny ERC-1155 zacházet. Skvělé, už žádné uvízlé tokeny v kontraktu!

### Podpora NFT {#nft-support}

Když je nabídka pouze jedna, token je v podstatě nezaměnitelný token (NFT). A jak je standardem pro ERC-721, můžete definovat URL pro metadata. URL mohou klienti číst a upravovat, viz [zde](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### Pravidlo pro bezpečný převod {#safe-transfer-rule}

Některých pravidel pro bezpečný převod jsme se dotkli již v předchozích vysvětleních. Podívejme se ale na ta nejdůležitější z nich:

1. Volající musí být schválen k utrácení tokenů pro adresu `_from` nebo se volající musí rovnat `_from`.
2. Volání převodu se musí zvrátit, pokud
   1. adresa `_to` je 0.
   2. délka `_ids` není stejná jako délka `_values`.
   3. jakýkoli ze zůstatků držitelů pro tokeny v `_ids` je nižší než příslušné částky v `_values` odeslané příjemci.
   4. dojde k jakékoli jiné chybě.

_Poznámka_: Všechny dávkové funkce včetně hooku existují také ve verzích bez dávek. Děje se tak z důvodu úspory gasu, vzhledem k tomu, že převod pouze jednoho aktiva bude pravděpodobně stále nejčastěji používaným způsobem. Pro zjednodušení jsme je ve vysvětleních vynechali, včetně pravidel pro bezpečný převod. Názvy jsou totožné, stačí odstranit slovo 'Batch'.

## Další čtení {#further-reading}

- [EIP-1155: Standard pro více tokenů](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: Dokumentace OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155: Repozitář na GitHubu](https://github.com/enjin/erc-1155)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)