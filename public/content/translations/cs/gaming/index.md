---
title: Hraní her na Ethereu
lang: cs
template: use-cases
image: /images/robot-help-bar.png
sidebarDepth: 2
summaryPoint1: Pravidla hry a její stav může vynucovat blockchain Etherea, nikoli servery studia, což je klíčová výhoda her na blockchainu.
summaryPoint2: Kdokoli může vytvářet mody, boty nebo zcela nové hry, které se napojí na stejná otevřená data na blockchainu.
summaryPoint3: Účelové L2 umožňují hraní v reálném čase s nižšími poplatky, zatímco frameworky pro vývoj her zpřístupňují vytváření her na blockchainu více než kdy jindy.
buttons:
  - content: Další informace
    toId: gaming-on-ethereum
  - content: Prozkoumat hry
    toId: hry
    isSecondary: false
---

## Hraní her na Ethereu {#gaming-on-ethereum}

Hraní her na Ethereu má různé podoby, od her, které využívají blockchain pro specifické funkce, až po ty, kde celý herní svět žije na blockchainu. Blockchain Etherea lze ve hrách využívat v různých kapacitách. Hry mohou ukládat své měny jako přenositelné tokeny nebo jiná herní aktiva (postavy, vybavení, mazlíčci atd.) ve formě [NFT (nezaměnitelných tokenů)](/nft/). Hry mohou také využívat smart kontrakty k hostování své logiky, pravidel a stavu na blockchainu. Takové hry se běžně označují jako „hry plně na blockchainu“.

Ekosystém Etherea také zahrnuje [blockchainy druhé vrstvy (L2)](/layer-2/learn/), které dědí bezpečnostní záruky Mainnetu Etherea a zároveň rozšiřují škálovatelnost Etherea a podporují specializované případy použití. Sítě L2 mohou poskytnout další výhody pro hry na blockchainu a jejich komunity, protože L2 mohou nabídnout rychlejší dobu potvrzení, větší objem zpracování a nižší poplatky, díky čemuž je hraní rychlejší a dostupnější.

## Přehled herního ekosystému Etherea {#ethereums-gaming-ecosystem-overview}

- **Druhé vrstvy:** Díky levnějším poplatkům a krátkým transakčním časům se L2 staly běžným místem pro spouštění her. Mezi nejlepší druhé vrstvy s hrami patří: Starknet, Immutable, Base a Abstract.
- **Infrastruktura:** Pro usnadnění vývoje her na blockchainu existuje řada sad nástrojů, které lze použít s vlastním projektem, včetně: Cartridge, Dojo, Proof of Play a Thirdweb.
- **Herní cechy:** Hráči, kteří chtějí být součástí herní komunity, se mohou připojit k herním cechům, aby strategizovali a spolupracovali s ostatními hráči v cechu. Mezi významné cechy patří: YGG, WASD, LegacyGG, Gaming Grid, OLAGG a další.
- **Hry:** Hry na Ethereu mají různé tvary a velikosti, od strategických her v reálném čase jako _Realms: Eternum_, přes MMO _Axie: Atia's Legacy_, akční RPG _Fableborn_, až po gamifikované platformy DeFi jako _Ponziland_. S novými hrami, které se pravidelně spouštějí na různých řetězcích, je stále co objevovat.

## Hry k vyzkoušení {#games}

<CategoryAppsGrid category="gaming" />

## Vlastnosti her na blockchainu {#features-of-onchain-games}

1. **Bezpečný způsob výměny digitálního zboží**

   Obchodovatelná herní aktiva lze mezi hráči vyměňovat za jiná herní aktiva nebo tokeny na daném řetězci. Hry v minulosti běžně čelily výzvě, jak usnadnit spravedlivý obchod mezi hráči, zejména u vzácných a cenných předmětů. Tržiště třetích stran a obchodování peer-to-peer často vedly k tomu, že byli hráči oklamáni nebo podvedeni o svůj cenný majetek. Protože aktiva na blockchainu dodržují zavedenou datovou strukturu, lze je snadno integrovat s existujícími tržišti, což hráčům při jejich výměně poskytuje klid. Pokroky v AMM také umožňují hráčům okamžitě obchodovat s určitými předměty, aniž by museli čekat na protistranu (kupujícího/prodávajícího), aby dokončili svůj obchod.

