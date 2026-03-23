---
title: Standard tokenu ERC-777
description: "Seznamte se s ERC-777, vylepšeným standardem zaměnitelných tokenů s háčky, ačkoli z bezpečnostních důvodů je doporučeno používat ERC-20."
lang: cs
---

## Varování {#warning}

**ERC-777 je obtížné správně implementovat kvůli jeho [náchylnosti k různým formám útoku](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620). Doporučuje se místo něj použít [ERC-20](/developers/docs/standards/tokens/erc-20/).** Tato stránka zde zůstává jako historický archiv.

## Úvod? {#introduction}

ERC-777 je standard pro zaměnitelné tokeny, který vylepšuje stávající standard [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Předpoklady {#prerequisites}

Pro lepší porozumění této stránce vám doporučujeme si nejprve přečíst o [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Jaká vylepšení navrhuje ERC-777 oproti ERC-20? {#-erc-777-vs-erc-20}

ERC-777 poskytuje následující vylepšení oproti ERC-20.

### Háčky {#hooks}

Háčky jsou funkce popsané v kódu smart kontraktu. Háčky se volají, když jsou tokeny odesílány nebo přijímány prostřednictvím kontraktu. To umožňuje smart kontraktu reagovat na příchozí nebo odchozí tokeny.

Háčky jsou registrovány a objevovány pomocí standardu [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### Proč jsou háčky skvělé? {#why-are-hooks-great}

1. Háčky umožňují odesílat tokeny do kontraktu a oznamovat to kontraktu v jediné transakci, na rozdíl od [ERC-20](https://eips.ethereum.org/EIPS/eip-20), který k dosažení tohoto cíle vyžaduje dvojí volání (`approve`/`transferFrom`).
2. Kontrakty, které nemají registrované háčky, nejsou kompatibilní s ERC-777. Když přijímací kontrakt nemá registrovaný háček, odesílací kontrakt přeruší transakci. Tím se zabrání neúmyslným převodům přrostředků do smart kontraktů, které nejsou ERC-777.
3. Háčky mohou transakce také odmítat.

### Desetinná místa {#decimals}

Standard také řeší zmatek kolem `decimals` způsobený v ERC-20. To vede k příjemnější vývojářské zkušenosti.

### Zpětná kompatibilita s ERC-20 {#backwards-compatibility-with-erc-20}

S ERC-777 kontrakty lze pracovat, jako by to byly ERC-20 kontrakty.

## Další čtení {#further-reading}

[EIP-777: Tokenový standard](https://eips.ethereum.org/EIPS/eip-777)
