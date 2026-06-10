---
title: "Proč stavět na Ethereu"
description: "Decentralizace, odolnost vůči cenzuře, nasazení nevyžadující povolení a skládatelnost nejsou oddělené prodejní argumenty. Vzájemně se posilují. Praktický průvodce, proč by si tvůrci měli vybrat Ethereum."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "decentralizace"
  - "odolnost vůči cenzuře"
  - "skládatelnost"
published: 2026-05-12
image: /images/developers/blog/latest-post-header-1.png
breadcrumb: "Proč stavět na Ethereu"
lang: cs
---

Tvůrci si vybírají infrastrukturu podle slibů, které jejich aplikace musí dodržet.

Většina softwarových slibů závisí na provozovateli. Poskytovatel cloudu udržuje server v chodu. Platforma udržuje účet otevřený. Zprostředkovatel plateb udržuje obchodníka aktivního. Poskytovatel API udržuje klíč v platnosti. Pro mnoho produktů je to v pořádku. Nestačí to však, když hodnota produktu závisí na neutrálním přístupu, sdíleném stavu a závazcích, které si uživatelé a další vývojáři mohou sami ověřit.

Ethereum je postaveno pro druhý případ, kdy jsou produktem neutrální přístup a ověřitelné závazky. Nikdo ho nevlastní. Řetězec běží v mnoha zemích, u mnoha provozovatelů a na mnoha nezávislých implementacích klientů a žádná jednotlivá společnost, validátor ani nadace nemůže potichu přepsat pravidla. Pro tvůrce to znamená, že to není jen místo pro hostování kódu. Je to místo pro přijímání veřejných závazků. Můžete vydávat software, aniž byste se kohokoli ptali, uživatelé se mohou nadále dostat k tomu, co nasadíte, další vývojáři na tom mohou stavět bez vašeho povolení a vaše aplikace může nadále fungovat, i když jakákoli strana, včetně vás, přestane spolupracovat.

## Decentralizace {#decentralization}

Decentralizace je základem, na kterém tyto vlastnosti stojí. Ethereum ji zajišťuje prostřednictvím sítě počítačů, zvaných uzly, z nichž každý uchovává kopii řetězce a kontroluje každou transakci. Každý uzel spouští klientský software. Podmnožina uzlů, zvaná validátory, se střídá v navrhování a potvrzování nových bloků prostřednictvím procesu zvaného konsensus. Aby se validátoři mohli zúčastnit, vkládají ETH jako zajištění, zvané stake, o které přijdou, pokud poruší pravidla. V dubnu 2026 bylo v nástroji pro sledování uzlů Etherscan sledováno přibližně 13 700 až 14 000 uzlů, rozmístěných ve Spojených státech, Německu, Číně, Spojeném království, Rusku, Japonsku a desítkách dalších zemí.

Decentralizace je také ekonomická. Přibližně 32 až 36 milionů ETH, tedy asi 27 až 29 % nabídky, je stakováno jako zajištění, které protokol oseká (slashing), když se validátoři prokazatelně chovají nesprávně. Útočník by musel získat a riskovat smysluplný zlomek tohoto staku, aby mohl řetězec narušit. Při cenách ETH v dubnu 2026 to znamená, že by v sázce byly desítky miliard dolarů.

Dalším rozměrem je samotný software. Každý uzel Etherea spouští dva kusy softwaru vedle sebe. Exekuční klient spouští EVM a sleduje stav kontraktu. Konsensuální klient řeší důkaz podílem (PoS). Sleduje, kteří validátoři navrhují bloky, které bloky síť přijímá a kdy se blok stává finálním. Zdravá decentralizace potřebuje více nezávislých implementací každého z nich, aby se chyba v jednom klientovi automaticky nestala chybou v Ethereu.

Exekuční vrstva má v produkci pět hlavních klientů. Geth běží zhruba na 50 %, Nethermind kolem 25 %, Besu kolem 9 %, Reth kolem 8 % a Erigon kolem 7 %. Vrstva konsensu běží na klientech Lighthouse, Prysm, Teku, Nimbus, Lodestar a dalších. Ethereum není řetězec s jedním klientem na žádné z těchto vrstev.

Téměř 50% podíl klienta Geth je skutečnou slabinou. Chyba v menšinovém klientovi je pro jeho provozovatele bolestivá, ale zbytek sítě může pokračovat. Závažná chyba ve většinovém klientovi je nebezpečnější. Proto je klientská diverzita živou provozní prioritou.

