---
title: Abstrakce účtu
description: Přehled plánů Etherea na zjednodušení a zabezpečení uživatelských účtů
lang: cs
summaryPoints:
  - Abstrakce účtu výrazně usnadňuje tvorbu peněženek s chytrými kontrakty
  - Peněženky s chytrými kontrakty výrazně usnadňují správu přístupu k účtům na Ethereu
  - Ztracené a odhalené klíče lze obnovit pomocí více záloh
---

Většina stávajících uživatelů interaguje s [Ethereem](/) pomocí **[externě vlastněných účtů (EOA)](/glossary/#eoa)**. To omezuje způsoby, jakými mohou uživatelé s Ethereem interagovat. Ztěžuje to například provádění dávek transakcí a vyžaduje, aby uživatelé měli vždy zůstatek v ETH na zaplacení transakčních poplatků.

Abstrakce účtu je způsob, jak tyto problémy vyřešit tím, že uživatelům umožní flexibilně naprogramovat do svých účtů vyšší zabezpečení a lepší uživatelský zážitek. Toho lze dosáhnout [upgradem EOA](https://eips.ethereum.org/EIPS/eip-7702) (EIP-7702), aby mohly být ovládány chytrými kontrakty. Existuje také další cesta, která zahrnuje přidání [druhého, odděleného transakčního systému](https://eips.ethereum.org/EIPS/eip-4337) (EIP-4337), který by běžel paralelně se stávajícím protokolem. Bez ohledu na zvolenou cestu je výsledkem přístup k Ethereu prostřednictvím peněženek s chytrými kontrakty, ať už nativně podporovaných jako součást stávajícího protokolu, nebo prostřednictvím doplňkové transakční sítě.

Peněženky s chytrými kontrakty odemykají uživatelům mnoho výhod, včetně:

- definování vlastních flexibilních bezpečnostních pravidel
- obnovení účtu v případě ztráty klíčů
- sdílení zabezpečení účtu mezi důvěryhodnými zařízeními nebo jednotlivci
- zaplacení gasu za někoho jiného, nebo naopak možnost nechat někoho jiného zaplatit váš gas
- dávkování transakcí (např. schválit a provést swap v jednom kroku)
- více příležitostí pro vývojáře decentralizovaných aplikací (dapp) a peněženek inovovat uživatelský zážitek

Tyto výhody dnes nejsou nativně podporovány, protože transakce mohou zahajovat pouze externě vlastněné účty ([EOA](/glossary/#eoa)). EOA jsou jednoduše páry veřejného a soukromého klíče. Fungují takto:

- pokud máte soukromý klíč, můžete dělat _cokoli_ v rámci pravidel Ethereum Virtual Machine (EVM)
- pokud soukromý klíč nemáte, nemůžete dělat _nic_.

Pokud své klíče ztratíte, nelze je obnovit, a ukradené klíče dávají zlodějům okamžitý přístup ke všem prostředkům na účtu.

Peněženky s chytrými kontrakty jsou řešením těchto problémů, ale dnes je obtížné je programovat, protože nakonec musí být jakákoli logika, kterou implementují, přeložena do sady EOA transakcí, než je Ethereum může zpracovat. Abstrakce účtu umožňuje chytrým kontraktům iniciovat transakce samy, takže jakákoli logika, kterou si uživatel přeje implementovat, může být naprogramována přímo do samotné peněženky s chytrým kontraktem a spuštěna na Ethereu.

Abstrakce účtu v konečném důsledku zlepšuje podporu peněženek s chytrými kontrakty, usnadňuje jejich tvorbu a zvyšuje bezpečnost jejich používání. Díky abstrakci účtu mohou uživatelé využívat všech výhod Etherea, aniž by museli rozumět základní technologii.

## Za hranice seed frází {#beyond-seed-phrases}

Dnešní účty jsou zabezpečeny pomocí soukromých klíčů, které se vypočítávají ze seed frází. Kdokoli s přístupem k seed frázi může snadno odhalit soukromý klíč chránící účet a získat přístup ke všem aktivům, která chrání. Pokud dojde ke ztrátě soukromého klíče a seed fráze, aktiva jsou trvale nedostupná. Zabezpečení těchto seed frází je nepraktické i pro zkušené uživatele a phishing seed frází je jedním z nejčastějších podvodů.

Abstrakce účtu to řeší pomocí chytrého kontraktu, který drží aktiva a autorizuje transakce. Chytré kontrakty mohou obsahovat vlastní logiku přizpůsobenou pro maximální bezpečnost a použitelnost. Uživatelé stále používají soukromé klíče k řízení přístupu, ale s vylepšenými bezpečnostními opatřeními.

Do peněženky lze například přidat záložní klíče, což umožňuje výměnu klíče v případě kompromitace primárního klíče. Každý klíč může být zabezpečen jinak nebo distribuován mezi důvěryhodné osoby, což výrazně zvyšuje bezpečnost. Další pravidla peněženky mohou zmírnit škody způsobené odhalením klíče, například vyžadováním více podpisů pro transakce s vysokou hodnotou nebo omezením transakcí na důvěryhodné adresy.

## Lepší uživatelský zážitek {#better-user-experience}

Abstrakce účtu výrazně zlepšuje uživatelský zážitek a bezpečnost tím, že podporuje peněženky s chytrými kontrakty na úrovni protokolu. Vývojáři mohou volně inovovat a zlepšovat sdružování transakcí pro vyšší rychlost a efektivitu. Jednoduché swapy se mohou stát operacemi na jedno kliknutí, což výrazně usnadňuje používání.

Správa gasu se značně zlepšuje. Aplikace mohou platit poplatky za gas uživatelů nebo umožnit platbu v jiných tokenech než ETH, čímž odpadá nutnost udržovat zůstatek v ETH.

## Jak bude abstrakce účtu implementována? {#how-will-aa-be-implemented}

V současné době je implementace peněženek s chytrými kontrakty náročná, protože spoléhají na složitý kód obalující standardní transakce. Ethereum to může změnit tím, že umožní chytrým kontraktům přímo iniciovat transakce a vloží logiku do chytrých kontraktů Etherea, místo aby se spoléhalo na externí relayery.

### EIP-4337: Abstrakce účtu bez změn protokolu {#eip-4337-account-abstraction-without-protocol-changes}

EIP-4337 umožňuje nativní podporu peněženek s chytrými kontrakty bez úpravy základního protokolu Etherea. Zavádí objekty `UserOperation`, které validátoři shromažďují do transakčních balíčků, což zjednodušuje vývoj peněženek. Kontrakt EntryPoint pro EIP-4337 byl nasazen na Ethereum Mainnet 1. března 2023 a usnadnil vytvoření více než 26 milionů chytrých peněženek a 170 milionů UserOperations.

## Současný pokrok {#current-progress}

V rámci upgradu Pectra sítě Ethereum je EIP-7702 naplánován na 7. května 2025. EIP-4337 byl široce přijat, [přičemž bylo nasazeno více než 26 milionů chytrých účtů a zpracováno více než 170 milionů UserOperations](https://www.bundlebear.com/erc4337-overview/all).

## Další čtení {#further-reading}

- [erc4337.io](https://docs.erc4337.io/)
- [Dokumentace k EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Dokumentace k EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)
- [Přehled adopce ERC-4337](https://www.bundlebear.com/erc4337-overview/all)
- [Vitalikova „Cesta k abstrakci účtu“](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Vitalikův blog o peněženkách se sociální obnovou](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Awesome Account Abstraction](https://github.com/4337Mafia/awesome-account-abstraction)