---
title: Vylepšení chytrých kontraktů
description: Přehled vzorů vylepšení pro chytré kontrakty na Ethereu
lang: cs
---

Chytré kontrakty na Ethereu jsou samospustitelné programy, které běží ve virtuálním stroji Etherea (EVM). Tyto programy jsou ze své podstaty neměnné, což zabraňuje jakýmkoli aktualizacím obchodní logiky po nasazení kontraktu.

Neměnnost je sice nezbytná pro zajištění žádné další důvěry, decentralizace a bezpečnosti chytrých kontraktů, ale v některých případech může být i nevýhodou. Neměnný kód může například vývojářům znemožnit opravu zranitelných kontraktů.

Zvýšený výzkum v oblasti vylepšování chytrých kontraktů však vedl k zavedení několika vzorů vylepšení. Tyto vzory vylepšení umožňují vývojářům aktualizovat chytré kontrakty (při zachování neměnnosti) umístěním obchodní logiky do různých kontraktů.

## Předpoklady {#prerequisites}

Měli byste dobře rozumět [chytrým kontraktům](/developers/docs/smart-contracts/), [anatomii chytrých kontraktů](/developers/docs/smart-contracts/anatomy/) a [virtuálnímu stroji Etherea (EVM)](/developers/docs/evm/). Tato příručka také předpokládá, že čtenáři mají znalosti o programování chytrých kontraktů.

## Co je to vylepšení chytrého kontraktu? {#what-is-a-smart-contract-upgrade}

Vylepšení chytrého kontraktu zahrnuje změnu obchodní logiky chytrého kontraktu při zachování jeho stavu. Je důležité objasnit, že možnost vylepšit a měnit nejsou totéž, zejména v kontextu chytrých kontraktů.

Program nasazený na adresu v síti Etherea stále nelze změnit. Můžete však změnit kód, který se spustí při interakci uživatelů s chytrým kontraktem.

To lze provést následujícími způsoby:

1. Vytvořením více verzí chytrého kontraktu a migrací stavu (tj. dat) ze starého kontraktu do nové instance kontraktu.

2. Vytvořením samostatných kontraktů pro ukládání obchodní logiky a stavu.

3. Pomocí proxy vzorů delegujte volání funkcí z neměnného proxy kontraktu na modifikovatelný logický kontrakt.

4. Vytvořením neměnného hlavního kontraktu, který se propojuje s flexibilními satelitními kontrakty a spoléhá na ně při provádění konkrétních funkcí.

5. Použití diamantového vzoru k delegování volání funkcí z proxy kontraktu na logické kontrakty.

### Mechanismus vylepšení č. 1: Migrace kontraktu {#contract-migration}

Migrace kontraktu je založena na verzování – myšlence vytváření a správy jedinečných stavů téhož softwaru. Migrace kontraktu zahrnuje nasazení nové instance stávajícího chytrého kontraktu a převod úložiště a zůstatků do nového kontraktu.

Nově nasazený kontrakt bude mít prázdné úložiště, což vám umožní obnovit data ze starého kontraktu a zapsat je do nové implementace. Poté bude nutné aktualizovat všechny kontrakty, které byly v interakci se starým kontraktem, aby odrážely novou adresu.

Posledním krokem při migraci kontraktu je přesvědčit uživatele, aby přešli na používání nového kontraktu. Nová verze kontraktu zachovává zůstatky a adresy uživatelů, čímž je zachována neměnnost. Pokud se jedná o kontrakt založený na tokenech, budete také muset kontaktovat burzy, aby se zbavily starého kontraktu a používaly nový kontrakt.

Migrace kontraktu je relativně jednoduché a bezpečné opatření pro aktualizaci chytrých kontraktů bez narušení uživatelských interakcí. Ruční migrace uživatelských úložišť a zůstatků do nového kontraktu je však časově náročná a může být spojena s vysokými náklady na palivo.