Tato priorita již byla otestována. Ethereum od svého vzniku (genesis) 30. července 2015 nikdy nezažilo úplné zastavení řetězce. Nejblíže k velkému incidentu mělo ve dnech 11. až 12. května 2023, kdy vrstva konsensu, zvaná Beacon chain, nedokázala dosáhnout finality po dobu asi 25 minut a později po dobu asi 64 minut. Příčinou byla chyba v klientovi Prysm. Finalita vyžaduje, aby atestovaly více než dvě třetiny validátorů, a podíl klienta Prysm byl v té době dostatečně vysoký na to, aby jeho problém krátce stáhl síť pod tuto hranici.

Zastavení finality není totéž co zastavení řetězce. Nové bloky se nadále vytvářely, transakce se nadále zahrnovaly a většina uživatelů a aplikací nadále fungovala. To, co se zastavilo, byla nejsilnější záruka vypořádání Etherea. Za normálních předpokladů konsensu nelze blok starší než zhruba 13 minut vrátit zpět. Mosty, burzy a další systémy, které před připsáním vkladů čekají na finalitu, by tyto toky pozastavily. Samotný řetězec se automaticky zotavil, jakmile se dostatečný počet validátorů synchronizoval, a to bez manuálního zásahu.

Pro tvůrce je tato historie důležitá. Pokud budou jiní lidé držet aktiva ve vašich kontraktech, směrovat objednávky přes váš trh nebo stavět na vašem primitivu, potřebují, aby základy pod ním fungovaly i přes chyby, selhání klientů a institucionální tlak.

## Odolnost vůči cenzuře {#censorship-resistance}

Decentralizace je struktura. Odolnost vůči cenzuře je jednou z praktických věcí, které přináší. Uživatelé by neměli potřebovat povolení od společnosti, vlády, relé, validátoru, poskytovatele RPC nebo provozovatele aplikace, aby mohli odeslat platnou transakci do vašich kontraktů.

To neznamená, že každá transakce skončí v dalším bloku. Znamená to, že žádná jednotlivá strana nemůže udržet platnou transakci mimo řetězec navždy. Každý blok navrhuje jiný validátor, který při jeho sestavování spolupracuje s externími stranami, zvanými tvůrci a relé. Pokud jeden z nich vaši transakci vyfiltruje, další slot má jinou sadu a nakonec ji jeden z nich zahrne. Cenzura by musela přetrvat napříč celou touto rotující sestavou, což je mnohem těžší, než když jeden provozovatel řekne ne. Období po kauze Tornado Cash ukázalo, jak to vypadá pod tlakem.

Tornado Cash je mixážní kontrakt pro soukromí, který přerušuje onchain spojení mezi vkladem a výběrem. Poté, co na něj úřad OFAC v srpnu 2022 uvalil sankce, několik hlavních relé MEV-Boost odmítlo přeposílat bloky obsahující transakce ze sankcionovaných adres. Podíl bloků vytvořených prostřednictvím těchto relé vyhovujících OFAC dosáhl vrcholu téměř 79 % v listopadu 2022. Zbývajících 21 % pocházelo od relé a tvůrců, kteří nefiltrovali, takže transakce Tornado Cash stále procházely, jen pomaleji. Očekávaná doba čekání se zvýšila z přibližně 12 sekund na zhruba minutu.

Vypadalo to znepokojivě a také bylo. Pak ale tento podíl klesl. Byla spuštěna nová relé explicitně bez filtrů, včetně Ultra Sound a Agnostic, a navrhovatelé je mohli volně přidat do svého nastavení MEV-Boost. Nikdo nemohl donutit každého navrhovatele, aby používal filtrující relé, takže podíl nemohl zůstat na svém vrcholu. Na začátku roku 2023 klesl pod 50 % a po zbytek roku 2023 se pohyboval mezi 27 % a 47 %. Úřad OFAC vyřadil Tornado Cash ze sankčního seznamu v březnu 2025. Tato epizoda zůstává nejjasnějším zátěžovým testem odolnosti Etherea vůči cenzuře.

Ethereum také přesouvá větší část této záruky do samotného protokolu. Plánovaný upgrade zvaný FOCIL (EIP-7805) přidává seznamy pro zahrnutí (inclusion lists). Náhodně vybraní validátoři zveřejňují transakce, které vidí ve veřejném mempoolu, a očekává se, že další blok těmto seznamům vyhoví. Pokud je blok ignoruje, zbytek sítě jej může odmítnout. Nikdo tedy nemůže vašim uživatelům zabránit v používání vaší aplikace.

## Nevyžadující povolení {#permissionless}

Odolnost vůči cenzuře je o tom, zda se uživatelé mohou k vaší aplikaci dostat i po jejím vydání. Vlastnost nevyžadující povolení je o tom, zda ji vůbec můžete vydat.

