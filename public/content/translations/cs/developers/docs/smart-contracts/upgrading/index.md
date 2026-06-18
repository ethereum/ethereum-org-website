---
title: "Aktualizace chytrých kontraktů"
description: "Přehled vzorů pro aktualizaci chytrých kontraktů na Ethereu"
lang: cs
---

Chytré kontrakty na Ethereu jsou samovykonatelné programy, které běží v Ethereum Virtual Machine (EVM). Tyto programy jsou ze své podstaty neměnné, což zabraňuje jakýmkoli aktualizacím obchodní logiky po nasazení kontraktu.

Ačkoli je neměnnost nezbytná pro bezdůvěrnost, decentralizaci a bezpečnost chytrých kontraktů, v určitých případech může být nevýhodou. Neměnný kód může například vývojářům znemožnit opravu zranitelných kontraktů.

Zvýšený výzkum v oblasti vylepšování chytrých kontraktů však vedl k zavedení několika vzorů pro aktualizaci (upgrade patterns). Tyto vzory umožňují vývojářům aktualizovat chytré kontrakty (při zachování neměnnosti) umístěním obchodní logiky do jiných kontraktů.

## Předpoklady {#prerequisites}

Měli byste dobře rozumět [chytrým kontraktům](/developers/docs/smart-contracts/), [anatomii chytrých kontraktů](/developers/docs/smart-contracts/anatomy/) a [Ethereum Virtual Machine (EVM)](/developers/docs/evm/). Tento průvodce také předpokládá, že čtenáři mají základy programování chytrých kontraktů.

## Co je to aktualizace chytrého kontraktu? {#what-is-a-smart-contract-upgrade}

Aktualizace chytrého kontraktu zahrnuje změnu obchodní logiky chytrého kontraktu při zachování stavu kontraktu. Je důležité objasnit, že možnost aktualizace (upgradeability) a měnnost (mutability) nejsou totéž, zejména v kontextu chytrých kontraktů.

Stále nemůžete změnit program nasazený na adresu v síti Ethereum. Můžete však změnit kód, který se spustí, když uživatelé interagují s chytrým kontraktem.

Toho lze dosáhnout následujícími metodami:

1. Vytvořením více verzí chytrého kontraktu a migrací stavu (tj. dat) ze starého kontraktu do nové instance kontraktu.

2. Vytvořením samostatných kontraktů pro uložení obchodní logiky a stavu.

3. Použitím proxy vzorů k delegování volání funkcí z neměnného proxy kontraktu do modifikovatelného logického kontraktu.

4. Vytvořením neměnného hlavního kontraktu, který komunikuje s flexibilními satelitními kontrakty a spoléhá na ně při provádění specifických funkcí.

5. Použitím vzoru diamant k delegování volání funkcí z proxy kontraktu do logických kontraktů.

### Mechanismus aktualizace č. 1: Migrace kontraktu {#contract-migration}

Migrace kontraktu je založena na verzování – myšlence vytváření a správy jedinečných stavů stejného softwaru. Migrace kontraktu zahrnuje nasazení nové instance existujícího chytrého kontraktu a převod úložiště a zůstatků do nového kontraktu.

Nově nasazený kontrakt bude mít prázdné úložiště, což vám umožní obnovit data ze starého kontraktu a zapsat je do nové implementace. Poté budete muset aktualizovat všechny kontrakty, které interagovaly se starým kontraktem, aby odrážely novou adresu.

Posledním krokem při migraci kontraktu je přesvědčit uživatele, aby přešli na používání nového kontraktu. Nová verze kontraktu si zachová uživatelské zůstatky a adresy, což zachovává neměnnost. Pokud se jedná o kontrakt založený na tokenech, budete také muset kontaktovat burzy, aby vyřadily starý kontrakt a začaly používat nový.

Migrace kontraktu je poměrně přímočaré a bezpečné opatření pro aktualizaci chytrých kontraktů bez narušení uživatelských interakcí. Ruční migrace uživatelského úložiště a zůstatků do nového kontraktu je však časově náročná a může znamenat vysoké poplatky za gas.

