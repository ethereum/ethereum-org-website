---
title: Abstrakce účtů
description: Přehled plánů Etherea na zjednodušení a větší zabezpečení uživatelských účtů
lang: cs
summaryPoints:
  - Abstrakce účtů usnadňuje vytváření peněženek založených na chytrých kontraktech
  - Chytré kontraktové peněženky výrazně usnadňují správu přístupu k účtům na Ethereu
  - Ztracené nebo zkompromitované klíče lze obnovit pomocí několika záloh
---

# Abstrakce účtu {#account-abstraction}

Většina stávajících uživatelů interaguje s Ethereem pomocí **[externě vlastněných účtů (EOA)](/glossary/#eoa)**. To limituje možnosti uživatelů interagovat s Ethereem. Například to ztěžuje provádění dávkových transakcí a vyžaduje, aby uživatelé vždy měli zůstatek v ETH na placení transakčních poplatků.

Abstrakce účtů je způsob, jak tyto problémy vyřešit, a to tak, že uživatelům umožňuje flexibilně naprogramovat do svých účtů větší zabezpečení a lepší uživatelské prostředí. Toho lze dosáhnout [vylepšením účtů EOA](https://eips.ethereum.org/EIPS/eip-7702) (EIP-7702) tak, aby je mohly ovládat chytré kontrakty. Existuje také další cesta, která zahrnuje přidání [druhého, samostatného transakčního systému](https://eips.ethereum.org/EIPS/eip-4337) (EIP-4337), který poběží souběžně se stávajícím protokolem. Bez ohledu na způsob je výsledkem přístup k Ethereu prostřednictvím peněženek založených na chytrých kontraktech, buď nativně podporovaných jako součást stávajícího protokolu, nebo prostřednictvím doplňkové transakční sítě.

Peněženky založené na chytrých kontraktech odemykají spoustu výhod pro uživatele, např.:

- definování vlastních flexibilních bezpečnostních pravidel,
- obnovení účtu v případě ztráty klíčů,
- sdílení bezpečnosti účtu mezi důvěryhodnými zařízeními nebo osobami,
- placením poplatků za palivo za někoho jiného, nebo možnost nechat někoho jiného platit za vás,
- dávkování transakcí (např. schválení a provedení směny najednou)
- více příležitostí vývojářů dappek a peněženek vylepšit uživatelskou zkušenost.

Tyto výhody nejsou v současné době nativně podporovány, protože pouze externě vlastněné účty ([EOA](/glossary/#eoa)) mohou zahajovat transakce. EOA jsou jednoduše páry veřejných a privátních klíčů. Fungují takto:

- pokud máte privátní klíč, můžete dělat _cokoli_ v rámci pravidel Ethereum Virtual Machine (EVM)
- pokud nemáte privátní klíč, nemůžete dělat _nic_.

Pokud ztratíte klíče, nemohou být obnoveny, a ukradené klíče dávají zlodějům okamžitý přístup ke všem prostředkům na účtu.

Peněženky založené na chytrých kontraktech řeší tyto problémy, ale dnes je obtížné je naprogramovat, protože jakákoliv logika, kterou implementují, musí být nakonec převedena do souboru EOA transakcí, než může být zpracována Ethereem. Abstrakce účtu umožňuje chytrým kontraktům iniciovat transakce samostatně, takže jakákoliv logika, kterou chce uživatel implementovat, může být zakódována přímo do peněženky založené na chytrém kontraktu a spuštěna na Ethereu.

Ve finále zlepšuje abstrakce účtu podporu pro peněženky založené na chytrých kontraktech, což usnadňuje jejich vytváření a zabezpečuje používání. S abstrakcí účtu mohou uživatelé využívat všechny výhody Etherea, aniž by museli rozumět základní technologii.

## Více než jen bezpečnostní fráze {#beyond-seed-phrases}

Dnešní účty jsou zabezpečeny pomocí privátních klíčů, které jsou vypočítány z bezpečnostních frází. Každý, kdo má přístup k bezpečnostní frázi, může snadno odhalit privátní klíč chránící účet a získat přístup ke všem prostředkům, které chrání. Pokud dojde ke ztrátě privátního klíče a bezpečnostní fráze, prostředky jsou trvale nepřístupné. Zabezpečení těchto bezpečnostních frází je nepraktické, a to i pro zkušené uživatele, a phishing na bezpečnostní fráze je jedním z nejčastějších podvodů.

Abstrakce účtu to řeší použitím chytrého kontraktu k držení prostředků a autorizaci transakcí. Chytré kontrakty mohou obsahovat vlastní logiku přizpůsobenou pro maximální bezpečnost a použitelnost. Uživatelé stále používají privátní klíče k řízení přístupu, ale se zvýšenými bezpečnostními opatřeními.

Například do peněženky lze přidat záložní klíče, což umožňuje výměnu klíče, pokud je primární klíč kompromitován. Každý klíč může být zabezpečen jinak nebo distribuován mezi důvěryhodné osoby, což výrazně zvyšuje bezpečnost. Další pravidla peněženky mohou zmírnit škody způsobené odhalením klíče, například vyžadováním více podpisů pro transakce s vysokou hodnotou nebo omezením transakcí na důvěryhodné adresy.

## Lepší uživatelská zkušenost {#better-user-experience}

Abstrakce účtu výrazně vylepšuje uživatelský prožitek a bezpečnost tím, že podporuje peněženky s chytrými kontrakty na úrovni protokolu. Vývojáři mohou volně inovovat a vylepšovat seskupování transakcí pro zvýšení rychlosti a efektivity. Jednoduché směny se mohou stát operacemi na jedno kliknutí, což výrazně zlepší jejich použitelnost.

Správa paliva se výrazně zlepšuje. Aplikace mohou platit uživatelům poplatky za palivo nebo umožnit platbu v jiných tokenech než ETH, čímž odpadá nutnost udržovat zůstatek v ETH.

## Jak bude abstrakce účtu implementována? Jak bude implementována abstrakce účtu {#how-will-aa-be-implemented}

V současné době je implementace peněženek s chytrými kontrakty náročná, protože se spoléhají na složitý kód, který obaluje standardní transakce. Ethereum to může změnit tím, že umožní chytrým kontraktům přímo iniciovat transakce a vkládat logiku do chytrých kontraktů na Ethereu namísto spoléhání se na externí relayery.

### EIP-4337: Abstrakce účtu bez změn v protokolu

EIP-4337 umožňuje nativní podporu peněženek s chytrými kontrakty bez úpravy hlavního protokolu Etherea. Zavádí objekty `UserOperation`, které validátoři shromažďují do balíčků transakcí, což zjednodušuje vývoj peněženek. Kontrakt EntryPoint EIP-4337 byl 1. března 2023 nasazen na hlavní síti Etherea a umožnil vytvoření více než 26 milionů chytrých peněženek a 170 milionů operací UserOperation.

## Aktuální postup {#current-progress}

V rámci vylepšení Pectra sítě Ethereum je EIP-7702 naplánován na 7. května 2025. EIP-4337 byl široce přijat, [s více než 26 miliony nasazených chytrých účtů a více než 170 miliony zpracovaných operací UserOperation](https://www.bundlebear.com/erc4337-overview/all).

## Další čtení {#further-reading}

- [erc4337.io](https://docs.erc4337.io/)
- [Dokumentace EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Dokumentace EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)
- [Panel přijetí ERC-4337](https://www.bundlebear.com/erc4337-overview/all)
- [Vitalikova "Cesta k abstrakci účtu"](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Vitalikův blog o peněženkách se sociální obnovou](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Awesome Account Abstraction](https://github.com/4337Mafia/awesome-account-abstraction)