Nasazení na Ethereu nevyžaduje partnerství, účet, schválení k zařazení, kontrolu v obchodě s aplikacemi ani komerční dohodu. Kdokoli může nasadit kód, zavolat kontrakt, provozovat uzel, indexovat data, vytvořit peněženku nebo publikovat rozhraní. Základní vrstva neví, zda jste startup, banka, samostatný vývojář, agent, DAO nebo uživatel bez jakékoli společnosti.

To mění model tvůrce. Na platformě může její vlastník změnit podmínky, zrušit klíče, zablokovat regiony, odstranit aplikace nebo podmínit přístup obchodním vztahem. Na Ethereu protokol vyhodnocuje transakce podle stejných veřejných pravidel pro jakéhokoli volajícího. Kontrakt nasazený dnes se řídí těmito veřejnými pravidly pro každou adresu tak dlouho, dokud řetězec běží.

Tím se neodstraní každá závislost. Většina uživatelů se k vašim kontraktům nedostane přímo. Procházejí přes frontend, peněženku a poskytovatele RPC a kterákoli z těchto vrstev se může porouchat nebo filtrovat. Frontendy mohou být staženy. Poskytovatelé RPC, tedy služby, které směrují většinu požadavků aplikací a peněženek do řetězce, mohou odmítnout přeposílat transakce nebo zablokovat konkrétní regiony a adresy. Peněženky si mohou vybrat, co budou zobrazovat.

Základní exekuční prostředí pod tím vším zůstává otevřené. Pokud váš frontend spadne, uživatel může stále zavolat kontrakt přímo a jiný vývojář může vytvořit nové rozhraní. Pokud peněženka přestane podporovat váš token, kontrakt stále funguje. Pokud jeden poskytovatel RPC filtruje, aplikace může směrovat provoz přes jiného nebo spustit svůj vlastní uzel, aby se dostala do sítě.

## Skládatelnost {#composability}

Vlastnost nevyžadující povolení dostane váš kód do řetězce. Jakmile tam je, nikdo ho nemůže stáhnout, takže ostatní vývojáři mohou stavět na vašich kontraktech a vy můžete stavět na jejich.

WETH je nejčistším příkladem. Je to kontrakt, který zabalí ETH, aby mohl být použit jako standardní token v jiných kontraktech. Nachází se na jedné pevné adrese Etherea, k květnu 2026 drží asi 1,8 milionu WETH, má zhruba 3,25 milionu držitelů a funguje jako společná jednotka napříč DEXy, trhy pro půjčování, trezory a mosty. Je to kód, který mohou tisíce dalších kontraktů a aplikací používat přímo.

Tento vzorec se opakuje napříč celým ekosystémem. Od svého vzniku do začátku roku 2025 zaznamenalo Ethereum podle výpočtů společnosti Zellic desítky milionů nasazení kontraktů a zhruba 2,5 milionu unikátních bajtkódů. Standardy jako ERC-20 pro zastupitelné tokeny a ERC-721 pro nezastupitelné tokeny (NFT) se staly koordinačními vrstvami. Token, který váš kontrakt vydá, může být obchodován na DEXu, použit jako zástava na peněžním trhu, indexován analytickými nástroji, zobrazen v peněženkách a přemostěn nebo zabalen jinými systémy, aniž by každý tým musel vyjednávat vlastní dohodu.

K květnu 2026 se v decentralizovaných financích (DeFi) na Ethereu nacházelo přibližně 46 miliard dolarů. Tyto peníze jsou uzamčeny v tisících fungujících protokolů, včetně aktiv, trhů, oráklů, peněženek, systémů účtů, kontraktů pro správu, mostů, analytiky a vývojářských nástrojů. To vše je kód, který můžete zavolat přímo od prvního dne, místo abyste stavěli od nuly nebo čekali na partnerství.

## Ekonomika agentů {#the-agent-economy}

Přístup nevyžadující povolení a odolnost vůči cenzuře, s decentralizací v pozadí, jsou pro další vlnu uživatelů vstupujících do Etherea ještě důležitější. Agenti umělé inteligence (AI) jsou touto vlnou a platí za služby, drží kapitál a vypořádávají se s ostatními agenty prostřednictvím transakcí a volání kontraktů, a to vše bez zásahu člověka. Agent nemá žádnou kartu, kterou by mohl zatížit, žádný účet na platformě, který by mohl být pozastaven, a žádného člověka, kterému by mohl zavolat, když relé odmítne přeposlat transakci. Proto obojí přestává být pro tento druh softwaru volitelné a vlastnosti Etherea přímo odpovídají tomu, co agent skutečně potřebuje. Očekává se, že se tato ekonomika odehraje právě na Ethereu, což by mohlo nesmírně rozšířit uživatelskou základnu.