[Více o migraci kontraktu.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### Mechanismus vylepšení č. 2: Oddělení dat {#data-separation}

Další metodou vylepšení chytrých kontraktů je oddělení obchodní logiky a ukládání dat do samostatných kontraktů. To znamená, že uživatelé komunikují s logickým kontraktem, zatímco data jsou uložena v úložném kontraktu.

Logický kontrakt obsahuje kód prováděný při interakci uživatelů s aplikací. Uchovává také adresu úložného kontraktu a komunikuje s ním při získávání a nastavování dat.

Úložný kontrakt mezitím uchovává stav spojený s chytrým kontraktem, například zůstatky a adresy uživatelů. Všimněte si, že úložný kontrakt je vlastněn logickým kontraktem a při nasazení je nakonfigurován s jeho adresou. Tím se zabrání volání úložného kontraktu nebo aktualizaci jeho dat neoprávněnými osobami.

Ve výchozím nastavení je úložný kontrakt neměnný, ale logický kontrakt, na který ukazuje, můžete nahradit novou implementací. Tím se změní kód, který běží v EVM, přičemž úložiště a zůstatky zůstanou zachovány.

Použití této metody vylepšení vyžaduje aktualizaci adresy logického kontraktu v úložném kontraktu. Z důvodů vysvětlených dříve je také nutné nakonfigurovat nový logický kontrakt s adresou úložného kontraktu.

Vzor oddělení dat je pravděpodobně jednodušší na implementaci ve srovnání s migrací kontraktu. Budete však muset spravovat více kontraktů a implementovat složitá autorizační schémata na ochranu chytrých kontraktů před škodlivými vylepšeními.

### Mechanismus vylepšení č. 3: Proxy vzory {#proxy-patterns}

Proxy vzor také používá oddělení dat, aby obchodní logika a data byly v oddělených kontraktech. V proxy vzoru však úložný kontrakt (nazývaný proxy) volá logický kontrakt během provádění kódu. Jedná se o obrácenou metodu oddělení dat, kdy logický kontrakt volá ten úložný.

V proxy vzoru se děje toto:

1. Uživatelé komunikují s proxy kontraktem, který ukládá data, ale neobsahuje obchodní logiku.

2. Proxy kontrakt ukládá adresu logického kontraktu a deleguje všechna volání funkcí na logický kontrakt (který obsahuje obchodní logiku) pomocí funkce `delegatecall`.

3. Po předání volání logickému kontraktu se načtou vrácená data z logického kontraktu a vrátí se uživateli.

Použití proxy vzorů vyžaduje znalost funkce **delegatecall**. `delegatecall` je v podstatě operační kód, který umožňuje kontraktu volat jiný kontrakt, zatímco skutečné provádění kódu probíhá v kontextu volajícího kontraktu. Důsledkem použití `delegatecall` v proxy vzorech je, že proxy kontrakt čte a zapisuje do svého úložiště a provádí logiku uloženou v logickém kontraktu, jako by volal interní funkci.

Z [dokumentace Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries):

> _Existuje speciální varianta volání zprávy s názvem **delegatecall**, která je totožná s voláním zprávy až na to, že kód na cílové adrese se provádí v kontextu (tj. na adrese) volajícího kontraktu a `msg.sender` a `msg.value` nemění své hodnoty._ _To znamená, že kontrakt může za běhu dynamicky načíst kód z jiné adresy. Úložiště, aktuální adresa a zůstatek se stále vztahují k volajícímu kontraktu, pouze kód je převzat z volané adresy._

Proxy kontrakt ví, že má zavolat `delegatecall`, kdykoli uživatel zavolá funkci, protože má v sobě zabudovanou funkci `fallback`. V programování Solidity se funkce [fallback](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) provede, když volání funkce neodpovídá funkcím uvedeným v kontraktu.

Zprovoznění proxy vzoru vyžaduje napsání vlastní nouzové funkce, která určuje, jak má proxy kontrakt zacházet s voláními funkcí, které nepodporuje. V tomto případě je záložní funkce proxy kontraktu naprogramována tak, aby iniciovala delegatecall a přesměrovala požadavek uživatele na aktuální implementaci logického kontraktu.

Proxy kontrakt je ve výchozím nastavení neměnný, ale lze vytvářet nové logické kontrakty s aktualizovanou obchodní logikou. Provedení vylepšení pak spočívá ve změně adresy logického kontraktu, na který odkazuje proxy kontrakt.

Ukázáním proxy kontraktu na nový logický kontrakt se změní kód prováděný při volání funkce proxy kontraktu uživateli. To nám umožňuje vylepšit logiku kontraktu, aniž bychom od uživatelů vyžadovali interakci s novým kontraktem.

Proxy vzory jsou oblíbenou metodou vylepšení chytrých kontraktů, protože eliminují obtíže spojené s migrací kontraktu. Použití proxy vzorů je však složitější a při nesprávném použití může způsobit kritické chyby, například [kolize selektorů funkcí](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357).

[Více o proxy vzorech](https://blog.openzeppelin.com/proxy-patterns/).

### Mechanismus vylepšení č. 4: Vzor strategie {#strategy-pattern}

Tato technika je ovlivněna [vzorem strategie](https://en.wikipedia.org/wiki/Strategy_pattern), který podporuje vytváření softwarových programů, které se propojují s jinými programy a implementují specifické funkce. Použití vzoru strategie při vývoji Etherea by znamenalo vytvoření chytrého kontraktu, který volá funkce z jiných kontraktů.

Hlavní kontrakt v tomto případě obsahuje základní obchodní logiku, ale je propojen s dalšími chytrými kontrakty („satelitními kontrakty“), které provádějí určité funkce. Tento hlavní kontrakt také uchovává adresu pro každý satelitní kontrakt a může přepínat mezi různými implementacemi satelitního kontraktu.

Můžete vytvořit nový satelitní kontrakt a nakonfigurovat hlavní kontrakt s novou adresou. To umožňuje měnit _strategie_ (tj. implementovat novou logiku) pro chytrý kontrakt.

Ačkoli je podobný dříve popsanému proxy vzoru, vzor strategie se liší, protože hlavní kontrakt, se kterým uživatelé komunikují, obsahuje obchodní logiku. Použití tohoto vzoru vám dává možnost zavést omezené změny v chytrém kontraktu, aniž by to ovlivnilo základní infrastrukturu.

Hlavní nevýhodou je, že tento vzor je užitečný hlavně pro zavádění drobných vylepšení. Pokud je hlavní kontrakt kompromitován (např. hacknutím), nelze tento způsob vylepšení použít.

### Mechanismus aktualizace č. 5: Diamantový vzor {#diamond-pattern}

Diamantový vzor lze považovat za vylepšení proxy vzoru. Diamantové vzory se od proxy vzorů liší tím, že diamantový proxy kontrakt může delegovat volání funkcí na více než jeden logický kontrakt.

Logické kontrakty v diamantovém vzoru se označují jako _fasety_. Aby diamantový vzor fungoval, je třeba v proxy kontraktu vytvořit mapování, které mapuje [selektory funkcí](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) na různé adresy faset.

Když uživatel zavolá funkci, proxy kontrakt zkontroluje mapování a najde aspekt odpovědný za provedení dané funkce. Poté vyvolá `delegatecall` (pomocí funkce fallback) a přesměruje volání na příslušný logický kontrakt.

Diamantový vzor vylepšení má oproti tradičním vzorům proxy vylepšení určité výhody:

1. Umožňuje vylepšit malou část kontraktu, aniž by bylo nutné měnit celý kód. Použití proxy vzoru pro vylepšení vyžaduje vytvoření zcela nového logického kontraktu, a to i pro drobná vylepšení.

2. Všechny chytré kontrakty (včetně logických kontraktů používaných v proxy vzorech) mají limit velikosti 24 Kb, což může být omezení – zejména u složitých kontraktů vyžadujících více funkcí. Diamantový vzor usnadňuje řešení tohoto problému rozdělením funkcí do více logických kontraktů.

3. Proxy vzory používají univerzální přístup k řízení přístupu. Entita s přístupem k funkcím vylepšení může změnit _celý_ kontrakt. Diamantový vzor však umožňuje modulární přístup k oprávněním, kdy můžete entitám omezit vylepšení určitých funkcí v rámci chytrého kontraktu.

[Více o diamantovém vzoru](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Výhody a nevýhody vylepšení chytrých kontraktů {#pros-and-cons-of-upgrading-smart-contracts}

| Plusy                                                                                                                          | Mínusy                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Vylepšení chytrého kontraktu může usnadnit opravu zranitelností objevených ve fázi po nasazení.                                | Aktualizace chytrých kontraktů popírá myšlenku neměnnosti kódu, což má důsledky pro decentralizaci a bezpečnost.                                |
| Vývojáři mohou pomocí vylepšení logiky přidávat do decentralizovaných aplikací nové funkce.                                    | Uživatelé musí důvěřovat vývojářům, že nebudou svévolně upravovat chytré kontrakty.                                                             |
| Vylepšení chytrých kontraktů mohou zvýšit bezpečnost koncových uživatelů, protože chyby lze rychle opravit.                    | Programování funkcí vylepšení do chytrých kontraktů přidává další vrstvu složitosti a zvyšuje možnost kritických chyb.                          |
| Vylepšení kontraktů dávají vývojářům větší prostor pro experimentování s různými funkcemi a vylepšování dappek v průběhu času. | Možnost vylepšovat chytré kontrakty může vývojáře podnítit k rychlejšímu spuštění projektů, aniž by ve fázi vývoje provedli náležitou kontrolu. |
|                                                                                                                                | Nezabezpečené řízení přístupu nebo centralizace v chytrých kontraktech může škodlivým aktérům usnadnit provádění neoprávněných aktualizací.     |

## Co vzít v úvahu při vylepšování chytrých kontraktů {#considerations-for-upgrading-smart-contracts}

1. Používejte bezpečné mechanismy řízení přístupu/autorizace, abyste zabránili neoprávněným vylepšením chytrých kontraktů, zejména pokud používáte proxy vzory, vzory strategií nebo oddělení dat. Příkladem je omezení přístupu k funkci vylepšení tak, aby ji mohl volat pouze vlastník kontraktu.

2. Vylepšení chytrých kontraktů je složitá činnost a vyžaduje vysokou míru pečlivosti, aby se zabránilo zavedení zranitelností.

3. Snižte předpoklady důvěryhodnosti decentralizací procesu provádění vylepšení. Mezi možné strategie patří použití [kontraktu peněženky s více signatáři](/developers/docs/smart-contracts/#multisig) pro kontrolu vylepšení nebo požadavek, aby [členové DAO](/dao/) hlasovali o schválení vylepšení.

4. Uvědomte si náklady spojené s vylepšením kontraktů. Například kopírování stavu (např. zůstatků uživatelů) ze starého kontraktu do nového během migrace kontraktu může vyžadovat více než jednu transakci, což znamená více poplatků za palivo.

5. Zvažte zavedení **časových zámků** pro ochranu uživatelů. Časový zámek označuje zpoždění vynucené pro změny v systému. Časové zámky lze kombinovat se systémem správy s více signály pro řízení vylepšení: pokud navrhovaná akce dosáhne požadovaného prahu schválení, neprovede se, dokud neuplyne předem definovaná doba zpoždění.

Časové zámky dávají uživatelům určitý čas na opuštění systému, pokud nesouhlasí s navrhovanou změnou (např. vylepšením logiky nebo novými systémy poplatků). Bez časových zámků musí uživatelé důvěřovat vývojářům, že neimplementují libovolné změny v chytrém kontraktu bez předchozího upozornění. Nevýhodou je, že časové zámky omezují možnost rychle opravovat zranitelnosti.

## Zdroje {#resources}

**OpenZeppelin Upgrades Plugins – _Sada nástrojů pro nasazení a zabezpečení vylepšitelných chytrých kontraktů._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Dokumentace](https://docs.openzeppelin.com/upgrades)

## Návody {#tutorials}

- [Vylepšení vašich chytrých kontraktů | YouTube Tutoriál](https://www.youtube.com/watch?v=bdXJmWajZRY) od Patrick Collins
- [Tutoriál na migraci chytrého kontraktu na Ethereu](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd) od Austin Griffith
- [Použití UUPS proxy vzoru k vylepšení chytrých kontraktů](https://blog.logrocket.com/author/praneshas/) od Pranesh A.S
- [Web3 Tutoriál: Napište vylepšitelný chytrý kontrakt (proxy) pomocí OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916) od fangjun.eth

## Další informace {#further-reading}

- [Stav vylepšení chytrých kontraktů](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) od Santiago Palladino
- [Více způsobů, jak vylepšit chytrý kontrakt Solidity](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/) – Crypto Market Pool blog
- [Učení: Vylepšení chytrých kontraktů](https://docs.openzeppelin.com/learn/upgrading-smart-contracts) – Dokumentace OpenZeppelin
- [Proxy vzory pro vylepšitelnost kontraktů Solidity: Transparentní vs. UUPS proxy](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0) od Naveen Sahu
- [Jak fungují diamantová vylepšení](https://dev.to/mudgen/how-diamond-upgrades-work-417j) od Nick Mudge
