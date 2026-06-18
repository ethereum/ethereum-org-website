---
title: Standard wielu tokenów ERC-1155
description: Dowiedz się więcej o ERC-1155, standardzie wielu tokenów, który łączy tokeny zamienne i niezamienne w jednym kontrakcie.
lang: pl
---

## Wprowadzenie {#introduction}

Standardowy interfejs dla kontraktów zarządzających wieloma typami tokenów. Pojedynczy wdrożony kontrakt może zawierać dowolną kombinację tokenów zamiennych, tokenów niezamiennych lub innych konfiguracji (np. tokenów półzamiennych).

**Co oznacza standard wielu tokenów?**

Idea jest prosta i ma na celu stworzenie interfejsu inteligentnego kontraktu, który może reprezentować i kontrolować dowolną liczbę typów tokenów zamiennych i niezamiennych. W ten sposób token ERC-1155 może pełnić te same funkcje co token [ERC-20](/developers/docs/standards/tokens/erc-20/) i [ERC-721](/developers/docs/standards/tokens/erc-721/), a nawet oba jednocześnie. Poprawia to funkcjonalność standardów ERC-20 i ERC-721, czyniąc je bardziej wydajnymi i korygując oczywiste błędy implementacyjne.

Token ERC-1155 jest w pełni opisany w [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155).

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw przeczytać o [standardach tokenów](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) i [ERC-721](/developers/docs/standards/tokens/erc-721/).

## Funkcje i cechy ERC-1155: {#body}

- [Transfer wsadowy](#batch-transfers): Transfer wielu aktywów w jednym wywołaniu.
- [Saldo wsadowe](#batch-balance): Pobieranie sald wielu aktywów w jednym wywołaniu.
- [Zatwierdzenie wsadowe](#batch-approval): Zatwierdzenie wszystkich tokenów dla danego adresu.
- [Hooki](#receive-hook): Hook odbioru tokenów.
- [Obsługa NFT](#nft-support): Jeśli podaż wynosi tylko 1, traktuj jako NFT.
- [Zasady bezpiecznego transferu](#safe-transfer-rule): Zestaw reguł dla bezpiecznego transferu.

### Transfery wsadowe {#batch-transfers}

Transfer wsadowy działa bardzo podobnie do zwykłych transferów ERC-20. Spójrzmy na zwykłą funkcję `transferFrom` w ERC-20:

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

Jedyną różnicą w ERC-1155 jest to, że przekazujemy wartości jako tablicę, a także przekazujemy tablicę identyfikatorów (id). Na przykład dla `ids=[3, 6, 13]` i `values=[100, 200, 5]`, wynikowe transfery będą następujące:

1. Transfer 100 tokenów o id 3 z `_from` do `_to`.
2. Transfer 200 tokenów o id 6 z `_from` do `_to`.
3. Transfer 5 tokenów o id 13 z `_from` do `_to`.

W ERC-1155 mamy tylko `transferFrom`, nie ma `transfer`. Aby użyć jej jak zwykłego `transfer`, wystarczy ustawić adres nadawcy (from) na adres wywołujący funkcję.

### Saldo wsadowe {#batch-balance}

Odpowiednie wywołanie `balanceOf` z ERC-20 również ma swoją funkcję partnerską z obsługą wsadową. Dla przypomnienia, oto wersja ERC-20:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

Jeszcze prościej jest w przypadku wywołania salda, gdzie możemy pobrać wiele sald w jednym wywołaniu. Przekazujemy tablicę właścicieli, a następnie tablicę identyfikatorów tokenów.

Na przykład dla `_ids=[3, 6, 13]` i `_owners=[0xbeef..., 0x1337..., 0x1111...]`, zwracana wartość będzie następująca:

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Zatwierdzenie wsadowe {#batch-approval}

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

Zatwierdzenia różnią się nieco od tych w ERC-20. Zamiast zatwierdzać określone kwoty, ustawiasz operatora jako zatwierdzonego lub niezatwierdzonego za pomocą `setApprovalForAll`.

Odczytanie obecnego statusu można wykonać za pomocą `isApprovedForAll`. Jak widać, jest to operacja typu „wszystko albo nic”. Nie można zdefiniować, ile tokenów zatwierdzić, ani nawet jakiej klasy tokenów to dotyczy.

Zostało to celowo zaprojektowane z myślą o prostocie. Możesz tylko zatwierdzić wszystko dla jednego adresu.

### Hook odbioru {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

Biorąc pod uwagę obsługę [EIP-165](https://eips.ethereum.org/EIPS/eip-165), ERC-1155 obsługuje hooki odbioru tylko dla inteligentnych kontraktów. Funkcja hooka musi zwrócić magiczną, predefiniowaną wartość bytes4, która jest podana jako:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Gdy kontrakt odbierający zwraca tę wartość, zakłada się, że kontrakt akceptuje transfer i wie, jak obsługiwać tokeny ERC-1155. Świetnie, koniec z zablokowanymi tokenami w kontrakcie!

### Obsługa NFT {#nft-support}

Gdy podaż wynosi tylko jeden, token jest w zasadzie tokenem niezamiennym (NFT). I jak to jest w standardzie ERC-721, można zdefiniować adres URL dla metadanych. Adres URL może być odczytywany i modyfikowany przez klientów, zobacz [tutaj](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### Zasady bezpiecznego transferu {#safe-transfer-rule}

W poprzednich wyjaśnieniach poruszyliśmy już kilka zasad bezpiecznego transferu. Spójrzmy jednak na najważniejsze z nich:

1. Wywołujący musi być zatwierdzony do wydawania tokenów dla adresu `_from` lub wywołujący musi być równy `_from`.
2. Wywołanie transferu musi zostać wycofane, jeśli:
   1. Adres `_to` to 0.
   2. Długość `_ids` nie jest taka sama jak długość `_values`.
   3. Którekolwiek z sald posiadaczy dla tokenów w `_ids` jest niższe niż odpowiednie kwoty w `_values` wysyłane do odbiorcy.
   4. Wystąpi jakikolwiek inny błąd.

_Uwaga_: Wszystkie funkcje wsadowe, w tym hook, istnieją również w wersjach bez przetwarzania wsadowego. Zrobiono to ze względu na oszczędność gazu, biorąc pod uwagę, że transfer tylko jednego aktywa prawdopodobnie nadal będzie najczęściej używanym sposobem. Pominęliśmy je dla uproszczenia w wyjaśnieniach, w tym w zasadach bezpiecznego transferu. Nazwy są identyczne, wystarczy usunąć słowo „Batch”.

## Dalsza lektura {#further-reading}

- [EIP-1155: Standard wielu tokenów](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: Dokumentacja OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155: Repozytorium GitHub](https://github.com/enjin/erc-1155)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)