2. **Transparentní původ aktiv**

   Padělky a kopie originálů mohou být při oceňování předmětů značným problémem, zvláště pokud daná osoba není příliš obeznámena s tím, jak rozlišit skutečný předmět od padělku. Aktiva na blockchainu mají vždy úplnou historii záznamů o tom, kdo (která peněženka) je vlastnil, a jejich původní adresu. I když na blockchainu existuje dokonalá kopie předmětu, je na základě svého původního smart kontraktu jasně odlišena od originálu, což snižuje riziko podvodu.

3. **Transparentní logika**

   Hry plně na blockchainu používají pro svou funkčnost smart kontrakty. To znamená, že kdokoli může zkontrolovat a ověřit logiku hry a ujistit se, že funguje tak, jak to vývojáři zamýšleli. Tato transparentnost logiky také umožňuje ostatním vývojářům vytvářet nové smart kontrakty, které mohou hru rozšířit nebo být integrovány s některými jejími funkcemi.

4. **Prokazatelné úspěchy**

   Ve hrách plně na blockchainu je každá akce hráče zaznamenána na blockchainu. To velmi usnadňuje kontrolu a ověření, zda hráč provedl akce potřebné pro určitý milník/úspěch. Vzhledem k neměnné povaze blockchainů zůstanou tyto záznamy o úspěších nedotčené, dokud bude řetězec v provozu, a může je ověřit kterákoli strana (nejen vývojáři, jak je běžné v tradičním hraní).

5. **Hry navždy**

   Hráči investují spoustu času a úsilí do budování své herní pověsti a postav, ale tento pokrok může být snadno ztracen, pokud se vývojáři rozhodnou vypnout servery (zejména pokud jde o online hru). Vzhledem k tomu, že hry plně na blockchainu ukládají svou logiku a stav na blockchainu, mohou hráči stále interagovat se smart kontrakty hry, i když hlavní vývojář hry ukončí vývoj. Takové hry lze stále hrát a nadále dostávat aktualizace od jejich komunit, protože jejich logika stále běží na blockchainu.

## Jak hry integrují blockchainy {#how-games-integrate-blockchains}

Vývojáři her se mohou rozhodnout začlenit do svých her různé funkce Etherea. To, že funkce existují, neznamená, že je musí používat každá hra postavená na Ethereu, protože existují alternativní řešení (s vlastními klady a zápory), která mohou vývojáři místo toho použít.

### Přihlášení přes Ethereum {#sign-in-with-ethereum}

Hráči mohou k přihlášení do hry používat své účty na blockchainu. To se obvykle usnadňuje podepsáním transakce pomocí web3 peněženky hráče. Hráči pak mohou držet svá herní aktiva a přenášet svou hráčskou reputaci na jednom účtu napříč všemi hrami, do kterých se přihlašují pomocí stejné peněženky. [EVM](/developers/docs/evm/) Etherea je běžně používaný standard na mnoha blockchainech, takže hráč může často používat stejný účet k přihlášení do her na jakémkoli blockchainu kompatibilním s EVM, který peněženka podporuje (poznámka: některé web3 peněženky vyžadují ruční import RPC, zejména pro novější blockchainy, než je lze na daném řetězci k čemukoli použít).

### Zastupitelné tokeny {#fungible-tokens}

Stejně jako Ether mohou být zastupitelné herní zdroje a měny uloženy na blockchainu jako zastupitelné tokeny. Tokeny lze poté posílat mezi adresami a používat je ve smart kontraktech, což hráčům umožňuje obchodovat nebo darovat herní zdroje a měny na otevřených trzích.

### Nezaměnitelné tokeny {#non-fungible-tokens}

Nezaměnitelné tokeny (NFT) mohou představovat jedinečné herní prvky, jako jsou postavy, předměty, pozemky nebo dokonce uložené stavy. Díky dynamickým metadatům se NFT mohou vyvíjet v reakci na herní události, což umožňuje, aby aktiva v průběhu času nesla historii. Například NFT šelem ve hře Loot Survivor trvale zaznamenávají, kdy konkrétní hráč porazí jedinečné stvoření, a vkládají tento výsledek do samotného NFT aktiva. Tento druh designu směřuje ke hrám, kde jsou aktiva perzistentní, stavová a potenciálně použitelná napříč několika zážitky na blockchainu, spíše než statické sběratelské předměty.

### Chytré kontrakty {#smart-contracts}

Hry plně na blockchainu používají smart kontrakty k vytvoření transparentní a neměnné herní logiky. V takových případech slouží blockchain jako backend hry a nahrazuje potřebu hostovat její logiku a úložiště dat na centralizovaném serveru. (Poznámka: ne všechny web3 hry jsou plně onchainové hry. Jak již bylo zmíněno, záleží na každém jednotlivém případu, kolik dat a logiky hry je uloženo na blockchainu, oproti jiné vrstvě dostupnosti dat nebo na klasickém serveru.)

