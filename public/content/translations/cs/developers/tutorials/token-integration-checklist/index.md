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

Při interakci s libovolnými tokeny se řiďte tímto kontrolním seznamem. Ujistěte se, že rozumíte rizikům spojeným s každou položkou, a zdůvodněte případné výjimky z těchto pravidel.

Pro usnadnění lze všechny [nástroje](https://github.com/crytic/slither#tools) Slitheru spustit přímo na adrese tokenu, například:

[Výukový program používání Slitheru](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

Získání ověřeného zdrojového kódu z Etherscan vyžaduje [klíč API Etherscan](https://docs.etherscan.io/set-up-your-api-key) (funguje i bezplatný klíč). Předejte jej pomocí `--etherscan-apikey`, nebo nastavte proměnnou prostředí `ETHERSCAN_API_KEY`, kterou Slither také čte:

```sh
export ETHERSCAN_API_KEY=<your-etherscan-api-key>
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken --erc erc20 --etherscan-apikey $ETHERSCAN_API_KEY
slither-check-erc 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d KittyCore --erc erc721 --etherscan-apikey $ETHERSCAN_API_KEY
```

Bez klíče příkaz selže s chybou `Invalid etherscan API Key`.

Abyste mohli postupovat podle tohoto kontrolního seznamu, budete chtít mít pro token tento výstup ze Slitheru:

```sh
slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
slither [target] --print human-summary
slither [target] --print contract-summary
slither-prop . --contract ContractName # vyžaduje konfiguraci a použití Echidny
```

## Obecné úvahy {#general-considerations}

- **Kontrakt prošel bezpečnostním auditem.** Vyhněte se interakci s kontrakty, které nemají bezpečnostní audit. Zkontrolujte délku hodnocení (tzv. „úroveň úsilí“), pověst bezpečnostní firmy a počet a závažnost nálezů.
- **Kontaktovali jste vývojáře.** Možná budete muset jejich tým upozornit na incident. Vhodné kontakty hledejte na [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Mají bezpečnostní e-mailovou konferenci pro kritická oznámení.** Jejich tým by měl uživatele (jako jste vy!) informovat, když jsou zjištěny kritické problémy nebo když dojde k aktualizacím.

## Shoda s ERC {#erc-conformity}

Slither obsahuje nástroj [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), který kontroluje shodu tokenu s mnoha souvisejícími standardy ERC. Použijte slither-check-erc ke kontrole, zda:

- **Transfer a transferFrom vracejí boolean.** Několik tokenů u těchto funkcí nevrací boolean. V důsledku toho mohou jejich volání v kontraktu selhat.
- **Funkce name, decimals a symbol jsou přítomny, pokud se používají.** Tyto funkce jsou ve standardu ERC-20 volitelné a nemusí být přítomny.
- **Decimals vrací uint8.** Několik tokenů nesprávně vrací uint256. Pokud je tomu tak, ujistěte se, že vrácená hodnota je menší než 255.
- **Token zmírňuje známý [souběh (race condition) ERC-20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729).** Standard ERC-20 má známý problém se souběhem, který musí být zmírněn, aby se zabránilo útočníkům v krádeži tokenů.
- **Token není tokenem ERC-777 a nemá žádné volání externí funkce v transfer a transferFrom.** Externí volání ve funkcích pro převod mohou vést k útokům typu reentrancy.

Slither obsahuje nástroj [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), který generuje jednotkové testy a bezpečnostní vlastnosti, jež mohou odhalit mnoho běžných chyb ERC. Použijte slither-prop ke kontrole, zda:

- **Kontrakt projde všemi jednotkovými testy a bezpečnostními vlastnostmi ze slither-prop.** Spusťte vygenerované jednotkové testy a poté zkontrolujte vlastnosti pomocí [Echidny](https://github.com/crytic/echidna).

Nakonec existují určité vlastnosti, které je obtížné identifikovat automaticky. Tyto podmínky zkontrolujte ručně:

- **Transfer a transferFrom by neměly účtovat poplatek.** Deflační tokeny mohou vést k neočekávanému chování.
- **Je zohledněn potenciální úrok získaný z tokenu.** Některé tokeny rozdělují úrok držitelům tokenů. Tento úrok by mohl uvíznout v kontraktu, pokud by nebyl zohledněn.

## Složení kontraktu {#contract-composition}

- **Kontrakt se vyhýbá zbytečné složitosti.** Token by měl být jednoduchý kontrakt; token se složitým kódem vyžaduje vyšší standard kontroly. K identifikaci složitého kódu použijte [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) od Slitheru.
- **Kontrakt používá kontrolovanou aritmetiku.** Solidity 0.8 a novější ve výchozím nastavení zvrátí transakci při přetečení a podtečení; starší kontrakty potřebují pro stejnou ochranu SafeMath. Kontrakty zkompilované staršími verzemi bez SafeMath, nebo ty, které používají bloky `unchecked`, vyžadují vyšší standard kontroly. Aritmetiku kontrolujte ručně, zejména uvnitř bloků `unchecked` a inline assembly.
- **Kontrakt má pouze několik funkcí nesouvisejících s tokenem.** Funkce nesouvisející s tokenem zvyšují pravděpodobnost problému v kontraktu. K celkovému přezkoumání kódu použitého v kontraktu použijte [contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) od Slitheru.
- **Token má pouze jednu adresu.** Tokeny s více vstupními body pro aktualizace zůstatku mohou narušit interní účetnictví založené na adrese (např. `balances[token_address][msg.sender]` nemusí odrážet skutečný zůstatek).

## Oprávnění vlastníka {#owner-privileges}

- **Token nelze aktualizovat (není upgradeable).** Aktualizovatelné kontrakty mohou v průběhu času měnit svá pravidla. Pomocí nástroje [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) od Slitheru zjistěte, zda je kontrakt aktualizovatelný.
- **Vlastník má omezené možnosti ražení.** Zlomyslní nebo kompromitovaní vlastníci mohou zneužít možnosti ražení. K přezkoumání možností ražení použijte [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) nástroje Slither a zvažte ruční kontrolu kódu.
- **Token nelze pozastavit (není pausable).** Zlomyslní nebo kompromitovaní vlastníci mohou uvěznit kontrakty spoléhající na pozastavitelné tokeny. Pozastavitelný kód identifikujte ručně.
- **Vlastník nemůže kontrakt zařadit na černou listinu (blacklist).** Zlomyslní nebo kompromitovaní vlastníci mohou uvěznit kontrakty spoléhající na tokeny s černou listinou. Funkce černé listiny identifikujte ručně.
- **Tým stojící za tokenem je známý a může být pohnán k odpovědnosti za zneužití.** Kontrakty s anonymními vývojářskými týmy nebo ty, které sídlí v právních útočištích, by měly vyžadovat vyšší standard kontroly.

## Vzácnost tokenu {#token-scarcity}

Kontrola problémů se vzácností tokenu vyžaduje ruční přezkoumání. Zkontrolujte tyto podmínky:

- **Žádný uživatel nevlastní většinu nabídky.** Pokud několik uživatelů vlastní většinu tokenů, mohou ovlivňovat operace na základě rozdělení tokenu.
- **Celková nabídka je dostatečná.** S tokeny s nízkou celkovou nabídkou lze snadno manipulovat.
- **Tokeny se nacházejí na více než několika burzách.** Pokud jsou všechny tokeny na jedné burze, kompromitace burzy může kompromitovat kontrakt, který na token spoléhá.
- **Uživatelé chápou související rizika velkých prostředků nebo bleskových půjček (flash loans).** Kontrakty spoléhající na zůstatek tokenů musí pečlivě brát v úvahu útočníky s velkými prostředky nebo útoky prostřednictvím bleskových půjček.
- **Token neumožňuje bleskové ražení (flash minting)**. Bleskové ražení může vést k podstatným výkyvům v zůstatku a celkové nabídce, což vyžaduje přísné a komplexní kontroly přetečení při provozu tokenu.
## Známé nestandardní tokeny ERC-20 {#known-non-standard-erc20-tokens}

Protokoly, které umožňují integraci s libovolnými tokeny, musí dbát na správné zacházení s určitými dobře známými nestandardními tokeny ERC-20. Podívejte se na [seznam nestandardních tokenů](https://secure-contracts.com/development-guidelines/non-standard-tokens.html), kde najdete dobře známé tokeny, které nesou další rizika.

## Tokeny ERC-721 {#erc721-tokens}

### Kontroly shody s ERC-721 {#erc721-conformity-checks}

Chování určitých kontraktů se může lišit od původní specifikace ERC. Ručně zkontrolujte následující podmínky:

- **Převody tokenů na adresu 0x0 se zvrátí.** Některé tokeny umožňují převody na 0x0 a považují tokeny odeslané na tuto adresu za spálené; standard ERC-721 však vyžaduje, aby se takové převody zvrátily.
- **Funkce `safeTransferFrom` jsou implementovány se správným podpisem.** Některé kontrakty tokenů tyto funkce neimplementují. Převod NFT do jednoho z těchto kontraktů může vést ke ztrátě aktiv.
- **Funkce `name`, `decimals` a `symbol` jsou přítomny, pokud se používají.** Tyto funkce jsou ve standardu ERC-721 volitelné a nemusí být přítomny.
- **Pokud se používá, `decimals` vrací `uint8(0)`.** Jiné hodnoty jsou neplatné.
- **Funkce `name` a `symbol` mohou vrátit prázdný řetězec.** Toto chování je standardem povoleno.
- **Funkce `ownerOf` se zvrátí, pokud je `tokenId` neplatné nebo odkazuje na token, který již byl spálen.** Funkce nemůže vrátit 0x0. Toto chování je vyžadováno standardem, ale nemusí být vždy implementováno správně.
- **Převod NFT vymaže jeho schválení.** To je vyžadováno standardem.
- **ID tokenu NFT nelze během jeho životnosti změnit.** To je vyžadováno standardem.

### Běžná rizika standardu ERC-721 {#common-risks-of-the-erc721-standard}

Zmírněte rizika spojená s kontrakty ERC-721 provedením ruční kontroly následujících podmínek:

- **Je zohledněn callback `onERC721Received`.** Externí volání ve funkcích pro převod mohou vést k útokům typu reentrancy, zejména pokud callback není explicitní (např. ve voláních [`safeMint`](https://www.paradigm.xyz/writing/the-dangers-of-surprising-code)).
- **Když je NFT vyraženo, je bezpečně převedeno do chytrého kontraktu.** Pokud existuje funkce pro ražení, měla by se chovat podobně jako `safeTransferFrom` a správně zpracovávat ražení nových tokenů do chytrého kontraktu, čímž se zabrání ztrátě aktiv.
- **Spálení tokenu vymaže jeho schválení.** Pokud existuje funkce pro spálení, měla by vymazat předchozí schválení tokenu.
