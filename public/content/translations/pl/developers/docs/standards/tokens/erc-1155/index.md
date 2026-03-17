---
title: "Standard multi-tokenów ERC-1155"
description: "Dowiedz się więcej o ERC-1155, standardzie wielu tokenów, który łączy tokeny zamienne i niezamienne w jednym kontrakcie."
lang: pl
---

## Wprowadzenie {#introduction}

Standardowy interfejs dla kontraktów, które zarządzają kilkoma rodzajami tokenów. Pojedynczy wdrożony kontrakt może zawierać dowolną kombinację tokenów zamiennych, tokenów niezamiennych lub innych konfiguracji (np. tokenów półzamiennych).

**Co oznacza standard multi-tokenów?**

Zamysł jest prosty i ma na celu stworzenie interfejsu inteligentnego kontraktu, który może reprezentować i kontrolować dowolną liczbę wymienialnych i niewymienialnych rodzajów tokenów. W ten sposób token ERC-1155 może wykonywać te same funkcje co tokeny [ERC-20](/developers/docs/standards/tokens/erc-20/) i [ERC-721](/developers/docs/standards/tokens/erc-721/), a nawet oba jednocześnie. Poprawia on funkcjonalność obu standardów, zarówno ERC-20, jak i ERC-721, czyniąc go bardziej wydajnym i poprawiając oczywiste błędy w implementacji.

Token ERC-1155 jest w pełni opisany w [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155).

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw przeczytać o [standardach tokenów](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) i [ERC-721](/developers/docs/standards/tokens/erc-721/).

## Funkcje i możliwości ERC-1155: {#body}

- [Transfer zbiorczy](#batch_transfers): transferuj wiele aktywów w jednym wywołaniu.
- [Saldo zbiorcze](#batch_balance): pobieraj salda wielu aktywów w jednym wywołaniu.
- [Zatwierdzenie zbiorcze](#batch_approval): zatwierdzaj wszystkie tokeny dla adresu.
- [Hooki](#receive_hook): hook do odbierania tokenów.
- [Obsługa NFT](#nft_support): jeśli podaż wynosi tylko 1, traktuj go jako NFT.
- [Zasady bezpiecznego transferu](#safe_transfer_rule): zestaw zasad bezpiecznego transferu.

### Transfery zbiorcze {#batch-transfers}

Zbiorczy transfer działa bardzo podobnie do zwykłych transferów ERC-20. Przyjrzyjmy się zwykłej funkcji ERC-20 `transferFrom`:

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

Jedyną różnicą w ERC-1155 jest to, że podajemy wartości jako tablicę, a także podajemy tablicę identyfikatorów. Na przykład, dla `ids=[3, 6, 13]` i `values=[100, 200, 5]` wynikowe transfery będą następujące:

1. Transfer 100 tokenów o id 3 z `_from` do `_to`.
2. Transfer 200 tokenów o id 6 z `_from` do `_to`.
3. Transfer 5 tokenów o id 13 z `_from` do `_to`.

W ERC-1155 mamy tylko `transferFrom`, nie ma `transfer`. Aby użyć jej jak zwykłego `transfer`, wystarczy ustawić adres nadawcy na adres wywołujący funkcję.

### Saldo zbiorcze {#batch-balance}

Odpowiednie wywołanie ERC-20 `balanceOf` ma również swój odpowiednik z obsługą trybu zbiorczego. Dla przypomnienia tak wygląda wersja ERC-20:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

W jeszcze prostszy sposób możemy uzyskać wiele sald za pomocą jednego wywołania. Podajemy po prostu tablicę właścicieli, a następnie tablicę identyfikatorów tokenów.

Na przykład dla `_ids=[3, 6, 13]` i `_owners=[0xbeef..., 0x1337..., 0x1111...]` zwracana wartość będzie następująca:

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Zatwierdzenie zbiorcze {#batch-approval}

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

Zatwierdzenia różnią się trochę od tych z ERC-20. Zamiast zatwierdzać określone kwoty, ustawiasz operatora jako zatwierdzonego lub niezatwierdzonego za pomocą `setApprovalForAll`.

Bieżący status można odczytać za pomocą funkcji `isApprovedForAll`. Jak widzisz, jest to operacja wszystko albo nic. Nie można zdefiniować, ile tokenów zatwierdzić, ani nawet klasy tokena.

Zostało to tak celowo zaprojektowane z myślą o prostocie. Możesz zatwierdzać wszystko tylko dla jednego adresu.

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

Biorąc pod uwagę wsparcie dla [EIP-165](https://eips.ethereum.org/EIPS/eip-165), ERC-1155 obsługuje hooki odbioru tylko dla inteligentnych kontraktów. Funkcja hooka musi zwracać magiczną predefiniowaną wartość bytes4, która jest podana jako:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Kiedy kontrakt odbierający zwraca tę wartość, zakłada się, że kontrakt akceptuje transfer i wie jak obsługiwać tokeny ERC-1155. Świetnie, koniec z tokenami zablokowanymi w kontrakcie!

### Obsługa NFT {#nft-support}

Gdy podaż wynosi tylko 1, to token jest tak naprawdę tokenem niewymienialnym (NFT). I jak to w standardzie ERC-7219, możesz określić URL metadanych. Adres URL może być odczytywany i modyfikowany przez klientów, zobacz [tutaj](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### Zasada bezpiecznego transferu {#safe-transfer-rule}

W poprzednich wyjaśnieniach poruszyliśmy już kilka zasad bezpiecznego transferu. Przyjrzyjmy się jednak jednej z najważniejszych zasad:

1. Wywołujący musi być zatwierdzony do wydania tokenów dla adresu `_from` lub musi być równy `_from`.
2. Wywołanie transferu musi zostać cofnięte, jeśli:
   1. adres `_to` ma wartość 0.
   2. długość `_ids` nie jest taka sama jak długość `_values`.
   3. którekolwiek z sald posiadacza dla tokenów w `_ids` jest niższe niż odpowiednia kwota w `_values` wysłana do odbiorcy.
   4. wystąpi jakikolwiek inny błąd.

_Uwaga_: wszystkie funkcje zbiorcze, w tym hooki, mają także swoje wersje niezbiorcze. Zostało to zrobione z myślą o wydajności gazowej, biorąc pod uwagę, że przesyłanie tylko jednego aktywa nadal będzie najprawdopodobniej najczęściej używanym sposobem. Pominęliśmy je dla uproszczenia wyjaśnień, w tym zasady bezpiecznego transferu. Nazwy są identyczne, wystarczy usunąć słowo „Batch”.

## Dalsza lektura {#further-reading}

- [EIP-1155: Standard wielu tokenów](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: Dokumentacja OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155: Repozytorium GitHub](https://github.com/enjin/erc-1155)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)
