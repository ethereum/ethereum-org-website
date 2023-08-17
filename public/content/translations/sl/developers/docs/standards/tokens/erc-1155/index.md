---
title: Standard za multižetone ERC-1155
description:
lang: sl
---

## Uvod {#introduction}

Standardni vmesnik za pogodbe, ki upravljajo več tipov žetonov. Samostojna uveljavljena pogodba lahko vključuje katerokoli kombinacijo zamenljivih žetonov, nezamenljivih žetonov ali drugih konfiguracij (recimo delno zamenljivih žetonov).

**Kaj je mišljeno s standardom za multižetone?**

Ideja je preprosta in želi ustvariti vmesnik za pametne pogodbe, ki lahko predstavlja in upravlja katerokoli število zamenljivih in nezamenljivih tipov žetonov. Na ta način lahko žeton ERC-1155 izvaja enake funkcije kot žetona [ERC-20](/developers/docs/standards/tokens/erc-20/) in [ERC-721](/developers/docs/standards/tokens/erc-721/) ter celo funkcije obeh skupaj. Najboljše od vsega pa je izboljšana funkcionalnost obeh standardov, kar izboljša učinkovitost in popravlja očitne napake pri implementaciji standardov ERC-20 in ERC-721.

Žeton ERC-1155 je v celoti opisan v [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155).

## Predpogoji {#prerequisites}

Za boljše razumevanje vam priporočamo, da si najprej preberete o [standardih za žetone](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) in [ERC-721](/developers/docs/standards/tokens/erc-721/).

## Funkcije in značilnosti ERC-1155: {#body}

- [Skupinski prenos](#batch_transfers): prenos več sredstev v enem klicu.
- [Skupinsko stanje](#batch_balance): pridobite stanje več sredstev z enim klicem.
- [Skupinska odobritev](#batch_approval): odobrite vse žetone na določenem naslovu.
- [Kavlji](#recieve_hook): prejmite kavelj žetonov.
- [Podpora NFT](#nft_support): če je ponudba le 1, to smatrajte kot NFT.
- [Pravila varnih prenosov](#safe_transfer_rule): set pravil za varen prenos.

### Skupinski prenosi {#batch-transfers}

Skupinski prenos deluje zelo podobno kot običajni prenos ERC-20. Oglejmo si običajno funkcijo ERC-20 transferFrom:

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

Edina razlika pri ERC-1155 je, da posredujemo vrednosti kot niz in prav tako posredujemo nize ID-jev. Na primer, pri danih `ids=[3, 6, 13]` in `values=[100, 200, 5]` bodo posledični prenosi:

1. Prenos 100 žetonov z id 3 s `_from` na `_to`.
2. Prenos 200 žetonov z id 6 s `_from` na `_to`.
3. Prenos 5 žetonov z id 13 s `_from` na `_to`.

Pri ERC-1155 imamo le `transferFrom` in ne `transfer`. Da ga uporabite kot navaden `transfer`, le naslov od nastavite na naslov, ki kliče funkcijo.

### Skupinsko stanje {#batch-balance}

Ustrezni klic ERC-20 `balanceOf` ima prav tako svojo partnersko funkcijo s paketno podporo. Za opomnik, to je različica ERC-20:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

Še preprosteje lahko za klic stanja pridobimo večje število stanj z enim samim klicem. Podamo niz lastnikov, ki mu sledi niz z ID-ji žetonov.

Za konkreten primer `_ids=[3, 6, 13]` in `_owners=[0xbeef..., 0x1337..., 0x1111...]` bo vrnjena vrednost

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Skupinska odobritev {#batch-approval}

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

Odobritve so malenkost drugačne kot pri ERC-20. Namesto odobritve specifičnih količin nastavite operaterja na odobreno ali neodobreno prek `setApprovalForAll`.

Branje trenutnega stanja se lahko izvede prek `isApprovedForAll`. Kot lahko vidite, gre za vse ali nič. Ni mogoče določiti, koliko žetonov boste odobrili, niti katere kategorije žetonov boste odobrili.

To je namenoma zasnovano zaradi enostavnosti. Odobrite lahko le vse za en naslov.

### Prejem kavlja {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

Glede na podporo [EIP-165](https://eips.ethereum.org/EIPS/eip-165) podpore ERC-1155 prejmejo kavlje le za pametne pogodbe. Funkcija kavlja mora vrniti magično prednastavljeno vrednost bytes4, ki je podana kot:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Ko prejemna pogodba vrne to vrednost, se predpostavlja, da pogodba sprejema prenos in ve, kako ravnati z žetoni ERC-1155. Super, nič več obtičanih žetonov v pogodbi!

### Podpora NFT {#nft-support}

Ko je zaloga le 1, je žeton v bistvu nezamenljiv žeton (NFT). In kot je standardno za ERC-721, lahko določite URL metapodatkov. URL lahko preberejo in spremenijo stranke, več preberite [tukaj](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### Pravila za varen prenos {#safe-transfer-rule}

V prejšnjih razlagah smo se že dotaknili nekaterih pravil za varen prenos. Toda oglejmo si najpomembnejša pravila:

1. Klicatelj mora biti odobren za porabo žetonov z naslova `_from` ali pa mora biti klicatelj enak `_from`.
2. Klic za prenos mora biti vrnjen v prejšnje stanje, če
   1. je naslov `_to` 0;
   2. dolžina `_ids` ni enaka dolžini `_values`;
   3. je katerokoli od stanj nosilca/-ev za žeton/-e v `_ids` nižje od ustrezne količine v `_values`, ki je poslan prejemniku;
   4. se pojavijo kakršnekoli druge napake.

_Opomba_: Vse paketne funkcije vključno s kavlji prav tako obstajajo kot verzije brez paketov. To je narejeno za učinkovitost goriva, saj bo prenos enega sredstva še vedno po vsej verjetnosti najbolj pogosto uporabljen način. V razlagah smo jih izpustili zaradi preprostosti, vključno s pravili za varen prenos. Imena so identična, le odstranite 'paket'.

## Nadaljnje branje {#further-reading}

- [EIP-1155: standard za multižetone](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: dokumenti Openzeppelin](https://docs.openzeppelin.com/contracts/3.x/erc1155)
- [ERC-1155: repozitorij GitHub](https://github.com/enjin/erc-1155)
- [Alchemy NFT API](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