Ať už vydáte agenta, nebo vydáte kontrakty, které agent volá, objevují se stejné problémy. V typickém hostovaném stacku je identita agenta pronajata z účtu platformy, který může být zrušen. Jeho platby závisí na lidské kartě nebo klíči API. Jeho pravidla běží na serveru, který ovládá provozovatel. Jeho kontinuita závisí na hostiteli, který může zmizet. Každá z těchto závislostí je tím, co má základní vrstva Etherea odstranit.

Na Ethereu nic z toho nezávisí na provozovateli. Klíče agenta jsou jeho vlastní a pravidla, proti kterým se podepisuje, nelze jednostranně přepsat. Jeho transakce procházejí stejnou rotující sestavou validátorů, tvůrců a relé, která chrání jakoukoli jinou adresu před cíleným blokováním. Přechody stavů probíhají veřejně, takže kontrakty na druhé straně volání nemusí důvěřovat provozovateli, že nahlásí, co se stalo.

Infrastruktura je již připravena. Chytré kontrakty, stablecoiny a abstrakce účtu dávají autonomnímu aktérovi již dnes fungující adresu, fungující zůstatek a programovatelné limity útraty. Standardy pro identitu agentů a strojové platby je dohánějí. ERC-8004 definuje onchain registry pro identitu, reputaci a validaci agentů. Standard x402 používá stavový kód HTTP 402, aby umožnil klientům, včetně agentů, platit za API a digitální služby ve stablecoinech bez tradičních účtů. Adopce je v rané fázi, ale postupuje a integrační plocha je malá. Přijímejte platby x402 na svých koncových bodech, registrujte nebo kontrolujte identitu prostřednictvím ERC-8004 a zacházejte s adresami agentů ve svých kontraktech jako s plnohodnotnými uživateli.

Pro každého tvůrce, který si vybírá řetězec pro nasazení, jsou agenti další formující se třídou uživatelů a koleje jsou již v provozu. Kontrakty, které nasadíte dnes, jim mohou sloužit zítra, aniž byste museli čekat na budoucí protokol.

## Závěr {#conclusion}

Decentralizace, odolnost vůči cenzuře, nasazení nevyžadující povolení a skládatelnost nejsou oddělené prodejní argumenty. Vzájemně se posilují. Decentralizace činí odolnost vůči cenzuře důvěryhodnou a umožňuje uživatelům, aby se nadále dostali k tomu, co je vydáno. Nasazení nevyžadující povolení umožňuje tvůrcům vydávat software. Skládatelnost mění tyto aplikace ve sdílenou infrastrukturu. Autonomní agenti přes ni mohou provádět transakce a nikdo je nemůže zastavit. To, co vydáte, je veřejný závazek. Běží to dál i bez vás.

## Další čtení {#further-reading}

- [Nadace Ethereum: Kontrolní bod #9 (duben 2026)](https://blog.ethereum.org/2026/04/10/checkpoint-9)
- [clientdiversity.org](https://clientdiversity.org/)
- [Etherscan Node Tracker](https://etherscan.io/nodetracker)
- [validátoři na beaconcha.in](https://beaconcha.in/charts/validators)
- [Post-mortem: Finalita Mainnetu v květnu 2023](https://medium.com/offchainlabs/post-mortem-report-ethereum-mainnet-finality-05-11-2023-95e271dfd8b2)
- [mevwatch.info](https://www.mevwatch.info/)
- [The Block: Bloky vyhovující OFAC klesly na 27 %](https://www.theblock.co/post/230179/ethereums-ofac-compliant-blocks-fall-to-27-marking-a-drop-in-protocol-level-censorship)
- [Návrh Hegotá Headliner: FOCIL (EIP-7805)](https://ethereum-magicians.org/t/hegota-headliner-proposal-focil-eip-7805/27604)
- [EIP-7805: Seznamy pro zahrnutí vynucené volbou forku (FOCIL)](https://eips.ethereum.org/EIPS/eip-7805)
- [EIP-8004: Onchain identita agenta](https://eips.ethereum.org/EIPS/eip-8004)
- [GitHub coinbase/x402](https://github.com/coinbase/x402)
- [CoinDesk: Poptávka po x402 se nenaplnila](https://www.coindesk.com/markets/2026/03/11/coinbase-backed-ai-payments-protocol-wants-to-fix-micropayment-but-demand-is-just-not-there-yet)
- [WETH na Etherscanu](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
- [Zellic: Všechny kontrakty na Ethereu](https://www.zellic.io/blog/all-ethereum-contracts/)
- [DefiLlama: Řetězec Ethereum](https://defillama.com/chain/ethereum)
- [OpenZeppelin: Hodnocení technických rizik na blockchainových sítích (duben 2026)](https://openzeppelin.com/hubfs/OpenZeppelin%20%7C%20Technical%20Risk%20Assessment%20on%20Blockchain%20Networks.pdf)