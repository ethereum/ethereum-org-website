---
title: Multitokenový standard ERC-1155
description: Seznamte se s ERC-1155, standardem pro více tokenů, který v jednom smart kontraktu kombinuje zastupitelné a nezastupitelné tokeny.
lang: cs
---

## Úvod {#introduction}

Standardní rozhraní pro kontrakty, které spravují více typů tokenů. Jeden nasazený kontrakt může obsahovat libovolnou kombinaci zastupitelných tokenů, nezastupitelných tokenů nebo jiných konfigurací (např. polozastupitelných tokenů).

**Co znamená multitokenový standard?**

Myšlenka je jednoduchá a usiluje o vytvoření smart kontraktového rozhraní, které může reprezentovat a kontrolovat libovolný počet zaměnitelných a nezaměnitelných typů tokenů. Token ERC-1155 tak může plnit stejné funkce jako tokeny [ERC-20](/developers/docs/standards/tokens/erc-20/) a [ERC-721](/developers/docs/standards/tokens/erc-721/), a dokonce i obě najednou. Zlepšuje funkčnost standardů ERC-20 a ERC-721, činí je efektivnějšími a opravuje zjevné chyby v implementaci.

Token ERC-1155 je plně popsán v [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155).

## Předpoklady {#prerequisites}

Pro lepší pochopení této stránky doporučujeme nejprve si přečíst o [standardech tokenů](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) a [ERC-721](/developers/docs/standards/tokens/erc-721/).

## Funkce a vlastnosti ERC-1155: {#body}

- [Dávkový převod](#batch_transfers): Převod více aktiv v jednom volání.
- [Dávkový zůstatek](#batch_balance): Získání zůstatků více aktiv v jednom volání.
- [Dávkové schválení](#batch_approval): Schválení všech tokenů na adresu.
- [Háky](#receive_hook): Hák pro příjem tokenů.
- [Podpora NFT](#nft_support): Pokud je zásoba pouze 1, považuje se za NFT.
- [Pravidla pro bezpečný převod](#safe_transfer_rule): Sada pravidel pro bezpečný převod.

### Dávkové převody {#batch-transfers}

Hromadný přenos funguje velmi podobně jako běžné přenosy ERC-20. Podívejme se na běžnou funkci `transferFrom` v ERC-20:

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

Jediný rozdíl v ERC-1155 je ten, že předáváme hodnoty jako pole a také předáváme pole ID. Například pokud jsou `ids=[3, 6, 13]` a `values=[100, 200, 5]`, výsledné převody budou:

1. Převod 100 tokenů s ID 3 z `_from` na `_to`.
2. Převod 200 tokenů s ID 6 z `_from` na `_to`.
3. Převod 5 tokenů s ID 13 z `_from` na `_to`.

V ERC-1155 máme pouze `transferFrom`, žádný `transfer`. Chcete-li ji použít jako běžný `transfer`, stačí nastavit odesílající adresu na adresu, která funkci volá.

### Dávkový zůstatek {#batch-balance}

Odpovídající volání `balanceOf` v ERC-20 má také svou partnerskou funkci s podporou dávkového zpracování. Pro připomenutí, takto vypadá verze ERC-20:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

Ještě jednodušší je volání za účelem získání informace o zůstatcích: V jednom volání můžeme získat několik zůstatků najednou. Předáváme pole vlastníků, následované polem ID tokenů.

Například pokud jsou `_ids=[3, 6, 13]` a `_owners=[0xbeef..., 0x1337..., 0x1111...]`, návratová hodnota bude:

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

Schválení se mírně liší od ERC-20. Namísto schvalování konkrétních částek nastavíte operátora na schváleného nebo neschváleného pomocí `setApprovalForAll`.

Aktuální stav lze zjistit pomocí `isApprovedForAll`. Jak můžete vidět, je to vše nebo nic. Nemůžete definovat, kolik tokenů schválit nebo dokonce kterou třídu tokenů.

Tento design je záměrně jednoduchý. Můžete schválit pouze vše nebo nic pro jednu adresu.

### Hák pro příjem {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

Díky podpoře [EIP-165](https://eips.ethereum.org/EIPS/eip-165) podporuje ERC-1155 háky pro příjem pouze pro chytré kontrakty. Funkce háčku musí vrátit magickou předdefinovanou hodnotu bytes4, která je dána jako:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Když přijímající kontrakt vrátí tuto hodnotu, předpokládá se, že kontrakt přijímá přenos a ví, jak zacházet s tokeny ERC-1155. Skvělé, už žádné tokeny zaseknuté v kontraktu!

### Podpora NFT {#nft-support}

Když je zásoba pouze jedna, token je v podstatě nezaměnitelný token (NFT). A stejně jako u standardu ERC-721 můžete definovat URL metadat. Klienti mohou adresu URL číst a upravovat, viz [zde](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### Pravidlo bezpečného převodu {#safe-transfer-rule}

Už jsme se dotkli několika pravidel pro bezpečný přenos v předchozích vysvětleních. Podívejme se však na ta nejdůležitější z nich:

1. Volající musí mít schválení k útratě tokenů pro adresu `_from` nebo se volající musí rovnat `_from`.
2. Volání přenosu musí být zrušeno, pokud
   1. Adresa `_to` je 0.
   2. délka `_ids` není stejná jako délka `_values`.
   3. zůstatek držitele některého z tokenů v `_ids` je nižší než odpovídající částka v `_values` odeslaná příjemci.
   4. Dojde k jakékoliv jiné chybě.

_Poznámka_: Všechny dávkové funkce, včetně háku, existují také ve verzích bez dávkového zpracování. Je to takto nastaveno kvůli efektivitě využití paliva, protože přenos pouze jednoho aktiva bude pravděpodobně stále nejběžněji používaným způsobem. Pro zjednodušení jsme tyto funkce z článku vynechali, stejě jako pravidla bezpečného přenosu. Jejich jména jsou ale identická, stačí jen odstranit "Batch".

## Další čtení {#further-reading}

- [EIP-1155: Standard pro více tokenů](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: Dokumentace OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155: GitHub repozitář](https://github.com/enjin/erc-1155)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)