## Vývoj vylepšení UX pro hráče {#evolution-of-player-ux-improvements}

### Interoperabilita a hraní napříč řetězci {#interoperability-and-cross-chain-play}

Pokroky v cross-chain interakcích a přemostění umožňují hráčům přístup ke hrám na Ethereu plynuleji než kdykoli předtím. Hry mohou být nasazeny na více blockchainech a aktiva jedné hry na blockchainu mohou být integrována jinou hrou. V minulosti se od hráčů obvykle vyžadovalo, aby přemostili své prostředky na jiný řetězec, než je mohli začít používat ve hře. V dnešní době hry běžně integrují přemostění tokenů do jiných řetězců, aby usnadnily nástup hráčů.

### Vylepšení škálovatelnosti a transakčních poplatků {#scalability-and-gas-fee-improvements}

V roce 2017 šílenství kolem CryptoKitties dramaticky zvýšilo transakční poplatky pro všechny uživatele provádějící transakce na Ethereu. Od té doby bylo v rámci vylepšení sítě úspěšně nasazeno mnoho návrhů na vylepšení platformy Ethereum, které zvýšily šířku pásma Mainnetu Etherea a výrazně snížily průměrné transakční poplatky. Druhé vrstvy dále rozšiřují dostupnou propustnost a snižují transakční poplatky na centy nebo ještě níže. Nižší poplatky a vyšší propustnost rozšířily případy použití her, které lze na Ethereu postavit, a podporují akce s velkým objemem a herní mikrotransakce, které neodrazují běžné hráče cenou.

### Přihlášení přes sociální sítě {#social-logins}

Přihlášení pomocí účtu Ethereum na blockchainu, který lze použít na všech blockchainech kompatibilních s EVM, je jednou z nejběžnějších metod ověřování. Některé řetězce, které nejsou EVM, ji také používají jako možnost pro vytvoření účtu. Pokud však nový hráč nemá existující účet Ethereum a chce si snadno vytvořit účet pro přihlášení do hry, [abstrakce účtu](/roadmap/account-abstraction/) mu umožní přihlásit se pomocí svých sociálních účtů a vytvořit si účet Ethereum na pozadí.

### Paymaster a klíče relace {#paymaster-and-session-keys}

Placení poplatků za palivo za odesílání transakcí na blockchainu nebo interakci se smart kontrakty může být pro mnoho nových hráčů významným třecím bodem. Účty Paymaster mohou být financovány hráčem nebo dotovány hrou. Klíče relace umožňují hráči zůstat přihlášený do hry po celou dobu trvání jeho relace, což vyžaduje, aby podepsal pouze první zprávu své relace, přičemž další zprávy jsou podepsány na pozadí.

Kolem těchto mechanik existují protichůdné filozofie. Hlavním příkladem je Kamigotchi od Initia, který považuje palivo placené hráčem za přímý příjem. Naopak herní ekosystém Realms.World, který zahrnuje více než 4 živé hry plně na blockchainu na Starknetu, zaujímá opačný přístup. Všechny hry v ekosystému používají Cartridge Paymaster, což hráčům umožňuje interagovat s hrami bez nákladů na palivo. Zatímco Kamigotchi přijímá poplatky za palivo jako součást ekonomického designu, hry Realms.World vnímají náklady na palivo především jako překážku pro zážitek hráče.

## Začněte s hraním na Ethereu {#get-started-with-gaming-on-ethereum}

1. **Najděte si zábavnou hru** – Projděte si hry uvedené výše nebo prozkoumejte platformy jako [ChainPlay](https://chainplay.gg/chain/ethereum/), [Gam3s.GG](https://gam3s.gg/) a [DappRadar](https://dappradar.com/rankings/protocol/ethereum/category/games).
2. **Nastavte si svou krypto peněženku** – Budete potřebovat peněženku pro správu svých digitálních herních aktiv a (v některých případech) pro přihlášení do her. [Zde si vyberte peněženku](/wallets/find-wallet/).
3. **Financujte svou peněženku** – Pořiďte si nějaké ethery (ETH) nebo tokeny relevantní pro síť druhé vrstvy, kterou plánujete používat.
4. **Hrajte** – Začněte hrát a užívejte si skutečné vlastnictví svého herního pokroku.
