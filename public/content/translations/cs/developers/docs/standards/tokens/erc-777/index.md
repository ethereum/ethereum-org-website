---
title: Standard tokenu ERC-777
description: Přečtěte si o ERC-777, vylepšeném standardu pro zaměnitelné tokeny s hooky, ačkoli z bezpečnostních důvodů se doporučuje ERC-20.
lang: cs
---

## Varování {#warning}

**ERC-777 je obtížné správně implementovat kvůli jeho [náchylnosti k různým formám útoků](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620). Místo toho se doporučuje používat [ERC-20](/developers/docs/standards/tokens/erc-20/).** Tato stránka zůstává jako historický archiv.

## Úvod? {#introduction}

ERC-777 je standard pro zaměnitelný token, který vylepšuje stávající standard [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Předpoklady {#prerequisites}

Pro lepší pochopení této stránky doporučujeme nejprve si přečíst o [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Jaká vylepšení přináší ERC-777 oproti ERC-20? {#-erc-777-vs-erc-20}

ERC-777 poskytuje oproti ERC-20 následující vylepšení.

### Hooky {#hooks}

Hooky jsou funkce popsané v kódu chytrého kontraktu. Hooky se volají, když jsou tokeny odeslány nebo přijaty prostřednictvím kontraktu. To umožňuje chytrému kontraktu reagovat na příchozí nebo odchozí tokeny.

Hooky jsou registrovány a objevovány pomocí standardu [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### Proč jsou hooky skvělé? {#why-are-hooks-great}

1. Hooky umožňují odeslat tokeny do kontraktu a upozornit kontrakt v jediné transakci, na rozdíl od [ERC-20](https://eips.ethereum.org/EIPS/eip-20), který k dosažení tohoto cíle vyžaduje dvojité volání (`approve`/`transferFrom`).
2. Kontrakty, které nemají zaregistrované hooky, jsou s ERC-777 nekompatibilní. Odesílající kontrakt zruší transakci, pokud přijímající kontrakt nemá zaregistrovaný hook. Tím se zabrání náhodným převodům do chytrých kontraktů, které nepodporují ERC-777.
3. Hooky mohou odmítnout transakce.

### Desetinná místa {#decimals}

Standard také řeší zmatek ohledně `decimals`, který vznikal u ERC-20. Tato srozumitelnost zlepšuje vývojářskou zkušenost.

### Zpětná kompatibilita s ERC-20 {#backwards-compatibility-with-erc-20}

S kontrakty ERC-777 lze interagovat, jako by to byly kontrakty ERC-20.

## Další čtení {#further-reading}

[EIP-777: Standard tokenu](https://eips.ethereum.org/EIPS/eip-777)