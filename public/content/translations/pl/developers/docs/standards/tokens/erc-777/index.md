---
title: Standard tokena ERC-777
description: "Dowiedz się o ERC-777, ulepszonym standardzie tokenów zamiennych z hookami, chociaż ze względów bezpieczeństwa zalecany jest ERC-20."
lang: pl
---

## Ostrzeżenie {#warning}

**ERC-777 jest trudny do prawidłowego wdrożenia ze względu na jego [podatność na różne formy ataków](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620). Zamiast tego zaleca się korzystanie z [ERC-20](/developers/docs/standards/tokens/erc-20/).** Ta strona pozostaje jako archiwum historyczne.

## Wprowadzenie? {#introduction}

ERC-777 to standard tokena zamiennego ulepszający istniejący standard [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw przeczytać o [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Jakie ulepszenia proponuje ERC-777 w stosunku do ERC-20? {#-erc-777-vs-erc-20}

ERC-777 zapewnia następujące ulepszenia w stosunku do ERC-20.

### Hooki {#hooks}

Hooki to funkcje opisane w kodzie inteligentnego kontraktu. Hooki są wywoływane, gdy tokeny są wysyłane lub odbierane przez kontrakt. Pozwala to inteligentnemu kontraktowi reagować na przychodzące lub wychodzące tokeny.

Hooki są rejestrowane i wykrywane przy użyciu standardu [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### Dlaczego hooki są świetne? {#why-are-hooks-great}

1. Hooki pozwalają na wysyłanie tokenów do kontraktu i powiadamianie go w pojedynczej transakcji, w przeciwieństwie do [ERC-20](https://eips.ethereum.org/EIPS/eip-20), który wymaga podwójnego wywołania (`approve`/`transferFrom`), aby to osiągnąć.
2. Kontrakty, które nie zarejestrowały hooków, są niekompatybilne z ERC-777. Kontrakt wysyłający przerwie transakcję, gdy kontrakt odbierający nie zarejestrował hooka. Zapobiega to przypadkowym transferom do inteligentnych kontraktów innych niż ERC-777.
3. Hooki mogą odrzucać transakcje.

### Miejsca dziesiętne {#decimals}

Standard ten rozwiązuje również zamieszanie wokół `decimals` spowodowane w ERC-20. Ta przejrzystość poprawia doświadczenie deweloperów.

### Kompatybilność wsteczna z ERC-20 {#backwards-compatibility-with-erc-20}

Z kontraktami ERC-777 można wchodzić w interakcje tak, jakby były kontraktami ERC-20.

## Dalsza lektura {#further-reading}

[EIP-777: Standard tokena](https://eips.ethereum.org/EIPS/eip-777)