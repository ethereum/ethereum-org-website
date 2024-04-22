---
title: ERC-1155 Multitoken szabvány
description:
lang: hu
---

## Bevezetés {#introduction}

Egy sztenderd interfész olyan szerződésekhez, amelyek többféle tokentípust kezelnek. Egy telepített szerződés tartalmazhatja helyettesíthető és nem helyettesíthető tokenek vagy más konfigurációk (például félig helyettesíthető tokenek) bármilyen kombinációját.

**Mit jelent a multitoken szabvány?**

Az ötlet egyszerű, és egy olyan okosszerződéses interfész létrehozására irányul, amely bármilyen számú helyettesíthető és nem helyettesíthető tokentípust képes reprezentálni és irányítani. Ily módon az ERC-1155 token ugyanazokat a funkciókat tudja ellátni, mint egy [ERC-20](/developers/docs/standards/tokens/erc-20/) és [ERC-721](/developers/docs/standards/tokens/erc-721/) token, sőt mindkettő egyszerre. Javítja az ERC-20 és ERC-721 szabványok működését, hatékonyabbá teszi és kijavítja a nyilvánvaló végrehajtási hibákat.

Az ERC-1155 token teljes körű leírását az [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155) tartalmazza.

## Előfeltételek {#prerequisites}

Az oldal jobb megértéséhez javasoljuk, hogy először olvassa el a [tokenszabványok](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) és [ERC-721](/developers/docs/standards/tokens/erc-721/) nevű dokumentumokat.

## ERC-1155 funkciók és jellemzők: {#body}

- [Csoportos transzfer](#batch_transfers): Több eszköz átvitele egyetlen hívással.
- [Csoportos egyenleglehívás](#batch_balance): Több eszköz egyenlegének lekérdezése egyetlen hívással.
- [Csoportos jóváhagyás](#batch_approval): Az összes token jóváhagyása egy címre.
- [Hook-ok](#receive_hook): Token-hook-ok fogadása.
- [NFT támogatás](#nft_support): Ha a kínálat csak 1, kezelje NFT-ként.
- [Biztonságos átviteli szabályok](#safe_transfer_rule): Szabályok a biztonságos átvitelre.

### Csoportos transzferek {#batch-transfers}

A csoportos transzfer nagyon hasonlóan működik, mint a hagyományos ERC-20-transzfer. Nézzük meg a normál ERC-20 `transferFrom` funkciót:

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

Az egyetlen különbség az ERC-1155-ben az, hogy az értékeket tömbként adjuk át, és az azonosítók tömbjét is átadjuk. Például `ids=[3, 6, 13]` és `values=[100, 200, 5]` esetén a kapott átutalások a következők lesznek:

1. 100 darab 3-as azonosítójú token átvitele `_from` helyről `_to` helyre.
2. 200 darab 6-os azonosítójú token átvitele `_from` helyről `_to` helyre.
3. 5 darab 13-as azonosítójú token átvitele `_from` helyről `_to` helyre.

Az ERC-1155-ben csak `transferFrom` van, `transfer` nincs. Ha normál `transfer` módjára akarja használni, csak állítsa be a „from” címet a függvényt hívó címre.

### Csoportos egyenleglehívás {#batch-balance}

A megfelelő ERC-20 `balanceOf` hívás szintén rendelkezik csoportos támogatású partnerfunkcióval. Emlékeztetőül, ez az ERC-20-as verzió:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

Még egyszerűbb az egyenleghívásnál, hogy egyetlen hívással több egyenleget is lekérdezhetünk. Átadjuk a tulajdonosok tömbjét, majd a tokenazonosítók tömbjét.

Ha például `_ids=[3, 6, 13]` és `_owners=[0xbeef..., 0x1337..., 0x1111...]`, a visszatérési érték a következő lesz:

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Csoportos jóváhagyás {#batch-approval}

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

A jóváhagyások némileg eltérnek az ERC-20-tól. Konkrét összegek jóváhagyása helyett a `setApprovalForAll` segítségével állíthat be egy jóváhagyási vagy nem jóváhagyási műveletet.

Az aktuális státusz leolvasása az `isApprovedForAll` segítségével történhet. Amint látja, ez egy mindent vagy semmit művelet. Nem határozhatja meg, hogy hány tokent hagyjon jóvá, és azt sem, hogy melyik tokenosztályt hagyja jóvá.

Ezt szándékosan az egyszerűség jegyében tervezték. Egy címre vonatkozóan hagyhat jóvá mindent.

### Hook fogadása {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

Tekintettel az [EIP-165](https://eips.ethereum.org/EIPS/eip-165) támogatásra, az ERC-1155 csak az okosszerződésekre vonatkozó hook-okat fogadja. A hook-függvénynek egy mágikus, előre definiált bytes4-értéket kell visszaadnia, amely a következő formában van megadva:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Ha a fogadó szerződés visszaküldi ezt az értéket, akkor feltételezzük, hogy a szerződés elfogadja az átutalást, és tudja, hogyan kell kezelni az ERC-1155 tokeneket. Remek, nincs többé szerződésbe ragadt token!

### NFT-támogatás {#nft-support}

Ha a kínálat csak egy darab, akkor a token lényegében egy nem helyettesíthető token (NFT). Az ERC-721 szabványának megfelelően meghatározhat egy metaadat URL-címet is. Az ügyfelek képesek az URL-t olvasni és módosítani, ennek módját [itt](https://eips.ethereum.org/EIPS/eip-1155#metadata) tekintheti meg.

### Biztonságos átutalási szabály {#safe-transfer-rule}

Az előző magyarázatokban már érintettünk néhány biztonságos átutalási szabályt. De nézzük a szabályok közül a legfontosabbat:

1. A hívónak engedélyeznie kell a `_from` címre vonatkozó tokenek elköltését, vagy a hívónak meg kell egyeznie a `_from` címmel.
2. Az átutalási hívásnak vissza kell fordulnia, ha
   1. a `_to` címe 0.
   2. az `_ids` hossza nem azonos a `_values` hosszával.
   3. az `_ids` paraméterben szereplő token(ek) birtokosának bármelyik egyenlege alacsonyabb, mint a `_values` paraméterben szereplő, a címzettnek küldött megfelelő összeg(ek).
   4. bármilyen más hiba előfordul.

_Megjegyzés_: Minden csoportos funkció, beleértve a hook-ot is, egyéni változatban is létezik. Ez a gázhatékonyság érdekében történik, tekintve, hogy valószínűleg csak egy eszköz átadása lesz a leggyakrabban használt módszer. Ezeket az egyszerűség kedvéért kihagytuk a magyarázatokból, beleértve a biztonságos átutalási szabályokat is. A nevek megegyeznek, csak a „Batch” szót kell eltávolítani.

## További olvasnivaló {#further-reading}

- [ERC-1155: Multitoken szabvány](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: Openzeppelin-dokumentációk](https://docs.openzeppelin.com/contracts/3.x/erc1155)
- [ERC-1155: GitHub mappa](https://github.com/enjin/erc-1155)
- [Alchemy NFT API](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
