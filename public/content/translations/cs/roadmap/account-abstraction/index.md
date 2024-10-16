---
title: Abstrakce účtu
description: Přehled plánů Etherea na zjednodušení a větší zabezpečení uživatelských účtů
lang: cs
summaryPoints:
  - Abstrakce účtů usnadňuje vytváření peněženek založených na chytrých kontraktech
  - Chytré kontraktové peněženky výrazně usnadňují správu přístupu k účtům na Ethereu
  - Ztracené nebo zkompromitované klíče lze obnovit pomocí několika záloh
---

# Abstrakce účtu {#account-abstraction}

Uživatelé interagují s Ethereem pomocí **[externě vlastněných účtů (externally owned accounts, EOA)](/glossary/#eoa)**. To je jediný způsob, jak poslat transakci nebo spustit chytrý kontrakt. To limituje možnosti uživatelů interagovat s Ethereem. Např. to komplikuje hromadné posílání transakcí a je nutné, aby uživatelé neustále měli na účtu zůstatek ETH na pokrytí poplatků za palivo.

Abstrakce účtů je způsob, jak tyto problémy vyřešit, a to tak, že uživatelům umožňuje flexibilně naprogramovat do svých účtů větší zabezpečení a lepší uživatelské prostředí. Toho může být dosaženo vylepšením [EOA](https://eips.ethereum.org/EIPS/eip-3074), aby je bylo možné ovládat pomocí chytrých kontraktů, nebo [vylepšením chytrých kontraktů](https://eips.ethereum.org/EIPS/eip-2938), aby mohly iniciovat transakce. Obě možnosti vyžadují změny v protokolu Etherea. Existuje také třetí cesta, která zahrnuje přidání [druhého, samostatného systému zpracovávání transakcí](https://eips.ethereum.org/EIPS/eip-4337), který běží paralelně se stávajícím protokolem. Bez ohledu na způsob je výsledkem přístup k Ethereu prostřednictvím peněženek založených na chytrých kontraktech, buď nativně podporovaných jako součást stávajícího protokolu, nebo prostřednictvím doplňkové transakční sítě.

Peněženky založené na chytrých kontraktech odemykají spoustu výhod pro uživatele, např.:

- definování vlastních flexibilních bezpečnostních pravidel,
- obnovení účtu v případě ztráty klíčů,
- sdílení bezpečnosti účtu mezi důvěryhodnými zařízeními nebo osobami,
- placením poplatků za palivo za někoho jiného, nebo možnost nechat někoho jiného platit za vás,
- hromadné transakce (např. schválení a provedení směny v jednom kroku),
- více příležitostí vývojářů dappek a peněženek vylepšit uživatelskou zkušenost.

Tyto výhody nejsou v současné době nativně podporovány, protože pouze externě vlastněné účty ([EOA](/glossary/#eoa)) mohou zahajovat transakce. EOA jsou jednoduše páry veřejných a privátních klíčů. Fungují takto:

- Pokud máte privátní klíč, můžete dělat cokoliv v rámci pravidel Virtuálního stroje Etherea Machine (EVM).
- V případě, že privátní klíč nemáte, nemůžete dělat _nic_.

Pokud ztratíte klíče, nemohou být obnoveny, a ukradené klíče dávají zlodějům okamžitý přístup ke všem prostředkům na účtu.

Peněženky založené na chytrých kontraktech řeší tyto problémy, ale dnes je obtížné je naprogramovat, protože jakákoliv logika, kterou implementují, musí být nakonec převedena do souboru EOA transakcí, než může být zpracována Ethereem. Abstrakce účtu umožňuje chytrým kontraktům iniciovat transakce samostatně, takže jakákoliv logika, kterou chce uživatel implementovat, může být zakódována přímo do peněženky založené na chytrém kontraktu a spuštěna na Ethereu.

Ve finále zlepšuje abstrakce účtu podporu pro peněženky založené na chytrých kontraktech, což usnadňuje jejich vytváření a zabezpečuje používání. Navíc mohou uživatelé díky abstrakci účtu využívat všech výhod Etherea, aniž by museli znát nebo se starat o podkladovou technologii.

## Za bezpečnostní frází {#beyond-seed-phrases}

Dnešní účty jsou zabezpečeny pomocí privátních klíčů, které jsou vypočítány z bezpečnostních frází. Každý, kdo má přístup k bezpečnostní frázi, může snadno objevit privátní klíč chránící účet a získat přístup ke všem prostředkům. Pokud jsou privátní klíč a bezpečnostní fráze ztraceny, nemohou být nikdy obnoveny a prostředky, které měly zabezpečovat, jsou navždy zmrazeny. Zabezpečení těchto bezpečnostních frází je obtížné i pro odborníky a phishing bezpečnostních frází je jedním z nejběžnějších způsobů podvodů cílených na uživatele.

Abstrakce účtu vyřeší tento problém tím, že použije chytrý kontrakt k uchovávání prostředků a autorizaci transakcí. Tyto chytré kontrakty mohou být následně obohaceny o vlastní logiku, aby byly co nejbezpečnější a přizpůsobily se uživateli na míru. Ve finále stále používáte pro přístup ke svému účtu privátní klíče, ale s bezpečnostními sítěmi, které usnadňují a zabezpečují jejich správu.

Záložní klíče mohou být např. přidány do peněženky, takže pokud ztratíte nebo omylem odhalíte svůj hlavní klíč, může být nahrazen novým, bezpečným klíčem díky souhlasu záložních klíčů. Každý z těchto klíčů můžete různě zabezpečit, nebo je rozdělit mezi důvěryhodné osoby. To zlodějům výrazně komplikuje snahu získat plnou kontrolu nad vašimi prostředky. Podobně můžete přidat do peněženky pravidla, která sníží dopad kompromitování vašeho hlavního klíče. Např. můžete umožnit transakcím s nízkou hodnotou ověření jediným podpisem, zatímco u transakcí s vyšší hodnotou můžete nastavit vyžadování schválení od několika ověřených účtů. Existují i další způsoby, jak vám chytré kontraktové peněženky mohou pomoci odradit zloděje. Např. můžete použít whitelist, který zablokuje každou transakci, pokud není adresována na důvěryhodnou adresu nebo ověřena několika vašimi předem schválenými klíči.

### Příklady bezpečnostní logiky, kterou lze vložit do chytré kontraktové peněženky:

- **Autorizace mnoha podpisy**: Můžete sdílet autorizaci napříč několika důvěryhodnými osobami nebo zařízeními. Kontrakt může být nastaven tak, že transakce přesahující určitou předem danou hodnotu vyžadují autorizaci od určitého podílu (např. 3/5) důvěryhodných stran. Transakce s vysokou hodnotou mohou např. vyžadovat schválení jak od mobilního zařízení, tak od hardwarové peněženky, nebo podpisy od účtů sdílených mezi důvěryhodné členy rodiny.
- **Zmrazení účtu**: Pokud je zařízení ztraceno nebo kompromitováno, může být účet uzamčen z jiného autorizovaného zařízení, což chrání prostředky uživatele.
- **Obnova účtu**: Ztratili jste zařízení nebo zapomněli heslo? V současném paradigmatu to znamená, že vaše prostředky mohou být navždy zmrazeny. S chytrou kontraktovou peněženkou můžete nastavit whitelist účtů, které mohou autorizovat nová zařízení a znovu nastavit přístup.
- **Nastavení limitů transakcí**: Lze určit denní hodnoty pro to, kolik prostředků může být převedeno z účtu za den/týden/měsíc. To znamená, že i když útočník získá přístup k vašemu účtu, nemůže najednou vybrat vše a máte příležitost zmrazit a znovu nastavit přístup.
- **Vytvoření whitelistů**: Umožňuje povolit transakce jen na určité adresy, které označíte jako bezpečné. To znamená, že _i když_ by byl váš privátní klíč zcizen, útočník by mohl posílat prostředky pouze na účty na vašem seznamu. Změna těchto whitelistů by vyžadovala více podpisů, takže útočník nemůže přidat vlastní adresu na seznam, pokud nemá přístup k několika vašim záložním klíčům.

## Lepší uživatelská zkušenost {#better-user-experience}

Abstrakce účtů umožňuje **lepší celkové uživatelské možnosti** a **vylepšenou bezpečnost**, protože přidává podporu pro peněženky založené na chytrých kontraktech na úrovni protokolu. Nejvýznamnějším důvodem je, že poskytne vývojářům chytrých kontraktů, peněženek a aplikací mnohem větší svobodu ve vylepšení uživatelských možností způsoby, které ještě nemusíme být schopni předvídat. Některá zřejmá vylepšení, která přijdou s abstrakcí účtu, zahrnují spojování transakcí za účelem zvýšení rychlosti a efektivity. Jednoduchá směna by např. měla být operací na jedno kliknutí, ale dnes vyžaduje podepsání několika transakcí ke schválení přístupu k jednotlivým tokenům před provedením směny. Abstrakce účtů odstraní tuto nepříjemnost tím, že umožní slučování transakcí. Sloučené transakce by navíc mohly schválit přesně správnou hodnotu tokenů potřebnou pro každou transakci a poté zrušit schválení po dokončení transakce, což posune bezpečnost na další úroveň.

Správa poplatků za palivo je s abstrakcí účtu také výrazně lepší. Nejenže aplikace mohou nabídnout platbu poplatků za palivo svých uživatelů, ale tyto poplatky mohou být placeny tokeny jinými než ETH, což zbavuje uživatele nutnosti mít zůstatek ETH za účelem financování transakcí. To by fungovalo tak, že by se tokeny uživatele v kontraktu směnily za ETH a poté by se ETH použilo k platbě za palivo.

<ExpandableCard title="Jak může abstrakce účtu pomoci s poplatky za palivo?" eventCategory="/roadmap/account-abstraction" eventName="clicked how can account abstraction help with gas?">

Správa poplatků za palivo je jednou z hlavních nepříjemností pro uživatele Etherea, především proto, že ETH je jediné aktivum, které v současnosti mohou k platbě za transakce používat. Představte si, že máte peněženku se zůstatkem USDC, ale bez ETH. Nemůžete tyto USDC tokeny přesunout nebo směnit, protože nemáte jak zaplatit za palivo. Nemůžete také směnit USDC za ETH, protože to samo o sobě vyžaduje palivo. Abyste tento problém vyřešili, museli byste si poslat ETH na účet z burzy nebo jiné adresy. S peněženkami založenými na chytrých kontraktech můžete místo toho platit poplatky za palivov USDC, čímž svůj účet odblokujete. Už nemusíte udržovat zůstatek ETH ve všech svých účtech.

Abstrakce účtu také umožňuje vývojářům dappek určitou kreativitu v přístupu k řízení poplatků za palivo. Např. můžete začít platit své oblíbené decentralizované burze stálý poplatek každý měsíc za neomezené transakce. Platformy dappek by mohly nabídnout placení všech vašich poplatků za palivo za vás jako odměnu za používání jejich platformy nebo jako lákadlo pro nové uživatele. Pro vývojáře bude mnohem snadnější zavádět inovace v oblasti poplatků za palivo, když budou peněženky založené na chytrých kontraktech podporovány už na úrovni protokolu.

</ExpandableCard>

Důvěryhodné relace jsou také potenciálně transformační pro uživatelské možnosti, zejména pro aplikace, jako jsou hry, kde může velké množství malých transakcí vyžadovat rychlé schválení. Individuální schvalování každé transakce by narušilo herní zážitek, ale trvalý souhlas není bezpečný. Chytrá kontraktová peněženka by mohla schválit určité transakce na pevně stanovenou dobu, až do specifické hodnoty nebo pouze pro určité adresy.

Je také zajímavé si představit, jak by se mohlo díky abstrakci účtu změnit nakupování. Dnes každá transakce musí být schválena a poslána z peněženky předfinancované dostatečným množstvím správného tokenu. S abstrakcí účtu by mohlo být prostředí podobnější online nakupování, kde uživatel naplní „košík“ položkami a jedním klikem zaplatí všechny najednou, přičemž veškerá potřebná logika by byla zpracována kontraktem, nikoliv uživatelem.

Toto je jen několik příkladů, jak by mohly být uživatelské možnosti vylepšeny pomocí abstrakce účtu, ale použití je mnohem širší a spousta z nich je ještě za hranicemi naší fantazie. Abstrakce účtů osvobozuje vývojáře od omezení současných EOA, přenáší pozitivní aspekty web2 do web3 bez nutnosti obětovat samosprávu a umožňuje kreativně vytvářet nové uživatelské možnosti.

## Jak bude abstrakce účtu implementována? {#how-will-aa-be-implemented}

Peněženky založené na chytrých kontraktech už existují, ale jejich implementace je složitá, protože EVM je nepodporuje. Místo toho se spoléhají na obalení relativně složitého kódu kolem standardních Ethereum transakcí. Ethereum může tuto situaci změnit tím, že umožní chytrým kontraktům iniciovat transakce, přičemž nezbytnou logiku zpracovává v chytrých kontraktech přímo na Ethereu namísto zpracování mimo řetězec. Umístění logiky do chytrých kontraktů také zvyšuje decentralizaci Etherea, protože odstraňuje potřebu „převaděčů“ spuštěných vývojáři peněženek, kteří překládají zprávy podepsané uživateli na běžné Ethereum transakce.

<ExpandableCard title="EIP-2771: abstrakce účtu pomocí meta-transakcí" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-2771: account abstraction using meta-transactions">

EIP-2771 zavádí koncept meta-transakcí, které umožňují třetím stranám platit náklady na palivo uživatelů, aniž by se měnil protokol Ethereum. Myšlenkou je, že transakce podepsané uživateli jsou odesílány do Přeposílacího kontraktu. Přeposílací kontrakt je důvěryhodný subjekt, který ověřuje platnost transakcí, než je pošle na relé paliva. Toto se provádí mimo blockchain, což eliminuje potřebu platit za palivo. Relé paliva pak přenáší transakci na Přijímací kontrakt, který platí potřebný poplatek, aby mohla být transakce vykonatelná na Ethereu. Transakce je provedena, pokud je Přeposílací kontrakt známý a důvěryhodný pro Přijímací kontrakt. Tento model usnadňuje vývojářům implementaci transakcí bez poplatků za palivo na straně uživatele.

</ExpandableCard>

<ExpandableCard title="EIP-4337: abstrakce účtu bez změny protokolu Ethereum" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-4337: account abstraction without changing the Ethereum protocol">

EIP-4337 je prvním krokem směrem k nativní podpoře chytrých kontraktových peněženek decentralizovaným způsobem, <em>aniž by bylo potřeba měnit protokol Ethereum</em>. Místo úpravy konsenzuální vrstvy pro podporu chytrých kontraktových peněženek je přidán nový systém odděleně od běžného transakčního komunikačního protokolu. Tento vysoceúrovňový systém je postaven kolem nového objektu nazývaného <code>UserOperation</code>, který balí akce uživatele spolu s relevantními podpisy. Tyto objekty <code>UserOperation</code> jsou následně posílány do specializovaného mempoolu, kde je validátoři shromažďují do „balíčkové transakce“. Balíčková transakce představuje sekvenci mnoha jednotlivých objektů <code>UserOperation</code> a může být zahrnuta do bloků na Ethereu stejně jako běžná transakce, a může být vybírána validátory pomocí podobného modelu maximizace poplatků.

Způsob, jakým peněženky fungují, by se se zavedením EIP-4337 také změnil. Místo toho, aby každá peněženka znovu implementovala běžnou, ale složitou bezpečnostní logiku, by tyto funkce byly outsourcovány do globálního peněženkového kontraktu známého jako „vstupní bod“. Ten by spravoval operace, jako je platba poplatků a spuštění EVM kódu, takže vývojáři peněženek se mohou soustředit na poskytování vynikajících uživatelských funkcí.

<strong>Poznámka:</strong> Kontrakt vstupního bodu EIP-4337 byl nasazen na hlavní síť Etherea 1. března 2023. Můžete se na něj podívat na <a href="https://etherscan.io/address/0x0576a174D229E3cFA37253523E645A78A0C91B57">Etherscanu</a>.

</ExpandableCard>

<ExpandableCard title="EIP-2938: změna protokolu Ethereum za účelem podpory abstrakce účtu" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-2938: changing the Ethereum protocol to support account abstraction">

<a href="https://eips.ethereum.org/EIPS/eip-2938">EIP-2938</a> si klade za cíl vylepšit protokol Ethereum zavedením nového typu transakce, <code>AA_TX_TYPE</code>, který zahrnuje tři položky: <code>nonce</code>, <code>target</code> a <code>data</code>, kde <code>nonce</code> je čítač transakcí, <code>target</code> je cílová adresa kontraktu vstupního bodu a <code>data</code> je bytecode EVM. Za účelem vykonání těchto transakcí je třeba přidat do EVM dvě nové instrukce (známé jako opkódy): <code>NONCE</code> a <code>PAYGAS</code>. Opkód <code>NONCE</code> sleduje sekvenci transakcí a <code>PAYGAS</code> počítá a vybírá ze zůstatku kontraktu poplatek za palivo potřebný k vykonání transakce. Tyto nové funkce umožňují Ethereu podporovat chytré kontraktové peněženky nativně, protože potřebná infrastruktura je zabudována do protokolu Ethereum.

Připomínáme, že EIP-2938 v současné době není aktivní. Komunita aktuálně upřednostňuje EIP-4337, protože nevyžaduje změny protokolu.

</ExpandableCard>

<ExpandableCard title="EIP-3074: vylepšení externě vlastněných účtů pro abstrakci účtu" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-3074: upgrading externally-owned accounts for account abstraction">

<a href="https://eips.ethereum.org/EIPS/eip-3074">EIP-3074</a> si klade za cíl aktualizovat externě vlastněné účty na Ethereu tím, že umožní delegování kontroly nad nimi na chytrý kontrakt. To znamená, že logika chytrého kontraktu by mohla schvalovat transakce pocházející z EOA (externě vlastněného účtu). To by umožnilo funkce jako sponzorování poplatků za palivo a sdružování transakcí. Aby to fungovalo, je třeba do EVM přidat dva nové opkódy: <code>AUTH</code> a <code>AUTHCALL</code>. S EIP-3074 jsou výhody chytrých kontraktových peněženek dostupné <em>bez nutnosti kontraktu</em> – místo toho zpracovává transakce specifický typ stateless, trustless, nevylepšitelného kontraktu známého jako "započínač".

Připomínáme, že EIP-3074 v současné době není aktivní. Komunita aktuálně upřednostňuje EIP-4337, protože nevyžaduje změny protokolu.

</ExpandableCard>

## Aktuální průběh {#current-progress}

Peněženky založené na chytrých kontraktech jsou už k dispozici, ale je třeba uvést do chodu další vylepšení, aby byly co nejvíce decentralizované a přístupné bez nutnosti povolení třetí strany. EIP-4337 je hotový návrh, který nevyžaduje žádné změny protokolu Ethereum, takže je možné, že bude implementován rychle. Nicméně vylepšení, která mění protokol Ethereum, nejsou v současné době aktivně vyvíjena, takže může trvat mnohem déle, než budou tyto změny realizovány. Je také možné, že abstrakce účtu bude dostatečně dosažena prostřednictvím EIP-4337, takže žádné změny protokolu nebudou nikdy potřeba.

## Další informace {#further-reading}

- [erc4337.io](https://www.erc4337.io/)
- [Panelová diskuze o abstrakci účtu na Devconu v Bogotě](https://www.youtube.com/watch?app=desktop&v=WsZBymiyT-8)
- [„Proč je abstrakce účtů revoluční pro dappky“ z Devconu v Bogotě](https://www.youtube.com/watch?v=OwppworJGzs)
- [„Abstrakce účtů ELI5“ z Devconu v Bogotě](https://www.youtube.com/watch?v=QuYZWJj65AY)
- [Vitalikovy poznámky „Cesta k abstrakci účtů“](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Vitalikův blogový příspěvek o společenském obnovování peněženek](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Poznámky k EIP-2938](https://hackmd.io/@SamWilsn/ryhxoGp4D#What-is-EIP-2938)
- [Dokumentace k EIP-2938](https://eips.ethereum.org/EIPS/eip-2938)
- [Poznámky k EIP-4337](https://medium.com/infinitism/erc-4337-account-abstraction-without-ethereum-protocol-changes-d75c9d94dc4a)
- [Dokumentace k EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Dokumentace k EIP-2771](https://eips.ethereum.org/EIPS/eip-2771)
- [„Základy abstrakce účtů“ – Co je abstrakce účtů, část I](https://www.alchemy.com/blog/account-abstraction)