[Více o migraci kontraktů.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### Mechanismus aktualizace č. 2: Oddělení dat {#data-separation}

Další metodou pro aktualizaci chytrých kontraktů je oddělení obchodní logiky a ukládání dat do samostatných kontraktů. To znamená, že uživatelé interagují s logickým kontraktem, zatímco data jsou uložena v kontraktu úložiště (storage contract).

Logický kontrakt obsahuje kód, který se spustí, když uživatelé interagují s aplikací. Uchovává také adresu kontraktu úložiště a interaguje s ním za účelem získávání a nastavování dat.

Kontrakt úložiště mezitím uchovává stav spojený s chytrým kontraktem, jako jsou uživatelské zůstatky a adresy. Všimněte si, že kontrakt úložiště je vlastněn logickým kontraktem a při nasazení je nakonfigurován s jeho adresou. To zabraňuje neoprávněným kontraktům volat kontrakt úložiště nebo aktualizovat jeho data.

Ve výchozím nastavení je kontrakt úložiště neměnný – můžete však nahradit logický kontrakt, na který ukazuje, novou implementací. Tím se změní kód, který běží v EVM, zatímco úložiště a zůstatky zůstanou nedotčeny.

Použití této metody aktualizace vyžaduje aktualizaci adresy logického kontraktu v kontraktu úložiště. Z dříve vysvětlených důvodů musíte také nakonfigurovat nový logický kontrakt s adresou kontraktu úložiště.

Vzor oddělení dat je pravděpodobně snazší na implementaci ve srovnání s migrací kontraktu. Budete však muset spravovat více kontraktů a implementovat složitá schémata autorizace, abyste ochránili chytré kontrakty před škodlivými aktualizacemi.

### Mechanismus aktualizace č. 3: Proxy vzory {#proxy-patterns}

Proxy vzor také využívá oddělení dat k udržení obchodní logiky a dat v samostatných kontraktech. V proxy vzoru však kontrakt úložiště (nazývaný proxy) volá logický kontrakt během provádění kódu. To je opak metody oddělení dat, kde logický kontrakt volá kontrakt úložiště.

V proxy vzoru se děje následující:

1. Uživatelé interagují s proxy kontraktem, který ukládá data, ale neobsahuje obchodní logiku.

2. Proxy kontrakt ukládá adresu logického kontraktu a deleguje všechna volání funkcí na logický kontrakt (který obsahuje obchodní logiku) pomocí funkce `delegatecall`.

3. Poté, co je volání předáno logickému kontraktu, jsou vrácená data z logického kontraktu získána a vrácena uživateli.

Použití proxy vzorů vyžaduje pochopení funkce **delegatecall**. V zásadě je `delegatecall` operační kód, který umožňuje kontraktu volat jiný kontrakt, zatímco samotné provádění kódu probíhá v kontextu volajícího kontraktu. Důsledkem použití `delegatecall` v proxy vzorech je, že proxy kontrakt čte a zapisuje do svého úložiště a provádí logiku uloženou v logickém kontraktu, jako by volal interní funkci.

Z [dokumentace Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries):

> _Existuje speciální varianta volání zprávy s názvem **delegatecall**, která je identická s voláním zprávy s tím rozdílem, že kód na cílové adrese je spuštěn v kontextu (tj. na adrese) volajícího kontraktu a `msg.sender` a `msg.value` nemění své hodnoty._ _To znamená, že kontrakt může za běhu dynamicky načítat kód z jiné adresy. Úložiště, aktuální adresa a zůstatek stále odkazují na volající kontrakt, pouze kód je převzat z volané adresy._

Proxy kontrakt ví, že má vyvolat `delegatecall` pokaždé, když uživatel zavolá funkci, protože má v sobě zabudovanou funkci `fallback`. Při programování v Solidity se [záložní funkce](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) spustí, když volání funkce neodpovídá funkcím specifikovaným v kontraktu.

Aby proxy vzor fungoval, je nutné napsat vlastní záložní funkci, která specifikuje, jak by měl proxy kontrakt zpracovávat volání funkcí, které nepodporuje. V tomto případě je záložní funkce proxy naprogramována tak, aby iniciovala delegatecall a přesměrovala požadavek uživatele na aktuální implementaci logického kontraktu.

Proxy kontrakt je ve výchozím nastavení neměnný, ale lze vytvářet nové logické kontrakty s aktualizovanou obchodní logikou. Provedení aktualizace je pak záležitostí změny adresy logického kontraktu odkazovaného v proxy kontraktu.

Nasměrováním proxy kontraktu na nový logický kontrakt se změní kód, který se spustí, když uživatelé zavolají funkci proxy kontraktu. To nám umožňuje aktualizovat logiku kontraktu, aniž bychom museli žádat uživatele o interakci s novým kontraktem.

Proxy vzory jsou oblíbenou metodou pro aktualizaci chytrých kontraktů, protože eliminují potíže spojené s migrací kontraktů. Proxy vzory jsou však složitější na použití a při nesprávném použití mohou zavést kritické chyby, jako jsou [kolize selektorů funkcí](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357).

[Více o proxy vzorech](https://blog.openzeppelin.com/proxy-patterns/).

### Mechanismus aktualizace č. 4: Vzor strategie {#strategy-pattern}

Tato technika je ovlivněna [vzorem strategie](https://en.wikipedia.org/wiki/Strategy_pattern), který podporuje vytváření softwarových programů, jež komunikují s jinými programy za účelem implementace specifických funkcí. Aplikace vzoru strategie na vývoj na Ethereu by znamenala vytvoření chytrého kontraktu, který volá funkce z jiných kontraktů.

Hlavní kontrakt v tomto případě obsahuje základní obchodní logiku, ale komunikuje s jinými chytrými kontrakty („satelitními kontrakty“) za účelem provádění určitých funkcí. Tento hlavní kontrakt také ukládá adresu pro každý satelitní kontrakt a může přepínat mezi různými implementacemi satelitního kontraktu.

Můžete vytvořit nový satelitní kontrakt a nakonfigurovat hlavní kontrakt s novou adresou. To vám umožní změnit _strategie_ (tj. implementovat novou logiku) pro chytrý kontrakt.

Ačkoli je podobný dříve diskutovanému proxy vzoru, vzor strategie se liší, protože hlavní kontrakt, se kterým uživatelé interagují, obsahuje obchodní logiku. Použití tohoto vzoru vám dává příležitost zavést omezené změny do chytrého kontraktu bez ovlivnění základní infrastruktury.

Hlavní nevýhodou je, že tento vzor je většinou užitečný pro zavádění menších aktualizací. Pokud je navíc hlavní kontrakt kompromitován (např. prostřednictvím hacku), nemůžete tuto metodu aktualizace použít.

### Mechanismus aktualizace č. 5: Vzor diamant {#diamond-pattern}

Vzor diamant (diamond pattern) lze považovat za vylepšení proxy vzoru. Diamantové vzory se liší od proxy vzorů tím, že diamantový proxy kontrakt může delegovat volání funkcí na více než jeden logický kontrakt.

Logické kontrakty ve vzoru diamant jsou známé jako _facety_ (facets). Aby vzor diamant fungoval, musíte v proxy kontraktu vytvořit mapování, které mapuje [selektory funkcí](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) na různé adresy facetů.

Když uživatel provede volání funkce, proxy kontrakt zkontroluje mapování, aby našel facet zodpovědný za provedení této funkce. Poté vyvolá `delegatecall` (pomocí záložní funkce) a přesměruje volání na příslušný logický kontrakt.

Vzor aktualizace diamant má oproti tradičním proxy vzorům aktualizace některé výhody:

1. Umožňuje vám aktualizovat malou část kontraktu bez změny celého kódu. Použití proxy vzoru pro aktualizace vyžaduje vytvoření zcela nového logického kontraktu, a to i pro menší aktualizace.

2. Všechny chytré kontrakty (včetně logických kontraktů používaných v proxy vzorech) mají limit velikosti 24 KB, což může být omezení – zejména u složitých kontraktů vyžadujících více funkcí. Vzor diamant tento problém snadno řeší rozdělením funkcí do více logických kontraktů.

3. Proxy vzory přijímají plošný přístup k řízení přístupu. Subjekt s přístupem k funkcím aktualizace může změnit _celý_ kontrakt. Vzor diamant však umožňuje modulární přístup k oprávněním, kde můžete omezit subjekty na aktualizaci pouze určitých funkcí v rámci chytrého kontraktu.

[Více o vzoru diamant](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Výhody a nevýhody aktualizace chytrých kontraktů {#pros-and-cons-of-upgrading-smart-contracts}

| Výhody                                                                                                                                         | Nevýhody                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aktualizace chytrého kontraktu může usnadnit opravu zranitelností objevených ve fázi po nasazení.                                              | Aktualizace chytrých kontraktů popírá myšlenku neměnnosti kódu, což má důsledky pro decentralizaci a bezpečnost.                                                        |
| Vývojáři mohou využít aktualizace logiky k přidání nových funkcí do decentralizovaných aplikací (dapp).                                        | Uživatelé musí důvěřovat vývojářům, že nebudou chytré kontrakty svévolně upravovat.                                                                                     |
| Aktualizace chytrých kontraktů mohou zlepšit bezpečnost pro koncové uživatele, protože chyby lze rychle opravit.                               | Programování funkcionality aktualizace do chytrých kontraktů přidává další vrstvu složitosti a zvyšuje možnost kritických chyb.                                         |
| Aktualizace kontraktů dávají vývojářům více prostoru pro experimentování s různými funkcemi a postupné vylepšování dapp.                       | Možnost aktualizovat chytré kontrakty může povzbudit vývojáře k rychlejšímu spouštění projektů bez provedení náležité péče během fáze vývoje.                           |
|                                                                                                                                                | Nezabezpečené řízení přístupu nebo centralizace v chytrých kontraktech může usnadnit škodlivým aktérům provádění neoprávněných aktualizací.                             |

## Na co pamatovat při aktualizaci chytrých kontraktů {#considerations-for-upgrading-smart-contracts}

1. Používejte bezpečné mechanismy řízení přístupu/autorizace, abyste zabránili neoprávněným aktualizacím chytrých kontraktů, zejména pokud používáte proxy vzory, vzory strategie nebo oddělení dat. Příkladem je omezení přístupu k funkci aktualizace tak, aby ji mohl volat pouze vlastník kontraktu.

2. Aktualizace chytrých kontraktů je složitá činnost a vyžaduje vysokou úroveň pečlivosti, aby se zabránilo zanesení zranitelností.

3. Snižte předpoklady důvěry decentralizací procesu implementace aktualizací. Možné strategie zahrnují použití [kontraktu multi-sig peněženky](/developers/docs/smart-contracts/#multisig) k řízení aktualizací nebo požadavek, aby [členové DAO](/dao/) hlasovali o schválení aktualizace.

4. Buďte si vědomi nákladů spojených s aktualizací kontraktů. Například kopírování stavu (např. uživatelských zůstatků) ze starého kontraktu do nového kontraktu během migrace kontraktu může vyžadovat více než jednu transakci, což znamená vyšší poplatky za gas.

5. Zvažte implementaci **časových zámků (timelocks)** k ochraně uživatelů. Časový zámek označuje zpoždění vynucené u změn v systému. Časové zámky lze kombinovat se systémem správy (governance) s více podpisy (multi-sig) pro řízení aktualizací: pokud navrhovaná akce dosáhne požadované hranice schválení, neprovede se, dokud neuplyne předem definovaná doba zpoždění.

Časové zámky dávají uživatelům určitý čas na výstup ze systému, pokud nesouhlasí s navrhovanou změnou (např. aktualizací logiky nebo novými schématy poplatků). Bez časových zámků musí uživatelé důvěřovat vývojářům, že nebudou v chytrém kontraktu implementovat svévolné změny bez předchozího upozornění. Nevýhodou je, že časové zámky omezují schopnost rychle opravovat zranitelnosti.

## Zdroje {#resources}

**OpenZeppelin Upgrades Plugins – _Sada nástrojů pro nasazení a zabezpečení aktualizovatelných chytrých kontraktů._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Dokumentace](https://docs.openzeppelin.com/upgrades)

## Výukové programy {#tutorials}

- [Aktualizace vašich chytrých kontraktů | Výukový program na YouTube](https://www.youtube.com/watch?v=bdXJmWajZRY) od Patricka Collinse
- [Výukový program migrace chytrých kontraktů na Ethereu](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd) od Austina Griffitha
- [Použití proxy vzoru UUPS k aktualizaci chytrých kontraktů](https://blog.logrocket.com/author/praneshas/) od Pranesha A.S
- [Výukový program Web3: Napište aktualizovatelný chytrý kontrakt (proxy) pomocí OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916) od fangjun.eth

## Další čtení {#further-reading}

- [Stav aktualizací chytrých kontraktů](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) od Santiaga Palladina
- [Několik způsobů, jak aktualizovat chytrý kontrakt v Solidity](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/) – blog Crypto Market Pool
- [Naučte se: Aktualizace chytrých kontraktů](https://docs.openzeppelin.com/learn/upgrading-smart-contracts) – Dokumentace OpenZeppelin
- [Proxy vzory pro aktualizovatelnost kontraktů v Solidity: Transparentní vs. UUPS proxy](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0) od Naveena Sahua
- [Jak fungují aktualizace diamant](https://dev.to/mudgen/how-diamond-upgrades-work-417j) od Nicka Mudge