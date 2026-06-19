---
title: Standardy tokenów
description: Poznaj standardy tokenów Ethereum, w tym ERC-20, ERC-721 i ERC-1155 dla tokenów zamiennych i niezamiennych.
lang: pl
incomplete: true
---

## Wprowadzenie {#introduction}

Wiele standardów programistycznych [Ethereum](/) skupia się na interfejsach tokenów. Standardy te pomagają zapewnić, że inteligentne kontrakty pozostają komponowalne, dzięki czemu, gdy nowy projekt emituje token, pozostaje on kompatybilny z istniejącymi zdecentralizowanymi giełdami i aplikacjami.

Standardy tokenów określają, jak tokeny zachowują się i wchodzą w interakcje w całym ekosystemie Ethereum. Ułatwiają one programistom budowanie bez wyważania otwartych drzwi, zapewniając, że tokeny płynnie współpracują z portfelami, giełdami i platformami zdecentralizowanych finansów (DeFi). Niezależnie od tego, czy chodzi o gry, zarządzanie, czy inne przypadki użycia, standardy te zapewniają spójność i sprawiają, że Ethereum jest bardziej połączone.

## Wymagania wstępne {#prerequisites}

- [Standardy programistyczne Ethereum](/developers/docs/standards/)
- [Inteligentne kontrakty](/developers/docs/smart-contracts/)

## Standardy tokenów {#token-standards}

Oto niektóre z najpopularniejszych standardów tokenów w sieci Ethereum:

- [ERC-20](/developers/docs/standards/tokens/erc-20/) – Standardowy interfejs dla tokenów zamiennych (wymiennych), takich jak tokeny do głosowania, tokeny do stakingu lub waluty wirtualne.

### Standardy NFT {#nft-standards}

- [ERC-721](/developers/docs/standards/tokens/erc-721/) – Standardowy interfejs dla tokenów niezamiennych, takich jak akt własności dzieła sztuki lub piosenki.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) – ERC-1155 pozwala na bardziej wydajne transakcje i grupowanie transakcji, co pozwala zaoszczędzić koszty. Ten standard tokena pozwala na tworzenie zarówno tokenów użytkowych (takich jak $BNB lub $BAT), jak i tokenów niezamiennych (NFT), takich jak CryptoPunks.

Pełna lista propozycji [ERC](https://eips.ethereum.org/erc).

## Dalsza lektura {#further-reading}

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_

## Powiązane samouczki {#related-tutorials}

- [Lista kontrolna integracji tokenów](/developers/tutorials/token-integration-checklist/) _– Lista rzeczy do rozważenia podczas interakcji z tokenami._
- [Zrozumienie inteligentnego kontraktu tokena ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _– Wprowadzenie do wdrażania pierwszego inteligentnego kontraktu w sieci testowej Ethereum._
- [Transfery i zatwierdzanie tokenów ERC20 z inteligentnego kontraktu w Solidity](/developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/) _– Jak używać inteligentnego kontraktu do interakcji z tokenem przy użyciu języka Solidity._
- [Wdrażanie rynku ERC721 [poradnik]](/developers/tutorials/how-to-implement-an-erc721-market/) _– Jak wystawić stokenizowane przedmioty na sprzedaż na zdecentralizowanej tablicy ogłoszeń._