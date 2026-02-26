---
title: "Standard tokenów ERC-777"
description: "Dowiedz się więcej o ERC-777, ulepszonym standardzie tokenów zamiennych z hookami, chociaż ERC-20 jest zalecany ze względów bezpieczeństwa."
lang: pl
---

## Ostrzeżenie {#warning}

**ERC-777 jest trudny do prawidłowej implementacji ze względu na [podatność na różne formy ataków](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620). Zaleca się stosowanie [ERC-20](/developers/docs/standards/tokens/erc-20/) zamiast niego.** Ta strona pozostaje jedynie jako historyczne archiwum.

## Wprowadzenie? {#introduction}

ERC-777 to standard tokenów wymiennych, który stanowi ulepszenie istniejącego standardu [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw zapoznać się ze standardem [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Jakie ulepszenia wprowadza ERC-777 w porównaniu do ERC-20? {#-erc-777-vs-erc-20}

ERC-777 wprowadza następujące ulepszenia w porównaniu do ERC-20.

### Hooki {#hooks}

Hooki to funkcje opisane w kodzie inteligentnego kontraktu. Hooki są wywoływane, gdy tokeny są wysyłane lub odbierane za pośrednictwem kontraktu. Pozwala to inteligentnemu kontraktowi reagować na przychodzące lub wychodzące tokeny.

Hooki są rejestrowane i wykrywane przy użyciu standardu [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### Dlaczego hooki są świetne? {#why-are-hooks-great}

1. Hooki pozwalają wysyłać tokeny do kontraktu i powiadamiać kontrakt w ramach jednej transakcji, w przeciwieństwie do [ERC-20](https://eips.ethereum.org/EIPS/eip-20), który do osiągnięcia tego wymaga dwóch wywołań (`approve`/`transferFrom`).
2. Kontrakty, które nie zarejestrowały hooków, są niekompatybilne z ERC-777. Kontrakt wysyłający przerwie transakcję, jeśli kontrakt odbierający nie zarejestrował hooka. Zapobiega to przypadkowym transferom do inteligentnych kontraktów innych niż ERC-777.
3. Hooki mogą odrzucać transakcje.

### Miejsca dziesiętne {#decimals}

Standard ten rozwiązuje również niejasności dotyczące `miejsc dziesiętnych` w ERC-20. Ta przejrzystość poprawia doświadczenia deweloperów.

### Kompatybilność wsteczna z ERC-20 {#backwards-compatibility-with-erc-20}

Z kontraktami ERC-777 można wchodzić w interakcje tak, jakby były to kontrakty ERC-20.

## Dalsza lektura {#further-reading}

[EIP-777: standard tokenów ERC-777](https://eips.ethereum.org/EIPS/eip-777)
