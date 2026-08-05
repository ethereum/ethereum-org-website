---
title: "Kontrolní seznam pro integraci tokenů"
description: "Kontrolní seznam věcí, které je třeba zvážit při interakci s tokeny"
author: "Trailofbits"
lang: cs
tags:
  - solidity
  - chytré kontrakty
  - bezpečnost
  - tokeny
skill: intermediate
breadcrumb: "Integrace tokenů"
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Při interakci s libovolnými tokeny postupujte podle tohoto kontrolního seznamu. Ujistěte se, že rozumíte rizikům spojeným s každou položkou, a zdůvodněte případné výjimky z těchto pravidel.

Pro usnadnění lze všechny [nástroje](https://github.com/crytic/slither#tools) Slither spustit přímo na adrese tokenu, například:

[Návod na používání nástroje Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Abyste mohli postupovat podle tohoto kontrolního seznamu, budete pro daný token potřebovat tento výstup z nástroje Slither:

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # vyžaduje konfiguraci a použití Echidny a Manticore
```

## Obecné úvahy {#general-considerations}

- **Kontrakt prošel bezpečnostním auditem.** Vyhněte se interakci s kontrakty, které nemají bezpečnostní audit. Zkontrolujte délku hodnocení (tzv. „úroveň úsilí“), pověst bezpečnostní firmy a počet a závažnost nálezů.
- **Kontaktovali jste vývojáře.** Možná budete muset jejich tým upozornit na incident. Vhodné kontakty hledejte na [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Mají bezpečnostní e-mailovou konferenci pro kritická oznámení.** Jejich tým by měl uživatele (jako jste vy!) informovat, když jsou zjištěny kritické problémy nebo když dojde k aktualizacím.

## Shoda s ERC {#erc-conformity}

Slither obsahuje nástroj [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), který kontroluje shodu tokenu s mnoha souvisejícími standardy ERC. Použijte slither-check-erc k ověření, že:

- **Funkce transfer a transferFrom vracejí boolean.** Některé tokeny u těchto funkcí nevracejí boolean. V důsledku toho může jejich volání v kontraktu selhat.
- **Funkce name, decimals a symbol jsou přítomny, pokud se používají.** Tyto funkce jsou ve standardu ERC-20 volitelné a nemusí být přítomny.
- **Funkce decimals vrací uint8.** Některé tokeny nesprávně vracejí uint256. Pokud je tomu tak, ujistěte se, že vrácená hodnota je menší než 255.
- **Token zmírňuje známý [souběh (race condition) ERC-20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729).** Standard ERC-20 má známý problém se souběhem, který musí být ošetřen, aby se zabránilo útočníkům v krádeži tokenů.
- **Token není tokenem ERC-777 a nemá žádné volání externí funkce v transfer a transferFrom.** Externí volání ve funkcích pro převod mohou vést k útokům typu reentrancy.

Slither obsahuje nástroj [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), který generuje jednotkové testy a bezpečnostní vlastnosti, jež mohou odhalit mnoho běžných chyb ERC. Použijte slither-prop k ověření, že:

- **Kontrakt projde všemi jednotkovými testy a bezpečnostními vlastnostmi ze slither-prop.** Spusťte vygenerované jednotkové testy a poté zkontrolujte vlastnosti pomocí nástrojů [Echidna](https://github.com/crytic/echidna) a [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

Nakonec existují určité charakteristiky, které je obtížné identifikovat automaticky. Tyto podmínky zkontrolujte ručně:

- **Funkce transfer a transferFrom by neměly účtovat poplatek.** Deflační tokeny mohou vést k neočekávanému chování.
- **Je zohledněn potenciální úrok získaný z tokenu.** Některé tokeny rozdělují úrok držitelům tokenů. Tento úrok by mohl uvíznout v kontraktu, pokud by nebyl zohledněn.

## Složení kontraktu {#contract-composition}

- **Kontrakt se vyhýbá zbytečné složitosti.** Token by měl být jednoduchý kontrakt; token se složitým kódem vyžaduje vyšší standard kontroly. K identifikaci složitého kódu použijte [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) nástroje Slither.
- **Kontrakt používá SafeMath.** Kontrakty, které nepoužívají SafeMath, vyžadují vyšší standard kontroly. Ručně zkontrolujte kontrakt na použití SafeMath.
- **Kontrakt má pouze několik funkcí nesouvisejících s tokenem.** Funkce nesouvisející s tokenem zvyšují pravděpodobnost problému v kontraktu. K celkovému přezkoumání kódu použitého v kontraktu použijte [contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) nástroje Slither.
- **Token má pouze jednu adresu.** Tokeny s více vstupními body pro aktualizace zůstatků mohou narušit interní účetnictví založené na adrese (např. `balances[token_address][msg.sender]` nemusí odrážet skutečný zůstatek).

## Oprávnění vlastníka {#owner-privileges}

- **Token nelze aktualizovat (není upgradeable).** Aktualizovatelné kontrakty mohou v průběhu času měnit svá pravidla. Pomocí nástroje [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) od Slitheru zjistěte, zda je kontrakt aktualizovatelný.
- **Vlastník má omezené možnosti ražení.** Zlomyslní nebo kompromitovaní vlastníci mohou zneužít možnosti ražení. K přezkoumání možností ražení použijte [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) nástroje Slither a zvažte ruční kontrolu kódu.
- **Token nelze pozastavit (není pausable).** Zlomyslní nebo kompromitovaní vlastníci mohou uvěznit kontrakty spoléhající na pozastavitelné tokeny. Pozastavitelný kód identifikujte ručně.
- **Vlastník nemůže kontrakt zařadit na černou listinu (blacklist).** Zlomyslní nebo kompromitovaní vlastníci mohou uvěznit kontrakty spoléhající na tokeny s černou listinou. Funkce černé listiny identifikujte ručně.
- **Tým stojící za tokenem je známý a může být pohnán k odpovědnosti za zneužití.** Kontrakty s anonymními vývojářskými týmy nebo ty, které sídlí v právních útočištích, by měly vyžadovat vyšší standard kontroly.

## Vzácnost tokenu {#token-scarcity}

Kontrola problémů se vzácností tokenu vyžaduje ruční přezkoumání. Zkontrolujte tyto podmínky:

- **Žádný uživatel nevlastní většinu nabídky.** Pokud několik uživatelů vlastní většinu tokenů, mohou ovlivňovat operace na základě rozdělení tokenu.
- **Celková nabídka je dostatečná.** S tokeny s nízkou celkovou nabídkou lze snadno manipulovat.
- **Tokeny se nacházejí na více než několika burzách.** Pokud jsou všechny tokeny na jedné burze, kompromitace burzy může kompromitovat kontrakt spoléhající na daný token.
- **Uživatelé chápou související rizika velkých fondů nebo bleskových půjček (flash loans).** Kontrakty spoléhající na zůstatek tokenů musí pečlivě brát v úvahu útočníky s velkými prostředky nebo útoky prostřednictvím bleskových půjček.
- **Token neumožňuje bleskové ražení (flash minting)**. Bleskové ražení může vést k podstatným výkyvům v zůstatku a celkové nabídce, což vyžaduje přísné a komplexní kontroly přetečení při operacích s tokenem.