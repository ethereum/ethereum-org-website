---
title: Standardul multi-tokenuri ERC-1155
description:
lang: ro
---

## Introducere {#introduction}

O interfață standard pentru contractele care gestionează mai multe tipuri de tokenuri. Un singur contract implementat poate include orice combinație de tokenuri fungibile, tokenuri nefungibile sau cu alte configurații (de exemplu, tokenuri semi-fungibile).

**Ce se înțelege prin „Standard multi-token”?**

Ideea este simplă și urmărește să creeze o interfață cu contractul inteligent care poate reprezenta și controla oricâte tipuri de tokenuri fungibile și nefungibile. Astfel, tokenul ERC-1155 poate îndeplini funcții identice cu un token [ERC-20](/developers/docs/standards/tokens/erc-20/) și [ERC-721](/developers/docs/standards/tokens/erc-721/), chiar cu ambele simultan. Dar mai presus de toate, îmbunătățește funcționalitatea ambelor standarde, făcându-le mai eficiente și corectând erorile evidente de implementare ale standardelor ERC-20 și ERC-721.

Tokenul ERC-1155 este descris complet în [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155).

## Condiții prealabile {#prerequisites}

Pentru o mai bună înțelegere a acestei pagini, vă recomandăm să citiți mai întâi despre [standardele de tokenuri](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) și [ERC-721](/developers/docs/standards/tokens/erc-721/).

## Funcțiile și funcţionalităţile ERC-1155: {#body}

- [Transfer în loturi](#batch_transfers): Transferați mai multe active într-un singur apel.
- [Sold în loturi](#batch_balance): Obțineți soldurile mai multor active într-un singur apel.
- [Aprobare în loturi](#batch_approval): Aprobați toate tokenurile de la o adresă.
- [Hook-uri](#recieve_hook): Primiți hook-ul tokenurilor.
- [Acceptarea NFT-urilor](#nft_support): Dacă este disponibil numai 1, tratați-l ca pe un NFT.
- [Reguli de transfer securizat](#safe_transfer_rule): Are o serie de reguli pentru securizarea transferului.

### Transferuri în loturi {#batch-transfers}

Transferul în loturi funcționează foarte asemănător cu transferurile ERC-20 obișnuite. Să aruncăm o privire asupra funcției ERC-20 obișnuite „transferFrom”:

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

Singura diferență în cazul ERC-1155 este că transmitem atât valorile, cât și id-urile sub formă de matrice. De exemplu, fie `ids=[3, 6,13]` și `values=[100,200,5]`, atunci transferurile rezultate vor fi

1. Transferul a 100 de tokenuri cu id 3 de la `_from` la `_to`.
2. Transferul a 200 de tokenuri cu id 6 de la `_from` la `_to`.
3. Transferul a 5 token-uri cu id 13 de la `_from` la `_to`.

În ERC-1155 avem doar `transferFrom`, nu avem `transfer`. Pentru utilizarea acestuia ca `transfer` obișnuit, trebuie doar să setați adresa „from” la adresa care apelează funcția.

### Soldul în loturi {#batch-balance}

Apelul ERC-20 `balanceOf` respectiv are de asemenea funcția sa pereche cu acceptarea loturilor. Vă reamintim că aceasta este versiunea ERC-20:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

Şi mai simplu, la apelul soldului putem extrage solduri multiple într-un singur apel. Vom trece matricea de proprietari, urmată de matricea de id-uri ale tokenurilor.

De exemplu, fie `_ids=[3, 6, 13]` şi `_owners=[0xbeef..., 0x1337..., 0x1111...]`, atunci valoarea de răspuns va fi

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Aprobarea în loturi {#batch-approval}

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

Aprobările sunt puțin diferite față de ERC-20. În loc să aprobați sume specifice, setați un operator care să aprobe sau să dezaprobe prin `setApprovalForAII`.

Citirea stării curente se poate face prin `isApprovedForAII`. După cum puteți vedea, este totul sau nimic. Nu puteți defini câte tokenuri să aprobați, nici chiar ce clasă de tokenuri.

A fost conceput intenționat în acest mod, pentru simplitate. Puteți doar să le aprobaţi pe toate, de la o singură adresă.

### Hook-uri de primire {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

Având în vedere acceptarea [EIP-165](https://eips.ethereum.org/EIPS/eip-165), ERC-1155 acceptă hook-uri de primire numai pentru contractele inteligente. Funcția de hook trebuie să răspundă printr-o valoare magică predefinită „bytes4”, care este exprimată astfel:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Atunci când contractul destinatar răspunde prin această valoare, se presupune că acesta acceptă transferul și în același timp știe cum să gestioneze tokenurile ERC-1155. Excelent, gata cu tokenurile blocate într-un contract!

### Acceptarea NFT-urilor {#nft-support}

Atunci când este disponibil numai unul, tokenul este în esență un token nefungibil (NFT). Și conform standardului pentru ERC-721, puteți defini un URL pentru metadate. URL-ul poate fi citit și modificat de clienți, după cum puteţi vedea [aici](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### Reguli pentru transferul securizat {#safe-transfer-rule}

Am abordat deja câteva reguli pentru transferul securizat în explicațiile anterioare. Dar să aruncăm o privire asupra celor mai importante reguli:

1. Apelantul trebuie să fie autorizat să cheltuiască tokenurile pentru adresa `_from` sau trebuie să fie egal cu `_from`.
2. Apelul de transfer trebuie returnat dacă
   1. adresa `_to` este 0.
   2. lungimea `ids` nu este aceeași cu lungimea `_values`.
   3. oricare sold(uri) de token(uri) al titularului (titularilor) din `_ids` are (au) o valoare mai mică decât suma respectivă din `_value` trimisă destinatarului.
   4. intervine orice altă eroare.

_Observaţie_: Toate funcțiile în loturi, inclusiv hook-ul, există şi în versiune individuală, fără loturi. Am făcut aceasta pentru eficiența gazului, având în vedere că transferul unui singur activ va fi probabil tot metoda cea mai utilizată. Le-am omis pentru simplitatea explicațiilor, inclusiv regulile pentru transferul securizat. Au nume identice, doar eliminați cuvântul „loturi (batch)”.

## Referințe suplimentare {#further-reading}

- [EIP-1155: Standard multi-token](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: Documentație Openzeppelin](https://docs.openzeppelin.com/contracts/3.x/erc1155)
- [ERC-1155: GitHub Repo](https://github.com/enjin/erc-1155)
- [Alchemy NFT API](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
