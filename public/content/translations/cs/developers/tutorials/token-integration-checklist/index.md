---
title: Kontrolní seznam pro integraci tokenů
description: Kontrolní seznam věcí, které je třeba zvážit při interakci s tokeny
author: "Trailofbits"
lang: cs
tags:
  [
    "solidity",
    "smart kontrakt účty",
    "bezpečnost",
    "tokeny"
  ]
skill: intermediate
published: 2020-08-13
source: Tvorba bezpečných kontraktů
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Při interakci s libovolnými tokeny postupujte podle tohoto kontrolního seznamu. Ujistěte se, že rozumíte rizikům spojeným s každou položkou, a odůvodněte jakékoli výjimky z těchto pravidel.

Pro usnadnění lze všechny nástroje Slither [utilities](https://github.com/crytic/slither#tools) spustit přímo na adrese tokenu, například:

[Návod k použití Slitheru](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Abyste mohli postupovat podle tohoto kontrolního seznamu, budete chtít mít pro daný token tento výstup ze Slitheru:

```bash
- slither-check-erc [cíl] [názevSmlouvy] [volitelné: --erc ČÍSLO_ERC]
- slither [cíl] --print human-summary
- slither [cíl] --print contract-summary
- slither-prop . --contract NázevSmlouvy # vyžaduje konfiguraci a použití nástrojů Echidna a Manticore
```

## Obecná doporučení {#general-considerations}

- **Smlouva prošla bezpečnostním auditem.** Vyhněte se interakci se smlouvami, které bezpečnostní audit nemají. Zkontrolujte délku hodnocení (tzv. „level of effort“), reputaci bezpečnostní firmy a počet i závažnost zjištění.
- **Kontaktovali jste vývojáře.** Možná budete muset jejich tým upozornit na nějaký incident. Příslušné kontakty hledejte na [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Mají bezpečnostní mailing list pro kritická oznámení.** Jejich tým by měl informovat uživatele (jako jste vy!) když se objeví kritické problémy nebo když dojde k aktualizacím.

## Shoda s ERC {#erc-conformity}

Slither obsahuje nástroj, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), který kontroluje shodu tokenu s mnoha souvisejícími standardy ERC. Pomocí slither-check-erc zkontrolujte, že:

- **Funkce transfer a transferFrom vracejí booleovskou hodnotu.** Některé tokeny u těchto funkcí booleovskou hodnotu nevracejí. V důsledku toho mohou jejich volání ve smlouvě selhat.
- **Funkce name, decimals a symbol jsou přítomny, pokud se používají.** Tyto funkce jsou ve standardu ERC20 volitelné a nemusí být k dispozici.
- **Funkce Decimals vrací uint8.** Několik tokenů nesprávně vrací uint256. Pokud tomu tak je, ujistěte se, že vrácená hodnota je nižší než 255.
- **Token zmírňuje známý [souběh (race condition) ERC20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729).** Standard ERC20 má známý souběh (race condition), který musí být zmírněn, aby se zabránilo útočníkům v krádeži tokenů.
- **Token není tokenem ERC777 a nemá žádné volání externí funkce v transfer a transferFrom.** Externí volání ve funkcích převodu mohou vést k opětovnému vstupu (reentrancy).

Slither obsahuje nástroj [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), který generuje jednotkové testy a bezpečnostní vlastnosti, jež mohou odhalit mnoho běžných chyb ERC. Pomocí slither-prop zkontrolujte, že:

- **Smlouva projde všemi jednotkovými testy a bezpečnostními vlastnostmi z nástroje slither-prop.** Spusťte vygenerované jednotkové testy, poté zkontrolujte vlastnosti pomocí [Echidny](https://github.com/crytic/echidna) a [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

Nakonec existují určité vlastnosti, které je obtížné identifikovat automaticky. Ručně zkontrolujte, zda platí následující podmínky:

- **Funkce transfer a transferFrom by si neměly účtovat poplatek.** Deflační tokeny mohou vést k neočekávanému chování.
- **Potenciální úrok získaný z tokenu je zohledněn.** Některé tokeny rozdělují úrok držitelům tokenů. Tento úrok může zůstat ve smlouvě „uvězněn“, pokud se s ním nepočítá.

## Struktura kontraktu {#contract-composition}

- **Kontrakt se vyhýbá zbytečné složitosti.** Token by měl být jednoduchý kontrakt; token se složitým kódem vyžaduje vyšší standard revize. Použijte nástroj [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) od Slitheru k identifikaci složitého kódu.
- **Kontrakt používá SafeMath.** Kontrakty, které nepoužívají SafeMath, vyžadují vyšší standard revize. Zkontrolujte ručně, zda kontrakt používá SafeMath.
- **Kontrakt má pouze několik funkcí nesouvisejících s tokenem.** Funkce nesouvisející s tokenem zvyšují pravděpodobnost výskytu chyby v kontraktu. Pomocí [contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) od Slitheru si udělejte obecný přehled o kódu použitém v kontraktu.
- **Token má pouze jednu adresu.** Tokeny s více vstupními body pro aktualizaci zůstatku mohou narušit interní účetnictví založené na adrese (např. `balances[token_address][msg.sender]` nemusí odrážet skutečný zůstatek).

## Oprávnění vlastníka {#owner-privileges}

- **Token nelze upgradovat.** Upgradovatelné kontrakty mohou v průběhu času měnit svá pravidla. Pomocí nástroje [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) od Slitheru zjistěte, zda je kontrakt upgradovatelný.
- **Vlastník má omezené schopnosti ražby.** Zlomyslní nebo kompromitovaní vlastníci mohou schopnosti ražby zneužít. Pro kontrolu schopnosti ražby použijte [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) od Slitheru a zvažte ruční kontrolu kódu.
- **Token nelze pozastavit.** Zlomyslní nebo kompromitovaní vlastníci mohou „uvěznit“ kontrakty, které se spoléhají na pozastavitelné tokeny. Ručně identifikujte kód umožňující pozastavení.
- **Vlastník nemůže dát kontrakt na černou listinu.** Zlomyslní nebo kompromitovaní vlastníci mohou „uvěznit“ kontrakty, které se spoléhají na tokeny s černou listinou. Funkce černé listiny identifikujte ručně.
- **Tým, který za tokenem stojí, je známý a může být pohnán k odpovědnosti za zneužití.** Kontrakty s anonymními vývojářskými týmy nebo sídlící v právních útočištích by měly vyžadovat vyšší standard revize.

## Vzácnost tokenu {#token-scarcity}

Kontrola problémů se vzácností tokenů vyžaduje ruční revizi. Zkontrolujte následující podmínky:

- **Žádný uživatel nevlastní většinu zásoby.** Pokud několik uživatelů vlastní většinu tokenů, mohou ovlivnit operace založené na rozdělení tokenů.
- **Celková zásoba je dostatečná.** Tokeny s nízkou celkovou zásobou lze snadno zmanipulovat.
- **Tokeny se nacházejí na více než jen několika burzách.** Pokud jsou všechny tokeny na jedné burze, její kompromitace může ohrozit kontrakt, který na daný token spoléhá.
- **Uživatelé rozumí souvisejícím rizikům velkých fondů nebo bleskových půjček.** Kontrakty spoléhající na zůstatek tokenů musí pečlivě zvážit útočníky s velkými finančními prostředky nebo útoky prostřednictvím bleskových půjček.
- **Token neumožňuje bleskovou ražbu**. Blesková ražba může vést k podstatným výkyvům v zůstatku a celkové zásobě, což vyžaduje přísné a komplexní kontroly přetečení (overflow) v rámci fungování tokenu.
